"use client";

import { useEffect, useState } from "react";
import type { EFFUSession } from "../../lib/effu-auth";

type ExistingApplication = { status: string; submittedAt: string } | null;

export default function ScholarshipPanel({ session, unlocked }: { session: EFFUSession; unlocked: boolean }) {
  const [open, setOpen] = useState(false);
  const [application, setApplication] = useState<ExistingApplication>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ageGroup, setAgeGroup] = useState("");
  const [educationStage, setEducationStage] = useState("");
  const [intendedPathway, setIntendedPathway] = useState("");
  const [futureGoal, setFutureGoal] = useState("");
  const [preparationReflection, setPreparationReflection] = useState("");
  const [supportRequested, setSupportRequested] = useState("");
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    fetch("/api/scholarship", { headers: { Authorization: `Bearer ${session.access_token}` } })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setApplication(data?.application || null))
      .catch(() => null);
  }, [session.access_token]);

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError(""); setNotice("");
    const response = await fetch("/api/scholarship", {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "apply", ageGroup, educationStage, intendedPathway, futureGoal,
        preparationReflection, supportRequested, guardianConsent, termsAccepted,
      }),
    });
    const data = await response.json().catch(() => ({}));
    setLoading(false);
    if (!response.ok) return setError(data.error || "The scholarship application could not be submitted.");
    setApplication({ status: "submitted", submittedAt: new Date().toISOString() });
    setNotice("Your application was submitted to Esther Funds Foundation for review.");
    setOpen(false);
  }

  return <section className={`scholarship-unlock ${unlocked ? "unlocked" : "locked"}`} id="scholarship">
    <div className="scholarship-emblem" aria-hidden="true">{unlocked ? "★" : "🔒"}</div>
    <div className="scholarship-copy">
      <p className="eyebrow">{unlocked ? "SCHOLARSHIP OPPORTUNITY UNLOCKED" : "COMPLETE YOUR PATHWAY TO UNLOCK"}</p>
      <h2>Every Future Fulfilled Scholarship</h2>
      {unlocked
        ? <p>You completed your EFFU pathway and may now apply for a real Esther Funds Foundation scholarship opportunity. Completion establishes eligibility to apply; it does not guarantee selection or funding.</p>
        : <p>Finish every required module in your EFFU academy pathway to unlock an application for the Esther Funds Foundation Every Future Fulfilled Scholarship.</p>}
      <div className="scholarship-audiences"><span>Middle-school learners</span><span>High-school students</span><span>Current students</span><span>Returning students</span><span>Adult learners</span></div>
      {application && <div className="scholarship-status"><b>APPLICATION STATUS</b><span>{application.status.replace("-", " ").toUpperCase()}</span></div>}
      {unlocked && !application && <button onClick={() => setOpen(true)}>BEGIN MY SCHOLARSHIP APPLICATION →</button>}
      {unlocked && application && <button onClick={() => setOpen(true)}>REVIEW OR UPDATE MY APPLICATION →</button>}
      {!unlocked && <a href="#my-pathway">CONTINUE MY EFFU PATHWAY →</a>}
      <small>The scholarship is administered separately by Esther Funds Foundation. Official rules, available funding, eligibility review, guardian consent, and enrollment verification apply.</small>
    </div>
    {open && <div className="scholarship-modal" role="dialog" aria-modal="true" aria-labelledby="scholarship-title">
      <form onSubmit={submit}>
        <button type="button" className="modal-close" onClick={() => setOpen(false)} aria-label="Close scholarship application">×</button>
        <p className="eyebrow">ESTHER FUNDS FOUNDATION</p>
        <h2 id="scholarship-title">Every Future Fulfilled Scholarship Application</h2>
        <p>Please share only what is needed for this application. Do not enter Social Security numbers, passwords, banking information, tax records, medical records, or government identification.</p>
        {error && <div className="account-error" role="alert">{error}</div>}
        {notice && <div className="account-success" role="status">{notice}</div>}
        <div className="scholarship-fields">
          <label>Applicant age group<select required value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}><option value="">Select</option><option>Under 13</option><option>13–17</option><option>18+</option></select></label>
          <label>Current education stage<select required value={educationStage} onChange={(e) => setEducationStage(e.target.value)}><option value="">Select</option><option>Middle school</option><option>High school</option><option>Preparing to enroll</option><option>Current college student</option><option>Returning college student</option><option>Adult learner</option><option>Certificate, technical, or apprenticeship pathway</option></select></label>
          <label className="full">College, certificate, technical, apprenticeship, or workforce pathway you hope to pursue<input required maxLength={160} value={intendedPathway} onChange={(e) => setIntendedPathway(e.target.value)} /></label>
          <label className="full">What future are you working toward?<textarea required minLength={40} maxLength={1200} value={futureGoal} onChange={(e) => setFutureGoal(e.target.value)} /></label>
          <label className="full">How did completing your EFFU pathway help you prepare?<textarea required minLength={40} maxLength={1200} value={preparationReflection} onChange={(e) => setPreparationReflection(e.target.value)} /></label>
          <label className="full">What educational expense or support would make the greatest difference?<textarea required maxLength={600} value={supportRequested} onChange={(e) => setSupportRequested(e.target.value)} /></label>
        </div>
        {ageGroup && ageGroup !== "18+" && <label className="scholarship-check"><input required type="checkbox" checked={guardianConsent} onChange={(e) => setGuardianConsent(e.target.checked)} /><span>A parent or guardian reviewed this application and consents to the minor’s participation. EFF may require separate verification before review or award.</span></label>}
        <label className="scholarship-check"><input required type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} /><span>I understand that completing EFFU unlocks eligibility to apply but does not guarantee selection, an award, a specific amount, or payment. Official rules and available funding apply.</span></label>
        <button className="account-submit" disabled={loading}>{loading ? "SUBMITTING…" : "SUBMIT SCHOLARSHIP APPLICATION →"}</button>
      </form>
    </div>}
  </section>;
}
