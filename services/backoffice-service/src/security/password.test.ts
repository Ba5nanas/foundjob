import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("backoffice admin password hashing", () => {
  it("hashes passwords instead of storing plain text", () => {
    const hash = hashPassword("ChangeMe123!", "fixed-test-salt");

    expect(hash).not.toBe("ChangeMe123!");
    expect(hash).toMatch(/^scrypt:/);
    expect(verifyPassword("ChangeMe123!", hash)).toBe(true);
  });

  it("rejects wrong passwords", () => {
    const hash = hashPassword("ChangeMe123!", "fixed-test-salt");

    expect(verifyPassword("wrong-password", hash)).toBe(false);
  });
});
