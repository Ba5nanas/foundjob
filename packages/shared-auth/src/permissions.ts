export const permissions = [
  "dashboard.view",
  "users.view",
  "users.create",
  "users.update",
  "users.suspend",
  "companies.view",
  "companies.update",
  "companies.suspend",
  "jobs.view",
  "jobs.update",
  "jobs.close",
  "applications.view",
  "roles.view",
  "roles.create",
  "roles.update",
  "roles.delete",
  "permissions.view",
  "settings.view",
  "settings.update",
  "files.view",
  "files.quarantine",
  "files.delete",
  "audit_logs.view"
] as const;

export type Permission = (typeof permissions)[number];
