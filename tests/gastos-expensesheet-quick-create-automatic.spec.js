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
  "ticket-bar-pizasso-1.jpg",
];

test.setTimeout(600000);

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

function getQueryParam(url, key) {
  try {
    const parsed = new URL(url);
    return String(parsed.searchParams.get(key) || "").trim();
  } catch {
    return "";
  }
}

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

function pickTicketImageCandidates(maxCandidates = 3) {
  const allFiles = listFilesRecursive(TICKETS_PHOTOS_DIR);
  const imageFiles = allFiles.filter((filePath) => SUPPORTED_IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()));
  if (imageFiles.length === 0) {
    throw new Error(`No supported image files found in: ${TICKETS_PHOTOS_DIR}`);
  }

  const normalizedByName = new Map(imageFiles.map((filePath) => [path.basename(filePath).toLowerCase(), filePath]));
  const preferred = PREFERRED_TICKET_IMAGE_NAMES.map((name) => normalizedByName.get(name.toLowerCase())).filter(Boolean);
  const remaining = imageFiles.filter((filePath) => !preferred.includes(filePath)).sort(() => Math.random() - 0.5);
  return [...preferred, ...remaining].slice(0, Math.max(1, maxCandidates));
}

function normalizeRequestPath(requestUrl) {
  try {
    return new URL(requestUrl).pathname.toLowerCase();
  } catch {
    return String(requestUrl || "").trim().toLowerCase();
  }
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

async function clickModalAction(page, actionRegex) {
  const button = page.locator("div.fixed.inset-0 button").filter({ hasText: actionRegex }).first();
  await expect(button).toBeVisible({ timeout: 15000 });
  await button.click();
}

async function saveTopbarChanges(page, topbarButtonSelector) {
  const confirmButton = page.locator("div.fixed.inset-0 button").filter({ hasText: /save|guardar/i }).first();
  const modalAlreadyVisible = await confirmButton.isVisible().catch(() => false);
  if (!modalAlreadyVisible) {
    const button = page.locator(topbarButtonSelector);
    await expect(button).toBeVisible({ timeout: 15000 });
    await button.click();
  }
  await clickModalAction(page, /save|guardar/i);
}

async function clickFabMenuItem(page, itemNameRegex) {
  const fabMainButton = page.locator("div.fixed.z-2000 button[aria-haspopup='menu']").first();
  await expect(fabMainButton).toBeVisible({ timeout: 15000 });
  await fabMainButton.click();

  const menuItem = page.getByRole("menuitem", { name: itemNameRegex }).first();
  await expect(menuItem).toBeVisible({ timeout: 15000 });
  await menuItem.click();
}

async function readExpenseApiRequestHeaders(page) {
  const runtime = await page.evaluate(() => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return {
      csrfToken: String(meta?.getAttribute("content") || "").trim(),
      companyId: String(window.__IND_SELECTED_COMPANY__ || "").trim(),
      token: String(window.__IND_API_TOKEN__ || "").trim(),
    };
  });

  const headers = {
    Accept: "application/json",
    RequestVerificationToken: runtime.csrfToken,
  };

  if (runtime.companyId) {
    headers["X-IND-Company"] = runtime.companyId;
  }

  if (runtime.token) {
    headers.Authorization = `Bearer ${runtime.token}`;
  }

  return headers;
}

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

async function createExpenseSheet(page) {
  await page.goto("/Gastos/ExpenseSheetDetail?mode=create", { waitUntil: "domcontentloaded" });
  await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });

  const description = `E2E Quick Sheet ${Date.now()}`;
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

  return sheetId;
}

async function ensureActivePage(page) {
  if (page && !page.isClosed()) return page;
  const context = page.context();
  const openPage = context.pages().find((candidate) => candidate && !candidate.isClosed());
  if (openPage) return openPage;
  return context.newPage();
}

async function createTicketLineFromImage(page, sheetId) {
  const imageCandidates = pickTicketImageCandidates(3);
  let lastErrorMessage = "";
  let activePage = page;

  for (const imagePath of imageCandidates) {
    const workPage = await ensureActivePage(activePage);
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
          timeout: 120000,
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
        await expect(workPage.locator(".expense-line-card__ticket-icon").first()).toBeVisible({ timeout: 60000 });

        activePage = workPage;
        return activePage;
      }

      stopCapture();
      const recoveredPage = await ensureActivePage(workPage);
      const errorPanelText = await recoveredPage.locator(".bg-rose-50").first().textContent().catch(() => "");
      lastErrorMessage = `Selected image: ${imagePath}. Error panel: ${String(errorPanelText || "").trim() || "none"}`;
    } finally {
      stopCapture();
    }
  }

  throw new Error(`Quick ticket flow failed on expense sheet detail. ${lastErrorMessage || "No retry succeeded."}`);
}

async function deleteExpenseSheetBestEffort(page, sheetId) {
  if (!sheetId) return;
  const safeId = encodeURIComponent(sheetId);
  const headers = await readExpenseApiRequestHeaders(page);
  await page
    .evaluate(
      async ({ url, requestHeaders }) => {
        await fetch(url, {
          method: "DELETE",
          headers: requestHeaders,
          credentials: "same-origin",
        });
      },
      {
        url: `/api/crm/expensesheets/${safeId}/lines/0?deleteMode=2&deleteWholeSheet=true`,
        requestHeaders: headers,
      }
    )
    .catch(() => undefined);
}

test.describe("Expense sheet quick-create E2E", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async () => {
    await acquirePublicE2ELock("expense-sheet-quick-create");
  });

  test.afterAll(async () => {
    await releasePublicE2ELock();
  });

  test("Create expense sheet line from image using only quick-create", async ({ page }) => {
    await ensureAuthenticatedSession(page);
    const sheetId = await createExpenseSheet(page);
    let currentPage = page;

    try {
      currentPage = await createTicketLineFromImage(page, sheetId);
    } finally {
      currentPage = await ensureActivePage(currentPage);
      await deleteExpenseSheetBestEffort(currentPage, sheetId);
    }
  });
});
