import { useMemo } from "react";
import { safeText } from "../../utils/expenseUiUtils.ts";
import { useExpenseTicketImagePreview } from "./useExpenseTicketImagePreview.ts";
import { hasExpenseTicketImagePreviewSource } from "./expenseTicketPreviewUtils.ts";

type UseExpenseTicketDetailPreviewPanelArgs = {
  fileId: string;
  isEditing: boolean;
  draftUrlFile: string;
  headerUrlFile?: string | null;
};

// Centralizes sticky-preview availability and image loading for ticket detail.
export const useExpenseTicketDetailPreviewPanel = ({
  fileId,
  isEditing,
  draftUrlFile,
  headerUrlFile,
}: UseExpenseTicketDetailPreviewPanelArgs) => {
  const previewSourceUrl = useMemo(() => safeText(isEditing ? draftUrlFile : headerUrlFile), [draftUrlFile, headerUrlFile, isEditing]);
  const showStickyPreview = useMemo(() => hasExpenseTicketImagePreviewSource(previewSourceUrl), [previewSourceUrl]);
  const preview = useExpenseTicketImagePreview({
    fileId,
    sourceUrl: previewSourceUrl,
    enabled: showStickyPreview,
  });

  return {
    showStickyPreview,
    ...preview,
  };
};
