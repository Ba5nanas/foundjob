import { describe, expect, it } from "vitest";
import { JobService, jobServiceManifest } from "./domain-service";

describe("JobService", () => {
  it("declares the job socket contract", () => {
    expect(jobServiceManifest.socketEnv).toBe("JOB_SERVICE_SOCKET");
  });

  it("returns an ok health payload", () => {
    expect(new JobService().health()).toEqual({ service: "job-service", status: "ok" });
  });
});
