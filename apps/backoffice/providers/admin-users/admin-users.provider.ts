import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listAdminUsers() {
  return createMainControlClient().request("/admin/admin-users");
}

export async function createAdminUser(input: Record<string, unknown>) {
  return createMainControlClient().request("/admin/admin-users", { method: "POST", body: input });
}

export async function getAdminUser(adminUserId: string) {
  return createMainControlClient().request(`/admin/admin-users/${adminUserId}`);
}

export async function updateAdminUser(adminUserId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/admin-users/${adminUserId}`, { method: "PATCH", body: input });
}

export async function deleteAdminUser(adminUserId: string) {
  return createMainControlClient().request(`/admin/admin-users/${adminUserId}`, { method: "DELETE" });
}

export async function suspendAdminUser(adminUserId: string) {
  return createMainControlClient().request(`/admin/admin-users/${adminUserId}/suspend`, { method: "POST" });
}

export async function activateAdminUser(adminUserId: string) {
  return createMainControlClient().request(`/admin/admin-users/${adminUserId}/activate`, { method: "POST" });
}

export async function resetAdminPassword(adminUserId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/admin-users/${adminUserId}/reset-password`, { method: "POST", body: input });
}

export async function assignAdminRole(adminUserId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/admin-users/${adminUserId}/role`, { method: "PUT", body: input });
}
