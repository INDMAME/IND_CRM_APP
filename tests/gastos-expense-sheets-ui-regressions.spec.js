const { test, expect } = require("./e2e-devtools-mobile.fixture");
const { acquirePublicE2ELock, releasePublicE2ELock } = require("./public-env-lock");

const LOGIN_GATE_REGEX = /sign in with microsoft|iniciar sesi[o\u00f3]n con microsoft/i;

test.setTimeout(300000);

// Clears Gastos managed-user caches so UI regressions always start from self context.
async function isolateExpenseManagementSession(page) {
  await page.addInitScript(() => {
    const prefixes = [
      "expense_management_context_v2_",
      "expense_acting_user_v1_",
      "expense_sheets_filter_v1_",
      "expense_sheets_return_v1_",
      "expense_tickets_filter_v1_",
      "expense_tickets_return_v1_",
      "expense_tickets_list_v1_",
      "expense_sheet_ticket_quick_flow_trace_v1",
    ];
    const keys = [];
    for (let index = 0; index < sessionStorage.length; index += 1) {
      const key = sessionStorage.key(index);
      if (key) {
        keys.push(key);
      }
    }
    for (const key of keys) {
      if (prefixes.some((prefix) => key.startsWith(prefix))) {
        sessionStorage.removeItem(key);
      }
    }
  });
}

// Ensures the authenticated public session is still alive before checking the UI.
async function ensureAuthenticatedSession(page) {
  await isolateExpenseManagementSession(page);
  await page.goto("/Gastos/ExpenseSheets?fresh=1", { waitUntil: "domcontentloaded" });
  const loginGateVisible = await page.getByRole("button", { name: LOGIN_GATE_REGEX }).isVisible().catch(() => false);
  if (loginGateVisible) {
    throw new Error("No active authenticated session. Run: npm run test:e2e:auth:capture");
  }
  await expect(page.locator("#expense-sheets-root")).toBeVisible({ timeout: 30000 });
}

// Expands the filter panel when needed before interacting with filter controls.
async function ensureExpenseSheetsFilterPanelOpen(page) {
  const userInput = page.getByRole("combobox", { name: /user|usuario/i }).first();
  const alreadyVisible = await userInput
    .waitFor({
      state: "visible",
      timeout: 5000,
    })
    .then(() => true)
    .catch(() => false);
  if (alreadyVisible) {
    return userInput;
  }

  const filterToggleButton = page.locator("#historyFilterToggleBtn");
  const canClickToggle = await filterToggleButton.isVisible().catch(() => false);
  if (canClickToggle) {
    await filterToggleButton.click();
  } else {
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("expense-sheets-toggle-filter"));
    });
  }
  await expect(userInput).toBeVisible({ timeout: 20000 });
  return userInput;
}

// Selects the first managed user option shown by the combobox.
async function selectFirstManagedUser(page, userInput) {
  await userInput.click();
  await userInput.press("ArrowDown");

  const listbox = page.locator("div[role='listbox']:visible").first();
  await expect(listbox).toBeVisible({ timeout: 15000 });

  const firstOption = listbox.locator("button[role='option']").first();
  const selectedLabel = String((await firstOption.textContent().catch(() => "")) || "").trim();
  await expect(firstOption).toBeVisible({ timeout: 15000 });
  await firstOption.click();

  await expect
    .poll(async () => String((await userInput.inputValue()) || "").trim(), { timeout: 15000 })
    .not.toBe("");

  return selectedLabel;
}

// Waits for the expense sheets list refresh endpoint used by filter apply/clear flows.
async function waitForExpenseSheetsListRefresh(page) {
  return page
    .waitForResponse(
      (response) =>
        response.url().includes("/api/crm/expensesheets/list") && response.request().method().toUpperCase() === "POST",
      { timeout: 60000 }
    )
    .catch(() => null);
}

// Builds a stable paged list response so layout checks do not depend on public data volume.
function buildMockExpenseSheetsListResponse() {
  const items = Array.from({ length: 6 }, (_, index) => ({
    HojaGastosId: `FAB-MOCK-${index + 1}`,
    Description: `FAB Mock Sheet ${index + 1}`,
    ExpenseSheetStatus: index % 2 === 0 ? 0 : 2,
    EstadoComentarios: "",
    UserId: "MAME",
    Voucher: "",
    ProjId: `PRJ-${index + 1}`,
    CurrencyCode: "EUR",
    TotalAmount: 10 + index,
    ExchRate: 1,
    ExchangeRateMode: 0,
    CreatedDate: "08.03.2026",
  }));

  return {
    Success: true,
    Message: "",
    Total: 12,
    Page: 1,
    PageSize: 6,
    Items: items,
  };
}

// Forces a deterministic multi-page list so pagination is always rendered for FAB checks.
async function mockExpenseSheetsListWithPagination(page) {
  await page.route("**/api/crm/expensesheets/list", async (route) => {
    if (route.request().method().toUpperCase() !== "POST") {
      await route.continue();
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify(buildMockExpenseSheetsListResponse()),
    });
  });
}

test.describe("Expense sheets UI regressions", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async () => {
    await acquirePublicE2ELock("expense-sheets-ui-regressions");
  });

  test.afterAll(async () => {
    await releasePublicE2ELock();
  });

  test("Managed user filter clears to empty without auto-selecting another user", async ({ page }) => {
    await ensureAuthenticatedSession(page);
    const userInput = await ensureExpenseSheetsFilterPanelOpen(page);

    const selectedLabel = await selectFirstManagedUser(page, userInput);
    expect(selectedLabel).not.toBe("");

    const refreshPromise = waitForExpenseSheetsListRefresh(page);
    await userInput.fill("");
    await refreshPromise;

    const reopenedUserInput = await ensureExpenseSheetsFilterPanelOpen(page);
    await expect
      .poll(async () => String((await reopenedUserInput.inputValue()) || "").trim(), { timeout: 20000 })
      .toBe("");
  });

  test("Floating action button stays clear of pagination on mobile", async ({ page }) => {
    await ensureAuthenticatedSession(page);
    await mockExpenseSheetsListWithPagination(page);
    await page.goto("/Gastos/ExpenseSheets?fresh=1&fabMock=1", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#expense-sheets-root")).toBeVisible({ timeout: 30000 });
    await expect(page.getByRole("button", { name: "90 days" }).first()).toBeVisible({ timeout: 15000 });

    const refreshPromise = waitForExpenseSheetsListRefresh(page);
    await page.getByRole("button", { name: "90 days" }).first().click();
    await page.getByRole("button", { name: /apply|aplicar/i }).first().click();
    await refreshPromise;

    const pagination = page.locator("#pagination");
    const fabButton = page.getByRole("button", { name: /create|crear/i }).last();
    await expect(pagination).toBeVisible({ timeout: 30000 });
    await expect(fabButton).toBeVisible({ timeout: 30000 });

    await page.evaluate(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "auto" });
    });
    await page.waitForTimeout(200);

    const paginationBox = await pagination.boundingBox();
    const fabBox = await fabButton.boundingBox();
    const metrics =
      paginationBox && fabBox
        ? {
            pagination: {
              left: paginationBox.x,
              right: paginationBox.x + paginationBox.width,
              top: paginationBox.y,
              bottom: paginationBox.y + paginationBox.height,
            },
            fab: {
              left: fabBox.x,
              right: fabBox.x + fabBox.width,
              top: fabBox.y,
              bottom: fabBox.y + fabBox.height,
            },
            overlapX: Math.max(
              0,
              Math.min(paginationBox.x + paginationBox.width, fabBox.x + fabBox.width) - Math.max(paginationBox.x, fabBox.x)
            ),
            overlapY: Math.max(
              0,
              Math.min(paginationBox.y + paginationBox.height, fabBox.y + fabBox.height) - Math.max(paginationBox.y, fabBox.y)
            ),
          }
        : null;

    expect(metrics).not.toBeNull();
    expect(metrics.overlapX > 0 && metrics.overlapY > 0).toBe(false);
    const horizontalGap =
      metrics.pagination.right < metrics.fab.left
        ? metrics.fab.left - metrics.pagination.right
        : (metrics.fab.right < metrics.pagination.left ? metrics.pagination.left - metrics.fab.right : 0);
    const verticalGap =
      metrics.pagination.bottom < metrics.fab.top
        ? metrics.fab.top - metrics.pagination.bottom
        : (metrics.fab.bottom < metrics.pagination.top ? metrics.pagination.top - metrics.fab.bottom : 0);
    const shortestGap =
      horizontalGap > 0 && verticalGap > 0
        ? Math.hypot(horizontalGap, verticalGap)
        : Math.max(horizontalGap, verticalGap);
    expect(shortestGap).toBeGreaterThanOrEqual(8);

    await page.unroute("**/api/crm/expensesheets/list");
  });
});
