export const SUPABASE_URL = "https://yanlutwjvqfxmvohvvvq.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_DzJXD3x6ox4H-qAPPOjGnw_34lpBN73";
const storageKey = "effu-student-session";

export type EFFUSession = {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: { id: string; email?: string; user_metadata?: Record<string, unknown> };
};

async function authRequest(path: string, init: RequestInit = {}) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.msg || data.message || data.error_description || "We could not complete that request.");
  return data;
}

export function getStoredSession(): EFFUSession | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(window.localStorage.getItem(storageKey) || "null"); } catch { return null; }
}

export function storeSession(session: EFFUSession | null) {
  if (typeof window === "undefined") return;
  if (session) window.localStorage.setItem(storageKey, JSON.stringify(session));
  else window.localStorage.removeItem(storageKey);
}

export async function signUp(email: string, password: string, metadata: Record<string, unknown>) {
  return authRequest("/signup?redirect_to=https%3A%2F%2Feffuniversity.estherfundsfoundation.org%2Faccount", {
    method: "POST",
    body: JSON.stringify({ email, password, data: metadata, gotrue_meta_security: {} }),
  });
}

export async function signIn(email: string, password: string) {
  const session = await authRequest("/token?grant_type=password", { method: "POST", body: JSON.stringify({ email, password }) });
  storeSession(session);
  return session as EFFUSession;
}

export async function refreshSession(refreshToken: string) {
  const session = await authRequest("/token?grant_type=refresh_token", { method: "POST", body: JSON.stringify({ refresh_token: refreshToken }) });
  storeSession(session);
  return session as EFFUSession;
}

export async function currentUser(session: EFFUSession) {
  return authRequest("/user", { headers: { Authorization: `Bearer ${session.access_token}` } });
}

export async function updateStudentMetadata(session: EFFUSession, metadata: Record<string, unknown>) {
  const user = await authRequest("/user", {
    method: "PUT",
    headers: { Authorization: `Bearer ${session.access_token}` },
    body: JSON.stringify({ data: metadata }),
  });
  const updated = { ...session, user };
  storeSession(updated);
  return updated as EFFUSession;
}

export async function sendPasswordReset(email: string) {
  return authRequest("/recover?redirect_to=https%3A%2F%2Feffuniversity.estherfundsfoundation.org%2Faccount", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function signOut(session: EFFUSession | null) {
  if (session) await authRequest("/logout", { method: "POST", headers: { Authorization: `Bearer ${session.access_token}` } }).catch(() => null);
  storeSession(null);
}

export function newStudentId() {
  return `EFFU-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
}
