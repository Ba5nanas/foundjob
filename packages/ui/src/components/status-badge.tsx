import { Badge } from "./badge";

export interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const variant =
    status.includes("HIRED") || status.includes("OPEN") || status.includes("ACTIVE")
      ? "success"
      : status.includes("REJECTED") || status.includes("CLOSED") || status.includes("EXPIRED")
        ? "danger"
        : status.includes("PENDING") || status.includes("PAUSED")
          ? "warning"
          : "info";

  return <Badge variant={variant}>{status.replaceAll("_", " ")}</Badge>;
}
