"use client";

import { useMemo, useState } from "react";

type Major = {
  name: string;
  school: string;
  degree: string;
  courses: string[];
  career: string;
};

const majors: Major[] = [
  { name: "Accounting", school: "Business & Entrepreneurship", degree: "B.S.", courses: ["Financial Accounting", "Auditing", "Tax Strategy"], career: "Auditor, analyst, CPA pathway" },
  { name: "Advertising", school: "Media & Creative Arts", degree: "B.A.", courses: ["Brand Storytelling", "Media Strategy", "Campaign Studio"], career: "Creative strategist, media planner" },
  { name: "Africana Studies", school: "Humanities & Social Sciences", degree: "B.A.", courses: ["African Diaspora", "Black Political Thought", "Culture & Identity"], career: "Research, policy, education" },
  { name: "Architecture", school: "Design & Built Environment", degree: "B.Arch.", courses: ["Design Studio I", "Building Systems", "Urban Form"], career: "Architect, urban designer" },
  { name: "Art & Illustration", school: "Media & Creative Arts", degree: "B.F.A.", courses: ["Drawing Foundations", "Digital Illustration", "Portfolio Studio"], career: "Illustrator, art director" },
  { name: "Biochemistry", school: "Science & Technology", degree: "B.S.", courses: ["Organic Chemistry", "Molecular Biology", "Biochemistry Lab"], career: "Research, medicine, biotechnology" },
  { name: "Biology", school: "Science & Technology", degree: "B.S.", courses: ["Cell Biology", "Genetics", "Ecology Lab"], career: "Research, health, conservation" },
  { name: "Business Analytics", school: "Business & Entrepreneurship", degree: "B.S.", courses: ["Data Visualization", "Predictive Analytics", "Decision Models"], career: "Business analyst, data strategist" },
  { name: "Chemistry", school: "Science & Technology", degree: "B.S.", courses: ["General Chemistry", "Analytical Methods", "Physical Chemistry"], career: "Chemist, laboratory scientist" },
  { name: "Civil Engineering", school: "Engineering & Computing", degree: "B.S.E.", courses: ["Statics", "Structural Analysis", "Transportation Design"], career: "Civil or structural engineer" },
  { name: "Communications", school: "Media & Creative Arts", degree: "B.A.", courses: ["Public Speaking", "Digital Communication", "Media Ethics"], career: "Communications specialist, producer" },
  { name: "Computer Engineering", school: "Engineering & Computing", degree: "B.S.E.", courses: ["Digital Logic", "Embedded Systems", "Computer Architecture"], career: "Hardware or systems engineer" },
  { name: "Computer Science", school: "Engineering & Computing", degree: "B.S.", courses: ["Programming I", "Data Structures", "Software Engineering"], career: "Software engineer, developer" },
  { name: "Construction Management", school: "Design & Built Environment", degree: "B.S.", courses: ["Cost Estimating", "Project Scheduling", "Construction Law"], career: "Project manager, estimator" },
  { name: "Criminal Justice", school: "Public Service & Justice", degree: "B.A.", courses: ["Justice Systems", "Criminology", "Community Corrections"], career: "Investigation, advocacy, public safety" },
  { name: "Cybersecurity", school: "Engineering & Computing", degree: "B.S.", courses: ["Network Security", "Ethical Hacking", "Digital Forensics"], career: "Security analyst, incident responder" },
  { name: "Dance", school: "Media & Creative Arts", degree: "B.F.A.", courses: ["Modern Technique", "Choreography", "Arts Management"], career: "Performer, choreographer, educator" },
  { name: "Data Science", school: "Engineering & Computing", degree: "B.S.", courses: ["Statistics with Python", "Machine Learning", "Data Ethics"], career: "Data scientist, quantitative analyst" },
  { name: "Early Childhood Education", school: "Education & Human Development", degree: "B.S.", courses: ["Child Development", "Literacy Methods", "Inclusive Classrooms"], career: "Teacher, curriculum specialist" },
  { name: "Economics", school: "Business & Entrepreneurship", degree: "B.A.", courses: ["Microeconomics", "Econometrics", "Public Finance"], career: "Economist, policy or market analyst" },
  { name: "Electrical Engineering", school: "Engineering & Computing", degree: "B.S.E.", courses: ["Circuit Analysis", "Signals & Systems", "Power Electronics"], career: "Electrical or controls engineer" },
  { name: "Elementary Education", school: "Education & Human Development", degree: "B.S.", courses: ["Teaching & Learning", "Math Methods", "Student Teaching"], career: "Elementary teacher, instructional coach" },
  { name: "Emergency Management", school: "Public Service & Justice", degree: "B.S.", courses: ["Disaster Planning", "Crisis Leadership", "Community Resilience"], career: "Emergency planner, response coordinator" },
  { name: "English & Writing", school: "Humanities & Social Sciences", degree: "B.A.", courses: ["World Literature", "Creative Writing", "Editing & Publishing"], career: "Writer, editor, educator" },
  { name: "Entrepreneurship", school: "Business & Entrepreneurship", degree: "B.B.A.", courses: ["Venture Design", "Startup Finance", "Social Entrepreneurship"], career: "Founder, innovation consultant" },
  { name: "Environmental Science", school: "Science & Technology", degree: "B.S.", courses: ["Climate Science", "Environmental Policy", "Field Ecology"], career: "Environmental scientist, sustainability lead" },
  { name: "Fashion Design", school: "Media & Creative Arts", degree: "B.F.A.", courses: ["Textiles", "Apparel Construction", "Collection Studio"], career: "Designer, product developer" },
  { name: "Finance", school: "Business & Entrepreneurship", degree: "B.S.", courses: ["Corporate Finance", "Investments", "Financial Modeling"], career: "Financial analyst, advisor" },
  { name: "Film & Television", school: "Media & Creative Arts", degree: "B.F.A.", courses: ["Screenwriting", "Production I", "Post-Production"], career: "Producer, editor, director" },
  { name: "Forensic Science", school: "Science & Technology", degree: "B.S.", courses: ["Crime Scene Methods", "Forensic Chemistry", "Evidence Analysis"], career: "Forensic scientist, lab analyst" },
  { name: "Graphic Design", school: "Media & Creative Arts", degree: "B.F.A.", courses: ["Typography", "Visual Systems", "UX Foundations"], career: "Designer, brand or UX specialist" },
  { name: "Health Administration", school: "Health & Wellness", degree: "B.S.", courses: ["Health Systems", "Quality Improvement", "Healthcare Finance"], career: "Hospital or clinic administrator" },
  { name: "History", school: "Humanities & Social Sciences", degree: "B.A.", courses: ["U.S. History", "Global Movements", "Historical Research"], career: "Museum, law, research, education" },
  { name: "Hospitality Management", school: "Business & Entrepreneurship", degree: "B.S.", courses: ["Guest Experience", "Event Operations", "Hospitality Finance"], career: "Hotel, event, tourism management" },
  { name: "Human Resources", school: "Business & Entrepreneurship", degree: "B.B.A.", courses: ["Talent Management", "Employment Law", "Organizational Behavior"], career: "HR partner, recruiter" },
  { name: "Information Technology", school: "Engineering & Computing", degree: "B.S.", courses: ["Cloud Systems", "IT Support Lab", "Database Administration"], career: "Systems administrator, IT specialist" },
  { name: "International Relations", school: "Humanities & Social Sciences", degree: "B.A.", courses: ["Global Politics", "Diplomacy", "International Law"], career: "Diplomacy, global policy, NGOs" },
  { name: "Journalism", school: "Media & Creative Arts", degree: "B.A.", courses: ["News Reporting", "Multimedia Storytelling", "Investigative Journalism"], career: "Reporter, producer, editor" },
  { name: "Kinesiology", school: "Health & Wellness", degree: "B.S.", courses: ["Human Movement", "Exercise Physiology", "Sport Psychology"], career: "Fitness, rehabilitation, coaching" },
  { name: "Legal Studies", school: "Public Service & Justice", degree: "B.A.", courses: ["Legal Research", "Constitutional Law", "Advocacy Writing"], career: "Paralegal, policy, pre-law" },
  { name: "Marketing", school: "Business & Entrepreneurship", degree: "B.B.A.", courses: ["Consumer Behavior", "Digital Marketing", "Brand Strategy"], career: "Marketing strategist, brand manager" },
  { name: "Mathematics", school: "Science & Technology", degree: "B.S.", courses: ["Calculus", "Linear Algebra", "Mathematical Modeling"], career: "Analytics, teaching, research" },
  { name: "Mechanical Engineering", school: "Engineering & Computing", degree: "B.S.E.", courses: ["Dynamics", "Thermodynamics", "Design Lab"], career: "Mechanical or product engineer" },
  { name: "Music", school: "Media & Creative Arts", degree: "B.M.", courses: ["Music Theory", "Applied Performance", "Music Technology"], career: "Performer, producer, educator" },
  { name: "Nursing", school: "Health & Wellness", degree: "B.S.N.", courses: ["Health Assessment", "Clinical Nursing", "Community Health"], career: "Registered nurse, public health" },
  { name: "Nutrition & Dietetics", school: "Health & Wellness", degree: "B.S.", courses: ["Human Nutrition", "Food Science", "Clinical Dietetics"], career: "Dietitian pathway, wellness specialist" },
  { name: "Occupational Therapy Studies", school: "Health & Wellness", degree: "B.S.", courses: ["Human Occupation", "Anatomy", "Assistive Technology"], career: "OT graduate pathway, rehabilitation" },
  { name: "Philosophy", school: "Humanities & Social Sciences", degree: "B.A.", courses: ["Ethics", "Logic", "Philosophy of Justice"], career: "Law, research, ethics" },
  { name: "Political Science", school: "Public Service & Justice", degree: "B.A.", courses: ["American Government", "Campaigns & Elections", "Public Policy"], career: "Government, advocacy, policy" },
  { name: "Psychology", school: "Education & Human Development", degree: "B.A.", courses: ["General Psychology", "Human Development", "Research Methods"], career: "Counseling pathway, research, HR" },
  { name: "Public Health", school: "Health & Wellness", degree: "B.S.", courses: ["Epidemiology", "Health Equity", "Community Health Lab"], career: "Health educator, program coordinator" },
  { name: "Public Relations", school: "Media & Creative Arts", degree: "B.A.", courses: ["PR Writing", "Crisis Communication", "Campaign Planning"], career: "Publicist, communications manager" },
  { name: "Social Work", school: "Public Service & Justice", degree: "B.S.W.", courses: ["Human Behavior", "Social Welfare Policy", "Field Practice"], career: "Social worker, case manager" },
  { name: "Sociology", school: "Humanities & Social Sciences", degree: "B.A.", courses: ["Social Inequality", "Race & Society", "Community Research"], career: "Community research, policy, nonprofit work" },
  { name: "Special Education", school: "Education & Human Development", degree: "B.S.", courses: ["Exceptional Learners", "Behavior Supports", "Inclusive Teaching"], career: "Special education teacher, advocate" },
  { name: "Sport Management", school: "Business & Entrepreneurship", degree: "B.S.", courses: ["Sport Marketing", "Venue Operations", "Sport Law"], career: "Athletics administration, events" },
  { name: "Supply Chain Management", school: "Business & Entrepreneurship", degree: "B.S.", courses: ["Logistics", "Procurement", "Operations Analytics"], career: "Logistics or operations manager" },
  { name: "Theatre Arts", school: "Media & Creative Arts", degree: "B.F.A.", courses: ["Acting Studio", "Stagecraft", "Directing"], career: "Performer, director, production manager" },
  { name: "Urban Planning", school: "Design & Built Environment", degree: "B.S.", courses: ["City Systems", "GIS Mapping", "Community Design"], career: "Planner, development analyst" },
];

const orientationSteps = [
  ["01", "Welcome & belonging", "Meet your virtual orientation leader, learn campus language, and choose the support people you want on your team.", ["Campus vocabulary guide", "Family & supporter guide", "Belonging check-in"]],
  ["02", "Academic life", "Build a realistic schedule, read a syllabus, use office hours, and practice emailing a professor before a problem grows.", ["Sample syllabus", "Professor email builder", "Study-time calculator"]],
  ["03", "Money & aid", "Learn the difference between grants, scholarships, work-study, loans, direct costs, and everyday living expenses.", ["Award-letter decoder", "True-cost worksheet", "Aid appeal checklist"]],
  ["04", "Life on campus", "Explore residence halls, commuting, dining, transportation, clubs, disability access, safety, and student employment.", ["Move-in checklist", "Commuter success map", "Campus job planner"]],
  ["05", "Your support network", "Know exactly where to go for tutoring, food, housing, mental-health support, emergency aid, and student advocacy.", ["Student Help Center", "National Student Help Desk", "Name Your Need"]],
];

const challenges = [
  { title: "Your professor marks an assignment missing.", answer: "Send a calm message with the submission receipt and ask for a review.", why: "Documentation plus early communication protects your options." },
  { title: "A $780 balance blocks registration Friday.", answer: "Request an itemized balance, hold review, extension, and completion-grant screening.", why: "Specific requests create more paths than simply asking for help." },
  { title: "Your job schedules you during a required lab.", answer: "Contact both the professor and supervisor today with two possible alternatives.", why: "Early written communication gives everyone time to solve the conflict." },
  { title: "You feel like dropping every class after one hard week.", answer: "Pause withdrawals, speak with advising and financial aid, then compare the consequences and support options.", why: "A hard week is information—not a verdict on your future." },
];

const formatMoney = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function Home() {
  const [view, setView] = useState<"home" | "majors" | "orientation" | "aid" | "simulation" | "certificate">("home");
  const [query, setQuery] = useState("");
  const [school, setSchool] = useState("All schools");
  const [openMajor, setOpenMajor] = useState<string | null>(null);
  const [orientationDone, setOrientationDone] = useState<number[]>([]);
  const [tuition, setTuition] = useState(34500);
  const [grants, setGrants] = useState(11000);
  const [scholarships, setScholarships] = useState(5000);
  const [loans, setLoans] = useState(7500);
  const [workStudy, setWorkStudy] = useState(2000);
  const [aidDecision, setAidDecision] = useState<string | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengeSolved, setChallengeSolved] = useState(false);

  const schools = useMemo(() => ["All schools", ...Array.from(new Set(majors.map((major) => major.school))).sort()], []);
  const filtered = majors.filter((major) => {
    const matchQuery = `${major.name} ${major.school} ${major.career}`.toLowerCase().includes(query.toLowerCase());
    return matchQuery && (school === "All schools" || major.school === school);
  });
  const freeAid = grants + scholarships;
  const billAfterFreeAid = Math.max(0, tuition - freeAid);
  const remainingAfterLoans = Math.max(0, billAfterFreeAid - loans);
  const orientationPercent = Math.round((orientationDone.length / orientationSteps.length) * 100);

  function navigate(next: typeof view) {
    setView(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToOrganizations() {
    setView("home");
    window.setTimeout(() => document.getElementById("organizations")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  return (
    <main>
      <header className="university-header">
        <button className="wordmark" onClick={() => navigate("home")} aria-label="EFF University home">
          <span className="crest">EFF</span>
          <span><b>EFF UNIVERSITY</b><small>Every Future Fulfilled.</small></span>
        </button>
        <nav aria-label="University navigation">
          <button onClick={() => navigate("majors")}>Academics</button>
          <button onClick={() => navigate("orientation")}>Orientation</button>
          <button onClick={() => navigate("aid")}>Financial Aid Lab</button>
          <button onClick={() => navigate("simulation")}>Campus Simulation</button>
          <button onClick={goToOrganizations}>For Organizations</button>
        </nav>
        <button className="portal-button" onClick={() => navigate("orientation")}>Enter campus <span>→</span></button>
      </header>

      {view === "home" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">ESTHER FUNDS FOUNDATION PRESENTS</p>
              <h1>A university you can<br/><em>experience before enrolling.</em></h1>
              <p className="hero-lede">Explore majors. Attend orientation. Read a real financial-aid offer. Build your schedule. Face the moments nobody warns you about—and learn what to do next.</p>
              <div className="hero-actions">
                <button className="primary" onClick={() => navigate("orientation")}>Begin orientation <span>↗</span></button>
                <button className="outline" onClick={() => navigate("majors")}>Explore 50+ majors</button>
              </div>
              <div className="audience-note">
                <b>BUILT FOR EVERY STAGE</b>
                <span>Future students</span><i>•</i><span>High-school students</span><i>•</i><span>College students</span><i>•</i><span>Adult & returning learners</span><i>•</i><span>Schools & organizations</span>
              </div>
            </div>
            <div className="campus-scene">
              <div className="admission-letter">
                <small>OFFICE OF THE FUTURE</small>
                <h2>You’re admitted<br/>to the experience.</h2>
                <p>Your path does not have to look like anyone else’s. Here, you can test your choices before they cost you time or money.</p>
                <div className="letter-seal">E<br/><span>FFU</span></div>
              </div>
              <div className="tape">EVERY FUTURE FULFILLED.</div>
              <span className="doodle star">☆</span>
              <span className="doodle arrow">↗</span>
            </div>
          </section>

          <section className="marquee">
            <span>CHOOSE A MAJOR</span><b>✦</b><span>BUILD A SCHEDULE</span><b>✦</b><span>DECODE YOUR AID</span><b>✦</b><span>SOLVE REAL PROBLEMS</span><b>✦</b><span>FIND YOUR SUPPORT</span>
          </section>

          <section className="campus-map">
            <div className="section-intro">
              <p className="eyebrow">YOUR VIRTUAL CAMPUS</p>
              <h2>Walk through college<br/><em>before college walks over you.</em></h2>
              <p>EFF University is a guided simulation—not an accredited college and not a promise of admission or aid. It is a place to practice the decisions that shape access, persistence, and completion.</p>
            </div>
            <div className="campus-grid">
              {[
                ["01", "Academic Commons", "Search more than 50 majors and preview actual first-year courses.", "majors" as const, "Explore academics"],
                ["02", "Orientation Hall", "Complete a five-part student orientation with guides, checklists, and support resources.", "orientation" as const, "Start orientation"],
                ["03", "Financial Aid Office", "Open a simulated award packet and calculate the true amount you would owe.", "aid" as const, "Decode an offer"],
                ["04", "Persistence Lab", "Face realistic academic, financial, work, housing, and registration problems.", "simulation" as const, "Enter the simulation"],
              ].map(([number, title, copy, destination, action]) => (
                <article className="campus-building" key={number}>
                  <span className="building-number">{number}</span>
                  <div className="building-icon">{number === "01" ? "LIBRARY" : number === "02" ? "HALL" : number === "03" ? "AID" : "LAB"}</div>
                  <h3>{title}</h3><p>{copy}</p>
                  <button onClick={() => navigate(destination)}>{action} <span>→</span></button>
                </article>
              ))}
            </div>
          </section>

          <section className="major-preview">
            <div>
              <p className="eyebrow light">ACADEMICS WITHOUT PRESSURE</p>
              <h2>Your major is a direction,<br/><em>not a life sentence.</em></h2>
              <p>Compare fields by what you will study, what the work can look like, and what other pathways may lead to the same goal.</p>
              <button className="cream-button" onClick={() => navigate("majors")}>View the full catalog →</button>
            </div>
            <div className="major-ticket-stack">
              {["NURSING • B.S.N.", "COMPUTER SCIENCE • B.S.", "ENTREPRENEURSHIP • B.B.A.", "FILM & TELEVISION • B.F.A.", "SOCIAL WORK • B.S.W."].map((item, i) => <span style={{ transform: `rotate(${i % 2 ? 2 : -2}deg)` }} key={item}>{item}</span>)}
            </div>
          </section>

          <section className="organizations" id="organizations">
            <div className="org-heading">
              <p className="eyebrow">FOR SCHOOLS & ORGANIZATIONS</p>
              <h2>Bring the campus<br/><em>to your community.</em></h2>
              <p>Use EFF University as a college-access experience for a classroom, advising program, youth group, employee network, community event, or student-success initiative.</p>
            </div>
            <div className="org-grid">
              {[
                ["K–12 SCHOOLS", "Help students explore majors, understand college language, and build readiness before senior year.", "Classroom experience"],
                ["COLLEGES & UNIVERSITIES", "Prepare incoming students, strengthen belonging, and practice persistence skills before the first crisis.", "Pre-college & retention"],
                ["NONPROFITS & YOUTH PROGRAMS", "Add a structured college-and-career simulation to mentoring, after-school, and summer programs.", "Program partner"],
                ["EMPLOYERS & WORKFORCE PARTNERS", "Help employees and families compare degrees, certificates, apprenticeships, and career pathways.", "Workforce pathway"],
                ["FAITH & COMMUNITY GROUPS", "Host an accessible future-planning experience with practical resources and family involvement.", "Community experience"],
                ["FOUNDATIONS & SPONSORS", "Expand free access, support local cohorts, and help measure readiness and resource needs.", "Impact partner"],
              ].map(([title, copy, tag], i) => (
                <article key={title}><span>0{i + 1}</span><small>{tag}</small><h3>{title}</h3><p>{copy}</p></article>
              ))}
            </div>
            <div className="org-cta">
              <div><b>HOST AN EFF UNIVERSITY EXPERIENCE</b><p>Organizations can use the experience for individual learners, guided cohorts, workshops, family nights, and college-access events.</p></div>
              <a href="https://www.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Connect with Esther Funds Foundation ↗</a>
            </div>
          </section>

          <section className="support-banner">
            <div><span className="hand">♡</span><p className="eyebrow">WHEN THE SIMULATION BECOMES REAL LIFE</p><h2>You do not have to solve it alone.</h2></div>
            <p>EFF connects students to scholarship resources, emergency assistance requests, FAFSA guidance, balance advocacy, and a national help desk.</p>
            <a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Visit the Student Help Center ↗</a>
          </section>
        </>
      )}

      {view === "majors" && (
        <section className="catalog-page">
          <div className="page-banner">
            <p className="eyebrow light">EFF UNIVERSITY ACADEMIC CATALOG</p>
            <h1>Find the subject that<br/><em>makes you lean forward.</em></h1>
            <p>Browse simulated academic pathways and sample courses. Use this catalog to explore—not to limit what you can become.</p>
          </div>
          <div className="catalog-tools">
            <label><span>SEARCH PROGRAMS</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try nursing, design, technology..." /></label>
            <label><span>FILTER BY SCHOOL</span><select value={school} onChange={(e) => setSchool(e.target.value)}>{schools.map((item) => <option key={item}>{item}</option>)}</select></label>
            <div><b>{filtered.length}</b><span>programs found</span></div>
          </div>
          <div className="school-ribbon">{schools.slice(1).map((item) => <button className={school === item ? "active" : ""} onClick={() => setSchool(item)} key={item}>{item}</button>)}</div>
          <div className="major-list">
            {filtered.map((major, index) => (
              <article className={`major-row ${openMajor === major.name ? "open" : ""}`} key={major.name}>
                <button onClick={() => setOpenMajor(openMajor === major.name ? null : major.name)}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><small>{major.school}</small><h2>{major.name}</h2></div>
                  <b>{major.degree}</b><i>{openMajor === major.name ? "−" : "+"}</i>
                </button>
                {openMajor === major.name && (
                  <div className="major-details">
                    <div><small>SAMPLE FIRST-YEAR COURSES</small>{major.courses.map((course, i) => <p key={course}><b>{String(101 + i * 10)}</b>{course}<span>3 credits</span></p>)}</div>
                    <div><small>WHERE THIS CAN LEAD</small><p>{major.career}</p><strong>Exploration tip</strong><p>Interview someone doing the work, review job postings, and compare the full cost of each education pathway before choosing.</p></div>
                  </div>
                )}
              </article>
            ))}
          </div>
          {filtered.length === 0 && <div className="empty-state"><b>No exact match—keep exploring.</b><p>Try a broader word such as “health,” “business,” “design,” or “technology.”</p></div>}
        </section>
      )}

      {view === "orientation" && (
        <section className="orientation-page">
          <div className="orientation-hero">
            <div>
              <p className="eyebrow light">NEW STUDENT ORIENTATION</p>
              <h1>Welcome to<br/><em>your next chapter.</em></h1>
              <p>Complete each station, collect the resources you need, and leave knowing where to go before a small concern becomes a crisis.</p>
            </div>
            <div className="student-id-card"><small>EFF UNIVERSITY</small><b>FUTURE STUDENT</b><span>ORIENTATION PASS</span><div>YOU<br/><small>BELONG HERE</small></div></div>
          </div>
          <div className="orientation-dashboard">
            <aside>
              <p className="eyebrow">YOUR PROGRESS</p>
              <strong>{orientationPercent}%</strong>
              <div className="progress-track"><i style={{ width: `${orientationPercent}%` }} /></div>
              <p>{orientationDone.length} of {orientationSteps.length} stations complete</p>
              <blockquote>“Asking for help is a college skill—not a failure.”</blockquote>
              <a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Open EFF Student Help Center ↗</a>
            </aside>
            <div className="orientation-stations">
              {orientationSteps.map(([number, title, description, resources], index) => {
                const done = orientationDone.includes(index);
                return (
                  <article className={done ? "done" : ""} key={number as string}>
                    <button onClick={() => setOrientationDone((current) => done ? current.filter((item) => item !== index) : [...current, index])} aria-label={`${done ? "Mark incomplete" : "Complete"} ${title}`}>
                      <span>{done ? "✓" : number}</span>
                      <div><small>ORIENTATION STATION {number}</small><h2>{title}</h2><p>{description}</p></div>
                      <b>{done ? "COMPLETED" : "MARK COMPLETE"}</b>
                    </button>
                    <div className="resource-drawer">
                      {(resources as string[]).map((resource) => <span key={resource}>▣ {resource}</span>)}
                    </div>
                  </article>
                );
              })}
              <div className="orientation-next">
                <div><span>✦</span><h3>Ready for the money conversation?</h3><p>Open your simulated award packet and discover what “financial aid” really means.</p></div>
                <button onClick={() => navigate("aid")}>Go to Financial Aid Lab →</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {view === "aid" && (
        <section className="aid-page">
          <div className="page-banner aid-banner">
            <p className="eyebrow light">FINANCIAL AID OFFICE • SIMULATION</p>
            <h1>Your award looks big.<br/><em>But what will college cost?</em></h1>
            <p>This practice packet teaches you to separate free money, money you earn later, and money you must repay.</p>
          </div>
          <div className="aid-workspace">
            <div className="award-letter">
              <div className="letterhead"><span className="crest small">EFF</span><div><b>EFF UNIVERSITY</b><small>Office of Student Financial Possibility</small></div><p>SIMULATED<br/>AWARD YEAR</p></div>
              <div className="congratulations"><small>Dear Future Student,</small><h2>Congratulations!</h2><p>You are eligible to consider the following estimated financial-aid package. This is a learning simulation, not an offer of actual funding.</p></div>
              <div className="cost-row"><span>Estimated cost of attendance</span><label>$ <input type="number" value={tuition} onChange={(e) => setTuition(Number(e.target.value))} /></label></div>
              <div className="award-section"><h3>GIFT AID <span>Usually does not have to be repaid</span></h3>
                <div><span>Institutional grant</span><label>$ <input type="number" value={grants} onChange={(e) => setGrants(Number(e.target.value))} /></label></div>
                <div><span>EFF Future scholarship</span><label>$ <input type="number" value={scholarships} onChange={(e) => setScholarships(Number(e.target.value))} /></label></div>
                <strong><span>Total free aid</span><b>{formatMoney(freeAid)}</b></strong>
              </div>
              <div className="award-section earned"><h3>EARNED AID <span>Paid only after you work approved hours</span></h3>
                <div><span>Federal work-study eligibility</span><label>$ <input type="number" value={workStudy} onChange={(e) => setWorkStudy(Number(e.target.value))} /></label></div>
                <small>Work-study normally does not reduce the bill today. It is earned through paychecks after working.</small>
              </div>
              <div className="award-section debt"><h3>LOAN OPTIONS <span>Borrowed money that must be repaid</span></h3>
                <div><span>Federal student loans</span><label>$ <input type="number" value={loans} onChange={(e) => setLoans(Number(e.target.value))} /></label></div>
                <small>Interest, fees, and future monthly payments may increase the total amount repaid.</small>
              </div>
              <div className="signature-line"><span>Review before accepting</span><b>Future You</b></div>
            </div>
            <aside className="decoder">
              <p className="eyebrow">YOUR TRUE-COST DECODER</p>
              <div><span>Published cost</span><b>{formatMoney(tuition)}</b></div>
              <div className="positive"><span>Minus free aid</span><b>− {formatMoney(freeAid)}</b></div>
              <div className="subtotal"><span>Amount left before loans</span><b>{formatMoney(billAfterFreeAid)}</b></div>
              <div className="negative"><span>Loan offered</span><b>{formatMoney(loans)}</b></div>
              <div className="total"><span>ESTIMATED GAP AFTER LOAN</span><strong>{formatMoney(remainingAfterLoans)}</strong></div>
              <p className="decoder-note">Work-study is not subtracted because it is generally earned later through paychecks. Housing, books, travel, deposits, and health insurance may also change the true cost.</p>
              <h3>What is your strongest next move?</h3>
              {[
                ["accept", "Accept everything immediately because the aid total looks high."],
                ["compare", "Compare net prices, confirm every charge, and ask the school for an aid review."],
                ["giveup", "Assume the gap means college is impossible."],
              ].map(([key, label]) => <button className={aidDecision === key ? "selected" : ""} onClick={() => setAidDecision(key)} key={key}>{label}</button>)}
              {aidDecision && <div className={`aid-feedback ${aidDecision === "compare" ? "correct" : ""}`}><b>{aidDecision === "compare" ? "Strong financial-aid thinking." : "Pause before making that move."}</b><p>{aidDecision === "compare" ? "You are separating price, free aid, earned aid, and debt—and creating room to advocate." : "An award total can hide debt or an unpaid gap. Verify the numbers and ask specific questions first."}</p></div>}
              <div className="questions"><b>QUESTIONS TO ASK THE FINANCIAL AID OFFICE</b><ul><li>Is this aid renewable, and what must I do to keep it?</li><li>Which charges are required and which can be reduced?</li><li>Has my full financial situation been considered?</li><li>Is there an appeal, completion grant, payment plan, or deadline extension?</li><li>What happens to this aid if I change enrollment or housing?</li></ul></div>
            </aside>
          </div>
        </section>
      )}

      {view === "simulation" && (
        <section className="simulation-page">
          <div className="sim-sidebar">
            <p className="eyebrow light">PERSISTENCE LAB</p><h2>Real college.<br/><em>Real choices.</em></h2>
            <div className="sim-progress">{challenges.map((_, i) => <i className={i < challengeIndex || (i === challengeIndex && challengeSolved) ? "complete" : i === challengeIndex ? "current" : ""} key={i} />)}</div>
            <p>Challenge {challengeIndex + 1} of {challenges.length}</p>
            <div className="lifelines"><b>YOUR CAMPUS LIFELINES</b><span>Academic advising</span><span>Financial aid office</span><span>Student accounts</span><span>EFF National Help Desk</span></div>
          </div>
          <div className="challenge">
            <p className="eyebrow">CAMPUS ALERT • DECISION REQUIRED</p>
            <span className="scenario-number">0{challengeIndex + 1}</span>
            <h1>{challenges[challengeIndex].title}</h1>
            <p className="challenge-copy">What you do next can affect your grade, money, enrollment, or wellbeing. Choose the response that keeps the most doors open.</p>
            <div className="response-card">
              <small>STRONGEST NEXT MOVE</small><h3>{challenges[challengeIndex].answer}</h3>
              <button onClick={() => setChallengeSolved(true)} disabled={challengeSolved}>{challengeSolved ? "CHOICE LOCKED ✓" : "CHOOSE THIS RESPONSE"}</button>
            </div>
            {challengeSolved && <div className="lesson"><span>✦</span><div><b>WHY THIS WORKS</b><p>{challenges[challengeIndex].why}</p><strong>EFF principle: document it, communicate early, ask specifically, and never disappear from the problem.</strong></div></div>}
            {challengeSolved && <button className="primary next-challenge" onClick={() => { if (challengeIndex === challenges.length - 1) navigate("certificate"); else { setChallengeIndex((i) => i + 1); setChallengeSolved(false); } }}>{challengeIndex === challenges.length - 1 ? "Complete the experience →" : "Next campus challenge →"}</button>}
          </div>
        </section>
      )}

      {view === "certificate" && (
        <section className="completion-page">
          <p className="eyebrow">EFF UNIVERSITY • EXPERIENCE COMPLETE</p>
          <h1>You practiced how to<br/><em>protect your future.</em></h1>
          <p>You explored academic pathways, learned where support lives, decoded college costs, and responded to real persistence challenges.</p>
          <div className="certificate">
            <span className="cert-crown">♛</span><small>ESTHER FUNDS FOUNDATION</small><h2>EFF University</h2><p>CERTIFICATE OF COLLEGE & CAREER READINESS</p><span>This recognizes</span><strong>Future Student</strong><p>for completing the EFF University orientation and real-life college persistence simulation</p><div><span>For such a time as this.</span><b>EVERY FUTURE FULFILLED.</b></div>
          </div>
          <div className="completion-actions"><button className="primary" onClick={() => window.print()}>Print certificate</button><button className="outline" onClick={() => navigate("majors")}>Keep exploring majors</button><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Get real student support ↗</a></div>
        </section>
      )}

      <footer>
        <div className="wordmark footer-mark"><span className="crest">EFF</span><span><b>EFF UNIVERSITY</b><small>Every Future Fulfilled.</small></span></div>
        <p>A free college-and-career readiness simulation from Esther Funds Foundation. EFF University is an educational experience and is not an accredited degree-granting institution.</p>
        <div><button onClick={() => navigate("majors")}>Academics</button><button onClick={() => navigate("orientation")}>Orientation</button><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Student Help</a></div>
        <small>© 2026 Esther Funds Foundation • For such a time as this.</small>
      </footer>
    </main>
  );
}
