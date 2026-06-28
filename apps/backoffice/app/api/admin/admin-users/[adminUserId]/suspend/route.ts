import { suspendAdminUser } from "@/providers/admin-users/admin-users.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function POST(_request: Request, { params }: { params: Promise<{ adminUserId: string }> }) {
  return handleApiRoute(async () => {
    await requirePermission("admin_users.suspend");
    const { adminUserId } = await params;
    return suspendAdminUser(adminUserId);
  });
}
