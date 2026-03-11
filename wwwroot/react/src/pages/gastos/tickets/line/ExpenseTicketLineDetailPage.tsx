import React, { useCallback, useMemo } from "react";
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
import { reloadExpensePage, navigateToExpenseUrl } from "../../utils/expenseNavigation.ts";
import {
  appendExpenseTicketReturnQuery,
  normalizeExpenseTicketReturnContext,
  resolveExpenseTicketReturnContext,
  saveExpenseTicketReturnContext,
} from "../../utils/expenseTicketReturnContext.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";
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

const ExpenseTicketLineDetailContent = () => {
  const { canManageOtherUsers, currentAxUserId, selectedManagedUserId, managementBootstrapReady } = useAuthContext();
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canEditTicketByModule = canAccess("GASTOS_TICKETS", "Edit");
  const canDeleteTicketByModule = canAccess("GASTOS_TICKETS", "FullAccess");
  const fileId = safeText(window.__EXPENSE_TICKET_FILE_ID__);
  const lineRecId = safeText(window.__EXPENSE_TICKET_LINE_ID__);
  const routeParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const routeOrigin = useMemo(() => safeText(routeParams.get("origin")).toLowerCase(), [routeParams]);
  const routeSheetId = useMemo(() => safeText(routeParams.get("sheetId")), [routeParams]);
  const explicitReturnContext = useMemo(
    () =>
      normalizeExpenseTicketReturnContext({
        fileId,
        origin: routeOrigin,
        sheetId: routeSheetId,
      }),
    [fileId, routeOrigin, routeSheetId]
  );
  const ticketReturnContext = useMemo(
    () => resolveExpenseTicketReturnContext(fileId, explicitReturnContext),
    [explicitReturnContext, fileId]
  );
  const detailOrigin = ticketReturnContext?.origin || routeOrigin;
  const allowAssignedDraftEdit = detailOrigin === "sheet-create";

  React.useEffect(() => {
    if (!explicitReturnContext) return;
    saveExpenseTicketReturnContext(explicitReturnContext);
  }, [explicitReturnContext]);
  const isManagingOtherUser = isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId,
  });
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
    canEditTicket,
    fileId,
    lineRecId,
    allowAssignedDraftEdit,
    onForbidden: showPermissionModal,
  });

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
  const isContextLocked = isAssignedTicket && !allowAssignedDraftEdit;
  const ticketDetailUrl = useMemo(() => {
    const safeFileId = safeText(fileId);
    if (!safeFileId) return "";
    const query = new URLSearchParams({
      fileId: safeFileId,
    });
    appendExpenseTicketReturnQuery(query, ticketReturnContext);
    return `/Gastos/TicketDetail?${query.toString()}`;
  }, [fileId, ticketReturnContext]);

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

  const handleModalButtonConfirm = useCallback(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    void handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);

  const { handleUpdate, handleDelete } = useExpenseTicketLineDetailMutations({
    busy,
    isEditing,
    canEditTicket,
    canDeleteTicket,
    fileId,
    lineRecId,
    draftDescription,
    draftQty,
    draftPrice,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
  });

  useExpenseTicketLineDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    isLocked: isContextLocked || isManagingOtherUser,
    permissionsReady: managementBootstrapReady,
    canEditTicket,
    canDeleteTicket,
    fileId,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      reloadExpensePage();
    },
    onDeleteSuccess: () => {
      if (!ticketDetailUrl) return;
      navigateToExpenseUrl(ticketDetailUrl);
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

      {!isLoading && !errorMessage && header && line ? (
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
