import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { optimizeTicketImageForUpload, type TicketImageOptimizationResult } from "./ticketImageOptimization.ts";

type QuickCreatePartialTicketState = {
  fileId: string;
  linkedToSheet: boolean;
  completedStage: string;
  urlFile: string;
  fileName: string;
  processedByAI: boolean | null;
};

type QuickTicketAttemptContext = {
  attemptId: string;
  source: TicketImageSource;
  startedAt: number;
  optimization: TicketImageOptimizationResult;
};

type QuickTicketProgressStage = {
  key: QuickFlowProgressKey;
  title: string;
  description: string;
  state: "completed" | "active" | "pending";
};

const QUICK_TICKET_FLOW_LOG_PREFIX = "[expense-quick-ticket]";
const QUICK_TICKET_VISUAL_STAGE_MS = {
  syncingFile: 1200,
  finalizingIa: 3600,
  linkingExpenseLine: 8500,
} as const;

const logQuickTicketInfo = (...args: unknown[]) => {
  if (typeof console !== "undefined" && typeof console.info === "function") {
    console.info(QUICK_TICKET_FLOW_LOG_PREFIX, ...args);
  }
};

const logQuickTicketWarn = (...args: unknown[]) => {
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(QUICK_TICKET_FLOW_LOG_PREFIX, ...args);
  }
};

const logQuickTicketError = (...args: unknown[]) => {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(QUICK_TICKET_FLOW_LOG_PREFIX, ...args);
  }
};

const formatFileSize = (size: number): string => {
  if (!(size > 0)) return "0 B";
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  if (size >= 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${size} B`;
};

const buildFileLogData = (file: File) => {
  return {
    name: safeText(file.name),
    type: safeText(file.type),
    sizeBytes: Number(file.size || 0),
    sizeText: formatFileSize(Number(file.size || 0)),
    lastModified: Number(file.lastModified || 0),
  };
};

const buildFallbackOptimizationResult = (file: File): TicketImageOptimizationResult => {
  return {
    file,
    changed: false,
    reason: "optimization-error",
    resized: false,
    reencoded: false,
    elapsedMs: 0,
    original: {
      name: safeText(file.name),
      type: safeText(file.type),
      size: Number(file.size || 0),
      width: null,
      height: null,
    },
    output: {
      name: safeText(file.name),
      type: safeText(file.type),
      size: Number(file.size || 0),
      width: null,
      height: null,
    },
  };
};

const buildOptimizationLogData = (result: TicketImageOptimizationResult) => {
  const savedBytes = Math.max(0, result.original.size - result.output.size);
  const savedRatio = result.original.size > 0 ? savedBytes / result.original.size : 0;

  return {
    changed: result.changed,
    reason: result.reason,
    resized: result.resized,
    reencoded: result.reencoded,
    elapsedMs: result.elapsedMs,
    original: {
      ...result.original,
      sizeText: formatFileSize(result.original.size),
    },
    output: {
      ...result.output,
      sizeText: formatFileSize(result.output.size),
    },
    savedBytes,
    savedText: formatFileSize(savedBytes),
    savedRatio: Number(savedRatio.toFixed(4)),
  };
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
  const [displayProgressKey, setDisplayProgressKey] = useState<QuickFlowProgressKey | null>(null);
  const [progressElapsedMs, setProgressElapsedMs] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [attemptId, setAttemptId] = useState("");
  const [traceList, setTraceList] = useState<TicketTraceEntry[]>([]);
  const [partialTicketFailure, setPartialTicketFailure] = useState<QuickCreatePartialTicketState | null>(null);
  const latestFileRef = useRef<{ cacheKey: string; file: File } | null>(null);
  const latestCreatedTicketRef = useRef<QuickCreatePartialTicketState | null>(null);
  const progressStartedAtRef = useRef<number | null>(null);

  const progressMessage = useMemo(() => {
    const effectiveProgressKey = displayProgressKey || progressKey;
    if (effectiveProgressKey === "uploadingImage") {
      return indT("ExpenseSheets_NewTicket_Status_UploadingImage", "Uploading image...");
    }
    if (effectiveProgressKey === "creatingTicket") {
      return indT("ExpenseSheets_NewTicket_Status_CreatingTicket", "Creating ticket...");
    }
    if (effectiveProgressKey === "syncingFile") {
      return indT("ExpenseSheets_NewTicket_Status_SyncingFile", "Syncing file...");
    }
    if (effectiveProgressKey === "finalizingIa") {
      return indT("ExpenseSheets_NewTicket_Status_Finalizing", "Finalizing IA...");
    }
    if (effectiveProgressKey === "linkingExpenseLine") {
      return indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line...");
    }
    if (effectiveProgressKey === "done") {
      return indT("ExpenseSheets_NewTicket_Status_Done", "Done");
    }
    return "";
  }, [displayProgressKey, progressKey]);

  useEffect(() => {
    if (!busy || progressStartedAtRef.current === null) return;

    const syncElapsed = () => {
      const startedAt = progressStartedAtRef.current;
      if (startedAt === null) return;
      setProgressElapsedMs(Math.max(0, Date.now() - startedAt));
    };

    syncElapsed();
    const intervalId = window.setInterval(syncElapsed, 250);
    return () => {
      window.clearInterval(intervalId);
    };
  }, [busy]);

  useEffect(() => {
    if (!busy) {
      if (progressKey !== null) {
        setDisplayProgressKey(progressKey);
      }
      return;
    }

    if (progressKey === null || progressKey === "uploadingImage" || progressKey === "done") {
      setDisplayProgressKey(progressKey);
      return;
    }

    setDisplayProgressKey(progressKey);
    if (progressKey !== "creatingTicket") {
      return;
    }

    const timers: number[] = [
      window.setTimeout(() => {
        setDisplayProgressKey("syncingFile");
      }, QUICK_TICKET_VISUAL_STAGE_MS.syncingFile),
      window.setTimeout(() => {
        setDisplayProgressKey("finalizingIa");
      }, QUICK_TICKET_VISUAL_STAGE_MS.finalizingIa),
    ];

    if (linkToSheet) {
      timers.push(
        window.setTimeout(() => {
          setDisplayProgressKey("linkingExpenseLine");
        }, QUICK_TICKET_VISUAL_STAGE_MS.linkingExpenseLine)
      );
    }

    return () => {
      timers.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [busy, linkToSheet, progressKey]);

  const progressStages = useMemo<QuickTicketProgressStage[]>(() => {
    const visibleStages: QuickFlowProgressKey[] = linkToSheet
      ? ["uploadingImage", "creatingTicket", "syncingFile", "finalizingIa", "linkingExpenseLine"]
      : ["uploadingImage", "creatingTicket", "syncingFile", "finalizingIa"];

    const stageCopy: Record<QuickFlowProgressKey, { title: string; description: string }> = {
      uploadingImage: {
        title: indT("ExpenseSheets_NewTicket_Progress_Prepare_Title", "Preparing image"),
        description: indT(
          "ExpenseSheets_NewTicket_Progress_Prepare_Body",
          "We validate the image and prepare it for a reliable upload."
        ),
      },
      creatingTicket: {
        title: indT("ExpenseSheets_NewTicket_Progress_Create_Title", "Creating ticket"),
        description: indT(
          "ExpenseSheets_NewTicket_Progress_Create_Body",
          "The backend reserves the ticket and starts the server-side flow."
        ),
      },
      syncingFile: {
        title: indT("ExpenseSheets_NewTicket_Progress_File_Title", "Syncing file"),
        description: indT(
          "ExpenseSheets_NewTicket_Progress_File_Body",
          "The uploaded image is being attached to the ticket record."
        ),
      },
      finalizingIa: {
        title: indT("ExpenseSheets_NewTicket_Progress_Ia_Title", "Reading ticket data"),
        description: indT(
          "ExpenseSheets_NewTicket_Progress_Ia_Body",
          "We are extracting date, amount and description from the image."
        ),
      },
      linkingExpenseLine: {
        title: indT("ExpenseSheets_NewTicket_Progress_Link_Title", "Linking expense line"),
        description: indT(
          "ExpenseSheets_NewTicket_Progress_Link_Body",
          "The generated ticket is being connected to the current expense sheet."
        ),
      },
      done: {
        title: indT("ExpenseSheets_NewTicket_Status_Done", "Done"),
        description: indT("ExpenseSheets_NewTicket_Status_Done", "Done"),
      },
    };

    const activeStageKey =
      progressKey === "done" ? visibleStages[visibleStages.length - 1] : displayProgressKey || progressKey;
    const activeStageIndex = activeStageKey ? visibleStages.indexOf(activeStageKey) : -1;

    return visibleStages.map((stageKey, index) => ({
      key: stageKey,
      title: stageCopy[stageKey].title,
      description: stageCopy[stageKey].description,
      state:
        progressKey === "done" || (activeStageIndex >= 0 && index < activeStageIndex)
          ? "completed"
          : index === activeStageIndex
            ? "active"
            : "pending",
    }));
  }, [displayProgressKey, linkToSheet, progressKey]);

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

  const completeFlowSuccess = useCallback(
    async (fileId: string, linkedToSheet: boolean, cacheKey: string) => {
      setProgressKey("done");
      setDisplayProgressKey("done");
      await removeCachedImageFile(cacheKey);
      setAttemptId("");
      latestCreatedTicketRef.current = null;
      setPartialTicketFailure(null);
      flashActionMark("okProcess", 1200);
      setBusy(false);
      setProgressKey(null);
      setDisplayProgressKey(null);
      progressStartedAtRef.current = null;
      setProgressElapsedMs(0);
      onCompleted?.({ fileId, linkedToSheet });
    },
    [onCompleted]
  );

  const runQuickCreateFlow = useCallback(
    async (file: File, cacheKey: string, context: QuickTicketAttemptContext): Promise<void> => {
      setBusy(true);
      setProgressKey("creatingTicket");
      clearFlowState();

      const requestStartedAt = Date.now();
      logQuickTicketInfo("quick-create.request.started", {
        attemptId: context.attemptId,
        source: context.source,
        linkToSheet,
        cacheKey,
        elapsedSinceSelectionMs: Math.max(0, requestStartedAt - context.startedAt),
        uploadFile: buildFileLogData(file),
        optimization: buildOptimizationLogData(context.optimization),
        sheetId: linkToSheet ? safeText(sheetId) : "",
        projectId: linkToSheet ? safeText(projectId) : "",
      });

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

        const responseElapsedMs = Math.max(0, Date.now() - requestStartedAt);

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

          await completeFlowSuccess(fileId, linkedToSheet, cacheKey);
          logQuickTicketInfo("quick-create.request.succeeded", {
            attemptId: context.attemptId,
            source: context.source,
            elapsedMs: responseElapsedMs,
            httpStatus: response.HttpStatus,
            traceId: safeText(response.TraceId),
            fileId,
            linkedToSheet,
            completedStage: safeText(response.Data?.CompletedStage),
            processedByAI: response.Data?.ProcessedByAI ?? null,
            stepTraceIds: response.Data?.StepTraceIds ?? null,
          });
          return;
        }

        if (partialState) {
          setPartialTicketFailure(partialState);
          logQuickTicketWarn("quick-create.partial-state", {
            attemptId: context.attemptId,
            source: context.source,
            elapsedMs: responseElapsedMs,
            fileId: partialState.fileId,
            linkedToSheet: partialState.linkedToSheet,
            completedStage: partialState.completedStage,
            processedByAI: partialState.processedByAI,
          });
        }

        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
        setDisplayProgressKey(null);
        progressStartedAtRef.current = null;
        setProgressElapsedMs(0);
        const resolvedMessage = resolveQuickCreateFailureMessage(response);
        logQuickTicketWarn("quick-create.request.completed-with-error", {
          attemptId: context.attemptId,
          source: context.source,
          elapsedMs: responseElapsedMs,
          httpStatus: response.HttpStatus,
          traceId: safeText(response.TraceId),
          fileId,
          linkedToSheet,
          completedStage: safeText(response.Data?.CompletedStage),
          processedByAI: response.Data?.ProcessedByAI ?? null,
          retryAfter: safeText(response.RetryAfter),
          message: safeText(response.Message),
          resolvedMessage,
          errors: Array.isArray(response.Errors) ? response.Errors : [],
          stepTraceIds: response.Data?.StepTraceIds ?? null,
        });
        setErrorMessage(resolvedMessage);
      } catch (error) {
        if (error instanceof ApiFetchError) {
          addTrace("ticket-quick-create-error", extractTraceIdFromError(error));
        }

        logQuickTicketError("quick-create.request.failed", {
          attemptId: context.attemptId,
          source: context.source,
          elapsedMs: Math.max(0, Date.now() - requestStartedAt),
          uploadFile: buildFileLogData(file),
          traceId: error instanceof ApiFetchError ? extractTraceIdFromError(error) : "",
          status: error instanceof ApiFetchError ? error.status : null,
          message: error instanceof Error ? safeText(error.message) : "",
          validationErrors: error instanceof ApiFetchError ? error.validationErrors : [],
        });
        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
        setDisplayProgressKey(null);
        progressStartedAtRef.current = null;
        setProgressElapsedMs(0);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [
      addQuickCreateResponseTraces,
      addTrace,
      buildApiOptions,
      clearFlowState,
      completeFlowSuccess,
      currencyCode,
      linkToSheet,
      projectId,
      resolveQuickCreateFailureMessage,
      resolveUiErrorMessage,
      sheetId,
    ]
  );

  const handleSelectedFile = useCallback(
    async (file: File | null, source: TicketImageSource): Promise<void> => {
      if (!file) return;

      const attemptId = resolveRandomKey();
      const selectionStartedAt = Date.now();
      setAttemptId(attemptId);
      logQuickTicketInfo("selection.received", {
        attemptId,
        source,
        linkToSheet,
        file: buildFileLogData(file),
      });

      if (!ensureQuickCreatePermission()) {
        logQuickTicketWarn("selection.forbidden", {
          attemptId,
          source,
          linkToSheet,
          canCreateExpense,
          isCreateMode,
          isSheetLocked,
          hasSheetId: !!safeText(sheetId),
        });
        return;
      }

      const safeType = safeText(file.type).toLowerCase();
      if (safeType && !safeType.startsWith("image/") && !/\.(jpe?g|png|webp)$/i.test(file.name || "")) {
        logQuickTicketWarn("selection.invalid-file-type", {
          attemptId,
          source,
          file: buildFileLogData(file),
          reason: "mime-and-extension-not-supported",
        });
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileType", "Unsupported image format."));
        return;
      }
      if (!isSupportedTicketImageFile(file)) {
        logQuickTicketWarn("selection.invalid-file-type", {
          attemptId,
          source,
          file: buildFileLogData(file),
          reason: "unsupported-ticket-image-file",
        });
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileType", "Unsupported image format."));
        return;
      }

      clearFlowState();
      setProgressKey("uploadingImage");
      setDisplayProgressKey("uploadingImage");
      progressStartedAtRef.current = selectionStartedAt;
      setProgressElapsedMs(0);
      logQuickTicketInfo("optimization.started", {
        attemptId,
        source,
        file: buildFileLogData(file),
      });

      const optimizationResult = await optimizeTicketImageForUpload(file).catch((error) => {
        logQuickTicketWarn("optimization.failed", {
          attemptId,
          source,
          file: buildFileLogData(file),
          message: error instanceof Error ? safeText(error.message) : "",
        });
        return buildFallbackOptimizationResult(file);
      });
      const uploadFile = optimizationResult.file;
      logQuickTicketInfo("optimization.completed", {
        attemptId,
        source,
        ...buildOptimizationLogData(optimizationResult),
      });

      if (uploadFile.size > MAX_TICKET_IMAGE_SIZE_BYTES) {
        logQuickTicketWarn("selection.rejected-by-size", {
          attemptId,
          source,
          maxSizeBytes: MAX_TICKET_IMAGE_SIZE_BYTES,
          maxSizeText: formatFileSize(MAX_TICKET_IMAGE_SIZE_BYTES),
          file: buildFileLogData(uploadFile),
          optimization: buildOptimizationLogData(optimizationResult),
        });
        setProgressKey(null);
        setDisplayProgressKey(null);
        progressStartedAtRef.current = null;
        setProgressElapsedMs(0);
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileSize", "Image exceeds 50MB max size."));
        return;
      }

      const cacheKey = attemptId;
      latestFileRef.current = { cacheKey, file: uploadFile };
      logQuickTicketInfo("cache.store.started", {
        attemptId,
        source,
        cacheKey,
        file: buildFileLogData(uploadFile),
      });
      void cacheImageFile(cacheKey, uploadFile)
        .then(() => {
          logQuickTicketInfo("cache.store.completed", {
            attemptId,
            source,
            cacheKey,
            file: buildFileLogData(uploadFile),
          });
        })
        .catch((error) => {
          logQuickTicketWarn("cache.store.failed", {
            attemptId,
            source,
            cacheKey,
            file: buildFileLogData(uploadFile),
            message: error instanceof Error ? safeText(error.message) : "",
          });
        });

      await runQuickCreateFlow(uploadFile, cacheKey, {
        attemptId,
        source,
        startedAt: selectionStartedAt,
        optimization: optimizationResult,
      });
    },
    [canCreateExpense, clearFlowState, ensureQuickCreatePermission, isCreateMode, isSheetLocked, linkToSheet, runQuickCreateFlow, sheetId]
  );

  const retryPendingUpload = useCallback(async () => {
    return;
  }, []);

  const openCreatedTicket = useCallback(() => {
    const createdTicket = partialTicketFailure || latestCreatedTicketRef.current;
    const fileId = safeText(createdTicket?.fileId);
    if (!fileId) return;

    clearCachedCurrentImage();
    setAttemptId("");
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

  const selectFromCamera = useCallback((inputElement: HTMLInputElement | null) => {
    if (!inputElement) return;
    // Safari/iPhone expects the capture picker to open from the active user gesture.
    // Pre-requesting camera access with getUserMedia() introduces an async boundary and
    // can leave iOS showing an active camera session without a visible preview.
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);

  const selectFromGallery = useCallback((inputElement: HTMLInputElement | null) => {
    if (!inputElement) return;
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);

  const clearError = useCallback(() => {
    clearCachedCurrentImage();
    latestCreatedTicketRef.current = null;
    setAttemptId("");
    setErrorMessage("");
    setPartialTicketFailure(null);
    setDisplayProgressKey(null);
    progressStartedAtRef.current = null;
    setProgressElapsedMs(0);
  }, [clearCachedCurrentImage]);

  return {
    sourcePickerOpen,
    busy,
    progressKey,
    progressMessage,
    progressStages,
    progressElapsedMs,
    errorMessage,
    attemptId,
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
