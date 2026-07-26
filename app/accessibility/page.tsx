import { CONTENT_REVIEW } from "../../lib/launch-readiness";

export default function AccessibilityPage() {
  return <main className="policy-page">
    <header><p className="eyebrow light">ACCESSIBILITY AT EFF UNIVERSITY</p><h1>Access is part of<br/><em>student success.</em></h1><p>EFFU is working toward WCAG 2.2 Level AA across the Version 1.0 pilot.</p></header>
    <section><h2>Accessibility Statement</h2><p>Our goal is for learners to use EFFU with a keyboard, screen reader, browser zoom, speech tools, reduced motion, high-contrast preferences, captions or transcripts, and text-first or low-bandwidth access. Essential learning should not depend on color, sound, animation, video, or fine pointer control alone.</p></section>
    <section><h2>Current Support</h2><ul><li>Skip link and semantic page regions</li><li>Keyboard-accessible links, forms, and controls</li><li>Visible focus styling and browser zoom support</li><li>Alternative text for meaningful images</li><li>Reduced-motion preference support</li><li>Text alternatives for critical instructions</li><li>Page read-aloud control using supported browser speech tools</li></ul></section>
    <section><h2>Known Pilot Limitations</h2><p>Automated checks cannot prove full WCAG conformance. Complex interactive simulations, generated downloads, canvas graphics, color contrast, focus order, reflow, screen-reader announcements, speech controls, and mobile keyboard behavior require manual testing by disabled users and accessibility professionals before public launch.</p></section>
    <section><h2>Report an Accessibility Barrier</h2><p>Tell us the page, task, device, browser, assistive technology if you choose to share it, what happened, and what format or alternative would help. Do not include medical records or diagnosis details.</p><a className="policy-link" href="/support#accessibility-report">REPORT AN ACCESSIBILITY ISSUE →</a></section>
    <footer><span>Last reviewed: {CONTENT_REVIEW.lastReviewed}</span><span>Status: Pilot review required</span><span>Next review: {CONTENT_REVIEW.nextReview}</span></footer>
  </main>;
}
