import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listCompanies() {
  return createMainControlClient().request("/companies");
}
