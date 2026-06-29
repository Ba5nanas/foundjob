import { Module } from "@nestjs/common";
import { BackofficeAdminController } from "./backoffice/backoffice-admin.controller";
import { HealthController } from "./health/health.controller";
import { PublicAppController } from "./public/public-app.controller";
import { DomainGatewayController } from "./routing/domain-gateway.controller";
import { DomainGatewayService } from "./routing/domain-gateway.service";

@Module({
  controllers: [HealthController, DomainGatewayController, BackofficeAdminController, PublicAppController],
  providers: [DomainGatewayService],
  exports: [DomainGatewayService]
})
export class AppModule {}
