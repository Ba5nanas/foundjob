import type { ApiResponse } from "@foundjob/shared-dto";

export interface MainControlClientOptions {
  socketPath: string;
  basePath?: string;
}

export interface MainControlRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
}

export class MainControlClient {
  constructor(private readonly options: MainControlClientOptions) {}

  async request<TData>(
    path: string,
    requestOptions: MainControlRequestOptions = {}
  ): Promise<ApiResponse<TData>> {
    const method = requestOptions.method ?? "GET";
    const url = `${this.options.basePath ?? ""}${path}`;

    return {
      ok: false,
      error: {
        code: "NOT_IMPLEMENTED",
        message: `Main Control socket request is not wired yet: ${method} ${url}`
      }
    };
  }
}
