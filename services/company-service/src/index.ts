import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname } from "node:path";
import { CompanyService, companyServiceManifest } from "./domain-service";
import { getPublicCompany, listPublicCompanies, uploadCompanyLogo } from "./public-companies";

export { CompanyService, companyServiceManifest } from "./domain-service";
export * from "./public-companies";

export function getCompanyServiceSocketPath() {
  return process.env[companyServiceManifest.socketEnv] ?? "/var/run/foundjob/company-service.sock";
}

export async function startCompanyService() {
  const service = new CompanyService();
  const socketPath = getCompanyServiceSocketPath();

  mkdirSync(dirname(socketPath), { recursive: true });

  if (existsSync(socketPath)) {
    unlinkSync(socketPath);
  }

  const server = createServer((request, response) => {
    void handleCompanyServiceRequest(service, request, response);
  });

  await new Promise<void>((resolve) => {
    server.listen(socketPath, () => resolve());
  });

  return server;
}

if (require.main === module) {
  void startCompanyService();
}

async function handleCompanyServiceRequest(service: CompanyService, request: IncomingMessage, response: ServerResponse) {
  const method = request.method ?? "GET";
  const path = request.url?.split("?")[0] ?? "/";

  if (method === "GET" && path === "/health") {
    writeJson(response, 200, service.health());
    return;
  }

  if (method === "GET" && path === "/companies") {
    writeJson(response, 200, { ok: true, data: listPublicCompanies() });
    return;
  }

  if (method === "POST" && path === "/company/profile/logo") {
    writeJson(response, 200, { ok: true, data: uploadCompanyLogo(await readJsonObject(request)) });
    return;
  }

  const companyMatch = path.match(/^\/companies\/([^/]+)$/);

  if (method === "GET" && companyMatch) {
    const companyId = decodeURIComponent(companyMatch[1] ?? "");
    const company = getPublicCompany(companyId);
    writeJson(
      response,
      company ? 200 : 404,
      company
        ? { ok: true, data: company }
        : { ok: false, error: { code: "COMPANY_NOT_FOUND", message: `Company not found: ${companyId}` } }
    );
    return;
  }

  writeJson(response, 404, { ok: false, error: { code: "COMPANY_ROUTE_NOT_FOUND", message: `${method} ${path}` } });
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
