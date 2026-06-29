import { describe, expect, it } from "vitest";
import { applyToPublicJob, listCompanyJobApplications } from "./public-applications";

describe("public application demo handlers", () => {
  it("creates an application for a public job", () => {
    expect(applyToPublicJob("frontend-developer", { email: "candidate@example.com", resumeId: "resume-001" })).toMatchObject({
      id: "application-demo-frontend-developer",
      jobId: "frontend-developer",
      applicantEmail: "candidate@example.com",
      resumeId: "resume-001",
      status: "APPLIED"
    });
  });

  it("lists company-facing applications for a job", () => {
    expect(listCompanyJobApplications("frontend-developer")).toMatchObject({
      jobId: "frontend-developer",
      total: 2,
      operations: ["read", "shortlist", "reject", "schedule_appointment"]
    });
  });
});
