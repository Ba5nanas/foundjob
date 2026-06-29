export type ApplicationWorkflowStatus =
  | "APPLIED"
  | "REVIEWING"
  | "SHORTLISTED"
  | "APPOINTMENT_SCHEDULED"
  | "INTERVIEWED"
  | "OFFERED"
  | "HIRED"
  | "REJECTED"
  | "CANCELLED";

export const applicationWorkflowTransitions = {
  APPLIED: ["REVIEWING", "CANCELLED", "REJECTED"],
  REVIEWING: ["SHORTLISTED", "REJECTED", "CANCELLED"],
  SHORTLISTED: ["APPOINTMENT_SCHEDULED", "REJECTED", "CANCELLED"],
  APPOINTMENT_SCHEDULED: ["INTERVIEWED", "CANCELLED"],
  INTERVIEWED: ["OFFERED", "REJECTED", "CANCELLED"],
  OFFERED: ["HIRED", "REJECTED", "CANCELLED"],
  HIRED: [],
  REJECTED: [],
  CANCELLED: []
} as const satisfies Record<ApplicationWorkflowStatus, readonly ApplicationWorkflowStatus[]>;

export function canTransitionApplicationStatus(
  current: ApplicationWorkflowStatus,
  next: ApplicationWorkflowStatus
) {
  const nextStatuses: readonly ApplicationWorkflowStatus[] = applicationWorkflowTransitions[current];

  return nextStatuses.includes(next);
}
