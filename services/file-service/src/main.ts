import "reflect-metadata";
import { existsSync, unlinkSync } from "node:fs";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ["error", "warn", "log"] });
  const socketPath = process.env.FILE_SERVICE_SOCKET ?? "/var/run/foundjob/file-service.sock";

  if (existsSync(socketPath)) {
    unlinkSync(socketPath);
  }

  await app.listen(socketPath);
}

void bootstrap();
