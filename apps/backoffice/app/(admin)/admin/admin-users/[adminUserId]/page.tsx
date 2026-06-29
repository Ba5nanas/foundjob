import { ShieldCheck, UserCog } from "lucide-react";
import { BackofficeDemo } from "@/components/backoffice-demo";

export default async function AdminUserDetailPage({ params }: { params: Promise<{ adminUserId: string }> }) {
  const { adminUserId } = await params;

  return (
    <BackofficeDemo title="Admin user detail" section="Admin users">
      <article className="bo-card bo-card-pad">
        <p className="bo-eyebrow">Admin ID: {adminUserId}</p>
        <h2 className="bo-title" style={{ fontSize: 24, lineHeight: "32px" }}>Narin Admin</h2>
        <p className="bo-muted">narin.admin@foundjob.net</p>
        <div className="bo-actions" style={{ marginTop: 16 }}>
          <span className="bo-icon-line"><UserCog />SUPERADMIN</span>
          <span className="bo-icon-line"><ShieldCheck />MFA on</span>
          <span className="bo-badge bo-badge-green">ACTIVE</span>
        </div>
        <div className="bo-readonly-preview" aria-label="Permissions inherited from role" style={{ marginTop: 16 }}>
          <span className="bo-chip">admin_users.view</span>
          <span className="bo-chip">admin_users.create</span>
          <span className="bo-chip">roles.assign_permissions</span>
          <span className="bo-chip">audit_logs.view</span>
        </div>
      </article>
    </BackofficeDemo>
  );
}
