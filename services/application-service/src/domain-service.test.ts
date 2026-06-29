import { describe, expect, it } from "vitest";
import { ApplicationService, applicationServiceManifest } from "./domain-service";

describe("ApplicationService", () => {
  it("declares the application socket contract", () => {
    expect(applicationServiceManifest.socketEnv).toBe("APPLICATION_SERVICE_SOCKET");
  });

  it("returns an ok health payload", () => {
    expect(new ApplicationService().health()).toEqual({ service: "application-service", status: "ok" });
  });
});
