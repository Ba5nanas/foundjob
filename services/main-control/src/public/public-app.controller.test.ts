import { describe, expect, it } from "vitest";
import type { DomainGatewayService } from "../routing/domain-gateway.service";
import { PublicAppController } from "./public-app.controller";

function createControllerWithCalls() {
  const calls: unknown[] = [];
  const controller = new PublicAppController({
    request: (...args: unknown[]) => {
      calls.push(args);
      return Promise.resolve({ ok: true, data: null });
    }
  } as Pick<DomainGatewayService, "request"> as DomainGatewayService);

  return { calls, controller };
}

describe("PublicAppController", () => {
  it("forwards public auth operations to auth service", async () => {
    const { calls, controller } = createControllerWithCalls();

    await controller.login({ email: "you@example.com" });
    await controller.logout();
    await controller.registerJobSeeker({ email: "seeker@example.com" });
    await controller.registerCompany({ email: "company@example.com" });

    expect(calls).toEqual([
      ["auth", "/auth/login", { method: "POST", body: { email: "you@example.com" } }],
      ["auth", "/auth/logout", { method: "POST" }],
      ["auth", "/auth/register/job-seeker", { method: "POST", body: { email: "seeker@example.com" } }],
      ["auth", "/auth/register/company", { method: "POST", body: { email: "company@example.com" } }]
    ]);
  });

  it("forwards public job operations to job and application services", async () => {
    const { calls, controller } = createControllerWithCalls();

    await controller.listJobs();
    await controller.searchJobs({ keyword: "frontend" });
    await controller.getJob("frontend-developer");
    await controller.applyToJob("frontend-developer", { email: "candidate@example.com" });

    expect(calls).toEqual([
      ["job", "/jobs"],
      ["job", "/jobs/search", { method: "POST", body: { keyword: "frontend" } }],
      ["job", "/jobs/frontend-developer"],
      [
        "application",
        "/jobs/frontend-developer/apply",
        { method: "POST", body: { email: "candidate@example.com", jobId: "frontend-developer" } }
      ]
    ]);
  });

  it("forwards public company operations to company service", async () => {
    const { calls, controller } = createControllerWithCalls();

    await controller.listCompanies();
    await controller.getCompany("northstar-labs");
    await controller.uploadCompanyLogo({ fileName: "logo.png" });

    expect(calls).toEqual([
      ["company", "/companies"],
      ["company", "/companies/northstar-labs"],
      ["company", "/company/profile/logo", { method: "POST", body: { fileName: "logo.png" } }]
    ]);
  });

  it("forwards remaining public profile, resume, and company-workspace operations", async () => {
    const { calls, controller } = createControllerWithCalls();

    await controller.listCompanyJobApplications("frontend-developer");
    await controller.uploadSeekerAvatar({ fileName: "avatar.png" });
    await controller.exportResume({ resumeId: "resume-001" });
    await controller.downloadResume({ resumeId: "resume-001" });

    expect(calls).toEqual([
      ["application", "/company/jobs/frontend-developer/applications"],
      ["user", "/seeker/profile/avatar", { method: "POST", body: { fileName: "avatar.png" } }],
      ["resume", "/seeker/resume/export", { method: "POST", body: { resumeId: "resume-001" } }],
      ["resume", "/seeker/resume/download", { method: "POST", body: { resumeId: "resume-001" } }]
    ]);
  });
});
