import type {
  ExpenseSheetCard,
  ExpenseSheetDetailDto,
  ExpenseSheetHeader,
  ExpenseSheetLine,
  ExpenseSheetLineDto,
  ExpenseSheetListItemDto,
} from "../expenseTypes.ts";
import { safeText, toNullableBool, toNullableNumber } from "./expenseApiTransforms.ts";

type ExpenseWindowRuntime = {
  __EXPENSE_GASTO_TYPES__?: Array<{
    value?: unknown;
    Value?: unknown;
    text?: unknown;
    Text?: unknown;
  }>;
};

type ExpenseGastoTypeEntry = NonNullable<ExpenseWindowRuntime["__EXPENSE_GASTO_TYPES__"]>[number];

const readExpenseWindowRuntime = (): ExpenseWindowRuntime => {
  if (typeof window === "undefined") return {};
  return window as unknown as ExpenseWindowRuntime;
};

const resolveTypeLabel = (typeValueCode: string): string => {
  if (!typeValueCode || typeof window === "undefined") {
    return typeValueCode;
  }

  const rawCatalogSource = readExpenseWindowRuntime().__EXPENSE_GASTO_TYPES__;
  const rawCatalog = Array.isArray(rawCatalogSource) ? rawCatalogSource : [];
  const match = rawCatalog.find((entry: ExpenseGastoTypeEntry) => {
    const entryCode = safeText(entry?.value || entry?.Value);
    return entryCode === typeValueCode;
  });

  return safeText(match?.text || match?.Text) || typeValueCode;
};

// Maps /api/crm/expensesheets/list item contract to list card UI model.
export const mapExpenseSheetListItemToCard = (item: ExpenseSheetListItemDto): ExpenseSheetCard => {
  return {
    hojaGastosId: safeText(item.HojaGastosId),
    description: safeText(item.Description),
    expenseSheetStatus: toNullableNumber(item.ExpenseSheetStatus),
    estadoComentarios: safeText(item.EstadoComentarios) || null,
    userId: safeText(item.UserId),
    userName: safeText(item.UserName) || null,
    voucher: safeText(item.Voucher),
    projId: safeText(item.ProjId),
    currencyCode: safeText(item.CurrencyCode),
    totalAmount: toNullableNumber(item.TotalAmount),
    exchRate: toNullableNumber(item.ExchRate),
    exchangeRateMode: toNullableNumber(item.ExchangeRateMode),
    createdDate: safeText(item.CreatedDate),
  };
};

// Maps /api/crm/expensesheets/{hojaGastosId} header contract to UI model.
export const mapExpenseSheetHeader = (sheet: ExpenseSheetDetailDto): ExpenseSheetHeader => {
  return {
    hojaGastosId: safeText(sheet.HojaGastosId),
    description: safeText(sheet.Description),
    userId: safeText(sheet.UserId),
    expenseSheetStatus: toNullableNumber(sheet.ExpenseSheetStatus),
    estadoComentarios: safeText(sheet.EstadoComentarios) || null,
    currencyCode: safeText(sheet.CurrencyCode),
    totalAmount: toNullableNumber(sheet.TotalAmount),
    exchRate: safeText(sheet.ExchRate),
    exchangeRateMode: toNullableNumber(sheet.ExchangeRateMode),
    projId: safeText(sheet.ProjId),
    voucher: safeText(sheet.Voucher),
    createdDate: safeText(sheet.CreatedDate),
  };
};

// Maps /api/crm/expensesheets/{hojaGastosId} line contract to UI model.
export const mapExpenseSheetLine = (line: ExpenseSheetLineDto): ExpenseSheetLine => {
  const typeValueCode = safeText(line.TypeValue);
  const legacyPrice = (line as { price?: unknown }).price;
  const legacyFileId = (line as { fileId?: unknown }).fileId;

  return {
    lineRecId: safeText(line.RecId),
    transDate: safeText(line.TransDate),
    typeValueCode,
    typeValue: resolveTypeLabel(typeValueCode),
    description: safeText(line.Description),
    internacional: toNullableBool(line.Internacional),
    fileId: safeText(line.FileId ?? legacyFileId),
    ticket: toNullableBool(line.Ticket),
    price: toNullableNumber(line.Price ?? legacyPrice),
    qty: toNullableNumber(line.Qty),
    amount: toNullableNumber(line.Amount),
    projId: safeText(line.ProjId),
    indAttachFiles: safeText(line.IndAttachFiles),
  };
};
