import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function getCurrentAdmin() {
  return createMainControlClient().request("/admin/me");
}

export async function updateCurrentAdmin(input: Record<string, unknown>) {
  return createMainControlClient().request("/admin/me", { method: "PUT", body: input });
}

export async function updateCurrentAdminPassword(input: Record<string, unknown>) {
  return createMainControlClient().request("/admin/me/password", { method: "PUT", body: input });
}

export async function updateCurrentAdminAvatar(input: { fileName?: string; contentType?: string; size?: number }) {
  return createMainControlClient().request("/admin/me/avatar", { method: "POST", body: input });
}
