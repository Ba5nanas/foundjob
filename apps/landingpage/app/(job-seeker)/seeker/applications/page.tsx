import { SeekerShell } from "@/components/seeker-shell";
import { Search, SlidersHorizontal } from "lucide-react";

const rows = [
  ["Frontend Developer", "Northstar Labs", "APPOINTMENT_SCHEDULED", "Contract"],
  ["Product Designer", "Blue Harbor", "REVIEWING", "Permanent"],
  ["Backend Engineer", "Foundry Cloud", "SHORTLISTED", "Contract"],
  ["Finance Analyst", "LedgerWorks", "REJECTED", "Permanent"]
] as const;

export default function SeekerApplicationsPage() {
  return (
    <SeekerShell active="Applications" title="Application history">
      <article className="fj-card">
        <div className="fj-section-head" style={{ marginBottom: 10 }}>
          <div>
            <h2 className="fj-card-title">Tracked applications</h2>
            <p className="fj-muted">Mock statuses before the application API is wired.</p>
          </div>
          <a className="fj-button fj-button-outline" href="/jobs">Apply to another job</a>
        </div>
        <div className="fj-filterbar">
          <input className="fj-input" placeholder="Search role or company" />
          <div className="fj-combobox" role="button" tabIndex={0} aria-label="Application status filter">
            <div className="fj-combobox-field"><span className="fj-chip">Active statuses</span></div>
          </div>
          <div className="fj-combobox" role="button" tabIndex={0} aria-label="Employment type filter">
            <div className="fj-combobox-field"><span className="fj-chip">Contract</span></div>
          </div>
          <button className="fj-button fj-button-outline" type="button"><Search /> Filter</button>
          <span className="fj-icon-line"><SlidersHorizontal />Table filters</span>
        </div>
        <table className="fj-table">
          <thead><tr><th>Role</th><th>Company</th><th>Status</th><th>Type</th></tr></thead>
          <tbody>
            {rows.map(([role, company, status, type]) => (
              <tr key={role}>
                <td>{role}</td>
                <td>{company}</td>
                <td><span className="fj-badge fj-badge-contract">{status.replaceAll("_", " ")}</span></td>
                <td>{type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </SeekerShell>
  );
}
