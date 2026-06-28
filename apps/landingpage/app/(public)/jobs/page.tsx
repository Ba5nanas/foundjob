const jobs = [
  ["Frontend Developer", "Northstar Labs", "Bangkok", "CONTRACT", "6 months", "12 applicants"],
  ["Product Designer", "Blue Harbor", "Remote", "PERMANENT", "Full time", "8 applicants"],
  ["Backend Engineer", "Foundry Cloud", "Hybrid", "CONTRACT", "12 months", "19 applicants"],
  ["Finance Analyst", "LedgerWorks", "Bangkok", "PERMANENT", "Full time", "5 applicants"]
] as const;

export default function JobsPage() {
  return (
    <main className="fj-page">
      <header className="fj-topbar">
        <nav className="fj-container fj-nav">
          <a className="fj-brand" href="/"><span className="fj-brand-mark">FJ</span><span>FoundJob</span></a>
          <div className="fj-nav-actions">
            <a className="fj-button fj-button-outline" href="/login">Login</a>
            <a className="fj-button fj-button-primary" href="/company/dashboard">Company demo</a>
          </div>
        </nav>
      </header>
      <section className="fj-container fj-section">
        <div className="fj-section-head">
          <div>
            <p className="fj-muted">Public job board</p>
            <h1 className="fj-section-title">Find roles with clear employment terms</h1>
          </div>
          <a className="fj-button fj-button-outline" href="/search">Open filters</a>
        </div>
        <div className="fj-two-col">
          <aside className="fj-card">
            <h2 className="fj-card-title">Filters</h2>
            <div className="fj-form">
              <label className="fj-label">Keyword<input className="fj-input" placeholder="Role or skill" /></label>
              <label className="fj-label">Location<input className="fj-input" placeholder="Bangkok, Remote" /></label>
              <label className="fj-label">Employment<select className="fj-input"><option>Any</option><option>Permanent</option><option>Contract</option></select></label>
            </div>
          </aside>
          <section className="fj-card-stack">
            {jobs.map(([title, company, location, type, duration, applicants]) => (
              <article className="fj-job-card" key={title}>
                <div className="fj-logo">{company.slice(0, 2).toUpperCase()}</div>
                <div>
                  <h2 className="fj-card-title">{title}</h2>
                  <p className="fj-muted">{company} - {location}</p>
                  <div className="fj-meta">
                    <span className={type === "CONTRACT" ? "fj-badge fj-badge-contract" : "fj-badge fj-badge-permanent"}>{type}</span>
                    <span className="fj-badge">{duration}</span>
                    <span className="fj-badge">{applicants}</span>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
