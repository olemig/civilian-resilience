/* ═══════════════════════════════════════════════════════════════════════
   WHEN SYSTEMS FAIL  ·  Application Logic  ·  js/app.js
   ═══════════════════════════════════════════════════════════════════════

   Architecture principles
   ───────────────────────
   · IIFE wrapper     — zero global pollution; nothing leaks to window.
   · Explicit DOM cache — every JS↔HTML contract declared in one place.
   · Single state object — all mutable values in one auditable location.
   · Pure scoring functions — calcResults() and getTierInfo() are
     side-effect-free and trivially unit-testable.
   · Event delegation — one listener per dynamic list; no per-item
     re-attachment on re-render, no memory leaks.
   · Async Storage — all Storage calls are awaited; UI never blocks.
   · hidden attribute — JS-toggled visibility uses the HTML `hidden`
     attribute, never inline style.display.

   Sections
   ────────
   1.  Initialisation
   2.  Navigation
   3.  Calculator — start
   4.  Calculator — question flow
   5.  Calculator — results
   6.  Cabinet
   7.  Intel Hub
   8.  Modal
   9.  Newsletter
   10. Library
   11. Language
   12. Auth

   Companion files
   ───────────────
   data/i18n/en.js  →  QUESTIONS[], DOMAINS[], CHECKLIST[], ARTICLES[], CHAPTERS[]
                        (other lang files override per-language fields)
   js/storage.js    →  Auth.{getUser, sendMagicLink, signOut, onAuthStateChange}
                        Storage.{saveResult, loadResult, saveChecklist,
                                 loadChecklist, subscribeEmail, clear}
                        Files.{getDownloadUrl, logDownload}
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';


  /* ── Constants ──────────────────────────────────────────────────────── */

  const RING_RADIUS        = 80;
  const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
  const MAX_PROGRESS_DOTS  = 18;
  const SCORE_PER_QUESTION = 2;

  const ARROW_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

  // TIER_LEVELS, DOMAINS, QUESTIONS, CHECKLIST, ARTICLES, CHAPTERS
  // are set dynamically by setLanguage() on every language change.
  // Declare them here so all functions below can reference them.
  let TIER_LEVELS, DOMAINS, QUESTIONS, CHECKLIST, ARTICLES, CHAPTERS;

  // Checklist chapter ref → article id (null = no live article yet)
  const CH_TO_ARTICLE = {
    'Ch. 1.4': 1, 'Ch. 1.2': 9,  'Ch. 3.3': null,
    'Ch. 5.3': 4, 'Ch. 2.5': null,'Ch. 5.4': null,
    'Ch. 8.1.1': 5, 'Ch. 8.1': 5, 'App. I': null,
    'Ch. 3.4': 2, 'Ch. 6.5': null,'Ch. 3.1': 2,
    'Ch. 7.12': 11,'Ch. 5.1': 10, 'Ch. 7.9.2': null,'Ch. 7.7': null,
  };

  const SUPPORTED_LANGUAGES = ['en', 'de', 'sv', 'fi', 'pl', 'fr', 'es'];

  // ── External links ─────────────────────────────────────────────────
  // TODO: Replace placeholder URLs once published.
  const CONFIG = {
    amazonBookUrl:     'https://amazon.com/dp/YOUR_BOOK_ASIN',
    youtubeChannelUrl: 'https://youtube.com/@YourChannelHandle',
  };

  // ── Translate helper ───────────────────────────────────────────────
  // t('cabinet.heading') → 'YOUR CABINET' in current language,
  // falls back to English if the key is missing.
  function t(keyPath) {
    const lang    = window.LANGS?.[state.language];
    const fallback = window.LANGS?.en;
    const keys    = keyPath.split('.');
    function dig(obj) {
      return obj ? keys.reduce((o, k) => (o != null ? o[k] : null), obj) : null;
    }
    return dig(lang) ?? dig(fallback) ?? keyPath;
  }


  /* ── State ──────────────────────────────────────────────────────────── */

  const state = {
    userEmail:        '',
    currentQuestion:  0,
    answers:          [],
    activeFilter:     'all',
    chaptersRendered: false,
    currentUser:      null,
    authSkipped:      false,
    language:         'en',
    weakDomains:      [],   // cats of domains scoring < 70% — drives personalised Intel Hub
  };


  /* ── DOM Cache ──────────────────────────────────────────────────────── */

  let DOM;

  function cacheDOM() {
    DOM = {

      // ─ Language switcher ────────────────────────────────────────────
      langToggle:   document.getElementById('btn-lang-toggle'),
      langDropdown: document.getElementById('langDropdown'),
      langCurrent:  document.getElementById('lang-current'),
      langOptions:  document.querySelectorAll('.lang-option'),

      // ─ Navigation ───────────────────────────────────────────────────
      navLogo:     document.getElementById('nav-logo'),
      navCta:      document.getElementById('btn-nav-cta'),
      burger:      document.getElementById('btn-burger'),
      mobileNav:   document.getElementById('mobileNav'),
      siteNav:     document.getElementById('site-nav'),
      navTabs:     document.querySelectorAll('.nav-tab, .nav-mobile-item'),
      footerLinks: document.querySelectorAll('.f-link[data-page]'),

      // ─ Home ─────────────────────────────────────────────────────────
      btnHeroAssessment: document.getElementById('btn-hero-assessment'),
      btnHeroIntel:      document.getElementById('btn-hero-intel'),
      btnTier1Start:     document.getElementById('btn-tier1-start'),
      btnCtaAssessment:  document.getElementById('btn-cta-assessment'),

      // ─ Calculator ───────────────────────────────────────────────────
      btnStart:       document.getElementById('btn-start-assessment'),
      btnBack:        document.getElementById('btnBack'),
      btnNext:        document.getElementById('btnNext'),
      btnRetake:      document.getElementById('btn-retake-r1'),
      btnR1Intel:     document.getElementById('btn-r1-intel'),
      btnViewCabinet: document.getElementById('btn-view-cabinet'),
      emailInput:     document.getElementById('emailInput'),
      calcHeader:     document.querySelector('.calc-header'),
      progressFill:   document.getElementById('calcProgressFill'),
      stepDots:       document.getElementById('stepDots'),
      screens:        document.querySelectorAll('.screen'),
      qCatBand:       document.getElementById('qCatBand'),
      qNum:           document.getElementById('qNum'),
      qTotal:         document.getElementById('qTotal'),
      qText:          document.getElementById('qText'),
      optsList:       document.getElementById('optsList'),
      qProgressFill:  document.getElementById('qProgressFill'),
      qProgressNum:   document.getElementById('qProgressNum'),
      qProgressTotal: document.getElementById('qProgressTotal'),

      // ─ Results ──────────────────────────────────────────────────────
      ring1:    document.getElementById('ring1'),
      sc1num:   document.getElementById('sc1num'),
      sc1den:   document.getElementById('sc1den'),
      sc1pct:   document.getElementById('sc1pct'),
      st1name:  document.getElementById('st1name'),
      st1desc:  document.getElementById('st1desc'),
      dl1:      document.getElementById('dl1'),
      refsWrap: document.getElementById('refsWrap'),
      refsList: document.getElementById('refsList'),

      // ─ Cabinet ──────────────────────────────────────────────────────
      btnCabRetake:     document.getElementById('btn-cab-retake'),
      btnCabEmptyStart: document.getElementById('btn-cab-empty-start'),
      btnClearData:     document.getElementById('btn-clear-data'),
      btnConfirmClear:  document.getElementById('btn-confirm-clear'),
      btnCancelClear:   document.getElementById('btn-cancel-clear'),
      cabEmpty:         document.getElementById('cab-empty'),
      cabDash:          document.getElementById('cab-dash'),
      confirmClear:     document.getElementById('confirm-clear'),
      dsScore:          document.getElementById('ds-score'),
      dsPct:            document.getElementById('ds-pct'),
      dsTier:           document.getElementById('ds-tier'),
      dsDate:           document.getElementById('ds-date'),
      cscDateStr:       document.getElementById('csc-date-str'),
      cscBig:           document.getElementById('csc-big'),
      cscDenom:         document.getElementById('csc-denom'),
      cscTierH:         document.getElementById('csc-tier-h'),
      cscTierP:         document.getElementById('csc-tier-p'),
      cabDomains:       document.getElementById('cab-domains'),
      checklistEl:      document.getElementById('checklistEl'),

      // ─ Auth (Cabinet) ───────────────────────────────────────────────
      cabUserBar:        document.getElementById('cab-user-bar'),
      cabAuthPanel:      document.getElementById('cab-auth-panel'),
      userEmailDisplay:  document.getElementById('user-email-display'),
      btnSignOut:        document.getElementById('btn-sign-out'),
      authMagicEmail:    document.getElementById('authMagicEmail'),
      magicLinkError:    document.getElementById('magic-link-error'),
      magicLinkSuccess:  document.getElementById('magic-link-success'),
      btnSendMagicLink:  document.getElementById('btn-send-magic-link'),
      btnSkipAuth:       document.getElementById('btn-skip-auth'),

      // ─ Library ──────────────────────────────────────────────────────
      libAuthPanel:      document.getElementById('lib-auth-panel'),
      libUserBar:        document.getElementById('lib-user-bar'),
      libEmailDisplay:   document.getElementById('lib-email-display'),
      libMagicEmail:     document.getElementById('libMagicEmail'),
      libMagicError:     document.getElementById('lib-magic-error'),
      libMagicSuccess:   document.getElementById('lib-magic-success'),
      btnLibMagic:       document.getElementById('btn-lib-magic'),
      btnLibSignOut:     document.getElementById('btn-lib-sign-out'),
      btnLibUnlock:      document.getElementById('btn-lib-unlock'),
      btnDownloadWorkbook: document.getElementById('btn-download-workbook'),

      // ─ Intel Hub ────────────────────────────────────────────────────
      intelSearch:   document.getElementById('intelSearch'),
      filterBtns:    document.querySelectorAll('.f-btn[data-filter]'),
      featuredCards: document.querySelectorAll('[data-article-id]'),
      articlesGrid:  document.getElementById('articlesGrid'),
      chapterGrid:   document.getElementById('chapterGrid'),

      // ─ Modal ────────────────────────────────────────────────────────
      btnModalClose: document.getElementById('btn-modal-close'),
      modalBg:       document.getElementById('modalBg'),
      modalCat:      document.getElementById('modalCat'),
      modalTitle:    document.getElementById('modalTitle'),
      modalContent:  document.getElementById('modalContent'),

      // ─ Newsletter ────────────────────────────────────────────────────
      btnSubscribe: document.getElementById('btn-subscribe'),
      nlEmail:      document.getElementById('nlEmail'),

    };
  }


  /* ═══════════════════════════════════════════════════════════════════════
     1. INITIALISATION
  ═══════════════════════════════════════════════════════════════════════ */

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    cacheDOM();
    bindEvents();
    initLanguage();  // detect + apply language before first render
    initAuth();
    handleInitialHash(); // honour URL hash deep links
  }

  function bindEvents() {

    // ─ Language switcher ────────────────────────────────────────────
    DOM.langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      DOM.langDropdown.hidden = !DOM.langDropdown.hidden;
    });
    DOM.langOptions.forEach(btn => btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
      DOM.langDropdown.hidden = true;
    }));
    // Close dropdown when clicking outside
    document.addEventListener('click', () => { DOM.langDropdown.hidden = true; });

    // ─ Navigation ───────────────────────────────────────────────────
    DOM.navLogo.addEventListener('click', () => showPage('home'));
    DOM.navCta.addEventListener('click',  () => showPage('calc'));
    DOM.burger.addEventListener('click',  toggleMobileNav);

    DOM.navTabs.forEach(tab => tab.addEventListener('click', () => {
      showPage(tab.dataset.page);
      closeMobileNav();
    }));
    DOM.footerLinks.forEach(link => link.addEventListener('click', () => showPage(link.dataset.page)));

    window.addEventListener('scroll', () => {
      DOM.siteNav.classList.toggle('shadowed', window.scrollY > 20);
    });

    // ─ Home ─────────────────────────────────────────────────────────
    DOM.btnHeroAssessment.addEventListener('click', () => showPage('calc'));
    DOM.btnHeroIntel.addEventListener('click',      () => showPage('intel'));
    DOM.btnTier1Start.addEventListener('click',     () => showPage('calc'));
    DOM.btnCtaAssessment.addEventListener('click',  () => showPage('calc'));

    // ─ Calculator ───────────────────────────────────────────────────
    DOM.btnStart.addEventListener('click',       startAssessment);
    DOM.btnBack.addEventListener('click',        goBack);
    DOM.btnNext.addEventListener('click',        goNext);
    DOM.btnRetake.addEventListener('click',      restartCalc);
    DOM.btnR1Intel.addEventListener('click',     () => showPage('intel'));
    DOM.btnViewCabinet.addEventListener('click', () => showPage('cabinet'));

    // Event delegation — one listener handles all dynamically-rendered option rows
    DOM.optsList.addEventListener('click', (event) => {
      const row = event.target.closest('.opt-row');
      if (row) pickOption(Number(row.dataset.optionIndex));
    });

    // ─ Cabinet ──────────────────────────────────────────────────────
    DOM.btnCabRetake.addEventListener('click',     () => showPage('calc'));
    DOM.btnCabEmptyStart.addEventListener('click', () => showPage('calc'));
    DOM.btnClearData.addEventListener('click',     showConfirmClear);
    DOM.btnConfirmClear.addEventListener('click',  confirmClear);
    DOM.btnCancelClear.addEventListener('click',   cancelClear);

    // Event delegation — surgical toggle, no full list re-render
    DOM.checklistEl.addEventListener('click', (event) => {
      // Article deep-link on the chapter ref label
      const chLink = event.target.closest('[data-open-article]');
      if (chLink) {
        openArticle(Number(chLink.dataset.openArticle));
        return;
      }
      const item = event.target.closest('.cl-item');
      if (item) toggleChecklistItem(Number(item.dataset.checklistIndex));
    });

    // ─ Auth ─────────────────────────────────────────────────────────
    DOM.btnSendMagicLink.addEventListener('click', handleMagicLink);
    DOM.btnSignOut.addEventListener('click',       handleSignOut);
    DOM.btnSkipAuth.addEventListener('click',      skipAuth);

    // Allow Enter key to submit the magic link form
    DOM.authMagicEmail.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleMagicLink(); });

    // ─ Library ──────────────────────────────────────────────────────
    DOM.btnLibMagic.addEventListener('click',   handleLibMagicLink);
    DOM.btnLibSignOut.addEventListener('click', handleLibSignOut);
    DOM.btnLibUnlock.addEventListener('click',  () => {
      DOM.libAuthPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => DOM.libMagicEmail.focus(), 400);
    });
    DOM.libMagicEmail.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleLibMagicLink(); });
    DOM.btnDownloadWorkbook.addEventListener('click', () => handleDownload(DOM.btnDownloadWorkbook));

    // ─ Intel Hub ────────────────────────────────────────────────────
    DOM.intelSearch.addEventListener('input', renderIntelHub);
    DOM.filterBtns.forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter, btn)));

    DOM.featuredCards.forEach(card => card.addEventListener('click', () => {
      openArticle(Number(card.dataset.articleId));
    }));

    // Event delegation — handles dynamically-rendered article cards
    DOM.articlesGrid.addEventListener('click', (event) => {
      const card = event.target.closest('[data-article-id]');
      if (card) openArticle(Number(card.dataset.articleId));
    });

    // ─ Modal ────────────────────────────────────────────────────────
    DOM.btnModalClose.addEventListener('click', closeModal);
    DOM.modalBg.addEventListener('click', (event) => {
      // Backdrop click → close
      if (event.target === DOM.modalBg) { closeModal(); return; }
      // "Continue reading" card → open next article
      const next = event.target.closest('.modal-next');
      if (next) openArticle(Number(next.dataset.articleId));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeModal();
    });

    // ─ Results ──────────────────────────────────────────────────────
    document.getElementById('btn-share-score')
      ?.addEventListener('click', () => {
        const num = Number(DOM.sc1num.textContent) || 0;
        const den = Number((DOM.sc1den.textContent || '').replace(/\D/g, '')) || 0;
        const pct = Number((DOM.sc1pct.textContent || '').replace('%', '')) || 0;
        shareScore(num, den, pct);
      });

    // ─ Newsletter ───────────────────────────────────────────────────
    DOM.btnSubscribe.addEventListener('click', subscribeNewsletter);

  }


  /* ═══════════════════════════════════════════════════════════════════════
     2. NAVIGATION
  ═══════════════════════════════════════════════════════════════════════ */

  function showPage(pageId, pushState = true) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');

    DOM.navTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.page === pageId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pushState) history.replaceState(null, '', '#' + pageId);

    if (pageId === 'cabinet') loadCabinet();
    if (pageId === 'intel')   renderIntelHub();
    if (pageId === 'library') loadLibrary();
  }

  /** Read URL hash on load and open correct page / article. */
  function handleInitialHash() {
    const hash = location.hash.slice(1); // strip '#'
    if (!hash) return;
    // Deep-link to article: #intel/article/5
    const articleMatch = hash.match(/^intel\/article\/(\d+)$/);
    if (articleMatch) {
      showPage('intel', false);
      // Wait for Intel Hub to render before opening modal
      setTimeout(() => openArticle(Number(articleMatch[1])), 200);
      return;
    }
    const validPages = ['home', 'calc', 'cabinet', 'intel', 'library'];
    if (validPages.includes(hash)) showPage(hash, false);
  }

  function toggleMobileNav() { DOM.mobileNav.classList.toggle('open');  }
  function closeMobileNav()  { DOM.mobileNav.classList.remove('open'); }


  /* ═══════════════════════════════════════════════════════════════════════
     3. CALCULATOR — start
  ═══════════════════════════════════════════════════════════════════════ */

  function startAssessment() {
    // If logged in, pre-use auth email silently
    let email = state.currentUser
      ? state.currentUser.email
      : DOM.emailInput.value.trim();

    if (!state.currentUser) {
      const isValid = email.length > 0 && email.includes('@');
      DOM.emailInput.classList.toggle('error', !isValid);
      if (!isValid) { DOM.emailInput.focus(); return; }
    }

    state.userEmail = email;
    state.answers   = new Array(QUESTIONS.length).fill(null);

    buildProgressDots();
    showQuestion(0);
    showScreen('sc-q');
  }


  /* ═══════════════════════════════════════════════════════════════════════
     4. CALCULATOR — question flow
  ═══════════════════════════════════════════════════════════════════════ */

  function buildProgressDots() {
    const count = Math.min(QUESTIONS.length, MAX_PROGRESS_DOTS);
    DOM.stepDots.innerHTML = Array.from(
      { length: count },
      (_, i) => `<div class="sdot" id="dot${i}"></div>`
    ).join('');
  }

  function showQuestion(index) {
    state.currentQuestion = index;
    const question = QUESTIONS[index];
    const isLast   = index === QUESTIONS.length - 1;

    // Inline progress bar — fills as user moves through questions
    const pct = Math.round(((index + 1) / QUESTIONS.length) * 100);
    DOM.qProgressFill.style.width  = `${pct}%`;
    DOM.qProgressNum.textContent   = index + 1;
    DOM.qProgressTotal.textContent = QUESTIONS.length;

    DOM.qCatBand.textContent = DOMAINS[question.domain];
    DOM.qNum.textContent     = index + 1;
    DOM.qTotal.textContent   = QUESTIONS.length;
    DOM.qText.textContent    = question.q;

    DOM.optsList.innerHTML = question.opts.map((opt, optIndex) => `
      <div class="opt-row${state.answers[index] === optIndex ? ' sel' : ''}"
           data-option-index="${optIndex}">
        <div class="opt-key">${opt.k}</div>
        <div class="opt-txt">${opt.l}</div>
      </div>`
    ).join('');

    DOM.btnNext.innerHTML = (isLast ? t('calc.btnSeeResults') : t('calc.btnNext')) + ' ' + ARROW_SVG;
    DOM.btnBack.style.visibility = index === 0 ? 'hidden' : 'visible';
    setNextEnabled(state.answers[index] !== null);

    DOM.progressFill.style.width = `${(index / QUESTIONS.length) * 100}%`;
    updateProgressDots(index);

    // Force reflow to re-trigger CSS entry animation on each question
    const screen = document.getElementById('sc-q');
    screen.style.animation = 'none';
    void screen.offsetHeight; // flushes pending style before re-applying animation
    screen.style.animation = 'fadeUp 0.35s ease both';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function pickOption(optionIndex) {
    state.answers[state.currentQuestion] = optionIndex;
    DOM.optsList.querySelectorAll('.opt-row').forEach((row, i) => {
      row.classList.toggle('sel', i === optionIndex);
    });
    setNextEnabled(true);
  }

  function goNext() {
    if (state.answers[state.currentQuestion] === null) return;
    if (state.currentQuestion < QUESTIONS.length - 1) {
      showQuestion(state.currentQuestion + 1);
    } else {
      showResults();
    }
  }

  function goBack() {
    if (state.currentQuestion > 0) showQuestion(state.currentQuestion - 1);
  }

  function showScreen(screenId) {
    DOM.screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    DOM.calcHeader.hidden = (screenId === 'sc-email' || screenId === 'sc-r1');
  }

  function setNextEnabled(isEnabled) {
    DOM.btnNext.disabled      = !isEnabled;
    DOM.btnNext.style.opacity = isEnabled ? '1' : '0.4';
    DOM.btnNext.style.cursor  = isEnabled ? 'pointer' : 'not-allowed';
  }

  function updateProgressDots(activeIndex) {
    const count = Math.min(QUESTIONS.length, MAX_PROGRESS_DOTS);
    for (let i = 0; i < count; i++) {
      const dot = document.getElementById(`dot${i}`);
      if (dot) dot.className = 'sdot' + (i < activeIndex ? ' done' : i === activeIndex ? ' cur' : '');
    }
  }

  function restartCalc() {
    state.answers         = [];
    state.currentQuestion = 0;
    if (!state.currentUser) DOM.emailInput.value = '';
    DOM.progressFill.style.width = '0%';
    showScreen('sc-email');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  /* ═══════════════════════════════════════════════════════════════════════
     5. CALCULATOR — results  (pure scoring functions + render)
  ═══════════════════════════════════════════════════════════════════════ */

  /**
   * Single pass over QUESTIONS — computes all score data at once.
   * Pure function: reads state.answers and QUESTIONS, touches no DOM.
   */
  function calcResults() {
    const maxScore     = QUESTIONS.length * SCORE_PER_QUESTION;
    const domainScores = {};

    const totalScore = QUESTIONS.reduce((sum, question, index) => {
      const answer = state.answers[index];
      const score  = answer !== null ? question.opts[answer].s : 0;

      if (!domainScores[question.domain]) {
        domainScores[question.domain] = { score: 0, maxScore: 0 };
      }
      domainScores[question.domain].score    += score;
      domainScores[question.domain].maxScore += SCORE_PER_QUESTION;

      return sum + score;
    }, 0);

    return {
      totalScore,
      maxScore,
      percentage:   Math.round((totalScore / maxScore) * 100),
      domainScores,
    };
  }

  /**
   * Returns tier metadata for a given percentage.
   * Data-driven: behaviour defined by TIER_LEVELS (set per language).
   */
  function getTierInfo(percentage) {
    return TIER_LEVELS.find(tier => percentage >= tier.min);
  }

  /** Animates an element's textContent counting up to a target number. */
  function animateCount(element, target) {
    let current = 0;
    const step  = Math.max(1, Math.round(target / 45));
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      element.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 30);
  }

  /**
   * Renders animated domain bars into a container element.
   * Shared between results screen and cabinet dashboard.
   */
  function renderDomainBars(container, domainScores) {
    container.innerHTML = Object.entries(domainScores).map(([domainIndex, data]) => {
      const pct      = Math.round((data.score / data.maxScore) * 100);
      const barColor = pct >= 70 ? 'var(--success)' : pct >= 40 ? 'var(--accent)' : 'var(--danger)';
      return `
        <div class="domain-row">
          <div class="dr-top">
            <div class="dr-name">${DOMAINS[domainIndex]}</div>
            <div class="dr-score" style="color:${barColor}">${data.score}/${data.maxScore} · ${pct}%</div>
          </div>
          <div class="dr-bar">
            <div class="dr-fill" data-width="${pct}%" style="background:${barColor}"></div>
          </div>
        </div>`;
    }).join('');

    // Short delay gives the browser a frame to paint bars at 0% before animating
    setTimeout(() => {
      container.querySelectorAll('.dr-fill').forEach(bar => { bar.style.width = bar.dataset.width; });
    }, 200);
  }

  function showResults() {
    showScreen('sc-r1');
    DOM.progressFill.style.width = '100%';

    const { totalScore, maxScore, percentage, domainScores } = calcResults();
    const tierInfo = getTierInfo(percentage);

    // Store weak domains for personalised Intel Hub view
    const DOMAIN_TO_CAT = ['psychology', 'water', 'medical', 'psychology', 'security'];
    state.weakDomains = Object.entries(domainScores)
      .filter(([, d]) => Math.round((d.score / d.maxScore) * 100) < 70)
      .map(([idx]) => DOMAIN_TO_CAT[idx])
      .filter(Boolean);

    setTimeout(() => {
      animateCount(DOM.sc1num, totalScore);
      DOM.sc1den.textContent = `/ ${maxScore}`;
      DOM.sc1pct.textContent = `${percentage}%`;
      DOM.ring1.style.strokeDashoffset = RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * percentage / 100);
      DOM.ring1.style.stroke           = tierInfo.color;
      DOM.st1name.textContent          = tierInfo.name;
      DOM.st1name.style.color          = tierInfo.color;
      DOM.st1desc.textContent          = tierInfo.desc;
    }, 100);

    renderDomainBars(DOM.dl1, domainScores);
    renderPriorityReadingPlan();

    // Fire-and-forget: save in the background without blocking the UI
    Storage.saveResult({
      date:    new Date().toISOString(),
      score:   totalScore,
      max:     maxScore,
      pct:     percentage,
      email:   state.userEmail,
      domains: domainScores,
    }).catch(err => console.error('Failed to save result:', err));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function shareScore(score, max, pct) {
    const text = `I scored ${score}/${max} (${pct}%) on the When Systems Fail preparedness assessment. Find out where your gaps are: ${location.origin}${location.pathname}`;
    if (navigator.share) {
      navigator.share({ title: 'My Resilience Score', text });
    } else {
      // Fallback: copy to clipboard then open Twitter
      navigator.clipboard?.writeText(text).catch(() => {});
      const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
      window.open(tweet, '_blank', 'noopener');
    }
  }

  function renderPriorityReadingPlan() {
    const seen = new Set();
    const items = QUESTIONS.reduce((acc, question, index) => {
      const answer = state.answers[index];
      if (answer === null) return acc;
      const opt = question.opts[answer];
      if (opt.s < SCORE_PER_QUESTION && !seen.has(question.ref)) {
        seen.add(question.ref);
        acc.push({
          domain:   DOMAINS[question.domain],
          ref:      question.ref,
          priority: opt.s === 0 ? 'critical' : 'recommended',
        });
      }
      return acc;
    }, []);

    items.sort((a, b) => (a.priority === 'critical' ? -1 : 1));

    DOM.refsWrap.hidden = items.length === 0;
    if (items.length === 0) return;

    DOM.refsList.innerHTML = items.map(item => `
      <div class="ref-item ref-${item.priority}">
        <div class="ref-domain">${item.domain}</div>
        <div class="ref-ch">📖 ${item.ref}</div>
        <div class="ref-badge">${item.priority === 'critical' ? t('results.critical') : t('results.recommended')}</div>
      </div>`
    ).join('') + `
      <div class="ref-book-cta">
        <div class="ref-book-copy">
          <strong>${items.length} ${t('results.bookCtaChapters')}</strong>
          ${t('results.bookCtaBody')}
        </div>
        <a class="btn btn-primary" href="${CONFIG.amazonBookUrl}" target="_blank" rel="noopener">
          ${t('results.bookCtaBtn')}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>`;
  }


  /* ═══════════════════════════════════════════════════════════════════════
     6. CABINET
  ═══════════════════════════════════════════════════════════════════════ */

  async function loadCabinet() {
    const user = state.currentUser;

    DOM.cabUserBar.hidden   = !user;
    if (user) {
      DOM.userEmailDisplay.textContent = user.email;
    }

    // Auth panel behaviour:
    // · Signed in → hidden entirely
    // · Signed out, results exist → soft "sync" banner (not a gate)
    // · Signed out, no results → full auth card (nothing to show yet)
    const saved = await Storage.loadResult();

    const showSoftBanner = !user && !!saved && !state.authSkipped;
    const showFullGate   = !user && !saved  && !state.authSkipped;

    DOM.cabAuthPanel.hidden       = !(showSoftBanner || showFullGate);
    DOM.cabAuthPanel.dataset.mode = showSoftBanner ? 'soft' : 'full';

    // Soft banner: collapse the auth card into a compact strip
    const authCard = DOM.cabAuthPanel.querySelector('.auth-card');
    if (authCard) {
      authCard.classList.toggle('auth-card--soft', showSoftBanner);
    }

    // If full gate (no data yet), don't render empty dashboard
    if (showFullGate) {
      DOM.cabEmpty.hidden = true;
      DOM.cabDash.hidden  = true;
      return;
    }

    DOM.cabEmpty.hidden = !!saved;
    DOM.cabDash.hidden  = !saved;
    if (!saved) return;

    const tierInfo = getTierInfo(saved.pct);
    const date     = new Date(saved.date);
    const locale   = window.LANGS?.[state.language]?.meta.locale || 'en-GB';

    DOM.dsScore.textContent = `${saved.score}/${saved.max}`;
    DOM.dsPct.textContent   = `${saved.pct}%`;
    DOM.dsTier.textContent  = tierInfo.name.split(' ')[0];
    DOM.dsDate.textContent  = date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });

    DOM.cscDateStr.textContent = date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    DOM.cscBig.textContent     = saved.score;
    DOM.cscBig.style.color     = tierInfo.color;
    DOM.cscDenom.textContent   = `/ ${saved.max} pts`;
    DOM.cscTierH.textContent   = tierInfo.name;
    DOM.cscTierH.style.color   = tierInfo.color;
    DOM.cscTierP.textContent   = tierInfo.desc;

    if (saved.domains) {
      renderDomainBars(DOM.cabDomains, saved.domains);
    } else {
      const color = saved.pct >= 70 ? 'var(--success)' : saved.pct >= 40 ? 'var(--accent)' : 'var(--danger)';
      DOM.cabDomains.innerHTML = `
        <div class="cab-domain-row">
          <div class="cdn-name">${t('cabinet.domainFallback')}</div>
          <div class="cdn-rail">
            <div class="cdn-fill" data-width="${saved.pct}%" style="background:${color}"></div>
          </div>
          <div class="cdn-pct" style="color:${color}">${saved.pct}%</div>
        </div>`;
      setTimeout(() => {
        DOM.cabDomains.querySelectorAll('.cdn-fill').forEach(bar => { bar.style.width = bar.dataset.width; });
      }, 200);
    }

    await renderChecklist();
  }

  async function renderChecklist() {
    const savedState = await Storage.loadChecklist();
    const doneCount  = CHECKLIST.reduce((n, _, i) => n + (savedState[i] ? 1 : 0), 0);
    const total      = CHECKLIST.length;
    const pct        = Math.round((doneCount / total) * 100);

    DOM.checklistEl.innerHTML = `
      <div class="cl-progress">
        <div class="cl-progress-bar" style="width:${pct}%"></div>
        <div class="cl-progress-label">${doneCount} of ${total} actions complete</div>
      </div>
    ` + CHECKLIST.map((item, index) => {
      const articleId = CH_TO_ARTICLE[item.ch];
      const linkAttr  = articleId != null
        ? `data-open-article="${articleId}" role="button" title="Read the full protocol"` : '';
      return `
        <div class="cl-item${savedState[index] ? ' checked' : ''}${articleId != null ? ' cl-linked' : ''}"
             data-checklist-index="${index}">
          <div class="cl-box">${savedState[index] ? '✓' : ''}</div>
          <div>
            <div class="cl-text">${item.t}</div>
            <div class="cl-ch" ${linkAttr}>${item.ch}${articleId != null ? ' ↗' : ''}</div>
          </div>
        </div>`;
    }).join('');
  }

  async function toggleChecklistItem(index) {
    const savedState  = await Storage.loadChecklist();
    savedState[index] = !savedState[index];
    await Storage.saveChecklist(savedState);

    // Surgical DOM update — no full list re-render
    const item = DOM.checklistEl.querySelector(`[data-checklist-index="${index}"]`);
    if (!item) return;
    item.classList.toggle('checked', !!savedState[index]);
    item.querySelector('.cl-box').textContent = savedState[index] ? '✓' : '';

    // Update progress bar
    const doneCount = CHECKLIST.reduce((n, _, i) => n + (savedState[i] ? 1 : 0), 0);
    const total     = CHECKLIST.length;
    const pct       = Math.round((doneCount / total) * 100);
    const bar   = DOM.checklistEl.querySelector('.cl-progress-bar');
    const label = DOM.checklistEl.querySelector('.cl-progress-label');
    if (bar)   bar.style.width        = `${pct}%`;
    if (label) label.textContent      = `${doneCount} of ${total} actions complete`;
  }

  function showConfirmClear() { DOM.confirmClear.hidden = false; }
  function cancelClear()      { DOM.confirmClear.hidden = true;  }

  async function confirmClear() {
    await Storage.clear();
    DOM.confirmClear.hidden = true;
    await loadCabinet();
  }


  /* ═══════════════════════════════════════════════════════════════════════
     7. INTEL HUB
  ═══════════════════════════════════════════════════════════════════════ */

  function renderIntelHub() {
    const isPersonalised = state.weakDomains.length > 0;

    // Toggle personalised banner visibility
    const banner = document.getElementById('intel-personal-banner');
    if (banner) banner.hidden = !isPersonalised;

    renderArticles();
    if (!state.chaptersRendered) {
      renderChapters();
      state.chaptersRendered = true;
    }
  }

  function setFilter(filter, button) {
    state.activeFilter = filter;
    DOM.filterBtns.forEach(btn => btn.classList.toggle('active', btn === button));
    renderArticles();
  }

  function renderArticles() {
    const query        = DOM.intelSearch.value.toLowerCase().trim();
    const isPersonalised = state.weakDomains.length > 0 && state.activeFilter === 'all' && !query;

    DOM.articlesGrid.innerHTML = ARTICLES.map(article => {
      const matchesFilter      = state.activeFilter === 'all' || article.cat === state.activeFilter;
      const matchesSearch      = !query
        || article.title.toLowerCase().includes(query)
        || article.expt.toLowerCase().includes(query);
      const isWeak             = isPersonalised && state.weakDomains.includes(article.cat);

      return `
        <div class="art-card${matchesFilter && matchesSearch ? '' : ' hidden'}${isWeak ? ' art-card--priority' : ''}"
             data-article-id="${article.id}">
          ${isWeak ? '<div class="art-priority-tag">Priority for you</div>' : ''}
          <div class="art-cat">${article.catL}</div>
          <div class="art-title">${article.title}</div>
          <div class="art-expt">${article.expt}</div>
          <div class="art-foot">
            <span class="art-ch">${article.ch}</span>
            <span class="art-time">${article.time}</span>
          </div>
        </div>`;
    }).join('');
  }

  function renderChapters() {
    // Parts are static — they map to the book's published structure.
    // CHAPTERS array is filtered by n field so order in the array doesn't matter.
    const parts = [
      { label: 'Introduction',                                    ids: ['Intro'] },
      { label: 'Part I — Impact: The First 72 Hours',             ids: ['Ch. 1','Ch. 2','Ch. 3','Ch. 4'] },
      { label: 'Part II — Stabilization: Days 4–30',              ids: ['Ch. 5','Ch. 6','Ch. 7','Ch. 8'] },
      { label: 'Part III — Exhaustion & Adaptation: Months 2–6',  ids: ['Ch. 9','Ch. 10','Ch. 11','Ch. 12'] },
      { label: 'Part IV — The New Normal: Months 6–12',           ids: ['Ch. 13','Ch. 14','Ch. 15','Ch. 16'] },
      { label: 'Part V — Scenario Protocols',                     ids: ['Ch. 17','Ch. 18','Ch. 19','Ch. 20'] },
    ];

    DOM.chapterGrid.innerHTML = parts.map(part => {
      const cards = CHAPTERS
        .filter(c => part.ids.includes(c.n))
        .map(c => `
          <div class="chap-card">
            <div class="chap-num">${c.n}</div>
            <div class="chap-title">${c.t}</div>
            <div class="chap-sub">${c.s}</div>
            <div class="chap-arr">→</div>
          </div>`)
        .join('');
      return `<div class="chap-part-label">${part.label}</div>${cards}`;
    }).join('');
  }


  /* ═══════════════════════════════════════════════════════════════════════
     8. MODAL
  ═══════════════════════════════════════════════════════════════════════ */

  function openArticle(articleId) {
    const article = ARTICLES.find(item => item.id === articleId);
    if (!article) return;

    // Update URL so this article is directly shareable
    history.replaceState(null, '', `#intel/article/${articleId}`);

    // Recommend next article — static adjacency map
    const nextMap = { 0:9, 1:0, 2:7, 3:4, 4:3, 5:6, 6:5, 7:2, 8:9, 9:1, 10:9, 11:10 };
    const nextId  = nextMap[articleId];
    const next    = ARTICLES.find(a => a.id === nextId);

    DOM.modalCat.textContent   = `${article.catL} · ${article.ch}`;
    DOM.modalTitle.textContent = article.title;
    DOM.modalContent.innerHTML = article.content
      + (next ? `
        <div class="modal-next" data-article-id="${next.id}">
          <div class="modal-next-label">Continue reading</div>
          <div class="modal-next-title">${next.title} →</div>
        </div>` : '')
      + `
        <div class="modal-cta">
          <div class="modal-cta-text">
            <strong>This protocol is from ${article.ch} of the book.</strong>
            The full chapter goes deeper — additional protocols, edge cases,
            and printable reference cards are in the Critical Appendices.
          </div>
          <a href="${CONFIG.amazonBookUrl}" target="_blank" rel="noopener"
             class="btn btn-primary sm">
            Get the Full Book →
          </a>
        </div>`;
    DOM.modalBg.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    DOM.modalBg.classList.remove('open');
    document.body.style.overflow = '';
    history.replaceState(null, '', '#intel');
  }


  /* ═══════════════════════════════════════════════════════════════════════
     9. NEWSLETTER
  ═══════════════════════════════════════════════════════════════════════ */

  async function subscribeNewsletter() {
    const email   = DOM.nlEmail.value.trim();
    const isValid = email.length > 0 && email.includes('@');

    if (!isValid) {
      DOM.nlEmail.style.borderColor = 'rgba(176,42,26,0.7)';
      DOM.nlEmail.focus();
      return;
    }

    DOM.btnSubscribe.disabled    = true;
    DOM.btnSubscribe.textContent = '…';

    const { error } = await Storage.subscribeEmail(email);

    DOM.btnSubscribe.disabled    = false;
    DOM.btnSubscribe.textContent = t('newsletter.btn');

    // 23505 = unique_violation — email already exists, treat as success
    if (error && error.code !== '23505') {
      DOM.nlEmail.placeholder       = t('newsletter.error');
      DOM.nlEmail.style.borderColor = 'rgba(176,42,26,0.7)';
      return;
    }

    DOM.nlEmail.value             = '';
    DOM.nlEmail.placeholder       = t('newsletter.success');
    DOM.nlEmail.style.borderColor = 'rgba(90,175,133,0.7)';
    setTimeout(() => {
      DOM.nlEmail.placeholder       = t('newsletter.placeholder');
      DOM.nlEmail.style.borderColor = '';
    }, 4000);
  }


  /* ═══════════════════════════════════════════════════════════════════════
     10. LIBRARY
     ═══════════════════════════════════════════════════════════════════════
     Auth pattern mirrors Cabinet exactly:
     · Signed in  → hide auth panel, show user bar + download buttons
     · Signed out → show auth panel, lock buttons scroll to it
     · Magic link uses the same Auth.sendMagicLink() — same Supabase session
       so signing in via Library also signs in for Cabinet (and vice versa).
  ═══════════════════════════════════════════════════════════════════════ */

  function loadLibrary() {
    const user = state.currentUser;

    // Auth panel: show when signed out, hide when signed in
    DOM.libAuthPanel.hidden = !!user;
    DOM.libUserBar.hidden   = !user;

    if (user) {
      DOM.libEmailDisplay.textContent = user.email;
    } else {
      // Reset form state so the panel is clean each visit
      if (DOM.libMagicEmail) {
        DOM.libMagicEmail.value         = '';
        DOM.libMagicEmail.classList.remove('error');
      }
      if (DOM.libMagicError)   DOM.libMagicError.hidden   = true;
      if (DOM.libMagicSuccess) DOM.libMagicSuccess.hidden = true;
    }

    // Unlock vs download button
    DOM.btnLibUnlock.hidden        = !!user;
    DOM.btnDownloadWorkbook.hidden = !user;
  }

  async function handleLibMagicLink() {
    const email   = DOM.libMagicEmail.value.trim();
    const isValid = email.length > 0 && email.includes('@');

    DOM.libMagicError.hidden   = true;
    DOM.libMagicSuccess.hidden = true;

    if (!isValid) {
      DOM.libMagicEmail.classList.add('error');
      DOM.libMagicEmail.focus();
      return;
    }
    DOM.libMagicEmail.classList.remove('error');

    _setAuthLoading(DOM.btnLibMagic, t('cabinet.authSending'));

    const { error } = await Auth.sendMagicLink(email, window.location.href);

    _resetAuthButton(DOM.btnLibMagic, t('library.authBtn'));

    if (error) {
      DOM.libMagicError.textContent = _friendlyAuthError(error.message);
      DOM.libMagicError.hidden = false;
      return;
    }

    DOM.libMagicEmail.value    = '';
    DOM.libMagicSuccess.hidden = false;
  }

  async function handleLibSignOut() {
    await Auth.signOut();
    // onAuthStateChange fires → loadLibrary() re-renders with auth panel
  }

  /**
   * Fetches a signed, time-limited URL from Supabase Storage and
   * triggers a browser download. Shows loading state on the button
   * while the request is in flight.
   *
   * @param {HTMLButtonElement} button  The download button element.
   *   Must have a data-file attribute with the filename, e.g. "workbook.pdf".
   */
  async function handleDownload(button) {
    const filename = button.dataset.file;
    if (!filename) return;

    const originalHTML = button.innerHTML;
    button.disabled  = true;
    button.innerHTML = '⏳ Preparing…';

    const url = await Files.getDownloadUrl(filename);

    button.disabled  = false;
    button.innerHTML = originalHTML;

    if (!url) {
      // Shouldn't happen for logged-in users, but handle gracefully
      console.error('handleDownload: could not get signed URL for', filename);
      return;
    }

    // Log the download event for analytics (fire-and-forget)
    Files.logDownload(filename);

    // Trigger browser download without navigating away
    const a = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.rel      = 'noopener';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* ═══════════════════════════════════════════════════════════════════════
     11. LANGUAGE
     ═══════════════════════════════════════════════════════════════════════
     Flow on load:
     1. Check localStorage for saved preference
     2. Fall back to browser language (navigator.language)
     3. Fall back to English
     4. applyContent() updates all [data-i18n] elements and data arrays

     Flow on user switch:
     1. setLanguage(code) → applyContent() → Storage.saveLanguage()
     2. Storage.trackLanguage() fires async for analytics
  ═══════════════════════════════════════════════════════════════════════ */

  async function initLanguage() {
    const saved   = Storage.loadLanguage();
    const browser = navigator.language?.slice(0, 2).toLowerCase();
    const code    = saved
      || (SUPPORTED_LANGUAGES.includes(browser) ? browser : 'en');
    await setLanguage(code, /* track= */ false); // don't track initial load
  }

  async function setLanguage(code, track = true) {
    const lang = window.LANGS?.[code] || window.LANGS?.en;
    state.language         = lang.meta.code;
    state.chaptersRendered = false; // force chapter re-render on next Intel Hub visit

    // Update active data arrays used by all other sections
    TIER_LEVELS = lang.tiers;
    DOMAINS     = lang.domains;
    QUESTIONS   = lang.questions || window.LANGS.en.questions;
    CHECKLIST   = lang.checklist || window.LANGS.en.checklist;
    ARTICLES    = lang.articles  || window.LANGS.en.articles;
    CHAPTERS    = lang.chapters  || window.LANGS.en.chapters;

    applyContent();

    // Re-render any dynamic content on whichever page is currently visible,
    // so the user sees the new language immediately without navigating away.
    if (document.getElementById('page-intel')?.classList.contains('active')) {
      renderIntelHub();
    }
    if (document.getElementById('page-cabinet')?.classList.contains('active')) {
      await loadCabinet();
    }
    if (document.getElementById('page-library')?.classList.contains('active')) {
      loadLibrary();
    }

    Storage.saveLanguage(state.language);
    if (track) Storage.trackLanguage(state.language);
  }

  /**
   * Applies current language content to all [data-i18n] elements in the DOM.
   * Elements use a dotted key path matching the LANGS content object structure.
   * Also updates placeholder, innerHTML variants, and the lang switcher UI.
   */
  function applyContent() {
    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = t(el.dataset.i18n);
      if (val != null) el.textContent = val;
    });

    // HTML content (use sparingly — only where bold/em is needed)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const val = t(el.dataset.i18nHtml);
      if (val != null) el.innerHTML = val;
    });

    // Placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const val = t(el.dataset.i18nPlaceholder);
      if (val != null) el.placeholder = val;
    });

    // Update language switcher badge
    const lang = window.LANGS?.[state.language];
    if (DOM.langCurrent && lang) {
      DOM.langCurrent.textContent = lang.meta.flag + ' ' + lang.meta.code.toUpperCase();
    }

    // Mark active language option
    DOM.langOptions.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === state.language);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════
     12. AUTH — Magic Link (passwordless)
     ═══════════════════════════════════════════════════════════════════════
     Flow:
     1. User enters email → clicks "Send Magic Link"
     2. Supabase emails a one-click link (works for both new and existing users)
     3. User clicks the link → redirected back to this page
     4. detectSessionInUrl (set in storage.js) picks up the token from the URL
     5. onAuthStateChange fires → loadCabinet() renders the dashboard
  ═══════════════════════════════════════════════════════════════════════ */

  /**
   * Called once during init(). Sets up the Supabase auth state listener.
   * The callback fires immediately with the current session (so returning
   * users are logged in without any action), then on every auth change.
   */
  function initAuth() {
    Auth.onAuthStateChange(async (user) => {
      state.currentUser = user;

      // Pre-fill and lock the calculator email input when logged in
      if (user) {
        DOM.emailInput.value       = user.email;
        DOM.emailInput.readOnly    = true;
        DOM.emailInput.style.color = 'var(--ink-muted)';
      } else {
        DOM.emailInput.readOnly    = false;
        DOM.emailInput.style.color = '';
        if (!state.userEmail) DOM.emailInput.value = '';
      }

      // Reload cabinet if it is the currently active page
      const cabinetPage = document.getElementById('page-cabinet');
      if (cabinetPage?.classList.contains('active')) {
        await loadCabinet();
      }
      // Reload library if active (sign-in via library magic link)
      const libraryPage = document.getElementById('page-library');
      if (libraryPage?.classList.contains('active')) {
        loadLibrary();
      }
    });
  }

  /* ── Send magic link ────────────────────────────────────────────────── */

  async function handleMagicLink() {
    const email   = DOM.authMagicEmail.value.trim();
    const isValid = email.length > 0 && email.includes('@');

    DOM.magicLinkError.hidden   = true;
    DOM.magicLinkSuccess.hidden = true;

    if (!isValid) {
      DOM.authMagicEmail.classList.add('error');
      DOM.authMagicEmail.focus();
      return;
    }
    DOM.authMagicEmail.classList.remove('error');

    _setAuthLoading(DOM.btnSendMagicLink, t('cabinet.authSending'));

    const { error } = await Auth.sendMagicLink(email, window.location.href);

    _resetAuthButton(DOM.btnSendMagicLink, t('cabinet.authBtn'));

    if (error) {
      DOM.magicLinkError.textContent = _friendlyAuthError(error.message);
      DOM.magicLinkError.hidden = false;
      return;
    }

    DOM.authMagicEmail.value    = '';
    DOM.magicLinkSuccess.hidden = false;
  }

  /* ── Sign out ───────────────────────────────────────────────────────── */

  async function handleSignOut() {
    await Auth.signOut();
    state.authSkipped = false;
    // onAuthStateChange fires automatically → loadCabinet() re-renders with auth panel
  }

  /* ── Skip auth ──────────────────────────────────────────────────────── */

  async function skipAuth() {
    state.authSkipped = true;
    DOM.cabAuthPanel.hidden = true;
    await loadCabinet();
  }

  /* ── Auth UI helpers ────────────────────────────────────────────────── */

  function _setAuthLoading(button, label) {
    const span = button.querySelector('[data-i18n]') || button.querySelector('span');
    if (span) span.textContent = label; else button.textContent = label;
    button.disabled = true;
  }

  function _resetAuthButton(button, label) {
    const span = button.querySelector('[data-i18n]') || button.querySelector('span');
    if (span) span.textContent = label; else button.textContent = label;
    button.disabled = false;
  }

  /**
   * Converts raw Supabase error messages into user-friendly copy.
   */
  function _friendlyAuthError(message) {
    if (!message) return t('cabinet.authErrGeneral');
    if (message.toLowerCase().includes('rate limit')) return t('cabinet.authErrRateLimit');
    if (message.toLowerCase().includes('invalid'))    return t('cabinet.authErrInvalid');
    return t('cabinet.authErrGeneral');
  }

})();
