import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function getSettings() {
  return createMainControlClient().request("/admin/settings");
}

export async function createSettingDraft(input: Record<string, unknown>) {
  return createMainControlClient().request("/admin/settings", { method: "POST", body: input });
}

export async function getSetting(settingKey: string) {
  return createMainControlClient().request(`/admin/settings/${settingKey}`);
}

export async function updateSetting(settingKey: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/settings/${settingKey}`, { method: "PATCH", body: input });
}

export async function deleteSetting(settingKey: string) {
  return createMainControlClient().request(`/admin/settings/${settingKey}`, { method: "DELETE" });
}
