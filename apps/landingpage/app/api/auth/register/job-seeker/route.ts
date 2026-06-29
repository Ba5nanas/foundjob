import { registerJobSeeker } from "@/providers/auth/auth.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function POST(request: Request) {
  return handleApiRoute(async () => registerJobSeeker(await parseJsonObject(request)), 201);
}
