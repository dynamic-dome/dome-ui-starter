import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-secondary/60 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gold: "bg-gradient-gold text-primary-foreground font-semibold shadow-gold hover:brightness-110 hover:shadow-[0_10px_50px_-10px_hsl(42_70%_55%/0.6)]",
        outlineGold: "border border-gold/40 bg-transparent text-gold hover:bg-gold/10 hover:border-gold/70",
        neon: "bg-transparent text-foreground border border-neon-cyan/40 hover:border-neon-magenta/70 hover:shadow-neon",
        cyan: "border border-[color-mix(in_oklch,var(--cyan)_55%,var(--ink-3))] bg-[color-mix(in_oklch,var(--cyan)_18%,var(--ink-1))] text-[var(--cyan)] hover:text-[var(--paper)] hover:shadow-[var(--glow-strong)]",
        approve: "border border-[color-mix(in_oklch,var(--mint)_45%,var(--ink-3))] bg-[color-mix(in_oklch,var(--mint)_20%,var(--ink-1))] text-[var(--mint)] hover:shadow-[0_0_32px_-8px_var(--mint)]",
        deny: "border border-[color-mix(in_oklch,var(--rose)_45%,var(--ink-3))] bg-[color-mix(in_oklch,var(--rose)_18%,var(--ink-1))] text-[var(--rose)] hover:shadow-[var(--glow-rose)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-3.5",
        lg: "h-12 rounded-md px-7 text-base",
        xl: "h-14 rounded-lg px-9 text-base",
        icon: "h-10 w-10",
        pill: "h-10 rounded-full px-5 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  loadingLabel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, loadingLabel = "Lädt…", disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...props}
      >
        {loading ? loadingLabel : children}
      </Comp>
    );
  },
);
Button.displayName = "Button";
