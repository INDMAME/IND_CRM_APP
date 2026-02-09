// Playwright setup: capture authenticated storage state for MS Entra flows.
const fs = require("node:fs");
const path = require("node:path");
const { test } = require("./e2e-devtools-mobile.fixture");

const defaultAuthStatePath = path.join(__dirname, ".auth", "entra-storage-state.json");
const authStatePath = process.env.IND_E2E_AUTH_STATE || defaultAuthStatePath;
const startPath = process.env.IND_E2E_AUTH_START_PATH || "/Visitas/Create?fresh=1";
const loginTimeoutMs = Number(process.env.IND_E2E_AUTH_TIMEOUT_MS || "900000");

function isMicrosoftAuthUrl(url) {
  const text = String(url || "").toLowerCase();
  return (
    text.includes("login.microsoftonline.com") ||
    text.includes("microsoftonline.com") ||
    text.includes("login.live.com")
  );
}

async function isLoginGateVisible(page) {
  const loginInputVisible = await page.locator("#inputUser").isVisible().catch(() => false);
  if (loginInputVisible) return true;

  const microsoftButtonVisible = await page
    .getByRole("button", { name: /sign in with microsoft|iniciar sesi[oó]n con microsoft/i })
    .isVisible()
    .catch(() => false);
  if (microsoftButtonVisible) return true;

  const loginMessageVisible = await page
    .locator("text=/you must sign in to continue|debe iniciar sesi[oó]n para continuar/i")
    .first()
    .isVisible()
    .catch(() => false);
  return loginMessageVisible;
}

// Waits until the browser returns to the app after interactive auth and MFA.
async function waitForAuthenticatedSession(page) {
  const startedAt = Date.now();
  let stableTicks = 0;
  let loggedEntraHint = false;
  let loggedLocalHint = false;
  let loggedLoginGateHint = false;

  console.log("[auth] Browser opened. Complete login and MFA in this window. It will stay open until authentication is done.");

  while (Date.now() - startedAt < loginTimeoutMs) {
    const url = page.url();
    const onMicrosoftAuth = isMicrosoftAuthUrl(url);

    if (onMicrosoftAuth && !loggedEntraHint) {
      console.log("[auth] MS Entra page detected. Enter credentials and complete MFA.");
      loggedEntraHint = true;
    }

    const localLoginVisible = await page.locator("#inputUser").isVisible().catch(() => false);
    if (localLoginVisible && !loggedLocalHint) {
      console.log("[auth] Local login form detected. Enter CRM credentials to continue.");
      loggedLocalHint = true;
    }

    const loginGateVisible = await isLoginGateVisible(page);
    if (loginGateVisible && !loggedLoginGateHint) {
      console.log("[auth] App login gate detected. Click 'Sign in with Microsoft' and complete MS Entra flow.");
      loggedLoginGateHint = true;
    }

    const appRootCount = await page
      .locator("#visitas-app-root, #visitas-history-root, #visita-detail-root")
      .count()
      .catch(() => 0);

    const inAppRoute =
      /\/(visitas|historial|texteditorreact)\b/i.test(url) || url.toLowerCase().includes("/visitas/");
    const inAppAuthenticated = !onMicrosoftAuth && !loginGateVisible && (appRootCount > 0 || inAppRoute);

    // Require a few stable checks to avoid finishing during transient redirects.
    if (inAppAuthenticated) {
      stableTicks += 1;
      if (stableTicks >= 3) {
        await page.waitForLoadState("domcontentloaded");
        await page.waitForTimeout(1200);
        return;
      }
    } else {
      stableTicks = 0;
    }

    await page.waitForTimeout(1000);
  }

  throw new Error(
    `Authentication was not completed before timeout (${loginTimeoutMs}ms). Last URL: ${page.url()}`
  );
}

test("Capture authenticated storage state", async ({ page, context }) => {
  test.setTimeout(loginTimeoutMs + 120000);
  fs.mkdirSync(path.dirname(authStatePath), { recursive: true });

  await page.goto(startPath, { waitUntil: "domcontentloaded" });
  await waitForAuthenticatedSession(page);

  const stillOnLogin = await page.locator("#inputUser").isVisible().catch(() => false);
  if (stillOnLogin) {
    throw new Error("Authentication did not complete. Storage state was not saved.");
  }

  await context.storageState({ path: authStatePath });
  console.log(`[auth] Storage state saved at: ${authStatePath}`);
  console.log(`[auth] Current URL: ${page.url()}`);
});
