import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listAppointments() {
  return createMainControlClient().request("/admin/appointments");
}

export async function getAppointment(appointmentId: string) {
  return createMainControlClient().request(`/admin/appointments/${appointmentId}`);
}

export async function updateAppointment(appointmentId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/appointments/${appointmentId}`, { method: "PATCH", body: input });
}

export async function cancelAppointment(appointmentId: string) {
  return createMainControlClient().request(`/admin/appointments/${appointmentId}`, { method: "DELETE" });
}
