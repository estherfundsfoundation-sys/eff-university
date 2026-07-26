"use client";

import { useEffect, useMemo, useState } from "react";
import { FULL_SIMULATION_DISCLAIMER, SIMULATION_WATERMARK } from "../lib/launch-readiness";

type Major = {
  name: string;
  school: string;
  degree: string;
  courses: string[];
  career: string;
};

const coreMajors: Major[] = [
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

const additionalMajorNames = [
  "Actuarial Science", "Agribusiness", "Agricultural Science", "American Sign Language", "Animal Science",
  "Anthropology", "Applied Artificial Intelligence", "Astronomy", "Athletic Training", "Aviation Management",
  "Biomedical Engineering", "Broadcast Media", "Business Administration", "Clinical Laboratory Science", "Cloud Computing",
  "Communication Sciences & Disorders", "Community Development", "Digital Media Production", "Educational Leadership", "Energy Engineering",
  "Event Management", "Exercise Science", "Geographic Information Science", "Global Health", "Health Informatics",
  "Industrial Engineering", "Interior Design", "Marine Biology", "Medical Humanities", "Meteorology",
  "Nonprofit Leadership", "Physics", "Pre-Dentistry", "Pre-Medicine", "Real Estate",
  "Recreation & Tourism", "Robotics Engineering", "Sports Journalism", "Statistics", "Veterinary Science",
  "Web & Interactive Design",
];

const majors: Major[] = [
  ...coreMajors,
  ...additionalMajorNames.map((name, index) => ({
    name,
    school: index % 5 === 0 ? "Business & Entrepreneurship" : index % 5 === 1 ? "Science & Technology" : index % 5 === 2 ? "Health & Wellness" : index % 5 === 3 ? "Engineering & Computing" : "Media & Creative Arts",
    degree: index % 3 === 0 ? "B.A." : "B.S.",
    courses: [`${name} Foundations`, "Research & Professional Practice", "Applied Capstone Studio"],
    career: `Career and graduate pathways connected to ${name.toLowerCase()}`,
  })),
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
const alertBarDismissedKey = "effu-campus-alert-dismissed";
const popupDismissedKey = "effu-campus-popups-dismissed";

type View = "home" | "majors" | "courses" | "families" | "orientation" | "aid" | "simulation" | "campuslife" | "homeward" | "certificate";
type CampusKind = "legacy" | "metropolitan";

const universityAlerts: { department: string; title: string; detail: string; action: string; view: View }[] = [
  { department: "EFFU ATHLETICS", title: "First Doves Game This Friday", detail: "Kickoff is at 7:00 PM in Fulfilled Futures Stadium. Open Campus Life to claim your practice ticket and learn game-day traditions.", action: "GAME DAY", view: "campuslife" },
  { department: "OFFICE OF THE REGISTRAR", title: "Don’t Miss the Enrollment Period", detail: "Build your mock schedule, confirm your major, and complete EFFU enrollment before the preview term begins.", action: "ENROLL NOW", view: "campuslife" },
  { department: "NEW STUDENT ORIENTATION", title: "Your Orientation Checklist Is Ready", detail: "Learn campus language, meet your support team, practice emailing a professor, and prepare for real college emergencies.", action: "START ORIENTATION", view: "orientation" },
  { department: "OFFICE OF FINANCIAL AID", title: "Review Your Financial-Aid Award Packet", detail: "Decode grants, scholarships, work-study, loans, and the remaining balance before making a college decision.", action: "REVIEW AID", view: "aid" },
  { department: "HOUSING & RESIDENCE LIFE", title: "Residence Hall Check-In Is Open", detail: "Choose a hall, meet your resident assistant, review the move-in list, and download your practice housing assignment.", action: "CHECK IN", view: "campuslife" },
  { department: "STUDENT ACTIVITIES", title: "The Organization Fair Starts Today", detail: "Explore 100+ organizations, practice joining a club, and find students who share your interests and goals.", action: "EXPLORE CAMPUS", view: "campuslife" },
];

const campusWorlds = {
  legacy: {
    label: "Legacy HBCU Experience",
    short: "The Legacy Campus",
    description: "An HBCU-inspired campus experience rooted in history, Black excellence, culture, service, leadership, and multigenerational belonging.",
    welcome: "Welcome to Esther Legacy Campus",
    tradition: "Future Fulfilled Founders’ Walk",
    weeklyLife: [
      ["MONDAY", "Legacy Assembly", "Begin the week with campus news, history, student recognition, music, and a reminder that you carry generations forward."],
      ["TUESDAY", "Chapel, Reflection & Service", "Choose a faith gathering, reflection circle, or community-service hour. Participation respects every belief and background."],
      ["WEDNESDAY", "Crown Table Wednesday", "The dining hall’s Fried Chicken Wednesday becomes a weekly community table—with baked, grilled, vegetarian, halal-friendly, and allergy-aware choices—where students reconnect between classes."],
      ["THURSDAY", "The Yard Comes Alive", "Student leaders table, Greek-letter organizations share public service history, candidates speak, the band rehearses, and clubs recruit."],
      ["FRIDAY", "Future Market Friday", "Student entrepreneurs, campus departments, artists, organizations, food vendors, and resource partners fill Founders’ Walk to close the week together."],
    ],
    buildings: [
      ["Vincent Founders Hall", "Admissions, registrar, student accounts, and the Office of the President"],
      ["Esther Mae Academic Commons", "Library, tutoring, writing center, archives, and quiet study"],
      ["Crowned Futures Student Union", "Dining, student organizations, events, student government, and the campus pantry"],
      ["Possibility Hall", "Business, entrepreneurship, communications, and career development"],
      ["Heritage Science Center", "Health, nursing, computing, engineering, and laboratory learning"],
      ["Advocacy House", "Financial aid, accessibility, counseling referrals, basic-needs navigation, and EFF support"],
    ],
    halls: [
      ["Promise Hall", "Traditional double rooms • First-year community • Community bathrooms"],
      ["Legacy Oaks Hall", "Suite-style rooms • Living-learning communities • Study lounges"],
      ["Crown Village", "Apartment-style • Upper-division learners • Community kitchen"],
      ["Freedom House", "Year-round supportive housing • Flexible breaks • Case-navigation connection"],
    ],
    organizations: [
      "EFF Student Government Association", "Crowned Women of Purpose", "Men of Vision", "Legacy Marching Collective",
      "Future Black Nurses Association", "National Society of Black Engineers Preview", "Divine Nine History & Service Lab",
      "Black Student Union", "Faith & Fellowship Council", "Royal Court Leadership Program", "HBCU Debate Society",
      "Entrepreneurs of Esther", "Future Educators Guild", "NAACP College Chapter Preview", "Residence Hall Association",
      "First-Generation Scholars Network", "Caribbean Student Association", "African Students Collective", "Campus Activities Board",
      "Community Service Corps", "Student Media & Yearbook", "Pre-Law Society", "Public Health Advocates",
      ...majors.map((major) => `${major.name} Student Society`),
    ],
  },
  metropolitan: {
    label: "Contemporary University Experience",
    short: "The Metropolitan Campus",
    description: "A large-university experience built around research, innovation, commuter life, residential communities, global learning, and hundreds of ways to get involved.",
    welcome: "Welcome to Esther Metropolitan Campus",
    tradition: "Every Future Week of Welcome",
    weeklyLife: [
      ["MONDAY", "Research & Opportunity Day", "Meet faculty labs, career teams, and student researchers looking for new collaborators."],
      ["TUESDAY", "Organization Takeover", "Clubs and cultural organizations host demonstrations, interest meetings, and service sign-ups."],
      ["WEDNESDAY", "Wellbeing Wednesday", "Drop into recreation, peer coaching, financial wellness, food support, or a quiet reset between classes."],
      ["THURSDAY", "Late-Night Campus", "The student center stays active with tutoring, performances, intramurals, commuter events, and study groups."],
      ["FRIDAY", "Possibility Market", "Student founders, artists, campus services, and community partners gather for an end-of-week market."],
    ],
    buildings: [
      ["Future Gateway Center", "Admissions, orientation, international services, and enrollment coaching"],
      ["Fulfilled Learning Library", "Research help, technology lending, tutoring, writing, and study rooms"],
      ["Possibility Student Center", "Food court, events, clubs, student government, recreation, and wellbeing"],
      ["Innovation & Discovery Complex", "Engineering, computing, health research, maker space, and laboratories"],
      ["Community Impact Hall", "Education, social work, public policy, justice, and service learning"],
      ["Student Success Pavilion", "Advising, financial aid, accessibility, career services, and basic-needs support"],
    ],
    halls: [
      ["Gateway Hall", "First-year suites • Peer coaching • Shared study rooms"],
      ["Discovery Village", "Major-based living-learning communities • Faculty events"],
      ["Fulfilled Apartments", "Apartment-style • Returning and adult learners • Family-friendly options"],
      ["Commuter Commons", "Day lockers • Rest lounge • Kitchenette • Transit and carpool hub"],
    ],
    organizations: [
      "EFF Campus Activities Council", "Student Government Assembly", "Women in STEM Network", "Future Coders Collective",
      "Global Student Association", "Commuter Student Union", "Adult Learner Alliance", "First-Generation Scholars Network",
      "Entrepreneurship & Innovation Club", "Pre-Health Society", "Future Teachers Association", "Environmental Action Lab",
      "Student Veterans Network", "Faith & Belief Council", "Residence Hall Association", "Intramural Sports Council",
      "Creative Media Studio", "Public Service Fellows", "Accessibility Alliance", "Food Recovery Network",
      "Future Researchers Guild", "Mock Trial Society", "Marketing Association", "Community Garden Collective",
      ...majors.map((major) => `${major.name} Student Society`),
    ],
  },
} as const;

function CampusLifeSimulation({ onGraduate, onHelp }: { onGraduate: () => void; onHelp: () => void }) {
  const [campus, setCampus] = useState<CampusKind | null>(null);
  const [applicationCampus, setApplicationCampus] = useState<CampusKind | null>(null);
  const [accepted, setAccepted] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [educationStage, setEducationStage] = useState("");
  const [academicGoal, setAcademicGoal] = useState("");
  const [goalStatement, setGoalStatement] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [photo, setPhoto] = useState("");
  const [walletNote, setWalletNote] = useState(false);
  const [major, setMajor] = useState("");
  const [hall, setHall] = useState("");
  const [clubs, setClubs] = useState<string[]>([]);
  const [scheduleBuilt, setScheduleBuilt] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [semesterDone, setSemesterDone] = useState(false);
  const [campusCash, setCampusCash] = useState(3200);
  const [moneyRound, setMoneyRound] = useState(0);
  const [moneyLessons, setMoneyLessons] = useState<string[]>([]);
  const [completedAlerts, setCompletedAlerts] = useState<string[]>([]);
  const world = campus ? campusWorlds[campus] : null;
  const completion = [campus, major, hall, clubs.length > 0, scheduleBuilt, enrolled, semesterDone].filter(Boolean).length;

  function chooseCampus(kind: CampusKind) {
    setCampus(kind);
    if (!studentId) {
      const random = Math.floor(100000 + Math.random() * 900000);
      setStudentId(`EFFU-${kind === "legacy" ? "L" : "M"}-${random}`);
    }
  }

  function choosePhoto(file?: File) {
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) {
      window.alert("Please choose an image smaller than 5 MB.");
      return;
    }
    setPhoto(URL.createObjectURL(file));
  }

  function downloadBadge() {
    const canvas = document.createElement("canvas");
    canvas.width = 1100;
    canvas.height = 700;
    const context = canvas.getContext("2d");
    if (!context || !world) return;
    context.fillStyle = "#42127F";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#B799E3";
    context.fillRect(0, 0, 32, canvas.height);
    context.fillStyle = "#F5F0E6";
    context.font = "700 38px Arial";
    context.fillText("EFF UNIVERSITY", 70, 90);
    context.font = "24px Arial";
    context.fillText("EVERY FUTURE FULFILLED.", 70, 130);
    context.fillStyle = "#FFFFFF";
    context.font = "700 58px Arial";
    context.fillText((studentName || "FUTURE STUDENT").toUpperCase().slice(0, 28), 70, 290);
    context.font = "30px Arial";
    context.fillText(studentId, 70, 350);
    context.fillText(world.short, 70, 405);
    context.fillText(major || "College & Career Explorer", 70, 460);
    context.fillStyle = "#B799E3";
    context.font = "700 26px Arial";
    context.fillText("EFF UNIVERSITY • EVERY FUTURE FULFILLED", 70, 610);
    const link = document.createElement("a");
    link.download = `${studentId || "EFFU-student"}-digital-badge.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function emailAcceptance() {
    const subject = encodeURIComponent(`My EFF University acceptance letter — ${studentName || "Future Student"}`);
    const body = encodeURIComponent(`Congratulations, ${studentName || "Future Student"}!\n\nYou have been welcomed to ${world?.short || "EFF University"} in the ${major} pathway for the Fall Preview term.\n\nEFFU Student ID: ${studentId}\n\nYour next step is to accept your offer, complete enrollment and begin orientation.\n\nEvery Future Fulfilled.\nEsther Funds Foundation\n\nEFF University is an immersive college-and-career readiness experience and is not an accredited degree-granting institution.`);
    window.location.href = `mailto:${encodeURIComponent(studentEmail)}?subject=${subject}&body=${body}`;
  }

  async function downloadAcceptanceGraphic() {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const context = canvas.getContext("2d");
    if (!context || !world) return;
    context.fillStyle = "#42127F";
    context.fillRect(0, 0, 1080, 1350);
    context.fillStyle = "#2A075B";
    context.fillRect(0, 0, 1080, 165);
    context.fillStyle = "#B799E3";
    for (let x = 40; x < 1080; x += 80) context.fillRect(x, 1160, 12, 120);
    context.fillStyle = "#F5F0E6";
    context.fillRect(65, 210, 950, 845);
    context.strokeStyle = "#B799E3";
    context.lineWidth = 12;
    context.strokeRect(90, 235, 900, 795);
    context.textAlign = "center";
    context.fillStyle = "#FFFFFF";
    context.font = "700 48px Arial";
    context.fillText("EFF UNIVERSITY", 540, 105);
    context.fillStyle = "#42127F";
    context.font = "700 110px Arial";
    context.fillText("I'M ACCEPTED!", 540, 385);
    if (photo) {
      const image = new Image();
      image.src = photo;
      await new Promise<void>((resolve) => { image.onload = () => resolve(); image.onerror = () => resolve(); });
      context.save();
      context.beginPath();
      context.arc(540, 590, 150, 0, Math.PI * 2);
      context.clip();
      context.drawImage(image, 390, 440, 300, 300);
      context.restore();
      context.strokeStyle = "#42127F";
      context.lineWidth = 12;
      context.beginPath();
      context.arc(540, 590, 156, 0, Math.PI * 2);
      context.stroke();
    } else {
      context.fillStyle = "#B799E3";
      context.beginPath();
      context.arc(540, 590, 150, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#42127F";
      context.font = "700 55px Arial";
      context.fillText("EFFU", 540, 610);
    }
    context.fillStyle = "#42127F";
    context.font = "700 58px Arial";
    context.fillText((studentName || "FUTURE STUDENT").toUpperCase().slice(0, 28), 540, 825);
    context.font = "700 31px Arial";
    context.fillText(`${major.toUpperCase().slice(0, 40)} • ${world.short.toUpperCase()}`, 540, 885);
    context.font = "italic 34px Georgia";
    context.fillText("Every Future Fulfilled.", 540, 965);
    context.fillStyle = "#FFFFFF";
    context.font = "700 36px Arial";
    context.fillText("@estherfundsfoundation", 540, 1245);
    const link = document.createElement("a");
    link.download = `${studentName || "future-student"}-accepted-to-effu.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function downloadDormPass() {
    if (!world || !hall) return;
    const canvas = document.createElement("canvas"); canvas.width = 1200; canvas.height = 780;
    const context = canvas.getContext("2d"); if (!context) return;
    context.fillStyle = "#F5F0E6"; context.fillRect(0, 0, 1200, 780);
    context.fillStyle = "#260651"; context.fillRect(0, 0, 1200, 160);
    context.fillStyle = "#42127F"; context.fillRect(0, 160, 28, 620);
    context.fillStyle = "#FFFFFF"; context.font = "700 52px Arial"; context.fillText("EFF UNIVERSITY HOUSING", 65, 95);
    context.fillStyle = "#42127F"; context.font = "700 72px Arial"; context.fillText("MOVE-IN & CHECK-IN PASS", 65, 270);
    context.fillStyle = "#21182A"; context.font = "700 42px Arial"; context.fillText((studentName || "FUTURE STUDENT").toUpperCase(), 65, 365);
    context.font = "32px Arial"; context.fillText(`${hall} • Room 214`, 65, 430); context.fillText(`${world.short} • Fall Preview`, 65, 480);
    context.fillStyle = "#B799E3"; context.fillRect(65, 540, 1070, 120);
    context.fillStyle = "#260651"; context.font = "700 25px Arial"; context.fillText("CHECK-IN WINDOW: SATURDAY • 10:30–11:00 AM", 95, 590);
    context.font = "21px Arial"; context.fillText(`STUDENT ID: ${studentId}  •  BRING THIS PASS TO THE HOUSING DESK`, 95, 630);
    context.font = "700 19px Arial"; context.fillText("EVERY FUTURE FULFILLED. • @estherfundsfoundation", 65, 735);
    const link = document.createElement("a"); link.download = `${studentId}-dorm-check-in-pass.png`; link.href = canvas.toDataURL("image/png"); link.click();
  }

  if (!world) return (
    <section className="world-select">
      <div className="world-heading">
        <p className="eyebrow light">EFF UNIVERSITY UNDERGRADUATE ADMISSIONS</p>
        <h1>Your application<br/><em>starts here.</em></h1>
        <p>Tell us where you are in your education journey, choose your campus and intended major, and share the future you want to build.</p>
      </div>
      <div className="world-cards">
        {(Object.keys(campusWorlds) as CampusKind[]).map((key) => {
          const item = campusWorlds[key];
          return <article className={`${key} ${applicationCampus === key ? "chosen" : ""}`} key={key}>
            <small>{key === "legacy" ? "HBCU-INSPIRED CAMPUS" : "METROPOLITAN RESEARCH CAMPUS"}</small>
            {key === "legacy" && <img className="world-card-photo" src="/effu-marching-band-campus-life.png" loading="lazy" decoding="async" alt="EFF University Royal Sound marching band and dancers performing in royal purple and cream" />}
            <h2>{item.label}</h2><p>{item.description}</p>
            <div><span>Named campus buildings</span><span>Housing selection</span><span>Student organizations</span><span>Course registration</span><span>Graduation ceremony</span></div>
            <button onClick={() => setApplicationCampus(key)}>{applicationCampus === key ? "CAMPUS SELECTED ✓" : `Select ${item.short} →`}</button>
          </article>;
        })}
      </div>
      <form id="effu-application" className="university-application" onSubmit={(event) => { event.preventDefault(); if (applicationCampus && major && educationStage && academicGoal) chooseCampus(applicationCampus); }}>
        <div className="application-title"><span>EFFU</span><div><small>OFFICE OF UNDERGRADUATE ADMISSIONS</small><h2>Application for Admission</h2><p>Fall Preview Entry Term</p></div></div>
        <div className="application-note"><b>Your privacy matters.</b><p>Use a preferred display name. This experience does not need your legal name, birth date, address, Social Security number, password, financial records, transcripts, or identification documents.</p></div>
        <div className="application-coach">
          <b>YOUR APPLICATION COACH</b>
          <div><span>1</span><p><strong>Explore before choosing.</strong> Compare majors by classes, careers, cost, and more than one pathway.</p></div>
          <div><span>2</span><p><strong>Answer in your own voice.</strong> A clear, specific goal is stronger than trying to sound perfect.</p></div>
          <div><span>3</span><p><strong>Check each requirement.</strong> Real schools may also request a fee, transcript, essay, recommendations, or test information.</p></div>
          <div><span>4</span><p><strong>Save proof.</strong> Keep confirmation emails, deadlines, portal logins, and a copy of everything you submit.</p></div>
        </div>
        <div className="application-grid">
          <label>Preferred display name<input required value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="How should your acceptance letter greet you?" /></label>
          <label>Current education stage<select required value={educationStage} onChange={(e) => setEducationStage(e.target.value)}><option value="">Select your stage</option><option>Middle school explorer</option><option>High-school student</option><option>High-school graduate</option><option>Current college student</option><option>Adult or returning learner</option><option>High-school diploma or equivalency pathway</option></select></label>
          <label>Intended major<select required value={major} onChange={(e) => setMajor(e.target.value)}><option value="">Select a major</option>{majors.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
          <label>Primary education goal<select required value={academicGoal} onChange={(e) => setAcademicGoal(e.target.value)}><option value="">Select your goal</option><option>Explore college for the first time</option><option>Earn a four-year degree</option><option>Begin at community college and transfer</option><option>Compare college and career training</option><option>Return after stopping out</option><option>Prepare for graduate or professional school</option></select></label>
          <label className="full">What future are you working toward? <span>Optional</span><textarea maxLength={280} value={goalStatement} onChange={(e) => setGoalStatement(e.target.value)} placeholder="In a few sentences, tell EFF University what you hope education will make possible..." /></label>
          <label className="full photo-upload">Optional photo for your student ID and acceptance graphic<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => choosePhoto(e.target.files?.[0])} /><span>{photo ? "Photo selected ✓ — kept only on this device" : "Choose a photo (maximum 5 MB)"}</span></label>
        </div>
        <div className="application-review"><span className={applicationCampus ? "ready" : ""}>{applicationCampus ? "✓" : "1"} Campus selected</span><span className={studentName ? "ready" : ""}>{studentName ? "✓" : "2"} Student profile</span><span className={major ? "ready" : ""}>{major ? "✓" : "3"} Academic interest</span><span className={academicGoal ? "ready" : ""}>{academicGoal ? "✓" : "4"} Education goal</span></div>
        <button type="submit" disabled={!applicationCampus || !studentName || !major || !educationStage || !academicGoal}>SUBMIT MY EFF UNIVERSITY APPLICATION →</button>
        <p>Submitting creates your personalized EFFU admissions experience on this device. It does not send an application to another college.</p>
      </form>
      <button className="homeward-entry" onClick={onHelp}><span>♡</span><div><small>A SEPARATE PATHWAY WITH DIGNITY</small><b>Education Bridge for Learners Experiencing Homelessness</b><p>Start with safety, documents, a high-school diploma or equivalency pathway, then build toward college, training, and stable support.</p></div><i>ENTER PATHWAY →</i></button>
      <section className="military-connected-entry">
        <div><span>★</span><small>MILITARY-CONNECTED LEARNERS</small><h2>Your service and experience belong in the college conversation.</h2><p>Veterans, active-duty service members, reservists, National Guard members, and military-connected families bring valuable leadership, resilience, and perspective to learning communities. EFF University welcomes you to explore first-year, transfer, returning-student, certificate, and workforce pathways while practicing the transition into college life.</p></div>
        <nav aria-label="Military-connected education resources">
          <a href="https://www.va.gov/education/" target="_blank" rel="noreferrer"><b>VA Education Benefits</b><span>Explore official education and training benefits ↗</span></a>
          <a href="https://www.va.gov/education/gi-bill-comparison-tool/schools-and-employers" target="_blank" rel="noreferrer"><b>GI Bill® Comparison Tool</b><span>Compare VA-approved schools and programs ↗</span></a>
          <a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer"><b>EFF Student Help Center</b><span>Request college-navigation support and advocacy ↗</span></a>
        </nav>
        <p className="military-note">EFF University does not determine eligibility for military or veterans’ benefits. Confirm program approval, benefit amounts, and documentation directly with the U.S. Department of Veterans Affairs and the real institution’s School Certifying Official.</p>
      </section>
      <section className="university-resource-directory">
        <div><small>EFF UNIVERSITY RESOURCES</small><h2>Know where to go before you need help.</h2><p>Use this practice directory to learn the offices and tools students commonly rely on throughout college.</p></div>
        <nav aria-label="EFF University resource directory">
          <a href="/eff-university/pathways"><span>01</span><b>Academic Pathways</b><small>Majors, courses and career routes</small></a>
          <a href="#effu-application"><span>02</span><b>Admissions Office</b><small>Application and campus selection</small></a>
          <a href="/resources"><span>03</span><b>Student Resources</b><small>Guides, videos and downloadable tools</small></a>
          <a href="/account"><span>04</span><b>Student Portal</b><small>Account, progress and experience record</small></a>
          <a href="/tech-support"><span>05</span><b>Technology Department</b><small>Account and access support</small></a>
          <a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer"><span>06</span><b>Student Help Center</b><small>Real EFF support and advocacy ↗</small></a>
        </nav>
      </section>
    </section>
  );

  if (!accepted) return (
    <section className="acceptance-page">
      <div className="acceptance-celebration"><img src="/eff-university-dove-crest.png" alt="EFF University dove crest" /><p className="eyebrow light">EFF UNIVERSITY ADMISSIONS</p><h1>Your future has<br/><em>a place here.</em></h1><p>Application reviewed • Decision released • Fall Preview</p></div>
      <div className="acceptance-letter official-simulation-document">
        <b className="inline-document-watermark">{SIMULATION_WATERMARK}</b>
        <div className="acceptance-letterhead"><img src="/eff-university-dove-crest.png" alt="" /><div><b>EFF UNIVERSITY</b><span>OFFICE OF UNDERGRADUATE ADMISSIONS</span></div><small>Every Future Fulfilled.</small></div>
        <p>Dear {studentName || "Future Student"},</p>
        <h2>Congratulations!</h2>
        <p>It is our pleasure to offer you admission to <b>{world.short}</b> as an incoming student in the <b>{major}</b> pathway.</p>
        <p>Your application reflects a future worth investing in. Your goal to <b>{academicGoal.toLowerCase()}</b>{goalStatement ? `—and your vision to ${goalStatement.charAt(0).toLowerCase()}${goalStatement.slice(1)}` : ""} belongs in a community built to help you explore, prepare, advocate, persist, and finish.</p>
        <p>As an EFF University student, you will enter orientation, select housing, build your schedule, join student organizations, navigate real campus decisions, and walk across the commencement stage.</p>
        <div className="admission-details"><span><small>EFFU STUDENT ID</small><b>{studentId}</b></span><span><small>ENTERING CAMPUS</small><b>{world.short}</b></span><span><small>INTENDED MAJOR</small><b>{major}</b></span><span><small>ENTRY TERM</small><b>Fall Preview</b></span></div>
        <p>Welcome to EFF University. This is where possibility becomes preparation—and where every future deserves to be fulfilled.</p>
        <div className="admission-signature"><span><b>Office of Undergraduate Admissions</b><small>Esther Funds Foundation • EFF University</small></span><img src="/eff-university-dove-crest.png" alt="" /></div>
        <div className="acceptance-share">
          <h3>Make the moment yours.</h3>
          <p>Add your email to prepare a personalized acceptance message in your email app, or download a social post with your name, photo, major, and <b>@estherfundsfoundation</b>.</p>
          <div className="official-acceptance-template"><iframe src="https://www.canva.com/design/DAHQfuqzjI0/view?embed" title="Official EFF University acceptance graphic template" loading="lazy" /><span><b>YOUR OFFICIAL EFFU ACCEPTANCE GRAPHIC</b><small>Add your photo, name, and student stage in Canva, then download and share it with @estherfundsfoundation.</small></span></div>
          <label>Email address <input type="email" value={studentEmail} onChange={(event) => setStudentEmail(event.target.value)} placeholder="student@example.com" /></label>
          <div><button disabled={!studentEmail} onClick={emailAcceptance}>EMAIL MY LETTER</button><button onClick={downloadAcceptanceGraphic}>DOWNLOAD “I’M ACCEPTED” GRAPHIC</button><a href="https://canva.link/3tulwxjw3jszekl" target="_blank" rel="noreferrer">PERSONALIZE THE OFFICIAL CANVA TEMPLATE ↗</a></div>
          <small>Your email and photo stay on this device. “Email my letter” opens your email app with the message prepared for you to review and send.</small>
        </div>
        <div className="acceptance-actions"><button onClick={() => window.print()}>PRINT ACCEPTANCE LETTER</button><button onClick={() => setAccepted(true)}>ACCEPT MY OFFER & BEGIN ENROLLMENT →</button></div>
      </div>
      <p className="acceptance-disclaimer">{FULL_SIMULATION_DISCLAIMER}</p>
    </section>
  );

  const selectedMajor = majors.find((item) => item.name === major);
  return (
    <section className={`campus-world ${campus}`}>
      <div className="campus-world-hero">
        <button onClick={() => setCampus(null)}>← Change campus</button>
        <p className="eyebrow light">EFF UNIVERSITY • CAMPUS EXPERIENCE</p>
        <h1>{world.welcome}</h1>
        <p>{world.description}</p>
        <div className="campus-progress"><span>Campus journey</span><div><i style={{ width: `${Math.round(completion / 7 * 100)}%` }} /></div><b>{completion}/7</b></div>
      </div>

      <div className="enrollment-desk">
        <aside>
          <p className="eyebrow">MY EFFU STUDENT PORTAL</p>
          <div className="sim-id">{photo ? <img src={photo} alt="Student-selected profile preview" /> : <span>EFFU</span>}<b>{studentName || "FUTURE STUDENT"}</b><small>{studentId}</small><small>{world.short}</small></div>
          <nav>
            <span className={campus ? "done" : ""}>1. Choose campus</span><span className={enrolled ? "done" : ""}>2. Confirm enrollment</span>
            <span className={hall ? "done" : ""}>3. Select housing</span><span className={scheduleBuilt ? "done" : ""}>4. Build schedule</span>
            <span className={clubs.length ? "done" : ""}>5. Join organizations</span><span className={semesterDone ? "done" : ""}>6. Finish semester</span>
          </nav>
          <p className="privacy-note">Use a preferred display name. Never enter a Social Security number, password, bank information, or other sensitive data.</p>
        </aside>
        <div className="enrollment-flow">
          <section className="portal-notifications">
            <div className="notification-title"><div><span className="notification-bell">●</span><div><small>MY EFFU NOTIFICATIONS</small><h2>Good morning, {studentName || "Future Student"}.</h2></div></div><b>{6 - completedAlerts.length} NEW</b></div>
            <div className="notification-list">{[
              ["housing", hall ? "Your housing assignment is ready" : "Housing selection is waiting", hall ? `${hall}, Room 214 has been assigned. Download your check-in pass and choose your move-in window.` : "Choose a residence hall to unlock your room assignment and dorm check-in pass.", hall ? "DOWNLOAD DORM PASS" : "SELECT HOUSING"],
              ["checkin", "Complete online dorm check-in", "Confirm your emergency contact plan, review prohibited items, and arrive during your assigned move-in window.", "CHECK IN"],
              ["orientation", "New Student Orientation opens today", "Complete all five orientation stations before your first class and save your campus support contacts.", "OPEN ORIENTATION"],
              ["schedule", scheduleBuilt ? "Your Fall Preview schedule is confirmed" : "Registration reminder: build your schedule", scheduleBuilt ? "Four courses are now visible in your student portal." : "Select your major and save a first-semester schedule.", scheduleBuilt ? "VIEW SCHEDULE" : "REGISTER"],
              ["aid", "Financial-aid action required", "Review grants, scholarships, work-study, loans, and your remaining gap before accepting any borrowing.", "REVIEW AWARD"],
              ["gameday", "#1 Doves student tickets released", "Claim your student ticket for Saturday at Fulfilled Stadium and join The Flight student section.", "CLAIM TICKET"],
            ].map(([id, title, copy, action]) => {
              const done = completedAlerts.includes(id);
              return <article className={done ? "done" : ""} key={id}><span>{done ? "✓" : "!"}</span><div><b>{title}</b><p>{copy}</p></div><button onClick={() => { if (id === "housing" && !hall) { window.alert("Choose a residence hall in Housing & Residential Education first."); return; } if (id === "housing") downloadDormPass(); setCompletedAlerts((items) => items.includes(id) ? items : [...items, id]); }}>{done ? "COMPLETED" : action}</button></article>;
            })}</div>
          </section>
          <section className="portal-panel">
            <span className="panel-number">01</span><div className="panel-heading"><small>OFFICE OF ADMISSIONS</small><h2>Accept your admission</h2></div>
            <label>Preferred display name<input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Future Student" /></label>
            <label className="photo-upload">Optional student ID photo<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => choosePhoto(e.target.files?.[0])} /><span>{photo ? "Photo selected ✓" : "Choose a photo (device-only)"}</span></label>
            <label>Choose your major<select value={major} onChange={(e) => setMajor(e.target.value)}><option value="">Select a major</option>{majors.map((item) => <option key={item.name}>{item.name}</option>)}</select></label>
            {selectedMajor && <div className="major-confirm"><b>{selectedMajor.degree} pathway</b><span>{selectedMajor.courses.join(" • ")}</span></div>}
            <button disabled={!major} className={enrolled ? "complete-button" : ""} onClick={() => setEnrolled(true)}>{enrolled ? "ENROLLMENT CONFIRMED ✓" : "CONFIRM MY PLACE"}</button>
            <div className="digital-id official-simulation-document">
              <div className="digital-id-top"><span>EFF UNIVERSITY</span><b>STUDENT EXPERIENCE PASS</b></div>
              <div className="digital-id-person">{photo ? <img src={photo} alt="" /> : <span>YOU</span>}<div><small>EFFU STUDENT</small><h3>{studentName || "Future Student"}</h3><p>{studentId}</p></div></div>
              <div className="digital-id-fields"><span><small>CAMPUS</small>{world.short}</span><span><small>PROGRAM</small>{major || "Exploring"}</span><span><small>STATUS</small>{enrolled ? "Active preview" : "Guest"}</span></div>
              <footer><b>EVERY FUTURE FULFILLED.</b><span>{SIMULATION_WATERMARK}</span></footer>
            </div>
            <div className="badge-actions"><button onClick={downloadBadge}>DOWNLOAD MY DIGITAL BADGE</button><button className="apple-wallet" onClick={() => setWalletNote(true)}>＋ Add to Apple Wallet</button></div>
            {walletNote && <div className="wallet-message"><b>Your pass design is ready for connection.</b><p>A genuine Apple Wallet pass must be issued and cryptographically signed using Esther Funds Foundation’s Apple Developer Pass Type ID and certificate. Until that secure connection is added, download the badge to your phone—EFF University will not generate a fake or unsafe wallet pass.</p><button onClick={() => setWalletNote(false)}>Got it</button></div>}
          </section>

          <section className="portal-panel map-panel">
            <span className="panel-number">02</span><div className="panel-heading"><small>CAMPUS MAP</small><h2>Learn where support lives</h2></div>
            <div className="building-list">{world.buildings.map(([name, purpose], index) => <article key={name}><span>{String.fromCharCode(65 + index)}</span><div><b>{name}</b><p>{purpose}</p></div></article>)}</div>
            <div className="tradition-card"><small>CAMPUS TRADITION</small><b>{world.tradition}</b><p>A welcome tradition celebrating courage, community, and the future you are building.</p></div>
          </section>

          <section className="portal-panel campus-week-panel">
            <span className="panel-number">W</span><div className="panel-heading"><small>CAMPUS CULTURE & TRADITIONS</small><h2>A week in your campus life</h2><p>Traditions are where belonging becomes real. Your schedule includes academic work, community, culture, service, rest, and celebration.</p></div>
            <div className="campus-week">{world.weeklyLife.map(([day, title, description]) => <article key={day}><span>{day}</span><div><h3>{title}</h3><p>{description}</p></div><button onClick={(event) => event.currentTarget.classList.toggle("attending")}>＋ ADD TO MY WEEK</button></article>)}</div>
            {campus === "legacy" && <img className="campus-life-photo" src="/effu-students-legacy-yard.png" alt="College students enjoying an HBCU-inspired campus Yard and organization market" />}
            {campus === "legacy" && <div className="culture-note"><b>ABOUT THE HBCU-INSPIRED EXPERIENCE</b><p>EFF University honors the diversity of HBCU life. No single tradition represents every HBCU. This original campus week draws inspiration from documented traditions involving campus markets, the Yard, homecoming, Royal Court, marching bands, chapel, service, student entrepreneurship, and organization life.</p></div>}
          </section>

          <section className="portal-panel campus-traditions-gallery">
            <span className="panel-number">L</span><div className="panel-heading"><small>EFFU CAMPUS LIFE</small><h2>See yourself in the experience</h2><p>Picture the energy of game day, the sound of the band, and the moment you meet the people who help campus feel like home.</p></div>
            <div className="traditions-gallery-grid">
              <figure className="tradition-feature">
                <img src="/effu-football-dove-campus-life.png" loading="lazy" decoding="async" alt="EFF University students cheering at a football game with Valor the Dove mascot" />
                <figcaption><small>GAME DAY AT FULFILLED FUTURES STADIUM</small><h3>Fly with The Flight</h3><p>Practice claiming a student ticket, planning transportation, following stadium safety guidance, and participating in campus traditions with Valor the Dove.</p></figcaption>
              </figure>
              <figure>
                <img src="/effu-marching-band-campus-life.png" loading="lazy" decoding="async" alt="EFF University marching band and dancers performing in royal purple and cream" />
                <figcaption><small>THE ROYAL SOUND</small><h3>Music, movement and belonging</h3><p>Explore performance, leadership, production, athletic-band, dance, media, and event-support roles.</p></figcaption>
              </figure>
              <figure>
                <img src="/effu-service-organizations-campus-life.png" loading="lazy" decoding="async" alt="Diverse EFF University students meeting service-centered campus organizations at an outdoor fair" />
                <figcaption><small>ORGANIZATION & SERVICE FAIR</small><h3>Find your people and your purpose</h3><p>Meet fictional Greek-letter and service organizations created for this experience, sign a practice interest form, and learn how to evaluate belonging, service, time commitments, costs, and safety.</p></figcaption>
              </figure>
            </div>
            <p className="experience-disclaimer">EFF University is an educational college-readiness experience, not an accredited degree-granting institution. Campus scenes and organizations shown here are original learning-world representations; they do not depict or endorse a real college, fraternity, or sorority.</p>
          </section>

          <section className="portal-panel">
            <span className="panel-number">03</span><div className="panel-heading"><small>HOUSING & RESIDENTIAL EDUCATION</small><h2>Choose where you would live</h2></div>
            <div className="hall-grid">{world.halls.map(([name, details]) => <button className={hall === name ? "selected" : ""} onClick={() => setHall(name)} key={name}><span>{hall === name ? "✓" : "⌂"}</span><b>{name}</b><small>{details}</small></button>)}</div>
            {hall && <div className="room-assignment"><b>YOUR ROOM ASSIGNMENT</b><span>{hall} • Room 214 • Fall Preview</span><small>Roommate and move-in details will appear during orientation.</small></div>}
          </section>

          <section className="portal-panel">
            <span className="panel-number">04</span><div className="panel-heading"><small>REGISTRAR’S OFFICE</small><h2>Build your first semester</h2></div>
            {selectedMajor ? <div className="mock-schedule official-simulation-document">
              <b className="inline-document-watermark">{SIMULATION_WATERMARK}</b>
              {[
                ["MON / WED", "9:00 AM", selectedMajor.courses[0]], ["TUE / THU", "10:30 AM", selectedMajor.courses[1]],
                ["MON / WED", "1:00 PM", "College Writing & Advocacy"], ["FRIDAY", "11:00 AM", "University Success Seminar"],
              ].map(([days, time, course]) => <div key={course}><small>{days}</small><b>{time}</b><span>{course}</span><i>3 CR</i></div>)}
              <p>Estimated class time: 12 hours/week • Recommended study time: 24 hours/week</p>
            </div> : <p className="empty-prompt">Choose a major in Step 1 to generate your course schedule.</p>}
            <button disabled={!major} className={scheduleBuilt ? "complete-button" : ""} onClick={() => setScheduleBuilt(true)}>{scheduleBuilt ? "SCHEDULE SAVED ✓" : "ADD THESE COURSES"}</button>
          </section>

          <section className="portal-panel">
            <span className="panel-number">05</span><div className="panel-heading"><small>CENTER FOR STUDENT INVOLVEMENT</small><h2>Find your people</h2><p>Explore campus organizations and join up to three for your first semester.</p></div>
            <div className="club-grid">{world.organizations.map((club) => {
              const joined = clubs.includes(club);
              return <button className={joined ? "joined" : ""} disabled={!joined && clubs.length >= 3} onClick={() => setClubs((current) => joined ? current.filter((item) => item !== club) : [...current, club])} key={club}><span>{joined ? "✓" : "+"}</span>{club}<small>{joined ? "INTEREST FORM SIGNED" : "EXPLORE & JOIN"}</small></button>;
            })}</div>
            {clubs.length > 0 && <div className="org-confirm"><b>YOUR INVOLVEMENT PLAN</b>{clubs.map((club) => <span key={club}>{club}</span>)}</div>}
          </section>

          <section className="portal-panel athletics-panel">
            <span className="panel-number">A</span><div className="panel-heading"><small>EFF UNIVERSITY ATHLETICS</small><h2>Welcome to The Flight</h2><p>Cheer for the EFF Doves, meet Valor the Dove, and discover that college athletics includes far more than playing on the field.</p></div>
            <div className="athletics-scoreboard"><div><small>HOME OF THE</small><strong>EFF DOVES</strong><span>COURAGE • PURPOSE • POSSIBILITY</span></div><b>🕊</b></div>
            <div className="sports-grid">
              <article><span>FOOTBALL</span><h3>Fulfilled Stadium</h3><p>Saturday game day with The Flight student section, Royal Sound band, cheer, dance, student media, athletic training, and event operations.</p><button onClick={(event) => event.currentTarget.textContent = "GAME TICKET CLAIMED ✓"}>CLAIM STUDENT TICKET</button></article>
              <article><span>BASKETBALL</span><h3>Crown Arena</h3><p>Men’s and women’s Doves basketball, Midnight Flight kickoff, community games, pep band, statistics crew, and courtside student reporting.</p><button onClick={(event) => event.currentTarget.textContent = "GAME TICKET CLAIMED ✓"}>CLAIM STUDENT TICKET</button></article>
              <article><span>GET INVOLVED</span><h3>Careers behind the game</h3><p>Explore sports medicine, coaching, marketing, broadcasting, photography, data, facilities, compliance, nutrition, and sport management.</p><button onClick={(event) => event.currentTarget.textContent = "INTEREST FORM SIGNED ✓"}>JOIN ATHLETICS CREW</button></article>
            </div>
          </section>

          <section className="portal-panel money-game">
            <span className="panel-number">$</span><div className="panel-heading"><small>EFFU CAMPUS WALLET</small><h2>Can your money make it through the month?</h2><p>You begin with <b>$3,200 in practice money</b> for housing, food, books, transportation, and emergencies. Every choice teaches a strategy you can use in real life.</p></div>
            <div className="wallet-balance"><small>AVAILABLE PRACTICE BALANCE</small><strong>{formatMoney(campusCash)}</strong><span>{moneyRound}/4 decisions completed</span></div>
            {moneyRound < 4 ? <div className="money-scenario">
              {[
                { title: "Your required textbook costs $180.", choices: [["Buy it new today", -180, "You have the book, but you spent the full amount before comparing options."], ["Check rental, library reserve, used and open options", -35, "Strong move: compare access first, then spend only what protects your coursework."], ["Skip the book", 0, "Saving today could put your grade at risk. Contact the professor or library before going without."]] },
                { title: "Your car needs a $450 repair before work.", choices: [["Use emergency savings and ask about campus transit", -250, "You combined funds with a lower-cost transportation backup."], ["Use a high-cost payday loan", -650, "Fees can make a short emergency last much longer. Compare aid, transit, repair plans, and trusted support first."], ["Miss work without calling", 0, "The balance stays the same, but income and employment may be at risk. Communicate early."]] },
                { title: "Your meal plan runs out with eight days left.", choices: [["Use the pantry and ask basic-needs staff about meal support", -20, "You protected your budget and used a resource designed for this moment."], ["Put $140 of food on a credit card", -140, "You solved the immediate need, but borrowing can add interest. Ask about food resources too."], ["Stop eating regular meals", 0, "Your wellbeing and academic performance matter. Food support is a valid student resource."]] },
                { title: "A $780 balance blocks next-term registration.", choices: [["Request an itemized bill, aid review, hold review, and payment options", -200, "Advocacy created time and reduced the immediate payment while the balance is reviewed."], ["Pay the full amount without checking it", -780, "The hold may clear, but always confirm charges and available support before emptying your budget."], ["Ignore the notice", 0, "Registration problems grow when communication stops. Ask specific questions and keep records."]] },
              ][moneyRound].choices.map(([label, cost, lesson]) => <button key={label as string} onClick={() => { setCampusCash((value) => Math.max(0, value + Number(cost))); setMoneyLessons((items) => [...items, String(lesson)]); setMoneyRound((round) => round + 1); }}><b>{label}</b><span>{Number(cost) === 0 ? "$0 now" : formatMoney(Number(cost))}</span></button>)}
              <h3>{[
                "Your required textbook costs $180.",
                "Your car needs a $450 repair before work.",
                "Your meal plan runs out with eight days left.",
                "A $780 balance blocks next-term registration.",
              ][moneyRound]}</h3>
            </div> : <div className="money-finish"><b>MONTH COMPLETED</b><h3>You finished with {formatMoney(campusCash)}.</h3><p>The goal is not a perfect score. It is learning to pause, compare, communicate, document, and use support before one expense becomes a withdrawal decision.</p></div>}
            {moneyLessons.length > 0 && <div className="money-lesson"><b>YOUR LATEST MONEY COACH NOTE</b><p>{moneyLessons[moneyLessons.length - 1]}</p></div>}
          </section>

          <section className="portal-panel semester-panel">
            <span className="panel-number">06</span><div className="panel-heading"><small>FIRST SEMESTER CHECKPOINT</small><h2>Practice staying enrolled</h2></div>
            <div className="semester-events">
              <article><b>WEEK 3</b><h3>Your textbook costs $180.</h3><p>Compare library reserve, rental, used copies, open resources, and aid before putting it on a high-interest card.</p></article>
              <article><b>WEEK 8</b><h3>Your grade drops after a missed exam.</h3><p>Read the syllabus, contact the professor, document the reason, use tutoring, and ask what recovery options remain.</p></article>
              <article><b>WEEK 12</b><h3>A balance appears before registration.</h3><p>Request an itemized bill, speak with financial aid and student accounts, ask about appeals or completion support, and keep a written record.</p></article>
            </div>
            <button disabled={!enrolled || !hall || !scheduleBuilt || clubs.length === 0} className={semesterDone ? "complete-button" : ""} onClick={() => setSemesterDone(true)}>{semesterDone ? "SEMESTER COMPLETED ✓" : "COMPLETE MY PRACTICE SEMESTER"}</button>
          </section>

          <section className="portal-panel commencement-panel">
            <span className="panel-number">07</span><div className="panel-heading"><small>OFFICE OF COMMENCEMENT</small><h2>Your future graduation</h2></div>
            <div className="grad-stage"><span>EFFU</span><h3>{studentName || "Future Student"}</h3><p>{selectedMajor?.degree || "College & Career"} Readiness Pathway</p><b>CLASS OF YOUR FUTURE</b></div>
            <button disabled={!semesterDone} onClick={onGraduate}>ATTEND MY GRADUATION →</button>
          </section>
        </div>
      </div>
    </section>
  );
}

function HomewardPathway({ onCampus }: { onCampus: () => void }) {
  const [steps, setSteps] = useState<number[]>([]);
  const milestones = [
    ["Start with safety and connection", "Connect with a local coordinated-entry, shelter, outreach, school liaison, or trusted service provider. Education planning should never require giving up immediate safety, food, healthcare, or housing support.", ["Safe contact method", "Mailing-address plan", "Local service connection"]],
    ["Recover essential records", "Build a plan for identification, school transcripts, prior credits, and a reliable way to receive messages. Do not email sensitive identity documents to EFF.", ["ID replacement plan", "Transcript request", "Private document storage"]],
    ["Choose a secondary credential route", "Depending on age and state rules, compare re-enrollment in a public high school, an adult high-school diploma program, an accredited adult education program, or a state-recognized high-school equivalency option.", ["School-district homeless liaison", "State adult education office", "Diploma vs. equivalency comparison"]],
    ["Build literacy, digital, and career readiness", "Use adult education, library technology, workforce programs, and career-and-technical education to strengthen skills while moving toward a credential.", ["Digital access plan", "Career-interest map", "Workforce training search"]],
    ["Plan postsecondary entry", "Compare community college, HBCUs, four-year universities, certificates, apprenticeships, and workforce pathways by cost, support, schedule, and housing stability.", ["Major and pathway explorer", "True-cost worksheet", "Campus support checklist"]],
    ["Complete financial-aid steps", "The FAFSA asks about homelessness or risk of homelessness. Eligible unaccompanied students may receive an independent-status determination. A financial-aid office can explain the documentation process.", ["StudentAid.gov account plan", "FAFSA homelessness questions", "Financial-aid administrator conversation"]],
    ["Create a persistence and housing plan", "Before enrolling, identify break housing, food access, transportation, technology, emergency aid, academic support, and at least two people to contact when a problem appears.", ["Break-housing question list", "Emergency resource map", "Two-person support team"]],
  ];
  const percent = Math.round(steps.length / milestones.length * 100);
  return <section className="homeward-page">
    <div className="homeward-hero">
      <p className="eyebrow light">A SEPARATE EFF UNIVERSITY PATHWAY</p>
      <h1>Homeward Scholars<br/><em>Education Bridge</em></h1>
      <p>A dignity-centered pathway for learners experiencing homelessness or housing instability—beginning with safety and a secondary credential, then building toward college, training, employment, and long-term support.</p>
      <div className="dignity-note"><b>YOU ARE A STUDENT WITH A FUTURE—NOT A PROBLEM TO BE FIXED.</b><span>Build a plan with verified education, housing, benefits, and financial-aid professionals beside you.</span></div>
    </div>
    <div className="homeward-layout">
      <aside><p className="eyebrow">YOUR BRIDGE PLAN</p><strong>{percent}%</strong><div className="progress-track"><i style={{ width: `${percent}%` }} /></div><p>{steps.length} of {milestones.length} planning stations explored</p><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Connect with EFF Student Help ↗</a></aside>
      <div className="bridge-steps">
        {milestones.map(([title, copy, tools], index) => {
          const done = steps.includes(index);
          return <article className={done ? "done" : ""} key={title as string}><button onClick={() => setSteps((current) => done ? current.filter((item) => item !== index) : [...current, index])}><span>{done ? "✓" : String(index + 1).padStart(2, "0")}</span><div><small>BRIDGE STATION</small><h2>{title}</h2><p>{copy}</p></div><b>{done ? "EXPLORED" : "MARK EXPLORED"}</b></button><div>{(tools as string[]).map((tool) => <span key={tool}>□ {tool}</span>)}</div></article>;
        })}
        <section className="verified-resources">
          <p className="eyebrow light">VERIFIED STARTING POINTS</p><h2>Connect your plan to support.</h2>
          <div><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer"><b>EFF National Student Help Desk</b><span>Aid navigation, advocacy, scholarships, Emergency Grant/Name Your Need, FAFSA and school-balance support.</span></a>
          <a href="https://nche.ed.gov/" target="_blank" rel="noreferrer"><b>National Center for Homeless Education</b><span>School rights, local liaison information, and education resources for children and youth experiencing homelessness.</span></a>
          <a href="https://www.ed.gov/adult-programs" target="_blank" rel="noreferrer"><b>U.S. Department of Education Adult Programs</b><span>Adult education, literacy, state programs, career pathways, and high-school-equivalency information.</span></a>
          <a href="https://studentaid.gov/articles/fafsa-student-steps/" target="_blank" rel="noreferrer"><b>Federal Student Aid</b><span>Official FAFSA guidance, including homelessness, unusual circumstances, and dependency-status questions.</span></a></div>
        </section>
        <button className="campus-return" onClick={onCampus}>When you are ready, explore the EFF University campus →</button>
      </div>
    </div>
  </section>;
}

const miniCourses = [
  {
    code: "EFFU 101", title: "College Language & Campus Navigation", time: "20 minutes",
    lessons: [
      ["Syllabus", "The course agreement: dates, grading, attendance, assignments, office hours, and policies. Read it in week one and again before asking about an exception."],
      ["Credit hour", "A unit schools use to describe coursework. A 3-credit class often requires time in class plus significant work outside class; the exact structure varies."],
      ["Office hours", "Time a professor sets aside for questions. Arrive with the course, assignment, what you tried, and one clear question."],
    ],
    question: "A deadline is unclear. What should you check first?", options: ["The syllabus and course announcements", "A class rumor", "Wait until after the deadline"], correct: 0,
  },
  {
    code: "MONEY 110", title: "Read Your Financial-Aid Offer", time: "25 minutes",
    lessons: [
      ["Gift aid", "Grants and scholarships generally do not require repayment, but may have renewal, enrollment, or academic requirements."],
      ["Work-study", "An opportunity to earn wages through eligible work. It is not normally cash taken off your bill before you work."],
      ["Loans and the gap", "Loans must be repaid. Compare the school’s full cost with grants and scholarships before deciding whether the remaining gap is manageable."],
    ],
    question: "Which amount usually must be earned through a job?", options: ["Work-study", "A scholarship", "A grant"], correct: 0,
  },
  {
    code: "ADV 120", title: "Self-Advocacy & Professional Email", time: "20 minutes",
    lessons: [
      ["Useful subject line", "Name the course or issue and the action needed: “BIO 101 — request to review missing assignment.”"],
      ["Document the facts", "Briefly state what happened, include dates or receipts when appropriate, and avoid accusations."],
      ["Make a specific request", "Ask for the review, meeting, extension, explanation, or next step you need. Close with appreciation and your preferred contact method."],
    ],
    question: "What makes an advocacy email strongest?", options: ["Facts, documentation, and a clear request", "Writing in all caps", "Sending only “help”"], correct: 0,
  },
  {
    code: "PERSIST 130", title: "Emergency & Stay-Enrolled Planning", time: "25 minutes",
    lessons: [
      ["Immediate danger", "Prioritize physical safety and contact verified local emergency help. Campus staff and EFF can support education planning, but they do not replace emergency responders."],
      ["Academic or financial crisis", "Do not disappear. Contact the relevant office early, document the issue, ask about deadlines and appeal options, and keep written records."],
      ["Your support map", "Save contacts for advising, financial aid, student accounts, accessibility, basic needs, counseling, campus safety, and EFF’s National Student Help Desk."],
    ],
    question: "A balance may block registration. What is the best first move?", options: ["Request an itemized bill and support review", "Ignore the message", "Withdraw immediately"], correct: 0,
  },
];

function CourseCenter({ onApply }: { onApply: () => void }) {
  const [open, setOpen] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const completed = Object.entries(answers).filter(([index, answer]) => miniCourses[Number(index)].correct === answer).length;
  return <section className="course-center">
    <div className="page-banner course-banner"><p className="eyebrow light">EFF UNIVERSITY COURSE CENTER</p><h1>Take a real lesson.<br/><em>Practice a real skill.</em></h1><p>Short, interactive readiness courses teach the knowledge students are often expected to figure out alone.</p></div>
    <div className="course-progress"><div><small>MY LEARNING RECORD</small><strong>{completed}/{miniCourses.length}</strong><span>courses passed</span></div><p>Complete each lesson and answer its knowledge check. Your progress remains on this page during your visit.</p></div>
    <div className="course-list">{miniCourses.map((course, index) => <article className={open === index ? "open" : ""} key={course.code}>
      <button className="course-title" onClick={() => setOpen(index)}><span>{course.code}</span><div><h2>{course.title}</h2><small>{course.time} • 3 lessons • knowledge check</small></div><b>{answers[index] === course.correct ? "PASSED ✓" : open === index ? "−" : "+"}</b></button>
      {open === index && <div className="course-body">
        <div className="lesson-grid">{course.lessons.map(([title, copy], lesson) => <section key={title}><span>LESSON {lesson + 1}</span><h3>{title}</h3><p>{copy}</p></section>)}</div>
        <div className="knowledge-check"><small>KNOWLEDGE CHECK</small><h3>{course.question}</h3>{course.options.map((option, optionIndex) => <button className={answers[index] === optionIndex ? "chosen" : ""} onClick={() => setAnswers((current) => ({ ...current, [index]: optionIndex }))} key={option}>{option}</button>)}
          {answers[index] !== undefined && <p className={answers[index] === course.correct ? "correct" : ""}>{answers[index] === course.correct ? "Correct — you passed this course." : "Try again. Choose the response that protects the most options."}</p>}
        </div>
      </div>}
    </article>)}</div>
    <div className="course-next"><div><p className="eyebrow light">READY TO BECOME AN EFFU STUDENT?</p><h2>Apply, receive your decision, and enroll.</h2></div><button onClick={onApply}>APPLY NOW →</button></div>
  </section>;
}

function FamilyCenter({ onApply }: { onApply: () => void }) {
  return <section className="family-center">
    <div className="family-hero"><p className="eyebrow light">PARENT & FAMILY CENTER</p><h1>Your student needs<br/><em>a team, not pressure.</em></h1><p>Learn how to support exploration, compare real costs, prepare for emergencies, and help your student advocate without taking away their voice.</p><button onClick={onApply}>EXPLORE THE APPLICATION TOGETHER →</button></div>
    <div className="family-roadmap">{[
      ["BEFORE APPLYING", "Build a balanced list", "Compare academic fit, net price, graduation outcomes, support, distance, housing, and more than one pathway—not prestige alone.", ["Set a family budget before offers arrive", "Track each requirement and deadline", "Let the student lead their story"]],
      ["AFTER ACCEPTANCE", "Read the full offer", "Separate grants and scholarships from work-study and loans. Ask what renews, what can change, and what remains unpaid.", ["Compare net cost, not award totals", "Review housing and meal costs", "Ask about appeals and payment options"]],
      ["BEFORE MOVE-IN", "Make an emergency plan", "Agree on check-ins and save contacts for advising, aid, student accounts, safety, health, accessibility, food, housing, and transportation.", ["Choose two trusted campus contacts", "Plan transportation home", "Discuss documents and privacy"]],
      ["WHEN TROUBLE HITS", "Listen first, then build the next step", "Ask: What happened? What deadline is next? Which office owns this? What is documented? What specific outcome should we request?", ["Avoid shame and panic", "Do not impersonate the student", "Help draft questions and follow up"]],
    ].map(([phase, title, copy, tips], index) => <article key={phase as string}><span>0{index + 1}</span><small>{phase}</small><h2>{title}</h2><p>{copy}</p><ul>{(tips as string[]).map((tip) => <li key={tip}>{tip}</li>)}</ul></article>)}</div>
    <div className="family-conversation"><div><p className="eyebrow">TRY THESE QUESTIONS</p><h2>Questions that open doors</h2></div><div>{["What feels exciting—and what feels confusing?", "What will this school cost after grants and scholarships?", "Who will you contact before a problem becomes an emergency?", "How do you want me to help while keeping you in charge?", "What would make another pathway a better fit?"].map((question) => <blockquote key={question}>“{question}”</blockquote>)}</div></div>
    <div className="family-support"><h2>When your family needs another advocate</h2><p>EFF’s Student Help Center can help students navigate scholarships, FAFSA questions, emergency needs, school balances, and advocacy.</p><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">OPEN THE EFF STUDENT HELP CENTER ↗</a></div>
  </section>;
}

export default function Home() {
  const [view, setView] = useState<View>("home");
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
  const [alertIndex, setAlertIndex] = useState(0);
  const [alertBarVisible, setAlertBarVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupDismissed, setPopupDismissed] = useState(false);

  const schools = useMemo(() => ["All schools", ...Array.from(new Set(majors.map((major) => major.school))).sort()], []);
  const filtered = majors.filter((major) => {
    const matchQuery = `${major.name} ${major.school} ${major.career}`.toLowerCase().includes(query.toLowerCase());
    return matchQuery && (school === "All schools" || major.school === school);
  });
  const freeAid = grants + scholarships;
  const billAfterFreeAid = Math.max(0, tuition - freeAid);
  const remainingAfterLoans = Math.max(0, billAfterFreeAid - loans);
  const orientationPercent = Math.round((orientationDone.length / orientationSteps.length) * 100);

  useEffect(() => {
    setAlertBarVisible(window.localStorage.getItem(alertBarDismissedKey) !== "true");
    setPopupDismissed(window.localStorage.getItem(popupDismissedKey) === "true");
  }, []);

  useEffect(() => {
    if (popupDismissed) {
      setPopupVisible(false);
      return;
    }
    const firstPopup = window.setTimeout(() => setPopupVisible(true), 1800);
    let nextPopup: number | undefined;
    const rotateAlerts = window.setInterval(() => {
      setPopupVisible(false);
      nextPopup = window.setTimeout(() => {
        setAlertIndex((current) => (current + 1) % universityAlerts.length);
        setPopupVisible(true);
      }, 350);
    }, 9000);
    return () => {
      window.clearTimeout(firstPopup);
      if (nextPopup) window.clearTimeout(nextPopup);
      window.clearInterval(rotateAlerts);
    };
  }, [popupDismissed]);

  function dismissAlertBar() {
    window.localStorage.setItem(alertBarDismissedKey, "true");
    setAlertBarVisible(false);
  }

  function dismissPopups() {
    window.localStorage.setItem(popupDismissedKey, "true");
    setPopupDismissed(true);
    setPopupVisible(false);
  }

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
      {alertBarVisible && <section className="university-alert" aria-label="EFF University campus alert">
        <button className="alert-arrow" onClick={() => setAlertIndex((alertIndex - 1 + universityAlerts.length) % universityAlerts.length)} aria-label="Previous campus alert">‹</button>
        <span className="alert-label"><i /> CAMPUS UPDATE</span>
        <div className="alert-message">
          <small>{universityAlerts[alertIndex].department}</small>
          <b>{universityAlerts[alertIndex].title}</b>
          <p>{universityAlerts[alertIndex].detail}</p>
        </div>
        <button className="alert-action" onClick={() => navigate(universityAlerts[alertIndex].view)}>{universityAlerts[alertIndex].action} →</button>
        <button className="alert-arrow" onClick={() => setAlertIndex((alertIndex + 1) % universityAlerts.length)} aria-label="Next campus alert">›</button>
        <button className="alert-dismiss" onClick={dismissAlertBar} aria-label="Dismiss campus alert">×</button>
      </section>}
      <header className="university-header">
        <button className="wordmark" onClick={() => navigate("home")} aria-label="EFF University home">
          <img className="header-official-logo" src="/effu-primary-dove-wordmark.png" alt="EFF University — Every Future Fulfilled" />
        </button>
        <nav aria-label="University navigation">
          <button onClick={() => navigate("majors")}>Academics</button>
          <button onClick={() => navigate("courses")}>Take a Course</button>
          <button onClick={() => navigate("orientation")}>Orientation</button>
          <button onClick={() => navigate("aid")}>Financial Aid Lab</button>
          <button onClick={() => navigate("campuslife")}>Campus Life</button>
          <button onClick={() => navigate("families")}>Parents & Families</button>
          <button onClick={() => navigate("homeward")}>Education Bridge</button>
          <button onClick={goToOrganizations}>For Organizations</button>
          <a href="/resources">College Resources</a>
          <a href="/account">Student Login</a>
          <a href="/eff-university/start">Explore Pathways</a>
        </nav>
        <button className="portal-button" onClick={() => { window.location.href = "/account"; }}>APPLY NOW <span>→</span></button>
      </header>

      {popupVisible && <aside className="campus-popup" role="status" aria-live="polite">
        <button onClick={dismissPopups} aria-label="Dismiss notification">×</button>
        <div className="popup-icon">EFFU</div>
        <div>
          <small>NEW CAMPUS NOTIFICATION</small>
          <b>{universityAlerts[alertIndex].title}</b>
          <p>{universityAlerts[alertIndex].detail}</p>
          <button onClick={() => { setPopupVisible(false); navigate(universityAlerts[alertIndex].view); }}>{universityAlerts[alertIndex].action} →</button>
        </div>
      </aside>}

      {view === "home" && (
        <>
          <section className="hero">
            <div className="hero-copy">
              <p className="eyebrow">ESTHER FUNDS FOUNDATION PRESENTS</p>
              <h1>Welcome to<br/><em>EFF University.</em></h1>
              <p className="hero-kicker">YOUR #1 COLLEGE-NAVIGATION UNIVERSITY EXPERIENCE</p>
              <p className="hero-lede">Explore 100 academic majors and 100+ student organizations. Join a real student community. Follow the EFFU preseason-ranked #1 Doves. Apply, enroll, take courses, manage money, experience campus life, and learn how to navigate college before the decisions become real.</p>
              <div className="hero-actions">
                <button className="primary" onClick={() => { window.location.href = "/account"; }}>Apply to EFF University <span>↗</span></button>
                <button className="outline" onClick={() => navigate("courses")}>Take a real mini-course</button>
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
              <div className="mascot-intro"><small>MEET THE EFFU MASCOT</small><b>VALOR THE DOVE</b><span>COURAGE • PURPOSE • POSSIBILITY</span></div>
              <div className="tape">EVERY FUTURE FULFILLED.</div>
              <span className="doodle star">☆</span>
              <span className="doodle arrow">↗</span>
            </div>
          </section>

          <section className="university-facts">
            <div><strong>100</strong><span>MAJORS TO EXPLORE</span></div><div><strong>100+</strong><span>STUDENT ORGANIZATIONS</span></div><div><strong>#1</strong><span>EFFU DOVES FOOTBALL</span></div><div><strong>2</strong><span>IMMERSIVE CAMPUS EXPERIENCES</span></div><div><strong>1</strong><span>FUTURE WORTH FULFILLING: YOURS</span></div>
          </section>

          <section className="students-on-campus">
            <img src="/effu-students-campus-quad.png" alt="A diverse group of college students walking across the fictional EFF University campus" />
            <div><p className="eyebrow light">THIS IS WHAT POSSIBILITY LOOKS LIKE</p><h2>Find your people.<br/><em>Find your pathway.</em></h2><p>Campus is more than classrooms. It is the conversation on the way to class, the organization that helps you belong, the adviser who explains the next step, and the friend who reminds you not to give up.</p><a href="/community">MEET THE EFFU COMMUNITY →</a></div>
          </section>

          <section className="marquee">
            <span>CHOOSE A MAJOR</span><b>✦</b><span>BUILD A SCHEDULE</span><b>✦</b><span>DECODE YOUR AID</span><b>✦</b><span>SOLVE REAL PROBLEMS</span><b>✦</b><span>FIND YOUR SUPPORT</span>
          </section>

          <section className="home-scholarship">
            <div className="home-scholarship-badge"><span>EFF</span><b>★</b><small>SCHOLARSHIP<br/>OPPORTUNITY</small></div>
            <div><p className="eyebrow light">FINISH YOUR ACADEMY PATHWAY</p><h2>Complete the experience.<br/><em>Unlock your opportunity.</em></h2><p>Finish every required module in your EFFU pathway to become eligible to apply for the Esther Funds Foundation Every Future Fulfilled Scholarship—created for learners at different starting points, including middle-school learners, high-school students, prospective students, current and returning college students, and adult learners.</p><div className="home-scholarship-notes"><span>Completion unlocks the application</span><span>Guardian consent required for minors</span><span>Official rules and available funding apply</span></div><a href="/account">START MY EFFU PATHWAY →</a><small>Completing EFFU establishes eligibility to apply but does not guarantee selection, funding, a particular award amount, or payment. The scholarship is administered separately by Esther Funds Foundation.</small></div>
          </section>

          <section className="accepted-signature">
            <div className="accepted-poster">
              <img src="/eff-university-dove-crest.png" alt="EFF University dove crest" />
              <small>ESTHER FUNDS FOUNDATION PRESENTS</small>
              <h2>I’M<br/>ACCEPTED</h2>
              <span>TO EFFU</span>
              <p>@estherfundsfoundation</p>
            </div>
            <div className="accepted-story">
              <p className="eyebrow">THE SIGNATURE EFF UNIVERSITY JOURNEY</p>
              <h2>Getting accepted is the celebration.<br/><em>Knowing how to navigate college is the power.</em></h2>
              <p>EFFU walks learners through the decisions, language, systems, money conversations, and emergencies that shape whether a student gets to college—and whether they remain enrolled.</p>
              <div className="journey-timeline">
                {[
                  ["01", "APPLY", "Explore pathways, complete a guided university application, and learn what real colleges may request."],
                  ["02", "GET ACCEPTED", "Open a personalized decision letter, student ID, and downloadable 4:5 Instagram acceptance announcement."],
                  ["03", "ENROLL", "Accept your offer, confirm your major, enter the student portal, and complete orientation steps."],
                  ["04", "LEARN", "Take mini-courses in college language, financial aid, advocacy, emergencies, and persistence."],
                  ["05", "LIVE COLLEGE", "Choose housing, build a schedule, join organizations, attend traditions, athletics, and campus events."],
                  ["06", "HANDLE REAL LIFE", "Manage a practice budget, respond to academic and financial emergencies, and learn when to ask for help."],
                  ["07", "GRADUATE & STAY CONNECTED", "Celebrate with an EFFU credential and continue through EFF mentoring, advocacy, volunteering, and support."],
                ].map(([number, title, description]) => <article key={number}><span>{number}</span><div><b>{title}</b><p>{description}</p></div></article>)}
              </div>
              <div className="accepted-actions"><button className="primary" onClick={() => { window.location.href = "/account"; }}>START MY APPLICATION →</button><button className="outline" onClick={() => navigate("courses")}>PREVIEW A COURSE</button><a className="canva-template-link" href="https://canva.link/3tulwxjw3jszekl" target="_blank" rel="noreferrer">USE THE OFFICIAL ACCEPTANCE TEMPLATE ↗</a></div>
            </div>
          </section>

          <section className="front-community">
            <div className="community-campaign">
              <p className="eyebrow light">THE FUTURE FULFILLED NETWORK</p>
              <h2>You are not the only one<br/><em>still figuring college out.</em></h2>
              <p>Create a real EFFU account, build a college-interest profile, discover students exploring similar pathways, join community conversations, and send an EFFU Wave—without publicly sharing private contact information.</p>
              <div><span><b>01</b>Create your profile</span><span><b>02</b>Choose your interests</span><span><b>03</b>Meet college explorers</span><span><b>04</b>Learn together</span></div>
              <a href="/community">JOIN THE EFFU STUDENT COMMUNITY →</a>
              <small>Community accounts are for ages 13+. Learners under 13 can explore EFFU with a parent, guardian, school, or organization.</small>
            </div>
            <div className="community-card-stack">
              {[
                ["A", "Avery", "Exploring HBCUs • Nursing"],
                ["M", "Malik", "Applying now • Engineering"],
                ["J", "Jordan", "First-generation • Business"],
                ["T", "Taylor", "Adult learner • Social Work"],
              ].map(([initial, name, detail], index) => <article style={{ transform: `translate(${index * 9}px, ${index * -7}px) rotate(${index % 2 ? 2 : -2}deg)` }} key={name}><span>{initial}</span><div><b>{name}</b><p>{detail}</p><small>READY TO CONNECT • EFFU WAVE</small></div></article>)}
            </div>
          </section>

          <section className="athletics-front">
            <div><small>EFF UNIVERSITY ATHLETICS</small><h2>THE DOVES ARE<br/><em>RANKED #1.</em></h2><p>The EFFU Doves enter the Future Fulfilled season at #1—bringing football Saturdays, basketball nights, Valor the Dove, The Flight student section, Royal Sound band, cheer, dance, student media, and sports-career exploration to campus.</p><button onClick={() => navigate("campuslife")}>ENTER THE ATHLETICS EXPERIENCE →</button></div>
            <aside><span>EFFU</span><strong>#1</strong><b>DOVES FOOTBALL</b><small>FULFILLED STADIUM • THE FLIGHT</small></aside>
          </section>

          <section className="campus-map">
            <div className="section-intro">
              <p className="eyebrow">YOUR VIRTUAL CAMPUS</p>
              <h2>Walk through college<br/><em>before college walks over you.</em></h2>
              <p>EFF University is an immersive college-and-career learning experience where every building, decision, and milestone prepares you to enter higher education with confidence.</p>
            </div>
            <div className="campus-grid">
              {[
                ["01", "Academic Commons", "Search more than 50 majors and preview actual first-year courses.", "majors" as const, "Explore academics"],
                ["02", "Orientation Hall", "Complete a five-part student orientation with guides, checklists, and support resources.", "orientation" as const, "Start orientation"],
                ["03", "Financial Aid Office", "Open a simulated award packet and calculate the true amount you would owe.", "aid" as const, "Decode an offer"],
                ["04", "Campus Life Experience", "Choose an HBCU-inspired or contemporary university campus, select housing, register for classes, join organizations, and graduate.", "campuslife" as const, "Live the full experience"],
                ["05", "Persistence Lab", "Face realistic academic, financial, work, housing, and registration problems.", "simulation" as const, "Practice staying enrolled"],
                ["06", "Course Center", "Take interactive lessons in college language, financial aid, self-advocacy, and emergency planning.", "courses" as const, "Take a course"],
                ["07", "Parent & Family Center", "Help families compare cost, build support plans, and coach students through real decisions.", "families" as const, "Open family center"],
                ["08", "Homeward Scholars Bridge", "A separate dignity-centered education pathway for learners experiencing homelessness or housing instability.", "homeward" as const, "Build an education bridge"],
              ].map(([number, title, copy, destination, action]) => (
                <article className="campus-building" key={number}>
                  <span className="building-number">{number}</span>
                  <div className="building-icon">{number === "01" ? "LIBRARY" : number === "02" ? "HALL" : number === "03" ? "AID" : "LAB"}</div>
                  <h3>{title}</h3><p>{copy}</p>
                  <button onClick={() => navigate(destination as View)}>{action} <span>→</span></button>
                </article>
              ))}
            </div>
          </section>

          <section className="major-preview">
            <div>
              <p className="eyebrow light">ACADEMICS WITHOUT PRESSURE</p>
              <h2>Your major is a direction,<br/><em>not a life sentence.</em></h2>
              <p>Compare fields by what you will study, what the work can look like, and what other pathways may lead to the same goal.</p>
              <button className="cream-button" onClick={() => navigate("majors")}>Explore all 100 majors →</button>
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
            <img className="support-photo" src="/effu-students-success-center.png" alt="Students reviewing college resources with an adviser in the EFFU Student Success Center" />
            <div><span className="hand">♡</span><p className="eyebrow">WHEN CAMPUS CHALLENGES BECOME REAL</p><h2>You do not have to solve it alone.</h2></div>
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
            <p>Browse academic pathways and sample courses. Use this catalog to explore—not to limit what you can become.</p>
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

      {view === "courses" && <CourseCenter onApply={() => navigate("campuslife")} />}

      {view === "families" && <FamilyCenter onApply={() => navigate("campuslife")} />}

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
                <div><span>✦</span><h3>Ready for the money conversation?</h3><p>Open your award packet and discover what “financial aid” really means.</p></div>
                <button onClick={() => navigate("aid")}>Go to Financial Aid Lab →</button>
              </div>
            </div>
          </div>
        </section>
      )}

      {view === "aid" && (
        <section className="aid-page">
          <div className="page-banner aid-banner">
            <p className="eyebrow light">OFFICE OF FINANCIAL AID</p>
            <h1>Your award looks big.<br/><em>But what will college cost?</em></h1>
            <p>This practice packet teaches you to separate free money, money you earn later, and money you must repay.</p>
          </div>
          <div className="aid-workspace">
            <div className="award-letter official-simulation-document">
              <b className="inline-document-watermark">{SIMULATION_WATERMARK}</b>
              <div className="letterhead"><img className="letter-crest" src="/eff-university-dove-crest.png" alt="" /><div><b>EFF UNIVERSITY</b><small>Office of Student Financial Possibility</small></div><p>FINANCIAL AID<br/>AWARD YEAR</p></div>
              <div className="congratulations"><small>Dear Future Student,</small><h2>Congratulations!</h2><p>Your financial-aid award is ready for review. Read every category carefully so you understand free aid, earned aid, borrowing, and the remaining cost.</p></div>
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
              <p className="document-full-disclaimer">{FULL_SIMULATION_DISCLAIMER}</p>
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

      {view === "campuslife" && (
        <CampusLifeSimulation onGraduate={() => navigate("certificate")} onHelp={() => navigate("homeward")} />
      )}

      {view === "homeward" && (
        <HomewardPathway onCampus={() => navigate("campuslife")} />
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
          <h1>Welcome to your<br/><em>graduation.</em></h1>
          <p>You explored academic pathways, learned where support lives, decoded college costs, joined campus life, and practiced responding to real persistence challenges.</p>
          <div className="certificate official-simulation-document">
            <b className="inline-document-watermark">{SIMULATION_WATERMARK}</b>
            <img className="certificate-logo" src="/eff-university-dove-crest.png" alt="EFF University dove crest" /><small>ESTHER FUNDS FOUNDATION</small><h2>EFF University</h2><p>CERTIFICATE OF COLLEGE & CAREER READINESS PRACTICE</p><span>This recognizes</span><strong>Future Student</strong><p>for completing the EFF University campus, orientation, and college-persistence learning experience</p><div><span>Education simulation participation credential</span><b>EVERY FUTURE FULFILLED.</b></div>
          </div>
          <p className="legal-note">{FULL_SIMULATION_DISCLAIMER}</p>
          <div className="completion-actions"><button className="primary" onClick={() => window.print()}>Print certificate</button><button className="outline" onClick={() => navigate("majors")}>Keep exploring majors</button><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Get real student support ↗</a></div>
          <div className="alumni-network">
            <p className="eyebrow light">YOUR EFF JOURNEY CONTINUES</p><h2>Welcome to the Future Fulfilled Network.</h2><p>Graduation is not goodbye. Stay connected to Esther Funds Foundation as a learner, mentor, ambassador, volunteer, advocate, chapter leader, or story-sharer.</p>
            <div><a href="https://www.estherfundsfoundation.org/" target="_blank" rel="noreferrer">MENTOR OR VOLUNTEER</a><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">GET STUDENT SUPPORT</a><a href="https://www.estherfundsfoundation.org/" target="_blank" rel="noreferrer">BRING EFFU TO A COMMUNITY</a></div>
          </div>
        </section>
      )}

      <section className="take-with-you">
        <div className="toolkit-heading"><p className="eyebrow light">THE EFF UNIVERSITY RESOURCE LIBRARY</p><h2>Take the tools.<br/><em>Use them in real life.</em></h2><p>Download practical, printable guides for college applications, financial-aid decisions, emergencies, and family support. Then stay connected to the real Esther Funds Foundation for advocacy and resources.</p></div>
        <div className="toolkit-grid">
          {[
            ["APPLICATIONS", "College Application Roadmap", "Build a balanced list, track deadlines, protect submission proof, compare decisions, and complete enrollment.", "/downloads/effu-college-application-roadmap.pdf"],
            ["MONEY", "Financial Aid Offer Decoder", "Separate grants, scholarships, work-study, loans, and the remaining gap before choosing a college.", "/downloads/effu-financial-aid-decoder.pdf"],
            ["EMERGENCIES", "Stay-Enrolled Emergency Plan", "Create a campus support map and a written response plan for academic, financial, food, housing, and transportation disruptions.", "/downloads/effu-stay-enrolled-emergency-plan.pdf"],
            ["FOR FAMILIES", "Parent & Family Support Guide", "Listen first, plan roles, compare costs, coach advocacy, and help the student remain in charge.", "/downloads/effu-parent-family-college-support-guide.pdf"],
          ].map(([tag, title, copy, href], index) => <article key={title}><span>0{index + 1}</span><small>{tag}</small><h3>{title}</h3><p>{copy}</p><a href={href} download>DOWNLOAD PDF ↓</a></article>)}
        </div>
        <div className="real-eff-connection">
          <img src="/eff-university-dove-crest.png" alt="Esther Funds Foundation and EFF University dove crest" />
          <div><small>BEYOND THE EFF UNIVERSITY EXPERIENCE</small><h2>Connect with the real Esther Funds Foundation.</h2><p>Find programs, opportunities, student advocacy, scholarships, emergency support resources, and ways to bring EFF University into your school or organization.</p></div>
          <div><a href="https://www.estherfundsfoundation.org/" target="_blank" rel="noreferrer">VISIT ESTHER FUNDS FOUNDATION ↗</a><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">OPEN THE STUDENT HELP PORTAL ↗</a></div>
        </div>
      </section>

      <footer>
        <div className="wordmark footer-mark"><img className="footer-crest" src="/eff-university-dove-crest.png" alt="EFF University dove crest" /><span><b>EFF UNIVERSITY</b><small>Every Future Fulfilled.</small></span></div>
        <p>EFF University is an immersive college-and-career readiness experience from <a href="https://www.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Esther Funds Foundation</a>. It is not an accredited degree-granting institution; participation does not create admission, academic credit, financial aid, or enrollment at another institution.</p>
        <div><button onClick={() => navigate("majors")}>Academics</button><button onClick={() => navigate("orientation")}>Orientation</button><a href="/eff-university/start">Explore Pathways</a><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">Student Help</a></div>
        <small>© 2026 Esther Funds Foundation • For such a time as this.</small>
      </footer>
    </main>
  );
}
