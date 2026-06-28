import type { ReactNode } from "react";

const navItems = [
  ["Dashboard", "/company/dashboard"],
  ["Profile", "/company/profile"],
  ["Jobs", "/company/jobs"],
  ["Applicants", "/company/applicants"],
  ["Employees", "/company/employees"],
  ["Appointments", "/company/appointments"]
] as const;

export function CompanyShell({
  active,
  title,
  eyebrow = "Northstar Labs",
  action,
  children
}: {
  active: string;
  title: string;
  eyebrow?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="fj-dashboard">
      <aside className="fj-sidebar">
        <a className="fj-brand" href="/">
          <span className="fj-brand-mark">FJ</span>
          <span>Company</span>
        </a>
        <nav className="fj-sidebar-nav" aria-label="Company navigation">
          {navItems.map(([label, href]) => (
            <a className={label === active ? "fj-sidebar-link fj-sidebar-link-active" : "fj-sidebar-link"} href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>
      </aside>
      <section className="fj-main">
        <div className="fj-dashboard-head">
          <div>
            <p className="fj-muted">{eyebrow}</p>
            <h1 className="fj-section-title">{title}</h1>
          </div>
          {action}
        </div>
        {children}
      </section>
    </main>
  );
}
