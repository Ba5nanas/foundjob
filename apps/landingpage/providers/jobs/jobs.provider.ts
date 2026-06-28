import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function searchJobs(input: { keyword?: string; location?: string }) {
  return createMainControlClient().request("/jobs/search", {
    method: "POST",
    body: input
  });
}
