import * as React from "react";
import { cn } from "../lib/cn";

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "light" | "dark";
}

export function ThemeProvider({ theme = "dark", className, children, ...props }: ThemeProviderProps) {
  return (
    <div
      className={cn("dome-theme min-h-screen bg-background text-foreground", theme, className)}
      data-theme={theme}
      {...props}
    >
      {children}
    </div>
  );
}
