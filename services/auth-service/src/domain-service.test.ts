import { describe, expect, it } from "vitest";
import { AuthService, authServiceManifest } from "./domain-service";

describe("AuthService", () => {
  it("declares the auth socket contract", () => {
    expect(authServiceManifest.socketEnv).toBe("AUTH_SERVICE_SOCKET");
  });

  it("returns an ok health payload", () => {
    expect(new AuthService().health()).toEqual({ service: "auth-service", status: "ok" });
  });
});
