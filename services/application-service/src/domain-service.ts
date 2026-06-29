export interface DomainServiceManifest {
  name: string;
  domain: string;
  socketEnv: string;
  database: "postgres" | "mongodb" | "none";
  owns: readonly string[];
  dependsOn: readonly string[];
  emits: readonly string[];
}

export const applicationServiceManifest = {
  name: "application-service",
  domain: "application",
  socketEnv: "APPLICATION_SERVICE_SOCKET",
  database: "postgres",
  owns: ["job applications", "hiring workflow transitions", "offers", "application timeline"],
  dependsOn: ["job-service", "user-service", "company-service", "resume-service", "appointment-service"],
  emits: ["application.submitted", "application.status_changed", "application.offer_created"]
} as const satisfies DomainServiceManifest;

export class ApplicationService {
  getManifest(): DomainServiceManifest {
    return applicationServiceManifest;
  }

  health() {
    return { service: applicationServiceManifest.name, status: "ok" as const };
  }
}
