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

  const createResponse = await page.request.post("/api/crm/expensesheets/tickets", {
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  const rawText = await createResponse.text();
  let json = null;
  try {
    json = JSON.parse(rawText);
  } catch {
    json = null;
  }

  if (!createResponse.ok() || !json || json.Success === false) {
    throw new Error(`Ticket create failed. status=${createResponse.status()} body=${rawText}`);
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
  await page.request.delete(`/api/crm/expensesheets/tickets/${safeFileId}`).catch(() => undefined);
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
});
