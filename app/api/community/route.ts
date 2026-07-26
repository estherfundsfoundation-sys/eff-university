import { and, desc, eq } from "drizzle-orm";
import { getChatGPTUser } from "../../chatgpt-auth";
import { getDb } from "../../../db";
import { communityPosts, communityReports, connections, profiles } from "../../../db/schema";

const stages = ["Exploring college", "Middle or high school", "Applying now", "Accepted / deciding", "Current college student", "Adult or returning learner"];
const campuses = ["Exploring both campuses", "Legacy HBCU Experience", "Metropolitan University Experience", "Homeward Scholars Bridge"];
const topics = ["Introductions", "Choosing a major", "Applications", "Financial aid", "Campus life", "First-generation students", "Adult learners", "Staying enrolled"];
const contactPattern = /(?:https?:\/\/|www\.|@\w|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\+?\d[\d().\s-]{7,}\d)/i;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
}

function safeProfile(row: typeof profiles.$inferSelect, waveCount = 0) {
  return {
    id: row.id, displayName: row.displayName, ageGroup: row.ageGroup, stage: row.stage,
    campus: row.campus, interests: row.interests.split(",").filter(Boolean), bio: row.bio,
    discoverable: row.discoverable, waveCount,
  };
}

export async function GET() {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Sign in required" }, { status: 401 });
  const db = getDb();
  const [mine] = await db.select().from(profiles).where(eq(profiles.ownerEmail, user.email)).limit(1);
  const directory = await db.select().from(profiles).where(eq(profiles.discoverable, true)).orderBy(desc(profiles.updatedAt)).limit(60);
  const posts = await db.select({
    id: communityPosts.id, topic: communityPosts.topic, message: communityPosts.message,
    createdAt: communityPosts.createdAt, authorName: profiles.displayName, authorStage: profiles.stage,
  }).from(communityPosts).innerJoin(profiles, eq(communityPosts.authorEmail, profiles.ownerEmail))
    .where(eq(profiles.discoverable, true)).orderBy(desc(communityPosts.createdAt)).limit(50);
  const myConnections = await db.select().from(connections).where(eq(connections.fromEmail, user.email));
  return Response.json({
    user: { displayName: user.displayName },
    profile: mine ? safeProfile(mine) : null,
    profiles: directory.map((profile) => safeProfile(profile)),
    posts,
    wavedProfileIds: myConnections.map((item) => item.targetProfileId),
  });
}

export async function POST(request: Request) {
  const user = await getChatGPTUser();
  if (!user) return Response.json({ error: "Sign in required" }, { status: 401 });
  const body = await request.json() as Record<string, unknown>;
  const db = getDb();

  if (body.type === "profile") {
    const displayName = clean(body.displayName, 40);
    const ageGroup = clean(body.ageGroup, 12);
    const stage = clean(body.stage, 50);
    const campus = clean(body.campus, 50);
    const bio = clean(body.bio, 180);
    const interests = Array.isArray(body.interests) ? body.interests.map((item) => clean(item, 40)).filter(Boolean).slice(0, 5).join(",") : "";
    if (!displayName || !["13-15", "16-17", "18+"].includes(ageGroup) || !stages.includes(stage) || !campuses.includes(campus)) {
      return Response.json({ error: "Complete every required profile field." }, { status: 400 });
    }
    if (contactPattern.test(`${displayName} ${bio} ${interests}`)) {
      return Response.json({ error: "For safety, profiles cannot include email addresses, phone numbers, links, or social handles." }, { status: 400 });
    }
    await db.insert(profiles).values({
      ownerEmail: user.email, displayName, ageGroup, stage, campus, interests, bio,
      discoverable: body.discoverable === true, updatedAt: new Date(),
    }).onConflictDoUpdate({
      target: profiles.ownerEmail,
      set: { displayName, ageGroup, stage, campus, interests, bio, discoverable: body.discoverable === true, updatedAt: new Date() },
    });
    return Response.json({ ok: true });
  }

  const [mine] = await db.select().from(profiles).where(eq(profiles.ownerEmail, user.email)).limit(1);
  if (!mine) return Response.json({ error: "Create your profile first." }, { status: 400 });

  if (body.type === "post") {
    const topic = clean(body.topic, 40);
    const message = clean(body.message, 400);
    if (!topics.includes(topic) || message.length < 10) return Response.json({ error: "Choose a topic and write at least 10 characters." }, { status: 400 });
    if (contactPattern.test(message)) return Response.json({ error: "For safety, posts cannot include email addresses, phone numbers, links, or social handles." }, { status: 400 });
    await db.insert(communityPosts).values({ authorEmail: user.email, topic, message });
    return Response.json({ ok: true });
  }

  if (body.type === "wave") {
    const targetProfileId = Number(body.targetProfileId);
    if (!Number.isInteger(targetProfileId) || targetProfileId === mine.id) return Response.json({ error: "Choose another student profile." }, { status: 400 });
    const [target] = await db.select().from(profiles).where(and(eq(profiles.id, targetProfileId), eq(profiles.discoverable, true))).limit(1);
    if (!target) return Response.json({ error: "That profile is not available." }, { status: 404 });
    await db.insert(connections).values({ fromEmail: user.email, targetProfileId }).onConflictDoNothing();
    return Response.json({ ok: true });
  }

  if (body.type === "report") {
    const postId = Number(body.postId);
    if (!Number.isInteger(postId)) return Response.json({ error: "Choose a post to report." }, { status: 400 });
    await db.insert(communityReports).values({ reporterEmail: user.email, postId, reason: clean(body.reason, 120) || "Needs review" }).onConflictDoNothing();
    return Response.json({ ok: true });
  }

  return Response.json({ error: "Unsupported action." }, { status: 400 });
}
