import "server-only";
import { createMainControlClient } from "../../server/gateway/main-control.socket";

export async function requestResumeExport(input: { resumeId: string; format?: string }) {
  return createMainControlClient().request("/seeker/resume/export", {
    method: "POST",
    body: input
  });
}

export async function requestResumeDownload(input: { resumeId: string }) {
  return createMainControlClient().request("/seeker/resume/download", {
    method: "POST",
    body: input
  });
}
