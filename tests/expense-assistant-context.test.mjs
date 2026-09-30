import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { transformSync } from "esbuild";

const sourceRoot = path.resolve(import.meta.dirname, "../Web/wwwroot/react/src");
const filters = { fromDate: "2026-09-01", toDate: "2026-09-11", projectId: "", hojaGastosId: "", currencyCode: "", statusFilter: -1, managedUserId: "A", includeSubordinates: false };

// Connects the production list hook to the assistant hook without making an AI request.
function createAssistant() {
  const modules = new Map();
  const slots = [];
  const requests = [];
  const asks = [];
  let cursor = 0;
  let effects = [];
  const sameDeps = (a, b) => a && b && a.length === b.length && a.every((entry, index) => Object.is(entry, b[index]));
  const React = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { value: typeof initial === "function" ? initial() : initial };
      return [slots[index].value, (value) => { slots[index].value = typeof value === "function" ? value(slots[index].value) : value; }];
    },
    useRef(initial) { return React.useMemo(() => ({ current: initial }), []); },
    useMemo(factory, deps) {
      const index = cursor++;
      if (!sameDeps(slots[index]?.deps, deps)) slots[index] = { deps, value: factory() };
      return slots[index].value;
    },
    useCallback(callback, deps) { return React.useMemo(() => callback, deps); },
    useEffect(effect, deps) {
      const index = cursor++;
      if (sameDeps(slots[index]?.deps, deps)) return;
      const previous = slots[index];
      slots[index] = { deps };
      effects.push(() => { previous?.cleanup?.(); slots[index].cleanup = effect(); });
    },
  };
  class ApiFetchError extends Error { constructor(message, status) { super(message); this.status = status; } }
  const api = {
    fetchExpenseSheetList: (request, options) => new Promise((resolve, reject) => requests.push({
      reject,
      complete() {
        const response = { Success: true, Items: [{ HojaGastosId: `HG-${options.axUserIdOverride}`, Description: "Current" }], Total: 1, Page: request.page, PageSize: request.pageSize };
        options.onCapture({ request, response, axUserIdOverride: options.axUserIdOverride || null, source: "api" });
        resolve(response);
      },
    })),
    mapExpenseSheetListItemToCard: (item) => item,
    fetchExpenseSheetListSourceJson: async (_request, options) => options.seedResponse,
    askExpenseSheetsQuestion: async (request) => { asks.push(request); return { Success: true, Data: { Answer: "Summary" } }; },
  };
  const load = (file) => {
    file = path.resolve(file);
    if (path.basename(file) === "expenseApi.ts") return api;
    if (path.basename(file) === "apiService.ts") return { ApiFetchError };
    if (modules.has(file)) return modules.get(file).exports;
    const module = { exports: {} }; modules.set(file, module);
    vm.runInNewContext(transformSync(readFileSync(file, "utf8"), { loader: "ts", format: "cjs" }).code, {
      module, exports: module.exports, AbortController, DOMException, Date, Error, TypeError, TextEncoder, console, HTMLElement: class {},
      document: { documentElement: { lang: "en" }, activeElement: null, body: { style: {} } },
      window: { __IND_ENTRA_OID__: "user", __IND_SELECTED_COMPANY__: "DAT", IND: { browserState: { isPersistenceAllowed: () => true } }, requestAnimationFrame: () => 0, cancelAnimationFrame() {}, addEventListener() {}, removeEventListener() {} },
      require: (id) => id === "react" ? React : load(path.resolve(path.dirname(file), id)),
    }, { filename: file });
    return module.exports;
  };
  const { useExpenseSheetsListData } = load(path.join(sourceRoot, "pages/gastos/list/useExpenseSheetsListData.ts"));
  const { useExpenseSheetsAssistant } = load(path.join(sourceRoot, "pages/gastos/list/useExpenseSheetsAssistant.ts"));
  const render = () => {
    cursor = 0; effects = [];
    const list = useExpenseSheetsListData({ hasAccess: true, pageSize: 10, onForbidden() {} });
    const assistant = useExpenseSheetsAssistant({ context: list.assistantContext, isListLoading: list.isLoading, uiLanguage: "en" });
    effects.forEach((effect) => effect());
    return { list, assistant };
  };
  return { render, requests, asks };
}

test("changing actor or business filters invalidates the assistant until the new query succeeds", async () => {
  for (const changed of [{ managedUserId: "B" }, { projectId: "PROJECT-B" }]) {
    const h = createAssistant();
    const first = h.render().list.loadList(1, filters); h.requests[0].complete(); await first;
    assert.equal(h.render().assistant.hasContext, true);
    const next = h.render().list.loadList(1, { ...filters, ...changed });
    assert.equal(h.render().assistant.hasContext, false);
    h.requests[1].reject(new Error("Cannot read query")); await next;
    const { assistant } = h.render();
    assert.equal(assistant.hasContext, false);
    await assistant.retryQuestion("Summarize the expenses");
    assert.equal(h.asks.length, 0);
    const retry = h.render().list.loadList(1, { ...filters, ...changed }); h.requests[2].complete(); await retry;
    assert.equal(h.render().assistant.hasContext, true);
  }
});

test("a failed refresh also invalidates the previous successful assistant snapshot", async () => {
  const h = createAssistant();
  const first = h.render().list.loadList(1, filters); h.requests[0].complete(); await first;
  const refresh = h.render().list.loadList(1, filters); h.requests[1].reject(new Error("Cannot read query")); await refresh;
  assert.equal(h.render().assistant.hasContext, false);
});

test("paging the same query retains its valid context until the new page arrives", async () => {
  const h = createAssistant();
  const first = h.render().list.loadList(1, filters); h.requests[0].complete(); await first;
  const before = h.render().list.assistantContext;
  const nextPage = h.render().list.loadList(2, filters);
  assert.equal(h.render().list.assistantContext, before);
  h.requests[1].complete(); await nextPage;
  assert.equal(h.render().assistant.hasContext, true);
});

test("an older failed query cannot invalidate a newer successful assistant context", async () => {
  const h = createAssistant();
  const first = h.render().list.loadList(1, filters);
  const second = h.render().list.loadList(1, { ...filters, managedUserId: "B" }); h.requests[1].complete(); await second;
  h.requests[0].reject(new Error("Cannot read old query")); await first;
  const { list, assistant } = h.render();
  assert.equal(assistant.hasContext, true);
  assert.equal(list.assistantContext.lastExpenseSheetsListAxUserIdOverride, "B");
});
