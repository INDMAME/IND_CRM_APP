import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type {
  ExpenseSheetHeader,
  ExpenseSheetLine,
  ExpenseSheetLineReimbursableExpense,
} from "../expenseTypes.ts";
import {
  fetchExpenseSheetDetail,
  getExpenseSheetDefaultCurrencyCode,
  getFuelPriceKm,
  mapExpenseSheetHeader,
  mapExpenseSheetLine,
} from "../utils/expenseApi.ts";
import {
  clearExpenseNavigationGuard,
  navigateToExpenseUrl,
  setExpenseNavigationGuard,
} from "../utils/expenseNavigation.ts";
import { hasAssignedVoucher, parseExpenseDate, safeText, toIsoDate } from "../utils/expenseUiUtils.ts";
import { EXPENSE_API_DATE_FORMAT_MESSAGE, toExpenseApiDdMmYyyy } from "../utils/expenseApiDateUtils.ts";
import { formatExpenseInputNumber } from "../utils/expenseNumberFormat.ts";
import { resolveExpenseSheetDetailPolicy } from "../detail/expenseSheetDetailPolicy.ts";
import { isManagingOtherExpenseRecord } from "../utils/expenseManagedUserScope.ts";
import {
  DEFAULT_LINE_REIMBURSABLE_EXPENSE,
  normalizeExpenseLineReimbursableExpense,
} from "../constants/expenseReimbursableExpenseCatalog.ts";

const KM_GASTO_TYPE_CODE = "3";
const FUEL_PRICE_DEBOUNCE_MS = 300;
const FUEL_PRICE_SOURCE_USER_CONFIG = "CRMHojaGastosUserPriceKmFechaTable";
const FUEL_PRICE_SOURCE_GLOBAL_CONFIG = "CRMParameters";
const EXPENSE_STATUS_APPROVED = 2;
const EXPENSE_STATUS_PAID = 4;

type ExpenseSheetLineNavigation = {
  currentIndex: number;
  totalLines: number;
  firstLineId: string;
  previousLineId: string;
  nextLineId: string;
  lastLineId: string;
};

const EMPTY_LINE_NAVIGATION: ExpenseSheetLineNavigation = {
  currentIndex: 0,
  totalLines: 0,
  firstLineId: "",
  previousLineId: "",
  nextLineId: "",
  lastLineId: "",
};

const resolveLineNavigationId = (line: ExpenseSheetLine | null | undefined): string => {
  return safeText(line?.lineRecId);
};

// Builds adjacent line navigation from the already-loaded sheet detail lines.
const buildLineNavigation = (lines: ExpenseSheetLine[], currentLineId: string): ExpenseSheetLineNavigation => {
  const normalizedCurrentLineId = safeText(currentLineId).toUpperCase();
  if (!normalizedCurrentLineId || lines.length <= 0) {
    return EMPTY_LINE_NAVIGATION;
  }

  const currentIndex = lines.findIndex(
    (entry) => resolveLineNavigationId(entry).toUpperCase() === normalizedCurrentLineId
  );
  if (currentIndex < 0) {
    return EMPTY_LINE_NAVIGATION;
  }

  const firstNavigableLine = lines.find((entry) => !!resolveLineNavigationId(entry));
  const previousNavigableLine = lines
    .slice(0, currentIndex)
    .reverse()
    .find((entry) => !!resolveLineNavigationId(entry));
  const nextNavigableLine = lines
    .slice(currentIndex + 1)
    .find((entry) => !!resolveLineNavigationId(entry));
  const lastNavigableLine = [...lines].reverse().find((entry) => !!resolveLineNavigationId(entry));

  return {
    currentIndex: currentIndex + 1,
    totalLines: lines.length,
    firstLineId: resolveLineNavigationId(firstNavigableLine),
    previousLineId: resolveLineNavigationId(previousNavigableLine),
    nextLineId: resolveLineNavigationId(nextNavigableLine),
    lastLineId: resolveLineNavigationId(lastNavigableLine),
  };
};

const toInputDate = (raw?: string): string => {
  const parsed = parseExpenseDate(raw);
  return parsed ? toIsoDate(parsed) : "";
};

const formatEditableNumber = (value: number | null | undefined): string => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "",
  });
};

const formatEditableQuantity = (value: number | null | undefined): string => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "",
  });
};

const formatEditableExchangeRate = (value: number | null | undefined): string => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
    useGrouping: true,
    fallback: "",
  });
};

const normalizeFuelTransDate = (raw: string): string => {
  return toExpenseApiDdMmYyyy(raw);
};

// Resolves localized fuel price source messages for known backend sources.
const resolveFuelPriceSourceMessage = (source: string, effectiveDate: string): string => {
  const normalizedSource = safeText(source);
  if (normalizedSource === FUEL_PRICE_SOURCE_USER_CONFIG) {
    return indT("ExpenseSheets_FuelPrice_Source_UserConfig", "Obtained by user configuration.");
  }

  if (normalizedSource === FUEL_PRICE_SOURCE_GLOBAL_CONFIG) {
    return indT("ExpenseSheets_FuelPrice_Source_GlobalConfig", "Obtained by global configuration.");
  }

  const sourceLabel = indT("ExpenseSheets_FuelPrice_Source", "Fuel price source");
  if (!normalizedSource) {
    return effectiveDate ? `${sourceLabel}: ${effectiveDate}` : sourceLabel;
  }

  return effectiveDate
    ? `${sourceLabel}: ${normalizedSource} (${effectiveDate})`
    : `${sourceLabel}: ${normalizedSource}`;
};

const buildCreateLineDraft = (
  baseDate: string,
  projectId: string,
  currencyCode: string,
  reimbursableExpense: ExpenseSheetLineReimbursableExpense = DEFAULT_LINE_REIMBURSABLE_EXPENSE
): ExpenseSheetLine => {
  return {
    lineRecId: "",
    transDate: baseDate,
    typeValue: "",
    typeValueCode: "",
    description: "",
    internacional: false,
    ticket: false,
    price: null,
    qty: 1,
    amount: null,
    projId: projectId,
    reimbursableExpense,
    currencyCode,
    amountMST: null,
    exchRate: 100,
    indAttachFiles: "",
  };
};

type UseExpenseSheetLineDetailStateArgs = {
  hasAccess: boolean;
  allowSelfManagement: boolean;
  canManageOtherUsers: boolean;
  currentAxUserId: string;
  currentCrmUserId: string;
  selectedManagedUserId: string;
  sheetId: string;
  lineId: string;
  isCreateMode: boolean;
  startInEditMode: boolean;
  onForbidden: () => void;
};

// Owns state and behavior for expense line detail page (read, edit, create).
export const useExpenseSheetLineDetailState = ({
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
  onForbidden,
}: UseExpenseSheetLineDetailStateArgs) => {
  const [header, setHeader] = useState<ExpenseSheetHeader | null>(null);
  const [line, setLine] = useState<ExpenseSheetLine | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalError, setModalError] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftTransDate, setDraftTransDate] = useState("");
  const [draftTypeValueCode, setDraftTypeValueCode] = useState("");
  const [draftPrice, setDraftPrice] = useState("");
  const [draftQty, setDraftQty] = useState("");
  const [draftProjectId, setDraftProjectId] = useState("");
  const [draftInternational, setDraftInternational] = useState("");
  const [draftReimbursableExpense, setDraftReimbursableExpense] = useState<number | null>(DEFAULT_LINE_REIMBURSABLE_EXPENSE);
  const [draftCurrencyCode, setDraftCurrencyCode] = useState("");
  const [draftAmountMST, setDraftAmountMST] = useState("");
  const [draftExchangeRate, setDraftExchangeRate] = useState("");
  const [isFuelPriceLoading, setIsFuelPriceLoading] = useState(false);
  const [fuelPriceMessage, setFuelPriceMessage] = useState("");
  const [fuelPriceMessageIsError, setFuelPriceMessageIsError] = useState(false);
  const [lineNavigation, setLineNavigation] = useState<ExpenseSheetLineNavigation>(EMPTY_LINE_NAVIGATION);
  const [companyCurrencyCode, setCompanyCurrencyCode] = useState("");

  const hydrateDraftFromLine = useCallback((
    nextLine: ExpenseSheetLine | null,
    nextHeader: ExpenseSheetHeader | null,
    resolvedCompanyCurrencyCode: string
  ) => {
    const isExistingLine = !!safeText(nextLine?.lineRecId);
    const normalizedLineProjectId = safeText(nextLine?.projId);
    setDraftDescription(safeText(nextLine?.description));
    setDraftTransDate(toInputDate(nextLine?.transDate || nextHeader?.createdDate));
    setDraftTypeValueCode(safeText(nextLine?.typeValueCode));
    setDraftPrice(formatEditableNumber(nextLine?.price));
    setDraftQty(formatEditableQuantity(nextLine?.qty));
    setDraftProjectId(isExistingLine ? normalizedLineProjectId : (normalizedLineProjectId || safeText(nextHeader?.projId)));
    setDraftInternational(nextLine?.internacional === true ? "true" : nextLine?.internacional === false ? "false" : "");
    setDraftReimbursableExpense(normalizeExpenseLineReimbursableExpense(nextLine?.reimbursableExpense));
    const localCurrencyCode = safeText(resolvedCompanyCurrencyCode).toUpperCase();
    const lineCurrencyCode = safeText(nextLine?.currencyCode).toUpperCase() || localCurrencyCode;
    const lineAmountMST = nextLine?.amountMST ?? null;
    const lineExchangeRate = lineCurrencyCode === localCurrencyCode
      ? 100
      : nextLine?.exchRate;
    setDraftCurrencyCode(lineCurrencyCode);
    setDraftAmountMST(formatEditableNumber(lineAmountMST));
    setDraftExchangeRate(formatEditableExchangeRate(lineExchangeRate));
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadDetail = async () => {
      if (!hasAccess) {
        onForbidden();
        return;
      }

      if (!sheetId) {
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
        setHeader(null);
        setLine(null);
        setLineNavigation(EMPTY_LINE_NAVIGATION);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      let loadedCompanyCurrencyCode = "";
      try {
        loadedCompanyCurrencyCode = safeText(
          await getExpenseSheetDefaultCurrencyCode({ suppressPermissionModal: true })
        ).toUpperCase();
      } catch {
        // Company currency is auxiliary metadata; line detail remains usable without it.
        loadedCompanyCurrencyCode = "";
      }
      if (isCancelled) return;
      setCompanyCurrencyCode(loadedCompanyCurrencyCode);

      try {
        if (isCreateMode) {
          const response = await fetchExpenseSheetDetail(sheetId, {
            suppressPermissionModal: true,
          });
          if (isCancelled) return;

          if (response?.Success === false) {
            setErrorMessage(response?.Message || indT("ExpenseSheets_LoadError", "Could not load line detail."));
            setHeader(null);
            setLine(null);
            setLineNavigation(EMPTY_LINE_NAVIGATION);
            return;
          }

          const sheets = Array.isArray(response?.Items) ? response.Items : [];
          const selectedSheet =
            sheets.find((entry) => safeText(entry?.HojaGastosId).toUpperCase() === sheetId.trim().toUpperCase()) || sheets[0];

          if (!selectedSheet) {
            setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
            setHeader(null);
            setLine(null);
            setLineNavigation(EMPTY_LINE_NAVIGATION);
            return;
          }

          const loadedHeader = mapExpenseSheetHeader(selectedSheet);
          const loadedStatusCode = typeof loadedHeader.expenseSheetStatus === "number" ? loadedHeader.expenseSheetStatus : null;
          const isCreateLockedStatus = loadedStatusCode === EXPENSE_STATUS_APPROVED || loadedStatusCode === EXPENSE_STATUS_PAID;
          const isManagingOtherUser = isManagingOtherExpenseRecord({
            canManageOtherUsers,
            currentAxUserId,
            currentCrmUserId,
            selectedManagedUserId,
            recordOwnerUserId: loadedHeader.userId,
            isCreateMode: false,
          });
          const loadedPolicy = resolveExpenseSheetDetailPolicy({
            statusCode: loadedStatusCode,
            isManagingOtherUser,
            allowSelfManagement,
            isPaid: isCreateLockedStatus || hasAssignedVoucher(loadedHeader.voucher),
          });
          if (isCreateLockedStatus || hasAssignedVoucher(loadedHeader.voucher)) {
            setErrorMessage(indT("ExpenseSheets_Detail_PaidReadOnly", "Paid expense sheets are read-only."));
            setHeader(loadedHeader);
            setLine(null);
            setLineNavigation(EMPTY_LINE_NAVIGATION);
            setIsEditing(false);
            return;
          }
          if (loadedPolicy.interactionMode !== "full_edit") {
            onForbidden();
            return;
          }

          const draftLine = buildCreateLineDraft(
            toIsoDate(new Date()),
            safeText(loadedHeader.projId),
            loadedCompanyCurrencyCode || safeText(loadedHeader.currencyCode).toUpperCase()
          );
          setHeader(loadedHeader);
          setLine(draftLine);
          setLineNavigation(EMPTY_LINE_NAVIGATION);
          setIsEditing(true);
          hydrateDraftFromLine(draftLine, loadedHeader, loadedCompanyCurrencyCode);
          setStatus("");
          return;
        }

        if (!lineId) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
          setHeader(null);
          setLine(null);
          setLineNavigation(EMPTY_LINE_NAVIGATION);
          return;
        }

        const response = await fetchExpenseSheetDetail(sheetId, {
          suppressPermissionModal: true,
        });
        if (isCancelled) return;

        if (response?.Success === false) {
          setErrorMessage(response?.Message || indT("ExpenseSheets_LoadError", "Could not load line detail."));
          setHeader(null);
          setLine(null);
          setLineNavigation(EMPTY_LINE_NAVIGATION);
          return;
        }

        const sheets = Array.isArray(response?.Items) ? response.Items : [];
        const selectedSheet =
          sheets.find((entry) => safeText(entry?.HojaGastosId).toUpperCase() === sheetId.trim().toUpperCase()) || sheets[0];

        if (!selectedSheet) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
          setHeader(null);
          setLine(null);
          setLineNavigation(EMPTY_LINE_NAVIGATION);
          return;
        }

        const mappedHeader = mapExpenseSheetHeader(selectedSheet);
        const mappedLines = (Array.isArray(selectedSheet.Lines) ? selectedSheet.Lines : []).map((entry) =>
          mapExpenseSheetLine(entry)
        );
        const selectedLine =
          mappedLines.find((entry) => safeText(entry.lineRecId).toUpperCase() === lineId.trim().toUpperCase()) || null;

        if (!selectedLine) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
          setHeader(mappedHeader);
          setLine(null);
          setLineNavigation(EMPTY_LINE_NAVIGATION);
          return;
        }

        setHeader(mappedHeader);
        setLine(selectedLine);
        setLineNavigation(buildLineNavigation(mappedLines, selectedLine.lineRecId));
        const loadedStatusCode = typeof mappedHeader.expenseSheetStatus === "number" ? mappedHeader.expenseSheetStatus : null;
        const loadedIsSheetApproved = loadedStatusCode === EXPENSE_STATUS_APPROVED;
        const loadedIsSheetPaidByStatus = loadedStatusCode === EXPENSE_STATUS_PAID;
        const loadedIsSheetPaid = loadedIsSheetPaidByStatus || hasAssignedVoucher(mappedHeader.voucher);
        const loadedHasLinkedTicket = !!safeText(selectedLine.fileId);
        const loadedIsManagingOtherUser = isManagingOtherExpenseRecord({
          canManageOtherUsers,
          currentAxUserId,
          currentCrmUserId,
          selectedManagedUserId,
          recordOwnerUserId: mappedHeader.userId,
          isCreateMode,
        });
        const loadedPolicy = resolveExpenseSheetDetailPolicy({
          statusCode: loadedStatusCode,
          isManagingOtherUser: loadedIsManagingOtherUser,
          allowSelfManagement,
          isPaid: loadedIsSheetPaid,
        });

        if (
          startInEditMode &&
          !loadedIsSheetApproved &&
          !loadedIsSheetPaid &&
          !loadedHasLinkedTicket &&
          !loadedIsManagingOtherUser &&
          loadedPolicy.interactionMode === "full_edit"
        ) {
          setIsEditing(true);
          hydrateDraftFromLine(selectedLine, mappedHeader, loadedCompanyCurrencyCode);
          setStatus("");
        }
      } catch (error) {
        if (isCancelled) return;
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load line detail."));
        setHeader(null);
        setLine(null);
        setLineNavigation(EMPTY_LINE_NAVIGATION);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadDetail();
    return () => {
      isCancelled = true;
    };
  }, [
    allowSelfManagement,
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    hasAccess,
    hydrateDraftFromLine,
    isCreateMode,
    startInEditMode,
    lineId,
    onForbidden,
    selectedManagedUserId,
    sheetId,
  ]);

  const normalizedDraftTypeValueCode = useMemo(() => safeText(draftTypeValueCode), [draftTypeValueCode]);
  const normalizedFuelTransDate = useMemo(() => normalizeFuelTransDate(draftTransDate), [draftTransDate]);
  const isKmType = normalizedDraftTypeValueCode === KM_GASTO_TYPE_CODE;

  useEffect(() => {
    let isCancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let controller: AbortController | null = null;

    const clearPending = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      if (controller) {
        controller.abort();
        controller = null;
      }
    };

    if (!isEditing || !isKmType) {
      setIsFuelPriceLoading(false);
      setFuelPriceMessage("");
      setFuelPriceMessageIsError(false);
      return () => {
        clearPending();
      };
    }

    if (!normalizedFuelTransDate) {
      setIsFuelPriceLoading(false);
      setFuelPriceMessage(EXPENSE_API_DATE_FORMAT_MESSAGE);
      setFuelPriceMessageIsError(true);
      return () => {
        clearPending();
      };
    }

    timer = setTimeout(async () => {
      controller = new AbortController();
      setIsFuelPriceLoading(true);
      setFuelPriceMessage("");
      setFuelPriceMessageIsError(false);

      try {
        const response = await getFuelPriceKm(normalizedFuelTransDate, {
          suppressPermissionModal: true,
          signal: controller.signal,
        });

        if (isCancelled) return;

        if (!response.Success || !response.Data || !Number.isFinite(Number(response.Data.PriceKm))) {
          setFuelPriceMessage(
            safeText(response.Message) || indT("ExpenseSheets_FuelPrice_NotFound", "Could not load fuel price for km.")
          );
          setFuelPriceMessageIsError(true);
          return;
        }

        const resolvedPrice = Number(response.Data.PriceKm);
        if (resolvedPrice > 0) {
          setDraftPrice(formatEditableNumber(resolvedPrice));
        }

        const source = safeText(response.Data.Source);
        const effectiveDate = safeText(response.Data.TransDate) || normalizedFuelTransDate;
        const message = resolveFuelPriceSourceMessage(source, effectiveDate);
        setFuelPriceMessage(message);
        setFuelPriceMessageIsError(false);
      } catch (error) {
        if (isCancelled) return;
        if (error instanceof DOMException && error.name === "AbortError") return;

        setFuelPriceMessage(
          error instanceof Error
            ? error.message
            : indT("ExpenseSheets_FuelPrice_NotFound", "Could not load fuel price for km.")
        );
        setFuelPriceMessageIsError(true);
      } finally {
        if (!isCancelled) {
          setIsFuelPriceLoading(false);
        }
      }
    }, FUEL_PRICE_DEBOUNCE_MS);

    return () => {
      isCancelled = true;
      clearPending();
    };
  }, [isEditing, isKmType, normalizedFuelTransDate]);

  const hasActiveProcess = useMemo(() => busy || isEditing, [busy, isEditing]);
  useEffect(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);

  const statusCode = typeof header?.expenseSheetStatus === "number" ? header.expenseSheetStatus : null;
  const isSheetApproved = statusCode === EXPENSE_STATUS_APPROVED;
  const isSheetPaidByStatus = statusCode === EXPENSE_STATUS_PAID;
  const isSheetPaidByVoucher = hasAssignedVoucher(header?.voucher);
  const isSheetPaid = isSheetPaidByStatus || isSheetPaidByVoucher;
  const isManagingOtherUser = isManagingOtherExpenseRecord({
    canManageOtherUsers,
    currentAxUserId,
    currentCrmUserId,
    selectedManagedUserId,
    recordOwnerUserId: header?.userId,
    isCreateMode,
  });
  const detailPolicy = useMemo(() => {
    if (!header) {
      return {
        interactionMode: "read_only" as const,
        showFab: false,
        canDeleteSheet: false,
        statusActions: [],
      };
    }

    return resolveExpenseSheetDetailPolicy({
      statusCode,
      isManagingOtherUser,
      allowSelfManagement,
      isPaid: isSheetPaid,
    });
  }, [allowSelfManagement, header, isManagingOtherUser, isSheetPaid, statusCode]);
  const canUseFullEditFeatures = detailPolicy.interactionMode === "full_edit";
  const canCreateExpenseCurrent = canUseFullEditFeatures;
  const canEditExpenseCurrent = canUseFullEditFeatures;
  const canDeleteExpenseCurrent = canUseFullEditFeatures;
  const isSheetLocked = !canUseFullEditFeatures || isSheetApproved || isSheetPaid;
  const linkedTicketFileId = safeText(line?.fileId);
  const hasLinkedTicket = !isCreateMode && !!linkedTicketFileId;
  const isLineEditLocked = isSheetLocked || hasLinkedTicket;
  const isLineDeleteLocked = isSheetLocked;
  const isLineLocked = isLineEditLocked;

  const handleEnableEdit = useCallback(() => {
    if (isCreateMode || isLoading || !header || !line || isLineEditLocked) {
      return;
    }

    if (!canEditExpenseCurrent) {
      onForbidden();
      return;
    }

    setModalError("");
    setIsEditing(true);
    hydrateDraftFromLine(line, header, companyCurrencyCode);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditExpenseCurrent, companyCurrencyCode, header, hydrateDraftFromLine, isCreateMode, isLineEditLocked, isLoading, line, onForbidden]);

  const handleCancelEdit = useCallback(() => {
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(sheetId)}`;
    if (isCreateMode) {
      navigateToExpenseUrl(targetUrl, {
        askConfirmation: true,
      });
      return;
    }

    if (!isEditing) return;

    setIsEditing(false);
    setModalError("");
    hydrateDraftFromLine(line, header, companyCurrencyCode);
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [companyCurrencyCode, header, hydrateDraftFromLine, isCreateMode, isEditing, line, sheetId]);

  const handleOpenCreateMode = useCallback(() => {
    if (!canCreateExpenseCurrent || !sheetId || isSheetLocked) {
      onForbidden();
      return;
    }

    if (isCreateMode) {
      return;
    }

    const targetUrl = `/Gastos/ExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(sheetId)}&mode=create`;
    navigateToExpenseUrl(targetUrl, {
      askConfirmation: isEditing,
    });
  }, [canCreateExpenseCurrent, isCreateMode, isEditing, isSheetLocked, onForbidden, sheetId]);

  const navigateToSheetDetail = useCallback(() => {
    const safeSheetId = safeText(sheetId);
    if (!safeSheetId) return;
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}`;
    navigateToExpenseUrl(targetUrl);
  }, [sheetId]);

  const navigateToLineDetail = useCallback(
    (targetLineId: string) => {
      const safeSheetId = safeText(sheetId);
      const safeLineId = safeText(targetLineId);
      if (isCreateMode || !safeSheetId || !safeLineId) return;

      const query = new URLSearchParams({
        hojaGastosId: safeSheetId,
        lineRecId: safeLineId,
      });
      navigateToExpenseUrl(`/Gastos/ExpenseSheetLineDetail?${query.toString()}`, {
        askConfirmation: isEditing,
      });
    },
    [isCreateMode, isEditing, sheetId]
  );

  return {
    header,
    line,
    lineNavigation,
    companyCurrencyCode,
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
    draftReimbursableExpense,
    draftCurrencyCode,
    draftAmountMST,
    draftExchangeRate,
    isKmType,
    isFuelPriceLoading,
    fuelPriceMessage,
    fuelPriceMessageIsError,
    isSheetPaid,
    isSheetLocked,
    isLineEditLocked,
    isLineDeleteLocked,
    isLineLocked,
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
    handleOpenCreateMode,
    navigateToSheetDetail,
    navigateToLineDetail,
  };
};
