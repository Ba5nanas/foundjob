import { listCompanies } from "@/providers/companies/companies.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => listCompanies());
}
