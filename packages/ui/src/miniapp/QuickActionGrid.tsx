import * as React from "react";
import { cn } from "../lib/cn";

export interface QuickAction {
  label: string;
  hint: string;
  group?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface QuickActionGridProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: QuickAction[];
  groups?: string[];
}

export function QuickActionGrid({ actions, groups = ["Einfangen", "Verdichten", "Entscheiden", "Betreiben"], className, ...props }: QuickActionGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-[var(--sp-2)]", className)} {...props}>
      {groups.map((group) => {
        const groupActions = actions.filter((action) => (action.group ?? "Einfangen") === group);
        if (groupActions.length === 0) return null;
        return (
          <React.Fragment key={group}>
            <div className="col-span-full mt-[var(--sp-2)] text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--paper-dim)] first:mt-0">{group}</div>
            {groupActions.map((action) => (
              <button
                key={`${group}-${action.label}`}
                type="button"
                disabled={action.disabled}
                onClick={action.onClick}
                className={cn(
                  "dome-miniapp-action flex min-h-20 flex-col justify-center gap-1 text-left disabled:cursor-wait disabled:opacity-70 active:scale-[0.98]",
                )}
              >
                <span className="font-body text-[17px] font-semibold tracking-[-0.01em] text-[var(--cyan)]">{action.label}</span>
                <span className="text-[11.5px] leading-snug text-[var(--paper-mid)]">{action.hint}</span>
              </button>
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
}
