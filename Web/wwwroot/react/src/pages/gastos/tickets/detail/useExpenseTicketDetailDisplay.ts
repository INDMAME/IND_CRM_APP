import { useMemo } from "react";
import { formatAmountWithCurrency } from "../../expenseFormatters.ts";
import { getExpenseTicketStatusLabel } from "../../constants/expenseTicketStatusCatalog.ts";
import { formatExpenseDisplayDate, safeText } from "../../utils/expenseUiUtils.ts";
import { indT } from "../../../../utils/indI18n.ts";
import type { ExpenseTicketDetailHeader } from "./expenseTicketDetailTypes.ts";

type UseExpenseTicketDetailDisplayArgs = {
  header: ExpenseTicketDetailHeader | null;
  draftGastoType: string;
  draftCurrencyCode: string;
  draftTransDate: string;
  draftFileName: string;
  isEditing: boolean;
  gastoTypeLabelMap: Map<string, string>;
};

// Centralizes display-only values so the page container stays focused on flow wiring.
export const useExpenseTicketDetailDisplay = ({
  header,
  draftGastoType,
  draftCurrencyCode,
  draftTransDate,
  draftFileName,
  isEditing,
  gastoTypeLabelMap,
}: UseExpenseTicketDetailDisplayArgs) => {
  const paginationLabels = useMemo(
    () => ({
      first: indT("History_Page_First", "First"),
      prev: indT("History_Page_Prev", "Previous"),
      next: indT("History_Page_Next", "Next"),
      last: indT("History_Page_Last", "Last"),
    }),
    []
  );

  const previewAltText = useMemo(
    () => safeText(isEditing ? draftFileName : header?.fileName) || indT("Tickets_Field_FileId", "Ticket"),
    [draftFileName, header?.fileName, isEditing]
  );

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

  return {
    paginationLabels,
    previewAltText,
    statusLabel,
    gastoTypeLabel,
    totalAmountText,
    transDateText,
  };
};
