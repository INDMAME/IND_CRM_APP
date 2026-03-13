import {
  flashActionMark
} from "./chunk-K7MECJ5E.js";
import {
  safeText
} from "./chunk-JWQJTNB4.js";
import {
  createExpenseSheetTicketQuick
} from "./chunk-CNJSX7GH.js";
import {
  classNames,
  indFormat,
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

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlowCore.ts
var TICKET_IMAGE_CACHE_NAME = "ind-expense-ticket-image-v1";
var TICKET_IMAGE_CACHE_PREFIX = "/__ind_cache__/ticket-image/";
var TICKET_TRACE_STORAGE_KEY = "expense_sheet_ticket_quick_flow_trace_v1";
var MAX_TICKET_IMAGE_SIZE_BYTES = 50 * 1024 * 1024;
var TICKET_IMAGE_ACCEPT_ATTRIBUTE = ".jpg,.jpeg,.png,.webp,image/jpeg,image/pjpeg,image/png,image/webp";
var ALLOWED_TICKET_IMAGE_MIME_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/pjpeg", "image/png", "image/webp"]);
var ALLOWED_TICKET_IMAGE_EXTENSIONS = /* @__PURE__ */ new Set(["jpg", "jpeg", "png", "webp"]);
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
var isSupportedTicketImageFile = (file) => {
  const normalizedType = safeText(file.type).toLowerCase();
  if (normalizedType && ALLOWED_TICKET_IMAGE_MIME_TYPES.has(normalizedType)) {
    return true;
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
var removeCachedImageFile = async (cacheKey) => {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  await cache.delete(requestUrl);
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlow.ts
var import_react3 = __toESM(require_react());

// Web/wwwroot/react/src/pages/gastos/detail/ticketImageOptimization.ts
var MAX_TICKET_UPLOAD_LONG_SIDE_PX = 2048;
var MIN_TICKET_UPLOAD_SHORT_SIDE_PX = 768;
var TICKET_REENCODE_QUALITY = 0.85;
var MIN_TICKET_REENCODE_BYTES = 4 * 1024 * 1024;
var MIN_TICKET_REDUCTION_BYTES = 256 * 1024;
var MIN_TICKET_REDUCTION_RATIO = 0.12;
var normalizeMimeType = (value) => {
  const normalized = safeText(value).toLowerCase();
  if (normalized === "image/pjpeg" || normalized === "image/jpg") {
    return "image/jpeg";
  }
  return normalized;
};
var replaceFileExtension = (fileName, extension) => {
  const baseName = safeText(fileName).replace(/\.[a-z0-9]+$/i, "");
  const safeBaseName = baseName || "ticket";
  const safeExtension = safeText(extension).replace(/^\./, "").toLowerCase() || "jpg";
  return `${safeBaseName}.${safeExtension}`;
};
var loadImage = async (file) => {
  if (typeof Image === "undefined" || typeof URL === "undefined" || typeof URL.createObjectURL !== "function") {
    return null;
  }
  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  image.decoding = "async";
  try {
    await new Promise((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Could not decode image."));
      image.src = objectUrl;
    });
    const width = Number(image.naturalWidth || image.width || 0);
    const height = Number(image.naturalHeight || image.height || 0);
    if (!(width > 0) || !(height > 0)) {
      return null;
    }
    return {
      element: image,
      width,
      height,
      dispose: () => {
        URL.revokeObjectURL(objectUrl);
      }
    };
  } catch {
    URL.revokeObjectURL(objectUrl);
    return null;
  }
};
var resolveResizeDimensions = (width, height) => {
  const longSide = Math.max(width, height);
  const shortSide = Math.min(width, height);
  if (longSide <= MAX_TICKET_UPLOAD_LONG_SIDE_PX) {
    return { width, height, resized: false };
  }
  const maxLongSideScale = MAX_TICKET_UPLOAD_LONG_SIDE_PX / longSide;
  const minShortSideScale = MIN_TICKET_UPLOAD_SHORT_SIDE_PX / shortSide;
  const scale = Math.max(maxLongSideScale, minShortSideScale);
  if (!(scale < 1)) {
    return { width, height, resized: false };
  }
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
    resized: true
  };
};
var createCanvas = (width, height) => {
  if (typeof document === "undefined" || typeof document.createElement !== "function") {
    return null;
  }
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
};
var canvasToBlob = (canvas, mimeType, quality) => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
};
var buildOptimizationResult = ({
  file,
  originalFile,
  reason,
  resized,
  reencoded,
  elapsedMs,
  originalWidth,
  originalHeight,
  outputWidth,
  outputHeight
}) => {
  return {
    file,
    changed: file !== originalFile || file.size !== originalFile.size || safeText(file.type).toLowerCase() !== safeText(originalFile.type).toLowerCase(),
    reason,
    resized,
    reencoded,
    elapsedMs,
    original: {
      name: originalFile.name,
      type: originalFile.type,
      size: originalFile.size,
      width: originalWidth,
      height: originalHeight
    },
    output: {
      name: file.name,
      type: file.type,
      size: file.size,
      width: outputWidth,
      height: outputHeight
    }
  };
};
var optimizeTicketImageForUpload = async (file) => {
  const startedAt = Date.now();
  if (!(file instanceof File)) {
    return buildOptimizationResult({
      file,
      originalFile: file,
      reason: "invalid-input",
      resized: false,
      reencoded: false,
      elapsedMs: Date.now() - startedAt,
      originalWidth: null,
      originalHeight: null,
      outputWidth: null,
      outputHeight: null
    });
  }
  const normalizedMimeType = normalizeMimeType(file.type);
  const loadedImage = await loadImage(file);
  if (!loadedImage) {
    return buildOptimizationResult({
      file,
      originalFile: file,
      reason: "decode-unavailable",
      resized: false,
      reencoded: false,
      elapsedMs: Date.now() - startedAt,
      originalWidth: null,
      originalHeight: null,
      outputWidth: null,
      outputHeight: null
    });
  }
  try {
    const { width, height, element } = loadedImage;
    const shortSide = Math.min(width, height);
    const resizePlan = resolveResizeDimensions(width, height);
    const canReencodeSafely = shortSide >= MIN_TICKET_UPLOAD_SHORT_SIDE_PX;
    const isLargeOriginal = file.size >= MIN_TICKET_REENCODE_BYTES;
    const shouldResize = resizePlan.resized;
    if (!shouldResize && (!canReencodeSafely || !isLargeOriginal)) {
      return buildOptimizationResult({
        file,
        originalFile: file,
        reason: !canReencodeSafely ? "kept-small-short-side" : "kept-small-file",
        resized: false,
        reencoded: false,
        elapsedMs: Date.now() - startedAt,
        originalWidth: width,
        originalHeight: height,
        outputWidth: width,
        outputHeight: height
      });
    }
    if (normalizedMimeType === "image/png" && !shouldResize) {
      return buildOptimizationResult({
        file,
        originalFile: file,
        reason: "kept-png-without-resize",
        resized: false,
        reencoded: false,
        elapsedMs: Date.now() - startedAt,
        originalWidth: width,
        originalHeight: height,
        outputWidth: width,
        outputHeight: height
      });
    }
    const canvas = createCanvas(resizePlan.width, resizePlan.height);
    const context = canvas?.getContext("2d");
    if (!canvas || !context) {
      return buildOptimizationResult({
        file,
        originalFile: file,
        reason: "canvas-unavailable",
        resized: false,
        reencoded: false,
        elapsedMs: Date.now() - startedAt,
        originalWidth: width,
        originalHeight: height,
        outputWidth: width,
        outputHeight: height
      });
    }
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(element, 0, 0, resizePlan.width, resizePlan.height);
    const outputMimeType = normalizedMimeType === "image/webp" ? "image/webp" : normalizedMimeType === "image/png" && shouldResize ? "image/jpeg" : "image/jpeg";
    const outputExtension = outputMimeType === "image/webp" ? "webp" : outputMimeType === "image/png" ? "png" : "jpg";
    const quality = outputMimeType === "image/png" ? void 0 : TICKET_REENCODE_QUALITY;
    const optimizedBlob = await canvasToBlob(canvas, outputMimeType, quality);
    if (!optimizedBlob || optimizedBlob.size <= 0 || optimizedBlob.size >= file.size) {
      return buildOptimizationResult({
        file,
        originalFile: file,
        reason: "optimized-not-smaller",
        resized: shouldResize,
        reencoded: normalizedMimeType !== outputMimeType || isLargeOriginal,
        elapsedMs: Date.now() - startedAt,
        originalWidth: width,
        originalHeight: height,
        outputWidth: shouldResize ? resizePlan.width : width,
        outputHeight: shouldResize ? resizePlan.height : height
      });
    }
    if (!shouldResize) {
      const savedBytes = file.size - optimizedBlob.size;
      const savedRatio = savedBytes / Math.max(file.size, 1);
      if (savedBytes < MIN_TICKET_REDUCTION_BYTES || savedRatio < MIN_TICKET_REDUCTION_RATIO) {
        return buildOptimizationResult({
          file,
          originalFile: file,
          reason: "reduction-too-small",
          resized: false,
          reencoded: true,
          elapsedMs: Date.now() - startedAt,
          originalWidth: width,
          originalHeight: height,
          outputWidth: width,
          outputHeight: height
        });
      }
    }
    const optimizedFile = new File([optimizedBlob], replaceFileExtension(file.name, outputExtension), {
      type: outputMimeType,
      lastModified: file.lastModified || Date.now()
    });
    return buildOptimizationResult({
      file: optimizedFile,
      originalFile: file,
      reason: "optimized",
      resized: shouldResize,
      reencoded: normalizedMimeType !== outputMimeType || isLargeOriginal,
      elapsedMs: Date.now() - startedAt,
      originalWidth: width,
      originalHeight: height,
      outputWidth: resizePlan.width,
      outputHeight: resizePlan.height
    });
  } finally {
    loadedImage.dispose();
  }
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlow.ts
var QUICK_TICKET_FLOW_LOG_PREFIX = "[expense-quick-ticket]";
var logQuickTicketInfo = (...args) => {
  if (typeof console !== "undefined" && typeof console.info === "function") {
    console.info(QUICK_TICKET_FLOW_LOG_PREFIX, ...args);
  }
};
var logQuickTicketWarn = (...args) => {
  if (typeof console !== "undefined" && typeof console.warn === "function") {
    console.warn(QUICK_TICKET_FLOW_LOG_PREFIX, ...args);
  }
};
var logQuickTicketError = (...args) => {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(QUICK_TICKET_FLOW_LOG_PREFIX, ...args);
  }
};
var formatFileSize = (size) => {
  if (!(size > 0)) return "0 B";
  if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  if (size >= 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${size} B`;
};
var buildFileLogData = (file) => {
  return {
    name: safeText(file.name),
    type: safeText(file.type),
    sizeBytes: Number(file.size || 0),
    sizeText: formatFileSize(Number(file.size || 0)),
    lastModified: Number(file.lastModified || 0)
  };
};
var buildFallbackOptimizationResult = (file) => {
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
      height: null
    },
    output: {
      name: safeText(file.name),
      type: safeText(file.type),
      size: Number(file.size || 0),
      width: null,
      height: null
    }
  };
};
var buildOptimizationLogData = (result) => {
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
      sizeText: formatFileSize(result.original.size)
    },
    output: {
      ...result.output,
      sizeText: formatFileSize(result.output.size)
    },
    savedBytes,
    savedText: formatFileSize(savedBytes),
    savedRatio: Number(savedRatio.toFixed(4))
  };
};
var formatValidationErrors = (errors) => {
  if (!Array.isArray(errors) || errors.length === 0) return "";
  return errors.map((entry) => {
    const field = safeText(entry?.Field);
    const message = safeText(entry?.Message);
    if (field && message) return `${field}: ${message}`;
    return message || field;
  }).filter(Boolean).join(" | ");
};
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
  const [attemptId, setAttemptId] = (0, import_react3.useState)("");
  const [traceList, setTraceList] = (0, import_react3.useState)([]);
  const [partialTicketFailure, setPartialTicketFailure] = (0, import_react3.useState)(null);
  const latestFileRef = (0, import_react3.useRef)(null);
  const latestCreatedTicketRef = (0, import_react3.useRef)(null);
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
  const clearCachedCurrentImage = (0, import_react3.useCallback)(() => {
    const cacheKey = latestFileRef.current?.cacheKey;
    if (!cacheKey) return;
    void removeCachedImageFile(cacheKey).catch(() => {
    });
  }, []);
  const clearFlowState = (0, import_react3.useCallback)(() => {
    latestCreatedTicketRef.current = null;
    setErrorMessage("");
    setPartialTicketFailure(null);
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
  const resolveUiErrorMessage = (0, import_react3.useCallback)((error) => {
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
    return error instanceof Error && safeText(error.message) ? safeText(error.message) : indT("Api_RequestFailed", "Request failed.");
  }, []);
  const addQuickCreateResponseTraces = (0, import_react3.useCallback)(
    (response) => {
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
  const resolveQuickCreateFailureMessage = (0, import_react3.useCallback)((response) => {
    const data = response.Data;
    const fileId = safeText(data?.FileId);
    const completedStage = safeText(data?.CompletedStage);
    const responseMessage = safeText(response.Message);
    const validationText = formatValidationErrors(response.Errors);
    const retryAfter = safeText(response.RetryAfter);
    const messageParts = [];
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
  const completeFlowSuccess = (0, import_react3.useCallback)(
    async (fileId, linkedToSheet, cacheKey) => {
      setProgressKey("done");
      await removeCachedImageFile(cacheKey);
      setAttemptId("");
      latestCreatedTicketRef.current = null;
      setPartialTicketFailure(null);
      flashActionMark("okProcess", 1200);
      setBusy(false);
      setProgressKey(null);
      onCompleted?.({ fileId, linkedToSheet });
    },
    [onCompleted]
  );
  const runQuickCreateFlow = (0, import_react3.useCallback)(
    async (file, cacheKey, context) => {
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
        projectId: linkToSheet ? safeText(projectId) : ""
      });
      try {
        const response = await createExpenseSheetTicketQuick(
          {
            ticketImage: file,
            currencyCode: safeText(currencyCode).toUpperCase() || void 0,
            existingHojaGastosId: linkToSheet ? safeText(sheetId) || void 0 : void 0,
            projectId: linkToSheet ? safeText(projectId) || void 0 : void 0
          },
          buildApiOptions()
        );
        addQuickCreateResponseTraces(response);
        const responseElapsedMs = Math.max(0, Date.now() - requestStartedAt);
        const fileId = safeText(response.Data?.FileId);
        const linkedToSheet = response.Data?.LinkedToSheet === true;
        const partialState = fileId ? {
          fileId,
          linkedToSheet,
          completedStage: safeText(response.Data?.CompletedStage),
          urlFile: safeText(response.Data?.UrlFile),
          fileName: safeText(response.Data?.FileName),
          processedByAI: response.Data?.ProcessedByAI ?? null
        } : null;
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
            stepTraceIds: response.Data?.StepTraceIds ?? null
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
            processedByAI: partialState.processedByAI
          });
        }
        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
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
          stepTraceIds: response.Data?.StepTraceIds ?? null
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
          validationErrors: error instanceof ApiFetchError ? error.validationErrors : []
        });
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
      completeFlowSuccess,
      currencyCode,
      linkToSheet,
      projectId,
      resolveQuickCreateFailureMessage,
      resolveUiErrorMessage,
      sheetId
    ]
  );
  const handleSelectedFile = (0, import_react3.useCallback)(
    async (file, source) => {
      if (!file) return;
      const attemptId2 = resolveRandomKey();
      const selectionStartedAt = Date.now();
      setAttemptId(attemptId2);
      logQuickTicketInfo("selection.received", {
        attemptId: attemptId2,
        source,
        linkToSheet,
        file: buildFileLogData(file)
      });
      if (!ensureQuickCreatePermission()) {
        logQuickTicketWarn("selection.forbidden", {
          attemptId: attemptId2,
          source,
          linkToSheet,
          canCreateExpense,
          isCreateMode,
          isSheetLocked,
          hasSheetId: !!safeText(sheetId)
        });
        return;
      }
      const safeType = safeText(file.type).toLowerCase();
      if (safeType && !safeType.startsWith("image/") && !/\.(jpe?g|png|webp)$/i.test(file.name || "")) {
        logQuickTicketWarn("selection.invalid-file-type", {
          attemptId: attemptId2,
          source,
          file: buildFileLogData(file),
          reason: "mime-and-extension-not-supported"
        });
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileType", "Unsupported image format."));
        return;
      }
      if (!isSupportedTicketImageFile(file)) {
        logQuickTicketWarn("selection.invalid-file-type", {
          attemptId: attemptId2,
          source,
          file: buildFileLogData(file),
          reason: "unsupported-ticket-image-file"
        });
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileType", "Unsupported image format."));
        return;
      }
      clearFlowState();
      setProgressKey("uploadingImage");
      logQuickTicketInfo("optimization.started", {
        attemptId: attemptId2,
        source,
        file: buildFileLogData(file)
      });
      const optimizationResult = await optimizeTicketImageForUpload(file).catch((error) => {
        logQuickTicketWarn("optimization.failed", {
          attemptId: attemptId2,
          source,
          file: buildFileLogData(file),
          message: error instanceof Error ? safeText(error.message) : ""
        });
        return buildFallbackOptimizationResult(file);
      });
      const uploadFile = optimizationResult.file;
      logQuickTicketInfo("optimization.completed", {
        attemptId: attemptId2,
        source,
        ...buildOptimizationLogData(optimizationResult)
      });
      if (uploadFile.size > MAX_TICKET_IMAGE_SIZE_BYTES) {
        logQuickTicketWarn("selection.rejected-by-size", {
          attemptId: attemptId2,
          source,
          maxSizeBytes: MAX_TICKET_IMAGE_SIZE_BYTES,
          maxSizeText: formatFileSize(MAX_TICKET_IMAGE_SIZE_BYTES),
          file: buildFileLogData(uploadFile),
          optimization: buildOptimizationLogData(optimizationResult)
        });
        setProgressKey(null);
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileSize", "Image exceeds 50MB max size."));
        return;
      }
      const cacheKey = attemptId2;
      latestFileRef.current = { cacheKey, file: uploadFile };
      logQuickTicketInfo("cache.store.started", {
        attemptId: attemptId2,
        source,
        cacheKey,
        file: buildFileLogData(uploadFile)
      });
      void cacheImageFile(cacheKey, uploadFile).then(() => {
        logQuickTicketInfo("cache.store.completed", {
          attemptId: attemptId2,
          source,
          cacheKey,
          file: buildFileLogData(uploadFile)
        });
      }).catch((error) => {
        logQuickTicketWarn("cache.store.failed", {
          attemptId: attemptId2,
          source,
          cacheKey,
          file: buildFileLogData(uploadFile),
          message: error instanceof Error ? safeText(error.message) : ""
        });
      });
      await runQuickCreateFlow(uploadFile, cacheKey, {
        attemptId: attemptId2,
        source,
        startedAt: selectionStartedAt,
        optimization: optimizationResult
      });
    },
    [canCreateExpense, clearFlowState, ensureQuickCreatePermission, isCreateMode, isSheetLocked, linkToSheet, runQuickCreateFlow, sheetId]
  );
  const retryPendingUpload = (0, import_react3.useCallback)(async () => {
    return;
  }, []);
  const openCreatedTicket = (0, import_react3.useCallback)(() => {
    const createdTicket = partialTicketFailure || latestCreatedTicketRef.current;
    const fileId = safeText(createdTicket?.fileId);
    if (!fileId) return;
    clearCachedCurrentImage();
    setAttemptId("");
    setErrorMessage("");
    setPartialTicketFailure(null);
    onCompleted?.({ fileId, linkedToSheet: createdTicket?.linkedToSheet === true });
  }, [clearCachedCurrentImage, onCompleted, partialTicketFailure]);
  const openSourcePicker = (0, import_react3.useCallback)(() => {
    if (!ensureQuickCreatePermission()) return;
    setErrorMessage("");
    setPartialTicketFailure(null);
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
    clearCachedCurrentImage();
    latestCreatedTicketRef.current = null;
    setAttemptId("");
    setErrorMessage("");
    setPartialTicketFailure(null);
  }, [clearCachedCurrentImage]);
  return {
    sourcePickerOpen,
    busy,
    progressKey,
    progressMessage,
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
    clearError
  };
};

export {
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC90aWNrZXRJbWFnZU9wdGltaXphdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQsIGlzVmFsaWRFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5LnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxuY29uc3QgTUFYX1BBR0VfQk9UVE9NX0FDVElPTlMgPSA0O1xuXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBvbkNsaWNrPzogUmVhY3QuTW91c2VFdmVudEhhbmRsZXI8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGFyaWFMYWJlbD86IHN0cmluZztcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xuICB0YWJJbmRleD86IG51bWJlcjtcbiAgZnVsbFdpZHRoPzogYm9vbGVhbjtcbn07XG5cbnR5cGUgUGFnZUJvdHRvbUFjdGlvbnNQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIER1bWIgYnV0dG9uIHVzZWQgYnkgdGhlIHNoYXJlZCBib3R0b20gYWN0aW9uIGJhci5cbmV4cG9ydCBjb25zdCBQYWdlQm90dG9tQWN0aW9uQnV0dG9uID0gKHtcbiAgbGFiZWwsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgYXJpYUxhYmVsLFxuICB0eXBlID0gXCJidXR0b25cIixcbiAgdGFiSW5kZXgsXG4gIGZ1bGxXaWR0aCA9IGZhbHNlLFxufTogUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT17dHlwZX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XG4gICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgIFwiaW5saW5lLWJsb2NrIHctZnVsbCByb3VuZGVkLVs1cHhdIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTYwXCIsXG4gICAgICAgIGZ1bGxXaWR0aCA/IFwiY29sLXNwYW4tMlwiIDogXCJcIixcbiAgICAgICAgY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICl9XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCB3LWZ1bGwgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtWzVweF0gYm9yZGVyIGJvcmRlci1bIzAwMWY0ZF0vODAgYmctcHJpbWFyeSBweC0zIHB5LTIuNSB0ZXh0LWNlbnRlciB0ZXh0LVsxMnB4XSBmb250LXNlbWlib2xkIGxlYWRpbmctdGlnaHQgdGV4dC13aGl0ZSBzaGFkb3cteHMgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMTUwIGhvdmVyOmJnLVsjMDAxZjRkXSBzbTpweC00IHNtOnB5LTIuNSBzbTp0ZXh0LVsxM3B4XVwiPlxuICAgICAgICB7bGFiZWx9XG4gICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG5QYWdlQm90dG9tQWN0aW9uQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJQYWdlQm90dG9tQWN0aW9uQnV0dG9uXCI7XG5cbi8vIEZpeGVkIGJvdHRvbSBhY3Rpb24gYmFyIHRoYXQgc3RheXMgdmlzaWJsZSB3aGlsZSB0aGUgcGFnZSBzY3JvbGxzLlxuY29uc3QgUGFnZUJvdHRvbUFjdGlvbnMgPSAoeyBjaGlsZHJlbiwgYXJpYUxhYmVsLCBjbGFzc05hbWUgfTogUGFnZUJvdHRvbUFjdGlvbnNQcm9wcykgPT4ge1xuICBjb25zdCBhY3Rpb25CdXR0b25zID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbilcbiAgICAuZmlsdGVyKFxuICAgICAgKGNoaWxkKTogY2hpbGQgaXMgUmVhY3QuUmVhY3RFbGVtZW50PFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcz4gPT5cbiAgICAgICAgaXNWYWxpZEVsZW1lbnQ8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzPihjaGlsZCkgJiYgY2hpbGQudHlwZSA9PT0gUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblxuICAgIClcbiAgICAuc2xpY2UoMCwgTUFYX1BBR0VfQk9UVE9NX0FDVElPTlMpO1xuXG4gIGNvbnN0IGFjdGlvbkNvdW50ID0gYWN0aW9uQnV0dG9ucy5sZW5ndGg7XG4gIGNvbnN0IHsgcmVzZXJ2ZWRIZWlnaHQsIHdyYXBwZXJSZWYgfSA9IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSgpO1xuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcblxuICBpZiAoYWN0aW9uQ291bnQgPCAxKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBhY3Rpb25CYXIgPSAoXG4gICAgPGRpdlxuICAgICAgcmVmPXt3cmFwcGVyUmVmfVxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQteC0wIGJvdHRvbS0wIHotMTkwMCBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwLzkwIGJnLXdoaXRlIHNoYWRvdy1bMF8tMTBweF8yOHB4X3JnYmEoMTUsMjMsNDIsMC4xMildXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0yIHB0LTIgc206cHgtMyBzbTpwdC0yLjVcIlxuICAgICAgICBzdHlsZT17eyBwYWRkaW5nQm90dG9tOiBcImNhbGMoMC4ycmVtICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20sIDBweCkpXCIgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJvbGU9XCJ0b29sYmFyXCJcbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwicG9pbnRlci1ldmVudHMtYXV0byB3LWZ1bGxcIiwgY2xhc3NOYW1lIHx8IFwiXCIpfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIHthY3Rpb25CdXR0b25zLm1hcCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNob3VsZFVzZUZ1bGxXaWR0aCA9IGFjdGlvbkNvdW50ID09PSAxIHx8IChhY3Rpb25Db3VudCAlIDIgPT09IDEgJiYgaW5kZXggPT09IGFjdGlvbkNvdW50IC0gMSk7XG4gICAgICAgICAgICAgIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBmdWxsV2lkdGg6IHNob3VsZFVzZUZ1bGxXaWR0aCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQucHJvcHMudGFiSW5kZXgsXG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgPz8gYHBhZ2UtYm90dG9tLWFjdGlvbi0ke2luZGV4fWAsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT17eyBoZWlnaHQ6IGAke3Jlc2VydmVkSGVpZ2h0fXB4YCB9fSAvPlxuICAgICAge3BvcnRhbFRhcmdldCA/IGNyZWF0ZVBvcnRhbChhY3Rpb25CYXIsIHBvcnRhbFRhcmdldCkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnZUJvdHRvbUFjdGlvbnM7XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VFZmZlY3RFdmVudCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB0eXBlIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIFVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eVJlc3VsdCA9IHtcbiAgcmVzZXJ2ZWRIZWlnaHQ6IG51bWJlcjtcbiAgd3JhcHBlclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG59O1xuXG4vLyBUcmFja3MgdGhlIGJvdHRvbSBhY3Rpb24gYmFyIGhlaWdodCBzbyB0aGUgcGFnZSByZXNlcnZlcyBlbm91Z2ggc3BhY2UgZm9yIGl0LlxuZXhwb3J0IGNvbnN0IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSA9ICgpOiBVc2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHlSZXN1bHQgPT4ge1xuICBjb25zdCB3cmFwcGVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFuaW1hdGlvbkZyYW1lUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbcmVzZXJ2ZWRIZWlnaHQsIHNldFJlc2VydmVkSGVpZ2h0XSA9IHVzZVN0YXRlKDApO1xuXG4gIGNvbnN0IG1lYXN1cmVIZWlnaHQgPSB1c2VFZmZlY3RFdmVudCgoKSA9PiB7XG4gICAgY29uc3Qgd3JhcHBlciA9IHdyYXBwZXJSZWYuY3VycmVudDtcbiAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcblxuICAgIGNvbnN0IG5leHRIZWlnaHQgPSBNYXRoLmNlaWwod3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpO1xuICAgIHNldFJlc2VydmVkSGVpZ2h0KChwcmV2aW91cykgPT4gKE1hdGguYWJzKHByZXZpb3VzIC0gbmV4dEhlaWdodCkgPCAxID8gcHJldmlvdXMgOiBuZXh0SGVpZ2h0KSk7XG4gIH0pO1xuXG4gIGNvbnN0IHNjaGVkdWxlTWVhc3VyZSA9IHVzZUVmZmVjdEV2ZW50KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcbiAgICB9XG5cbiAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIG1lYXN1cmVIZWlnaHQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBtZWFzdXJlSGVpZ2h0KCk7XG5cbiAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgY29uc3Qgd3JhcHBlciA9IHdyYXBwZXJSZWYuY3VycmVudDtcbiAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgIHNjaGVkdWxlTWVhc3VyZSgpO1xuICAgIH0pO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3cmFwcGVyKTtcbiAgICByZXR1cm4gKCkgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xuICAgICAgc2NoZWR1bGVNZWFzdXJlKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xuXG4gICAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgcmVzZXJ2ZWRIZWlnaHQsXG4gICAgd3JhcHBlclJlZixcbiAgfTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VHYXN0b1R5cGVDb2RlLFxuICBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSxcbiAgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuXG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSA9IFwiaW5kLWV4cGVuc2UtdGlja2V0LWltYWdlLXYxXCI7XG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYID0gXCIvX19pbmRfY2FjaGVfXy90aWNrZXQtaW1hZ2UvXCI7XG5jb25zdCBUSUNLRVRfVFJBQ0VfU1RPUkFHRV9LRVkgPSBcImV4cGVuc2Vfc2hlZXRfdGlja2V0X3F1aWNrX2Zsb3dfdHJhY2VfdjFcIjtcblxuZXhwb3J0IGNvbnN0IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyA9IDUwICogMTAyNCAqIDEwMjQ7XG5leHBvcnQgY29uc3QgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgPVxuICBcIi5qcGcsLmpwZWcsLnBuZywud2VicCxpbWFnZS9qcGVnLGltYWdlL3BqcGVnLGltYWdlL3BuZyxpbWFnZS93ZWJwXCI7XG5jb25zdCBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTID0gbmV3IFNldDxzdHJpbmc+KFtcImltYWdlL2pwZWdcIiwgXCJpbWFnZS9wanBlZ1wiLCBcImltYWdlL3BuZ1wiLCBcImltYWdlL3dlYnBcIl0pO1xuY29uc3QgQUxMT1dFRF9USUNLRVRfSU1BR0VfRVhURU5TSU9OUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJqcGdcIiwgXCJqcGVnXCIsIFwicG5nXCIsIFwid2VicFwiXSk7XG5jb25zdCBUSUNLRVRfTUlNRV9UT19FWFRFTlNJT046IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIFwiaW1hZ2UvanBlZ1wiOiBcImpwZ1wiLFxuICBcImltYWdlL3BqcGVnXCI6IFwianBnXCIsXG4gIFwiaW1hZ2UvanBnXCI6IFwianBnXCIsXG4gIFwiaW1hZ2UvcG5nXCI6IFwicG5nXCIsXG4gIFwiaW1hZ2Uvd2VicFwiOiBcIndlYnBcIixcbn07XG5jb25zdCBBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcbmNvbnN0IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEUgPSA4O1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ1JFQVRFX01PREUgPSBcIm1hbnVhbFwiIGFzIFwiaWFcIiB8IFwibWFudWFsXCI7XG5cbmV4cG9ydCB0eXBlIFRpY2tldEltYWdlU291cmNlID0gXCJjYW1lcmFcIiB8IFwiZ2FsbGVyeVwiO1xuXG5leHBvcnQgdHlwZSBUaWNrZXRUcmFjZUVudHJ5ID0ge1xuICBzdGVwOiBzdHJpbmc7XG4gIHRyYWNlSWQ6IHN0cmluZztcbiAgYXQ6IHN0cmluZztcbn07XG5cbnR5cGUgTm9ybWFsaXplZERyYWZ0TGluZSA9IHtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHR5cGVWYWx1ZTogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBxdHk6IG51bWJlcjtcbiAgcHJpY2U6IG51bWJlcjtcbiAgdG90YWxBbW91bnQ6IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIE5vcm1hbGl6ZWREcmFmdCA9IHtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBjb21lbnRhcmlvOiBzdHJpbmc7XG4gIGdhc3RvVHlwZTogbnVtYmVyIHwgbnVsbDtcbiAgbGluZXM6IE5vcm1hbGl6ZWREcmFmdExpbmVbXTtcbn07XG5cbmV4cG9ydCB0eXBlIFBlbmRpbmdVcGxvYWRSZXRyeSA9XG4gIHwge1xuICAgICAgc3RyYXRlZ3k6IFwiaWEtcmVhZHlcIjtcbiAgICAgIGZpbGVJZDogc3RyaW5nO1xuICAgICAgZXh0ZW5zaW9uOiBzdHJpbmc7XG4gICAgICBjYWNoZUtleTogc3RyaW5nO1xuICAgICAgZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdDtcbiAgICAgIGZpbGVOYW1lSGludDogc3RyaW5nO1xuICAgIH1cbiAgfCB7XG4gICAgICBzdHJhdGVneTogXCJtYW51YWwtcG9zdC11cGxvYWQtZHJhZnRcIjtcbiAgICAgIGZpbGVJZDogc3RyaW5nO1xuICAgICAgZXh0ZW5zaW9uOiBzdHJpbmc7XG4gICAgICBjYWNoZUtleTogc3RyaW5nO1xuICAgICAgZmlsZU5hbWVIaW50OiBzdHJpbmc7XG4gICAgfTtcblxuZXhwb3J0IHR5cGUgVXBsb2FkU3luY1Jlc3VsdCA9IHtcbiAgdXJsRmlsZTogc3RyaW5nO1xuICBmaWxlTmFtZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncyA9IHtcbiAgc2hlZXRJZD86IHN0cmluZztcbiAgcHJvamVjdElkPzogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNTaGVldExvY2tlZDogYm9vbGVhbjtcbiAgbGlua1RvU2hlZXQ/OiBib29sZWFuO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbiAgb25Db21wbGV0ZWQ/OiAocmVzdWx0OiB7IGZpbGVJZDogc3RyaW5nOyBsaW5rZWRUb1NoZWV0OiBib29sZWFuIH0pID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBRdWlja0Zsb3dQcm9ncmVzc0tleSA9XG4gIHwgXCJ1cGxvYWRpbmdJbWFnZVwiXG4gIHwgXCJjcmVhdGluZ1RpY2tldFwiXG4gIHwgXCJzeW5jaW5nRmlsZVwiXG4gIHwgXCJmaW5hbGl6aW5nSWFcIlxuICB8IFwibGlua2luZ0V4cGVuc2VMaW5lXCJcbiAgfCBcImRvbmVcIjtcblxuY29uc3QgYXNSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9PiB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4ge307XG4gIHJldHVybiB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn07XG5cbmNvbnN0IGdldEZpcnN0RGVmaW5lZCA9IChyZWNvcmQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBrZXlzOiBzdHJpbmdbXSk6IHVua25vd24gPT4ge1xuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgaWYgKGtleSBpbiByZWNvcmQpIHtcbiAgICAgIHJldHVybiByZWNvcmRba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHRvTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IHRvUG9zaXRpdmVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdW1iZXIodmFsdWUpO1xuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIHBhcnNlZCA+IDAgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgdG9EZE1tWXl5eSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eSh2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VG9kYXlEZE1tWXl5eSA9ICgpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdG9EZE1tWXl5eShuZXcgRGF0ZSgpKTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwgfHwgIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuY29uc3Qgbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24gPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtejAtOV0vZywgXCJcIik7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIFwiXCI7XG4gIGlmIChub3JtYWxpemVkID09PSBcImpwZWdcIikgcmV0dXJuIFwianBnXCI7XG4gIHJldHVybiBBTExPV0VEX1RJQ0tFVF9JTUFHRV9FWFRFTlNJT05TLmhhcyhub3JtYWxpemVkKSA/IG5vcm1hbGl6ZWQgOiBcIlwiO1xufTtcblxuY29uc3QgcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZSA9IChmaWxlOiBGaWxlKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZnJvbU5hbWUgPSBzYWZlVGV4dChmaWxlLm5hbWUpLnNwbGl0KFwiLlwiKS5wb3AoKSB8fCBcIlwiO1xuICByZXR1cm4gbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24oZnJvbU5hbWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGluZmVyRXh0ZW5zaW9uID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB0eXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBmcm9tTWltZSA9IFRJQ0tFVF9NSU1FX1RPX0VYVEVOU0lPTlt0eXBlXTtcbiAgaWYgKGZyb21NaW1lKSByZXR1cm4gZnJvbU1pbWU7XG5cbiAgY29uc3QgZnJvbU5hbWUgPSByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lKGZpbGUpO1xuICBpZiAoZnJvbU5hbWUpIHJldHVybiBmcm9tTmFtZTtcblxuICByZXR1cm4gXCJqcGdcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1N1cHBvcnRlZFRpY2tldEltYWdlRmlsZSA9IChmaWxlOiBGaWxlKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUeXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAobm9ybWFsaXplZFR5cGUgJiYgQUxMT1dFRF9USUNLRVRfSU1BR0VfTUlNRV9UWVBFUy5oYXMobm9ybWFsaXplZFR5cGUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBleHRlbnNpb24gPSByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lKGZpbGUpO1xuICByZXR1cm4gISFleHRlbnNpb247XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVJhbmRvbUtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIGNyeXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY3J5cHRvLnJhbmRvbVVVSUQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuICB9XG4gIHJldHVybiBgJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDEwKX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhbml0aXplRmlsZU5hbWUgPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGJhc2UgPSBzYWZlVGV4dCh2YWx1ZSkucmVwbGFjZSgvWzw+OlwiL1xcXFx8PypcXHUwMDAwLVxcdTAwMUZdL2csIFwiX1wiKTtcbiAgcmV0dXJuIGJhc2UgfHwgXCJ0aWNrZXQtaW1hZ2VcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhY2VJZEZyb21FcnJvciA9IChlcnJvcjogQXBpRmV0Y2hFcnJvcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBheWxvYWQgPSBzYWZlVGV4dChlcnJvci5yZXNwb25zZUJvZHkpO1xuICBpZiAoIXBheWxvYWQpIHJldHVybiBcIlwiO1xuICB0cnkge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKHBheWxvYWQpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIGNvbnN0IHRyYWNlSWQgPSBzYWZlVGV4dChqc29uLlRyYWNlSWQgPz8ganNvbi50cmFjZUlkKTtcbiAgICByZXR1cm4gdHJhY2VJZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBOb3JtYWxpemVkRHJhZnQgPT4ge1xuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XG4gIGNvbnN0IGRyYWZ0RGVzY3JpcHRpb24gPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiXSkpO1xuICBjb25zdCBkcmFmdEN1cnJlbmN5ID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImN1cnJlbmN5Q29kZVwiLCBcIkN1cnJlbmN5Q29kZVwiXSkpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRyYWZ0VG90YWxBbW91bnQgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcbiAgY29uc3QgZHJhZnRUcmFuc0RhdGUgPSB0b0RkTW1ZeXl5KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0cmFuc0RhdGVcIiwgXCJUcmFuc0RhdGVcIl0pKSB8fCBnZXRUb2RheURkTW1ZeXl5KCk7XG4gIGNvbnN0IGRyYWZ0Q29tbWVudCA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJjb21lbnRhcmlvXCIsIFwiQ29tZW50YXJpb1wiXSkpO1xuICBjb25zdCBkcmFmdEdhc3RvVHlwZSA9IG5vcm1hbGl6ZUdhc3RvVHlwZShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZ2FzdG9UeXBlXCIsIFwiR2FzdG9UeXBlXCJdKSk7XG5cbiAgY29uc3QgcmF3TGluZXMgPSBnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wibGluZXNcIiwgXCJMaW5lc1wiXSk7XG4gIGNvbnN0IGxpbmVBcnJheSA9IEFycmF5LmlzQXJyYXkocmF3TGluZXMpID8gcmF3TGluZXMgOiBbXTtcblxuICBjb25zdCBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdID0gbGluZUFycmF5XG4gICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVSZWNvcmQgPSBhc1JlY29yZChlbnRyeSk7XG4gICAgICBjb25zdCBxdHkgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJxdHlcIiwgXCJRdHlcIl0pKSB8fCAxO1xuICAgICAgY29uc3QgcHJpY2UgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJwcmljZVwiLCBcIlByaWNlXCJdKSkgfHwgMDtcbiAgICAgIGNvbnN0IGV4cGxpY2l0VG90YWwgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcbiAgICAgIGNvbnN0IGNvbXB1dGVkVG90YWwgPSBleHBsaWNpdFRvdGFsID4gMCA/IGV4cGxpY2l0VG90YWwgOiBxdHkgKiBwcmljZTtcbiAgICAgIGlmICghKGNvbXB1dGVkVG90YWwgPiAwKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGNhbmRpZGF0ZVR5cGVWYWx1ZSA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInR5cGVWYWx1ZVwiLCBcIlR5cGVWYWx1ZVwiXSkpO1xuICAgICAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlci5pc0ludGVnZXIoY2FuZGlkYXRlVHlwZVZhbHVlKSA/IE51bWJlcihjYW5kaWRhdGVUeXBlVmFsdWUpIDogbnVsbDtcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IHNhZmVUeXBlVmFsdWUgJiYgc2FmZVR5cGVWYWx1ZSA+IDAgPyBzYWZlVHlwZVZhbHVlIDogZHJhZnRHYXN0b1R5cGUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKSB8fCBkcmFmdERlc2NyaXB0aW9uO1xuICAgICAgY29uc3QgdHJhbnNEYXRlID0gdG9EZE1tWXl5eShnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widHJhbnNEYXRlXCIsIFwiVHJhbnNEYXRlXCJdKSkgfHwgZHJhZnRUcmFuc0RhdGU7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgdHlwZVZhbHVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICAgICAgcXR5LFxuICAgICAgICBwcmljZTogcHJpY2UgPiAwID8gcHJpY2UgOiBjb21wdXRlZFRvdGFsLFxuICAgICAgICB0b3RhbEFtb3VudDogY29tcHV0ZWRUb3RhbCxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIE5vcm1hbGl6ZWREcmFmdExpbmUgPT4gZW50cnkgIT09IG51bGwpO1xuXG4gIHJldHVybiB7XG4gICAgZGVzY3JpcHRpb246IGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0Q3VycmVuY3kgfHwgXCJFVVJcIixcbiAgICB0b3RhbEFtb3VudDogZHJhZnRUb3RhbEFtb3VudCA+IDAgPyBkcmFmdFRvdGFsQW1vdW50IDogbGluZXMucmVkdWNlKChzdW0sIGxpbmUpID0+IHN1bSArIGxpbmUudG90YWxBbW91bnQsIDApLFxuICAgIHRyYW5zRGF0ZTogZHJhZnRUcmFuc0RhdGUsXG4gICAgY29tZW50YXJpbzogZHJhZnRDb21tZW50LFxuICAgIGdhc3RvVHlwZTogZHJhZnRHYXN0b1R5cGUsXG4gICAgbGluZXMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRpY2tldEZpbGVJZEZyb21EcmFmdFJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XG4gIGNvbnN0IGNyZWF0aW9uUmF3ID0gZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlRpY2tldENyZWF0aW9uXCIsIFwidGlja2V0Q3JlYXRpb25cIl0pO1xuICBjb25zdCBjcmVhdGlvbiA9IGFzUmVjb3JkKGNyZWF0aW9uUmF3KTtcbiAgcmV0dXJuIHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChjcmVhdGlvbiwgW1wiRmlsZUlkXCIsIFwiZmlsZUlkXCJdKSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVVwbG9hZFJlc3VsdCA9IChyZXNwb25zZURhdGE6IHVua25vd24pOiBVcGxvYWRTeW5jUmVzdWx0ID0+IHtcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJlc3BvbnNlRGF0YSk7XG4gIHJldHVybiB7XG4gICAgdXJsRmlsZTogc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlVybEZpbGVcIiwgXCJ1cmxGaWxlXCJdKSksXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJGaWxlTmFtZVwiLCBcImZpbGVOYW1lXCJdKSksXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRUaWNrZXRJYVBheWxvYWQgPSAoZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCwgdXBsb2FkOiBVcGxvYWRTeW5jUmVzdWx0KTogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0+IHtcbiAgY29uc3QgaWFMaW5lcyA9IGRyYWZ0LmxpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICBkZXNjcmlwdGlvbjogbGluZS5kZXNjcmlwdGlvbixcbiAgICBxdHk6IGxpbmUucXR5LFxuICAgIHByaWNlOiBsaW5lLnByaWNlLFxuICAgIHRvdGFsQW1vdW50OiBsaW5lLnRvdGFsQW1vdW50LFxuICB9KSk7XG5cbiAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0ge1xuICAgIGRlc2NyaXB0aW9uOiBkcmFmdC5kZXNjcmlwdGlvbixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0LmN1cnJlbmN5Q29kZSxcbiAgICB0b3RhbEFtb3VudDogZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiB1bmRlZmluZWQsXG4gICAgdHJhbnNEYXRlOiBkcmFmdC50cmFuc0RhdGUsXG4gICAgY29tZW50YXJpbzogZHJhZnQuY29tZW50YXJpbyB8fCB1bmRlZmluZWQsXG4gICAgdXJsRmlsZTogdXBsb2FkLnVybEZpbGUgfHwgdW5kZWZpbmVkLFxuICAgIGZpbGVOYW1lOiB1cGxvYWQuZmlsZU5hbWUgfHwgdW5kZWZpbmVkLFxuICAgIGxpbmVzOiBpYUxpbmVzLFxuICB9O1xuXG4gIGlmIChkcmFmdC5nYXN0b1R5cGUgIT09IG51bGwpIHtcbiAgICBwYXlsb2FkLmdhc3RvVHlwZSA9IGRyYWZ0Lmdhc3RvVHlwZSBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkU2hlZXRMaW5lUGF5bG9hZCA9IChcbiAgZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCxcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHByb2plY3RJZDogc3RyaW5nXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCB8IG51bGwgPT4ge1xuICBjb25zdCBsaW5lRnJvbURyYWZ0ID0gZHJhZnQubGluZXNbMF07XG4gIC8vIEJ1aWxkIGEgc2luZ2xlIGV4cGVuc2UgbGluZSBmcm9tIHRpY2tldCBoZWFkZXIgZGF0YSB0byBhdm9pZCBsaW5lLWxldmVsIGRlc2NyaXB0aW9uIGxlYWthZ2UuXG4gIGNvbnN0IGhlYWRlclRvdGFsID0gZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiAwO1xuICBjb25zdCBmYWxsYmFja1RvdGFsID0gbGluZUZyb21EcmFmdD8udG90YWxBbW91bnQgfHwgMDtcbiAgY29uc3QgZWZmZWN0aXZlVG90YWwgPSBoZWFkZXJUb3RhbCA+IDAgPyBoZWFkZXJUb3RhbCA6IGZhbGxiYWNrVG90YWw7XG4gIGlmICghKGVmZmVjdGl2ZVRvdGFsID4gMCkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHR5cGVWYWx1ZUNhbmRpZGF0ZSA9IGRyYWZ0Lmdhc3RvVHlwZSB8fCBsaW5lRnJvbURyYWZ0Py50eXBlVmFsdWUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcbiAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlcih0eXBlVmFsdWVDYW5kaWRhdGUpO1xuICBjb25zdCB0eXBlVmFsdWUgPSBOdW1iZXIuaXNJbnRlZ2VyKHNhZmVUeXBlVmFsdWUpICYmIHNhZmVUeXBlVmFsdWUgPiAwID8gc2FmZVR5cGVWYWx1ZSA6IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XG5cbiAgcmV0dXJuIHtcbiAgICB0cmFuc0RhdGU6IGRyYWZ0LnRyYW5zRGF0ZSB8fCBsaW5lRnJvbURyYWZ0Py50cmFuc0RhdGUgfHwgZ2V0VG9kYXlEZE1tWXl5eSgpLFxuICAgIHR5cGVWYWx1ZSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoZHJhZnQuZGVzY3JpcHRpb24pIHx8IFwiVGlja2V0XCIsXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXG4gICAgZmlsZUlkLFxuICAgIHRpY2tldDogdHJ1ZSxcbiAgICBxdHk6IDEsXG4gICAgcHJpY2U6IGVmZmVjdGl2ZVRvdGFsLFxuICAgIHByb2pJZDogc2FmZVRleHQocHJvamVjdElkKSB8fCB1bmRlZmluZWQsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcGVyc2lzdFRyYWNlTGlzdCA9ICh0cmFjZUxpc3Q6IFRpY2tldFRyYWNlRW50cnlbXSk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVElDS0VUX1RSQUNFX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeSh0cmFjZUxpc3QpKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gSWdub3JlIHN0b3JhZ2UgZmFpbHVyZXMgaW4gcmVzdHJpY3RlZCBicm93c2VyIGNvbnRleHRzLlxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY2FjaGVJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZywgZmlsZTogRmlsZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuO1xuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XG4gIGF3YWl0IGNhY2hlLnB1dChcbiAgICBuZXcgUmVxdWVzdChyZXF1ZXN0VXJsKSxcbiAgICBuZXcgUmVzcG9uc2UoZmlsZSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBzYWZlVGV4dChmaWxlLnR5cGUpIHx8IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG4gICAgICB9LFxuICAgIH0pXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVhZENhY2hlZEltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTxCbG9iIHwgbnVsbD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcbiAgY29uc3QgY2FjaGVkUmVzcG9uc2UgPSBhd2FpdCBjYWNoZS5tYXRjaChyZXF1ZXN0VXJsKTtcbiAgaWYgKCFjYWNoZWRSZXNwb25zZSkgcmV0dXJuIG51bGw7XG4gIHJldHVybiBjYWNoZWRSZXNwb25zZS5ibG9iKCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybjtcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xuICBhd2FpdCBjYWNoZS5kZWxldGUocmVxdWVzdFVybCk7XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHtcbiAgTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTLFxuICBjYWNoZUltYWdlRmlsZSxcbiAgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IsXG4gIGlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlLFxuICBwZXJzaXN0VHJhY2VMaXN0LFxuICByZW1vdmVDYWNoZWRJbWFnZUZpbGUsXG4gIHJlc29sdmVSYW5kb21LZXksXG4gIHR5cGUgUXVpY2tGbG93UHJvZ3Jlc3NLZXksXG4gIHR5cGUgVGlja2V0SW1hZ2VTb3VyY2UsXG4gIHR5cGUgVGlja2V0VHJhY2VFbnRyeSxcbiAgdHlwZSBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzLFxufSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzXCI7XG5pbXBvcnQgeyBvcHRpbWl6ZVRpY2tldEltYWdlRm9yVXBsb2FkLCB0eXBlIFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0IH0gZnJvbSBcIi4vdGlja2V0SW1hZ2VPcHRpbWl6YXRpb24udHNcIjtcblxudHlwZSBRdWlja0NyZWF0ZVBhcnRpYWxUaWNrZXRTdGF0ZSA9IHtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIGxpbmtlZFRvU2hlZXQ6IGJvb2xlYW47XG4gIGNvbXBsZXRlZFN0YWdlOiBzdHJpbmc7XG4gIHVybEZpbGU6IHN0cmluZztcbiAgZmlsZU5hbWU6IHN0cmluZztcbiAgcHJvY2Vzc2VkQnlBSTogYm9vbGVhbiB8IG51bGw7XG59O1xuXG50eXBlIFF1aWNrVGlja2V0QXR0ZW1wdENvbnRleHQgPSB7XG4gIGF0dGVtcHRJZDogc3RyaW5nO1xuICBzb3VyY2U6IFRpY2tldEltYWdlU291cmNlO1xuICBzdGFydGVkQXQ6IG51bWJlcjtcbiAgb3B0aW1pemF0aW9uOiBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdDtcbn07XG5cbmNvbnN0IFFVSUNLX1RJQ0tFVF9GTE9XX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXF1aWNrLXRpY2tldF1cIjtcblxuY29uc3QgbG9nUXVpY2tUaWNrZXRJbmZvID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS5pbmZvKFFVSUNLX1RJQ0tFVF9GTE9XX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xuICB9XG59O1xuXG5jb25zdCBsb2dRdWlja1RpY2tldFdhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zb2xlLndhcm4oUVVJQ0tfVElDS0VUX0ZMT1dfTE9HX1BSRUZJWCwgLi4uYXJncyk7XG4gIH1cbn07XG5cbmNvbnN0IGxvZ1F1aWNrVGlja2V0RXJyb3IgPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS5lcnJvcihRVUlDS19USUNLRVRfRkxPV19MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuY29uc3QgZm9ybWF0RmlsZVNpemUgPSAoc2l6ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgaWYgKCEoc2l6ZSA+IDApKSByZXR1cm4gXCIwIEJcIjtcbiAgaWYgKHNpemUgPj0gMTAyNCAqIDEwMjQpIHJldHVybiBgJHsoc2l6ZSAvICgxMDI0ICogMTAyNCkpLnRvRml4ZWQoMil9IE1CYDtcbiAgaWYgKHNpemUgPj0gMTAyNCkgcmV0dXJuIGAkeyhzaXplIC8gMTAyNCkudG9GaXhlZCgxKX0gS0JgO1xuICByZXR1cm4gYCR7c2l6ZX0gQmA7XG59O1xuXG5jb25zdCBidWlsZEZpbGVMb2dEYXRhID0gKGZpbGU6IEZpbGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBzYWZlVGV4dChmaWxlLm5hbWUpLFxuICAgIHR5cGU6IHNhZmVUZXh0KGZpbGUudHlwZSksXG4gICAgc2l6ZUJ5dGVzOiBOdW1iZXIoZmlsZS5zaXplIHx8IDApLFxuICAgIHNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShOdW1iZXIoZmlsZS5zaXplIHx8IDApKSxcbiAgICBsYXN0TW9kaWZpZWQ6IE51bWJlcihmaWxlLmxhc3RNb2RpZmllZCB8fCAwKSxcbiAgfTtcbn07XG5cbmNvbnN0IGJ1aWxkRmFsbGJhY2tPcHRpbWl6YXRpb25SZXN1bHQgPSAoZmlsZTogRmlsZSk6IFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0ID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlLFxuICAgIGNoYW5nZWQ6IGZhbHNlLFxuICAgIHJlYXNvbjogXCJvcHRpbWl6YXRpb24tZXJyb3JcIixcbiAgICByZXNpemVkOiBmYWxzZSxcbiAgICByZWVuY29kZWQ6IGZhbHNlLFxuICAgIGVsYXBzZWRNczogMCxcbiAgICBvcmlnaW5hbDoge1xuICAgICAgbmFtZTogc2FmZVRleHQoZmlsZS5uYW1lKSxcbiAgICAgIHR5cGU6IHNhZmVUZXh0KGZpbGUudHlwZSksXG4gICAgICBzaXplOiBOdW1iZXIoZmlsZS5zaXplIHx8IDApLFxuICAgICAgd2lkdGg6IG51bGwsXG4gICAgICBoZWlnaHQ6IG51bGwsXG4gICAgfSxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIG5hbWU6IHNhZmVUZXh0KGZpbGUubmFtZSksXG4gICAgICB0eXBlOiBzYWZlVGV4dChmaWxlLnR5cGUpLFxuICAgICAgc2l6ZTogTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSxcbiAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgaGVpZ2h0OiBudWxsLFxuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCBidWlsZE9wdGltaXphdGlvbkxvZ0RhdGEgPSAocmVzdWx0OiBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdCkgPT4ge1xuICBjb25zdCBzYXZlZEJ5dGVzID0gTWF0aC5tYXgoMCwgcmVzdWx0Lm9yaWdpbmFsLnNpemUgLSByZXN1bHQub3V0cHV0LnNpemUpO1xuICBjb25zdCBzYXZlZFJhdGlvID0gcmVzdWx0Lm9yaWdpbmFsLnNpemUgPiAwID8gc2F2ZWRCeXRlcyAvIHJlc3VsdC5vcmlnaW5hbC5zaXplIDogMDtcblxuICByZXR1cm4ge1xuICAgIGNoYW5nZWQ6IHJlc3VsdC5jaGFuZ2VkLFxuICAgIHJlYXNvbjogcmVzdWx0LnJlYXNvbixcbiAgICByZXNpemVkOiByZXN1bHQucmVzaXplZCxcbiAgICByZWVuY29kZWQ6IHJlc3VsdC5yZWVuY29kZWQsXG4gICAgZWxhcHNlZE1zOiByZXN1bHQuZWxhcHNlZE1zLFxuICAgIG9yaWdpbmFsOiB7XG4gICAgICAuLi5yZXN1bHQub3JpZ2luYWwsXG4gICAgICBzaXplVGV4dDogZm9ybWF0RmlsZVNpemUocmVzdWx0Lm9yaWdpbmFsLnNpemUpLFxuICAgIH0sXG4gICAgb3V0cHV0OiB7XG4gICAgICAuLi5yZXN1bHQub3V0cHV0LFxuICAgICAgc2l6ZVRleHQ6IGZvcm1hdEZpbGVTaXplKHJlc3VsdC5vdXRwdXQuc2l6ZSksXG4gICAgfSxcbiAgICBzYXZlZEJ5dGVzLFxuICAgIHNhdmVkVGV4dDogZm9ybWF0RmlsZVNpemUoc2F2ZWRCeXRlcyksXG4gICAgc2F2ZWRSYXRpbzogTnVtYmVyKHNhdmVkUmF0aW8udG9GaXhlZCg0KSksXG4gIH07XG59O1xuXG5jb25zdCBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzID0gKFxuICBlcnJvcnM6IEFycmF5PHsgRmllbGQ/OiB1bmtub3duOyBNZXNzYWdlPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZD4gfCBudWxsIHwgdW5kZWZpbmVkXG4pOiBzdHJpbmcgPT4ge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZXJyb3JzKSB8fCBlcnJvcnMubGVuZ3RoID09PSAwKSByZXR1cm4gXCJcIjtcblxuICByZXR1cm4gZXJyb3JzXG4gICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkID0gc2FmZVRleHQoZW50cnk/LkZpZWxkKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzYWZlVGV4dChlbnRyeT8uTWVzc2FnZSk7XG4gICAgICBpZiAoZmllbGQgJiYgbWVzc2FnZSkgcmV0dXJuIGAke2ZpZWxkfTogJHttZXNzYWdlfWA7XG4gICAgICByZXR1cm4gbWVzc2FnZSB8fCBmaWVsZDtcbiAgICB9KVxuICAgIC5maWx0ZXIoQm9vbGVhbilcbiAgICAuam9pbihcIiB8IFwiKTtcbn07XG5cbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgPSAoe1xuICBzaGVldElkID0gXCJcIixcbiAgcHJvamVjdElkID0gXCJcIixcbiAgY3VycmVuY3lDb2RlID0gXCJcIixcbiAgYXhVc2VySWRPdmVycmlkZSA9IFwiXCIsXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXG4gIGlzQ3JlYXRlTW9kZSxcbiAgaXNTaGVldExvY2tlZCxcbiAgbGlua1RvU2hlZXQgPSB0cnVlLFxuICBvbkZvcmJpZGRlbixcbiAgb25Db21wbGV0ZWQsXG59OiBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzKSA9PiB7XG4gIGNvbnN0IFtzb3VyY2VQaWNrZXJPcGVuLCBzZXRTb3VyY2VQaWNrZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcHJvZ3Jlc3NLZXksIHNldFByb2dyZXNzS2V5XSA9IHVzZVN0YXRlPFF1aWNrRmxvd1Byb2dyZXNzS2V5IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW2F0dGVtcHRJZCwgc2V0QXR0ZW1wdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbdHJhY2VMaXN0LCBzZXRUcmFjZUxpc3RdID0gdXNlU3RhdGU8VGlja2V0VHJhY2VFbnRyeVtdPihbXSk7XG4gIGNvbnN0IFtwYXJ0aWFsVGlja2V0RmFpbHVyZSwgc2V0UGFydGlhbFRpY2tldEZhaWx1cmVdID0gdXNlU3RhdGU8UXVpY2tDcmVhdGVQYXJ0aWFsVGlja2V0U3RhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGF0ZXN0RmlsZVJlZiA9IHVzZVJlZjx7IGNhY2hlS2V5OiBzdHJpbmc7IGZpbGU6IEZpbGUgfSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXRlc3RDcmVhdGVkVGlja2V0UmVmID0gdXNlUmVmPFF1aWNrQ3JlYXRlUGFydGlhbFRpY2tldFN0YXRlIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcHJvZ3Jlc3NNZXNzYWdlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcInVwbG9hZGluZ0ltYWdlXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX1VwbG9hZGluZ0ltYWdlXCIsIFwiVXBsb2FkaW5nIGltYWdlLi4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwiY3JlYXRpbmdUaWNrZXRcIikge1xuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfQ3JlYXRpbmdUaWNrZXRcIiwgXCJDcmVhdGluZyB0aWNrZXQuLi5cIik7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJzeW5jaW5nRmlsZVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19TeW5jaW5nRmlsZVwiLCBcIlN5bmNpbmcgZmlsZS4uLlwiKTtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcImZpbmFsaXppbmdJYVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19GaW5hbGl6aW5nXCIsIFwiRmluYWxpemluZyBJQS4uLlwiKTtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcImxpbmtpbmdFeHBlbnNlTGluZVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19MaW5raW5nTGluZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lLi4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19Eb25lXCIsIFwiRG9uZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0sIFtwcm9ncmVzc0tleV0pO1xuXG4gIGNvbnN0IGFkZFRyYWNlID0gdXNlQ2FsbGJhY2soKHN0ZXA6IHN0cmluZywgdHJhY2VJZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc2FmZVRyYWNlSWQgPSBzYWZlVGV4dCh0cmFjZUlkKTtcbiAgICBpZiAoIXNhZmVUcmFjZUlkKSByZXR1cm47XG5cbiAgICBzZXRUcmFjZUxpc3QoKHByZXZpb3VzKSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gW1xuICAgICAgICAuLi5wcmV2aW91cyxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXAsXG4gICAgICAgICAgdHJhY2VJZDogc2FmZVRyYWNlSWQsXG4gICAgICAgICAgYXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgfSxcbiAgICAgIF07XG4gICAgICBwZXJzaXN0VHJhY2VMaXN0KG5leHQpO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckNhY2hlZEN1cnJlbnRJbWFnZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBjYWNoZUtleSA9IGxhdGVzdEZpbGVSZWYuY3VycmVudD8uY2FjaGVLZXk7XG4gICAgaWYgKCFjYWNoZUtleSkgcmV0dXJuO1xuICAgIHZvaWQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKGNhY2hlS2V5KS5jYXRjaCgoKSA9PiB7XG4gICAgICAvLyBJZ25vcmUgY2FjaGUgY2xlYW51cCBmYWlsdXJlcyBpbiByZXN0cmljdGVkIGJyb3dzZXIgY29udGV4dHMuXG4gICAgfSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjbGVhckZsb3dTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBsYXRlc3RDcmVhdGVkVGlja2V0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgICBzZXRUcmFjZUxpc3QoW10pO1xuICAgIHBlcnNpc3RUcmFjZUxpc3QoW10pO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgYnVpbGRBcGlPcHRpb25zID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHNhZmVBeFVzZXJJZCA9IHNhZmVUZXh0KGF4VXNlcklkT3ZlcnJpZGUpO1xuICAgIGlmICghc2FmZUF4VXNlcklkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIlgtSU5ELUF4VXNlcklkXCI6IHNhZmVBeFVzZXJJZCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfSwgW2F4VXNlcklkT3ZlcnJpZGVdKTtcblxuICBjb25zdCBlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24gPSB1c2VDYWxsYmFjaygoKTogYm9vbGVhbiA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlIHx8IGlzQ3JlYXRlTW9kZSB8fCBpc1NoZWV0TG9ja2VkIHx8IChsaW5rVG9TaGVldCAmJiAhc2hlZXRJZCkpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc1NoZWV0TG9ja2VkLCBsaW5rVG9TaGVldCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICBjb25zdCByZXNvbHZlVWlFcnJvck1lc3NhZ2UgPSB1c2VDYWxsYmFjaygoZXJyb3I6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25UZXh0ID0gZm9ybWF0VmFsaWRhdGlvbkVycm9ycyhlcnJvci52YWxpZGF0aW9uRXJyb3JzKTtcbiAgICAgIGlmICh2YWxpZGF0aW9uVGV4dCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGlvblRleHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyOSkge1xuICAgICAgICByZXR1cm4gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1JhdGVMaW1pdFwiLCBcIlRvbyBtYW55IHJlcXVlc3RzLlwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX05vdEZvdW5kXCIsIFwiUmVjb3JkIG5vdCBmb3VuZC5cIik7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcbiAgICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TZXJ2ZXJcIiwgXCJTZXJ2ZXIgZXJyb3IuXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXG4gICAgICA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXG4gICAgICA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGFkZFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFjZXMgPSB1c2VDYWxsYmFjayhcbiAgICAocmVzcG9uc2U6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0KSA9PiB7XG4gICAgICBhZGRUcmFjZShcInRpY2tldC1xdWljay1jcmVhdGVcIiwgc2FmZVRleHQocmVzcG9uc2UuVHJhY2VJZCkpO1xuXG4gICAgICBjb25zdCBzdGVwVHJhY2VJZHMgPSByZXNwb25zZS5EYXRhPy5TdGVwVHJhY2VJZHM7XG4gICAgICBhZGRUcmFjZShcInRpY2tldC1jcmVhdGVcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5UaWNrZXRDcmVhdGUpKTtcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LWZpbGUtdXBsb2FkXCIsIHNhZmVUZXh0KHN0ZXBUcmFjZUlkcz8uRmlsZVVwbG9hZCkpO1xuICAgICAgYWRkVHJhY2UoXCJleHBlbnNlZnJvbXRpY2tldFwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LkRyYWZ0RXh0cmFjdCkpO1xuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmluYWxpemVcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5UaWNrZXRGaW5hbGl6ZSkpO1xuICAgICAgYWRkVHJhY2UoXCJleHBlbnNlLXNoZWV0LWxpbmtcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5TaGVldExpbmspKTtcbiAgICB9LFxuICAgIFthZGRUcmFjZV1cbiAgKTtcblxuICBjb25zdCByZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZSA9IHVzZUNhbGxiYWNrKChyZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5EYXRhO1xuICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGRhdGE/LkZpbGVJZCk7XG4gICAgY29uc3QgY29tcGxldGVkU3RhZ2UgPSBzYWZlVGV4dChkYXRhPy5Db21wbGV0ZWRTdGFnZSk7XG4gICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSk7XG4gICAgY29uc3QgdmFsaWRhdGlvblRleHQgPSBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzKHJlc3BvbnNlLkVycm9ycyk7XG4gICAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLlJldHJ5QWZ0ZXIpO1xuICAgIGNvbnN0IG1lc3NhZ2VQYXJ0czogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA0MjkpIHtcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKHJlc3BvbnNlTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmF0ZUxpbWl0XCIsIFwiVG9vIG1hbnkgcmVxdWVzdHMuXCIpKTtcbiAgICAgIGlmIChyZXRyeUFmdGVyKSB7XG4gICAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKFxuICAgICAgICAgIGluZEZvcm1hdChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1JldHJ5QWZ0ZXJIaW50XCIsIFwiUmV0cnkgYWZ0ZXIgezB9LlwiLCByZXRyeUFmdGVyKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvblRleHQpIHtcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKHZhbGlkYXRpb25UZXh0KTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlTWVzc2FnZSkge1xuICAgICAgbWVzc2FnZVBhcnRzLnB1c2gocmVzcG9uc2VNZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKGZpbGVJZCkge1xuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goXG4gICAgICAgIGluZFQoXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9QYXJ0aWFsXCIsXG4gICAgICAgICAgXCJUaGUgdGlja2V0IHdhcyBjcmVhdGVkLCBidXQgdGhlIGZ1bGwgcHJvY2VzcyBkaWQgbm90IGZpbmlzaC5cIlxuICAgICAgICApXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuSHR0cFN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICBtZXNzYWdlUGFydHMucHVzaChpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm90Rm91bmRcIiwgXCJSZWNvcmQgbm90IGZvdW5kLlwiKSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA1MDApIHtcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TZXJ2ZXJcIiwgXCJTZXJ2ZXIgZXJyb3IuXCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICB9XG5cbiAgICBpZiAoZmlsZUlkICYmIGNvbXBsZXRlZFN0YWdlKSB7XG4gICAgICBtZXNzYWdlUGFydHMucHVzaChpbmRGb3JtYXQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TdGFnZVwiLCBcIkNvbXBsZXRlZCBzdGFnZTogezB9LlwiLCBjb21wbGV0ZWRTdGFnZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBtZXNzYWdlUGFydHMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY29tcGxldGVGbG93U3VjY2VzcyA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChmaWxlSWQ6IHN0cmluZywgbGlua2VkVG9TaGVldDogYm9vbGVhbiwgY2FjaGVLZXk6IHN0cmluZykgPT4ge1xuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJkb25lXCIpO1xuICAgICAgYXdhaXQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKGNhY2hlS2V5KTtcbiAgICAgIHNldEF0dGVtcHRJZChcIlwiKTtcbiAgICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICBvbkNvbXBsZXRlZD8uKHsgZmlsZUlkLCBsaW5rZWRUb1NoZWV0IH0pO1xuICAgIH0sXG4gICAgW29uQ29tcGxldGVkXVxuICApO1xuXG4gIGNvbnN0IHJ1blF1aWNrQ3JlYXRlRmxvdyA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChmaWxlOiBGaWxlLCBjYWNoZUtleTogc3RyaW5nLCBjb250ZXh0OiBRdWlja1RpY2tldEF0dGVtcHRDb250ZXh0KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBzZXRCdXN5KHRydWUpO1xuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJjcmVhdGluZ1RpY2tldFwiKTtcbiAgICAgIGNsZWFyRmxvd1N0YXRlKCk7XG5cbiAgICAgIGNvbnN0IHJlcXVlc3RTdGFydGVkQXQgPSBEYXRlLm5vdygpO1xuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwicXVpY2stY3JlYXRlLnJlcXVlc3Quc3RhcnRlZFwiLCB7XG4gICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXG4gICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXG4gICAgICAgIGxpbmtUb1NoZWV0LFxuICAgICAgICBjYWNoZUtleSxcbiAgICAgICAgZWxhcHNlZFNpbmNlU2VsZWN0aW9uTXM6IE1hdGgubWF4KDAsIHJlcXVlc3RTdGFydGVkQXQgLSBjb250ZXh0LnN0YXJ0ZWRBdCksXG4gICAgICAgIHVwbG9hZEZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXG4gICAgICAgIG9wdGltaXphdGlvbjogYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhKGNvbnRleHQub3B0aW1pemF0aW9uKSxcbiAgICAgICAgc2hlZXRJZDogbGlua1RvU2hlZXQgPyBzYWZlVGV4dChzaGVldElkKSA6IFwiXCIsXG4gICAgICAgIHByb2plY3RJZDogbGlua1RvU2hlZXQgPyBzYWZlVGV4dChwcm9qZWN0SWQpIDogXCJcIixcbiAgICAgIH0pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldFF1aWNrKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpY2tldEltYWdlOiBmaWxlLFxuICAgICAgICAgICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChjdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQoc2hlZXRJZCkgfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJvamVjdElkOiBsaW5rVG9TaGVldCA/IHNhZmVUZXh0KHByb2plY3RJZCkgfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYnVpbGRBcGlPcHRpb25zKClcbiAgICAgICAgKTtcblxuICAgICAgICBhZGRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhY2VzKHJlc3BvbnNlKTtcblxuICAgICAgICBjb25zdCByZXNwb25zZUVsYXBzZWRNcyA9IE1hdGgubWF4KDAsIERhdGUubm93KCkgLSByZXF1ZXN0U3RhcnRlZEF0KTtcblxuICAgICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5GaWxlSWQpO1xuICAgICAgICBjb25zdCBsaW5rZWRUb1NoZWV0ID0gcmVzcG9uc2UuRGF0YT8uTGlua2VkVG9TaGVldCA9PT0gdHJ1ZTtcbiAgICAgICAgY29uc3QgcGFydGlhbFN0YXRlID1cbiAgICAgICAgICBmaWxlSWRcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgICAgICBsaW5rZWRUb1NoZWV0LFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZFN0YWdlOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5Db21wbGV0ZWRTdGFnZSksXG4gICAgICAgICAgICAgICAgdXJsRmlsZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uVXJsRmlsZSksXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LkZpbGVOYW1lKSxcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRCeUFJOiByZXNwb25zZS5EYXRhPy5Qcm9jZXNzZWRCeUFJID8/IG51bGwsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogbnVsbDtcblxuICAgICAgICBpZiAocGFydGlhbFN0YXRlKSB7XG4gICAgICAgICAgbGF0ZXN0Q3JlYXRlZFRpY2tldFJlZi5jdXJyZW50ID0gcGFydGlhbFN0YXRlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICBpZiAoIWZpbGVJZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob0ZpbGVJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIHRpY2tldCBmaWxlIGlkLlwiKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXdhaXQgY29tcGxldGVGbG93U3VjY2VzcyhmaWxlSWQsIGxpbmtlZFRvU2hlZXQsIGNhY2hlS2V5KTtcbiAgICAgICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJxdWljay1jcmVhdGUucmVxdWVzdC5zdWNjZWVkZWRcIiwge1xuICAgICAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcbiAgICAgICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXG4gICAgICAgICAgICBlbGFwc2VkTXM6IHJlc3BvbnNlRWxhcHNlZE1zLFxuICAgICAgICAgICAgaHR0cFN0YXR1czogcmVzcG9uc2UuSHR0cFN0YXR1cyxcbiAgICAgICAgICAgIHRyYWNlSWQ6IHNhZmVUZXh0KHJlc3BvbnNlLlRyYWNlSWQpLFxuICAgICAgICAgICAgZmlsZUlkLFxuICAgICAgICAgICAgbGlua2VkVG9TaGVldCxcbiAgICAgICAgICAgIGNvbXBsZXRlZFN0YWdlOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5Db21wbGV0ZWRTdGFnZSksXG4gICAgICAgICAgICBwcm9jZXNzZWRCeUFJOiByZXNwb25zZS5EYXRhPy5Qcm9jZXNzZWRCeUFJID8/IG51bGwsXG4gICAgICAgICAgICBzdGVwVHJhY2VJZHM6IHJlc3BvbnNlLkRhdGE/LlN0ZXBUcmFjZUlkcyA/PyBudWxsLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0aWFsU3RhdGUpIHtcbiAgICAgICAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShwYXJ0aWFsU3RhdGUpO1xuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInF1aWNrLWNyZWF0ZS5wYXJ0aWFsLXN0YXRlXCIsIHtcbiAgICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXG4gICAgICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxuICAgICAgICAgICAgZWxhcHNlZE1zOiByZXNwb25zZUVsYXBzZWRNcyxcbiAgICAgICAgICAgIGZpbGVJZDogcGFydGlhbFN0YXRlLmZpbGVJZCxcbiAgICAgICAgICAgIGxpbmtlZFRvU2hlZXQ6IHBhcnRpYWxTdGF0ZS5saW5rZWRUb1NoZWV0LFxuICAgICAgICAgICAgY29tcGxldGVkU3RhZ2U6IHBhcnRpYWxTdGF0ZS5jb21wbGV0ZWRTdGFnZSxcbiAgICAgICAgICAgIHByb2Nlc3NlZEJ5QUk6IHBhcnRpYWxTdGF0ZS5wcm9jZXNzZWRCeUFJLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkTWVzc2FnZSA9IHJlc29sdmVRdWlja0NyZWF0ZUZhaWx1cmVNZXNzYWdlKHJlc3BvbnNlKTtcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwicXVpY2stY3JlYXRlLnJlcXVlc3QuY29tcGxldGVkLXdpdGgtZXJyb3JcIiwge1xuICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXG4gICAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcbiAgICAgICAgICBlbGFwc2VkTXM6IHJlc3BvbnNlRWxhcHNlZE1zLFxuICAgICAgICAgIGh0dHBTdGF0dXM6IHJlc3BvbnNlLkh0dHBTdGF0dXMsXG4gICAgICAgICAgdHJhY2VJZDogc2FmZVRleHQocmVzcG9uc2UuVHJhY2VJZCksXG4gICAgICAgICAgZmlsZUlkLFxuICAgICAgICAgIGxpbmtlZFRvU2hlZXQsXG4gICAgICAgICAgY29tcGxldGVkU3RhZ2U6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LkNvbXBsZXRlZFN0YWdlKSxcbiAgICAgICAgICBwcm9jZXNzZWRCeUFJOiByZXNwb25zZS5EYXRhPy5Qcm9jZXNzZWRCeUFJID8/IG51bGwsXG4gICAgICAgICAgcmV0cnlBZnRlcjogc2FmZVRleHQocmVzcG9uc2UuUmV0cnlBZnRlciksXG4gICAgICAgICAgbWVzc2FnZTogc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSksXG4gICAgICAgICAgcmVzb2x2ZWRNZXNzYWdlLFxuICAgICAgICAgIGVycm9yczogQXJyYXkuaXNBcnJheShyZXNwb25zZS5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogW10sXG4gICAgICAgICAgc3RlcFRyYWNlSWRzOiByZXNwb25zZS5EYXRhPy5TdGVwVHJhY2VJZHMgPz8gbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNvbHZlZE1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xuICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LXF1aWNrLWNyZWF0ZS1lcnJvclwiLCBleHRyYWN0VHJhY2VJZEZyb21FcnJvcihlcnJvcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nUXVpY2tUaWNrZXRFcnJvcihcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LmZhaWxlZFwiLCB7XG4gICAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcbiAgICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxuICAgICAgICAgIGVsYXBzZWRNczogTWF0aC5tYXgoMCwgRGF0ZS5ub3coKSAtIHJlcXVlc3RTdGFydGVkQXQpLFxuICAgICAgICAgIHVwbG9hZEZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXG4gICAgICAgICAgdHJhY2VJZDogZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yID8gZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IoZXJyb3IpIDogXCJcIixcbiAgICAgICAgICBzdGF0dXM6IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLnN0YXR1cyA6IG51bGwsXG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIDogXCJcIixcbiAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JzOiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgPyBlcnJvci52YWxpZGF0aW9uRXJyb3JzIDogW10sXG4gICAgICAgIH0pO1xuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XG4gICAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVVaUVycm9yTWVzc2FnZShlcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgYWRkUXVpY2tDcmVhdGVSZXNwb25zZVRyYWNlcyxcbiAgICAgIGFkZFRyYWNlLFxuICAgICAgYnVpbGRBcGlPcHRpb25zLFxuICAgICAgY2xlYXJGbG93U3RhdGUsXG4gICAgICBjb21wbGV0ZUZsb3dTdWNjZXNzLFxuICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgbGlua1RvU2hlZXQsXG4gICAgICBwcm9qZWN0SWQsXG4gICAgICByZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZSxcbiAgICAgIHJlc29sdmVVaUVycm9yTWVzc2FnZSxcbiAgICAgIHNoZWV0SWQsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdGVkRmlsZSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChmaWxlOiBGaWxlIHwgbnVsbCwgc291cmNlOiBUaWNrZXRJbWFnZVNvdXJjZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgaWYgKCFmaWxlKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGF0dGVtcHRJZCA9IHJlc29sdmVSYW5kb21LZXkoKTtcbiAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ZWRBdCA9IERhdGUubm93KCk7XG4gICAgICBzZXRBdHRlbXB0SWQoYXR0ZW1wdElkKTtcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcInNlbGVjdGlvbi5yZWNlaXZlZFwiLCB7XG4gICAgICAgIGF0dGVtcHRJZCxcbiAgICAgICAgc291cmNlLFxuICAgICAgICBsaW5rVG9TaGVldCxcbiAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbigpKSB7XG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5mb3JiaWRkZW5cIiwge1xuICAgICAgICAgIGF0dGVtcHRJZCxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgbGlua1RvU2hlZXQsXG4gICAgICAgICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICAgICAgICBpc0NyZWF0ZU1vZGUsXG4gICAgICAgICAgaXNTaGVldExvY2tlZCxcbiAgICAgICAgICBoYXNTaGVldElkOiAhIXNhZmVUZXh0KHNoZWV0SWQpLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzYWZlVHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChzYWZlVHlwZSAmJiAhc2FmZVR5cGUuc3RhcnRzV2l0aChcImltYWdlL1wiKSAmJiAhL1xcLihqcGU/Z3xwbmd8d2VicCkkL2kudGVzdChmaWxlLm5hbWUgfHwgXCJcIikpIHtcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwic2VsZWN0aW9uLmludmFsaWQtZmlsZS10eXBlXCIsIHtcbiAgICAgICAgICBhdHRlbXB0SWQsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXG4gICAgICAgICAgcmVhc29uOiBcIm1pbWUtYW5kLWV4dGVuc2lvbi1ub3Qtc3VwcG9ydGVkXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUoZmlsZSkpIHtcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwic2VsZWN0aW9uLmludmFsaWQtZmlsZS10eXBlXCIsIHtcbiAgICAgICAgICBhdHRlbXB0SWQsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXG4gICAgICAgICAgcmVhc29uOiBcInVuc3VwcG9ydGVkLXRpY2tldC1pbWFnZS1maWxlXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY2xlYXJGbG93U3RhdGUoKTtcbiAgICAgIHNldFByb2dyZXNzS2V5KFwidXBsb2FkaW5nSW1hZ2VcIik7XG4gICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJvcHRpbWl6YXRpb24uc3RhcnRlZFwiLCB7XG4gICAgICAgIGF0dGVtcHRJZCxcbiAgICAgICAgc291cmNlLFxuICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG9wdGltaXphdGlvblJlc3VsdCA9IGF3YWl0IG9wdGltaXplVGlja2V0SW1hZ2VGb3JVcGxvYWQoZmlsZSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcIm9wdGltaXphdGlvbi5mYWlsZWRcIiwge1xuICAgICAgICAgIGF0dGVtcHRJZCxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgOiBcIlwiLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tPcHRpbWl6YXRpb25SZXN1bHQoZmlsZSk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHVwbG9hZEZpbGUgPSBvcHRpbWl6YXRpb25SZXN1bHQuZmlsZTtcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcIm9wdGltaXphdGlvbi5jb21wbGV0ZWRcIiwge1xuICAgICAgICBhdHRlbXB0SWQsXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgLi4uYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhKG9wdGltaXphdGlvblJlc3VsdCksXG4gICAgICB9KTtcblxuICAgICAgaWYgKHVwbG9hZEZpbGUuc2l6ZSA+IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUykge1xuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJzZWxlY3Rpb24ucmVqZWN0ZWQtYnktc2l6ZVwiLCB7XG4gICAgICAgICAgYXR0ZW1wdElkLFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBtYXhTaXplQnl0ZXM6IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyxcbiAgICAgICAgICBtYXhTaXplVGV4dDogZm9ybWF0RmlsZVNpemUoTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTKSxcbiAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKHVwbG9hZEZpbGUpLFxuICAgICAgICAgIG9wdGltaXphdGlvbjogYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhKG9wdGltaXphdGlvblJlc3VsdCksXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlU2l6ZVwiLCBcIkltYWdlIGV4Y2VlZHMgNTBNQiBtYXggc2l6ZS5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNhY2hlS2V5ID0gYXR0ZW1wdElkO1xuICAgICAgbGF0ZXN0RmlsZVJlZi5jdXJyZW50ID0geyBjYWNoZUtleSwgZmlsZTogdXBsb2FkRmlsZSB9O1xuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwiY2FjaGUuc3RvcmUuc3RhcnRlZFwiLCB7XG4gICAgICAgIGF0dGVtcHRJZCxcbiAgICAgICAgc291cmNlLFxuICAgICAgICBjYWNoZUtleSxcbiAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YSh1cGxvYWRGaWxlKSxcbiAgICAgIH0pO1xuICAgICAgdm9pZCBjYWNoZUltYWdlRmlsZShjYWNoZUtleSwgdXBsb2FkRmlsZSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcImNhY2hlLnN0b3JlLmNvbXBsZXRlZFwiLCB7XG4gICAgICAgICAgICBhdHRlbXB0SWQsXG4gICAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgICBjYWNoZUtleSxcbiAgICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEodXBsb2FkRmlsZSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJjYWNoZS5zdG9yZS5mYWlsZWRcIiwge1xuICAgICAgICAgICAgYXR0ZW1wdElkLFxuICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgY2FjaGVLZXksXG4gICAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKHVwbG9hZEZpbGUpLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIDogXCJcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHJ1blF1aWNrQ3JlYXRlRmxvdyh1cGxvYWRGaWxlLCBjYWNoZUtleSwge1xuICAgICAgICBhdHRlbXB0SWQsXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgc3RhcnRlZEF0OiBzZWxlY3Rpb25TdGFydGVkQXQsXG4gICAgICAgIG9wdGltaXphdGlvbjogb3B0aW1pemF0aW9uUmVzdWx0LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbY2FuQ3JlYXRlRXhwZW5zZSwgY2xlYXJGbG93U3RhdGUsIGVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbiwgaXNDcmVhdGVNb2RlLCBpc1NoZWV0TG9ja2VkLCBsaW5rVG9TaGVldCwgcnVuUXVpY2tDcmVhdGVGbG93LCBzaGVldElkXVxuICApO1xuXG4gIGNvbnN0IHJldHJ5UGVuZGluZ1VwbG9hZCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICByZXR1cm47XG4gIH0sIFtdKTtcblxuICBjb25zdCBvcGVuQ3JlYXRlZFRpY2tldCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBjcmVhdGVkVGlja2V0ID0gcGFydGlhbFRpY2tldEZhaWx1cmUgfHwgbGF0ZXN0Q3JlYXRlZFRpY2tldFJlZi5jdXJyZW50O1xuICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGNyZWF0ZWRUaWNrZXQ/LmZpbGVJZCk7XG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcblxuICAgIGNsZWFyQ2FjaGVkQ3VycmVudEltYWdlKCk7XG4gICAgc2V0QXR0ZW1wdElkKFwiXCIpO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgICBvbkNvbXBsZXRlZD8uKHsgZmlsZUlkLCBsaW5rZWRUb1NoZWV0OiBjcmVhdGVkVGlja2V0Py5saW5rZWRUb1NoZWV0ID09PSB0cnVlIH0pO1xuICB9LCBbY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2UsIG9uQ29tcGxldGVkLCBwYXJ0aWFsVGlja2V0RmFpbHVyZV0pO1xuXG4gIGNvbnN0IG9wZW5Tb3VyY2VQaWNrZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24oKSkgcmV0dXJuO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKHRydWUpO1xuICB9LCBbZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uXSk7XG5cbiAgY29uc3QgY2xvc2VTb3VyY2VQaWNrZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybjtcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcbiAgfSwgW2J1c3ldKTtcblxuICBjb25zdCByZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbiA9IHVzZUNhbGxiYWNrKGFzeW5jICgpOiBQcm9taXNlPGJvb2xlYW4gfCBudWxsPiA9PiB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG1lZGlhRGV2aWNlcyA9IG5hdmlnYXRvci5tZWRpYURldmljZXM7XG4gICAgaWYgKCFtZWRpYURldmljZXMgfHwgdHlwZW9mIG1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RyZWFtID0gYXdhaXQgbWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7XG4gICAgICAgIHZpZGVvOiB7IGZhY2luZ01vZGU6IFwiZW52aXJvbm1lbnRcIiB9LFxuICAgICAgfSk7XG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCgodHJhY2spID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBzZWxlY3RGcm9tQ2FtZXJhID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IG51bGwpID0+IHtcbiAgICAgIGlmICghaW5wdXRFbGVtZW50KSByZXR1cm47XG4gICAgICBjb25zdCBncmFudGVkID0gYXdhaXQgcmVxdWVzdENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICAgIGlmIChncmFudGVkID09PSBmYWxzZSkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0NhbWVyYVBlcm1pc3Npb25cIiwgXCJDYW1lcmEgcGVybWlzc2lvbiBpcyByZXF1aXJlZC5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcbiAgICAgIGlucHV0RWxlbWVudC5jbGljaygpO1xuICAgIH0sXG4gICAgW3JlcXVlc3RDYW1lcmFQZXJtaXNzaW9uXVxuICApO1xuXG4gIGNvbnN0IHNlbGVjdEZyb21HYWxsZXJ5ID0gdXNlQ2FsbGJhY2soKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IG51bGwpID0+IHtcbiAgICBpZiAoIWlucHV0RWxlbWVudCkgcmV0dXJuO1xuICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xuICAgIGlucHV0RWxlbWVudC5jbGljaygpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJFcnJvciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjbGVhckNhY2hlZEN1cnJlbnRJbWFnZSgpO1xuICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgc2V0QXR0ZW1wdElkKFwiXCIpO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgfSwgW2NsZWFyQ2FjaGVkQ3VycmVudEltYWdlXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxuICAgIGJ1c3ksXG4gICAgcHJvZ3Jlc3NLZXksXG4gICAgcHJvZ3Jlc3NNZXNzYWdlLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBhdHRlbXB0SWQsXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5OiBmYWxzZSxcbiAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZTogcGFydGlhbFRpY2tldEZhaWx1cmUgIT09IG51bGwsXG4gICAgdHJhY2VMaXN0LFxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXG4gICAgY2xvc2VTb3VyY2VQaWNrZXIsXG4gICAgc2VsZWN0RnJvbUNhbWVyYSxcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxuICAgIG9wZW5DcmVhdGVkVGlja2V0LFxuICAgIGNsZWFyRXJyb3IsXG4gIH07XG59O1xuIiwgImltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XG5cbmNvbnN0IE1BWF9USUNLRVRfVVBMT0FEX0xPTkdfU0lERV9QWCA9IDIwNDg7XG5jb25zdCBNSU5fVElDS0VUX1VQTE9BRF9TSE9SVF9TSURFX1BYID0gNzY4O1xuY29uc3QgVElDS0VUX1JFRU5DT0RFX1FVQUxJVFkgPSAwLjg1O1xuY29uc3QgTUlOX1RJQ0tFVF9SRUVOQ09ERV9CWVRFUyA9IDQgKiAxMDI0ICogMTAyNDtcbmNvbnN0IE1JTl9USUNLRVRfUkVEVUNUSU9OX0JZVEVTID0gMjU2ICogMTAyNDtcbmNvbnN0IE1JTl9USUNLRVRfUkVEVUNUSU9OX1JBVElPID0gMC4xMjtcblxudHlwZSBMb2FkZWRJbWFnZSA9IHtcbiAgZWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGRpc3Bvc2U6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdCA9IHtcbiAgZmlsZTogRmlsZTtcbiAgY2hhbmdlZDogYm9vbGVhbjtcbiAgcmVhc29uOiBzdHJpbmc7XG4gIHJlc2l6ZWQ6IGJvb2xlYW47XG4gIHJlZW5jb2RlZDogYm9vbGVhbjtcbiAgZWxhcHNlZE1zOiBudW1iZXI7XG4gIG9yaWdpbmFsOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBzaXplOiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlciB8IG51bGw7XG4gICAgaGVpZ2h0OiBudW1iZXIgfCBudWxsO1xuICB9O1xuICBvdXRwdXQ6IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIHNpemU6IG51bWJlcjtcbiAgICB3aWR0aDogbnVtYmVyIHwgbnVsbDtcbiAgICBoZWlnaHQ6IG51bWJlciB8IG51bGw7XG4gIH07XG59O1xuXG5jb25zdCBub3JtYWxpemVNaW1lVHlwZSA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCJpbWFnZS9wanBlZ1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwiaW1hZ2UvanBnXCIpIHtcbiAgICByZXR1cm4gXCJpbWFnZS9qcGVnXCI7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XG59O1xuXG5jb25zdCByZXBsYWNlRmlsZUV4dGVuc2lvbiA9IChmaWxlTmFtZTogc3RyaW5nLCBleHRlbnNpb246IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGJhc2VOYW1lID0gc2FmZVRleHQoZmlsZU5hbWUpLnJlcGxhY2UoL1xcLlthLXowLTldKyQvaSwgXCJcIik7XG4gIGNvbnN0IHNhZmVCYXNlTmFtZSA9IGJhc2VOYW1lIHx8IFwidGlja2V0XCI7XG4gIGNvbnN0IHNhZmVFeHRlbnNpb24gPSBzYWZlVGV4dChleHRlbnNpb24pLnJlcGxhY2UoL15cXC4vLCBcIlwiKS50b0xvd2VyQ2FzZSgpIHx8IFwianBnXCI7XG4gIHJldHVybiBgJHtzYWZlQmFzZU5hbWV9LiR7c2FmZUV4dGVuc2lvbn1gO1xufTtcblxuLy8gTG9hZHMgb25lIGltYWdlIGVsZW1lbnQgc28gY2FudmFzIHJlc2l6aW5nIGtlZXBzIHRoZSBicm93c2VyLWRlY29kZWQgb3JpZW50YXRpb24uXG5jb25zdCBsb2FkSW1hZ2UgPSBhc3luYyAoZmlsZTogRmlsZSk6IFByb21pc2U8TG9hZGVkSW1hZ2UgfCBudWxsPiA9PiB7XG4gIGlmICh0eXBlb2YgSW1hZ2UgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIFVSTCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBvYmplY3RVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBpbWFnZS5kZWNvZGluZyA9IFwiYXN5bmNcIjtcblxuICB0cnkge1xuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoKTtcbiAgICAgIGltYWdlLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKFwiQ291bGQgbm90IGRlY29kZSBpbWFnZS5cIikpO1xuICAgICAgaW1hZ2Uuc3JjID0gb2JqZWN0VXJsO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgd2lkdGggPSBOdW1iZXIoaW1hZ2UubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoIHx8IDApO1xuICAgIGNvbnN0IGhlaWdodCA9IE51bWJlcihpbWFnZS5uYXR1cmFsSGVpZ2h0IHx8IGltYWdlLmhlaWdodCB8fCAwKTtcbiAgICBpZiAoISh3aWR0aCA+IDApIHx8ICEoaGVpZ2h0ID4gMCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBlbGVtZW50OiBpbWFnZSxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XG4gICAgICB9LFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqZWN0VXJsKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufTtcblxuY29uc3QgcmVzb2x2ZVJlc2l6ZURpbWVuc2lvbnMgPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyOyByZXNpemVkOiBib29sZWFuIH0gPT4ge1xuICBjb25zdCBsb25nU2lkZSA9IE1hdGgubWF4KHdpZHRoLCBoZWlnaHQpO1xuICBjb25zdCBzaG9ydFNpZGUgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KTtcbiAgaWYgKGxvbmdTaWRlIDw9IE1BWF9USUNLRVRfVVBMT0FEX0xPTkdfU0lERV9QWCkge1xuICAgIHJldHVybiB7IHdpZHRoLCBoZWlnaHQsIHJlc2l6ZWQ6IGZhbHNlIH07XG4gIH1cblxuICBjb25zdCBtYXhMb25nU2lkZVNjYWxlID0gTUFYX1RJQ0tFVF9VUExPQURfTE9OR19TSURFX1BYIC8gbG9uZ1NpZGU7XG4gIGNvbnN0IG1pblNob3J0U2lkZVNjYWxlID0gTUlOX1RJQ0tFVF9VUExPQURfU0hPUlRfU0lERV9QWCAvIHNob3J0U2lkZTtcbiAgY29uc3Qgc2NhbGUgPSBNYXRoLm1heChtYXhMb25nU2lkZVNjYWxlLCBtaW5TaG9ydFNpZGVTY2FsZSk7XG4gIGlmICghKHNjYWxlIDwgMSkpIHtcbiAgICByZXR1cm4geyB3aWR0aCwgaGVpZ2h0LCByZXNpemVkOiBmYWxzZSB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogTWF0aC5tYXgoMSwgTWF0aC5yb3VuZCh3aWR0aCAqIHNjYWxlKSksXG4gICAgaGVpZ2h0OiBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKGhlaWdodCAqIHNjYWxlKSksXG4gICAgcmVzaXplZDogdHJ1ZSxcbiAgfTtcbn07XG5cbmNvbnN0IGNyZWF0ZUNhbnZhcyA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCA9PiB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gIHJldHVybiBjYW52YXM7XG59O1xuXG5jb25zdCBjYW52YXNUb0Jsb2IgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgbWltZVR5cGU6IHN0cmluZywgcXVhbGl0eT86IG51bWJlcik6IFByb21pc2U8QmxvYiB8IG51bGw+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgY2FudmFzLnRvQmxvYigoYmxvYikgPT4gcmVzb2x2ZShibG9iKSwgbWltZVR5cGUsIHF1YWxpdHkpO1xuICB9KTtcbn07XG5cbmNvbnN0IGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0ID0gKHtcbiAgZmlsZSxcbiAgb3JpZ2luYWxGaWxlLFxuICByZWFzb24sXG4gIHJlc2l6ZWQsXG4gIHJlZW5jb2RlZCxcbiAgZWxhcHNlZE1zLFxuICBvcmlnaW5hbFdpZHRoLFxuICBvcmlnaW5hbEhlaWdodCxcbiAgb3V0cHV0V2lkdGgsXG4gIG91dHB1dEhlaWdodCxcbn06IHtcbiAgZmlsZTogRmlsZTtcbiAgb3JpZ2luYWxGaWxlOiBGaWxlO1xuICByZWFzb246IHN0cmluZztcbiAgcmVzaXplZDogYm9vbGVhbjtcbiAgcmVlbmNvZGVkOiBib29sZWFuO1xuICBlbGFwc2VkTXM6IG51bWJlcjtcbiAgb3JpZ2luYWxXaWR0aDogbnVtYmVyIHwgbnVsbDtcbiAgb3JpZ2luYWxIZWlnaHQ6IG51bWJlciB8IG51bGw7XG4gIG91dHB1dFdpZHRoOiBudW1iZXIgfCBudWxsO1xuICBvdXRwdXRIZWlnaHQ6IG51bWJlciB8IG51bGw7XG59KTogVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQgPT4ge1xuICByZXR1cm4ge1xuICAgIGZpbGUsXG4gICAgY2hhbmdlZDpcbiAgICAgIGZpbGUgIT09IG9yaWdpbmFsRmlsZSB8fFxuICAgICAgZmlsZS5zaXplICE9PSBvcmlnaW5hbEZpbGUuc2l6ZSB8fFxuICAgICAgc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpICE9PSBzYWZlVGV4dChvcmlnaW5hbEZpbGUudHlwZSkudG9Mb3dlckNhc2UoKSxcbiAgICByZWFzb24sXG4gICAgcmVzaXplZCxcbiAgICByZWVuY29kZWQsXG4gICAgZWxhcHNlZE1zLFxuICAgIG9yaWdpbmFsOiB7XG4gICAgICBuYW1lOiBvcmlnaW5hbEZpbGUubmFtZSxcbiAgICAgIHR5cGU6IG9yaWdpbmFsRmlsZS50eXBlLFxuICAgICAgc2l6ZTogb3JpZ2luYWxGaWxlLnNpemUsXG4gICAgICB3aWR0aDogb3JpZ2luYWxXaWR0aCxcbiAgICAgIGhlaWdodDogb3JpZ2luYWxIZWlnaHQsXG4gICAgfSxcbiAgICBvdXRwdXQ6IHtcbiAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgIHR5cGU6IGZpbGUudHlwZSxcbiAgICAgIHNpemU6IGZpbGUuc2l6ZSxcbiAgICAgIHdpZHRoOiBvdXRwdXRXaWR0aCxcbiAgICAgIGhlaWdodDogb3V0cHV0SGVpZ2h0LFxuICAgIH0sXG4gIH07XG59O1xuXG4vLyBSZXR1cm5zIHRoZSB1cGxvYWQgZmlsZSB0byB1c2UuIEl0IGtlZXBzIHRoZSBvcmlnaW5hbCB3aGVuIHJlZHVjdGlvbiB3b3VsZCBiZSByaXNreSBvciBpcnJlbGV2YW50LlxuZXhwb3J0IGNvbnN0IG9wdGltaXplVGlja2V0SW1hZ2VGb3JVcGxvYWQgPSBhc3luYyAoZmlsZTogRmlsZSk6IFByb21pc2U8VGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQ+ID0+IHtcbiAgY29uc3Qgc3RhcnRlZEF0ID0gRGF0ZS5ub3coKTtcbiAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIEZpbGUpKSB7XG4gICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcbiAgICAgIGZpbGUsXG4gICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXG4gICAgICByZWFzb246IFwiaW52YWxpZC1pbnB1dFwiLFxuICAgICAgcmVzaXplZDogZmFsc2UsXG4gICAgICByZWVuY29kZWQ6IGZhbHNlLFxuICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxuICAgICAgb3JpZ2luYWxXaWR0aDogbnVsbCxcbiAgICAgIG9yaWdpbmFsSGVpZ2h0OiBudWxsLFxuICAgICAgb3V0cHV0V2lkdGg6IG51bGwsXG4gICAgICBvdXRwdXRIZWlnaHQ6IG51bGwsXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBub3JtYWxpemVkTWltZVR5cGUgPSBub3JtYWxpemVNaW1lVHlwZShmaWxlLnR5cGUpO1xuICBjb25zdCBsb2FkZWRJbWFnZSA9IGF3YWl0IGxvYWRJbWFnZShmaWxlKTtcbiAgaWYgKCFsb2FkZWRJbWFnZSkge1xuICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XG4gICAgICBmaWxlLFxuICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxuICAgICAgcmVhc29uOiBcImRlY29kZS11bmF2YWlsYWJsZVwiLFxuICAgICAgcmVzaXplZDogZmFsc2UsXG4gICAgICByZWVuY29kZWQ6IGZhbHNlLFxuICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxuICAgICAgb3JpZ2luYWxXaWR0aDogbnVsbCxcbiAgICAgIG9yaWdpbmFsSGVpZ2h0OiBudWxsLFxuICAgICAgb3V0cHV0V2lkdGg6IG51bGwsXG4gICAgICBvdXRwdXRIZWlnaHQ6IG51bGwsXG4gICAgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgZWxlbWVudCB9ID0gbG9hZGVkSW1hZ2U7XG4gICAgY29uc3Qgc2hvcnRTaWRlID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCk7XG4gICAgY29uc3QgcmVzaXplUGxhbiA9IHJlc29sdmVSZXNpemVEaW1lbnNpb25zKHdpZHRoLCBoZWlnaHQpO1xuICAgIGNvbnN0IGNhblJlZW5jb2RlU2FmZWx5ID0gc2hvcnRTaWRlID49IE1JTl9USUNLRVRfVVBMT0FEX1NIT1JUX1NJREVfUFg7XG4gICAgY29uc3QgaXNMYXJnZU9yaWdpbmFsID0gZmlsZS5zaXplID49IE1JTl9USUNLRVRfUkVFTkNPREVfQllURVM7XG4gICAgY29uc3Qgc2hvdWxkUmVzaXplID0gcmVzaXplUGxhbi5yZXNpemVkO1xuXG4gICAgaWYgKCFzaG91bGRSZXNpemUgJiYgKCFjYW5SZWVuY29kZVNhZmVseSB8fCAhaXNMYXJnZU9yaWdpbmFsKSkge1xuICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcbiAgICAgICAgZmlsZSxcbiAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxuICAgICAgICByZWFzb246ICFjYW5SZWVuY29kZVNhZmVseSA/IFwia2VwdC1zbWFsbC1zaG9ydC1zaWRlXCIgOiBcImtlcHQtc21hbGwtZmlsZVwiLFxuICAgICAgICByZXNpemVkOiBmYWxzZSxcbiAgICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcbiAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxuICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcbiAgICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgb3V0cHV0V2lkdGg6IHdpZHRoLFxuICAgICAgICBvdXRwdXRIZWlnaHQ6IGhlaWdodCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChub3JtYWxpemVkTWltZVR5cGUgPT09IFwiaW1hZ2UvcG5nXCIgJiYgIXNob3VsZFJlc2l6ZSkge1xuICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcbiAgICAgICAgZmlsZSxcbiAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxuICAgICAgICByZWFzb246IFwia2VwdC1wbmctd2l0aG91dC1yZXNpemVcIixcbiAgICAgICAgcmVzaXplZDogZmFsc2UsXG4gICAgICAgIHJlZW5jb2RlZDogZmFsc2UsXG4gICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcbiAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIG91dHB1dFdpZHRoOiB3aWR0aCxcbiAgICAgICAgb3V0cHV0SGVpZ2h0OiBoZWlnaHQsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMocmVzaXplUGxhbi53aWR0aCwgcmVzaXplUGxhbi5oZWlnaHQpO1xuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXM/LmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBpZiAoIWNhbnZhcyB8fCAhY29udGV4dCkge1xuICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcbiAgICAgICAgZmlsZSxcbiAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxuICAgICAgICByZWFzb246IFwiY2FudmFzLXVuYXZhaWxhYmxlXCIsXG4gICAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxuICAgICAgICByZWVuY29kZWQ6IGZhbHNlLFxuICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXG4gICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxuICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxuICAgICAgICBvdXRwdXRXaWR0aDogd2lkdGgsXG4gICAgICAgIG91dHB1dEhlaWdodDogaGVpZ2h0LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xuICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdRdWFsaXR5ID0gXCJoaWdoXCI7XG4gICAgY29udGV4dC5kcmF3SW1hZ2UoZWxlbWVudCwgMCwgMCwgcmVzaXplUGxhbi53aWR0aCwgcmVzaXplUGxhbi5oZWlnaHQpO1xuXG4gICAgY29uc3Qgb3V0cHV0TWltZVR5cGUgPVxuICAgICAgbm9ybWFsaXplZE1pbWVUeXBlID09PSBcImltYWdlL3dlYnBcIlxuICAgICAgICA/IFwiaW1hZ2Uvd2VicFwiXG4gICAgICAgIDogbm9ybWFsaXplZE1pbWVUeXBlID09PSBcImltYWdlL3BuZ1wiICYmIHNob3VsZFJlc2l6ZVxuICAgICAgICAgID8gXCJpbWFnZS9qcGVnXCJcbiAgICAgICAgICA6IFwiaW1hZ2UvanBlZ1wiO1xuICAgIGNvbnN0IG91dHB1dEV4dGVuc2lvbiA9XG4gICAgICBvdXRwdXRNaW1lVHlwZSA9PT0gXCJpbWFnZS93ZWJwXCJcbiAgICAgICAgPyBcIndlYnBcIlxuICAgICAgICA6IG91dHB1dE1pbWVUeXBlID09PSBcImltYWdlL3BuZ1wiXG4gICAgICAgICAgPyBcInBuZ1wiXG4gICAgICAgICAgOiBcImpwZ1wiO1xuICAgIGNvbnN0IHF1YWxpdHkgPSBvdXRwdXRNaW1lVHlwZSA9PT0gXCJpbWFnZS9wbmdcIiA/IHVuZGVmaW5lZCA6IFRJQ0tFVF9SRUVOQ09ERV9RVUFMSVRZO1xuICAgIGNvbnN0IG9wdGltaXplZEJsb2IgPSBhd2FpdCBjYW52YXNUb0Jsb2IoY2FudmFzLCBvdXRwdXRNaW1lVHlwZSwgcXVhbGl0eSk7XG4gICAgaWYgKCFvcHRpbWl6ZWRCbG9iIHx8IG9wdGltaXplZEJsb2Iuc2l6ZSA8PSAwIHx8IG9wdGltaXplZEJsb2Iuc2l6ZSA+PSBmaWxlLnNpemUpIHtcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XG4gICAgICAgIGZpbGUsXG4gICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcbiAgICAgICAgcmVhc29uOiBcIm9wdGltaXplZC1ub3Qtc21hbGxlclwiLFxuICAgICAgICByZXNpemVkOiBzaG91bGRSZXNpemUsXG4gICAgICAgIHJlZW5jb2RlZDogbm9ybWFsaXplZE1pbWVUeXBlICE9PSBvdXRwdXRNaW1lVHlwZSB8fCBpc0xhcmdlT3JpZ2luYWwsXG4gICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcbiAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIG91dHB1dFdpZHRoOiBzaG91bGRSZXNpemUgPyByZXNpemVQbGFuLndpZHRoIDogd2lkdGgsXG4gICAgICAgIG91dHB1dEhlaWdodDogc2hvdWxkUmVzaXplID8gcmVzaXplUGxhbi5oZWlnaHQgOiBoZWlnaHQsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXNob3VsZFJlc2l6ZSkge1xuICAgICAgY29uc3Qgc2F2ZWRCeXRlcyA9IGZpbGUuc2l6ZSAtIG9wdGltaXplZEJsb2Iuc2l6ZTtcbiAgICAgIGNvbnN0IHNhdmVkUmF0aW8gPSBzYXZlZEJ5dGVzIC8gTWF0aC5tYXgoZmlsZS5zaXplLCAxKTtcbiAgICAgIGlmIChzYXZlZEJ5dGVzIDwgTUlOX1RJQ0tFVF9SRURVQ1RJT05fQllURVMgfHwgc2F2ZWRSYXRpbyA8IE1JTl9USUNLRVRfUkVEVUNUSU9OX1JBVElPKSB7XG4gICAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XG4gICAgICAgICAgZmlsZSxcbiAgICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXG4gICAgICAgICAgcmVhc29uOiBcInJlZHVjdGlvbi10b28tc21hbGxcIixcbiAgICAgICAgICByZXNpemVkOiBmYWxzZSxcbiAgICAgICAgICByZWVuY29kZWQ6IHRydWUsXG4gICAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxuICAgICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxuICAgICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgICAgb3V0cHV0V2lkdGg6IHdpZHRoLFxuICAgICAgICAgIG91dHB1dEhlaWdodDogaGVpZ2h0LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvcHRpbWl6ZWRGaWxlID0gbmV3IEZpbGUoW29wdGltaXplZEJsb2JdLCByZXBsYWNlRmlsZUV4dGVuc2lvbihmaWxlLm5hbWUsIG91dHB1dEV4dGVuc2lvbiksIHtcbiAgICAgIHR5cGU6IG91dHB1dE1pbWVUeXBlLFxuICAgICAgbGFzdE1vZGlmaWVkOiBmaWxlLmxhc3RNb2RpZmllZCB8fCBEYXRlLm5vdygpLFxuICAgIH0pO1xuICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XG4gICAgICBmaWxlOiBvcHRpbWl6ZWRGaWxlLFxuICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxuICAgICAgcmVhc29uOiBcIm9wdGltaXplZFwiLFxuICAgICAgcmVzaXplZDogc2hvdWxkUmVzaXplLFxuICAgICAgcmVlbmNvZGVkOiBub3JtYWxpemVkTWltZVR5cGUgIT09IG91dHB1dE1pbWVUeXBlIHx8IGlzTGFyZ2VPcmlnaW5hbCxcbiAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcbiAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxuICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcbiAgICAgIG91dHB1dFdpZHRoOiByZXNpemVQbGFuLndpZHRoLFxuICAgICAgb3V0cHV0SGVpZ2h0OiByZXNpemVQbGFuLmhlaWdodCxcbiAgICB9KTtcbiAgfSBmaW5hbGx5IHtcbiAgICBsb2FkZWRJbWFnZS5kaXNwb3NlKCk7XG4gIH1cbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBOEQ7QUFDOUQsdUJBQTZCOzs7QUNEN0IsbUJBQTZGO0FBUXRGLElBQU0saUNBQWlDLE1BQTRDO0FBQ3hGLFFBQU0saUJBQWEscUJBQThCLElBQUk7QUFDckQsUUFBTSx3QkFBb0IscUJBQXNCLElBQUk7QUFDcEQsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSSx1QkFBUyxDQUFDO0FBRXRELFFBQU0sb0JBQWdCLDZCQUFlLE1BQU07QUFDekMsVUFBTSxVQUFVLFdBQVc7QUFDM0IsUUFBSSxDQUFDLFFBQVM7QUFFZCxVQUFNLGFBQWEsS0FBSyxLQUFLLFFBQVEsc0JBQXNCLEVBQUUsTUFBTTtBQUNuRSxzQkFBa0IsQ0FBQyxhQUFjLEtBQUssSUFBSSxXQUFXLFVBQVUsSUFBSSxJQUFJLFdBQVcsVUFBVztBQUFBLEVBQy9GLENBQUM7QUFFRCxRQUFNLHNCQUFrQiw2QkFBZSxNQUFNO0FBQzNDLFFBQUksT0FBTyxXQUFXLFlBQWE7QUFFbkMsUUFBSSxrQkFBa0IsWUFBWSxNQUFNO0FBQ3RDLGFBQU8scUJBQXFCLGtCQUFrQixPQUFPO0FBQUEsSUFDdkQ7QUFFQSxzQkFBa0IsVUFBVSxPQUFPLHNCQUFzQixNQUFNO0FBQzdELHdCQUFrQixVQUFVO0FBQzVCLG9CQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELG9DQUFnQixNQUFNO0FBQ3BCLGtCQUFjO0FBRWQsUUFBSSxPQUFPLG1CQUFtQixZQUFhO0FBQzNDLFVBQU0sVUFBVSxXQUFXO0FBQzNCLFFBQUksQ0FBQyxRQUFTO0FBRWQsVUFBTSxXQUFXLElBQUksZUFBZSxNQUFNO0FBQ3hDLHNCQUFnQjtBQUFBLElBQ2xCLENBQUM7QUFFRCxh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QUFZLE1BQU07QUFDMUMsUUFBSSxLQUFNO0FBQ1Ysd0JBQW9CLEtBQUs7QUFBQSxFQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDO0FBRVQsUUFBTSw4QkFBMEIsMkJBQVksWUFBcUM7QUFDL0UsUUFBSSxPQUFPLGNBQWMsWUFBYSxRQUFPO0FBQzdDLFVBQU0sZUFBZSxVQUFVO0FBQy9CLFFBQUksQ0FBQyxnQkFBZ0IsT0FBTyxhQUFhLGlCQUFpQixXQUFZLFFBQU87QUFFN0UsUUFBSTtBQUNGLFlBQU0sU0FBUyxNQUFNLGFBQWEsYUFBYTtBQUFBLFFBQzdDLE9BQU8sRUFBRSxZQUFZLGNBQWM7QUFBQSxNQUNyQyxDQUFDO0FBQ0QsYUFBTyxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsTUFBTSxLQUFLLENBQUM7QUFDbEQsYUFBTztBQUFBLElBQ1QsUUFBUTtBQUNOLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsT0FBTyxpQkFBMEM7QUFDL0MsVUFBSSxDQUFDLGFBQWM7QUFDbkIsWUFBTSxVQUFVLE1BQU0sd0JBQXdCO0FBQzlDLFVBQUksWUFBWSxPQUFPO0FBQ3JCLHdCQUFnQixLQUFLLGtEQUFrRCxnQ0FBZ0MsQ0FBQztBQUN4RztBQUFBLE1BQ0Y7QUFDQSwwQkFBb0IsS0FBSztBQUN6QixtQkFBYSxNQUFNO0FBQUEsSUFDckI7QUFBQSxJQUNBLENBQUMsdUJBQXVCO0FBQUEsRUFDMUI7QUFFQSxRQUFNLHdCQUFvQiwyQkFBWSxDQUFDLGlCQUEwQztBQUMvRSxRQUFJLENBQUMsYUFBYztBQUNuQix3QkFBb0IsS0FBSztBQUN6QixpQkFBYSxNQUFNO0FBQUEsRUFDckIsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGlCQUFhLDJCQUFZLE1BQU07QUFDbkMsNEJBQXdCO0FBQ3hCLDJCQUF1QixVQUFVO0FBQ2pDLGlCQUFhLEVBQUU7QUFDZixvQkFBZ0IsRUFBRTtBQUNsQiw0QkFBd0IsSUFBSTtBQUFBLEVBQzlCLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztBQUU1QixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxJQUN2Qix5QkFBeUIseUJBQXlCO0FBQUEsSUFDbEQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJhdHRlbXB0SWQiXQp9Cg==
