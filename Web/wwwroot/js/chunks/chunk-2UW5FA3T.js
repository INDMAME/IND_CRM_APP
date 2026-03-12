import {
  flashActionMark
} from "./chunk-K7MECJ5E.js";
import {
  safeText
} from "./chunk-HJEMXS35.js";
import {
  applyExpenseSheetTicketIa,
  createExpenseSheet,
  createExpenseSheetTicket,
  extractExpenseFromTicketDraft,
  uploadExpenseSheetTicketFile
} from "./chunk-O4OGMU3X.js";
import {
  toExpenseApiDdMmYyyy
} from "./chunk-MJTGTPH5.js";
import {
  classNames,
  indT
} from "./chunk-BYICIYT4.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-BWM3JLWG.js";
import {
  ApiFetchError
} from "./chunk-IKHTGBEE.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/PageBottomActions.tsx
var import_react2 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/usePageBottomActionsVisibility.ts
var import_react = __toESM(require_react());
var usePageBottomActionsVisibility = () => {
  const wrapperRef = (0, import_react.useRef)(null);
  const animationFrameRef = (0, import_react.useRef)(null);
  const [reservedHeight, setReservedHeight] = (0, import_react.useState)(0);
  const measureHeight = (0, import_react.useEffectEvent)(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const nextHeight = Math.ceil(wrapper.getBoundingClientRect().height);
    setReservedHeight((previous) => Math.abs(previous - nextHeight) < 1 ? previous : nextHeight);
  });
  const scheduleMeasure = (0, import_react.useEffectEvent)(() => {
    if (typeof window === "undefined") return;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      measureHeight();
    });
  });
  (0, import_react.useLayoutEffect)(() => {
    measureHeight();
    if (typeof ResizeObserver === "undefined") return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new ResizeObserver(() => {
      scheduleMeasure();
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      scheduleMeasure();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  return {
    reservedHeight,
    wrapperRef
  };
};

// Web/wwwroot/react/src/components/commons/PageBottomActions.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var MAX_PAGE_BOTTOM_ACTIONS = 4;
var PageBottomActionButton = ({
  label,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button",
  tabIndex,
  fullWidth = false
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type,
      disabled,
      onClick,
      "aria-label": ariaLabel || label,
      tabIndex,
      className: classNames(
        "inline-block w-full rounded-[5px] disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "col-span-2" : "",
        className || ""
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex w-full items-center justify-center rounded-[5px] border border-[#001f4d]/80 bg-primary px-3 py-2.5 text-center text-[12px] font-semibold leading-tight text-white shadow-xs transition-colors duration-150 hover:bg-[#001f4d] sm:px-4 sm:py-2.5 sm:text-[13px]", children: label })
    }
  );
};
PageBottomActionButton.displayName = "PageBottomActionButton";
var PageBottomActions = ({ children, ariaLabel, className }) => {
  const actionButtons = import_react2.Children.toArray(children).filter(
    (child) => (0, import_react2.isValidElement)(child) && child.type === PageBottomActionButton
  ).slice(0, MAX_PAGE_BOTTOM_ACTIONS);
  const actionCount = actionButtons.length;
  const { reservedHeight, wrapperRef } = usePageBottomActionsVisibility();
  const portalTarget = typeof document === "undefined" ? null : document.body;
  if (actionCount < 1) {
    return null;
  }
  const actionBar = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: wrapperRef,
      className: "fixed inset-x-0 bottom-0 z-1900 border-t border-slate-200/90 bg-white shadow-[0_-10px_28px_rgba(15,23,42,0.12)]",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "w-full px-2 pt-2 sm:px-3 sm:pt-2.5",
          style: { paddingBottom: "calc(0.2rem + env(safe-area-inset-bottom, 0px))" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              role: "toolbar",
              "aria-label": ariaLabel,
              className: classNames("pointer-events-auto w-full", className || ""),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid grid-cols-2 gap-1.5", children: actionButtons.map((child, index) => {
                const shouldUseFullWidth = actionCount === 1 || actionCount % 2 === 1 && index === actionCount - 1;
                return (0, import_react2.cloneElement)(child, {
                  fullWidth: shouldUseFullWidth,
                  tabIndex: child.props.tabIndex,
                  key: child.key ?? `page-bottom-action-${index}`
                });
              }) })
            }
          )
        }
      )
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "aria-hidden": "true", style: { height: `${reservedHeight}px` } }),
    portalTarget ? (0, import_react_dom.createPortal)(actionBar, portalTarget) : null
  ] });
};
var PageBottomActions_default = PageBottomActions;

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlow.ts
var import_react3 = __toESM(require_react());

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
  const [sourcePickerOpen, setSourcePickerOpen] = (0, import_react3.useState)(false);
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const [progressKey, setProgressKey] = (0, import_react3.useState)(null);
  const [errorMessage, setErrorMessage] = (0, import_react3.useState)("");
  const [pendingUploadRetry, setPendingUploadRetry] = (0, import_react3.useState)(null);
  const [traceList, setTraceList] = (0, import_react3.useState)([]);
  const latestFileRef = (0, import_react3.useRef)(null);
  const progressMessage = (0, import_react3.useMemo)(() => {
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
  const addTrace = (0, import_react3.useCallback)((step, traceId) => {
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
  const clearFlowState = (0, import_react3.useCallback)(() => {
    setErrorMessage("");
    setPendingUploadRetry(null);
    setTraceList([]);
    persistTraceList([]);
  }, []);
  const buildApiOptions = (0, import_react3.useCallback)(() => {
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
  const ensureQuickCreatePermission = (0, import_react3.useCallback)(() => {
    if (!canCreateExpense || isCreateMode || isSheetLocked || linkToSheet && !sheetId) {
      onForbidden();
      return false;
    }
    return true;
  }, [canCreateExpense, isCreateMode, isSheetLocked, linkToSheet, onForbidden, sheetId]);
  const resolveUiErrorMessage = (0, import_react3.useCallback)(
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
  const applyIaAndFinalize = (0, import_react3.useCallback)(
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
  const resumeFromUploadStep = (0, import_react3.useCallback)(
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
  const runIaCreateFlow = (0, import_react3.useCallback)(
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
  const runManualCreateFlow = (0, import_react3.useCallback)(
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
  const handleSelectedFile = (0, import_react3.useCallback)(
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
  const retryPendingUpload = (0, import_react3.useCallback)(async () => {
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
  const openSourcePicker = (0, import_react3.useCallback)(() => {
    if (!ensureQuickCreatePermission()) return;
    setErrorMessage("");
    setSourcePickerOpen(true);
  }, [ensureQuickCreatePermission]);
  const closeSourcePicker = (0, import_react3.useCallback)(() => {
    if (busy) return;
    setSourcePickerOpen(false);
  }, [busy]);
  const requestCameraPermission = (0, import_react3.useCallback)(async () => {
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
  const selectFromCamera = (0, import_react3.useCallback)(
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
  const selectFromGallery = (0, import_react3.useCallback)((inputElement) => {
    if (!inputElement) return;
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);
  const clearError = (0, import_react3.useCallback)(() => {
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
  PageBottomActionButton,
  PageBottomActions_default,
  useExpenseSheetQuickTicketFlow
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQsIGlzVmFsaWRFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5LnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxuY29uc3QgTUFYX1BBR0VfQk9UVE9NX0FDVElPTlMgPSA0O1xuXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBvbkNsaWNrPzogUmVhY3QuTW91c2VFdmVudEhhbmRsZXI8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGFyaWFMYWJlbD86IHN0cmluZztcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xuICB0YWJJbmRleD86IG51bWJlcjtcbiAgZnVsbFdpZHRoPzogYm9vbGVhbjtcbn07XG5cbnR5cGUgUGFnZUJvdHRvbUFjdGlvbnNQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIER1bWIgYnV0dG9uIHVzZWQgYnkgdGhlIHNoYXJlZCBib3R0b20gYWN0aW9uIGJhci5cbmV4cG9ydCBjb25zdCBQYWdlQm90dG9tQWN0aW9uQnV0dG9uID0gKHtcbiAgbGFiZWwsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgYXJpYUxhYmVsLFxuICB0eXBlID0gXCJidXR0b25cIixcbiAgdGFiSW5kZXgsXG4gIGZ1bGxXaWR0aCA9IGZhbHNlLFxufTogUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT17dHlwZX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XG4gICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgIFwiaW5saW5lLWJsb2NrIHctZnVsbCByb3VuZGVkLVs1cHhdIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTYwXCIsXG4gICAgICAgIGZ1bGxXaWR0aCA/IFwiY29sLXNwYW4tMlwiIDogXCJcIixcbiAgICAgICAgY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICl9XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCB3LWZ1bGwgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtWzVweF0gYm9yZGVyIGJvcmRlci1bIzAwMWY0ZF0vODAgYmctcHJpbWFyeSBweC0zIHB5LTIuNSB0ZXh0LWNlbnRlciB0ZXh0LVsxMnB4XSBmb250LXNlbWlib2xkIGxlYWRpbmctdGlnaHQgdGV4dC13aGl0ZSBzaGFkb3cteHMgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMTUwIGhvdmVyOmJnLVsjMDAxZjRkXSBzbTpweC00IHNtOnB5LTIuNSBzbTp0ZXh0LVsxM3B4XVwiPlxuICAgICAgICB7bGFiZWx9XG4gICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG5QYWdlQm90dG9tQWN0aW9uQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJQYWdlQm90dG9tQWN0aW9uQnV0dG9uXCI7XG5cbi8vIEZpeGVkIGJvdHRvbSBhY3Rpb24gYmFyIHRoYXQgc3RheXMgdmlzaWJsZSB3aGlsZSB0aGUgcGFnZSBzY3JvbGxzLlxuY29uc3QgUGFnZUJvdHRvbUFjdGlvbnMgPSAoeyBjaGlsZHJlbiwgYXJpYUxhYmVsLCBjbGFzc05hbWUgfTogUGFnZUJvdHRvbUFjdGlvbnNQcm9wcykgPT4ge1xuICBjb25zdCBhY3Rpb25CdXR0b25zID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbilcbiAgICAuZmlsdGVyKFxuICAgICAgKGNoaWxkKTogY2hpbGQgaXMgUmVhY3QuUmVhY3RFbGVtZW50PFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcz4gPT5cbiAgICAgICAgaXNWYWxpZEVsZW1lbnQ8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzPihjaGlsZCkgJiYgY2hpbGQudHlwZSA9PT0gUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblxuICAgIClcbiAgICAuc2xpY2UoMCwgTUFYX1BBR0VfQk9UVE9NX0FDVElPTlMpO1xuXG4gIGNvbnN0IGFjdGlvbkNvdW50ID0gYWN0aW9uQnV0dG9ucy5sZW5ndGg7XG4gIGNvbnN0IHsgcmVzZXJ2ZWRIZWlnaHQsIHdyYXBwZXJSZWYgfSA9IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSgpO1xuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcblxuICBpZiAoYWN0aW9uQ291bnQgPCAxKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBhY3Rpb25CYXIgPSAoXG4gICAgPGRpdlxuICAgICAgcmVmPXt3cmFwcGVyUmVmfVxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQteC0wIGJvdHRvbS0wIHotMTkwMCBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwLzkwIGJnLXdoaXRlIHNoYWRvdy1bMF8tMTBweF8yOHB4X3JnYmEoMTUsMjMsNDIsMC4xMildXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0yIHB0LTIgc206cHgtMyBzbTpwdC0yLjVcIlxuICAgICAgICBzdHlsZT17eyBwYWRkaW5nQm90dG9tOiBcImNhbGMoMC4ycmVtICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20sIDBweCkpXCIgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJvbGU9XCJ0b29sYmFyXCJcbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwicG9pbnRlci1ldmVudHMtYXV0byB3LWZ1bGxcIiwgY2xhc3NOYW1lIHx8IFwiXCIpfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIHthY3Rpb25CdXR0b25zLm1hcCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNob3VsZFVzZUZ1bGxXaWR0aCA9IGFjdGlvbkNvdW50ID09PSAxIHx8IChhY3Rpb25Db3VudCAlIDIgPT09IDEgJiYgaW5kZXggPT09IGFjdGlvbkNvdW50IC0gMSk7XG4gICAgICAgICAgICAgIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBmdWxsV2lkdGg6IHNob3VsZFVzZUZ1bGxXaWR0aCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQucHJvcHMudGFiSW5kZXgsXG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgPz8gYHBhZ2UtYm90dG9tLWFjdGlvbi0ke2luZGV4fWAsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT17eyBoZWlnaHQ6IGAke3Jlc2VydmVkSGVpZ2h0fXB4YCB9fSAvPlxuICAgICAge3BvcnRhbFRhcmdldCA/IGNyZWF0ZVBvcnRhbChhY3Rpb25CYXIsIHBvcnRhbFRhcmdldCkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnZUJvdHRvbUFjdGlvbnM7XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VFZmZlY3RFdmVudCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB0eXBlIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIFVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eVJlc3VsdCA9IHtcbiAgcmVzZXJ2ZWRIZWlnaHQ6IG51bWJlcjtcbiAgd3JhcHBlclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG59O1xuXG4vLyBUcmFja3MgdGhlIGJvdHRvbSBhY3Rpb24gYmFyIGhlaWdodCBzbyB0aGUgcGFnZSByZXNlcnZlcyBlbm91Z2ggc3BhY2UgZm9yIGl0LlxuZXhwb3J0IGNvbnN0IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSA9ICgpOiBVc2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHlSZXN1bHQgPT4ge1xuICBjb25zdCB3cmFwcGVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFuaW1hdGlvbkZyYW1lUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbcmVzZXJ2ZWRIZWlnaHQsIHNldFJlc2VydmVkSGVpZ2h0XSA9IHVzZVN0YXRlKDApO1xuXG4gIGNvbnN0IG1lYXN1cmVIZWlnaHQgPSB1c2VFZmZlY3RFdmVudCgoKSA9PiB7XG4gICAgY29uc3Qgd3JhcHBlciA9IHdyYXBwZXJSZWYuY3VycmVudDtcbiAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcblxuICAgIGNvbnN0IG5leHRIZWlnaHQgPSBNYXRoLmNlaWwod3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpO1xuICAgIHNldFJlc2VydmVkSGVpZ2h0KChwcmV2aW91cykgPT4gKE1hdGguYWJzKHByZXZpb3VzIC0gbmV4dEhlaWdodCkgPCAxID8gcHJldmlvdXMgOiBuZXh0SGVpZ2h0KSk7XG4gIH0pO1xuXG4gIGNvbnN0IHNjaGVkdWxlTWVhc3VyZSA9IHVzZUVmZmVjdEV2ZW50KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcbiAgICB9XG5cbiAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIG1lYXN1cmVIZWlnaHQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBtZWFzdXJlSGVpZ2h0KCk7XG5cbiAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgY29uc3Qgd3JhcHBlciA9IHdyYXBwZXJSZWYuY3VycmVudDtcbiAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgIHNjaGVkdWxlTWVhc3VyZSgpO1xuICAgIH0pO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3cmFwcGVyKTtcbiAgICByZXR1cm4gKCkgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xuICAgICAgc2NoZWR1bGVNZWFzdXJlKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xuXG4gICAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgcmVzZXJ2ZWRIZWlnaHQsXG4gICAgd3JhcHBlclJlZixcbiAgfTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSwgRXhwZW5zZVNoZWV0VGlja2V0Q3JlYXRlUmVxdWVzdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcbmltcG9ydCB7XG4gIGFwcGx5RXhwZW5zZVNoZWV0VGlja2V0SWEsXG4gIGNyZWF0ZUV4cGVuc2VTaGVldCxcbiAgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0LFxuICBleHRyYWN0RXhwZW5zZUZyb21UaWNrZXREcmFmdCxcbiAgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZSxcbn0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5pbXBvcnQge1xuICBERUZBVUxUX0NSRUFURV9NT0RFLFxuICBNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMsXG4gIGJ1aWxkU2hlZXRMaW5lUGF5bG9hZCxcbiAgYnVpbGRUaWNrZXRJYVBheWxvYWQsXG4gIGNhY2hlSW1hZ2VGaWxlLFxuICBleHRyYWN0VHJhY2VJZEZyb21FcnJvcixcbiAgZ2V0VG9kYXlEZE1tWXl5eSxcbiAgaW5mZXJFeHRlbnNpb24sXG4gIGlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlLFxuICBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlLFxuICBwZXJzaXN0VHJhY2VMaXN0LFxuICByZWFkQ2FjaGVkSW1hZ2VGaWxlLFxuICByZW1vdmVDYWNoZWRJbWFnZUZpbGUsXG4gIHJlc29sdmVSYW5kb21LZXksXG4gIHJlc29sdmVUaWNrZXRGaWxlSWRGcm9tRHJhZnRSZXNwb25zZSxcbiAgcmVzb2x2ZVVwbG9hZFJlc3VsdCxcbiAgc2FuaXRpemVGaWxlTmFtZSxcbiAgdHlwZSBOb3JtYWxpemVkRHJhZnQsXG4gIHR5cGUgUGVuZGluZ1VwbG9hZFJldHJ5LFxuICB0eXBlIFF1aWNrRmxvd1Byb2dyZXNzS2V5LFxuICB0eXBlIFRpY2tldEltYWdlU291cmNlLFxuICB0eXBlIFRpY2tldFRyYWNlRW50cnksXG4gIHR5cGUgVXBsb2FkU3luY1Jlc3VsdCxcbiAgdHlwZSBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzLFxufSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzXCI7XG5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgPSAoe1xuICBzaGVldElkID0gXCJcIixcbiAgcHJvamVjdElkID0gXCJcIixcbiAgY3VycmVuY3lDb2RlID0gXCJcIixcbiAgYXhVc2VySWRPdmVycmlkZSA9IFwiXCIsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNTaGVldExvY2tlZCxcbiAgbGlua1RvU2hlZXQgPSB0cnVlLFxuICBvbkZvcmJpZGRlbixcbiAgb25Db21wbGV0ZWQsXG59OiBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzKSA9PiB7XG4gIGNvbnN0IFtzb3VyY2VQaWNrZXJPcGVuLCBzZXRTb3VyY2VQaWNrZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcHJvZ3Jlc3NLZXksIHNldFByb2dyZXNzS2V5XSA9IHVzZVN0YXRlPFF1aWNrRmxvd1Byb2dyZXNzS2V5IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3BlbmRpbmdVcGxvYWRSZXRyeSwgc2V0UGVuZGluZ1VwbG9hZFJldHJ5XSA9IHVzZVN0YXRlPFBlbmRpbmdVcGxvYWRSZXRyeSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbdHJhY2VMaXN0LCBzZXRUcmFjZUxpc3RdID0gdXNlU3RhdGU8VGlja2V0VHJhY2VFbnRyeVtdPihbXSk7XG4gIGNvbnN0IGxhdGVzdEZpbGVSZWYgPSB1c2VSZWY8eyBjYWNoZUtleTogc3RyaW5nOyBmaWxlOiBGaWxlIH0gfCBudWxsPihudWxsKTtcblxuICBjb25zdCBwcm9ncmVzc01lc3NhZ2UgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwidXBsb2FkaW5nSW1hZ2VcIikge1xuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfVXBsb2FkaW5nSW1hZ2VcIiwgXCJVcGxvYWRpbmcgaW1hZ2UuLi5cIik7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJjcmVhdGluZ1RpY2tldFwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19DcmVhdGluZ1RpY2tldFwiLCBcIkNyZWF0aW5nIHRpY2tldC4uLlwiKTtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcInN5bmNpbmdGaWxlXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX1N5bmNpbmdGaWxlXCIsIFwiU3luY2luZyBmaWxlLi4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwiZmluYWxpemluZ0lhXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0ZpbmFsaXppbmdcIiwgXCJGaW5hbGl6aW5nIElBLi4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwibGlua2luZ0V4cGVuc2VMaW5lXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0xpbmtpbmdMaW5lXCIsIFwiTGlua2luZyBleHBlbnNlIGxpbmUuLi5cIik7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJkb25lXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0RvbmVcIiwgXCJEb25lXCIpO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbiAgfSwgW3Byb2dyZXNzS2V5XSk7XG5cbiAgY29uc3QgYWRkVHJhY2UgPSB1c2VDYWxsYmFjaygoc3RlcDogc3RyaW5nLCB0cmFjZUlkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzYWZlVHJhY2VJZCA9IHNhZmVUZXh0KHRyYWNlSWQpO1xuICAgIGlmICghc2FmZVRyYWNlSWQpIHJldHVybjtcblxuICAgIHNldFRyYWNlTGlzdCgocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBbXG4gICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcCxcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVHJhY2VJZCxcbiAgICAgICAgICBhdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICAgIHBlcnNpc3RUcmFjZUxpc3QobmV4dCk7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyRmxvd1N0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRQZW5kaW5nVXBsb2FkUmV0cnkobnVsbCk7XG4gICAgc2V0VHJhY2VMaXN0KFtdKTtcbiAgICBwZXJzaXN0VHJhY2VMaXN0KFtdKTtcbiAgfSwgW10pO1xuXG4gIC8vIEZvcmNlcyBtdXRhdGlvbnMgdG8gZm9sbG93IHRoZSBwYWdlLXJlc29sdmVkIEFYIHVzZXIgaW5zdGVhZCBvZiBhbnkgc3RhbGUgZ2xvYmFsIG92ZXJyaWRlLlxuICBjb25zdCBidWlsZEFwaU9wdGlvbnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZUF4VXNlcklkID0gc2FmZVRleHQoYXhVc2VySWRPdmVycmlkZSk7XG4gICAgaWYgKCFzYWZlQXhVc2VySWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiWC1JTkQtQXhVc2VySWRcIjogc2FmZUF4VXNlcklkLFxuICAgICAgfSxcbiAgICB9O1xuICB9LCBbYXhVc2VySWRPdmVycmlkZV0pO1xuXG4gIGNvbnN0IGVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbiA9IHVzZUNhbGxiYWNrKCgpOiBib29sZWFuID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UgfHwgaXNDcmVhdGVNb2RlIHx8IGlzU2hlZXRMb2NrZWQgfHwgKGxpbmtUb1NoZWV0ICYmICFzaGVldElkKSkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzU2hlZXRMb2NrZWQsIGxpbmtUb1NoZWV0LCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xuXG4gIGNvbnN0IHJlc29sdmVVaUVycm9yTWVzc2FnZSA9IHVzZUNhbGxiYWNrKFxuICAgIChlcnJvcjogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyMikge1xuICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25UZXh0ID0gQXJyYXkuaXNBcnJheShlcnJvci52YWxpZGF0aW9uRXJyb3JzKVxuICAgICAgICAgICAgPyBlcnJvci52YWxpZGF0aW9uRXJyb3JzXG4gICAgICAgICAgICAgICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gc2FmZVRleHQoZW50cnk/LkZpZWxkKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzYWZlVGV4dChlbnRyeT8uTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoZmllbGQgJiYgbWVzc2FnZSkgcmV0dXJuIGAke2ZpZWxkfTogJHttZXNzYWdlfWA7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbWVzc2FnZSB8fCBmaWVsZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoKGVudHJ5KSA9PiBlbnRyeSlcbiAgICAgICAgICAgICAgICAuam9pbihcIiB8IFwiKVxuICAgICAgICAgICAgOiBcIlwiO1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0aW9uVGV4dCB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfVmFsaWRhdGlvblwiLCBcIlZhbGlkYXRpb24gZXJyb3IuXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm90Rm91bmRcIiwgXCJSZWNvcmQgbm90IGZvdW5kLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcbiAgICAgICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1NlcnZlclwiLCBcIlNlcnZlciBlcnJvci5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcbiAgICAgICAgPyBzYWZlVGV4dChlcnJvci5tZXNzYWdlKVxuICAgICAgICA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgYXBwbHlJYUFuZEZpbmFsaXplID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGZpbGVJZDogc3RyaW5nLCBkcmFmdDogTm9ybWFsaXplZERyYWZ0LCB1cGxvYWRSZXN1bHQ6IFVwbG9hZFN5bmNSZXN1bHQpID0+IHtcbiAgICAgIHNldFByb2dyZXNzS2V5KFwiZmluYWxpemluZ0lhXCIpO1xuICAgICAgY29uc3QgaWFQYXlsb2FkID0gYnVpbGRUaWNrZXRJYVBheWxvYWQoZHJhZnQsIHVwbG9hZFJlc3VsdCk7XG4gICAgICBjb25zdCBpYVJlc3BvbnNlID0gYXdhaXQgYXBwbHlFeHBlbnNlU2hlZXRUaWNrZXRJYShmaWxlSWQsIGlhUGF5bG9hZCwgYnVpbGRBcGlPcHRpb25zKCkpO1xuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtaWFcIiwgc2FmZVRleHQoKGlhUmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgaWYgKGlhUmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQoaWFSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWxpbmtUb1NoZWV0KSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGxpbmVQYXlsb2FkID0gYnVpbGRTaGVldExpbmVQYXlsb2FkKGRyYWZ0LCBmaWxlSWQsIHByb2plY3RJZCk7XG4gICAgICBpZiAoIWxpbmVQYXlsb2FkKSByZXR1cm47XG5cbiAgICAgIHNldFByb2dyZXNzS2V5KFwibGlua2luZ0V4cGVuc2VMaW5lXCIpO1xuICAgICAgY29uc3QgY3JlYXRlUmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXQoXG4gICAgICAgIHtcbiAgICAgICAgICBtb2RlOiAyLFxuICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBzaGVldElkLFxuICAgICAgICAgIGxpbmVzOiBbbGluZVBheWxvYWRdLFxuICAgICAgICB9LFxuICAgICAgICBidWlsZEFwaU9wdGlvbnMoKVxuICAgICAgKTtcbiAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZS1zaGVldC1hcHBlbmQtbGluZVwiLCBzYWZlVGV4dCgoY3JlYXRlUmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgaWYgKGNyZWF0ZVJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNhZmVUZXh0KGNyZWF0ZVJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbYWRkVHJhY2UsIGJ1aWxkQXBpT3B0aW9ucywgbGlua1RvU2hlZXQsIHByb2plY3RJZCwgc2hlZXRJZF1cbiAgKTtcblxuICBjb25zdCByZXN1bWVGcm9tVXBsb2FkU3RlcCA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChwZW5kaW5nU3RhdGU6IFBlbmRpbmdVcGxvYWRSZXRyeSwgZmlsZTogRmlsZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgc2V0QnVzeSh0cnVlKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgIHNldFByb2dyZXNzS2V5KFwic3luY2luZ0ZpbGVcIik7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHVwbG9hZFJlc3BvbnNlID0gYXdhaXQgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZShcbiAgICAgICAgICBwZW5kaW5nU3RhdGUuZmlsZUlkLFxuICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgcGVuZGluZ1N0YXRlLmV4dGVuc2lvbixcbiAgICAgICAgICBidWlsZEFwaU9wdGlvbnMoKVxuICAgICAgICApO1xuICAgICAgICBhZGRUcmFjZShcInRpY2tldC1maWxlLXVwbG9hZFwiLCBzYWZlVGV4dCgodXBsb2FkUmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgICBpZiAodXBsb2FkUmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dCh1cGxvYWRSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXBsb2FkUmVzdWx0ID0gcmVzb2x2ZVVwbG9hZFJlc3VsdCh1cGxvYWRSZXNwb25zZS5EYXRhKTtcbiAgICAgICAgbGV0IGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQ7XG4gICAgICAgIGlmIChwZW5kaW5nU3RhdGUuc3RyYXRlZ3kgPT09IFwiaWEtcmVhZHlcIikge1xuICAgICAgICAgIGRyYWZ0ID0gcGVuZGluZ1N0YXRlLmRyYWZ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFByb2dyZXNzS2V5KFwidXBsb2FkaW5nSW1hZ2VcIik7XG4gICAgICAgICAgY29uc3QgaWFEcmFmdFJlc3BvbnNlID0gYXdhaXQgZXh0cmFjdEV4cGVuc2VGcm9tVGlja2V0RHJhZnQoXG4gICAgICAgICAgICBmaWxlLFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICB1cGxvYWRSZXN1bHQudXJsRmlsZSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICBidWlsZEFwaU9wdGlvbnMoKVxuICAgICAgICAgICk7XG4gICAgICAgICAgYWRkVHJhY2UoXCJleHBlbnNlZnJvbXRpY2tldFwiLCBzYWZlVGV4dCgoaWFEcmFmdFJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgICBpZiAoaWFEcmFmdFJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dChpYURyYWZ0UmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZHJhZnQgPSBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlKGlhRHJhZnRSZXNwb25zZS5EYXRhIGFzIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgYXBwbHlJYUFuZEZpbmFsaXplKHBlbmRpbmdTdGF0ZS5maWxlSWQsIGRyYWZ0LCB1cGxvYWRSZXN1bHQpO1xuXG4gICAgICAgIHNldFByb2dyZXNzS2V5KFwiZG9uZVwiKTtcbiAgICAgICAgc2V0UGVuZGluZ1VwbG9hZFJldHJ5KG51bGwpO1xuICAgICAgICBhd2FpdCByZW1vdmVDYWNoZWRJbWFnZUZpbGUocGVuZGluZ1N0YXRlLmNhY2hlS2V5KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICAgIG9uQ29tcGxldGVkPy4oeyBmaWxlSWQ6IHBlbmRpbmdTdGF0ZS5maWxlSWQsIGxpbmtlZFRvU2hlZXQ6IGxpbmtUb1NoZWV0IH0pO1xuICAgICAgICB9LCAzMjApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xuICAgICAgICAgIGNvbnN0IHRyYWNlSWQgPSBleHRyYWN0VHJhY2VJZEZyb21FcnJvcihlcnJvcik7XG4gICAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtcmV0cnktZXJyb3JcIiwgdHJhY2VJZCk7XG4gICAgICAgIH1cbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNvbHZlVWlFcnJvck1lc3NhZ2UoZXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFthZGRUcmFjZSwgYXBwbHlJYUFuZEZpbmFsaXplLCBidWlsZEFwaU9wdGlvbnMsIGxpbmtUb1NoZWV0LCBvbkNvbXBsZXRlZCwgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlXVxuICApO1xuXG4gIGNvbnN0IHJ1bklhQ3JlYXRlRmxvdyA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChmaWxlOiBGaWxlLCBleHRlbnNpb246IHN0cmluZywgY2FjaGVLZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgc2V0QnVzeSh0cnVlKTtcbiAgICAgIHNldFByb2dyZXNzS2V5KFwidXBsb2FkaW5nSW1hZ2VcIik7XG4gICAgICBjbGVhckZsb3dTdGF0ZSgpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBzZXRQcm9ncmVzc0tleShcImNyZWF0aW5nVGlja2V0XCIpO1xuICAgICAgICBjb25zdCBkcmFmdFJlc3BvbnNlID0gYXdhaXQgZXh0cmFjdEV4cGVuc2VGcm9tVGlja2V0RHJhZnQoZmlsZSwgdHJ1ZSwgdW5kZWZpbmVkLCBidWlsZEFwaU9wdGlvbnMoKSk7XG4gICAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZWZyb210aWNrZXRcIiwgc2FmZVRleHQoKGRyYWZ0UmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgICBpZiAoZHJhZnRSZXNwb25zZS5TdWNjZXNzICE9PSB0cnVlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNhZmVUZXh0KGRyYWZ0UmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGRyYWZ0ID0gbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZShkcmFmdFJlc3BvbnNlLkRhdGEgYXMgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSk7XG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IHJlc29sdmVUaWNrZXRGaWxlSWRGcm9tRHJhZnRSZXNwb25zZShkcmFmdFJlc3BvbnNlLkRhdGEpO1xuICAgICAgICBpZiAoIWZpbGVJZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm9GaWxlSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSB0aWNrZXQgZmlsZSBpZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBzZXRQcm9ncmVzc0tleShcInN5bmNpbmdGaWxlXCIpO1xuICAgICAgICAgIGNvbnN0IHVwbG9hZFJlc3BvbnNlID0gYXdhaXQgdXBsb2FkRXhwZW5zZVNoZWV0VGlja2V0RmlsZShmaWxlSWQsIGZpbGUsIGV4dGVuc2lvbiwgYnVpbGRBcGlPcHRpb25zKCkpO1xuICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LWZpbGUtdXBsb2FkXCIsIHNhZmVUZXh0KCh1cGxvYWRSZXNwb25zZSBhcyB7IFRyYWNlSWQ/OiB1bmtub3duIH0pPy5UcmFjZUlkKSk7XG4gICAgICAgICAgaWYgKHVwbG9hZFJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dCh1cGxvYWRSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHVwbG9hZFJlc3VsdCA9IHJlc29sdmVVcGxvYWRSZXN1bHQodXBsb2FkUmVzcG9uc2UuRGF0YSk7XG4gICAgICAgICAgYXdhaXQgYXBwbHlJYUFuZEZpbmFsaXplKGZpbGVJZCwgZHJhZnQsIHVwbG9hZFJlc3VsdCk7XG5cbiAgICAgICAgICBzZXRQcm9ncmVzc0tleShcImRvbmVcIik7XG4gICAgICAgICAgYXdhaXQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKGNhY2hlS2V5KTtcbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgICAgICBvbkNvbXBsZXRlZD8uKHsgZmlsZUlkLCBsaW5rZWRUb1NoZWV0OiBsaW5rVG9TaGVldCB9KTtcbiAgICAgICAgICB9LCAzMjApO1xuICAgICAgICB9IGNhdGNoICh1cGxvYWRFcnJvcikge1xuICAgICAgICAgIGlmICh1cGxvYWRFcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnN0IHRyYWNlSWQgPSBleHRyYWN0VHJhY2VJZEZyb21FcnJvcih1cGxvYWRFcnJvcik7XG4gICAgICAgICAgICBhZGRUcmFjZShcInRpY2tldC1maWxlLXVwbG9hZC1lcnJvclwiLCB0cmFjZUlkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0UGVuZGluZ1VwbG9hZFJldHJ5KHtcbiAgICAgICAgICAgIHN0cmF0ZWd5OiBcImlhLXJlYWR5XCIsXG4gICAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgICBleHRlbnNpb24sXG4gICAgICAgICAgICBjYWNoZUtleSxcbiAgICAgICAgICAgIGRyYWZ0LFxuICAgICAgICAgICAgZmlsZU5hbWVIaW50OiBzYW5pdGl6ZUZpbGVOYW1lKGZpbGUubmFtZSksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgaW5kVChcbiAgICAgICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9VcGxvYWRSZXRyeVwiLFxuICAgICAgICAgICAgICBcIlRpY2tldCBjcmVhdGVkLCBidXQgZmlsZSBzeW5jIGZhaWxlZC4gUmV0cnkgdXBsb2FkIHRvIGNvbXBsZXRlIHByb2Nlc3MuXCJcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVVaUVycm9yTWVzc2FnZShlcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FkZFRyYWNlLCBhcHBseUlhQW5kRmluYWxpemUsIGJ1aWxkQXBpT3B0aW9ucywgY2xlYXJGbG93U3RhdGUsIGxpbmtUb1NoZWV0LCBvbkNvbXBsZXRlZCwgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlXVxuICApO1xuXG4gIGNvbnN0IHJ1bk1hbnVhbENyZWF0ZUZsb3cgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoZmlsZTogRmlsZSwgZXh0ZW5zaW9uOiBzdHJpbmcsIGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIHNldEJ1c3kodHJ1ZSk7XG4gICAgICBzZXRQcm9ncmVzc0tleShcImNyZWF0aW5nVGlja2V0XCIpO1xuICAgICAgY2xlYXJGbG93U3RhdGUoKTtcbiAgICAgIGxldCBjcmVhdGVkRmlsZUlkID0gXCJcIjtcbiAgICAgIGxldCBzdGFnZTogXCJjcmVhdGluZ1RpY2tldFwiIHwgXCJzeW5jaW5nRmlsZVwiIHwgXCJ1cGxvYWRpbmdJbWFnZVwiIHwgXCJmaW5hbGl6aW5nSWFcIiA9IFwiY3JlYXRpbmdUaWNrZXRcIjtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9kYXkgPSBnZXRUb2RheURkTW1ZeXl5KCk7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyVXJsID0gYHBlbmRpbmc6Ly90aWNrZXQtdXBsb2FkLyR7cmVzb2x2ZVJhbmRvbUtleSgpfWA7XG4gICAgICAgIGNvbnN0IGNyZWF0ZVBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldENyZWF0ZVJlcXVlc3QgPSB7XG4gICAgICAgICAgbW9kZTogMSxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogc2FuaXRpemVGaWxlTmFtZShmaWxlLm5hbWUpLnJlcGxhY2UoL1xcLlthLXowLTldKyQvaSwgXCJcIikgfHwgXCJUaWNrZXRcIixcbiAgICAgICAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCBcIkVVUlwiLFxuICAgICAgICAgIHRyYW5zRGF0ZTogdG9kYXksXG4gICAgICAgICAgY29tZW50YXJpbzogXCJcIixcbiAgICAgICAgICB1cmxGaWxlOiBwbGFjZWhvbGRlclVybCxcbiAgICAgICAgICBmaWxlRXh0ZW5zaW9uOiBleHRlbnNpb24sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNyZWF0ZVJlc3BvbnNlID0gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0KGNyZWF0ZVBheWxvYWQsIGJ1aWxkQXBpT3B0aW9ucygpKTtcbiAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtY3JlYXRlLW1hbnVhbFwiLCBzYWZlVGV4dCgoY3JlYXRlUmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgICBpZiAoY3JlYXRlUmVzcG9uc2UuU3VjY2VzcyAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzYWZlVGV4dChjcmVhdGVSZXNwb25zZS5NZXNzYWdlKSB8fCBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3JlYXRlRGF0YSA9IChjcmVhdGVSZXNwb25zZSBhcyB7IERhdGE/OiB7IEZpbGVJZD86IHVua25vd247IGZpbGVJZD86IHVua25vd24gfSB9KS5EYXRhO1xuICAgICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChjcmVhdGVEYXRhPy5GaWxlSWQgPz8gY3JlYXRlRGF0YT8uZmlsZUlkKTtcbiAgICAgICAgaWYgKCFmaWxlSWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX05vRmlsZUlkXCIsIFwiQ291bGQgbm90IHJlc29sdmUgdGlja2V0IGZpbGUgaWQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBjcmVhdGVkRmlsZUlkID0gZmlsZUlkO1xuXG4gICAgICAgIHN0YWdlID0gXCJzeW5jaW5nRmlsZVwiO1xuICAgICAgICBzZXRQcm9ncmVzc0tleShcInN5bmNpbmdGaWxlXCIpO1xuICAgICAgICBjb25zdCB1cGxvYWRSZXNwb25zZSA9IGF3YWl0IHVwbG9hZEV4cGVuc2VTaGVldFRpY2tldEZpbGUoZmlsZUlkLCBmaWxlLCBleHRlbnNpb24sIGJ1aWxkQXBpT3B0aW9ucygpKTtcbiAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmlsZS11cGxvYWRcIiwgc2FmZVRleHQoKHVwbG9hZFJlc3BvbnNlIGFzIHsgVHJhY2VJZD86IHVua25vd24gfSk/LlRyYWNlSWQpKTtcbiAgICAgICAgaWYgKHVwbG9hZFJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQodXBsb2FkUmVzcG9uc2UuTWVzc2FnZSkgfHwgaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1cGxvYWRSZXN1bHQgPSByZXNvbHZlVXBsb2FkUmVzdWx0KHVwbG9hZFJlc3BvbnNlLkRhdGEpO1xuXG4gICAgICAgIHN0YWdlID0gXCJ1cGxvYWRpbmdJbWFnZVwiO1xuICAgICAgICBzZXRQcm9ncmVzc0tleShcInVwbG9hZGluZ0ltYWdlXCIpO1xuICAgICAgICBjb25zdCBpYURyYWZ0UmVzcG9uc2UgPSBhd2FpdCBleHRyYWN0RXhwZW5zZUZyb21UaWNrZXREcmFmdChcbiAgICAgICAgICBmaWxlLFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgIHVwbG9hZFJlc3VsdC51cmxGaWxlIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICBidWlsZEFwaU9wdGlvbnMoKVxuICAgICAgICApO1xuICAgICAgICBhZGRUcmFjZShcImV4cGVuc2Vmcm9tdGlja2V0XCIsIHNhZmVUZXh0KChpYURyYWZ0UmVzcG9uc2UgYXMgeyBUcmFjZUlkPzogdW5rbm93biB9KT8uVHJhY2VJZCkpO1xuICAgICAgICBpZiAoaWFEcmFmdFJlc3BvbnNlLlN1Y2Nlc3MgIT09IHRydWUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc2FmZVRleHQoaWFEcmFmdFJlc3BvbnNlLk1lc3NhZ2UpIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZHJhZnQgPSBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlKGlhRHJhZnRSZXNwb25zZS5EYXRhIGFzIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UpO1xuICAgICAgICBzdGFnZSA9IFwiZmluYWxpemluZ0lhXCI7XG4gICAgICAgIGF3YWl0IGFwcGx5SWFBbmRGaW5hbGl6ZShmaWxlSWQsIGRyYWZ0LCB1cGxvYWRSZXN1bHQpO1xuXG4gICAgICAgIHNldFByb2dyZXNzS2V5KFwiZG9uZVwiKTtcbiAgICAgICAgYXdhaXQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKGNhY2hlS2V5KTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xuICAgICAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICAgIG9uQ29tcGxldGVkPy4oeyBmaWxlSWQsIGxpbmtlZFRvU2hlZXQ6IGxpbmtUb1NoZWV0IH0pO1xuICAgICAgICB9LCAzMjApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xuICAgICAgICAgIGNvbnN0IHRyYWNlSWQgPSBleHRyYWN0VHJhY2VJZEZyb21FcnJvcihlcnJvcik7XG4gICAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtbWFudWFsLWVycm9yXCIsIHRyYWNlSWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YWdlID09PSBcInN5bmNpbmdGaWxlXCIgJiYgY3JlYXRlZEZpbGVJZCkge1xuICAgICAgICAgIHNldFBlbmRpbmdVcGxvYWRSZXRyeSh7XG4gICAgICAgICAgICBzdHJhdGVneTogXCJtYW51YWwtcG9zdC11cGxvYWQtZHJhZnRcIixcbiAgICAgICAgICAgIGZpbGVJZDogY3JlYXRlZEZpbGVJZCxcbiAgICAgICAgICAgIGV4dGVuc2lvbixcbiAgICAgICAgICAgIGNhY2hlS2V5LFxuICAgICAgICAgICAgZmlsZU5hbWVIaW50OiBzYW5pdGl6ZUZpbGVOYW1lKGZpbGUubmFtZSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNvbHZlVWlFcnJvck1lc3NhZ2UoZXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFthZGRUcmFjZSwgYXBwbHlJYUFuZEZpbmFsaXplLCBidWlsZEFwaU9wdGlvbnMsIGNsZWFyRmxvd1N0YXRlLCBjdXJyZW5jeUNvZGUsIGxpbmtUb1NoZWV0LCBvbkNvbXBsZXRlZCwgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdGVkRmlsZSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChmaWxlOiBGaWxlIHwgbnVsbCwgX3NvdXJjZTogVGlja2V0SW1hZ2VTb3VyY2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIGlmICghZmlsZSkgcmV0dXJuO1xuICAgICAgaWYgKCFlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24oKSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBzYWZlVHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChzYWZlVHlwZSAmJiAhc2FmZVR5cGUuc3RhcnRzV2l0aChcImltYWdlL1wiKSkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUoZmlsZSkpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlVHlwZVwiLCBcIlVuc3VwcG9ydGVkIGltYWdlIGZvcm1hdC5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZmlsZS5zaXplID4gTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfRmlsZVNpemVcIiwgXCJJbWFnZSBleGNlZWRzIDUwTUIgbWF4IHNpemUuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBleHRlbnNpb24gPSBpbmZlckV4dGVuc2lvbihmaWxlKTtcbiAgICAgIGNvbnN0IGNhY2hlS2V5ID0gcmVzb2x2ZVJhbmRvbUtleSgpO1xuICAgICAgbGF0ZXN0RmlsZVJlZi5jdXJyZW50ID0geyBjYWNoZUtleSwgZmlsZSB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBjYWNoZUltYWdlRmlsZShjYWNoZUtleSwgZmlsZSk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gRG8gbm90IGJsb2NrIGZsb3cgaWYgYnJvd3NlciBjYWNoZSBzdG9yYWdlIGlzIHVuYXZhaWxhYmxlLlxuICAgICAgfVxuXG4gICAgICBpZiAoREVGQVVMVF9DUkVBVEVfTU9ERSA9PT0gXCJtYW51YWxcIikge1xuICAgICAgICBhd2FpdCBydW5NYW51YWxDcmVhdGVGbG93KGZpbGUsIGV4dGVuc2lvbiwgY2FjaGVLZXkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgcnVuSWFDcmVhdGVGbG93KGZpbGUsIGV4dGVuc2lvbiwgY2FjaGVLZXkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2Vuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbiwgcnVuSWFDcmVhdGVGbG93LCBydW5NYW51YWxDcmVhdGVGbG93XVxuICApO1xuXG4gIGNvbnN0IHJldHJ5UGVuZGluZ1VwbG9hZCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICBpZiAoIXBlbmRpbmdVcGxvYWRSZXRyeSkgcmV0dXJuO1xuICAgIGlmICghZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uKCkpIHJldHVybjtcblxuICAgIGxldCBzZWxlY3RlZEZpbGUgPSBsYXRlc3RGaWxlUmVmLmN1cnJlbnQ/LmNhY2hlS2V5ID09PSBwZW5kaW5nVXBsb2FkUmV0cnkuY2FjaGVLZXkgPyBsYXRlc3RGaWxlUmVmLmN1cnJlbnQuZmlsZSA6IG51bGw7XG4gICAgaWYgKCFzZWxlY3RlZEZpbGUpIHtcbiAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCByZWFkQ2FjaGVkSW1hZ2VGaWxlKHBlbmRpbmdVcGxvYWRSZXRyeS5jYWNoZUtleSk7XG4gICAgICBpZiAoIWJsb2IpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9SZXRyeUZpbGVNaXNzaW5nXCIsIFwiQ2FjaGVkIGltYWdlIGlzIG5vIGxvbmdlciBhdmFpbGFibGUuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2VsZWN0ZWRGaWxlID0gbmV3IEZpbGUoW2Jsb2JdLCBwZW5kaW5nVXBsb2FkUmV0cnkuZmlsZU5hbWVIaW50IHx8IFwidGlja2V0LWltYWdlXCIsIHtcbiAgICAgICAgdHlwZTogc2FmZVRleHQoYmxvYi50eXBlKSB8fCBcImltYWdlL2pwZWdcIixcbiAgICAgIH0pO1xuICAgICAgbGF0ZXN0RmlsZVJlZi5jdXJyZW50ID0geyBjYWNoZUtleTogcGVuZGluZ1VwbG9hZFJldHJ5LmNhY2hlS2V5LCBmaWxlOiBzZWxlY3RlZEZpbGUgfTtcbiAgICB9XG5cbiAgICBhd2FpdCByZXN1bWVGcm9tVXBsb2FkU3RlcChwZW5kaW5nVXBsb2FkUmV0cnksIHNlbGVjdGVkRmlsZSk7XG4gIH0sIFtlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24sIHBlbmRpbmdVcGxvYWRSZXRyeSwgcmVzdW1lRnJvbVVwbG9hZFN0ZXBdKTtcblxuICBjb25zdCBvcGVuU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uKCkpIHJldHVybjtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgc2V0U291cmNlUGlja2VyT3Blbih0cnVlKTtcbiAgfSwgW2Vuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbl0pO1xuXG4gIGNvbnN0IGNsb3NlU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm47XG4gICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XG4gIH0sIFtidXN5XSk7XG5cbiAgY29uc3QgcmVxdWVzdENhbWVyYVBlcm1pc3Npb24gPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxib29sZWFuIHwgbnVsbD4gPT4ge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBtZWRpYURldmljZXMgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzO1xuICAgIGlmICghbWVkaWFEZXZpY2VzIHx8IHR5cGVvZiBtZWRpYURldmljZXMuZ2V0VXNlck1lZGlhICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgICB2aWRlbzogeyBmYWNpbmdNb2RlOiBcImVudmlyb25tZW50XCIgfSxcbiAgICAgIH0pO1xuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2VsZWN0RnJvbUNhbWVyYSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgICBpZiAoIWlucHV0RWxlbWVudCkgcmV0dXJuO1xuICAgICAgY29uc3QgZ3JhbnRlZCA9IGF3YWl0IHJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uKCk7XG4gICAgICBpZiAoZ3JhbnRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9DYW1lcmFQZXJtaXNzaW9uXCIsIFwiQ2FtZXJhIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XG4gICAgICBpbnB1dEVsZW1lbnQuY2xpY2soKTtcbiAgICB9LFxuICAgIFtyZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbl1cbiAgKTtcblxuICBjb25zdCBzZWxlY3RGcm9tR2FsbGVyeSA9IHVzZUNhbGxiYWNrKChpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcbiAgICBpbnB1dEVsZW1lbnQuY2xpY2soKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyRXJyb3IgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxuICAgIGJ1c3ksXG4gICAgcHJvZ3Jlc3NLZXksXG4gICAgcHJvZ3Jlc3NNZXNzYWdlLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk6IHBlbmRpbmdVcGxvYWRSZXRyeSAhPT0gbnVsbCxcbiAgICB0cmFjZUxpc3QsXG4gICAgb3BlblNvdXJjZVBpY2tlcixcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXG4gICAgY2xlYXJFcnJvcixcbiAgfTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VHYXN0b1R5cGVDb2RlLFxuICBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSxcbiAgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuXG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSA9IFwiaW5kLWV4cGVuc2UtdGlja2V0LWltYWdlLXYxXCI7XG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYID0gXCIvX19pbmRfY2FjaGVfXy90aWNrZXQtaW1hZ2UvXCI7XG5jb25zdCBUSUNLRVRfVFJBQ0VfU1RPUkFHRV9LRVkgPSBcImV4cGVuc2Vfc2hlZXRfdGlja2V0X3F1aWNrX2Zsb3dfdHJhY2VfdjFcIjtcblxuZXhwb3J0IGNvbnN0IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyA9IDUwICogMTAyNCAqIDEwMjQ7XG5jb25zdCBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTID0gbmV3IFNldDxzdHJpbmc+KFtcImltYWdlL2pwZWdcIiwgXCJpbWFnZS9qcGdcIiwgXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS93ZWJwXCJdKTtcbmNvbnN0IEFMTE9XRURfVElDS0VUX0lNQUdFX0VYVEVOU0lPTlMgPSBuZXcgU2V0PHN0cmluZz4oW1wianBnXCIsIFwianBlZ1wiLCBcInBuZ1wiLCBcIndlYnBcIl0pO1xuY29uc3QgVElDS0VUX01JTUVfVE9fRVhURU5TSU9OOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBcImltYWdlL2pwZWdcIjogXCJqcGdcIixcbiAgXCJpbWFnZS9qcGdcIjogXCJqcGdcIixcbiAgXCJpbWFnZS9wbmdcIjogXCJwbmdcIixcbiAgXCJpbWFnZS93ZWJwXCI6IFwid2VicFwiLFxufTtcbmNvbnN0IEFMTE9XRURfVElDS0VUX0dBU1RPX1RZUEVTID0gbmV3IFNldDxudW1iZXI+KFswLCAxLCAyLCAzLCA0LCA1LCA2LCA3LCA4LCAxNF0pO1xuY29uc3QgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRSA9IDg7XG5leHBvcnQgY29uc3QgREVGQVVMVF9DUkVBVEVfTU9ERSA9IFwibWFudWFsXCIgYXMgXCJpYVwiIHwgXCJtYW51YWxcIjtcblxuZXhwb3J0IHR5cGUgVGlja2V0SW1hZ2VTb3VyY2UgPSBcImNhbWVyYVwiIHwgXCJnYWxsZXJ5XCI7XG5cbmV4cG9ydCB0eXBlIFRpY2tldFRyYWNlRW50cnkgPSB7XG4gIHN0ZXA6IHN0cmluZztcbiAgdHJhY2VJZDogc3RyaW5nO1xuICBhdDogc3RyaW5nO1xufTtcblxudHlwZSBOb3JtYWxpemVkRHJhZnRMaW5lID0ge1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdHlwZVZhbHVlOiBudW1iZXI7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHF0eTogbnVtYmVyO1xuICBwcmljZTogbnVtYmVyO1xuICB0b3RhbEFtb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgTm9ybWFsaXplZERyYWZ0ID0ge1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgdG90YWxBbW91bnQ6IG51bWJlcjtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIGNvbWVudGFyaW86IHN0cmluZztcbiAgZ2FzdG9UeXBlOiBudW1iZXIgfCBudWxsO1xuICBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdO1xufTtcblxuZXhwb3J0IHR5cGUgUGVuZGluZ1VwbG9hZFJldHJ5ID1cbiAgfCB7XG4gICAgICBzdHJhdGVneTogXCJpYS1yZWFkeVwiO1xuICAgICAgZmlsZUlkOiBzdHJpbmc7XG4gICAgICBleHRlbnNpb246IHN0cmluZztcbiAgICAgIGNhY2hlS2V5OiBzdHJpbmc7XG4gICAgICBkcmFmdDogTm9ybWFsaXplZERyYWZ0O1xuICAgICAgZmlsZU5hbWVIaW50OiBzdHJpbmc7XG4gICAgfVxuICB8IHtcbiAgICAgIHN0cmF0ZWd5OiBcIm1hbnVhbC1wb3N0LXVwbG9hZC1kcmFmdFwiO1xuICAgICAgZmlsZUlkOiBzdHJpbmc7XG4gICAgICBleHRlbnNpb246IHN0cmluZztcbiAgICAgIGNhY2hlS2V5OiBzdHJpbmc7XG4gICAgICBmaWxlTmFtZUhpbnQ6IHN0cmluZztcbiAgICB9O1xuXG5leHBvcnQgdHlwZSBVcGxvYWRTeW5jUmVzdWx0ID0ge1xuICB1cmxGaWxlOiBzdHJpbmc7XG4gIGZpbGVOYW1lOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzID0ge1xuICBzaGVldElkPzogc3RyaW5nO1xuICBwcm9qZWN0SWQ/OiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZT86IHN0cmluZztcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xuICBpc1NoZWV0TG9ja2VkOiBib29sZWFuO1xuICBsaW5rVG9TaGVldD86IGJvb2xlYW47XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xuICBvbkNvbXBsZXRlZD86IChyZXN1bHQ6IHsgZmlsZUlkOiBzdHJpbmc7IGxpbmtlZFRvU2hlZXQ6IGJvb2xlYW4gfSkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCB0eXBlIFF1aWNrRmxvd1Byb2dyZXNzS2V5ID1cbiAgfCBcInVwbG9hZGluZ0ltYWdlXCJcbiAgfCBcImNyZWF0aW5nVGlja2V0XCJcbiAgfCBcInN5bmNpbmdGaWxlXCJcbiAgfCBcImZpbmFsaXppbmdJYVwiXG4gIHwgXCJsaW5raW5nRXhwZW5zZUxpbmVcIlxuICB8IFwiZG9uZVwiO1xuXG5jb25zdCBhc1JlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0+IHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiB7fTtcbiAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xufTtcblxuY29uc3QgZ2V0Rmlyc3REZWZpbmVkID0gKHJlY29yZDogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIGtleXM6IHN0cmluZ1tdKTogdW5rbm93biA9PiB7XG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcbiAgICBpZiAoa2V5IGluIHJlY29yZCkge1xuICAgICAgcmV0dXJuIHJlY29yZFtrZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuY29uc3QgdG9OdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgdG9Qb3NpdGl2ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgcGFyc2VkID4gMCA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCB0b0RkTW1ZeXl5ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHZhbHVlKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRUb2RheURkTW1ZeXl5ID0gKCk6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0b0RkTW1ZeXl5KG5ldyBEYXRlKCkpO1xufTtcblxuY29uc3Qgbm9ybWFsaXplR2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBwYXJzZWQ7XG59O1xuXG5jb25zdCBub3JtYWxpemVJbWFnZUV4dGVuc2lvbiA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XS9nLCBcIlwiKTtcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gXCJcIjtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwianBlZ1wiKSByZXR1cm4gXCJqcGdcIjtcbiAgcmV0dXJuIEFMTE9XRURfVElDS0VUX0lNQUdFX0VYVEVOU0lPTlMuaGFzKG5vcm1hbGl6ZWQpID8gbm9ybWFsaXplZCA6IFwiXCI7XG59O1xuXG5jb25zdCByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBmcm9tTmFtZSA9IHNhZmVUZXh0KGZpbGUubmFtZSkuc3BsaXQoXCIuXCIpLnBvcCgpIHx8IFwiXCI7XG4gIHJldHVybiBub3JtYWxpemVJbWFnZUV4dGVuc2lvbihmcm9tTmFtZSk7XG59O1xuXG5leHBvcnQgY29uc3QgaW5mZXJFeHRlbnNpb24gPSAoZmlsZTogRmlsZSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHR5cGUgPSBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZyb21NaW1lID0gVElDS0VUX01JTUVfVE9fRVhURU5TSU9OW3R5cGVdO1xuICBpZiAoZnJvbU1pbWUpIHJldHVybiBmcm9tTWltZTtcblxuICBjb25zdCBmcm9tTmFtZSA9IHJlc29sdmVFeHRlbnNpb25Gcm9tRmlsZU5hbWUoZmlsZSk7XG4gIGlmIChmcm9tTmFtZSkgcmV0dXJuIGZyb21OYW1lO1xuXG4gIHJldHVybiBcImpwZ1wiO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlID0gKGZpbGU6IEZpbGUpOiBib29sZWFuID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZFR5cGUgPSBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChub3JtYWxpemVkVHlwZSkge1xuICAgIHJldHVybiBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTLmhhcyhub3JtYWxpemVkVHlwZSk7XG4gIH1cblxuICBjb25zdCBleHRlbnNpb24gPSByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lKGZpbGUpO1xuICByZXR1cm4gISFleHRlbnNpb247XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVJhbmRvbUtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIGNyeXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY3J5cHRvLnJhbmRvbVVVSUQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuICB9XG4gIHJldHVybiBgJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDEwKX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhbml0aXplRmlsZU5hbWUgPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGJhc2UgPSBzYWZlVGV4dCh2YWx1ZSkucmVwbGFjZSgvWzw+OlwiL1xcXFx8PypcXHUwMDAwLVxcdTAwMUZdL2csIFwiX1wiKTtcbiAgcmV0dXJuIGJhc2UgfHwgXCJ0aWNrZXQtaW1hZ2VcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhY2VJZEZyb21FcnJvciA9IChlcnJvcjogQXBpRmV0Y2hFcnJvcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBheWxvYWQgPSBzYWZlVGV4dChlcnJvci5yZXNwb25zZUJvZHkpO1xuICBpZiAoIXBheWxvYWQpIHJldHVybiBcIlwiO1xuICB0cnkge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKHBheWxvYWQpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIGNvbnN0IHRyYWNlSWQgPSBzYWZlVGV4dChqc29uLlRyYWNlSWQgPz8ganNvbi50cmFjZUlkKTtcbiAgICByZXR1cm4gdHJhY2VJZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBOb3JtYWxpemVkRHJhZnQgPT4ge1xuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XG4gIGNvbnN0IGRyYWZ0RGVzY3JpcHRpb24gPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiXSkpO1xuICBjb25zdCBkcmFmdEN1cnJlbmN5ID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImN1cnJlbmN5Q29kZVwiLCBcIkN1cnJlbmN5Q29kZVwiXSkpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRyYWZ0VG90YWxBbW91bnQgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcbiAgY29uc3QgZHJhZnRUcmFuc0RhdGUgPSB0b0RkTW1ZeXl5KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0cmFuc0RhdGVcIiwgXCJUcmFuc0RhdGVcIl0pKSB8fCBnZXRUb2RheURkTW1ZeXl5KCk7XG4gIGNvbnN0IGRyYWZ0Q29tbWVudCA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJjb21lbnRhcmlvXCIsIFwiQ29tZW50YXJpb1wiXSkpO1xuICBjb25zdCBkcmFmdEdhc3RvVHlwZSA9IG5vcm1hbGl6ZUdhc3RvVHlwZShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZ2FzdG9UeXBlXCIsIFwiR2FzdG9UeXBlXCJdKSk7XG5cbiAgY29uc3QgcmF3TGluZXMgPSBnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wibGluZXNcIiwgXCJMaW5lc1wiXSk7XG4gIGNvbnN0IGxpbmVBcnJheSA9IEFycmF5LmlzQXJyYXkocmF3TGluZXMpID8gcmF3TGluZXMgOiBbXTtcblxuICBjb25zdCBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdID0gbGluZUFycmF5XG4gICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVSZWNvcmQgPSBhc1JlY29yZChlbnRyeSk7XG4gICAgICBjb25zdCBxdHkgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJxdHlcIiwgXCJRdHlcIl0pKSB8fCAxO1xuICAgICAgY29uc3QgcHJpY2UgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJwcmljZVwiLCBcIlByaWNlXCJdKSkgfHwgMDtcbiAgICAgIGNvbnN0IGV4cGxpY2l0VG90YWwgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcbiAgICAgIGNvbnN0IGNvbXB1dGVkVG90YWwgPSBleHBsaWNpdFRvdGFsID4gMCA/IGV4cGxpY2l0VG90YWwgOiBxdHkgKiBwcmljZTtcbiAgICAgIGlmICghKGNvbXB1dGVkVG90YWwgPiAwKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGNhbmRpZGF0ZVR5cGVWYWx1ZSA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInR5cGVWYWx1ZVwiLCBcIlR5cGVWYWx1ZVwiXSkpO1xuICAgICAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlci5pc0ludGVnZXIoY2FuZGlkYXRlVHlwZVZhbHVlKSA/IE51bWJlcihjYW5kaWRhdGVUeXBlVmFsdWUpIDogbnVsbDtcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IHNhZmVUeXBlVmFsdWUgJiYgc2FmZVR5cGVWYWx1ZSA+IDAgPyBzYWZlVHlwZVZhbHVlIDogZHJhZnRHYXN0b1R5cGUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKSB8fCBkcmFmdERlc2NyaXB0aW9uO1xuICAgICAgY29uc3QgdHJhbnNEYXRlID0gdG9EZE1tWXl5eShnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widHJhbnNEYXRlXCIsIFwiVHJhbnNEYXRlXCJdKSkgfHwgZHJhZnRUcmFuc0RhdGU7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgdHlwZVZhbHVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICAgICAgcXR5LFxuICAgICAgICBwcmljZTogcHJpY2UgPiAwID8gcHJpY2UgOiBjb21wdXRlZFRvdGFsLFxuICAgICAgICB0b3RhbEFtb3VudDogY29tcHV0ZWRUb3RhbCxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIE5vcm1hbGl6ZWREcmFmdExpbmUgPT4gZW50cnkgIT09IG51bGwpO1xuXG4gIHJldHVybiB7XG4gICAgZGVzY3JpcHRpb246IGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0Q3VycmVuY3kgfHwgXCJFVVJcIixcbiAgICB0b3RhbEFtb3VudDogZHJhZnRUb3RhbEFtb3VudCA+IDAgPyBkcmFmdFRvdGFsQW1vdW50IDogbGluZXMucmVkdWNlKChzdW0sIGxpbmUpID0+IHN1bSArIGxpbmUudG90YWxBbW91bnQsIDApLFxuICAgIHRyYW5zRGF0ZTogZHJhZnRUcmFuc0RhdGUsXG4gICAgY29tZW50YXJpbzogZHJhZnRDb21tZW50LFxuICAgIGdhc3RvVHlwZTogZHJhZnRHYXN0b1R5cGUsXG4gICAgbGluZXMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRpY2tldEZpbGVJZEZyb21EcmFmdFJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XG4gIGNvbnN0IGNyZWF0aW9uUmF3ID0gZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlRpY2tldENyZWF0aW9uXCIsIFwidGlja2V0Q3JlYXRpb25cIl0pO1xuICBjb25zdCBjcmVhdGlvbiA9IGFzUmVjb3JkKGNyZWF0aW9uUmF3KTtcbiAgcmV0dXJuIHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChjcmVhdGlvbiwgW1wiRmlsZUlkXCIsIFwiZmlsZUlkXCJdKSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVVwbG9hZFJlc3VsdCA9IChyZXNwb25zZURhdGE6IHVua25vd24pOiBVcGxvYWRTeW5jUmVzdWx0ID0+IHtcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJlc3BvbnNlRGF0YSk7XG4gIHJldHVybiB7XG4gICAgdXJsRmlsZTogc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlVybEZpbGVcIiwgXCJ1cmxGaWxlXCJdKSksXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJGaWxlTmFtZVwiLCBcImZpbGVOYW1lXCJdKSksXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRUaWNrZXRJYVBheWxvYWQgPSAoZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCwgdXBsb2FkOiBVcGxvYWRTeW5jUmVzdWx0KTogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0+IHtcbiAgY29uc3QgaWFMaW5lcyA9IGRyYWZ0LmxpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICBkZXNjcmlwdGlvbjogbGluZS5kZXNjcmlwdGlvbixcbiAgICBxdHk6IGxpbmUucXR5LFxuICAgIHByaWNlOiBsaW5lLnByaWNlLFxuICAgIHRvdGFsQW1vdW50OiBsaW5lLnRvdGFsQW1vdW50LFxuICB9KSk7XG5cbiAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0ge1xuICAgIGRlc2NyaXB0aW9uOiBkcmFmdC5kZXNjcmlwdGlvbixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0LmN1cnJlbmN5Q29kZSxcbiAgICB0b3RhbEFtb3VudDogZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiB1bmRlZmluZWQsXG4gICAgdHJhbnNEYXRlOiBkcmFmdC50cmFuc0RhdGUsXG4gICAgY29tZW50YXJpbzogZHJhZnQuY29tZW50YXJpbyB8fCB1bmRlZmluZWQsXG4gICAgdXJsRmlsZTogdXBsb2FkLnVybEZpbGUgfHwgdW5kZWZpbmVkLFxuICAgIGZpbGVOYW1lOiB1cGxvYWQuZmlsZU5hbWUgfHwgdW5kZWZpbmVkLFxuICAgIGxpbmVzOiBpYUxpbmVzLFxuICB9O1xuXG4gIGlmIChkcmFmdC5nYXN0b1R5cGUgIT09IG51bGwpIHtcbiAgICBwYXlsb2FkLmdhc3RvVHlwZSA9IGRyYWZ0Lmdhc3RvVHlwZSBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkU2hlZXRMaW5lUGF5bG9hZCA9IChcbiAgZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCxcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHByb2plY3RJZDogc3RyaW5nXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCB8IG51bGwgPT4ge1xuICBjb25zdCBsaW5lRnJvbURyYWZ0ID0gZHJhZnQubGluZXNbMF07XG4gIC8vIEJ1aWxkIGEgc2luZ2xlIGV4cGVuc2UgbGluZSBmcm9tIHRpY2tldCBoZWFkZXIgZGF0YSB0byBhdm9pZCBsaW5lLWxldmVsIGRlc2NyaXB0aW9uIGxlYWthZ2UuXG4gIGNvbnN0IGhlYWRlclRvdGFsID0gZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiAwO1xuICBjb25zdCBmYWxsYmFja1RvdGFsID0gbGluZUZyb21EcmFmdD8udG90YWxBbW91bnQgfHwgMDtcbiAgY29uc3QgZWZmZWN0aXZlVG90YWwgPSBoZWFkZXJUb3RhbCA+IDAgPyBoZWFkZXJUb3RhbCA6IGZhbGxiYWNrVG90YWw7XG4gIGlmICghKGVmZmVjdGl2ZVRvdGFsID4gMCkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHR5cGVWYWx1ZUNhbmRpZGF0ZSA9IGRyYWZ0Lmdhc3RvVHlwZSB8fCBsaW5lRnJvbURyYWZ0Py50eXBlVmFsdWUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcbiAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlcih0eXBlVmFsdWVDYW5kaWRhdGUpO1xuICBjb25zdCB0eXBlVmFsdWUgPSBOdW1iZXIuaXNJbnRlZ2VyKHNhZmVUeXBlVmFsdWUpICYmIHNhZmVUeXBlVmFsdWUgPiAwID8gc2FmZVR5cGVWYWx1ZSA6IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XG5cbiAgcmV0dXJuIHtcbiAgICB0cmFuc0RhdGU6IGRyYWZ0LnRyYW5zRGF0ZSB8fCBsaW5lRnJvbURyYWZ0Py50cmFuc0RhdGUgfHwgZ2V0VG9kYXlEZE1tWXl5eSgpLFxuICAgIHR5cGVWYWx1ZSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoZHJhZnQuZGVzY3JpcHRpb24pIHx8IFwiVGlja2V0XCIsXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXG4gICAgZmlsZUlkLFxuICAgIHRpY2tldDogdHJ1ZSxcbiAgICBxdHk6IDEsXG4gICAgcHJpY2U6IGVmZmVjdGl2ZVRvdGFsLFxuICAgIHByb2pJZDogc2FmZVRleHQocHJvamVjdElkKSB8fCB1bmRlZmluZWQsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcGVyc2lzdFRyYWNlTGlzdCA9ICh0cmFjZUxpc3Q6IFRpY2tldFRyYWNlRW50cnlbXSk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVElDS0VUX1RSQUNFX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeSh0cmFjZUxpc3QpKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gSWdub3JlIHN0b3JhZ2UgZmFpbHVyZXMgaW4gcmVzdHJpY3RlZCBicm93c2VyIGNvbnRleHRzLlxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY2FjaGVJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZywgZmlsZTogRmlsZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuO1xuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XG4gIGF3YWl0IGNhY2hlLnB1dChcbiAgICBuZXcgUmVxdWVzdChyZXF1ZXN0VXJsKSxcbiAgICBuZXcgUmVzcG9uc2UoZmlsZSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBzYWZlVGV4dChmaWxlLnR5cGUpIHx8IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG4gICAgICB9LFxuICAgIH0pXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVhZENhY2hlZEltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTxCbG9iIHwgbnVsbD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcbiAgY29uc3QgY2FjaGVkUmVzcG9uc2UgPSBhd2FpdCBjYWNoZS5tYXRjaChyZXF1ZXN0VXJsKTtcbiAgaWYgKCFjYWNoZWRSZXNwb25zZSkgcmV0dXJuIG51bGw7XG4gIHJldHVybiBjYWNoZWRSZXNwb25zZS5ibG9iKCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybjtcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xuICBhd2FpdCBjYWNoZS5kZWxldGUocmVxdWVzdFVybCk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQThEO0FBQzlELHVCQUE2Qjs7O0FDRDdCLG1CQUE2RjtBQVF0RixJQUFNLGlDQUFpQyxNQUE0QztBQUN4RixRQUFNLGlCQUFhLHFCQUE4QixJQUFJO0FBQ3JELFFBQU0sd0JBQW9CLHFCQUFzQixJQUFJO0FBQ3BELFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUksdUJBQVMsQ0FBQztBQUV0RCxRQUFNLG9CQUFnQiw2QkFBZSxNQUFNO0FBQ3pDLFVBQU0sVUFBVSxXQUFXO0FBQzNCLFFBQUksQ0FBQyxRQUFTO0FBRWQsVUFBTSxhQUFhLEtBQUssS0FBSyxRQUFRLHNCQUFzQixFQUFFLE1BQU07QUFDbkUsc0JBQWtCLENBQUMsYUFBYyxLQUFLLElBQUksV0FBVyxVQUFVLElBQUksSUFBSSxXQUFXLFVBQVc7QUFBQSxFQUMvRixDQUFDO0FBRUQsUUFBTSxzQkFBa0IsNkJBQWUsTUFBTTtBQUMzQyxRQUFJLE9BQU8sV0FBVyxZQUFhO0FBRW5DLFFBQUksa0JBQWtCLFlBQVksTUFBTTtBQUN0QyxhQUFPLHFC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QUFBQSxNQUNGO0FBQ0EsMEJBQW9CLEtBQUs7QUFDekIsbUJBQWEsTUFBTTtBQUFBLElBQ3JCO0FBQUEsSUFDQSxDQUFDLHVCQUF1QjtBQUFBLEVBQzFCO0FBRUEsUUFBTSx3QkFBb0IsMkJBQVksQ0FBQyxpQkFBMEM7QUFDL0UsUUFBSSxDQUFDLGFBQWM7QUFDbkIsd0JBQW9CLEtBQUs7QUFDekIsaUJBQWEsTUFBTTtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxpQkFBYSwyQkFBWSxNQUFNO0FBQ25DLG9CQUFnQixFQUFFO0FBQUEsRUFDcEIsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLHVCQUF1Qix1QkFBdUI7QUFBQSxJQUM5QztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiXQp9Cg==
