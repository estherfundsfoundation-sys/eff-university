import { eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { effuStudents, scholarshipApplications } from "../../../db/schema";
import { verifyEFFUSession } from "../../../lib/effu-server-auth";

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";

export async function GET(request: Request) {
  const user = await verifyEFFUSession(request);
  if (!user) return Response.json({ error: "Student sign-in required." }, { status: 401 });
  const db = getDb();
  const [application] = await db.select().from(scholarshipApplications)
    .where(eq(scholarshipApplications.ownerEmail, user.email)).limit(1);
  return Response.json({ application: application || null });
}

export async function POST(request: Request) {
  const user = await verifyEFFUSession(request);
  if (!user) return Response.json({ error: "Student sign-in required." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const db = getDb();

  if (body.type === "sync-student") {
    const totalModules = Math.max(1, Math.min(50, Number(body.totalModules) || 1));
    const completedModules = Math.max(0, Math.min(totalModules, Number(body.completedModules) || 0));
    const record = {
      ownerEmail: user.email,
      displayName: clean(body.displayName, 60) || "EFFU Student",
      studentId: clean(body.studentId, 40) || "Pending",
      agePath: clean(body.agePath, 20) || "not provided",
      stage: clean(body.stage, 80) || "Exploring",
      pathwaySlug: clean(body.pathwaySlug, 60) || "college-launch",
      pathwayName: clean(body.pathwayName, 120) || "EFFU Pathway",
      completedModules,
      totalModules,
      scholarshipUnlocked: completedModules >= totalModules,
      acceptedAt: clean(body.acceptedAt, 40) || new Date().toISOString(),
      lastSeenAt: new Date(),
    };
    await db.insert(effuStudents).values(record).onConflictDoUpdate({
      target: effuStudents.ownerEmail,
      set: {
        displayName: record.displayName, studentId: record.studentId, agePath: record.agePath,
        stage: record.stage, pathwaySlug: record.pathwaySlug, pathwayName: record.pathwayName,
        completedModules: record.completedModules, totalModules: record.totalModules,
        scholarshipUnlocked: record.scholarshipUnlocked, acceptedAt: record.acceptedAt,
        lastSeenAt: record.lastSeenAt,
      },
    });
    return Response.json({ scholarshipUnlocked: record.scholarshipUnlocked });
  }

  if (body.type === "apply") {
    const [student] = await db.select().from(effuStudents)
      .where(eq(effuStudents.ownerEmail, user.email)).limit(1);
    if (!student?.scholarshipUnlocked) {
      return Response.json({ error: "Complete every required EFFU pathway module before applying." }, { status: 403 });
    }
    const ageGroup = clean(body.ageGroup, 30);
    const guardianConsent = Boolean(body.guardianConsent);
    const termsAccepted = Boolean(body.termsAccepted);
    const application = {
      ownerEmail: user.email,
      displayName: student.displayName,
      studentId: student.studentId,
      ageGroup,
      educationStage: clean(body.educationStage, 100),
      intendedPathway: clean(body.intendedPathway, 160),
      futureGoal: clean(body.futureGoal, 1200),
      preparationReflection: clean(body.preparationReflection, 1200),
      supportRequested: clean(body.supportRequested, 600),
      guardianConsent,
      termsAccepted,
      status: "submitted",
      submittedAt: new Date(),
      updatedAt: new Date(),
    };
    if (!ageGroup || !application.educationStage || !application.intendedPathway ||
        application.futureGoal.length < 40 || application.preparationReflection.length < 40 ||
        !application.supportRequested || !termsAccepted) {
      return Response.json({ error: "Complete every required scholarship field and provide thoughtful responses." }, { status: 400 });
    }
    if (ageGroup !== "18+" && !guardianConsent) {
      return Response.json({ error: "A parent or guardian must review and consent for applicants under 18." }, { status: 400 });
    }
    await db.insert(scholarshipApplications).values(application).onConflictDoUpdate({
      target: scholarshipApplications.ownerEmail,
      set: {
        ageGroup: application.ageGroup,
        educationStage: application.educationStage,
        intendedPathway: application.intendedPathway,
        futureGoal: application.futureGoal,
        preparationReflection: application.preparationReflection,
        supportRequested: application.supportRequested,
        guardianConsent: application.guardianConsent,
        termsAccepted: application.termsAccepted,
        status: "updated",
        updatedAt: new Date(),
      },
    });
    return Response.json({ ok: true, status: "submitted" });
  }

  return Response.json({ error: "Unsupported scholarship action." }, { status: 400 });
}
