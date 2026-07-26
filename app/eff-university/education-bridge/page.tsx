import Disclaimer from "../Disclaimer";
import PathwayNav from "../PathwayNav";

export default function EducationBridgePage() {
  return <main className="pathway-shell">
    <PathwayNav />
    <header className="pathway-hero"><p className="eyebrow light">CROSS-PLATFORM ACCESS & SUPPORT</p><h1>EFF EDUCATION BRIDGE</h1><p>Flexible, respectful access for learners experiencing housing instability, limited technology, shared-device use, missing documents, transportation barriers, financial hardship, or other interruptions. No proof of hardship is required.</p></header>
    <section className="pathway-content">
      <div className="bridge-panel">
        <article><h2>Low-Bandwidth & Text-First</h2><p>Every critical instruction is available as text. Video is never required. Use browser reader tools, turn off images, or print the essential plan.</p></article>
        <article><h2>Shared-Device Safety</h2><ul><li>Avoid saving passwords on a public computer.</li><li>Do not upload sensitive documents unless a trusted official service requires them.</li><li>Sign out when finished and close every browser window.</li><li>Clear temporary pathway answers with the control on the starting-point page.</li></ul></article>
        <article><h2>Missing Documents</h2><p>Start with a list of what is missing, who originally issued it, and which official office can provide a replacement. Never email Social Security numbers, passwords, or full banking details.</p></article>
        <article><h2>Housing & Basic Needs</h2><p>Ask a school or college about its basic-needs office, Dean of Students, housing team, emergency aid, food pantry, transportation support, or community referrals. Office names vary.</p></article>
        <article><h2>Accessibility</h2><p>Contact the institution’s Accessibility, Disability, or Access Services office to learn its process. EFF University does not diagnose conditions or replace licensed care.</p></article>
        <article><h2>Printable Support</h2><p>Use your browser’s Print command on pathway pages, Stay-Enrolled plans, and the Continuity Passport. Print only what is safe to carry or share.</p></article>
      </div>
      <section className="recommendation pathway-section"><h2>Need a human next step?</h2><p>EFF’s National Student Help Desk can help you organize questions and advocate for your education. Opening the Help Desk does not automatically share pathway answers or create a case.</p><div className="pathway-actions"><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">OPEN EFF STUDENT HELP</a></div></section>
      <p className="privacy-note"><b>Immediate danger:</b> EFF University is not an emergency service. If someone is in immediate danger, contact verified local emergency services. Do not use this educational platform in place of professional medical, legal, financial, or mental-health care.</p>
      <Disclaimer />
    </section>
  </main>;
}
