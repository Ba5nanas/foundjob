import { describe, expect, it } from "vitest";
import {
  createBackofficeResource,
  createBackofficeRole,
  deleteBackofficeResource,
  getBackofficeResource,
  getBackofficeRole,
  getBackofficeRolePermissions,
  getCurrentBackofficeAdmin,
  listBackofficeAuditLogs,
  listBackofficeDashboard,
  listBackofficePermissions,
  listBackofficeResource,
  listBackofficeRoles,
  updateBackofficeResource,
  updateBackofficeRolePermissions
} from "./admin-resources";

describe("backoffice admin resources", () => {
  it("lists dashboard queues and operational resources", () => {
    expect(listBackofficeDashboard().queues.map((queue) => queue.id)).toContain("jobs");
    expect(listBackofficeResource("jobs")).toMatchObject({
      total: 2,
      operations: ["read", "update", "delete"]
    });
    expect(listBackofficeResource("applications").operations).toEqual(["read", "update"]);
  });

  it("handles read, update, delete, and guarded create for operational resources", () => {
    expect(getBackofficeResource("jobs", "job-001")).toMatchObject({ title: "Frontend Developer" });
    expect(updateBackofficeResource("jobs", "job-001", { status: "CLOSED" })).toMatchObject({
      id: "job-001",
      status: "CLOSED",
      updated: true
    });
    expect(deleteBackofficeResource("files", "file-002")).toMatchObject({
      id: "file-002",
      status: "DELETED",
      deleted: true
    });
    expect(createBackofficeResource("jobs", { title: "Should not create" })).toBeNull();
    expect(createBackofficeResource("packages", { name: "Enterprise" })).toMatchObject({
      id: "package-demo-created",
      name: "Enterprise",
      created: true
    });
  });

  it("manages roles and role permissions separately from admin users", () => {
    expect(listBackofficeRoles().total).toBeGreaterThan(0);
    expect(getBackofficeRole("role-support")).toMatchObject({ slug: "support" });
    expect(createBackofficeRole({ name: "QA_REVIEWER", permissions: ["jobs.view"] })).toMatchObject({
      id: "role-qa-reviewer",
      permissions: ["jobs.view"],
      created: true
    });
    expect(getBackofficeRolePermissions("role-support")).toMatchObject({
      roleId: "role-support",
      permissions: expect.arrayContaining(["users.view"])
    });
    expect(updateBackofficeRolePermissions("role-support", { permissions: ["dashboard.view"] })).toMatchObject({
      roleId: "role-support",
      permissions: ["dashboard.view"],
      updated: true
    });
  });

  it("lists permissions, audit logs, and current admin account data", () => {
    expect(listBackofficePermissions().groups).toContain("Admin users");
    expect(listBackofficeAuditLogs()).toMatchObject({
      total: 2,
      operations: ["read", "append"]
    });
    expect(getCurrentBackofficeAdmin()).toMatchObject({
      id: "admin-001",
      role: "SUPERADMIN",
      inheritedPermissions: expect.arrayContaining(["roles.assign_permissions"])
    });
  });
});
