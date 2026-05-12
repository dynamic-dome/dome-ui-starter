import type { Meta, StoryObj } from "@storybook/react";
import { CommandCard } from "./CommandCard";

const meta = {
  title: "DoMe UI/CommandCard",
  component: CommandCard,
} satisfies Meta<typeof CommandCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Lage",
    description: "Was ist gerade los? Eine kurze Auslese aller offenen Threads.",
  },
  render: (args) => <div className="w-96"><CommandCard {...args} /></div>,
};

export const WithActions: Story = {
  args: {
    title: "Wiki-Inbox",
    description: "5 neue Roh-Notizen warten auf Triage.",
    meta: "vor 3 min",
    actions: [
      { label: "Triagieren" },
      { label: "Schliessen" },
    ],
  },
  render: (args) => <div className="w-96"><CommandCard {...args} /></div>,
};
