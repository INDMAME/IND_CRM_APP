import assert from "node:assert/strict";
import {
  calculateExpenseLineAmountMSTForCurrency,
  calculateExpenseLineExchangeRateForCurrency,
  isExpenseLineForeignCurrency,
  isExpenseLineSameReimbursementCurrency,
  resolveExpenseLineAmountMSTForCurrencyPayload,
  resolveExpenseLineExchangeRateForCurrency,
} from "../Web/wwwroot/react/src/pages/gastos/utils/expenseLineCurrency.ts";
import { buildExpenseListPayload } from "../Web/wwwroot/react/src/pages/gastos/utils/expensePayloadBuilders.ts";
import { resolveExpenseListAxUserIdOverride } from "../Web/wwwroot/react/src/pages/gastos/utils/expenseManagedUserScope.ts";
import { areExpenseNumericInputsEquivalent } from "../Web/wwwroot/react/src/pages/gastos/utils/expenseNumberFormat.ts";
import { formatUserNameWithId } from "../Web/wwwroot/react/src/utils/userLabels.ts";

assert.equal(isExpenseLineSameReimbursementCurrency("usd", "USD"), true);
assert.equal(isExpenseLineForeignCurrency("USD", "EUR"), true);

assert.equal(calculateExpenseLineAmountMSTForCurrency(210, 92.5, "USD", "USD"), 210);
assert.equal(resolveExpenseLineExchangeRateForCurrency("USD", "USD", null), 100);
assert.equal(resolveExpenseLineExchangeRateForCurrency("USD", "USD", 92.5), 100);
assert.equal(calculateExpenseLineExchangeRateForCurrency(210, 200, "USD", "USD", 92.5), 100);
assert.equal(calculateExpenseLineExchangeRateForCurrency(210, 200, "USD", "USD", null), 100);
assert.equal(resolveExpenseLineAmountMSTForCurrencyPayload(210, null, "USD", "USD"), 210);
assert.equal(resolveExpenseLineAmountMSTForCurrencyPayload(210, 200, "USD", "USD"), 200);

assert.equal(calculateExpenseLineAmountMSTForCurrency(210, 92.5, "USD", "EUR"), 227.03);
assert.equal(calculateExpenseLineAmountMSTForCurrency(11, 114.4640999, "USD", "EUR"), 9.61);
assert.equal(calculateExpenseLineExchangeRateForCurrency(210, 200, "USD", "EUR", 92.5), 105);
assert.equal(resolveExpenseLineExchangeRateForCurrency("USD", "EUR", null), null);

assert.equal(areExpenseNumericInputsEquivalent("7.86", "7.86"), true);
assert.equal(areExpenseNumericInputsEquivalent("7,86", "7.86"), true);
assert.equal(areExpenseNumericInputsEquivalent("7.87", "7.86"), false);
assert.equal(formatUserNameWithId("Marco Meza Sanchez", "MAME"), "Marco Meza Sanchez (MAME)");
assert.equal(formatUserNameWithId("", "MAME"), "MAME");

const allUsersExpensePayload = buildExpenseListPayload(
  {
    fromDate: "2026-07-01",
    toDate: "2026-07-09",
    projectId: "P-1",
    hojaGastosId: "",
    currencyCode: "EUR",
    managedUserId: "MAME",
    includeSubordinates: true,
    statusFilter: -1,
    exchangeRateMode: null,
    filter: "",
  },
  1,
  6
);

assert.equal(allUsersExpensePayload.includeSubordinates, true);
assert.equal(Object.prototype.hasOwnProperty.call(allUsersExpensePayload, "userId"), false);
assert.equal(Object.prototype.hasOwnProperty.call(allUsersExpensePayload, "owner"), false);
assert.equal(Object.prototype.hasOwnProperty.call(allUsersExpensePayload, "selectedUser"), false);
assert.equal(
  resolveExpenseListAxUserIdOverride({ selectedManagedUserId: "MAME", includeSubordinates: true }),
  ""
);
assert.equal(
  resolveExpenseListAxUserIdOverride({ selectedManagedUserId: "MAME", includeSubordinates: false }),
  "MAME"
);
assert.equal(
  resolveExpenseListAxUserIdOverride({ selectedManagedUserId: "ABC", includeSubordinates: false }),
  "ABC"
);

console.log("[ok] Gastos currency settlement rules passed.");
