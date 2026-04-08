// Playwright E2E: smoke battery for the public expense-sheet assistant endpoint.
const { test, expect } = require("./e2e-devtools-mobile.fixture");
const { acquirePublicE2ELock, releasePublicE2ELock } = require("./public-env-lock");

test.setTimeout(420000);

const RAW_FIELD_RULE =
  "No raw keys/JSON. HojaGastosId=hoja; ExpenseSheetStatus=estado; EstadoComentarios=comentarios; UserId=usuario; UserName=nombre; ProjId=proyecto; CurrencyCode=moneda; TotalAmount=importe; ExchRate=tipo cambio; CreatedDate=fecha.";

function buildAnswerInstructions(requestedVisualizationType) {
  const baseRules = ["messages[] JSON.", "Spanish, keep accents.", RAW_FIELD_RULE];

  if (requestedVisualizationType === "table") {
    baseRules.push("Valid: md+table. Never pipe/ascii tables. Else: md.");
  } else if (requestedVisualizationType === "pie") {
    baseRules.push("Valid: md+chart pie. Never raw JSON. Else: md.");
  } else {
    baseRules.push(`Valid: md+chart ${requestedVisualizationType}. Never raw JSON. Else: md.`);
  }

  return baseRules.join(" ");
}

function formatIsoDate(date) {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function stripJsonFence(value) {
  const source = String(value || "").trim();
  const fencedMatch = source.match(/^```(?:json)?\s*([\s\S]+?)\s*```$/i);
  return fencedMatch?.[1]?.trim() || source;
}

function parseStructuredAnswer(answer) {
  const candidate = stripJsonFence(answer);
  if (!candidate) {
    return null;
  }

  try {
    return JSON.parse(candidate);
  } catch {
    return null;
  }
}

function hasRequestedVisualizationMessage(messages, chartType) {
  const source = Array.isArray(messages) ? messages : [];
  if (chartType === "table") {
    return source.some((message) => message?.type === "table");
  }

  return source.some(
    (message) => message?.type === "chart" && String(message?.payload?.chartType || "").trim().toLowerCase() === chartType
  );
}

async function ensureAuthenticatedSession(page) {
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

async function browserFetchJson(page, url, payload) {
  return await page.evaluate(
    async ({ requestUrl, requestPayload }) => {
      const response = await fetch(requestUrl, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestPayload),
      });

      const raw = await response.text();
      let json = null;
      try {
        json = JSON.parse(raw);
      } catch {
        json = null;
      }

      return {
        ok: response.ok,
        status: response.status,
        retryAfter: response.headers.get("Retry-After") || "",
        raw,
        json,
      };
    },
    {
      requestUrl: url,
      requestPayload: payload,
    }
  );
}

async function loadAssistantSourceJson(page) {
  const today = new Date();
  const fromDate = new Date(today);
  fromDate.setDate(fromDate.getDate() - 90);

  const listPayload = {
    filter: "",
    billedMode: 2,
    createdDateFrom: formatIsoDate(fromDate),
    createdDateTo: formatIsoDate(today),
    projId: "",
    currencyCode: "",
    expenseSheetStatus: null,
    includeSubordinates: false,
    page: 1,
    pageSize: 50,
  };

  const result = await browserFetchJson(page, "/api/crm/expensesheets/list", listPayload);
  expect(result.ok, `Expense sheet list failed: ${result.raw}`).toBeTruthy();
  expect(result.json?.Success, `Expense sheet list returned failure: ${result.raw}`).not.toBe(false);

  const items = Array.isArray(result.json?.Items) ? result.json.Items : [];
  expect(items.length, "The assistant smoke test needs at least one expense sheet in the public environment.").toBeGreaterThan(0);

  return {
    sourceJson: result.json,
    listPayload,
  };
}

test.describe("Expense sheets assistant public smoke battery", () => {
  test.describe.configure({ mode: "serial" });

  test.beforeAll(async () => {
    await acquirePublicE2ELock("expense-sheets-assistant-public");
  });

  test.afterAll(async () => {
    await releasePublicE2ELock();
  });

  test("Assistant ask endpoint answers visualization prompts without server errors", async ({ page }) => {
    await ensureAuthenticatedSession(page);
    const { sourceJson } = await loadAssistantSourceJson(page);

    const scenarios = [
      {
        id: "table",
        chartType: "table",
        question: "Muestrame una tabla con los totales por moneda de estas hojas de gasto.",
      },
      {
        id: "bar",
        chartType: "bar",
        question: "Muestrame un grafico de barras con los totales por moneda de estas hojas de gasto.",
      },
      {
        id: "pie",
        chartType: "pie",
        question: "Muestrame un grafico circular con los totales por moneda de estas hojas de gasto.",
      },
    ];

    const failures = [];

    for (const scenario of scenarios) {
      const result = await browserFetchJson(page, "/api/ia/service/expensesheets/ask", {
        question: scenario.question,
        answerInstructions: buildAnswerInstructions(scenario.chartType),
        sourceJson,
      });

      const responseJson = result.json || {};
      const answer = String(responseJson?.Data?.Answer || "").trim();
      const parsedAnswer = parseStructuredAnswer(answer);
      const structuredMessages = Array.isArray(parsedAnswer?.messages) ? parsedAnswer.messages : [];
      const model = String(responseJson?.Data?.Model || "").trim();
      const traceId = String(responseJson?.TraceId || "").trim();
      const warnings = Array.isArray(responseJson?.Data?.Warnings) ? responseJson.Data.Warnings : [];
      const hasRequestedVisualization = hasRequestedVisualizationMessage(structuredMessages, scenario.chartType);

      if (!result.ok || responseJson?.Success === false || !answer || !parsedAnswer || !hasRequestedVisualization) {
        failures.push({
          scenario: scenario.id,
          status: result.status,
          retryAfter: result.retryAfter || null,
          errorCode: responseJson?.ErrorCode || null,
          message: responseJson?.Message || null,
          traceId: traceId || null,
          model: model || null,
          warnings,
          parsedStructuredAnswer: !!parsedAnswer,
          messageCount: structuredMessages.length,
          hasRequestedVisualization,
          raw: result.raw,
        });
      }
    }

    expect(
      failures,
      failures.length > 0
        ? `Assistant public smoke battery failed:\n${JSON.stringify(failures, null, 2)}`
        : "Assistant public smoke battery passed."
    ).toEqual([]);
  });
});
