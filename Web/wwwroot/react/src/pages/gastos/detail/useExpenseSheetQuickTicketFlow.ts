import { useCallback, useMemo, useRef, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { flashActionMark } from "../../../utils/visitasHistory.ts";
import type { ExpenseSheetTicketQuickCreateResult } from "../expenseTypes.ts";
import { createExpenseSheetTicketQuick } from "../utils/expenseApi.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import {
  MAX_TICKET_IMAGE_SIZE_BYTES,
  cacheImageFile,
  extractTraceIdFromError,
  isSupportedTicketImageFile,
  persistTraceList,
  removeCachedImageFile,
  resolveRandomKey,
  type QuickFlowProgressKey,
  type TicketImageSource,
  type TicketTraceEntry,
  type UseExpenseSheetQuickTicketFlowArgs,
} from "./useExpenseSheetQuickTicketFlowCore.ts";

type QuickCreatePartialTicketState = {
  fileId: string;
  linkedToSheet: boolean;
  completedStage: string;
  urlFile: string;
  fileName: string;
  processedByAI: boolean | null;
};

const formatValidationErrors = (
  errors: Array<{ Field?: unknown; Message?: unknown } | null | undefined> | null | undefined
): string => {
  if (!Array.isArray(errors) || errors.length === 0) return "";

  return errors
    .map((entry) => {
      const field = safeText(entry?.Field);
      const message = safeText(entry?.Message);
      if (field && message) return `${field}: ${message}`;
      return message || field;
    })
    .filter(Boolean)
    .join(" | ");
};

export const useExpenseSheetQuickTicketFlow = ({
  sheetId = "",
  projectId = "",
  currencyCode = "",
  axUserIdOverride = "",
  canCreateExpense,
  isCreateMode,
  isSheetLocked,
  linkToSheet = true,
  onForbidden,
  onCompleted,
}: UseExpenseSheetQuickTicketFlowArgs) => {
  const [sourcePickerOpen, setSourcePickerOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progressKey, setProgressKey] = useState<QuickFlowProgressKey | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [traceList, setTraceList] = useState<TicketTraceEntry[]>([]);
  const [partialTicketFailure, setPartialTicketFailure] = useState<QuickCreatePartialTicketState | null>(null);
  const latestFileRef = useRef<{ cacheKey: string; file: File } | null>(null);
  const latestCreatedTicketRef = useRef<QuickCreatePartialTicketState | null>(null);

  const progressMessage = useMemo(() => {
    if (progressKey === "uploadingImage") {
      return indT("ExpenseSheets_NewTicket_Status_UploadingImage", "Uploading image...");
    }
    if (progressKey === "creatingTicket") {
      return indT("ExpenseSheets_NewTicket_Status_CreatingTicket", "Creating ticket...");
    }
    if (progressKey === "syncingFile") {
      return indT("ExpenseSheets_NewTicket_Status_SyncingFile", "Syncing file...");
    }
    if (progressKey === "finalizingIa") {
      return indT("ExpenseSheets_NewTicket_Status_Finalizing", "Finalizing IA...");
    }
    if (progressKey === "linkingExpenseLine") {
      return indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line...");
    }
    if (progressKey === "done") {
      return indT("ExpenseSheets_NewTicket_Status_Done", "Done");
    }
    return "";
  }, [progressKey]);

  const addTrace = useCallback((step: string, traceId: string) => {
    const safeTraceId = safeText(traceId);
    if (!safeTraceId) return;

    setTraceList((previous) => {
      const next = [
        ...previous,
        {
          step,
          traceId: safeTraceId,
          at: new Date().toISOString(),
        },
      ];
      persistTraceList(next);
      return next;
    });
  }, []);

  const clearCachedCurrentImage = useCallback(() => {
    const cacheKey = latestFileRef.current?.cacheKey;
    if (!cacheKey) return;
    void removeCachedImageFile(cacheKey).catch(() => {
      // Ignore cache cleanup failures in restricted browser contexts.
    });
  }, []);

  const clearFlowState = useCallback(() => {
    latestCreatedTicketRef.current = null;
    setErrorMessage("");
    setPartialTicketFailure(null);
    setTraceList([]);
    persistTraceList([]);
  }, []);

  // Forces mutations to follow the page-resolved AX user instead of any stale global override.
  const buildApiOptions = useCallback(() => {
    const safeAxUserId = safeText(axUserIdOverride);
    if (!safeAxUserId) {
      return {
        suppressPermissionModal: true,
      };
    }

    return {
      suppressPermissionModal: true,
      headers: {
        "X-IND-AxUserId": safeAxUserId,
      },
    };
  }, [axUserIdOverride]);

  const ensureQuickCreatePermission = useCallback((): boolean => {
    if (!canCreateExpense || isCreateMode || isSheetLocked || (linkToSheet && !sheetId)) {
      onForbidden();
      return false;
    }
    return true;
  }, [canCreateExpense, isCreateMode, isSheetLocked, linkToSheet, onForbidden, sheetId]);

  const resolveUiErrorMessage = useCallback((error: unknown): string => {
    if (error instanceof ApiFetchError) {
      const validationText = formatValidationErrors(error.validationErrors);
      if (validationText) {
        return validationText;
      }

      if (error.status === 429) {
        return safeText(error.message) || indT("ExpenseSheets_NewTicket_Error_RateLimit", "Too many requests.");
      }
      if (error.status === 404) {
        return indT("ExpenseSheets_NewTicket_Error_NotFound", "Record not found.");
      }
      if (error.status === 500) {
        return indT("ExpenseSheets_NewTicket_Error_Server", "Server error.");
      }
    }

    return error instanceof Error && safeText(error.message)
      ? safeText(error.message)
      : indT("Api_RequestFailed", "Request failed.");
  }, []);

  const addQuickCreateResponseTraces = useCallback(
    (response: ExpenseSheetTicketQuickCreateResult) => {
      addTrace("ticket-quick-create", safeText(response.TraceId));

      const stepTraceIds = response.Data?.StepTraceIds;
      addTrace("ticket-create", safeText(stepTraceIds?.TicketCreate));
      addTrace("ticket-file-upload", safeText(stepTraceIds?.FileUpload));
      addTrace("expensefromticket", safeText(stepTraceIds?.DraftExtract));
      addTrace("ticket-finalize", safeText(stepTraceIds?.TicketFinalize));
      addTrace("expense-sheet-link", safeText(stepTraceIds?.SheetLink));
    },
    [addTrace]
  );

  const resolveQuickCreateFailureMessage = useCallback((response: ExpenseSheetTicketQuickCreateResult): string => {
    const data = response.Data;
    const fileId = safeText(data?.FileId);
    const completedStage = safeText(data?.CompletedStage);
    const responseMessage = safeText(response.Message);
    const validationText = formatValidationErrors(response.Errors);
    const retryAfter = safeText(response.RetryAfter);
    const messageParts: string[] = [];

    if (response.HttpStatus === 429) {
      messageParts.push(responseMessage || indT("ExpenseSheets_NewTicket_Error_RateLimit", "Too many requests."));
      if (retryAfter) {
        messageParts.push(
          indFormat("ExpenseSheets_NewTicket_Error_RetryAfterHint", "Retry after {0}.", retryAfter)
        );
      }
    } else if (validationText) {
      messageParts.push(validationText);
    } else if (responseMessage) {
      messageParts.push(responseMessage);
    } else if (fileId) {
      messageParts.push(
        indT(
          "ExpenseSheets_NewTicket_Error_Partial",
          "The ticket was created, but the full process did not finish."
        )
      );
    } else if (response.HttpStatus === 404) {
      messageParts.push(indT("ExpenseSheets_NewTicket_Error_NotFound", "Record not found."));
    } else if (response.HttpStatus === 500) {
      messageParts.push(indT("ExpenseSheets_NewTicket_Error_Server", "Server error."));
    } else {
      messageParts.push(indT("Api_RequestFailed", "Request failed."));
    }

    if (fileId && completedStage) {
      messageParts.push(indFormat("ExpenseSheets_NewTicket_Error_Stage", "Completed stage: {0}.", completedStage));
    }

    return messageParts.filter(Boolean).join(" ");
  }, []);

  const runQuickCreateFlow = useCallback(
    async (file: File, cacheKey: string): Promise<void> => {
      setBusy(true);
      setProgressKey("creatingTicket");
      clearFlowState();

      try {
        const response = await createExpenseSheetTicketQuick(
          {
            ticketImage: file,
            currencyCode: safeText(currencyCode).toUpperCase() || undefined,
            existingHojaGastosId: linkToSheet ? safeText(sheetId) || undefined : undefined,
            projectId: linkToSheet ? safeText(projectId) || undefined : undefined,
          },
          buildApiOptions()
        );

        addQuickCreateResponseTraces(response);

        const fileId = safeText(response.Data?.FileId);
        const linkedToSheet = response.Data?.LinkedToSheet === true;
        const partialState =
          fileId
            ? {
                fileId,
                linkedToSheet,
                completedStage: safeText(response.Data?.CompletedStage),
                urlFile: safeText(response.Data?.UrlFile),
                fileName: safeText(response.Data?.FileName),
                processedByAI: response.Data?.ProcessedByAI ?? null,
              }
            : null;

        if (partialState) {
          latestCreatedTicketRef.current = partialState;
        }

        if (response.Success === true) {
          if (!fileId) {
            throw new Error(indT("ExpenseSheets_NewTicket_Error_NoFileId", "Could not resolve ticket file id."));
          }

          setProgressKey("done");
          await removeCachedImageFile(cacheKey);
          flashActionMark("okProcess", 1200);
          setBusy(false);
          setProgressKey(null);
          onCompleted?.({ fileId, linkedToSheet });
          return;
        }

        if (partialState) {
          setPartialTicketFailure(partialState);
        }

        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveQuickCreateFailureMessage(response));
      } catch (error) {
        if (error instanceof ApiFetchError) {
          addTrace("ticket-quick-create-error", extractTraceIdFromError(error));
        }

        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [
      addQuickCreateResponseTraces,
      addTrace,
      buildApiOptions,
      clearFlowState,
      currencyCode,
      linkToSheet,
      onCompleted,
      projectId,
      resolveQuickCreateFailureMessage,
      resolveUiErrorMessage,
      sheetId,
    ]
  );

  const handleSelectedFile = useCallback(
    async (file: File | null, _source: TicketImageSource): Promise<void> => {
      if (!file) return;
      if (!ensureQuickCreatePermission()) return;

      const safeType = safeText(file.type).toLowerCase();
      if (safeType && !safeType.startsWith("image/") && !/\.(jpe?g|png|webp)$/i.test(file.name || "")) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileType", "Unsupported image format."));
        return;
      }
      if (!isSupportedTicketImageFile(file)) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileType", "Unsupported image format."));
        return;
      }
      if (file.size > MAX_TICKET_IMAGE_SIZE_BYTES) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileSize", "Image exceeds 50MB max size."));
        return;
      }

      const cacheKey = resolveRandomKey();
      latestFileRef.current = { cacheKey, file };
      void cacheImageFile(cacheKey, file).catch(() => {
        // Do not block flow if browser cache storage is unavailable.
      });

      await runQuickCreateFlow(file, cacheKey);
    },
    [ensureQuickCreatePermission, runQuickCreateFlow]
  );

  const retryPendingUpload = useCallback(async () => {
    return;
  }, []);

  const openCreatedTicket = useCallback(() => {
    const createdTicket = partialTicketFailure || latestCreatedTicketRef.current;
    const fileId = safeText(createdTicket?.fileId);
    if (!fileId) return;

    clearCachedCurrentImage();
    setErrorMessage("");
    setPartialTicketFailure(null);
    onCompleted?.({ fileId, linkedToSheet: createdTicket?.linkedToSheet === true });
  }, [clearCachedCurrentImage, onCompleted, partialTicketFailure]);

  const openSourcePicker = useCallback(() => {
    if (!ensureQuickCreatePermission()) return;
    setErrorMessage("");
    setPartialTicketFailure(null);
    setSourcePickerOpen(true);
  }, [ensureQuickCreatePermission]);

  const closeSourcePicker = useCallback(() => {
    if (busy) return;
    setSourcePickerOpen(false);
  }, [busy]);

  const requestCameraPermission = useCallback(async (): Promise<boolean | null> => {
    if (typeof navigator === "undefined") return null;
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices || typeof mediaDevices.getUserMedia !== "function") return null;

    try {
      const stream = await mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch {
      return false;
    }
  }, []);

  const selectFromCamera = useCallback(
    async (inputElement: HTMLInputElement | null) => {
      if (!inputElement) return;
      const granted = await requestCameraPermission();
      if (granted === false) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_CameraPermission", "Camera permission is required."));
        return;
      }
      setSourcePickerOpen(false);
      inputElement.click();
    },
    [requestCameraPermission]
  );

  const selectFromGallery = useCallback((inputElement: HTMLInputElement | null) => {
    if (!inputElement) return;
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);

  const clearError = useCallback(() => {
    clearCachedCurrentImage();
    latestCreatedTicketRef.current = null;
    setErrorMessage("");
    setPartialTicketFailure(null);
  }, [clearCachedCurrentImage]);

  return {
    sourcePickerOpen,
    busy,
    progressKey,
    progressMessage,
    errorMessage,
    hasPendingUploadRetry: false,
    hasPartialTicketFailure: partialTicketFailure !== null,
    traceList,
    openSourcePicker,
    closeSourcePicker,
    selectFromCamera,
    selectFromGallery,
    handleSelectedFile,
    retryPendingUpload,
    openCreatedTicket,
    clearError,
  };
};
