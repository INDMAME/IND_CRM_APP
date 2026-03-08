import React, { useCallback, useMemo, useRef, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import FloatingActionButton, { type FloatingActionButtonMenuItem } from "../../../components/commons/FloatingActionButton.tsx";
import Spinner from "../../../components/commons/Spinner.tsx";
import { useAuthContext } from "../../../context/AuthContext.tsx";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import type { ExpenseSheetLine } from "../expenseTypes.ts";
import ExpenseSheetHeaderForm from "../components/ExpenseSheetHeaderForm.tsx";
import ExpenseLinesTimeline from "../components/ExpenseLinesTimeline.tsx";
import { safeText } from "../utils/expenseUiUtils.ts";
import { formatExpenseNumber } from "../utils/expenseNumberFormat.ts";
import { configureExpenseApiAuth } from "../utils/expenseApi.ts";
import { navigateToExpenseUrl } from "../utils/expenseNavigation.ts";
import { useExpenseSheetDetailMutations } from "./useExpenseSheetDetailMutations.ts";
import { useExpenseSheetDetailTopbarActions } from "./useExpenseSheetDetailTopbarActions.ts";
import { useExpenseSheetDetailState } from "./useExpenseSheetDetailState.ts";
import { useExpenseSheetQuickTicketFlow } from "./useExpenseSheetQuickTicketFlow.ts";

const LINES_PAGE_SIZE = 6;

const normalizeUserId = (value: unknown): string => String(value || "").trim();

const isSameUser = (left: string, right: string): boolean => {
  const normalizedLeft = normalizeUserId(left).toUpperCase();
  const normalizedRight = normalizeUserId(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};

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

const NewTicketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20h-5a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.362 11.15a3 3 0 1 0 -4.144 4.263" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 21v-4a2 2 0 1 1 4 0v4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14 19h4" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v6" />
  </svg>
);

const LinkTicketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
  </svg>
);

const NewLineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7h4" />
  </svg>
);

const ExpenseSheetDetailPageContent = () => {
  const { allowSelfManagement, canManageOtherUsers, currentAxUserId, selectedManagedUserId } = useAuthContext();
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canEditExpenseByModule = canAccess("GASTOS_HOJA_GASTO", "Edit");
  const canDeleteExpense = canAccess("GASTOS_HOJA_GASTO", "FullAccess");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const sheetMode = safeText(window.__EXPENSE_SHEET_MODE__).toLowerCase();
  const isCreateMode = sheetMode === "create";
  const isManagingOtherUser =
    !isCreateMode &&
    canManageOtherUsers &&
    !!normalizeUserId(currentAxUserId) &&
    !!normalizeUserId(selectedManagedUserId) &&
    !isSameUser(selectedManagedUserId, currentAxUserId);
  const canCreateExpenseForCurrentView = canCreateExpense && !isManagingOtherUser;
  const canEditHeaderFields = canEditExpenseByModule && !isManagingOtherUser;
  const canEditExpenseStatusByPermission =
    !isCreateMode && ((allowSelfManagement === true && !isManagingOtherUser) || (canManageOtherUsers && isManagingOtherUser));
  const canEditExpense = canEditHeaderFields || canEditExpenseStatusByPermission;
  const lineContainerRef = useRef<HTMLDivElement | null>(null);
  const createdSheetIdRef = useRef("");
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
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
    draftEstadoComentarios,
    officialExchangeRateValue,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    projectValue,
    voucherValue,
    isSheetPaid,
    isSheetLocked,
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
    setDraftEstadoComentarios,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateLineMode,
    handleOpenLinkTicketMode,
    navigateToCreatedSheet,
    navigateToLineDetail,
  } = useExpenseSheetDetailState({
    hasAccess,
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense,
    canEditHeaderFields,
    sheetId,
    isCreateMode,
    onForbidden: showPermissionModal,
  });

  const canEditExpenseStatus = canEditExpenseStatusByPermission && !isSheetLocked;

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
    () =>
      formatExpenseNumber(header?.totalAmount, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,
        fallback: "-",
      }),
    [header?.totalAmount]
  );

  const { handleUpdate, handleDelete } = useExpenseSheetDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isLocked: isSheetLocked,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    lockedCurrencyCode: safeText(header?.currencyCode),
    lockedExchangeRate: safeText(header?.exchRate),
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense,
    canDeleteExpense,
    canEditHeaderFields,
    canEditStatus: canEditExpenseStatus,
    sheetId,
    draftDescription,
    draftCurrencyCode,
    draftExchangeRate,
    officialExchangeRateValue,
    draftProjectId,
    draftExpenseSheetStatus,
    draftEstadoComentarios,
    currentExpenseSheetStatus: header?.expenseSheetStatus,
    currentExchangeRateMode: header?.exchangeRateMode,
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
    isLocked: isSheetLocked,
    canCreateExpense: canCreateExpenseForCurrentView,
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

  const {
    sourcePickerOpen,
    busy: quickTicketBusy,
    progressMessage: quickTicketProgressMessage,
    errorMessage: quickTicketErrorMessage,
    hasPendingUploadRetry,
    traceList: quickTicketTraceList,
    openSourcePicker,
    closeSourcePicker,
    selectFromCamera,
    selectFromGallery,
    handleSelectedFile,
    retryPendingUpload,
    clearError: clearQuickTicketError,
  } = useExpenseSheetQuickTicketFlow({
    sheetId: safeText(header?.hojaGastosId || sheetId),
    projectId: projectValue,
    currencyCode: safeText(header?.currencyCode),
    canCreateExpense: canCreateExpenseForCurrentView,
    isCreateMode,
    isSheetLocked,
    onForbidden: showPermissionModal,
    onCompleted: (result) => {
      const createdFileId = safeText(result?.fileId);
      if (!createdFileId) {
        window.location.reload();
        return;
      }
      const currentSheetId = safeText(header?.hojaGastosId || sheetId);
      const query = new URLSearchParams({
        fileId: createdFileId,
        mode: "edit",
        origin: "sheet-create",
      });
      if (currentSheetId) {
        query.set("sheetId", currentSheetId);
      }
      navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`);
    },
  });

  const fabMenuItems = useMemo<FloatingActionButtonMenuItem[]>(
    () => [
      {
        id: "new-ticket",
        label: indT("ExpenseSheets_Fab_NewTicket", "Nuevo Ticket"),
        icon: <NewTicketIcon />,
        onClick: openSourcePicker,
      },
      {
        id: "link-ticket",
        label: indT("ExpenseSheets_Fab_LinkTicket", "Vincular Ticket"),
        icon: <LinkTicketIcon />,
        onClick: handleOpenLinkTicketMode,
      },
      {
        id: "new-line",
        label: indT("ExpenseSheets_Fab_NewLine", "Nueva Linea"),
        icon: <NewLineIcon />,
        onClick: handleOpenCreateLineMode,
      },
    ],
    [handleOpenCreateLineMode, handleOpenLinkTicketMode, openSourcePicker]
  );

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

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        capture="environment"
        className="hidden"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "camera");
        }}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          void handleSelectedFile(file, "gallery");
        }}
      />

      {sourcePickerOpen ? (
        <div className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
            <h3 className="text-[16px] font-semibold text-slate-800">
              {indT("ExpenseSheets_NewTicket_Source_Title", "Nuevo ticket")}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {indT(
                "ExpenseSheets_NewTicket_Source_Body",
                "Selecciona una fuente para capturar o elegir la imagen del ticket."
              )}
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <button
                type="button"
                className="ind-action-btn w-full px-3 py-2 text-sm"
                onClick={() => {
                  void selectFromCamera(cameraInputRef.current);
                }}
              >
                {indT("ExpenseSheets_NewTicket_Source_Camera", "Usar camara")}
              </button>
              <button
                type="button"
                className="ind-action-btn w-full px-3 py-2 text-sm"
                onClick={() => selectFromGallery(galleryInputRef.current)}
              >
                {indT("ExpenseSheets_NewTicket_Source_Gallery", "Elegir imagen")}
              </button>
              <button
                type="button"
                className="ind-action-btn w-full px-3 py-2 text-sm"
                onClick={closeSourcePicker}
              >
                {indT("Common_Cancel", "Cancel")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {quickTicketBusy ? (
        <div className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/35 px-4">
          <div className="glass-panel shadow-card flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700">
            <Spinner size="h-5 w-5" label={indT("Common_Loading", "Loading")} />
            <span>{quickTicketProgressMessage || indT("Common_Loading", "Loading")}</span>
          </div>
        </div>
      ) : null}

      {quickTicketErrorMessage ? (
        <div className="glass-panel shadow-card space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
          <p>{quickTicketErrorMessage}</p>
          {quickTicketTraceList.length > 0 ? (
            <div className="rounded-lg border border-rose-200 bg-white p-2 text-xs text-rose-700">
              {quickTicketTraceList.map((entry) => (
                <p key={`${entry.step}-${entry.at}`}>{`${entry.step}: ${entry.traceId}`}</p>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {hasPendingUploadRetry ? (
              <button
                type="button"
                className="ind-action-btn px-3 py-1.5 text-xs"
                onClick={() => {
                  void retryPendingUpload();
                }}
              >
                {indT("ExpenseSheets_NewTicket_RetryUpload", "Reintentar upload")}
              </button>
            ) : null}
            <button type="button" className="ind-action-btn px-3 py-1.5 text-xs" onClick={clearQuickTicketError}>
              {indT("Common_Close", "Close")}
            </button>
          </div>
        </div>
      ) : null}

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
          canEditHeaderFields={canEditHeaderFields}
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
          draftEstadoComentarios={draftEstadoComentarios}
          officialExchangeRateRawValue={officialExchangeRateRawValue}
          officialExchangeRateDate={officialExchangeRateDate}
          officialExchangeRateSource={officialExchangeRateSource}
          onDraftDescriptionChange={setDraftDescription}
          onDraftProjectIdChange={setDraftProjectId}
          onDraftCurrencyCodeChange={setDraftCurrencyCode}
          onDraftExchangeRateChange={setDraftExchangeRate}
          onDraftExpenseSheetStatusChange={setDraftExpenseSheetStatus}
          onDraftEstadoComentariosChange={setDraftEstadoComentarios}
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

      {canCreateExpenseForCurrentView && !isCreateMode && !isSheetLocked ? (
        <FloatingActionButton
          ariaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rapidas")}
          size={76}
          right={16}
          bottom={24}
          menuAriaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rapidas")}
          menuItems={fabMenuItems}
        />
      ) : null}
    </div>
  );
};

// Main page entry for expense sheet detail.
const ExpenseSheetDetailPage = () => {
  return (
    <VisitasPageProviders enableExpenseManagement>
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
