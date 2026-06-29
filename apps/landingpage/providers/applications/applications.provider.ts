import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function applyToJob(input: { jobId: string; resumeId?: string }) {
  return createMainControlClient().request(`/jobs/${input.jobId}/apply`, {
    method: "POST",
    body: input
  });
}

export async function listCompanyJobApplications(jobId: string) {
  return createMainControlClient().request(`/company/jobs/${jobId}/applications`);
}
