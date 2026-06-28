const applications = [
  ["Frontend Developer", "Northstar Labs", "Appointment scheduled", "Tomorrow 10:00"],
  ["Product Designer", "Blue Harbor", "Reviewing", "Updated today"],
  ["Backend Engineer", "Foundry Cloud", "Shortlisted", "2 days ago"]
] as const;

export default function SeekerDashboardPage() {
  return (
    <main className="fj-dashboard">
      <aside className="fj-sidebar">
        <a className="fj-brand" href="/"><span className="fj-brand-mark">FJ</span><span>Seeker</span></a>
        <nav className="fj-sidebar-nav">
          <a className="fj-sidebar-link fj-sidebar-link-active" href="/seeker/dashboard">Dashboard</a>
          <a className="fj-sidebar-link" href="/seeker/profile">Profile</a>
          <a className="fj-sidebar-link" href="/seeker/resume">Resume</a>
          <a className="fj-sidebar-link" href="/seeker/applications">Applications</a>
          <a className="fj-sidebar-link" href="/seeker/appointments">Appointments</a>
        </nav>
      </aside>
      <section className="fj-main">
        <div className="fj-dashboard-head">
          <div>
            <p className="fj-muted">Job seeker demo</p>
            <h1 className="fj-section-title">Application workspace</h1>
          </div>
          <a className="fj-button fj-button-primary" href="/jobs">Find jobs</a>
        </div>
        <div className="fj-grid-3">
          <article className="fj-card"><p className="fj-muted">Active applications</p><h2 className="fj-section-title">7</h2></article>
          <article className="fj-card"><p className="fj-muted">Appointments</p><h2 className="fj-section-title">2</h2></article>
          <article className="fj-card"><p className="fj-muted">Profile strength</p><h2 className="fj-section-title">86%</h2></article>
        </div>
        <article className="fj-card" style={{ marginTop: 16 }}>
          <h2 className="fj-card-title">Recent applications</h2>
          <table className="fj-table">
            <thead><tr><th>Role</th><th>Company</th><th>Status</th><th>Next</th></tr></thead>
            <tbody>
              {applications.map(([role, company, status, next]) => (
                <tr key={role}><td>{role}</td><td>{company}</td><td><span className="fj-badge fj-badge-contract">{status}</span></td><td>{next}</td></tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
}
