import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function listCompanies() {
  return createMainControlClient().request("/companies");
}

export async function getCompany(companyId: string) {
  return createMainControlClient().request(`/companies/${companyId}`);
}
