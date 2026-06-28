const featuredJobs = [
  {
    title: "Frontend Developer",
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
  ["Northstar Labs", "SaaS platform", "18 open roles"],
  ["Blue Harbor", "Financial technology", "7 open roles"],
  ["Foundry Cloud", "Infrastructure", "11 open roles"]
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
          <h1 className="fj-title">Jobs that show the role, contract, and hiring path clearly.</h1>
          <p className="fj-subtitle">
            A clean FoundJob demo for seekers, company users, and backoffice operators. This screen uses mock data only,
            so the frontend and admin experience can be reviewed before API work starts.
          </p>

          <div className="fj-search-panel" aria-label="Job search demo">
            <label className="fj-field">
              <span>Role</span>
              <input placeholder="Frontend, Designer, Finance" />
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

        <aside className="fj-hero-card" aria-label="Featured job preview">
          <div className="fj-hero-card-header">
            <div>
              <p className="fj-muted">Featured roles</p>
              <h2 className="fj-card-title">Recommended this week</h2>
            </div>
            <span className="fj-badge fj-badge-premium">Demo</span>
          </div>
          <div className="fj-card-stack">
            {featuredJobs.map((job) => (
              <article className="fj-job-card" key={job.title}>
                <div className="fj-logo">{job.initials}</div>
                <div>
                  <h3 className="fj-card-title">{job.title}</h3>
                  <p className="fj-muted">{job.company} - {job.location}</p>
                  <div className="fj-meta">
                    <span className={job.type === "CONTRACT" ? "fj-badge fj-badge-contract" : "fj-badge fj-badge-permanent"}>
                      {job.type}
                    </span>
                    {job.duration ? <span className="fj-badge">{job.duration}</span> : null}
                    <span className="fj-badge">{job.salary}</span>
                  </div>
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
              <span className="fj-badge fj-badge-contract">{roles}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="fj-container fj-section">
        <div className="fj-two-col">
          <article className="fj-card">
            <span className="fj-badge fj-badge-permanent">For job seekers</span>
            <h2 className="fj-section-title">Track every application from apply to hire.</h2>
            <p className="fj-subtitle">Preview the seeker dashboard with applications, appointments, resumes, and offer status.</p>
            <a className="fj-button fj-button-primary" href="/seeker/dashboard">Open seeker demo</a>
          </article>
          <article className="fj-card">
            <span className="fj-badge fj-badge-contract">For companies</span>
            <h2 className="fj-section-title">Manage jobs, applicants, contracts, and employee records.</h2>
            <p className="fj-subtitle">Preview the company workspace before API integration starts.</p>
            <a className="fj-button fj-button-primary" href="/company/dashboard">Open company demo</a>
          </article>
        </div>
      </section>
    </main>
  );
}
