import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listAdminFiles() {
  return createMainControlClient().request("/admin/files");
}
