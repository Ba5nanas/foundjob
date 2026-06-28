import { createAdminUser, listAdminUsers } from "@/providers/admin-users/admin-users.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("admin_users.view");
    return listAdminUsers();
  });
}

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    await requirePermission("admin_users.create");
    return createAdminUser(await parseJsonObject(request));
  }, 201);
}
