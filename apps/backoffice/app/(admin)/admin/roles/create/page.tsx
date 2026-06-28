import { BackofficeDemo } from "@/components/backoffice-demo";

export default function CreateRolePage() {
  return (
    <BackofficeDemo title="Create role" section="Roles">
      <article className="bo-card bo-card-pad">
        <p className="bo-eyebrow">Role policy</p>
        <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>New backoffice role</h2>
        <form className="bo-form">
          <label className="bo-label">Name<input className="bo-input" name="name" placeholder="REGIONAL_SUPPORT" /></label>
          <label className="bo-label">Level<input className="bo-input" name="level" placeholder="30" inputMode="numeric" /></label>
          <label className="bo-label">
            Permissions
            <div className="bo-combobox" role="button" tabIndex={0} aria-label="Role permissions">
              <span className="bo-chip">dashboard.view</span>
              <span className="bo-chip">users.view</span>
            </div>
          </label>
          <label className="bo-label">Description<textarea className="bo-textarea" name="description" placeholder="What this admin role can operate and which scope it owns" /></label>
          <button className="bo-button bo-button-primary" type="submit">Create role demo</button>
        </form>
      </article>
    </BackofficeDemo>
  );
}
