import React, { useCallback, useMemo, useState } from "react";
import VisitasPageProviders from "../../../../components/commons/VisitasPageProviders.tsx";
import ConfirmModal from "../../../../components/commons/ConfirmModal.tsx";
import { useAuthContext } from "../../../../context/AuthContext.tsx";
import { useConfirmDialog } from "../../../../hooks/useConfirmDialog.ts";
import { canAccess, showPermissionModal } from "../../../../utils/permissions.ts";
import { indT } from "../../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../../utils/reactIsland.tsx";
import ExpenseTicketLineDetailForm from "../../components/ExpenseTicketLineDetailForm.tsx";
import { formatAmountWithCurrency } from "../../expenseFormatters.ts";
import { parseDecimalInput } from "../../hooks/expenseMutationUtils.ts";
import { configureExpenseApiAuth } from "../../utils/expenseApi.ts";
import { isManagingOtherExpenseUser } from "../../utils/expenseManagedUserScope.ts";
import { clearExpenseNavigationGuard, reloadExpensePage, navigateToExpenseUrl, setExpenseNavigationGuard } from "../../utils/expenseNavigation.ts";
import { readExpenseTicketSheetSyncState } from "../../utils/expenseTicketSheetSyncState.ts";
import {
  appendExpenseTicketReturnQuery,
  normalizeExpenseTicketReturnContext,
  resolveExpenseTicketReturnContext,
  saveExpenseTicketReturnContext,
} from "../../utils/expenseTicketReturnContext.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";
import { useExpenseTicketLinkSheetGate } from "../useExpenseTicketLinkSheetGate.ts";
import { useExpenseTicketLineDetailMutations } from "./useExpenseTicketLineDetailMutations.ts";
import { useExpenseTicketLineDetailState } from "./useExpenseTicketLineDetailState.ts";
import { useExpenseTicketLineDetailTopbarActions } from "./useExpenseTicketLineDetailTopbarActions.ts";

// Initializes auth seed for expense API calls before island effects run.
const bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__),
  });
};

// Consumes the one-time edit handoff so later reloads return to normal view mode.
const consumeTicketLineEditModeQuery = () => {
  if (typeof window === "undefined") {
    return;
  }

  const currentUrl = new URL(window.location.href);
  if (safeText(currentUrl.searchParams.get("mode")).toLowerCase() !== "edit") {
    return;
  }

  currentUrl.searchParams.delete("mode");
  const nextUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
  window.history.replaceState(window.history.state, "", nextUrl);
};

const resolveLinkedTicketBlockedMessage = (isPaid: boolean): string => {
  if (isPaid) {
    return indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura.");
  }

  return indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
};

const ExpenseTicketLineDetailContent = () => {
  const {
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    managementBootstrapReady,
  } = useAuthContext();
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canEditTicketByModule = canAccess("GASTOS_TICKETS", "Edit");
  const canDeleteTicketByModule = canAccess("GASTOS_TICKETS", "FullAccess");
  const fileId = safeText(window.__EXPENSE_TICKET_FILE_ID__);
  const lineRecId = safeText(window.__EXPENSE_TICKET_LINE_ID__);
  const routeParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const isCreateMode = useMemo(() => safeText(routeParams.get("mode")).toLowerCase() === "create", [routeParams]);
  const startInEditMode = useMemo(() => safeText(routeParams.get("mode")).toLowerCase() === "edit", [routeParams]);
  const routeOrigin = useMemo(() => safeText(routeParams.get("origin")).toLowerCase(), [routeParams]);
  const routeSheetId = useMemo(() => safeText(routeParams.get("sheetId")), [routeParams]);
  const routeSheetLineRecId = useMemo(() => safeText(routeParams.get("sheetLineRecId")), [routeParams]);
  const explicitReturnContext = useMemo(
    () =>
      normalizeExpenseTicketReturnContext({
        fileId,
        origin: routeOrigin,
        sheetId: routeSheetId,
        sheetLineRecId: routeSheetLineRecId,
      }),
    [fileId, routeOrigin, routeSheetId, routeSheetLineRecId]
  );
  const ticketReturnContext = useMemo(
    () => resolveExpenseTicketReturnContext(fileId, explicitReturnContext),
    [explicitReturnContext, fileId]
  );
  const detailOrigin = ticketReturnContext?.origin || routeOrigin;
  const autoEditAttemptedRef = React.useRef(false);
  const [sheetSyncBlocked, setSheetSyncBlocked] = useState(() => !!readExpenseTicketSheetSyncState(fileId));
  const [sheetSyncBlockedMessage, setSheetSyncBlockedMessage] = useState(() =>
    safeText(readExpenseTicketSheetSyncState(fileId)?.message)
  );

  React.useEffect(() => {
    if (!explicitReturnContext) return;
    saveExpenseTicketReturnContext(explicitReturnContext);
  }, [explicitReturnContext]);

  React.useEffect(() => {
    const syncState = readExpenseTicketSheetSyncState(fileId);
    setSheetSyncBlocked(!!syncState);
    setSheetSyncBlockedMessage(safeText(syncState?.message));
  }, [fileId]);

  React.useEffect(() => {
    if (!startInEditMode) {
      return;
    }

    consumeTicketLineEditModeQuery();
  }, [startInEditMode]);
  const isManagingOtherUser = isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId,
  });
  const canCreateTicketLine = canEditTicketByModule && !isManagingOtherUser;
  const canEditTicket = canEditTicketByModule && !isManagingOtherUser;
  const canDeleteTicket = canDeleteTicketByModule && !isManagingOtherUser;

  const {
    header,
    line,
    isLoading,
    errorMessage,
    busy,
    status,
    isEditing,
    modalError,
    draftDescription,
    draftQty,
    draftPrice,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftQty,
    setDraftPrice,
    handleEnableEdit,
    handleCancelEdit,
  } = useExpenseTicketLineDetailState({
    hasAccess,
    isCreateMode,
    canEditTicket,
    fileId,
    lineRecId,
    onForbidden: showPermissionModal,
  });

  const linkedExpenseSheetId = useMemo(
    () => safeText(ticketReturnContext?.sheetId || header?.hojaGastosIdDisplay || routeSheetId),
    [header?.hojaGastosIdDisplay, routeSheetId, ticketReturnContext]
  );
  const { linkSheetLocked, linkSheetBlockedMessage, linkSheetCheckBusy } = useExpenseTicketLinkSheetGate({
    isLinkMode: !!linkedExpenseSheetId,
    linkSheetId: linkedExpenseSheetId,
    canProcessLinkMode: true,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    resolveBlockedMessage: resolveLinkedTicketBlockedMessage,
  });
  const canEditLinkedTicket = !linkedExpenseSheetId || (!linkSheetCheckBusy && !linkSheetLocked);
  const canCreateLinkedTicketLine = !linkedExpenseSheetId || (!linkSheetCheckBusy && !linkSheetLocked);
  const allowAssignedDraftEdit = detailOrigin === "sheet-create" || (!!linkedExpenseSheetId && canEditLinkedTicket);
  const pendingFirstLink =
    detailOrigin === "sheet-create" && !!safeText(ticketReturnContext?.sheetId || routeSheetId) && !safeText(header?.hojaGastosIdDisplay);
  const workflowBlockedMessage = pendingFirstLink
    ? indT("ExpenseTickets_SheetSync_PendingSaveRequired", "Save the ticket before leaving this flow.")
    : sheetSyncBlockedMessage ||
      indT(
        "ExpenseTickets_SheetSync_RetryRequired",
        "Ticket data changed, but we could not sync the expense line. Save again before leaving."
      );
  const shouldBlockWorkflowExit = pendingFirstLink || sheetSyncBlocked;
  const handleEnableEditInContext = useCallback(() => {
    if (linkSheetCheckBusy) {
      return;
    }

    if (linkedExpenseSheetId && linkSheetLocked) {
      const message =
        safeText(linkSheetBlockedMessage) ||
        resolveLinkedTicketBlockedMessage(false);
      setModalError(message);
      setStatus(message);
      return;
    }

    handleEnableEdit();
  }, [
    handleEnableEdit,
    linkSheetBlockedMessage,
    linkSheetCheckBusy,
    linkSheetLocked,
    linkedExpenseSheetId,
    setModalError,
    setStatus,
  ]);

  React.useEffect(() => {
    if (!shouldBlockWorkflowExit) {
      clearExpenseNavigationGuard();
      return;
    }

    setExpenseNavigationGuard({
      active: true,
      message: workflowBlockedMessage,
      block: true,
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [busy, isEditing, shouldBlockWorkflowExit, workflowBlockedMessage]);

  React.useEffect(() => {
    if (!startInEditMode || autoEditAttemptedRef.current) {
      return;
    }
    if (isLoading || !header || !line || linkSheetCheckBusy) {
      return;
    }

    autoEditAttemptedRef.current = true;
    handleEnableEditInContext();
  }, [handleEnableEditInContext, header, isLoading, line, linkSheetCheckBusy, startInEditMode]);

  const draftQtyValue = parseDecimalInput(draftQty);
  const draftPriceValue = parseDecimalInput(draftPrice);
  const calculatedAmountPreview =
    isEditing && draftQtyValue != null && draftQtyValue > 0 && draftPriceValue != null && draftPriceValue > 0
      ? draftQtyValue * draftPriceValue
      : line?.totalAmount ?? null;

  const amountText = useMemo(
    () => formatAmountWithCurrency(calculatedAmountPreview, safeText(header?.currencyCode)),
    [calculatedAmountPreview, header?.currencyCode]
  );
  const priceText = useMemo(
    () => formatAmountWithCurrency(line?.price ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, line?.price]
  );
  const isAssignedTicket = header?.status === 1;
  const isContextLocked = (isAssignedTicket && !allowAssignedDraftEdit) || (!!linkedExpenseSheetId && linkSheetLocked);
  const ticketDetailUrl = useMemo(() => {
    const safeFileId = safeText(fileId);
    if (!safeFileId) return "";
    const query = new URLSearchParams({
      fileId: safeFileId,
    });
    appendExpenseTicketReturnQuery(query, ticketReturnContext);
    return `/Gastos/TicketDetail?${query.toString()}`;
  }, [fileId, ticketReturnContext]);
  const ticketDetailEditUrl = useMemo(() => {
    const safeFileId = safeText(fileId);
    if (!safeFileId) return "";
    const query = new URLSearchParams({
      fileId: safeFileId,
      mode: "edit",
    });
    appendExpenseTicketReturnQuery(query, ticketReturnContext);
    return `/Gastos/TicketDetail?${query.toString()}`;
  }, [fileId, ticketReturnContext]);
  const preferredTicketDetailUrl = pendingFirstLink ? ticketDetailEditUrl : ticketDetailUrl;

  React.useEffect(() => {
    if (!shouldBlockWorkflowExit || !preferredTicketDetailUrl) {
      return;
    }

    const backButton = document.getElementById("globalBackBtn");
    const handleTopbarBack = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation?.();
      navigateToExpenseUrl(preferredTicketDetailUrl, {
        askConfirmation: false,
        bypassGuardOnce: true,
      });
    };
    const handleNativeBack = (event: PopStateEvent) => {
      if (event?.state && event.state.indTrap === true) {
        return;
      }

      window.__indBypassNavigationGuardOnce?.();
      window.location.replace(preferredTicketDetailUrl);
    };

    backButton?.addEventListener("click", handleTopbarBack, true);
    window.addEventListener("popstate", handleNativeBack);
    return () => {
      backButton?.removeEventListener("click", handleTopbarBack, true);
      window.removeEventListener("popstate", handleNativeBack);
    };
  }, [preferredTicketDetailUrl, shouldBlockWorkflowExit]);

  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel"),
  });

  const handleModalConfirm = useCallback(async () => {
    setModalError("");
    await handleConfirm({
      busy,
      onError: (msg) => {
        setModalError(msg);
        setStatus(msg);
      },
    });
  }, [busy, handleConfirm, setModalError, setStatus]);

  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = busy
    ? modalLoadingText
    : !busy && modalError
      ? indT("Common_OK", "OK")
      : modal.confirmText || indT("Confirm_Yes", "OK");

  React.useEffect(() => {
    if (!shouldBlockWorkflowExit || busy) return;
    if (!workflowBlockedMessage || status === workflowBlockedMessage) return;
    setStatus(workflowBlockedMessage);
  }, [busy, setStatus, shouldBlockWorkflowExit, status, workflowBlockedMessage]);

  const handleModalButtonConfirm = useCallback(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);

  const handleCancelEditInContext = useCallback(() => {
    if (!isCreateMode) {
      handleCancelEdit();
      return;
    }

    if (!preferredTicketDetailUrl) {
      return;
    }

    navigateToExpenseUrl(preferredTicketDetailUrl, {
      askConfirmation: !shouldBlockWorkflowExit,
      bypassGuardOnce: shouldBlockWorkflowExit,
    });
  }, [handleCancelEdit, isCreateMode, preferredTicketDetailUrl, shouldBlockWorkflowExit]);

  const { handleUpdate, handleDelete } = useExpenseTicketLineDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    canCreateTicket: canCreateTicketLine && canCreateLinkedTicketLine,
    canEditTicket: canEditTicket && canEditLinkedTicket,
    canDeleteTicket: canDeleteTicket && canEditLinkedTicket,
    fileId,
    lineRecId,
    draftDescription,
    draftQty,
    draftPrice,
    linkedExpenseSheetId,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    skipLinkedSheetSyncOnCreate: pendingFirstLink,
    onLinkedSheetSyncFailure: (message) => {
      setSheetSyncBlocked(true);
      setSheetSyncBlockedMessage(message);
      setStatus(message);
    },
    onLinkedSheetSyncSuccess: () => {
      setSheetSyncBlocked(false);
      setSheetSyncBlockedMessage("");
    },
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
  });

  useExpenseTicketLineDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    isLocked: isContextLocked || isManagingOtherUser,
    permissionsReady: managementBootstrapReady,
    canCreateTicket: canCreateTicketLine && canCreateLinkedTicketLine,
    canEditTicket: canEditTicket && canEditLinkedTicket,
    canDeleteTicket: canDeleteTicket && canEditLinkedTicket,
    fileId,
    setModalError,
    handleEnableEdit: handleEnableEditInContext,
    handleCancelEdit: handleCancelEditInContext,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      if (isCreateMode) {
        const returnUrl = readExpenseTicketSheetSyncState(fileId) ? ticketDetailEditUrl : preferredTicketDetailUrl;
        if (!returnUrl) return;
        navigateToExpenseUrl(returnUrl, {
          askConfirmation: false,
          bypassGuardOnce: true,
        });
        return;
      }

      reloadExpensePage();
    },
    onDeleteSuccess: () => {
      if (!preferredTicketDetailUrl) return;
      navigateToExpenseUrl(preferredTicketDetailUrl, {
        askConfirmation: false,
        bypassGuardOnce: true,
      });
    },
    openConfirm,
    closeConfirm,
  });

  return (
    <div className="space-y-2">
      <ConfirmModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        confirmText={modalConfirmText}
        cancelText={modalCancelText}
        loadingText={modalLoadingText}
        showCancel={modal.showCancel}
        showConfirm={modal.showConfirm}
        busy={busy}
        error={modalError}
        status={status}
        onConfirm={handleModalButtonConfirm}
        onCancel={closeConfirm}
      />

      <div
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700"
        style={{ display: isLoading ? "flex" : "none" }}
      >
        <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {indT("Common_Loading", "Loading")}
      </div>

      {errorMessage ? <div className="text-danger">{errorMessage}</div> : null}

      {!isLoading && !errorMessage && header && (line || isCreateMode) ? (
        <ExpenseTicketLineDetailForm
          header={header}
          line={line}
          status={status}
          isEditing={isEditing}
          draftDescription={draftDescription}
          draftQty={draftQty}
          draftPrice={draftPrice}
          priceText={priceText}
          amountText={amountText}
          onDraftDescriptionChange={setDraftDescription}
          onDraftQtyChange={setDraftQty}
          onDraftPriceChange={setDraftPrice}
        />
      ) : null}
    </div>
  );
};

// Main page entry for ticket line detail.
const ExpenseTicketLineDetailPage = () => {
  return (
    <VisitasPageProviders enableExpenseManagement>
      <ExpenseTicketLineDetailContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-ticket-line-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseTicketLineDetailPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseTicketLineDetailPage;
