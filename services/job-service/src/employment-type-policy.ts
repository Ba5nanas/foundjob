export type EmploymentType = "PERMANENT" | "CONTRACT";

export interface EmploymentTypeInput {
  employmentType: EmploymentType;
  contractDurationMonths?: number | null;
}

export type EmploymentTypeValidation =
  | { valid: true }
  | { valid: false; reason: "CONTRACT_DURATION_REQUIRED" | "PERMANENT_DURATION_NOT_ALLOWED" };

export function validateEmploymentType(input: EmploymentTypeInput): EmploymentTypeValidation {
  if (input.employmentType === "CONTRACT") {
    return typeof input.contractDurationMonths === "number" && input.contractDurationMonths > 0
      ? { valid: true }
      : { valid: false, reason: "CONTRACT_DURATION_REQUIRED" };
  }

  return input.contractDurationMonths == null
    ? { valid: true }
    : { valid: false, reason: "PERMANENT_DURATION_NOT_ALLOWED" };
}
