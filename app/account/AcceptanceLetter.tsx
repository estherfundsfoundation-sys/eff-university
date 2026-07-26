"use client";

import { FULL_SIMULATION_DISCLAIMER, SIMULATION_WATERMARK } from "../../lib/launch-readiness";

export type AcceptanceDetails = { displayName: string; studentId: string; pathwayName: string; acceptedAt: string };

export default function AcceptanceLetter({ details, onClose }: { details: AcceptanceDetails; onClose: () => void }) {
  return <div className="acceptance-modal" role="dialog" aria-modal="true" aria-labelledby="acceptance-title"><article className="acceptance-letter official-simulation-document">
    <button className="acceptance-close" onClick={onClose} aria-label="Close acceptance letter">×</button>
    <header><img src="/eff-university-dove-crest.png" alt="" /><div><b>EFF UNIVERSITY</b><small>OFFICE OF ADMISSIONS • EST. 2026</small></div></header>
    <p className="acceptance-date">{new Date(details.acceptedAt).toLocaleDateString()}</p><p>Dear {details.displayName},</p>
    <h2 id="acceptance-title">Congratulations—<br/><em>you’re accepted!</em></h2>
    <p>It is our pleasure to welcome you to <b>EFF University</b> and the <b>{details.pathwayName}</b> educational-simulation pathway.</p>
    <p>Your EFFU journey will help you explore education and career options, complete guided courses, practice real-life decisions, take graded knowledge checks, and prepare for challenges that can affect college access and persistence.</p>
    <dl><div><dt>EFFU Student</dt><dd>{details.displayName}</dd></div><div><dt>Student ID</dt><dd>{details.studentId}</dd></div><div><dt>Starting Pathway</dt><dd>{details.pathwayName}</dd></div></dl>
    <p>Confirm your email, sign in to your portal, and begin your first course. Passing every required course unlocks EFFU commencement and eligibility to apply for applicable Esther Funds Foundation scholarship opportunities.</p>
    <div className="acceptance-signature"><b>Office of Admissions</b><span>Esther Funds Foundation • EFF University</span><em>Every Future Fulfilled.</em></div>
    <div className="acceptance-actions"><button onClick={() => window.print()}>PRINT MY ACCEPTANCE LETTER</button><button className="secondary" onClick={onClose}>CONTINUE →</button></div>
    <footer><b>{SIMULATION_WATERMARK}</b><span>{FULL_SIMULATION_DISCLAIMER}</span></footer>
  </article></div>;
}
