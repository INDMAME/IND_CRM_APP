import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import { resolveExpenseSheetDetailPolicy } from "../detail/expenseSheetDetailPolicy.ts";
import type { ExpenseSheetDetailDto, ExpenseSheetHeader, ExpenseSheetLine } from "../expenseTypes.ts";
import { fetchExpenseSheetDetail, mapExpenseSheetHeader, mapExpenseSheetLine } from "./expenseApi.ts";
import { isManagingOtherExpenseRecord, isSameExpenseUser } from "./expenseManagedUserScope.ts";
import { hasAssignedVoucher, safeText } from "./expenseUiUtils.ts";

const EXPENSE_STATUS_PAID = 4;

export type ExpenseSheetEditAccessResult = {
  sheetId: string;
  header: ExpenseSheetHeader | null;
  lines: ExpenseSheetLine[];
  isPaid: boolean;
  isManagingOtherUser: boolean;
  isCurrentUserExpenseOwner: boolean;
  isLocked: boolean;
  blockedMessage: string;
};

type ResolveExpenseSheetEditAccessArgs = {
  sheetId: string;
  allowSelfManagement: boolean;
  canManageOtherUsers: boolean;
  currentAxUserId: string;
  currentCrmUserId: string;
  selectedManagedUserId: string;
  suppressPermissionModal?: boolean;
};

const resolveLockedSheetMessage = (isPaid: boolean): string => {
  if (isPaid) {
    return indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura.");
  }

  return indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
};

const selectSheet = (items: unknown[], sheetId: string): ExpenseSheetDetailDto | null => {
  const safeSheetId = safeText(sheetId).toUpperCase();
  if (!Array.isArray(items) || items.length < 1) {
    return null;
  }

  const selected = items.find(
    (entry) => safeText((entry as { HojaGastosId?: unknown })?.HojaGastosId).toUpperCase() === safeSheetId
  );
  if (!selected || typeof selected !== "object") {
    return null;
  }

  return selected as ExpenseSheetDetailDto;
};

// Resolves whether one expense sheet can still be edited under current ownership and status rules.
export const resolveExpenseSheetEditAccess = async ({
  sheetId,
  allowSelfManagement,
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
  suppressPermissionModal = true,
}: ResolveExpenseSheetEditAccessArgs): Promise<ExpenseSheetEditAccessResult> => {
  const safeSheetId = safeText(sheetId);
  if (!safeSheetId) {
    return {
      sheetId: "",
      header: null,
      lines: [],
      isPaid: false,
      isManagingOtherUser: false,
      isCurrentUserExpenseOwner: false,
      isLocked: true,
      blockedMessage: indT("ExpenseSheets_NotFound", "Expense sheet was not found."),
    };
  }

  const requestedOwnerAxUserId = safeText(selectedManagedUserId || currentAxUserId);

  try {
    const response = await fetchExpenseSheetDetail(safeSheetId, {
      suppressPermissionModal,
      headers: requestedOwnerAxUserId
        ? {
            "X-IND-AxUserId": requestedOwnerAxUserId,
          }
        : undefined,
    });

    if (response?.Success === false) {
      return {
        sheetId: safeSheetId,
        header: null,
        lines: [],
        isPaid: false,
        isManagingOtherUser: false,
        isCurrentUserExpenseOwner: false,
        isLocked: true,
        blockedMessage:
          safeText(response.Message) || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."),
      };
    }

    const selectedSheet = selectSheet(response?.Items || [], safeSheetId);
    if (!selectedSheet) {
      return {
        sheetId: safeSheetId,
        header: null,
        lines: [],
        isPaid: false,
        isManagingOtherUser: false,
        isCurrentUserExpenseOwner: false,
        isLocked: true,
        blockedMessage: indT("ExpenseSheets_NotFound", "Expense sheet was not found."),
      };
    }

    const mappedHeader = mapExpenseSheetHeader(selectedSheet);
    const rawLines = Array.isArray(selectedSheet.Lines)
      ? selectedSheet.Lines
      : (Array.isArray(selectedSheet.lines) ? selectedSheet.lines : []);
    const mappedLines = rawLines.map(mapExpenseSheetLine);
    const statusCode = typeof mappedHeader.expenseSheetStatus === "number" ? mappedHeader.expenseSheetStatus : null;
    const isPaid = statusCode === EXPENSE_STATUS_PAID || hasAssignedVoucher(mappedHeader.voucher);
    const recordOwnerUserId = safeText(mappedHeader.ownerAxUserId || mappedHeader.userId);
    const isCurrentUserExpenseOwner =
      !!recordOwnerUserId &&
      (isSameExpenseUser(recordOwnerUserId, currentAxUserId) ||
        isSameExpenseUser(recordOwnerUserId, currentCrmUserId));
    const isManagingOtherUser = isManagingOtherExpenseRecord({
      canManageOtherUsers,
      currentAxUserId,
      currentCrmUserId,
      selectedManagedUserId,
      recordOwnerUserId,
      isCreateMode: false,
    });
    const detailPolicy = resolveExpenseSheetDetailPolicy({
      statusCode,
      isManagingOtherUser,
      allowSelfManagement,
      isPaid,
    });
    const isLocked = detailPolicy.interactionMode !== "full_edit";

    return {
      sheetId: safeSheetId,
      header: mappedHeader,
      lines: mappedLines,
      isPaid,
      isManagingOtherUser,
      isCurrentUserExpenseOwner,
      isLocked,
      blockedMessage: isLocked ? resolveLockedSheetMessage(isPaid) : "",
    };
  } catch (error) {
    const blockedMessage =
      error instanceof ApiFetchError && error.status === 403
        ? indT("Auth_PermissionDenied_Body", "No permission.")
        : error instanceof Error
          ? error.message
          : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail.");

    return {
      sheetId: safeSheetId,
      header: null,
      lines: [],
      isPaid: false,
      isManagingOtherUser: false,
      isCurrentUserExpenseOwner: false,
      isLocked: true,
      blockedMessage,
    };
  }
};
