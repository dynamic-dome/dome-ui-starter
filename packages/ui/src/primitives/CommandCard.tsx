import * as React from "react";
import { cn } from "../lib/cn";
import { Button } from "./Button";
import { Card } from "./Card";

export interface CommandCardAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface CommandCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: CommandCardAction[];
}

export function CommandCard({ title, description, icon, meta, actions = [], className, ...props }: CommandCardProps) {
  return (
    <Card variant="miniapp" className={cn("cursor-default", className)} {...props}>
      <div className="flex items-start gap-3">
        {icon && <div className="mt-0.5 text-[var(--cyan)]">{icon}</div>}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-display text-[15px] font-medium text-[var(--paper)]">{title}</h3>
            {meta && <span className="shrink-0 font-mono text-[11px] text-[var(--paper-dim)]">{meta}</span>}
          </div>
          {description && <div className="mt-1 text-sm leading-relaxed text-[var(--paper-mid)]">{description}</div>}
          {actions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {actions.map((action) =>
                action.href ? (
                  <Button key={action.label} asChild variant="cyan" size="sm">
                    <a href={action.href}>{action.label}</a>
                  </Button>
                ) : (
                  <Button key={action.label} variant="cyan" size="sm" onClick={action.onClick}>
                    {action.label}
                  </Button>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
