import { RELEASE_FLAGS } from "../../lib/launch-readiness";

export default function StatusPage() {
  return <main className="policy-page status-page">
    <header><p className="eyebrow light">EFF UNIVERSITY SYSTEM STATUS</p><h1>Pilot systems,<br/><em>plainly reported.</em></h1><p>Last manually reviewed July 26, 2026. This is not automated uptime monitoring.</p></header>
    <section><h2>Current Pilot Status</h2><div className="status-grid"><article><span className="status-dot caution" /><b>Public launch</b><p>{RELEASE_FLAGS.publicLaunch ? "Enabled" : "Not authorized — pilot review only"}</p></article><article><span className="status-dot" /><b>Student accounts</b><p>Configured; end-to-end acceptance email testing remains required</p></article><article><span className="status-dot" /><b>Learning experience</b><p>Production build passes locally</p></article><article><span className="status-dot caution" /><b>Administrator controls</b><p>MFA, RBAC, audit, backup and restore evidence incomplete</p></article><article><span className="status-dot caution" /><b>Accessibility</b><p>WCAG-oriented improvements present; professional/manual testing incomplete</p></article><article><span className="status-dot" /><b>EFF Help Desk</b><p>Separate external handoff requiring learner consent</p></article></div></section>
    <section><h2>Report a Service Problem</h2><p>Do not post passwords, verification codes, personal documents, Social Security numbers, or financial records.</p><a className="policy-link" href="/support">OPEN SUPPORT CONTACT PAGE →</a></section>
  </main>;
}
