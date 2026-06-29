import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname } from "node:path";
import { UserService, userServiceManifest } from "./domain-service";
import { uploadSeekerAvatar } from "./seeker-profile";

export { UserService, userServiceManifest } from "./domain-service";
export * from "./seeker-profile";

export function getUserServiceSocketPath() {
  return process.env[userServiceManifest.socketEnv] ?? "/var/run/foundjob/user-service.sock";
}

export async function startUserService() {
  const service = new UserService();
  const socketPath = getUserServiceSocketPath();

  mkdirSync(dirname(socketPath), { recursive: true });

  if (existsSync(socketPath)) {
    unlinkSync(socketPath);
  }

  const server = createServer((request, response) => {
    void handleUserServiceRequest(service, request, response);
  });

  await new Promise<void>((resolve) => {
    server.listen(socketPath, () => resolve());
  });

  return server;
}

if (require.main === module) {
  void startUserService();
}

async function handleUserServiceRequest(service: UserService, request: IncomingMessage, response: ServerResponse) {
  const method = request.method ?? "GET";
  const path = request.url?.split("?")[0] ?? "/";

  if (method === "GET" && path === "/health") {
    writeJson(response, 200, service.health());
    return;
  }

  if (method === "POST" && path === "/seeker/profile/avatar") {
    writeJson(response, 200, { ok: true, data: uploadSeekerAvatar(await readJsonObject(request)) });
    return;
  }

  writeJson(response, 404, { ok: false, error: { code: "USER_ROUTE_NOT_FOUND", message: `${method} ${path}` } });
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
