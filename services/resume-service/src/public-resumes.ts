export function exportResume(input: Record<string, unknown>) {
  const resumeId = typeof input.resumeId === "string" ? input.resumeId : "resume-demo";

  return {
    resumeId,
    exportId: `resume-export-${resumeId}`,
    status: "QUEUED" as const,
    format: typeof input.format === "string" ? input.format : "pdf",
    requestedAt: "2026-06-29T08:00:00.000Z"
  };
}

export function downloadResume(input: Record<string, unknown>) {
  const resumeId = typeof input.resumeId === "string" ? input.resumeId : "resume-demo";

  return {
    resumeId,
    file: {
      id: `file-${resumeId}`,
      type: "protected" as const,
      requiresDomainPermission: true,
      downloadPath: `/seeker/resume/${resumeId}/download`
    },
    expiresAt: "2026-06-29T08:15:00.000Z"
  };
}
