export interface DomainServiceManifest {
  name: string;
  domain: string;
  socketEnv: string;
  database: "postgres" | "mongodb" | "none";
  owns: readonly string[];
  dependsOn: readonly string[];
  emits: readonly string[];
}

export const jobServiceManifest = {
  name: "job-service",
  domain: "job",
  socketEnv: "JOB_SERVICE_SOCKET",
  database: "postgres",
  owns: ["job posts", "employment type rules", "job status", "active job limits"],
  dependsOn: ["company-service", "package-service"],
  emits: ["job.created", "job.approved", "job.closed", "job.expired"]
} as const satisfies DomainServiceManifest;

export class JobService {
  getManifest(): DomainServiceManifest {
    return jobServiceManifest;
  }

  health() {
    return { service: jobServiceManifest.name, status: "ok" as const };
  }
}
