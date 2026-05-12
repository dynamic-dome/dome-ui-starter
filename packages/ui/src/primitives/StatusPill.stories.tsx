import type { Meta, StoryObj } from "@storybook/react";
import { StatusPill } from "./StatusPill";

const meta = {
  title: "DoMe UI/StatusPill",
  component: StatusPill,
} satisfies Meta<typeof StatusPill>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = { args: { status: "idle" } };
export const Running: Story = { args: { status: "running", showDot: true } };
export const WaitingApproval: Story = { args: { status: "waiting_approval", showDot: true } };
export const Completed: Story = { args: { status: "completed" } };
export const Failed: Story = { args: { status: "failed" } };

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-2xl">
      {(["queued", "running", "waiting_approval", "completed", "failed", "cancelled", "ok", "idle", "busy", "warn"] as const).map((s) => (
        <StatusPill key={s} status={s} showDot />
      ))}
    </div>
  ),
};
