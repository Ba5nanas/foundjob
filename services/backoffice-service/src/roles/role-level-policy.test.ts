import { describe, expect, it } from "vitest";
import { BackofficeRole, backofficeRoleLevels } from "@foundjob/shared-types";
import { canManageTargetRole } from "./role-level-policy";

const role = (slug: BackofficeRole) => ({ slug, level: backofficeRoleLevels[slug] });

describe("backoffice role level policy", () => {
  it("allows SUPERADMIN to manage ADMIN", () => {
    expect(canManageTargetRole(role(BackofficeRole.SUPERADMIN), role(BackofficeRole.ADMIN))).toBe(true);
  });

  it("prevents ADMIN from managing SUPERADMIN", () => {
    expect(canManageTargetRole(role(BackofficeRole.ADMIN), role(BackofficeRole.SUPERADMIN))).toBe(false);
  });

  it("prevents ADMIN from managing ADMIN", () => {
    expect(canManageTargetRole(role(BackofficeRole.ADMIN), role(BackofficeRole.ADMIN))).toBe(false);
  });

  it("allows ADMIN to manage SUPPORT", () => {
    expect(canManageTargetRole(role(BackofficeRole.ADMIN), role(BackofficeRole.SUPPORT))).toBe(true);
  });

  it("prevents SUPPORT from managing ADMIN", () => {
    expect(canManageTargetRole(role(BackofficeRole.SUPPORT), role(BackofficeRole.ADMIN))).toBe(false);
  });
});
