import { assignAdminRole } from "@/providers/admin-users/admin-users.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function PUT(request: Request, { params }: { params: Promise<{ adminUserId: string }> }) {
  return handleApiRoute(async () => {
    await requirePermission("admin_users.assign_role");
    const { adminUserId } = await params;
    return assignAdminRole(adminUserId, await parseJsonObject(request));
  });
}
