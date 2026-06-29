import { existsSync, mkdirSync, unlinkSync } from "node:fs";
import { createServer } from "node:http";
import { dirname } from "node:path";
import { AppointmentService, appointmentServiceManifest } from "./domain-service";

export { AppointmentService, appointmentServiceManifest } from "./domain-service";

export function getAppointmentServiceSocketPath() {
  return process.env[appointmentServiceManifest.socketEnv] ?? "/var/run/foundjob/appointment-service.sock";
}

export async function startAppointmentService() {
  const service = new AppointmentService();
  const socketPath = getAppointmentServiceSocketPath();

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
  void startAppointmentService();
}
