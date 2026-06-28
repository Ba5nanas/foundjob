import "server-only";
import { MainControlClient, type MainControlRequestOptions } from "@foundjob/shared-api-client";
import { foundjobConfig } from "@foundjob/shared-config";
import type { ApiResponse } from "@foundjob/shared-dto";

type MainControlGateway = {
  request<TData>(path: string, requestOptions?: MainControlRequestOptions): Promise<ApiResponse<TData>>;
};

function gatewayUnavailable<TData>(path: string, requestOptions: MainControlRequestOptions = {}): ApiResponse<TData> {
  const method = requestOptions.method ?? "GET";
  return {
    ok: false,
    error: {
      code: "BACKOFFICE_GATEWAY_UNAVAILABLE",
      message: `Main Control gateway is not available yet: ${method} /backoffice${path}`
    }
  };
}

export function createMainControlClient(): MainControlGateway {
  let client: MainControlClient | null = null;
  try {
    client = new MainControlClient({
      socketPath: foundjobConfig.sockets.mainControl,
      basePath: "/backoffice"
    });
  } catch {
    client = null;
  }

  return {
    async request<TData>(path: string, requestOptions: MainControlRequestOptions = {}) {
      if (!client) {
        return gatewayUnavailable<TData>(path, requestOptions);
      }

      try {
        return await client.request<TData>(path, requestOptions);
      } catch {
        return gatewayUnavailable<TData>(path, requestOptions);
      }
    }
  };
}
