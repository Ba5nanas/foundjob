import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listAdminFiles() {
  return createMainControlClient().request("/admin/files");
}

export async function getAdminFile(fileId: string) {
  return createMainControlClient().request(`/admin/files/${fileId}`);
}

export async function updateAdminFile(fileId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/files/${fileId}`, { method: "PATCH", body: input });
}

export async function deleteAdminFile(fileId: string) {
  return createMainControlClient().request(`/admin/files/${fileId}`, { method: "DELETE" });
}
