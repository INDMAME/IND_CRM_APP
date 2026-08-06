import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import RecordNavigator from "../../../components/commons/RecordNavigator.tsx";
import { useAuthContext } from "../../../context/AuthContext.tsx";
import { useTimelineCardEffects } from "../../../hooks/useTimelineCardEffects.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import ExpenseSheetLineForm from "../components/ExpenseSheetLineForm.tsx";
import ExpenseTicketLinesList from "../components/ExpenseTicketLinesList.tsx";
import { getExpenseInternationalLabel, getExpenseInternationalOptions } from "../constants/internationalOptions.ts";
import { parseDecimalInput } from "../hooks/expenseMutationUtils.ts";
import { resolveExpenseLineReimbursableAmountPreview } from "../utils/expenseLineReimbursement.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { configureExpenseApiAuth } from "../utils/expenseApi.ts";
import { navigateToExpenseUrl, reloadExpensePage } from "../utils/expenseNavigation.ts";
import { appendExpenseTicketReturnQuery, saveExpenseTicketReturnContext } from "../utils/expenseTicketReturnContext.ts";
import { getExpenseGastoTypeOptions } from "../constants/expenseGastoTypeCatalog.ts";
import { areExpenseNumericInputsEquivalent, formatExpenseInputNumber } from "../utils/expenseNumberFormat.ts";
import {
  calculateExpenseLineAmountMSTForCurrency,
  calculateExpenseLineExchangeRateForCurrency,
  isExpenseLineSameReimbursementCurrency,
  normalizeExpenseLineCurrencyCode,
  resolveExpenseLineExchangeRateForCurrency,
} from "../utils/expenseLineCurrency.ts";
import {
  buildExpenseExchangeRateInfoMessage,
  fetchExpenseOfficialExchangeRate,
  formatExpenseExchangeRateInputValue,
} from "../utils/expenseExchangeRate.ts";
import {
  mapBooleanEnumOptions,
  type ExpenseSelectOption,
} from "../utils/expenseSelectOptions.ts";
import { useExpenseSheetLineDetailMutations } from "./useExpenseSheetLineDetailMutations.ts";
import { useExpenseSheetLineDetailTopbarActions } from "./useExpenseSheetLineDetailTopbarActions.ts";
import { useExpenseSheetLineDetailConfirmDialog } from "./useExpenseSheetLineDetailConfirmDialog.ts";
import { useExpenseSheetLineDetailState } from "./useExpenseSheetLineDetailState.ts";
import { useExpenseSheetLineTicketPreview } from "./useExpenseSheetLineTicketPreview.ts";
import ExpenseSheetLineDetailView from "./ExpenseSheetLineDetailView.tsx";
import ExpenseSheetLineTicketFab from "./ExpenseSheetLineTicketFab.tsx";
import { useExpenseSheetLineTypeValidation } from "./useExpenseSheetLineTypeValidation.ts";
import { useExpenseTicketDetailState } from "../tickets/detail/useExpenseTicketDetailState.ts";
import { useExpenseSheetsFilterCache } from "../list/useExpenseSheetsFilterCache.ts";

const LINKED_TICKET_LINES_PAGE_SIZE = 6;
const LINE_TICKET_FAB_BASELINE_BOTTOM_PX = 24;
const LINE_TICKET_FAB_WITH_NAVIGATOR_BOTTOM_PX = 98;

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

// Consumes the one-time edit handoff from sheet detail so later reloads return to normal view mode.
const consumeLineEditModeQuery = () => {
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

const ExpenseSheetLineDetailContent = () => {
  const {
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    managementBootstrapReady,
  } = useAuthContext();
  const hasAccess = canAccess("GASTOS_HOJA_GASTO", "View");
  const canViewLinkedTicketLines = canAccess("GASTOS_TICKETS", "View");
  const canManageExpenseLineTicket = canAccess("GASTOS_HOJA_GASTO", "Edit") && canViewLinkedTicketLines;
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const lineId = safeText(window.__EXPENSE_LINE_ID__);
  const lineMode = safeText(window.__EXPENSE_LINE_MODE__).toLowerCase();
  const isCreateMode = lineMode === "create";
  const startInEditMode = lineMode === "edit";
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = useState(false);
  const [linkedTicketLinePaging, setLinkedTicketLinePaging] = useState({ fileId: "", page: 1 });
  const exchangeRateRequestIdRef = useRef(0);
  const amountCurrencyManualEditRef = useRef(false);
  const amountMSTManualEditRef = useRef(false);
  const linkedTicketLineContainerRef = useRef<HTMLDivElement | null>(null);
  const [exchangeRateInfoMessage, setExchangeRateInfoMessage] = useState("");
  const { invalidateCachedListForRefetch } = useExpenseSheetsFilterCache();

  useEffect(() => {
    if (!startInEditMode) {
      return;
    }

    consumeLineEditModeQuery();
  }, [startInEditMode]);

  const {
    header,
    line,
    companyCurrencyCode,
    isLoading,
    errorMessage,
    lineNavigation,
    busy,
    status,
    isEditing,
    modalError,
    draftDescription,
    draftTransDate,
    draftTypeValueCode,
    draftPrice,
    draftQty,
    draftProjectId,
    draftInternational,
    draftReimbursableExpense,
    draftCurrencyCode,
    draftAmountMST,
    draftExchangeRate,
    isKmType,
    isFuelPriceLoading,
    fuelPriceMessage,
    fuelPriceMessageIsError,
    isManagingOtherUser,
    isCurrentUserExpenseOwner,
    isSheetLocked,
    isLineEditLocked,
    isLineDeleteLocked,
    hasLinkedTicket,
    linkedTicketFileId,
    canCreateExpenseCurrent,
    canEditExpenseCurrent,
    canDeleteExpenseCurrent,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftTransDate,
    setDraftTypeValueCode,
    setDraftPrice,
    setDraftQty,
    setDraftProjectId,
    setDraftInternational,
    setDraftReimbursableExpense,
    setDraftCurrencyCode,
    setDraftAmountMST,
    setDraftExchangeRate,
    handleEnableEdit,
    handleCancelEdit,
    navigateToSheetDetail,
    navigateToLineDetail,
  } = useExpenseSheetLineDetailState({
    hasAccess,
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    sheetId,
    lineId,
    isCreateMode,
    startInEditMode,
    onForbidden: showPermissionModal,
  });

  const {
    descriptionInvalid,
    typeInvalid,
    priceInvalid,
    qtyInvalid,
    descriptionInputRef,
    typeInputRef,
    priceInputRef,
    qtyInputRef,
    focusDescriptionField,
    focusTypeField,
    focusAmountFields,
    handleDraftDescriptionChange,
    handleDraftTypeValueCodeChange,
    handleDraftPriceChange,
    handleDraftQtyChange,
    canOpenSaveConfirm,
  } = useExpenseSheetLineTypeValidation({
    draftDescription,
    draftTypeValueCode,
    draftPrice,
    draftQty,
    setDraftDescription,
    setDraftTypeValueCode,
    setDraftPrice,
    setDraftQty,
  });

  const formatLineMoneyInput = useCallback((value: number | string | null | undefined): string => {
    return formatExpenseInputNumber(value, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
      fallback: "",
    });
  }, []);

  const formatLineExchangeRateInput = useCallback((value: number | string | null | undefined): string => {
    return formatExpenseInputNumber(value, {
      minimumFractionDigits: 7,
      maximumFractionDigits: 7,
      useGrouping: true,
      fallback: "",
    });
  }, []);

  const localCurrencyCode = normalizeExpenseLineCurrencyCode(companyCurrencyCode);
  const effectiveLineCurrencyCode = normalizeExpenseLineCurrencyCode(isEditing ? draftCurrencyCode : line?.currencyCode) || localCurrencyCode;
  const draftPriceValue = parseDecimalInput(draftPrice);
  const draftQtyValue = parseDecimalInput(draftQty);
  const calculatedAmountPreview =
    isEditing && draftPriceValue != null && draftPriceValue > 0 && draftQtyValue != null && draftQtyValue > 0
      ? draftPriceValue * draftQtyValue
      : line?.amount ?? null;
  const [draftAmountCurrency, setDraftAmountCurrency] = useState("");
  const priceText = useMemo(
    () => formatAmountWithCurrency(line?.price ?? null, effectiveLineCurrencyCode),
    [effectiveLineCurrencyCode, line?.price]
  );
  const amountText = useMemo(
    () => formatAmountWithCurrency(calculatedAmountPreview, effectiveLineCurrencyCode),
    [calculatedAmountPreview, effectiveLineCurrencyCode]
  );
  const displayAmountMST = line?.amountMST ?? null;
  const amountMSTText = useMemo(
    () => formatAmountWithCurrency(displayAmountMST, localCurrencyCode),
    [displayAmountMST, localCurrencyCode]
  );
  const displayedReimbursableAmount = isEditing
    ? resolveExpenseLineReimbursableAmountPreview(
        draftReimbursableExpense,
        parseDecimalInput(draftAmountMST),
        line?.reimbursableAmount
      )
    : line?.reimbursableAmount ?? null;
  const reimbursableAmountText = useMemo(
    () => formatAmountWithCurrency(displayedReimbursableAmount, localCurrencyCode),
    [displayedReimbursableAmount, localCurrencyCode]
  );
  const projectValue = safeText(line?.projId || header?.projId);
  const sheetDescription = safeText(header?.description) || "-";
  const internacionalLabel = getExpenseInternationalLabel(line?.internacional);
  const linkedTicketFileIdValue = safeText(linkedTicketFileId);
  const showLinkedTicketLines = hasLinkedTicket && !!linkedTicketFileIdValue && canViewLinkedTicketLines;

  useEffect(() => {
    if (!isEditing) {
      amountCurrencyManualEditRef.current = false;
      amountMSTManualEditRef.current = false;
      setDraftAmountCurrency("");
      return;
    }

    if (amountCurrencyManualEditRef.current) {
      return;
    }

    setDraftAmountCurrency(formatLineMoneyInput(calculatedAmountPreview));
  }, [calculatedAmountPreview, formatLineMoneyInput, isEditing, line?.lineRecId]);

  useEffect(() => {
    amountMSTManualEditRef.current = false;
  }, [isEditing, line?.lineRecId]);
  const linkedTicketDetail = useExpenseTicketDetailState({
    enabled: showLinkedTicketLines,
    hasAccess: canViewLinkedTicketLines,
    fileId: linkedTicketFileIdValue,
    onForbidden: showPermissionModal,
  });
  const totalLinkedTicketLinePages = Math.ceil((linkedTicketDetail.lines.length || 0) / LINKED_TICKET_LINES_PAGE_SIZE);
  const requestedLinkedTicketLinePage =
    linkedTicketLinePaging.fileId === linkedTicketFileIdValue
      ? linkedTicketLinePaging.page
      : 1;
  const linkedTicketLinePage =
    totalLinkedTicketLinePages > 0
      ? Math.min(Math.max(1, requestedLinkedTicketLinePage), totalLinkedTicketLinePages)
      : 1;
  const visibleLinkedTicketLines = useMemo(
    () => pagedSlice(linkedTicketDetail.lines, linkedTicketLinePage, LINKED_TICKET_LINES_PAGE_SIZE),
    [linkedTicketDetail.lines, linkedTicketLinePage]
  );
  const linkedTicketLinePaginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );
  const handleLinkedTicketLinePageChange = useCallback(
    (page: number) => {
      setLinkedTicketLinePaging({
        fileId: linkedTicketFileIdValue,
        page,
      });
    },
    [linkedTicketFileIdValue]
  );
  const linkedTicketReturnContext = useMemo(() => {
    const safeFileId = linkedTicketFileIdValue;
    const safeSheetId = safeText(sheetId);
    const safeLineId = safeText(lineId || line?.lineRecId);
    if (!safeFileId || !safeSheetId || !safeLineId) return null;

    return {
      fileId: safeFileId,
      origin: "expense-line" as const,
      sheetId: safeSheetId,
      sheetLineRecId: safeLineId,
    };
  }, [line?.lineRecId, lineId, linkedTicketFileIdValue, sheetId]);
  const resolveLinkedTicketLineCard = useCallback(
    (target: EventTarget | null) => {
      const node = target as HTMLElement | null;
      if (!node || typeof node.closest !== "function") return null;
      const card = node.closest<HTMLElement>(".timeline-card--clickable");
      if (!card) return null;
      if (!linkedTicketLineContainerRef.current?.contains(card)) return null;
      return card;
    },
    []
  );

  useTimelineCardEffects({
    containerRef: linkedTicketLineContainerRef,
    errorMessage: linkedTicketDetail.errorMessage,
    items: visibleLinkedTicketLines,
    resolveClickableCard: resolveLinkedTicketLineCard,
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
    previewFileName,
    previewAltText,
    openPreview,
    closePreview,
    handlePreviewPointerDown,
    handlePreviewPointerMove,
    handlePreviewPointerEnd,
  } = useExpenseSheetLineTicketPreview({
    linkedTicketFileId,
    hasLinkedTicket,
  });

  const gastoTypeOptions = useMemo<ExpenseSelectOption[]>(() => {
    const mapped = getExpenseGastoTypeOptions();

    const currentTypeCode = safeText(line?.typeValueCode);
    const currentTypeLabel = safeText(line?.typeValue);
    if (currentTypeCode && !mapped.some((item) => item.value === currentTypeCode)) {
      mapped.push({
        value: currentTypeCode,
        text: currentTypeLabel || currentTypeCode,
      });
    }

    return mapped;
  }, [line?.typeValue, line?.typeValueCode]);

  const internationalOptions = useMemo<ExpenseSelectOption[]>(
    () => mapBooleanEnumOptions(getExpenseInternationalOptions()),
    []
  );

  const localExchangeRateInput = useMemo(() => formatLineExchangeRateInput(100), [formatLineExchangeRateInput]);
  const isDraftCurrencyLocal = useMemo(() => {
    const normalizedDraftCurrencyCode = normalizeExpenseLineCurrencyCode(draftCurrencyCode);
    return isExpenseLineSameReimbursementCurrency(normalizedDraftCurrencyCode, localCurrencyCode);
  }, [draftCurrencyCode, localCurrencyCode]);

  const resolveExchangeRateForLineCalculation = useCallback(
    (exchangeRateRaw: string): string => {
      if (isDraftCurrencyLocal) {
        if (exchangeRateRaw !== localExchangeRateInput) {
          setDraftExchangeRate(localExchangeRateInput);
        }
        return localExchangeRateInput;
      }

      return exchangeRateRaw;
    },
    [isDraftCurrencyLocal, localExchangeRateInput, setDraftExchangeRate]
  );

  const resolveDraftLineAmount = useCallback(
    (priceRaw: string, qtyRaw: string): number | null => {
      const nextPrice = parseDecimalInput(priceRaw);
      const nextQty = parseDecimalInput(qtyRaw);
      if (nextPrice == null || nextPrice <= 0 || nextQty == null || nextQty <= 0) {
        return null;
      }

      return nextPrice * nextQty;
    },
    []
  );

  const recalculateAmountMSTFromRate = useCallback(
    (priceRaw: string, qtyRaw: string, exchangeRateRaw: string, currencyCodeOverride?: string) => {
      const amount = resolveDraftLineAmount(priceRaw, qtyRaw);
      const normalizedCurrencyCode = currencyCodeOverride
        ? normalizeExpenseLineCurrencyCode(currencyCodeOverride)
        : normalizeExpenseLineCurrencyCode(draftCurrencyCode);
      if (
        amountMSTManualEditRef.current &&
        isExpenseLineSameReimbursementCurrency(normalizedCurrencyCode, localCurrencyCode)
      ) {
        return;
      }

      const exchangeRate = resolveExpenseLineExchangeRateForCurrency(
        normalizedCurrencyCode,
        localCurrencyCode,
        parseDecimalInput(exchangeRateRaw)
      );
      const nextAmountMST =
        amount != null
          ? calculateExpenseLineAmountMSTForCurrency(amount, exchangeRate, normalizedCurrencyCode, localCurrencyCode)
          : null;
      if (nextAmountMST != null) {
        setDraftAmountMST(formatLineMoneyInput(nextAmountMST));
      }
    },
    [draftCurrencyCode, formatLineMoneyInput, localCurrencyCode, resolveDraftLineAmount, setDraftAmountMST]
  );

  const loadOfficialLineExchangeRate = useCallback(
    async (currencyCode: string, transDate: string) => {
      const nextCurrencyCode = normalizeExpenseLineCurrencyCode(currencyCode);
      if (!nextCurrencyCode || !localCurrencyCode) {
        setExchangeRateInfoMessage("");
        return;
      }

      const requestId = exchangeRateRequestIdRef.current + 1;
      exchangeRateRequestIdRef.current = requestId;

      try {
        const officialExchangeRate = await fetchExpenseOfficialExchangeRate({
          localCurrencyCode,
          expenseCurrencyCode: nextCurrencyCode,
          date: transDate,
        });
        if (requestId !== exchangeRateRequestIdRef.current || !officialExchangeRate) {
          return;
        }

        const nextExchangeRate = formatExpenseExchangeRateInputValue(officialExchangeRate.exchangeRate);
        setDraftExchangeRate(nextExchangeRate);
        recalculateAmountMSTFromRate(draftPrice, draftQty, nextExchangeRate, nextCurrencyCode);
        setExchangeRateInfoMessage(
          buildExpenseExchangeRateInfoMessage({
            rawRate: officialExchangeRate.rawRate,
            date: officialExchangeRate.date,
            source: officialExchangeRate.source,
          })
        );
      } catch (error) {
        if (requestId !== exchangeRateRequestIdRef.current) {
          return;
        }

        const message =
          error instanceof Error && safeText(error.message)
            ? safeText(error.message)
            : indT("ExpenseSheets_ExchangeRate_Unavailable", "No se pudo obtener el tipo de cambio.");
        setExchangeRateInfoMessage(message);
      }
    },
    [draftPrice, draftQty, localCurrencyCode, recalculateAmountMSTFromRate, setDraftExchangeRate]
  );

  const handleLinePriceChange = useCallback(
    (value: string) => {
      amountCurrencyManualEditRef.current = false;
      handleDraftPriceChange(value);
      const nextAmount = resolveDraftLineAmount(value, draftQty);
      setDraftAmountCurrency(nextAmount != null ? formatLineMoneyInput(nextAmount) : "");
      const effectiveExchangeRate = resolveExchangeRateForLineCalculation(draftExchangeRate);
      recalculateAmountMSTFromRate(value, draftQty, effectiveExchangeRate);
    },
    [
      draftExchangeRate,
      draftQty,
      formatLineMoneyInput,
      handleDraftPriceChange,
      recalculateAmountMSTFromRate,
      resolveDraftLineAmount,
      resolveExchangeRateForLineCalculation,
    ]
  );

  const handleLineQtyChange = useCallback(
    (value: string) => {
      amountCurrencyManualEditRef.current = false;
      handleDraftQtyChange(value);
      const nextAmount = resolveDraftLineAmount(draftPrice, value);
      setDraftAmountCurrency(nextAmount != null ? formatLineMoneyInput(nextAmount) : "");
      const effectiveExchangeRate = resolveExchangeRateForLineCalculation(draftExchangeRate);
      recalculateAmountMSTFromRate(draftPrice, value, effectiveExchangeRate);
    },
    [
      draftExchangeRate,
      draftPrice,
      formatLineMoneyInput,
      handleDraftQtyChange,
      recalculateAmountMSTFromRate,
      resolveDraftLineAmount,
      resolveExchangeRateForLineCalculation,
    ]
  );

  const handleLineAmountCurrencyChange = useCallback(
    (value: string) => {
      amountCurrencyManualEditRef.current = true;
      setDraftAmountCurrency(value);

      const amount = parseDecimalInput(value);
      const qty = parseDecimalInput(draftQty);
      if (amount == null || amount <= 0 || qty == null || qty <= 0) {
        return;
      }

      handleDraftPriceChange(formatLineMoneyInput(amount / qty));
      const effectiveExchangeRate = resolveExchangeRateForLineCalculation(draftExchangeRate);
      const exchangeRate = resolveExpenseLineExchangeRateForCurrency(
        draftCurrencyCode,
        localCurrencyCode,
        parseDecimalInput(effectiveExchangeRate)
      );
      const sameReimbursementCurrency = isExpenseLineSameReimbursementCurrency(draftCurrencyCode, localCurrencyCode);
      if (sameReimbursementCurrency && amountMSTManualEditRef.current) {
        return;
      }

      const nextAmountMST = calculateExpenseLineAmountMSTForCurrency(
        amount,
        exchangeRate,
        draftCurrencyCode,
        localCurrencyCode
      );
      if (nextAmountMST != null) {
        setDraftAmountMST(formatLineMoneyInput(nextAmountMST));
      }
    },
    [
      draftExchangeRate,
      draftCurrencyCode,
      draftQty,
      formatLineMoneyInput,
      handleDraftPriceChange,
      localCurrencyCode,
      resolveExchangeRateForLineCalculation,
      setDraftAmountMST,
    ]
  );

  const handleLineCurrencyChange = useCallback(
    (value: string) => {
      const nextCurrencyCode = normalizeExpenseLineCurrencyCode(value);
      amountMSTManualEditRef.current = false;
      setDraftCurrencyCode(nextCurrencyCode);
      setExchangeRateInfoMessage("");
      if (nextCurrencyCode && nextCurrencyCode === localCurrencyCode) {
        exchangeRateRequestIdRef.current += 1;
        const nextExchangeRate = formatLineExchangeRateInput(
          resolveExpenseLineExchangeRateForCurrency(nextCurrencyCode, localCurrencyCode, draftExchangeRate)
        );
        setDraftExchangeRate(nextExchangeRate);
        recalculateAmountMSTFromRate(draftPrice, draftQty, nextExchangeRate, nextCurrencyCode);
        return;
      }

      void loadOfficialLineExchangeRate(nextCurrencyCode, draftTransDate);
    },
    [
      draftPrice,
      draftQty,
      draftTransDate,
      loadOfficialLineExchangeRate,
      localCurrencyCode,
      draftExchangeRate,
      formatLineExchangeRateInput,
      recalculateAmountMSTFromRate,
      setDraftCurrencyCode,
      setDraftExchangeRate,
    ]
  );

  const handleLineTransDateChange = useCallback(
    (value: string) => {
      setDraftTransDate(value);
      const currentCurrencyCode = normalizeExpenseLineCurrencyCode(draftCurrencyCode);
      if (currentCurrencyCode && currentCurrencyCode !== localCurrencyCode) {
        void loadOfficialLineExchangeRate(currentCurrencyCode, value);
      }
    },
    [draftCurrencyCode, loadOfficialLineExchangeRate, localCurrencyCode, setDraftTransDate]
  );

  const handleLineExchangeRateChange = useCallback(
    (value: string) => {
      setExchangeRateInfoMessage("");
      setDraftExchangeRate(value);
    },
    [setDraftExchangeRate]
  );

  const handleLineExchangeRateCommit = useCallback(
    (value: string) => {
      setExchangeRateInfoMessage("");
      const effectiveExchangeRate = resolveExchangeRateForLineCalculation(value);
      setDraftExchangeRate(formatLineExchangeRateInput(effectiveExchangeRate));
      recalculateAmountMSTFromRate(draftPrice, draftQty, effectiveExchangeRate);
    },
    [
      draftPrice,
      draftQty,
      formatLineExchangeRateInput,
      recalculateAmountMSTFromRate,
      resolveExchangeRateForLineCalculation,
      setDraftExchangeRate,
    ]
  );

  const handleLineAmountMSTChange = useCallback(
    (value: string) => {
      if (areExpenseNumericInputsEquivalent(value, draftAmountMST)) {
        if (value !== draftAmountMST) {
          setDraftAmountMST(value);
        }
        return;
      }

      amountMSTManualEditRef.current = true;
      setExchangeRateInfoMessage("");
      setDraftAmountMST(value);

      const amount = resolveDraftLineAmount(draftPrice, draftQty);
      const amountMST = parseDecimalInput(value);
      const nextExchangeRate =
        amount != null && amountMST != null
          ? calculateExpenseLineExchangeRateForCurrency(
              amount,
              amountMST,
              draftCurrencyCode,
              localCurrencyCode,
              draftExchangeRate
            )
          : isExpenseLineSameReimbursementCurrency(draftCurrencyCode, localCurrencyCode)
            ? resolveExpenseLineExchangeRateForCurrency(draftCurrencyCode, localCurrencyCode, draftExchangeRate)
            : null;
      if (nextExchangeRate != null) {
        setDraftExchangeRate(formatLineExchangeRateInput(nextExchangeRate));
      }
    },
    [
      draftAmountMST,
      draftCurrencyCode,
      draftExchangeRate,
      draftPrice,
      draftQty,
      formatLineExchangeRateInput,
      localCurrencyCode,
      resolveDraftLineAmount,
      setDraftAmountMST,
      setDraftExchangeRate,
    ]
  );

  const {
    modal,
    openConfirm,
    closeConfirm,
    modalLoadingText,
    modalCancelText,
    modalConfirmText,
    handleModalButtonConfirm,
  } = useExpenseSheetLineDetailConfirmDialog({
    busy,
    modalError,
    setModalError,
    setStatus,
  });

  const { handleUpdate, handleDelete, handleDetachTicket } = useExpenseSheetLineDetailMutations({
    busy,
    isEditing,
    isCreateMode,
    isEditLocked: isLineEditLocked,
    isDeleteLocked: isLineDeleteLocked,
    canCreateExpense: canCreateExpenseCurrent,
    canEditExpense: canEditExpenseCurrent,
    canDeleteExpense: canDeleteExpenseCurrent,
    sheetId,
    lineId,
    line,
    linkedTicketFileId,
    draftDescription,
    draftTransDate,
    draftTypeValueCode,
    draftPrice,
    draftQty,
    draftProjectId,
    draftInternational,
    draftReimbursableExpense,
    draftCurrencyCode,
    draftAmountMST,
    draftExchangeRate,
    localCurrencyCode,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
    onInvalidDescription: focusDescriptionField,
    onInvalidType: focusTypeField,
    onInvalidAmountQty: focusAmountFields,
    onCreateSuccess: () => {},
  });

  const lineTopbarActionMode =
    !canEditExpenseCurrent && !canDeleteExpenseCurrent
      ? "view_only"
      : "default";

  const handleCancelLineEdit = useCallback(() => {
    setExchangeRateInfoMessage("");
    handleCancelEdit();
  }, [handleCancelEdit]);

  const handleEditLinkedTicket = useCallback(() => {
    if (!linkedTicketReturnContext) return;

    const query = new URLSearchParams({
      fileId: linkedTicketReturnContext.fileId,
      mode: "edit",
    });
    appendExpenseTicketReturnQuery(query, linkedTicketReturnContext);
    saveExpenseTicketReturnContext(linkedTicketReturnContext);
    navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
      askConfirmation: isEditing,
    });
  }, [isEditing, linkedTicketReturnContext]);

  const handleLineSaveSuccess = useCallback(() => {
    invalidateCachedListForRefetch();
    if (isCreateMode) {
      setIsRedirectingAfterCreate(true);
      navigateToSheetDetail();
      return;
    }

    reloadExpensePage();
  }, [invalidateCachedListForRefetch, isCreateMode, navigateToSheetDetail]);

  useExpenseSheetLineDetailTopbarActions({
    busy: busy || isRedirectingAfterCreate,
    modalOpen: modal.open,
    isEditing,
    isCreateMode,
    isLocked: isSheetLocked,
    actionMode: lineTopbarActionMode,
    permissionsReady: managementBootstrapReady,
    canCreateExpense: canCreateExpenseCurrent,
    canEditExpense: canEditExpenseCurrent,
    canDeleteExpense: canDeleteExpenseCurrent,
    sheetId,
    setModalError,
    handleEnableEdit: hasLinkedTicket ? handleEditLinkedTicket : handleEnableEdit,
    handleCancelEdit: handleCancelLineEdit,
    canOpenSaveConfirm,
    handleUpdate,
    handleDelete,
    onSaveSuccess: handleLineSaveSuccess,
    onDeleteSuccess: invalidateCachedListForRefetch,
    openConfirm,
    closeConfirm,
  });

  const handleOpenLinkedTicket = useCallback(() => {
    if (!linkedTicketReturnContext) return;

    const query = new URLSearchParams({
      fileId: linkedTicketReturnContext.fileId,
    });
    appendExpenseTicketReturnQuery(query, linkedTicketReturnContext);
    saveExpenseTicketReturnContext(linkedTicketReturnContext);
    navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
      askConfirmation: isEditing,
    });
  }, [isEditing, linkedTicketReturnContext]);

  // MMS - Opens the existing ticket list in single-line attachment mode. - 2026.08.04
  const handleOpenExistingTicketLink = useCallback(() => {
    if (
      !sheetId ||
      !lineId ||
      isCreateMode ||
      isEditing ||
      busy ||
      hasLinkedTicket ||
      line?.ticket === true ||
      !canEditExpenseCurrent ||
      isSheetLocked ||
      !canManageExpenseLineTicket ||
      isManagingOtherUser ||
      !isCurrentUserExpenseOwner
    ) {
      return;
    }
    const query = new URLSearchParams({
      action: "link-line",
      hojaGastosId: sheetId,
      sheetLineRecId: lineId,
      lineRecId: lineId,
      origin: "expense-line",
    });
    navigateToExpenseUrl(`/Gastos/Tickets?${query.toString()}`, {
      askConfirmation: false,
      bypassGuardOnce: true,
    });
  }, [
    busy,
    canEditExpenseCurrent,
    canManageExpenseLineTicket,
    hasLinkedTicket,
    isCreateMode,
    isEditing,
    isManagingOtherUser,
    isCurrentUserExpenseOwner,
    isSheetLocked,
    line?.ticket,
    lineId,
    sheetId,
  ]);

  const handleOpenDetachTicketConfirm = useCallback(() => {
    if (
      !hasLinkedTicket ||
      line?.ticket === true ||
      busy ||
      isEditing ||
      !canEditExpenseCurrent ||
      isSheetLocked ||
      !canManageExpenseLineTicket ||
      isManagingOtherUser ||
      !isCurrentUserExpenseOwner
    ) {
      return;
    }
    setModalError("");
    setStatus("");
    openConfirm({
      title: indT("ExpenseSheets_Line_Ticket_DetachTitle", "Detach ticket"),
      message: indT(
        "ExpenseSheets_Line_Ticket_DetachBody",
        "The expense line, ticket and photo will be kept. The ticket will return to pending status."
      ),
      confirmText: indT("ExpenseSheets_Line_Ticket_DetachButton", "Detach ticket"),
      cancelText: indT("Common_Cancel", "Cancel"),
      onConfirm: async () => {
        const detached = await handleDetachTicket();
        if (!detached) return false;
        invalidateCachedListForRefetch();
        reloadExpensePage();
        return true;
      },
    });
  }, [
    busy,
    canEditExpenseCurrent,
    canManageExpenseLineTicket,
    handleDetachTicket,
    hasLinkedTicket,
    invalidateCachedListForRefetch,
    isEditing,
    isManagingOtherUser,
    isCurrentUserExpenseOwner,
    isSheetLocked,
    line?.ticket,
    openConfirm,
    setModalError,
    setStatus,
  ]);

  const handleOpenLinkedTicketLine = useCallback(
    (ticketLineRecId: string) => {
      if (!linkedTicketReturnContext) return;
      const safeTicketLineRecId = safeText(ticketLineRecId);
      if (!safeTicketLineRecId) return;

      const query = new URLSearchParams({
        fileId: linkedTicketReturnContext.fileId,
        lineRecId: safeTicketLineRecId,
      });
      if (isEditing) {
        query.set("mode", "edit");
      }
      appendExpenseTicketReturnQuery(query, linkedTicketReturnContext);
      saveExpenseTicketReturnContext(linkedTicketReturnContext);
      navigateToExpenseUrl(`/Gastos/TicketLineDetail?${query.toString()}`, {
        askConfirmation: isEditing,
      });
    },
    [isEditing, linkedTicketReturnContext]
  );

  const lineNavigatorLabels = useMemo(
    () => ({
      navigation: indT("RecordNavigator_AriaLabel", "Record navigation"),
      first: indT("History_Page_First", "First"),
      previous: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
      position: indFormat(
        "RecordNavigator_Position",
        "{0} of {1}",
        lineNavigation.currentIndex,
        lineNavigation.totalLines
      ),
    }),
    [lineNavigation.currentIndex, lineNavigation.totalLines]
  );

  const handleNavigateFirstLine = useCallback(() => {
    navigateToLineDetail(lineNavigation.firstLineId);
  }, [lineNavigation.firstLineId, navigateToLineDetail]);

  const handleNavigatePreviousLine = useCallback(() => {
    navigateToLineDetail(lineNavigation.previousLineId);
  }, [lineNavigation.previousLineId, navigateToLineDetail]);

  const handleNavigateNextLine = useCallback(() => {
    navigateToLineDetail(lineNavigation.nextLineId);
  }, [lineNavigation.nextLineId, navigateToLineDetail]);

  const handleNavigateLastLine = useCallback(() => {
    navigateToLineDetail(lineNavigation.lastLineId);
  }, [lineNavigation.lastLineId, navigateToLineDetail]);

  const lineNavigator =
    !isCreateMode && line && lineNavigation.totalLines > 1 ? (
      <RecordNavigator
        currentIndex={lineNavigation.currentIndex}
        totalItems={lineNavigation.totalLines}
        labels={lineNavigatorLabels}
        disabled={isLoading || busy || isRedirectingAfterCreate}
        variant="compact"
        onFirst={handleNavigateFirstLine}
        onPrevious={handleNavigatePreviousLine}
        onNext={handleNavigateNextLine}
        onLast={handleNavigateLastLine}
      />
    ) : null;
  const canManageLineTicketLink =
    !isCreateMode &&
    !isEditing &&
    canEditExpenseCurrent &&
    !isManagingOtherUser &&
    isCurrentUserExpenseOwner &&
    !isSheetLocked &&
    canManageExpenseLineTicket &&
    line?.ticket !== true;
  const lineTicketFabBottom = lineNavigator
    ? LINE_TICKET_FAB_WITH_NAVIGATOR_BOTTOM_PX
    : LINE_TICKET_FAB_BASELINE_BOTTOM_PX;

  const linkedTicketLinesSection =
    showLinkedTicketLines ? (
      linkedTicketDetail.isLoading ? (
        <div className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-zinc-700">
          <svg className="ind-spinner size-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
            <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
          </svg>
          {indT("Common_Loading", "Loading")}
        </div>
      ) : linkedTicketDetail.errorMessage ? (
        <div className="text-danger">{linkedTicketDetail.errorMessage}</div>
      ) : (
        <ExpenseTicketLinesList
          visibleLines={visibleLinkedTicketLines}
          totalLinePages={totalLinkedTicketLinePages}
          linePage={linkedTicketLinePage}
          currencyCode={safeText(linkedTicketDetail.header?.currencyCode) || effectiveLineCurrencyCode}
          paginationLabels={linkedTicketLinePaginationLabels}
          containerRef={linkedTicketLineContainerRef}
          onLinePageChange={handleLinkedTicketLinePageChange}
          onOpenLine={handleOpenLinkedTicketLine}
        />
      )
    ) : null;

  const detailBody =
    !isLoading && !isRedirectingAfterCreate && !errorMessage && line ? (
      <>
        <ExpenseSheetLineForm
          line={line}
          fallbackDate={safeText(header?.createdDate)}
          sheetDescription={sheetDescription}
          projectValue={projectValue}
          priceText={priceText}
          amountText={amountText}
          draftAmountCurrency={draftAmountCurrency}
          amountMSTText={amountMSTText}
          reimbursableAmountText={reimbursableAmountText}
          internacionalLabel={internacionalLabel}
          isKmType={isKmType}
          isFuelPriceLoading={isFuelPriceLoading}
          fuelPriceMessage={fuelPriceMessage}
          fuelPriceMessageIsError={fuelPriceMessageIsError}
          isEditing={isEditing}
          gastoTypeOptions={gastoTypeOptions}
          internationalOptions={internationalOptions}
          draftDescription={draftDescription}
          draftTransDate={draftTransDate}
          draftTypeValueCode={draftTypeValueCode}
          draftPrice={draftPrice}
          draftQty={draftQty}
          draftProjectId={draftProjectId}
          draftInternational={draftInternational}
          draftReimbursableExpense={draftReimbursableExpense}
          draftCurrencyCode={draftCurrencyCode}
          draftAmountMST={draftAmountMST}
          draftExchangeRate={draftExchangeRate}
          localCurrencyCode={localCurrencyCode}
          exchangeRateInfoMessage={exchangeRateInfoMessage}
          descriptionInputRef={descriptionInputRef}
          typeInputRef={typeInputRef}
          priceInputRef={priceInputRef}
          qtyInputRef={qtyInputRef}
          descriptionInvalid={descriptionInvalid}
          typeInvalid={typeInvalid}
          priceInvalid={priceInvalid}
          qtyInvalid={qtyInvalid}
          onDraftDescriptionChange={handleDraftDescriptionChange}
          onDraftTransDateChange={handleLineTransDateChange}
          onDraftTypeValueCodeChange={handleDraftTypeValueCodeChange}
          onDraftPriceChange={handleLinePriceChange}
          onDraftQtyChange={handleLineQtyChange}
          onDraftAmountCurrencyChange={handleLineAmountCurrencyChange}
          onDraftProjectIdChange={setDraftProjectId}
          onDraftInternationalChange={setDraftInternational}
          onDraftReimbursableExpenseChange={setDraftReimbursableExpense}
          onDraftCurrencyCodeChange={handleLineCurrencyChange}
          onDraftAmountMSTChange={handleLineAmountMSTChange}
          onDraftExchangeRateChange={handleLineExchangeRateChange}
          onDraftExchangeRateCommit={handleLineExchangeRateCommit}
          linkedTicketFileId={linkedTicketFileId}
          showLinkedTicketField={hasLinkedTicket}
          onOpenLinkedTicket={handleOpenLinkedTicket}
        />
        {canManageLineTicketLink ? (
          <ExpenseSheetLineTicketFab
            action={hasLinkedTicket ? "detach" : "link"}
            bottom={lineTicketFabBottom}
            disabled={busy}
            onAction={hasLinkedTicket ? handleOpenDetachTicketConfirm : handleOpenExistingTicketLink}
          />
        ) : null}
        {linkedTicketLinesSection}
      </>
    ) : null;

  return (
    <ExpenseSheetLineDetailView
      modal={{
        open: modal.open,
        title: modal.title,
        message: modal.message,
        confirmText: modalConfirmText,
        cancelText: modalCancelText,
        loadingText: modalLoadingText,
        showCancel: modal.showCancel,
        showConfirm: modal.showConfirm,
        busy: busy || isRedirectingAfterCreate,
        error: modalError,
        status,
        onConfirm: handleModalButtonConfirm,
        onCancel: closeConfirm,
      }}
      preview={{
        open: previewOpen,
        busy: previewBusy,
        error: previewError,
        imageUrl: previewImageUrl,
        imageAlt: previewAltText,
        fileName: previewFileName,
        scale: previewScale,
        translate: previewTranslate,
        surfaceRef: previewSurfaceRef,
        showStickyPreview,
        onOpen: openPreview,
        onClose: closePreview,
        onPointerDown: handlePreviewPointerDown,
        onPointerMove: handlePreviewPointerMove,
        onPointerEnd: handlePreviewPointerEnd,
      }}
      content={{
        isLoading,
        isRedirectingAfterCreate,
        errorMessage,
        lineNavigator,
        detailBody,
      }}
    />
  );
};

// Main page entry for expense sheet line detail.
const ExpenseSheetLineDetailPage = () => {
  return (
    <VisitasPageProviders enableExpenseManagement>
      <ExpenseSheetLineDetailContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-line-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseSheetLineDetailPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseSheetLineDetailPage;
