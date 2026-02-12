import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type {
  ExpenseSheetHeader,
  ExpenseSheetLine,
} from "../expenseTypes.ts";
import { fetchExpenseSheetDetail } from "../utils/expenseApi.ts";
import {
  clearExpenseNavigationGuard,
  navigateToExpenseUrl,
  setExpenseNavigationGuard,
} from "../utils/expenseNavigation.ts";
import { hasAssignedVoucher, safeText } from "../utils/expenseUiUtils.ts";

const buildCreateHeaderDraft = (): ExpenseSheetHeader => {
  return {
    hojaGastosId: "",
    description: "",
    projId: "",
    voucher: "",
    currencyCode: "",
    totalAmountMST: null,
    exchRate: "1",
  };
};

const shouldShowExchangeRate = (value: string): boolean => {
  if (!value) return false;

  const normalized = value.replace(/\s+/g, "").replace(",", ".");
  const parsed = Number(normalized);
  if (Number.isFinite(parsed)) {
    return Math.abs(parsed) > 0;
  }

  return true;
};

type UseExpenseSheetDetailStateArgs = {
  hasAccess: boolean;
  canCreateExpense: boolean;
  canEditExpense: boolean;
  sheetId: string;
  isCreateMode: boolean;
  onForbidden: () => void;
};

// Owns state and behavior for expense sheet detail page (read, edit, create).
export const useExpenseSheetDetailState = ({
  hasAccess,
  canCreateExpense,
  canEditExpense,
  sheetId,
  isCreateMode,
  onForbidden,
}: UseExpenseSheetDetailStateArgs) => {
  const [header, setHeader] = useState<ExpenseSheetHeader | null>(null);
  const [lines, setLines] = useState<ExpenseSheetLine[]>([]);
  const [linePage, setLinePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [modalError, setModalError] = useState("");
  const [draftDescription, setDraftDescription] = useState("");
  const [draftProjectId, setDraftProjectId] = useState("");
  const [draftCurrencyCode, setDraftCurrencyCode] = useState("");
  const [draftExchangeRate, setDraftExchangeRate] = useState("");

  const hydrateDraftFromHeader = useCallback((nextHeader: ExpenseSheetHeader | null) => {
    setDraftDescription(safeText(nextHeader?.description));
    setDraftProjectId(safeText(nextHeader?.projId));
    setDraftCurrencyCode(safeText(nextHeader?.currencyCode));
    setDraftExchangeRate(safeText(nextHeader?.exchRate));
  }, []);

  useEffect(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        onForbidden();
        return;
      }

      if (isCreateMode) {
        if (!canCreateExpense) {
          onForbidden();
          return;
        }

        const draftHeader = buildCreateHeaderDraft();
        setHeader(draftHeader);
        setLines([]);
        setLinePage(1);
        setIsEditing(true);
        hydrateDraftFromHeader(draftHeader);
        setStatus("");
        setErrorMessage("");
        return;
      }

      if (!sheetId) {
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet was not found."));
        setHeader(null);
        setLines([]);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetchExpenseSheetDetail(sheetId, {
          suppressPermissionModal: true,
        });

        if (response?.success === false || !response?.data) {
          setErrorMessage(response?.message || indT("ExpenseSheets_LoadError", "Could not load expense sheet detail."));
          setHeader(null);
          setLines([]);
          return;
        }

        const nextHeader = response.data.header || null;
        const nextLines = Array.isArray(response.data.lines) ? response.data.lines : [];
        setHeader(nextHeader);
        setLines(nextLines);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load expense sheet detail.")
        );
        setHeader(null);
        setLines([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadDetail();
  }, [canCreateExpense, hasAccess, hydrateDraftFromHeader, isCreateMode, onForbidden, sheetId]);

  useEffect(() => {
    if (!header || isEditing) return;
    hydrateDraftFromHeader(header);
  }, [header, hydrateDraftFromHeader, isEditing]);

  const hasActiveProcess = useMemo(() => busy || isEditing, [busy, isEditing]);
  useEffect(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);

  const projectValue = safeText(header?.projId);
  const voucherValue = safeText(header?.voucher);
  const isSheetPaid = hasAssignedVoucher(voucherValue);
  const hasLines = lines.length > 0;
  const exchangeRateValue = safeText(header?.exchRate);
  const showExchangeRate = useMemo(() => shouldShowExchangeRate(exchangeRateValue), [exchangeRateValue]);
  const normalizedDraftCurrency = useMemo(() => draftCurrencyCode.trim().toUpperCase(), [draftCurrencyCode]);
  const exchangeRateRequired = isEditing && normalizedDraftCurrency !== "" && normalizedDraftCurrency !== "EUR";
  const exchangeRateValidationMessage =
    exchangeRateRequired && !draftExchangeRate.trim()
      ? indT(
          "ExpenseSheets_Validation_ExchangeRateRequired",
          "Exchange rate is required when currency is different from EUR."
        )
      : "";
  const isCurrencyLockedByLines = isEditing && hasLines;
  const isExchangeRateLockedByLines = isEditing && hasLines && showExchangeRate;

  const handleEnableEdit = useCallback(() => {
    if (isCreateMode || isLoading || !header || isSheetPaid) {
      return;
    }

    if (!canEditExpense) {
      onForbidden();
      return;
    }

    setModalError("");
    setIsEditing(true);
    hydrateDraftFromHeader(header);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditExpense, header, hydrateDraftFromHeader, isCreateMode, isLoading, isSheetPaid, onForbidden]);

  const handleCancelEdit = useCallback(() => {
    if (isCreateMode) {
      navigateToExpenseUrl("/Gastos/ExpenseSheets", {
        askConfirmation: true,
      });
      return;
    }

    if (!isEditing) return;

    setIsEditing(false);
    setModalError("");
    hydrateDraftFromHeader(header);
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [header, hydrateDraftFromHeader, isCreateMode, isEditing]);

  // Opens expense sheet create mode from list-level entry points.
  const handleOpenCreateSheetMode = useCallback(() => {
    if (!canCreateExpense) {
      onForbidden();
      return;
    }

    if (isCreateMode) {
      return;
    }

    navigateToExpenseUrl("/Gastos/ExpenseSheetDetail?mode=create", {
      askConfirmation: isEditing,
    });
  }, [canCreateExpense, isCreateMode, isEditing, onForbidden]);

  // Opens expense line create mode from an existing expense sheet detail.
  const handleOpenCreateLineMode = useCallback(() => {
    if (!canCreateExpense || !sheetId) {
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
  }, [canCreateExpense, isCreateMode, isEditing, onForbidden, sheetId]);

  const navigateToCreatedSheet = useCallback((createdSheetId: string) => {
    const safeCreatedSheetId = safeText(createdSheetId);
    if (!safeCreatedSheetId) return;

    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeCreatedSheetId)}`;
    navigateToExpenseUrl(targetUrl);
  }, []);

  const navigateToLineDetail = useCallback(
    (lineRecId: string) => {
      const safeLineId = safeText(lineRecId);
      const safeSheetId = safeText(sheetId);
      if (!safeLineId || !safeSheetId) return;

      const targetUrl = `/Gastos/ExpenseSheetLineDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}&lineRecId=${encodeURIComponent(safeLineId)}`;
      navigateToExpenseUrl(targetUrl, {
        askConfirmation: true,
        bypassGuardOnce: false,
      });
    },
    [sheetId]
  );

  return {
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
    projectValue,
    voucherValue,
    isSheetPaid,
    exchangeRateValue,
    showExchangeRate,
    normalizedDraftCurrency,
    exchangeRateValidationMessage,
    isCurrencyLockedByLines,
    isExchangeRateLockedByLines,
    setLinePage,
    setLines,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftProjectId,
    setDraftCurrencyCode,
    setDraftExchangeRate,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateSheetMode,
    handleOpenCreateLineMode,
    navigateToCreatedSheet,
    navigateToLineDetail,
  };
};
