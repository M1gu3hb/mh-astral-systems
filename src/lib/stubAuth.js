// Stub authentication for phase 1 — NO real auth, NO backend (docs/06). It
// only remembers, via sessionStorage, that a demo "login" happened so the
// dashboards feel like a real gated flow and survive a refresh. Any credentials
// are accepted. Real Supabase Auth is phase 2 (docs/05).
const KEY = (scope) => `mh_stub_session_${scope}`;

export function login(scope, identity = 'demo') {
  try {
    sessionStorage.setItem(KEY(scope), JSON.stringify({ identity, at: Date.now() }));
  } catch {
    /* sessionStorage unavailable — the guard simply won't persist */
  }
}

export function logout(scope) {
  try {
    sessionStorage.removeItem(KEY(scope));
  } catch {
    /* ignore */
  }
}

export function isAuthed(scope) {
  try {
    return Boolean(sessionStorage.getItem(KEY(scope)));
  } catch {
    return false;
  }
}
