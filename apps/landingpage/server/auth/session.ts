import "server-only";

export interface UserSession {
  userId: string;
  role: "JOB_SEEKER" | "COMPANY_USER";
}

export async function getSession(): Promise<UserSession | null> {
  return null;
}
