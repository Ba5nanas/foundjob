import type { HTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "premium";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[var(--muted)] text-[var(--foreground)]",
  success: "bg-[var(--success-soft)] text-[var(--success)]",
  warning: "bg-[var(--warning-soft)] text-[var(--warning)]",
  danger: "bg-[var(--danger-soft)] text-[var(--danger)]",
  info: "bg-[var(--info-soft)] text-[var(--info)]",
  premium: "bg-violet-100 text-violet-700"
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-[26px] items-center rounded-[var(--radius-full)] px-2.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
