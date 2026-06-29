import { request as httpRequest } from "node:http";
import type { ApiResponse } from "@foundjob/shared-dto";

export interface MainControlClientOptions {
  socketPath: string;
  basePath?: string;
}

export interface MainControlRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
}

export class MainControlClient {
  constructor(private readonly options: MainControlClientOptions) {}

  async request<TData>(
    path: string,
    requestOptions: MainControlRequestOptions = {}
  ): Promise<ApiResponse<TData>> {
    const method = requestOptions.method ?? "GET";
    const requestPath = joinPaths(this.options.basePath, path);
    const body = requestOptions.body === undefined ? undefined : JSON.stringify(requestOptions.body);
    const headers = {
      accept: "application/json",
      ...(body ? { "content-type": "application/json", "content-length": Buffer.byteLength(body).toString() } : {}),
      ...requestOptions.headers
    };

    return new Promise<ApiResponse<TData>>((resolve) => {
      const request = httpRequest(
        {
          socketPath: this.options.socketPath,
          path: requestPath,
          method,
          headers
        },
        (response) => {
          const chunks: Buffer[] = [];

          response.on("data", (chunk: Buffer | string) => {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
          });

          response.on("end", () => {
            const text = Buffer.concat(chunks).toString("utf8");
            const statusCode = response.statusCode ?? 500;
            const parsed = parseJson(text);

            if (isApiResponse<TData>(parsed)) {
              resolve(parsed);
              return;
            }

            if (statusCode >= 400) {
              resolve({
                ok: false,
                error: {
                  code: "MAIN_CONTROL_HTTP_ERROR",
                  message: `Main Control returned HTTP ${statusCode}: ${method} ${requestPath}`,
                  details: parsed ?? text
                }
              });
              return;
            }

            resolve({ ok: true, data: parsed as TData });
          });
        }
      );

      request.setTimeout(requestOptions.timeoutMs ?? 5000, () => {
        request.destroy(new Error(`Main Control socket request timed out: ${method} ${requestPath}`));
      });

      request.on("error", (error: Error) => {
        resolve({
          ok: false,
          error: {
            code: "MAIN_CONTROL_SOCKET_ERROR",
            message: `Main Control socket request failed: ${method} ${requestPath}`,
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
}

function joinPaths(basePath = "", path: string) {
  const normalizedBase = basePath === "/" ? "" : basePath.replace(/\/+$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}` || "/";
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

function isApiResponse<TData>(value: unknown): value is ApiResponse<TData> {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "ok" in value && typeof (value as { ok?: unknown }).ok === "boolean";
}
