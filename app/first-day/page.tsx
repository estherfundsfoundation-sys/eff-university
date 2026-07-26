"use client";

import { useEffect, useState } from "react";

const steps = [
  ["1 MIN", "Welcome & boundaries", "Meet EFFU, learn what an educational simulation is, and choose Guest Practice or a saved account."],
  ["2 MIN", "Tour MyEFFU", "Locate Academics, Orientation, Financial Aid, Campus Life, Resources, the Student Portal, and Help."],
  ["2 MIN", "Choose a starting point", "Pick the pathway that matches where you are today. You can change direction later."],
  ["2 MIN", "Practice one college decision", "Try a major, schedule, aid, or stay-enrolled decision without real-world consequences."],
  ["2 MIN", "Build your support map", "Identify who owns a problem, what question to ask, what evidence to save, and when to follow up."],
  ["1 MIN", "Choose your next step", "Continue the full experience, take a mini-course, explore as a guest, or request separate EFF support with consent."],
];

export default function FirstDayPage() {
  const [current, setCurrent] = useState(0);
  const [guest, setGuest] = useState(false);
  useEffect(() => {
    const saved = Number(window.localStorage.getItem("effu-first-day-step") || 0);
    setCurrent(Math.min(Math.max(saved, 0), steps.length - 1));
  }, []);
  function select(index: number) {
    setCurrent(index); window.localStorage.setItem("effu-first-day-step", String(index));
  }
  return <main className="policy-page first-day-page">
    <header><p className="eyebrow light">YOUR FIRST DAY AT EFF UNIVERSITY</p><h1>Ten minutes.<br/><em>One clear beginning.</em></h1><p>One University. Many Starting Points.</p></header>
    <section className="first-day-controls"><button onClick={() => select(0)}>TOUR MyEFFU</button><button onClick={() => select(Math.min(current + 1, steps.length - 1))}>SHOW ME WHAT TO DO FIRST</button><button onClick={() => select(current)}>CONTINUE WHERE I LEFT OFF</button><button onClick={() => select(0)}>I AM NOT SURE WHERE TO BEGIN</button><button className={guest ? "active" : ""} onClick={() => setGuest((value) => !value)}>GUEST PRACTICE MODE: {guest ? "ON" : "OFF"}</button></section>
    <section id="visual" className="first-day-map">{steps.map(([time, title], index) => <button className={index === current ? "active" : index < current ? "complete" : ""} onClick={() => select(index)} key={title}><span>{index < current ? "✓" : index + 1}</span><b>{title}</b><small>{time}</small></button>)}</section>
    <section id="example" className="first-day-focus"><small>{steps[current][0]} • STEP {current + 1} OF {steps.length}</small><h2>{steps[current][1]}</h2><p>{steps[current][2]}</p><div><button disabled={current === 0} onClick={() => select(current - 1)}>BACK</button><button onClick={() => select(Math.min(current + 1, steps.length - 1))}>{current === steps.length - 1 ? "REVIEW MY FIRST DAY" : "NEXT STEP"}</button></div></section>
    <section id="next"><h2>What should I do next?</h2><div className="policy-actions"><a href="/eff-university/start">CHOOSE MY STARTING POINT</a><a href="/account">{guest ? "EXPLORE ACCOUNT OPTIONS" : "CREATE OR OPEN MY ACCOUNT"}</a><a href="/">ENTER THE COLLEGE EXPERIENCE</a><a href="/support">I NEED HELP CHOOSING</a></div></section>
    <p className="guest-note">{guest ? "Guest Practice Mode is on. Use the experience without creating an account. Device-only progress may still be stored until you clear it from Privacy & Data." : "Account mode is selected. Signed-in progress can follow the learner across supported devices."}</p>
  </main>;
}
