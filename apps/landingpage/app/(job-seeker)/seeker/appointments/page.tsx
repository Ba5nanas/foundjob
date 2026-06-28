import { SeekerShell } from "@/components/seeker-shell";

const appointments = [
  ["Northstar Labs", "Frontend Developer", "Tomorrow 10:00", "PENDING"],
  ["Foundry Cloud", "Backend Engineer", "Friday 14:30", "ACCEPTED"],
  ["Blue Harbor", "Product Designer", "Next Monday 09:30", "RESCHEDULE_REQUESTED"]
] as const;

export default function SeekerAppointmentsPage() {
  return (
    <SeekerShell active="Appointments" title="Interview appointments">
      <div className="fj-page-grid">
        <article className="fj-card">
          <h2 className="fj-card-title">Upcoming</h2>
          <div className="fj-list" style={{ marginTop: 16 }}>
            {appointments.map(([company, role, time, status]) => (
              <div className="fj-card-row" key={`${company}-${role}`}>
                <div>
                  <strong>{role}</strong>
                  <p className="fj-muted" style={{ margin: "4px 0 0" }}>{company} - {time}</p>
                </div>
                <span className="fj-badge fj-badge-contract">{status.replaceAll("_", " ")}</span>
              </div>
            ))}
          </div>
        </article>
        <aside className="fj-card">
          <h2 className="fj-card-title">Appointment rules</h2>
          <ul className="fj-timeline" style={{ marginTop: 16 }}>
            <li><strong>Accept</strong><p className="fj-muted">Confirm the time and notify the company.</p></li>
            <li><strong>Decline</strong><p className="fj-muted">Reject politely and keep the application traceable.</p></li>
            <li><strong>Reschedule</strong><p className="fj-muted">Request a new time before the interview window.</p></li>
          </ul>
        </aside>
      </div>
    </SeekerShell>
  );
}
