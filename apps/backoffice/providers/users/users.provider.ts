import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listUsers() {
  return createMainControlClient().request("/admin/users");
}
