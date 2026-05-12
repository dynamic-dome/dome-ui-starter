import type { Meta, StoryObj } from "@storybook/react";
import { StatChip } from "./StatChip";

const meta = {
  title: "DoMe UI/StatChip",
  component: StatChip,
} satisfies Meta<typeof StatChip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: "AKTIV", value: "1/3" } };

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-2 w-[40rem]">
      <StatChip label="SYSTEM" value="bereit" />
      <StatChip label="AKTIV" value="1/3" />
      <StatChip label="INBOX" value="5" />
      <StatChip label="FREIGABE" value="2" />
    </div>
  ),
};
