import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { Stack } from "../Stack/Stack";
import { ThemeProvider } from "./ThemeProvider";

const meta = {
  title: "DoMe UI/ThemeProvider",
  component: ThemeProvider,
  tags: ["autodocs"],
  args: {
    theme: "light",
  },
  argTypes: {
    theme: {
      control: "select",
      options: ["light", "dark", "system"],
    },
  },
} satisfies Meta<typeof ThemeProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemedSurface: Story = {
  render: (args) => (
    <ThemeProvider {...args} style={{ padding: "1rem", borderRadius: "0.875rem" }}>
      <Stack gap="md">
        <Input label="Domain" placeholder="dynamic-dome.com" />
        <Stack direction="row" gap="sm">
          <Button>Speichern</Button>
          <Button variant="secondary">Preview</Button>
        </Stack>
      </Stack>
    </ThemeProvider>
  ),
};
