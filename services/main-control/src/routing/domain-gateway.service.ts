import { Injectable } from "@nestjs/common";

export interface DomainRoute {
  domain: "auth" | "user" | "company" | "job" | "application" | "resume" | "appointment" | "package" | "backoffice" | "file";
  socketEnv: string;
}

const routes: Record<DomainRoute["domain"], DomainRoute> = {
  auth: { domain: "auth", socketEnv: "AUTH_SERVICE_SOCKET" },
  user: { domain: "user", socketEnv: "USER_SERVICE_SOCKET" },
  company: { domain: "company", socketEnv: "COMPANY_SERVICE_SOCKET" },
  job: { domain: "job", socketEnv: "JOB_SERVICE_SOCKET" },
  application: { domain: "application", socketEnv: "APPLICATION_SERVICE_SOCKET" },
  resume: { domain: "resume", socketEnv: "RESUME_SERVICE_SOCKET" },
  appointment: { domain: "appointment", socketEnv: "APPOINTMENT_SERVICE_SOCKET" },
  package: { domain: "package", socketEnv: "PACKAGE_SERVICE_SOCKET" },
  backoffice: { domain: "backoffice", socketEnv: "BACKOFFICE_SERVICE_SOCKET" },
  file: { domain: "file", socketEnv: "FILE_SERVICE_SOCKET" }
};

@Injectable()
export class DomainGatewayService {
  getRoute(domain: DomainRoute["domain"]): DomainRoute {
    return routes[domain];
  }
}
