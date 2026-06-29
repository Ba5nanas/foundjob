export type AdminUserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: "SUPERADMIN" | "ADMIN" | "SUPPORT" | "VIEWER";
  status: AdminUserStatus;
  mfaEnabled: boolean;
  lastActiveAt: string;
  inheritedPermissions: readonly string[];
}

export const demoAdminUsers: readonly AdminUser[] = [
  {
    id: "admin-001",
    email: "admin@foundjob.net",
    fullName: "FoundJob Super Admin",
    role: "SUPERADMIN",
    status: "ACTIVE",
    mfaEnabled: true,
    lastActiveAt: "2026-06-29T06:45:00.000Z",
    inheritedPermissions: ["admin_users.view", "admin_users.create", "roles.assign_permissions", "audit_logs.view"]
  },
  {
    id: "admin-002",
    email: "support@foundjob.net",
    fullName: "Support Operator",
    role: "SUPPORT",
    status: "ACTIVE",
    mfaEnabled: true,
    lastActiveAt: "2026-06-29T05:18:00.000Z",
    inheritedPermissions: ["admin_users.view", "users.view", "audit_logs.view"]
  },
  {
    id: "admin-003",
    email: "viewer@foundjob.net",
    fullName: "Read Only Reviewer",
    role: "VIEWER",
    status: "SUSPENDED",
    mfaEnabled: false,
    lastActiveAt: "2026-06-20T10:05:00.000Z",
    inheritedPermissions: ["audit_logs.view"]
  }
];

export function listAdminUsers() {
  return {
    items: demoAdminUsers,
    total: demoAdminUsers.length,
    operations: ["create", "read", "update", "delete", "suspend", "activate", "reset_password", "assign_role"] as const
  };
}

export function createAdminUser(input: Record<string, unknown>) {
  const role = parseRole(input.role) ?? "SUPPORT";

  return {
    id: "admin-demo-created",
    email: typeof input.email === "string" ? input.email : "new-admin@foundjob.net",
    fullName: typeof input.fullName === "string" ? input.fullName : "New Admin",
    role,
    status: "ACTIVE" as const,
    mfaEnabled: false,
    lastActiveAt: new Date(0).toISOString(),
    inheritedPermissions: permissionsForRole(role),
    invitationSent: true
  };
}

export function getAdminUser(adminUserId: string) {
  return demoAdminUsers.find((adminUser) => adminUser.id === adminUserId) ?? null;
}

export function updateAdminUser(adminUserId: string, input: Record<string, unknown>) {
  const adminUser = getAdminUser(adminUserId);

  if (!adminUser) {
    return null;
  }

  const status = input.status === "ACTIVE" || input.status === "SUSPENDED" ? input.status : adminUser.status;

  return {
    ...adminUser,
    fullName: typeof input.fullName === "string" ? input.fullName : adminUser.fullName,
    status
  };
}

export function deleteAdminUser(adminUserId: string) {
  const adminUser = getAdminUser(adminUserId);

  if (!adminUser) {
    return null;
  }

  return { ...adminUser, status: "DELETED" as const, deleted: true };
}

export function suspendAdminUser(adminUserId: string) {
  const adminUser = getAdminUser(adminUserId);

  if (!adminUser) {
    return null;
  }

  return { ...adminUser, status: "SUSPENDED" as const };
}

export function activateAdminUser(adminUserId: string) {
  const adminUser = getAdminUser(adminUserId);

  if (!adminUser) {
    return null;
  }

  return { ...adminUser, status: "ACTIVE" as const };
}

export function resetAdminPassword(adminUserId: string, input: Record<string, unknown>) {
  const adminUser = getAdminUser(adminUserId);

  if (!adminUser) {
    return null;
  }

  return {
    adminUserId,
    email: adminUser.email,
    forcePasswordChange: true,
    notifyByEmail: input.notifyByEmail !== false,
    temporaryPasswordVisible: false
  };
}

export function assignAdminRole(adminUserId: string, input: Record<string, unknown>) {
  const adminUser = getAdminUser(adminUserId);
  const role = parseRole(input.role);

  if (!adminUser || !role) {
    return null;
  }

  return {
    ...adminUser,
    role,
    inheritedPermissions: permissionsForRole(role)
  };
}

function parseRole(value: unknown): AdminUser["role"] | null {
  if (value === "SUPERADMIN" || value === "ADMIN" || value === "SUPPORT" || value === "VIEWER") {
    return value;
  }

  return null;
}

function permissionsForRole(role: AdminUser["role"]) {
  if (role === "SUPERADMIN") {
    return ["admin_users.view", "admin_users.create", "admin_users.update", "roles.assign_permissions"] as const;
  }

  if (role === "ADMIN") {
    return ["admin_users.view", "admin_users.create", "admin_users.update"] as const;
  }

  if (role === "SUPPORT") {
    return ["admin_users.view", "users.view", "audit_logs.view"] as const;
  }

  return ["audit_logs.view"] as const;
}
