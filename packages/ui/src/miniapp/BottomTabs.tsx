import * as React from "react";
import { cn } from "../lib/cn";

export interface BottomTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number | string;
}

export interface BottomTabsProps {
  tabs: BottomTab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function BottomTabs({ tabs, activeId, onChange, className }: BottomTabsProps) {
  return (
    <nav
      aria-label="Hauptnavigation"
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-[560px] border-t border-[color-mix(in_oklch,var(--ink-3)_40%,transparent)] bg-[color-mix(in_oklch,var(--ink-0)_78%,transparent)] py-1.5 pb-[calc(env(safe-area-inset-bottom,0px)+6px)] shadow-[0_-12px_32px_-12px_rgba(0,0,0,0.5)] backdrop-blur-2xl",
        className,
      )}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            aria-current={active ? "page" : undefined}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative flex min-w-0 flex-1 flex-col items-center gap-0.5 px-0.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.04em] text-[color-mix(in_oklch,var(--paper)_45%,transparent)] transition-colors hover:text-[color-mix(in_oklch,var(--paper)_70%,transparent)]",
              active && "text-[var(--cyan)] after:absolute after:bottom-0.5 after:left-1/2 after:h-0.5 after:w-6 after:-translate-x-1/2 after:rounded after:bg-[var(--cyan)] after:shadow-[0_0_12px_-2px_var(--cyan)]",
            )}
          >
            {tab.icon && <span className={cn("text-lg leading-none transition-transform", active && "-translate-y-0.5")}>{tab.icon}</span>}
            <span className="text-[8.5px]">{tab.label}</span>
            {tab.badge !== undefined && tab.badge !== 0 && (
              <span className="absolute right-[calc(50%-20px)] top-0.5 h-4 min-w-4 rounded-full bg-[var(--rose)] px-1 text-center font-mono text-[9px] font-semibold leading-4 text-white shadow-[0_0_12px_-2px_var(--rose)]">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
