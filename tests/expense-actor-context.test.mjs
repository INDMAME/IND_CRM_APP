import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { transformSync } from "esbuild";

const sourceRoot = path.resolve(import.meta.dirname, "../Web/wwwroot/react/src");
const immediate = () => new Promise((resolve) => setImmediate(resolve));

// Executes the actual browser coordinator, actor state, and expense request builders.
async function createContext({ blockedStorage = false, deferContext = false, delayedCleanup = false } = {}) {
  const modules = new Map();
  const calls = [];
  let now = Date.now();
  let completeContext;
  let completeCleanup;
  const values = new Map();
  const storage = {
    get length() { return values.size; },
    key: (index) => [...values.keys()][index] ?? null,
    getItem: (key) => { if (blockedStorage) throw new Error("Storage blocked"); return values.get(key) ?? null; },
    setItem: (key, value) => { if (blockedStorage) throw new Error("Storage blocked"); values.set(key, value); },
    removeItem: (key) => { if (blockedStorage) throw new Error("Storage blocked"); values.delete(key); },
  };
  const browser = {
    __IND_ENTRA_OID__: "user-a", __IND_SELECTED_COMPANY__: "DAT", __IND_API_TOKEN__: "test-token",
    location: { origin: "https://crm.test", href: "https://crm.test/Gastos/ExpenseSheetDetail", pathname: "/Gastos/ExpenseSheetDetail", reload() {}, replace() {} },
    sessionStorage: storage, localStorage: storage, addEventListener() {},
    ...(delayedCleanup ? { caches: { keys: async () => ["ind-expense-ticket-image-old"], delete: () => new Promise((resolve) => { completeCleanup = resolve; }) } } : {}),
  };
  class ApiFetchError extends Error { constructor(message, status) { super(message); this.status = status; } }
  const fetchJson = async (url, options) => {
    calls.push({ url, options });
    if (url.includes("entra/context")) {
      const response = { Success: true, Items: [{ Header: { AxUserId: "SELF", DefaultCompany: "DAT" }, Companies: [{ CompanyId: "DAT", IsDefault: true, CurrencyCode: "EUR" }] }] };
      return deferContext ? new Promise((resolve) => { completeContext = () => resolve(response); }) : response;
    }
    return { Success: true, Items: [] };
  };
  const load = (file) => {
    file = path.resolve(file);
    if (path.basename(file) === "apiService.ts") return { ApiFetchError, fetchJson, getCsrfToken: () => "" };
    if (modules.has(file)) return modules.get(file).exports;
    const module = { exports: {} };
    modules.set(file, module);
    vm.runInNewContext(transformSync(readFileSync(file, "utf8"), { loader: "ts", format: "cjs" }).code, {
      module, exports: module.exports, window: browser, sessionStorage: storage,
      document: { querySelector: () => null, body: { dataset: {} } },
      AbortController, DOMException, Headers, URL, URLSearchParams, console, setTimeout, clearTimeout, TextEncoder,
      Date: class extends Date { static now() { return now; } },
      require: (id) => load(path.resolve(path.dirname(file), id)),
    }, { filename: file });
    return module.exports;
  };
  load(path.join(sourceRoot, "legacy/ind-browser-state.ts"));
  if (!delayedCleanup) await browser.IND.browserState.ready;
  const actor = load(path.join(sourceRoot, "pages/gastos/utils/expenseActingUser.ts"));
  const api = load(path.join(sourceRoot, "pages/gastos/utils/expenseApi.ts"));
  const update = () => api.updateExpenseSheetHeader("managed-sheet", { description: "Managed sheet", expenseSheetStatus: 2, exchangeRateMode: 0 });
  return { browser, actor, api, calls, update, completeContext: () => completeContext(), completeCleanup: () => completeCleanup(true), advance: (ms) => { now += ms; } };
}

test("blocked storage retains the explicitly selected actor for live requests", async () => {
  const context = await createContext({ blockedStorage: true });
  assert.equal(context.browser.IND.browserState.isPersistenceAllowed(), false);
  assert.equal(context.actor.setExpenseActingUserOverride("MANAGED"), "MANAGED");
  await context.update();
  assert.equal(context.calls.at(-1).options.headers["X-IND-AxUserId"], "MANAGED");
  assert.equal(context.actor.ensureExpenseActingUserForNavigation(), false);
});

test("invalidated browser state blocks the request instead of reverting its actor to self", async () => {
  for (const invalidation of ["prepareForCompanyChange", "prepareForRelogin"]) {
    const context = await createContext();
    context.actor.setExpenseActingUserOverride("MANAGED");
    await context.update();
    const before = context.calls.length;
    await context.browser.IND.browserState[invalidation]();
    await assert.rejects(context.update());
    assert.equal(context.calls.length, before);
  }
});

test("invalidation while context is loading cannot send a later mutation", async () => {
  const context = await createContext({ deferContext: true });
  context.actor.setExpenseActingUserOverride("MANAGED");
  const mutation = context.update();
  const rejected = assert.rejects(mutation);
  await immediate();
  context.browser.IND.browserState.prepareForCompanyChange();
  context.completeContext(); await rejected;
  assert.equal(context.calls.filter((call) => call.options.method === "PUT").length, 0);
});

test("expiry of persisted navigation data does not silently change the live actor", async () => {
  const context = await createContext();
  context.actor.setExpenseActingUserOverride("MANAGED");
  context.advance(12 * 60 * 60 * 1000 + 1);
  await context.update();
  assert.equal(context.calls.at(-1).options.headers["X-IND-AxUserId"], "MANAGED");
});

test("invalidation during blocked-storage initialization cannot enable a memory context", async () => {
  const context = await createContext({ blockedStorage: true, delayedCleanup: true });
  await immediate();
  context.browser.IND.browserState.prepareForCompanyChange();
  context.completeCleanup(); await context.browser.IND.browserState.ready;
  assert.equal(context.actor.setExpenseActingUserOverride("MANAGED"), "");
  await assert.rejects(context.update());
  assert.equal(context.calls.length, 0);
});

test("a replaced identity marker during initialization cannot activate the old page", async () => {
  for (const nextIdentity of [null, "other-user"]) {
    const context = await createContext({ delayedCleanup: true });
    await immediate();
    if (nextIdentity) context.browser.localStorage.setItem("ind_browser_identity_v1", nextIdentity);
    else context.browser.localStorage.removeItem("ind_browser_identity_v1");
    context.completeCleanup(); await context.browser.IND.browserState.ready;
    await assert.rejects(context.update());
    assert.equal(context.calls.length, 0);
  }
});
