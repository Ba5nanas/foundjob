import { BackofficeRole } from "@foundjob/shared-types";
import { defaultBackofficePermissions } from "../permissions/default-permissions";
import { defaultBackofficeRoles, type BackofficeRoleDefinition } from "../roles/default-roles";
import { hashPassword } from "../security/password";

export interface BackofficeSeedEnv {
  defaultSuperadminEmail?: string;
  defaultSuperadminPassword?: string;
  defaultSuperadminFullName?: string;
}

export interface BackofficeSeedStore {
  upsertPermission(input: { key: string; group: string; description: string }): Promise<{ id: string; key: string }>;
  upsertRole(input: Omit<BackofficeRoleDefinition, "permissions">): Promise<{ id: string; slug: string }>;
  grantPermissionToRole(input: { roleId: string; permissionId: string }): Promise<void>;
  hasAnySuperadmin(): Promise<boolean>;
  createAdminUser(input: {
    email: string;
    passwordHash: string;
    fullName: string;
    roleId: string;
    passwordChangedAt: Date;
  }): Promise<void>;
}

export interface BackofficeSeedResult {
  permissionsSeeded: number;
  rolesSeeded: number;
  rolePermissionsSeeded: number;
  superadminCreated: boolean;
}

const defaultEmail = "admin@foundjob.net";
const defaultFullName = "FoundJob Super Admin";

export async function seedBackofficeDefaults(
  store: BackofficeSeedStore,
  env: BackofficeSeedEnv,
  now = new Date()
): Promise<BackofficeSeedResult> {
  const permissionByKey = new Map<string, { id: string; key: string }>();
  for (const permission of defaultBackofficePermissions) {
    const saved = await store.upsertPermission(permission);
    permissionByKey.set(saved.key, saved);
  }

  const roleBySlug = new Map<string, { id: string; slug: string }>();
  for (const role of defaultBackofficeRoles) {
    const { permissions, ...roleInput } = role;
    const saved = await store.upsertRole(roleInput);
    roleBySlug.set(saved.slug, saved);

    for (const permission of permissions) {
      const savedPermission = permissionByKey.get(permission);
      if (savedPermission) {
        await store.grantPermissionToRole({ roleId: saved.id, permissionId: savedPermission.id });
      }
    }
  }

  const hasSuperadmin = await store.hasAnySuperadmin();
  let superadminCreated = false;
  if (!hasSuperadmin) {
    const superadminRole = roleBySlug.get("superadmin");
    if (!superadminRole) {
      throw new Error("SUPERADMIN role must exist before seeding default admin user");
    }

    const password = env.defaultSuperadminPassword;
    if (!password) {
      throw new Error("FOUNDJOB_DEFAULT_SUPERADMIN_PASSWORD is required to seed the default SUPERADMIN");
    }

    await store.createAdminUser({
      email: env.defaultSuperadminEmail ?? defaultEmail,
      passwordHash: hashPassword(password),
      fullName: env.defaultSuperadminFullName ?? defaultFullName,
      roleId: superadminRole.id,
      passwordChangedAt: now
    });
    superadminCreated = true;
  }

  return {
    permissionsSeeded: defaultBackofficePermissions.length,
    rolesSeeded: defaultBackofficeRoles.length,
    rolePermissionsSeeded: defaultBackofficeRoles.reduce((total, role) => total + role.permissions.length, 0),
    superadminCreated
  };
}

export function getSeedEnvFromProcess(): BackofficeSeedEnv {
  return {
    defaultSuperadminEmail: process.env.FOUNDJOB_DEFAULT_SUPERADMIN_EMAIL,
    defaultSuperadminPassword: process.env.FOUNDJOB_DEFAULT_SUPERADMIN_PASSWORD,
    defaultSuperadminFullName: process.env.FOUNDJOB_DEFAULT_SUPERADMIN_FULL_NAME
  };
}

export function isSuperadminRole(role: { name?: string; slug?: string }): boolean {
  return role.name === BackofficeRole.SUPERADMIN || role.slug === "superadmin";
}
