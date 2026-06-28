import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listRoles() {
  return createMainControlClient().request("/admin/roles");
}

export async function createRole(input: Record<string, unknown>) {
  return createMainControlClient().request("/admin/roles", { method: "POST", body: input });
}

export async function getRole(roleId: string) {
  return createMainControlClient().request(`/admin/roles/${roleId}`);
}

export async function updateRole(roleId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/roles/${roleId}`, { method: "PATCH", body: input });
}

export async function deleteRole(roleId: string) {
  return createMainControlClient().request(`/admin/roles/${roleId}`, { method: "DELETE" });
}

export async function updateRolePermissions(input: { roleId: string; permissions: string[] }) {
  return createMainControlClient().request(`/admin/roles/${input.roleId}/permissions`, {
    method: "PUT",
    body: input
  });
}

export async function getRolePermissions(roleId: string) {
  return createMainControlClient().request(`/admin/roles/${roleId}/permissions`);
}
