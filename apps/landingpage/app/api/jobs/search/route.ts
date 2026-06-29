import { searchJobs } from "@/providers/jobs/jobs.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    const body = await parseJsonObject(request);
    return searchJobs({
      keyword: typeof body.keyword === "string" ? body.keyword : "",
      location: typeof body.location === "string" ? body.location : ""
    });
  });
}
