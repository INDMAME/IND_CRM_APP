import { useCallback, useMemo, useRef, useState } from "react";
import { ApiFetchError } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import type {
  ExpenseGastoTypeCode,
  ExpenseSheetCreateLineRequest,
  ExpenseSheetDraftResponse,
  ExpenseSheetTicketCreateRequest,
  ExpenseSheetTicketIaRequest,
} from "../expenseTypes.ts";
import {
  applyExpenseSheetTicketIa,
  createExpenseSheet,
  createExpenseSheetTicket,
  extractExpenseFromTicketDraft,
  uploadExpenseSheetTicketFile,
} from "../utils/expenseApi.ts";
import { safeText } from "../utils/expenseUiUtils.ts";

const TICKET_IMAGE_CACHE_NAME = "ind-expense-ticket-image-v1";
const TICKET_IMAGE_CACHE_PREFIX = "/__ind_cache__/ticket-image/";
const TICKET_TRACE_STORAGE_KEY = "expense_sheet_ticket_quick_flow_trace_v1";
const MAX_TICKET_IMAGE_SIZE_BYTES = 50 * 1024 * 1024;
const ALLOWED_TICKET_GASTO_TYPES = new Set<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
const DEFAULT_TICKET_GASTO_TYPE = 8;
const DEFAULT_CREATE_MODE = "ia" as "ia" | "manual";

type TicketImageSource = "camera" | "gallery";

type TicketTraceEntry = {
  step: string;
  traceId: string;
  at: string;
};

type NormalizedDraftLine = {
  transDate: string;
  typeValue: number;
  description: string;
  qty: number;
  price: number;
  totalAmount: number;
};

type NormalizedDraft = {
  description: string;
  currencyCode: string;
  totalAmount: number;
  transDate: string;
  comentario: string;
  gastoType: number | null;
  lines: NormalizedDraftLine[];
};

type PendingUploadRetry = {
  fileId: string;
  extension: string;
  cacheKey: string;
  draft: NormalizedDraft;
  fileNameHint: string;
};

type UploadSyncResult = {
  urlFile: string;
  fileName: string;
};

type UseExpenseSheetQuickTicketFlowArgs = {
  sheetId: string;
  projectId: string;
  currencyCode: string;
  canCreateExpense: boolean;
  isCreateMode: boolean;
  isSheetLocked: boolean;
  onForbidden: () => void;
  onCompleted?: () => void;
};

type QuickFlowProgressKey =
  | "uploadingImage"
  | "creatingTicket"
  | "syncingFile"
  | "finalizingIa"
  | "linkingExpenseLine"
  | "done";

const asRecord = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== "object") return {};
  return value as Record<string, unknown>;
};

const getFirstDefined = (record: Record<string, unknown>, keys: string[]): unknown => {
  for (const key of keys) {
    if (key in record) {
      return record[key];
    }
  }
  return undefined;
};

const toNumber = (value: unknown): number | null => {
  if (value === null || value === undefined) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const toPositiveNumber = (value: unknown): number | null => {
  const parsed = toNumber(value);
  return parsed !== null && parsed > 0 ? parsed : null;
};

const toYyyyMMdd = (value: unknown): string => {
  const raw = safeText(value);
  if (!raw) return "";

  const dateOnly = raw.split("T")[0].split(" ")[0];
  if (/^\d{8}$/.test(dateOnly)) return dateOnly;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateOnly)) {
    return dateOnly.replace(/-/g, "");
  }
  if (/^\d{4}\/\d{2}\/\d{2}$/.test(dateOnly)) {
    return dateOnly.replace(/\//g, "");
  }
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return "";
  const year = String(parsed.getFullYear());
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
};

const getTodayYyyyMMdd = (): string => {
  return toYyyyMMdd(new Date());
};

const normalizeGastoType = (value: unknown): number | null => {
  const parsed = toNumber(value);
  if (parsed === null || !Number.isInteger(parsed) || !ALLOWED_TICKET_GASTO_TYPES.has(parsed)) {
    return null;
  }
  return parsed;
};

const inferExtension = (file: File): string => {
  const fromName = safeText(file.name).split(".").pop() || "";
  const normalizedFromName = fromName.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (normalizedFromName) return normalizedFromName;

  const type = safeText(file.type).toLowerCase();
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/heic") return "heic";
  if (type === "image/heif") return "heif";
  return "jpg";
};

const resolveRandomKey = (): string => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const sanitizeFileName = (value: string): string => {
  const base = safeText(value).replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_");
  return base || "ticket-image";
};

const extractTraceIdFromError = (error: ApiFetchError): string => {
  const payload = safeText(error.responseBody);
  if (!payload) return "";
  try {
    const json = JSON.parse(payload) as Record<string, unknown>;
    const traceId = safeText(json.TraceId ?? json.traceId);
    return traceId;
  } catch {
    return "";
  }
};

const normalizeDraftFromIaResponse = (rawData: unknown): NormalizedDraft => {
  const data = asRecord(rawData);
  const draftDescription = safeText(getFirstDefined(data, ["description", "Description"]));
  const draftCurrency = safeText(getFirstDefined(data, ["currencyCode", "CurrencyCode"])).toUpperCase();
  const draftTotalAmount = toPositiveNumber(getFirstDefined(data, ["totalAmount", "TotalAmount"])) || 0;
  const draftTransDate = toYyyyMMdd(getFirstDefined(data, ["transDate", "TransDate"])) || getTodayYyyyMMdd();
  const draftComment = safeText(getFirstDefined(data, ["comentario", "Comentario"]));
  const draftGastoType = normalizeGastoType(getFirstDefined(data, ["gastoType", "GastoType"]));

  const rawLines = getFirstDefined(data, ["lines", "Lines"]);
  const lineArray = Array.isArray(rawLines) ? rawLines : [];

  const lines: NormalizedDraftLine[] = lineArray
    .map((entry) => {
      const lineRecord = asRecord(entry);
      const qty = toPositiveNumber(getFirstDefined(lineRecord, ["qty", "Qty"])) || 1;
      const price = toPositiveNumber(getFirstDefined(lineRecord, ["price", "Price"])) || 0;
      const explicitTotal = toPositiveNumber(getFirstDefined(lineRecord, ["totalAmount", "TotalAmount"])) || 0;
      const computedTotal = explicitTotal > 0 ? explicitTotal : qty * price;
      if (!(computedTotal > 0)) return null;

      const candidateTypeValue = toPositiveNumber(getFirstDefined(lineRecord, ["typeValue", "TypeValue"]));
      const safeTypeValue = Number.isInteger(candidateTypeValue) ? Number(candidateTypeValue) : null;
      const typeValue = safeTypeValue && safeTypeValue > 0 ? safeTypeValue : draftGastoType || DEFAULT_TICKET_GASTO_TYPE;
      const description = safeText(getFirstDefined(lineRecord, ["description", "Description"])) || draftDescription;
      const transDate = toYyyyMMdd(getFirstDefined(lineRecord, ["transDate", "TransDate"])) || draftTransDate;

      return {
        transDate,
        typeValue,
        description: description || "Ticket",
        qty,
        price: price > 0 ? price : computedTotal,
        totalAmount: computedTotal,
      };
    })
    .filter((entry): entry is NormalizedDraftLine => entry !== null);

  return {
    description: draftDescription || "Ticket",
    currencyCode: draftCurrency || "EUR",
    totalAmount: draftTotalAmount > 0 ? draftTotalAmount : lines.reduce((sum, line) => sum + line.totalAmount, 0),
    transDate: draftTransDate,
    comentario: draftComment,
    gastoType: draftGastoType,
    lines,
  };
};

const resolveTicketFileIdFromDraftResponse = (rawData: unknown): string => {
  const data = asRecord(rawData);
  const creationRaw = getFirstDefined(data, ["TicketCreation", "ticketCreation"]);
  const creation = asRecord(creationRaw);
  return safeText(getFirstDefined(creation, ["FileId", "fileId"]));
};

const resolveUploadResult = (responseData: unknown): UploadSyncResult => {
  const data = asRecord(responseData);
  return {
    urlFile: safeText(getFirstDefined(data, ["UrlFile", "urlFile"])),
    fileName: safeText(getFirstDefined(data, ["FileName", "fileName"])),
  };
};

const buildTicketIaPayload = (draft: NormalizedDraft, upload: UploadSyncResult): ExpenseSheetTicketIaRequest => {
  const iaLines = draft.lines.map((line) => ({
    description: line.description,
    qty: line.qty,
    price: line.price,
    totalAmount: line.totalAmount,
  }));

  const payload: ExpenseSheetTicketIaRequest = {
    description: draft.description,
    currencyCode: draft.currencyCode,
    totalAmount: draft.totalAmount > 0 ? draft.totalAmount : undefined,
    transDate: draft.transDate,
    comentario: draft.comentario || undefined,
    urlFile: upload.urlFile || undefined,
    fileName: upload.fileName || undefined,
    lines: iaLines,
  };

  if (draft.gastoType !== null) {
    payload.gastoType = draft.gastoType as ExpenseGastoTypeCode;
  }

  return payload;
};

const buildSheetLinePayload = (
  draft: NormalizedDraft,
  fileId: string,
  projectId: string
): ExpenseSheetCreateLineRequest | null => {
  const lineFromDraft = draft.lines[0];
  const fallbackTotal = lineFromDraft?.totalAmount || draft.totalAmount;
  if (!(fallbackTotal > 0)) return null;

  const typeValueCandidate = lineFromDraft?.typeValue || draft.gastoType || DEFAULT_TICKET_GASTO_TYPE;
  const safeTypeValue = Number(typeValueCandidate);
  const typeValue = Number.isInteger(safeTypeValue) && safeTypeValue > 0 ? safeTypeValue : DEFAULT_TICKET_GASTO_TYPE;

  return {
    transDate: lineFromDraft?.transDate || draft.transDate || getTodayYyyyMMdd(),
    typeValue,
    description: safeText(lineFromDraft?.description || draft.description) || "Ticket",
    internacional: false,
    fileId,
    ticket: true,
    qty: 1,
    price: fallbackTotal,
    projId: safeText(projectId) || undefined,
  };
};

const persistTraceList = (traceList: TicketTraceEntry[]): void => {
  try {
    sessionStorage.setItem(TICKET_TRACE_STORAGE_KEY, JSON.stringify(traceList));
  } catch {
    // Ignore storage failures in restricted browser contexts.
  }
};

const cacheImageFile = async (cacheKey: string, file: File): Promise<void> => {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  await cache.put(
    new Request(requestUrl),
    new Response(file, {
      headers: {
        "Content-Type": safeText(file.type) || "application/octet-stream",
      },
    })
  );
};

const readCachedImageFile = async (cacheKey: string): Promise<Blob | null> => {
  if (typeof window === "undefined" || !("caches" in window)) return null;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  const cachedResponse = await cache.match(requestUrl);
  if (!cachedResponse) return null;
  return cachedResponse.blob();
};

const removeCachedImageFile = async (cacheKey: string): Promise<void> => {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  await cache.delete(requestUrl);
};

export const useExpenseSheetQuickTicketFlow = ({
  sheetId,
  projectId,
  currencyCode,
  canCreateExpense,
  isCreateMode,
  isSheetLocked,
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
    if (!canCreateExpense || !sheetId || isCreateMode || isSheetLocked) {
      onForbidden();
      return false;
    }
    return true;
  }, [canCreateExpense, isCreateMode, isSheetLocked, onForbidden, sheetId]);

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

  const applyIaAndLinkToSheet = useCallback(
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
    [addTrace, projectId, sheetId]
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
        await applyIaAndLinkToSheet(pendingState.fileId, pendingState.draft, uploadResult);

        setProgressKey("done");
        setPendingUploadRetry(null);
        await removeCachedImageFile(pendingState.cacheKey);
        setTimeout(() => {
          setBusy(false);
          setProgressKey(null);
          onCompleted?.();
        }, 320);
      } catch (error) {
        if (error instanceof ApiFetchError) {
          const traceId = extractTraceIdFromError(error);
          addTrace("ticket-file-upload-error", traceId);
        }
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [addTrace, applyIaAndLinkToSheet, onCompleted, resolveUiErrorMessage]
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
          await applyIaAndLinkToSheet(fileId, draft, uploadResult);

          setProgressKey("done");
          await removeCachedImageFile(cacheKey);
          setTimeout(() => {
            setBusy(false);
            setProgressKey(null);
            onCompleted?.();
          }, 320);
        } catch (uploadError) {
          if (uploadError instanceof ApiFetchError) {
            const traceId = extractTraceIdFromError(uploadError);
            addTrace("ticket-file-upload-error", traceId);
          }
          setPendingUploadRetry({
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
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [addTrace, applyIaAndLinkToSheet, clearFlowState, onCompleted, resolveUiErrorMessage]
  );

  const runManualCreateFlow = useCallback(
    async (file: File, extension: string, cacheKey: string): Promise<void> => {
      setBusy(true);
      setProgressKey("creatingTicket");
      clearFlowState();

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

        const createData = asRecord((createResponse as { Data?: unknown })?.Data);
        const fileId = safeText(getFirstDefined(createData, ["FileId", "fileId"]));
        if (!fileId) {
          throw new Error(indT("ExpenseSheets_NewTicket_Error_NoFileId", "Could not resolve ticket file id."));
        }

        setProgressKey("syncingFile");
        const uploadResponse = await uploadExpenseSheetTicketFile(fileId, file, extension, {
          suppressPermissionModal: true,
        });
        addTrace("ticket-file-upload", safeText((uploadResponse as { TraceId?: unknown })?.TraceId));
        if (uploadResponse.Success !== true) {
          throw new Error(safeText(uploadResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const uploadResult = resolveUploadResult(uploadResponse.Data);

        setProgressKey("uploadingImage");
        const iaDraftResponse = await extractExpenseFromTicketDraft(file, false, uploadResult.urlFile || undefined, {
          suppressPermissionModal: true,
        });
        addTrace("expensefromticket", safeText((iaDraftResponse as { TraceId?: unknown })?.TraceId));
        if (iaDraftResponse.Success !== true) {
          throw new Error(safeText(iaDraftResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const draft = normalizeDraftFromIaResponse(iaDraftResponse.Data as ExpenseSheetDraftResponse);
        await applyIaAndLinkToSheet(fileId, draft, uploadResult);

        setProgressKey("done");
        await removeCachedImageFile(cacheKey);
        setTimeout(() => {
          setBusy(false);
          setProgressKey(null);
          onCompleted?.();
        }, 320);
      } catch (error) {
        if (error instanceof ApiFetchError) {
          const traceId = extractTraceIdFromError(error);
          addTrace("ticket-manual-error", traceId);
        }
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [addTrace, applyIaAndLinkToSheet, clearFlowState, currencyCode, onCompleted, resolveUiErrorMessage]
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
