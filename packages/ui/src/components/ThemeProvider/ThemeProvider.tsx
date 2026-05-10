import * as React from "react";

import { cn } from "../../lib/cn";

export type DomeTheme = "light" | "dark" | "system";

export interface ThemeProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: DomeTheme;
}

export function ThemeProvider({ theme = "light", className, children, ...rest }: ThemeProviderProps) {
  return (
    <div data-dome-theme={theme} className={cn("dome-theme", className)} {...rest}>
      {children}
    </div>
  );
}
