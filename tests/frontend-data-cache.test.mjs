import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { transformSync } from "esbuild";

const sourceRoot = path.resolve(import.meta.dirname, "../Web/wwwroot/react/src");
const apiPath = "pages/gastos/utils/expenseApi.ts";
const assistantPath = "pages/gastos/utils/expenseAssistantSource.ts";
const immediate = () => new Promise((resolve) => setImmediate(resolve));
class ApiFetchError extends Error {
  constructor(message, status) { super(message); this.status = status; }
}

// Executes production modules with controlled time, storage, and HTTP boundaries.
function createLoader({ fetchJson = async () => { throw new Error("Unexpected HTTP request"); }, now = () => Date.now(), window: runtimeWindow = {}, globals = {} } = {}) {
  const modules = new Map();
  const storage = new Map();
  const browser = { __IND_ENTRA_OID__: "user-a", __IND_SELECTED_COMPANY__: "DAT", IND: { browserState: { isPersistenceAllowed: () => true, getEpoch: () => 0 } }, ...runtimeWindow };
  const mocks = {
    "apiService.ts": { ApiFetchError, fetchJson, getCsrfToken: () => "" },
    "indI18n.ts": { indT: (key, fallback) => fallback || key, indFormat: (key, fallback, ...args) => fallback.replace(/\{(\d+)\}/g, (_, index) => args[index]) },
  };
  const load = (file) => {
    file = path.resolve(file);
    if (mocks[path.basename(file)]) return mocks[path.basename(file)];
    if (modules.has(file)) return modules.get(file).exports;
    const code = transformSync(readFileSync(file, "utf8"), { loader: file.endsWith("tsx") ? "tsx" : "ts", format: "cjs" }).code;
    const module = { exports: {} };
    modules.set(file, module);
    vm.runInNewContext(code, {
      module, exports: module.exports, console, URL, URLSearchParams, Headers, DOMException, AbortController, TextEncoder, setTimeout, clearTimeout,
      Date: class extends Date { static now() { return now(); } },
      window: browser,
      sessionStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value), removeItem: (key) => storage.delete(key) },
      ...globals,
      require: (id) => load(path.resolve(path.dirname(file), id)),
    }, { filename: file });
    return module.exports;
  };
  return { load: (file) => load(path.join(sourceRoot, file)), storage, window: browser };
}

const contextResponse = (user = "AX-A", company = "DAT") => ({ Success: true, Items: [{ Header: { AxUserId: user, DefaultCompany: company }, Companies: [{ CompanyId: company, IsDefault: true, CurrencyCode: "EUR" }] }] });
const currencyResponse = (code = "EUR") => ({ Success: true, Total: 1, Page: 1, PageSize: 1, Items: [{ CurrencyCode: code, CurrencyCodeISO: code }] });
const listResponse = (total, page = 1, pageSize = 50) => ({ Success: true, Total: total, Page: page, PageSize: pageSize, Items: Array.from({ length: Math.min(pageSize, Math.max(0, total - (page - 1) * pageSize)) }, (_, index) => ({ HojaGastosId: `HG-${(page - 1) * pageSize + index}`, Description: "Expense" })) });

test("LRU reads retain hot entries, including empty keys, without extending absolute expiry", () => {
  let clock = 1000;
  const { makeCache } = createLoader({ now: () => clock }).load("utils/makeCache.ts");
  const cache = makeCache(2, 100);
  cache.set("", "empty"); cache.set("hot", "hot");
  assert.equal(cache.get(""), "empty");
  cache.set("new", "new");
  assert.equal(cache.has("hot"), false);
  assert.equal(cache.get(""), "empty");
  clock += 100;
  assert.equal(cache.has(""), false);
  assert.equal(cache.get("new"), undefined);
  cache.set("delete", 1);
  assert.equal(cache.delete("delete"), true);
  assert.equal(cache.has("delete"), false);
  const disabled = makeCache(0, 100);
  disabled.set("a", 1);
  assert.equal(disabled.has("a"), false);
});

test("contact snapshots preserve page 2 and more-results state, expire after hydration, and clear memory", () => {
  let clock = 1000;
  const environment = createLoader({ now: () => clock });
  const contacts = environment.load("utils/visitasStorage.ts");
  const items = Array.from({ length: 20 }, (_, index) => ({ value: String(index) }));
  contacts.setCachedContacts("CLIENT-A", items, 2, true);
  const cached = contacts.getCachedContacts("CLIENT-A");
  assert.equal(cached.items.length, 20);
  assert.equal(cached.lastLoadedPage, 2);
  assert.equal(cached.hasMore, true);

  // Exercise the actual component restore method without replacing its pagination logic.
  const source = readFileSync(path.join(sourceRoot, "components/visitas/ContactsCombobox.tsx"), "utf8");
  const start = source.indexOf("  const primeFromCache =");
  const end = source.indexOf("\n  useEffect", start);
  const restored = {};
  const code = transformSync(source.slice(start, end).replace("const primeFromCache =", "globalThis.primeFromCache ="), { loader: "tsx", format: "cjs" }).code;
  const sandbox = { accountNum: "CLIENT-A", loadedContactsExpiryRef: { current: 0 }, getCachedContacts: contacts.getCachedContacts, setOptions: (value) => { restored.items = value; }, setPage: (value) => { restored.page = value; }, setHasMore: (value) => { restored.hasMore = value; }, setShowNotFoundState() {}, setHasLoaded() {}, setStatus() {}, indFormat: () => "", indT: () => "" };
  vm.createContext(sandbox); vm.runInContext(code, sandbox); sandbox.primeFromCache();
  assert.equal(restored.page, 2);
  assert.equal(restored.hasMore, true);
  clock += 5 * 60 * 1000;
  assert.equal(contacts.getCachedContacts("CLIENT-A"), null);
  contacts.setCachedContacts("CLIENT-A", items, 2, true);
  contacts.setClientCache("query", items);
  const beforeClear = contacts.captureVisitLookupState();
  contacts.clearCreateSelectionCache();
  assert.equal(contacts.isVisitLookupStateCurrent(beforeClear), false);
  assert.equal(contacts.getCachedContacts("CLIENT-A"), null);
  assert.equal(contacts.getClientCache("query"), null);
});

test("contact persistence stays bounded and never truncates a large cached list", () => {
  const environment = createLoader();
  const contacts = environment.load("utils/visitasStorage.ts");
  for (let index = 0; index < 20; index++) contacts.setCachedContacts(`C-${index}`, [{ value: String(index) }], 1, false);
  assert.equal(Object.keys(JSON.parse(environment.storage.get(contacts.CONTACTS_STORAGE_KEY))).length, 10);
  contacts.setCachedContacts("BIG", Array.from({ length: 210 }, (_, index) => ({ value: String(index) })), 21, true);
  assert.equal(contacts.getCachedContacts("BIG"), null);
  environment.storage.set(contacts.CONTACTS_STORAGE_KEY, JSON.stringify({ legacy: [{ value: "old" }] }));
  assert.equal(contacts.getCachedContacts("legacy"), null);
});

test("currency cancellation is local to each waiter while one shared request completes", async () => {
  let resolveCurrency;
  let calls = 0;
  let fetchSignal;
  const { load } = createLoader({ fetchJson: async (url, options) => {
    if (url.endsWith("/context")) return contextResponse();
    calls++; fetchSignal = options.signal;
    return new Promise((resolve) => { resolveCurrency = resolve; });
  } });
  const api = load(apiPath);
  const first = new AbortController();
  const second = new AbortController();
  const p1 = api.getExpenseSheetCurrencies({ signal: first.signal });
  await immediate();
  const p2 = api.getExpenseSheetCurrencies({ signal: second.signal });
  await immediate();
  const rejected = assert.rejects(p1, { name: "AbortError" });
  first.abort(); await rejected;
  assert.equal(fetchSignal, undefined);
  resolveCurrency(currencyResponse());
  assert.equal((await p2).Items[0].CurrencyCode, "EUR");
  assert.equal(calls, 1);
  const cancelled = new AbortController(); cancelled.abort();
  await assert.rejects(api.getExpenseSheetCurrencies({ signal: cancelled.signal }), { name: "AbortError" });
});

test("obsolete context completion cannot repopulate cache after auth reset", async () => {
  const pending = [];
  const { load } = createLoader({ fetchJson: () => new Promise((resolve) => pending.push(resolve)) });
  const api = load(apiPath);
  const old = api.getExpenseApiContextSnapshot();
  const oldRejected = assert.rejects(old, { name: "AbortError" });
  api.configureExpenseApiAuth({ entraOid: "user-b" });
  const current = api.getExpenseApiContextSnapshot();
  pending[1](contextResponse("AX-B"));
  assert.equal((await current).axUserId, "AX-B");
  pending[0](contextResponse("AX-A")); await oldRejected;
  assert.equal((await api.getExpenseApiContextSnapshot()).axUserId, "AX-B");
  assert.equal(pending.length, 2);
});

test("context failures settle normally without an orphan rejection and allow retry", async () => {
  let calls = 0;
  const { load } = createLoader({ fetchJson: async () => { if (++calls === 1) throw new ApiFetchError("offline", 503); return contextResponse(); } });
  const api = load(apiPath);
  await assert.rejects(api.getExpenseApiContextSnapshot(), /offline/);
  await immediate();
  assert.equal((await api.getExpenseApiContextSnapshot()).axUserId, "AX-A");
});

test("context and currency entries refresh at their absolute lifetimes", async () => {
  let clock = 1000;
  let contextCalls = 0;
  let currencyCalls = 0;
  const { load } = createLoader({ now: () => clock, fetchJson: async (url) => {
    if (url.endsWith("/context")) { contextCalls++; return contextResponse(); }
    currencyCalls++; return currencyResponse();
  } });
  const api = load(apiPath);
  await api.getExpenseSheetCurrencies();
  clock += 5 * 60 * 1000;
  await api.getExpenseSheetCurrencies();
  assert.equal(contextCalls, 2); assert.equal(currencyCalls, 1);
  clock += 25 * 60 * 1000;
  await api.getExpenseSheetCurrencies();
  assert.equal(currencyCalls, 2);
});

test("assistant extracts 600 rows in 12 API-sized calls without reusing incompatible offsets", async () => {
  const { loadExpenseAssistantSource } = createLoader().load(assistantPath);
  const requests = [];
  const result = await loadExpenseAssistantSource({ filter: "", page: 8, pageSize: 6 }, listResponse(600, 8, 6), async (request) => {
    requests.push(request); return listResponse(600, request.page, request.pageSize);
  });
  assert.equal(requests.length, 12);
  assert.equal(requests[0].page, 1);
  assert.equal(requests.every((request) => request.pageSize === 50), true);
  assert.equal(result.Items.length, 600);
  assert.equal(new Set(result.Items.map((item) => item.HojaGastosId)).size, 600);
});

test("assistant refuses over-limit, duplicate, and changing-total datasets explicitly", async () => {
  const { loadExpenseAssistantSource, assertExpenseAssistantSourceSize } = createLoader().load(assistantPath);
  const request = { filter: "", page: 1, pageSize: 6 };
  let calls = 0;
  await assert.rejects(loadExpenseAssistantSource(request, listResponse(6001, 1, 6), async () => { calls++; }), /6000/);
  assert.equal(calls, 0);
  assert.throws(() => assertExpenseAssistantSourceSize({ text: "x".repeat(4 * 1024 * 1024) }), /4 MB/);
  await assert.rejects(loadExpenseAssistantSource(request, null, async ({ page }) => listResponse(page === 1 ? 100 : 101, page, 50)), /changed/);
  await assert.rejects(loadExpenseAssistantSource(request, null, async ({ page }) => {
    const response = listResponse(100, page, 50);
    if (page === 2) response.Items[0].HojaGastosId = "HG-0";
    return response;
  }), /changed/);
});

test("assistant reuses the same query across pages, but refreshes on content change and expiry", async () => {
  let clock = 1000;
  const environment = createLoader({ now: () => clock });
  const { createExpenseAssistantSourceCache, getExpenseAssistantQueryKey } = environment.load(assistantPath);
  const { normalizeListPagedResponse } = environment.load("pages/gastos/utils/expenseApiResponseNormalizers.ts");
  const cache = createExpenseAssistantSourceCache();
  const request = { filter: "", page: 1, pageSize: 6 };
  const key = getExpenseAssistantQueryKey(request, "AX-A", "scope-a");
  assert.equal(key, getExpenseAssistantQueryKey({ ...request, page: 2 }, "AX-A", "scope-a"));
  assert.notEqual(key, getExpenseAssistantQueryKey(request, "AX-B", "scope-a"));
  assert.notEqual(key, getExpenseAssistantQueryKey(request, "AX-A", "scope-b"));
  let calls = 0;
  const fetchSource = async () => { calls++; return normalizeListPagedResponse(listResponse(100, 1, 100)); };
  await cache.load(key, listResponse(100, 1, 6), fetchSource);
  await cache.load(key, listResponse(100, 2, 6), fetchSource);
  assert.equal(calls, 1);
  const changed = listResponse(100, 2, 6); changed.Items[0].Description = "changed";
  await cache.load(key, changed, fetchSource);
  assert.equal(calls, 2);
  clock += 2 * 60 * 1000;
  await cache.load(key, listResponse(100, 2, 6), fetchSource);
  assert.equal(calls, 3);
});

test("assistant shares in-flight extraction and cancels it when its business query changes", async () => {
  const { createExpenseAssistantSourceCache } = createLoader().load(assistantPath);
  const cache = createExpenseAssistantSourceCache();
  let complete;
  let signal;
  let calls = 0;
  const fetchSource = async (nextSignal) => { calls++; signal = nextSignal; return new Promise((resolve) => { complete = resolve; }); };
  const first = cache.load("old", listResponse(1), fetchSource);
  const second = cache.load("old", listResponse(1), fetchSource);
  assert.equal(first, second);
  await immediate();
  const rejected = assert.rejects(first, { name: "AbortError" });
  cache.selectQuery("new");
  assert.equal(signal.aborted, true);
  complete(listResponse(1)); await rejected;
  assert.equal(calls, 1);
});
