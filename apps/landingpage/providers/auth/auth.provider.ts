import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function login(input: { email: string; password: string }) {
  return createMainControlClient().request("/auth/login", {
    method: "POST",
    body: input
  });
}

export async function logout() {
  return createMainControlClient().request("/auth/logout", {
    method: "POST"
  });
}

export async function registerJobSeeker(input: Record<string, unknown>) {
  return createMainControlClient().request("/auth/register/job-seeker", {
    method: "POST",
    body: input
  });
}

export async function registerCompany(input: Record<string, unknown>) {
  return createMainControlClient().request("/auth/register/company", {
    method: "POST",
    body: input
  });
}
