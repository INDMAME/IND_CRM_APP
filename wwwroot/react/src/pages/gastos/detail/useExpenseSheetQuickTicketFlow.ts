import { useCallback, useMemo, useRef, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import { flashActionMark } from "../../../utils/visitasHistory.ts";
import type { ExpenseSheetDraftResponse, ExpenseSheetTicketCreateRequest } from "../expenseTypes.ts";
import {
  applyExpenseSheetTicketIa,
  createExpenseSheet,
  createExpenseSheetTicket,
  extractExpenseFromTicketDraft,
  uploadExpenseSheetTicketFile,
} from "../utils/expenseApi.ts";
import { safeText } from "../utils/expenseUiUtils.ts";
import {
  DEFAULT_CREATE_MODE,
  MAX_TICKET_IMAGE_SIZE_BYTES,
  buildSheetLinePayload,
  buildTicketIaPayload,
  cacheImageFile,
  extractTraceIdFromError,
  getTodayYyyyMMdd,
  inferExtension,
  isSupportedTicketImageFile,
  normalizeDraftFromIaResponse,
  persistTraceList,
  readCachedImageFile,
  removeCachedImageFile,
  resolveRandomKey,
  resolveTicketFileIdFromDraftResponse,
  resolveUploadResult,
  sanitizeFileName,
  type NormalizedDraft,
  type PendingUploadRetry,
  type QuickFlowProgressKey,
  type TicketImageSource,
  type TicketTraceEntry,
  type UploadSyncResult,
  type UseExpenseSheetQuickTicketFlowArgs,
} from "./useExpenseSheetQuickTicketFlowCore.ts";

export const useExpenseSheetQuickTicketFlow = ({
  sheetId = "",
  projectId = "",
  currencyCode = "",
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
  const [pendingUploadRetry, setPendingUploadRetry] = useState<PendingUploadRetry | null>(null);
  const [traceList, setTraceList] = useState<TicketTraceEntry[]>([]);
  const latestFileRef = useRef<{ cacheKey: string; file: File } | null>(null);

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

  const clearFlowState = useCallback(() => {
    setErrorMessage("");
    setPendingUploadRetry(null);
    setTraceList([]);
    persistTraceList([]);
  }, []);

  const ensureQuickCreatePermission = useCallback((): boolean => {
    if (!canCreateExpense || isCreateMode || isSheetLocked || (linkToSheet && !sheetId)) {
      onForbidden();
      return false;
    }
    return true;
  }, [canCreateExpense, isCreateMode, isSheetLocked, linkToSheet, onForbidden, sheetId]);

  const resolveUiErrorMessage = useCallback(
    (error: unknown): string => {
      if (error instanceof ApiFetchError) {
        if (error.status === 422) {
          const validationText = Array.isArray(error.validationErrors)
            ? error.validationErrors
                .map((entry) => {
                  const field = safeText(entry?.Field);
                  const message = safeText(entry?.Message);
                  if (field && message) return `${field}: ${message}`;
                  return message || field;
                })
                .filter((entry) => entry)
                .join(" | ")
            : "";
          return validationText || indT("ExpenseSheets_NewTicket_Error_Validation", "Validation error.");
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
    },
    []
  );

  const applyIaAndFinalize = useCallback(
    async (fileId: string, draft: NormalizedDraft, uploadResult: UploadSyncResult) => {
      setProgressKey("finalizingIa");
      const iaPayload = buildTicketIaPayload(draft, uploadResult);
      const iaResponse = await applyExpenseSheetTicketIa(fileId, iaPayload, {
        suppressPermissionModal: true,
      });
      addTrace("ticket-ia", safeText((iaResponse as { TraceId?: unknown })?.TraceId));
      if (iaResponse.Success !== true) {
        throw new Error(safeText(iaResponse.Message) || indT("Api_RequestFailed", "Request failed."));
      }

      if (!linkToSheet) return;

      const linePayload = buildSheetLinePayload(draft, fileId, projectId);
      if (!linePayload) return;

      setProgressKey("linkingExpenseLine");
      const createResponse = await createExpenseSheet(
        {
          mode: 2,
          existingHojaGastosId: sheetId,
          lines: [linePayload],
        },
        {
          suppressPermissionModal: true,
        }
      );
      addTrace("expense-sheet-append-line", safeText((createResponse as { TraceId?: unknown })?.TraceId));
      if (createResponse.Success !== true) {
        throw new Error(safeText(createResponse.Message) || indT("Api_RequestFailed", "Request failed."));
      }
    },
    [addTrace, linkToSheet, projectId, sheetId]
  );

  const resumeFromUploadStep = useCallback(
    async (pendingState: PendingUploadRetry, file: File): Promise<void> => {
      setBusy(true);
      setErrorMessage("");
      setProgressKey("syncingFile");

      try {
        const uploadResponse = await uploadExpenseSheetTicketFile(
          pendingState.fileId,
          file,
          pendingState.extension,
          {
            suppressPermissionModal: true,
          }
        );
        addTrace("ticket-file-upload", safeText((uploadResponse as { TraceId?: unknown })?.TraceId));
        if (uploadResponse.Success !== true) {
          throw new Error(safeText(uploadResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }

        const uploadResult = resolveUploadResult(uploadResponse.Data);
        let draft: NormalizedDraft;
        if (pendingState.strategy === "ia-ready") {
          draft = pendingState.draft;
        } else {
          setProgressKey("uploadingImage");
          const iaDraftResponse = await extractExpenseFromTicketDraft(file, false, uploadResult.urlFile || undefined, {
            suppressPermissionModal: true,
          });
          addTrace("expensefromticket", safeText((iaDraftResponse as { TraceId?: unknown })?.TraceId));
          if (iaDraftResponse.Success !== true) {
            throw new Error(safeText(iaDraftResponse.Message) || indT("Api_RequestFailed", "Request failed."));
          }
          draft = normalizeDraftFromIaResponse(iaDraftResponse.Data as ExpenseSheetDraftResponse);
        }

        await applyIaAndFinalize(pendingState.fileId, draft, uploadResult);

        setProgressKey("done");
        setPendingUploadRetry(null);
        await removeCachedImageFile(pendingState.cacheKey);
        setTimeout(() => {
          flashActionMark("okProcess", 1200);
          setBusy(false);
          setProgressKey(null);
          onCompleted?.({ fileId: pendingState.fileId, linkedToSheet: linkToSheet });
        }, 320);
      } catch (error) {
        if (error instanceof ApiFetchError) {
          const traceId = extractTraceIdFromError(error);
          addTrace("ticket-retry-error", traceId);
        }
        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [addTrace, applyIaAndFinalize, linkToSheet, onCompleted, resolveUiErrorMessage]
  );

  const runIaCreateFlow = useCallback(
    async (file: File, extension: string, cacheKey: string): Promise<void> => {
      setBusy(true);
      setProgressKey("uploadingImage");
      clearFlowState();

      try {
        setProgressKey("creatingTicket");
        const draftResponse = await extractExpenseFromTicketDraft(file, true, undefined, {
          suppressPermissionModal: true,
        });
        addTrace("expensefromticket", safeText((draftResponse as { TraceId?: unknown })?.TraceId));
        if (draftResponse.Success !== true) {
          throw new Error(safeText(draftResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }

        const draft = normalizeDraftFromIaResponse(draftResponse.Data as ExpenseSheetDraftResponse);
        const fileId = resolveTicketFileIdFromDraftResponse(draftResponse.Data);
        if (!fileId) {
          throw new Error(indT("ExpenseSheets_NewTicket_Error_NoFileId", "Could not resolve ticket file id."));
        }

        try {
          setProgressKey("syncingFile");
          const uploadResponse = await uploadExpenseSheetTicketFile(fileId, file, extension, {
            suppressPermissionModal: true,
          });
          addTrace("ticket-file-upload", safeText((uploadResponse as { TraceId?: unknown })?.TraceId));
          if (uploadResponse.Success !== true) {
            throw new Error(safeText(uploadResponse.Message) || indT("Api_RequestFailed", "Request failed."));
          }

          const uploadResult = resolveUploadResult(uploadResponse.Data);
          await applyIaAndFinalize(fileId, draft, uploadResult);

          setProgressKey("done");
          await removeCachedImageFile(cacheKey);
          setTimeout(() => {
            flashActionMark("okProcess", 1200);
            setBusy(false);
            setProgressKey(null);
            onCompleted?.({ fileId, linkedToSheet: linkToSheet });
          }, 320);
        } catch (uploadError) {
          if (uploadError instanceof ApiFetchError) {
            const traceId = extractTraceIdFromError(uploadError);
            addTrace("ticket-file-upload-error", traceId);
          }
          setPendingUploadRetry({
            strategy: "ia-ready",
            fileId,
            extension,
            cacheKey,
            draft,
            fileNameHint: sanitizeFileName(file.name),
          });
          throw new Error(
            indT(
              "ExpenseSheets_NewTicket_Error_UploadRetry",
              "Ticket created, but file sync failed. Retry upload to complete process."
            )
          );
        }
      } catch (error) {
        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [addTrace, applyIaAndFinalize, clearFlowState, linkToSheet, onCompleted, resolveUiErrorMessage]
  );

  const runManualCreateFlow = useCallback(
    async (file: File, extension: string, cacheKey: string): Promise<void> => {
      setBusy(true);
      setProgressKey("creatingTicket");
      clearFlowState();
      let createdFileId = "";
      let stage: "creatingTicket" | "syncingFile" | "uploadingImage" | "finalizingIa" = "creatingTicket";

      try {
        const today = getTodayYyyyMMdd();
        const placeholderUrl = `pending://ticket-upload/${resolveRandomKey()}`;
        const createPayload: ExpenseSheetTicketCreateRequest = {
          mode: 1,
          description: sanitizeFileName(file.name).replace(/\.[a-z0-9]+$/i, "") || "Ticket",
          currencyCode: safeText(currencyCode).toUpperCase() || "EUR",
          transDate: today,
          comentario: "",
          urlFile: placeholderUrl,
          fileExtension: extension,
        };
        const createResponse = await createExpenseSheetTicket(createPayload, {
          suppressPermissionModal: true,
        });
        addTrace("ticket-create-manual", safeText((createResponse as { TraceId?: unknown })?.TraceId));
        if (createResponse.Success !== true) {
          throw new Error(safeText(createResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }

        const createData = (createResponse as { Data?: { FileId?: unknown; fileId?: unknown } }).Data;
        const fileId = safeText(createData?.FileId ?? createData?.fileId);
        if (!fileId) {
          throw new Error(indT("ExpenseSheets_NewTicket_Error_NoFileId", "Could not resolve ticket file id."));
        }
        createdFileId = fileId;

        stage = "syncingFile";
        setProgressKey("syncingFile");
        const uploadResponse = await uploadExpenseSheetTicketFile(fileId, file, extension, {
          suppressPermissionModal: true,
        });
        addTrace("ticket-file-upload", safeText((uploadResponse as { TraceId?: unknown })?.TraceId));
        if (uploadResponse.Success !== true) {
          throw new Error(safeText(uploadResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const uploadResult = resolveUploadResult(uploadResponse.Data);

        stage = "uploadingImage";
        setProgressKey("uploadingImage");
        const iaDraftResponse = await extractExpenseFromTicketDraft(file, false, uploadResult.urlFile || undefined, {
          suppressPermissionModal: true,
        });
        addTrace("expensefromticket", safeText((iaDraftResponse as { TraceId?: unknown })?.TraceId));
        if (iaDraftResponse.Success !== true) {
          throw new Error(safeText(iaDraftResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const draft = normalizeDraftFromIaResponse(iaDraftResponse.Data as ExpenseSheetDraftResponse);
        stage = "finalizingIa";
        await applyIaAndFinalize(fileId, draft, uploadResult);

        setProgressKey("done");
        await removeCachedImageFile(cacheKey);
        setTimeout(() => {
          flashActionMark("okProcess", 1200);
          setBusy(false);
          setProgressKey(null);
          onCompleted?.({ fileId, linkedToSheet: linkToSheet });
        }, 320);
      } catch (error) {
        if (error instanceof ApiFetchError) {
          const traceId = extractTraceIdFromError(error);
          addTrace("ticket-manual-error", traceId);
        }

        if (stage === "syncingFile" && createdFileId) {
          setPendingUploadRetry({
            strategy: "manual-post-upload-draft",
            fileId: createdFileId,
            extension,
            cacheKey,
            fileNameHint: sanitizeFileName(file.name),
          });
        }
        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [addTrace, applyIaAndFinalize, clearFlowState, currencyCode, linkToSheet, onCompleted, resolveUiErrorMessage]
  );

  const handleSelectedFile = useCallback(
    async (file: File | null, _source: TicketImageSource): Promise<void> => {
      if (!file) return;
      if (!ensureQuickCreatePermission()) return;

      const safeType = safeText(file.type).toLowerCase();
      if (safeType && !safeType.startsWith("image/")) {
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

      const extension = inferExtension(file);
      const cacheKey = resolveRandomKey();
      latestFileRef.current = { cacheKey, file };

      try {
        await cacheImageFile(cacheKey, file);
      } catch {
        // Do not block flow if browser cache storage is unavailable.
      }

      if (DEFAULT_CREATE_MODE === "manual") {
        await runManualCreateFlow(file, extension, cacheKey);
      } else {
        await runIaCreateFlow(file, extension, cacheKey);
      }
    },
    [ensureQuickCreatePermission, runIaCreateFlow, runManualCreateFlow]
  );

  const retryPendingUpload = useCallback(async () => {
    if (!pendingUploadRetry) return;
    if (!ensureQuickCreatePermission()) return;

    let selectedFile = latestFileRef.current?.cacheKey === pendingUploadRetry.cacheKey ? latestFileRef.current.file : null;
    if (!selectedFile) {
      const blob = await readCachedImageFile(pendingUploadRetry.cacheKey);
      if (!blob) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_RetryFileMissing", "Cached image is no longer available."));
        return;
      }
      selectedFile = new File([blob], pendingUploadRetry.fileNameHint || "ticket-image", {
        type: safeText(blob.type) || "image/jpeg",
      });
      latestFileRef.current = { cacheKey: pendingUploadRetry.cacheKey, file: selectedFile };
    }

    await resumeFromUploadStep(pendingUploadRetry, selectedFile);
  }, [ensureQuickCreatePermission, pendingUploadRetry, resumeFromUploadStep]);

  const openSourcePicker = useCallback(() => {
    if (!ensureQuickCreatePermission()) return;
    setErrorMessage("");
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
    setErrorMessage("");
  }, []);

  return {
    sourcePickerOpen,
    busy,
    progressKey,
    progressMessage,
    errorMessage,
    hasPendingUploadRetry: pendingUploadRetry !== null,
    traceList,
    openSourcePicker,
    closeSourcePicker,
    selectFromCamera,
    selectFromGallery,
    handleSelectedFile,
    retryPendingUpload,
    clearError,
  };
};
