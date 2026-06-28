import { describe, expect, it } from "vitest";
import { DomainGatewayService } from "./domain-gateway.service";

describe("DomainGatewayService", () => {
  it("routes job requests to the job service socket env", () => {
    expect(new DomainGatewayService().getRoute("job")).toEqual({
      domain: "job",
      socketEnv: "JOB_SERVICE_SOCKET"
    });
  });
});
