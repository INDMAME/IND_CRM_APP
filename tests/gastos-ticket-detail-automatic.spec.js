// Playwright E2E: ticket detail and line detail flows against public URL.
const { test, expect } = require("./e2e-devtools-mobile.fixture");

// Ensures an authenticated session exists before accessing protected pages.
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

// Reads query string values from URL.
function getQueryParam(url, key) {
  try {
    const parsed = new URL(url);
    return String(parsed.searchParams.get(key) || "").trim();
  } catch {
    return "";
  }
}

// Builds compact DDMMYYYY date to verify backward-compatible request support.
function buildCompactApiDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = String(now.getFullYear());
  return `${day}${month}${year}`;
}

// Extracts ticket file id from flexible API response payload shapes.
function resolveFileIdFromCreateResponse(payload) {
  const data = payload && typeof payload === "object" ? payload.Data || payload.data || null : null;
  const direct = String((data && (data.FileId || data.fileId)) || "").trim();
  if (direct) return direct;

  const nestedTicketCreation = data && typeof data === "object" ? data.TicketCreation || data.ticketCreation : null;
  const nested = String((nestedTicketCreation && (nestedTicketCreation.FileId || nestedTicketCreation.fileId)) || "").trim();
  if (nested) return nested;

  return "";
}

// Reads the same runtime auth headers used by the browser expense client.
async function readExpenseApiRequestHeaders(page, includeJson = false) {
  const runtime = await page.evaluate(() => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    return {
      csrfToken: String(meta?.getAttribute("content") || "").trim(),
      companyId: String(window.__IND_SELECTED_COMPANY__ || "").trim(),
      token: String(window.__IND_API_TOKEN__ || "").trim(),
      currentAxUserId: String(window.__IND_CURRENT_AX_USER_ID__ || "").trim(),
    };
  });

  const headers = {
    Accept: "application/json",
  };

  if (runtime.csrfToken) {
    headers.RequestVerificationToken = runtime.csrfToken;
  }

  if (runtime.companyId) {
    headers["X-IND-Company"] = runtime.companyId;
  }

  if (runtime.currentAxUserId) {
    headers["X-IND-AxUserId"] = runtime.currentAxUserId;
  }

  if (runtime.token) {
    headers.Authorization = `Bearer ${runtime.token}`;
  }

  if (includeJson) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}

// Calls one expense API endpoint from the authenticated browser page.
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

// Creates one temporary ticket with one line for deterministic E2E assertions.
async function createTemporaryTicket(page) {
  const stamp = Date.now();
  const payload = {
    mode: 0,
    description: `E2E Ticket ${stamp}`,
    currencyCode: "EUR",
    gastoType: 5,
    totalAmount: 20,
    transDate: buildCompactApiDate(),
    comentario: "E2E temporary ticket",
    urlFile: `pending://ticket-upload/e2e-${stamp}`,
    fileExtension: "jpg",
    lines: [
      {
        description: `E2E Line ${stamp}`,
        qty: 1,
        price: 20,
        totalAmount: 20,
      },
    ],
  };

  const createResponse = await callExpenseApiFromPage(page, "/api/crm/expensesheets/tickets", "POST", payload);
  const rawText = String(createResponse.body || "");
  let json = null;
  try {
    json = JSON.parse(rawText);
  } catch {
    json = null;
  }

  if (createResponse.status < 200 || createResponse.status >= 300 || !json || json.Success === false) {
    throw new Error(`Ticket create failed. status=${createResponse.status} body=${rawText}`);
  }

  const fileId = resolveFileIdFromCreateResponse(json);
  if (!fileId) {
    throw new Error(`Ticket create succeeded but FileId was not found. body=${rawText}`);
  }

  return fileId;
}

// Deletes the temporary ticket created for E2E run.
async function deleteTemporaryTicket(page, fileId) {
  const safeFileId = encodeURIComponent(String(fileId || "").trim());
  if (!safeFileId) return;
  await callExpenseApiFromPage(page, `/api/crm/expensesheets/tickets/${safeFileId}`, "DELETE").catch(() => undefined);
}

// Opens ticket detail from tickets list using deterministic ticketFileId filter.
async function openTicketDetailFromList(page, fileId) {
  await page.goto(`/Gastos/Tickets?ticketFileId=${encodeURIComponent(fileId)}`, {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("#expense-tickets-root")).toBeVisible({ timeout: 30000 });

  const ticketItem = page.locator(`.timeline-item[data-ticket-file-id="${fileId}"]`).first();
  await expect(ticketItem).toBeVisible({ timeout: 60000 });
  await ticketItem.locator(".timeline-card--clickable").first().click();

  await page.waitForURL("**/Gastos/TicketDetail**", {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await expect(page.locator("#expense-ticket-detail-root")).toBeVisible({ timeout: 30000 });
}

// Confirms save in the app confirm modal.
async function confirmSaveInModal(page) {
  const saveButton = page
    .locator("div.fixed.inset-0 button")
    .filter({ hasText: /save|guardar/i })
    .first();
  await expect(saveButton).toBeVisible({ timeout: 15000 });
  await saveButton.click();
}

// Confirms delete in the app confirm modal.
async function confirmDeleteInModal(page) {
  const deleteButton = page
    .locator("div.fixed.inset-0 button")
    .filter({ hasText: /delete|eliminar/i })
    .first();
  await expect(deleteButton).toBeVisible({ timeout: 15000 });
  await deleteButton.click();
}

// Builds a minimal sheet detail payload that links one expense line to a ticket file.
function buildLinkedSheetDetailPayload(sheetId, fileId, lineRecId) {
  return {
    Success: true,
    Message: "OK",
    Total: 1,
    Page: 1,
    PageSize: 1,
    Items: [
      {
        HojaGastosId: sheetId,
        UserId: "E2E",
        Description: "E2E linked sheet",
        ExpenseSheetStatus: 0,
        EstadoComentarios: "",
        CurrencyCode: "EUR",
        TotalAmount: 10,
        ExchRate: 1,
        ExchangeRateMode: 0,
        ProjId: "",
        Voucher: "",
        CreatedDate: "13.03.2026",
        Lines: [
          {
            RecId: String(lineRecId),
            TransDate: "13.03.2026",
            TypeValue: 5,
            Description: "E2E linked line",
            Internacional: false,
            FileId: fileId,
            Ticket: true,
            Price: 10,
            Qty: 1,
            Amount: 10,
            ProjId: "",
            IndAttachFiles: "",
          },
        ],
      },
    ],
    TraceId: "trace-sheet-detail-delete-e2e",
  };
}

test.describe("Ticket detail E2E", () => {
  test("Ticket detail loads from public URL and sends header update payload", async ({ page }) => {
    await ensureAuthenticatedSession(page);
    const fileId = await createTemporaryTicket(page);

    try {
      await openTicketDetailFromList(page, fileId);
      await expect(page.locator("#expense-ticket-detail-root input").first()).toBeVisible();

      let capturedHeaderPayload = null;
      const safeFileId = encodeURIComponent(fileId);
      const headerRoutePattern = `**/api/crm/expensesheets/tickets/${safeFileId}`;
      await page.route(headerRoutePattern, async (route) => {
        if (route.request().method().toUpperCase() !== "PUT") {
          await route.continue();
          return;
        }

        try {
          capturedHeaderPayload = JSON.parse(route.request().postData() || "{}");
        } catch {
          capturedHeaderPayload = {};
        }

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            Success: true,
            Message: "Updated",
            Data: { FileId: fileId },
            Errors: [],
            TraceId: "trace-ticket-header-e2e",
          }),
        });
      });

      const nextDescription = `E2E Ticket Header ${Date.now()}`;
      const editButton = page.locator("#expenseTicketEditBtn");
      await expect(editButton).toBeVisible({ timeout: 15000 });
      await editButton.click();

      const descriptionInput = page.getByLabel(/description|descripci[o\u00f3]n/i).first();
      await expect(descriptionInput).toBeVisible({ timeout: 15000 });
      await descriptionInput.fill(nextDescription);

      await editButton.click();
      await confirmSaveInModal(page);

      await expect
        .poll(() => capturedHeaderPayload, { timeout: 30000 })
        .not.toBeNull();

      expect(String(capturedHeaderPayload.description || "")).toContain("E2E Ticket Header");
      expect(String(capturedHeaderPayload.currencyCode || "")).not.toBe("");
      if (capturedHeaderPayload.transDate !== undefined && capturedHeaderPayload.transDate !== null) {
        expect(String(capturedHeaderPayload.transDate || "")).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
      }

      await page.unroute(headerRoutePattern);
    } finally {
      await deleteTemporaryTicket(page, fileId);
    }
  });

  test("Ticket line detail loads from public URL and sends line update payload", async ({ page }) => {
    await ensureAuthenticatedSession(page);
    const fileId = await createTemporaryTicket(page);

    try {
      await openTicketDetailFromList(page, fileId);

      const firstLineCard = page.locator("#expense-ticket-detail-root .timeline-card--clickable").first();
      await expect(firstLineCard).toBeVisible({ timeout: 30000 });
      await firstLineCard.click();

      await page.waitForURL("**/Gastos/TicketLineDetail**", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      await expect(page.locator("#expense-ticket-line-detail-root")).toBeVisible({ timeout: 30000 });

      const lineRecId = getQueryParam(page.url(), "lineRecId");
      if (!lineRecId) {
        throw new Error("Could not resolve ticket lineRecId from URL.");
      }

      let capturedLinePayload = null;
      const safeFileId = encodeURIComponent(fileId);
      const safeLineId = encodeURIComponent(lineRecId);
      const lineRoutePattern = `**/api/crm/expensesheets/tickets/${safeFileId}/lines/${safeLineId}`;
      await page.route(lineRoutePattern, async (route) => {
        if (route.request().method().toUpperCase() !== "PUT") {
          await route.continue();
          return;
        }

        try {
          capturedLinePayload = JSON.parse(route.request().postData() || "{}");
        } catch {
          capturedLinePayload = {};
        }

        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            Success: true,
            Message: "Updated",
            Data: { FileId: fileId, LineRecId: Number(lineRecId) || 0 },
            Errors: [],
            TraceId: "trace-ticket-line-e2e",
          }),
        });
      });

      const nextLineDescription = `E2E Line ${Date.now()}`;
      const editButton = page.locator("#expenseTicketLineEditBtn");
      await expect(editButton).toBeVisible({ timeout: 15000 });
      await editButton.click();

      const descriptionInput = page.getByLabel(/description|descripci[o\u00f3]n/i).first();
      const qtyInput = page.getByLabel(/quantity|cantidad/i).first();
      const priceInput = page.getByLabel(/price|precio/i).first();
      const isEditable = await descriptionInput.isVisible().catch(() => false);
      if (!isEditable) {
        await expect(page.getByText(/description|descripci[o\u00f3]n/i).first()).toBeVisible({ timeout: 15000 });
        await page.unroute(lineRoutePattern);
        return;
      }

      await expect(qtyInput).toBeVisible({ timeout: 15000 });
      await expect(priceInput).toBeVisible({ timeout: 15000 });

      await descriptionInput.fill(nextLineDescription);
      await qtyInput.fill("2");
      await priceInput.fill("8.5");

      await editButton.click();
      await confirmSaveInModal(page);

      await expect
        .poll(() => capturedLinePayload, { timeout: 30000 })
        .not.toBeNull();

      expect(String(capturedLinePayload.description || "")).toContain("E2E Line");
      if (capturedLinePayload.transDate !== undefined && capturedLinePayload.transDate !== null) {
        expect(String(capturedLinePayload.transDate || "")).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
      }
      expect(Number(capturedLinePayload.qty)).toBe(2);
      expect(Number(capturedLinePayload.price)).toBe(8.5);
      expect(Number(capturedLinePayload.totalAmount)).toBe(17);

      await page.unroute(lineRoutePattern);
    } finally {
      await deleteTemporaryTicket(page, fileId);
    }
  });

  test("Ticket detail delete resolves linked expense line when opened from sheet-create context", async ({ page }) => {
    await ensureAuthenticatedSession(page);
    const fileId = await createTemporaryTicket(page);
    const fakeSheetId = `E2E-SHEET-${Date.now()}`;
    const fakeLineRecId = "123456";
    const safeFileId = encodeURIComponent(fileId);
    const safeSheetId = encodeURIComponent(fakeSheetId);
    const ticketDeletePattern = `**/api/crm/expensesheets/tickets/${safeFileId}`;
    const ticketFileDeletePattern = `**/api/crm/expensesheets/tickets/${safeFileId}/file**`;
    const sheetDetailPattern = `**/api/crm/expensesheets/${safeSheetId}`;
    const lineDeletePattern = `**/api/crm/expensesheets/${safeSheetId}/lines/${fakeLineRecId}**`;

    let ticketDeleted = false;
    let ticketFileDeleted = false;
    let linkedLineDeleted = false;
    let linkedSheetLoaded = false;

    try {
      await page.goto(`/Gastos/TicketDetail?fileId=${encodeURIComponent(fileId)}&origin=sheet-create&sheetId=${safeSheetId}`, {
        waitUntil: "domcontentloaded",
      });
      await expect(page.locator("#expense-ticket-detail-root")).toBeVisible({ timeout: 30000 });

      await page.route(sheetDetailPattern, async (route) => {
        linkedSheetLoaded = true;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(buildLinkedSheetDetailPayload(fakeSheetId, fileId, fakeLineRecId)),
        });
      });

      await page.route(ticketFileDeletePattern, async (route) => {
        if (route.request().method().toUpperCase() !== "DELETE") {
          await route.continue();
          return;
        }

        ticketFileDeleted = true;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            Success: true,
            Message: "Deleted",
            Data: null,
            Errors: [],
            TraceId: "trace-ticket-file-delete-e2e",
          }),
        });
      });

      await page.route(ticketDeletePattern, async (route) => {
        if (route.request().method().toUpperCase() !== "DELETE") {
          await route.continue();
          return;
        }

        ticketDeleted = true;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            Success: true,
            Message: "Deleted",
            Data: null,
            Errors: [],
            TraceId: "trace-ticket-delete-e2e",
          }),
        });
      });

      await page.route(lineDeletePattern, async (route) => {
        if (route.request().method().toUpperCase() !== "DELETE") {
          await route.continue();
          return;
        }

        linkedLineDeleted = true;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            Success: true,
            Message: "Deleted",
            Data: null,
            Errors: [],
            TraceId: "trace-sheet-line-delete-e2e",
          }),
        });
      });

      const deleteButton = page.locator("#expenseTicketDeleteBtn");
      await expect(deleteButton).toBeVisible({ timeout: 15000 });
      await deleteButton.click();
      await confirmDeleteInModal(page);

      await expect.poll(() => ticketFileDeleted, { timeout: 30000 }).toBe(true);
      await expect.poll(() => ticketDeleted, { timeout: 30000 }).toBe(true);
      await expect.poll(() => linkedSheetLoaded, { timeout: 30000 }).toBe(true);
      await expect.poll(() => linkedLineDeleted, { timeout: 30000 }).toBe(true);
      await page.waitForURL(`**/Gastos/ExpenseSheetDetail?hojaGastosId=${safeSheetId}`, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      await page.unroute(lineDeletePattern);
      await page.unroute(ticketDeletePattern);
      await page.unroute(ticketFileDeletePattern);
      await page.unroute(sheetDetailPattern);
    } finally {
      await deleteTemporaryTicket(page, fileId);
    }
  });

  test("Ticket detail can delete immediately after opening from tickets list", async ({ page }) => {
    await ensureAuthenticatedSession(page);
    const fileId = await createTemporaryTicket(page);
    const safeFileId = encodeURIComponent(fileId);
    const ticketDeletePattern = `**/api/crm/expensesheets/tickets/${safeFileId}`;
    const ticketFileDeletePattern = `**/api/crm/expensesheets/tickets/${safeFileId}/file**`;
    let ticketDeleted = false;
    let ticketFileDeleted = false;

    try {
      await openTicketDetailFromList(page, fileId);

      await page.route(ticketFileDeletePattern, async (route) => {
        if (route.request().method().toUpperCase() !== "DELETE") {
          await route.continue();
          return;
        }

        ticketFileDeleted = true;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            Success: true,
            Message: "Deleted",
            Data: null,
            Errors: [],
            TraceId: "trace-ticket-file-delete-immediate-e2e",
          }),
        });
      });

      await page.route(ticketDeletePattern, async (route) => {
        if (route.request().method().toUpperCase() !== "DELETE") {
          await route.continue();
          return;
        }

        ticketDeleted = true;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            Success: true,
            Message: "Deleted",
            Data: null,
            Errors: [],
            TraceId: "trace-ticket-delete-immediate-e2e",
          }),
        });
      });

      const deleteButton = page.locator("#expenseTicketDeleteBtn");
      await expect(deleteButton).toBeVisible({ timeout: 15000 });
      await deleteButton.click();
      await confirmDeleteInModal(page);

      await expect.poll(() => ticketFileDeleted, { timeout: 30000 }).toBe(true);
      await expect.poll(() => ticketDeleted, { timeout: 30000 }).toBe(true);
      await page.waitForURL("**/Gastos/Tickets**", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      await page.unroute(ticketDeletePattern);
      await page.unroute(ticketFileDeletePattern);
    } finally {
      await deleteTemporaryTicket(page, fileId);
    }
  });
});
