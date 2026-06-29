import { describe, expect, it } from "vitest";
import {
  activateAdminUser,
  assignAdminRole,
  createAdminUser,
  deleteAdminUser,
  getAdminUser,
  listAdminUsers,
  resetAdminPassword,
  suspendAdminUser,
  updateAdminUser
} from "./admin-users";

describe("admin users demo handlers", () => {
  it("lists admin users with supported operations", () => {
    expect(listAdminUsers()).toMatchObject({
      total: 3,
      operations: ["create", "read", "update", "delete", "suspend", "activate", "reset_password", "assign_role"]
    });
  });

  it("creates an invited admin user without direct permission assignment", () => {
    expect(
      createAdminUser({
        email: "new-support@foundjob.net",
        fullName: "New Support",
        role: "SUPPORT",
        permissions: ["admin_users.delete"]
      })
    ).toMatchObject({
      email: "new-support@foundjob.net",
      fullName: "New Support",
      role: "SUPPORT",
      inheritedPermissions: ["admin_users.view", "users.view", "audit_logs.view"],
      invitationSent: true
    });
  });

  it("reads and updates an admin user", () => {
    expect(getAdminUser("admin-001")).toMatchObject({ id: "admin-001", role: "SUPERADMIN" });
    expect(updateAdminUser("admin-001", { fullName: "Updated Admin", status: "SUSPENDED" })).toMatchObject({
      id: "admin-001",
      fullName: "Updated Admin",
      status: "SUSPENDED"
    });
  });

  it("suspends, activates, deletes, and resets admin users", () => {
    expect(suspendAdminUser("admin-002")).toMatchObject({ id: "admin-002", status: "SUSPENDED" });
    expect(activateAdminUser("admin-003")).toMatchObject({ id: "admin-003", status: "ACTIVE" });
    expect(deleteAdminUser("admin-002")).toMatchObject({ id: "admin-002", status: "DELETED", deleted: true });
    expect(resetAdminPassword("admin-001", { notifyByEmail: true })).toMatchObject({
      adminUserId: "admin-001",
      forcePasswordChange: true,
      temporaryPasswordVisible: false
    });
  });

  it("assigns role-level permissions through the selected role", () => {
    expect(assignAdminRole("admin-002", { role: "ADMIN", permissions: ["admin_users.delete"] })).toMatchObject({
      id: "admin-002",
      role: "ADMIN",
      inheritedPermissions: ["admin_users.view", "admin_users.create", "admin_users.update"]
    });
  });
});
