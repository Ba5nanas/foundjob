import { CompanyShell } from "@/components/company-shell";
import { Bold, BriefcaseBusiness, Clock3, Italic, List, Search, SlidersHorizontal } from "lucide-react";

const jobs = [
  ["Frontend Developer", "OPEN", "CONTRACT", "6 months", "2 / 4 hired"],
  ["Backend Engineer", "OPEN", "CONTRACT", "12 months", "1 / 2 hired"],
  ["Product Designer", "PAUSED", "PERMANENT", "-", "0 / 1 hired"],
  ["Customer Success Lead", "FILLED", "PERMANENT", "-", "1 / 1 hired"]
] as const;

export default function CompanyJobsPage() {
  return (
    <CompanyShell active="Jobs" title="Job posts" action={<button className="fj-button fj-button-primary">Create job demo</button>}>
      <div className="fj-page-grid">
        <article className="fj-card">
          <h2 className="fj-card-title">Create or edit job</h2>
          <div className="fj-form-grid" style={{ marginTop: 16 }}>
            <label className="fj-label">Job title<input className="fj-input" defaultValue="Frontend Developer" /></label>
            <label className="fj-label">
              Employment type
              <div className="fj-combobox" role="button" tabIndex={0} aria-label="Employment type">
                <div className="fj-combobox-field"><span className="fj-chip">Contract</span></div>
              </div>
            </label>
            <label className="fj-label">Required headcount<input className="fj-input" defaultValue="4" /></label>
            <label className="fj-label">
              Contract duration
              <div className="fj-combobox" role="button" tabIndex={0} aria-label="Contract duration">
                <div className="fj-combobox-field"><span className="fj-chip">6 months</span></div>
              </div>
            </label>
            <label className="fj-label">
              Required skills
              <div className="fj-combobox" role="button" tabIndex={0} aria-label="Required skills">
                <div className="fj-combobox-field">
                  <span className="fj-chip">React</span>
                  <span className="fj-chip">Accessibility</span>
                </div>
              </div>
            </label>
            <label className="fj-label">Salary range<input className="fj-input" defaultValue="THB 70k - 110k" /></label>
          </div>
          <div style={{ marginTop: 16 }}>
            <label className="fj-label">
              Job description
              <div className="fj-editor">
                <div className="fj-editor-toolbar">
                  <button className="fj-editor-tool" type="button" aria-label="Bold"><Bold /></button>
                  <button className="fj-editor-tool" type="button" aria-label="Italic"><Italic /></button>
                  <button className="fj-editor-tool" type="button" aria-label="Bullet list"><List /></button>
                </div>
                <div className="fj-editor-body" contentEditable suppressContentEditableWarning>
                  <p>Build accessible hiring screens with React, design system components, and clear handoff notes for product teams.</p>
                  <p>Contract terms and reporting line are visible to applicants before they apply.</p>
                </div>
              </div>
            </label>
          </div>
          <div className="fj-note" style={{ marginTop: 16 }}>Contract duration is visible in the UI because hiring must copy it into employee records later.</div>
        </article>
        <aside className="fj-card">
          <h2 className="fj-card-title">Posting limit</h2>
          <p className="fj-muted">Default plan: 5 active jobs</p>
          <div className="fj-progress" style={{ marginTop: 18 }}><span style={{ width: "80%" }} /></div>
          <p className="fj-muted">4 active jobs used</p>
        </aside>
      </div>
      <article className="fj-card" style={{ marginTop: 16 }}>
        <div className="fj-section-head" style={{ marginBottom: 0 }}>
          <h2 className="fj-card-title">Current jobs</h2>
          <span className="fj-icon-line"><SlidersHorizontal />Filterable table demo</span>
        </div>
        <div className="fj-filterbar">
          <input className="fj-input" placeholder="Search job title" />
          <div className="fj-combobox" role="button" tabIndex={0} aria-label="Status filter">
            <div className="fj-combobox-field"><span className="fj-chip">Open</span></div>
          </div>
          <div className="fj-combobox" role="button" tabIndex={0} aria-label="Type filter">
            <div className="fj-combobox-field"><span className="fj-chip">Contract</span></div>
          </div>
          <button className="fj-button fj-button-outline" type="button"><Search /> Apply</button>
        </div>
        <table className="fj-table">
          <thead><tr><th>Job</th><th>Status</th><th>Type</th><th>Duration</th><th>Hiring</th></tr></thead>
          <tbody>
            {jobs.map(([job, status, type, duration, hiring]) => (
              <tr key={job}>
                <td>{job}</td>
                <td><span className="fj-badge fj-badge-contract">{status}</span></td>
                <td><span className={type === "CONTRACT" ? "fj-badge fj-badge-contract" : "fj-badge fj-badge-permanent"}>{type}</span></td>
                <td>{duration}</td>
                <td>{hiring}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </CompanyShell>
  );
}
