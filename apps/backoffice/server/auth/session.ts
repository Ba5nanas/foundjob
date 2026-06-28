import "server-only";

export interface AdminSession {
  userId: string;
  roleLevel: number;
  permissions: string[];
}

export async function getAdminSession(): Promise<AdminSession | null> {
  return null;
}
