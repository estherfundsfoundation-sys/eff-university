import { continuityStages } from "../../lib/eff-pathways";

export default function StageProgress() {
  return <section aria-labelledby="continuity-framework">
    <h2 id="continuity-framework">Your Five-Part Continuity Journey</h2>
    <div className="stage-list" role="list">
      {continuityStages.map(([name, copy], index) => <article role="listitem" key={name}><small>STAGE {index + 1}</small><b>{name}</b><p>{copy}</p></article>)}
    </div>
  </section>;
}
