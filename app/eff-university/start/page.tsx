"use client";

import { useState } from "react";
import Disclaimer from "../Disclaimer";
import PathwayNav from "../PathwayNav";
import { pathways, recommendPathway, startingPoints, supportTracks } from "../../../lib/eff-pathways";

export default function StartingPointPage() {
  const [startingPoint, setStartingPoint] = useState("");
  const [tracks, setTracks] = useState<string[]>([]);
  const [sharedDevice, setSharedDevice] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const recommendation = recommendPathway(startingPoint);

  function toggleTrack(track: string) {
    setTracks((current) => current.includes(track) ? current.filter((item) => item !== track) : [...current, track]);
  }

  function clearSession() {
    setStartingPoint(""); setTracks([]); setSharedDevice(false); setSubmitted(false);
    if (typeof window !== "undefined") window.sessionStorage.removeItem("effu-pathway-session");
  }

  return <main className="pathway-shell">
    <PathwayNav />
    <header className="pathway-hero">
      <p className="eyebrow light">FIND YOUR STARTING POINT</p>
      <h1>THERE IS NO WRONG<br />PLACE TO BEGIN.</h1>
      <p>EFF University is a free educational simulation and navigation platform for middle-school students, high-school students, adult learners, current college students, returning students, families, and communities. Whether you are dreaming about college, beginning again, trying to stay enrolled, or helping someone else move forward, your next step starts here.</p>
      <p className="pathway-campaign">One University. Many Starting Points. Every Future Fulfilled.</p>
    </header>
    <section className="pathway-content">
      <p className="privacy-note"><b>Your privacy matters.</b> The support question is optional. Answers stay in this session, are not placed in the web address, and are never shown on a public profile.</p>
      <form className="pathway-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <fieldset className="pathway-fieldset">
          <legend>Where are you starting?</legend>
          <div className="pathway-options">
            {startingPoints.map(([id, label]) => <label className="pathway-option" key={id}><input type="radio" name="starting-point" value={id} checked={startingPoint === id} onChange={() => { setStartingPoint(id); setSubmitted(false); }} /><span>{label}</span></label>)}
          </div>
        </fieldset>
        <fieldset className="pathway-fieldset">
          <legend>Is anything making education harder right now?</legend>
          <p id="support-description">Optional. Select as many as you want, or skip this question.</p>
          <div className="pathway-options" aria-describedby="support-description">
            {supportTracks.map((track) => <label className="pathway-option" key={track}><input type="checkbox" checked={tracks.includes(track)} onChange={() => toggleTrack(track)} /><span>{track}</span></label>)}
          </div>
        </fieldset>
        <label className="pathway-option"><input type="checkbox" checked={sharedDevice} onChange={(event) => setSharedDevice(event.target.checked)} /><span><b>Shared-device mode</b><br />Keep this exploration temporary and avoid persistent browser storage.</span></label>
        <div className="pathway-actions">
          <button type="submit" disabled={!startingPoint}>SHOW MY GUIDANCE</button>
          <a className="secondary" href="/eff-university/pathways">SKIP & VIEW ALL PATHWAYS</a>
          <button className="secondary" type="button" onClick={clearSession}>EXIT & CLEAR THIS SESSION</button>
        </div>
      </form>
      {submitted && <section className="recommendation" aria-live="polite" aria-labelledby="recommendation-title">
        {recommendation ? <>
          <small>BASED ON WHAT YOU SHARED, THIS MAY BE A HELPFUL PLACE TO BEGIN.</small>
          <h2 id="recommendation-title">{recommendation.name}</h2>
          <p>{recommendation.description}</p>
          <div className="pathway-actions"><a href={`/eff-university/pathways/${recommendation.slug}`}>EXPLORE THIS PATHWAY</a><a className="secondary" href="/eff-university/pathways">CHOOSE A DIFFERENT PATHWAY</a></div>
        </> : <>
          <h2 id="recommendation-title">Let’s explore your options together.</h2>
          <p>You do not have to choose a category. Review every pathway and begin with the one that feels useful now.</p>
          <div className="pathway-grid">{pathways.map((pathway) => <article className="pathway-card" key={pathway.slug}><small>{pathway.school}</small><h2>{pathway.name}</h2><p>{pathway.description}</p><a href={`/eff-university/pathways/${pathway.slug}`}>EXPLORE</a></article>)}</div>
        </>}
      </section>}
      <Disclaimer />
    </section>
  </main>;
}
