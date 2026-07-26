import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("shared launch safety layer and public policy routes exist", async () => {
  const routes = ["app/LaunchSafety.tsx", "app/policies/page.tsx", "app/accessibility/page.tsx", "app/status/page.tsx", "app/support/page.tsx", "app/first-day/page.tsx", "app/brand/page.tsx"];
  await Promise.all(routes.map((route) => access(new URL(route, root))));
  const layout = await readFile(new URL("app/layout.tsx", root), "utf8");
  const safety = await readFile(new URL("app/LaunchSafety.tsx", root), "utf8");
  assert.match(layout, /LaunchSafety/);
  assert.match(safety, /EDUCATIONAL SIMULATION/);
  assert.match(safety, /Report Outdated or Confusing Information/);
});

test("registration has all age paths and versioned consent", async () => {
  const account = await readFile(new URL("app/account/AccountPortal.tsx", root), "utf8");
  assert.match(account, /Under 13/);
  assert.match(account, /Ages 13–17/);
  assert.match(account, /Adult/);
  assert.match(account, /consent_history/);
  assert.match(account, /Guest Practice Mode/);
});

test("official-looking core documents carry the simulation watermark", async () => {
  const [home, constants] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("lib/launch-readiness.ts", root), "utf8"),
  ]);
  assert.match(constants, /EDUCATIONAL SIMULATION — NOT AN OFFICIAL COLLEGE DOCUMENT/);
  for (const artifact of ["acceptance-letter official-simulation-document", "award-letter official-simulation-document", "certificate official-simulation-document", "mock-schedule official-simulation-document"]) {
    assert.match(home, new RegExp(artifact));
  }
});

test("public launch remains feature-flagged until readiness blockers are resolved", async () => {
  const config = await readFile(new URL("lib/launch-readiness.ts", root), "utf8");
  assert.match(config, /pilotMode: true/);
  assert.match(config, /publicLaunch: false/);
  assert.match(config, /emergencyDisableSupported: false/);
});
