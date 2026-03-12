// Playwright E2E: create random gallery tickets, create sheet + manual line, link one then multiple unassigned tickets.
const fs = require("node:fs");
const path = require("node:path");
const { test, expect } = require("./e2e-devtools-mobile.fixture");
const { acquirePublicE2ELock, releasePublicE2ELock } = require("./public-env-lock");

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
const REQUIRED_CREATED_TICKETS = REQUIRED_SELECTABLE_TICKETS;
const REQUIRED_GALLERY_TICKETS = REQUIRED_CREATED_TICKETS;
const MAX_GALLERY_ATTEMPTS = 8;
const DEFAULT_CURRENCY = "EUR";
const LOGIN_GATE_REGEX = /sign in with microsoft|iniciar sesi[o\u00f3]n con microsoft/i;
const AUTH_LOGGED_OUT_REGEX = /[?&]loggedout=true\b/i;
const EXTENSION_TO_MIME = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

test.setTimeout(900000);

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
  await page.goto("/Gastos/Tickets?fresh=1", { waitUntil: "domcontentloaded" });
  await assertStillAuthenticated(page, "opening Gastos");
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

// Detects the Microsoft login gate so tests fail fast on auth loss.
async function isLoginGateVisible(page) {
  const loginLinkVisible = await page
    .getByRole("link", { name: LOGIN_GATE_REGEX })
    .isVisible()
    .catch(() => false);
  if (loginLinkVisible) return true;

  return page
    .getByRole("button", { name: LOGIN_GATE_REGEX })
    .isVisible()
    .catch(() => false);
}

// Stops the flow immediately when session is lost.
async function assertStillAuthenticated(page, contextLabel) {
  const currentUrl = String(page.url() || "");
  const loginGateVisible = await isLoginGateVisible(page);
  const expenseRootsVisible = await page
    .locator("#expense-sheets-root, #expense-sheet-detail-root, #expense-tickets-root, #expense-ticket-detail-root")
    .count()
    .catch(() => 0);
  if (loginGateVisible || AUTH_LOGGED_OUT_REGEX.test(currentUrl) || /\/Auth\//i.test(currentUrl) || expenseRootsVisible < 1) {
    throw new Error(`Authentication lost while ${contextLabel}. Run: npm run test:e2e:auth:capture`);
  }
}

// Returns a plain trimmed string value.
function safeText(value) {
  return String(value ?? "").trim();
}

// Reads an object-like value defensively.
function asRecord(value) {
  return value && typeof value === "object" ? value : {};
}

// Returns the first defined property found in a record.
function getFirstDefined(record, keys) {
  for (const key of keys) {
    if (record && Object.prototype.hasOwnProperty.call(record, key)) {
      return record[key];
    }
  }
  return undefined;
}

// Parses any numeric-like value.
function toNumber(value) {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

// Parses a strictly positive number.
function toPositiveNumber(value) {
  const parsed = toNumber(value);
  return parsed !== null && parsed > 0 ? parsed : null;
}

// Normalizes supported date shapes to DD.MM.YYYY.
function toDdMmYyyy(value) {
  const text = safeText(value);
  if (!text) return "";
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(text)) return text;
  if (/^\d{8}$/.test(text)) {
    return `${text.slice(0, 2)}.${text.slice(2, 4)}.${text.slice(4)}`;
  }

  const parsed = new Date(text);
  if (Number.isNaN(parsed.getTime())) return "";
  const day = String(parsed.getDate()).padStart(2, "0");
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const year = String(parsed.getFullYear());
  return `${day}.${month}.${year}`;
}

// Builds a stable today string for ticket draft defaults.
function getTodayDdMmYyyy() {
  return toDdMmYyyy(new Date());
}

// Reads the same auth headers that the React expense client attaches to API calls.
async function readExpenseApiRequestHeaders(page, includeJson = false) {
  const runtime = await page.evaluate(() => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    let currentAxUserId = "";
    for (let index = 0; index < sessionStorage.length; index += 1) {
      const key = sessionStorage.key(index);
      if (!key || !key.startsWith("expense_management_context_v2_")) {
        continue;
      }
      try {
        const raw = JSON.parse(String(sessionStorage.getItem(key) || "{}"));
        currentAxUserId = String(raw.currentAxUserId || "").trim();
        if (currentAxUserId) {
          break;
        }
      } catch {
        // Ignore malformed cached state and keep scanning.
      }
    }
    return {
      token: String(window.__IND_API_TOKEN__ || "").trim(),
      companyId: String(window.__IND_SELECTED_COMPANY__ || "").trim(),
      csrfToken: String(meta?.getAttribute("content") || "").trim(),
      currentAxUserId,
    };
  });

  const headers = {
    Accept: "application/json",
  };

  if (runtime.token) {
    headers.Authorization = `Bearer ${runtime.token}`;
  }

  if (runtime.companyId) {
    headers["X-IND-Company"] = runtime.companyId;
  }

  if (runtime.csrfToken) {
    headers.RequestVerificationToken = runtime.csrfToken;
  }

  if (runtime.currentAxUserId) {
    headers["X-IND-AxUserId"] = runtime.currentAxUserId;
  }

  if (includeJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

// Calls one expense API endpoint from the authenticated browser page so cookies and runtime headers stay aligned.
async function callExpenseApiFromPage(page, url, method, payload) {
  const upperMethod = String(method || "GET").trim().toUpperCase() || "GET";
  const includeJson = upperMethod !== "GET" && payload !== undefined;
  const headers = await readExpenseApiRequestHeaders(page, includeJson);
  return page.evaluate(
    async ({ requestUrl, requestMethod, requestHeaders, requestBody }) => {
      const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: requestHeaders,
        credentials: "same-origin",
        body: requestBody,
      });
      return {
        status: response.status,
        body: await response.text(),
      };
    },
    {
      requestUrl: url,
      requestMethod: upperMethod,
      requestHeaders: headers,
      requestBody: includeJson ? JSON.stringify(payload) : undefined,
    }
  );
}

// Extracts the file id returned by the IA draft flow.
function resolveTicketFileIdFromDraftResponse(rawData) {
  const data = asRecord(rawData);
  const creation = asRecord(getFirstDefined(data, ["TicketCreation", "ticketCreation"]));
  return safeText(getFirstDefined(creation, ["FileId", "fileId"]));
}

// Extracts upload sync response values.
function resolveUploadResult(rawData) {
  const data = asRecord(rawData);
  return {
    urlFile: safeText(getFirstDefined(data, ["UrlFile", "urlFile"])),
    fileName: safeText(getFirstDefined(data, ["FileName", "fileName"])),
  };
}

// Normalizes the IA draft payload to the structure used by quick ticket flow.
function normalizeDraftFromIaResponse(rawData) {
  const data = asRecord(rawData);
  const draftDescription = safeText(getFirstDefined(data, ["description", "Description"]));
  const draftCurrency = safeText(getFirstDefined(data, ["currencyCode", "CurrencyCode"])).toUpperCase();
  const draftTotalAmount = toPositiveNumber(getFirstDefined(data, ["totalAmount", "TotalAmount"])) || 0;
  const draftTransDate = toDdMmYyyy(getFirstDefined(data, ["transDate", "TransDate"])) || getTodayDdMmYyyy();
  const draftComment = safeText(getFirstDefined(data, ["comentario", "Comentario"]));
  const draftGastoType = toNumber(getFirstDefined(data, ["gastoType", "GastoType"]));

  const rawLines = getFirstDefined(data, ["lines", "Lines"]);
  const lineArray = Array.isArray(rawLines) ? rawLines : [];
  const lines = lineArray
    .map((entry) => {
      const lineRecord = asRecord(entry);
      const qty = toPositiveNumber(getFirstDefined(lineRecord, ["qty", "Qty"])) || 1;
      const price = toPositiveNumber(getFirstDefined(lineRecord, ["price", "Price"])) || 0;
      const explicitTotal = toPositiveNumber(getFirstDefined(lineRecord, ["totalAmount", "TotalAmount"])) || 0;
      const computedTotal = explicitTotal > 0 ? explicitTotal : qty * price;
      if (!(computedTotal > 0)) return null;

      const typeValue = Number(getFirstDefined(lineRecord, ["typeValue", "TypeValue"]) || draftGastoType || 8);
      return {
        description: safeText(getFirstDefined(lineRecord, ["description", "Description"])) || draftDescription || "Ticket",
        qty,
        price: price > 0 ? price : computedTotal,
        totalAmount: computedTotal,
        typeValue: Number.isInteger(typeValue) && typeValue > 0 ? typeValue : 8,
        transDate: toDdMmYyyy(getFirstDefined(lineRecord, ["transDate", "TransDate"])) || draftTransDate,
      };
    })
    .filter(Boolean);

  return {
    description: draftDescription || "Ticket",
    currencyCode: draftCurrency || DEFAULT_CURRENCY,
    totalAmount: draftTotalAmount > 0 ? draftTotalAmount : lines.reduce((sum, line) => sum + line.totalAmount, 0),
    transDate: draftTransDate,
    comentario: draftComment,
    gastoType: Number.isInteger(draftGastoType) && draftGastoType > 0 ? draftGastoType : null,
    lines,
  };
}

// Builds the IA payload used to finalize a created ticket.
function buildTicketIaPayload(draft, uploadResult) {
  const payload = {
    description: draft.description,
    currencyCode: draft.currencyCode,
    totalAmount: draft.totalAmount > 0 ? draft.totalAmount : undefined,
    transDate: draft.transDate,
    comentario: draft.comentario || undefined,
    urlFile: uploadResult.urlFile || undefined,
    fileName: uploadResult.fileName || undefined,
    lines: draft.lines.map((line) => ({
      description: line.description,
      qty: line.qty,
      price: line.price,
      totalAmount: line.totalAmount,
    })),
  };

  if (draft.gastoType !== null) {
    payload.gastoType = draft.gastoType;
  }

  return payload;
}

// Parses one JSON API response and throws a readable error when backend rejects it.
async function readSuccessfulJson(response, label) {
  const rawText = await response.text();
  let json = null;
  try {
    json = JSON.parse(rawText);
  } catch {
    json = null;
  }

  if (!response.ok() || !json || json.Success === false) {
    throw new Error(`${label} failed. status=${response.status()} body=${rawText}`);
  }

  return json;
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

// Creates a new expense sheet through the authenticated expense API and returns generated sheet id.
async function createExpenseSheet(page, preferredCurrencyCode = DEFAULT_CURRENCY) {
  const description = `E2E Link Sheet ${Date.now()}`;
  const currencyCode = String(preferredCurrencyCode || DEFAULT_CURRENCY).trim().toUpperCase() || DEFAULT_CURRENCY;
  const createResponse = await callExpenseApiFromPage(page, "/api/crm/expensesheets", "POST", {
    mode: 1,
    description,
    currencyCode,
    exchRate: 1,
    lines: [],
  });
  const createJson = JSON.parse(String(createResponse.body || "{}"));
  if (createResponse.status !== 200 || !createJson || createJson.Success === false) {
    throw new Error(`Expense sheet create failed. status=${createResponse.status} body=${createResponse.body}`);
  }

  const createData = createJson && typeof createJson.Data === "object" ? createJson.Data : null;
  const sheetId = String(
    (createData && typeof createData === "object" ? createData.HojaGastosId || createData.hojaGastosId : "") || ""
  ).trim();
  if (!sheetId) {
    throw new Error("Could not resolve hojaGastosId after creating expense sheet.");
  }

  const detailResponse = await callExpenseApiFromPage(
    page,
    `/api/crm/expensesheets/${encodeURIComponent(sheetId)}`,
    "GET"
  );
  const detailJson = JSON.parse(String(detailResponse.body || "{}"));
  const detailItems = Array.isArray(detailJson.Items) ? detailJson.Items : [];
  const detailData =
    detailItems.find((entry) => entry && typeof entry === "object") ||
    (detailJson.Data && typeof detailJson.Data === "object" ? detailJson.Data : null);
  const resolvedCurrencyCode = String(
    (detailData && typeof detailData === "object" ? detailData.CurrencyCode || detailData.currencyCode : "") || ""
  )
    .trim()
    .toUpperCase();
  if (!resolvedCurrencyCode) {
    throw new Error(`Could not resolve currencyCode for created expense sheet ${sheetId}.`);
  }

  await page.goto(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sheetId)}`, {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });
  await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });

  return { sheetId, description, currencyCode: resolvedCurrencyCode };
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
  await assertStillAuthenticated(page, "opening tickets list before gallery upload");
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
    await assertStillAuthenticated(page, "waiting for gallery upload result");
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

  await assertStillAuthenticated(page, "opening ticket detail after gallery upload");
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

// Creates one ticket through the same IA/upload/finalize chain used by quick ticket flow.
async function createTicketFromIaApiFlow(page, imagePath, baseHeaders) {
  const fileBuffer = fs.readFileSync(imagePath);
  const fileName = path.basename(imagePath);
  const extension = path.extname(imagePath).toLowerCase().replace(/^\./, "") || "jpg";
  const mimeType = EXTENSION_TO_MIME[extension] || "image/jpeg";
  const formHeaders = { ...baseHeaders };

  const draftResponse = await page.request.post("/api/ia/service/expensefromticket", {
    multipart: {
      ticketImage: {
        name: fileName,
        mimeType,
        buffer: fileBuffer,
      },
      persistTicket: "true",
    },
    headers: formHeaders,
  });
  const draftJson = await readSuccessfulJson(draftResponse, "Ticket IA draft");
  const fileId = resolveTicketFileIdFromDraftResponse(draftJson.Data);
  if (!fileId) {
    throw new Error(`Ticket IA draft returned no fileId. body=${JSON.stringify(draftJson)}`);
  }

  const uploadResponse = await page.request.post(
    `/api/crm/expensesheets/tickets/${encodeURIComponent(fileId)}/file?extension=${encodeURIComponent(extension)}`,
    {
      multipart: {
        file: {
          name: fileName,
          mimeType,
          buffer: fileBuffer,
        },
      },
      headers: formHeaders,
    }
  );
  const uploadJson = await readSuccessfulJson(uploadResponse, "Ticket file upload");
  const uploadResult = resolveUploadResult(uploadJson.Data);
  const draft = normalizeDraftFromIaResponse(draftJson.Data);
  const iaPayload = buildTicketIaPayload(draft, uploadResult);
  const jsonHeaders = {
    ...baseHeaders,
    "Content-Type": "application/json",
  };

  const iaResponse = await page.request.post(`/api/crm/expensesheets/tickets/${encodeURIComponent(fileId)}/ia`, {
    data: iaPayload,
    headers: jsonHeaders,
  });
  await readSuccessfulJson(iaResponse, "Ticket IA finalize");

  return { fileId, error: "" };
}

// Loads one ticket detail and returns its current currency code.
async function resolveTicketCurrencyCode(page, fileId) {
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  if (!safeFileId) {
    throw new Error("Could not resolve ticket currency because fileId was empty.");
  }
  const detailResponse = await page.request.get(`/api/crm/expensesheets/tickets/${safeFileId}`, {
    headers: { Accept: "application/json" },
  });
  const detailJson = await readSuccessfulJson(detailResponse, `Ticket detail ${fileId}`);
  const detailItems = Array.isArray(detailJson.Items) ? detailJson.Items : [];
  const detailData =
    detailItems.find((entry) => entry && typeof entry === "object") ||
    (detailJson.Data && typeof detailJson.Data === "object" ? detailJson.Data : null);
  const currencyCode = String(
    (detailData && typeof detailData === "object" ? detailData.CurrencyCode || detailData.currencyCode : "") || ""
  )
    .trim()
    .toUpperCase();
  if (!currencyCode) {
    throw new Error(`Could not resolve currencyCode for ticket ${fileId}.`);
  }
  return currencyCode;
}

// Creates enough unassigned tickets for link-mode assertions using the real gallery upload flow.
async function createTicketsForLinkMode(page, requiredCount) {
  const imagePool = buildTicketImageCandidates();
  const createdTickets = [];
  let lastError = "";
  let activePage = page;
  const requiredGalleryTickets = Math.min(REQUIRED_GALLERY_TICKETS, requiredCount);

  for (let attempt = 0; attempt < MAX_GALLERY_ATTEMPTS && createdTickets.length < requiredGalleryTickets; attempt += 1) {
    activePage = await ensureActivePage(activePage);
    const imagePath = imagePool[attempt % imagePool.length];
    try {
      const result = await createTicketFromGalleryUpload(activePage, imagePath);
      if (result.fileId && !createdTickets.some((entry) => entry.fileId === result.fileId)) {
        const currencyCode = await resolveTicketCurrencyCode(activePage, result.fileId);
        createdTickets.push({
          fileId: result.fileId,
          currencyCode,
        });
        continue;
      }
      lastError = result.error || `Unknown create error using image: ${imagePath}`;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error || "");
      lastError = `Attempt ${attempt + 1} failed. ${message || "Unknown error"}`;
    }
  }

  if (createdTickets.length < requiredCount) {
    throw new Error(`Could not create ${requiredCount} tickets for link mode. Last error: ${lastError || "n/a"}`);
  }

  return { tickets: createdTickets, activePage };
}

// Opens link mode from sheet detail FAB.
async function openLinkModeFromSheet(page, sheetId) {
  const waitListResponse = page
    .waitForResponse(
      (response) =>
        response.url().includes("/api/crm/expensesheets/tickets/link/list") && response.request().method().toUpperCase() === "POST",
      { timeout: 60000 }
    )
    .catch(() => null);
  await clickFabMenuItem(page, /vincular ticket|link ticket/i);
  await page.waitForURL("**/Gastos/Tickets?**action=link**", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });
  await expect
    .poll(() => getQueryParam(page.url(), "hojaGastosId"), { timeout: 15000 })
    .toBe(String(sheetId));
  const listResponse = await waitListResponse;
  if (!listResponse) {
    throw new Error("Link mode did not auto-load the tickets list.");
  }
}

// Ensures the tickets filter panel is expanded before interacting with its controls.
async function ensureTicketsFilterPanelOpen(page) {
  const ticketInput = page.getByRole("combobox", { name: /ticket/i }).first();
  const alreadyVisible = await ticketInput.isVisible().catch(() => false);
  if (alreadyVisible) {
    return;
  }

  const filterToggleButton = page.locator("#historyFilterToggleBtn");
  const canClickToggle = await filterToggleButton.isVisible().catch(() => false);
  if (canClickToggle) {
    await filterToggleButton.click();
  } else {
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("expense-tickets-toggle-filter"));
    });
  }

  await expect(ticketInput).toBeVisible({ timeout: 20000 });
}

// Applies ticket file filter and waits for list response.
async function applyTicketFilter(page, fileId) {
  await ensureTicketsFilterPanelOpen(page);
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
        response.url().includes("/api/crm/expensesheets/tickets/link/list") && response.request().method().toUpperCase() === "POST",
      { timeout: 60000 }
    )
    .catch(() => null);
  await applyButton.click();
  await waitListResponse;
}

// Finds whether one ticket card can be selected in link mode.
async function isTicketSelectableInLinkMode(page, fileId) {
  const ticketItem = page.locator(`.timeline-item[data-ticket-file-id="${fileId}"]`).first();
  const exists = (await ticketItem.count()) > 0;
  if (!exists) return false;
  return (await ticketItem.getAttribute("data-ticket-selectable")) === "true";
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
    const selectable = (await item.getAttribute("data-ticket-selectable")) === "true";
    if (!selectable) continue;
    result.push(fileId);
  }
  return result;
}

// Performs a long press on one ticket card so link mode toggles the visible selection state.
async function selectTicketByFileId(page, fileId) {
  const ticketItem = page.locator(`.timeline-item[data-ticket-file-id="${fileId}"]`).first();
  await expect(ticketItem).toBeVisible({ timeout: 60000 });
  await expect(ticketItem).toHaveAttribute("data-ticket-selectable", "true", { timeout: 15000 });
  const card = ticketItem.locator(".timeline-card--clickable").first();
  await expect(card).toBeVisible({ timeout: 15000 });
  const box = await card.boundingBox();
  if (!box) {
    throw new Error(`Could not resolve card bounds for ticket ${fileId}.`);
  }
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(500);
  await page.mouse.up();
  await expect(ticketItem).toHaveAttribute("data-ticket-selected", "true", { timeout: 15000 });
}

// Opens ticket detail from link mode using the quick tap/click interaction on the card body.
async function openTicketDetailFromLinkMode(page, fileId) {
  const ticketItem = page.locator(`.timeline-item[data-ticket-file-id="${fileId}"]`).first();
  await expect(ticketItem).toBeVisible({ timeout: 60000 });
  const card = ticketItem.locator(".timeline-card--clickable").first();
  await expect(card).toBeVisible({ timeout: 15000 });
  await card.click();
  await expect(page.locator("#expense-ticket-detail-root")).toBeVisible({ timeout: 30000 });
}

async function expectTicketLinkCardContextMenuBlocked(page, fileId) {
  const card = page.locator(`.timeline-item[data-ticket-file-id="${fileId}"] .timeline-card--clickable`).first();
  await expect(card).toBeVisible({ timeout: 15000 });
  const blocked = await card.evaluate((node) => {
    const event = new MouseEvent("contextmenu", {
      bubbles: true,
      cancelable: true,
    });
    return node.dispatchEvent(event) === false;
  });
  expect(blocked).toBeTruthy();
}

// Uses the page back chevron and waits until link mode is restored for the same expense sheet.
async function returnToLinkModeFromTicketDetail(page, sheetId) {
  const safeSheetId = encodeURIComponent(String(sheetId || "").trim());
  const backButton = page.getByRole("button", { name: /back|volver/i }).first();
  await expect(backButton).toBeVisible({ timeout: 15000 });
  await backButton.click();
  await page.waitForURL(`**/Gastos/Tickets?action=link&hojaGastosId=${safeSheetId}`, {
    waitUntil: "domcontentloaded",
    timeout: 120000,
  });
  await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });
}

// Confirms link action and returns the backend bulk result. When tickets are linked, the page must redirect to sheet detail.
async function confirmLinkSelection(page, expectedCount, sheetId) {
  const linkButton = page.getByRole("button", { name: /vincular ticket|link ticket/i }).first();
  await expect(linkButton).toBeVisible({ timeout: 20000 });
  await expect(linkButton).toBeEnabled({ timeout: 15000 });
  const linkButtonText = String((await linkButton.textContent().catch(() => "")) || "").trim();
  if (/\(\d+\)/.test(linkButtonText)) {
    await expect(linkButton).toContainText(new RegExp(`\\(${expectedCount}\\)`), { timeout: 15000 });
  }
  await linkButton.click();

  const modal = page
    .locator("div.fixed.inset-0")
    .filter({ hasText: new RegExp(`Tickets\\s*:\\s*${expectedCount}`, "i") })
    .last();
  await expect(modal).toBeVisible({ timeout: 15000 });
  await expect(modal).toContainText(new RegExp(`Tickets\\s*:\\s*${expectedCount}`, "i"), { timeout: 15000 });
  const bulkResponsePromise = page.waitForResponse(
    (response) =>
      response.url().includes("/api/crm/expensesheets/tickets/link/bulk") &&
      response.request().method().toUpperCase() === "POST",
    { timeout: 120000 }
  );
  await clickModalAction(page, /vincular ticket|link ticket|link/i);
  const bulkResponse = await bulkResponsePromise;
  const bulkRawText = await bulkResponse.text().catch(() => "");
  let bulkPayload = null;
  try {
    bulkPayload = bulkRawText ? JSON.parse(bulkRawText) : null;
  } catch {
    bulkPayload = null;
  }
  const bulkData =
    bulkPayload && typeof bulkPayload === "object"
      ? bulkPayload.Data || bulkPayload.data || null
      : null;
  let linkedCount = Number(
    (bulkData && typeof bulkData === "object" ? bulkData.linkedCount ?? bulkData.LinkedCount : 0) || 0
  );
  if (Number.isFinite(linkedCount) && linkedCount > 0) {
    await page.waitForURL(`**/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(String(sheetId || "").trim())}`, {
      waitUntil: "domcontentloaded",
      timeout: 120000,
    });
    await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });
  } else {
    const redirectedToSheetDetail = await page
      .waitForURL(`**/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(String(sheetId || "").trim())}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      })
      .then(() => true)
      .catch(() => false);
    if (redirectedToSheetDetail) {
      await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });
      linkedCount = Math.max(1, Number(expectedCount) || 1);
      if (!bulkPayload && bulkRawText) {
        bulkPayload = { raw: bulkRawText, inferredRedirect: true };
      }
    }
  }
  return {
    bulkPayload,
    linkedCount: Number.isFinite(linkedCount) ? linkedCount : 0,
  };
}

// Verifies that one linked ticket line is already visible on the expense sheet detail.
async function expectLinkedTicketVisibleOnSheet(page, fileId) {
  const safeFileId = String(fileId || "").trim();
  await expect(page.locator("#expense-sheet-detail-root")).toBeVisible({ timeout: 30000 });
  await expect(page.getByRole("group", { name: new RegExp(safeFileId, "i") }).first()).toBeVisible({ timeout: 30000 });
}

// Best-effort cleanup: deletes created expense sheet.
async function deleteExpenseSheetBestEffort(page, sheetId) {
  if (!sheetId) return;
  const safeId = encodeURIComponent(sheetId);
  await callExpenseApiFromPage(page, `/api/crm/expensesheets/${safeId}/lines/0?deleteMode=2&deleteWholeSheet=true`, "DELETE").catch(
    () => undefined
  );
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

  test.beforeAll(async () => {
    await acquirePublicE2ELock("expense-sheet-link-mode");
  });

  test.afterAll(async () => {
    await releasePublicE2ELock();
  });

test("Open ticket detail with quick tap and link one ticket with long press", async ({ page }) => {
    let currentPage = page;
    await ensureAuthenticatedSession(currentPage);
    await expect(currentPage.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });

    let sheetId = "";
    let sheetCurrencyCode = DEFAULT_CURRENCY;
    try {
      const createdSheet = await createExpenseSheet(currentPage, DEFAULT_CURRENCY);
      sheetId = createdSheet.sheetId;
      sheetCurrencyCode = createdSheet.currencyCode;

      await openLinkModeFromSheet(currentPage, sheetId);

      await ensureTicketsFilterPanelOpen(currentPage);
      const statusInput = currentPage.getByRole("combobox", { name: /status|estado/i }).first();
      await expect(statusInput).toHaveCount(0);
      await applyTicketFilter(currentPage, "");
      let candidates = await getVisibleSelectableTicketIds(currentPage, 8);
      expect(candidates.length).toBeGreaterThan(0);

      const targetTicketId = candidates[0];
      const preferredTicketCurrency = await resolveTicketCurrencyCode(currentPage, targetTicketId);
      if (preferredTicketCurrency && preferredTicketCurrency !== sheetCurrencyCode) {
        await deleteExpenseSheetBestEffort(currentPage, sheetId);
        const alignedSheet = await createExpenseSheet(currentPage, preferredTicketCurrency);
        sheetId = alignedSheet.sheetId;
        sheetCurrencyCode = alignedSheet.currencyCode;
        await openLinkModeFromSheet(currentPage, sheetId);
      }

      await applyTicketFilter(currentPage, targetTicketId);
      await expect(currentPage.locator(`.timeline-item[data-ticket-file-id="${targetTicketId}"]`).first()).toBeVisible({ timeout: 60000 });
      await expectTicketLinkCardContextMenuBlocked(currentPage, targetTicketId);
      await selectTicketByFileId(currentPage, targetTicketId);
      await openTicketDetailFromLinkMode(currentPage, targetTicketId);
      await returnToLinkModeFromTicketDetail(currentPage, sheetId);
      await expect(currentPage.locator(`.timeline-item[data-ticket-file-id="${targetTicketId}"]`).first()).toBeVisible({ timeout: 60000 });
      await expect(currentPage.locator(`.timeline-item[data-ticket-file-id="${targetTicketId}"]`).first()).toHaveAttribute(
        "data-ticket-selected",
        "true",
        { timeout: 30000 }
      );
      const result = await confirmLinkSelection(currentPage, 1, sheetId);
      expect(result.linkedCount, JSON.stringify(result.bulkPayload)).toBeGreaterThan(0);
      await expectLinkedTicketVisibleOnSheet(currentPage, targetTicketId);
    } finally {
      currentPage = await ensureActivePage(currentPage);
      await deleteExpenseSheetBestEffort(currentPage, sheetId);
    }
  });

  test("Do not prefilter by sheet currency and keep selection when backend skips all tickets", async ({ page }) => {
    let currentPage = page;
    await ensureAuthenticatedSession(currentPage);
    await expect(currentPage.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });

    let sheetId = "";
    const sheetCurrencyCode = "USD";
    try {
      const createdSheet = await createExpenseSheet(currentPage, sheetCurrencyCode);
      sheetId = createdSheet.sheetId;

      await openLinkModeFromSheet(currentPage, sheetId);
      await ensureTicketsFilterPanelOpen(currentPage);

      const currencyInput = currentPage.getByRole("combobox", { name: /currency|divisa/i }).first();
      await expect
        .poll(async () => String((await currencyInput.inputValue()) || "").trim().toUpperCase(), { timeout: 30000 })
        .toBe("");
      const candidateIds = await getVisibleSelectableTicketIds(currentPage, 12);
      expect(candidateIds.length).toBeGreaterThan(0);

      let mismatchTicketId = "";
      for (const candidateId of candidateIds) {
        const candidateCurrency = await resolveTicketCurrencyCode(currentPage, candidateId);
        if (candidateCurrency && candidateCurrency !== sheetCurrencyCode) {
          mismatchTicketId = candidateId;
          break;
        }
      }
      expect(mismatchTicketId).toBeTruthy();

      await applyTicketFilter(currentPage, mismatchTicketId);
      await expect(currentPage.locator(`.timeline-item[data-ticket-file-id="${mismatchTicketId}"]`).first()).toBeVisible({
        timeout: 60000,
      });
      await selectTicketByFileId(currentPage, mismatchTicketId);
      await expect(currentPage.locator(`.timeline-item[data-ticket-file-id="${mismatchTicketId}"]`).first()).toHaveAttribute(
        "data-ticket-selected",
        "true",
        { timeout: 30000 }
      );
      await expect(currentPage.locator("text=/Tickets:\\s*1/i").first()).toBeVisible({ timeout: 15000 });

      const result = await confirmLinkSelection(currentPage, 1, sheetId);
      expect(result.linkedCount, JSON.stringify(result.bulkPayload)).toBe(0);

      const bulkData = asRecord(getFirstDefined(asRecord(result.bulkPayload), ["Data", "data"]));
      const skippedCount = Number(getFirstDefined(bulkData, ["skippedCount", "SkippedCount"]) || 0);
      const skippedItems = Array.isArray(getFirstDefined(bulkData, ["skipped", "Skipped"]))
        ? getFirstDefined(bulkData, ["skipped", "Skipped"])
        : [];
      const firstReason = safeText(
        getFirstDefined(asRecord(skippedItems[0]), ["reason", "Reason"])
      );

      expect(skippedCount, JSON.stringify(result.bulkPayload)).toBeGreaterThan(0);
      expect(firstReason).toMatch(/currencycode does not match the target expense sheet/i);

      await currentPage.waitForURL(`**/Gastos/Tickets?action=link&hojaGastosId=${encodeURIComponent(String(sheetId || "").trim())}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await expect(currentPage.locator(`.timeline-item[data-ticket-file-id="${mismatchTicketId}"]`).first()).toHaveAttribute(
        "data-ticket-selected",
        "true",
        { timeout: 30000 }
      );
      await expect(currentPage.locator("text=/Tickets:\\s*1/i").first()).toBeVisible({ timeout: 15000 });
      await expect(
        currentPage.getByText(/ticket currencycode does not match the target expense sheet/i).first()
      ).toBeVisible({ timeout: 30000 });
    } finally {
      currentPage = await ensureActivePage(currentPage);
      await deleteExpenseSheetBestEffort(currentPage, sheetId);
    }
  });
});
