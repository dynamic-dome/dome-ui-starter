import * as React from "react";

import { cn } from "../../lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingLabel?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: "dome-button--primary",
  secondary: "dome-button--secondary",
  ghost: "dome-button--ghost",
};

const sizes: Record<ButtonSize, string> = {
  sm: "dome-button--sm",
  md: "dome-button--md",
  lg: "dome-button--lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      loadingLabel = "Lädt",
      disabled,
      className,
      children,
      type = "button",
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn("dome-button", variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? <span className="dome-button__spinner" aria-hidden="true" /> : null}
        <span>{loading ? loadingLabel : children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";
