export enum BackofficeRole {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  SUPPORT = "SUPPORT",
  CONTENT_MANAGER = "CONTENT_MANAGER",
  FINANCE = "FINANCE",
  VIEWER = "VIEWER"
}

export const backofficeRoleLevels: Record<BackofficeRole, number> = {
  [BackofficeRole.SUPERADMIN]: 100,
  [BackofficeRole.ADMIN]: 80,
  [BackofficeRole.SUPPORT]: 40,
  [BackofficeRole.CONTENT_MANAGER]: 50,
  [BackofficeRole.FINANCE]: 60,
  [BackofficeRole.VIEWER]: 10
};
