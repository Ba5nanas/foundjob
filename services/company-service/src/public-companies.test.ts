import { describe, expect, it } from "vitest";
import { getPublicCompany, listPublicCompanies, uploadCompanyLogo } from "./public-companies";

describe("public companies demo handlers", () => {
  it("lists verified public companies", () => {
    expect(listPublicCompanies()).toMatchObject({
      total: 3,
      operations: ["read"]
    });
  });

  it("reads a company by public slug", () => {
    expect(getPublicCompany("northstar-labs")).toMatchObject({
      name: "Northstar Labs",
      status: "VERIFIED"
    });
  });

  it("uploads a company logo as a public file descriptor", () => {
    expect(uploadCompanyLogo({ companyId: "northstar-labs", fileName: "logo.png", mimeType: "image/png" })).toMatchObject({
      companyId: "northstar-labs",
      file: {
        id: "file-company-logo-demo",
        visibility: "PUBLIC",
        publicPath: "/public/company/logos/logo.png"
      },
      updated: true
    });
  });
});
