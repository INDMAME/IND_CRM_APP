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
  Spinner_default,
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
        "inline-block w-full rounded-[5px] disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "col-span-2" : "",
        className || ""
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex min-h-[68px] w-full items-center justify-center rounded-[5px] border border-[#001f4d]/80 bg-primary px-4 py-3.5 text-center text-[18px] font-bold leading-[1.1] text-white shadow-xs transition-colors duration-150 hover:bg-[#001f4d] sm:min-h-[72px] sm:px-5 sm:py-4 sm:text-[20px]", children: label })
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
  stages = []
}) => {
  if (!open) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/40 px-4 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "glass-panel shadow-card w-full max-w-lg rounded-[28px] border border-slate-200 bg-white/95 p-5", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner_default, { size: "h-6 w-6", label: indT("Common_Loading", "Loading") }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-[15px] font-semibold text-slate-900", children: title || indT("ExpenseSheets_NewTicket_Progress_Title", "Processing ticket") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "mt-1 text-sm text-slate-600", children: summary || indT("ExpenseSheets_NewTicket_Status_CreatingTicket", "Creating ticket...") }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "mt-3 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: indT("ExpenseSheets_NewTicket_Progress_Elapsed", "Elapsed time") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-mono text-[12px] text-slate-700", children: formatElapsedLabel(elapsedMs) })
        ] })
      ] })
    ] }),
    stages.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-5 space-y-3", children: stages.map((stage) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        className: stage.state === "active" ? "rounded-2xl border border-sky-200 bg-sky-50/80 px-3 py-3" : stage.state === "completed" ? "rounded-2xl border border-emerald-200 bg-emerald-50/70 px-3 py-3" : "rounded-2xl border border-slate-200 bg-white px-3 py-3",
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
  ] }) });
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC90aWNrZXRJbWFnZU9wdGltaXphdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQsIGlzVmFsaWRFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5LnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxuY29uc3QgTUFYX1BBR0VfQk9UVE9NX0FDVElPTlMgPSA0O1xuY29uc3QgUEFHRV9CT1RUT01fQUNUSU9OU19UT1BfUEFERElOR19QWCA9IDEyO1xuY29uc3QgUEFHRV9CT1RUT01fQUNUSU9OU19TSURFX1BBRERJTkdfUFggPSA4O1xuXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBvbkNsaWNrPzogUmVhY3QuTW91c2VFdmVudEhhbmRsZXI8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGFyaWFMYWJlbD86IHN0cmluZztcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xuICB0YWJJbmRleD86IG51bWJlcjtcbiAgZnVsbFdpZHRoPzogYm9vbGVhbjtcbn07XG5cbnR5cGUgUGFnZUJvdHRvbUFjdGlvbnNQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIER1bWIgYnV0dG9uIHVzZWQgYnkgdGhlIHNoYXJlZCBib3R0b20gYWN0aW9uIGJhci5cbmV4cG9ydCBjb25zdCBQYWdlQm90dG9tQWN0aW9uQnV0dG9uID0gKHtcbiAgbGFiZWwsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgYXJpYUxhYmVsLFxuICB0eXBlID0gXCJidXR0b25cIixcbiAgdGFiSW5kZXgsXG4gIGZ1bGxXaWR0aCA9IGZhbHNlLFxufTogUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT17dHlwZX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XG4gICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgIFwiaW5saW5lLWJsb2NrIHctZnVsbCByb3VuZGVkLVs1cHhdIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTYwXCIsXG4gICAgICAgIGZ1bGxXaWR0aCA/IFwiY29sLXNwYW4tMlwiIDogXCJcIixcbiAgICAgICAgY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICl9XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBtaW4taC1bNjhweF0gdy1mdWxsIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLVs1cHhdIGJvcmRlciBib3JkZXItWyMwMDFmNGRdLzgwIGJnLXByaW1hcnkgcHgtNCBweS0zLjUgdGV4dC1jZW50ZXIgdGV4dC1bMThweF0gZm9udC1ib2xkIGxlYWRpbmctWzEuMV0gdGV4dC13aGl0ZSBzaGFkb3cteHMgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMTUwIGhvdmVyOmJnLVsjMDAxZjRkXSBzbTptaW4taC1bNzJweF0gc206cHgtNSBzbTpweS00IHNtOnRleHQtWzIwcHhdXCI+XG4gICAgICAgIHtsYWJlbH1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L2J1dHRvbj5cbiAgKTtcbn07XG5cblBhZ2VCb3R0b21BY3Rpb25CdXR0b24uZGlzcGxheU5hbWUgPSBcIlBhZ2VCb3R0b21BY3Rpb25CdXR0b25cIjtcblxuLy8gRml4ZWQgYm90dG9tIGFjdGlvbiBiYXIgdGhhdCBzdGF5cyB2aXNpYmxlIHdoaWxlIHRoZSBwYWdlIHNjcm9sbHMuXG5jb25zdCBQYWdlQm90dG9tQWN0aW9ucyA9ICh7IGNoaWxkcmVuLCBhcmlhTGFiZWwsIGNsYXNzTmFtZSB9OiBQYWdlQm90dG9tQWN0aW9uc1Byb3BzKSA9PiB7XG4gIGNvbnN0IGFjdGlvbkJ1dHRvbnMgPSBDaGlsZHJlbi50b0FycmF5KGNoaWxkcmVuKVxuICAgIC5maWx0ZXIoXG4gICAgICAoY2hpbGQpOiBjaGlsZCBpcyBSZWFjdC5SZWFjdEVsZW1lbnQ8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzPiA9PlxuICAgICAgICBpc1ZhbGlkRWxlbWVudDxQYWdlQm90dG9tQWN0aW9uQnV0dG9uUHJvcHM+KGNoaWxkKSAmJiBjaGlsZC50eXBlID09PSBQYWdlQm90dG9tQWN0aW9uQnV0dG9uXG4gICAgKVxuICAgIC5zbGljZSgwLCBNQVhfUEFHRV9CT1RUT01fQUNUSU9OUyk7XG5cbiAgY29uc3QgYWN0aW9uQ291bnQgPSBhY3Rpb25CdXR0b25zLmxlbmd0aDtcbiAgY29uc3QgeyByZXNlcnZlZEhlaWdodCwgd3JhcHBlclJlZiwgY29udGVudEluc2V0cyB9ID0gdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5KCk7XG4gIGNvbnN0IHBvcnRhbFRhcmdldCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBkb2N1bWVudC5ib2R5O1xuXG4gIGlmIChhY3Rpb25Db3VudCA8IDEpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGFjdGlvbkJhciA9IChcbiAgICA8ZGl2XG4gICAgICByZWY9e3dyYXBwZXJSZWZ9XG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC14LTAgYm90dG9tLTAgei0xOTAwIGJvcmRlci10IGJvcmRlci1zbGF0ZS0yMDAvOTAgYmctd2hpdGUgc2hhZG93LVswXy0xMHB4XzI4cHhfcmdiYSgxNSwyMyw0MiwwLjEyKV1cIlxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICBwYWRkaW5nVG9wOiBgJHtQQUdFX0JPVFRPTV9BQ1RJT05TX1RPUF9QQURESU5HX1BYfXB4YCxcbiAgICAgICAgICBwYWRkaW5nTGVmdDogYCR7Y29udGVudEluc2V0cz8ubGVmdCA/PyBQQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfUEFERElOR19QWH1weGAsXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0OiBgJHtjb250ZW50SW5zZXRzPy5yaWdodCA/PyBQQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfUEFERElOR19QWH1weGAsXG4gICAgICAgICAgcGFkZGluZ0JvdHRvbTogXCJjYWxjKDAuNzVyZW0gKyBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSwgMHB4KSlcIixcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJvbGU9XCJ0b29sYmFyXCJcbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwicG9pbnRlci1ldmVudHMtYXV0byB3LWZ1bGxcIiwgY2xhc3NOYW1lIHx8IFwiXCIpfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIHthY3Rpb25CdXR0b25zLm1hcCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNob3VsZFVzZUZ1bGxXaWR0aCA9IGFjdGlvbkNvdW50ID09PSAxIHx8IChhY3Rpb25Db3VudCAlIDIgPT09IDEgJiYgaW5kZXggPT09IGFjdGlvbkNvdW50IC0gMSk7XG4gICAgICAgICAgICAgIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBmdWxsV2lkdGg6IHNob3VsZFVzZUZ1bGxXaWR0aCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQucHJvcHMudGFiSW5kZXgsXG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgPz8gYHBhZ2UtYm90dG9tLWFjdGlvbi0ke2luZGV4fWAsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT17eyBoZWlnaHQ6IGAke3Jlc2VydmVkSGVpZ2h0fXB4YCB9fSAvPlxuICAgICAge3BvcnRhbFRhcmdldCA/IGNyZWF0ZVBvcnRhbChhY3Rpb25CYXIsIHBvcnRhbFRhcmdldCkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnZUJvdHRvbUFjdGlvbnM7XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VFZmZlY3RFdmVudCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB0eXBlIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25zSW5zZXRzID0ge1xuICBsZWZ0OiBudW1iZXI7XG4gIHJpZ2h0OiBudW1iZXI7XG59O1xuXG50eXBlIFVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eVJlc3VsdCA9IHtcbiAgcmVzZXJ2ZWRIZWlnaHQ6IG51bWJlcjtcbiAgd3JhcHBlclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIGNvbnRlbnRJbnNldHM6IFBhZ2VCb3R0b21BY3Rpb25zSW5zZXRzIHwgbnVsbDtcbn07XG5cbmNvbnN0IE1JTl9QQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfR0FQID0gODtcblxuLy8gUmV0dXJucyB0cnVlIHdoZW4gdGhlIGNhcmQgaXMgcmVuZGVyZWQgYW5kIGNhbiBiZSB1c2VkIGFzIGEgbGF5b3V0IHJlZmVyZW5jZS5cbmNvbnN0IGlzVmlzaWJsZUxheW91dENhcmQgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgaWYgKHN0eWxlcy5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBzdHlsZXMudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4gcmVjdC53aWR0aCA+IDAgJiYgcmVjdC5oZWlnaHQgPiAwO1xufTtcblxuLy8gRmluZHMgdGhlIGZpcnN0IHZpc2libGUgdGltZWxpbmUgY2FyZCBhbmQgbWFwcyBpdHMgaG9yaXpvbnRhbCBmcmFtZSB0byB2aWV3cG9ydCBpbnNldHMuXG5jb25zdCByZXNvbHZlVGltZWxpbmVDYXJkSW5zZXRzID0gKCk6IFBhZ2VCb3R0b21BY3Rpb25zSW5zZXRzIHwgbnVsbCA9PiB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1pdGVtIC50aW1lbGluZS1jYXJkLCAudGltZWxpbmUtYm94IC50aW1lbGluZS1jYXJkXCIpO1xuICBmb3IgKGNvbnN0IGNhcmQgb2YgY2FyZHMpIHtcbiAgICBpZiAoIWlzVmlzaWJsZUxheW91dENhcmQoY2FyZCkpIGNvbnRpbnVlO1xuXG4gICAgY29uc3QgcmVjdCA9IGNhcmQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCAwO1xuICAgIGlmICh2aWV3cG9ydFdpZHRoIDw9IDApIHJldHVybiBudWxsO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IE1hdGgubWF4KE1JTl9QQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfR0FQLCBNYXRoLnJvdW5kKHJlY3QubGVmdCkpLFxuICAgICAgcmlnaHQ6IE1hdGgubWF4KE1JTl9QQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfR0FQLCBNYXRoLnJvdW5kKHZpZXdwb3J0V2lkdGggLSByZWN0LnJpZ2h0KSksXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuLy8gVHJhY2tzIHRoZSBib3R0b20gYWN0aW9uIGJhciBoZWlnaHQgc28gdGhlIHBhZ2UgcmVzZXJ2ZXMgZW5vdWdoIHNwYWNlIGZvciBpdC5cbmV4cG9ydCBjb25zdCB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkgPSAoKTogVXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5UmVzdWx0ID0+IHtcbiAgY29uc3Qgd3JhcHBlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBhbmltYXRpb25GcmFtZVJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Jlc2VydmVkSGVpZ2h0LCBzZXRSZXNlcnZlZEhlaWdodF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2NvbnRlbnRJbnNldHMsIHNldENvbnRlbnRJbnNldHNdID0gdXNlU3RhdGU8UGFnZUJvdHRvbUFjdGlvbnNJbnNldHMgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBtZWFzdXJlTGF5b3V0ID0gdXNlRWZmZWN0RXZlbnQoKCkgPT4ge1xuICAgIGNvbnN0IHdyYXBwZXIgPSB3cmFwcGVyUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCF3cmFwcGVyKSByZXR1cm47XG5cbiAgICBjb25zdCBuZXh0SGVpZ2h0ID0gTWF0aC5jZWlsKHdyYXBwZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KTtcbiAgICBzZXRSZXNlcnZlZEhlaWdodCgocHJldmlvdXMpID0+IChNYXRoLmFicyhwcmV2aW91cyAtIG5leHRIZWlnaHQpIDwgMSA/IHByZXZpb3VzIDogbmV4dEhlaWdodCkpO1xuXG4gICAgY29uc3QgbmV4dEluc2V0cyA9IHJlc29sdmVUaW1lbGluZUNhcmRJbnNldHMoKTtcbiAgICBzZXRDb250ZW50SW5zZXRzKChwcmV2aW91cykgPT4ge1xuICAgICAgaWYgKCFwcmV2aW91cyAmJiAhbmV4dEluc2V0cykgcmV0dXJuIHByZXZpb3VzO1xuICAgICAgaWYgKHByZXZpb3VzICYmIG5leHRJbnNldHMgJiYgcHJldmlvdXMubGVmdCA9PT0gbmV4dEluc2V0cy5sZWZ0ICYmIHByZXZpb3VzLnJpZ2h0ID09PSBuZXh0SW5zZXRzLnJpZ2h0KSB7XG4gICAgICAgIHJldHVybiBwcmV2aW91cztcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXh0SW5zZXRzO1xuICAgIH0pO1xuICB9KTtcblxuICBjb25zdCBzY2hlZHVsZU1lYXN1cmUgPSB1c2VFZmZlY3RFdmVudCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIGlmIChhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBtZWFzdXJlTGF5b3V0KCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgbWVhc3VyZUxheW91dCgpO1xuXG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIGNvbnN0IHdyYXBwZXIgPSB3cmFwcGVyUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCF3cmFwcGVyKSByZXR1cm47XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiB7XG4gICAgICBzY2hlZHVsZU1lYXN1cmUoKTtcbiAgICB9KTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUod3JhcHBlcik7XG4gICAgcmV0dXJuICgpID0+IG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgaWYgKCFib2R5KSByZXR1cm47XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIHNjaGVkdWxlTWVhc3VyZSgpO1xuICAgIH0pO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShib2R5LCB7XG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIHNjaGVkdWxlTWVhc3VyZSgpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIGhhbmRsZVJlc2l6ZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlUmVzaXplKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcblxuICAgICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtdKTtcblxuICByZXR1cm4ge1xuICAgIHJlc2VydmVkSGVpZ2h0LFxuICAgIHdyYXBwZXJSZWYsXG4gICAgY29udGVudEluc2V0cyxcbiAgfTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeFwiO1xuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5cbnR5cGUgUHJvZ3Jlc3NTdGFnZSA9IHtcbiAga2V5OiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIHN0YXRlOiBcImNvbXBsZXRlZFwiIHwgXCJhY3RpdmVcIiB8IFwicGVuZGluZ1wiO1xufTtcblxudHlwZSBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXlQcm9wcyA9IHtcbiAgb3BlbjogYm9vbGVhbjtcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIHN1bW1hcnk/OiBzdHJpbmc7XG4gIGVsYXBzZWRNcz86IG51bWJlcjtcbiAgc3RhZ2VzPzogUHJvZ3Jlc3NTdGFnZVtdO1xufTtcblxuY29uc3QgZm9ybWF0RWxhcHNlZExhYmVsID0gKGVsYXBzZWRNczogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgY29uc3Qgc2FmZUVsYXBzZWRNcyA9IE51bWJlci5pc0Zpbml0ZShlbGFwc2VkTXMpICYmIGVsYXBzZWRNcyA+IDAgPyBlbGFwc2VkTXMgOiAwO1xuICBjb25zdCB0b3RhbFNlY29uZHMgPSBNYXRoLmZsb29yKHNhZmVFbGFwc2VkTXMgLyAxMDAwKTtcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApO1xuICBjb25zdCBzZWNvbmRzID0gdG90YWxTZWNvbmRzICUgNjA7XG4gIHJldHVybiBgJHtTdHJpbmcobWludXRlcykucGFkU3RhcnQoMiwgXCIwXCIpfToke1N0cmluZyhzZWNvbmRzKS5wYWRTdGFydCgyLCBcIjBcIil9YDtcbn07XG5cbmNvbnN0IHJlc29sdmVTdGFnZUJhZGdlID0gKHN0YWdlOiBQcm9ncmVzc1N0YWdlKSA9PiB7XG4gIGlmIChzdGFnZS5zdGF0ZSA9PT0gXCJjb21wbGV0ZWRcIikge1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGgtOCB3LTggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTEwMCB0ZXh0LWVtZXJhbGQtNzAwXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiPlxuICAgICAgICAgIDxwYXRoIGQ9XCJNNSAxMC41IDguNSAxNCAxNSA2LjVcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgLz5cbiAgICAgICAgPC9zdmc+XG4gICAgICA8L3NwYW4+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChzdGFnZS5zdGF0ZSA9PT0gXCJhY3RpdmVcIikge1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGgtOCB3LTggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBiZy1za3ktMTAwIHRleHQtc2t5LTcwMFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIGxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfSAvPlxuICAgICAgPC9zcGFuPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxzcGFuXG4gICAgICBjbGFzc05hbWU9XCJmbGV4IGgtOCB3LTggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSB0ZXh0LXNsYXRlLTQwMFwiXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgID5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImgtMi41IHctMi41IHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS0yMDBcIiAvPlxuICAgIDwvc3Bhbj5cbiAgKTtcbn07XG5cbi8vIFNob3dzIG9uZSBzdGFnZWQgcHJvZ3Jlc3Mgb3ZlcmxheSB3aGlsZSB0aGUgY29tcG9zaXRlIHF1aWNrLXRpY2tldCByZXF1ZXN0IGlzIGluIGZsaWdodC5cbmNvbnN0IEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheSA9ICh7XG4gIG9wZW4sXG4gIHRpdGxlLFxuICBzdW1tYXJ5LFxuICBlbGFwc2VkTXMgPSAwLFxuICBzdGFnZXMgPSBbXSxcbn06IEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheVByb3BzKSA9PiB7XG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQwIHB4LTQgcHktNlwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJnbGFzcy1wYW5lbCBzaGFkb3ctY2FyZCB3LWZ1bGwgbWF4LXctbGcgcm91bmRlZC1bMjhweF0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUvOTUgcC01XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBoLTEyIHctMTIgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtMnhsIGJnLXNreS01MCB0ZXh0LXNreS03MDBcIj5cbiAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTYgdy02XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMVwiPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTVweF0gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgICB7dGl0bGUgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1RpdGxlXCIsIFwiUHJvY2Vzc2luZyB0aWNrZXRcIil9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQtc20gdGV4dC1zbGF0ZS02MDBcIj5cbiAgICAgICAgICAgICAge3N1bW1hcnkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19DcmVhdGluZ1RpY2tldFwiLCBcIkNyZWF0aW5nIHRpY2tldC4uLlwiKX1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctc2xhdGUtNTAgcHgtMyBweS0yIHRleHQteHMgdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19FbGFwc2VkXCIsIFwiRWxhcHNlZCB0aW1lXCIpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzEycHhdIHRleHQtc2xhdGUtNzAwXCI+e2Zvcm1hdEVsYXBzZWRMYWJlbChlbGFwc2VkTXMpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7c3RhZ2VzLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC01IHNwYWNlLXktM1wiPlxuICAgICAgICAgICAge3N0YWdlcy5tYXAoKHN0YWdlKSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e3N0YWdlLmtleX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgICAgICAgc3RhZ2Uuc3RhdGUgPT09IFwiYWN0aXZlXCJcbiAgICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2t5LTIwMCBiZy1za3ktNTAvODAgcHgtMyBweS0zXCJcbiAgICAgICAgICAgICAgICAgICAgOiBzdGFnZS5zdGF0ZSA9PT0gXCJjb21wbGV0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgID8gXCJyb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtMjAwIGJnLWVtZXJhbGQtNTAvNzAgcHgtMyBweS0zXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcHgtMyBweS0zXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgIHtyZXNvbHZlU3RhZ2VCYWRnZShzdGFnZSl9XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWdlLnN0YXRlID09PSBcInBlbmRpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJ0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtzdGFnZS50aXRsZX1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQteHMgbGVhZGluZy01IHRleHQtc2xhdGUtNTAwXCI+e3N0YWdlLmRlc2NyaXB0aW9ufTwvcD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5O1xuIiwgIlx1RkVGRmltcG9ydCB7IEFwaUZldGNoRXJyb3IgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xuaW1wb3J0IHR5cGUge1xuICBFeHBlbnNlR2FzdG9UeXBlQ29kZSxcbiAgRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QsXG4gIEV4cGVuc2VTaGVldERyYWZ0UmVzcG9uc2UsXG4gIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcbn0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcbmltcG9ydCB7IHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcblxuY29uc3QgVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUgPSBcImluZC1leHBlbnNlLXRpY2tldC1pbWFnZS12MVwiO1xuY29uc3QgVElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWCA9IFwiL19faW5kX2NhY2hlX18vdGlja2V0LWltYWdlL1wiO1xuY29uc3QgVElDS0VUX1RSQUNFX1NUT1JBR0VfS0VZID0gXCJleHBlbnNlX3NoZWV0X3RpY2tldF9xdWlja19mbG93X3RyYWNlX3YxXCI7XG5cbmV4cG9ydCBjb25zdCBNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMgPSA1MCAqIDEwMjQgKiAxMDI0O1xuZXhwb3J0IGNvbnN0IFRJQ0tFVF9JTUFHRV9BQ0NFUFRfQVRUUklCVVRFID1cbiAgXCIuanBnLC5qcGVnLC5wbmcsLndlYnAsaW1hZ2UvanBlZyxpbWFnZS9wanBlZyxpbWFnZS9wbmcsaW1hZ2Uvd2VicFwiO1xuY29uc3QgQUxMT1dFRF9USUNLRVRfSU1BR0VfTUlNRV9UWVBFUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJpbWFnZS9qcGVnXCIsIFwiaW1hZ2UvcGpwZWdcIiwgXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS93ZWJwXCJdKTtcbmNvbnN0IEFMTE9XRURfVElDS0VUX0lNQUdFX0VYVEVOU0lPTlMgPSBuZXcgU2V0PHN0cmluZz4oW1wianBnXCIsIFwianBlZ1wiLCBcInBuZ1wiLCBcIndlYnBcIl0pO1xuY29uc3QgVElDS0VUX01JTUVfVE9fRVhURU5TSU9OOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICBcImltYWdlL2pwZWdcIjogXCJqcGdcIixcbiAgXCJpbWFnZS9wanBlZ1wiOiBcImpwZ1wiLFxuICBcImltYWdlL2pwZ1wiOiBcImpwZ1wiLFxuICBcImltYWdlL3BuZ1wiOiBcInBuZ1wiLFxuICBcImltYWdlL3dlYnBcIjogXCJ3ZWJwXCIsXG59O1xuY29uc3QgQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XG5jb25zdCBERUZBVUxUX1RJQ0tFVF9HQVNUT19UWVBFID0gODtcbmV4cG9ydCBjb25zdCBERUZBVUxUX0NSRUFURV9NT0RFID0gXCJtYW51YWxcIiBhcyBcImlhXCIgfCBcIm1hbnVhbFwiO1xuXG5leHBvcnQgdHlwZSBUaWNrZXRJbWFnZVNvdXJjZSA9IFwiY2FtZXJhXCIgfCBcImdhbGxlcnlcIjtcblxuZXhwb3J0IHR5cGUgVGlja2V0VHJhY2VFbnRyeSA9IHtcbiAgc3RlcDogc3RyaW5nO1xuICB0cmFjZUlkOiBzdHJpbmc7XG4gIGF0OiBzdHJpbmc7XG59O1xuXG50eXBlIE5vcm1hbGl6ZWREcmFmdExpbmUgPSB7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICB0eXBlVmFsdWU6IG51bWJlcjtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgcXR5OiBudW1iZXI7XG4gIHByaWNlOiBudW1iZXI7XG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBOb3JtYWxpemVkRHJhZnQgPSB7XG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIGN1cnJlbmN5Q29kZTogc3RyaW5nO1xuICB0b3RhbEFtb3VudDogbnVtYmVyO1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgY29tZW50YXJpbzogc3RyaW5nO1xuICBnYXN0b1R5cGU6IG51bWJlciB8IG51bGw7XG4gIGxpbmVzOiBOb3JtYWxpemVkRHJhZnRMaW5lW107XG59O1xuXG5leHBvcnQgdHlwZSBQZW5kaW5nVXBsb2FkUmV0cnkgPVxuICB8IHtcbiAgICAgIHN0cmF0ZWd5OiBcImlhLXJlYWR5XCI7XG4gICAgICBmaWxlSWQ6IHN0cmluZztcbiAgICAgIGV4dGVuc2lvbjogc3RyaW5nO1xuICAgICAgY2FjaGVLZXk6IHN0cmluZztcbiAgICAgIGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQ7XG4gICAgICBmaWxlTmFtZUhpbnQ6IHN0cmluZztcbiAgICB9XG4gIHwge1xuICAgICAgc3RyYXRlZ3k6IFwibWFudWFsLXBvc3QtdXBsb2FkLWRyYWZ0XCI7XG4gICAgICBmaWxlSWQ6IHN0cmluZztcbiAgICAgIGV4dGVuc2lvbjogc3RyaW5nO1xuICAgICAgY2FjaGVLZXk6IHN0cmluZztcbiAgICAgIGZpbGVOYW1lSGludDogc3RyaW5nO1xuICAgIH07XG5cbmV4cG9ydCB0eXBlIFVwbG9hZFN5bmNSZXN1bHQgPSB7XG4gIHVybEZpbGU6IHN0cmluZztcbiAgZmlsZU5hbWU6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0FyZ3MgPSB7XG4gIHNoZWV0SWQ/OiBzdHJpbmc7XG4gIHByb2plY3RJZD86IHN0cmluZztcbiAgY3VycmVuY3lDb2RlPzogc3RyaW5nO1xuICBheFVzZXJJZE92ZXJyaWRlPzogc3RyaW5nO1xuICBjYW5DcmVhdGVFeHBlbnNlOiBib29sZWFuO1xuICBpc0NyZWF0ZU1vZGU6IGJvb2xlYW47XG4gIGlzU2hlZXRMb2NrZWQ6IGJvb2xlYW47XG4gIGxpbmtUb1NoZWV0PzogYm9vbGVhbjtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG4gIG9uQ29tcGxldGVkPzogKHJlc3VsdDogeyBmaWxlSWQ6IHN0cmluZzsgbGlua2VkVG9TaGVldDogYm9vbGVhbiB9KSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgUXVpY2tGbG93UHJvZ3Jlc3NLZXkgPVxuICB8IFwidXBsb2FkaW5nSW1hZ2VcIlxuICB8IFwiY3JlYXRpbmdUaWNrZXRcIlxuICB8IFwic3luY2luZ0ZpbGVcIlxuICB8IFwiZmluYWxpemluZ0lhXCJcbiAgfCBcImxpbmtpbmdFeHBlbnNlTGluZVwiXG4gIHwgXCJkb25lXCI7XG5cbmNvbnN0IGFzUmVjb3JkID0gKHZhbHVlOiB1bmtub3duKTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPT4ge1xuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHt9O1xuICByZXR1cm4gdmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG59O1xuXG5jb25zdCBnZXRGaXJzdERlZmluZWQgPSAocmVjb3JkOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiwga2V5czogc3RyaW5nW10pOiB1bmtub3duID0+IHtcbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGlmIChrZXkgaW4gcmVjb3JkKSB7XG4gICAgICByZXR1cm4gcmVjb3JkW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5jb25zdCB0b051bWJlciA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUocGFyc2VkKSA/IHBhcnNlZCA6IG51bGw7XG59O1xuXG5jb25zdCB0b1Bvc2l0aXZlTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGNvbnN0IHBhcnNlZCA9IHRvTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPiAwID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IHRvRGRNbVl5eXkgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdG9FeHBlbnNlQXBpRGRNbVl5eXkodmFsdWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFRvZGF5RGRNbVl5eXkgPSAoKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIHRvRGRNbVl5eXkobmV3IERhdGUoKSk7XG59O1xuXG5jb25zdCBub3JtYWxpemVHYXN0b1R5cGUgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdW1iZXIodmFsdWUpO1xuICBpZiAocGFyc2VkID09PSBudWxsIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKHBhcnNlZCkgfHwgIUFMTE9XRURfVElDS0VUX0dBU1RPX1RZUEVTLmhhcyhwYXJzZWQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUltYWdlRXh0ZW5zaW9uID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15hLXowLTldL2csIFwiXCIpO1xuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBcIlwiO1xuICBpZiAobm9ybWFsaXplZCA9PT0gXCJqcGVnXCIpIHJldHVybiBcImpwZ1wiO1xuICByZXR1cm4gQUxMT1dFRF9USUNLRVRfSU1BR0VfRVhURU5TSU9OUy5oYXMobm9ybWFsaXplZCkgPyBub3JtYWxpemVkIDogXCJcIjtcbn07XG5cbmNvbnN0IHJlc29sdmVFeHRlbnNpb25Gcm9tRmlsZU5hbWUgPSAoZmlsZTogRmlsZSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGZyb21OYW1lID0gc2FmZVRleHQoZmlsZS5uYW1lKS5zcGxpdChcIi5cIikucG9wKCkgfHwgXCJcIjtcbiAgcmV0dXJuIG5vcm1hbGl6ZUltYWdlRXh0ZW5zaW9uKGZyb21OYW1lKTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbmZlckV4dGVuc2lvbiA9IChmaWxlOiBGaWxlKTogc3RyaW5nID0+IHtcbiAgY29uc3QgdHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZnJvbU1pbWUgPSBUSUNLRVRfTUlNRV9UT19FWFRFTlNJT05bdHlwZV07XG4gIGlmIChmcm9tTWltZSkgcmV0dXJuIGZyb21NaW1lO1xuXG4gIGNvbnN0IGZyb21OYW1lID0gcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZShmaWxlKTtcbiAgaWYgKGZyb21OYW1lKSByZXR1cm4gZnJvbU5hbWU7XG5cbiAgcmV0dXJuIFwianBnXCI7XG59O1xuXG5leHBvcnQgY29uc3QgaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUgPSAoZmlsZTogRmlsZSk6IGJvb2xlYW4gPT4ge1xuICBjb25zdCBub3JtYWxpemVkVHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKG5vcm1hbGl6ZWRUeXBlICYmIEFMTE9XRURfVElDS0VUX0lNQUdFX01JTUVfVFlQRVMuaGFzKG5vcm1hbGl6ZWRUeXBlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgZXh0ZW5zaW9uID0gcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZShmaWxlKTtcbiAgcmV0dXJuICEhZXh0ZW5zaW9uO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVSYW5kb21LZXkgPSAoKTogc3RyaW5nID0+IHtcbiAgaWYgKHR5cGVvZiBjcnlwdG8gIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNyeXB0by5yYW5kb21VVUlEID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gY3J5cHRvLnJhbmRvbVVVSUQoKTtcbiAgfVxuICByZXR1cm4gYCR7RGF0ZS5ub3coKX0tJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCAxMCl9YDtcbn07XG5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZUZpbGVOYW1lID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBiYXNlID0gc2FmZVRleHQodmFsdWUpLnJlcGxhY2UoL1s8PjpcIi9cXFxcfD8qXFx1MDAwMC1cXHUwMDFGXS9nLCBcIl9cIik7XG4gIHJldHVybiBiYXNlIHx8IFwidGlja2V0LWltYWdlXCI7XG59O1xuXG5leHBvcnQgY29uc3QgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IgPSAoZXJyb3I6IEFwaUZldGNoRXJyb3IpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBwYXlsb2FkID0gc2FmZVRleHQoZXJyb3IucmVzcG9uc2VCb2R5KTtcbiAgaWYgKCFwYXlsb2FkKSByZXR1cm4gXCJcIjtcbiAgdHJ5IHtcbiAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShwYXlsb2FkKSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbiAgICBjb25zdCB0cmFjZUlkID0gc2FmZVRleHQoanNvbi5UcmFjZUlkID8/IGpzb24udHJhY2VJZCk7XG4gICAgcmV0dXJuIHRyYWNlSWQ7XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBcIlwiO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplRHJhZnRGcm9tSWFSZXNwb25zZSA9IChyYXdEYXRhOiB1bmtub3duKTogTm9ybWFsaXplZERyYWZ0ID0+IHtcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJhd0RhdGEpO1xuICBjb25zdCBkcmFmdERlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKTtcbiAgY29uc3QgZHJhZnRDdXJyZW5jeSA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJjdXJyZW5jeUNvZGVcIiwgXCJDdXJyZW5jeUNvZGVcIl0pKS50b1VwcGVyQ2FzZSgpO1xuICBjb25zdCBkcmFmdFRvdGFsQW1vdW50ID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQoZGF0YSwgW1widG90YWxBbW91bnRcIiwgXCJUb3RhbEFtb3VudFwiXSkpIHx8IDA7XG4gIGNvbnN0IGRyYWZ0VHJhbnNEYXRlID0gdG9EZE1tWXl5eShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1widHJhbnNEYXRlXCIsIFwiVHJhbnNEYXRlXCJdKSkgfHwgZ2V0VG9kYXlEZE1tWXl5eSgpO1xuICBjb25zdCBkcmFmdENvbW1lbnQgPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiY29tZW50YXJpb1wiLCBcIkNvbWVudGFyaW9cIl0pKTtcbiAgY29uc3QgZHJhZnRHYXN0b1R5cGUgPSBub3JtYWxpemVHYXN0b1R5cGUoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImdhc3RvVHlwZVwiLCBcIkdhc3RvVHlwZVwiXSkpO1xuXG4gIGNvbnN0IHJhd0xpbmVzID0gZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImxpbmVzXCIsIFwiTGluZXNcIl0pO1xuICBjb25zdCBsaW5lQXJyYXkgPSBBcnJheS5pc0FycmF5KHJhd0xpbmVzKSA/IHJhd0xpbmVzIDogW107XG5cbiAgY29uc3QgbGluZXM6IE5vcm1hbGl6ZWREcmFmdExpbmVbXSA9IGxpbmVBcnJheVxuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBsaW5lUmVjb3JkID0gYXNSZWNvcmQoZW50cnkpO1xuICAgICAgY29uc3QgcXR5ID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1wicXR5XCIsIFwiUXR5XCJdKSkgfHwgMTtcbiAgICAgIGNvbnN0IHByaWNlID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1wicHJpY2VcIiwgXCJQcmljZVwiXSkpIHx8IDA7XG4gICAgICBjb25zdCBleHBsaWNpdFRvdGFsID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widG90YWxBbW91bnRcIiwgXCJUb3RhbEFtb3VudFwiXSkpIHx8IDA7XG4gICAgICBjb25zdCBjb21wdXRlZFRvdGFsID0gZXhwbGljaXRUb3RhbCA+IDAgPyBleHBsaWNpdFRvdGFsIDogcXR5ICogcHJpY2U7XG4gICAgICBpZiAoIShjb21wdXRlZFRvdGFsID4gMCkpIHJldHVybiBudWxsO1xuXG4gICAgICBjb25zdCBjYW5kaWRhdGVUeXBlVmFsdWUgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0eXBlVmFsdWVcIiwgXCJUeXBlVmFsdWVcIl0pKTtcbiAgICAgIGNvbnN0IHNhZmVUeXBlVmFsdWUgPSBOdW1iZXIuaXNJbnRlZ2VyKGNhbmRpZGF0ZVR5cGVWYWx1ZSkgPyBOdW1iZXIoY2FuZGlkYXRlVHlwZVZhbHVlKSA6IG51bGw7XG4gICAgICBjb25zdCB0eXBlVmFsdWUgPSBzYWZlVHlwZVZhbHVlICYmIHNhZmVUeXBlVmFsdWUgPiAwID8gc2FmZVR5cGVWYWx1ZSA6IGRyYWZ0R2FzdG9UeXBlIHx8IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XG4gICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJkZXNjcmlwdGlvblwiLCBcIkRlc2NyaXB0aW9uXCJdKSkgfHwgZHJhZnREZXNjcmlwdGlvbjtcbiAgICAgIGNvbnN0IHRyYW5zRGF0ZSA9IHRvRGRNbVl5eXkoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInRyYW5zRGF0ZVwiLCBcIlRyYW5zRGF0ZVwiXSkpIHx8IGRyYWZ0VHJhbnNEYXRlO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIHR5cGVWYWx1ZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uIHx8IFwiVGlja2V0XCIsXG4gICAgICAgIHF0eSxcbiAgICAgICAgcHJpY2U6IHByaWNlID4gMCA/IHByaWNlIDogY29tcHV0ZWRUb3RhbCxcbiAgICAgICAgdG90YWxBbW91bnQ6IGNvbXB1dGVkVG90YWwsXG4gICAgICB9O1xuICAgIH0pXG4gICAgLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBOb3JtYWxpemVkRHJhZnRMaW5lID0+IGVudHJ5ICE9PSBudWxsKTtcblxuICByZXR1cm4ge1xuICAgIGRlc2NyaXB0aW9uOiBkcmFmdERlc2NyaXB0aW9uIHx8IFwiVGlja2V0XCIsXG4gICAgY3VycmVuY3lDb2RlOiBkcmFmdEN1cnJlbmN5IHx8IFwiRVVSXCIsXG4gICAgdG90YWxBbW91bnQ6IGRyYWZ0VG90YWxBbW91bnQgPiAwID8gZHJhZnRUb3RhbEFtb3VudCA6IGxpbmVzLnJlZHVjZSgoc3VtLCBsaW5lKSA9PiBzdW0gKyBsaW5lLnRvdGFsQW1vdW50LCAwKSxcbiAgICB0cmFuc0RhdGU6IGRyYWZ0VHJhbnNEYXRlLFxuICAgIGNvbWVudGFyaW86IGRyYWZ0Q29tbWVudCxcbiAgICBnYXN0b1R5cGU6IGRyYWZ0R2FzdG9UeXBlLFxuICAgIGxpbmVzLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVUaWNrZXRGaWxlSWRGcm9tRHJhZnRSZXNwb25zZSA9IChyYXdEYXRhOiB1bmtub3duKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJhd0RhdGEpO1xuICBjb25zdCBjcmVhdGlvblJhdyA9IGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJUaWNrZXRDcmVhdGlvblwiLCBcInRpY2tldENyZWF0aW9uXCJdKTtcbiAgY29uc3QgY3JlYXRpb24gPSBhc1JlY29yZChjcmVhdGlvblJhdyk7XG4gIHJldHVybiBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoY3JlYXRpb24sIFtcIkZpbGVJZFwiLCBcImZpbGVJZFwiXSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlc29sdmVVcGxvYWRSZXN1bHQgPSAocmVzcG9uc2VEYXRhOiB1bmtub3duKTogVXBsb2FkU3luY1Jlc3VsdCA9PiB7XG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyZXNwb25zZURhdGEpO1xuICByZXR1cm4ge1xuICAgIHVybEZpbGU6IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJVcmxGaWxlXCIsIFwidXJsRmlsZVwiXSkpLFxuICAgIGZpbGVOYW1lOiBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiRmlsZU5hbWVcIiwgXCJmaWxlTmFtZVwiXSkpLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkVGlja2V0SWFQYXlsb2FkID0gKGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQsIHVwbG9hZDogVXBsb2FkU3luY1Jlc3VsdCk6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9PiB7XG4gIGNvbnN0IGlhTGluZXMgPSBkcmFmdC5saW5lcy5tYXAoKGxpbmUpID0+ICh7XG4gICAgZGVzY3JpcHRpb246IGxpbmUuZGVzY3JpcHRpb24sXG4gICAgcXR5OiBsaW5lLnF0eSxcbiAgICBwcmljZTogbGluZS5wcmljZSxcbiAgICB0b3RhbEFtb3VudDogbGluZS50b3RhbEFtb3VudCxcbiAgfSkpO1xuXG4gIGNvbnN0IHBheWxvYWQ6IEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCA9IHtcbiAgICBkZXNjcmlwdGlvbjogZHJhZnQuZGVzY3JpcHRpb24sXG4gICAgY3VycmVuY3lDb2RlOiBkcmFmdC5jdXJyZW5jeUNvZGUsXG4gICAgdG90YWxBbW91bnQ6IGRyYWZ0LnRvdGFsQW1vdW50ID4gMCA/IGRyYWZ0LnRvdGFsQW1vdW50IDogdW5kZWZpbmVkLFxuICAgIHRyYW5zRGF0ZTogZHJhZnQudHJhbnNEYXRlLFxuICAgIGNvbWVudGFyaW86IGRyYWZ0LmNvbWVudGFyaW8gfHwgdW5kZWZpbmVkLFxuICAgIHVybEZpbGU6IHVwbG9hZC51cmxGaWxlIHx8IHVuZGVmaW5lZCxcbiAgICBmaWxlTmFtZTogdXBsb2FkLmZpbGVOYW1lIHx8IHVuZGVmaW5lZCxcbiAgICBsaW5lczogaWFMaW5lcyxcbiAgfTtcblxuICBpZiAoZHJhZnQuZ2FzdG9UeXBlICE9PSBudWxsKSB7XG4gICAgcGF5bG9hZC5nYXN0b1R5cGUgPSBkcmFmdC5nYXN0b1R5cGUgYXMgRXhwZW5zZUdhc3RvVHlwZUNvZGU7XG4gIH1cblxuICByZXR1cm4gcGF5bG9hZDtcbn07XG5cbmV4cG9ydCBjb25zdCBidWlsZFNoZWV0TGluZVBheWxvYWQgPSAoXG4gIGRyYWZ0OiBOb3JtYWxpemVkRHJhZnQsXG4gIGZpbGVJZDogc3RyaW5nLFxuICBwcm9qZWN0SWQ6IHN0cmluZ1xuKTogRXhwZW5zZVNoZWV0Q3JlYXRlTGluZVJlcXVlc3QgfCBudWxsID0+IHtcbiAgY29uc3QgbGluZUZyb21EcmFmdCA9IGRyYWZ0LmxpbmVzWzBdO1xuICAvLyBCdWlsZCBhIHNpbmdsZSBleHBlbnNlIGxpbmUgZnJvbSB0aWNrZXQgaGVhZGVyIGRhdGEgdG8gYXZvaWQgbGluZS1sZXZlbCBkZXNjcmlwdGlvbiBsZWFrYWdlLlxuICBjb25zdCBoZWFkZXJUb3RhbCA9IGRyYWZ0LnRvdGFsQW1vdW50ID4gMCA/IGRyYWZ0LnRvdGFsQW1vdW50IDogMDtcbiAgY29uc3QgZmFsbGJhY2tUb3RhbCA9IGxpbmVGcm9tRHJhZnQ/LnRvdGFsQW1vdW50IHx8IDA7XG4gIGNvbnN0IGVmZmVjdGl2ZVRvdGFsID0gaGVhZGVyVG90YWwgPiAwID8gaGVhZGVyVG90YWwgOiBmYWxsYmFja1RvdGFsO1xuICBpZiAoIShlZmZlY3RpdmVUb3RhbCA+IDApKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCB0eXBlVmFsdWVDYW5kaWRhdGUgPSBkcmFmdC5nYXN0b1R5cGUgfHwgbGluZUZyb21EcmFmdD8udHlwZVZhbHVlIHx8IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XG4gIGNvbnN0IHNhZmVUeXBlVmFsdWUgPSBOdW1iZXIodHlwZVZhbHVlQ2FuZGlkYXRlKTtcbiAgY29uc3QgdHlwZVZhbHVlID0gTnVtYmVyLmlzSW50ZWdlcihzYWZlVHlwZVZhbHVlKSAmJiBzYWZlVHlwZVZhbHVlID4gMCA/IHNhZmVUeXBlVmFsdWUgOiBERUZBVUxUX1RJQ0tFVF9HQVNUT19UWVBFO1xuXG4gIHJldHVybiB7XG4gICAgdHJhbnNEYXRlOiBkcmFmdC50cmFuc0RhdGUgfHwgbGluZUZyb21EcmFmdD8udHJhbnNEYXRlIHx8IGdldFRvZGF5RGRNbVl5eXkoKSxcbiAgICB0eXBlVmFsdWUsXG4gICAgZGVzY3JpcHRpb246IHNhZmVUZXh0KGRyYWZ0LmRlc2NyaXB0aW9uKSB8fCBcIlRpY2tldFwiLFxuICAgIGludGVybmFjaW9uYWw6IGZhbHNlLFxuICAgIGZpbGVJZCxcbiAgICB0aWNrZXQ6IHRydWUsXG4gICAgcXR5OiAxLFxuICAgIHByaWNlOiBlZmZlY3RpdmVUb3RhbCxcbiAgICBwcm9qSWQ6IHNhZmVUZXh0KHByb2plY3RJZCkgfHwgdW5kZWZpbmVkLFxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IHBlcnNpc3RUcmFjZUxpc3QgPSAodHJhY2VMaXN0OiBUaWNrZXRUcmFjZUVudHJ5W10pOiB2b2lkID0+IHtcbiAgdHJ5IHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFRJQ0tFVF9UUkFDRV9TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkodHJhY2VMaXN0KSk7XG4gIH0gY2F0Y2gge1xuICAgIC8vIElnbm9yZSBzdG9yYWdlIGZhaWx1cmVzIGluIHJlc3RyaWN0ZWQgYnJvd3NlciBjb250ZXh0cy5cbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IGNhY2hlSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcsIGZpbGU6IEZpbGUpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybjtcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xuICBhd2FpdCBjYWNoZS5wdXQoXG4gICAgbmV3IFJlcXVlc3QocmVxdWVzdFVybCksXG4gICAgbmV3IFJlc3BvbnNlKGZpbGUsIHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogc2FmZVRleHQoZmlsZS50eXBlKSB8fCBcImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiLFxuICAgICAgfSxcbiAgICB9KVxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlYWRDYWNoZWRJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZyk6IFByb21pc2U8QmxvYiB8IG51bGw+ID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybiBudWxsO1xuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XG4gIGNvbnN0IGNhY2hlZFJlc3BvbnNlID0gYXdhaXQgY2FjaGUubWF0Y2gocmVxdWVzdFVybCk7XG4gIGlmICghY2FjaGVkUmVzcG9uc2UpIHJldHVybiBudWxsO1xuICByZXR1cm4gY2FjaGVkUmVzcG9uc2UuYmxvYigpO1xufTtcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUNhY2hlZEltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICEoXCJjYWNoZXNcIiBpbiB3aW5kb3cpKSByZXR1cm47XG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcbiAgYXdhaXQgY2FjaGUuZGVsZXRlKHJlcXVlc3RVcmwpO1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHtcbiAgTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTLFxuICBjYWNoZUltYWdlRmlsZSxcbiAgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IsXG4gIGlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlLFxuICBwZXJzaXN0VHJhY2VMaXN0LFxuICByZW1vdmVDYWNoZWRJbWFnZUZpbGUsXG4gIHJlc29sdmVSYW5kb21LZXksXG4gIHR5cGUgUXVpY2tGbG93UHJvZ3Jlc3NLZXksXG4gIHR5cGUgVGlja2V0SW1hZ2VTb3VyY2UsXG4gIHR5cGUgVGlja2V0VHJhY2VFbnRyeSxcbiAgdHlwZSBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzLFxufSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzXCI7XG5pbXBvcnQgeyBvcHRpbWl6ZVRpY2tldEltYWdlRm9yVXBsb2FkLCB0eXBlIFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0IH0gZnJvbSBcIi4vdGlja2V0SW1hZ2VPcHRpbWl6YXRpb24udHNcIjtcblxudHlwZSBRdWlja0NyZWF0ZVBhcnRpYWxUaWNrZXRTdGF0ZSA9IHtcbiAgZmlsZUlkOiBzdHJpbmc7XG4gIGxpbmtlZFRvU2hlZXQ6IGJvb2xlYW47XG4gIGNvbXBsZXRlZFN0YWdlOiBzdHJpbmc7XG4gIHVybEZpbGU6IHN0cmluZztcbiAgZmlsZU5hbWU6IHN0cmluZztcbiAgcHJvY2Vzc2VkQnlBSTogYm9vbGVhbiB8IG51bGw7XG59O1xuXG50eXBlIFF1aWNrVGlja2V0QXR0ZW1wdENvbnRleHQgPSB7XG4gIGF0dGVtcHRJZDogc3RyaW5nO1xuICBzb3VyY2U6IFRpY2tldEltYWdlU291cmNlO1xuICBzdGFydGVkQXQ6IG51bWJlcjtcbiAgb3B0aW1pemF0aW9uOiBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdDtcbn07XG5cbnR5cGUgUXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlID0ge1xuICBrZXk6IFF1aWNrRmxvd1Byb2dyZXNzS2V5O1xuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBzdGF0ZTogXCJjb21wbGV0ZWRcIiB8IFwiYWN0aXZlXCIgfCBcInBlbmRpbmdcIjtcbn07XG5cbmNvbnN0IFFVSUNLX1RJQ0tFVF9GTE9XX0xPR19QUkVGSVggPSBcIltleHBlbnNlLXF1aWNrLXRpY2tldF1cIjtcbmNvbnN0IFFVSUNLX1RJQ0tFVF9WSVNVQUxfU1RBR0VfTVMgPSB7XG4gIHN5bmNpbmdGaWxlOiAxMjAwLFxuICBmaW5hbGl6aW5nSWE6IDM2MDAsXG4gIGxpbmtpbmdFeHBlbnNlTGluZTogODUwMCxcbn0gYXMgY29uc3Q7XG5cbmNvbnN0IGxvZ1F1aWNrVGlja2V0SW5mbyA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNvbnNvbGUuaW5mbyhRVUlDS19USUNLRVRfRkxPV19MT0dfUFJFRklYLCAuLi5hcmdzKTtcbiAgfVxufTtcblxuY29uc3QgbG9nUXVpY2tUaWNrZXRXYXJuID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc29sZS53YXJuKFFVSUNLX1RJQ0tFVF9GTE9XX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xuICB9XG59O1xuXG5jb25zdCBsb2dRdWlja1RpY2tldEVycm9yID0gKC4uLmFyZ3M6IHVua25vd25bXSkgPT4ge1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNvbnNvbGUuZXJyb3IoUVVJQ0tfVElDS0VUX0ZMT1dfTE9HX1BSRUZJWCwgLi4uYXJncyk7XG4gIH1cbn07XG5cbmNvbnN0IGZvcm1hdEZpbGVTaXplID0gKHNpemU6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gIGlmICghKHNpemUgPiAwKSkgcmV0dXJuIFwiMCBCXCI7XG4gIGlmIChzaXplID49IDEwMjQgKiAxMDI0KSByZXR1cm4gYCR7KHNpemUgLyAoMTAyNCAqIDEwMjQpKS50b0ZpeGVkKDIpfSBNQmA7XG4gIGlmIChzaXplID49IDEwMjQpIHJldHVybiBgJHsoc2l6ZSAvIDEwMjQpLnRvRml4ZWQoMSl9IEtCYDtcbiAgcmV0dXJuIGAke3NpemV9IEJgO1xufTtcblxuY29uc3QgYnVpbGRGaWxlTG9nRGF0YSA9IChmaWxlOiBGaWxlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogc2FmZVRleHQoZmlsZS5uYW1lKSxcbiAgICB0eXBlOiBzYWZlVGV4dChmaWxlLnR5cGUpLFxuICAgIHNpemVCeXRlczogTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSxcbiAgICBzaXplVGV4dDogZm9ybWF0RmlsZVNpemUoTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSksXG4gICAgbGFzdE1vZGlmaWVkOiBOdW1iZXIoZmlsZS5sYXN0TW9kaWZpZWQgfHwgMCksXG4gIH07XG59O1xuXG5jb25zdCBidWlsZEZhbGxiYWNrT3B0aW1pemF0aW9uUmVzdWx0ID0gKGZpbGU6IEZpbGUpOiBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdCA9PiB7XG4gIHJldHVybiB7XG4gICAgZmlsZSxcbiAgICBjaGFuZ2VkOiBmYWxzZSxcbiAgICByZWFzb246IFwib3B0aW1pemF0aW9uLWVycm9yXCIsXG4gICAgcmVzaXplZDogZmFsc2UsXG4gICAgcmVlbmNvZGVkOiBmYWxzZSxcbiAgICBlbGFwc2VkTXM6IDAsXG4gICAgb3JpZ2luYWw6IHtcbiAgICAgIG5hbWU6IHNhZmVUZXh0KGZpbGUubmFtZSksXG4gICAgICB0eXBlOiBzYWZlVGV4dChmaWxlLnR5cGUpLFxuICAgICAgc2l6ZTogTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSxcbiAgICAgIHdpZHRoOiBudWxsLFxuICAgICAgaGVpZ2h0OiBudWxsLFxuICAgIH0sXG4gICAgb3V0cHV0OiB7XG4gICAgICBuYW1lOiBzYWZlVGV4dChmaWxlLm5hbWUpLFxuICAgICAgdHlwZTogc2FmZVRleHQoZmlsZS50eXBlKSxcbiAgICAgIHNpemU6IE51bWJlcihmaWxlLnNpemUgfHwgMCksXG4gICAgICB3aWR0aDogbnVsbCxcbiAgICAgIGhlaWdodDogbnVsbCxcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgYnVpbGRPcHRpbWl6YXRpb25Mb2dEYXRhID0gKHJlc3VsdDogVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQpID0+IHtcbiAgY29uc3Qgc2F2ZWRCeXRlcyA9IE1hdGgubWF4KDAsIHJlc3VsdC5vcmlnaW5hbC5zaXplIC0gcmVzdWx0Lm91dHB1dC5zaXplKTtcbiAgY29uc3Qgc2F2ZWRSYXRpbyA9IHJlc3VsdC5vcmlnaW5hbC5zaXplID4gMCA/IHNhdmVkQnl0ZXMgLyByZXN1bHQub3JpZ2luYWwuc2l6ZSA6IDA7XG5cbiAgcmV0dXJuIHtcbiAgICBjaGFuZ2VkOiByZXN1bHQuY2hhbmdlZCxcbiAgICByZWFzb246IHJlc3VsdC5yZWFzb24sXG4gICAgcmVzaXplZDogcmVzdWx0LnJlc2l6ZWQsXG4gICAgcmVlbmNvZGVkOiByZXN1bHQucmVlbmNvZGVkLFxuICAgIGVsYXBzZWRNczogcmVzdWx0LmVsYXBzZWRNcyxcbiAgICBvcmlnaW5hbDoge1xuICAgICAgLi4ucmVzdWx0Lm9yaWdpbmFsLFxuICAgICAgc2l6ZVRleHQ6IGZvcm1hdEZpbGVTaXplKHJlc3VsdC5vcmlnaW5hbC5zaXplKSxcbiAgICB9LFxuICAgIG91dHB1dDoge1xuICAgICAgLi4ucmVzdWx0Lm91dHB1dCxcbiAgICAgIHNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShyZXN1bHQub3V0cHV0LnNpemUpLFxuICAgIH0sXG4gICAgc2F2ZWRCeXRlcyxcbiAgICBzYXZlZFRleHQ6IGZvcm1hdEZpbGVTaXplKHNhdmVkQnl0ZXMpLFxuICAgIHNhdmVkUmF0aW86IE51bWJlcihzYXZlZFJhdGlvLnRvRml4ZWQoNCkpLFxuICB9O1xufTtcblxuY29uc3QgZm9ybWF0VmFsaWRhdGlvbkVycm9ycyA9IChcbiAgZXJyb3JzOiBBcnJheTx7IEZpZWxkPzogdW5rbm93bjsgTWVzc2FnZT86IHVua25vd24gfSB8IG51bGwgfCB1bmRlZmluZWQ+IHwgbnVsbCB8IHVuZGVmaW5lZFxuKTogc3RyaW5nID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGVycm9ycykgfHwgZXJyb3JzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwiXCI7XG5cbiAgcmV0dXJuIGVycm9yc1xuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBmaWVsZCA9IHNhZmVUZXh0KGVudHJ5Py5GaWVsZCk7XG4gICAgICBjb25zdCBtZXNzYWdlID0gc2FmZVRleHQoZW50cnk/Lk1lc3NhZ2UpO1xuICAgICAgaWYgKGZpZWxkICYmIG1lc3NhZ2UpIHJldHVybiBgJHtmaWVsZH06ICR7bWVzc2FnZX1gO1xuICAgICAgcmV0dXJuIG1lc3NhZ2UgfHwgZmllbGQ7XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgLmpvaW4oXCIgfCBcIik7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93ID0gKHtcbiAgc2hlZXRJZCA9IFwiXCIsXG4gIHByb2plY3RJZCA9IFwiXCIsXG4gIGN1cnJlbmN5Q29kZSA9IFwiXCIsXG4gIGF4VXNlcklkT3ZlcnJpZGUgPSBcIlwiLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzU2hlZXRMb2NrZWQsXG4gIGxpbmtUb1NoZWV0ID0gdHJ1ZSxcbiAgb25Gb3JiaWRkZW4sXG4gIG9uQ29tcGxldGVkLFxufTogVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncykgPT4ge1xuICBjb25zdCBbc291cmNlUGlja2VyT3Blbiwgc2V0U291cmNlUGlja2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Byb2dyZXNzS2V5LCBzZXRQcm9ncmVzc0tleV0gPSB1c2VTdGF0ZTxRdWlja0Zsb3dQcm9ncmVzc0tleSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZGlzcGxheVByb2dyZXNzS2V5LCBzZXREaXNwbGF5UHJvZ3Jlc3NLZXldID0gdXNlU3RhdGU8UXVpY2tGbG93UHJvZ3Jlc3NLZXkgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3Byb2dyZXNzRWxhcHNlZE1zLCBzZXRQcm9ncmVzc0VsYXBzZWRNc10gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbYXR0ZW1wdElkLCBzZXRBdHRlbXB0SWRdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFt0cmFjZUxpc3QsIHNldFRyYWNlTGlzdF0gPSB1c2VTdGF0ZTxUaWNrZXRUcmFjZUVudHJ5W10+KFtdKTtcbiAgY29uc3QgW3BhcnRpYWxUaWNrZXRGYWlsdXJlLCBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZV0gPSB1c2VTdGF0ZTxRdWlja0NyZWF0ZVBhcnRpYWxUaWNrZXRTdGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXRlc3RGaWxlUmVmID0gdXNlUmVmPHsgY2FjaGVLZXk6IHN0cmluZzsgZmlsZTogRmlsZSB9IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYgPSB1c2VSZWY8UXVpY2tDcmVhdGVQYXJ0aWFsVGlja2V0U3RhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcHJvZ3Jlc3NTdGFydGVkQXRSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgcHJvZ3Jlc3NNZXNzYWdlID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPSBkaXNwbGF5UHJvZ3Jlc3NLZXkgfHwgcHJvZ3Jlc3NLZXk7XG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcInVwbG9hZGluZ0ltYWdlXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX1VwbG9hZGluZ0ltYWdlXCIsIFwiVXBsb2FkaW5nIGltYWdlLi4uXCIpO1xuICAgIH1cbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwiY3JlYXRpbmdUaWNrZXRcIikge1xuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfQ3JlYXRpbmdUaWNrZXRcIiwgXCJDcmVhdGluZyB0aWNrZXQuLi5cIik7XG4gICAgfVxuICAgIGlmIChlZmZlY3RpdmVQcm9ncmVzc0tleSA9PT0gXCJzeW5jaW5nRmlsZVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19TeW5jaW5nRmlsZVwiLCBcIlN5bmNpbmcgZmlsZS4uLlwiKTtcbiAgICB9XG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcImZpbmFsaXppbmdJYVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19GaW5hbGl6aW5nXCIsIFwiRmluYWxpemluZyBJQS4uLlwiKTtcbiAgICB9XG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcImxpbmtpbmdFeHBlbnNlTGluZVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19MaW5raW5nTGluZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lLi4uXCIpO1xuICAgIH1cbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19Eb25lXCIsIFwiRG9uZVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0sIFtkaXNwbGF5UHJvZ3Jlc3NLZXksIHByb2dyZXNzS2V5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWJ1c3kgfHwgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc3luY0VsYXBzZWQgPSAoKSA9PiB7XG4gICAgICBjb25zdCBzdGFydGVkQXQgPSBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50O1xuICAgICAgaWYgKHN0YXJ0ZWRBdCA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoTWF0aC5tYXgoMCwgRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCkpO1xuICAgIH07XG5cbiAgICBzeW5jRWxhcHNlZCgpO1xuICAgIGNvbnN0IGludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoc3luY0VsYXBzZWQsIDI1MCk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsSWQpO1xuICAgIH07XG4gIH0sIFtidXN5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWJ1c3kpIHtcbiAgICAgIGlmIChwcm9ncmVzc0tleSAhPT0gbnVsbCkge1xuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkocHJvZ3Jlc3NLZXkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gbnVsbCB8fCBwcm9ncmVzc0tleSA9PT0gXCJ1cGxvYWRpbmdJbWFnZVwiIHx8IHByb2dyZXNzS2V5ID09PSBcImRvbmVcIikge1xuICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KHByb2dyZXNzS2V5KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkocHJvZ3Jlc3NLZXkpO1xuICAgIGlmIChwcm9ncmVzc0tleSAhPT0gXCJjcmVhdGluZ1RpY2tldFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGltZXJzOiBudW1iZXJbXSA9IFtcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwic3luY2luZ0ZpbGVcIik7XG4gICAgICB9LCBRVUlDS19USUNLRVRfVklTVUFMX1NUQUdFX01TLnN5bmNpbmdGaWxlKSxcbiAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwiZmluYWxpemluZ0lhXCIpO1xuICAgICAgfSwgUVVJQ0tfVElDS0VUX1ZJU1VBTF9TVEFHRV9NUy5maW5hbGl6aW5nSWEpLFxuICAgIF07XG5cbiAgICBpZiAobGlua1RvU2hlZXQpIHtcbiAgICAgIHRpbWVycy5wdXNoKFxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwibGlua2luZ0V4cGVuc2VMaW5lXCIpO1xuICAgICAgICB9LCBRVUlDS19USUNLRVRfVklTVUFMX1NUQUdFX01TLmxpbmtpbmdFeHBlbnNlTGluZSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRpbWVycy5mb3JFYWNoKCh0aW1lcklkKSA9PiB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVySWQpKTtcbiAgICB9O1xuICB9LCBbYnVzeSwgbGlua1RvU2hlZXQsIHByb2dyZXNzS2V5XSk7XG5cbiAgY29uc3QgcHJvZ3Jlc3NTdGFnZXMgPSB1c2VNZW1vPFF1aWNrVGlja2V0UHJvZ3Jlc3NTdGFnZVtdPigoKSA9PiB7XG4gICAgY29uc3QgdmlzaWJsZVN0YWdlczogUXVpY2tGbG93UHJvZ3Jlc3NLZXlbXSA9IGxpbmtUb1NoZWV0XG4gICAgICA/IFtcInVwbG9hZGluZ0ltYWdlXCIsIFwiY3JlYXRpbmdUaWNrZXRcIiwgXCJzeW5jaW5nRmlsZVwiLCBcImZpbmFsaXppbmdJYVwiLCBcImxpbmtpbmdFeHBlbnNlTGluZVwiXVxuICAgICAgOiBbXCJ1cGxvYWRpbmdJbWFnZVwiLCBcImNyZWF0aW5nVGlja2V0XCIsIFwic3luY2luZ0ZpbGVcIiwgXCJmaW5hbGl6aW5nSWFcIl07XG5cbiAgICBjb25zdCBzdGFnZUNvcHk6IFJlY29yZDxRdWlja0Zsb3dQcm9ncmVzc0tleSwgeyB0aXRsZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nIH0+ID0ge1xuICAgICAgdXBsb2FkaW5nSW1hZ2U6IHtcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19QcmVwYXJlX1RpdGxlXCIsIFwiUHJlcGFyaW5nIGltYWdlXCIpLFxuICAgICAgICBkZXNjcmlwdGlvbjogaW5kVChcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX1ByZXBhcmVfQm9keVwiLFxuICAgICAgICAgIFwiV2UgdmFsaWRhdGUgdGhlIGltYWdlIGFuZCBwcmVwYXJlIGl0IGZvciBhIHJlbGlhYmxlIHVwbG9hZC5cIlxuICAgICAgICApLFxuICAgICAgfSxcbiAgICAgIGNyZWF0aW5nVGlja2V0OiB7XG4gICAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfQ3JlYXRlX1RpdGxlXCIsIFwiQ3JlYXRpbmcgdGlja2V0XCIpLFxuICAgICAgICBkZXNjcmlwdGlvbjogaW5kVChcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0NyZWF0ZV9Cb2R5XCIsXG4gICAgICAgICAgXCJUaGUgYmFja2VuZCByZXNlcnZlcyB0aGUgdGlja2V0IGFuZCBzdGFydHMgdGhlIHNlcnZlci1zaWRlIGZsb3cuXCJcbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgICBzeW5jaW5nRmlsZToge1xuICAgICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0ZpbGVfVGl0bGVcIiwgXCJTeW5jaW5nIGZpbGVcIiksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfRmlsZV9Cb2R5XCIsXG4gICAgICAgICAgXCJUaGUgdXBsb2FkZWQgaW1hZ2UgaXMgYmVpbmcgYXR0YWNoZWQgdG8gdGhlIHRpY2tldCByZWNvcmQuXCJcbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgICBmaW5hbGl6aW5nSWE6IHtcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19JYV9UaXRsZVwiLCBcIlJlYWRpbmcgdGlja2V0IGRhdGFcIiksXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfSWFfQm9keVwiLFxuICAgICAgICAgIFwiV2UgYXJlIGV4dHJhY3RpbmcgZGF0ZSwgYW1vdW50IGFuZCBkZXNjcmlwdGlvbiBmcm9tIHRoZSBpbWFnZS5cIlxuICAgICAgICApLFxuICAgICAgfSxcbiAgICAgIGxpbmtpbmdFeHBlbnNlTGluZToge1xuICAgICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0xpbmtfVGl0bGVcIiwgXCJMaW5raW5nIGV4cGVuc2UgbGluZVwiKSxcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19MaW5rX0JvZHlcIixcbiAgICAgICAgICBcIlRoZSBnZW5lcmF0ZWQgdGlja2V0IGlzIGJlaW5nIGNvbm5lY3RlZCB0byB0aGUgY3VycmVudCBleHBlbnNlIHNoZWV0LlwiXG4gICAgICAgICksXG4gICAgICB9LFxuICAgICAgZG9uZToge1xuICAgICAgICB0aXRsZTogaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19Eb25lXCIsIFwiRG9uZVwiKSxcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRG9uZVwiLCBcIkRvbmVcIiksXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb25zdCBhY3RpdmVTdGFnZUtleSA9XG4gICAgICBwcm9ncmVzc0tleSA9PT0gXCJkb25lXCIgPyB2aXNpYmxlU3RhZ2VzW3Zpc2libGVTdGFnZXMubGVuZ3RoIC0gMV0gOiBkaXNwbGF5UHJvZ3Jlc3NLZXkgfHwgcHJvZ3Jlc3NLZXk7XG4gICAgY29uc3QgYWN0aXZlU3RhZ2VJbmRleCA9IGFjdGl2ZVN0YWdlS2V5ID8gdmlzaWJsZVN0YWdlcy5pbmRleE9mKGFjdGl2ZVN0YWdlS2V5KSA6IC0xO1xuXG4gICAgcmV0dXJuIHZpc2libGVTdGFnZXMubWFwKChzdGFnZUtleSwgaW5kZXgpID0+ICh7XG4gICAgICBrZXk6IHN0YWdlS2V5LFxuICAgICAgdGl0bGU6IHN0YWdlQ29weVtzdGFnZUtleV0udGl0bGUsXG4gICAgICBkZXNjcmlwdGlvbjogc3RhZ2VDb3B5W3N0YWdlS2V5XS5kZXNjcmlwdGlvbixcbiAgICAgIHN0YXRlOlxuICAgICAgICBwcm9ncmVzc0tleSA9PT0gXCJkb25lXCIgfHwgKGFjdGl2ZVN0YWdlSW5kZXggPj0gMCAmJiBpbmRleCA8IGFjdGl2ZVN0YWdlSW5kZXgpXG4gICAgICAgICAgPyBcImNvbXBsZXRlZFwiXG4gICAgICAgICAgOiBpbmRleCA9PT0gYWN0aXZlU3RhZ2VJbmRleFxuICAgICAgICAgICAgPyBcImFjdGl2ZVwiXG4gICAgICAgICAgICA6IFwicGVuZGluZ1wiLFxuICAgIH0pKTtcbiAgfSwgW2Rpc3BsYXlQcm9ncmVzc0tleSwgbGlua1RvU2hlZXQsIHByb2dyZXNzS2V5XSk7XG5cbiAgY29uc3QgYWRkVHJhY2UgPSB1c2VDYWxsYmFjaygoc3RlcDogc3RyaW5nLCB0cmFjZUlkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzYWZlVHJhY2VJZCA9IHNhZmVUZXh0KHRyYWNlSWQpO1xuICAgIGlmICghc2FmZVRyYWNlSWQpIHJldHVybjtcblxuICAgIHNldFRyYWNlTGlzdCgocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBbXG4gICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcCxcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVHJhY2VJZCxcbiAgICAgICAgICBhdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICAgIHBlcnNpc3RUcmFjZUxpc3QobmV4dCk7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyQ2FjaGVkQ3VycmVudEltYWdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGNhY2hlS2V5ID0gbGF0ZXN0RmlsZVJlZi5jdXJyZW50Py5jYWNoZUtleTtcbiAgICBpZiAoIWNhY2hlS2V5KSByZXR1cm47XG4gICAgdm9pZCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpLmNhdGNoKCgpID0+IHtcbiAgICAgIC8vIElnbm9yZSBjYWNoZSBjbGVhbnVwIGZhaWx1cmVzIGluIHJlc3RyaWN0ZWQgYnJvd3NlciBjb250ZXh0cy5cbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyRmxvd1N0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xuICAgIHNldFRyYWNlTGlzdChbXSk7XG4gICAgcGVyc2lzdFRyYWNlTGlzdChbXSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBidWlsZEFwaU9wdGlvbnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZUF4VXNlcklkID0gc2FmZVRleHQoYXhVc2VySWRPdmVycmlkZSk7XG4gICAgaWYgKCFzYWZlQXhVc2VySWQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgICBoZWFkZXJzOiB7XG4gICAgICAgIFwiWC1JTkQtQXhVc2VySWRcIjogc2FmZUF4VXNlcklkLFxuICAgICAgfSxcbiAgICB9O1xuICB9LCBbYXhVc2VySWRPdmVycmlkZV0pO1xuXG4gIGNvbnN0IGVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbiA9IHVzZUNhbGxiYWNrKCgpOiBib29sZWFuID0+IHtcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UgfHwgaXNDcmVhdGVNb2RlIHx8IGlzU2hlZXRMb2NrZWQgfHwgKGxpbmtUb1NoZWV0ICYmICFzaGVldElkKSkge1xuICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sIFtjYW5DcmVhdGVFeHBlbnNlLCBpc0NyZWF0ZU1vZGUsIGlzU2hlZXRMb2NrZWQsIGxpbmtUb1NoZWV0LCBvbkZvcmJpZGRlbiwgc2hlZXRJZF0pO1xuXG4gIGNvbnN0IHJlc29sdmVVaUVycm9yTWVzc2FnZSA9IHVzZUNhbGxiYWNrKChlcnJvcjogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xuICAgICAgY29uc3QgdmFsaWRhdGlvblRleHQgPSBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzKGVycm9yLnZhbGlkYXRpb25FcnJvcnMpO1xuICAgICAgaWYgKHZhbGlkYXRpb25UZXh0KSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0aW9uVGV4dDtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDI5KSB7XG4gICAgICAgIHJldHVybiBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmF0ZUxpbWl0XCIsIFwiVG9vIG1hbnkgcmVxdWVzdHMuXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm90Rm91bmRcIiwgXCJSZWNvcmQgbm90IGZvdW5kLlwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDUwMCkge1xuICAgICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1NlcnZlclwiLCBcIlNlcnZlciBlcnJvci5cIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcbiAgICAgID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSlcbiAgICAgIDogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgYWRkUXVpY2tDcmVhdGVSZXNwb25zZVRyYWNlcyA9IHVzZUNhbGxiYWNrKFxuICAgIChyZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQpID0+IHtcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LXF1aWNrLWNyZWF0ZVwiLCBzYWZlVGV4dChyZXNwb25zZS5UcmFjZUlkKSk7XG5cbiAgICAgIGNvbnN0IHN0ZXBUcmFjZUlkcyA9IHJlc3BvbnNlLkRhdGE/LlN0ZXBUcmFjZUlkcztcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LWNyZWF0ZVwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LlRpY2tldENyZWF0ZSkpO1xuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmlsZS11cGxvYWRcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5GaWxlVXBsb2FkKSk7XG4gICAgICBhZGRUcmFjZShcImV4cGVuc2Vmcm9tdGlja2V0XCIsIHNhZmVUZXh0KHN0ZXBUcmFjZUlkcz8uRHJhZnRFeHRyYWN0KSk7XG4gICAgICBhZGRUcmFjZShcInRpY2tldC1maW5hbGl6ZVwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LlRpY2tldEZpbmFsaXplKSk7XG4gICAgICBhZGRUcmFjZShcImV4cGVuc2Utc2hlZXQtbGlua1wiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LlNoZWV0TGluaykpO1xuICAgIH0sXG4gICAgW2FkZFRyYWNlXVxuICApO1xuXG4gIGNvbnN0IHJlc29sdmVRdWlja0NyZWF0ZUZhaWx1cmVNZXNzYWdlID0gdXNlQ2FsbGJhY2soKHJlc3BvbnNlOiBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLkRhdGE7XG4gICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoZGF0YT8uRmlsZUlkKTtcbiAgICBjb25zdCBjb21wbGV0ZWRTdGFnZSA9IHNhZmVUZXh0KGRhdGE/LkNvbXBsZXRlZFN0YWdlKTtcbiAgICBjb25zdCByZXNwb25zZU1lc3NhZ2UgPSBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKTtcbiAgICBjb25zdCB2YWxpZGF0aW9uVGV4dCA9IGZvcm1hdFZhbGlkYXRpb25FcnJvcnMocmVzcG9uc2UuRXJyb3JzKTtcbiAgICBjb25zdCByZXRyeUFmdGVyID0gc2FmZVRleHQocmVzcG9uc2UuUmV0cnlBZnRlcik7XG4gICAgY29uc3QgbWVzc2FnZVBhcnRzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgaWYgKHJlc3BvbnNlLkh0dHBTdGF0dXMgPT09IDQyOSkge1xuICAgICAgbWVzc2FnZVBhcnRzLnB1c2gocmVzcG9uc2VNZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9SYXRlTGltaXRcIiwgXCJUb28gbWFueSByZXF1ZXN0cy5cIikpO1xuICAgICAgaWYgKHJldHJ5QWZ0ZXIpIHtcbiAgICAgICAgbWVzc2FnZVBhcnRzLnB1c2goXG4gICAgICAgICAgaW5kRm9ybWF0KFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmV0cnlBZnRlckhpbnRcIiwgXCJSZXRyeSBhZnRlciB7MH0uXCIsIHJldHJ5QWZ0ZXIpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uVGV4dCkge1xuICAgICAgbWVzc2FnZVBhcnRzLnB1c2godmFsaWRhdGlvblRleHQpO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2VNZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlUGFydHMucHVzaChyZXNwb25zZU1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAoZmlsZUlkKSB7XG4gICAgICBtZXNzYWdlUGFydHMucHVzaChcbiAgICAgICAgaW5kVChcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1BhcnRpYWxcIixcbiAgICAgICAgICBcIlRoZSB0aWNrZXQgd2FzIGNyZWF0ZWQsIGJ1dCB0aGUgZnVsbCBwcm9jZXNzIGRpZCBub3QgZmluaXNoLlwiXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA0MDQpIHtcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob3RGb3VuZFwiLCBcIlJlY29yZCBub3QgZm91bmQuXCIpKTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLkh0dHBTdGF0dXMgPT09IDUwMCkge1xuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1NlcnZlclwiLCBcIlNlcnZlciBlcnJvci5cIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlUGFydHMucHVzaChpbmRUKFwiQXBpX1JlcXVlc3RGYWlsZWRcIiwgXCJSZXF1ZXN0IGZhaWxlZC5cIikpO1xuICAgIH1cblxuICAgIGlmIChmaWxlSWQgJiYgY29tcGxldGVkU3RhZ2UpIHtcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZEZvcm1hdChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1N0YWdlXCIsIFwiQ29tcGxldGVkIHN0YWdlOiB7MH0uXCIsIGNvbXBsZXRlZFN0YWdlKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2VQYXJ0cy5maWx0ZXIoQm9vbGVhbikuam9pbihcIiBcIik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBjb21wbGV0ZUZsb3dTdWNjZXNzID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGZpbGVJZDogc3RyaW5nLCBsaW5rZWRUb1NoZWV0OiBib29sZWFuLCBjYWNoZUtleTogc3RyaW5nKSA9PiB7XG4gICAgICBzZXRQcm9ncmVzc0tleShcImRvbmVcIik7XG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJkb25lXCIpO1xuICAgICAgYXdhaXQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKGNhY2hlS2V5KTtcbiAgICAgIHNldEF0dGVtcHRJZChcIlwiKTtcbiAgICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgIHNldEJ1c3koZmFsc2UpO1xuICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHNldFByb2dyZXNzRWxhcHNlZE1zKDApO1xuICAgICAgb25Db21wbGV0ZWQ/Lih7IGZpbGVJZCwgbGlua2VkVG9TaGVldCB9KTtcbiAgICB9LFxuICAgIFtvbkNvbXBsZXRlZF1cbiAgKTtcblxuICBjb25zdCBydW5RdWlja0NyZWF0ZUZsb3cgPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAoZmlsZTogRmlsZSwgY2FjaGVLZXk6IHN0cmluZywgY29udGV4dDogUXVpY2tUaWNrZXRBdHRlbXB0Q29udGV4dCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgc2V0QnVzeSh0cnVlKTtcbiAgICAgIHNldFByb2dyZXNzS2V5KFwiY3JlYXRpbmdUaWNrZXRcIik7XG4gICAgICBjbGVhckZsb3dTdGF0ZSgpO1xuXG4gICAgICBjb25zdCByZXF1ZXN0U3RhcnRlZEF0ID0gRGF0ZS5ub3coKTtcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcInF1aWNrLWNyZWF0ZS5yZXF1ZXN0LnN0YXJ0ZWRcIiwge1xuICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxuICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxuICAgICAgICBsaW5rVG9TaGVldCxcbiAgICAgICAgY2FjaGVLZXksXG4gICAgICAgIGVsYXBzZWRTaW5jZVNlbGVjdGlvbk1zOiBNYXRoLm1heCgwLCByZXF1ZXN0U3RhcnRlZEF0IC0gY29udGV4dC5zdGFydGVkQXQpLFxuICAgICAgICB1cGxvYWRGaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxuICAgICAgICBvcHRpbWl6YXRpb246IGJ1aWxkT3B0aW1pemF0aW9uTG9nRGF0YShjb250ZXh0Lm9wdGltaXphdGlvbiksXG4gICAgICAgIHNoZWV0SWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQoc2hlZXRJZCkgOiBcIlwiLFxuICAgICAgICBwcm9qZWN0SWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQocHJvamVjdElkKSA6IFwiXCIsXG4gICAgICB9KTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayhcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aWNrZXRJbWFnZTogZmlsZSxcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBsaW5rVG9TaGVldCA/IHNhZmVUZXh0KHNoZWV0SWQpIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2plY3RJZDogbGlua1RvU2hlZXQgPyBzYWZlVGV4dChwcm9qZWN0SWQpIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJ1aWxkQXBpT3B0aW9ucygpXG4gICAgICAgICk7XG5cbiAgICAgICAgYWRkUXVpY2tDcmVhdGVSZXNwb25zZVRyYWNlcyhyZXNwb25zZSk7XG5cbiAgICAgICAgY29uc3QgcmVzcG9uc2VFbGFwc2VkTXMgPSBNYXRoLm1heCgwLCBEYXRlLm5vdygpIC0gcmVxdWVzdFN0YXJ0ZWRBdCk7XG5cbiAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uRmlsZUlkKTtcbiAgICAgICAgY29uc3QgbGlua2VkVG9TaGVldCA9IHJlc3BvbnNlLkRhdGE/LkxpbmtlZFRvU2hlZXQgPT09IHRydWU7XG4gICAgICAgIGNvbnN0IHBhcnRpYWxTdGF0ZSA9XG4gICAgICAgICAgZmlsZUlkXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgICAgICAgbGlua2VkVG9TaGVldCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uQ29tcGxldGVkU3RhZ2UpLFxuICAgICAgICAgICAgICAgIHVybEZpbGU6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LlVybEZpbGUpLFxuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5GaWxlTmFtZSksXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcmVzcG9uc2UuRGF0YT8uUHJvY2Vzc2VkQnlBSSA/PyBudWxsLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgaWYgKHBhcnRpYWxTdGF0ZSkge1xuICAgICAgICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IHBhcnRpYWxTdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXNwb25zZS5TdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKCFmaWxlSWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm9GaWxlSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSB0aWNrZXQgZmlsZSBpZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGF3YWl0IGNvbXBsZXRlRmxvd1N1Y2Nlc3MoZmlsZUlkLCBsaW5rZWRUb1NoZWV0LCBjYWNoZUtleSk7XG4gICAgICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwicXVpY2stY3JlYXRlLnJlcXVlc3Quc3VjY2VlZGVkXCIsIHtcbiAgICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXG4gICAgICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxuICAgICAgICAgICAgZWxhcHNlZE1zOiByZXNwb25zZUVsYXBzZWRNcyxcbiAgICAgICAgICAgIGh0dHBTdGF0dXM6IHJlc3BvbnNlLkh0dHBTdGF0dXMsXG4gICAgICAgICAgICB0cmFjZUlkOiBzYWZlVGV4dChyZXNwb25zZS5UcmFjZUlkKSxcbiAgICAgICAgICAgIGZpbGVJZCxcbiAgICAgICAgICAgIGxpbmtlZFRvU2hlZXQsXG4gICAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uQ29tcGxldGVkU3RhZ2UpLFxuICAgICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcmVzcG9uc2UuRGF0YT8uUHJvY2Vzc2VkQnlBSSA/PyBudWxsLFxuICAgICAgICAgICAgc3RlcFRyYWNlSWRzOiByZXNwb25zZS5EYXRhPy5TdGVwVHJhY2VJZHMgPz8gbnVsbCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFydGlhbFN0YXRlKSB7XG4gICAgICAgICAgc2V0UGFydGlhbFRpY2tldEZhaWx1cmUocGFydGlhbFN0YXRlKTtcbiAgICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJxdWljay1jcmVhdGUucGFydGlhbC1zdGF0ZVwiLCB7XG4gICAgICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxuICAgICAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcbiAgICAgICAgICAgIGVsYXBzZWRNczogcmVzcG9uc2VFbGFwc2VkTXMsXG4gICAgICAgICAgICBmaWxlSWQ6IHBhcnRpYWxTdGF0ZS5maWxlSWQsXG4gICAgICAgICAgICBsaW5rZWRUb1NoZWV0OiBwYXJ0aWFsU3RhdGUubGlua2VkVG9TaGVldCxcbiAgICAgICAgICAgIGNvbXBsZXRlZFN0YWdlOiBwYXJ0aWFsU3RhdGUuY29tcGxldGVkU3RhZ2UsXG4gICAgICAgICAgICBwcm9jZXNzZWRCeUFJOiBwYXJ0aWFsU3RhdGUucHJvY2Vzc2VkQnlBSSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRNZXNzYWdlID0gcmVzb2x2ZVF1aWNrQ3JlYXRlRmFpbHVyZU1lc3NhZ2UocmVzcG9uc2UpO1xuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJxdWljay1jcmVhdGUucmVxdWVzdC5jb21wbGV0ZWQtd2l0aC1lcnJvclwiLCB7XG4gICAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcbiAgICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxuICAgICAgICAgIGVsYXBzZWRNczogcmVzcG9uc2VFbGFwc2VkTXMsXG4gICAgICAgICAgaHR0cFN0YXR1czogcmVzcG9uc2UuSHR0cFN0YXR1cyxcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVGV4dChyZXNwb25zZS5UcmFjZUlkKSxcbiAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgbGlua2VkVG9TaGVldCxcbiAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uQ29tcGxldGVkU3RhZ2UpLFxuICAgICAgICAgIHByb2Nlc3NlZEJ5QUk6IHJlc3BvbnNlLkRhdGE/LlByb2Nlc3NlZEJ5QUkgPz8gbnVsbCxcbiAgICAgICAgICByZXRyeUFmdGVyOiBzYWZlVGV4dChyZXNwb25zZS5SZXRyeUFmdGVyKSxcbiAgICAgICAgICBtZXNzYWdlOiBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKSxcbiAgICAgICAgICByZXNvbHZlZE1lc3NhZ2UsXG4gICAgICAgICAgZXJyb3JzOiBBcnJheS5pc0FycmF5KHJlc3BvbnNlLkVycm9ycykgPyByZXNwb25zZS5FcnJvcnMgOiBbXSxcbiAgICAgICAgICBzdGVwVHJhY2VJZHM6IHJlc3BvbnNlLkRhdGE/LlN0ZXBUcmFjZUlkcyA/PyBudWxsLFxuICAgICAgICB9KTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVkTWVzc2FnZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XG4gICAgICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtcXVpY2stY3JlYXRlLWVycm9yXCIsIGV4dHJhY3RUcmFjZUlkRnJvbUVycm9yKGVycm9yKSk7XG4gICAgICAgIH1cblxuICAgICAgICBsb2dRdWlja1RpY2tldEVycm9yKFwicXVpY2stY3JlYXRlLnJlcXVlc3QuZmFpbGVkXCIsIHtcbiAgICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxuICAgICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXG4gICAgICAgICAgZWxhcHNlZE1zOiBNYXRoLm1heCgwLCBEYXRlLm5vdygpIC0gcmVxdWVzdFN0YXJ0ZWRBdCksXG4gICAgICAgICAgdXBsb2FkRmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcbiAgICAgICAgICB0cmFjZUlkOiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgPyBleHRyYWN0VHJhY2VJZEZyb21FcnJvcihlcnJvcikgOiBcIlwiLFxuICAgICAgICAgIHN0YXR1czogZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yID8gZXJyb3Iuc3RhdHVzIDogbnVsbCxcbiAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgOiBcIlwiLFxuICAgICAgICAgIHZhbGlkYXRpb25FcnJvcnM6IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLnZhbGlkYXRpb25FcnJvcnMgOiBbXSxcbiAgICAgICAgfSk7XG4gICAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcbiAgICAgICAgc2V0QnVzeShmYWxzZSk7XG4gICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKHJlc29sdmVVaUVycm9yTWVzc2FnZShlcnJvcikpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW1xuICAgICAgYWRkUXVpY2tDcmVhdGVSZXNwb25zZVRyYWNlcyxcbiAgICAgIGFkZFRyYWNlLFxuICAgICAgYnVpbGRBcGlPcHRpb25zLFxuICAgICAgY2xlYXJGbG93U3RhdGUsXG4gICAgICBjb21wbGV0ZUZsb3dTdWNjZXNzLFxuICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgbGlua1RvU2hlZXQsXG4gICAgICBwcm9qZWN0SWQsXG4gICAgICByZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZSxcbiAgICAgIHJlc29sdmVVaUVycm9yTWVzc2FnZSxcbiAgICAgIHNoZWV0SWQsXG4gICAgXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdGVkRmlsZSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChmaWxlOiBGaWxlIHwgbnVsbCwgc291cmNlOiBUaWNrZXRJbWFnZVNvdXJjZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgaWYgKCFmaWxlKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGF0dGVtcHRJZCA9IHJlc29sdmVSYW5kb21LZXkoKTtcbiAgICAgIGNvbnN0IHNlbGVjdGlvblN0YXJ0ZWRBdCA9IERhdGUubm93KCk7XG4gICAgICBzZXRBdHRlbXB0SWQoYXR0ZW1wdElkKTtcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcInNlbGVjdGlvbi5yZWNlaXZlZFwiLCB7XG4gICAgICAgIGF0dGVtcHRJZCxcbiAgICAgICAgc291cmNlLFxuICAgICAgICBsaW5rVG9TaGVldCxcbiAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbigpKSB7XG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5mb3JiaWRkZW5cIiwge1xuICAgICAgICAgIGF0dGVtcHRJZCxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgbGlua1RvU2hlZXQsXG4gICAgICAgICAgY2FuQ3JlYXRlRXhwZW5zZSxcbiAgICAgICAgICBpc0NyZWF0ZU1vZGUsXG4gICAgICAgICAgaXNTaGVldExvY2tlZCxcbiAgICAgICAgICBoYXNTaGVldElkOiAhIXNhZmVUZXh0KHNoZWV0SWQpLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzYWZlVHlwZSA9IHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChzYWZlVHlwZSAmJiAhc2FmZVR5cGUuc3RhcnRzV2l0aChcImltYWdlL1wiKSAmJiAhL1xcLihqcGU/Z3xwbmd8d2VicCkkL2kudGVzdChmaWxlLm5hbWUgfHwgXCJcIikpIHtcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwic2VsZWN0aW9uLmludmFsaWQtZmlsZS10eXBlXCIsIHtcbiAgICAgICAgICBhdHRlbXB0SWQsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXG4gICAgICAgICAgcmVhc29uOiBcIm1pbWUtYW5kLWV4dGVuc2lvbi1ub3Qtc3VwcG9ydGVkXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUoZmlsZSkpIHtcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwic2VsZWN0aW9uLmludmFsaWQtZmlsZS10eXBlXCIsIHtcbiAgICAgICAgICBhdHRlbXB0SWQsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXG4gICAgICAgICAgcmVhc29uOiBcInVuc3VwcG9ydGVkLXRpY2tldC1pbWFnZS1maWxlXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY2xlYXJGbG93U3RhdGUoKTtcbiAgICAgIHNldFByb2dyZXNzS2V5KFwidXBsb2FkaW5nSW1hZ2VcIik7XG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJ1cGxvYWRpbmdJbWFnZVwiKTtcbiAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBzZWxlY3Rpb25TdGFydGVkQXQ7XG4gICAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcIm9wdGltaXphdGlvbi5zdGFydGVkXCIsIHtcbiAgICAgICAgYXR0ZW1wdElkLFxuICAgICAgICBzb3VyY2UsXG4gICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3Qgb3B0aW1pemF0aW9uUmVzdWx0ID0gYXdhaXQgb3B0aW1pemVUaWNrZXRJbWFnZUZvclVwbG9hZChmaWxlKS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwib3B0aW1pemF0aW9uLmZhaWxlZFwiLCB7XG4gICAgICAgICAgYXR0ZW1wdElkLFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxuICAgICAgICAgIG1lc3NhZ2U6IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSA6IFwiXCIsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYnVpbGRGYWxsYmFja09wdGltaXphdGlvblJlc3VsdChmaWxlKTtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgdXBsb2FkRmlsZSA9IG9wdGltaXphdGlvblJlc3VsdC5maWxlO1xuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwib3B0aW1pemF0aW9uLmNvbXBsZXRlZFwiLCB7XG4gICAgICAgIGF0dGVtcHRJZCxcbiAgICAgICAgc291cmNlLFxuICAgICAgICAuLi5idWlsZE9wdGltaXphdGlvbkxvZ0RhdGEob3B0aW1pemF0aW9uUmVzdWx0KSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAodXBsb2FkRmlsZS5zaXplID4gTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTKSB7XG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5yZWplY3RlZC1ieS1zaXplXCIsIHtcbiAgICAgICAgICBhdHRlbXB0SWQsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIG1heFNpemVCeXRlczogTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTLFxuICAgICAgICAgIG1heFNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMpLFxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEodXBsb2FkRmlsZSksXG4gICAgICAgICAgb3B0aW1pemF0aW9uOiBidWlsZE9wdGltaXphdGlvbkxvZ0RhdGEob3B0aW1pemF0aW9uUmVzdWx0KSxcbiAgICAgICAgfSk7XG4gICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xuICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlU2l6ZVwiLCBcIkltYWdlIGV4Y2VlZHMgNTBNQiBtYXggc2l6ZS5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNhY2hlS2V5ID0gYXR0ZW1wdElkO1xuICAgICAgbGF0ZXN0RmlsZVJlZi5jdXJyZW50ID0geyBjYWNoZUtleSwgZmlsZTogdXBsb2FkRmlsZSB9O1xuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwiY2FjaGUuc3RvcmUuc3RhcnRlZFwiLCB7XG4gICAgICAgIGF0dGVtcHRJZCxcbiAgICAgICAgc291cmNlLFxuICAgICAgICBjYWNoZUtleSxcbiAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YSh1cGxvYWRGaWxlKSxcbiAgICAgIH0pO1xuICAgICAgdm9pZCBjYWNoZUltYWdlRmlsZShjYWNoZUtleSwgdXBsb2FkRmlsZSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcImNhY2hlLnN0b3JlLmNvbXBsZXRlZFwiLCB7XG4gICAgICAgICAgICBhdHRlbXB0SWQsXG4gICAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgICBjYWNoZUtleSxcbiAgICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEodXBsb2FkRmlsZSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJjYWNoZS5zdG9yZS5mYWlsZWRcIiwge1xuICAgICAgICAgICAgYXR0ZW1wdElkLFxuICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgY2FjaGVLZXksXG4gICAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKHVwbG9hZEZpbGUpLFxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIDogXCJcIixcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHJ1blF1aWNrQ3JlYXRlRmxvdyh1cGxvYWRGaWxlLCBjYWNoZUtleSwge1xuICAgICAgICBhdHRlbXB0SWQsXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgc3RhcnRlZEF0OiBzZWxlY3Rpb25TdGFydGVkQXQsXG4gICAgICAgIG9wdGltaXphdGlvbjogb3B0aW1pemF0aW9uUmVzdWx0LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbY2FuQ3JlYXRlRXhwZW5zZSwgY2xlYXJGbG93U3RhdGUsIGVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbiwgaXNDcmVhdGVNb2RlLCBpc1NoZWV0TG9ja2VkLCBsaW5rVG9TaGVldCwgcnVuUXVpY2tDcmVhdGVGbG93LCBzaGVldElkXVxuICApO1xuXG4gIGNvbnN0IHJldHJ5UGVuZGluZ1VwbG9hZCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcbiAgICByZXR1cm47XG4gIH0sIFtdKTtcblxuICBjb25zdCBvcGVuQ3JlYXRlZFRpY2tldCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBjcmVhdGVkVGlja2V0ID0gcGFydGlhbFRpY2tldEZhaWx1cmUgfHwgbGF0ZXN0Q3JlYXRlZFRpY2tldFJlZi5jdXJyZW50O1xuICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGNyZWF0ZWRUaWNrZXQ/LmZpbGVJZCk7XG4gICAgaWYgKCFmaWxlSWQpIHJldHVybjtcblxuICAgIGNsZWFyQ2FjaGVkQ3VycmVudEltYWdlKCk7XG4gICAgc2V0QXR0ZW1wdElkKFwiXCIpO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgICBvbkNvbXBsZXRlZD8uKHsgZmlsZUlkLCBsaW5rZWRUb1NoZWV0OiBjcmVhdGVkVGlja2V0Py5saW5rZWRUb1NoZWV0ID09PSB0cnVlIH0pO1xuICB9LCBbY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2UsIG9uQ29tcGxldGVkLCBwYXJ0aWFsVGlja2V0RmFpbHVyZV0pO1xuXG4gIGNvbnN0IG9wZW5Tb3VyY2VQaWNrZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24oKSkgcmV0dXJuO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKHRydWUpO1xuICB9LCBbZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uXSk7XG5cbiAgY29uc3QgY2xvc2VTb3VyY2VQaWNrZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGJ1c3kpIHJldHVybjtcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcbiAgfSwgW2J1c3ldKTtcblxuICBjb25zdCByZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbiA9IHVzZUNhbGxiYWNrKGFzeW5jICgpOiBQcm9taXNlPGJvb2xlYW4gfCBudWxsPiA9PiB7XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IG1lZGlhRGV2aWNlcyA9IG5hdmlnYXRvci5tZWRpYURldmljZXM7XG4gICAgaWYgKCFtZWRpYURldmljZXMgfHwgdHlwZW9mIG1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RyZWFtID0gYXdhaXQgbWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7XG4gICAgICAgIHZpZGVvOiB7IGZhY2luZ01vZGU6IFwiZW52aXJvbm1lbnRcIiB9LFxuICAgICAgfSk7XG4gICAgICBzdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCgodHJhY2spID0+IHRyYWNrLnN0b3AoKSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBzZWxlY3RGcm9tQ2FtZXJhID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IG51bGwpID0+IHtcbiAgICAgIGlmICghaW5wdXRFbGVtZW50KSByZXR1cm47XG4gICAgICBjb25zdCBncmFudGVkID0gYXdhaXQgcmVxdWVzdENhbWVyYVBlcm1pc3Npb24oKTtcbiAgICAgIGlmIChncmFudGVkID09PSBmYWxzZSkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0NhbWVyYVBlcm1pc3Npb25cIiwgXCJDYW1lcmEgcGVybWlzc2lvbiBpcyByZXF1aXJlZC5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcbiAgICAgIGlucHV0RWxlbWVudC5jbGljaygpO1xuICAgIH0sXG4gICAgW3JlcXVlc3RDYW1lcmFQZXJtaXNzaW9uXVxuICApO1xuXG4gIGNvbnN0IHNlbGVjdEZyb21HYWxsZXJ5ID0gdXNlQ2FsbGJhY2soKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IG51bGwpID0+IHtcbiAgICBpZiAoIWlucHV0RWxlbWVudCkgcmV0dXJuO1xuICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xuICAgIGlucHV0RWxlbWVudC5jbGljaygpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJFcnJvciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjbGVhckNhY2hlZEN1cnJlbnRJbWFnZSgpO1xuICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgc2V0QXR0ZW1wdElkKFwiXCIpO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XG4gIH0sIFtjbGVhckNhY2hlZEN1cnJlbnRJbWFnZV0pO1xuXG4gIHJldHVybiB7XG4gICAgc291cmNlUGlja2VyT3BlbixcbiAgICBidXN5LFxuICAgIHByb2dyZXNzS2V5LFxuICAgIHByb2dyZXNzTWVzc2FnZSxcbiAgICBwcm9ncmVzc1N0YWdlcyxcbiAgICBwcm9ncmVzc0VsYXBzZWRNcyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgYXR0ZW1wdElkLFxuICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeTogZmFsc2UsXG4gICAgaGFzUGFydGlhbFRpY2tldEZhaWx1cmU6IHBhcnRpYWxUaWNrZXRGYWlsdXJlICE9PSBudWxsLFxuICAgIHRyYWNlTGlzdCxcbiAgICBvcGVuU291cmNlUGlja2VyLFxuICAgIGNsb3NlU291cmNlUGlja2VyLFxuICAgIHNlbGVjdEZyb21DYW1lcmEsXG4gICAgc2VsZWN0RnJvbUdhbGxlcnksXG4gICAgaGFuZGxlU2VsZWN0ZWRGaWxlLFxuICAgIHJldHJ5UGVuZGluZ1VwbG9hZCxcbiAgICBvcGVuQ3JlYXRlZFRpY2tldCxcbiAgICBjbGVhckVycm9yLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuXG5jb25zdCBNQVhfVElDS0VUX1VQTE9BRF9MT05HX1NJREVfUFggPSAyMDQ4O1xuY29uc3QgTUlOX1RJQ0tFVF9VUExPQURfU0hPUlRfU0lERV9QWCA9IDc2ODtcbmNvbnN0IFRJQ0tFVF9SRUVOQ09ERV9RVUFMSVRZID0gMC44NTtcbmNvbnN0IE1JTl9USUNLRVRfUkVFTkNPREVfQllURVMgPSA0ICogMTAyNCAqIDEwMjQ7XG5jb25zdCBNSU5fVElDS0VUX1JFRFVDVElPTl9CWVRFUyA9IDI1NiAqIDEwMjQ7XG5jb25zdCBNSU5fVElDS0VUX1JFRFVDVElPTl9SQVRJTyA9IDAuMTI7XG5cbnR5cGUgTG9hZGVkSW1hZ2UgPSB7XG4gIGVsZW1lbnQ6IEhUTUxJbWFnZUVsZW1lbnQ7XG4gIHdpZHRoOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBkaXNwb3NlOiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgVGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQgPSB7XG4gIGZpbGU6IEZpbGU7XG4gIGNoYW5nZWQ6IGJvb2xlYW47XG4gIHJlYXNvbjogc3RyaW5nO1xuICByZXNpemVkOiBib29sZWFuO1xuICByZWVuY29kZWQ6IGJvb2xlYW47XG4gIGVsYXBzZWRNczogbnVtYmVyO1xuICBvcmlnaW5hbDoge1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgc2l6ZTogbnVtYmVyO1xuICAgIHdpZHRoOiBudW1iZXIgfCBudWxsO1xuICAgIGhlaWdodDogbnVtYmVyIHwgbnVsbDtcbiAgfTtcbiAgb3V0cHV0OiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBzaXplOiBudW1iZXI7XG4gICAgd2lkdGg6IG51bWJlciB8IG51bGw7XG4gICAgaGVpZ2h0OiBudW1iZXIgfCBudWxsO1xuICB9O1xufTtcblxuY29uc3Qgbm9ybWFsaXplTWltZVR5cGUgPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKTtcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiaW1hZ2UvcGpwZWdcIiB8fCBub3JtYWxpemVkID09PSBcImltYWdlL2pwZ1wiKSB7XG4gICAgcmV0dXJuIFwiaW1hZ2UvanBlZ1wiO1xuICB9XG4gIHJldHVybiBub3JtYWxpemVkO1xufTtcblxuY29uc3QgcmVwbGFjZUZpbGVFeHRlbnNpb24gPSAoZmlsZU5hbWU6IHN0cmluZywgZXh0ZW5zaW9uOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBiYXNlTmFtZSA9IHNhZmVUZXh0KGZpbGVOYW1lKS5yZXBsYWNlKC9cXC5bYS16MC05XSskL2ksIFwiXCIpO1xuICBjb25zdCBzYWZlQmFzZU5hbWUgPSBiYXNlTmFtZSB8fCBcInRpY2tldFwiO1xuICBjb25zdCBzYWZlRXh0ZW5zaW9uID0gc2FmZVRleHQoZXh0ZW5zaW9uKS5yZXBsYWNlKC9eXFwuLywgXCJcIikudG9Mb3dlckNhc2UoKSB8fCBcImpwZ1wiO1xuICByZXR1cm4gYCR7c2FmZUJhc2VOYW1lfS4ke3NhZmVFeHRlbnNpb259YDtcbn07XG5cbi8vIExvYWRzIG9uZSBpbWFnZSBlbGVtZW50IHNvIGNhbnZhcyByZXNpemluZyBrZWVwcyB0aGUgYnJvd3Nlci1kZWNvZGVkIG9yaWVudGF0aW9uLlxuY29uc3QgbG9hZEltYWdlID0gYXN5bmMgKGZpbGU6IEZpbGUpOiBQcm9taXNlPExvYWRlZEltYWdlIHwgbnVsbD4gPT4ge1xuICBpZiAodHlwZW9mIEltYWdlID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBVUkwgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3Qgb2JqZWN0VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgaW1hZ2UuZGVjb2RpbmcgPSBcImFzeW5jXCI7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpbWFnZS5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKCk7XG4gICAgICBpbWFnZS5vbmVycm9yID0gKCkgPT4gcmVqZWN0KG5ldyBFcnJvcihcIkNvdWxkIG5vdCBkZWNvZGUgaW1hZ2UuXCIpKTtcbiAgICAgIGltYWdlLnNyYyA9IG9iamVjdFVybDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHdpZHRoID0gTnVtYmVyKGltYWdlLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aCB8fCAwKTtcbiAgICBjb25zdCBoZWlnaHQgPSBOdW1iZXIoaW1hZ2UubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQgfHwgMCk7XG4gICAgaWYgKCEod2lkdGggPiAwKSB8fCAhKGhlaWdodCA+IDApKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgZWxlbWVudDogaW1hZ2UsXG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGRpc3Bvc2U6ICgpID0+IHtcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xuICAgICAgfSxcbiAgICB9O1xuICB9IGNhdGNoIHtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbmNvbnN0IHJlc29sdmVSZXNpemVEaW1lbnNpb25zID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogeyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlcjsgcmVzaXplZDogYm9vbGVhbiB9ID0+IHtcbiAgY29uc3QgbG9uZ1NpZGUgPSBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KTtcbiAgY29uc3Qgc2hvcnRTaWRlID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCk7XG4gIGlmIChsb25nU2lkZSA8PSBNQVhfVElDS0VUX1VQTE9BRF9MT05HX1NJREVfUFgpIHtcbiAgICByZXR1cm4geyB3aWR0aCwgaGVpZ2h0LCByZXNpemVkOiBmYWxzZSB9O1xuICB9XG5cbiAgY29uc3QgbWF4TG9uZ1NpZGVTY2FsZSA9IE1BWF9USUNLRVRfVVBMT0FEX0xPTkdfU0lERV9QWCAvIGxvbmdTaWRlO1xuICBjb25zdCBtaW5TaG9ydFNpZGVTY2FsZSA9IE1JTl9USUNLRVRfVVBMT0FEX1NIT1JUX1NJREVfUFggLyBzaG9ydFNpZGU7XG4gIGNvbnN0IHNjYWxlID0gTWF0aC5tYXgobWF4TG9uZ1NpZGVTY2FsZSwgbWluU2hvcnRTaWRlU2NhbGUpO1xuICBpZiAoIShzY2FsZSA8IDEpKSB7XG4gICAgcmV0dXJuIHsgd2lkdGgsIGhlaWdodCwgcmVzaXplZDogZmFsc2UgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IE1hdGgubWF4KDEsIE1hdGgucm91bmQod2lkdGggKiBzY2FsZSkpLFxuICAgIGhlaWdodDogTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChoZWlnaHQgKiBzY2FsZSkpLFxuICAgIHJlc2l6ZWQ6IHRydWUsXG4gIH07XG59O1xuXG5jb25zdCBjcmVhdGVDYW52YXMgPSAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwgPT4ge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICByZXR1cm4gY2FudmFzO1xufTtcblxuY29uc3QgY2FudmFzVG9CbG9iID0gKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIG1pbWVUeXBlOiBzdHJpbmcsIHF1YWxpdHk/OiBudW1iZXIpOiBQcm9taXNlPEJsb2IgfCBudWxsPiA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGNhbnZhcy50b0Jsb2IoKGJsb2IpID0+IHJlc29sdmUoYmxvYiksIG1pbWVUeXBlLCBxdWFsaXR5KTtcbiAgfSk7XG59O1xuXG5jb25zdCBidWlsZE9wdGltaXphdGlvblJlc3VsdCA9ICh7XG4gIGZpbGUsXG4gIG9yaWdpbmFsRmlsZSxcbiAgcmVhc29uLFxuICByZXNpemVkLFxuICByZWVuY29kZWQsXG4gIGVsYXBzZWRNcyxcbiAgb3JpZ2luYWxXaWR0aCxcbiAgb3JpZ2luYWxIZWlnaHQsXG4gIG91dHB1dFdpZHRoLFxuICBvdXRwdXRIZWlnaHQsXG59OiB7XG4gIGZpbGU6IEZpbGU7XG4gIG9yaWdpbmFsRmlsZTogRmlsZTtcbiAgcmVhc29uOiBzdHJpbmc7XG4gIHJlc2l6ZWQ6IGJvb2xlYW47XG4gIHJlZW5jb2RlZDogYm9vbGVhbjtcbiAgZWxhcHNlZE1zOiBudW1iZXI7XG4gIG9yaWdpbmFsV2lkdGg6IG51bWJlciB8IG51bGw7XG4gIG9yaWdpbmFsSGVpZ2h0OiBudW1iZXIgfCBudWxsO1xuICBvdXRwdXRXaWR0aDogbnVtYmVyIHwgbnVsbDtcbiAgb3V0cHV0SGVpZ2h0OiBudW1iZXIgfCBudWxsO1xufSk6IFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0ID0+IHtcbiAgcmV0dXJuIHtcbiAgICBmaWxlLFxuICAgIGNoYW5nZWQ6XG4gICAgICBmaWxlICE9PSBvcmlnaW5hbEZpbGUgfHxcbiAgICAgIGZpbGUuc2l6ZSAhPT0gb3JpZ2luYWxGaWxlLnNpemUgfHxcbiAgICAgIHNhZmVUZXh0KGZpbGUudHlwZSkudG9Mb3dlckNhc2UoKSAhPT0gc2FmZVRleHQob3JpZ2luYWxGaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCksXG4gICAgcmVhc29uLFxuICAgIHJlc2l6ZWQsXG4gICAgcmVlbmNvZGVkLFxuICAgIGVsYXBzZWRNcyxcbiAgICBvcmlnaW5hbDoge1xuICAgICAgbmFtZTogb3JpZ2luYWxGaWxlLm5hbWUsXG4gICAgICB0eXBlOiBvcmlnaW5hbEZpbGUudHlwZSxcbiAgICAgIHNpemU6IG9yaWdpbmFsRmlsZS5zaXplLFxuICAgICAgd2lkdGg6IG9yaWdpbmFsV2lkdGgsXG4gICAgICBoZWlnaHQ6IG9yaWdpbmFsSGVpZ2h0LFxuICAgIH0sXG4gICAgb3V0cHV0OiB7XG4gICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICB0eXBlOiBmaWxlLnR5cGUsXG4gICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICB3aWR0aDogb3V0cHV0V2lkdGgsXG4gICAgICBoZWlnaHQ6IG91dHB1dEhlaWdodCxcbiAgICB9LFxuICB9O1xufTtcblxuLy8gUmV0dXJucyB0aGUgdXBsb2FkIGZpbGUgdG8gdXNlLiBJdCBrZWVwcyB0aGUgb3JpZ2luYWwgd2hlbiByZWR1Y3Rpb24gd291bGQgYmUgcmlza3kgb3IgaXJyZWxldmFudC5cbmV4cG9ydCBjb25zdCBvcHRpbWl6ZVRpY2tldEltYWdlRm9yVXBsb2FkID0gYXN5bmMgKGZpbGU6IEZpbGUpOiBQcm9taXNlPFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0PiA9PiB7XG4gIGNvbnN0IHN0YXJ0ZWRBdCA9IERhdGUubm93KCk7XG4gIGlmICghKGZpbGUgaW5zdGFuY2VvZiBGaWxlKSkge1xuICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XG4gICAgICBmaWxlLFxuICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxuICAgICAgcmVhc29uOiBcImludmFsaWQtaW5wdXRcIixcbiAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxuICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcbiAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcbiAgICAgIG9yaWdpbmFsV2lkdGg6IG51bGwsXG4gICAgICBvcmlnaW5hbEhlaWdodDogbnVsbCxcbiAgICAgIG91dHB1dFdpZHRoOiBudWxsLFxuICAgICAgb3V0cHV0SGVpZ2h0OiBudWxsLFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3Qgbm9ybWFsaXplZE1pbWVUeXBlID0gbm9ybWFsaXplTWltZVR5cGUoZmlsZS50eXBlKTtcbiAgY29uc3QgbG9hZGVkSW1hZ2UgPSBhd2FpdCBsb2FkSW1hZ2UoZmlsZSk7XG4gIGlmICghbG9hZGVkSW1hZ2UpIHtcbiAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xuICAgICAgZmlsZSxcbiAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcbiAgICAgIHJlYXNvbjogXCJkZWNvZGUtdW5hdmFpbGFibGVcIixcbiAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxuICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcbiAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcbiAgICAgIG9yaWdpbmFsV2lkdGg6IG51bGwsXG4gICAgICBvcmlnaW5hbEhlaWdodDogbnVsbCxcbiAgICAgIG91dHB1dFdpZHRoOiBudWxsLFxuICAgICAgb3V0cHV0SGVpZ2h0OiBudWxsLFxuICAgIH0pO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGVsZW1lbnQgfSA9IGxvYWRlZEltYWdlO1xuICAgIGNvbnN0IHNob3J0U2lkZSA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpO1xuICAgIGNvbnN0IHJlc2l6ZVBsYW4gPSByZXNvbHZlUmVzaXplRGltZW5zaW9ucyh3aWR0aCwgaGVpZ2h0KTtcbiAgICBjb25zdCBjYW5SZWVuY29kZVNhZmVseSA9IHNob3J0U2lkZSA+PSBNSU5fVElDS0VUX1VQTE9BRF9TSE9SVF9TSURFX1BYO1xuICAgIGNvbnN0IGlzTGFyZ2VPcmlnaW5hbCA9IGZpbGUuc2l6ZSA+PSBNSU5fVElDS0VUX1JFRU5DT0RFX0JZVEVTO1xuICAgIGNvbnN0IHNob3VsZFJlc2l6ZSA9IHJlc2l6ZVBsYW4ucmVzaXplZDtcblxuICAgIGlmICghc2hvdWxkUmVzaXplICYmICghY2FuUmVlbmNvZGVTYWZlbHkgfHwgIWlzTGFyZ2VPcmlnaW5hbCkpIHtcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XG4gICAgICAgIGZpbGUsXG4gICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcbiAgICAgICAgcmVhc29uOiAhY2FuUmVlbmNvZGVTYWZlbHkgPyBcImtlcHQtc21hbGwtc2hvcnQtc2lkZVwiIDogXCJrZXB0LXNtYWxsLWZpbGVcIixcbiAgICAgICAgcmVzaXplZDogZmFsc2UsXG4gICAgICAgIHJlZW5jb2RlZDogZmFsc2UsXG4gICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcbiAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXG4gICAgICAgIG91dHB1dFdpZHRoOiB3aWR0aCxcbiAgICAgICAgb3V0cHV0SGVpZ2h0OiBoZWlnaHQsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobm9ybWFsaXplZE1pbWVUeXBlID09PSBcImltYWdlL3BuZ1wiICYmICFzaG91bGRSZXNpemUpIHtcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XG4gICAgICAgIGZpbGUsXG4gICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcbiAgICAgICAgcmVhc29uOiBcImtlcHQtcG5nLXdpdGhvdXQtcmVzaXplXCIsXG4gICAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxuICAgICAgICByZWVuY29kZWQ6IGZhbHNlLFxuICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXG4gICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxuICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxuICAgICAgICBvdXRwdXRXaWR0aDogd2lkdGgsXG4gICAgICAgIG91dHB1dEhlaWdodDogaGVpZ2h0LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgY2FudmFzID0gY3JlYXRlQ2FudmFzKHJlc2l6ZVBsYW4ud2lkdGgsIHJlc2l6ZVBsYW4uaGVpZ2h0KTtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzPy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgaWYgKCFjYW52YXMgfHwgIWNvbnRleHQpIHtcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XG4gICAgICAgIGZpbGUsXG4gICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcbiAgICAgICAgcmVhc29uOiBcImNhbnZhcy11bmF2YWlsYWJsZVwiLFxuICAgICAgICByZXNpemVkOiBmYWxzZSxcbiAgICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcbiAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxuICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcbiAgICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgb3V0cHV0V2lkdGg6IHdpZHRoLFxuICAgICAgICBvdXRwdXRIZWlnaHQ6IGhlaWdodCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcbiAgICBjb250ZXh0LmltYWdlU21vb3RoaW5nUXVhbGl0eSA9IFwiaGlnaFwiO1xuICAgIGNvbnRleHQuZHJhd0ltYWdlKGVsZW1lbnQsIDAsIDAsIHJlc2l6ZVBsYW4ud2lkdGgsIHJlc2l6ZVBsYW4uaGVpZ2h0KTtcblxuICAgIGNvbnN0IG91dHB1dE1pbWVUeXBlID1cbiAgICAgIG5vcm1hbGl6ZWRNaW1lVHlwZSA9PT0gXCJpbWFnZS93ZWJwXCJcbiAgICAgICAgPyBcImltYWdlL3dlYnBcIlxuICAgICAgICA6IG5vcm1hbGl6ZWRNaW1lVHlwZSA9PT0gXCJpbWFnZS9wbmdcIiAmJiBzaG91bGRSZXNpemVcbiAgICAgICAgICA/IFwiaW1hZ2UvanBlZ1wiXG4gICAgICAgICAgOiBcImltYWdlL2pwZWdcIjtcbiAgICBjb25zdCBvdXRwdXRFeHRlbnNpb24gPVxuICAgICAgb3V0cHV0TWltZVR5cGUgPT09IFwiaW1hZ2Uvd2VicFwiXG4gICAgICAgID8gXCJ3ZWJwXCJcbiAgICAgICAgOiBvdXRwdXRNaW1lVHlwZSA9PT0gXCJpbWFnZS9wbmdcIlxuICAgICAgICAgID8gXCJwbmdcIlxuICAgICAgICAgIDogXCJqcGdcIjtcbiAgICBjb25zdCBxdWFsaXR5ID0gb3V0cHV0TWltZVR5cGUgPT09IFwiaW1hZ2UvcG5nXCIgPyB1bmRlZmluZWQgOiBUSUNLRVRfUkVFTkNPREVfUVVBTElUWTtcbiAgICBjb25zdCBvcHRpbWl6ZWRCbG9iID0gYXdhaXQgY2FudmFzVG9CbG9iKGNhbnZhcywgb3V0cHV0TWltZVR5cGUsIHF1YWxpdHkpO1xuICAgIGlmICghb3B0aW1pemVkQmxvYiB8fCBvcHRpbWl6ZWRCbG9iLnNpemUgPD0gMCB8fCBvcHRpbWl6ZWRCbG9iLnNpemUgPj0gZmlsZS5zaXplKSB7XG4gICAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xuICAgICAgICBmaWxlLFxuICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXG4gICAgICAgIHJlYXNvbjogXCJvcHRpbWl6ZWQtbm90LXNtYWxsZXJcIixcbiAgICAgICAgcmVzaXplZDogc2hvdWxkUmVzaXplLFxuICAgICAgICByZWVuY29kZWQ6IG5vcm1hbGl6ZWRNaW1lVHlwZSAhPT0gb3V0cHV0TWltZVR5cGUgfHwgaXNMYXJnZU9yaWdpbmFsLFxuICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXG4gICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxuICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxuICAgICAgICBvdXRwdXRXaWR0aDogc2hvdWxkUmVzaXplID8gcmVzaXplUGxhbi53aWR0aCA6IHdpZHRoLFxuICAgICAgICBvdXRwdXRIZWlnaHQ6IHNob3VsZFJlc2l6ZSA/IHJlc2l6ZVBsYW4uaGVpZ2h0IDogaGVpZ2h0LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKCFzaG91bGRSZXNpemUpIHtcbiAgICAgIGNvbnN0IHNhdmVkQnl0ZXMgPSBmaWxlLnNpemUgLSBvcHRpbWl6ZWRCbG9iLnNpemU7XG4gICAgICBjb25zdCBzYXZlZFJhdGlvID0gc2F2ZWRCeXRlcyAvIE1hdGgubWF4KGZpbGUuc2l6ZSwgMSk7XG4gICAgICBpZiAoc2F2ZWRCeXRlcyA8IE1JTl9USUNLRVRfUkVEVUNUSU9OX0JZVEVTIHx8IHNhdmVkUmF0aW8gPCBNSU5fVElDS0VUX1JFRFVDVElPTl9SQVRJTykge1xuICAgICAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xuICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxuICAgICAgICAgIHJlYXNvbjogXCJyZWR1Y3Rpb24tdG9vLXNtYWxsXCIsXG4gICAgICAgICAgcmVzaXplZDogZmFsc2UsXG4gICAgICAgICAgcmVlbmNvZGVkOiB0cnVlLFxuICAgICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcbiAgICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcbiAgICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxuICAgICAgICAgIG91dHB1dFdpZHRoOiB3aWR0aCxcbiAgICAgICAgICBvdXRwdXRIZWlnaHQ6IGhlaWdodCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb3B0aW1pemVkRmlsZSA9IG5ldyBGaWxlKFtvcHRpbWl6ZWRCbG9iXSwgcmVwbGFjZUZpbGVFeHRlbnNpb24oZmlsZS5uYW1lLCBvdXRwdXRFeHRlbnNpb24pLCB7XG4gICAgICB0eXBlOiBvdXRwdXRNaW1lVHlwZSxcbiAgICAgIGxhc3RNb2RpZmllZDogZmlsZS5sYXN0TW9kaWZpZWQgfHwgRGF0ZS5ub3coKSxcbiAgICB9KTtcbiAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xuICAgICAgZmlsZTogb3B0aW1pemVkRmlsZSxcbiAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcbiAgICAgIHJlYXNvbjogXCJvcHRpbWl6ZWRcIixcbiAgICAgIHJlc2l6ZWQ6IHNob3VsZFJlc2l6ZSxcbiAgICAgIHJlZW5jb2RlZDogbm9ybWFsaXplZE1pbWVUeXBlICE9PSBvdXRwdXRNaW1lVHlwZSB8fCBpc0xhcmdlT3JpZ2luYWwsXG4gICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXG4gICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcbiAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXG4gICAgICBvdXRwdXRXaWR0aDogcmVzaXplUGxhbi53aWR0aCxcbiAgICAgIG91dHB1dEhlaWdodDogcmVzaXplUGxhbi5oZWlnaHQsXG4gICAgfSk7XG4gIH0gZmluYWxseSB7XG4gICAgbG9hZGVkSW1hZ2UuZGlzcG9zZSgpO1xuICB9XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUE4RDtBQUM5RCx1QkFBNkI7OztBQ0Q3QixtQkFBNkY7QUFhN0YsSUFBTSxtQ0FBbUM7QUFHekMsSUFBTSxzQkFBc0IsQ0FBQyxZQUFrQztBQUM3RCxNQUFJLE9BQU8sV0FBVyxZQUFhLFFBQU87QUFFMUMsUUFBTSxTQUFTLE9BQU8saUJBQWlCLE9BQU87QUFDOUMsTUFBSSxPQUFPLFlBQVksVUFBVSxPQUFPLGVBQWUsVUFBVTtBQUMvRCxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sT0FBTyxRQUFRLHNCQUFzQjtBQUMzQyxTQUFPLEtBQUssUUFBUSxLQUFLLEtBQUssU0FBUztBQUN6QztBQUdBLElBQU0sNEJBQTRCLE1BQXNDO0FBQ3RFLE1BQUksT0FBTyxhQUFhLGVBQWUsT0FBTyxXQUFXLGFBQWE7QUFDcEUsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFFBQVEsU0FBUyxpQkFBOEIsNkRBQTZEO0FBQ2xILGFBQVcsUUFBUSxPQUFPO0FBQ3hCLFFBQUksQ0FBQyxvQkFBb0IsSUFBSSxFQUFHO0FBRWhDLFVBQU0sT0FBTyxLQUFLLHNCQUFzQjtBQUN4QyxVQUFNLGdCQUFnQixPQUFPLGNBQWMsU0FBUyxnQkFBZ0IsZUFBZTtBQUNuRixRQUFJLGlCQUFpQixFQUFHLFFBQU87QUFFL0IsV0FBTztBQUFBLE1BQ0ws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
