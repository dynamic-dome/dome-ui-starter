import type { Config } from "tailwindcss";
import { domeTailwindPreset } from "@dome/tokens/tailwind-preset";

export default {
  presets: [domeTailwindPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./.storybook/**/*.{ts,tsx}",
  ],
} satisfies Config;
