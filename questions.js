// ═══════════════════════════════════════
// DOMAINS, QUESTIONS, CHECKLIST DATA
// To add a question: copy any {...} block and add to the array
// To edit a question: find it by searching for part of the text
// ═══════════════════════════════════════

const DOMAINS = [
  'Housing & Basics',       // 0
  'Water, Food & Medical',  // 1
  'Energy & Equipment',     // 2
  'Evacuation & Movement',  // 3
  'Security & Community',   // 4
];

const QUESTIONS = [
  {domain:0, q:'Where do you live?',                           opts:[{k:'A',l:'Private house — autonomous',s:2},{k:'B',l:'Apartment, floors 0–5',s:1},{k:'C',l:'Apartment, floor 6+ (lift/pump dependent)',s:0}], ref:'Chapter 3.1 — Housing types and their risks'},
  {domain:3, q:'How quickly could you evacuate your home if necessary?', opts:[{k:'A',l:'Under 15 minutes — everything is packed',s:2},{k:'B',l:'15–30 minutes',s:1},{k:'C',l:'More than 30 minutes',s:0}], ref:'Chapter 3.5 — Rapid evacuation algorithm'},
  {domain:3, q:'How far do you live from the nearest city centre?', opts:[{k:'A',l:'Far enough to avoid the epicentre of events',s:2},{k:'B',l:'5–20 km',s:1},{k:'C',l:'Less than 5 km — high risk/panic zone',s:0}], ref:'Chapter 5.1 — Urban logistics in crisis'},
  {domain:1, q:'How much food and water do you have stored at home?', opts:[{k:'A',l:'72+ hours of supply',s:2},{k:'B',l:'24–48 hours',s:1},{k:'C',l:'None / less than a day',s:0}], ref:'Chapter 2.2 — Water and food: minimum calculation'},
  {domain:1, q:'Do you have emergency cash at home?',           opts:[{k:'A',l:'Yes — enough for 2+ weeks',s:2},{k:'B',l:'A small amount',s:1},{k:'C',l:'No — everything on cards',s:0}], ref:'Chapter 2.7 — Financial security'},
  {domain:1, q:'Do you have a first aid kit at home?',          opts:[{k:'A',l:'Full kit + first aid training',s:2},{k:'B',l:'Basic kit',s:1},{k:'C',l:'None',s:0}], ref:'Chapter 7.1 — Tactical and civilian first aid kit'},
  {domain:2, q:'Is there an alternative heating source in your home?', opts:[{k:'A',l:'Generator, solar panels or wood stove',s:2},{k:'B',l:'Gas heater or portable solutions',s:1},{k:'C',l:'No — only central heating',s:0}], ref:'Chapter 4.4 — Energy independence and heat'},
  {domain:4, q:'Do you have a family communication plan for emergencies?', opts:[{k:'A',l:'Yes — clear, written, known by everyone',s:2},{k:'B',l:'Discussed verbally (informal)',s:1},{k:'C',l:'No plan',s:0}], ref:'Chapter 2.8 — Communication protocols'},
  {domain:4, q:'How well do you know your neighbours?',         opts:[{k:'A',l:'High trust — ready for mutual cooperation',s:2},{k:'B',l:'Know them by face, greet occasionally',s:1},{k:'C',l:'Not at all',s:0}], ref:'Chapter 6.3 — Social capital of the building'},
  {domain:3, q:'Do you have a plan for where to go if your home is unusable for a week?', opts:[{k:'A',l:'Yes — two specific options with routes',s:2},{k:'B',l:'Roughly know (friends/parents)',s:1},{k:'C',l:'No idea',s:0}], ref:'Chapter 5.2 — Evacuation plan'},
  {domain:0, q:'How would you rate your physical fitness for emergency situations?', opts:[{k:'A',l:'High — able to walk 20+ km with a backpack',s:2},{k:'B',l:'Average',s:1},{k:'C',l:'Low — tire quickly',s:0}], ref:'Chapter 2.3 — Physical resources'},
  {domain:4, q:'Do you know local emergency services and procedures?', opts:[{k:'A',l:'Yes — including local resilience hubs and shelters',s:2},{k:'B',l:'Vaguely',s:1},{k:'C',l:'Have not looked into it',s:0}], ref:'Chapter 14.1 — Interaction with emergency services'},
  {domain:0, q:'How do you monitor news and emerging threats?', opts:[{k:'A',l:'Multiple verified sources + battery-powered radio',s:2},{k:'B',l:'Scrolling social media feeds',s:1},{k:'C',l:'Don\'t monitor at all',s:0}], ref:'Chapter 2.1 — Information hygiene'},
  {domain:3, q:'What is the status of your vehicle in terms of preparedness?', opts:[{k:'A',l:'Always above half a tank + assembled car kit',s:2},{k:'B',l:'Half tank, vehicle in good condition',s:1},{k:'C',l:'Empty tank or no vehicle',s:0}], ref:'Chapter 3.6 — Vehicle preparation'},
  {domain:1, q:'Do you have a water filtration method that works without electricity?', opts:[{k:'A',l:'Yes — gravity filter, LifeStraw, or tablets',s:2},{k:'B',l:'I have iodine tablets only',s:1},{k:'C',l:'No — I rely entirely on tap water',s:0}], ref:'Chapter 3.3 — Water disinfection methods'},
  {domain:2, q:'Do you have a way to charge devices without grid power for 3+ days?', opts:[{k:'A',l:'Solar panel, car inverter, or large power station',s:2},{k:'B',l:'A portable power bank (10,000+ mAh)',s:1},{k:'C',l:'No backup — dependent on the grid',s:0}], ref:'Chapter 2.4 — Off-grid charging'},
  {domain:0, q:'Do you know where the main water and gas shut-off valves are in your building?', opts:[{k:'A',l:'Yes — have access and know the procedure',s:2},{k:'B',l:'Roughly know where they are',s:1},{k:'C',l:'No idea',s:0}], ref:'Chapter 3.1 — Utility shut-offs'},
  {domain:4, q:'Do you have a paper contact list with key family numbers (not only in your phone)?', opts:[{k:'A',l:'Yes — carried by every adult in the household',s:2},{k:'B',l:'I have one copy somewhere at home',s:1},{k:'C',l:'All contacts are only in phone memory',s:0}], ref:'Chapter 2.8 — Paper contact list'},
];


const CHECKLIST = [
  {t:'Store 72 hours of water (2L/person/day)',    ch:'Ch. 2.2'},
  {t:'Assemble a first aid kit + take a course',  ch:'Ch. 7.1'},
  {t:'Write a family emergency communication plan', ch:'Ch. 2.8'},
  {t:'Build a 2-week food reserve at 1500 kcal/day', ch:'Ch. 2.2'},
  {t:'Prepare emergency cash in small denominations', ch:'Ch. 2.7'},
  {t:'Assemble a 72-hour go-bag per family member', ch:'Ch. 3.5'},
  {t:'Buy a battery-powered AM/FM radio',          ch:'Ch. 8.2'},
  {t:'Acquire a non-electric water filtration method', ch:'Ch. 3.3'},
  {t:'Introduce yourself to three neighbours',     ch:'Ch. 6.3'},
  {t:'Walk your evacuation route on foot',         ch:'Ch. 5.2'},
  {t:'Print and laminate emergency contact numbers', ch:'Ch. 2.8'},
  {t:'Visit the 3 nearest alternative water sources', ch:'Ch. 2.2'},
  {t:'Buy potassium iodide tablets + learn dosage', ch:'Ch. 12.3'},
  {t:'Set up blackout curtains or window film',    ch:'Ch. 3.3'},
  {t:'Acquire headlamps for each household member', ch:'Ch. 2.4'},
  {t:'Practice box breathing technique for 5 days', ch:'Ch. 8.7'},
  {t:'Locate your building\'s water and gas shut-offs', ch:'Ch. 3.1'},
  {t:'Encrypt and back up important documents offline', ch:'Ch. 2.7'},
];
