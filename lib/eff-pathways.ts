export const pathwayDisclaimer =
  "EFF University is a free educational simulation, training, and navigation platform presented by Esther Funds Foundation. EFF University is not an accredited college or university and does not award academic degrees, high-school diplomas, college credit, or professional licenses.";

export const continuityStages = [
  ["Start Where You Are", "Identify your current stage, goals, strengths, concerns, and immediate barriers."],
  ["Understand Your Options", "Explore education, career, credential, and support choices that may fit your life."],
  ["Practice the Decision", "Try a realistic, low-risk simulation before making a real-world decision."],
  ["Navigate the Challenge", "Practice responding to a setback with clear questions, documentation, and support."],
  ["Build Your Real Plan", "Leave with a checklist, timeline, scripts, questions, and trustworthy next steps."],
] as const;

export type PathwaySlug =
  | "future-scholars" | "college-launch" | "next-chapter" | "new-beginnings"
  | "stay-enrolled" | "comeback-college" | "family-navigator" | "community-navigator";

export type Pathway = {
  slug: PathwaySlug;
  name: string;
  school: string;
  audience: string;
  description: string;
  completion: string;
  modules: string[];
};

export const pathways: Pathway[] = [
  {
    slug: "future-scholars", name: "EFF Future Scholars Academy", school: "School of Future Readiness",
    audience: "Middle-school learners, approximately grades 6–8",
    description: "Explore strengths, careers, high school, and future possibilities without admissions pressure.",
    completion: "Future Scholar Passport",
    modules: ["Welcome to Future Scholars Academy", "What Comes After Middle School?", "High School Credits & Graduation", "My Interests & Strengths", "Careers, Majors & Skilled Pathways", "Study & Time-Management Habits", "How to Ask Adults for Help", "Saving, Spending & Education Costs", "Explore a Fictional Campus", "Clubs & Student Organizations", "Future Scholar Challenge", "Build My Future Scholar Plan"],
  },
  {
    slug: "college-launch", name: "EFF College Launch Academy", school: "School of Future Readiness",
    audience: "High-school learners, grades 9–12",
    description: "Explore every valid pathway and practice applications, aid, enrollment, and the transition after high school.",
    completion: "My College Launch Plan",
    modules: ["Welcome to College Launch", "Graduation Requirements", "College, Training, Apprenticeship & Career Options", "Education & Career Interest Profile", "Build a School or Program List", "Practice an Application", "Request Recommendations", "Build a Personal Statement", "Search for Scholarships", "Understand Financial Aid", "Compare Sample Aid Offers", "Understand the Full Cost", "Choose a Learning Format", "Create a First-Term Schedule", "Missing-Document Challenge", "Build My College Launch Plan"],
  },
  {
    slug: "next-chapter", name: "EFF Next Chapter School", school: "School of Adult Opportunity",
    audience: "Adults returning to high-school completion, equivalency, or foundational learning",
    description: "Begin again with dignity and build a verified route toward an unfinished educational goal.",
    completion: "My 90-Day Next Chapter Plan",
    modules: ["Welcome to Next Chapter School", "Understand My Starting Point", "Completion vs. Equivalency", "Find Legitimate Adult-Education Programs", "Recover Records & Documents", "Academic & Digital Readiness", "Forms & Institutional Communication", "Build a Learning Schedule", "Plan for Life Barriers", "Career & Credential Options", "Transition to the Next Step", "Document or Schedule Challenge", "Build My 90-Day Plan"],
  },
  {
    slug: "new-beginnings", name: "EFF New Beginnings College", school: "School of Adult Opportunity",
    audience: "Adults who completed high school but have not attended college",
    description: "Compare flexible education options and build an enrollment roadmap around work, family, money, and life.",
    completion: "My New Beginnings Enrollment Roadmap",
    modules: ["Welcome to New Beginnings", "Why I Want to Continue", "Compare Education Options", "Choose a Learning Format", "Schedule Around Work & Caregiving", "Childcare & Transportation", "Adult-Learner Budget", "Admissions & Enrollment", "Aid & Payment Responsibilities", "Technology Readiness", "Refresh Academic Skills", "Talk With College Offices", "Prior Learning & Experience", "First-Term Simulation", "Build My Enrollment Roadmap"],
  },
  {
    slug: "stay-enrolled", name: "EFF Stay Enrolled Program", school: "College of Continuity & Completion",
    audience: "Current college students facing a barrier that may interrupt enrollment",
    description: "Identify the right office, organize evidence, practice advocacy, and build a 24-, 48-, and 72-hour response.",
    completion: "My Keep Your Seat Plan",
    modules: ["What Is Putting My Enrollment at Risk?", "Identify the Correct Office", "Organize Deadlines & Evidence", "Communicate Clearly", "Escalation & Appeals", "Build a 24/48/72-Hour Plan", "Create My Keep Your Seat Plan"],
  },
  {
    slug: "comeback-college", name: "EFF Comeback College", school: "College of Continuity & Completion",
    audience: "Learners returning after stopping college before completion",
    description: "Review records, standing, credits, balances, aid, and programs to build a realistic route back.",
    completion: "My College Comeback Map",
    modules: ["Welcome to Comeback College", "Why I Left & What Changed", "Locate Former Transcripts", "Understand Academic Standing", "Review Transfer Credit", "Old Balances & Holds", "Aid Eligibility & SAP", "Prepare an Appeal", "Compare Re-Entry Options", "Choose a Program for Life Now", "Rebuild Study & Tech Skills", "Plan Around Responsibilities", "First 30/60/90 Days Back", "Re-Entry Challenge", "Build My Comeback Map"],
  },
  {
    slug: "family-navigator", name: "EFF Family Navigator Pathway", school: "Family & Community Navigator Institute",
    audience: "Parents, guardians, spouses, relatives, caregivers, and trusted supporters",
    description: "Learn how college offices work and support a learner without taking over their decisions.",
    completion: "My Family College-Support Plan",
    modules: ["How College Offices Work", "Meet the Major Offices", "Financial Aid vs. Student Accounts", "Enrollment Warning Signs", "Support Without Taking Over", "Talk About Difficult Topics", "Privacy & Permission Boundaries", "Move-In & First Semester", "When a Student Wants to Leave", "Family Emergency Plan", "Family Support Simulation", "Build My Support Plan"],
  },
  {
    slug: "community-navigator", name: "EFF Community Navigator Pathway", school: "Family & Community Navigator Institute",
    audience: "Librarians, shelter staff, faith leaders, mentors, counselors, social workers, and community helpers",
    description: "Help learners organize next steps, find official resources, protect privacy, and connect to appropriate support.",
    completion: "EFF Community Education Navigator Completion Plan",
    modules: ["The Community Navigator Role", "Listen Without Assumptions", "Identify a Starting Point", "Organize Questions & Documents", "Find Official Resources", "Support on Shared Computers", "Privacy Boundaries", "Know When to Refer", "Connect Learners to EFF", "Avoid False Promises", "Navigation Simulation", "Build a Community Navigation Plan"],
  },
];

export const startingPoints = [
  ["middle-school", "I am in middle school.", "future-scholars"],
  ["high-school", "I am in high school.", "college-launch"],
  ["left-high-school", "I left high school before graduating.", "next-chapter"],
  ["completed-high-school", "I completed high school but have not attended college.", "new-beginnings"],
  ["currently-enrolled", "I am currently enrolled in college.", "stay-enrolled"],
  ["stopped-college", "I started college but did not finish.", "comeback-college"],
  ["supporting-family", "I am supporting a student or family member.", "family-navigator"],
  ["community-helper", "I help learners through a school, library, shelter, church, or community organization.", "community-navigator"],
  ["not-sure", "I am not sure where to begin.", null],
] as const;

export const supportTracks = [
  "Housing instability", "Financial difficulty", "Childcare or caregiving", "Work schedule",
  "Transportation", "Disability or accessibility needs", "Neurodivergence or executive-function support",
  "Mental or emotional wellness", "Technology or internet access", "Missing documents",
  "Academic difficulty", "First-generation college navigation", "Foster-care or aging-out support",
  "Rural access", "Veteran or military-connected support", "Justice-impacted support",
  "English-language support", "A major health or family crisis", "I would rather not answer",
] as const;

export function recommendPathway(startingPoint: string): Pathway | null {
  const slug = startingPoints.find(([id]) => id === startingPoint)?.[2];
  return slug ? pathways.find((pathway) => pathway.slug === slug) ?? null : null;
}

export function getPathway(slug: string) {
  return pathways.find((pathway) => pathway.slug === slug);
}
