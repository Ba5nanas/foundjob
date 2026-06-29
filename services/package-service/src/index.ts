import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { createServer } from "node:http";
import { dirname } from "node:path";
import { PackageService, packageServiceManifest } from "./domain-service";

export { PackageService, packageServiceManifest } from "./domain-service";

export function getPackageServiceSocketPath() {
  return process.env[packageServiceManifest.socketEnv] ?? "/var/run/foundjob/package-service.sock";
}

export async function startPackageService() {
  const service = new PackageService();
  const socketPath = getPackageServiceSocketPath();

  mkdirSync(dirname(socketPath), { recursive: true });

  if (existsSync(socketPath)) {
    unlinkSync(socketPath);
  }

  const server = createServer((request, response) => {
    if (request.url !== "/health") {
      response.writeHead(404, { "content-type": "application/json" });
      response.end(JSON.stringify({ error: "not_found" }));
      return;
    }

    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(service.health()));
  });

  await new Promise<void>((resolve) => {
    server.listen(socketPath, () => resolve());
  });

  return server;
}

if (require.main === module) {
  void startPackageService();
}
