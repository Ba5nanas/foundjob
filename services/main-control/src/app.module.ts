import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller";
import { DomainGatewayService } from "./routing/domain-gateway.service";

@Module({
  controllers: [HealthController],
  providers: [DomainGatewayService],
  exports: [DomainGatewayService]
})
export class AppModule {}
