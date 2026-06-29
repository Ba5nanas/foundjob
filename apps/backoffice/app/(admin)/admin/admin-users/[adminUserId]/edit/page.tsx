import { BackofficeDemo } from "@/components/backoffice-demo";

export default async function EditAdminUserPage({ params }: { params: Promise<{ adminUserId: string }> }) {
  const { adminUserId } = await params;

  return (
    <BackofficeDemo title="Edit admin user" section="Admin users">
      <article className="bo-card bo-card-pad">
        <p className="bo-eyebrow">Admin ID: {adminUserId}</p>
        <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Account settings</h2>
        <form className="bo-form">
          <label className="bo-label">Full name<input className="bo-input" defaultValue="Narin Admin" name="fullName" /></label>
          <label className="bo-label">Email<input className="bo-input" defaultValue="narin.admin@foundjob.net" name="email" type="email" /></label>
          <label className="bo-label">Phone<input className="bo-input" defaultValue="+66 81 220 4400" name="phone" type="tel" /></label>
          <label className="bo-label">
            Role
            <div className="bo-combobox" role="button" tabIndex={0} aria-label="Admin role">
              <span className="bo-chip">SUPERADMIN</span>
            </div>
          </label>
          <label className="bo-label">
            Account status
            <div className="bo-combobox" role="button" tabIndex={0} aria-label="Admin status">
              <span className="bo-chip">ACTIVE</span>
            </div>
          </label>
          <div className="bo-label">
            Role permissions preview
            <div className="bo-readonly-preview" aria-label="Permissions inherited from selected role">
              <span className="bo-chip">admin_users.view</span>
              <span className="bo-chip">admin_users.create</span>
              <span className="bo-chip">roles.assign_permissions</span>
              <span className="bo-chip">audit_logs.view</span>
            </div>
            <span className="bo-field-note">Inherited from SUPERADMIN. Change permissions from Roles / Role permissions.</span>
          </div>
          <label className="bo-label">Access note<textarea className="bo-textarea" defaultValue="Owns backoffice setup and role policy changes." name="note" /></label>
          <button className="bo-button bo-button-primary" type="submit">Save admin demo</button>
        </form>
      </article>
    </BackofficeDemo>
  );
}
