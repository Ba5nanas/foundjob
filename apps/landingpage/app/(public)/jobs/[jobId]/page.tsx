import { Banknote, BriefcaseBusiness, Clock3, MapPin, Send, Users } from "lucide-react";

const description = [
  "Northstar Labs is looking for a Frontend Developer to help build clear, accessible hiring workflows for job seekers, companies, and internal operators. The position focuses on product screens that people use repeatedly every day: search, applications, candidate review, appointments, and employee handoff pages.",
  "You will work closely with product, design, and backend engineers to turn domain rules into interfaces that are easy to scan and hard to misuse. The team values predictable layouts, strong form behavior, readable state changes, and UI patterns that can be reused across public pages and company workspaces.",
  "This is a contract job for an initial six-month engagement. The work is Bangkok hybrid, with room for remote focus days when the team is not running planning, review, or stakeholder sessions. Contract terms, expected output, and review cadence are made clear before the engagement starts."
] as const;

const details = [
  "Build and refine React screens for job discovery, profile editing, application submission, and company applicant review.",
  "Shape reusable UI patterns for filters, tables, editor fields, comboboxes, badges, and empty states.",
  "Collaborate with backend engineers on explicit domain API contracts before implementation starts.",
  "Keep accessibility, responsive behavior, and Thai/English typography quality visible during development.",
  "Document assumptions and handoff notes so future API wiring does not drift away from the approved UX."
] as const;

const requirements = [
  "Strong React and TypeScript experience.",
  "Comfortable with Next.js App Router patterns.",
  "Good eye for spacing, typography, forms, and table-heavy product screens.",
  "Experience working with design systems or shared component libraries.",
  "Able to communicate tradeoffs clearly with product and backend teammates."
] as const;

export default async function JobDetailPage({ params }: { params: Promise<{ jobId: string }> | { jobId: string } }) {
  const { jobId } = await params;

  return (
    <main className="fj-page">
      <header className="fj-topbar">
        <nav className="fj-container fj-nav">
          <a className="fj-brand" href="/"><span className="fj-brand-mark">FJ</span><span>FoundJob</span></a>
          <div className="fj-nav-actions">
            <a className="fj-button fj-button-outline" href="/jobs">Back to jobs</a>
            <a className="fj-button fj-button-primary" href={`/jobs/${jobId}/apply`}>Apply now</a>
          </div>
        </nav>
      </header>
      <section className="fj-container fj-section">
        <article className="fj-card fj-job-detail">
          <div className="fj-job-detail-head">
            <div>
              <p className="fj-muted">Northstar Labs</p>
              <h1 className="fj-title" style={{ fontSize: 40, lineHeight: "48px" }}>Frontend Developer</h1>
              <p className="fj-subtitle">Bangkok hybrid - THB 70k - 110k</p>
            </div>
            <div className="fj-role-card-actions">
              <a className="fj-button fj-button-primary" href={`/jobs/${jobId}/apply`}><Send /> Apply now</a>
              <a className="fj-button fj-button-outline" href="/jobs">Back to jobs</a>
            </div>
          </div>

          <div className="fj-icon-meta fj-detail-meta">
              <span className="fj-icon-line"><MapPin />Bangkok hybrid</span>
              <span className="fj-icon-line"><BriefcaseBusiness />Contract job</span>
              <span className="fj-icon-line"><Clock3 />6 months</span>
              <span className="fj-icon-line"><Users />4 headcount</span>
              <span className="fj-icon-line"><Banknote />THB 70k - 110k</span>
          </div>

          <section className="fj-description">
              <h2 className="fj-card-title">Description</h2>
              {description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}

              <h2 className="fj-card-title">What you will do</h2>
              <ul>
                {details.map((item) => <li key={item}>{item}</li>)}
              </ul>

              <h2 className="fj-card-title">What we are looking for</h2>
              <ul>
                {requirements.map((item) => <li key={item}>{item}</li>)}
              </ul>
          </section>
        </article>
      </section>
    </main>
  );
}
