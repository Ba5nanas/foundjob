import { describe, expect, it } from "vitest";
import { ResumeService, resumeServiceManifest } from "./domain-service";

describe("ResumeService", () => {
  it("declares the resume socket contract", () => {
    expect(resumeServiceManifest.socketEnv).toBe("RESUME_SERVICE_SOCKET");
  });

  it("returns an ok health payload", () => {
    expect(new ResumeService().health()).toEqual({ service: "resume-service", status: "ok" });
  });
});
