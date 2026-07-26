"use client";

import { useMemo, useState } from "react";
import { SIMULATION_WATERMARK } from "../../lib/launch-readiness";

type Question = { prompt: string; options: string[]; correct: number; explanation: string };
const lessons: Array<{ facts: string[]; scenario: string; questions: Question[] }> = [
  { facts: [
    "Verify requirements, deadlines, costs, and policies with the responsible school or program office. Save the date you checked and the instructions you received.",
    "Turn a large goal into a next action: identify the office, write a specific question, gather only requested documents, and record the response.",
    "Never send passwords, Social Security numbers, full bank details, or verification codes through ordinary email or community posts.",
  ], scenario: "A deadline is approaching, but two websites show different dates. Decide what to verify and how to document the answer.", questions: [
    { prompt: "Which source should you verify first?", options: ["A social comment", "The responsible school or program office", "An old screenshot"], correct: 1, explanation: "The responsible office or its current official page is the strongest source." },
    { prompt: "What should you save after receiving an answer?", options: ["The date, contact, and instructions", "Nothing", "A password"], correct: 0, explanation: "A dated record helps you follow through and resolve conflicts." },
    { prompt: "Which item must remain private?", options: ["A general question", "A meeting time", "A password or verification code"], correct: 2, explanation: "Passwords and verification codes must never be shared." },
  ]},
  { facts: [
    "Compare pathways by total cost, time, learning format, support, and connection to your goal—not name recognition alone.",
    "Grants and scholarships differ from loans. Work-study is an opportunity to earn wages; it is not automatic cash credited to a bill.",
    "Calculate the remaining gap after grants and scholarships, and separate direct billed charges from estimated expenses.",
  ], scenario: "One aid offer is larger because it includes more loans. Another contains more grants. Compare what you would actually pay or borrow.", questions: [
    { prompt: "Which aid generally must be repaid?", options: ["Grant", "Scholarship", "Loan"], correct: 2, explanation: "Loans are borrowed money and generally must be repaid." },
    { prompt: "What does work-study usually provide?", options: ["Automatic cash", "Eligibility to earn wages through a job", "A tuition waiver"], correct: 1, explanation: "Work-study funds are generally earned through eligible employment." },
    { prompt: "What is the strongest comparison?", options: ["Net cost and borrowing after grants", "Largest headline award", "School colors"], correct: 0, explanation: "Net cost and borrowing reveal the more realistic financial commitment." },
  ]},
  { facts: [
    "When a barrier threatens enrollment, identify the exact hold, deadline, and office responsible. Financial Aid and Student Accounts may control different issues.",
    "Use a short advocacy message: state the situation and deadline, ask a specific question, and request written next steps.",
    "If the first contact cannot resolve it, respectfully ask who can review an exception, appeal, correction, emergency resource, or payment arrangement.",
  ], scenario: "Registration is blocked and the portal says only “account hold.” Identify the hold and the office that controls it before choosing a solution.", questions: [
    { prompt: "What should you identify first?", options: ["The exact hold and responsible office", "A random staff member", "A new major"], correct: 0, explanation: "The exact hold determines the correct office and possible solutions." },
    { prompt: "What makes an advocacy message useful?", options: ["A specific question and deadline", "All capital letters", "Sensitive passwords"], correct: 0, explanation: "Specific facts and a clear request help staff act." },
    { prompt: "If the first contact cannot help, what is appropriate?", options: ["Give up", "Ask for the next review or appeal path", "Post records online"], correct: 1, explanation: "A respectful escalation request preserves options." },
  ]},
  { facts: [
    "A realistic schedule includes class, study, work, travel, caregiving, meals, rest, and backup time.",
    "Check school email and the learning system regularly, begin work early, and contact instructors or support offices before a missed deadline becomes a pattern.",
    "For immediate danger, seek appropriate emergency help first. When safe, use the school’s official process to address academic logistics.",
  ], scenario: "Two required classes overlap with an unchangeable work shift. Compare sections, course sequencing, and alternative formats with an adviser.", questions: [
    { prompt: "What belongs in a realistic schedule?", options: ["Only classes", "Class, study, work, travel, care, and rest", "Only free time"], correct: 1, explanation: "A complete time budget exposes conflicts early." },
    { prompt: "When should you ask for academic help?", options: ["As early as possible", "After the term", "Never"], correct: 0, explanation: "Early communication usually preserves more options." },
    { prompt: "Who can help resolve a required-course conflict?", options: ["An adviser or program office", "No one", "A social-media poll"], correct: 0, explanation: "Advising can explain sections, sequence, and valid alternatives." },
  ]},
];

export default function CourseExperience({ module, moduleIndex, pathwayName, passed, onClose, onPass }: {
  module: string; moduleIndex: number; pathwayName: string; passed: boolean; onClose: () => void; onPass: (score: number) => Promise<void>;
}) {
  const lesson = useMemo(() => lessons[moduleIndex % lessons.length], [moduleIndex]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<{ score: number; passed: boolean } | null>(null);
  const [saving, setSaving] = useState(false);
  async function grade(event: React.FormEvent) {
    event.preventDefault();
    const score = lesson.questions.reduce((sum, question, index) => sum + (answers[index] === question.correct ? 1 : 0), 0);
    const didPass = score >= 2; setResult({ score, passed: didPass });
    if (didPass && !passed) { setSaving(true); await onPass(score); setSaving(false); }
  }
  return <div className="course-modal" role="dialog" aria-modal="true" aria-labelledby="course-title"><article className="course-workspace">
    <button className="course-close" onClick={onClose} aria-label="Close course">×</button>
    <header><small>{pathwayName} • COURSE {String(moduleIndex + 1).padStart(2, "0")}</small><h2 id="course-title">{module}</h2><p>Complete the lesson and earn at least 2 of 3 points to pass.</p></header>
    <section className="course-lesson"><h3>What you need to know</h3>{lesson.facts.map((fact) => <p key={fact}>{fact}</p>)}</section>
    <section className="course-scenario"><small>REAL-LIFE PRACTICE</small><h3>What would you do?</h3><p>{lesson.scenario}</p></section>
    <form onSubmit={grade}><h3>Graded knowledge check</h3>{lesson.questions.map((question, index) => <fieldset key={question.prompt}><legend><span>{index + 1}</span>{question.prompt}</legend>{question.options.map((option, optionIndex) => <label key={option}><input required type="radio" name={`q-${index}`} checked={answers[index] === optionIndex} onChange={() => setAnswers({ ...answers, [index]: optionIndex })} />{option}</label>)}{result && <p className={answers[index] === question.correct ? "answer-correct" : "answer-review"}>{answers[index] === question.correct ? "Correct. " : "Review: "}{question.explanation}</p>}</fieldset>)}<button disabled={saving}>{saving ? "SAVING RESULT…" : passed ? "RETAKE KNOWLEDGE CHECK" : "SUBMIT MY ANSWERS"}</button></form>
    {result && <div className={result.passed ? "course-result passed" : "course-result"}><b>{result.passed ? `PASSED — ${result.score}/3` : `${result.score}/3 — TRY AGAIN`}</b><p>{result.passed ? "This course is recorded as complete in your EFFU simulation record." : "Review the explanations, then try again."}</p>{result.passed && <button onClick={onClose}>CONTINUE MY PATHWAY →</button>}</div>}
    <footer>{SIMULATION_WATERMARK}</footer>
  </article></div>;
}
