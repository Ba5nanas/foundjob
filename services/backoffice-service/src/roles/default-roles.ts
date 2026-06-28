import { permissions, type Permission } from "@foundjob/shared-auth";
import { BackofficeRole, backofficeRoleLevels } from "@foundjob/shared-types";

export interface BackofficeRoleDefinition {
  name: BackofficeRole;
  slug: string;
  description: string;
  level: number;
  isSystem: boolean;
  isDefault: boolean;
  permissions: Permission[];
}

const allPermissions = [...permissions];

export const defaultBackofficeRoles: BackofficeRoleDefinition[] = [
  {
    name: BackofficeRole.SUPERADMIN,
    slug: "superadmin",
    description: "Full backoffice ownership with audited bypass for permission checks.",
    level: backofficeRoleLevels[BackofficeRole.SUPERADMIN],
    isSystem: true,
    isDefault: false,
    permissions: allPermissions
  },
  {
    name: BackofficeRole.ADMIN,
    slug: "admin",
    description: "Operational admin with broad access below SUPERADMIN.",
    level: backofficeRoleLevels[BackofficeRole.ADMIN],
    isSystem: true,
    isDefault: false,
    permissions: allPermissions.filter((permission) => !permission.startsWith("admin_users.delete") && !permission.startsWith("roles.delete"))
  },
  {
    name: BackofficeRole.FINANCE,
    slug: "finance",
    description: "Finance user for packages, billing-oriented settings, and reports.",
    level: backofficeRoleLevels[BackofficeRole.FINANCE],
    isSystem: true,
    isDefault: false,
    permissions: ["dashboard.view", "packages.view", "packages.create", "packages.update", "settings.view", "audit_logs.view"]
  },
  {
    name: BackofficeRole.CONTENT_MANAGER,
    slug: "content-manager",
    description: "Content moderation user for companies, jobs, applications, and files.",
    level: backofficeRoleLevels[BackofficeRole.CONTENT_MANAGER],
    isSystem: true,
    isDefault: false,
    permissions: [
      "dashboard.view",
      "companies.view",
      "companies.update",
      "companies.verify",
      "jobs.view",
      "jobs.update",
      "jobs.approve",
      "jobs.reject",
      "applications.view",
      "files.view",
      "files.quarantine"
    ]
  },
  {
    name: BackofficeRole.SUPPORT,
    slug: "support",
    description: "Support Backoffice Admin User for public users, applications, appointments, and limited company review.",
    level: backofficeRoleLevels[BackofficeRole.SUPPORT],
    isSystem: true,
    isDefault: true,
    permissions: [
      "dashboard.view",
      "users.view",
      "users.update",
      "companies.view",
      "jobs.view",
      "applications.view",
      "applications.update",
      "appointments.view",
      "appointments.cancel",
      "audit_logs.view"
    ]
  },
  {
    name: BackofficeRole.VIEWER,
    slug: "viewer",
    description: "Read-only Backoffice Admin User.",
    level: backofficeRoleLevels[BackofficeRole.VIEWER],
    isSystem: true,
    isDefault: false,
    permissions: [
      "dashboard.view",
      "users.view",
      "companies.view",
      "jobs.view",
      "applications.view",
      "appointments.view",
      "packages.view",
      "roles.view",
      "permissions.view",
      "settings.view",
      "files.view",
      "audit_logs.view"
    ]
  }
];
