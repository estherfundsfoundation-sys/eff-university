"use client";

import { useEffect, useMemo, useState } from "react";
import { getStoredSession, signIn, signOut, type EFFUSession } from "../../lib/effu-auth";

type Student = {
  id: number; ownerEmail: string; displayName: string; studentId: string; agePath: string;
  stage: string; pathwayName: string; completedModules: number; totalModules: number;
  scholarshipUnlocked: boolean; acceptedAt: string; lastSeenAt: string;
};
type Application = {
  id: number; ownerEmail: string; displayName: string; studentId: string; ageGroup: string;
  educationStage: string; intendedPathway: string; futureGoal: string; preparationReflection: string;
  supportRequested: string; guardianConsent: boolean; status: string; submittedAt: string; updatedAt: string;
};
type AdminData = { administrator: string; students: Student[]; applications: Application[] };

export default function AdminPortal() {
  const [session, setSession] = useState<EFFUSession | null>(null);
  const [email, setEmail] = useState("nationals@estherfundsinc.org");
  const [password, setPassword] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"students" | "applications">("students");
  const [query, setQuery] = useState("");

  async function load(activeSession: EFFUSession) {
    const response = await fetch("/api/admin", { headers: { Authorization: `Bearer ${activeSession.access_token}` } });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || "Administrator data could not be loaded.");
    setData(payload);
  }

  useEffect(() => {
    const stored = getStoredSession();
    if (!stored) return;
    setSession(stored);
    load(stored).catch((reason) => setError(reason.message));
  }, []);

  const students = useMemo(() => (data?.students || []).filter((student) =>
    `${student.displayName} ${student.ownerEmail} ${student.studentId} ${student.pathwayName}`.toLowerCase().includes(query.toLowerCase())
  ), [data, query]);
  const applications = useMemo(() => (data?.applications || []).filter((application) =>
    `${application.displayName} ${application.ownerEmail} ${application.studentId} ${application.status}`.toLowerCase().includes(query.toLowerCase())
  ), [data, query]);

  async function login(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try { const next = await signIn(email, password); setSession(next); await load(next); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Administrator sign-in failed."); }
    finally { setLoading(false); }
  }

  async function updateStatus(id: number, status: string) {
    if (!session) return;
    const response = await fetch("/api/admin", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!response.ok) return setError("The application status could not be updated.");
    await load(session);
  }

  if (!data) return <main className="admin-shell">
    <section className="admin-login">
      <img src="/eff-university-dove-crest.png" alt="" />
      <p className="eyebrow">AUTHORIZED EFF STAFF ONLY</p>
      <h1>EFFU Administration</h1>
      <p>Sign in with the authorized Esther Funds Foundation account. Student passwords are never visible to administrators.</p>
      {error && <div className="account-error" role="alert">{error}</div>}
      <form onSubmit={login}><label>Administrator email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label><label>Password<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><button disabled={loading}>{loading ? "SIGNING IN…" : "OPEN ADMIN DASHBOARD →"}</button></form>
      <a href="/tech-support">Administrator account help</a>
    </section>
  </main>;

  return <main className="admin-shell">
    <header className="admin-header"><div><p className="eyebrow light">ESTHER FUNDS FOUNDATION</p><h1>EFFU Administration</h1><p>Signed in as {data.administrator}</p></div><button onClick={async () => { await signOut(session); setSession(null); setData(null); }}>SIGN OUT</button></header>
    <section className="admin-summary">
      <article><small>STUDENT RECORDS</small><b>{data.students.length}</b></article>
      <article><small>COMPLETED PATHWAYS</small><b>{data.students.filter((item) => item.scholarshipUnlocked).length}</b></article>
      <article><small>SCHOLARSHIP APPLICATIONS</small><b>{data.applications.length}</b></article>
      <article><small>UNDER REVIEW</small><b>{data.applications.filter((item) => item.status === "under-review").length}</b></article>
    </section>
    <section className="admin-controls"><div><button className={tab === "students" ? "active" : ""} onClick={() => setTab("students")}>STUDENTS</button><button className={tab === "applications" ? "active" : ""} onClick={() => setTab("applications")}>SCHOLARSHIP APPLICATIONS</button></div><input aria-label="Search records" placeholder="Search name, email, ID, pathway, or status" value={query} onChange={(e) => setQuery(e.target.value)} /></section>
    {error && <div className="account-error" role="alert">{error}</div>}
    {tab === "students" && <section className="admin-table-wrap"><table><thead><tr><th>Student</th><th>Starting point</th><th>Pathway</th><th>Progress</th><th>Scholarship</th><th>Last active</th></tr></thead><tbody>{students.map((student) => <tr key={student.id}><td><b>{student.displayName}</b><small>{student.ownerEmail}<br/>{student.studentId}</small></td><td>{student.stage}<small>{student.agePath}</small></td><td>{student.pathwayName}</td><td>{student.completedModules}/{student.totalModules}</td><td><span className={student.scholarshipUnlocked ? "admin-unlocked" : "admin-locked"}>{student.scholarshipUnlocked ? "UNLOCKED" : "LOCKED"}</span></td><td>{new Date(student.lastSeenAt).toLocaleDateString()}</td></tr>)}</tbody></table>{!students.length && <p className="admin-empty">No matching student records yet. Students appear after signing into the updated EFFU portal.</p>}</section>}
    {tab === "applications" && <section className="admin-applications">{applications.map((application) => <article key={application.id}>
      <header><div><small>{application.studentId} • {application.ageGroup}</small><h2>{application.displayName}</h2><p>{application.ownerEmail}</p></div><select aria-label={`Status for ${application.displayName}`} value={application.status} onChange={(e) => updateStatus(application.id, e.target.value)}><option>submitted</option><option>updated</option><option>under-review</option><option>needs-information</option><option>selected</option><option>not-selected</option><option>closed</option></select></header>
      <dl><div><dt>Current stage</dt><dd>{application.educationStage}</dd></div><div><dt>Intended pathway</dt><dd>{application.intendedPathway}</dd></div><div><dt>Future goal</dt><dd>{application.futureGoal}</dd></div><div><dt>EFFU preparation reflection</dt><dd>{application.preparationReflection}</dd></div><div><dt>Requested educational support</dt><dd>{application.supportRequested}</dd></div></dl>
      <footer><span>Guardian consent: {application.guardianConsent ? "Recorded" : "Not required / not recorded"}</span><span>Updated {new Date(application.updatedAt).toLocaleString()}</span></footer>
    </article>)}{!applications.length && <p className="admin-empty">No matching scholarship applications have been submitted.</p>}</section>}
    <p className="admin-privacy">Administrative records are confidential. Do not export, forward, or disclose student information unless required for an authorized EFF purpose. Simulation records remain separate from EFF Help Desk case records.</p>
  </main>;
}
