import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL } from "./effu-auth";

const ADMIN_EMAILS = new Set(["nationals@estherfundsinc.org"]);

export type VerifiedEFFUUser = {
  id: string;
  email: string;
  user_metadata?: Record<string, unknown>;
};

export async function verifyEFFUSession(request: Request): Promise<VerifiedEFFUUser | null> {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) return null;
  const response = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: { apikey: SUPABASE_PUBLISHABLE_KEY, Authorization: authorization },
  });
  if (!response.ok) return null;
  const user = await response.json() as VerifiedEFFUUser;
  const email = user.email?.trim().toLowerCase();
  return email ? { ...user, email } : null;
}

export function isEFFUAdmin(email: string) {
  return ADMIN_EMAILS.has(email.trim().toLowerCase());
}
