import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { build } from "esbuild";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const result = await build({
  stdin: {
    contents: [
      'export * from "./Web/wwwroot/react/src/utils/sessionExpiry.ts";',
      'export * from "./Web/wwwroot/react/src/utils/visitasHistory.ts";',
      'export * from "./Web/wwwroot/react/src/hooks/useHistoryFilterCache.ts";',
      'export * from "./Web/wwwroot/react/src/pages/gastos/tickets/useExpenseTicketsFilterCache.ts";',
      'export * from "./Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsFilterCache.ts";',
    ].join("\n"),
    resolveDir: repositoryRoot,
    loader: "ts",
  },
  bundle: true,
  format: "cjs",
  platform: "node",
  external: ["react"],
  write: false,
  logLevel: "silent",
});

// Runs the real storage helpers with deterministic time and browser quota failures.
const createHarness = () => {
  const values = new Map();
  let now = 1_000_000;
  let rejectWrite = () => false;
  let persistenceAllowed = true;
  const storage = {
    get length() { return values.size; },
    key: (index) => [...values.keys()][index] ?? null,
    getItem: (key) => values.get(key) ?? null,
    removeItem: (key) => values.delete(key),
    setItem(key, value) {
      if (rejectWrite(key, String(value))) throw new Error("QuotaExceededError");
      values.set(key, String(value));
    },
  };
  const context = vm.createContext({
    module: { exports: {} },
    exports: {},
    require: (name) => {
      assert.equal(name, "react");
      return { useCallback: (callback) => callback };
    },
    Date: class extends Date { static now() { return now; } },
    sessionStorage: storage,
    window: {
      __IND_ENTRA_OID__: "user-a",
      __IND_SELECTED_COMPANY__: "ceu",
      IND: { browserState: { isPersistenceAllowed: () => persistenceAllowed } },
    },
    console,
  });
  vm.runInContext(result.outputFiles[0].text, context);
  return {
    api: context.module.exports,
    values,
    advance: (milliseconds) => { now += milliseconds; },
    reject: (predicate) => { rejectWrite = predicate; },
    blockPersistence: () => { persistenceAllowed = false; },
  };
};

const ticketState = (filterKey, items = []) => ({
  filters: { filterKey }, page: 1, scrollY: 0, focusFileId: "", items,
  selectedTickets: [], total: items.length, linkModeSheetId: "", linkModeLineId: "",
  selectionMode: "selected", excludedIds: [], filteredSelectionFilters: null, filteredSelectionTotal: 0,
});

test("session writes preserve value and expiry together and report quota failure", () => {
  const { api, reject, advance } = createHarness();
  assert.equal(api.setSessionValueWithExpiry("visitas_draft_test", "original", 100), true);
  reject((key) => key === "visitas_draft_test");
  assert.equal(api.setSessionValueWithExpiry("visitas_draft_test", "replacement", 1000), false);
  assert.equal(api.getSessionValueWithExpiry("visitas_draft_test"), "original");
  advance(101);
  assert.equal(api.getSessionValueWithExpiry("visitas_draft_test"), null);
});

test("session values retain legacy compatibility and renewed writes discard old expiry", () => {
  const { api, values, advance } = createHarness();
  values.set("visitas_draft_test", "legacy");
  values.set("visitas_draft_test__exp", "1000050");
  assert.equal(api.getSessionValueWithExpiry("visitas_draft_test"), "legacy");
  assert.equal(api.setSessionValueWithExpiry("visitas_draft_test", "renewed", 1000), true);
  assert.equal(values.has("visitas_draft_test__exp"), false);
  advance(100);
  assert.equal(api.getSessionValueWithExpiry("visitas_draft_test"), "renewed");
  advance(901);
  assert.equal(api.getSessionValueWithExpiry("visitas_draft_test"), null);
});

test("cleanup removes only expired CRM state and keeps valid drafts and other apps", () => {
  const { api, values, advance } = createHarness();
  api.setSessionValueWithExpiry("ind_texteditor_old", "expired", 10);
  api.setSessionValueWithExpiry("visitas_draft_valid", "unfinished work", 1000);
  values.set("expense_legacy", "old");
  values.set("expense_legacy__exp", "1");
  values.set("visitas_orphan__exp", "1");
  values.set("other_app", "keep");
  values.set("other_app__exp", "1");
  advance(11);
  api.pruneExpiredSessionValues(true);
  assert.equal(values.has("ind_texteditor_old"), false);
  assert.equal(values.has("expense_legacy"), false);
  assert.equal(values.has("expense_legacy__exp"), false);
  assert.equal(values.has("visitas_orphan__exp"), false);
  assert.equal(api.getSessionValueWithExpiry("visitas_draft_valid"), "unfinished work");
  assert.equal(values.get("other_app"), "keep");
  assert.equal(values.get("other_app__exp"), "1");
});

test("expired space is reclaimed before a write retry without evicting valid work", () => {
  const { api, values, reject, advance } = createHarness();
  api.setSessionValueWithExpiry("ind_texteditor_old", "expired", 10);
  advance(11);
  reject((key) => key === "visitas_draft_new" && values.has("ind_texteditor_old"));
  assert.equal(api.setSessionValueWithExpiry("visitas_draft_new", "new work", 1000), true);
  assert.equal(values.has("ind_texteditor_old"), false);
  assert.equal(api.getSessionValueWithExpiry("visitas_draft_new"), "new work");
});

test("ticket quota fallback writes the new compact state instead of restoring old filters", () => {
  const { api, reject } = createHarness();
  const cache = api.useExpenseTicketsFilterCache();
  cache.saveCachedState(ticketState("OLD"));
  reject((key, value) => key.startsWith("expense_tickets_filter_") && value.length > 1500);
  cache.saveCachedState(ticketState("NEW", Array.from({ length: 30 }, (_, index) => ({
    kind: "general", fileId: `ticket-${index}`, description: "A".repeat(100), status: 1,
  }))));
  const restored = cache.readCachedState();
  assert.equal(restored.filters.filterKey, "NEW");
  assert.equal(restored.items.length, 0);
  assert.equal(cache.consumeReturnFlag(), true);
});

test("a failed ticket snapshot never marks stale state as a successful return", () => {
  const { api, reject } = createHarness();
  const cache = api.useExpenseTicketsFilterCache();
  cache.saveCachedState(ticketState("OLD"));
  reject((key) => key.startsWith("expense_tickets_filter_"));
  cache.saveCachedState(ticketState("NEW"));
  assert.equal(cache.readCachedState(), null);
  assert.equal(cache.consumeReturnFlag(), false);
  assert.equal(cache.consumeReturnMode(), null);
});

test("new visit history filters and return flags renew an expired legacy deadline", () => {
  const { api, values } = createHarness();
  const cache = api.useHistoryFilterCache();
  values.set(api.HISTORY_FILTER_KEY, JSON.stringify({ fromDate: "2026-09-01", toDate: "2026-09-01" }));
  values.set(`${api.HISTORY_FILTER_KEY}__exp`, "1");
  values.set(api.HISTORY_RETURN_FLAG_KEY, "1");
  values.set(`${api.HISTORY_RETURN_FLAG_KEY}__exp`, "1");
  api.setHistoryFilterForDate("2026-09-11", true);
  assert.equal(cache.consumeReturnFlag(), true);
  assert.equal(cache.readCachedFilter().fromDate, "2026-09-11");
});

test("sheet quota fallback keeps the new filters and scroll without retaining large cards", () => {
  const { api, reject } = createHarness();
  const cache = api.useExpenseSheetsFilterCache();
  cache.saveCachedState({ filters: { hojaGastosId: "OLD" }, page: 1, scrollY: 0, items: [], total: 0 });
  reject((key, value) => key.startsWith("expense_sheets_filter_") && value.length > 1500);
  cache.saveCachedState({ filters: { hojaGastosId: "NEW" }, page: 2, scrollY: 700, total: 30,
    items: Array.from({ length: 30 }, (_, index) => ({ hojaGastosId: `sheet-${index}`, description: "A".repeat(100) })),
  });
  const restored = cache.readCachedState();
  assert.equal(restored.filters.hojaGastosId, "NEW");
  assert.equal(restored.page, 2);
  assert.equal(restored.scrollY, 700);
  assert.equal(restored.items.length, 0);
  assert.equal(cache.consumeReturnFlag(), true);
});

test("failed history writes cannot restore the previous filter as the new navigation", () => {
  const { api, reject } = createHarness();
  const cache = api.useHistoryFilterCache();
  cache.saveCachedFilter({ fromDate: "2026-09-01", toDate: "2026-09-01" });
  reject((key) => key === api.HISTORY_FILTER_KEY);
  api.setHistoryFilterForDate("2026-09-11", true);
  assert.equal(cache.readCachedFilter(), null);
  assert.equal(cache.consumeReturnFlag(), false);
});

test("logout prevents session reads and writes", () => {
  const { api, blockPersistence } = createHarness();
  api.setSessionValueWithExpiry("visitas_draft_test", "private", 1000);
  blockPersistence();
  assert.equal(api.getSessionValueWithExpiry("visitas_draft_test"), null);
  assert.equal(api.setSessionValueWithExpiry("visitas_draft_test", "late response", 1000), false);
});
