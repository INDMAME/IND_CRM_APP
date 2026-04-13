import React, { useCallback, useEffect, useMemo, useRef } from "react";
import VisitasPageProviders from "../../../../components/commons/VisitasPageProviders.tsx";
import { useAuthContext } from "../../../../context/AuthContext.tsx";
import { useTimelineCardEffects } from "../../../../hooks/useTimelineCardEffects.ts";
import { canAccess, showPermissionModal } from "../../../../utils/permissions.ts";
import { indT } from "../../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../../utils/reactIsland.tsx";
import { configureExpenseApiAuth } from "../../utils/expenseApi.ts";
import { navigateToExpenseUrl } from "../../utils/expenseNavigation.ts";
import { isManagingOtherExpenseUser } from "../../utils/expenseManagedUserScope.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../../utils/expenseSelectOptions.ts";
import { buildExpenseSheetDetailUrl } from "../../utils/expenseTicketReturnContext.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";
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
  ticketReturnContext,
}: {
  fileId: string;
  detailOrigin: string;
  headerTransDate: string | null | undefined;
  ticketReturnContext: ReturnType<typeof useExpenseTicketDetailRouteContext>["ticketReturnContext"];
}) => {
  const { readCachedState, saveCachedState, markResetFiltersReturn, clearCachedState } = useExpenseTicketsFilterCache();

  useExpenseTicketDetailBackNavigation({
    fileId,
    detailOrigin,
    headerTransDate,
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
  isFromExpenseLine,
  isFromSheetLink,
  isLoading,
  header,
  handleEnableEdit,
}: {
  autoEditMode: boolean;
  isFromExpenseLine: boolean;
  isFromSheetLink: boolean;
  isLoading: boolean;
  header: ExpenseTicketDetailHeader | null;
  handleEnableEdit: () => void;
}) => {
  const autoEditAttemptedRef = useRef(false);

  useEffect(() => {
    if (!autoEditMode || isFromExpenseLine || isFromSheetLink || autoEditAttemptedRef.current) return;
    if (isLoading || !header) return;

    autoEditAttemptedRef.current = true;
    handleEnableEdit();
  }, [autoEditMode, handleEnableEdit, header, isFromExpenseLine, isFromSheetLink, isLoading]);
};

// Resolves permission and acting-user state so the page container stays focused on orchestration.
const useExpenseTicketDetailPermissionState = ({
  isFromExpenseSheetCreate,
}: {
  isFromExpenseSheetCreate: boolean;
}) => {
  const { canManageOtherUsers, currentAxUserId, selectedManagedUserId, managementBootstrapReady } = useAuthContext();
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
    allowAssignedDraftEdit: isFromExpenseSheetCreate,
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
    allowAssignedDraftEdit,
    isManagingOtherUser,
    managementBootstrapReady,
  } = useExpenseTicketDetailPermissionState({
    isFromExpenseSheetCreate,
  });
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
  const { markResetFiltersReturn, clearCachedState } = useExpenseTicketDetailNavigationState({
    fileId,
    detailOrigin,
    headerTransDate: header?.transDate,
    ticketReturnContext,
  });
  const {
    busy,
    status,
    isEditing,
    modalError,
    linePage,
    draftDescription,
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
    canEditTicket,
    isLoading,
    allowAssignedDraftEdit,
    isFromSheetLink,
    onForbidden: showPermissionModal,
  });
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
    isFromExpenseLine,
    isFromSheetLink,
    isLoading,
    header,
    handleEnableEdit,
  });

  const { handleUpdate, handleDelete } = useExpenseTicketDetailMutations({
    busy,
    isEditing,
    canEditTicket,
    canDeleteTicket,
    fileId,
    draftDescription,
    draftGastoType,
    draftCurrencyCode,
    draftTransDate,
    draftComentario,
    draftUrlFile,
    draftFileName,
    linkedExpenseSheetId: contextSheetId,
    deleteLinkedExpenseLineContext: isFromExpenseLine
      ? {
          sheetId: contextSheetId,
          lineRecId: contextLineRecId,
        }
      : null,
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

  const isAssignedTicket = header?.status === 1;
  const isContextLocked = isAssignedTicket && !allowAssignedDraftEdit;
  const canEditTicketInContext = canEditTicket && !isFromExpenseLine && !isFromSheetLink;
  const canDeleteTicketInContext = canDeleteTicket && !isFromExpenseLine && !isFromSheetLink;
  const ticketTopbarActionMode: "default" | "view_only" =
    isManagingOtherUser || isFromExpenseLine || isFromSheetLink ? "view_only" : "default";

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
    handleEnableEdit,
    handleCancelEdit,
    canOpenSaveConfirm,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      void reloadDetail();
    },
    onDeleteSuccess: () => {
      if (ticketReturnContext?.sheetId) {
        clearCachedState();
        navigateToExpenseUrl(buildExpenseSheetDetailUrl(ticketReturnContext.sheetId));
        return;
      }

      markResetFiltersReturn();
      navigateToExpenseUrl("/Gastos/Tickets");
    },
    openConfirm,
    closeConfirm,
  });

  const { openLineDetail, resolveClickableCard, openFile, handleOpenExpenseSheet } = useExpenseTicketDetailInteractions({
    fileId,
    contextSheetId,
    isFromExpenseLine,
    isFromExpenseSheetCreate,
    isFromSheetLink,
    headerExpenseSheetId: safeText(header?.hojaGastosIdDisplay),
    isEditing,
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

  return detailView;
};

const ExpenseTicketDetailPageContent = () => {
  const detailView = useExpenseTicketDetailPageViewModel();

  return <ExpenseTicketDetailView modal={detailView.modal} preview={detailView.preview} content={detailView.content} />;
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
