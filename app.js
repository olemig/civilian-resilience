/* ═══════════════════════════════════════════════════════════════════════
   CIVILIAN RESILIENCE  ·  Application Logic  ·  js/app.js
   ═══════════════════════════════════════════════════════════════════════

   Architecture principles
   ───────────────────────
   · IIFE wrapper     — zero global pollution; nothing leaks to window.
   · Explicit DOM cache — every JS↔HTML contract is declared in one place.
   · Single state object — all mutable values in one auditable location.
   · Pure scoring functions — calcResults() and getTierInfo() have no
     side-effects and are trivial to unit-test in isolation.
   · Event delegation — one listener per dynamic list; no per-item
     re-attachment on re-render, no memory leaks.
   · Named constants — no magic numbers or duplicated strings.
   · hidden attribute — JS-toggled visibility uses the standard HTML
     `hidden` attribute, never inline style.display.

   Companion files
   ───────────────
   data/questions.js  →  QUESTIONS[], DOMAINS[], CHECKLIST[]
   data/articles.js   →  ARTICLES[], CHAPTERS[]
   js/storage.js      →  Storage.{saveResult, loadResult,
                                   saveChecklist, loadChecklist, clear}
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';


  /* ── Constants ────────────────────────────────────────────────────────
     Named constants replace every magic number and repeated string.
     Change a value here and it propagates everywhere automatically.    */

  const RING_RADIUS        = 80;
  const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
  const MAX_PROGRESS_DOTS  = 18;   // dots shown in the question progress strip
  const SCORE_PER_QUESTION = 2;    // maximum score value per question

  // Inlined once as a constant so the SVG string is never duplicated.
  const ARROW_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;

  // Tier thresholds — evaluated top-down; first match (pct >= min) wins.
  // Adding or changing a tier means editing this array only, not scattered if-else.
  const TIER_LEVELS = [
    {
      min:   80,
      name:  'HIGHLY RESILIENT',
      color: '#2A6B42',
      desc:  'Exceptional preparedness. You have built real capability across multiple domains. Focus on community leadership and your remaining gaps.',
    },
    {
      min:   60,
      name:  'PREPARED',
      color: '#8B6914',
      desc:  'Solid foundation with identified gaps. Address your weak domains systematically to achieve high resilience within 90 days.',
    },
    {
      min:   40,
      name:  'DEVELOPING',
      color: '#8B5E14',
      desc:  'You understand preparedness but significant gaps remain. Prioritise the immediate actions in your weakest domains first.',
    },
    {
      min:   0,
      name:  'VULNERABLE',
      color: '#B02A1A',
      desc:  'Critical preparedness gaps identified. Start with water, food, and communication basics immediately — these cost little and save lives.',
    },
  ];


  /* ── State ────────────────────────────────────────────────────────────
     All mutable application state in a single object.
     · Easy to find, audit, and reason about.
     · Easy to migrate to a state manager (Redux, Zustand) when the app grows.
     · Never mutated outside this file.                                  */

  const state = {
    userEmail:        '',
    currentQuestion:  0,
    answers:          [],     // parallel array to QUESTIONS; null = unanswered
    activeFilter:     'all',
    chaptersRendered: false,  // chapters are static — we only build them once
  };


  /* ── DOM Cache ────────────────────────────────────────────────────────
     Every JS↔HTML contract declared in one place.
     · If an id changes in index.html, there is exactly one line to fix.
     · Eliminates repeated getElementById calls scattered across the file.
     · Populated once during init(); treated as a constant thereafter.   */

  let DOM;

  function cacheDOM() {
    DOM = {

      // ─ Navigation ─────────────────────────────────────────────────
      navLogo:     document.getElementById('nav-logo'),
      navCta:      document.getElementById('btn-nav-cta'),
      burger:      document.getElementById('btn-burger'),
      mobileNav:   document.getElementById('mobileNav'),
      siteNav:     document.getElementById('site-nav'),
      navTabs:     document.querySelectorAll('.nav-tab, .nav-mobile-item'),
      footerLinks: document.querySelectorAll('.f-link[data-page]'),

      // ─ Home page ──────────────────────────────────────────────────
      btnHeroAssessment: document.getElementById('btn-hero-assessment'),
      btnHeroIntel:      document.getElementById('btn-hero-intel'),
      btnTier1Start:     document.getElementById('btn-tier1-start'),
      btnCtaAssessment:  document.getElementById('btn-cta-assessment'),

      // ─ Calculator ─────────────────────────────────────────────────
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

      // ─ Results ────────────────────────────────────────────────────
      ring1:    document.getElementById('ring1'),
      sc1num:   document.getElementById('sc1num'),
      sc1den:   document.getElementById('sc1den'),
      sc1pct:   document.getElementById('sc1pct'),
      st1name:  document.getElementById('st1name'),
      st1desc:  document.getElementById('st1desc'),
      dl1:      document.getElementById('dl1'),
      refsWrap: document.getElementById('refsWrap'),
      refsList: document.getElementById('refsList'),

      // ─ Cabinet ────────────────────────────────────────────────────
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

      // ─ Intel Hub ──────────────────────────────────────────────────
      intelSearch:   document.getElementById('intelSearch'),
      filterBtns:    document.querySelectorAll('.f-btn[data-filter]'),
      featuredCards: document.querySelectorAll('[data-article-id]'),
      articlesGrid:  document.getElementById('articlesGrid'),
      chapterGrid:   document.getElementById('chapterGrid'),

      // ─ Modal ──────────────────────────────────────────────────────
      btnModalClose: document.getElementById('btn-modal-close'),
      modalBg:       document.getElementById('modalBg'),
      modalCat:      document.getElementById('modalCat'),
      modalTitle:    document.getElementById('modalTitle'),
      modalContent:  document.getElementById('modalContent'),

      // ─ Newsletter ─────────────────────────────────────────────────
      btnSubscribe: document.getElementById('btn-subscribe'),
      nlEmail:      document.getElementById('nlEmail'),

    };
  }


  /* ── Bootstrap ────────────────────────────────────────────────────────
     Entry point. Kept intentionally minimal: cache DOM, then wire events. */

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    cacheDOM();
    bindEvents();
  }

  function bindEvents() {

    // ─ Navigation ───────────────────────────────────────────────────
    DOM.navLogo.addEventListener('click', () => showPage('home'));
    DOM.navCta.addEventListener('click',  () => showPage('calc'));
    DOM.burger.addEventListener('click',  toggleMobileNav);

    // Close the mobile nav after navigating — one listener, both desktop tabs and mobile items
    DOM.navTabs.forEach(tab => tab.addEventListener('click', () => {
      showPage(tab.dataset.page);
      closeMobileNav();
    }));

    DOM.footerLinks.forEach(link => link.addEventListener('click', () => showPage(link.dataset.page)));

    window.addEventListener('scroll', () => {
      DOM.siteNav.classList.toggle('shadowed', window.scrollY > 20);
    });

    // ─ Home page ────────────────────────────────────────────────────
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

    // Event delegation — one listener handles all dynamically-rendered option rows.
    // No need to re-attach listeners after each re-render.
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

    // Event delegation — one listener handles all checklist items.
    // toggleChecklistItem updates only the toggled element; no full re-render.
    DOM.checklistEl.addEventListener('click', (event) => {
      const item = event.target.closest('.cl-item');
      if (item) toggleChecklistItem(Number(item.dataset.checklistIndex));
    });

    // ─ Intel Hub ────────────────────────────────────────────────────
    DOM.intelSearch.addEventListener('input', renderArticles);

    DOM.filterBtns.forEach(btn => btn.addEventListener('click', () => setFilter(btn.dataset.filter, btn)));

    // Featured cards are static — direct listeners are fine here.
    DOM.featuredCards.forEach(card => card.addEventListener('click', () => {
      openArticle(Number(card.dataset.articleId));
    }));

    // Event delegation — one listener handles all dynamically-rendered article cards.
    DOM.articlesGrid.addEventListener('click', (event) => {
      const card = event.target.closest('[data-article-id]');
      if (card) openArticle(Number(card.dataset.articleId));
    });

    // ─ Modal ────────────────────────────────────────────────────────
    DOM.btnModalClose.addEventListener('click', closeModal);
    DOM.modalBg.addEventListener('click', (event) => {
      if (event.target === DOM.modalBg) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeModal();
    });

    // ─ Newsletter ───────────────────────────────────────────────────
    DOM.btnSubscribe.addEventListener('click', subscribeNewsletter);

  }


  /* ── Navigation ───────────────────────────────────────────────────── */

  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');

    DOM.navTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.page === pageId);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (pageId === 'cabinet') loadCabinet();
    if (pageId === 'intel')   renderIntelHub();
  }

  function toggleMobileNav() {
    DOM.mobileNav.classList.toggle('open');
  }

  function closeMobileNav() {
    DOM.mobileNav.classList.remove('open');
  }


  /* ── Calculator ───────────────────────────────────────────────────── */

  function startAssessment() {
    const email   = DOM.emailInput.value.trim();
    const isValid = email.length > 0 && email.includes('@');

    DOM.emailInput.classList.toggle('error', !isValid);
    if (!isValid) { DOM.emailInput.focus(); return; }

    state.userEmail = email;
    state.answers   = new Array(QUESTIONS.length).fill(null);

    buildProgressDots();
    showQuestion(0);
    showScreen('sc-q');
  }

  function showQuestion(index) {
    state.currentQuestion = index;
    const question = QUESTIONS[index];
    const isLast   = index === QUESTIONS.length - 1;

    // Update question content
    DOM.qCatBand.textContent = DOMAINS[question.domain];
    DOM.qNum.textContent     = index + 1;
    DOM.qTotal.textContent   = QUESTIONS.length;
    DOM.qText.textContent    = question.q;

    // Render options — selection state baked into the markup via class
    DOM.optsList.innerHTML = question.opts.map((opt, optIndex) => `
      <div class="opt-row${state.answers[index] === optIndex ? ' sel' : ''}"
           data-option-index="${optIndex}">
        <div class="opt-key">${opt.k}</div>
        <div class="opt-txt">${opt.l}</div>
        <div class="opt-score">${opt.s === 2 ? '●●' : opt.s === 1 ? '●○' : '○○'}</div>
      </div>`
    ).join('');

    // Navigation controls
    DOM.btnNext.innerHTML          = (isLast ? 'See Results ' : 'Next ') + ARROW_SVG;
    DOM.btnBack.style.visibility   = index === 0 ? 'hidden' : 'visible';
    setNextEnabled(state.answers[index] !== null);

    // Progress indicators
    DOM.progressFill.style.width = `${(index / QUESTIONS.length) * 100}%`;
    updateProgressDots(index);

    // Re-trigger entry animation.
    // `void el.offsetHeight` forces a synchronous layout (reflow), which flushes
    // the style.animation = 'none' before we re-apply the animation class.
    const screen = document.getElementById('sc-q');
    screen.style.animation = 'none';
    void screen.offsetHeight;
    screen.style.animation = 'fadeUp 0.35s ease both';

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function pickOption(optionIndex) {
    state.answers[state.currentQuestion] = optionIndex;

    // Toggle selection classes in-place — no full list rebuild needed
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

    // The progress header strip is only meaningful during the question flow
    DOM.calcHeader.hidden = (screenId === 'sc-email' || screenId === 'sc-r1');
  }

  function setNextEnabled(isEnabled) {
    DOM.btnNext.disabled      = !isEnabled;
    DOM.btnNext.style.opacity = isEnabled ? '1' : '0.4';
    DOM.btnNext.style.cursor  = isEnabled ? 'pointer' : 'not-allowed';
  }

  function buildProgressDots() {
    const count = Math.min(QUESTIONS.length, MAX_PROGRESS_DOTS);
    DOM.stepDots.innerHTML = Array.from(
      { length: count },
      (_, i) => `<div class="sdot" id="dot${i}"></div>`
    ).join('');
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
    DOM.emailInput.value         = '';
    DOM.progressFill.style.width = '0%';
    showScreen('sc-email');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  /* ── Scoring — pure functions ─────────────────────────────────────────
     These functions read from `state` and `QUESTIONS` but touch no DOM.
     · Easy to unit-test in isolation.
     · A single pass through QUESTIONS computes everything at once.       */

  /**
   * Computes all score data in a single pass over QUESTIONS.
   * @returns {{ totalScore: number, maxScore: number, percentage: number, domainScores: Object }}
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
   * Returns tier metadata for a given percentage score.
   * Data-driven: behaviour is defined by TIER_LEVELS, not by branching logic.
   * @param   {number} percentage  0–100
   * @returns {{ min: number, name: string, color: string, desc: string }}
   */
  function getTierInfo(percentage) {
    return TIER_LEVELS.find(tier => percentage >= tier.min);
  }

  /**
   * Animates an element's textContent counting up to a target number.
   * @param {HTMLElement} element
   * @param {number}      target
   */
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
   * Renders animated domain score bars into a container element.
   * Shared between the results screen and the cabinet dashboard.
   * Bars start at 0% width and animate to their value after a paint frame.
   * @param {HTMLElement} container
   * @param {Object}      domainScores  — { [domainIndex]: { score, maxScore } }
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

    // Short delay gives the browser a frame to paint bars at 0 before animating to full width
    setTimeout(() => {
      container.querySelectorAll('.dr-fill').forEach(bar => { bar.style.width = bar.dataset.width; });
    }, 200);
  }


  /* ── Results ──────────────────────────────────────────────────────── */

  function showResults() {
    showScreen('sc-r1');
    DOM.progressFill.style.width = '100%';

    const { totalScore, maxScore, percentage, domainScores } = calcResults();
    const tierInfo = getTierInfo(percentage);

    // Animate score ring and counters.
    // Small delay allows the screen transition to fully paint before animation begins.
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
    renderWeakAnswers();

    Storage.saveResult({
      date:    new Date().toISOString(),
      score:   totalScore,
      max:     maxScore,
      pct:     percentage,
      email:   state.userEmail,
      domains: domainScores,
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderWeakAnswers() {
    const weakAnswers = QUESTIONS.reduce((acc, question, index) => {
      const answer = state.answers[index];
      if (answer === null) return acc;

      const opt = question.opts[answer];
      if (opt.s < SCORE_PER_QUESTION) {
        acc.push({ question: question.q, answer: opt.l, score: opt.s, ref: question.ref });
      }
      return acc;
    }, []);

    DOM.refsWrap.hidden = weakAnswers.length === 0;
    DOM.refsList.innerHTML = weakAnswers.map(item => `
      <div class="ref-item">
        <div class="ref-q">${item.question}</div>
        <div class="ref-ans">Your answer: "${item.answer}" — ${item.score === 1 ? 'Vulnerable' : 'Critical risk'}</div>
        <div class="ref-ch">📖 ${item.ref}</div>
      </div>`
    ).join('');
  }


  /* ── Cabinet ──────────────────────────────────────────────────────── */

  function loadCabinet() {
    const saved = Storage.loadResult();

    DOM.cabEmpty.hidden = !!saved;
    DOM.cabDash.hidden  = !saved;
    if (!saved) return;

    const tierInfo = getTierInfo(saved.pct);
    const date     = new Date(saved.date);

    // Summary strip
    DOM.dsScore.textContent = `${saved.score}/${saved.max}`;
    DOM.dsPct.textContent   = `${saved.pct}%`;
    DOM.dsTier.textContent  = tierInfo.name.split(' ')[0];
    DOM.dsDate.textContent  = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

    // Score card
    DOM.cscDateStr.textContent = date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    DOM.cscBig.textContent     = saved.score;
    DOM.cscBig.style.color     = tierInfo.color;
    DOM.cscDenom.textContent   = `/ ${saved.max} pts`;
    DOM.cscTierH.textContent   = tierInfo.name;
    DOM.cscTierH.style.color   = tierInfo.color;
    DOM.cscTierP.textContent   = tierInfo.desc;

    // Domain bars — use real per-domain scores if present.
    // Fallback handles legacy data saved before the domains field was added.
    if (saved.domains) {
      renderDomainBars(DOM.cabDomains, saved.domains);
    } else {
      const color = saved.pct >= 70 ? 'var(--success)' : saved.pct >= 40 ? 'var(--accent)' : 'var(--danger)';
      DOM.cabDomains.innerHTML = `
        <div class="cab-domain-row">
          <div class="cdn-name">Overall Readiness</div>
          <div class="cdn-rail">
            <div class="cdn-fill" data-width="${saved.pct}%" style="background:${color}"></div>
          </div>
          <div class="cdn-pct" style="color:${color}">${saved.pct}%</div>
        </div>`;
      setTimeout(() => {
        DOM.cabDomains.querySelectorAll('.cdn-fill').forEach(bar => { bar.style.width = bar.dataset.width; });
      }, 200);
    }

    renderChecklist();
  }

  function renderChecklist() {
    const savedState = Storage.loadChecklist();
    DOM.checklistEl.innerHTML = CHECKLIST.map((item, index) => `
      <div class="cl-item${savedState[index] ? ' checked' : ''}" data-checklist-index="${index}">
        <div class="cl-box">${savedState[index] ? '✓' : ''}</div>
        <div>
          <div class="cl-text">${item.t}</div>
          <div class="cl-ch">${item.ch}</div>
        </div>
      </div>`
    ).join('');
    // Clicks are handled by event delegation on DOM.checklistEl (see bindEvents)
  }

  function toggleChecklistItem(index) {
    const savedState  = Storage.loadChecklist();
    savedState[index] = !savedState[index];
    Storage.saveChecklist(savedState);

    // Surgical DOM update — no full list re-render needed
    const item = DOM.checklistEl.querySelector(`[data-checklist-index="${index}"]`);
    if (!item) return;
    item.classList.toggle('checked', savedState[index]);
    item.querySelector('.cl-box').textContent = savedState[index] ? '✓' : '';
  }

  function showConfirmClear() { DOM.confirmClear.hidden = false; }
  function cancelClear()      { DOM.confirmClear.hidden = true;  }

  function confirmClear() {
    Storage.clear();
    DOM.confirmClear.hidden = true;
    loadCabinet();
  }


  /* ── Intel Hub ────────────────────────────────────────────────────── */

  function renderIntelHub() {
    renderArticles();
    // Chapters are static content — build the DOM exactly once
    if (!state.chaptersRendered) {
      renderChapters();
      state.chaptersRendered = true;
    }
  }

  function setFilter(filter, button) {
    state.activeFilter = filter;
    // Toggle active class relative to the clicked button — no querySelectorAll loop needed
    DOM.filterBtns.forEach(btn => btn.classList.toggle('active', btn === button));
    renderArticles();
  }

  function renderArticles() {
    const query = DOM.intelSearch.value.toLowerCase().trim();

    DOM.articlesGrid.innerHTML = ARTICLES.map(article => {
      const matchesFilter = state.activeFilter === 'all' || article.cat === state.activeFilter;
      const matchesSearch = !query
        || article.title.toLowerCase().includes(query)
        || article.expt.toLowerCase().includes(query);

      return `
        <div class="art-card${matchesFilter && matchesSearch ? '' : ' hidden'}"
             data-article-id="${article.id}">
          <div class="art-cat">${article.catL}</div>
          <div class="art-title">${article.title}</div>
          <div class="art-expt">${article.expt}</div>
          <div class="art-foot">
            <span class="art-ch">${article.ch}</span>
            <span class="art-time">${article.time}</span>
          </div>
        </div>`;
    }).join('');
    // Clicks handled by delegation listener on DOM.articlesGrid (see bindEvents)
  }

  function renderChapters() {
    DOM.chapterGrid.innerHTML = CHAPTERS.map(chapter => `
      <div class="chap-card">
        <div class="chap-num">${chapter.n}</div>
        <div class="chap-title">${chapter.t}</div>
        <div class="chap-sub">${chapter.s}</div>
        <div class="chap-arr">→</div>
      </div>`
    ).join('');
  }


  /* ── Modal ────────────────────────────────────────────────────────── */

  function openArticle(articleId) {
    const article = ARTICLES.find(item => item.id === articleId);
    if (!article) return;

    DOM.modalCat.textContent   = `${article.catL} · ${article.ch}`;
    DOM.modalTitle.textContent = article.title;
    DOM.modalContent.innerHTML = article.content;
    DOM.modalBg.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    DOM.modalBg.classList.remove('open');
    document.body.style.overflow = '';
  }


  /* ── Newsletter ───────────────────────────────────────────────────── */

  function subscribeNewsletter() {
    const email   = DOM.nlEmail.value.trim();
    const isValid = email.length > 0 && email.includes('@');

    if (!isValid) {
      DOM.nlEmail.style.borderColor = 'rgba(176,42,26,0.7)';
      DOM.nlEmail.focus();
      return;
    }

    // TODO: replace with a real API call when the backend is ready
    // await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });

    DOM.nlEmail.value             = '';
    DOM.nlEmail.placeholder       = '✓ Subscribed!';
    DOM.nlEmail.style.borderColor = 'rgba(90,175,133,0.7)';

    setTimeout(() => {
      DOM.nlEmail.placeholder       = 'your@email.com';
      DOM.nlEmail.style.borderColor = '';
    }, 4000);
  }

})();
