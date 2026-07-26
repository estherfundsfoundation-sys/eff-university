"use client";

import { CONSENT_VERSION, CONTENT_REVIEW, FULL_SIMULATION_DISCLAIMER, SIMULATION_WATERMARK } from "../../lib/launch-readiness";

export default function PoliciesPage() {
  function exportDeviceData() {
    const data: Record<string, string> = {};
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index);
      if (key?.startsWith("effu-")) data[key] = window.localStorage.getItem(key) || "";
    }
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), consentVersion: CONSENT_VERSION, deviceData: data }, null, 2)], { type: "application/json" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "effu-device-data-export.json"; link.click(); URL.revokeObjectURL(link.href);
  }
  function deleteDeviceData() {
    if (!window.confirm("Delete EFFU progress and preferences stored on this device? This cannot delete a signed-in account or Help Desk record.")) return;
    Object.keys(window.localStorage).filter((key) => key.startsWith("effu-")).forEach((key) => window.localStorage.removeItem(key));
    window.alert("EFFU data stored on this device was deleted. Signed-in account deletion requires a separate verified request.");
  }
  return <main className="policy-page">
    <header><p className="eyebrow light">EFF UNIVERSITY • VERSION 1.0 PILOT</p><h1>Privacy, Data &<br/><em>Simulation Policies.</em></h1><p>Plain-language boundaries for learners, families, and organizations.</p></header>
    <nav aria-label="Policy sections"><a href="#simulation">Simulation</a><a href="#children">Children & Families</a><a href="#retention">Retention</a><a href="#controls">Your Data Controls</a><a href="#consent">Consent History</a></nav>
    <section id="simulation"><h2>Educational Simulation Notice</h2><b className="document-watermark">{SIMULATION_WATERMARK}</b><p>{FULL_SIMULATION_DISCLAIMER}</p></section>
    <section id="children"><h2>Children’s Privacy Notice</h2><p>Children under 13 may use Guest Practice Mode with a parent, legal guardian, school, or authorized youth-serving organization. An under-13 learner should not create an independent account, enter an email address, post in the student community, upload a personal photograph, or send personal information through EFFU.</p><h3>Parent/Guardian Notice</h3><p>Adults supervising a minor should review the activity, choose what may be saved, avoid entering sensitive information, and use the deletion controls when a shared device is used. Community accounts are restricted to ages 13 and older. EFFU does not knowingly ask children for legal names, birth dates, addresses, school records, financial records, government identifiers, or medical records.</p></section>
    <section id="retention"><h2>Data Retention Policy</h2><p>Device-only simulation progress remains until the learner clears it, removes browser storage, or uses the deletion control below. Signed-in account data may remain while the account is active and for a limited period needed for security, recovery, legal compliance, and backup rotation after a verified deletion request. A final retention schedule and deletion-service-level agreement require legal and operational approval before public launch.</p><p>EFFU learning records and confidential Esther Funds Foundation Help Desk records must remain in separate systems. EFFU does not automatically transfer a learner’s simulation answers, progress, Passport, grades, financial scenarios, or uploaded images into a Help Desk case.</p></section>
    <section id="controls"><h2>Your Data Controls</h2><div className="policy-actions"><button onClick={exportDeviceData}>EXPORT DATA FROM THIS DEVICE</button><button onClick={deleteDeviceData}>DELETE DATA FROM THIS DEVICE</button><a href="/support#account-data">REQUEST ACCOUNT EXPORT OR DELETION</a></div><p>Device controls cannot export or delete Supabase account information, community posts, audit records, backups, or Help Desk records. Those require verified, separately authorized workflows.</p></section>
    <section id="consent"><h2>Consent History</h2><p>Current notice version: <b>{CONSENT_VERSION}</b>. Signed-in registration stores the notice version, selected age path, and consent timestamp in the learner’s EFFU account metadata. Future changes should append a new consent event rather than silently replace prior consent.</p></section>
    <footer><b>Content governance</b><span>Last reviewed: {CONTENT_REVIEW.lastReviewed}</span><span>Reviewer: {CONTENT_REVIEW.reviewer}</span><span>Status: {CONTENT_REVIEW.status}</span><span>Next review: {CONTENT_REVIEW.nextReview}</span></footer>
  </main>;
}
