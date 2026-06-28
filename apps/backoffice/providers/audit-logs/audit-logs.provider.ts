import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listAuditLogs() {
  return createMainControlClient().request("/admin/audit-logs");
}
