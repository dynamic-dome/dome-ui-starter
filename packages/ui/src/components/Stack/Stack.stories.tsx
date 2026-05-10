import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button/Button";
import { Stack } from "./Stack";

const meta = {
  title: "DoMe UI/Stack",
  component: Stack,
  tags: ["autodocs"],
  args: {
    direction: "row",
    gap: "sm",
    wrap: true,
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["row", "column"],
    },
    gap: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
  render: (args) => (
    <Stack {...args}>
      <Button>Speichern</Button>
      <Button variant="secondary">Vorschau</Button>
      <Button variant="ghost">Abbrechen</Button>
    </Stack>
  ),
};
