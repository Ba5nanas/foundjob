import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DomainGatewayService, type DomainRequestOptions } from "../routing/domain-gateway.service";

@Controller()
export class PublicAppController {
  constructor(private readonly domainGateway: DomainGatewayService) {}

  @Post("auth/login")
  login(@Body() body: Record<string, unknown>) {
    return this.forward("auth", "/auth/login", { method: "POST", body });
  }

  @Post("auth/logout")
  logout() {
    return this.forward("auth", "/auth/logout", { method: "POST" });
  }

  @Post("auth/register/job-seeker")
  registerJobSeeker(@Body() body: Record<string, unknown>) {
    return this.forward("auth", "/auth/register/job-seeker", { method: "POST", body });
  }

  @Post("auth/register/company")
  registerCompany(@Body() body: Record<string, unknown>) {
    return this.forward("auth", "/auth/register/company", { method: "POST", body });
  }

  @Get("jobs")
  listJobs() {
    return this.forward("job", "/jobs");
  }

  @Post("jobs/search")
  searchJobs(@Body() body: Record<string, unknown>) {
    return this.forward("job", "/jobs/search", { method: "POST", body });
  }

  @Get("jobs/:jobId")
  getJob(@Param("jobId") jobId: string) {
    return this.forward("job", `/jobs/${encodeURIComponent(jobId)}`);
  }

  @Post("jobs/:jobId/apply")
  applyToJob(@Param("jobId") jobId: string, @Body() body: Record<string, unknown>) {
    return this.forward("application", `/jobs/${encodeURIComponent(jobId)}/apply`, {
      method: "POST",
      body: { ...body, jobId }
    });
  }

  @Get("companies")
  listCompanies() {
    return this.forward("company", "/companies");
  }

  @Get("companies/:companyId")
  getCompany(@Param("companyId") companyId: string) {
    return this.forward("company", `/companies/${encodeURIComponent(companyId)}`);
  }

  @Post("company/profile/logo")
  uploadCompanyLogo(@Body() body: Record<string, unknown>) {
    return this.forward("company", "/company/profile/logo", { method: "POST", body });
  }

  @Get("company/jobs/:jobId/applications")
  listCompanyJobApplications(@Param("jobId") jobId: string) {
    return this.forward("application", `/company/jobs/${encodeURIComponent(jobId)}/applications`);
  }

  @Post("seeker/profile/avatar")
  uploadSeekerAvatar(@Body() body: Record<string, unknown>) {
    return this.forward("user", "/seeker/profile/avatar", { method: "POST", body });
  }

  @Post("seeker/resume/export")
  exportResume(@Body() body: Record<string, unknown>) {
    return this.forward("resume", "/seeker/resume/export", { method: "POST", body });
  }

  @Post("seeker/resume/download")
  downloadResume(@Body() body: Record<string, unknown>) {
    return this.forward("resume", "/seeker/resume/download", { method: "POST", body });
  }

  private forward(
    domain: "auth" | "job" | "company" | "application" | "user" | "resume",
    path: string,
    options?: DomainRequestOptions
  ) {
    if (!options) {
      return this.domainGateway.request(domain, path);
    }

    return this.domainGateway.request(domain, path, options);
  }
}
