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

function pickPreferredTicketImagePath() {
  const allFiles = listFilesRecursive(TICKETS_PHOTOS_DIR);
  const imageFiles = allFiles.filter((filePath) => SUPPORTED_IMAGE_EXTENSIONS.has(path.extname(filePath).toLowerCase()));
  if (imageFiles.length === 0) {
    throw new Error(`No supported image files found in: ${TICKETS_PHOTOS_DIR}`);
  }

  const normalizedByName = new Map(imageFiles.map((filePath) => [path.basename(filePath).toLowerCase(), filePath]));
  for (const preferredName of PREFERRED_TICKET_IMAGE_NAMES) {
    const preferredPath = normalizedByName.get(preferredName.toLowerCase());
    if (preferredPath) return preferredPath;
  }

  return imageFiles[0];
}

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

async function ensureAuthenticatedSession(page) {
  await page.goto("/Gastos/Tickets?fresh=1", { waitUntil: "domcontentloaded" });
  const loginGateVisible = await page
    .getByRole("button", { name: /sign in with microsoft|iniciar sesi[o\u00f3]n con microsoft/i })
    .isVisible()
    .catch(() => false);

  if (loginGateVisible) {
    throw new Error("No active authenticated session. Run: npm run test:e2e:auth:capture");
  }
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

async function deleteTemporaryTicket(page, fileId) {
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  if (!safeFileId) return;
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
        url: `/api/crm/expensesheets/tickets/${safeFileId}`,
        requestHeaders: headers,
      }
    )
    .catch(() => undefined);
}

test.describe("Ticket quick-create E2E", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async () => {
    await acquirePublicE2ELock("expense-ticket-quick-create");
  });

  test.afterAll(async () => {
    await releasePublicE2ELock();
  });

  test("Create ticket from image on tickets page using only quick-create", async ({ page }) => {
    await ensureAuthenticatedSession(page);
    const imagePath = pickPreferredTicketImagePath();
    let fileId = "";

    const requestCapture = startTicketCreationRequestCapture(page);
    let captureStopped = false;
    const stopCapture = () => {
      if (captureStopped) return;
      requestCapture.stop();
      captureStopped = true;
    };

    try {
      await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });
      await clickFabMenuItem(page, /nuevo ticket|new ticket/i);

      const chooseImageButton = page.getByRole("button", { name: /elegir imagen|choose image/i }).first();
      await expect(chooseImageButton).toBeVisible({ timeout: 15000 });
      const [chooser] = await Promise.all([page.waitForEvent("filechooser"), chooseImageButton.click()]);
      await chooser.setFiles(imagePath);

      await page.waitForURL("**/Gastos/TicketDetail?**", {
        waitUntil: "domcontentloaded",
        timeout: 120000,
      });
      stopCapture();

      assertQuickCreateOnlyRequests(requestCapture.observed, `ticket quick-create ${path.basename(imagePath)}`);
      await expect(page.locator("#expense-ticket-detail-root")).toBeVisible({ timeout: 30000 });

      fileId = getQueryParam(page.url(), "fileId");
      expect(fileId).not.toBe("");
    } finally {
      stopCapture();
      await deleteTemporaryTicket(page, fileId);
    }
  });
});
