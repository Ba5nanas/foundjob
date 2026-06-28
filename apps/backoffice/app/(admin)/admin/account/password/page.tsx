import { BackofficeDemo } from "@/components/backoffice-demo";

export default function AdminPasswordPage() {
  return (
    <BackofficeDemo title="Change admin password" section="My account">
      <article className="bo-card bo-card-pad">
        <p className="bo-eyebrow">Security</p>
        <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>Password update</h2>
        <form className="bo-form">
          <label className="bo-label">Current password<input className="bo-input" name="currentPassword" type="password" placeholder="Current password" /></label>
          <label className="bo-label">New password<input className="bo-input" name="newPassword" type="password" placeholder="New password" /></label>
          <label className="bo-label">Confirm new password<input className="bo-input" name="confirmPassword" type="password" placeholder="Confirm new password" /></label>
          <button className="bo-button bo-button-primary" type="submit">Update password demo</button>
        </form>
      </article>
    </BackofficeDemo>
  );
}
