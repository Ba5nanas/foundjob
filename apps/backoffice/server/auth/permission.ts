import "server-only";
import { ApiError } from "../http/api-error";
import { getAdminSession } from "./session";

export async function requirePermission(permission: string) {
  const session = await getAdminSession();
  if (!session) {
    throw new ApiError("UNAUTHENTICATED", "Authentication is required", 401);
  }
  if (!session.permissions.includes(permission)) {
    throw new ApiError("FORBIDDEN", "Permission is required", 403);
  }
  return session;
}
