import { requestResumeDownload } from "@/providers/resume/resume.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    const body = await parseJsonObject(request);

    return requestResumeDownload({
      resumeId: typeof body.resumeId === "string" ? body.resumeId : "resume-demo"
    });
  });
}
