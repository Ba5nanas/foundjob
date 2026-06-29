import { Controller, Get, Param } from "@nestjs/common";
import { DomainGatewayService } from "./domain-gateway.service";

@Controller("domains")
export class DomainGatewayController {
  constructor(private readonly domainGateway: DomainGatewayService) {}

  @Get()
  listDomains() {
    return {
      ok: true,
      data: this.domainGateway.listRoutes().map((route) => ({
        domain: route.domain,
        socketEnv: route.socketEnv,
        defaultSocketPath: route.defaultSocketPath
      }))
    };
  }

  @Get(":domain/health")
  health(@Param("domain") domain: string) {
    if (!this.domainGateway.isDomain(domain)) {
      return {
        ok: false,
        error: {
          code: "DOMAIN_NOT_FOUND",
          message: `Unknown domain: ${domain}`
        }
      };
    }

    return this.domainGateway.health(domain);
  }
}
