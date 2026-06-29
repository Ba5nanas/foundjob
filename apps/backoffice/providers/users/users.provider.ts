import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listUsers() {
  return createMainControlClient().request("/admin/users");
}

export async function getUser(userId: string) {
  return createMainControlClient().request(`/admin/users/${userId}`);
}

export async function updateUser(userId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/users/${userId}`, { method: "PATCH", body: input });
}

export async function deleteUser(userId: string) {
  return createMainControlClient().request(`/admin/users/${userId}`, { method: "DELETE" });
}
