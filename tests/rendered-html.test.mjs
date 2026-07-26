import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("keeps the established EFF University experience and public launch routes", async () => {
  const [home, layout, account, tech, pathways, passport] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("app/account/page.tsx", root), "utf8"),
    readFile(new URL("app/tech-support/page.tsx", root), "utf8"),
    readFile(new URL("app/eff-university/pathways/page.tsx", root), "utf8"),
    readFile(new URL("app/eff-university/passport/page.tsx", root), "utf8"),
  ]);

  assert.match(home, /EFF UNIVERSITY/);
  assert.match(home, /CampusLifeSimulation/);
  assert.match(home, /Financial Aid Lab/);
  assert.match(home, /Student Login/);
  assert.match(layout, /EFF University \| Experience College Before You Enroll/);
  assert.match(account, /AccountPortal/);
  assert.match(tech, /EFFU TECH DEPARTMENT/);
  assert.match(pathways, /ONE UNIVERSITY/);
  assert.match(passport, /EFF CONTINUITY PASSPORT/);
});

test("ships all eight pathways and launch-critical account capabilities", async () => {
  const [registry, auth, portal] = await Promise.all([
    readFile(new URL("lib/eff-pathways.ts", root), "utf8"),
    readFile(new URL("lib/effu-auth.ts", root), "utf8"),
    readFile(new URL("app/account/AccountPortal.tsx", root), "utf8"),
  ]);

  for (const slug of ["future-scholars", "college-launch", "next-chapter", "new-beginnings", "stay-enrolled", "comeback-college", "family-navigator", "community-navigator"]) {
    assert.match(registry, new RegExp(`slug: "${slug}"`));
  }
  assert.match(auth, /signUp/);
  assert.match(auth, /signIn/);
  assert.match(auth, /sendPasswordReset/);
  assert.match(auth, /updateStudentMetadata/);
  assert.match(portal, /completed_modules/);
  assert.match(portal, /personalized acceptance email/i);
});

test("contains the complete route files used by the student journey", async () => {
  const routes = [
    "app/account/page.tsx",
    "app/tech-support/page.tsx",
    "app/eff-university/start/page.tsx",
    "app/eff-university/pathways/page.tsx",
    "app/eff-university/pathways/[slug]/page.tsx",
    "app/eff-university/pathways/stay-enrolled/engine/page.tsx",
    "app/eff-university/education-bridge/page.tsx",
    "app/eff-university/passport/page.tsx",
  ];
  await Promise.all(routes.map((route) => access(new URL(route, root))));
});
