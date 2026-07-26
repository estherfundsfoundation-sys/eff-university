"use client";

import { useState } from "react";
import { buildStayEnrolledPlan, stayScenarioOptions, type StayEnrolledPlan, type StayScenario } from "../../../../../lib/stay-enrolled";

export default function StayEnrolledEngine() {
  const [scenario, setScenario] = useState<StayScenario>("aid-not-posted");
  const [deadline, setDeadline] = useState("");
  const [plan, setPlan] = useState<StayEnrolledPlan | null>(null);

  return <>
    <form className="engine-form" onSubmit={(event) => { event.preventDefault(); setPlan(buildStayEnrolledPlan(scenario, deadline)); }}>
      <label>What is happening?<select value={scenario} onChange={(event) => setScenario(event.target.value as StayScenario)}>{stayScenarioOptions.map(({ value, label }) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label>Known deadline (optional)<input value={deadline} onChange={(event) => setDeadline(event.target.value)} placeholder="Example: Friday at 5:00 PM" /></label>
      <button type="submit">BUILD MY 24 / 48 / 72-HOUR PLAN</button>
    </form>
    {plan && <article className="plan" aria-live="polite">
      <span className="simulation-label">EDUCATIONAL GUIDANCE — POLICIES AND OFFICE NAMES VARY</span>
      <h2>{plan.title}</h2><p><b>General urgency:</b> {plan.urgency}</p><p>{plan.meaning}</p><p><b>Common first office:</b> {plan.office}</p>
      {([["Actions to Take Now", plan.now], ["Next 24 Hours", plan.hours24], ["Next 48 Hours", plan.hours48], ["Next 72 Hours", plan.hours72], ["Document Checklist", plan.documents], ["Questions to Ask", plan.questions], ["Follow-Up", plan.followUp], ["Possible Escalation", plan.escalation]] as const).map(([heading, items]) => <section key={heading}><h3>{heading}</h3><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}
      <h3>Sample Email</h3><pre>{plan.email}</pre><h3>Sample Phone Script</h3><pre>{plan.phone}</pre>
      <p>Request written confirmation. Institutional policies vary. This plan does not guarantee aid, housing, reinstatement, removal of a hold, or another outcome.</p>
      <div className="pathway-actions"><button type="button" onClick={() => window.print()}>PRINT MY PLAN</button><a className="secondary" href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">OPTIONALLY CONNECT WITH EFF SUPPORT</a></div>
    </article>}
  </>;
}
