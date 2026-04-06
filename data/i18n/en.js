// ═══════════════════════════════════════════════════════════════════════
// WHEN SYSTEMS FAIL  ·  Content  ·  data/i18n/en.js
// ═══════════════════════════════════════════════════════════════════════
//
// This is the reference language file. Every other language file
// must mirror this exact structure — missing keys fall back to English.
//
// To add a new language:
//   1. Copy this file to data/i18n/XX.js
//   2. Translate every string value (not the keys)
//   3. Add 'XX' to SUPPORTED_LANGUAGES in app.js
//   4. Add the script tag in index.html
// ═══════════════════════════════════════════════════════════════════════

window.LANGS = window.LANGS || {};

LANGS.en = {

  meta: {
    code:   'en',
    name:   'English',
    flag:   '🇬🇧',
    locale: 'en-GB',   // used for date formatting
  },

  // ── Navigation ────────────────────────────────────────────────────
  nav: {
    home:    'Home',
    cabinet: 'Cabinet',
    intel:   'Intel Hub',
    library: 'Library',
    cta:     'Take Assessment',
  },

  // ── Hero ──────────────────────────────────────────────────────────
  hero: {
    eyebrow:  'When Systems Fail Framework',
    h1line1:  'COMPETENCE',
    h1accent: 'IS YOUR',
    h1line2:  'ONLY INSURANCE',
    sub:      'A practical, evidence-based resilience system for civilians. Assess your preparedness across 5 critical domains, find your blind spots, and build real capability — before you need it.',
    btnAssess:  'Take Free Assessment',
    btnIntel:   'Browse Intel Hub',
    stat1label: 'Assessment Questions',
    stat2label: 'Risk Domains',
    stat3label: 'Chapters Referenced',
  },

  // ── Why section ───────────────────────────────────────────────────
  why: {
    eyebrow: 'Why This Matters',
    heading: 'Most people realise too late\nthat knowledge is infrastructure',
    headingLine1:  'Most people realise too late',
    headingAccent: 'knowledge is infrastructure',
    cards: [
      { num: '01', title: 'Crises Don\'t Announce Themselves',    body: 'Power grids fail. Supply chains break. Systems that felt permanent vanish overnight. The gap between awareness and action is where most people get caught.' },
      { num: '02', title: 'Preparedness Is a Skill, Not a Product', body: 'You can\'t buy resilience. You can only build it — through knowledge, practice, and systems developed before the pressure arrives.' },
      { num: '03', title: 'Most Guides Are Incomplete',           body: 'Checklists without context are useless. Our framework connects every recommendation to the reasoning behind it and the specific scenario it addresses.' },
      { num: '04', title: 'Community Is the Ultimate Multiplier', body: 'No individual survives a sustained crisis alone. Building and sustaining a local resilience network is the highest-leverage preparation you can make.' },
    ],
  },

  // ── What You Get section ──────────────────────────────────────────
  offer: {
    eyebrow:    'What You Get',
    heading:    'Free. 3 minutes.',
    subheading: 'Real results.',
    cards: [
      { num: '01', title: 'Resilience Score',       body: 'Your score across 21 scenario-based questions and 5 critical domains — an honest baseline of where you stand right now.' },
      { num: '02', title: 'Domain Breakdown',       body: 'See exactly which domains — Psychology, Resources, Medicine, Social, Safety — are your strengths and which need urgent work.' },
      { num: '03', title: 'Priority Reading Plan',  body: 'Every gap links to the exact chapter in When Systems Fail. Not vague advice — a personalised study list with specific page references.' },
      { num: '04', title: 'Action Checklist',       body: '18 concrete, prioritised tasks saved to your Cabinet. Check them off as you build real capability over weeks, not days.' },
    ],
    btn: 'Take Free Assessment',
  },

  // ── Book section ──────────────────────────────────────────────────
  book: {
    eyebrow:   'The Book',
    title:     'WHEN SYSTEMS FAIL',
    sub:       'A complete one-year system — five parts, one for each phase of collapse.',
    bullet1:   '✓ 20 scenario-based chapters',
    bullet2:   '✓ Checklists and decision protocols',
    bullet3:   '✓ Evidence-based, not fear-based',
    btn:       'Get the Book on Amazon',
    coverFoot: '20 Chapters · 5 Domains',
  },

  // ── YouTube section ───────────────────────────────────────────────
  youtube: {
    eyebrow:    'Free Video Guides',
    heading:    'Watch the protocols',
    subheading: 'in action.',
    intro:      'Thematic deep-dives on the When Systems Fail YouTube channel. Practical demonstrations — water filtration, the STOP protocol, crowd survival, and more.',
    videos: [
      { cat: 'Resources',  title: 'How to Build a DIY Water Filter' },
      { cat: 'Psychology', title: 'The STOP Protocol Explained' },
      { cat: 'Safety',     title: 'Crowd Survival: How to Move in a Panic' },
      { cat: 'Medicine',   title: 'Wound Compression and Sepsis Signs' },
    ],
    btnAll: 'View All Videos on YouTube →',
  },

  // ── Testimonials ──────────────────────────────────────────────────
  testi: {
    eyebrow:    'From The Community',
    heading:    'Real people.',
    subheading: 'Real preparation.',
  },

  // ── Bottom CTA ────────────────────────────────────────────────────
  cta: {
    eyebrow: 'Your Assessment Awaits',
    heading: 'HOW RESILIENT ARE YOU — REALLY?',
    sub:     'Take the free 21-question assessment and find out exactly where your preparedness gaps are — with a personalised reading plan to close them.',
    btn:     'Start Free Assessment',
  },

  // ── Calculator ────────────────────────────────────────────────────
  calc: {
    heading:        'HOW RESILIENT ARE YOU?',
    sub:            '21 scenario-based questions across 5 domains. Get your Resilience Score, find your blind spots, and receive a personalised chapter reading plan.',
    privacy:        '🔒 No spam. Unsubscribe anytime.',
    emailPlaceholder: 'your@email.com',
    btnBegin:       'Begin',
    meta:           '<b>21</b> questions · 5 domains · ~5 min',
    btnNext:        'Next',
    btnSeeResults:  'See Results',
    btnBack:        '← Back',
  },

  // ── Results ───────────────────────────────────────────────────────
  results: {
    label:               'Your Resilience Score',
    domainHeading:       'Score by Domain',
    readingPlanHeading:  'Your Priority Reading Plan',
    readingPlanSub:      'Personalised chapters to close your gaps',
    critical:            'Critical gap',
    recommended:         'Recommended reading',
    bookCtaChapters:     'chapters are in the book.',
    bookCtaBody:         'Your personalised reading plan is ready — every answer is in the When Systems Fail guide.',
    bookCtaBtn:          'Get the Book on Amazon',
    btnSave:             'Save to Cabinet',
    btnRetake:           'Retake Assessment',
    btnIntel:            'Browse Intel Hub →',
  },

  // ── Tier levels ───────────────────────────────────────────────────
  tiers: [
    { min: 80, name: 'HIGHLY RESILIENT', color: '#2A6B42', desc: 'Exceptional preparedness. You have built real capability across multiple domains. Focus on community leadership and your remaining gaps.' },
    { min: 60, name: 'PREPARED',         color: '#8B6914', desc: 'Solid foundation with identified gaps. Address your weak domains systematically to achieve high resilience within 90 days.' },
    { min: 40, name: 'DEVELOPING',       color: '#8B5E14', desc: 'You understand preparedness but significant gaps remain. Prioritise the immediate actions in your weakest domains first.' },
    { min:  0, name: 'VULNERABLE',       color: '#B02A1A', desc: 'Critical preparedness gaps identified. Start with water, food, and communication basics immediately — these cost little and save lives.' },
  ],

  // ── Cabinet ───────────────────────────────────────────────────────
  cabinet: {
    label:        'Personal Dashboard',
    heading:      'YOUR CABINET',
    sub:          'Track your resilience progress, review assessments, manage your action checklist.',
    btnRetake:    'Retake Assessment',
    syncActive:   '☁ Cloud sync active',
    btnSignOut:   'Sign Out',
    authLabel:    'Cloud Account',
    authHeading:  'Save your results permanently',
    authSub:      'Enter your email and we\'ll send you a one-click sign-in link. No password required — works for both new and existing accounts.',
    authEmail:    'your@email.com',
    authBtn:      'Send Magic Link',
    authSkip:     'Continue without account →',
    authSending:  'Sending…',
    authSuccess:  '✓ Magic link sent — check your inbox and click the link to sign in.',
    authErrGeneral:   'Something went wrong. Please try again.',
    authErrRateLimit: 'Too many attempts. Please wait a moment and try again.',
    authErrInvalid:   'That email address doesn\'t look right. Please check and try again.',
    emptyHeading: 'No Assessment Yet',
    emptyBody:    'Complete the Resilience Calculator to populate your Cabinet with your score, domain breakdown, and a personalised action checklist.',
    emptyBtn:     'Take Assessment',
    resultTitle:  'ASSESSMENT RESULTS',
    statScore:    'Overall Score',
    statPct:      'Readiness %',
    statTier:     'Tier',
    statDate:     'Last Assessed',
    domainFallback: 'Overall Readiness',
    checklistTitle: 'ACTION CHECKLIST',
    clearBtn:     'Clear My Data',
    confirmMsg:   'This will permanently delete your assessment results and checklist progress. Are you sure?',
    confirmYes:   'Yes, clear everything',
    confirmNo:    'Cancel',
  },

  // ── Intel Hub ─────────────────────────────────────────────────────
  intel: {
    label:       'Knowledge Base',
    heading:     'INTEL HUB',
    sub:         'Field protocols, decision frameworks and medical references — drawn directly from the book. Each article is one chapter, one protocol, one actionable system.',
    searchPlaceholder: 'Search guides, protocols, chapters…',
    filterAll:   'All',
    filterWater: 'Water & Food',
    filterMed:   'Medical',
    filterEnergy:'Energy',
    filterEvac:  'Evacuation',
    filterSec:   'Security',
    filterPsych: 'Psychology',
    filterComms: 'Comms',
    featuredLabel:  'Featured',
    allGuidesLabel: 'All Guides',
    chaptersLabel:  'Book Chapters',
  },

  // ── Newsletter ────────────────────────────────────────────────────
  newsletter: {
    heading:     'ONE CHAPTER. EVERY WEEK.',
    sub:         '20 weeks. 20 chapters. One protocol delivered to your inbox every Thursday — drawn directly from the book. No fluff.',
    placeholder: 'your@email.com',
    btn:         'Subscribe',
    success:     '✓ Subscribed — first chapter lands Thursday',
    error:       'Something went wrong — try again',
  },

  // ── Footer ────────────────────────────────────────────────────────
  footer: {
    legal:       '© 2025 When Systems Fail',
    privacyLink: 'Privacy Policy',
  },

  // ── Domains ───────────────────────────────────────────────────────
  domains: [
    'Psychology & Decision-Making',
    'Resources & Autonomy',
    'Emergency Medicine',
    'Social Dynamics & Group',
    'Safety & Logistics',
  ],

  // ── Questions ─────────────────────────────────────────────────────
  questions: [
    {
      domain: 0,
      q: 'The entire city has simultaneously lost power and mobile signal from all operators. What is your first action?',
      opts: [
        { k: 'A', l: 'Immediately start packing all belongings from your apartment into the car.',             s: 1 },
        { k: 'B', l: 'Stop all movement for a few minutes, drink water, and make a plan for the next step.',  s: 2 },
        { k: 'C', l: 'Go outside to ask neighbours about the news and the authorities\' plans.',               s: 0 },
      ],
      ref: 'Chapter 1.4 — The STOP Protocol',
    },
    {
      domain: 0,
      q: 'Unrest has begun in the city. You feel that "this will end soon" and "the authorities will fix it." How should you act in this state of mind?',
      opts: [
        { k: 'A', l: 'Accept this reassurance as a way to stay calm and wait for official announcements.',    s: 0 },
        { k: 'B', l: 'Trust the feeling, but check your water supply just in case.',                          s: 1 },
        { k: 'C', l: 'Declare a personal "assume collapse" mode for 24 hours and act as if no help is coming.', s: 2 },
      ],
      ref: 'Chapter 1.2 — Why the Brain Says "This Is Temporary"',
    },
    {
      domain: 0,
      q: 'How do you correctly inform your family about the start of a systemic crisis without triggering panic?',
      opts: [
        { k: 'A', l: 'Share only dry facts (no signal for 6 hours, water pressure dropping) and assign specific tasks.', s: 2 },
        { k: 'B', l: 'Tell everyone immediately that full collapse has begun and you must flee now.',          s: 0 },
        { k: 'C', l: 'Calm everyone by calling it a minor outage, but secretly start packing.',               s: 1 },
      ],
      ref: 'Chapter 1.3 — How Not to Become a Panic Generator',
    },
    {
      domain: 0,
      q: 'You are caught in a large crowd panicking towards the exit of a train station. What do you do?',
      opts: [
        { k: 'A', l: 'Push towards the nearest wall and hold on tightly.',                                    s: 0 },
        { k: 'B', l: 'Move with the flow, gradually angling towards the exit.',                               s: 2 },
        { k: 'C', l: 'Stop and try to calm the people around you by shouting.',                               s: 1 },
      ],
      ref: 'Chapter 6.1 — Megacity in Collapse: Crowds',
    },
    {
      domain: 0,
      q: 'After 5 days without signal, you desperately want news — but your phone is nearly dead. What is the right decision?',
      opts: [
        { k: 'A', l: 'Use the remaining power bank charge to search for a network online.',                   s: 0 },
        { k: 'B', l: 'Set a strict routine: turn the phone on for 5 minutes, three times per day only.',     s: 2 },
        { k: 'C', l: 'Go to the nearest crowd gathering to hear the latest news.',                            s: 1 },
      ],
      ref: 'Chapter 7.12 — Digital Withdrawal',
    },
    {
      domain: 1,
      q: 'Tap water is still running but mobile signal has disappeared. What is the minimum you should collect?',
      opts: [
        { k: 'A', l: 'Whatever fits in a kettle and all kitchen pots.',                                      s: 1 },
        { k: 'B', l: 'Fill every possible container — bathtub, boiler, and all bottles.',                   s: 2 },
        { k: 'C', l: 'Collect a few 5-litre bottles and wait for the water to be restored.',                s: 0 },
      ],
      ref: 'Chapter 3.3 — 72-Hour Priorities: Water',
    },
    {
      domain: 1,
      q: 'Your fresh food supply is running out. What is the most rational order to consume your reserves?',
      opts: [
        { k: 'A', l: 'Eat canned goods first because they are the most filling; leave vegetables for later.', s: 0 },
        { k: 'B', l: 'Eat all meat and dairy first, then grains and canned goods.',                          s: 2 },
        { k: 'C', l: 'Eat a little from every category to keep the diet balanced.',                          s: 1 },
      ],
      ref: 'Chapter 5.3 — Food: Calorie Tables and Rationing',
    },
    {
      domain: 1,
      q: 'One month after a collapse begins, which item holds the highest barter value?',
      opts: [
        { k: 'A', l: 'Gold jewellery and bank ingots.',                                                      s: 1 },
        { k: 'B', l: 'Household appliances and electronics.',                                                s: 0 },
        { k: 'C', l: 'Alcohol, cigarettes, antibiotics, and batteries.',                                    s: 2 },
      ],
      ref: 'Chapter 2.5 — Cash and Valuables: The Barter Fund',
    },
    {
      domain: 1,
      q: 'You have decided to shelter in place. Which zone of your apartment is most critical to prepare?',
      opts: [
        { k: 'A', l: 'The largest room with panoramic windows for observation.',                             s: 0 },
        { k: 'B', l: 'The smallest room without north-facing windows — the "warm room".',                   s: 2 },
        { k: 'C', l: 'The kitchen, because it has a stove and food.',                                       s: 1 },
      ],
      ref: 'Chapter 5.4 — The Warm Room Concept',
    },
    {
      domain: 2,
      q: 'A member of your group has a deep cut with heavy bleeding. What is your first action?',
      opts: [
        { k: 'A', l: 'Rinse the wound with vodka or alcohol for disinfection.',                             s: 0 },
        { k: 'B', l: 'Press a clean cloth firmly against the wound and hold for 5–10 minutes without stopping.', s: 2 },
        { k: 'C', l: 'Immediately apply a tourniquet above the cut.',                                       s: 1 },
      ],
      ref: 'Chapter 8.1.1 — Medicine: Cuts and Bleeding',
    },
    {
      domain: 2,
      q: 'How do you recognise that a normal wound infection is turning into life-threatening sepsis?',
      opts: [
        { k: 'A', l: 'Redness and throbbing pain has appeared around the wound.',                           s: 1 },
        { k: 'B', l: 'The person develops intense thirst and nausea.',                                      s: 0 },
        { k: 'C', l: 'Redness is spreading from the wound, temperature has spiked, confusion has set in.', s: 2 },
      ],
      ref: 'Chapter 8.1 — Common Problems: Infections and Sepsis',
    },
    {
      domain: 2,
      q: 'A child in your group has severe diarrhoea and there are no medicines. How do you prevent fatal dehydration?',
      opts: [
        { k: 'A', l: 'Give plenty of clean water with nothing added.',                                      s: 1 },
        { k: 'B', l: 'Make a solution: 1 litre of water + 6 teaspoons of sugar + half a teaspoon of salt.', s: 2 },
        { k: 'C', l: 'Stop giving any fluid to "stop the process".',                                       s: 0 },
      ],
      ref: 'Appendix I — Oral Rehydration Solution',
    },
    {
      domain: 2,
      q: 'A person is severely hypothermic in winter. Which action is STRICTLY forbidden?',
      opts: [
        { k: 'A', l: 'Give hot tea with sugar.',                                                            s: 1 },
        { k: 'B', l: 'Rub their limbs with alcohol or snow and give them an alcoholic drink.',              s: 0 },
        { k: 'C', l: 'Lay the person horizontally and cover with dry blankets.',                            s: 2 },
      ],
      ref: 'Chapter 5.4 — Hypothermia: Prohibited Actions',
    },
    {
      domain: 2,
      q: 'Your group has a diabetic person and the insulin supply is critically low. What is the survival strategy?',
      opts: [
        { k: 'A', l: 'Halve the insulin dose immediately to extend the supply.',                            s: 0 },
        { k: 'B', l: 'Strictly restrict carbohydrates in their diet and immediately begin searching for medicine through barter.', s: 2 },
        { k: 'C', l: 'Keep everything as is and hope that help arrives in time.',                           s: 1 },
      ],
      ref: 'Chapter 2.3 — Protocol for Chronically Ill Group Members',
    },
    {
      domain: 3,
      q: 'An unknown person arrives at your base asking to join the group. What is the correct protocol?',
      opts: [
        { k: 'A', l: 'Let them in immediately — every extra pair of hands is a resource.',                  s: 0 },
        { k: 'B', l: 'Refuse — resources are scarce and the risk is too high.',                             s: 1 },
        { k: 'C', l: 'Negotiate on neutral ground, verify skills, and set a probationary period.',          s: 2 },
      ],
      ref: 'Chapter 7.7 — Accepting New People into the Group',
    },
    {
      domain: 3,
      q: 'Why is a daily routine considered a survival tool rather than just a habit?',
      opts: [
        { k: 'A', l: 'So children have something to do and don\'t distract the adults.',                   s: 1 },
        { k: 'B', l: 'Because it is the only way to maintain group discipline.',                            s: 1 },
        { k: 'C', l: 'Because predictable actions reduce stress hormones and prevent apathy — the "death of the spirit".', s: 2 },
      ],
      ref: 'Chapter 5.1 — Daily Routine: Why Structure Saves Lives',
    },
    {
      domain: 3,
      q: 'Your group has an elderly member who cannot help physically. What is their best role?',
      opts: [
        { k: 'A', l: 'Simply rest and stay out of the way.',                                                s: 0 },
        { k: 'B', l: 'Supervise children, track supplies, or prepare food.',                               s: 2 },
        { k: 'C', l: 'Serve as the "advisor" whose word is final in any dispute.',                         s: 1 },
      ],
      ref: 'Chapter 7.9.2 — The Elderly: Experience vs. New Realities',
    },
    {
      domain: 4,
      q: 'You are using candles or a torch in your apartment at night. What is the primary safety requirement?',
      opts: [
        { k: 'A', l: 'Keep a fire extinguisher next to every candle.',                                     s: 1 },
        { k: 'B', l: 'Ensure complete blackout of all windows with blankets or boards.',                   s: 2 },
        { k: 'C', l: 'Place candles only in the centre of the room away from curtains.',                   s: 1 },
      ],
      ref: 'Chapter 3.3 — Light Discipline and Blackout',
    },
    {
      domain: 4,
      q: 'You have decided to evacuate by car. When is the best time to leave?',
      opts: [
        { k: 'A', l: 'During the day, so you can clearly see the road and any obstacles.',                  s: 1 },
        { k: 'B', l: 'Immediately after receiving the official evacuation order.',                          s: 1 },
        { k: 'C', l: 'Within the first 6 hours ("golden window") or at night/early morning (4:00–6:00).',  s: 2 },
      ],
      ref: 'Chapter 3.4 — Windows of Opportunity',
    },
    {
      domain: 4,
      q: 'How do you move safely on foot through a dangerous area of the city?',
      opts: [
        { k: 'A', l: 'Along the middle of a wide street, so you can see everything around you.',            s: 0 },
        { k: 'B', l: 'Along building walls, stopping and listening before each corner.',                   s: 2 },
        { k: 'C', l: 'Sprinting quickly from one doorway to another.',                                     s: 1 },
      ],
      ref: 'Chapter 6.5 — Pedestrian Movement Tactics',
    },
    {
      domain: 4,
      q: 'You must choose: shelter in your apartment or evacuate to the countryside. What is the decisive question?',
      opts: [
        { k: 'A', l: 'Where will I be more comfortable sleeping and eating for the next week?',             s: 0 },
        { k: 'B', l: 'Will my food supply last another 10 days here?',                                     s: 1 },
        { k: 'C', l: 'If the situation gets worse, will I be able to leave later as safely as I can leave now?', s: 2 },
      ],
      ref: 'Chapter 3.1 — The Mental Trap: "We\'ll Leave Later"',
    },
  ],

  // ── Checklist ─────────────────────────────────────────────────────
  checklist: [
    { t: 'Learn and practise the STOP protocol: stop, breathe, drink water, plan',     ch: 'Ch. 1.4' },
    { t: 'Run a 24-hour "assume no help" drill with your household',                   ch: 'Ch. 1.2' },
    { t: 'Identify a meeting point and assign communication roles for your family',    ch: 'Ch. 1.3' },
    { t: 'Fill all containers (bathtub, boiler, bottles) as soon as water may cut',   ch: 'Ch. 3.3' },
    { t: 'Write a food consumption priority list: perishables → grains → canned',     ch: 'Ch. 5.3' },
    { t: 'Build a barter kit: alcohol, batteries, antibiotics, lighters',              ch: 'Ch. 2.5' },
    { t: 'Designate and prepare your "warm room" — smallest, fewest windows',         ch: 'Ch. 5.4' },
    { t: 'Practise wound compression: press cloth for 5–10 min without stopping',     ch: 'Ch. 8.1.1' },
    { t: 'Memorise sepsis signs: spreading redness, high fever, confusion',            ch: 'Ch. 8.1' },
    { t: 'Write the rehydration formula on paper and store it in your first aid kit',  ch: 'App. I' },
    { t: 'Install blackout curtains or prepare dark material for every window',        ch: 'Ch. 3.3' },
    { t: 'Plan your evacuation golden window: first 6h or 4:00–6:00am',               ch: 'Ch. 3.4' },
    { t: 'Walk your evacuation route on foot at dawn to understand real conditions',   ch: 'Ch. 6.5' },
    { t: 'Write your stay-vs-go decision rule and post it somewhere visible',          ch: 'Ch. 3.1' },
    { t: 'Set a phone usage schedule: 5 minutes on, 3 times per day maximum',         ch: 'Ch. 7.12' },
    { t: 'Create a daily routine schedule for use during crisis conditions',           ch: 'Ch. 5.1' },
    { t: 'Write down a role for every household member, including the elderly',        ch: 'Ch. 7.9.2' },
    { t: 'Define your group acceptance protocol: neutral ground, skills, trial period', ch: 'Ch. 7.7' },
  ],

  // ── Articles ──────────────────────────────────────────────────────
  // ── Articles ──────────────────────────────────────────────────────
  articles: [

    // ── FEATURED 0 ────────────────────────────────────────────────────
    {
      id: 0, cat: 'psychology', catL: 'Psychology', ch: 'Ch. 1.5', time: '12 min',
      title: 'The Golden Window: Why the First 6 Hours Determine Everything',
      expt:  'In every documented crisis the people who acted in the first 6 hours had options. Those who waited for confirmation did not. Here is why — and what to do.',
      content: `<h4>Why the First 6 Hours Are Unlike Any Other</h4>
<p>After the onset of any serious crisis — a power grid failure, the start of armed conflict, a flood, a pandemic lockdown — you have a limited window during which certain actions are still possible. When that window closes, the action becomes impossible, or fatally dangerous.</p>
<p>This is not theory. In Mariupol in 2022, people who evacuated in the first 12 hours describe the decision as "not obvious" and "premature." People who stayed describe the early evacuees as "far-sighted." In hindsight, the correct decision always looks obvious. At the moment of decision — almost never.</p>
<h4>The Four Windows</h4>
<p><strong>🟢 The Golden Window: 0–12 hours.</strong> Most people have not yet understood what is happening. Stores are open. Roads are clear. ATMs are dispensing cash. There is no panic yet — only confusion. This is when action costs the least and returns the most.</p>
<p><strong>🟡 The Yellow Window: 12–36 hours.</strong> Mass awareness sets in. Queues at stores, gas stations, ATMs. First conflicts. Roads are congested but moving. Service is intermittent. Everything is still possible — but harder and slower.</p>
<p><strong>🔴 The Red Window: 36–72 hours.</strong> Stores are closed or looted. Gas stations are empty. ATMs are down. First serious incidents — robberies, violence. Leaving is still possible but carries real risk.</p>
<p><strong>⬛ Closed: 72+ hours.</strong> The new reality has set in. Those who made it in time, made it. Work with what you have. Think in weeks, not hours.</p>
<h4>Priority Actions for the Golden Window</h4>
<p>These actions must happen <strong>in parallel, not sequentially</strong>. Send people in different directions simultaneously.</p>
<ul style="padding-left:18px;margin:12px 0;line-height:2">
  <li>Withdraw cash — ATMs are still working, no queues yet</li>
  <li>Fill the car + jerry cans — no rationing yet</li>
  <li>Buy critical supplies — stores are still open</li>
  <li>Contact and gather close ones</li>
  <li>Pick up children from school or activities</li>
  <li>Make the stay-or-evacuate decision (see the Decision Matrix)</li>
</ul>
<p>Time to complete: <strong>2–4 hours.</strong> Do not wait for confirmation before starting.</p>
<h4>The Common Mistake</h4>
<p>"I'll wait an hour and see what happens." This phrase, repeated across every documented crisis, has one consistent consequence: you lose the Golden Window. The asymmetry is worth understanding before a crisis, not during one. If you act and the crisis does not materialize — you have lost one day. If you wait and the crisis is real — you may have lost your only window.</p>
<p>The 72-hour rule applies across all scenarios: for the first 72 hours, you rely entirely on your own resources. If the situation has not normalized after 72 hours — plan in weeks, not days.</p>`,
    },

    // ── FEATURED 1 ────────────────────────────────────────────────────
    {
      id: 1, cat: 'psychology', catL: 'Psychology', ch: 'Ch. 1.4', time: '6 min',
      title: 'The STOP Protocol: How to Break Out of Panic in 90 Seconds',
      expt:  'Panic is not weakness — it is biology. The STOP Protocol is a four-step technique that interrupts the stress response and restores rational thinking within seconds.',
      content: `<h4>Why Panic Is Not Weakness</h4>
<p>Panic is a biological response, not a character flaw. Under acute stress, the amygdala — the brain's threat-detection centre — suppresses the prefrontal cortex, the part responsible for rational planning. Your brain is doing exactly what evolution programmed it to do. The STOP Protocol is a way to give your brain permission to think instead of react.</p>
<p>Statistics from disaster zones: groups in which even one person went into hysterics in the first 48 hours had a <strong>15% lower probability of survival after one month</strong> — not because the hysteria consumed resources, but because it destroyed trust and coordination.</p>
<h4>The Four Steps</h4>
<p><strong>S — Stop physically.</strong> When you are in panic, you move chaotically. You grab things without purpose. Your attention switches every 5–10 seconds. First command: stop your body. Literally. If you are standing — freeze in place. If you are sitting — place your hands on your knees. Panic is movement without purpose. Stopping signals the brain that no immediate threat is present.</p>
<p><strong>T — Think. (4–4–6 breathing.)</strong> Inhale through your nose for a count of 4. Hold for a count of 4. Exhale through your mouth for a count of 6 — the slow exhale is the mechanism. The extended exhale activates the parasympathetic nervous system and forces the body out of threat mode. Repeat 3–5 times. The effect is measurable within 90 seconds.</p>
<p><strong>O — Observe.</strong> Redirect attention from internal chaos to external reality. Answer out loud: Where am I right now? Name 3 objects you can see. Name 2 sounds you can hear. Name what you feel physically — floor beneath your feet, temperature of the air. Panic is when you are inside your head, not in reality. Observation grounds you to here and now — where you are not dying at this exact second.</p>
<p><strong>P — Plan.</strong> Not a plan for the week. Not a survival strategy. Just the <strong>next step</strong>. Ask yourself: "What can I do right now that will improve my situation by even 1%?" Fill a water bottle. Check that the doors are locked. Write down a list of the food in the house. Action = control. Even a microscopic action signals the brain: I am not helpless.</p>
<h4>The Group Multiplier</h4>
<p>The group copies the leader's tone. If you scream — they scream. If you are paralyzed — they are paralyzed. If you act calmly — they act. You do not have to be certain. You simply have to be the person who takes the next step while others stand still. Practice the STOP Protocol now, while you are calm — and in a moment of stress it will become a reflex.</p>`,
    },

    // ── FEATURED 2 ────────────────────────────────────────────────────
    {
      id: 2, cat: 'evacuation', catL: 'Evacuation', ch: 'Ch. 3.2', time: '10 min',
      title: 'Stay or Evacuate? The 80-Point Decision Matrix',
      expt:  'The two most dangerous phrases in a crisis: "we will leave later" and "home is safest." This scoring system removes emotion from the most critical decision of the first 24 hours.',
      content: `<h4>The Two Most Dangerous Phrases</h4>
<p><em>"We'll stay for now. If things get really bad, we'll leave then."</em></p>
<p><em>"It's safer at home. There's no need to go anywhere."</em></p>
<p>Both phrases share one structure: postponement. And postponing a decision in a collapse is itself a decision — with documented consequences. In Mariupol in 2022, those who evacuated in the first 3 days got out on open roads. Those who waited 10 days found the city encircled. The decision to stay or go must be made while you still have a real choice.</p>
<h4>The Four Blocks (80 Points Total)</h4>
<p>The decision is not an emotion. It is a calculation across four domains, each scored from 1 to 20.</p>
<p><strong>Block 1 — Shelter Safety (max 20 pts)</strong></p>
<ul style="padding-left:18px;margin:8px 0;line-height:1.9;font-size:0.85rem">
  <li>Physical threat (war, disaster, fire): none = 5, possible = 3, direct = 1</li>
  <li>Structural integrity: solid = 5, cracks but standing = 3, damaged = 1</li>
  <li>Defensibility: can lock/barricade = 5, partial = 3, cannot = 1</li>
  <li>Social environment: friendly neighbours = 5, neutral = 3, aggressive = 1</li>
</ul>
<p><strong>Block 2 — Supplies (max 20 pts)</strong></p>
<ul style="padding-left:18px;margin:8px 0;line-height:1.9;font-size:0.85rem">
  <li>Food: 14+ days = 5, 7–14 days = 3, under 7 days = 1</li>
  <li>Water: same scale</li>
  <li>Medication (chronic conditions): 30+ days = 5, 14–30 = 3, under 14 = 1</li>
  <li>Resupply possibility: easy = 5, difficult = 3, impossible = 1</li>
</ul>
<p><strong>Block 3 — People (max 20 pts)</strong></p>
<ul style="padding-left:18px;margin:8px 0;line-height:1.9;font-size:0.85rem">
  <li>Physical capability: all healthy = 5, elderly/children but mobile = 3, bedridden = 1</li>
  <li>Psychological stability: all stable = 5, some panic but manageable = 3, mass panic = 1</li>
  <li>Group size: 2–4 people (optimal) = 5, 5–7 = 3, alone or 8+ = 1</li>
</ul>
<p><strong>Block 4 — Evacuation Route (max 20 pts)</strong></p>
<ul style="padding-left:18px;margin:8px 0;line-height:1.9;font-size:0.85rem">
  <li>Destination: specific place (relatives, country house) = 5, rough idea = 3, no plan = 1</li>
  <li>Distance: under 50 km = 5, 50–150 km = 3, over 150 km = 1</li>
  <li>Road conditions: passable = 5, congested but moving = 3, blocked = 1</li>
  <li>Transport: car + fuel = 5, car with limited fuel = 3, no car = 1</li>
</ul>
<h4>Reading Your Score</h4>
<ul style="padding-left:18px;margin:8px 0;line-height:1.9">
  <li><strong>60–80: Stay.</strong> Shelter is safe, supplies adequate, group stable.</li>
  <li><strong>40–59: Gray zone.</strong> Prepare for both. Fortify and pack simultaneously.</li>
  <li><strong>20–39: Go.</strong> Evacuation is the safer option — act while the window is open.</li>
  <li><strong>Under 20: Critical.</strong> Staying is fatal, leaving is nearly impossible. Find any way out.</li>
</ul>
<h4>Reassess Every 12–24 Hours</h4>
<p>If your shelter safety has worsened, if supplies have dropped to under 3 days, if roads have deteriorated, or if an official evacuation order has been issued — score again. The correct decision at hour 6 may be the wrong decision at hour 36. Reassessment is not indecision; it is correct calibration.</p>
<p style="font-size:0.8rem;color:var(--ink-muted);margin-top:8px">The Gray Zone rule: do everything simultaneously. Fortify the shelter AND pack the Bug-Out Bag. If the decision later turns out to be "stay" — you have only lost a few hours of packing. If it is "go" — your bag is already ready.</p>`,
    },

    // ── GRID ARTICLE 3 ────────────────────────────────────────────────
    {
      id: 3, cat: 'water', catL: 'Water & Food', ch: 'Ch. 5.2', time: '10 min',
      title: 'The 3-Litre Rule: Collect, Store and Purify Water Without Infrastructure',
      expt:  'Without food you survive weeks. Without water you survive days. This is the complete collection hierarchy, storage protocol and purification comparison — from boiling to SODIS.',
      content: `<h4>The Survival Arithmetic</h4>
<p>Without food — 2 to 4 weeks. Without water — 3 to 4 days. In any collapse scenario, your water situation determines your survival timeline more than any other single factor. Most people discover this problem too late: the taps run dry because electric pumps have no power, and the window to collect water has already closed.</p>
<p>The deadline is <strong>4–6 hours</strong> from the onset of collapse. After that, tap water will most likely stop flowing — pumps run on electricity, backup generators last 2–6 hours. Act before you need to.</p>
<h4>The Survival Standard: 3 Litres Per Person Per Day</h4>
<ul style="padding-left:18px;margin:8px 0;line-height:2">
  <li><strong>2 L</strong> — drinking (small sips throughout the day)</li>
  <li><strong>0.5 L</strong> — cooking (porridge, soups)</li>
  <li><strong>0.5 L</strong> — hygiene (wash face, wash hands)</li>
</ul>
<p>Your water horizon: total litres ÷ (number of people × 3) = days of supply. Calculate this now.</p>
<h4>Collection Hierarchy (in order of priority)</h4>
<p><strong>1. Bathtub.</strong> 150–200 litres. Wash the tub before filling. Cover with plastic film to keep out dust. Mark it as non-drinking (use for washing only unless boiled).</p>
<p><strong>2. Water heater.</strong> Turn off electricity/gas → find the drain valve at the bottom → place a bucket underneath → open. 50–100 litres of usable water in every apartment that has one.</p>
<p><strong>3. Every available container.</strong> Pots, buckets, bottles, jerry cans. Fill everything before you start calculating.</p>
<p><strong>4. Toilet cistern.</strong> 6–10 litres. Non-drinking but safe after boiling. Use for flushing or sanitation.</p>
<h4>Purification: What Works and What Doesn't</h4>
<p><strong>Boiling</strong> is the most reliable method. Bring to a boil and continue for 10 minutes — not just "reached a boil." Kills all bacteria, viruses, and parasites. Does not remove chemical contamination.</p>
<p><strong>Chlorination</strong> (household bleach, 5–6%): 2 drops per litre for clear water, 4 drops for cloudy water. Let stand 30 minutes. Effective against most bacteria and viruses.</p>
<p><strong>Purification tablets</strong> (Aquatabs, Micropur): 1 tablet per 1–2 litres, wait 30 minutes. Convenient but finite — treat as temporary.</p>
<p><strong>Improvised filtration</strong> — layers of cloth, sand, and charcoal — removes particles and improves taste but does <strong>not</strong> disinfect. Always boil or chlorinate after filtering.</p>
<p><strong>SODIS</strong> (solar disinfection): clear plastic bottle, 6 hours in direct sun. Free, but ineffective in winter or heavy cloud cover.</p>
<h4>Storage Rules</h4>
<p>Water in a sealed container can turn within 5–7 days in warm conditions. Signs of spoiled water: unpleasant smell, green film on container walls, cloudiness. Store in cool darkness, in sealed containers, split across multiple vessels — if one spoils, the rest survives.</p>`,
    },

    // ── GRID ARTICLE 4 ────────────────────────────────────────────────
    {
      id: 4, cat: 'water', catL: 'Water & Food', ch: 'Ch. 5.3', time: '8 min',
      title: 'Eat This First: The Consumption Order and 1,500-Calorie Survival Ration',
      expt:  'A full cupboard lasts 3–5 days, not the month most people assume. The correct consumption sequence — perishables first, long-term reserves last — stretches that by weeks.',
      content: `<h4>The Illusion of the Full Cupboard</h4>
<p>A full cupboard is 3–5 days of food. Most people believe it is more. Stress accelerates consumption further — the brain seeks comfort in food, and without a structured meal schedule, people eat chaotically, whenever they are scared or bored. Food that should have lasted 10 days gets eaten in 5. The solution is two things working together: the correct <strong>consumption sequence</strong> and a fixed <strong>daily ration</strong>.</p>
<h4>The Consumption Sequence</h4>
<p>The order in which you eat your food determines how long it lasts. Follow this sequence strictly:</p>
<p><strong>Days 1–3: Perishables first.</strong> Meat, dairy, bread, fresh vegetables. These will spoil — eat them now. Their calories cannot be recovered once lost.</p>
<p><strong>Days 3–7: Medium-term.</strong> Frozen products (if cold is still available — frozen meat and ice cream last 3–7 days in a cold room without electricity).</p>
<p><strong>Day 4 onward: Long-term reserves.</strong> Grains, pasta, canned goods, sugar, oil, dried fruit. These keep for months. Use them carefully and track them daily.</p>
<h4>Survival Calorie Minimums</h4>
<p>These are not comfort levels. They are the minimum required to maintain cognitive function and basic physical capability:</p>
<ul style="padding-left:18px;margin:8px 0;line-height:2;font-size:0.85rem">
  <li>Adult male (sedentary): <strong>1,500 kcal/day</strong></li>
  <li>Adult male (active, going out for resources): <strong>2,000–2,200 kcal/day</strong></li>
  <li>Adult female (sedentary): <strong>1,200 kcal/day</strong></li>
  <li>Children 7–12: <strong>1,000 kcal/day</strong> — do not cut below this</li>
  <li>Children under 7: <strong>800 kcal/day</strong></li>
</ul>
<p>Below 1,200 kcal/day for more than a few weeks: impaired cognition, weakened immunity, and poor wound healing begin.</p>
<h4>A 1,500-Calorie Daily Ration (One Adult)</h4>
<p style="font-size:0.82rem;color:var(--ink-muted);margin-bottom:10px">Breakfast — 450 kcal</p>
<ul style="padding-left:18px;margin:0 0 12px;line-height:1.8;font-size:0.82rem">
  <li>Oatmeal, 50g dry — 185 kcal</li>
  <li>Vegetable oil, 10g — 90 kcal</li>
  <li>Bread, 50g — 125 kcal</li>
  <li>Sugar, 1 tsp — 20 kcal</li>
</ul>
<p style="font-size:0.82rem;color:var(--ink-muted);margin-bottom:10px">Lunch — 600 kcal</p>
<ul style="padding-left:18px;margin:0 0 12px;line-height:1.8;font-size:0.82rem">
  <li>Buckwheat, 70g dry — 230 kcal</li>
  <li>Canned meat, 100g — 250 kcal</li>
  <li>Bread, 50g — 125 kcal</li>
</ul>
<p style="font-size:0.82rem;color:var(--ink-muted);margin-bottom:10px">Dinner — 450 kcal</p>
<ul style="padding-left:18px;margin:0 0 12px;line-height:1.8;font-size:0.82rem">
  <li>Pasta, 50g dry — 175 kcal</li>
  <li>Canned fish, 100g — 150 kcal</li>
  <li>Bread, 50g — 125 kcal</li>
</ul>
<h4>Measuring Without Scales</h4>
<p>1 standard glass (200 mL) of buckwheat ≈ 170g ≈ 560 kcal. 1 glass of rice ≈ 180g ≈ 630 kcal. 1 tablespoon of oil ≈ 135 kcal. A handful of nuts ≈ 30g ≈ 180–210 kcal. Memorise two or three of these and you can track your ration without any equipment.</p>`,
    },

    // ── GRID ARTICLE 5 ────────────────────────────────────────────────
    {
      id: 5, cat: 'medical', catL: 'Medical', ch: 'Ch. 8.1', time: '9 min',
      title: 'Wound Care Without a Doctor: The 5-Step Protocol and When Infection Becomes Sepsis',
      expt:  'A small untreated cut can become sepsis in 3–5 days. This is the complete wound treatment sequence, the signs of infection escalation, and the single symptom that means immediate antibiotics.',
      content: `<h4>Why Small Cuts Kill in a Crisis</h4>
<p>Under normal conditions, an infected cut is an inconvenience. In a prolonged crisis — without clean water for handwashing, with weakened immunity from stress and poor diet, with no pharmacy — the same cut can become sepsis in <strong>3–5 days</strong>. This is not exaggeration; it is documented in every prolonged siege situation, including Sarajevo and the conditions in Mariupol. The protocol below is drawn from adapted TCCC (Tactical Combat Casualty Care) guidelines.</p>
<h4>The 5-Step Protocol</h4>
<p><strong>Step 1 — Stop the bleeding.</strong> Clean cloth or gauze pressed firmly on the wound. Hold for 5–10 minutes without lifting. Do not pull away — let a clot form. For severe arterial bleeding from a limb: tourniquet placed as high above the wound as possible, maximum 2 hours. Write the time on the skin with a marker.</p>
<p><strong>Step 2 — Wash the wound.</strong> Cooled boiled water or saline under pressure — a syringe or a bottle with a narrowed tip works well. Flush thoroughly. Do <strong>not</strong> pour alcohol or iodine directly into the wound — that is a chemical burn of living tissue. Antiseptics go around the wound, not inside it.</p>
<p><strong>Step 3 — Apply antiseptic.</strong> Chlorhexidine is recommended — it does not sting and is effective. Hydrogen peroxide is acceptable around the wound edges. Iodine on the skin surrounding the wound only.</p>
<p><strong>Step 4 — Dress the wound.</strong> Sterile gauze or clean ironed cloth. Not too tight — you will cut off circulation. Change every 24–48 hours or when soaked through.</p>
<p><strong>Step 5 — Monitor for 3–5 days.</strong> Check daily for these signs of infection: redness spreading from the wound, increasing swelling, pus, rising body temperature, increased warmth around the wound.</p>
<h4>When Infection Becomes Sepsis</h4>
<p>A wound infection becomes a systemic emergency when you see a <strong>red streak running from the wound up the limb</strong>. This is lymphangitis — bacteria have entered the lymphatic vessels. Without an antibiotic, sepsis can follow within 12–24 hours.</p>
<p>Other sepsis signals: temperature above 39°C or below 36°C, rapid weak pulse, altered consciousness, skin that is pale and clammy. This is a medical emergency regardless of available resources.</p>
<h4>The Antibiotic Decision</h4>
<p>Antibiotics are needed when: the wound is showing redness and swelling 48+ hours after injury, purulent (yellow-green) discharge is present, or a red streak appears. The correct choice for wound infections is <strong>amoxicillin 500mg three times per day for 7–10 days</strong>, or ciprofloxacin 500mg twice per day if penicillin allergy is present. The rule that protects everyone: always complete the full course — stopping at first improvement is how antibiotic resistance begins.</p>`,
    },

    // ── GRID ARTICLE 6 ────────────────────────────────────────────────
    {
      id: 6, cat: 'medical', catL: 'Medical', ch: 'Ch. 2.3 & 8.5', time: '8 min',
      title: 'Who Will Not Survive Without Medication: Planning for Chronic Conditions in a Crisis',
      expt:  'Type 1 diabetes without insulin: coma in 2–3 days. Epilepsy without anticonvulsants: seizure risk at any moment. This is the 4-level criticality framework and the medical card system.',
      content: `<h4>The Timeline Nobody Wants to Calculate</h4>
<p>Type 1 diabetes without insulin: ketoacidosis begins within hours, coma within 2–3 days. Severe epilepsy without anticonvulsants: a seizure can happen at any moment, with risk of respiratory arrest. End-stage kidney failure without dialysis: 7–14 days. These are not worst-case estimates — they are documented physiological timelines. In a prolonged crisis, chronic conditions become the primary driver of mortality after the first two weeks.</p>
<h4>The Four Criticality Levels</h4>
<p><strong>Level 1 🔴 — Death within 24–72 hours without medication.</strong> Type 1 diabetes (insulin), epilepsy (anticonvulsants), severe asthma. These require a supply target of 90 days minimum and active resupply search as the first priority.</p>
<p><strong>Level 2 🟠 — Death within 3–7 days.</strong> Heart failure, severe hypertension, renal failure requiring dialysis. Partial dose reduction may extend the timeline but must be discussed with a physician before a crisis.</p>
<p><strong>Level 3 🟡 — Death within 2–4 weeks.</strong> Cancer without chemotherapy, HIV without ART. Time to seek any available medical system.</p>
<p><strong>Level 4 🟢 — Suffering, not death.</strong> Arthritis, anxiety, hypothyroidism. These matter for quality of life but do not require immediate triage priority.</p>
<h4>The Medical Card (Fill One for Every Chronic Patient in Your Group)</h4>
<p>Create this now, on paper, and store a copy with your documents and a copy in your Bug-Out Bag:</p>
<ul style="padding-left:18px;margin:8px 0;line-height:2;font-size:0.85rem">
  <li>Name / age</li>
  <li>Diagnosis</li>
  <li>Medication — exact name, dose, frequency</li>
  <li>Current supply (number of tablets / vials)</li>
  <li>Days of supply remaining</li>
  <li>Without medication — what happens and how soon</li>
</ul>
<p>This card is used by anyone in your group — not just you. If you are incapacitated, someone else must be able to administer your medication correctly.</p>
<h4>Where to Search When Supplies Run Out</h4>
<p>In order of likelihood: pharmacies (including those in partially abandoned areas — medications are frequently left behind), hospitals (often retain supplies even when partially non-functional — ask staff directly), neighbours and acquaintances with the same condition (possibility of exchange or free transfer), veterinary pharmacies (often remain open longer than human pharmacies and carry some equivalent medications). Always search with a specific target — the exact medication name in both trade and generic (INN) form, the dose, the formulation.</p>`,
    },

    // ── GRID ARTICLE 7 ────────────────────────────────────────────────
    {
      id: 7, cat: 'evacuation', catL: 'Evacuation', ch: 'Ch. 3.5', time: '8 min',
      title: 'The Bug-Out Bag: 8–12 kg of Self-Sufficiency for 72 Hours',
      expt:  'Most people pack a bag they cannot carry for 5 km. This is the weight-optimised, function-first category breakdown — including the child kit and the one thing most people forget.',
      content: `<h4>What a Bug-Out Bag Is Not</h4>
<p>A Bug-Out Bag (BOB) is not a camping kit. It is not a military loadout. It is the ability to survive the first 72 hours after everything familiar has ceased to exist — with what is on your back. The difference between a person with a BOB and one without is the difference between "I control the situation" and "I am a victim of circumstances."</p>
<p>One critical rule before the contents: <strong>weight</strong>. A bag must be carried for 5 kilometres, possibly in poor weather, possibly with a child's hand in yours. Every item must justify its weight. Adults: 8–12 kg. Children aged 5–12: 3–5 kg. Teenagers: 5–8 kg.</p>
<h4>The 10 Categories</h4>
<p><strong>Water.</strong> 2–3 litres in bottles. Minimum for 1 day. You will find more along the route.</p>
<p><strong>Food.</strong> 3 days of calorie-dense, no-cook items: canned goods, crackers, nuts, chocolate, dried fruit. Aim for 2,000 kcal/day in the smallest possible volume.</p>
<p><strong>Documents.</strong> Passport, identity documents, copies of property and insurance papers — in a waterproof folder. Photos of all documents on your phone as backup.</p>
<p><strong>Money.</strong> 20–30% of your cash reserve. Small denominations. Cards will not work.</p>
<p><strong>Clothing.</strong> Two changes of underwear, a warm jacket, rain gear, sturdy footwear already on your feet.</p>
<p><strong>First aid.</strong> Bandages, antiseptic, painkillers, and the <strong>complete supply of any personal chronic medications</strong>. This is the most commonly underpacked category.</p>
<p><strong>Tools.</strong> A knife, 5 metres of rope, tape, a lighter. These four items solve the majority of field problems.</p>
<p><strong>Communication.</strong> Phone with offline maps downloaded + power bank (fully charged). Spare SIM card if available.</p>
<p><strong>Hygiene.</strong> Soap, toilet paper, feminine supplies if relevant. Within one week of a crisis, hygiene products become scarce and acquire high barter value.</p>
<p><strong>Lighting.</strong> A headlamp with spare batteries. Both hands must remain free.</p>
<h4>The Child Kit (3–5 kg, Ages 5–12)</h4>
<p>One comfort item or favourite toy (psychological stability in displacement is not optional — it is protective). Treats for stressful moments. Two changes of clothing. Children's medications. And the most important item: what every child must know by heart from age 4 — full name, parents' names, phone number, home address, and the rally point: "If you get lost — go to [specific named place]."</p>
<h4>Where to Store It</h4>
<p>Not on a high shelf. Not in the garage. By the exit — hallway, under the bed nearest the door. The rule: you must be able to grab the bag and walk out in 30 seconds. Test this.</p>`,
    },

    // ── GRID ARTICLE 8 ────────────────────────────────────────────────
    {
      id: 8, cat: 'security', catL: 'Security', ch: 'Ch. 15.2.1', time: '7 min',
      title: 'The Gray Man Principle: Invisibility as the Primary Defense',
      expt:  'The strongest, best-armed person is not the safest in a crisis. The invisible one is. Three domains — appearance, behaviour, information — and why each matters.',
      content: `<h4>The Strongest Person Is Not the Safest</h4>
<p>In a crisis environment, the person who survives longest is not the best armed, the most physically powerful, or the loudest. It is the one nobody noticed. The Gray Man principle is about managing the impression you make on those around you — specifically, making no impression at all.</p>
<p>Aggressors choose targets. The decision takes seconds and is based almost entirely on visible signals: clothing, movement, eye contact, what you are carrying. Removing those signals removes the targeting calculation entirely.</p>
<h4>Three Domains of Invisibility</h4>
<p><strong>Appearance.</strong> Neutral-coloured civilian clothing — not new, not conspicuously worn. No tactical elements, no camouflage, no external attachment loops on bags. No visible jewellery, no branded clothing, no reflective elements. A standard civilian backpack in a city colour carries the same equipment as a tactical bag without the signal. The principle is not "dress poorly" — it is "dress to match your context." In an exhausted city, a clean new jacket is a beacon.</p>
<p><strong>Behaviour.</strong> Move at the same speed as those around you. Do not stop without reason. Move along walls and building edges, not down the centre of streets. Avoid prolonged eye contact — not looking away nervously, but not holding a stare either. Answer questions briefly and specifically. Do not volunteer information. Do not explain yourself beyond what was asked.</p>
<p><strong>Information.</strong> If asked about resources: "We have nothing, barely surviving." Do not say how many people are in your group. Do not reveal where you live. Do not discuss what you have in your bag. This is not deception — it is basic operational security. The person who knows your location and supply level knows what to take from you.</p>
<h4>The Color Codes of Awareness</h4>
<p>The Gray Man operates in a specific awareness state at all times outside the base:</p>
<ul style="padding-left:18px;margin:8px 0;line-height:2;font-size:0.85rem">
  <li><strong>⬜ White — relaxed:</strong> only at home, among trusted people</li>
  <li><strong>🟡 Yellow — alert:</strong> your standard state outside the base. Not paranoia — calm background awareness of who is nearby, what they are doing, where the exits are</li>
  <li><strong>🟠 Orange — alarm:</strong> something specific has caught attention</li>
  <li><strong>🔴 Red — ready:</strong> threat confirmed, conflict may be imminent</li>
</ul>
<p>Yellow code, properly understood, is not constant tension. It is a background scanning mode — the same way an experienced driver tracks road conditions without consciously thinking about it. It develops into a skill that requires no effort.</p>
<h4>The 3-Meter Rule</h4>
<p>At a distance of 3 metres or less, a person with a blade or blunt weapon can close the gap and strike faster than most people can react. <strong>Distance equals time. Time equals the ability to make a decision.</strong> Maintain distance from unknown individuals. Use obstacles between yourself and potential threats. Always know where you can withdraw to.</p>`,
    },

    // ── GRID ARTICLE 9 ────────────────────────────────────────────────
    {
      id: 9, cat: 'psychology', catL: 'Psychology', ch: 'Ch. 1.2', time: '7 min',
      title: 'Normalcy Bias: Why Your Brain Will Tell You It Is Just an Outage',
      expt:  'The brain actively constructs narratives that return a sense of control — even when the evidence points to collapse. This is the mechanism, the three-scenario illustration, and the override.',
      content: `<h4>The Brain's First Response to Collapse</h4>
<p>Normalcy bias is a psychological mechanism that causes people to underestimate a threat even when evidence of it is obvious. Your brain is wired for survival in a stable world. When that world breaks, the brain refuses to acknowledge it — not because it is unintelligent, but because acknowledging collapse means enormous stress, and the brain avoids stress at almost any cost.</p>
<p>This is not a personal failing. It is documented across every major crisis. In Mariupol in 2022, people who saw every warning sign available — artillery rumble at 50 km, stores emptying, banks closing — still waited for one more confirmation before acting. By the time that confirmation arrived, the window had closed.</p>
<h4>The Three Scenarios of Normalcy Bias</h4>
<p><strong>Scenario 1 — The first hours.</strong> No power. No mobile signal. You are sitting at home thinking: "They will turn it back on any minute now. An hour at most." An hour passes. Two. Three. You are still constructing a narrative that returns a sense of control: "Someone is fixing this." The problem is that nobody is fixing it — or can no longer fix it.</p>
<p><strong>Scenario 2 — Day one.</strong> You step outside. A neighbour says: "I heard there is a power station fault, they are promising to restore it by tomorrow." You hold onto this. It is an explanation that demands no action from you. You can simply wait. The day passes. The taps run dry because the pumps have no power.</p>
<p><strong>Scenario 3 — Days two and three.</strong> Stores are empty or shuttered. You think: "The police / the army / NATO will sort this out eventually." You still believe in a return to the old world. Meanwhile your supplies are disappearing. You are already too late.</p>
<h4>The Reality Test (Run Every 4 Hours on Day One)</h4>
<p>Five questions. Answer each honestly:</p>
<ol style="padding-left:18px;margin:8px 0;line-height:2">
  <li>Is there power?</li>
  <li>Is there mobile service?</li>
  <li>Is there water in the taps?</li>
  <li>Are stores operating?</li>
  <li>Can I see signs of order — police, official announcements?</li>
</ol>
<p><strong>If 3 or more answers are "no" — this is not a temporary outage. This is a collapse. Act accordingly.</strong></p>
<h4>The Override: Collapse Assumption Mode</h4>
<p>You will never receive an official announcement that says: "Attention, civilization has ended, proceed with your plan." The correct approach: declare "collapse assumption mode" to yourself for the next 24 hours. Say this out loud if it helps: <em>"I am assuming this is a collapse. For the next 24 hours I will act as though the world is not coming back. If everything is restored in 24 hours, I have only lost one day. If not, I will have a one-day head start over everyone who waited."</em></p>
<p>This is not panic. It is a temporary, reversible experiment with an asymmetric payoff. The cost of being wrong: one lost day. The cost of not doing it when it was real: potentially everything.</p>`,
    },

    // ── GRID ARTICLE 10 ───────────────────────────────────────────────
    {
      id: 10, cat: 'psychology', catL: 'Psychology', ch: 'Ch. 5.1 & 7.4', time: '6 min',
      title: 'Routine as a Survival Tool: Why Structure Prevents Apathy and Death',
      expt:  'During the Siege of Leningrad, people who lost their daily routine died faster — even when they had food. Not from hunger. From the absence of the will to live.',
      content: `<h4>How Apathy Kills</h4>
<p>During the Siege of Leningrad (1941–1944), researchers and diarists documented a consistent pattern: people who lost their daily routine — who stopped getting out of bed, stopped washing their face, stopped going outside — died faster, even when they had food. Not from hunger. From the absence of the will to act. In the language of modern neuroscience: chronic cortisol elevation without structured activity leads to serotonin depletion, anhedonia, and progressive withdrawal. The outcome in a survival situation is fatal.</p>
<p>Routine is not about comfort. It is about keeping the brain functioning as a decision-making tool rather than a liability.</p>
<h4>The "Time Dissolves" Phenomenon</h4>
<p>Without electricity, without work, without your usual schedule — days blur into one continuous wait. You wake up. You do not know what time it is. You do not know what to do. You lie there. The day passes. This is apathy, and in a collapse it produces a predictable cascade: "Why look for water — I won't find any." "No energy to cook." "Why talk to anyone — everyone is equally miserable." The group disintegrates into individuals who are waiting for the end.</p>
<h4>A Crisis Daily Schedule</h4>
<p>This is a framework, not a prison. Following it 60% of the time is already a protective factor:</p>
<ul style="padding-left:18px;margin:8px 0;line-height:2;font-size:0.83rem">
  <li><strong>06:00–07:00</strong> — Rise, wash face (even a wet cloth counts), eat breakfast together</li>
  <li><strong>07:00–08:00</strong> — Duty watch / security check</li>
  <li><strong>08:00–10:00</strong> — Resource work: water check, food ration, minor repairs</li>
  <li><strong>10:00–13:00</strong> — Main activity: information gathering, resupply, contact with neighbours</li>
  <li><strong>13:00–14:00</strong> — Lunch</li>
  <li><strong>14:00–17:00</strong> — Group work: cleaning, cooking, caring for children or elderly</li>
  <li><strong>17:00–19:00</strong> — Free time: reading, conversation, games with children</li>
  <li><strong>19:00–20:00</strong> — Group meeting: review the day, plan for tomorrow</li>
  <li><strong>22:00+</strong> — Lights out</li>
</ul>
<h4>Roles and Micro-Goals</h4>
<p>A person without a role is a person without purpose — and a person without purpose in a crisis becomes a passenger who consumes without contributing, then an internal threat. Assign a specific role to every person in the group, including children aged 7 and above (carry light items, window watch, keep a logbook) and elderly (cooking, tracking supplies, looking after younger children). The role does not have to be large. It has to be real.</p>
<p>Alongside roles: micro-goals. Not "survive until this ends" (unknowable and unachievable). But "today we will collect 20 litres of clean water" — concrete, doable, verifiable. The brain gets a dopamine response from achievement even when the achievement is small. Accumulated small wins maintain stable mood across weeks and months. This is not motivational theory — it is neurochemistry with survival consequences.</p>`,
    },

    // ── GRID ARTICLE 11 ───────────────────────────────────────────────
    {
      id: 11, cat: 'comms', catL: 'Comms', ch: 'Ch. 2.4 & 5.6', time: '6 min',
      title: 'When the Phone Dies: The Communication Hierarchy for a Power-Down World',
      expt:  'Mobile networks go down within hours. The "5-Minute Connectivity" protocol, the 3×/day schedule, and the PMR-446 radio basics that replace the internet.',
      content: `<h4>The Phone Is a Survival Tool, Not Entertainment</h4>
<p>Mobile networks become overloaded or physically destroyed within hours in serious crises. Cell tower backup batteries are rated for 4–8 hours — under mass load, when everyone is trying to call at once, they drain far faster. A loss of signal in the first hours may mean the network will collapse from overload within 2–3 hours. Text messages often get through where voice calls no longer do — useful to know when trying to make first contact.</p>
<p>Once the network goes down, your phone becomes a local tool: offline maps, torch, clock, calculator, camera for documenting resources and documents. Every percent of battery charge is a potential emergency call or a map route. Treat it accordingly.</p>
<h4>The Phone-as-Tool Protocol</h4>
<p>Apply this immediately when a crisis begins — not after the battery is already at 30%:</p>
<ol style="padding-left:18px;margin:8px 0;line-height:2;font-size:0.85rem">
  <li>Turn off Wi-Fi, Bluetooth, GPS, and background app refresh</li>
  <li>Reduce screen brightness to minimum</li>
  <li>Enable battery/power saving mode (extends life by 2–3×)</li>
  <li>When there is no network — switch to Airplane Mode. Enable the network for 5 minutes every 4–6 hours to check for signal</li>
</ol>
<p>Result: a single full charge can last <strong>3–7 days</strong> instead of the standard 1 day.</p>
<h4>The 3× Daily Communication Schedule</h4>
<p>Agree on three fixed daily windows with all family members — for example, 08:00, 14:00, 20:00. Everyone turns on their phone during these windows, checks for network, sends a brief status if signal exists, then turns off. Outside these windows: Airplane Mode. This discipline multiplies battery life and reduces the anxiety of constant checking.</p>
<p>When signal appears briefly, follow the <strong>5-Minute Connectivity Protocol</strong>:</p>
<ul style="padding-left:18px;margin:8px 0;line-height:2;font-size:0.85rem">
  <li><strong>Min 1–2:</strong> Life signal — SMS: "Alive. [Location]. [Number of people]. [Needs]."</li>
  <li><strong>Min 2–3:</strong> Finances — check balance, transfer funds if needed</li>
  <li><strong>Min 3–4:</strong> Information — what is happening in your region</li>
  <li><strong>Min 4–5:</strong> Backup — photograph documents and upload to cloud</li>
</ul>
<h4>When the Phone Is Gone for Good</h4>
<p><strong>Battery-powered radio (AM/FM).</strong> One of the most reliable information sources in a collapse. Battery consumption is a fraction of a smartphone's. Emergency broadcasts survive grid failure. Check which stations operate in your area now, in peacetime.</p>
<p><strong>PMR-446 radio.</strong> The standard for civilian short-range communication in the EU — no licence required, range 0.5–2 km in urban conditions, up to 5–10 km in open terrain. Two units per family is the minimum. Channel 1 is the general calling channel; agree on a working channel in advance. They cost €25–60 per pair and require no infrastructure to function.</p>
<p><strong>Paper and pen.</strong> Irreplaceable. Notes, supply tracking, lists, messages left at rally points. A logbook kept during a crisis has documented survival decisions in every prolonged scenario from Leningrad to Sarajevo to COVID lockdowns.</p>`,
    },

  ],

  // ── Book Chapters ─────────────────────────────────────────────────
  chapters: [

    // ── INTRODUCTION ──────────────────────────────────────────────────
    { n: 'Intro',  t: 'Before the World Goes Dark',                         s: 'The mathematics of risk, the lessons of Leningrad and Sarajevo, and why prepared citizens are a society\'s strongest allies — not an alternative to it.' },

    // ── PART I — IMPACT: THE FIRST 72 HOURS ──────────────────────────
    { n: 'Ch. 1',  t: 'The Psychology of Day Zero',                        s: 'Your brain\'s first enemy is itself. The six signs this is not just an outage, the normalcy bias mechanism, and the STOP Protocol for switching from panic to action.' },
    { n: 'Ch. 2',  t: 'Hard Inventory: Resources Here and Now',            s: 'Survival is resource mathematics. You cannot plan without knowing your starting data — water in litres, food in calories, medications in days, cash in small bills.' },
    { n: 'Ch. 3',  t: 'The Core Decision: Stay vs. Go',                    s: 'The most critical decision of the first 72 hours: stay or evacuate. An 80-point scoring matrix across four blocks — shelter, supplies, people, and route — removes emotion from the calculation.' },
    { n: 'Ch. 4',  t: 'Caught Outside: Crisis While Abroad or in Transit', s: 'Collapse does not ask where you are. The LOCATE protocol for crisis abroad, the Dubai 2026 transport collapse case study, and how to exit a transport trap when no one has answers.' },

    // ── PART II — STABILIZATION: DAYS 4–30 ───────────────────────────
    { n: 'Ch. 5',  t: 'Base Operations: Running a Home Without Infrastructure', s: 'Heat without gas, water without taps, light without electricity, a toilet without plumbing. The complete system for running your home as a survival base across the first 30 days.' },
    { n: 'Ch. 6',  t: 'Movement and the Outside World',                    s: 'Every outing is a risk calculation. Three phases of urban security breakdown, crowd survival mechanics, vehicle protocols, foraging ethics, and safe movement on foot.' },
    { n: 'Ch. 7',  t: 'Psychological Hygiene and Group Organization',      s: 'A group is simultaneously your greatest asset and your greatest vulnerability. Role assignment, conflict typology, the admission and expulsion protocols, and the psychology of 30 days in a confined space.' },
    { n: 'Ch. 8',  t: 'Medicine Without a Doctor: Emergency Level',        s: 'After two weeks without medical care the leading killer is not trauma — it is infection. Wound care, sepsis recognition, diarrhea management, hypothermia, CPR, and a full medication reference for crisis conditions.' },

    // ── PART III — EXHAUSTION AND ADAPTATION: MONTHS 2–6 ─────────────
    { n: 'Ch. 9',  t: 'Water and Food for the Long Haul',                  s: 'When the initial supplies run out the crisis is just beginning. Rainwater collection systems, continuous sprouting cycles, fermentation and preservation, and the urban growing calendar.' },
    { n: 'Ch. 10', t: 'Energy from the Rubble of Civilization',            s: 'Three laws of collapse energy: consumption always outpaces the plan, diversification is not a luxury, and energy converts into everything. From daily audit to solar panel assembly to the cascade principle.' },
    { n: 'Ch. 11', t: 'Chronic Health and Life Without Pharmacies',        s: 'In a prolonged crisis, chronic diseases kill more people than violence. Insulin without refrigeration, blood pressure management without drugs, dentistry without a dentist, and the symptom table for when to seek help at any cost.' },
    { n: 'Ch. 12', t: 'Human-Powered Transport',                           s: 'When fuel runs out, cars become scrap metal. The bicycle as the primary crisis vehicle, realistic walking capabilities and march discipline, and navigation without GPS across bombed infrastructure.' },

    // ── PART IV — THE NEW NORMAL: MONTHS 6–12 ────────────────────────
    { n: 'Ch. 13', t: 'Seasonal Cycles: Winter and Heat',                  s: 'Seasons do not ask whether you are ready. The warm room method for winter without heating, evaporative cooling without electricity, pipe management, and the critical transition periods that kill through complacency.' },
    { n: 'Ch. 14', t: 'Local Barter Economy',                              s: 'Money stops functioning by week two — not by decree, but because people need food and fuel, not paper. The phases of barter economy, commodity-money mechanics, service niches, and how to find your role before the crisis finds you.' },
    { n: 'Ch. 15', t: 'Security in a Wild World',                          s: 'The best victory is the fight that never happened. Threat typology, the Gray Man principle, layered home defense, de-escalation via the CLEAR protocol, checkpoint behavior, and the psychology of using force.' },
    { n: 'Ch. 16', t: 'The Psychology of Month Six: Burnout and Rebuilding Meaning', s: 'Adrenaline lasts weeks. Meaning must last months. The neurochemistry of chronic exhaustion, depression without a psychiatrist, rebuilding purpose after loss, and protecting children across a year of sustained crisis.' },

    // ── PART V — SCENARIO PROTOCOLS ──────────────────────────────────
    { n: 'Ch. 17', t: 'War and Conflict Zones',                            s: 'Every rule from civilian life inverts in an active conflict zone. Early warning signals, shelter ratings against blast and shrapnel, FPV drone response, sniper awareness, checkpoint protocols, and the OPSEC discipline that kept people alive in Mariupol.' },
    { n: 'Ch. 18', t: 'Nuclear, Chemical and Radiological Threats',        s: 'One rule outweighs everything else: nuclear means go DOWN, chemical means go UP. Blast phases, shelter protection factors, decontamination protocol, potassium iodide dosing, and the dirty bomb reality versus the panic it is designed to cause.' },
    { n: 'Ch. 19', t: 'Pandemic and Biological Threats',                   s: 'COVID-19 was a warning with a 1% fatality rate. The R₀ and CFR framework for assessing real danger, household isolation zoning, PPE doffing protocol, home patient monitoring, and the silent hypoxia problem that made a pulse oximeter essential.' },
    { n: 'Ch. 20', t: 'Natural Disasters',                                 s: 'Four disasters, four protocols: Drop–Cover–Hold On for earthquakes, the flash flood timeline where every minute matters, the hurricane eye trap that kills through complacency, and the wildfire speed calculation that explains why staying to protect property is a fatal mistake.' },

  ],

  // ── Library ───────────────────────────────────────────────────────
  library: {
    label:       'Downloads',
    heading:     'LIBRARY',
    sub:         'Printable tools, workbooks and reference cards from the When Systems Fail framework. Sign in once to access everything — free.',
    authLabel:   'Free Access',
    authHeading: 'Sign in to download',
    authSub:     'Enter your email and we\'ll send a one-click link. No password. Works for both new and existing accounts.',
    authEmail:   'your@email.com',
    authBtn:     'Send Magic Link',
    authSuccess: '✓ Magic link sent — check your inbox and click the link to access your downloads.',
    workbookTag:   'Workbook',
    workbookTitle: 'When Systems Fail — Workbook',
    workbookDesc:  'The companion workbook to the main book. Scenario exercises, personal planning templates, and decision frameworks for every chapter.',
    workbookPages: '~80 pages',
    printable:     'Printable',
    btnUnlock:     'Sign In to Download',
    btnDownload:   'Download PDF',
    checklistTag:   'Reference Card',
    checklistTitle: 'Emergency Protocols — A5 Card Set',
    checklistDesc:  'Laminate-ready A5 cards: STOP protocol, wound compression, rehydration formula, evacuation decision tree.',
    cardPages:     '4 cards',
    comingSoon:    'Coming Soon',
  },

};
