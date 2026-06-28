import { EmploymentType, JobStatus } from "@foundjob/shared-types";

export interface JobDto {
  id: string;
  companyId: string;
  title: string;
  description: string;
  requiredHeadcount: number;
  hiredCount: number;
  status: JobStatus;
  employmentType: EmploymentType;
  contractDurationMonths: number | null;
  salaryMin: number | null;
  salaryMax: number | null;
  location: string | null;
  createdByUserId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobDto {
  title: string;
  description: string;
  requiredHeadcount: number;
  employmentType: EmploymentType;
  contractDurationMonths?: number | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  location?: string | null;
}
