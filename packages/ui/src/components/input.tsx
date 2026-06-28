import type { InputHTMLAttributes } from "react";
import { cn } from "../utils/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ className, invalid = false, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-[var(--radius-md)] border bg-white px-3 text-sm outline-none transition-colors placeholder:text-[var(--muted-foreground)] disabled:cursor-not-allowed disabled:opacity-50",
        invalid ? "border-[var(--danger)]" : "border-[var(--input)] focus:border-[var(--primary)]",
        className
      )}
      {...props}
    />
  );
}
