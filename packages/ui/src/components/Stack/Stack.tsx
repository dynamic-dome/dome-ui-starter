import * as React from "react";

import { cn } from "../../lib/cn";

export type StackDirection = "row" | "column";
export type StackGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?: StackGap;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  wrap?: boolean;
}

const gaps: Record<StackGap, string> = {
  xs: "var(--dome-space-1)",
  sm: "var(--dome-space-2)",
  md: "var(--dome-space-4)",
  lg: "var(--dome-space-5)",
  xl: "var(--dome-space-6)",
};

export const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = "column",
      gap = "md",
      align = "stretch",
      justify = "flex-start",
      wrap = false,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const stackStyle = {
      ...style,
      "--dome-stack-direction": direction,
      "--dome-stack-gap": gaps[gap],
      "--dome-stack-align": align,
      "--dome-stack-justify": justify,
      "--dome-stack-wrap": wrap ? "wrap" : "nowrap",
    } as React.CSSProperties;

    return <div ref={ref} className={cn("dome-stack", className)} style={stackStyle} {...rest} />;
  },
);

Stack.displayName = "Stack";
