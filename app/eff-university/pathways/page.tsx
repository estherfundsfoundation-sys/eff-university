import Disclaimer from "../Disclaimer";
import PathwayNav from "../PathwayNav";
import { pathways } from "../../../lib/eff-pathways";

export default function PathwaysPage() {
  return <main className="pathway-shell">
    <PathwayNav />
    <header className="pathway-hero"><p className="eyebrow light">EDUCATION CONTINUITY SIMULATOR</p><h1>ONE UNIVERSITY.<br />MANY STARTING POINTS.</h1><p>Discover, prepare, enter, persist, return, and complete. Explore every pathway freely—your recommendation is guidance, never a restriction.</p></header>
    <section className="pathway-content">
      <div className="pathway-actions"><a href="/eff-university/start">FIND YOUR STARTING POINT</a><a className="secondary" href="/eff-university/education-bridge">OPEN EDUCATION BRIDGE</a></div>
      <div className="pathway-grid pathway-section">{pathways.map((pathway) => <article className="pathway-card" key={pathway.slug}><small>{pathway.school}</small><h2>{pathway.name}</h2><p><b>For:</b> {pathway.audience}</p><p>{pathway.description}</p><a href={`/eff-university/pathways/${pathway.slug}`}>EXPLORE {pathway.name}</a></article>)}</div>
      <Disclaimer />
    </section>
  </main>;
}
