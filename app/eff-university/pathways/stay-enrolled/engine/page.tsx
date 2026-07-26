import Disclaimer from "../../../Disclaimer";
import PathwayNav from "../../../PathwayNav";
import StayEnrolledEngine from "./StayEnrolledEngine";

export default function StayEnrolledEnginePage() {
  return <main className="pathway-shell">
    <PathwayNav />
    <header className="pathway-hero"><p className="eyebrow light">EFF STAY-ENROLLED ENGINE</p><h1>BUILD YOUR KEEP<br />YOUR SEAT PLAN.</h1><p>Practice a calm, documented response to a college barrier. You only need to choose a general scenario; do not enter sensitive personal, medical, financial, or legal information.</p></header>
    <section className="pathway-content"><StayEnrolledEngine /><Disclaimer /></section>
  </main>;
}
