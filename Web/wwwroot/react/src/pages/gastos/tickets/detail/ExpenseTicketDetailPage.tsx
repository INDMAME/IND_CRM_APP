import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FloatingActionButton, { type FloatingActionButtonMenuItem } from "../../../../components/commons/FloatingActionButton.tsx";
import VisitasPageProviders from "../../../../components/commons/VisitasPageProviders.tsx";
import { useAuthContext } from "../../../../context/AuthContext.tsx";
import { useTimelineCardEffects } from "../../../../hooks/useTimelineCardEffects.ts";
import { canAccess, showPermissionModal } from "../../../../utils/permissions.ts";
import { indT } from "../../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../../utils/reactIsland.tsx";
import { configureExpenseApiAuth } from "../../utils/expenseApi.ts";
import { clearExpenseNavigationGuard, navigateToExpenseUrl, setExpenseNavigationGuard } from "../../utils/expenseNavigation.ts";
import { isManagingOtherExpenseUser } from "../../utils/expenseManagedUserScope.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../../utils/expenseSelectOptions.ts";
import { buildExpenseSheetDetailUrl } from "../../utils/expenseTicketReturnContext.ts";
import { readExpenseTicketSheetSyncState } from "../../utils/expenseTicketSheetSyncState.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";
import { useExpenseTicketLinkSheetGate } from "../useExpenseTicketLinkSheetGate.ts";
import { useExpenseTicketDetailState } from "./useExpenseTicketDetailState.ts";
import { useExpenseTicketDetailMutations } from "./useExpenseTicketDetailMutations.ts";
import { useExpenseTicketDetailTopbarActions } from "./useExpenseTicketDetailTopbarActions.ts";
import { useExpenseTicketDetailEditor } from "./useExpenseTicketDetailEditor.ts";
import { useExpenseTicketDetailRouteContext } from "./useExpenseTicketDetailRouteContext.ts";
import { useExpenseTicketDetailDisplay } from "./useExpenseTicketDetailDisplay.ts";
import { useExpenseTicketDetailConfirmState } from "./useExpenseTicketDetailConfirmState.ts";
import { useExpenseTicketDetailInteractions } from "./useExpenseTicketDetailInteractions.ts";
import ExpenseTicketDetailView from "./ExpenseTicketDetailView.tsx";
import { useExpenseTicketsFilterCache } from "../useExpenseTicketsFilterCache.ts";
import { useExpenseTicketDetailBackNavigation } from "./useExpenseTicketDetailBackNavigation.ts";
import { useExpenseTicketDetailPreviewPanel } from "./useExpenseTicketDetailPreviewPanel.ts";
import type { ExpenseTicketDetailHeader, ExpenseTicketDetailLine } from "./expenseTicketDetailTypes.ts";

const ALLOWED_GASTO_TYPES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
const LINES_PAGE_SIZE = 6;
const GASTO_TYPE_LABEL_KEYS: Record<number, { key: string; fallback: string }> = {
  0: { key: "Enum_None", fallback: "None" },
  1: { key: "Enum_GastoType_Peaje", fallback: "Peaje" },
  2: { key: "Enum_GastoType_Parking", fallback: "Parking" },
  3: { key: "Enum_GastoType_Km", fallback: "Km" },
  4: { key: "Enum_GastoType_Desayuno", fallback: "Desayuno" },
  5: { key: "Enum_GastoType_Comida", fallback: "Comida" },
  6: { key: "Enum_GastoType_Cena", fallback: "Cena" },
  7: { key: "Enum_GastoType_Hotel", fallback: "Hotel" },
  8: { key: "Enum_GastoType_Varios", fallback: "Varios" },
  14: { key: "Enum_GastoType_Taxi", fallback: "Taxi" },
};

const NewLineIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 19c3.333 -2 5 -4 5 -6c0 -3 -1 -3 -2 -3s-2.032 1.085 -2 3c.034 2.048 1.658 2.877 2.5 4c1.5 2 2.5 2.5 3.5 1c.667 -1 1.167 -1.833 1.5 -2.5c1 2.333 2.333 3.5 4 3.5h2.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7h4" />
  </svg>
);

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

const buildFallbackGastoTypeOptions = (): ExpenseSelectOption[] => {
  return Object.entries(GASTO_TYPE_LABEL_KEYS)
    .map(([code, cfg]) => ({
      value: String(code),
      text: indT(cfg.key, cfg.fallback),
    }))
    .sort((left, right) => Number(left.value) - Number(right.value));
};

const resolveLinkedTicketBlockedMessage = (isPaid: boolean): string => {
  if (isPaid) {
    return indT("ExpenseSheets_Detail_PaidReadOnly", "Las hojas de gasto pagadas son de solo lectura.");
  }

  return indT("ExpenseSheets_Detail_ReadOnlyByStatus", "No se puede editar esta hoja de gastos en el estado actual.");
};

const buildExpenseTicketDetailModalView = ({
  modal,
  modalConfirmText,
  modalCancelText,
  modalLoadingText,
  busy,
  modalError,
  status,
  handleModalButtonConfirm,
  closeConfirm,
}: {
  modal: {
    open: boolean;
    title: string;
    message: string;
    showCancel: boolean;
    showConfirm: boolean;
  };
  modalConfirmText: string;
  modalCancelText: string;
  modalLoadingText: string;
  busy: boolean;
  modalError: string;
  status: string;
  handleModalButtonConfirm: () => void;
  closeConfirm: () => void;
}) => ({
  open: modal.open,
  title: modal.title,
  message: modal.message,
  confirmText: modalConfirmText,
  cancelText: modalCancelText,
  loadingText: modalLoadingText,
  showCancel: modal.showCancel,
  showConfirm: modal.showConfirm,
  busy,
  error: modalError,
  status,
  onConfirm: handleModalButtonConfirm,
  onCancel: closeConfirm,
});

const buildExpenseTicketDetailPreviewView = ({
  previewOpen,
  previewBusy,
  previewError,
  previewImageUrl,
  previewAltText,
  previewScale,
  previewTranslate,
  previewSurfaceRef,
  closePreview,
  handlePreviewPointerDown,
  handlePreviewPointerMove,
  handlePreviewPointerEnd,
  handlePreviewWheel,
}: {
  previewOpen: boolean;
  previewBusy: boolean;
  previewError: string;
  previewImageUrl: string;
  previewAltText: string;
  previewScale: number;
  previewTranslate: { x: number; y: number };
  previewSurfaceRef: React.RefObject<HTMLDivElement | null>;
  closePreview: () => void;
  handlePreviewPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  handlePreviewPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  handlePreviewPointerEnd: (event: React.PointerEvent<HTMLDivElement>) => void;
  handlePreviewWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
}) => ({
  open: previewOpen,
  busy: previewBusy,
  error: previewError,
  imageUrl: previewImageUrl,
  imageAlt: previewAltText,
  scale: previewScale,
  translate: previewTranslate,
  surfaceRef: previewSurfaceRef,
  onClose: closePreview,
  onPointerDown: handlePreviewPointerDown,
  onPointerMove: handlePreviewPointerMove,
  onPointerEnd: handlePreviewPointerEnd,
  onWheel: handlePreviewWheel,
});

const buildExpenseTicketDetailContentView = ({
  isLoading,
  errorMessage,
  header,
  showStickyPreview,
  previewBusy,
  previewError,
  previewImageUrl,
  previewAltText,
  openFile,
  statusLabel,
  gastoTypeLabel,
  totalAmountText,
  transDateText,
  isEditing,
  gastoTypeOptions,
  draftDescription,
  descriptionInvalid,
  descriptionInputRef,
  draftGastoType,
  gastoTypeInvalid,
  gastoTypeInputRef,
  draftCurrencyCode,
  currencyCodeInvalid,
  currencyInputRef,
  draftTransDate,
  draftUrlFile,
  draftFileName,
  setDraftDescription,
  setDraftGastoType,
  setDraftCurrencyCode,
  setDraftTransDate,
  isFromSheetLink,
  handleOpenExpenseSheet,
  visibleLines,
  totalLinePages,
  linePage,
  safeCurrencyCode,
  paginationLabels,
  lineContainerRef,
  setLinePage,
  openLineDetail,
  status,
}: {
  isLoading: boolean;
  errorMessage: string;
  header: ExpenseTicketDetailHeader | null;
  showStickyPreview: boolean;
  previewBusy: boolean;
  previewError: string;
  previewImageUrl: string;
  previewAltText: string;
  openFile: () => void;
  statusLabel: string;
  gastoTypeLabel: string;
  totalAmountText: string;
  transDateText: string;
  isEditing: boolean;
  gastoTypeOptions: ExpenseSelectOption[];
  draftDescription: string;
  descriptionInvalid: boolean;
  descriptionInputRef: React.RefObject<HTMLInputElement | null>;
  draftGastoType: string;
  gastoTypeInvalid: boolean;
  gastoTypeInputRef: React.RefObject<HTMLInputElement | null>;
  draftCurrencyCode: string;
  currencyCodeInvalid: boolean;
  currencyInputRef: React.RefObject<HTMLInputElement | null>;
  draftTransDate: string;
  draftUrlFile: string;
  draftFileName: string;
  setDraftDescription: (value: string) => void;
  setDraftGastoType: (value: string) => void;
  setDraftCurrencyCode: (value: string) => void;
  setDraftTransDate: (value: string) => void;
  isFromSheetLink: boolean;
  handleOpenExpenseSheet: () => void;
  visibleLines: ExpenseTicketDetailLine[];
  totalLinePages: number;
  linePage: number;
  safeCurrencyCode: string;
  paginationLabels: {
    first: string;
    prev: string;
    next: string;
    last: string;
  };
  lineContainerRef: React.RefObject<HTMLDivElement | null>;
  setLinePage: (page: number) => void;
  openLineDetail: (lineRecId: string) => void;
  status: string;
}) => ({
  isLoading,
  errorMessage,
  header,
  showStickyPreview,
  previewBusy,
  previewError,
  previewImageUrl,
  previewFileName: previewAltText,
  previewAltText,
  onOpenPreview: openFile,
  statusLabel,
  gastoTypeLabel,
  totalAmountText,
  transDateText,
  isEditing,
  gastoTypeOptions,
  draftDescription,
  descriptionInvalid,
  descriptionInputRef,
  draftGastoType,
  gastoTypeInvalid,
  gastoTypeInputRef,
  draftCurrencyCode,
  currencyCodeInvalid,
  currencyInputRef,
  draftTransDate,
  draftUrlFile,
  draftFileName,
  onDraftDescriptionChange: setDraftDescription,
  onDraftGastoTypeChange: setDraftGastoType,
  onDraftCurrencyCodeChange: setDraftCurrencyCode,
  onDraftTransDateChange: setDraftTransDate,
  onOpenFile: openFile,
  onOpenExpenseSheet: isFromSheetLink ? undefined : handleOpenExpenseSheet,
  visibleLines,
  totalLinePages,
  linePage,
  currencyCode: safeCurrencyCode,
  paginationLabels,
  containerRef: lineContainerRef,
  onLinePageChange: setLinePage,
  onOpenLine: openLineDetail,
  status,
});

type ExpenseTicketDetailModalViewArgs = Parameters<typeof buildExpenseTicketDetailModalView>[0];
type ExpenseTicketDetailPreviewViewArgs = Parameters<typeof buildExpenseTicketDetailPreviewView>[0];
type ExpenseTicketDetailContentViewArgs = Parameters<typeof buildExpenseTicketDetailContentView>[0];

const buildExpenseTicketDetailPageViewModel = ({
  modalArgs,
  previewArgs,
  contentArgs,
}: {
  modalArgs: ExpenseTicketDetailModalViewArgs;
  previewArgs: ExpenseTicketDetailPreviewViewArgs;
  contentArgs: ExpenseTicketDetailContentViewArgs;
}) => ({
  modal: buildExpenseTicketDetailModalView(modalArgs),
  preview: buildExpenseTicketDetailPreviewView(previewArgs),
  content: buildExpenseTicketDetailContentView(contentArgs),
});

// Keeps filter cache wiring and back navigation outside the page container body.
const useExpenseTicketDetailNavigationState = ({
  fileId,
  detailOrigin,
  headerTransDate,
  contextLineRecId,
  ticketReturnContext,
}: {
  fileId: string;
  detailOrigin: string;
  headerTransDate: string | null | undefined;
  contextLineRecId: string;
  ticketReturnContext: ReturnType<typeof useExpenseTicketDetailRouteContext>["ticketReturnContext"];
}) => {
  const { readCachedState, saveCachedState, markResetFiltersReturn, clearCachedState } = useExpenseTicketsFilterCache();

  useExpenseTicketDetailBackNavigation({
    fileId,
    detailOrigin,
    headerTransDate,
    contextLineRecId,
    ticketReturnContext,
    readCachedState,
    saveCachedState,
  });

  return {
    markResetFiltersReturn,
    clearCachedState,
  };
};

// Runs the one-shot auto edit transition for linked contexts after detail data is ready.
const useExpenseTicketDetailAutoEdit = ({
  autoEditMode,
  isFromSheetLink,
  isLoading,
  header,
  handleEnableEdit,
  canAttemptAutoEdit,
}: {
  autoEditMode: boolean;
  isFromSheetLink: boolean;
  isLoading: boolean;
  header: ExpenseTicketDetailHeader | null;
  handleEnableEdit: () => void;
  canAttemptAutoEdit: boolean;
}) => {
  const autoEditAttemptedRef = useRef(false);

  useEffect(() => {
    if (!autoEditMode || isFromSheetLink || autoEditAttemptedRef.current) return;
    if (isLoading || !header || !canAttemptAutoEdit) return;

    autoEditAttemptedRef.current = true;
    handleEnableEdit();
  }, [autoEditMode, canAttemptAutoEdit, handleEnableEdit, header, isFromSheetLink, isLoading]);
};

// Resolves permission and acting-user state so the page container stays focused on orchestration.
const useExpenseTicketDetailPermissionState = () => {
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
  const isManagingOtherUser = isManagingOtherExpenseUser({
    canManageOtherUsers,
    currentAxUserId,
    selectedManagedUserId,
  });

  return {
    hasAccess,
    canEditTicket: canEditTicketByModule && !isManagingOtherUser,
    canDeleteTicket: canDeleteTicketByModule && !isManagingOtherUser,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    isManagingOtherUser,
    managementBootstrapReady,
  };
};

// Owns the ticket detail page orchestration while the component stays thin for rendering.
const useExpenseTicketDetailPageViewModel = () => {
  const fileId = safeText(window.__EXPENSE_TICKET_FILE_ID__);
  const lineContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    autoEditMode,
    detailOrigin,
    contextSheetId,
    contextLineRecId,
    isFromExpenseSheetCreate,
    isFromExpenseLine,
    isFromSheetLink,
    ticketReturnContext,
  } = useExpenseTicketDetailRouteContext();
  const {
    hasAccess,
    canEditTicket,
    canDeleteTicket,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    managementBootstrapReady,
  } = useExpenseTicketDetailPermissionState();
  const gastoTypeOptions = useMemo<ExpenseSelectOption[]>(() => {
    const source = Array.isArray(window.__EXPENSE_GASTO_TYPES__) ? window.__EXPENSE_GASTO_TYPES__ : [];
    const mapped = mapWindowEnumOptions(source).filter((entry) => {
      const parsed = Number(entry.value);
      return Number.isInteger(parsed) && ALLOWED_GASTO_TYPES.has(parsed);
    });

    if (mapped.length > 0) {
      return mapped.sort((left, right) => Number(left.value) - Number(right.value));
    }

    return buildFallbackGastoTypeOptions();
  }, []);
  const gastoTypeLabelMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const option of gastoTypeOptions) {
      map.set(String(option.value), option.text);
    }
    return map;
  }, [gastoTypeOptions]);
  const { header, lines, isLoading, errorMessage, reloadDetail } = useExpenseTicketDetailState({
    hasAccess,
    fileId,
    onForbidden: showPermissionModal,
  });
  const linkedExpenseSheetId = useMemo(
    () => safeText(ticketReturnContext?.sheetId || contextSheetId || header?.hojaGastosIdDisplay),
    [contextSheetId, header?.hojaGastosIdDisplay, ticketReturnContext]
  );
  const {
    linkSheetLocked,
    linkSheetBlockedMessage,
    linkSheetCheckBusy,
  } = useExpenseTicketLinkSheetGate({
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
  const [sheetSyncBlocked, setSheetSyncBlocked] = useState(() => !!readExpenseTicketSheetSyncState(fileId));
  const [sheetSyncBlockedMessage, setSheetSyncBlockedMessage] = useState(() =>
    safeText(readExpenseTicketSheetSyncState(fileId)?.message)
  );

  useEffect(() => {
    const syncState = readExpenseTicketSheetSyncState(fileId);
    setSheetSyncBlocked(!!syncState);
    setSheetSyncBlockedMessage(safeText(syncState?.message));
  }, [fileId]);

  const pendingFirstLink =
    detailOrigin === "sheet-create" && !!safeText(ticketReturnContext?.sheetId || contextSheetId) && !safeText(header?.hojaGastosIdDisplay);
  const sheetWorkflowBlockMessage = pendingFirstLink
    ? indT("ExpenseTickets_SheetSync_PendingSaveRequired", "Save the ticket before leaving this flow.")
    : sheetSyncBlockedMessage ||
      indT(
        "ExpenseTickets_SheetSync_RetryRequired",
        "Ticket data changed, but we could not sync the expense line. Save again before leaving."
      );
  const shouldBlockWorkflowExit = pendingFirstLink || sheetSyncBlocked;

  useEffect(() => {
    if (!shouldBlockWorkflowExit) {
      clearExpenseNavigationGuard();
      return;
    }

    setExpenseNavigationGuard({
      active: true,
      message: sheetWorkflowBlockMessage,
      block: true,
    });
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [sheetWorkflowBlockMessage, shouldBlockWorkflowExit]);

  useEffect(() => {
    const backButton = document.getElementById("globalBackBtn") as HTMLButtonElement | null;
    if (!backButton) return;

    const previousDisabled = backButton.disabled;
    if (pendingFirstLink) {
      backButton.disabled = true;
      backButton.setAttribute("aria-disabled", "true");
    } else if (!previousDisabled) {
      backButton.disabled = false;
      backButton.setAttribute("aria-disabled", "false");
    }

    return () => {
      backButton.disabled = previousDisabled;
      backButton.setAttribute("aria-disabled", previousDisabled ? "true" : "false");
    };
  }, [pendingFirstLink]);

  const { markResetFiltersReturn, clearCachedState } = useExpenseTicketDetailNavigationState({
    fileId,
    detailOrigin,
    headerTransDate: header?.transDate,
    contextLineRecId,
    ticketReturnContext,
  });
  const canEditLinkedTicket = !linkedExpenseSheetId || (!linkSheetCheckBusy && !linkSheetLocked);
  const allowAssignedDraftEdit = isFromExpenseSheetCreate || (!!linkedExpenseSheetId && canEditLinkedTicket);
  const {
    busy,
    status,
    isEditing,
    modalError,
    linePage,
    draftDescription,
    descriptionInvalid,
    descriptionInputRef,
    draftGastoType,
    gastoTypeInvalid,
    gastoTypeInputRef,
    draftCurrencyCode,
    currencyCodeInvalid,
    currencyInputRef,
    draftTransDate,
    draftComentario,
    draftUrlFile,
    draftFileName,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setLinePage,
    setDraftDescription,
    setDraftGastoType,
    setDraftCurrencyCode,
    setDraftTransDate,
    canOpenSaveConfirm,
    handleEnableEdit,
    handleCancelEdit,
  } = useExpenseTicketDetailEditor({
    header,
    lineCount: lines.length,
    pageSize: LINES_PAGE_SIZE,
    canEditTicket: canEditTicket && canEditLinkedTicket,
    isLoading,
    allowAssignedDraftEdit,
    isFromSheetLink,
    onForbidden: showPermissionModal,
  });
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
  const { paginationLabels, previewAltText, statusLabel, gastoTypeLabel, totalAmountText, transDateText } =
    useExpenseTicketDetailDisplay({
      header,
      draftGastoType,
      draftCurrencyCode,
      draftTransDate,
      draftFileName,
      isEditing,
      gastoTypeLabelMap,
    });
  const {
    showStickyPreview,
    previewOpen,
    previewBusy,
    previewError,
    previewImageUrl,
    previewScale,
    previewTranslate,
    previewSurfaceRef,
    openPreview,
    closePreview,
    handlePreviewPointerDown,
    handlePreviewPointerMove,
    handlePreviewPointerEnd,
    handlePreviewWheel,
  } = useExpenseTicketDetailPreviewPanel({
    fileId,
    isEditing,
    draftUrlFile,
    headerUrlFile: header?.urlFile,
  });

  const visibleLines = useMemo(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);

  useExpenseTicketDetailAutoEdit({
    autoEditMode,
    isFromSheetLink,
    isLoading,
    header,
    handleEnableEdit: handleEnableEditInContext,
    canAttemptAutoEdit: !linkSheetCheckBusy,
  });

  const { handleUpdate, handlePersistHeaderDraft, handleDelete } = useExpenseTicketDetailMutations({
    busy,
    isEditing,
    canEditTicket: canEditTicket && canEditLinkedTicket,
    canDeleteTicket: canDeleteTicket && canEditLinkedTicket,
    fileId,
    draftDescription,
    draftGastoType,
    draftCurrencyCode,
    draftTransDate,
    draftComentario,
    draftUrlFile,
    draftFileName,
    linkedExpenseSheetId,
    deleteLinkedExpenseLineContext: isFromExpenseLine && linkedExpenseSheetId && contextLineRecId
      ? {
          sheetId: linkedExpenseSheetId,
          lineRecId: contextLineRecId,
        }
      : null,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
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

  const { modal, openConfirm, closeConfirm, modalLoadingText, modalCancelText, modalConfirmText, handleModalButtonConfirm } =
    useExpenseTicketDetailConfirmState({
      busy,
      modalError,
      setModalError,
      setStatus,
    });

  useEffect(() => {
    if (!sheetSyncBlocked || busy) return;
    if (!sheetWorkflowBlockMessage) return;
    if (status === sheetWorkflowBlockMessage) return;
    setStatus(sheetWorkflowBlockMessage);
  }, [busy, setStatus, sheetWorkflowBlockMessage, sheetSyncBlocked, status]);

  const isAssignedTicket = header?.status === 1;
  const isContextLocked = (isAssignedTicket && !allowAssignedDraftEdit) || (!!linkedExpenseSheetId && linkSheetLocked);
  const canEditTicketInContext = canEditTicket && canEditLinkedTicket && !isFromSheetLink;
  const canCreateTicketLineInContext = canEditTicketInContext && !isContextLocked && !sheetSyncBlocked;
  const canDeleteTicketInContext = canDeleteTicket && canEditLinkedTicket && !isFromSheetLink;
  const ticketTopbarActionMode: "default" | "save_only" | "view_only" =
    pendingFirstLink && isEditing
      ? "save_only"
      : !canEditTicketInContext && !canDeleteTicketInContext
        ? "view_only"
        : "default";

  useExpenseTicketDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    isLocked: isContextLocked,
    actionMode: ticketTopbarActionMode,
    permissionsReady: managementBootstrapReady,
    canEditTicket: canEditTicketInContext,
    canDeleteTicket: canDeleteTicketInContext,
    fileId,
    setModalError,
    handleEnableEdit: handleEnableEditInContext,
    handleCancelEdit,
    canOpenSaveConfirm,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      if ((isFromExpenseSheetCreate || isFromExpenseLine) && linkedExpenseSheetId) {
        clearCachedState();
        navigateToExpenseUrl(buildExpenseSheetDetailUrl(linkedExpenseSheetId), {
          bypassGuardOnce: true,
        });
        return;
      }

      void reloadDetail();
    },
    onDeleteSuccess: () => {
      if (ticketReturnContext?.sheetId) {
        clearCachedState();
        navigateToExpenseUrl(buildExpenseSheetDetailUrl(ticketReturnContext.sheetId), {
          bypassGuardOnce: true,
        });
        return;
      }

      markResetFiltersReturn();
      navigateToExpenseUrl("/Gastos/Tickets", {
        bypassGuardOnce: true,
      });
    },
    openConfirm,
    closeConfirm,
  });

  const { openCreateLineDetail, openLineDetail, resolveClickableCard, openFile, handleOpenExpenseSheet } =
    useExpenseTicketDetailInteractions({
    busy,
    fileId,
    contextSheetId: linkedExpenseSheetId,
    isFromSheetLink,
    headerExpenseSheetId: safeText(header?.hojaGastosIdDisplay),
    isEditing,
    canOpenSaveConfirm,
    handlePersistHeaderDraft,
    bypassWorkflowGuard: shouldBlockWorkflowExit,
    lineContainerRef,
    openPreview,
    ticketReturnContext,
  });

  useTimelineCardEffects({
    containerRef: lineContainerRef,
    errorMessage,
    items: visibleLines,
    resolveClickableCard,
  });

  const detailView = buildExpenseTicketDetailPageViewModel({
    modalArgs: {
      modal,
      modalConfirmText,
      modalCancelText,
      modalLoadingText,
      busy,
      modalError,
      status,
      handleModalButtonConfirm,
      closeConfirm,
    },
    previewArgs: {
      previewOpen,
      previewBusy,
      previewError,
      previewImageUrl,
      previewAltText,
      previewScale,
      previewTranslate,
      previewSurfaceRef,
      closePreview,
      handlePreviewPointerDown,
      handlePreviewPointerMove,
      handlePreviewPointerEnd,
      handlePreviewWheel,
    },
    contentArgs: {
      isLoading,
      errorMessage,
      header,
      showStickyPreview,
      previewBusy,
      previewError,
      previewImageUrl,
      previewAltText,
      openFile,
      statusLabel,
      gastoTypeLabel,
      totalAmountText,
      transDateText,
      isEditing,
      gastoTypeOptions,
      draftDescription,
      descriptionInvalid,
      descriptionInputRef,
      draftGastoType,
      gastoTypeInvalid,
      gastoTypeInputRef,
      draftCurrencyCode,
      currencyCodeInvalid,
      currencyInputRef,
      draftTransDate,
      draftUrlFile,
      draftFileName,
      setDraftDescription,
      setDraftGastoType,
      setDraftCurrencyCode,
      setDraftTransDate,
      isFromSheetLink,
      handleOpenExpenseSheet,
      visibleLines,
      totalLinePages,
      linePage,
      safeCurrencyCode: isEditing ? draftCurrencyCode : safeText(header?.currencyCode),
      paginationLabels,
      lineContainerRef,
      setLinePage,
      openLineDetail,
      status,
    },
  });

  return {
    ...detailView,
    canShowCreateLineFab: canCreateTicketLineInContext && !isLoading && !errorMessage && !!safeText(fileId) && !!header,
    isCreateLineFabDisabled: busy || !header,
    openCreateLineDetail,
  };
};

const ExpenseTicketDetailPageContent = () => {
  const detailView = useExpenseTicketDetailPageViewModel();
  const fabMenuItems = useMemo<FloatingActionButtonMenuItem[]>(
    () => [
      {
        id: "new-ticket-line",
        label: indT("ExpenseSheets_Fab_NewLine", "Nueva Linea"),
        icon: <NewLineIcon />,
        onClick: () => {
          void detailView.openCreateLineDetail();
        },
        disabled: detailView.isCreateLineFabDisabled,
      },
    ],
    [detailView]
  );

  return (
    <>
      <ExpenseTicketDetailView modal={detailView.modal} preview={detailView.preview} content={detailView.content} />
      {detailView.canShowCreateLineFab ? (
        <FloatingActionButton
          ariaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rapidas")}
          size={76}
          right={16}
          bottom={24}
          menuAriaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rapidas")}
          menuItems={fabMenuItems}
        />
      ) : null}
    </>
  );
};

// Main page entry for expense ticket detail.
const ExpenseTicketDetailPage = () => {
  return (
    <VisitasPageProviders enableExpenseManagement>
      <ExpenseTicketDetailPageContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-ticket-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseTicketDetailPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseTicketDetailPage;
