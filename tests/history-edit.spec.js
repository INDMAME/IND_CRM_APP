// Playwright E2E: edit a visit from history and verify changes persist.
const { test, expect } = require("@playwright/test");

test.use({ permissions: ["microphone"] });

const credentials = {
  user: "APIAX",
  pass: "MaMeAxAp#48",
};

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

// Log in only when the login form is visible.
async function loginIfNeeded(page) {
  const userInput = page.locator("#inputUser");
  if (await userInput.isVisible().catch(() => false)) {
    await userInput.fill(credentials.user);
    await page.locator("#inputPassword").fill(credentials.pass);
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }),
      page.locator("button[type=submit]").click(),
    ]);
  }
}

// Parse month and year from the date picker label.
function parseMonthLabel(labelText) {
  const normalized = String(labelText || "").toLowerCase();
  const yearMatch = normalized.match(/(19|20)\d{2}/);
  const year = yearMatch ? Number(yearMatch[0]) : null;
  const monthName = Object.keys(monthMap).find((name) => normalized.includes(name));
  const month = monthName ? monthMap[monthName] : null;
  return { year, month };
}

// Move the date picker to the requested month and year.
async function gotoMonth(page, targetYear, targetMonth) {
  const label = page.locator("#drpMonthLabel");
  const prevBtn = page.locator(".drp-nav[data-dir=prev]");
  const nextBtn = page.locator(".drp-nav[data-dir=next]");

  for (let i = 0; i < 24; i += 1) {
    const text = await label.innerText();
    const { year, month } = parseMonthLabel(text);
    if (year === targetYear && month === targetMonth) return;
    if (year === null || month === null) throw new Error(`Unable to parse month label: ${text}`);
    const currentIndex = year * 12 + month;
    const targetIndex = targetYear * 12 + targetMonth;
    if (currentIndex < targetIndex) {
      await nextBtn.click();
    } else {
      await prevBtn.click();
    }
  }
  throw new Error("Unable to reach target month");
}

// Select a start and end date in the history date picker.
async function selectDateRange(page, startIso, endIso) {
  await page.locator("#drpActivator").click();
  const popover = page.locator("#drpPopover");
  await expect(popover).toBeVisible();

  const startDate = new Date(startIso);
  const endDate = new Date(endIso);

  await gotoMonth(page, startDate.getFullYear(), startDate.getMonth());
  await page.locator(`#drpGrid .drp-day[data-date="${startIso}"]`).click();

  await gotoMonth(page, endDate.getFullYear(), endDate.getMonth());
  await page.locator(`#drpGrid .drp-day[data-date="${endIso}"]`).click();
}

// Build the next edit marker text, incrementing if it already exists.
function buildNextEditedText(currentText) {
  const regex = /Editado desde el hist[óo]rico perueba\s*(\d+)/i;
  const match = String(currentText || "").match(regex);
  const next = match ? Number(match[1]) + 1 : 1;
  return `Editado desde el histórico prueba ${next}`;
}

test("Historial edit updates comments via TextEditor", async ({ page }) => {
  const now = new Date();
  const year = 2025;//now.getFullYear();
  const startIso = `${year}-11-01`;
  const endIso = `${year}-12-30`;

  await page.goto("/Historial/History", { waitUntil: "domcontentloaded" });
  await loginIfNeeded(page);

  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('button', { name: 'VISITS' }).click();
  await page.getByRole('link', { name: 'History' }).click();
  await page.getByText('FROM Add date TO Add date').click();
  await page.locator("#drpActivator").waitFor({ state: "visible" });
  await selectDateRange(page, startIso, endIso);

  const firstCard = page.locator(".timeline-card--clickable").first();
  await expect(firstCard).toBeVisible({ timeout: 60000 });
  await firstCard.click();

  await page.waitForURL("**/Visitas/Detalle/**", { waitUntil: "domcontentloaded" });

  const comentarios = page.locator("#comentarios");
  await comentarios.waitFor({ state: "visible" });
  const currentText = await comentarios.inputValue();
  const nextText = buildNextEditedText(currentText);

  const editBtn = page.locator("button:has(#visitEditIcon), button:has(#visitSaveIcon)").first();
  await expect(editBtn).toBeVisible();
  await editBtn.click();
  await expect(comentarios).toBeEnabled();

  await Promise.all([
    page.waitForURL("**/TextEditorReact/EditField**"),
    comentarios.click({ force: true }),
  ]);

  const editorTextarea = page.locator("textarea");
  await editorTextarea.waitFor({ state: "visible" });
  await editorTextarea.fill("");
  await editorTextarea.type(nextText, { delay: 10 });

  await Promise.all([
    page.waitForURL("**/Visitas/Detalle/**", { waitUntil: "domcontentloaded" }),
    page.getByLabel(/Guardar|Save/i).click(),
  ]);

  await editBtn.click();
  const confirmBtn = page.locator("div.fixed.inset-0 button.bg-primary");
  await page.getByRole('button', { name: 'Edit/Save' }).click();
  await page.getByRole('button', { name: 'Save', exact: true }).click();

});
