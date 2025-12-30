// Playwright config for UI regression checks.
const baseURL = process.env.IND_E2E_BASE_URL || "https://crm.insertec.biz:7702";

module.exports = {
  testDir: "./tests",
  timeout: 90_000,
  expect: {
    timeout: 15_000,
  },
  use: {
    baseURL,
    headless: true,
    ignoreHTTPSErrors: true,
    viewport: { width: 390, height: 844 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
};
