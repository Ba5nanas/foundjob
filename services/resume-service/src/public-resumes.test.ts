import { describe, expect, it } from "vitest";
import { downloadResume, exportResume } from "./public-resumes";

describe("public resume demo handlers", () => {
  it("queues a resume export", () => {
    expect(exportResume({ resumeId: "resume-001", format: "pdf" })).toMatchObject({
      resumeId: "resume-001",
      exportId: "resume-export-resume-001",
      status: "QUEUED",
      format: "pdf"
    });
  });

  it("returns a protected resume download descriptor", () => {
    expect(downloadResume({ resumeId: "resume-001" })).toMatchObject({
      resumeId: "resume-001",
      file: {
        id: "file-resume-001",
        type: "protected",
        requiresDomainPermission: true
      }
    });
  });
});
