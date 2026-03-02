// Playwright E2E: validate ticket detail and ticket line detail edit flows with local fixtures.
const path = require("node:path");
const fs = require("node:fs");
const http = require("node:http");
const { test, expect } = require("@playwright/test");

const ticketFileId = "TCK-001";
const ticketLineId = "1001";
const repoRoot = path.resolve(__dirname, "..");
let staticServer;
let staticServerPort = 0;

const mockTicketState = {
  FileId: ticketFileId,
  Description: "Ticket restaurante demo",
  Status: 0,
  HojaGastosIdDisplay: "HG-55",
  ProcessedByAI: false,
  CurrencyCode: "EUR",
  TotalAmount: 32.5,
  CreatedByUserId: "USR001",
  TransDate: "2026-03-02",
  Comentario: "Comentario demo",
  UrlFile: "https://files.insertec.test/tickets/TCK-001.jpg",
  FileName: "TCK-001.jpg",
  GastoType: 5,
  Lines: [
    {
      RecId: ticketLineId,
      Description: "Menu ejecutivo",
      Qty: 1,
      Price: 20,
      TotalAmount: 20,
      RefRecIdTable: "561234",
      CreatedByUserId: "USR001",
    },
    {
      RecId: "1002",
      Description: "Bebida",
      Qty: 1,
      Price: 12.5,
      TotalAmount: 12.5,
      RefRecIdTable: "561234",
      CreatedByUserId: "USR001",
    },
  ],
};

// Installs in-browser fetch mocks aligned with ticket endpoints.
async function installFetchMocks(page) {
  await page.addInitScript(
    ({ seedState }) => {
      const ticketState = JSON.parse(JSON.stringify(seedState));

      const jsonResponse = (payload, status = 200) => {
        return new Response(JSON.stringify(payload), {
          status,
          headers: {
            "Content-Type": "application/json",
          },
        });
      };

      window.fetch = async (input, init = {}) => {
        const url = typeof input === "string" ? input : String(input?.url || "");
        const method = String(init?.method || input?.method || "GET").toUpperCase();

        if (url.includes(`/api/crm/expensesheets/tickets/${ticketState.FileId}/lines/${ticketState.Lines[0].RecId}`) && method === "PUT") {
          const payload = JSON.parse(String(init.body || "{}"));
          const line = ticketState.Lines.find((entry) => String(entry.RecId) === String(ticketState.Lines[0].RecId));
          if (line) {
            line.Description = payload.description;
            line.Qty = payload.qty;
            line.Price = payload.price;
            line.TotalAmount = payload.totalAmount;
          }
          ticketState.TotalAmount = ticketState.Lines.reduce((sum, entry) => sum + Number(entry.TotalAmount || 0), 0);
          localStorage.setItem("__LINE_UPDATE_PAYLOAD__", JSON.stringify(payload));

          return jsonResponse({
            Success: true,
            Message: "Updated",
            Data: {
              FileId: ticketState.FileId,
              LineRecId: Number(ticketState.Lines[0].RecId),
            },
            Errors: [],
            TraceId: "trace-ticket-line-update",
          });
        }

        if (url.includes(`/api/crm/expensesheets/tickets/${ticketState.FileId}`) && method === "GET") {
          return jsonResponse({
            Success: true,
            Message: "OK",
            Total: 1,
            Page: 1,
            PageSize: 1,
            Items: [ticketState],
            TraceId: "trace-ticket-detail",
          });
        }

        if (url.includes(`/api/crm/expensesheets/tickets/${ticketState.FileId}`) && method === "PUT") {
          const payload = JSON.parse(String(init.body || "{}"));
          ticketState.Description = payload.description;
          ticketState.CurrencyCode = payload.currencyCode;
          ticketState.TotalAmount = payload.totalAmount;
          ticketState.Status = payload.status;
          ticketState.TransDate = payload.transDate;
          ticketState.Comentario = payload.comentario;
          ticketState.UrlFile = payload.urlFile;
          ticketState.FileName = payload.fileName;
          ticketState.ProcessedByAI = payload.processedByAI;
          ticketState.GastoType = payload.gastoType;
          localStorage.setItem("__HEADER_UPDATE_PAYLOAD__", JSON.stringify(payload));

          return jsonResponse({
            Success: true,
            Message: "Updated",
            Data: {
              FileId: ticketState.FileId,
            },
            Errors: [],
            TraceId: "trace-ticket-update",
          });
        }

        if (url.includes(`/api/crm/expensesheets/tickets/${ticketState.FileId}`) && method === "DELETE") {
          return jsonResponse({
            Success: true,
            Message: "Deleted",
            Data: null,
            Errors: [],
            TraceId: "trace-ticket-delete",
          });
        }

        return jsonResponse({
          Success: false,
          Message: `Unhandled mock route: ${method} ${url}`,
          Data: null,
          Errors: [],
          TraceId: "trace-unhandled",
        }, 404);
      };
    },
    { seedState: mockTicketState }
  );
}

function fixtureUrl(relativePath) {
  return `http://127.0.0.1:${staticServerPort}/tests/${relativePath}`;
}

test.describe("Ticket detail fixtures", () => {
  test.beforeAll(async () => {
    staticServer = http.createServer((req, res) => {
      const reqUrl = new URL(req.url || "/", "http://127.0.0.1");
      const requestedPath = decodeURIComponent(reqUrl.pathname);
      const safePath =
        requestedPath === "/"
          ? "tests/fixtures/expense-ticket-detail.fixture.html"
          : requestedPath.replace(/^\/+/, "");
      const absolutePath = path.join(repoRoot, safePath);
      const normalizedRoot = path.normalize(repoRoot + path.sep);
      const normalizedAbsolute = path.normalize(absolutePath);

      if (!normalizedAbsolute.startsWith(normalizedRoot)) {
        res.statusCode = 403;
        res.end("Forbidden");
        return;
      }

      if (!fs.existsSync(normalizedAbsolute) || fs.statSync(normalizedAbsolute).isDirectory()) {
        res.statusCode = 404;
        res.end("Not found");
        return;
      }

      const ext = path.extname(normalizedAbsolute).toLowerCase();
      const contentTypeByExt = {
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".mjs": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".json": "application/json; charset=utf-8",
        ".svg": "image/svg+xml",
      };
      res.setHeader("Content-Type", contentTypeByExt[ext] || "application/octet-stream");
      res.end(fs.readFileSync(normalizedAbsolute));
    });

    await new Promise((resolve) => {
      staticServer.listen(0, "127.0.0.1", () => {
        staticServerPort = staticServer.address().port;
        resolve();
      });
    });
  });

  test.afterAll(async () => {
    if (!staticServer) return;
    await new Promise((resolve) => {
      staticServer.close(() => resolve());
    });
  });

  test("Ticket detail renders full fields and sends header update payload", async ({ page }) => {
    await installFetchMocks(page);

    await page.goto(fixtureUrl("fixtures/expense-ticket-detail.fixture.html"), {
      waitUntil: "domcontentloaded",
    });

    await expect(page.locator("#expense-ticket-detail-root")).toBeVisible();
    await expect(page.locator('input[value=\"Ticket restaurante demo\"]').first()).toBeVisible();
    await expect(page.locator('input[value=\"HG-55\"]').first()).toBeVisible();
    await expect(page.locator('input[value=\"USR001\"]').first()).toBeVisible();
    await expect(page.locator('input[value=\"https://files.insertec.test/tickets/TCK-001.jpg\"]').first()).toBeVisible();
    await expect(page.getByText(/Sheet:\s*561234/i).first()).toBeVisible();

    await page.locator("#expenseTicketEditBtn").click();

    await page.getByLabel(/Description/i).first().fill("Ticket actualizado E2E");
    await page.getByLabel(/Total amount/i).first().fill("37.50");
    await page.getByLabel(/Comments/i).first().fill("Comentario update E2E");
    await page.getByLabel(/Link/i).first().fill("https://files.insertec.test/tickets/TCK-001-updated.jpg");

    await page.locator("#expenseTicketEditBtn").click();
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("div.fixed.inset-0 button"));
      const saveButton = buttons.find((button) => /save/i.test(String(button.textContent || "")));
      if (!saveButton) {
        throw new Error("Save confirmation button was not found.");
      }
      saveButton.click();
    });

    let headerPayloadRaw = null;
    await expect
      .poll(async () => {
        headerPayloadRaw = await page.evaluate(() => localStorage.getItem("__HEADER_UPDATE_PAYLOAD__"));
        return headerPayloadRaw;
      }, { timeout: 15000 })
      .not.toBeNull();

    const headerPayload = JSON.parse(headerPayloadRaw);
    expect(headerPayload.description).toBe("Ticket actualizado E2E");
    expect(Number(headerPayload.totalAmount)).toBe(37.5);
    expect(headerPayload.comentario).toBe("Comentario update E2E");
    expect(headerPayload.urlFile).toBe("https://files.insertec.test/tickets/TCK-001-updated.jpg");
  });

  test("Ticket line detail renders all fields and sends line update payload", async ({ page }) => {
    await installFetchMocks(page);

    await page.goto(fixtureUrl("fixtures/expense-ticket-line-detail.fixture.html"), {
      waitUntil: "domcontentloaded",
    });

    await expect(page.locator("#expense-ticket-line-detail-root")).toBeVisible();
    await expect(page.locator('input[value=\"Menu ejecutivo\"]').first()).toBeVisible();
    await expect(page.locator('input[value=\"561234\"]').first()).toBeVisible();
    await expect(page.locator('input[value=\"USR001\"]').first()).toBeVisible();

    await page.locator("#expenseTicketLineEditBtn").click();

    await page.getByLabel(/Description/i).first().fill("Linea editada E2E");
    await page.getByLabel(/Quantity/i).first().fill("2");
    await page.getByLabel(/Price/i).first().fill("8.5");

    await page.locator("#expenseTicketLineEditBtn").click();
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("div.fixed.inset-0 button"));
      const saveButton = buttons.find((button) => /save/i.test(String(button.textContent || "")));
      if (!saveButton) {
        throw new Error("Save confirmation button was not found.");
      }
      saveButton.click();
    });

    let linePayloadRaw = null;
    await expect
      .poll(async () => {
        linePayloadRaw = await page.evaluate(() => localStorage.getItem("__LINE_UPDATE_PAYLOAD__"));
        return linePayloadRaw;
      }, { timeout: 15000 })
      .not.toBeNull();

    const linePayload = JSON.parse(linePayloadRaw);
    expect(linePayload.description).toBe("Linea editada E2E");
    expect(Number(linePayload.qty)).toBe(2);
    expect(Number(linePayload.price)).toBe(8.5);
    expect(Number(linePayload.totalAmount)).toBe(17);
  });
});
