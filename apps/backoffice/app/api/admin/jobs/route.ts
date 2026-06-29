import { listJobs } from "@/providers/jobs/jobs.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("jobs.view");
    return listJobs();
  });
}
