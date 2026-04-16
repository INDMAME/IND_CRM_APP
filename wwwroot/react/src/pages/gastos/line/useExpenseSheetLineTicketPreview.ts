import { useEffect, useMemo, useState } from "react";
import { indT } from "../../../utils/indI18n.ts";
import { fetchExpenseSheetTicket } from "../utils/expenseApi.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import { mapExpenseTicketDetailHeader } from "../tickets/detail/expenseTicketDetailTypes.ts";
import { hasExpenseTicketImagePreviewSource } from "../tickets/detail/expenseTicketPreviewUtils.ts";
import { useExpenseTicketImagePreview } from "../tickets/detail/useExpenseTicketImagePreview.ts";

type UseExpenseSheetLineTicketPreviewArgs = {
  linkedTicketFileId: string;
  hasLinkedTicket: boolean;
};

// Picks the linked ticket detail item needed to render the existing preview safely from the line page.
const resolveLinkedTicketPreviewMetadata = (items: unknown[], linkedTicketFileId: string) => {
  const safeLinkedTicketFileId = safeText(linkedTicketFileId);
  if (!safeLinkedTicketFileId || !Array.isArray(items) || items.length === 0) {
    return {
      fileName: "",
      sourceUrl: "",
    };
  }

  const selectedItem =
    items.find((entry) => safeText((entry as { FileId?: unknown })?.FileId).toUpperCase() === safeLinkedTicketFileId.toUpperCase()) ||
    items[0];
  if (!selectedItem || typeof selectedItem !== "object") {
    return {
      fileName: "",
      sourceUrl: "",
    };
  }

  const mappedHeader = mapExpenseTicketDetailHeader(selectedItem as Parameters<typeof mapExpenseTicketDetailHeader>[0]);
  return {
    fileName: safeText(mappedHeader.fileName),
    sourceUrl: safeText(mappedHeader.urlFile),
  };
};

// Loads linked ticket preview metadata without changing the existing sheet-line detail contract.
export const useExpenseSheetLineTicketPreview = ({
  linkedTicketFileId,
  hasLinkedTicket,
}: UseExpenseSheetLineTicketPreviewArgs) => {
  const [previewSourceUrl, setPreviewSourceUrl] = useState("");
  const [previewFileName, setPreviewFileName] = useState("");

  useEffect(() => {
    if (!hasLinkedTicket || !safeText(linkedTicketFileId)) {
      setPreviewSourceUrl("");
      setPreviewFileName("");
      return;
    }

    let cancelled = false;
    const controller = new AbortController();

    const loadTicketPreviewMetadata = async () => {
      setPreviewSourceUrl("");
      setPreviewFileName("");

      try {
        const response = await fetchExpenseSheetTicket(linkedTicketFileId, {
          suppressPermissionModal: true,
          signal: controller.signal,
        });

        if (cancelled) {
          return;
        }

        if (response?.Success === false) {
          return;
        }

        const metadata = resolveLinkedTicketPreviewMetadata(response?.Items || [], linkedTicketFileId);
        setPreviewSourceUrl(metadata.sourceUrl);
        setPreviewFileName(metadata.fileName);
      } catch (error) {
        if (cancelled || (error instanceof DOMException && error.name === "AbortError")) {
          return;
        }
      }
    };

    void loadTicketPreviewMetadata();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [hasLinkedTicket, linkedTicketFileId]);

  const showStickyPreview = useMemo(
    () => hasLinkedTicket && hasExpenseTicketImagePreviewSource(previewSourceUrl),
    [hasLinkedTicket, previewSourceUrl]
  );
  const previewAltText = useMemo(
    () => safeText(previewFileName) || indT("Tickets_Field_FileId", "Ticket"),
    [previewFileName]
  );
  const preview = useExpenseTicketImagePreview({
    fileId: linkedTicketFileId,
    sourceUrl: previewSourceUrl,
    enabled: showStickyPreview,
  });

  return {
    showStickyPreview,
    previewFileName,
    previewAltText,
    ...preview,
  };
};
