import { SeekerShell } from "@/components/seeker-shell";
import { Search, SlidersHorizontal } from "lucide-react";

const applications = [
  ["Frontend Developer", "Northstar Labs", "Appointment scheduled", "Tomorrow 10:00"],
  ["Product Designer", "Blue Harbor", "Reviewing", "Updated today"],
  ["Backend Engineer", "Foundry Cloud", "Shortlisted", "2 days ago"]
] as const;

export default function SeekerDashboardPage() {
  return (
    <SeekerShell active="Dashboard" title="Application workspace" action={<a className="fj-button fj-button-primary" href="/jobs">Find jobs</a>}>
      <div className="fj-grid-3">
        <article className="fj-card"><p className="fj-muted">Active applications</p><h2 className="fj-section-title">7</h2></article>
        <article className="fj-card"><p className="fj-muted">Appointments</p><h2 className="fj-section-title">2</h2></article>
        <article className="fj-card"><p className="fj-muted">Profile strength</p><h2 className="fj-section-title">86%</h2></article>
      </div>
      <article className="fj-card" style={{ marginTop: 16 }}>
        <div className="fj-section-head" style={{ marginBottom: 0 }}>
          <h2 className="fj-card-title">Recent applications</h2>
          <span className="fj-icon-line"><SlidersHorizontal />Quick filters</span>
        </div>
        <div className="fj-filterbar">
          <input className="fj-input" placeholder="Search role or company" />
          <div className="fj-combobox" role="button" tabIndex={0} aria-label="Recent status filter">
            <div className="fj-combobox-field"><span className="fj-chip">Active</span></div>
          </div>
          <button className="fj-button fj-button-outline" type="button"><Search /> Filter</button>
        </div>
        <table className="fj-table">
          <thead><tr><th>Role</th><th>Company</th><th>Status</th><th>Next</th></tr></thead>
          <tbody>
            {applications.map(([role, company, status, next]) => (
              <tr key={role}><td>{role}</td><td>{company}</td><td><span className="fj-badge fj-badge-contract">{status}</span></td><td>{next}</td></tr>
            ))}
          </tbody>
        </table>
      </article>
    </SeekerShell>
  );
}
