import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { DomainGatewayService, type DomainRequestOptions } from "../routing/domain-gateway.service";

@Controller("backoffice/admin")
export class BackofficeAdminController {
  constructor(private readonly domainGateway: DomainGatewayService) {}

  @Get("dashboard")
  getDashboard() {
    return this.forward("/admin/dashboard");
  }

  @Get("me")
  getCurrentAdmin() {
    return this.forward("/admin/me");
  }

  @Put("me")
  updateCurrentAdmin(@Body() body: Record<string, unknown>) {
    return this.forward("/admin/me", { method: "PUT", body });
  }

  @Post("me/avatar")
  updateCurrentAdminAvatar(@Body() body: Record<string, unknown>) {
    return this.forward("/admin/me/avatar", { method: "POST", body });
  }

  @Put("me/password")
  updateCurrentAdminPassword(@Body() body: Record<string, unknown>) {
    return this.forward("/admin/me/password", { method: "PUT", body });
  }

  @Get("users")
  listUsers() {
    return this.forward("/admin/users");
  }

  @Get("users/:userId")
  getUser(@Param("userId") userId: string) {
    return this.forward(`/admin/users/${encodeURIComponent(userId)}`);
  }

  @Patch("users/:userId")
  updateUser(@Param("userId") userId: string, @Body() body: Record<string, unknown>) {
    return this.forward(`/admin/users/${encodeURIComponent(userId)}`, { method: "PATCH", body });
  }

  @Delete("users/:userId")
  deleteUser(@Param("userId") userId: string) {
    return this.forward(`/admin/users/${encodeURIComponent(userId)}`, { method: "DELETE" });
  }

  @Get("admin-users")
  listAdminUsers() {
    return this.domainGateway.request("backoffice", "/admin/admin-users");
  }

  @Post("admin-users")
  createAdminUser(@Body() body: Record<string, unknown>) {
    return this.domainGateway.request("backoffice", "/admin/admin-users", { method: "POST", body });
  }

  @Get("admin-users/:adminUserId")
  getAdminUser(@Param("adminUserId") adminUserId: string) {
    return this.domainGateway.request("backoffice", `/admin/admin-users/${encodeURIComponent(adminUserId)}`);
  }

  @Patch("admin-users/:adminUserId")
  updateAdminUser(@Param("adminUserId") adminUserId: string, @Body() body: Record<string, unknown>) {
    return this.domainGateway.request("backoffice", `/admin/admin-users/${encodeURIComponent(adminUserId)}`, {
      method: "PATCH",
      body
    });
  }

  @Delete("admin-users/:adminUserId")
  deleteAdminUser(@Param("adminUserId") adminUserId: string) {
    return this.domainGateway.request("backoffice", `/admin/admin-users/${encodeURIComponent(adminUserId)}`, {
      method: "DELETE"
    });
  }

  @Post("admin-users/:adminUserId/suspend")
  suspendAdminUser(@Param("adminUserId") adminUserId: string) {
    return this.domainGateway.request("backoffice", `/admin/admin-users/${encodeURIComponent(adminUserId)}/suspend`, {
      method: "POST"
    });
  }

  @Post("admin-users/:adminUserId/activate")
  activateAdminUser(@Param("adminUserId") adminUserId: string) {
    return this.domainGateway.request("backoffice", `/admin/admin-users/${encodeURIComponent(adminUserId)}/activate`, {
      method: "POST"
    });
  }

  @Post("admin-users/:adminUserId/reset-password")
  resetAdminPassword(@Param("adminUserId") adminUserId: string, @Body() body: Record<string, unknown>) {
    return this.domainGateway.request(
      "backoffice",
      `/admin/admin-users/${encodeURIComponent(adminUserId)}/reset-password`,
      { method: "POST", body }
    );
  }

  @Put("admin-users/:adminUserId/role")
  assignAdminRole(@Param("adminUserId") adminUserId: string, @Body() body: Record<string, unknown>) {
    return this.domainGateway.request("backoffice", `/admin/admin-users/${encodeURIComponent(adminUserId)}/role`, {
      method: "PUT",
      body
    });
  }

  @Get("appointments")
  listAppointments() {
    return this.domainGateway.request("backoffice", "/admin/appointments");
  }

  @Get("appointments/:appointmentId")
  getAppointment(@Param("appointmentId") appointmentId: string) {
    return this.domainGateway.request("backoffice", `/admin/appointments/${encodeURIComponent(appointmentId)}`);
  }

  @Patch("appointments/:appointmentId")
  updateAppointment(@Param("appointmentId") appointmentId: string, @Body() body: Record<string, unknown>) {
    return this.domainGateway.request("backoffice", `/admin/appointments/${encodeURIComponent(appointmentId)}`, {
      method: "PATCH",
      body
    });
  }

  @Delete("appointments/:appointmentId")
  cancelAppointment(@Param("appointmentId") appointmentId: string, @Body() body: Record<string, unknown>) {
    return this.domainGateway.request("backoffice", `/admin/appointments/${encodeURIComponent(appointmentId)}`, {
      method: "DELETE",
      body
    });
  }

  @Get("companies")
  listCompanies() {
    return this.forward("/admin/companies");
  }

  @Get("companies/:companyId")
  getCompany(@Param("companyId") companyId: string) {
    return this.forward(`/admin/companies/${encodeURIComponent(companyId)}`);
  }

  @Patch("companies/:companyId")
  updateCompany(@Param("companyId") companyId: string, @Body() body: Record<string, unknown>) {
    return this.forward(`/admin/companies/${encodeURIComponent(companyId)}`, { method: "PATCH", body });
  }

  @Delete("companies/:companyId")
  deleteCompany(@Param("companyId") companyId: string) {
    return this.forward(`/admin/companies/${encodeURIComponent(companyId)}`, { method: "DELETE" });
  }

  @Get("jobs")
  listJobs() {
    return this.forward("/admin/jobs");
  }

  @Get("jobs/:jobId")
  getJob(@Param("jobId") jobId: string) {
    return this.forward(`/admin/jobs/${encodeURIComponent(jobId)}`);
  }

  @Patch("jobs/:jobId")
  updateJob(@Param("jobId") jobId: string, @Body() body: Record<string, unknown>) {
    return this.forward(`/admin/jobs/${encodeURIComponent(jobId)}`, { method: "PATCH", body });
  }

  @Delete("jobs/:jobId")
  deleteJob(@Param("jobId") jobId: string) {
    return this.forward(`/admin/jobs/${encodeURIComponent(jobId)}`, { method: "DELETE" });
  }

  @Get("applications")
  listApplications() {
    return this.forward("/admin/applications");
  }

  @Get("applications/:applicationId")
  getApplication(@Param("applicationId") applicationId: string) {
    return this.forward(`/admin/applications/${encodeURIComponent(applicationId)}`);
  }

  @Patch("applications/:applicationId")
  updateApplication(@Param("applicationId") applicationId: string, @Body() body: Record<string, unknown>) {
    return this.forward(`/admin/applications/${encodeURIComponent(applicationId)}`, { method: "PATCH", body });
  }

  @Get("packages")
  listPackages() {
    return this.forward("/admin/packages");
  }

  @Post("packages")
  createPackage(@Body() body: Record<string, unknown>) {
    return this.forward("/admin/packages", { method: "POST", body });
  }

  @Get("packages/:packageId")
  getPackage(@Param("packageId") packageId: string) {
    return this.forward(`/admin/packages/${encodeURIComponent(packageId)}`);
  }

  @Patch("packages/:packageId")
  updatePackage(@Param("packageId") packageId: string, @Body() body: Record<string, unknown>) {
    return this.forward(`/admin/packages/${encodeURIComponent(packageId)}`, { method: "PATCH", body });
  }

  @Delete("packages/:packageId")
  deletePackage(@Param("packageId") packageId: string) {
    return this.forward(`/admin/packages/${encodeURIComponent(packageId)}`, { method: "DELETE" });
  }

  @Get("roles")
  listRoles() {
    return this.forward("/admin/roles");
  }

  @Post("roles")
  createRole(@Body() body: Record<string, unknown>) {
    return this.forward("/admin/roles", { method: "POST", body });
  }

  @Get("roles/:roleId/permissions")
  getRolePermissions(@Param("roleId") roleId: string) {
    return this.forward(`/admin/roles/${encodeURIComponent(roleId)}/permissions`);
  }

  @Put("roles/:roleId/permissions")
  updateRolePermissions(@Param("roleId") roleId: string, @Body() body: Record<string, unknown>) {
    return this.forward(`/admin/roles/${encodeURIComponent(roleId)}/permissions`, { method: "PUT", body });
  }

  @Get("roles/:roleId")
  getRole(@Param("roleId") roleId: string) {
    return this.forward(`/admin/roles/${encodeURIComponent(roleId)}`);
  }

  @Patch("roles/:roleId")
  updateRole(@Param("roleId") roleId: string, @Body() body: Record<string, unknown>) {
    return this.forward(`/admin/roles/${encodeURIComponent(roleId)}`, { method: "PATCH", body });
  }

  @Delete("roles/:roleId")
  deleteRole(@Param("roleId") roleId: string) {
    return this.forward(`/admin/roles/${encodeURIComponent(roleId)}`, { method: "DELETE" });
  }

  @Get("permissions")
  listPermissions() {
    return this.forward("/admin/permissions");
  }

  @Get("files")
  listFiles() {
    return this.forward("/admin/files");
  }

  @Get("files/:fileId")
  getFile(@Param("fileId") fileId: string) {
    return this.forward(`/admin/files/${encodeURIComponent(fileId)}`);
  }

  @Patch("files/:fileId")
  updateFile(@Param("fileId") fileId: string, @Body() body: Record<string, unknown>) {
    return this.forward(`/admin/files/${encodeURIComponent(fileId)}`, { method: "PATCH", body });
  }

  @Delete("files/:fileId")
  deleteFile(@Param("fileId") fileId: string) {
    return this.forward(`/admin/files/${encodeURIComponent(fileId)}`, { method: "DELETE" });
  }

  @Get("settings")
  listSettings() {
    return this.forward("/admin/settings");
  }

  @Post("settings")
  createSetting(@Body() body: Record<string, unknown>) {
    return this.forward("/admin/settings", { method: "POST", body });
  }

  @Get("settings/:settingKey")
  getSetting(@Param("settingKey") settingKey: string) {
    return this.forward(`/admin/settings/${encodeURIComponent(settingKey)}`);
  }

  @Patch("settings/:settingKey")
  updateSetting(@Param("settingKey") settingKey: string, @Body() body: Record<string, unknown>) {
    return this.forward(`/admin/settings/${encodeURIComponent(settingKey)}`, { method: "PATCH", body });
  }

  @Delete("settings/:settingKey")
  deleteSetting(@Param("settingKey") settingKey: string) {
    return this.forward(`/admin/settings/${encodeURIComponent(settingKey)}`, { method: "DELETE" });
  }

  @Get("audit-logs")
  listAuditLogs() {
    return this.forward("/admin/audit-logs");
  }

  private forward(path: string, options?: DomainRequestOptions) {
    if (!options) {
      return this.domainGateway.request("backoffice", path);
    }

    return this.domainGateway.request("backoffice", path, options);
  }
}
