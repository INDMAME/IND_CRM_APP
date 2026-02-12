import { useCallback, useEffect, useMemo, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetHeader, ExpenseSheetLine } from "../expenseTypes.ts";
import { fetchExpenseSheetDetail, fetchExpenseSheetLineDetail } from "../utils/expenseApi.ts";
import {
  clearExpenseNavigationGuard,
  navigateToExpenseUrl,
  setExpenseNavigationGuard,
} from "../utils/expenseNavigation.ts";
import { hasAssignedVoucher, parseExpenseDate, safeText, toIsoDate } from "../utils/expenseUiUtils.ts";

const toInputDate = (raw?: string): string => {
  const parsed = parseExpenseDate(raw);
  return parsed ? toIsoDate(parsed) : "";
};

const formatEditableNumber = (value: number | null | undefined): string => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "";
  }

  return String(value);
};

const buildCreateLineDraft = (baseDate: string, projectId: string): ExpenseSheetLine => {
  return {
    lineRecId: "",
    transDate: baseDate,
    typeValue: "",
    typeValueCode: "",
    description: "",
    internacional: false,
    ticket: false,
    qty: 1,
    amount: 0,
    projId: projectId,
    indAttachFiles: "",
  };
};

type UseExpenseSheetLineDetailStateArgs = {
  hasAccess: boolean;
  canCreateExpense: boolean;
  canEditExpense: boolean;
  sheetId: string;
  lineId: string;
  isCreateMode: boolean;
  onForbidden: () => void;
};

// Owns state and behavior for expense line detail page (read, edit, create).
export const useExpenseSheetLineDetailState = ({
  hasAccess,
  canCreateExpense,
  canEditExpense,
  sheetId,
  lineId,
  isCreateMode,
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
  const [draftAmount, setDraftAmount] = useState("");
  const [draftQty, setDraftQty] = useState("");
  const [draftProjectId, setDraftProjectId] = useState("");
  const [draftInternational, setDraftInternational] = useState("");

  const hydrateDraftFromLine = useCallback((nextLine: ExpenseSheetLine | null, nextHeader: ExpenseSheetHeader | null) => {
    setDraftDescription(safeText(nextLine?.description));
    setDraftTransDate(toInputDate(nextLine?.transDate || nextHeader?.transDate));
    setDraftTypeValueCode(safeText(nextLine?.typeValueCode));
    setDraftAmount(formatEditableNumber(nextLine?.amount));
    setDraftQty(formatEditableNumber(nextLine?.qty));
    setDraftProjectId(safeText(nextLine?.projId || nextHeader?.projId));
    setDraftInternational(nextLine?.internacional === true ? "true" : nextLine?.internacional === false ? "false" : "");
  }, []);

  useEffect(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        onForbidden();
        return;
      }

      if (!sheetId) {
        setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
        setHeader(null);
        setLine(null);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        if (isCreateMode) {
          if (!canCreateExpense) {
            onForbidden();
            return;
          }

          const response = await fetchExpenseSheetDetail(sheetId, {
            suppressPermissionModal: true,
          });

          if (response?.success === false || !response?.data?.header) {
            setErrorMessage(response?.message || indT("ExpenseSheets_LoadError", "Could not load line detail."));
            setHeader(null);
            setLine(null);
            return;
          }

          const loadedHeader = response.data.header;
          if (hasAssignedVoucher(loadedHeader.voucher)) {
            setErrorMessage(indT("ExpenseSheets_Detail_PaidReadOnly", "Paid expense sheets are read-only."));
            setHeader(loadedHeader);
            setLine(null);
            setIsEditing(false);
            return;
          }

          const draftLine = buildCreateLineDraft(toIsoDate(new Date()), safeText(loadedHeader.projId));
          setHeader(loadedHeader);
          setLine(draftLine);
          setIsEditing(true);
          hydrateDraftFromLine(draftLine, loadedHeader);
          setStatus("");
          return;
        }

        if (!lineId) {
          setErrorMessage(indT("ExpenseSheets_NotFound", "Expense sheet line was not found."));
          setHeader(null);
          setLine(null);
          return;
        }

        const response = await fetchExpenseSheetLineDetail(sheetId, lineId, {
          suppressPermissionModal: true,
        });

        if (response?.success === false || !response?.data) {
          setErrorMessage(response?.message || indT("ExpenseSheets_LoadError", "Could not load line detail."));
          setHeader(null);
          setLine(null);
          return;
        }

        setHeader(response.data.header || null);
        setLine(response.data.line || null);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : indT("ExpenseSheets_LoadError", "Could not load line detail."));
        setHeader(null);
        setLine(null);
      } finally {
        setIsLoading(false);
      }
    };

    void loadDetail();
  }, [canCreateExpense, hasAccess, hydrateDraftFromLine, isCreateMode, lineId, onForbidden, sheetId]);

  useEffect(() => {
    if (!line || isEditing) return;
    hydrateDraftFromLine(line, header);
  }, [header, hydrateDraftFromLine, isEditing, line]);

  const hasActiveProcess = useMemo(() => busy || isEditing, [busy, isEditing]);
  useEffect(() => {
    setExpenseNavigationGuard(hasActiveProcess);
    return () => {
      clearExpenseNavigationGuard();
    };
  }, [hasActiveProcess]);

  const isSheetPaid = hasAssignedVoucher(header?.voucher);

  const handleEnableEdit = useCallback(() => {
    if (isCreateMode || isLoading || !header || !line || isSheetPaid) {
      return;
    }

    if (!canEditExpense) {
      onForbidden();
      return;
    }

    setModalError("");
    setIsEditing(true);
    hydrateDraftFromLine(line, header);
    setStatus(indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditExpense, header, hydrateDraftFromLine, isCreateMode, isLoading, isSheetPaid, line, onForbidden]);

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
    hydrateDraftFromLine(line, header);
    setStatus(indT("Common_Cancel", "Cancel"));
  }, [header, hydrateDraftFromLine, isCreateMode, isEditing, line, sheetId]);

  const handleOpenCreateMode = useCallback(() => {
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

  const navigateToSheetDetail = useCallback(() => {
    const safeSheetId = safeText(sheetId);
    if (!safeSheetId) return;
    const targetUrl = `/Gastos/ExpenseSheetDetail?hojaGastosId=${encodeURIComponent(safeSheetId)}`;
    navigateToExpenseUrl(targetUrl);
  }, [sheetId]);

  return {
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
    draftAmount,
    draftQty,
    draftProjectId,
    draftInternational,
    isSheetPaid,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setDraftDescription,
    setDraftTransDate,
    setDraftTypeValueCode,
    setDraftAmount,
    setDraftQty,
    setDraftProjectId,
    setDraftInternational,
    handleEnableEdit,
    handleCancelEdit,
    handleOpenCreateMode,
    navigateToSheetDetail,
  };
};
