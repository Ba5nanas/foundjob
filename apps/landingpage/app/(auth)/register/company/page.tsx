export default function RegisterCompanyPage() {
  return (
    <main className="fj-auth-page">
      <section className="fj-auth-visual">
        <a className="fj-brand" href="/">
          <span className="fj-brand-mark">FJ</span>
          <span>FoundJob</span>
        </a>
        <h1 className="fj-title">Create one company workspace and start hiring.</h1>
        <p className="fj-subtitle">Company owners can preview job posting, applicants, appointments, and employee records.</p>
      </section>
      <section className="fj-auth-card">
        <span className="fj-kicker">Company registration</span>
        <form className="fj-form">
          <label className="fj-label">Company name<input className="fj-input" placeholder="Northstar Labs" /></label>
          <label className="fj-label">Work email<input className="fj-input" placeholder="owner@company.com" /></label>
          <label className="fj-label">Industry<input className="fj-input" placeholder="SaaS platform" /></label>
          <button className="fj-button fj-button-primary" type="button">Create company demo</button>
        </form>
      </section>
    </main>
  );
}
