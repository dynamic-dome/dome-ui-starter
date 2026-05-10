import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const uiEntry = fileURLToPath(new URL("../../packages/ui/src/index.ts", import.meta.url));
const uiStyles = fileURLToPath(new URL("../../packages/ui/src/styles.css", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@dome/ui/styles.css", replacement: uiStyles },
      { find: "@dome/ui", replacement: uiEntry },
    ],
  },
});
