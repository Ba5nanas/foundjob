export default function LoginPage() {
  return (
    <main className="fj-auth-page">
      <section className="fj-auth-visual">
        <a className="fj-brand" href="/">
          <span className="fj-brand-mark">FJ</span>
          <span>FoundJob</span>
        </a>
        <h1 className="fj-title">Welcome back to your hiring workspace.</h1>
        <p className="fj-subtitle">
          Demo login only. Use this screen to review layout, role switching, and the visual bridge between public,
          seeker, and company experiences.
        </p>
        <div className="fj-stats">
          <div className="fj-stat">
            <strong>24</strong>
            <span className="fj-muted">interviews today</span>
          </div>
          <div className="fj-stat">
            <strong>93%</strong>
            <span className="fj-muted">profile completion</span>
          </div>
          <div className="fj-stat">
            <strong>12</strong>
            <span className="fj-muted">new matches</span>
          </div>
        </div>
      </section>

      <section className="fj-auth-card">
        <div className="fj-tabs" aria-label="Login role tabs">
          <button className="fj-tab fj-tab-active">Job seeker</button>
          <button className="fj-tab">Company</button>
        </div>
        <form className="fj-form">
          <label className="fj-label">
            Email
            <input className="fj-input" placeholder="you@example.com" type="email" />
          </label>
          <label className="fj-label">
            Password
            <input className="fj-input" placeholder="Enter password" type="password" />
          </label>
          <button className="fj-button fj-button-primary" type="button">Login demo</button>
        </form>
        <div className="fj-meta" style={{ marginTop: 18 }}>
          <a className="fj-button fj-button-outline" href="/register/job-seeker">Create seeker account</a>
          <a className="fj-button fj-button-outline" href="/register/company">Create company account</a>
        </div>
        <p className="fj-muted" style={{ marginTop: 18 }}>
          Backoffice login is separate at <a href="/backoffice/login">/backoffice/login</a>.
        </p>
      </section>
    </main>
  );
}
