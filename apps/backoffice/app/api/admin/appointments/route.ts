import { listAppointments } from "@/providers/appointments/appointments.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("appointments.view");
    return listAppointments();
  });
}
