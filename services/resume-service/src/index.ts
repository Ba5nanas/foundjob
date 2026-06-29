import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname } from "node:path";
import { ResumeService, resumeServiceManifest } from "./domain-service";
import { downloadResume, exportResume } from "./public-resumes";

export { ResumeService, resumeServiceManifest } from "./domain-service";
export * from "./public-resumes";

export function getResumeServiceSocketPath() {
  return process.env[resumeServiceManifest.socketEnv] ?? "/var/run/foundjob/resume-service.sock";
}

export async function startResumeService() {
  const service = new ResumeService();
  const socketPath = getResumeServiceSocketPath();

  mkdirSync(dirname(socketPath), { recursive: true });

  if (existsSync(socketPath)) {
    unlinkSync(socketPath);
  }

  const server = createServer((request, response) => {
    void handleResumeServiceRequest(service, request, response);
  });

  await new Promise<void>((resolve) => {
    server.listen(socketPath, () => resolve());
  });

  return server;
}

if (require.main === module) {
  void startResumeService();
}

async function handleResumeServiceRequest(service: ResumeService, request: IncomingMessage, response: ServerResponse) {
  const method = request.method ?? "GET";
  const path = request.url?.split("?")[0] ?? "/";

  if (method === "GET" && path === "/health") {
    writeJson(response, 200, service.health());
    return;
  }

  if (method === "POST" && path === "/seeker/resume/export") {
    writeJson(response, 202, { ok: true, data: exportResume(await readJsonObject(request)) });
    return;
  }

  if (method === "POST" && path === "/seeker/resume/download") {
    writeJson(response, 200, { ok: true, data: downloadResume(await readJsonObject(request)) });
    return;
  }

  writeJson(response, 404, { ok: false, error: { code: "RESUME_ROUTE_NOT_FOUND", message: `${method} ${path}` } });
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
