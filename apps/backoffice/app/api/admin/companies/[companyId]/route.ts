import { deleteCompany, getCompany, updateCompany } from "@/providers/companies/companies.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  return handleApiRoute(async () => {
    const { companyId } = await params;
    await requirePermission("companies.view");
    return getCompany(companyId);
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  return handleApiRoute(async () => {
    const { companyId } = await params;
    await requirePermission("companies.update");
    return updateCompany(companyId, await parseJsonObject(request));
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ companyId: string }> }) {
  return handleApiRoute(async () => {
    const { companyId } = await params;
    await requirePermission("companies.delete");
    return deleteCompany(companyId);
  });
}
