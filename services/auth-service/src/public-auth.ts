export function loginPublicUser(input: Record<string, unknown>) {
  const email = typeof input.email === "string" ? input.email : "you@example.com";

  return {
    user: {
      id: email.includes("company") ? "company-user-demo" : "job-seeker-demo",
      email,
      type: email.includes("company") ? "company" : "job_seeker"
    },
    session: {
      accessToken: "demo-access-token",
      expiresInSeconds: 3600
    }
  };
}

export function logoutPublicUser() {
  return {
    loggedOut: true
  };
}

export function registerJobSeeker(input: Record<string, unknown>) {
  const email = typeof input.email === "string" ? input.email : "new-seeker@example.com";

  return {
    user: {
      id: "job-seeker-demo-created",
      email,
      type: "job_seeker"
    },
    onboardingStep: "profile"
  };
}

export function registerCompany(input: Record<string, unknown>) {
  const email = typeof input.email === "string" ? input.email : "company@example.com";
  const companyName = typeof input.companyName === "string" ? input.companyName : "New Company";

  return {
    user: {
      id: "company-user-demo-created",
      email,
      type: "company"
    },
    company: {
      id: companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "new-company",
      name: companyName,
      status: "PENDING_REVIEW"
    }
  };
}
