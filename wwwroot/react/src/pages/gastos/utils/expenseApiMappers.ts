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
    hojaGastosId: safeText(sheet.HojaGastosId ?? sheet.hojaGastosId),
    description: safeText(sheet.Description ?? sheet.description),
    userId: safeText(sheet.UserId ?? sheet.userId),
    userName: safeText(sheet.UserName ?? sheet.userName) || null,
    expenseSheetStatus: toNullableNumber(sheet.ExpenseSheetStatus ?? sheet.expenseSheetStatus),
    estadoComentarios: safeText(sheet.EstadoComentarios ?? sheet.estadoComentarios) || null,
    currencyCode: safeText(sheet.CurrencyCode ?? sheet.currencyCode),
    totalAmount: toNullableNumber(sheet.TotalAmount ?? sheet.totalAmount),
    exchRate: safeText(sheet.ExchRate ?? sheet.exchRate),
    exchangeRateMode: toNullableNumber(sheet.ExchangeRateMode ?? sheet.exchangeRateMode),
    projId: safeText(sheet.ProjId ?? sheet.projId),
    voucher: safeText(sheet.Voucher ?? sheet.voucher),
    createdDate: safeText(sheet.CreatedDate ?? sheet.createdDate),
  };
};

// Maps /api/crm/expensesheets/{hojaGastosId} line contract to UI model.
export const mapExpenseSheetLine = (line: ExpenseSheetLineDto): ExpenseSheetLine => {
  const typeValueCode = safeText(line.TypeValue ?? line.typeValue);
  const explicitLineRecId = safeText(line.LineRecId ?? line.lineRecId);

  return {
    lineRecId: explicitLineRecId || safeText(line.RecId ?? line.recId),
    transDate: safeText(line.TransDate ?? line.transDate),
    typeValueCode,
    typeValue: resolveTypeLabel(typeValueCode),
    description: safeText(line.Description ?? line.description),
    internacional: toNullableBool(line.Internacional ?? line.internacional),
    fileId: safeText(line.FileId ?? line.fileId),
    ticket: toNullableBool(line.Ticket ?? line.ticket),
    price: toNullableNumber(line.Price ?? line.price),
    qty: toNullableNumber(line.Qty ?? line.qty),
    amount: toNullableNumber(line.Amount ?? line.amount),
    projId: safeText(line.ProjId ?? line.projId),
    indAttachFiles: safeText(line.IndAttachFiles ?? line.indAttachFiles),
  };
};
