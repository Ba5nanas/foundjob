import { deleteRole, getRole, updateRole } from "@/providers/roles/roles.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ roleId: string }> }) {
  return handleApiRoute(async () => {
    await requirePermission("roles.view");
    const { roleId } = await params;
    return getRole(roleId);
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ roleId: string }> }) {
  return handleApiRoute(async () => {
    await requirePermission("roles.update");
    const { roleId } = await params;
    return updateRole(roleId, await parseJsonObject(request));
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ roleId: string }> }) {
  return handleApiRoute(async () => {
    await requirePermission("roles.delete");
    const { roleId } = await params;
    return deleteRole(roleId);
  });
}
