import { deleteUser, getUser, updateUser } from "@/providers/users/users.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ userId: string }> }) {
  return handleApiRoute(async () => {
    const { userId } = await params;
    await requirePermission("users.view");
    return getUser(userId);
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  return handleApiRoute(async () => {
    const { userId } = await params;
    await requirePermission("users.update");
    return updateUser(userId, await parseJsonObject(request));
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ userId: string }> }) {
  return handleApiRoute(async () => {
    const { userId } = await params;
    await requirePermission("users.delete");
    return deleteUser(userId);
  });
}
