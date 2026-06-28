import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listPermissions() {
  return createMainControlClient().request("/admin/permissions");
}
