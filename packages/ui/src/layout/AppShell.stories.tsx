import type { Meta, StoryObj } from "@storybook/react";
import { AppShell } from "./AppShell";
import { SectionHeading } from "./Section";

const meta = {
  title: "DoMe UI/AppShell",
  component: AppShell,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AppShell
      header={
        <header className="container relative flex h-16 items-center justify-between border-b border-border/40">
          <span className="font-display text-lg font-semibold">DoMe</span>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="#">Werkstatt</a>
            <a href="#">Projekte</a>
            <a href="#">Kontakt</a>
          </nav>
        </header>
      }
    >
      <div className="container relative py-24">
        <SectionHeading
          eyebrow="AppShell"
          title="Atmosphaerischer Hintergrund"
          description="Grid-BG + Gold-Radial-Glow + Neon-Radial-Glow. Reagiert auf Scroll."
        />
      </div>
    </AppShell>
  ),
};
