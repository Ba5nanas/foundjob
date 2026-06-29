import { Injectable } from "@nestjs/common";
import { request as httpRequest } from "node:http";

export interface DomainRoute {
  domain: "auth" | "user" | "company" | "job" | "application" | "resume" | "appointment" | "package" | "backoffice" | "file";
  socketEnv: string;
  defaultSocketPath: string;
}

const routes: Record<DomainRoute["domain"], DomainRoute> = {
  auth: { domain: "auth", socketEnv: "AUTH_SERVICE_SOCKET", defaultSocketPath: "/var/run/foundjob/auth-service.sock" },
  user: { domain: "user", socketEnv: "USER_SERVICE_SOCKET", defaultSocketPath: "/var/run/foundjob/user-service.sock" },
  company: {
    domain: "company",
    socketEnv: "COMPANY_SERVICE_SOCKET",
    defaultSocketPath: "/var/run/foundjob/company-service.sock"
  },
  job: { domain: "job", socketEnv: "JOB_SERVICE_SOCKET", defaultSocketPath: "/var/run/foundjob/job-service.sock" },
  application: {
    domain: "application",
    socketEnv: "APPLICATION_SERVICE_SOCKET",
    defaultSocketPath: "/var/run/foundjob/application-service.sock"
  },
  resume: {
    domain: "resume",
    socketEnv: "RESUME_SERVICE_SOCKET",
    defaultSocketPath: "/var/run/foundjob/resume-service.sock"
  },
  appointment: {
    domain: "appointment",
    socketEnv: "APPOINTMENT_SERVICE_SOCKET",
    defaultSocketPath: "/var/run/foundjob/appointment-service.sock"
  },
  package: {
    domain: "package",
    socketEnv: "PACKAGE_SERVICE_SOCKET",
    defaultSocketPath: "/var/run/foundjob/package-service.sock"
  },
  backoffice: {
    domain: "backoffice",
    socketEnv: "BACKOFFICE_SERVICE_SOCKET",
    defaultSocketPath: "/var/run/foundjob/backoffice-service.sock"
  },
  file: { domain: "file", socketEnv: "FILE_SERVICE_SOCKET", defaultSocketPath: "/var/run/foundjob/file-service.sock" }
};

export type DomainName = DomainRoute["domain"];

export interface DomainRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
}

@Injectable()
export class DomainGatewayService {
  listRoutes(): DomainRoute[] {
    return Object.values(routes);
  }

  isDomain(domain: string): domain is DomainName {
    return domain in routes;
  }

  getRoute(domain: DomainName): DomainRoute {
    return routes[domain];
  }

  getSocketPath(domain: DomainName) {
    const route = this.getRoute(domain);

    return process.env[route.socketEnv] ?? route.defaultSocketPath;
  }

  async health(domain: DomainName) {
    const route = this.getRoute(domain);
    const upstream = await this.request(domain, "/health");

    if (!upstream.ok) {
      return {
        ok: false as const,
        error: {
          code: "DOMAIN_SERVICE_UNAVAILABLE",
          message: `${route.domain} service is not reachable through ${route.socketEnv}`,
          details: upstream.error
        }
      };
    }

    return {
      ok: true as const,
      data: {
        domain: route.domain,
        socketEnv: route.socketEnv,
        service: upstream.data
      }
    };
  }

  async request(domain: DomainName, path: string, options: DomainRequestOptions = {}) {
    const socketPath = this.getSocketPath(domain);

    return requestJsonOverSocket(socketPath, path, options);
  }
}

function requestJsonOverSocket(socketPath: string, path: string, options: DomainRequestOptions = {}) {
  return new Promise<
    | { ok: true; data: unknown }
    | { ok: false; error: { code: string; message: string; details?: unknown } }
  >((resolve) => {
    const body = options.body === undefined ? undefined : JSON.stringify(options.body);
    const request = httpRequest(
      {
        socketPath,
        path,
        method: options.method ?? "GET",
        headers: {
          accept: "application/json",
          ...(body ? { "content-type": "application/json", "content-length": Buffer.byteLength(body).toString() } : {}),
          ...options.headers
        }
      },
      (response) => {
        const chunks: Buffer[] = [];

        response.on("data", (chunk: Buffer | string) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });

        response.on("end", () => {
          const text = Buffer.concat(chunks).toString("utf8");
          const statusCode = response.statusCode ?? 500;
          const data = parseJson(text);

          if (isApiResponsePayload(data)) {
            resolve(data);
            return;
          }

          if (statusCode >= 400) {
            resolve({
              ok: false,
              error: {
                code: "DOMAIN_SERVICE_HTTP_ERROR",
                message: `Domain service returned HTTP ${statusCode}`,
                details: data ?? text
              }
            });
            return;
          }

          resolve({ ok: true, data });
        });
      }
    );

    request.setTimeout(3000, () => {
      request.destroy(new Error(`Domain service socket request timed out: ${socketPath}${path}`));
    });

    request.on("error", (error: Error) => {
      resolve({
        ok: false,
        error: {
          code: "DOMAIN_SERVICE_SOCKET_ERROR",
          message: "Domain service socket request failed",
          details: error.message
        }
      });
    });

    if (body) {
      request.write(body);
    }

    request.end();
  });
}

function parseJson(text: string) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function isApiResponsePayload(
  value: unknown
): value is { ok: true; data: unknown } | { ok: false; error: { code: string; message: string; details?: unknown } } {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "ok" in value && typeof (value as { ok?: unknown }).ok === "boolean";
}
