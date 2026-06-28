import { BriefcaseBusiness, Clock3, MapPin, Users } from "lucide-react";

const responsibilities = [
  "Build accessible React interfaces for job seeker and company workflows.",
  "Maintain shared UI patterns with product and design teams.",
  "Collaborate with backend engineers on explicit domain API contracts."
] as const;

export default function JobDetailPage({ params }: { params: { jobId: string } }) {
  return (
    <main className="fj-page">
      <header className="fj-topbar">
        <nav className="fj-container fj-nav">
          <a className="fj-brand" href="/"><span className="fj-brand-mark">FJ</span><span>FoundJob</span></a>
          <div className="fj-nav-actions">
            <a className="fj-button fj-button-outline" href="/jobs">Back to jobs</a>
            <a className="fj-button fj-button-primary" href="/login">Apply demo</a>
          </div>
        </nav>
      </header>
      <section className="fj-container fj-section">
        <div className="fj-page-grid">
          <article className="fj-card">
            <span className="fj-badge fj-badge-contract">Job ID: {params.jobId}</span>
            <h1 className="fj-title" style={{ fontSize: 40, lineHeight: "48px" }}>Frontend Developer</h1>
            <p className="fj-subtitle">Northstar Labs - Bangkok hybrid - THB 70k - 110k</p>
            <div className="fj-icon-meta">
              <span className="fj-icon-line"><MapPin />Bangkok hybrid</span>
              <span className="fj-icon-line"><BriefcaseBusiness />Contract role</span>
              <span className="fj-icon-line"><Clock3 />6 months</span>
              <span className="fj-icon-line"><Users />4 headcount</span>
            </div>
            <h2 className="fj-card-title" style={{ marginTop: 28 }}>Responsibilities</h2>
            <ul className="fj-timeline" style={{ marginTop: 14 }}>
              {responsibilities.map((item) => <li key={item}><p className="fj-muted">{item}</p></li>)}
            </ul>
          </article>
          <aside className="fj-card">
            <h2 className="fj-card-title">Hiring flow</h2>
            <ul className="fj-timeline" style={{ marginTop: 16 }}>
              <li><strong>Apply</strong><p className="fj-muted">Job seeker submits profile and resume.</p></li>
              <li><strong>Appointment</strong><p className="fj-muted">Company staff schedules interview.</p></li>
              <li><strong>Hire</strong><p className="fj-muted">Contract duration is copied to employee record.</p></li>
            </ul>
            <a className="fj-button fj-button-primary" href="/login" style={{ width: "100%", marginTop: 18 }}>Apply to this role</a>
          </aside>
        </div>
      </section>
    </main>
  );
}
