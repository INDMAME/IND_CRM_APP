import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { transformSync } from "esbuild";

const sourceRoot = path.resolve(import.meta.dirname, "../Web/wwwroot/react/src");
const noop = () => {};
const i18n = {
  indT: (key, fallback) => fallback || key,
  indFormat: (key, fallback, ...values) => fallback.replace(/\{(\d+)\}/g, (_, index) => values[index]),
};

// Executes the production modules while replacing browser, React, and HTTP boundaries.
function createSourceLoader(mocks = {}, globals = {}) {
  const cache = new Map();
  const load = (file) => {
    file = path.resolve(file);
    const fileName = path.basename(file);
    if (Object.hasOwn(mocks, fileName)) return mocks[fileName];
    if (cache.has(file)) return cache.get(file).exports;
    const source = readFileSync(file, "utf8");
    const code = transformSync(source, {
      loader: file.endsWith("tsx") ? "tsx" : "ts",
      format: "cjs",
      jsx: "transform",
    }).code;
    const module = { exports: {} };
    cache.set(file, module);
    vm.runInNewContext(code, {
      module,
      exports: module.exports,
      console,
      URL,
      URLSearchParams,
      Intl,
      setTimeout,
      clearTimeout,
      ...globals,
      require: (id) => Object.hasOwn(mocks, id) ? mocks[id] : load(path.resolve(path.dirname(file), id)),
    }, { filename: file });
    return module.exports;
  };
  return (relativePath) => load(path.resolve(sourceRoot, relativePath));
}

const numberFormat = createSourceLoader()("pages/gastos/utils/expenseNumberFormat.ts");

test("exchange-rate decimals keep their value with either decimal separator and seven-digit display", () => {
  for (const [input, expected] of [["100.125", 100.125], ["100,125", 100.125], ["0.925", 0.925], ["0,925", 0.925], ["100.1250000", 100.125], ["123.1234567", 123.1234567]]) {
    assert.equal(numberFormat.parseExpenseExchangeRateInput(input), expected, input);
    const displayed = numberFormat.formatExpenseInputNumber(input, {
      minimumFractionDigits: 7,
      maximumFractionDigits: 7,
      preferDecimalSeparator: true,
    });
    assert.equal(numberFormat.parseExpenseExchangeRateInput(displayed), expected, displayed);
  }
});

test("money grouping and unambiguous grouped rate values retain existing support", () => {
  for (const input of ["1,234", "1.234"]) assert.equal(numberFormat.parseExpenseNumericInput(input), 1234);
  for (const input of ["1,234.56", "1.234,56"]) assert.equal(numberFormat.parseExpenseNumericInput(input), 1234.56);
  for (const input of ["1,234,567", "1.234.567"]) assert.equal(numberFormat.parseExpenseExchangeRateInput(input), 1234567);
  for (const input of ["1,234.5670000", "1.234,5670000"]) assert.equal(numberFormat.parseExpenseExchangeRateInput(input), 1234.567);
  assert.equal(numberFormat.formatExpenseInputNumber("1234.56"), "1,234.56");
  assert.equal(numberFormat.parseExpenseExchangeRateInput(""), null);
});

test("the actual rate field blur and ticket mutation send the same rate and reimbursement for equivalent decimals", async () => {
  const posted = [];
  const react = { useCallback: (callback) => callback, useId: () => "audit", createElement: (type, props, ...children) => ({ type, props: { ...props, children } }) };
  const load = createSourceLoader({
    react,
    "indI18n.ts": i18n,
    "permissions.ts": { showPermissionModal: noop },
    "visitasHistory.ts": { flashActionMark: noop },
    "InfoPopoverIconButton.tsx": { default: noop },
    "ExpenseCurrencyFilterSelect.tsx": { default: noop },
    "expenseUiUtils.ts": { safeText: (value) => String(value ?? "").trim() },
    "apiService.ts": { ApiFetchError: class extends Error {} },
    "expenseApi.ts": { updateExpenseSheetTicket: async (fileId, payload) => { posted.push(payload); return { Success: true }; } },
  }, { window: {} });
  const Fields = load("pages/gastos/components/ExpenseCurrencySettlementFields.tsx").default;
  const { calculateExpenseLineAmountMST } = load("pages/gastos/utils/expenseLineCurrency.ts");
  const { useExpenseTicketDetailMutations } = load("pages/gastos/tickets/detail/useExpenseTicketDetailMutations.ts");
  for (const input of ["100.125", "100.1250000", "100,125"]) {
    let committed;
    const tree = Fields({ isEditing: true, expenseCurrencyCode: "USD", localCurrencyCode: "EUR", exchangeRate: input, amountCurrency: "100.00", amountCurrencyMode: "editable", reimbursementAmount: "100.00", onExchangeRateCommit: (value) => { committed = value; } });
    const visit = (element) => {
      if (!element) return;
      if (Array.isArray(element)) return element.forEach(visit);
      if (element.type === "input" && element.props.id?.endsWith("-exchange-rate")) element.props.onBlur({ target: { value: input } });
      visit(element.props?.children);
    };
    visit(tree);
    assert.equal(committed, "100.1250000");
    const rate = numberFormat.parseExpenseExchangeRateInput(committed);
    const amountMST = calculateExpenseLineAmountMST(100, rate);
    const mutations = useExpenseTicketDetailMutations({
      busy: false, isEditing: true, canEditTicket: true, fileId: "LOCAL-AUDIT", draftDescription: "Audit",
      draftGastoType: "1", draftCurrencyCode: "USD", draftTotalAmount: "100.00", draftAmountMST: String(amountMST),
      draftExchangeRate: input, localCurrencyCode: "EUR", draftTransDate: "2026-09-09", draftTicketTime: "12:00",
      originalTicketDate: "2026-09-09", originalTicketTime: "12:00", draftComentario: "", draftUrlFile: "", draftFileName: "",
      saveStrategy: "ticket-only", setModalError: noop, setBusy: noop, setStatus: noop, setIsEditing: noop,
    });
    assert.equal(await mutations.handleUpdate(), true);
    assert.equal(posted.at(-1).exchRate, 100.125);
    assert.equal(posted.at(-1).amountMST, 99.88);
  }
});

// Keeps React refs stable across simulated renders and session state across remounts.
function createVisitHarness(fetchJson, storage = new Map(), search = "") {
  let refs = [];
  let cursor = 0;
  const messages = [];
  const state = { busy: false, location: { href: "", search } };
  const load = createSourceLoader({
    react: { useCallback: (callback) => callback, useRef: (initial) => refs[cursor++] ?? (refs[cursor - 1] = { current: initial }) },
    "apiService.ts": { fetchJson },
    "indI18n.ts": i18n,
    "permissions.ts": { showPermissionModal: noop },
    "visitasHistory.ts": { flashActionMark: noop, setHistoryFilterForDate: noop },
    "visitasStorage.ts": { VISIT_DRAFT_KEY: "draft", VISIT_CREATE_PROGRESS_KEY: "progress", CREATE_FRESH_PARAM: "fresh" },
    "sessionExpiry.ts": {
      getSessionJsonWithExpiry: (key) => storage.has(key) ? JSON.parse(storage.get(key)) : null,
      setSessionJsonWithExpiry: (key, value) => storage.set(key, JSON.stringify(value)),
      removeSessionValueWithExpiry: (key) => storage.delete(key),
    },
    "wait.ts": { wait: async () => {} },
  }, { window: { location: state.location }, sessionStorage: { removeItem: (key) => storage.delete(key) } });
  const { useCreateSubmit } = load("hooks/useCreateSubmit.ts");
  const defaults = {
    busy: false, modalOpen: true, canCreateVisit: true, canRollbackDelete: false,
    selectedClient: { value: "CLIENT" }, selectedContacts: [{ value: "CONTACT-A", text: "Contact A" }],
    visitType: "1", contactMethod: "0", defaultAsistenteTipo: "1", description: "Audit", transDate: "2026-09-09",
    comentarios: "Comment", antecedentes: "", conclusiones: "", setBusy: (value) => { state.busy = value; },
    setStatus: (message) => messages.push(message), setModalError: noop, setShowRequired: noop, openConfirm: noop, closeConfirm: noop,
  };
  return {
    render: (args = {}) => { cursor = 0; return useCreateSubmit({ ...defaults, ...args }); },
    remount: () => { refs = []; },
    storage, messages, state,
  };
}

test("a create-only user resumes the same activity and skips contacts already created", async () => {
  const calls = [];
  let failB = true;
  const harness = createVisitHarness(async (url, options) => {
    const body = options.body ? JSON.parse(options.body) : {};
    calls.push({ url, body });
    if (url === "/Visitas/CreateActivity") return { success: true, data: { RecId: "1000" } };
    if (body.contactoRecId === "CONTACT-B" && failB) { failB = false; throw new Error("Temporary failure"); }
    return { Success: true };
  });
  const args = { selectedContacts: [{ value: "CONTACT-A", text: "A" }, { value: "CONTACT-B", text: "B" }] };
  assert.equal(await harness.render(args).doCreate(), false);
  assert.match(harness.messages.at(-1), /Activity 1000 was created/);
  assert.equal(harness.state.busy, false);
  assert.equal(await harness.render(args).doCreate(), true);
  assert.equal(calls.filter((call) => call.url === "/Visitas/CreateActivity").length, 1);
  assert.equal(calls.filter((call) => call.body.contactoRecId === "CONTACT-A").length, 1);
  assert.equal(calls.filter((call) => call.body.contactoRecId === "CONTACT-B").length, 2);
  assert.equal(calls.at(-1).body.refRecIdActividad, "1000");
  assert.equal(harness.storage.has("progress"), false);
});

test("pending progress survives remount, but changed form data never creates a second activity", async () => {
  let activityCalls = 0;
  let fail = true;
  const harness = createVisitHarness(async (url) => {
    if (url === "/Visitas/CreateActivity") { activityCalls++; return { success: true, data: { RecId: "1000" } }; }
    if (fail) { fail = false; return { success: false, message: "Temporary failure" }; }
    return { success: true };
  });
  assert.equal(await harness.render().doCreate(), false);
  harness.remount();
  assert.equal(await harness.render({ description: "Changed description" }).doCreate(), false);
  assert.match(harness.messages.at(-1), /Activity 1000 already exists/);
  assert.equal(activityCalls, 1);
  assert.equal(await harness.render().doCreate(), true);
  assert.equal(activityCalls, 1);
});

test("all started contacts settle before rollback, and a successful rollback permits a clean retry", async () => {
  let releaseSlow;
  let slowFinished = false;
  let fail = true;
  let rollbackCalls = 0;
  let activityCalls = 0;
  const harness = createVisitHarness(async (url, options) => {
    if (url === "/Visitas/CreateActivity") return { success: true, data: { RecId: String(1000 + ++activityCalls) } };
    if (options.method === "DELETE") { assert.equal(slowFinished, true); rollbackCalls++; return { success: true }; }
    const body = JSON.parse(options.body);
    if (fail && body.contactoRecId === "CONTACT-A") throw new Error("Fast failure");
    if (fail) await new Promise((resolve) => { releaseSlow = () => { slowFinished = true; resolve(); }; });
    return { success: true };
  });
  const args = { canRollbackDelete: true, selectedContacts: [{ value: "CONTACT-A", text: "A" }, { value: "CONTACT-B", text: "B" }] };
  const attempt = harness.render(args).doCreate();
  await new Promise((resolve) => setImmediate(resolve));
  assert.equal(rollbackCalls, 0);
  assert.equal(harness.state.busy, true);
  releaseSlow();
  assert.equal(await attempt, false);
  assert.equal(rollbackCalls, 1);
  assert.equal(harness.storage.has("progress"), false);
  fail = false;
  assert.equal(await harness.render(args).doCreate(), true);
  assert.equal(activityCalls, 2);
});

for (const rollbackFailure of ["envelope", "network"]) {
  test(`failed rollback (${rollbackFailure}) keeps the existing activity for retry`, async () => {
    let activityCalls = 0;
    let failAssistant = true;
    const harness = createVisitHarness(async (url, options) => {
      if (url === "/Visitas/CreateActivity") { activityCalls++; return { success: true, data: { RecId: "1000" } }; }
      if (options.method === "DELETE") {
        if (rollbackFailure === "network") throw new Error("Network failure");
        return { success: false, message: "Delete rejected" };
      }
      if (failAssistant) { failAssistant = false; throw new Error("Assistant failed"); }
      return { success: true };
    });
    assert.equal(await harness.render({ canRollbackDelete: true }).doCreate(), false);
    assert.equal(harness.storage.has("progress"), true);
    assert.equal(await harness.render({ canRollbackDelete: true }).doCreate(), true);
    assert.equal(activityCalls, 1);
  });
}

test("concurrent submit calls are coalesced before React busy state rerenders", async () => {
  let releaseActivity;
  let activityCalls = 0;
  const harness = createVisitHarness(async (url) => {
    if (url === "/Visitas/CreateActivity") {
      activityCalls++;
      await new Promise((resolve) => { releaseActivity = resolve; });
      return { success: true, data: { RecId: "1000" } };
    }
    return { success: true };
  });
  const hook = harness.render();
  const first = hook.doCreate();
  assert.equal(await hook.doCreate(), false);
  releaseActivity();
  assert.equal(await first, true);
  assert.equal(activityCalls, 1);
});

test("explicit fresh creation ignores earlier partial progress and permissions remain enforced", async () => {
  const storage = new Map([["progress", JSON.stringify({ recId: "1000", signature: "old", completedContactIds: [] })]]);
  let calls = 0;
  const harness = createVisitHarness(async () => { calls++; return { success: true, data: { RecId: "1001" } }; }, storage, "?fresh=1");
  assert.equal(await harness.render({ canCreateVisit: false }).doCreate(), false);
  assert.equal(calls, 0);
  assert.equal(await harness.render({ selectedContacts: [] }).doCreate(), true);
  assert.equal(calls, 1);
});
