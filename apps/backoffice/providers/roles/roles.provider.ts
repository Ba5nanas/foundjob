import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function updateRolePermissions(input: { roleId: string; permissions: string[] }) {
  return createMainControlClient().request(`/admin/roles/${input.roleId}/permissions`, {
    method: "PUT",
    body: input
  });
}
