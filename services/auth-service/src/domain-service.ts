export interface DomainServiceManifest {
  name: string;
  domain: string;
  socketEnv: string;
  database: "postgres" | "mongodb" | "none";
  owns: readonly string[];
  dependsOn: readonly string[];
  emits: readonly string[];
}

export const authServiceManifest = {
  name: "auth-service",
  domain: "auth",
  socketEnv: "AUTH_SERVICE_SOCKET",
  database: "postgres",
  owns: ["credentials", "sessions", "refresh tokens", "password resets", "account verification"],
  dependsOn: ["user-service", "company-service", "email-worker"],
  emits: ["auth.user_registered", "auth.company_registered", "auth.password_reset_requested"]
} as const satisfies DomainServiceManifest;

export class AuthService {
  getManifest(): DomainServiceManifest {
    return authServiceManifest;
  }

  health() {
    return { service: authServiceManifest.name, status: "ok" as const };
  }
}
