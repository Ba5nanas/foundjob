export function canManageRole(actorLevel: number, targetLevel: number): boolean {
  return actorLevel > targetLevel;
}

export function requireCanManageRoleLevel(actorLevel: number, targetLevel: number): void {
  if (!canManageRole(actorLevel, targetLevel)) {
    throw new Error("Actor cannot manage a role level equal to or higher than their own");
  }
}

export function canAssignPermission(actorPermissions: readonly string[], permission: string, isSuperadmin = false): boolean {
  return isSuperadmin || actorPermissions.includes(permission);
}
