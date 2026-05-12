import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MiniAppShell } from "./MiniAppShell";
import { StatChip } from "./StatChip";
import { QuickActionGrid } from "./QuickActionGrid";
import { StatusPill } from "../primitives/StatusPill";

const meta: Meta<typeof MiniAppShell> = {
  title: "DoMe UI/MiniAppShell",
  component: MiniAppShell,
};
export default meta;

type Story = StoryObj<typeof MiniAppShell>;

export const Start: Story = {
  render: () => {
    const [active, setActive] = React.useState("start");
    return (
      <MiniAppShell
        activeTab={active}
        onTabChange={setActive}
        status={<StatusPill status="idle" showDot />}
        tabs={[
          { id: "start", label: "Start", icon: "⌂" },
          { id: "inbox", label: "Inbox", icon: "▣" },
          { id: "activity", label: "Aktivität", icon: "⚡", badge: 2 },
          { id: "artifacts", label: "Ergebnisse", icon: "◫" },
          { id: "more", label: "Mehr", icon: "•••" },
        ]}
      >
        <div className="grid grid-cols-4 gap-2">
          <StatChip label="System" value="bereit" />
          <StatChip label="Aktiv" value="1/3" />
          <StatChip label="Inbox" value="5" />
          <StatChip label="Freigabe" value="2" />
        </div>
        <section className="mt-4">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--paper-dim)]">Schnellaktionen</div>
          <QuickActionGrid actions={[
            { label: "Lage", hint: "Was ist gerade los?", group: "Verdichten" },
            { label: "Wiki", hint: "Notiz für die Wiki-Inbox", group: "Einfangen" },
            { label: "Todo", hint: "Aufgabe erfassen", group: "Entscheiden" },
            { label: "Recherche", hint: "Modus wechseln", group: "Betreiben" },
          ]} />
        </section>
      </MiniAppShell>
    );
  },
};
