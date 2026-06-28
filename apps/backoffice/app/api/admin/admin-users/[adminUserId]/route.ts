import { deleteAdminUser, getAdminUser, updateAdminUser } from "@/providers/admin-users/admin-users.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ adminUserId: string }> }) {
  return handleApiRoute(async () => {
    await requirePermission("admin_users.view");
    const { adminUserId } = await params;
    return getAdminUser(adminUserId);
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ adminUserId: string }> }) {
  return handleApiRoute(async () => {
    await requirePermission("admin_users.update");
    const { adminUserId } = await params;
    return updateAdminUser(adminUserId, await parseJsonObject(request));
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ adminUserId: string }> }) {
  return handleApiRoute(async () => {
    await requirePermission("admin_users.delete");
    const { adminUserId } = await params;
    return deleteAdminUser(adminUserId);
  });
}
