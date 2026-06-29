import { describe, expect, it } from "vitest";
import { FileVisibility } from "@foundjob/shared-types";
import { FileService } from "./file.service";

describe("FileService", () => {
  it("resolves public files to /public URLs", () => {
    const url = new FileService().resolvePublicUrl({
      visibility: FileVisibility.PUBLIC,
      publicPath: "/public/company/logo.png",
      localPath: "/data/files/public/company/logo.png"
    });

    expect(url).toBe("/public/company/logo.png");
  });

  it("normalizes relative public paths", () => {
    const url = new FileService().resolvePublicUrl({
      visibility: FileVisibility.PUBLIC,
      publicPath: "company/logo.png",
      localPath: "/data/files/public/company/logo.png"
    });

    expect(url).toBe("/public/company/logo.png");
  });

  it("does not resolve protected files to public URLs", () => {
    expect(() =>
      new FileService().resolvePublicUrl({
        visibility: FileVisibility.PRIVATE,
        publicPath: null,
        localPath: "/data/files/private/file_002"
      })
    ).toThrow("Only public files can be resolved to public URLs");
  });

  it("does not expose local paths for protected files", () => {
    expect(
      new FileService().toProtectedDescriptor({
        id: "file_001",
        visibility: FileVisibility.ENCRYPTED,
        localPath: "/data/files/encrypted/file_001"
      })
    ).toEqual({
      type: "protected",
      fileId: "file_001",
      requiresDomainPermission: true
    });
  });
});
