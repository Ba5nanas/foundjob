import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function getSettings() {
  return createMainControlClient().request("/admin/settings");
}
