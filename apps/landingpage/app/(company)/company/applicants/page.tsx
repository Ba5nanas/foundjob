import { CompanyShell } from "@/components/company-shell";
import { Search, SlidersHorizontal } from "lucide-react";

const applicants = [
  ["Narin S.", "Frontend Developer", "INTERVIEWED", "86%"],
  ["Mali K.", "Backend Engineer", "SHORTLISTED", "79%"],
  ["Arun T.", "Product Designer", "REVIEWING", "72%"],
  ["Pim W.", "Frontend Developer", "APPLIED", "68%"]
] as const;

export default function CompanyApplicantsPage() {
  return (
    <CompanyShell active="Applicants" title="Applicant pipeline" action={<button className="fj-button fj-button-primary">Schedule appointment</button>}>
      <article className="fj-card">
        <div className="fj-section-head" style={{ marginBottom: 10 }}>
          <div>
            <h2 className="fj-card-title">Candidates</h2>
            <p className="fj-muted">Mock workflow from review to hire.</p>
          </div>
          <div className="fj-meta"><span className="fj-badge fj-badge-contract">owner/staff only</span></div>
        </div>
        <div className="fj-filterbar">
          <input className="fj-input" placeholder="Search candidate or role" />
          <div className="fj-combobox" role="button" tabIndex={0} aria-label="Candidate status filter">
            <div className="fj-combobox-field"><span className="fj-chip">Interviewed</span></div>
          </div>
          <div className="fj-combobox" role="button" tabIndex={0} aria-label="Role filter">
            <div className="fj-combobox-field"><span className="fj-chip">Frontend</span></div>
          </div>
          <button className="fj-button fj-button-outline" type="button"><Search /> Filter</button>
          <span className="fj-icon-line"><SlidersHorizontal />Pipeline filters</span>
        </div>
        <table className="fj-table">
          <thead><tr><th>Candidate</th><th>Applied role</th><th>Status</th><th>Match</th><th>Action</th></tr></thead>
          <tbody>
            {applicants.map(([name, role, status, match]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{role}</td>
                <td><span className="fj-badge fj-badge-contract">{status}</span></td>
                <td>{match}</td>
                <td><button className="fj-button fj-button-outline">Review</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </CompanyShell>
  );
}
