const resourceGroups = [
  {
    title: "First-generation students",
    intro: "You belong in college spaces—even when your family has never had a roadmap. Start with language, people, and programs built to help.",
    resources: [
      ["Federal TRIO Programs", "Find federally supported programs serving first-generation and income-eligible students from middle school through college.", "https://www.ed.gov/about/ed-offices/ope/trio"],
      ["EFF Student Help Center", "Ask for help navigating applications, FAFSA, scholarships, balances, emergencies, or school advocacy.", "https://portal.estherfundsfoundation.org/"],
      ["College application checklist", "Use this guided planning hub to understand schools, applications, deadlines, and the steps between interest and enrollment.", "https://studentaid.gov/resources/prepare-for-college/checklists"],
    ],
  },
  {
    title: "Paying for college",
    intro: "Understand the full price, free aid, work-study, borrowing, remaining gap, and questions to ask before accepting an offer.",
    resources: [
      ["Complete the FAFSA", "Use the official federal site to apply for grants, work-study, and eligible federal student loans.", "https://studentaid.gov/h/apply-for-aid/fafsa"],
      ["Federal Student Aid Estimator", "Estimate possible federal aid before or while comparing college options.", "https://studentaid.gov/aid-estimator/"],
      ["Scholarship search strategy", "Learn where to look, how to organize deadlines, and how to avoid scholarship scams.", "https://studentaid.gov/articles/scholarship-tips/"],
      ["Compare financial-aid offers", "Review the College Financing Plan and learn how to compare real costs across schools.", "https://www.ed.gov/higher-education/paying-college"],
    ],
  },
  {
    title: "Choosing a college or pathway",
    intro: "A four-year university is one option—not the only successful path. Compare fit, cost, outcomes, support, and career connection.",
    resources: [
      ["College Scorecard", "Compare fields of study, costs, graduation information, debt, and earnings using federal data.", "https://collegescorecard.ed.gov/"],
      ["College Navigator", "Search accredited colleges and compare programs, admissions, tuition, aid, retention, and campus characteristics.", "https://nces.ed.gov/collegenavigator/"],
      ["Apprenticeship Finder", "Explore paid career-training opportunities that combine employment with structured learning.", "https://www.apprenticeship.gov/apprenticeship-job-finder"],
      ["CareerOneStop", "Explore careers, training, wages, skills, and local education options sponsored by the U.S. Department of Labor.", "https://www.careeronestop.org/"],
    ],
  },
  {
    title: "Staying enrolled and getting support",
    intro: "When something goes wrong, pause before withdrawing. Document the issue, identify the office that owns it, and ask for a specific next step.",
    resources: [
      ["Academic support plan", "Contact advising, tutoring, the writing center, accessibility services, and your instructor before missed work compounds.", "https://portal.estherfundsfoundation.org/"],
      ["Basic-needs and emergency support", "Ask your campus about food, housing, transportation, childcare, emergency grants, and completion assistance.", "https://portal.estherfundsfoundation.org/"],
      ["Student-loan guidance", "Use official federal information to understand borrowing, repayment, and who services a federal loan.", "https://studentaid.gov/manage-loans"],
      ["Disability access", "Learn about protections and campus accommodations for students with disabilities.", "https://www.ed.gov/laws-and-policy/civil-rights-laws/disability-discrimination"],
    ],
  },
  {
    title: "Families, schools, and organizations",
    intro: "Support students without taking away their voice. Help them build questions, track deadlines, compare costs, and follow up.",
    resources: [
      ["Federal Financial Aid Toolkit", "Counselors, mentors, nonprofits, and families can find FAFSA presentations, outreach materials, and training.", "https://financialaidtoolkit.ed.gov/tk/"],
      ["Education planning", "Use official planning resources for academic preparation, choosing a school, costs, and financial assistance.", "https://www.ed.gov/higher-education/paying-college/education-planning"],
      ["Partner with Esther Funds Foundation", "Connect learners to EFF advocacy, college-access support, scholarships, and the National Student Help Desk.", "https://www.estherfundsfoundation.org/"],
    ],
  },
];

const videoCenters = [
  ["Federal Student Aid video center", "Watch official explanations of the FAFSA, types of aid, student loans, and repayment.", "https://www.youtube.com/@FederalStudentAid"],
  ["U.S. Department of Education", "Explore federal education information, student stories, programs, and policy explainers.", "https://www.youtube.com/@usedgov"],
  ["EFF University learning library", "Return to EFFU mini-courses for financial aid, advocacy, college language, emergencies, and persistence.", "/"],
];

export default function ResourcesPage() {
  return <main className="resources-page">
    <header className="resource-header"><a href="/"><img src="/eff-university-dove-crest.png" alt="EFF University dove crest" /><span><b>EFF UNIVERSITY</b><small>COLLEGE RESOURCE CENTER</small></span></a><nav><a href="/">Campus Home</a><a href="/account">Student Login</a><a href="/tech-support">Tech Support</a><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Get EFF Help</a></nav></header>
    <section className="resource-hero"><p className="eyebrow light">YOUR COLLEGE-NAVIGATION LIBRARY</p><h1>You do not have to<br/><em>figure it out alone.</em></h1><p>Resources for first-generation students, future students, current college students, adult learners, families, schools, and organizations—organized around the next decision in front of you.</p><div><a href="#first-generation-students">START WITH FIRST-GEN SUPPORT</a><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">OPEN THE EFF STUDENT HELP CENTER ↗</a></div></section>
    <section className="resource-emergency"><b>WHEN A COLLEGE PROBLEM FEELS URGENT</b><p>Write down what happened, the next deadline, the amount or requirement involved, and the office that owns the decision. Contact that office in writing and ask for a specific review, extension, appeal, appointment, or support option. For EFF advocacy, use the Student Help Center.</p></section>
    <section className="resource-groups">{resourceGroups.map((group, groupIndex) => <article id={group.title.toLowerCase().replaceAll(" ", "-")} key={group.title}><div className="resource-group-heading"><span>0{groupIndex + 1}</span><div><p className="eyebrow">{group.title}</p><h2>{group.title}</h2><p>{group.intro}</p></div></div><div className="resource-card-grid">{group.resources.map(([title, copy, href]) => <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} key={title}><small>VERIFIED RESOURCE</small><h3>{title}</h3><p>{copy}</p><b>OPEN RESOURCE ↗</b></a>)}</div></article>)}</section>
    <section className="video-learning"><div><p className="eyebrow light">WATCH & LEARN</p><h2>College information<br/><em>in plain language.</em></h2><p>These links lead to official education channels and EFFU learning experiences. Video information can change, so confirm deadlines and requirements on the linked official website.</p></div><div>{videoCenters.map(([title, copy, href], index) => <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} key={title}><span>PLAY 0{index + 1}</span><h3>{title}</h3><p>{copy}</p><b>WATCH NOW ▶</b></a>)}</div></section>
    <section className="resource-cta"><img src="/eff-university-dove-crest.png" alt="" /><div><small>NEED A HUMAN NEXT STEP?</small><h2>EFF will help you build one.</h2><p>Students can request support through the Student Help Center, National Student Help Desk, scholarship resources, Emergency Grant/Name Your Need, FAFSA support, and school-balance advocacy.</p></div><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">REQUEST EFF SUPPORT ↗</a></section>
  </main>;
}
