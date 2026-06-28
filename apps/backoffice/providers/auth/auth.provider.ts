import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function adminLogin(input: { email: string; password: string }) {
  return createMainControlClient().request("/admin/auth/login", { method: "POST", body: input });
}

export async function adminLogout() {
  return createMainControlClient().request("/admin/auth/logout", { method: "POST" });
}

export async function refreshAdminSession() {
  return createMainControlClient().request("/admin/auth/refresh", { method: "POST" });
}
