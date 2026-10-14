import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { build } from "esbuild";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const result = await build({
  entryPoints: [path.join(repositoryRoot, "Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlow.ts")],
  bundle: true,
  format: "cjs",
  platform: "node",
  external: ["react"],
  write: false,
  logLevel: "silent",
  plugins: [{
    name: "ticket-api-boundary",
    setup(builder) {
      builder.onLoad({ filter: /[\\/]expenseApi\.ts$/ }, () => ({
        contents: "export const createExpenseSheetTicketQuick = (...args) => globalThis.__ticketApi(...args);",
        loader: "ts",
      }));
    },
  }],
});

// Exercises the real upload hook and optimizer while replacing only the API and React scheduler.
const createHarness = (response) => {
  const state = [];
  let cursor = 0;
  let cacheOpens = 0;
  const requests = [];
  const completed = [];
  const caches = { open: () => { cacheOpens += 1; throw new Error("Unexpected image persistence"); } };
  const react = {
    useCallback: (callback) => callback,
    useMemo: (callback) => callback(),
    useEffect: () => {},
    useRef: (initial) => {
      const index = cursor++;
      if (!(index in state)) state[index] = { current: initial };
      return state[index];
    },
    useState: (initial) => {
      const index = cursor++;
      if (!(index in state)) state[index] = typeof initial === "function" ? initial() : initial;
      return [state[index], (value) => { state[index] = typeof value === "function" ? value(state[index]) : value; }];
    },
  };
  const context = vm.createContext({
    module: { exports: {} }, exports: {},
    require: (name) => { assert.equal(name, "react"); return react; },
    __ticketApi: async (payload, options) => {
      requests.push({ payload, options });
      if (response instanceof Error) throw response;
      return response;
    },
    window: {
      __IND_ENTRA_OID__: "user-a", __IND_SELECTED_COMPANY__: "ceu", caches,
      IND: { browserState: { isPersistenceAllowed: () => true }, flashActionMark: () => {} },
    },
    caches,
    document: { documentElement: { lang: "en" } }, navigator: { language: "en" },
    sessionStorage: { setItem: () => {} },
    console: { info: () => {}, warn: () => {}, error: () => {} },
    File, Blob, URL,
  });
  vm.runInContext(result.outputFiles[0].text, context);
  const render = () => {
    cursor = 0;
    return context.module.exports.useExpenseSheetQuickTicketFlow({
      sheetId: "SHEET-1", projectId: "PROJECT-1", currencyCode: "EUR",
      canCreateExpense: true, isCreateMode: false, isSheetLocked: false,
      onForbidden: () => assert.fail("Unexpected permission failure"),
      onCompleted: (value) => completed.push(value),
    });
  };
  return { render, requests, completed, getCacheOpens: () => cacheOpens };
};

test("ticket success uploads the selected file and completes without browser image persistence", async () => {
  const harness = createHarness({ Success: true, Data: { FileId: "FILE-1", LinkedToSheet: true, ProcessedByAI: true } });
  const file = new File(["receipt"], "receipt.jpg", { type: "image/jpeg" });
  await harness.render().handleSelectedFile(file, "gallery");
  assert.equal(harness.requests.length, 1);
  assert.equal(harness.requests[0].payload.ticketImage, file);
  assert.equal(harness.requests[0].payload.existingHojaGastosId, "SHEET-1");
  assert.equal(harness.completed.length, 1);
  assert.equal(harness.completed[0].fileId, "FILE-1");
  assert.equal(harness.render().busy, false);
  assert.equal(harness.getCacheOpens(), 0);
});

test("ticket failures retain error handling and a new attempt leaves no orphan image cache", async () => {
  const harness = createHarness(new Error("Upload unavailable"));
  const file = new File(["receipt"], "receipt.jpg", { type: "image/jpeg" });
  await harness.render().handleSelectedFile(file, "gallery");
  assert.equal(harness.render().busy, false);
  assert.ok(harness.render().errorMessage.length > 0);
  harness.render().clearError();
  assert.equal(harness.render().errorMessage, "");
  await harness.render().handleSelectedFile(file, "gallery");
  assert.equal(harness.requests.length, 2);
  assert.equal(harness.completed.length, 0);
  assert.equal(harness.getCacheOpens(), 0);
});
