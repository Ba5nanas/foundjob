import { createRole, listRoles } from "@/providers/roles/roles.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("roles.view");
    return listRoles();
  });
}

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    await requirePermission("roles.create");
    return createRole(await parseJsonObject(request));
  }, 201);
}
