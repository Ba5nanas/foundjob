export interface DomainServiceManifest {
  name: string;
  domain: string;
  socketEnv: string;
  database: "postgres" | "mongodb" | "none";
  owns: readonly string[];
  dependsOn: readonly string[];
  emits: readonly string[];
}

export const packageServiceManifest = {
  name: "package-service",
  domain: "package",
  socketEnv: "PACKAGE_SERVICE_SOCKET",
  database: "postgres",
  owns: ["company packages", "subscription limits", "job quotas", "usage accounting"],
  dependsOn: ["company-service"],
  emits: ["package.assigned", "package.limit_reached", "package.expired"]
} as const satisfies DomainServiceManifest;

export class PackageService {
  getManifest(): DomainServiceManifest {
    return packageServiceManifest;
  }

  health() {
    return { service: packageServiceManifest.name, status: "ok" as const };
  }
}
