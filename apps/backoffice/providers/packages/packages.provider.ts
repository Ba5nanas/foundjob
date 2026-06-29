import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listPackages() {
  return createMainControlClient().request("/admin/packages");
}

export async function createPackage(input: Record<string, unknown>) {
  return createMainControlClient().request("/admin/packages", { method: "POST", body: input });
}

export async function getPackage(packageId: string) {
  return createMainControlClient().request(`/admin/packages/${packageId}`);
}

export async function updatePackage(packageId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/packages/${packageId}`, { method: "PATCH", body: input });
}

export async function deletePackage(packageId: string) {
  return createMainControlClient().request(`/admin/packages/${packageId}`, { method: "DELETE" });
}
