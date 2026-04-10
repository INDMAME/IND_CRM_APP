const { expect } = require("@playwright/test");

const FAB_ACTIONS_LABEL_REGEX = /acciones?\s*r[a\u00e1]pidas|quick actions/i;
const FAB_CREATE_LABEL_REGEX = /create|crear/i;

// Returns the last visible locator candidate to avoid stale hidden floating buttons.
async function resolveVisibleLocator(page, locators, timeout = 15000) {
  const deadline = Date.now() + timeout;

  while (Date.now() < deadline) {
    for (const locator of locators) {
      const count = await locator.count();
      for (let index = count - 1; index >= 0; index -= 1) {
        const candidate = locator.nth(index);
        const isVisible = await candidate.isVisible().catch(() => false);
        if (!isVisible) {
          continue;
        }

        await candidate.scrollIntoViewIfNeeded().catch(() => undefined);
        return candidate;
      }
    }

    await page.waitForTimeout(150);
  }

  throw new Error("Could not find a visible expense floating action button.");
}

// Resolves the Gastos speed-dial trigger using accessible selectors first.
async function resolveExpenseFabMenuButton(page, timeout = 15000) {
  return resolveVisibleLocator(
    page,
    [
      page.locator("button[aria-haspopup='menu']:has(canvas)"),
      page.getByRole("button", { name: FAB_ACTIONS_LABEL_REGEX }),
    ],
    timeout
  );
}

// Resolves the Gastos direct create floating button from the list page.
async function resolveExpenseCreateFabButton(page, timeout = 15000) {
  return resolveVisibleLocator(
    page,
    [
      page.locator("button:not([aria-haspopup='menu']):has(canvas)"),
      page.getByRole("button", { name: FAB_CREATE_LABEL_REGEX }),
    ],
    timeout
  );
}

// Opens the Gastos FAB menu and clicks one visible menu item by accessible name.
async function clickExpenseFabMenuItem(page, itemNameRegex) {
  const menuItemLocator = page.getByRole("menuitem", { name: itemNameRegex });
  const menuItemVisible = await menuItemLocator.last().isVisible().catch(() => false);

  if (!menuItemVisible) {
    const fabButton = await resolveExpenseFabMenuButton(page);
    await expect(fabButton).toBeVisible({ timeout: 15000 });
    await fabButton.click();
  }

  const menuItem = await resolveVisibleLocator(page, [menuItemLocator], 15000);
  await expect(menuItem).toBeVisible({ timeout: 15000 });
  await menuItem.click();
}

// Clicks the direct create FAB used by the expense sheets list page.
async function clickExpenseCreateFab(page) {
  const fabButton = await resolveExpenseCreateFabButton(page);
  await expect(fabButton).toBeVisible({ timeout: 15000 });
  await fabButton.click();
}

module.exports = {
  clickExpenseCreateFab,
  clickExpenseFabMenuItem,
};
