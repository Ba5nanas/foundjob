import { refreshAdminSession } from "@/providers/auth/auth.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function POST() {
  return handleApiRoute(() => refreshAdminSession());
}
