import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "DoMe UI/Input",
  component: Input,
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Name eingeben..." },
  render: (args) => <div className="w-72"><Input {...args} /></div>,
};

export const WithValue: Story = {
  args: { defaultValue: "domes@dynamic-dome.com", type: "email" },
  render: (args) => <div className="w-72"><Input {...args} /></div>,
};

export const Disabled: Story = {
  args: { defaultValue: "gesperrt", disabled: true },
  render: (args) => <div className="w-72"><Input {...args} /></div>,
};
