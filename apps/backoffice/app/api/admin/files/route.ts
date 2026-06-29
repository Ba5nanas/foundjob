import { listAdminFiles } from "@/providers/admin-files/admin-files.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("files.view");
    return listAdminFiles();
  });
}
