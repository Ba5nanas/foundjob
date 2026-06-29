import { deleteAdminFile, getAdminFile, updateAdminFile } from "@/providers/admin-files/admin-files.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ fileId: string }> }) {
  return handleApiRoute(async () => {
    const { fileId } = await params;
    await requirePermission("files.view");
    return getAdminFile(fileId);
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ fileId: string }> }) {
  return handleApiRoute(async () => {
    const { fileId } = await params;
    await requirePermission("files.quarantine");
    return updateAdminFile(fileId, await parseJsonObject(request));
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ fileId: string }> }) {
  return handleApiRoute(async () => {
    const { fileId } = await params;
    await requirePermission("files.delete");
    return deleteAdminFile(fileId);
  });
}
