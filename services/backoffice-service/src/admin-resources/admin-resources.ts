import { defaultBackofficePermissions } from "../permissions/default-permissions";
import { defaultBackofficeRoles } from "../roles/default-roles";

export type BackofficeResourceKind =
  | "users"
  | "companies"
  | "jobs"
  | "applications"
  | "packages"
  | "files"
  | "settings";

export interface DemoBackofficeItem extends Record<string, unknown> {
  id: string;
}

const resourceItems = {
  users: [
    {
      id: "user-001",
      type: "job_seeker",
      name: "Narin S.",
      email: "narin@example.com",
      status: "ACTIVE",
      applications: 4,
      lastActiveAt: "2026-06-29T05:40:00.000Z"
    },
    {
      id: "user-002",
      type: "company_user",
      name: "Blue Harbor HR",
      email: "hr@blueharbor.example",
      status: "REVIEW",
      applications: 0,
      lastActiveAt: "2026-06-28T10:18:00.000Z"
    }
  ],
  companies: [
    {
      id: "company-001",
      name: "Northstar Labs",
      status: "VERIFIED",
      jobs: 8,
      ownerEmail: "ops@northstar.example",
      reviewedAt: "2026-06-28T08:00:00.000Z"
    },
    {
      id: "company-002",
      name: "Blue Harbor",
      status: "PENDING_REVIEW",
      jobs: 3,
      ownerEmail: "founder@blueharbor.example",
      reviewedAt: null
    }
  ],
  jobs: [
    {
      id: "job-001",
      title: "Frontend Developer",
      company: "Northstar Labs",
      status: "OPEN",
      employmentType: "CONTRACT",
      applications: 18,
      expiresAt: "2026-12-29T00:00:00.000Z"
    },
    {
      id: "job-002",
      title: "Product Designer",
      company: "Blue Harbor",
      status: "UNDER_REVIEW",
      employmentType: "PERMANENT",
      applications: 9,
      expiresAt: null
    }
  ],
  applications: [
    {
      id: "application-001",
      candidate: "Arisa M.",
      jobTitle: "Frontend Developer",
      company: "Northstar Labs",
      status: "INTERVIEW",
      updatedAt: "2026-06-29T04:20:00.000Z"
    },
    {
      id: "application-002",
      candidate: "Krit P.",
      jobTitle: "Backend Engineer",
      company: "Foundry Cloud",
      status: "OFFER",
      updatedAt: "2026-06-28T09:10:00.000Z"
    }
  ],
  packages: [
    {
      id: "package-001",
      name: "Growth Hiring",
      status: "ACTIVE",
      priceThb: 12900,
      jobSlots: 12,
      durationDays: 90
    },
    {
      id: "package-002",
      name: "Starter",
      status: "DRAFT",
      priceThb: 3900,
      jobSlots: 3,
      durationDays: 30
    }
  ],
  files: [
    {
      id: "file-001",
      fileName: "resume-arisa.pdf",
      visibility: "PRIVATE",
      ownerType: "job_seeker",
      status: "AVAILABLE",
      scannedAt: "2026-06-29T03:50:00.000Z"
    },
    {
      id: "file-002",
      fileName: "company-logo-blueharbor.png",
      visibility: "PUBLIC",
      ownerType: "company",
      status: "AVAILABLE",
      scannedAt: "2026-06-28T11:30:00.000Z"
    }
  ],
  settings: [
    {
      id: "security.mfa",
      group: "security",
      label: "Require MFA for admin users",
      value: true,
      status: "ACTIVE"
    },
    {
      id: "jobs.autoExpireDays",
      group: "jobs",
      label: "Default job expiration days",
      value: 90,
      status: "ACTIVE"
    }
  ]
} satisfies Record<BackofficeResourceKind, readonly DemoBackofficeItem[]>;

const creatableResources = new Set<BackofficeResourceKind>(["packages", "settings"]);

export function listBackofficeDashboard() {
  return {
    metrics: {
      openJobs: 8420,
      pendingCompanyReviews: 14,
      activePackages: 92,
      flaggedFiles: 3
    },
    queues: [
      { id: "jobs", label: "Jobs requiring review", count: 7 },
      { id: "companies", label: "Companies awaiting verification", count: 14 },
      { id: "files", label: "Files requiring moderation", count: 3 }
    ],
    operations: ["read"] as const
  };
}

export function listBackofficeResource(kind: BackofficeResourceKind) {
  const items = resourceItems[kind];

  return {
    items,
    total: items.length,
    operations: operationsFor(kind)
  };
}

export function createBackofficeResource(kind: BackofficeResourceKind, input: Record<string, unknown>) {
  if (!creatableResources.has(kind)) {
    return null;
  }

  const id = typeof input.id === "string" ? input.id : `${kind.slice(0, -1)}-demo-created`;

  return {
    id,
    ...withoutId(input),
    status: typeof input.status === "string" ? input.status : "DRAFT",
    created: true
  };
}

export function getBackofficeResource(kind: BackofficeResourceKind, resourceId: string) {
  return resourceItems[kind].find((item) => item.id === resourceId) ?? null;
}

export function updateBackofficeResource(kind: BackofficeResourceKind, resourceId: string, input: Record<string, unknown>) {
  const item = getBackofficeResource(kind, resourceId);

  if (!item) {
    return null;
  }

  return {
    ...item,
    ...withoutId(input),
    updated: true,
    updatedAt: "2026-06-29T07:00:00.000Z"
  };
}

export function deleteBackofficeResource(kind: BackofficeResourceKind, resourceId: string) {
  const item = getBackofficeResource(kind, resourceId);

  if (!item) {
    return null;
  }

  return {
    ...item,
    status: "DELETED",
    deleted: true
  };
}

export function listBackofficeRoles() {
  const items = defaultBackofficeRoles.map((role) => ({
    id: `role-${role.slug}`,
    name: role.name,
    slug: role.slug,
    description: role.description,
    level: role.level,
    isSystem: role.isSystem,
    isDefault: role.isDefault,
    permissionCount: role.permissions.length
  }));

  return {
    items,
    total: items.length,
    operations: ["create", "read", "update", "delete", "assign_permissions"] as const
  };
}

export function createBackofficeRole(input: Record<string, unknown>) {
  const name = typeof input.name === "string" ? input.name : "CUSTOM_ROLE";
  const slug = typeof input.slug === "string" ? input.slug : name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return {
    id: `role-${slug}`,
    name,
    slug,
    description: typeof input.description === "string" ? input.description : "",
    level: typeof input.level === "number" ? input.level : 20,
    isSystem: false,
    isDefault: false,
    permissions: parsePermissionList(input.permissions),
    created: true
  };
}

export function getBackofficeRole(roleId: string) {
  const role = findRole(roleId);

  if (!role) {
    return null;
  }

  return {
    id: `role-${role.slug}`,
    ...role,
    permissionCount: role.permissions.length
  };
}

export function updateBackofficeRole(roleId: string, input: Record<string, unknown>) {
  const role = getBackofficeRole(roleId);

  if (!role) {
    return null;
  }

  return {
    ...role,
    description: typeof input.description === "string" ? input.description : role.description,
    level: typeof input.level === "number" ? input.level : role.level,
    updated: true
  };
}

export function deleteBackofficeRole(roleId: string) {
  const role = getBackofficeRole(roleId);

  if (!role) {
    return null;
  }

  return role.isSystem ? { ...role, deleteBlocked: true } : { ...role, deleted: true };
}

export function getBackofficeRolePermissions(roleId: string) {
  const role = findRole(roleId);

  if (!role) {
    return null;
  }

  return {
    roleId: `role-${role.slug}`,
    permissions: role.permissions,
    permissionCount: role.permissions.length
  };
}

export function updateBackofficeRolePermissions(roleId: string, input: Record<string, unknown>) {
  const role = findRole(roleId);

  if (!role) {
    return null;
  }

  const permissions = parsePermissionList(input.permissions);

  return {
    roleId: `role-${role.slug}`,
    permissions,
    permissionCount: permissions.length,
    updated: true
  };
}

export function listBackofficePermissions() {
  return {
    items: defaultBackofficePermissions,
    total: defaultBackofficePermissions.length,
    groups: Array.from(new Set(defaultBackofficePermissions.map((permission) => permission.group))).sort(),
    operations: ["read"] as const
  };
}

export function listBackofficeAuditLogs() {
  const items = [
    {
      id: "audit-001",
      actor: "admin@foundjob.net",
      action: "jobs.approve",
      target: "job-001",
      createdAt: "2026-06-29T05:45:00.000Z"
    },
    {
      id: "audit-002",
      actor: "support@foundjob.net",
      action: "users.update",
      target: "user-001",
      createdAt: "2026-06-29T04:40:00.000Z"
    }
  ];

  return {
    items,
    total: items.length,
    operations: ["read", "append"] as const
  };
}

export function getCurrentBackofficeAdmin() {
  return {
    id: "admin-001",
    email: "admin@foundjob.net",
    fullName: "FoundJob Super Admin",
    role: "SUPERADMIN",
    mfaEnabled: true,
    locale: "th-TH",
    inheritedPermissions: ["admin_users.view", "roles.assign_permissions", "audit_logs.view"]
  };
}

export function updateCurrentBackofficeAdmin(input: Record<string, unknown>) {
  return {
    ...getCurrentBackofficeAdmin(),
    fullName: typeof input.fullName === "string" ? input.fullName : "FoundJob Super Admin",
    locale: typeof input.locale === "string" ? input.locale : "th-TH",
    updated: true
  };
}

export function updateCurrentBackofficeAdminPassword(input: Record<string, unknown>) {
  return {
    adminUserId: "admin-001",
    passwordChanged: true,
    sessionsRevoked: input.revokeOtherSessions !== false
  };
}

export function updateCurrentBackofficeAdminAvatar(input: Record<string, unknown>) {
  return {
    adminUserId: "admin-001",
    fileName: typeof input.fileName === "string" ? input.fileName : "admin-avatar.png",
    contentType: typeof input.contentType === "string" ? input.contentType : "image/png",
    size: typeof input.size === "number" ? input.size : 0,
    uploaded: true
  };
}

export function isBackofficeResourceKind(value: string): value is BackofficeResourceKind {
  return value in resourceItems;
}

function operationsFor(kind: BackofficeResourceKind) {
  if (kind === "applications") {
    return ["read", "update"] as const;
  }

  if (creatableResources.has(kind)) {
    return ["create", "read", "update", "delete"] as const;
  }

  return ["read", "update", "delete"] as const;
}

function findRole(roleId: string) {
  const normalized = roleId.replace(/^role-/, "").toLowerCase();

  return (
    defaultBackofficeRoles.find(
      (role) => role.slug === normalized || role.name.toLowerCase() === normalized || `role-${role.slug}` === roleId
    ) ?? null
  );
}

function parsePermissionList(value: unknown) {
  return Array.isArray(value) ? value.filter((permission): permission is string => typeof permission === "string") : [];
}

function withoutId(input: Record<string, unknown>) {
  const { id: _id, ...rest } = input;
  return rest;
}
