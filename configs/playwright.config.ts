import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "../tests/playwright",
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: true,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
});
