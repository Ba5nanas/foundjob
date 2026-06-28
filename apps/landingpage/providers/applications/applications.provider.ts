import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function applyToJob(input: { jobId: string; resumeId?: string }) {
  return createMainControlClient().request(`/jobs/${input.jobId}/apply`, {
    method: "POST",
    body: input
  });
}
