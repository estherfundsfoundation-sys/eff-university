import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

async function loadTsModule(relativePath) {
  const source = await readFile(new URL(relativePath, import.meta.url), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);
}

test("every starting point maps deterministically and not-sure stays unrestricted", async () => {
  const { startingPoints, recommendPathway } = await loadTsModule("../lib/eff-pathways.ts");
  for (const [id, , slug] of startingPoints) {
    const recommendation = recommendPathway(id);
    if (slug === null) assert.equal(recommendation, null);
    else assert.equal(recommendation?.slug, slug);
  }
});

test("all eight pathways have the shared content needed for a working landing page", async () => {
  const { pathways } = await loadTsModule("../lib/eff-pathways.ts");
  assert.equal(pathways.length, 8);
  for (const pathway of pathways) {
    assert.ok(pathway.slug);
    assert.ok(pathway.name);
    assert.ok(pathway.completion);
    assert.ok(pathway.modules.length >= 7);
  }
});

test("stay-enrolled output always includes immediate and 24/48/72-hour guidance", async () => {
  const { buildStayEnrolledPlan, stayScenarioOptions } = await loadTsModule("../lib/stay-enrolled.ts");
  for (const { value } of stayScenarioOptions) {
    const plan = buildStayEnrolledPlan(value);
    assert.ok(plan.now.length);
    assert.ok(plan.hours24.length);
    assert.ok(plan.hours48.length);
    assert.ok(plan.hours72.length);
    assert.match(plan.email, /Subject:/);
  }
});

test("support tracks are not put into route URLs", async () => {
  const source = await readFile(new URL("../app/eff-university/start/page.tsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /URLSearchParams|searchParams|router\.push/);
  assert.match(source, /EXIT & CLEAR THIS SESSION/);
});

test("new pathway pages contain the required disclaimer and privacy boundaries", async () => {
  const [registry, passport, passportClient, bridge] = await Promise.all([
    readFile(new URL("../lib/eff-pathways.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/eff-university/passport/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/eff-university/passport/PassportClient.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/eff-university/education-bridge/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(registry, /not an accredited college or university/i);
  assert.match(passportClient, /Help Desk cases/);
  assert.match(passportClient, /private/i);
  assert.match(passport, /not an academic transcript/i);
  assert.match(bridge, /No proof of hardship is required/i);
});
