import {
  flashActionMark
} from "./chunk-CBDB7NMA.js";
import {
  createExpenseSheetTicketQuick,
  safeText
} from "./chunk-MDZH67KN.js";
import {
  Spinner_default,
  classNames
} from "./chunk-EGSPAV7B.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indFormat,
  indT
} from "./chunk-63VW7TTG.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/commons/PageBottomActions.tsx
var import_react2 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/usePageBottomActionsVisibility.ts
var import_react = __toESM(require_react());
var MIN_PAGE_BOTTOM_ACTIONS_SIDE_GAP = 8;
var isVisibleLayoutCard = (element) => {
  if (typeof window === "undefined") return false;
  const styles = window.getComputedStyle(element);
  if (styles.display === "none" || styles.visibility === "hidden") {
    return false;
  }
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
};
var resolveTimelineCardInsets = () => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return null;
  }
  const cards = Array.from(document.querySelectorAll(".timeline-item .timeline-card, .timeline-box .timeline-card"));
  for (const card of cards) {
    if (!isVisibleLayoutCard(card)) continue;
    const rect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
    if (viewportWidth <= 0) return null;
    return {
      left: Math.max(MIN_PAGE_BOTTOM_ACTIONS_SIDE_GAP, Math.round(rect.left)),
      right: Math.max(MIN_PAGE_BOTTOM_ACTIONS_SIDE_GAP, Math.round(viewportWidth - rect.right))
    };
  }
  return null;
};
var usePageBottomActionsVisibility = () => {
  const wrapperRef = (0, import_react.useRef)(null);
  const animationFrameRef = (0, import_react.useRef)(null);
  const [reservedHeight, setReservedHeight] = (0, import_react.useState)(0);
  const [contentInsets, setContentInsets] = (0, import_react.useState)(null);
  const measureLayout = (0, import_react.useEffectEvent)(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const nextHeight = Math.ceil(wrapper.getBoundingClientRect().height);
    setReservedHeight((previous) => Math.abs(previous - nextHeight) < 1 ? previous : nextHeight);
    const nextInsets = resolveTimelineCardInsets();
    setContentInsets((previous) => {
      if (!previous && !nextInsets) return previous;
      if (previous && nextInsets && previous.left === nextInsets.left && previous.right === nextInsets.right) {
        return previous;
      }
      return nextInsets;
    });
  });
  const scheduleMeasure = (0, import_react.useEffectEvent)(() => {
    if (typeof window === "undefined") return;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      measureLayout();
    });
  });
  (0, import_react.useLayoutEffect)(() => {
    measureLayout();
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
    if (typeof MutationObserver === "undefined" || typeof document === "undefined") return;
    const body = document.body;
    if (!body) return;
    const observer = new MutationObserver(() => {
      scheduleMeasure();
    });
    observer.observe(body, {
      childList: true,
      subtree: true
    });
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
    wrapperRef,
    contentInsets
  };
};

// Web/wwwroot/react/src/components/commons/PageBottomActions.tsx
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
  const actionButtons = import_react2.Children.toArray(children).filter(
    (child) => (0, import_react2.isValidElement)(child) && child.type === PageBottomActionButton
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
  const [sourcePickerOpen, setSourcePickerOpen] = (0, import_react3.useState)(false);
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const [progressKey, setProgressKey] = (0, import_react3.useState)(null);
  const [displayProgressKey, setDisplayProgressKey] = (0, import_react3.useState)(null);
  const [progressElapsedMs, setProgressElapsedMs] = (0, import_react3.useState)(0);
  const [errorMessage, setErrorMessage] = (0, import_react3.useState)("");
  const [attemptId, setAttemptId] = (0, import_react3.useState)("");
  const [traceList, setTraceList] = (0, import_react3.useState)([]);
  const [partialTicketFailure, setPartialTicketFailure] = (0, import_react3.useState)(null);
  const latestFileRef = (0, import_react3.useRef)(null);
  const progressStartedAtRef = (0, import_react3.useRef)(null);
  const progressMessage = (0, import_react3.useMemo)(() => {
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
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
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
  const progressStages = (0, import_react3.useMemo)(() => {
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
  const retryPendingUpload = (0, import_react3.useCallback)(async () => {
    return;
  }, []);
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
  const selectFromCamera = (0, import_react3.useCallback)((inputElement) => {
    if (!inputElement) return;
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);
  const selectFromGallery = (0, import_react3.useCallback)((inputElement) => {
    if (!inputElement) return;
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);
  const clearError = (0, import_react3.useCallback)(() => {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC90aWNrZXRJbWFnZU9wdGltaXphdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQsIGlzVmFsaWRFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5IH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50c1wiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbmNvbnN0IE1BWF9QQUdFX0JPVFRPTV9BQ1RJT05TID0gNDtcclxuY29uc3QgUEFHRV9CT1RUT01fQUNUSU9OU19UT1BfUEFERElOR19QWCA9IDEyO1xyXG5jb25zdCBQQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfUEFERElOR19QWCA9IDg7XHJcblxyXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBvbkNsaWNrPzogUmVhY3QuTW91c2VFdmVudEhhbmRsZXI8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBhcmlhTGFiZWw/OiBzdHJpbmc7XHJcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xyXG4gIHRhYkluZGV4PzogbnVtYmVyO1xyXG4gIGZ1bGxXaWR0aD86IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25zUHJvcHMgPSB7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBhcmlhTGFiZWw6IHN0cmluZztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBEdW1iIGJ1dHRvbiB1c2VkIGJ5IHRoZSBzaGFyZWQgYm90dG9tIGFjdGlvbiBiYXIuXHJcbmV4cG9ydCBjb25zdCBQYWdlQm90dG9tQWN0aW9uQnV0dG9uID0gKHtcclxuICBsYWJlbCxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIG9uQ2xpY2ssXHJcbiAgY2xhc3NOYW1lLFxyXG4gIGFyaWFMYWJlbCxcclxuICB0eXBlID0gXCJidXR0b25cIixcclxuICB0YWJJbmRleCxcclxuICBmdWxsV2lkdGggPSBmYWxzZSxcclxufTogUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgdHlwZT17dHlwZX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxyXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XHJcbiAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgIFwiaW5saW5lLWJsb2NrIHctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS02MFwiLFxyXG4gICAgICAgIGZ1bGxXaWR0aCA/IFwiY29sLXNwYW4tMlwiIDogXCJcIixcclxuICAgICAgICBjbGFzc05hbWUgfHwgXCJcIlxyXG4gICAgICApfVxyXG4gICAgPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IG1pbi1oLVs2OHB4XSB3LWZ1bGwgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItWyMwMDFmNGRdLzgwIGJnLXByaW1hcnkgcHgtNCBweS0zLjUgdGV4dC1jZW50ZXIgdGV4dC1bMThweF0gZm9udC1ib2xkIGxlYWRpbmctWzEuMV0gdGV4dC13aGl0ZSBzaGFkb3cteHMgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMTUwIGhvdmVyOmJnLVsjMDAxZjRkXSBzbTptaW4taC1bNzJweF0gc206cHgtNSBzbTpweS00IHNtOnRleHQtWzIwcHhdXCI+XHJcbiAgICAgICAge2xhYmVsfVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59O1xyXG5cclxuUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbi5kaXNwbGF5TmFtZSA9IFwiUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblwiO1xyXG5cclxuLy8gRml4ZWQgYm90dG9tIGFjdGlvbiBiYXIgdGhhdCBzdGF5cyB2aXNpYmxlIHdoaWxlIHRoZSBwYWdlIHNjcm9sbHMuXHJcbmNvbnN0IFBhZ2VCb3R0b21BY3Rpb25zID0gKHsgY2hpbGRyZW4sIGFyaWFMYWJlbCwgY2xhc3NOYW1lIH06IFBhZ2VCb3R0b21BY3Rpb25zUHJvcHMpID0+IHtcclxuICBjb25zdCBhY3Rpb25CdXR0b25zID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbilcclxuICAgIC5maWx0ZXIoXHJcbiAgICAgIChjaGlsZCk6IGNoaWxkIGlzIFJlYWN0LlJlYWN0RWxlbWVudDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uUHJvcHM+ID0+XHJcbiAgICAgICAgaXNWYWxpZEVsZW1lbnQ8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzPihjaGlsZCkgJiYgY2hpbGQudHlwZSA9PT0gUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblxyXG4gICAgKVxyXG4gICAgLnNsaWNlKDAsIE1BWF9QQUdFX0JPVFRPTV9BQ1RJT05TKTtcclxuXHJcbiAgY29uc3QgYWN0aW9uQ291bnQgPSBhY3Rpb25CdXR0b25zLmxlbmd0aDtcclxuICBjb25zdCB7IHJlc2VydmVkSGVpZ2h0LCB3cmFwcGVyUmVmLCBjb250ZW50SW5zZXRzIH0gPSB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkoKTtcclxuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgaWYgKGFjdGlvbkNvdW50IDwgMSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhY3Rpb25CYXIgPSAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIHJlZj17d3JhcHBlclJlZn1cclxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQteC0wIGJvdHRvbS0wIHotMTkwMCBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwLzkwIGJnLXdoaXRlIHNoYWRvdy1bMF8tMTBweF8yOHB4X3JnYmEoMTUsMjMsNDIsMC4xMildXCJcclxuICAgID5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHBhZGRpbmdUb3A6IGAke1BBR0VfQk9UVE9NX0FDVElPTlNfVE9QX1BBRERJTkdfUFh9cHhgLFxyXG4gICAgICAgICAgcGFkZGluZ0xlZnQ6IGAke2NvbnRlbnRJbnNldHM/LmxlZnQgPz8gUEFHRV9CT1RUT01fQUNUSU9OU19TSURFX1BBRERJTkdfUFh9cHhgLFxyXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0OiBgJHtjb250ZW50SW5zZXRzPy5yaWdodCA/PyBQQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfUEFERElOR19QWH1weGAsXHJcbiAgICAgICAgICBwYWRkaW5nQm90dG9tOiBcImNhbGMoMC43NXJlbSArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tLCAwcHgpKVwiLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICByb2xlPVwidG9vbGJhclwiXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJwb2ludGVyLWV2ZW50cy1hdXRvIHctZnVsbFwiLCBjbGFzc05hbWUgfHwgXCJcIil9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0xLjVcIj5cclxuICAgICAgICAgICAge2FjdGlvbkJ1dHRvbnMubWFwKChjaGlsZCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBzaG91bGRVc2VGdWxsV2lkdGggPSBhY3Rpb25Db3VudCA9PT0gMSB8fCAoYWN0aW9uQ291bnQgJSAyID09PSAxICYmIGluZGV4ID09PSBhY3Rpb25Db3VudCAtIDEpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcclxuICAgICAgICAgICAgICAgIGZ1bGxXaWR0aDogc2hvdWxkVXNlRnVsbFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg6IGNoaWxkLnByb3BzLnRhYkluZGV4LFxyXG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgPz8gYHBhZ2UtYm90dG9tLWFjdGlvbi0ke2luZGV4fWAsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxkaXYgYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9e3sgaGVpZ2h0OiBgJHtyZXNlcnZlZEhlaWdodH1weGAgfX0gLz5cclxuICAgICAge3BvcnRhbFRhcmdldCA/IGNyZWF0ZVBvcnRhbChhY3Rpb25CYXIsIHBvcnRhbFRhcmdldCkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2VCb3R0b21BY3Rpb25zO1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VFZmZlY3RFdmVudCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB0eXBlIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxudHlwZSBQYWdlQm90dG9tQWN0aW9uc0luc2V0cyA9IHtcclxuICBsZWZ0OiBudW1iZXI7XHJcbiAgcmlnaHQ6IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgVXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5UmVzdWx0ID0ge1xyXG4gIHJlc2VydmVkSGVpZ2h0OiBudW1iZXI7XHJcbiAgd3JhcHBlclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgY29udGVudEluc2V0czogUGFnZUJvdHRvbUFjdGlvbnNJbnNldHMgfCBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgTUlOX1BBR0VfQk9UVE9NX0FDVElPTlNfU0lERV9HQVAgPSA4O1xyXG5cclxuLy8gUmV0dXJucyB0cnVlIHdoZW4gdGhlIGNhcmQgaXMgcmVuZGVyZWQgYW5kIGNhbiBiZSB1c2VkIGFzIGEgbGF5b3V0IHJlZmVyZW5jZS5cclxuY29uc3QgaXNWaXNpYmxlTGF5b3V0Q2FyZCA9IChlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGNvbnN0IHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG4gIGlmIChzdHlsZXMuZGlzcGxheSA9PT0gXCJub25lXCIgfHwgc3R5bGVzLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIHJldHVybiByZWN0LndpZHRoID4gMCAmJiByZWN0LmhlaWdodCA+IDA7XHJcbn07XHJcblxyXG4vLyBGaW5kcyB0aGUgZmlyc3QgdmlzaWJsZSB0aW1lbGluZSBjYXJkIGFuZCBtYXBzIGl0cyBob3Jpem9udGFsIGZyYW1lIHRvIHZpZXdwb3J0IGluc2V0cy5cclxuY29uc3QgcmVzb2x2ZVRpbWVsaW5lQ2FyZEluc2V0cyA9ICgpOiBQYWdlQm90dG9tQWN0aW9uc0luc2V0cyB8IG51bGwgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjYXJkcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtaXRlbSAudGltZWxpbmUtY2FyZCwgLnRpbWVsaW5lLWJveCAudGltZWxpbmUtY2FyZFwiKSk7XHJcbiAgZm9yIChjb25zdCBjYXJkIG9mIGNhcmRzKSB7XHJcbiAgICBpZiAoIWlzVmlzaWJsZUxheW91dENhcmQoY2FyZCkpIGNvbnRpbnVlO1xyXG5cclxuICAgIGNvbnN0IHJlY3QgPSBjYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCAwO1xyXG4gICAgaWYgKHZpZXdwb3J0V2lkdGggPD0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGVmdDogTWF0aC5tYXgoTUlOX1BBR0VfQk9UVE9NX0FDVElPTlNfU0lERV9HQVAsIE1hdGgucm91bmQocmVjdC5sZWZ0KSksXHJcbiAgICAgIHJpZ2h0OiBNYXRoLm1heChNSU5fUEFHRV9CT1RUT01fQUNUSU9OU19TSURFX0dBUCwgTWF0aC5yb3VuZCh2aWV3cG9ydFdpZHRoIC0gcmVjdC5yaWdodCkpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLy8gVHJhY2tzIHRoZSBib3R0b20gYWN0aW9uIGJhciBoZWlnaHQgc28gdGhlIHBhZ2UgcmVzZXJ2ZXMgZW5vdWdoIHNwYWNlIGZvciBpdC5cclxuZXhwb3J0IGNvbnN0IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSA9ICgpOiBVc2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHlSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IHdyYXBwZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhbmltYXRpb25GcmFtZVJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbcmVzZXJ2ZWRIZWlnaHQsIHNldFJlc2VydmVkSGVpZ2h0XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtjb250ZW50SW5zZXRzLCBzZXRDb250ZW50SW5zZXRzXSA9IHVzZVN0YXRlPFBhZ2VCb3R0b21BY3Rpb25zSW5zZXRzIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IG1lYXN1cmVMYXlvdXQgPSB1c2VFZmZlY3RFdmVudCgoKSA9PiB7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gd3JhcHBlclJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCF3cmFwcGVyKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbmV4dEhlaWdodCA9IE1hdGguY2VpbCh3cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCk7XHJcbiAgICBzZXRSZXNlcnZlZEhlaWdodCgocHJldmlvdXMpID0+IChNYXRoLmFicyhwcmV2aW91cyAtIG5leHRIZWlnaHQpIDwgMSA/IHByZXZpb3VzIDogbmV4dEhlaWdodCkpO1xyXG5cclxuICAgIGNvbnN0IG5leHRJbnNldHMgPSByZXNvbHZlVGltZWxpbmVDYXJkSW5zZXRzKCk7XHJcbiAgICBzZXRDb250ZW50SW5zZXRzKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpb3VzICYmICFuZXh0SW5zZXRzKSByZXR1cm4gcHJldmlvdXM7XHJcbiAgICAgIGlmIChwcmV2aW91cyAmJiBuZXh0SW5zZXRzICYmIHByZXZpb3VzLmxlZnQgPT09IG5leHRJbnNldHMubGVmdCAmJiBwcmV2aW91cy5yaWdodCA9PT0gbmV4dEluc2V0cy5yaWdodCkge1xyXG4gICAgICAgIHJldHVybiBwcmV2aW91cztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV4dEluc2V0cztcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBzY2hlZHVsZU1lYXN1cmUgPSB1c2VFZmZlY3RFdmVudCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICAgIGlmIChhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBtZWFzdXJlTGF5b3V0KCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcclxuICAgIG1lYXN1cmVMYXlvdXQoKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgICBjb25zdCB3cmFwcGVyID0gd3JhcHBlclJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCF3cmFwcGVyKSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICBzY2hlZHVsZU1lYXN1cmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9ic2VydmVyLm9ic2VydmUod3JhcHBlcik7XHJcbiAgICByZXR1cm4gKCkgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgIGlmICghYm9keSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICBzY2hlZHVsZU1lYXN1cmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9ic2VydmVyLm9ic2VydmUoYm9keSwge1xyXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xyXG4gICAgICBzY2hlZHVsZU1lYXN1cmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlUmVzaXplLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIGhhbmRsZVJlc2l6ZSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlUmVzaXplKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xyXG5cclxuICAgICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcmVzZXJ2ZWRIZWlnaHQsXHJcbiAgICB3cmFwcGVyUmVmLFxyXG4gICAgY29udGVudEluc2V0cyxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBQcm9ncmVzc1N0YWdlID0ge1xyXG4gIGtleTogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBzdGF0ZTogXCJjb21wbGV0ZWRcIiB8IFwiYWN0aXZlXCIgfCBcInBlbmRpbmdcIjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5UHJvcHMgPSB7XHJcbiAgb3BlbjogYm9vbGVhbjtcclxuICB0aXRsZT86IHN0cmluZztcclxuICBzdW1tYXJ5Pzogc3RyaW5nO1xyXG4gIGVsYXBzZWRNcz86IG51bWJlcjtcclxuICBzdGFnZXM/OiBQcm9ncmVzc1N0YWdlW107XHJcbn07XHJcblxyXG5jb25zdCBHTE9CQUxfUkFESVVTID0gXCJ2YXIoLS1yYWRpdXMteGwsIDVweClcIjtcclxuY29uc3QgRU1QVFlfUFJPR1JFU1NfU1RBR0VTOiBQcm9ncmVzc1N0YWdlW10gPSBbXTtcclxuXHJcbmNvbnN0IGZvcm1hdEVsYXBzZWRMYWJlbCA9IChlbGFwc2VkTXM6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgc2FmZUVsYXBzZWRNcyA9IE51bWJlci5pc0Zpbml0ZShlbGFwc2VkTXMpICYmIGVsYXBzZWRNcyA+IDAgPyBlbGFwc2VkTXMgOiAwO1xyXG4gIGNvbnN0IHRvdGFsU2Vjb25kcyA9IE1hdGguZmxvb3Ioc2FmZUVsYXBzZWRNcyAvIDEwMDApO1xyXG4gIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDYwKTtcclxuICBjb25zdCBzZWNvbmRzID0gdG90YWxTZWNvbmRzICUgNjA7XHJcbiAgcmV0dXJuIGAke1N0cmluZyhtaW51dGVzKS5wYWRTdGFydCgyLCBcIjBcIil9OiR7U3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVN0YWdlQmFkZ2UgPSAoc3RhZ2U6IFByb2dyZXNzU3RhZ2UpID0+IHtcclxuICBpZiAoc3RhZ2Uuc3RhdGUgPT09IFwiY29tcGxldGVkXCIpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaC04IHctOCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtMTAwIHRleHQtZW1lcmFsZC03MDBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIj5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNNSAxMC41IDguNSAxNCAxNSA2LjVcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChzdGFnZS5zdGF0ZSA9PT0gXCJhY3RpdmVcIikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBoLTggdy04IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYmctc2t5LTEwMCB0ZXh0LXNreS03MDBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzcGFuXHJcbiAgICAgIGNsYXNzTmFtZT1cImZsZXggaC04IHctOCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHRleHQtc2xhdGUtNDAwXCJcclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaC0yLjUgdy0yLjUgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTIwMFwiIC8+XHJcbiAgICA8L3NwYW4+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIFNob3dzIG9uZSBzdGFnZWQgcHJvZ3Jlc3Mgb3ZlcmxheSB3aGlsZSB0aGUgY29tcG9zaXRlIHF1aWNrLXRpY2tldCByZXF1ZXN0IGlzIGluIGZsaWdodC5cclxuY29uc3QgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5ID0gKHtcclxuICBvcGVuLFxyXG4gIHRpdGxlLFxyXG4gIHN1bW1hcnksXHJcbiAgZWxhcHNlZE1zID0gMCxcclxuICBzdGFnZXMgPSBFTVBUWV9QUk9HUkVTU19TVEFHRVMsXHJcbn06IEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheVByb3BzKSA9PiB7XHJcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDAgcHgtNCBweS02XCI+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCB3LWZ1bGwgbWF4LXctbGcgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUvOTUgcC01XCJcclxuICAgICAgICBzdHlsZT17eyBib3JkZXJSYWRpdXM6IEdMT0JBTF9SQURJVVMgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtNFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtMTIgdy0xMiBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctc2t5LTUwIHRleHQtc2t5LTcwMFwiPlxyXG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC02IHctNlwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xXCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzE1cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj5cclxuICAgICAgICAgICAgICB7dGl0bGUgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAge3N1bW1hcnkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19DcmVhdGluZ1RpY2tldFwiLCBcIkNyZWF0aW5nIHRpY2tldC4uLlwiKX1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTUwIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19FbGFwc2VkXCIsIFwiRWxhcHNlZCB0aW1lXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTJweF0gdGV4dC1zbGF0ZS03MDBcIj57Zm9ybWF0RWxhcHNlZExhYmVsKGVsYXBzZWRNcyl9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7c3RhZ2VzLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTUgc3BhY2UteS0zXCI+XHJcbiAgICAgICAgICAgIHtzdGFnZXMubWFwKChzdGFnZSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17c3RhZ2Uua2V5fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgICAgc3RhZ2Uuc3RhdGUgPT09IFwiYWN0aXZlXCJcclxuICAgICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1za3ktMjAwIGJnLXNreS01MC84MCBweC0zIHB5LTNcIlxyXG4gICAgICAgICAgICAgICAgICAgIDogc3RhZ2Uuc3RhdGUgPT09IFwiY29tcGxldGVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWVtZXJhbGQtMjAwIGJnLWVtZXJhbGQtNTAvNzAgcHgtMyBweS0zXCJcclxuICAgICAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBweC0zIHB5LTNcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtM1wiPlxyXG4gICAgICAgICAgICAgICAgICB7cmVzb2x2ZVN0YWdlQmFkZ2Uoc3RhZ2UpfVxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdlLnN0YXRlID09PSBcInBlbmRpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7c3RhZ2UudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14cyBsZWFkaW5nLTUgdGV4dC1zbGF0ZS01MDBcIj57c3RhZ2UuZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXk7XHJcbiIsICJcdUZFRkZpbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlR2FzdG9UeXBlQ29kZSxcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsXG4gIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcbmltcG9ydCB7IHJlc29sdmVUaWNrZXRMaW5lQW1vdW50IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VUaWNrZXRMaW5lQW1vdW50LnRzXCI7XG5cclxuY29uc3QgVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUgPSBcImluZC1leHBlbnNlLXRpY2tldC1pbWFnZS12MVwiO1xyXG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYID0gXCIvX19pbmRfY2FjaGVfXy90aWNrZXQtaW1hZ2UvXCI7XHJcbmNvbnN0IFRJQ0tFVF9UUkFDRV9TVE9SQUdFX0tFWSA9IFwiZXhwZW5zZV9zaGVldF90aWNrZXRfcXVpY2tfZmxvd190cmFjZV92MVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyA9IDUwICogMTAyNCAqIDEwMjQ7XHJcbmV4cG9ydCBjb25zdCBUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURSA9XHJcbiAgXCIuanBnLC5qcGVnLC5wbmcsLndlYnAsaW1hZ2UvanBlZyxpbWFnZS9wanBlZyxpbWFnZS9wbmcsaW1hZ2Uvd2VicFwiO1xyXG5jb25zdCBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTID0gbmV3IFNldDxzdHJpbmc+KFtcImltYWdlL2pwZWdcIiwgXCJpbWFnZS9wanBlZ1wiLCBcImltYWdlL3BuZ1wiLCBcImltYWdlL3dlYnBcIl0pO1xyXG5jb25zdCBBTExPV0VEX1RJQ0tFVF9JTUFHRV9FWFRFTlNJT05TID0gbmV3IFNldDxzdHJpbmc+KFtcImpwZ1wiLCBcImpwZWdcIiwgXCJwbmdcIiwgXCJ3ZWJwXCJdKTtcclxuY29uc3QgVElDS0VUX01JTUVfVE9fRVhURU5TSU9OOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIFwiaW1hZ2UvanBlZ1wiOiBcImpwZ1wiLFxyXG4gIFwiaW1hZ2UvcGpwZWdcIjogXCJqcGdcIixcclxuICBcImltYWdlL2pwZ1wiOiBcImpwZ1wiLFxyXG4gIFwiaW1hZ2UvcG5nXCI6IFwicG5nXCIsXHJcbiAgXCJpbWFnZS93ZWJwXCI6IFwid2VicFwiLFxyXG59O1xyXG5jb25zdCBBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcclxuY29uc3QgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRSA9IDg7XHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NSRUFURV9NT0RFID0gXCJtYW51YWxcIiBhcyBcImlhXCIgfCBcIm1hbnVhbFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgVGlja2V0SW1hZ2VTb3VyY2UgPSBcImNhbWVyYVwiIHwgXCJnYWxsZXJ5XCI7XHJcblxyXG5leHBvcnQgdHlwZSBUaWNrZXRUcmFjZUVudHJ5ID0ge1xyXG4gIHN0ZXA6IHN0cmluZztcclxuICB0cmFjZUlkOiBzdHJpbmc7XHJcbiAgYXQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgTm9ybWFsaXplZERyYWZ0TGluZSA9IHtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHR5cGVWYWx1ZTogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBxdHk6IG51bWJlcjtcbiAgcHJpY2U6IG51bWJlcjtcbiAgdG90YWxBbW91bnQ6IG51bWJlcjtcbn07XG5cclxuZXhwb3J0IHR5cGUgTm9ybWFsaXplZERyYWZ0ID0ge1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcbiAgdG90YWxBbW91bnQ6IG51bWJlcjtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHRpY2tldERhdGU6IHN0cmluZztcbiAgdGlja2V0VGltZTogc3RyaW5nO1xuICBjb21lbnRhcmlvOiBzdHJpbmc7XG4gIGdhc3RvVHlwZTogbnVtYmVyIHwgbnVsbDtcbiAgbGluZXM6IE5vcm1hbGl6ZWREcmFmdExpbmVbXTtcbn07XG5cclxuZXhwb3J0IHR5cGUgUGVuZGluZ1VwbG9hZFJldHJ5ID1cclxuICB8IHtcclxuICAgICAgc3RyYXRlZ3k6IFwiaWEtcmVhZHlcIjtcclxuICAgICAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgICAgIGV4dGVuc2lvbjogc3RyaW5nO1xyXG4gICAgICBjYWNoZUtleTogc3RyaW5nO1xyXG4gICAgICBkcmFmdDogTm9ybWFsaXplZERyYWZ0O1xyXG4gICAgICBmaWxlTmFtZUhpbnQ6IHN0cmluZztcclxuICAgIH1cclxuICB8IHtcclxuICAgICAgc3RyYXRlZ3k6IFwibWFudWFsLXBvc3QtdXBsb2FkLWRyYWZ0XCI7XHJcbiAgICAgIGZpbGVJZDogc3RyaW5nO1xyXG4gICAgICBleHRlbnNpb246IHN0cmluZztcclxuICAgICAgY2FjaGVLZXk6IHN0cmluZztcclxuICAgICAgZmlsZU5hbWVIaW50OiBzdHJpbmc7XHJcbiAgICB9O1xyXG5cclxuZXhwb3J0IHR5cGUgVXBsb2FkU3luY1Jlc3VsdCA9IHtcclxuICB1cmxGaWxlOiBzdHJpbmc7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0FyZ3MgPSB7XHJcbiAgc2hlZXRJZD86IHN0cmluZztcclxuICBwcm9qZWN0SWQ/OiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlPzogc3RyaW5nO1xyXG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNTaGVldExvY2tlZDogYm9vbGVhbjtcclxuICBsaW5rVG9TaGVldD86IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbiAgb25Db21wbGV0ZWQ/OiAocmVzdWx0OiB7IGZpbGVJZDogc3RyaW5nOyBsaW5rZWRUb1NoZWV0OiBib29sZWFuIH0pID0+IHZvaWQ7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBRdWlja0Zsb3dQcm9ncmVzc0tleSA9XHJcbiAgfCBcInVwbG9hZGluZ0ltYWdlXCJcclxuICB8IFwiY3JlYXRpbmdUaWNrZXRcIlxyXG4gIHwgXCJzeW5jaW5nRmlsZVwiXHJcbiAgfCBcImZpbmFsaXppbmdJYVwiXHJcbiAgfCBcImxpbmtpbmdFeHBlbnNlTGluZVwiXHJcbiAgfCBcImRvbmVcIjtcclxuXHJcbmNvbnN0IGFzUmVjb3JkID0gKHZhbHVlOiB1bmtub3duKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4ge307XHJcbiAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Rmlyc3REZWZpbmVkID0gKHJlY29yZDogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIGtleXM6IHN0cmluZ1tdKTogdW5rbm93biA9PiB7XHJcbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xyXG4gICAgaWYgKGtleSBpbiByZWNvcmQpIHtcclxuICAgICAgcmV0dXJuIHJlY29yZFtrZXldO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuY29uc3QgdG9OdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdG9Qb3NpdGl2ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bWJlcih2YWx1ZSk7XG4gIHJldHVybiBwYXJzZWQgIT09IG51bGwgJiYgcGFyc2VkID4gMCA/IHBhcnNlZCA6IG51bGw7XG59O1xuXHJcbmNvbnN0IHRvRGRNbVl5eXkgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdG9FeHBlbnNlQXBpRGRNbVl5eXkodmFsdWUpO1xufTtcblxuY29uc3QgdG9UaWNrZXRUaW1lID0gKHZhbHVlOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcmF3ID0gc2FmZVRleHQodmFsdWUpLnJlcGxhY2UoL1xcLi9nLCBcIjpcIik7XG4gIGlmICghcmF3KSByZXR1cm4gXCJcIjtcbiAgY29uc3QgbWF0Y2ggPSByYXcubWF0Y2goL14oXFxkezEsMn0pOihbMC01XVxcZCkoPzo6KFswLTVdXFxkKSk/JC8pO1xuICBpZiAoIW1hdGNoKSByZXR1cm4gXCJcIjtcbiAgY29uc3QgaG91cnMgPSBOdW1iZXIobWF0Y2hbMV0pO1xuICBpZiAoIU51bWJlci5pc0ludGVnZXIoaG91cnMpIHx8IGhvdXJzIDwgMCB8fCBob3VycyA+IDIzKSByZXR1cm4gXCJcIjtcbiAgcmV0dXJuIGAke1N0cmluZyhob3VycykucGFkU3RhcnQoMiwgXCIwXCIpfToke21hdGNoWzJdfToke21hdGNoWzNdIHx8IFwiMDBcIn1gO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFRvZGF5RGRNbVl5eXkgPSAoKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHRvRGRNbVl5eXkobmV3IERhdGUoKSk7XG59O1xuXHJcbmNvbnN0IG5vcm1hbGl6ZUdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVtYmVyKHZhbHVlKTtcclxuICBpZiAocGFyc2VkID09PSBudWxsIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgfHwgIUFMTE9XRURfVElDS0VUX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgcmV0dXJuIHBhcnNlZDtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZUltYWdlRXh0ZW5zaW9uID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtejAtOV0vZywgXCJcIik7XHJcbiAgaWYgKCFub3JtYWxpemVkKSByZXR1cm4gXCJcIjtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCJqcGVnXCIpIHJldHVybiBcImpwZ1wiO1xyXG4gIHJldHVybiBBTExPV0VEX1RJQ0tFVF9JTUFHRV9FWFRFTlNJT05TLmhhcyhub3JtYWxpemVkKSA/IG5vcm1hbGl6ZWQgOiBcIlwiO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZSA9IChmaWxlOiBGaWxlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBmcm9tTmFtZSA9IHNhZmVUZXh0KGZpbGUubmFtZSkuc3BsaXQoXCIuXCIpLnBvcCgpIHx8IFwiXCI7XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZUltYWdlRXh0ZW5zaW9uKGZyb21OYW1lKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpbmZlckV4dGVuc2lvbiA9IChmaWxlOiBGaWxlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCB0eXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGNvbnN0IGZyb21NaW1lID0gVElDS0VUX01JTUVfVE9fRVhURU5TSU9OW3R5cGVdO1xyXG4gIGlmIChmcm9tTWltZSkgcmV0dXJuIGZyb21NaW1lO1xyXG5cclxuICBjb25zdCBmcm9tTmFtZSA9IHJlc29sdmVFeHRlbnNpb25Gcm9tRmlsZU5hbWUoZmlsZSk7XHJcbiAgaWYgKGZyb21OYW1lKSByZXR1cm4gZnJvbU5hbWU7XHJcblxyXG4gIHJldHVybiBcImpwZ1wiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlID0gKGZpbGU6IEZpbGUpOiBib29sZWFuID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkVHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAobm9ybWFsaXplZFR5cGUgJiYgQUxMT1dFRF9USUNLRVRfSU1BR0VfTUlNRV9UWVBFUy5oYXMobm9ybWFsaXplZFR5cGUpKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGV4dGVuc2lvbiA9IHJlc29sdmVFeHRlbnNpb25Gcm9tRmlsZU5hbWUoZmlsZSk7XHJcbiAgcmV0dXJuICEhZXh0ZW5zaW9uO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVSYW5kb21LZXkgPSAoKTogc3RyaW5nID0+IHtcclxuICBpZiAodHlwZW9mIGNyeXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY3J5cHRvLnJhbmRvbVVVSUQgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmV0dXJuIGNyeXB0by5yYW5kb21VVUlEKCk7XHJcbiAgfVxyXG4gIHJldHVybiBgJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDEwKX1gO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHNhbml0aXplRmlsZU5hbWUgPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgYmFzZSA9IHNhZmVUZXh0KHZhbHVlKS5yZXBsYWNlKC9bPD46XCIvXFxcXHw/KlxcdTAwMDAtXFx1MDAxRl0vZywgXCJfXCIpO1xyXG4gIHJldHVybiBiYXNlIHx8IFwidGlja2V0LWltYWdlXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IgPSAoZXJyb3I6IEFwaUZldGNoRXJyb3IpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHBheWxvYWQgPSBzYWZlVGV4dChlcnJvci5yZXNwb25zZUJvZHkpO1xyXG4gIGlmICghcGF5bG9hZCkgcmV0dXJuIFwiXCI7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKHBheWxvYWQpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG4gICAgY29uc3QgdHJhY2VJZCA9IHNhZmVUZXh0KGpzb24uVHJhY2VJZCA/PyBqc29uLnRyYWNlSWQpO1xyXG4gICAgcmV0dXJuIHRyYWNlSWQ7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZSA9IChyYXdEYXRhOiB1bmtub3duKTogTm9ybWFsaXplZERyYWZ0ID0+IHtcclxuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XG4gIGNvbnN0IGRyYWZ0RGVzY3JpcHRpb24gPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiXSkpO1xuICBjb25zdCBkcmFmdEN1cnJlbmN5ID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImN1cnJlbmN5Q29kZVwiLCBcIkN1cnJlbmN5Q29kZVwiXSkpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRyYWZ0VG90YWxBbW91bnQgPSB0b051bWJlcihnZXRGaXJzdERlZmluZWQoZGF0YSwgW1widG90YWxBbW91bnRcIiwgXCJUb3RhbEFtb3VudFwiXSkpO1xuICBjb25zdCBkcmFmdFRyYW5zRGF0ZSA9IHRvRGRNbVl5eXkoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcInRyYW5zRGF0ZVwiLCBcIlRyYW5zRGF0ZVwiXSkpIHx8IGdldFRvZGF5RGRNbVl5eXkoKTtcbiAgY29uc3QgZHJhZnRUaWNrZXREYXRlID1cbiAgICB0b0RkTW1ZeXl5KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0aWNrZXREYXRlXCIsIFwiVGlja2V0RGF0ZVwiXSkpIHx8IGRyYWZ0VHJhbnNEYXRlO1xuICBjb25zdCBkcmFmdFRpY2tldFRpbWUgPSB0b1RpY2tldFRpbWUoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcInRpY2tldFRpbWVcIiwgXCJUaWNrZXRUaW1lXCJdKSk7XG4gIGNvbnN0IGRyYWZ0Q29tbWVudCA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJjb21lbnRhcmlvXCIsIFwiQ29tZW50YXJpb1wiXSkpO1xuICBjb25zdCBkcmFmdEdhc3RvVHlwZSA9IG5vcm1hbGl6ZUdhc3RvVHlwZShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZ2FzdG9UeXBlXCIsIFwiR2FzdG9UeXBlXCJdKSk7XG5cclxuICBjb25zdCByYXdMaW5lcyA9IGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJsaW5lc1wiLCBcIkxpbmVzXCJdKTtcclxuICBjb25zdCBsaW5lQXJyYXkgPSBBcnJheS5pc0FycmF5KHJhd0xpbmVzKSA/IHJhd0xpbmVzIDogW107XHJcblxyXG4gIGNvbnN0IGxpbmVzOiBOb3JtYWxpemVkRHJhZnRMaW5lW10gPSBsaW5lQXJyYXlcbiAgICAubWFwKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgbGluZVJlY29yZCA9IGFzUmVjb3JkKGVudHJ5KTtcbiAgICAgIGNvbnN0IHF0eUNhbmRpZGF0ZSA9IHRvTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJxdHlcIiwgXCJRdHlcIl0pKTtcbiAgICAgIGNvbnN0IHF0eSA9IHF0eUNhbmRpZGF0ZSAhPT0gbnVsbCAmJiBxdHlDYW5kaWRhdGUgPj0gMCA/IHF0eUNhbmRpZGF0ZSA6IDE7XG4gICAgICBjb25zdCBwcmljZSA9IHRvTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJwcmljZVwiLCBcIlByaWNlXCJdKSk7XG4gICAgICBjb25zdCBleHBsaWNpdFRvdGFsID0gdG9OdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInRvdGFsQW1vdW50XCIsIFwiVG90YWxBbW91bnRcIl0pKTtcbiAgICAgIGNvbnN0IGNvbXB1dGVkVG90YWwgPSByZXNvbHZlVGlja2V0TGluZUFtb3VudCh7IHF0eSwgcHJpY2UsIHRvdGFsQW1vdW50OiBleHBsaWNpdFRvdGFsIH0pO1xuICAgICAgaWYgKGNvbXB1dGVkVG90YWwgPT09IG51bGwgfHwgIU51bWJlci5pc0Zpbml0ZShjb21wdXRlZFRvdGFsKSB8fCBjb21wdXRlZFRvdGFsID09PSAwKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3QgZWZmZWN0aXZlUHJpY2UgPSBwcmljZSAhPT0gbnVsbCAmJiBwcmljZSAhPT0gMCA/IHByaWNlIDogcXR5ID4gMCA/IGNvbXB1dGVkVG90YWwgLyBxdHkgOiBjb21wdXRlZFRvdGFsO1xuICAgICAgaWYgKGVmZmVjdGl2ZVByaWNlID09PSAwIHx8IChxdHkgPT09IDAgJiYgY29tcHV0ZWRUb3RhbCA+PSAwKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGNhbmRpZGF0ZVR5cGVWYWx1ZSA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInR5cGVWYWx1ZVwiLCBcIlR5cGVWYWx1ZVwiXSkpO1xuICAgICAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlci5pc0ludGVnZXIoY2FuZGlkYXRlVHlwZVZhbHVlKSA/IE51bWJlcihjYW5kaWRhdGVUeXBlVmFsdWUpIDogbnVsbDtcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IHNhZmVUeXBlVmFsdWUgJiYgc2FmZVR5cGVWYWx1ZSA+IDAgPyBzYWZlVHlwZVZhbHVlIDogZHJhZnRHYXN0b1R5cGUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcclxuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1wiZGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiXSkpIHx8IGRyYWZ0RGVzY3JpcHRpb247XHJcbiAgICAgIGNvbnN0IHRyYW5zRGF0ZSA9IHRvRGRNbVl5eXkoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInRyYW5zRGF0ZVwiLCBcIlRyYW5zRGF0ZVwiXSkpIHx8IGRyYWZ0VHJhbnNEYXRlO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIHR5cGVWYWx1ZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IFwiVGlja2V0XCIsXG4gICAgICAgIHF0eSxcbiAgICAgICAgcHJpY2U6IGVmZmVjdGl2ZVByaWNlLFxuICAgICAgICB0b3RhbEFtb3VudDogY29tcHV0ZWRUb3RhbCxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIE5vcm1hbGl6ZWREcmFmdExpbmUgPT4gZW50cnkgIT09IG51bGwpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZGVzY3JpcHRpb246IGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0Q3VycmVuY3kgfHwgXCJFVVJcIixcbiAgICB0b3RhbEFtb3VudDogZHJhZnRUb3RhbEFtb3VudCAhPT0gbnVsbCA/IGRyYWZ0VG90YWxBbW91bnQgOiBsaW5lcy5yZWR1Y2UoKHN1bSwgbGluZSkgPT4gc3VtICsgbGluZS50b3RhbEFtb3VudCwgMCksXG4gICAgdHJhbnNEYXRlOiBkcmFmdFRyYW5zRGF0ZSxcbiAgICB0aWNrZXREYXRlOiBkcmFmdFRpY2tldERhdGUsXG4gICAgdGlja2V0VGltZTogZHJhZnRUaWNrZXRUaW1lLFxuICAgIGNvbWVudGFyaW86IGRyYWZ0Q29tbWVudCxcbiAgICBnYXN0b1R5cGU6IGRyYWZ0R2FzdG9UeXBlLFxuICAgIGxpbmVzLFxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVUaWNrZXRGaWxlSWRGcm9tRHJhZnRSZXNwb25zZSA9IChyYXdEYXRhOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XHJcbiAgY29uc3QgY3JlYXRpb25SYXcgPSBnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiVGlja2V0Q3JlYXRpb25cIiwgXCJ0aWNrZXRDcmVhdGlvblwiXSk7XHJcbiAgY29uc3QgY3JlYXRpb24gPSBhc1JlY29yZChjcmVhdGlvblJhdyk7XHJcbiAgcmV0dXJuIHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChjcmVhdGlvbiwgW1wiRmlsZUlkXCIsIFwiZmlsZUlkXCJdKSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZVVwbG9hZFJlc3VsdCA9IChyZXNwb25zZURhdGE6IHVua25vd24pOiBVcGxvYWRTeW5jUmVzdWx0ID0+IHtcclxuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmVzcG9uc2VEYXRhKTtcclxuICByZXR1cm4ge1xyXG4gICAgdXJsRmlsZTogc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlVybEZpbGVcIiwgXCJ1cmxGaWxlXCJdKSksXHJcbiAgICBmaWxlTmFtZTogc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIkZpbGVOYW1lXCIsIFwiZmlsZU5hbWVcIl0pKSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkVGlja2V0SWFQYXlsb2FkID0gKGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQsIHVwbG9hZDogVXBsb2FkU3luY1Jlc3VsdCk6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9PiB7XHJcbiAgY29uc3QgaWFMaW5lcyA9IGRyYWZ0LmxpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICBkZXNjcmlwdGlvbjogbGluZS5kZXNjcmlwdGlvbixcbiAgICBxdHk6IGxpbmUucXR5LFxuICAgIHByaWNlOiBsaW5lLnByaWNlLFxuICAgIHRvdGFsQW1vdW50OiBsaW5lLnRvdGFsQW1vdW50LFxuICB9KSk7XG5cclxuICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QgPSB7XHJcbiAgICBkZXNjcmlwdGlvbjogZHJhZnQuZGVzY3JpcHRpb24sXHJcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0LmN1cnJlbmN5Q29kZSxcbiAgICB0b3RhbEFtb3VudDogZHJhZnQudG90YWxBbW91bnQgIT09IDAgPyBkcmFmdC50b3RhbEFtb3VudCA6IHVuZGVmaW5lZCxcbiAgICB0cmFuc0RhdGU6IGRyYWZ0LnRyYW5zRGF0ZSxcbiAgICB0aWNrZXREYXRlOiBkcmFmdC50aWNrZXREYXRlIHx8IGRyYWZ0LnRyYW5zRGF0ZSxcbiAgICB0aWNrZXRUaW1lOiBkcmFmdC50aWNrZXRUaW1lIHx8IHVuZGVmaW5lZCxcbiAgICBjb21lbnRhcmlvOiBkcmFmdC5jb21lbnRhcmlvIHx8IHVuZGVmaW5lZCxcbiAgICB1cmxGaWxlOiB1cGxvYWQudXJsRmlsZSB8fCB1bmRlZmluZWQsXG4gICAgZmlsZU5hbWU6IHVwbG9hZC5maWxlTmFtZSB8fCB1bmRlZmluZWQsXHJcbiAgICBsaW5lczogaWFMaW5lcyxcclxuICB9O1xyXG5cclxuICBpZiAoZHJhZnQuZ2FzdG9UeXBlICE9PSBudWxsKSB7XHJcbiAgICBwYXlsb2FkLmdhc3RvVHlwZSA9IGRyYWZ0Lmdhc3RvVHlwZSBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBwYXlsb2FkO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkU2hlZXRMaW5lUGF5bG9hZCA9IChcclxuICBkcmFmdDogTm9ybWFsaXplZERyYWZ0LFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIHByb2plY3RJZDogc3RyaW5nXHJcbik6IEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0IHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgbGluZUZyb21EcmFmdCA9IGRyYWZ0LmxpbmVzWzBdO1xyXG4gIC8vIEJ1aWxkIGEgc2luZ2xlIGV4cGVuc2UgbGluZSBmcm9tIHRpY2tldCBoZWFkZXIgZGF0YSB0byBhdm9pZCBsaW5lLWxldmVsIGRlc2NyaXB0aW9uIGxlYWthZ2UuXHJcbiAgY29uc3QgaGVhZGVyVG90YWwgPSBkcmFmdC50b3RhbEFtb3VudCA+IDAgPyBkcmFmdC50b3RhbEFtb3VudCA6IDA7XHJcbiAgY29uc3QgZmFsbGJhY2tUb3RhbCA9IGxpbmVGcm9tRHJhZnQ/LnRvdGFsQW1vdW50IHx8IDA7XHJcbiAgY29uc3QgZWZmZWN0aXZlVG90YWwgPSBoZWFkZXJUb3RhbCA+IDAgPyBoZWFkZXJUb3RhbCA6IGZhbGxiYWNrVG90YWw7XHJcbiAgaWYgKCEoZWZmZWN0aXZlVG90YWwgPiAwKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IHR5cGVWYWx1ZUNhbmRpZGF0ZSA9IGRyYWZ0Lmdhc3RvVHlwZSB8fCBsaW5lRnJvbURyYWZ0Py50eXBlVmFsdWUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcclxuICBjb25zdCBzYWZlVHlwZVZhbHVlID0gTnVtYmVyKHR5cGVWYWx1ZUNhbmRpZGF0ZSk7XHJcbiAgY29uc3QgdHlwZVZhbHVlID0gTnVtYmVyLmlzSW50ZWdlcihzYWZlVHlwZVZhbHVlKSAmJiBzYWZlVHlwZVZhbHVlID4gMCA/IHNhZmVUeXBlVmFsdWUgOiBERUZBVUxUX1RJQ0tFVF9HQVNUT19UWVBFO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdHJhbnNEYXRlOiBkcmFmdC50cmFuc0RhdGUgfHwgbGluZUZyb21EcmFmdD8udHJhbnNEYXRlIHx8IGdldFRvZGF5RGRNbVl5eXkoKSxcclxuICAgIHR5cGVWYWx1ZSxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChkcmFmdC5kZXNjcmlwdGlvbikgfHwgXCJUaWNrZXRcIixcclxuICAgIGludGVybmFjaW9uYWw6IGZhbHNlLFxyXG4gICAgZmlsZUlkLFxyXG4gICAgdGlja2V0OiB0cnVlLFxyXG4gICAgcXR5OiAxLFxyXG4gICAgcHJpY2U6IGVmZmVjdGl2ZVRvdGFsLFxyXG4gICAgcHJvaklkOiBzYWZlVGV4dChwcm9qZWN0SWQpIHx8IHVuZGVmaW5lZCxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHBlcnNpc3RUcmFjZUxpc3QgPSAodHJhY2VMaXN0OiBUaWNrZXRUcmFjZUVudHJ5W10pOiB2b2lkID0+IHtcclxuICB0cnkge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShUSUNLRVRfVFJBQ0VfU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHRyYWNlTGlzdCkpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gSWdub3JlIHN0b3JhZ2UgZmFpbHVyZXMgaW4gcmVzdHJpY3RlZCBicm93c2VyIGNvbnRleHRzLlxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjYWNoZUltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nLCBmaWxlOiBGaWxlKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybjtcclxuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcclxuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcclxuICBhd2FpdCBjYWNoZS5wdXQoXHJcbiAgICBuZXcgUmVxdWVzdChyZXF1ZXN0VXJsKSxcclxuICAgIG5ldyBSZXNwb25zZShmaWxlLCB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBzYWZlVGV4dChmaWxlLnR5cGUpIHx8IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVhZENhY2hlZEltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTxCbG9iIHwgbnVsbD4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICEoXCJjYWNoZXNcIiBpbiB3aW5kb3cpKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcclxuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcclxuICBjb25zdCBjYWNoZWRSZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKHJlcXVlc3RVcmwpO1xyXG4gIGlmICghY2FjaGVkUmVzcG9uc2UpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBjYWNoZWRSZXNwb25zZS5ibG9iKCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuO1xyXG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xyXG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xyXG4gIGF3YWl0IGNhY2hlLmRlbGV0ZShyZXF1ZXN0VXJsKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTLFxyXG4gIGNhY2hlSW1hZ2VGaWxlLFxyXG4gIGV4dHJhY3RUcmFjZUlkRnJvbUVycm9yLFxyXG4gIGlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlLFxyXG4gIHBlcnNpc3RUcmFjZUxpc3QsXHJcbiAgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlLFxyXG4gIHJlc29sdmVSYW5kb21LZXksXHJcbiAgdHlwZSBRdWlja0Zsb3dQcm9ncmVzc0tleSxcclxuICB0eXBlIFRpY2tldEltYWdlU291cmNlLFxyXG4gIHR5cGUgVGlja2V0VHJhY2VFbnRyeSxcclxuICB0eXBlIFVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0FyZ3MsXHJcbn0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xyXG5pbXBvcnQgeyBvcHRpbWl6ZVRpY2tldEltYWdlRm9yVXBsb2FkLCB0eXBlIFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0IH0gZnJvbSBcIi4vdGlja2V0SW1hZ2VPcHRpbWl6YXRpb24udHNcIjtcclxuXHJcbnR5cGUgUXVpY2tDcmVhdGVQYXJ0aWFsVGlja2V0U3RhdGUgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgbGlua2VkVG9TaGVldDogYm9vbGVhbjtcclxuICBjb21wbGV0ZWRTdGFnZTogc3RyaW5nO1xyXG4gIHVybEZpbGU6IHN0cmluZztcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG4gIHByb2Nlc3NlZEJ5QUk6IGJvb2xlYW4gfCBudWxsO1xyXG59O1xyXG5cclxudHlwZSBRdWlja1RpY2tldEF0dGVtcHRDb250ZXh0ID0ge1xyXG4gIGF0dGVtcHRJZDogc3RyaW5nO1xyXG4gIHNvdXJjZTogVGlja2V0SW1hZ2VTb3VyY2U7XHJcbiAgc3RhcnRlZEF0OiBudW1iZXI7XHJcbiAgb3B0aW1pemF0aW9uOiBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdDtcclxufTtcclxuXHJcbnR5cGUgUXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlID0ge1xyXG4gIGtleTogUXVpY2tGbG93UHJvZ3Jlc3NLZXk7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHN0YXRlOiBcImNvbXBsZXRlZFwiIHwgXCJhY3RpdmVcIiB8IFwicGVuZGluZ1wiO1xyXG59O1xyXG5cclxuY29uc3QgUVVJQ0tfVElDS0VUX0ZMT1dfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtcXVpY2stdGlja2V0XVwiO1xyXG5jb25zdCBRVUlDS19USUNLRVRfVklTVUFMX1NUQUdFX01TID0ge1xyXG4gIHN5bmNpbmdGaWxlOiAxMjAwLFxyXG4gIGZpbmFsaXppbmdJYTogMzYwMCxcclxuICBsaW5raW5nRXhwZW5zZUxpbmU6IDg1MDAsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG5jb25zdCBsb2dRdWlja1RpY2tldEluZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKFFVSUNLX1RJQ0tFVF9GTE9XX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvZ1F1aWNrVGlja2V0V2FybiA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLndhcm4oUVVJQ0tfVElDS0VUX0ZMT1dfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nUXVpY2tUaWNrZXRFcnJvciA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5lcnJvcihRVUlDS19USUNLRVRfRkxPV19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRGaWxlU2l6ZSA9IChzaXplOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghKHNpemUgPiAwKSkgcmV0dXJuIFwiMCBCXCI7XHJcbiAgaWYgKHNpemUgPj0gMTAyNCAqIDEwMjQpIHJldHVybiBgJHsoc2l6ZSAvICgxMDI0ICogMTAyNCkpLnRvRml4ZWQoMil9IE1CYDtcclxuICBpZiAoc2l6ZSA+PSAxMDI0KSByZXR1cm4gYCR7KHNpemUgLyAxMDI0KS50b0ZpeGVkKDEpfSBLQmA7XHJcbiAgcmV0dXJuIGAke3NpemV9IEJgO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGaWxlTG9nRGF0YSA9IChmaWxlOiBGaWxlKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6IHNhZmVUZXh0KGZpbGUubmFtZSksXHJcbiAgICB0eXBlOiBzYWZlVGV4dChmaWxlLnR5cGUpLFxyXG4gICAgc2l6ZUJ5dGVzOiBOdW1iZXIoZmlsZS5zaXplIHx8IDApLFxyXG4gICAgc2l6ZVRleHQ6IGZvcm1hdEZpbGVTaXplKE51bWJlcihmaWxlLnNpemUgfHwgMCkpLFxyXG4gICAgbGFzdE1vZGlmaWVkOiBOdW1iZXIoZmlsZS5sYXN0TW9kaWZpZWQgfHwgMCksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRmFsbGJhY2tPcHRpbWl6YXRpb25SZXN1bHQgPSAoZmlsZTogRmlsZSk6IFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0ID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZmlsZSxcclxuICAgIGNoYW5nZWQ6IGZhbHNlLFxyXG4gICAgcmVhc29uOiBcIm9wdGltaXphdGlvbi1lcnJvclwiLFxyXG4gICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICByZWVuY29kZWQ6IGZhbHNlLFxyXG4gICAgZWxhcHNlZE1zOiAwLFxyXG4gICAgb3JpZ2luYWw6IHtcclxuICAgICAgbmFtZTogc2FmZVRleHQoZmlsZS5uYW1lKSxcclxuICAgICAgdHlwZTogc2FmZVRleHQoZmlsZS50eXBlKSxcclxuICAgICAgc2l6ZTogTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSxcclxuICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgIGhlaWdodDogbnVsbCxcclxuICAgIH0sXHJcbiAgICBvdXRwdXQ6IHtcclxuICAgICAgbmFtZTogc2FmZVRleHQoZmlsZS5uYW1lKSxcclxuICAgICAgdHlwZTogc2FmZVRleHQoZmlsZS50eXBlKSxcclxuICAgICAgc2l6ZTogTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSxcclxuICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgIGhlaWdodDogbnVsbCxcclxuICAgIH0sXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkT3B0aW1pemF0aW9uTG9nRGF0YSA9IChyZXN1bHQ6IFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0KSA9PiB7XHJcbiAgY29uc3Qgc2F2ZWRCeXRlcyA9IE1hdGgubWF4KDAsIHJlc3VsdC5vcmlnaW5hbC5zaXplIC0gcmVzdWx0Lm91dHB1dC5zaXplKTtcclxuICBjb25zdCBzYXZlZFJhdGlvID0gcmVzdWx0Lm9yaWdpbmFsLnNpemUgPiAwID8gc2F2ZWRCeXRlcyAvIHJlc3VsdC5vcmlnaW5hbC5zaXplIDogMDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNoYW5nZWQ6IHJlc3VsdC5jaGFuZ2VkLFxyXG4gICAgcmVhc29uOiByZXN1bHQucmVhc29uLFxyXG4gICAgcmVzaXplZDogcmVzdWx0LnJlc2l6ZWQsXHJcbiAgICByZWVuY29kZWQ6IHJlc3VsdC5yZWVuY29kZWQsXHJcbiAgICBlbGFwc2VkTXM6IHJlc3VsdC5lbGFwc2VkTXMsXHJcbiAgICBvcmlnaW5hbDoge1xyXG4gICAgICAuLi5yZXN1bHQub3JpZ2luYWwsXHJcbiAgICAgIHNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShyZXN1bHQub3JpZ2luYWwuc2l6ZSksXHJcbiAgICB9LFxyXG4gICAgb3V0cHV0OiB7XHJcbiAgICAgIC4uLnJlc3VsdC5vdXRwdXQsXHJcbiAgICAgIHNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShyZXN1bHQub3V0cHV0LnNpemUpLFxyXG4gICAgfSxcclxuICAgIHNhdmVkQnl0ZXMsXHJcbiAgICBzYXZlZFRleHQ6IGZvcm1hdEZpbGVTaXplKHNhdmVkQnl0ZXMpLFxyXG4gICAgc2F2ZWRSYXRpbzogTnVtYmVyKHNhdmVkUmF0aW8udG9GaXhlZCg0KSksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdFZhbGlkYXRpb25FcnJvcnMgPSAoXHJcbiAgZXJyb3JzOiBBcnJheTx7IEZpZWxkPzogdW5rbm93bjsgTWVzc2FnZT86IHVua25vd24gfSB8IG51bGwgfCB1bmRlZmluZWQ+IHwgbnVsbCB8IHVuZGVmaW5lZFxyXG4pOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheShlcnJvcnMpIHx8IGVycm9ycy5sZW5ndGggPT09IDApIHJldHVybiBcIlwiO1xyXG5cclxuICByZXR1cm4gZXJyb3JzXHJcbiAgICAubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBmaWVsZCA9IHNhZmVUZXh0KGVudHJ5Py5GaWVsZCk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzYWZlVGV4dChlbnRyeT8uTWVzc2FnZSk7XHJcbiAgICAgIGlmIChmaWVsZCAmJiBtZXNzYWdlKSByZXR1cm4gYCR7ZmllbGR9OiAke21lc3NhZ2V9YDtcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UgfHwgZmllbGQ7XHJcbiAgICB9KVxyXG4gICAgLmZpbHRlcihCb29sZWFuKVxyXG4gICAgLmpvaW4oXCIgfCBcIik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93ID0gKHtcclxuICBzaGVldElkID0gXCJcIixcclxuICBwcm9qZWN0SWQgPSBcIlwiLFxyXG4gIGN1cnJlbmN5Q29kZSA9IFwiXCIsXHJcbiAgYXhVc2VySWRPdmVycmlkZSA9IFwiXCIsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNTaGVldExvY2tlZCxcclxuICBsaW5rVG9TaGVldCA9IHRydWUsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbiAgb25Db21wbGV0ZWQsXHJcbn06IFVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0FyZ3MpID0+IHtcclxuICBjb25zdCBbc291cmNlUGlja2VyT3Blbiwgc2V0U291cmNlUGlja2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwcm9ncmVzc0tleSwgc2V0UHJvZ3Jlc3NLZXldID0gdXNlU3RhdGU8UXVpY2tGbG93UHJvZ3Jlc3NLZXkgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbZGlzcGxheVByb2dyZXNzS2V5LCBzZXREaXNwbGF5UHJvZ3Jlc3NLZXldID0gdXNlU3RhdGU8UXVpY2tGbG93UHJvZ3Jlc3NLZXkgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbcHJvZ3Jlc3NFbGFwc2VkTXMsIHNldFByb2dyZXNzRWxhcHNlZE1zXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYXR0ZW1wdElkLCBzZXRBdHRlbXB0SWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFt0cmFjZUxpc3QsIHNldFRyYWNlTGlzdF0gPSB1c2VTdGF0ZTxUaWNrZXRUcmFjZUVudHJ5W10+KFtdKTtcbiAgY29uc3QgW3BhcnRpYWxUaWNrZXRGYWlsdXJlLCBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZV0gPSB1c2VTdGF0ZTxRdWlja0NyZWF0ZVBhcnRpYWxUaWNrZXRTdGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXRlc3RGaWxlUmVmID0gdXNlUmVmPHsgY2FjaGVLZXk6IHN0cmluZzsgZmlsZTogRmlsZSB9IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHByb2dyZXNzU3RhcnRlZEF0UmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuXHJcbiAgY29uc3QgcHJvZ3Jlc3NNZXNzYWdlID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBlZmZlY3RpdmVQcm9ncmVzc0tleSA9IGRpc3BsYXlQcm9ncmVzc0tleSB8fCBwcm9ncmVzc0tleTtcclxuICAgIGlmIChlZmZlY3RpdmVQcm9ncmVzc0tleSA9PT0gXCJ1cGxvYWRpbmdJbWFnZVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX1VwbG9hZGluZ0ltYWdlXCIsIFwiVXBsb2FkaW5nIGltYWdlLi4uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcImNyZWF0aW5nVGlja2V0XCIpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfQ3JlYXRpbmdUaWNrZXRcIiwgXCJDcmVhdGluZyB0aWNrZXQuLi5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwic3luY2luZ0ZpbGVcIikge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19TeW5jaW5nRmlsZVwiLCBcIlN5bmNpbmcgZmlsZS4uLlwiKTtcclxuICAgIH1cclxuICAgIGlmIChlZmZlY3RpdmVQcm9ncmVzc0tleSA9PT0gXCJmaW5hbGl6aW5nSWFcIikge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19GaW5hbGl6aW5nXCIsIFwiRmluYWxpemluZyBJQS4uLlwiKTtcclxuICAgIH1cclxuICAgIGlmIChlZmZlY3RpdmVQcm9ncmVzc0tleSA9PT0gXCJsaW5raW5nRXhwZW5zZUxpbmVcIikge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19MaW5raW5nTGluZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lLi4uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcImRvbmVcIikge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19Eb25lXCIsIFwiRG9uZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH0sIFtkaXNwbGF5UHJvZ3Jlc3NLZXksIHByb2dyZXNzS2V5XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kgfHwgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHN5bmNFbGFwc2VkID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCBzdGFydGVkQXQgPSBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50O1xyXG4gICAgICBpZiAoc3RhcnRlZEF0ID09PSBudWxsKSByZXR1cm47XHJcbiAgICAgIHNldFByb2dyZXNzRWxhcHNlZE1zKE1hdGgubWF4KDAsIERhdGUubm93KCkgLSBzdGFydGVkQXQpKTtcclxuICAgIH07XHJcblxyXG4gICAgc3luY0VsYXBzZWQoKTtcclxuICAgIGNvbnN0IGludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoc3luY0VsYXBzZWQsIDI1MCk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbChpbnRlcnZhbElkKTtcclxuICAgIH07XHJcbiAgfSwgW2J1c3ldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghYnVzeSkge1xyXG4gICAgICBpZiAocHJvZ3Jlc3NLZXkgIT09IG51bGwpIHtcclxuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkocHJvZ3Jlc3NLZXkpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IG51bGwgfHwgcHJvZ3Jlc3NLZXkgPT09IFwidXBsb2FkaW5nSW1hZ2VcIiB8fCBwcm9ncmVzc0tleSA9PT0gXCJkb25lXCIpIHtcclxuICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KHByb2dyZXNzS2V5KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShwcm9ncmVzc0tleSk7XHJcbiAgICBpZiAocHJvZ3Jlc3NLZXkgIT09IFwiY3JlYXRpbmdUaWNrZXRcIikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGltZXJzOiBudW1iZXJbXSA9IFtcclxuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShcInN5bmNpbmdGaWxlXCIpO1xyXG4gICAgICB9LCBRVUlDS19USUNLRVRfVklTVUFMX1NUQUdFX01TLnN5bmNpbmdGaWxlKSxcclxuICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShcImZpbmFsaXppbmdJYVwiKTtcclxuICAgICAgfSwgUVVJQ0tfVElDS0VUX1ZJU1VBTF9TVEFHRV9NUy5maW5hbGl6aW5nSWEpLFxyXG4gICAgXTtcclxuXHJcbiAgICBpZiAobGlua1RvU2hlZXQpIHtcclxuICAgICAgdGltZXJzLnB1c2goXHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwibGlua2luZ0V4cGVuc2VMaW5lXCIpO1xyXG4gICAgICAgIH0sIFFVSUNLX1RJQ0tFVF9WSVNVQUxfU1RBR0VfTVMubGlua2luZ0V4cGVuc2VMaW5lKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHRpbWVycy5mb3JFYWNoKCh0aW1lcklkKSA9PiB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVySWQpKTtcclxuICAgIH07XHJcbiAgfSwgW2J1c3ksIGxpbmtUb1NoZWV0LCBwcm9ncmVzc0tleV0pO1xyXG5cclxuICBjb25zdCBwcm9ncmVzc1N0YWdlcyA9IHVzZU1lbW88UXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlW10+KCgpID0+IHtcclxuICAgIGNvbnN0IHZpc2libGVTdGFnZXM6IFF1aWNrRmxvd1Byb2dyZXNzS2V5W10gPSBsaW5rVG9TaGVldFxyXG4gICAgICA/IFtcInVwbG9hZGluZ0ltYWdlXCIsIFwiY3JlYXRpbmdUaWNrZXRcIiwgXCJzeW5jaW5nRmlsZVwiLCBcImZpbmFsaXppbmdJYVwiLCBcImxpbmtpbmdFeHBlbnNlTGluZVwiXVxyXG4gICAgICA6IFtcInVwbG9hZGluZ0ltYWdlXCIsIFwiY3JlYXRpbmdUaWNrZXRcIiwgXCJzeW5jaW5nRmlsZVwiLCBcImZpbmFsaXppbmdJYVwiXTtcclxuXHJcbiAgICBjb25zdCBzdGFnZUNvcHk6IFJlY29yZDxRdWlja0Zsb3dQcm9ncmVzc0tleSwgeyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nIH0+ID0ge1xyXG4gICAgICB1cGxvYWRpbmdJbWFnZToge1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfUHJlcGFyZV9UaXRsZVwiLCBcIlByZXBhcmluZyBpbWFnZVwiKSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogaW5kVChcclxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfUHJlcGFyZV9Cb2R5XCIsXHJcbiAgICAgICAgICBcIldlIHZhbGlkYXRlIHRoZSBpbWFnZSBhbmQgcHJlcGFyZSBpdCBmb3IgYSByZWxpYWJsZSB1cGxvYWQuXCJcclxuICAgICAgICApLFxyXG4gICAgICB9LFxyXG4gICAgICBjcmVhdGluZ1RpY2tldDoge1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfQ3JlYXRlX1RpdGxlXCIsIFwiQ3JlYXRpbmcgdGlja2V0XCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19DcmVhdGVfQm9keVwiLFxyXG4gICAgICAgICAgXCJUaGUgYmFja2VuZCByZXNlcnZlcyB0aGUgdGlja2V0IGFuZCBzdGFydHMgdGhlIHNlcnZlci1zaWRlIGZsb3cuXCJcclxuICAgICAgICApLFxyXG4gICAgICB9LFxyXG4gICAgICBzeW5jaW5nRmlsZToge1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfRmlsZV9UaXRsZVwiLCBcIlN5bmNpbmcgZmlsZVwiKSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogaW5kVChcclxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfRmlsZV9Cb2R5XCIsXHJcbiAgICAgICAgICBcIlRoZSB1cGxvYWRlZCBpbWFnZSBpcyBiZWluZyBhdHRhY2hlZCB0byB0aGUgdGlja2V0IHJlY29yZC5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIGZpbmFsaXppbmdJYToge1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfSWFfVGl0bGVcIiwgXCJSZWFkaW5nIHRpY2tldCBkYXRhXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19JYV9Cb2R5XCIsXHJcbiAgICAgICAgICBcIldlIGFyZSBleHRyYWN0aW5nIGRhdGUsIGFtb3VudCBhbmQgZGVzY3JpcHRpb24gZnJvbSB0aGUgaW1hZ2UuXCJcclxuICAgICAgICApLFxyXG4gICAgICB9LFxyXG4gICAgICBsaW5raW5nRXhwZW5zZUxpbmU6IHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0xpbmtfVGl0bGVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZVwiKSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogaW5kVChcclxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfTGlua19Cb2R5XCIsXHJcbiAgICAgICAgICBcIlRoZSBnZW5lcmF0ZWQgdGlja2V0IGlzIGJlaW5nIGNvbm5lY3RlZCB0byB0aGUgY3VycmVudCBleHBlbnNlIHNoZWV0LlwiXHJcbiAgICAgICAgKSxcclxuICAgICAgfSxcclxuICAgICAgZG9uZToge1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0RvbmVcIiwgXCJEb25lXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0RvbmVcIiwgXCJEb25lXCIpLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBhY3RpdmVTdGFnZUtleSA9XHJcbiAgICAgIHByb2dyZXNzS2V5ID09PSBcImRvbmVcIiA/IHZpc2libGVTdGFnZXNbdmlzaWJsZVN0YWdlcy5sZW5ndGggLSAxXSA6IGRpc3BsYXlQcm9ncmVzc0tleSB8fCBwcm9ncmVzc0tleTtcclxuICAgIGNvbnN0IGFjdGl2ZVN0YWdlSW5kZXggPSBhY3RpdmVTdGFnZUtleSA/IHZpc2libGVTdGFnZXMuaW5kZXhPZihhY3RpdmVTdGFnZUtleSkgOiAtMTtcclxuXHJcbiAgICByZXR1cm4gdmlzaWJsZVN0YWdlcy5tYXAoKHN0YWdlS2V5LCBpbmRleCkgPT4gKHtcclxuICAgICAga2V5OiBzdGFnZUtleSxcclxuICAgICAgdGl0bGU6IHN0YWdlQ29weVtzdGFnZUtleV0udGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBzdGFnZUNvcHlbc3RhZ2VLZXldLmRlc2NyaXB0aW9uLFxyXG4gICAgICBzdGF0ZTpcclxuICAgICAgICBwcm9ncmVzc0tleSA9PT0gXCJkb25lXCIgfHwgKGFjdGl2ZVN0YWdlSW5kZXggPj0gMCAmJiBpbmRleCA8IGFjdGl2ZVN0YWdlSW5kZXgpXHJcbiAgICAgICAgICA/IFwiY29tcGxldGVkXCJcclxuICAgICAgICAgIDogaW5kZXggPT09IGFjdGl2ZVN0YWdlSW5kZXhcclxuICAgICAgICAgICAgPyBcImFjdGl2ZVwiXHJcbiAgICAgICAgICAgIDogXCJwZW5kaW5nXCIsXHJcbiAgICB9KSk7XHJcbiAgfSwgW2Rpc3BsYXlQcm9ncmVzc0tleSwgbGlua1RvU2hlZXQsIHByb2dyZXNzS2V5XSk7XHJcblxyXG4gIGNvbnN0IGFkZFRyYWNlID0gdXNlQ2FsbGJhY2soKHN0ZXA6IHN0cmluZywgdHJhY2VJZDogc3RyaW5nKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlVHJhY2VJZCA9IHNhZmVUZXh0KHRyYWNlSWQpO1xyXG4gICAgaWYgKCFzYWZlVHJhY2VJZCkgcmV0dXJuO1xyXG5cclxuICAgIHNldFRyYWNlTGlzdCgocHJldmlvdXMpID0+IHtcclxuICAgICAgY29uc3QgbmV4dCA9IFtcclxuICAgICAgICAuLi5wcmV2aW91cyxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBzdGVwLFxyXG4gICAgICAgICAgdHJhY2VJZDogc2FmZVRyYWNlSWQsXHJcbiAgICAgICAgICBhdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIF07XHJcbiAgICAgIHBlcnNpc3RUcmFjZUxpc3QobmV4dCk7XHJcbiAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckNhY2hlZEN1cnJlbnRJbWFnZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGNhY2hlS2V5ID0gbGF0ZXN0RmlsZVJlZi5jdXJyZW50Py5jYWNoZUtleTtcclxuICAgIGlmICghY2FjaGVLZXkpIHJldHVybjtcclxuICAgIHZvaWQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKGNhY2hlS2V5KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgIC8vIElnbm9yZSBjYWNoZSBjbGVhbnVwIGZhaWx1cmVzIGluIHJlc3RyaWN0ZWQgYnJvd3NlciBjb250ZXh0cy5cclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJGbG93U3RhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xuICAgIHNldFRyYWNlTGlzdChbXSk7XG4gICAgcGVyc2lzdFRyYWNlTGlzdChbXSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBidWlsZEFwaU9wdGlvbnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlQXhVc2VySWQgPSBzYWZlVGV4dChheFVzZXJJZE92ZXJyaWRlKTtcclxuICAgIGlmICghc2FmZUF4VXNlcklkKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIlgtSU5ELUF4VXNlcklkXCI6IHNhZmVBeFVzZXJJZCxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfSwgW2F4VXNlcklkT3ZlcnJpZGVdKTtcclxuXHJcbiAgY29uc3QgZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uID0gdXNlQ2FsbGJhY2soKCk6IGJvb2xlYW4gPT4ge1xyXG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlIHx8IGlzQ3JlYXRlTW9kZSB8fCBpc1NoZWV0TG9ja2VkIHx8IChsaW5rVG9TaGVldCAmJiAhc2hlZXRJZCkpIHtcclxuICAgICAgb25Gb3JiaWRkZW4oKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSwgW2NhbkNyZWF0ZUV4cGVuc2UsIGlzQ3JlYXRlTW9kZSwgaXNTaGVldExvY2tlZCwgbGlua1RvU2hlZXQsIG9uRm9yYmlkZGVuLCBzaGVldElkXSk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVVaUVycm9yTWVzc2FnZSA9IHVzZUNhbGxiYWNrKChlcnJvcjogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XHJcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25UZXh0ID0gZm9ybWF0VmFsaWRhdGlvbkVycm9ycyhlcnJvci52YWxpZGF0aW9uRXJyb3JzKTtcclxuICAgICAgaWYgKHZhbGlkYXRpb25UZXh0KSB7XHJcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25UZXh0O1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MjkpIHtcclxuICAgICAgICByZXR1cm4gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1JhdGVMaW1pdFwiLCBcIlRvbyBtYW55IHJlcXVlc3RzLlwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA0MDQpIHtcclxuICAgICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX05vdEZvdW5kXCIsIFwiUmVjb3JkIG5vdCBmb3VuZC5cIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNTAwKSB7XHJcbiAgICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TZXJ2ZXJcIiwgXCJTZXJ2ZXIgZXJyb3IuXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcclxuICAgICAgPyBzYWZlVGV4dChlcnJvci5tZXNzYWdlKVxyXG4gICAgICA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGFkZFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFjZXMgPSB1c2VDYWxsYmFjayhcclxuICAgIChyZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQpID0+IHtcclxuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtcXVpY2stY3JlYXRlXCIsIHNhZmVUZXh0KHJlc3BvbnNlLlRyYWNlSWQpKTtcclxuXHJcbiAgICAgIGNvbnN0IHN0ZXBUcmFjZUlkcyA9IHJlc3BvbnNlLkRhdGE/LlN0ZXBUcmFjZUlkcztcclxuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtY3JlYXRlXCIsIHNhZmVUZXh0KHN0ZXBUcmFjZUlkcz8uVGlja2V0Q3JlYXRlKSk7XHJcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LWZpbGUtdXBsb2FkXCIsIHNhZmVUZXh0KHN0ZXBUcmFjZUlkcz8uRmlsZVVwbG9hZCkpO1xyXG4gICAgICBhZGRUcmFjZShcImV4cGVuc2Vmcm9tdGlja2V0XCIsIHNhZmVUZXh0KHN0ZXBUcmFjZUlkcz8uRHJhZnRFeHRyYWN0KSk7XHJcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LWZpbmFsaXplXCIsIHNhZmVUZXh0KHN0ZXBUcmFjZUlkcz8uVGlja2V0RmluYWxpemUpKTtcclxuICAgICAgYWRkVHJhY2UoXCJleHBlbnNlLXNoZWV0LWxpbmtcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5TaGVldExpbmspKTtcclxuICAgIH0sXHJcbiAgICBbYWRkVHJhY2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZVF1aWNrQ3JlYXRlRmFpbHVyZU1lc3NhZ2UgPSB1c2VDYWxsYmFjaygocmVzcG9uc2U6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0KTogc3RyaW5nID0+IHtcclxuICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5EYXRhO1xyXG4gICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoZGF0YT8uRmlsZUlkKTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZFN0YWdlID0gc2FmZVRleHQoZGF0YT8uQ29tcGxldGVkU3RhZ2UpO1xyXG4gICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSk7XHJcbiAgICBjb25zdCB2YWxpZGF0aW9uVGV4dCA9IGZvcm1hdFZhbGlkYXRpb25FcnJvcnMocmVzcG9uc2UuRXJyb3JzKTtcclxuICAgIGNvbnN0IHJldHJ5QWZ0ZXIgPSBzYWZlVGV4dChyZXNwb25zZS5SZXRyeUFmdGVyKTtcclxuICAgIGNvbnN0IG1lc3NhZ2VQYXJ0czogc3RyaW5nW10gPSBbXTtcclxuXHJcbiAgICBpZiAocmVzcG9uc2UuSHR0cFN0YXR1cyA9PT0gNDI5KSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKHJlc3BvbnNlTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmF0ZUxpbWl0XCIsIFwiVG9vIG1hbnkgcmVxdWVzdHMuXCIpKTtcclxuICAgICAgaWYgKHJldHJ5QWZ0ZXIpIHtcclxuICAgICAgICBtZXNzYWdlUGFydHMucHVzaChcclxuICAgICAgICAgIGluZEZvcm1hdChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1JldHJ5QWZ0ZXJIaW50XCIsIFwiUmV0cnkgYWZ0ZXIgezB9LlwiLCByZXRyeUFmdGVyKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvblRleHQpIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2godmFsaWRhdGlvblRleHQpO1xyXG4gICAgfSBlbHNlIGlmIChyZXNwb25zZU1lc3NhZ2UpIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2gocmVzcG9uc2VNZXNzYWdlKTtcclxuICAgIH0gZWxzZSBpZiAoZmlsZUlkKSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKFxyXG4gICAgICAgIGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1BhcnRpYWxcIixcclxuICAgICAgICAgIFwiVGhlIHRpY2tldCB3YXMgY3JlYXRlZCwgYnV0IHRoZSBmdWxsIHByb2Nlc3MgZGlkIG5vdCBmaW5pc2guXCJcclxuICAgICAgICApXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLkh0dHBTdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm90Rm91bmRcIiwgXCJSZWNvcmQgbm90IGZvdW5kLlwiKSk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLkh0dHBTdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfU2VydmVyXCIsIFwiU2VydmVyIGVycm9yLlwiKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChmaWxlSWQgJiYgY29tcGxldGVkU3RhZ2UpIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goaW5kRm9ybWF0KFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfU3RhZ2VcIiwgXCJDb21wbGV0ZWQgc3RhZ2U6IHswfS5cIiwgY29tcGxldGVkU3RhZ2UpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWVzc2FnZVBhcnRzLmZpbHRlcihCb29sZWFuKS5qb2luKFwiIFwiKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNvbXBsZXRlRmxvd1N1Y2Nlc3MgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChmaWxlSWQ6IHN0cmluZywgbGlua2VkVG9TaGVldDogYm9vbGVhbiwgY2FjaGVLZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICBzZXRQcm9ncmVzc0tleShcImRvbmVcIik7XHJcbiAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShcImRvbmVcIik7XHJcbiAgICAgIGF3YWl0IHJlbW92ZUNhY2hlZEltYWdlRmlsZShjYWNoZUtleSk7XG4gICAgICBzZXRBdHRlbXB0SWQoXCJcIik7XG4gICAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcclxuICAgICAgb25Db21wbGV0ZWQ/Lih7IGZpbGVJZCwgbGlua2VkVG9TaGVldCB9KTtcclxuICAgIH0sXHJcbiAgICBbb25Db21wbGV0ZWRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcnVuUXVpY2tDcmVhdGVGbG93ID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAoZmlsZTogRmlsZSwgY2FjaGVLZXk6IHN0cmluZywgY29udGV4dDogUXVpY2tUaWNrZXRBdHRlbXB0Q29udGV4dCk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICBzZXRCdXN5KHRydWUpO1xyXG4gICAgICBzZXRQcm9ncmVzc0tleShcImNyZWF0aW5nVGlja2V0XCIpO1xyXG4gICAgICBjbGVhckZsb3dTdGF0ZSgpO1xyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdFN0YXJ0ZWRBdCA9IERhdGUubm93KCk7XHJcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LnN0YXJ0ZWRcIiwge1xyXG4gICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcclxuICAgICAgICBsaW5rVG9TaGVldCxcclxuICAgICAgICBjYWNoZUtleSxcclxuICAgICAgICBlbGFwc2VkU2luY2VTZWxlY3Rpb25NczogTWF0aC5tYXgoMCwgcmVxdWVzdFN0YXJ0ZWRBdCAtIGNvbnRleHQuc3RhcnRlZEF0KSxcclxuICAgICAgICB1cGxvYWRGaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxyXG4gICAgICAgIG9wdGltaXphdGlvbjogYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhKGNvbnRleHQub3B0aW1pemF0aW9uKSxcclxuICAgICAgICBzaGVldElkOiBsaW5rVG9TaGVldCA/IHNhZmVUZXh0KHNoZWV0SWQpIDogXCJcIixcclxuICAgICAgICBwcm9qZWN0SWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQocHJvamVjdElkKSA6IFwiXCIsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldFF1aWNrKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpY2tldEltYWdlOiBmaWxlLFxuICAgICAgICAgICAgY3VycmVuY3lDb2RlOiBzYWZlVGV4dChjdXJyZW5jeUNvZGUpLnRvVXBwZXJDYXNlKCkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQoc2hlZXRJZCkgfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJvaklkOiBsaW5rVG9TaGVldCA/IHNhZmVUZXh0KHByb2plY3RJZCkgfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYnVpbGRBcGlPcHRpb25zKClcbiAgICAgICAgKTtcblxyXG4gICAgICAgIGFkZFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFjZXMocmVzcG9uc2UpO1xyXG5cclxuICAgICAgICBjb25zdCByZXNwb25zZUVsYXBzZWRNcyA9IE1hdGgubWF4KDAsIERhdGUubm93KCkgLSByZXF1ZXN0U3RhcnRlZEF0KTtcclxuXHJcbiAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uRmlsZUlkKTtcclxuICAgICAgICBjb25zdCBsaW5rZWRUb1NoZWV0ID0gcmVzcG9uc2UuRGF0YT8uTGlua2VkVG9TaGVldCA9PT0gdHJ1ZTtcclxuICAgICAgICBjb25zdCBwYXJ0aWFsU3RhdGUgPVxyXG4gICAgICAgICAgZmlsZUlkXHJcbiAgICAgICAgICAgID8ge1xyXG4gICAgICAgICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgICAgICAgbGlua2VkVG9TaGVldCxcclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlZFN0YWdlOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5Db21wbGV0ZWRTdGFnZSksXHJcbiAgICAgICAgICAgICAgICB1cmxGaWxlOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5VcmxGaWxlKSxcclxuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5GaWxlTmFtZSksXHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzZWRCeUFJOiByZXNwb25zZS5EYXRhPy5Qcm9jZXNzZWRCeUFJID8/IG51bGwsXHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA6IG51bGw7XHJcblxyXG4gICAgICAgIGlmIChyZXNwb25zZS5TdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKCFmaWxlSWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob0ZpbGVJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIHRpY2tldCBmaWxlIGlkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYXdhaXQgY29tcGxldGVGbG93U3VjY2VzcyhmaWxlSWQsIGxpbmtlZFRvU2hlZXQsIGNhY2hlS2V5KTtcclxuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LnN1Y2NlZWRlZFwiLCB7XHJcbiAgICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXHJcbiAgICAgICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXHJcbiAgICAgICAgICAgIGVsYXBzZWRNczogcmVzcG9uc2VFbGFwc2VkTXMsXHJcbiAgICAgICAgICAgIGh0dHBTdGF0dXM6IHJlc3BvbnNlLkh0dHBTdGF0dXMsXHJcbiAgICAgICAgICAgIHRyYWNlSWQ6IHNhZmVUZXh0KHJlc3BvbnNlLlRyYWNlSWQpLFxyXG4gICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgIGxpbmtlZFRvU2hlZXQsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlZFN0YWdlOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5Db21wbGV0ZWRTdGFnZSksXHJcbiAgICAgICAgICAgIHByb2Nlc3NlZEJ5QUk6IHJlc3BvbnNlLkRhdGE/LlByb2Nlc3NlZEJ5QUkgPz8gbnVsbCxcclxuICAgICAgICAgICAgc3RlcFRyYWNlSWRzOiByZXNwb25zZS5EYXRhPy5TdGVwVHJhY2VJZHMgPz8gbnVsbCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcnRpYWxTdGF0ZSkge1xyXG4gICAgICAgICAgc2V0UGFydGlhbFRpY2tldEZhaWx1cmUocGFydGlhbFN0YXRlKTtcclxuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInF1aWNrLWNyZWF0ZS5wYXJ0aWFsLXN0YXRlXCIsIHtcclxuICAgICAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcclxuICAgICAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcclxuICAgICAgICAgICAgZWxhcHNlZE1zOiByZXNwb25zZUVsYXBzZWRNcyxcclxuICAgICAgICAgICAgZmlsZUlkOiBwYXJ0aWFsU3RhdGUuZmlsZUlkLFxyXG4gICAgICAgICAgICBsaW5rZWRUb1NoZWV0OiBwYXJ0aWFsU3RhdGUubGlua2VkVG9TaGVldCxcclxuICAgICAgICAgICAgY29tcGxldGVkU3RhZ2U6IHBhcnRpYWxTdGF0ZS5jb21wbGV0ZWRTdGFnZSxcclxuICAgICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcGFydGlhbFN0YXRlLnByb2Nlc3NlZEJ5QUksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRNZXNzYWdlID0gcmVzb2x2ZVF1aWNrQ3JlYXRlRmFpbHVyZU1lc3NhZ2UocmVzcG9uc2UpO1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LmNvbXBsZXRlZC13aXRoLWVycm9yXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxyXG4gICAgICAgICAgZWxhcHNlZE1zOiByZXNwb25zZUVsYXBzZWRNcyxcclxuICAgICAgICAgIGh0dHBTdGF0dXM6IHJlc3BvbnNlLkh0dHBTdGF0dXMsXHJcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVGV4dChyZXNwb25zZS5UcmFjZUlkKSxcclxuICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgIGxpbmtlZFRvU2hlZXQsXHJcbiAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uQ29tcGxldGVkU3RhZ2UpLFxyXG4gICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcmVzcG9uc2UuRGF0YT8uUHJvY2Vzc2VkQnlBSSA/PyBudWxsLFxyXG4gICAgICAgICAgcmV0cnlBZnRlcjogc2FmZVRleHQocmVzcG9uc2UuUmV0cnlBZnRlciksXHJcbiAgICAgICAgICBtZXNzYWdlOiBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSxcclxuICAgICAgICAgIHJlc29sdmVkTWVzc2FnZSxcclxuICAgICAgICAgIGVycm9yczogQXJyYXkuaXNBcnJheShyZXNwb25zZS5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogW10sXHJcbiAgICAgICAgICBzdGVwVHJhY2VJZHM6IHJlc3BvbnNlLkRhdGE/LlN0ZXBUcmFjZUlkcyA/PyBudWxsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNvbHZlZE1lc3NhZ2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcclxuICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LXF1aWNrLWNyZWF0ZS1lcnJvclwiLCBleHRyYWN0VHJhY2VJZEZyb21FcnJvcihlcnJvcikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRFcnJvcihcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LmZhaWxlZFwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcclxuICAgICAgICAgIGVsYXBzZWRNczogTWF0aC5tYXgoMCwgRGF0ZS5ub3coKSAtIHJlcXVlc3RTdGFydGVkQXQpLFxyXG4gICAgICAgICAgdXBsb2FkRmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcclxuICAgICAgICAgIHRyYWNlSWQ6IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGV4dHJhY3RUcmFjZUlkRnJvbUVycm9yKGVycm9yKSA6IFwiXCIsXHJcbiAgICAgICAgICBzdGF0dXM6IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLnN0YXR1cyA6IG51bGwsXHJcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgOiBcIlwiLFxyXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yczogZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yID8gZXJyb3IudmFsaWRhdGlvbkVycm9ycyA6IFtdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVVaUVycm9yTWVzc2FnZShlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBhZGRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhY2VzLFxyXG4gICAgICBhZGRUcmFjZSxcclxuICAgICAgYnVpbGRBcGlPcHRpb25zLFxyXG4gICAgICBjbGVhckZsb3dTdGF0ZSxcclxuICAgICAgY29tcGxldGVGbG93U3VjY2VzcyxcclxuICAgICAgY3VycmVuY3lDb2RlLFxyXG4gICAgICBsaW5rVG9TaGVldCxcclxuICAgICAgcHJvamVjdElkLFxyXG4gICAgICByZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZSxcclxuICAgICAgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlLFxyXG4gICAgICBzaGVldElkLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdGVkRmlsZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUgfCBudWxsLCBzb3VyY2U6IFRpY2tldEltYWdlU291cmNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAgIGlmICghZmlsZSkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgYXR0ZW1wdElkID0gcmVzb2x2ZVJhbmRvbUtleSgpO1xyXG4gICAgICBjb25zdCBzZWxlY3Rpb25TdGFydGVkQXQgPSBEYXRlLm5vdygpO1xyXG4gICAgICBzZXRBdHRlbXB0SWQoYXR0ZW1wdElkKTtcclxuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwic2VsZWN0aW9uLnJlY2VpdmVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIGxpbmtUb1NoZWV0LFxyXG4gICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24oKSkge1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5mb3JiaWRkZW5cIiwge1xyXG4gICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgbGlua1RvU2hlZXQsXHJcbiAgICAgICAgICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICAgICAgaXNTaGVldExvY2tlZCxcclxuICAgICAgICAgIGhhc1NoZWV0SWQ6ICEhc2FmZVRleHQoc2hlZXRJZCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzYWZlVHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKHNhZmVUeXBlICYmICFzYWZlVHlwZS5zdGFydHNXaXRoKFwiaW1hZ2UvXCIpICYmICEvXFwuKGpwZT9nfHBuZ3x3ZWJwKSQvaS50ZXN0KGZpbGUubmFtZSB8fCBcIlwiKSkge1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5pbnZhbGlkLWZpbGUtdHlwZVwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxyXG4gICAgICAgICAgcmVhc29uOiBcIm1pbWUtYW5kLWV4dGVuc2lvbi1ub3Qtc3VwcG9ydGVkXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlVHlwZVwiLCBcIlVuc3VwcG9ydGVkIGltYWdlIGZvcm1hdC5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlKGZpbGUpKSB7XHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwic2VsZWN0aW9uLmludmFsaWQtZmlsZS10eXBlXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgICAgICByZWFzb246IFwidW5zdXBwb3J0ZWQtdGlja2V0LWltYWdlLWZpbGVcIixcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjbGVhckZsb3dTdGF0ZSgpO1xyXG4gICAgICBzZXRQcm9ncmVzc0tleShcInVwbG9hZGluZ0ltYWdlXCIpO1xyXG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJ1cGxvYWRpbmdJbWFnZVwiKTtcclxuICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IHNlbGVjdGlvblN0YXJ0ZWRBdDtcclxuICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcIm9wdGltaXphdGlvbi5zdGFydGVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3Qgb3B0aW1pemF0aW9uUmVzdWx0ID0gYXdhaXQgb3B0aW1pemVUaWNrZXRJbWFnZUZvclVwbG9hZChmaWxlKS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJvcHRpbWl6YXRpb24uZmFpbGVkXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgOiBcIlwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBidWlsZEZhbGxiYWNrT3B0aW1pemF0aW9uUmVzdWx0KGZpbGUpO1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgdXBsb2FkRmlsZSA9IG9wdGltaXphdGlvblJlc3VsdC5maWxlO1xyXG4gICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJvcHRpbWl6YXRpb24uY29tcGxldGVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIC4uLmJ1aWxkT3B0aW1pemF0aW9uTG9nRGF0YShvcHRpbWl6YXRpb25SZXN1bHQpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh1cGxvYWRGaWxlLnNpemUgPiBNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMpIHtcclxuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJzZWxlY3Rpb24ucmVqZWN0ZWQtYnktc2l6ZVwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBtYXhTaXplQnl0ZXM6IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyxcclxuICAgICAgICAgIG1heFNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMpLFxyXG4gICAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YSh1cGxvYWRGaWxlKSxcclxuICAgICAgICAgIG9wdGltaXphdGlvbjogYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhKG9wdGltaXphdGlvblJlc3VsdCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHNldFByb2dyZXNzRWxhcHNlZE1zKDApO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfRmlsZVNpemVcIiwgXCJJbWFnZSBleGNlZWRzIDUwTUIgbWF4IHNpemUuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNhY2hlS2V5ID0gYXR0ZW1wdElkO1xyXG4gICAgICBsYXRlc3RGaWxlUmVmLmN1cnJlbnQgPSB7IGNhY2hlS2V5LCBmaWxlOiB1cGxvYWRGaWxlIH07XHJcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcImNhY2hlLnN0b3JlLnN0YXJ0ZWRcIiwge1xyXG4gICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgY2FjaGVLZXksXHJcbiAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YSh1cGxvYWRGaWxlKSxcclxuICAgICAgfSk7XHJcbiAgICAgIHZvaWQgY2FjaGVJbWFnZUZpbGUoY2FjaGVLZXksIHVwbG9hZEZpbGUpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwiY2FjaGUuc3RvcmUuY29tcGxldGVkXCIsIHtcclxuICAgICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICAgIGNhY2hlS2V5LFxyXG4gICAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKHVwbG9hZEZpbGUpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJjYWNoZS5zdG9yZS5mYWlsZWRcIiwge1xyXG4gICAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgICAgY2FjaGVLZXksXHJcbiAgICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEodXBsb2FkRmlsZSksXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSA6IFwiXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IHJ1blF1aWNrQ3JlYXRlRmxvdyh1cGxvYWRGaWxlLCBjYWNoZUtleSwge1xyXG4gICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgc3RhcnRlZEF0OiBzZWxlY3Rpb25TdGFydGVkQXQsXHJcbiAgICAgICAgb3B0aW1pemF0aW9uOiBvcHRpbWl6YXRpb25SZXN1bHQsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtjYW5DcmVhdGVFeHBlbnNlLCBjbGVhckZsb3dTdGF0ZSwgZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uLCBpc0NyZWF0ZU1vZGUsIGlzU2hlZXRMb2NrZWQsIGxpbmtUb1NoZWV0LCBydW5RdWlja0NyZWF0ZUZsb3csIHNoZWV0SWRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmV0cnlQZW5kaW5nVXBsb2FkID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgb3BlblNvdXJjZVBpY2tlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbigpKSByZXR1cm47XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcclxuICAgIHNldFNvdXJjZVBpY2tlck9wZW4odHJ1ZSk7XHJcbiAgfSwgW2Vuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbl0pO1xyXG5cclxuICBjb25zdCBjbG9zZVNvdXJjZVBpY2tlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChidXN5KSByZXR1cm47XHJcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcclxuICB9LCBbYnVzeV0pO1xyXG5cclxuICBjb25zdCBzZWxlY3RGcm9tQ2FtZXJhID0gdXNlQ2FsbGJhY2soKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IG51bGwpID0+IHtcclxuICAgIGlmICghaW5wdXRFbGVtZW50KSByZXR1cm47XHJcbiAgICAvLyBTYWZhcmkvaVBob25lIGV4cGVjdHMgdGhlIGNhcHR1cmUgcGlja2VyIHRvIG9wZW4gZnJvbSB0aGUgYWN0aXZlIHVzZXIgZ2VzdHVyZS5cclxuICAgIC8vIFByZS1yZXF1ZXN0aW5nIGNhbWVyYSBhY2Nlc3Mgd2l0aCBnZXRVc2VyTWVkaWEoKSBpbnRyb2R1Y2VzIGFuIGFzeW5jIGJvdW5kYXJ5IGFuZFxyXG4gICAgLy8gY2FuIGxlYXZlIGlPUyBzaG93aW5nIGFuIGFjdGl2ZSBjYW1lcmEgc2Vzc2lvbiB3aXRob3V0IGEgdmlzaWJsZSBwcmV2aWV3LlxyXG4gICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XHJcbiAgICBpbnB1dEVsZW1lbnQuY2xpY2soKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdEZyb21HYWxsZXJ5ID0gdXNlQ2FsbGJhY2soKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IG51bGwpID0+IHtcclxuICAgIGlmICghaW5wdXRFbGVtZW50KSByZXR1cm47XHJcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcclxuICAgIGlucHV0RWxlbWVudC5jbGljaygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJFcnJvciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjbGVhckNhY2hlZEN1cnJlbnRJbWFnZSgpO1xuICAgIHNldEF0dGVtcHRJZChcIlwiKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcclxuICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShudWxsKTtcclxuICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgfSwgW2NsZWFyQ2FjaGVkQ3VycmVudEltYWdlXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxyXG4gICAgYnVzeSxcclxuICAgIHByb2dyZXNzS2V5LFxyXG4gICAgcHJvZ3Jlc3NNZXNzYWdlLFxyXG4gICAgcHJvZ3Jlc3NTdGFnZXMsXHJcbiAgICBwcm9ncmVzc0VsYXBzZWRNcyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGF0dGVtcHRJZCxcclxuICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeTogZmFsc2UsXHJcbiAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZTogcGFydGlhbFRpY2tldEZhaWx1cmUgIT09IG51bGwsXHJcbiAgICB0cmFjZUxpc3QsXHJcbiAgICBvcGVuU291cmNlUGlja2VyLFxyXG4gICAgY2xvc2VTb3VyY2VQaWNrZXIsXHJcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxyXG4gICAgc2VsZWN0RnJvbUdhbGxlcnksXHJcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXG4gICAgcmV0cnlQZW5kaW5nVXBsb2FkLFxuICAgIGNsZWFyRXJyb3IsXG4gIH07XG59O1xyXG4iLCAiaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbmNvbnN0IE1BWF9USUNLRVRfVVBMT0FEX0xPTkdfU0lERV9QWCA9IDIwNDg7XHJcbmNvbnN0IE1JTl9USUNLRVRfVVBMT0FEX1NIT1JUX1NJREVfUFggPSA3Njg7XHJcbmNvbnN0IFRJQ0tFVF9SRUVOQ09ERV9RVUFMSVRZID0gMC44NTtcclxuY29uc3QgTUlOX1RJQ0tFVF9SRUVOQ09ERV9CWVRFUyA9IDQgKiAxMDI0ICogMTAyNDtcclxuY29uc3QgTUlOX1RJQ0tFVF9SRURVQ1RJT05fQllURVMgPSAyNTYgKiAxMDI0O1xyXG5jb25zdCBNSU5fVElDS0VUX1JFRFVDVElPTl9SQVRJTyA9IDAuMTI7XHJcblxyXG50eXBlIExvYWRlZEltYWdlID0ge1xyXG4gIGVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBkaXNwb3NlOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQgPSB7XHJcbiAgZmlsZTogRmlsZTtcclxuICBjaGFuZ2VkOiBib29sZWFuO1xyXG4gIHJlYXNvbjogc3RyaW5nO1xyXG4gIHJlc2l6ZWQ6IGJvb2xlYW47XHJcbiAgcmVlbmNvZGVkOiBib29sZWFuO1xyXG4gIGVsYXBzZWRNczogbnVtYmVyO1xyXG4gIG9yaWdpbmFsOiB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICAgIGhlaWdodDogbnVtYmVyIHwgbnVsbDtcclxuICB9O1xyXG4gIG91dHB1dDoge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgc2l6ZTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgICBoZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZU1pbWVUeXBlID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCJpbWFnZS9wanBlZ1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwiaW1hZ2UvanBnXCIpIHtcclxuICAgIHJldHVybiBcImltYWdlL2pwZWdcIjtcclxuICB9XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG5jb25zdCByZXBsYWNlRmlsZUV4dGVuc2lvbiA9IChmaWxlTmFtZTogc3RyaW5nLCBleHRlbnNpb246IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgYmFzZU5hbWUgPSBzYWZlVGV4dChmaWxlTmFtZSkucmVwbGFjZSgvXFwuW2EtejAtOV0rJC9pLCBcIlwiKTtcclxuICBjb25zdCBzYWZlQmFzZU5hbWUgPSBiYXNlTmFtZSB8fCBcInRpY2tldFwiO1xyXG4gIGNvbnN0IHNhZmVFeHRlbnNpb24gPSBzYWZlVGV4dChleHRlbnNpb24pLnJlcGxhY2UoL15cXC4vLCBcIlwiKS50b0xvd2VyQ2FzZSgpIHx8IFwianBnXCI7XHJcbiAgcmV0dXJuIGAke3NhZmVCYXNlTmFtZX0uJHtzYWZlRXh0ZW5zaW9ufWA7XHJcbn07XHJcblxyXG4vLyBMb2FkcyBvbmUgaW1hZ2UgZWxlbWVudCBzbyBjYW52YXMgcmVzaXppbmcga2VlcHMgdGhlIGJyb3dzZXItZGVjb2RlZCBvcmllbnRhdGlvbi5cclxuY29uc3QgbG9hZEltYWdlID0gYXN5bmMgKGZpbGU6IEZpbGUpOiBQcm9taXNlPExvYWRlZEltYWdlIHwgbnVsbD4gPT4ge1xyXG4gIGlmICh0eXBlb2YgSW1hZ2UgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIFVSTCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IG9iamVjdFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XHJcbiAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICBpbWFnZS5kZWNvZGluZyA9IFwiYXN5bmNcIjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4gcmVzb2x2ZSgpO1xyXG4gICAgICBpbWFnZS5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcihcIkNvdWxkIG5vdCBkZWNvZGUgaW1hZ2UuXCIpKTtcclxuICAgICAgaW1hZ2Uuc3JjID0gb2JqZWN0VXJsO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgd2lkdGggPSBOdW1iZXIoaW1hZ2UubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoIHx8IDApO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gTnVtYmVyKGltYWdlLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0IHx8IDApO1xyXG4gICAgaWYgKCEod2lkdGggPiAwKSB8fCAhKGhlaWdodCA+IDApKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVsZW1lbnQ6IGltYWdlLFxyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICBkaXNwb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9IGNhdGNoIHtcclxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqZWN0VXJsKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVSZXNpemVEaW1lbnNpb25zID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlcjsgcmVzaXplZDogYm9vbGVhbiB9ID0+IHtcclxuICBjb25zdCBsb25nU2lkZSA9IE1hdGgubWF4KHdpZHRoLCBoZWlnaHQpO1xyXG4gIGNvbnN0IHNob3J0U2lkZSA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpO1xyXG4gIGlmIChsb25nU2lkZSA8PSBNQVhfVElDS0VUX1VQTE9BRF9MT05HX1NJREVfUFgpIHtcclxuICAgIHJldHVybiB7IHdpZHRoLCBoZWlnaHQsIHJlc2l6ZWQ6IGZhbHNlIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXhMb25nU2lkZVNjYWxlID0gTUFYX1RJQ0tFVF9VUExPQURfTE9OR19TSURFX1BYIC8gbG9uZ1NpZGU7XHJcbiAgY29uc3QgbWluU2hvcnRTaWRlU2NhbGUgPSBNSU5fVElDS0VUX1VQTE9BRF9TSE9SVF9TSURFX1BYIC8gc2hvcnRTaWRlO1xyXG4gIGNvbnN0IHNjYWxlID0gTWF0aC5tYXgobWF4TG9uZ1NpZGVTY2FsZSwgbWluU2hvcnRTaWRlU2NhbGUpO1xyXG4gIGlmICghKHNjYWxlIDwgMSkpIHtcclxuICAgIHJldHVybiB7IHdpZHRoLCBoZWlnaHQsIHJlc2l6ZWQ6IGZhbHNlIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgd2lkdGg6IE1hdGgubWF4KDEsIE1hdGgucm91bmQod2lkdGggKiBzY2FsZSkpLFxyXG4gICAgaGVpZ2h0OiBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKGhlaWdodCAqIHNjYWxlKSksXHJcbiAgICByZXNpemVkOiB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVDYW52YXMgPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgcmV0dXJuIGNhbnZhcztcclxufTtcclxuXHJcbmNvbnN0IGNhbnZhc1RvQmxvYiA9IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBtaW1lVHlwZTogc3RyaW5nLCBxdWFsaXR5PzogbnVtYmVyKTogUHJvbWlzZTxCbG9iIHwgbnVsbD4gPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgY2FudmFzLnRvQmxvYigoYmxvYikgPT4gcmVzb2x2ZShibG9iKSwgbWltZVR5cGUsIHF1YWxpdHkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQgPSAoe1xyXG4gIGZpbGUsXHJcbiAgb3JpZ2luYWxGaWxlLFxyXG4gIHJlYXNvbixcclxuICByZXNpemVkLFxyXG4gIHJlZW5jb2RlZCxcclxuICBlbGFwc2VkTXMsXHJcbiAgb3JpZ2luYWxXaWR0aCxcclxuICBvcmlnaW5hbEhlaWdodCxcclxuICBvdXRwdXRXaWR0aCxcclxuICBvdXRwdXRIZWlnaHQsXHJcbn06IHtcclxuICBmaWxlOiBGaWxlO1xyXG4gIG9yaWdpbmFsRmlsZTogRmlsZTtcclxuICByZWFzb246IHN0cmluZztcclxuICByZXNpemVkOiBib29sZWFuO1xyXG4gIHJlZW5jb2RlZDogYm9vbGVhbjtcclxuICBlbGFwc2VkTXM6IG51bWJlcjtcclxuICBvcmlnaW5hbFdpZHRoOiBudW1iZXIgfCBudWxsO1xyXG4gIG9yaWdpbmFsSGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG4gIG91dHB1dFdpZHRoOiBudW1iZXIgfCBudWxsO1xyXG4gIG91dHB1dEhlaWdodDogbnVtYmVyIHwgbnVsbDtcclxufSk6IFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0ID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZmlsZSxcclxuICAgIGNoYW5nZWQ6XHJcbiAgICAgIGZpbGUgIT09IG9yaWdpbmFsRmlsZSB8fFxyXG4gICAgICBmaWxlLnNpemUgIT09IG9yaWdpbmFsRmlsZS5zaXplIHx8XHJcbiAgICAgIHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKSAhPT0gc2FmZVRleHQob3JpZ2luYWxGaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCksXHJcbiAgICByZWFzb24sXHJcbiAgICByZXNpemVkLFxyXG4gICAgcmVlbmNvZGVkLFxyXG4gICAgZWxhcHNlZE1zLFxyXG4gICAgb3JpZ2luYWw6IHtcclxuICAgICAgbmFtZTogb3JpZ2luYWxGaWxlLm5hbWUsXHJcbiAgICAgIHR5cGU6IG9yaWdpbmFsRmlsZS50eXBlLFxyXG4gICAgICBzaXplOiBvcmlnaW5hbEZpbGUuc2l6ZSxcclxuICAgICAgd2lkdGg6IG9yaWdpbmFsV2lkdGgsXHJcbiAgICAgIGhlaWdodDogb3JpZ2luYWxIZWlnaHQsXHJcbiAgICB9LFxyXG4gICAgb3V0cHV0OiB7XHJcbiAgICAgIG5hbWU6IGZpbGUubmFtZSxcclxuICAgICAgdHlwZTogZmlsZS50eXBlLFxyXG4gICAgICBzaXplOiBmaWxlLnNpemUsXHJcbiAgICAgIHdpZHRoOiBvdXRwdXRXaWR0aCxcclxuICAgICAgaGVpZ2h0OiBvdXRwdXRIZWlnaHQsXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSZXR1cm5zIHRoZSB1cGxvYWQgZmlsZSB0byB1c2UuIEl0IGtlZXBzIHRoZSBvcmlnaW5hbCB3aGVuIHJlZHVjdGlvbiB3b3VsZCBiZSByaXNreSBvciBpcnJlbGV2YW50LlxyXG5leHBvcnQgY29uc3Qgb3B0aW1pemVUaWNrZXRJbWFnZUZvclVwbG9hZCA9IGFzeW5jIChmaWxlOiBGaWxlKTogUHJvbWlzZTxUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdD4gPT4ge1xyXG4gIGNvbnN0IHN0YXJ0ZWRBdCA9IERhdGUubm93KCk7XHJcbiAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIEZpbGUpKSB7XHJcbiAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICBmaWxlLFxyXG4gICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgIHJlYXNvbjogXCJpbnZhbGlkLWlucHV0XCIsXHJcbiAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxyXG4gICAgICByZWVuY29kZWQ6IGZhbHNlLFxyXG4gICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgIG9yaWdpbmFsV2lkdGg6IG51bGwsXHJcbiAgICAgIG9yaWdpbmFsSGVpZ2h0OiBudWxsLFxyXG4gICAgICBvdXRwdXRXaWR0aDogbnVsbCxcclxuICAgICAgb3V0cHV0SGVpZ2h0OiBudWxsLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBub3JtYWxpemVkTWltZVR5cGUgPSBub3JtYWxpemVNaW1lVHlwZShmaWxlLnR5cGUpO1xyXG4gIGNvbnN0IGxvYWRlZEltYWdlID0gYXdhaXQgbG9hZEltYWdlKGZpbGUpO1xyXG4gIGlmICghbG9hZGVkSW1hZ2UpIHtcclxuICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgIGZpbGUsXHJcbiAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgcmVhc29uOiBcImRlY29kZS11bmF2YWlsYWJsZVwiLFxyXG4gICAgICByZXNpemVkOiBmYWxzZSxcclxuICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICBvcmlnaW5hbFdpZHRoOiBudWxsLFxyXG4gICAgICBvcmlnaW5hbEhlaWdodDogbnVsbCxcclxuICAgICAgb3V0cHV0V2lkdGg6IG51bGwsXHJcbiAgICAgIG91dHB1dEhlaWdodDogbnVsbCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgZWxlbWVudCB9ID0gbG9hZGVkSW1hZ2U7XHJcbiAgICBjb25zdCBzaG9ydFNpZGUgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGNvbnN0IHJlc2l6ZVBsYW4gPSByZXNvbHZlUmVzaXplRGltZW5zaW9ucyh3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGNvbnN0IGNhblJlZW5jb2RlU2FmZWx5ID0gc2hvcnRTaWRlID49IE1JTl9USUNLRVRfVVBMT0FEX1NIT1JUX1NJREVfUFg7XHJcbiAgICBjb25zdCBpc0xhcmdlT3JpZ2luYWwgPSBmaWxlLnNpemUgPj0gTUlOX1RJQ0tFVF9SRUVOQ09ERV9CWVRFUztcclxuICAgIGNvbnN0IHNob3VsZFJlc2l6ZSA9IHJlc2l6ZVBsYW4ucmVzaXplZDtcclxuXHJcbiAgICBpZiAoIXNob3VsZFJlc2l6ZSAmJiAoIWNhblJlZW5jb2RlU2FmZWx5IHx8ICFpc0xhcmdlT3JpZ2luYWwpKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgICAgcmVhc29uOiAhY2FuUmVlbmNvZGVTYWZlbHkgPyBcImtlcHQtc21hbGwtc2hvcnQtc2lkZVwiIDogXCJrZXB0LXNtYWxsLWZpbGVcIixcclxuICAgICAgICByZXNpemVkOiBmYWxzZSxcclxuICAgICAgICByZWVuY29kZWQ6IGZhbHNlLFxyXG4gICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIG91dHB1dFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvdXRwdXRIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vcm1hbGl6ZWRNaW1lVHlwZSA9PT0gXCJpbWFnZS9wbmdcIiAmJiAhc2hvdWxkUmVzaXplKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgICAgcmVhc29uOiBcImtlcHQtcG5nLXdpdGhvdXQtcmVzaXplXCIsXHJcbiAgICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBvdXRwdXRXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3V0cHV0SGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyhyZXNpemVQbGFuLndpZHRoLCByZXNpemVQbGFuLmhlaWdodCk7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzPy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWNhbnZhcyB8fCAhY29udGV4dCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICAgIHJlYXNvbjogXCJjYW52YXMtdW5hdmFpbGFibGVcIixcclxuICAgICAgICByZXNpemVkOiBmYWxzZSxcclxuICAgICAgICByZWVuY29kZWQ6IGZhbHNlLFxyXG4gICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIG91dHB1dFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvdXRwdXRIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgY29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHkgPSBcImhpZ2hcIjtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGVsZW1lbnQsIDAsIDAsIHJlc2l6ZVBsYW4ud2lkdGgsIHJlc2l6ZVBsYW4uaGVpZ2h0KTtcclxuXHJcbiAgICBjb25zdCBvdXRwdXRNaW1lVHlwZSA9IG5vcm1hbGl6ZWRNaW1lVHlwZSA9PT0gXCJpbWFnZS93ZWJwXCIgPyBcImltYWdlL3dlYnBcIiA6IFwiaW1hZ2UvanBlZ1wiO1xyXG4gICAgY29uc3Qgb3V0cHV0RXh0ZW5zaW9uID0gb3V0cHV0TWltZVR5cGUgPT09IFwiaW1hZ2Uvd2VicFwiID8gXCJ3ZWJwXCIgOiBcImpwZ1wiO1xyXG4gICAgY29uc3QgcXVhbGl0eSA9IFRJQ0tFVF9SRUVOQ09ERV9RVUFMSVRZO1xyXG4gICAgY29uc3Qgb3B0aW1pemVkQmxvYiA9IGF3YWl0IGNhbnZhc1RvQmxvYihjYW52YXMsIG91dHB1dE1pbWVUeXBlLCBxdWFsaXR5KTtcclxuICAgIGlmICghb3B0aW1pemVkQmxvYiB8fCBvcHRpbWl6ZWRCbG9iLnNpemUgPD0gMCB8fCBvcHRpbWl6ZWRCbG9iLnNpemUgPj0gZmlsZS5zaXplKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgICAgcmVhc29uOiBcIm9wdGltaXplZC1ub3Qtc21hbGxlclwiLFxyXG4gICAgICAgIHJlc2l6ZWQ6IHNob3VsZFJlc2l6ZSxcclxuICAgICAgICByZWVuY29kZWQ6IG5vcm1hbGl6ZWRNaW1lVHlwZSAhPT0gb3V0cHV0TWltZVR5cGUgfHwgaXNMYXJnZU9yaWdpbmFsLFxyXG4gICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIG91dHB1dFdpZHRoOiBzaG91bGRSZXNpemUgPyByZXNpemVQbGFuLndpZHRoIDogd2lkdGgsXHJcbiAgICAgICAgb3V0cHV0SGVpZ2h0OiBzaG91bGRSZXNpemUgPyByZXNpemVQbGFuLmhlaWdodCA6IGhlaWdodCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzaG91bGRSZXNpemUpIHtcclxuICAgICAgY29uc3Qgc2F2ZWRCeXRlcyA9IGZpbGUuc2l6ZSAtIG9wdGltaXplZEJsb2Iuc2l6ZTtcclxuICAgICAgY29uc3Qgc2F2ZWRSYXRpbyA9IHNhdmVkQnl0ZXMgLyBNYXRoLm1heChmaWxlLnNpemUsIDEpO1xyXG4gICAgICBpZiAoc2F2ZWRCeXRlcyA8IE1JTl9USUNLRVRfUkVEVUNUSU9OX0JZVEVTIHx8IHNhdmVkUmF0aW8gPCBNSU5fVElDS0VUX1JFRFVDVElPTl9SQVRJTykge1xyXG4gICAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgICAgICBmaWxlLFxyXG4gICAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICAgICAgcmVhc29uOiBcInJlZHVjdGlvbi10b28tc21hbGxcIixcclxuICAgICAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgcmVlbmNvZGVkOiB0cnVlLFxyXG4gICAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgICAgb3V0cHV0V2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgb3V0cHV0SGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcHRpbWl6ZWRGaWxlID0gbmV3IEZpbGUoW29wdGltaXplZEJsb2JdLCByZXBsYWNlRmlsZUV4dGVuc2lvbihmaWxlLm5hbWUsIG91dHB1dEV4dGVuc2lvbiksIHtcclxuICAgICAgdHlwZTogb3V0cHV0TWltZVR5cGUsXHJcbiAgICAgIGxhc3RNb2RpZmllZDogZmlsZS5sYXN0TW9kaWZpZWQgfHwgRGF0ZS5ub3coKSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgZmlsZTogb3B0aW1pemVkRmlsZSxcclxuICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICByZWFzb246IFwib3B0aW1pemVkXCIsXHJcbiAgICAgIHJlc2l6ZWQ6IHNob3VsZFJlc2l6ZSxcclxuICAgICAgcmVlbmNvZGVkOiBub3JtYWxpemVkTWltZVR5cGUgIT09IG91dHB1dE1pbWVUeXBlIHx8IGlzTGFyZ2VPcmlnaW5hbCxcclxuICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgb3V0cHV0V2lkdGg6IHJlc2l6ZVBsYW4ud2lkdGgsXHJcbiAgICAgIG91dHB1dEhlaWdodDogcmVzaXplUGxhbi5oZWlnaHQsXHJcbiAgICB9KTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgbG9hZGVkSW1hZ2UuZGlzcG9zZSgpO1xyXG4gIH1cclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBOEQ7QUFDOUQsdUJBQTZCOzs7QUNEN0IsbUJBQTZGO0FBYTdGLElBQU0sbUNBQW1DO0FBR3pDLElBQU0sc0JBQXNCLENBQUMsWUFBa0M7QUFDN0QsTUFBSSxPQUFPLFdBQVcsWUFBYSxRQUFPO0FBRTFDLFFBQU0sU0FBUyxPQUFPLGlCQUFpQixPQUFPO0FBQzlDLE1BQUksT0FBTyxZQUFZLFVBQVUsT0FBTyxlQUFlLFVBQVU7QUFDL0QsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLE9BQU8sUUFBUSxzQkFBc0I7QUFDM0MsU0FBTyxLQUFLLFFBQVEsS0FBSyxLQUFLLFNBQVM7QUFDekM7QUFHQSxJQUFNLDRCQUE0QixNQUFzQztBQUN0RSxNQUFJLE9BQU8sYUFBYSxlQUFlLE9BQU8sV0FBVyxhQUFhO0FBQ3BFLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxRQUFRLE1BQU0sS0FBSyxTQUFTLGlCQUE4Qiw2REFBNkQsQ0FBQztBQUM5SCxhQUFXLFFBQVEsT0FBTztBQUN4QixRQUFJLENBQUMsb0JBQW9CLElBQUksRUFBRztBQUVoQyxVQUFNLE9BQU8sS0FBSyxzQkFBc0I7QUFDeEMsVUFBTSxnQkFBZ0IsT0FBTyxjQUFjLFNBQVMsZ0JBQWdCLGVBQWU7QUFDbkYsUUFBSSxpQkFBaUIsRUFBRyxRQUFPO0FBRS9CLFdBQU87QUFBQSxNQUNMLE1BQU0sS0FBSyxJQUFJLGtDQUFrQyxLQUFLLE1BQU0sS0FBSyxJQUFJLENBQUM7QUFBQSxNQUN0RSxPQUFPLEtBQUssSUFBSSxrQ0FBa0MsS0FBSyxNQUFNLGdCQUFnQixLQUFLLEtBQUssQ0FBQztBQUFBLElBQzFGO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQUdPLElBQU0saUNBQWlDLE1BQTRDO0FBQ3hGLFFBQU0saUJBQWEscUJBQThCLElBQUk7QUFDckQsUUFBTSx3QkFBb0IscUJBQXNCLElBQUk7QUFDcEQsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSSx1QkFBUyxDQUFDO0FBQ3RELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHVCQUF5QyxJQUFJO0FBRXZGLFFBQU0sb0JBQWdCLDZCQUFlLE1BQU07QUFDekMsVUFBTSxVQUFVLFdBQVc7QUFDM0IsUUFBSSxDQUFDLFFBQVM7QUFFZCxVQUFNLGFBQWEsS0FBSyxLQUFLLFFBQVEsc0JBQXNCLEVBQUUsTUFBTTtBQUNuRSxzQkFBa0IsQ0FBQyxhQUFjLEtBQUssSUFBSSxXQUFXLFVBQVUsSUFBSSxJQUFJLFdBQVcsVUFBVztBQUU3RixVQUFNLGFBQWEsMEJBQTBCO0FBQzdDLHFCQUFpQixDQUFDLGFBQWE7QUFDN0IsVUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFZLFFBQU87QUFDckMsVUFBSSxZQUFZLGNBQWMsU0FBUyxTQUFTLFdBQVcsUUFBUSxTQUFTLFVBQVUsV0FBVyxPQUFPO0FBQ3RHLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFBTztBQUFBLElBQ1QsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFFBQU0sc0JBQWtCLDZCQUFlLE1BQU07QUFDM0MsUUFBSSxPQUFPLFdBQVcsWUFBYTtBQUVuQyxRQUFJLGtCQUFrQixZQUFZLE1BQU07QUFDdEMsYUFBTyxxQkFBcUIsa0JBQWtCLE9BQU87QUFBQSxJQUN2RDtBQUVBLHNCQUFrQixVQUFVLE9BQU8sc0JBQXNCLE1BQU07QUFDN0Qsd0JBQWtCLFVBQVU7QUFDNUIsb0JBQWM7QUFBQSxJQUNoQixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsb0NBQWdCLE1BQU07QUFDcEIsa0JBQWM7QUFFZCxRQUFJLE9BQU8sbUJBQW1CLFlBQWE7QUFDM0MsVUFBTSxVQUFVLFdBQVc7QUFDM0IsUUFBSSxDQUFDLFFBQVM7QUFFZCxVQUFNLFdBQVcsSUFBSSxlQUFlLE1BQU07QUFDeEMsc0JBQWdCO0FBQUEsSUFDbEIsQ0FBQztBQUVELGFBQVMsUUFBUSxPQUFPO0FBQ3hCLFdBQU8sTUFBTSxTQUFTLFdBQVc7QUFBQSxFQUNuQyxHQUFHLENBQUMsQ0FBQztBQUVMLDhCQUFVLE1BQU07QUFDZCxRQUFJLE9BQU8scUJBQXFCLGVBQWUsT0FBTyxhQUFhLFlBQWE7QUFFaEYsVUFBTSxPQUFPLFNBQVM7QUFDdEIsUUFBSSxDQUFDLEtBQU07QUFFWCxVQUFNLFdBQVcsSUFBSSxpQkFBaUIsTUFBTTtBQUMxQyxzQkFBZ0I7QUFBQSxJQUNsQixDQUFDO0FBRUQsYUFBUyxRQUFRLE1BQU07QUFBQSxNQUNyQixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsSUFDWCxDQUFDO0FBRUQsV0FBTyxNQUFNLFNBQVMsV0FBVztBQUFBLEVBQ25DLEdBQUcsQ0FBQyxDQUFDO0FBRUwsOEJBQVUsTUFBTTtBQUNkLFFBQUksT0FBTyxXQUFXLFlBQWE7QUFFbkMsVUFBTSxlQUFlLE1BQU07QUFDekIsc0JBQWdCO0FBQUEsSUFDbEI7QUFFQSxXQUFPLGlCQUFpQixVQUFVLGNBQWMsRUFBRSxTQUFTLEtBQUssQ0FBQztBQUNqRSxXQUFPLGlCQUFpQixxQkFBcUIsWUFBWTtBQUV6RCxXQUFPLE1BQU07QUFDWCxhQUFPLG9CQUFvQixVQUFVLFlBQVk7QUFDakQsYUFBTyxvQkFBb0IscUJBQXFCLFlBQVk7QUFFNUQsVUFBSSxrQkFBa0IsWUFBWSxNQUFNO0FBQ3RDLGVBQU8scUJBQXFCLGtCQUFrQixPQUFPO0FBQUEsTUFDdkQ7QUFBQSxJQUNGO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBRGhHTTtBQTdDTixJQUFNLDBCQUEwQjtBQUNoQyxJQUFNLHFDQUFxQztBQUMzQyxJQUFNLHNDQUFzQztBQW9CckMsSUFBTSx5QkFBeUIsQ0FBQztBQUFBLEVBQ3JDO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxPQUFPO0FBQUEsRUFDUDtBQUFBLEVBQ0EsWUFBWTtBQUNkLE1BQW1DO0FBQ2pDLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLGNBQVksYUFBYTtBQUFBLE1BQ3pCO0FBQUEsTUFDQSxXQUFXO0FBQUEsUUFDVDtBQUFBLFFBQ0EsWUFBWSxlQUFlO0FBQUEsUUFDM0IsYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUVBLHNEQUFDLFVBQUssV0FBVSwyU0FDYixpQkFDSDtBQUFBO0FBQUEsRUFDRjtBQUVKO0FBRUEsdUJBQXVCLGNBQWM7QUFHckMsSUFBTSxvQkFBb0IsQ0FBQyxFQUFFLFVBQVUsV0FBVyxVQUFVLE1BQThCO0FBQ3hGLFFBQU0sZ0JBQWdCLHVCQUFTLFFBQVEsUUFBUSxFQUM1QztBQUFBLElBQ0MsQ0FBQyxjQUNDLDhCQUE0QyxLQUFLLEtBQUssTUFBTSxTQUFTO0FBQUEsRUFDekUsRUFDQyxNQUFNLEdBQUcsdUJBQXVCO0FBRW5DLFFBQU0sY0FBYyxjQUFjO0FBQ2xDLFFBQU0sRUFBRSxnQkFBZ0IsWUFBWSxjQUFjLElBQUksK0JBQStCO0FBQ3JGLFFBQU0sZUFBZSxPQUFPLGFBQWEsY0FBYyxPQUFPLFNBQVM7QUFFdkUsTUFBSSxjQUFjLEdBQUc7QUFDbkIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFlBQ0o7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLEtBQUs7QUFBQSxNQUNMLFdBQVU7QUFBQSxNQUVWO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxXQUFVO0FBQUEsVUFDVixPQUFPO0FBQUEsWUFDTCxZQUFZLEdBQUcsa0NBQWtDO0FBQUEsWUFDakQsYUFBYSxHQUFHLGVBQWUsUUFBUSxtQ0FBbUM7QUFBQSxZQUMxRSxjQUFjLEdBQUcsZUFBZSxTQUFTLG1DQUFtQztBQUFBLFlBQzVFLGVBQWU7QUFBQSxVQUNqQjtBQUFBLFVBRUE7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLE1BQUs7QUFBQSxjQUNMLGNBQVk7QUFBQSxjQUNaLFdBQVcsV0FBVyw4QkFBOEIsYUFBYSxFQUFFO0FBQUEsY0FFbkUsc0RBQUMsU0FBSSxXQUFVLDRCQUNaLHdCQUFjLElBQUksQ0FBQyxPQUFPLFVBQVU7QUFDbkMsc0JBQU0scUJBQXFCLGdCQUFnQixLQUFNLGNBQWMsTUFBTSxLQUFLLFVBQVUsY0FBYztBQUNsRywyQkFBTyw0QkFBYSxPQUFPO0FBQUEsa0JBQ3pCLFdBQVc7QUFBQSxrQkFDWCxVQUFVLE1BQU0sTUFBTTtBQUFBLGtCQUN0QixLQUFLLE1BQU0sT0FBTyxzQkFBc0IsS0FBSztBQUFBLGdCQUMvQyxDQUFDO0FBQUEsY0FDSCxDQUFDLEdBQ0g7QUFBQTtBQUFBLFVBQ0Y7QUFBQTtBQUFBLE1BQ0Y7QUFBQTtBQUFBLEVBQ0Y7QUFHRixTQUNFLDRFQUNFO0FBQUEsZ0RBQUMsU0FBSSxlQUFZLFFBQU8sT0FBTyxFQUFFLFFBQVEsR0FBRyxjQUFjLEtBQUssR0FBRztBQUFBLElBQ2pFLG1CQUFlLCtCQUFhLFdBQVcsWUFBWSxJQUFJO0FBQUEsS0FDMUQ7QUFFSjtBQUVBLElBQU8sNEJBQVE7OztBRW5GTCxJQUFBQyxzQkFBQTtBQWhCVixJQUFNLGdCQUFnQjtBQUN0QixJQUFNLHdCQUF5QyxDQUFDO0FBRWhELElBQU0scUJBQXFCLENBQUMsY0FBOEI7QUFDeEQsUUFBTSxnQkFBZ0IsT0FBTyxTQUFTLFNBQVMsS0FBSyxZQUFZLElBQUksWUFBWTtBQUNoRixRQUFNLGVBQWUsS0FBSyxNQUFNLGdCQUFnQixHQUFJO0FBQ3BELFFBQU0sVUFBVSxLQUFLLE1BQU0sZUFBZSxFQUFFO0FBQzVDLFFBQU0sVUFBVSxlQUFlO0FBQy9CLFNBQU8sR0FBRyxPQUFPLE9BQU8sRUFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksT0FBTyxPQUFPLEVBQUUsU0FBUyxHQUFHLEdBQUcsQ0FBQztBQUNoRjtBQUVBLElBQU0sb0JBQW9CLENBQUMsVUFBeUI7QUFDbEQsTUFBSSxNQUFNLFVBQVUsYUFBYTtBQUMvQixXQUNFLDZDQUFDLFVBQUssV0FBVSx5RkFBd0YsZUFBWSxRQUNsSCx1REFBQyxTQUFJLFNBQVEsYUFBWSxNQUFLLFFBQU8sV0FBVSxXQUFVLFFBQU8sZ0JBQWUsYUFBWSxLQUN6Rix1REFBQyxVQUFLLEdBQUUseUJBQXdCLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQy9FLEdBQ0Y7QUFBQSxFQUVKO0FBRUEsTUFBSSxNQUFNLFVBQVUsVUFBVTtBQUM1QixXQUNFLDZDQUFDLFVBQUssV0FBVSxpRkFBZ0YsZUFBWSxRQUMxRyx1REFBQyxtQkFBUSxNQUFLLFdBQVUsT0FBTyxLQUFLLGtCQUFrQixTQUFTLEdBQUcsR0FDcEU7QUFBQSxFQUVKO0FBRUEsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsV0FBVTtBQUFBLE1BQ1YsZUFBWTtBQUFBLE1BRVosdURBQUMsVUFBSyxXQUFVLHlDQUF3QztBQUFBO0FBQUEsRUFDMUQ7QUFFSjtBQUdBLElBQU0sb0NBQW9DLENBQUM7QUFBQSxFQUN6QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFZO0FBQUEsRUFDWixTQUFTO0FBQ1gsTUFBOEM7QUFDNUMsTUFBSSxDQUFDLEtBQU0sUUFBTztBQUVsQixTQUNFLDZDQUFDLFNBQUksV0FBVSxxRkFDYjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsV0FBVTtBQUFBLE1BQ1YsT0FBTyxFQUFFLGNBQWMsY0FBYztBQUFBLE1BRXJDO0FBQUEsc0RBQUMsU0FBSSxXQUFVLDBCQUNiO0FBQUEsdURBQUMsU0FBSSxXQUFVLGdHQUNiLHVEQUFDLG1CQUFRLE1BQUssV0FBVSxPQUFPLEtBQUssa0JBQWtCLFNBQVMsR0FBRyxHQUNwRTtBQUFBLFVBQ0EsOENBQUMsU0FBSSxXQUFVLGtCQUNiO0FBQUEseURBQUMsT0FBRSxXQUFVLDRDQUNWLG1CQUFTLEtBQUssMENBQTBDLG1CQUFtQixHQUM5RTtBQUFBLFlBQ0EsNkNBQUMsT0FBRSxXQUFVLCtCQUNWLHFCQUFXLEtBQUssaURBQWlELG9CQUFvQixHQUN4RjtBQUFBLFlBQ0EsOENBQUMsU0FBSSxXQUFVLGdKQUNiO0FBQUEsMkRBQUMsVUFBTSxlQUFLLDRDQUE0QyxjQUFjLEdBQUU7QUFBQSxjQUN4RSw2Q0FBQyxVQUFLLFdBQVUsd0NBQXdDLDZCQUFtQixTQUFTLEdBQUU7QUFBQSxlQUN4RjtBQUFBLGFBQ0Y7QUFBQSxXQUNGO0FBQUEsUUFFQyxPQUFPLFNBQVMsSUFDZiw2Q0FBQyxTQUFJLFdBQVUsa0JBQ1osaUJBQU8sSUFBSSxDQUFDLFVBQ1g7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUVDLFdBQ0UsTUFBTSxVQUFVLFdBQ1osNEVBQ0EsTUFBTSxVQUFVLGNBQ2Qsb0ZBQ0E7QUFBQSxZQUdSLHdEQUFDLFNBQUksV0FBVSwwQkFDWjtBQUFBLGdDQUFrQixLQUFLO0FBQUEsY0FDeEIsOENBQUMsU0FBSSxXQUFVLGtCQUNiO0FBQUE7QUFBQSxrQkFBQztBQUFBO0FBQUEsb0JBQ0MsV0FDRSxNQUFNLFVBQVUsWUFDWix1Q0FDQTtBQUFBLG9CQUdMLGdCQUFNO0FBQUE7QUFBQSxnQkFDVDtBQUFBLGdCQUNBLDZDQUFDLE9BQUUsV0FBVSx5Q0FBeUMsZ0JBQU0sYUFBWTtBQUFBLGlCQUMxRTtBQUFBLGVBQ0Y7QUFBQTtBQUFBLFVBdkJLLE1BQU07QUFBQSxRQXdCYixDQUNELEdBQ0gsSUFDRTtBQUFBO0FBQUE7QUFBQSxFQUNOLEdBQ0Y7QUFFSjtBQUVBLElBQU8sNENBQVE7OztBQ3ZIZixJQUFNLDBCQUEwQjtBQUNoQyxJQUFNLDRCQUE0QjtBQUNsQyxJQUFNLDJCQUEyQjtBQUUxQixJQUFNLDhCQUE4QixLQUFLLE9BQU87QUFDaEQsSUFBTSxnQ0FDWDtBQUNGLElBQU0sa0NBQWtDLG9CQUFJLElBQVksQ0FBQyxjQUFjLGVBQWUsYUFBYSxZQUFZLENBQUM7QUFDaEgsSUFBTSxrQ0FBa0Msb0JBQUksSUFBWSxDQUFDLE9BQU8sUUFBUSxPQUFPLE1BQU0sQ0FBQztBQXVJdEYsSUFBTSwwQkFBMEIsQ0FBQyxVQUEwQjtBQUN6RCxRQUFNLGFBQWEsU0FBUyxLQUFLLEVBQUUsWUFBWSxFQUFFLFFBQVEsY0FBYyxFQUFFO0FBQ3pFLE1BQUksQ0FBQyxXQUFZLFFBQU87QUFDeEIsTUFBSSxlQUFlLE9BQVEsUUFBTztBQUNsQyxTQUFPLGdDQUFnQyxJQUFJLFVBQVUsSUFBSSxhQUFhO0FBQ3hFO0FBRUEsSUFBTSwrQkFBK0IsQ0FBQyxTQUF1QjtBQUMzRCxRQUFNLFdBQVcsU0FBUyxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUcsRUFBRSxJQUFJLEtBQUs7QUFDekQsU0FBTyx3QkFBd0IsUUFBUTtBQUN6QztBQWFPLElBQU0sNkJBQTZCLENBQUMsU0FBd0I7QUFDakUsUUFBTSxpQkFBaUIsU0FBUyxLQUFLLElBQUksRUFBRSxZQUFZO0FBQ3ZELE1BQUksa0JBQWtCLGdDQUFnQyxJQUFJLGNBQWMsR0FBRztBQUN6RSxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sWUFBWSw2QkFBNkIsSUFBSTtBQUNuRCxTQUFPLENBQUMsQ0FBQztBQUNYO0FBRU8sSUFBTSxtQkFBbUIsTUFBYztBQUM1QyxNQUFJLE9BQU8sV0FBVyxlQUFlLE9BQU8sT0FBTyxlQUFlLFlBQVk7QUFDNUUsV0FBTyxPQUFPLFdBQVc7QUFBQSxFQUMzQjtBQUNBLFNBQU8sR0FBRyxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDakU7QUFPTyxJQUFNLDBCQUEwQixDQUFDLFVBQWlDO0FBQ3ZFLFFBQU0sVUFBVSxTQUFTLE1BQU0sWUFBWTtBQUMzQyxNQUFJLENBQUMsUUFBUyxRQUFPO0FBQ3JCLE1BQUk7QUFDRixVQUFNLE9BQU8sS0FBSyxNQUFNLE9BQU87QUFDL0IsVUFBTSxVQUFVLFNBQVMsS0FBSyxXQUFXLEtBQUssT0FBTztBQUNyRCxXQUFPO0FBQUEsRUFDVCxRQUFRO0FBQ04sV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQW9JTyxJQUFNLG1CQUFtQixDQUFDLGNBQXdDO0FBQ3ZFLE1BQUk7QUFDRixtQkFBZSxRQUFRLDBCQUEwQixLQUFLLFVBQVUsU0FBUyxDQUFDO0FBQUEsRUFDNUUsUUFBUTtBQUFBLEVBRVI7QUFDRjtBQUVPLElBQU0saUJBQWlCLE9BQU8sVUFBa0IsU0FBOEI7QUFDbkYsTUFBSSxPQUFPLFdBQVcsZUFBZSxFQUFFLFlBQVksUUFBUztBQUM1RCxRQUFNLFFBQVEsTUFBTSxPQUFPLEtBQUssdUJBQXVCO0FBQ3ZELFFBQU0sYUFBYSxHQUFHLHlCQUF5QixHQUFHLG1CQUFtQixRQUFRLENBQUM7QUFDOUUsUUFBTSxNQUFNO0FBQUEsSUFDVixJQUFJLFFBQVEsVUFBVTtBQUFBLElBQ3RCLElBQUksU0FBUyxNQUFNO0FBQUEsTUFDakIsU0FBUztBQUFBLFFBQ1AsZ0JBQWdCLFNBQVMsS0FBSyxJQUFJLEtBQUs7QUFBQSxNQUN6QztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQVdPLElBQU0sd0JBQXdCLE9BQU8sYUFBb0M7QUFDOUUsTUFBSSxPQUFPLFdBQVcsZUFBZSxFQUFFLFlBQVksUUFBUztBQUM1RCxRQUFNLFFBQVEsTUFBTSxPQUFPLEtBQUssdUJBQXVCO0FBQ3ZELFFBQU0sYUFBYSxHQUFHLHlCQUF5QixHQUFHLG1CQUFtQixRQUFRLENBQUM7QUFDOUUsUUFBTSxNQUFNLE9BQU8sVUFBVTtBQUMvQjs7O0FDelhBLElBQUFDLGdCQUFrRTs7O0FDRWxFLElBQU0saUNBQWlDO0FBQ3ZDLElBQU0sa0NBQWtDO0FBQ3hDLElBQU0sMEJBQTBCO0FBQ2hDLElBQU0sNEJBQTRCLElBQUksT0FBTztBQUM3QyxJQUFNLDZCQUE2QixNQUFNO0FBQ3pDLElBQU0sNkJBQTZCO0FBZ0NuQyxJQUFNLG9CQUFvQixDQUFDLFVBQTBCO0FBQ25ELFFBQU0sYUFBYSxTQUFTLEtBQUssRUFBRSxZQUFZO0FBQy9DLE1BQUksZUFBZSxpQkFBaUIsZUFBZSxhQUFhO0FBQzlELFdBQU87QUFBQSxFQUNUO0FBQ0EsU0FBTztBQUNUO0FBRUEsSUFBTSx1QkFBdUIsQ0FBQyxVQUFrQixjQUE4QjtBQUM1RSxRQUFNLFdBQVcsU0FBUyxRQUFRLEVBQUUsUUFBUSxpQkFBaUIsRUFBRTtBQUMvRCxRQUFNLGVBQWUsWUFBWTtBQUNqQyxRQUFNLGdCQUFnQixTQUFTLFNBQVMsRUFBRSxRQUFRLE9BQU8sRUFBRSxFQUFFLFlBQVksS0FBSztBQUM5RSxTQUFPLEdBQUcsWUFBWSxJQUFJLGFBQWE7QUFDekM7QUFHQSxJQUFNLFlBQVksT0FBTyxTQUE0QztBQUNuRSxNQUFJLE9BQU8sVUFBVSxlQUFlLE9BQU8sUUFBUSxlQUFlLE9BQU8sSUFBSSxvQkFBb0IsWUFBWTtBQUMzRyxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sWUFBWSxJQUFJLGdCQUFnQixJQUFJO0FBQzFDLFFBQU0sUUFBUSxJQUFJLE1BQU07QUFDeEIsUUFBTSxXQUFXO0FBRWpCLE1BQUk7QUFDRixVQUFNLElBQUksUUFBYyxDQUFDLFNBQVMsV0FBVztBQUMzQyxZQUFNLFNBQVMsTUFBTSxRQUFRO0FBQzdCLFlBQU0sVUFBVSxNQUFNLE9BQU8sSUFBSSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pFLFlBQU0sTUFBTTtBQUFBLElBQ2QsQ0FBQztBQUVELFVBQU0sUUFBUSxPQUFPLE1BQU0sZ0JBQWdCLE1BQU0sU0FBUyxDQUFDO0FBQzNELFVBQU0sU0FBUyxPQUFPLE1BQU0saUJBQWlCLE1BQU0sVUFBVSxDQUFDO0FBQzlELFFBQUksRUFBRSxRQUFRLE1BQU0sRUFBRSxTQUFTLElBQUk7QUFDakMsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPO0FBQUEsTUFDTCxTQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0E7QUFBQSxNQUNBLFNBQVMsTUFBTTtBQUNiLFlBQUksZ0JBQWdCLFNBQVM7QUFBQSxNQUMvQjtBQUFBLElBQ0Y7QUFBQSxFQUNGLFFBQVE7QUFDTixRQUFJLGdCQUFnQixTQUFTO0FBQzdCLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFFQSxJQUFNLDBCQUEwQixDQUFDLE9BQWUsV0FBd0U7QUFDdEgsUUFBTSxXQUFXLEtBQUssSUFBSSxPQUFPLE1BQU07QUFDdkMsUUFBTSxZQUFZLEtBQUssSUFBSSxPQUFPLE1BQU07QUFDeEMsTUFBSSxZQUFZLGdDQUFnQztBQUM5QyxXQUFPLEVBQUUsT0FBTyxRQUFRLFNBQVMsTUFBTTtBQUFBLEVBQ3pDO0FBRUEsUUFBTSxtQkFBbUIsaUNBQWlDO0FBQzFELFFBQU0sb0JBQW9CLGtDQUFrQztBQUM1RCxRQUFNLFFBQVEsS0FBSyxJQUFJLGtCQUFrQixpQkFBaUI7QUFDMUQsTUFBSSxFQUFFLFFBQVEsSUFBSTtBQUNoQixXQUFPLEVBQUUsT0FBTyxRQUFRLFNBQVMsTUFBTTtBQUFBLEVBQ3pDO0FBRUEsU0FBTztBQUFBLElBQ0wsT0FBTyxLQUFLLElBQUksR0FBRyxLQUFLLE1BQU0sUUFBUSxLQUFLLENBQUM7QUFBQSxJQUM1QyxRQUFRLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTSxTQUFTLEtBQUssQ0FBQztBQUFBLElBQzlDLFNBQVM7QUFBQSxFQUNYO0FBQ0Y7QUFFQSxJQUFNLGVBQWUsQ0FBQyxPQUFlLFdBQTZDO0FBQ2hGLE1BQUksT0FBTyxhQUFhLGVBQWUsT0FBTyxTQUFTLGtCQUFrQixZQUFZO0FBQ25GLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxTQUFTLFNBQVMsY0FBYyxRQUFRO0FBQzlDLFNBQU8sUUFBUTtBQUNmLFNBQU8sU0FBUztBQUNoQixTQUFPO0FBQ1Q7QUFFQSxJQUFNLGVBQWUsQ0FBQyxRQUEyQixVQUFrQixZQUEyQztBQUM1RyxTQUFPLElBQUksUUFBUSxDQUFDLFlBQVk7QUFDOUIsV0FBTyxPQUFPLENBQUMsU0FBUyxRQUFRLElBQUksR0FBRyxVQUFVLE9BQU87QUFBQSxFQUMxRCxDQUFDO0FBQ0g7QUFFQSxJQUFNLDBCQUEwQixDQUFDO0FBQUEsRUFDL0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQVdxQztBQUNuQyxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsU0FDRSxTQUFTLGdCQUNULEtBQUssU0FBUyxhQUFhLFFBQzNCLFNBQVMsS0FBSyxJQUFJLEVBQUUsWUFBWSxNQUFNLFNBQVMsYUFBYSxJQUFJLEVBQUUsWUFBWTtBQUFBLElBQ2hGO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixNQUFNLGFBQWE7QUFBQSxNQUNuQixNQUFNLGFBQWE7QUFBQSxNQUNuQixNQUFNLGFBQWE7QUFBQSxNQUNuQixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTSxLQUFLO0FBQUEsTUFDWCxNQUFNLEtBQUs7QUFBQSxNQUNYLE1BQU0sS0FBSztBQUFBLE1BQ1gsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQ0Y7QUFHTyxJQUFNLCtCQUErQixPQUFPLFNBQXVEO0FBQ3hHLFFBQU0sWUFBWSxLQUFLLElBQUk7QUFDM0IsTUFBSSxFQUFFLGdCQUFnQixPQUFPO0FBQzNCLFdBQU8sd0JBQXdCO0FBQUEsTUFDN0I7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFdBQVcsS0FBSyxJQUFJLElBQUk7QUFBQSxNQUN4QixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBLEVBQ0g7QUFFQSxRQUFNLHFCQUFxQixrQkFBa0IsS0FBSyxJQUFJO0FBQ3RELFFBQU0sY0FBYyxNQUFNLFVBQVUsSUFBSTtBQUN4QyxNQUFJLENBQUMsYUFBYTtBQUNoQixXQUFPLHdCQUF3QjtBQUFBLE1BQzdCO0FBQUEsTUFDQSxjQUFjO0FBQUEsTUFDZCxRQUFRO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxXQUFXLEtBQUssSUFBSSxJQUFJO0FBQUEsTUFDeEIsZUFBZTtBQUFBLE1BQ2YsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFBQSxFQUNIO0FBRUEsTUFBSTtBQUNGLFVBQU0sRUFBRSxPQUFPLFFBQVEsUUFBUSxJQUFJO0FBQ25DLFVBQU0sWUFBWSxLQUFLLElBQUksT0FBTyxNQUFNO0FBQ3hDLFVBQU0sYUFBYSx3QkFBd0IsT0FBTyxNQUFNO0FBQ3hELFVBQU0sb0JBQW9CLGFBQWE7QUFDdkMsVUFBTSxrQkFBa0IsS0FBSyxRQUFRO0FBQ3JDLFVBQU0sZUFBZSxXQUFXO0FBRWhDLFFBQUksQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxrQkFBa0I7QUFDN0QsYUFBTyx3QkFBd0I7QUFBQSxRQUM3QjtBQUFBLFFBQ0EsY0FBYztBQUFBLFFBQ2QsUUFBUSxDQUFDLG9CQUFvQiwwQkFBMEI7QUFBQSxRQUN2RCxTQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsUUFDWCxXQUFXLEtBQUssSUFBSSxJQUFJO0FBQUEsUUFDeEIsZUFBZTtBQUFBLFFBQ2YsZ0JBQWdCO0FBQUEsUUFDaEIsYUFBYTtBQUFBLFFBQ2IsY0FBYztBQUFBLE1BQ2hCLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSx1QkFBdUIsZUFBZSxDQUFDLGNBQWM7QUFDdkQsYUFBTyx3QkFBd0I7QUFBQSxRQUM3QjtBQUFBLFFBQ0EsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsV0FBVztBQUFBLFFBQ1gsV0FBVyxLQUFLLElBQUksSUFBSTtBQUFBLFFBQ3hCLGVBQWU7QUFBQSxRQUNmLGdCQUFnQjtBQUFBLFFBQ2hCLGFBQWE7QUFBQSxRQUNiLGNBQWM7QUFBQSxNQUNoQixDQUFDO0FBQUEsSUFDSDtBQUVBLFVBQU0sU0FBUyxhQUFhLFdBQVcsT0FBTyxXQUFXLE1BQU07QUFDL0QsVUFBTSxVQUFVLFFBQVEsV0FBVyxJQUFJO0FBQ3ZDLFFBQUksQ0FBQyxVQUFVLENBQUMsU0FBUztBQUN2QixhQUFPLHdCQUF3QjtBQUFBLFFBQzdCO0FBQUEsUUFDQSxjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsUUFDWCxXQUFXLEtBQUssSUFBSSxJQUFJO0FBQUEsUUFDeEIsZUFBZTtBQUFBLFFBQ2YsZ0JBQWdCO0FBQUEsUUFDaEIsYUFBYTtBQUFBLFFBQ2IsY0FBYztBQUFBLE1BQ2hCLENBQUM7QUFBQSxJQUNIO0FBRUEsWUFBUSx3QkFBd0I7QUFDaEMsWUFBUSx3QkFBd0I7QUFDaEMsWUFBUSxVQUFVLFNBQVMsR0FBRyxHQUFHLFdBQVcsT0FBTyxXQUFXLE1BQU07QUFFcEUsVUFBTSxpQkFBaUIsdUJBQXVCLGVBQWUsZUFBZTtBQUM1RSxVQUFNLGtCQUFrQixtQkFBbUIsZUFBZSxTQUFTO0FBQ25FLFVBQU0sVUFBVTtBQUNoQixVQUFNLGdCQUFnQixNQUFNLGFBQWEsUUFBUSxnQkFBZ0IsT0FBTztBQUN4RSxRQUFJLENBQUMsaUJBQWlCLGNBQWMsUUFBUSxLQUFLLGNBQWMsUUFBUSxLQUFLLE1BQU07QUFDaEYsYUFBTyx3QkFBd0I7QUFBQSxRQUM3QjtBQUFBLFFBQ0EsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsV0FBVyx1QkFBdUIsa0JBQWtCO0FBQUEsUUFDcEQsV0FBVyxLQUFLLElBQUksSUFBSTtBQUFBLFFBQ3hCLGVBQWU7QUFBQSxRQUNmLGdCQUFnQjtBQUFBLFFBQ2hCLGFBQWEsZUFBZSxXQUFXLFFBQVE7QUFBQSxRQUMvQyxjQUFjLGVBQWUsV0FBVyxTQUFTO0FBQUEsTUFDbkQsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLENBQUMsY0FBYztBQUNqQixZQUFNLGFBQWEsS0FBSyxPQUFPLGNBQWM7QUFDN0MsWUFBTSxhQUFhLGFBQWEsS0FBSyxJQUFJLEtBQUssTUFBTSxDQUFDO0FBQ3JELFVBQUksYUFBYSw4QkFBOEIsYUFBYSw0QkFBNEI7QUFDdEYsZUFBTyx3QkFBd0I7QUFBQSxVQUM3QjtBQUFBLFVBQ0EsY0FBYztBQUFBLFVBQ2QsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFVBQ1QsV0FBVztBQUFBLFVBQ1gsV0FBVyxLQUFLLElBQUksSUFBSTtBQUFBLFVBQ3hCLGVBQWU7QUFBQSxVQUNmLGdCQUFnQjtBQUFBLFVBQ2hCLGFBQWE7QUFBQSxVQUNiLGNBQWM7QUFBQSxRQUNoQixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFFQSxVQUFNLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxhQUFhLEdBQUcscUJBQXFCLEtBQUssTUFBTSxlQUFlLEdBQUc7QUFBQSxNQUNoRyxNQUFNO0FBQUEsTUFDTixjQUFjLEtBQUssZ0JBQWdCLEtBQUssSUFBSTtBQUFBLElBQzlDLENBQUM7QUFDRCxXQUFPLHdCQUF3QjtBQUFBLE1BQzdCLE1BQU07QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVcsdUJBQXVCLGtCQUFrQjtBQUFBLE1BQ3BELFdBQVcsS0FBSyxJQUFJLElBQUk7QUFBQSxNQUN4QixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixhQUFhLFdBQVc7QUFBQSxNQUN4QixjQUFjLFdBQVc7QUFBQSxJQUMzQixDQUFDO0FBQUEsRUFDSCxVQUFFO0FBQ0EsZ0JBQVksUUFBUTtBQUFBLEVBQ3RCO0FBQ0Y7OztBRDdSQSxJQUFNLCtCQUErQjtBQUNyQyxJQUFNLCtCQUErQjtBQUFBLEVBQ25DLGFBQWE7QUFBQSxFQUNiLGNBQWM7QUFBQSxFQUNkLG9CQUFvQjtBQUN0QjtBQUVBLElBQU0scUJBQXFCLElBQUksU0FBb0I7QUFDakQsTUFBSSxPQUFPLFlBQVksZUFBZSxPQUFPLFFBQVEsU0FBUyxZQUFZO0FBQ3hFLFlBQVEsS0FBSyw4QkFBOEIsR0FBRyxJQUFJO0FBQUEsRUFDcEQ7QUFDRjtBQUVBLElBQU0scUJBQXFCLElBQUksU0FBb0I7QUFDakQsTUFBSSxPQUFPLFlBQVksZUFBZSxPQUFPLFFBQVEsU0FBUyxZQUFZO0FBQ3hFLFlBQVEsS0FBSyw4QkFBOEIsR0FBRyxJQUFJO0FBQUEsRUFDcEQ7QUFDRjtBQUVBLElBQU0sc0JBQXNCLElBQUksU0FBb0I7QUFDbEQsTUFBSSxPQUFPLFlBQVksZUFBZSxPQUFPLFFBQVEsVUFBVSxZQUFZO0FBQ3pFLFlBQVEsTUFBTSw4QkFBOEIsR0FBRyxJQUFJO0FBQUEsRUFDckQ7QUFDRjtBQUVBLElBQU0saUJBQWlCLENBQUMsU0FBeUI7QUFDL0MsTUFBSSxFQUFFLE9BQU8sR0FBSSxRQUFPO0FBQ3hCLE1BQUksUUFBUSxPQUFPLEtBQU0sUUFBTyxJQUFJLFFBQVEsT0FBTyxPQUFPLFFBQVEsQ0FBQyxDQUFDO0FBQ3BFLE1BQUksUUFBUSxLQUFNLFFBQU8sSUFBSSxPQUFPLE1BQU0sUUFBUSxDQUFDLENBQUM7QUFDcEQsU0FBTyxHQUFHLElBQUk7QUFDaEI7QUFFQSxJQUFNLG1CQUFtQixDQUFDLFNBQWU7QUFDdkMsU0FBTztBQUFBLElBQ0wsTUFBTSxTQUFTLEtBQUssSUFBSTtBQUFBLElBQ3hCLE1BQU0sU0FBUyxLQUFLLElBQUk7QUFBQSxJQUN4QixXQUFXLE9BQU8sS0FBSyxRQUFRLENBQUM7QUFBQSxJQUNoQyxVQUFVLGVBQWUsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDO0FBQUEsSUFDL0MsY0FBYyxPQUFPLEtBQUssZ0JBQWdCLENBQUM7QUFBQSxFQUM3QztBQUNGO0FBRUEsSUFBTSxrQ0FBa0MsQ0FBQyxTQUE4QztBQUNyRixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLE1BQ1IsTUFBTSxTQUFTLEtBQUssSUFBSTtBQUFBLE1BQ3hCLE1BQU0sU0FBUyxLQUFLLElBQUk7QUFBQSxNQUN4QixNQUFNLE9BQU8sS0FBSyxRQUFRLENBQUM7QUFBQSxNQUMzQixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTSxTQUFTLEtBQUssSUFBSTtBQUFBLE1BQ3hCLE1BQU0sU0FBUyxLQUFLLElBQUk7QUFBQSxNQUN4QixNQUFNLE9BQU8sS0FBSyxRQUFRLENBQUM7QUFBQSxNQUMzQixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0sMkJBQTJCLENBQUMsV0FBMEM7QUFDMUUsUUFBTSxhQUFhLEtBQUssSUFBSSxHQUFHLE9BQU8sU0FBUyxPQUFPLE9BQU8sT0FBTyxJQUFJO0FBQ3hFLFFBQU0sYUFBYSxPQUFPLFNBQVMsT0FBTyxJQUFJLGFBQWEsT0FBTyxTQUFTLE9BQU87QUFFbEYsU0FBTztBQUFBLElBQ0wsU0FBUyxPQUFPO0FBQUEsSUFDaEIsUUFBUSxPQUFPO0FBQUEsSUFDZixTQUFTLE9BQU87QUFBQSxJQUNoQixXQUFXLE9BQU87QUFBQSxJQUNsQixXQUFXLE9BQU87QUFBQSxJQUNsQixVQUFVO0FBQUEsTUFDUixHQUFHLE9BQU87QUFBQSxNQUNWLFVBQVUsZUFBZSxPQUFPLFNBQVMsSUFBSTtBQUFBLElBQy9DO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixHQUFHLE9BQU87QUFBQSxNQUNWLFVBQVUsZUFBZSxPQUFPLE9BQU8sSUFBSTtBQUFBLElBQzdDO0FBQUEsSUFDQTtBQUFBLElBQ0EsV0FBVyxlQUFlLFVBQVU7QUFBQSxJQUNwQyxZQUFZLE9BQU8sV0FBVyxRQUFRLENBQUMsQ0FBQztBQUFBLEVBQzFDO0FBQ0Y7QUFFQSxJQUFNLHlCQUF5QixDQUM3QixXQUNXO0FBQ1gsTUFBSSxDQUFDLE1BQU0sUUFBUSxNQUFNLEtBQUssT0FBTyxXQUFXLEVBQUcsUUFBTztBQUUxRCxTQUFPLE9BQ0osSUFBSSxDQUFDLFVBQVU7QUFDZCxVQUFNLFFBQVEsU0FBUyxPQUFPLEtBQUs7QUFDbkMsVUFBTSxVQUFVLFNBQVMsT0FBTyxPQUFPO0FBQ3ZDLFFBQUksU0FBUyxRQUFTLFFBQU8sR0FBRyxLQUFLLEtBQUssT0FBTztBQUNqRCxXQUFPLFdBQVc7QUFBQSxFQUNwQixDQUFDLEVBQ0EsT0FBTyxPQUFPLEVBQ2QsS0FBSyxLQUFLO0FBQ2Y7QUFFTyxJQUFNLGlDQUFpQyxDQUFDO0FBQUEsRUFDN0MsVUFBVTtBQUFBLEVBQ1YsWUFBWTtBQUFBLEVBQ1osZUFBZTtBQUFBLEVBQ2YsbUJBQW1CO0FBQUEsRUFDbkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsY0FBYztBQUFBLEVBQ2Q7QUFBQSxFQUNBO0FBQ0YsTUFBMEM7QUFDeEMsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsUUFBSSx3QkFBUyxLQUFLO0FBQzlELFFBQU0sQ0FBQyxNQUFNLE9BQU8sUUFBSSx3QkFBUyxLQUFLO0FBQ3RDLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBc0MsSUFBSTtBQUNoRixRQUFNLENBQUMsb0JBQW9CLHFCQUFxQixRQUFJLHdCQUFzQyxJQUFJO0FBQzlGLFFBQU0sQ0FBQyxtQkFBbUIsb0JBQW9CLFFBQUksd0JBQVMsQ0FBQztBQUM1RCxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQVMsRUFBRTtBQUNuRCxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsRUFBRTtBQUM3QyxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQTZCLENBQUMsQ0FBQztBQUNqRSxRQUFNLENBQUMsc0JBQXNCLHVCQUF1QixRQUFJLHdCQUErQyxJQUFJO0FBQzNHLFFBQU0sb0JBQWdCLHNCQUFnRCxJQUFJO0FBQzFFLFFBQU0sMkJBQXVCLHNCQUFzQixJQUFJO0FBRXZELFFBQU0sc0JBQWtCLHVCQUFRLE1BQU07QUFDcEMsVUFBTSx1QkFBdUIsc0JBQXNCO0FBQ25ELFFBQUkseUJBQXlCLGtCQUFrQjtBQUM3QyxhQUFPLEtBQUssaURBQWlELG9CQUFvQjtBQUFBLElBQ25GO0FBQ0EsUUFBSSx5QkFBeUIsa0JBQWtCO0FBQzdDLGFBQU8sS0FBSyxpREFBaUQsb0JBQW9CO0FBQUEsSUFDbkY7QUFDQSxRQUFJLHlCQUF5QixlQUFlO0FBQzFDLGFBQU8sS0FBSyw4Q0FBOEMsaUJBQWlCO0FBQUEsSUFDN0U7QUFDQSxRQUFJLHlCQUF5QixnQkFBZ0I7QUFDM0MsYUFBTyxLQUFLLDZDQUE2QyxrQkFBa0I7QUFBQSxJQUM3RTtBQUNBLFFBQUkseUJBQXlCLHNCQUFzQjtBQUNqRCxhQUFPLEtBQUssOENBQThDLHlCQUF5QjtBQUFBLElBQ3JGO0FBQ0EsUUFBSSx5QkFBeUIsUUFBUTtBQUNuQyxhQUFPLEtBQUssdUNBQXVDLE1BQU07QUFBQSxJQUMzRDtBQUNBLFdBQU87QUFBQSxFQUNULEdBQUcsQ0FBQyxvQkFBb0IsV0FBVyxDQUFDO0FBRXBDLCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsUUFBUSxxQkFBcUIsWUFBWSxLQUFNO0FBRXBELFVBQU0sY0FBYyxNQUFNO0FBQ3hCLFlBQU0sWUFBWSxxQkFBcUI7QUFDdkMsVUFBSSxjQUFjLEtBQU07QUFDeEIsMkJBQXFCLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLFNBQVMsQ0FBQztBQUFBLElBQzFEO0FBRUEsZ0JBQVk7QUFDWixVQUFNLGFBQWEsT0FBTyxZQUFZLGFBQWEsR0FBRztBQUN0RCxXQUFPLE1BQU07QUFDWCxhQUFPLGNBQWMsVUFBVTtBQUFBLElBQ2pDO0FBQUEsRUFDRixHQUFHLENBQUMsSUFBSSxDQUFDO0FBRVQsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxNQUFNO0FBQ1QsVUFBSSxnQkFBZ0IsTUFBTTtBQUN4Qiw4QkFBc0IsV0FBVztBQUFBLE1BQ25DO0FBQ0E7QUFBQSxJQUNGO0FBRUEsUUFBSSxnQkFBZ0IsUUFBUSxnQkFBZ0Isb0JBQW9CLGdCQUFnQixRQUFRO0FBQ3RGLDRCQUFzQixXQUFXO0FBQ2pDO0FBQUEsSUFDRjtBQUVBLDBCQUFzQixXQUFXO0FBQ2pDLFFBQUksZ0JBQWdCLGtCQUFrQjtBQUNwQztBQUFBLElBQ0Y7QUFFQSxVQUFNLFNBQW1CO0FBQUEsTUFDdkIsT0FBTyxXQUFXLE1BQU07QUFDdEIsOEJBQXNCLGFBQWE7QUFBQSxNQUNyQyxHQUFHLDZCQUE2QixXQUFXO0FBQUEsTUFDM0MsT0FBTyxXQUFXLE1BQU07QUFDdEIsOEJBQXNCLGNBQWM7QUFBQSxNQUN0QyxHQUFHLDZCQUE2QixZQUFZO0FBQUEsSUFDOUM7QUFFQSxRQUFJLGFBQWE7QUFDZixhQUFPO0FBQUEsUUFDTCxPQUFPLFdBQVcsTUFBTTtBQUN0QixnQ0FBc0Isb0JBQW9CO0FBQUEsUUFDNUMsR0FBRyw2QkFBNkIsa0JBQWtCO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBRUEsV0FBTyxNQUFNO0FBQ1gsYUFBTyxRQUFRLENBQUMsWUFBWSxPQUFPLGFBQWEsT0FBTyxDQUFDO0FBQUEsSUFDMUQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxNQUFNLGFBQWEsV0FBVyxDQUFDO0FBRW5DLFFBQU0scUJBQWlCLHVCQUFvQyxNQUFNO0FBQy9ELFVBQU0sZ0JBQXdDLGNBQzFDLENBQUMsa0JBQWtCLGtCQUFrQixlQUFlLGdCQUFnQixvQkFBb0IsSUFDeEYsQ0FBQyxrQkFBa0Isa0JBQWtCLGVBQWUsY0FBYztBQUV0RSxVQUFNLFlBQWtGO0FBQUEsTUFDdEYsZ0JBQWdCO0FBQUEsUUFDZCxPQUFPLEtBQUssa0RBQWtELGlCQUFpQjtBQUFBLFFBQy9FLGFBQWE7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxnQkFBZ0I7QUFBQSxRQUNkLE9BQU8sS0FBSyxpREFBaUQsaUJBQWlCO0FBQUEsUUFDOUUsYUFBYTtBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQWE7QUFBQSxRQUNYLE9BQU8sS0FBSywrQ0FBK0MsY0FBYztBQUFBLFFBQ3pFLGFBQWE7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFjO0FBQUEsUUFDWixPQUFPLEtBQUssNkNBQTZDLHFCQUFxQjtBQUFBLFFBQzlFLGFBQWE7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxvQkFBb0I7QUFBQSxRQUNsQixPQUFPLEtBQUssK0NBQStDLHNCQUFzQjtBQUFBLFFBQ2pGLGFBQWE7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixPQUFPLEtBQUssdUNBQXVDLE1BQU07QUFBQSxRQUN6RCxhQUFhLEtBQUssdUNBQXVDLE1BQU07QUFBQSxNQUNqRTtBQUFBLElBQ0Y7QUFFQSxVQUFNLGlCQUNKLGdCQUFnQixTQUFTLGNBQWMsY0FBYyxTQUFTLENBQUMsSUFBSSxzQkFBc0I7QUFDM0YsVUFBTSxtQkFBbUIsaUJBQWlCLGNBQWMsUUFBUSxjQUFjLElBQUk7QUFFbEYsV0FBTyxjQUFjLElBQUksQ0FBQyxVQUFVLFdBQVc7QUFBQSxNQUM3QyxLQUFLO0FBQUEsTUFDTCxPQUFPLFVBQVUsUUFBUSxFQUFFO0FBQUEsTUFDM0IsYUFBYSxVQUFVLFFBQVEsRUFBRTtBQUFBLE1BQ2pDLE9BQ0UsZ0JBQWdCLFVBQVcsb0JBQW9CLEtBQUssUUFBUSxtQkFDeEQsY0FDQSxVQUFVLG1CQUNSLFdBQ0E7QUFBQSxJQUNWLEVBQUU7QUFBQSxFQUNKLEdBQUcsQ0FBQyxvQkFBb0IsYUFBYSxXQUFXLENBQUM7QUFFakQsUUFBTSxlQUFXLDJCQUFZLENBQUMsTUFBYyxZQUFvQjtBQUM5RCxVQUFNLGNBQWMsU0FBUyxPQUFPO0FBQ3BDLFFBQUksQ0FBQyxZQUFhO0FBRWxCLGlCQUFhLENBQUMsYUFBYTtBQUN6QixZQUFNLE9BQU87QUFBQSxRQUNYLEdBQUc7QUFBQSxRQUNIO0FBQUEsVUFDRTtBQUFBLFVBQ0EsU0FBUztBQUFBLFVBQ1QsS0FBSSxvQkFBSSxLQUFLLEdBQUUsWUFBWTtBQUFBLFFBQzdCO0FBQUEsTUFDRjtBQUNBLHVCQUFpQixJQUFJO0FBQ3JCLGFBQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSw4QkFBMEIsMkJBQVksTUFBTTtBQUNoRCxVQUFNLFdBQVcsY0FBYyxTQUFTO0FBQ3hDLFFBQUksQ0FBQyxTQUFVO0FBQ2YsU0FBSyxzQkFBc0IsUUFBUSxFQUFFLE1BQU0sTUFBTTtBQUFBLElBRWpELENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxxQkFBaUIsMkJBQVksTUFBTTtBQUN2QyxvQkFBZ0IsRUFBRTtBQUNsQiw0QkFBd0IsSUFBSTtBQUM1QixpQkFBYSxDQUFDLENBQUM7QUFDZixxQkFBaUIsQ0FBQyxDQUFDO0FBQUEsRUFDckIsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHNCQUFrQiwyQkFBWSxNQUFNO0FBQ3hDLFVBQU0sZUFBZSxTQUFTLGdCQUFnQjtBQUM5QyxRQUFJLENBQUMsY0FBYztBQUNqQixhQUFPO0FBQUEsUUFDTCx5QkFBeUI7QUFBQSxNQUMzQjtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsTUFDTCx5QkFBeUI7QUFBQSxNQUN6QixTQUFTO0FBQUEsUUFDUCxrQkFBa0I7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUVyQixRQUFNLGtDQUE4QiwyQkFBWSxNQUFlO0FBQzdELFFBQUksQ0FBQyxvQkFBb0IsZ0JBQWdCLGlCQUFrQixlQUFlLENBQUMsU0FBVTtBQUNuRixrQkFBWTtBQUNaLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLGtCQUFrQixjQUFjLGVBQWUsYUFBYSxhQUFhLE9BQU8sQ0FBQztBQUVyRixRQUFNLDRCQUF3QiwyQkFBWSxDQUFDLFVBQTJCO0FBQ3BFLFFBQUksaUJBQWlCLGVBQWU7QUFDbEMsWUFBTSxpQkFBaUIsdUJBQXVCLE1BQU0sZ0JBQWdCO0FBQ3BFLFVBQUksZ0JBQWdCO0FBQ2xCLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxNQUFNLFdBQVcsS0FBSztBQUN4QixlQUFPLFNBQVMsTUFBTSxPQUFPLEtBQUssS0FBSywyQ0FBMkMsb0JBQW9CO0FBQUEsTUFDeEc7QUFDQSxVQUFJLE1BQU0sV0FBVyxLQUFLO0FBQ3hCLGVBQU8sS0FBSywwQ0FBMEMsbUJBQW1CO0FBQUEsTUFDM0U7QUFDQSxVQUFJLE1BQU0sV0FBVyxLQUFLO0FBQ3hCLGVBQU8sS0FBSyx3Q0FBd0MsZUFBZTtBQUFBLE1BQ3JFO0FBQUEsSUFDRjtBQUVBLFdBQU8saUJBQWlCLFNBQVMsU0FBUyxNQUFNLE9BQU8sSUFDbkQsU0FBUyxNQUFNLE9BQU8sSUFDdEIsS0FBSyxxQkFBcUIsaUJBQWlCO0FBQUEsRUFDakQsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLG1DQUErQjtBQUFBLElBQ25DLENBQUMsYUFBa0Q7QUFDakQsZUFBUyx1QkFBdUIsU0FBUyxTQUFTLE9BQU8sQ0FBQztBQUUxRCxZQUFNLGVBQWUsU0FBUyxNQUFNO0FBQ3BDLGVBQVMsaUJBQWlCLFNBQVMsY0FBYyxZQUFZLENBQUM7QUFDOUQsZUFBUyxzQkFBc0IsU0FBUyxjQUFjLFVBQVUsQ0FBQztBQUNqRSxlQUFTLHFCQUFxQixTQUFTLGNBQWMsWUFBWSxDQUFDO0FBQ2xFLGVBQVMsbUJBQW1CLFNBQVMsY0FBYyxjQUFjLENBQUM7QUFDbEUsZUFBUyxzQkFBc0IsU0FBUyxjQUFjLFNBQVMsQ0FBQztBQUFBLElBQ2xFO0FBQUEsSUFDQSxDQUFDLFFBQVE7QUFBQSxFQUNYO0FBRUEsUUFBTSx1Q0FBbUMsMkJBQVksQ0FBQyxhQUEwRDtBQUM5RyxVQUFNLE9BQU8sU0FBUztBQUN0QixVQUFNLFNBQVMsU0FBUyxNQUFNLE1BQU07QUFDcEMsVUFBTSxpQkFBaUIsU0FBUyxNQUFNLGNBQWM7QUFDcEQsVUFBTSxrQkFBa0IsU0FBUyxTQUFTLE9BQU87QUFDakQsVUFBTSxpQkFBaUIsdUJBQXVCLFNBQVMsTUFBTTtBQUM3RCxVQUFNLGFBQWEsU0FBUyxTQUFTLFVBQVU7QUFDL0MsVUFBTSxlQUF5QixDQUFDO0FBRWhDLFFBQUksU0FBUyxlQUFlLEtBQUs7QUFDL0IsbUJBQWEsS0FBSyxtQkFBbUIsS0FBSywyQ0FBMkMsb0JBQW9CLENBQUM7QUFDMUcsVUFBSSxZQUFZO0FBQ2QscUJBQWE7QUFBQSxVQUNYLFVBQVUsZ0RBQWdELG9CQUFvQixVQUFVO0FBQUEsUUFDMUY7QUFBQSxNQUNGO0FBQUEsSUFDRixXQUFXLGdCQUFnQjtBQUN6QixtQkFBYSxLQUFLLGNBQWM7QUFBQSxJQUNsQyxXQUFXLGlCQUFpQjtBQUMxQixtQkFBYSxLQUFLLGVBQWU7QUFBQSxJQUNuQyxXQUFXLFFBQVE7QUFDakIsbUJBQWE7QUFBQSxRQUNYO0FBQUEsVUFDRTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsV0FBVyxTQUFTLGVBQWUsS0FBSztBQUN0QyxtQkFBYSxLQUFLLEtBQUssMENBQTBDLG1CQUFtQixDQUFDO0FBQUEsSUFDdkYsV0FBVyxTQUFTLGVBQWUsS0FBSztBQUN0QyxtQkFBYSxLQUFLLEtBQUssd0NBQXdDLGVBQWUsQ0FBQztBQUFBLElBQ2pGLE9BQU87QUFDTCxtQkFBYSxLQUFLLEtBQUsscUJBQXFCLGlCQUFpQixDQUFDO0FBQUEsSUFDaEU7QUFFQSxRQUFJLFVBQVUsZ0JBQWdCO0FBQzVCLG1CQUFhLEtBQUssVUFBVSx1Q0FBdUMseUJBQXlCLGNBQWMsQ0FBQztBQUFBLElBQzdHO0FBRUEsV0FBTyxhQUFhLE9BQU8sT0FBTyxFQUFFLEtBQUssR0FBRztBQUFBLEVBQzlDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSwwQkFBc0I7QUFBQSxJQUMxQixPQUFPLFFBQWdCLGVBQXdCLGFBQXFCO0FBQ2xFLHFCQUFlLE1BQU07QUFDckIsNEJBQXNCLE1BQU07QUFDNUIsWUFBTSxzQkFBc0IsUUFBUTtBQUNwQyxtQkFBYSxFQUFFO0FBQ2YsOEJBQXdCLElBQUk7QUFDNUIsc0JBQWdCLGFBQWEsSUFBSTtBQUNqQyxjQUFRLEtBQUs7QUFDYixxQkFBZSxJQUFJO0FBQ25CLDRCQUFzQixJQUFJO0FBQzFCLDJCQUFxQixVQUFVO0FBQy9CLDJCQUFxQixDQUFDO0FBQ3RCLG9CQUFjLEVBQUUsUUFBUSxjQUFjLENBQUM7QUFBQSxJQUN6QztBQUFBLElBQ0EsQ0FBQyxXQUFXO0FBQUEsRUFDZDtBQUVBLFFBQU0seUJBQXFCO0FBQUEsSUFDekIsT0FBTyxNQUFZLFVBQWtCLFlBQXNEO0FBQ3pGLGNBQVEsSUFBSTtBQUNaLHFCQUFlLGdCQUFnQjtBQUMvQixxQkFBZTtBQUVmLFlBQU0sbUJBQW1CLEtBQUssSUFBSTtBQUNsQyx5QkFBbUIsZ0NBQWdDO0FBQUEsUUFDakQsV0FBVyxRQUFRO0FBQUEsUUFDbkIsUUFBUSxRQUFRO0FBQUEsUUFDaEI7QUFBQSxRQUNBO0FBQUEsUUFDQSx5QkFBeUIsS0FBSyxJQUFJLEdBQUcsbUJBQW1CLFFBQVEsU0FBUztBQUFBLFFBQ3pFLFlBQVksaUJBQWlCLElBQUk7QUFBQSxRQUNqQyxjQUFjLHlCQUF5QixRQUFRLFlBQVk7QUFBQSxRQUMzRCxTQUFTLGNBQWMsU0FBUyxPQUFPLElBQUk7QUFBQSxRQUMzQyxXQUFXLGNBQWMsU0FBUyxTQUFTLElBQUk7QUFBQSxNQUNqRCxDQUFDO0FBRUQsVUFBSTtBQUNGLGNBQU0sV0FBVyxNQUFNO0FBQUEsVUFDckI7QUFBQSxZQUNFLGFBQWE7QUFBQSxZQUNiLGNBQWMsU0FBUyxZQUFZLEVBQUUsWUFBWSxLQUFLO0FBQUEsWUFDdEQsc0JBQXNCLGNBQWMsU0FBUyxPQUFPLEtBQUssU0FBWTtBQUFBLFlBQ3JFLFFBQVEsY0FBYyxTQUFTLFNBQVMsS0FBSyxTQUFZO0FBQUEsVUFDM0Q7QUFBQSxVQUNBLGdCQUFnQjtBQUFBLFFBQ2xCO0FBRUEscUNBQTZCLFFBQVE7QUFFckMsY0FBTSxvQkFBb0IsS0FBSyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksZ0JBQWdCO0FBRW5FLGNBQU0sU0FBUyxTQUFTLFNBQVMsTUFBTSxNQUFNO0FBQzdDLGNBQU0sZ0JBQWdCLFNBQVMsTUFBTSxrQkFBa0I7QUFDdkQsY0FBTSxlQUNKLFNBQ0k7QUFBQSxVQUNFO0FBQUEsVUFDQTtBQUFBLFVBQ0EsZ0JBQWdCLFNBQVMsU0FBUyxNQUFNLGNBQWM7QUFBQSxVQUN0RCxTQUFTLFNBQVMsU0FBUyxNQUFNLE9BQU87QUFBQSxVQUN4QyxVQUFVLFNBQVMsU0FBUyxNQUFNLFFBQVE7QUFBQSxVQUMxQyxlQUFlLFNBQVMsTUFBTSxpQkFBaUI7QUFBQSxRQUNqRCxJQUNBO0FBRU4sWUFBSSxTQUFTLFlBQVksTUFBTTtBQUM3QixjQUFJLENBQUMsUUFBUTtBQUNYLGtCQUFNLElBQUksTUFBTSxLQUFLLDBDQUEwQyxtQ0FBbUMsQ0FBQztBQUFBLFVBQ3JHO0FBRUEsZ0JBQU0sb0JBQW9CLFFBQVEsZUFBZSxRQUFRO0FBQ3pELDZCQUFtQixrQ0FBa0M7QUFBQSxZQUNuRCxXQUFXLFFBQVE7QUFBQSxZQUNuQixRQUFRLFFBQVE7QUFBQSxZQUNoQixXQUFXO0FBQUEsWUFDWCxZQUFZLFNBQVM7QUFBQSxZQUNyQixTQUFTLFNBQVMsU0FBUyxPQUFPO0FBQUEsWUFDbEM7QUFBQSxZQUNBO0FBQUEsWUFDQSxnQkFBZ0IsU0FBUyxTQUFTLE1BQU0sY0FBYztBQUFBLFlBQ3RELGVBQWUsU0FBUyxNQUFNLGlCQUFpQjtBQUFBLFlBQy9DLGNBQWMsU0FBUyxNQUFNLGdCQUFnQjtBQUFBLFVBQy9DLENBQUM7QUFDRDtBQUFBLFFBQ0Y7QUFFQSxZQUFJLGNBQWM7QUFDaEIsa0NBQXdCLFlBQVk7QUFDcEMsNkJBQW1CLDhCQUE4QjtBQUFBLFlBQy9DLFdBQVcsUUFBUTtBQUFBLFlBQ25CLFFBQVEsUUFBUTtBQUFBLFlBQ2hCLFdBQVc7QUFBQSxZQUNYLFFBQVEsYUFBYTtBQUFBLFlBQ3JCLGVBQWUsYUFBYTtBQUFBLFlBQzVCLGdCQUFnQixhQUFhO0FBQUEsWUFDN0IsZUFBZSxhQUFhO0FBQUEsVUFDOUIsQ0FBQztBQUFBLFFBQ0g7QUFFQSx3QkFBZ0IsZ0JBQWdCLElBQUk7QUFDcEMsZ0JBQVEsS0FBSztBQUNiLHVCQUFlLElBQUk7QUFDbkIsOEJBQXNCLElBQUk7QUFDMUIsNkJBQXFCLFVBQVU7QUFDL0IsNkJBQXFCLENBQUM7QUFDdEIsY0FBTSxrQkFBa0IsaUNBQWlDLFFBQVE7QUFDakUsMkJBQW1CLDZDQUE2QztBQUFBLFVBQzlELFdBQVcsUUFBUTtBQUFBLFVBQ25CLFFBQVEsUUFBUTtBQUFBLFVBQ2hCLFdBQVc7QUFBQSxVQUNYLFlBQVksU0FBUztBQUFBLFVBQ3JCLFNBQVMsU0FBUyxTQUFTLE9BQU87QUFBQSxVQUNsQztBQUFBLFVBQ0E7QUFBQSxVQUNBLGdCQUFnQixTQUFTLFNBQVMsTUFBTSxjQUFjO0FBQUEsVUFDdEQsZUFBZSxTQUFTLE1BQU0saUJBQWlCO0FBQUEsVUFDL0MsWUFBWSxTQUFTLFNBQVMsVUFBVTtBQUFBLFVBQ3hDLFNBQVMsU0FBUyxTQUFTLE9BQU87QUFBQSxVQUNsQztBQUFBLFVBQ0EsUUFBUSxNQUFNLFFBQVEsU0FBUyxNQUFNLElBQUksU0FBUyxTQUFTLENBQUM7QUFBQSxVQUM1RCxjQUFjLFNBQVMsTUFBTSxnQkFBZ0I7QUFBQSxRQUMvQyxDQUFDO0FBQ0Qsd0JBQWdCLGVBQWU7QUFBQSxNQUNqQyxTQUFTLE9BQU87QUFDZCxZQUFJLGlCQUFpQixlQUFlO0FBQ2xDLG1CQUFTLDZCQUE2Qix3QkFBd0IsS0FBSyxDQUFDO0FBQUEsUUFDdEU7QUFFQSw0QkFBb0IsK0JBQStCO0FBQUEsVUFDakQsV0FBVyxRQUFRO0FBQUEsVUFDbkIsUUFBUSxRQUFRO0FBQUEsVUFDaEIsV0FBVyxLQUFLLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxnQkFBZ0I7QUFBQSxVQUNwRCxZQUFZLGlCQUFpQixJQUFJO0FBQUEsVUFDakMsU0FBUyxpQkFBaUIsZ0JBQWdCLHdCQUF3QixLQUFLLElBQUk7QUFBQSxVQUMzRSxRQUFRLGlCQUFpQixnQkFBZ0IsTUFBTSxTQUFTO0FBQUEsVUFDeEQsU0FBUyxpQkFBaUIsUUFBUSxTQUFTLE1BQU0sT0FBTyxJQUFJO0FBQUEsVUFDNUQsa0JBQWtCLGlCQUFpQixnQkFBZ0IsTUFBTSxtQkFBbUIsQ0FBQztBQUFBLFFBQy9FLENBQUM7QUFDRCx3QkFBZ0IsZ0JBQWdCLElBQUk7QUFDcEMsZ0JBQVEsS0FBSztBQUNiLHVCQUFlLElBQUk7QUFDbkIsOEJBQXNCLElBQUk7QUFDMUIsNkJBQXFCLFVBQVU7QUFDL0IsNkJBQXFCLENBQUM7QUFDdEIsd0JBQWdCLHNCQUFzQixLQUFLLENBQUM7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0seUJBQXFCO0FBQUEsSUFDekIsT0FBTyxNQUFtQixXQUE2QztBQUNyRSxVQUFJLENBQUMsS0FBTTtBQUVYLFlBQU1DLGFBQVksaUJBQWlCO0FBQ25DLFlBQU0scUJBQXFCLEtBQUssSUFBSTtBQUNwQyxtQkFBYUEsVUFBUztBQUN0Qix5QkFBbUIsc0JBQXNCO0FBQUEsUUFDdkMsV0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsTUFBTSxpQkFBaUIsSUFBSTtBQUFBLE1BQzdCLENBQUM7QUFFRCxVQUFJLENBQUMsNEJBQTRCLEdBQUc7QUFDbEMsMkJBQW1CLHVCQUF1QjtBQUFBLFVBQ3hDLFdBQUFBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLFlBQVksQ0FBQyxDQUFDLFNBQVMsT0FBTztBQUFBLFFBQ2hDLENBQUM7QUFDRDtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFdBQVcsU0FBUyxLQUFLLElBQUksRUFBRSxZQUFZO0FBQ2pELFVBQUksWUFBWSxDQUFDLFNBQVMsV0FBVyxRQUFRLEtBQUssQ0FBQyx1QkFBdUIsS0FBSyxLQUFLLFFBQVEsRUFBRSxHQUFHO0FBQy9GLDJCQUFtQiwrQkFBK0I7QUFBQSxVQUNoRCxXQUFBQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLE1BQU0saUJBQWlCLElBQUk7QUFBQSxVQUMzQixRQUFRO0FBQUEsUUFDVixDQUFDO0FBQ0Qsd0JBQWdCLEtBQUssMENBQTBDLDJCQUEyQixDQUFDO0FBQzNGO0FBQUEsTUFDRjtBQUNBLFVBQUksQ0FBQywyQkFBMkIsSUFBSSxHQUFHO0FBQ3JDLDJCQUFtQiwrQkFBK0I7QUFBQSxVQUNoRCxXQUFBQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLE1BQU0saUJBQWlCLElBQUk7QUFBQSxVQUMzQixRQUFRO0FBQUEsUUFDVixDQUFDO0FBQ0Qsd0JBQWdCLEtBQUssMENBQTBDLDJCQUEyQixDQUFDO0FBQzNGO0FBQUEsTUFDRjtBQUVBLHFCQUFlO0FBQ2YscUJBQWUsZ0JBQWdCO0FBQy9CLDRCQUFzQixnQkFBZ0I7QUFDdEMsMkJBQXFCLFVBQVU7QUFDL0IsMkJBQXFCLENBQUM7QUFDdEIseUJBQW1CLHdCQUF3QjtBQUFBLFFBQ3pDLFdBQUFBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsTUFBTSxpQkFBaUIsSUFBSTtBQUFBLE1BQzdCLENBQUM7QUFFRCxZQUFNLHFCQUFxQixNQUFNLDZCQUE2QixJQUFJLEVBQUUsTUFBTSxDQUFDLFVBQVU7QUFDbkYsMkJBQW1CLHVCQUF1QjtBQUFBLFVBQ3hDLFdBQUFBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsTUFBTSxpQkFBaUIsSUFBSTtBQUFBLFVBQzNCLFNBQVMsaUJBQWlCLFFBQVEsU0FBUyxNQUFNLE9BQU8sSUFBSTtBQUFBLFFBQzlELENBQUM7QUFDRCxlQUFPLGdDQUFnQyxJQUFJO0FBQUEsTUFDN0MsQ0FBQztBQUNELFlBQU0sYUFBYSxtQkFBbUI7QUFDdEMseUJBQW1CLDBCQUEwQjtBQUFBLFFBQzNDLFdBQUFBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsR0FBRyx5QkFBeUIsa0JBQWtCO0FBQUEsTUFDaEQsQ0FBQztBQUVELFVBQUksV0FBVyxPQUFPLDZCQUE2QjtBQUNqRCwyQkFBbUIsOEJBQThCO0FBQUEsVUFDL0MsV0FBQUE7QUFBQSxVQUNBO0FBQUEsVUFDQSxjQUFjO0FBQUEsVUFDZCxhQUFhLGVBQWUsMkJBQTJCO0FBQUEsVUFDdkQsTUFBTSxpQkFBaUIsVUFBVTtBQUFBLFVBQ2pDLGNBQWMseUJBQXlCLGtCQUFrQjtBQUFBLFFBQzNELENBQUM7QUFDRCx1QkFBZSxJQUFJO0FBQ25CLDhCQUFzQixJQUFJO0FBQzFCLDZCQUFxQixVQUFVO0FBQy9CLDZCQUFxQixDQUFDO0FBQ3RCLHdCQUFnQixLQUFLLDBDQUEwQyw4QkFBOEIsQ0FBQztBQUM5RjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFdBQVdBO0FBQ2pCLG9CQUFjLFVBQVUsRUFBRSxVQUFVLE1BQU0sV0FBVztBQUNyRCx5QkFBbUIsdUJBQXVCO0FBQUEsUUFDeEMsV0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsTUFBTSxpQkFBaUIsVUFBVTtBQUFBLE1BQ25DLENBQUM7QUFDRCxXQUFLLGVBQWUsVUFBVSxVQUFVLEVBQ3JDLEtBQUssTUFBTTtBQUNWLDJCQUFtQix5QkFBeUI7QUFBQSxVQUMxQyxXQUFBQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxNQUFNLGlCQUFpQixVQUFVO0FBQUEsUUFDbkMsQ0FBQztBQUFBLE1BQ0gsQ0FBQyxFQUNBLE1BQU0sQ0FBQyxVQUFVO0FBQ2hCLDJCQUFtQixzQkFBc0I7QUFBQSxVQUN2QyxXQUFBQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQSxNQUFNLGlCQUFpQixVQUFVO0FBQUEsVUFDakMsU0FBUyxpQkFBaUIsUUFBUSxTQUFTLE1BQU0sT0FBTyxJQUFJO0FBQUEsUUFDOUQsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUVILFlBQU0sbUJBQW1CLFlBQVksVUFBVTtBQUFBLFFBQzdDLFdBQUFBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsV0FBVztBQUFBLFFBQ1gsY0FBYztBQUFBLE1BQ2hCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLGtCQUFrQixnQkFBZ0IsNkJBQTZCLGNBQWMsZUFBZSxhQUFhLG9CQUFvQixPQUFPO0FBQUEsRUFDdkk7QUFFQSxRQUFNLHlCQUFxQiwyQkFBWSxZQUFZO0FBQ2pEO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sdUJBQW1CLDJCQUFZLE1BQU07QUFDekMsUUFBSSxDQUFDLDRCQUE0QixFQUFHO0FBQ3BDLG9CQUFnQixFQUFFO0FBQ2xCLDRCQUF3QixJQUFJO0FBQzVCLHdCQUFvQixJQUFJO0FBQUEsRUFDMUIsR0FBRyxDQUFDLDJCQUEyQixDQUFDO0FBRWhDLFFBQU0sd0JBQW9CLDJCQUFZLE1BQU07QUFDMUMsUUFBSSxLQUFNO0FBQ1Ysd0JBQW9CLEtBQUs7QUFBQSxFQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDO0FBRVQsUUFBTSx1QkFBbUIsMkJBQVksQ0FBQyxpQkFBMEM7QUFDOUUsUUFBSSxDQUFDLGFBQWM7QUFJbkIsd0JBQW9CLEtBQUs7QUFDekIsaUJBQWEsTUFBTTtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx3QkFBb0IsMkJBQVksQ0FBQyxpQkFBMEM7QUFDL0UsUUFBSSxDQUFDLGFBQWM7QUFDbkIsd0JBQW9CLEtBQUs7QUFDekIsaUJBQWEsTUFBTTtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxpQkFBYSwyQkFBWSxNQUFNO0FBQ25DLDRCQUF3QjtBQUN4QixpQkFBYSxFQUFFO0FBQ2Ysb0JBQWdCLEVBQUU7QUFDbEIsNEJBQXdCLElBQUk7QUFDNUIsMEJBQXNCLElBQUk7QUFDMUIseUJBQXFCLFVBQVU7QUFDL0IseUJBQXFCLENBQUM7QUFBQSxFQUN4QixHQUFHLENBQUMsdUJBQXVCLENBQUM7QUFFNUIsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxJQUN2Qix5QkFBeUIseUJBQXlCO0FBQUEsSUFDbEQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJhdHRlbXB0SWQiXQp9Cg==
