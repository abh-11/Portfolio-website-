import { existsSync } from "node:fs";
import { chromium, defineConfig } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT || 4173);
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const baseURL = `http://127.0.0.1:${port}${basePath}/`;
const systemChromium = "/usr/bin/chromium";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
  (!existsSync(chromium.executablePath()) && existsSync(systemChromium)
    ? systemChromium
    : undefined);

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  forbidOnly: Boolean(process.env.CI),
  workers: 2,
  reporter: "list",
  use: {
    baseURL,
    browserName: "chromium",
    launchOptions: { executablePath },
    viewport: { width: 1366, height: 900 },
    colorScheme: "light",
    trace: "retain-on-failure",
  },
  webServer: {
    command: process.env.PLAYWRIGHT_USE_BUILD === "1"
      ? "node tests/serve-export.mjs"
      : "npm run build && node tests/serve-export.mjs",
    env: { PLAYWRIGHT_PORT: String(port) },
    url: baseURL,
    timeout: 180_000,
  },
});
