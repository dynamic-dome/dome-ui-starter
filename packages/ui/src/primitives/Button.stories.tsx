import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "DoMe UI/Button",
  component: Button,
  args: { children: "Schreib mir" },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Gold: Story = { args: { variant: "gold" } };
export const OutlineGold: Story = { args: { variant: "outlineGold", children: "Bewerbungsmappe" } };
export const Neon: Story = { args: { variant: "neon", children: "DCO ansehen" } };
export const CyanMiniapp: Story = { args: { variant: "cyan", children: "Ausführen" } };
export const Loading: Story = { args: { variant: "gold", loading: true } };
