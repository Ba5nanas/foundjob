import { describe, expect, it } from "vitest";
import { verifyPassword } from "../security/password";
import { seedBackofficeDefaults, type BackofficeSeedStore } from "./backoffice-seed";

function createFakeStore(hasSuperadmin = false) {
  const calls = {
    permissions: [] as string[],
    roles: [] as string[],
    grants: 0,
    createdAdmins: [] as Array<{ email: string; passwordHash: string; fullName: string; roleId: string }>
  };

  const roleIds = new Map<string, string>();

  const store: BackofficeSeedStore = {
    async upsertPermission(input) {
      calls.permissions.push(input.key);
      return { id: `permission:${input.key}`, key: input.key };
    },
    async upsertRole(input) {
      calls.roles.push(input.slug);
      const id = `role:${input.slug}`;
      roleIds.set(input.slug, id);
      return { id, slug: input.slug };
    },
    async grantPermissionToRole() {
      calls.grants += 1;
    },
    async hasAnySuperadmin() {
      return hasSuperadmin;
    },
    async createAdminUser(input) {
      calls.createdAdmins.push(input);
    }
  };

  return { calls, roleIds, store };
}

describe("backoffice default seed", () => {
  it("creates default SUPERADMIN if none exists", async () => {
    const { calls, roleIds, store } = createFakeStore(false);

    const result = await seedBackofficeDefaults(store, {
      defaultSuperadminEmail: "admin@foundjob.net",
      defaultSuperadminPassword: "ChangeMe123!",
      defaultSuperadminFullName: "FoundJob Super Admin"
    });

    expect(result.superadminCreated).toBe(true);
    expect(calls.createdAdmins).toHaveLength(1);
    expect(calls.createdAdmins[0]?.email).toBe("admin@foundjob.net");
    expect(calls.createdAdmins[0]?.fullName).toBe("FoundJob Super Admin");
    expect(calls.createdAdmins[0]?.roleId).toBe(roleIds.get("superadmin"));
    expect(calls.createdAdmins[0]?.passwordHash).not.toBe("ChangeMe123!");
    expect(verifyPassword("ChangeMe123!", calls.createdAdmins[0]?.passwordHash ?? "")).toBe(true);
  });

  it("is idempotent and does not create SUPERADMIN if one exists", async () => {
    const { calls, store } = createFakeStore(true);

    const result = await seedBackofficeDefaults(store, {
      defaultSuperadminPassword: "ChangeMe123!"
    });

    expect(result.superadminCreated).toBe(false);
    expect(calls.createdAdmins).toHaveLength(0);
    expect(calls.roles).toContain("superadmin");
    expect(calls.permissions).toContain("admin_users.view");
  });

  it("requires default password from environment input", async () => {
    const { store } = createFakeStore(false);

    await expect(seedBackofficeDefaults(store, {})).rejects.toThrow("FOUNDJOB_DEFAULT_SUPERADMIN_PASSWORD");
  });
});
