import { getJob } from "@/providers/jobs/jobs.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET(_request: Request, { params }: { params: Promise<{ jobId: string }> }) {
  return handleApiRoute(async () => {
    const { jobId } = await params;
    return getJob(jobId);
  });
}
