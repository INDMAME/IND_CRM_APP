import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { build } from "esbuild";

const root = path.resolve(import.meta.dirname, "..");
const pagePath = path.join(root, "Web/wwwroot/react/src/pages/gastos/line/ExpenseSheetLineDetailPage.tsx");
const hookPath = path.join(root, "Web/wwwroot/react/src/pages/gastos/line/useExpenseSheetLineDetailState.ts");
const bundle = await build({
  entryPoints: [hookPath],
  bundle: true,
  format: "cjs",
  platform: "node",
  external: ["react"],
  write: false,
  logLevel: "silent",
  plugins: [{
    name: "line-detail-boundaries",
    setup(builder) {
      builder.onLoad({ filter: /[\\/]expenseApi\.ts$/ }, () => ({
        contents: `
          export const fetchExpenseSheetDetail = (id) => globalThis.__fetchDetail(id);
          export const getExpenseSheetDefaultCurrencyCode = async () => "EUR";
          export const fetchExistingExpenseProjectId = async (id) => id;
          export const getFuelPriceKm = async () => { throw new Error("Unexpected fuel lookup"); };
          export const mapExpenseSheetHeader = (sheet) => sheet.header;
          export const mapExpenseSheetLine = (line) => line;
        `,
        loader: "ts",
      }));
      builder.onLoad({ filter: /[\\/]expenseNavigation\.ts$/ }, () => ({
        contents: `
          export const setExpenseNavigationGuard = () => {};
          export const clearExpenseNavigationGuard = () => {};
          export const navigateToExpenseUrl = () => true;
        `,
        loader: "ts",
      }));
      builder.onLoad({ filter: /[\\/]indI18n\.ts$/ }, () => ({
        contents: "export const indT = (_key, fallback) => fallback;",
        loader: "ts",
      }));
    },
  }],
});

const nextTurn = () => new Promise((resolve) => setImmediate(resolve));
const settle = async () => {
  for (let index = 0; index < 4; index += 1) await nextTurn();
};

// Runs the real hook with stable React state and effect cleanup across renders.
const createHarness = (record = {}) => {
  const slots = [];
  const requests = [];
  const queuedResponses = [];
  let cursor = 0;
  let effects = [];
  let forbiddenCount = 0;
  let currentRecord = record;
  let currentArgs = {
    hasAccess: true,
    allowSelfManagement: false,
    canManageOtherUsers: false,
    currentAxUserId: "",
    currentCrmUserId: "",
    selectedManagedUserId: "",
    managementBootstrapReady: false,
    sheetId: "HG-1",
    lineId: "",
    isCreateMode: true,
    startInEditMode: false,
    onForbidden: () => { forbiddenCount += 1; },
  };
  const sameDeps = (left, right) => left && right && left.length === right.length &&
    left.every((value, index) => Object.is(value, right[index]));
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { value: typeof initial === "function" ? initial() : initial };
      return [slots[index].value, (value) => {
        slots[index].value = typeof value === "function" ? value(slots[index].value) : value;
      }];
    },
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
        effects.push(() => {
          cleanup?.();
          slots[index].cleanup = callback();
        });
      }
    },
  };
  const context = vm.createContext({
    module: { exports: {} },
    exports: {},
    require: (name) => { assert.equal(name, "react"); return react; },
    __fetchDetail: (id) => {
      requests.push(id);
      if (queuedResponses.length) return queuedResponses.shift();
      return Promise.resolve({
        Success: true,
        Items: [{
          HojaGastosId: id,
          header: {
            userId: currentRecord.ownerCrm ?? "CRM-A",
            ownerAxUserId: currentRecord.ownerAx ?? "AX-A",
            expenseSheetStatus: currentRecord.status ?? 0,
            voucher: currentRecord.voucher ?? "",
            projId: "P-1",
            currencyCode: "EUR",
          },
        }],
      });
    },
    window: {},
    document: { documentElement: { lang: "en" } },
    navigator: { language: "en" },
    setTimeout,
    clearTimeout,
    AbortController,
    DOMException,
  });
  vm.runInContext(bundle.outputFiles[0].text, context);
  const render = (nextArgs = {}) => {
    currentArgs = { ...currentArgs, ...nextArgs };
    cursor = 0;
    const result = context.module.exports.useExpenseSheetLineDetailState(currentArgs);
    const pending = effects;
    effects = [];
    pending.forEach((effect) => effect());
    return result;
  };
  return {
    render,
    requests,
    queueResponse: (response) => queuedResponses.push(response),
    setRecord: (nextRecord) => { currentRecord = nextRecord; },
    forbiddenCount: () => forbiddenCount,
  };
};

test("the page forwards management readiness to the line hook", async () => {
  const page = await readFile(pagePath, "utf8");
  const hookCall = page.match(/useExpenseSheetLineDetailState\(\{([\s\S]*?)\}\)/u)?.[1];
  assert.ok(hookCall, "Expense line hook call was not found");
  assert.match(hookCall, /\bmanagementBootstrapReady\b/u);
});

test("empty management cache waits without denial or writes, then resumes for its owner", async () => {
  const harness = createHarness();
  harness.render();
  await settle();
  const pending = harness.render();
  assert.equal(harness.forbiddenCount(), 0);
  assert.equal(harness.requests.length, 0);
  assert.equal(pending.isLoading, true);
  assert.equal(pending.canCreateExpenseCurrent, false);
  assert.equal(pending.isEditing, false);

  harness.render({ managementBootstrapReady: true, currentAxUserId: "AX-A", currentCrmUserId: "CRM-A" });
  await settle();
  const ready = harness.render();
  assert.equal(harness.requests.length, 1);
  assert.equal(harness.forbiddenCount(), 0);
  assert.equal(ready.isLoading, false);
  assert.equal(ready.canCreateExpenseCurrent, true);
  assert.equal(ready.isEditing, true);
});

test("the same CRM owner can create with a different AX owner id", async () => {
  const harness = createHarness({ ownerCrm: "CRM-A", ownerAx: "AX-B" });
  harness.render({ managementBootstrapReady: true, currentAxUserId: "AX-A", currentCrmUserId: "CRM-A" });
  await settle();
  const ready = harness.render();
  assert.equal(harness.forbiddenCount(), 0);
  assert.equal(ready.canCreateExpenseCurrent, true);
  assert.equal(ready.isEditing, true);
});

test("a loaded editor locks immediately when management starts loading again", async () => {
  const harness = createHarness();
  harness.render({ managementBootstrapReady: true, currentAxUserId: "AX-A", currentCrmUserId: "CRM-A" });
  await settle();
  assert.equal(harness.render().canCreateExpenseCurrent, true);

  const pending = harness.render({ managementBootstrapReady: false, currentAxUserId: "", currentCrmUserId: "" });
  assert.equal(pending.isLoading, true);
  assert.equal(pending.canCreateExpenseCurrent, false);
  assert.equal(pending.canEditExpenseCurrent, false);
  assert.equal(pending.isSheetLocked, true);
  assert.equal(harness.forbiddenCount(), 0);
});

test("unknown and foreign owners remain blocked after bootstrap", async (context) => {
  for (const entry of [
    { name: "unknown identity", record: {}, identity: {} },
    { name: "foreign CRM owner", record: { ownerCrm: "CRM-B", ownerAx: "AX-A" }, identity: { currentAxUserId: "AX-A", currentCrmUserId: "CRM-A" } },
  ]) {
    await context.test(entry.name, async () => {
      const harness = createHarness(entry.record);
      harness.render({ managementBootstrapReady: true, ...entry.identity });
      await settle();
      const result = harness.render();
      assert.equal(harness.forbiddenCount(), 1);
      assert.equal(result.canCreateExpenseCurrent, false);
      assert.equal(result.isEditing, false);
    });
  }
});

test("paid, voucher, and non-editable sheets remain locked", async (context) => {
  for (const record of [
    { name: "paid", status: 4 },
    { name: "voucher", status: 0, voucher: "V-1" },
    { name: "approval requested", status: 1 },
  ]) {
    await context.test(record.name, async () => {
      const harness = createHarness(record);
      harness.render({ managementBootstrapReady: true, currentAxUserId: "AX-A", currentCrmUserId: "CRM-A" });
      await settle();
      const result = harness.render();
      assert.equal(result.canCreateExpenseCurrent, false);
      assert.equal(result.isEditing, false);
      assert.equal(result.isSheetLocked, true);
    });
  }
});

test("a cancelled response cannot update the line after management context changes", async () => {
  const harness = createHarness();
  let resolveOld;
  const oldResponse = new Promise((resolve) => { resolveOld = resolve; });
  harness.queueResponse(oldResponse);
  harness.render({ managementBootstrapReady: true, currentAxUserId: "AX-A", currentCrmUserId: "CRM-A" });
  await settle();
  assert.equal(harness.requests.length, 1);

  harness.render({ managementBootstrapReady: false, currentAxUserId: "", currentCrmUserId: "" });
  resolveOld({ Success: true, Items: [{ HojaGastosId: "HG-1", header: { userId: "CRM-A", ownerAxUserId: "AX-A", expenseSheetStatus: 0 } }] });
  await settle();
  const pending = harness.render();
  assert.equal(pending.header, null);
  assert.equal(pending.line, null);
  assert.equal(pending.canCreateExpenseCurrent, false);
  assert.equal(harness.forbiddenCount(), 0);

  harness.setRecord({ ownerCrm: "CRM-B", ownerAx: "AX-B" });
  harness.render({ managementBootstrapReady: true, currentAxUserId: "AX-B", currentCrmUserId: "CRM-B", sheetId: "HG-2" });
  await settle();
  const ready = harness.render();
  assert.equal(harness.requests.at(-1), "HG-2");
  assert.equal(ready.header.userId, "CRM-B");
  assert.equal(ready.canCreateExpenseCurrent, true);
  assert.equal(harness.forbiddenCount(), 0);
});
