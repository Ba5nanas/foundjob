import { listUsers } from "@/providers/users/users.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("users.view");
    return listUsers();
  });
}
