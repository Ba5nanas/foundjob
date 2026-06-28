import { listPermissions } from "@/providers/permissions/permissions.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("permissions.view");
    return listPermissions();
  });
}
