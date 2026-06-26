import type { ExpenseGastoTypeCode, ExpenseSheetTicketLineDto } from "../../expenseTypes.ts";
import { toExpenseGastoTypeCode } from "../../constants/expenseGastoTypeCatalog.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";
import type { ExpenseSheetTicketDetailDto } from "../../expenseTypes.ts";

export type ExpenseTicketDetailHeader = {
  fileId: string;
  description: string;
  status: number | null;
  hojaGastosIdDisplay: string;
  processedByAI: boolean | null;
  currencyCode: string;
  totalAmount: number | null;
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
  refRecIdTable: string;
  createdByUserId: string;
  adjustmentAmount: boolean | null;
};

export const toNullableNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

export const toNullableBool = (value: unknown): boolean | null => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value === 1 ? true : value === 0 ? false : null;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1") return true;
    if (normalized === "false" || normalized === "0") return false;
  }
  return null;
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
    recId: String(line?.RecId || "").trim(),
    description: String(line?.Description || "").trim(),
    qty: typeof line?.Qty === "number" ? line.Qty : null,
    price: typeof line?.Price === "number" ? line.Price : null,
    totalAmount: typeof line?.TotalAmount === "number" ? line.TotalAmount : null,
    refRecIdTable: String(line?.RefRecIdTable || "").trim(),
    createdByUserId: String(line?.CreatedByUserId || "").trim(),
    adjustmentAmount: toNullableBool(line?.AdjustmentAmount ?? (line as { adjustmentAmount?: unknown })?.adjustmentAmount),
  };
};
