import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function adminLogin(input: { email: string; password: string }) {
  return createMainControlClient().request("/admin/auth/login", { method: "POST", body: input });
}
