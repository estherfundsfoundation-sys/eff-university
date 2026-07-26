"use client";

import { useMemo, useState } from "react";

type Mode = "middle" | "high" | "adult";
type StatKey = "readiness" | "wellbeing" | "budget" | "time";

type Choice = {
  label: string;
  result: string;
  changes: Partial<Record<StatKey, number>>;
  smart?: boolean;
};

type Scenario = {
  week: string;
  eyebrow: string;
  title: string;
  copy: string;
  choices: Choice[];
};

const modeInfo: Record<Mode, { label: string; ages: string; degree: string; intro: string }> = {
  middle: {
    label: "Future Explorer",
    ages: "Ages 11–13",
    degree: "College & Career Explorer",
    intro: "Try campus life through age-appropriate choices about classes, friendship, money, and asking for help.",
  },
  high: {
    label: "College Preview",
    ages: "Ages 14–18",
    degree: "College Readiness Navigator",
    intro: "Practice real admission, financial-aid, schedule, housing, and first-semester decisions before they become urgent.",
  },
  adult: {
    label: "Next Chapter",
    ages: "Adults & returning learners",
    degree: "Higher Education Pathway Builder",
    intro: "Compare college, certificates, apprenticeships, and workforce routes while balancing real adult responsibilities.",
  },
};

const scenarios: Record<Mode, Scenario[]> = {
  middle: [
    {
      week: "Week 1 · Welcome to campus",
      eyebrow: "Your first big decision",
      title: "Three activities happen at the same time.",
      copy: "The robotics club, student welcome event, and a quiet study session all begin after school. Tomorrow you have a quiz.",
      choices: [
        { label: "Make a plan: study first, then visit one club", result: "Great balance. You prepared for class and still explored campus life.", changes: { readiness: 12, time: 8, wellbeing: 5 }, smart: true },
        { label: "Try to attend everything", result: "You had fun, but rushing left you tired and unprepared. College often means choosing—not doing everything.", changes: { wellbeing: 4, time: -12, readiness: -4 } },
        { label: "Skip it all because it feels overwhelming", result: "Rest can help, but support makes new places easier. Next time, invite a buddy or trusted adult.", changes: { wellbeing: -3, readiness: -5, time: 5 } },
      ],
    },
    {
      week: "Week 2 · Money lab",
      eyebrow: "Your budget is $35",
      title: "Your class project needs supplies.",
      copy: "Supplies cost $24, lunch with friends costs $15, and the school library may have free materials.",
      choices: [
        { label: "Check the library, then buy only what is missing", result: "Resourceful choice. Asking what is already available protects your budget.", changes: { budget: 14, readiness: 12 }, smart: true },
        { label: "Buy everything and lunch too", result: "Your total is more than your budget. A spending plan prevents a small shortage from becoming a crisis.", changes: { budget: -18, readiness: 2 } },
        { label: "Avoid the project", result: "The cost felt stressful, but asking a teacher for options would keep you moving forward.", changes: { readiness: -12, wellbeing: -4, budget: 4 } },
      ],
    },
    {
      week: "Week 3 · Speak up",
      eyebrow: "A confusing grade",
      title: "Your assignment says “missing,” but you submitted it.",
      copy: "You feel nervous about talking to the teacher.",
      choices: [
        { label: "Send a respectful message with your submission proof", result: "Excellent advocacy. Facts, calm language, and documentation help solve problems.", changes: { readiness: 15, wellbeing: 7 }, smart: true },
        { label: "Ask a friend to handle it", result: "Friends can support you, but learning to speak for yourself builds confidence.", changes: { readiness: 2, wellbeing: 2 } },
        { label: "Say nothing", result: "Silence can allow fixable problems to grow. Support starts when someone knows what happened.", changes: { readiness: -10, wellbeing: -6 } },
      ],
    },
    {
      week: "Week 4 · Design your future",
      eyebrow: "Pathway studio",
      title: "Which next step helps you learn the most?",
      copy: "There is no single perfect future. Choose a way to explore before making a major commitment.",
      choices: [
        { label: "Interview someone in a career I’m curious about", result: "Curiosity becomes a plan when you ask real people real questions.", changes: { readiness: 16, wellbeing: 5 }, smart: true },
        { label: "Pick the career with the coolest title", result: "Titles can be exciting, but daily work, training, cost, and lifestyle matter too.", changes: { readiness: 3 } },
        { label: "Wait until senior year to think about it", result: "You do not need all the answers now. Small experiments today create better choices later.", changes: { readiness: -4, time: 3 } },
      ],
    },
  ],
  high: [
    {
      week: "Week 1 · The aid offer",
      eyebrow: "Your first real college problem",
      title: "A college says you received $31,000 in “financial aid.”",
      copy: "The package includes a $6,000 grant, $2,000 work-study offer, and $23,000 in loans. The school bill is $34,500.",
      choices: [
        { label: "Separate grants, earnings, and debt; calculate the real gap", result: "Correct. Work-study is earned later, loans must be repaid, and the immediate gap still needs a plan.", changes: { readiness: 18, budget: 12 }, smart: true },
        { label: "Accept everything because the total looks close", result: "A large aid total can hide debt and an unpaid balance. Read every line before accepting.", changes: { budget: -16, readiness: 2 } },
        { label: "Decline the college immediately", result: "The price matters, but first request an aid review and compare net prices with other options.", changes: { readiness: -5, wellbeing: -4, time: 4 } },
      ],
    },
    {
      week: "Week 2 · Schedule collision",
      eyebrow: "Classes + work",
      title: "Your job schedules you during a required lab.",
      copy: "Missing the lab could lower your grade, but you need income for transportation.",
      choices: [
        { label: "Contact the professor and supervisor today with two alternatives", result: "Early communication gives both people time to help. You protected your class and your income.", changes: { readiness: 14, time: 10, wellbeing: 6 }, smart: true },
        { label: "Skip the lab and explain later", result: "Waiting removes options. In college, early written communication matters.", changes: { readiness: -12, time: -5, budget: 3 } },
        { label: "Quit the job immediately", result: "That may solve the schedule but create a financial emergency. Explore shift changes and campus jobs first.", changes: { budget: -13, wellbeing: -5 } },
      ],
    },
    {
      week: "Week 3 · The $780 hold",
      eyebrow: "Registration at risk",
      title: "A balance blocks next semester’s registration.",
      copy: "The deadline is Friday. You cannot pay the full amount today.",
      choices: [
        { label: "Ask for an itemized balance, completion grant, extension, and hold review", result: "Strong advocacy. You named the consequence, requested specific options, and created a paper trail.", changes: { readiness: 18, budget: 10, time: 5 }, smart: true },
        { label: "Use a payday loan", result: "Fast money with extreme costs can turn one emergency into a larger crisis. Seek verified aid and school options first.", changes: { budget: -22, wellbeing: -10 } },
        { label: "Assume college is over", result: "A hold is serious, but it is a problem to investigate—not a verdict on your future.", changes: { readiness: -14, wellbeing: -12 } },
      ],
    },
    {
      week: "Week 4 · Choose your route",
      eyebrow: "Pathway decision",
      title: "You have four promising offers.",
      copy: "A four-year college, a paid apprenticeship, a two-year transfer program, and an industry certificate all connect to your goals.",
      choices: [
        { label: "Compare total cost, time, credentials, support, and job outcomes", result: "That is pathway thinking. The best choice fits your goal—not someone else’s definition of success.", changes: { readiness: 20, budget: 8, wellbeing: 6 }, smart: true },
        { label: "Choose the most famous name", result: "Reputation is one factor. Debt, completion support, accreditation, and outcomes deserve equal attention.", changes: { readiness: 3, budget: -8 } },
        { label: "Let social media decide", result: "Online stories can inspire research, but your final choice should use verified information and your priorities.", changes: { readiness: -5 } },
      ],
    },
  ],
  adult: [
    {
      week: "Week 1 · Pathway comparison",
      eyebrow: "Time is part of the price",
      title: "Three programs lead toward the same career.",
      copy: "One is flexible but expensive, one is affordable but daytime-only, and one offers paid work with slower credential progress.",
      choices: [
        { label: "Compare net cost, schedule, accreditation, transferability, and outcomes", result: "Excellent. A workable route accounts for your whole life—not tuition alone.", changes: { readiness: 18, budget: 10, time: 7 }, smart: true },
        { label: "Choose the fastest advertisement", result: "Speed claims can hide cost or weak credentials. Verify accreditation and employer recognition.", changes: { readiness: -5, budget: -12 } },
        { label: "Wait for a perfect option", result: "Perfect may not arrive. A low-risk first step can reveal what is workable.", changes: { readiness: -4, time: -8 } },
      ],
    },
    {
      week: "Week 2 · Life happens",
      eyebrow: "A childcare cancellation",
      title: "Your evening exam starts in two hours.",
      copy: "Your childcare falls through and the syllabus has a strict attendance rule.",
      choices: [
        { label: "Contact the instructor now, document the issue, and ask for the formal option", result: "You responded early and specifically. Documentation and policy-based requests preserve options.", changes: { readiness: 15, wellbeing: 7, time: 4 }, smart: true },
        { label: "Miss it without contacting anyone", result: "The emergency is real, but silence makes it harder for the instructor to help.", changes: { readiness: -14, wellbeing: -8 } },
        { label: "Bring the child without asking", result: "That may violate safety or classroom rules. Ask about approved alternatives first.", changes: { readiness: -4, wellbeing: -4 } },
      ],
    },
    {
      week: "Week 3 · Credit for experience",
      eyebrow: "You may already know more than you think",
      title: "You have six years of relevant work experience.",
      copy: "The college offers prior-learning assessment, but the process is unfamiliar.",
      choices: [
        { label: "Request written rules, eligible credits, fees, and transfer limits", result: "Smart. Verified prior learning can save time and money when it clearly applies to the program.", changes: { readiness: 16, budget: 12, time: 12 }, smart: true },
        { label: "Assume experience automatically becomes credit", result: "Experience is valuable, but schools require specific evidence and evaluation.", changes: { readiness: -5, time: -5 } },
        { label: "Ignore it because paperwork is annoying", result: "A short evidence process could prevent paying to relearn what you already know.", changes: { budget: -10, time: -10 } },
      ],
    },
    {
      week: "Week 4 · Your sustainable semester",
      eyebrow: "Build to finish",
      title: "How many courses should you take?",
      copy: "You work 35 hours, care for family, and want to complete quickly.",
      choices: [
        { label: "Choose a sustainable load and map summer or accelerated options", result: "Persistence beats overload. A realistic plan protects both progress and wellbeing.", changes: { readiness: 20, wellbeing: 12, time: 8 }, smart: true },
        { label: "Take the maximum because faster is always better", result: "Overloading can increase withdrawal risk. Completion speed must fit your available time and support.", changes: { wellbeing: -15, time: -15, readiness: 3 } },
        { label: "Take nothing until life is easy", result: "Life may remain complicated. Consider one course, a short credential, or a future start date with a preparation plan.", changes: { readiness: -5, time: 4 } },
      ],
    },
  ],
};

const statLabels: Record<StatKey, string> = {
  readiness: "Readiness",
  wellbeing: "Wellbeing",
  budget: "Budget power",
  time: "Time control",
};

export default function Home() {
  const [mode, setMode] = useState<Mode | null>(null);
  const [screen, setScreen] = useState<"home" | "learn" | "sim" | "complete">("home");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [stats, setStats] = useState<Record<StatKey, number>>({ readiness: 52, wellbeing: 68, budget: 48, time: 56 });
  const [smartChoices, setSmartChoices] = useState(0);

  const current = mode ? scenarios[mode][index] : null;
  const progress = mode ? Math.round(((index + (selected !== null ? 1 : 0)) / scenarios[mode].length) * 100) : 0;
  const score = useMemo(() => Math.round(Object.values(stats).reduce((a, b) => a + b, 0) / 4), [stats]);

  function start(selectedMode: Mode) {
    setMode(selectedMode);
    setScreen("learn");
    setIndex(0);
    setSelected(null);
    setStats({ readiness: 52, wellbeing: 68, budget: 48, time: 56 });
    setSmartChoices(0);
  }

  function choose(choiceIndex: number) {
    if (!current || selected !== null) return;
    const choice = current.choices[choiceIndex];
    setSelected(choiceIndex);
    setStats((prev) => {
      const next = { ...prev };
      (Object.keys(choice.changes) as StatKey[]).forEach((key) => {
        next[key] = Math.max(8, Math.min(100, next[key] + (choice.changes[key] ?? 0)));
      });
      return next;
    });
    if (choice.smart) setSmartChoices((value) => value + 1);
  }

  function next() {
    if (!mode) return;
    if (index === scenarios[mode].length - 1) {
      setScreen("complete");
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  }

  return (
    <main>
      <header className="site-header">
        <button className="brand" onClick={() => setScreen("home")} aria-label="EFF University home">
          <span className="brand-mark">E</span>
          <span><b>EFF University</b><small>Every Future Fulfilled</small></span>
        </button>
        <nav aria-label="Main navigation">
          <a href="#how">How it works</a>
          <a href="#paths">Learning paths</a>
          <a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Student Help</a>
        </nav>
        <button className="header-cta" onClick={() => document.getElementById("paths")?.scrollIntoView({ behavior: "smooth" })}>Enter campus <span>→</span></button>
      </header>

      {screen === "home" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="kicker"><span>✦</span> A college test drive for every future</p>
              <h1>Don’t just imagine college.<br/><em>Live it first.</em></h1>
              <p className="hero-lede">A free four-week simulation where learners ages 11 and up make real-life decisions, solve college problems, explore every pathway, and earn an EFF University certificate.</p>
              <div className="hero-actions">
                <button className="primary" onClick={() => document.getElementById("paths")?.scrollIntoView({ behavior: "smooth" })}>Start the experience <span>↗</span></button>
                <button className="text-button" onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}><span className="play">▶</span> See how it works</button>
              </div>
              <div className="trust-row">
                <span>FREE FOR LEARNERS</span><i />
                <span>AGES 11+</span><i />
                <span>NO GPA REQUIRED</span>
              </div>
            </div>
            <div className="campus-card" aria-label="Example EFF University student dashboard">
              <div className="campus-top">
                <span>EFF UNIVERSITY · FALL PREVIEW</span>
                <b>LIVE</b>
              </div>
              <div className="student-row">
                <div className="avatar">YOU</div>
                <div><small>STUDENT STATUS</small><h3>Future in progress</h3></div>
                <span className="student-id">EFFU · 0414</span>
              </div>
              <div className="day-label"><span>DAY 12</span><div><i style={{ width: "62%" }} /></div><small>18 DAYS TO GO</small></div>
              <div className="problem-card">
                <span className="alert-icon">!</span>
                <div><small>NEW CAMPUS CHALLENGE</small><b>Your financial-aid offer just arrived.</b><p>Can you find the real cost before the deadline?</p></div>
                <span>→</span>
              </div>
              <div className="mini-grid">
                <div><small>READINESS</small><strong>78</strong><span>↑ 12</span></div>
                <div><small>WELLBEING</small><strong>84</strong><span>Steady</span></div>
                <div><small>BADGES</small><strong>06</strong><span>View all</span></div>
              </div>
              <p className="card-note">Every decision changes your journey.</p>
            </div>
          </section>

          <section className="ticker" aria-label="Experience topics">
            <span>REAL DECISIONS</span><b>✦</b><span>MONEY SKILLS</span><b>✦</b><span>CAREER EXPLORATION</span><b>✦</b><span>SELF-ADVOCACY</span><b>✦</b><span>REAL SUPPORT</span>
          </section>

          <section className="how" id="how">
            <div className="section-heading">
              <p className="kicker"><span>02</span> WHAT YOU’LL EXPERIENCE</p>
              <h2>Four weeks. Real choices.<br/><em>A future you can see.</em></h2>
              <p>This isn’t another personality quiz. You’ll practice the moments that shape whether students enter, persist, and finish.</p>
            </div>
            <div className="experience-grid">
              {[
                ["01", "Build your semester", "Choose classes, balance time, and discover what a workable college week really feels like.", "MON · WED · FRI"],
                ["02", "Face real-life problems", "A surprise balance. A missed deadline. A work conflict. Make a move and see what happens.", "DECISION LAB"],
                ["03", "Learn to advocate", "Practice the exact questions, emails, and next steps that turn confusion into a clear plan.", "SPEAK UP"],
                ["04", "Design your pathway", "Compare college, certificates, apprenticeships, and work without pressure or judgment.", "YOUR FUTURE"],
              ].map(([n, title, copy, tag]) => (
                <article className="experience-card" key={n}>
                  <div className="number">{n}</div>
                  <span className="line-art" />
                  <h3>{title}</h3><p>{copy}</p><small>{tag} <b>↗</b></small>
                </article>
              ))}
            </div>
          </section>

          <section className="paths" id="paths">
            <div className="section-heading light">
              <p className="kicker"><span>03</span> CHOOSE YOUR CAMPUS</p>
              <h2>There’s a doorway<br/><em>for every learner.</em></h2>
            </div>
            <div className="path-grid">
              {(Object.keys(modeInfo) as Mode[]).map((key, idx) => (
                <article className={`path-card path-${idx + 1}`} key={key}>
                  <div className="path-top"><span>0{idx + 1}</span><small>{modeInfo[key].ages}</small></div>
                  <div className="path-icon">{idx === 0 ? "✦" : idx === 1 ? "⌂" : "↗"}</div>
                  <h3>{modeInfo[key].label}</h3>
                  <p>{modeInfo[key].intro}</p>
                  <button onClick={() => start(key)}>Choose this path <span>→</span></button>
                </article>
              ))}
            </div>
            <p className="paths-note">Every path is free. Every path ends with a personalized plan and certificate.</p>
          </section>

          <section className="certificate-preview">
            <div>
              <p className="kicker"><span>04</span> FINISH WITH PROOF</p>
              <h2>Not just a simulation.<br/><em>An achievement.</em></h2>
              <p>Complete all four weeks to earn a personalized EFF University Certificate of Readiness—plus your strengths, badges, and recommended next steps.</p>
              <ul><li>✓ Shareable certificate</li><li>✓ Personalized pathway plan</li><li>✓ Real-world readiness score</li></ul>
            </div>
            <div className="certificate">
              <div className="seal">EFF<br/><small>UNIVERSITY</small></div>
              <p>ESTHER FUNDS FOUNDATION PRESENTS</p>
              <h3>Certificate of Readiness</h3>
              <span>AWARDED TO</span>
              <strong>Your Name Here</strong>
              <p>for completing the College Trial Experience and demonstrating curiosity, resilience, and self-advocacy.</p>
              <div className="signature"><span>Shayna Vincent<br/><small>Founder & Executive Director</small></span><b>EFF · 0414</b></div>
            </div>
          </section>
        </>
      )}

      {screen === "learn" && mode && (
        <section className="orientation">
          <button className="back" onClick={() => setScreen("home")}>← Back to campus</button>
          <div className="orientation-card">
            <p className="kicker"><span>ORIENTATION</span> {modeInfo[mode].ages}</p>
            <h1>Welcome, <em>{modeInfo[mode].label}.</em></h1>
            <p>{modeInfo[mode].intro}</p>
            <div className="orientation-grid">
              <div><b>4</b><span>simulated weeks</span></div>
              <div><b>12</b><span>possible decisions</span></div>
              <div><b>1</b><span>certificate earned</span></div>
            </div>
            <div className="promise"><span>✦</span><p><b>Your EFF promise</b>You do not have to get every answer “right.” The goal is to practice, learn, and discover your next best step.</p></div>
            <button className="primary wide" onClick={() => setScreen("sim")}>Begin week one <span>→</span></button>
          </div>
        </section>
      )}

      {screen === "sim" && mode && current && (
        <section className="simulator">
          <aside>
            <p className="kicker"><span>EFFU</span> STUDENT DASHBOARD</p>
            <div className="sim-avatar">{modeInfo[mode].label.slice(0, 1)}</div>
            <h3>{modeInfo[mode].label}</h3><small>{modeInfo[mode].degree}</small>
            <div className="progress-label"><span>Semester progress</span><b>{progress}%</b></div>
            <div className="progress"><i style={{ width: `${progress}%` }} /></div>
            <div className="stats">
              {(Object.keys(stats) as StatKey[]).map((key) => (
                <div key={key}><span>{statLabels[key]}</span><b>{stats[key]}</b><i><u style={{ width: `${stats[key]}%` }} /></i></div>
              ))}
            </div>
            <div className="help-card"><b>Need real help now?</b><p>EFF’s Student Help Center is always one click away.</p><a href="https://portal.estherfundsfoundation.org/resources" target="_blank" rel="noreferrer">Open help center ↗</a></div>
          </aside>
          <div className="scenario">
            <div className="scenario-top"><span>{current.week}</span><span>Challenge {index + 1} of 4</span></div>
            <p className="scenario-eyebrow">{current.eyebrow}</p>
            <h1>{current.title}</h1>
            <p className="scenario-copy">{current.copy}</p>
            <h4>What do you do?</h4>
            <div className="choices">
              {current.choices.map((choice, choiceIndex) => (
                <button
                  key={choice.label}
                  onClick={() => choose(choiceIndex)}
                  disabled={selected !== null}
                  className={selected === choiceIndex ? "selected" : selected !== null ? "muted" : ""}
                >
                  <span>{String.fromCharCode(65 + choiceIndex)}</span><b>{choice.label}</b><i>→</i>
                </button>
              ))}
            </div>
            {selected !== null && (
              <div className={`feedback ${current.choices[selected].smart ? "smart" : ""}`}>
                <span>{current.choices[selected].smart ? "✓" : "↗"}</span>
                <div><b>{current.choices[selected].smart ? "Strong move" : "Learning moment"}</b><p>{current.choices[selected].result}</p></div>
                <button onClick={next}>{index === 3 ? "See my results" : "Continue"} →</button>
              </div>
            )}
          </div>
        </section>
      )}

      {screen === "complete" && mode && (
        <section className="results">
          <div className="confetti">✦ &nbsp; ✧ &nbsp; ✦</div>
          <p className="kicker"><span>SEMESTER COMPLETE</span> EVERY FUTURE FULFILLED</p>
          <h1>You didn’t just finish.<br/><em>You learned how to keep going.</em></h1>
          <p className="result-lede">You completed the EFF University {modeInfo[mode].label} experience and practiced decisions that help real students enter, persist, and finish.</p>
          <div className="result-grid">
            <div className="score-ring"><span><b>{score}</b><small>READINESS<br/>SCORE</small></span></div>
            <div className="result-copy">
              <small>YOUR STRENGTH</small>
              <h2>{smartChoices >= 3 ? "Resourceful self-advocate" : "Resilient pathway explorer"}</h2>
              <p>You showed that asking questions, comparing options, documenting problems, and acting early can change an educational outcome.</p>
              <div><span>Smart decisions</span><b>{smartChoices} / 4</b></div>
              <div><span>Challenges completed</span><b>4 / 4</b></div>
            </div>
          </div>
          <div className="certificate result-certificate">
            <div className="seal">EFF<br/><small>UNIVERSITY</small></div>
            <p>ESTHER FUNDS FOUNDATION PRESENTS</p>
            <h3>Certificate of Readiness</h3>
            <span>THIS CERTIFIES THE COMPLETION OF</span>
            <strong>{modeInfo[mode].degree}</strong>
            <p>College Trial Experience · Four-Week Simulation</p>
            <div className="signature"><span>Shayna Vincent<br/><small>Founder & Executive Director</small></span><b>EVERY FUTURE FULFILLED</b></div>
          </div>
          <div className="result-actions">
            <button className="primary" onClick={() => window.print()}>Print my certificate <span>↗</span></button>
            <button className="text-button" onClick={() => setScreen("home")}>Explore another path</button>
          </div>
        </section>
      )}

      <footer>
        <div className="brand footer-brand"><span className="brand-mark">E</span><span><b>EFF University</b><small>by Esther Funds Foundation</small></span></div>
        <p>A free college and career readiness experience built with dignity, faith, and real-world preparation.</p>
        <div><a href="https://estherfundsfoundation.org/" target="_blank" rel="noreferrer">Foundation</a><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Scholarship Portal</a><a href="mailto:nationals@estherfundsinc.org">Contact</a></div>
        <small>© 2026 Esther Funds Foundation · “For such a time as this.” — Esther 4:14</small>
      </footer>
    </main>
  );
}
