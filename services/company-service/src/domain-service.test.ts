import { describe, expect, it } from "vitest";
import { CompanyService, companyServiceManifest } from "./domain-service";

describe("CompanyService", () => {
  it("declares the company socket contract", () => {
    expect(companyServiceManifest.socketEnv).toBe("COMPANY_SERVICE_SOCKET");
  });

  it("returns an ok health payload", () => {
    expect(new CompanyService().health()).toEqual({ service: "company-service", status: "ok" });
  });
});
