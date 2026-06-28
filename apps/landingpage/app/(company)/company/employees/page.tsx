import { CompanyShell } from "@/components/company-shell";
import { Search, SlidersHorizontal } from "lucide-react";

const employees = [
  ["Narin S.", "Frontend Developer", "CONTRACT", "Ends Aug 28, 2026", "ACTIVE"],
  ["Krit P.", "Backend Engineer", "PERMANENT", "-", "ACTIVE"],
  ["Dao M.", "QA Analyst", "CONTRACT", "Ends Jul 12, 2026", "ACTIVE"]
] as const;

export default function CompanyEmployeesPage() {
  return (
    <CompanyShell active="Employees" title="Employee records">
      <div className="fj-grid-3">
        <article className="fj-card"><p className="fj-muted">Permanent</p><h2 className="fj-section-title">18</h2></article>
        <article className="fj-card"><p className="fj-muted">Contract</p><h2 className="fj-section-title">13</h2></article>
        <article className="fj-card"><p className="fj-muted">Expiring soon</p><h2 className="fj-section-title">3</h2></article>
      </div>
      <article className="fj-card" style={{ marginTop: 16 }}>
        <div className="fj-section-head" style={{ marginBottom: 0 }}>
          <h2 className="fj-card-title">Employee relationship records</h2>
          <span className="fj-icon-line"><SlidersHorizontal />Contract filters</span>
        </div>
        <div className="fj-filterbar">
          <input className="fj-input" placeholder="Search employee or role" />
          <div className="fj-combobox" role="button" tabIndex={0} aria-label="Employee type filter">
            <div className="fj-combobox-field"><span className="fj-chip">Contract</span></div>
          </div>
          <div className="fj-combobox" role="button" tabIndex={0} aria-label="Status filter">
            <div className="fj-combobox-field"><span className="fj-chip">Active</span></div>
          </div>
          <button className="fj-button fj-button-outline" type="button"><Search /> Filter</button>
        </div>
        <table className="fj-table">
          <thead><tr><th>Name</th><th>Role</th><th>Type</th><th>Contract end</th><th>Status</th></tr></thead>
          <tbody>
            {employees.map(([name, role, type, end, status]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{role}</td>
                <td><span className={type === "CONTRACT" ? "fj-badge fj-badge-contract" : "fj-badge fj-badge-permanent"}>{type}</span></td>
                <td>{end}</td>
                <td><span className="fj-badge fj-badge-permanent">{status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </CompanyShell>
  );
}
