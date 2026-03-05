import {
  flashActionMark
} from "./chunk-K7MECJ5E.js";
import {
  applyExpenseSheetTicketIa,
  createExpenseSheet,
  createExpenseSheetTicket,
  extractExpenseFromTicketDraft,
  safeText,
  toExpenseApiDdMmYyyy,
  uploadExpenseSheetTicketFile
} from "./chunk-GGS3XUX2.js";
import {
  ApiFetchError,
  indT
} from "./chunk-PU3BESI6.js";
import {
  require_react
} from "./chunk-BWM3JLWG.js";
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
      const iaResponse = await applyExpenseSheetTicketIa(fileId, iaPayload, {
        suppressPermissionModal: true
      });
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
        {
          suppressPermissionModal: true
        }
      );
      addTrace("expense-sheet-append-line", safeText(createResponse?.TraceId));
      if (createResponse.Success !== true) {
        throw new Error(safeText(createResponse.Message) || indT("Api_RequestFailed", "Request failed."));
      }
    },
    [addTrace, linkToSheet, projectId, sheetId]
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
          {
            suppressPermissionModal: true
          }
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
          const iaDraftResponse = await extractExpenseFromTicketDraft(file, false, uploadResult.urlFile || void 0, {
            suppressPermissionModal: true
          });
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
    [addTrace, applyIaAndFinalize, linkToSheet, onCompleted, resolveUiErrorMessage]
  );
  const runIaCreateFlow = (0, import_react.useCallback)(
    async (file, extension, cacheKey) => {
      setBusy(true);
      setProgressKey("uploadingImage");
      clearFlowState();
      try {
        setProgressKey("creatingTicket");
        const draftResponse = await extractExpenseFromTicketDraft(file, true, void 0, {
          suppressPermissionModal: true
        });
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
          const uploadResponse = await uploadExpenseSheetTicketFile(fileId, file, extension, {
            suppressPermissionModal: true
          });
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
    [addTrace, applyIaAndFinalize, clearFlowState, linkToSheet, onCompleted, resolveUiErrorMessage]
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
        const createResponse = await createExpenseSheetTicket(createPayload, {
          suppressPermissionModal: true
        });
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
        const uploadResponse = await uploadExpenseSheetTicketFile(fileId, file, extension, {
          suppressPermissionModal: true
        });
        addTrace("ticket-file-upload", safeText(uploadResponse?.TraceId));
        if (uploadResponse.Success !== true) {
          throw new Error(safeText(uploadResponse.Message) || indT("Api_RequestFailed", "Request failed."));
        }
        const uploadResult = resolveUploadResult(uploadResponse.Data);
        stage = "uploadingImage";
        setProgressKey("uploadingImage");
        const iaDraftResponse = await extractExpenseFromTicketDraft(file, false, uploadResult.urlFile || void 0, {
          suppressPermissionModal: true
        });
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
    [addTrace, applyIaAndFinalize, clearFlowState, currencyCode, linkToSheet, onCompleted, resolveUiErrorMessage]
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93LnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0NvcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlx1RkVGRmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsIEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQge1xuICBhcHBseUV4cGVuc2VTaGVldFRpY2tldElhLFxuICBjcmVhdGVFeHBlbnNlU2hlZXQsXG4gIGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldCxcbiAgZXh0cmFjdEV4cGVuc2VGcm9tVGlja2V0RHJhZnQsXG4gIHVwbG9hZEV4cGVuc2VTaGVldFRpY2tldEZpbGUsXG59IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHtcbiAgREVGQVVMVF9DUkVBVEVfTU9ERSxcbiAgTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTLFxuICBidWlsZFNoZWV0TGluZVBheWxvYWQsXG4gIGJ1aWxkVGlja2V0SWFQYXlsb2FkLFxuICBjYWNoZUltYWdlRmlsZSxcbiAgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IsXG4gIGdldFRvZGF5RGRNbVl5eXksXG4gIGluZmVyRXh0ZW5zaW9uLFxuICBpc1N1cHBvcnRlZFRpY2tldEltYWdlRmlsZSxcbiAgbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZSxcbiAgcGVyc2lzdFRyYWNlTGlzdCxcbiAgcmVhZENhY2hlZEltYWdlRmlsZSxcbiAgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlLFxuICByZXNvbHZlUmFuZG9tS2V5LFxuICByZXNvbHZlVGlja2V0RmlsZUlkRnJvbURyYWZ0UmVzcG9uc2UsXG4gIHJlc29sdmVVcGxvYWRSZXN1bHQsXG4gIHNhbml0aXplRmlsZU5hbWUsXG4gIHR5cGUgTm9ybWFsaXplZERyYWZ0LFxuICB0eXBlIFBlbmRpbmdVcGxvYWRSZXRyeSxcbiAgdHlwZSBRdWlja0Zsb3dQcm9ncmVzc0tleSxcbiAgdHlwZSBUaWNrZXRJbWFnZVNvdXJjZSxcbiAgdHlwZSBUaWNrZXRUcmFjZUVudHJ5LFxuICB0eXBlIFVwbG9hZFN5bmNSZXN1bHQsXG4gIHR5cGUgVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncyxcbn0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93ID0gKHtcbiAgc2hlZXRJZCA9IFwiXCIsXG4gIHByb2plY3RJZCA9IFwiXCIsXG4gIGN1cnJlbmN5Q29kZSA9IFwiXCIsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNTaGVldExvY2tlZCxcbiAgbGlua1RvU2hlZXQgPSB0cnVlLFxuICBvbkZvcmJpZGRlbixcbiAgb25Db21wbGV0ZWQsXG59OiBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzKSA9PiB7XG4gIGNvbnN0IFtzb3VyY2VQaWNrZXJPcGVuLCBzZXRTb3VyY2VQaWNrZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcHJvZ3Jlc3NLZXksIHNldFByb2dyZXNzS2V5XSA9IHVzZVN0YXRlPFF1aWNrRmxvd1Byb2dyZXNzS2V5IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3BlbmRpbmdVcGxvYWRSZXRyeSwgc2V0UGVuZGluZ1VwbG9hZFJldHJ5XSA9IHVzZVN0YXRlPFBlbmRpbmdVcGxvYWRSZXRyeSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbdHJhY2VMaXN0LCBzZXRUcmFjZUxpc3RdID0gdXNlU3RhdGU8VGlja2V0VHJhY2VFbnRyeVtdPihbXSk7XG4gIGNvbnN0IGxhdGVzdEZpbGVSZWYgPSB1c2VSZWY8eyBjYWNoZUtleTogc3RyaW5nOyBmaWxlOiBGaWxlIH0gfCBudWxsPihudWxsKTtcblxuICBjb25zdCBwcm9ncmVzc01lc3NhZ2UgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwidXBsb2FkaW5nSW1hZ2VcIikge1xuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfVXBsb2FkaW5nSW1hZ2VcIiwgXCJVcGxvYWRpbmcgaW1hZ2UuLi5cIik7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJjcmVhdGluZ1RpY2tldFwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19DcmVhdGluZ1RpY2tldFwiLCBcIkNyZWF0aW5nIHRpY2tldC4uLlwiKTtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcInN5bmNpbmdGaWxlXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX1N5bmNpbmdGaWxlXCIsIFwiU3luY2luZyBmaWxlLi4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwiZmluYWxpemluZ0lhXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0ZpbmFsaXppbmdcIiwgXCJGaW5hbGl6aW5nIElBLi4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwibGlua2luZ0V4cGVuc2VMaW5lXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0xpbmtpbmdMaW5lXCIsIFwiTGlua2luZyBleHBlbnNlIGxpbmUuLi5cIik7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJkb25lXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0RvbmVcIiwgXCJEb25lXCIpO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbiAgfSwgW3Byb2dyZXNzS2V5XSk7XG5cbiAgY29uc3QgYWRkVHJhY2UgPSB1c2VDYWxsYmFjaygoc3RlcDogc3RyaW5nLCB0cmFjZUlkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzYWZlVHJhY2VJZCA9IHNhZmVUZXh0KHRyYWNlSWQpO1xuICAgIGlmICghc2FmZVRyYWNlSWQpIHJldHVybjtcblxuICAgIHNldFRyYWNlTGlzdCgocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBbXG4gICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcCxcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVHJhY2VJZCxcbiAgICAgICAgICBhdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICAgIHBlcnNpc3RUcmFjZUxpc3QobmV4dCk7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyRmxvd1N0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRQZW5kaW5nVXBsb2FkUmV0cnkobnVsbCk7XG4gICAgc2V0VHJhY2VMaXN0KFtdKTtcbiAgICBwZXJzaXN0VHJhY2VMaXN0KFtdKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbiA9IHVzZUNhbGxiYWNrKCgpOiBib29sZWFuID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UgfHwgaXNDcmVhdGVNb2RlIHx8IGlzU2hlZXRMb2NrZWQgfHwgKGxpbmtUb1NoZWV0ICYmICFzaGVldElkKSkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzU2hlZXRMb2NrZWQsIGxpbmtUb1NoZWV0LCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xuXG4gIGNvbnN0IHJlc29sdmVVaUVycm9yTWVzc2FnZSA9IHVzZUNhbGxiYWNrKFxuICAgIChlcnJvcjogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyMikge1xuICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25UZXh0ID0gQXJyYXkuaXNBcnJheShlcnJvci52YWxpZGF0aW9uRXJyb3JzKVxuICAgICAgICAgICAgPyBlcnJvci52YWxpZGF0aW9uRXJyb3JzXG4gICAgICAgICAgICAgICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gc2FmZVRleHQoZW50cnk/LkZpZWxkKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzYWZlVGV4dChlbnRyeT8uTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoZmllbGQgJiYgbWVzc2FnZSkgcmV0dXJuIGAke2ZpZWxkfTogJHttZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZSB8fCBmaWVsZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiB8IFwiKVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0aW9uVGV4dCB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfVmFsaWRhdGlvblwiLCBcIlZhbGlkYXRpb24gZXJyb3IuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm90Rm91bmRcIiwgXCJSZWNvcmQgbm90IGZvdW5kLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcbiAgICAgICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1NlcnZlclwiLCBcIlNlcnZlciBlcnJvci5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcbiAgICAgICAgPyBzYWZlVGV4dChlcnJvci5tZXNzYWdlKVxuICAgICAgICA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgYXBwbHlJYUFuZEZpbmFsaXplID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGZpbGVJZDogc3RyaW5nLCBkcmFmdDogTm9ybWFsaXplZERyYWZ0LCB1cGxvYWRSZXN1bHQ6IFVwbG9hZFN5bmNSZXN1bHQpID0+IHtcbiAgICAgIHNldFByb2dyZXNzS2V5KFwiZmluYWxpemluZ0lhXCIpO1xuICAgICAgY29uc3QgaWFQYXlsb2FkID0gYnVpbGRUaWNrZXRJYVBheWxvYWQoZHJhZnQsIHVwbG9hZFJlc3VsdCk7XG4gICAgICBjb25zdCBpYVJlc3BvbnNlID0gYXdhaXQgYXBwbHlFeHBlbnNlU2hlZXRUaWNrZXRJYShmaWxlSWQsIGlhUGF5bG9hZCwge1xuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtaWFcIiwgc2FmZVRleHQoKGlhUmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgaWYgKGlhUmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQoaWFSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWxpbmtUb1NoZWV0KSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGxpbmVQYXlsb2FkID0gYnVpbGRTaGVldExpbmVQYXlsb2FkKGRyYWZ0LCBmaWxlSWQsIHByb2plY3RJZCk7XG4gICAgICBpZiAoIWxpbmVQYXlsb2FkKSByZXR1cm47XG5cbiAgICAgIHNldFByb2dyZXNzS2V5KFwibGlua2luZ0V4cGVuc2VMaW5lXCIpO1xuICAgICAgY29uc3QgY3JlYXRlUmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQoXG4gICAgICAgIHtcbiAgICAgICAgICBtb2RlOiAyLFxuICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzaGVldElkLFxuICAgICAgICAgIGxpbmVzOiBbbGluZVBheWxvYWRdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICBhZGRUcmFjZShcImV4cGVuc2Utc2hlZXQtYXBwZW5kLWxpbmVcIiwgc2FmZVRleHQoKGNyZWF0ZVJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgIGlmIChjcmVhdGVSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dChjcmVhdGVSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FkZFRyYWNlLCBsaW5rVG9TaGVldCwgcHJvamVjdElkLCBzaGVldElkXVxuICApO1xuXG4gIGNvbnN0IHJlc3VtZUZyb21VcGxvYWRTdGVwID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHBlbmRpbmdTdGF0ZTogUGVuZGluZ1VwbG9hZFJldHJ5LCBmaWxlOiBGaWxlKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBzZXRCdXN5KHRydWUpO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJzeW5jaW5nRmlsZVwiKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXBsb2FkUmVzcG9uc2UgPSBhd2FpdCB1cGxvYWRFeHBlbnNlU2hlZXRUaWNrZXRGaWxlKFxuICAgICAgICAgIHBlbmRpbmdTdGF0ZS5maWxlSWQsXG4gICAgICAgICAgZmlsZSxcbiAgICAgICAgICBwZW5kaW5nU3RhdGUuZXh0ZW5zaW9uLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmlsZS11cGxvYWRcIiwgc2FmZVRleHQoKHVwbG9hZFJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgaWYgKHVwbG9hZFJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQodXBsb2FkUmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVwbG9hZFJlc3VsdCA9IHJlc29sdmVVcGxvYWRSZXN1bHQodXBsb2FkUmVzcG9uc2UuRGF0YSk7XG4gICAgICAgIGxldCBkcmFmdDogTm9ybWFsaXplZERyYWZ0O1xuICAgICAgICBpZiAocGVuZGluZ1N0YXRlLnN0cmF0ZWd5ID09PSBcImlhLXJlYWR5XCIpIHtcbiAgICAgICAgICBkcmFmdCA9IHBlbmRpbmdTdGF0ZS5kcmFmdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRQcm9ncmVzc0tleShcInVwbG9hZGluZ0ltYWdlXCIpO1xuICAgICAgICAgIGNvbnN0IGlhRHJhZnRSZXNwb25zZSA9IGF3YWl0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0KGZpbGUsIGZhbHNlLCB1cGxvYWRSZXN1bHQudXJsRmlsZSB8fCB1bmRlZmluZWQsIHtcbiAgICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZWZyb210aWNrZXRcIiwgc2FmZVRleHQoKGlhRHJhZnRSZXNwb25zZSBhcyB7IFRyYWNlSWQ/OiB1bmtub3duIH0pPy5UcmFjZUlkKSk7XG4gICAgICAgICAgaWYgKGlhRHJhZnRSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQoaWFEcmFmdFJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRyYWZ0ID0gbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZShpYURyYWZ0UmVzcG9uc2UuRGF0YSBhcyBFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IGFwcGx5SWFBbmRGaW5hbGl6ZShwZW5kaW5nU3RhdGUuZmlsZUlkLCBkcmFmdCwgdXBsb2FkUmVzdWx0KTtcblxuICAgICAgICBzZXRQcm9ncmVzc0tleShcImRvbmVcIik7XG4gICAgICAgIHNldFBlbmRpbmdVcGxvYWRSZXRyeShudWxsKTtcbiAgICAgICAgYXdhaXQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKHBlbmRpbmdTdGF0ZS5jYWNoZUtleSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgICBvbkNvbXBsZXRlZD8uKHsgZmlsZUlkOiBwZW5kaW5nU3RhdGUuZmlsZUlkLCBsaW5rZWRUb1NoZWV0OiBsaW5rVG9TaGVldCB9KTtcbiAgICAgICAgfSwgMzIwKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgICBjb25zdCB0cmFjZUlkID0gZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IoZXJyb3IpO1xuICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LXJldHJ5LWVycm9yXCIsIHRyYWNlSWQpO1xuICAgICAgICB9XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzb2x2ZVVpRXJyb3JNZXNzYWdlKGVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbYWRkVHJhY2UsIGFwcGx5SWFBbmRGaW5hbGl6ZSwgbGlua1RvU2hlZXQsIG9uQ29tcGxldGVkLCByZXNvbHZlVWlFcnJvck1lc3NhZ2VdXG4gICk7XG5cbiAgY29uc3QgcnVuSWFDcmVhdGVGbG93ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUsIGV4dGVuc2lvbjogc3RyaW5nLCBjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBzZXRCdXN5KHRydWUpO1xuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJ1cGxvYWRpbmdJbWFnZVwiKTtcbiAgICAgIGNsZWFyRmxvd1N0YXRlKCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHNldFByb2dyZXNzS2V5KFwiY3JlYXRpbmdUaWNrZXRcIik7XG4gICAgICAgIGNvbnN0IGRyYWZ0UmVzcG9uc2UgPSBhd2FpdCBleHRyYWN0RXhwZW5zZUZyb21UaWNrZXREcmFmdChmaWxlLCB0cnVlLCB1bmRlZmluZWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZWZyb210aWNrZXRcIiwgc2FmZVRleHQoKGRyYWZ0UmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgICBpZiAoZHJhZnRSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNhZmVUZXh0KGRyYWZ0UmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWZ0ID0gbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZShkcmFmdFJlc3BvbnNlLkRhdGEgYXMgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSk7XG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IHJlc29sdmVUaWNrZXRGaWxlSWRGcm9tRHJhZnRSZXNwb25zZShkcmFmdFJlc3BvbnNlLkRhdGEpO1xuICAgICAgICBpZiAoIWZpbGVJZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm9GaWxlSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSB0aWNrZXQgZmlsZSBpZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzZXRQcm9ncmVzc0tleShcInN5bmNpbmdGaWxlXCIpO1xuICAgICAgICAgIGNvbnN0IHVwbG9hZFJlc3BvbnNlID0gYXdhaXQgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZShmaWxlSWQsIGZpbGUsIGV4dGVuc2lvbiwge1xuICAgICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmlsZS11cGxvYWRcIiwgc2FmZVRleHQoKHVwbG9hZFJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgICBpZiAodXBsb2FkUmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNhZmVUZXh0KHVwbG9hZFJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdXBsb2FkUmVzdWx0ID0gcmVzb2x2ZVVwbG9hZFJlc3VsdCh1cGxvYWRSZXNwb25zZS5EYXRhKTtcbiAgICAgICAgICBhd2FpdCBhcHBseUlhQW5kRmluYWxpemUoZmlsZUlkLCBkcmFmdCwgdXBsb2FkUmVzdWx0KTtcblxuICAgICAgICAgIHNldFByb2dyZXNzS2V5KFwiZG9uZVwiKTtcbiAgICAgICAgICBhd2FpdCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpO1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgICAgIG9uQ29tcGxldGVkPy4oeyBmaWxlSWQsIGxpbmtlZFRvU2hlZXQ6IGxpbmtUb1NoZWV0IH0pO1xuICAgICAgICAgIH0sIDMyMCk7XG4gICAgICAgIH0gY2F0Y2ggKHVwbG9hZEVycm9yKSB7XG4gICAgICAgICAgaWYgKHVwbG9hZEVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xuICAgICAgICAgICAgY29uc3QgdHJhY2VJZCA9IGV4dHJhY3RUcmFjZUlkRnJvbUVycm9yKHVwbG9hZEVycm9yKTtcbiAgICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LWZpbGUtdXBsb2FkLWVycm9yXCIsIHRyYWNlSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRQZW5kaW5nVXBsb2FkUmV0cnkoe1xuICAgICAgICAgICAgc3RyYXRlZ3k6IFwiaWEtcmVhZHlcIixcbiAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgIGV4dGVuc2lvbixcbiAgICAgICAgICAgIGNhY2hlS2V5LFxuICAgICAgICAgICAgZHJhZnQsXG4gICAgICAgICAgICBmaWxlTmFtZUhpbnQ6IHNhbml0aXplRmlsZU5hbWUoZmlsZS5uYW1lKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBpbmRUKFxuICAgICAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1VwbG9hZFJldHJ5XCIsXG4gICAgICAgICAgICAgIFwiVGlja2V0IGNyZWF0ZWQsIGJ1dCBmaWxlIHN5bmMgZmFpbGVkLiBSZXRyeSB1cGxvYWQgdG8gY29tcGxldGUgcHJvY2Vzcy5cIlxuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzb2x2ZVVpRXJyb3JNZXNzYWdlKGVycm9yKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbYWRkVHJhY2UsIGFwcGx5SWFBbmRGaW5hbGl6ZSwgY2xlYXJGbG93U3RhdGUsIGxpbmtUb1NoZWV0LCBvbkNvbXBsZXRlZCwgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlXVxuICApO1xuXG4gIGNvbnN0IHJ1bk1hbnVhbENyZWF0ZUZsb3cgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoZmlsZTogRmlsZSwgZXh0ZW5zaW9uOiBzdHJpbmcsIGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIHNldEJ1c3kodHJ1ZSk7XG4gICAgICBzZXRQcm9ncmVzc0tleShcImNyZWF0aW5nVGlja2V0XCIpO1xuICAgICAgY2xlYXJGbG93U3RhdGUoKTtcbiAgICAgIGxldCBjcmVhdGVkRmlsZUlkID0gXCJcIjtcbiAgICAgIGxldCBzdGFnZTogXCJjcmVhdGluZ1RpY2tldFwiIHwgXCJzeW5jaW5nRmlsZVwiIHwgXCJ1cGxvYWRpbmdJbWFnZVwiIHwgXCJmaW5hbGl6aW5nSWFcIiA9IFwiY3JlYXRpbmdUaWNrZXRcIjtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBnZXRUb2RheURkTW1ZeXl5KCk7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyVXJsID0gYHBlbmRpbmc6Ly90aWNrZXQtdXBsb2FkLyR7cmVzb2x2ZVJhbmRvbUtleSgpfWA7XG4gICAgICAgIGNvbnN0IGNyZWF0ZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgICAgICAgbW9kZTogMSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogc2FuaXRpemVGaWxlTmFtZShmaWxlLm5hbWUpLnJlcGxhY2UoL1xcLlthLXowLTldKyQvaSwgXCJcIikgfHwgXCJUaWNrZXRcIixcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCBcIkVVUlwiLFxuICAgICAgICAgIHRyYW5zRGF0ZTogdG9kYXksXG4gICAgICAgICAgY29tZW50YXJpbzogXCJcIixcbiAgICAgICAgICB1cmxGaWxlOiBwbGFjZWhvbGRlclVybCxcbiAgICAgICAgICBmaWxlRXh0ZW5zaW9uOiBleHRlbnNpb24sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNyZWF0ZVJlc3BvbnNlID0gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0KGNyZWF0ZVBheWxvYWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFRyYWNlKFwidGlja2V0LWNyZWF0ZS1tYW51YWxcIiwgc2FmZVRleHQoKGNyZWF0ZVJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgaWYgKGNyZWF0ZVJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQoY3JlYXRlUmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNyZWF0ZURhdGEgPSAoY3JlYXRlUmVzcG9uc2UgYXMgeyBEYXRhPzogeyBGaWxlSWQ/OiB1bmtub3duOyBmaWxlSWQ/OiB1bmtub3duIH0gfSkuRGF0YTtcbiAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoY3JlYXRlRGF0YT8uRmlsZUlkID8/IGNyZWF0ZURhdGE/LmZpbGVJZCk7XG4gICAgICAgIGlmICghZmlsZUlkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob0ZpbGVJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIHRpY2tldCBmaWxlIGlkLlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlZEZpbGVJZCA9IGZpbGVJZDtcblxuICAgICAgICBzdGFnZSA9IFwic3luY2luZ0ZpbGVcIjtcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJzeW5jaW5nRmlsZVwiKTtcbiAgICAgICAgY29uc3QgdXBsb2FkUmVzcG9uc2UgPSBhd2FpdCB1cGxvYWRFeHBlbnNlU2hlZXRUaWNrZXRGaWxlKGZpbGVJZCwgZmlsZSwgZXh0ZW5zaW9uLCB7XG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICBhZGRUcmFjZShcInRpY2tldC1maWxlLXVwbG9hZFwiLCBzYWZlVGV4dCgodXBsb2FkUmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgICBpZiAodXBsb2FkUmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dCh1cGxvYWRSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVwbG9hZFJlc3VsdCA9IHJlc29sdmVVcGxvYWRSZXN1bHQodXBsb2FkUmVzcG9uc2UuRGF0YSk7XG5cbiAgICAgICAgc3RhZ2UgPSBcInVwbG9hZGluZ0ltYWdlXCI7XG4gICAgICAgIHNldFByb2dyZXNzS2V5KFwidXBsb2FkaW5nSW1hZ2VcIik7XG4gICAgICAgIGNvbnN0IGlhRHJhZnRSZXNwb25zZSA9IGF3YWl0IGV4dHJhY3RFeHBlbnNlRnJvbVRpY2tldERyYWZ0KGZpbGUsIGZhbHNlLCB1cGxvYWRSZXN1bHQudXJsRmlsZSB8fCB1bmRlZmluZWQsIHtcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZWZyb210aWNrZXRcIiwgc2FmZVRleHQoKGlhRHJhZnRSZXNwb25zZSBhcyB7IFRyYWNlSWQ/OiB1bmtub3duIH0pPy5UcmFjZUlkKSk7XG4gICAgICAgIGlmIChpYURyYWZ0UmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dChpYURyYWZ0UmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkcmFmdCA9IG5vcm1hbGl6ZURyYWZ0RnJvbUlhUmVzcG9uc2UoaWFEcmFmdFJlc3BvbnNlLkRhdGEgYXMgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSk7XG4gICAgICAgIHN0YWdlID0gXCJmaW5hbGl6aW5nSWFcIjtcbiAgICAgICAgYXdhaXQgYXBwbHlJYUFuZEZpbmFsaXplKGZpbGVJZCwgZHJhZnQsIHVwbG9hZFJlc3VsdCk7XG5cbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJkb25lXCIpO1xuICAgICAgICBhd2FpdCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XG4gICAgICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgICAgb25Db21wbGV0ZWQ/Lih7IGZpbGVJZCwgbGlua2VkVG9TaGVldDogbGlua1RvU2hlZXQgfSk7XG4gICAgICAgIH0sIDMyMCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XG4gICAgICAgICAgY29uc3QgdHJhY2VJZCA9IGV4dHJhY3RUcmFjZUlkRnJvbUVycm9yKGVycm9yKTtcbiAgICAgICAgICBhZGRUcmFjZShcInRpY2tldC1tYW51YWwtZXJyb3JcIiwgdHJhY2VJZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhZ2UgPT09IFwic3luY2luZ0ZpbGVcIiAmJiBjcmVhdGVkRmlsZUlkKSB7XG4gICAgICAgICAgc2V0UGVuZGluZ1VwbG9hZFJldHJ5KHtcbiAgICAgICAgICAgIHN0cmF0ZWd5OiBcIm1hbnVhbC1wb3N0LXVwbG9hZC1kcmFmdFwiLFxuICAgICAgICAgICAgZmlsZUlkOiBjcmVhdGVkRmlsZUlkLFxuICAgICAgICAgICAgZXh0ZW5zaW9uLFxuICAgICAgICAgICAgY2FjaGVLZXksXG4gICAgICAgICAgICBmaWxlTmFtZUhpbnQ6IHNhbml0aXplRmlsZU5hbWUoZmlsZS5uYW1lKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVVaUVycm9yTWVzc2FnZShlcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FkZFRyYWNlLCBhcHBseUlhQW5kRmluYWxpemUsIGNsZWFyRmxvd1N0YXRlLCBjdXJyZW5jeUNvZGUsIGxpbmtUb1NoZWV0LCBvbkNvbXBsZXRlZCwgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdGVkRmlsZSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChmaWxlOiBGaWxlIHwgbnVsbCwgX3NvdXJjZTogVGlja2V0SW1hZ2VTb3VyY2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIGlmICghZmlsZSkgcmV0dXJuO1xuICAgICAgaWYgKCFlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24oKSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBzYWZlVHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChzYWZlVHlwZSAmJiAhc2FmZVR5cGUuc3RhcnRzV2l0aChcImltYWdlL1wiKSkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUoZmlsZSkpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlVHlwZVwiLCBcIlVuc3VwcG9ydGVkIGltYWdlIGZvcm1hdC5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZmlsZS5zaXplID4gTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfRmlsZVNpemVcIiwgXCJJbWFnZSBleGNlZWRzIDUwTUIgbWF4IHNpemUuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHRlbnNpb24gPSBpbmZlckV4dGVuc2lvbihmaWxlKTtcbiAgICAgIGNvbnN0IGNhY2hlS2V5ID0gcmVzb2x2ZVJhbmRvbUtleSgpO1xuICAgICAgbGF0ZXN0RmlsZVJlZi5jdXJyZW50ID0geyBjYWNoZUtleSwgZmlsZSB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBjYWNoZUltYWdlRmlsZShjYWNoZUtleSwgZmlsZSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gRG8gbm90IGJsb2NrIGZsb3cgaWYgYnJvd3NlciBjYWNoZSBzdG9yYWdlIGlzIHVuYXZhaWxhYmxlLlxuICAgICAgfVxuXG4gICAgICBpZiAoREVGQVVMVF9DUkVBVEVfTU9ERSA9PT0gXCJtYW51YWxcIikge1xuICAgICAgICBhd2FpdCBydW5NYW51YWxDcmVhdGVGbG93KGZpbGUsIGV4dGVuc2lvbiwgY2FjaGVLZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgcnVuSWFDcmVhdGVGbG93KGZpbGUsIGV4dGVuc2lvbiwgY2FjaGVLZXkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2Vuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbiwgcnVuSWFDcmVhdGVGbG93LCBydW5NYW51YWxDcmVhdGVGbG93XVxuICApO1xuXG4gIGNvbnN0IHJldHJ5UGVuZGluZ1VwbG9hZCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXBlbmRpbmdVcGxvYWRSZXRyeSkgcmV0dXJuO1xuICAgIGlmICghZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uKCkpIHJldHVybjtcblxuICAgIGxldCBzZWxlY3RlZEZpbGUgPSBsYXRlc3RGaWxlUmVmLmN1cnJlbnQ/LmNhY2hlS2V5ID09PSBwZW5kaW5nVXBsb2FkUmV0cnkuY2FjaGVLZXkgPyBsYXRlc3RGaWxlUmVmLmN1cnJlbnQuZmlsZSA6IG51bGw7XG4gICAgaWYgKCFzZWxlY3RlZEZpbGUpIHtcbiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCByZWFkQ2FjaGVkSW1hZ2VGaWxlKHBlbmRpbmdVcGxvYWRSZXRyeS5jYWNoZUtleSk7XG4gICAgICBpZiAoIWJsb2IpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9SZXRyeUZpbGVNaXNzaW5nXCIsIFwiQ2FjaGVkIGltYWdlIGlzIG5vIGxvbmdlciBhdmFpbGFibGUuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VsZWN0ZWRGaWxlID0gbmV3IEZpbGUoW2Jsb2JdLCBwZW5kaW5nVXBsb2FkUmV0cnkuZmlsZU5hbWVIaW50IHx8IFwidGlja2V0LWltYWdlXCIsIHtcbiAgICAgICAgdHlwZTogc2FmZVRleHQoYmxvYi50eXBlKSB8fCBcImltYWdlL2pwZWdcIixcbiAgICAgIH0pO1xuICAgICAgbGF0ZXN0RmlsZVJlZi5jdXJyZW50ID0geyBjYWNoZUtleTogcGVuZGluZ1VwbG9hZFJldHJ5LmNhY2hlS2V5LCBmaWxlOiBzZWxlY3RlZEZpbGUgfTtcbiAgICB9XG5cbiAgICBhd2FpdCByZXN1bWVGcm9tVXBsb2FkU3RlcChwZW5kaW5nVXBsb2FkUmV0cnksIHNlbGVjdGVkRmlsZSk7XG4gIH0sIFtlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24sIHBlbmRpbmdVcGxvYWRSZXRyeSwgcmVzdW1lRnJvbVVwbG9hZFN0ZXBdKTtcblxuICBjb25zdCBvcGVuU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uKCkpIHJldHVybjtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgc2V0U291cmNlUGlja2VyT3Blbih0cnVlKTtcbiAgfSwgW2Vuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbl0pO1xuXG4gIGNvbnN0IGNsb3NlU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm47XG4gICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XG4gIH0sIFtidXN5XSk7XG5cbiAgY29uc3QgcmVxdWVzdENhbWVyYVBlcm1pc3Npb24gPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxib29sZWFuIHwgbnVsbD4gPT4ge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBtZWRpYURldmljZXMgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzO1xuICAgIGlmICghbWVkaWFEZXZpY2VzIHx8IHR5cGVvZiBtZWRpYURldmljZXMuZ2V0VXNlck1lZGlhICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgICB2aWRlbzogeyBmYWNpbmdNb2RlOiBcImVudmlyb25tZW50XCIgfSxcbiAgICAgIH0pO1xuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2VsZWN0RnJvbUNhbWVyYSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgICBpZiAoIWlucHV0RWxlbWVudCkgcmV0dXJuO1xuICAgICAgY29uc3QgZ3JhbnRlZCA9IGF3YWl0IHJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uKCk7XG4gICAgICBpZiAoZ3JhbnRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9DYW1lcmFQZXJtaXNzaW9uXCIsIFwiQ2FtZXJhIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XG4gICAgICBpbnB1dEVsZW1lbnQuY2xpY2soKTtcbiAgICB9LFxuICAgIFtyZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbl1cbiAgKTtcblxuICBjb25zdCBzZWxlY3RGcm9tR2FsbGVyeSA9IHVzZUNhbGxiYWNrKChpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcbiAgICBpbnB1dEVsZW1lbnQuY2xpY2soKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyRXJyb3IgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxuICAgIGJ1c3ksXG4gICAgcHJvZ3Jlc3NLZXksXG4gICAgcHJvZ3Jlc3NNZXNzYWdlLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk6IHBlbmRpbmdVcGxvYWRSZXRyeSAhPT0gbnVsbCxcbiAgICB0cmFjZUxpc3QsXG4gICAgb3BlblNvdXJjZVBpY2tlcixcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXG4gICAgY2xlYXJFcnJvcixcbiAgfTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VHYXN0b1R5cGVDb2RlLFxuICBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSxcbiAgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuXG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSA9IFwiaW5kLWV4cGVuc2UtdGlja2V0LWltYWdlLXYxXCI7XG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYID0gXCIvX19pbmRfY2FjaGVfXy90aWNrZXQtaW1hZ2UvXCI7XG5jb25zdCBUSUNLRVRfVFJBQ0VfU1RPUkFHRV9LRVkgPSBcImV4cGVuc2Vfc2hlZXRfdGlja2V0X3F1aWNrX2Zsb3dfdHJhY2VfdjFcIjtcblxuZXhwb3J0IGNvbnN0IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyA9IDUwICogMTAyNCAqIDEwMjQ7XG5jb25zdCBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTID0gbmV3IFNldDxzdHJpbmc+KFtcImltYWdlL2pwZWdcIiwgXCJpbWFnZS9qcGdcIiwgXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS93ZWJwXCJdKTtcbmNvbnN0IEFMTE9XRURfVElDS0VUX0lNQUdFX0VYVEVOU0lPTlMgPSBuZXcgU2V0PHN0cmluZz4oW1wianBnXCIsIFwianBlZ1wiLCBcInBuZ1wiLCBcIndlYnBcIl0pO1xuY29uc3QgVElDS0VUX01JTUVfVE9fRVhURU5TSU9OOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBcImltYWdlL2pwZWdcIjogXCJqcGdcIixcbiAgXCJpbWFnZS9qcGdcIjogXCJqcGdcIixcbiAgXCJpbWFnZS9wbmdcIjogXCJwbmdcIixcbiAgXCJpbWFnZS93ZWJwXCI6IFwid2VicFwiLFxufTtcbmNvbnN0IEFMTE9XRURfVElDS0VUX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuY29uc3QgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRSA9IDg7XG5leHBvcnQgY29uc3QgREVGQVVMVF9DUkVBVEVfTU9ERSA9IFwibWFudWFsXCIgYXMgXCJpYVwiIHwgXCJtYW51YWxcIjtcblxuZXhwb3J0IHR5cGUgVGlja2V0SW1hZ2VTb3VyY2UgPSBcImNhbWVyYVwiIHwgXCJnYWxsZXJ5XCI7XG5cbmV4cG9ydCB0eXBlIFRpY2tldFRyYWNlRW50cnkgPSB7XG4gIHN0ZXA6IHN0cmluZztcbiAgdHJhY2VJZDogc3RyaW5nO1xuICBhdDogc3RyaW5nO1xufTtcblxudHlwZSBOb3JtYWxpemVkRHJhZnRMaW5lID0ge1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdHlwZVZhbHVlOiBudW1iZXI7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHF0eTogbnVtYmVyO1xuICBwcmljZTogbnVtYmVyO1xuICB0b3RhbEFtb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgTm9ybWFsaXplZERyYWZ0ID0ge1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgdG90YWxBbW91bnQ6IG51bWJlcjtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIGNvbWVudGFyaW86IHN0cmluZztcbiAgZ2FzdG9UeXBlOiBudW1iZXIgfCBudWxsO1xuICBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdO1xufTtcblxuZXhwb3J0IHR5cGUgUGVuZGluZ1VwbG9hZFJldHJ5ID1cbiAgfCB7XG4gICAgICBzdHJhdGVneTogXCJpYS1yZWFkeVwiO1xuICAgICAgZmlsZUlkOiBzdHJpbmc7XG4gICAgICBleHRlbnNpb246IHN0cmluZztcbiAgICAgIGNhY2hlS2V5OiBzdHJpbmc7XG4gICAgICBkcmFmdDogTm9ybWFsaXplZERyYWZ0O1xuICAgICAgZmlsZU5hbWVIaW50OiBzdHJpbmc7XG4gICAgfVxuICB8IHtcbiAgICAgIHN0cmF0ZWd5OiBcIm1hbnVhbC1wb3N0LXVwbG9hZC1kcmFmdFwiO1xuICAgICAgZmlsZUlkOiBzdHJpbmc7XG4gICAgICBleHRlbnNpb246IHN0cmluZztcbiAgICAgIGNhY2hlS2V5OiBzdHJpbmc7XG4gICAgICBmaWxlTmFtZUhpbnQ6IHN0cmluZztcbiAgICB9O1xuXG5leHBvcnQgdHlwZSBVcGxvYWRTeW5jUmVzdWx0ID0ge1xuICB1cmxGaWxlOiBzdHJpbmc7XG4gIGZpbGVOYW1lOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzID0ge1xuICBzaGVldElkPzogc3RyaW5nO1xuICBwcm9qZWN0SWQ/OiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZT86IHN0cmluZztcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc1NoZWV0TG9ja2VkOiBib29sZWFuO1xuICBsaW5rVG9TaGVldD86IGJvb2xlYW47XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xuICBvbkNvbXBsZXRlZD86IChyZXN1bHQ6IHsgZmlsZUlkOiBzdHJpbmc7IGxpbmtlZFRvU2hlZXQ6IGJvb2xlYW4gfSkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFF1aWNrRmxvd1Byb2dyZXNzS2V5ID1cbiAgfCBcInVwbG9hZGluZ0ltYWdlXCJcbiAgfCBcImNyZWF0aW5nVGlja2V0XCJcbiAgfCBcInN5bmNpbmdGaWxlXCJcbiAgfCBcImZpbmFsaXppbmdJYVwiXG4gIHwgXCJsaW5raW5nRXhwZW5zZUxpbmVcIlxuICB8IFwiZG9uZVwiO1xuXG5jb25zdCBhc1JlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0+IHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiB7fTtcbiAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xufTtcblxuY29uc3QgZ2V0Rmlyc3REZWZpbmVkID0gKHJlY29yZDogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIGtleXM6IHN0cmluZ1tdKTogdW5rbm93biA9PiB7XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBpZiAoa2V5IGluIHJlY29yZCkge1xuICAgICAgcmV0dXJuIHJlY29yZFtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuY29uc3QgdG9OdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgdG9Qb3NpdGl2ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgcGFyc2VkID4gMCA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCB0b0RkTW1ZeXl5ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHZhbHVlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRUb2RheURkTW1ZeXl5ID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0b0RkTW1ZeXl5KG5ldyBEYXRlKCkpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplR2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5jb25zdCBub3JtYWxpemVJbWFnZUV4dGVuc2lvbiA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XS9nLCBcIlwiKTtcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gXCJcIjtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwianBlZ1wiKSByZXR1cm4gXCJqcGdcIjtcbiAgcmV0dXJuIEFMTE9XRURfVElDS0VUX0lNQUdFX0VYVEVOU0lPTlMuaGFzKG5vcm1hbGl6ZWQpID8gbm9ybWFsaXplZCA6IFwiXCI7XG59O1xuXG5jb25zdCByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBmcm9tTmFtZSA9IHNhZmVUZXh0KGZpbGUubmFtZSkuc3BsaXQoXCIuXCIpLnBvcCgpIHx8IFwiXCI7XG4gIHJldHVybiBub3JtYWxpemVJbWFnZUV4dGVuc2lvbihmcm9tTmFtZSk7XG59O1xuXG5leHBvcnQgY29uc3QgaW5mZXJFeHRlbnNpb24gPSAoZmlsZTogRmlsZSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHR5cGUgPSBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZyb21NaW1lID0gVElDS0VUX01JTUVfVE9fRVhURU5TSU9OW3R5cGVdO1xuICBpZiAoZnJvbU1pbWUpIHJldHVybiBmcm9tTWltZTtcblxuICBjb25zdCBmcm9tTmFtZSA9IHJlc29sdmVFeHRlbnNpb25Gcm9tRmlsZU5hbWUoZmlsZSk7XG4gIGlmIChmcm9tTmFtZSkgcmV0dXJuIGZyb21OYW1lO1xuXG4gIHJldHVybiBcImpwZ1wiO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlID0gKGZpbGU6IEZpbGUpOiBib29sZWFuID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZFR5cGUgPSBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChub3JtYWxpemVkVHlwZSkge1xuICAgIHJldHVybiBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTLmhhcyhub3JtYWxpemVkVHlwZSk7XG4gIH1cblxuICBjb25zdCBleHRlbnNpb24gPSByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lKGZpbGUpO1xuICByZXR1cm4gISFleHRlbnNpb247XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVJhbmRvbUtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIGNyeXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY3J5cHRvLnJhbmRvbVVVSUQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuICB9XG4gIHJldHVybiBgJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDEwKX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhbml0aXplRmlsZU5hbWUgPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGJhc2UgPSBzYWZlVGV4dCh2YWx1ZSkucmVwbGFjZSgvWzw+OlwiL1xcXFx8PypcXHUwMDAwLVxcdTAwMUZdL2csIFwiX1wiKTtcbiAgcmV0dXJuIGJhc2UgfHwgXCJ0aWNrZXQtaW1hZ2VcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhY2VJZEZyb21FcnJvciA9IChlcnJvcjogQXBpRmV0Y2hFcnJvcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBheWxvYWQgPSBzYWZlVGV4dChlcnJvci5yZXNwb25zZUJvZHkpO1xuICBpZiAoIXBheWxvYWQpIHJldHVybiBcIlwiO1xuICB0cnkge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKHBheWxvYWQpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIGNvbnN0IHRyYWNlSWQgPSBzYWZlVGV4dChqc29uLlRyYWNlSWQgPz8ganNvbi50cmFjZUlkKTtcbiAgICByZXR1cm4gdHJhY2VJZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBOb3JtYWxpemVkRHJhZnQgPT4ge1xuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XG4gIGNvbnN0IGRyYWZ0RGVzY3JpcHRpb24gPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiXSkpO1xuICBjb25zdCBkcmFmdEN1cnJlbmN5ID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImN1cnJlbmN5Q29kZVwiLCBcIkN1cnJlbmN5Q29kZVwiXSkpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRyYWZ0VG90YWxBbW91bnQgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcbiAgY29uc3QgZHJhZnRUcmFuc0RhdGUgPSB0b0RkTW1ZeXl5KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0cmFuc0RhdGVcIiwgXCJUcmFuc0RhdGVcIl0pKSB8fCBnZXRUb2RheURkTW1ZeXl5KCk7XG4gIGNvbnN0IGRyYWZ0Q29tbWVudCA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJjb21lbnRhcmlvXCIsIFwiQ29tZW50YXJpb1wiXSkpO1xuICBjb25zdCBkcmFmdEdhc3RvVHlwZSA9IG5vcm1hbGl6ZUdhc3RvVHlwZShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZ2FzdG9UeXBlXCIsIFwiR2FzdG9UeXBlXCJdKSk7XG5cbiAgY29uc3QgcmF3TGluZXMgPSBnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wibGluZXNcIiwgXCJMaW5lc1wiXSk7XG4gIGNvbnN0IGxpbmVBcnJheSA9IEFycmF5LmlzQXJyYXkocmF3TGluZXMpID8gcmF3TGluZXMgOiBbXTtcblxuICBjb25zdCBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdID0gbGluZUFycmF5XG4gICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVSZWNvcmQgPSBhc1JlY29yZChlbnRyeSk7XG4gICAgICBjb25zdCBxdHkgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJxdHlcIiwgXCJRdHlcIl0pKSB8fCAxO1xuICAgICAgY29uc3QgcHJpY2UgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJwcmljZVwiLCBcIlByaWNlXCJdKSkgfHwgMDtcbiAgICAgIGNvbnN0IGV4cGxpY2l0VG90YWwgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcbiAgICAgIGNvbnN0IGNvbXB1dGVkVG90YWwgPSBleHBsaWNpdFRvdGFsID4gMCA/IGV4cGxpY2l0VG90YWwgOiBxdHkgKiBwcmljZTtcbiAgICAgIGlmICghKGNvbXB1dGVkVG90YWwgPiAwKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGNhbmRpZGF0ZVR5cGVWYWx1ZSA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInR5cGVWYWx1ZVwiLCBcIlR5cGVWYWx1ZVwiXSkpO1xuICAgICAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlci5pc0ludGVnZXIoY2FuZGlkYXRlVHlwZVZhbHVlKSA/IE51bWJlcihjYW5kaWRhdGVUeXBlVmFsdWUpIDogbnVsbDtcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IHNhZmVUeXBlVmFsdWUgJiYgc2FmZVR5cGVWYWx1ZSA+IDAgPyBzYWZlVHlwZVZhbHVlIDogZHJhZnRHYXN0b1R5cGUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKSB8fCBkcmFmdERlc2NyaXB0aW9uO1xuICAgICAgY29uc3QgdHJhbnNEYXRlID0gdG9EZE1tWXl5eShnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widHJhbnNEYXRlXCIsIFwiVHJhbnNEYXRlXCJdKSkgfHwgZHJhZnRUcmFuc0RhdGU7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgdHlwZVZhbHVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICAgICAgcXR5LFxuICAgICAgICBwcmljZTogcHJpY2UgPiAwID8gcHJpY2UgOiBjb21wdXRlZFRvdGFsLFxuICAgICAgICB0b3RhbEFtb3VudDogY29tcHV0ZWRUb3RhbCxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIE5vcm1hbGl6ZWREcmFmdExpbmUgPT4gZW50cnkgIT09IG51bGwpO1xuXG4gIHJldHVybiB7XG4gICAgZGVzY3JpcHRpb246IGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0Q3VycmVuY3kgfHwgXCJFVVJcIixcbiAgICB0b3RhbEFtb3VudDogZHJhZnRUb3RhbEFtb3VudCA+IDAgPyBkcmFmdFRvdGFsQW1vdW50IDogbGluZXMucmVkdWNlKChzdW0sIGxpbmUpID0+IHN1bSArIGxpbmUudG90YWxBbW91bnQsIDApLFxuICAgIHRyYW5zRGF0ZTogZHJhZnRUcmFuc0RhdGUsXG4gICAgY29tZW50YXJpbzogZHJhZnRDb21tZW50LFxuICAgIGdhc3RvVHlwZTogZHJhZnRHYXN0b1R5cGUsXG4gICAgbGluZXMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRpY2tldEZpbGVJZEZyb21EcmFmdFJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XG4gIGNvbnN0IGNyZWF0aW9uUmF3ID0gZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlRpY2tldENyZWF0aW9uXCIsIFwidGlja2V0Q3JlYXRpb25cIl0pO1xuICBjb25zdCBjcmVhdGlvbiA9IGFzUmVjb3JkKGNyZWF0aW9uUmF3KTtcbiAgcmV0dXJuIHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChjcmVhdGlvbiwgW1wiRmlsZUlkXCIsIFwiZmlsZUlkXCJdKSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVVwbG9hZFJlc3VsdCA9IChyZXNwb25zZURhdGE6IHVua25vd24pOiBVcGxvYWRTeW5jUmVzdWx0ID0+IHtcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJlc3BvbnNlRGF0YSk7XG4gIHJldHVybiB7XG4gICAgdXJsRmlsZTogc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlVybEZpbGVcIiwgXCJ1cmxGaWxlXCJdKSksXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJGaWxlTmFtZVwiLCBcImZpbGVOYW1lXCJdKSksXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRUaWNrZXRJYVBheWxvYWQgPSAoZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCwgdXBsb2FkOiBVcGxvYWRTeW5jUmVzdWx0KTogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0+IHtcbiAgY29uc3QgaWFMaW5lcyA9IGRyYWZ0LmxpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICBkZXNjcmlwdGlvbjogbGluZS5kZXNjcmlwdGlvbixcbiAgICBxdHk6IGxpbmUucXR5LFxuICAgIHByaWNlOiBsaW5lLnByaWNlLFxuICAgIHRvdGFsQW1vdW50OiBsaW5lLnRvdGFsQW1vdW50LFxuICB9KSk7XG5cbiAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0ge1xuICAgIGRlc2NyaXB0aW9uOiBkcmFmdC5kZXNjcmlwdGlvbixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0LmN1cnJlbmN5Q29kZSxcbiAgICB0b3RhbEFtb3VudDogZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiB1bmRlZmluZWQsXG4gICAgdHJhbnNEYXRlOiBkcmFmdC50cmFuc0RhdGUsXG4gICAgY29tZW50YXJpbzogZHJhZnQuY29tZW50YXJpbyB8fCB1bmRlZmluZWQsXG4gICAgdXJsRmlsZTogdXBsb2FkLnVybEZpbGUgfHwgdW5kZWZpbmVkLFxuICAgIGZpbGVOYW1lOiB1cGxvYWQuZmlsZU5hbWUgfHwgdW5kZWZpbmVkLFxuICAgIGxpbmVzOiBpYUxpbmVzLFxuICB9O1xuXG4gIGlmIChkcmFmdC5nYXN0b1R5cGUgIT09IG51bGwpIHtcbiAgICBwYXlsb2FkLmdhc3RvVHlwZSA9IGRyYWZ0Lmdhc3RvVHlwZSBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkU2hlZXRMaW5lUGF5bG9hZCA9IChcbiAgZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCxcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHByb2plY3RJZDogc3RyaW5nXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCB8IG51bGwgPT4ge1xuICBjb25zdCBsaW5lRnJvbURyYWZ0ID0gZHJhZnQubGluZXNbMF07XG4gIC8vIEJ1aWxkIGEgc2luZ2xlIGV4cGVuc2UgbGluZSBmcm9tIHRpY2tldCBoZWFkZXIgZGF0YSB0byBhdm9pZCBsaW5lLWxldmVsIGRlc2NyaXB0aW9uIGxlYWthZ2UuXG4gIGNvbnN0IGhlYWRlclRvdGFsID0gZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiAwO1xuICBjb25zdCBmYWxsYmFja1RvdGFsID0gbGluZUZyb21EcmFmdD8udG90YWxBbW91bnQgfHwgMDtcbiAgY29uc3QgZWZmZWN0aXZlVG90YWwgPSBoZWFkZXJUb3RhbCA+IDAgPyBoZWFkZXJUb3RhbCA6IGZhbGxiYWNrVG90YWw7XG4gIGlmICghKGVmZmVjdGl2ZVRvdGFsID4gMCkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHR5cGVWYWx1ZUNhbmRpZGF0ZSA9IGRyYWZ0Lmdhc3RvVHlwZSB8fCBsaW5lRnJvbURyYWZ0Py50eXBlVmFsdWUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcbiAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlcih0eXBlVmFsdWVDYW5kaWRhdGUpO1xuICBjb25zdCB0eXBlVmFsdWUgPSBOdW1iZXIuaXNJbnRlZ2VyKHNhZmVUeXBlVmFsdWUpICYmIHNhZmVUeXBlVmFsdWUgPiAwID8gc2FmZVR5cGVWYWx1ZSA6IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XG5cbiAgcmV0dXJuIHtcbiAgICB0cmFuc0RhdGU6IGRyYWZ0LnRyYW5zRGF0ZSB8fCBsaW5lRnJvbURyYWZ0Py50cmFuc0RhdGUgfHwgZ2V0VG9kYXlEZE1tWXl5eSgpLFxuICAgIHR5cGVWYWx1ZSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoZHJhZnQuZGVzY3JpcHRpb24pIHx8IFwiVGlja2V0XCIsXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXG4gICAgZmlsZUlkLFxuICAgIHRpY2tldDogdHJ1ZSxcbiAgICBxdHk6IDEsXG4gICAgcHJpY2U6IGVmZmVjdGl2ZVRvdGFsLFxuICAgIHByb2pJZDogc2FmZVRleHQocHJvamVjdElkKSB8fCB1bmRlZmluZWQsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcGVyc2lzdFRyYWNlTGlzdCA9ICh0cmFjZUxpc3Q6IFRpY2tldFRyYWNlRW50cnlbXSk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVElDS0VUX1RSQUNFX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeSh0cmFjZUxpc3QpKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gSWdub3JlIHN0b3JhZ2UgZmFpbHVyZXMgaW4gcmVzdHJpY3RlZCBicm93c2VyIGNvbnRleHRzLlxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY2FjaGVJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZywgZmlsZTogRmlsZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuO1xuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XG4gIGF3YWl0IGNhY2hlLnB1dChcbiAgICBuZXcgUmVxdWVzdChyZXF1ZXN0VXJsKSxcbiAgICBuZXcgUmVzcG9uc2UoZmlsZSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBzYWZlVGV4dChmaWxlLnR5cGUpIHx8IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG4gICAgICB9LFxuICAgIH0pXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVhZENhY2hlZEltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTxCbG9iIHwgbnVsbD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcbiAgY29uc3QgY2FjaGVkUmVzcG9uc2UgPSBhd2FpdCBjYWNoZS5tYXRjaChyZXF1ZXN0VXJsKTtcbiAgaWYgKCFjYWNoZWRSZXNwb25zZSkgcmV0dXJuIG51bGw7XG4gIHJldHVybiBjYWNoZWRSZXNwb25zZS5ibG9iKCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybjtcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xuICBhd2FpdCBjYWNoZS5kZWxldGUocmVxdWVzdFVybCk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsbUJBQXVEOzs7QUNVeEQsSUFBTSwwQkFBMEI7QUFDaEMsSUFBTSw0QkFBNEI7QUFDbEMsSUFBTSwyQkFBMkI7QUFFMUIsSUFBTSw4QkFBOEIsS0FBSyxPQUFPO0FBQ3ZELElBQU0sa0NBQWtDLG9CQUFJLElBQVksQ0FBQyxjQUFjLGFBQWEsYUFBYSxZQUFZLENBQUM7QUFDOUcsSUFBTSxrQ0FBa0Msb0JBQUksSUFBWSxDQUFDLE9BQU8sUUFBUSxPQUFPLE1BQU0sQ0FBQztBQUN0RixJQUFNLDJCQUFtRDtBQUFBLEVBQ3ZELGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLGNBQWM7QUFDaEI7QUFDQSxJQUFNLDZCQUE2QixvQkFBSSxJQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2xGLElBQU0sNEJBQTRCO0FBQzNCLElBQU0sc0JBQXNCO0FBdUVuQyxJQUFNLFdBQVcsQ0FBQyxVQUE0QztBQUM1RCxNQUFJLENBQUMsU0FBUyxPQUFPLFVBQVUsU0FBVSxRQUFPLENBQUM7QUFDakQsU0FBTztBQUNUO0FBRUEsSUFBTSxrQkFBa0IsQ0FBQyxRQUFpQyxTQUE0QjtBQUNwRixhQUFXLE9BQU8sTUFBTTtBQUN0QixRQUFJLE9BQU8sUUFBUTtBQUNqQixhQUFPLE9BQU8sR0FBRztBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUNBLFNBQU87QUFDVDtBQUVBLElBQU0sV0FBVyxDQUFDLFVBQWtDO0FBQ2xELE1BQUksVUFBVSxRQUFRLFVBQVUsT0FBVyxR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SUFBSTtBQUFBLEVBQzFCLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztBQUVoQyxRQUFNLHdCQUFvQiwwQkFBWSxNQUFNO0FBQzFDLFFBQUksS0FBTTtBQUNWLHdCQUFvQixLQUFLO0FBQUEsRUFDM0IsR0FBRyxDQUFDLElBQUksQ0FBQztBQUVULFFBQU0sOEJBQTBCLDBCQUFZLFlBQXFDO0FBQy9FLFFBQUksT0FBTyxjQUFjLFlBQWEsUUFBTztBQUM3QyxVQUFNLGVBQWUsVUFBVTtBQUMvQixRQUFJLENBQUMsZ0JBQWdCLE9BQU8sYUFBYSxpQkFBaUIsV0FBWSxRQUFPO0FBRTdFLFFBQUk7QUFDRixZQUFNLFNBQVMsTUFBTSxhQUFhLGFBQWE7QUFBQSxRQUM3QyxPQUFPLEVBQUUsWUFBWSxjQUFjO0FBQUEsTUFDckMsQ0FBQztBQUNELGFBQU8sVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVLE1BQU0sS0FBSyxDQUFDO0FBQ2xELGFBQU87QUFBQSxJQUNULFFBQVE7QUFDTixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHVCQUFtQjtBQUFBLElBQ3ZCLE9BQU8saUJBQTBDO0FBQy9DLFVBQUksQ0FBQyxhQUFjO0FBQ25CLFlBQU0sVUFBVSxNQUFNLHdCQUF3QjtBQUM5QyxVQUFJLFlBQVksT0FBTztBQUNyQix3QkFBZ0IsS0FBSyxrREFBa0QsZ0NBQWdDLENBQUM7QUFDeEc7QUFBQSxNQUNGO0FBQ0EsMEJBQW9CLEtBQUs7QUFDekIsbUJBQWEsTUFBTTtBQUFBLElBQ3JCO0FBQUEsSUFDQSxDQUFDLHVCQUF1QjtBQUFBLEVBQzFCO0FBRUEsUUFBTSx3QkFBb0IsMEJBQVksQ0FBQyxpQkFBMEM7QUFDL0UsUUFBSSxDQUFDLGFBQWM7QUFDbkIsd0JBQW9CLEtBQUs7QUFDekIsaUJBQWEsTUFBTTtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxpQkFBYSwwQkFBWSxNQUFNO0FBQ25DLG9CQUFnQixFQUFFO0FBQUEsRUFDcEIsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLHVCQUF1Qix1QkFBdUI7QUFBQSxJQUM5QztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
