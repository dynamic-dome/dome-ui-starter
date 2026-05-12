import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./Logo";

const meta = {
  title: "DoMe UI/Logo",
  component: Logo,
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const IconOnly: Story = { args: { showText: false } };
export const CustomLabel: Story = {
  args: { title: "Claude Zentrale", subtitle: "Operations Console" },
};
