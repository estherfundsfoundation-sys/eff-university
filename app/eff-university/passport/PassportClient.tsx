"use client";

import { useEffect, useState } from "react";
import { getStoredSession, type EFFUSession } from "../../../lib/effu-auth";
import { pathways } from "../../../lib/eff-pathways";
import PrintButton from "../PrintButton";

export default function PassportClient() {
  const [session, setSession] = useState<EFFUSession | null>(null);
  useEffect(() => setSession(getStoredSession()), []);

  if (!session) return <article className="passport">
    <span className="simulation-label">PRIVATE EFFU STUDENT RECORD</span>
    <h2>Sign in to open your Continuity Passport</h2>
    <div className="passport-empty"><p>Your Passport follows your EFFU account across devices. It includes only approved educational participation items—not Help Desk cases, private documents, or support-track selections.</p></div>
    <div className="pathway-actions pathway-section"><a href="/account">SIGN IN OR CREATE MY ACCOUNT</a><a className="secondary" href="/eff-university/start">EXPLORE AS A GUEST</a></div>
  </article>;

  const metadata = (session.user.user_metadata || {}) as Record<string, unknown>;
  const pathway = pathways.find((item) => item.slug === metadata.pathway_slug) || pathways[1];
  const completed = Array.isArray(metadata.completed_modules) ? metadata.completed_modules.filter((item): item is string => typeof item === "string") : [];
  const percentage = Math.round(completed.length / pathway.modules.length * 100);

  return <article className="passport">
    <span className="simulation-label">EDUCATIONAL SIMULATION — NOT AN OFFICIAL COLLEGE DOCUMENT</span>
    <div className="passport-letterhead"><img src="/eff-university-dove-crest.png" alt="" /><div><small>EFF CONTINUITY PASSPORT</small><h2>{String(metadata.display_name || "EFFU Student")}</h2><p>{String(metadata.student_id || "")}</p></div><b>{percentage}%</b></div>
    <div className="passport-summary"><span><small>CURRENT PATHWAY</small><b>{pathway.name}</b></span><span><small>STARTING POINT</small><b>{String(metadata.stage || "Exploring")}</b></span><span><small>MODULES COMPLETED</small><b>{completed.length} of {pathway.modules.length}</b></span></div>
    <section className="passport-record"><h3>Approved Educational Participation</h3>{completed.length ? <ol>{completed.map((module) => <li key={module}><span>✓</span><b>{module}</b><small>{pathway.name}</small></li>)}</ol> : <div className="passport-empty">No completed modules yet. Open your student portal and mark a module complete when you finish it.</div>}</section>
    <section className="passport-privacy"><h3>What Never Appears Here</h3><p>Help Desk cases, advocacy records, uploaded evidence, financial or medical information, housing documents, private messages, support-track selections, internal notes, and legal records remain separate.</p></section>
    <div className="pathway-actions"><a href="/account">RETURN TO MY STUDENT PORTAL</a><PrintButton label="PRINT MY PASSPORT" /></div>
  </article>;
}
