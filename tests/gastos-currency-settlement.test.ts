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
import { toExpenseApiDdMmYyyy, toExpenseIsoDate } from "../Web/wwwroot/react/src/pages/gastos/utils/expenseApiDateUtils.ts";
import {
  buildExpenseTicketDateTimeUpdate,
  canEditExpenseTicketTime,
  formatExpenseTicketTimeDisplay,
  normalizeExpenseTicketDraftTime,
  normalizeExpenseTicketStoredTime,
  toExpenseTicketDateInput,
} from "../Web/wwwroot/react/src/pages/gastos/utils/expenseTicketDateTime.ts";
import {
  ensureCurrentExpenseManagedUserInList,
  resolveExpenseSheetOwnerAxUserId,
} from "../Web/wwwroot/react/src/pages/gastos/list/expenseManagedUserSelection.ts";
import { normalizeExpenseSheetsCachedItems } from "../Web/wwwroot/react/src/pages/gastos/list/useExpenseSheetsFilterCache.ts";
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
assert.equal(toExpenseTicketDateInput("28.07.2026"), "2026-07-28");
assert.equal(toExpenseIsoDate("28.07.2026"), "2026-07-28");
assert.equal(toExpenseApiDdMmYyyy("2026-07-28"), "28.07.2026");
assert.equal(normalizeExpenseTicketStoredTime(39975), "11:06:15");
assert.equal(normalizeExpenseTicketStoredTime("11:06"), "11:06:00");
assert.equal(normalizeExpenseTicketStoredTime("0:00"), "00:00:00");
assert.equal(normalizeExpenseTicketStoredTime("1234"), "00:20:34");
assert.equal(normalizeExpenseTicketStoredTime(86399), "23:59:59");
assert.equal(normalizeExpenseTicketStoredTime(86400), "");
assert.equal(normalizeExpenseTicketDraftTime("1234"), "12:34:00");
assert.equal(normalizeExpenseTicketDraftTime("123456"), "12:34:56");
assert.equal(normalizeExpenseTicketDraftTime("24:00"), "");
assert.equal(formatExpenseTicketTimeDisplay("0"), "");
assert.equal(formatExpenseTicketTimeDisplay("39975"), "11:06:15");
for (const missingTime of [undefined, null, "", 0, "0", "0:00", "00:00", "00:00:00"]) {
  assert.equal(canEditExpenseTicketTime(missingTime), true);
}
for (const lockedTime of [1, "00:00:01", "11:06", "11:06:15", "25:00", "invalid", "-0", "0x0", "0e3", "0.0"]) {
  assert.equal(canEditExpenseTicketTime(lockedTime), false);
}
assert.deepEqual(
  buildExpenseTicketDateTimeUpdate({
    draftDate: "2026-07-29",
    draftTime: "12:34",
    originalDate: "28.07.2026",
    originalTime: "11:06:15",
  }),
  {
    payload: { transDate: "29.07.2026", ticketDate: "29.07.2026" },
    dateChanged: true,
    invalidDate: false,
    invalidTime: false,
  }
);
assert.deepEqual(
  buildExpenseTicketDateTimeUpdate({
    draftDate: "2026-07-28",
    draftTime: "1234",
    originalDate: "28.07.2026",
    originalTime: "0",
  }).payload,
  { ticketTime: "12:34:00" }
);
assert.equal(
  buildExpenseTicketDateTimeUpdate({
    draftDate: "2026-07-28",
    draftTime: "99:00",
    originalDate: "28.07.2026",
    originalTime: "0",
  }).invalidTime,
  true
);
assert.equal(formatUserNameWithId("Marco Meza Sanchez", "MAME"), "MARCO MEZA SANCHEZ (MAME)");
assert.equal(formatUserNameWithId("MARCO MEZA", "MAME"), "MARCO MEZA (MAME)");
assert.equal(formatUserNameWithId("AITOR BILBAO GURRUTXAGA", "ABG"), "AITOR BILBAO GURRUTXAGA (ABG)");
assert.equal(formatUserNameWithId("", "MAME"), "MAME");
assert.equal(formatUserNameWithId("MAME", "MAME"), "MAME");

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

const managedExpenseUsers = [
  { crmUserId: "MB", axUserId: "ITAMB", name: "MARCO BONOMELLI" },
  { crmUserId: "GTL", axUserId: "ITGTL", name: "TIBERIU GHITULESCU" },
  { crmUserId: "FISA", axUserId: "FISA", name: "FIORENZO SANTORINI" },
];
const currentAndManagedExpenseUsers = ensureCurrentExpenseManagedUserInList(
  managedExpenseUsers,
  "MAME",
  "MARCO MEZA",
  "P00009"
);

const resolveOwnerAxUserId = (ownerCrmUserId: string, ownerAxUserId: string) =>
  resolveExpenseSheetOwnerAxUserId({
    ownerCrmUserId,
    ownerAxUserId,
    currentCrmUserId: "P00009",
    currentAxUserId: "MAME",
    users: currentAndManagedExpenseUsers,
  });

assert.equal(resolveOwnerAxUserId("MB", "MB"), "ITAMB");
assert.equal(resolveOwnerAxUserId("GTL", "GTL"), "ITGTL");
assert.equal(resolveOwnerAxUserId("FISA", "FISA"), "FISA");
assert.equal(resolveOwnerAxUserId("P00009", "P00009"), "MAME");
assert.equal(resolveOwnerAxUserId("", "ITAMB"), "ITAMB");
assert.equal(resolveOwnerAxUserId("UNKNOWN", "UNKNOWN"), "");
assert.equal(resolveOwnerAxUserId("MB", "FISA"), "");
assert.equal(resolveOwnerAxUserId(" mb ", " itamb "), "ITAMB");
assert.equal(
  resolveExpenseSheetOwnerAxUserId({
    ownerCrmUserId: "MB",
    ownerAxUserId: "ITAMB",
    currentCrmUserId: "P00009",
    currentAxUserId: "MAME",
    users: [{ crmUserId: "ITAMB", axUserId: "ITAMB", name: "MARCO BONOMELLI" }],
  }),
  "ITAMB"
);

const [cachedExpenseSheet] = normalizeExpenseSheetsCachedItems([
  {
    hojaGastosId: " 000653 ",
    userId: " MB ",
    ownerAxUserId: " ITAMB ",
    ownerName: " MARCO BONOMELLI ",
  },
]);
assert.equal(cachedExpenseSheet.hojaGastosId, "000653");
assert.equal(cachedExpenseSheet.userId, "MB");
assert.equal(cachedExpenseSheet.ownerAxUserId, "ITAMB");
assert.equal(cachedExpenseSheet.ownerName, "MARCO BONOMELLI");

console.log("[ok] Gastos regression rules passed.");
