import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function uploadSeekerAvatar(input: { fileName: string; mimeType: string }) {
  return createMainControlClient().request("/seeker/profile/avatar", {
    method: "POST",
    body: input
  });
}
