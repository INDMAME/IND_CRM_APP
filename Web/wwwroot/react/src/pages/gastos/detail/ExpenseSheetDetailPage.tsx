import React, { useCallback, useMemo, useRef, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import FloatingActionButton from "../../../components/commons/FloatingActionButton.tsx";
import { useAuthContext } from "../../../context/AuthContext.tsx";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import type { ExpenseSheetLine } from "../expenseTypes.ts";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import ExpenseSheetHeaderForm from "../components/ExpenseSheetHeaderForm.tsx";
import ExpenseLinesTimeline from "../components/ExpenseLinesTimeline.tsx";
import { safeText } from "../utils/expenseUiUtils.ts";
import { configureExpenseApiAuth } from "../utils/expenseApi.ts";
import { useExpenseSheetDetailMutations } from "./useExpenseSheetDetailMutations.ts";
import { useExpenseSheetDetailTopbarActions } from "./useExpenseSheetDetailTopbarActions.ts";
import { useExpenseSheetDetailState } from "./useExpenseSheetDetailState.ts";

const LINES_PAGE_SIZE = 6;

const pagedSlice = <T,>(items: T[], page: number, pageSize: number): T[] => {
  if (!items.length) return [];
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

// Initializes auth seed for expense API calls before island effects run.
const bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__),
  });
};

const ExpenseSheetDetailPageContent = () => {
  const { allowSelfManagement } = useAuthContext();
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canEditExpenseByModule = canAccess("GASTOS_HOJA_GASTO", "Edit");
  const canDeleteExpense = canAccess("GASTOS_HOJA_GASTO", "FullAccess");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const sheetMode = safeText(window.__EXPENSE_SHEET_MODE__).toLowerCase();
  const isCreateMode = sheetMode === "create";
  const canEditExpenseStatus = allowSelfManagement === true && !isCreateMode;
  const canEditExpense = canEditExpenseByModule || canEditExpenseStatus;
  const lineContainerRef = useRef<HTMLDivElement | null>(null);
  const createdSheetIdRef = useRef("");
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = useState(false);

  const paginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );

  const {
    header,
    lines,
    linePage,
    isLoading,
    errorMessage,
    busy,
    status,
    isEditing,
    modalError,
    draftDescription,
    draftProjectId,
    draftCurrencyCode,
    draftExchangeRate,
    draftExpenseSheetStatus,
    officialExchangeRateValue,
    isExchangeRateLoading,
    exchangeRateMessage,
    exchangeRateMessageIsError,
    projectValue,
    voucherValue,
    isSheetPaid,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount,
    exchangeRateValidationMessage,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    setLinePage,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftProjectId,
    setDraftCurrencyCode,
    setDraftExchangeRate,
    setDraftExpenseSheetStatus,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateLineMode,
    navigateToCreatedSheet,
    navigateToLineDetail,
  } = useExpenseSheetDetailState({
    hasAccess,
    canCreateExpense,
    canEditExpense,
    canEditHeaderFields: canEditExpenseByModule,
    sheetId,
    isCreateMode,
    onForbidden: showPermissionModal,
  });

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
  }, [busy, handleConfirm]);

  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = busy
    ? modalLoadingText
    : (!busy && modalError ? indT("Common_OK", "OK") : (modal.confirmText || indT("Confirm_Yes", "OK")));

  const handleModalButtonConfirm = useCallback(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, closeConfirm, handleModalConfirm, modalError]);

  const visibleLines = useMemo(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const totalAmountText = useMemo(
    () => formatAmountWithCurrency(header?.totalAmount ?? null, safeText(header?.currencyCode)),
    [header]
  );

  const { handleUpdate, handleDelete } = useExpenseSheetDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isLocked: isSheetPaid,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    lockedCurrencyCode: safeText(header?.currencyCode),
    lockedExchangeRate: safeText(header?.exchRate),
    canCreateExpense,
    canEditExpense,
    canDeleteExpense,
    sheetId,
    draftDescription,
    draftCurrencyCode,
    draftExchangeRate,
    officialExchangeRateValue,
    draftProjectId,
    draftExpenseSheetStatus,
    currentExpenseSheetStatus: header?.expenseSheetStatus,
    exchangeRateBaseCurrency,
    onCreateSuccess: (createdSheetId) => {
      createdSheetIdRef.current = safeText(createdSheetId);
    },
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
  });

  const handleSaveSuccess = useCallback(() => {
    if (isCreateMode) {
      const createdSheetId = safeText(createdSheetIdRef.current);
      if (!createdSheetId) return;
      setIsRedirectingAfterCreate(true);
      navigateToCreatedSheet(createdSheetId);
      return;
    }

    window.location.reload();
  }, [isCreateMode, navigateToCreatedSheet]);

  useExpenseSheetDetailTopbarActions({
    busy: busy || isRedirectingAfterCreate,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    isLocked: isSheetPaid,
    canCreateExpense,
    canEditExpense,
    canDeleteExpense,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: handleSaveSuccess,
    openConfirm,
    closeConfirm,
  });

  const resolveClickableCard = useCallback((target: EventTarget | null) => {
    const node = target as HTMLElement | null;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest<HTMLElement>(".timeline-card--clickable");
    if (!card) return null;
    if (!lineContainerRef.current?.contains(card)) return null;
    return card;
  }, []);

  useTimelineCardEffects({
    containerRef: lineContainerRef,
    errorMessage,
    items: visibleLines,
    resolveClickableCard,
  });

  return (
    <div className="space-y-3">
      <ConfirmModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        confirmText={modalConfirmText}
        cancelText={modalCancelText}
        loadingText={modalLoadingText}
        showCancel={modal.showCancel}
        showConfirm={modal.showConfirm}
        busy={busy || isRedirectingAfterCreate}
        error={modalError}
        status={status}
        onConfirm={handleModalButtonConfirm}
        onCancel={closeConfirm}
      />

      <div
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700"
        style={{ display: isLoading || isRedirectingAfterCreate ? "flex" : "none" }}
      >
        <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {indT("Common_Loading", "Loading")}
      </div>

      {errorMessage ? <div className="text-danger">{errorMessage}</div> : null}

      {!isLoading && !isRedirectingAfterCreate && !errorMessage && header ? (
        <ExpenseSheetHeaderForm
          isCreateMode={isCreateMode}
          isEditing={isEditing}
          canEditHeaderFields={canEditExpenseByModule}
          canEditStatus={canEditExpenseStatus}
          header={header}
          projectValue={projectValue}
          voucherValue={voucherValue}
          isSheetPaid={isSheetPaid}
          isCurrencyLockedByLines={isCurrencyLockedByLines}
          isExchangeRateLockedByLines={isExchangeRateLockedByLines}
          normalizedDraftCurrency={normalizedDraftCurrency}
          exchangeRateBaseCurrency={exchangeRateBaseCurrency}
          exchangeRateReferenceAmount={exchangeRateReferenceAmount}
          showExchangeRate={showExchangeRate}
          exchangeRateValue={exchangeRateValue}
          exchangeRateValidationMessage={exchangeRateValidationMessage}
          totalAmountText={totalAmountText}
          draftDescription={draftDescription}
          draftProjectId={draftProjectId}
          draftCurrencyCode={draftCurrencyCode}
          draftExchangeRate={draftExchangeRate}
          draftExpenseSheetStatus={draftExpenseSheetStatus}
          isExchangeRateLoading={isExchangeRateLoading}
          exchangeRateMessage={exchangeRateMessage}
          exchangeRateMessageIsError={exchangeRateMessageIsError}
          onDraftDescriptionChange={setDraftDescription}
          onDraftProjectIdChange={setDraftProjectId}
          onDraftCurrencyCodeChange={setDraftCurrencyCode}
          onDraftExchangeRateChange={setDraftExchangeRate}
          onDraftExpenseSheetStatusChange={setDraftExpenseSheetStatus}
        />
      ) : null}

      {!isCreateMode && !isLoading && !isRedirectingAfterCreate && !errorMessage ? (
        <ExpenseLinesTimeline
          visibleLines={visibleLines}
          currencyCode={safeText(header?.currencyCode)}
          totalLinePages={totalLinePages}
          linePage={linePage}
          linesLabel={indT("ExpenseSheets_Lines", "Lines")}
          emptyText={indT("ExpenseSheets_NoLines", "No lines for this expense sheet.")}
          paginationLabels={paginationLabels}
          containerRef={lineContainerRef}
          onLinePageChange={setLinePage}
          onOpenLine={navigateToLineDetail}
        />
      ) : null}

      {canCreateExpense && !isCreateMode ? (
        <FloatingActionButton
          route=""
          ariaLabel={indT("Common_Create", "Create")}
          size={76}
          right={16}
          bottom={24}
          onClick={handleOpenCreateLineMode}
        />
      ) : null}
    </div>
  );
};

// Main page entry for expense sheet detail.
const ExpenseSheetDetailPage = () => {
  return (
    <VisitasPageProviders>
      <ExpenseSheetDetailPageContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseSheetDetailPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseSheetDetailPage;
