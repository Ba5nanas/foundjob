import { BackofficeDemo } from "@/components/backoffice-demo";

export default function AdminAccountPage() {
  return (
    <BackofficeDemo title="My admin account" section="My account">
      <article className="bo-card bo-card-pad">
        <p className="bo-eyebrow">Current admin</p>
        <h2 className="bo-title" style={{ fontSize: 22, lineHeight: "30px" }}>FoundJob Super Admin</h2>
        <p className="bo-muted">admin@foundjob.net</p>
        <div className="bo-actions" style={{ marginTop: 16 }}>
          <span className="bo-badge bo-badge-blue">SUPERADMIN</span>
          <span className="bo-badge bo-badge-green">MFA on</span>
        </div>
      </article>
    </BackofficeDemo>
  );
}
