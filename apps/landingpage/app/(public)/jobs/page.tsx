import { BriefcaseBusiness, Clock3, MapPin, Search, Users } from "lucide-react";

const jobs = [
  ["Frontend Developer", "frontend-developer", "Northstar Labs", "NL", "Bangkok", "CONTRACT", "6 months", "12 applicants"],
  ["Product Designer", "product-designer", "Blue Harbor", "BH", "Remote", "PERMANENT", "Full time", "8 applicants"],
  ["Backend Engineer", "backend-engineer", "Foundry Cloud", "FC", "Hybrid", "CONTRACT", "12 months", "19 applicants"],
  ["Finance Analyst", "finance-analyst", "LedgerWorks", "LW", "Bangkok", "PERMANENT", "Full time", "5 applicants"]
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
        <article className="fj-card fj-job-board">
          <div className="fj-job-board-head">
            <div>
              <p className="fj-muted">Public job board</p>
              <h1 className="fj-section-title">Find jobs with clear employment terms</h1>
            </div>
            <a className="fj-button fj-button-outline" href="/search">Advanced search</a>
          </div>

          <div className="fj-filterbar fj-job-filterbar">
            <input className="fj-input" placeholder="Job title or skill" />
            <input className="fj-input" placeholder="Bangkok, Remote" />
            <div className="fj-combobox" role="button" tabIndex={0} aria-label="Employment filter">
              <div className="fj-combobox-field">
                <span className="fj-chip">Permanent</span>
                <span className="fj-chip">Contract</span>
              </div>
            </div>
            <div className="fj-combobox" role="button" tabIndex={0} aria-label="Skill filter">
              <div className="fj-combobox-field">
                <span className="fj-chip">React</span>
                <span className="fj-chip">NestJS</span>
              </div>
            </div>
            <button className="fj-button fj-button-primary" type="button"><Search /> Filter</button>
          </div>

          <div className="fj-job-list">
            {jobs.map(([title, slug, company, initials, location, type, duration, applicants]) => {
              const employment = type === "CONTRACT" ? "Contract" : "Permanent";

              return (
                <article className="fj-role-card" key={title}>
                  <div className="fj-role-card-head">
                    <div className="fj-card-row-main">
                      <div className="fj-logo">{initials}</div>
                      <div>
                        <h2 className="fj-card-title">
                          <a className="fj-title-link" href={`/jobs/${slug}`}>{title}</a>
                        </h2>
                        <p className="fj-muted">{company}</p>
                      </div>
                    </div>
                    <a className="fj-outline-icon" href={`/jobs/${slug}`} aria-label={`View ${title}`}><BriefcaseBusiness /></a>
                  </div>
                  <div className="fj-icon-meta">
                    <span className="fj-icon-line"><MapPin />{location}</span>
                    <span className="fj-icon-line"><BriefcaseBusiness />{employment}</span>
                    <span className="fj-icon-line"><Clock3 />{duration}</span>
                    <span className="fj-icon-line"><Users />{applicants}</span>
                  </div>
                  <div className="fj-role-card-actions">
                    <a className="fj-button fj-button-outline" href={`/jobs/${slug}`}>View job</a>
                    <a className="fj-button fj-button-primary" href={`/jobs/${slug}/apply`}>Apply</a>
                  </div>
                </article>
              );
            })}
          </div>
        </article>
      </section>
    </main>
  );
}
