import { BackofficeRole } from "@foundjob/shared-types";

export interface ManageableRole {
  slug: string;
  level: number;
}

export function canManageTargetRole(actor: ManageableRole, target: ManageableRole): boolean {
  if (actor.slug === BackofficeRole.SUPERADMIN || actor.slug === "superadmin") {
    return true;
  }

  return actor.level > target.level;
}

export function assertCanManageTargetRole(actor: ManageableRole, target: ManageableRole): void {
  if (!canManageTargetRole(actor, target)) {
    throw new Error("Backoffice admin cannot manage a role/user with an equal or higher role level");
  }
}
