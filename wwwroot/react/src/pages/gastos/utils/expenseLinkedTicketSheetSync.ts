import { indT } from "../../../utils/indI18n.ts";
import type {
  ExpenseSheetCreateLineRequest,
  ExpenseSheetDetailDto,
  ExpenseSheetLine,
  ExpenseSheetTicketDetailDto,
} from "../expenseTypes.ts";
import {
  getDefaultExpenseGastoTypeCode,
  toExpenseGastoTypeCode,
} from "../constants/expenseGastoTypeCatalog.ts";
import {
  createExpenseSheet,
  fetchExpenseSheetDetail,
  fetchExpenseSheetTicket,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
  updateExpenseSheetLine,
} from "./expenseApi.ts";
import { toExpenseApiDdMmYyyy } from "./expenseApiDateUtils.ts";
import { safeText } from "./expenseUiUtils.ts";

const PREFERRED_TICKET_GASTO_TYPE = 8;

type SyncExpenseLinkedTicketSheetLineArgs = {
  fileId: string;
  sheetId: string;
  lineRecId?: string;
  projectIdOverride?: string | null;
};

type SyncedTicketSnapshot = {
  description: string;
  transDate: string;
  totalAmount: number;
  gastoType: number;
};

const selectSheet = (items: unknown[], sheetId: string): ExpenseSheetDetailDto | null => {
  const safeSheetId = safeText(sheetId).toUpperCase();
  if (!Array.isArray(items) || items.length < 1) {
    return null;
  }

  const selected =
    items.find(
      (entry) =>
        safeText((entry as { HojaGastosId?: unknown })?.HojaGastosId).toUpperCase() === safeSheetId
    ) || items[0];
  if (!selected || typeof selected !== "object") {
    return null;
  }

  return selected as ExpenseSheetDetailDto;
};

const selectTicket = (items: unknown[], fileId: string): ExpenseSheetTicketDetailDto | null => {
  const safeFileId = safeText(fileId).toUpperCase();
  if (!Array.isArray(items) || items.length < 1) {
    return null;
  }

  const selected =
    items.find((entry) => safeText((entry as { FileId?: unknown })?.FileId).toUpperCase() === safeFileId) || items[0];
  if (!selected || typeof selected !== "object") {
    return null;
  }

  return selected as ExpenseSheetTicketDetailDto;
};

const resolveLinkedLine = (sheet: ExpenseSheetDetailDto, fileId: string, lineRecId?: string): ExpenseSheetLine | null => {
  const safeFileId = safeText(fileId).toUpperCase();
  const safeLineRecId = safeText(lineRecId).toUpperCase();
  const sourceLines = sheet.Lines ?? sheet.lines ?? [];
  const lines = Array.isArray(sourceLines) ? sourceLines : [];
  const mappedLines = lines.map((entry) => mapExpenseSheetLine(entry));
  if (safeLineRecId) {
    return mappedLines.find((entry) => safeText(entry.lineRecId).toUpperCase() === safeLineRecId) || null;
  }

  return mappedLines.find((entry) => safeText(entry.fileId).toUpperCase() === safeFileId) || null;
};

const resolveTicketSnapshot = (ticket: ExpenseSheetTicketDetailDto, existingLine: ExpenseSheetLine | null): SyncedTicketSnapshot => {
  const description = safeText(ticket.Description) || safeText(existingLine?.description) || "Ticket";
  const transDate =
    toExpenseApiDdMmYyyy(ticket.TransDate) || safeText(existingLine?.transDate) || toExpenseApiDdMmYyyy(new Date());
  const headerTotal = Number(ticket.TotalAmount || 0);
  const hasTicketLines = Array.isArray(ticket.Lines) && ticket.Lines.length > 0;
  const lineTotal = hasTicketLines
    ? ticket.Lines.reduce((sum, entry) => {
        const line = entry as { Price?: unknown; Qty?: unknown; TotalAmount?: unknown };
        const explicitTotal =
          line.TotalAmount === null || line.TotalAmount === undefined ? null : Number(line.TotalAmount);
        const qty = Number(line.Qty);
        const price = Number(line.Price);
        const value = explicitTotal !== null && Number.isFinite(explicitTotal)
          ? explicitTotal
          : Number.isFinite(qty) && Number.isFinite(price)
            ? qty * price
            : 0;
        return Number.isFinite(value) ? sum + value : sum;
      }, 0)
    : 0;
  const fallbackExistingAmount = Number(existingLine?.amount || existingLine?.price || 0);
  const totalAmount = hasTicketLines ? lineTotal : headerTotal !== 0 ? headerTotal : fallbackExistingAmount;
  const parsedGastoType = toExpenseGastoTypeCode(ticket.GastoType, { allowNone: false });
  const existingTypeValue = toExpenseGastoTypeCode(existingLine?.typeValueCode, { allowNone: false });
  const defaultGastoType = getDefaultExpenseGastoTypeCode(PREFERRED_TICKET_GASTO_TYPE);
  const gastoType =
    parsedGastoType !== null
      ? parsedGastoType
      : existingTypeValue !== null
        ? existingTypeValue
        : defaultGastoType;

  return {
    description,
    transDate,
    totalAmount,
    gastoType,
  };
};

const buildLinePayload = ({
  fileId,
  sheetProjectId,
  existingLine,
  ticketSnapshot,
  projectIdOverride,
  hasProjectIdOverride,
}: {
  fileId: string;
  sheetProjectId: string;
  existingLine: ExpenseSheetLine | null;
  ticketSnapshot: SyncedTicketSnapshot;
  projectIdOverride?: string | null;
  hasProjectIdOverride: boolean;
}): ExpenseSheetCreateLineRequest => {
  const resolvedProjectId = hasProjectIdOverride
    ? safeText(projectIdOverride)
    : safeText(existingLine?.projId || sheetProjectId);

  return {
    transDate: ticketSnapshot.transDate,
    typeValue: ticketSnapshot.gastoType,
    description: ticketSnapshot.description,
    internacional: existingLine?.internacional === true,
    fileId: safeText(fileId),
    ticket: true,
    qty: 1,
    price: ticketSnapshot.totalAmount,
    projId: resolvedProjectId || undefined,
    indAttachFiles: safeText(existingLine?.indAttachFiles) || undefined,
  };
};

// Synchronizes the expense-sheet snapshot line that is linked to one ticket file.
export const syncExpenseLinkedTicketSheetLine = async (args: SyncExpenseLinkedTicketSheetLineArgs): Promise<void> => {
  const { fileId, sheetId, lineRecId, projectIdOverride } = args;
  const hasProjectIdOverride = Object.prototype.hasOwnProperty.call(args, "projectIdOverride");
  const safeFileId = safeText(fileId);
  const safeSheetId = safeText(sheetId);
  if (!safeFileId || !safeSheetId) {
    throw new Error(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
  }

  const [sheetResponse, ticketResponse] = await Promise.all([
    fetchExpenseSheetDetail(safeSheetId, {
      suppressPermissionModal: true,
    }),
    fetchExpenseSheetTicket(safeFileId, {
      suppressPermissionModal: true,
    }),
  ]);

  if (sheetResponse?.Success === false) {
    throw new Error(
      safeText(sheetResponse.Message) || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail.")
    );
  }

  if (ticketResponse?.Success === false) {
    throw new Error(
      safeText(ticketResponse.Message) || indT("Tickets_Detail_LoadError", "Could not load ticket detail.")
    );
  }

  const selectedSheet = selectSheet(sheetResponse?.Items || [], safeSheetId);
  if (!selectedSheet) {
    throw new Error(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
  }

  const selectedTicket = selectTicket(ticketResponse?.Items || [], safeFileId);
  if (!selectedTicket) {
    throw new Error(indT("Tickets_Detail_NotFound", "Ticket was not found."));
  }

  const existingLine = resolveLinkedLine(selectedSheet, safeFileId, lineRecId);
  if (safeText(lineRecId) && !existingLine) {
    throw new Error(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
  }

  const sheetHeader = mapExpenseSheetHeader(selectedSheet);
  const ticketSnapshot = resolveTicketSnapshot(selectedTicket, existingLine);
  if (!(ticketSnapshot.totalAmount > 0)) {
    throw new Error(
      indT("ExpenseTickets_SheetSync_InvalidTotal", "The ticket must keep a positive total amount to sync the expense line.")
    );
  }

  const payload = buildLinePayload({
    fileId: safeFileId,
    sheetProjectId: safeText(sheetHeader.projId),
    existingLine,
    ticketSnapshot,
    projectIdOverride,
    hasProjectIdOverride,
  });

  if (existingLine?.lineRecId) {
    const updateResponse = await updateExpenseSheetLine(safeSheetId, existingLine.lineRecId, payload);
    if (!updateResponse.Success) {
      throw new Error(
        safeText(updateResponse.Message) || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed.")
      );
    }
    return;
  }

  const createResponse = await createExpenseSheet({
    mode: 2,
    existingHojaGastosId: safeSheetId,
    lines: [payload],
  });
  if (!createResponse.Success) {
    throw new Error(safeText(createResponse.Message) || indT("ExpenseSheets_Detail_UpdateFailed", "Update failed."));
  }
};
