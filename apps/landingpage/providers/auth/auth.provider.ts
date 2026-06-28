import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function login(input: { email: string; password: string }) {
  return createMainControlClient().request("/auth/login", {
    method: "POST",
    body: input
  });
}
