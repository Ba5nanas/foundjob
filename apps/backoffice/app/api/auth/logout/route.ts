import { adminLogout } from "@/providers/auth/auth.provider";
import { requireAdmin } from "@/server/auth/require-admin";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function POST() {
  return handleApiRoute(async () => {
    await requireAdmin();
    return adminLogout();
  });
}
