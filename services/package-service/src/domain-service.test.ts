import { describe, expect, it } from "vitest";
import { PackageService, packageServiceManifest } from "./domain-service";

describe("PackageService", () => {
  it("declares the package socket contract", () => {
    expect(packageServiceManifest.socketEnv).toBe("PACKAGE_SERVICE_SOCKET");
  });

  it("returns an ok health payload", () => {
    expect(new PackageService().health()).toEqual({ service: "package-service", status: "ok" });
  });
});
