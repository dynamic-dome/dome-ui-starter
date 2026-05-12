import * as React from "react";
import { CommandCard } from "../primitives/CommandCard";
import { StatusPill, type StatusKind } from "../primitives/StatusPill";

export interface ActivityItem {
  id: string;
  title: string;
  preview?: string;
  status: StatusKind;
  meta?: string;
  onClick?: () => void;
}

export interface ActivityListProps {
  items: ActivityItem[];
  emptyText?: string;
}

export function ActivityList({ items, emptyText = "Aktuell läuft nichts." }: ActivityListProps) {
  if (items.length === 0) {
    return <div className="rounded-[var(--r-sm)] border border-dashed border-[color-mix(in_oklch,var(--ink-3)_55%,transparent)] p-[var(--sp-3)] text-center text-sm text-[var(--paper-dim)]">{emptyText}</div>;
  }

  return (
    <div className="grid gap-[var(--sp-2)]">
      {items.map((item) => (
        <CommandCard
          key={item.id}
          title={item.title}
          description={item.preview}
          meta={<StatusPill status={item.status} />}
          onClick={item.onClick}
        />
      ))}
    </div>
  );
}
