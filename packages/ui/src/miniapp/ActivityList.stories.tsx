import type { Meta, StoryObj } from "@storybook/react";
import { ActivityList } from "./ActivityList";

const meta = {
  title: "DoMe UI/ActivityList",
  component: ActivityList,
} satisfies Meta<typeof ActivityList>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[28rem]">
      <ActivityList
        items={[
          { id: "1", title: "Wiki-Triage Welle 11", preview: "16 Quellen, Loop B Quantum Apps", status: "running" },
          { id: "2", title: "DCO Auth-Fix /duett/api/*", preview: "CRITICAL Security-Audit-Finding", status: "waiting_approval" },
          { id: "3", title: "Bundle-Size Audit", preview: "Code-Splitting Phase 9", status: "completed" },
          { id: "4", title: "Storybook-Tailwind-Bridge", preview: "Tailwind v3 statt v4", status: "completed" },
          { id: "5", title: "Verdaccio-Smoke-Test", preview: "noch nicht angefangen", status: "queued" },
        ]}
      />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-[28rem]">
      <ActivityList items={[]} />
    </div>
  ),
};
