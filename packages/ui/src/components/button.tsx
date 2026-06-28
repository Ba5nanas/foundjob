import type { ButtonHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)]",
  secondary: "bg-[var(--secondary)] text-[var(--secondary-foreground)]",
  outline: "border border-[var(--border)] bg-transparent text-[var(--foreground)]",
  ghost: "bg-transparent text-[var(--foreground)] hover:bg-[var(--muted)]",
  danger: "bg-[var(--danger)] text-white",
  success: "bg-[var(--success)] text-white",
  link: "h-auto p-0 text-[var(--primary)] underline-offset-4 hover:underline"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base"
};

export function Button({ className, variant = "primary", size = "md", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        variant === "link" ? "" : sizes[size],
        className
      )}
      {...props}
    />
  );
}
