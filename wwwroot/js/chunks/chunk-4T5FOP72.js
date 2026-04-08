import {
  flashActionMark
} from "./chunk-NONTVIR2.js";
import {
  createExpenseSheetTicketQuick,
  safeText
} from "./chunk-DLCB5DZF.js";
import {
  Spinner_default,
  classNames
} from "./chunk-ZHH4AWW7.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  ApiFetchError,
  indFormat,
  indT
} from "./chunk-5TAE4PEJ.js";
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
  const cards = document.querySelectorAll(".timeline-item .timeline-card, .timeline-box .timeline-card");
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
  const latestCreatedTicketRef = (0, import_react3.useRef)(null);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC90aWNrZXRJbWFnZU9wdGltaXphdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQsIGlzVmFsaWRFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5IH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50c1wiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbmNvbnN0IE1BWF9QQUdFX0JPVFRPTV9BQ1RJT05TID0gNDtcclxuY29uc3QgUEFHRV9CT1RUT01fQUNUSU9OU19UT1BfUEFERElOR19QWCA9IDEyO1xyXG5jb25zdCBQQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfUEFERElOR19QWCA9IDg7XHJcblxyXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBvbkNsaWNrPzogUmVhY3QuTW91c2VFdmVudEhhbmRsZXI8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBhcmlhTGFiZWw/OiBzdHJpbmc7XHJcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xyXG4gIHRhYkluZGV4PzogbnVtYmVyO1xyXG4gIGZ1bGxXaWR0aD86IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25zUHJvcHMgPSB7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBhcmlhTGFiZWw6IHN0cmluZztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBEdW1iIGJ1dHRvbiB1c2VkIGJ5IHRoZSBzaGFyZWQgYm90dG9tIGFjdGlvbiBiYXIuXHJcbmV4cG9ydCBjb25zdCBQYWdlQm90dG9tQWN0aW9uQnV0dG9uID0gKHtcclxuICBsYWJlbCxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIG9uQ2xpY2ssXHJcbiAgY2xhc3NOYW1lLFxyXG4gIGFyaWFMYWJlbCxcclxuICB0eXBlID0gXCJidXR0b25cIixcclxuICB0YWJJbmRleCxcclxuICBmdWxsV2lkdGggPSBmYWxzZSxcclxufTogUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgdHlwZT17dHlwZX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxyXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XHJcbiAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgXCJpbmxpbmUtYmxvY2sgdy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTYwXCIsXG4gICAgICAgIGZ1bGxXaWR0aCA/IFwiY29sLXNwYW4tMlwiIDogXCJcIixcbiAgICAgICAgY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICl9XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBtaW4taC1bNjhweF0gdy1mdWxsIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLVsjMDAxZjRkXS84MCBiZy1wcmltYXJ5IHB4LTQgcHktMy41IHRleHQtY2VudGVyIHRleHQtWzE4cHhdIGZvbnQtYm9sZCBsZWFkaW5nLVsxLjFdIHRleHQtd2hpdGUgc2hhZG93LXhzIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTE1MCBob3ZlcjpiZy1bIzAwMWY0ZF0gc206bWluLWgtWzcycHhdIHNtOnB4LTUgc206cHktNCBzbTp0ZXh0LVsyMHB4XVwiPlxuICAgICAgICB7bGFiZWx9XG4gICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICk7XHJcbn07XHJcblxyXG5QYWdlQm90dG9tQWN0aW9uQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJQYWdlQm90dG9tQWN0aW9uQnV0dG9uXCI7XHJcblxyXG4vLyBGaXhlZCBib3R0b20gYWN0aW9uIGJhciB0aGF0IHN0YXlzIHZpc2libGUgd2hpbGUgdGhlIHBhZ2Ugc2Nyb2xscy5cclxuY29uc3QgUGFnZUJvdHRvbUFjdGlvbnMgPSAoeyBjaGlsZHJlbiwgYXJpYUxhYmVsLCBjbGFzc05hbWUgfTogUGFnZUJvdHRvbUFjdGlvbnNQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGFjdGlvbkJ1dHRvbnMgPSBDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKVxyXG4gICAgLmZpbHRlcihcclxuICAgICAgKGNoaWxkKTogY2hpbGQgaXMgUmVhY3QuUmVhY3RFbGVtZW50PFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcz4gPT5cclxuICAgICAgICBpc1ZhbGlkRWxlbWVudDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uUHJvcHM+KGNoaWxkKSAmJiBjaGlsZC50eXBlID09PSBQYWdlQm90dG9tQWN0aW9uQnV0dG9uXHJcbiAgICApXHJcbiAgICAuc2xpY2UoMCwgTUFYX1BBR0VfQk9UVE9NX0FDVElPTlMpO1xyXG5cclxuICBjb25zdCBhY3Rpb25Db3VudCA9IGFjdGlvbkJ1dHRvbnMubGVuZ3RoO1xyXG4gIGNvbnN0IHsgcmVzZXJ2ZWRIZWlnaHQsIHdyYXBwZXJSZWYsIGNvbnRlbnRJbnNldHMgfSA9IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSgpO1xyXG4gIGNvbnN0IHBvcnRhbFRhcmdldCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBkb2N1bWVudC5ib2R5O1xyXG5cclxuICBpZiAoYWN0aW9uQ291bnQgPCAxKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFjdGlvbkJhciA9IChcclxuICAgIDxkaXZcclxuICAgICAgcmVmPXt3cmFwcGVyUmVmfVxyXG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC14LTAgYm90dG9tLTAgei0xOTAwIGJvcmRlci10IGJvcmRlci1zbGF0ZS0yMDAvOTAgYmctd2hpdGUgc2hhZG93LVswXy0xMHB4XzI4cHhfcmdiYSgxNSwyMyw0MiwwLjEyKV1cIlxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgcGFkZGluZ1RvcDogYCR7UEFHRV9CT1RUT01fQUNUSU9OU19UT1BfUEFERElOR19QWH1weGAsXHJcbiAgICAgICAgICBwYWRkaW5nTGVmdDogYCR7Y29udGVudEluc2V0cz8ubGVmdCA/PyBQQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfUEFERElOR19QWH1weGAsXHJcbiAgICAgICAgICBwYWRkaW5nUmlnaHQ6IGAke2NvbnRlbnRJbnNldHM/LnJpZ2h0ID8/IFBBR0VfQk9UVE9NX0FDVElPTlNfU0lERV9QQURESU5HX1BYfXB4YCxcclxuICAgICAgICAgIHBhZGRpbmdCb3R0b206IFwiY2FsYygwLjc1cmVtICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20sIDBweCkpXCIsXHJcbiAgICAgICAgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIHJvbGU9XCJ0b29sYmFyXCJcclxuICAgICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInBvaW50ZXItZXZlbnRzLWF1dG8gdy1mdWxsXCIsIGNsYXNzTmFtZSB8fCBcIlwiKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTEuNVwiPlxyXG4gICAgICAgICAgICB7YWN0aW9uQnV0dG9ucy5tYXAoKGNoaWxkLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHNob3VsZFVzZUZ1bGxXaWR0aCA9IGFjdGlvbkNvdW50ID09PSAxIHx8IChhY3Rpb25Db3VudCAlIDIgPT09IDEgJiYgaW5kZXggPT09IGFjdGlvbkNvdW50IC0gMSk7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGNsb25lRWxlbWVudChjaGlsZCwge1xyXG4gICAgICAgICAgICAgICAgZnVsbFdpZHRoOiBzaG91bGRVc2VGdWxsV2lkdGgsXHJcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQucHJvcHMudGFiSW5kZXgsXHJcbiAgICAgICAgICAgICAgICBrZXk6IGNoaWxkLmtleSA/PyBgcGFnZS1ib3R0b20tYWN0aW9uLSR7aW5kZXh9YCxcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGRpdiBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT17eyBoZWlnaHQ6IGAke3Jlc2VydmVkSGVpZ2h0fXB4YCB9fSAvPlxyXG4gICAgICB7cG9ydGFsVGFyZ2V0ID8gY3JlYXRlUG9ydGFsKGFjdGlvbkJhciwgcG9ydGFsVGFyZ2V0KSA6IG51bGx9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFnZUJvdHRvbUFjdGlvbnM7XHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZUVmZmVjdEV2ZW50LCB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUsIHR5cGUgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25zSW5zZXRzID0ge1xyXG4gIGxlZnQ6IG51bWJlcjtcclxuICByaWdodDogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBVc2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHlSZXN1bHQgPSB7XHJcbiAgcmVzZXJ2ZWRIZWlnaHQ6IG51bWJlcjtcclxuICB3cmFwcGVyUmVmOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBjb250ZW50SW5zZXRzOiBQYWdlQm90dG9tQWN0aW9uc0luc2V0cyB8IG51bGw7XHJcbn07XHJcblxyXG5jb25zdCBNSU5fUEFHRV9CT1RUT01fQUNUSU9OU19TSURFX0dBUCA9IDg7XHJcblxyXG4vLyBSZXR1cm5zIHRydWUgd2hlbiB0aGUgY2FyZCBpcyByZW5kZXJlZCBhbmQgY2FuIGJlIHVzZWQgYXMgYSBsYXlvdXQgcmVmZXJlbmNlLlxyXG5jb25zdCBpc1Zpc2libGVMYXlvdXRDYXJkID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3Qgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcbiAgaWYgKHN0eWxlcy5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBzdHlsZXMudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgcmV0dXJuIHJlY3Qud2lkdGggPiAwICYmIHJlY3QuaGVpZ2h0ID4gMDtcclxufTtcclxuXHJcbi8vIEZpbmRzIHRoZSBmaXJzdCB2aXNpYmxlIHRpbWVsaW5lIGNhcmQgYW5kIG1hcHMgaXRzIGhvcml6b250YWwgZnJhbWUgdG8gdmlld3BvcnQgaW5zZXRzLlxyXG5jb25zdCByZXNvbHZlVGltZWxpbmVDYXJkSW5zZXRzID0gKCk6IFBhZ2VCb3R0b21BY3Rpb25zSW5zZXRzIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtaXRlbSAudGltZWxpbmUtY2FyZCwgLnRpbWVsaW5lLWJveCAudGltZWxpbmUtY2FyZFwiKTtcclxuICBmb3IgKGNvbnN0IGNhcmQgb2YgY2FyZHMpIHtcclxuICAgIGlmICghaXNWaXNpYmxlTGF5b3V0Q2FyZChjYXJkKSkgY29udGludWU7XHJcblxyXG4gICAgY29uc3QgcmVjdCA9IGNhcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IDA7XHJcbiAgICBpZiAodmlld3BvcnRXaWR0aCA8PSAwKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsZWZ0OiBNYXRoLm1heChNSU5fUEFHRV9CT1RUT01fQUNUSU9OU19TSURFX0dBUCwgTWF0aC5yb3VuZChyZWN0LmxlZnQpKSxcclxuICAgICAgcmlnaHQ6IE1hdGgubWF4KE1JTl9QQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfR0FQLCBNYXRoLnJvdW5kKHZpZXdwb3J0V2lkdGggLSByZWN0LnJpZ2h0KSksXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vLyBUcmFja3MgdGhlIGJvdHRvbSBhY3Rpb24gYmFyIGhlaWdodCBzbyB0aGUgcGFnZSByZXNlcnZlcyBlbm91Z2ggc3BhY2UgZm9yIGl0LlxyXG5leHBvcnQgY29uc3QgdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5ID0gKCk6IFVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eVJlc3VsdCA9PiB7XHJcbiAgY29uc3Qgd3JhcHBlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGFuaW1hdGlvbkZyYW1lUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtyZXNlcnZlZEhlaWdodCwgc2V0UmVzZXJ2ZWRIZWlnaHRdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2NvbnRlbnRJbnNldHMsIHNldENvbnRlbnRJbnNldHNdID0gdXNlU3RhdGU8UGFnZUJvdHRvbUFjdGlvbnNJbnNldHMgfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgbWVhc3VyZUxheW91dCA9IHVzZUVmZmVjdEV2ZW50KCgpID0+IHtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSB3cmFwcGVyUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBuZXh0SGVpZ2h0ID0gTWF0aC5jZWlsKHdyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KTtcclxuICAgIHNldFJlc2VydmVkSGVpZ2h0KChwcmV2aW91cykgPT4gKE1hdGguYWJzKHByZXZpb3VzIC0gbmV4dEhlaWdodCkgPCAxID8gcHJldmlvdXMgOiBuZXh0SGVpZ2h0KSk7XHJcblxyXG4gICAgY29uc3QgbmV4dEluc2V0cyA9IHJlc29sdmVUaW1lbGluZUNhcmRJbnNldHMoKTtcclxuICAgIHNldENvbnRlbnRJbnNldHMoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGlmICghcHJldmlvdXMgJiYgIW5leHRJbnNldHMpIHJldHVybiBwcmV2aW91cztcclxuICAgICAgaWYgKHByZXZpb3VzICYmIG5leHRJbnNldHMgJiYgcHJldmlvdXMubGVmdCA9PT0gbmV4dEluc2V0cy5sZWZ0ICYmIHByZXZpb3VzLnJpZ2h0ID09PSBuZXh0SW5zZXRzLnJpZ2h0KSB7XHJcbiAgICAgICAgcmV0dXJuIHByZXZpb3VzO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBuZXh0SW5zZXRzO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IHNjaGVkdWxlTWVhc3VyZSA9IHVzZUVmZmVjdEV2ZW50KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIG1lYXN1cmVMYXlvdXQoKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG5cclxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgbWVhc3VyZUxheW91dCgpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICAgIGNvbnN0IHdyYXBwZXIgPSB3cmFwcGVyUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgIHNjaGVkdWxlTWVhc3VyZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3cmFwcGVyKTtcclxuICAgIHJldHVybiAoKSA9PiBvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgaWYgKCFib2R5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgIHNjaGVkdWxlTWVhc3VyZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShib2R5LCB7XHJcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiBvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVSZXNpemUgPSAoKSA9PiB7XHJcbiAgICAgIHNjaGVkdWxlTWVhc3VyZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIGhhbmRsZVJlc2l6ZSk7XHJcblxyXG4gICAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICByZXNlcnZlZEhlaWdodCxcclxuICAgIHdyYXBwZXJSZWYsXHJcbiAgICBjb250ZW50SW5zZXRzLFxyXG4gIH07XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIFByb2dyZXNzU3RhZ2UgPSB7XHJcbiAga2V5OiBzdHJpbmc7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHN0YXRlOiBcImNvbXBsZXRlZFwiIHwgXCJhY3RpdmVcIiB8IFwicGVuZGluZ1wiO1xyXG59O1xyXG5cclxudHlwZSBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXlQcm9wcyA9IHtcbiAgb3BlbjogYm9vbGVhbjtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHN1bW1hcnk/OiBzdHJpbmc7XG4gIGVsYXBzZWRNcz86IG51bWJlcjtcbiAgc3RhZ2VzPzogUHJvZ3Jlc3NTdGFnZVtdO1xufTtcblxuY29uc3QgR0xPQkFMX1JBRElVUyA9IFwidmFyKC0tcmFkaXVzLXhsLCA1cHgpXCI7XG5jb25zdCBFTVBUWV9QUk9HUkVTU19TVEFHRVM6IFByb2dyZXNzU3RhZ2VbXSA9IFtdO1xuXG5jb25zdCBmb3JtYXRFbGFwc2VkTGFiZWwgPSAoZWxhcHNlZE1zOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBzYWZlRWxhcHNlZE1zID0gTnVtYmVyLmlzRmluaXRlKGVsYXBzZWRNcykgJiYgZWxhcHNlZE1zID4gMCA/IGVsYXBzZWRNcyA6IDA7XG4gIGNvbnN0IHRvdGFsU2Vjb25kcyA9IE1hdGguZmxvb3Ioc2FmZUVsYXBzZWRNcyAvIDEwMDApO1xuICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyA2MCk7XG4gIGNvbnN0IHNlY29uZHMgPSB0b3RhbFNlY29uZHMgJSA2MDtcbiAgcmV0dXJuIGAke1N0cmluZyhtaW51dGVzKS5wYWRTdGFydCgyLCBcIjBcIil9OiR7U3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsIFwiMFwiKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcmVzb2x2ZVN0YWdlQmFkZ2UgPSAoc3RhZ2U6IFByb2dyZXNzU3RhZ2UpID0+IHtcclxuICBpZiAoc3RhZ2Uuc3RhdGUgPT09IFwiY29tcGxldGVkXCIpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaC04IHctOCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtMTAwIHRleHQtZW1lcmFsZC03MDBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICA8c3ZnIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiBmaWxsPVwibm9uZVwiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjJcIj5cclxuICAgICAgICAgIDxwYXRoIGQ9XCJNNSAxMC41IDguNSAxNCAxNSA2LjVcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGlmIChzdGFnZS5zdGF0ZSA9PT0gXCJhY3RpdmVcIikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBoLTggdy04IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYmctc2t5LTEwMCB0ZXh0LXNreS03MDBcIiBhcmlhLWhpZGRlbj1cInRydWVcIj5cclxuICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxzcGFuXHJcbiAgICAgIGNsYXNzTmFtZT1cImZsZXggaC04IHctOCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHRleHQtc2xhdGUtNDAwXCJcclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaC0yLjUgdy0yLjUgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTIwMFwiIC8+XHJcbiAgICA8L3NwYW4+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIFNob3dzIG9uZSBzdGFnZWQgcHJvZ3Jlc3Mgb3ZlcmxheSB3aGlsZSB0aGUgY29tcG9zaXRlIHF1aWNrLXRpY2tldCByZXF1ZXN0IGlzIGluIGZsaWdodC5cclxuY29uc3QgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5ID0gKHtcbiAgb3BlbixcbiAgdGl0bGUsXG4gIHN1bW1hcnksXG4gIGVsYXBzZWRNcyA9IDAsXG4gIHN0YWdlcyA9IEVNUFRZX1BST0dSRVNTX1NUQUdFUyxcbn06IEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheVByb3BzKSA9PiB7XG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTk1MC80MCBweC00IHB5LTZcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwiZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgdy1mdWxsIG1heC13LWxnIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlLzk1IHAtNVwiXG4gICAgICAgIHN0eWxlPXt7IGJvcmRlclJhZGl1czogR0xPQkFMX1JBRElVUyB9fVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC0xMiB3LTEyIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBiZy1za3ktNTAgdGV4dC1za3ktNzAwXCI+XG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC02IHctNlwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMCBmbGV4LTFcIj5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTVweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPlxyXG4gICAgICAgICAgICAgIHt0aXRsZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfVGl0bGVcIiwgXCJQcm9jZXNzaW5nIHRpY2tldFwiKX1cclxuICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICB7c3VtbWFyeSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0NyZWF0aW5nVGlja2V0XCIsIFwiQ3JlYXRpbmcgdGlja2V0Li4uXCIpfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtNTAgcHgtMyBweS0yIHRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19FbGFwc2VkXCIsIFwiRWxhcHNlZCB0aW1lXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTJweF0gdGV4dC1zbGF0ZS03MDBcIj57Zm9ybWF0RWxhcHNlZExhYmVsKGVsYXBzZWRNcyl9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICB7c3RhZ2VzLmxlbmd0aCA+IDAgPyAoXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTUgc3BhY2UteS0zXCI+XHJcbiAgICAgICAgICAgIHtzdGFnZXMubWFwKChzdGFnZSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGtleT17c3RhZ2Uua2V5fVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgICAgc3RhZ2Uuc3RhdGUgPT09IFwiYWN0aXZlXCJcclxuICAgICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1za3ktMjAwIGJnLXNreS01MC84MCBweC0zIHB5LTNcIlxuICAgICAgICAgICAgICAgICAgICA6IHN0YWdlLnN0YXRlID09PSBcImNvbXBsZXRlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1lbWVyYWxkLTIwMCBiZy1lbWVyYWxkLTUwLzcwIHB4LTMgcHktM1wiXG4gICAgICAgICAgICAgICAgICAgICAgOiBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHB4LTMgcHktM1wiXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtM1wiPlxyXG4gICAgICAgICAgICAgICAgICB7cmVzb2x2ZVN0YWdlQmFkZ2Uoc3RhZ2UpfVxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHBcclxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdlLnN0YXRlID09PSBcInBlbmRpbmdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJ0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwidGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7c3RhZ2UudGl0bGV9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC14cyBsZWFkaW5nLTUgdGV4dC1zbGF0ZS01MDBcIj57c3RhZ2UuZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXk7XHJcbiIsICJcdUZFRkZpbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHR5cGUge1xyXG4gIEV4cGVuc2VHYXN0b1R5cGVDb2RlLFxyXG4gIEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0LFxyXG4gIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsXHJcbiAgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxyXG59IGZyb20gXCIuLi9leHBlbnNlVHlwZXMudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHsgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xyXG5cclxuY29uc3QgVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUgPSBcImluZC1leHBlbnNlLXRpY2tldC1pbWFnZS12MVwiO1xyXG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYID0gXCIvX19pbmRfY2FjaGVfXy90aWNrZXQtaW1hZ2UvXCI7XHJcbmNvbnN0IFRJQ0tFVF9UUkFDRV9TVE9SQUdFX0tFWSA9IFwiZXhwZW5zZV9zaGVldF90aWNrZXRfcXVpY2tfZmxvd190cmFjZV92MVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyA9IDUwICogMTAyNCAqIDEwMjQ7XHJcbmV4cG9ydCBjb25zdCBUSUNLRVRfSU1BR0VfQUNDRVBUX0FUVFJJQlVURSA9XHJcbiAgXCIuanBnLC5qcGVnLC5wbmcsLndlYnAsaW1hZ2UvanBlZyxpbWFnZS9wanBlZyxpbWFnZS9wbmcsaW1hZ2Uvd2VicFwiO1xyXG5jb25zdCBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTID0gbmV3IFNldDxzdHJpbmc+KFtcImltYWdlL2pwZWdcIiwgXCJpbWFnZS9wanBlZ1wiLCBcImltYWdlL3BuZ1wiLCBcImltYWdlL3dlYnBcIl0pO1xyXG5jb25zdCBBTExPV0VEX1RJQ0tFVF9JTUFHRV9FWFRFTlNJT05TID0gbmV3IFNldDxzdHJpbmc+KFtcImpwZ1wiLCBcImpwZWdcIiwgXCJwbmdcIiwgXCJ3ZWJwXCJdKTtcclxuY29uc3QgVElDS0VUX01JTUVfVE9fRVhURU5TSU9OOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xyXG4gIFwiaW1hZ2UvanBlZ1wiOiBcImpwZ1wiLFxyXG4gIFwiaW1hZ2UvcGpwZWdcIjogXCJqcGdcIixcclxuICBcImltYWdlL2pwZ1wiOiBcImpwZ1wiLFxyXG4gIFwiaW1hZ2UvcG5nXCI6IFwicG5nXCIsXHJcbiAgXCJpbWFnZS93ZWJwXCI6IFwid2VicFwiLFxyXG59O1xyXG5jb25zdCBBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcclxuY29uc3QgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRSA9IDg7XHJcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NSRUFURV9NT0RFID0gXCJtYW51YWxcIiBhcyBcImlhXCIgfCBcIm1hbnVhbFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgVGlja2V0SW1hZ2VTb3VyY2UgPSBcImNhbWVyYVwiIHwgXCJnYWxsZXJ5XCI7XHJcblxyXG5leHBvcnQgdHlwZSBUaWNrZXRUcmFjZUVudHJ5ID0ge1xyXG4gIHN0ZXA6IHN0cmluZztcclxuICB0cmFjZUlkOiBzdHJpbmc7XHJcbiAgYXQ6IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgTm9ybWFsaXplZERyYWZ0TGluZSA9IHtcclxuICB0cmFuc0RhdGU6IHN0cmluZztcclxuICB0eXBlVmFsdWU6IG51bWJlcjtcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHF0eTogbnVtYmVyO1xyXG4gIHByaWNlOiBudW1iZXI7XHJcbiAgdG90YWxBbW91bnQ6IG51bWJlcjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIE5vcm1hbGl6ZWREcmFmdCA9IHtcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xyXG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgY29tZW50YXJpbzogc3RyaW5nO1xyXG4gIGdhc3RvVHlwZTogbnVtYmVyIHwgbnVsbDtcclxuICBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgUGVuZGluZ1VwbG9hZFJldHJ5ID1cclxuICB8IHtcclxuICAgICAgc3RyYXRlZ3k6IFwiaWEtcmVhZHlcIjtcclxuICAgICAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgICAgIGV4dGVuc2lvbjogc3RyaW5nO1xyXG4gICAgICBjYWNoZUtleTogc3RyaW5nO1xyXG4gICAgICBkcmFmdDogTm9ybWFsaXplZERyYWZ0O1xyXG4gICAgICBmaWxlTmFtZUhpbnQ6IHN0cmluZztcclxuICAgIH1cclxuICB8IHtcclxuICAgICAgc3RyYXRlZ3k6IFwibWFudWFsLXBvc3QtdXBsb2FkLWRyYWZ0XCI7XHJcbiAgICAgIGZpbGVJZDogc3RyaW5nO1xyXG4gICAgICBleHRlbnNpb246IHN0cmluZztcclxuICAgICAgY2FjaGVLZXk6IHN0cmluZztcclxuICAgICAgZmlsZU5hbWVIaW50OiBzdHJpbmc7XHJcbiAgICB9O1xyXG5cclxuZXhwb3J0IHR5cGUgVXBsb2FkU3luY1Jlc3VsdCA9IHtcclxuICB1cmxGaWxlOiBzdHJpbmc7XHJcbiAgZmlsZU5hbWU6IHN0cmluZztcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0FyZ3MgPSB7XHJcbiAgc2hlZXRJZD86IHN0cmluZztcclxuICBwcm9qZWN0SWQ/OiBzdHJpbmc7XHJcbiAgY3VycmVuY3lDb2RlPzogc3RyaW5nO1xyXG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XHJcbiAgY2FuQ3JlYXRlRXhwZW5zZTogYm9vbGVhbjtcclxuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XHJcbiAgaXNTaGVldExvY2tlZDogYm9vbGVhbjtcclxuICBsaW5rVG9TaGVldD86IGJvb2xlYW47XHJcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XHJcbiAgb25Db21wbGV0ZWQ/OiAocmVzdWx0OiB7IGZpbGVJZDogc3RyaW5nOyBsaW5rZWRUb1NoZWV0OiBib29sZWFuIH0pID0+IHZvaWQ7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBRdWlja0Zsb3dQcm9ncmVzc0tleSA9XHJcbiAgfCBcInVwbG9hZGluZ0ltYWdlXCJcclxuICB8IFwiY3JlYXRpbmdUaWNrZXRcIlxyXG4gIHwgXCJzeW5jaW5nRmlsZVwiXHJcbiAgfCBcImZpbmFsaXppbmdJYVwiXHJcbiAgfCBcImxpbmtpbmdFeHBlbnNlTGluZVwiXHJcbiAgfCBcImRvbmVcIjtcclxuXHJcbmNvbnN0IGFzUmVjb3JkID0gKHZhbHVlOiB1bmtub3duKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4ge307XHJcbiAgcmV0dXJuIHZhbHVlIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Rmlyc3REZWZpbmVkID0gKHJlY29yZDogUmVjb3JkPHN0cmluZywgdW5rbm93bj4sIGtleXM6IHN0cmluZ1tdKTogdW5rbm93biA9PiB7XHJcbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xyXG4gICAgaWYgKGtleSBpbiByZWNvcmQpIHtcclxuICAgICAgcmV0dXJuIHJlY29yZFtrZXldO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdW5kZWZpbmVkO1xyXG59O1xyXG5cclxuY29uc3QgdG9OdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gTnVtYmVyLmlzRmluaXRlKHBhcnNlZCkgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdG9Qb3NpdGl2ZU51bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVtYmVyKHZhbHVlKTtcclxuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIHBhcnNlZCA+IDAgPyBwYXJzZWQgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgdG9EZE1tWXl5eSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIHRvRXhwZW5zZUFwaURkTW1ZeXl5KHZhbHVlKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRUb2RheURkTW1ZeXl5ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIHRvRGRNbVl5eXkobmV3IERhdGUoKSk7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSB0b051bWJlcih2YWx1ZSk7XHJcbiAgaWYgKHBhcnNlZCA9PT0gbnVsbCB8fCAhTnVtYmVyLmlzSW50ZWdlcihwYXJzZWQpIHx8ICFBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUy5oYXMocGFyc2VkKSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJldHVybiBwYXJzZWQ7XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVJbWFnZUV4dGVuc2lvbiA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15hLXowLTldL2csIFwiXCIpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIFwiXCI7XHJcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwianBlZ1wiKSByZXR1cm4gXCJqcGdcIjtcclxuICByZXR1cm4gQUxMT1dFRF9USUNLRVRfSU1BR0VfRVhURU5TSU9OUy5oYXMobm9ybWFsaXplZCkgPyBub3JtYWxpemVkIDogXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVFeHRlbnNpb25Gcm9tRmlsZU5hbWUgPSAoZmlsZTogRmlsZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZnJvbU5hbWUgPSBzYWZlVGV4dChmaWxlLm5hbWUpLnNwbGl0KFwiLlwiKS5wb3AoKSB8fCBcIlwiO1xyXG4gIHJldHVybiBub3JtYWxpemVJbWFnZUV4dGVuc2lvbihmcm9tTmFtZSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaW5mZXJFeHRlbnNpb24gPSAoZmlsZTogRmlsZSk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgdHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcclxuICBjb25zdCBmcm9tTWltZSA9IFRJQ0tFVF9NSU1FX1RPX0VYVEVOU0lPTlt0eXBlXTtcclxuICBpZiAoZnJvbU1pbWUpIHJldHVybiBmcm9tTWltZTtcclxuXHJcbiAgY29uc3QgZnJvbU5hbWUgPSByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lKGZpbGUpO1xyXG4gIGlmIChmcm9tTmFtZSkgcmV0dXJuIGZyb21OYW1lO1xyXG5cclxuICByZXR1cm4gXCJqcGdcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc1N1cHBvcnRlZFRpY2tldEltYWdlRmlsZSA9IChmaWxlOiBGaWxlKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFR5cGUgPSBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWRUeXBlICYmIEFMTE9XRURfVElDS0VUX0lNQUdFX01JTUVfVFlQRVMuaGFzKG5vcm1hbGl6ZWRUeXBlKSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBleHRlbnNpb24gPSByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lKGZpbGUpO1xyXG4gIHJldHVybiAhIWV4dGVuc2lvbjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlUmFuZG9tS2V5ID0gKCk6IHN0cmluZyA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjcnlwdG8gIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNyeXB0by5yYW5kb21VVUlEID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHJldHVybiBjcnlwdG8ucmFuZG9tVVVJRCgpO1xyXG4gIH1cclxuICByZXR1cm4gYCR7RGF0ZS5ub3coKX0tJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCAxMCl9YDtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUZpbGVOYW1lID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGJhc2UgPSBzYWZlVGV4dCh2YWx1ZSkucmVwbGFjZSgvWzw+OlwiL1xcXFx8PypcXHUwMDAwLVxcdTAwMUZdL2csIFwiX1wiKTtcclxuICByZXR1cm4gYmFzZSB8fCBcInRpY2tldC1pbWFnZVwiO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGV4dHJhY3RUcmFjZUlkRnJvbUVycm9yID0gKGVycm9yOiBBcGlGZXRjaEVycm9yKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBwYXlsb2FkID0gc2FmZVRleHQoZXJyb3IucmVzcG9uc2VCb2R5KTtcclxuICBpZiAoIXBheWxvYWQpIHJldHVybiBcIlwiO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShwYXlsb2FkKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuICAgIGNvbnN0IHRyYWNlSWQgPSBzYWZlVGV4dChqc29uLlRyYWNlSWQgPz8ganNvbi50cmFjZUlkKTtcclxuICAgIHJldHVybiB0cmFjZUlkO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vcm1hbGl6ZURyYWZ0RnJvbUlhUmVzcG9uc2UgPSAocmF3RGF0YTogdW5rbm93bik6IE5vcm1hbGl6ZWREcmFmdCA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJhd0RhdGEpO1xyXG4gIGNvbnN0IGRyYWZ0RGVzY3JpcHRpb24gPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiXSkpO1xyXG4gIGNvbnN0IGRyYWZ0Q3VycmVuY3kgPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiY3VycmVuY3lDb2RlXCIsIFwiQ3VycmVuY3lDb2RlXCJdKSkudG9VcHBlckNhc2UoKTtcclxuICBjb25zdCBkcmFmdFRvdGFsQW1vdW50ID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQoZGF0YSwgW1widG90YWxBbW91bnRcIiwgXCJUb3RhbEFtb3VudFwiXSkpIHx8IDA7XHJcbiAgY29uc3QgZHJhZnRUcmFuc0RhdGUgPSB0b0RkTW1ZeXl5KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0cmFuc0RhdGVcIiwgXCJUcmFuc0RhdGVcIl0pKSB8fCBnZXRUb2RheURkTW1ZeXl5KCk7XHJcbiAgY29uc3QgZHJhZnRDb21tZW50ID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImNvbWVudGFyaW9cIiwgXCJDb21lbnRhcmlvXCJdKSk7XHJcbiAgY29uc3QgZHJhZnRHYXN0b1R5cGUgPSBub3JtYWxpemVHYXN0b1R5cGUoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImdhc3RvVHlwZVwiLCBcIkdhc3RvVHlwZVwiXSkpO1xyXG5cclxuICBjb25zdCByYXdMaW5lcyA9IGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJsaW5lc1wiLCBcIkxpbmVzXCJdKTtcclxuICBjb25zdCBsaW5lQXJyYXkgPSBBcnJheS5pc0FycmF5KHJhd0xpbmVzKSA/IHJhd0xpbmVzIDogW107XHJcblxyXG4gIGNvbnN0IGxpbmVzOiBOb3JtYWxpemVkRHJhZnRMaW5lW10gPSBsaW5lQXJyYXlcclxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGxpbmVSZWNvcmQgPSBhc1JlY29yZChlbnRyeSk7XHJcbiAgICAgIGNvbnN0IHF0eSA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInF0eVwiLCBcIlF0eVwiXSkpIHx8IDE7XHJcbiAgICAgIGNvbnN0IHByaWNlID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1wicHJpY2VcIiwgXCJQcmljZVwiXSkpIHx8IDA7XHJcbiAgICAgIGNvbnN0IGV4cGxpY2l0VG90YWwgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcclxuICAgICAgY29uc3QgY29tcHV0ZWRUb3RhbCA9IGV4cGxpY2l0VG90YWwgPiAwID8gZXhwbGljaXRUb3RhbCA6IHF0eSAqIHByaWNlO1xyXG4gICAgICBpZiAoIShjb21wdXRlZFRvdGFsID4gMCkpIHJldHVybiBudWxsO1xyXG5cclxuICAgICAgY29uc3QgY2FuZGlkYXRlVHlwZVZhbHVlID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widHlwZVZhbHVlXCIsIFwiVHlwZVZhbHVlXCJdKSk7XHJcbiAgICAgIGNvbnN0IHNhZmVUeXBlVmFsdWUgPSBOdW1iZXIuaXNJbnRlZ2VyKGNhbmRpZGF0ZVR5cGVWYWx1ZSkgPyBOdW1iZXIoY2FuZGlkYXRlVHlwZVZhbHVlKSA6IG51bGw7XHJcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IHNhZmVUeXBlVmFsdWUgJiYgc2FmZVR5cGVWYWx1ZSA+IDAgPyBzYWZlVHlwZVZhbHVlIDogZHJhZnRHYXN0b1R5cGUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcclxuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1wiZGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiXSkpIHx8IGRyYWZ0RGVzY3JpcHRpb247XHJcbiAgICAgIGNvbnN0IHRyYW5zRGF0ZSA9IHRvRGRNbVl5eXkoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInRyYW5zRGF0ZVwiLCBcIlRyYW5zRGF0ZVwiXSkpIHx8IGRyYWZ0VHJhbnNEYXRlO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0cmFuc0RhdGUsXHJcbiAgICAgICAgdHlwZVZhbHVlLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiB8fCBcIlRpY2tldFwiLFxyXG4gICAgICAgIHF0eSxcclxuICAgICAgICBwcmljZTogcHJpY2UgPiAwID8gcHJpY2UgOiBjb21wdXRlZFRvdGFsLFxyXG4gICAgICAgIHRvdGFsQW1vdW50OiBjb21wdXRlZFRvdGFsLFxyXG4gICAgICB9O1xyXG4gICAgfSlcclxuICAgIC5maWx0ZXIoKGVudHJ5KTogZW50cnkgaXMgTm9ybWFsaXplZERyYWZ0TGluZSA9PiBlbnRyeSAhPT0gbnVsbCk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBkZXNjcmlwdGlvbjogZHJhZnREZXNjcmlwdGlvbiB8fCBcIlRpY2tldFwiLFxyXG4gICAgY3VycmVuY3lDb2RlOiBkcmFmdEN1cnJlbmN5IHx8IFwiRVVSXCIsXHJcbiAgICB0b3RhbEFtb3VudDogZHJhZnRUb3RhbEFtb3VudCA+IDAgPyBkcmFmdFRvdGFsQW1vdW50IDogbGluZXMucmVkdWNlKChzdW0sIGxpbmUpID0+IHN1bSArIGxpbmUudG90YWxBbW91bnQsIDApLFxyXG4gICAgdHJhbnNEYXRlOiBkcmFmdFRyYW5zRGF0ZSxcclxuICAgIGNvbWVudGFyaW86IGRyYWZ0Q29tbWVudCxcclxuICAgIGdhc3RvVHlwZTogZHJhZnRHYXN0b1R5cGUsXHJcbiAgICBsaW5lcyxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVUaWNrZXRGaWxlSWRGcm9tRHJhZnRSZXNwb25zZSA9IChyYXdEYXRhOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XHJcbiAgY29uc3QgY3JlYXRpb25SYXcgPSBnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiVGlja2V0Q3JlYXRpb25cIiwgXCJ0aWNrZXRDcmVhdGlvblwiXSk7XHJcbiAgY29uc3QgY3JlYXRpb24gPSBhc1JlY29yZChjcmVhdGlvblJhdyk7XHJcbiAgcmV0dXJuIHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChjcmVhdGlvbiwgW1wiRmlsZUlkXCIsIFwiZmlsZUlkXCJdKSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZVVwbG9hZFJlc3VsdCA9IChyZXNwb25zZURhdGE6IHVua25vd24pOiBVcGxvYWRTeW5jUmVzdWx0ID0+IHtcclxuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmVzcG9uc2VEYXRhKTtcclxuICByZXR1cm4ge1xyXG4gICAgdXJsRmlsZTogc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlVybEZpbGVcIiwgXCJ1cmxGaWxlXCJdKSksXHJcbiAgICBmaWxlTmFtZTogc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIkZpbGVOYW1lXCIsIFwiZmlsZU5hbWVcIl0pKSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkVGlja2V0SWFQYXlsb2FkID0gKGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQsIHVwbG9hZDogVXBsb2FkU3luY1Jlc3VsdCk6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9PiB7XHJcbiAgY29uc3QgaWFMaW5lcyA9IGRyYWZ0LmxpbmVzLm1hcCgobGluZSkgPT4gKHtcclxuICAgIGRlc2NyaXB0aW9uOiBsaW5lLmRlc2NyaXB0aW9uLFxyXG4gICAgcXR5OiBsaW5lLnF0eSxcclxuICAgIHByaWNlOiBsaW5lLnByaWNlLFxyXG4gICAgdG90YWxBbW91bnQ6IGxpbmUudG90YWxBbW91bnQsXHJcbiAgfSkpO1xyXG5cclxuICBjb25zdCBwYXlsb2FkOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QgPSB7XHJcbiAgICBkZXNjcmlwdGlvbjogZHJhZnQuZGVzY3JpcHRpb24sXHJcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0LmN1cnJlbmN5Q29kZSxcclxuICAgIHRvdGFsQW1vdW50OiBkcmFmdC50b3RhbEFtb3VudCA+IDAgPyBkcmFmdC50b3RhbEFtb3VudCA6IHVuZGVmaW5lZCxcclxuICAgIHRyYW5zRGF0ZTogZHJhZnQudHJhbnNEYXRlLFxyXG4gICAgY29tZW50YXJpbzogZHJhZnQuY29tZW50YXJpbyB8fCB1bmRlZmluZWQsXHJcbiAgICB1cmxGaWxlOiB1cGxvYWQudXJsRmlsZSB8fCB1bmRlZmluZWQsXHJcbiAgICBmaWxlTmFtZTogdXBsb2FkLmZpbGVOYW1lIHx8IHVuZGVmaW5lZCxcclxuICAgIGxpbmVzOiBpYUxpbmVzLFxyXG4gIH07XHJcblxyXG4gIGlmIChkcmFmdC5nYXN0b1R5cGUgIT09IG51bGwpIHtcclxuICAgIHBheWxvYWQuZ2FzdG9UeXBlID0gZHJhZnQuZ2FzdG9UeXBlIGFzIEV4cGVuc2VHYXN0b1R5cGVDb2RlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHBheWxvYWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYnVpbGRTaGVldExpbmVQYXlsb2FkID0gKFxyXG4gIGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQsXHJcbiAgZmlsZUlkOiBzdHJpbmcsXHJcbiAgcHJvamVjdElkOiBzdHJpbmdcclxuKTogRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QgfCBudWxsID0+IHtcclxuICBjb25zdCBsaW5lRnJvbURyYWZ0ID0gZHJhZnQubGluZXNbMF07XHJcbiAgLy8gQnVpbGQgYSBzaW5nbGUgZXhwZW5zZSBsaW5lIGZyb20gdGlja2V0IGhlYWRlciBkYXRhIHRvIGF2b2lkIGxpbmUtbGV2ZWwgZGVzY3JpcHRpb24gbGVha2FnZS5cclxuICBjb25zdCBoZWFkZXJUb3RhbCA9IGRyYWZ0LnRvdGFsQW1vdW50ID4gMCA/IGRyYWZ0LnRvdGFsQW1vdW50IDogMDtcclxuICBjb25zdCBmYWxsYmFja1RvdGFsID0gbGluZUZyb21EcmFmdD8udG90YWxBbW91bnQgfHwgMDtcclxuICBjb25zdCBlZmZlY3RpdmVUb3RhbCA9IGhlYWRlclRvdGFsID4gMCA/IGhlYWRlclRvdGFsIDogZmFsbGJhY2tUb3RhbDtcclxuICBpZiAoIShlZmZlY3RpdmVUb3RhbCA+IDApKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgdHlwZVZhbHVlQ2FuZGlkYXRlID0gZHJhZnQuZ2FzdG9UeXBlIHx8IGxpbmVGcm9tRHJhZnQ/LnR5cGVWYWx1ZSB8fCBERUZBVUxUX1RJQ0tFVF9HQVNUT19UWVBFO1xyXG4gIGNvbnN0IHNhZmVUeXBlVmFsdWUgPSBOdW1iZXIodHlwZVZhbHVlQ2FuZGlkYXRlKTtcclxuICBjb25zdCB0eXBlVmFsdWUgPSBOdW1iZXIuaXNJbnRlZ2VyKHNhZmVUeXBlVmFsdWUpICYmIHNhZmVUeXBlVmFsdWUgPiAwID8gc2FmZVR5cGVWYWx1ZSA6IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICB0cmFuc0RhdGU6IGRyYWZ0LnRyYW5zRGF0ZSB8fCBsaW5lRnJvbURyYWZ0Py50cmFuc0RhdGUgfHwgZ2V0VG9kYXlEZE1tWXl5eSgpLFxyXG4gICAgdHlwZVZhbHVlLFxyXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGRyYWZ0LmRlc2NyaXB0aW9uKSB8fCBcIlRpY2tldFwiLFxyXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXHJcbiAgICBmaWxlSWQsXHJcbiAgICB0aWNrZXQ6IHRydWUsXHJcbiAgICBxdHk6IDEsXHJcbiAgICBwcmljZTogZWZmZWN0aXZlVG90YWwsXHJcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHByb2plY3RJZCkgfHwgdW5kZWZpbmVkLFxyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcGVyc2lzdFRyYWNlTGlzdCA9ICh0cmFjZUxpc3Q6IFRpY2tldFRyYWNlRW50cnlbXSk6IHZvaWQgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRJQ0tFVF9UUkFDRV9TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkodHJhY2VMaXN0KSk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICAvLyBJZ25vcmUgc3RvcmFnZSBmYWlsdXJlcyBpbiByZXN0cmljdGVkIGJyb3dzZXIgY29udGV4dHMuXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGNhY2hlSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcsIGZpbGU6IEZpbGUpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuO1xyXG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xyXG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xyXG4gIGF3YWl0IGNhY2hlLnB1dChcclxuICAgIG5ldyBSZXF1ZXN0KHJlcXVlc3RVcmwpLFxyXG4gICAgbmV3IFJlc3BvbnNlKGZpbGUsIHtcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IHNhZmVUZXh0KGZpbGUudHlwZSkgfHwgXCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIixcclxuICAgICAgfSxcclxuICAgIH0pXHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWFkQ2FjaGVkSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPEJsb2IgfCBudWxsPiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xyXG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xyXG4gIGNvbnN0IGNhY2hlZFJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2gocmVxdWVzdFVybCk7XHJcbiAgaWYgKCFjYWNoZWRSZXNwb25zZSkgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIGNhY2hlZFJlc3BvbnNlLmJsb2IoKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZW1vdmVDYWNoZWRJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICEoXCJjYWNoZXNcIiBpbiB3aW5kb3cpKSByZXR1cm47XHJcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XHJcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XHJcbiAgYXdhaXQgY2FjaGUuZGVsZXRlKHJlcXVlc3RVcmwpO1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcclxuaW1wb3J0IHsgaW5kRm9ybWF0LCBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IGNyZWF0ZUV4cGVuc2VTaGVldFRpY2tldFF1aWNrIH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuaW1wb3J0IHtcclxuICBNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMsXHJcbiAgY2FjaGVJbWFnZUZpbGUsXHJcbiAgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IsXHJcbiAgaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUsXHJcbiAgcGVyc2lzdFRyYWNlTGlzdCxcclxuICByZW1vdmVDYWNoZWRJbWFnZUZpbGUsXHJcbiAgcmVzb2x2ZVJhbmRvbUtleSxcclxuICB0eXBlIFF1aWNrRmxvd1Byb2dyZXNzS2V5LFxyXG4gIHR5cGUgVGlja2V0SW1hZ2VTb3VyY2UsXHJcbiAgdHlwZSBUaWNrZXRUcmFjZUVudHJ5LFxyXG4gIHR5cGUgVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncyxcclxufSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzXCI7XHJcbmltcG9ydCB7IG9wdGltaXplVGlja2V0SW1hZ2VGb3JVcGxvYWQsIHR5cGUgVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQgfSBmcm9tIFwiLi90aWNrZXRJbWFnZU9wdGltaXphdGlvbi50c1wiO1xyXG5cclxudHlwZSBRdWlja0NyZWF0ZVBhcnRpYWxUaWNrZXRTdGF0ZSA9IHtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBsaW5rZWRUb1NoZWV0OiBib29sZWFuO1xyXG4gIGNvbXBsZXRlZFN0YWdlOiBzdHJpbmc7XHJcbiAgdXJsRmlsZTogc3RyaW5nO1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbiAgcHJvY2Vzc2VkQnlBSTogYm9vbGVhbiB8IG51bGw7XHJcbn07XHJcblxyXG50eXBlIFF1aWNrVGlja2V0QXR0ZW1wdENvbnRleHQgPSB7XHJcbiAgYXR0ZW1wdElkOiBzdHJpbmc7XHJcbiAgc291cmNlOiBUaWNrZXRJbWFnZVNvdXJjZTtcclxuICBzdGFydGVkQXQ6IG51bWJlcjtcclxuICBvcHRpbWl6YXRpb246IFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0O1xyXG59O1xyXG5cclxudHlwZSBRdWlja1RpY2tldFByb2dyZXNzU3RhZ2UgPSB7XHJcbiAga2V5OiBRdWlja0Zsb3dQcm9ncmVzc0tleTtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgc3RhdGU6IFwiY29tcGxldGVkXCIgfCBcImFjdGl2ZVwiIHwgXCJwZW5kaW5nXCI7XHJcbn07XHJcblxyXG5jb25zdCBRVUlDS19USUNLRVRfRkxPV19MT0dfUFJFRklYID0gXCJbZXhwZW5zZS1xdWljay10aWNrZXRdXCI7XHJcbmNvbnN0IFFVSUNLX1RJQ0tFVF9WSVNVQUxfU1RBR0VfTVMgPSB7XHJcbiAgc3luY2luZ0ZpbGU6IDEyMDAsXHJcbiAgZmluYWxpemluZ0lhOiAzNjAwLFxyXG4gIGxpbmtpbmdFeHBlbnNlTGluZTogODUwMCxcclxufSBhcyBjb25zdDtcclxuXHJcbmNvbnN0IGxvZ1F1aWNrVGlja2V0SW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuaW5mbyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmluZm8oUVVJQ0tfVElDS0VUX0ZMT1dfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nUXVpY2tUaWNrZXRXYXJuID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS53YXJuID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIGNvbnNvbGUud2FybihRVUlDS19USUNLRVRfRkxPV19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBsb2dRdWlja1RpY2tldEVycm9yID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xyXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFFVSUNLX1RJQ0tFVF9GTE9XX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdEZpbGVTaXplID0gKHNpemU6IG51bWJlcik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCEoc2l6ZSA+IDApKSByZXR1cm4gXCIwIEJcIjtcclxuICBpZiAoc2l6ZSA+PSAxMDI0ICogMTAyNCkgcmV0dXJuIGAkeyhzaXplIC8gKDEwMjQgKiAxMDI0KSkudG9GaXhlZCgyKX0gTUJgO1xyXG4gIGlmIChzaXplID49IDEwMjQpIHJldHVybiBgJHsoc2l6ZSAvIDEwMjQpLnRvRml4ZWQoMSl9IEtCYDtcclxuICByZXR1cm4gYCR7c2l6ZX0gQmA7XHJcbn07XHJcblxyXG5jb25zdCBidWlsZEZpbGVMb2dEYXRhID0gKGZpbGU6IEZpbGUpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgbmFtZTogc2FmZVRleHQoZmlsZS5uYW1lKSxcclxuICAgIHR5cGU6IHNhZmVUZXh0KGZpbGUudHlwZSksXHJcbiAgICBzaXplQnl0ZXM6IE51bWJlcihmaWxlLnNpemUgfHwgMCksXHJcbiAgICBzaXplVGV4dDogZm9ybWF0RmlsZVNpemUoTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSksXHJcbiAgICBsYXN0TW9kaWZpZWQ6IE51bWJlcihmaWxlLmxhc3RNb2RpZmllZCB8fCAwKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGYWxsYmFja09wdGltaXphdGlvblJlc3VsdCA9IChmaWxlOiBGaWxlKTogVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQgPT4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBmaWxlLFxyXG4gICAgY2hhbmdlZDogZmFsc2UsXHJcbiAgICByZWFzb246IFwib3B0aW1pemF0aW9uLWVycm9yXCIsXHJcbiAgICByZXNpemVkOiBmYWxzZSxcclxuICAgIHJlZW5jb2RlZDogZmFsc2UsXHJcbiAgICBlbGFwc2VkTXM6IDAsXHJcbiAgICBvcmlnaW5hbDoge1xyXG4gICAgICBuYW1lOiBzYWZlVGV4dChmaWxlLm5hbWUpLFxyXG4gICAgICB0eXBlOiBzYWZlVGV4dChmaWxlLnR5cGUpLFxyXG4gICAgICBzaXplOiBOdW1iZXIoZmlsZS5zaXplIHx8IDApLFxyXG4gICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgaGVpZ2h0OiBudWxsLFxyXG4gICAgfSxcclxuICAgIG91dHB1dDoge1xyXG4gICAgICBuYW1lOiBzYWZlVGV4dChmaWxlLm5hbWUpLFxyXG4gICAgICB0eXBlOiBzYWZlVGV4dChmaWxlLnR5cGUpLFxyXG4gICAgICBzaXplOiBOdW1iZXIoZmlsZS5zaXplIHx8IDApLFxyXG4gICAgICB3aWR0aDogbnVsbCxcclxuICAgICAgaGVpZ2h0OiBudWxsLFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhID0gKHJlc3VsdDogVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQpID0+IHtcclxuICBjb25zdCBzYXZlZEJ5dGVzID0gTWF0aC5tYXgoMCwgcmVzdWx0Lm9yaWdpbmFsLnNpemUgLSByZXN1bHQub3V0cHV0LnNpemUpO1xyXG4gIGNvbnN0IHNhdmVkUmF0aW8gPSByZXN1bHQub3JpZ2luYWwuc2l6ZSA+IDAgPyBzYXZlZEJ5dGVzIC8gcmVzdWx0Lm9yaWdpbmFsLnNpemUgOiAwO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgY2hhbmdlZDogcmVzdWx0LmNoYW5nZWQsXHJcbiAgICByZWFzb246IHJlc3VsdC5yZWFzb24sXHJcbiAgICByZXNpemVkOiByZXN1bHQucmVzaXplZCxcclxuICAgIHJlZW5jb2RlZDogcmVzdWx0LnJlZW5jb2RlZCxcclxuICAgIGVsYXBzZWRNczogcmVzdWx0LmVsYXBzZWRNcyxcclxuICAgIG9yaWdpbmFsOiB7XHJcbiAgICAgIC4uLnJlc3VsdC5vcmlnaW5hbCxcclxuICAgICAgc2l6ZVRleHQ6IGZvcm1hdEZpbGVTaXplKHJlc3VsdC5vcmlnaW5hbC5zaXplKSxcclxuICAgIH0sXHJcbiAgICBvdXRwdXQ6IHtcclxuICAgICAgLi4ucmVzdWx0Lm91dHB1dCxcclxuICAgICAgc2l6ZVRleHQ6IGZvcm1hdEZpbGVTaXplKHJlc3VsdC5vdXRwdXQuc2l6ZSksXHJcbiAgICB9LFxyXG4gICAgc2F2ZWRCeXRlcyxcclxuICAgIHNhdmVkVGV4dDogZm9ybWF0RmlsZVNpemUoc2F2ZWRCeXRlcyksXHJcbiAgICBzYXZlZFJhdGlvOiBOdW1iZXIoc2F2ZWRSYXRpby50b0ZpeGVkKDQpKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0VmFsaWRhdGlvbkVycm9ycyA9IChcclxuICBlcnJvcnM6IEFycmF5PHsgRmllbGQ/OiB1bmtub3duOyBNZXNzYWdlPzogdW5rbm93biB9IHwgbnVsbCB8IHVuZGVmaW5lZD4gfCBudWxsIHwgdW5kZWZpbmVkXHJcbik6IHN0cmluZyA9PiB7XHJcbiAgaWYgKCFBcnJheS5pc0FycmF5KGVycm9ycykgfHwgZXJyb3JzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwiXCI7XHJcblxyXG4gIHJldHVybiBlcnJvcnNcclxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZpZWxkID0gc2FmZVRleHQoZW50cnk/LkZpZWxkKTtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IHNhZmVUZXh0KGVudHJ5Py5NZXNzYWdlKTtcclxuICAgICAgaWYgKGZpZWxkICYmIG1lc3NhZ2UpIHJldHVybiBgJHtmaWVsZH06ICR7bWVzc2FnZX1gO1xyXG4gICAgICByZXR1cm4gbWVzc2FnZSB8fCBmaWVsZDtcclxuICAgIH0pXHJcbiAgICAuZmlsdGVyKEJvb2xlYW4pXHJcbiAgICAuam9pbihcIiB8IFwiKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3cgPSAoe1xyXG4gIHNoZWV0SWQgPSBcIlwiLFxyXG4gIHByb2plY3RJZCA9IFwiXCIsXHJcbiAgY3VycmVuY3lDb2RlID0gXCJcIixcclxuICBheFVzZXJJZE92ZXJyaWRlID0gXCJcIixcclxuICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gIGlzQ3JlYXRlTW9kZSxcclxuICBpc1NoZWV0TG9ja2VkLFxyXG4gIGxpbmtUb1NoZWV0ID0gdHJ1ZSxcclxuICBvbkZvcmJpZGRlbixcclxuICBvbkNvbXBsZXRlZCxcclxufTogVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncykgPT4ge1xyXG4gIGNvbnN0IFtzb3VyY2VQaWNrZXJPcGVuLCBzZXRTb3VyY2VQaWNrZXJPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbYnVzeSwgc2V0QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3Byb2dyZXNzS2V5LCBzZXRQcm9ncmVzc0tleV0gPSB1c2VTdGF0ZTxRdWlja0Zsb3dQcm9ncmVzc0tleSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtkaXNwbGF5UHJvZ3Jlc3NLZXksIHNldERpc3BsYXlQcm9ncmVzc0tleV0gPSB1c2VTdGF0ZTxRdWlja0Zsb3dQcm9ncmVzc0tleSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtwcm9ncmVzc0VsYXBzZWRNcywgc2V0UHJvZ3Jlc3NFbGFwc2VkTXNdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFthdHRlbXB0SWQsIHNldEF0dGVtcHRJZF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbdHJhY2VMaXN0LCBzZXRUcmFjZUxpc3RdID0gdXNlU3RhdGU8VGlja2V0VHJhY2VFbnRyeVtdPihbXSk7XHJcbiAgY29uc3QgW3BhcnRpYWxUaWNrZXRGYWlsdXJlLCBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZV0gPSB1c2VTdGF0ZTxRdWlja0NyZWF0ZVBhcnRpYWxUaWNrZXRTdGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGxhdGVzdEZpbGVSZWYgPSB1c2VSZWY8eyBjYWNoZUtleTogc3RyaW5nOyBmaWxlOiBGaWxlIH0gfCBudWxsPihudWxsKTtcclxuICBjb25zdCBsYXRlc3RDcmVhdGVkVGlja2V0UmVmID0gdXNlUmVmPFF1aWNrQ3JlYXRlUGFydGlhbFRpY2tldFN0YXRlIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJvZ3Jlc3NTdGFydGVkQXRSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IHByb2dyZXNzTWVzc2FnZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPSBkaXNwbGF5UHJvZ3Jlc3NLZXkgfHwgcHJvZ3Jlc3NLZXk7XHJcbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwidXBsb2FkaW5nSW1hZ2VcIikge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19VcGxvYWRpbmdJbWFnZVwiLCBcIlVwbG9hZGluZyBpbWFnZS4uLlwiKTtcclxuICAgIH1cclxuICAgIGlmIChlZmZlY3RpdmVQcm9ncmVzc0tleSA9PT0gXCJjcmVhdGluZ1RpY2tldFwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0NyZWF0aW5nVGlja2V0XCIsIFwiQ3JlYXRpbmcgdGlja2V0Li4uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcInN5bmNpbmdGaWxlXCIpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfU3luY2luZ0ZpbGVcIiwgXCJTeW5jaW5nIGZpbGUuLi5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwiZmluYWxpemluZ0lhXCIpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRmluYWxpemluZ1wiLCBcIkZpbmFsaXppbmcgSUEuLi5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwibGlua2luZ0V4cGVuc2VMaW5lXCIpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfTGlua2luZ0xpbmVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZS4uLlwiKTtcclxuICAgIH1cclxuICAgIGlmIChlZmZlY3RpdmVQcm9ncmVzc0tleSA9PT0gXCJkb25lXCIpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRG9uZVwiLCBcIkRvbmVcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9LCBbZGlzcGxheVByb2dyZXNzS2V5LCBwcm9ncmVzc0tleV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5IHx8IHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPT09IG51bGwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBzeW5jRWxhcHNlZCA9ICgpID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnRlZEF0ID0gcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudDtcclxuICAgICAgaWYgKHN0YXJ0ZWRBdCA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcyhNYXRoLm1heCgwLCBEYXRlLm5vdygpIC0gc3RhcnRlZEF0KSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHN5bmNFbGFwc2VkKCk7XHJcbiAgICBjb25zdCBpbnRlcnZhbElkID0gd2luZG93LnNldEludGVydmFsKHN5bmNFbGFwc2VkLCAyNTApO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XHJcbiAgICB9O1xyXG4gIH0sIFtidXN5XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWJ1c3kpIHtcclxuICAgICAgaWYgKHByb2dyZXNzS2V5ICE9PSBudWxsKSB7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KHByb2dyZXNzS2V5KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBudWxsIHx8IHByb2dyZXNzS2V5ID09PSBcInVwbG9hZGluZ0ltYWdlXCIgfHwgcHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiKSB7XHJcbiAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShwcm9ncmVzc0tleSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkocHJvZ3Jlc3NLZXkpO1xyXG4gICAgaWYgKHByb2dyZXNzS2V5ICE9PSBcImNyZWF0aW5nVGlja2V0XCIpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRpbWVyczogbnVtYmVyW10gPSBbXHJcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJzeW5jaW5nRmlsZVwiKTtcclxuICAgICAgfSwgUVVJQ0tfVElDS0VUX1ZJU1VBTF9TVEFHRV9NUy5zeW5jaW5nRmlsZSksXHJcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJmaW5hbGl6aW5nSWFcIik7XHJcbiAgICAgIH0sIFFVSUNLX1RJQ0tFVF9WSVNVQUxfU1RBR0VfTVMuZmluYWxpemluZ0lhKSxcclxuICAgIF07XHJcblxyXG4gICAgaWYgKGxpbmtUb1NoZWV0KSB7XHJcbiAgICAgIHRpbWVycy5wdXNoKFxyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShcImxpbmtpbmdFeHBlbnNlTGluZVwiKTtcclxuICAgICAgICB9LCBRVUlDS19USUNLRVRfVklTVUFMX1NUQUdFX01TLmxpbmtpbmdFeHBlbnNlTGluZSlcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB0aW1lcnMuZm9yRWFjaCgodGltZXJJZCkgPT4gd2luZG93LmNsZWFyVGltZW91dCh0aW1lcklkKSk7XHJcbiAgICB9O1xyXG4gIH0sIFtidXN5LCBsaW5rVG9TaGVldCwgcHJvZ3Jlc3NLZXldKTtcclxuXHJcbiAgY29uc3QgcHJvZ3Jlc3NTdGFnZXMgPSB1c2VNZW1vPFF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZVtdPigoKSA9PiB7XHJcbiAgICBjb25zdCB2aXNpYmxlU3RhZ2VzOiBRdWlja0Zsb3dQcm9ncmVzc0tleVtdID0gbGlua1RvU2hlZXRcclxuICAgICAgPyBbXCJ1cGxvYWRpbmdJbWFnZVwiLCBcImNyZWF0aW5nVGlja2V0XCIsIFwic3luY2luZ0ZpbGVcIiwgXCJmaW5hbGl6aW5nSWFcIiwgXCJsaW5raW5nRXhwZW5zZUxpbmVcIl1cclxuICAgICAgOiBbXCJ1cGxvYWRpbmdJbWFnZVwiLCBcImNyZWF0aW5nVGlja2V0XCIsIFwic3luY2luZ0ZpbGVcIiwgXCJmaW5hbGl6aW5nSWFcIl07XHJcblxyXG4gICAgY29uc3Qgc3RhZ2VDb3B5OiBSZWNvcmQ8UXVpY2tGbG93UHJvZ3Jlc3NLZXksIHsgdGl0bGU6IHN0cmluZzsgZGVzY3JpcHRpb246IHN0cmluZyB9PiA9IHtcclxuICAgICAgdXBsb2FkaW5nSW1hZ2U6IHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1ByZXBhcmVfVGl0bGVcIiwgXCJQcmVwYXJpbmcgaW1hZ2VcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1ByZXBhcmVfQm9keVwiLFxyXG4gICAgICAgICAgXCJXZSB2YWxpZGF0ZSB0aGUgaW1hZ2UgYW5kIHByZXBhcmUgaXQgZm9yIGEgcmVsaWFibGUgdXBsb2FkLlwiXHJcbiAgICAgICAgKSxcclxuICAgICAgfSxcclxuICAgICAgY3JlYXRpbmdUaWNrZXQ6IHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0NyZWF0ZV9UaXRsZVwiLCBcIkNyZWF0aW5nIHRpY2tldFwiKSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogaW5kVChcclxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfQ3JlYXRlX0JvZHlcIixcclxuICAgICAgICAgIFwiVGhlIGJhY2tlbmQgcmVzZXJ2ZXMgdGhlIHRpY2tldCBhbmQgc3RhcnRzIHRoZSBzZXJ2ZXItc2lkZSBmbG93LlwiXHJcbiAgICAgICAgKSxcclxuICAgICAgfSxcclxuICAgICAgc3luY2luZ0ZpbGU6IHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0ZpbGVfVGl0bGVcIiwgXCJTeW5jaW5nIGZpbGVcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0ZpbGVfQm9keVwiLFxyXG4gICAgICAgICAgXCJUaGUgdXBsb2FkZWQgaW1hZ2UgaXMgYmVpbmcgYXR0YWNoZWQgdG8gdGhlIHRpY2tldCByZWNvcmQuXCJcclxuICAgICAgICApLFxyXG4gICAgICB9LFxyXG4gICAgICBmaW5hbGl6aW5nSWE6IHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0lhX1RpdGxlXCIsIFwiUmVhZGluZyB0aWNrZXQgZGF0YVwiKSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogaW5kVChcclxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfSWFfQm9keVwiLFxyXG4gICAgICAgICAgXCJXZSBhcmUgZXh0cmFjdGluZyBkYXRlLCBhbW91bnQgYW5kIGRlc2NyaXB0aW9uIGZyb20gdGhlIGltYWdlLlwiXHJcbiAgICAgICAgKSxcclxuICAgICAgfSxcclxuICAgICAgbGlua2luZ0V4cGVuc2VMaW5lOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19MaW5rX1RpdGxlXCIsIFwiTGlua2luZyBleHBlbnNlIGxpbmVcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0xpbmtfQm9keVwiLFxyXG4gICAgICAgICAgXCJUaGUgZ2VuZXJhdGVkIHRpY2tldCBpcyBiZWluZyBjb25uZWN0ZWQgdG8gdGhlIGN1cnJlbnQgZXhwZW5zZSBzaGVldC5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIGRvbmU6IHtcclxuICAgICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19Eb25lXCIsIFwiRG9uZVwiKSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19Eb25lXCIsIFwiRG9uZVwiKSxcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgYWN0aXZlU3RhZ2VLZXkgPVxyXG4gICAgICBwcm9ncmVzc0tleSA9PT0gXCJkb25lXCIgPyB2aXNpYmxlU3RhZ2VzW3Zpc2libGVTdGFnZXMubGVuZ3RoIC0gMV0gOiBkaXNwbGF5UHJvZ3Jlc3NLZXkgfHwgcHJvZ3Jlc3NLZXk7XHJcbiAgICBjb25zdCBhY3RpdmVTdGFnZUluZGV4ID0gYWN0aXZlU3RhZ2VLZXkgPyB2aXNpYmxlU3RhZ2VzLmluZGV4T2YoYWN0aXZlU3RhZ2VLZXkpIDogLTE7XHJcblxyXG4gICAgcmV0dXJuIHZpc2libGVTdGFnZXMubWFwKChzdGFnZUtleSwgaW5kZXgpID0+ICh7XHJcbiAgICAgIGtleTogc3RhZ2VLZXksXHJcbiAgICAgIHRpdGxlOiBzdGFnZUNvcHlbc3RhZ2VLZXldLnRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogc3RhZ2VDb3B5W3N0YWdlS2V5XS5kZXNjcmlwdGlvbixcclxuICAgICAgc3RhdGU6XHJcbiAgICAgICAgcHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiIHx8IChhY3RpdmVTdGFnZUluZGV4ID49IDAgJiYgaW5kZXggPCBhY3RpdmVTdGFnZUluZGV4KVxyXG4gICAgICAgICAgPyBcImNvbXBsZXRlZFwiXHJcbiAgICAgICAgICA6IGluZGV4ID09PSBhY3RpdmVTdGFnZUluZGV4XHJcbiAgICAgICAgICAgID8gXCJhY3RpdmVcIlxyXG4gICAgICAgICAgICA6IFwicGVuZGluZ1wiLFxyXG4gICAgfSkpO1xyXG4gIH0sIFtkaXNwbGF5UHJvZ3Jlc3NLZXksIGxpbmtUb1NoZWV0LCBwcm9ncmVzc0tleV0pO1xyXG5cclxuICBjb25zdCBhZGRUcmFjZSA9IHVzZUNhbGxiYWNrKChzdGVwOiBzdHJpbmcsIHRyYWNlSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3Qgc2FmZVRyYWNlSWQgPSBzYWZlVGV4dCh0cmFjZUlkKTtcclxuICAgIGlmICghc2FmZVRyYWNlSWQpIHJldHVybjtcclxuXHJcbiAgICBzZXRUcmFjZUxpc3QoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5leHQgPSBbXHJcbiAgICAgICAgLi4ucHJldmlvdXMsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgc3RlcCxcclxuICAgICAgICAgIHRyYWNlSWQ6IHNhZmVUcmFjZUlkLFxyXG4gICAgICAgICAgYXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcclxuICAgICAgICB9LFxyXG4gICAgICBdO1xyXG4gICAgICBwZXJzaXN0VHJhY2VMaXN0KG5leHQpO1xyXG4gICAgICByZXR1cm4gbmV4dDtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjYWNoZUtleSA9IGxhdGVzdEZpbGVSZWYuY3VycmVudD8uY2FjaGVLZXk7XHJcbiAgICBpZiAoIWNhY2hlS2V5KSByZXR1cm47XHJcbiAgICB2b2lkIHJlbW92ZUNhY2hlZEltYWdlRmlsZShjYWNoZUtleSkuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAvLyBJZ25vcmUgY2FjaGUgY2xlYW51cCBmYWlsdXJlcyBpbiByZXN0cmljdGVkIGJyb3dzZXIgY29udGV4dHMuXHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyRmxvd1N0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgbGF0ZXN0Q3JlYXRlZFRpY2tldFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgc2V0VHJhY2VMaXN0KFtdKTtcclxuICAgIHBlcnNpc3RUcmFjZUxpc3QoW10pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgYnVpbGRBcGlPcHRpb25zID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZUF4VXNlcklkID0gc2FmZVRleHQoYXhVc2VySWRPdmVycmlkZSk7XHJcbiAgICBpZiAoIXNhZmVBeFVzZXJJZCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJYLUlORC1BeFVzZXJJZFwiOiBzYWZlQXhVc2VySWQsXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG4gIH0sIFtheFVzZXJJZE92ZXJyaWRlXSk7XHJcblxyXG4gIGNvbnN0IGVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbiA9IHVzZUNhbGxiYWNrKCgpOiBib29sZWFuID0+IHtcclxuICAgIGlmICghY2FuQ3JlYXRlRXhwZW5zZSB8fCBpc0NyZWF0ZU1vZGUgfHwgaXNTaGVldExvY2tlZCB8fCAobGlua1RvU2hlZXQgJiYgIXNoZWV0SWQpKSB7XHJcbiAgICAgIG9uRm9yYmlkZGVuKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzU2hlZXRMb2NrZWQsIGxpbmtUb1NoZWV0LCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xyXG5cclxuICBjb25zdCByZXNvbHZlVWlFcnJvck1lc3NhZ2UgPSB1c2VDYWxsYmFjaygoZXJyb3I6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xyXG4gICAgICBjb25zdCB2YWxpZGF0aW9uVGV4dCA9IGZvcm1hdFZhbGlkYXRpb25FcnJvcnMoZXJyb3IudmFsaWRhdGlvbkVycm9ycyk7XHJcbiAgICAgIGlmICh2YWxpZGF0aW9uVGV4dCkge1xyXG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uVGV4dDtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDI5KSB7XHJcbiAgICAgICAgcmV0dXJuIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9SYXRlTGltaXRcIiwgXCJUb28gbWFueSByZXF1ZXN0cy5cIik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob3RGb3VuZFwiLCBcIlJlY29yZCBub3QgZm91bmQuXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDUwMCkge1xyXG4gICAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfU2VydmVyXCIsIFwiU2VydmVyIGVycm9yLlwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcclxuICAgICAgOiBpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBhZGRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhY2VzID0gdXNlQ2FsbGJhY2soXHJcbiAgICAocmVzcG9uc2U6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0KSA9PiB7XHJcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LXF1aWNrLWNyZWF0ZVwiLCBzYWZlVGV4dChyZXNwb25zZS5UcmFjZUlkKSk7XHJcblxyXG4gICAgICBjb25zdCBzdGVwVHJhY2VJZHMgPSByZXNwb25zZS5EYXRhPy5TdGVwVHJhY2VJZHM7XHJcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LWNyZWF0ZVwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LlRpY2tldENyZWF0ZSkpO1xyXG4gICAgICBhZGRUcmFjZShcInRpY2tldC1maWxlLXVwbG9hZFwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LkZpbGVVcGxvYWQpKTtcclxuICAgICAgYWRkVHJhY2UoXCJleHBlbnNlZnJvbXRpY2tldFwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LkRyYWZ0RXh0cmFjdCkpO1xyXG4gICAgICBhZGRUcmFjZShcInRpY2tldC1maW5hbGl6ZVwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LlRpY2tldEZpbmFsaXplKSk7XHJcbiAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZS1zaGVldC1saW5rXCIsIHNhZmVUZXh0KHN0ZXBUcmFjZUlkcz8uU2hlZXRMaW5rKSk7XHJcbiAgICB9LFxyXG4gICAgW2FkZFRyYWNlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlc29sdmVRdWlja0NyZWF0ZUZhaWx1cmVNZXNzYWdlID0gdXNlQ2FsbGJhY2soKHJlc3BvbnNlOiBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCk6IHN0cmluZyA9PiB7XHJcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuRGF0YTtcclxuICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGRhdGE/LkZpbGVJZCk7XHJcbiAgICBjb25zdCBjb21wbGV0ZWRTdGFnZSA9IHNhZmVUZXh0KGRhdGE/LkNvbXBsZXRlZFN0YWdlKTtcclxuICAgIGNvbnN0IHJlc3BvbnNlTWVzc2FnZSA9IHNhZmVUZXh0KHJlc3BvbnNlLk1lc3NhZ2UpO1xyXG4gICAgY29uc3QgdmFsaWRhdGlvblRleHQgPSBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzKHJlc3BvbnNlLkVycm9ycyk7XHJcbiAgICBjb25zdCByZXRyeUFmdGVyID0gc2FmZVRleHQocmVzcG9uc2UuUmV0cnlBZnRlcik7XHJcbiAgICBjb25zdCBtZXNzYWdlUGFydHM6IHN0cmluZ1tdID0gW107XHJcblxyXG4gICAgaWYgKHJlc3BvbnNlLkh0dHBTdGF0dXMgPT09IDQyOSkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChyZXNwb25zZU1lc3NhZ2UgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1JhdGVMaW1pdFwiLCBcIlRvbyBtYW55IHJlcXVlc3RzLlwiKSk7XHJcbiAgICAgIGlmIChyZXRyeUFmdGVyKSB7XHJcbiAgICAgICAgbWVzc2FnZVBhcnRzLnB1c2goXHJcbiAgICAgICAgICBpbmRGb3JtYXQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9SZXRyeUFmdGVySGludFwiLCBcIlJldHJ5IGFmdGVyIHswfS5cIiwgcmV0cnlBZnRlcilcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHZhbGlkYXRpb25UZXh0KSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKHZhbGlkYXRpb25UZXh0KTtcclxuICAgIH0gZWxzZSBpZiAocmVzcG9uc2VNZXNzYWdlKSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKHJlc3BvbnNlTWVzc2FnZSk7XHJcbiAgICB9IGVsc2UgaWYgKGZpbGVJZCkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChcclxuICAgICAgICBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9QYXJ0aWFsXCIsXHJcbiAgICAgICAgICBcIlRoZSB0aWNrZXQgd2FzIGNyZWF0ZWQsIGJ1dCB0aGUgZnVsbCBwcm9jZXNzIGRpZCBub3QgZmluaXNoLlwiXHJcbiAgICAgICAgKVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA0MDQpIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX05vdEZvdW5kXCIsIFwiUmVjb3JkIG5vdCBmb3VuZC5cIikpO1xyXG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA1MDApIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1NlcnZlclwiLCBcIlNlcnZlciBlcnJvci5cIikpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZmlsZUlkICYmIGNvbXBsZXRlZFN0YWdlKSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZEZvcm1hdChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1N0YWdlXCIsIFwiQ29tcGxldGVkIHN0YWdlOiB7MH0uXCIsIGNvbXBsZXRlZFN0YWdlKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lc3NhZ2VQYXJ0cy5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjb21wbGV0ZUZsb3dTdWNjZXNzID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAoZmlsZUlkOiBzdHJpbmcsIGxpbmtlZFRvU2hlZXQ6IGJvb2xlYW4sIGNhY2hlS2V5OiBzdHJpbmcpID0+IHtcclxuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJkb25lXCIpO1xyXG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJkb25lXCIpO1xyXG4gICAgICBhd2FpdCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpO1xyXG4gICAgICBzZXRBdHRlbXB0SWQoXCJcIik7XHJcbiAgICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva1Byb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xyXG4gICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgIG9uQ29tcGxldGVkPy4oeyBmaWxlSWQsIGxpbmtlZFRvU2hlZXQgfSk7XHJcbiAgICB9LFxyXG4gICAgW29uQ29tcGxldGVkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJ1blF1aWNrQ3JlYXRlRmxvdyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUsIGNhY2hlS2V5OiBzdHJpbmcsIGNvbnRleHQ6IFF1aWNrVGlja2V0QXR0ZW1wdENvbnRleHQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICAgICAgc2V0QnVzeSh0cnVlKTtcclxuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJjcmVhdGluZ1RpY2tldFwiKTtcclxuICAgICAgY2xlYXJGbG93U3RhdGUoKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlcXVlc3RTdGFydGVkQXQgPSBEYXRlLm5vdygpO1xyXG4gICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJxdWljay1jcmVhdGUucmVxdWVzdC5zdGFydGVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxyXG4gICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXHJcbiAgICAgICAgbGlua1RvU2hlZXQsXHJcbiAgICAgICAgY2FjaGVLZXksXHJcbiAgICAgICAgZWxhcHNlZFNpbmNlU2VsZWN0aW9uTXM6IE1hdGgubWF4KDAsIHJlcXVlc3RTdGFydGVkQXQgLSBjb250ZXh0LnN0YXJ0ZWRBdCksXHJcbiAgICAgICAgdXBsb2FkRmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcclxuICAgICAgICBvcHRpbWl6YXRpb246IGJ1aWxkT3B0aW1pemF0aW9uTG9nRGF0YShjb250ZXh0Lm9wdGltaXphdGlvbiksXHJcbiAgICAgICAgc2hlZXRJZDogbGlua1RvU2hlZXQgPyBzYWZlVGV4dChzaGVldElkKSA6IFwiXCIsXHJcbiAgICAgICAgcHJvamVjdElkOiBsaW5rVG9TaGVldCA/IHNhZmVUZXh0KHByb2plY3RJZCkgOiBcIlwiLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayhcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGlja2V0SW1hZ2U6IGZpbGUsXHJcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgZXhpc3RpbmdIb2phR2FzdG9zSWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQoc2hlZXRJZCkgfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgICBwcm9qZWN0SWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQocHJvamVjdElkKSB8fCB1bmRlZmluZWQgOiB1bmRlZmluZWQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgYnVpbGRBcGlPcHRpb25zKClcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBhZGRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhY2VzKHJlc3BvbnNlKTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzcG9uc2VFbGFwc2VkTXMgPSBNYXRoLm1heCgwLCBEYXRlLm5vdygpIC0gcmVxdWVzdFN0YXJ0ZWRBdCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LkZpbGVJZCk7XHJcbiAgICAgICAgY29uc3QgbGlua2VkVG9TaGVldCA9IHJlc3BvbnNlLkRhdGE/LkxpbmtlZFRvU2hlZXQgPT09IHRydWU7XHJcbiAgICAgICAgY29uc3QgcGFydGlhbFN0YXRlID1cclxuICAgICAgICAgIGZpbGVJZFxyXG4gICAgICAgICAgICA/IHtcclxuICAgICAgICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgICAgICAgIGxpbmtlZFRvU2hlZXQsXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uQ29tcGxldGVkU3RhZ2UpLFxyXG4gICAgICAgICAgICAgICAgdXJsRmlsZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uVXJsRmlsZSksXHJcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uRmlsZU5hbWUpLFxyXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcmVzcG9uc2UuRGF0YT8uUHJvY2Vzc2VkQnlBSSA/PyBudWxsLFxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgOiBudWxsO1xyXG5cclxuICAgICAgICBpZiAocGFydGlhbFN0YXRlKSB7XHJcbiAgICAgICAgICBsYXRlc3RDcmVhdGVkVGlja2V0UmVmLmN1cnJlbnQgPSBwYXJ0aWFsU3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVzcG9uc2UuU3VjY2VzcyA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgaWYgKCFmaWxlSWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob0ZpbGVJZFwiLCBcIkNvdWxkIG5vdCByZXNvbHZlIHRpY2tldCBmaWxlIGlkLlwiKSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgYXdhaXQgY29tcGxldGVGbG93U3VjY2VzcyhmaWxlSWQsIGxpbmtlZFRvU2hlZXQsIGNhY2hlS2V5KTtcclxuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LnN1Y2NlZWRlZFwiLCB7XHJcbiAgICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXHJcbiAgICAgICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXHJcbiAgICAgICAgICAgIGVsYXBzZWRNczogcmVzcG9uc2VFbGFwc2VkTXMsXHJcbiAgICAgICAgICAgIGh0dHBTdGF0dXM6IHJlc3BvbnNlLkh0dHBTdGF0dXMsXHJcbiAgICAgICAgICAgIHRyYWNlSWQ6IHNhZmVUZXh0KHJlc3BvbnNlLlRyYWNlSWQpLFxyXG4gICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgIGxpbmtlZFRvU2hlZXQsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlZFN0YWdlOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5Db21wbGV0ZWRTdGFnZSksXHJcbiAgICAgICAgICAgIHByb2Nlc3NlZEJ5QUk6IHJlc3BvbnNlLkRhdGE/LlByb2Nlc3NlZEJ5QUkgPz8gbnVsbCxcclxuICAgICAgICAgICAgc3RlcFRyYWNlSWRzOiByZXNwb25zZS5EYXRhPy5TdGVwVHJhY2VJZHMgPz8gbnVsbCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcnRpYWxTdGF0ZSkge1xyXG4gICAgICAgICAgc2V0UGFydGlhbFRpY2tldEZhaWx1cmUocGFydGlhbFN0YXRlKTtcclxuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInF1aWNrLWNyZWF0ZS5wYXJ0aWFsLXN0YXRlXCIsIHtcclxuICAgICAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcclxuICAgICAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcclxuICAgICAgICAgICAgZWxhcHNlZE1zOiByZXNwb25zZUVsYXBzZWRNcyxcclxuICAgICAgICAgICAgZmlsZUlkOiBwYXJ0aWFsU3RhdGUuZmlsZUlkLFxyXG4gICAgICAgICAgICBsaW5rZWRUb1NoZWV0OiBwYXJ0aWFsU3RhdGUubGlua2VkVG9TaGVldCxcclxuICAgICAgICAgICAgY29tcGxldGVkU3RhZ2U6IHBhcnRpYWxTdGF0ZS5jb21wbGV0ZWRTdGFnZSxcclxuICAgICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcGFydGlhbFN0YXRlLnByb2Nlc3NlZEJ5QUksXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRNZXNzYWdlID0gcmVzb2x2ZVF1aWNrQ3JlYXRlRmFpbHVyZU1lc3NhZ2UocmVzcG9uc2UpO1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LmNvbXBsZXRlZC13aXRoLWVycm9yXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxyXG4gICAgICAgICAgZWxhcHNlZE1zOiByZXNwb25zZUVsYXBzZWRNcyxcclxuICAgICAgICAgIGh0dHBTdGF0dXM6IHJlc3BvbnNlLkh0dHBTdGF0dXMsXHJcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVGV4dChyZXNwb25zZS5UcmFjZUlkKSxcclxuICAgICAgICAgIGZpbGVJZCxcclxuICAgICAgICAgIGxpbmtlZFRvU2hlZXQsXHJcbiAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uQ29tcGxldGVkU3RhZ2UpLFxyXG4gICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcmVzcG9uc2UuRGF0YT8uUHJvY2Vzc2VkQnlBSSA/PyBudWxsLFxyXG4gICAgICAgICAgcmV0cnlBZnRlcjogc2FmZVRleHQocmVzcG9uc2UuUmV0cnlBZnRlciksXHJcbiAgICAgICAgICBtZXNzYWdlOiBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSxcclxuICAgICAgICAgIHJlc29sdmVkTWVzc2FnZSxcclxuICAgICAgICAgIGVycm9yczogQXJyYXkuaXNBcnJheShyZXNwb25zZS5FcnJvcnMpID8gcmVzcG9uc2UuRXJyb3JzIDogW10sXHJcbiAgICAgICAgICBzdGVwVHJhY2VJZHM6IHJlc3BvbnNlLkRhdGE/LlN0ZXBUcmFjZUlkcyA/PyBudWxsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNvbHZlZE1lc3NhZ2UpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcclxuICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LXF1aWNrLWNyZWF0ZS1lcnJvclwiLCBleHRyYWN0VHJhY2VJZEZyb21FcnJvcihlcnJvcikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRFcnJvcihcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LmZhaWxlZFwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcclxuICAgICAgICAgIGVsYXBzZWRNczogTWF0aC5tYXgoMCwgRGF0ZS5ub3coKSAtIHJlcXVlc3RTdGFydGVkQXQpLFxyXG4gICAgICAgICAgdXBsb2FkRmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcclxuICAgICAgICAgIHRyYWNlSWQ6IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGV4dHJhY3RUcmFjZUlkRnJvbUVycm9yKGVycm9yKSA6IFwiXCIsXHJcbiAgICAgICAgICBzdGF0dXM6IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLnN0YXR1cyA6IG51bGwsXHJcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgOiBcIlwiLFxyXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yczogZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yID8gZXJyb3IudmFsaWRhdGlvbkVycm9ycyA6IFtdLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVVaUVycm9yTWVzc2FnZShlcnJvcikpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW1xyXG4gICAgICBhZGRRdWlja0NyZWF0ZVJlc3BvbnNlVHJhY2VzLFxyXG4gICAgICBhZGRUcmFjZSxcclxuICAgICAgYnVpbGRBcGlPcHRpb25zLFxyXG4gICAgICBjbGVhckZsb3dTdGF0ZSxcclxuICAgICAgY29tcGxldGVGbG93U3VjY2VzcyxcclxuICAgICAgY3VycmVuY3lDb2RlLFxyXG4gICAgICBsaW5rVG9TaGVldCxcclxuICAgICAgcHJvamVjdElkLFxyXG4gICAgICByZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZSxcclxuICAgICAgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlLFxyXG4gICAgICBzaGVldElkLFxyXG4gICAgXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVNlbGVjdGVkRmlsZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUgfCBudWxsLCBzb3VyY2U6IFRpY2tldEltYWdlU291cmNlKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAgIGlmICghZmlsZSkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgYXR0ZW1wdElkID0gcmVzb2x2ZVJhbmRvbUtleSgpO1xyXG4gICAgICBjb25zdCBzZWxlY3Rpb25TdGFydGVkQXQgPSBEYXRlLm5vdygpO1xyXG4gICAgICBzZXRBdHRlbXB0SWQoYXR0ZW1wdElkKTtcclxuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwic2VsZWN0aW9uLnJlY2VpdmVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIGxpbmtUb1NoZWV0LFxyXG4gICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaWYgKCFlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24oKSkge1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5mb3JiaWRkZW5cIiwge1xyXG4gICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgbGlua1RvU2hlZXQsXHJcbiAgICAgICAgICBjYW5DcmVhdGVFeHBlbnNlLFxyXG4gICAgICAgICAgaXNDcmVhdGVNb2RlLFxyXG4gICAgICAgICAgaXNTaGVldExvY2tlZCxcclxuICAgICAgICAgIGhhc1NoZWV0SWQ6ICEhc2FmZVRleHQoc2hlZXRJZCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzYWZlVHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKHNhZmVUeXBlICYmICFzYWZlVHlwZS5zdGFydHNXaXRoKFwiaW1hZ2UvXCIpICYmICEvXFwuKGpwZT9nfHBuZ3x3ZWJwKSQvaS50ZXN0KGZpbGUubmFtZSB8fCBcIlwiKSkge1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5pbnZhbGlkLWZpbGUtdHlwZVwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxyXG4gICAgICAgICAgcmVhc29uOiBcIm1pbWUtYW5kLWV4dGVuc2lvbi1ub3Qtc3VwcG9ydGVkXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlVHlwZVwiLCBcIlVuc3VwcG9ydGVkIGltYWdlIGZvcm1hdC5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIWlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlKGZpbGUpKSB7XHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwic2VsZWN0aW9uLmludmFsaWQtZmlsZS10eXBlXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgICAgICByZWFzb246IFwidW5zdXBwb3J0ZWQtdGlja2V0LWltYWdlLWZpbGVcIixcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjbGVhckZsb3dTdGF0ZSgpO1xyXG4gICAgICBzZXRQcm9ncmVzc0tleShcInVwbG9hZGluZ0ltYWdlXCIpO1xyXG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJ1cGxvYWRpbmdJbWFnZVwiKTtcclxuICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IHNlbGVjdGlvblN0YXJ0ZWRBdDtcclxuICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcIm9wdGltaXphdGlvbi5zdGFydGVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3Qgb3B0aW1pemF0aW9uUmVzdWx0ID0gYXdhaXQgb3B0aW1pemVUaWNrZXRJbWFnZUZvclVwbG9hZChmaWxlKS5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJvcHRpbWl6YXRpb24uZmFpbGVkXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgOiBcIlwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBidWlsZEZhbGxiYWNrT3B0aW1pemF0aW9uUmVzdWx0KGZpbGUpO1xyXG4gICAgICB9KTtcclxuICAgICAgY29uc3QgdXBsb2FkRmlsZSA9IG9wdGltaXphdGlvblJlc3VsdC5maWxlO1xyXG4gICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJvcHRpbWl6YXRpb24uY29tcGxldGVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIC4uLmJ1aWxkT3B0aW1pemF0aW9uTG9nRGF0YShvcHRpbWl6YXRpb25SZXN1bHQpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICh1cGxvYWRGaWxlLnNpemUgPiBNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMpIHtcclxuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJzZWxlY3Rpb24ucmVqZWN0ZWQtYnktc2l6ZVwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBtYXhTaXplQnl0ZXM6IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyxcclxuICAgICAgICAgIG1heFNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMpLFxyXG4gICAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YSh1cGxvYWRGaWxlKSxcclxuICAgICAgICAgIG9wdGltaXphdGlvbjogYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhKG9wdGltaXphdGlvblJlc3VsdCksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHNldFByb2dyZXNzRWxhcHNlZE1zKDApO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfRmlsZVNpemVcIiwgXCJJbWFnZSBleGNlZWRzIDUwTUIgbWF4IHNpemUuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNhY2hlS2V5ID0gYXR0ZW1wdElkO1xyXG4gICAgICBsYXRlc3RGaWxlUmVmLmN1cnJlbnQgPSB7IGNhY2hlS2V5LCBmaWxlOiB1cGxvYWRGaWxlIH07XHJcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcImNhY2hlLnN0b3JlLnN0YXJ0ZWRcIiwge1xyXG4gICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgY2FjaGVLZXksXHJcbiAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YSh1cGxvYWRGaWxlKSxcclxuICAgICAgfSk7XHJcbiAgICAgIHZvaWQgY2FjaGVJbWFnZUZpbGUoY2FjaGVLZXksIHVwbG9hZEZpbGUpXHJcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwiY2FjaGUuc3RvcmUuY29tcGxldGVkXCIsIHtcclxuICAgICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICAgIGNhY2hlS2V5LFxyXG4gICAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKHVwbG9hZEZpbGUpLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJjYWNoZS5zdG9yZS5mYWlsZWRcIiwge1xyXG4gICAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgICAgY2FjaGVLZXksXHJcbiAgICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEodXBsb2FkRmlsZSksXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSA6IFwiXCIsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIGF3YWl0IHJ1blF1aWNrQ3JlYXRlRmxvdyh1cGxvYWRGaWxlLCBjYWNoZUtleSwge1xyXG4gICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgc3RhcnRlZEF0OiBzZWxlY3Rpb25TdGFydGVkQXQsXHJcbiAgICAgICAgb3B0aW1pemF0aW9uOiBvcHRpbWl6YXRpb25SZXN1bHQsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtjYW5DcmVhdGVFeHBlbnNlLCBjbGVhckZsb3dTdGF0ZSwgZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uLCBpc0NyZWF0ZU1vZGUsIGlzU2hlZXRMb2NrZWQsIGxpbmtUb1NoZWV0LCBydW5RdWlja0NyZWF0ZUZsb3csIHNoZWV0SWRdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgcmV0cnlQZW5kaW5nVXBsb2FkID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgb3BlbkNyZWF0ZWRUaWNrZXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjcmVhdGVkVGlja2V0ID0gcGFydGlhbFRpY2tldEZhaWx1cmUgfHwgbGF0ZXN0Q3JlYXRlZFRpY2tldFJlZi5jdXJyZW50O1xyXG4gICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoY3JlYXRlZFRpY2tldD8uZmlsZUlkKTtcclxuICAgIGlmICghZmlsZUlkKSByZXR1cm47XHJcblxyXG4gICAgY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2UoKTtcclxuICAgIHNldEF0dGVtcHRJZChcIlwiKTtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgb25Db21wbGV0ZWQ/Lih7IGZpbGVJZCwgbGlua2VkVG9TaGVldDogY3JlYXRlZFRpY2tldD8ubGlua2VkVG9TaGVldCA9PT0gdHJ1ZSB9KTtcclxuICB9LCBbY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2UsIG9uQ29tcGxldGVkLCBwYXJ0aWFsVGlja2V0RmFpbHVyZV0pO1xyXG5cclxuICBjb25zdCBvcGVuU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24oKSkgcmV0dXJuO1xyXG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgc2V0UGFydGlhbFRpY2tldEZhaWx1cmUobnVsbCk7XHJcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKHRydWUpO1xyXG4gIH0sIFtlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb25dKTtcclxuXHJcbiAgY29uc3QgY2xvc2VTb3VyY2VQaWNrZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoYnVzeSkgcmV0dXJuO1xyXG4gICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XHJcbiAgfSwgW2J1c3ldKTtcclxuXHJcbiAgY29uc3QgcmVxdWVzdENhbWVyYVBlcm1pc3Npb24gPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxib29sZWFuIHwgbnVsbD4gPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBudWxsO1xyXG4gICAgY29uc3QgbWVkaWFEZXZpY2VzID0gbmF2aWdhdG9yLm1lZGlhRGV2aWNlcztcclxuICAgIGlmICghbWVkaWFEZXZpY2VzIHx8IHR5cGVvZiBtZWRpYURldmljZXMuZ2V0VXNlck1lZGlhICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xyXG4gICAgICAgIHZpZGVvOiB7IGZhY2luZ01vZGU6IFwiZW52aXJvbm1lbnRcIiB9LFxyXG4gICAgICB9KTtcclxuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB0cmFjay5zdG9wKCkpO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBzZWxlY3RGcm9tQ2FtZXJhID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gICAgICBpZiAoIWlucHV0RWxlbWVudCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBncmFudGVkID0gYXdhaXQgcmVxdWVzdENhbWVyYVBlcm1pc3Npb24oKTtcclxuICAgICAgaWYgKGdyYW50ZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9DYW1lcmFQZXJtaXNzaW9uXCIsIFwiQ2FtZXJhIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XHJcbiAgICAgIGlucHV0RWxlbWVudC5jbGljaygpO1xyXG4gICAgfSxcclxuICAgIFtyZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbl1cclxuICApO1xyXG5cclxuICBjb25zdCBzZWxlY3RGcm9tR2FsbGVyeSA9IHVzZUNhbGxiYWNrKChpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsKSA9PiB7XHJcbiAgICBpZiAoIWlucHV0RWxlbWVudCkgcmV0dXJuO1xyXG4gICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XHJcbiAgICBpbnB1dEVsZW1lbnQuY2xpY2soKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyRXJyb3IgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjbGVhckNhY2hlZEN1cnJlbnRJbWFnZSgpO1xyXG4gICAgbGF0ZXN0Q3JlYXRlZFRpY2tldFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHNldEF0dGVtcHRJZChcIlwiKTtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcclxuICB9LCBbY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2VdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHNvdXJjZVBpY2tlck9wZW4sXHJcbiAgICBidXN5LFxyXG4gICAgcHJvZ3Jlc3NLZXksXHJcbiAgICBwcm9ncmVzc01lc3NhZ2UsXHJcbiAgICBwcm9ncmVzc1N0YWdlcyxcclxuICAgIHByb2dyZXNzRWxhcHNlZE1zLFxyXG4gICAgZXJyb3JNZXNzYWdlLFxyXG4gICAgYXR0ZW1wdElkLFxyXG4gICAgaGFzUGVuZGluZ1VwbG9hZFJldHJ5OiBmYWxzZSxcclxuICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlOiBwYXJ0aWFsVGlja2V0RmFpbHVyZSAhPT0gbnVsbCxcclxuICAgIHRyYWNlTGlzdCxcclxuICAgIG9wZW5Tb3VyY2VQaWNrZXIsXHJcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcclxuICAgIHNlbGVjdEZyb21DYW1lcmEsXHJcbiAgICBzZWxlY3RGcm9tR2FsbGVyeSxcclxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcclxuICAgIHJldHJ5UGVuZGluZ1VwbG9hZCxcclxuICAgIG9wZW5DcmVhdGVkVGlja2V0LFxyXG4gICAgY2xlYXJFcnJvcixcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbmNvbnN0IE1BWF9USUNLRVRfVVBMT0FEX0xPTkdfU0lERV9QWCA9IDIwNDg7XHJcbmNvbnN0IE1JTl9USUNLRVRfVVBMT0FEX1NIT1JUX1NJREVfUFggPSA3Njg7XHJcbmNvbnN0IFRJQ0tFVF9SRUVOQ09ERV9RVUFMSVRZID0gMC44NTtcclxuY29uc3QgTUlOX1RJQ0tFVF9SRUVOQ09ERV9CWVRFUyA9IDQgKiAxMDI0ICogMTAyNDtcclxuY29uc3QgTUlOX1RJQ0tFVF9SRURVQ1RJT05fQllURVMgPSAyNTYgKiAxMDI0O1xyXG5jb25zdCBNSU5fVElDS0VUX1JFRFVDVElPTl9SQVRJTyA9IDAuMTI7XHJcblxyXG50eXBlIExvYWRlZEltYWdlID0ge1xyXG4gIGVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBkaXNwb3NlOiAoKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQgPSB7XHJcbiAgZmlsZTogRmlsZTtcclxuICBjaGFuZ2VkOiBib29sZWFuO1xyXG4gIHJlYXNvbjogc3RyaW5nO1xyXG4gIHJlc2l6ZWQ6IGJvb2xlYW47XHJcbiAgcmVlbmNvZGVkOiBib29sZWFuO1xyXG4gIGVsYXBzZWRNczogbnVtYmVyO1xyXG4gIG9yaWdpbmFsOiB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB0eXBlOiBzdHJpbmc7XHJcbiAgICBzaXplOiBudW1iZXI7XHJcbiAgICB3aWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICAgIGhlaWdodDogbnVtYmVyIHwgbnVsbDtcclxuICB9O1xyXG4gIG91dHB1dDoge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgc2l6ZTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgICBoZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZU1pbWVUeXBlID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcclxuICBpZiAobm9ybWFsaXplZCA9PT0gXCJpbWFnZS9wanBlZ1wiIHx8IG5vcm1hbGl6ZWQgPT09IFwiaW1hZ2UvanBnXCIpIHtcclxuICAgIHJldHVybiBcImltYWdlL2pwZWdcIjtcclxuICB9XHJcbiAgcmV0dXJuIG5vcm1hbGl6ZWQ7XHJcbn07XHJcblxyXG5jb25zdCByZXBsYWNlRmlsZUV4dGVuc2lvbiA9IChmaWxlTmFtZTogc3RyaW5nLCBleHRlbnNpb246IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgYmFzZU5hbWUgPSBzYWZlVGV4dChmaWxlTmFtZSkucmVwbGFjZSgvXFwuW2EtejAtOV0rJC9pLCBcIlwiKTtcclxuICBjb25zdCBzYWZlQmFzZU5hbWUgPSBiYXNlTmFtZSB8fCBcInRpY2tldFwiO1xyXG4gIGNvbnN0IHNhZmVFeHRlbnNpb24gPSBzYWZlVGV4dChleHRlbnNpb24pLnJlcGxhY2UoL15cXC4vLCBcIlwiKS50b0xvd2VyQ2FzZSgpIHx8IFwianBnXCI7XHJcbiAgcmV0dXJuIGAke3NhZmVCYXNlTmFtZX0uJHtzYWZlRXh0ZW5zaW9ufWA7XHJcbn07XHJcblxyXG4vLyBMb2FkcyBvbmUgaW1hZ2UgZWxlbWVudCBzbyBjYW52YXMgcmVzaXppbmcga2VlcHMgdGhlIGJyb3dzZXItZGVjb2RlZCBvcmllbnRhdGlvbi5cclxuY29uc3QgbG9hZEltYWdlID0gYXN5bmMgKGZpbGU6IEZpbGUpOiBQcm9taXNlPExvYWRlZEltYWdlIHwgbnVsbD4gPT4ge1xyXG4gIGlmICh0eXBlb2YgSW1hZ2UgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIFVSTCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCAhPT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IG9iamVjdFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSk7XHJcbiAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICBpbWFnZS5kZWNvZGluZyA9IFwiYXN5bmNcIjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgaW1hZ2Uub25sb2FkID0gKCkgPT4gcmVzb2x2ZSgpO1xyXG4gICAgICBpbWFnZS5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcihcIkNvdWxkIG5vdCBkZWNvZGUgaW1hZ2UuXCIpKTtcclxuICAgICAgaW1hZ2Uuc3JjID0gb2JqZWN0VXJsO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgd2lkdGggPSBOdW1iZXIoaW1hZ2UubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoIHx8IDApO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gTnVtYmVyKGltYWdlLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0IHx8IDApO1xyXG4gICAgaWYgKCEod2lkdGggPiAwKSB8fCAhKGhlaWdodCA+IDApKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVsZW1lbnQ6IGltYWdlLFxyXG4gICAgICB3aWR0aCxcclxuICAgICAgaGVpZ2h0LFxyXG4gICAgICBkaXNwb3NlOiAoKSA9PiB7XHJcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9IGNhdGNoIHtcclxuICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqZWN0VXJsKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlc29sdmVSZXNpemVEaW1lbnNpb25zID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlcjsgcmVzaXplZDogYm9vbGVhbiB9ID0+IHtcclxuICBjb25zdCBsb25nU2lkZSA9IE1hdGgubWF4KHdpZHRoLCBoZWlnaHQpO1xyXG4gIGNvbnN0IHNob3J0U2lkZSA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpO1xyXG4gIGlmIChsb25nU2lkZSA8PSBNQVhfVElDS0VUX1VQTE9BRF9MT05HX1NJREVfUFgpIHtcclxuICAgIHJldHVybiB7IHdpZHRoLCBoZWlnaHQsIHJlc2l6ZWQ6IGZhbHNlIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBtYXhMb25nU2lkZVNjYWxlID0gTUFYX1RJQ0tFVF9VUExPQURfTE9OR19TSURFX1BYIC8gbG9uZ1NpZGU7XHJcbiAgY29uc3QgbWluU2hvcnRTaWRlU2NhbGUgPSBNSU5fVElDS0VUX1VQTE9BRF9TSE9SVF9TSURFX1BYIC8gc2hvcnRTaWRlO1xyXG4gIGNvbnN0IHNjYWxlID0gTWF0aC5tYXgobWF4TG9uZ1NpZGVTY2FsZSwgbWluU2hvcnRTaWRlU2NhbGUpO1xyXG4gIGlmICghKHNjYWxlIDwgMSkpIHtcclxuICAgIHJldHVybiB7IHdpZHRoLCBoZWlnaHQsIHJlc2l6ZWQ6IGZhbHNlIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgd2lkdGg6IE1hdGgubWF4KDEsIE1hdGgucm91bmQod2lkdGggKiBzY2FsZSkpLFxyXG4gICAgaGVpZ2h0OiBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKGhlaWdodCAqIHNjYWxlKSksXHJcbiAgICByZXNpemVkOiB0cnVlLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBjcmVhdGVDYW52YXMgPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgcmV0dXJuIGNhbnZhcztcclxufTtcclxuXHJcbmNvbnN0IGNhbnZhc1RvQmxvYiA9IChjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBtaW1lVHlwZTogc3RyaW5nLCBxdWFsaXR5PzogbnVtYmVyKTogUHJvbWlzZTxCbG9iIHwgbnVsbD4gPT4ge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgY2FudmFzLnRvQmxvYigoYmxvYikgPT4gcmVzb2x2ZShibG9iKSwgbWltZVR5cGUsIHF1YWxpdHkpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQgPSAoe1xyXG4gIGZpbGUsXHJcbiAgb3JpZ2luYWxGaWxlLFxyXG4gIHJlYXNvbixcclxuICByZXNpemVkLFxyXG4gIHJlZW5jb2RlZCxcclxuICBlbGFwc2VkTXMsXHJcbiAgb3JpZ2luYWxXaWR0aCxcclxuICBvcmlnaW5hbEhlaWdodCxcclxuICBvdXRwdXRXaWR0aCxcclxuICBvdXRwdXRIZWlnaHQsXHJcbn06IHtcclxuICBmaWxlOiBGaWxlO1xyXG4gIG9yaWdpbmFsRmlsZTogRmlsZTtcclxuICByZWFzb246IHN0cmluZztcclxuICByZXNpemVkOiBib29sZWFuO1xyXG4gIHJlZW5jb2RlZDogYm9vbGVhbjtcclxuICBlbGFwc2VkTXM6IG51bWJlcjtcclxuICBvcmlnaW5hbFdpZHRoOiBudW1iZXIgfCBudWxsO1xyXG4gIG9yaWdpbmFsSGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG4gIG91dHB1dFdpZHRoOiBudW1iZXIgfCBudWxsO1xyXG4gIG91dHB1dEhlaWdodDogbnVtYmVyIHwgbnVsbDtcclxufSk6IFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0ID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZmlsZSxcclxuICAgIGNoYW5nZWQ6XHJcbiAgICAgIGZpbGUgIT09IG9yaWdpbmFsRmlsZSB8fFxyXG4gICAgICBmaWxlLnNpemUgIT09IG9yaWdpbmFsRmlsZS5zaXplIHx8XHJcbiAgICAgIHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKSAhPT0gc2FmZVRleHQob3JpZ2luYWxGaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCksXHJcbiAgICByZWFzb24sXHJcbiAgICByZXNpemVkLFxyXG4gICAgcmVlbmNvZGVkLFxyXG4gICAgZWxhcHNlZE1zLFxyXG4gICAgb3JpZ2luYWw6IHtcclxuICAgICAgbmFtZTogb3JpZ2luYWxGaWxlLm5hbWUsXHJcbiAgICAgIHR5cGU6IG9yaWdpbmFsRmlsZS50eXBlLFxyXG4gICAgICBzaXplOiBvcmlnaW5hbEZpbGUuc2l6ZSxcclxuICAgICAgd2lkdGg6IG9yaWdpbmFsV2lkdGgsXHJcbiAgICAgIGhlaWdodDogb3JpZ2luYWxIZWlnaHQsXHJcbiAgICB9LFxyXG4gICAgb3V0cHV0OiB7XHJcbiAgICAgIG5hbWU6IGZpbGUubmFtZSxcclxuICAgICAgdHlwZTogZmlsZS50eXBlLFxyXG4gICAgICBzaXplOiBmaWxlLnNpemUsXHJcbiAgICAgIHdpZHRoOiBvdXRwdXRXaWR0aCxcclxuICAgICAgaGVpZ2h0OiBvdXRwdXRIZWlnaHQsXHJcbiAgICB9LFxyXG4gIH07XHJcbn07XHJcblxyXG4vLyBSZXR1cm5zIHRoZSB1cGxvYWQgZmlsZSB0byB1c2UuIEl0IGtlZXBzIHRoZSBvcmlnaW5hbCB3aGVuIHJlZHVjdGlvbiB3b3VsZCBiZSByaXNreSBvciBpcnJlbGV2YW50LlxyXG5leHBvcnQgY29uc3Qgb3B0aW1pemVUaWNrZXRJbWFnZUZvclVwbG9hZCA9IGFzeW5jIChmaWxlOiBGaWxlKTogUHJvbWlzZTxUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdD4gPT4ge1xyXG4gIGNvbnN0IHN0YXJ0ZWRBdCA9IERhdGUubm93KCk7XHJcbiAgaWYgKCEoZmlsZSBpbnN0YW5jZW9mIEZpbGUpKSB7XHJcbiAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICBmaWxlLFxyXG4gICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgIHJlYXNvbjogXCJpbnZhbGlkLWlucHV0XCIsXHJcbiAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxyXG4gICAgICByZWVuY29kZWQ6IGZhbHNlLFxyXG4gICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgIG9yaWdpbmFsV2lkdGg6IG51bGwsXHJcbiAgICAgIG9yaWdpbmFsSGVpZ2h0OiBudWxsLFxyXG4gICAgICBvdXRwdXRXaWR0aDogbnVsbCxcclxuICAgICAgb3V0cHV0SGVpZ2h0OiBudWxsLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBub3JtYWxpemVkTWltZVR5cGUgPSBub3JtYWxpemVNaW1lVHlwZShmaWxlLnR5cGUpO1xyXG4gIGNvbnN0IGxvYWRlZEltYWdlID0gYXdhaXQgbG9hZEltYWdlKGZpbGUpO1xyXG4gIGlmICghbG9hZGVkSW1hZ2UpIHtcclxuICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgIGZpbGUsXHJcbiAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgcmVhc29uOiBcImRlY29kZS11bmF2YWlsYWJsZVwiLFxyXG4gICAgICByZXNpemVkOiBmYWxzZSxcclxuICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICBvcmlnaW5hbFdpZHRoOiBudWxsLFxyXG4gICAgICBvcmlnaW5hbEhlaWdodDogbnVsbCxcclxuICAgICAgb3V0cHV0V2lkdGg6IG51bGwsXHJcbiAgICAgIG91dHB1dEhlaWdodDogbnVsbCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgZWxlbWVudCB9ID0gbG9hZGVkSW1hZ2U7XHJcbiAgICBjb25zdCBzaG9ydFNpZGUgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGNvbnN0IHJlc2l6ZVBsYW4gPSByZXNvbHZlUmVzaXplRGltZW5zaW9ucyh3aWR0aCwgaGVpZ2h0KTtcclxuICAgIGNvbnN0IGNhblJlZW5jb2RlU2FmZWx5ID0gc2hvcnRTaWRlID49IE1JTl9USUNLRVRfVVBMT0FEX1NIT1JUX1NJREVfUFg7XHJcbiAgICBjb25zdCBpc0xhcmdlT3JpZ2luYWwgPSBmaWxlLnNpemUgPj0gTUlOX1RJQ0tFVF9SRUVOQ09ERV9CWVRFUztcclxuICAgIGNvbnN0IHNob3VsZFJlc2l6ZSA9IHJlc2l6ZVBsYW4ucmVzaXplZDtcclxuXHJcbiAgICBpZiAoIXNob3VsZFJlc2l6ZSAmJiAoIWNhblJlZW5jb2RlU2FmZWx5IHx8ICFpc0xhcmdlT3JpZ2luYWwpKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgICAgcmVhc29uOiAhY2FuUmVlbmNvZGVTYWZlbHkgPyBcImtlcHQtc21hbGwtc2hvcnQtc2lkZVwiIDogXCJrZXB0LXNtYWxsLWZpbGVcIixcclxuICAgICAgICByZXNpemVkOiBmYWxzZSxcclxuICAgICAgICByZWVuY29kZWQ6IGZhbHNlLFxyXG4gICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIG91dHB1dFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvdXRwdXRIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vcm1hbGl6ZWRNaW1lVHlwZSA9PT0gXCJpbWFnZS9wbmdcIiAmJiAhc2hvdWxkUmVzaXplKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgICAgcmVhc29uOiBcImtlcHQtcG5nLXdpdGhvdXQtcmVzaXplXCIsXHJcbiAgICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBvdXRwdXRXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3V0cHV0SGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyhyZXNpemVQbGFuLndpZHRoLCByZXNpemVQbGFuLmhlaWdodCk7XHJcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzPy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWNhbnZhcyB8fCAhY29udGV4dCkge1xyXG4gICAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICAgIHJlYXNvbjogXCJjYW52YXMtdW5hdmFpbGFibGVcIixcclxuICAgICAgICByZXNpemVkOiBmYWxzZSxcclxuICAgICAgICByZWVuY29kZWQ6IGZhbHNlLFxyXG4gICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIG91dHB1dFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvdXRwdXRIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29udGV4dC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSB0cnVlO1xyXG4gICAgY29udGV4dC5pbWFnZVNtb290aGluZ1F1YWxpdHkgPSBcImhpZ2hcIjtcclxuICAgIGNvbnRleHQuZHJhd0ltYWdlKGVsZW1lbnQsIDAsIDAsIHJlc2l6ZVBsYW4ud2lkdGgsIHJlc2l6ZVBsYW4uaGVpZ2h0KTtcclxuXHJcbiAgICBjb25zdCBvdXRwdXRNaW1lVHlwZSA9XHJcbiAgICAgIG5vcm1hbGl6ZWRNaW1lVHlwZSA9PT0gXCJpbWFnZS93ZWJwXCJcclxuICAgICAgICA/IFwiaW1hZ2Uvd2VicFwiXHJcbiAgICAgICAgOiBub3JtYWxpemVkTWltZVR5cGUgPT09IFwiaW1hZ2UvcG5nXCIgJiYgc2hvdWxkUmVzaXplXHJcbiAgICAgICAgICA/IFwiaW1hZ2UvanBlZ1wiXHJcbiAgICAgICAgICA6IFwiaW1hZ2UvanBlZ1wiO1xyXG4gICAgY29uc3Qgb3V0cHV0RXh0ZW5zaW9uID1cclxuICAgICAgb3V0cHV0TWltZVR5cGUgPT09IFwiaW1hZ2Uvd2VicFwiXHJcbiAgICAgICAgPyBcIndlYnBcIlxyXG4gICAgICAgIDogb3V0cHV0TWltZVR5cGUgPT09IFwiaW1hZ2UvcG5nXCJcclxuICAgICAgICAgID8gXCJwbmdcIlxyXG4gICAgICAgICAgOiBcImpwZ1wiO1xyXG4gICAgY29uc3QgcXVhbGl0eSA9IG91dHB1dE1pbWVUeXBlID09PSBcImltYWdlL3BuZ1wiID8gdW5kZWZpbmVkIDogVElDS0VUX1JFRU5DT0RFX1FVQUxJVFk7XHJcbiAgICBjb25zdCBvcHRpbWl6ZWRCbG9iID0gYXdhaXQgY2FudmFzVG9CbG9iKGNhbnZhcywgb3V0cHV0TWltZVR5cGUsIHF1YWxpdHkpO1xyXG4gICAgaWYgKCFvcHRpbWl6ZWRCbG9iIHx8IG9wdGltaXplZEJsb2Iuc2l6ZSA8PSAwIHx8IG9wdGltaXplZEJsb2Iuc2l6ZSA+PSBmaWxlLnNpemUpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgICBmaWxlLFxyXG4gICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgICByZWFzb246IFwib3B0aW1pemVkLW5vdC1zbWFsbGVyXCIsXHJcbiAgICAgICAgcmVzaXplZDogc2hvdWxkUmVzaXplLFxyXG4gICAgICAgIHJlZW5jb2RlZDogbm9ybWFsaXplZE1pbWVUeXBlICE9PSBvdXRwdXRNaW1lVHlwZSB8fCBpc0xhcmdlT3JpZ2luYWwsXHJcbiAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgb3V0cHV0V2lkdGg6IHNob3VsZFJlc2l6ZSA/IHJlc2l6ZVBsYW4ud2lkdGggOiB3aWR0aCxcclxuICAgICAgICBvdXRwdXRIZWlnaHQ6IHNob3VsZFJlc2l6ZSA/IHJlc2l6ZVBsYW4uaGVpZ2h0IDogaGVpZ2h0LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXNob3VsZFJlc2l6ZSkge1xyXG4gICAgICBjb25zdCBzYXZlZEJ5dGVzID0gZmlsZS5zaXplIC0gb3B0aW1pemVkQmxvYi5zaXplO1xyXG4gICAgICBjb25zdCBzYXZlZFJhdGlvID0gc2F2ZWRCeXRlcyAvIE1hdGgubWF4KGZpbGUuc2l6ZSwgMSk7XHJcbiAgICAgIGlmIChzYXZlZEJ5dGVzIDwgTUlOX1RJQ0tFVF9SRURVQ1RJT05fQllURVMgfHwgc2F2ZWRSYXRpbyA8IE1JTl9USUNLRVRfUkVEVUNUSU9OX1JBVElPKSB7XHJcbiAgICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgICAgIGZpbGUsXHJcbiAgICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgICAgICByZWFzb246IFwicmVkdWN0aW9uLXRvby1zbWFsbFwiLFxyXG4gICAgICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgICAgICByZWVuY29kZWQ6IHRydWUsXHJcbiAgICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgICBvdXRwdXRXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgICBvdXRwdXRIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdGltaXplZEZpbGUgPSBuZXcgRmlsZShbb3B0aW1pemVkQmxvYl0sIHJlcGxhY2VGaWxlRXh0ZW5zaW9uKGZpbGUubmFtZSwgb3V0cHV0RXh0ZW5zaW9uKSwge1xyXG4gICAgICB0eXBlOiBvdXRwdXRNaW1lVHlwZSxcclxuICAgICAgbGFzdE1vZGlmaWVkOiBmaWxlLmxhc3RNb2RpZmllZCB8fCBEYXRlLm5vdygpLFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICBmaWxlOiBvcHRpbWl6ZWRGaWxlLFxyXG4gICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgIHJlYXNvbjogXCJvcHRpbWl6ZWRcIixcclxuICAgICAgcmVzaXplZDogc2hvdWxkUmVzaXplLFxyXG4gICAgICByZWVuY29kZWQ6IG5vcm1hbGl6ZWRNaW1lVHlwZSAhPT0gb3V0cHV0TWltZVR5cGUgfHwgaXNMYXJnZU9yaWdpbmFsLFxyXG4gICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxyXG4gICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICBvdXRwdXRXaWR0aDogcmVzaXplUGxhbi53aWR0aCxcclxuICAgICAgb3V0cHV0SGVpZ2h0OiByZXNpemVQbGFuLmhlaWdodCxcclxuICAgIH0pO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBsb2FkZWRJbWFnZS5kaXNwb3NlKCk7XHJcbiAgfVxyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUE4RDtBQUM5RCx1QkFBNkI7OztBQ0Q3QixtQkFBNkY7QUFhN0YsSUFBTSxtQ0FBbUM7QUFHekMsSUFBTSxzQkFBc0IsQ0FBQyxZQUFrQztBQUM3RCxNQUFJLE9BQU8sV0FBVyxZQUFhLFFBQU87QUFFMUMsUUFBTSxTQUFTLE9BQU8saUJBQWlCLE9BQU87QUFDOUMsTUFBSSxPQUFPLFlBQVksVUFBVSxPQUFPLGVBQWUsVUFBVTtBQUMvRCxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sT0FBTyxRQUFRLHNCQUFzQjtBQUMzQyxTQUFPLEtBQUssUUFBUSxLQUFLLEtBQUssU0FBUztBQUN6QztBQUdBLElBQU0sNEJBQTRCLE1BQXNDO0FBQ3RFLE1BQUksT0FBTyxhQUFhLGVBQWUsT0FBTyxXQUFXLGFBQWE7QUFDcEUsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFFBQVEsU0FBUyxpQkFBOEIsNkRBQTZEO0FBQ2xILGFBQVcsUUFBUSxPQUFPO0FBQ3hCLFFBQUksQ0FBQyxvQkFBb0IsSUFBSSxFQUFHO0FBRWhDLFVBQU0sT0FBTyxLQUFLLHNCQUFzQjtBQUN4QyxVQUFNLGdCQUFnQixPQUFPLGNBQWMsU0FBUyxnQkFBZ0IsZUFBZTtBQUNuRixRQUFJLGlCQUFpQixFQUFHLFFBQU87QUFFL0IsV0FBTztBQUFBLE1BQ0wsTUFBTSxLQUFLLElBQUksa0NBQWtDLEtBQUssTUFBTSxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ3RFLE9BQU8sS0FBSyxJQUFJLGtDQUFrQyxLQUFLLE1BQU0sZ0JBQWdCLEtBQUssS0FBSyxDQUFDO0FBQUEsSUFDMUY7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBR08sSUFBTSxpQ0FBaUMsTUFBNEM7QUFDeEYsUUFBTSxpQkFBYSxxQkFBOEIsSUFBSTtBQUNyRCxRQUFNLHdCQUFvQixxQkFBc0IsSUFBSTtBQUNwRCxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixRQUFJLHVCQUFTLENBQUM7QUFDdEQsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUksdUJBQXlDLElBQUk7QUFFdkYsUUFBTSxvQkFBZ0IsNkJBQWUsTUFBTTtBQUN6QyxVQUFNLFVBQVUsV0FBVztBQUMzQixRQUFJLENBQUMsUUFBUztBQUVkLFVBQU0sYUFBYSxLQUFLLEtBQUssUUFBUSxzQkFBc0IsRUFBRSxNQUFNO0FBQ25FLHNCQUFrQixDQUFDLGFBQWMsS0FBSyxJQUFJLFdBQVcsVUFBVSxJQUFJLElBQUksV0FBVyxVQUFXO0FBRTdGLFVBQU0sYUFBYSwwQkFBMEI7QUFDN0MscUJBQWlCLENBQUMsYUFBYTtBQUM3QixVQUFJLENBQUMsWUFBWSxDQUFDLFdBQVksUUFBTztBQUNyQyxVQUFJLFlBQVksY0FBYyxTQUFTLFNBQVMsV0FBVyxRQUFRLFNBQVMsVUFBVSxXQUFXLE9BQU87QUFDdEcsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPO0FBQUEsSUFDVCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsUUFBTSxzQkFBa0IsNkJBQWUsTUFBTTtBQUMzQyxRQUFJLE9BQU8sV0FBVyxZQUFhO0FBRW5DLFFBQUksa0JBQWtCLFlBQVksTUFBTTtBQUN0QyxhQUFPLHFCQUFxQixrQkFBa0IsT0FBTztBQUFBLElBQ3ZEO0FBRUEsc0JBQWtCLFVBQVUsT0FBTyxzQkFBc0IsTUFBTTtBQUM3RCx3QkFBa0IsVUFBVTtBQUM1QixvQkFBYztBQUFBLElBQ2hCLENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxvQ0FBZ0IsTUFBTTtBQUNwQixrQkFBYztBQUVkLFFBQUksT0FBTyxtQkFBbUIsWUFBYTtBQUMzQyxVQUFNLFVBQVUsV0FBVztBQUMzQixRQUFJLENBQUMsUUFBUztBQUVkLFVBQU0sV0FBVyxJQUFJLGVBQWUsTUFBTTtBQUN4QyxzQkFBZ0I7QUFBQSxJQUNsQixDQUFDO0FBRUQsYUFBUyxRQUFRLE9BQU87QUFDeEIsV0FBTyxNQUFNLFNBQVMsV0FBVztBQUFBLEVBQ25DLEdBQUcsQ0FBQyxDQUFDO0FBRUwsOEJBQVUsTUFBTTtBQUNkLFFBQUksT0FBTyxxQkFBcUIsZUFBZSxPQUFPLGFBQWEsWUFBYTtBQUVoRixVQUFNLE9BQU8sU0FBUztBQUN0QixRQUFJLENBQUMsS0FBTTtBQUVYLFVBQU0sV0FBVyxJQUFJLGlCQUFpQixNQUFNO0FBQzFDLHNCQUFnQjtBQUFBLElBQ2xCLENBQUM7QUFFRCxhQUFTLFFBQVEsTUFBTTtBQUFBLE1BQ3JCLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFFRCxXQUFPLE1BQU0sU0FBUyxXQUFXO0FBQUEsRUFDbkMsR0FBRyxDQUFDLENBQUM7QUFFTCw4QkFBVSxNQUFNO0FBQ2QsUUFBSSxPQUFPLFdBQVcsWUFBYTtBQUVuQyxVQUFNLGVBQWUsTUFBTTtBQUN6QixzQkFBZ0I7QUFBQSxJQUNsQjtBQUVBLFdBQU8saUJBQWlCLFVBQVUsY0FBYyxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQ2pFLFdBQU8saUJBQWlCLHFCQUFxQixZQUFZO0FBRXpELFdBQU8sTUFBTTtBQUNYLGFBQU8sb0JBQW9CLFVBQVUsWUFBWTtBQUNqRCxhQUFPLG9CQUFvQixxQkFBcUIsWUFBWTtBQUU1RCxVQUFJLGtCQUFrQixZQUFZLE1BQU07QUFDdEMsZUFBTyxxQkFBcUIsa0JBQWtCLE9BQU87QUFBQSxNQUN2RDtBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FEaEdNO0FBN0NOLElBQU0sMEJBQTBCO0FBQ2hDLElBQU0scUNBQXFDO0FBQzNDLElBQU0sc0NBQXNDO0FBb0JyQyxJQUFNLHlCQUF5QixDQUFDO0FBQUEsRUFDckM7QUFBQSxFQUNBLFdBQVc7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLE9BQU87QUFBQSxFQUNQO0FBQUEsRUFDQSxZQUFZO0FBQ2QsTUFBbUM7QUFDakMsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0M7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsY0FBWSxhQUFhO0FBQUEsTUFDekI7QUFBQSxNQUNBLFdBQVc7QUFBQSxRQUNUO0FBQUEsUUFDQSxZQUFZLGVBQWU7QUFBQSxRQUMzQixhQUFhO0FBQUEsTUFDZjtBQUFBLE1BRUEsc0RBQUMsVUFBSyxXQUFVLDJTQUNiLGlCQUNIO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSx1QkFBdUIsY0FBYztBQUdyQyxJQUFNLG9CQUFvQixDQUFDLEVBQUUsVUFBVSxXQUFXLFVBQVUsTUFBOEI7QUFDeEYsUUFBTSxnQkFBZ0IsdUJBQVMsUUFBUSxRQUFRLEVBQzVDO0FBQUEsSUFDQyxDQUFDLGNBQ0MsOEJBQTRDLEtBQUssS0FBSyxNQUFNLFNBQVM7QUFBQSxFQUN6RSxFQUNDLE1BQU0sR0FBRyx1QkFBdUI7QUFFbkMsUUFBTSxjQUFjLGNBQWM7QUFDbEMsUUFBTSxFQUFFLGdCQUFnQixZQUFZLGNBQWMsSUFBSSwrQkFBK0I7QUFDckYsUUFBTSxlQUFlLE9BQU8sYUFBYSxjQUFjLE9BQU8sU0FBUztBQUV2RSxNQUFJLGNBQWMsR0FBRztBQUNuQixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sWUFDSjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsS0FBSztBQUFBLE1BQ0wsV0FBVTtBQUFBLE1BRVY7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFdBQVU7QUFBQSxVQUNWLE9BQU87QUFBQSxZQUNMLFlBQVksR0FBRyxrQ0FBa0M7QUFBQSxZQUNqRCxhQUFhLEdBQUcsZUFBZSxRQUFRLG1DQUFtQztBQUFBLFlBQzFFLGNBQWMsR0FBRyxlQUFlLFNBQVMsbUNBQW1DO0FBQUEsWUFDNUUsZUFBZTtBQUFBLFVBQ2pCO0FBQUEsVUFFQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsTUFBSztBQUFBLGNBQ0wsY0FBWTtBQUFBLGNBQ1osV0FBVyxXQUFXLDhCQUE4QixhQUFhLEVBQUU7QUFBQSxjQUVuRSxzREFBQyxTQUFJLFdBQVUsNEJBQ1osd0JBQWMsSUFBSSxDQUFDLE9BQU8sVUFBVTtBQUNuQyxzQkFBTSxxQkFBcUIsZ0JBQWdCLEtBQU0sY0FBYyxNQUFNLEtBQUssVUFBVSxjQUFjO0FBQ2xHLDJCQUFPLDRCQUFhLE9BQU87QUFBQSxrQkFDekIsV0FBVztBQUFBLGtCQUNYLFVBQVUsTUFBTSxNQUFNO0FBQUEsa0JBQ3RCLEtBQUssTUFBTSxPQUFPLHNCQUFzQixLQUFLO0FBQUEsZ0JBQy9DLENBQUM7QUFBQSxjQUNILENBQUMsR0FDSDtBQUFBO0FBQUEsVUFDRjtBQUFBO0FBQUEsTUFDRjtBQUFBO0FBQUEsRUFDRjtBQUdGLFNBQ0UsNEVBQ0U7QUFBQSxnREFBQyxTQUFJLGVBQVksUUFBTyxPQUFPLEVBQUUsUUFBUSxHQUFHLGNBQWMsS0FBSyxHQUFHO0FBQUEsSUFDakUsbUJBQWUsK0JBQWEsV0FBVyxZQUFZLElBQUk7QUFBQSxLQUMxRDtBQUVKO0FBRUEsSUFBTyw0QkFBUTs7O0FFbkZMLElBQUFDLHNCQUFBO0FBaEJWLElBQU0sZ0JBQWdCO0FBQ3RCLElBQU0sd0JBQXlDLENBQUM7QUFFaEQsSUFBTSxxQkFBcUIsQ0FBQyxjQUE4QjtBQUN4RCxRQUFNLGdCQUFnQixPQUFPLFNBQVMsU0FBUyxLQUFLLFlBQVksSUFBSSxZQUFZO0FBQ2hGLFFBQU0sZUFBZSxLQUFLLE1BQU0sZ0JBQWdCLEdBQUk7QUFDcEQsUUFBTSxVQUFVLEtBQUssTUFBTSxlQUFlLEVBQUU7QUFDNUMsUUFBTSxVQUFVLGVBQWU7QUFDL0IsU0FBTyxHQUFHLE9BQU8sT0FBTyxFQUFFLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxPQUFPLE9BQU8sRUFBRSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQ2hGO0FBRUEsSUFBTSxvQkFBb0IsQ0FBQyxVQUF5QjtBQUNsRCxNQUFJLE1BQU0sVUFBVSxhQUFhO0FBQy9CLFdBQ0UsNkNBQUMsVUFBSyxXQUFVLHlGQUF3RixlQUFZLFFBQ2xILHVEQUFDLFNBQUksU0FBUSxhQUFZLE1BQUssUUFBTyxXQUFVLFdBQVUsUUFBTyxnQkFBZSxhQUFZLEtBQ3pGLHVEQUFDLFVBQUssR0FBRSx5QkFBd0IsZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FDL0UsR0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFJLE1BQU0sVUFBVSxVQUFVO0FBQzVCLFdBQ0UsNkNBQUMsVUFBSyxXQUFVLGlGQUFnRixlQUFZLFFBQzFHLHVEQUFDLG1CQUFRLE1BQUssV0FBVSxPQUFPLEtBQUssa0JBQWtCLFNBQVMsR0FBRyxHQUNwRTtBQUFBLEVBRUo7QUFFQSxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxXQUFVO0FBQUEsTUFDVixlQUFZO0FBQUEsTUFFWix1REFBQyxVQUFLLFdBQVUseUNBQXdDO0FBQUE7QUFBQSxFQUMxRDtBQUVKO0FBR0EsSUFBTSxvQ0FBb0MsQ0FBQztBQUFBLEVBQ3pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaLFNBQVM7QUFDWCxNQUE4QztBQUM1QyxNQUFJLENBQUMsS0FBTSxRQUFPO0FBRWxCLFNBQ0UsNkNBQUMsU0FBSSxXQUFVLHFGQUNiO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxXQUFVO0FBQUEsTUFDVixPQUFPLEVBQUUsY0FBYyxjQUFjO0FBQUEsTUFFckM7QUFBQSxzREFBQyxTQUFJLFdBQVUsMEJBQ2I7QUFBQSx1REFBQyxTQUFJLFdBQVUsZ0dBQ2IsdURBQUMsbUJBQVEsTUFBSyxXQUFVLE9BQU8sS0FBSyxrQkFBa0IsU0FBUyxHQUFHLEdBQ3BFO0FBQUEsVUFDQSw4Q0FBQyxTQUFJLFdBQVUsa0JBQ2I7QUFBQSx5REFBQyxPQUFFLFdBQVUsNENBQ1YsbUJBQVMsS0FBSywwQ0FBMEMsbUJBQW1CLEdBQzlFO0FBQUEsWUFDQSw2Q0FBQyxPQUFFLFdBQVUsK0JBQ1YscUJBQVcsS0FBSyxpREFBaUQsb0JBQW9CLEdBQ3hGO0FBQUEsWUFDQSw4Q0FBQyxTQUFJLFdBQVUsZ0pBQ2I7QUFBQSwyREFBQyxVQUFNLGVBQUssNENBQTRDLGNBQWMsR0FBRTtBQUFBLGNBQ3hFLDZDQUFDLFVBQUssV0FBVSx3Q0FBd0MsNkJBQW1CLFNBQVMsR0FBRTtBQUFBLGVBQ3hGO0FBQUEsYUFDRjtBQUFBLFdBQ0Y7QUFBQSxRQUVDLE9BQU8sU0FBUyxJQUNmLDZDQUFDLFNBQUksV0FBVSxrQkFDWixpQkFBTyxJQUFJLENBQUMsVUFDWDtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBRUMsV0FDRSxNQUFNLFVBQVUsV0FDWiw0RUFDQSxNQUFNLFVBQVUsY0FDZCxvRkFDQTtBQUFBLFlBR1Isd0RBQUMsU0FBSSxXQUFVLDBCQUNaO0FBQUEsZ0NBQWtCLEtBQUs7QUFBQSxjQUN4Qiw4Q0FBQyxTQUFJLFdBQVUsa0JBQ2I7QUFBQTtBQUFBLGtCQUFDO0FBQUE7QUFBQSxvQkFDQyxXQUNFLE1BQU0sVUFBVSxZQUNaLHVDQUNBO0FBQUEsb0JBR0wsZ0JBQU07QUFBQTtBQUFBLGdCQUNUO0FBQUEsZ0JBQ0EsNkNBQUMsT0FBRSxXQUFVLHlDQUF5QyxnQkFBTSxhQUFZO0FBQUEsaUJBQzFFO0FBQUEsZUFDRjtBQUFBO0FBQUEsVUF2QkssTUFBTTtBQUFBLFFBd0JiLENBQ0QsR0FDSCxJQUNFO0FBQUE7QUFBQTtBQUFBLEVBQ04sR0FDRjtBQUVKO0FBRUEsSUFBTyw0Q0FBUTs7O0FDeEhmLElBQU0sMEJBQTBCO0FBQ2hDLElBQU0sNEJBQTRCO0FBQ2xDLElBQU0sMkJBQTJCO0FBRTFCLElBQU0sOEJBQThCLEtBQUssT0FBTztBQUNoRCxJQUFNLGdDQUNYO0FBQ0YsSUFBTSxrQ0FBa0Msb0JBQUksSUFBWSxDQUFDLGNBQWMsZUFBZSxhQUFhLFlBQVksQ0FBQztBQUNoSCxJQUFNLGtDQUFrQyxvQkFBSSxJQUFZLENBQUMsT0FBTyxRQUFRLE9BQU8sTUFBTSxDQUFDO0FBMkh0RixJQUFNLDBCQUEwQixDQUFDLFVBQTBCO0FBQ3pELFFBQU0sYUFBYSxTQUFTLEtBQUssRUFBRSxZQUFZLEVBQUUsUUFBUSxjQUFjLEVBQUU7QUFDekUsTUFBSSxDQUFDLFdBQVksUUFBTztBQUN4QixNQUFJLGVBQWUsT0FBUSxRQUFPO0FBQ2xDLFNBQU8sZ0NBQWdDLElBQUksVUFBVSxJQUFJLGFBQWE7QUFDeEU7QUFFQSxJQUFNLCtCQUErQixDQUFDLFNBQXVCO0FBQzNELFFBQU0sV0FBVyxTQUFTLEtBQUssSUFBSSxFQUFFLE1BQU0sR0FBRyxFQUFFLElBQUksS0FBSztBQUN6RCxTQUFPLHdCQUF3QixRQUFRO0FBQ3pDO0FBYU8sSUFBTSw2QkFBNkIsQ0FBQyxTQUF3QjtBQUNqRSxRQUFNLGlCQUFpQixTQUFTLEtBQUssSUFBSSxFQUFFLFlBQVk7QUFDdkQsTUFBSSxrQkFBa0IsZ0NBQWdDLElBQUksY0FBYyxHQUFHO0FBQ3pFLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxZQUFZLDZCQUE2QixJQUFJO0FBQ25ELFNBQU8sQ0FBQyxDQUFDO0FBQ1g7QUFFTyxJQUFNLG1CQUFtQixNQUFjO0FBQzVDLE1BQUksT0FBTyxXQUFXLGVBQWUsT0FBTyxPQUFPLGVBQWUsWUFBWTtBQUM1RSxXQUFPLE9BQU8sV0FBVztBQUFBLEVBQzNCO0FBQ0EsU0FBTyxHQUFHLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUUsU0FBUyxFQUFFLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNqRTtBQU9PLElBQU0sMEJBQTBCLENBQUMsVUFBaUM7QUFDdkUsUUFBTSxVQUFVLFNBQVMsTUFBTSxZQUFZO0FBQzNDLE1BQUksQ0FBQyxRQUFTLFFBQU87QUFDckIsTUFBSTtBQUNGLFVBQU0sT0FBTyxLQUFLLE1BQU0sT0FBTztBQUMvQixVQUFNLFVBQVUsU0FBUyxLQUFLLFdBQVcsS0FBSyxPQUFPO0FBQ3JELFdBQU87QUFBQSxFQUNULFFBQVE7QUFDTixXQUFPO0FBQUEsRUFDVDtBQUNGO0FBeUhPLElBQU0sbUJBQW1CLENBQUMsY0FBd0M7QUFDdkUsTUFBSTtBQUNGLG1CQUFlLFFBQVEsMEJBQTBCLEtBQUssVUFBVSxTQUFTLENBQUM7QUFBQSxFQUM1RSxRQUFRO0FBQUEsRUFFUjtBQUNGO0FBRU8sSUFBTSxpQkFBaUIsT0FBTyxVQUFrQixTQUE4QjtBQUNuRixNQUFJLE9BQU8sV0FBVyxlQUFlLEVBQUUsWUFBWSxRQUFTO0FBQzVELFFBQU0sUUFBUSxNQUFNLE9BQU8sS0FBSyx1QkFBdUI7QUFDdkQsUUFBTSxhQUFhLEdBQUcseUJBQXlCLEdBQUcsbUJBQW1CLFFBQVEsQ0FBQztBQUM5RSxRQUFNLE1BQU07QUFBQSxJQUNWLElBQUksUUFBUSxVQUFVO0FBQUEsSUFDdEIsSUFBSSxTQUFTLE1BQU07QUFBQSxNQUNqQixTQUFTO0FBQUEsUUFDUCxnQkFBZ0IsU0FBUyxLQUFLLElBQUksS0FBSztBQUFBLE1BQ3pDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUNGO0FBV08sSUFBTSx3QkFBd0IsT0FBTyxhQUFvQztBQUM5RSxNQUFJLE9BQU8sV0FBVyxlQUFlLEVBQUUsWUFBWSxRQUFTO0FBQzVELFFBQU0sUUFBUSxNQUFNLE9BQU8sS0FBSyx1QkFBdUI7QUFDdkQsUUFBTSxhQUFhLEdBQUcseUJBQXlCLEdBQUcsbUJBQW1CLFFBQVEsQ0FBQztBQUM5RSxRQUFNLE1BQU0sT0FBTyxVQUFVO0FBQy9COzs7QUNqV0EsSUFBQUMsZ0JBQWtFOzs7QUNFbEUsSUFBTSxpQ0FBaUM7QUFDdkMsSUFBTSxrQ0FBa0M7QUFDeEMsSUFBTSwwQkFBMEI7QUFDaEMsSUFBTSw0QkFBNEIsSUFBSSxPQUFPO0FBQzdDLElBQU0sNkJBQTZCLE1BQU07QUFDekMsSUFBTSw2QkFBNkI7QUFnQ25DLElBQU0sb0JBQW9CLENBQUMsVUFBMEI7QUFDbkQsUUFBTSxhQUFhLFNBQVMsS0FBSyxFQUFFLFlBQVk7QUFDL0MsTUFBSSxlQUFlLGlCQUFpQixlQUFlLGFBQWE7QUFDOUQsV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLHVCQUF1QixDQUFDLFVBQWtCLGNBQThCO0FBQzVFLFFBQU0sV0FBVyxTQUFTLFFBQVEsRUFBRSxRQUFRLGlCQUFpQixFQUFFO0FBQy9ELFFBQU0sZUFBZSxZQUFZO0FBQ2pDLFFBQU0sZ0JBQWdCLFNBQVMsU0FBUyxFQUFFLFFBQVEsT0FBTyxFQUFFLEVBQUUsWUFBWSxLQUFLO0FBQzlFLFNBQU8sR0FBRyxZQUFZLElBQUksYUFBYTtBQUN6QztBQUdBLElBQU0sWUFBWSxPQUFPLFNBQTRDO0FBQ25FLE1BQUksT0FBTyxVQUFVLGVBQWUsT0FBTyxRQUFRLGVBQWUsT0FBTyxJQUFJLG9CQUFvQixZQUFZO0FBQzNHLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxZQUFZLElBQUksZ0JBQWdCLElBQUk7QUFDMUMsUUFBTSxRQUFRLElBQUksTUFBTTtBQUN4QixRQUFNLFdBQVc7QUFFakIsTUFBSTtBQUNGLFVBQU0sSUFBSSxRQUFjLENBQUMsU0FBUyxXQUFXO0FBQzNDLFlBQU0sU0FBUyxNQUFNLFFBQVE7QUFDN0IsWUFBTSxVQUFVLE1BQU0sT0FBTyxJQUFJLE1BQU0seUJBQXlCLENBQUM7QUFDakUsWUFBTSxNQUFNO0FBQUEsSUFDZCxDQUFDO0FBRUQsVUFBTSxRQUFRLE9BQU8sTUFBTSxnQkFBZ0IsTUFBTSxTQUFTLENBQUM7QUFDM0QsVUFBTSxTQUFTLE9BQU8sTUFBTSxpQkFBaUIsTUFBTSxVQUFVLENBQUM7QUFDOUQsUUFBSSxFQUFFLFFBQVEsTUFBTSxFQUFFLFNBQVMsSUFBSTtBQUNqQyxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU87QUFBQSxNQUNMLFNBQVM7QUFBQSxNQUNUO0FBQUEsTUFDQTtBQUFBLE1BQ0EsU0FBUyxNQUFNO0FBQ2IsWUFBSSxnQkFBZ0IsU0FBUztBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBLEVBQ0YsUUFBUTtBQUNOLFFBQUksZ0JBQWdCLFNBQVM7QUFDN0IsV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQUVBLElBQU0sMEJBQTBCLENBQUMsT0FBZSxXQUF3RTtBQUN0SCxRQUFNLFdBQVcsS0FBSyxJQUFJLE9BQU8sTUFBTTtBQUN2QyxRQUFNLFlBQVksS0FBSyxJQUFJLE9BQU8sTUFBTTtBQUN4QyxNQUFJLFlBQVksZ0NBQWdDO0FBQzlDLFdBQU8sRUFBRSxPQUFPLFFBQVEsU0FBUyxNQUFNO0FBQUEsRUFDekM7QUFFQSxRQUFNLG1CQUFtQixpQ0FBaUM7QUFDMUQsUUFBTSxvQkFBb0Isa0NBQWtDO0FBQzVELFFBQU0sUUFBUSxLQUFLLElBQUksa0JBQWtCLGlCQUFpQjtBQUMxRCxNQUFJLEVBQUUsUUFBUSxJQUFJO0FBQ2hCLFdBQU8sRUFBRSxPQUFPLFFBQVEsU0FBUyxNQUFNO0FBQUEsRUFDekM7QUFFQSxTQUFPO0FBQUEsSUFDTCxPQUFPLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTSxRQUFRLEtBQUssQ0FBQztBQUFBLElBQzVDLFFBQVEsS0FBSyxJQUFJLEdBQUcsS0FBSyxNQUFNLFNBQVMsS0FBSyxDQUFDO0FBQUEsSUFDOUMsU0FBUztBQUFBLEVBQ1g7QUFDRjtBQUVBLElBQU0sZUFBZSxDQUFDLE9BQWUsV0FBNkM7QUFDaEYsTUFBSSxPQUFPLGFBQWEsZUFBZSxPQUFPLFNBQVMsa0JBQWtCLFlBQVk7QUFDbkYsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsU0FBTyxRQUFRO0FBQ2YsU0FBTyxTQUFTO0FBQ2hCLFNBQU87QUFDVDtBQUVBLElBQU0sZUFBZSxDQUFDLFFBQTJCLFVBQWtCLFlBQTJDO0FBQzVHLFNBQU8sSUFBSSxRQUFRLENBQUMsWUFBWTtBQUM5QixXQUFPLE9BQU8sQ0FBQyxTQUFTLFFBQVEsSUFBSSxHQUFHLFVBQVUsT0FBTztBQUFBLEVBQzFELENBQUM7QUFDSDtBQUVBLElBQU0sMEJBQTBCLENBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BV3FDO0FBQ25DLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQSxTQUNFLFNBQVMsZ0JBQ1QsS0FBSyxTQUFTLGFBQWEsUUFDM0IsU0FBUyxLQUFLLElBQUksRUFBRSxZQUFZLE1BQU0sU0FBUyxhQUFhLElBQUksRUFBRSxZQUFZO0FBQUEsSUFDaEY7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLE1BQU0sYUFBYTtBQUFBLE1BQ25CLE1BQU0sYUFBYTtBQUFBLE1BQ25CLE1BQU0sYUFBYTtBQUFBLE1BQ25CLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNLEtBQUs7QUFBQSxNQUNYLE1BQU0sS0FBSztBQUFBLE1BQ1gsTUFBTSxLQUFLO0FBQUEsTUFDWCxPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRjtBQUdPLElBQU0sK0JBQStCLE9BQU8sU0FBdUQ7QUFDeEcsUUFBTSxZQUFZLEtBQUssSUFBSTtBQUMzQixNQUFJLEVBQUUsZ0JBQWdCLE9BQU87QUFDM0IsV0FBTyx3QkFBd0I7QUFBQSxNQUM3QjtBQUFBLE1BQ0EsY0FBYztBQUFBLE1BQ2QsUUFBUTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLE1BQ1gsV0FBVyxLQUFLLElBQUksSUFBSTtBQUFBLE1BQ3hCLGVBQWU7QUFBQSxNQUNmLGdCQUFnQjtBQUFBLE1BQ2hCLGFBQWE7QUFBQSxNQUNiLGNBQWM7QUFBQSxJQUNoQixDQUFDO0FBQUEsRUFDSDtBQUVBLFFBQU0scUJBQXFCLGtCQUFrQixLQUFLLElBQUk7QUFDdEQsUUFBTSxjQUFjLE1BQU0sVUFBVSxJQUFJO0FBQ3hDLE1BQUksQ0FBQyxhQUFhO0FBQ2hCLFdBQU8sd0JBQXdCO0FBQUEsTUFDN0I7QUFBQSxNQUNBLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFdBQVcsS0FBSyxJQUFJLElBQUk7QUFBQSxNQUN4QixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixhQUFhO0FBQUEsTUFDYixjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBLEVBQ0g7QUFFQSxNQUFJO0FBQ0YsVUFBTSxFQUFFLE9BQU8sUUFBUSxRQUFRLElBQUk7QUFDbkMsVUFBTSxZQUFZLEtBQUssSUFBSSxPQUFPLE1BQU07QUFDeEMsVUFBTSxhQUFhLHdCQUF3QixPQUFPLE1BQU07QUFDeEQsVUFBTSxvQkFBb0IsYUFBYTtBQUN2QyxVQUFNLGtCQUFrQixLQUFLLFFBQVE7QUFDckMsVUFBTSxlQUFlLFdBQVc7QUFFaEMsUUFBSSxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLGtCQUFrQjtBQUM3RCxhQUFPLHdCQUF3QjtBQUFBLFFBQzdCO0FBQUEsUUFDQSxjQUFjO0FBQUEsUUFDZCxRQUFRLENBQUMsb0JBQW9CLDBCQUEwQjtBQUFBLFFBQ3ZELFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLFdBQVcsS0FBSyxJQUFJLElBQUk7QUFBQSxRQUN4QixlQUFlO0FBQUEsUUFDZixnQkFBZ0I7QUFBQSxRQUNoQixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsTUFDaEIsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLHVCQUF1QixlQUFlLENBQUMsY0FBYztBQUN2RCxhQUFPLHdCQUF3QjtBQUFBLFFBQzdCO0FBQUEsUUFDQSxjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsUUFDWCxXQUFXLEtBQUssSUFBSSxJQUFJO0FBQUEsUUFDeEIsZUFBZTtBQUFBLFFBQ2YsZ0JBQWdCO0FBQUEsUUFDaEIsYUFBYTtBQUFBLFFBQ2IsY0FBYztBQUFBLE1BQ2hCLENBQUM7QUFBQSxJQUNIO0FBRUEsVUFBTSxTQUFTLGFBQWEsV0FBVyxPQUFPLFdBQVcsTUFBTTtBQUMvRCxVQUFNLFVBQVUsUUFBUSxXQUFXLElBQUk7QUFDdkMsUUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTO0FBQ3ZCLGFBQU8sd0JBQXdCO0FBQUEsUUFDN0I7QUFBQSxRQUNBLGNBQWM7QUFBQSxRQUNkLFFBQVE7QUFBQSxRQUNSLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLFdBQVcsS0FBSyxJQUFJLElBQUk7QUFBQSxRQUN4QixlQUFlO0FBQUEsUUFDZixnQkFBZ0I7QUFBQSxRQUNoQixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsTUFDaEIsQ0FBQztBQUFBLElBQ0g7QUFFQSxZQUFRLHdCQUF3QjtBQUNoQyxZQUFRLHdCQUF3QjtBQUNoQyxZQUFRLFVBQVUsU0FBUyxHQUFHLEdBQUcsV0FBVyxPQUFPLFdBQVcsTUFBTTtBQUVwRSxVQUFNLGlCQUNKLHVCQUF1QixlQUNuQixlQUNBLHVCQUF1QixlQUFlLGVBQ3BDLGVBQ0E7QUFDUixVQUFNLGtCQUNKLG1CQUFtQixlQUNmLFNBQ0EsbUJBQW1CLGNBQ2pCLFFBQ0E7QUFDUixVQUFNLFVBQVUsbUJBQW1CLGNBQWMsU0FBWTtBQUM3RCxVQUFNLGdCQUFnQixNQUFNLGFBQWEsUUFBUSxnQkFBZ0IsT0FBTztBQUN4RSxRQUFJLENBQUMsaUJBQWlCLGNBQWMsUUFBUSxLQUFLLGNBQWMsUUFBUSxLQUFLLE1BQU07QUFDaEYsYUFBTyx3QkFBd0I7QUFBQSxRQUM3QjtBQUFBLFFBQ0EsY0FBYztBQUFBLFFBQ2QsUUFBUTtBQUFBLFFBQ1IsU0FBUztBQUFBLFFBQ1QsV0FBVyx1QkFBdUIsa0JBQWtCO0FBQUEsUUFDcEQsV0FBVyxLQUFLLElBQUksSUFBSTtBQUFBLFFBQ3hCLGVBQWU7QUFBQSxRQUNmLGdCQUFnQjtBQUFBLFFBQ2hCLGFBQWEsZUFBZSxXQUFXLFFBQVE7QUFBQSxRQUMvQyxjQUFjLGVBQWUsV0FBVyxTQUFTO0FBQUEsTUFDbkQsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLENBQUMsY0FBYztBQUNqQixZQUFNLGFBQWEsS0FBSyxPQUFPLGNBQWM7QUFDN0MsWUFBTSxhQUFhLGFBQWEsS0FBSyxJQUFJLEtBQUssTUFBTSxDQUFDO0FBQ3JELFVBQUksYUFBYSw4QkFBOEIsYUFBYSw0QkFBNEI7QUFDdEYsZUFBTyx3QkFBd0I7QUFBQSxVQUM3QjtBQUFBLFVBQ0EsY0FBYztBQUFBLFVBQ2QsUUFBUTtBQUFBLFVBQ1IsU0FBUztBQUFBLFVBQ1QsV0FBVztBQUFBLFVBQ1gsV0FBVyxLQUFLLElBQUksSUFBSTtBQUFBLFVBQ3hCLGVBQWU7QUFBQSxVQUNmLGdCQUFnQjtBQUFBLFVBQ2hCLGFBQWE7QUFBQSxVQUNiLGNBQWM7QUFBQSxRQUNoQixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFFQSxVQUFNLGdCQUFnQixJQUFJLEtBQUssQ0FBQyxhQUFhLEdBQUcscUJBQXFCLEtBQUssTUFBTSxlQUFlLEdBQUc7QUFBQSxNQUNoRyxNQUFNO0FBQUEsTUFDTixjQUFjLEtBQUssZ0JBQWdCLEtBQUssSUFBSTtBQUFBLElBQzlDLENBQUM7QUFDRCxXQUFPLHdCQUF3QjtBQUFBLE1BQzdCLE1BQU07QUFBQSxNQUNOLGNBQWM7QUFBQSxNQUNkLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVcsdUJBQXVCLGtCQUFrQjtBQUFBLE1BQ3BELFdBQVcsS0FBSyxJQUFJLElBQUk7QUFBQSxNQUN4QixlQUFlO0FBQUEsTUFDZixnQkFBZ0I7QUFBQSxNQUNoQixhQUFhLFdBQVc7QUFBQSxNQUN4QixjQUFjLFdBQVc7QUFBQSxJQUMzQixDQUFDO0FBQUEsRUFDSCxVQUFFO0FBQ0EsZ0JBQVksUUFBUTtBQUFBLEVBQ3RCO0FBQ0Y7OztBRHZTQSxJQUFNLCtCQUErQjtBQUNyQyxJQUFNLCtCQUErQjtBQUFBLEVBQ25DLGFBQWE7QUFBQSxFQUNiLGNBQWM7QUFBQSxFQUNkLG9CQUFvQjtBQUN0QjtBQUVBLElBQU0scUJBQXFCLElBQUksU0FBb0I7QUFDakQsTUFBSSxPQUFPLFlBQVksZUFBZSxPQUFPLFFBQVEsU0FBUyxZQUFZO0FBQ3hFLFlBQVEsS0FBSyw4QkFBOEIsR0FBRyxJQUFJO0FBQUEsRUFDcEQ7QUFDRjtBQUVBLElBQU0scUJBQXFCLElBQUksU0FBb0I7QUFDakQsTUFBSSxPQUFPLFlBQVksZUFBZSxPQUFPLFFBQVEsU0FBUyxZQUFZO0FBQ3hFLFlBQVEsS0FBSyw4QkFBOEIsR0FBRyxJQUFJO0FBQUEsRUFDcEQ7QUFDRjtBQUVBLElBQU0sc0JBQXNCLElBQUksU0FBb0I7QUFDbEQsTUFBSSxPQUFPLFlBQVksZUFBZSxPQUFPLFFBQVEsVUFBVSxZQUFZO0FBQ3pFLFlBQVEsTUFBTSw4QkFBOEIsR0FBRyxJQUFJO0FBQUEsRUFDckQ7QUFDRjtBQUVBLElBQU0saUJBQWlCLENBQUMsU0FBeUI7QUFDL0MsTUFBSSxFQUFFLE9BQU8sR0FBSSxRQUFPO0FBQ3hCLE1BQUksUUFBUSxPQUFPLEtBQU0sUUFBTyxJQUFJLFFBQVEsT0FBTyxPQUFPLFFBQVEsQ0FBQyxDQUFDO0FBQ3BFLE1BQUksUUFBUSxLQUFNLFFBQU8sSUFBSSxPQUFPLE1BQU0sUUFBUSxDQUFDLENBQUM7QUFDcEQsU0FBTyxHQUFHLElBQUk7QUFDaEI7QUFFQSxJQUFNLG1CQUFtQixDQUFDLFNBQWU7QUFDdkMsU0FBTztBQUFBLElBQ0wsTUFBTSxTQUFTLEtBQUssSUFBSTtBQUFBLElBQ3hCLE1BQU0sU0FBUyxLQUFLLElBQUk7QUFBQSxJQUN4QixXQUFXLE9BQU8sS0FBSyxRQUFRLENBQUM7QUFBQSxJQUNoQyxVQUFVLGVBQWUsT0FBTyxLQUFLLFFBQVEsQ0FBQyxDQUFDO0FBQUEsSUFDL0MsY0FBYyxPQUFPLEtBQUssZ0JBQWdCLENBQUM7QUFBQSxFQUM3QztBQUNGO0FBRUEsSUFBTSxrQ0FBa0MsQ0FBQyxTQUE4QztBQUNyRixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsU0FBUztBQUFBLElBQ1QsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLE1BQ1IsTUFBTSxTQUFTLEtBQUssSUFBSTtBQUFBLE1BQ3hCLE1BQU0sU0FBUyxLQUFLLElBQUk7QUFBQSxNQUN4QixNQUFNLE9BQU8sS0FBSyxRQUFRLENBQUM7QUFBQSxNQUMzQixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTSxTQUFTLEtBQUssSUFBSTtBQUFBLE1BQ3hCLE1BQU0sU0FBUyxLQUFLLElBQUk7QUFBQSxNQUN4QixNQUFNLE9BQU8sS0FBSyxRQUFRLENBQUM7QUFBQSxNQUMzQixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0sMkJBQTJCLENBQUMsV0FBMEM7QUFDMUUsUUFBTSxhQUFhLEtBQUssSUFBSSxHQUFHLE9BQU8sU0FBUyxPQUFPLE9BQU8sT0FBTyxJQUFJO0FBQ3hFLFFBQU0sYUFBYSxPQUFPLFNBQVMsT0FBTyxJQUFJLGFBQWEsT0FBTyxTQUFTLE9BQU87QUFFbEYsU0FBTztBQUFBLElBQ0wsU0FBUyxPQUFPO0FBQUEsSUFDaEIsUUFBUSxPQUFPO0FBQUEsSUFDZixTQUFTLE9BQU87QUFBQSxJQUNoQixXQUFXLE9BQU87QUFBQSxJQUNsQixXQUFXLE9BQU87QUFBQSxJQUNsQixVQUFVO0FBQUEsTUFDUixHQUFHLE9BQU87QUFBQSxNQUNWLFVBQVUsZUFBZSxPQUFPLFNBQVMsSUFBSTtBQUFBLElBQy9DO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixHQUFHLE9BQU87QUFBQSxNQUNWLFVBQVUsZUFBZSxPQUFPLE9BQU8sSUFBSTtBQUFBLElBQzdDO0FBQUEsSUFDQTtBQUFBLElBQ0EsV0FBVyxlQUFlLFVBQVU7QUFBQSxJQUNwQyxZQUFZLE9BQU8sV0FBVyxRQUFRLENBQUMsQ0FBQztBQUFBLEVBQzFDO0FBQ0Y7QUFFQSxJQUFNLHlCQUF5QixDQUM3QixXQUNXO0FBQ1gsTUFBSSxDQUFDLE1BQU0sUUFBUSxNQUFNLEtBQUssT0FBTyxXQUFXLEVBQUcsUUFBTztBQUUxRCxTQUFPLE9BQ0osSUFBSSxDQUFDLFVBQVU7QUFDZCxVQUFNLFFBQVEsU0FBUyxPQUFPLEtBQUs7QUFDbkMsVUFBTSxVQUFVLFNBQVMsT0FBTyxPQUFPO0FBQ3ZDLFFBQUksU0FBUyxRQUFTLFFBQU8sR0FBRyxLQUFLLEtBQUssT0FBTztBQUNqRCxXQUFPLFdBQVc7QUFBQSxFQUNwQixDQUFDLEVBQ0EsT0FBTyxPQUFPLEVBQ2QsS0FBSyxLQUFLO0FBQ2Y7QUFFTyxJQUFNLGlDQUFpQyxDQUFDO0FBQUEsRUFDN0MsVUFBVTtBQUFBLEVBQ1YsWUFBWTtBQUFBLEVBQ1osZUFBZTtBQUFBLEVBQ2YsbUJBQW1CO0FBQUEsRUFDbkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0EsY0FBYztBQUFBLEVBQ2Q7QUFBQSxFQUNBO0FBQ0YsTUFBMEM7QUFDeEMsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsUUFBSSx3QkFBUyxLQUFLO0FBQzlELFFBQU0sQ0FBQyxNQUFNLE9BQU8sUUFBSSx3QkFBUyxLQUFLO0FBQ3RDLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBc0MsSUFBSTtBQUNoRixRQUFNLENBQUMsb0JBQW9CLHFCQUFxQixRQUFJLHdCQUFzQyxJQUFJO0FBQzlGLFFBQU0sQ0FBQyxtQkFBbUIsb0JBQW9CLFFBQUksd0JBQVMsQ0FBQztBQUM1RCxRQUFNLENBQUMsY0FBYyxlQUFlLFFBQUksd0JBQVMsRUFBRTtBQUNuRCxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQVMsRUFBRTtBQUM3QyxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQTZCLENBQUMsQ0FBQztBQUNqRSxRQUFNLENBQUMsc0JBQXNCLHVCQUF1QixRQUFJLHdCQUErQyxJQUFJO0FBQzNHLFFBQU0sb0JBQWdCLHNCQUFnRCxJQUFJO0FBQzFFLFFBQU0sNkJBQXlCLHNCQUE2QyxJQUFJO0FBQ2hGLFFBQU0sMkJBQXVCLHNCQUFzQixJQUFJO0FBRXZELFFBQU0sc0JBQWtCLHVCQUFRLE1BQU07QUFDcEMsVUFBTSx1QkFBdUIsc0JBQXNCO0FBQ25ELFFBQUkseUJBQXlCLGtCQUFrQjtBQUM3QyxhQUFPLEtBQUssaURBQWlELG9CQUFvQjtBQUFBLElBQ25GO0FBQ0EsUUFBSSx5QkFBeUIsa0JBQWtCO0FBQzdDLGFBQU8sS0FBSyxpREFBaUQsb0JBQW9CO0FBQUEsSUFDbkY7QUFDQSxRQUFJLHlCQUF5QixlQUFlO0FBQzFDLGFBQU8sS0FBSyw4Q0FBOEMsaUJBQWlCO0FBQUEsSUFDN0U7QUFDQSxRQUFJLHlCQUF5QixnQkFBZ0I7QUFDM0MsYUFBTyxLQUFLLDZDQUE2QyxrQkFBa0I7QUFBQSxJQUM3RTtBQUNBLFFBQUkseUJBQXlCLHNCQUFzQjtBQUNqRCxhQUFPLEtBQUssOENBQThDLHlCQUF5QjtBQUFBLElBQ3JGO0FBQ0EsUUFBSSx5QkFBeUIsUUFBUTtBQUNuQyxhQUFPLEtBQUssdUNBQXVDLE1BQU07QUFBQSxJQUMzRDtBQUNBLFdBQU87QUFBQSxFQUNULEdBQUcsQ0FBQyxvQkFBb0IsV0FBVyxDQUFDO0FBRXBDLCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsUUFBUSxxQkFBcUIsWUFBWSxLQUFNO0FBRXBELFVBQU0sY0FBYyxNQUFNO0FBQ3hCLFlBQU0sWUFBWSxxQkFBcUI7QUFDdkMsVUFBSSxjQUFjLEtBQU07QUFDeEIsMkJBQXFCLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLFNBQVMsQ0FBQztBQUFBLElBQzFEO0FBRUEsZ0JBQVk7QUFDWixVQUFNLGFBQWEsT0FBTyxZQUFZLGFBQWEsR0FBRztBQUN0RCxXQUFPLE1BQU07QUFDWCxhQUFPLGNBQWMsVUFBVTtBQUFBLElBQ2pDO0FBQUEsRUFDRixHQUFHLENBQUMsSUFBSSxDQUFDO0FBRVQsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxNQUFNO0FBQ1QsVUFBSSxnQkFBZ0IsTUFBTTtBQUN4Qiw4QkFBc0IsV0FBVztBQUFBLE1BQ25DO0FBQ0E7QUFBQSxJQUNGO0FBRUEsUUFBSSxnQkFBZ0IsUUFBUSxnQkFBZ0Isb0JBQW9CLGdCQUFnQixRQUFRO0FBQ3RGLDRCQUFzQixXQUFXO0FBQ2pDO0FBQUEsSUFDRjtBQUVBLDBCQUFzQixXQUFXO0FBQ2pDLFFBQUksZ0JBQWdCLGtCQUFrQjtBQUNwQztBQUFBLElBQ0Y7QUFFQSxVQUFNLFNBQW1CO0FBQUEsTUFDdkIsT0FBTyxXQUFXLE1BQU07QUFDdEIsOEJBQXNCLGFBQWE7QUFBQSxNQUNyQyxHQUFHLDZCQUE2QixXQUFXO0FBQUEsTUFDM0MsT0FBTyxXQUFXLE1BQU07QUFDdEIsOEJBQXNCLGNBQWM7QUFBQSxNQUN0QyxHQUFHLDZCQUE2QixZQUFZO0FBQUEsSUFDOUM7QUFFQSxRQUFJLGFBQWE7QUFDZixhQUFPO0FBQUEsUUFDTCxPQUFPLFdBQVcsTUFBTTtBQUN0QixnQ0FBc0Isb0JBQW9CO0FBQUEsUUFDNUMsR0FBRyw2QkFBNkIsa0JBQWtCO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBRUEsV0FBTyxNQUFNO0FBQ1gsYUFBTyxRQUFRLENBQUMsWUFBWSxPQUFPLGFBQWEsT0FBTyxDQUFDO0FBQUEsSUFDMUQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxNQUFNLGFBQWEsV0FBVyxDQUFDO0FBRW5DLFFBQU0scUJBQWlCLHVCQUFvQyxNQUFNO0FBQy9ELFVBQU0sZ0JBQXdDLGNBQzFDLENBQUMsa0JBQWtCLGtCQUFrQixlQUFlLGdCQUFnQixvQkFBb0IsSUFDeEYsQ0FBQyxrQkFBa0Isa0JBQWtCLGVBQWUsY0FBYztBQUV0RSxVQUFNLFlBQWtGO0FBQUEsTUFDdEYsZ0JBQWdCO0FBQUEsUUFDZCxPQUFPLEtBQUssa0RBQWtELGlCQUFpQjtBQUFBLFFBQy9FLGFBQWE7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxnQkFBZ0I7QUFBQSxRQUNkLE9BQU8sS0FBSyxpREFBaUQsaUJBQWlCO0FBQUEsUUFDOUUsYUFBYTtBQUFBLFVBQ1g7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQWE7QUFBQSxRQUNYLE9BQU8sS0FBSywrQ0FBK0MsY0FBYztBQUFBLFFBQ3pFLGFBQWE7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxjQUFjO0FBQUEsUUFDWixPQUFPLEtBQUssNkNBQTZDLHFCQUFxQjtBQUFBLFFBQzlFLGFBQWE7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxvQkFBb0I7QUFBQSxRQUNsQixPQUFPLEtBQUssK0NBQStDLHNCQUFzQjtBQUFBLFFBQ2pGLGFBQWE7QUFBQSxVQUNYO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSixPQUFPLEtBQUssdUNBQXVDLE1BQU07QUFBQSxRQUN6RCxhQUFhLEtBQUssdUNBQXVDLE1BQU07QUFBQSxNQUNqRTtBQUFBLElBQ0Y7QUFFQSxVQUFNLGlCQUNKLGdCQUFnQixTQUFTLGNBQWMsY0FBYyxTQUFTLENBQUMsSUFBSSxzQkFBc0I7QUFDM0YsVUFBTSxtQkFBbUIsaUJBQWlCLGNBQWMsUUFBUSxjQUFjLElBQUk7QUFFbEYsV0FBTyxjQUFjLElBQUksQ0FBQyxVQUFVLFdBQVc7QUFBQSxNQUM3QyxLQUFLO0FBQUEsTUFDTCxPQUFPLFVBQVUsUUFBUSxFQUFFO0FBQUEsTUFDM0IsYUFBYSxVQUFVLFFBQVEsRUFBRTtBQUFBLE1BQ2pDLE9BQ0UsZ0JBQWdCLFVBQVcsb0JBQW9CLEtBQUssUUFBUSxtQkFDeEQsY0FDQSxVQUFVLG1CQUNSLFdBQ0E7QUFBQSxJQUNWLEVBQUU7QUFBQSxFQUNKLEdBQUcsQ0FBQyxvQkFBb0IsYUFBYSxXQUFXLENBQUM7QUFFakQsUUFBTSxlQUFXLDJCQUFZLENBQUMsTUFBYyxZQUFvQjtBQUM5RCxVQUFNLGNBQWMsU0FBUyxPQUFPO0FBQ3BDLFFBQUksQ0FBQyxZQUFhO0FBRWxCLGlCQUFhLENBQUMsYUFBYTtBQUN6QixZQUFNLE9BQU87QUFBQSxRQUNYLEdBQUc7QUFBQSxRQUNIO0FBQUEsVUFDRTtBQUFBLFVBQ0EsU0FBUztBQUFBLFVBQ1QsS0FBSSxvQkFBSSxLQUFLLEdBQUUsWUFBWTtBQUFBLFFBQzdCO0FBQUEsTUFDRjtBQUNBLHVCQUFpQixJQUFJO0FBQ3JCLGFBQU87QUFBQSxJQUNULENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSw4QkFBMEIsMkJBQVksTUFBTTtBQUNoRCxVQUFNLFdBQVcsY0FBYyxTQUFTO0FBQ3hDLFFBQUksQ0FBQyxTQUFVO0FBQ2YsU0FBSyxzQkFBc0IsUUFBUSxFQUFFLE1BQU0sTUFBTTtBQUFBLElBRWpELENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxxQkFBaUIsMkJBQVksTUFBTTtBQUN2QywyQkFBdUIsVUFBVTtBQUNqQyxvQkFBZ0IsRUFBRTtBQUNsQiw0QkFBd0IsSUFBSTtBQUM1QixpQkFBYSxDQUFDLENBQUM7QUFDZixxQkFBaUIsQ0FBQyxDQUFDO0FBQUEsRUFDckIsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHNCQUFrQiwyQkFBWSxNQUFNO0FBQ3hDLFVBQU0sZUFBZSxTQUFTLGdCQUFnQjtBQUM5QyxRQUFJLENBQUMsY0FBYztBQUNqQixhQUFPO0FBQUEsUUFDTCx5QkFBeUI7QUFBQSxNQUMzQjtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsTUFDTCx5QkFBeUI7QUFBQSxNQUN6QixTQUFTO0FBQUEsUUFDUCxrQkFBa0I7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFBQSxFQUNGLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztBQUVyQixRQUFNLGtDQUE4QiwyQkFBWSxNQUFlO0FBQzdELFFBQUksQ0FBQyxvQkFBb0IsZ0JBQWdCLGlCQUFrQixlQUFlLENBQUMsU0FBVTtBQUNuRixrQkFBWTtBQUNaLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLGtCQUFrQixjQUFjLGVBQWUsYUFBYSxhQUFhLE9BQU8sQ0FBQztBQUVyRixRQUFNLDRCQUF3QiwyQkFBWSxDQUFDLFVBQTJCO0FBQ3BFLFFBQUksaUJBQWlCLGVBQWU7QUFDbEMsWUFBTSxpQkFBaUIsdUJBQXVCLE1BQU0sZ0JBQWdCO0FBQ3BFLFVBQUksZ0JBQWdCO0FBQ2xCLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxNQUFNLFdBQVcsS0FBSztBQUN4QixlQUFPLFNBQVMsTUFBTSxPQUFPLEtBQUssS0FBSywyQ0FBMkMsb0JBQW9CO0FBQUEsTUFDeEc7QUFDQSxVQUFJLE1BQU0sV0FBVyxLQUFLO0FBQ3hCLGVBQU8sS0FBSywwQ0FBMEMsbUJBQW1CO0FBQUEsTUFDM0U7QUFDQSxVQUFJLE1BQU0sV0FBVyxLQUFLO0FBQ3hCLGVBQU8sS0FBSyx3Q0FBd0MsZUFBZTtBQUFBLE1BQ3JFO0FBQUEsSUFDRjtBQUVBLFdBQU8saUJBQWlCLFNBQVMsU0FBUyxNQUFNLE9BQU8sSUFDbkQsU0FBUyxNQUFNLE9BQU8sSUFDdEIsS0FBSyxxQkFBcUIsaUJBQWlCO0FBQUEsRUFDakQsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLG1DQUErQjtBQUFBLElBQ25DLENBQUMsYUFBa0Q7QUFDakQsZUFBUyx1QkFBdUIsU0FBUyxTQUFTLE9BQU8sQ0FBQztBQUUxRCxZQUFNLGVBQWUsU0FBUyxNQUFNO0FBQ3BDLGVBQVMsaUJBQWlCLFNBQVMsY0FBYyxZQUFZLENBQUM7QUFDOUQsZUFBUyxzQkFBc0IsU0FBUyxjQUFjLFVBQVUsQ0FBQztBQUNqRSxlQUFTLHFCQUFxQixTQUFTLGNBQWMsWUFBWSxDQUFDO0FBQ2xFLGVBQVMsbUJBQW1CLFNBQVMsY0FBYyxjQUFjLENBQUM7QUFDbEUsZUFBUyxzQkFBc0IsU0FBUyxjQUFjLFNBQVMsQ0FBQztBQUFBLElBQ2xFO0FBQUEsSUFDQSxDQUFDLFFBQVE7QUFBQSxFQUNYO0FBRUEsUUFBTSx1Q0FBbUMsMkJBQVksQ0FBQyxhQUEwRDtBQUM5RyxVQUFNLE9BQU8sU0FBUztBQUN0QixVQUFNLFNBQVMsU0FBUyxNQUFNLE1BQU07QUFDcEMsVUFBTSxpQkFBaUIsU0FBUyxNQUFNLGNBQWM7QUFDcEQsVUFBTSxrQkFBa0IsU0FBUyxTQUFTLE9BQU87QUFDakQsVUFBTSxpQkFBaUIsdUJBQXVCLFNBQVMsTUFBTTtBQUM3RCxVQUFNLGFBQWEsU0FBUyxTQUFTLFVBQVU7QUFDL0MsVUFBTSxlQUF5QixDQUFDO0FBRWhDLFFBQUksU0FBUyxlQUFlLEtBQUs7QUFDL0IsbUJBQWEsS0FBSyxtQkFBbUIsS0FBSywyQ0FBMkMsb0JBQW9CLENBQUM7QUFDMUcsVUFBSSxZQUFZO0FBQ2QscUJBQWE7QUFBQSxVQUNYLFVBQVUsZ0RBQWdELG9CQUFvQixVQUFVO0FBQUEsUUFDMUY7QUFBQSxNQUNGO0FBQUEsSUFDRixXQUFXLGdCQUFnQjtBQUN6QixtQkFBYSxLQUFLLGNBQWM7QUFBQSxJQUNsQyxXQUFXLGlCQUFpQjtBQUMxQixtQkFBYSxLQUFLLGVBQWU7QUFBQSxJQUNuQyxXQUFXLFFBQVE7QUFDakIsbUJBQWE7QUFBQSxRQUNYO0FBQUEsVUFDRTtBQUFBLFVBQ0E7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsV0FBVyxTQUFTLGVBQWUsS0FBSztBQUN0QyxtQkFBYSxLQUFLLEtBQUssMENBQTBDLG1CQUFtQixDQUFDO0FBQUEsSUFDdkYsV0FBVyxTQUFTLGVBQWUsS0FBSztBQUN0QyxtQkFBYSxLQUFLLEtBQUssd0NBQXdDLGVBQWUsQ0FBQztBQUFBLElBQ2pGLE9BQU87QUFDTCxtQkFBYSxLQUFLLEtBQUsscUJBQXFCLGlCQUFpQixDQUFDO0FBQUEsSUFDaEU7QUFFQSxRQUFJLFVBQVUsZ0JBQWdCO0FBQzVCLG1CQUFhLEtBQUssVUFBVSx1Q0FBdUMseUJBQXlCLGNBQWMsQ0FBQztBQUFBLElBQzdHO0FBRUEsV0FBTyxhQUFhLE9BQU8sT0FBTyxFQUFFLEtBQUssR0FBRztBQUFBLEVBQzlDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSwwQkFBc0I7QUFBQSxJQUMxQixPQUFPLFFBQWdCLGVBQXdCLGFBQXFCO0FBQ2xFLHFCQUFlLE1BQU07QUFDckIsNEJBQXNCLE1BQU07QUFDNUIsWUFBTSxzQkFBc0IsUUFBUTtBQUNwQyxtQkFBYSxFQUFFO0FBQ2YsNkJBQXVCLFVBQVU7QUFDakMsOEJBQXdCLElBQUk7QUFDNUIsc0JBQWdCLGFBQWEsSUFBSTtBQUNqQyxjQUFRLEtBQUs7QUFDYixxQkFBZSxJQUFJO0FBQ25CLDRCQUFzQixJQUFJO0FBQzFCLDJCQUFxQixVQUFVO0FBQy9CLDJCQUFxQixDQUFDO0FBQ3RCLG9CQUFjLEVBQUUsUUFBUSxjQUFjLENBQUM7QUFBQSxJQUN6QztBQUFBLElBQ0EsQ0FBQyxXQUFXO0FBQUEsRUFDZDtBQUVBLFFBQU0seUJBQXFCO0FBQUEsSUFDekIsT0FBTyxNQUFZLFVBQWtCLFlBQXNEO0FBQ3pGLGNBQVEsSUFBSTtBQUNaLHFCQUFlLGdCQUFnQjtBQUMvQixxQkFBZTtBQUVmLFlBQU0sbUJBQW1CLEtBQUssSUFBSTtBQUNsQyx5QkFBbUIsZ0NBQWdDO0FBQUEsUUFDakQsV0FBVyxRQUFRO0FBQUEsUUFDbkIsUUFBUSxRQUFRO0FBQUEsUUFDaEI7QUFBQSxRQUNBO0FBQUEsUUFDQSx5QkFBeUIsS0FBSyxJQUFJLEdBQUcsbUJBQW1CLFFBQVEsU0FBUztBQUFBLFFBQ3pFLFlBQVksaUJBQWlCLElBQUk7QUFBQSxRQUNqQyxjQUFjLHlCQUF5QixRQUFRLFlBQVk7QUFBQSxRQUMzRCxTQUFTLGNBQWMsU0FBUyxPQUFPLElBQUk7QUFBQSxRQUMzQyxXQUFXLGNBQWMsU0FBUyxTQUFTLElBQUk7QUFBQSxNQUNqRCxDQUFDO0FBRUQsVUFBSTtBQUNGLGNBQU0sV0FBVyxNQUFNO0FBQUEsVUFDckI7QUFBQSxZQUNFLGFBQWE7QUFBQSxZQUNiLGNBQWMsU0FBUyxZQUFZLEVBQUUsWUFBWSxLQUFLO0FBQUEsWUFDdEQsc0JBQXNCLGNBQWMsU0FBUyxPQUFPLEtBQUssU0FBWTtBQUFBLFlBQ3JFLFdBQVcsY0FBYyxTQUFTLFNBQVMsS0FBSyxTQUFZO0FBQUEsVUFDOUQ7QUFBQSxVQUNBLGdCQUFnQjtBQUFBLFFBQ2xCO0FBRUEscUNBQTZCLFFBQVE7QUFFckMsY0FBTSxvQkFBb0IsS0FBSyxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksZ0JBQWdCO0FBRW5FLGNBQU0sU0FBUyxTQUFTLFNBQVMsTUFBTSxNQUFNO0FBQzdDLGNBQU0sZ0JBQWdCLFNBQVMsTUFBTSxrQkFBa0I7QUFDdkQsY0FBTSxlQUNKLFNBQ0k7QUFBQSxVQUNFO0FBQUEsVUFDQTtBQUFBLFVBQ0EsZ0JBQWdCLFNBQVMsU0FBUyxNQUFNLGNBQWM7QUFBQSxVQUN0RCxTQUFTLFNBQVMsU0FBUyxNQUFNLE9BQU87QUFBQSxVQUN4QyxVQUFVLFNBQVMsU0FBUyxNQUFNLFFBQVE7QUFBQSxVQUMxQyxlQUFlLFNBQVMsTUFBTSxpQkFBaUI7QUFBQSxRQUNqRCxJQUNBO0FBRU4sWUFBSSxjQUFjO0FBQ2hCLGlDQUF1QixVQUFVO0FBQUEsUUFDbkM7QUFFQSxZQUFJLFNBQVMsWUFBWSxNQUFNO0FBQzdCLGNBQUksQ0FBQyxRQUFRO0FBQ1gsa0JBQU0sSUFBSSxNQUFNLEtBQUssMENBQTBDLG1DQUFtQyxDQUFDO0FBQUEsVUFDckc7QUFFQSxnQkFBTSxvQkFBb0IsUUFBUSxlQUFlLFFBQVE7QUFDekQsNkJBQW1CLGtDQUFrQztBQUFBLFlBQ25ELFdBQVcsUUFBUTtBQUFBLFlBQ25CLFFBQVEsUUFBUTtBQUFBLFlBQ2hCLFdBQVc7QUFBQSxZQUNYLFlBQVksU0FBUztBQUFBLFlBQ3JCLFNBQVMsU0FBUyxTQUFTLE9BQU87QUFBQSxZQUNsQztBQUFBLFlBQ0E7QUFBQSxZQUNBLGdCQUFnQixTQUFTLFNBQVMsTUFBTSxjQUFjO0FBQUEsWUFDdEQsZUFBZSxTQUFTLE1BQU0saUJBQWlCO0FBQUEsWUFDL0MsY0FBYyxTQUFTLE1BQU0sZ0JBQWdCO0FBQUEsVUFDL0MsQ0FBQztBQUNEO0FBQUEsUUFDRjtBQUVBLFlBQUksY0FBYztBQUNoQixrQ0FBd0IsWUFBWTtBQUNwQyw2QkFBbUIsOEJBQThCO0FBQUEsWUFDL0MsV0FBVyxRQUFRO0FBQUEsWUFDbkIsUUFBUSxRQUFRO0FBQUEsWUFDaEIsV0FBVztBQUFBLFlBQ1gsUUFBUSxhQUFhO0FBQUEsWUFDckIsZUFBZSxhQUFhO0FBQUEsWUFDNUIsZ0JBQWdCLGFBQWE7QUFBQSxZQUM3QixlQUFlLGFBQWE7QUFBQSxVQUM5QixDQUFDO0FBQUEsUUFDSDtBQUVBLHdCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxnQkFBUSxLQUFLO0FBQ2IsdUJBQWUsSUFBSTtBQUNuQiw4QkFBc0IsSUFBSTtBQUMxQiw2QkFBcUIsVUFBVTtBQUMvQiw2QkFBcUIsQ0FBQztBQUN0QixjQUFNLGtCQUFrQixpQ0FBaUMsUUFBUTtBQUNqRSwyQkFBbUIsNkNBQTZDO0FBQUEsVUFDOUQsV0FBVyxRQUFRO0FBQUEsVUFDbkIsUUFBUSxRQUFRO0FBQUEsVUFDaEIsV0FBVztBQUFBLFVBQ1gsWUFBWSxTQUFTO0FBQUEsVUFDckIsU0FBUyxTQUFTLFNBQVMsT0FBTztBQUFBLFVBQ2xDO0FBQUEsVUFDQTtBQUFBLFVBQ0EsZ0JBQWdCLFNBQVMsU0FBUyxNQUFNLGNBQWM7QUFBQSxVQUN0RCxlQUFlLFNBQVMsTUFBTSxpQkFBaUI7QUFBQSxVQUMvQyxZQUFZLFNBQVMsU0FBUyxVQUFVO0FBQUEsVUFDeEMsU0FBUyxTQUFTLFNBQVMsT0FBTztBQUFBLFVBQ2xDO0FBQUEsVUFDQSxRQUFRLE1BQU0sUUFBUSxTQUFTLE1BQU0sSUFBSSxTQUFTLFNBQVMsQ0FBQztBQUFBLFVBQzVELGNBQWMsU0FBUyxNQUFNLGdCQUFnQjtBQUFBLFFBQy9DLENBQUM7QUFDRCx3QkFBZ0IsZUFBZTtBQUFBLE1BQ2pDLFNBQVMsT0FBTztBQUNkLFlBQUksaUJBQWlCLGVBQWU7QUFDbEMsbUJBQVMsNkJBQTZCLHdCQUF3QixLQUFLLENBQUM7QUFBQSxRQUN0RTtBQUVBLDRCQUFvQiwrQkFBK0I7QUFBQSxVQUNqRCxXQUFXLFFBQVE7QUFBQSxVQUNuQixRQUFRLFFBQVE7QUFBQSxVQUNoQixXQUFXLEtBQUssSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLGdCQUFnQjtBQUFBLFVBQ3BELFlBQVksaUJBQWlCLElBQUk7QUFBQSxVQUNqQyxTQUFTLGlCQUFpQixnQkFBZ0Isd0JBQXdCLEtBQUssSUFBSTtBQUFBLFVBQzNFLFFBQVEsaUJBQWlCLGdCQUFnQixNQUFNLFNBQVM7QUFBQSxVQUN4RCxTQUFTLGlCQUFpQixRQUFRLFNBQVMsTUFBTSxPQUFPLElBQUk7QUFBQSxVQUM1RCxrQkFBa0IsaUJBQWlCLGdCQUFnQixNQUFNLG1CQUFtQixDQUFDO0FBQUEsUUFDL0UsQ0FBQztBQUNELHdCQUFnQixnQkFBZ0IsSUFBSTtBQUNwQyxnQkFBUSxLQUFLO0FBQ2IsdUJBQWUsSUFBSTtBQUNuQiw4QkFBc0IsSUFBSTtBQUMxQiw2QkFBcUIsVUFBVTtBQUMvQiw2QkFBcUIsQ0FBQztBQUN0Qix3QkFBZ0Isc0JBQXNCLEtBQUssQ0FBQztBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSx5QkFBcUI7QUFBQSxJQUN6QixPQUFPLE1BQW1CLFdBQTZDO0FBQ3JFLFVBQUksQ0FBQyxLQUFNO0FBRVgsWUFBTUMsYUFBWSxpQkFBaUI7QUFDbkMsWUFBTSxxQkFBcUIsS0FBSyxJQUFJO0FBQ3BDLG1CQUFhQSxVQUFTO0FBQ3RCLHlCQUFtQixzQkFBc0I7QUFBQSxRQUN2QyxXQUFBQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxNQUFNLGlCQUFpQixJQUFJO0FBQUEsTUFDN0IsQ0FBQztBQUVELFVBQUksQ0FBQyw0QkFBNEIsR0FBRztBQUNsQywyQkFBbUIsdUJBQXVCO0FBQUEsVUFDeEMsV0FBQUE7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsWUFBWSxDQUFDLENBQUMsU0FBUyxPQUFPO0FBQUEsUUFDaEMsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLFlBQU0sV0FBVyxTQUFTLEtBQUssSUFBSSxFQUFFLFlBQVk7QUFDakQsVUFBSSxZQUFZLENBQUMsU0FBUyxXQUFXLFFBQVEsS0FBSyxDQUFDLHVCQUF1QixLQUFLLEtBQUssUUFBUSxFQUFFLEdBQUc7QUFDL0YsMkJBQW1CLCtCQUErQjtBQUFBLFVBQ2hELFdBQUFBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsTUFBTSxpQkFBaUIsSUFBSTtBQUFBLFVBQzNCLFFBQVE7QUFBQSxRQUNWLENBQUM7QUFDRCx3QkFBZ0IsS0FBSywwQ0FBMEMsMkJBQTJCLENBQUM7QUFDM0Y7QUFBQSxNQUNGO0FBQ0EsVUFBSSxDQUFDLDJCQUEyQixJQUFJLEdBQUc7QUFDckMsMkJBQW1CLCtCQUErQjtBQUFBLFVBQ2hELFdBQUFBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsTUFBTSxpQkFBaUIsSUFBSTtBQUFBLFVBQzNCLFFBQVE7QUFBQSxRQUNWLENBQUM7QUFDRCx3QkFBZ0IsS0FBSywwQ0FBMEMsMkJBQTJCLENBQUM7QUFDM0Y7QUFBQSxNQUNGO0FBRUEscUJBQWU7QUFDZixxQkFBZSxnQkFBZ0I7QUFDL0IsNEJBQXNCLGdCQUFnQjtBQUN0QywyQkFBcUIsVUFBVTtBQUMvQiwyQkFBcUIsQ0FBQztBQUN0Qix5QkFBbUIsd0JBQXdCO0FBQUEsUUFDekMsV0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQSxNQUFNLGlCQUFpQixJQUFJO0FBQUEsTUFDN0IsQ0FBQztBQUVELFlBQU0scUJBQXFCLE1BQU0sNkJBQTZCLElBQUksRUFBRSxNQUFNLENBQUMsVUFBVTtBQUNuRiwyQkFBbUIsdUJBQXVCO0FBQUEsVUFDeEMsV0FBQUE7QUFBQSxVQUNBO0FBQUEsVUFDQSxNQUFNLGlCQUFpQixJQUFJO0FBQUEsVUFDM0IsU0FBUyxpQkFBaUIsUUFBUSxTQUFTLE1BQU0sT0FBTyxJQUFJO0FBQUEsUUFDOUQsQ0FBQztBQUNELGVBQU8sZ0NBQWdDLElBQUk7QUFBQSxNQUM3QyxDQUFDO0FBQ0QsWUFBTSxhQUFhLG1CQUFtQjtBQUN0Qyx5QkFBbUIsMEJBQTBCO0FBQUEsUUFDM0MsV0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQSxHQUFHLHlCQUF5QixrQkFBa0I7QUFBQSxNQUNoRCxDQUFDO0FBRUQsVUFBSSxXQUFXLE9BQU8sNkJBQTZCO0FBQ2pELDJCQUFtQiw4QkFBOEI7QUFBQSxVQUMvQyxXQUFBQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLGNBQWM7QUFBQSxVQUNkLGFBQWEsZUFBZSwyQkFBMkI7QUFBQSxVQUN2RCxNQUFNLGlCQUFpQixVQUFVO0FBQUEsVUFDakMsY0FBYyx5QkFBeUIsa0JBQWtCO0FBQUEsUUFDM0QsQ0FBQztBQUNELHVCQUFlLElBQUk7QUFDbkIsOEJBQXNCLElBQUk7QUFDMUIsNkJBQXFCLFVBQVU7QUFDL0IsNkJBQXFCLENBQUM7QUFDdEIsd0JBQWdCLEtBQUssMENBQTBDLDhCQUE4QixDQUFDO0FBQzlGO0FBQUEsTUFDRjtBQUVBLFlBQU0sV0FBV0E7QUFDakIsb0JBQWMsVUFBVSxFQUFFLFVBQVUsTUFBTSxXQUFXO0FBQ3JELHlCQUFtQix1QkFBdUI7QUFBQSxRQUN4QyxXQUFBQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxNQUFNLGlCQUFpQixVQUFVO0FBQUEsTUFDbkMsQ0FBQztBQUNELFdBQUssZUFBZSxVQUFVLFVBQVUsRUFDckMsS0FBSyxNQUFNO0FBQ1YsMkJBQW1CLHlCQUF5QjtBQUFBLFVBQzFDLFdBQUFBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLE1BQU0saUJBQWlCLFVBQVU7QUFBQSxRQUNuQyxDQUFDO0FBQUEsTUFDSCxDQUFDLEVBQ0EsTUFBTSxDQUFDLFVBQVU7QUFDaEIsMkJBQW1CLHNCQUFzQjtBQUFBLFVBQ3ZDLFdBQUFBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBLE1BQU0saUJBQWlCLFVBQVU7QUFBQSxVQUNqQyxTQUFTLGlCQUFpQixRQUFRLFNBQVMsTUFBTSxPQUFPLElBQUk7QUFBQSxRQUM5RCxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUgsWUFBTSxtQkFBbUIsWUFBWSxVQUFVO0FBQUEsUUFDN0MsV0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxjQUFjO0FBQUEsTUFDaEIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLENBQUMsa0JBQWtCLGdCQUFnQiw2QkFBNkIsY0FBYyxlQUFlLGFBQWEsb0JBQW9CLE9BQU87QUFBQSxFQUN2STtBQUVBLFFBQU0seUJBQXFCLDJCQUFZLFlBQVk7QUFDakQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx3QkFBb0IsMkJBQVksTUFBTTtBQUMxQyxVQUFNLGdCQUFnQix3QkFBd0IsdUJBQXVCO0FBQ3JFLFVBQU0sU0FBUyxTQUFTLGVBQWUsTUFBTTtBQUM3QyxRQUFJLENBQUMsT0FBUTtBQUViLDRCQUF3QjtBQUN4QixpQkFBYSxFQUFFO0FBQ2Ysb0JBQWdCLEVBQUU7QUFDbEIsNEJBQXdCLElBQUk7QUFDNUIsa0JBQWMsRUFBRSxRQUFRLGVBQWUsZUFBZSxrQkFBa0IsS0FBSyxDQUFDO0FBQUEsRUFDaEYsR0FBRyxDQUFDLHlCQUF5QixhQUFhLG9CQUFvQixDQUFDO0FBRS9ELFFBQU0sdUJBQW1CLDJCQUFZLE1BQU07QUFDekMsUUFBSSxDQUFDLDRCQUE0QixFQUFHO0FBQ3BDLG9CQUFnQixFQUFFO0FBQ2xCLDRCQUF3QixJQUFJO0FBQzVCLHdCQUFvQixJQUFJO0FBQUEsRUFDMUIsR0FBRyxDQUFDLDJCQUEyQixDQUFDO0FBRWhDLFFBQU0sd0JBQW9CLDJCQUFZLE1BQU07QUFDMUMsUUFBSSxLQUFNO0FBQ1Ysd0JBQW9CLEtBQUs7QUFBQSxFQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDO0FBRVQsUUFBTSw4QkFBMEIsMkJBQVksWUFBcUM7QUFDL0UsUUFBSSxPQUFPLGNBQWMsWUFBYSxRQUFPO0FBQzdDLFVBQU0sZUFBZSxVQUFVO0FBQy9CLFFBQUksQ0FBQyxnQkFBZ0IsT0FBTyxhQUFhLGlCQUFpQixXQUFZLFFBQU87QUFFN0UsUUFBSTtBQUNGLFlBQU0sU0FBUyxNQUFNLGFBQWEsYUFBYTtBQUFBLFFBQzdDLE9BQU8sRUFBRSxZQUFZLGNBQWM7QUFBQSxNQUNyQyxDQUFDO0FBQ0QsYUFBTyxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsTUFBTSxLQUFLLENBQUM7QUFDbEQsYUFBTztBQUFBLElBQ1QsUUFBUTtBQUNOLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsT0FBTyxpQkFBMEM7QUFDL0MsVUFBSSxDQUFDLGFBQWM7QUFDbkIsWUFBTSxVQUFVLE1BQU0sd0JBQXdCO0FBQzlDLFVBQUksWUFBWSxPQUFPO0FBQ3JCLHdCQUFnQixLQUFLLGtEQUFrRCxnQ0FBZ0MsQ0FBQztBQUN4RztBQUFBLE1BQ0Y7QUFDQSwwQkFBb0IsS0FBSztBQUN6QixtQkFBYSxNQUFNO0FBQUEsSUFDckI7QUFBQSxJQUNBLENBQUMsdUJBQXVCO0FBQUEsRUFDMUI7QUFFQSxRQUFNLHdCQUFvQiwyQkFBWSxDQUFDLGlCQUEwQztBQUMvRSxRQUFJLENBQUMsYUFBYztBQUNuQix3QkFBb0IsS0FBSztBQUN6QixpQkFBYSxNQUFNO0FBQUEsRUFDckIsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGlCQUFhLDJCQUFZLE1BQU07QUFDbkMsNEJBQXdCO0FBQ3hCLDJCQUF1QixVQUFVO0FBQ2pDLGlCQUFhLEVBQUU7QUFDZixvQkFBZ0IsRUFBRTtBQUNsQiw0QkFBd0IsSUFBSTtBQUM1QiwwQkFBc0IsSUFBSTtBQUMxQix5QkFBcUIsVUFBVTtBQUMvQix5QkFBcUIsQ0FBQztBQUFBLEVBQ3hCLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztBQUU1QixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLElBQ3ZCLHlCQUF5Qix5QkFBeUI7QUFBQSxJQUNsRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJhdHRlbXB0SWQiXQp9Cg==
