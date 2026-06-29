import { requestResumeExport } from "@/providers/resume/resume.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    const body = await parseJsonObject(request);

    return requestResumeExport({
      resumeId: typeof body.resumeId === "string" ? body.resumeId : "resume-demo",
      format: typeof body.format === "string" ? body.format : "pdf"
    });
  }, 202);
}
