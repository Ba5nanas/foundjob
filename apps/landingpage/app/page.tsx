import { ArrowRight, Banknote, BriefcaseBusiness, Building2, Clock3, MapPin, UserRound } from "lucide-react";

const featuredJobs = [
  {
    title: "Frontend Developer",
    slug: "frontend-developer",
    company: "Northstar Labs",
    initials: "NL",
    location: "Bangkok",
    salary: "THB 70k - 110k",
    type: "CONTRACT",
    duration: "6 months",
    tags: ["React", "Design system"]
  },
  {
    title: "Product Designer",
    slug: "product-designer",
    company: "Blue Harbor",
    initials: "BH",
    location: "Remote",
    salary: "THB 80k - 130k",
    type: "PERMANENT",
    duration: null,
    tags: ["Research", "Figma"]
  },
  {
    title: "Backend Engineer",
    slug: "backend-engineer",
    company: "Foundry Cloud",
    initials: "FC",
    location: "Hybrid",
    salary: "THB 95k - 150k",
    type: "CONTRACT",
    duration: "12 months",
    tags: ["NestJS", "PostgreSQL"]
  }
];

const categories = [
  ["Engineering", "1,240 jobs"],
  ["Design", "418 jobs"],
  ["Operations", "362 jobs"],
  ["Finance", "290 jobs"]
];

const companies = [
  ["Northstar Labs", "SaaS platform", "18 open jobs"],
  ["Blue Harbor", "Financial technology", "7 open jobs"],
  ["Foundry Cloud", "Infrastructure", "11 open jobs"]
];

export default function HomePage() {
  return (
    <main className="fj-page">
      <header className="fj-topbar">
        <nav className="fj-container fj-nav" aria-label="Main navigation">
          <a className="fj-brand" href="/">
            <span className="fj-brand-mark">FJ</span>
            <span>FoundJob</span>
          </a>
          <div className="fj-navlinks">
            <a href="/jobs">Jobs</a>
            <a href="/companies">Companies</a>
            <a href="/seeker/dashboard">Job seeker</a>
            <a href="/company/dashboard">Company</a>
          </div>
          <div className="fj-nav-actions">
            <a className="fj-button fj-button-ghost" href="/login">Login</a>
            <a className="fj-button fj-button-primary" href="/register/company">Post a job</a>
          </div>
        </nav>
      </header>

      <section className="fj-container fj-hero">
        <div>
          <span className="fj-kicker">Trusted job marketplace for Thailand teams</span>
          <h1 className="fj-title">Jobs that show the title, contract, and hiring details clearly.</h1>
          <p className="fj-subtitle">
            A clean FoundJob demo for seekers, company users, and backoffice operators. This screen uses mock data only,
            so the frontend and admin experience can be reviewed before API work starts.
          </p>

          <div className="fj-search-panel" aria-label="Job search demo">
            <label className="fj-field">
              <span>Job title</span>
              <input placeholder="Frontend Developer, Product Designer" />
            </label>
            <label className="fj-field">
              <span>Location</span>
              <input placeholder="Bangkok, Remote, Hybrid" />
            </label>
            <a className="fj-button fj-button-primary" href="/jobs">Search</a>
          </div>

          <div className="fj-stats">
            <div className="fj-stat">
              <strong>8.4k</strong>
              <span className="fj-muted">active jobs</span>
            </div>
            <div className="fj-stat">
              <strong>1.2k</strong>
              <span className="fj-muted">verified companies</span>
            </div>
            <div className="fj-stat">
              <strong>42k</strong>
              <span className="fj-muted">applications tracked</span>
            </div>
          </div>
        </div>

        <aside className="fj-hero-card fj-featured-jobs" aria-label="Featured job preview">
          <div className="fj-hero-card-header">
            <div>
              <p className="fj-muted">Featured jobs</p>
              <h2 className="fj-card-title">Recommended this week</h2>
            </div>
            <span className="fj-badge fj-badge-premium">Demo</span>
          </div>
          <div className="fj-card-stack">
            {featuredJobs.map((job) => (
              <article className="fj-role-card" key={job.title}>
                <div className="fj-role-card-head">
                  <div className="fj-card-row-main">
                    <div className="fj-logo">{job.initials}</div>
                    <div>
                      <h3 className="fj-card-title">
                        <a className="fj-title-link" href={`/jobs/${job.slug}`}>{job.title}</a>
                      </h3>
                      <p className="fj-muted">{job.company}</p>
                    </div>
                  </div>
                  <a className="fj-outline-icon" href={`/jobs/${job.slug}`} aria-label={`View ${job.title}`}>
                    <ArrowRight />
                  </a>
                </div>
                <div className="fj-icon-meta">
                  <span className="fj-icon-line"><MapPin />{job.location}</span>
                  <span className="fj-icon-line"><BriefcaseBusiness />{job.type === "CONTRACT" ? "Contract" : "Permanent"}</span>
                  {job.duration ? <span className="fj-icon-line"><Clock3 />{job.duration}</span> : null}
                  <span className="fj-icon-line"><Banknote />{job.salary}</span>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </section>

      <section className="fj-container fj-section">
        <div className="fj-section-head">
          <div>
            <p className="fj-muted">Browse by focus</p>
            <h2 className="fj-section-title">Popular categories</h2>
          </div>
          <a className="fj-button fj-button-outline" href="/search">View search</a>
        </div>
        <div className="fj-grid-4">
          {categories.map(([name, count]) => (
            <a className="fj-category" href="/jobs" key={name}>
              <strong>{name}</strong>
              <span className="fj-muted">{count}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="fj-container fj-section">
        <div className="fj-section-head">
          <div>
            <p className="fj-muted">Companies hiring now</p>
            <h2 className="fj-section-title">Company preview</h2>
          </div>
          <a className="fj-button fj-button-outline" href="/companies">Explore companies</a>
        </div>
        <div className="fj-grid-3">
          {companies.map(([name, industry, roles]) => (
            <article className="fj-card fj-company-card" key={name}>
              <div className="fj-company-cover" />
              <div>
                <h3 className="fj-card-title">{name}</h3>
                <p className="fj-muted">{industry}</p>
              </div>
              <span className="fj-icon-line"><Building2 />{roles}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="fj-container fj-section">
        <div className="fj-home-cta-grid">
          <article className="fj-card fj-home-cta-card">
            <div>
              <div className="fj-home-cta-eyebrow">
                <span className="fj-outline-icon"><UserRound /></span>
                <span>For job seekers</span>
              </div>
              <h2 className="fj-section-title">Track every application from apply to hire.</h2>
              <p className="fj-card-copy">Preview the seeker dashboard with applications, appointments, resumes, and offer status.</p>
            </div>
            <a className="fj-button fj-button-primary" href="/seeker/dashboard">Open seeker demo</a>
          </article>
          <article className="fj-card fj-home-cta-card">
            <div>
              <div className="fj-home-cta-eyebrow">
                <span className="fj-outline-icon"><Building2 /></span>
                <span>For companies</span>
              </div>
              <h2 className="fj-section-title">Manage jobs, applicants, contracts, and employee records.</h2>
              <p className="fj-card-copy">Preview the company workspace before API integration starts.</p>
            </div>
            <a className="fj-button fj-button-primary" href="/company/dashboard">Open company demo</a>
          </article>
        </div>
      </section>
    </main>
  );
}
