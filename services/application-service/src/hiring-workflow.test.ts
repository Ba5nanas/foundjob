import { describe, expect, it } from "vitest";
import { canTransitionApplicationStatus } from "./hiring-workflow";

describe("application hiring workflow", () => {
  it("allows the happy path from application review to hire", () => {
    expect(canTransitionApplicationStatus("APPLIED", "REVIEWING")).toBe(true);
    expect(canTransitionApplicationStatus("REVIEWING", "SHORTLISTED")).toBe(true);
    expect(canTransitionApplicationStatus("SHORTLISTED", "APPOINTMENT_SCHEDULED")).toBe(true);
    expect(canTransitionApplicationStatus("APPOINTMENT_SCHEDULED", "INTERVIEWED")).toBe(true);
    expect(canTransitionApplicationStatus("INTERVIEWED", "OFFERED")).toBe(true);
    expect(canTransitionApplicationStatus("OFFERED", "HIRED")).toBe(true);
  });

  it("keeps terminal statuses closed", () => {
    expect(canTransitionApplicationStatus("HIRED", "REVIEWING")).toBe(false);
    expect(canTransitionApplicationStatus("REJECTED", "SHORTLISTED")).toBe(false);
    expect(canTransitionApplicationStatus("CANCELLED", "APPLIED")).toBe(false);
  });

  it("does not allow skipping directly from applied to hired", () => {
    expect(canTransitionApplicationStatus("APPLIED", "HIRED")).toBe(false);
  });
});
