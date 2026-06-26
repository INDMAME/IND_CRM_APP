import {
  flashActionMark
} from "./chunk-CBDB7NMA.js";
import {
  createExpenseSheetTicketQuick,
  safeText
} from "./chunk-GDLOXSCF.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC90aWNrZXRJbWFnZU9wdGltaXphdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQsIGlzVmFsaWRFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5IH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50c1wiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbmNvbnN0IE1BWF9QQUdFX0JPVFRPTV9BQ1RJT05TID0gNDtcclxuY29uc3QgUEFHRV9CT1RUT01fQUNUSU9OU19UT1BfUEFERElOR19QWCA9IDEyO1xyXG5jb25zdCBQQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfUEFERElOR19QWCA9IDg7XHJcblxyXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBvbkNsaWNrPzogUmVhY3QuTW91c2VFdmVudEhhbmRsZXI8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBhcmlhTGFiZWw/OiBzdHJpbmc7XHJcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xyXG4gIHRhYkluZGV4PzogbnVtYmVyO1xyXG4gIGZ1bGxXaWR0aD86IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25zUHJvcHMgPSB7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBhcmlhTGFiZWw6IHN0cmluZztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBEdW1iIGJ1dHRvbiB1c2VkIGJ5IHRoZSBzaGFyZWQgYm90dG9tIGFjdGlvbiBiYXIuXHJcbmV4cG9ydCBjb25zdCBQYWdlQm90dG9tQWN0aW9uQnV0dG9uID0gKHtcclxuICBsYWJlbCxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIG9uQ2xpY2ssXHJcbiAgY2xhc3NOYW1lLFxyXG4gIGFyaWFMYWJlbCxcclxuICB0eXBlID0gXCJidXR0b25cIixcclxuICB0YWJJbmRleCxcclxuICBmdWxsV2lkdGggPSBmYWxzZSxcclxufTogUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgdHlwZT17dHlwZX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxyXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XHJcbiAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgIFwiaW5saW5lLWJsb2NrIHctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS02MFwiLFxyXG4gICAgICAgIGZ1bGxXaWR0aCA/IFwiY29sLXNwYW4tMlwiIDogXCJcIixcclxuICAgICAgICBjbGFzc05hbWUgfHwgXCJcIlxyXG4gICAgICApfVxyXG4gICAgPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IG1pbi1oLVs2OHB4XSB3LWZ1bGwgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItWyMwMDFmNGRdLzgwIGJnLXByaW1hcnkgcHgtNCBweS0zLjUgdGV4dC1jZW50ZXIgdGV4dC1bMThweF0gZm9udC1ib2xkIGxlYWRpbmctWzEuMV0gdGV4dC13aGl0ZSBzaGFkb3cteHMgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMTUwIGhvdmVyOmJnLVsjMDAxZjRkXSBzbTptaW4taC1bNzJweF0gc206cHgtNSBzbTpweS00IHNtOnRleHQtWzIwcHhdXCI+XHJcbiAgICAgICAge2xhYmVsfVxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuICApO1xyXG59O1xyXG5cclxuUGFnZUJvdHRvbUFjdGlvbkJ1dHRvbi5kaXNwbGF5TmFtZSA9IFwiUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblwiO1xyXG5cclxuLy8gRml4ZWQgYm90dG9tIGFjdGlvbiBiYXIgdGhhdCBzdGF5cyB2aXNpYmxlIHdoaWxlIHRoZSBwYWdlIHNjcm9sbHMuXHJcbmNvbnN0IFBhZ2VCb3R0b21BY3Rpb25zID0gKHsgY2hpbGRyZW4sIGFyaWFMYWJlbCwgY2xhc3NOYW1lIH06IFBhZ2VCb3R0b21BY3Rpb25zUHJvcHMpID0+IHtcclxuICBjb25zdCBhY3Rpb25CdXR0b25zID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbilcclxuICAgIC5maWx0ZXIoXHJcbiAgICAgIChjaGlsZCk6IGNoaWxkIGlzIFJlYWN0LlJlYWN0RWxlbWVudDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uUHJvcHM+ID0+XHJcbiAgICAgICAgaXNWYWxpZEVsZW1lbnQ8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzPihjaGlsZCkgJiYgY2hpbGQudHlwZSA9PT0gUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblxyXG4gICAgKVxyXG4gICAgLnNsaWNlKDAsIE1BWF9QQUdFX0JPVFRPTV9BQ1RJT05TKTtcclxuXHJcbiAgY29uc3QgYWN0aW9uQ291bnQgPSBhY3Rpb25CdXR0b25zLmxlbmd0aDtcclxuICBjb25zdCB7IHJlc2VydmVkSGVpZ2h0LCB3cmFwcGVyUmVmLCBjb250ZW50SW5zZXRzIH0gPSB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkoKTtcclxuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgaWYgKGFjdGlvbkNvdW50IDwgMSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhY3Rpb25CYXIgPSAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIHJlZj17d3JhcHBlclJlZn1cclxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQteC0wIGJvdHRvbS0wIHotMTkwMCBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwLzkwIGJnLXdoaXRlIHNoYWRvdy1bMF8tMTBweF8yOHB4X3JnYmEoMTUsMjMsNDIsMC4xMildXCJcclxuICAgID5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXHJcbiAgICAgICAgc3R5bGU9e3tcclxuICAgICAgICAgIHBhZGRpbmdUb3A6IGAke1BBR0VfQk9UVE9NX0FDVElPTlNfVE9QX1BBRERJTkdfUFh9cHhgLFxyXG4gICAgICAgICAgcGFkZGluZ0xlZnQ6IGAke2NvbnRlbnRJbnNldHM/LmxlZnQgPz8gUEFHRV9CT1RUT01fQUNUSU9OU19TSURFX1BBRERJTkdfUFh9cHhgLFxyXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0OiBgJHtjb250ZW50SW5zZXRzPy5yaWdodCA/PyBQQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfUEFERElOR19QWH1weGAsXHJcbiAgICAgICAgICBwYWRkaW5nQm90dG9tOiBcImNhbGMoMC43NXJlbSArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tLCAwcHgpKVwiLFxyXG4gICAgICAgIH19XHJcbiAgICAgID5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICByb2xlPVwidG9vbGJhclwiXHJcbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJwb2ludGVyLWV2ZW50cy1hdXRvIHctZnVsbFwiLCBjbGFzc05hbWUgfHwgXCJcIil9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0xLjVcIj5cclxuICAgICAgICAgICAge2FjdGlvbkJ1dHRvbnMubWFwKChjaGlsZCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBzaG91bGRVc2VGdWxsV2lkdGggPSBhY3Rpb25Db3VudCA9PT0gMSB8fCAoYWN0aW9uQ291bnQgJSAyID09PSAxICYmIGluZGV4ID09PSBhY3Rpb25Db3VudCAtIDEpO1xyXG4gICAgICAgICAgICAgIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcclxuICAgICAgICAgICAgICAgIGZ1bGxXaWR0aDogc2hvdWxkVXNlRnVsbFdpZHRoLFxyXG4gICAgICAgICAgICAgICAgdGFiSW5kZXg6IGNoaWxkLnByb3BzLnRhYkluZGV4LFxyXG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgPz8gYHBhZ2UtYm90dG9tLWFjdGlvbi0ke2luZGV4fWAsXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxkaXYgYXJpYS1oaWRkZW49XCJ0cnVlXCIgc3R5bGU9e3sgaGVpZ2h0OiBgJHtyZXNlcnZlZEhlaWdodH1weGAgfX0gLz5cclxuICAgICAge3BvcnRhbFRhcmdldCA/IGNyZWF0ZVBvcnRhbChhY3Rpb25CYXIsIHBvcnRhbFRhcmdldCkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhZ2VCb3R0b21BY3Rpb25zO1xyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VFZmZlY3RFdmVudCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB0eXBlIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxudHlwZSBQYWdlQm90dG9tQWN0aW9uc0luc2V0cyA9IHtcclxuICBsZWZ0OiBudW1iZXI7XHJcbiAgcmlnaHQ6IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgVXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5UmVzdWx0ID0ge1xyXG4gIHJlc2VydmVkSGVpZ2h0OiBudW1iZXI7XHJcbiAgd3JhcHBlclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgY29udGVudEluc2V0czogUGFnZUJvdHRvbUFjdGlvbnNJbnNldHMgfCBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgTUlOX1BBR0VfQk9UVE9NX0FDVElPTlNfU0lERV9HQVAgPSA4O1xyXG5cclxuLy8gUmV0dXJucyB0cnVlIHdoZW4gdGhlIGNhcmQgaXMgcmVuZGVyZWQgYW5kIGNhbiBiZSB1c2VkIGFzIGEgbGF5b3V0IHJlZmVyZW5jZS5cclxuY29uc3QgaXNWaXNpYmxlTGF5b3V0Q2FyZCA9IChlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGNvbnN0IHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xyXG4gIGlmIChzdHlsZXMuZGlzcGxheSA9PT0gXCJub25lXCIgfHwgc3R5bGVzLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCIpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIHJldHVybiByZWN0LndpZHRoID4gMCAmJiByZWN0LmhlaWdodCA+IDA7XHJcbn07XHJcblxyXG4vLyBGaW5kcyB0aGUgZmlyc3QgdmlzaWJsZSB0aW1lbGluZSBjYXJkIGFuZCBtYXBzIGl0cyBob3Jpem9udGFsIGZyYW1lIHRvIHZpZXdwb3J0IGluc2V0cy5cclxuY29uc3QgcmVzb2x2ZVRpbWVsaW5lQ2FyZEluc2V0cyA9ICgpOiBQYWdlQm90dG9tQWN0aW9uc0luc2V0cyB8IG51bGwgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjYXJkcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtaXRlbSAudGltZWxpbmUtY2FyZCwgLnRpbWVsaW5lLWJveCAudGltZWxpbmUtY2FyZFwiKSk7XHJcbiAgZm9yIChjb25zdCBjYXJkIG9mIGNhcmRzKSB7XHJcbiAgICBpZiAoIWlzVmlzaWJsZUxheW91dENhcmQoY2FyZCkpIGNvbnRpbnVlO1xyXG5cclxuICAgIGNvbnN0IHJlY3QgPSBjYXJkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCAwO1xyXG4gICAgaWYgKHZpZXdwb3J0V2lkdGggPD0gMCkgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGVmdDogTWF0aC5tYXgoTUlOX1BBR0VfQk9UVE9NX0FDVElPTlNfU0lERV9HQVAsIE1hdGgucm91bmQocmVjdC5sZWZ0KSksXHJcbiAgICAgIHJpZ2h0OiBNYXRoLm1heChNSU5fUEFHRV9CT1RUT01fQUNUSU9OU19TSURFX0dBUCwgTWF0aC5yb3VuZCh2aWV3cG9ydFdpZHRoIC0gcmVjdC5yaWdodCkpLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLy8gVHJhY2tzIHRoZSBib3R0b20gYWN0aW9uIGJhciBoZWlnaHQgc28gdGhlIHBhZ2UgcmVzZXJ2ZXMgZW5vdWdoIHNwYWNlIGZvciBpdC5cclxuZXhwb3J0IGNvbnN0IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSA9ICgpOiBVc2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHlSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IHdyYXBwZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBhbmltYXRpb25GcmFtZVJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbcmVzZXJ2ZWRIZWlnaHQsIHNldFJlc2VydmVkSGVpZ2h0XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtjb250ZW50SW5zZXRzLCBzZXRDb250ZW50SW5zZXRzXSA9IHVzZVN0YXRlPFBhZ2VCb3R0b21BY3Rpb25zSW5zZXRzIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IG1lYXN1cmVMYXlvdXQgPSB1c2VFZmZlY3RFdmVudCgoKSA9PiB7XHJcbiAgICBjb25zdCB3cmFwcGVyID0gd3JhcHBlclJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCF3cmFwcGVyKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbmV4dEhlaWdodCA9IE1hdGguY2VpbCh3cmFwcGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCk7XHJcbiAgICBzZXRSZXNlcnZlZEhlaWdodCgocHJldmlvdXMpID0+IChNYXRoLmFicyhwcmV2aW91cyAtIG5leHRIZWlnaHQpIDwgMSA/IHByZXZpb3VzIDogbmV4dEhlaWdodCkpO1xyXG5cclxuICAgIGNvbnN0IG5leHRJbnNldHMgPSByZXNvbHZlVGltZWxpbmVDYXJkSW5zZXRzKCk7XHJcbiAgICBzZXRDb250ZW50SW5zZXRzKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpb3VzICYmICFuZXh0SW5zZXRzKSByZXR1cm4gcHJldmlvdXM7XHJcbiAgICAgIGlmIChwcmV2aW91cyAmJiBuZXh0SW5zZXRzICYmIHByZXZpb3VzLmxlZnQgPT09IG5leHRJbnNldHMubGVmdCAmJiBwcmV2aW91cy5yaWdodCA9PT0gbmV4dEluc2V0cy5yaWdodCkge1xyXG4gICAgICAgIHJldHVybiBwcmV2aW91cztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gbmV4dEluc2V0cztcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICBjb25zdCBzY2hlZHVsZU1lYXN1cmUgPSB1c2VFZmZlY3RFdmVudCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICAgIGlmIChhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBtZWFzdXJlTGF5b3V0KCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcclxuICAgIG1lYXN1cmVMYXlvdXQoKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgICBjb25zdCB3cmFwcGVyID0gd3JhcHBlclJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCF3cmFwcGVyKSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICBzY2hlZHVsZU1lYXN1cmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9ic2VydmVyLm9ic2VydmUod3JhcHBlcik7XHJcbiAgICByZXR1cm4gKCkgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgIGlmICghYm9keSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICBzY2hlZHVsZU1lYXN1cmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9ic2VydmVyLm9ic2VydmUoYm9keSwge1xyXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xyXG4gICAgICBzY2hlZHVsZU1lYXN1cmUoKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlUmVzaXplLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIGhhbmRsZVJlc2l6ZSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlUmVzaXplKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xyXG5cclxuICAgICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcmVzZXJ2ZWRIZWlnaHQsXHJcbiAgICB3cmFwcGVyUmVmLFxyXG4gICAgY29udGVudEluc2V0cyxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL1NwaW5uZXIudHN4XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBQcm9ncmVzc1N0YWdlID0ge1xyXG4gIGtleTogc3RyaW5nO1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBzdGF0ZTogXCJjb21wbGV0ZWRcIiB8IFwiYWN0aXZlXCIgfCBcInBlbmRpbmdcIjtcclxufTtcclxuXHJcbnR5cGUgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5UHJvcHMgPSB7XHJcbiAgb3BlbjogYm9vbGVhbjtcclxuICB0aXRsZT86IHN0cmluZztcclxuICBzdW1tYXJ5Pzogc3RyaW5nO1xyXG4gIGVsYXBzZWRNcz86IG51bWJlcjtcclxuICBzdGFnZXM/OiBQcm9ncmVzc1N0YWdlW107XHJcbn07XHJcblxyXG5jb25zdCBHTE9CQUxfUkFESVVTID0gXCJ2YXIoLS1yYWRpdXMteGwsIDVweClcIjtcclxuY29uc3QgRU1QVFlfUFJPR1JFU1NfU1RBR0VTOiBQcm9ncmVzc1N0YWdlW10gPSBbXTtcclxuXHJcbmNvbnN0IGZvcm1hdEVsYXBzZWRMYWJlbCA9IChlbGFwc2VkTXM6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgc2FmZUVsYXBzZWRNcyA9IE51bWJlci5pc0Zpbml0ZShlbGFwc2VkTXMpICYmIGVsYXBzZWRNcyA+IDAgPyBlbGFwc2VkTXMgOiAwO1xyXG4gIGNvbnN0IHRvdGFsU2Vjb25kcyA9IE1hdGguZmxvb3Ioc2FmZUVsYXBzZWRNcyAvIDEwMDApO1xyXG4gIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDYwKTtcclxuICBjb25zdCBzZWNvbmRzID0gdG90YWxTZWNvbmRzICUgNjA7XHJcbiAgcmV0dXJuIGAke1N0cmluZyhtaW51dGVzKS5wYWRTdGFydCgyLCBcIjBcIil9OiR7U3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVN0YWdlQmFkZ2UgPSAoc3RhZ2U6IFByb2dyZXNzU3RhZ2UpID0+IHtcclxuICBpZiAoc3RhZ2Uuc3RhdGUgPT09IFwiY29tcGxldGVkXCIpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaC04IHctOCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtMTAwIHRleHQtZW1lcmFsZC03MDBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIj5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNNSAxMC41IDguNSAxNCAxNSA2LjVcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChzdGFnZS5zdGF0ZSA9PT0gXCJhY3RpdmVcIikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBoLTggdy04IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYmctc2t5LTEwMCB0ZXh0LXNreS03MDBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzcGFuXHJcbiAgICAgIGNsYXNzTmFtZT1cImZsZXggaC04IHctOCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHRleHQtc2xhdGUtNDAwXCJcclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaC0yLjUgdy0yLjUgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTIwMFwiIC8+XHJcbiAgICA8L3NwYW4+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIFNob3dzIG9uZSBzdGFnZWQgcHJvZ3Jlc3Mgb3ZlcmxheSB3aGlsZSB0aGUgY29tcG9zaXRlIHF1aWNrLXRpY2tldCByZXF1ZXN0IGlzIGluIGZsaWdodC5cclxuY29uc3QgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5ID0gKHtcclxuICBvcGVuLFxyXG4gIHRpdGxlLFxyXG4gIHN1bW1hcnksXHJcbiAgZWxhcHNlZE1zID0gMCxcclxuICBzdGFnZXMgPSBFTVBUWV9QUk9HUkVTU19TVEFHRVMsXHJcbn06IEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheVByb3BzKSA9PiB7XHJcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTYwMDAwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBiZy1zbGF0ZS05NTAvNDAgcHgtNCBweS02XCI+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCB3LWZ1bGwgbWF4LXctbGcgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUvOTUgcC01XCJcclxuICAgICAgICBzdHlsZT17eyBib3JkZXJSYWRpdXM6IEdMT0JBTF9SQURJVVMgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtNFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtMTIgdy0xMiBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctc2t5LTUwIHRleHQtc2t5LTcwMFwiPlxyXG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC02IHctNlwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xXCI+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzE1cHhdIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj5cclxuICAgICAgICAgICAgICB7dGl0bGUgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtMSB0ZXh0LXNtIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAge3N1bW1hcnkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19DcmVhdGluZ1RpY2tldFwiLCBcIkNyZWF0aW5nIHRpY2tldC4uLlwiKX1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXNsYXRlLTUwIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19FbGFwc2VkXCIsIFwiRWxhcHNlZCB0aW1lXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTJweF0gdGV4dC1zbGF0ZS03MDBcIj57Zm9ybWF0RWxhcHNlZExhYmVsKGVsYXBzZWRNcyl9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7c3RhZ2VzLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTUgc3BhY2UteS0zXCI+XHJcbiAgICAgICAgICAgIHtzdGFnZXMubWFwKChzdGFnZSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17c3RhZ2Uua2V5fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgICAgc3RhZ2Uuc3RhdGUgPT09IFwiYWN0aXZlXCJcclxuICAgICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1za3ktMjAwIGJnLXNreS01MC84MCBweC0zIHB5LTNcIlxyXG4gICAgICAgICAgICAgICAgICAgIDogc3RhZ2Uuc3RhdGUgPT09IFwiY29tcGxldGVkXCJcclxuICAgICAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLWVtZXJhbGQtMjAwIGJnLWVtZXJhbGQtNTAvNzAgcHgtMyBweS0zXCJcclxuICAgICAgICAgICAgICAgICAgICAgIDogXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBweC0zIHB5LTNcIlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtM1wiPlxyXG4gICAgICAgICAgICAgICAgICB7cmVzb2x2ZVN0YWdlQmFkZ2Uoc3RhZ2UpfVxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdlLnN0YXRlID09PSBcInBlbmRpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7c3RhZ2UudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14cyBsZWFkaW5nLTUgdGV4dC1zbGF0ZS01MDBcIj57c3RhZ2UuZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXk7XHJcbiIsICJcdUZFRkZpbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlR2FzdG9UeXBlQ29kZSxcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsXG4gIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHtcbiAgZ2V0RGVmYXVsdEV4cGVuc2VHYXN0b1R5cGVDb2RlLFxuICB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlLFxufSBmcm9tIFwiLi4vY29uc3RhbnRzL2V4cGVuc2VHYXN0b1R5cGVDYXRhbG9nLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuaW1wb3J0IHsgcmVzb2x2ZVRpY2tldExpbmVBbW91bnQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVRpY2tldExpbmVBbW91bnQudHNcIjtcblxyXG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSA9IFwiaW5kLWV4cGVuc2UtdGlja2V0LWltYWdlLXYxXCI7XHJcbmNvbnN0IFRJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVggPSBcIi9fX2luZF9jYWNoZV9fL3RpY2tldC1pbWFnZS9cIjtcclxuY29uc3QgVElDS0VUX1RSQUNFX1NUT1JBR0VfS0VZID0gXCJleHBlbnNlX3NoZWV0X3RpY2tldF9xdWlja19mbG93X3RyYWNlX3YxXCI7XHJcblxyXG5leHBvcnQgY29uc3QgTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTID0gNTAgKiAxMDI0ICogMTAyNDtcclxuZXhwb3J0IGNvbnN0IFRJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFID1cclxuICBcIi5qcGcsLmpwZWcsLnBuZywud2VicCxpbWFnZS9qcGVnLGltYWdlL3BqcGVnLGltYWdlL3BuZyxpbWFnZS93ZWJwXCI7XHJcbmNvbnN0IEFMTE9XRURfVElDS0VUX0lNQUdFX01JTUVfVFlQRVMgPSBuZXcgU2V0PHN0cmluZz4oW1wiaW1hZ2UvanBlZ1wiLCBcImltYWdlL3BqcGVnXCIsIFwiaW1hZ2UvcG5nXCIsIFwiaW1hZ2Uvd2VicFwiXSk7XHJcbmNvbnN0IEFMTE9XRURfVElDS0VUX0lNQUdFX0VYVEVOU0lPTlMgPSBuZXcgU2V0PHN0cmluZz4oW1wianBnXCIsIFwianBlZ1wiLCBcInBuZ1wiLCBcIndlYnBcIl0pO1xyXG5jb25zdCBUSUNLRVRfTUlNRV9UT19FWFRFTlNJT046IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XHJcbiAgXCJpbWFnZS9qcGVnXCI6IFwianBnXCIsXHJcbiAgXCJpbWFnZS9wanBlZ1wiOiBcImpwZ1wiLFxyXG4gIFwiaW1hZ2UvanBnXCI6IFwianBnXCIsXHJcbiAgXCJpbWFnZS9wbmdcIjogXCJwbmdcIixcclxuICBcImltYWdlL3dlYnBcIjogXCJ3ZWJwXCIsXHJcbn07XHJcbmNvbnN0IFBSRUZFUlJFRF9USUNLRVRfR0FTVE9fVFlQRSA9IDg7XG5leHBvcnQgY29uc3QgREVGQVVMVF9DUkVBVEVfTU9ERSA9IFwibWFudWFsXCIgYXMgXCJpYVwiIHwgXCJtYW51YWxcIjtcblxyXG5leHBvcnQgdHlwZSBUaWNrZXRJbWFnZVNvdXJjZSA9IFwiY2FtZXJhXCIgfCBcImdhbGxlcnlcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFRpY2tldFRyYWNlRW50cnkgPSB7XHJcbiAgc3RlcDogc3RyaW5nO1xyXG4gIHRyYWNlSWQ6IHN0cmluZztcclxuICBhdDogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBOb3JtYWxpemVkRHJhZnRMaW5lID0ge1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdHlwZVZhbHVlOiBudW1iZXI7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHF0eTogbnVtYmVyO1xuICBwcmljZTogbnVtYmVyO1xuICB0b3RhbEFtb3VudDogbnVtYmVyO1xufTtcblxyXG5leHBvcnQgdHlwZSBOb3JtYWxpemVkRHJhZnQgPSB7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICB0b3RhbEFtb3VudDogbnVtYmVyO1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdGlja2V0RGF0ZTogc3RyaW5nO1xuICB0aWNrZXRUaW1lOiBzdHJpbmc7XG4gIGNvbWVudGFyaW86IHN0cmluZztcbiAgZ2FzdG9UeXBlOiBudW1iZXIgfCBudWxsO1xuICBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdO1xufTtcblxyXG5leHBvcnQgdHlwZSBQZW5kaW5nVXBsb2FkUmV0cnkgPVxyXG4gIHwge1xyXG4gICAgICBzdHJhdGVneTogXCJpYS1yZWFkeVwiO1xyXG4gICAgICBmaWxlSWQ6IHN0cmluZztcclxuICAgICAgZXh0ZW5zaW9uOiBzdHJpbmc7XHJcbiAgICAgIGNhY2hlS2V5OiBzdHJpbmc7XHJcbiAgICAgIGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQ7XHJcbiAgICAgIGZpbGVOYW1lSGludDogc3RyaW5nO1xyXG4gICAgfVxyXG4gIHwge1xyXG4gICAgICBzdHJhdGVneTogXCJtYW51YWwtcG9zdC11cGxvYWQtZHJhZnRcIjtcclxuICAgICAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgICAgIGV4dGVuc2lvbjogc3RyaW5nO1xyXG4gICAgICBjYWNoZUtleTogc3RyaW5nO1xyXG4gICAgICBmaWxlTmFtZUhpbnQ6IHN0cmluZztcclxuICAgIH07XHJcblxyXG5leHBvcnQgdHlwZSBVcGxvYWRTeW5jUmVzdWx0ID0ge1xyXG4gIHVybEZpbGU6IHN0cmluZztcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncyA9IHtcclxuICBzaGVldElkPzogc3RyaW5nO1xyXG4gIHByb2plY3RJZD86IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XHJcbiAgYXhVc2VySWRPdmVycmlkZT86IHN0cmluZztcclxuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xyXG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcclxuICBpc1NoZWV0TG9ja2VkOiBib29sZWFuO1xyXG4gIGxpbmtUb1NoZWV0PzogYm9vbGVhbjtcclxuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcclxuICBvbkNvbXBsZXRlZD86IChyZXN1bHQ6IHsgZmlsZUlkOiBzdHJpbmc7IGxpbmtlZFRvU2hlZXQ6IGJvb2xlYW4gfSkgPT4gdm9pZDtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFF1aWNrRmxvd1Byb2dyZXNzS2V5ID1cclxuICB8IFwidXBsb2FkaW5nSW1hZ2VcIlxyXG4gIHwgXCJjcmVhdGluZ1RpY2tldFwiXHJcbiAgfCBcInN5bmNpbmdGaWxlXCJcclxuICB8IFwiZmluYWxpemluZ0lhXCJcclxuICB8IFwibGlua2luZ0V4cGVuc2VMaW5lXCJcclxuICB8IFwiZG9uZVwiO1xyXG5cclxuY29uc3QgYXNSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9PiB7XHJcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiB7fTtcclxuICByZXR1cm4gdmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbn07XHJcblxyXG5jb25zdCBnZXRGaXJzdERlZmluZWQgPSAocmVjb3JkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwga2V5czogc3RyaW5nW10pOiB1bmtub3duID0+IHtcclxuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XHJcbiAgICBpZiAoa2V5IGluIHJlY29yZCkge1xyXG4gICAgICByZXR1cm4gcmVjb3JkW2tleV07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG5jb25zdCB0b051bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIodmFsdWUpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCB0b1Bvc2l0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPiAwID8gcGFyc2VkIDogbnVsbDtcbn07XG5cclxuY29uc3QgdG9EZE1tWXl5eSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eSh2YWx1ZSk7XG59O1xuXG5jb25zdCB0b1RpY2tldFRpbWUgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCByYXcgPSBzYWZlVGV4dCh2YWx1ZSkucmVwbGFjZSgvXFwuL2csIFwiOlwiKTtcbiAgaWYgKCFyYXcpIHJldHVybiBcIlwiO1xuICBjb25zdCBtYXRjaCA9IHJhdy5tYXRjaCgvXihcXGR7MSwyfSk6KFswLTVdXFxkKSg/OjooWzAtNV1cXGQpKT8kLyk7XG4gIGlmICghbWF0Y2gpIHJldHVybiBcIlwiO1xuICBjb25zdCBob3VycyA9IE51bWJlcihtYXRjaFsxXSk7XG4gIGlmICghTnVtYmVyLmlzSW50ZWdlcihob3VycykgfHwgaG91cnMgPCAwIHx8IGhvdXJzID4gMjMpIHJldHVybiBcIlwiO1xuICByZXR1cm4gYCR7U3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCBcIjBcIil9OiR7bWF0Y2hbMl19OiR7bWF0Y2hbM10gfHwgXCIwMFwifWA7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VG9kYXlEZE1tWXl5eSA9ICgpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdG9EZE1tWXl5eShuZXcgRGF0ZSgpKTtcbn07XG5cclxuY29uc3Qgbm9ybWFsaXplR2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIHJldHVybiB0b0V4cGVuc2VHYXN0b1R5cGVDb2RlKHZhbHVlKTtcbn07XG5cclxuY29uc3Qgbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24gPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XS9nLCBcIlwiKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBcIlwiO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcImpwZWdcIikgcmV0dXJuIFwianBnXCI7XHJcbiAgcmV0dXJuIEFMTE9XRURfVElDS0VUX0lNQUdFX0VYVEVOU0lPTlMuaGFzKG5vcm1hbGl6ZWQpID8gbm9ybWFsaXplZCA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGZyb21OYW1lID0gc2FmZVRleHQoZmlsZS5uYW1lKS5zcGxpdChcIi5cIikucG9wKCkgfHwgXCJcIjtcclxuICByZXR1cm4gbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24oZnJvbU5hbWUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGluZmVyRXh0ZW5zaW9uID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHR5cGUgPSBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgZnJvbU1pbWUgPSBUSUNLRVRfTUlNRV9UT19FWFRFTlNJT05bdHlwZV07XHJcbiAgaWYgKGZyb21NaW1lKSByZXR1cm4gZnJvbU1pbWU7XHJcblxyXG4gIGNvbnN0IGZyb21OYW1lID0gcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZShmaWxlKTtcclxuICBpZiAoZnJvbU5hbWUpIHJldHVybiBmcm9tTmFtZTtcclxuXHJcbiAgcmV0dXJuIFwianBnXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUgPSAoZmlsZTogRmlsZSk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUeXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmIChub3JtYWxpemVkVHlwZSAmJiBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTLmhhcyhub3JtYWxpemVkVHlwZSkpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZXh0ZW5zaW9uID0gcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZShmaWxlKTtcclxuICByZXR1cm4gISFleHRlbnNpb247XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZVJhbmRvbUtleSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh0eXBlb2YgY3J5cHRvICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjcnlwdG8ucmFuZG9tVVVJRCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZXR1cm4gY3J5cHRvLnJhbmRvbVVVSUQoKTtcclxuICB9XHJcbiAgcmV0dXJuIGAke0RhdGUubm93KCl9LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgMTApfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2FuaXRpemVGaWxlTmFtZSA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBiYXNlID0gc2FmZVRleHQodmFsdWUpLnJlcGxhY2UoL1s8PjpcIi9cXFxcfD8qXFx1MDAwMC1cXHUwMDFGXS9nLCBcIl9cIik7XHJcbiAgcmV0dXJuIGJhc2UgfHwgXCJ0aWNrZXQtaW1hZ2VcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhY2VJZEZyb21FcnJvciA9IChlcnJvcjogQXBpRmV0Y2hFcnJvcik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGF5bG9hZCA9IHNhZmVUZXh0KGVycm9yLnJlc3BvbnNlQm9keSk7XHJcbiAgaWYgKCFwYXlsb2FkKSByZXR1cm4gXCJcIjtcclxuICB0cnkge1xyXG4gICAgY29uc3QganNvbiA9IEpTT04ucGFyc2UocGF5bG9hZCkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbiAgICBjb25zdCB0cmFjZUlkID0gc2FmZVRleHQoanNvbi5UcmFjZUlkID8/IGpzb24udHJhY2VJZCk7XHJcbiAgICByZXR1cm4gdHJhY2VJZDtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBOb3JtYWxpemVkRHJhZnQgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyYXdEYXRhKTtcbiAgY29uc3QgZHJhZnREZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJkZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCJdKSk7XG4gIGNvbnN0IGRyYWZ0Q3VycmVuY3kgPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiY3VycmVuY3lDb2RlXCIsIFwiQ3VycmVuY3lDb2RlXCJdKSkudG9VcHBlckNhc2UoKTtcbiAgY29uc3QgZHJhZnRUb3RhbEFtb3VudCA9IHRvTnVtYmVyKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSk7XG4gIGNvbnN0IGRyYWZ0VHJhbnNEYXRlID0gdG9EZE1tWXl5eShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1widHJhbnNEYXRlXCIsIFwiVHJhbnNEYXRlXCJdKSkgfHwgZ2V0VG9kYXlEZE1tWXl5eSgpO1xuICBjb25zdCBkcmFmdFRpY2tldERhdGUgPVxuICAgIHRvRGRNbVl5eXkoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcInRpY2tldERhdGVcIiwgXCJUaWNrZXREYXRlXCJdKSkgfHwgZHJhZnRUcmFuc0RhdGU7XG4gIGNvbnN0IGRyYWZ0VGlja2V0VGltZSA9IHRvVGlja2V0VGltZShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1widGlja2V0VGltZVwiLCBcIlRpY2tldFRpbWVcIl0pKTtcbiAgY29uc3QgZHJhZnRDb21tZW50ID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImNvbWVudGFyaW9cIiwgXCJDb21lbnRhcmlvXCJdKSk7XG4gIGNvbnN0IGRyYWZ0R2FzdG9UeXBlID0gbm9ybWFsaXplR2FzdG9UeXBlKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJnYXN0b1R5cGVcIiwgXCJHYXN0b1R5cGVcIl0pKTtcblxyXG4gIGNvbnN0IHJhd0xpbmVzID0gZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImxpbmVzXCIsIFwiTGluZXNcIl0pO1xyXG4gIGNvbnN0IGxpbmVBcnJheSA9IEFycmF5LmlzQXJyYXkocmF3TGluZXMpID8gcmF3TGluZXMgOiBbXTtcclxuXHJcbiAgY29uc3QgbGluZXM6IE5vcm1hbGl6ZWREcmFmdExpbmVbXSA9IGxpbmVBcnJheVxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBsaW5lUmVjb3JkID0gYXNSZWNvcmQoZW50cnkpO1xuICAgICAgY29uc3QgcXR5Q2FuZGlkYXRlID0gdG9OdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInF0eVwiLCBcIlF0eVwiXSkpO1xuICAgICAgY29uc3QgcXR5ID0gcXR5Q2FuZGlkYXRlICE9PSBudWxsICYmIHF0eUNhbmRpZGF0ZSA+PSAwID8gcXR5Q2FuZGlkYXRlIDogMTtcbiAgICAgIGNvbnN0IHByaWNlID0gdG9OdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInByaWNlXCIsIFwiUHJpY2VcIl0pKTtcbiAgICAgIGNvbnN0IGV4cGxpY2l0VG90YWwgPSB0b051bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widG90YWxBbW91bnRcIiwgXCJUb3RhbEFtb3VudFwiXSkpO1xuICAgICAgY29uc3QgY29tcHV0ZWRUb3RhbCA9IHJlc29sdmVUaWNrZXRMaW5lQW1vdW50KHsgcXR5LCBwcmljZSwgdG90YWxBbW91bnQ6IGV4cGxpY2l0VG90YWwgfSk7XG4gICAgICBpZiAoY29tcHV0ZWRUb3RhbCA9PT0gbnVsbCB8fCAhTnVtYmVyLmlzRmluaXRlKGNvbXB1dGVkVG90YWwpIHx8IGNvbXB1dGVkVG90YWwgPT09IDApIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBlZmZlY3RpdmVQcmljZSA9IHByaWNlICE9PSBudWxsICYmIHByaWNlICE9PSAwID8gcHJpY2UgOiBxdHkgPiAwID8gY29tcHV0ZWRUb3RhbCAvIHF0eSA6IGNvbXB1dGVkVG90YWw7XG4gICAgICBpZiAoZWZmZWN0aXZlUHJpY2UgPT09IDAgfHwgKHF0eSA9PT0gMCAmJiBjb21wdXRlZFRvdGFsID49IDApKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3QgY2FuZGlkYXRlVHlwZVZhbHVlID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widHlwZVZhbHVlXCIsIFwiVHlwZVZhbHVlXCJdKSk7XG4gICAgICBjb25zdCBzYWZlVHlwZVZhbHVlID0gdG9FeHBlbnNlR2FzdG9UeXBlQ29kZShjYW5kaWRhdGVUeXBlVmFsdWUsIHsgYWxsb3dOb25lOiBmYWxzZSB9KTtcbiAgICAgIGNvbnN0IHNhZmVEcmFmdEdhc3RvVHlwZSA9IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUoZHJhZnRHYXN0b1R5cGUsIHsgYWxsb3dOb25lOiBmYWxzZSB9KTtcbiAgICAgIGNvbnN0IGRlZmF1bHRHYXN0b1R5cGUgPSBnZXREZWZhdWx0RXhwZW5zZUdhc3RvVHlwZUNvZGUoUFJFRkVSUkVEX1RJQ0tFVF9HQVNUT19UWVBFKTtcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IHNhZmVUeXBlVmFsdWUgPz8gc2FmZURyYWZ0R2FzdG9UeXBlID8/IGRlZmF1bHRHYXN0b1R5cGU7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJkZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCJdKSkgfHwgZHJhZnREZXNjcmlwdGlvbjtcclxuICAgICAgY29uc3QgdHJhbnNEYXRlID0gdG9EZE1tWXl5eShnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widHJhbnNEYXRlXCIsIFwiVHJhbnNEYXRlXCJdKSkgfHwgZHJhZnRUcmFuc0RhdGU7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgdHlwZVZhbHVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICAgICAgcXR5LFxuICAgICAgICBwcmljZTogZWZmZWN0aXZlUHJpY2UsXG4gICAgICAgIHRvdGFsQW1vdW50OiBjb21wdXRlZFRvdGFsLFxuICAgICAgfTtcbiAgICB9KVxuICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgTm9ybWFsaXplZERyYWZ0TGluZSA9PiBlbnRyeSAhPT0gbnVsbCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkZXNjcmlwdGlvbjogZHJhZnREZXNjcmlwdGlvbiB8fCBcIlRpY2tldFwiLFxuICAgIGN1cnJlbmN5Q29kZTogZHJhZnRDdXJyZW5jeSB8fCBcIkVVUlwiLFxuICAgIHRvdGFsQW1vdW50OiBkcmFmdFRvdGFsQW1vdW50ICE9PSBudWxsID8gZHJhZnRUb3RhbEFtb3VudCA6IGxpbmVzLnJlZHVjZSgoc3VtLCBsaW5lKSA9PiBzdW0gKyBsaW5lLnRvdGFsQW1vdW50LCAwKSxcbiAgICB0cmFuc0RhdGU6IGRyYWZ0VHJhbnNEYXRlLFxuICAgIHRpY2tldERhdGU6IGRyYWZ0VGlja2V0RGF0ZSxcbiAgICB0aWNrZXRUaW1lOiBkcmFmdFRpY2tldFRpbWUsXG4gICAgY29tZW50YXJpbzogZHJhZnRDb21tZW50LFxuICAgIGdhc3RvVHlwZTogZHJhZnRHYXN0b1R5cGUsXG4gICAgbGluZXMsXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRpY2tldEZpbGVJZEZyb21EcmFmdFJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyYXdEYXRhKTtcclxuICBjb25zdCBjcmVhdGlvblJhdyA9IGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJUaWNrZXRDcmVhdGlvblwiLCBcInRpY2tldENyZWF0aW9uXCJdKTtcclxuICBjb25zdCBjcmVhdGlvbiA9IGFzUmVjb3JkKGNyZWF0aW9uUmF3KTtcclxuICByZXR1cm4gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGNyZWF0aW9uLCBbXCJGaWxlSWRcIiwgXCJmaWxlSWRcIl0pKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlVXBsb2FkUmVzdWx0ID0gKHJlc3BvbnNlRGF0YTogdW5rbm93bik6IFVwbG9hZFN5bmNSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyZXNwb25zZURhdGEpO1xyXG4gIHJldHVybiB7XHJcbiAgICB1cmxGaWxlOiBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiVXJsRmlsZVwiLCBcInVybEZpbGVcIl0pKSxcclxuICAgIGZpbGVOYW1lOiBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiRmlsZU5hbWVcIiwgXCJmaWxlTmFtZVwiXSkpLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYnVpbGRUaWNrZXRJYVBheWxvYWQgPSAoZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCwgdXBsb2FkOiBVcGxvYWRTeW5jUmVzdWx0KTogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0+IHtcclxuICBjb25zdCBpYUxpbmVzID0gZHJhZnQubGluZXMubWFwKChsaW5lKSA9PiAoe1xuICAgIGRlc2NyaXB0aW9uOiBsaW5lLmRlc2NyaXB0aW9uLFxuICAgIHF0eTogbGluZS5xdHksXG4gICAgcHJpY2U6IGxpbmUucHJpY2UsXG4gICAgdG90YWxBbW91bnQ6IGxpbmUudG90YWxBbW91bnQsXG4gIH0pKTtcblxyXG4gIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9IHtcclxuICAgIGRlc2NyaXB0aW9uOiBkcmFmdC5kZXNjcmlwdGlvbixcclxuICAgIGN1cnJlbmN5Q29kZTogZHJhZnQuY3VycmVuY3lDb2RlLFxuICAgIHRvdGFsQW1vdW50OiBkcmFmdC50b3RhbEFtb3VudCAhPT0gMCA/IGRyYWZ0LnRvdGFsQW1vdW50IDogdW5kZWZpbmVkLFxuICAgIHRyYW5zRGF0ZTogZHJhZnQudHJhbnNEYXRlLFxuICAgIHRpY2tldERhdGU6IGRyYWZ0LnRpY2tldERhdGUgfHwgZHJhZnQudHJhbnNEYXRlLFxuICAgIHRpY2tldFRpbWU6IGRyYWZ0LnRpY2tldFRpbWUgfHwgdW5kZWZpbmVkLFxuICAgIGNvbWVudGFyaW86IGRyYWZ0LmNvbWVudGFyaW8gfHwgdW5kZWZpbmVkLFxuICAgIHVybEZpbGU6IHVwbG9hZC51cmxGaWxlIHx8IHVuZGVmaW5lZCxcbiAgICBmaWxlTmFtZTogdXBsb2FkLmZpbGVOYW1lIHx8IHVuZGVmaW5lZCxcclxuICAgIGxpbmVzOiBpYUxpbmVzLFxyXG4gIH07XHJcblxyXG4gIGlmIChkcmFmdC5nYXN0b1R5cGUgIT09IG51bGwpIHtcclxuICAgIHBheWxvYWQuZ2FzdG9UeXBlID0gZHJhZnQuZ2FzdG9UeXBlIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBheWxvYWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYnVpbGRTaGVldExpbmVQYXlsb2FkID0gKFxyXG4gIGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQsXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgcHJvamVjdElkOiBzdHJpbmdcclxuKTogRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QgfCBudWxsID0+IHtcclxuICBjb25zdCBsaW5lRnJvbURyYWZ0ID0gZHJhZnQubGluZXNbMF07XHJcbiAgLy8gQnVpbGQgYSBzaW5nbGUgZXhwZW5zZSBsaW5lIGZyb20gdGlja2V0IGhlYWRlciBkYXRhIHRvIGF2b2lkIGxpbmUtbGV2ZWwgZGVzY3JpcHRpb24gbGVha2FnZS5cclxuICBjb25zdCBoZWFkZXJUb3RhbCA9IGRyYWZ0LnRvdGFsQW1vdW50ID4gMCA/IGRyYWZ0LnRvdGFsQW1vdW50IDogMDtcclxuICBjb25zdCBmYWxsYmFja1RvdGFsID0gbGluZUZyb21EcmFmdD8udG90YWxBbW91bnQgfHwgMDtcclxuICBjb25zdCBlZmZlY3RpdmVUb3RhbCA9IGhlYWRlclRvdGFsID4gMCA/IGhlYWRlclRvdGFsIDogZmFsbGJhY2tUb3RhbDtcclxuICBpZiAoIShlZmZlY3RpdmVUb3RhbCA+IDApKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGVmYXVsdEdhc3RvVHlwZSA9IGdldERlZmF1bHRFeHBlbnNlR2FzdG9UeXBlQ29kZShQUkVGRVJSRURfVElDS0VUX0dBU1RPX1RZUEUpO1xuICBjb25zdCB0eXBlVmFsdWVDYW5kaWRhdGUgPSBkcmFmdC5nYXN0b1R5cGUgfHwgbGluZUZyb21EcmFmdD8udHlwZVZhbHVlIHx8IGRlZmF1bHRHYXN0b1R5cGU7XG4gIGNvbnN0IHR5cGVWYWx1ZSA9IHRvRXhwZW5zZUdhc3RvVHlwZUNvZGUodHlwZVZhbHVlQ2FuZGlkYXRlLCB7IGFsbG93Tm9uZTogZmFsc2UgfSkgPz8gZGVmYXVsdEdhc3RvVHlwZTtcblxyXG4gIHJldHVybiB7XHJcbiAgICB0cmFuc0RhdGU6IGRyYWZ0LnRyYW5zRGF0ZSB8fCBsaW5lRnJvbURyYWZ0Py50cmFuc0RhdGUgfHwgZ2V0VG9kYXlEZE1tWXl5eSgpLFxyXG4gICAgdHlwZVZhbHVlLFxyXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGRyYWZ0LmRlc2NyaXB0aW9uKSB8fCBcIlRpY2tldFwiLFxyXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXHJcbiAgICBmaWxlSWQsXHJcbiAgICB0aWNrZXQ6IHRydWUsXHJcbiAgICBxdHk6IDEsXHJcbiAgICBwcmljZTogZWZmZWN0aXZlVG90YWwsXHJcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHByb2plY3RJZCkgfHwgdW5kZWZpbmVkLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcGVyc2lzdFRyYWNlTGlzdCA9ICh0cmFjZUxpc3Q6IFRpY2tldFRyYWNlRW50cnlbXSk6IHZvaWQgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRJQ0tFVF9UUkFDRV9TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkodHJhY2VMaXN0KSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICAvLyBJZ25vcmUgc3RvcmFnZSBmYWlsdXJlcyBpbiByZXN0cmljdGVkIGJyb3dzZXIgY29udGV4dHMuXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNhY2hlSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcsIGZpbGU6IEZpbGUpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuO1xyXG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xyXG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xyXG4gIGF3YWl0IGNhY2hlLnB1dChcclxuICAgIG5ldyBSZXF1ZXN0KHJlcXVlc3RVcmwpLFxyXG4gICAgbmV3IFJlc3BvbnNlKGZpbGUsIHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IHNhZmVUZXh0KGZpbGUudHlwZSkgfHwgXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIixcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWFkQ2FjaGVkSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPEJsb2IgfCBudWxsPiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xyXG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xyXG4gIGNvbnN0IGNhY2hlZFJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2gocmVxdWVzdFVybCk7XHJcbiAgaWYgKCFjYWNoZWRSZXNwb25zZSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIGNhY2hlZFJlc3BvbnNlLmJsb2IoKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW1vdmVDYWNoZWRJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICEoXCJjYWNoZXNcIiBpbiB3aW5kb3cpKSByZXR1cm47XHJcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XHJcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XHJcbiAgYXdhaXQgY2FjaGUuZGVsZXRlKHJlcXVlc3RVcmwpO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldFF1aWNrIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHtcclxuICBNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMsXHJcbiAgY2FjaGVJbWFnZUZpbGUsXHJcbiAgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IsXHJcbiAgaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUsXHJcbiAgcGVyc2lzdFRyYWNlTGlzdCxcclxuICByZW1vdmVDYWNoZWRJbWFnZUZpbGUsXHJcbiAgcmVzb2x2ZVJhbmRvbUtleSxcclxuICB0eXBlIFF1aWNrRmxvd1Byb2dyZXNzS2V5LFxyXG4gIHR5cGUgVGlja2V0SW1hZ2VTb3VyY2UsXHJcbiAgdHlwZSBUaWNrZXRUcmFjZUVudHJ5LFxyXG4gIHR5cGUgVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncyxcclxufSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzXCI7XHJcbmltcG9ydCB7IG9wdGltaXplVGlja2V0SW1hZ2VGb3JVcGxvYWQsIHR5cGUgVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQgfSBmcm9tIFwiLi90aWNrZXRJbWFnZU9wdGltaXphdGlvbi50c1wiO1xyXG5cclxudHlwZSBRdWlja0NyZWF0ZVBhcnRpYWxUaWNrZXRTdGF0ZSA9IHtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBsaW5rZWRUb1NoZWV0OiBib29sZWFuO1xyXG4gIGNvbXBsZXRlZFN0YWdlOiBzdHJpbmc7XHJcbiAgdXJsRmlsZTogc3RyaW5nO1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgcHJvY2Vzc2VkQnlBSTogYm9vbGVhbiB8IG51bGw7XHJcbn07XHJcblxyXG50eXBlIFF1aWNrVGlja2V0QXR0ZW1wdENvbnRleHQgPSB7XHJcbiAgYXR0ZW1wdElkOiBzdHJpbmc7XHJcbiAgc291cmNlOiBUaWNrZXRJbWFnZVNvdXJjZTtcclxuICBzdGFydGVkQXQ6IG51bWJlcjtcclxuICBvcHRpbWl6YXRpb246IFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0O1xyXG59O1xyXG5cclxudHlwZSBRdWlja1RpY2tldFByb2dyZXNzU3RhZ2UgPSB7XHJcbiAga2V5OiBRdWlja0Zsb3dQcm9ncmVzc0tleTtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgc3RhdGU6IFwiY29tcGxldGVkXCIgfCBcImFjdGl2ZVwiIHwgXCJwZW5kaW5nXCI7XHJcbn07XHJcblxyXG5jb25zdCBRVUlDS19USUNLRVRfRkxPV19MT0dfUFJFRklYID0gXCJbZXhwZW5zZS1xdWljay10aWNrZXRdXCI7XHJcbmNvbnN0IFFVSUNLX1RJQ0tFVF9WSVNVQUxfU1RBR0VfTVMgPSB7XHJcbiAgc3luY2luZ0ZpbGU6IDEyMDAsXHJcbiAgZmluYWxpemluZ0lhOiAzNjAwLFxyXG4gIGxpbmtpbmdFeHBlbnNlTGluZTogODUwMCxcclxufSBhcyBjb25zdDtcclxuXHJcbmNvbnN0IGxvZ1F1aWNrVGlja2V0SW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmluZm8oUVVJQ0tfVElDS0VUX0ZMT1dfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nUXVpY2tUaWNrZXRXYXJuID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUud2FybihRVUlDS19USUNLRVRfRkxPV19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dRdWlja1RpY2tldEVycm9yID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFFVSUNLX1RJQ0tFVF9GTE9XX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdEZpbGVTaXplID0gKHNpemU6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCEoc2l6ZSA+IDApKSByZXR1cm4gXCIwIEJcIjtcclxuICBpZiAoc2l6ZSA+PSAxMDI0ICogMTAyNCkgcmV0dXJuIGAkeyhzaXplIC8gKDEwMjQgKiAxMDI0KSkudG9GaXhlZCgyKX0gTUJgO1xyXG4gIGlmIChzaXplID49IDEwMjQpIHJldHVybiBgJHsoc2l6ZSAvIDEwMjQpLnRvRml4ZWQoMSl9IEtCYDtcclxuICByZXR1cm4gYCR7c2l6ZX0gQmA7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEZpbGVMb2dEYXRhID0gKGZpbGU6IEZpbGUpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogc2FmZVRleHQoZmlsZS5uYW1lKSxcclxuICAgIHR5cGU6IHNhZmVUZXh0KGZpbGUudHlwZSksXHJcbiAgICBzaXplQnl0ZXM6IE51bWJlcihmaWxlLnNpemUgfHwgMCksXHJcbiAgICBzaXplVGV4dDogZm9ybWF0RmlsZVNpemUoTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSksXHJcbiAgICBsYXN0TW9kaWZpZWQ6IE51bWJlcihmaWxlLmxhc3RNb2RpZmllZCB8fCAwKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGYWxsYmFja09wdGltaXphdGlvblJlc3VsdCA9IChmaWxlOiBGaWxlKTogVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBmaWxlLFxyXG4gICAgY2hhbmdlZDogZmFsc2UsXHJcbiAgICByZWFzb246IFwib3B0aW1pemF0aW9uLWVycm9yXCIsXHJcbiAgICByZXNpemVkOiBmYWxzZSxcclxuICAgIHJlZW5jb2RlZDogZmFsc2UsXHJcbiAgICBlbGFwc2VkTXM6IDAsXHJcbiAgICBvcmlnaW5hbDoge1xyXG4gICAgICBuYW1lOiBzYWZlVGV4dChmaWxlLm5hbWUpLFxyXG4gICAgICB0eXBlOiBzYWZlVGV4dChmaWxlLnR5cGUpLFxyXG4gICAgICBzaXplOiBOdW1iZXIoZmlsZS5zaXplIHx8IDApLFxyXG4gICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgaGVpZ2h0OiBudWxsLFxyXG4gICAgfSxcclxuICAgIG91dHB1dDoge1xyXG4gICAgICBuYW1lOiBzYWZlVGV4dChmaWxlLm5hbWUpLFxyXG4gICAgICB0eXBlOiBzYWZlVGV4dChmaWxlLnR5cGUpLFxyXG4gICAgICBzaXplOiBOdW1iZXIoZmlsZS5zaXplIHx8IDApLFxyXG4gICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgaGVpZ2h0OiBudWxsLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhID0gKHJlc3VsdDogVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQpID0+IHtcclxuICBjb25zdCBzYXZlZEJ5dGVzID0gTWF0aC5tYXgoMCwgcmVzdWx0Lm9yaWdpbmFsLnNpemUgLSByZXN1bHQub3V0cHV0LnNpemUpO1xyXG4gIGNvbnN0IHNhdmVkUmF0aW8gPSByZXN1bHQub3JpZ2luYWwuc2l6ZSA+IDAgPyBzYXZlZEJ5dGVzIC8gcmVzdWx0Lm9yaWdpbmFsLnNpemUgOiAwO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY2hhbmdlZDogcmVzdWx0LmNoYW5nZWQsXHJcbiAgICByZWFzb246IHJlc3VsdC5yZWFzb24sXHJcbiAgICByZXNpemVkOiByZXN1bHQucmVzaXplZCxcclxuICAgIHJlZW5jb2RlZDogcmVzdWx0LnJlZW5jb2RlZCxcclxuICAgIGVsYXBzZWRNczogcmVzdWx0LmVsYXBzZWRNcyxcclxuICAgIG9yaWdpbmFsOiB7XHJcbiAgICAgIC4uLnJlc3VsdC5vcmlnaW5hbCxcclxuICAgICAgc2l6ZVRleHQ6IGZvcm1hdEZpbGVTaXplKHJlc3VsdC5vcmlnaW5hbC5zaXplKSxcclxuICAgIH0sXHJcbiAgICBvdXRwdXQ6IHtcclxuICAgICAgLi4ucmVzdWx0Lm91dHB1dCxcclxuICAgICAgc2l6ZVRleHQ6IGZvcm1hdEZpbGVTaXplKHJlc3VsdC5vdXRwdXQuc2l6ZSksXHJcbiAgICB9LFxyXG4gICAgc2F2ZWRCeXRlcyxcclxuICAgIHNhdmVkVGV4dDogZm9ybWF0RmlsZVNpemUoc2F2ZWRCeXRlcyksXHJcbiAgICBzYXZlZFJhdGlvOiBOdW1iZXIoc2F2ZWRSYXRpby50b0ZpeGVkKDQpKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0VmFsaWRhdGlvbkVycm9ycyA9IChcclxuICBlcnJvcnM6IEFycmF5PHsgRmllbGQ/OiB1bmtub3duOyBNZXNzYWdlPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZD4gfCBudWxsIHwgdW5kZWZpbmVkXHJcbik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KGVycm9ycykgfHwgZXJyb3JzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwiXCI7XHJcblxyXG4gIHJldHVybiBlcnJvcnNcclxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpZWxkID0gc2FmZVRleHQoZW50cnk/LkZpZWxkKTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHNhZmVUZXh0KGVudHJ5Py5NZXNzYWdlKTtcclxuICAgICAgaWYgKGZpZWxkICYmIG1lc3NhZ2UpIHJldHVybiBgJHtmaWVsZH06ICR7bWVzc2FnZX1gO1xyXG4gICAgICByZXR1cm4gbWVzc2FnZSB8fCBmaWVsZDtcclxuICAgIH0pXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pXHJcbiAgICAuam9pbihcIiB8IFwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgPSAoe1xyXG4gIHNoZWV0SWQgPSBcIlwiLFxyXG4gIHByb2plY3RJZCA9IFwiXCIsXHJcbiAgY3VycmVuY3lDb2RlID0gXCJcIixcclxuICBheFVzZXJJZE92ZXJyaWRlID0gXCJcIixcclxuICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBpc1NoZWV0TG9ja2VkLFxyXG4gIGxpbmtUb1NoZWV0ID0gdHJ1ZSxcclxuICBvbkZvcmJpZGRlbixcclxuICBvbkNvbXBsZXRlZCxcclxufTogVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncykgPT4ge1xyXG4gIGNvbnN0IFtzb3VyY2VQaWNrZXJPcGVuLCBzZXRTb3VyY2VQaWNrZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Byb2dyZXNzS2V5LCBzZXRQcm9ncmVzc0tleV0gPSB1c2VTdGF0ZTxRdWlja0Zsb3dQcm9ncmVzc0tleSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtkaXNwbGF5UHJvZ3Jlc3NLZXksIHNldERpc3BsYXlQcm9ncmVzc0tleV0gPSB1c2VTdGF0ZTxRdWlja0Zsb3dQcm9ncmVzc0tleSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtwcm9ncmVzc0VsYXBzZWRNcywgc2V0UHJvZ3Jlc3NFbGFwc2VkTXNdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFthdHRlbXB0SWQsIHNldEF0dGVtcHRJZF0gPSB1c2VTdGF0ZShcIlwiKTtcbiAgY29uc3QgW3RyYWNlTGlzdCwgc2V0VHJhY2VMaXN0XSA9IHVzZVN0YXRlPFRpY2tldFRyYWNlRW50cnlbXT4oW10pO1xuICBjb25zdCBbcGFydGlhbFRpY2tldEZhaWx1cmUsIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlXSA9IHVzZVN0YXRlPFF1aWNrQ3JlYXRlUGFydGlhbFRpY2tldFN0YXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxhdGVzdEZpbGVSZWYgPSB1c2VSZWY8eyBjYWNoZUtleTogc3RyaW5nOyBmaWxlOiBGaWxlIH0gfCBudWxsPihudWxsKTtcbiAgY29uc3QgcHJvZ3Jlc3NTdGFydGVkQXRSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cclxuICBjb25zdCBwcm9ncmVzc01lc3NhZ2UgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGVmZmVjdGl2ZVByb2dyZXNzS2V5ID0gZGlzcGxheVByb2dyZXNzS2V5IHx8IHByb2dyZXNzS2V5O1xyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcInVwbG9hZGluZ0ltYWdlXCIpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfVXBsb2FkaW5nSW1hZ2VcIiwgXCJVcGxvYWRpbmcgaW1hZ2UuLi5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwiY3JlYXRpbmdUaWNrZXRcIikge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19DcmVhdGluZ1RpY2tldFwiLCBcIkNyZWF0aW5nIHRpY2tldC4uLlwiKTtcclxuICAgIH1cclxuICAgIGlmIChlZmZlY3RpdmVQcm9ncmVzc0tleSA9PT0gXCJzeW5jaW5nRmlsZVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX1N5bmNpbmdGaWxlXCIsIFwiU3luY2luZyBmaWxlLi4uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcImZpbmFsaXppbmdJYVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0ZpbmFsaXppbmdcIiwgXCJGaW5hbGl6aW5nIElBLi4uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcImxpbmtpbmdFeHBlbnNlTGluZVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0xpbmtpbmdMaW5lXCIsIFwiTGlua2luZyBleHBlbnNlIGxpbmUuLi5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0RvbmVcIiwgXCJEb25lXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfSwgW2Rpc3BsYXlQcm9ncmVzc0tleSwgcHJvZ3Jlc3NLZXldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghYnVzeSB8fCBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50ID09PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgc3luY0VsYXBzZWQgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQ7XHJcbiAgICAgIGlmIChzdGFydGVkQXQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoTWF0aC5tYXgoMCwgRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzeW5jRWxhcHNlZCgpO1xyXG4gICAgY29uc3QgaW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbChzeW5jRWxhcHNlZCwgMjUwKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gICAgfTtcclxuICB9LCBbYnVzeV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5KSB7XHJcbiAgICAgIGlmIChwcm9ncmVzc0tleSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShwcm9ncmVzc0tleSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gbnVsbCB8fCBwcm9ncmVzc0tleSA9PT0gXCJ1cGxvYWRpbmdJbWFnZVwiIHx8IHByb2dyZXNzS2V5ID09PSBcImRvbmVcIikge1xyXG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkocHJvZ3Jlc3NLZXkpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KHByb2dyZXNzS2V5KTtcclxuICAgIGlmIChwcm9ncmVzc0tleSAhPT0gXCJjcmVhdGluZ1RpY2tldFwiKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0aW1lcnM6IG51bWJlcltdID0gW1xyXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwic3luY2luZ0ZpbGVcIik7XHJcbiAgICAgIH0sIFFVSUNLX1RJQ0tFVF9WSVNVQUxfU1RBR0VfTVMuc3luY2luZ0ZpbGUpLFxyXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwiZmluYWxpemluZ0lhXCIpO1xyXG4gICAgICB9LCBRVUlDS19USUNLRVRfVklTVUFMX1NUQUdFX01TLmZpbmFsaXppbmdJYSksXHJcbiAgICBdO1xyXG5cclxuICAgIGlmIChsaW5rVG9TaGVldCkge1xyXG4gICAgICB0aW1lcnMucHVzaChcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJsaW5raW5nRXhwZW5zZUxpbmVcIik7XHJcbiAgICAgICAgfSwgUVVJQ0tfVElDS0VUX1ZJU1VBTF9TVEFHRV9NUy5saW5raW5nRXhwZW5zZUxpbmUpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGltZXJzLmZvckVhY2goKHRpbWVySWQpID0+IHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZCkpO1xyXG4gICAgfTtcclxuICB9LCBbYnVzeSwgbGlua1RvU2hlZXQsIHByb2dyZXNzS2V5XSk7XHJcblxyXG4gIGNvbnN0IHByb2dyZXNzU3RhZ2VzID0gdXNlTWVtbzxRdWlja1RpY2tldFByb2dyZXNzU3RhZ2VbXT4oKCkgPT4ge1xyXG4gICAgY29uc3QgdmlzaWJsZVN0YWdlczogUXVpY2tGbG93UHJvZ3Jlc3NLZXlbXSA9IGxpbmtUb1NoZWV0XHJcbiAgICAgID8gW1widXBsb2FkaW5nSW1hZ2VcIiwgXCJjcmVhdGluZ1RpY2tldFwiLCBcInN5bmNpbmdGaWxlXCIsIFwiZmluYWxpemluZ0lhXCIsIFwibGlua2luZ0V4cGVuc2VMaW5lXCJdXHJcbiAgICAgIDogW1widXBsb2FkaW5nSW1hZ2VcIiwgXCJjcmVhdGluZ1RpY2tldFwiLCBcInN5bmNpbmdGaWxlXCIsIFwiZmluYWxpemluZ0lhXCJdO1xyXG5cclxuICAgIGNvbnN0IHN0YWdlQ29weTogUmVjb3JkPFF1aWNrRmxvd1Byb2dyZXNzS2V5LCB7IHRpdGxlOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmcgfT4gPSB7XHJcbiAgICAgIHVwbG9hZGluZ0ltYWdlOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19QcmVwYXJlX1RpdGxlXCIsIFwiUHJlcGFyaW5nIGltYWdlXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19QcmVwYXJlX0JvZHlcIixcclxuICAgICAgICAgIFwiV2UgdmFsaWRhdGUgdGhlIGltYWdlIGFuZCBwcmVwYXJlIGl0IGZvciBhIHJlbGlhYmxlIHVwbG9hZC5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIGNyZWF0aW5nVGlja2V0OiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19DcmVhdGVfVGl0bGVcIiwgXCJDcmVhdGluZyB0aWNrZXRcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0NyZWF0ZV9Cb2R5XCIsXHJcbiAgICAgICAgICBcIlRoZSBiYWNrZW5kIHJlc2VydmVzIHRoZSB0aWNrZXQgYW5kIHN0YXJ0cyB0aGUgc2VydmVyLXNpZGUgZmxvdy5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIHN5bmNpbmdGaWxlOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19GaWxlX1RpdGxlXCIsIFwiU3luY2luZyBmaWxlXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19GaWxlX0JvZHlcIixcclxuICAgICAgICAgIFwiVGhlIHVwbG9hZGVkIGltYWdlIGlzIGJlaW5nIGF0dGFjaGVkIHRvIHRoZSB0aWNrZXQgcmVjb3JkLlwiXHJcbiAgICAgICAgKSxcclxuICAgICAgfSxcclxuICAgICAgZmluYWxpemluZ0lhOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19JYV9UaXRsZVwiLCBcIlJlYWRpbmcgdGlja2V0IGRhdGFcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0lhX0JvZHlcIixcclxuICAgICAgICAgIFwiV2UgYXJlIGV4dHJhY3RpbmcgZGF0ZSwgYW1vdW50IGFuZCBkZXNjcmlwdGlvbiBmcm9tIHRoZSBpbWFnZS5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbmtpbmdFeHBlbnNlTGluZToge1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfTGlua19UaXRsZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19MaW5rX0JvZHlcIixcclxuICAgICAgICAgIFwiVGhlIGdlbmVyYXRlZCB0aWNrZXQgaXMgYmVpbmcgY29ubmVjdGVkIHRvIHRoZSBjdXJyZW50IGV4cGVuc2Ugc2hlZXQuXCJcclxuICAgICAgICApLFxyXG4gICAgICB9LFxyXG4gICAgICBkb25lOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRG9uZVwiLCBcIkRvbmVcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRG9uZVwiLCBcIkRvbmVcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGFjdGl2ZVN0YWdlS2V5ID1cclxuICAgICAgcHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiID8gdmlzaWJsZVN0YWdlc1t2aXNpYmxlU3RhZ2VzLmxlbmd0aCAtIDFdIDogZGlzcGxheVByb2dyZXNzS2V5IHx8IHByb2dyZXNzS2V5O1xyXG4gICAgY29uc3QgYWN0aXZlU3RhZ2VJbmRleCA9IGFjdGl2ZVN0YWdlS2V5ID8gdmlzaWJsZVN0YWdlcy5pbmRleE9mKGFjdGl2ZVN0YWdlS2V5KSA6IC0xO1xyXG5cclxuICAgIHJldHVybiB2aXNpYmxlU3RhZ2VzLm1hcCgoc3RhZ2VLZXksIGluZGV4KSA9PiAoe1xyXG4gICAgICBrZXk6IHN0YWdlS2V5LFxyXG4gICAgICB0aXRsZTogc3RhZ2VDb3B5W3N0YWdlS2V5XS50aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb246IHN0YWdlQ29weVtzdGFnZUtleV0uZGVzY3JpcHRpb24sXHJcbiAgICAgIHN0YXRlOlxyXG4gICAgICAgIHByb2dyZXNzS2V5ID09PSBcImRvbmVcIiB8fCAoYWN0aXZlU3RhZ2VJbmRleCA+PSAwICYmIGluZGV4IDwgYWN0aXZlU3RhZ2VJbmRleClcclxuICAgICAgICAgID8gXCJjb21wbGV0ZWRcIlxyXG4gICAgICAgICAgOiBpbmRleCA9PT0gYWN0aXZlU3RhZ2VJbmRleFxyXG4gICAgICAgICAgICA/IFwiYWN0aXZlXCJcclxuICAgICAgICAgICAgOiBcInBlbmRpbmdcIixcclxuICAgIH0pKTtcclxuICB9LCBbZGlzcGxheVByb2dyZXNzS2V5LCBsaW5rVG9TaGVldCwgcHJvZ3Jlc3NLZXldKTtcclxuXHJcbiAgY29uc3QgYWRkVHJhY2UgPSB1c2VDYWxsYmFjaygoc3RlcDogc3RyaW5nLCB0cmFjZUlkOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHNhZmVUcmFjZUlkID0gc2FmZVRleHQodHJhY2VJZCk7XHJcbiAgICBpZiAoIXNhZmVUcmFjZUlkKSByZXR1cm47XHJcblxyXG4gICAgc2V0VHJhY2VMaXN0KChwcmV2aW91cykgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0ID0gW1xyXG4gICAgICAgIC4uLnByZXZpb3VzLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0ZXAsXHJcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVHJhY2VJZCxcclxuICAgICAgICAgIGF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgfSxcclxuICAgICAgXTtcclxuICAgICAgcGVyc2lzdFRyYWNlTGlzdChuZXh0KTtcclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyQ2FjaGVkQ3VycmVudEltYWdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgY2FjaGVLZXkgPSBsYXRlc3RGaWxlUmVmLmN1cnJlbnQ/LmNhY2hlS2V5O1xyXG4gICAgaWYgKCFjYWNoZUtleSkgcmV0dXJuO1xyXG4gICAgdm9pZCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpLmNhdGNoKCgpID0+IHtcclxuICAgICAgLy8gSWdub3JlIGNhY2hlIGNsZWFudXAgZmFpbHVyZXMgaW4gcmVzdHJpY3RlZCBicm93c2VyIGNvbnRleHRzLlxyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckZsb3dTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgc2V0UGFydGlhbFRpY2tldEZhaWx1cmUobnVsbCk7XG4gICAgc2V0VHJhY2VMaXN0KFtdKTtcbiAgICBwZXJzaXN0VHJhY2VMaXN0KFtdKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGJ1aWxkQXBpT3B0aW9ucyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVBeFVzZXJJZCA9IHNhZmVUZXh0KGF4VXNlcklkT3ZlcnJpZGUpO1xyXG4gICAgaWYgKCFzYWZlQXhVc2VySWQpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiWC1JTkQtQXhVc2VySWRcIjogc2FmZUF4VXNlcklkLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9LCBbYXhVc2VySWRPdmVycmlkZV0pO1xyXG5cclxuICBjb25zdCBlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24gPSB1c2VDYWxsYmFjaygoKTogYm9vbGVhbiA9PiB7XHJcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UgfHwgaXNDcmVhdGVNb2RlIHx8IGlzU2hlZXRMb2NrZWQgfHwgKGxpbmtUb1NoZWV0ICYmICFzaGVldElkKSkge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc1NoZWV0TG9ja2VkLCBsaW5rVG9TaGVldCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlID0gdXNlQ2FsbGJhY2soKGVycm9yOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcclxuICAgICAgY29uc3QgdmFsaWRhdGlvblRleHQgPSBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzKGVycm9yLnZhbGlkYXRpb25FcnJvcnMpO1xyXG4gICAgICBpZiAodmFsaWRhdGlvblRleHQpIHtcclxuICAgICAgICByZXR1cm4gdmFsaWRhdGlvblRleHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyOSkge1xyXG4gICAgICAgIHJldHVybiBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmF0ZUxpbWl0XCIsIFwiVG9vIG1hbnkgcmVxdWVzdHMuXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm90Rm91bmRcIiwgXCJSZWNvcmQgbm90IGZvdW5kLlwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcclxuICAgICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1NlcnZlclwiLCBcIlNlcnZlciBlcnJvci5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBzYWZlVGV4dChlcnJvci5tZXNzYWdlKVxyXG4gICAgICA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgIDogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgYWRkUXVpY2tDcmVhdGVSZXNwb25zZVRyYWNlcyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHJlc3BvbnNlOiBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCkgPT4ge1xyXG4gICAgICBhZGRUcmFjZShcInRpY2tldC1xdWljay1jcmVhdGVcIiwgc2FmZVRleHQocmVzcG9uc2UuVHJhY2VJZCkpO1xyXG5cclxuICAgICAgY29uc3Qgc3RlcFRyYWNlSWRzID0gcmVzcG9uc2UuRGF0YT8uU3RlcFRyYWNlSWRzO1xyXG4gICAgICBhZGRUcmFjZShcInRpY2tldC1jcmVhdGVcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5UaWNrZXRDcmVhdGUpKTtcclxuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmlsZS11cGxvYWRcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5GaWxlVXBsb2FkKSk7XHJcbiAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZWZyb210aWNrZXRcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5EcmFmdEV4dHJhY3QpKTtcclxuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmluYWxpemVcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5UaWNrZXRGaW5hbGl6ZSkpO1xyXG4gICAgICBhZGRUcmFjZShcImV4cGVuc2Utc2hlZXQtbGlua1wiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LlNoZWV0TGluaykpO1xyXG4gICAgfSxcclxuICAgIFthZGRUcmFjZV1cclxuICApO1xyXG5cclxuICBjb25zdCByZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZSA9IHVzZUNhbGxiYWNrKChyZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQpOiBzdHJpbmcgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLkRhdGE7XHJcbiAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChkYXRhPy5GaWxlSWQpO1xyXG4gICAgY29uc3QgY29tcGxldGVkU3RhZ2UgPSBzYWZlVGV4dChkYXRhPy5Db21wbGV0ZWRTdGFnZSk7XHJcbiAgICBjb25zdCByZXNwb25zZU1lc3NhZ2UgPSBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKTtcclxuICAgIGNvbnN0IHZhbGlkYXRpb25UZXh0ID0gZm9ybWF0VmFsaWRhdGlvbkVycm9ycyhyZXNwb25zZS5FcnJvcnMpO1xyXG4gICAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLlJldHJ5QWZ0ZXIpO1xyXG4gICAgY29uc3QgbWVzc2FnZVBhcnRzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA0MjkpIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2gocmVzcG9uc2VNZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9SYXRlTGltaXRcIiwgXCJUb28gbWFueSByZXF1ZXN0cy5cIikpO1xyXG4gICAgICBpZiAocmV0cnlBZnRlcikge1xyXG4gICAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKFxyXG4gICAgICAgICAgaW5kRm9ybWF0KFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmV0cnlBZnRlckhpbnRcIiwgXCJSZXRyeSBhZnRlciB7MH0uXCIsIHJldHJ5QWZ0ZXIpXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uVGV4dCkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaCh2YWxpZGF0aW9uVGV4dCk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlTWVzc2FnZSkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChyZXNwb25zZU1lc3NhZ2UpO1xyXG4gICAgfSBlbHNlIGlmIChmaWxlSWQpIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goXHJcbiAgICAgICAgaW5kVChcclxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUGFydGlhbFwiLFxyXG4gICAgICAgICAgXCJUaGUgdGlja2V0IHdhcyBjcmVhdGVkLCBidXQgdGhlIGZ1bGwgcHJvY2VzcyBkaWQgbm90IGZpbmlzaC5cIlxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuSHR0cFN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob3RGb3VuZFwiLCBcIlJlY29yZCBub3QgZm91bmQuXCIpKTtcclxuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuSHR0cFN0YXR1cyA9PT0gNTAwKSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TZXJ2ZXJcIiwgXCJTZXJ2ZXIgZXJyb3IuXCIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZpbGVJZCAmJiBjb21wbGV0ZWRTdGFnZSkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChpbmRGb3JtYXQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TdGFnZVwiLCBcIkNvbXBsZXRlZCBzdGFnZTogezB9LlwiLCBjb21wbGV0ZWRTdGFnZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZXNzYWdlUGFydHMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY29tcGxldGVGbG93U3VjY2VzcyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGZpbGVJZDogc3RyaW5nLCBsaW5rZWRUb1NoZWV0OiBib29sZWFuLCBjYWNoZUtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldFByb2dyZXNzS2V5KFwiZG9uZVwiKTtcclxuICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwiZG9uZVwiKTtcclxuICAgICAgYXdhaXQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKGNhY2hlS2V5KTtcbiAgICAgIHNldEF0dGVtcHRJZChcIlwiKTtcbiAgICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNldFByb2dyZXNzRWxhcHNlZE1zKDApO1xyXG4gICAgICBvbkNvbXBsZXRlZD8uKHsgZmlsZUlkLCBsaW5rZWRUb1NoZWV0IH0pO1xyXG4gICAgfSxcclxuICAgIFtvbkNvbXBsZXRlZF1cclxuICApO1xyXG5cclxuICBjb25zdCBydW5RdWlja0NyZWF0ZUZsb3cgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChmaWxlOiBGaWxlLCBjYWNoZUtleTogc3RyaW5nLCBjb250ZXh0OiBRdWlja1RpY2tldEF0dGVtcHRDb250ZXh0KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICAgIHNldFByb2dyZXNzS2V5KFwiY3JlYXRpbmdUaWNrZXRcIik7XHJcbiAgICAgIGNsZWFyRmxvd1N0YXRlKCk7XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0U3RhcnRlZEF0ID0gRGF0ZS5ub3coKTtcclxuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwicXVpY2stY3JlYXRlLnJlcXVlc3Quc3RhcnRlZFwiLCB7XHJcbiAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxyXG4gICAgICAgIGxpbmtUb1NoZWV0LFxyXG4gICAgICAgIGNhY2hlS2V5LFxyXG4gICAgICAgIGVsYXBzZWRTaW5jZVNlbGVjdGlvbk1zOiBNYXRoLm1heCgwLCByZXF1ZXN0U3RhcnRlZEF0IC0gY29udGV4dC5zdGFydGVkQXQpLFxyXG4gICAgICAgIHVwbG9hZEZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgICAgb3B0aW1pemF0aW9uOiBidWlsZE9wdGltaXphdGlvbkxvZ0RhdGEoY29udGV4dC5vcHRpbWl6YXRpb24pLFxyXG4gICAgICAgIHNoZWV0SWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQoc2hlZXRJZCkgOiBcIlwiLFxyXG4gICAgICAgIHByb2plY3RJZDogbGlua1RvU2hlZXQgPyBzYWZlVGV4dChwcm9qZWN0SWQpIDogXCJcIixcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0UXVpY2soXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGlja2V0SW1hZ2U6IGZpbGUsXG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQsXG4gICAgICAgICAgICBleGlzdGluZ0hvamFHYXN0b3NJZDogbGlua1RvU2hlZXQgPyBzYWZlVGV4dChzaGVldElkKSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9qSWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQocHJvamVjdElkKSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBidWlsZEFwaU9wdGlvbnMoKVxuICAgICAgICApO1xuXHJcbiAgICAgICAgYWRkUXVpY2tDcmVhdGVSZXNwb25zZVRyYWNlcyhyZXNwb25zZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlRWxhcHNlZE1zID0gTWF0aC5tYXgoMCwgRGF0ZS5ub3coKSAtIHJlcXVlc3RTdGFydGVkQXQpO1xyXG5cclxuICAgICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5GaWxlSWQpO1xyXG4gICAgICAgIGNvbnN0IGxpbmtlZFRvU2hlZXQgPSByZXNwb25zZS5EYXRhPy5MaW5rZWRUb1NoZWV0ID09PSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IHBhcnRpYWxTdGF0ZSA9XHJcbiAgICAgICAgICBmaWxlSWRcclxuICAgICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgICAgICBsaW5rZWRUb1NoZWV0LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVkU3RhZ2U6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LkNvbXBsZXRlZFN0YWdlKSxcclxuICAgICAgICAgICAgICAgIHVybEZpbGU6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LlVybEZpbGUpLFxyXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LkZpbGVOYW1lKSxcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEJ5QUk6IHJlc3BvbnNlLkRhdGE/LlByb2Nlc3NlZEJ5QUkgPz8gbnVsbCxcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgICBpZiAoIWZpbGVJZCkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX05vRmlsZUlkXCIsIFwiQ291bGQgbm90IHJlc29sdmUgdGlja2V0IGZpbGUgaWQuXCIpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBhd2FpdCBjb21wbGV0ZUZsb3dTdWNjZXNzKGZpbGVJZCwgbGlua2VkVG9TaGVldCwgY2FjaGVLZXkpO1xyXG4gICAgICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwicXVpY2stY3JlYXRlLnJlcXVlc3Quc3VjY2VlZGVkXCIsIHtcclxuICAgICAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcclxuICAgICAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcclxuICAgICAgICAgICAgZWxhcHNlZE1zOiByZXNwb25zZUVsYXBzZWRNcyxcclxuICAgICAgICAgICAgaHR0cFN0YXR1czogcmVzcG9uc2UuSHR0cFN0YXR1cyxcclxuICAgICAgICAgICAgdHJhY2VJZDogc2FmZVRleHQocmVzcG9uc2UuVHJhY2VJZCksXHJcbiAgICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgICAgbGlua2VkVG9TaGVldCxcclxuICAgICAgICAgICAgY29tcGxldGVkU3RhZ2U6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LkNvbXBsZXRlZFN0YWdlKSxcclxuICAgICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcmVzcG9uc2UuRGF0YT8uUHJvY2Vzc2VkQnlBSSA/PyBudWxsLFxyXG4gICAgICAgICAgICBzdGVwVHJhY2VJZHM6IHJlc3BvbnNlLkRhdGE/LlN0ZXBUcmFjZUlkcyA/PyBudWxsLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFydGlhbFN0YXRlKSB7XHJcbiAgICAgICAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShwYXJ0aWFsU3RhdGUpO1xyXG4gICAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwicXVpY2stY3JlYXRlLnBhcnRpYWwtc3RhdGVcIiwge1xyXG4gICAgICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxyXG4gICAgICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxyXG4gICAgICAgICAgICBlbGFwc2VkTXM6IHJlc3BvbnNlRWxhcHNlZE1zLFxyXG4gICAgICAgICAgICBmaWxlSWQ6IHBhcnRpYWxTdGF0ZS5maWxlSWQsXHJcbiAgICAgICAgICAgIGxpbmtlZFRvU2hlZXQ6IHBhcnRpYWxTdGF0ZS5saW5rZWRUb1NoZWV0LFxyXG4gICAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogcGFydGlhbFN0YXRlLmNvbXBsZXRlZFN0YWdlLFxyXG4gICAgICAgICAgICBwcm9jZXNzZWRCeUFJOiBwYXJ0aWFsU3RhdGUucHJvY2Vzc2VkQnlBSSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgICBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcclxuICAgICAgICBjb25zdCByZXNvbHZlZE1lc3NhZ2UgPSByZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZShyZXNwb25zZSk7XHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwicXVpY2stY3JlYXRlLnJlcXVlc3QuY29tcGxldGVkLXdpdGgtZXJyb3JcIiwge1xyXG4gICAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXHJcbiAgICAgICAgICBlbGFwc2VkTXM6IHJlc3BvbnNlRWxhcHNlZE1zLFxyXG4gICAgICAgICAgaHR0cFN0YXR1czogcmVzcG9uc2UuSHR0cFN0YXR1cyxcclxuICAgICAgICAgIHRyYWNlSWQ6IHNhZmVUZXh0KHJlc3BvbnNlLlRyYWNlSWQpLFxyXG4gICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgbGlua2VkVG9TaGVldCxcclxuICAgICAgICAgIGNvbXBsZXRlZFN0YWdlOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5Db21wbGV0ZWRTdGFnZSksXHJcbiAgICAgICAgICBwcm9jZXNzZWRCeUFJOiByZXNwb25zZS5EYXRhPy5Qcm9jZXNzZWRCeUFJID8/IG51bGwsXHJcbiAgICAgICAgICByZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZS5SZXRyeUFmdGVyKSxcclxuICAgICAgICAgIG1lc3NhZ2U6IHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpLFxyXG4gICAgICAgICAgcmVzb2x2ZWRNZXNzYWdlLFxyXG4gICAgICAgICAgZXJyb3JzOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlLkVycm9ycykgPyByZXNwb25zZS5FcnJvcnMgOiBbXSxcclxuICAgICAgICAgIHN0ZXBUcmFjZUlkczogcmVzcG9uc2UuRGF0YT8uU3RlcFRyYWNlSWRzID8/IG51bGwsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVkTWVzc2FnZSk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xyXG4gICAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtcXVpY2stY3JlYXRlLWVycm9yXCIsIGV4dHJhY3RUcmFjZUlkRnJvbUVycm9yKGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2dRdWlja1RpY2tldEVycm9yKFwicXVpY2stY3JlYXRlLnJlcXVlc3QuZmFpbGVkXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxyXG4gICAgICAgICAgZWxhcHNlZE1zOiBNYXRoLm1heCgwLCBEYXRlLm5vdygpIC0gcmVxdWVzdFN0YXJ0ZWRBdCksXHJcbiAgICAgICAgICB1cGxvYWRGaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxyXG4gICAgICAgICAgdHJhY2VJZDogZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yID8gZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IoZXJyb3IpIDogXCJcIixcclxuICAgICAgICAgIHN0YXR1czogZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yID8gZXJyb3Iuc3RhdHVzIDogbnVsbCxcclxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSA6IFwiXCIsXHJcbiAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JzOiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgPyBlcnJvci52YWxpZGF0aW9uRXJyb3JzIDogW10sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgICBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzb2x2ZVVpRXJyb3JNZXNzYWdlKGVycm9yKSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbXHJcbiAgICAgIGFkZFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFjZXMsXHJcbiAgICAgIGFkZFRyYWNlLFxyXG4gICAgICBidWlsZEFwaU9wdGlvbnMsXHJcbiAgICAgIGNsZWFyRmxvd1N0YXRlLFxyXG4gICAgICBjb21wbGV0ZUZsb3dTdWNjZXNzLFxyXG4gICAgICBjdXJyZW5jeUNvZGUsXHJcbiAgICAgIGxpbmtUb1NoZWV0LFxyXG4gICAgICBwcm9qZWN0SWQsXHJcbiAgICAgIHJlc29sdmVRdWlja0NyZWF0ZUZhaWx1cmVNZXNzYWdlLFxyXG4gICAgICByZXNvbHZlVWlFcnJvck1lc3NhZ2UsXHJcbiAgICAgIHNoZWV0SWQsXHJcbiAgICBdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0ZWRGaWxlID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAoZmlsZTogRmlsZSB8IG51bGwsIHNvdXJjZTogVGlja2V0SW1hZ2VTb3VyY2UpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgICAgaWYgKCFmaWxlKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBhdHRlbXB0SWQgPSByZXNvbHZlUmFuZG9tS2V5KCk7XHJcbiAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ZWRBdCA9IERhdGUubm93KCk7XHJcbiAgICAgIHNldEF0dGVtcHRJZChhdHRlbXB0SWQpO1xyXG4gICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJzZWxlY3Rpb24ucmVjZWl2ZWRcIiwge1xyXG4gICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgbGlua1RvU2hlZXQsXHJcbiAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoIWVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbigpKSB7XHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwic2VsZWN0aW9uLmZvcmJpZGRlblwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBsaW5rVG9TaGVldCxcclxuICAgICAgICAgIGNhbkNyZWF0ZUV4cGVuc2UsXHJcbiAgICAgICAgICBpc0NyZWF0ZU1vZGUsXHJcbiAgICAgICAgICBpc1NoZWV0TG9ja2VkLFxyXG4gICAgICAgICAgaGFzU2hlZXRJZDogISFzYWZlVGV4dChzaGVldElkKSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHNhZmVUeXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBpZiAoc2FmZVR5cGUgJiYgIXNhZmVUeXBlLnN0YXJ0c1dpdGgoXCJpbWFnZS9cIikgJiYgIS9cXC4oanBlP2d8cG5nfHdlYnApJC9pLnRlc3QoZmlsZS5uYW1lIHx8IFwiXCIpKSB7XHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwic2VsZWN0aW9uLmludmFsaWQtZmlsZS10eXBlXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgICAgICByZWFzb246IFwibWltZS1hbmQtZXh0ZW5zaW9uLW5vdC1zdXBwb3J0ZWRcIixcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUoZmlsZSkpIHtcclxuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJzZWxlY3Rpb24uaW52YWxpZC1maWxlLXR5cGVcIiwge1xyXG4gICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcclxuICAgICAgICAgIHJlYXNvbjogXCJ1bnN1cHBvcnRlZC10aWNrZXQtaW1hZ2UtZmlsZVwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfRmlsZVR5cGVcIiwgXCJVbnN1cHBvcnRlZCBpbWFnZSBmb3JtYXQuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNsZWFyRmxvd1N0YXRlKCk7XHJcbiAgICAgIHNldFByb2dyZXNzS2V5KFwidXBsb2FkaW5nSW1hZ2VcIik7XHJcbiAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShcInVwbG9hZGluZ0ltYWdlXCIpO1xyXG4gICAgICBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50ID0gc2VsZWN0aW9uU3RhcnRlZEF0O1xyXG4gICAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcclxuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwib3B0aW1pemF0aW9uLnN0YXJ0ZWRcIiwge1xyXG4gICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBvcHRpbWl6YXRpb25SZXN1bHQgPSBhd2FpdCBvcHRpbWl6ZVRpY2tldEltYWdlRm9yVXBsb2FkKGZpbGUpLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcIm9wdGltaXphdGlvbi5mYWlsZWRcIiwge1xyXG4gICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcclxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSA6IFwiXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGJ1aWxkRmFsbGJhY2tPcHRpbWl6YXRpb25SZXN1bHQoZmlsZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb25zdCB1cGxvYWRGaWxlID0gb3B0aW1pemF0aW9uUmVzdWx0LmZpbGU7XHJcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcIm9wdGltaXphdGlvbi5jb21wbGV0ZWRcIiwge1xyXG4gICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgLi4uYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhKG9wdGltaXphdGlvblJlc3VsdCksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKHVwbG9hZEZpbGUuc2l6ZSA+IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUykge1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5yZWplY3RlZC1ieS1zaXplXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIG1heFNpemVCeXRlczogTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTLFxyXG4gICAgICAgICAgbWF4U2l6ZVRleHQ6IGZvcm1hdEZpbGVTaXplKE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyksXHJcbiAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKHVwbG9hZEZpbGUpLFxyXG4gICAgICAgICAgb3B0aW1pemF0aW9uOiBidWlsZE9wdGltaXphdGlvbkxvZ0RhdGEob3B0aW1pemF0aW9uUmVzdWx0KSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlU2l6ZVwiLCBcIkltYWdlIGV4Y2VlZHMgNTBNQiBtYXggc2l6ZS5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY2FjaGVLZXkgPSBhdHRlbXB0SWQ7XHJcbiAgICAgIGxhdGVzdEZpbGVSZWYuY3VycmVudCA9IHsgY2FjaGVLZXksIGZpbGU6IHVwbG9hZEZpbGUgfTtcclxuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwiY2FjaGUuc3RvcmUuc3RhcnRlZFwiLCB7XHJcbiAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgIHNvdXJjZSxcclxuICAgICAgICBjYWNoZUtleSxcclxuICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKHVwbG9hZEZpbGUpLFxyXG4gICAgICB9KTtcclxuICAgICAgdm9pZCBjYWNoZUltYWdlRmlsZShjYWNoZUtleSwgdXBsb2FkRmlsZSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJjYWNoZS5zdG9yZS5jb21wbGV0ZWRcIiwge1xyXG4gICAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgICAgY2FjaGVLZXksXHJcbiAgICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEodXBsb2FkRmlsZSksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcImNhY2hlLnN0b3JlLmZhaWxlZFwiLCB7XHJcbiAgICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgICBjYWNoZUtleSxcclxuICAgICAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YSh1cGxvYWRGaWxlKSxcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIDogXCJcIixcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgYXdhaXQgcnVuUXVpY2tDcmVhdGVGbG93KHVwbG9hZEZpbGUsIGNhY2hlS2V5LCB7XHJcbiAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgIHNvdXJjZSxcclxuICAgICAgICBzdGFydGVkQXQ6IHNlbGVjdGlvblN0YXJ0ZWRBdCxcclxuICAgICAgICBvcHRpbWl6YXRpb246IG9wdGltaXphdGlvblJlc3VsdCxcclxuICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgW2NhbkNyZWF0ZUV4cGVuc2UsIGNsZWFyRmxvd1N0YXRlLCBlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24sIGlzQ3JlYXRlTW9kZSwgaXNTaGVldExvY2tlZCwgbGlua1RvU2hlZXQsIHJ1blF1aWNrQ3JlYXRlRmxvdywgc2hlZXRJZF1cclxuICApO1xyXG5cclxuICBjb25zdCByZXRyeVBlbmRpbmdVcGxvYWQgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICByZXR1cm47XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBvcGVuU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uKCkpIHJldHVybjtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgc2V0U291cmNlUGlja2VyT3Blbih0cnVlKTtcclxuICB9LCBbZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uXSk7XHJcblxyXG4gIGNvbnN0IGNsb3NlU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xyXG4gIH0sIFtidXN5XSk7XHJcblxyXG4gIGNvbnN0IHNlbGVjdEZyb21DYW1lcmEgPSB1c2VDYWxsYmFjaygoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcclxuICAgIC8vIFNhZmFyaS9pUGhvbmUgZXhwZWN0cyB0aGUgY2FwdHVyZSBwaWNrZXIgdG8gb3BlbiBmcm9tIHRoZSBhY3RpdmUgdXNlciBnZXN0dXJlLlxyXG4gICAgLy8gUHJlLXJlcXVlc3RpbmcgY2FtZXJhIGFjY2VzcyB3aXRoIGdldFVzZXJNZWRpYSgpIGludHJvZHVjZXMgYW4gYXN5bmMgYm91bmRhcnkgYW5kXHJcbiAgICAvLyBjYW4gbGVhdmUgaU9TIHNob3dpbmcgYW4gYWN0aXZlIGNhbWVyYSBzZXNzaW9uIHdpdGhvdXQgYSB2aXNpYmxlIHByZXZpZXcuXHJcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcclxuICAgIGlucHV0RWxlbWVudC5jbGljaygpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0RnJvbUdhbGxlcnkgPSB1c2VDYWxsYmFjaygoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcclxuICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xyXG4gICAgaW5wdXRFbGVtZW50LmNsaWNrKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckVycm9yID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNsZWFyQ2FjaGVkQ3VycmVudEltYWdlKCk7XG4gICAgc2V0QXR0ZW1wdElkKFwiXCIpO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcclxuICB9LCBbY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2VdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNvdXJjZVBpY2tlck9wZW4sXHJcbiAgICBidXN5LFxyXG4gICAgcHJvZ3Jlc3NLZXksXHJcbiAgICBwcm9ncmVzc01lc3NhZ2UsXHJcbiAgICBwcm9ncmVzc1N0YWdlcyxcclxuICAgIHByb2dyZXNzRWxhcHNlZE1zLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYXR0ZW1wdElkLFxyXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5OiBmYWxzZSxcclxuICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlOiBwYXJ0aWFsVGlja2V0RmFpbHVyZSAhPT0gbnVsbCxcclxuICAgIHRyYWNlTGlzdCxcclxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcclxuICAgIHNlbGVjdEZyb21DYW1lcmEsXHJcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcclxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXG4gICAgY2xlYXJFcnJvcixcbiAgfTtcbn07XHJcbiIsICJpbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxuY29uc3QgTUFYX1RJQ0tFVF9VUExPQURfTE9OR19TSURFX1BYID0gMjA0ODtcclxuY29uc3QgTUlOX1RJQ0tFVF9VUExPQURfU0hPUlRfU0lERV9QWCA9IDc2ODtcclxuY29uc3QgVElDS0VUX1JFRU5DT0RFX1FVQUxJVFkgPSAwLjg1O1xyXG5jb25zdCBNSU5fVElDS0VUX1JFRU5DT0RFX0JZVEVTID0gNCAqIDEwMjQgKiAxMDI0O1xyXG5jb25zdCBNSU5fVElDS0VUX1JFRFVDVElPTl9CWVRFUyA9IDI1NiAqIDEwMjQ7XHJcbmNvbnN0IE1JTl9USUNLRVRfUkVEVUNUSU9OX1JBVElPID0gMC4xMjtcclxuXHJcbnR5cGUgTG9hZGVkSW1hZ2UgPSB7XHJcbiAgZWxlbWVudDogSFRNTEltYWdlRWxlbWVudDtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIGRpc3Bvc2U6ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdCA9IHtcclxuICBmaWxlOiBGaWxlO1xyXG4gIGNoYW5nZWQ6IGJvb2xlYW47XHJcbiAgcmVhc29uOiBzdHJpbmc7XHJcbiAgcmVzaXplZDogYm9vbGVhbjtcclxuICByZWVuY29kZWQ6IGJvb2xlYW47XHJcbiAgZWxhcHNlZE1zOiBudW1iZXI7XHJcbiAgb3JpZ2luYWw6IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHNpemU6IG51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXIgfCBudWxsO1xyXG4gICAgaGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG4gIH07XHJcbiAgb3V0cHV0OiB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICAgIGhlaWdodDogbnVtYmVyIHwgbnVsbDtcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplTWltZVR5cGUgPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcImltYWdlL3BqcGVnXCIgfHwgbm9ybWFsaXplZCA9PT0gXCJpbWFnZS9qcGdcIikge1xyXG4gICAgcmV0dXJuIFwiaW1hZ2UvanBlZ1wiO1xyXG4gIH1cclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbmNvbnN0IHJlcGxhY2VGaWxlRXh0ZW5zaW9uID0gKGZpbGVOYW1lOiBzdHJpbmcsIGV4dGVuc2lvbjogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBiYXNlTmFtZSA9IHNhZmVUZXh0KGZpbGVOYW1lKS5yZXBsYWNlKC9cXC5bYS16MC05XSskL2ksIFwiXCIpO1xyXG4gIGNvbnN0IHNhZmVCYXNlTmFtZSA9IGJhc2VOYW1lIHx8IFwidGlja2V0XCI7XHJcbiAgY29uc3Qgc2FmZUV4dGVuc2lvbiA9IHNhZmVUZXh0KGV4dGVuc2lvbikucmVwbGFjZSgvXlxcLi8sIFwiXCIpLnRvTG93ZXJDYXNlKCkgfHwgXCJqcGdcIjtcclxuICByZXR1cm4gYCR7c2FmZUJhc2VOYW1lfS4ke3NhZmVFeHRlbnNpb259YDtcclxufTtcclxuXHJcbi8vIExvYWRzIG9uZSBpbWFnZSBlbGVtZW50IHNvIGNhbnZhcyByZXNpemluZyBrZWVwcyB0aGUgYnJvd3Nlci1kZWNvZGVkIG9yaWVudGF0aW9uLlxyXG5jb25zdCBsb2FkSW1hZ2UgPSBhc3luYyAoZmlsZTogRmlsZSk6IFByb21pc2U8TG9hZGVkSW1hZ2UgfCBudWxsPiA9PiB7XHJcbiAgaWYgKHR5cGVvZiBJbWFnZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgVVJMID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgb2JqZWN0VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcclxuICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gIGltYWdlLmRlY29kaW5nID0gXCJhc3luY1wiO1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCk7XHJcbiAgICAgIGltYWdlLm9uZXJyb3IgPSAoKSA9PiByZWplY3QobmV3IEVycm9yKFwiQ291bGQgbm90IGRlY29kZSBpbWFnZS5cIikpO1xyXG4gICAgICBpbWFnZS5zcmMgPSBvYmplY3RVcmw7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB3aWR0aCA9IE51bWJlcihpbWFnZS5uYXR1cmFsV2lkdGggfHwgaW1hZ2Uud2lkdGggfHwgMCk7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBOdW1iZXIoaW1hZ2UubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQgfHwgMCk7XHJcbiAgICBpZiAoISh3aWR0aCA+IDApIHx8ICEoaGVpZ2h0ID4gMCkpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZWxlbWVudDogaW1hZ2UsXHJcbiAgICAgIHdpZHRoLFxyXG4gICAgICBoZWlnaHQsXHJcbiAgICAgIGRpc3Bvc2U6ICgpID0+IHtcclxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVJlc2l6ZURpbWVuc2lvbnMgPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB7IHdpZHRoOiBudW1iZXI7IGhlaWdodDogbnVtYmVyOyByZXNpemVkOiBib29sZWFuIH0gPT4ge1xyXG4gIGNvbnN0IGxvbmdTaWRlID0gTWF0aC5tYXgod2lkdGgsIGhlaWdodCk7XHJcbiAgY29uc3Qgc2hvcnRTaWRlID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCk7XHJcbiAgaWYgKGxvbmdTaWRlIDw9IE1BWF9USUNLRVRfVVBMT0FEX0xPTkdfU0lERV9QWCkge1xyXG4gICAgcmV0dXJuIHsgd2lkdGgsIGhlaWdodCwgcmVzaXplZDogZmFsc2UgfTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG1heExvbmdTaWRlU2NhbGUgPSBNQVhfVElDS0VUX1VQTE9BRF9MT05HX1NJREVfUFggLyBsb25nU2lkZTtcclxuICBjb25zdCBtaW5TaG9ydFNpZGVTY2FsZSA9IE1JTl9USUNLRVRfVVBMT0FEX1NIT1JUX1NJREVfUFggLyBzaG9ydFNpZGU7XHJcbiAgY29uc3Qgc2NhbGUgPSBNYXRoLm1heChtYXhMb25nU2lkZVNjYWxlLCBtaW5TaG9ydFNpZGVTY2FsZSk7XHJcbiAgaWYgKCEoc2NhbGUgPCAxKSkge1xyXG4gICAgcmV0dXJuIHsgd2lkdGgsIGhlaWdodCwgcmVzaXplZDogZmFsc2UgfTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB3aWR0aDogTWF0aC5tYXgoMSwgTWF0aC5yb3VuZCh3aWR0aCAqIHNjYWxlKSksXHJcbiAgICBoZWlnaHQ6IE1hdGgubWF4KDEsIE1hdGgucm91bmQoaGVpZ2h0ICogc2NhbGUpKSxcclxuICAgIHJlc2l6ZWQ6IHRydWUsXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGNyZWF0ZUNhbnZhcyA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbCA9PiB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICByZXR1cm4gY2FudmFzO1xyXG59O1xyXG5cclxuY29uc3QgY2FudmFzVG9CbG9iID0gKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIG1pbWVUeXBlOiBzdHJpbmcsIHF1YWxpdHk/OiBudW1iZXIpOiBQcm9taXNlPEJsb2IgfCBudWxsPiA9PiB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XHJcbiAgICBjYW52YXMudG9CbG9iKChibG9iKSA9PiByZXNvbHZlKGJsb2IpLCBtaW1lVHlwZSwgcXVhbGl0eSk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZE9wdGltaXphdGlvblJlc3VsdCA9ICh7XHJcbiAgZmlsZSxcclxuICBvcmlnaW5hbEZpbGUsXHJcbiAgcmVhc29uLFxyXG4gIHJlc2l6ZWQsXHJcbiAgcmVlbmNvZGVkLFxyXG4gIGVsYXBzZWRNcyxcclxuICBvcmlnaW5hbFdpZHRoLFxyXG4gIG9yaWdpbmFsSGVpZ2h0LFxyXG4gIG91dHB1dFdpZHRoLFxyXG4gIG91dHB1dEhlaWdodCxcclxufToge1xyXG4gIGZpbGU6IEZpbGU7XHJcbiAgb3JpZ2luYWxGaWxlOiBGaWxlO1xyXG4gIHJlYXNvbjogc3RyaW5nO1xyXG4gIHJlc2l6ZWQ6IGJvb2xlYW47XHJcbiAgcmVlbmNvZGVkOiBib29sZWFuO1xyXG4gIGVsYXBzZWRNczogbnVtYmVyO1xyXG4gIG9yaWdpbmFsV2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgb3JpZ2luYWxIZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbiAgb3V0cHV0V2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgb3V0cHV0SGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG59KTogVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBmaWxlLFxyXG4gICAgY2hhbmdlZDpcclxuICAgICAgZmlsZSAhPT0gb3JpZ2luYWxGaWxlIHx8XHJcbiAgICAgIGZpbGUuc2l6ZSAhPT0gb3JpZ2luYWxGaWxlLnNpemUgfHxcclxuICAgICAgc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpICE9PSBzYWZlVGV4dChvcmlnaW5hbEZpbGUudHlwZSkudG9Mb3dlckNhc2UoKSxcclxuICAgIHJlYXNvbixcclxuICAgIHJlc2l6ZWQsXHJcbiAgICByZWVuY29kZWQsXHJcbiAgICBlbGFwc2VkTXMsXHJcbiAgICBvcmlnaW5hbDoge1xyXG4gICAgICBuYW1lOiBvcmlnaW5hbEZpbGUubmFtZSxcclxuICAgICAgdHlwZTogb3JpZ2luYWxGaWxlLnR5cGUsXHJcbiAgICAgIHNpemU6IG9yaWdpbmFsRmlsZS5zaXplLFxyXG4gICAgICB3aWR0aDogb3JpZ2luYWxXaWR0aCxcclxuICAgICAgaGVpZ2h0OiBvcmlnaW5hbEhlaWdodCxcclxuICAgIH0sXHJcbiAgICBvdXRwdXQ6IHtcclxuICAgICAgbmFtZTogZmlsZS5uYW1lLFxyXG4gICAgICB0eXBlOiBmaWxlLnR5cGUsXHJcbiAgICAgIHNpemU6IGZpbGUuc2l6ZSxcclxuICAgICAgd2lkdGg6IG91dHB1dFdpZHRoLFxyXG4gICAgICBoZWlnaHQ6IG91dHB1dEhlaWdodCxcclxuICAgIH0sXHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFJldHVybnMgdGhlIHVwbG9hZCBmaWxlIHRvIHVzZS4gSXQga2VlcHMgdGhlIG9yaWdpbmFsIHdoZW4gcmVkdWN0aW9uIHdvdWxkIGJlIHJpc2t5IG9yIGlycmVsZXZhbnQuXHJcbmV4cG9ydCBjb25zdCBvcHRpbWl6ZVRpY2tldEltYWdlRm9yVXBsb2FkID0gYXN5bmMgKGZpbGU6IEZpbGUpOiBQcm9taXNlPFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0PiA9PiB7XHJcbiAgY29uc3Qgc3RhcnRlZEF0ID0gRGF0ZS5ub3coKTtcclxuICBpZiAoIShmaWxlIGluc3RhbmNlb2YgRmlsZSkpIHtcclxuICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgIGZpbGUsXHJcbiAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgcmVhc29uOiBcImludmFsaWQtaW5wdXRcIixcclxuICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgIHJlZW5jb2RlZDogZmFsc2UsXHJcbiAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgb3JpZ2luYWxXaWR0aDogbnVsbCxcclxuICAgICAgb3JpZ2luYWxIZWlnaHQ6IG51bGwsXHJcbiAgICAgIG91dHB1dFdpZHRoOiBudWxsLFxyXG4gICAgICBvdXRwdXRIZWlnaHQ6IG51bGwsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZWRNaW1lVHlwZSA9IG5vcm1hbGl6ZU1pbWVUeXBlKGZpbGUudHlwZSk7XHJcbiAgY29uc3QgbG9hZGVkSW1hZ2UgPSBhd2FpdCBsb2FkSW1hZ2UoZmlsZSk7XHJcbiAgaWYgKCFsb2FkZWRJbWFnZSkge1xyXG4gICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgZmlsZSxcclxuICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICByZWFzb246IFwiZGVjb2RlLXVuYXZhaWxhYmxlXCIsXHJcbiAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxyXG4gICAgICByZWVuY29kZWQ6IGZhbHNlLFxyXG4gICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgIG9yaWdpbmFsV2lkdGg6IG51bGwsXHJcbiAgICAgIG9yaWdpbmFsSGVpZ2h0OiBudWxsLFxyXG4gICAgICBvdXRwdXRXaWR0aDogbnVsbCxcclxuICAgICAgb3V0cHV0SGVpZ2h0OiBudWxsLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBlbGVtZW50IH0gPSBsb2FkZWRJbWFnZTtcclxuICAgIGNvbnN0IHNob3J0U2lkZSA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgY29uc3QgcmVzaXplUGxhbiA9IHJlc29sdmVSZXNpemVEaW1lbnNpb25zKHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgY29uc3QgY2FuUmVlbmNvZGVTYWZlbHkgPSBzaG9ydFNpZGUgPj0gTUlOX1RJQ0tFVF9VUExPQURfU0hPUlRfU0lERV9QWDtcclxuICAgIGNvbnN0IGlzTGFyZ2VPcmlnaW5hbCA9IGZpbGUuc2l6ZSA+PSBNSU5fVElDS0VUX1JFRU5DT0RFX0JZVEVTO1xyXG4gICAgY29uc3Qgc2hvdWxkUmVzaXplID0gcmVzaXplUGxhbi5yZXNpemVkO1xyXG5cclxuICAgIGlmICghc2hvdWxkUmVzaXplICYmICghY2FuUmVlbmNvZGVTYWZlbHkgfHwgIWlzTGFyZ2VPcmlnaW5hbCkpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgICBmaWxlLFxyXG4gICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgICByZWFzb246ICFjYW5SZWVuY29kZVNhZmVseSA/IFwia2VwdC1zbWFsbC1zaG9ydC1zaWRlXCIgOiBcImtlcHQtc21hbGwtZmlsZVwiLFxyXG4gICAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxyXG4gICAgICAgIHJlZW5jb2RlZDogZmFsc2UsXHJcbiAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgb3V0cHV0V2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIG91dHB1dEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobm9ybWFsaXplZE1pbWVUeXBlID09PSBcImltYWdlL3BuZ1wiICYmICFzaG91bGRSZXNpemUpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgICBmaWxlLFxyXG4gICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgICByZWFzb246IFwia2VwdC1wbmctd2l0aG91dC1yZXNpemVcIixcclxuICAgICAgICByZXNpemVkOiBmYWxzZSxcclxuICAgICAgICByZWVuY29kZWQ6IGZhbHNlLFxyXG4gICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIG91dHB1dFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvdXRwdXRIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKHJlc2l6ZVBsYW4ud2lkdGgsIHJlc2l6ZVBsYW4uaGVpZ2h0KTtcclxuICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXM/LmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIGlmICghY2FudmFzIHx8ICFjb250ZXh0KSB7XHJcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgICAgcmVhc29uOiBcImNhbnZhcy11bmF2YWlsYWJsZVwiLFxyXG4gICAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxyXG4gICAgICAgIHJlZW5jb2RlZDogZmFsc2UsXHJcbiAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgb3V0cHV0V2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIG91dHB1dEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IHRydWU7XHJcbiAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nUXVhbGl0eSA9IFwiaGlnaFwiO1xyXG4gICAgY29udGV4dC5kcmF3SW1hZ2UoZWxlbWVudCwgMCwgMCwgcmVzaXplUGxhbi53aWR0aCwgcmVzaXplUGxhbi5oZWlnaHQpO1xyXG5cclxuICAgIGNvbnN0IG91dHB1dE1pbWVUeXBlID0gbm9ybWFsaXplZE1pbWVUeXBlID09PSBcImltYWdlL3dlYnBcIiA/IFwiaW1hZ2Uvd2VicFwiIDogXCJpbWFnZS9qcGVnXCI7XHJcbiAgICBjb25zdCBvdXRwdXRFeHRlbnNpb24gPSBvdXRwdXRNaW1lVHlwZSA9PT0gXCJpbWFnZS93ZWJwXCIgPyBcIndlYnBcIiA6IFwianBnXCI7XHJcbiAgICBjb25zdCBxdWFsaXR5ID0gVElDS0VUX1JFRU5DT0RFX1FVQUxJVFk7XHJcbiAgICBjb25zdCBvcHRpbWl6ZWRCbG9iID0gYXdhaXQgY2FudmFzVG9CbG9iKGNhbnZhcywgb3V0cHV0TWltZVR5cGUsIHF1YWxpdHkpO1xyXG4gICAgaWYgKCFvcHRpbWl6ZWRCbG9iIHx8IG9wdGltaXplZEJsb2Iuc2l6ZSA8PSAwIHx8IG9wdGltaXplZEJsb2Iuc2l6ZSA+PSBmaWxlLnNpemUpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgICBmaWxlLFxyXG4gICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgICByZWFzb246IFwib3B0aW1pemVkLW5vdC1zbWFsbGVyXCIsXHJcbiAgICAgICAgcmVzaXplZDogc2hvdWxkUmVzaXplLFxyXG4gICAgICAgIHJlZW5jb2RlZDogbm9ybWFsaXplZE1pbWVUeXBlICE9PSBvdXRwdXRNaW1lVHlwZSB8fCBpc0xhcmdlT3JpZ2luYWwsXHJcbiAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgb3V0cHV0V2lkdGg6IHNob3VsZFJlc2l6ZSA/IHJlc2l6ZVBsYW4ud2lkdGggOiB3aWR0aCxcclxuICAgICAgICBvdXRwdXRIZWlnaHQ6IHNob3VsZFJlc2l6ZSA/IHJlc2l6ZVBsYW4uaGVpZ2h0IDogaGVpZ2h0LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXNob3VsZFJlc2l6ZSkge1xyXG4gICAgICBjb25zdCBzYXZlZEJ5dGVzID0gZmlsZS5zaXplIC0gb3B0aW1pemVkQmxvYi5zaXplO1xyXG4gICAgICBjb25zdCBzYXZlZFJhdGlvID0gc2F2ZWRCeXRlcyAvIE1hdGgubWF4KGZpbGUuc2l6ZSwgMSk7XHJcbiAgICAgIGlmIChzYXZlZEJ5dGVzIDwgTUlOX1RJQ0tFVF9SRURVQ1RJT05fQllURVMgfHwgc2F2ZWRSYXRpbyA8IE1JTl9USUNLRVRfUkVEVUNUSU9OX1JBVElPKSB7XHJcbiAgICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgICAgIGZpbGUsXHJcbiAgICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgICAgICByZWFzb246IFwicmVkdWN0aW9uLXRvby1zbWFsbFwiLFxyXG4gICAgICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgICAgICByZWVuY29kZWQ6IHRydWUsXHJcbiAgICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgICBvdXRwdXRXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgICBvdXRwdXRIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdGltaXplZEZpbGUgPSBuZXcgRmlsZShbb3B0aW1pemVkQmxvYl0sIHJlcGxhY2VGaWxlRXh0ZW5zaW9uKGZpbGUubmFtZSwgb3V0cHV0RXh0ZW5zaW9uKSwge1xyXG4gICAgICB0eXBlOiBvdXRwdXRNaW1lVHlwZSxcclxuICAgICAgbGFzdE1vZGlmaWVkOiBmaWxlLmxhc3RNb2RpZmllZCB8fCBEYXRlLm5vdygpLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICBmaWxlOiBvcHRpbWl6ZWRGaWxlLFxyXG4gICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgIHJlYXNvbjogXCJvcHRpbWl6ZWRcIixcclxuICAgICAgcmVzaXplZDogc2hvdWxkUmVzaXplLFxyXG4gICAgICByZWVuY29kZWQ6IG5vcm1hbGl6ZWRNaW1lVHlwZSAhPT0gb3V0cHV0TWltZVR5cGUgfHwgaXNMYXJnZU9yaWdpbmFsLFxyXG4gICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxyXG4gICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICBvdXRwdXRXaWR0aDogcmVzaXplUGxhbi53aWR0aCxcclxuICAgICAgb3V0cHV0SGVpZ2h0OiByZXNpemVQbGFuLmhlaWdodCxcclxuICAgIH0pO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBsb2FkZWRJbWFnZS5kaXNwb3NlKCk7XHJcbiAgfVxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUE4RDtBQUM5RCx1QkFBNkI7OztBQ0Q3QixtQkFBNkY7QUFhN0YsSUFBTSxtQ0FBbUM7QUFHekMsSUFBTSxzQkFBc0IsQ0FBQyxZQUFrQztBQUM3RCxNQUFJLE9BQU8sV0FBVyxZQUFhLFFBQU87QUFFMUMsUUFBTSxTQUFTLE9BQU8saUJBQWlCLE9BQU87QUFDOUMsTUFBSSxPQUFPLFlBQVksVUFBVSxPQUFPLGVBQWUsVUFBVTtBQUMvRCxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sT0FBTyxRQUFRLHNCQUFzQjtBQUMzQyxTQUFPLEtBQUssUUFBUSxLQUFLLEtBQUssU0FBUztBQUN6QztBQUdBLElBQU0sNEJBQTRCLE1BQXNDO0FBQ3RFLE1BQUksT0FBTyxhQUFhLGVBQWUsT0FBTyxXQUFXLGFBQWE7QUFDcEUsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFFBQVEsTUFBTSxLQUFLLFNBQVMsaUJBQThCLDZEQUE2RCxDQUFDO0FBQzlILGFBQVcsUUFBUSxPQUFPO0FBQ3hCLFFBQUksQ0FBQyxvQkFBb0IsSUFBSSxFQUFHO0FBRWhDLFVBQU0sT0FBTyxLQUFLLHNCQUFzQjtBQUN4QyxVQUFNLGdCQUFnQixPQUFPLGNBQWMsU0FBUyxnQkFBZ0IsZUFBZTtBQUNuRixRQUFJLGlCQUFpQixFQUFHLFFBQU87QUFFL0IsV0FBTztBQUFBLE1BQ0wsTUFBTSxLQUFLLElBQUksa0NBQWtDLEtBQUssTUFBTSxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ3RFLE9BQU8sS0FBSyxJQUFJLGtDQUFrQyxLQUFLLE1BQU0sZ0JB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
