import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import vm from "node:vm";
import { build } from "esbuild";

const repositoryRoot = path.resolve(import.meta.dirname, "..");
const contextDirectory = path.join(repositoryRoot, "Web/wwwroot/react/src/context");
const source = await readFile(path.join(contextDirectory, "AuthContext.tsx"), "utf8");
const result = await build({
  stdin: {
    contents: source + "\nexport const cacheTest = { read: readExpenseManagementCache, write: writeExpenseManagementCache };",
    resolveDir: contextDirectory,
    loader: "tsx",
  },
  bundle: true, format: "cjs", platform: "node", external: ["react"], write: false, logLevel: "silent",
  plugins: [{
    name: "management-api-boundary",
    setup(builder) {
      builder.onLoad({ filter: /[\\/]expenseApi\.ts$/ }, () => ({
        contents: "export const getExpenseApiContextSnapshot = () => globalThis.__managementApi(); export const getExpenseSheetSubordinates = () => globalThis.__subordinatesApi();",
        loader: "ts",
      }));
    },
  }],
});

// Keeps hook state and dependencies so failed bootstrap follows the same cache write effects.
const createHarness = () => {
  const values = new Map();
  const slots = [];
  let cursor = 0;
  let pendingEffects = [];
  let now = 1_000_000;
  let apiCalls = 0;
  const sameDeps = (left, right) => left && right && left.length === right.length && left.every((value, index) => Object.is(value, right[index]));
  const react = {
    createContext: () => ({ Provider: "Provider" }),
    createElement: (type, props) => ({ type, props }),
    useContext: () => {},
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = { value: typeof initial === "function" ? initial() : initial };
      return [slots[index].value, (value) => { slots[index].value = typeof value === "function" ? value(slots[index].value) : value; }];
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
        pendingEffects.push(() => { cleanup?.(); slots[index].cleanup = callback(); });
      }
    },
  };
  const storage = {
    get length() { return values.size; }, key: (index) => [...values.keys()][index] ?? null,
    getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key),
  };
  const context = vm.createContext({
    module: { exports: {} }, exports: {}, require: (name) => { assert.equal(name, "react"); return react; },
    Date: class extends Date { static now() { return now; } }, sessionStorage: storage,
    __IND_SELECTED_COMPANY__: "ceu", __IND_PERMISSIONS_REVISION__: "revision-1", __IND_ALLOW_SELF_MANAGEMENT__: false,
    __managementApi: async () => { apiCalls += 1; throw new Error("Context refresh unavailable"); },
    __subordinatesApi: async () => { throw new Error("Subordinates unavailable"); },
    window: { __IND_ENTRA_OID__: "user-a", __IND_SELECTED_COMPANY__: "ceu", IND: { browserState: { isPersistenceAllowed: () => true } } },
  });
  vm.runInContext(result.outputFiles[0].text, context);
  const api = context.module.exports;
  return {
    api, context, values, advance: (milliseconds) => { now += milliseconds; }, getApiCalls: () => apiCalls,
    seed: () => api.cacheTest.write({
      refreshedAt: now, currentAxUserId: "AX-A", currentUserName: "User A", currentCrmUserId: "CRM-A",
      allowSelfManagement: true, selectedManagedUserId: "AX-A", subordinates: [],
    }),
    render: () => {
      cursor = 0;
      const rendered = api.AuthProvider({ children: null, enableExpenseManagement: true });
      const effects = pendingEffects;
      pendingEffects = [];
      effects.forEach((effect) => effect());
      return rendered.props.value;
    },
  };
};

test("a new permission revision cannot hydrate the previous management cache", () => {
  const { api, context, seed } = createHarness();
  seed();
  assert.equal(api.cacheTest.read().currentAxUserId, "AX-A");
  context.__IND_PERMISSIONS_REVISION__ = "revision-2";
  assert.equal(api.cacheTest.read(), null);
});

test("failed management refresh does not renew old data or restore a revoked layout permission", async () => {
  const harness = createHarness();
  harness.seed();
  harness.advance(11 * 60 * 60 * 1000);
  assert.equal(harness.render().allowSelfManagement, false);
  await new Promise((resolve) => setImmediate(resolve));
  const rendered = harness.render();
  assert.equal(harness.getApiCalls(), 1);
  assert.equal(rendered.managementBootstrapReady, true);
  assert.equal(rendered.allowSelfManagement, false);
  assert.equal(harness.api.cacheTest.read().currentAxUserId, "AX-A");
  harness.advance(60 * 60 * 1000 + 1);
  assert.equal(harness.api.cacheTest.read(), null);
});
