export interface DomainServiceManifest {
  name: string;
  domain: string;
  socketEnv: string;
  database: "postgres" | "mongodb" | "none";
  owns: readonly string[];
  dependsOn: readonly string[];
  emits: readonly string[];
}

export const userServiceManifest = {
  name: "user-service",
  domain: "user",
  socketEnv: "USER_SERVICE_SOCKET",
  database: "postgres",
  owns: ["job seeker profiles", "saved jobs", "seeker account status", "profile file references"],
  dependsOn: ["auth-service", "file-service"],
  emits: ["user.profile_updated", "user.status_changed"]
} as const satisfies DomainServiceManifest;

export class UserService {
  getManifest(): DomainServiceManifest {
    return userServiceManifest;
  }

  health() {
    return { service: userServiceManifest.name, status: "ok" as const };
  }
}
