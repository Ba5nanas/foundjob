import { uploadSeekerAvatar } from "@/providers/seeker-profile/seeker-profile.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    const body = await parseJsonObject(request);

    return uploadSeekerAvatar({
      fileName: typeof body.fileName === "string" ? body.fileName : "avatar.png",
      mimeType: typeof body.mimeType === "string" ? body.mimeType : "image/png"
    });
  });
}
