import { listApplications } from "@/providers/applications/applications.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("applications.view");
    return listApplications();
  });
}
