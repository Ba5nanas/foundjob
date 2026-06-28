import { permissions, type Permission } from "@foundjob/shared-auth";

const permissionGroups: Record<string, string> = {
  dashboard: "Dashboard",
  admin_users: "Admin users",
  users: "Public users",
  companies: "Companies",
  jobs: "Jobs",
  applications: "Applications",
  appointments: "Appointments",
  packages: "Packages",
  roles: "Roles",
  permissions: "Permissions",
  settings: "Settings",
  files: "Files",
  audit_logs: "Audit logs"
};

export interface BackofficePermissionDefinition {
  key: Permission;
  group: string;
  description: string;
}

export const defaultBackofficePermissions: BackofficePermissionDefinition[] = permissions.map((key) => {
  const groupKey = key.split(".")[0] ?? "settings";
  const group = permissionGroups[groupKey] ?? "Backoffice";
  return {
    key,
    group,
    description: `Allows ${key.replace(".", " ")}`
  };
});
