import { describe, expect, it } from "vitest";
import { validateEmploymentType } from "./employment-type-policy";

describe("validateEmploymentType", () => {
  it("allows permanent jobs without a contract duration", () => {
    expect(validateEmploymentType({ employmentType: "PERMANENT" })).toEqual({ valid: true });
  });

  it("rejects permanent jobs with a contract duration", () => {
    expect(validateEmploymentType({ employmentType: "PERMANENT", contractDurationMonths: 6 })).toEqual({
      valid: false,
      reason: "PERMANENT_DURATION_NOT_ALLOWED"
    });
  });

  it("requires contract jobs to have a positive duration", () => {
    expect(validateEmploymentType({ employmentType: "CONTRACT" })).toEqual({
      valid: false,
      reason: "CONTRACT_DURATION_REQUIRED"
    });
    expect(validateEmploymentType({ employmentType: "CONTRACT", contractDurationMonths: 0 })).toEqual({
      valid: false,
      reason: "CONTRACT_DURATION_REQUIRED"
    });
  });

  it("allows contract jobs with a positive duration", () => {
    expect(validateEmploymentType({ employmentType: "CONTRACT", contractDurationMonths: 12 })).toEqual({
      valid: true
    });
  });
});
