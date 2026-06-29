export function uploadSeekerAvatar(input: Record<string, unknown>) {
  const fileName = typeof input.fileName === "string" ? input.fileName : "avatar.png";
  const mimeType = typeof input.mimeType === "string" ? input.mimeType : "image/png";

  return {
    seekerId: typeof input.seekerId === "string" ? input.seekerId : "seeker-demo",
    file: {
      id: "file-seeker-avatar-demo",
      fileName,
      mimeType,
      visibility: "PUBLIC" as const,
      publicPath: `/public/seeker/avatars/${fileName}`
    },
    updated: true
  };
}
