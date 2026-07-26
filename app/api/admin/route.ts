import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { effuStudents, scholarshipApplications } from "../../../db/schema";
import { isEFFUAdmin, verifyEFFUSession } from "../../../lib/effu-server-auth";

export async function GET(request: Request) {
  const user = await verifyEFFUSession(request);
  if (!user) return Response.json({ error: "Administrator sign-in required." }, { status: 401 });
  if (!isEFFUAdmin(user.email)) return Response.json({ error: "This account does not have administrator access." }, { status: 403 });
  const db = getDb();
  const [students, applications] = await Promise.all([
    db.select().from(effuStudents).orderBy(desc(effuStudents.lastSeenAt)).limit(1000),
    db.select().from(scholarshipApplications).orderBy(desc(scholarshipApplications.updatedAt)).limit(1000),
  ]);
  return Response.json({ administrator: user.email, students, applications });
}

export async function PATCH(request: Request) {
  const user = await verifyEFFUSession(request);
  if (!user || !isEFFUAdmin(user.email)) return Response.json({ error: "Administrator access required." }, { status: 403 });
  const body = await request.json().catch(() => ({}));
  const id = Number(body.id);
  const allowed = new Set(["submitted", "updated", "under-review", "needs-information", "selected", "not-selected", "closed"]);
  const status = typeof body.status === "string" && allowed.has(body.status) ? body.status : "";
  if (!Number.isInteger(id) || !status) return Response.json({ error: "Choose a valid application and status." }, { status: 400 });
  await getDb().update(scholarshipApplications).set({ status, updatedAt: new Date() })
    .where(eq(scholarshipApplications.id, id));
  return Response.json({ ok: true });
}
