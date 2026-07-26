import Disclaimer from "../Disclaimer";
import PathwayNav from "../PathwayNav";
import PassportClient from "./PassportClient";

export default function PassportPage() {
  return <main className="pathway-shell">
    <PathwayNav />
    <header className="pathway-hero"><p className="eyebrow light">PRIVATE • USER-CONTROLLED • PRINTABLE</p><h1>EFF CONTINUITY PASSPORT</h1><p>A place to organize pathways, skills practiced, simulations, action plans, checklists, interests, and approved EFF University completion items.</p></header>
    <section className="pathway-content">
      <PassportClient />
      <p className="pathway-disclaimer">The EFF Continuity Passport documents participation in EFF University educational simulations and navigation activities. It is not an academic transcript, diploma, degree, college credit, professional license, or official record from an accredited institution.</p>
      <Disclaimer />
    </section>
  </main>;
}
