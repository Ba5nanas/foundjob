import { getCurrentAdmin } from "@/providers/admin-me/admin-me.provider";
import { requireAdmin } from "@/server/auth/require-admin";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => {
    await requireAdmin();
    return getCurrentAdmin();
  });
}
