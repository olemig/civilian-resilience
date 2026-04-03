/* ═══════════════════════════════════════════════════════════════════════
   CIVIL RESILIENCY LAB  ·  Storage + Auth Layer  ·  js/storage.js
   ═══════════════════════════════════════════════════════════════════════

   This file is the only place that touches Supabase and localStorage.
   app.js calls Storage, Files, and Auth methods — never Supabase directly.

   Setup (required once)
   ─────────────────────
   1. Create a project at supabase.com
   2. Go to Settings → API and copy your Project URL and anon/public key
   3. Replace the two placeholder values in the CONFIG block below
   4. Run the SQL in the comment block below in Supabase → SQL Editor
   5. Create the Storage bucket (see STORAGE SETUP below)

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

   -- Logs anonymous language selection events (analytics)
   create table language_stats (
     id         uuid default gen_random_uuid() primary key,
     language   text not null,
     created_at timestamptz default now()
   );
   alter table language_stats enable row level security;
   create policy "Anyone can insert" on language_stats for insert with check (true);

   -- Logs file downloads per authenticated user (analytics)
   create table downloads (
     id         uuid default gen_random_uuid() primary key,
     user_id    uuid references auth.users(id) on delete cascade not null,
     file       text not null,
     created_at timestamptz default now()
   );
   alter table downloads enable row level security;
   create policy "Users log own downloads"
     on downloads for insert
     with check (auth.uid() = user_id);

   Storage bucket setup
   ────────────────────
   1. Supabase Dashboard → Storage → New bucket
   2. Name: "downloads"  |  Public: OFF (private bucket)
   3. Upload your files (e.g. workbook.pdf) directly in the dashboard
   4. Run this RLS policy so only authenticated users can read files:

   create policy "Authenticated users can download"
     on storage.objects for select
     to authenticated
     using ( bucket_id = 'downloads' );

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
   Storage.saveLanguage(code)      → boolean
   Storage.loadLanguage()          → string | null
   Storage.trackLanguage(code)     → void (fire-and-forget)
   Storage.clear()                 → boolean

   Files.getDownloadUrl(filename)  → string | null
   Files.logDownload(filename)     → void (fire-and-forget)
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
const SUPABASE_ANON_KEY = 'sb_publishable_qFfD5jLhnpY4xX-dp-pHAA_D1_Sc4AD';


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

  /* ─── Language preference ───────────────────────────────────────── */

  // Language pref is always localStorage — fast, no auth required.
  saveLanguage(code) {
    return _set('cr_lang', code);
  },

  loadLanguage() {
    return _get('cr_lang'); // returns string like 'en' | 'de' | null
  },

  /**
   * Logs an anonymous language selection event to Supabase.
   * Fire-and-forget — never awaited, never blocks the UI.
   * Used for analytics: which languages are most popular.
   */
  trackLanguage(code) {
    if (!_db) return;
    _db.from('language_stats').insert({ language: code })
      .then(({ error }) => { if (error) console.warn('trackLanguage:', error.message); });
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


/* ── Files ────────────────────────────────────────────────────────────
   Secure file downloads via Supabase Storage.
   · Files live in the private "downloads" bucket — never publicly exposed.
   · getDownloadUrl() generates a signed URL valid for 1 hour.
     The user's browser downloads the file directly from Supabase CDN.
   · logDownload() records the event for analytics — fire-and-forget.   */

const Files = {

  /**
   * Returns a signed, time-limited download URL for a file in the
   * private "downloads" bucket. Returns null if not configured or
   * if the user is not authenticated.
   *
   * @param   {string} filename  e.g. 'workbook.pdf'
   * @returns {Promise<string|null>}
   */
  async getDownloadUrl(filename) {
    if (!_db) return null;
    const user = await Auth.getUser();
    if (!user) return null;

    const { data, error } = await _db.storage
      .from('downloads')
      .createSignedUrl(filename, 3600); // URL valid for 1 hour

    if (error) {
      console.error('Files.getDownloadUrl:', error.message);
      return null;
    }
    return data.signedUrl;
  },

  /**
   * Logs a download event to the downloads table for analytics.
   * Fire-and-forget — never awaited, never blocks the UI.
   *
   * @param {string} filename  e.g. 'workbook.pdf'
   */
  async logDownload(filename) {
    if (!_db) return;
    const user = await Auth.getUser();
    if (!user) return;
    _db.from('downloads').insert({ user_id: user.id, file: filename })
      .then(({ error }) => { if (error) console.warn('Files.logDownload:', error.message); });
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
