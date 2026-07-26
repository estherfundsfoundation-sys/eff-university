import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);

test("scholarship unlock is tied to full pathway completion and includes minor safeguards", async () => {
  const [account, panel, api] = await Promise.all([
    readFile(new URL("app/account/AccountPortal.tsx", root), "utf8"),
    readFile(new URL("app/account/ScholarshipPanel.tsx", root), "utf8"),
    readFile(new URL("app/api/scholarship/route.ts", root), "utf8"),
  ]);
  assert.match(account, /completed\.length >= pathway\.modules\.length/);
  assert.match(panel, /does not guarantee selection or funding/);
  assert.match(panel, /parent or guardian/i);
  assert.match(api, /scholarshipUnlocked/);
  assert.match(api, /Complete every required EFFU pathway module/);
});

test("administrator access is allowlisted and scholarship records stay in dedicated tables", async () => {
  const [auth, adminApi, schema] = await Promise.all([
    readFile(new URL("lib/effu-server-auth.ts", root), "utf8"),
    readFile(new URL("app/api/admin/route.ts", root), "utf8"),
    readFile(new URL("db/schema.ts", root), "utf8"),
  ]);
  assert.match(auth, /nationals@estherfundsinc\.org/);
  assert.match(adminApi, /isEFFUAdmin/);
  assert.match(schema, /scholarship_applications/);
  assert.match(schema, /effu_students/);
});

test("community uses EFFU accounts and never redirects members to ChatGPT authentication", async () => {
  const [page, hub, api] = await Promise.all([
    readFile(new URL("app/community/page.tsx", root), "utf8"),
    readFile(new URL("app/community/CommunityHub.tsx", root), "utf8"),
    readFile(new URL("app/api/community/route.ts", root), "utf8"),
  ]);
  assert.doesNotMatch(`${page}${hub}${api}`, /requireChatGPTUser|getChatGPTUser|signin-with-chatgpt/);
  assert.match(hub, /getStoredSession/);
  assert.match(hub, /\/account/);
  assert.match(api, /verifyEFFUSession/);
});

test("pathway graduation requires passing graded course knowledge checks", async () => {
  const [portal, courses] = await Promise.all([
    readFile(new URL("app/account/AccountPortal.tsx", root), "utf8"),
    readFile(new URL("app/account/CourseExperience.tsx", root), "utf8"),
  ]);
  assert.match(courses, /score >= 2/);
  assert.match(courses, /Graded knowledge check/);
  assert.match(portal, /completeCourse/);
  assert.doesNotMatch(portal, /toggleModule/);
  assert.match(portal, /Congratulations/);
  assert.match(portal, /PRINT MY COMPLETION CERTIFICATE/);
});
