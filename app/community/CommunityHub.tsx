"use client";

import { useEffect, useState } from "react";

type Profile = { id: number; displayName: string; ageGroup: string; stage: string; campus: string; interests: string[]; bio: string; discoverable: boolean };
type Post = { id: number; topic: string; message: string; createdAt: string; authorName: string; authorStage: string };
type HubData = { user: { displayName: string }; profile: Profile | null; profiles: Profile[]; posts: Post[]; wavedProfileIds: number[] };

const interestOptions = ["HBCUs", "Community college", "Four-year college", "Certificates", "Apprenticeships", "STEM", "Health careers", "Business", "Arts & media", "Public service", "First-generation support", "Adult learning"];
const stages = ["Exploring college", "Middle or high school", "Applying now", "Accepted / deciding", "Current college student", "Adult or returning learner"];
const campuses = ["Exploring both campuses", "Legacy HBCU Experience", "Metropolitan University Experience", "Homeward Scholars Bridge"];
const topics = ["Introductions", "Choosing a major", "Applications", "Financial aid", "Campus life", "First-generation students", "Adult learners", "Staying enrolled"];

export default function CommunityHub({ accountName, signOutPath }: { accountName: string; signOutPath: string }) {
  const [data, setData] = useState<HubData | null>(null);
  const [notice, setNotice] = useState("");
  const [tab, setTab] = useState<"community" | "profile" | "graphic">("community");
  const [profile, setProfile] = useState({ displayName: accountName.split("@")[0], ageGroup: "", stage: "", campus: campuses[0], interests: [] as string[], bio: "", discoverable: false });
  const [post, setPost] = useState({ topic: topics[0], message: "" });
  const [photo, setPhoto] = useState("");

  async function load() {
    const response = await fetch("/api/community", { cache: "no-store" });
    if (!response.ok) return setNotice("We could not load the community right now.");
    const next = await response.json() as HubData;
    setData(next);
    if (next.profile) setProfile({ ...next.profile, interests: next.profile.interests });
  }
  useEffect(() => { void load(); }, []);

  async function action(payload: Record<string, unknown>) {
    setNotice("");
    const response = await fetch("/api/community", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    const result = await response.json() as { error?: string };
    if (!response.ok) { setNotice(result.error || "Please try again."); return false; }
    await load();
    return true;
  }

  function choosePhoto(file?: File) {
    if (!file || !file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) return setNotice("Choose a JPG, PNG, or WebP image smaller than 5 MB.");
    setPhoto(URL.createObjectURL(file)); setNotice("Photo ready. It stays on this device.");
  }

  async function downloadGraphic() {
    const canvas = document.createElement("canvas"); canvas.width = 1080; canvas.height = 1350;
    const context = canvas.getContext("2d"); if (!context) return;
    context.fillStyle = "#42127F"; context.fillRect(0, 0, 1080, 1350);
    context.fillStyle = "#260651"; context.fillRect(0, 0, 1080, 190);
    context.fillStyle = "#F5F0E6"; context.fillRect(70, 235, 940, 860);
    context.strokeStyle = "#B799E3"; context.lineWidth = 14; context.strokeRect(95, 260, 890, 810);
    context.textAlign = "center"; context.fillStyle = "#FFFFFF"; context.font = "700 56px Arial"; context.fillText("EFF UNIVERSITY", 540, 115);
    context.fillStyle = "#42127F"; context.font = "700 104px Arial"; context.fillText("I’M ACCEPTED!", 540, 410);
    if (photo) {
      const image = new Image(); image.src = photo;
      await new Promise<void>((resolve) => { image.onload = () => resolve(); image.onerror = () => resolve(); });
      context.save(); context.beginPath(); context.arc(540, 650, 165, 0, Math.PI * 2); context.clip(); context.drawImage(image, 375, 485, 330, 330); context.restore();
      context.strokeStyle = "#42127F"; context.lineWidth = 12; context.beginPath(); context.arc(540, 650, 171, 0, Math.PI * 2); context.stroke();
    } else {
      context.fillStyle = "#B799E3"; context.beginPath(); context.arc(540, 650, 165, 0, Math.PI * 2); context.fill();
      context.fillStyle = "#42127F"; context.font = "700 62px Arial"; context.fillText("EFFU", 540, 670);
    }
    context.fillStyle = "#42127F"; context.font = "700 56px Arial"; context.fillText((profile.displayName || "FUTURE STUDENT").toUpperCase().slice(0, 28), 540, 900);
    context.font = "700 31px Arial"; context.fillText((profile.stage || "COLLEGE EXPLORER").toUpperCase(), 540, 955);
    context.font = "italic 34px Georgia"; context.fillText("Every Future Fulfilled.", 540, 1025);
    context.fillStyle = "#FFFFFF"; context.font = "700 37px Arial"; context.fillText("@estherfundsfoundation", 540, 1245);
    const link = document.createElement("a"); link.download = "accepted-to-effu-instagram-4x5.png"; link.href = canvas.toDataURL("image/png"); link.click();
  }

  return <main className="community-page">
    <header className="community-header"><a href="/"><img src="/eff-university-dove-crest.png" alt="" /><span><b>EFF UNIVERSITY</b><small>STUDENT COMMUNITY</small></span></a><div><span>Welcome, {data?.profile?.displayName || accountName}</span><a href={signOutPath}>Sign out</a></div></header>
    <section className="community-welcome"><p className="eyebrow light">THE FUTURE FULFILLED NETWORK</p><h1>Meet people who are<br/><em>figuring it out, too.</em></h1><p>Build a college-interest profile, find students exploring similar pathways, share encouragement, ask questions, and learn together without posting personal contact information.</p><div className="community-safety"><b>COMMUNITY SAFETY</b><span>Accounts are for ages 13+. Learners under 13 can explore EFFU with a parent, guardian, school, or organization. Never post your email, phone number, address, school schedule, passwords, or private financial information.</span></div></section>
    <nav className="community-tabs"><button className={tab === "community" ? "active" : ""} onClick={() => setTab("community")}>COMMUNITY</button><button className={tab === "profile" ? "active" : ""} onClick={() => setTab("profile")}>MY PROFILE</button><button className={tab === "graphic" ? "active" : ""} onClick={() => setTab("graphic")}>SOCIAL GRAPHIC</button></nav>
    {notice && <div className="community-notice">{notice}</div>}
    {tab === "profile" && <section className="profile-editor"><div><p className="eyebrow">MY EFFU ACCOUNT</p><h2>Create your community profile</h2><p>Only the display name and details you choose below appear to other signed-in members. Your account email is never displayed.</p></div><form onSubmit={async (event) => { event.preventDefault(); if (await action({ type: "profile", ...profile })) { setNotice("Profile saved."); setTab("community"); } }}>
      <label>Display name<input required maxLength={40} value={profile.displayName} onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} /></label>
      <label>Age group<select required value={profile.ageGroup} onChange={(e) => setProfile({ ...profile, ageGroup: e.target.value })}><option value="">Select</option><option>13-15</option><option>16-17</option><option>18+</option></select></label>
      <label>Where are you now?<select required value={profile.stage} onChange={(e) => setProfile({ ...profile, stage: e.target.value })}><option value="">Select</option>{stages.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label>Campus interest<select value={profile.campus} onChange={(e) => setProfile({ ...profile, campus: e.target.value })}>{campuses.map((item) => <option key={item}>{item}</option>)}</select></label>
      <fieldset><legend>Choose up to five interests</legend><div>{interestOptions.map((item) => { const selected = profile.interests.includes(item); return <button type="button" className={selected ? "selected" : ""} disabled={!selected && profile.interests.length >= 5} onClick={() => setProfile({ ...profile, interests: selected ? profile.interests.filter((value) => value !== item) : [...profile.interests, item] })} key={item}>{selected ? "✓ " : "+ "}{item}</button>; })}</div></fieldset>
      <label className="full">Short introduction<textarea maxLength={180} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder="What are you hoping to learn or decide?" /></label>
      <label className="community-optin"><input type="checkbox" checked={profile.discoverable} onChange={(e) => setProfile({ ...profile, discoverable: e.target.checked })} /><span><b>Join the member directory</b>Allow signed-in EFFU members to discover my display name, stage, campus interests, interests, and introduction.</span></label>
      <button type="submit">SAVE MY EFFU PROFILE →</button>
    </form></section>}
    {tab === "community" && <section className="community-grid">
      <div className="community-feed"><div className="feed-heading"><div><p className="eyebrow">COMMUNITY COMMONS</p><h2>What students are talking about</h2></div>{data?.profile ? <button onClick={() => setTab("profile")}>EDIT PROFILE</button> : <button onClick={() => setTab("profile")}>CREATE PROFILE</button>}</div>
        {data?.profile && <form className="post-composer" onSubmit={async (event) => { event.preventDefault(); if (await action({ type: "post", ...post })) { setPost({ ...post, message: "" }); setNotice("Your post is live."); } }}><select value={post.topic} onChange={(e) => setPost({ ...post, topic: e.target.value })}>{topics.map((item) => <option key={item}>{item}</option>)}</select><textarea required minLength={10} maxLength={400} value={post.message} onChange={(e) => setPost({ ...post, message: e.target.value })} placeholder="Share a question, goal, lesson, or word of encouragement—without personal contact information." /><button>POST TO THE COMMONS</button></form>}
        <div className="community-posts">{data?.posts.length ? data.posts.map((item) => <article key={item.id}><header><span>{item.authorName.slice(0, 1).toUpperCase()}</span><div><b>{item.authorName}</b><small>{item.authorStage} • {item.topic}</small></div></header><p>{item.message}</p><button onClick={async () => { await action({ type: "report", postId: item.id }); setNotice("Thank you. The post was flagged for EFF review."); }}>REPORT FOR REVIEW</button></article>) : <div className="empty-community"><b>Be part of the first EFFU community conversation.</b><p>Create your profile and share what you are hoping to learn about college.</p></div>}</div>
      </div>
      <aside className="member-directory"><p className="eyebrow">MEET YOUR COMMUNITY</p><h2>College explorers</h2><div>{data?.profiles.length ? data.profiles.map((item) => <article key={item.id}><span>{item.displayName.slice(0, 1).toUpperCase()}</span><div><b>{item.displayName}</b><small>{item.stage}</small><p>{item.bio || item.campus}</p><div>{item.interests.slice(0, 3).map((interest) => <i key={interest}>{interest}</i>)}</div><button disabled={data.wavedProfileIds.includes(item.id) || data.profile?.id === item.id} onClick={async () => { await action({ type: "wave", targetProfileId: item.id }); setNotice(`You sent ${item.displayName} an EFFU wave.`); }}>{data.profile?.id === item.id ? "THIS IS YOU" : data.wavedProfileIds.includes(item.id) ? "WAVE SENT ✓" : "SEND AN EFFU WAVE"}</button></div></article>) : <p>Create a discoverable profile to help grow the directory.</p>}</div></aside>
    </section>}
    {tab === "graphic" && <section className="graphic-studio"><div><p className="eyebrow">INSTAGRAM 4:5 STUDIO</p><h2>Announce your EFFU acceptance.</h2><p>Add a photo, preview your name and student stage, then download a 1080 × 1350 graphic ready for Instagram. Your photo stays on this device and is not uploaded to EFFU.</p><label>Choose your photo<input type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => choosePhoto(e.target.files?.[0])} /></label><button onClick={downloadGraphic}>DOWNLOAD MY 4:5 GRAPHIC ↓</button></div><div className="graphic-preview"><small>EFF UNIVERSITY</small><h2>I’M<br/>ACCEPTED!</h2>{photo ? <img src={photo} alt="Your selected preview" /> : <span>EFFU</span>}<h3>{profile.displayName || "FUTURE STUDENT"}</h3><p>{profile.stage || "COLLEGE EXPLORER"}</p><b>@estherfundsfoundation</b></div></section>}
  </main>;
}
