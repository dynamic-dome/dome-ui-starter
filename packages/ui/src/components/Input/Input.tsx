import * as React from "react";

import { cn } from "../../lib/cn";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  size?: InputSize;
  containerClassName?: string;
}

const sizes: Record<InputSize, string> = {
  sm: "dome-input--sm",
  md: "dome-input--md",
  lg: "dome-input--lg",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      helpText,
      error,
      size = "md",
      className,
      containerClassName,
      "aria-describedby": ariaDescribedBy,
      "aria-invalid": ariaInvalid,
      ...rest
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const helpId = helpText ? `${inputId}-help` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;
    const describedBy = [ariaDescribedBy, helpId, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("dome-field", containerClassName)}>
        {label ? (
          <label className="dome-field__label" htmlFor={inputId}>
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn("dome-input", sizes[size], error && "dome-input--invalid", className)}
          aria-describedby={describedBy}
          aria-invalid={ariaInvalid ?? (Boolean(error) || undefined)}
          {...rest}
        />
        {helpText ? (
          <div id={helpId} className="dome-field__description">
            {helpText}
          </div>
        ) : null}
        {error ? (
          <div id={errorId} className="dome-field__error">
            {error}
          </div>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
