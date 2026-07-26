const marks = [
  ["PRIMARY WORDMARK", "primary", "EFF UNIVERSITY", "Every Future Fulfilled."],
  ["FORMAL SIMULATION SEAL", "seal", "EFFU", "EDUCATIONAL SIMULATION • EST. 2026"],
  ["HORIZONTAL LOGO", "horizontal", "EFF UNIVERSITY", "ONE UNIVERSITY. MANY STARTING POINTS."],
  ["EFFU MONOGRAM", "monogram", "EFFU", "EST. 2026"],
  ["ONE-COLOR MARK", "one-color", "EFFU", "EVERY FUTURE FULFILLED."],
  ["REVERSED MARK", "reversed", "EFFU", "EVERY FUTURE FULFILLED."],
  ["BLACK-AND-WHITE MARK", "black-white", "EFFU", "EDUCATIONAL SIMULATION"],
  ["SMALL-SIZE SIMPLIFIED MARK", "small-mark", "EU", "EST. 2026"],
];

export default function BrandPage() {
  return <main className="policy-page brand-page">
    <header><p className="eyebrow light">EFF UNIVERSITY BRAND SYSTEM</p><h1>Every Future<br/><em>Fulfilled.</em></h1><p>EFF University • Est. 2026 • One University. Many Starting Points.</p></header>
    <section>
      <h2>Version 1.0 Brand Variations</h2>
      <p>These pilot marks preserve the Esther Funds Foundation royal purple, lavender, warm cream, white, Dove-centered identity, university typography, official motto, establishment year, and campaign line.</p>
      <div className="official-logo-gallery">
        <figure className="official-wordmark"><img src="/effu-primary-dove-wordmark.png" alt="EFF University dove wordmark with the motto Every Future Fulfilled" /><figcaption>Primary Dove wordmark supplied by Esther Funds Foundation. Used in university navigation and official brand settings.</figcaption></figure>
        <figure className="official-wordmark"><img src="/effu-official-university-wordmark.jpg" alt="EFFU — Esther Funds Foundation University" /><figcaption>Horizontal EFFU wordmark supplied by Esther Funds Foundation.</figcaption></figure>
      </div>
      <aside className="brand-reference-note"><b>Seal reference received</b><p>The supplied seal artwork is retained as a brand reference but is not used on Version 1.0 documents because it reads “Est. 2024.” EFF University’s approved establishment line is “Est. 2026.”</p></aside>
      <div className="brand-grid">{marks.map(([label, style, title, subtitle]) => <article key={label}><small>{label}</small><div className={`brand-mark ${style}`}><img src="/eff-university-dove-crest.png" alt="" /><span><b>{title}</b><i>{subtitle}</i></span></div></article>)}</div>
    </section>
    <section><h2>Required Identity Language</h2><ul><li>Official motto: “Every Future Fulfilled.”</li><li>Campaign line: “One University. Many Starting Points.”</li><li>Establishment line: “EFF University • Est. 2026”</li><li>Every formal simulation artifact must include the educational-simulation identifier and non-official-document watermark.</li></ul></section>
  </main>;
}
