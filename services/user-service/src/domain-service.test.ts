import { describe, expect, it } from "vitest";
import { UserService, userServiceManifest } from "./domain-service";

describe("UserService", () => {
  it("declares the user socket contract", () => {
    expect(userServiceManifest.socketEnv).toBe("USER_SERVICE_SOCKET");
  });

  it("returns an ok health payload", () => {
    expect(new UserService().health()).toEqual({ service: "user-service", status: "ok" });
  });
});
