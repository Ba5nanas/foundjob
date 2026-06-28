import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listApplications() {
  return createMainControlClient().request("/admin/applications");
}
