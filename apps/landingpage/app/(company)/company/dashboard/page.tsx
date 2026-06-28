const applicants = [
  ["Narin S.", "Frontend Developer", "Interviewed", "CONTRACT"],
  ["Mali K.", "Backend Engineer", "Shortlisted", "CONTRACT"],
  ["Arun T.", "Product Designer", "Reviewing", "PERMANENT"]
] as const;

export default function CompanyDashboardPage() {
  return (
    <main className="fj-dashboard">
      <aside className="fj-sidebar">
        <a className="fj-brand" href="/"><span className="fj-brand-mark">FJ</span><span>Company</span></a>
        <nav className="fj-sidebar-nav">
          <a className="fj-sidebar-link fj-sidebar-link-active" href="/company/dashboard">Dashboard</a>
          <a className="fj-sidebar-link" href="/company/profile">Profile</a>
          <a className="fj-sidebar-link" href="/company/jobs">Jobs</a>
          <a className="fj-sidebar-link" href="/company/applicants">Applicants</a>
          <a className="fj-sidebar-link" href="/company/employees">Employees</a>
          <a className="fj-sidebar-link" href="/company/appointments">Appointments</a>
        </nav>
      </aside>
      <section className="fj-main">
        <div className="fj-dashboard-head">
          <div>
            <p className="fj-muted">Northstar Labs</p>
            <h1 className="fj-section-title">Company hiring dashboard</h1>
          </div>
          <a className="fj-button fj-button-primary" href="/company/jobs">Create job demo</a>
        </div>
        <div className="fj-grid-4">
          <article className="fj-card"><p className="fj-muted">Open jobs</p><h2 className="fj-section-title">12</h2></article>
          <article className="fj-card"><p className="fj-muted">Applicants</p><h2 className="fj-section-title">148</h2></article>
          <article className="fj-card"><p className="fj-muted">Appointments</p><h2 className="fj-section-title">9</h2></article>
          <article className="fj-card"><p className="fj-muted">Employees hired</p><h2 className="fj-section-title">31</h2></article>
        </div>
        <article className="fj-card" style={{ marginTop: 16 }}>
          <h2 className="fj-card-title">Applicant pipeline</h2>
          <table className="fj-table">
            <thead><tr><th>Candidate</th><th>Role</th><th>Status</th><th>Type</th></tr></thead>
            <tbody>
              {applicants.map(([name, role, status, type]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{role}</td>
                  <td><span className="fj-badge fj-badge-contract">{status}</span></td>
                  <td><span className={type === "CONTRACT" ? "fj-badge fj-badge-contract" : "fj-badge fj-badge-permanent"}>{type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    </main>
  );
}
