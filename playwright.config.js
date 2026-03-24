// Playwright config for UI regression checks.
const fs = require("node:fs");
const path = require("node:path");

const baseURL = process.env.IND_E2E_BASE_URL || "https://dev.insertec.biz:7702";
const authStatePath =
  process.env.IND_E2E_AUTH_STATE || path.join(__dirname, "tests", ".auth", "entra-storage-state.json");
const useStoredAuthState = process.env.IND_E2E_USE_AUTH_STATE !== "false" && fs.existsSync(authStatePath);
const useDevtools = process.env.IND_E2E_DEVTOOLS !== "false";
const viewport = { width: 480, height: 920 };
const runHeadless = process.env.IND_E2E_HEADLESS === "true";

module.exports = {
  testDir: "./tests",
  timeout: 90_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL,
    headless: runHeadless,
    ignoreHTTPSErrors: true,
    viewport,
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
    launchOptions: useDevtools
      ? {
          args: ["--auto-open-devtools-for-tabs", "--window-size=2200,1300"],
        }
      : undefined,
    storageState: useStoredAuthState ? authStatePath : undefined,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
};
