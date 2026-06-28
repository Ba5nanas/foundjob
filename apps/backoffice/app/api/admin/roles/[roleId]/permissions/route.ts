import { getRolePermissions, updateRolePermissions } from "@/providers/roles/roles.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ roleId: string }> }) {
  return handleApiRoute(async () => {
    await requirePermission("roles.view");
    const { roleId } = await params;
    return getRolePermissions(roleId);
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ roleId: string }> }) {
  return handleApiRoute(async () => {
    await requirePermission("roles.assign_permissions");
    const { roleId } = await params;
    const body = await parseJsonObject(request);
    return updateRolePermissions({ roleId, permissions: Array.isArray(body.permissions) ? body.permissions.map(String) : [] });
  });
}
