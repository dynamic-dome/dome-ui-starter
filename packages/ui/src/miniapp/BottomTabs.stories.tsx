import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BottomTabs } from "./BottomTabs";

const meta = {
  title: "DoMe UI/BottomTabs",
  component: BottomTabs,
} satisfies Meta<typeof BottomTabs>;
export default meta;
type Story = StoryObj<typeof meta>;

const tabs = [
  { id: "start", label: "START" },
  { id: "inbox", label: "INBOX" },
  { id: "aktivitaet", label: "AKTIVITAET", badge: 2 },
  { id: "ergebnisse", label: "ERGEBNISSE" },
  { id: "mehr", label: "MEHR" },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState("start");
    return (
      <div className="w-[28rem] border border-border/40 rounded-lg p-2">
        <BottomTabs tabs={tabs} activeId={active} onChange={setActive} />
      </div>
    );
  },
};
