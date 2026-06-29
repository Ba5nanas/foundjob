import { describe, expect, it } from "vitest";
import { uploadSeekerAvatar } from "./seeker-profile";

describe("seeker profile demo handlers", () => {
  it("uploads a seeker avatar as a public file descriptor", () => {
    expect(uploadSeekerAvatar({ seekerId: "seeker-001", fileName: "avatar.png", mimeType: "image/png" })).toMatchObject({
      seekerId: "seeker-001",
      file: {
        id: "file-seeker-avatar-demo",
        visibility: "PUBLIC",
        publicPath: "/public/seeker/avatars/avatar.png"
      },
      updated: true
    });
  });
});
