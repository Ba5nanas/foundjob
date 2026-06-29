export interface DomainServiceManifest {
  name: string;
  domain: string;
  socketEnv: string;
  database: "postgres" | "mongodb" | "none";
  owns: readonly string[];
  dependsOn: readonly string[];
  emits: readonly string[];
}

export const resumeServiceManifest = {
  name: "resume-service",
  domain: "resume",
  socketEnv: "RESUME_SERVICE_SOCKET",
  database: "postgres",
  owns: ["resume records", "resume exports", "resume file references", "resume visibility"],
  dependsOn: ["user-service", "file-service"],
  emits: ["resume.updated", "resume.export_requested"]
} as const satisfies DomainServiceManifest;

export class ResumeService {
  getManifest(): DomainServiceManifest {
    return resumeServiceManifest;
  }

  health() {
    return { service: resumeServiceManifest.name, status: "ok" as const };
  }
}
