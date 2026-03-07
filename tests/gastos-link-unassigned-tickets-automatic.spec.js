// Playwright E2E: create random gallery tickets, create sheet + manual line, link one then multiple unassigned tickets.
const fs = require("node:fs");
const path = require("node:path");
const { test, expect } = require("./e2e-devtools-mobile.fixture");

const TICKETS_PHOTOS_DIR =
  process.env.IND_E2E_TICKETS_PHOTOS_DIR || "C:\\Users\\marco.meza\\Pictures\\Tickets Fotos";
const SUPPORTED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const PREFERRED_TICKET_IMAGE_NAMES = [
  "ticket-de-compra.jpg",
  "ticket-comida.jpg",
  "ticket-de-compra (1).jpg",
  "ticket-bar-pizasso-1.jpg",
];
const REQUIRED_SELECTABLE_TICKETS = 3;
const REQUIRED_CREATED_TICKETS = 5;
const MAX_CREATE_ATTEMPTS = 18;
const DEFAULT_CURRENCY = "EUR";

test.setTimeout(900000);

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

// Builds image candidates for gallery upload retries prioritizing known valid samples.
function buildTicketImageCandidates() {
  const allFiles = listFilesRecursive(TICKETS_PHOTOS_DIR);
  const imageFiles = allFiles.filter((filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return SUPPORTED_IMAGE_EXTENSIONS.has(ext);
  });

  if (imageFiles.length === 0) {
    throw new Error(`No supported image files found in: ${TICKETS_PHOTOS_DIR}`);
  }

  const normalizedByName = new Map(imageFiles.map((filePath) => [path.basename(filePath).toLowerCase(), filePath]));
  const preferred = PREFERRED_TICKET_IMAGE_NAMES.map((name) => normalizedByName.get(name)).filter(Boolean);
  const remaining = imageFiles
    .filter((filePath) => !preferred.includes(filePath))
    .sort(() => Math.random() - 0.5);
  return [...preferred, ...remaining];
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

// Returns a currently active page from context or creates one if needed.
async function ensureActivePage(page) {
  if (page && !page.isClosed()) return page;
  const context = page.context();
  const openPage = context
    .pages()
    .find((candidate) => candidate && typeof candidate.isClosed === "function" && !candidate.isClosed());
  if (openPage) return openPage;
  return context.newPage();
}

// Confirms action in app modal by button label.
async function clickModalAction(page, actionRegex) {
  const button = page.locator("div.fixed.inset-0 button").filter({ hasText: actionRegex }).first();
  await expect(button).toBeVisible({ timeout: 20000 });
  await button.click();
}

// Saves current edit in topbar and confirms modal.
async function saveTopbarChanges(page, topbarButtonSelector) {
  const button = page.locator(topbarButtonSelector);
  await expect(button).toBeVisible({ timeout: 15000 });
  await button.click();
  await clickModalAction(page, /save|guardar/i);
}

// Ensures currency combobox has a valid non-empty value.
async function ensureCurrencySelected(page, preferredCurrencyCode = DEFAULT_CURRENCY) {
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

// Creates a new expense sheet from create mode and returns generated sheet id.
async function createExpenseSheet(page) {
  await page.goto("/Gastos/ExpenseSheetDetail?mode=create", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });

  const description = `E2E Link Sheet ${Date.now()}`;
  const descriptionInput = page.getByLabel(/description|descripci[o\u00f3]n/i).first();
  await expect(descriptionInput).toBeVisible({ timeout: 15000 });
  await descriptionInput.fill(description);
  await ensureCurrencySelected(page, DEFAULT_CURRENCY);

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

// Opens line create mode from expense sheet detail.
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
  const uniqueDescription = `E2E Link Manual Line ${Date.now()}`;
  await openCreateLineFromSheet(page);

  const descriptionInput = page.getByLabel(/description|descripci[o\u00f3]n/i).first();
  const priceInput = page.getByLabel(/price|precio/i).first();
  const qtyInput = page.getByLabel(/quantity|cantidad/i).first();
  await expect(descriptionInput).toBeVisible({ timeout: 15000 });
  await expect(priceInput).toBeVisible({ timeout: 15000 });
  await expect(qtyInput).toBeVisible({ timeout: 15000 });

  await descriptionInput.fill(uniqueDescription);
  await selectLineType(page);
  await priceInput.fill("9");
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

// Creates one ticket from tickets page through random gallery upload.
async function createTicketFromGalleryUpload(page, imagePath) {
  await page.goto("/Gastos/Tickets?fresh=1", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });

  await clickFabMenuItem(page, /nuevo ticket|new ticket/i);

  const chooseImageButton = page.getByRole("button", { name: /elegir imagen|choose image/i }).first();
  await expect(chooseImageButton).toBeVisible({ timeout: 15000 });
  const [chooser] = await Promise.all([page.waitForEvent("filechooser"), chooseImageButton.click()]);
  await chooser.setFiles(imagePath);

  const didNavigateToTicketDetail = await page
    .waitForURL("**/Gastos/TicketDetail?**", {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    })
    .then(() => true)
    .catch(() => false);

  if (!didNavigateToTicketDetail) {
    const errorText = await page.locator(".bg-rose-50").first().textContent().catch(() => "");
    const closeErrorButton = page
      .locator("button")
      .filter({ hasText: /close|cerrar|cancel|cancelar/i })
      .first();
    const canCloseError = await closeErrorButton.isVisible().catch(() => false);
    if (canCloseError) {
      await closeErrorButton.click().catch(() => undefined);
    }

    return {
      fileId: "",
      error: `Ticket create did not navigate. ${String(errorText || "").trim() || "No error panel text."}`,
    };
  }

  await expect(page.locator("#expense-ticket-detail-root")).toBeVisible({ timeout: 30000 });
  const fileId = getQueryParam(page.url(), "fileId");
  if (!fileId) {
    return {
      fileId: "",
      error: "Ticket detail opened but fileId was empty in URL.",
    };
  }

  return { fileId, error: "" };
}

// Creates multiple tickets from random gallery images with retries.
async function createTicketsFromGallery(page, requiredCount) {
  const imagePool = buildTicketImageCandidates();
  const createdIds = [];
  let lastError = "";
  let activePage = page;

  for (let attempt = 0; attempt < MAX_CREATE_ATTEMPTS && createdIds.length < requiredCount; attempt += 1) {
    activePage = await ensureActivePage(activePage);
    const imagePath = imagePool[attempt % imagePool.length];
    try {
      const result = await createTicketFromGalleryUpload(activePage, imagePath);
      if (result.fileId && !createdIds.includes(result.fileId)) {
        createdIds.push(result.fileId);
        continue;
      }
      lastError = result.error || `Unknown create error using image: ${imagePath}`;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error || "");
      lastError = `Attempt ${attempt + 1} failed. ${message || "Unknown error"}`;
    }
  }

  if (createdIds.length < requiredCount) {
    throw new Error(`Could not create ${requiredCount} tickets from gallery. Last error: ${lastError || "n/a"}`);
  }

  return { ticketIds: createdIds, activePage };
}

// Opens link mode from sheet detail FAB.
async function openLinkModeFromSheet(page, sheetId) {
  await clickFabMenuItem(page, /vincular ticket|link ticket/i);
  await page.waitForURL("**/Gastos/Tickets?**action=link**", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });
  await expect
    .poll(() => getQueryParam(page.url(), "hojaGastosId"), { timeout: 15000 })
    .toBe(String(sheetId));
}

// Applies ticket file filter and waits for list response.
async function applyTicketFilter(page, fileId) {
  const ticketInput = page.getByRole("combobox", { name: /ticket/i }).first();
  await expect(ticketInput).toBeVisible({ timeout: 15000 });
  await ticketInput.fill("");
  if (fileId) {
    await ticketInput.fill(fileId);
  }

  const applyButton = page.getByRole("button", { name: /apply|aplicar/i }).first();
  await expect(applyButton).toBeVisible({ timeout: 15000 });
  const waitListResponse = page
    .waitForResponse(
      (response) =>
        response.url().includes("/api/crm/expensesheets/tickets/list") && response.request().method().toUpperCase() === "POST",
      { timeout: 60000 }
    )
    .catch(() => null);
  await applyButton.click();
  await waitListResponse;
}

// Finds ticket checkbox by file id and returns whether it is enabled.
async function isTicketSelectableInLinkMode(page, fileId) {
  const ticketItem = page.locator(`.timeline-item[data-ticket-file-id="${fileId}"]`).first();
  const exists = (await ticketItem.count()) > 0;
  if (!exists) return false;
  const checkbox = ticketItem.locator("input[type='checkbox']").first();
  const visible = await checkbox.isVisible().catch(() => false);
  if (!visible) return false;
  return checkbox.isEnabled();
}

// Collects selectable ticket ids currently visible in link mode list.
async function getVisibleSelectableTicketIds(page, limit = 6) {
  const items = page.locator(".timeline-item[data-ticket-file-id]");
  const count = await items.count();
  const result = [];
  for (let index = 0; index < count && result.length < limit; index += 1) {
    const item = items.nth(index);
    const fileId = String((await item.getAttribute("data-ticket-file-id")) || "").trim();
    if (!fileId) continue;
    const checkbox = item.locator("input[type='checkbox']").first();
    const visible = await checkbox.isVisible().catch(() => false);
    if (!visible) continue;
    const enabled = await checkbox.isEnabled().catch(() => false);
    if (!enabled) continue;
    result.push(fileId);
  }
  return result;
}

// Selects one ticket by file id in current filtered list.
async function selectTicketByFileId(page, fileId) {
  const ticketItem = page.locator(`.timeline-item[data-ticket-file-id="${fileId}"]`).first();
  await expect(ticketItem).toBeVisible({ timeout: 60000 });

  const checkbox = ticketItem.locator("input[type='checkbox']").first();
  await expect(checkbox).toBeVisible({ timeout: 15000 });
  await expect(checkbox).toBeEnabled({ timeout: 15000 });
  await checkbox.check();
  await expect(checkbox).toBeChecked({ timeout: 15000 });
}

// Confirms link action and waits until current filtered id disappears from list.
async function confirmLinkSelection(page, expectedCount, filteredFileIdAfterLink) {
  const linkButton = page.getByRole("button", { name: /vincular ticket|link ticket/i }).first();
  await expect(linkButton).toBeVisible({ timeout: 20000 });
  await expect(linkButton).toContainText(new RegExp(`\\(${expectedCount}\\)`), { timeout: 15000 });
  await linkButton.click();

  const modal = page.locator("div.fixed.inset-0").first();
  await expect(modal).toBeVisible({ timeout: 15000 });
  await expect(modal).toContainText(new RegExp(`Tickets\\s*:\\s*${expectedCount}`, "i"), { timeout: 15000 });
  await clickModalAction(page, /vincular ticket|link ticket|link/i);

  if (filteredFileIdAfterLink) {
    await expect
      .poll(async () => page.locator(`.timeline-item[data-ticket-file-id="${filteredFileIdAfterLink}"]`).count(), { timeout: 120000 })
      .toBe(0);
  }
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

// Best-effort cleanup: deletes created tickets.
async function deleteTicketsBestEffort(page, ticketFileIds) {
  for (const fileId of ticketFileIds) {
    const safeFileId = encodeURIComponent(String(fileId || "").trim());
    if (!safeFileId) continue;
    await page.request.delete(`/api/crm/expensesheets/tickets/${safeFileId}`).catch(() => undefined);
  }
}

test.describe("Expense sheet link mode E2E", () => {
  test.describe.configure({ mode: "serial" });

  test("Create random gallery tickets, create sheet + manual line, link one and then multiple tickets", async ({ page }) => {
    let currentPage = page;
    await ensureAuthenticatedSession(currentPage);

    const createdTicketIds = [];
    let sheetId = "";
    try {
      const createdTickets = await createTicketsFromGallery(currentPage, REQUIRED_CREATED_TICKETS);
      createdTicketIds.push(...createdTickets.ticketIds);
      currentPage = createdTickets.activePage;

      const createdSheet = await createExpenseSheet(currentPage);
      sheetId = createdSheet.sheetId;
      await createManualExpenseLine(currentPage);

      await openLinkModeFromSheet(currentPage, sheetId);

      const statusInput = currentPage.getByRole("combobox", { name: /status|estado/i }).first();
      await expect(statusInput).toBeVisible({ timeout: 20000 });
      await expect(statusInput).toBeDisabled({ timeout: 20000 });

      const selectableTicketIds = [];
      for (const fileId of createdTicketIds) {
        await applyTicketFilter(currentPage, fileId);
        const selectable = await isTicketSelectableInLinkMode(currentPage, fileId);
        if (selectable) {
          selectableTicketIds.push(fileId);
        }
      }

      await applyTicketFilter(currentPage, "");
      const visibleSelectable = await getVisibleSelectableTicketIds(currentPage, 6);
      const candidates = Array.from(new Set([...selectableTicketIds, ...visibleSelectable]));
      expect(candidates.length).toBeGreaterThanOrEqual(REQUIRED_SELECTABLE_TICKETS);

      const firstTicket = candidates[0];
      await applyTicketFilter(currentPage, firstTicket);
      await selectTicketByFileId(currentPage, firstTicket);
      await confirmLinkSelection(currentPage, 1, firstTicket);

      const multiTickets = candidates.slice(1, 3);
      expect(multiTickets.length).toBe(2);
      for (const fileId of multiTickets) {
        await applyTicketFilter(currentPage, fileId);
        await selectTicketByFileId(currentPage, fileId);
      }
      await confirmLinkSelection(currentPage, multiTickets.length, multiTickets[multiTickets.length - 1]);

      for (const fileId of [firstTicket, ...multiTickets]) {
        await applyTicketFilter(currentPage, fileId);
        await expect(currentPage.locator(`.timeline-item[data-ticket-file-id="${fileId}"]`)).toHaveCount(0, { timeout: 60000 });
      }
    } finally {
      currentPage = await ensureActivePage(currentPage);
      await deleteExpenseSheetBestEffort(currentPage, sheetId);
      await deleteTicketsBestEffort(currentPage, createdTicketIds);
    }
  });
});
