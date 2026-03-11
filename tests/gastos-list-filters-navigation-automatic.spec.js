// Playwright E2E: list filters + card navigation and back flow for tickets and expense sheets.
const { test, expect } = require("./e2e-devtools-mobile.fixture");

test.setTimeout(420000);

// Ensures an authenticated session exists before running protected list flows.
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

// Reads a query string value from URL.
function getQueryParam(url, key) {
  try {
    const parsed = new URL(url);
    return String(parsed.searchParams.get(key) || "").trim();
  } catch {
    return "";
  }
}

// Opens filters panel when collapsed.
async function ensureFilterPanelVisible(page) {
  const panel = page.locator(".filter-card--expanded").first();
  const panelVisible = await panel.isVisible().catch(() => false);
  if (panelVisible) return;

  const filterToggle = page.locator("#historyFilterToggleBtn");
  const canClickToggle = await filterToggle.isVisible().catch(() => false);
  if (canClickToggle) {
    await filterToggle.click();
  } else {
    const toggleEventName = /\/Gastos\/Tickets/i.test(page.url()) ? "expense-tickets-toggle-filter" : "expense-sheets-toggle-filter";
    await page.evaluate((eventName) => {
      window.dispatchEvent(new CustomEvent(eventName));
    }, toggleEventName);
  }
  await expect(panel).toBeVisible({ timeout: 15000 });
}

// Applies a quick 90-day date range from filters panel.
async function selectQuick90Days(page) {
  const quick90Button = page.getByRole("button", { name: /90/i }).first();
  await expect(quick90Button).toBeVisible({ timeout: 15000 });
  await quick90Button.click();
}

// Clicks the generic apply button in filters panel.
async function clickApplyFilters(page) {
  const applyButton = page.getByRole("button", { name: /apply|aplicar/i }).first();
  await expect(applyButton).toBeVisible({ timeout: 15000 });
  await applyButton.click();
}

// Selects one option from combobox list by preferred text fallback.
async function selectComboboxOptionByLabel(page, labelRegex, preferredRegex, index = 0) {
  const combobox = page.getByRole("combobox", { name: labelRegex }).nth(index);
  await expect(combobox).toBeVisible({ timeout: 15000 });
  await combobox.click();

  const listbox = page.locator("div[role='listbox']:visible").first();
  await expect(listbox).toBeVisible({ timeout: 15000 });
  const options = listbox.locator("button[role='option']");

  const preferredOption = options.filter({ hasText: preferredRegex }).first();
  if ((await preferredOption.count()) > 0) {
    await preferredOption.click();
    return;
  }

  const fallbackOption = options
    .filter({ hasNotText: /all|todo|todos|ninguno|none|n\/a|both|ambos/i })
    .first();
  if ((await fallbackOption.count()) > 0) {
    await fallbackOption.click();
    return;
  }

  await options.first().click();
}

// Returns current combobox input value by label.
async function readComboboxValueByLabel(page, labelRegex, index = 0) {
  const combobox = page.getByRole("combobox", { name: labelRegex }).nth(index);
  await expect(combobox).toBeVisible({ timeout: 15000 });
  return String((await combobox.inputValue()) || "").trim();
}

// Navigates back to the previous page using topbar back control.
async function clickTopbarBack(page) {
  const backButton = page.locator("#globalBackBtn");
  await expect(backButton).toBeVisible({ timeout: 15000 });
  await backButton.click();
}

// Retries card clicks because list refetch can briefly detach the selected timeline node.
async function clickTimelineCardWithRetry(page, locatorFactory, timeout = 30000) {
  const deadline = Date.now() + timeout;
  let lastError = null;

  while (Date.now() < deadline) {
    const locator = locatorFactory();
    const hasVisibleCard = await locator.first().isVisible().catch(() => false);
    if (!hasVisibleCard) {
      await page.waitForTimeout(200);
      continue;
    }

    try {
      await locator.first().click({ timeout: 5000 });
      return;
    } catch (error) {
      lastError = error;
      await page.waitForTimeout(250);
    }
  }

  if (lastError) {
    throw lastError;
  }

  throw new Error("Timeline card was not clickable before timeout.");
}

// Resolves a preferred status option regex from visible sheet status marker class.
async function resolveSheetStatusRegex(firstSheetItem) {
  if ((await firstSheetItem.locator(".expense-sheet-card__status--draft").count()) > 0) {
    return /borrador|draft/i;
  }
  if ((await firstSheetItem.locator(".expense-sheet-card__status--review").count()) > 0) {
    return /aprobaci[o\u00f3]n solicitada|review|in review/i;
  }
  if ((await firstSheetItem.locator(".expense-sheet-card__status--approved").count()) > 0) {
    return /aprobado|approved/i;
  }
  if ((await firstSheetItem.locator(".expense-sheet-card__status--rejected").count()) > 0) {
    return /rechazado|rejected/i;
  }
  if ((await firstSheetItem.locator(".expense-sheet-card__status--paid").count()) > 0) {
    return /pagado|paid/i;
  }
  return /borrador|draft|aprobado|approved|rechazado|rejected|pagado|paid|review|aprobaci[o\u00f3]n/i;
}

test.describe("List filters + navigation E2E", () => {
  test.describe.configure({ mode: "serial" });

  test("Tickets: apply filters, open card detail, then go back keeping filters", async ({ page }) => {
    await ensureAuthenticatedSession(page, "/Gastos/Tickets?fresh=1");

    await page.goto("/Gastos/Tickets?fresh=1", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });

    let capturedTicketsListPayload = null;
    await page.route("**/api/crm/expensesheets/tickets/list", async (route) => {
      if (route.request().method().toUpperCase() === "POST") {
        try {
          capturedTicketsListPayload = JSON.parse(route.request().postData() || "{}");
        } catch {
          capturedTicketsListPayload = {};
        }
      }
      await route.continue();
    });

    await ensureFilterPanelVisible(page);
    await selectQuick90Days(page);
    await clickApplyFilters(page);

    await expect.poll(() => capturedTicketsListPayload, { timeout: 30000 }).not.toBeNull();
    expect(String(capturedTicketsListPayload.createdDateFrom || "")).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
    expect(String(capturedTicketsListPayload.createdDateTo || "")).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);

    const firstTicketItem = page.locator(".timeline-item[data-ticket-file-id]").first();
    await expect(firstTicketItem).toBeVisible({ timeout: 60000 });

    const ticketFileId = String((await firstTicketItem.getAttribute("data-ticket-file-id")) || "").trim();
    expect(ticketFileId).not.toBe("");

    const isAssigned = (await firstTicketItem.locator(".expense-ticket-card__status-icons svg").count()) > 0;
    const isProcessedByAI =
      (await firstTicketItem
        .locator(".expense-ticket-card__status-icon[aria-label*='AI'], .expense-ticket-card__status-icon[aria-label*='IA']")
        .count()) > 0;

    await ensureFilterPanelVisible(page);

    const ticketFilterInput = page.getByRole("combobox", { name: /ticket/i }).first();
    await expect(ticketFilterInput).toBeVisible({ timeout: 15000 });
    await ticketFilterInput.fill(ticketFileId);

    await selectComboboxOptionByLabel(
      page,
      /status|estado/i,
      isAssigned ? /assigned|asignado/i : /pending|pendiente/i
    );
    await selectComboboxOptionByLabel(
      page,
      /processed by ia|procesado por ia/i,
      isProcessedByAI ? /^yes$|s[i\u00ed]$/i : /^no$/i
    );

    const selectedStatusValue = await readComboboxValueByLabel(page, /status|estado/i);
    const selectedProcessedValue = await readComboboxValueByLabel(page, /processed by ia|procesado por ia/i);

    await clickApplyFilters(page);

    const filteredTicketItem = page.locator(`.timeline-item[data-ticket-file-id="${ticketFileId}"]`).first();
    await expect(filteredTicketItem).toBeVisible({ timeout: 60000 });
    await clickTimelineCardWithRetry(page, () =>
      page.locator(`.timeline-item[data-ticket-file-id="${ticketFileId}"] .timeline-card--clickable`)
    );

    await page.waitForURL("**/Gastos/TicketDetail?**", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await expect(page.locator("#expense-ticket-detail-root")).toBeVisible({ timeout: 30000 });

    await clickTopbarBack(page);
    await page.waitForURL("**/Gastos/Tickets**", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });

    await ensureFilterPanelVisible(page);
    await expect(ticketFilterInput).toHaveValue(ticketFileId, { timeout: 30000 });
    await expect(page.getByRole("combobox", { name: /status|estado/i }).first()).toHaveValue(selectedStatusValue, {
      timeout: 30000,
    });

    await expect(
      page.getByRole("combobox", { name: /processed by ia|procesado por ia/i }).first()
    ).toHaveValue(selectedProcessedValue, {
      timeout: 30000,
    });

    await page.unroute("**/api/crm/expensesheets/tickets/list");
  });

  test("Expense sheets: apply filters, open card detail, then go back keeping filters", async ({ page }) => {
    await ensureAuthenticatedSession(page, "/Gastos/ExpenseSheets?fresh=1");

    await page.goto("/Gastos/ExpenseSheets?fresh=1", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#expense-sheets-root")).toBeVisible({ timeout: 30000 });

    let capturedExpenseSheetsListPayload = null;
    await page.route("**/api/crm/expensesheets/list", async (route) => {
      if (route.request().method().toUpperCase() === "POST") {
        try {
          capturedExpenseSheetsListPayload = JSON.parse(route.request().postData() || "{}");
        } catch {
          capturedExpenseSheetsListPayload = {};
        }
      }
      await route.continue();
    });

    await ensureFilterPanelVisible(page);
    await selectQuick90Days(page);
    await clickApplyFilters(page);

    await expect.poll(() => capturedExpenseSheetsListPayload, { timeout: 30000 }).not.toBeNull();
    expect(String(capturedExpenseSheetsListPayload.createdDateFrom || "")).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
    expect(String(capturedExpenseSheetsListPayload.createdDateTo || "")).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);

    const firstSheetItem = page.locator("#expense-sheets-root .timeline-item").first();
    await expect(firstSheetItem).toBeVisible({ timeout: 60000 });

    const preferredStatusRegex = await resolveSheetStatusRegex(firstSheetItem);

    await firstSheetItem.locator(".timeline-card--clickable").first().click();
    await page.waitForURL("**/Gastos/ExpenseSheetDetail?**", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });

    const sheetId = getQueryParam(page.url(), "hojaGastosId");
    expect(sheetId).not.toBe("");

    await clickTopbarBack(page);
    await page.waitForURL("**/Gastos/ExpenseSheets**", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await expect(page.locator("#expense-sheets-root")).toBeVisible({ timeout: 30000 });

    await ensureFilterPanelVisible(page);

    const sheetFilterInput = page.getByRole("combobox", { name: /expense sheet|hoja de gasto/i }).first();
    await expect(sheetFilterInput).toBeVisible({ timeout: 15000 });
    await sheetFilterInput.fill(sheetId);
    await sheetFilterInput.press("Enter");

    await selectComboboxOptionByLabel(page, /status|estado/i, preferredStatusRegex);
    const selectedStatusValue = await readComboboxValueByLabel(page, /status|estado/i);

    await clickApplyFilters(page);
    const filteredCard = page.locator("#expense-sheets-root .timeline-card--clickable").first();
    await expect(filteredCard).toBeVisible({ timeout: 60000 });
    await clickTimelineCardWithRetry(page, () => page.locator("#expense-sheets-root .timeline-card--clickable"));

    await page.waitForURL("**/Gastos/ExpenseSheetDetail?**", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });
    await expect(getQueryParam(page.url(), "hojaGastosId")).toBe(sheetId);

    await clickTopbarBack(page);
    await page.waitForURL("**/Gastos/ExpenseSheets**", {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await expect(page.locator("#expense-sheets-root")).toBeVisible({ timeout: 30000 });

    await ensureFilterPanelVisible(page);
    await expect(sheetFilterInput).toHaveValue(sheetId, { timeout: 30000 });
    await expect(page.getByRole("combobox", { name: /status|estado/i }).first()).toHaveValue(selectedStatusValue, {
      timeout: 30000,
    });

    await page.unroute("**/api/crm/expensesheets/list");
  });
});
