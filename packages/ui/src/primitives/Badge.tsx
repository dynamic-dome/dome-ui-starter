import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        gold: "border-gold/35 bg-gold/10 text-gold-soft",
        cyan: "border-[color-mix(in_oklch,var(--cyan)_35%,transparent)] bg-[color-mix(in_oklch,var(--cyan)_14%,transparent)] text-[var(--cyan)]",
        mint: "border-[color-mix(in_oklch,var(--mint)_35%,transparent)] bg-[color-mix(in_oklch,var(--mint)_14%,transparent)] text-[var(--mint)]",
        amber: "border-[color-mix(in_oklch,var(--amber)_35%,transparent)] bg-[color-mix(in_oklch,var(--amber)_14%,transparent)] text-[var(--amber)]",
        rose: "border-[color-mix(in_oklch,var(--rose)_35%,transparent)] bg-[color-mix(in_oklch,var(--rose)_14%,transparent)] text-[var(--rose)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
