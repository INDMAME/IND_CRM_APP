import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
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
import { buildExpenseSheetsVisualizationFallbackMessages } from "../Web/wwwroot/react/src/pages/gastos/list/expenseSheetsVisualizationFallback.ts";
import {
  getExpenseLineReimbursableExpenseLabel,
  getExpenseLineReimbursableExpenseOptions,
} from "../Web/wwwroot/react/src/pages/gastos/constants/expenseReimbursableExpenseCatalog.ts";
import { formatUserNameWithId } from "../Web/wwwroot/react/src/utils/userLabels.ts";
import {
  groupExpenseSheetOriginalAmounts,
  resolveExpenseSheetTotals,
  toExpenseSheetLineReimbursableExpense,
  toExpenseSheetReimbursableExpense,
} from "../Web/wwwroot/react/src/pages/gastos/utils/expenseSheetTotals.ts";
import {
  normalizeDetailPagedResponse,
  normalizeListPagedResponse,
  normalizeTicketDetailPagedResponse,
} from "../Web/wwwroot/react/src/pages/gastos/utils/expenseApiResponseNormalizers.ts";
import {
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
} from "../Web/wwwroot/react/src/pages/gastos/utils/expenseApiMappers.ts";
import { fetchExpenseSheetListSourceJson } from "../Web/wwwroot/react/src/pages/gastos/utils/expenseApi.ts";
import { getVisibleReimbursableTotal } from "../Web/wwwroot/react/src/pages/gastos/utils/expenseVisibleTotals.ts";
import { toNullableNumber } from "../Web/wwwroot/react/src/pages/gastos/utils/expenseApiTransforms.ts";
import { formatExpenseAmountLabel } from "../Web/wwwroot/react/src/pages/gastos/expenseFormatters.ts";
import { normalizeCardTitleText } from "../Web/wwwroot/react/src/pages/gastos/utils/expenseUiUtils.ts";
import {
  mapExpenseTicketDetailHeader,
  mapExpenseTicketDetailLine,
} from "../Web/wwwroot/react/src/pages/gastos/tickets/detail/expenseTicketDetailTypes.ts";
import type {
  ExpenseSheetDetailDto,
  ExpenseSheetListItemDto,
  ExpenseSheetTicketDetailDto,
  IndPagedResponse,
} from "../Web/wwwroot/react/src/pages/gastos/expenseTypes.ts";

assert.equal(isExpenseLineSameReimbursementCurrency("usd", "USD"), true);
assert.equal(isExpenseLineForeignCurrency("USD", "EUR"), true);
assert.equal(formatExpenseAmountLabel(" eur "), "Amount (EUR)");
assert.equal(formatExpenseAmountLabel(""), "Amount (-)");
assert.equal(formatExpenseAmountLabel(" usd "), "Amount (USD)");
assert.equal(normalizeCardTitleText("cOMIDA de EMPRESA"), "Comida De Empresa");
assert.equal(normalizeCardTitleText("áRBOL y CAFÉ"), "Árbol Y Café");
assert.equal(normalizeCardTitleText("", ""), "");
assert.equal(normalizeCardTitleText("", "") || "HG000080", "HG000080");
assert.equal(normalizeCardTitleText("", "") || "FACTURA.JPG", "FACTURA.JPG");
assert.equal(toNullableNumber(null), null);
assert.equal(toNullableNumber(""), null);
assert.equal(toNullableNumber(0), 0);

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

assert.deepEqual(
  resolveExpenseSheetTotals({
    TotalGrossAmountMST: 150,
    TotalReimbursableAmount: 90,
    TotalAmountMST: 80,
  }),
  { grossCompany: 150, reimbursable: 90 }
);
assert.deepEqual(
  resolveExpenseSheetTotals({ TotalGrossAmountMST: null, TotalReimbursableAmount: null, TotalAmountMST: 80 }),
  { grossCompany: null, reimbursable: 80 }
);
assert.deepEqual(
  resolveExpenseSheetTotals({ TotalGrossAmountMST: 0, TotalReimbursableAmount: 0, TotalAmountMST: 80 }),
  { grossCompany: 0, reimbursable: 0 }
);
assert.equal(toExpenseSheetReimbursableExpense(2), 2);
assert.equal(toExpenseSheetLineReimbursableExpense(2), null);
assert.equal(toExpenseSheetLineReimbursableExpense(1), 1);
assert.equal(getExpenseLineReimbursableExpenseLabel(null), "-");
assert.equal(getExpenseLineReimbursableExpenseLabel(2), "-");
assert.deepEqual(
  getExpenseLineReimbursableExpenseOptions().map((option) => Number(option.value)),
  [0, 1]
);

assert.deepEqual(
  groupExpenseSheetOriginalAmounts([
    { amount: 50, currencyCode: "eur" },
    { amount: 100, currencyCode: "USD" },
    { amount: 8.7, currencyCode: " usd " },
    { amount: null, currencyCode: "EUR" },
    { amount: 25, currencyCode: null },
  ]),
  [
    { currencyCode: "EUR", amount: 50 },
    { currencyCode: "USD", amount: 108.7 },
  ]
);

const normalizedExpenseSheetList = normalizeListPagedResponse({
  Success: true,
  Message: "",
  Items: [
    {
      HojaGastosId: "HG-1",
      Description: "Mixed currencies",
      ExpenseSheetStatus: 0,
      EstadoComentarios: null,
      UserId: "MAME",
      UserName: "MARCO",
      Voucher: "",
      ProjId: "P-1",
      CurrencyCode: "EUR",
      TotalAmount: 90,
      TotalAmountCurrency: 90,
      TotalAmountMST: 90,
      TotalGrossAmountMST: null,
      TotalReimbursableAmount: 0,
      ExchRate: null,
      ExchangeRateMode: null,
      ReimbursableExpense: 2,
      CreatedDate: "29.07.2026",
    },
  ],
} satisfies IndPagedResponse<ExpenseSheetListItemDto>);
assert.equal(normalizedExpenseSheetList.Items[0]?.TotalGrossAmountMST, null);
assert.equal(normalizedExpenseSheetList.Items[0]?.TotalReimbursableAmount, 0);
assert.equal(normalizedExpenseSheetList.Items[0]?.ReimbursableExpense, 2);

const normalizedExpenseSheetDetail = normalizeDetailPagedResponse({
  Success: true,
  Message: "",
  Items: [
    {
      HojaGastosId: "HG-1",
      TotalGrossAmountMST: 150,
      TotalReimbursableAmount: 90,
      TotalAmountMST: 90,
      ReimbursableExpense: 2,
      Lines: [
        {
          LineRecId: "1",
          Amount: 100,
          CurrencyCode: "USD",
          AmountMST: 92,
          ReimbursableExpense: 0,
          ReimbursableAmount: null,
          TotalAmountCurrency: 100,
          TotalAmountMST: 92,
        },
      ],
    },
  ],
} satisfies IndPagedResponse<ExpenseSheetDetailDto>);
const normalizedLine = normalizedExpenseSheetDetail.Items[0]?.Lines?.[0];
assert.equal(normalizedLine?.Amount, 100);
assert.equal(normalizedLine?.AmountMST, 92);
assert.equal(normalizedLine?.ReimbursableAmount, null);
assert.equal(mapExpenseSheetLine(normalizedLine || {}).reimbursableAmount, null);

const exactUsdFixture = normalizeDetailPagedResponse({
  Success: true,
  Message: "",
  Items: [
    {
      HojaGastosId: "HG000080",
      TotalGrossAmountMST: 108.11,
      TotalReimbursableAmount: 0,
      TotalAmountMST: 108.11,
      Lines: [
        {
          LineRecId: "USD-1",
          ReimbursableExpense: 1,
          CurrencyCode: "USD",
          AmountMST: 108.11,
          ReimbursableAmount: 0,
          TotalAmountCurrency: 100,
          TotalAmountMST: 108.11,
        },
      ],
    },
  ],
} satisfies IndPagedResponse<ExpenseSheetDetailDto>);
const exactUsdMappedLine = mapExpenseSheetLine(exactUsdFixture.Items[0]?.Lines?.[0] || {});
assert.equal(exactUsdMappedLine.amount, 100);
assert.equal(exactUsdMappedLine.currencyCode, "USD");
assert.equal(exactUsdMappedLine.amountMST, 108.11);
assert.equal(exactUsdMappedLine.reimbursableAmount, 0);
assert.equal(exactUsdMappedLine.reimbursableExpense, 1);

const camelCaseExpenseFixture = normalizeDetailPagedResponse({
  success: true,
  message: "",
  items: [
    {
      hojaGastosId: "HG-CAMEL",
      totalGrossAmountMST: 108.11,
      totalReimbursableAmount: null,
      totalAmountMST: 80,
      lines: [
        {
          lineRecId: "CAMEL-1",
          amount: 100,
          currencyCode: "USD",
          amountMST: 108.11,
          reimbursableExpense: 2,
          reimbursableAmount: null,
          totalAmountCurrency: 100,
          totalAmountMST: 108.11,
        },
      ],
    },
  ],
} as unknown as IndPagedResponse<ExpenseSheetDetailDto>);
const camelCaseMappedHeader = mapExpenseSheetHeader(camelCaseExpenseFixture.Items[0] || {});
const camelCaseMappedLine = mapExpenseSheetLine(camelCaseExpenseFixture.Items[0]?.Lines?.[0] || {});
assert.equal(camelCaseMappedHeader.totalGrossAmountMST, 108.11);
assert.equal(camelCaseMappedHeader.totalReimbursableAmount, 80);
assert.equal(camelCaseMappedLine.reimbursableExpense, null);
assert.equal(camelCaseMappedLine.reimbursableAmount, null);

const allReimbursableHeader = mapExpenseSheetHeader({
  HojaGastosId: "HG-ALL",
  TotalGrossAmountMST: 150,
  TotalReimbursableAmount: 150,
  TotalAmountMST: 150,
  ReimbursableExpense: 1,
});
const allReimbursableLine = mapExpenseSheetLine({
  LineRecId: "1",
  Amount: 100,
  CurrencyCode: "USD",
  AmountMST: 92,
  ReimbursableAmount: 92,
  ReimbursableExpense: 1,
});
assert.equal(allReimbursableHeader.totalGrossAmountMST, 150);
assert.equal(allReimbursableHeader.totalReimbursableAmount, 150);
assert.equal(allReimbursableHeader.reimbursableExpense, 1);
assert.equal(allReimbursableLine.amountMST, 92);
assert.equal(allReimbursableLine.reimbursableAmount, 92);

const nonReimbursableHeader = mapExpenseSheetHeader({
  HojaGastosId: "HG-NONE",
  TotalGrossAmountMST: 150,
  TotalReimbursableAmount: 0,
  TotalAmountMST: 0,
  ReimbursableExpense: 0,
});
const nonReimbursableLine = mapExpenseSheetLine({
  LineRecId: "1",
  AmountMST: 92,
  ReimbursableAmount: 0,
  ReimbursableExpense: 0,
});
assert.equal(nonReimbursableHeader.totalGrossAmountMST, 150);
assert.equal(nonReimbursableHeader.totalReimbursableAmount, 0);
assert.equal(nonReimbursableHeader.reimbursableExpense, 0);
assert.equal(nonReimbursableLine.amountMST, 92);
assert.equal(nonReimbursableLine.reimbursableAmount, 0);

const mixedHeader = mapExpenseSheetHeader({
  HojaGastosId: "HG-MIXED",
  TotalGrossAmountMST: 150,
  TotalReimbursableAmount: 90,
  TotalAmountMST: 90,
  ReimbursableExpense: 2,
});
assert.equal(mixedHeader.totalGrossAmountMST, 150);
assert.equal(mixedHeader.totalReimbursableAmount, 90);
assert.equal(mixedHeader.reimbursableExpense, 2);

const [cachedNullTotals] = normalizeExpenseSheetsCachedItems([
  {
    hojaGastosId: "HG-NULL",
    totalGrossAmountMST: null,
    totalReimbursableAmount: null,
    totalAmountMST: null,
  },
]);
assert.equal(cachedNullTotals.totalGrossAmountMST, null);
assert.equal(cachedNullTotals.totalReimbursableAmount, null);
assert.equal(cachedNullTotals.totalAmountMST, null);

const [cachedLegacyTotals] = normalizeExpenseSheetsCachedItems([
  {
    hojaGastosId: "HG-LEGACY",
    totalGrossAmountMST: null,
    totalReimbursableAmount: null,
    totalAmountMST: 80,
  },
]);
assert.equal(cachedLegacyTotals.totalGrossAmountMST, null);
assert.equal(cachedLegacyTotals.totalReimbursableAmount, 80);

const [cachedExplicitZeroTotals] = normalizeExpenseSheetsCachedItems([
  {
    hojaGastosId: "HG-ZERO",
    totalReimbursableAmount: 0,
    totalAmountMST: 80,
  },
]);
assert.equal(cachedExplicitZeroTotals.totalReimbursableAmount, 0);

const legacyAssistantSource = await fetchExpenseSheetListSourceJson(
  {
    page: 1,
    pageSize: 20,
    filter: "",
    billedMode: 0,
    createdDateFrom: null,
    createdDateTo: null,
    projId: null,
    currencyCode: null,
    expenseSheetStatus: null,
    reimbursableExpense: null,
    includeSubordinates: false,
  },
  {
    seedResponse: {
      ...normalizedExpenseSheetList,
      Total: 1,
      Page: 1,
      PageSize: 20,
      Items: [
        {
          ...normalizedExpenseSheetList.Items[0],
          TotalGrossAmountMST: 150,
          TotalReimbursableAmount: 90,
        },
      ],
    },
  }
);
assert.equal(legacyAssistantSource.Items[0]?.TotalGrossAmountMST, 150);
assert.equal(legacyAssistantSource.Items[0]?.TotalReimbursableAmount, 90);

const visualizationFallback = buildExpenseSheetsVisualizationFallbackMessages({
  question: "Totales por hoja de gasto",
  requestedVisualizationType: "table",
  sourceJson: {
    ...legacyAssistantSource,
    Items: [
      {
        ...legacyAssistantSource.Items[0],
        HojaGastosId: "HG-LEGACY",
        TotalReimbursableAmount: null,
        TotalAmountMST: 80,
      },
    ],
  },
  uiLanguage: "es-ES",
  companyCurrencyCode: "EUR",
});
const visualizationTable = visualizationFallback?.find((message) => message.type === "table");
assert.equal(visualizationTable?.type, "table");
assert.equal(
  visualizationTable?.type === "table" ? visualizationTable.payload.rows[0]?.currencyCode : null,
  "EUR"
);
assert.match(String(visualizationTable?.type === "table" ? visualizationTable.payload.rows[0]?.value : ""), /80/);

// Tickets keep their legacy visible-total fallback chain unchanged.
assert.equal(getVisibleReimbursableTotal({ AmountMST: 35, TotalAmountCurrency: 20 }), 35);

const normalizedTicketDetail = normalizeTicketDetailPagedResponse({
  Success: true,
  Message: "",
  Items: [
    {
      FileId: "F000000161",
      Description: "USD ticket",
      Status: 0,
      HojaGastosIdDisplay: "HG000080",
      ProcessedByAI: false,
      CurrencyCode: "USD",
      TotalAmount: 100,
      TotalAmountCurrency: 100,
      TotalAmountMST: 108.11,
      CreatedByUserId: "MAME",
      TransDate: "30.07.2026",
      TicketDate: "30.07.2026",
      TicketTime: "12:00",
      Comentario: "",
      UrlFile: "",
      FileName: "",
      GastoType: 0,
      Lines: [
        {
          RecId: "T-1",
          Description: "Line one",
          Qty: 1,
          Price: 100,
          TotalAmount: 100,
          RefRecIdTable: "1",
          CreatedByUserId: "MAME",
          ReimbursableExpense: 1,
          ReimbursableAmount: 25,
        },
        {
          RecId: "T-2",
          Description: "Line two",
          Qty: 1,
          Price: 0,
          TotalAmount: 0,
          RefRecIdTable: "1",
          CreatedByUserId: "MAME",
          ReimbursableExpense: 1,
          ReimbursableAmount: 25,
        },
      ],
    },
  ],
} satisfies IndPagedResponse<ExpenseSheetTicketDetailDto>);
const mappedTicketHeader = mapExpenseTicketDetailHeader(normalizedTicketDetail.Items[0]);
const mappedTicketLines = normalizedTicketDetail.Items[0].Lines.map(mapExpenseTicketDetailLine);
assert.equal(mappedTicketHeader.amountMST, 108.11);
assert.equal(mappedTicketHeader.visibleReimbursableTotal, 108.11);
assert.deepEqual(mappedTicketLines.map((line) => line.reimbursableAmount), [25, 25]);
assert.deepEqual(mappedTicketLines.map((line) => line.reimbursableExpense), [1, 1]);

const camelCaseTicketDetail = normalizeTicketDetailPagedResponse({
  success: true,
  message: "",
  items: [
    {
      FileId: "F-CAMEL",
      CurrencyCode: "USD",
      TotalAmount: 20,
      TotalAmountCurrency: 20,
      TotalAmountMST: null,
      lines: [
        {
          RecId: "TC-1",
          TotalAmount: 20,
          reimbursableExpense: 2,
          reimbursableAmount: 0,
        },
        {
          RecId: "TC-2",
          TotalAmount: 0,
          reimbursableExpense: 0,
          reimbursableAmount: null,
        },
      ],
    },
  ],
} as unknown as IndPagedResponse<ExpenseSheetTicketDetailDto>);
const camelTicketHeader = mapExpenseTicketDetailHeader(camelCaseTicketDetail.Items[0]);
const camelTicketLines = camelCaseTicketDetail.Items[0].Lines.map(mapExpenseTicketDetailLine);
assert.equal(camelTicketHeader.visibleReimbursableTotal, 20);
assert.equal(camelTicketHeader.amountMST, null);
assert.equal(camelTicketLines[0]?.reimbursableExpense, null);
assert.equal(camelTicketLines[0]?.reimbursableAmount, 0);
assert.equal(camelTicketLines[1]?.reimbursableExpense, 0);
assert.equal(camelTicketLines[1]?.reimbursableAmount, null);

const repositoryRoot = process.cwd();
const ticketModelsSource = readFileSync(
  path.join(repositoryRoot, "App", "Models", "CRM", "ExpenseSheetTicketModels.cs"),
  "utf8"
);
const gastosControllerSource = readFileSync(
  path.join(repositoryRoot, "Web", "Controllers", "Gastos", "GastosController.cs"),
  "utf8"
);
const ticketLineFormSource = readFileSync(
  path.join(
    repositoryRoot,
    "Web",
    "wwwroot",
    "react",
    "src",
    "pages",
    "gastos",
    "components",
    "ExpenseTicketLineDetailForm.tsx"
  ),
  "utf8"
);
const ticketProxyMapperStart = gastosControllerSource.indexOf(
  "private static object ToExpenseSheetTicketApiDetailLine"
);
const ticketProxyMapperEnd = gastosControllerSource.indexOf(
  "\n        private static",
  ticketProxyMapperStart + 1
);
assert.ok(ticketProxyMapperStart >= 0 && ticketProxyMapperEnd > ticketProxyMapperStart);
const ticketProxyMapperSource = gastosControllerSource.slice(ticketProxyMapperStart, ticketProxyMapperEnd);
assert.match(ticketModelsSource, /JsonPropertyName\("ReimbursableExpense"\)[\s\S]*int\? ReimbursableExpense/);
assert.match(ticketModelsSource, /JsonPropertyName\("ReimbursableAmount"\)[\s\S]*decimal\? ReimbursableAmount/);
assert.match(ticketProxyMapperSource, /ReimbursableExpense\s*=\s*line\.ReimbursableExpense/);
assert.match(ticketProxyMapperSource, /ReimbursableAmount\s*=\s*line\.ReimbursableAmount/);
assert.match(
  ticketLineFormSource,
  /formatAmountWithCurrency\(line\?\.reimbursableAmount \?\? null, companyCurrencyCode\)/
);
assert.doesNotMatch(ticketLineFormSource, /\.reduce\(/);

console.log("[ok] Gastos regression rules passed.");
