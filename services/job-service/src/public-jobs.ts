export interface PublicJob {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  employmentType: "CONTRACT" | "PERMANENT";
  duration: string;
  salaryRange: string;
  status: "OPEN" | "UNDER_REVIEW";
  description: string;
}

export const publicJobs: readonly PublicJob[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    companyId: "northstar-labs",
    companyName: "Northstar Labs",
    location: "Bangkok hybrid",
    employmentType: "CONTRACT",
    duration: "6 months",
    salaryRange: "THB 70k - 110k",
    status: "OPEN",
    description: "Build clear, accessible hiring workflows for job seekers, companies, and internal operators."
  },
  {
    id: "product-designer",
    title: "Product Designer",
    companyId: "blue-harbor",
    companyName: "Blue Harbor",
    location: "Remote",
    employmentType: "PERMANENT",
    duration: "Full time",
    salaryRange: "THB 80k - 130k",
    status: "OPEN",
    description: "Design product screens for job discovery, applications, and company hiring workflows."
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer",
    companyId: "foundry-cloud",
    companyName: "Foundry Cloud",
    location: "Hybrid",
    employmentType: "CONTRACT",
    duration: "12 months",
    salaryRange: "THB 95k - 150k",
    status: "OPEN",
    description: "Own service APIs, domain events, and internal platform reliability for hiring workflows."
  }
];

export function listPublicJobs() {
  return {
    items: publicJobs,
    total: publicJobs.length,
    operations: ["search", "read", "apply"] as const
  };
}

export function searchPublicJobs(input: Record<string, unknown>) {
  const keyword = normalize(input.keyword);
  const location = normalize(input.location);
  const items = publicJobs.filter((job) => {
    const keywordMatch = !keyword || normalize(`${job.title} ${job.companyName} ${job.description}`).includes(keyword);
    const locationMatch = !location || normalize(job.location).includes(location);

    return keywordMatch && locationMatch;
  });

  return {
    items,
    total: items.length,
    query: {
      keyword: typeof input.keyword === "string" ? input.keyword : "",
      location: typeof input.location === "string" ? input.location : ""
    }
  };
}

export function getPublicJob(jobId: string) {
  return publicJobs.find((job) => job.id === jobId) ?? null;
}

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}
