import {
  flashActionMark
} from "./chunk-K7MECJ5E.js";
import {
  safeText
} from "./chunk-FUOK7RBM.js";
import {
  applyExpenseSheetTicketIa,
  createExpenseSheet,
  createExpenseSheetTicket,
  extractExpenseFromTicketDraft,
  uploadExpenseSheetTicketFile
} from "./chunk-YVGMYSYA.js";
import {
  toExpenseApiDdMmYyyy
} from "./chunk-QGAYQR5R.js";
import {
  indT
} from "./chunk-BYICIYT4.js";
import {
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  ApiFetchError
} from "./chunk-REMMAK3K.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlow.ts
var import_react = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlowCore.ts
var TICKET_IMAGE_CACHE_NAME = "ind-expense-ticket-image-v1";
var TICKET_IMAGE_CACHE_PREFIX = "/__ind_cache__/ticket-image/";
var TICKET_TRACE_STORAGE_KEY = "expense_sheet_ticket_quick_flow_trace_v1";
var MAX_TICKET_IMAGE_SIZE_BYTES = 50 * 1024 * 1024;
var ALLOWED_TICKET_IMAGE_MIME_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/jpg", "image/png", "image/webp"]);
var ALLOWED_TICKET_IMAGE_EXTENSIONS = /* @__PURE__ */ new Set(["jpg", "jpeg", "png", "webp"]);
var TICKET_MIME_TO_EXTENSION = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
};
var ALLOWED_TICKET_GASTO_TYPES = /* @__PURE__ */ new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 14]);
var DEFAULT_TICKET_GASTO_TYPE = 8;
var DEFAULT_CREATE_MODE = "manual";
var asRecord = (value) => {
  if (!value || typeof value !== "object") return {};
  return value;
};
var getFirstDefined = (record, keys) => {
  for (const key of keys) {
    if (key in record) {
      return record[key];
    }
  }
  return void 0;
};
var toNumber = (value) => {
  if (value === null || value === void 0) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};
var toPositiveNumber = (value) => {
  const parsed = toNumber(value);
  return parsed !== null && parsed > 0 ? parsed : null;
};
var toDdMmYyyy = (value) => {
  return toExpenseApiDdMmYyyy(value);
};
var getTodayDdMmYyyy = () => {
  return toDdMmYyyy(/* @__PURE__ */ new Date());
};
var normalizeGastoType = (value) => {
  const parsed = toNumber(value);
  if (parsed === null || !Number.isInteger(parsed) || !ALLOWED_TICKET_GASTO_TYPES.has(parsed)) {
    return null;
  }
  return parsed;
};
var normalizeImageExtension = (value) => {
  const normalized = safeText(value).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!normalized) return "";
  if (normalized === "jpeg") return "jpg";
  return ALLOWED_TICKET_IMAGE_EXTENSIONS.has(normalized) ? normalized : "";
};
var resolveExtensionFromFileName = (file) => {
  const fromName = safeText(file.name).split(".").pop() || "";
  return normalizeImageExtension(fromName);
};
var inferExtension = (file) => {
  const type = safeText(file.type).toLowerCase();
  const fromMime = TICKET_MIME_TO_EXTENSION[type];
  if (fromMime) return fromMime;
  const fromName = resolveExtensionFromFileName(file);
  if (fromName) return fromName;
  return "jpg";
};
var isSupportedTicketImageFile = (file) => {
  const normalizedType = safeText(file.type).toLowerCase();
  if (normalizedType) {
    return ALLOWED_TICKET_IMAGE_MIME_TYPES.has(normalizedType);
  }
  const extension = resolveExtensionFromFileName(file);
  return !!extension;
};
var resolveRandomKey = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};
var sanitizeFileName = (value) => {
  const base = safeText(value).replace(/[<>:"/\\|?*\u0000-\u001F]/g, "_");
  return base || "ticket-image";
};
var extractTraceIdFromError = (error) => {
  const payload = safeText(error.responseBody);
  if (!payload) return "";
  try {
    const json = JSON.parse(payload);
    const traceId = safeText(json.TraceId ?? json.traceId);
    return traceId;
  } catch {
    return "";
  }
};
var normalizeDraftFromIaResponse = (rawData) => {
  const data = asRecord(rawData);
  const draftDescription = safeText(getFirstDefined(data, ["description", "Description"]));
  const draftCurrency = safeText(getFirstDefined(data, ["currencyCode", "CurrencyCode"])).toUpperCase();
  const draftTotalAmount = toPositiveNumber(getFirstDefined(data, ["totalAmount", "TotalAmount"])) || 0;
  const draftTransDate = toDdMmYyyy(getFirstDefined(data, ["transDate", "TransDate"])) || getTodayDdMmYyyy();
  const draftComment = safeText(getFirstDefined(data, ["comentario", "Comentario"]));
  const draftGastoType = normalizeGastoType(getFirstDefined(data, ["gastoType", "GastoType"]));
  const rawLines = getFirstDefined(data, ["lines", "Lines"]);
  const lineArray = Array.isArray(rawLines) ? rawLines : [];
  const lines = lineArray.map((entry) => {
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
    const transDate = toDdMmYyyy(getFirstDefined(lineRecord, ["transDate", "TransDate"])) || draftTransDate;
    return {
      transDate,
      typeValue,
      description: description || "Ticket",
      qty,
      price: price > 0 ? price : computedTotal,
      totalAmount: computedTotal
    };
  }).filter((entry) => entry !== null);
  return {
    description: draftDescription || "Ticket",
    currencyCode: draftCurrency || "EUR",
    totalAmount: draftTotalAmount > 0 ? draftTotalAmount : lines.reduce((sum, line) => sum + line.totalAmount, 0),
    transDate: draftTransDate,
    comentario: draftComment,
    gastoType: draftGastoType,
    lines
  };
};
var resolveTicketFileIdFromDraftResponse = (rawData) => {
  const data = asRecord(rawData);
  const creationRaw = getFirstDefined(data, ["TicketCreation", "ticketCreation"]);
  const creation = asRecord(creationRaw);
  return safeText(getFirstDefined(creation, ["FileId", "fileId"]));
};
var resolveUploadResult = (responseData) => {
  const data = asRecord(responseData);
  return {
    urlFile: safeText(getFirstDefined(data, ["UrlFile", "urlFile"])),
    fileName: safeText(getFirstDefined(data, ["FileName", "fileName"]))
  };
};
var buildTicketIaPayload = (draft, upload) => {
  const iaLines = draft.lines.map((line) => ({
    description: line.description,
    qty: line.qty,
    price: line.price,
    totalAmount: line.totalAmount
  }));
  const payload = {
    description: draft.description,
    currencyCode: draft.currencyCode,
    totalAmount: draft.totalAmount > 0 ? draft.totalAmount : void 0,
    transDate: draft.transDate,
    comentario: draft.comentario || void 0,
    urlFile: upload.urlFile || void 0,
    fileName: upload.fileName || void 0,
    lines: iaLines
  };
  if (draft.gastoType !== null) {
    payload.gastoType = draft.gastoType;
  }
  return payload;
};
var buildSheetLinePayload = (draft, fileId, projectId) => {
  const lineFromDraft = draft.lines[0];
  const headerTotal = draft.totalAmount > 0 ? draft.totalAmount : 0;
  const fallbackTotal = lineFromDraft?.totalAmount || 0;
  const effectiveTotal = headerTotal > 0 ? headerTotal : fallbackTotal;
  if (!(effectiveTotal > 0)) return null;
  const typeValueCandidate = draft.gastoType || lineFromDraft?.typeValue || DEFAULT_TICKET_GASTO_TYPE;
  const safeTypeValue = Number(typeValueCandidate);
  const typeValue = Number.isInteger(safeTypeValue) && safeTypeValue > 0 ? safeTypeValue : DEFAULT_TICKET_GASTO_TYPE;
  return {
    transDate: draft.transDate || lineFromDraft?.transDate || getTodayDdMmYyyy(),
    typeValue,
    description: safeText(draft.description) || "Ticket",
    internacional: false,
    fileId,
    ticket: true,
    qty: 1,
    price: effectiveTotal,
    projId: safeText(projectId) || void 0
  };
};
var persistTraceList = (traceList) => {
  try {
    sessionStorage.setItem(TICKET_TRACE_STORAGE_KEY, JSON.stringify(traceList));
  } catch {
  }
};
var cacheImageFile = async (cacheKey, file) => {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  await cache.put(
    new Request(requestUrl),
    new Response(file, {
      headers: {
        "Content-Type": safeText(file.type) || "application/octet-stream"
      }
    })
  );
};
var readCachedImageFile = async (cacheKey) => {
  if (typeof window === "undefined" || !("caches" in window)) return null;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  const cachedResponse = await cache.match(requestUrl);
  if (!cachedResponse) return null;
  return cachedResponse.blob();
};
var removeCachedImageFile = async (cacheKey) => {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  await cache.delete(requestUrl);
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlow.ts
var useExpenseSheetQuickTicketFlow = ({
  sheetId = "",
  projectId = "",
  currencyCode = "",
  axUserIdOverride = "",
  canCreateExpense,
  isCreateMode,
  isSheetLocked,
  linkToSheet = true,
  onForbidden,
  onCompleted
}) => {
  const [sourcePickerOpen, setSourcePickerOpen] = (0, import_react.useState)(false);
  const [busy, setBusy] = (0, import_react.useState)(false);
  const [progressKey, setProgressKey] = (0, import_react.useState)(null);
  const [errorMessage, setErrorMessage] = (0, import_react.useState)("");
  const [pendingUploadRetry, setPendingUploadRetry] = (0, import_react.useState)(null);
  const [traceList, setTraceList] = (0, import_react.useState)([]);
  const latestFileRef = (0, import_react.useRef)(null);
  const progressMessage = (0, import_react.useMemo)(() => {
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
  const addTrace = (0, import_react.useCallback)((step, traceId) => {
    const safeTraceId = safeText(traceId);
    if (!safeTraceId) return;
    setTraceList((previous) => {
      const next = [
        ...previous,
        {
          step,
          traceId: safeTraceId,
          at: (/* @__PURE__ */ new Date()).toISOString()
        }
      ];
      persistTraceList(next);
      return next;
    });
  }, []);
  const clearFlowState = (0, import_react.useCallback)(() => {
    setErrorMessage("");
    setPendingUploadRetry(null);
    setTraceList([]);
    persistTraceList([]);
  }, []);
  const buildApiOptions = (0, import_react.useCallback)(() => {
    const safeAxUserId = safeText(axUserIdOverride);
    if (!safeAxUserId) {
      return {
        suppressPermissionModal: true
      };
    }
    return {
      suppressPermissionModal: true,
      headers: {
        "X-IND-AxUserId": safeAxUserId
      }
    };
  }, [axUserIdOverride]);
  const ensureQuickCreatePermission = (0, import_react.useCallback)(() => {
    if (!canCreateExpense || isCreateMode || isSheetLocked || linkToSheet && !sheetId) {
      onForbidden();
      return false;
    }
    return true;
  }, [canCreateExpense, isCreateMode, isSheetLocked, linkToSheet, onForbidden, sheetId]);
  const resolveUiErrorMessage = (0, import_react.useCallback)(
    (error) => {
      if (error instanceof ApiFetchError) {
        if (error.status === 422) {
          const validationText = Array.isArray(error.validationErrors) ? error.validationErrors.map((entry) => {
            const field = safeText(entry?.Field);
            const message = safeText(entry?.Message);
            if (field && message) return `${field}: ${message}`;
            return message || field;
          }).filter((entry) => entry).join(" | ") : "";
          return validationText || indT("ExpenseSheets_NewTicket_Error_Validation", "Validation error.");
        }
        if (error.status === 404) {
          return indT("ExpenseSheets_NewTicket_Error_NotFound", "Record not found.");
        }
        if (error.status === 500) {
          return indT("ExpenseSheets_NewTicket_Error_Server", "Server error.");
        }
      }
      return error instanceof Error && safeText(error.message) ? safeText(error.message) : indT("Api_RequestFailed", "Request failed.");
    },
    []
  );
  const applyIaAndFinalize = (0, import_react.useCallback)(
    async (fileId, draft, uploadResult) => {
      setProgressKey("finalizingIa");
      const iaPayload = buildTicketIaPayload(draft, uploadResult);
      const iaResponse = await applyExpenseSheetTicketIa(fileId, iaPayload, buildApiOptions());
      addTrace("ticket-ia", safeText(iaResponse?.TraceId));
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
          lines: [linePayload]
        },
        buildApiOptions()
      );
      addTrace("expense-sheet-append-line", safeText(createResponse?.TraceId));
      if (createResponse.Success !== true) {
        throw new Error(safeText(createResponse.Message) || indT("Api_RequestFailed", "Request failed."));
      }
    },
    [addTrace, buildApiOptions, linkToSheet, projectId, sheetId]
  );
  const resumeFromUploadStep = (0, import_react.useCallback)(
    async (pendingState, file) => {
      setBusy(true);
      setErrorMessage("");
      setProgressKey("syncingFile");
      try {
        const uploadResponse = await uploadExpenseSheetTicketFile(
          pendingState.fileId,
          file,
          pendingState.extension,
          buildApiOptions()
        );
        addTrace("ticket-file-upload", safeText(uploadResponse?.TraceId));
        if (uploadResponse.Success !== true) {
          throw new Error(safeText(uploadResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const uploadResult = resolveUploadResult(uploadResponse.Data);
        let draft;
        if (pendingState.strategy === "ia-ready") {
          draft = pendingState.draft;
        } else {
          setProgressKey("uploadingImage");
          const iaDraftResponse = await extractExpenseFromTicketDraft(
            file,
            false,
            uploadResult.urlFile || void 0,
            buildApiOptions()
          );
          addTrace("expensefromticket", safeText(iaDraftResponse?.TraceId));
          if (iaDraftResponse.Success !== true) {
            throw new Error(safeText(iaDraftResponse.Message) || indT("Api_RequestFailed", "Request failed."));
          }
          draft = normalizeDraftFromIaResponse(iaDraftResponse.Data);
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
    [addTrace, applyIaAndFinalize, buildApiOptions, linkToSheet, onCompleted, resolveUiErrorMessage]
  );
  const runIaCreateFlow = (0, import_react.useCallback)(
    async (file, extension, cacheKey) => {
      setBusy(true);
      setProgressKey("uploadingImage");
      clearFlowState();
      try {
        setProgressKey("creatingTicket");
        const draftResponse = await extractExpenseFromTicketDraft(file, true, void 0, buildApiOptions());
        addTrace("expensefromticket", safeText(draftResponse?.TraceId));
        if (draftResponse.Success !== true) {
          throw new Error(safeText(draftResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const draft = normalizeDraftFromIaResponse(draftResponse.Data);
        const fileId = resolveTicketFileIdFromDraftResponse(draftResponse.Data);
        if (!fileId) {
          throw new Error(indT("ExpenseSheets_NewTicket_Error_NoFileId", "Could not resolve ticket file id."));
        }
        try {
          setProgressKey("syncingFile");
          const uploadResponse = await uploadExpenseSheetTicketFile(fileId, file, extension, buildApiOptions());
          addTrace("ticket-file-upload", safeText(uploadResponse?.TraceId));
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
            fileNameHint: sanitizeFileName(file.name)
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
    [addTrace, applyIaAndFinalize, buildApiOptions, clearFlowState, linkToSheet, onCompleted, resolveUiErrorMessage]
  );
  const runManualCreateFlow = (0, import_react.useCallback)(
    async (file, extension, cacheKey) => {
      setBusy(true);
      setProgressKey("creatingTicket");
      clearFlowState();
      let createdFileId = "";
      let stage = "creatingTicket";
      try {
        const today = getTodayDdMmYyyy();
        const placeholderUrl = `pending://ticket-upload/${resolveRandomKey()}`;
        const createPayload = {
          mode: 1,
          description: sanitizeFileName(file.name).replace(/\.[a-z0-9]+$/i, "") || "Ticket",
          currencyCode: safeText(currencyCode).toUpperCase() || "EUR",
          transDate: today,
          comentario: "",
          urlFile: placeholderUrl,
          fileExtension: extension
        };
        const createResponse = await createExpenseSheetTicket(createPayload, buildApiOptions());
        addTrace("ticket-create-manual", safeText(createResponse?.TraceId));
        if (createResponse.Success !== true) {
          throw new Error(safeText(createResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const createData = createResponse.Data;
        const fileId = safeText(createData?.FileId ?? createData?.fileId);
        if (!fileId) {
          throw new Error(indT("ExpenseSheets_NewTicket_Error_NoFileId", "Could not resolve ticket file id."));
        }
        createdFileId = fileId;
        stage = "syncingFile";
        setProgressKey("syncingFile");
        const uploadResponse = await uploadExpenseSheetTicketFile(fileId, file, extension, buildApiOptions());
        addTrace("ticket-file-upload", safeText(uploadResponse?.TraceId));
        if (uploadResponse.Success !== true) {
          throw new Error(safeText(uploadResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const uploadResult = resolveUploadResult(uploadResponse.Data);
        stage = "uploadingImage";
        setProgressKey("uploadingImage");
        const iaDraftResponse = await extractExpenseFromTicketDraft(
          file,
          false,
          uploadResult.urlFile || void 0,
          buildApiOptions()
        );
        addTrace("expensefromticket", safeText(iaDraftResponse?.TraceId));
        if (iaDraftResponse.Success !== true) {
          throw new Error(safeText(iaDraftResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const draft = normalizeDraftFromIaResponse(iaDraftResponse.Data);
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
            fileNameHint: sanitizeFileName(file.name)
          });
        }
        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [addTrace, applyIaAndFinalize, buildApiOptions, clearFlowState, currencyCode, linkToSheet, onCompleted, resolveUiErrorMessage]
  );
  const handleSelectedFile = (0, import_react.useCallback)(
    async (file, _source) => {
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
      }
      if (DEFAULT_CREATE_MODE === "manual") {
        await runManualCreateFlow(file, extension, cacheKey);
      } else {
        await runIaCreateFlow(file, extension, cacheKey);
      }
    },
    [ensureQuickCreatePermission, runIaCreateFlow, runManualCreateFlow]
  );
  const retryPendingUpload = (0, import_react.useCallback)(async () => {
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
        type: safeText(blob.type) || "image/jpeg"
      });
      latestFileRef.current = { cacheKey: pendingUploadRetry.cacheKey, file: selectedFile };
    }
    await resumeFromUploadStep(pendingUploadRetry, selectedFile);
  }, [ensureQuickCreatePermission, pendingUploadRetry, resumeFromUploadStep]);
  const openSourcePicker = (0, import_react.useCallback)(() => {
    if (!ensureQuickCreatePermission()) return;
    setErrorMessage("");
    setSourcePickerOpen(true);
  }, [ensureQuickCreatePermission]);
  const closeSourcePicker = (0, import_react.useCallback)(() => {
    if (busy) return;
    setSourcePickerOpen(false);
  }, [busy]);
  const requestCameraPermission = (0, import_react.useCallback)(async () => {
    if (typeof navigator === "undefined") return null;
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices || typeof mediaDevices.getUserMedia !== "function") return null;
    try {
      const stream = await mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch {
      return false;
    }
  }, []);
  const selectFromCamera = (0, import_react.useCallback)(
    async (inputElement) => {
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
  const selectFromGallery = (0, import_react.useCallback)((inputElement) => {
    if (!inputElement) return;
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);
  const clearError = (0, import_react.useCallback)(() => {
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
    clearError
  };
};

export {
  useExpenseSheetQuickTicketFlow
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0NvcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlx1RkVGRmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsIEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQge1xuICBhcHBseUV4cGVuc2VTaGVldFRpY2tldElhLFxuICBjcmVhdGVFeHBlbnNlU2hlZXQsXG4gIGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCxcbiAgZXh0cmFjdEV4cGVuc2VGcm9tVGlja2V0RHJhZnQsXG4gIHVwbG9hZEV4cGVuc2VTaGVldFRpY2tldEZpbGUsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9DUkVBVEVfTU9ERSxcbiAgTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTLFxuICBidWlsZFNoZWV0TGluZVBheWxvYWQsXG4gIGJ1aWxkVGlja2V0SWFQYXlsb2FkLFxuICBjYWNoZUltYWdlRmlsZSxcbiAgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IsXG4gIGdldFRvZGF5RGRNbVl5eXksXG4gIGluZmVyRXh0ZW5zaW9uLFxuICBpc1N1cHBvcnRlZFRpY2tldEltYWdlRmlsZSxcbiAgbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZSxcbiAgcGVyc2lzdFRyYWNlTGlzdCxcbiAgcmVhZENhY2hlZEltYWdlRmlsZSxcbiAgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlLFxuICByZXNvbHZlUmFuZG9tS2V5LFxuICByZXNvbHZlVGlja2V0RmlsZUlkRnJvbURyYWZ0UmVzcG9uc2UsXG4gIHJlc29sdmVVcGxvYWRSZXN1bHQsXG4gIHNhbml0aXplRmlsZU5hbWUsXG4gIHR5cGUgTm9ybWFsaXplZERyYWZ0LFxuICB0eXBlIFBlbmRpbmdVcGxvYWRSZXRyeSxcbiAgdHlwZSBRdWlja0Zsb3dQcm9ncmVzc0tleSxcbiAgdHlwZSBUaWNrZXRJbWFnZVNvdXJjZSxcbiAgdHlwZSBUaWNrZXRUcmFjZUVudHJ5LFxuICB0eXBlIFVwbG9hZFN5bmNSZXN1bHQsXG4gIHR5cGUgVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncyxcbn0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93ID0gKHtcbiAgc2hlZXRJZCA9IFwiXCIsXG4gIHByb2plY3RJZCA9IFwiXCIsXG4gIGN1cnJlbmN5Q29kZSA9IFwiXCIsXG4gIGF4VXNlcklkT3ZlcnJpZGUgPSBcIlwiLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzU2hlZXRMb2NrZWQsXG4gIGxpbmtUb1NoZWV0ID0gdHJ1ZSxcbiAgb25Gb3JiaWRkZW4sXG4gIG9uQ29tcGxldGVkLFxufTogVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncykgPT4ge1xuICBjb25zdCBbc291cmNlUGlja2VyT3Blbiwgc2V0U291cmNlUGlja2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Byb2dyZXNzS2V5LCBzZXRQcm9ncmVzc0tleV0gPSB1c2VTdGF0ZTxRdWlja0Zsb3dQcm9ncmVzc0tleSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtwZW5kaW5nVXBsb2FkUmV0cnksIHNldFBlbmRpbmdVcGxvYWRSZXRyeV0gPSB1c2VTdGF0ZTxQZW5kaW5nVXBsb2FkUmV0cnkgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3RyYWNlTGlzdCwgc2V0VHJhY2VMaXN0XSA9IHVzZVN0YXRlPFRpY2tldFRyYWNlRW50cnlbXT4oW10pO1xuICBjb25zdCBsYXRlc3RGaWxlUmVmID0gdXNlUmVmPHsgY2FjaGVLZXk6IHN0cmluZzsgZmlsZTogRmlsZSB9IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcHJvZ3Jlc3NNZXNzYWdlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcInVwbG9hZGluZ0ltYWdlXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX1VwbG9hZGluZ0ltYWdlXCIsIFwiVXBsb2FkaW5nIGltYWdlLi4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwiY3JlYXRpbmdUaWNrZXRcIikge1xuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfQ3JlYXRpbmdUaWNrZXRcIiwgXCJDcmVhdGluZyB0aWNrZXQuLi5cIik7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJzeW5jaW5nRmlsZVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19TeW5jaW5nRmlsZVwiLCBcIlN5bmNpbmcgZmlsZS4uLlwiKTtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcImZpbmFsaXppbmdJYVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19GaW5hbGl6aW5nXCIsIFwiRmluYWxpemluZyBJQS4uLlwiKTtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcImxpbmtpbmdFeHBlbnNlTGluZVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19MaW5raW5nTGluZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lLi4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19Eb25lXCIsIFwiRG9uZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0sIFtwcm9ncmVzc0tleV0pO1xuXG4gIGNvbnN0IGFkZFRyYWNlID0gdXNlQ2FsbGJhY2soKHN0ZXA6IHN0cmluZywgdHJhY2VJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc2FmZVRyYWNlSWQgPSBzYWZlVGV4dCh0cmFjZUlkKTtcbiAgICBpZiAoIXNhZmVUcmFjZUlkKSByZXR1cm47XG5cbiAgICBzZXRUcmFjZUxpc3QoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gW1xuICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXAsXG4gICAgICAgICAgdHJhY2VJZDogc2FmZVRyYWNlSWQsXG4gICAgICAgICAgYXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgICBwZXJzaXN0VHJhY2VMaXN0KG5leHQpO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckZsb3dTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgc2V0UGVuZGluZ1VwbG9hZFJldHJ5KG51bGwpO1xuICAgIHNldFRyYWNlTGlzdChbXSk7XG4gICAgcGVyc2lzdFRyYWNlTGlzdChbXSk7XG4gIH0sIFtdKTtcblxuICAvLyBGb3JjZXMgbXV0YXRpb25zIHRvIGZvbGxvdyB0aGUgcGFnZS1yZXNvbHZlZCBBWCB1c2VyIGluc3RlYWQgb2YgYW55IHN0YWxlIGdsb2JhbCBvdmVycmlkZS5cbiAgY29uc3QgYnVpbGRBcGlPcHRpb25zID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHNhZmVBeFVzZXJJZCA9IHNhZmVUZXh0KGF4VXNlcklkT3ZlcnJpZGUpO1xuICAgIGlmICghc2FmZUF4VXNlcklkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIlgtSU5ELUF4VXNlcklkXCI6IHNhZmVBeFVzZXJJZCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfSwgW2F4VXNlcklkT3ZlcnJpZGVdKTtcblxuICBjb25zdCBlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24gPSB1c2VDYWxsYmFjaygoKTogYm9vbGVhbiA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlIHx8IGlzQ3JlYXRlTW9kZSB8fCBpc1NoZWV0TG9ja2VkIHx8IChsaW5rVG9TaGVldCAmJiAhc2hlZXRJZCkpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc1NoZWV0TG9ja2VkLCBsaW5rVG9TaGVldCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICBjb25zdCByZXNvbHZlVWlFcnJvck1lc3NhZ2UgPSB1c2VDYWxsYmFjayhcbiAgICAoZXJyb3I6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MjIpIHtcbiAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uVGV4dCA9IEFycmF5LmlzQXJyYXkoZXJyb3IudmFsaWRhdGlvbkVycm9ycylcbiAgICAgICAgICAgID8gZXJyb3IudmFsaWRhdGlvbkVycm9yc1xuICAgICAgICAgICAgICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IHNhZmVUZXh0KGVudHJ5Py5GaWVsZCk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gc2FmZVRleHQoZW50cnk/Lk1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgaWYgKGZpZWxkICYmIG1lc3NhZ2UpIHJldHVybiBgJHtmaWVsZH06ICR7bWVzc2FnZX1gO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UgfHwgZmllbGQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkpXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIgfCBcIilcbiAgICAgICAgICAgIDogXCJcIjtcbiAgICAgICAgICByZXR1cm4gdmFsaWRhdGlvblRleHQgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1ZhbGlkYXRpb25cIiwgXCJWYWxpZGF0aW9uIGVycm9yLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX05vdEZvdW5kXCIsIFwiUmVjb3JkIG5vdCBmb3VuZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNTAwKSB7XG4gICAgICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TZXJ2ZXJcIiwgXCJTZXJ2ZXIgZXJyb3IuXCIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXG4gICAgICAgID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcbiAgICAgICAgOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XG4gICAgfSxcbiAgICBbXVxuICApO1xuXG4gIGNvbnN0IGFwcGx5SWFBbmRGaW5hbGl6ZSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChmaWxlSWQ6IHN0cmluZywgZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCwgdXBsb2FkUmVzdWx0OiBVcGxvYWRTeW5jUmVzdWx0KSA9PiB7XG4gICAgICBzZXRQcm9ncmVzc0tleShcImZpbmFsaXppbmdJYVwiKTtcbiAgICAgIGNvbnN0IGlhUGF5bG9hZCA9IGJ1aWxkVGlja2V0SWFQYXlsb2FkKGRyYWZ0LCB1cGxvYWRSZXN1bHQpO1xuICAgICAgY29uc3QgaWFSZXNwb25zZSA9IGF3YWl0IGFwcGx5RXhwZW5zZVNoZWV0VGlja2V0SWEoZmlsZUlkLCBpYVBheWxvYWQsIGJ1aWxkQXBpT3B0aW9ucygpKTtcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LWlhXCIsIHNhZmVUZXh0KChpYVJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgIGlmIChpYVJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNhZmVUZXh0KGlhUmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFsaW5rVG9TaGVldCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBsaW5lUGF5bG9hZCA9IGJ1aWxkU2hlZXRMaW5lUGF5bG9hZChkcmFmdCwgZmlsZUlkLCBwcm9qZWN0SWQpO1xuICAgICAgaWYgKCFsaW5lUGF5bG9hZCkgcmV0dXJuO1xuXG4gICAgICBzZXRQcm9ncmVzc0tleShcImxpbmtpbmdFeHBlbnNlTGluZVwiKTtcbiAgICAgIGNvbnN0IGNyZWF0ZVJlc3BvbnNlID0gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0KFxuICAgICAgICB7XG4gICAgICAgICAgbW9kZTogMixcbiAgICAgICAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogc2hlZXRJZCxcbiAgICAgICAgICBsaW5lczogW2xpbmVQYXlsb2FkXSxcbiAgICAgICAgfSxcbiAgICAgICAgYnVpbGRBcGlPcHRpb25zKClcbiAgICAgICk7XG4gICAgICBhZGRUcmFjZShcImV4cGVuc2Utc2hlZXQtYXBwZW5kLWxpbmVcIiwgc2FmZVRleHQoKGNyZWF0ZVJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgIGlmIChjcmVhdGVSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dChjcmVhdGVSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FkZFRyYWNlLCBidWlsZEFwaU9wdGlvbnMsIGxpbmtUb1NoZWV0LCBwcm9qZWN0SWQsIHNoZWV0SWRdXG4gICk7XG5cbiAgY29uc3QgcmVzdW1lRnJvbVVwbG9hZFN0ZXAgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAocGVuZGluZ1N0YXRlOiBQZW5kaW5nVXBsb2FkUmV0cnksIGZpbGU6IEZpbGUpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIHNldEJ1c3kodHJ1ZSk7XG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICBzZXRQcm9ncmVzc0tleShcInN5bmNpbmdGaWxlXCIpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB1cGxvYWRSZXNwb25zZSA9IGF3YWl0IHVwbG9hZEV4cGVuc2VTaGVldFRpY2tldEZpbGUoXG4gICAgICAgICAgcGVuZGluZ1N0YXRlLmZpbGVJZCxcbiAgICAgICAgICBmaWxlLFxuICAgICAgICAgIHBlbmRpbmdTdGF0ZS5leHRlbnNpb24sXG4gICAgICAgICAgYnVpbGRBcGlPcHRpb25zKClcbiAgICAgICAgKTtcbiAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmlsZS11cGxvYWRcIiwgc2FmZVRleHQoKHVwbG9hZFJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgaWYgKHVwbG9hZFJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQodXBsb2FkUmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVwbG9hZFJlc3VsdCA9IHJlc29sdmVVcGxvYWRSZXN1bHQodXBsb2FkUmVzcG9uc2UuRGF0YSk7XG4gICAgICAgIGxldCBkcmFmdDogTm9ybWFsaXplZERyYWZ0O1xuICAgICAgICBpZiAocGVuZGluZ1N0YXRlLnN0cmF0ZWd5ID09PSBcImlhLXJlYWR5XCIpIHtcbiAgICAgICAgICBkcmFmdCA9IHBlbmRpbmdTdGF0ZS5kcmFmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRQcm9ncmVzc0tleShcInVwbG9hZGluZ0ltYWdlXCIpO1xuICAgICAgICAgIGNvbnN0IGlhRHJhZnRSZXNwb25zZSA9IGF3YWl0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0KFxuICAgICAgICAgICAgZmlsZSxcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgdXBsb2FkUmVzdWx0LnVybEZpbGUgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgYnVpbGRBcGlPcHRpb25zKClcbiAgICAgICAgICApO1xuICAgICAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZWZyb210aWNrZXRcIiwgc2FmZVRleHQoKGlhRHJhZnRSZXNwb25zZSBhcyB7IFRyYWNlSWQ/OiB1bmtub3duIH0pPy5UcmFjZUlkKSk7XG4gICAgICAgICAgaWYgKGlhRHJhZnRSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQoaWFEcmFmdFJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRyYWZ0ID0gbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZShpYURyYWZ0UmVzcG9uc2UuRGF0YSBhcyBFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGFwcGx5SWFBbmRGaW5hbGl6ZShwZW5kaW5nU3RhdGUuZmlsZUlkLCBkcmFmdCwgdXBsb2FkUmVzdWx0KTtcblxuICAgICAgICBzZXRQcm9ncmVzc0tleShcImRvbmVcIik7XG4gICAgICAgIHNldFBlbmRpbmdVcGxvYWRSZXRyeShudWxsKTtcbiAgICAgICAgYXdhaXQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKHBlbmRpbmdTdGF0ZS5jYWNoZUtleSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgICBvbkNvbXBsZXRlZD8uKHsgZmlsZUlkOiBwZW5kaW5nU3RhdGUuZmlsZUlkLCBsaW5rZWRUb1NoZWV0OiBsaW5rVG9TaGVldCB9KTtcbiAgICAgICAgfSwgMzIwKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgICBjb25zdCB0cmFjZUlkID0gZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IoZXJyb3IpO1xuICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LXJldHJ5LWVycm9yXCIsIHRyYWNlSWQpO1xuICAgICAgICB9XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzb2x2ZVVpRXJyb3JNZXNzYWdlKGVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbYWRkVHJhY2UsIGFwcGx5SWFBbmRGaW5hbGl6ZSwgYnVpbGRBcGlPcHRpb25zLCBsaW5rVG9TaGVldCwgb25Db21wbGV0ZWQsIHJlc29sdmVVaUVycm9yTWVzc2FnZV1cbiAgKTtcblxuICBjb25zdCBydW5JYUNyZWF0ZUZsb3cgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoZmlsZTogRmlsZSwgZXh0ZW5zaW9uOiBzdHJpbmcsIGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIHNldEJ1c3kodHJ1ZSk7XG4gICAgICBzZXRQcm9ncmVzc0tleShcInVwbG9hZGluZ0ltYWdlXCIpO1xuICAgICAgY2xlYXJGbG93U3RhdGUoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJjcmVhdGluZ1RpY2tldFwiKTtcbiAgICAgICAgY29uc3QgZHJhZnRSZXNwb25zZSA9IGF3YWl0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0KGZpbGUsIHRydWUsIHVuZGVmaW5lZCwgYnVpbGRBcGlPcHRpb25zKCkpO1xuICAgICAgICBhZGRUcmFjZShcImV4cGVuc2Vmcm9tdGlja2V0XCIsIHNhZmVUZXh0KChkcmFmdFJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgaWYgKGRyYWZ0UmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dChkcmFmdFJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkcmFmdCA9IG5vcm1hbGl6ZURyYWZ0RnJvbUlhUmVzcG9uc2UoZHJhZnRSZXNwb25zZS5EYXRhIGFzIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UpO1xuICAgICAgICBjb25zdCBmaWxlSWQgPSByZXNvbHZlVGlja2V0RmlsZUlkRnJvbURyYWZ0UmVzcG9uc2UoZHJhZnRSZXNwb25zZS5EYXRhKTtcbiAgICAgICAgaWYgKCFmaWxlSWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX05vRmlsZUlkXCIsIFwiQ291bGQgbm90IHJlc29sdmUgdGlja2V0IGZpbGUgaWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJzeW5jaW5nRmlsZVwiKTtcbiAgICAgICAgICBjb25zdCB1cGxvYWRSZXNwb25zZSA9IGF3YWl0IHVwbG9hZEV4cGVuc2VTaGVldFRpY2tldEZpbGUoZmlsZUlkLCBmaWxlLCBleHRlbnNpb24sIGJ1aWxkQXBpT3B0aW9ucygpKTtcbiAgICAgICAgICBhZGRUcmFjZShcInRpY2tldC1maWxlLXVwbG9hZFwiLCBzYWZlVGV4dCgodXBsb2FkUmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgICAgIGlmICh1cGxvYWRSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQodXBsb2FkUmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB1cGxvYWRSZXN1bHQgPSByZXNvbHZlVXBsb2FkUmVzdWx0KHVwbG9hZFJlc3BvbnNlLkRhdGEpO1xuICAgICAgICAgIGF3YWl0IGFwcGx5SWFBbmRGaW5hbGl6ZShmaWxlSWQsIGRyYWZ0LCB1cGxvYWRSZXN1bHQpO1xuXG4gICAgICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJkb25lXCIpO1xuICAgICAgICAgIGF3YWl0IHJlbW92ZUNhY2hlZEltYWdlRmlsZShjYWNoZUtleSk7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XG4gICAgICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICAgICAgb25Db21wbGV0ZWQ/Lih7IGZpbGVJZCwgbGlua2VkVG9TaGVldDogbGlua1RvU2hlZXQgfSk7XG4gICAgICAgICAgfSwgMzIwKTtcbiAgICAgICAgfSBjYXRjaCAodXBsb2FkRXJyb3IpIHtcbiAgICAgICAgICBpZiAodXBsb2FkRXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XG4gICAgICAgICAgICBjb25zdCB0cmFjZUlkID0gZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IodXBsb2FkRXJyb3IpO1xuICAgICAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmlsZS11cGxvYWQtZXJyb3JcIiwgdHJhY2VJZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldFBlbmRpbmdVcGxvYWRSZXRyeSh7XG4gICAgICAgICAgICBzdHJhdGVneTogXCJpYS1yZWFkeVwiLFxuICAgICAgICAgICAgZmlsZUlkLFxuICAgICAgICAgICAgZXh0ZW5zaW9uLFxuICAgICAgICAgICAgY2FjaGVLZXksXG4gICAgICAgICAgICBkcmFmdCxcbiAgICAgICAgICAgIGZpbGVOYW1lSGludDogc2FuaXRpemVGaWxlTmFtZShmaWxlLm5hbWUpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGluZFQoXG4gICAgICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfVXBsb2FkUmV0cnlcIixcbiAgICAgICAgICAgICAgXCJUaWNrZXQgY3JlYXRlZCwgYnV0IGZpbGUgc3luYyBmYWlsZWQuIFJldHJ5IHVwbG9hZCB0byBjb21wbGV0ZSBwcm9jZXNzLlwiXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNvbHZlVWlFcnJvck1lc3NhZ2UoZXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFthZGRUcmFjZSwgYXBwbHlJYUFuZEZpbmFsaXplLCBidWlsZEFwaU9wdGlvbnMsIGNsZWFyRmxvd1N0YXRlLCBsaW5rVG9TaGVldCwgb25Db21wbGV0ZWQsIHJlc29sdmVVaUVycm9yTWVzc2FnZV1cbiAgKTtcblxuICBjb25zdCBydW5NYW51YWxDcmVhdGVGbG93ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUsIGV4dGVuc2lvbjogc3RyaW5nLCBjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBzZXRCdXN5KHRydWUpO1xuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJjcmVhdGluZ1RpY2tldFwiKTtcbiAgICAgIGNsZWFyRmxvd1N0YXRlKCk7XG4gICAgICBsZXQgY3JlYXRlZEZpbGVJZCA9IFwiXCI7XG4gICAgICBsZXQgc3RhZ2U6IFwiY3JlYXRpbmdUaWNrZXRcIiB8IFwic3luY2luZ0ZpbGVcIiB8IFwidXBsb2FkaW5nSW1hZ2VcIiB8IFwiZmluYWxpemluZ0lhXCIgPSBcImNyZWF0aW5nVGlja2V0XCI7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRvZGF5ID0gZ2V0VG9kYXlEZE1tWXl5eSgpO1xuICAgICAgICBjb25zdCBwbGFjZWhvbGRlclVybCA9IGBwZW5kaW5nOi8vdGlja2V0LXVwbG9hZC8ke3Jlc29sdmVSYW5kb21LZXkoKX1gO1xuICAgICAgICBjb25zdCBjcmVhdGVQYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRDcmVhdGVSZXF1ZXN0ID0ge1xuICAgICAgICAgIG1vZGU6IDEsXG4gICAgICAgICAgZGVzY3JpcHRpb246IHNhbml0aXplRmlsZU5hbWUoZmlsZS5uYW1lKS5yZXBsYWNlKC9cXC5bYS16MC05XSskL2ksIFwiXCIpIHx8IFwiVGlja2V0XCIsXG4gICAgICAgICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChjdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgXCJFVVJcIixcbiAgICAgICAgICB0cmFuc0RhdGU6IHRvZGF5LFxuICAgICAgICAgIGNvbWVudGFyaW86IFwiXCIsXG4gICAgICAgICAgdXJsRmlsZTogcGxhY2Vob2xkZXJVcmwsXG4gICAgICAgICAgZmlsZUV4dGVuc2lvbjogZXh0ZW5zaW9uLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBjcmVhdGVSZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldChjcmVhdGVQYXlsb2FkLCBidWlsZEFwaU9wdGlvbnMoKSk7XG4gICAgICAgIGFkZFRyYWNlKFwidGlja2V0LWNyZWF0ZS1tYW51YWxcIiwgc2FmZVRleHQoKGNyZWF0ZVJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgaWYgKGNyZWF0ZVJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQoY3JlYXRlUmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNyZWF0ZURhdGEgPSAoY3JlYXRlUmVzcG9uc2UgYXMgeyBEYXRhPzogeyBGaWxlSWQ/OiB1bmtub3duOyBmaWxlSWQ/OiB1bmtub3duIH0gfSkuRGF0YTtcbiAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoY3JlYXRlRGF0YT8uRmlsZUlkID8/IGNyZWF0ZURhdGE/LmZpbGVJZCk7XG4gICAgICAgIGlmICghZmlsZUlkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob0ZpbGVJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIHRpY2tldCBmaWxlIGlkLlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlZEZpbGVJZCA9IGZpbGVJZDtcblxuICAgICAgICBzdGFnZSA9IFwic3luY2luZ0ZpbGVcIjtcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJzeW5jaW5nRmlsZVwiKTtcbiAgICAgICAgY29uc3QgdXBsb2FkUmVzcG9uc2UgPSBhd2FpdCB1cGxvYWRFeHBlbnNlU2hlZXRUaWNrZXRGaWxlKGZpbGVJZCwgZmlsZSwgZXh0ZW5zaW9uLCBidWlsZEFwaU9wdGlvbnMoKSk7XG4gICAgICAgIGFkZFRyYWNlKFwidGlja2V0LWZpbGUtdXBsb2FkXCIsIHNhZmVUZXh0KCh1cGxvYWRSZXNwb25zZSBhcyB7IFRyYWNlSWQ/OiB1bmtub3duIH0pPy5UcmFjZUlkKSk7XG4gICAgICAgIGlmICh1cGxvYWRSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNhZmVUZXh0KHVwbG9hZFJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdXBsb2FkUmVzdWx0ID0gcmVzb2x2ZVVwbG9hZFJlc3VsdCh1cGxvYWRSZXNwb25zZS5EYXRhKTtcblxuICAgICAgICBzdGFnZSA9IFwidXBsb2FkaW5nSW1hZ2VcIjtcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJ1cGxvYWRpbmdJbWFnZVwiKTtcbiAgICAgICAgY29uc3QgaWFEcmFmdFJlc3BvbnNlID0gYXdhaXQgZXh0cmFjdEV4cGVuc2VGcm9tVGlja2V0RHJhZnQoXG4gICAgICAgICAgZmlsZSxcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICB1cGxvYWRSZXN1bHQudXJsRmlsZSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgYnVpbGRBcGlPcHRpb25zKClcbiAgICAgICAgKTtcbiAgICAgICAgYWRkVHJhY2UoXCJleHBlbnNlZnJvbXRpY2tldFwiLCBzYWZlVGV4dCgoaWFEcmFmdFJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgaWYgKGlhRHJhZnRSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNhZmVUZXh0KGlhRHJhZnRSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRyYWZ0ID0gbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZShpYURyYWZ0UmVzcG9uc2UuRGF0YSBhcyBFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlKTtcbiAgICAgICAgc3RhZ2UgPSBcImZpbmFsaXppbmdJYVwiO1xuICAgICAgICBhd2FpdCBhcHBseUlhQW5kRmluYWxpemUoZmlsZUlkLCBkcmFmdCwgdXBsb2FkUmVzdWx0KTtcblxuICAgICAgICBzZXRQcm9ncmVzc0tleShcImRvbmVcIik7XG4gICAgICAgIGF3YWl0IHJlbW92ZUNhY2hlZEltYWdlRmlsZShjYWNoZUtleSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgICBvbkNvbXBsZXRlZD8uKHsgZmlsZUlkLCBsaW5rZWRUb1NoZWV0OiBsaW5rVG9TaGVldCB9KTtcbiAgICAgICAgfSwgMzIwKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgICBjb25zdCB0cmFjZUlkID0gZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IoZXJyb3IpO1xuICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LW1hbnVhbC1lcnJvclwiLCB0cmFjZUlkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGFnZSA9PT0gXCJzeW5jaW5nRmlsZVwiICYmIGNyZWF0ZWRGaWxlSWQpIHtcbiAgICAgICAgICBzZXRQZW5kaW5nVXBsb2FkUmV0cnkoe1xuICAgICAgICAgICAgc3RyYXRlZ3k6IFwibWFudWFsLXBvc3QtdXBsb2FkLWRyYWZ0XCIsXG4gICAgICAgICAgICBmaWxlSWQ6IGNyZWF0ZWRGaWxlSWQsXG4gICAgICAgICAgICBleHRlbnNpb24sXG4gICAgICAgICAgICBjYWNoZUtleSxcbiAgICAgICAgICAgIGZpbGVOYW1lSGludDogc2FuaXRpemVGaWxlTmFtZShmaWxlLm5hbWUpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzb2x2ZVVpRXJyb3JNZXNzYWdlKGVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbYWRkVHJhY2UsIGFwcGx5SWFBbmRGaW5hbGl6ZSwgYnVpbGRBcGlPcHRpb25zLCBjbGVhckZsb3dTdGF0ZSwgY3VycmVuY3lDb2RlLCBsaW5rVG9TaGVldCwgb25Db21wbGV0ZWQsIHJlc29sdmVVaUVycm9yTWVzc2FnZV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3RlZEZpbGUgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoZmlsZTogRmlsZSB8IG51bGwsIF9zb3VyY2U6IFRpY2tldEltYWdlU291cmNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBpZiAoIWZpbGUpIHJldHVybjtcbiAgICAgIGlmICghZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uKCkpIHJldHVybjtcblxuICAgICAgY29uc3Qgc2FmZVR5cGUgPSBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAoc2FmZVR5cGUgJiYgIXNhZmVUeXBlLnN0YXJ0c1dpdGgoXCJpbWFnZS9cIikpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlVHlwZVwiLCBcIlVuc3VwcG9ydGVkIGltYWdlIGZvcm1hdC5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlKGZpbGUpKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfRmlsZVR5cGVcIiwgXCJVbnN1cHBvcnRlZCBpbWFnZSBmb3JtYXQuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGZpbGUuc2l6ZSA+IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUykge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVTaXplXCIsIFwiSW1hZ2UgZXhjZWVkcyA1ME1CIG1heCBzaXplLlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZXh0ZW5zaW9uID0gaW5mZXJFeHRlbnNpb24oZmlsZSk7XG4gICAgICBjb25zdCBjYWNoZUtleSA9IHJlc29sdmVSYW5kb21LZXkoKTtcbiAgICAgIGxhdGVzdEZpbGVSZWYuY3VycmVudCA9IHsgY2FjaGVLZXksIGZpbGUgfTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgY2FjaGVJbWFnZUZpbGUoY2FjaGVLZXksIGZpbGUpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIERvIG5vdCBibG9jayBmbG93IGlmIGJyb3dzZXIgY2FjaGUgc3RvcmFnZSBpcyB1bmF2YWlsYWJsZS5cbiAgICAgIH1cblxuICAgICAgaWYgKERFRkFVTFRfQ1JFQVRFX01PREUgPT09IFwibWFudWFsXCIpIHtcbiAgICAgICAgYXdhaXQgcnVuTWFudWFsQ3JlYXRlRmxvdyhmaWxlLCBleHRlbnNpb24sIGNhY2hlS2V5KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHJ1bklhQ3JlYXRlRmxvdyhmaWxlLCBleHRlbnNpb24sIGNhY2hlS2V5KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24sIHJ1bklhQ3JlYXRlRmxvdywgcnVuTWFudWFsQ3JlYXRlRmxvd11cbiAgKTtcblxuICBjb25zdCByZXRyeVBlbmRpbmdVcGxvYWQgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFwZW5kaW5nVXBsb2FkUmV0cnkpIHJldHVybjtcbiAgICBpZiAoIWVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbigpKSByZXR1cm47XG5cbiAgICBsZXQgc2VsZWN0ZWRGaWxlID0gbGF0ZXN0RmlsZVJlZi5jdXJyZW50Py5jYWNoZUtleSA9PT0gcGVuZGluZ1VwbG9hZFJldHJ5LmNhY2hlS2V5ID8gbGF0ZXN0RmlsZVJlZi5jdXJyZW50LmZpbGUgOiBudWxsO1xuICAgIGlmICghc2VsZWN0ZWRGaWxlKSB7XG4gICAgICBjb25zdCBibG9iID0gYXdhaXQgcmVhZENhY2hlZEltYWdlRmlsZShwZW5kaW5nVXBsb2FkUmV0cnkuY2FjaGVLZXkpO1xuICAgICAgaWYgKCFibG9iKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmV0cnlGaWxlTWlzc2luZ1wiLCBcIkNhY2hlZCBpbWFnZSBpcyBubyBsb25nZXIgYXZhaWxhYmxlLlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlbGVjdGVkRmlsZSA9IG5ldyBGaWxlKFtibG9iXSwgcGVuZGluZ1VwbG9hZFJldHJ5LmZpbGVOYW1lSGludCB8fCBcInRpY2tldC1pbWFnZVwiLCB7XG4gICAgICAgIHR5cGU6IHNhZmVUZXh0KGJsb2IudHlwZSkgfHwgXCJpbWFnZS9qcGVnXCIsXG4gICAgICB9KTtcbiAgICAgIGxhdGVzdEZpbGVSZWYuY3VycmVudCA9IHsgY2FjaGVLZXk6IHBlbmRpbmdVcGxvYWRSZXRyeS5jYWNoZUtleSwgZmlsZTogc2VsZWN0ZWRGaWxlIH07XG4gICAgfVxuXG4gICAgYXdhaXQgcmVzdW1lRnJvbVVwbG9hZFN0ZXAocGVuZGluZ1VwbG9hZFJldHJ5LCBzZWxlY3RlZEZpbGUpO1xuICB9LCBbZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uLCBwZW5kaW5nVXBsb2FkUmV0cnksIHJlc3VtZUZyb21VcGxvYWRTdGVwXSk7XG5cbiAgY29uc3Qgb3BlblNvdXJjZVBpY2tlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbigpKSByZXR1cm47XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgIHNldFNvdXJjZVBpY2tlck9wZW4odHJ1ZSk7XG4gIH0sIFtlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb25dKTtcblxuICBjb25zdCBjbG9zZVNvdXJjZVBpY2tlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xuICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xuICB9LCBbYnVzeV0pO1xuXG4gIGNvbnN0IHJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8Ym9vbGVhbiB8IG51bGw+ID0+IHtcbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgbWVkaWFEZXZpY2VzID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcztcbiAgICBpZiAoIW1lZGlhRGV2aWNlcyB8fCB0eXBlb2YgbWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBtZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgdmlkZW86IHsgZmFjaW5nTW9kZTogXCJlbnZpcm9ubWVudFwiIH0sXG4gICAgICB9KTtcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4gdHJhY2suc3RvcCgpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNlbGVjdEZyb21DYW1lcmEgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcbiAgICAgIGNvbnN0IGdyYW50ZWQgPSBhd2FpdCByZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbigpO1xuICAgICAgaWYgKGdyYW50ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfQ2FtZXJhUGVybWlzc2lvblwiLCBcIkNhbWVyYSBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkLlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xuICAgICAgaW5wdXRFbGVtZW50LmNsaWNrKCk7XG4gICAgfSxcbiAgICBbcmVxdWVzdENhbWVyYVBlcm1pc3Npb25dXG4gICk7XG5cbiAgY29uc3Qgc2VsZWN0RnJvbUdhbGxlcnkgPSB1c2VDYWxsYmFjaygoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgIGlmICghaW5wdXRFbGVtZW50KSByZXR1cm47XG4gICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XG4gICAgaW5wdXRFbGVtZW50LmNsaWNrKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckVycm9yID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgc291cmNlUGlja2VyT3BlbixcbiAgICBidXN5LFxuICAgIHByb2dyZXNzS2V5LFxuICAgIHByb2dyZXNzTWVzc2FnZSxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5OiBwZW5kaW5nVXBsb2FkUmV0cnkgIT09IG51bGwsXG4gICAgdHJhY2VMaXN0LFxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgY2xvc2VTb3VyY2VQaWNrZXIsXG4gICAgc2VsZWN0RnJvbUNhbWVyYSxcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxuICAgIGNsZWFyRXJyb3IsXG4gIH07XG59O1xuIiwgIlx1RkVGRmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlR2FzdG9UeXBlQ29kZSxcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsXG4gIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcblxuY29uc3QgVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUgPSBcImluZC1leHBlbnNlLXRpY2tldC1pbWFnZS12MVwiO1xuY29uc3QgVElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWCA9IFwiL19faW5kX2NhY2hlX18vdGlja2V0LWltYWdlL1wiO1xuY29uc3QgVElDS0VUX1RSQUNFX1NUT1JBR0VfS0VZID0gXCJleHBlbnNlX3NoZWV0X3RpY2tldF9xdWlja19mbG93X3RyYWNlX3YxXCI7XG5cbmV4cG9ydCBjb25zdCBNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMgPSA1MCAqIDEwMjQgKiAxMDI0O1xuY29uc3QgQUxMT1dFRF9USUNLRVRfSU1BR0VfTUlNRV9UWVBFUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJpbWFnZS9qcGVnXCIsIFwiaW1hZ2UvanBnXCIsIFwiaW1hZ2UvcG5nXCIsIFwiaW1hZ2Uvd2VicFwiXSk7XG5jb25zdCBBTExPV0VEX1RJQ0tFVF9JTUFHRV9FWFRFTlNJT05TID0gbmV3IFNldDxzdHJpbmc+KFtcImpwZ1wiLCBcImpwZWdcIiwgXCJwbmdcIiwgXCJ3ZWJwXCJdKTtcbmNvbnN0IFRJQ0tFVF9NSU1FX1RPX0VYVEVOU0lPTjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgXCJpbWFnZS9qcGVnXCI6IFwianBnXCIsXG4gIFwiaW1hZ2UvanBnXCI6IFwianBnXCIsXG4gIFwiaW1hZ2UvcG5nXCI6IFwicG5nXCIsXG4gIFwiaW1hZ2Uvd2VicFwiOiBcIndlYnBcIixcbn07XG5jb25zdCBBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcbmNvbnN0IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEUgPSA4O1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ1JFQVRFX01PREUgPSBcIm1hbnVhbFwiIGFzIFwiaWFcIiB8IFwibWFudWFsXCI7XG5cbmV4cG9ydCB0eXBlIFRpY2tldEltYWdlU291cmNlID0gXCJjYW1lcmFcIiB8IFwiZ2FsbGVyeVwiO1xuXG5leHBvcnQgdHlwZSBUaWNrZXRUcmFjZUVudHJ5ID0ge1xuICBzdGVwOiBzdHJpbmc7XG4gIHRyYWNlSWQ6IHN0cmluZztcbiAgYXQ6IHN0cmluZztcbn07XG5cbnR5cGUgTm9ybWFsaXplZERyYWZ0TGluZSA9IHtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHR5cGVWYWx1ZTogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBxdHk6IG51bWJlcjtcbiAgcHJpY2U6IG51bWJlcjtcbiAgdG90YWxBbW91bnQ6IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIE5vcm1hbGl6ZWREcmFmdCA9IHtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBjb21lbnRhcmlvOiBzdHJpbmc7XG4gIGdhc3RvVHlwZTogbnVtYmVyIHwgbnVsbDtcbiAgbGluZXM6IE5vcm1hbGl6ZWREcmFmdExpbmVbXTtcbn07XG5cbmV4cG9ydCB0eXBlIFBlbmRpbmdVcGxvYWRSZXRyeSA9XG4gIHwge1xuICAgICAgc3RyYXRlZ3k6IFwiaWEtcmVhZHlcIjtcbiAgICAgIGZpbGVJZDogc3RyaW5nO1xuICAgICAgZXh0ZW5zaW9uOiBzdHJpbmc7XG4gICAgICBjYWNoZUtleTogc3RyaW5nO1xuICAgICAgZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdDtcbiAgICAgIGZpbGVOYW1lSGludDogc3RyaW5nO1xuICAgIH1cbiAgfCB7XG4gICAgICBzdHJhdGVneTogXCJtYW51YWwtcG9zdC11cGxvYWQtZHJhZnRcIjtcbiAgICAgIGZpbGVJZDogc3RyaW5nO1xuICAgICAgZXh0ZW5zaW9uOiBzdHJpbmc7XG4gICAgICBjYWNoZUtleTogc3RyaW5nO1xuICAgICAgZmlsZU5hbWVIaW50OiBzdHJpbmc7XG4gICAgfTtcblxuZXhwb3J0IHR5cGUgVXBsb2FkU3luY1Jlc3VsdCA9IHtcbiAgdXJsRmlsZTogc3RyaW5nO1xuICBmaWxlTmFtZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncyA9IHtcbiAgc2hlZXRJZD86IHN0cmluZztcbiAgcHJvamVjdElkPzogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNTaGVldExvY2tlZDogYm9vbGVhbjtcbiAgbGlua1RvU2hlZXQ/OiBib29sZWFuO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbiAgb25Db21wbGV0ZWQ/OiAocmVzdWx0OiB7IGZpbGVJZDogc3RyaW5nOyBsaW5rZWRUb1NoZWV0OiBib29sZWFuIH0pID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBRdWlja0Zsb3dQcm9ncmVzc0tleSA9XG4gIHwgXCJ1cGxvYWRpbmdJbWFnZVwiXG4gIHwgXCJjcmVhdGluZ1RpY2tldFwiXG4gIHwgXCJzeW5jaW5nRmlsZVwiXG4gIHwgXCJmaW5hbGl6aW5nSWFcIlxuICB8IFwibGlua2luZ0V4cGVuc2VMaW5lXCJcbiAgfCBcImRvbmVcIjtcblxuY29uc3QgYXNSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9PiB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4ge307XG4gIHJldHVybiB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn07XG5cbmNvbnN0IGdldEZpcnN0RGVmaW5lZCA9IChyZWNvcmQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBrZXlzOiBzdHJpbmdbXSk6IHVua25vd24gPT4ge1xuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgaWYgKGtleSBpbiByZWNvcmQpIHtcbiAgICAgIHJldHVybiByZWNvcmRba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHRvTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IHRvUG9zaXRpdmVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdW1iZXIodmFsdWUpO1xuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIHBhcnNlZCA+IDAgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgdG9EZE1tWXl5eSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eSh2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VG9kYXlEZE1tWXl5eSA9ICgpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdG9EZE1tWXl5eShuZXcgRGF0ZSgpKTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwgfHwgIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuY29uc3Qgbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24gPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtejAtOV0vZywgXCJcIik7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIFwiXCI7XG4gIGlmIChub3JtYWxpemVkID09PSBcImpwZWdcIikgcmV0dXJuIFwianBnXCI7XG4gIHJldHVybiBBTExPV0VEX1RJQ0tFVF9JTUFHRV9FWFRFTlNJT05TLmhhcyhub3JtYWxpemVkKSA/IG5vcm1hbGl6ZWQgOiBcIlwiO1xufTtcblxuY29uc3QgcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZSA9IChmaWxlOiBGaWxlKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZnJvbU5hbWUgPSBzYWZlVGV4dChmaWxlLm5hbWUpLnNwbGl0KFwiLlwiKS5wb3AoKSB8fCBcIlwiO1xuICByZXR1cm4gbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24oZnJvbU5hbWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGluZmVyRXh0ZW5zaW9uID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB0eXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBmcm9tTWltZSA9IFRJQ0tFVF9NSU1FX1RPX0VYVEVOU0lPTlt0eXBlXTtcbiAgaWYgKGZyb21NaW1lKSByZXR1cm4gZnJvbU1pbWU7XG5cbiAgY29uc3QgZnJvbU5hbWUgPSByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lKGZpbGUpO1xuICBpZiAoZnJvbU5hbWUpIHJldHVybiBmcm9tTmFtZTtcblxuICByZXR1cm4gXCJqcGdcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1N1cHBvcnRlZFRpY2tldEltYWdlRmlsZSA9IChmaWxlOiBGaWxlKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUeXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAobm9ybWFsaXplZFR5cGUpIHtcbiAgICByZXR1cm4gQUxMT1dFRF9USUNLRVRfSU1BR0VfTUlNRV9UWVBFUy5oYXMobm9ybWFsaXplZFR5cGUpO1xuICB9XG5cbiAgY29uc3QgZXh0ZW5zaW9uID0gcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZShmaWxlKTtcbiAgcmV0dXJuICEhZXh0ZW5zaW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVSYW5kb21LZXkgPSAoKTogc3RyaW5nID0+IHtcbiAgaWYgKHR5cGVvZiBjcnlwdG8gIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNyeXB0by5yYW5kb21VVUlEID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gY3J5cHRvLnJhbmRvbVVVSUQoKTtcbiAgfVxuICByZXR1cm4gYCR7RGF0ZS5ub3coKX0tJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCAxMCl9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUZpbGVOYW1lID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBiYXNlID0gc2FmZVRleHQodmFsdWUpLnJlcGxhY2UoL1s8PjpcIi9cXFxcfD8qXFx1MDAwMC1cXHUwMDFGXS9nLCBcIl9cIik7XG4gIHJldHVybiBiYXNlIHx8IFwidGlja2V0LWltYWdlXCI7XG59O1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IgPSAoZXJyb3I6IEFwaUZldGNoRXJyb3IpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwYXlsb2FkID0gc2FmZVRleHQoZXJyb3IucmVzcG9uc2VCb2R5KTtcbiAgaWYgKCFwYXlsb2FkKSByZXR1cm4gXCJcIjtcbiAgdHJ5IHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShwYXlsb2FkKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICBjb25zdCB0cmFjZUlkID0gc2FmZVRleHQoanNvbi5UcmFjZUlkID8/IGpzb24udHJhY2VJZCk7XG4gICAgcmV0dXJuIHRyYWNlSWQ7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZSA9IChyYXdEYXRhOiB1bmtub3duKTogTm9ybWFsaXplZERyYWZ0ID0+IHtcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJhd0RhdGEpO1xuICBjb25zdCBkcmFmdERlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKTtcbiAgY29uc3QgZHJhZnRDdXJyZW5jeSA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJjdXJyZW5jeUNvZGVcIiwgXCJDdXJyZW5jeUNvZGVcIl0pKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBkcmFmdFRvdGFsQW1vdW50ID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQoZGF0YSwgW1widG90YWxBbW91bnRcIiwgXCJUb3RhbEFtb3VudFwiXSkpIHx8IDA7XG4gIGNvbnN0IGRyYWZ0VHJhbnNEYXRlID0gdG9EZE1tWXl5eShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1widHJhbnNEYXRlXCIsIFwiVHJhbnNEYXRlXCJdKSkgfHwgZ2V0VG9kYXlEZE1tWXl5eSgpO1xuICBjb25zdCBkcmFmdENvbW1lbnQgPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiY29tZW50YXJpb1wiLCBcIkNvbWVudGFyaW9cIl0pKTtcbiAgY29uc3QgZHJhZnRHYXN0b1R5cGUgPSBub3JtYWxpemVHYXN0b1R5cGUoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImdhc3RvVHlwZVwiLCBcIkdhc3RvVHlwZVwiXSkpO1xuXG4gIGNvbnN0IHJhd0xpbmVzID0gZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImxpbmVzXCIsIFwiTGluZXNcIl0pO1xuICBjb25zdCBsaW5lQXJyYXkgPSBBcnJheS5pc0FycmF5KHJhd0xpbmVzKSA/IHJhd0xpbmVzIDogW107XG5cbiAgY29uc3QgbGluZXM6IE5vcm1hbGl6ZWREcmFmdExpbmVbXSA9IGxpbmVBcnJheVxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBsaW5lUmVjb3JkID0gYXNSZWNvcmQoZW50cnkpO1xuICAgICAgY29uc3QgcXR5ID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1wicXR5XCIsIFwiUXR5XCJdKSkgfHwgMTtcbiAgICAgIGNvbnN0IHByaWNlID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1wicHJpY2VcIiwgXCJQcmljZVwiXSkpIHx8IDA7XG4gICAgICBjb25zdCBleHBsaWNpdFRvdGFsID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widG90YWxBbW91bnRcIiwgXCJUb3RhbEFtb3VudFwiXSkpIHx8IDA7XG4gICAgICBjb25zdCBjb21wdXRlZFRvdGFsID0gZXhwbGljaXRUb3RhbCA+IDAgPyBleHBsaWNpdFRvdGFsIDogcXR5ICogcHJpY2U7XG4gICAgICBpZiAoIShjb21wdXRlZFRvdGFsID4gMCkpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBjYW5kaWRhdGVUeXBlVmFsdWUgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0eXBlVmFsdWVcIiwgXCJUeXBlVmFsdWVcIl0pKTtcbiAgICAgIGNvbnN0IHNhZmVUeXBlVmFsdWUgPSBOdW1iZXIuaXNJbnRlZ2VyKGNhbmRpZGF0ZVR5cGVWYWx1ZSkgPyBOdW1iZXIoY2FuZGlkYXRlVHlwZVZhbHVlKSA6IG51bGw7XG4gICAgICBjb25zdCB0eXBlVmFsdWUgPSBzYWZlVHlwZVZhbHVlICYmIHNhZmVUeXBlVmFsdWUgPiAwID8gc2FmZVR5cGVWYWx1ZSA6IGRyYWZ0R2FzdG9UeXBlIHx8IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJkZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCJdKSkgfHwgZHJhZnREZXNjcmlwdGlvbjtcbiAgICAgIGNvbnN0IHRyYW5zRGF0ZSA9IHRvRGRNbVl5eXkoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInRyYW5zRGF0ZVwiLCBcIlRyYW5zRGF0ZVwiXSkpIHx8IGRyYWZ0VHJhbnNEYXRlO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIHR5cGVWYWx1ZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IFwiVGlja2V0XCIsXG4gICAgICAgIHF0eSxcbiAgICAgICAgcHJpY2U6IHByaWNlID4gMCA/IHByaWNlIDogY29tcHV0ZWRUb3RhbCxcbiAgICAgICAgdG90YWxBbW91bnQ6IGNvbXB1dGVkVG90YWwsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBOb3JtYWxpemVkRHJhZnRMaW5lID0+IGVudHJ5ICE9PSBudWxsKTtcblxuICByZXR1cm4ge1xuICAgIGRlc2NyaXB0aW9uOiBkcmFmdERlc2NyaXB0aW9uIHx8IFwiVGlja2V0XCIsXG4gICAgY3VycmVuY3lDb2RlOiBkcmFmdEN1cnJlbmN5IHx8IFwiRVVSXCIsXG4gICAgdG90YWxBbW91bnQ6IGRyYWZ0VG90YWxBbW91bnQgPiAwID8gZHJhZnRUb3RhbEFtb3VudCA6IGxpbmVzLnJlZHVjZSgoc3VtLCBsaW5lKSA9PiBzdW0gKyBsaW5lLnRvdGFsQW1vdW50LCAwKSxcbiAgICB0cmFuc0RhdGU6IGRyYWZ0VHJhbnNEYXRlLFxuICAgIGNvbWVudGFyaW86IGRyYWZ0Q29tbWVudCxcbiAgICBnYXN0b1R5cGU6IGRyYWZ0R2FzdG9UeXBlLFxuICAgIGxpbmVzLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVUaWNrZXRGaWxlSWRGcm9tRHJhZnRSZXNwb25zZSA9IChyYXdEYXRhOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJhd0RhdGEpO1xuICBjb25zdCBjcmVhdGlvblJhdyA9IGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJUaWNrZXRDcmVhdGlvblwiLCBcInRpY2tldENyZWF0aW9uXCJdKTtcbiAgY29uc3QgY3JlYXRpb24gPSBhc1JlY29yZChjcmVhdGlvblJhdyk7XG4gIHJldHVybiBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoY3JlYXRpb24sIFtcIkZpbGVJZFwiLCBcImZpbGVJZFwiXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVVcGxvYWRSZXN1bHQgPSAocmVzcG9uc2VEYXRhOiB1bmtub3duKTogVXBsb2FkU3luY1Jlc3VsdCA9PiB7XG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyZXNwb25zZURhdGEpO1xuICByZXR1cm4ge1xuICAgIHVybEZpbGU6IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJVcmxGaWxlXCIsIFwidXJsRmlsZVwiXSkpLFxuICAgIGZpbGVOYW1lOiBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiRmlsZU5hbWVcIiwgXCJmaWxlTmFtZVwiXSkpLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkVGlja2V0SWFQYXlsb2FkID0gKGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQsIHVwbG9hZDogVXBsb2FkU3luY1Jlc3VsdCk6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9PiB7XG4gIGNvbnN0IGlhTGluZXMgPSBkcmFmdC5saW5lcy5tYXAoKGxpbmUpID0+ICh7XG4gICAgZGVzY3JpcHRpb246IGxpbmUuZGVzY3JpcHRpb24sXG4gICAgcXR5OiBsaW5lLnF0eSxcbiAgICBwcmljZTogbGluZS5wcmljZSxcbiAgICB0b3RhbEFtb3VudDogbGluZS50b3RhbEFtb3VudCxcbiAgfSkpO1xuXG4gIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9IHtcbiAgICBkZXNjcmlwdGlvbjogZHJhZnQuZGVzY3JpcHRpb24sXG4gICAgY3VycmVuY3lDb2RlOiBkcmFmdC5jdXJyZW5jeUNvZGUsXG4gICAgdG90YWxBbW91bnQ6IGRyYWZ0LnRvdGFsQW1vdW50ID4gMCA/IGRyYWZ0LnRvdGFsQW1vdW50IDogdW5kZWZpbmVkLFxuICAgIHRyYW5zRGF0ZTogZHJhZnQudHJhbnNEYXRlLFxuICAgIGNvbWVudGFyaW86IGRyYWZ0LmNvbWVudGFyaW8gfHwgdW5kZWZpbmVkLFxuICAgIHVybEZpbGU6IHVwbG9hZC51cmxGaWxlIHx8IHVuZGVmaW5lZCxcbiAgICBmaWxlTmFtZTogdXBsb2FkLmZpbGVOYW1lIHx8IHVuZGVmaW5lZCxcbiAgICBsaW5lczogaWFMaW5lcyxcbiAgfTtcblxuICBpZiAoZHJhZnQuZ2FzdG9UeXBlICE9PSBudWxsKSB7XG4gICAgcGF5bG9hZC5nYXN0b1R5cGUgPSBkcmFmdC5nYXN0b1R5cGUgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZFNoZWV0TGluZVBheWxvYWQgPSAoXG4gIGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQsXG4gIGZpbGVJZDogc3RyaW5nLFxuICBwcm9qZWN0SWQ6IHN0cmluZ1xuKTogRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QgfCBudWxsID0+IHtcbiAgY29uc3QgbGluZUZyb21EcmFmdCA9IGRyYWZ0LmxpbmVzWzBdO1xuICAvLyBCdWlsZCBhIHNpbmdsZSBleHBlbnNlIGxpbmUgZnJvbSB0aWNrZXQgaGVhZGVyIGRhdGEgdG8gYXZvaWQgbGluZS1sZXZlbCBkZXNjcmlwdGlvbiBsZWFrYWdlLlxuICBjb25zdCBoZWFkZXJUb3RhbCA9IGRyYWZ0LnRvdGFsQW1vdW50ID4gMCA/IGRyYWZ0LnRvdGFsQW1vdW50IDogMDtcbiAgY29uc3QgZmFsbGJhY2tUb3RhbCA9IGxpbmVGcm9tRHJhZnQ/LnRvdGFsQW1vdW50IHx8IDA7XG4gIGNvbnN0IGVmZmVjdGl2ZVRvdGFsID0gaGVhZGVyVG90YWwgPiAwID8gaGVhZGVyVG90YWwgOiBmYWxsYmFja1RvdGFsO1xuICBpZiAoIShlZmZlY3RpdmVUb3RhbCA+IDApKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCB0eXBlVmFsdWVDYW5kaWRhdGUgPSBkcmFmdC5nYXN0b1R5cGUgfHwgbGluZUZyb21EcmFmdD8udHlwZVZhbHVlIHx8IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XG4gIGNvbnN0IHNhZmVUeXBlVmFsdWUgPSBOdW1iZXIodHlwZVZhbHVlQ2FuZGlkYXRlKTtcbiAgY29uc3QgdHlwZVZhbHVlID0gTnVtYmVyLmlzSW50ZWdlcihzYWZlVHlwZVZhbHVlKSAmJiBzYWZlVHlwZVZhbHVlID4gMCA/IHNhZmVUeXBlVmFsdWUgOiBERUZBVUxUX1RJQ0tFVF9HQVNUT19UWVBFO1xuXG4gIHJldHVybiB7XG4gICAgdHJhbnNEYXRlOiBkcmFmdC50cmFuc0RhdGUgfHwgbGluZUZyb21EcmFmdD8udHJhbnNEYXRlIHx8IGdldFRvZGF5RGRNbVl5eXkoKSxcbiAgICB0eXBlVmFsdWUsXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGRyYWZ0LmRlc2NyaXB0aW9uKSB8fCBcIlRpY2tldFwiLFxuICAgIGludGVybmFjaW9uYWw6IGZhbHNlLFxuICAgIGZpbGVJZCxcbiAgICB0aWNrZXQ6IHRydWUsXG4gICAgcXR5OiAxLFxuICAgIHByaWNlOiBlZmZlY3RpdmVUb3RhbCxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHByb2plY3RJZCkgfHwgdW5kZWZpbmVkLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHBlcnNpc3RUcmFjZUxpc3QgPSAodHJhY2VMaXN0OiBUaWNrZXRUcmFjZUVudHJ5W10pOiB2b2lkID0+IHtcbiAgdHJ5IHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRJQ0tFVF9UUkFDRV9TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkodHJhY2VMaXN0KSk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIElnbm9yZSBzdG9yYWdlIGZhaWx1cmVzIGluIHJlc3RyaWN0ZWQgYnJvd3NlciBjb250ZXh0cy5cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNhY2hlSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcsIGZpbGU6IEZpbGUpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybjtcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xuICBhd2FpdCBjYWNoZS5wdXQoXG4gICAgbmV3IFJlcXVlc3QocmVxdWVzdFVybCksXG4gICAgbmV3IFJlc3BvbnNlKGZpbGUsIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogc2FmZVRleHQoZmlsZS50eXBlKSB8fCBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiLFxuICAgICAgfSxcbiAgICB9KVxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlYWRDYWNoZWRJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZyk6IFByb21pc2U8QmxvYiB8IG51bGw+ID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybiBudWxsO1xuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XG4gIGNvbnN0IGNhY2hlZFJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2gocmVxdWVzdFVybCk7XG4gIGlmICghY2FjaGVkUmVzcG9uc2UpIHJldHVybiBudWxsO1xuICByZXR1cm4gY2FjaGVkUmVzcG9uc2UuYmxvYigpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUNhY2hlZEltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICEoXCJjYWNoZXNcIiBpbiB3aW5kb3cpKSByZXR1cm47XG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcbiAgYXdhaXQgY2FjaGUuZGVsZXRlKHJlcXVlc3RVcmwpO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFDLG1CQUF1RDs7O0FDVXhELElBQU0sMEJBQTBCO0FBQ2hDLElBQU0sNEJBQTRCO0FBQ2xDLElBQU0sMkJBQTJCO0FBRTFCLElBQU0sOEJBQThCLEtBQUssT0FBTztBQUN2RCxJQUFNLGtDQUFrQyxvQkFBSSxJQUFZLENBQUMsY0FBYyxhQUFhLGFBQWEsWUFBWSxDQUFDO0FBQzlHLElBQU0sa0NBQWtDLG9CQUFJLElBQVksQ0FBQyxPQUFPLFFBQVEsT0FBTyxNQUFNLENBQUM7QUFDdEYsSUFBTSwyQkFBbUQ7QUFBQSxFQUN2RCxjQUFjO0FBQUEsRUFDZCxhQUFhO0FBQUEsRUFDYixhQUFhO0FBQUEsRUFDYixjQUFjO0FBQ2hCO0FBQ0EsSUFBTSw2QkFBNkIsb0JBQUksSUFBWSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNsRixJQUFNLDRCQUE0QjtBQUMzQixJQUFNLHNCQUFzQjtBQXdFbkMsSUFBTSxXQUFXLENBQUMsVUFBNEM7QUFDNUQsTUFBSSxDQUFDLFNBQVMsT0FBTyxVQUFVLFNBQVUsUUFBTyxDQUFDO0FBQ2pELFNBQU87QUFDVDtBQUVBLElBQU0sa0JBQWtCLENBQUMsUUFBaUMsU0FBNEI7QUFDcEYsYUFBVyxPQUFPLE1BQU07QUFDdEIsUUFBSSxPQUFPLFFBQVE7QUFDakIsYUFBTyxPQUFPLEdBQUc7QUFBQSxJQUNuQjtBQUFBLEVBQ0Y7QUFDQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLFdBQVcsQ0FBQyxVQUFrQztBQUNsRCxNQUFJLFVBQVUsUUFBUSxVQUFVLE9BQVcsUUFBTztBQUNsRCxRQUFNLFNBQVMsT0FBTyxLQUFLO0FBQzNCLFNBQU8sT0FBTyxTQUFTLE1BQU0sSUFBSSxTQUFTO0FBQzVDO0FBRUEsSUFBTSxtQkFBbUIsQ0FBQyxVQUFrQztBQUMxRCxRQUFNLFNBQVMsU0FBUyxLQUFLO0FBQzdCLFNBQU8sV0FBVyxRQUFRLFNBQVMsSUFBSSxTQUFTO0FBQ2xEO0FBRUEsSUFBTSxhQUFhLENBQUMsVUFBMkI7QUFDN0MsU0FBTyxxQkFBcUIsS0FBSztBQUNuQztBQUVPLElBQU0sbUJBQW1CLE1BQWM7QUFDNUMsU0FBTyxXQUFXLG9CQUFJLEtBQUssQ0FBQztBQUM5QjtBQUVBLElBQU0scUJBQXFCLENBQUMsVUFBa0M7QUFDNUQsUUFBTSxTQUFTLFNBQVMsS0FBSztBQUM3QixNQUFJLFdBQVcsUUFBUSxDQUFDLE9BQU8sVUFBVSxNQUFNLEtBQUssQ0FBQywyQkFBMkIsSUFBSSxNQUFNLEdBQUc7QUFDM0YsV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLDBCQUEwQixDQUFDLFVBQTBCO0FBQ3pELFFBQU0sYUFBYSxTQUFTLEtBQUssRUFBRSxZQUFZLEVBQUUsUUFBUSxjQUFjLEVBQUU7QUFDekUsTUFBSSxDQUFDLFdBQVksUUFBTztBQUN4QixNQUFJLGVBQWUsT0FBUSxRQUFPO0FBQ2xDLFNBQU8sZ0NBQWdDLElBQUksVUFBVSxJQUFJLGFBQWE7QUFDeEU7QUFFQSxJQUFNLCtCQUErQixDQUFDLFNBQXVCO0FBQzNELFFBQU0sV0FBVyxTQUFTLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxFQUFFLElBQUksS0FBSztBQUN6RCxTQUFPLHdCQUF3QixRQUFRO0FBQ3pDO0FBRU8sSUFBTSxpQkFBaUIsQ0FBQyxTQUF1QjtBQUNwRCxRQUFNLE9BQU8sU0FBUyxLQUFLLElBQUksRUFBRSxZQUFZO0FBQzdDLFFBQU0sV0FBVyx5QkFBeUIsSUFBSTtBQUM5QyxNQUFJLFNBQVUsUUFBTztBQUVyQixRQUFNLFdBQVcsNkJBQTZCLElBQUk7QUFDbEQsTUFBSSxTQUFVLFFBQU87QUFFckIsU0FBTztBQUNUO0FBRU8sSUFBTSw2QkFBNkIsQ0FBQyxTQUF3QjtBQUNqRSxRQUFNLGlCQUFpQixTQUFTLEtBQUssSUFBSSxFQUFFLFlBQVk7QUFDdkQsTUFBSSxnQkFBZ0I7QUFDbEIsV0FBTyxnQ0FBZ0MsSUFBSSxjQUFjO0FBQUEsRUFDM0Q7QUFFQSxRQUFNLFlBQVksNkJBQTZCLElBQUk7QUFDbkQsU0FBTyxDQUFDLENBQUM7QUFDWDtBQUVPLElBQU0sbUJBQW1CLE1BQWM7QUFDNUMsTUFBSSxPQUFPLFdBQVcsZUFBZSxPQUFPLE9BQU8sZUFBZSxZQUFZO0FBQzVFLFdBQU8sT0FBTyxXQUFXO0FBQUEsRUFDM0I7QUFDQSxTQUFPLEdBQUcsS0FBSyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2pFO0FBRU8sSUFBTSxtQkFBbUIsQ0FBQyxVQUEwQjtBQUN6RCxRQUFNLE9BQU8sU0FBUyxLQUFLLEVBQUUsUUFBUSw4QkFBOEIsR0FBRztBQUN0RSxTQUFPLFFBQVE7QUFDakI7QUFFTyxJQUFNLDBCQUEwQixDQUFDLFVBQWlDO0FBQ3ZFLFFBQU0sVUFBVSxTQUFTLE1BQU0sWUFBWTtBQUMzQyxNQUFJLENBQUMsUUFBUyxRQUFPO0FBQ3JCLE1BQUk7QUFDRixVQUFNLE9BQU8sS0FBSyxNQUFNLE9BQU87QUFDL0IsVUFBTSxVQUFVLFNBQVMsS0FBSyxXQUFXLEtBQUssT0FBTztBQUNyRCxXQUFPO0FBQUEsRUFDVCxRQUFRO0FBQ04sV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUVPLElBQU0sK0JBQStCLENBQUMsWUFBc0M7QUFDakYsUUFBTSxPQUFPLFNBQVMsT0FBTztBQUM3QixRQUFNLG1CQUFtQixTQUFTLGdCQUFnQixNQUFNLENBQUMsZUFBZSxhQUFhLENBQUMsQ0FBQztBQUN2RixRQUFNLGdCQUFnQixTQUFTLGdCQUFnQixNQUFNLENBQUMsZ0JBQWdCLGNBQWMsQ0FBQyxDQUFDLEVBQUUsWUFBWTtBQUNwRyxRQUFNLG1CQUFtQixpQkFBaUIsZ0JBQWdCLE1BQU0sQ0FBQyxlQUFlLGFBQWEsQ0FBQyxDQUFDLEtBQUs7QUFDcEcsUUFBTSxpQkFBaUIsV0FBVyxnQkFBZ0IsTUFBTSxDQUFDLGFBQWEsV0FBVyxDQUFDLENBQUMsS0FBSyxpQkFBaUI7QUFDekcsUUFBTSxlQUFlLFNBQVMsZ0JBQWdCLE1BQU0sQ0FBQyxjQUFjLFlBQVksQ0FBQyxDQUFDO0FBQ2pGLFFBQU0saUJBQWlCLG1CQUFtQixnQkFBZ0IsTUFBTSxDQUFDLGFBQWEsV0FBVyxDQUFDLENBQUM7QUFFM0YsUUFBTSxXQUFXLGdCQUFnQixNQUFNLENBQUMsU0FBUyxPQUFPLENBQUM7QUFDekQsUUFBTSxZQUFZLE1BQU0sUUFBUSxRQUFRLElBQUksV0FBVyxDQUFDO0FBRXhELFFBQU0sUUFBK0IsVUFDbEMsSUFBSSxDQUFDLFVBQVU7QUFDZCxVQUFNLGFBQWEsU0FBUyxLQUFLO0FBQ2pDLFVBQU0sTUFBTSxpQkFBaUIsZ0JBQWdCLFlBQVksQ0FBQyxPQUFPLEtBQUssQ0FBQyxDQUFDLEtBQUs7QUFDN0UsVUFBTSxRQUFRLGlCQUFpQixnQkFBZ0IsWUFBWSxDQUFDLFNBQVMsT0FBTyxDQUFDLENBQUMsS0FBSztBQUNuRixVQUFNLGdCQUFnQixpQkFBaUIsZ0JBQWdCLFlBQVksQ0FBQyxlQUFlLGFBQWEsQ0FBQyxDQUFDLEtBQUs7QUFDdkcsVUFBTSxnQkFBZ0IsZ0JBQWdCLElBQUksZ0JBQWdCLE1BQU07QUFDaEUsUUFBSSxFQUFFLGdCQUFnQixHQUFJLFFBQU87QUFFakMsVUFBTSxxQkFBcUIsaUJBQWlCLGdCQUFnQixZQUFZLENBQUMsYUFBYSxXQUFXLENBQUMsQ0FBQztBQUNuRyxVQUFNLGdCQUFnQixPQUFPLFVBQVUsa0JBQWtCLElBQUksT0FBTyxrQkFBa0IsSUFBSTtBQUMxRixVQUFNLFlBQVksaUJBQWlCLGdCQUFnQixJQUFJLGdCQUFnQixrQkFBa0I7QUFDekYsVUFBTSxjQUFjLFNBQVMsZ0JBQWdCLFlBQVksQ0FBQyxlQUFlLGFBQWEsQ0FBQyxDQUFDLEtBQUs7QUFDN0YsVUFBTSxZQUFZLFdBQVcsZ0JBQWdCLFlBQVksQ0FBQyxhQUFhLFdBQVcsQ0FBQyxDQUFDLEtBQUs7QUFFekYsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBO0FBQUEsTUFDQSxhQUFhLGVBQWU7QUFBQSxNQUM1QjtBQUFBLE1BQ0EsT0FBTyxRQUFRLElBQUksUUFBUTtBQUFBLE1BQzNCLGFBQWE7QUFBQSxJQUNmO0FBQUEsRUFDRixDQUFDLEVBQ0EsT0FBTyxDQUFDLFVBQXdDLFVBQVUsSUFBSTtBQUVqRSxTQUFPO0FBQUEsSUFDTCxhQUFhLG9CQUFvQjtBQUFBLElBQ2pDLGNBQWMsaUJBQWlCO0FBQUEsSUFDL0IsYUFBYSxtQkFBbUIsSUFBSSxtQkFBbUIsTUFBTSxPQUFPLENBQUMsS0FBSyxTQUFTLE1BQU0sS0FBSyxhQUFhLENBQUM7QUFBQSxJQUM1RyxXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsSUFDWixXQUFXO0FBQUEsSUFDWDtBQUFBLEVBQ0Y7QUFDRjtBQUVPLElBQU0sdUNBQXVDLENBQUMsWUFBNkI7QUFDaEYsUUFBTSxPQUFPLFNBQVMsT0FBTztBQUM3QixRQUFNLGNBQWMsZ0JBQWdCLE1BQU0sQ0FBQyxrQkFBa0IsZ0JBQWdCLENBQUM7QUFDOUUsUUFBTSxXQUFXLFNBQVMsV0FBVztBQUNyQyxTQUFPLFNBQVMsZ0JBQWdCLFVBQVUsQ0FBQyxVQUFVLFFBQVEsQ0FBQyxDQUFDO0FBQ2pFO0FBRU8sSUFBTSxzQkFBc0IsQ0FBQyxpQkFBNEM7QUFDOUUsUUFBTSxPQUFPLFNBQVMsWUFBWTtBQUNsQyxTQUFPO0FBQUEsSUFDTCxTQUFTLFNBQVMsZ0JBQWdCLE1BQU0sQ0FBQyxXQUFXLFNBQVMsQ0FBQyxDQUFDO0FBQUEsSUFDL0QsVUFBVSxTQUFTLGdCQUFnQixNQUFNLENBQUMsWUFBWSxVQUFVLENBQUMsQ0FBQztBQUFBLEVBQ3BFO0FBQ0Y7QUFFTyxJQUFNLHVCQUF1QixDQUFDLE9BQXdCLFdBQTBEO0FBQ3JILFFBQU0sVUFBVSxNQUFNLE1BQU0sSUFBSSxDQUFDLFVBQVU7QUFBQSxJQUN6QyxhQUFhLEtBQUs7QUFBQSxJQUNsQixLQUFLLEtBQUs7QUFBQSxJQUNWLE9BQU8sS0FBSztBQUFBLElBQ1osYUFBYSxLQUFLO0FBQUEsRUFDcEIsRUFBRTtBQUVGLFFBQU0sVUFBdUM7QUFBQSxJQUMzQyxhQUFhLE1BQU07QUFBQSxJQUNuQixjQUFjLE1BQU07QUFBQSxJQUNwQixhQUFhLE1BQU0sY0FBYyxJQUFJLE1BQU0sY0FBYztBQUFBLElBQ3pELFdBQVcsTUFBTTtBQUFBLElBQ2pCLFlBQVksTUFBTSxjQUFjO0FBQUEsSUFDaEMsU0FBUyxPQUFPLFdBQVc7QUFBQSxJQUMzQixVQUFVLE9BQU8sWUFBWTtBQUFBLElBQzdCLE9BQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxNQUFNLGNBQWMsTUFBTTtBQUM1QixZQUFRLFlBQVksTUFBTTtBQUFBLEVBQzVCO0FBRUEsU0FBTztBQUNUO0FBRU8sSUFBTSx3QkFBd0IsQ0FDbkMsT0FDQSxRQUNBLGNBQ3lDO0FBQ3pDLFFBQU0sZ0JBQWdCLE1BQU0sTUFBTSxDQUFDO0FBRW5DLFFBQU0sY0FBYyxNQUFNLGNBQWMsSUFBSSxNQUFNLGNBQWM7QUFDaEUsUUFBTSxnQkFBZ0IsZUFBZSxlQUFlO0FBQ3BELFFBQU0saUJBQWlCLGNBQWMsSUFBSSxjQUFjO0FBQ3ZELE1BQUksRUFBRSxpQkFBaUIsR0FBSSxRQUFPO0FBRWxDLFFBQU0scUJBQXFCLE1BQU0sYUFBYSxlQUFlLGFBQWE7QUFDMUUsUUFBTSxnQkFBZ0IsT0FBTyxrQkFBa0I7QUFDL0MsUUFBTSxZQUFZLE9BQU8sVUFBVSxhQUFhLEtBQUssZ0JBQWdCLElBQUksZ0JBQWdCO0FBRXpGLFNBQU87QUFBQSxJQUNMLFdBQVcsTUFBTSxhQUFhLGVBQWUsYUFBYSxpQkFBaUI7QUFBQSxJQUMzRTtBQUFBLElBQ0EsYUFBYSxTQUFTLE1BQU0sV0FBVyxLQUFLO0FBQUEsSUFDNUMsZUFBZTtBQUFBLElBQ2Y7QUFBQSxJQUNBLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxJQUNMLE9BQU87QUFBQSxJQUNQLFFBQVEsU0FBUyxTQUFTLEtBQUs7QUFBQSxFQUNqQztBQUNGO0FBRU8sSUFBTSxtQkFBbUIsQ0FBQyxjQUF3QztBQUN2RSxNQUFJO0FBQ0YsbUJBQWUsUUFBUSwwQkFBMEIsS0FBSyxVQUFVLFNBQVMsQ0FBQztBQUFBLEVBQzVFLFFBQVE7QUFBQSxFQUVSO0FBQ0Y7QUFFTyxJQUFNLGlCQUFpQixPQUFPLFVBQWtCLFNBQThCO0FBQ25GLE1BQUksT0FBTyxXQUFXLGVBQWUsRUFBRSxZQUFZLFFBQVM7QUFDNUQsUUFBTSxRQUFRLE1BQU0sT0FBTyxLQUFLLHVCQUF1QjtBQUN2RCxRQUFNLGFBQWEsR0FBRyx5QkFBeUIsR0FBRyxtQkFBbUIsUUFBUSxDQUFDO0FBQzlFLFFBQU0sTUFBTTtBQUFBLElBQ1YsSUFBSSxRQUFRLFVBQVU7QUFBQSxJQUN0QixJQUFJLFNBQVMsTUFBTTtBQUFBLE1BQ2pCLFNBQVM7QUFBQSxRQUNQLGdCQUFnQixTQUFTLEtBQUssSUFBSSxLQUFLO0FBQUEsTUFDekM7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFFTyxJQUFNLHNCQUFzQixPQUFPLGFBQTJDO0FBQ25GLE1BQUksT0FBTyxXQUFXLGVBQWUsRUFBRSxZQUFZLFFBQVMsUUFBTztBQUNuRSxRQUFNLFFBQVEsTUFBTSxPQUFPLEtBQUssdUJBQXVCO0FBQ3ZELFFBQU0sYUFBYSxHQUFHLHlCQUF5QixHQUFHLG1CQUFtQixRQUFRLENBQUM7QUFDOUUsUUFBTSxpQkFBaUIsTUFBTSxNQUFNLE1BQU0sVUFBVTtBQUNuRCxNQUFJLENBQUMsZUFBZ0IsUUFBTztBQUM1QixTQUFPLGVBQWUsS0FBSztBQUM3QjtBQUVPLElBQU0sd0JBQXdCLE9BQU8sYUFBb0M7QUFDOUUsTUFBSSxPQUFPLFdBQVcsZUFBZSxFQUFFLFlBQVksUUFBUztBQUM1RCxRQUFNLFFBQVEsTUFBTSxPQUFPLEtBQUssdUJBQXVCO0FBQ3ZELFFBQU0sYUFBYSxHQUFHLHlCQUF5QixHQUFHLG1CQUFtQixRQUFRLENBQUM7QUFDOUUsUUFBTSxNQUFNLE9BQU8sVUFBVTtBQUMvQjs7O0FEdFRPLElBQU0saUNBQWlDLENBQUM7QUFBQSxFQUM3QyxVQUFVO0FBQUEsRUFDVixZQUFZO0FBQUEsRUFDWixlQUFlO0FBQUEsRUFDZixtQkFBbUI7QUFBQSxFQUNuQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxjQUFjO0FBQUEsRUFDZDtBQUFBLEVBQ0E7QUFDRixNQUEwQztBQUN4QyxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixRQUFJLHVCQUFTLEtBQUs7QUFDOUQsUUFBTSxDQUFDLE1BQU0sT0FBTyxRQUFJLHVCQUFTLEtBQUs7QUFDdEMsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHVCQUFzQyxJQUFJO0FBQ2hGLFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx1QkFBUyxFQUFFO0FBQ25ELFFBQU0sQ0FBQyxvQkFBb0IscUJBQXFCLFFBQUksdUJBQW9DLElBQUk7QUFDNUYsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHVCQUE2QixDQUFDLENBQUM7QUFDakUsUUFBTSxvQkFBZ0IscUJBQWdELElBQUk7QUFFMUUsUUFBTSxzQkFBa0Isc0JBQVEsTUFBTTtBQUNwQyxRQUFJLGdCQUFnQixrQkFBa0I7QUFDcEMsYUFBTyxLQUFLLGlEQUFpRCxvQkFBb0I7QUFBQSxJQUNuRjtBQUNBLFFBQUksZ0JBQWdCLGtCQUFrQjtBQUNwQyxhQUFPLEtBQUssaURBQWlELG9CQUFvQjtBQUFBLElBQ25GO0FBQ0EsUUFBSSxnQkFBZ0IsZUFBZTtBQUNqQyxhQUFPLEtBQUssOENBQThDLGlCQUFpQjtBQUFBLElBQzdFO0FBQ0EsUUFBSSxnQkFBZ0IsZ0JBQWdCO0FBQ2xDLGFBQU8sS0FBSyw2Q0FBNkMsa0JBQWtCO0FBQUEsSUFDN0U7QUFDQSxRQUFJLGdCQUFnQixzQkFBc0I7QUFDeEMsYUFBTyxLQUFLLDhDQUE4Qyx5QkFBeUI7QUFBQSxJQUNyRjtBQUNBLFFBQUksZ0JBQWdCLFFBQVE7QUFDMUIsYUFBTyxLQUFLLHVDQUF1QyxNQUFNO0FBQUEsSUFDM0Q7QUFDQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsV0FBVyxDQUFDO0FBRWhCLFFBQU0sZUFBVywwQkFBWSxDQUFDLE1BQWMsWUFBb0I7QUFDOUQsVUFBTSxjQUFjLFNBQVMsT0FBTztBQUNwQyxRQUFJLENBQUMsWUFBYTtBQUVsQixpQkFBYSxDQUFDLGFBQWE7QUFDekIsWUFBTSxPQUFPO0FBQUEsUUFDWCxHQUFHO0FBQUEsUUFDSDtBQUFBLFVBQ0U7QUFBQSxVQUNBLFNBQVM7QUFBQSxVQUNULEtBQUksb0JBQUksS0FBSyxHQUFFLFlBQVk7QUFBQSxRQUM3QjtBQUFBLE1BQ0Y7QUFDQSx1QkFBaUIsSUFBSTtBQUNyQixhQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0scUJBQWlCLDBCQUFZLE1BQU07QUFDdkMsb0JBQWdCLEVBQUU7QUFDbEIsMEJBQXNCLElBQUk7QUFDMUIsaUJBQWEsQ0FBQyxDQUFDO0FBQ2YscUJBQWlCLENBQUMsQ0FBQztBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDO0FBR0wsUUFBTSxzQkFBa0IsMEJBQVksTUFBTTtBQUN4QyxVQUFNLGVBQWUsU0FBUyxnQkFBZ0I7QUFDOUMsUUFBSSxDQUFDLGNBQWM7QUFDakIsYUFBTztBQUFBLFFBQ0wseUJBQXlCO0FBQUEsTUFDM0I7QUFBQSxJQUNGO0FBRUEsV0FBTztBQUFBLE1BQ0wseUJBQXlCO0FBQUEsTUFDekIsU0FBUztBQUFBLFFBQ1Asa0JBQWtCO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQUEsRUFDRixHQUFHLENBQUMsZ0JBQWdCLENBQUM7QUFFckIsUUFBTSxrQ0FBOEIsMEJBQVksTUFBZTtBQUM3RCxRQUFJLENBQUMsb0JBQW9CLGdCQUFnQixpQkFBa0IsZUFBZSxDQUFDLFNBQVU7QUFDbkYsa0JBQVk7QUFDWixhQUFPO0FBQUEsSUFDVDtBQUNBLFdBQU87QUFBQSxFQUNULEdBQUcsQ0FBQyxrQkFBa0IsY0FBYyxlQUFlLGFBQWEsYUFBYSxPQUFPLENBQUM7QUFFckYsUUFBTSw0QkFBd0I7QUFBQSxJQUM1QixDQUFDLFVBQTJCO0FBQzFCLFVBQUksaUJBQWlCLGVBQWU7QUFDbEMsWUFBSSxNQUFNLFdBQVcsS0FBSztBQUN4QixnQkFBTSxpQkFBaUIsTUFBTSxRQUFRLE1BQU0sZ0JBQWdCLElBQ3ZELE1BQU0saUJBQ0gsSUFBSSxDQUFDLFVBQVU7QUFDZCxrQkFBTSxRQUFRLFNBQVMsT0FBTyxLQUFLO0FBQ25DLGtCQUFNLFVBQVUsU0FBUyxPQUFPLE9BQU87QUFDdkMsZ0JBQUksU0FBUyxRQUFTLFFBQU8sR0FBRyxLQUFLLEtBQUssT0FBTztBQUNqRCxtQkFBTyxXQUFXO0FBQUEsVUFDcEIsQ0FBQyxFQUNBLE9BQU8sQ0FBQyxVQUFVLEtBQUssRUFDdkIsS0FBSyxLQUFLLElBQ2I7QUFDSixpQkFBTyxrQkFBa0IsS0FBSyw0Q0FBNEMsbUJBQW1CO0FBQUEsUUFDL0Y7QUFDQSxZQUFJLE1BQU0sV0FBVyxLQUFLO0FBQ3hCLGlCQUFPLEtBQUssMENBQTBDLG1CQUFtQjtBQUFBLFFBQzNFO0FBQ0EsWUFBSSxNQUFNLFdBQVcsS0FBSztBQUN4QixpQkFBTyxLQUFLLHdDQUF3QyxlQUFlO0FBQUEsUUFDckU7QUFBQSxNQUNGO0FBRUEsYUFBTyxpQkFBaUIsU0FBUyxTQUFTLE1BQU0sT0FBTyxJQUNuRCxTQUFTLE1BQU0sT0FBTyxJQUN0QixLQUFLLHFCQUFxQixpQkFBaUI7QUFBQSxJQUNqRDtBQUFBLElBQ0EsQ0FBQztBQUFBLEVBQ0g7QUFFQSxRQUFNLHlCQUFxQjtBQUFBLElBQ3pCLE9BQU8sUUFBZ0IsT0FBd0IsaUJBQW1DO0FBQ2hGLHFCQUFlLGNBQWM7QUFDN0IsWUFBTSxZQUFZLHFCQUFxQixPQUFPLFlBQVk7QUFDMUQsWUFBTSxhQUFhLE1BQU0sMEJBQTBCLFFBQVEsV0FBVyxnQkFBZ0IsQ0FBQztBQUN2RixlQUFTLGFBQWEsU0FBVSxZQUFzQyxPQUFPLENBQUM7QUFDOUUsVUFBSSxXQUFXLFlBQVksTUFBTTtBQUMvQixjQUFNLElBQUksTUFBTSxTQUFTLFdBQVcsT0FBTyxLQUFLLEtBQUsscUJBQXFCLGlCQUFpQixDQUFDO0FBQUEsTUFDOUY7QUFFQSxVQUFJLENBQUMsWUFBYTtBQUVsQixZQUFNLGNBQWMsc0JBQXNCLE9BQU8sUUFBUSxTQUFTO0FBQ2xFLFVBQUksQ0FBQyxZQUFhO0FBRWxCLHFCQUFlLG9CQUFvQjtBQUNuQyxZQUFNLGlCQUFpQixNQUFNO0FBQUEsUUFDM0I7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLHNCQUFzQjtBQUFBLFVBQ3RCLE9BQU8sQ0FBQyxXQUFXO0FBQUEsUUFDckI7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQ0EsZUFBUyw2QkFBNkIsU0FBVSxnQkFBMEMsT0FBTyxDQUFDO0FBQ2xHLFVBQUksZUFBZSxZQUFZLE1BQU07QUFDbkMsY0FBTSxJQUFJLE1BQU0sU0FBUyxlQUFlLE9BQU8sS0FBSyxLQUFLLHFCQUFxQixpQkFBaUIsQ0FBQztBQUFBLE1BQ2xHO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxVQUFVLGlCQUFpQixhQUFhLFdBQVcsT0FBTztBQUFBLEVBQzdEO0FBRUEsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixPQUFPLGNBQWtDLFNBQThCO0FBQ3JFLGNBQVEsSUFBSTtBQUNaLHNCQUFnQixFQUFFO0FBQ2xCLHFCQUFlLGFBQWE7QUFFNUIsVUFBSTtBQUNGLGNBQU0saUJBQWlCLE1BQU07QUFBQSxVQUMzQixhQUFhO0FBQUEsVUFDYjtBQUFBLFVBQ0EsYUFBYTtBQUFBLFVBQ2IsZ0JBQWdCO0FBQUEsUUFDbEI7QUFDQSxpQkFBUyxzQkFBc0IsU0FBVSxnQkFBMEMsT0FBTyxDQUFDO0FBQzNGLFlBQUksZUFBZSxZQUFZLE1BQU07QUFDbkMsZ0JBQU0sSUFBSSxNQUFNLFNBQVMsZUFBZSxPQUFPLEtBQUssS0FBSyxxQkFBcUIsaUJBQWlCLENBQUM7QUFBQSxRQUNsRztBQUVBLGNBQU0sZUFBZSxvQkFBb0IsZUFBZSxJQUFJO0FBQzVELFlBQUk7QUFDSixZQUFJLGFBQWEsYUFBYSxZQUFZO0FBQ3hDLGtCQUFRLGFBQWE7QUFBQSxRQUN2QixPQUFPO0FBQ0wseUJBQWUsZ0JBQWdCO0FBQy9CLGdCQUFNLGtCQUFrQixNQUFNO0FBQUEsWUFDNUI7QUFBQSxZQUNBO0FBQUEsWUFDQSxhQUFhLFdBQVc7QUFBQSxZQUN4QixnQkFBZ0I7QUFBQSxVQUNsQjtBQUNBLG1CQUFTLHFCQUFxQixTQUFVLGlCQUEyQyxPQUFPLENBQUM7QUFDM0YsY0FBSSxnQkFBZ0IsWUFBWSxNQUFNO0FBQ3BDLGtCQUFNLElBQUksTUFBTSxTQUFTLGdCQUFnQixPQUFPLEtBQUssS0FBSyxxQkFBcUIsaUJBQWlCLENBQUM7QUFBQSxVQUNuRztBQUNBLGtCQUFRLDZCQUE2QixnQkFBZ0IsSUFBaUM7QUFBQSxRQUN4RjtBQUVBLGNBQU0sbUJBQW1CLGFBQWEsUUFBUSxPQUFPLFlBQVk7QUFFakUsdUJBQWUsTUFBTTtBQUNyQiw4QkFBc0IsSUFBSTtBQUMxQixjQUFNLHNCQUFzQixhQUFhLFFBQVE7QUFDakQsbUJBQVcsTUFBTTtBQUNmLDBCQUFnQixhQUFhLElBQUk7QUFDakMsa0JBQVEsS0FBSztBQUNiLHlCQUFlLElBQUk7QUFDbkIsd0JBQWMsRUFBRSxRQUFRLGFBQWEsUUFBUSxlQUFlLFlBQVksQ0FBQztBQUFBLFFBQzNFLEdBQUcsR0FBRztBQUFBLE1BQ1IsU0FBUyxPQUFPO0FBQ2QsWUFBSSxpQkFBaUIsZUFBZTtBQUNsQyxnQkFBTSxVQUFVLHdCQUF3QixLQUFLO0FBQzdDLG1CQUFTLHNCQUFzQixPQUFPO0FBQUEsUUFDeEM7QUFDQSx3QkFBZ0IsZ0JBQWdCLElBQUk7QUFDcEMsZ0JBQVEsS0FBSztBQUNiLHVCQUFlLElBQUk7QUFDbkIsd0JBQWdCLHNCQUFzQixLQUFLLENBQUM7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsVUFBVSxvQkFBb0IsaUJBQWlCLGFBQWEsYUFBYSxxQkFBcUI7QUFBQSxFQUNqRztBQUVBLFFBQU0sc0JBQWtCO0FBQUEsSUFDdEIsT0FBTyxNQUFZLFdBQW1CLGFBQW9DO0FBQ3hFLGNBQVEsSUFBSTtBQUNaLHFCQUFlLGdCQUFnQjtBQUMvQixxQkFBZTtBQUVmLFVBQUk7QUFDRix1QkFBZSxnQkFBZ0I7QUFDL0IsY0FBTSxnQkFBZ0IsTUFBTSw4QkFBOEIsTUFBTSxNQUFNLFFBQVcsZ0JBQWdCLENBQUM7QUFDbEcsaUJBQVMscUJBQXFCLFNBQVUsZUFBeUMsT0FBTyxDQUFDO0FBQ3pGLFlBQUksY0FBYyxZQUFZLE1BQU07QUFDbEMsZ0JBQU0sSUFBSSxNQUFNLFNBQVMsY0FBYyxPQUFPLEtBQUssS0FBSyxxQkFBcUIsaUJBQWlCLENBQUM7QUFBQSxRQUNqRztBQUVBLGNBQU0sUUFBUSw2QkFBNkIsY0FBYyxJQUFpQztBQUMxRixjQUFNLFNBQVMscUNBQXFDLGNBQWMsSUFBSTtBQUN0RSxZQUFJLENBQUMsUUFBUTtBQUNYLGdCQUFNLElBQUksTUFBTSxLQUFLLDBDQUEwQyxtQ0FBbUMsQ0FBQztBQUFBLFFBQ3JHO0FBRUEsWUFBSTtBQUNGLHlCQUFlLGFBQWE7QUFDNUIsZ0JBQU0saUJBQWlCLE1BQU0sNkJBQTZCLFFBQVEsTUFBTSxXQUFXLGdCQUFnQixDQUFDO0FBQ3BHLG1CQUFTLHNCQUFzQixTQUFVLGdCQUEwQyxPQUFPLENBQUM7QUFDM0YsY0FBSSxlQUFlLFlBQVksTUFBTTtBQUNuQyxrQkFBTSxJQUFJLE1BQU0sU0FBUyxlQUFlLE9BQU8sS0FBSyxLQUFLLHFCQUFxQixpQkFBaUIsQ0FBQztBQUFBLFVBQ2xHO0FBRUEsZ0JBQU0sZUFBZSxvQkFBb0IsZUFBZSxJQUFJO0FBQzVELGdCQUFNLG1CQUFtQixRQUFRLE9BQU8sWUFBWTtBQUVwRCx5QkFBZSxNQUFNO0FBQ3JCLGdCQUFNLHNCQUFzQixRQUFRO0FBQ3BDLHFCQUFXLE1BQU07QUFDZiw0QkFBZ0IsYUFBYSxJQUFJO0FBQ2pDLG9CQUFRLEtBQUs7QUFDYiwyQkFBZSxJQUFJO0FBQ25CLDBCQUFjLEVBQUUsUUFBUSxlQUFlLFlBQVksQ0FBQztBQUFBLFVBQ3RELEdBQUcsR0FBRztBQUFBLFFBQ1IsU0FBUyxhQUFhO0FBQ3BCLGNBQUksdUJBQXVCLGVBQWU7QUFDeEMsa0JBQU0sVUFBVSx3QkFBd0IsV0FBVztBQUNuRCxxQkFBUyw0QkFBNEIsT0FBTztBQUFBLFVBQzlDO0FBQ0EsZ0NBQXNCO0FBQUEsWUFDcEIsVUFBVTtBQUFBLFlBQ1Y7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBLGNBQWMsaUJBQWlCLEtBQUssSUFBSTtBQUFBLFVBQzFDLENBQUM7QUFDRCxnQkFBTSxJQUFJO0FBQUEsWUFDUjtBQUFBLGNBQ0U7QUFBQSxjQUNBO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixTQUFTLE9BQU87QUFDZCx3QkFBZ0IsZ0JBQWdCLElBQUk7QUFDcEMsZ0JBQVEsS0FBSztBQUNiLHVCQUFlLElBQUk7QUFDbkIsd0JBQWdCLHNCQUFzQixLQUFLLENBQUM7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsVUFBVSxvQkFBb0IsaUJBQWlCLGdCQUFnQixhQUFhLGFBQWEscUJBQXFCO0FBQUEsRUFDakg7QUFFQSxRQUFNLDBCQUFzQjtBQUFBLElBQzFCLE9BQU8sTUFBWSxXQUFtQixhQUFvQztBQUN4RSxjQUFRLElBQUk7QUFDWixxQkFBZSxnQkFBZ0I7QUFDL0IscUJBQWU7QUFDZixVQUFJLGdCQUFnQjtBQUNwQixVQUFJLFFBQThFO0FBRWxGLFVBQUk7QUFDRixjQUFNLFFBQVEsaUJBQWlCO0FBQy9CLGNBQU0saUJBQWlCLDJCQUEyQixpQkFBaUIsQ0FBQztBQUNwRSxjQUFNLGdCQUFpRDtBQUFBLFVBQ3JELE1BQU07QUFBQSxVQUNOLGFBQWEsaUJBQWlCLEtBQUssSUFBSSxFQUFFLFFBQVEsaUJBQWlCLEVBQUUsS0FBSztBQUFBLFVBQ3pFLGNBQWMsU0FBUyxZQUFZLEVBQUUsWUFBWSxLQUFLO0FBQUEsVUFDdEQsV0FBVztBQUFBLFVBQ1gsWUFBWTtBQUFBLFVBQ1osU0FBUztBQUFBLFVBQ1QsZUFBZTtBQUFBLFFBQ2pCO0FBQ0EsY0FBTSxpQkFBaUIsTUFBTSx5QkFBeUIsZUFBZSxnQkFBZ0IsQ0FBQztBQUN0RixpQkFBUyx3QkFBd0IsU0FBVSxnQkFBMEMsT0FBTyxDQUFDO0FBQzdGLFlBQUksZUFBZSxZQUFZLE1BQU07QUFDbkMsZ0JBQU0sSUFBSSxNQUFNLFNBQVMsZUFBZSxPQUFPLEtBQUssS0FBSyxxQkFBcUIsaUJBQWlCLENBQUM7QUFBQSxRQUNsRztBQUVBLGNBQU0sYUFBYyxlQUFxRTtBQUN6RixjQUFNLFNBQVMsU0FBUyxZQUFZLFVBQVUsWUFBWSxNQUFNO0FBQ2hFLFlBQUksQ0FBQyxRQUFRO0FBQ1gsZ0JBQU0sSUFBSSxNQUFNLEtBQUssMENBQTBDLG1DQUFtQyxDQUFDO0FBQUEsUUFDckc7QUFDQSx3QkFBZ0I7QUFFaEIsZ0JBQVE7QUFDUix1QkFBZSxhQUFhO0FBQzVCLGNBQU0saUJBQWlCLE1BQU0sNkJBQTZCLFFBQVEsTUFBTSxXQUFXLGdCQUFnQixDQUFDO0FBQ3BHLGlCQUFTLHNCQUFzQixTQUFVLGdCQUEwQyxPQUFPLENBQUM7QUFDM0YsWUFBSSxlQUFlLFlBQVksTUFBTTtBQUNuQyxnQkFBTSxJQUFJLE1BQU0sU0FBUyxlQUFlLE9BQU8sS0FBSyxLQUFLLHFCQUFxQixpQkFBaUIsQ0FBQztBQUFBLFFBQ2xHO0FBQ0EsY0FBTSxlQUFlLG9CQUFvQixlQUFlLElBQUk7QUFFNUQsZ0JBQVE7QUFDUix1QkFBZSxnQkFBZ0I7QUFDL0IsY0FBTSxrQkFBa0IsTUFBTTtBQUFBLFVBQzVCO0FBQUEsVUFDQTtBQUFBLFVBQ0EsYUFBYSxXQUFXO0FBQUEsVUFDeEIsZ0JBQWdCO0FBQUEsUUFDbEI7QUFDQSxpQkFBUyxxQkFBcUIsU0FBVSxpQkFBMkMsT0FBTyxDQUFDO0FBQzNGLFlBQUksZ0JBQWdCLFlBQVksTUFBTTtBQUNwQyxnQkFBTSxJQUFJLE1BQU0sU0FBUyxnQkFBZ0IsT0FBTyxLQUFLLEtBQUsscUJBQXFCLGlCQUFpQixDQUFDO0FBQUEsUUFDbkc7QUFDQSxjQUFNLFFBQVEsNkJBQTZCLGdCQUFnQixJQUFpQztBQUM1RixnQkFBUTtBQUNSLGNBQU0sbUJBQW1CLFFBQVEsT0FBTyxZQUFZO0FBRXBELHVCQUFlLE1BQU07QUFDckIsY0FBTSxzQkFBc0IsUUFBUTtBQUNwQyxtQkFBVyxNQUFNO0FBQ2YsMEJBQWdCLGFBQWEsSUFBSTtBQUNqQyxrQkFBUSxLQUFLO0FBQ2IseUJBQWUsSUFBSTtBQUNuQix3QkFBYyxFQUFFLFFBQVEsZUFBZSxZQUFZLENBQUM7QUFBQSxRQUN0RCxHQUFHLEdBQUc7QUFBQSxNQUNSLFNBQVMsT0FBTztBQUNkLFlBQUksaUJBQWlCLGVBQWU7QUFDbEMsZ0JBQU0sVUFBVSx3QkFBd0IsS0FBSztBQUM3QyxtQkFBUyx1QkFBdUIsT0FBTztBQUFBLFFBQ3pDO0FBRUEsWUFBSSxVQUFVLGlCQUFpQixlQUFlO0FBQzVDLGdDQUFzQjtBQUFBLFlBQ3BCLFVBQVU7QUFBQSxZQUNWLFFBQVE7QUFBQSxZQUNSO0FBQUEsWUFDQTtBQUFBLFlBQ0EsY0FBYyxpQkFBaUIsS0FBSyxJQUFJO0FBQUEsVUFDMUMsQ0FBQztBQUFBLFFBQ0g7QUFDQSx3QkFBZ0IsZ0JBQWdCLElBQUk7QUFDcEMsZ0JBQVEsS0FBSztBQUNiLHVCQUFlLElBQUk7QUFDbkIsd0JBQWdCLHNCQUFzQixLQUFLLENBQUM7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsVUFBVSxvQkFBb0IsaUJBQWlCLGdCQUFnQixjQUFjLGFBQWEsYUFBYSxxQkFBcUI7QUFBQSxFQUMvSDtBQUVBLFFBQU0seUJBQXFCO0FBQUEsSUFDekIsT0FBTyxNQUFtQixZQUE4QztBQUN0RSxVQUFJLENBQUMsS0FBTTtBQUNYLFVBQUksQ0FBQyw0QkFBNEIsRUFBRztBQUVwQyxZQUFNLFdBQVcsU0FBUyxLQUFLLElBQUksRUFBRSxZQUFZO0FBQ2pELFVBQUksWUFBWSxDQUFDLFNBQVMsV0FBVyxRQUFRLEdBQUc7QUFDOUMsd0JBQWdCLEtBQUssMENBQTBDLDJCQUEyQixDQUFDO0FBQzNGO0FBQUEsTUFDRjtBQUNBLFVBQUksQ0FBQywyQkFBMkIsSUFBSSxHQUFHO0FBQ3JDLHdCQUFnQixLQUFLLDBDQUEwQywyQkFBMkIsQ0FBQztBQUMzRjtBQUFBLE1BQ0Y7QUFDQSxVQUFJLEtBQUssT0FBTyw2QkFBNkI7QUFDM0Msd0JBQWdCLEtBQUssMENBQTBDLDhCQUE4QixDQUFDO0FBQzlGO0FBQUEsTUFDRjtBQUVBLFlBQU0sWUFBWSxlQUFlLElBQUk7QUFDckMsWUFBTSxXQUFXLGlCQUFpQjtBQUNsQyxvQkFBYyxVQUFVLEVBQUUsVUFBVSxLQUFLO0FBRXpDLFVBQUk7QUFDRixjQUFNLGVBQWUsVUFBVSxJQUFJO0FBQUEsTUFDckMsUUFBUTtBQUFBLE1BRVI7QUFFQSxVQUFJLHdCQUF3QixVQUFVO0FBQ3BDLGNBQU0sb0JBQW9CLE1BQU0sV0FBVyxRQUFRO0FBQUEsTUFDckQsT0FBTztBQUNMLGNBQU0sZ0JBQWdCLE1BQU0sV0FBVyxRQUFRO0FBQUEsTUFDakQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLDZCQUE2QixpQkFBaUIsbUJBQW1CO0FBQUEsRUFDcEU7QUFFQSxRQUFNLHlCQUFxQiwwQkFBWSxZQUFZO0FBQ2pELFFBQUksQ0FBQyxtQkFBb0I7QUFDekIsUUFBSSxDQUFDLDRCQUE0QixFQUFHO0FBRXBDLFFBQUksZUFBZSxjQUFjLFNBQVMsYUFBYSxtQkFBbUIsV0FBVyxjQUFjLFFBQVEsT0FBTztBQUNsSCxRQUFJLENBQUMsY0FBYztBQUNqQixZQUFNLE9BQU8sTUFBTSxvQkFBb0IsbUJBQW1CLFFBQVE7QUFDbEUsVUFBSSxDQUFDLE1BQU07QUFDVCx3QkFBZ0IsS0FBSyxrREFBa0Qsc0NBQXNDLENBQUM7QUFDOUc7QUFBQSxNQUNGO0FBQ0EscUJBQWUsSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLG1CQUFtQixnQkFBZ0IsZ0JBQWdCO0FBQUEsUUFDakYsTUFBTSxTQUFTLEtBQUssSUFBSSxLQUFLO0FBQUEsTUFDL0IsQ0FBQztBQUNELG9CQUFjLFVBQVUsRUFBRSxVQUFVLG1CQUFtQixVQUFVLE1BQU0sYUFBYTtBQUFBLElBQ3RGO0FBRUEsVUFBTSxxQkFBcUIsb0JBQW9CLFlBQVk7QUFBQSxFQUM3RCxHQUFHLENBQUMsNkJBQTZCLG9CQUFvQixvQkFBb0IsQ0FBQztBQUUxRSxRQUFNLHVCQUFtQiwwQkFBWSxNQUFNO0FBQ3pDLFFBQUksQ0FBQyw0QkFBNEIsRUFBRztBQUNwQyxvQkFBZ0IsRUFBRTtBQUNsQix3QkFBb0IsSUFBSTtBQUFBLEVBQzFCLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztBQUVoQyxRQUFNLHdCQUFvQiwwQkFBWSxNQUFNO0FBQzFDLFFBQUksS0FBTTtBQUNWLHdCQUFvQixLQUFLO0FBQUEsRUFDM0IsR0FBRyxDQUFDLElBQUksQ0FBQztBQUVULFFBQU0sOEJBQTBCLDBCQUFZLFlBQXFDO0FBQy9FLFFBQUksT0FBTyxjQUFjLFlBQWEsUUFBTztBQUM3QyxVQUFNLGVBQWUsVUFBVTtBQUMvQixRQUFJLENBQUMsZ0JBQWdCLE9BQU8sYUFBYSxpQkFBaUIsV0FBWSxRQUFPO0FBRTdFLFFBQUk7QUFDRixZQUFNLFNBQVMsTUFBTSxhQUFhLGFBQWE7QUFBQSxRQUM3QyxPQUFPLEVBQUUsWUFBWSxjQUFjO0FBQUEsTUFDckMsQ0FBQztBQUNELGFBQU8sVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLE1BQU0sS0FBSyxDQUFDO0FBQ2xELGFBQU87QUFBQSxJQUNULFFBQVE7QUFDTixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHVCQUFtQjtBQUFBLElBQ3ZCLE9BQU8saUJBQTBDO0FBQy9DLFVBQUksQ0FBQyxhQUFjO0FBQ25CLFlBQU0sVUFBVSxNQUFNLHdCQUF3QjtBQUM5QyxVQUFJLFlBQVksT0FBTztBQUNyQix3QkFBZ0IsS0FBSyxrREFBa0QsZ0NBQWdDLENBQUM7QUFDeEc7QUFBQSxNQUNGO0FBQ0EsMEJBQW9CLEtBQUs7QUFDekIsbUJBQWEsTUFBTTtBQUFBLElBQ3JCO0FBQUEsSUFDQSxDQUFDLHVCQUF1QjtBQUFBLEVBQzFCO0FBRUEsUUFBTSx3QkFBb0IsMEJBQVksQ0FBQyxpQkFBMEM7QUFDL0UsUUFBSSxDQUFDLGFBQWM7QUFDbkIsd0JBQW9CLEtBQUs7QUFDekIsaUJBQWEsTUFBTTtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxpQkFBYSwwQkFBWSxNQUFNO0FBQ25DLG9CQUFnQixFQUFFO0FBQUEsRUFDcEIsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLHVCQUF1Qix1QkFBdUI7QUFBQSxJQUM5QztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
