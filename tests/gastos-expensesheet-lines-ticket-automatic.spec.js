// Playwright E2E: expense sheet create, manual line, ticket-from-image line, edit and delete line.
const fs = require("node:fs");
const path = require("node:path");
const { test, expect } = require("./e2e-devtools-mobile.fixture");
const { acquirePublicE2ELock, releasePublicE2ELock } = require("./public-env-lock");

const TICKETS_PHOTOS_DIR =
  process.env.IND_E2E_TICKETS_PHOTOS_DIR || "C:\\Users\\marco.meza\\Pictures\\Tickets Fotos";
const SUPPORTED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const PREFERRED_TICKET_IMAGE_NAMES = [
  "ticket-cafe-teatre-1.jpg",
  "ticket-de-compra.jpg",
  "ticket-comida.jpg",
  "ticket-de-compra (1).jpg",
  "ticket-bar-pizasso-1.jpg",
];
test.setTimeout(600000);

// Clears Gastos managed-user session caches so E2E always starts from self context.
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

// Ensures an authenticated session exists before accessing protected pages.
async function ensureAuthenticatedSession(page) {
  await isolateExpenseManagementSession(page);
  await page.goto("/Gastos/ExpenseSheets?fresh=1", { waitUntil: "domcontentloaded" });
  const currentUrl = page.url();
  const redirectedToMicrosoft = /login\.microsoftonline\.com|microsoftonline\.com/i.test(currentUrl);
  const redirectedToAppLogin = /\/Auth\/EntraLogin/i.test(currentUrl);
  const loginButtonVisible = await page
    .getByRole("button", { name: /sign in with microsoft|iniciar sesi[o\u00f3]n con microsoft/i })
    .isVisible()
    .catch(() => false);
  const loginLinkVisible = await page
    .getByRole("link", { name: /sign in with microsoft|iniciar sesi[o\u00f3]n con microsoft/i })
    .isVisible()
    .catch(() => false);
  const loginMessageVisible = await page
    .locator("text=/you must sign in to continue|debe iniciar sesi(?:o|\\u00f3)n para continuar/i")
    .first()
    .isVisible()
    .catch(() => false);

  if (redirectedToMicrosoft || redirectedToAppLogin || loginButtonVisible || loginLinkVisible || loginMessageVisible) {
    throw new Error(`No active authenticated session. Run: npm run test:e2e:auth:capture. Current URL: ${currentUrl}`);
  }
}

// Reads query string values from URL.
function getQueryParam(url, key) {
  try {
    const parsed = new URL(url);
    return String(parsed.searchParams.get(key) || "").trim();
  } catch {
    return "";
  }
}

function normalizeRequestPath(requestUrl) {
  try {
    return new URL(requestUrl).pathname.toLowerCase();
  } catch {
    return String(requestUrl || "").trim().toLowerCase();
  }
}

function escapeRegExp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function startTicketCreationRequestCapture(page) {
  const observed = [];
  const listener = (request) => {
    const pathName = normalizeRequestPath(request.url());
    if (!pathName.startsWith("/api/")) return;

    observed.push({
      method: String(request.method() || "").trim().toUpperCase(),
      pathName,
      url: request.url(),
    });
  };

  page.context().on("request", listener);
  return {
    observed,
    stop: () => page.context().off("request", listener),
  };
}

function isLegacyQuickTicketMutation(requestEntry) {
  if (!requestEntry || requestEntry.method !== "POST") return false;

  if (requestEntry.pathName === "/api/ia/service/expensefromticket") return true;
  if (requestEntry.pathName === "/api/crm/expensesheets/tickets") return true;
  if (requestEntry.pathName === "/api/crm/expensesheets") return true;
  if (/^\/api\/crm\/expensesheets\/tickets\/[^/]+\/file\/?$/i.test(requestEntry.pathName)) return true;
  if (/^\/api\/crm\/expensesheets\/tickets\/[^/]+\/ia\/?$/i.test(requestEntry.pathName)) return true;

  return false;
}

function assertQuickCreateOnlyRequests(observed, contextLabel) {
  const quickCreateCalls = observed.filter(
    (requestEntry) =>
      requestEntry.method === "POST" && requestEntry.pathName === "/api/crm/expensesheets/tickets/quick-create"
  );
  const legacyCalls = observed.filter((requestEntry) => isLegacyQuickTicketMutation(requestEntry));

  expect(quickCreateCalls.length, `${contextLabel}: expected at least one quick-create POST`).toBeGreaterThan(0);
  expect(
    legacyCalls,
    `${contextLabel}: legacy ticket mutations should not be called from the browser. Observed=${JSON.stringify(observed, null, 2)}`
  ).toEqual([]);
}

// Recursively lists all files under a directory.
function listFilesRecursive(rootDir) {
  const result = [];
  const stack = [rootDir];
  while (stack.length > 0) {
    const current = stack.pop();
    let entries = [];
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile()) {
        result.push(fullPath);
      }
    }
  }
  return result;
}

// Picks a random ticket image from configured local folder.
function pickRandomTicketImagePath() {
  const allFiles = listFilesRecursive(TICKETS_PHOTOS_DIR);
  const imageFiles = allFiles.filter((filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return SUPPORTED_IMAGE_EXTENSIONS.has(ext);
  });

  if (imageFiles.length === 0) {
    throw new Error(`No supported image files found in: ${TICKETS_PHOTOS_DIR}`);
  }

  const randomIndex = Math.floor(Math.random() * imageFiles.length);
  return imageFiles[randomIndex];
}

// Returns shuffled ticket image candidates for retry flows.
function pickTicketImageCandidates(maxCandidates = 5) {
  const allFiles = listFilesRecursive(TICKETS_PHOTOS_DIR);
  const imageFiles = allFiles.filter((filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return SUPPORTED_IMAGE_EXTENSIONS.has(ext);
  });

  if (imageFiles.length === 0) {
    throw new Error(`No supported image files found in: ${TICKETS_PHOTOS_DIR}`);
  }

  const normalizedByName = new Map(
    imageFiles.map((filePath) => [path.basename(filePath).toLowerCase(), filePath])
  );
  const preferred = PREFERRED_TICKET_IMAGE_NAMES.map((name) => normalizedByName.get(name)).filter(Boolean);
  const remaining = imageFiles
    .filter((filePath) => !preferred.includes(filePath))
    .sort(() => Math.random() - 0.5);

  return [...preferred, ...remaining].slice(0, Math.max(1, maxCandidates));
}

// Confirms action in app modal by button label.
async function clickModalAction(page, actionRegex) {
  const button = page.locator("div.fixed.inset-0 button").filter({ hasText: actionRegex }).first();
  await expect(button).toBeVisible({ timeout: 15000 });
  await button.click();
}

// Saves current edit in topbar and confirms modal.
async function saveTopbarChanges(page, topbarButtonSelector) {
  const confirmButton = page.locator("div.fixed.inset-0 button").filter({ hasText: /save|guardar/i }).first();
  const modalAlreadyVisible = await confirmButton.isVisible().catch(() => false);
  if (!modalAlreadyVisible) {
    const button = page.locator(topbarButtonSelector);
    await expect(button).toBeVisible({ timeout: 15000 });
    try {
      await button.click();
    } catch (error) {
      const modalVisibleAfterClick = await confirmButton.isVisible().catch(() => false);
      if (!modalVisibleAfterClick) {
        throw error;
      }
    }
  }
  await clickModalAction(page, /save|guardar/i);
}

// Opens the floating action button menu and selects one action.
async function clickFabMenuItem(page, itemNameRegex) {
  const fabMainButton = page.locator("div.fixed.z-2000 button[aria-haspopup='menu']").first();
  await expect(fabMainButton).toBeVisible({ timeout: 15000 });
  await fabMainButton.click();

  const menuItem = page.getByRole("menuitem", { name: itemNameRegex }).first();
  await expect(menuItem).toBeVisible({ timeout: 15000 });
  await menuItem.click();
}

// Selects a valid gasto type option in line form.
async function selectLineType(page) {
  const typeInput = page.getByRole("combobox", { name: /type|tipo/i }).first();
  await expect(typeInput).toBeVisible({ timeout: 15000 });
  await typeInput.click();

  const listbox = page.locator("div[role='listbox']:visible").first();
  await expect(listbox).toBeVisible({ timeout: 15000 });

  const preferredOption = listbox
    .locator("button[role='option']")
    .filter({ hasText: /comida|food|meal|taxi|parking|hotel|varios|misc/i })
    .first();
  const hasPreferred = await preferredOption.count();
  if (hasPreferred > 0) {
    await preferredOption.click();
    return;
  }

  const firstValidOption = listbox
    .locator("button[role='option']")
    .filter({ hasNotText: /none|ninguno|n\/a/i })
    .first();
  await expect(firstValidOption).toBeVisible({ timeout: 15000 });
  await firstValidOption.click();
}

// Ensures currency combobox has a valid non-empty value.
async function ensureCurrencySelected(page, preferredCurrencyCode = "EUR") {
  const currencyInput = page.getByRole("combobox", { name: /currency|divisa/i }).first();
  await expect(currencyInput).toBeVisible({ timeout: 15000 });

  await currencyInput.fill(preferredCurrencyCode);
  await currencyInput.press("Enter");

  const listbox = page.locator("div[role='listbox']:visible").first();
  const listboxVisible = await listbox.isVisible().catch(() => false);
  if (listboxVisible) {
    const preferredOption = listbox
      .locator("button[role='option']")
      .filter({ hasText: new RegExp(preferredCurrencyCode, "i") })
      .first();
    const hasPreferred = await preferredOption.count();
    if (hasPreferred > 0) {
      await preferredOption.click();
    } else {
      await listbox.locator("button[role='option']").first().click();
    }
  }

  await expect
    .poll(async () => String((await currencyInput.inputValue()) || "").trim(), { timeout: 15000 })
    .not.toBe("");
}

// Creates a new expense sheet from create mode and returns the generated sheet id.
async function createExpenseSheet(page) {
  await page.goto("/Gastos/ExpenseSheetDetail?mode=create", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });

  const description = `E2E Sheet ${Date.now()}`;
  const descriptionInput = page.getByLabel(/description|descripci[o\u00f3]n/i).first();
  await expect(descriptionInput).toBeVisible({ timeout: 15000 });
  await descriptionInput.fill(description);
  await ensureCurrencySelected(page, "EUR");

  await saveTopbarChanges(page, "#expenseEditBtn");
  await page.waitForURL("**/Gastos/ExpenseSheetDetail?hojaGastosId=**", {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });
  await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });

  const sheetId = getQueryParam(page.url(), "hojaGastosId");
  if (!sheetId) {
    throw new Error("Could not resolve hojaGastosId after creating expense sheet.");
  }

  return { sheetId, description };
}

// Opens new line form from sheet detail FAB.
async function openCreateLineFromSheet(page) {
  await clickFabMenuItem(page, /nueva l[i\u00ed]nea|nueva linea|new line/i);
  await page.waitForURL("**/Gastos/ExpenseSheetLineDetail?**mode=create**", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await expect(page.locator("#expense-line-detail-root")).toBeVisible({ timeout: 30000 });
}

// Creates one manual expense line and returns its unique description.
async function createManualExpenseLine(page) {
  const uniqueDescription = `E2E Manual Line ${Date.now()}`;
  await openCreateLineFromSheet(page);

  const descriptionInput = page.getByLabel(/description|descripci[o\u00f3]n/i).first();
  const priceInput = page.getByLabel(/price|precio/i).first();
  const qtyInput = page.getByLabel(/quantity|cantidad/i).first();
  await expect(descriptionInput).toBeVisible({ timeout: 15000 });
  await expect(priceInput).toBeVisible({ timeout: 15000 });
  await expect(qtyInput).toBeVisible({ timeout: 15000 });

  await descriptionInput.fill(uniqueDescription);
  await selectLineType(page);
  await priceInput.fill("10");
  await qtyInput.fill("1");

  await saveTopbarChanges(page, "#expenseLineEditBtn");
  await page.waitForURL("**/Gastos/ExpenseSheetDetail?hojaGastosId=**", {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });
  await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });
  await expect(page.locator(".timeline-card--clickable", { hasText: uniqueDescription }).first()).toBeVisible({
    timeout: 30000,
  });

  return uniqueDescription;
}

// Runs quick ticket creation from image through FAB menu.
async function createTicketLineFromImage(page, sheetId) {
  const fallbackImage = pickRandomTicketImagePath();
  const imageCandidates = Array.from(new Set([...pickTicketImageCandidates(3), fallbackImage])).slice(0, 3);
  let lastErrorMessage = "";
  let activePage = page;

  const ensureActivePage = async () => {
    if (activePage && !activePage.isClosed()) {
      return activePage;
    }

    const context = page.context();
    const existingPage = context
      .pages()
      .find((candidate) => candidate && typeof candidate.isClosed === "function" && !candidate.isClosed());

    if (existingPage) {
      activePage = existingPage;
      return activePage;
    }

    activePage = await context.newPage();
    return activePage;
  };

  for (const imagePath of imageCandidates) {
    const workPage = await ensureActivePage();
    const requestCapture = startTicketCreationRequestCapture(workPage);
    let captureStopped = false;
    const stopCapture = () => {
      if (captureStopped) return;
      requestCapture.stop();
      captureStopped = true;
    };

    try {
      await clickFabMenuItem(workPage, /nuevo ticket|new ticket/i);

      const chooseImageButton = workPage.getByRole("button", { name: /elegir imagen|choose image/i }).first();
      await expect(chooseImageButton).toBeVisible({ timeout: 15000 });

      const [chooser] = await Promise.all([workPage.waitForEvent("filechooser"), chooseImageButton.click()]);
      await chooser.setFiles(imagePath);

      const didNavigateToTicketDetail = await workPage
        .waitForURL("**/Gastos/TicketDetail?**", {
          waitUntil: "domcontentloaded",
          timeout: 90000,
        })
        .then(() => true)
        .catch(() => false);

      if (didNavigateToTicketDetail) {
        stopCapture();
        assertQuickCreateOnlyRequests(requestCapture.observed, `expense-sheet quick-create ${path.basename(imagePath)}`);
        await expect(workPage.locator("#expense-ticket-detail-root")).toBeVisible({ timeout: 30000 });

        const sourceSheetId = getQueryParam(workPage.url(), "sheetId") || sheetId;
        await workPage.goto(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sourceSheetId)}`, {
          waitUntil: "domcontentloaded",
        });
        await expect(workPage.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });

        // Linked ticket line should show the ticket/link icon.
        await expect(workPage.locator(".expense-line-card__ticket-icon").first()).toBeVisible({ timeout: 60000 });
        return workPage;
      }

      stopCapture();
      const recoveredPage = await ensureActivePage();
      const errorPanelText = await recoveredPage.locator(".bg-rose-50").first().textContent().catch(() => "");
      lastErrorMessage = `Selected image: ${imagePath}. Error panel: ${String(errorPanelText || "").trim() || "none"}`;

      const closeErrorButton = recoveredPage
        .locator("button")
        .filter({ hasText: /close|cerrar|cancel|cancelar/i })
        .first();
      const canCloseError = await closeErrorButton.isVisible().catch(() => false);
      if (canCloseError) {
        await closeErrorButton.click().catch(() => undefined);
      }

      const retryPage = await ensureActivePage();
      if (!/\/Gastos\/ExpenseSheetDetail/i.test(retryPage.url())) {
        const didReturnToSheetDetail = await retryPage
          .goto(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sheetId)}`, {
            waitUntil: "domcontentloaded",
          })
          .then(() => true)
          .catch(() => false);

        if (didReturnToSheetDetail) {
          await expect(retryPage.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });
        }
      }
    } finally {
      stopCapture();
    }
  }

  throw new Error(`Quick ticket flow failed to navigate to TicketDetail. ${lastErrorMessage || "No retry succeeded."}`);
}

// Opens one line detail card by line description.
async function openLineDetailByDescription(page, description) {
  const card = page.locator(".timeline-card--clickable", { hasText: description }).first();
  await expect(card).toBeVisible({ timeout: 30000 });
  await card.click();
  await page.waitForURL("**/Gastos/ExpenseSheetLineDetail?**", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await expect(page.locator("#expense-line-detail-root")).toBeVisible({ timeout: 30000 });
}

// Opens the first linked line card (line with ticket icon).
async function openFirstLinkedLineDetail(page) {
  const linkedLineCard = page
    .locator(".timeline-item", {
      has: page.locator(".expense-line-card__ticket-icon"),
    })
    .first();
  await expect(linkedLineCard).toBeVisible({ timeout: 60000 });
  await linkedLineCard.locator(".timeline-card--clickable").first().click();
  await page.waitForURL("**/Gastos/ExpenseSheetLineDetail?**", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await expect(page.locator("#expense-line-detail-root")).toBeVisible({ timeout: 30000 });
}

// Best-effort cleanup: deletes created expense sheet.
async function deleteExpenseSheetBestEffort(page, sheetId) {
  if (!sheetId) return;
  const safeId = encodeURIComponent(sheetId);
  await page.request
    .delete(`/api/crm/expensesheets/${safeId}/lines/0?deleteMode=2&deleteWholeSheet=true`, {
      headers: { Accept: "application/json" },
    })
    .catch(() => undefined);
}

test.describe("Expense sheets lines E2E", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async () => {
    await acquirePublicE2ELock("expense-sheets-lines");
  });

  test.afterAll(async () => {
    await releasePublicE2ELock();
  });

  test("Create sheet, create manual line, then create line via Nuevo Ticket image flow", async ({ page }) => {
    await ensureAuthenticatedSession(page);

    const { sheetId } = await createExpenseSheet(page);
    let currentPage = page;
    try {
      await createManualExpenseLine(page);
      currentPage = await createTicketLineFromImage(page, sheetId);
    } finally {
      await deleteExpenseSheetBestEffort(currentPage, sheetId);
    }
  });

  test("Manual lines keep LineRecId for navigation when RecId is not usable", async ({ page }) => {
    await ensureAuthenticatedSession(page);

    const sheetId = `MOCK-LINE-ID-${Date.now()}`;
    const lineRecId = "-999";
    const encodedSheetId = encodeURIComponent(sheetId);
    const detailRoutePattern = new RegExp(`/api/crm/expensesheets/${escapeRegExp(encodedSheetId)}(?:\\?.*)?$`, "i");

    await page.route(detailRoutePattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          Success: true,
          Message: "",
          ErrorCode: null,
          Items: [
            {
              HojaGastosId: sheetId,
              UserId: "E2EUSER",
              Description: "Mock sheet",
              ExpenseSheetStatus: 0,
              EstadoComentarios: null,
              CurrencyCode: "EUR",
              TotalAmount: 10,
              ExchRate: 1,
              ExchangeRateMode: 0,
              ProjId: "PRJ-001",
              Voucher: "",
              CreatedDate: "01/04/2026",
              Lines: [
                {
                  RecId: "0",
                  LineRecId: lineRecId,
                  TransDate: "01/04/2026",
                  TypeValue: 1,
                  Description: "Mock manual line",
                  Internacional: false,
                  FileId: "",
                  Ticket: false,
                  Price: 10,
                  Qty: 1,
                  Amount: 10,
                  ProjId: "PRJ-001",
                  IndAttachFiles: "",
                },
              ],
            },
          ],
          Total: 1,
          Page: 1,
          PageSize: 50,
        }),
      });
    });

    await page.goto(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodedSheetId}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });

    await openLineDetailByDescription(page, "Mock manual line");
    await expect(page).toHaveURL(new RegExp(`lineRecId=${escapeRegExp(encodeURIComponent(lineRecId))}`), {
      timeout: 30000,
    });
    await expect(page.locator("#expense-line-detail-root")).toBeVisible({ timeout: 30000 });
    await expect(page.locator(".text-danger")).toHaveCount(0);
  });

  test("Editing the header auto-saves before opening an existing line in edit mode", async ({ page }) => {
    await ensureAuthenticatedSession(page);

    const { sheetId } = await createExpenseSheet(page);
    try {
      const createdLineDescription = await createManualExpenseLine(page);
      const updatedHeaderDescription = `E2E Header Updated ${Date.now()}`;

      const editButton = page.locator("#expenseEditBtn");
      await expect(editButton).toBeVisible({ timeout: 15000 });
      await editButton.click();

      const descriptionInput = page.getByLabel(/description|descripci[o\u00f3]n/i).first();
      await expect(descriptionInput).toBeVisible({ timeout: 15000 });
      await descriptionInput.fill(updatedHeaderDescription);

      const updateResponsePromise = page.waitForResponse((response) => {
        return (
          response.request().method().toUpperCase() === "PUT" &&
          /\/api\/crm\/expensesheets\/[^/]+$/i.test(normalizeRequestPath(response.url()))
        );
      });

      const lineCard = page.locator(".timeline-card--clickable", { hasText: createdLineDescription }).first();
      await expect(lineCard).toBeVisible({ timeout: 30000 });
      await lineCard.click();

      const updateResponse = await updateResponsePromise;
      expect(updateResponse.ok(), "Header update should complete before opening the line detail.").toBeTruthy();

      await page.waitForURL("**/Gastos/ExpenseSheetLineDetail?**mode=edit**", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await expect(page.locator("#expense-line-detail-root")).toBeVisible({ timeout: 30000 });
      await expect(page.getByLabel(/description|descripci[o\u00f3]n/i).first()).toBeVisible({ timeout: 15000 });

      await page.goto(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sheetId)}`, {
        waitUntil: "domcontentloaded",
      });
      await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });
      await expect(page.locator(`text=${updatedHeaderDescription}`).first()).toBeVisible({ timeout: 30000 });
    } finally {
      await deleteExpenseSheetBestEffort(page, sheetId);
    }
  });

  test("Create sheet, modify one line, verify updates, then delete the line", async ({ page }) => {
    await ensureAuthenticatedSession(page);

    const { sheetId } = await createExpenseSheet(page);
    try {
      const createdLineDescription = await createManualExpenseLine(page);
      await openLineDetailByDescription(page, createdLineDescription);

      const editButton = page.locator("#expenseLineEditBtn");
      await expect(editButton).toBeVisible({ timeout: 15000 });
      await editButton.click();

      const descriptionInput = page.getByLabel(/description|descripci[o\u00f3]n/i).first();
      const isDescriptionEditableAfterClick = await descriptionInput.isVisible().catch(() => false);
      if (!isDescriptionEditableAfterClick) {
        await page.evaluate(() => {
          window.dispatchEvent(new CustomEvent("expense-line-detail-edit"));
        });
      }

      const updatedDescription = `E2E Updated Line ${Date.now()}`;
      const qtyInput = page.getByLabel(/quantity|cantidad/i).first();
      const priceInput = page.getByLabel(/price|precio/i).first();
      await expect(descriptionInput).toBeVisible({ timeout: 15000 });
      await expect(qtyInput).toBeVisible({ timeout: 15000 });
      await expect(priceInput).toBeVisible({ timeout: 15000 });

      await descriptionInput.fill(updatedDescription);
      await qtyInput.fill("2");
      await priceInput.fill("15");

      await saveTopbarChanges(page, "#expenseLineEditBtn");
      await expect(page.locator("#expense-line-detail-root")).toBeVisible({ timeout: 30000 });
      await expect(page.locator(`input[value="${updatedDescription}"]`).first()).toBeVisible({ timeout: 15000 });
      await expect(page.locator('input[value="2.00"]').first()).toBeVisible({ timeout: 15000 });

      const deleteButton = page.locator("#expenseLineDeleteBtn");
      await expect(deleteButton).toBeVisible({ timeout: 15000 });
      await deleteButton.click();
      await clickModalAction(page, /delete|eliminar|borrar/i);

      const redirectedToSheetDetail = await page
        .waitForURL("**/Gastos/ExpenseSheetDetail?hojaGastosId=**", {
          waitUntil: "domcontentloaded",
          timeout: 20000,
        })
        .then(() => true)
        .catch(() => false);

      if (!redirectedToSheetDetail) {
        await page.goto(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sheetId)}`, {
          waitUntil: "domcontentloaded",
        });
      }

      await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });
      await expect(page.locator("#indActionMarkWrap")).toHaveClass(/text-emerald-600/, { timeout: 5000 });
      await expect(page.locator(".timeline-card--clickable", { hasText: updatedDescription })).toHaveCount(0, {
        timeout: 30000,
      });
    } finally {
      await deleteExpenseSheetBestEffort(page, sheetId);
    }
  });

  test("Create sheet, create linked ticket line, then delete linked line with full cleanup chain", async ({ page }) => {
    await ensureAuthenticatedSession(page);

    const { sheetId } = await createExpenseSheet(page);
    let currentPage = page;
    try {
      currentPage = await createTicketLineFromImage(page, sheetId);

      const initialLinkedLines = await currentPage.locator(".expense-line-card__ticket-icon").count();
      expect(initialLinkedLines).toBeGreaterThan(0);

      const linkedLineCard = currentPage
        .locator(".timeline-item", {
          has: currentPage.locator(".expense-line-card__ticket-icon"),
        })
        .first();
      const linkedTicketFileId = String(
        (await linkedLineCard.locator(".expense-line-card__ticket-icon[aria-label]").first().getAttribute("aria-label")) || ""
      ).trim();
      expect(linkedTicketFileId).not.toBe("");

      await openFirstLinkedLineDetail(currentPage);

      const lineRecId = getQueryParam(currentPage.url(), "lineRecId");
      expect(lineRecId).not.toBe("");

      const deleteButton = currentPage.locator("#expenseLineDeleteBtn");
      await expect(deleteButton).toBeVisible({ timeout: 15000 });
      await deleteButton.click();
      await clickModalAction(currentPage, /delete|eliminar|borrar/i);

      const redirectedToSheetDetail = await currentPage
        .waitForURL("**/Gastos/ExpenseSheetDetail?hojaGastosId=**", {
          waitUntil: "domcontentloaded",
          timeout: 30000,
        })
        .then(() => true)
        .catch(() => false);

      if (!redirectedToSheetDetail) {
        await currentPage.goto(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sheetId)}`, {
          waitUntil: "domcontentloaded",
        });
      }

      await expect(currentPage.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });
      await expect
        .poll(async () => currentPage.locator(".expense-line-card__ticket-icon").count(), { timeout: 60000 })
        .toBe(Math.max(0, initialLinkedLines - 1));
    } finally {
      await deleteExpenseSheetBestEffort(currentPage, sheetId);
    }
  });
});
