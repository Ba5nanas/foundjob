import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function getDashboard() {
  return createMainControlClient().request("/admin/dashboard");
}
