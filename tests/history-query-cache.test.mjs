import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { transformSync } from "esbuild";

const sourceRoot = path.resolve(import.meta.dirname, "../Web/wwwroot/react/src");
const immediate = () => new Promise((resolve) => setImmediate(resolve));
const sameDependencies = (left, right) => left && right && left.length === right.length && left.every((value, index) => Object.is(value, right[index]));

// Runs the real filter, request, and action hooks together with controlled HTTP completion.
function createHistory() {
  const slots = [];
  const modules = new Map();
  const requests = [];
  const timers = new Map();
  let cursor = 0;
  let timerId = 0;
  const React = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === "function" ? initial() : initial;
      return [slots[index], (value) => { slots[index] = typeof value === "function" ? value(slots[index]) : value; }];
    },
    useRef(initial) { return slots[cursor++] ??= { current: initial }; },
    useMemo(factory, dependencies) {
      const index = cursor++;
      if (!sameDependencies(slots[index]?.dependencies, dependencies)) slots[index] = { dependencies, value: factory() };
      return slots[index].value;
    },
    useCallback(callback, dependencies) { return React.useMemo(() => callback, dependencies); },
    useEffect(effect, dependencies) {
      const index = cursor++;
      if (sameDependencies(slots[index]?.dependencies, dependencies)) return;
      slots[index]?.cleanup?.();
      slots[index] = { dependencies, cleanup: effect() };
    },
  };
  const load = (file) => {
    if (modules.has(file)) return modules.get(file).exports;
    const module = { exports: {} };
    modules.set(file, module);
    vm.runInNewContext(transformSync(readFileSync(file, "utf8"), { loader: "ts", format: "cjs" }).code, {
      module, exports: module.exports, AbortController, Date, console,
      clearTimeout: (id) => timers.delete(id),
      window: { setTimeout: (callback) => { timers.set(++timerId, callback); return timerId; } },
      document: { querySelector: () => null },
      fetch: (url, options) => new Promise((resolve, reject) => requests.push({
        url, signal: options.signal, reject,
        complete: (id = "ACT-1") => resolve({ ok: true, status: 200, text: async () => JSON.stringify({ items: [{ actividadId: id }], total: 1 }) }),
      })),
      require: (id) => id === "react" ? React : load(path.resolve(path.dirname(file), id)),
    }, { filename: file });
    return module.exports;
  };
  const { useHistoryFiltersState } = load(path.join(sourceRoot, "pages/visitas/historial/useHistoryFiltersState.ts"));
  const { useHistoryActivities } = load(path.join(sourceRoot, "hooks/useHistoryActivities.ts"));
  const { useHistoryFilterActions } = load(path.join(sourceRoot, "pages/visitas/historial/useHistoryFilterActions.ts"));
  const toISO = (value) => value.toISOString().slice(0, 10);
  const startOfDay = (value) => new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
  const normalizeRange = (from, to) => ({ from, to });
  const render = () => {
    cursor = 0;
    const filters = useHistoryFiltersState({ defaultFromDate: "", defaultToDate: "", logHistory() {}, parseDateValue: (value) => new Date(value), parseISO: (value) => new Date(value), toISO, startOfDay, isBefore: (a, b) => a < b });
    const data = useHistoryActivities({ fromDateValue: filters.fromDateValue, toDateValue: filters.toDateValue, accountNumValue: filters.accountNumValue, ownerAxUserIdValue: "", pageSize: 10, normalizeRange, onForbidden() {} });
    const actions = useHistoryFilterActions({ ...filters, ...data, ownerAxUserIdValue: "", normalizeRange, clearFilterCache() {} });
    return { filters, data, actions };
  };
  const applyQuickRange = () => {
    render().filters.handleQuickFilter("days-7");
    render().actions.applyFilters();
  };
  return { render, applyQuickRange, requests, timers, unmount: () => slots.forEach((slot) => slot?.cleanup?.()) };
}

test("reset and clear allow the same range to load again", async () => {
  for (const action of ["handleResetFilters", "handleClear"]) {
    const history = createHistory();
    history.applyQuickRange(); history.requests[0].complete(); await immediate();
    assert.equal(history.render().data.items.length, 1);
    history.render().actions[action]({ stopPropagation() {} });
    assert.equal(history.render().data.items.length, 0);
    history.applyQuickRange();
    assert.equal(history.requests.length, 2);
    history.requests[1].complete(); await immediate();
    assert.equal(history.render().data.items.length, 1);
  }
});

test("an unsuccessful query can be retried with Apply", async () => {
  const history = createHistory();
  history.applyQuickRange(); history.requests[0].reject(new Error("Connection failed")); await immediate();
  assert.match(history.render().data.errorMessage, /Connection failed/);
  history.render().actions.applyFilters();
  assert.equal(history.requests.length, 2);
  history.requests[1].complete(); await immediate();
  assert.equal(history.render().data.errorMessage, "");
  assert.equal(history.render().data.items.length, 1);
});

test("pending and successful queries remain deduplicated until explicit refresh", async () => {
  const history = createHistory();
  history.applyQuickRange(); history.render().actions.applyFilters();
  assert.equal(history.requests.length, 1);
  history.requests[0].complete(); await immediate(); history.render().actions.applyFilters();
  assert.equal(history.requests.length, 1);
  assert.equal(history.render().data.items.length, 1);
  history.render().actions.applyFilters({ force: true });
  assert.equal(history.requests.length, 2);
});

test("reset rejects late success and late network errors without scheduling a retry", async () => {
  for (const fail of [false, true]) {
    const history = createHistory();
    history.render().data.retryOnNetworkErrorRef.current = true;
    history.applyQuickRange(); history.render().data.resetActivities();
    assert.equal(history.requests[0].signal.aborted, true);
    if (fail) history.requests[0].reject(new Error("Late connection failure"));
    else history.requests[0].complete("OLD");
    await immediate();
    const { data } = history.render();
    assert.equal(data.items.length, 0);
    assert.equal(data.errorMessage, "");
    assert.equal(data.isLoading, false);
    assert.equal(data.lastSignatureRef.current, "");
    assert.equal(history.timers.size, 0);
  }
});

test("loading an empty date range cancels the prior request and cannot restore its rows", async () => {
  const history = createHistory();
  history.applyQuickRange();
  await history.render().data.loadActivities(1, { fromDate: "", toDate: "" });
  assert.equal(history.requests[0].signal.aborted, true);
  history.requests[0].complete("OLD"); await immediate();
  assert.equal(history.render().data.items.length, 0);
  history.applyQuickRange();
  assert.equal(history.requests.length, 2);
});

test("cancellation allows a normal retry and clears loading", async () => {
  const history = createHistory();
  history.applyQuickRange();
  history.requests[0].reject(Object.assign(new Error("Canceled"), { name: "AbortError" })); await immediate();
  assert.equal(history.render().data.isLoading, false);
  history.render().actions.applyFilters();
  assert.equal(history.requests.length, 2);
});

test("an obsolete failure cannot invalidate or overwrite a newer successful query", async () => {
  const history = createHistory();
  history.applyQuickRange(); history.render().actions.applyFilters({ force: true });
  history.requests[1].complete("NEW"); await immediate();
  history.requests[0].reject(new Error("OLD")); await immediate();
  const { data, actions } = history.render();
  assert.equal(data.items[0].actividadId, "NEW");
  assert.equal(data.errorMessage, "");
  actions.applyFilters();
  assert.equal(history.requests.length, 2);
});

test("unmount invalidates pending work and cancels automatic retries", async () => {
  const history = createHistory();
  history.render().data.retryOnNetworkErrorRef.current = true;
  history.applyQuickRange(); history.unmount();
  history.requests[0].reject(new Error("Late connection failure")); await immediate();
  assert.equal(history.requests[0].signal.aborted, true);
  assert.equal(history.timers.size, 0);
});
