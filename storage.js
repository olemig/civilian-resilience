/* ═══════════════════════════════════════════════════════════════════════
   CIVILIAN RESILIENCE  ·  Storage Layer  ·  js/storage.js
   ═══════════════════════════════════════════════════════════════════════

   This file is the only place in the codebase that touches localStorage.
   app.js calls Storage methods — it never references localStorage directly.

   Why this boundary matters
   ─────────────────────────
   When Supabase (or any backend) is connected, only this file changes.
   The entire application layer (app.js) migrates for free.

   API
   ───
   Storage.saveResult(data)        → boolean  (true = success)
   Storage.loadResult()            → object | null
   Storage.saveChecklist(state)    → boolean
   Storage.loadChecklist()         → object   (empty {} if nothing saved)
   Storage.clear()                 → boolean

   Storage keys
   ────────────
   cr_result   — JSON object: { date, score, max, pct, email, domains }
   cr_cl       — JSON object: { [index]: boolean } — sparse checklist state
   ═══════════════════════════════════════════════════════════════════════ */

const Storage = {

  /* ── Assessment result ──────────────────────────────────────────── */

  saveResult(data) {
    return _set('cr_result', data);
  },

  loadResult() {
    const data = _get('cr_result');
    if (!data) return null;

    // Integrity check — reject structurally invalid data rather than
    // letting the app crash with unhelpful errors downstream.
    if (typeof data.score === 'undefined' || typeof data.pct === 'undefined') {
      console.warn('Storage: result is missing required fields — discarding');
      return null;
    }

    return data;
  },

  /* ── Checklist state ────────────────────────────────────────────── */

  saveChecklist(state) {
    return _set('cr_cl', state);
  },

  loadChecklist() {
    // Returns {} (not null) so callers can always index into it safely
    // without a null guard. Missing indices are simply undefined (falsy).
    return _get('cr_cl') ?? {};
  },

  /* ── Clear all ──────────────────────────────────────────────────── */

  clear() {
    try {
      localStorage.removeItem('cr_result');
      localStorage.removeItem('cr_cl');
      return true;
    } catch (error) {
      console.error('Storage.clear failed:', error);
      return false;
    }
  },

};


/* ── Private helpers ──────────────────────────────────────────────────
   Prefixed with _ to signal intent: do not call these from app.js.    */

function _set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    // localStorage can throw when storage is full or blocked (e.g. private mode)
    console.error(`Storage._set('${key}') failed:`, error);
    return false;
  }
}

function _get(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn(`Storage._get('${key}') failed — data may be corrupted:`, error);
    return null;
  }
}
