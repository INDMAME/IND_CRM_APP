import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { transformSync } from "esbuild";

const sourceRoot = path.resolve(import.meta.dirname, "../Web/wwwroot/react/src");
const componentPath = "components/commons/RemoteSearchCombobox.tsx";
const immediate = () => new Promise((resolve) => setImmediate(resolve));
const sameDependencies = (left, right) => left && right && left.length === right.length && left.every((value, index) => Object.is(value, right[index]));

// Runs production component handlers with persistent hooks, keyed unmounts, and controlled HTTP.
function createRenderer(entry = componentPath, boundary = {}) {
  const instances = new Map();
  const modules = new Map();
  const scrollListeners = new Set();
  let activeInstance;
  let visited;
  let effects;
  let dirty = false;
  let props;
  let tree;
  const clientCache = new Map();
  const React = {
    createElement: (type, nextProps, ...children) => ({ type, props: { ...nextProps, children } }),
    useState(initial) {
      const instance = activeInstance;
      const index = instance.cursor++;
      if (!(index in instance.slots)) instance.slots[index] = typeof initial === "function" ? initial() : initial;
      return [instance.slots[index], (value) => {
        const next = typeof value === "function" ? value(instance.slots[index]) : value;
        if (!Object.is(next, instance.slots[index])) dirty = true;
        instance.slots[index] = next;
      }];
    },
    useRef(initial) {
      const instance = activeInstance;
      const index = instance.cursor++;
      return instance.slots[index] ??= { current: initial };
    },
    useMemo(factory, dependencies) {
      const instance = activeInstance;
      const index = instance.cursor++;
      const previous = instance.slots[index];
      if (!previous || !sameDependencies(previous.dependencies, dependencies)) {
        instance.slots[index] = { dependencies, value: factory() };
      }
      return instance.slots[index].value;
    },
    useCallback(callback, dependencies) { return React.useMemo(() => callback, dependencies); },
    useEffect(effect, dependencies) {
      const instance = activeInstance;
      const index = instance.cursor++;
      const previous = instance.slots[index];
      if (previous && sameDependencies(previous.dependencies, dependencies)) return;
      const next = { dependencies, cleanup: previous?.cleanup };
      instance.slots[index] = next;
      effects.push(() => { next.cleanup?.(); next.cleanup = effect(); });
    },
  };
  const mocks = {
    "react": React,
    "FloatingList.tsx": { __esModule: true, default: "floating-list" },
    "Spinner.tsx": { __esModule: true, default: "spinner" },
    "chevrons.tsx": { SelectChevron: "chevron" },
    "useOutsideClick.ts": { useOutsideClick() {} },
    "useComboboxKeyboard.ts": { handleComboboxKeyDown() {} },
    "indI18n.ts": { indT: (_key, fallback) => fallback, indFormat: (_key, fallback, ...values) => fallback.replace(/\{(\d+)\}/g, (_, index) => values[index]) },
    "apiService.ts": { ApiFetchError: class extends Error {}, fetchJson: boundary.fetchJson },
    "expenseApi.ts": {},
    "browserStorageScope.ts": { captureSensitiveBrowserState: () => boundary.scope || "user-a:company-a:0" },
    "expenseActingUser.ts": { getExpenseActingUserOverride: () => boundary.actor || "AX-A" },
    "visitasStorage.ts": {
      getClientCache: (key) => clientCache.get(key) ?? null,
      hasClientCache: (key) => clientCache.has(key),
      setClientCache: (key, value) => clientCache.set(key, value),
      captureVisitLookupState: () => "scope",
      isVisitLookupStateCurrent: () => true,
    },
  };
  if (entry !== componentPath) mocks["RemoteSearchCombobox.tsx"] = { __esModule: true, default: "remote-search" };
  const load = (file) => {
    const mock = mocks[file] || mocks[path.basename(file)];
    if (mock) return mock;
    if (modules.has(file)) return modules.get(file).exports;
    const module = { exports: {} };
    modules.set(file, module);
    const code = transformSync(readFileSync(file, "utf8"), { loader: file.endsWith("tsx") ? "tsx" : "ts", format: "cjs" }).code;
    vm.runInNewContext(code, {
      module, exports: module.exports, console, AbortController, URLSearchParams,
      require: (id) => id === "react" ? React : load(path.resolve(path.dirname(file), id)),
    }, { filename: file });
    return module.exports;
  };
  const Component = load(path.join(sourceRoot, entry)).default;
  const resolve = (node, location) => {
    if (Array.isArray(node)) return node.map((child, index) => resolve(child, `${location}/${index}`));
    if (!node || typeof node !== "object") return node;
    if (typeof node.type === "function") {
      const key = `${location}:${node.type.name}:${node.props.key ?? ""}`;
      visited.add(key);
      if (!instances.has(key)) instances.set(key, { slots: [], cursor: 0 });
      activeInstance = instances.get(key);
      activeInstance.cursor = 0;
      return resolve(node.type(node.props), `${key}/child`);
    }
    if (node.props.ref && !node.props.ref.current) {
      const scrollElement = {
        scrollTop: 950, clientHeight: 100, scrollHeight: 1000,
        addEventListener: (_event, listener) => scrollListeners.add(listener),
        removeEventListener: (_event, listener) => scrollListeners.delete(listener),
      };
      node.props.ref.current = { ...scrollElement, parentElement: scrollElement };
    }
    return { ...node, props: { ...node.props, children: resolve(node.props.children, `${location}/children`) } };
  };
  const render = (nextProps = props) => {
    props = nextProps;
    for (let pass = 0; pass < 10; pass++) {
      dirty = false; visited = new Set(); effects = [];
      tree = resolve(React.createElement(Component, props), "root");
      for (const [key, instance] of instances) {
        if (visited.has(key)) continue;
        for (const slot of instance.slots) slot?.cleanup?.();
        instances.delete(key);
      }
      effects.forEach((effect) => effect());
      if (!dirty) return tree;
    }
    throw new Error("Render did not settle");
  };
  return { render, scroll: () => scrollListeners.forEach((listener) => listener()) };
}

// Finds rendered controls without replacing their production event handlers.
const findAll = (tree, predicate) => {
  if (Array.isArray(tree)) return tree.flatMap((child) => findAll(child, predicate));
  if (!tree || typeof tree !== "object") return [];
  return [...(predicate(tree) ? [tree] : []), ...findAll(tree.props?.children, predicate)];
};
const findInput = (tree) => findAll(tree, (node) => node.type === "input")[0];
const findArrow = (tree) => findAll(tree, (node) => node.type === "button" && /options$/.test(node.props["aria-label"] || ""))[0];
const findSearch = (tree) => findAll(tree, (node) => node.type === "button" && node.props["aria-label"] === "Search")[0];
const visibleOptions = (tree) => findAll(tree, (node) => node.type === "floating-list" && node.props.open)
  .flatMap((list) => findAll(list, (node) => node.props?.role === "option").map((option) => option.props.id));
const isLoading = (tree) => findAll(tree, (node) => node.type === "spinner").length > 0;
const baseProps = {
  label: "Sheet", placeholder: "", value: "", onChange() {}, onSearch: async () => [],
  idBase: "sheet", minSearchLength: 0, pageSize: 2, allowEmptySearch: true, loadOnOpen: true, infiniteScroll: true,
};

for (const openSearchMode of ["current-value", "empty-query"]) {
  test(`changed query scope restarts page 1 without mixing owners (${openSearchMode})`, async () => {
    const renderer = createRenderer();
    const calls = [];
    const load = (owner) => async (_term, page) => {
      calls.push(`${owner}:${page}`);
      return { items: [1, 2].map((index) => ({ value: `${owner}-${(page - 1) * 2 + index}` })), total: 4 };
    };
    let props = { ...baseProps, queryScope: "owner-a", openSearchMode, onSearchPage: load("A") };
    let tree = renderer.render(props);
    findArrow(tree).props.onClick(); await immediate(); tree = renderer.render();
    assert.deepEqual(visibleOptions(tree), ["sheet-opt-A-1", "sheet-opt-A-2"]);
    findArrow(tree).props.onClick(); tree = renderer.render({ ...props, onSearchPage: load("A") });
    findArrow(tree).props.onClick(); tree = renderer.render();
    assert.equal(calls.length, 1, "same scope retains cached options despite a recreated callback");
    findArrow(tree).props.onClick(); renderer.render();
    props = { ...props, queryScope: "owner-b", onSearchPage: load("B") };
    tree = renderer.render(props); findArrow(tree).props.onClick(); await immediate(); tree = renderer.render();
    assert.deepEqual(visibleOptions(tree), ["sheet-opt-B-1", "sheet-opt-B-2"]);
    renderer.scroll(); renderer.scroll(); await immediate(); tree = renderer.render();
    assert.deepEqual(visibleOptions(tree), ["sheet-opt-B-1", "sheet-opt-B-2", "sheet-opt-B-3", "sheet-opt-B-4"]);
    assert.deepEqual(calls, ["A:1", "B:1", "B:2"]);
  });
}

for (const paged of [true, false]) {
  test(`editing the input ignores an older empty response and allows the next search (paged=${paged})`, async () => {
    const renderer = createRenderer();
    let value = "OLD";
    let complete;
    let signal;
    const load = (nextSignal) => {
      signal = nextSignal; return new Promise((resolve) => { complete = resolve; });
    };
    let props = { ...baseProps, value, onChange: (next) => { value = next; },
      onSearch: (_term, nextSignal) => load(nextSignal),
      onSearchPage: paged ? (_term, _page, _size, nextSignal) => load(nextSignal) : undefined,
    };
    let tree = renderer.render(props); findSearch(tree).props.onClick(); tree = renderer.render();
    findInput(tree).props.onChange({ target: { value: "NEW" } }); props = { ...props, value }; renderer.render(props);
    complete(paged ? { items: [], total: 0 } : []); await immediate(); tree = renderer.render({ ...props, value });
    assert.equal(value, "NEW");
    assert.equal(signal.aborted, true);
    assert.equal(isLoading(tree), false);
    assert.ok(findSearch(tree));
    assert.deepEqual(visibleOptions(tree), []);
  });
}

test("an obsolete rejection cannot clear a newer request's loading state", async () => {
  const renderer = createRenderer();
  const requests = [];
  let value = "OLD";
  let props = { ...baseProps, value, onChange: (next) => { value = next; }, onSearchPage: () => new Promise((resolve, reject) => requests.push({ resolve, reject })) };
  let tree = renderer.render(props); findSearch(tree).props.onClick(); tree = renderer.render();
  findInput(tree).props.onChange({ target: { value: "NEW" } }); props = { ...props, value }; tree = renderer.render(props);
  assert.ok(findSearch(tree)); findSearch(tree).props.onClick(); renderer.render();
  requests[0].reject(new Error("Old request failed")); await immediate(); tree = renderer.render();
  assert.equal(isLoading(tree), true);
  requests[1].resolve({ items: [{ value: "NEW" }], total: 1 }); await immediate(); tree = renderer.render();
  assert.equal(isLoading(tree), false);
  assert.deepEqual(visibleOptions(tree), ["sheet-opt-NEW"]);
});

test("changing scope aborts pending work and ignores its late completion", async () => {
  const renderer = createRenderer();
  let completeOld;
  let oldSignal;
  let props = { ...baseProps, queryScope: "owner-a", onSearchPage: (_term, _page, _size, signal) => {
    oldSignal = signal; return new Promise((resolve) => { completeOld = resolve; });
  } };
  let tree = renderer.render(props); findArrow(tree).props.onClick(); renderer.render();
  props = { ...props, queryScope: "owner-b", onSearchPage: async () => ({ items: [{ value: "B" }], total: 1 }) };
  tree = renderer.render(props); findArrow(tree).props.onClick(); await immediate(); tree = renderer.render();
  completeOld({ items: [{ value: "A" }], total: 1 }); await immediate(); tree = renderer.render();
  assert.equal(oldSignal.aborted, true);
  assert.deepEqual(visibleOptions(tree), ["sheet-opt-B"]);
});

test("consumer scopes include owner, business filters, and browser identity", () => {
  const boundary = { scope: "user-a:company-a:0", actor: "AX-A" };
  const sheet = createRenderer("pages/gastos/components/ExpenseSheetFilterInput.tsx", boundary);
  const ticket = createRenderer("pages/gastos/components/ExpenseTicketFilterKeyInput.tsx", boundary);
  const project = createRenderer("pages/gastos/components/ExpenseProjectFilterInput.tsx", boundary);
  const scope = (renderer, props = {}) => renderer.render({ label: "Lookup", placeholder: "", value: "", onChange() {}, ...props }).props.queryScope;
  const sheetA = scope(sheet, { managedUserId: "AX-A" });
  assert.ok(sheetA);
  assert.notEqual(scope(sheet, { managedUserId: "AX-B" }), sheetA);
  assert.notEqual(scope(sheet, { managedUserId: "AX-A", includeSubordinates: true }), sheetA);
  const ticketA = scope(ticket);
  assert.notEqual(scope(ticket, { createdDateFrom: "2026-01-01" }), ticketA);
  assert.notEqual(scope(ticket, { createdDateTo: "2026-12-31" }), ticketA);
  assert.notEqual(scope(ticket, { fixedStatusFilter: 1 }), ticketA);
  assert.notEqual(scope(ticket, { mode: "link" }), ticketA);
  const projectA = scope(project);
  boundary.actor = "AX-B";
  assert.notEqual(scope(ticket), ticketA);
  assert.notEqual(scope(project), projectA);
  boundary.scope = "user-a:company-b:1";
  assert.notEqual(scope(sheet, { managedUserId: "AX-A" }), sheetA);
});

test("client pagination retains the searched term after selecting and reopening an option", async () => {
  const calls = [];
  const renderer = createRenderer("components/visitas/ClientSearchCombobox.tsx", { fetchJson: async (url) => {
    const params = new URL(url, "https://crm.test").searchParams;
    calls.push({ term: params.get("term"), page: Number(params.get("page")) });
    const page = Number(params.get("page"));
    return { items: params.get("term") === "inser" ? Array.from({ length: 10 }, (_, index) => ({ AccountNum: `C${(page - 1) * 10 + index}`, NombreComercial: `Insertec ${index}` })) : [] };
  } });
  let selected = null;
  let props = { value: selected, onSelected: (value) => { selected = value; } };
  let tree = renderer.render(props);
  findInput(tree).props.onChange({ target: { value: "inser" } }); tree = renderer.render();
  findArrow(tree).props.onClick(); await immediate(); tree = renderer.render();
  findAll(tree, (node) => node.props?.role === "option")[0].props.onClick();
  props = { ...props, value: selected }; tree = renderer.render(props);
  findArrow(tree).props.onClick(); renderer.render(); renderer.scroll(); await immediate(); tree = renderer.render();
  assert.deepEqual(calls, [{ term: "inser", page: 1 }, { term: "inser", page: 2 }]);
  assert.equal(visibleOptions(tree).length, 20);
});

test("client pagination shares a pending page when scroll fires twice before render", async () => {
  const calls = [];
  let complete;
  const renderer = createRenderer("components/visitas/ClientSearchCombobox.tsx", { fetchJson: async (url) => {
    const page = Number(new URL(url, "https://crm.test").searchParams.get("page")); calls.push(page);
    if (page === 2) return new Promise((resolve) => { complete = resolve; });
    return { items: Array.from({ length: 10 }, (_, index) => ({ AccountNum: `C${index}`, NombreComercial: `Insertec ${index}` })) };
  } });
  let tree = renderer.render({ value: null, onSelected() {} });
  findInput(tree).props.onChange({ target: { value: "inser" } }); tree = renderer.render();
  findArrow(tree).props.onClick(); await immediate(); renderer.render();
  renderer.scroll(); renderer.scroll();
  assert.deepEqual(calls, [1, 2]);
  complete({ items: [] }); await immediate();
});
