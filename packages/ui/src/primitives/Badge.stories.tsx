import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "DoMe UI/Badge",
  component: Badge,
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: "Neu" } };
export const Gold: Story = { args: { variant: "gold", children: "Premium" } };
export const Outline: Story = { args: { variant: "outline", children: "Beta" } };
