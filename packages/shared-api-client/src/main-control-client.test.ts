import { createServer, type Server } from "node:http";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { MainControlClient } from "./main-control-client";

let server: Server | null = null;
let activeSocketPath: string | null = null;

afterEach(async () => {
  if (!server) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    server?.close((error) => (error ? reject(error) : resolve()));
  });
  server = null;
  removeSocketFile(activeSocketPath);
  activeSocketPath = null;
});

describe("MainControlClient", () => {
  it("requests JSON over a socket path and preserves ApiResponse payloads", async () => {
    const socketPath = createPipePath("api-response");
    server = createServer((request, response) => {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ ok: true, data: { path: request.url } }));
    });

    await listen(server, socketPath);

    const response = await new MainControlClient({ socketPath, basePath: "/backoffice" }).request<{ path: string }>(
      "/admin/users"
    );

    expect(response).toEqual({ ok: true, data: { path: "/backoffice/admin/users" } });
  });

  it("serializes request bodies as JSON", async () => {
    const socketPath = createPipePath("body");
    server = createServer((request, response) => {
      const chunks: Buffer[] = [];

      request.on("data", (chunk: Buffer | string) => {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      });

      request.on("end", () => {
        response.writeHead(200, { "content-type": "application/json" });
        response.end(JSON.stringify({ received: JSON.parse(Buffer.concat(chunks).toString("utf8")) }));
      });
    });

    await listen(server, socketPath);

    const response = await new MainControlClient({ socketPath }).request<{ received: { name: string } }>("/echo", {
      method: "POST",
      body: { name: "FoundJob" }
    });

    expect(response).toEqual({ ok: true, data: { received: { name: "FoundJob" } } });
  });

  it("returns a socket error response instead of throwing", async () => {
    const response = await new MainControlClient({ socketPath: createPipePath("missing") }).request("/health", {
      timeoutMs: 100
    });

    expect(response.ok).toBe(false);
    expect(response.ok ? "" : response.error.code).toBe("MAIN_CONTROL_SOCKET_ERROR");
  });
});

function createPipePath(name: string) {
  if (process.platform === "win32") {
    return `\\\\.\\pipe\\foundjob-${name}-${process.pid}-${Date.now()}`;
  }

  return join(tmpdir(), `foundjob-${name}-${process.pid}-${Date.now()}.sock`);
}

async function listen(activeServer: Server, socketPath: string) {
  activeSocketPath = socketPath;
  removeSocketFile(socketPath);

  await new Promise<void>((resolve) => {
    activeServer.listen(socketPath, () => resolve());
  });
}

function removeSocketFile(socketPath: string | null) {
  if (!socketPath || process.platform === "win32" || !existsSync(socketPath)) {
    return;
  }

  unlinkSync(socketPath);
}
