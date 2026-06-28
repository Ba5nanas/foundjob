import { CompanyShell } from "@/components/company-shell";
import { Search, SlidersHorizontal } from "lucide-react";

const applicants = [
  ["Narin S.", "Frontend Developer", "Interviewed", "CONTRACT"],
  ["Mali K.", "Backend Engineer", "Shortlisted", "CONTRACT"],
  ["Arun T.", "Product Designer", "Reviewing", "PERMANENT"]
] as const;

export default function CompanyDashboardPage() {
  return (
    <CompanyShell active="Dashboard" title="Company hiring dashboard" action={<a className="fj-button fj-button-primary" href="/company/jobs">Create job demo</a>}>
      <div className="fj-grid-4">
        <article className="fj-card"><p className="fj-muted">Open jobs</p><h2 className="fj-section-title">12</h2></article>
        <article className="fj-card"><p className="fj-muted">Applicants</p><h2 className="fj-section-title">148</h2></article>
        <article className="fj-card"><p className="fj-muted">Appointments</p><h2 className="fj-section-title">9</h2></article>
        <article className="fj-card"><p className="fj-muted">Employees hired</p><h2 className="fj-section-title">31</h2></article>
      </div>
      <article className="fj-card" style={{ marginTop: 16 }}>
        <div className="fj-section-head" style={{ marginBottom: 0 }}>
          <h2 className="fj-card-title">Applicant pipeline</h2>
          <span className="fj-icon-line"><SlidersHorizontal />Quick filters</span>
        </div>
        <div className="fj-filterbar">
          <input className="fj-input" placeholder="Search candidate or role" />
          <div className="fj-combobox" role="button" tabIndex={0} aria-label="Pipeline status filter">
            <div className="fj-combobox-field"><span className="fj-chip">Interviewed</span></div>
          </div>
          <button className="fj-button fj-button-outline" type="button"><Search /> Filter</button>
        </div>
        <table className="fj-table">
          <thead><tr><th>Candidate</th><th>Role</th><th>Status</th><th>Type</th></tr></thead>
          <tbody>
            {applicants.map(([name, role, status, type]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{role}</td>
                <td><span className="fj-badge fj-badge-contract">{status}</span></td>
                <td><span className={type === "CONTRACT" ? "fj-badge fj-badge-contract" : "fj-badge fj-badge-permanent"}>{type}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </CompanyShell>
  );
}
