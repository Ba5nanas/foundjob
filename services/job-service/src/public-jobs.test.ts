import { describe, expect, it } from "vitest";
import { getPublicJob, listPublicJobs, searchPublicJobs } from "./public-jobs";

describe("public jobs demo handlers", () => {
  it("lists public jobs with read and apply operations", () => {
    expect(listPublicJobs()).toMatchObject({
      total: 3,
      operations: ["search", "read", "apply"]
    });
  });

  it("searches by title, company, and location", () => {
    expect(searchPublicJobs({ keyword: "frontend", location: "Bangkok" })).toMatchObject({
      total: 1,
      items: [expect.objectContaining({ id: "frontend-developer" })]
    });

    expect(searchPublicJobs({ keyword: "Cloud" }).items.map((job) => job.id)).toEqual(["backend-engineer"]);
  });

  it("reads a job by public slug", () => {
    expect(getPublicJob("frontend-developer")).toMatchObject({
      title: "Frontend Developer",
      companyId: "northstar-labs"
    });
  });
});
