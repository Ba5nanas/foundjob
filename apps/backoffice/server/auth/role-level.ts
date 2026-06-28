import "server-only";
import { canManageRole } from "@foundjob/shared-auth";
import { ApiError } from "../http/api-error";
import { requireAdmin } from "./require-admin";

export async function requireRoleLevelBelow(targetRoleLevel: number) {
  const session = await requireAdmin();
  if (!canManageRole(session.roleLevel, targetRoleLevel)) {
    throw new ApiError("ROLE_LEVEL_FORBIDDEN", "Cannot manage an equal or higher backoffice role level", 403);
  }
  return session;
}

export async function requireCanManageAdmin(targetAdminUserId: string) {
  const session = await requireAdmin();
  if (!targetAdminUserId) {
    throw new ApiError("INVALID_ADMIN_USER", "Target admin user id is required", 400);
  }
  return session;
}

export async function requireCanManageRole(targetRoleId: string) {
  const session = await requireAdmin();
  if (!targetRoleId) {
    throw new ApiError("INVALID_ROLE", "Target role id is required", 400);
  }
  return session;
}
