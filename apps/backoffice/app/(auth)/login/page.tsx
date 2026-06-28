export default function BackofficeLoginPage() {
  return (
    <main className="bo-auth-page">
      <section className="bo-auth-card">
        <a className="bo-brand" href="/backoffice">
          <span className="bo-brand-mark">FJ</span>
          <span>FoundJob Admin</span>
        </a>
        <p className="bo-eyebrow" style={{ marginTop: 24 }}>Backoffice login</p>
        <h1 className="bo-title">Sign in to operations</h1>
        <p className="bo-muted">Demo only. No API, no session, no credential submission.</p>
        <form className="bo-form">
          <label className="bo-label">Email<input className="bo-input" placeholder="admin@foundjob.net" type="email" /></label>
          <label className="bo-label">Password<input className="bo-input" placeholder="Enter password" type="password" /></label>
          <button className="bo-button bo-button-primary" type="button">Open admin demo</button>
        </form>
        <div className="bo-login-note">
          Backoffice is intentionally separated from the public login so admin workflows can stay permission focused.
        </div>
      </section>
    </main>
  );
}
