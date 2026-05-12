import * as React from "react";
import { cn } from "../lib/cn";
import { BottomTabs, type BottomTab } from "./BottomTabs";

export interface MiniAppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  status?: React.ReactNode;
  tabs?: BottomTab[];
  activeTab?: string;
  onTabChange?: (id: string) => void;
}

export function MiniAppShell({
  title = "Claude Zentrale",
  status,
  tabs,
  activeTab,
  onTabChange,
  className,
  children,
  ...props
}: MiniAppShellProps) {
  return (
    <div className={cn("dome-miniapp-theme min-h-screen bg-[var(--ink-0)] text-[var(--paper)]", className)} {...props}>
      <header className="sticky top-0 z-40 flex items-center justify-between gap-[var(--sp-3)] border-b border-[color-mix(in_oklch,var(--ink-3)_50%,transparent)] bg-[color-mix(in_oklch,var(--ink-0)_72%,transparent)] px-[var(--sp-4)] py-[var(--sp-3)] backdrop-blur-xl">
        <h1 className="flex items-center gap-[var(--sp-2)] font-display text-lg font-[360] tracking-[-0.01em] text-[var(--paper)]">
          <span className="text-sm text-[var(--cyan)] [text-shadow:0_0_8px_color-mix(in_oklch,var(--cyan)_60%,transparent)]" aria-hidden="true">◆</span>
          {title}
        </h1>
        {status}
      </header>
      <main className="px-[var(--sp-3)] py-[var(--sp-3)] pb-[calc(92px+env(safe-area-inset-bottom,0px))]">{children}</main>
      {tabs && activeTab && onTabChange && <BottomTabs tabs={tabs} activeId={activeTab} onChange={onTabChange} />}
    </div>
  );
}
