import type { ReactNode } from "react";

const navItems = [
  ["Dashboard", "/seeker/dashboard"],
  ["Profile", "/seeker/profile"],
  ["Resume", "/seeker/resume"],
  ["Applications", "/seeker/applications"],
  ["Appointments", "/seeker/appointments"]
] as const;

export function SeekerShell({
  active,
  title,
  eyebrow = "Job seeker demo",
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
          <span>Seeker</span>
        </a>
        <nav className="fj-sidebar-nav" aria-label="Job seeker navigation">
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
