import { getCompany } from "@/providers/companies/companies.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET(_request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  return handleApiRoute(async () => {
    const { companyId } = await params;
    return getCompany(companyId);
  });
}
