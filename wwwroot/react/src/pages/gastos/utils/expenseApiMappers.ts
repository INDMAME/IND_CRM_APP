import type {
  ExpenseSheetCard,
  ExpenseSheetDetailDto,
  ExpenseSheetHeader,
  ExpenseSheetLine,
  ExpenseSheetLineDto,
  ExpenseSheetListItemDto,
} from "../expenseTypes.ts";
import { safeText, toNullableBool, toNullableNumber } from "./expenseApiTransforms.ts";
import { getExpenseGastoTypeOptions } from "../constants/expenseGastoTypeCatalog.ts";
import { getVisibleReimbursableTotal } from "./expenseVisibleTotals.ts";

const resolveTypeLabel = (typeValueCode: string): string => {
  if (!typeValueCode) {
    return typeValueCode;
  }

  const match = getExpenseGastoTypeOptions().find((entry) => safeText(entry.value) === typeValueCode);

  return safeText(match?.text) || typeValueCode;
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
    ownerAxUserId: safeText(item.OwnerAxUserId ?? item.ownerAxUserId),
    ownerName: safeText(item.OwnerName ?? item.ownerName) || null,
    voucher: safeText(item.Voucher),
    projId: safeText(item.ProjId),
    currencyCode: safeText(item.CurrencyCode),
    totalAmount: getVisibleReimbursableTotal({
      TotalAmountMST: toNullableNumber(item.TotalAmountMST),
      TotalAmountCurrency: toNullableNumber(item.TotalAmountCurrency),
      TotalAmount: toNullableNumber(item.TotalAmount),
    }),
    exchRate: toNullableNumber(item.ExchRate),
    exchangeRateMode: toNullableNumber(item.ExchangeRateMode),
    reimbursableExpense: toNullableNumber(item.ReimbursableExpense ?? item.reimbursableExpense),
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
    ownerAxUserId: safeText(sheet.OwnerAxUserId ?? sheet.ownerAxUserId),
    ownerName: safeText(sheet.OwnerName ?? sheet.ownerName) || null,
    expenseSheetStatus: toNullableNumber(sheet.ExpenseSheetStatus ?? sheet.expenseSheetStatus),
    estadoComentarios: safeText(sheet.EstadoComentarios ?? sheet.estadoComentarios) || null,
    currencyCode: safeText(sheet.CurrencyCode ?? sheet.currencyCode),
    totalAmount: getVisibleReimbursableTotal({
      TotalAmountMST: toNullableNumber(sheet.TotalAmountMST ?? sheet.totalAmountMST),
      TotalAmountCurrency: toNullableNumber(sheet.TotalAmountCurrency ?? sheet.totalAmountCurrency),
      TotalAmount: toNullableNumber(sheet.TotalAmount ?? sheet.totalAmount),
    }),
    exchRate: safeText(sheet.ExchRate ?? sheet.exchRate),
    exchangeRateMode: toNullableNumber(sheet.ExchangeRateMode ?? sheet.exchangeRateMode),
    reimbursableExpense: toNullableNumber(sheet.ReimbursableExpense ?? sheet.reimbursableExpense),
    projId: safeText(sheet.ProjId ?? sheet.projId),
    voucher: safeText(sheet.Voucher ?? sheet.voucher),
    createdDate: safeText(sheet.CreatedDate ?? sheet.createdDate),
  };
};

// Maps /api/crm/expensesheets/{hojaGastosId} line contract to UI model.
export const mapExpenseSheetLine = (line: ExpenseSheetLineDto): ExpenseSheetLine => {
  const typeValueCode = safeText(line.TypeValueCode ?? line.typeValueCode ?? line.TypeValue ?? line.typeValue);
  const typeValueLabel = safeText(line.TypeValue ?? line.typeValue);
  const explicitLineRecId = safeText(line.LineRecId ?? line.lineRecId);

  return {
    lineRecId: explicitLineRecId || safeText(line.RecId ?? line.recId),
    transDate: safeText(line.TransDate ?? line.transDate),
    typeValueCode,
    typeValue: typeValueLabel && typeValueLabel !== typeValueCode ? typeValueLabel : resolveTypeLabel(typeValueCode),
    description: safeText(line.Description ?? line.description),
    internacional: toNullableBool(line.Internacional ?? line.internacional),
    fileId: safeText(line.FileId ?? line.fileId),
    ticket: toNullableBool(line.Ticket ?? line.ticket),
    price: toNullableNumber(line.Price ?? line.price),
    qty: toNullableNumber(line.Qty ?? line.qty),
    amount: toNullableNumber(line.Amount ?? line.amount),
    visibleReimbursableTotal: getVisibleReimbursableTotal({
      TotalAmountMST: toNullableNumber(line.TotalAmountMST ?? line.totalAmountMST),
      AmountMST: toNullableNumber(line.AmountMST ?? line.amountMST),
      TotalAmountCurrency: toNullableNumber(line.TotalAmountCurrency ?? line.totalAmountCurrency),
      Amount: toNullableNumber(line.Amount ?? line.amount),
    }),
    projId: safeText(line.ProjId ?? line.projId),
    reimbursableExpense: toNullableNumber(line.ReimbursableExpense ?? line.reimbursableExpense),
    currencyCode: safeText(line.CurrencyCode ?? line.currencyCode),
    amountMST: toNullableNumber(line.AmountMST ?? line.amountMST),
    exchRate: toNullableNumber(line.ExchRate ?? line.exchRate),
    indAttachFiles: safeText(line.IndAttachFiles ?? line.indAttachFiles),
  };
};
