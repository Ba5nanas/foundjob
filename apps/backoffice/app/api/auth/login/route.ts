import { adminLogin } from "@/providers/auth/auth.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    const body = await parseJsonObject(request);
    return adminLogin({ email: String(body.email ?? ""), password: String(body.password ?? "") });
  });
}
