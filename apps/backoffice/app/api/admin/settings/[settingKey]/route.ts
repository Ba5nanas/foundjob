import { deleteSetting, getSetting, updateSetting } from "@/providers/settings/settings.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ settingKey: string }> }) {
  return handleApiRoute(async () => {
    const { settingKey } = await params;
    await requirePermission("settings.view");
    return getSetting(settingKey);
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ settingKey: string }> }) {
  return handleApiRoute(async () => {
    const { settingKey } = await params;
    await requirePermission("settings.update");
    return updateSetting(settingKey, await parseJsonObject(request));
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ settingKey: string }> }) {
  return handleApiRoute(async () => {
    const { settingKey } = await params;
    await requirePermission("settings.update");
    return deleteSetting(settingKey);
  });
}
