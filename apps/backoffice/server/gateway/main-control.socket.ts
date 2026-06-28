import "server-only";
import { MainControlClient } from "@foundjob/shared-api-client";
import { foundjobConfig } from "@foundjob/shared-config";

export function createMainControlClient() {
  return new MainControlClient({
    socketPath: foundjobConfig.sockets.mainControl,
    basePath: "/backoffice"
  });
}
