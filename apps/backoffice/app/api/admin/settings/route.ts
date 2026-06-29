import { createSettingDraft, getSettings } from "@/providers/settings/settings.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("settings.view");
    return getSettings();
  });
}

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    await requirePermission("settings.update");
    return createSettingDraft(await parseJsonObject(request));
  }, 201);
}
