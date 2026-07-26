import { notFound } from "next/navigation";
import Disclaimer from "../../Disclaimer";
import PathwayNav from "../../PathwayNav";
import StageProgress from "../../StageProgress";
import { getPathway, pathways } from "../../../../lib/eff-pathways";

export function generateStaticParams() {
  return pathways.map(({ slug }) => ({ slug }));
}

export default async function PathwayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pathway = getPathway(slug);
  if (!pathway) notFound();

  return <main className="pathway-shell">
    <PathwayNav />
    <header className="pathway-hero"><p className="eyebrow light">{pathway.school}</p><h1>{pathway.name}</h1><p>{pathway.description}</p><p><b>Designed for:</b> {pathway.audience}</p></header>
    <section className="pathway-content">
      <span className="simulation-label">EDUCATIONAL SIMULATION — NOT AN OFFICIAL COLLEGE PROGRAM</span>
      <StageProgress />
      <section className="pathway-section" aria-labelledby="modules"><h2 id="modules">Your Learning Modules</h2><ol className="module-list">{pathway.modules.map((module) => <li key={module}>{module}</li>)}</ol></section>
      {pathway.slug === "stay-enrolled" && <section className="recommendation"><small>INTERACTIVE TOOL</small><h2>Build a Keep Your Seat Plan</h2><p>Practice responding to a financial, academic, housing, accessibility, work, or caregiving challenge with a clear 24-, 48-, and 72-hour plan.</p><div className="pathway-actions"><a href="/eff-university/pathways/stay-enrolled/engine">OPEN THE STAY-ENROLLED ENGINE</a></div></section>}
      <section className="pathway-section"><h2>Your Completion Product</h2><p><b>{pathway.completion}</b> — a private, printable record of your EFF University participation and practical next steps. It is not academic credit or an official institutional record.</p></section>
      <a className="bridge-link" href="/eff-university/education-bridge">Need a lower-bandwidth or shared-device experience? Open Education Bridge.</a>
      <div className="pathway-actions pathway-section"><a href="/account">APPLY & CREATE MY EFFU ACCOUNT</a><a className="secondary" href="/eff-university/passport">VIEW MY CONTINUITY PASSPORT</a><a className="secondary" href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">CONNECT WITH EFF STUDENT HELP</a></div>
      <Disclaimer />
    </section>
  </main>;
}
