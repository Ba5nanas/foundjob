import { Search, ShieldCheck, UserCog } from "lucide-react";

import { BackofficeDemo } from "../../../../components/backoffice-demo";

const adminUsers = [
  ["Narin Admin", "narin.admin@foundjob.net", "SUPERADMIN", "All modules", "MFA on", "Active", "Today"],
  ["Mali Support", "mali.support@foundjob.net", "SUPPORT", "Users, applications", "MFA on", "Active", "2 hours ago"],
  ["Krit Finance", "krit.finance@foundjob.net", "FINANCE", "Packages, billing", "Required", "Pending", "Yesterday"],
  ["Pim Content", "pim.content@foundjob.net", "CONTENT_MANAGER", "Jobs, companies", "MFA on", "Active", "3 days ago"]
] as const;

const adminMetrics = [
  ["Admin accounts", "24", "6 roles"],
  ["MFA coverage", "96%", "1 pending"],
  ["Permission groups", "18", "Scoped"],
  ["Recent access", "142", "7 days"]
] as const;

export default function AdminUsersPage() {
  return (
    <BackofficeDemo title="Admin user management" section="Admin users">
      <section className="bo-grid-4">
        {adminMetrics.map(([label, value, change]) => (
          <article className="bo-card bo-card-pad" key={label}>
            <p className="bo-metric-label">{label}</p>
            <div className="bo-metric-value">{value}</div>
            <span className="bo-badge bo-badge-blue">{change}</span>
          </article>
        ))}
      </section>

      <section className="bo-grid-2" style={{ marginTop: 16 }}>
        <article className="bo-card bo-card-pad">
          <p className="bo-eyebrow">Admin access</p>
          <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Staff account control</h2>
          <p className="bo-muted">
            Backoffice users are separate from job seekers and companies. This view previews staff account status,
            role scope, MFA readiness, and last activity before API wiring.
          </p>
          <div className="bo-actions" style={{ marginTop: 16 }}>
            <span className="bo-icon-line"><UserCog />Create admin user</span>
            <span className="bo-icon-line"><ShieldCheck />Require MFA</span>
          </div>
        </article>
        <article className="bo-card bo-card-pad">
          <p className="bo-eyebrow">Guardrails</p>
          <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Permission separation</h2>
          <p className="bo-muted">
            SUPERADMIN owns admin users and permission groups. SUPPORT, CONTENT_MANAGER, FINANCE, and VIEWER accounts
            stay scoped to explicit modules.
          </p>
        </article>
      </section>

      <section className="bo-section-head">
        <div>
          <p className="bo-eyebrow">Staff directory</p>
          <h2 className="bo-title" style={{ fontSize: 24, lineHeight: "32px" }}>Admin users</h2>
        </div>
        <div className="bo-filterbar">
          <input className="bo-input" placeholder="Search admin name or email" />
          <div className="bo-combobox" role="button" tabIndex={0} aria-label="Admin role filter">
            <span className="bo-chip">All admin roles</span>
          </div>
          <div className="bo-combobox" role="button" tabIndex={0} aria-label="MFA filter">
            <span className="bo-chip">MFA status</span>
          </div>
          <button className="bo-button" type="button"><Search /> Filter</button>
        </div>
      </section>

      <article className="bo-card bo-table-wrap">
        <table className="bo-table">
          <thead>
            <tr><th>Admin</th><th>Email</th><th>Role</th><th>Scope</th><th>MFA</th><th>Status</th><th>Last active</th></tr>
          </thead>
          <tbody>
            {adminUsers.map(([name, email, role, scope, mfa, status, lastActive]) => (
              <tr key={email}>
                <td>{name}</td>
                <td>{email}</td>
                <td><span className="bo-badge bo-badge-blue">{role}</span></td>
                <td>{scope}</td>
                <td>{mfa}</td>
                <td><span className={status === "Active" ? "bo-badge bo-badge-green" : "bo-badge bo-badge-amber"}>{status}</span></td>
                <td>{lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </BackofficeDemo>
  );
}
