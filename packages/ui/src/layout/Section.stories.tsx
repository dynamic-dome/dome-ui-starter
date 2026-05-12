import type { Meta, StoryObj } from "@storybook/react";
import { Section, Eyebrow, SectionHeading } from "./Section";

const meta = {
  title: "DoMe UI/Layout",
} satisfies Meta;
export default meta;

export const EyebrowOnly: StoryObj = {
  render: () => <Eyebrow>DoMe Dynamics · Werkstatt</Eyebrow>,
};

export const SectionHeadingDefault: StoryObj = {
  render: () => (
    <SectionHeading
      eyebrow="Werkstatt"
      title={<>Eine Werkstatt für <span className="italic text-gold-soft font-medium">agentische</span> Software.</>}
      description="Offen, im Aufbau. Drei Agenten parallel, einer wartet auf Freigabe."
    />
  ),
};

export const SectionLeftAligned: StoryObj = {
  render: () => (
    <Section>
      <SectionHeading
        align="left"
        eyebrow="Module"
        title="Was hier lebt"
        description="Eine kurze Liste der Projekte, die gerade aktiv weiterentwickelt werden."
      />
    </Section>
  ),
};
