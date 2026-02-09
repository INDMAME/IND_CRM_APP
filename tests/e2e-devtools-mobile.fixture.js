// Shared Playwright fixture: persistent Chromium context with docked DevTools and device mode enabled.
const fs = require("node:fs");
const path = require("node:path");
const { test: base, expect, chromium } = require("@playwright/test");

const repoRoot = path.resolve(__dirname, "..");
const profileRootDir = path.join(repoRoot, ".playwright", "devtools-profile");
const authStatePath =
  process.env.IND_E2E_AUTH_STATE || path.join(repoRoot, "tests", ".auth", "entra-storage-state.json");
const useStoredAuthState = process.env.IND_E2E_USE_AUTH_STATE !== "false" && fs.existsSync(authStatePath);
const useDevtools = process.env.IND_E2E_DEVTOOLS === "true";
const useFreshProfile = useDevtools && process.env.IND_E2E_FRESH_DEVTOOLS_PROFILE !== "false";

// Keeps persistent profile directories isolated per worker to avoid lock contention.
function getUserDataDir(workerIndex) {
  const safeIndex = Number.isInteger(workerIndex) ? workerIndex : 0;
  return path.join(profileRootDir, `worker-${safeIndex}`);
}

// Reads Playwright storage state from disk.
function readStoredAuthState() {
  if (!useStoredAuthState) return null;
  try {
    return JSON.parse(fs.readFileSync(authStatePath, "utf8"));
  } catch {
    return null;
  }
}

// Applies cookies and localStorage entries to persistent context.
async function applyStoredAuthState(context) {
  const state = readStoredAuthState();
  if (!state) return;

  const cookies = Array.isArray(state.cookies) ? state.cookies : [];
  if (cookies.length > 0) {
    await context.addCookies(cookies);
  }

  const origins = Array.isArray(state.origins) ? state.origins : [];
  const localStorageOrigins = origins
    .map((originState) => ({
      origin: originState?.origin,
      localStorage: Array.isArray(originState?.localStorage) ? originState.localStorage : [],
    }))
    .filter((originState) => typeof originState.origin === "string" && originState.localStorage.length > 0);

  if (localStorageOrigins.length > 0) {
    await context.addInitScript(
      ({ serializedOrigins }) => {
        try {
          const match = serializedOrigins.find((entry) => entry.origin === window.location.origin);
          if (!match) return;
          for (const item of match.localStorage) {
            window.localStorage.setItem(item.name, item.value);
          }
        } catch {
          // Ignore hydration errors to keep tests running with cookie-only auth.
        }
      },
      { serializedOrigins: localStorageOrigins }
    );
  }
}

// Resets persisted browser window/devtools placement to avoid stale undocked sessions.
function resetProfileIfNeeded(userDataDir) {
  if (!useFreshProfile) return;
  fs.rmSync(userDataDir, { recursive: true, force: true });
}

// Writes DevTools preferences in Chromium profile to keep DevTools docked and mobile toolbar enabled.
function ensureDevtoolsPrefs(userDataDir) {
  const defaultDir = path.join(userDataDir, "Default");
  const prefsPath = path.join(defaultDir, "Preferences");
  fs.mkdirSync(defaultDir, { recursive: true });

  let prefs = {};
  if (fs.existsSync(prefsPath)) {
    try {
      prefs = JSON.parse(fs.readFileSync(prefsPath, "utf8"));
    } catch {
      prefs = {};
    }
  }

  if (!prefs.devtools) prefs.devtools = {};
  if (!prefs.devtools.preferences) prefs.devtools.preferences = {};

  const p = prefs.devtools.preferences;
  // Keep DevTools inside the same browser window.
  p.currentDockState = "\"bottom\"";
  p["last-dock-state"] = "\"bottom\"";
  p["panel-selected-tab"] = "\"elements\"";
  p["emulation.show-device-mode"] = "true";
  p["emulation.device-mode-value"] = "{\"device\":\"iPhone 12 Pro\",\"orientation\":\"vertical\",\"mode\":\"default\"}";
  p["emulation.device-width"] = "480";
  p["emulation.device-scale"] = "1";

  // Start with a wide browser window so docked DevTools does not hide the app viewport.
  if (!prefs.browser) prefs.browser = {};
  prefs.browser.window_placement = {
    bottom: 1300,
    left: 0,
    maximized: true,
    right: 2200,
    top: 0,
    work_area_bottom: 1300,
    work_area_left: 0,
    work_area_right: 2200,
    work_area_top: 0,
  };

  fs.writeFileSync(prefsPath, JSON.stringify(prefs));
}

const test = base.extend({
  context: async ({ baseURL }, use, workerInfo) => {
    const workerIndex = Number.isInteger(workerInfo?.parallelIndex) ? workerInfo.parallelIndex : 0;
    const userDataDir = getUserDataDir(workerIndex);
    if (useDevtools) {
      resetProfileIfNeeded(userDataDir);
      ensureDevtoolsPrefs(userDataDir);
    }

    const context = await chromium.launchPersistentContext(userDataDir, {
      baseURL,
      headless: process.env.IND_E2E_HEADLESS === "true",
      ignoreHTTPSErrors: true,
      viewport: { width: 480, height: 920 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 3,
      args: useDevtools
        ? ["--auto-open-devtools-for-tabs", "--start-maximized", "--window-size=2200,1300"]
        : ["--start-maximized", "--window-size=2200,1300"],
    });
    await applyStoredAuthState(context);

    await use(context);
    await context.close();
  },

  page: async ({ context }, use) => {
    const page = context.pages()[0] || (await context.newPage());
    await use(page);
  },
});

module.exports = { test, expect };
