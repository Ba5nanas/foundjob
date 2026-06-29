import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname } from "node:path";
import { AuthService, authServiceManifest } from "./domain-service";
import { loginPublicUser, logoutPublicUser, registerCompany, registerJobSeeker } from "./public-auth";

export { AuthService, authServiceManifest } from "./domain-service";
export * from "./public-auth";

export function getAuthServiceSocketPath() {
  return process.env[authServiceManifest.socketEnv] ?? "/var/run/foundjob/auth-service.sock";
}

export async function startAuthService() {
  const service = new AuthService();
  const socketPath = getAuthServiceSocketPath();

  mkdirSync(dirname(socketPath), { recursive: true });

  if (existsSync(socketPath)) {
    unlinkSync(socketPath);
  }

  const server = createServer((request, response) => {
    void handleAuthServiceRequest(service, request, response);
  });

  await new Promise<void>((resolve) => {
    server.listen(socketPath, () => resolve());
  });

  return server;
}

if (require.main === module) {
  void startAuthService();
}

async function handleAuthServiceRequest(service: AuthService, request: IncomingMessage, response: ServerResponse) {
  const method = request.method ?? "GET";
  const path = request.url?.split("?")[0] ?? "/";

  if (method === "GET" && path === "/health") {
    writeJson(response, 200, service.health());
    return;
  }

  if (method === "POST" && path === "/auth/login") {
    writeJson(response, 200, { ok: true, data: loginPublicUser(await readJsonObject(request)) });
    return;
  }

  if (method === "POST" && path === "/auth/logout") {
    writeJson(response, 200, { ok: true, data: logoutPublicUser() });
    return;
  }

  if (method === "POST" && path === "/auth/register/job-seeker") {
    writeJson(response, 201, { ok: true, data: registerJobSeeker(await readJsonObject(request)) });
    return;
  }

  if (method === "POST" && path === "/auth/register/company") {
    writeJson(response, 201, { ok: true, data: registerCompany(await readJsonObject(request)) });
    return;
  }

  writeJson(response, 404, { ok: false, error: { code: "AUTH_ROUTE_NOT_FOUND", message: `${method} ${path}` } });
}

function writeJson(response: ServerResponse, statusCode: number, payload: unknown) {
  response.writeHead(statusCode, { "content-type": "application/json" });
  response.end(JSON.stringify(payload));
}

function readJsonObject(request: IncomingMessage) {
  return new Promise<Record<string, unknown>>((resolve) => {
    const chunks: Buffer[] = [];

    request.on("data", (chunk: Buffer | string) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    });

    request.on("end", () => {
      const text = Buffer.concat(chunks).toString("utf8");

      if (!text) {
        resolve({});
        return;
      }

      try {
        const parsed = JSON.parse(text) as unknown;
        resolve(parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {});
      } catch {
        resolve({});
      }
    });
  });
}
