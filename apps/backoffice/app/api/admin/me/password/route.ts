import { updateCurrentAdminPassword } from "@/providers/admin-me/admin-me.provider";
import { requireAdmin } from "@/server/auth/require-admin";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function PUT(request: Request) {
  return handleApiRoute(async () => {
    await requireAdmin();
    return updateCurrentAdminPassword(await parseJsonObject(request));
  });
}
