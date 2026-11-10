import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";
import test from "node:test";
import { transformSync } from "esbuild";

// Loads the real API module with an isolated browser and controlled context responses.
function createContext({ selected = "AZM", header = {}, companies, deferred = false, camelCase = false } = {}) {
  const modules = new Map();
  const pending = [];
  const calls = [];
  const browser = { __IND_SELECTED_COMPANY__: selected, __IND_ENTRA_OID__: "test-user" };
  const item = { Header: { AxUserId: "TEST", DefaultCompany: "ISE", DefaultCurrencyCode: "EUR", ...header }, Companies: companies ?? [
    { CompanyId: "AZM", CurrencyCode: "MXN" },
    { CompanyId: "ISE", CurrencyCode: "EUR", IsDefault: true },
    { CompanyId: "BRA", CurrencyCode: "BRL" },
  ] };
  const response = camelCase ? { success: true, items: [{ header: item.Header, companies: item.Companies }] } : { Success: true, Items: [item] };
  const load = (file) => {
    file = path.resolve(file);
    if (path.basename(file) === "apiService.ts") return {
      ApiFetchError: Error, getCsrfToken: () => "",
      fetchJson: async (url) => {
        calls.push(url);
        assert.equal(url, "/api/auth/entra/context");
        return deferred ? new Promise(resolve => pending.push(() => resolve(response))) : response;
      },
    };
    if (modules.has(file)) return modules.get(file).exports;
    const module = { exports: {} };
    modules.set(file, module);
    vm.runInNewContext(transformSync(readFileSync(file, "utf8"), { loader: "ts", format: "cjs" }).code, {
      module, exports: module.exports, window: browser,
      document: { querySelector: () => null, body: { dataset: {} } },
      AbortController, DOMException, Headers, URL, URLSearchParams, console, setTimeout, clearTimeout,
      require: id => load(path.resolve(path.dirname(file), id)),
    }, { filename: file });
    return module.exports;
  };
  const api = load(path.resolve(import.meta.dirname, "../Web/wwwroot/react/src/pages/gastos/utils/expenseApi.ts"));
  return { api, browser, pending, calls };
}

test("selected company owns the currency for all expense consumers", async () => {
  for (const [selected, expected] of [["AZM", "MXN"], ["BRA", "BRL"], ["ISE", "EUR"], [" azm ", "MXN"], ["", "EUR"]]) {
    const { api } = createContext({ selected });
    assert.equal(await api.getExpenseSheetDefaultCurrencyCode(), expected);
  }
});

test("currency resolution preserves AX codes and handles incomplete and camel-case contracts", async () => {
  for (const [currency, defaultCompany, expected] of [[" mn ", "ISE", "MN"], [" usd ", "ISE", "USD"], ["", "ISE", ""], [null, "ISE", ""], ["", "azm", "EUR"], ["BRL", "azm", "BRL"], ["", "", ""]]) {
    const { api } = createContext({ header: { DefaultCompany: defaultCompany }, companies: [{ CompanyId: "AZM", CurrencyCode: currency }] });
    assert.equal(await api.getExpenseSheetDefaultCurrencyCode(), expected);
  }
  const { api } = createContext({ camelCase: true, companies: [{ companyId: "azm", currencyCode: " mxn " }] });
  assert.equal(await api.getExpenseSheetDefaultCurrencyCode(), "MXN");
});

test("company switches invalidate the currency cache", async () => {
  const { api, browser, calls } = createContext();
  assert.equal(await api.getExpenseSheetDefaultCurrencyCode(), "MXN");
  browser.__IND_SELECTED_COMPANY__ = "BRA";
  assert.equal(await api.getExpenseSheetDefaultCurrencyCode(), "BRL");
  assert.equal(await api.getExpenseSheetDefaultCurrencyCode(), "BRL");
  assert.equal(calls.length, 2);
});

test("concurrent reads during a company switch cannot reuse the previous currency", async () => {
  const { api, browser, pending, calls } = createContext({ deferred: true });
  const initial = api.getExpenseSheetDefaultCurrencyCode();
  pending.shift()();
  assert.equal(await initial, "MXN");
  browser.__IND_SELECTED_COMPANY__ = "BRA";
  const first = api.getExpenseSheetDefaultCurrencyCode();
  const second = api.getExpenseSheetDefaultCurrencyCode();
  pending.shift()();
  assert.deepEqual(await Promise.all([first, second]), ["BRL", "BRL"]);
  assert.equal(calls.length, 2);
});

test("a late response from the old company cannot replace the current context", async () => {
  const { api, browser, pending } = createContext({ deferred: true });
  const old = api.getExpenseSheetDefaultCurrencyCode();
  browser.__IND_SELECTED_COMPANY__ = "BRA";
  const current = api.getExpenseSheetDefaultCurrencyCode();
  pending[1]();
  assert.equal(await current, "BRL");
  pending[0]();
  assert.equal(await old, "");
  assert.equal(await api.getExpenseSheetDefaultCurrencyCode(), "BRL");
});

test("an unavailable selected company does not fall back to another company's currency", async () => {
  const { api } = createContext({ selected: "UNKNOWN" });
  assert.equal(await api.getExpenseSheetDefaultCurrencyCode(), "");
});
