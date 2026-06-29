import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listJobs() {
  return createMainControlClient().request("/admin/jobs");
}

export async function getJob(jobId: string) {
  return createMainControlClient().request(`/admin/jobs/${jobId}`);
}

export async function updateJob(jobId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/jobs/${jobId}`, { method: "PATCH", body: input });
}

export async function deleteJob(jobId: string) {
  return createMainControlClient().request(`/admin/jobs/${jobId}`, { method: "DELETE" });
}
