// Playwright E2E: verify list endpoints are called again on every supported return flow.
const { test, expect } = require("./e2e-devtools-mobile.fixture");
const { acquirePublicE2ELock, releasePublicE2ELock } = require("./public-env-lock");

test.setTimeout(420000);

// Ensures an authenticated public session exists before running protected Gastos flows.
async function ensureAuthenticatedSession(page, startUrl) {
  await page.goto(startUrl, { waitUntil: "domcontentloaded" });
  const loginGateVisible = await page
    .getByRole("button", { name: /sign in with microsoft|iniciar sesi[o\u00f3]n con microsoft/i })
    .isVisible()
    .catch(() => false);

  if (loginGateVisible) {
    throw new Error("No active authenticated session. Run: npm run test:e2e:auth:capture");
  }
}

// Opens the filters panel when it is collapsed.
async function ensureFilterPanelVisible(page, toggleEventName) {
  const panel = page.locator(".filter-card--expanded").first();
  const panelVisible = await panel.isVisible().catch(() => false);
  if (panelVisible) return;

  const filterToggle = page.locator("#historyFilterToggleBtn");
  const canClickToggle = await filterToggle.isVisible().catch(() => false);
  if (canClickToggle) {
    await filterToggle.click();
  } else {
    await page.evaluate((eventName) => {
      window.dispatchEvent(new CustomEvent(eventName));
    }, toggleEventName);
  }

  await expect(panel).toBeVisible({ timeout: 15000 });
}

// Applies a quick 90-day date range to guarantee list data is loaded.
async function applyQuick90DayFilters(page, toggleEventName) {
  await ensureFilterPanelVisible(page, toggleEventName);

  const quick90Button = page.getByRole("button", { name: /90/i }).first();
  await expect(quick90Button).toBeVisible({ timeout: 15000 });
  await quick90Button.click();

  const applyButton = page.getByRole("button", { name: /apply|aplicar/i }).first();
  await expect(applyButton).toBeVisible({ timeout: 15000 });
  await applyButton.click();
}

// Tracks one POST endpoint and exposes a resettable counter.
async function createPostTracker(page, routePattern) {
  let count = 0;
  await page.route(routePattern, async (route) => {
    if (route.request().method().toUpperCase() === "POST") {
      count += 1;
    }
    await route.continue();
  });

  return {
    getCount: () => count,
    reset: () => {
      count = 0;
    },
    dispose: async () => {
      await page.unroute(routePattern);
    },
  };
}

// Waits until the tracked endpoint is called the expected number of times.
async function expectTrackedCount(tracker, expectedCount, timeout = 30000) {
  await expect.poll(() => tracker.getCount(), { timeout }).toBe(expectedCount);
}

// Opens the first ticket card after filters load the list.
async function openFirstTicketDetail(page) {
  const firstTicketItem = page.locator(".timeline-item[data-ticket-file-id]").first();
  await expect(firstTicketItem).toBeVisible({ timeout: 60000 });
  await firstTicketItem.locator(".timeline-card--clickable").first().click();
  await page.waitForURL("**/Gastos/TicketDetail?**", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await expect(page.locator("#expense-ticket-detail-root")).toBeVisible({ timeout: 30000 });
}

// Opens the first expense sheet card after filters load the list.
async function openFirstExpenseSheetDetail(page) {
  const firstSheetCard = page.locator("#expense-sheets-root .timeline-card--clickable").first();
  await expect(firstSheetCard).toBeVisible({ timeout: 60000 });
  await firstSheetCard.click();
  await page.waitForURL("**/Gastos/ExpenseSheetDetail?**", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });
}

// Uses the app chevron back button from detail pages.
async function clickTopbarBack(page) {
  const backButton = page.locator("#globalBackBtn");
  await expect(backButton).toBeVisible({ timeout: 15000 });
  await backButton.click();
}

// Executes the browser native back action.
async function triggerNativeBrowserBack(page) {
  await page.goBack({ waitUntil: "domcontentloaded" }).catch(() => undefined);
}

test.describe("Gastos return endpoint regressions", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async () => {
    await acquirePublicE2ELock("gastos-return-endpoints");
  });

  test.afterAll(async () => {
    await releasePublicE2ELock();
  });

  test("Tickets list re-fetches after topbar back from ticket detail", async ({ page }) => {
    await ensureAuthenticatedSession(page, "/Gastos/Tickets?fresh=1");
    const tracker = await createPostTracker(page, "**/api/crm/expensesheets/tickets/list");

    try {
      await page.goto("/Gastos/Tickets?fresh=1", { waitUntil: "domcontentloaded" });
      await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });

      await applyQuick90DayFilters(page, "expense-tickets-toggle-filter");
      await expectTrackedCount(tracker, 1, 60000);
      tracker.reset();

      await openFirstTicketDetail(page);
      await clickTopbarBack(page);

      await page.waitForURL("**/Gastos/Tickets**", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });
      await expectTrackedCount(tracker, 1, 60000);
    } finally {
      await tracker.dispose();
    }
  });

  test("Tickets list re-fetches after native browser back from ticket detail", async ({ page }) => {
    await ensureAuthenticatedSession(page, "/Gastos/Tickets?fresh=1");
    const tracker = await createPostTracker(page, "**/api/crm/expensesheets/tickets/list");

    try {
      await page.goto("/Gastos/Tickets?fresh=1", { waitUntil: "domcontentloaded" });
      await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });

      await applyQuick90DayFilters(page, "expense-tickets-toggle-filter");
      await expectTrackedCount(tracker, 1, 60000);
      tracker.reset();

      await openFirstTicketDetail(page);
      await triggerNativeBrowserBack(page);

      await page.waitForURL("**/Gastos/Tickets**", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });
      await expectTrackedCount(tracker, 1, 60000);
    } finally {
      await tracker.dispose();
    }
  });

  test("Expense sheets list re-fetches after topbar back from sheet detail", async ({ page }) => {
    await ensureAuthenticatedSession(page, "/Gastos/ExpenseSheets?fresh=1");
    const tracker = await createPostTracker(page, "**/api/crm/expensesheets/list");

    try {
      await page.goto("/Gastos/ExpenseSheets?fresh=1", { waitUntil: "domcontentloaded" });
      await expect(page.locator("#expense-sheets-root")).toBeVisible({ timeout: 30000 });

      await applyQuick90DayFilters(page, "expense-sheets-toggle-filter");
      await expectTrackedCount(tracker, 1, 60000);
      tracker.reset();

      await openFirstExpenseSheetDetail(page);
      await clickTopbarBack(page);

      await page.waitForURL("**/Gastos/ExpenseSheets**", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await expect(page.locator("#expense-sheets-root")).toBeVisible({ timeout: 30000 });
      await expectTrackedCount(tracker, 1, 60000);
    } finally {
      await tracker.dispose();
    }
  });

  test("Expense sheets list re-fetches after native browser back from sheet detail", async ({ page }) => {
    await ensureAuthenticatedSession(page, "/Gastos/ExpenseSheets?fresh=1");
    const tracker = await createPostTracker(page, "**/api/crm/expensesheets/list");

    try {
      await page.goto("/Gastos/ExpenseSheets?fresh=1", { waitUntil: "domcontentloaded" });
      await expect(page.locator("#expense-sheets-root")).toBeVisible({ timeout: 30000 });

      await applyQuick90DayFilters(page, "expense-sheets-toggle-filter");
      await expectTrackedCount(tracker, 1, 60000);
      tracker.reset();

      await openFirstExpenseSheetDetail(page);
      await triggerNativeBrowserBack(page);

      await page.waitForURL("**/Gastos/ExpenseSheets**", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await expect(page.locator("#expense-sheets-root")).toBeVisible({ timeout: 30000 });
      await expectTrackedCount(tracker, 1, 60000);
    } finally {
      await tracker.dispose();
    }
  });
});
