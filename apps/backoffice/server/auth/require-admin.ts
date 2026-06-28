import "server-only";
import { ApiError } from "../http/api-error";
import { getAdminSession } from "./session";

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new ApiError("UNAUTHENTICATED", "Authentication is required", 401);
  }
  return session;
}
