export function canManageRole(actorLevel: number, targetLevel: number): boolean {
  return actorLevel > targetLevel;
}
