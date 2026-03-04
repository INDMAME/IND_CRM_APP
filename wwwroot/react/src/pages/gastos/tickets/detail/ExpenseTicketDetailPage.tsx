import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import VisitasPageProviders from "../../../../components/commons/VisitasPageProviders.tsx";
import ConfirmModal from "../../../../components/commons/ConfirmModal.tsx";
import { useTimelineCardEffects } from "../../../../hooks/useTimelineCardEffects.ts";
import { useConfirmDialog } from "../../../../hooks/useConfirmDialog.ts";
import { canAccess, showPermissionModal } from "../../../../utils/permissions.ts";
import { indT } from "../../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../../utils/reactIsland.tsx";
import ExpenseTicketDetailHeaderForm from "../../components/ExpenseTicketDetailHeaderForm.tsx";
import ExpenseTicketLinesList from "../../components/ExpenseTicketLinesList.tsx";
import { formatAmountWithCurrency } from "../../expenseFormatters.ts";
import { getExpenseTicketStatusLabel } from "../../constants/expenseTicketStatusCatalog.ts";
import { configureExpenseApiAuth, fetchExpenseSheetTicketPreviewBlob } from "../../utils/expenseApi.ts";
import { navigateToExpenseUrl } from "../../utils/expenseNavigation.ts";
import { mapWindowEnumOptions, type ExpenseSelectOption } from "../../utils/expenseSelectOptions.ts";
import { formatExpenseDisplayDate, safeText } from "../../utils/expenseUiUtils.ts";
import { useExpenseTicketDetailState } from "./useExpenseTicketDetailState.ts";
import { useExpenseTicketDetailMutations } from "./useExpenseTicketDetailMutations.ts";
import { useExpenseTicketDetailTopbarActions } from "./useExpenseTicketDetailTopbarActions.ts";

const ALLOWED_GASTO_TYPES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
const LINES_PAGE_SIZE = 6;
const PREVIEW_MAX_SCALE = 4;
const PREVIEW_SCALE_STEP = 0.25;

type PreviewPoint = {
  x: number;
  y: number;
};

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

const clampPreviewScale = (value: number): number => {
  if (!Number.isFinite(value)) return 1;
  return Math.min(PREVIEW_MAX_SCALE, Math.max(1, value));
};

const getPreviewPointDistance = (left: PreviewPoint, right: PreviewPoint): number => {
  const deltaX = right.x - left.x;
  const deltaY = right.y - left.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};

const getPreviewPointCenter = (left: PreviewPoint, right: PreviewPoint): PreviewPoint => ({
  x: (left.x + right.x) / 2,
  y: (left.y + right.y) / 2,
});

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

const ExpenseTicketDetailPageContent = () => {
  const hasAccess = canAccess("GASTOS_TICKETS", "View");
  const canEditTicket = canAccess("GASTOS_TICKETS", "Edit");
  const canDeleteTicket = canAccess("GASTOS_TICKETS", "FullAccess");
  const fileId = safeText(window.__EXPENSE_TICKET_FILE_ID__);
  const lineContainerRef = useRef<HTMLDivElement | null>(null);
  const routeParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const autoEditMode = useMemo(() => {
    const mode = routeParams.get("mode");
    return safeText(mode).toLowerCase() === "edit";
  }, [routeParams]);
  const detailOrigin = useMemo(() => safeText(routeParams.get("origin")).toLowerCase(), [routeParams]);
  const contextSheetId = useMemo(() => safeText(routeParams.get("sheetId")), [routeParams]);
  const contextLineRecId = useMemo(() => safeText(routeParams.get("lineRecId")), [routeParams]);
  const isFromExpenseSheetCreate = detailOrigin === "sheet-create";
  const isFromExpenseLine = detailOrigin === "expense-line" && !!contextSheetId && !!contextLineRecId;
  const allowAssignedDraftEdit = isFromExpenseSheetCreate;
  const autoEditAttemptedRef = useRef(false);

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalError, setModalError] = useState("");
  const [linePage, setLinePage] = useState(1);

  const [draftDescription, setDraftDescription] = useState("");
  const [draftGastoType, setDraftGastoType] = useState("");
  const [draftCurrencyCode, setDraftCurrencyCode] = useState("");
  const [draftTransDate, setDraftTransDate] = useState("");
  const [draftComentario, setDraftComentario] = useState("");
  const [draftUrlFile, setDraftUrlFile] = useState("");
  const [draftFileName, setDraftFileName] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewBusy, setPreviewBusy] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [previewScale, setPreviewScale] = useState(1);
  const [previewTranslate, setPreviewTranslate] = useState<PreviewPoint>({ x: 0, y: 0 });
  const previewScaleRef = useRef(1);
  const previewTranslateRef = useRef<PreviewPoint>({ x: 0, y: 0 });
  const previewPointersRef = useRef<Map<number, PreviewPoint>>(new Map());
  const previewPanPointerRef = useRef<number | null>(null);
  const previewPanLastPointRef = useRef<PreviewPoint | null>(null);
  const previewPinchSnapshotRef = useRef<{
    distance: number;
    scale: number;
    center: PreviewPoint;
    translate: PreviewPoint;
  } | null>(null);

  const paginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );

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

  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel"),
  });

  const { header, lines, isLoading, errorMessage, reloadDetail } = useExpenseTicketDetailState({
    hasAccess,
    fileId,
    onForbidden: showPermissionModal,
  });

  useEffect(() => {
    if (isEditing || !header) return;

    setDraftDescription(safeText(header.description));
    setDraftGastoType(header.gastoType === null ? "" : String(header.gastoType));
    setDraftCurrencyCode(safeText(header.currencyCode).toUpperCase());
    setDraftTransDate(safeText(header.transDate));
    setDraftComentario(safeText(header.comentario));
    setDraftUrlFile(safeText(header.urlFile));
    setDraftFileName(safeText(header.fileName));
  }, [header, isEditing]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(lines.length / LINES_PAGE_SIZE));
    if (linePage > maxPage) {
      setLinePage(maxPage);
    }
  }, [linePage, lines.length]);

  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  const visibleLines = useMemo(() => pagedSlice(lines, linePage, LINES_PAGE_SIZE), [linePage, lines]);
  const totalLinePages = Math.ceil((lines.length || 0) / LINES_PAGE_SIZE);

  const handleEnableEdit = useCallback(() => {
    if (!header || isLoading) return;
    if (header.status === 1 && !allowAssignedDraftEdit) return;
    if (!canEditTicket) {
      showPermissionModal();
      return;
    }

    setModalError("");
    setIsEditing(true);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [allowAssignedDraftEdit, canEditTicket, header, isLoading]);

  useEffect(() => {
    if (!autoEditMode || isFromExpenseLine || autoEditAttemptedRef.current) return;
    if (isLoading || !header) return;
    autoEditAttemptedRef.current = true;
    handleEnableEdit();
  }, [autoEditMode, handleEnableEdit, header, isFromExpenseLine, isLoading]);

  const handleCancelEdit = useCallback(() => {
    if (!isEditing) return;
    if (!header) {
      setIsEditing(false);
      return;
    }

    setIsEditing(false);
    setModalError("");
    setDraftDescription(safeText(header.description));
    setDraftGastoType(header.gastoType === null ? "" : String(header.gastoType));
    setDraftCurrencyCode(safeText(header.currencyCode).toUpperCase());
    setDraftTransDate(safeText(header.transDate));
    setDraftComentario(safeText(header.comentario));
    setDraftUrlFile(safeText(header.urlFile));
    setDraftFileName(safeText(header.fileName));
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [header, isEditing]);

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

  const isAssignedTicket = header?.status === 1;
  const isContextLocked = isAssignedTicket && !allowAssignedDraftEdit;
  const canEditTicketInContext = canEditTicket && !isFromExpenseLine;
  const canDeleteTicketInContext = canDeleteTicket && !isFromExpenseLine;
  const ticketTopbarActionMode = isFromExpenseLine ? "view_only" : "default";

  useExpenseTicketDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    isLocked: ticketTopbarActionMode === "delete_only" ? false : isContextLocked,
    actionMode: ticketTopbarActionMode,
    canEditTicket: canEditTicketInContext,
    canDeleteTicket: canDeleteTicketInContext,
    fileId,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      void reloadDetail();
    },
    onDeleteSuccess: isFromExpenseLine
      ? () => {
          navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(contextSheetId)}`);
        }
      : undefined,
    openConfirm,
    closeConfirm,
  });

  const openLineDetail = useCallback(
    (rawLineRecId: string) => {
      if (isFromExpenseLine) return;
      const lineRecId = safeText(rawLineRecId);
      if (!lineRecId) return;
      if (!fileId) return;

      const query = new URLSearchParams({
        fileId,
        lineRecId,
      });
      if (isFromExpenseSheetCreate) {
        query.set("origin", "sheet-create");
        query.set("mode", "edit");
        if (contextSheetId) {
          query.set("sheetId", contextSheetId);
        }
      }

      const targetUrl = `/Gastos/TicketLineDetail?${query.toString()}`;
      navigateToExpenseUrl(targetUrl, {
        askConfirmation: true,
        bypassGuardOnce: false,
      });
    },
    [contextSheetId, fileId, isFromExpenseLine, isFromExpenseSheetCreate]
  );

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

  const applyPreviewTransform = useCallback((nextScale: number, nextTranslate: PreviewPoint) => {
    const normalizedScale = clampPreviewScale(nextScale);
    const normalizedTranslate = normalizedScale <= 1 ? { x: 0, y: 0 } : nextTranslate;

    previewScaleRef.current = normalizedScale;
    previewTranslateRef.current = normalizedTranslate;
    setPreviewScale(normalizedScale);
    setPreviewTranslate(normalizedTranslate);
  }, []);

  const resetPreviewGesture = useCallback(() => {
    previewPointersRef.current.clear();
    previewPanPointerRef.current = null;
    previewPanLastPointRef.current = null;
    previewPinchSnapshotRef.current = null;
    applyPreviewTransform(1, { x: 0, y: 0 });
  }, [applyPreviewTransform]);

  const rebuildPinchSnapshot = useCallback(() => {
    const pointerPoints = Array.from(previewPointersRef.current.values());
    if (pointerPoints.length < 2) {
      previewPinchSnapshotRef.current = null;
      return;
    }

    const [left, right] = pointerPoints;
    previewPinchSnapshotRef.current = {
      distance: Math.max(1, getPreviewPointDistance(left, right)),
      scale: previewScaleRef.current,
      center: getPreviewPointCenter(left, right),
      translate: previewTranslateRef.current,
    };
  }, []);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
    setPreviewBusy(false);
    setPreviewError("");
    resetPreviewGesture();
    setPreviewImageUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return "";
    });
  }, [resetPreviewGesture]);

  useEffect(() => {
    if (!previewOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePreview();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewOpen, closePreview]);

  const handlePreviewPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!previewImageUrl || previewBusy) return;
      const point: PreviewPoint = { x: event.clientX, y: event.clientY };
      previewPointersRef.current.set(event.pointerId, point);
      if (typeof event.currentTarget.setPointerCapture === "function") {
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // Ignore capture failures on browsers that do not fully support pointer capture.
        }
      }

      if (previewPointersRef.current.size === 1) {
        previewPanPointerRef.current = event.pointerId;
        previewPanLastPointRef.current = point;
        previewPinchSnapshotRef.current = null;
        return;
      }

      previewPanPointerRef.current = null;
      previewPanLastPointRef.current = null;
      rebuildPinchSnapshot();
    },
    [previewBusy, previewImageUrl, rebuildPinchSnapshot]
  );

  const handlePreviewPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!previewPointersRef.current.has(event.pointerId)) return;

      event.preventDefault();
      const point: PreviewPoint = { x: event.clientX, y: event.clientY };
      previewPointersRef.current.set(event.pointerId, point);

      const pointerEntries = Array.from(previewPointersRef.current.entries());
      const pointerPoints = pointerEntries.map((entry) => entry[1]);

      if (pointerPoints.length >= 2) {
        if (!previewPinchSnapshotRef.current) {
          rebuildPinchSnapshot();
        }

        const snapshot = previewPinchSnapshotRef.current;
        if (!snapshot) return;

        const [left, right] = pointerPoints;
        const distance = Math.max(1, getPreviewPointDistance(left, right));
        const ratio = distance / Math.max(1, snapshot.distance);
        const nextScale = clampPreviewScale(snapshot.scale * ratio);
        const center = getPreviewPointCenter(left, right);
        const nextTranslate: PreviewPoint = {
          x: snapshot.translate.x + (center.x - snapshot.center.x),
          y: snapshot.translate.y + (center.y - snapshot.center.y),
        };
        applyPreviewTransform(nextScale, nextTranslate);
        return;
      }

      if (pointerPoints.length !== 1 || previewScaleRef.current <= 1 || previewPanPointerRef.current !== event.pointerId) {
        return;
      }

      const lastPoint = previewPanLastPointRef.current;
      previewPanLastPointRef.current = point;
      if (!lastPoint) return;

      const nextTranslate: PreviewPoint = {
        x: previewTranslateRef.current.x + (point.x - lastPoint.x),
        y: previewTranslateRef.current.y + (point.y - lastPoint.y),
      };
      applyPreviewTransform(previewScaleRef.current, nextTranslate);
    },
    [applyPreviewTransform, rebuildPinchSnapshot]
  );

  const handlePreviewPointerEnd = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!previewPointersRef.current.has(event.pointerId)) return;
      previewPointersRef.current.delete(event.pointerId);
      if (
        typeof event.currentTarget.hasPointerCapture === "function" &&
        event.currentTarget.hasPointerCapture(event.pointerId)
      ) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      const pointerEntries = Array.from(previewPointersRef.current.entries());
      if (pointerEntries.length >= 2) {
        previewPanPointerRef.current = null;
        previewPanLastPointRef.current = null;
        rebuildPinchSnapshot();
        return;
      }

      if (pointerEntries.length === 1) {
        const [pointerId, pointerPoint] = pointerEntries[0];
        previewPanPointerRef.current = pointerId;
        previewPanLastPointRef.current = pointerPoint;
        previewPinchSnapshotRef.current = null;
        return;
      }

      previewPanPointerRef.current = null;
      previewPanLastPointRef.current = null;
      previewPinchSnapshotRef.current = null;
      if (previewScaleRef.current <= 1) {
        applyPreviewTransform(1, { x: 0, y: 0 });
      }
    },
    [applyPreviewTransform, rebuildPinchSnapshot]
  );

  const handlePreviewWheel = useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      if (!previewImageUrl || previewBusy) return;
      event.preventDefault();

      const direction = event.deltaY < 0 ? 1 : -1;
      const nextScale = clampPreviewScale(previewScaleRef.current + direction * PREVIEW_SCALE_STEP);
      applyPreviewTransform(nextScale, previewTranslateRef.current);
    },
    [applyPreviewTransform, previewBusy, previewImageUrl]
  );

  const openFile = useCallback(async () => {
    const currentUrl = safeText(isEditing ? draftUrlFile : header?.urlFile);
    if (!currentUrl) return;

    resetPreviewGesture();
    setPreviewOpen(true);
    setPreviewBusy(true);
    setPreviewError("");

    try {
      const blob = await fetchExpenseSheetTicketPreviewBlob(currentUrl, {
        suppressPermissionModal: true,
      });
      const objectUrl = URL.createObjectURL(blob);
      setPreviewImageUrl((previous) => {
        if (previous) {
          URL.revokeObjectURL(previous);
        }
        return objectUrl;
      });
    } catch (error) {
      setPreviewError(error instanceof Error ? error.message : indT("Api_RequestFailed", "Request failed."));
      setPreviewImageUrl("");
    } finally {
      setPreviewBusy(false);
    }
  }, [draftUrlFile, header?.urlFile, isEditing, resetPreviewGesture]);

  const handleOpenExpenseSheet = useCallback(() => {
    const safeSheetId = safeText(header?.hojaGastosIdDisplay);
    if (!safeSheetId) return;

    navigateToExpenseUrl(`/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}`, {
      askConfirmation: isEditing,
    });
  }, [header?.hojaGastosIdDisplay, isEditing]);

  const statusLabel = useMemo(() => getExpenseTicketStatusLabel(header?.status), [header?.status]);
  const gastoTypeLabel = useMemo(() => {
    const currentGastoType = isEditing ? draftGastoType : header?.gastoType === null ? "" : String(header?.gastoType ?? "");
    if (!currentGastoType) {
      return indT("Common_NotAvailable", "N/A");
    }
    return gastoTypeLabelMap.get(String(currentGastoType)) || String(currentGastoType);
  }, [draftGastoType, gastoTypeLabelMap, header?.gastoType, isEditing]);
  const totalAmountText = useMemo(
    () => formatAmountWithCurrency(header?.totalAmount ?? null, (isEditing ? draftCurrencyCode : header?.currencyCode) || header?.currencyCode),
    [draftCurrencyCode, header?.currencyCode, header?.totalAmount, isEditing]
  );
  const transDateText = useMemo(
    () => formatExpenseDisplayDate(isEditing ? draftTransDate : header?.transDate, document?.documentElement?.lang || "es-ES"),
    [draftTransDate, header?.transDate, isEditing]
  );

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
      {previewOpen
        ? createPortal(
            <div
              className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 backdrop-blur-md px-4 py-6"
              onClick={closePreview}
            >
              <button
                type="button"
                aria-label={indT("Common_Close", "Close")}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/60 bg-slate-900/55 text-slate-100 transition hover:bg-slate-900/70 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-200/80"
                onClick={(event) => {
                  event.stopPropagation();
                  closePreview();
                }}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="max-h-[92vh] max-w-[92vw] flex items-center justify-center" onClick={(event) => event.stopPropagation()}>
                {previewBusy ? (
                  <div className="flex items-center gap-2 text-sm text-slate-100">
                    <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
                      <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
                    </svg>
                    {indT("Common_Loading", "Loading")}
                  </div>
                ) : previewError ? (
                  <p className="text-sm text-rose-200">{previewError}</p>
                ) : previewImageUrl ? (
                  <div
                    className="relative max-h-[90vh] max-w-[92vw] overflow-hidden rounded-lg touch-none"
                    onPointerDown={handlePreviewPointerDown}
                    onPointerMove={handlePreviewPointerMove}
                    onPointerUp={handlePreviewPointerEnd}
                    onPointerCancel={handlePreviewPointerEnd}
                    onWheel={handlePreviewWheel}
                  >
                    <img
                      src={previewImageUrl}
                      alt={safeText(isEditing ? draftFileName : header?.fileName) || indT("Tickets_Field_FileId", "Ticket")}
                      className="pointer-events-none max-h-[90vh] w-auto max-w-[92vw] select-none rounded-lg object-contain shadow-2xl"
                      style={{
                        transform: `translate3d(${previewTranslate.x}px, ${previewTranslate.y}px, 0) scale(${previewScale})`,
                        transformOrigin: "center center",
                        transition: previewScale <= 1 ? "transform 140ms ease-out" : "none",
                      }}
                      draggable={false}
                    />
                  </div>
                ) : (
                  <p className="text-sm text-slate-100">{indT("Common_NotAvailable", "N/A")}</p>
                )}
              </div>
            </div>,
            document.body
          )
        : null}

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

      {!isLoading && !errorMessage && header ? (
        <>
          <ExpenseTicketDetailHeaderForm
            header={header}
            statusLabel={statusLabel}
            gastoTypeLabel={gastoTypeLabel}
            totalAmountText={totalAmountText}
            transDateText={transDateText}
            isEditing={isEditing}
            gastoTypeOptions={gastoTypeOptions}
            draftDescription={draftDescription}
            draftGastoType={draftGastoType}
            draftCurrencyCode={draftCurrencyCode}
            draftTransDate={draftTransDate}
            draftUrlFile={draftUrlFile}
            draftFileName={draftFileName}
            onDraftDescriptionChange={setDraftDescription}
            onDraftGastoTypeChange={setDraftGastoType}
            onDraftCurrencyCodeChange={setDraftCurrencyCode}
            onDraftTransDateChange={setDraftTransDate}
            onOpenFile={openFile}
            onOpenExpenseSheet={handleOpenExpenseSheet}
          />
          <ExpenseTicketLinesList
            visibleLines={visibleLines}
            totalLinePages={totalLinePages}
            linePage={linePage}
            currencyCode={isEditing ? draftCurrencyCode : safeText(header.currencyCode)}
            paginationLabels={paginationLabels}
            containerRef={lineContainerRef}
            onLinePageChange={setLinePage}
            onOpenLine={openLineDetail}
          />
          <div className="text-sm text-slate-600">{status}</div>
        </>
      ) : null}
    </div>
  );
};

// Main page entry for expense ticket detail.
const ExpenseTicketDetailPage = () => {
  return (
    <VisitasPageProviders>
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
