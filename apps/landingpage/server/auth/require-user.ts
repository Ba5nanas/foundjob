import "server-only";
import { ApiError } from "../http/api-error";
import { getSession } from "./session";

export async function requireUser() {
  const session = await getSession();
  if (!session) {
    throw new ApiError("UNAUTHENTICATED", "Authentication is required", 401);
  }
  return session;
}
