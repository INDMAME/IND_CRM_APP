import { useEffect, useReducer } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import { fetchExpenseSheetDetail, mapExpenseSheetHeader } from "../utils/expenseApi.ts";
import { isExpenseAbortLikeError } from "../utils/expenseRequestRetry.ts";
import { hasAssignedVoucher, safeText } from "../utils/expenseUiUtils.ts";
import { resolveExpenseSheetDetailPolicy } from "../detail/expenseSheetDetailPolicy.ts";
import { isManagingOtherExpenseRecord } from "../utils/expenseManagedUserScope.ts";

const EXPENSE_STATUS_PAID = 4;

type LinkSheetGateState = {
  linkSheetLocked: boolean;
  linkSheetBlockedMessage: string;
  linkSheetCheckBusy: boolean;
};

type LinkSheetGateAction =
  | {
      type: "replace";
      nextState: LinkSheetGateState;
    }
  | {
      type: "patch";
      patch: Partial<LinkSheetGateState>;
    };

type UseExpenseTicketLinkSheetGateArgs = {
  isLinkMode: boolean;
  linkSheetId: string;
  canProcessLinkMode: boolean;
  allowSelfManagement: boolean;
  canManageOtherUsers: boolean;
  currentAxUserId: string;
  currentCrmUserId: string;
  selectedManagedUserId: string;
  resolveBlockedMessage: (isPaid: boolean) => string;
};

const INITIAL_LINK_SHEET_GATE_STATE: LinkSheetGateState = {
  linkSheetLocked: false,
  linkSheetBlockedMessage: "",
  linkSheetCheckBusy: false,
};

const linkSheetGateReducer = (state: LinkSheetGateState, action: LinkSheetGateAction): LinkSheetGateState => {
  switch (action.type) {
    case "replace":
      return action.nextState;
    case "patch":
      return {
        ...state,
        ...action.patch,
      };
    default:
      return state;
  }
};

// Validates the target sheet state before link-mode actions can run.
export const useExpenseTicketLinkSheetGate = ({
  isLinkMode,
  linkSheetId,
  canProcessLinkMode,
  allowSelfManagement,
  canManageOtherUsers,
  currentAxUserId,
  currentCrmUserId,
  selectedManagedUserId,
  resolveBlockedMessage,
}: UseExpenseTicketLinkSheetGateArgs) => {
  const [state, dispatch] = useReducer(linkSheetGateReducer, INITIAL_LINK_SHEET_GATE_STATE);

  useEffect(() => {
    if (!isLinkMode || !linkSheetId) {
      dispatch({
        type: "replace",
        nextState: INITIAL_LINK_SHEET_GATE_STATE,
      });
      return;
    }

    if (!canProcessLinkMode) {
      dispatch({
        type: "replace",
        nextState: {
          linkSheetLocked: true,
          linkSheetBlockedMessage: indT("Auth_PermissionDenied_Body", "No permission."),
          linkSheetCheckBusy: false,
        },
      });
      return;
    }

    let cancelled = false;
    dispatch({
      type: "patch",
      patch: {
        linkSheetCheckBusy: true,
      },
    });

    void (async () => {
      try {
        const response = await fetchExpenseSheetDetail(linkSheetId, {
          suppressPermissionModal: true,
        });
        if (cancelled) return;

        if (response?.Success === false) {
          dispatch({
            type: "replace",
            nextState: {
              linkSheetLocked: true,
              linkSheetBlockedMessage:
                safeText(response.Message) || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."),
              linkSheetCheckBusy: false,
            },
          });
          return;
        }

        const headers = Array.isArray(response?.Items) ? response.Items : [];
        const selectedSheet =
          headers.find(
            (entry) =>
              safeText((entry as { HojaGastosId?: unknown })?.HojaGastosId).toUpperCase() === linkSheetId.toUpperCase()
          ) ||
          headers[0] ||
          null;

        if (!selectedSheet) {
          dispatch({
            type: "replace",
            nextState: {
              linkSheetLocked: true,
              linkSheetBlockedMessage: indT("ExpenseSheets_NotFound", "Expense sheet was not found."),
              linkSheetCheckBusy: false,
            },
          });
          return;
        }

        const mappedHeader = mapExpenseSheetHeader(selectedSheet);
        const statusCode = typeof mappedHeader.expenseSheetStatus === "number" ? mappedHeader.expenseSheetStatus : null;
        const isPaid = statusCode === EXPENSE_STATUS_PAID || hasAssignedVoucher(mappedHeader.voucher);
        const isManagingOtherUser = isManagingOtherExpenseRecord({
          canManageOtherUsers,
          currentAxUserId,
          currentCrmUserId,
          selectedManagedUserId,
          recordOwnerUserId: mappedHeader.userId,
          isCreateMode: false,
        });
        const detailPolicy = resolveExpenseSheetDetailPolicy({
          statusCode,
          isManagingOtherUser,
          allowSelfManagement,
          isPaid,
        });
        const isLocked = detailPolicy.interactionMode !== "full_edit";

        dispatch({
          type: "replace",
          nextState: {
            linkSheetLocked: isLocked,
            linkSheetBlockedMessage: isLocked ? resolveBlockedMessage(isPaid) : "",
            linkSheetCheckBusy: false,
          },
        });
      } catch (error) {
        if (cancelled) return;

        if (isExpenseAbortLikeError(error)) {
          dispatch({
            type: "patch",
            patch: {
              linkSheetCheckBusy: false,
            },
          });
          return;
        }

        dispatch({
          type: "replace",
          nextState: {
            linkSheetLocked: true,
            linkSheetBlockedMessage:
              error instanceof ApiFetchError && error.status === 403
                ? indT("Auth_PermissionDenied_Body", "No permission.")
                : error instanceof Error
                  ? error.message
                  : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."),
            linkSheetCheckBusy: false,
          },
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    allowSelfManagement,
    canManageOtherUsers,
    canProcessLinkMode,
    currentAxUserId,
    currentCrmUserId,
    isLinkMode,
    linkSheetId,
    resolveBlockedMessage,
    selectedManagedUserId,
  ]);

  return state;
};
