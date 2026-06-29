import { listJobs } from "@/providers/jobs/jobs.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => listJobs());
}
