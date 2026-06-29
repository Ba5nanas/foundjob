import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname } from "node:path";
import { JobService, jobServiceManifest } from "./domain-service";
import { getPublicJob, listPublicJobs, searchPublicJobs } from "./public-jobs";

export { JobService, jobServiceManifest } from "./domain-service";
export { validateEmploymentType } from "./employment-type-policy";
export * from "./public-jobs";

export function getJobServiceSocketPath() {
  return process.env[jobServiceManifest.socketEnv] ?? "/var/run/foundjob/job-service.sock";
}

export async function startJobService() {
  const service = new JobService();
  const socketPath = getJobServiceSocketPath();

  mkdirSync(dirname(socketPath), { recursive: true });

  if (existsSync(socketPath)) {
    unlinkSync(socketPath);
  }

  const server = createServer((request, response) => {
    void handleJobServiceRequest(service, request, response);
  });

  await new Promise<void>((resolve) => {
    server.listen(socketPath, () => resolve());
  });

  return server;
}

if (require.main === module) {
  void startJobService();
}

async function handleJobServiceRequest(service: JobService, request: IncomingMessage, response: ServerResponse) {
  const method = request.method ?? "GET";
  const path = request.url?.split("?")[0] ?? "/";

  if (method === "GET" && path === "/health") {
    writeJson(response, 200, service.health());
    return;
  }

  if (method === "GET" && path === "/jobs") {
    writeJson(response, 200, { ok: true, data: listPublicJobs() });
    return;
  }

  if (method === "POST" && path === "/jobs/search") {
    writeJson(response, 200, { ok: true, data: searchPublicJobs(await readJsonObject(request)) });
    return;
  }

  const jobMatch = path.match(/^\/jobs\/([^/]+)$/);

  if (method === "GET" && jobMatch) {
    const jobId = decodeURIComponent(jobMatch[1] ?? "");
    const job = getPublicJob(jobId);
    writeJson(
      response,
      job ? 200 : 404,
      job ? { ok: true, data: job } : { ok: false, error: { code: "JOB_NOT_FOUND", message: `Job not found: ${jobId}` } }
    );
    return;
  }

  writeJson(response, 404, { ok: false, error: { code: "JOB_ROUTE_NOT_FOUND", message: `${method} ${path}` } });
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
