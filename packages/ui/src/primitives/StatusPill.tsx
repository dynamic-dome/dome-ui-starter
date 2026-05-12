import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const statusLabels = {
  queued: "in Warteschlange",
  running: "läuft",
  waiting_approval: "wartet auf Freigabe",
  completed: "fertig",
  failed: "fehlgeschlagen",
  cancelled: "abgebrochen",
  ok: "bereit",
  idle: "bereit",
  busy: "arbeitet",
  warn: "Achtung",
} as const;

export type StatusKind = keyof typeof statusLabels;

const statusPillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.06em]",
  {
    variants: {
      status: {
        queued: "border-[color-mix(in_oklch,var(--profile-sonnet)_28%,transparent)] bg-[color-mix(in_oklch,var(--profile-sonnet)_14%,transparent)] text-[var(--profile-sonnet)]",
        running: "border-[color-mix(in_oklch,var(--amber)_28%,transparent)] bg-[color-mix(in_oklch,var(--amber)_14%,transparent)] text-[var(--amber)]",
        waiting_approval: "border-[color-mix(in_oklch,var(--amber)_35%,transparent)] bg-[color-mix(in_oklch,var(--amber)_18%,transparent)] text-[var(--amber)] shadow-[var(--glow-amber)]",
        completed: "border-[color-mix(in_oklch,var(--mint)_28%,transparent)] bg-[color-mix(in_oklch,var(--mint)_14%,transparent)] text-[var(--mint)]",
        failed: "border-[color-mix(in_oklch,var(--rose)_30%,transparent)] bg-[color-mix(in_oklch,var(--rose)_16%,transparent)] text-[var(--rose)]",
        cancelled: "border-[color-mix(in_oklch,var(--paper-dim)_22%,transparent)] bg-[color-mix(in_oklch,var(--paper-dim)_12%,transparent)] text-[var(--paper-dim)]",
        ok: "border-[color-mix(in_oklch,var(--mint)_28%,transparent)] bg-[color-mix(in_oklch,var(--mint)_14%,transparent)] text-[var(--mint)]",
        idle: "border-[color-mix(in_oklch,var(--mint)_24%,transparent)] bg-[color-mix(in_oklch,var(--mint)_10%,transparent)] text-[var(--mint)]",
        busy: "border-[color-mix(in_oklch,var(--cyan)_32%,transparent)] bg-[color-mix(in_oklch,var(--cyan)_14%,transparent)] text-[var(--cyan)]",
        warn: "border-[color-mix(in_oklch,var(--amber)_35%,transparent)] bg-[color-mix(in_oklch,var(--amber)_18%,transparent)] text-[var(--amber)]",
      },
    },
    defaultVariants: { status: "idle" },
  },
);

export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof statusPillVariants> {
  label?: string;
  showDot?: boolean;
}

export function StatusPill({ className, status = "idle", label, showDot = false, ...props }: StatusPillProps) {
  const resolvedStatus = status ?? "idle";
  return (
    <span className={cn(statusPillVariants({ status: resolvedStatus }), className)} {...props}>
      {showDot && <span className="status-dot" aria-hidden="true" />}
      {label ?? statusLabels[resolvedStatus] ?? resolvedStatus}
    </span>
  );
}
