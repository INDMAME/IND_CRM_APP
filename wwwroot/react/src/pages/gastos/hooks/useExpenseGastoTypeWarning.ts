import { useCallback, useEffect, useRef } from "react";
import { indT } from "../../../utils/indI18n.ts";

export const EXPENSE_GASOLINE_GASTO_TYPE_CODE = 20;
export const EXPENSE_AI_DETECTION_QUERY_PARAM = "aiDetected";

export type ExpenseGastoTypeWarningDialogOptions = {
  title: string;
  message: string;
  confirmText: string;
  showCancel: false;
  onConfirm: null;
};

type UseExpenseGastoTypeWarningArgs = {
  openWarning: (options: ExpenseGastoTypeWarningDialogOptions) => void;
  dialogOpen?: boolean;
  aiDetectionPending?: boolean;
  aiDetectionReady?: boolean;
  detectedGastoType?: unknown;
  onAiDetectionHandled?: () => void;
};

// Identifies the canonical Gasoline expense type without depending on its localized label.
export const isExpenseGasolineGastoType = (value: unknown): boolean => {
  if (typeof value === "number") {
    return Number.isFinite(value) && value === EXPENSE_GASOLINE_GASTO_TYPE_CODE;
  }

  if (typeof value !== "string") return false;
  const normalizedValue = value.trim();
  return normalizedValue !== "" && Number(normalizedValue) === EXPENSE_GASOLINE_GASTO_TYPE_CODE;
};

// Limits manual warnings to transitions into the Gasoline expense type.
export const shouldWarnForExpenseGastoTypeChange = (previousValue: unknown, nextValue: unknown): boolean =>
  !isExpenseGasolineGastoType(previousValue) && isExpenseGasolineGastoType(nextValue);

// Confirms that a freshly AI-processed ticket was classified as Gasoline.
export const shouldWarnForAiDetectedExpense = (
  aiDetectionPending: boolean,
  gastoType: unknown
): boolean => aiDetectionPending && isExpenseGasolineGastoType(gastoType);

// Coordinates the shared informational warning for AI and manual category events.
export const useExpenseGastoTypeWarning = ({
  openWarning,
  dialogOpen = false,
  aiDetectionPending = false,
  aiDetectionReady = false,
  detectedGastoType,
  onAiDetectionHandled,
}: UseExpenseGastoTypeWarningArgs) => {
  const aiDetectionHandledRef = useRef(false);

  const showWarning = useCallback(() => {
    openWarning({
      title: indT("ExpenseSheets_GasolineCategory_Warning_Title", "Check the expense category"),
      message: indT(
        "ExpenseSheets_GasolineCategory_Warning_Body",
        "The Fuel category is normally used for fuel expenses for rental vehicles. If you want to claim reimbursement for using your own vehicle and have an agreement with the company, select the Km category."
      ),
      confirmText: indT("Common_OK", "OK"),
      showCancel: false,
      onConfirm: null,
    });
  }, [openWarning]);

  useEffect(() => {
    if (aiDetectionHandledRef.current || !aiDetectionPending || !aiDetectionReady) return;
    const shouldShowWarning = shouldWarnForAiDetectedExpense(aiDetectionPending, detectedGastoType);
    if (shouldShowWarning && dialogOpen) return;

    aiDetectionHandledRef.current = true;
    if (shouldShowWarning) {
      showWarning();
    }
    onAiDetectionHandled?.();
  }, [
    aiDetectionPending,
    aiDetectionReady,
    detectedGastoType,
    dialogOpen,
    onAiDetectionHandled,
    showWarning,
  ]);

  const warnForChange = useCallback(
    (previousValue: unknown, nextValue: unknown): boolean => {
      if (!shouldWarnForExpenseGastoTypeChange(previousValue, nextValue)) return false;
      showWarning();
      return true;
    },
    [showWarning]
  );

  return { warnForChange };
};
