import { BackofficeDemo } from "@/components/backoffice-demo";

const groupedPermissions = [
  ["Admin users", "admin_users.view", "admin_users.create", "admin_users.suspend"],
  ["Roles", "roles.view", "roles.update", "roles.assign_permissions"],
  ["Files", "files.view", "files.quarantine", "files.restore"]
] as const;

export default async function RolePermissionsPage({ params }: { params: Promise<{ roleId: string }> }) {
  const { roleId } = await params;

  return (
    <BackofficeDemo title="Role permissions" section="Roles">
      <section className="bo-grid-2">
        {groupedPermissions.map(([group, ...items]) => (
          <article className="bo-card bo-card-pad" key={group}>
            <p className="bo-eyebrow">{group}</p>
            <h2 className="bo-title" style={{ fontSize: 20, lineHeight: "28px" }}>Role {roleId}</h2>
            <div className="bo-actions" style={{ marginTop: 14, flexWrap: "wrap" }}>
              {items.map((permission) => <span className="bo-badge bo-badge-blue" key={permission}>{permission}</span>)}
            </div>
          </article>
        ))}
      </section>
    </BackofficeDemo>
  );
}
