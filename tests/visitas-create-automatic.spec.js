// Playwright E2E: create visits with alternating clients and automatic test text.
const { test, expect } = require("./e2e-devtools-mobile.fixture");

test.use({ permissions: ["microphone"] });

const clientQueries = ["Alud", "Gaviota"];

// Builds deterministic text so created visits are clearly marked as automatic tests.
function buildAutomaticTexts(clientQuery) {
  const stamp = new Date().toISOString().replace("T", " ").slice(0, 19);
  return {
    description: `Prueba automatica E2E - ${clientQuery} - descripcion - ${stamp}`,
    comentarios: `Prueba automatica E2E - ${clientQuery} - comentarios - ${stamp}`,
    antecedentes: `Prueba automatica E2E - ${clientQuery} - antecedentes - ${stamp}`,
    conclusiones: `Prueba automatica E2E - ${clientQuery} - conclusiones - ${stamp}`,
  };
}

// Ensures an authenticated session is already available before running create flows.
async function ensureAuthenticatedSession(page) {
  await page.goto("/Visitas/Create?fresh=1", { waitUntil: "domcontentloaded" });
  const loginGateVisible = await page
    .getByRole("button", { name: /sign in with microsoft|iniciar sesi[oó]n con microsoft/i })
    .isVisible()
    .catch(() => false);

  if (loginGateVisible) {
    throw new Error("No active authenticated session. Run: npm run test:e2e:auth:capture");
  }
}

// Selects a client by search query and chooses the best matching option.
async function selectClient(page, clientQuery) {
  const clientLabel = page.locator("label", { hasText: /Cuenta|Account|Conta|Conto|Kontua|账户/i });
  await expect(clientLabel).toBeVisible();
  const clientBox = clientLabel.locator("..");
  const clientInput = clientBox.locator("input[role='combobox']").first();

  await clientInput.fill(clientQuery);
  await clientInput.press("Enter");

  const listbox = page.locator("div[role='listbox']:visible").first();
  await expect(listbox).toBeVisible();

  const exactMatch = listbox
    .locator("button[role='option']")
    .filter({ hasText: new RegExp(clientQuery, "i") })
    .first();
  const hasExact = await exactMatch.count();
  if (hasExact > 0) {
    await exactMatch.click({ noWaitAfter: true });
    return;
  }

  const firstOption = listbox.locator("button[role='option']").first();
  await expect(firstOption).toBeVisible();
  await firstOption.click({ noWaitAfter: true });
}

// Moves from step 1 to step 2 in Create flow.
async function goToStep2(page) {
  const forwardBtn = page.locator("#globalForwardBtn");
  await expect(forwardBtn).toBeVisible();
  await expect(forwardBtn).toBeEnabled();
  await forwardBtn.click();
  await expect(page.locator("#description")).toBeVisible();
}

// Picks visit type from the combobox using the Comercial/Commercial option.
async function selectVisitType(page) {
  const visitTypeLabel = page.locator("label", { hasText: /Tipo de visita|Visit type/i });
  await expect(visitTypeLabel).toBeVisible();
  const visitTypeBox = visitTypeLabel.locator("..");
  const visitTypeInput = visitTypeBox.locator("input[role='combobox']").first();

  await visitTypeInput.click();
  const visitTypeOption = page.getByRole("option", { name: /Comercial|Commercial/i }).first();
  await expect(visitTypeOption).toBeVisible();
  await visitTypeOption.click();
}

// Opens the full screen text editor for a field and saves the provided text.
async function writeWithTextEditor(page, fieldSelector, textValue) {
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
    page.waitForURL("**/Visitas/Create**", { waitUntil: "domcontentloaded" }),
    page.getByRole("button", { name: /Guardar|Save/i }).click(),
  ]);

  await expect(page.locator(fieldSelector)).toHaveValue(textValue);
}

// Submits create modal confirmation and validates navigation back to History.
async function submitCreate(page) {
  const createBtn = page.locator("#globalForwardBtn");
  await expect(createBtn).toBeVisible();
  await expect(createBtn).toBeEnabled();
  await createBtn.click();

  const confirmModal = page.locator("div.fixed.inset-0:has-text('Confirm create')").first();
  await expect(confirmModal).toBeVisible();
  await confirmModal.getByRole("button", { name: /Yes|Si|Sí/i }).first().click();

  await page.waitForURL("**/Historial/History", { timeout: 120000, waitUntil: "domcontentloaded" });
}

test.describe("Create visit automatic data set", () => {
  test.describe.configure({ mode: "serial" });

  for (const clientQuery of clientQueries) {
    test(`Create visit with automatic text for ${clientQuery}`, async ({ page }) => {
      const texts = buildAutomaticTexts(clientQuery);

      await ensureAuthenticatedSession(page);
      await selectClient(page, clientQuery);
      await goToStep2(page);

      await selectVisitType(page);
      await page.locator("#description").fill(texts.description);

      await writeWithTextEditor(page, "#comentarios", texts.comentarios);
      await writeWithTextEditor(page, "#antecedentes", texts.antecedentes);
      await writeWithTextEditor(page, "#conclusiones", texts.conclusiones);

      await submitCreate(page);
    });
  }
});
