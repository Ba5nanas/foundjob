import { BackofficeDemo } from "@/components/backoffice-demo";

export default function CreateAdminUserPage() {
  return (
    <BackofficeDemo title="Create admin user" section="Admin users">
      <article className="bo-card bo-card-pad">
        <p className="bo-eyebrow">Staff account</p>
        <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Invite a backoffice admin</h2>
        <form className="bo-form">
          <label className="bo-label">Full name<input className="bo-input" name="fullName" placeholder="FoundJob Admin" /></label>
          <label className="bo-label">Email<input className="bo-input" name="email" placeholder="admin@foundjob.net" type="email" /></label>
          <label className="bo-label">Phone<input className="bo-input" name="phone" placeholder="+66 80 000 0000" type="tel" /></label>
          <label className="bo-label">
            Role
            <div className="bo-combobox" role="button" tabIndex={0} aria-label="Admin role">
              <span className="bo-chip">SUPPORT</span>
            </div>
          </label>
          <label className="bo-label">
            Status
            <div className="bo-combobox" role="button" tabIndex={0} aria-label="Admin status">
              <span className="bo-chip">ACTIVE</span>
            </div>
          </label>
          <div className="bo-label">
            Role permissions preview
            <div className="bo-readonly-preview" aria-label="Permissions inherited from selected role">
              <span className="bo-chip">admin_users.view</span>
              <span className="bo-chip">audit_logs.view</span>
              <span className="bo-chip">users.view</span>
            </div>
            <span className="bo-field-note">Inherited from SUPPORT. Change permissions from Roles / Role permissions.</span>
          </div>
          <label className="bo-label">Admin note<textarea className="bo-textarea" name="note" placeholder="Reason for access, team, or scope limit" /></label>
          <button className="bo-button bo-button-primary" type="submit">Create admin demo</button>
        </form>
      </article>
    </BackofficeDemo>
  );
}
