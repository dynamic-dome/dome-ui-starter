import * as React from "react";
import { cn } from "../lib/cn";

export interface StatChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: React.ReactNode;
  clickable?: boolean;
}

export function StatChip({ label, value, clickable = false, className, ...props }: StatChipProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[58px] flex-col justify-center gap-0.5 overflow-hidden rounded-[var(--r-sm)] border border-[color-mix(in_oklch,var(--ink-3)_60%,transparent)] bg-[color-mix(in_oklch,var(--ink-1)_80%,transparent)] px-1.5 py-2 text-center transition-all",
        "before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--paper-dim)_25%,transparent),transparent)] before:opacity-40",
        clickable && "cursor-pointer hover:border-[color-mix(in_oklch,var(--cyan)_32%,var(--ink-3))] hover:shadow-[var(--glow-soft)] active:scale-[0.98]",
        className,
      )}
      {...props}
    >
      <b className="overflow-hidden text-ellipsis font-display text-lg font-[360] tracking-[-0.01em] text-[var(--cyan)]">{value}</b>
      <span className="font-body text-[9.5px] uppercase tracking-[0.08em] text-[var(--paper-dim)]">{label}</span>
    </div>
  );
}
