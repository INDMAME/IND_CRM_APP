import React, { useCallback, useEffect, useMemo, useState } from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import { useAuthContext } from "../../../context/AuthContext.tsx";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import { formatAmountWithCurrency } from "../expenseFormatters.ts";
import ExpenseSheetLineForm from "../components/ExpenseSheetLineForm.tsx";
import { getExpenseInternationalLabel, getExpenseInternationalOptions } from "../constants/internationalOptions.ts";
import { parseDecimalInput } from "../hooks/expenseMutationUtils.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { configureExpenseApiAuth } from "../utils/expenseApi.ts";
import { navigateToExpenseUrl, reloadExpensePage } from "../utils/expenseNavigation.ts";
import { saveExpenseTicketReturnContext } from "../utils/expenseTicketReturnContext.ts";
import { getExpenseGastoTypeOptions } from "../constants/expenseGastoTypeCatalog.ts";
import { formatExpenseInputNumber } from "../utils/expenseNumberFormat.ts";
import {
  calculateExpenseLineAmountMST,
  calculateExpenseLineExchangeRate,
  normalizeExpenseLineCurrencyCode,
} from "../utils/expenseLineCurrency.ts";
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
import { useExpenseSheetLineTypeValidation } from "./useExpenseSheetLineTypeValidation.ts";

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
  const sheetId = safeText(window.__EXPENSE_SHEET_ID__);
  const lineId = safeText(window.__EXPENSE_LINE_ID__);
  const lineMode = safeText(window.__EXPENSE_LINE_MODE__).toLowerCase();
  const isCreateMode = lineMode === "create";
  const startInEditMode = lineMode === "edit";
  const [isRedirectingAfterCreate, setIsRedirectingAfterCreate] = useState(false);

  useEffect(() => {
    if (!startInEditMode) {
      return;
    }

    consumeLineEditModeQuery();
  }, [startInEditMode]);

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
    draftTransDate,
    draftTypeValueCode,
    draftPrice,
    draftQty,
    draftProjectId,
    draftInternational,
    draftCurrencyCode,
    draftAmountMST,
    draftExchangeRate,
    isKmType,
    isFuelPriceLoading,
    fuelPriceMessage,
    fuelPriceMessageIsError,
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
    setDraftCurrencyCode,
    setDraftAmountMST,
    setDraftExchangeRate,
    handleEnableEdit,
    handleCancelEdit,
    navigateToSheetDetail,
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
    typeInvalid,
    priceInvalid,
    qtyInvalid,
    typeInputRef,
    priceInputRef,
    qtyInputRef,
    focusTypeField,
    focusAmountFields,
    handleDraftTypeValueCodeChange,
    handleDraftPriceChange,
    handleDraftQtyChange,
    canOpenSaveConfirm,
  } = useExpenseSheetLineTypeValidation({
    draftTypeValueCode,
    draftPrice,
    draftQty,
    setDraftTypeValueCode,
    setDraftPrice,
    setDraftQty,
  });

  const draftPriceValue = parseDecimalInput(draftPrice);
  const draftQtyValue = parseDecimalInput(draftQty);
  const calculatedAmountPreview =
    isEditing && draftPriceValue != null && draftPriceValue > 0 && draftQtyValue != null && draftQtyValue > 0
      ? draftPriceValue * draftQtyValue
      : line?.amount ?? null;
  const localCurrencyCode = normalizeExpenseLineCurrencyCode(header?.currencyCode) || "EUR";
  const effectiveLineCurrencyCode = normalizeExpenseLineCurrencyCode(isEditing ? draftCurrencyCode : line?.currencyCode) || localCurrencyCode;
  const priceText = useMemo(
    () => formatAmountWithCurrency(line?.price ?? null, effectiveLineCurrencyCode),
    [effectiveLineCurrencyCode, line?.price]
  );
  const amountText = useMemo(
    () => formatAmountWithCurrency(calculatedAmountPreview, effectiveLineCurrencyCode),
    [calculatedAmountPreview, effectiveLineCurrencyCode]
  );
  const amountMSTText = useMemo(
    () => formatAmountWithCurrency(line?.amountMST ?? null, localCurrencyCode),
    [line?.amountMST, localCurrencyCode]
  );
  const projectValue = safeText(line?.projId || header?.projId);
  const sheetDescription = safeText(header?.description) || "-";
  const internacionalLabel = getExpenseInternationalLabel(line?.internacional);
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
    handlePreviewWheel,
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
    (priceRaw: string, qtyRaw: string, exchangeRateRaw: string) => {
      const amount = resolveDraftLineAmount(priceRaw, qtyRaw);
      const exchangeRate = parseDecimalInput(exchangeRateRaw);
      const nextAmountMST = amount != null && exchangeRate != null
        ? calculateExpenseLineAmountMST(amount, exchangeRate)
        : null;
      if (nextAmountMST != null) {
        setDraftAmountMST(formatLineMoneyInput(nextAmountMST));
      }
    },
    [formatLineMoneyInput, resolveDraftLineAmount, setDraftAmountMST]
  );

  const handleLinePriceChange = useCallback(
    (value: string) => {
      handleDraftPriceChange(value);
      recalculateAmountMSTFromRate(value, draftQty, draftExchangeRate);
    },
    [draftExchangeRate, draftQty, handleDraftPriceChange, recalculateAmountMSTFromRate]
  );

  const handleLineQtyChange = useCallback(
    (value: string) => {
      handleDraftQtyChange(value);
      recalculateAmountMSTFromRate(draftPrice, value, draftExchangeRate);
    },
    [draftExchangeRate, draftPrice, handleDraftQtyChange, recalculateAmountMSTFromRate]
  );

  const handleLineCurrencyChange = useCallback(
    (value: string) => {
      const nextCurrencyCode = normalizeExpenseLineCurrencyCode(value);
      setDraftCurrencyCode(nextCurrencyCode);
      if (nextCurrencyCode && nextCurrencyCode === localCurrencyCode && !parseDecimalInput(draftExchangeRate)) {
        const localExchangeRate = formatLineExchangeRateInput(100);
        setDraftExchangeRate(localExchangeRate);
        recalculateAmountMSTFromRate(draftPrice, draftQty, localExchangeRate);
        return;
      }

      recalculateAmountMSTFromRate(draftPrice, draftQty, draftExchangeRate);
    },
    [
      draftExchangeRate,
      draftPrice,
      draftQty,
      formatLineExchangeRateInput,
      localCurrencyCode,
      recalculateAmountMSTFromRate,
      setDraftCurrencyCode,
      setDraftExchangeRate,
    ]
  );

  const handleLineExchangeRateChange = useCallback(
    (value: string) => {
      setDraftExchangeRate(value);
      recalculateAmountMSTFromRate(draftPrice, draftQty, value);
    },
    [draftPrice, draftQty, recalculateAmountMSTFromRate, setDraftExchangeRate]
  );

  const handleLineAmountMSTChange = useCallback(
    (value: string) => {
      setDraftAmountMST(value);
      const amount = resolveDraftLineAmount(draftPrice, draftQty);
      const amountMST = parseDecimalInput(value);
      const nextExchangeRate = amount != null && amountMST != null
        ? calculateExpenseLineExchangeRate(amount, amountMST)
        : null;
      if (nextExchangeRate != null) {
        setDraftExchangeRate(formatLineExchangeRateInput(nextExchangeRate));
      }
    },
    [draftPrice, draftQty, formatLineExchangeRateInput, resolveDraftLineAmount, setDraftAmountMST, setDraftExchangeRate]
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

  const { handleUpdate, handleDelete } = useExpenseSheetLineDetailMutations({
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
    draftCurrencyCode,
    draftAmountMST,
    draftExchangeRate,
    localCurrencyCode,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
    onInvalidType: focusTypeField,
    onInvalidAmountQty: focusAmountFields,
    onCreateSuccess: () => {},
  });

  const lineTopbarActionMode =
    !canEditExpenseCurrent && !canDeleteExpenseCurrent
      ? "view_only"
      : "default";

  const handleEditLinkedTicket = useCallback(() => {
    const safeFileId = safeText(linkedTicketFileId);
    const safeSheetId = safeText(sheetId);
    const safeLineId = safeText(lineId || line?.lineRecId);
    if (!safeFileId || !safeSheetId || !safeLineId) return;

    const query = new URLSearchParams({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
      sheetLineRecId: safeLineId,
      mode: "edit",
    });
    saveExpenseTicketReturnContext({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
      sheetLineRecId: safeLineId,
    });
    navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
      askConfirmation: isEditing,
    });
  }, [isEditing, line?.lineRecId, lineId, linkedTicketFileId, sheetId]);

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
    handleCancelEdit,
    canOpenSaveConfirm,
    handleUpdate,
    handleDelete,
    onSaveSuccess: () => {
      if (isCreateMode) {
        setIsRedirectingAfterCreate(true);
        navigateToSheetDetail();
        return;
      }

      reloadExpensePage();
    },
    openConfirm,
    closeConfirm,
  });

  const handleOpenLinkedTicket = useCallback(() => {
    const safeFileId = safeText(linkedTicketFileId);
    const safeSheetId = safeText(sheetId);
    const safeLineId = safeText(lineId || line?.lineRecId);
    if (!safeFileId || !safeSheetId || !safeLineId) return;

    const query = new URLSearchParams({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
      sheetLineRecId: safeLineId,
    });
    saveExpenseTicketReturnContext({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
      sheetLineRecId: safeLineId,
    });
    navigateToExpenseUrl(`/Gastos/TicketDetail?${query.toString()}`, {
      askConfirmation: isEditing,
    });
  }, [isEditing, line?.lineRecId, lineId, linkedTicketFileId, sheetId]);

  const detailBody =
    !isLoading && !isRedirectingAfterCreate && !errorMessage && line ? (
      <ExpenseSheetLineForm
        line={line}
        fallbackDate={safeText(header?.createdDate)}
        sheetDescription={sheetDescription}
        projectValue={projectValue}
        priceText={priceText}
        amountText={amountText}
        amountMSTText={amountMSTText}
        internacionalLabel={internacionalLabel}
        isKmType={isKmType}
        isFuelPriceLoading={isFuelPriceLoading}
        fuelPriceMessage={fuelPriceMessage}
        fuelPriceMessageIsError={fuelPriceMessageIsError}
        status={status}
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
        draftCurrencyCode={draftCurrencyCode}
        draftAmountMST={draftAmountMST}
        draftExchangeRate={draftExchangeRate}
        localCurrencyCode={localCurrencyCode}
        typeInputRef={typeInputRef}
        priceInputRef={priceInputRef}
        qtyInputRef={qtyInputRef}
        typeInvalid={typeInvalid}
        priceInvalid={priceInvalid}
        qtyInvalid={qtyInvalid}
        onDraftDescriptionChange={setDraftDescription}
        onDraftTransDateChange={setDraftTransDate}
        onDraftTypeValueCodeChange={handleDraftTypeValueCodeChange}
        onDraftPriceChange={handleLinePriceChange}
        onDraftQtyChange={handleLineQtyChange}
        onDraftProjectIdChange={setDraftProjectId}
        onDraftInternationalChange={setDraftInternational}
        onDraftCurrencyCodeChange={handleLineCurrencyChange}
        onDraftAmountMSTChange={handleLineAmountMSTChange}
        onDraftExchangeRateChange={handleLineExchangeRateChange}
        linkedTicketFileId={linkedTicketFileId}
        showLinkedTicketField={hasLinkedTicket}
        onOpenLinkedTicket={handleOpenLinkedTicket}
      />
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
        onWheel: handlePreviewWheel,
      }}
      content={{
        isLoading,
        isRedirectingAfterCreate,
        errorMessage,
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
