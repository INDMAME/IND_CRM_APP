import type {
  ExpenseGastoTypeCode,
  ExpenseSheetLineReimbursableExpense,
  ExpenseSheetTicketLineDto,
} from "../../expenseTypes.ts";
import { toExpenseGastoTypeCode } from "../../constants/expenseGastoTypeCatalog.ts";
import { safeText, toNullableBool, toNullableNumber } from "../../utils/expenseApiTransforms.ts";
import type { ExpenseSheetTicketDetailDto } from "../../expenseTypes.ts";
import { getVisibleReimbursableTotal } from "../../utils/expenseVisibleTotals.ts";
import { toExpenseSheetLineReimbursableExpense } from "../../utils/expenseSheetTotals.ts";

export type ExpenseTicketDetailHeader = {
  fileId: string;
  description: string;
  status: number | null;
  hojaGastosIdDisplay: string;
  processedByAI: boolean | null;
  currencyCode: string;
  totalAmount: number | null;
  totalAmountCurrency: number | null;
  visibleReimbursableTotal: number | null;
  amountMST: number | null;
  exchRate: number | null;
  createdByUserId: string;
  ownerAxUserId: string;
  ownerName: string | null;
  transDate: string;
  ticketDate: string;
  ticketTime: string;
  comentario: string;
  urlFile: string;
  fileName: string;
  gastoType: ExpenseGastoTypeCode | null;
};

export type ExpenseTicketDetailLine = {
  recId: string;
  description: string;
  qty: number | null;
  price: number | null;
  totalAmount: number | null;
  reimbursableExpense: ExpenseSheetLineReimbursableExpense | null;
  reimbursableAmount: number | null;
  refRecIdTable: string;
  createdByUserId: string;
  adjustmentAmount: boolean | null;
};

const toNullableGastoType = (value: unknown): ExpenseGastoTypeCode | null => {
  return toExpenseGastoTypeCode(value);
};

const toNullableTicketStatus = (value: unknown): number | null => {
  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed >= 0) {
    return parsed;
  }
  return null;
};

// Maps one API detail dto to the ticket header model used by detail pages.
export const mapExpenseTicketDetailHeader = (item: ExpenseSheetTicketDetailDto): ExpenseTicketDetailHeader => {
  return {
    fileId: safeText(item?.FileId),
    description: safeText(item?.Description),
    status: toNullableTicketStatus(item?.Status),
    hojaGastosIdDisplay: safeText(item?.HojaGastosIdDisplay),
    processedByAI: toNullableBool(item?.ProcessedByAI),
    currencyCode: safeText(item?.CurrencyCode),
    totalAmount: toNullableNumber(item?.TotalAmount),
    totalAmountCurrency: toNullableNumber(item?.TotalAmountCurrency ?? item?.TotalAmount),
    visibleReimbursableTotal: getVisibleReimbursableTotal({
      TotalAmountMST: toNullableNumber(item?.TotalAmountMST),
      AmountMST: toNullableNumber(item?.AmountMST ?? item?.amountMST),
      TotalAmountCurrency: toNullableNumber(item?.TotalAmountCurrency),
      TotalAmount: toNullableNumber(item?.TotalAmount),
    }),
    amountMST: toNullableNumber(item?.TotalAmountMST ?? item?.AmountMST ?? item?.amountMST),
    exchRate: toNullableNumber(item?.ExchRate ?? item?.exchRate),
    createdByUserId: safeText(item?.CreatedByUserId),
    ownerAxUserId: safeText(item?.OwnerAxUserId ?? item?.ownerAxUserId),
    ownerName: safeText(item?.OwnerName ?? item?.ownerName) || null,
    transDate: safeText(item?.TransDate),
    ticketDate: safeText(item?.TicketDate),
    ticketTime: safeText(item?.TicketTime),
    comentario: safeText(item?.Comentario),
    urlFile: safeText(item?.UrlFile),
    fileName: safeText(item?.FileName),
    gastoType: toNullableGastoType(item?.GastoType),
  };
};

// Maps one API line dto to the UI model used by ticket detail components.
export const mapExpenseTicketDetailLine = (line: ExpenseSheetTicketLineDto): ExpenseTicketDetailLine => {
  return {
    recId: safeText(line?.RecId),
    description: safeText(line?.Description),
    qty: toNullableNumber(line?.Qty),
    price: toNullableNumber(line?.Price),
    totalAmount: toNullableNumber(line?.TotalAmount),
    reimbursableExpense: toExpenseSheetLineReimbursableExpense(
      line?.ReimbursableExpense ?? line?.reimbursableExpense
    ),
    reimbursableAmount: toNullableNumber(line?.ReimbursableAmount ?? line?.reimbursableAmount),
    refRecIdTable: safeText(line?.RefRecIdTable),
    createdByUserId: safeText(line?.CreatedByUserId),
    adjustmentAmount: toNullableBool(line?.AdjustmentAmount ?? (line as { adjustmentAmount?: unknown })?.adjustmentAmount),
  };
};
