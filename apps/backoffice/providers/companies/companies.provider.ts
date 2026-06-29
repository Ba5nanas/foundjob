import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listCompanies() {
  return createMainControlClient().request("/admin/companies");
}

export async function getCompany(companyId: string) {
  return createMainControlClient().request(`/admin/companies/${companyId}`);
}

export async function updateCompany(companyId: string, input: Record<string, unknown>) {
  return createMainControlClient().request(`/admin/companies/${companyId}`, { method: "PATCH", body: input });
}

export async function deleteCompany(companyId: string) {
  return createMainControlClient().request(`/admin/companies/${companyId}`, { method: "DELETE" });
}
