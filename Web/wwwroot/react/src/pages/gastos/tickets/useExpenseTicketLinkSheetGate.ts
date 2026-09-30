import { useEffect, useReducer } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { isExpenseAbortLikeError } from "../utils/expenseRequestRetry.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { resolveExpenseSheetEditAccess } from "../utils/expenseSheetEditAccess.ts";
import type { ExpenseSheetLine } from "../expenseTypes.ts";

type LinkSheetGateState = {
  linkSheetLocked: boolean;
  linkSheetBlockedMessage: string;
  linkSheetCheckBusy: boolean;
  linkSheetCheckComplete: boolean;
  linkSheetLines: ExpenseSheetLine[];
  validatedOwnerAxUserId: string;
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
  isLineLinkMode?: boolean;
  linkSheetId: string;
  canProcessLinkMode: boolean;
  managementBootstrapReady?: boolean;
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
  linkSheetCheckComplete: false,
  linkSheetLines: [],
  validatedOwnerAxUserId: "",
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
  isLineLinkMode = false,
  linkSheetId,
  canProcessLinkMode,
  managementBootstrapReady = true,
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
          linkSheetCheckComplete: true,
          linkSheetLines: [],
          validatedOwnerAxUserId: "",
        },
      });
      return;
    }

    if (isLineLinkMode && !managementBootstrapReady) {
      dispatch({
        type: "replace",
        nextState: {
          linkSheetLocked: true,
          linkSheetBlockedMessage: "",
          linkSheetCheckBusy: true,
          linkSheetCheckComplete: false,
          linkSheetLines: [],
          validatedOwnerAxUserId: "",
        },
      });
      return;
    }

    if (isLineLinkMode && !safeText(currentAxUserId)) {
      dispatch({
        type: "replace",
        nextState: {
          linkSheetLocked: true,
          linkSheetBlockedMessage: indT("Auth_PermissionDenied_Body", "No permission."),
          linkSheetCheckBusy: false,
          linkSheetCheckComplete: true,
          linkSheetLines: [],
          validatedOwnerAxUserId: "",
        },
      });
      return;
    }

    let cancelled = false;
    dispatch({
      type: "patch",
      patch: {
        linkSheetLocked: true,
        linkSheetBlockedMessage: "",
        linkSheetCheckBusy: true,
        linkSheetCheckComplete: false,
        linkSheetLines: [],
        validatedOwnerAxUserId: "",
      },
    });

    void (async () => {
      try {
        const accessResult = await resolveExpenseSheetEditAccess({
          sheetId: linkSheetId,
          allowSelfManagement,
          canManageOtherUsers,
          currentAxUserId,
          currentCrmUserId,
          selectedManagedUserId: isLineLinkMode ? currentAxUserId : selectedManagedUserId,
        });
        if (cancelled) return;

        const isOwnerViolation = isLineLinkMode && !accessResult.isCurrentUserExpenseOwner;
        const isLocked = accessResult.isLocked || isOwnerViolation;

        dispatch({
          type: "replace",
          nextState: {
            linkSheetLocked: isLocked,
            linkSheetBlockedMessage:
              isOwnerViolation
                ? indT("Auth_PermissionDenied_Body", "No permission.")
                : isLocked && !safeText(accessResult.blockedMessage)
                ? resolveBlockedMessage(accessResult.isPaid)
                : safeText(accessResult.blockedMessage),
            linkSheetCheckBusy: false,
            linkSheetCheckComplete: true,
            linkSheetLines: isOwnerViolation ? [] : accessResult.lines,
            validatedOwnerAxUserId: isLocked ? "" : safeText(currentAxUserId),
          },
        });
      } catch (error) {
        if (cancelled) return;

        if (isExpenseAbortLikeError(error)) {
          dispatch({
            type: "replace",
            nextState: {
              linkSheetLocked: true,
              linkSheetBlockedMessage: indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."),
              linkSheetCheckBusy: false,
              linkSheetCheckComplete: true,
              linkSheetLines: [],
              validatedOwnerAxUserId: "",
            },
          });
          return;
        }

        dispatch({
          type: "replace",
          nextState: {
            linkSheetLocked: true,
            linkSheetBlockedMessage:
              error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."),
            linkSheetCheckBusy: false,
            linkSheetCheckComplete: true,
            linkSheetLines: [],
            validatedOwnerAxUserId: "",
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
    isLineLinkMode,
    linkSheetId,
    managementBootstrapReady,
    resolveBlockedMessage,
    selectedManagedUserId,
  ]);

  return state;
};
