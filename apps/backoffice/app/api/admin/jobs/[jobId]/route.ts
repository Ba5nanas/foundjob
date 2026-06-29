import { deleteJob, getJob, updateJob } from "@/providers/jobs/jobs.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ jobId: string }> }) {
  return handleApiRoute(async () => {
    const { jobId } = await params;
    await requirePermission("jobs.view");
    return getJob(jobId);
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ jobId: string }> }) {
  return handleApiRoute(async () => {
    const { jobId } = await params;
    await requirePermission("jobs.update");
    return updateJob(jobId, await parseJsonObject(request));
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ jobId: string }> }) {
  return handleApiRoute(async () => {
    const { jobId } = await params;
    await requirePermission("jobs.delete");
    return deleteJob(jobId);
  });
}
