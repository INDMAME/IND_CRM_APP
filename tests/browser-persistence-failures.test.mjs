import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { transformSync } from "esbuild";

const sourceRoot = path.resolve(import.meta.dirname, "../Web/wwwroot/react/src");
const immediate = () => new Promise((resolve) => setImmediate(resolve));

// Runs real helpers, React handlers, and request builders with controlled browser failures.
function createHarness() {
  const values = new Map();
  const modules = new Map();
  const calls = [];
  const alerts = [];
  const slots = [];
  let cursor = 0;
  let pendingEffects = [];
  let rejectWrite = () => false;
  let rejectRemove = false;
  let rejectRead = false;
  let bypassed = 0;
  let allowed = true;
  let epoch = 0;
  let fetchResponse = async () => ({ Success: true, Items: [] });
  const storage = {
    get length() { return values.size; },
    key: (index) => [...values.keys()][index] ?? null,
    getItem(key) { if (rejectRead) throw new Error("Storage blocked"); return values.get(key) ?? null; },
    removeItem(key) { if (rejectRemove) throw new Error("Storage blocked"); values.delete(key); },
    setItem(key, value) { if (rejectWrite(key)) throw new Error("QuotaExceededError"); values.set(key, value); },
  };
  const browser = {
    __IND_ENTRA_OID__: "user-a", __IND_SELECTED_COMPANY__: "DAT",
    IND: { browserState: { isPersistenceAllowed: () => allowed, getEpoch: () => epoch } },
    location: { pathname: "/Visitas/Create", search: "", href: "/original", reload() { this.href = "/reload"; }, replace(url) { this.href = url; } },
    history: { length: 2, back() { browser.location.href = "/back"; } },
    innerHeight: 900, alert: (message) => alerts.push(message),
    addEventListener: () => {}, removeEventListener: () => {},
    __indBypassNavigationGuardOnce() { bypassed += 1; },
  };
  const sameDeps = (a, b) => a && b && a.length === b.length && a.every((value, index) => Object.is(value, b[index]));
  const react = {
    createElement: (type, props, ...children) => ({ type, props: { ...props, children } }),
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { value: typeof initial === "function" ? initial() : initial };
      return [slots[index].value, (value) => { slots[index].value = typeof value === "function" ? value(slots[index].value) : value; }];
    },
    useRef(initial) { return react.useMemo(() => ({ current: initial }), []); },
    useMemo(factory, deps) {
      const index = cursor++;
      if (!slots[index] || !sameDeps(slots[index].deps, deps)) slots[index] = { value: factory(), deps };
      return slots[index].value;
    },
    useCallback(callback, deps) { return react.useMemo(() => callback, deps); },
    useEffect(callback, deps) {
      const index = cursor++;
      if (!slots[index] || !sameDeps(slots[index].deps, deps)) {
        const cleanup = slots[index]?.cleanup;
        slots[index] = { deps };
        pendingEffects.push(() => { cleanup?.(); slots[index].cleanup = callback(); });
      }
    },
  };
  class ApiFetchError extends Error { constructor(message, status) { super(message); this.status = status; } }
  const mocks = {
    "apiService.ts": {
      ApiFetchError, getCsrfToken: () => "",
      fetchJson: async (url, options) => {
        calls.push({ url, options });
        if (url.includes("entra/context")) return {
          Success: true, Items: [{ Header: { AxUserId: "SELF", DefaultCompany: "DAT" }, Companies: [{ CompanyId: "DAT", IsDefault: true, CurrencyCode: "EUR" }] }],
        };
        return fetchResponse(url, options);
      },
    },
    "AudioRecorderMinimal.tsx": { default: () => null },
    "PulseRingsMultipleIcon.tsx": { default: () => null },
    "reactIsland.tsx": { mountWhenDocumentReady: () => {}, mountReactIsland: () => {} },
  };
  const load = (file) => {
    file = path.resolve(file);
    if (mocks[path.basename(file)]) return mocks[path.basename(file)];
    if (modules.has(file)) return modules.get(file).exports;
    const module = { exports: {} };
    modules.set(file, module);
    const code = transformSync(readFileSync(file, "utf8"), { loader: file.endsWith("tsx") ? "tsx" : "ts", format: "cjs" }).code;
    vm.runInNewContext(code, {
      module, exports: module.exports, console, URL, URLSearchParams, Headers, DOMException, AbortController, TextEncoder, setTimeout, clearTimeout, Date,
      window: browser, sessionStorage: storage, document: { querySelector: () => null },
      require: (id) => id === "react" ? react : id.startsWith("@heroicons/") ? {} : load(path.resolve(path.dirname(file), id)),
    }, { filename: file });
    return module.exports;
  };
  return {
    load: (file) => load(path.join(sourceRoot, file)), values, calls, alerts, browser,
    reject: (predicate = () => true) => { rejectWrite = predicate; },
    rejectRemovals: (value) => { rejectRemove = value; },
    rejectReads: (value) => { rejectRead = value; },
    invalidate: () => { allowed = false; epoch += 1; },
    getBypass: () => bypassed,
    respond: (handler) => { fetchResponse = handler; },
    remount: () => { slots.forEach((slot) => slot.cleanup?.()); slots.length = 0; pendingEffects = []; },
    render: (component, props) => {
      cursor = 0;
      const result = component(props);
      const effects = pendingEffects;
      pendingEffects = [];
      effects.forEach((effect) => effect());
      return result;
    },
  };
}

// Locates the actual button and input callbacks in the rendered element tree.
function find(node, predicate) {
  if (!node || typeof node !== "object") return null;
  if (predicate(node)) return node;
  for (const child of node.props?.children?.flat(Infinity) || []) {
    const result = find(child, predicate);
    if (result) return result;
  }
  return null;
}

test("editor save retains new text and the navigation guard when quota is exhausted, then retries", () => {
  const h = createHarness();
  const storage = h.load("utils/textEditor.ts");
  storage.writeTextEditorValue("comment", "original");
  const editor = h.load("pages/system/TextEditor.tsx").default;
  const props = { fieldId: "comment", fieldLabel: "Comments", initialValue: "", returnUrl: "/Visitas/Create", allowEdit: true };
  let tree = h.render(editor, props);
  find(tree, (node) => node.type === "textarea").props.onChange({ target: { value: "NEW TEXT" } });
  tree = h.render(editor, props);
  h.reject();
  find(tree, (node) => node.props["aria-label"] === "Save").props.onClick();
  tree = h.render(editor, props);
  assert.equal(storage.readTextEditorValue("comment"), "original");
  assert.equal(find(tree, (node) => node.type === "textarea").props.value, "NEW TEXT");
  assert.ok(find(tree, (node) => node.props.role === "alert"));
  assert.equal(h.browser.location.href, "/original");
  assert.equal(h.getBypass(), 0);
  h.reject(() => false);
  find(tree, (node) => node.props["aria-label"] === "Save").props.onClick();
  assert.equal(storage.readTextEditorValue("comment"), "NEW TEXT");
  assert.equal(h.browser.location.href, "/Visitas/Create");
  assert.equal(h.getBypass(), 1);
});

test("editor does not leave when required edit-mode handoff cannot be written", () => {
  const h = createHarness();
  const editor = h.load("pages/system/TextEditor.tsx").default;
  const tree = h.render(editor, { fieldId: "comment", fieldLabel: "Comments", initialValue: "text", returnUrl: "/detail", editModeKey: "ind_visit_edit_example", allowEdit: true });
  h.reject((key) => key.endsWith("_return"));
  find(tree, (node) => node.props["aria-label"] === "Save").props.onClick();
  assert.equal(h.browser.location.href, "/original");
  assert.equal(h.getBypass(), 0);
});

test("read-only editor back navigation does not need a storage write", () => {
  const h = createHarness();
  const editor = h.load("pages/system/TextEditor.tsx").default;
  const tree = h.render(editor, { fieldId: "comment", fieldLabel: "Comments", initialValue: "text", returnUrl: "/detail", initialReadOnly: true });
  h.reject();
  find(tree, (node) => node.props["aria-label"] === "Back").props.onClick();
  assert.equal(h.browser.location.href, "/detail");
});

test("the live actor survives quota failure and headers use the newly selected actor", async () => {
  const h = createHarness();
  const actor = h.load("pages/gastos/utils/expenseActingUser.ts");
  actor.setExpenseActingUserOverride("AX-OLD");
  h.reject();
  actor.setExpenseActingUserOverride("AX-NEW");
  assert.equal(actor.getExpenseActingUserOverride(), "AX-NEW");
  const api = h.load("pages/gastos/utils/expenseApi.ts");
  api.configureExpenseApiAuth({ token: "test-token", entraOid: "user-a", appCode: "CRM" });
  await api.fetchExpenseSheetDetail("HG-NEW");
  assert.equal(h.calls.find((call) => call.url.includes("/expensesheets/")).options.headers["X-IND-AxUserId"], "AX-NEW");
  assert.equal([...h.values.keys()].some((key) => key.startsWith("expense_acting_user")), false);
});

for (const target of ["/Gastos/ExpenseSheetDetail?hojaGastosId=HG", "/Gastos/TicketDetail?fileId=TICKET"]) {
  test(`navigation retains the page until its actor can be restored: ${target}`, () => {
    const h = createHarness();
    const actor = h.load("pages/gastos/utils/expenseActingUser.ts");
    const navigation = h.load("pages/gastos/utils/expenseNavigation.ts");
    actor.setExpenseActingUserOverride("OLD");
    h.reject();
    actor.setExpenseActingUserOverride("NEW");
    navigation.navigateToExpenseUrl(target);
    assert.equal(h.browser.location.href, "/original");
    assert.equal(h.alerts.length, 1);
    assert.equal(h.getBypass(), 0);
    h.reject(() => false);
    navigation.navigateToExpenseUrl(target);
    assert.equal(h.browser.location.href, target);
    assert.equal(h.getBypass(), 1);
  });
}

test("self navigation removes the previous actor without needing a storage write", () => {
  const h = createHarness();
  const actor = h.load("pages/gastos/utils/expenseActingUser.ts");
  actor.setExpenseActingSignedInUser("SELF");
  actor.setExpenseActingUserOverride("OLD");
  h.reject();
  actor.setExpenseActingUserOverride("SELF");
  assert.equal(actor.ensureExpenseActingUserForNavigation(), true);
  assert.equal(actor.getExpenseActingUserOverride(), "SELF");
});

test("clearing an actor is immediate even if removing storage fails, and navigation remains blocked", () => {
  const h = createHarness();
  const actor = h.load("pages/gastos/utils/expenseActingUser.ts");
  actor.setExpenseActingUserOverride("OLD");
  h.rejectRemovals(true);
  actor.clearExpenseActingUserOverride();
  assert.equal(actor.getExpenseActingUserOverride(), "");
  assert.equal(actor.ensureExpenseActingUserForNavigation(), false);
});

test("blocked reads cannot be mistaken for a successfully removed previous actor", () => {
  const h = createHarness();
  const actor = h.load("pages/gastos/utils/expenseActingUser.ts");
  actor.setExpenseActingSignedInUser("SELF");
  actor.setExpenseActingUserOverride("OLD");
  h.reject();
  h.rejectRemovals(true);
  h.rejectReads(true);
  actor.setExpenseActingUserOverride("SELF");
  assert.equal(actor.getExpenseActingUserOverride(), "SELF");
  assert.equal(actor.ensureExpenseActingUserForNavigation(), false);
});

test("native replacement and reload use the same persistence guard", () => {
  const h = createHarness();
  const actor = h.load("pages/gastos/utils/expenseActingUser.ts");
  const navigation = h.load("pages/gastos/utils/expenseNavigation.ts");
  h.reject();
  actor.setExpenseActingUserOverride("OTHER");
  navigation.navigateToExpenseUrl("/detail", { replace: true });
  navigation.reloadExpensePage();
  assert.equal(h.browser.location.href, "/original");
  assert.equal(h.getBypass(), 0);
  h.reject(() => false);
  navigation.navigateToExpenseUrl("/detail", { replace: true });
  assert.equal(h.browser.location.href, "/detail");
  navigation.reloadExpensePage();
  assert.equal(h.browser.location.href, "/reload");
});

test("a confirmed creation can retry its blocked navigation without creating a second sheet", async () => {
  const h = createHarness();
  const api = h.load("pages/gastos/utils/expenseApi.ts");
  api.configureExpenseApiAuth({ token: "test-token", entraOid: "user-a", appCode: "CRM" });
  const actor = h.load("pages/gastos/utils/expenseActingUser.ts");
  actor.setExpenseActingUserOverride("OLD");
  let creates = 0;
  h.respond(async () => { creates += 1; return { Success: true, Data: { HojaGastosId: "HG-CREATED" } }; });
  const createdSheetIdRef = { current: "" };
  const mutations = h.load("pages/gastos/detail/useExpenseSheetDetailMutations.ts");
  const args = {
    busy: false, isEditing: true, isCreateMode: true, canCreateExpense: true,
    draftDescription: "New sheet", draftProjectId: "", draftEstadoComentarios: "", draftReimbursableExpense: 0,
    onCreateSuccess: (id) => { createdSheetIdRef.current = id; },
    setModalError: () => {}, setBusy: () => {}, setStatus: () => {}, setIsEditing: () => {},
  };
  const mutation = h.render(mutations.useExpenseSheetDetailMutations, args);
  assert.equal(await mutation.handleUpdate(), true);
  assert.equal(creates, 1);

  // Execute the actual success and route callbacks without mounting their unrelated UI hooks.
  const controller = readFileSync(path.join(sourceRoot, "pages/gastos/detail/useExpenseSheetDetailPageController.tsx"), "utf8");
  const state = readFileSync(path.join(sourceRoot, "pages/gastos/detail/useExpenseSheetDetailState.ts"), "utf8");
  const routeSource = state.slice(state.indexOf("  const navigateToCreatedSheet ="), state.indexOf("  const navigateToLineDetail ="));
  const successSource = controller.slice(controller.indexOf("  const handleSaveSuccess ="), controller.indexOf("  const handleStatusActionClick ="));
  const navigation = h.load("pages/gastos/utils/expenseNavigation.ts");
  let redirecting = false;
  let status = "";
  const module = { exports: {} };
  vm.runInNewContext(transformSync(routeSource + successSource + "\nmodule.exports = handleSaveSuccess;", { loader: "tsx", format: "cjs" }).code, {
    module, useCallback: (callback) => callback, safeText: (value) => String(value || "").trim(),
    navigateToExpenseUrl: navigation.navigateToExpenseUrl, reloadExpensePage: navigation.reloadExpensePage,
    createdSheetIdRef, isCreateMode: true, invalidateCachedListForRefetch: () => {}, saveExpenseSheetCreatedReturnContext: () => {},
    clearExpenseActingUserOverride: actor.clearExpenseActingUserOverride,
    setIsRedirectingAfterCreate: (value) => { redirecting = value; }, setStatus: (value) => { status = value; },
    indFormat: (key, fallback, id) => fallback.replace("{0}", id),
  });
  h.reject(); h.rejectReads(true); h.rejectRemovals(true);
  module.exports();
  assert.equal(redirecting, false);
  assert.equal(h.browser.location.href, "/original");
  assert.match(status, /HG-CREATED/);
  h.rejectReads(false); h.rejectRemovals(false);
  assert.equal(await mutation.handleUpdate(), true);
  assert.equal(creates, 1);
  module.exports();
  assert.equal(redirecting, true);
  assert.equal(h.browser.location.href, "/Gastos/ExpenseSheetDetail?hojaGastosId=HG-CREATED");
});

test("identity, company, and logout changes cannot reuse a live actor", () => {
  const h = createHarness();
  const actor = h.load("pages/gastos/utils/expenseActingUser.ts");
  h.reject();
  actor.setExpenseActingUserOverride("A");
  h.browser.__IND_ENTRA_OID__ = "user-b";
  assert.equal(actor.getExpenseActingUserOverride(), "");
  actor.setExpenseActingUserOverride("B");
  h.browser.__IND_SELECTED_COMPANY__ = "CEU";
  assert.equal(actor.getExpenseActingUserOverride(), "");
  actor.setExpenseActingUserOverride("C");
  h.invalidate();
  assert.equal(actor.getExpenseActingUserOverride(), "");
});

const visibilityArgs = { enabled: true, companyId: "DAT", axUserId: "SELF", permissionsRevision: "r1", appCode: "CRM", moduleCode: "VISITAS_GESTION" };
const oldUsers = [{ AxUserId: "OLD-SUBORDINATE", Name: "Old subordinate" }];

// Seeds the same cache through the production hook before a new page instance starts.
function seedVisibility(h) {
  const hook = h.load("hooks/useModuleDataVisibility.ts").useModuleDataVisibility;
  h.render(hook, { ...visibilityArgs, preloadedUsers: oldUsers, preloadedUsersSucceeded: true });
  h.remount();
  return hook;
}

test("successful empty preload replaces the previous users without another request", () => {
  const h = createHarness();
  const hook = seedVisibility(h);
  const args = { ...visibilityArgs, preloadedUsers: [], preloadedUsersSucceeded: true };
  h.render(hook, args);
  const result = h.render(hook, args);
  assert.equal(result.visibleUsers.length, 0);
  assert.equal(result.visibleUsersReady, true);
  assert.equal(h.calls.length, 0);
  assert.equal([...h.values.values()].some((value) => value.includes("OLD-SUBORDINATE")), false);
});

for (const succeeded of [false, undefined]) {
  test(`failed or unclassified empty preload bypasses the old cache (${succeeded})`, async () => {
    const h = createHarness();
    const hook = seedVisibility(h);
    h.respond(async () => ({ Success: false, Items: [], Message: "Unavailable" }));
    const args = { ...visibilityArgs, preloadedUsers: [], preloadedUsersSucceeded: succeeded };
    h.render(hook, args);
    await immediate();
    const result = h.render(hook, args);
    assert.equal(h.calls.length, 1);
    assert.equal(result.visibleUsers.length, 0);
    assert.equal(result.visibleUsersError, "Unavailable");
    assert.equal([...h.values.keys()].some((key) => key.startsWith("module_data_visibility")), false);
    h.respond(async () => ({ Success: true, Items: [{ AxUserId: "CURRENT" }] }));
    await result.loadVisibleUsers(true);
    assert.equal(h.render(hook, args).visibleUsers[0].axUserId, "CURRENT");
  });
}

test("an older request cannot overwrite a newer successful empty preload", async () => {
  const h = createHarness();
  const hook = seedVisibility(h);
  let finish;
  h.respond(() => new Promise((resolve) => { finish = resolve; }));
  const failed = { ...visibilityArgs, preloadedUsers: [], preloadedUsersSucceeded: false };
  h.render(hook, failed);
  const empty = { ...visibilityArgs, preloadedUsers: [], preloadedUsersSucceeded: true };
  h.render(hook, empty);
  finish({ Success: true, Items: oldUsers });
  await immediate();
  assert.equal(h.render(hook, empty).visibleUsers.length, 0);
});

test("a fresh visibility request error clears old cache and remains retryable", async () => {
  const h = createHarness();
  const hook = seedVisibility(h);
  h.respond(async () => { throw new Error("Offline"); });
  const args = { ...visibilityArgs, preloadedUsersSucceeded: false };
  h.render(hook, args);
  await immediate();
  const result = h.render(hook, args);
  assert.equal(result.visibleUsers.length, 0);
  assert.equal(result.visibleUsersError, "Offline");
  assert.equal([...h.values.keys()].some((key) => key.startsWith("module_data_visibility")), false);
  h.respond(async () => ({ Success: true, Items: [] }));
  await result.loadVisibleUsers(true);
  assert.equal(h.render(hook, args).visibleUsersError, "");
});
