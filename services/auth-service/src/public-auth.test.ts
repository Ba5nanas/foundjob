import { describe, expect, it } from "vitest";
import { loginPublicUser, logoutPublicUser, registerCompany, registerJobSeeker } from "./public-auth";

describe("public auth demo handlers", () => {
  it("logs in public users with a demo session", () => {
    expect(loginPublicUser({ email: "company@example.com" })).toMatchObject({
      user: { type: "company" },
      session: { accessToken: "demo-access-token" }
    });
  });

  it("registers job seekers and companies separately", () => {
    expect(registerJobSeeker({ email: "seeker@example.com" })).toMatchObject({
      user: { type: "job_seeker" },
      onboardingStep: "profile"
    });
    expect(registerCompany({ email: "owner@example.com", companyName: "Acme Labs" })).toMatchObject({
      user: { type: "company" },
      company: { id: "acme-labs", status: "PENDING_REVIEW" }
    });
  });

  it("logs out public users", () => {
    expect(logoutPublicUser()).toEqual({ loggedOut: true });
  });
});
