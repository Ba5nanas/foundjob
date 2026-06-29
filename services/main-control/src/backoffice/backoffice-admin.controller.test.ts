import { describe, expect, it } from "vitest";
import { BackofficeAdminController } from "./backoffice-admin.controller";
import type { DomainGatewayService } from "../routing/domain-gateway.service";

function createControllerWithCalls() {
  const calls: unknown[] = [];
  const controller = new BackofficeAdminController({
    request: (...args: unknown[]) => {
      calls.push(args);
      return Promise.resolve({ ok: true, data: null });
    }
  } as Pick<DomainGatewayService, "request"> as DomainGatewayService);

  return { calls, controller };
}

describe("BackofficeAdminController", () => {
  it("forwards dashboard and current admin account operations", async () => {
    const { calls, controller } = createControllerWithCalls();

    await controller.getDashboard();
    await controller.getCurrentAdmin();
    await controller.updateCurrentAdmin({ fullName: "Updated Admin" });
    await controller.updateCurrentAdminAvatar({ fileName: "avatar.png" });
    await controller.updateCurrentAdminPassword({ revokeOtherSessions: true });

    expect(calls).toEqual([
      ["backoffice", "/admin/dashboard"],
      ["backoffice", "/admin/me"],
      ["backoffice", "/admin/me", { method: "PUT", body: { fullName: "Updated Admin" } }],
      ["backoffice", "/admin/me/avatar", { method: "POST", body: { fileName: "avatar.png" } }],
      ["backoffice", "/admin/me/password", { method: "PUT", body: { revokeOtherSessions: true } }]
    ]);
  });

  it("forwards operational resource collection and item operations", async () => {
    const { calls, controller } = createControllerWithCalls();

    await controller.listUsers();
    await controller.getUser("user-001");
    await controller.updateUser("user-001", { status: "SUSPENDED" });
    await controller.deleteUser("user-001");
    await controller.listCompanies();
    await controller.updateCompany("company-001", { status: "VERIFIED" });
    await controller.listJobs();
    await controller.deleteJob("job-001");
    await controller.listApplications();
    await controller.updateApplication("application-001", { status: "HIRED" });
    await controller.listPackages();
    await controller.createPackage({ name: "Enterprise" });
    await controller.getPackage("package-001");
    await controller.listFiles();
    await controller.updateFile("file-001", { status: "QUARANTINED" });
    await controller.listSettings();
    await controller.createSetting({ id: "security.ipAllowlist" });
    await controller.deleteSetting("security.mfa");

    expect(calls).toEqual([
      ["backoffice", "/admin/users"],
      ["backoffice", "/admin/users/user-001"],
      ["backoffice", "/admin/users/user-001", { method: "PATCH", body: { status: "SUSPENDED" } }],
      ["backoffice", "/admin/users/user-001", { method: "DELETE" }],
      ["backoffice", "/admin/companies"],
      ["backoffice", "/admin/companies/company-001", { method: "PATCH", body: { status: "VERIFIED" } }],
      ["backoffice", "/admin/jobs"],
      ["backoffice", "/admin/jobs/job-001", { method: "DELETE" }],
      ["backoffice", "/admin/applications"],
      ["backoffice", "/admin/applications/application-001", { method: "PATCH", body: { status: "HIRED" } }],
      ["backoffice", "/admin/packages"],
      ["backoffice", "/admin/packages", { method: "POST", body: { name: "Enterprise" } }],
      ["backoffice", "/admin/packages/package-001"],
      ["backoffice", "/admin/files"],
      ["backoffice", "/admin/files/file-001", { method: "PATCH", body: { status: "QUARANTINED" } }],
      ["backoffice", "/admin/settings"],
      ["backoffice", "/admin/settings", { method: "POST", body: { id: "security.ipAllowlist" } }],
      ["backoffice", "/admin/settings/security.mfa", { method: "DELETE" }]
    ]);
  });

  it("forwards role, permission, and audit-log operations", async () => {
    const { calls, controller } = createControllerWithCalls();

    await controller.listRoles();
    await controller.createRole({ name: "QA_REVIEWER" });
    await controller.getRole("role-support");
    await controller.updateRole("role-support", { level: 45 });
    await controller.deleteRole("role-viewer");
    await controller.getRolePermissions("role-support");
    await controller.updateRolePermissions("role-support", { permissions: ["jobs.view"] });
    await controller.listPermissions();
    await controller.listAuditLogs();

    expect(calls).toEqual([
      ["backoffice", "/admin/roles"],
      ["backoffice", "/admin/roles", { method: "POST", body: { name: "QA_REVIEWER" } }],
      ["backoffice", "/admin/roles/role-support"],
      ["backoffice", "/admin/roles/role-support", { method: "PATCH", body: { level: 45 } }],
      ["backoffice", "/admin/roles/role-viewer", { method: "DELETE" }],
      ["backoffice", "/admin/roles/role-support/permissions"],
      ["backoffice", "/admin/roles/role-support/permissions", { method: "PUT", body: { permissions: ["jobs.view"] } }],
      ["backoffice", "/admin/permissions"],
      ["backoffice", "/admin/audit-logs"]
    ]);
  });

  it("forwards admin user collection operations to the backoffice service", async () => {
    const calls: unknown[] = [];
    const controller = new BackofficeAdminController({
      request: (...args: unknown[]) => {
        calls.push(args);
        return Promise.resolve({ ok: true, data: null });
      }
    } as Pick<DomainGatewayService, "request"> as DomainGatewayService);

    await controller.listAdminUsers();
    await controller.createAdminUser({ email: "new-admin@foundjob.net", role: "SUPPORT" });

    expect(calls).toEqual([
      ["backoffice", "/admin/admin-users"],
      ["backoffice", "/admin/admin-users", { method: "POST", body: { email: "new-admin@foundjob.net", role: "SUPPORT" } }]
    ]);
  });

  it("forwards admin user detail and action operations explicitly", async () => {
    const calls: unknown[] = [];
    const controller = new BackofficeAdminController({
      request: (...args: unknown[]) => {
        calls.push(args);
        return Promise.resolve({ ok: true, data: null });
      }
    } as Pick<DomainGatewayService, "request"> as DomainGatewayService);

    await controller.getAdminUser("admin-001");
    await controller.updateAdminUser("admin-001", { fullName: "Updated Admin" });
    await controller.deleteAdminUser("admin-001");
    await controller.suspendAdminUser("admin-001");
    await controller.activateAdminUser("admin-001");
    await controller.resetAdminPassword("admin-001", { notifyByEmail: true });
    await controller.assignAdminRole("admin-001", { role: "ADMIN" });

    expect(calls).toEqual([
      ["backoffice", "/admin/admin-users/admin-001"],
      ["backoffice", "/admin/admin-users/admin-001", { method: "PATCH", body: { fullName: "Updated Admin" } }],
      ["backoffice", "/admin/admin-users/admin-001", { method: "DELETE" }],
      ["backoffice", "/admin/admin-users/admin-001/suspend", { method: "POST" }],
      ["backoffice", "/admin/admin-users/admin-001/activate", { method: "POST" }],
      [
        "backoffice",
        "/admin/admin-users/admin-001/reset-password",
        { method: "POST", body: { notifyByEmail: true } }
      ],
      ["backoffice", "/admin/admin-users/admin-001/role", { method: "PUT", body: { role: "ADMIN" } }]
    ]);
  });

  it("forwards appointment list requests to the backoffice service", async () => {
    const calls: unknown[] = [];
    const controller = new BackofficeAdminController({
      request: (...args: unknown[]) => {
        calls.push(args);
        return Promise.resolve({ ok: true, data: [] });
      }
    } as Pick<DomainGatewayService, "request"> as DomainGatewayService);

    await controller.listAppointments();

    expect(calls).toEqual([["backoffice", "/admin/appointments"]]);
  });

  it("forwards appointment RUD operations explicitly", async () => {
    const calls: unknown[] = [];
    const controller = new BackofficeAdminController({
      request: (...args: unknown[]) => {
        calls.push(args);
        return Promise.resolve({ ok: true, data: null });
      }
    } as Pick<DomainGatewayService, "request"> as DomainGatewayService);

    await controller.getAppointment("appt_001");
    await controller.updateAppointment("appt_001", { scheduledAt: "2026-07-03T11:00:00.000Z" });
    await controller.cancelAppointment("appt_001", { reason: "Candidate unavailable" });

    expect(calls).toEqual([
      ["backoffice", "/admin/appointments/appt_001"],
      [
        "backoffice",
        "/admin/appointments/appt_001",
        { method: "PATCH", body: { scheduledAt: "2026-07-03T11:00:00.000Z" } }
      ],
      ["backoffice", "/admin/appointments/appt_001", { method: "DELETE", body: { reason: "Candidate unavailable" } }]
    ]);
  });
});
