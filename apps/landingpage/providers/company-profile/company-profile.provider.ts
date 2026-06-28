import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function uploadCompanyLogo(input: { fileName: string; mimeType: string }) {
  return createMainControlClient().request("/company/profile/logo", {
    method: "POST",
    body: input
  });
}
