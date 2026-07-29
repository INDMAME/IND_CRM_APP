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
import {
  resolveExpenseSheetTotals,
  toExpenseSheetLineReimbursableExpense,
  toExpenseSheetReimbursableExpense,
} from "./expenseSheetTotals.ts";

const resolveTypeLabel = (typeValueCode: string): string => {
  if (!typeValueCode) {
    return typeValueCode;
  }

  const match = getExpenseGastoTypeOptions().find((entry) => safeText(entry.value) === typeValueCode);

  return safeText(match?.text) || typeValueCode;
};

// Maps /api/crm/expensesheets/list item contract to list card UI model.
export const mapExpenseSheetListItemToCard = (item: ExpenseSheetListItemDto): ExpenseSheetCard => {
  const totals = resolveExpenseSheetTotals({
    TotalGrossAmountMST: toNullableNumber(item.TotalGrossAmountMST),
    TotalReimbursableAmount: toNullableNumber(item.TotalReimbursableAmount),
    TotalAmountMST: toNullableNumber(item.TotalAmountMST),
  });

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
    totalAmount: toNullableNumber(item.TotalAmount),
    totalAmountCurrency: toNullableNumber(item.TotalAmountCurrency),
    totalAmountMST: toNullableNumber(item.TotalAmountMST),
    totalGrossAmountMST: totals.grossCompany,
    totalReimbursableAmount: totals.reimbursable,
    exchRate: toNullableNumber(item.ExchRate),
    exchangeRateMode: toNullableNumber(item.ExchangeRateMode),
    reimbursableExpense: toExpenseSheetReimbursableExpense(
      item.ReimbursableExpense ?? item.reimbursableExpense
    ),
    createdDate: safeText(item.CreatedDate),
  };
};

// Maps /api/crm/expensesheets/{hojaGastosId} header contract to UI model.
export const mapExpenseSheetHeader = (sheet: ExpenseSheetDetailDto): ExpenseSheetHeader => {
  const totals = resolveExpenseSheetTotals({
    TotalGrossAmountMST: toNullableNumber(sheet.TotalGrossAmountMST ?? sheet.totalGrossAmountMST),
    TotalReimbursableAmount: toNullableNumber(
      sheet.TotalReimbursableAmount ?? sheet.totalReimbursableAmount
    ),
    TotalAmountMST: toNullableNumber(sheet.TotalAmountMST ?? sheet.totalAmountMST),
  });

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
    totalAmount: toNullableNumber(sheet.TotalAmount ?? sheet.totalAmount),
    totalAmountCurrency: toNullableNumber(sheet.TotalAmountCurrency ?? sheet.totalAmountCurrency),
    totalAmountMST: toNullableNumber(sheet.TotalAmountMST ?? sheet.totalAmountMST),
    totalGrossAmountMST: totals.grossCompany,
    totalReimbursableAmount: totals.reimbursable,
    exchRate: safeText(sheet.ExchRate ?? sheet.exchRate),
    exchangeRateMode: toNullableNumber(sheet.ExchangeRateMode ?? sheet.exchangeRateMode),
    reimbursableExpense: toExpenseSheetReimbursableExpense(
      sheet.ReimbursableExpense ?? sheet.reimbursableExpense
    ),
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
    projId: safeText(line.ProjId ?? line.projId),
    reimbursableExpense: toExpenseSheetLineReimbursableExpense(
      line.ReimbursableExpense ?? line.reimbursableExpense
    ),
    currencyCode: safeText(line.CurrencyCode ?? line.currencyCode),
    amountMST: toNullableNumber(line.AmountMST ?? line.amountMST),
    reimbursableAmount: toNullableNumber(line.ReimbursableAmount ?? line.reimbursableAmount),
    totalAmountCurrency: toNullableNumber(line.TotalAmountCurrency ?? line.totalAmountCurrency),
    totalAmountMST: toNullableNumber(line.TotalAmountMST ?? line.totalAmountMST),
    exchRate: toNullableNumber(line.ExchRate ?? line.exchRate),
    indAttachFiles: safeText(line.IndAttachFiles ?? line.indAttachFiles),
  };
};
