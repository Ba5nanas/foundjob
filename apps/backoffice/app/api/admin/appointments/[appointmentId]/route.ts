import {
  cancelAppointment,
  getAppointment,
  updateAppointment
} from "@/providers/appointments/appointments.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function GET(_request: Request, { params }: { params: Promise<{ appointmentId: string }> }) {
  return handleApiRoute(async () => {
    const { appointmentId } = await params;
    await requirePermission("appointments.view");
    return getAppointment(appointmentId);
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ appointmentId: string }> }) {
  return handleApiRoute(async () => {
    const { appointmentId } = await params;
    await requirePermission("appointments.cancel");
    return updateAppointment(appointmentId, await parseJsonObject(request));
  });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ appointmentId: string }> }) {
  return handleApiRoute(async () => {
    const { appointmentId } = await params;
    await requirePermission("appointments.cancel");
    return cancelAppointment(appointmentId);
  });
}
