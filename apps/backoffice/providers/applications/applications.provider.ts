import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listApplications() {
  return createMainControlClient().request("/admin/applications");
}

export async function getApplication(applicationId: string) {
  return createMainControlClient().request(`/admin/applications/${applicationId}`);
}

export async function updateApplication(applicationId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/applications/${applicationId}`, { method: "PATCH", body: input });
}
