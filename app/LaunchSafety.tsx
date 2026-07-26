"use client";

import { useEffect, useState } from "react";
import { FULL_SIMULATION_DISCLAIMER, SIMULATION_WATERMARK } from "../lib/launch-readiness";

export default function LaunchSafety({ children }: { children: React.ReactNode }) {
  const [helpOpen, setHelpOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    document.documentElement.dataset.effuRelease = "pilot";
  }, []);

  function readPage() {
    if (!("speechSynthesis" in window)) {
      setAnnouncement("Read-aloud is not available in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const text = document.querySelector("main")?.textContent?.replace(/\s+/g, " ").trim() || "";
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 12000));
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
    setAnnouncement("Reading the main page content aloud. Use the help button again to stop or restart.");
  }

  return <>
    <a className="skip-link" href="#effu-main-content">Skip to main content</a>
    <div className="simulation-identifier" role="note"><b>EDUCATIONAL SIMULATION</b><span>EFF University • Est. 2026 • Every Future Fulfilled.</span><a href="/policies#simulation">What this means</a></div>
    <div id="effu-main-content">{children}</div>
    <button className="global-help-button" aria-expanded={helpOpen} aria-controls="effu-help-panel" onClick={() => setHelpOpen((open) => !open)}>HELP & ACCESSIBILITY</button>
    {helpOpen && <aside id="effu-help-panel" className="global-help-panel" aria-label="Page help">
      <button className="help-close" aria-label="Close help" onClick={() => setHelpOpen(false)}>×</button>
      <small>HELP WITH THIS PAGE</small><h2>What would help right now?</h2>
      <a href="/first-day">Show Me What to Do First</a>
      <button onClick={readPage}>Read This Aloud</button>
      <a href="/first-day#visual">Show Me Visually</a>
      <a href="/resources">Define This Term</a>
      <a href="/first-day#example">Show Me an Example</a>
      <a href="/first-day#next">What Should I Do Next?</a>
      <a href="/support">Report a Problem</a>
      <a href="/support#content-report">Report Outdated or Confusing Information</a>
      <p>{FULL_SIMULATION_DISCLAIMER}</p>
    </aside>}
    <footer className="launch-safety-footer">
      <b>{SIMULATION_WATERMARK}</b>
      <span>One University. Many Starting Points.</span>
      <nav aria-label="Safety, privacy and support"><a href="/policies">Privacy & Data</a><a href="/accessibility">Accessibility</a><a href="/status">System Status</a><a href="/support">Support</a></nav>
    </footer>
    <div className="sr-only" aria-live="polite">{announcement}</div>
  </>;
}
