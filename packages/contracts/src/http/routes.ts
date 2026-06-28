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
    "/api/admin/dashboard",
    "/api/admin/users",
    "/api/admin/users/[userId]",
    "/api/admin/companies",
    "/api/admin/jobs",
    "/api/admin/roles",
    "/api/admin/roles/[roleId]/permissions",
    "/api/admin/settings",
    "/api/admin/files",
    "/api/admin/audit-logs"
  ]
} as const;
