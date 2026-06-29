import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listJobs() {
  return createMainControlClient().request("/jobs");
}

export async function searchJobs(input: { keyword?: string; location?: string }) {
  return createMainControlClient().request("/jobs/search", {
    method: "POST",
    body: input
  });
}

export async function getJob(jobId: string) {
  return createMainControlClient().request(`/jobs/${jobId}`);
}
