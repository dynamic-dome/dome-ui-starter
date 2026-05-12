import type { Meta, StoryObj } from "@storybook/react";

const swatches = [
  { name: "dome.gold-primary", className: "bg-dome-gold-primary", hex: "#C9A23A" },
  { name: "dome.gold-bright", className: "bg-dome-gold-bright", hex: "#E6BF52" },
  { name: "dome.gold-deep", className: "bg-dome-gold-deep", hex: "#8A6E20" },
  { name: "dome.night", className: "bg-dome-night", hex: "#0B0F1A" },
  { name: "dome.night-elevated", className: "bg-dome-night-elevated", hex: "#131826" },
  { name: "dome.accent-blue", className: "bg-dome-accent-blue", hex: "#4F7CFF" },
  { name: "dome.ink", className: "bg-dome-ink", hex: "#F5F1E6" },
  { name: "dome.ink-muted", className: "bg-dome-ink-muted", hex: "#B6AC92" },
];

const PulseTokenSwatches = () => (
  <div className="bg-dome-night p-8 text-dome-ink">
    <h2 className="mb-2 font-display text-2xl font-semibold">Pulse Palette</h2>
    <p className="mb-6 max-w-xl text-sm text-dome-ink-muted">
      Acht <code className="font-mono">--dome-*</code> Hex-Tokens als parallele Pulse-Variante zur HSL-Hauptpalette.
      Ein Gold-Dreiklang, zwei dunkle Hintergrundebenen, ein erlaubter Blau-Akzent, zwei Schriftt&ouml;ne.
    </p>
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {swatches.map(({ name, className, hex }) => (
        <div key={name} className="border border-dome-ink-muted/30 bg-dome-night-elevated p-4">
          <div className={`h-20 w-full rounded ${className}`} />
          <div className="mt-3 font-mono text-xs text-dome-ink">{name}</div>
          <div className="font-mono text-xs text-dome-ink-muted">{hex}</div>
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta<typeof PulseTokenSwatches> = {
  title: "DoMe UI/Tokens/Pulse Palette",
  component: PulseTokenSwatches,
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj<typeof PulseTokenSwatches>;

export const Swatches: Story = {};
