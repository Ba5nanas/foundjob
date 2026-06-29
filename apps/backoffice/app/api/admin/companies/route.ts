import { listCompanies } from "@/providers/companies/companies.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("companies.view");
    return listCompanies();
  });
}
