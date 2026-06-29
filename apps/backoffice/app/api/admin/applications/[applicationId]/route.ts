import { getApplication, updateApplication } from "@/providers/applications/applications.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ applicationId: string }> }) {
  return handleApiRoute(async () => {
    const { applicationId } = await params;
    await requirePermission("applications.view");
    return getApplication(applicationId);
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ applicationId: string }> }) {
  return handleApiRoute(async () => {
    const { applicationId } = await params;
    await requirePermission("applications.update");
    return updateApplication(applicationId, await parseJsonObject(request));
  });
}
