import { describe, expect, it } from "vitest";
import { explicitNextRoutes, mainControlBackofficeAdminRoutes, mainControlPublicRoutes, mainControlRoutes } from "./routes";

describe("mainControlRoutes", () => {
  it("keeps domain gateway health routes explicit", () => {
    expect(mainControlRoutes.domains).toBe("/domains");
    expect(mainControlRoutes.domainHealth).toBe("/domains/[domain]/health");
  });
});

describe("explicitNextRoutes", () => {
  it("keeps public job detail and apply routes explicit", () => {
    expect(explicitNextRoutes.landingpage).toContain("/api/jobs/[jobId]");
    expect(explicitNextRoutes.landingpage).toContain("/api/jobs/[jobId]/apply");
  });

  it("keeps backoffice admin user routes explicit", () => {
    expect(explicitNextRoutes.backoffice).toContain("/api/admin/admin-users");
    expect(explicitNextRoutes.backoffice).toContain("/api/admin/admin-users/[adminUserId]");
    expect(explicitNextRoutes.backoffice).toContain("/api/admin/admin-users/[adminUserId]/role");
  });

  it("does not define catch-all proxy routes for Next.js apps", () => {
    const allRoutes = [...explicitNextRoutes.landingpage, ...explicitNextRoutes.backoffice];

    expect(allRoutes.filter((route) => route.includes("[..."))).toEqual([]);
  });
});

describe("mainControlBackofficeAdminRoutes", () => {
  it("keeps operational backoffice forwarding routes explicit", () => {
    expect(mainControlBackofficeAdminRoutes.dashboard).toBe("/backoffice/admin/dashboard");
    expect(mainControlBackofficeAdminRoutes.currentAdmin).toBe("/backoffice/admin/me");
    expect(mainControlBackofficeAdminRoutes.users).toBe("/backoffice/admin/users");
    expect(mainControlBackofficeAdminRoutes.userDetail).toBe("/backoffice/admin/users/[userId]");
    expect(mainControlBackofficeAdminRoutes.companies).toBe("/backoffice/admin/companies");
    expect(mainControlBackofficeAdminRoutes.companyDetail).toBe("/backoffice/admin/companies/[companyId]");
    expect(mainControlBackofficeAdminRoutes.jobs).toBe("/backoffice/admin/jobs");
    expect(mainControlBackofficeAdminRoutes.jobDetail).toBe("/backoffice/admin/jobs/[jobId]");
    expect(mainControlBackofficeAdminRoutes.applications).toBe("/backoffice/admin/applications");
    expect(mainControlBackofficeAdminRoutes.applicationDetail).toBe(
      "/backoffice/admin/applications/[applicationId]"
    );
    expect(mainControlBackofficeAdminRoutes.packages).toBe("/backoffice/admin/packages");
    expect(mainControlBackofficeAdminRoutes.packageDetail).toBe("/backoffice/admin/packages/[packageId]");
    expect(mainControlBackofficeAdminRoutes.files).toBe("/backoffice/admin/files");
    expect(mainControlBackofficeAdminRoutes.fileDetail).toBe("/backoffice/admin/files/[fileId]");
    expect(mainControlBackofficeAdminRoutes.settings).toBe("/backoffice/admin/settings");
    expect(mainControlBackofficeAdminRoutes.settingDetail).toBe("/backoffice/admin/settings/[settingKey]");
  });

  it("keeps access-control backoffice forwarding routes explicit", () => {
    expect(mainControlBackofficeAdminRoutes.roles).toBe("/backoffice/admin/roles");
    expect(mainControlBackofficeAdminRoutes.roleDetail).toBe("/backoffice/admin/roles/[roleId]");
    expect(mainControlBackofficeAdminRoutes.rolePermissions).toBe("/backoffice/admin/roles/[roleId]/permissions");
    expect(mainControlBackofficeAdminRoutes.permissions).toBe("/backoffice/admin/permissions");
    expect(mainControlBackofficeAdminRoutes.auditLogs).toBe("/backoffice/admin/audit-logs");
  });

  it("keeps admin user forwarding routes explicit", () => {
    expect(mainControlBackofficeAdminRoutes.adminUsers).toBe("/backoffice/admin/admin-users");
    expect(mainControlBackofficeAdminRoutes.adminUserDetail).toBe("/backoffice/admin/admin-users/[adminUserId]");
    expect(mainControlBackofficeAdminRoutes.adminUserSuspend).toBe("/backoffice/admin/admin-users/[adminUserId]/suspend");
    expect(mainControlBackofficeAdminRoutes.adminUserActivate).toBe("/backoffice/admin/admin-users/[adminUserId]/activate");
    expect(mainControlBackofficeAdminRoutes.adminUserResetPassword).toBe(
      "/backoffice/admin/admin-users/[adminUserId]/reset-password"
    );
    expect(mainControlBackofficeAdminRoutes.adminUserRole).toBe("/backoffice/admin/admin-users/[adminUserId]/role");
  });

  it("keeps appointment forwarding routes explicit", () => {
    expect(mainControlBackofficeAdminRoutes.appointments).toBe("/backoffice/admin/appointments");
    expect(mainControlBackofficeAdminRoutes.appointmentDetail).toBe("/backoffice/admin/appointments/[appointmentId]");
  });
});

describe("mainControlPublicRoutes", () => {
  it("keeps public auth forwarding routes explicit", () => {
    expect(mainControlPublicRoutes.authLogin).toBe("/auth/login");
    expect(mainControlPublicRoutes.authLogout).toBe("/auth/logout");
    expect(mainControlPublicRoutes.registerJobSeeker).toBe("/auth/register/job-seeker");
    expect(mainControlPublicRoutes.registerCompany).toBe("/auth/register/company");
  });

  it("keeps public job and company forwarding routes explicit", () => {
    expect(mainControlPublicRoutes.jobs).toBe("/jobs");
    expect(mainControlPublicRoutes.jobSearch).toBe("/jobs/search");
    expect(mainControlPublicRoutes.jobDetail).toBe("/jobs/[jobId]");
    expect(mainControlPublicRoutes.jobApply).toBe("/jobs/[jobId]/apply");
    expect(mainControlPublicRoutes.companies).toBe("/companies");
    expect(mainControlPublicRoutes.companyDetail).toBe("/companies/[companyId]");
  });

  it("keeps public profile, resume, and company workspace forwarding routes explicit", () => {
    expect(mainControlPublicRoutes.companyProfileLogo).toBe("/company/profile/logo");
    expect(mainControlPublicRoutes.companyJobApplications).toBe("/company/jobs/[jobId]/applications");
    expect(mainControlPublicRoutes.seekerProfileAvatar).toBe("/seeker/profile/avatar");
    expect(mainControlPublicRoutes.seekerResumeExport).toBe("/seeker/resume/export");
    expect(mainControlPublicRoutes.seekerResumeDownload).toBe("/seeker/resume/download");
  });
});
