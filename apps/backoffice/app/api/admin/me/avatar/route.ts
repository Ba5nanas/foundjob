import { updateCurrentAdminAvatar } from "@/providers/admin-me/admin-me.provider";
import { requireAdmin } from "@/server/auth/require-admin";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    await requireAdmin();
    const formData = await request.formData();
    const avatar = formData.get("avatar");
    const file = avatar instanceof File ? avatar : null;

    return updateCurrentAdminAvatar({
      fileName: file?.name,
      contentType: file?.type,
      size: file?.size
    });
  });
}
