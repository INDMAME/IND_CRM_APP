// Playwright E2E: expense sheet create, manual line, ticket-from-image line, edit and delete line.
const fs = require("node:fs");
const path = require("node:path");
const { test, expect } = require("./e2e-devtools-mobile.fixture");

const TICKETS_PHOTOS_DIR =
  process.env.IND_E2E_TICKETS_PHOTOS_DIR || "C:\\Users\\marco.meza\\Pictures\\Tickets Fotos";
const SUPPORTED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
test.setTimeout(600000);

// Ensures an authenticated session exists before accessing protected pages.
async function ensureAuthenticatedSession(page) {
  await page.goto("/Gastos/ExpenseSheets?fresh=1", { waitUntil: "domcontentloaded" });
  const loginGateVisible = await page
    .getByRole("button", { name: /sign in with microsoft|iniciar sesi[o\u00f3]n con microsoft/i })
    .isVisible()
    .catch(() => false);

  if (loginGateVisible) {
    throw new Error("No active authenticated session. Run: npm run test:e2e:auth:capture");
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

// Confirms action in app modal by button label.
async function clickModalAction(page, actionRegex) {
  const button = page.locator("div.fixed.inset-0 button").filter({ hasText: actionRegex }).first();
  await expect(button).toBeVisible({ timeout: 15000 });
  await button.click();
}

// Saves current edit in topbar and confirms modal.
async function saveTopbarChanges(page, topbarButtonSelector) {
  const button = page.locator(topbarButtonSelector);
  await expect(button).toBeVisible({ timeout: 15000 });
  await button.click();
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
  const imagePath = pickRandomTicketImagePath();
  await clickFabMenuItem(page, /nuevo ticket|new ticket/i);

  const chooseImageButton = page.getByRole("button", { name: /elegir imagen|choose image/i }).first();
  await expect(chooseImageButton).toBeVisible({ timeout: 15000 });

  const [chooser] = await Promise.all([page.waitForEvent("filechooser"), chooseImageButton.click()]);
  await chooser.setFiles(imagePath);

  try {
    await page.waitForURL("**/Gastos/TicketDetail?**", {
      waitUntil: "domcontentloaded",
      timeout: 240000,
    });
  } catch {
    const errorPanelText = await page.locator(".bg-rose-50").first().textContent().catch(() => "");
    throw new Error(
      `Quick ticket flow failed to navigate to TicketDetail. Selected image: ${imagePath}. Error panel: ${String(errorPanelText || "").trim() || "none"}`
    );
  }

  await expect(page.locator("#expense-ticket-detail-root")).toBeVisible({ timeout: 30000 });

  const sourceSheetId = getQueryParam(page.url(), "sheetId") || sheetId;
  await page.goto(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sourceSheetId)}`, {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });

  // Linked ticket line should show the ticket/link icon.
  await expect(page.locator(".expense-line-card__ticket-icon").first()).toBeVisible({ timeout: 60000 });
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

  test("Create sheet, create manual line, then create line via Nuevo Ticket image flow", async ({ page }) => {
    await ensureAuthenticatedSession(page);

    const { sheetId } = await createExpenseSheet(page);
    try {
      await createManualExpenseLine(page);
      await createTicketLineFromImage(page, sheetId);
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

      const updatedDescription = `E2E Updated Line ${Date.now()}`;
      const descriptionInput = page.getByLabel(/description|descripci[o\u00f3]n/i).first();
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
      await expect(page.locator(".timeline-card--clickable", { hasText: updatedDescription })).toHaveCount(0, {
        timeout: 30000,
      });
    } finally {
      await deleteExpenseSheetBestEffort(page, sheetId);
    }
  });
});
