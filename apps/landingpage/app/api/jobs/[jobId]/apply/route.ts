import { applyToJob } from "@/providers/applications/applications.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function POST(request: Request, { params }: { params: Promise<{ jobId: string }> }) {
  return handleApiRoute(async () => {
    const { jobId } = await params;
    const body = await parseJsonObject(request);

    return applyToJob({
      jobId,
      resumeId: typeof body.resumeId === "string" ? body.resumeId : undefined
    });
  }, 201);
}
