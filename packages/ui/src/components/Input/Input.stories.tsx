import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta = {
  title: "DoMe UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    label: "E-Mail",
    placeholder: "name@example.com",
    helpText: "Wir nutzen diese Adresse nur für Rückfragen.",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithError: Story = {
  args: {
    error: "Bitte gib eine gültige E-Mail-Adresse ein.",
  },
};
