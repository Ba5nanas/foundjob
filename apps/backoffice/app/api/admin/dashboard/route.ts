import { getDashboard } from "@/providers/dashboard/dashboard.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("dashboard.view");
    return getDashboard();
  });
}
