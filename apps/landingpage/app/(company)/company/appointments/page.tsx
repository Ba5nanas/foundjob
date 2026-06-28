import { CompanyShell } from "@/components/company-shell";
import { Video } from "lucide-react";

const appointments = [
  ["Narin S.", "Frontend Developer", "Tomorrow 10:00", "PENDING"],
  ["Mali K.", "Backend Engineer", "Friday 14:30", "ACCEPTED"],
  ["Pim W.", "Frontend Developer", "Next Tuesday 11:00", "DECLINED"]
] as const;

export default function CompanyAppointmentsPage() {
  return (
    <CompanyShell active="Appointments" title="Appointment planner" action={<button className="fj-button fj-button-primary">Create appointment</button>}>
      <div className="fj-page-grid">
        <article className="fj-card">
          <h2 className="fj-card-title">Interview schedule</h2>
          <div className="fj-list" style={{ marginTop: 16 }}>
            {appointments.map(([name, role, time, status]) => (
              <div className="fj-card-row" key={`${name}-${time}`}>
                <div>
                  <strong>{name}</strong>
                  <p className="fj-muted" style={{ margin: "4px 0 0" }}>{role} - {time}</p>
                </div>
                <span className="fj-badge fj-badge-contract">{status}</span>
              </div>
            ))}
          </div>
        </article>
        <aside className="fj-card">
          <h2 className="fj-card-title">Create appointment</h2>
          <div className="fj-form" style={{ marginTop: 16 }}>
            <label className="fj-label">Candidate<input className="fj-input" defaultValue="Narin S." /></label>
            <label className="fj-label">Date and time<input className="fj-input" defaultValue="2026-06-29 10:00" /></label>
            <label className="fj-label">
              Meeting type
              <div className="fj-combobox" role="button" tabIndex={0} aria-label="Meeting type">
                <div className="fj-combobox-field"><span className="fj-chip">Video interview</span></div>
              </div>
            </label>
            <span className="fj-icon-line"><Video />Calendar invite preview</span>
          </div>
        </aside>
      </div>
    </CompanyShell>
  );
}
