import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listAppointments() {
  return createMainControlClient().request("/appointments");
}
