export const mainControlRoutes = {
  health: "/health",
  auth: "/auth",
  jobs: "/jobs",
  companies: "/companies",
  applications: "/applications",
  appointments: "/appointments",
  resumes: "/resumes",
  files: "/files",
  backoffice: "/backoffice"
} as const;

export const explicitNextRoutes = {
  landingpage: [
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/register/job-seeker",
    "/api/auth/register/company",
    "/api/jobs",
    "/api/jobs/search",
    "/api/jobs/[jobId]",
    "/api/jobs/[jobId]/apply",
    "/api/companies",
    "/api/companies/[companyId]",
    "/api/company/profile/logo",
    "/api/company/jobs/[jobId]/applications",
    "/api/seeker/profile/avatar",
    "/api/seeker/resume/export",
    "/api/seeker/resume/download"
  ],
  backoffice: [
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/refresh",
    "/api/admin/me",
    "/api/admin/me/avatar",
    "/api/admin/me/password",
    "/api/admin/admin-users",
    "/api/admin/admin-users/[adminUserId]",
    "/api/admin/admin-users/[adminUserId]/suspend",
    "/api/admin/admin-users/[adminUserId]/activate",
    "/api/admin/admin-users/[adminUserId]/reset-password",
    "/api/admin/admin-users/[adminUserId]/role",
    "/api/admin/roles",
    "/api/admin/roles/[roleId]",
    "/api/admin/roles/[roleId]/permissions",
    "/api/admin/permissions",
    "/api/admin/audit-logs"
  ]
} as const;
