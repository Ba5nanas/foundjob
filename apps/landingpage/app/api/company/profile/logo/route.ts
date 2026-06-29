import { uploadCompanyLogo } from "@/providers/company-profile/company-profile.provider";
import { handleApiRoute } from "@/server/http/handle-api-route";
import { parseJsonObject } from "@/server/http/parse-request";

export async function POST(request: Request) {
  return handleApiRoute(async () => {
    const body = await parseJsonObject(request);

    return uploadCompanyLogo({
      fileName: typeof body.fileName === "string" ? body.fileName : "company-logo.png",
      mimeType: typeof body.mimeType === "string" ? body.mimeType : "image/png"
    });
  });
}
