/* ═══════════════════════════════════════════════════════════════════════
   CIVIL RESILIENCY LAB  ·  Storage + Auth Layer  ·  js/storage.js
   ═══════════════════════════════════════════════════════════════════════

   This file is the only place that touches Supabase and localStorage.
   app.js calls Storage and Auth methods — it never touches either directly.

   Setup (required once)
   ─────────────────────
   1. Create a project at supabase.com
   2. Go to Settings → API and copy your Project URL and anon/public key
   3. Replace the two placeholder values in the CONFIG block below
   4. Run the SQL in the comment block below in Supabase → SQL Editor

   Database schema (run this in Supabase → SQL Editor)
   ────────────────────────────────────────────────────
   -- Stores one assessment result per user (latest wins via upsert)
   create table assessments (
     user_id    uuid references auth.users(id) on delete cascade primary key,
     created_at timestamptz default now() not null,
     score      integer not null,
     max        integer not null,
     pct        integer not null,
     domains    jsonb   not null,
     email      text
   );
   alter table assessments enable row level security;
   create policy "Users manage own assessment"
     on assessments for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

   -- Stores newsletter subscribers
   create table subscribers (
     id         uuid default gen_random_uuid() primary key,
     email      text unique not null,
     created_at timestamptz default now() not null
   );
   alter table subscribers enable row level security;
   create policy "Anyone can subscribe"
     on subscribers for insert with check (true);

   API (all methods are async)
   ───────────────────────────
   Auth.getUser()               → user object | null
   Auth.sendMagicLink(email)    → { error }
   Auth.signOut()               → void
   Auth.onAuthStateChange(fn)   → void

   Storage.saveResult(data)        → boolean
   Storage.loadResult()            → object | null
   Storage.saveChecklist(state)    → boolean
   Storage.loadChecklist()         → object (empty {} if none)
   Storage.subscribeEmail(email)   → { error }
   Storage.clear()                 → boolean
   ═══════════════════════════════════════════════════════════════════════ */


/* ── Configuration ────────────────────────────────────────────────────
   TODO: Replace both values with your own project credentials.
   The anon key is safe to include in client-side code — Row Level
   Security policies (set up above) protect the data.

   For maximum session length, go to the Supabase dashboard:
   Authentication → Configuration → Sessions
   Set "JWT expiry" to 604800 (7 days) — the maximum allowed value.
   Refresh tokens never expire unless manually revoked, so users
   stay logged in across browser restarts indefinitely.             */

const SUPABASE_URL      = 'https://dkzzjccnxszlalopoazu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrenpqY2NueHN6bGFsb3BvYXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NjY3MTksImV4cCI6MjA4OTA0MjcxOX0.LHHL7J1cbIxQqaELuaWLR19L6KFhK0vwsZuagoY1qBk';


/* ── Client ───────────────────────────────────────────────────────────
   Supabase JS is loaded from CDN in index.html before this file.
   If credentials are not yet replaced, _db will be flagged as
   unconfigured and every operation falls back to localStorage.      */

const _isConfigured = !SUPABASE_URL.includes('YOUR_PROJECT_ID');

const _db = (_isConfigured && window.supabase)
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession:    true,   // saves session to localStorage — survives page reloads
        autoRefreshToken:  true,   // silently refreshes the token before it expires
        detectSessionInUrl: true,  // picks up the magic link token from the URL on return
      },
    })
  : null;

if (!_isConfigured) {
  console.info('Storage: Supabase not configured — using localStorage fallback. See js/storage.js to set up.');
}


/* ── Auth ─────────────────────────────────────────────────────────────
   Magic link only — no passwords anywhere.
   · sendMagicLink() emails the user a one-click sign-in link.
   · Supabase handles new users automatically: if the email has never
     been seen before, an account is created on first magic link use.
   · Falls back to a no-op stub when Supabase is not configured.      */

const Auth = {

  async getUser() {
    if (!_db) return null;
    const { data: { user } } = await _db.auth.getUser();
    return user;
  },

  /**
   * Sends a one-click sign-in link to the given email address.
   * Works for both new and existing users — no separate "register" flow.
   * @param   {string} email
   * @param   {string} redirectTo  The URL the magic link should return to.
   * @returns {{ error }}
   */
  async sendMagicLink(email, redirectTo) {
    if (!_db) return { error: { message: 'Supabase is not configured.' } };
    const options = redirectTo ? { emailRedirectTo: redirectTo } : {};
    const { error } = await _db.auth.signInWithOtp({ email, options });
    return { error: error ?? null };
  },

  async signOut() {
    if (!_db) return;
    await _db.auth.signOut();
  },

  // Fires immediately with the current session, then on every auth change.
  // The detectSessionInUrl option (set in the client above) ensures the
  // magic link token in the URL is consumed and the session is established
  // before this callback fires on the return visit.
  onAuthStateChange(callback) {
    if (!_db) { callback(null); return; }
    _db.auth.onAuthStateChange((_event, session) => callback(session?.user ?? null));
  },

};


/* ── Storage ──────────────────────────────────────────────────────────
   When a user is logged in → Supabase (persists across devices).
   When not logged in       → localStorage (persists in this browser).
   When Supabase is unconfigured → always localStorage.              */

const Storage = {

  /* ─── Assessment result ─────────────────────────────────────────── */

  async saveResult(data) {
    const user = await Auth.getUser();
    if (user) {
      // upsert: one row per user_id, latest result replaces previous
      const { error } = await _db.from('assessments').upsert({
        user_id:    user.id,
        created_at: new Date().toISOString(),
        score:      data.score,
        max:        data.max,
        pct:        data.pct,
        domains:    data.domains,
        email:      user.email,
      });
      if (error) console.error('Storage.saveResult (Supabase):', error.message);
      return !error;
    }
    return _set('cr_result', data);
  },

  async loadResult() {
    const user = await Auth.getUser();
    if (user) {
      const { data, error } = await _db
        .from('assessments')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      if (error) { console.error('Storage.loadResult (Supabase):', error.message); return null; }
      if (!data)  return null;
      return {
        date:    data.created_at,
        score:   data.score,
        max:     data.max,
        pct:     data.pct,
        domains: data.domains,
        email:   data.email,
      };
    }
    return _get('cr_result');
  },

  /* ─── Checklist state ───────────────────────────────────────────── */

  // Checklist is always localStorage — low-latency, no auth required.
  // TODO: migrate to Supabase column on the assessments row if needed.

  async saveChecklist(checklistState) {
    return _set('cr_cl', checklistState);
  },

  async loadChecklist() {
    return _get('cr_cl') ?? {};
  },

  /* ─── Newsletter subscription ───────────────────────────────────── */

  async subscribeEmail(email) {
    if (!_db) return { error: { message: 'Supabase is not configured.' } };
    const { error } = await _db.from('subscribers').insert({ email });
    return { error: error ?? null };
  },

  /* ─── Clear all ─────────────────────────────────────────────────── */

  async clear() {
    const user = await Auth.getUser();
    if (user) {
      const { error } = await _db.from('assessments').delete().eq('user_id', user.id);
      if (error) console.error('Storage.clear (Supabase):', error.message);
    }
    try {
      localStorage.removeItem('cr_result');
      localStorage.removeItem('cr_cl');
      return true;
    } catch (error) {
      console.error('Storage.clear (localStorage):', error);
      return false;
    }
  },

};


/* ── Private helpers ──────────────────────────────────────────────────
   Prefixed with _ — not part of the public API.                     */

function _set(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Storage._set('${key}'):`, error);
    return false;
  }
}

function _get(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.warn(`Storage._get('${key}') — data corrupted, discarding:`, error);
    return null;
  }
}
