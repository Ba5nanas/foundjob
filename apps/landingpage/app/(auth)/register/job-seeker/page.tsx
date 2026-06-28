export default function RegisterJobSeekerPage() {
  return (
    <main className="fj-auth-page">
      <section className="fj-auth-visual">
        <a className="fj-brand" href="/">
          <span className="fj-brand-mark">FJ</span>
          <span>FoundJob</span>
        </a>
        <h1 className="fj-title">Build a profile companies can understand quickly.</h1>
        <p className="fj-subtitle">A clean registration demo for job seekers with profile and resume intent visible from the first screen.</p>
      </section>
      <section className="fj-auth-card">
        <span className="fj-kicker">Job seeker registration</span>
        <form className="fj-form">
          <label className="fj-label">Full name<input className="fj-input" placeholder="Narin S." /></label>
          <label className="fj-label">Email<input className="fj-input" placeholder="narin@example.com" /></label>
          <label className="fj-label">Target role<input className="fj-input" placeholder="Frontend Developer" /></label>
          <button className="fj-button fj-button-primary" type="button">Create demo profile</button>
        </form>
      </section>
    </main>
  );
}
