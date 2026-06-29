import { deletePackage, getPackage, updatePackage } from "@/providers/packages/packages.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ packageId: string }> }) {
  return handleApiRoute(async () => {
    const { packageId } = await params;
    await requirePermission("packages.view");
    return getPackage(packageId);
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ packageId: string }> }) {
  return handleApiRoute(async () => {
    const { packageId } = await params;
    await requirePermission("packages.update");
    return updatePackage(packageId, await parseJsonObject(request));
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ packageId: string }> }) {
  return handleApiRoute(async () => {
    const { packageId } = await params;
    await requirePermission("packages.delete");
    return deletePackage(packageId);
  });
}
