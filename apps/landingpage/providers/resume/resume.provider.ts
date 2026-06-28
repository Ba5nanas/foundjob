import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function requestResumeDownload(input: { resumeId: string }) {
  return createMainControlClient().request("/seeker/resume/download", {
    method: "POST",
    body: input
  });
}
