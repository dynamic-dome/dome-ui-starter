import type { Meta, StoryObj } from "@storybook/react";
import { DoMeHero } from "./DoMeHero";

const meta: Meta<typeof DoMeHero> = {
  title: "DoMe UI/DoMeHero",
  component: DoMeHero,
};
export default meta;

type Story = StoryObj<typeof DoMeHero>;

export const Default: Story = {
  args: {
    lead: "DoMe Dynamics ist meine Werkstatt für agentische Systeme: Orchestratoren, Automatisierungen, Tool-Integrationen und Dashboards.",
    actions: [
      { label: "Schreib mir", href: "#kontakt", variant: "gold" },
      { label: "Bewerbungsmappe", href: "/profil", variant: "outlineGold" },
      { label: "DCO ansehen", href: "/dco", variant: "ghost" },
    ],
    tags: [
      { label: "DCO · Orchestrator", href: "/dco" },
      { label: "Research · Thesis", href: "/research" },
      { label: "Knowledge OS", href: "/stack" },
    ],
  },
};
