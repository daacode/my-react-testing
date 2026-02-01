import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // 👈 THIS IS CRITICAL
  testMatch: "**/*.spec.js",
  use: {
    baseURL: "http://localhost:5173",
  },
});
