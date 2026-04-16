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
import {
  mapBooleanEnumOptions,
  mapWindowEnumOptions,
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
  const priceText = useMemo(
    () => formatAmountWithCurrency(line?.price ?? null, safeText(header?.currencyCode)),
    [header?.currencyCode, line?.price]
  );
  const amountText = useMemo(
    () => formatAmountWithCurrency(calculatedAmountPreview, safeText(header?.currencyCode)),
    [calculatedAmountPreview, header?.currencyCode]
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
    const source = Array.isArray(window.__EXPENSE_GASTO_TYPES__) ? window.__EXPENSE_GASTO_TYPES__ : [];
    const mapped = mapWindowEnumOptions(source);

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
      : (hasLinkedTicket && !isSheetLocked ? "delete_only" : "default");

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
    handleEnableEdit,
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
      lineRecId: safeLineId,
    });
    saveExpenseTicketReturnContext({
      fileId: safeFileId,
      origin: "expense-line",
      sheetId: safeSheetId,
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
        typeInputRef={typeInputRef}
        priceInputRef={priceInputRef}
        qtyInputRef={qtyInputRef}
        typeInvalid={typeInvalid}
        priceInvalid={priceInvalid}
        qtyInvalid={qtyInvalid}
        onDraftDescriptionChange={setDraftDescription}
        onDraftTransDateChange={setDraftTransDate}
        onDraftTypeValueCodeChange={handleDraftTypeValueCodeChange}
        onDraftPriceChange={handleDraftPriceChange}
        onDraftQtyChange={handleDraftQtyChange}
        onDraftProjectIdChange={setDraftProjectId}
        onDraftInternationalChange={setDraftInternational}
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
