import { Module } from "@nestjs/common";
import { FileController } from "./files/file.controller";
import { FileService } from "./files/file.service";
import { HealthController } from "./health/health.controller";

@Module({
  controllers: [HealthController, FileController],
  providers: [FileService],
  exports: [FileService]
})
export class AppModule {}
