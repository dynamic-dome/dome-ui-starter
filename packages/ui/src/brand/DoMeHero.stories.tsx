import type { Meta, StoryObj } from "@storybook/react";
import { DoMeHero } from "./DoMeHero";

const ArrowRightIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="ml-1 inline-block h-4 w-4"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

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

export const ActionWithIcon: Story = {
  args: {
    lead: "HeroAction.label akzeptiert ReactNode — Icons hinter dem Text sind moeglich.",
    actions: [
      {
        key: "contact",
        label: (
          <>
            Schreib mir was dich interessiert
            <ArrowRightIcon />
          </>
        ),
        href: "#kontakt",
        variant: "gold",
      },
      { label: "Bewerbungsmappe", href: "/profil", variant: "outlineGold" },
    ],
  },
};
