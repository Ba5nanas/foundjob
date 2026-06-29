export interface PublicCompany {
  id: string;
  name: string;
  industry: string;
  location: string;
  status: "VERIFIED" | "PENDING_REVIEW";
  openJobs: number;
  description: string;
}

export const publicCompanies: readonly PublicCompany[] = [
  {
    id: "northstar-labs",
    name: "Northstar Labs",
    industry: "SaaS platform",
    location: "Bangkok / Remote",
    status: "VERIFIED",
    openJobs: 18,
    description: "Northstar Labs builds workflow tools for teams that need reliable hiring and audit logs."
  },
  {
    id: "blue-harbor",
    name: "Blue Harbor",
    industry: "Financial technology",
    location: "Remote first",
    status: "VERIFIED",
    openJobs: 7,
    description: "Blue Harbor builds financial products for modern operations teams."
  },
  {
    id: "foundry-cloud",
    name: "Foundry Cloud",
    industry: "Infrastructure",
    location: "Hybrid",
    status: "VERIFIED",
    openJobs: 11,
    description: "Foundry Cloud runs infrastructure services for distributed product teams."
  }
];

export function listPublicCompanies() {
  return {
    items: publicCompanies,
    total: publicCompanies.length,
    operations: ["read"] as const
  };
}

export function getPublicCompany(companyId: string) {
  return publicCompanies.find((company) => company.id === companyId) ?? null;
}

export function uploadCompanyLogo(input: Record<string, unknown>) {
  const fileName = typeof input.fileName === "string" ? input.fileName : "company-logo.png";
  const mimeType = typeof input.mimeType === "string" ? input.mimeType : "image/png";

  return {
    companyId: typeof input.companyId === "string" ? input.companyId : "company-demo",
    file: {
      id: "file-company-logo-demo",
      fileName,
      mimeType,
      visibility: "PUBLIC" as const,
      publicPath: `/public/company/logos/${fileName}`
    },
    updated: true
  };
}
