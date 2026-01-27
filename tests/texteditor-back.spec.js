// Playwright E2E: cover TextEditor return flows from Visits/Create.
const { test, expect } = require("@playwright/test");

test.use({ permissions: ["microphone"] });

const credentials = {
  user: process.env.USER_DEFAULT || "",
  pass: process.env.USER_PASS_DEFAULT || "",
  clientQuery: "ALUD",
};

const visitDefaults = {
  visitType: "Comercial",
  descriptionText: "Prueba automatica",
};

async function loginIfNeeded(page) {
  const userInput = page.locator("#inputUser");
  if (await userInput.isVisible().catch(() => false)) {
    if (!credentials.user || !credentials.pass) {
      throw new Error("Missing USER_DEFAULT or USER_PASS_DEFAULT environment variables.");
    }
    await userInput.fill(credentials.user);
    await page.locator("#inputPassword").fill(credentials.pass);
    await Promise.all([
      page.waitForNavigation({ waitUntil: "networkidle" }),
      page.locator("button[type=submit]").click(),
    ]);
    await page.goto("/Visitas/Create", { waitUntil: "domcontentloaded" });
  }
}

async function selectClient(page) {
  const clientLabel = page.locator("label", { hasText: /Buscar cliente|Search client/i });
  await clientLabel.waitFor({ state: "visible" });
  const clientBox = clientLabel.locator("..");
  const clientInput = clientBox.locator("input");
  await clientInput.fill(credentials.clientQuery);
  await clientInput.press("Enter");

  const clientList = page.locator('div[role="listbox"]:visible');
  await clientList.waitFor({ state: "visible" });
  const clientOptions = clientList.locator('button[role="option"]');
  await expect(clientOptions.first()).toBeVisible();
  await clientOptions.first().click();
}

async function selectContacts(page) {
  const contactLabel = page.locator("label", { hasText: /Buscar contacto|Search contact/i });
  await contactLabel.waitFor({ state: "visible" });
  const contactBox = contactLabel.locator("..");
  const contactInput = contactBox.locator("input");
  await contactInput.click();

  const contactList = page.locator('div[role="listbox"]:visible');
  await contactList.waitFor({ state: "visible" });
  let contactOptions = contactList.locator('button[role="option"]');
  await expect(contactOptions.first()).toBeVisible();

  await contactOptions.nth(0).click();
  await contactOptions.nth(1).click();
  await contactOptions.nth(2).click();

  let previousCount = await contactOptions.count();
  await contactList.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  await page.waitForTimeout(800);

  contactOptions = contactList.locator('button[role="option"]');
  let currentCount = await contactOptions.count();
  if (currentCount <= previousCount) {
    await contactList.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    await page.waitForTimeout(800);
    currentCount = await contactOptions.count();
  }

  await contactOptions.nth(Math.max(0, currentCount - 1)).click();
}

async function goToStep2(page) {
  const forwardBtn = page.locator("#globalForwardBtn");
  await expect(forwardBtn).toBeVisible();
  await expect(forwardBtn).toBeEnabled();
  await forwardBtn.click();
}

async function fillVisitDetails(page) {
  const descriptionInput = page.locator("#description");
  await descriptionInput.fill(visitDefaults.descriptionText);
}

async function prepareStep2(page) {
  await page.goto("/Visitas/Create", { waitUntil: "domcontentloaded" });
  await loginIfNeeded(page);
  await selectClient(page);
  await selectContacts(page);
  await goToStep2(page);
  await fillVisitDetails(page);
}

async function openTextEditor(page, fieldSelector) {
  await Promise.all([
    page.waitForURL("**/TextEditorReact/EditField**"),
    page.locator(fieldSelector).click({ force: true }),
  ]);
}

async function typeEditorText(page, editorText) {
  const editorTextarea = page.locator("textarea");
  await editorTextarea.waitFor({ state: "visible" });
  await editorTextarea.fill("");
  await editorTextarea.type(editorText, { delay: 10 });
}

async function returnFromEditor(page, action) {
  const waitForReturn = page.waitForURL("**/Visitas/Create**", { waitUntil: "domcontentloaded" });
  if (action === "back") {
    const backBtn = page.getByLabel(/Volver|Back/i);
    await backBtn.click();
    await waitForReturn;
    return;
  }

  const saveBtn = page.getByLabel(/Guardar|Save/i);
  await saveBtn.click();
  await waitForReturn;
}

async function expectStep2WithComments(page, expectedText) {
  await expect(page.locator("#description")).toBeVisible();
  await expect(page.locator("#comentarios")).toHaveValue(expectedText);
  await expect(page.getByText(/Datos de la visita|Visit details/i)).toBeVisible();
  await expect(page.locator("label", { hasText: /Buscar cliente|Search client/i })).toHaveCount(0);
}

test("TextEditor back keeps Step 2 after comments edit", async ({ page }) => {
  const editorText = "Texto de prueba desde la pagina editora de texto (back).";

  await prepareStep2(page);
  await page.getByRole('button', { name: 'Show options' }).click();
  await page.getByRole('option', { name: 'Commercial' }).click();
  await openTextEditor(page, "#comentarios");
  await typeEditorText(page, editorText);
  await returnFromEditor(page, "back");

  await expectStep2WithComments(page, editorText);
});

test("Creación de una nueva actividad + logout", async ({ page }) => {
  const editorText = "Texto de prueba desde la pagina editora de texto (save).";

  await prepareStep2(page);
  await page.getByRole('button', { name: 'Show options' }).click();
  await page.getByRole('option', { name: 'Commercial' }).click();
  await openTextEditor(page, "#comentarios");
  await typeEditorText(page, editorText);
  await returnFromEditor(page, "save");
  await page.locator('#antecedentes').click();
  await page.getByRole('textbox').click(); 
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Agregamos un texto a los antecedentes.');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.locator('#conclusiones').click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Agrego texto a las conclusiones, de forma automatica'); 
  await page.getByText('Agrego texto a las').fill('Agrego texto a las conclusiones, de forma automática.');
  await page.getByRole('button', { name: 'Microphone' }).click();
  await page.getByRole('button', { name: 'Record' }).click();
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('button', { name: 'APIAX' }).click();
  await page.getByRole('button', { name: 'Sign out' }).click();
});
