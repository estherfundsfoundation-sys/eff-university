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
