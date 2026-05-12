import type { Meta, StoryObj } from "@storybook/react";
import { QuickActionGrid } from "./QuickActionGrid";

const meta = {
  title: "DoMe UI/QuickActionGrid",
  component: QuickActionGrid,
} satisfies Meta<typeof QuickActionGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

const actions = [
  { label: "Wiki", hint: "Notiz fuer die Wiki-Inbox", group: "Einfangen" },
  { label: "Lage", hint: "Was ist gerade los?", group: "Verdichten" },
  { label: "Duett", hint: "Zweite Meinung einholen", group: "Entscheiden" },
  { label: "Audit", hint: "Tests + Lint laufen lassen", group: "Betreiben" },
];

export const Default: Story = {
  render: () => (
    <div className="w-[40rem]">
      <QuickActionGrid actions={actions} />
    </div>
  ),
};
