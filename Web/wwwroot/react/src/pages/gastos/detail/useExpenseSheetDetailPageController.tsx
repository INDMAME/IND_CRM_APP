import React, { useCallback, useMemo, useRef, useState } from "react";
import type { FloatingActionButtonMenuItem } from "../../../components/commons/FloatingActionButton.tsx";
import { useAuthContext } from "../../../context/AuthContext.tsx";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import { configureExpenseApiAuth } from "../utils/expenseApi.ts";
import { isManagingOtherExpenseRecord } from "../utils/expenseManagedUserScope.ts";
import { navigateToExpenseUrl, reloadExpensePage } from "../utils/expenseNavigation.ts";
import { saveExpenseSheetCreatedReturnContext } from "../utils/expenseSheetCreatedReturnContext.ts";
import { saveExpenseTicketReturnContext } from "../utils/expenseTicketReturnContext.ts";
import { clearExpenseActingUserOverride } from "../utils/expenseActingUser.ts";
import { getExpenseStatusLabel } from "../constants/expenseStatusCatalog.ts";
import {
  isEditableExpenseReimbursableExpense,
  normalizeExpenseReimbursableExpense,
} from "../constants/expenseReimbursableExpenseCatalog.ts";
import { useExpenseSheetDetailMutations } from "./useExpenseSheetDetailMutations.ts";
import { useExpenseSheetDetailTopbarActions } from "./useExpenseSheetDetailTopbarActions.ts";
import { useExpenseSheetDetailState } from "./useExpenseSheetDetailState.ts";
import { useExpenseSheetQuickTicketFlow } from "./useExpenseSheetQuickTicketFlow.ts";
import { useExpenseSheetsFilterCache } from "../list/useExpenseSheetsFilterCache.ts";
import { LinkTicketIcon, NewLineIcon, NewTicketIcon } from "../components/ExpenseSheetActionIcons.tsx";

const LINES_PAGE_SIZE = 6;
const EXPENSE_STATUS_APPROVAL_REQUESTED = 1;

const pagedSlice = <T,>(items: T[], page: number, pageSize: number): T[] => {
  if (!items.length) return [];
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};

// Treats only positive numeric totals as actionable sheet content.
const hasPositiveTotalAmount = (value: unknown): boolean => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0;
};

// Initializes auth seed for expense API calls before island effects run.
export const bootstrapExpenseApiAuth = () => {
  configureExpenseApiAuth({
    token: safeText(window.__IND_API_TOKEN__),
    entraOid: safeText(window.__IND_ENTRA_OID__),
    appCode: safeText(window.__IND_APP_CODE__),
  });
};

// Owns the detail-page orchestration and keeps the view component focused on rendering.
export const useExpenseSheetDetailPageController = () => {
  const {
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    managementBootstrapReady,
  } = useAuthContext();
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canCreateExpense = canAccess("GASTOS_HOJA_GASTO", "Add");
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const sheetMode = safeText(window.__EXPENSE_SHEET_MODE__).toLowerCase();
  const isCreateMode = sheetMode === "create";
  const isManagingOtherUserBySelection = isManagingOtherExpenseRecord({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId,
    recordOwnerUserId: "",
    isCreateMode,
  });
  const canCreateExpenseForSelectedContext = canCreateExpense && !isManagingOtherUserBySelection;
  const lineContainerRef = useRef<HTMLDivElement | null>(null);
  const createdSheetIdRef = useRef("");
  const cameraInputRef = useRef<HTMLInputElement | null>(null);
  const galleryInputRef = useRef<HTMLInputElement | null>(null);
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = useState(false);
  const [statusTransitionComment, setStatusTransitionComment] = useState("");
  const [showStatusTransitionCommentField, setShowStatusTransitionCommentField] = useState(false);
  const [confirmedProjectId, setConfirmedProjectId] = useState("");
  const statusTransitionCommentRef = useRef("");
  const reimbursablePropagationHeaderUpdatedRef = useRef(false);

  const paginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );

  const detailState = useExpenseSheetDetailState({
    hasAccess,
    canCreateExpense: canCreateExpenseForSelectedContext,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    sheetId,
    isCreateMode,
    onForbidden: showPermissionModal,
  });

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
    draftReimbursableExpense,
    draftEstadoComentarios,
    officialExchangeRateValue,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    projectValue,
    detailPolicy,
    isManagingOtherUser,
    isSheetLocked,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount,
    exchangeRateValidationMessage,
    canEditAnyCurrent,
    canUseFullEditFeatures,
    canEditHeaderFieldsCurrent,
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
    setDraftReimbursableExpense,
    setDraftEstadoComentarios,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateLineMode,
    handleOpenLinkTicketMode,
    navigateToCreatedSheet,
    navigateToLineDetail,
  } = detailState;

  const canCreateExpenseForCurrentView = canCreateExpense && !isManagingOtherUser;
  const canDeleteExpenseForCurrentView = detailPolicy.canDeleteSheet;
  const canTransitionStatus = detailPolicy.statusActions.length > 0;
  const isReadOnlyMode = detailPolicy.interactionMode === "read_only";
  const currentStatusCode = typeof header?.expenseSheetStatus === "number" ? header.expenseSheetStatus : null;
  const hidesCrudTopbarByStatus =
    currentStatusCode === EXPENSE_STATUS_APPROVAL_REQUESTED && !canEditAnyCurrent;
  const topbarActionMode = !isCreateMode && (isReadOnlyMode || hidesCrudTopbarByStatus) ? "view_only" : "default";
  const detailPermissionsReady = managementBootstrapReady && (isCreateMode || !!header);
  const { invalidateCachedListForRefetch } = useExpenseSheetsFilterCache();
  const handleReimbursablePropagationHeaderUpdated = useCallback(() => {
    reimbursablePropagationHeaderUpdatedRef.current = true;
    invalidateCachedListForRefetch();
  }, [invalidateCachedListForRefetch]);

  const { modal, openConfirm, closeConfirm, cancelConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel"),
  });

  const resetStatusTransitionDialog = useCallback(() => {
    statusTransitionCommentRef.current = "";
    setStatusTransitionComment("");
    setShowStatusTransitionCommentField(false);
  }, []);

  const handleCloseConfirm = useCallback(() => {
    resetStatusTransitionDialog();
    closeConfirm();
  }, [closeConfirm, resetStatusTransitionDialog]);

  const handleCancelConfirm = useCallback(() => {
    resetStatusTransitionDialog();
    cancelConfirm();
  }, [cancelConfirm, resetStatusTransitionDialog]);

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
      : (modal.confirmText || indT("Confirm_Yes", "OK"));

  const handleModalButtonConfirm = useCallback(() => {
    if (!busy && modalError) {
      handleCancelConfirm();
      return;
    }

    void handleModalConfirm();
  }, [busy, handleCancelConfirm, handleModalConfirm, modalError]);

  const visibleLines = useMemo(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);
  const companyCurrencyCode = safeText(exchangeRateBaseCurrency);
  const grossAmountText = useMemo(
    () => formatAmountWithCurrency(header?.totalGrossAmountMST ?? null, companyCurrencyCode),
    [companyCurrencyCode, header?.totalGrossAmountMST]
  );
  const reimbursableAmountText = useMemo(
    () => formatAmountWithCurrency(header?.totalReimbursableAmount ?? null, companyCurrencyCode),
    [companyCurrencyCode, header?.totalReimbursableAmount]
  );
  const hasStatusActionContent =
    lines.length > 0 ||
    hasPositiveTotalAmount(header?.totalAmount) ||
    hasPositiveTotalAmount(header?.totalGrossAmountMST);
  const areStatusActionsDisabled = !hasStatusActionContent;
  const ownerDisplay = useMemo(() => {
    const ownerUserId = safeText(header?.userId);
    const currentUserId = safeText(currentCrmUserId);
    if (!ownerUserId || !currentUserId || ownerUserId.toUpperCase() === currentUserId.toUpperCase()) {
      return "";
    }

    const ownerName = safeText(header?.userName);
    return ownerName ? `${ownerName} (${ownerUserId})` : ownerUserId;
  }, [currentCrmUserId, header?.userId, header?.userName]);

  const {
    handleUpdate,
    handlePropagateReimbursableExpenseToLines,
    handlePropagateProjectIdToLines,
    handleStatusTransition,
    handleDelete,
  } = useExpenseSheetDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isEditLocked: isReadOnlyMode,
    isDeleteLocked: isSheetLocked,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    lockedCurrencyCode: safeText(header?.currencyCode),
    lockedExchangeRate: safeText(header?.exchRate),
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense: canEditAnyCurrent,
    canDeleteExpense: canDeleteExpenseForCurrentView,
    canEditHeaderFields: canEditHeaderFieldsCurrent,
    canTransitionStatus,
    sheetId,
    draftDescription,
    draftCurrencyCode,
    draftExchangeRate,
    draftReimbursableExpense,
    officialExchangeRateValue,
    draftProjectId,
    draftEstadoComentarios,
    currentDescription: safeText(header?.description),
    currentProjectId: safeText(header?.projId),
    currentEstadoComentarios: safeText(header?.estadoComentarios),
    currentExpenseSheetStatus: header?.expenseSheetStatus,
    currentLines: lines,
    exchangeRateBaseCurrency,
    onCreateSuccess: (createdSheetId) => {
      createdSheetIdRef.current = safeText(createdSheetId);
    },
    onReimbursablePropagationHeaderUpdated: handleReimbursablePropagationHeaderUpdated,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
  });

  React.useEffect(() => {
    if (isEditing) return;
    setConfirmedProjectId(safeText(projectValue));
  }, [isEditing, projectValue]);

  const handleConfirmProjectPropagation = useCallback(
    async (nextProjectId: string) => {
      const safeProjectId = safeText(nextProjectId);
      const ok = await handlePropagateProjectIdToLines(safeProjectId);
      if (ok) {
        setConfirmedProjectId(safeProjectId);
        setDraftProjectId(safeProjectId);
        setIsEditing(true);
      }

      return ok;
    },
    [handlePropagateProjectIdToLines, setDraftProjectId, setIsEditing]
  );

  const handleDraftProjectIdCommit = useCallback(
    (value: string) => {
      const nextValue = safeText(value);
      const previousValue = safeText(confirmedProjectId);
      if (nextValue === previousValue) {
        setDraftProjectId(nextValue);
        return;
      }

      const shouldConfirmPropagation =
        !isCreateMode && isEditing && canEditHeaderFieldsCurrent && lines.length > 0;

      if (!shouldConfirmPropagation) {
        setDraftProjectId(nextValue);
        setConfirmedProjectId(nextValue);
        return;
      }

      if (busy || modal.open) {
        setDraftProjectId(previousValue);
        return;
      }

      setDraftProjectId(nextValue);
      openConfirm({
        title: indT("ExpenseSheets_Detail_PropagateProject_Title", "Update lines"),
        message: indT(
          "ExpenseSheets_Detail_PropagateProject_Body",
          "The projects on all lines will be updated. Do you want to continue?"
        ),
        confirmText: indT("Confirm_Yes", "OK"),
        onCancel: () => {
          setDraftProjectId(previousValue);
        },
        onConfirm: async () => {
          return handleConfirmProjectPropagation(nextValue);
        },
      });
    },
    [
      busy,
      canEditHeaderFieldsCurrent,
      confirmedProjectId,
      handleConfirmProjectPropagation,
      isCreateMode,
      isEditing,
      lines.length,
      modal.open,
      openConfirm,
      setDraftProjectId,
    ]
  );

  const handleDraftReimbursableExpenseChange = useCallback(
    (value: number) => {
      const nextValue = normalizeExpenseReimbursableExpense(value);
      const previousValue = normalizeExpenseReimbursableExpense(draftReimbursableExpense);
      if (!isEditableExpenseReimbursableExpense(nextValue) || nextValue === null) return;
      if (!isCreateMode && previousValue === null) return;
      if (nextValue === previousValue) return;

      const shouldConfirmPropagation =
        !isCreateMode && isEditing && canEditHeaderFieldsCurrent && lines.length > 0;

      if (!shouldConfirmPropagation) {
        setDraftReimbursableExpense(nextValue);
        return;
      }

      if (busy || modal.open) return;

      reimbursablePropagationHeaderUpdatedRef.current = false;
      setDraftReimbursableExpense(nextValue);
      openConfirm({
        title: indT("ExpenseSheets_Detail_PropagateReimbursable_Title", "Update lines"),
        message: indT(
          "ExpenseSheets_Detail_PropagateReimbursable_Body",
          "The reimbursable change will be propagated to every expense sheet line. Do you want to continue?"
        ),
        confirmText: indT("Confirm_Yes", "OK"),
        onCancel: () => {
          if (reimbursablePropagationHeaderUpdatedRef.current) {
            reimbursablePropagationHeaderUpdatedRef.current = false;
            reloadExpensePage();
            return;
          }

          setDraftReimbursableExpense(previousValue);
        },
        onConfirm: async () => {
          const ok = await handlePropagateReimbursableExpenseToLines(nextValue);
          if (ok) {
            invalidateCachedListForRefetch();
            reloadExpensePage();
          }
          return ok;
        },
      });
    },
    [
      busy,
      canEditHeaderFieldsCurrent,
      draftReimbursableExpense,
      handlePropagateReimbursableExpenseToLines,
      invalidateCachedListForRefetch,
      isCreateMode,
      isEditing,
      lines.length,
      modal.open,
      openConfirm,
      setDraftReimbursableExpense,
    ]
  );

  const hasPendingProjectPropagation =
    !isCreateMode &&
    isEditing &&
    canEditHeaderFieldsCurrent &&
    lines.length > 0 &&
    safeText(draftProjectId) !== safeText(confirmedProjectId);

  const handlePendingProjectPropagationCancel = useCallback(() => {
    if (!hasPendingProjectPropagation) return;
    setDraftProjectId(safeText(confirmedProjectId));
  }, [confirmedProjectId, hasPendingProjectPropagation, setDraftProjectId]);

  const handleUpdateWithProjectPropagation = useCallback(async () => {
    if (hasPendingProjectPropagation) {
      const ok = await handleConfirmProjectPropagation(draftProjectId);
      if (!ok) return false;
    }

    return handleUpdate();
  }, [draftProjectId, handleConfirmProjectPropagation, handleUpdate, hasPendingProjectPropagation]);

  const projectPropagationSaveTitle = hasPendingProjectPropagation
    ? indT("ExpenseSheets_Detail_PropagateProject_Title", "Update lines")
    : undefined;
  const projectPropagationSaveMessage = hasPendingProjectPropagation
    ? indT(
        "ExpenseSheets_Detail_PropagateProject_Body",
        "The projects on all lines will be updated. Do you want to continue?"
      )
    : undefined;
  const projectPropagationSaveConfirmText = hasPendingProjectPropagation ? indT("Confirm_Yes", "OK") : undefined;

  const handleOpenLineDetail = useCallback(
    async (lineRecId: string) => {
      const safeLineId = safeText(lineRecId);
      if (!safeLineId || busy || isRedirectingAfterCreate) {
        return;
      }

      if (isEditing && canEditHeaderFieldsCurrent) {
        const ok = await handleUpdateWithProjectPropagation();
        if (!ok) {
          return;
        }

        navigateToLineDetail(safeLineId, {
          mode: "edit",
          askConfirmation: false,
          bypassGuardOnce: true,
        });
        return;
      }

      navigateToLineDetail(safeLineId);
    },
    [
      busy,
      canEditHeaderFieldsCurrent,
      handleUpdateWithProjectPropagation,
      isEditing,
      isRedirectingAfterCreate,
      navigateToLineDetail,
    ]
  );

  const handleSaveSuccess = useCallback(() => {
    invalidateCachedListForRefetch();
    if (isCreateMode) {
      const createdSheetId = safeText(createdSheetIdRef.current);
      if (!createdSheetId) return;
      saveExpenseSheetCreatedReturnContext({
        sheetId: createdSheetId,
      });
      clearExpenseActingUserOverride();
      setIsRedirectingAfterCreate(true);
      navigateToCreatedSheet(createdSheetId);
      return;
    }

    reloadExpensePage();
  }, [invalidateCachedListForRefetch, isCreateMode, navigateToCreatedSheet]);

  const handleStatusActionClick = useCallback(
    (action: { labelKey: string; fallback: string; nextStatus: number }) => {
      if (!hasStatusActionContent) {
        return;
      }

      const actionLabel = indT(action.labelKey, action.fallback);
      const currentStatusLabel =
        header?.expenseSheetStatus === null || header?.expenseSheetStatus === undefined
          ? indT("Common_NoData", "No data")
          : getExpenseStatusLabel(header.expenseSheetStatus);
      const nextStatusLabel = getExpenseStatusLabel(action.nextStatus);
      const transitionMessage = indFormat(
        "ExpenseSheets_BottomActions_ConfirmTransition",
        "Current status: {0}\nNew status: {1}\n\nDo you want to update the expense sheet status?",
        currentStatusLabel,
        nextStatusLabel
      ).replace(/\\n/g, "\n");
      const initialComment = safeText(header?.estadoComentarios);
      statusTransitionCommentRef.current = initialComment;
      setStatusTransitionComment(initialComment);
      setShowStatusTransitionCommentField(true);

      openConfirm({
        title: actionLabel,
        message: transitionMessage,
        confirmText: actionLabel,
        onConfirm: async () => {
          const ok = await handleStatusTransition(
            action.nextStatus,
            actionLabel,
            statusTransitionCommentRef.current
          );
          if (ok) {
            invalidateCachedListForRefetch();
            resetStatusTransitionDialog();
            closeConfirm();
            reloadExpensePage();
          }
          return ok;
        },
      });
    },
    [
      closeConfirm,
      handleStatusTransition,
      hasStatusActionContent,
      header?.estadoComentarios,
      header?.expenseSheetStatus,
      invalidateCachedListForRefetch,
      openConfirm,
      resetStatusTransitionDialog,
    ]
  );

  useExpenseSheetDetailTopbarActions({
    busy: busy || isRedirectingAfterCreate,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    actionMode: topbarActionMode,
    isLocked: isSheetLocked,
    isEditLocked: isReadOnlyMode,
    isDeleteLocked: isSheetLocked,
    permissionsReady: detailPermissionsReady,
    canCreateExpense: canCreateExpenseForCurrentView,
    canEditExpense: canEditAnyCurrent,
    canDeleteExpense: canDeleteExpenseForCurrentView,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate: handleUpdateWithProjectPropagation,
    handleDelete,
    onSaveSuccess: handleSaveSuccess,
    onDeleteSuccess: () => {
      invalidateCachedListForRefetch();
      navigateToExpenseUrl("/Gastos/ExpenseSheets");
    },
    saveConfirmTitle: projectPropagationSaveTitle,
    saveConfirmMessage: projectPropagationSaveMessage,
    saveConfirmText: projectPropagationSaveConfirmText,
    saveConfirmOnCancel: handlePendingProjectPropagationCancel,
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

  const quickTicketFlow = useExpenseSheetQuickTicketFlow({
    sheetId: safeText(header?.hojaGastosId || sheetId),
    projectId: projectValue,
    currencyCode: safeText(header?.currencyCode),
    canCreateExpense: !isCreateMode && detailPolicy.showFab,
    isCreateMode,
    isSheetLocked: !canUseFullEditFeatures,
    linkToSheet: false,
    onForbidden: showPermissionModal,
    onCompleted: (result) => {
      const createdFileId = safeText(result?.fileId);
      if (!createdFileId) {
        reloadExpensePage();
        return;
      }

      if (result?.linkedToSheet === true) {
        reloadExpensePage();
        return;
      }

      const currentSheetId = safeText(header?.hojaGastosId || sheetId);
      const query = new URLSearchParams({
        fileId: createdFileId,
        mode: "edit",
        origin: "sheet-create",
      });
      if (currentSheetId) {
        saveExpenseTicketReturnContext({
          fileId: createdFileId,
          origin: "sheet-create",
          sheetId: currentSheetId,
        });
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
        onClick: quickTicketFlow.openSourcePicker,
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
    [handleOpenCreateLineMode, handleOpenLinkTicketMode, quickTicketFlow.openSourcePicker]
  );

  const showStatusActionBar =
    !isCreateMode && !isLoading && !isRedirectingAfterCreate && !errorMessage && detailPolicy.statusActions.length > 0;
  const showFab = !isCreateMode && detailPolicy.showFab;
  const hasVisibleStatusComment = safeText(header?.estadoComentarios).trim().length > 0;
  const statusCommentMode: "hidden" | "read" = hasVisibleStatusComment ? "read" : "hidden";
  const modalBody = showStatusTransitionCommentField ? (
    <div className="space-y-1.5">
      <label className="form-label font-semibold">
        {indT("ExpenseSheets_Field_StatusComment", "Status comment")}
      </label>
      <textarea
        className="form-control resize-none"
        rows={3}
        value={statusTransitionComment}
        onChange={(event) => {
          const nextValue = event.target.value || "";
          statusTransitionCommentRef.current = nextValue;
          setStatusTransitionComment(nextValue);
        }}
        aria-label={indT("ExpenseSheets_Field_StatusComment", "Status comment")}
      />
    </div>
  ) : null;

  return {
    sheetId,
    header,
    visibleLines,
    linePage,
    totalLinePages,
    isLoading,
    errorMessage,
    isCreateMode,
    isEditing,
    busy,
    status,
    modalError,
    isRedirectingAfterCreate,
    modal,
    modalLoadingText,
    modalCancelText,
    modalConfirmText,
    modalBody,
    canCreateExpenseForCurrentView,
    canEditHeaderFieldsCurrent,
    canUseFullEditFeatures,
    showStatusActionBar,
    showFab,
    areStatusActionsDisabled,
    fabMenuItems,
    paginationLabels,
    grossAmountText,
    reimbursableAmountText,
    statusCommentMode,
    ownerDisplay,
    projectValue,
    normalizedDraftCurrency,
    exchangeRateBaseCurrency,
    exchangeRateReferenceAmount,
    showExchangeRate,
    exchangeRateValue,
    exchangeRateValidationMessage,
    draftDescription,
    draftProjectId,
    draftCurrencyCode,
    draftExchangeRate,
    draftReimbursableExpense,
    draftEstadoComentarios,
    officialExchangeRateRawValue,
    officialExchangeRateDate,
    officialExchangeRateSource,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    detailPolicy,
    lineContainerRef,
    cameraInputRef,
    galleryInputRef,
    quickTicketFlow,
    setLinePage,
    setDraftDescription,
    setDraftProjectId,
    commitDraftProjectId: handleDraftProjectIdCommit,
    setDraftCurrencyCode,
    setDraftExchangeRate,
    setDraftReimbursableExpense: handleDraftReimbursableExpenseChange,
    setDraftEstadoComentarios,
    navigateToLineDetail: handleOpenLineDetail,
    handleModalButtonConfirm,
    handleStatusActionClick,
    closeConfirm: handleCancelConfirm,
  };
};
