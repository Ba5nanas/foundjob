export function applyToPublicJob(jobId: string, input: Record<string, unknown>) {
  const applicantEmail = typeof input.email === "string" ? input.email : "candidate@example.com";
  const resumeId = typeof input.resumeId === "string" ? input.resumeId : null;

  return {
    id: `application-demo-${jobId}`,
    jobId,
    applicantEmail,
    resumeId,
    status: "APPLIED" as const,
    submittedAt: "2026-06-29T07:30:00.000Z",
    nextStep: "Company review"
  };
}

export function listCompanyJobApplications(jobId: string) {
  const items = [
    {
      id: "application-001",
      jobId,
      candidateName: "Arisa M.",
      candidateEmail: "arisa@example.com",
      status: "INTERVIEW",
      submittedAt: "2026-06-28T09:30:00.000Z"
    },
    {
      id: "application-002",
      jobId,
      candidateName: "Krit P.",
      candidateEmail: "krit@example.com",
      status: "REVIEWING",
      submittedAt: "2026-06-27T11:20:00.000Z"
    }
  ];

  return {
    jobId,
    items,
    total: items.length,
    operations: ["read", "shortlist", "reject", "schedule_appointment"] as const
  };
}
