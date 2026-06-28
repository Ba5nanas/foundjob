import "server-only";
import { ApiError } from "../http/api-error";
import { requireUser } from "./require-user";

export async function requireCompanyUser() {
  const session = await requireUser();
  if (session.role !== "COMPANY_USER") {
    throw new ApiError("FORBIDDEN", "Company user access is required", 403);
  }
  return session;
}
