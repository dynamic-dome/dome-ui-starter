import * as React from "react";
import { cn } from "../lib/cn";

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  atmospheric?: boolean;
}

export function AppShell({ header, footer, atmospheric = true, className, children, ...props }: AppShellProps) {
  return (
    <div className={cn("dome-theme min-h-screen bg-background text-foreground", className)} {...props}>
      {atmospheric && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute -top-64 left-1/2 h-[780px] w-[780px] -translate-x-1/2 bg-gradient-radial-gold opacity-45" />
          <div className="absolute right-0 top-1/3 h-[520px] w-[520px] bg-gradient-radial-neon opacity-35" />
        </div>
      )}
      {header}
      <main className="relative">{children}</main>
      {footer}
    </div>
  );
}
