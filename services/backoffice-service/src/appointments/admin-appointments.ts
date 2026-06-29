export type AdminAppointmentStatus = "SCHEDULED" | "RESCHEDULED" | "CANCELLED";

export interface AdminAppointment {
  id: string;
  jobTitle: string;
  candidateName: string;
  companyName: string;
  scheduledAt: string;
  mode: "ONSITE" | "VIDEO";
  status: AdminAppointmentStatus;
  ownerAdmin: string;
  cancellationReason?: string;
}

export const demoAdminAppointments: readonly AdminAppointment[] = [
  {
    id: "appt_001",
    jobTitle: "Frontend Developer",
    candidateName: "Narin S.",
    companyName: "Northstar Labs",
    scheduledAt: "2026-07-01T10:00:00.000Z",
    mode: "VIDEO",
    status: "SCHEDULED",
    ownerAdmin: "support@foundjob.net"
  },
  {
    id: "appt_002",
    jobTitle: "Product Designer",
    candidateName: "Mali K.",
    companyName: "Blue Harbor",
    scheduledAt: "2026-07-01T14:30:00.000Z",
    mode: "ONSITE",
    status: "RESCHEDULED",
    ownerAdmin: "ops@foundjob.net"
  },
  {
    id: "appt_003",
    jobTitle: "Backend Engineer",
    candidateName: "Thanawat P.",
    companyName: "Foundry Cloud",
    scheduledAt: "2026-07-02T09:30:00.000Z",
    mode: "VIDEO",
    status: "SCHEDULED",
    ownerAdmin: "support@foundjob.net"
  }
];

export function listAdminAppointments() {
  return {
    items: demoAdminAppointments,
    total: demoAdminAppointments.length,
    operations: ["read", "reschedule", "cancel"] as const
  };
}

export function getAdminAppointment(appointmentId: string) {
  return demoAdminAppointments.find((appointment) => appointment.id === appointmentId) ?? null;
}

export function updateAdminAppointment(appointmentId: string, input: Record<string, unknown>) {
  const appointment = getAdminAppointment(appointmentId);

  if (!appointment) {
    return null;
  }

  return {
    ...appointment,
    scheduledAt: typeof input.scheduledAt === "string" ? input.scheduledAt : appointment.scheduledAt,
    mode: input.mode === "ONSITE" || input.mode === "VIDEO" ? input.mode : appointment.mode,
    status: "RESCHEDULED" as const
  };
}

export function cancelAdminAppointment(appointmentId: string, input: Record<string, unknown> = {}) {
  const appointment = getAdminAppointment(appointmentId);

  if (!appointment) {
    return null;
  }

  return {
    ...appointment,
    status: "CANCELLED" as const,
    cancellationReason:
      typeof input.reason === "string" && input.reason.trim() ? input.reason : "Cancelled from backoffice demo API"
  };
}
