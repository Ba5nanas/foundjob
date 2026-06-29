import { createPackage, listPackages } from "@/providers/packages/packages.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("packages.view");
    return listPackages();
  });
}

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    await requirePermission("packages.create");
    return createPackage(await parseJsonObject(request));
  }, 201);
}
