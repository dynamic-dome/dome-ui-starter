import { fileURLToPath } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const uiEntry = fileURLToPath(new URL("../../packages/ui/src/index.ts", import.meta.url));
const uiStyles = fileURLToPath(new URL("../../packages/ui/src/styles.css", import.meta.url));

// DCO runs on http://localhost:8000 (uvicorn default). Vite dev-server
// proxies /duett/* to it so CORS doesn't bite during development.
// In production, the UI is served from the same origin as the API.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@dynamic-dome/ui/styles.css", replacement: uiStyles },
      { find: "@dynamic-dome/ui", replacement: uiEntry },
    ],
  },
  server: {
    port: 5174,
    proxy: {
      "/duett": {
        target: "http://localhost:8000",
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
