export interface DomainServiceManifest {
  name: string;
  domain: string;
  socketEnv: string;
  database: "postgres" | "mongodb" | "none";
  owns: readonly string[];
  dependsOn: readonly string[];
  emits: readonly string[];
}

export const companyServiceManifest = {
  name: "company-service",
  domain: "company",
  socketEnv: "COMPANY_SERVICE_SOCKET",
  database: "postgres",
  owns: ["company profiles", "company memberships", "company staff", "employee records"],
  dependsOn: ["auth-service", "file-service"],
  emits: ["company.created", "company.verified", "company.employee_updated"]
} as const satisfies DomainServiceManifest;

export class CompanyService {
  getManifest(): DomainServiceManifest {
    return companyServiceManifest;
  }

  health() {
    return { service: companyServiceManifest.name, status: "ok" as const };
  }
}
