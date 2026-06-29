import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname } from "node:path";
import { ApplicationService, applicationServiceManifest } from "./domain-service";
import { applyToPublicJob, listCompanyJobApplications } from "./public-applications";

export { ApplicationService, applicationServiceManifest } from "./domain-service";
export { applicationWorkflowTransitions, canTransitionApplicationStatus } from "./hiring-workflow";
export * from "./public-applications";

export function getApplicationServiceSocketPath() {
  return process.env[applicationServiceManifest.socketEnv] ?? "/var/run/foundjob/application-service.sock";
}

export async function startApplicationService() {
  const service = new ApplicationService();
  const socketPath = getApplicationServiceSocketPath();

  mkdirSync(dirname(socketPath), { recursive: true });

  if (existsSync(socketPath)) {
    unlinkSync(socketPath);
  }

  const server = createServer((request, response) => {
    void handleApplicationServiceRequest(service, request, response);
  });

  await new Promise<void>((resolve) => {
    server.listen(socketPath, () => resolve());
  });

  return server;
}

if (require.main === module) {
  void startApplicationService();
}

async function handleApplicationServiceRequest(
  service: ApplicationService,
  request: IncomingMessage,
  response: ServerResponse
) {
  const method = request.method ?? "GET";
  const path = request.url?.split("?")[0] ?? "/";

  if (method === "GET" && path === "/health") {
    writeJson(response, 200, service.health());
    return;
  }

  const jobApplyMatch = path.match(/^\/jobs\/([^/]+)\/apply$/);

  if (method === "POST" && jobApplyMatch) {
    const jobId = decodeURIComponent(jobApplyMatch[1] ?? "");
    writeJson(response, 201, { ok: true, data: applyToPublicJob(jobId, await readJsonObject(request)) });
    return;
  }

  const companyJobApplicationsMatch = path.match(/^\/company\/jobs\/([^/]+)\/applications$/);

  if (method === "GET" && companyJobApplicationsMatch) {
    const jobId = decodeURIComponent(companyJobApplicationsMatch[1] ?? "");
    writeJson(response, 200, { ok: true, data: listCompanyJobApplications(jobId) });
    return;
  }

  writeJson(response, 404, {
    ok: false,
    error: { code: "APPLICATION_ROUTE_NOT_FOUND", message: `${method} ${path}` }
  });
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
