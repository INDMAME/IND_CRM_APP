import {
  usePageBottomActionsVisibility
} from "./chunk-M3X3ULOE.js";
import {
  flashActionMark
} from "./chunk-CBDB7NMA.js";
import {
  createExpenseSheetTicketQuick,
  safeText
} from "./chunk-63PNSQ5Z.js";
import {
  Spinner_default,
  classNames
} from "./chunk-UNQYUM6B.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indFormat,
  indT
} from "./chunk-PNIKV5DC.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/commons/PageBottomActions.tsx
var import_react = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var MAX_PAGE_BOTTOM_ACTIONS = 4;
var PAGE_BOTTOM_ACTIONS_TOP_PADDING_PX = 12;
var PAGE_BOTTOM_ACTIONS_SIDE_PADDING_PX = 8;
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
        "inline-block w-full rounded-[var(--radius-xl)] disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "col-span-2" : "",
        className || ""
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex min-h-[68px] w-full items-center justify-center rounded-[var(--radius-xl)] border border-[#001f4d]/80 bg-primary px-4 py-3.5 text-center text-[18px] font-bold leading-[1.1] text-white shadow-xs transition-colors duration-150 hover:bg-[#001f4d] sm:min-h-[72px] sm:px-5 sm:py-4 sm:text-[20px]", children: label })
    }
  );
};
PageBottomActionButton.displayName = "PageBottomActionButton";
var PageBottomActions = ({ children, ariaLabel, className }) => {
  const actionButtons = import_react.Children.toArray(children).filter(
    (child) => (0, import_react.isValidElement)(child) && child.type === PageBottomActionButton
  ).slice(0, MAX_PAGE_BOTTOM_ACTIONS);
  const actionCount = actionButtons.length;
  const { reservedHeight, wrapperRef, contentInsets } = usePageBottomActionsVisibility();
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
          className: "w-full",
          style: {
            paddingTop: `${PAGE_BOTTOM_ACTIONS_TOP_PADDING_PX}px`,
            paddingLeft: `${contentInsets?.left ?? PAGE_BOTTOM_ACTIONS_SIDE_PADDING_PX}px`,
            paddingRight: `${contentInsets?.right ?? PAGE_BOTTOM_ACTIONS_SIDE_PADDING_PX}px`,
            paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))"
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              role: "toolbar",
              "aria-label": ariaLabel,
              className: classNames("pointer-events-auto w-full", className || ""),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid grid-cols-2 gap-1.5", children: actionButtons.map((child, index) => {
                const shouldUseFullWidth = actionCount === 1 || actionCount % 2 === 1 && index === actionCount - 1;
                return (0, import_react.cloneElement)(child, {
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

// Web/wwwroot/react/src/pages/gastos/components/ExpenseQuickTicketProgressOverlay.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var GLOBAL_RADIUS = "var(--radius-xl, 5px)";
var EMPTY_PROGRESS_STAGES = [];
var formatElapsedLabel = (elapsedMs) => {
  const safeElapsedMs = Number.isFinite(elapsedMs) && elapsedMs > 0 ? elapsedMs : 0;
  const totalSeconds = Math.floor(safeElapsedMs / 1e3);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};
var resolveStageBadge = (stage) => {
  if (stage.state === "completed") {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { viewBox: "0 0 20 20", fill: "none", className: "h-4 w-4", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M5 10.5 8.5 14 15 6.5", strokeLinecap: "round", strokeLinejoin: "round" }) }) });
  }
  if (stage.state === "active") {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner_default, { size: "h-4 w-4", label: indT("Common_Loading", "Loading") }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "span",
    {
      className: "flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400",
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-slate-200" })
    }
  );
};
var ExpenseQuickTicketProgressOverlay = ({
  open,
  title,
  summary,
  elapsedMs = 0,
  stages = EMPTY_PROGRESS_STAGES
}) => {
  if (!open) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/40 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      className: "glass-panel shadow-card w-full max-w-lg rounded-[var(--radius-xl)] border border-slate-200 bg-white/95 p-5",
      style: { borderRadius: GLOBAL_RADIUS },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex h-12 w-12 items-center justify-center rounded-[var(--radius-xl)] bg-sky-50 text-sky-700", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner_default, { size: "h-6 w-6", label: indT("Common_Loading", "Loading") }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-[15px] font-semibold text-slate-900", children: title || indT("ExpenseSheets_NewTicket_Progress_Title", "Processing ticket") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mt-1 text-sm text-slate-600", children: summary || indT("ExpenseSheets_NewTicket_Status_CreatingTicket", "Creating ticket...") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-3 flex items-center justify-between gap-3 rounded-[var(--radius-xl)] border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: indT("ExpenseSheets_NewTicket_Progress_Elapsed", "Elapsed time") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-mono text-[12px] text-slate-700", children: formatElapsedLabel(elapsedMs) })
            ] })
          ] })
        ] }),
        stages.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-5 space-y-3", children: stages.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: stage.state === "active" ? "rounded-[var(--radius-xl)] border border-sky-200 bg-sky-50/80 px-3 py-3" : stage.state === "completed" ? "rounded-[var(--radius-xl)] border border-emerald-200 bg-emerald-50/70 px-3 py-3" : "rounded-[var(--radius-xl)] border border-slate-200 bg-white px-3 py-3",
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-start gap-3", children: [
              resolveStageBadge(stage),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "p",
                  {
                    className: stage.state === "pending" ? "text-sm font-medium text-slate-600" : "text-sm font-semibold text-slate-900",
                    children: stage.title
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mt-1 text-xs leading-5 text-slate-500", children: stage.description })
              ] })
            ] })
          },
          stage.key
        )) }) : null
      ]
    }
  ) });
};
var ExpenseQuickTicketProgressOverlay_default = ExpenseQuickTicketProgressOverlay;

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
var import_react2 = __toESM(require_react());

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
    const outputMimeType = normalizedMimeType === "image/webp" ? "image/webp" : "image/jpeg";
    const outputExtension = outputMimeType === "image/webp" ? "webp" : "jpg";
    const quality = TICKET_REENCODE_QUALITY;
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
var QUICK_TICKET_VISUAL_STAGE_MS = {
  syncingFile: 1200,
  finalizingIa: 3600,
  linkingExpenseLine: 8500
};
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
  const [sourcePickerOpen, setSourcePickerOpen] = (0, import_react2.useState)(false);
  const [busy, setBusy] = (0, import_react2.useState)(false);
  const [progressKey, setProgressKey] = (0, import_react2.useState)(null);
  const [displayProgressKey, setDisplayProgressKey] = (0, import_react2.useState)(null);
  const [progressElapsedMs, setProgressElapsedMs] = (0, import_react2.useState)(0);
  const [errorMessage, setErrorMessage] = (0, import_react2.useState)("");
  const [attemptId, setAttemptId] = (0, import_react2.useState)("");
  const [traceList, setTraceList] = (0, import_react2.useState)([]);
  const [partialTicketFailure, setPartialTicketFailure] = (0, import_react2.useState)(null);
  const latestFileRef = (0, import_react2.useRef)(null);
  const progressStartedAtRef = (0, import_react2.useRef)(null);
  const progressMessage = (0, import_react2.useMemo)(() => {
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
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
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
    const timers = [
      window.setTimeout(() => {
        setDisplayProgressKey("syncingFile");
      }, QUICK_TICKET_VISUAL_STAGE_MS.syncingFile),
      window.setTimeout(() => {
        setDisplayProgressKey("finalizingIa");
      }, QUICK_TICKET_VISUAL_STAGE_MS.finalizingIa)
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
  const progressStages = (0, import_react2.useMemo)(() => {
    const visibleStages = linkToSheet ? ["uploadingImage", "creatingTicket", "syncingFile", "finalizingIa", "linkingExpenseLine"] : ["uploadingImage", "creatingTicket", "syncingFile", "finalizingIa"];
    const stageCopy = {
      uploadingImage: {
        title: indT("ExpenseSheets_NewTicket_Progress_Prepare_Title", "Preparing image"),
        description: indT(
          "ExpenseSheets_NewTicket_Progress_Prepare_Body",
          "We validate the image and prepare it for a reliable upload."
        )
      },
      creatingTicket: {
        title: indT("ExpenseSheets_NewTicket_Progress_Create_Title", "Creating ticket"),
        description: indT(
          "ExpenseSheets_NewTicket_Progress_Create_Body",
          "The backend reserves the ticket and starts the server-side flow."
        )
      },
      syncingFile: {
        title: indT("ExpenseSheets_NewTicket_Progress_File_Title", "Syncing file"),
        description: indT(
          "ExpenseSheets_NewTicket_Progress_File_Body",
          "The uploaded image is being attached to the ticket record."
        )
      },
      finalizingIa: {
        title: indT("ExpenseSheets_NewTicket_Progress_Ia_Title", "Reading ticket data"),
        description: indT(
          "ExpenseSheets_NewTicket_Progress_Ia_Body",
          "We are extracting date, amount and description from the image."
        )
      },
      linkingExpenseLine: {
        title: indT("ExpenseSheets_NewTicket_Progress_Link_Title", "Linking expense line"),
        description: indT(
          "ExpenseSheets_NewTicket_Progress_Link_Body",
          "The generated ticket is being connected to the current expense sheet."
        )
      },
      done: {
        title: indT("ExpenseSheets_NewTicket_Status_Done", "Done"),
        description: indT("ExpenseSheets_NewTicket_Status_Done", "Done")
      }
    };
    const activeStageKey = progressKey === "done" ? visibleStages[visibleStages.length - 1] : displayProgressKey || progressKey;
    const activeStageIndex = activeStageKey ? visibleStages.indexOf(activeStageKey) : -1;
    return visibleStages.map((stageKey, index) => ({
      key: stageKey,
      title: stageCopy[stageKey].title,
      description: stageCopy[stageKey].description,
      state: progressKey === "done" || activeStageIndex >= 0 && index < activeStageIndex ? "completed" : index === activeStageIndex ? "active" : "pending"
    }));
  }, [displayProgressKey, linkToSheet, progressKey]);
  const addTrace = (0, import_react2.useCallback)((step, traceId) => {
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
  const clearCachedCurrentImage = (0, import_react2.useCallback)(() => {
    const cacheKey = latestFileRef.current?.cacheKey;
    if (!cacheKey) return;
    void removeCachedImageFile(cacheKey).catch(() => {
    });
  }, []);
  const clearFlowState = (0, import_react2.useCallback)(() => {
    setErrorMessage("");
    setPartialTicketFailure(null);
    setTraceList([]);
    persistTraceList([]);
  }, []);
  const buildApiOptions = (0, import_react2.useCallback)(() => {
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
  const ensureQuickCreatePermission = (0, import_react2.useCallback)(() => {
    if (!canCreateExpense || isCreateMode || isSheetLocked || linkToSheet && !sheetId) {
      onForbidden();
      return false;
    }
    return true;
  }, [canCreateExpense, isCreateMode, isSheetLocked, linkToSheet, onForbidden, sheetId]);
  const resolveUiErrorMessage = (0, import_react2.useCallback)((error) => {
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
  const addQuickCreateResponseTraces = (0, import_react2.useCallback)(
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
  const resolveQuickCreateFailureMessage = (0, import_react2.useCallback)((response) => {
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
  const completeFlowSuccess = (0, import_react2.useCallback)(
    async (fileId, linkedToSheet, cacheKey) => {
      setProgressKey("done");
      setDisplayProgressKey("done");
      await removeCachedImageFile(cacheKey);
      setAttemptId("");
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
  const runQuickCreateFlow = (0, import_react2.useCallback)(
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
            projId: linkToSheet ? safeText(projectId) || void 0 : void 0
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
      sheetId
    ]
  );
  const handleSelectedFile = (0, import_react2.useCallback)(
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
      setDisplayProgressKey("uploadingImage");
      progressStartedAtRef.current = selectionStartedAt;
      setProgressElapsedMs(0);
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
        setDisplayProgressKey(null);
        progressStartedAtRef.current = null;
        setProgressElapsedMs(0);
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
  const retryPendingUpload = (0, import_react2.useCallback)(async () => {
    return;
  }, []);
  const openSourcePicker = (0, import_react2.useCallback)(() => {
    if (!ensureQuickCreatePermission()) return;
    setErrorMessage("");
    setPartialTicketFailure(null);
    setSourcePickerOpen(true);
  }, [ensureQuickCreatePermission]);
  const closeSourcePicker = (0, import_react2.useCallback)(() => {
    if (busy) return;
    setSourcePickerOpen(false);
  }, [busy]);
  const selectFromCamera = (0, import_react2.useCallback)((inputElement) => {
    if (!inputElement) return;
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);
  const selectFromGallery = (0, import_react2.useCallback)((inputElement) => {
    if (!inputElement) return;
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);
  const clearError = (0, import_react2.useCallback)(() => {
    clearCachedCurrentImage();
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
    clearError
  };
};

export {
  PageBottomActionButton,
  PageBottomActions_default,
  ExpenseQuickTicketProgressOverlay_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheS50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9kZXRhaWwvdGlja2V0SW1hZ2VPcHRpbWl6YXRpb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyBDaGlsZHJlbiwgY2xvbmVFbGVtZW50LCBpc1ZhbGlkRWxlbWVudCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcblxyXG5jb25zdCBNQVhfUEFHRV9CT1RUT01fQUNUSU9OUyA9IDQ7XHJcbmNvbnN0IFBBR0VfQk9UVE9NX0FDVElPTlNfVE9QX1BBRERJTkdfUFggPSAxMjtcclxuY29uc3QgUEFHRV9CT1RUT01fQUNUSU9OU19TSURFX1BBRERJTkdfUFggPSA4O1xyXG5cclxudHlwZSBQYWdlQm90dG9tQWN0aW9uQnV0dG9uUHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgb25DbGljaz86IFJlYWN0Lk1vdXNlRXZlbnRIYW5kbGVyPEhUTUxCdXR0b25FbGVtZW50PjtcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xyXG4gIHR5cGU/OiBcImJ1dHRvblwiIHwgXCJzdWJtaXRcIiB8IFwicmVzZXRcIjtcclxuICB0YWJJbmRleD86IG51bWJlcjtcclxuICBmdWxsV2lkdGg/OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBQYWdlQm90dG9tQWN0aW9uc1Byb3BzID0ge1xyXG4gIGNoaWxkcmVuOiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gRHVtYiBidXR0b24gdXNlZCBieSB0aGUgc2hhcmVkIGJvdHRvbSBhY3Rpb24gYmFyLlxyXG5leHBvcnQgY29uc3QgUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbiA9ICh7XHJcbiAgbGFiZWwsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBvbkNsaWNrLFxyXG4gIGNsYXNzTmFtZSxcclxuICBhcmlhTGFiZWwsXHJcbiAgdHlwZSA9IFwiYnV0dG9uXCIsXHJcbiAgdGFiSW5kZXgsXHJcbiAgZnVsbFdpZHRoID0gZmFsc2UsXHJcbn06IFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIHR5cGU9e3R5cGV9XHJcbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgb25DbGljaz17b25DbGlja31cclxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsIHx8IGxhYmVsfVxyXG4gICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgIFwiaW5saW5lLWJsb2NrIHctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS02MFwiLFxuICAgICAgICBmdWxsV2lkdGggPyBcImNvbC1zcGFuLTJcIiA6IFwiXCIsXG4gICAgICAgIGNsYXNzTmFtZSB8fCBcIlwiXG4gICAgICApfVxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggbWluLWgtWzY4cHhdIHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1bIzAwMWY0ZF0vODAgYmctcHJpbWFyeSBweC00IHB5LTMuNSB0ZXh0LWNlbnRlciB0ZXh0LVsxOHB4XSBmb250LWJvbGQgbGVhZGluZy1bMS4xXSB0ZXh0LXdoaXRlIHNoYWRvdy14cyB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0xNTAgaG92ZXI6YmctWyMwMDFmNGRdIHNtOm1pbi1oLVs3MnB4XSBzbTpweC01IHNtOnB5LTQgc206dGV4dC1bMjBweF1cIj5cbiAgICAgICAge2xhYmVsfVxuICAgICAgPC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuICApO1xyXG59O1xyXG5cclxuUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbi5kaXNwbGF5TmFtZSA9IFwiUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblwiO1xyXG5cclxuLy8gRml4ZWQgYm90dG9tIGFjdGlvbiBiYXIgdGhhdCBzdGF5cyB2aXNpYmxlIHdoaWxlIHRoZSBwYWdlIHNjcm9sbHMuXHJcbmNvbnN0IFBhZ2VCb3R0b21BY3Rpb25zID0gKHsgY2hpbGRyZW4sIGFyaWFMYWJlbCwgY2xhc3NOYW1lIH06IFBhZ2VCb3R0b21BY3Rpb25zUHJvcHMpID0+IHtcclxuICBjb25zdCBhY3Rpb25CdXR0b25zID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbilcclxuICAgIC5maWx0ZXIoXHJcbiAgICAgIChjaGlsZCk6IGNoaWxkIGlzIFJlYWN0LlJlYWN0RWxlbWVudDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uUHJvcHM+ID0+XHJcbiAgICAgICAgaXNWYWxpZEVsZW1lbnQ8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzPihjaGlsZCkgJiYgY2hpbGQudHlwZSA9PT0gUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblxyXG4gICAgKVxyXG4gICAgLnNsaWNlKDAsIE1BWF9QQUdFX0JPVFRPTV9BQ1RJT05TKTtcclxuXHJcbiAgY29uc3QgYWN0aW9uQ291bnQgPSBhY3Rpb25CdXR0b25zLmxlbmd0aDtcclxuICBjb25zdCB7IHJlc2VydmVkSGVpZ2h0LCB3cmFwcGVyUmVmLCBjb250ZW50SW5zZXRzIH0gPSB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkoKTtcclxuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgaWYgKGFjdGlvbkNvdW50IDwgMSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhY3Rpb25CYXIgPSAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIHJlZj17d3JhcHBlclJlZn1cclxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQteC0wIGJvdHRvbS0wIHotMTkwMCBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwLzkwIGJnLXdoaXRlIHNoYWRvdy1bMF8tMTBweF8yOHB4X3JnYmEoMTUsMjMsNDIsMC4xMildXCJcclxuICAgID5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHBhZGRpbmdUb3A6IGAke1BBR0VfQk9UVE9NX0FDVElPTlNfVE9QX1BBRERJTkdfUFh9cHhgLFxyXG4gICAgICAgICAgcGFkZGluZ0xlZnQ6IGAke2NvbnRlbnRJbnNldHM/LmxlZnQgPz8gUEFHRV9CT1RUT01fQUNUSU9OU19TSURFX1BBRERJTkdfUFh9cHhgLFxyXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0OiBgJHtjb250ZW50SW5zZXRzPy5yaWdodCA/PyBQQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfUEFERElOR19QWH1weGAsXHJcbiAgICAgICAgICBwYWRkaW5nQm90dG9tOiBcImNhbGMoMC43NXJlbSArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tLCAwcHgpKVwiLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICByb2xlPVwidG9vbGJhclwiXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJwb2ludGVyLWV2ZW50cy1hdXRvIHctZnVsbFwiLCBjbGFzc05hbWUgfHwgXCJcIil9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0xLjVcIj5cclxuICAgICAgICAgICAge2FjdGlvbkJ1dHRvbnMubWFwKChjaGlsZCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBzaG91bGRVc2VGdWxsV2lkdGggPSBhY3Rpb25Db3VudCA9PT0gMSB8fCAoYWN0aW9uQ291bnQgJSAyID09PSAxICYmIGluZGV4ID09PSBhY3Rpb25Db3VudCAtIDEpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcclxuICAgICAgICAgICAgICAgIGZ1bGxXaWR0aDogc2hvdWxkVXNlRnVsbFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg6IGNoaWxkLnByb3BzLnRhYkluZGV4LFxyXG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgPz8gYHBhZ2UtYm90dG9tLWFjdGlvbi0ke2luZGV4fWAsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxkaXYgYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9e3sgaGVpZ2h0OiBgJHtyZXNlcnZlZEhlaWdodH1weGAgfX0gLz5cclxuICAgICAge3BvcnRhbFRhcmdldCA/IGNyZWF0ZVBvcnRhbChhY3Rpb25CYXIsIHBvcnRhbFRhcmdldCkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2VCb3R0b21BY3Rpb25zO1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBQcm9ncmVzc1N0YWdlID0ge1xyXG4gIGtleTogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBzdGF0ZTogXCJjb21wbGV0ZWRcIiB8IFwiYWN0aXZlXCIgfCBcInBlbmRpbmdcIjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5UHJvcHMgPSB7XG4gIG9wZW46IGJvb2xlYW47XG4gIHRpdGxlPzogc3RyaW5nO1xuICBzdW1tYXJ5Pzogc3RyaW5nO1xuICBlbGFwc2VkTXM/OiBudW1iZXI7XG4gIHN0YWdlcz86IFByb2dyZXNzU3RhZ2VbXTtcbn07XG5cbmNvbnN0IEdMT0JBTF9SQURJVVMgPSBcInZhcigtLXJhZGl1cy14bCwgNXB4KVwiO1xuY29uc3QgRU1QVFlfUFJPR1JFU1NfU1RBR0VTOiBQcm9ncmVzc1N0YWdlW10gPSBbXTtcblxuY29uc3QgZm9ybWF0RWxhcHNlZExhYmVsID0gKGVsYXBzZWRNczogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc2FmZUVsYXBzZWRNcyA9IE51bWJlci5pc0Zpbml0ZShlbGFwc2VkTXMpICYmIGVsYXBzZWRNcyA+IDAgPyBlbGFwc2VkTXMgOiAwO1xuICBjb25zdCB0b3RhbFNlY29uZHMgPSBNYXRoLmZsb29yKHNhZmVFbGFwc2VkTXMgLyAxMDAwKTtcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApO1xuICBjb25zdCBzZWNvbmRzID0gdG90YWxTZWNvbmRzICUgNjA7XG4gIHJldHVybiBgJHtTdHJpbmcobWludXRlcykucGFkU3RhcnQoMiwgXCIwXCIpfToke1N0cmluZyhzZWNvbmRzKS5wYWRTdGFydCgyLCBcIjBcIil9YDtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVTdGFnZUJhZGdlID0gKHN0YWdlOiBQcm9ncmVzc1N0YWdlKSA9PiB7XHJcbiAgaWYgKHN0YWdlLnN0YXRlID09PSBcImNvbXBsZXRlZFwiKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGgtOCB3LTggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTEwMCB0ZXh0LWVtZXJhbGQtNzAwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgZmlsbD1cIm5vbmVcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIyXCI+XHJcbiAgICAgICAgICA8cGF0aCBkPVwiTTUgMTAuNSA4LjUgMTQgMTUgNi41XCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBpZiAoc3RhZ2Uuc3RhdGUgPT09IFwiYWN0aXZlXCIpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaC04IHctOCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJnLXNreS0xMDAgdGV4dC1za3ktNzAwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8c3BhblxyXG4gICAgICBjbGFzc05hbWU9XCJmbGV4IGgtOCB3LTggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSB0ZXh0LXNsYXRlLTQwMFwiXHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImgtMi41IHctMi41IHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS0yMDBcIiAvPlxyXG4gICAgPC9zcGFuPlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBTaG93cyBvbmUgc3RhZ2VkIHByb2dyZXNzIG92ZXJsYXkgd2hpbGUgdGhlIGNvbXBvc2l0ZSBxdWljay10aWNrZXQgcmVxdWVzdCBpcyBpbiBmbGlnaHQuXHJcbmNvbnN0IEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheSA9ICh7XG4gIG9wZW4sXG4gIHRpdGxlLFxuICBzdW1tYXJ5LFxuICBlbGFwc2VkTXMgPSAwLFxuICBzdGFnZXMgPSBFTVBUWV9QUk9HUkVTU19TVEFHRVMsXG59OiBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXlQcm9wcykgPT4ge1xuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDAgcHgtNCBweS02XCI+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHctZnVsbCBtYXgtdy1sZyByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZS85NSBwLTVcIlxuICAgICAgICBzdHlsZT17eyBib3JkZXJSYWRpdXM6IEdMT0JBTF9SQURJVVMgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGdhcC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtMTIgdy0xMiBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctc2t5LTUwIHRleHQtc2t5LTcwMFwiPlxuICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNiB3LTZcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xXCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzE1cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj5cclxuICAgICAgICAgICAgICB7dGl0bGUgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAge3N1bW1hcnkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19DcmVhdGluZ1RpY2tldFwiLCBcIkNyZWF0aW5nIHRpY2tldC4uLlwiKX1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTUwIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfRWxhcHNlZFwiLCBcIkVsYXBzZWQgdGltZVwiKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzEycHhdIHRleHQtc2xhdGUtNzAwXCI+e2Zvcm1hdEVsYXBzZWRMYWJlbChlbGFwc2VkTXMpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAge3N0YWdlcy5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC01IHNwYWNlLXktM1wiPlxyXG4gICAgICAgICAgICB7c3RhZ2VzLm1hcCgoc3RhZ2UpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e3N0YWdlLmtleX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICAgIHN0YWdlLnN0YXRlID09PSBcImFjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2t5LTIwMCBiZy1za3ktNTAvODAgcHgtMyBweS0zXCJcbiAgICAgICAgICAgICAgICAgICAgOiBzdGFnZS5zdGF0ZSA9PT0gXCJjb21wbGV0ZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItZW1lcmFsZC0yMDAgYmctZW1lcmFsZC01MC83MCBweC0zIHB5LTNcIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBweC0zIHB5LTNcIlxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTNcIj5cclxuICAgICAgICAgICAgICAgICAge3Jlc29sdmVTdGFnZUJhZGdlKHN0YWdlKX1cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwXHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFnZS5zdGF0ZSA9PT0gXCJwZW5kaW5nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTYwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAge3N0YWdlLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQteHMgbGVhZGluZy01IHRleHQtc2xhdGUtNTAwXCI+e3N0YWdlLmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5O1xyXG4iLCAiXHVGRUZGaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlR2FzdG9UeXBlQ29kZSxcclxuICBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgZ2V0RGVmYXVsdEV4cGVuc2VHYXN0b1R5cGVDb2RlLFxyXG4gIHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUsXHJcbn0gZnJvbSBcIi4uL2NvbnN0YW50cy9leHBlbnNlR2FzdG9UeXBlQ2F0YWxvZy50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQgeyB0b0V4cGVuc2VBcGlEZE1tWXl5eSB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpRGF0ZVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHJlc29sdmVUaWNrZXRMaW5lQW1vdW50IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VUaWNrZXRMaW5lQW1vdW50LnRzXCI7XHJcblxyXG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSA9IFwiaW5kLWV4cGVuc2UtdGlja2V0LWltYWdlLXYxXCI7XHJcbmNvbnN0IFRJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVggPSBcIi9fX2luZF9jYWNoZV9fL3RpY2tldC1pbWFnZS9cIjtcclxuY29uc3QgVElDS0VUX1RSQUNFX1NUT1JBR0VfS0VZID0gXCJleHBlbnNlX3NoZWV0X3RpY2tldF9xdWlja19mbG93X3RyYWNlX3YxXCI7XHJcblxyXG5leHBvcnQgY29uc3QgTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTID0gNTAgKiAxMDI0ICogMTAyNDtcclxuZXhwb3J0IGNvbnN0IFRJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFID1cclxuICBcIi5qcGcsLmpwZWcsLnBuZywud2VicCxpbWFnZS9qcGVnLGltYWdlL3BqcGVnLGltYWdlL3BuZyxpbWFnZS93ZWJwXCI7XHJcbmNvbnN0IEFMTE9XRURfVElDS0VUX0lNQUdFX01JTUVfVFlQRVMgPSBuZXcgU2V0PHN0cmluZz4oW1wiaW1hZ2UvanBlZ1wiLCBcImltYWdlL3BqcGVnXCIsIFwiaW1hZ2UvcG5nXCIsIFwiaW1hZ2Uvd2VicFwiXSk7XHJcbmNvbnN0IEFMTE9XRURfVElDS0VUX0lNQUdFX0VYVEVOU0lPTlMgPSBuZXcgU2V0PHN0cmluZz4oW1wianBnXCIsIFwianBlZ1wiLCBcInBuZ1wiLCBcIndlYnBcIl0pO1xyXG5jb25zdCBUSUNLRVRfTUlNRV9UT19FWFRFTlNJT046IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgXCJpbWFnZS9qcGVnXCI6IFwianBnXCIsXHJcbiAgXCJpbWFnZS9wanBlZ1wiOiBcImpwZ1wiLFxyXG4gIFwiaW1hZ2UvanBnXCI6IFwianBnXCIsXHJcbiAgXCJpbWFnZS9wbmdcIjogXCJwbmdcIixcclxuICBcImltYWdlL3dlYnBcIjogXCJ3ZWJwXCIsXHJcbn07XHJcbmNvbnN0IFBSRUZFUlJFRF9USUNLRVRfR0FTVE9fVFlQRSA9IDg7XHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NSRUFURV9NT0RFID0gXCJtYW51YWxcIiBhcyBcImlhXCIgfCBcIm1hbnVhbFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgVGlja2V0SW1hZ2VTb3VyY2UgPSBcImNhbWVyYVwiIHwgXCJnYWxsZXJ5XCI7XHJcblxyXG5leHBvcnQgdHlwZSBUaWNrZXRUcmFjZUVudHJ5ID0ge1xyXG4gIHN0ZXA6IHN0cmluZztcclxuICB0cmFjZUlkOiBzdHJpbmc7XHJcbiAgYXQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgTm9ybWFsaXplZERyYWZ0TGluZSA9IHtcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICB0eXBlVmFsdWU6IG51bWJlcjtcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHF0eTogbnVtYmVyO1xyXG4gIHByaWNlOiBudW1iZXI7XHJcbiAgdG90YWxBbW91bnQ6IG51bWJlcjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIE5vcm1hbGl6ZWREcmFmdCA9IHtcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgdGlja2V0RGF0ZTogc3RyaW5nO1xyXG4gIHRpY2tldFRpbWU6IHN0cmluZztcclxuICBjb21lbnRhcmlvOiBzdHJpbmc7XHJcbiAgZ2FzdG9UeXBlOiBudW1iZXIgfCBudWxsO1xyXG4gIGxpbmVzOiBOb3JtYWxpemVkRHJhZnRMaW5lW107XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBQZW5kaW5nVXBsb2FkUmV0cnkgPVxyXG4gIHwge1xyXG4gICAgICBzdHJhdGVneTogXCJpYS1yZWFkeVwiO1xyXG4gICAgICBmaWxlSWQ6IHN0cmluZztcclxuICAgICAgZXh0ZW5zaW9uOiBzdHJpbmc7XHJcbiAgICAgIGNhY2hlS2V5OiBzdHJpbmc7XHJcbiAgICAgIGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQ7XHJcbiAgICAgIGZpbGVOYW1lSGludDogc3RyaW5nO1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICBzdHJhdGVneTogXCJtYW51YWwtcG9zdC11cGxvYWQtZHJhZnRcIjtcclxuICAgICAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgICAgIGV4dGVuc2lvbjogc3RyaW5nO1xyXG4gICAgICBjYWNoZUtleTogc3RyaW5nO1xyXG4gICAgICBmaWxlTmFtZUhpbnQ6IHN0cmluZztcclxuICAgIH07XHJcblxyXG5leHBvcnQgdHlwZSBVcGxvYWRTeW5jUmVzdWx0ID0ge1xyXG4gIHVybEZpbGU6IHN0cmluZztcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncyA9IHtcclxuICBzaGVldElkPzogc3RyaW5nO1xyXG4gIHByb2plY3RJZD86IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBpc1NoZWV0TG9ja2VkOiBib29sZWFuO1xyXG4gIGxpbmtUb1NoZWV0PzogYm9vbGVhbjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxuICBvbkNvbXBsZXRlZD86IChyZXN1bHQ6IHsgZmlsZUlkOiBzdHJpbmc7IGxpbmtlZFRvU2hlZXQ6IGJvb2xlYW4gfSkgPT4gdm9pZDtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFF1aWNrRmxvd1Byb2dyZXNzS2V5ID1cclxuICB8IFwidXBsb2FkaW5nSW1hZ2VcIlxyXG4gIHwgXCJjcmVhdGluZ1RpY2tldFwiXHJcbiAgfCBcInN5bmNpbmdGaWxlXCJcclxuICB8IFwiZmluYWxpemluZ0lhXCJcclxuICB8IFwibGlua2luZ0V4cGVuc2VMaW5lXCJcclxuICB8IFwiZG9uZVwiO1xyXG5cclxuY29uc3QgYXNSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiB7fTtcclxuICByZXR1cm4gdmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbn07XHJcblxyXG5jb25zdCBnZXRGaXJzdERlZmluZWQgPSAocmVjb3JkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwga2V5czogc3RyaW5nW10pOiB1bmtub3duID0+IHtcclxuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XHJcbiAgICBpZiAoa2V5IGluIHJlY29yZCkge1xyXG4gICAgICByZXR1cm4gcmVjb3JkW2tleV07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG5jb25zdCB0b051bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB0b1Bvc2l0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9OdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgcGFyc2VkID4gMCA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB0b0RkTW1ZeXl5ID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICByZXR1cm4gdG9FeHBlbnNlQXBpRGRNbVl5eXkodmFsdWUpO1xyXG59O1xyXG5cclxuY29uc3QgdG9UaWNrZXRUaW1lID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCByYXcgPSBzYWZlVGV4dCh2YWx1ZSkucmVwbGFjZSgvXFwuL2csIFwiOlwiKTtcclxuICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgbWF0Y2ggPSByYXcubWF0Y2goL14oXFxkezEsMn0pOihbMC01XVxcZCkoPzo6KFswLTVdXFxkKSk/JC8pO1xyXG4gIGlmICghbWF0Y2gpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IGhvdXJzID0gTnVtYmVyKG1hdGNoWzFdKTtcclxuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaG91cnMpIHx8IGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSByZXR1cm4gXCJcIjtcclxuICByZXR1cm4gYCR7U3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCBcIjBcIil9OiR7bWF0Y2hbMl19OiR7bWF0Y2hbM10gfHwgXCIwMFwifWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VG9kYXlEZE1tWXl5eSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB0b0RkTW1ZeXl5KG5ldyBEYXRlKCkpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplR2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUodmFsdWUpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24gPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XS9nLCBcIlwiKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBcIlwiO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcImpwZWdcIikgcmV0dXJuIFwianBnXCI7XHJcbiAgcmV0dXJuIEFMTE9XRURfVElDS0VUX0lNQUdFX0VYVEVOU0lPTlMuaGFzKG5vcm1hbGl6ZWQpID8gbm9ybWFsaXplZCA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGZyb21OYW1lID0gc2FmZVRleHQoZmlsZS5uYW1lKS5zcGxpdChcIi5cIikucG9wKCkgfHwgXCJcIjtcclxuICByZXR1cm4gbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24oZnJvbU5hbWUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGluZmVyRXh0ZW5zaW9uID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHR5cGUgPSBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgZnJvbU1pbWUgPSBUSUNLRVRfTUlNRV9UT19FWFRFTlNJT05bdHlwZV07XHJcbiAgaWYgKGZyb21NaW1lKSByZXR1cm4gZnJvbU1pbWU7XHJcblxyXG4gIGNvbnN0IGZyb21OYW1lID0gcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZShmaWxlKTtcclxuICBpZiAoZnJvbU5hbWUpIHJldHVybiBmcm9tTmFtZTtcclxuXHJcbiAgcmV0dXJuIFwianBnXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUgPSAoZmlsZTogRmlsZSk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUeXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmIChub3JtYWxpemVkVHlwZSAmJiBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTLmhhcyhub3JtYWxpemVkVHlwZSkpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZXh0ZW5zaW9uID0gcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZShmaWxlKTtcclxuICByZXR1cm4gISFleHRlbnNpb247XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZVJhbmRvbUtleSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh0eXBlb2YgY3J5cHRvICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjcnlwdG8ucmFuZG9tVVVJRCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZXR1cm4gY3J5cHRvLnJhbmRvbVVVSUQoKTtcclxuICB9XHJcbiAgcmV0dXJuIGAke0RhdGUubm93KCl9LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgMTApfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2FuaXRpemVGaWxlTmFtZSA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBiYXNlID0gc2FmZVRleHQodmFsdWUpLnJlcGxhY2UoL1s8PjpcIi9cXFxcfD8qXFx1MDAwMC1cXHUwMDFGXS9nLCBcIl9cIik7XHJcbiAgcmV0dXJuIGJhc2UgfHwgXCJ0aWNrZXQtaW1hZ2VcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhY2VJZEZyb21FcnJvciA9IChlcnJvcjogQXBpRmV0Y2hFcnJvcik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGF5bG9hZCA9IHNhZmVUZXh0KGVycm9yLnJlc3BvbnNlQm9keSk7XHJcbiAgaWYgKCFwYXlsb2FkKSByZXR1cm4gXCJcIjtcclxuICB0cnkge1xyXG4gICAgY29uc3QganNvbiA9IEpTT04ucGFyc2UocGF5bG9hZCkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbiAgICBjb25zdCB0cmFjZUlkID0gc2FmZVRleHQoanNvbi5UcmFjZUlkID8/IGpzb24udHJhY2VJZCk7XHJcbiAgICByZXR1cm4gdHJhY2VJZDtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBOb3JtYWxpemVkRHJhZnQgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyYXdEYXRhKTtcclxuICBjb25zdCBkcmFmdERlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKTtcclxuICBjb25zdCBkcmFmdEN1cnJlbmN5ID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImN1cnJlbmN5Q29kZVwiLCBcIkN1cnJlbmN5Q29kZVwiXSkpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgZHJhZnRUb3RhbEFtb3VudCA9IHRvTnVtYmVyKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSk7XHJcbiAgY29uc3QgZHJhZnRUcmFuc0RhdGUgPSB0b0RkTW1ZeXl5KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0cmFuc0RhdGVcIiwgXCJUcmFuc0RhdGVcIl0pKSB8fCBnZXRUb2RheURkTW1ZeXl5KCk7XHJcbiAgY29uc3QgZHJhZnRUaWNrZXREYXRlID1cclxuICAgIHRvRGRNbVl5eXkoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcInRpY2tldERhdGVcIiwgXCJUaWNrZXREYXRlXCJdKSkgfHwgZHJhZnRUcmFuc0RhdGU7XHJcbiAgY29uc3QgZHJhZnRUaWNrZXRUaW1lID0gdG9UaWNrZXRUaW1lKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0aWNrZXRUaW1lXCIsIFwiVGlja2V0VGltZVwiXSkpO1xyXG4gIGNvbnN0IGRyYWZ0Q29tbWVudCA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJjb21lbnRhcmlvXCIsIFwiQ29tZW50YXJpb1wiXSkpO1xyXG4gIGNvbnN0IGRyYWZ0R2FzdG9UeXBlID0gbm9ybWFsaXplR2FzdG9UeXBlKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJnYXN0b1R5cGVcIiwgXCJHYXN0b1R5cGVcIl0pKTtcclxuXHJcbiAgY29uc3QgcmF3TGluZXMgPSBnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wibGluZXNcIiwgXCJMaW5lc1wiXSk7XHJcbiAgY29uc3QgbGluZUFycmF5ID0gQXJyYXkuaXNBcnJheShyYXdMaW5lcykgPyByYXdMaW5lcyA6IFtdO1xyXG5cclxuICBjb25zdCBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdID0gbGluZUFycmF5XHJcbiAgICAubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBsaW5lUmVjb3JkID0gYXNSZWNvcmQoZW50cnkpO1xyXG4gICAgICBjb25zdCBxdHlDYW5kaWRhdGUgPSB0b051bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1wicXR5XCIsIFwiUXR5XCJdKSk7XHJcbiAgICAgIGNvbnN0IHF0eSA9IHF0eUNhbmRpZGF0ZSAhPT0gbnVsbCAmJiBxdHlDYW5kaWRhdGUgPj0gMCA/IHF0eUNhbmRpZGF0ZSA6IDE7XHJcbiAgICAgIGNvbnN0IHByaWNlID0gdG9OdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInByaWNlXCIsIFwiUHJpY2VcIl0pKTtcclxuICAgICAgY29uc3QgZXhwbGljaXRUb3RhbCA9IHRvTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSk7XHJcbiAgICAgIGNvbnN0IGNvbXB1dGVkVG90YWwgPSByZXNvbHZlVGlja2V0TGluZUFtb3VudCh7IHF0eSwgcHJpY2UsIHRvdGFsQW1vdW50OiBleHBsaWNpdFRvdGFsIH0pO1xyXG4gICAgICBpZiAoY29tcHV0ZWRUb3RhbCA9PT0gbnVsbCB8fCAhTnVtYmVyLmlzRmluaXRlKGNvbXB1dGVkVG90YWwpIHx8IGNvbXB1dGVkVG90YWwgPT09IDApIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgY29uc3QgZWZmZWN0aXZlUHJpY2UgPSBwcmljZSAhPT0gbnVsbCAmJiBwcmljZSAhPT0gMCA/IHByaWNlIDogcXR5ID4gMCA/IGNvbXB1dGVkVG90YWwgLyBxdHkgOiBjb21wdXRlZFRvdGFsO1xyXG4gICAgICBpZiAoZWZmZWN0aXZlUHJpY2UgPT09IDAgfHwgKHF0eSA9PT0gMCAmJiBjb21wdXRlZFRvdGFsID49IDApKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IGNhbmRpZGF0ZVR5cGVWYWx1ZSA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInR5cGVWYWx1ZVwiLCBcIlR5cGVWYWx1ZVwiXSkpO1xyXG4gICAgICBjb25zdCBzYWZlVHlwZVZhbHVlID0gdG9FeHBlbnNlR2FzdG9UeXBlQ29kZShjYW5kaWRhdGVUeXBlVmFsdWUsIHsgYWxsb3dOb25lOiBmYWxzZSB9KTtcclxuICAgICAgY29uc3Qgc2FmZURyYWZ0R2FzdG9UeXBlID0gdG9FeHBlbnNlR2FzdG9UeXBlQ29kZShkcmFmdEdhc3RvVHlwZSwgeyBhbGxvd05vbmU6IGZhbHNlIH0pO1xyXG4gICAgICBjb25zdCBkZWZhdWx0R2FzdG9UeXBlID0gZ2V0RGVmYXVsdEV4cGVuc2VHYXN0b1R5cGVDb2RlKFBSRUZFUlJFRF9USUNLRVRfR0FTVE9fVFlQRSk7XHJcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IHNhZmVUeXBlVmFsdWUgPz8gc2FmZURyYWZ0R2FzdG9UeXBlID8/IGRlZmF1bHRHYXN0b1R5cGU7XHJcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKSB8fCBkcmFmdERlc2NyaXB0aW9uO1xyXG4gICAgICBjb25zdCB0cmFuc0RhdGUgPSB0b0RkTW1ZeXl5KGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0cmFuc0RhdGVcIiwgXCJUcmFuc0RhdGVcIl0pKSB8fCBkcmFmdFRyYW5zRGF0ZTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIHR5cGVWYWx1ZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcclxuICAgICAgICBxdHksXHJcbiAgICAgICAgcHJpY2U6IGVmZmVjdGl2ZVByaWNlLFxyXG4gICAgICAgIHRvdGFsQW1vdW50OiBjb21wdXRlZFRvdGFsLFxyXG4gICAgICB9O1xyXG4gICAgfSlcclxuICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgTm9ybWFsaXplZERyYWZ0TGluZSA9PiBlbnRyeSAhPT0gbnVsbCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkZXNjcmlwdGlvbjogZHJhZnREZXNjcmlwdGlvbiB8fCBcIlRpY2tldFwiLFxyXG4gICAgY3VycmVuY3lDb2RlOiBkcmFmdEN1cnJlbmN5IHx8IFwiRVVSXCIsXHJcbiAgICB0b3RhbEFtb3VudDogZHJhZnRUb3RhbEFtb3VudCAhPT0gbnVsbCA/IGRyYWZ0VG90YWxBbW91bnQgOiBsaW5lcy5yZWR1Y2UoKHN1bSwgbGluZSkgPT4gc3VtICsgbGluZS50b3RhbEFtb3VudCwgMCksXHJcbiAgICB0cmFuc0RhdGU6IGRyYWZ0VHJhbnNEYXRlLFxyXG4gICAgdGlja2V0RGF0ZTogZHJhZnRUaWNrZXREYXRlLFxyXG4gICAgdGlja2V0VGltZTogZHJhZnRUaWNrZXRUaW1lLFxyXG4gICAgY29tZW50YXJpbzogZHJhZnRDb21tZW50LFxyXG4gICAgZ2FzdG9UeXBlOiBkcmFmdEdhc3RvVHlwZSxcclxuICAgIGxpbmVzLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRpY2tldEZpbGVJZEZyb21EcmFmdFJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyYXdEYXRhKTtcclxuICBjb25zdCBjcmVhdGlvblJhdyA9IGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJUaWNrZXRDcmVhdGlvblwiLCBcInRpY2tldENyZWF0aW9uXCJdKTtcclxuICBjb25zdCBjcmVhdGlvbiA9IGFzUmVjb3JkKGNyZWF0aW9uUmF3KTtcclxuICByZXR1cm4gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGNyZWF0aW9uLCBbXCJGaWxlSWRcIiwgXCJmaWxlSWRcIl0pKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlVXBsb2FkUmVzdWx0ID0gKHJlc3BvbnNlRGF0YTogdW5rbm93bik6IFVwbG9hZFN5bmNSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyZXNwb25zZURhdGEpO1xyXG4gIHJldHVybiB7XHJcbiAgICB1cmxGaWxlOiBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiVXJsRmlsZVwiLCBcInVybEZpbGVcIl0pKSxcclxuICAgIGZpbGVOYW1lOiBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiRmlsZU5hbWVcIiwgXCJmaWxlTmFtZVwiXSkpLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYnVpbGRUaWNrZXRJYVBheWxvYWQgPSAoZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCwgdXBsb2FkOiBVcGxvYWRTeW5jUmVzdWx0KTogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0+IHtcclxuICBjb25zdCBpYUxpbmVzID0gZHJhZnQubGluZXMubWFwKChsaW5lKSA9PiAoe1xyXG4gICAgZGVzY3JpcHRpb246IGxpbmUuZGVzY3JpcHRpb24sXHJcbiAgICBxdHk6IGxpbmUucXR5LFxyXG4gICAgcHJpY2U6IGxpbmUucHJpY2UsXHJcbiAgICB0b3RhbEFtb3VudDogbGluZS50b3RhbEFtb3VudCxcclxuICB9KSk7XHJcblxyXG4gIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9IHtcclxuICAgIGRlc2NyaXB0aW9uOiBkcmFmdC5kZXNjcmlwdGlvbixcclxuICAgIGN1cnJlbmN5Q29kZTogZHJhZnQuY3VycmVuY3lDb2RlLFxyXG4gICAgdG90YWxBbW91bnQ6IGRyYWZ0LnRvdGFsQW1vdW50ICE9PSAwID8gZHJhZnQudG90YWxBbW91bnQgOiB1bmRlZmluZWQsXHJcbiAgICB0cmFuc0RhdGU6IGRyYWZ0LnRyYW5zRGF0ZSxcclxuICAgIHRpY2tldERhdGU6IGRyYWZ0LnRpY2tldERhdGUgfHwgZHJhZnQudHJhbnNEYXRlLFxyXG4gICAgdGlja2V0VGltZTogZHJhZnQudGlja2V0VGltZSB8fCB1bmRlZmluZWQsXHJcbiAgICBjb21lbnRhcmlvOiBkcmFmdC5jb21lbnRhcmlvIHx8IHVuZGVmaW5lZCxcclxuICAgIHVybEZpbGU6IHVwbG9hZC51cmxGaWxlIHx8IHVuZGVmaW5lZCxcclxuICAgIGZpbGVOYW1lOiB1cGxvYWQuZmlsZU5hbWUgfHwgdW5kZWZpbmVkLFxyXG4gICAgbGluZXM6IGlhTGluZXMsXHJcbiAgfTtcclxuXHJcbiAgaWYgKGRyYWZ0Lmdhc3RvVHlwZSAhPT0gbnVsbCkge1xyXG4gICAgcGF5bG9hZC5nYXN0b1R5cGUgPSBkcmFmdC5nYXN0b1R5cGUgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcGF5bG9hZDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBidWlsZFNoZWV0TGluZVBheWxvYWQgPSAoXHJcbiAgZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCxcclxuICBmaWxlSWQ6IHN0cmluZyxcclxuICBwcm9qZWN0SWQ6IHN0cmluZ1xyXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IGxpbmVGcm9tRHJhZnQgPSBkcmFmdC5saW5lc1swXTtcclxuICAvLyBCdWlsZCBhIHNpbmdsZSBleHBlbnNlIGxpbmUgZnJvbSB0aWNrZXQgaGVhZGVyIGRhdGEgdG8gYXZvaWQgbGluZS1sZXZlbCBkZXNjcmlwdGlvbiBsZWFrYWdlLlxyXG4gIGNvbnN0IGhlYWRlclRvdGFsID0gZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiAwO1xyXG4gIGNvbnN0IGZhbGxiYWNrVG90YWwgPSBsaW5lRnJvbURyYWZ0Py50b3RhbEFtb3VudCB8fCAwO1xyXG4gIGNvbnN0IGVmZmVjdGl2ZVRvdGFsID0gaGVhZGVyVG90YWwgPiAwID8gaGVhZGVyVG90YWwgOiBmYWxsYmFja1RvdGFsO1xyXG4gIGlmICghKGVmZmVjdGl2ZVRvdGFsID4gMCkpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBkZWZhdWx0R2FzdG9UeXBlID0gZ2V0RGVmYXVsdEV4cGVuc2VHYXN0b1R5cGVDb2RlKFBSRUZFUlJFRF9USUNLRVRfR0FTVE9fVFlQRSk7XHJcbiAgY29uc3QgdHlwZVZhbHVlQ2FuZGlkYXRlID0gZHJhZnQuZ2FzdG9UeXBlIHx8IGxpbmVGcm9tRHJhZnQ/LnR5cGVWYWx1ZSB8fCBkZWZhdWx0R2FzdG9UeXBlO1xyXG4gIGNvbnN0IHR5cGVWYWx1ZSA9IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUodHlwZVZhbHVlQ2FuZGlkYXRlLCB7IGFsbG93Tm9uZTogZmFsc2UgfSkgPz8gZGVmYXVsdEdhc3RvVHlwZTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHRyYW5zRGF0ZTogZHJhZnQudHJhbnNEYXRlIHx8IGxpbmVGcm9tRHJhZnQ/LnRyYW5zRGF0ZSB8fCBnZXRUb2RheURkTW1ZeXl5KCksXHJcbiAgICB0eXBlVmFsdWUsXHJcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoZHJhZnQuZGVzY3JpcHRpb24pIHx8IFwiVGlja2V0XCIsXHJcbiAgICBpbnRlcm5hY2lvbmFsOiBmYWxzZSxcclxuICAgIGZpbGVJZCxcclxuICAgIHRpY2tldDogdHJ1ZSxcclxuICAgIHF0eTogMSxcclxuICAgIHByaWNlOiBlZmZlY3RpdmVUb3RhbCxcclxuICAgIHByb2pJZDogc2FmZVRleHQocHJvamVjdElkKSB8fCB1bmRlZmluZWQsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBwZXJzaXN0VHJhY2VMaXN0ID0gKHRyYWNlTGlzdDogVGlja2V0VHJhY2VFbnRyeVtdKTogdm9pZCA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVElDS0VUX1RSQUNFX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeSh0cmFjZUxpc3QpKTtcclxuICB9IGNhdGNoIHtcclxuICAgIC8vIElnbm9yZSBzdG9yYWdlIGZhaWx1cmVzIGluIHJlc3RyaWN0ZWQgYnJvd3NlciBjb250ZXh0cy5cclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgY2FjaGVJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZywgZmlsZTogRmlsZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICEoXCJjYWNoZXNcIiBpbiB3aW5kb3cpKSByZXR1cm47XHJcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XHJcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XHJcbiAgYXdhaXQgY2FjaGUucHV0KFxyXG4gICAgbmV3IFJlcXVlc3QocmVxdWVzdFVybCksXHJcbiAgICBuZXcgUmVzcG9uc2UoZmlsZSwge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogc2FmZVRleHQoZmlsZS50eXBlKSB8fCBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiLFxyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlYWRDYWNoZWRJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZyk6IFByb21pc2U8QmxvYiB8IG51bGw+ID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XHJcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XHJcbiAgY29uc3QgY2FjaGVkUmVzcG9uc2UgPSBhd2FpdCBjYWNoZS5tYXRjaChyZXF1ZXN0VXJsKTtcclxuICBpZiAoIWNhY2hlZFJlc3BvbnNlKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gY2FjaGVkUmVzcG9uc2UuYmxvYigpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlbW92ZUNhY2hlZEltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybjtcclxuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcclxuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcclxuICBhd2FpdCBjYWNoZS5kZWxldGUocmVxdWVzdFVybCk7XHJcbn07XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBpbmRGb3JtYXQsIGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcclxuaW1wb3J0IHR5cGUgeyBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCB9IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0UXVpY2sgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5pbXBvcnQge1xyXG4gIE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyxcclxuICBjYWNoZUltYWdlRmlsZSxcclxuICBleHRyYWN0VHJhY2VJZEZyb21FcnJvcixcclxuICBpc1N1cHBvcnRlZFRpY2tldEltYWdlRmlsZSxcclxuICBwZXJzaXN0VHJhY2VMaXN0LFxyXG4gIHJlbW92ZUNhY2hlZEltYWdlRmlsZSxcclxuICByZXNvbHZlUmFuZG9tS2V5LFxyXG4gIHR5cGUgUXVpY2tGbG93UHJvZ3Jlc3NLZXksXHJcbiAgdHlwZSBUaWNrZXRJbWFnZVNvdXJjZSxcclxuICB0eXBlIFRpY2tldFRyYWNlRW50cnksXHJcbiAgdHlwZSBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzLFxyXG59IGZyb20gXCIuL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0NvcmUudHNcIjtcclxuaW1wb3J0IHsgb3B0aW1pemVUaWNrZXRJbWFnZUZvclVwbG9hZCwgdHlwZSBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdCB9IGZyb20gXCIuL3RpY2tldEltYWdlT3B0aW1pemF0aW9uLnRzXCI7XHJcblxyXG50eXBlIFF1aWNrQ3JlYXRlUGFydGlhbFRpY2tldFN0YXRlID0ge1xyXG4gIGZpbGVJZDogc3RyaW5nO1xyXG4gIGxpbmtlZFRvU2hlZXQ6IGJvb2xlYW47XHJcbiAgY29tcGxldGVkU3RhZ2U6IHN0cmluZztcclxuICB1cmxGaWxlOiBzdHJpbmc7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxuICBwcm9jZXNzZWRCeUFJOiBib29sZWFuIHwgbnVsbDtcclxufTtcclxuXHJcbnR5cGUgUXVpY2tUaWNrZXRBdHRlbXB0Q29udGV4dCA9IHtcclxuICBhdHRlbXB0SWQ6IHN0cmluZztcclxuICBzb3VyY2U6IFRpY2tldEltYWdlU291cmNlO1xyXG4gIHN0YXJ0ZWRBdDogbnVtYmVyO1xyXG4gIG9wdGltaXphdGlvbjogVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQ7XHJcbn07XHJcblxyXG50eXBlIFF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZSA9IHtcclxuICBrZXk6IFF1aWNrRmxvd1Byb2dyZXNzS2V5O1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBzdGF0ZTogXCJjb21wbGV0ZWRcIiB8IFwiYWN0aXZlXCIgfCBcInBlbmRpbmdcIjtcclxufTtcclxuXHJcbmNvbnN0IFFVSUNLX1RJQ0tFVF9GTE9XX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXF1aWNrLXRpY2tldF1cIjtcclxuY29uc3QgUVVJQ0tfVElDS0VUX1ZJU1VBTF9TVEFHRV9NUyA9IHtcclxuICBzeW5jaW5nRmlsZTogMTIwMCxcclxuICBmaW5hbGl6aW5nSWE6IDM2MDAsXHJcbiAgbGlua2luZ0V4cGVuc2VMaW5lOiA4NTAwLFxyXG59IGFzIGNvbnN0O1xyXG5cclxuY29uc3QgbG9nUXVpY2tUaWNrZXRJbmZvID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5pbmZvID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuaW5mbyhRVUlDS19USUNLRVRfRkxPV19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dRdWlja1RpY2tldFdhcm4gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLndhcm4gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS53YXJuKFFVSUNLX1RJQ0tFVF9GTE9XX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvZ1F1aWNrVGlja2V0RXJyb3IgPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoUVVJQ0tfVElDS0VUX0ZMT1dfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RmlsZVNpemUgPSAoc2l6ZTogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICBpZiAoIShzaXplID4gMCkpIHJldHVybiBcIjAgQlwiO1xyXG4gIGlmIChzaXplID49IDEwMjQgKiAxMDI0KSByZXR1cm4gYCR7KHNpemUgLyAoMTAyNCAqIDEwMjQpKS50b0ZpeGVkKDIpfSBNQmA7XHJcbiAgaWYgKHNpemUgPj0gMTAyNCkgcmV0dXJuIGAkeyhzaXplIC8gMTAyNCkudG9GaXhlZCgxKX0gS0JgO1xyXG4gIHJldHVybiBgJHtzaXplfSBCYDtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRmlsZUxvZ0RhdGEgPSAoZmlsZTogRmlsZSkgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiBzYWZlVGV4dChmaWxlLm5hbWUpLFxyXG4gICAgdHlwZTogc2FmZVRleHQoZmlsZS50eXBlKSxcclxuICAgIHNpemVCeXRlczogTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSxcclxuICAgIHNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShOdW1iZXIoZmlsZS5zaXplIHx8IDApKSxcclxuICAgIGxhc3RNb2RpZmllZDogTnVtYmVyKGZpbGUubGFzdE1vZGlmaWVkIHx8IDApLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEZhbGxiYWNrT3B0aW1pemF0aW9uUmVzdWx0ID0gKGZpbGU6IEZpbGUpOiBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdCA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGZpbGUsXHJcbiAgICBjaGFuZ2VkOiBmYWxzZSxcclxuICAgIHJlYXNvbjogXCJvcHRpbWl6YXRpb24tZXJyb3JcIixcclxuICAgIHJlc2l6ZWQ6IGZhbHNlLFxyXG4gICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgIGVsYXBzZWRNczogMCxcclxuICAgIG9yaWdpbmFsOiB7XHJcbiAgICAgIG5hbWU6IHNhZmVUZXh0KGZpbGUubmFtZSksXHJcbiAgICAgIHR5cGU6IHNhZmVUZXh0KGZpbGUudHlwZSksXHJcbiAgICAgIHNpemU6IE51bWJlcihmaWxlLnNpemUgfHwgMCksXHJcbiAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICBoZWlnaHQ6IG51bGwsXHJcbiAgICB9LFxyXG4gICAgb3V0cHV0OiB7XHJcbiAgICAgIG5hbWU6IHNhZmVUZXh0KGZpbGUubmFtZSksXHJcbiAgICAgIHR5cGU6IHNhZmVUZXh0KGZpbGUudHlwZSksXHJcbiAgICAgIHNpemU6IE51bWJlcihmaWxlLnNpemUgfHwgMCksXHJcbiAgICAgIHdpZHRoOiBudWxsLFxyXG4gICAgICBoZWlnaHQ6IG51bGwsXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBidWlsZE9wdGltaXphdGlvbkxvZ0RhdGEgPSAocmVzdWx0OiBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdCkgPT4ge1xyXG4gIGNvbnN0IHNhdmVkQnl0ZXMgPSBNYXRoLm1heCgwLCByZXN1bHQub3JpZ2luYWwuc2l6ZSAtIHJlc3VsdC5vdXRwdXQuc2l6ZSk7XHJcbiAgY29uc3Qgc2F2ZWRSYXRpbyA9IHJlc3VsdC5vcmlnaW5hbC5zaXplID4gMCA/IHNhdmVkQnl0ZXMgLyByZXN1bHQub3JpZ2luYWwuc2l6ZSA6IDA7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBjaGFuZ2VkOiByZXN1bHQuY2hhbmdlZCxcclxuICAgIHJlYXNvbjogcmVzdWx0LnJlYXNvbixcclxuICAgIHJlc2l6ZWQ6IHJlc3VsdC5yZXNpemVkLFxyXG4gICAgcmVlbmNvZGVkOiByZXN1bHQucmVlbmNvZGVkLFxyXG4gICAgZWxhcHNlZE1zOiByZXN1bHQuZWxhcHNlZE1zLFxyXG4gICAgb3JpZ2luYWw6IHtcclxuICAgICAgLi4ucmVzdWx0Lm9yaWdpbmFsLFxyXG4gICAgICBzaXplVGV4dDogZm9ybWF0RmlsZVNpemUocmVzdWx0Lm9yaWdpbmFsLnNpemUpLFxyXG4gICAgfSxcclxuICAgIG91dHB1dDoge1xyXG4gICAgICAuLi5yZXN1bHQub3V0cHV0LFxyXG4gICAgICBzaXplVGV4dDogZm9ybWF0RmlsZVNpemUocmVzdWx0Lm91dHB1dC5zaXplKSxcclxuICAgIH0sXHJcbiAgICBzYXZlZEJ5dGVzLFxyXG4gICAgc2F2ZWRUZXh0OiBmb3JtYXRGaWxlU2l6ZShzYXZlZEJ5dGVzKSxcclxuICAgIHNhdmVkUmF0aW86IE51bWJlcihzYXZlZFJhdGlvLnRvRml4ZWQoNCkpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzID0gKFxyXG4gIGVycm9yczogQXJyYXk8eyBGaWVsZD86IHVua25vd247IE1lc3NhZ2U/OiB1bmtub3duIH0gfCBudWxsIHwgdW5kZWZpbmVkPiB8IG51bGwgfCB1bmRlZmluZWRcclxuKTogc3RyaW5nID0+IHtcclxuICBpZiAoIUFycmF5LmlzQXJyYXkoZXJyb3JzKSB8fCBlcnJvcnMubGVuZ3RoID09PSAwKSByZXR1cm4gXCJcIjtcclxuXHJcbiAgcmV0dXJuIGVycm9yc1xyXG4gICAgLm1hcCgoZW50cnkpID0+IHtcclxuICAgICAgY29uc3QgZmllbGQgPSBzYWZlVGV4dChlbnRyeT8uRmllbGQpO1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gc2FmZVRleHQoZW50cnk/Lk1lc3NhZ2UpO1xyXG4gICAgICBpZiAoZmllbGQgJiYgbWVzc2FnZSkgcmV0dXJuIGAke2ZpZWxkfTogJHttZXNzYWdlfWA7XHJcbiAgICAgIHJldHVybiBtZXNzYWdlIHx8IGZpZWxkO1xyXG4gICAgfSlcclxuICAgIC5maWx0ZXIoQm9vbGVhbilcclxuICAgIC5qb2luKFwiIHwgXCIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0RmxvdyA9ICh7XHJcbiAgc2hlZXRJZCA9IFwiXCIsXHJcbiAgcHJvamVjdElkID0gXCJcIixcclxuICBjdXJyZW5jeUNvZGUgPSBcIlwiLFxyXG4gIGF4VXNlcklkT3ZlcnJpZGUgPSBcIlwiLFxyXG4gIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgaXNDcmVhdGVNb2RlLFxyXG4gIGlzU2hlZXRMb2NrZWQsXHJcbiAgbGlua1RvU2hlZXQgPSB0cnVlLFxyXG4gIG9uRm9yYmlkZGVuLFxyXG4gIG9uQ29tcGxldGVkLFxyXG59OiBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzKSA9PiB7XHJcbiAgY29uc3QgW3NvdXJjZVBpY2tlck9wZW4sIHNldFNvdXJjZVBpY2tlck9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcHJvZ3Jlc3NLZXksIHNldFByb2dyZXNzS2V5XSA9IHVzZVN0YXRlPFF1aWNrRmxvd1Byb2dyZXNzS2V5IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2Rpc3BsYXlQcm9ncmVzc0tleSwgc2V0RGlzcGxheVByb2dyZXNzS2V5XSA9IHVzZVN0YXRlPFF1aWNrRmxvd1Byb2dyZXNzS2V5IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3Byb2dyZXNzRWxhcHNlZE1zLCBzZXRQcm9ncmVzc0VsYXBzZWRNc10gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW2F0dGVtcHRJZCwgc2V0QXR0ZW1wdElkXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFt0cmFjZUxpc3QsIHNldFRyYWNlTGlzdF0gPSB1c2VTdGF0ZTxUaWNrZXRUcmFjZUVudHJ5W10+KFtdKTtcclxuICBjb25zdCBbcGFydGlhbFRpY2tldEZhaWx1cmUsIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlXSA9IHVzZVN0YXRlPFF1aWNrQ3JlYXRlUGFydGlhbFRpY2tldFN0YXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgbGF0ZXN0RmlsZVJlZiA9IHVzZVJlZjx7IGNhY2hlS2V5OiBzdHJpbmc7IGZpbGU6IEZpbGUgfSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByb2dyZXNzU3RhcnRlZEF0UmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBwcm9ncmVzc01lc3NhZ2UgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGVmZmVjdGl2ZVByb2dyZXNzS2V5ID0gZGlzcGxheVByb2dyZXNzS2V5IHx8IHByb2dyZXNzS2V5O1xyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcInVwbG9hZGluZ0ltYWdlXCIpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfVXBsb2FkaW5nSW1hZ2VcIiwgXCJVcGxvYWRpbmcgaW1hZ2UuLi5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwiY3JlYXRpbmdUaWNrZXRcIikge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19DcmVhdGluZ1RpY2tldFwiLCBcIkNyZWF0aW5nIHRpY2tldC4uLlwiKTtcclxuICAgIH1cclxuICAgIGlmIChlZmZlY3RpdmVQcm9ncmVzc0tleSA9PT0gXCJzeW5jaW5nRmlsZVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX1N5bmNpbmdGaWxlXCIsIFwiU3luY2luZyBmaWxlLi4uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcImZpbmFsaXppbmdJYVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0ZpbmFsaXppbmdcIiwgXCJGaW5hbGl6aW5nIElBLi4uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcImxpbmtpbmdFeHBlbnNlTGluZVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0xpbmtpbmdMaW5lXCIsIFwiTGlua2luZyBleHBlbnNlIGxpbmUuLi5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0RvbmVcIiwgXCJEb25lXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfSwgW2Rpc3BsYXlQcm9ncmVzc0tleSwgcHJvZ3Jlc3NLZXldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghYnVzeSB8fCBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50ID09PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgc3luY0VsYXBzZWQgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQ7XHJcbiAgICAgIGlmIChzdGFydGVkQXQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoTWF0aC5tYXgoMCwgRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzeW5jRWxhcHNlZCgpO1xyXG4gICAgY29uc3QgaW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbChzeW5jRWxhcHNlZCwgMjUwKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gICAgfTtcclxuICB9LCBbYnVzeV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5KSB7XHJcbiAgICAgIGlmIChwcm9ncmVzc0tleSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShwcm9ncmVzc0tleSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gbnVsbCB8fCBwcm9ncmVzc0tleSA9PT0gXCJ1cGxvYWRpbmdJbWFnZVwiIHx8IHByb2dyZXNzS2V5ID09PSBcImRvbmVcIikge1xyXG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkocHJvZ3Jlc3NLZXkpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KHByb2dyZXNzS2V5KTtcclxuICAgIGlmIChwcm9ncmVzc0tleSAhPT0gXCJjcmVhdGluZ1RpY2tldFwiKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0aW1lcnM6IG51bWJlcltdID0gW1xyXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwic3luY2luZ0ZpbGVcIik7XHJcbiAgICAgIH0sIFFVSUNLX1RJQ0tFVF9WSVNVQUxfU1RBR0VfTVMuc3luY2luZ0ZpbGUpLFxyXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwiZmluYWxpemluZ0lhXCIpO1xyXG4gICAgICB9LCBRVUlDS19USUNLRVRfVklTVUFMX1NUQUdFX01TLmZpbmFsaXppbmdJYSksXHJcbiAgICBdO1xyXG5cclxuICAgIGlmIChsaW5rVG9TaGVldCkge1xyXG4gICAgICB0aW1lcnMucHVzaChcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJsaW5raW5nRXhwZW5zZUxpbmVcIik7XHJcbiAgICAgICAgfSwgUVVJQ0tfVElDS0VUX1ZJU1VBTF9TVEFHRV9NUy5saW5raW5nRXhwZW5zZUxpbmUpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGltZXJzLmZvckVhY2goKHRpbWVySWQpID0+IHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZCkpO1xyXG4gICAgfTtcclxuICB9LCBbYnVzeSwgbGlua1RvU2hlZXQsIHByb2dyZXNzS2V5XSk7XHJcblxyXG4gIGNvbnN0IHByb2dyZXNzU3RhZ2VzID0gdXNlTWVtbzxRdWlja1RpY2tldFByb2dyZXNzU3RhZ2VbXT4oKCkgPT4ge1xyXG4gICAgY29uc3QgdmlzaWJsZVN0YWdlczogUXVpY2tGbG93UHJvZ3Jlc3NLZXlbXSA9IGxpbmtUb1NoZWV0XHJcbiAgICAgID8gW1widXBsb2FkaW5nSW1hZ2VcIiwgXCJjcmVhdGluZ1RpY2tldFwiLCBcInN5bmNpbmdGaWxlXCIsIFwiZmluYWxpemluZ0lhXCIsIFwibGlua2luZ0V4cGVuc2VMaW5lXCJdXHJcbiAgICAgIDogW1widXBsb2FkaW5nSW1hZ2VcIiwgXCJjcmVhdGluZ1RpY2tldFwiLCBcInN5bmNpbmdGaWxlXCIsIFwiZmluYWxpemluZ0lhXCJdO1xyXG5cclxuICAgIGNvbnN0IHN0YWdlQ29weTogUmVjb3JkPFF1aWNrRmxvd1Byb2dyZXNzS2V5LCB7IHRpdGxlOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmcgfT4gPSB7XHJcbiAgICAgIHVwbG9hZGluZ0ltYWdlOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19QcmVwYXJlX1RpdGxlXCIsIFwiUHJlcGFyaW5nIGltYWdlXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19QcmVwYXJlX0JvZHlcIixcclxuICAgICAgICAgIFwiV2UgdmFsaWRhdGUgdGhlIGltYWdlIGFuZCBwcmVwYXJlIGl0IGZvciBhIHJlbGlhYmxlIHVwbG9hZC5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIGNyZWF0aW5nVGlja2V0OiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19DcmVhdGVfVGl0bGVcIiwgXCJDcmVhdGluZyB0aWNrZXRcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0NyZWF0ZV9Cb2R5XCIsXHJcbiAgICAgICAgICBcIlRoZSBiYWNrZW5kIHJlc2VydmVzIHRoZSB0aWNrZXQgYW5kIHN0YXJ0cyB0aGUgc2VydmVyLXNpZGUgZmxvdy5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIHN5bmNpbmdGaWxlOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19GaWxlX1RpdGxlXCIsIFwiU3luY2luZyBmaWxlXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19GaWxlX0JvZHlcIixcclxuICAgICAgICAgIFwiVGhlIHVwbG9hZGVkIGltYWdlIGlzIGJlaW5nIGF0dGFjaGVkIHRvIHRoZSB0aWNrZXQgcmVjb3JkLlwiXHJcbiAgICAgICAgKSxcclxuICAgICAgfSxcclxuICAgICAgZmluYWxpemluZ0lhOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19JYV9UaXRsZVwiLCBcIlJlYWRpbmcgdGlja2V0IGRhdGFcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0lhX0JvZHlcIixcclxuICAgICAgICAgIFwiV2UgYXJlIGV4dHJhY3RpbmcgZGF0ZSwgYW1vdW50IGFuZCBkZXNjcmlwdGlvbiBmcm9tIHRoZSBpbWFnZS5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbmtpbmdFeHBlbnNlTGluZToge1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfTGlua19UaXRsZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19MaW5rX0JvZHlcIixcclxuICAgICAgICAgIFwiVGhlIGdlbmVyYXRlZCB0aWNrZXQgaXMgYmVpbmcgY29ubmVjdGVkIHRvIHRoZSBjdXJyZW50IGV4cGVuc2Ugc2hlZXQuXCJcclxuICAgICAgICApLFxyXG4gICAgICB9LFxyXG4gICAgICBkb25lOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRG9uZVwiLCBcIkRvbmVcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRG9uZVwiLCBcIkRvbmVcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGFjdGl2ZVN0YWdlS2V5ID1cclxuICAgICAgcHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiID8gdmlzaWJsZVN0YWdlc1t2aXNpYmxlU3RhZ2VzLmxlbmd0aCAtIDFdIDogZGlzcGxheVByb2dyZXNzS2V5IHx8IHByb2dyZXNzS2V5O1xyXG4gICAgY29uc3QgYWN0aXZlU3RhZ2VJbmRleCA9IGFjdGl2ZVN0YWdlS2V5ID8gdmlzaWJsZVN0YWdlcy5pbmRleE9mKGFjdGl2ZVN0YWdlS2V5KSA6IC0xO1xyXG5cclxuICAgIHJldHVybiB2aXNpYmxlU3RhZ2VzLm1hcCgoc3RhZ2VLZXksIGluZGV4KSA9PiAoe1xyXG4gICAgICBrZXk6IHN0YWdlS2V5LFxyXG4gICAgICB0aXRsZTogc3RhZ2VDb3B5W3N0YWdlS2V5XS50aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb246IHN0YWdlQ29weVtzdGFnZUtleV0uZGVzY3JpcHRpb24sXHJcbiAgICAgIHN0YXRlOlxyXG4gICAgICAgIHByb2dyZXNzS2V5ID09PSBcImRvbmVcIiB8fCAoYWN0aXZlU3RhZ2VJbmRleCA+PSAwICYmIGluZGV4IDwgYWN0aXZlU3RhZ2VJbmRleClcclxuICAgICAgICAgID8gXCJjb21wbGV0ZWRcIlxyXG4gICAgICAgICAgOiBpbmRleCA9PT0gYWN0aXZlU3RhZ2VJbmRleFxyXG4gICAgICAgICAgICA/IFwiYWN0aXZlXCJcclxuICAgICAgICAgICAgOiBcInBlbmRpbmdcIixcclxuICAgIH0pKTtcclxuICB9LCBbZGlzcGxheVByb2dyZXNzS2V5LCBsaW5rVG9TaGVldCwgcHJvZ3Jlc3NLZXldKTtcclxuXHJcbiAgY29uc3QgYWRkVHJhY2UgPSB1c2VDYWxsYmFjaygoc3RlcDogc3RyaW5nLCB0cmFjZUlkOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHNhZmVUcmFjZUlkID0gc2FmZVRleHQodHJhY2VJZCk7XHJcbiAgICBpZiAoIXNhZmVUcmFjZUlkKSByZXR1cm47XHJcblxyXG4gICAgc2V0VHJhY2VMaXN0KChwcmV2aW91cykgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0ID0gW1xyXG4gICAgICAgIC4uLnByZXZpb3VzLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0ZXAsXHJcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVHJhY2VJZCxcclxuICAgICAgICAgIGF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgfSxcclxuICAgICAgXTtcclxuICAgICAgcGVyc2lzdFRyYWNlTGlzdChuZXh0KTtcclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyQ2FjaGVkQ3VycmVudEltYWdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgY2FjaGVLZXkgPSBsYXRlc3RGaWxlUmVmLmN1cnJlbnQ/LmNhY2hlS2V5O1xyXG4gICAgaWYgKCFjYWNoZUtleSkgcmV0dXJuO1xyXG4gICAgdm9pZCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpLmNhdGNoKCgpID0+IHtcclxuICAgICAgLy8gSWdub3JlIGNhY2hlIGNsZWFudXAgZmFpbHVyZXMgaW4gcmVzdHJpY3RlZCBicm93c2VyIGNvbnRleHRzLlxyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckZsb3dTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgc2V0VHJhY2VMaXN0KFtdKTtcclxuICAgIHBlcnNpc3RUcmFjZUxpc3QoW10pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgYnVpbGRBcGlPcHRpb25zID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUF4VXNlcklkID0gc2FmZVRleHQoYXhVc2VySWRPdmVycmlkZSk7XHJcbiAgICBpZiAoIXNhZmVBeFVzZXJJZCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJYLUlORC1BeFVzZXJJZFwiOiBzYWZlQXhVc2VySWQsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH0sIFtheFVzZXJJZE92ZXJyaWRlXSk7XHJcblxyXG4gIGNvbnN0IGVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbiA9IHVzZUNhbGxiYWNrKCgpOiBib29sZWFuID0+IHtcclxuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSB8fCBpc0NyZWF0ZU1vZGUgfHwgaXNTaGVldExvY2tlZCB8fCAobGlua1RvU2hlZXQgJiYgIXNoZWV0SWQpKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzU2hlZXRMb2NrZWQsIGxpbmtUb1NoZWV0LCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlVWlFcnJvck1lc3NhZ2UgPSB1c2VDYWxsYmFjaygoZXJyb3I6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xyXG4gICAgICBjb25zdCB2YWxpZGF0aW9uVGV4dCA9IGZvcm1hdFZhbGlkYXRpb25FcnJvcnMoZXJyb3IudmFsaWRhdGlvbkVycm9ycyk7XHJcbiAgICAgIGlmICh2YWxpZGF0aW9uVGV4dCkge1xyXG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uVGV4dDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDI5KSB7XHJcbiAgICAgICAgcmV0dXJuIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9SYXRlTGltaXRcIiwgXCJUb28gbWFueSByZXF1ZXN0cy5cIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob3RGb3VuZFwiLCBcIlJlY29yZCBub3QgZm91bmQuXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfU2VydmVyXCIsIFwiU2VydmVyIGVycm9yLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcclxuICAgICAgOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBhZGRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhY2VzID0gdXNlQ2FsbGJhY2soXHJcbiAgICAocmVzcG9uc2U6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0KSA9PiB7XHJcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LXF1aWNrLWNyZWF0ZVwiLCBzYWZlVGV4dChyZXNwb25zZS5UcmFjZUlkKSk7XHJcblxyXG4gICAgICBjb25zdCBzdGVwVHJhY2VJZHMgPSByZXNwb25zZS5EYXRhPy5TdGVwVHJhY2VJZHM7XHJcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LWNyZWF0ZVwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LlRpY2tldENyZWF0ZSkpO1xyXG4gICAgICBhZGRUcmFjZShcInRpY2tldC1maWxlLXVwbG9hZFwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LkZpbGVVcGxvYWQpKTtcclxuICAgICAgYWRkVHJhY2UoXCJleHBlbnNlZnJvbXRpY2tldFwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LkRyYWZ0RXh0cmFjdCkpO1xyXG4gICAgICBhZGRUcmFjZShcInRpY2tldC1maW5hbGl6ZVwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LlRpY2tldEZpbmFsaXplKSk7XHJcbiAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZS1zaGVldC1saW5rXCIsIHNhZmVUZXh0KHN0ZXBUcmFjZUlkcz8uU2hlZXRMaW5rKSk7XHJcbiAgICB9LFxyXG4gICAgW2FkZFRyYWNlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVRdWlja0NyZWF0ZUZhaWx1cmVNZXNzYWdlID0gdXNlQ2FsbGJhY2soKHJlc3BvbnNlOiBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCk6IHN0cmluZyA9PiB7XHJcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuRGF0YTtcclxuICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGRhdGE/LkZpbGVJZCk7XHJcbiAgICBjb25zdCBjb21wbGV0ZWRTdGFnZSA9IHNhZmVUZXh0KGRhdGE/LkNvbXBsZXRlZFN0YWdlKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpO1xyXG4gICAgY29uc3QgdmFsaWRhdGlvblRleHQgPSBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzKHJlc3BvbnNlLkVycm9ycyk7XHJcbiAgICBjb25zdCByZXRyeUFmdGVyID0gc2FmZVRleHQocmVzcG9uc2UuUmV0cnlBZnRlcik7XHJcbiAgICBjb25zdCBtZXNzYWdlUGFydHM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLkh0dHBTdGF0dXMgPT09IDQyOSkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChyZXNwb25zZU1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1JhdGVMaW1pdFwiLCBcIlRvbyBtYW55IHJlcXVlc3RzLlwiKSk7XHJcbiAgICAgIGlmIChyZXRyeUFmdGVyKSB7XHJcbiAgICAgICAgbWVzc2FnZVBhcnRzLnB1c2goXHJcbiAgICAgICAgICBpbmRGb3JtYXQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9SZXRyeUFmdGVySGludFwiLCBcIlJldHJ5IGFmdGVyIHswfS5cIiwgcmV0cnlBZnRlcilcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb25UZXh0KSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKHZhbGlkYXRpb25UZXh0KTtcclxuICAgIH0gZWxzZSBpZiAocmVzcG9uc2VNZXNzYWdlKSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKHJlc3BvbnNlTWVzc2FnZSk7XHJcbiAgICB9IGVsc2UgaWYgKGZpbGVJZCkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChcclxuICAgICAgICBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9QYXJ0aWFsXCIsXHJcbiAgICAgICAgICBcIlRoZSB0aWNrZXQgd2FzIGNyZWF0ZWQsIGJ1dCB0aGUgZnVsbCBwcm9jZXNzIGRpZCBub3QgZmluaXNoLlwiXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA0MDQpIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX05vdEZvdW5kXCIsIFwiUmVjb3JkIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA1MDApIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1NlcnZlclwiLCBcIlNlcnZlciBlcnJvci5cIikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmlsZUlkICYmIGNvbXBsZXRlZFN0YWdlKSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZEZvcm1hdChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1N0YWdlXCIsIFwiQ29tcGxldGVkIHN0YWdlOiB7MH0uXCIsIGNvbXBsZXRlZFN0YWdlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lc3NhZ2VQYXJ0cy5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjb21wbGV0ZUZsb3dTdWNjZXNzID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAoZmlsZUlkOiBzdHJpbmcsIGxpbmtlZFRvU2hlZXQ6IGJvb2xlYW4sIGNhY2hlS2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJkb25lXCIpO1xyXG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJkb25lXCIpO1xyXG4gICAgICBhd2FpdCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpO1xyXG4gICAgICBzZXRBdHRlbXB0SWQoXCJcIik7XHJcbiAgICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgIG9uQ29tcGxldGVkPy4oeyBmaWxlSWQsIGxpbmtlZFRvU2hlZXQgfSk7XHJcbiAgICB9LFxyXG4gICAgW29uQ29tcGxldGVkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJ1blF1aWNrQ3JlYXRlRmxvdyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUsIGNhY2hlS2V5OiBzdHJpbmcsIGNvbnRleHQ6IFF1aWNrVGlja2V0QXR0ZW1wdENvbnRleHQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgICAgc2V0QnVzeSh0cnVlKTtcclxuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJjcmVhdGluZ1RpY2tldFwiKTtcclxuICAgICAgY2xlYXJGbG93U3RhdGUoKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlcXVlc3RTdGFydGVkQXQgPSBEYXRlLm5vdygpO1xyXG4gICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJxdWljay1jcmVhdGUucmVxdWVzdC5zdGFydGVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxyXG4gICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXHJcbiAgICAgICAgbGlua1RvU2hlZXQsXHJcbiAgICAgICAgY2FjaGVLZXksXHJcbiAgICAgICAgZWxhcHNlZFNpbmNlU2VsZWN0aW9uTXM6IE1hdGgubWF4KDAsIHJlcXVlc3RTdGFydGVkQXQgLSBjb250ZXh0LnN0YXJ0ZWRBdCksXHJcbiAgICAgICAgdXBsb2FkRmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcclxuICAgICAgICBvcHRpbWl6YXRpb246IGJ1aWxkT3B0aW1pemF0aW9uTG9nRGF0YShjb250ZXh0Lm9wdGltaXphdGlvbiksXHJcbiAgICAgICAgc2hlZXRJZDogbGlua1RvU2hlZXQgPyBzYWZlVGV4dChzaGVldElkKSA6IFwiXCIsXHJcbiAgICAgICAgcHJvamVjdElkOiBsaW5rVG9TaGVldCA/IHNhZmVUZXh0KHByb2plY3RJZCkgOiBcIlwiLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayhcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGlja2V0SW1hZ2U6IGZpbGUsXHJcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQoc2hlZXRJZCkgfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBwcm9qSWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQocHJvamVjdElkKSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYnVpbGRBcGlPcHRpb25zKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBhZGRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhY2VzKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VFbGFwc2VkTXMgPSBNYXRoLm1heCgwLCBEYXRlLm5vdygpIC0gcmVxdWVzdFN0YXJ0ZWRBdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LkZpbGVJZCk7XHJcbiAgICAgICAgY29uc3QgbGlua2VkVG9TaGVldCA9IHJlc3BvbnNlLkRhdGE/LkxpbmtlZFRvU2hlZXQgPT09IHRydWU7XHJcbiAgICAgICAgY29uc3QgcGFydGlhbFN0YXRlID1cclxuICAgICAgICAgIGZpbGVJZFxyXG4gICAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgICAgICAgIGxpbmtlZFRvU2hlZXQsXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uQ29tcGxldGVkU3RhZ2UpLFxyXG4gICAgICAgICAgICAgICAgdXJsRmlsZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uVXJsRmlsZSksXHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uRmlsZU5hbWUpLFxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcmVzcG9uc2UuRGF0YT8uUHJvY2Vzc2VkQnlBSSA/PyBudWxsLFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgOiBudWxsO1xyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2UuU3VjY2VzcyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgaWYgKCFmaWxlSWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob0ZpbGVJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIHRpY2tldCBmaWxlIGlkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYXdhaXQgY29tcGxldGVGbG93U3VjY2VzcyhmaWxlSWQsIGxpbmtlZFRvU2hlZXQsIGNhY2hlS2V5KTtcclxuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LnN1Y2NlZWRlZFwiLCB7XHJcbiAgICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXHJcbiAgICAgICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXHJcbiAgICAgICAgICAgIGVsYXBzZWRNczogcmVzcG9uc2VFbGFwc2VkTXMsXHJcbiAgICAgICAgICAgIGh0dHBTdGF0dXM6IHJlc3BvbnNlLkh0dHBTdGF0dXMsXHJcbiAgICAgICAgICAgIHRyYWNlSWQ6IHNhZmVUZXh0KHJlc3BvbnNlLlRyYWNlSWQpLFxyXG4gICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgIGxpbmtlZFRvU2hlZXQsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlZFN0YWdlOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5Db21wbGV0ZWRTdGFnZSksXHJcbiAgICAgICAgICAgIHByb2Nlc3NlZEJ5QUk6IHJlc3BvbnNlLkRhdGE/LlByb2Nlc3NlZEJ5QUkgPz8gbnVsbCxcclxuICAgICAgICAgICAgc3RlcFRyYWNlSWRzOiByZXNwb25zZS5EYXRhPy5TdGVwVHJhY2VJZHMgPz8gbnVsbCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcnRpYWxTdGF0ZSkge1xyXG4gICAgICAgICAgc2V0UGFydGlhbFRpY2tldEZhaWx1cmUocGFydGlhbFN0YXRlKTtcclxuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInF1aWNrLWNyZWF0ZS5wYXJ0aWFsLXN0YXRlXCIsIHtcclxuICAgICAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcclxuICAgICAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcclxuICAgICAgICAgICAgZWxhcHNlZE1zOiByZXNwb25zZUVsYXBzZWRNcyxcclxuICAgICAgICAgICAgZmlsZUlkOiBwYXJ0aWFsU3RhdGUuZmlsZUlkLFxyXG4gICAgICAgICAgICBsaW5rZWRUb1NoZWV0OiBwYXJ0aWFsU3RhdGUubGlua2VkVG9TaGVldCxcclxuICAgICAgICAgICAgY29tcGxldGVkU3RhZ2U6IHBhcnRpYWxTdGF0ZS5jb21wbGV0ZWRTdGFnZSxcclxuICAgICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcGFydGlhbFN0YXRlLnByb2Nlc3NlZEJ5QUksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRNZXNzYWdlID0gcmVzb2x2ZVF1aWNrQ3JlYXRlRmFpbHVyZU1lc3NhZ2UocmVzcG9uc2UpO1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LmNvbXBsZXRlZC13aXRoLWVycm9yXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxyXG4gICAgICAgICAgZWxhcHNlZE1zOiByZXNwb25zZUVsYXBzZWRNcyxcclxuICAgICAgICAgIGh0dHBTdGF0dXM6IHJlc3BvbnNlLkh0dHBTdGF0dXMsXHJcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVGV4dChyZXNwb25zZS5UcmFjZUlkKSxcclxuICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgIGxpbmtlZFRvU2hlZXQsXHJcbiAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uQ29tcGxldGVkU3RhZ2UpLFxyXG4gICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcmVzcG9uc2UuRGF0YT8uUHJvY2Vzc2VkQnlBSSA/PyBudWxsLFxyXG4gICAgICAgICAgcmV0cnlBZnRlcjogc2FmZVRleHQocmVzcG9uc2UuUmV0cnlBZnRlciksXHJcbiAgICAgICAgICBtZXNzYWdlOiBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSxcclxuICAgICAgICAgIHJlc29sdmVkTWVzc2FnZSxcclxuICAgICAgICAgIGVycm9yczogQXJyYXkuaXNBcnJheShyZXNwb25zZS5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogW10sXHJcbiAgICAgICAgICBzdGVwVHJhY2VJZHM6IHJlc3BvbnNlLkRhdGE/LlN0ZXBUcmFjZUlkcyA/PyBudWxsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNvbHZlZE1lc3NhZ2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcclxuICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LXF1aWNrLWNyZWF0ZS1lcnJvclwiLCBleHRyYWN0VHJhY2VJZEZyb21FcnJvcihlcnJvcikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRFcnJvcihcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LmZhaWxlZFwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcclxuICAgICAgICAgIGVsYXBzZWRNczogTWF0aC5tYXgoMCwgRGF0ZS5ub3coKSAtIHJlcXVlc3RTdGFydGVkQXQpLFxyXG4gICAgICAgICAgdXBsb2FkRmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcclxuICAgICAgICAgIHRyYWNlSWQ6IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGV4dHJhY3RUcmFjZUlkRnJvbUVycm9yKGVycm9yKSA6IFwiXCIsXHJcbiAgICAgICAgICBzdGF0dXM6IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLnN0YXR1cyA6IG51bGwsXHJcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgOiBcIlwiLFxyXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yczogZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yID8gZXJyb3IudmFsaWRhdGlvbkVycm9ycyA6IFtdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVVaUVycm9yTWVzc2FnZShlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBhZGRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhY2VzLFxyXG4gICAgICBhZGRUcmFjZSxcclxuICAgICAgYnVpbGRBcGlPcHRpb25zLFxyXG4gICAgICBjbGVhckZsb3dTdGF0ZSxcclxuICAgICAgY29tcGxldGVGbG93U3VjY2VzcyxcclxuICAgICAgY3VycmVuY3lDb2RlLFxyXG4gICAgICBsaW5rVG9TaGVldCxcclxuICAgICAgcHJvamVjdElkLFxyXG4gICAgICByZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZSxcclxuICAgICAgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlLFxyXG4gICAgICBzaGVldElkLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdGVkRmlsZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUgfCBudWxsLCBzb3VyY2U6IFRpY2tldEltYWdlU291cmNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAgIGlmICghZmlsZSkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgYXR0ZW1wdElkID0gcmVzb2x2ZVJhbmRvbUtleSgpO1xyXG4gICAgICBjb25zdCBzZWxlY3Rpb25TdGFydGVkQXQgPSBEYXRlLm5vdygpO1xyXG4gICAgICBzZXRBdHRlbXB0SWQoYXR0ZW1wdElkKTtcclxuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwic2VsZWN0aW9uLnJlY2VpdmVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIGxpbmtUb1NoZWV0LFxyXG4gICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24oKSkge1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5mb3JiaWRkZW5cIiwge1xyXG4gICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgbGlua1RvU2hlZXQsXHJcbiAgICAgICAgICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICAgICAgaXNTaGVldExvY2tlZCxcclxuICAgICAgICAgIGhhc1NoZWV0SWQ6ICEhc2FmZVRleHQoc2hlZXRJZCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzYWZlVHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKHNhZmVUeXBlICYmICFzYWZlVHlwZS5zdGFydHNXaXRoKFwiaW1hZ2UvXCIpICYmICEvXFwuKGpwZT9nfHBuZ3x3ZWJwKSQvaS50ZXN0KGZpbGUubmFtZSB8fCBcIlwiKSkge1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5pbnZhbGlkLWZpbGUtdHlwZVwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxyXG4gICAgICAgICAgcmVhc29uOiBcIm1pbWUtYW5kLWV4dGVuc2lvbi1ub3Qtc3VwcG9ydGVkXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlVHlwZVwiLCBcIlVuc3VwcG9ydGVkIGltYWdlIGZvcm1hdC5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlKGZpbGUpKSB7XHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwic2VsZWN0aW9uLmludmFsaWQtZmlsZS10eXBlXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgICAgICByZWFzb246IFwidW5zdXBwb3J0ZWQtdGlja2V0LWltYWdlLWZpbGVcIixcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjbGVhckZsb3dTdGF0ZSgpO1xyXG4gICAgICBzZXRQcm9ncmVzc0tleShcInVwbG9hZGluZ0ltYWdlXCIpO1xyXG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJ1cGxvYWRpbmdJbWFnZVwiKTtcclxuICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IHNlbGVjdGlvblN0YXJ0ZWRBdDtcclxuICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcIm9wdGltaXphdGlvbi5zdGFydGVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3Qgb3B0aW1pemF0aW9uUmVzdWx0ID0gYXdhaXQgb3B0aW1pemVUaWNrZXRJbWFnZUZvclVwbG9hZChmaWxlKS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJvcHRpbWl6YXRpb24uZmFpbGVkXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgOiBcIlwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBidWlsZEZhbGxiYWNrT3B0aW1pemF0aW9uUmVzdWx0KGZpbGUpO1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgdXBsb2FkRmlsZSA9IG9wdGltaXphdGlvblJlc3VsdC5maWxlO1xyXG4gICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJvcHRpbWl6YXRpb24uY29tcGxldGVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIC4uLmJ1aWxkT3B0aW1pemF0aW9uTG9nRGF0YShvcHRpbWl6YXRpb25SZXN1bHQpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh1cGxvYWRGaWxlLnNpemUgPiBNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMpIHtcclxuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJzZWxlY3Rpb24ucmVqZWN0ZWQtYnktc2l6ZVwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBtYXhTaXplQnl0ZXM6IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyxcclxuICAgICAgICAgIG1heFNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMpLFxyXG4gICAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YSh1cGxvYWRGaWxlKSxcclxuICAgICAgICAgIG9wdGltaXphdGlvbjogYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhKG9wdGltaXphdGlvblJlc3VsdCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHNldFByb2dyZXNzRWxhcHNlZE1zKDApO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfRmlsZVNpemVcIiwgXCJJbWFnZSBleGNlZWRzIDUwTUIgbWF4IHNpemUuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNhY2hlS2V5ID0gYXR0ZW1wdElkO1xyXG4gICAgICBsYXRlc3RGaWxlUmVmLmN1cnJlbnQgPSB7IGNhY2hlS2V5LCBmaWxlOiB1cGxvYWRGaWxlIH07XHJcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcImNhY2hlLnN0b3JlLnN0YXJ0ZWRcIiwge1xyXG4gICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgY2FjaGVLZXksXHJcbiAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YSh1cGxvYWRGaWxlKSxcclxuICAgICAgfSk7XHJcbiAgICAgIHZvaWQgY2FjaGVJbWFnZUZpbGUoY2FjaGVLZXksIHVwbG9hZEZpbGUpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwiY2FjaGUuc3RvcmUuY29tcGxldGVkXCIsIHtcclxuICAgICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICAgIGNhY2hlS2V5LFxyXG4gICAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKHVwbG9hZEZpbGUpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJjYWNoZS5zdG9yZS5mYWlsZWRcIiwge1xyXG4gICAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgICAgY2FjaGVLZXksXHJcbiAgICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEodXBsb2FkRmlsZSksXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSA6IFwiXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IHJ1blF1aWNrQ3JlYXRlRmxvdyh1cGxvYWRGaWxlLCBjYWNoZUtleSwge1xyXG4gICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgc3RhcnRlZEF0OiBzZWxlY3Rpb25TdGFydGVkQXQsXHJcbiAgICAgICAgb3B0aW1pemF0aW9uOiBvcHRpbWl6YXRpb25SZXN1bHQsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtjYW5DcmVhdGVFeHBlbnNlLCBjbGVhckZsb3dTdGF0ZSwgZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uLCBpc0NyZWF0ZU1vZGUsIGlzU2hlZXRMb2NrZWQsIGxpbmtUb1NoZWV0LCBydW5RdWlja0NyZWF0ZUZsb3csIHNoZWV0SWRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmV0cnlQZW5kaW5nVXBsb2FkID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgb3BlblNvdXJjZVBpY2tlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uKCkpIHJldHVybjtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgc2V0U291cmNlUGlja2VyT3Blbih0cnVlKTtcclxuICB9LCBbZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uXSk7XHJcblxyXG4gIGNvbnN0IGNsb3NlU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xyXG4gIH0sIFtidXN5XSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdEZyb21DYW1lcmEgPSB1c2VDYWxsYmFjaygoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcclxuICAgIC8vIFNhZmFyaS9pUGhvbmUgZXhwZWN0cyB0aGUgY2FwdHVyZSBwaWNrZXIgdG8gb3BlbiBmcm9tIHRoZSBhY3RpdmUgdXNlciBnZXN0dXJlLlxyXG4gICAgLy8gUHJlLXJlcXVlc3RpbmcgY2FtZXJhIGFjY2VzcyB3aXRoIGdldFVzZXJNZWRpYSgpIGludHJvZHVjZXMgYW4gYXN5bmMgYm91bmRhcnkgYW5kXHJcbiAgICAvLyBjYW4gbGVhdmUgaU9TIHNob3dpbmcgYW4gYWN0aXZlIGNhbWVyYSBzZXNzaW9uIHdpdGhvdXQgYSB2aXNpYmxlIHByZXZpZXcuXHJcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcclxuICAgIGlucHV0RWxlbWVudC5jbGljaygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0RnJvbUdhbGxlcnkgPSB1c2VDYWxsYmFjaygoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcclxuICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xyXG4gICAgaW5wdXRFbGVtZW50LmNsaWNrKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckVycm9yID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2UoKTtcclxuICAgIHNldEF0dGVtcHRJZChcIlwiKTtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcclxuICB9LCBbY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2VdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNvdXJjZVBpY2tlck9wZW4sXHJcbiAgICBidXN5LFxyXG4gICAgcHJvZ3Jlc3NLZXksXHJcbiAgICBwcm9ncmVzc01lc3NhZ2UsXHJcbiAgICBwcm9ncmVzc1N0YWdlcyxcclxuICAgIHByb2dyZXNzRWxhcHNlZE1zLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYXR0ZW1wdElkLFxyXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5OiBmYWxzZSxcclxuICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlOiBwYXJ0aWFsVGlja2V0RmFpbHVyZSAhPT0gbnVsbCxcclxuICAgIHRyYWNlTGlzdCxcclxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcclxuICAgIHNlbGVjdEZyb21DYW1lcmEsXHJcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcclxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcclxuICAgIHJldHJ5UGVuZGluZ1VwbG9hZCxcclxuICAgIGNsZWFyRXJyb3IsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG5jb25zdCBNQVhfVElDS0VUX1VQTE9BRF9MT05HX1NJREVfUFggPSAyMDQ4O1xyXG5jb25zdCBNSU5fVElDS0VUX1VQTE9BRF9TSE9SVF9TSURFX1BYID0gNzY4O1xyXG5jb25zdCBUSUNLRVRfUkVFTkNPREVfUVVBTElUWSA9IDAuODU7XHJcbmNvbnN0IE1JTl9USUNLRVRfUkVFTkNPREVfQllURVMgPSA0ICogMTAyNCAqIDEwMjQ7XHJcbmNvbnN0IE1JTl9USUNLRVRfUkVEVUNUSU9OX0JZVEVTID0gMjU2ICogMTAyNDtcclxuY29uc3QgTUlOX1RJQ0tFVF9SRURVQ1RJT05fUkFUSU8gPSAwLjEyO1xyXG5cclxudHlwZSBMb2FkZWRJbWFnZSA9IHtcclxuICBlbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgZGlzcG9zZTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0ID0ge1xyXG4gIGZpbGU6IEZpbGU7XHJcbiAgY2hhbmdlZDogYm9vbGVhbjtcclxuICByZWFzb246IHN0cmluZztcclxuICByZXNpemVkOiBib29sZWFuO1xyXG4gIHJlZW5jb2RlZDogYm9vbGVhbjtcclxuICBlbGFwc2VkTXM6IG51bWJlcjtcclxuICBvcmlnaW5hbDoge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgc2l6ZTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgICBoZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbiAgfTtcclxuICBvdXRwdXQ6IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHNpemU6IG51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXIgfCBudWxsO1xyXG4gICAgaGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVNaW1lVHlwZSA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiaW1hZ2UvcGpwZWdcIiB8fCBub3JtYWxpemVkID09PSBcImltYWdlL2pwZ1wiKSB7XHJcbiAgICByZXR1cm4gXCJpbWFnZS9qcGVnXCI7XHJcbiAgfVxyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuY29uc3QgcmVwbGFjZUZpbGVFeHRlbnNpb24gPSAoZmlsZU5hbWU6IHN0cmluZywgZXh0ZW5zaW9uOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGJhc2VOYW1lID0gc2FmZVRleHQoZmlsZU5hbWUpLnJlcGxhY2UoL1xcLlthLXowLTldKyQvaSwgXCJcIik7XHJcbiAgY29uc3Qgc2FmZUJhc2VOYW1lID0gYmFzZU5hbWUgfHwgXCJ0aWNrZXRcIjtcclxuICBjb25zdCBzYWZlRXh0ZW5zaW9uID0gc2FmZVRleHQoZXh0ZW5zaW9uKS5yZXBsYWNlKC9eXFwuLywgXCJcIikudG9Mb3dlckNhc2UoKSB8fCBcImpwZ1wiO1xyXG4gIHJldHVybiBgJHtzYWZlQmFzZU5hbWV9LiR7c2FmZUV4dGVuc2lvbn1gO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgb25lIGltYWdlIGVsZW1lbnQgc28gY2FudmFzIHJlc2l6aW5nIGtlZXBzIHRoZSBicm93c2VyLWRlY29kZWQgb3JpZW50YXRpb24uXHJcbmNvbnN0IGxvYWRJbWFnZSA9IGFzeW5jIChmaWxlOiBGaWxlKTogUHJvbWlzZTxMb2FkZWRJbWFnZSB8IG51bGw+ID0+IHtcclxuICBpZiAodHlwZW9mIEltYWdlID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBVUkwgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBvYmplY3RVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG4gIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgaW1hZ2UuZGVjb2RpbmcgPSBcImFzeW5jXCI7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoKTtcclxuICAgICAgaW1hZ2Uub25lcnJvciA9ICgpID0+IHJlamVjdChuZXcgRXJyb3IoXCJDb3VsZCBub3QgZGVjb2RlIGltYWdlLlwiKSk7XHJcbiAgICAgIGltYWdlLnNyYyA9IG9iamVjdFVybDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHdpZHRoID0gTnVtYmVyKGltYWdlLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aCB8fCAwKTtcclxuICAgIGNvbnN0IGhlaWdodCA9IE51bWJlcihpbWFnZS5uYXR1cmFsSGVpZ2h0IHx8IGltYWdlLmhlaWdodCB8fCAwKTtcclxuICAgIGlmICghKHdpZHRoID4gMCkgfHwgIShoZWlnaHQgPiAwKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbGVtZW50OiBpbWFnZSxcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgZGlzcG9zZTogKCkgPT4ge1xyXG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqZWN0VXJsKTtcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfSBjYXRjaCB7XHJcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlUmVzaXplRGltZW5zaW9ucyA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXI7IHJlc2l6ZWQ6IGJvb2xlYW4gfSA9PiB7XHJcbiAgY29uc3QgbG9uZ1NpZGUgPSBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KTtcclxuICBjb25zdCBzaG9ydFNpZGUgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KTtcclxuICBpZiAobG9uZ1NpZGUgPD0gTUFYX1RJQ0tFVF9VUExPQURfTE9OR19TSURFX1BYKSB7XHJcbiAgICByZXR1cm4geyB3aWR0aCwgaGVpZ2h0LCByZXNpemVkOiBmYWxzZSB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbWF4TG9uZ1NpZGVTY2FsZSA9IE1BWF9USUNLRVRfVVBMT0FEX0xPTkdfU0lERV9QWCAvIGxvbmdTaWRlO1xyXG4gIGNvbnN0IG1pblNob3J0U2lkZVNjYWxlID0gTUlOX1RJQ0tFVF9VUExPQURfU0hPUlRfU0lERV9QWCAvIHNob3J0U2lkZTtcclxuICBjb25zdCBzY2FsZSA9IE1hdGgubWF4KG1heExvbmdTaWRlU2NhbGUsIG1pblNob3J0U2lkZVNjYWxlKTtcclxuICBpZiAoIShzY2FsZSA8IDEpKSB7XHJcbiAgICByZXR1cm4geyB3aWR0aCwgaGVpZ2h0LCByZXNpemVkOiBmYWxzZSB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHdpZHRoOiBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHdpZHRoICogc2NhbGUpKSxcclxuICAgIGhlaWdodDogTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChoZWlnaHQgKiBzY2FsZSkpLFxyXG4gICAgcmVzaXplZDogdHJ1ZSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlQ2FudmFzID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsID0+IHtcclxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gIHJldHVybiBjYW52YXM7XHJcbn07XHJcblxyXG5jb25zdCBjYW52YXNUb0Jsb2IgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgbWltZVR5cGU6IHN0cmluZywgcXVhbGl0eT86IG51bWJlcik6IFByb21pc2U8QmxvYiB8IG51bGw+ID0+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIGNhbnZhcy50b0Jsb2IoKGJsb2IpID0+IHJlc29sdmUoYmxvYiksIG1pbWVUeXBlLCBxdWFsaXR5KTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0ID0gKHtcclxuICBmaWxlLFxyXG4gIG9yaWdpbmFsRmlsZSxcclxuICByZWFzb24sXHJcbiAgcmVzaXplZCxcclxuICByZWVuY29kZWQsXHJcbiAgZWxhcHNlZE1zLFxyXG4gIG9yaWdpbmFsV2lkdGgsXHJcbiAgb3JpZ2luYWxIZWlnaHQsXHJcbiAgb3V0cHV0V2lkdGgsXHJcbiAgb3V0cHV0SGVpZ2h0LFxyXG59OiB7XHJcbiAgZmlsZTogRmlsZTtcclxuICBvcmlnaW5hbEZpbGU6IEZpbGU7XHJcbiAgcmVhc29uOiBzdHJpbmc7XHJcbiAgcmVzaXplZDogYm9vbGVhbjtcclxuICByZWVuY29kZWQ6IGJvb2xlYW47XHJcbiAgZWxhcHNlZE1zOiBudW1iZXI7XHJcbiAgb3JpZ2luYWxXaWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICBvcmlnaW5hbEhlaWdodDogbnVtYmVyIHwgbnVsbDtcclxuICBvdXRwdXRXaWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICBvdXRwdXRIZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbn0pOiBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdCA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGZpbGUsXHJcbiAgICBjaGFuZ2VkOlxyXG4gICAgICBmaWxlICE9PSBvcmlnaW5hbEZpbGUgfHxcclxuICAgICAgZmlsZS5zaXplICE9PSBvcmlnaW5hbEZpbGUuc2l6ZSB8fFxyXG4gICAgICBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCkgIT09IHNhZmVUZXh0KG9yaWdpbmFsRmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgcmVhc29uLFxyXG4gICAgcmVzaXplZCxcclxuICAgIHJlZW5jb2RlZCxcclxuICAgIGVsYXBzZWRNcyxcclxuICAgIG9yaWdpbmFsOiB7XHJcbiAgICAgIG5hbWU6IG9yaWdpbmFsRmlsZS5uYW1lLFxyXG4gICAgICB0eXBlOiBvcmlnaW5hbEZpbGUudHlwZSxcclxuICAgICAgc2l6ZTogb3JpZ2luYWxGaWxlLnNpemUsXHJcbiAgICAgIHdpZHRoOiBvcmlnaW5hbFdpZHRoLFxyXG4gICAgICBoZWlnaHQ6IG9yaWdpbmFsSGVpZ2h0LFxyXG4gICAgfSxcclxuICAgIG91dHB1dDoge1xyXG4gICAgICBuYW1lOiBmaWxlLm5hbWUsXHJcbiAgICAgIHR5cGU6IGZpbGUudHlwZSxcclxuICAgICAgc2l6ZTogZmlsZS5zaXplLFxyXG4gICAgICB3aWR0aDogb3V0cHV0V2lkdGgsXHJcbiAgICAgIGhlaWdodDogb3V0cHV0SGVpZ2h0LFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyB0aGUgdXBsb2FkIGZpbGUgdG8gdXNlLiBJdCBrZWVwcyB0aGUgb3JpZ2luYWwgd2hlbiByZWR1Y3Rpb24gd291bGQgYmUgcmlza3kgb3IgaXJyZWxldmFudC5cclxuZXhwb3J0IGNvbnN0IG9wdGltaXplVGlja2V0SW1hZ2VGb3JVcGxvYWQgPSBhc3luYyAoZmlsZTogRmlsZSk6IFByb21pc2U8VGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQ+ID0+IHtcclxuICBjb25zdCBzdGFydGVkQXQgPSBEYXRlLm5vdygpO1xyXG4gIGlmICghKGZpbGUgaW5zdGFuY2VvZiBGaWxlKSkge1xyXG4gICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgZmlsZSxcclxuICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICByZWFzb246IFwiaW52YWxpZC1pbnB1dFwiLFxyXG4gICAgICByZXNpemVkOiBmYWxzZSxcclxuICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICBvcmlnaW5hbFdpZHRoOiBudWxsLFxyXG4gICAgICBvcmlnaW5hbEhlaWdodDogbnVsbCxcclxuICAgICAgb3V0cHV0V2lkdGg6IG51bGwsXHJcbiAgICAgIG91dHB1dEhlaWdodDogbnVsbCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplZE1pbWVUeXBlID0gbm9ybWFsaXplTWltZVR5cGUoZmlsZS50eXBlKTtcclxuICBjb25zdCBsb2FkZWRJbWFnZSA9IGF3YWl0IGxvYWRJbWFnZShmaWxlKTtcclxuICBpZiAoIWxvYWRlZEltYWdlKSB7XHJcbiAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICBmaWxlLFxyXG4gICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgIHJlYXNvbjogXCJkZWNvZGUtdW5hdmFpbGFibGVcIixcclxuICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgIHJlZW5jb2RlZDogZmFsc2UsXHJcbiAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgb3JpZ2luYWxXaWR0aDogbnVsbCxcclxuICAgICAgb3JpZ2luYWxIZWlnaHQ6IG51bGwsXHJcbiAgICAgIG91dHB1dFdpZHRoOiBudWxsLFxyXG4gICAgICBvdXRwdXRIZWlnaHQ6IG51bGwsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGVsZW1lbnQgfSA9IGxvYWRlZEltYWdlO1xyXG4gICAgY29uc3Qgc2hvcnRTaWRlID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCk7XHJcbiAgICBjb25zdCByZXNpemVQbGFuID0gcmVzb2x2ZVJlc2l6ZURpbWVuc2lvbnMod2lkdGgsIGhlaWdodCk7XHJcbiAgICBjb25zdCBjYW5SZWVuY29kZVNhZmVseSA9IHNob3J0U2lkZSA+PSBNSU5fVElDS0VUX1VQTE9BRF9TSE9SVF9TSURFX1BYO1xyXG4gICAgY29uc3QgaXNMYXJnZU9yaWdpbmFsID0gZmlsZS5zaXplID49IE1JTl9USUNLRVRfUkVFTkNPREVfQllURVM7XHJcbiAgICBjb25zdCBzaG91bGRSZXNpemUgPSByZXNpemVQbGFuLnJlc2l6ZWQ7XHJcblxyXG4gICAgaWYgKCFzaG91bGRSZXNpemUgJiYgKCFjYW5SZWVuY29kZVNhZmVseSB8fCAhaXNMYXJnZU9yaWdpbmFsKSkge1xyXG4gICAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICAgIHJlYXNvbjogIWNhblJlZW5jb2RlU2FmZWx5ID8gXCJrZXB0LXNtYWxsLXNob3J0LXNpZGVcIiA6IFwia2VwdC1zbWFsbC1maWxlXCIsXHJcbiAgICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBvdXRwdXRXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3V0cHV0SGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChub3JtYWxpemVkTWltZVR5cGUgPT09IFwiaW1hZ2UvcG5nXCIgJiYgIXNob3VsZFJlc2l6ZSkge1xyXG4gICAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICAgIHJlYXNvbjogXCJrZXB0LXBuZy13aXRob3V0LXJlc2l6ZVwiLFxyXG4gICAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxyXG4gICAgICAgIHJlZW5jb2RlZDogZmFsc2UsXHJcbiAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgb3V0cHV0V2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIG91dHB1dEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMocmVzaXplUGxhbi53aWR0aCwgcmVzaXplUGxhbi5oZWlnaHQpO1xyXG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcz8uZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgaWYgKCFjYW52YXMgfHwgIWNvbnRleHQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgICBmaWxlLFxyXG4gICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgICByZWFzb246IFwiY2FudmFzLXVuYXZhaWxhYmxlXCIsXHJcbiAgICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBvdXRwdXRXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3V0cHV0SGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcclxuICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdRdWFsaXR5ID0gXCJoaWdoXCI7XHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZShlbGVtZW50LCAwLCAwLCByZXNpemVQbGFuLndpZHRoLCByZXNpemVQbGFuLmhlaWdodCk7XHJcblxyXG4gICAgY29uc3Qgb3V0cHV0TWltZVR5cGUgPSBub3JtYWxpemVkTWltZVR5cGUgPT09IFwiaW1hZ2Uvd2VicFwiID8gXCJpbWFnZS93ZWJwXCIgOiBcImltYWdlL2pwZWdcIjtcclxuICAgIGNvbnN0IG91dHB1dEV4dGVuc2lvbiA9IG91dHB1dE1pbWVUeXBlID09PSBcImltYWdlL3dlYnBcIiA/IFwid2VicFwiIDogXCJqcGdcIjtcclxuICAgIGNvbnN0IHF1YWxpdHkgPSBUSUNLRVRfUkVFTkNPREVfUVVBTElUWTtcclxuICAgIGNvbnN0IG9wdGltaXplZEJsb2IgPSBhd2FpdCBjYW52YXNUb0Jsb2IoY2FudmFzLCBvdXRwdXRNaW1lVHlwZSwgcXVhbGl0eSk7XHJcbiAgICBpZiAoIW9wdGltaXplZEJsb2IgfHwgb3B0aW1pemVkQmxvYi5zaXplIDw9IDAgfHwgb3B0aW1pemVkQmxvYi5zaXplID49IGZpbGUuc2l6ZSkge1xyXG4gICAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICAgIHJlYXNvbjogXCJvcHRpbWl6ZWQtbm90LXNtYWxsZXJcIixcclxuICAgICAgICByZXNpemVkOiBzaG91bGRSZXNpemUsXHJcbiAgICAgICAgcmVlbmNvZGVkOiBub3JtYWxpemVkTWltZVR5cGUgIT09IG91dHB1dE1pbWVUeXBlIHx8IGlzTGFyZ2VPcmlnaW5hbCxcclxuICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBvdXRwdXRXaWR0aDogc2hvdWxkUmVzaXplID8gcmVzaXplUGxhbi53aWR0aCA6IHdpZHRoLFxyXG4gICAgICAgIG91dHB1dEhlaWdodDogc2hvdWxkUmVzaXplID8gcmVzaXplUGxhbi5oZWlnaHQgOiBoZWlnaHQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghc2hvdWxkUmVzaXplKSB7XHJcbiAgICAgIGNvbnN0IHNhdmVkQnl0ZXMgPSBmaWxlLnNpemUgLSBvcHRpbWl6ZWRCbG9iLnNpemU7XHJcbiAgICAgIGNvbnN0IHNhdmVkUmF0aW8gPSBzYXZlZEJ5dGVzIC8gTWF0aC5tYXgoZmlsZS5zaXplLCAxKTtcclxuICAgICAgaWYgKHNhdmVkQnl0ZXMgPCBNSU5fVElDS0VUX1JFRFVDVElPTl9CWVRFUyB8fCBzYXZlZFJhdGlvIDwgTUlOX1RJQ0tFVF9SRURVQ1RJT05fUkFUSU8pIHtcclxuICAgICAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICAgICAgZmlsZSxcclxuICAgICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgICAgIHJlYXNvbjogXCJyZWR1Y3Rpb24tdG9vLXNtYWxsXCIsXHJcbiAgICAgICAgICByZXNpemVkOiBmYWxzZSxcclxuICAgICAgICAgIHJlZW5jb2RlZDogdHJ1ZSxcclxuICAgICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICAgIG91dHB1dFdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgIG91dHB1dEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3B0aW1pemVkRmlsZSA9IG5ldyBGaWxlKFtvcHRpbWl6ZWRCbG9iXSwgcmVwbGFjZUZpbGVFeHRlbnNpb24oZmlsZS5uYW1lLCBvdXRwdXRFeHRlbnNpb24pLCB7XHJcbiAgICAgIHR5cGU6IG91dHB1dE1pbWVUeXBlLFxyXG4gICAgICBsYXN0TW9kaWZpZWQ6IGZpbGUubGFzdE1vZGlmaWVkIHx8IERhdGUubm93KCksXHJcbiAgICB9KTtcclxuICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgIGZpbGU6IG9wdGltaXplZEZpbGUsXHJcbiAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgcmVhc29uOiBcIm9wdGltaXplZFwiLFxyXG4gICAgICByZXNpemVkOiBzaG91bGRSZXNpemUsXHJcbiAgICAgIHJlZW5jb2RlZDogbm9ybWFsaXplZE1pbWVUeXBlICE9PSBvdXRwdXRNaW1lVHlwZSB8fCBpc0xhcmdlT3JpZ2luYWwsXHJcbiAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXHJcbiAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgIG91dHB1dFdpZHRoOiByZXNpemVQbGFuLndpZHRoLFxyXG4gICAgICBvdXRwdXRIZWlnaHQ6IHJlc2l6ZVBsYW4uaGVpZ2h0LFxyXG4gICAgfSk7XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIGxvYWRlZEltYWdlLmRpc3Bvc2UoKTtcclxuICB9XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQThEO0FBQzlELHVCQUE2QjtBQWlEdkI7QUE3Q04sSUFBTSwwQkFBMEI7QUFDaEMsSUFBTSxxQ0FBcUM7QUFDM0MsSUFBTSxzQ0FB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
