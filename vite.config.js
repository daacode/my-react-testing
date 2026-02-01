import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",

    // 👇 Tell Vitest to ignore Playwright tests
    exclude: [
      "node_modules",
      "dist",
      "tests/e2e/**",
      "**/*.spec.js",
      "**/*.spec.ts",
    ],
  },
});
