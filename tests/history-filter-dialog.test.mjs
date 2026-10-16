import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { after, before, test } from "node:test";
import { chromium, expect } from "@playwright/test";
import { build } from "esbuild";

const repoRoot = path.resolve(import.meta.dirname, "..");
const fixtureOrigin = "http://history-filter.test";
const labels = {
  History_Filter_Title: "Filtros de visitas",
  History_Filter_ViewResults: "Ver resultados",
  History_Filter_ClearDraft: "Limpiar",
  Common_Cancel: "Cancelar",
  History_Filter_Client: "Cliente",
  History_Filter_Owner: "Usuario",
  History_Filter_Owner_All: "Todos los usuarios",
  History_Quick_Custom: "Fecha",
  History_Quick_7Days: "7 dias",
  History_Quick_30Days: "30 dias",
  History_Quick_90Days: "90 dias",
  History_Filter_Date: "Fecha",
  History_From: "Desde",
  History_To: "Hasta",
  History_ClearRange: "Limpiar fechas",
  History_PrevMonth: "Mes anterior",
  History_NextMonth: "Mes siguiente",
  History_Loading: "Cargando visitas",
  Visits_Create_LoadClientsError: "No se pudieron cargar los clientes.",
};
const visibleUsers = [
  { axUserId: "USER-A", name: "Alpha User", alias: "alpha", canMutate: true },
  { axUserId: "USER-B", name: "Beta User", alias: "beta", canMutate: true },
];
const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
let browser;
let fixtureBundle;
let fixtureStyles;

// Uses an installed Chromium browser without downloading tools or contacting DEV.
function resolveBrowserPath() {
  const candidates = [
    process.env.IND_HISTORY_TEST_BROWSER_PATH,
    chromium.executablePath(),
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
  ];
  const executablePath = candidates.find((candidate) => candidate && existsSync(candidate));
  assert.ok(executablePath, "Install Chromium or set IND_HISTORY_TEST_BROWSER_PATH");
  return executablePath;
}

before(async () => {
  const bundle = await build({
    entryPoints: [path.join(repoRoot, "Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx")],
    bundle: true,
    format: "iife",
    write: false,
    logLevel: "silent",
  });
  fixtureBundle = bundle.outputFiles[0].text;
  fixtureStyles = (await Promise.all(["tailwind.css", "layout.css", "Historial.css"].map((file) =>
    readFile(path.join(repoRoot, "Web/wwwroot/css", file), "utf8")
  ))).join("\n");
  browser = await chromium.launch({ headless: true, executablePath: resolveBrowserPath() });
});

after(async () => {
  await browser?.close();
});

// Supplies the Razor host and toolbar event contract around the actual page source.
function fixtureHtml(withDefaults) {
  return `<!doctype html><html lang="es-ES"><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/fixture.css">
    <script>
      window.__IND_I18N__ = ${JSON.stringify(labels)};
      window.__IND_MODULE_ACCESS__ = { VISITAS_GESTION: 1 };
      window.__IND_VISIBLE_VISIT_USERS__ = ${JSON.stringify(visibleUsers)};
      window.__IND_VISIBLE_VISIT_USERS_SUCCEEDED__ = true;
      window.__IND_ENTRA_OID__ = "history-fixture-user";
      window.__IND_SELECTED_COMPANY__ = "ceu";
      window.IND = { browserState: {
        getEpoch: () => 1, isPersistenceAllowed: () => true, isContextActive: () => true
      }};
    </script><script defer src="/fixture.js"></script></head>
    <body class="visitas-typography">
      <header id="history-list-actions" style="display:flex;gap:12px;padding:12px">
        <button id="fixture-filter" type="button" onclick="window.dispatchEvent(new Event('history-toggle-filter'))">Abrir filtros</button>
        <button id="fixture-refresh" type="button" onclick="window.dispatchEvent(new Event('history-refresh'))">Actualizar</button>
        <button id="fixture-background" type="button">Accion de fondo</button>
      </header>
      <div id="visitas-history-root" data-company-id="ceu" data-ax-user-id="USER-A"
        data-permissions-revision="fixture-1"
        data-default-from="${withDefaults ? "2026-09-01" : ""}"
        data-default-to="${withDefaults ? "2026-09-30" : ""}"></div>
    </body></html>`;
}

// Creates deterministic rows so pagination and rollback can be checked by record id.
function listResponse(pageNumber) {
  return {
    total: 18,
    items: Array.from({ length: 6 }, (_, index) => ({
      actividadId: `P${pageNumber}-${index + 1}`,
      name: `Fixture visit ${pageNumber} ${index + 1}`,
      transDate: "2026-09-10",
      description: "Fixture visit description",
      ownerAxUserId: "USER-A",
      ownerName: "Alpha User",
    })),
  };
}

// Routes every request in memory; unrecognized URLs are rejected and reported.
async function withHistory(viewport, verify, { withDefaults = true } = {}) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    locale: "es-ES",
    isMobile: viewport.name === "mobile",
    hasTouch: viewport.name === "mobile",
  });
  const calls = [];
  const unexpected = [];
  const errors = [];
  let nextGate = null;
  let releasePending = null;
  let nextClientError = null;
  const page = await context.newPage();
  page.setDefaultTimeout(8000);
  page.on("pageerror", (error) => errors.push(error.message));
  await context.route("**/*", async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== fixtureOrigin) {
      unexpected.push(request.url());
      return route.abort();
    }
    if (url.pathname === "/Visitas/Historial") {
      return route.fulfill({ contentType: "text/html", body: fixtureHtml(withDefaults) });
    }
    if (url.pathname === "/fixture.js") {
      return route.fulfill({ contentType: "application/javascript", body: fixtureBundle });
    }
    if (url.pathname === "/fixture.css") {
      return route.fulfill({ contentType: "text/css", body: fixtureStyles });
    }
    if (url.pathname === "/Historial/GetActivities") {
      const pageNumber = Number(url.searchParams.get("page"));
      calls.push({ page: pageNumber, filters: request.postDataJSON() });
      const gate = nextGate;
      nextGate = null;
      if (gate) await gate;
      return route.fulfill({ json: listResponse(pageNumber) });
    }
    if (url.pathname === "/Visitas/GetAccountsForDropdown") {
      if (nextClientError) {
        const failure = nextClientError;
        nextClientError = null;
        return route.fulfill({ status: failure.status, json: {
          success: false,
          errorCode: failure.status === 403 ? "AUTH_PERMISSION_DENIED" : "UPSTREAM_ERROR",
          message: "Fixture client lookup failed",
          traceId: failure.traceId,
        } });
      }
      return route.fulfill({ json: { items: [{ accountNum: "C-100", nombreComercial: "Client Example" }] } });
    }
    unexpected.push(request.url());
    return route.abort();
  });
  const fixture = {
    page,
    calls,
    // Queues one deterministic suggestion error for this browser context.
    failNextClientLookup(status, traceId) {
      nextClientError = { status, traceId };
    },
    // Keeps a list request pending while duplicate and toolbar guards are checked.
    holdNextQuery() {
      assert.equal(nextGate, null, "Only one query may be held at a time");
      nextGate = new Promise((resolve) => { releasePending = resolve; });
    },
    // Releases a held response during verification or assertion cleanup.
    releaseQuery() {
      releasePending?.();
      releasePending = null;
    },
  };
  try {
    await page.goto(`${fixtureOrigin}/Visitas/Historial`);
    if (withDefaults) {
      await expect(page.locator('[data-link-id="P1-1"]')).toBeVisible();
      assert.equal(calls.length, 1);
    } else {
      await expect(page.locator("dialog.history-filter-dialog")).toBeVisible();
      assert.equal(calls.length, 0);
    }
    await verify(fixture);
    assert.deepEqual(errors, [], "The actual history page must not raise browser errors");
    assert.deepEqual(unexpected, [], "The fixture must not reach live AX, auth, or other endpoints");
  } catch (error) {
    await captureScreenshot(page, "failure");
    throw error;
  } finally {
    fixture.releaseQuery();
    await context.close();
  }
}

// Waits for browser event and React effect queues before checking absence of calls.
async function settle(page) {
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

// Opens through the real toolbar event and verifies native browser modality.
async function openFilters(page) {
  await page.locator("#fixture-filter").click();
  const dialog = page.getByRole("dialog", { name: labels.History_Filter_Title });
  await expect(dialog).toBeVisible();
  assert.equal(await dialog.evaluate((element) => element.matches(":modal")), true);
  await captureScreenshot(page, "open");
  return dialog;
}

// Saves optional review images outside the tracked repository.
async function captureScreenshot(page, state) {
  const directory = process.env.IND_HISTORY_SCREENSHOTS;
  if (!directory) return;
  await mkdir(directory, { recursive: true });
  const viewport = page.viewportSize().width < 640 ? "mobile" : "desktop";
  await page.screenshot({ path: path.join(directory, `history-${viewport}-${state}.png`) });
}

// Confirms that a portal remains inside the native dialog and receives pointer hits.
async function expectInteractivePortal(locator) {
  await expect(locator).toBeVisible();
  assert.equal(await locator.evaluate((element) => {
    const bounds = element.getBoundingClientRect();
    const hit = document.elementFromPoint(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
    return !!element.closest("dialog:modal") && !!hit && (hit === element || element.contains(hit));
  }), true);
}

for (const viewport of viewports) {
  test(`${viewport.name}: cancel rolls back quick filters, client text, and clear without querying`, async () => {
    await withHistory(viewport, async ({ page, calls }) => {
      const summary = await page.locator(".filter-card--summary").innerText();
      let dialog = await openFilters(page);
      await dialog.getByRole("button", { name: "7 dias", exact: true }).click();
      await dialog.getByRole("combobox", { name: "Cliente", exact: true }).fill("Unconfirmed client");
      await dialog.getByRole("button", { name: "Limpiar", exact: true }).click();
      await dialog.getByRole("button", { name: "Cancelar", exact: true }).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.locator('[data-link-id="P1-1"]')).toBeVisible();
      assert.equal(await page.locator(".filter-card--summary").innerText(), summary);
      dialog = await openFilters(page);
      await expect(dialog.getByRole("combobox", { name: "Cliente", exact: true })).toHaveValue("");
      await dialog.getByRole("button", { name: "Ver resultados", exact: true }).click();
      await expect(dialog).not.toBeVisible();
      await settle(page);
      assert.equal(calls.length, 1);
    });
  });

  test(`${viewport.name}: cleared or incomplete dates retain validation and Cancel remains available`, async () => {
    await withHistory(viewport, async ({ page, calls }) => {
      const dialog = await openFilters(page);
      await dialog.getByRole("button", { name: "Limpiar", exact: true }).click();
      await dialog.getByRole("button", { name: "Ver resultados", exact: true }).click();
      await expect(dialog).toBeVisible();
      await expect(dialog.locator("#drpActivator.drp-error")).toBeVisible();
      await expect(dialog.locator("#drpPopover")).toBeVisible();
      await captureScreenshot(page, "validation-calendar");
      await dialog.locator("#drpGrid button[data-date]").first().click();
      await dialog.getByRole("button", { name: "Ver resultados", exact: true }).click();
      await expect(dialog.locator("#drpActivator.drp-error")).toBeVisible();
      await settle(page);
      assert.equal(calls.length, 1, "Invalid dates must never start a list query");
      await dialog.getByRole("button", { name: "Cancelar", exact: true }).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.locator('[data-link-id="P1-1"]')).toBeVisible();
    });
  });

  test(`${viewport.name}: unchanged filters preserve page and valid apply queries once with load guards`, async () => {
    await withHistory(viewport, async ({ page, calls, holdNextQuery, releaseQuery }) => {
      await page.locator("#pagination").getByRole("button", { name: "2", exact: true }).click();
      await expect(page.locator('[data-link-id="P2-1"]')).toBeVisible();
      assert.equal(calls.length, 2);
      let dialog = await openFilters(page);
      await dialog.getByRole("button", { name: "Ver resultados", exact: true }).click();
      await expect(dialog).not.toBeVisible();
      await settle(page);
      assert.equal(calls.length, 2, "Accepting unchanged filters must preserve the current page");
      await expect(page.locator('[data-link-id="P2-1"]')).toBeVisible();
      dialog = await openFilters(page);
      await dialog.getByRole("button", { name: "30 dias", exact: true }).click();
      await page.evaluate(() => window.dispatchEvent(new Event("history-refresh")));
      await settle(page);
      assert.equal(calls.length, 2, "A toolbar event must not submit an unfinished draft");
      holdNextQuery();
      await dialog.getByRole("button", { name: "Ver resultados", exact: true }).evaluate((button) => {
        button.click();
        button.click();
      });
      await expect(dialog).not.toBeVisible();
      await expect.poll(() => calls.length).toBe(3);
      assert.equal(calls[2].page, 1);
      await page.evaluate(() => {
        window.dispatchEvent(new Event("history-refresh"));
        window.dispatchEvent(new Event("history-toggle-filter"));
      });
      await settle(page);
      assert.equal(calls.length, 3, "Loading must reject duplicate and forced refresh requests");
      await expect(dialog).not.toBeVisible();
      releaseQuery();
      await expect(page.locator('[data-link-id="P1-1"]')).toBeVisible();
    });
  });

  test(`${viewport.name}: calendar, owner and client portals remain usable inside the modal`, async () => {
    await withHistory(viewport, async ({ page, calls }) => {
      const dialog = await openFilters(page);
      await dialog.getByRole("button", { name: "Limpiar", exact: true }).click();
      await dialog.getByRole("button", { name: "Fecha", exact: true }).click();
      const days = dialog.locator("#drpGrid button[data-date]");
      const fromDate = await days.nth(0).getAttribute("data-date");
      const toDate = await days.nth(5).getAttribute("data-date");
      await expectInteractivePortal(days.nth(0));
      await captureScreenshot(page, "calendar");
      await days.nth(0).click();
      await days.nth(5).click();
      await expect(dialog.locator("#drpPopover")).not.toBeVisible();
      const owner = dialog.getByRole("combobox", { name: "Usuario", exact: true });
      await owner.fill("BETA");
      const ownerOption = dialog.getByRole("option", { name: "BETA USER (USER-B)", exact: true });
      await expectInteractivePortal(ownerOption);
      await owner.press("Enter");
      await expect(owner).toHaveValue("BETA USER (USER-B)");
      const client = dialog.getByRole("combobox", { name: "Cliente", exact: true });
      await client.fill("Client");
      await client.press("Enter");
      const clientOption = dialog.getByRole("option", { name: "Client Example (C-100)", exact: true });
      await expectInteractivePortal(clientOption);
      await clientOption.click();
      await expect(client).toHaveValue("Client Example (C-100)");
      assert.equal(calls.length, 1, "Editing and lookups must not reload activities");
      await dialog.getByRole("button", { name: "Ver resultados", exact: true }).click();
      await expect(dialog).not.toBeVisible();
      await expect.poll(() => calls.length).toBe(2);
      assert.deepEqual(calls[1].filters, { fromDate, toDate, accountNum: "C-100", ownerAxUserId: "USER-B" });
      await expect(page.locator('[data-link-id="P1-1"]')).toBeVisible();
      const confirmedSummary = await page.locator(".filter-card--summary").innerText();
      const reopened = await openFilters(page);
      await reopened.getByRole("button", { name: "Limpiar", exact: true }).click();
      await reopened.getByRole("button", { name: "Cancelar", exact: true }).click();
      assert.equal(await page.locator(".filter-card--summary").innerText(), confirmedSummary);
      const restored = await openFilters(page);
      await expect(restored.getByRole("combobox", { name: "Cliente", exact: true })).toHaveValue("Client Example (C-100)");
      await expect(restored.getByRole("combobox", { name: "Usuario", exact: true })).toHaveValue("BETA USER (USER-B)");
      await restored.getByRole("button", { name: "Cancelar", exact: true }).click();
      assert.equal(calls.length, 2);
    });
  });

  test(`${viewport.name}: Escape, backdrop, and keyboard cannot escape the explicit action flow`, async () => {
    await withHistory(viewport, async ({ page, calls }) => {
      const dialog = await openFilters(page);
      await page.keyboard.press("Escape");
      await expect(dialog).toBeVisible();
      const bounds = await dialog.boundingBox();
      assert.ok(bounds);
      await page.mouse.click(bounds.x > 2 ? bounds.x / 2 : 1, bounds.y > 2 ? bounds.y / 2 : 1);
      await expect(dialog).toBeVisible();
      await page.evaluate(() => document.getElementById("fixture-background").focus());
      assert.equal(await page.evaluate(() => document.activeElement?.id === "fixture-background"), false);
      await dialog.getByRole("button", { name: "Cancelar", exact: true }).focus();
      for (let index = 0; index < 12; index += 1) {
        await page.keyboard.press(index < 6 ? "Tab" : "Shift+Tab");
        const active = await dialog.evaluate((element) => ({
          inside: element.contains(document.activeElement),
          tag: document.activeElement?.tagName,
          id: document.activeElement?.id,
          text: document.activeElement?.textContent?.slice(0, 100),
        }));
        assert.equal(active.inside, true, `Focus escaped on step ${index}: ${JSON.stringify(active)}`);
      }
      await dialog.getByRole("button", { name: "Cancelar", exact: true }).focus();
      await page.keyboard.press("Enter");
      await expect(dialog).not.toBeVisible();
      await expect(page.locator("#fixture-filter")).toBeFocused();
      assert.equal(calls.length, 1);
    });
  });

  test(`${viewport.name}: cancelling a manual range restores the previously remembered custom range`, async () => {
    await withHistory(viewport, async ({ page, calls }) => {
      let dialog = await openFilters(page);
      await dialog.getByRole("button", { name: "Limpiar", exact: true }).click();
      await dialog.getByRole("button", { name: "Fecha", exact: true }).click();
      let days = dialog.locator("#drpGrid button[data-date]");
      const fromDate = await days.nth(1).getAttribute("data-date");
      const toDate = await days.nth(5).getAttribute("data-date");
      await days.nth(1).click();
      await days.nth(5).click();
      await dialog.getByRole("button", { name: "Ver resultados", exact: true }).click();
      await expect.poll(() => calls.length).toBe(2);
      await expect(page.locator('[data-link-id="P1-1"]')).toBeVisible();
      dialog = await openFilters(page);
      await dialog.getByRole("button", { name: "Fecha", exact: true }).click();
      days = dialog.locator("#drpGrid button[data-date]");
      await days.nth(7).click();
      await days.nth(9).click();
      await dialog.getByRole("button", { name: "Cancelar", exact: true }).click();
      dialog = await openFilters(page);
      await dialog.getByRole("button", { name: "7 dias", exact: true }).click();
      await dialog.getByRole("button", { name: "Fecha", exact: true }).click();
      await expect(page.locator("#fromDate")).toHaveValue(fromDate);
      await expect(page.locator("#toDate")).toHaveValue(toDate);
      await dialog.getByRole("button", { name: "Cancelar", exact: true }).click();
      await settle(page);
      assert.equal(calls.length, 2, "Discarding manual edits must not query or replace the remembered range");
    });
  });

  for (const status of [500, 403]) {
    test(`${viewport.name}: client lookup HTTP ${status} feedback stays visible inside the dialog`, async () => {
      await withHistory(viewport, async ({ page, calls, failNextClientLookup }) => {
        const dialog = await openFilters(page);
        const traceId = `history-client-${status}`;
        failNextClientLookup(status, traceId);
        const client = dialog.getByRole("combobox", { name: "Cliente", exact: true });
        await client.fill("Client");
        await client.press("Enter");
        const feedback = dialog.getByRole("alert");
        await expect(feedback).toBeVisible();
        await expect(feedback).toContainText(labels.Visits_Create_LoadClientsError);
        await expect(feedback).toContainText(traceId);
        assert.equal(calls.length, 1, "A failed suggestion lookup must not submit the list filters");
        await dialog.getByRole("button", { name: "Cancelar", exact: true }).click();
        await expect(dialog).not.toBeVisible();
        await expect(page.locator('[data-link-id="P1-1"]')).toBeVisible();
        await settle(page);
        assert.equal(calls.length, 1);
      });
    });
  }
}

test("first entry without a date range opens filters and can cancel without querying", async () => {
  await withHistory(viewports[0], async ({ page, calls }) => {
    const dialog = page.getByRole("dialog", { name: labels.History_Filter_Title });
    assert.equal(await dialog.evaluate((element) => element.matches(":modal")), true);
    await dialog.getByRole("button", { name: "Cancelar", exact: true }).click();
    await expect(dialog).not.toBeVisible();
    await settle(page);
    assert.equal(calls.length, 0);
    await openFilters(page);
  }, { withDefaults: false });
});
