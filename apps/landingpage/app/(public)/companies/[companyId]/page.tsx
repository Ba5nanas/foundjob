import { BriefcaseBusiness, Clock3 } from "lucide-react";

const openJobs = [
  ["Frontend Developer", "frontend-developer", "CONTRACT", "6 months"],
  ["Backend Engineer", "backend-engineer", "CONTRACT", "12 months"],
  ["Product Designer", "product-designer", "PERMANENT", "Full time"]
] as const;

export default async function CompanyPage({ params }: { params: Promise<{ companyId: string }> | { companyId: string } }) {
  const { companyId } = await params;

  return (
    <main className="fj-page">
      <header className="fj-topbar">
        <nav className="fj-container fj-nav">
          <a className="fj-brand" href="/"><span className="fj-brand-mark">FJ</span><span>FoundJob</span></a>
          <div className="fj-nav-actions">
            <a className="fj-button fj-button-outline" href="/companies">Back to companies</a>
            <a className="fj-button fj-button-primary" href="/jobs">View jobs</a>
          </div>
        </nav>
      </header>
      <section className="fj-container fj-section">
        <article className="fj-card">
          <div className="fj-company-cover" />
          <div className="fj-card-row" style={{ marginTop: 16 }}>
            <div className="fj-profile-head">
              <div className="fj-logo">NL</div>
              <div>
                <span className="fj-badge">Company ID: {companyId}</span>
                <h1 className="fj-section-title">Northstar Labs</h1>
                <p className="fj-muted">SaaS platform - Bangkok / Remote - 240 employees</p>
              </div>
            </div>
            <span className="fj-badge fj-badge-permanent">Verified company</span>
          </div>
        </article>
        <div className="fj-page-grid" style={{ marginTop: 16 }}>
          <article className="fj-card">
            <h2 className="fj-card-title">About</h2>
            <p className="fj-subtitle" style={{ marginTop: 8 }}>Northstar Labs builds workflow tools for teams that need reliable hiring, audit logs, and clear collaboration across departments.</p>
          </article>
          <aside className="fj-card">
            <h2 className="fj-card-title">Open jobs</h2>
            <div className="fj-list" style={{ marginTop: 16 }}>
              {openJobs.map(([title, slug, type, duration]) => (
                <div className="fj-role-card" key={title}>
                  <div className="fj-role-card-head">
                    <div>
                      <strong><a className="fj-title-link" href={`/jobs/${slug}`}>{title}</a></strong>
                      <p className="fj-muted" style={{ margin: "4px 0 0" }}>Open position</p>
                    </div>
                    <span className="fj-outline-icon"><BriefcaseBusiness /></span>
                  </div>
                  <div className="fj-icon-meta">
                    <span className="fj-icon-line"><BriefcaseBusiness />{type === "CONTRACT" ? "Contract job" : "Permanent job"}</span>
                    <span className="fj-icon-line"><Clock3 />{duration}</span>
                  </div>
                  <div className="fj-role-card-actions">
                    <a className="fj-button fj-button-outline" href={`/jobs/${slug}`}>View job</a>
                    <a className="fj-button fj-button-primary" href={`/jobs/${slug}/apply`}>Apply</a>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
