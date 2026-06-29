import { createServer, type Server } from "node:http";
import { existsSync, unlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { DomainGatewayService } from "./domain-gateway.service";

let server: Server | null = null;
let activeSocketPath: string | null = null;
const originalBackofficeSocket = process.env.BACKOFFICE_SERVICE_SOCKET;

afterEach(async () => {
  if (originalBackofficeSocket === undefined) {
    delete process.env.BACKOFFICE_SERVICE_SOCKET;
  } else {
    process.env.BACKOFFICE_SERVICE_SOCKET = originalBackofficeSocket;
  }

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

describe("DomainGatewayService", () => {
  it.each([
    ["auth", "AUTH_SERVICE_SOCKET"],
    ["user", "USER_SERVICE_SOCKET"],
    ["company", "COMPANY_SERVICE_SOCKET"],
    ["job", "JOB_SERVICE_SOCKET"],
    ["application", "APPLICATION_SERVICE_SOCKET"],
    ["resume", "RESUME_SERVICE_SOCKET"],
    ["appointment", "APPOINTMENT_SERVICE_SOCKET"],
    ["package", "PACKAGE_SERVICE_SOCKET"],
    ["backoffice", "BACKOFFICE_SERVICE_SOCKET"],
    ["file", "FILE_SERVICE_SOCKET"]
  ] as const)("routes %s requests to the expected socket env", (domain, socketEnv) => {
    expect(new DomainGatewayService().getRoute(domain)).toMatchObject({ domain, socketEnv });
  });

  it("exposes every domain route for gateway introspection", () => {
    expect(new DomainGatewayService().listRoutes()).toHaveLength(10);
  });

  it("resolves default socket paths when env is not set", () => {
    delete process.env.BACKOFFICE_SERVICE_SOCKET;

    expect(new DomainGatewayService().getSocketPath("backoffice")).toBe("/var/run/foundjob/backoffice-service.sock");
  });

  it("detects known domains", () => {
    const service = new DomainGatewayService();

    expect(service.isDomain("job")).toBe(true);
    expect(service.isDomain("unknown")).toBe(false);
  });

  it("forwards JSON requests to a domain service socket", async () => {
    const socketPath = createPipePath("main-control-backoffice");
    process.env.BACKOFFICE_SERVICE_SOCKET = socketPath;
    server = createServer((request, response) => {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify({ ok: true, data: { path: request.url, method: request.method } }));
    });

    await listen(server, socketPath);

    await expect(
      new DomainGatewayService().request("backoffice", "/admin/appointments/appt_001", { method: "PATCH" })
    ).resolves.toEqual({
      ok: true,
      data: { path: "/admin/appointments/appt_001", method: "PATCH" }
    });
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
