import { BriefcaseBusiness, Building2, Clock3, MapPin, Search, Users } from "lucide-react";

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
              <label className="fj-label">
                Employment
                <div className="fj-combobox" role="button" tabIndex={0} aria-label="Employment filter">
                  <div className="fj-combobox-field">
                    <span className="fj-chip">Permanent</span>
                    <span className="fj-chip">Contract</span>
                  </div>
                </div>
              </label>
              <label className="fj-label">
                Skills
                <div className="fj-combobox" role="button" tabIndex={0} aria-label="Skill filter">
                  <div className="fj-combobox-field">
                    <span className="fj-chip">React</span>
                    <span className="fj-chip">NestJS</span>
                  </div>
                </div>
              </label>
              <button className="fj-button fj-button-primary" type="button"><Search /> Filter jobs</button>
            </div>
          </aside>
          <section className="fj-card-stack">
            {jobs.map(([title, company, location, type, duration, applicants]) => (
              <article className="fj-role-card" key={title}>
                <div className="fj-role-card-head">
                  <div className="fj-card-row-main">
                    <div className="fj-logo">{company.slice(0, 2).toUpperCase()}</div>
                    <div>
                      <h2 className="fj-card-title">{title}</h2>
                      <p className="fj-muted">{company}</p>
                    </div>
                  </div>
                  <span className="fj-outline-icon"><BriefcaseBusiness /></span>
                </div>
                <div className="fj-icon-meta">
                  <span className="fj-icon-line"><Building2 />{company}</span>
                  <span className="fj-icon-line"><MapPin />{location}</span>
                  <span className="fj-icon-line"><Clock3 />{duration}</span>
                  <span className="fj-icon-line"><Users />{applicants}</span>
                  <span className="fj-icon-line"><BriefcaseBusiness />{type === "CONTRACT" ? "Contract role" : "Permanent role"}</span>
                </div>
              </article>
            ))}
          </section>
        </div>
      </section>
    </main>
  );
}
