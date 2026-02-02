// Playwright E2E: confirm modal opens for edit and delete in visits detail.
const { test, expect } = require("@playwright/test");

test.use({ permissions: ["microphone"] });

const credentials = {
  user: process.env.USER_DEFAULT || "",
  pass: process.env.USER_PASS_DEFAULT || "",
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
  }
}

test("Visits detail confirm modal appears for edit and delete", async ({ page }) => {
  await page.goto("/Historial/History", { waitUntil: "domcontentloaded" });
  await loginIfNeeded(page);

  const firstCard = page.locator(".timeline-card--clickable").first();
  await expect(firstCard).toBeVisible({ timeout: 60000 });
  await firstCard.click();

  await page.waitForURL("**/Visitas/Detalle/**", { waitUntil: "domcontentloaded" });

  const editButton = page.locator("button:has(#visitEditIcon), button:has(#visitSaveIcon)").first();
  await expect(editButton).toBeVisible();
  await editButton.click();

  await editButton.click();
  const modal = page.locator("div.fixed.inset-0").first();
  await expect(modal).toBeVisible();

  const cancelBtn = modal.getByRole("button", { name: /cancel|cancelar|no/i }).first();
  if (await cancelBtn.isVisible().catch(() => false)) {
    await cancelBtn.click();
  } else {
    await page.keyboard.press("Escape");
  }

  const deleteButton = page.locator("button:has(#visitDeleteIcon)").first();
  await expect(deleteButton).toBeVisible();
  await deleteButton.click();

  await expect(modal).toBeVisible();
  if (await cancelBtn.isVisible().catch(() => false)) {
    await cancelBtn.click();
  } else {
    await page.keyboard.press("Escape");
  }

  const actionMark = page.locator("#indActionMark");
  await expect(actionMark).toHaveCount(1);
});
