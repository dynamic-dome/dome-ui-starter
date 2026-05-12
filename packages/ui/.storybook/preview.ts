import type { Preview } from "@storybook/react";
import "../src/styles.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dome",
      values: [{ name: "dome", value: "hsl(222 18% 5%)" }],
    },
  },
};

export default preview;
