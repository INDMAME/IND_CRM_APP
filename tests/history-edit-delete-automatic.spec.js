// Playwright E2E: filter history by client/date range, edit a field, then delete the same visit.
const { test, expect } = require("./e2e-devtools-mobile.fixture");

test.use({ permissions: ["microphone"] });

const clientQueries = ["Alud", "Gaviota"];

const monthMap = {
  january: 0,
  enero: 0,
  february: 1,
  febrero: 1,
  march: 2,
  marzo: 2,
  april: 3,
  abril: 3,
  may: 4,
  mayo: 4,
  june: 5,
  junio: 5,
  july: 6,
  julio: 6,
  august: 7,
  agosto: 7,
  september: 8,
  septiembre: 8,
  setiembre: 8,
  october: 9,
  octubre: 9,
  november: 10,
  noviembre: 10,
  december: 11,
  diciembre: 11,
};

// Ensures an authenticated session exists before executing protected pages.
async function ensureAuthenticatedSession(page) {
  await page.goto("/Historial/History", { waitUntil: "domcontentloaded" });
  const loginGateVisible = await page
    .getByRole("button", { name: /sign in with microsoft|iniciar sesi[oó]n con microsoft/i })
    .isVisible()
    .catch(() => false);

  if (loginGateVisible) {
    throw new Error("No active authenticated session. Run: npm run test:e2e:auth:capture");
  }
}

// Parses month/year from date picker month label.
function parseMonthLabel(labelText) {
  const normalized = String(labelText || "").toLowerCase();
  const yearMatch = normalized.match(/(19|20)\d{2}/);
  const year = yearMatch ? Number(yearMatch[0]) : null;
  const monthName = Object.keys(monthMap).find((name) => normalized.includes(name));
  const month = monthName ? monthMap[monthName] : null;
  return { year, month };
}

// Moves the custom history calendar to target month.
async function gotoMonth(page, targetYear, targetMonth) {
  const label = page.locator("#drpMonthLabel");
  const prevBtn = page.locator(".drp-nav[data-dir=prev]");
  const nextBtn = page.locator(".drp-nav[data-dir=next]");

  for (let i = 0; i < 36; i += 1) {
    const text = await label.innerText();
    const { year, month } = parseMonthLabel(text);
    if (year === targetYear && month === targetMonth) return;
    if (year === null || month === null) {
      throw new Error(`Unable to parse month label: ${text}`);
    }

    const currentIndex = year * 12 + month;
    const targetIndex = targetYear * 12 + targetMonth;
    if (currentIndex < targetIndex) {
      await nextBtn.click();
    } else {
      await prevBtn.click();
    }
  }

  throw new Error("Unable to reach target month in history date picker.");
}

// Opens history filters if currently collapsed.
async function ensureHistoryFiltersVisible(page) {
  const toggleBtn = page.locator("#historyFilterToggleBtn");
  const customDateBtn = page.getByRole("button", { name: /Fecha|Date/i }).first();

  const alreadyVisible = await customDateBtn.isVisible().catch(() => false);
  if (alreadyVisible) {
    return;
  }

  const canClickToggle = await toggleBtn.isVisible().catch(() => false);
  if (canClickToggle) {
    await toggleBtn.click({ noWaitAfter: true });
  } else {
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("history-toggle-filter"));
    });
  }

  await expect(customDateBtn).toBeVisible({ timeout: 15000 });
}

// Opens the manual date range panel from the "Fecha/Date" quick filter.
async function openManualDatePanel(page) {
  const customBtn = page.getByRole("button", { name: /Fecha|Date/i }).first();
  await expect(customBtn).toBeVisible();

  const activator = page.locator("#drpActivator");
  // Always press Fecha to follow the expected user flow.
  await customBtn.click();
  if (!(await activator.isVisible().catch(() => false))) {
    // Handles toggle behavior if state was previously open/closed.
    await customBtn.click();
  }

  await expect(activator).toBeVisible({ timeout: 15000 });

  const popover = page.locator("#drpPopover");
  if (!(await popover.isVisible().catch(() => false))) {
    await activator.click();
  }
  await expect(popover).toBeVisible({ timeout: 15000 });
}

// Selects manual start/end date in history.
async function selectDateRange(page, startIso, endIso) {
  const popover = page.locator("#drpPopover");
  if (!(await popover.isVisible().catch(() => false))) {
    await page.locator("#drpActivator").click();
    await expect(popover).toBeVisible({ timeout: 15000 });
  }

  const startDate = new Date(startIso);
  const endDate = new Date(endIso);

  await gotoMonth(page, startDate.getFullYear(), startDate.getMonth());
  await page.locator(`#drpGrid .drp-day[data-date="${startIso}"]`).click();

  await gotoMonth(page, endDate.getFullYear(), endDate.getMonth());
  await page.locator(`#drpGrid .drp-day[data-date="${endIso}"]`).click();
}

// Selects a client in history client combobox.
async function selectHistoryClient(page, clientQuery) {
  const input = page.getByRole("combobox", { name: /Cuenta|Account|Conta|Conto|Kontua|账户/i }).first();
  await expect(input).toBeVisible();

  await input.fill(clientQuery);
  await input.press("Enter");

  const listbox = page.locator("div[role='listbox']:visible").first();
  await expect(listbox).toBeVisible();

  const matching = listbox
    .locator("button[role='option']")
    .filter({ hasText: new RegExp(clientQuery, "i") })
    .first();

  const hasMatching = await matching.count();
  if (hasMatching > 0) {
    await matching.click({ noWaitAfter: true });
    return;
  }

  const firstOption = listbox.locator("button[role='option']").first();
  await expect(firstOption).toBeVisible();
  await firstOption.click({ noWaitAfter: true });
}

// Applies history filters and waits for result load cycle.
async function applyHistoryFilters(page) {
  const applyBtn = page.locator(".history-filter-actions button").filter({ hasText: /Apply|Aplicar/i }).first();
  await expect(applyBtn).toBeVisible();
  await applyBtn.click();

  const loader = page.locator("#resultsLoader");
  await loader.waitFor({ state: "hidden", timeout: 60000 }).catch(() => undefined);
}

// Triggers one history detail topbar action using visible button or its window event fallback.
async function triggerHistoryDetailTopbarAction(page, selector, eventName) {
  const actionButton = page.locator(selector).first();
  const canClickAction = await actionButton.isVisible().catch(() => false);
  if (canClickAction) {
    await actionButton.click();
    return;
  }

  await page.evaluate((name) => {
    window.dispatchEvent(new CustomEvent(name));
  }, eventName);
}

// Tries client filters until at least one clickable card exists.
async function findCardForClients(page, startIso, endIso) {
  for (const clientQuery of clientQueries) {
    await ensureHistoryFiltersVisible(page);
    await openManualDatePanel(page);
    await selectDateRange(page, startIso, endIso);
    await selectHistoryClient(page, clientQuery);
    await applyHistoryFilters(page);

    const firstCard = page.locator(".timeline-card--clickable").first();
    const cardVisible = await firstCard
      .waitFor({ state: "visible", timeout: 12000 })
      .then(() => true)
      .catch(() => false);
    if (cardVisible) {
      return { firstCard, clientQuery };
    }
  }

  throw new Error(`No clickable visit cards found for clients: ${clientQueries.join(", ")}.`);
}

// Opens text editor for selected field and saves new text.
async function editFieldUsingTextEditor(page, fieldSelector, textValue) {
  await Promise.all([
    page.waitForURL("**/TextEditorReact/EditField**", { waitUntil: "domcontentloaded" }),
    page.locator(fieldSelector).click({ force: true }),
  ]);

  const editorTextarea = page.locator("textarea");
  await expect(editorTextarea).toBeVisible();

  const saveBtn = page.getByRole("button", { name: /Guardar|Save/i });
  const saveVisible = await saveBtn.isVisible().catch(() => false);
  if (!saveVisible) {
    const editBtn = page.getByRole("button", { name: /Editar|Edit/i });
    if (await editBtn.isVisible().catch(() => false)) {
      await editBtn.click();
    }
  }

  await editorTextarea.fill("");
  await editorTextarea.fill(textValue);

  await Promise.all([
    page.waitForURL("**/Visitas/Detalle/**", { waitUntil: "domcontentloaded" }),
    page.getByRole("button", { name: /Guardar|Save/i }).click(),
  ]);

  await expect(page.locator(fieldSelector)).toHaveValue(textValue);
}

// Confirms detail save flow from topbar and waits to return to history.
async function saveDetailChanges(page) {
  await triggerHistoryDetailTopbarAction(page, "button:has(#visitEditIcon), button:has(#visitSaveIcon)", "visit-edit");

  const saveConfirmBtn = page
    .locator("div.fixed.inset-0 button")
    .filter({ hasText: /Guardar|Save/i })
    .first();
  await expect(saveConfirmBtn).toBeVisible();
  await saveConfirmBtn.click();

  await page.waitForURL("**/Historial/History", { timeout: 120000, waitUntil: "domcontentloaded" });
}

// Deletes current detail record and waits for redirect to history.
async function deleteCurrentVisit(page) {
  await triggerHistoryDetailTopbarAction(page, "button:has(#visitDeleteIcon)", "visit-delete");

  const deleteConfirmBtn = page
    .locator("div.fixed.inset-0 button")
    .filter({ hasText: /Delete|Eliminar|Borrar/i })
    .first();
  await expect(deleteConfirmBtn).toBeVisible();
  await deleteConfirmBtn.click();

  await page.waitForURL("**/Historial/History", { timeout: 120000, waitUntil: "domcontentloaded" });
}

test("History filter by client/date, edit field, then delete the same visit", async ({ page }) => {
  await ensureAuthenticatedSession(page);

  const today = new Date();
  const start = new Date(today);
  start.setMonth(start.getMonth() - 4);
  const startIso = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}-${String(start.getDate()).padStart(2, "0")}`;
  const endIso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const { firstCard, clientQuery } = await findCardForClients(page, startIso, endIso);
  const linkId = await firstCard.getAttribute("data-link-id");
  if (!linkId) {
    throw new Error("Selected card has no link id.");
  }

  await firstCard.click();
  await page.waitForURL("**/Visitas/Detalle/**", { waitUntil: "domcontentloaded" });

  await triggerHistoryDetailTopbarAction(page, "button:has(#visitEditIcon), button:has(#visitSaveIcon)", "visit-edit");

  const automaticText = `Prueba automatica E2E - historial edicion conclusiones - ${clientQuery} - ${new Date()
    .toISOString()
    .replace("T", " ")
    .slice(0, 19)}`;
  await editFieldUsingTextEditor(page, "#conclusiones", automaticText);
  await saveDetailChanges(page);

  await page.goto(`/Visitas/Detalle/${encodeURIComponent(linkId)}`, { waitUntil: "domcontentloaded" });
  await deleteCurrentVisit(page);
});
