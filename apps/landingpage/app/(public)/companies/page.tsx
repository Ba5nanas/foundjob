import { BriefcaseBusiness, MapPin } from "lucide-react";

const companies = [
  ["Northstar Labs", "SaaS platform", "Bangkok", "18 active jobs"],
  ["Blue Harbor", "Financial technology", "Remote first", "7 active jobs"],
  ["Foundry Cloud", "Infrastructure", "Hybrid", "11 active jobs"],
  ["LedgerWorks", "Accounting software", "Bangkok", "4 active jobs"]
] as const;

export default function CompaniesPage() {
  return (
    <main className="fj-page">
      <header className="fj-topbar">
        <nav className="fj-container fj-nav">
          <a className="fj-brand" href="/"><span className="fj-brand-mark">FJ</span><span>FoundJob</span></a>
          <div className="fj-nav-actions">
            <a className="fj-button fj-button-outline" href="/jobs">Jobs</a>
            <a className="fj-button fj-button-primary" href="/register/company">Register company</a>
          </div>
        </nav>
      </header>
      <section className="fj-container fj-section">
        <div className="fj-section-head">
          <div>
            <p className="fj-muted">Company directory</p>
            <h1 className="fj-section-title">Verified companies hiring on FoundJob</h1>
          </div>
        </div>
        <div className="fj-grid-3">
          {companies.map(([name, industry, location, roles]) => (
            <article className="fj-card fj-company-card" key={name}>
              <div className="fj-company-cover" />
              <div>
                <h2 className="fj-card-title">{name}</h2>
                <p className="fj-muted">{industry}</p>
              </div>
              <div className="fj-icon-meta">
                <span className="fj-icon-line"><MapPin />{location}</span>
                <span className="fj-icon-line"><BriefcaseBusiness />{roles}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
