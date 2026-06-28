import { listAuditLogs } from "@/providers/audit-logs/audit-logs.provider";
import { requirePermission } from "@/server/auth/permission";
import { handleApiRoute } from "@/server/http/handle-api-route";

export async function GET() {
  return handleApiRoute(async () => {
    await requirePermission("audit_logs.view");
    return listAuditLogs();
  });
}
