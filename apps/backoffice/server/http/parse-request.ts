import { ApiError } from "./api-error";

export async function parseJsonObject(request: Request): Promise<Record<string, unknown>> {
  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ApiError("INVALID_JSON", "Request body must be a JSON object", 400);
  }
  return body as Record<string, unknown>;
}
