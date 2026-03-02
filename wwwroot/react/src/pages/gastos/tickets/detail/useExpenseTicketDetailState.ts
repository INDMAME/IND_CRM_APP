import { useEffect, useState } from "react";
import { ApiFetchError } from "../../../../services/apiService.ts";
import { indT } from "../../../../utils/indI18n.ts";
import { fetchExpenseSheetTicket } from "../../utils/expenseApi.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";
import type { ExpenseTicketDetailHeader, ExpenseTicketDetailLine } from "./expenseTicketDetailTypes.ts";
import { mapExpenseTicketDetailHeader, mapExpenseTicketDetailLine } from "./expenseTicketDetailTypes.ts";

type UseExpenseTicketDetailStateArgs = {
  hasAccess: boolean;
  fileId: string;
  onForbidden: () => void;
};

// Owns read state and API loading behavior for the ticket detail page.
export const useExpenseTicketDetailState = ({ hasAccess, fileId, onForbidden }: UseExpenseTicketDetailStateArgs) => {
  const [header, setHeader] = useState<ExpenseTicketDetailHeader | null>(null);
  const [lines, setLines] = useState<ExpenseTicketDetailLine[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDetail = async () => {
      if (!hasAccess) {
        onForbidden();
        return;
      }

      const safeFileId = safeText(fileId);
      if (!safeFileId) {
        setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
        setHeader(null);
        setLines([]);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response = await fetchExpenseSheetTicket(safeFileId, {
          suppressPermissionModal: true,
        });

        if (response?.Success === false) {
          setErrorMessage(response?.Message || indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
          setHeader(null);
          setLines([]);
          return;
        }

        const items = Array.isArray(response?.Items) ? response.Items : [];
        const selected =
          items.find((entry) => safeText(entry?.FileId).toUpperCase() === safeFileId.toUpperCase()) || items[0] || null;

        if (!selected) {
          setErrorMessage(indT("Tickets_Detail_NotFound", "Ticket was not found."));
          setHeader(null);
          setLines([]);
          return;
        }

        const mappedHeader = mapExpenseTicketDetailHeader(selected);
        const mappedLines = (Array.isArray(selected.Lines) ? selected.Lines : []).map((line) =>
          mapExpenseTicketDetailLine(line)
        );
        setHeader(mappedHeader);
        setLines(mappedLines);
      } catch (error) {
        if (error instanceof ApiFetchError && error.status === 403) {
          onForbidden();
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : indT("Tickets_Detail_LoadError", "Could not load ticket detail."));
        setHeader(null);
        setLines([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadDetail();
  }, [fileId, hasAccess, onForbidden]);

  return {
    header,
    lines,
    isLoading,
    errorMessage,
  };
};
