import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "DoMe UI/Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Was ist gerade los?", rows: 4 },
  render: (args) => <div className="w-96"><Textarea {...args} /></div>,
};

export const WithText: Story = {
  args: {
    rows: 4,
    defaultValue: "Drei Agenten parallel, einer wartet auf Freigabe. Reviewzeit ~12 min.",
  },
  render: (args) => <div className="w-96"><Textarea {...args} /></div>,
};
