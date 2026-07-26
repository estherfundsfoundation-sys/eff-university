"use client";

import { useEffect, useMemo, useState } from "react";
import { getStoredSession, newStudentId, sendPasswordReset, signIn, signOut, signUp, updateStudentMetadata, type EFFUSession } from "../../lib/effu-auth";
import { pathways } from "../../lib/eff-pathways";
import { CONSENT_VERSION, FULL_SIMULATION_DISCLAIMER, SIMULATION_WATERMARK } from "../../lib/launch-readiness";
import ScholarshipPanel from "./ScholarshipPanel";
import CourseExperience from "./CourseExperience";
import AcceptanceLetter, { type AcceptanceDetails } from "./AcceptanceLetter";

type Mode = "apply" | "signin" | "reset";
type Metadata = {
  display_name?: string; student_id?: string; pathway_slug?: string; pathway_name?: string;
  stage?: string; interests?: string; accepted_at?: string; completed_modules?: string[];
  age_path?: string; consent_history?: Array<{ version: string; accepted_at: string; age_path: string }>;
  quiz_scores?: Record<string, number>; graduated_at?: string;
};

export default function AccountPortal() {
  const [session, setSession] = useState<EFFUSession | null>(null);
  const [mode, setMode] = useState<Mode>("apply");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [stage, setStage] = useState("");
  const [pathwaySlug, setPathwaySlug] = useState("college-launch");
  const [interests, setInterests] = useState("");
  const [guardian, setGuardian] = useState(false);
  const [agePath, setAgePath] = useState("");
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const [acceptance, setAcceptance] = useState<AcceptanceDetails | null>(null);

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const accessToken = hash.get("access_token");
    const refreshToken = hash.get("refresh_token");
    if (accessToken && refreshToken) {
      const confirmed = {
        access_token: accessToken, refresh_token: refreshToken,
        expires_at: Math.floor(Date.now() / 1000) + Number(hash.get("expires_in") || 3600),
        user: { id: "", email: "", user_metadata: {} },
      } satisfies EFFUSession;
      window.history.replaceState({}, "", "/account");
      import("../../lib/effu-auth").then(async ({ currentUser, storeSession }) => {
        try {
          const user = await currentUser(confirmed);
          const hydrated = { ...confirmed, user };
          storeSession(hydrated);
          setSession(hydrated);
          setMessage(hash.get("type") === "recovery" ? "Your secure account link is active." : "Your email is confirmed. Welcome to EFF University!");
          if (hash.get("type") !== "recovery") {
            const profile = (user.user_metadata || {}) as Metadata;
            setAcceptance({ displayName: profile.display_name || "EFFU Student", studentId: profile.student_id || "EFFU Student", pathwayName: profile.pathway_name || "EFFU Pathway", acceptedAt: profile.accepted_at || new Date().toISOString() });
          }
        } catch { setError("Your confirmation link expired. Please sign in or request a new link."); }
      });
      return;
    }
    setSession(getStoredSession());
  }, []);
  const metadata = (session?.user?.user_metadata || {}) as Metadata;
  const selectedPathway = useMemo(() => pathways.find((item) => item.slug === pathwaySlug) || pathways[1], [pathwaySlug]);
  const completed = metadata.completed_modules || [];

  useEffect(() => {
    if (!session?.access_token || !metadata.pathway_slug) return;
    const pathway = pathways.find((item) => item.slug === metadata.pathway_slug) || pathways[1];
    fetch("/api/scholarship", {
      method: "POST",
      headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "sync-student", displayName: metadata.display_name, studentId: metadata.student_id,
        agePath: metadata.age_path, stage: metadata.stage, pathwaySlug: pathway.slug,
        pathwayName: pathway.name, completedModules: completed.length, totalModules: pathway.modules.length,
        acceptedAt: metadata.accepted_at,
      }),
    }).catch(() => null);
  }, [session?.access_token, metadata.pathway_slug, metadata.display_name, metadata.student_id, metadata.age_path, metadata.stage, metadata.accepted_at, completed.length]);

  async function submitApplication(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError(""); setMessage("");
    try {
      const studentId = newStudentId();
      if (agePath === "under-13") throw new Error("Learners under 13 must use Guest Practice Mode with a parent, guardian, school, or authorized organization. An independent account cannot be created.");
      const acceptedAt = new Date().toISOString();
      const result = await signUp(email.trim(), password, {
        display_name: displayName.trim(), student_id: studentId, stage,
        pathway_slug: selectedPathway.slug, pathway_name: selectedPathway.name,
        interests: interests.trim(), accepted_at: acceptedAt, completed_modules: [], age_path: agePath,
        consent_history: [{ version: CONSENT_VERSION, accepted_at: acceptedAt, age_path: agePath }],
      });
      setAcceptance({ displayName: displayName.trim(), studentId, pathwayName: selectedPathway.name, acceptedAt });
      if (result.access_token) { setSession(result); setMessage("Your account is active. Welcome to EFF University!"); }
      else setMessage(`Congratulations, ${displayName}! Your acceptance letter and account-confirmation link are on the way to ${email}. Check your inbox and spam folder.`);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Your application could not be submitted."); }
    finally { setLoading(false); }
  }

  async function submitSignIn(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError(""); setMessage("");
    try { const next = await signIn(email.trim(), password); setSession(next); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Sign in was unsuccessful."); }
    finally { setLoading(false); }
  }

  async function reset(event: React.FormEvent) {
    event.preventDefault(); setLoading(true); setError("");
    try { await sendPasswordReset(email.trim()); setMessage("If an EFFU account exists for that email, a secure reset message is on the way."); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "The reset message could not be requested."); }
    finally { setLoading(false); }
  }

  async function completeCourse(module: string, score: number) {
    if (!session) return;
    const next = completed.includes(module) ? completed : [...completed, module];
    const activePathway = pathways.find((item) => item.slug === metadata.pathway_slug) || pathways[1];
    const graduatedAt = next.length >= activePathway.modules.length ? metadata.graduated_at || new Date().toISOString() : metadata.graduated_at;
    setLoading(true); setError("");
    try { setSession(await updateStudentMetadata(session, { ...metadata, completed_modules: next, quiz_scores: { ...(metadata.quiz_scores || {}), [module]: score }, graduated_at: graduatedAt })); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Progress could not be saved."); }
    finally { setLoading(false); }
  }

  function exportAccountSummary() {
    if (!session) return;
    const blob = new Blob([JSON.stringify({ exported_at: new Date().toISOString(), account_email: session.user.email, simulation_record: metadata, disclaimer: FULL_SIMULATION_DISCLAIMER }, null, 2)], { type: "application/json" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "effu-account-summary.json"; link.click(); URL.revokeObjectURL(link.href);
  }

  function printCompletionCertificate(pathwayName: string) {
    const certificate = window.open("", "_blank", "noopener,noreferrer"); if (!certificate) return;
    const clean = (value: string) => value.replace(/[<>&]/g, "");
    certificate.document.write(`<!doctype html><html><head><title>EFFU Completion Certificate</title><style>body{font-family:Arial;background:#42127f;padding:40px}.page{max-width:900px;margin:auto;background:#f5f0e6;border:16px double #42127f;padding:70px;text-align:center;color:#260651}h1{font:72px Georgia}.name{font:italic 48px Georgia;color:#42127f}.mark{margin-top:50px;border:3px solid #42127f;padding:14px;font-weight:bold}small{display:block;line-height:1.6;margin-top:20px}@media print{body{background:white;padding:0}}</style></head><body><main class="page"><b>EFF UNIVERSITY • EST. 2026</b><h1>Congratulations!</h1><p>This certificate recognizes</p><p class="name">${clean(metadata.display_name || "EFFU Student")}</p><p>for completing the educational-simulation pathway</p><h2>${clean(pathwayName)}</h2><p>Every Future Fulfilled.</p><div class="mark">${SIMULATION_WATERMARK}</div><small>Not an academic degree, diploma, college credit, professional license, or official record from an accredited institution.</small></main><script>window.print()</script></body></html>`); certificate.document.close();
  }

  if (session) {
    const pathway = pathways.find((item) => item.slug === metadata.pathway_slug) || pathways[1];
    const percentage = Math.round((completed.length / pathway.modules.length) * 100);
    return <main className="account-shell">
      <header className="account-campus-header">
        <a href="/"><img src="/eff-university-dove-crest.png" alt="" /><span><b>EFF UNIVERSITY</b><small>STUDENT PORTAL</small></span></a>
        <nav><a href="/eff-university/pathways">Explore Pathways</a><a href="/resources">Resources</a><a href="/tech-support">Tech Support</a>{session.user.email?.toLowerCase() === "nationals@estherfundsinc.org" && <a href="/admin">Admin</a>}<button onClick={async () => { await signOut(session); setSession(null); }}>Sign Out</button></nav>
      </header>
      <section className="portal-welcome">
        <div><p className="eyebrow light">WELCOME TO YOUR EFFU STUDENT PORTAL</p><h1>Welcome back,<br /><em>{metadata.display_name || "EFFU Student"}.</em></h1><p>Your next step is waiting. Continue your pathway, update your Continuity Passport, and practice the decisions that help students persist.</p></div>
        <article className="digital-id official-simulation-document"><small>EFF UNIVERSITY • EST. 2026 • DIGITAL STUDENT ID</small><img src="/eff-university-dove-crest.png" alt="" /><h2>{metadata.display_name || "EFFU STUDENT"}</h2><p>{metadata.student_id}</p><span>{metadata.pathway_name}</span><b>{SIMULATION_WATERMARK}</b></article>
      </section>
      <section className="account-dashboard">
        {error && <div className="account-error" role="alert">{error}</div>}
        <div className="portal-stats"><article><small>PATHWAY PROGRESS</small><b>{percentage}%</b><div><i style={{ width: `${percentage}%` }} /></div></article><article><small>MODULES COMPLETE</small><b>{completed.length}/{pathway.modules.length}</b></article><article><small>STUDENT STATUS</small><b>ACCEPTED</b></article></div>
        <div className="dashboard-grid">
          <section className="dashboard-main" id="my-pathway"><p className="eyebrow">MY PATHWAY</p><h2>{pathway.name}</h2><p>{pathway.description}</p><div className="course-gate-note"><b>COURSES, QUIZZES & TESTS</b><span>Open each lesson, complete its real-life scenario, and score at least 2 of 3. Courses cannot be marked complete without passing.</span></div><ol className="account-modules">{pathway.modules.map((module, index) => <li className={completed.includes(module) ? "complete" : ""} key={module}><button disabled={loading} onClick={() => setActiveModule(index)}><span>{completed.includes(module) ? "✓" : String(index + 1).padStart(2, "0")}</span><b>{module}</b><small>{completed.includes(module) ? `Passed • ${metadata.quiz_scores?.[module] || 2}/3 • Review course` : "Open lesson & graded quiz"}</small></button></li>)}</ol></section>
          <aside className="dashboard-side">
            <article><small>OFFICE OF ADMISSIONS</small><h3>My acceptance letter</h3><p>Reopen or print your personalized EFFU educational-simulation acceptance letter at any time.</p><button onClick={() => setAcceptance({ displayName: metadata.display_name || "EFFU Student", studentId: metadata.student_id || "EFFU Student", pathwayName: pathway.name, acceptedAt: metadata.accepted_at || new Date().toISOString() })}>OPEN MY ACCEPTANCE LETTER</button></article>
            <article><small>QUICK ACTION</small><h3>Continue your simulation</h3><p>Enter the full college experience to explore majors, housing, financial aid, schedules, organizations, emergencies, and graduation.</p><a href="/#apply">ENTER EFF UNIVERSITY →</a></article>
            <article><small>PRIVATE RECORD</small><h3>Continuity Passport</h3><p>Your pathway and completed modules are saved securely to your account.</p><a href="/eff-university/passport">OPEN PASSPORT →</a></article>
            <article><small>NEED HELP?</small><h3>EFFU Tech Department</h3><p>Get help signing in, confirming your email, resetting your password, or navigating your student portal.</p><a href="/tech-support">GET ACCOUNT HELP →</a></article>
            <article><small>MY DATA & CONSENT</small><h3>Privacy controls</h3><p>Export your current EFFU account summary, review the privacy notice and consent version, or begin a verified account-deletion request.</p><button onClick={exportAccountSummary}>EXPORT MY ACCOUNT SUMMARY</button><a href="/policies#consent">VIEW CONSENT HISTORY →</a><a href="/support#account-data">REQUEST ACCOUNT DELETION →</a></article>
          </aside>
        </div>
        {completed.length >= pathway.modules.length && <section className="graduation-unlock official-simulation-document"><img src="/eff-university-dove-crest.png" alt="" /><div><p className="eyebrow light">EFFU COMMENCEMENT</p><h2>Congratulations, {metadata.display_name || "graduate"}!</h2><p>You graduated from the <b>{pathway.name}</b> educational experience by passing every required course and knowledge check. Your scholarship application is now unlocked below.</p><button onClick={() => printCompletionCertificate(pathway.name)}>PRINT MY COMPLETION CERTIFICATE →</button><small>{SIMULATION_WATERMARK}</small></div></section>}
        <ScholarshipPanel session={session} unlocked={completed.length >= pathway.modules.length} />
        {activeModule !== null && <CourseExperience module={pathway.modules[activeModule]} moduleIndex={activeModule} pathwayName={pathway.name} passed={completed.includes(pathway.modules[activeModule])} onClose={() => setActiveModule(null)} onPass={(score) => completeCourse(pathway.modules[activeModule], score)} />}
        {acceptance && <AcceptanceLetter details={acceptance} onClose={() => setAcceptance(null)} />}
        <p className="dashboard-simulation-disclaimer"><b>{SIMULATION_WATERMARK}</b>{FULL_SIMULATION_DISCLAIMER}</p>
      </section>
    </main>;
  }

  return <main className="account-shell application-shell">
    <header className="account-campus-header"><a href="/"><img src="/eff-university-dove-crest.png" alt="" /><span><b>EFF UNIVERSITY</b><small>ADMISSIONS & STUDENT ACCOUNTS</small></span></a><nav><a href="/eff-university/pathways">Explore Pathways</a><a href="/tech-support">Tech Support</a></nav></header>
    <section className="account-admissions-hero"><div><p className="eyebrow light">NOW ACCEPTING EFFU STUDENTS</p><h1>Your future has<br /><em>a place here.</em></h1><p>Apply to the free EFF University educational experience, receive a personalized acceptance email, activate your private student account, and save your progress from any device.</p><div className="admissions-promises"><span>✓ Free to participate</span><span>✓ Personalized acceptance</span><span>✓ Saved pathway progress</span><span>✓ No transcripts or test scores</span></div></div><img src="/effu-students-campus-quad.png" alt="EFF University students gathering on a fictional college campus" /></section>
    <section className="account-form-wrap">
      <div className="account-mode-tabs" role="tablist"><button className={mode === "apply" ? "active" : ""} onClick={() => { setMode("apply"); setMessage(""); setError(""); }}>APPLY & CREATE ACCOUNT</button><button className={mode === "signin" ? "active" : ""} onClick={() => { setMode("signin"); setMessage(""); setError(""); }}>STUDENT SIGN IN</button><button className={mode === "reset" ? "active" : ""} onClick={() => { setMode("reset"); setMessage(""); setError(""); }}>RESET PASSWORD</button></div>
      {message && <div className="account-success" role="status"><b>EFFU ADMISSIONS UPDATE</b><p>{message}</p>{mode === "apply" && <button onClick={() => setMode("signin")}>GO TO STUDENT SIGN IN</button>}</div>}
      {error && <div className="account-error" role="alert"><b>LET’S FIX THIS</b><p>{error}</p><a href="/tech-support">Visit the EFFU Tech Department</a></div>}
      {mode === "apply" && <form className="account-application" onSubmit={submitApplication}>
        <div className="form-heading"><span>01</span><div><small>OFFICE OF ADMISSIONS</small><h2>EFF University Application</h2><p>Complete this short application to create your student account. This is an educational simulation—not admission to an accredited university.</p></div></div>
        <div className="application-fields">
          <fieldset className="age-paths full"><legend>Choose the registration path that matches the learner</legend>
            <label><input required type="radio" name="age-path" value="under-13" checked={agePath === "under-13"} onChange={(event) => setAgePath(event.target.value)} /><b>Under 13</b><span>Guest Practice Mode only, supervised by a parent, guardian, school, or authorized organization. No independent account or community access.</span></label>
            <label><input required type="radio" name="age-path" value="13-17" checked={agePath === "13-17"} onChange={(event) => setAgePath(event.target.value)} /><b>Ages 13–17</b><span>Minor account path with the Parent/Guardian Notice, privacy limits, and age-restricted community safeguards.</span></label>
            <label><input required type="radio" name="age-path" value="adult" checked={agePath === "adult"} onChange={(event) => setAgePath(event.target.value)} /><b>Adult</b><span>Self-directed registration for learners age 18 or older.</span></label>
          </fieldset>
          {agePath === "under-13" && <div className="under13-notice full"><b>USE GUEST PRACTICE MODE</b><p>Do not enter the child’s email address, photograph, school, legal name, or other personal information.</p><a href="/first-day">CONTINUE AS A SUPERVISED GUEST →</a></div>}
          <label>Preferred display name<input required maxLength={40} value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="How should we greet you?" /></label>
          <label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
          <label>Create a password<input required type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" /><small>Use at least 8 characters. Never reuse a school or banking password.</small></label>
          <label>Where are you starting?<select required value={stage} onChange={(event) => setStage(event.target.value)}><option value="">Choose your starting point</option><option>Middle school</option><option>High school</option><option>Completed high school</option><option>Current college student</option><option>Returning to college</option><option>Adult education or equivalency pathway</option><option>Family or community supporter</option></select></label>
          <label className="full">Choose your first pathway<select value={pathwaySlug} onChange={(event) => setPathwaySlug(event.target.value)}>{pathways.map((pathway) => <option value={pathway.slug} key={pathway.slug}>{pathway.name}</option>)}</select><small>You may explore or add other pathways later.</small></label>
          <label className="full">Education or career interests <span>Optional</span><textarea maxLength={240} value={interests} onChange={(event) => setInterests(event.target.value)} placeholder="What would you like to explore, learn, or accomplish?" /></label>
        </div>
        <div className="application-preview"><small>YOUR SELECTED STARTING PATHWAY</small><h3>{selectedPathway.name}</h3><p>{selectedPathway.description}</p><b>Completion product: {selectedPathway.completion}</b></div>
        <label className="account-consent"><input required type="checkbox" checked={guardian} onChange={(event) => setGuardian(event.target.checked)} /><span>{agePath === "13-17" ? "I reviewed the Children’s Privacy and Parent/Guardian Notices with a parent or guardian and consent to this minor account path." : "I reviewed the Privacy, Data Retention, and Simulation Notices and consent to this account path."} Consent version: {CONSENT_VERSION}.</span></label>
        <button className="account-submit" disabled={loading || !agePath || agePath === "under-13"}>{loading ? "SUBMITTING YOUR APPLICATION…" : agePath === "under-13" ? "UNDER-13 LEARNERS USE GUEST PRACTICE MODE" : "SUBMIT APPLICATION & CREATE MY ACCOUNT →"}</button>
        <p className="registration-disclaimer"><b>{SIMULATION_WATERMARK}</b>{FULL_SIMULATION_DISCLAIMER}</p>
        <p className="data-note">We do not request your legal name, birth date, address, Social Security number, transcripts, financial records, or identification documents.</p>
      </form>}
      {mode === "signin" && <form className="account-signin" onSubmit={submitSignIn}><div className="form-heading"><span>02</span><div><small>EFFU STUDENT ACCESS</small><h2>Student Sign In</h2><p>Return to your pathway, saved progress, and student portal.</p></div></div><label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" /></label><button className="account-submit" disabled={loading}>{loading ? "SIGNING IN…" : "OPEN MY STUDENT PORTAL →"}</button><button type="button" className="text-button" onClick={() => setMode("reset")}>I forgot my password</button></form>}
      {mode === "reset" && <form className="account-signin" onSubmit={reset}><div className="form-heading"><span>03</span><div><small>EFFU TECH DEPARTMENT</small><h2>Reset Your Password</h2><p>We will send a secure reset link if an account exists for this email.</p></div></div><label>Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label><button className="account-submit" disabled={loading}>{loading ? "REQUESTING LINK…" : "EMAIL MY RESET LINK →"}</button><a className="tech-inline" href="/tech-support">Still need help? Visit the EFFU Tech Department.</a></form>}
      {acceptance && <AcceptanceLetter details={acceptance} onClose={() => setAcceptance(null)} />}
    </section>
  </main>;
}
