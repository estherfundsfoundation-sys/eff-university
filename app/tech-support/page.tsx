export default function TechSupportPage() {
  return <main className="tech-page">
    <header className="account-campus-header"><a href="/"><img src="/eff-university-dove-crest.png" alt="" /><span><b>EFF UNIVERSITY</b><small>TECHNOLOGY SUPPORT CENTER</small></span></a><nav><a href="/account">Student Account</a><a href="/resources">Resources</a><a href="/">Campus Home</a></nav></header>
    <section className="tech-hero"><div><p className="eyebrow light">EFFU TECH DEPARTMENT</p><h1>Account trouble?<br /><em>Let’s solve it.</em></h1><p>Clear, private help for student accounts, email confirmation, passwords, devices, and accessibility—without asking for sensitive information.</p></div><img src="/eff-university-dove-crest.png" alt="" /></section>
    <section className="tech-content">
      <div className="tech-emergency"><b>PROTECT YOUR ACCOUNT</b><p>EFF staff will never ask for your password, verification code, Social Security number, full bank details, or remote access to your device. Never send those details through email or a support form.</p></div>
      <div className="tech-grid">
        <article><span>01</span><h2>I cannot sign in</h2><ol><li>Confirm you are using the same email entered on your application.</li><li>Check Caps Lock and remove accidental spaces.</li><li>Use Reset Password instead of repeatedly guessing.</li></ol><a href="/account">OPEN STUDENT SIGN IN →</a></article>
        <article><span>02</span><h2>I did not receive my acceptance email</h2><ol><li>Check spam, promotions, and junk folders.</li><li>Search for “EFF University.”</li><li>Allow several minutes before retrying.</li><li>Confirm the email address was typed correctly.</li></ol><a href="/account">RETURN TO ADMISSIONS →</a></article>
        <article><span>03</span><h2>I need to reset my password</h2><p>Use the secure password-reset option on the account page. Reset links may expire; request a new one if necessary.</p><a href="/account">RESET MY PASSWORD →</a></article>
        <article><span>04</span><h2>I use a shared or public computer</h2><ol><li>Do not save your password.</li><li>Sign out before leaving.</li><li>Close all browser windows.</li><li>Do not upload private documents.</li></ol><a href="/eff-university/education-bridge">OPEN EDUCATION BRIDGE →</a></article>
        <article><span>05</span><h2>The page is not working</h2><ol><li>Refresh the page once.</li><li>Try a current browser.</li><li>Turn off browser translation temporarily.</li><li>Record the page, time, device, and exact error—never your password.</li></ol></article>
        <article><span>06</span><h2>I need accessibility support</h2><p>EFFU pages support keyboard navigation, zoom, reduced motion, text-first information, and browser printing. Tell the Help Desk what access barrier you are experiencing—not private medical details.</p><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">CONTACT EFF SUPPORT →</a></article>
      </div>
      <section className="tech-contact"><div><small>STILL STUCK?</small><h2>Connect with the Esther Funds Foundation Student Help Center.</h2><p>Explain the account issue, the page you were using, your device type, and the exact error message. Do not include passwords or verification codes.</p></div><a href="https://portal.estherfundsfoundation.org/" target="_blank" rel="noreferrer">OPEN THE EFF HELP PORTAL ↗</a></section>
    </section>
  </main>;
}
