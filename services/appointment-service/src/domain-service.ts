export interface DomainServiceManifest {
  name: string;
  domain: string;
  socketEnv: string;
  database: "postgres" | "mongodb" | "none";
  owns: readonly string[];
  dependsOn: readonly string[];
  emits: readonly string[];
}

export const appointmentServiceManifest = {
  name: "appointment-service",
  domain: "appointment",
  socketEnv: "APPOINTMENT_SERVICE_SOCKET",
  database: "postgres",
  owns: ["interview appointments", "schedule status", "cancellation reasons", "reminders"],
  dependsOn: ["application-service", "email-worker", "notification-worker"],
  emits: ["appointment.created", "appointment.rescheduled", "appointment.cancelled"]
} as const satisfies DomainServiceManifest;

export class AppointmentService {
  getManifest(): DomainServiceManifest {
    return appointmentServiceManifest;
  }

  health() {
    return { service: appointmentServiceManifest.name, status: "ok" as const };
  }
}
