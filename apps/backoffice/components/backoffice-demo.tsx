import { Search, SlidersHorizontal } from "lucide-react";
import type { ReactNode } from "react";

const navItems = [
  ["Dashboard", "/backoffice/admin/dashboard"],
  ["Platform users", "/backoffice/admin/users"],
  ["Admin users", "/backoffice/admin/admin-users"],
  ["Companies", "/backoffice/admin/companies"],
  ["Jobs", "/backoffice/admin/jobs"],
  ["Applications", "/backoffice/admin/applications"],
  ["Appointments", "/backoffice/admin/appointments"],
  ["Packages", "/backoffice/admin/packages"],
  ["Roles", "/backoffice/admin/roles"],
  ["Permissions", "/backoffice/admin/permissions"],
  ["Files", "/backoffice/admin/files"],
  ["Audit logs", "/backoffice/admin/audit-logs"],
  ["Settings", "/backoffice/admin/settings"],
  ["My account", "/backoffice/admin/account"]
] as const;

const metrics = [
  ["Total users", "42,180", "+8.2%"],
  ["Active companies", "1,284", "+3.1%"],
  ["Open jobs", "8,421", "+12.4%"],
  ["Pending reviews", "128", "Needs action"]
] as const;

const jobs = [
  ["Frontend Developer", "Northstar Labs", "OPEN", "CONTRACT", "6 months"],
  ["Product Designer", "Blue Harbor", "OPEN", "PERMANENT", "-"],
  ["Backend Engineer", "Foundry Cloud", "FILLED", "CONTRACT", "12 months"],
  ["Finance Analyst", "LedgerWorks", "PAUSED", "PERMANENT", "-"]
] as const;

export function BackofficeDemo({
  title = "Operations dashboard",
  section = "Dashboard",
  children
}: {
  title?: string;
  section?: string;
  children?: ReactNode;
}) {
  return (
    <main className="bo-shell">
      <aside className="bo-sidebar">
        <a className="bo-brand" href="/backoffice">
          <span className="bo-brand-mark">FJ</span>
          <span>FoundJob Admin</span>
        </a>
        <nav className="bo-nav" aria-label="Backoffice navigation">
          {navItems.map(([label, href]) => (
            <a className={label === section ? "bo-nav-active" : undefined} href={href} key={label}>{label}</a>
          ))}
        </nav>
      </aside>

      <section className="bo-main">
        <header className="bo-topbar">
          <div>
            <p className="bo-eyebrow">{section}</p>
            <h1 className="bo-title">{title}</h1>
          </div>
          <div className="bo-actions">
            <button className="bo-button">Export</button>
            <button className="bo-button bo-button-primary">Review queue</button>
          </div>
        </header>

        <div className="bo-content">
          {children ?? (
          <>
          <section className="bo-grid-4">
            {metrics.map(([label, value, change]) => (
              <article className="bo-card bo-card-pad" key={label}>
                <p className="bo-metric-label">{label}</p>
                <div className="bo-metric-value">{value}</div>
                <span className="bo-badge bo-badge-green">{change}</span>
              </article>
            ))}
          </section>

          <section className="bo-grid-2" style={{ marginTop: 16 }}>
            <article className="bo-card bo-card-pad">
              <div className="bo-section-head" style={{ marginTop: 0 }}>
                <div>
                  <p className="bo-eyebrow">Hiring health</p>
                  <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Platform overview</h2>
                </div>
                <span className="bo-badge bo-badge-blue">Mock data</span>
              </div>
              <div className="bo-grid-2">
                <div>
                  <p className="bo-muted">Applications this week</p>
                  <div className="bo-metric-value">12,842</div>
                </div>
                <div>
                  <p className="bo-muted">Appointments created</p>
                  <div className="bo-metric-value">932</div>
                </div>
              </div>
            </article>
            <article className="bo-card bo-card-pad">
              <p className="bo-eyebrow">Backoffice rules</p>
              <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Permission model</h2>
              <p className="bo-muted">SUPERADMIN, ADMIN, SUPPORT, CONTENT_MANAGER, FINANCE, and VIEWER roles are shown as admin concepts before API wiring.</p>
              <div className="bo-actions" style={{ marginTop: 16 }}>
                <span className="bo-badge bo-badge-blue">roles.update</span>
                <span className="bo-badge bo-badge-amber">files.quarantine</span>
              </div>
            </article>
          </section>

          <section className="bo-section-head">
            <div>
              <p className="bo-eyebrow">Job moderation</p>
              <h2 className="bo-title" style={{ fontSize: 24, lineHeight: "32px" }}>Recent job records</h2>
            </div>
            <div className="bo-filterbar">
              <input className="bo-input" placeholder="Search jobs or companies" />
              <div className="bo-combobox" role="button" tabIndex={0} aria-label="Status filter">
                <span className="bo-chip">All statuses</span>
              </div>
              <div className="bo-combobox" role="button" tabIndex={0} aria-label="Type filter">
                <span className="bo-chip">Contract</span>
              </div>
              <button className="bo-button" type="button"><Search /> Filter</button>
              <span className="bo-icon-line"><SlidersHorizontal />Filterable table</span>
            </div>
          </section>

          <article className="bo-card bo-table-wrap">
            <table className="bo-table">
              <thead>
                <tr><th>Job</th><th>Company</th><th>Status</th><th>Type</th><th>Duration</th><th>Action</th></tr>
              </thead>
              <tbody>
                {jobs.map(([job, company, status, type, duration]) => (
                  <tr key={job}>
                    <td>{job}</td>
                    <td>{company}</td>
                    <td><span className={status === "OPEN" ? "bo-badge bo-badge-green" : "bo-badge bo-badge-amber"}>{status}</span></td>
                    <td><span className={type === "CONTRACT" ? "bo-badge bo-badge-blue" : "bo-badge bo-badge-green"}>{type}</span></td>
                    <td>{duration}</td>
                    <td><button className="bo-button">Review</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
          </>
          )}
        </div>
      </section>
    </main>
  );
}
