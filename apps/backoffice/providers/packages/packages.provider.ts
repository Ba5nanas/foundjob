import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listPackages() {
  return createMainControlClient().request("/admin/packages");
}
