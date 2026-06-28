import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listJobs() {
  return createMainControlClient().request("/admin/jobs");
}
