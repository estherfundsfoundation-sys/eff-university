"use client";

import { useState } from "react";

export default function SupportPage() {
  const [consent, setConsent] = useState(false);
  return <main className="policy-page support-page">
    <header><p className="eyebrow light">EFFU SUPPORT & REPORTING</p><h1>Tell us what is<br/><em>getting in the way.</em></h1><p>Choose the kind of help you need without sharing sensitive information.</p></header>
    <section><h2>Technology & Account Support</h2><p>For sign-in, confirmation-email, password, device, browser, or page-function problems, begin with the EFFU Technology Department.</p><a className="policy-link" href="/tech-support">OPEN TECHNOLOGY SUPPORT →</a></section>
    <section id="accessibility-report"><h2>Accessibility Issue Report</h2><p>Include the page, task, device, browser, barrier, and the alternative that would help. Do not include medical records or diagnosis details.</p><a className="policy-link" href="mailto:nationals@estherfundsinc.org?subject=EFFU%20Accessibility%20Issue">EMAIL AN ACCESSIBILITY REPORT →</a></section>
    <section id="content-report"><h2>Report Outdated or Confusing Information</h2><p>Include the page title or link, the exact statement, why it appears outdated or confusing, and—when available—a current primary-source link.</p><a className="policy-link" href="mailto:nationals@estherfundsinc.org?subject=EFFU%20Content%20Review%20Request">REQUEST CONTENT REVIEW →</a></section>
    <section id="account-data"><h2>Account Export or Deletion Request</h2><p>Account actions require identity verification. Never email a password, verification code, government identifier, bank record, or student document.</p><a className="policy-link" href="mailto:nationals@estherfundsinc.org?subject=EFFU%20Verified%20Account%20Data%20Request">START A VERIFIED DATA REQUEST →</a></section>
    <section><h2>Optional EFF Help Desk Handoff</h2><p>EFFU simulation records remain separate from confidential Esther Funds Foundation Help Desk records. Nothing is transferred automatically. If you choose to leave EFFU and open the real Student Help Center, share only the information needed for that request.</p>
      <label className="handoff-consent"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /><span>I choose to open the separate Esther Funds Foundation Help Desk. I understand my EFFU simulation answers and records will not be attached automatically, and I control what I submit.</span></label>
      {consent ? <a className="policy-link" href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">CONTINUE TO THE SEPARATE EFF HELP DESK ↗</a> : <button className="policy-disabled" disabled>CONSENT REQUIRED BEFORE HANDOFF</button>}
    </section>
    <section><h2>Safety Boundary</h2><p>EFFU is not an emergency, medical, legal, financial, or mental-health service. Do not use this support page for immediate danger. Use verified local emergency resources appropriate to the person’s known location.</p></section>
  </main>;
}
