import { describe, expect, it } from "vitest";
import { addMonths } from "./add-months";

describe("addMonths", () => {
  it("adds positive integer months", () => {
    expect(addMonths(new Date("2026-01-15T00:00:00.000Z"), 6).toISOString()).toBe(
      "2026-07-15T00:00:00.000Z"
    );
  });

  it("rejects invalid months", () => {
    expect(() => addMonths(new Date("2026-01-15T00:00:00.000Z"), 0)).toThrow(
      "months must be a positive integer"
    );
  });
});
