export type StayEnrolledPlan = {
  title: string; urgency: string; meaning: string; office: string; documents: string[];
  questions: string[]; email: string; phone: string; now: string[]; hours24: string[];
  hours48: string[]; hours72: string[]; followUp: string[]; escalation: string[];
};

const scenarios = {
  "aid-not-posted": ["Financial aid has not posted", "High", "Financial Aid or Student Financial Services", "Your accepted aid may still be processing, missing a requirement, or waiting for another office."],
  "unexpected-balance": ["Unexpected account balance", "High", "Student Accounts, Bursar, Cashier, or Business Office", "A charge, aid change, fee, or timing issue may have created a balance that could affect registration."],
  "registration-hold": ["Enrollment or registration hold", "High", "Registrar or Student Accounts", "A hold can prevent registration, schedule changes, transcripts, or other services until the responsible office reviews it."],
  "housing-lost": ["Campus housing is unavailable or has been lost", "Urgent", "Housing & Residence Life and Basic Needs", "Housing loss can quickly affect safety, attendance, finances, and continued enrollment."],
  "academic-struggle": ["Academic difficulty or probation", "Medium", "Academic Advising or Student Success", "Your grades or academic standing may require quick planning, tutoring, or a formal success process."],
  "accessibility": ["Accessibility accommodations are needed", "Medium", "Accessibility, Disability, or Access Services", "A disability-related barrier may be addressed through the institution’s documented accommodation process."],
  "work-childcare": ["Work, childcare, or caregiving conflict", "High", "Academic Advising and the course instructor", "A life responsibility is interfering with attendance or required course activity and needs a documented plan."],
  "considering-withdrawal": ["Considering withdrawal", "Urgent", "Academic Advising and Financial Aid", "Withdrawal can affect progress, aid, balances, housing, and future eligibility, so consequences should be reviewed first."],
} as const;

export type StayScenario = keyof typeof scenarios;

export function buildStayEnrolledPlan(scenario: StayScenario, deadline = ""): StayEnrolledPlan {
  const [title, urgency, office, meaning] = scenarios[scenario];
  const deadlineLine = deadline ? `The deadline you identified is ${deadline}.` : "Ask the office to confirm every applicable deadline in writing.";
  return {
    title, urgency, office, meaning,
    documents: ["Student ID number (not a Social Security number)", "Relevant notices or screenshots", "Dates and names from earlier contacts", "A short timeline of what happened", "Any deadline or cancellation notice"],
    questions: ["What is the exact reason for this issue?", "What action can I take today?", "What is the deadline?", "Can my enrollment, classes, housing, or aid be protected while this is reviewed?", "Who should I contact next if it is not resolved?"],
    email: `Subject: Time-sensitive request regarding ${title.toLowerCase()}\n\nHello,\n\nI am requesting help understanding and resolving an issue involving ${title.toLowerCase()}. ${deadlineLine} Please confirm what is missing, what I should submit, and whether any temporary protection is available while the matter is reviewed.\n\nThank you for providing the next steps and deadline in writing.`,
    phone: `Hello, I am a student calling about ${title.toLowerCase()}. I want to stay enrolled and take the correct next step. Could you explain the issue, the deadline, and what I should document? May I have your name and a written confirmation after our call?`,
    now: ["Do not ignore the notice or make an irreversible decision yet.", "Save the notice and write down the known deadline.", `Contact ${office}; office names vary by institution.`],
    hours24: ["Send a concise written request.", "Gather the documents on the checklist.", "Record the date, time, person, and response for every contact."],
    hours48: ["Follow up if no response was received.", "Contact Academic Advising if classes or registration may be affected.", "Ask whether an emergency, appeal, extension, or temporary-hold process exists."],
    hours72: ["Request a supervisor or formal escalation route if the deadline is approaching.", "Confirm the final answer and any promised action in writing.", "Update your Keep Your Seat Plan with the next deadline."],
    followUp: ["Keep copies of submissions and confirmation numbers.", "Ask when the account or record will update.", "Check the official portal after the promised processing time."],
    escalation: ["Office supervisor or director", "Dean of Students or Student Success", "Ombuds or formal complaint/appeal process", "EFF National Student Help Desk with your consent"],
  };
}

export const stayScenarioOptions = Object.entries(scenarios).map(([value, [label]]) => ({ value: value as StayScenario, label }));
