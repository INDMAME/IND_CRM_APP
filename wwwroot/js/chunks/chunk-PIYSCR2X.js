import {
  flashActionMark
} from "./chunk-THYI4DWA.js";
import {
  createExpenseSheetTicketQuick,
  safeText
} from "./chunk-Z7ZJNPEE.js";
import {
  Spinner_default,
  classNames,
  indFormat,
  indT
} from "./chunk-BZRAWDAK.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  ApiFetchError
} from "./chunk-ZQSWXYLP.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2NvbXBvbmVudHMvRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5LnRzeCIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC90aWNrZXRJbWFnZU9wdGltaXphdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQsIGlzVmFsaWRFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5IH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50c1wiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbmNvbnN0IE1BWF9QQUdFX0JPVFRPTV9BQ1RJT05TID0gNDtcclxuY29uc3QgUEFHRV9CT1RUT01fQUNUSU9OU19UT1BfUEFERElOR19QWCA9IDEyO1xyXG5jb25zdCBQQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfUEFERElOR19QWCA9IDg7XHJcblxyXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBvbkNsaWNrPzogUmVhY3QuTW91c2VFdmVudEhhbmRsZXI8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBhcmlhTGFiZWw/OiBzdHJpbmc7XHJcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xyXG4gIHRhYkluZGV4PzogbnVtYmVyO1xyXG4gIGZ1bGxXaWR0aD86IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25zUHJvcHMgPSB7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxuICBhcmlhTGFiZWw6IHN0cmluZztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBEdW1iIGJ1dHRvbiB1c2VkIGJ5IHRoZSBzaGFyZWQgYm90dG9tIGFjdGlvbiBiYXIuXHJcbmV4cG9ydCBjb25zdCBQYWdlQm90dG9tQWN0aW9uQnV0dG9uID0gKHtcclxuICBsYWJlbCxcclxuICBkaXNhYmxlZCA9IGZhbHNlLFxyXG4gIG9uQ2xpY2ssXHJcbiAgY2xhc3NOYW1lLFxyXG4gIGFyaWFMYWJlbCxcclxuICB0eXBlID0gXCJidXR0b25cIixcclxuICB0YWJJbmRleCxcclxuICBmdWxsV2lkdGggPSBmYWxzZSxcclxufTogUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxidXR0b25cclxuICAgICAgdHlwZT17dHlwZX1cclxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxyXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XHJcbiAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgIFwiaW5saW5lLWJsb2NrIHctZnVsbCByb3VuZGVkLVs1cHhdIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTYwXCIsXHJcbiAgICAgICAgZnVsbFdpZHRoID8gXCJjb2wtc3Bhbi0yXCIgOiBcIlwiLFxyXG4gICAgICAgIGNsYXNzTmFtZSB8fCBcIlwiXHJcbiAgICAgICl9XHJcbiAgICA+XHJcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggbWluLWgtWzY4cHhdIHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bNXB4XSBib3JkZXIgYm9yZGVyLVsjMDAxZjRkXS84MCBiZy1wcmltYXJ5IHB4LTQgcHktMy41IHRleHQtY2VudGVyIHRleHQtWzE4cHhdIGZvbnQtYm9sZCBsZWFkaW5nLVsxLjFdIHRleHQtd2hpdGUgc2hhZG93LXhzIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTE1MCBob3ZlcjpiZy1bIzAwMWY0ZF0gc206bWluLWgtWzcycHhdIHNtOnB4LTUgc206cHktNCBzbTp0ZXh0LVsyMHB4XVwiPlxyXG4gICAgICAgIHtsYWJlbH1cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9idXR0b24+XHJcbiAgKTtcclxufTtcclxuXHJcblBhZ2VCb3R0b21BY3Rpb25CdXR0b24uZGlzcGxheU5hbWUgPSBcIlBhZ2VCb3R0b21BY3Rpb25CdXR0b25cIjtcclxuXHJcbi8vIEZpeGVkIGJvdHRvbSBhY3Rpb24gYmFyIHRoYXQgc3RheXMgdmlzaWJsZSB3aGlsZSB0aGUgcGFnZSBzY3JvbGxzLlxyXG5jb25zdCBQYWdlQm90dG9tQWN0aW9ucyA9ICh7IGNoaWxkcmVuLCBhcmlhTGFiZWwsIGNsYXNzTmFtZSB9OiBQYWdlQm90dG9tQWN0aW9uc1Byb3BzKSA9PiB7XHJcbiAgY29uc3QgYWN0aW9uQnV0dG9ucyA9IENoaWxkcmVuLnRvQXJyYXkoY2hpbGRyZW4pXHJcbiAgICAuZmlsdGVyKFxyXG4gICAgICAoY2hpbGQpOiBjaGlsZCBpcyBSZWFjdC5SZWFjdEVsZW1lbnQ8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzPiA9PlxyXG4gICAgICAgIGlzVmFsaWRFbGVtZW50PFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcz4oY2hpbGQpICYmIGNoaWxkLnR5cGUgPT09IFBhZ2VCb3R0b21BY3Rpb25CdXR0b25cclxuICAgIClcclxuICAgIC5zbGljZSgwLCBNQVhfUEFHRV9CT1RUT01fQUNUSU9OUyk7XHJcblxyXG4gIGNvbnN0IGFjdGlvbkNvdW50ID0gYWN0aW9uQnV0dG9ucy5sZW5ndGg7XHJcbiAgY29uc3QgeyByZXNlcnZlZEhlaWdodCwgd3JhcHBlclJlZiwgY29udGVudEluc2V0cyB9ID0gdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5KCk7XHJcbiAgY29uc3QgcG9ydGFsVGFyZ2V0ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gIGlmIChhY3Rpb25Db3VudCA8IDEpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYWN0aW9uQmFyID0gKFxyXG4gICAgPGRpdlxyXG4gICAgICByZWY9e3dyYXBwZXJSZWZ9XHJcbiAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LXgtMCBib3R0b20tMCB6LTE5MDAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTIwMC85MCBiZy13aGl0ZSBzaGFkb3ctWzBfLTEwcHhfMjhweF9yZ2JhKDE1LDIzLDQyLDAuMTIpXVwiXHJcbiAgICA+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICBwYWRkaW5nVG9wOiBgJHtQQUdFX0JPVFRPTV9BQ1RJT05TX1RPUF9QQURESU5HX1BYfXB4YCxcclxuICAgICAgICAgIHBhZGRpbmdMZWZ0OiBgJHtjb250ZW50SW5zZXRzPy5sZWZ0ID8/IFBBR0VfQk9UVE9NX0FDVElPTlNfU0lERV9QQURESU5HX1BYfXB4YCxcclxuICAgICAgICAgIHBhZGRpbmdSaWdodDogYCR7Y29udGVudEluc2V0cz8ucmlnaHQgPz8gUEFHRV9CT1RUT01fQUNUSU9OU19TSURFX1BBRERJTkdfUFh9cHhgLFxyXG4gICAgICAgICAgcGFkZGluZ0JvdHRvbTogXCJjYWxjKDAuNzVyZW0gKyBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSwgMHB4KSlcIixcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgcm9sZT1cInRvb2xiYXJcIlxyXG4gICAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwicG9pbnRlci1ldmVudHMtYXV0byB3LWZ1bGxcIiwgY2xhc3NOYW1lIHx8IFwiXCIpfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMS41XCI+XHJcbiAgICAgICAgICAgIHthY3Rpb25CdXR0b25zLm1hcCgoY2hpbGQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3Qgc2hvdWxkVXNlRnVsbFdpZHRoID0gYWN0aW9uQ291bnQgPT09IDEgfHwgKGFjdGlvbkNvdW50ICUgMiA9PT0gMSAmJiBpbmRleCA9PT0gYWN0aW9uQ291bnQgLSAxKTtcclxuICAgICAgICAgICAgICByZXR1cm4gY2xvbmVFbGVtZW50KGNoaWxkLCB7XHJcbiAgICAgICAgICAgICAgICBmdWxsV2lkdGg6IHNob3VsZFVzZUZ1bGxXaWR0aCxcclxuICAgICAgICAgICAgICAgIHRhYkluZGV4OiBjaGlsZC5wcm9wcy50YWJJbmRleCxcclxuICAgICAgICAgICAgICAgIGtleTogY2hpbGQua2V5ID8/IGBwYWdlLWJvdHRvbS1hY3Rpb24tJHtpbmRleH1gLFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8ZGl2IGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHN0eWxlPXt7IGhlaWdodDogYCR7cmVzZXJ2ZWRIZWlnaHR9cHhgIH19IC8+XHJcbiAgICAgIHtwb3J0YWxUYXJnZXQgPyBjcmVhdGVQb3J0YWwoYWN0aW9uQmFyLCBwb3J0YWxUYXJnZXQpIDogbnVsbH1cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBQYWdlQm90dG9tQWN0aW9ucztcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlRWZmZWN0RXZlbnQsIHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSwgdHlwZSBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbnR5cGUgUGFnZUJvdHRvbUFjdGlvbnNJbnNldHMgPSB7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIHJpZ2h0OiBudW1iZXI7XHJcbn07XHJcblxyXG50eXBlIFVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eVJlc3VsdCA9IHtcclxuICByZXNlcnZlZEhlaWdodDogbnVtYmVyO1xyXG4gIHdyYXBwZXJSZWY6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIGNvbnRlbnRJbnNldHM6IFBhZ2VCb3R0b21BY3Rpb25zSW5zZXRzIHwgbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IE1JTl9QQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfR0FQID0gODtcclxuXHJcbi8vIFJldHVybnMgdHJ1ZSB3aGVuIHRoZSBjYXJkIGlzIHJlbmRlcmVkIGFuZCBjYW4gYmUgdXNlZCBhcyBhIGxheW91dCByZWZlcmVuY2UuXHJcbmNvbnN0IGlzVmlzaWJsZUxheW91dENhcmQgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBjb25zdCBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuICBpZiAoc3R5bGVzLmRpc3BsYXkgPT09IFwibm9uZVwiIHx8IHN0eWxlcy52aXNpYmlsaXR5ID09PSBcImhpZGRlblwiKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICByZXR1cm4gcmVjdC53aWR0aCA+IDAgJiYgcmVjdC5oZWlnaHQgPiAwO1xyXG59O1xyXG5cclxuLy8gRmluZHMgdGhlIGZpcnN0IHZpc2libGUgdGltZWxpbmUgY2FyZCBhbmQgbWFwcyBpdHMgaG9yaXpvbnRhbCBmcmFtZSB0byB2aWV3cG9ydCBpbnNldHMuXHJcbmNvbnN0IHJlc29sdmVUaW1lbGluZUNhcmRJbnNldHMgPSAoKTogUGFnZUJvdHRvbUFjdGlvbnNJbnNldHMgfCBudWxsID0+IHtcclxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1pdGVtIC50aW1lbGluZS1jYXJkLCAudGltZWxpbmUtYm94IC50aW1lbGluZS1jYXJkXCIpO1xyXG4gIGZvciAoY29uc3QgY2FyZCBvZiBjYXJkcykge1xyXG4gICAgaWYgKCFpc1Zpc2libGVMYXlvdXRDYXJkKGNhcmQpKSBjb250aW51ZTtcclxuXHJcbiAgICBjb25zdCByZWN0ID0gY2FyZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgMDtcclxuICAgIGlmICh2aWV3cG9ydFdpZHRoIDw9IDApIHJldHVybiBudWxsO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxlZnQ6IE1hdGgubWF4KE1JTl9QQUdFX0JPVFRPTV9BQ1RJT05TX1NJREVfR0FQLCBNYXRoLnJvdW5kKHJlY3QubGVmdCkpLFxyXG4gICAgICByaWdodDogTWF0aC5tYXgoTUlOX1BBR0VfQk9UVE9NX0FDVElPTlNfU0lERV9HQVAsIE1hdGgucm91bmQodmlld3BvcnRXaWR0aCAtIHJlY3QucmlnaHQpKSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8vIFRyYWNrcyB0aGUgYm90dG9tIGFjdGlvbiBiYXIgaGVpZ2h0IHNvIHRoZSBwYWdlIHJlc2VydmVzIGVub3VnaCBzcGFjZSBmb3IgaXQuXHJcbmV4cG9ydCBjb25zdCB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkgPSAoKTogVXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5UmVzdWx0ID0+IHtcclxuICBjb25zdCB3cmFwcGVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYW5pbWF0aW9uRnJhbWVSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW3Jlc2VydmVkSGVpZ2h0LCBzZXRSZXNlcnZlZEhlaWdodF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbY29udGVudEluc2V0cywgc2V0Q29udGVudEluc2V0c10gPSB1c2VTdGF0ZTxQYWdlQm90dG9tQWN0aW9uc0luc2V0cyB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBtZWFzdXJlTGF5b3V0ID0gdXNlRWZmZWN0RXZlbnQoKCkgPT4ge1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IHdyYXBwZXJSZWYuY3VycmVudDtcclxuICAgIGlmICghd3JhcHBlcikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG5leHRIZWlnaHQgPSBNYXRoLmNlaWwod3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpO1xyXG4gICAgc2V0UmVzZXJ2ZWRIZWlnaHQoKHByZXZpb3VzKSA9PiAoTWF0aC5hYnMocHJldmlvdXMgLSBuZXh0SGVpZ2h0KSA8IDEgPyBwcmV2aW91cyA6IG5leHRIZWlnaHQpKTtcclxuXHJcbiAgICBjb25zdCBuZXh0SW5zZXRzID0gcmVzb2x2ZVRpbWVsaW5lQ2FyZEluc2V0cygpO1xyXG4gICAgc2V0Q29udGVudEluc2V0cygocHJldmlvdXMpID0+IHtcclxuICAgICAgaWYgKCFwcmV2aW91cyAmJiAhbmV4dEluc2V0cykgcmV0dXJuIHByZXZpb3VzO1xyXG4gICAgICBpZiAocHJldmlvdXMgJiYgbmV4dEluc2V0cyAmJiBwcmV2aW91cy5sZWZ0ID09PSBuZXh0SW5zZXRzLmxlZnQgJiYgcHJldmlvdXMucmlnaHQgPT09IG5leHRJbnNldHMucmlnaHQpIHtcclxuICAgICAgICByZXR1cm4gcHJldmlvdXM7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG5leHRJbnNldHM7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgY29uc3Qgc2NoZWR1bGVNZWFzdXJlID0gdXNlRWZmZWN0RXZlbnQoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xyXG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgbWVhc3VyZUxheW91dCgpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICBtZWFzdXJlTGF5b3V0KCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gICAgY29uc3Qgd3JhcHBlciA9IHdyYXBwZXJSZWYuY3VycmVudDtcclxuICAgIGlmICghd3JhcHBlcikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcclxuICAgICAgc2NoZWR1bGVNZWFzdXJlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHdyYXBwZXIpO1xyXG4gICAgcmV0dXJuICgpID0+IG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICBpZiAoIWJvZHkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcclxuICAgICAgc2NoZWR1bGVNZWFzdXJlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKGJvZHksIHtcclxuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcclxuICAgICAgc2NoZWR1bGVNZWFzdXJlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcclxuXHJcbiAgICAgIGlmIChhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc2VydmVkSGVpZ2h0LFxyXG4gICAgd3JhcHBlclJlZixcclxuICAgIGNvbnRlbnRJbnNldHMsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuXHJcbnR5cGUgUHJvZ3Jlc3NTdGFnZSA9IHtcclxuICBrZXk6IHN0cmluZztcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgc3RhdGU6IFwiY29tcGxldGVkXCIgfCBcImFjdGl2ZVwiIHwgXCJwZW5kaW5nXCI7XHJcbn07XHJcblxyXG50eXBlIEV4cGVuc2VRdWlja1RpY2tldFByb2dyZXNzT3ZlcmxheVByb3BzID0ge1xyXG4gIG9wZW46IGJvb2xlYW47XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbiAgc3VtbWFyeT86IHN0cmluZztcclxuICBlbGFwc2VkTXM/OiBudW1iZXI7XHJcbiAgc3RhZ2VzPzogUHJvZ3Jlc3NTdGFnZVtdO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RWxhcHNlZExhYmVsID0gKGVsYXBzZWRNczogbnVtYmVyKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBzYWZlRWxhcHNlZE1zID0gTnVtYmVyLmlzRmluaXRlKGVsYXBzZWRNcykgJiYgZWxhcHNlZE1zID4gMCA/IGVsYXBzZWRNcyA6IDA7XHJcbiAgY29uc3QgdG90YWxTZWNvbmRzID0gTWF0aC5mbG9vcihzYWZlRWxhcHNlZE1zIC8gMTAwMCk7XHJcbiAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApO1xyXG4gIGNvbnN0IHNlY29uZHMgPSB0b3RhbFNlY29uZHMgJSA2MDtcclxuICByZXR1cm4gYCR7U3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsIFwiMFwiKX06JHtTdHJpbmcoc2Vjb25kcykucGFkU3RhcnQoMiwgXCIwXCIpfWA7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlU3RhZ2VCYWRnZSA9IChzdGFnZTogUHJvZ3Jlc3NTdGFnZSkgPT4ge1xyXG4gIGlmIChzdGFnZS5zdGF0ZSA9PT0gXCJjb21wbGV0ZWRcIikge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBoLTggdy04IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC0xMDAgdGV4dC1lbWVyYWxkLTcwMFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyMCAyMFwiIGZpbGw9XCJub25lXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMlwiPlxyXG4gICAgICAgICAgPHBhdGggZD1cIk01IDEwLjUgOC41IDE0IDE1IDYuNVwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgaWYgKHN0YWdlLnN0YXRlID09PSBcImFjdGl2ZVwiKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGgtOCB3LTggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtZnVsbCBiZy1za3ktMTAwIHRleHQtc2t5LTcwMFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9IC8+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPHNwYW5cclxuICAgICAgY2xhc3NOYW1lPVwiZmxleCBoLTggdy04IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgdGV4dC1zbGF0ZS00MDBcIlxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJoLTIuNSB3LTIuNSByb3VuZGVkLWZ1bGwgYmctc2xhdGUtMjAwXCIgLz5cclxuICAgIDwvc3Bhbj5cclxuICApO1xyXG59O1xyXG5cclxuLy8gU2hvd3Mgb25lIHN0YWdlZCBwcm9ncmVzcyBvdmVybGF5IHdoaWxlIHRoZSBjb21wb3NpdGUgcXVpY2stdGlja2V0IHJlcXVlc3QgaXMgaW4gZmxpZ2h0LlxyXG5jb25zdCBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXkgPSAoe1xyXG4gIG9wZW4sXHJcbiAgdGl0bGUsXHJcbiAgc3VtbWFyeSxcclxuICBlbGFwc2VkTXMgPSAwLFxyXG4gIHN0YWdlcyA9IFtdLFxyXG59OiBFeHBlbnNlUXVpY2tUaWNrZXRQcm9ncmVzc092ZXJsYXlQcm9wcykgPT4ge1xyXG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtOTUwLzQwIHB4LTQgcHktNlwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIHctZnVsbCBtYXgtdy1sZyByb3VuZGVkLVsyOHB4XSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZS85NSBwLTVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBoLTEyIHctMTIgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtMnhsIGJnLXNreS01MCB0ZXh0LXNreS03MDBcIj5cclxuICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNiB3LTZcIiBsYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0gLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMVwiPlxyXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxNXB4XSBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtOTAwXCI+XHJcbiAgICAgICAgICAgICAge3RpdGxlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19UaXRsZVwiLCBcIlByb2Nlc3NpbmcgdGlja2V0XCIpfVxyXG4gICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTEgdGV4dC1zbSB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIHtzdW1tYXJ5IHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfQ3JlYXRpbmdUaWNrZXRcIiwgXCJDcmVhdGluZyB0aWNrZXQuLi5cIil9XHJcbiAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy1zbGF0ZS01MCBweC0zIHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfRWxhcHNlZFwiLCBcIkVsYXBzZWQgdGltZVwiKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzEycHhdIHRleHQtc2xhdGUtNzAwXCI+e2Zvcm1hdEVsYXBzZWRMYWJlbChlbGFwc2VkTXMpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAge3N0YWdlcy5sZW5ndGggPiAwID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC01IHNwYWNlLXktM1wiPlxyXG4gICAgICAgICAgICB7c3RhZ2VzLm1hcCgoc3RhZ2UpID0+IChcclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBrZXk9e3N0YWdlLmtleX1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XHJcbiAgICAgICAgICAgICAgICAgIHN0YWdlLnN0YXRlID09PSBcImFjdGl2ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgPyBcInJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItc2t5LTIwMCBiZy1za3ktNTAvODAgcHgtMyBweS0zXCJcclxuICAgICAgICAgICAgICAgICAgICA6IHN0YWdlLnN0YXRlID09PSBcImNvbXBsZXRlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICA/IFwicm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTIwMCBiZy1lbWVyYWxkLTUwLzcwIHB4LTMgcHktM1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwicm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcHgtMyBweS0zXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgZ2FwLTNcIj5cclxuICAgICAgICAgICAgICAgICAge3Jlc29sdmVTdGFnZUJhZGdlKHN0YWdlKX1cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwXHJcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFnZS5zdGF0ZSA9PT0gXCJwZW5kaW5nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICA/IFwidGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXNsYXRlLTYwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTkwMFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAge3N0YWdlLnRpdGxlfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0xIHRleHQteHMgbGVhZGluZy01IHRleHQtc2xhdGUtNTAwXCI+e3N0YWdlLmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVF1aWNrVGlja2V0UHJvZ3Jlc3NPdmVybGF5O1xyXG4iLCAiXHVGRUZGaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB0eXBlIHtcclxuICBFeHBlbnNlR2FzdG9UeXBlQ29kZSxcclxuICBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCxcclxuICBFeHBlbnNlU2hlZXREcmFmdFJlc3BvbnNlLFxyXG4gIEV4cGVuc2VTaGVldFRpY2tldElhUmVxdWVzdCxcclxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7IHRvRXhwZW5zZUFwaURkTW1ZeXl5IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VBcGlEYXRlVXRpbHMudHNcIjtcclxuXHJcbmNvbnN0IFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FID0gXCJpbmQtZXhwZW5zZS10aWNrZXQtaW1hZ2UtdjFcIjtcclxuY29uc3QgVElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWCA9IFwiL19faW5kX2NhY2hlX18vdGlja2V0LWltYWdlL1wiO1xyXG5jb25zdCBUSUNLRVRfVFJBQ0VfU1RPUkFHRV9LRVkgPSBcImV4cGVuc2Vfc2hlZXRfdGlja2V0X3F1aWNrX2Zsb3dfdHJhY2VfdjFcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMgPSA1MCAqIDEwMjQgKiAxMDI0O1xyXG5leHBvcnQgY29uc3QgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgPVxyXG4gIFwiLmpwZywuanBlZywucG5nLC53ZWJwLGltYWdlL2pwZWcsaW1hZ2UvcGpwZWcsaW1hZ2UvcG5nLGltYWdlL3dlYnBcIjtcclxuY29uc3QgQUxMT1dFRF9USUNLRVRfSU1BR0VfTUlNRV9UWVBFUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJpbWFnZS9qcGVnXCIsIFwiaW1hZ2UvcGpwZWdcIiwgXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS93ZWJwXCJdKTtcclxuY29uc3QgQUxMT1dFRF9USUNLRVRfSU1BR0VfRVhURU5TSU9OUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJqcGdcIiwgXCJqcGVnXCIsIFwicG5nXCIsIFwid2VicFwiXSk7XHJcbmNvbnN0IFRJQ0tFVF9NSU1FX1RPX0VYVEVOU0lPTjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcclxuICBcImltYWdlL2pwZWdcIjogXCJqcGdcIixcclxuICBcImltYWdlL3BqcGVnXCI6IFwianBnXCIsXHJcbiAgXCJpbWFnZS9qcGdcIjogXCJqcGdcIixcclxuICBcImltYWdlL3BuZ1wiOiBcInBuZ1wiLFxyXG4gIFwiaW1hZ2Uvd2VicFwiOiBcIndlYnBcIixcclxufTtcclxuY29uc3QgQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMgPSBuZXcgU2V0PG51bWJlcj4oWzAsIDEsIDIsIDMsIDQsIDUsIDYsIDcsIDgsIDE0XSk7XHJcbmNvbnN0IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEUgPSA4O1xyXG5leHBvcnQgY29uc3QgREVGQVVMVF9DUkVBVEVfTU9ERSA9IFwibWFudWFsXCIgYXMgXCJpYVwiIHwgXCJtYW51YWxcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFRpY2tldEltYWdlU291cmNlID0gXCJjYW1lcmFcIiB8IFwiZ2FsbGVyeVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgVGlja2V0VHJhY2VFbnRyeSA9IHtcclxuICBzdGVwOiBzdHJpbmc7XHJcbiAgdHJhY2VJZDogc3RyaW5nO1xyXG4gIGF0OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIE5vcm1hbGl6ZWREcmFmdExpbmUgPSB7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgdHlwZVZhbHVlOiBudW1iZXI7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBxdHk6IG51bWJlcjtcclxuICBwcmljZTogbnVtYmVyO1xyXG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBOb3JtYWxpemVkRHJhZnQgPSB7XHJcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjdXJyZW5jeUNvZGU6IHN0cmluZztcclxuICB0b3RhbEFtb3VudDogbnVtYmVyO1xyXG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW86IHN0cmluZztcclxuICBnYXN0b1R5cGU6IG51bWJlciB8IG51bGw7XHJcbiAgbGluZXM6IE5vcm1hbGl6ZWREcmFmdExpbmVbXTtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFBlbmRpbmdVcGxvYWRSZXRyeSA9XHJcbiAgfCB7XHJcbiAgICAgIHN0cmF0ZWd5OiBcImlhLXJlYWR5XCI7XHJcbiAgICAgIGZpbGVJZDogc3RyaW5nO1xyXG4gICAgICBleHRlbnNpb246IHN0cmluZztcclxuICAgICAgY2FjaGVLZXk6IHN0cmluZztcclxuICAgICAgZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdDtcclxuICAgICAgZmlsZU5hbWVIaW50OiBzdHJpbmc7XHJcbiAgICB9XHJcbiAgfCB7XHJcbiAgICAgIHN0cmF0ZWd5OiBcIm1hbnVhbC1wb3N0LXVwbG9hZC1kcmFmdFwiO1xyXG4gICAgICBmaWxlSWQ6IHN0cmluZztcclxuICAgICAgZXh0ZW5zaW9uOiBzdHJpbmc7XHJcbiAgICAgIGNhY2hlS2V5OiBzdHJpbmc7XHJcbiAgICAgIGZpbGVOYW1lSGludDogc3RyaW5nO1xyXG4gICAgfTtcclxuXHJcbmV4cG9ydCB0eXBlIFVwbG9hZFN5bmNSZXN1bHQgPSB7XHJcbiAgdXJsRmlsZTogc3RyaW5nO1xyXG4gIGZpbGVOYW1lOiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzID0ge1xyXG4gIHNoZWV0SWQ/OiBzdHJpbmc7XHJcbiAgcHJvamVjdElkPzogc3RyaW5nO1xyXG4gIGN1cnJlbmN5Q29kZT86IHN0cmluZztcclxuICBheFVzZXJJZE92ZXJyaWRlPzogc3RyaW5nO1xyXG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XHJcbiAgaXNDcmVhdGVNb2RlOiBib29sZWFuO1xyXG4gIGlzU2hlZXRMb2NrZWQ6IGJvb2xlYW47XHJcbiAgbGlua1RvU2hlZXQ/OiBib29sZWFuO1xyXG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xyXG4gIG9uQ29tcGxldGVkPzogKHJlc3VsdDogeyBmaWxlSWQ6IHN0cmluZzsgbGlua2VkVG9TaGVldDogYm9vbGVhbiB9KSA9PiB2b2lkO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgUXVpY2tGbG93UHJvZ3Jlc3NLZXkgPVxyXG4gIHwgXCJ1cGxvYWRpbmdJbWFnZVwiXHJcbiAgfCBcImNyZWF0aW5nVGlja2V0XCJcclxuICB8IFwic3luY2luZ0ZpbGVcIlxyXG4gIHwgXCJmaW5hbGl6aW5nSWFcIlxyXG4gIHwgXCJsaW5raW5nRXhwZW5zZUxpbmVcIlxyXG4gIHwgXCJkb25lXCI7XHJcblxyXG5jb25zdCBhc1JlY29yZCA9ICh2YWx1ZTogdW5rbm93bik6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0+IHtcclxuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHt9O1xyXG4gIHJldHVybiB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxufTtcclxuXHJcbmNvbnN0IGdldEZpcnN0RGVmaW5lZCA9IChyZWNvcmQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBrZXlzOiBzdHJpbmdbXSk6IHVua25vd24gPT4ge1xyXG4gIGZvciAoY29uc3Qga2V5IG9mIGtleXMpIHtcclxuICAgIGlmIChrZXkgaW4gcmVjb3JkKSB7XHJcbiAgICAgIHJldHVybiByZWNvcmRba2V5XTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHVuZGVmaW5lZDtcclxufTtcclxuXHJcbmNvbnN0IHRvTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHRvUG9zaXRpdmVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcclxuICBjb25zdCBwYXJzZWQgPSB0b051bWJlcih2YWx1ZSk7XHJcbiAgcmV0dXJuIHBhcnNlZCAhPT0gbnVsbCAmJiBwYXJzZWQgPiAwID8gcGFyc2VkIDogbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHRvRGRNbVl5eXkgPSAodmFsdWU6IHVua25vd24pOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eSh2YWx1ZSk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0VG9kYXlEZE1tWXl5eSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIHJldHVybiB0b0RkTW1ZeXl5KG5ldyBEYXRlKCkpO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplR2FzdG9UeXBlID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgcGFyc2VkID0gdG9OdW1iZXIodmFsdWUpO1xyXG4gIGlmIChwYXJzZWQgPT09IG51bGwgfHwgIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCkpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICByZXR1cm4gcGFyc2VkO1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24gPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZCA9IHNhZmVUZXh0KHZhbHVlKS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1teYS16MC05XS9nLCBcIlwiKTtcclxuICBpZiAoIW5vcm1hbGl6ZWQpIHJldHVybiBcIlwiO1xyXG4gIGlmIChub3JtYWxpemVkID09PSBcImpwZWdcIikgcmV0dXJuIFwianBnXCI7XHJcbiAgcmV0dXJuIEFMTE9XRURfVElDS0VUX0lNQUdFX0VYVEVOU0lPTlMuaGFzKG5vcm1hbGl6ZWQpID8gbm9ybWFsaXplZCA6IFwiXCI7XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGZyb21OYW1lID0gc2FmZVRleHQoZmlsZS5uYW1lKS5zcGxpdChcIi5cIikucG9wKCkgfHwgXCJcIjtcclxuICByZXR1cm4gbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24oZnJvbU5hbWUpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGluZmVyRXh0ZW5zaW9uID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IHR5cGUgPSBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3QgZnJvbU1pbWUgPSBUSUNLRVRfTUlNRV9UT19FWFRFTlNJT05bdHlwZV07XHJcbiAgaWYgKGZyb21NaW1lKSByZXR1cm4gZnJvbU1pbWU7XHJcblxyXG4gIGNvbnN0IGZyb21OYW1lID0gcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZShmaWxlKTtcclxuICBpZiAoZnJvbU5hbWUpIHJldHVybiBmcm9tTmFtZTtcclxuXHJcbiAgcmV0dXJuIFwianBnXCI7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUgPSAoZmlsZTogRmlsZSk6IGJvb2xlYW4gPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWRUeXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmIChub3JtYWxpemVkVHlwZSAmJiBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTLmhhcyhub3JtYWxpemVkVHlwZSkpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgZXh0ZW5zaW9uID0gcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZShmaWxlKTtcclxuICByZXR1cm4gISFleHRlbnNpb247XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVzb2x2ZVJhbmRvbUtleSA9ICgpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICh0eXBlb2YgY3J5cHRvICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjcnlwdG8ucmFuZG9tVVVJRCA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICByZXR1cm4gY3J5cHRvLnJhbmRvbVVVSUQoKTtcclxuICB9XHJcbiAgcmV0dXJuIGAke0RhdGUubm93KCl9LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc2xpY2UoMiwgMTApfWA7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3Qgc2FuaXRpemVGaWxlTmFtZSA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBiYXNlID0gc2FmZVRleHQodmFsdWUpLnJlcGxhY2UoL1s8PjpcIi9cXFxcfD8qXFx1MDAwMC1cXHUwMDFGXS9nLCBcIl9cIik7XHJcbiAgcmV0dXJuIGJhc2UgfHwgXCJ0aWNrZXQtaW1hZ2VcIjtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhY2VJZEZyb21FcnJvciA9IChlcnJvcjogQXBpRmV0Y2hFcnJvcik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgcGF5bG9hZCA9IHNhZmVUZXh0KGVycm9yLnJlc3BvbnNlQm9keSk7XHJcbiAgaWYgKCFwYXlsb2FkKSByZXR1cm4gXCJcIjtcclxuICB0cnkge1xyXG4gICAgY29uc3QganNvbiA9IEpTT04ucGFyc2UocGF5bG9hZCkgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbiAgICBjb25zdCB0cmFjZUlkID0gc2FmZVRleHQoanNvbi5UcmFjZUlkID8/IGpzb24udHJhY2VJZCk7XHJcbiAgICByZXR1cm4gdHJhY2VJZDtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBOb3JtYWxpemVkRHJhZnQgPT4ge1xyXG4gIGNvbnN0IGRhdGEgPSBhc1JlY29yZChyYXdEYXRhKTtcclxuICBjb25zdCBkcmFmdERlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKTtcclxuICBjb25zdCBkcmFmdEN1cnJlbmN5ID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImN1cnJlbmN5Q29kZVwiLCBcIkN1cnJlbmN5Q29kZVwiXSkpLnRvVXBwZXJDYXNlKCk7XHJcbiAgY29uc3QgZHJhZnRUb3RhbEFtb3VudCA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcInRvdGFsQW1vdW50XCIsIFwiVG90YWxBbW91bnRcIl0pKSB8fCAwO1xyXG4gIGNvbnN0IGRyYWZ0VHJhbnNEYXRlID0gdG9EZE1tWXl5eShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1widHJhbnNEYXRlXCIsIFwiVHJhbnNEYXRlXCJdKSkgfHwgZ2V0VG9kYXlEZE1tWXl5eSgpO1xyXG4gIGNvbnN0IGRyYWZ0Q29tbWVudCA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJjb21lbnRhcmlvXCIsIFwiQ29tZW50YXJpb1wiXSkpO1xyXG4gIGNvbnN0IGRyYWZ0R2FzdG9UeXBlID0gbm9ybWFsaXplR2FzdG9UeXBlKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJnYXN0b1R5cGVcIiwgXCJHYXN0b1R5cGVcIl0pKTtcclxuXHJcbiAgY29uc3QgcmF3TGluZXMgPSBnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wibGluZXNcIiwgXCJMaW5lc1wiXSk7XHJcbiAgY29uc3QgbGluZUFycmF5ID0gQXJyYXkuaXNBcnJheShyYXdMaW5lcykgPyByYXdMaW5lcyA6IFtdO1xyXG5cclxuICBjb25zdCBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdID0gbGluZUFycmF5XHJcbiAgICAubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBsaW5lUmVjb3JkID0gYXNSZWNvcmQoZW50cnkpO1xyXG4gICAgICBjb25zdCBxdHkgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJxdHlcIiwgXCJRdHlcIl0pKSB8fCAxO1xyXG4gICAgICBjb25zdCBwcmljZSA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInByaWNlXCIsIFwiUHJpY2VcIl0pKSB8fCAwO1xyXG4gICAgICBjb25zdCBleHBsaWNpdFRvdGFsID0gdG9Qb3NpdGl2ZU51bWJlcihnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widG90YWxBbW91bnRcIiwgXCJUb3RhbEFtb3VudFwiXSkpIHx8IDA7XHJcbiAgICAgIGNvbnN0IGNvbXB1dGVkVG90YWwgPSBleHBsaWNpdFRvdGFsID4gMCA/IGV4cGxpY2l0VG90YWwgOiBxdHkgKiBwcmljZTtcclxuICAgICAgaWYgKCEoY29tcHV0ZWRUb3RhbCA+IDApKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IGNhbmRpZGF0ZVR5cGVWYWx1ZSA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInR5cGVWYWx1ZVwiLCBcIlR5cGVWYWx1ZVwiXSkpO1xyXG4gICAgICBjb25zdCBzYWZlVHlwZVZhbHVlID0gTnVtYmVyLmlzSW50ZWdlcihjYW5kaWRhdGVUeXBlVmFsdWUpID8gTnVtYmVyKGNhbmRpZGF0ZVR5cGVWYWx1ZSkgOiBudWxsO1xyXG4gICAgICBjb25zdCB0eXBlVmFsdWUgPSBzYWZlVHlwZVZhbHVlICYmIHNhZmVUeXBlVmFsdWUgPiAwID8gc2FmZVR5cGVWYWx1ZSA6IGRyYWZ0R2FzdG9UeXBlIHx8IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XHJcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKSB8fCBkcmFmdERlc2NyaXB0aW9uO1xyXG4gICAgICBjb25zdCB0cmFuc0RhdGUgPSB0b0RkTW1ZeXl5KGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0cmFuc0RhdGVcIiwgXCJUcmFuc0RhdGVcIl0pKSB8fCBkcmFmdFRyYW5zRGF0ZTtcclxuXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgdHJhbnNEYXRlLFxyXG4gICAgICAgIHR5cGVWYWx1ZSxcclxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcclxuICAgICAgICBxdHksXHJcbiAgICAgICAgcHJpY2U6IHByaWNlID4gMCA/IHByaWNlIDogY29tcHV0ZWRUb3RhbCxcclxuICAgICAgICB0b3RhbEFtb3VudDogY29tcHV0ZWRUb3RhbCxcclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIE5vcm1hbGl6ZWREcmFmdExpbmUgPT4gZW50cnkgIT09IG51bGwpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgZGVzY3JpcHRpb246IGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcclxuICAgIGN1cnJlbmN5Q29kZTogZHJhZnRDdXJyZW5jeSB8fCBcIkVVUlwiLFxyXG4gICAgdG90YWxBbW91bnQ6IGRyYWZ0VG90YWxBbW91bnQgPiAwID8gZHJhZnRUb3RhbEFtb3VudCA6IGxpbmVzLnJlZHVjZSgoc3VtLCBsaW5lKSA9PiBzdW0gKyBsaW5lLnRvdGFsQW1vdW50LCAwKSxcclxuICAgIHRyYW5zRGF0ZTogZHJhZnRUcmFuc0RhdGUsXHJcbiAgICBjb21lbnRhcmlvOiBkcmFmdENvbW1lbnQsXHJcbiAgICBnYXN0b1R5cGU6IGRyYWZ0R2FzdG9UeXBlLFxyXG4gICAgbGluZXMsXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZXNvbHZlVGlja2V0RmlsZUlkRnJvbURyYWZ0UmVzcG9uc2UgPSAocmF3RGF0YTogdW5rbm93bik6IHN0cmluZyA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJhd0RhdGEpO1xyXG4gIGNvbnN0IGNyZWF0aW9uUmF3ID0gZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlRpY2tldENyZWF0aW9uXCIsIFwidGlja2V0Q3JlYXRpb25cIl0pO1xyXG4gIGNvbnN0IGNyZWF0aW9uID0gYXNSZWNvcmQoY3JlYXRpb25SYXcpO1xyXG4gIHJldHVybiBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoY3JlYXRpb24sIFtcIkZpbGVJZFwiLCBcImZpbGVJZFwiXSkpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlc29sdmVVcGxvYWRSZXN1bHQgPSAocmVzcG9uc2VEYXRhOiB1bmtub3duKTogVXBsb2FkU3luY1Jlc3VsdCA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJlc3BvbnNlRGF0YSk7XHJcbiAgcmV0dXJuIHtcclxuICAgIHVybEZpbGU6IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJVcmxGaWxlXCIsIFwidXJsRmlsZVwiXSkpLFxyXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJGaWxlTmFtZVwiLCBcImZpbGVOYW1lXCJdKSksXHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBidWlsZFRpY2tldElhUGF5bG9hZCA9IChkcmFmdDogTm9ybWFsaXplZERyYWZ0LCB1cGxvYWQ6IFVwbG9hZFN5bmNSZXN1bHQpOiBFeHBlbnNlU2hlZXRUaWNrZXRJYVJlcXVlc3QgPT4ge1xyXG4gIGNvbnN0IGlhTGluZXMgPSBkcmFmdC5saW5lcy5tYXAoKGxpbmUpID0+ICh7XHJcbiAgICBkZXNjcmlwdGlvbjogbGluZS5kZXNjcmlwdGlvbixcclxuICAgIHF0eTogbGluZS5xdHksXHJcbiAgICBwcmljZTogbGluZS5wcmljZSxcclxuICAgIHRvdGFsQW1vdW50OiBsaW5lLnRvdGFsQW1vdW50LFxyXG4gIH0pKTtcclxuXHJcbiAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0ge1xyXG4gICAgZGVzY3JpcHRpb246IGRyYWZ0LmRlc2NyaXB0aW9uLFxyXG4gICAgY3VycmVuY3lDb2RlOiBkcmFmdC5jdXJyZW5jeUNvZGUsXHJcbiAgICB0b3RhbEFtb3VudDogZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiB1bmRlZmluZWQsXHJcbiAgICB0cmFuc0RhdGU6IGRyYWZ0LnRyYW5zRGF0ZSxcclxuICAgIGNvbWVudGFyaW86IGRyYWZ0LmNvbWVudGFyaW8gfHwgdW5kZWZpbmVkLFxyXG4gICAgdXJsRmlsZTogdXBsb2FkLnVybEZpbGUgfHwgdW5kZWZpbmVkLFxyXG4gICAgZmlsZU5hbWU6IHVwbG9hZC5maWxlTmFtZSB8fCB1bmRlZmluZWQsXHJcbiAgICBsaW5lczogaWFMaW5lcyxcclxuICB9O1xyXG5cclxuICBpZiAoZHJhZnQuZ2FzdG9UeXBlICE9PSBudWxsKSB7XHJcbiAgICBwYXlsb2FkLmdhc3RvVHlwZSA9IGRyYWZ0Lmdhc3RvVHlwZSBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcclxuICB9XHJcblxyXG4gIHJldHVybiBwYXlsb2FkO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGJ1aWxkU2hlZXRMaW5lUGF5bG9hZCA9IChcclxuICBkcmFmdDogTm9ybWFsaXplZERyYWZ0LFxyXG4gIGZpbGVJZDogc3RyaW5nLFxyXG4gIHByb2plY3RJZDogc3RyaW5nXHJcbik6IEV4cGVuc2VTaGVldENyZWF0ZUxpbmVSZXF1ZXN0IHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgbGluZUZyb21EcmFmdCA9IGRyYWZ0LmxpbmVzWzBdO1xyXG4gIC8vIEJ1aWxkIGEgc2luZ2xlIGV4cGVuc2UgbGluZSBmcm9tIHRpY2tldCBoZWFkZXIgZGF0YSB0byBhdm9pZCBsaW5lLWxldmVsIGRlc2NyaXB0aW9uIGxlYWthZ2UuXHJcbiAgY29uc3QgaGVhZGVyVG90YWwgPSBkcmFmdC50b3RhbEFtb3VudCA+IDAgPyBkcmFmdC50b3RhbEFtb3VudCA6IDA7XHJcbiAgY29uc3QgZmFsbGJhY2tUb3RhbCA9IGxpbmVGcm9tRHJhZnQ/LnRvdGFsQW1vdW50IHx8IDA7XHJcbiAgY29uc3QgZWZmZWN0aXZlVG90YWwgPSBoZWFkZXJUb3RhbCA+IDAgPyBoZWFkZXJUb3RhbCA6IGZhbGxiYWNrVG90YWw7XHJcbiAgaWYgKCEoZWZmZWN0aXZlVG90YWwgPiAwKSkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IHR5cGVWYWx1ZUNhbmRpZGF0ZSA9IGRyYWZ0Lmdhc3RvVHlwZSB8fCBsaW5lRnJvbURyYWZ0Py50eXBlVmFsdWUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcclxuICBjb25zdCBzYWZlVHlwZVZhbHVlID0gTnVtYmVyKHR5cGVWYWx1ZUNhbmRpZGF0ZSk7XHJcbiAgY29uc3QgdHlwZVZhbHVlID0gTnVtYmVyLmlzSW50ZWdlcihzYWZlVHlwZVZhbHVlKSAmJiBzYWZlVHlwZVZhbHVlID4gMCA/IHNhZmVUeXBlVmFsdWUgOiBERUZBVUxUX1RJQ0tFVF9HQVNUT19UWVBFO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdHJhbnNEYXRlOiBkcmFmdC50cmFuc0RhdGUgfHwgbGluZUZyb21EcmFmdD8udHJhbnNEYXRlIHx8IGdldFRvZGF5RGRNbVl5eXkoKSxcclxuICAgIHR5cGVWYWx1ZSxcclxuICAgIGRlc2NyaXB0aW9uOiBzYWZlVGV4dChkcmFmdC5kZXNjcmlwdGlvbikgfHwgXCJUaWNrZXRcIixcclxuICAgIGludGVybmFjaW9uYWw6IGZhbHNlLFxyXG4gICAgZmlsZUlkLFxyXG4gICAgdGlja2V0OiB0cnVlLFxyXG4gICAgcXR5OiAxLFxyXG4gICAgcHJpY2U6IGVmZmVjdGl2ZVRvdGFsLFxyXG4gICAgcHJvaklkOiBzYWZlVGV4dChwcm9qZWN0SWQpIHx8IHVuZGVmaW5lZCxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHBlcnNpc3RUcmFjZUxpc3QgPSAodHJhY2VMaXN0OiBUaWNrZXRUcmFjZUVudHJ5W10pOiB2b2lkID0+IHtcclxuICB0cnkge1xyXG4gICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShUSUNLRVRfVFJBQ0VfU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHRyYWNlTGlzdCkpO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgLy8gSWdub3JlIHN0b3JhZ2UgZmFpbHVyZXMgaW4gcmVzdHJpY3RlZCBicm93c2VyIGNvbnRleHRzLlxyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBjYWNoZUltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nLCBmaWxlOiBGaWxlKTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybjtcclxuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcclxuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcclxuICBhd2FpdCBjYWNoZS5wdXQoXHJcbiAgICBuZXcgUmVxdWVzdChyZXF1ZXN0VXJsKSxcclxuICAgIG5ldyBSZXNwb25zZShmaWxlLCB7XHJcbiAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBzYWZlVGV4dChmaWxlLnR5cGUpIHx8IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVhZENhY2hlZEltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTxCbG9iIHwgbnVsbD4gPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8ICEoXCJjYWNoZXNcIiBpbiB3aW5kb3cpKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcclxuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcclxuICBjb25zdCBjYWNoZWRSZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKHJlcXVlc3RVcmwpO1xyXG4gIGlmICghY2FjaGVkUmVzcG9uc2UpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBjYWNoZWRSZXNwb25zZS5ibG9iKCk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuO1xyXG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xyXG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xyXG4gIGF3YWl0IGNhY2hlLmRlbGV0ZShyZXF1ZXN0VXJsKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgdHlwZSB7IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0IH0gZnJvbSBcIi4uL2V4cGVuc2VUeXBlcy50c1wiO1xyXG5pbXBvcnQgeyBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcbmltcG9ydCB7XHJcbiAgTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTLFxyXG4gIGNhY2hlSW1hZ2VGaWxlLFxyXG4gIGV4dHJhY3RUcmFjZUlkRnJvbUVycm9yLFxyXG4gIGlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlLFxyXG4gIHBlcnNpc3RUcmFjZUxpc3QsXHJcbiAgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlLFxyXG4gIHJlc29sdmVSYW5kb21LZXksXHJcbiAgdHlwZSBRdWlja0Zsb3dQcm9ncmVzc0tleSxcclxuICB0eXBlIFRpY2tldEltYWdlU291cmNlLFxyXG4gIHR5cGUgVGlja2V0VHJhY2VFbnRyeSxcclxuICB0eXBlIFVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0FyZ3MsXHJcbn0gZnJvbSBcIi4vdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93Q29yZS50c1wiO1xyXG5pbXBvcnQgeyBvcHRpbWl6ZVRpY2tldEltYWdlRm9yVXBsb2FkLCB0eXBlIFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0IH0gZnJvbSBcIi4vdGlja2V0SW1hZ2VPcHRpbWl6YXRpb24udHNcIjtcclxuXHJcbnR5cGUgUXVpY2tDcmVhdGVQYXJ0aWFsVGlja2V0U3RhdGUgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgbGlua2VkVG9TaGVldDogYm9vbGVhbjtcclxuICBjb21wbGV0ZWRTdGFnZTogc3RyaW5nO1xyXG4gIHVybEZpbGU6IHN0cmluZztcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG4gIHByb2Nlc3NlZEJ5QUk6IGJvb2xlYW4gfCBudWxsO1xyXG59O1xyXG5cclxudHlwZSBRdWlja1RpY2tldEF0dGVtcHRDb250ZXh0ID0ge1xyXG4gIGF0dGVtcHRJZDogc3RyaW5nO1xyXG4gIHNvdXJjZTogVGlja2V0SW1hZ2VTb3VyY2U7XHJcbiAgc3RhcnRlZEF0OiBudW1iZXI7XHJcbiAgb3B0aW1pemF0aW9uOiBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdDtcclxufTtcclxuXHJcbnR5cGUgUXVpY2tUaWNrZXRQcm9ncmVzc1N0YWdlID0ge1xyXG4gIGtleTogUXVpY2tGbG93UHJvZ3Jlc3NLZXk7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIHN0YXRlOiBcImNvbXBsZXRlZFwiIHwgXCJhY3RpdmVcIiB8IFwicGVuZGluZ1wiO1xyXG59O1xyXG5cclxuY29uc3QgUVVJQ0tfVElDS0VUX0ZMT1dfTE9HX1BSRUZJWCA9IFwiW2V4cGVuc2UtcXVpY2stdGlja2V0XVwiO1xyXG5jb25zdCBRVUlDS19USUNLRVRfVklTVUFMX1NUQUdFX01TID0ge1xyXG4gIHN5bmNpbmdGaWxlOiAxMjAwLFxyXG4gIGZpbmFsaXppbmdJYTogMzYwMCxcclxuICBsaW5raW5nRXhwZW5zZUxpbmU6IDg1MDAsXHJcbn0gYXMgY29uc3Q7XHJcblxyXG5jb25zdCBsb2dRdWlja1RpY2tldEluZm8gPSAoLi4uYXJnczogdW5rbm93bltdKSA9PiB7XHJcbiAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBjb25zb2xlLmluZm8gPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5pbmZvKFFVSUNLX1RJQ0tFVF9GTE9XX0xPR19QUkVGSVgsIC4uLmFyZ3MpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGxvZ1F1aWNrVGlja2V0V2FybiA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUud2FybiA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICBjb25zb2xlLndhcm4oUVVJQ0tfVElDS0VUX0ZMT1dfTE9HX1BSRUZJWCwgLi4uYXJncyk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgbG9nUXVpY2tUaWNrZXRFcnJvciA9ICguLi5hcmdzOiB1bmtub3duW10pID0+IHtcclxuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgY29uc29sZS5lcnJvcihRVUlDS19USUNLRVRfRkxPV19MT0dfUFJFRklYLCAuLi5hcmdzKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRGaWxlU2l6ZSA9IChzaXplOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghKHNpemUgPiAwKSkgcmV0dXJuIFwiMCBCXCI7XHJcbiAgaWYgKHNpemUgPj0gMTAyNCAqIDEwMjQpIHJldHVybiBgJHsoc2l6ZSAvICgxMDI0ICogMTAyNCkpLnRvRml4ZWQoMil9IE1CYDtcclxuICBpZiAoc2l6ZSA+PSAxMDI0KSByZXR1cm4gYCR7KHNpemUgLyAxMDI0KS50b0ZpeGVkKDEpfSBLQmA7XHJcbiAgcmV0dXJuIGAke3NpemV9IEJgO1xyXG59O1xyXG5cclxuY29uc3QgYnVpbGRGaWxlTG9nRGF0YSA9IChmaWxlOiBGaWxlKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWU6IHNhZmVUZXh0KGZpbGUubmFtZSksXHJcbiAgICB0eXBlOiBzYWZlVGV4dChmaWxlLnR5cGUpLFxyXG4gICAgc2l6ZUJ5dGVzOiBOdW1iZXIoZmlsZS5zaXplIHx8IDApLFxyXG4gICAgc2l6ZVRleHQ6IGZvcm1hdEZpbGVTaXplKE51bWJlcihmaWxlLnNpemUgfHwgMCkpLFxyXG4gICAgbGFzdE1vZGlmaWVkOiBOdW1iZXIoZmlsZS5sYXN0TW9kaWZpZWQgfHwgMCksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkRmFsbGJhY2tPcHRpbWl6YXRpb25SZXN1bHQgPSAoZmlsZTogRmlsZSk6IFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0ID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgZmlsZSxcclxuICAgIGNoYW5nZWQ6IGZhbHNlLFxyXG4gICAgcmVhc29uOiBcIm9wdGltaXphdGlvbi1lcnJvclwiLFxyXG4gICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICByZWVuY29kZWQ6IGZhbHNlLFxyXG4gICAgZWxhcHNlZE1zOiAwLFxyXG4gICAgb3JpZ2luYWw6IHtcclxuICAgICAgbmFtZTogc2FmZVRleHQoZmlsZS5uYW1lKSxcclxuICAgICAgdHlwZTogc2FmZVRleHQoZmlsZS50eXBlKSxcclxuICAgICAgc2l6ZTogTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSxcclxuICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgIGhlaWdodDogbnVsbCxcclxuICAgIH0sXHJcbiAgICBvdXRwdXQ6IHtcclxuICAgICAgbmFtZTogc2FmZVRleHQoZmlsZS5uYW1lKSxcclxuICAgICAgdHlwZTogc2FmZVRleHQoZmlsZS50eXBlKSxcclxuICAgICAgc2l6ZTogTnVtYmVyKGZpbGUuc2l6ZSB8fCAwKSxcclxuICAgICAgd2lkdGg6IG51bGwsXHJcbiAgICAgIGhlaWdodDogbnVsbCxcclxuICAgIH0sXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkT3B0aW1pemF0aW9uTG9nRGF0YSA9IChyZXN1bHQ6IFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0KSA9PiB7XHJcbiAgY29uc3Qgc2F2ZWRCeXRlcyA9IE1hdGgubWF4KDAsIHJlc3VsdC5vcmlnaW5hbC5zaXplIC0gcmVzdWx0Lm91dHB1dC5zaXplKTtcclxuICBjb25zdCBzYXZlZFJhdGlvID0gcmVzdWx0Lm9yaWdpbmFsLnNpemUgPiAwID8gc2F2ZWRCeXRlcyAvIHJlc3VsdC5vcmlnaW5hbC5zaXplIDogMDtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGNoYW5nZWQ6IHJlc3VsdC5jaGFuZ2VkLFxyXG4gICAgcmVhc29uOiByZXN1bHQucmVhc29uLFxyXG4gICAgcmVzaXplZDogcmVzdWx0LnJlc2l6ZWQsXHJcbiAgICByZWVuY29kZWQ6IHJlc3VsdC5yZWVuY29kZWQsXHJcbiAgICBlbGFwc2VkTXM6IHJlc3VsdC5lbGFwc2VkTXMsXHJcbiAgICBvcmlnaW5hbDoge1xyXG4gICAgICAuLi5yZXN1bHQub3JpZ2luYWwsXHJcbiAgICAgIHNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShyZXN1bHQub3JpZ2luYWwuc2l6ZSksXHJcbiAgICB9LFxyXG4gICAgb3V0cHV0OiB7XHJcbiAgICAgIC4uLnJlc3VsdC5vdXRwdXQsXHJcbiAgICAgIHNpemVUZXh0OiBmb3JtYXRGaWxlU2l6ZShyZXN1bHQub3V0cHV0LnNpemUpLFxyXG4gICAgfSxcclxuICAgIHNhdmVkQnl0ZXMsXHJcbiAgICBzYXZlZFRleHQ6IGZvcm1hdEZpbGVTaXplKHNhdmVkQnl0ZXMpLFxyXG4gICAgc2F2ZWRSYXRpbzogTnVtYmVyKHNhdmVkUmF0aW8udG9GaXhlZCg0KSksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdFZhbGlkYXRpb25FcnJvcnMgPSAoXHJcbiAgZXJyb3JzOiBBcnJheTx7IEZpZWxkPzogdW5rbm93bjsgTWVzc2FnZT86IHVua25vd24gfSB8IG51bGwgfCB1bmRlZmluZWQ+IHwgbnVsbCB8IHVuZGVmaW5lZFxyXG4pOiBzdHJpbmcgPT4ge1xyXG4gIGlmICghQXJyYXkuaXNBcnJheShlcnJvcnMpIHx8IGVycm9ycy5sZW5ndGggPT09IDApIHJldHVybiBcIlwiO1xyXG5cclxuICByZXR1cm4gZXJyb3JzXHJcbiAgICAubWFwKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCBmaWVsZCA9IHNhZmVUZXh0KGVudHJ5Py5GaWVsZCk7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBzYWZlVGV4dChlbnRyeT8uTWVzc2FnZSk7XHJcbiAgICAgIGlmIChmaWVsZCAmJiBtZXNzYWdlKSByZXR1cm4gYCR7ZmllbGR9OiAke21lc3NhZ2V9YDtcclxuICAgICAgcmV0dXJuIG1lc3NhZ2UgfHwgZmllbGQ7XHJcbiAgICB9KVxyXG4gICAgLmZpbHRlcihCb29sZWFuKVxyXG4gICAgLmpvaW4oXCIgfCBcIik7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93ID0gKHtcclxuICBzaGVldElkID0gXCJcIixcclxuICBwcm9qZWN0SWQgPSBcIlwiLFxyXG4gIGN1cnJlbmN5Q29kZSA9IFwiXCIsXHJcbiAgYXhVc2VySWRPdmVycmlkZSA9IFwiXCIsXHJcbiAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICBpc0NyZWF0ZU1vZGUsXHJcbiAgaXNTaGVldExvY2tlZCxcclxuICBsaW5rVG9TaGVldCA9IHRydWUsXHJcbiAgb25Gb3JiaWRkZW4sXHJcbiAgb25Db21wbGV0ZWQsXHJcbn06IFVzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvd0FyZ3MpID0+IHtcclxuICBjb25zdCBbc291cmNlUGlja2VyT3Blbiwgc2V0U291cmNlUGlja2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2J1c3ksIHNldEJ1c3ldID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtwcm9ncmVzc0tleSwgc2V0UHJvZ3Jlc3NLZXldID0gdXNlU3RhdGU8UXVpY2tGbG93UHJvZ3Jlc3NLZXkgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbZGlzcGxheVByb2dyZXNzS2V5LCBzZXREaXNwbGF5UHJvZ3Jlc3NLZXldID0gdXNlU3RhdGU8UXVpY2tGbG93UHJvZ3Jlc3NLZXkgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbcHJvZ3Jlc3NFbGFwc2VkTXMsIHNldFByb2dyZXNzRWxhcHNlZE1zXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbYXR0ZW1wdElkLCBzZXRBdHRlbXB0SWRdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3RyYWNlTGlzdCwgc2V0VHJhY2VMaXN0XSA9IHVzZVN0YXRlPFRpY2tldFRyYWNlRW50cnlbXT4oW10pO1xyXG4gIGNvbnN0IFtwYXJ0aWFsVGlja2V0RmFpbHVyZSwgc2V0UGFydGlhbFRpY2tldEZhaWx1cmVdID0gdXNlU3RhdGU8UXVpY2tDcmVhdGVQYXJ0aWFsVGlja2V0U3RhdGUgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBsYXRlc3RGaWxlUmVmID0gdXNlUmVmPHsgY2FjaGVLZXk6IHN0cmluZzsgZmlsZTogRmlsZSB9IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgbGF0ZXN0Q3JlYXRlZFRpY2tldFJlZiA9IHVzZVJlZjxRdWlja0NyZWF0ZVBhcnRpYWxUaWNrZXRTdGF0ZSB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByb2dyZXNzU3RhcnRlZEF0UmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCBwcm9ncmVzc01lc3NhZ2UgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGVmZmVjdGl2ZVByb2dyZXNzS2V5ID0gZGlzcGxheVByb2dyZXNzS2V5IHx8IHByb2dyZXNzS2V5O1xyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcInVwbG9hZGluZ0ltYWdlXCIpIHtcclxuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfVXBsb2FkaW5nSW1hZ2VcIiwgXCJVcGxvYWRpbmcgaW1hZ2UuLi5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwiY3JlYXRpbmdUaWNrZXRcIikge1xyXG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19DcmVhdGluZ1RpY2tldFwiLCBcIkNyZWF0aW5nIHRpY2tldC4uLlwiKTtcclxuICAgIH1cclxuICAgIGlmIChlZmZlY3RpdmVQcm9ncmVzc0tleSA9PT0gXCJzeW5jaW5nRmlsZVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX1N5bmNpbmdGaWxlXCIsIFwiU3luY2luZyBmaWxlLi4uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcImZpbmFsaXppbmdJYVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0ZpbmFsaXppbmdcIiwgXCJGaW5hbGl6aW5nIElBLi4uXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGVmZmVjdGl2ZVByb2dyZXNzS2V5ID09PSBcImxpbmtpbmdFeHBlbnNlTGluZVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0xpbmtpbmdMaW5lXCIsIFwiTGlua2luZyBleHBlbnNlIGxpbmUuLi5cIik7XHJcbiAgICB9XHJcbiAgICBpZiAoZWZmZWN0aXZlUHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiKSB7XHJcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0RvbmVcIiwgXCJEb25lXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFwiXCI7XHJcbiAgfSwgW2Rpc3BsYXlQcm9ncmVzc0tleSwgcHJvZ3Jlc3NLZXldKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghYnVzeSB8fCBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50ID09PSBudWxsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgc3luY0VsYXBzZWQgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0ZWRBdCA9IHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQ7XHJcbiAgICAgIGlmIChzdGFydGVkQXQgPT09IG51bGwpIHJldHVybjtcclxuICAgICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoTWF0aC5tYXgoMCwgRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBzeW5jRWxhcHNlZCgpO1xyXG4gICAgY29uc3QgaW50ZXJ2YWxJZCA9IHdpbmRvdy5zZXRJbnRlcnZhbChzeW5jRWxhcHNlZCwgMjUwKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKGludGVydmFsSWQpO1xyXG4gICAgfTtcclxuICB9LCBbYnVzeV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5KSB7XHJcbiAgICAgIGlmIChwcm9ncmVzc0tleSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShwcm9ncmVzc0tleSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gbnVsbCB8fCBwcm9ncmVzc0tleSA9PT0gXCJ1cGxvYWRpbmdJbWFnZVwiIHx8IHByb2dyZXNzS2V5ID09PSBcImRvbmVcIikge1xyXG4gICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkocHJvZ3Jlc3NLZXkpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KHByb2dyZXNzS2V5KTtcclxuICAgIGlmIChwcm9ncmVzc0tleSAhPT0gXCJjcmVhdGluZ1RpY2tldFwiKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0aW1lcnM6IG51bWJlcltdID0gW1xyXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwic3luY2luZ0ZpbGVcIik7XHJcbiAgICAgIH0sIFFVSUNLX1RJQ0tFVF9WSVNVQUxfU1RBR0VfTVMuc3luY2luZ0ZpbGUpLFxyXG4gICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwiZmluYWxpemluZ0lhXCIpO1xyXG4gICAgICB9LCBRVUlDS19USUNLRVRfVklTVUFMX1NUQUdFX01TLmZpbmFsaXppbmdJYSksXHJcbiAgICBdO1xyXG5cclxuICAgIGlmIChsaW5rVG9TaGVldCkge1xyXG4gICAgICB0aW1lcnMucHVzaChcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBzZXREaXNwbGF5UHJvZ3Jlc3NLZXkoXCJsaW5raW5nRXhwZW5zZUxpbmVcIik7XHJcbiAgICAgICAgfSwgUVVJQ0tfVElDS0VUX1ZJU1VBTF9TVEFHRV9NUy5saW5raW5nRXhwZW5zZUxpbmUpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgdGltZXJzLmZvckVhY2goKHRpbWVySWQpID0+IHdpbmRvdy5jbGVhclRpbWVvdXQodGltZXJJZCkpO1xyXG4gICAgfTtcclxuICB9LCBbYnVzeSwgbGlua1RvU2hlZXQsIHByb2dyZXNzS2V5XSk7XHJcblxyXG4gIGNvbnN0IHByb2dyZXNzU3RhZ2VzID0gdXNlTWVtbzxRdWlja1RpY2tldFByb2dyZXNzU3RhZ2VbXT4oKCkgPT4ge1xyXG4gICAgY29uc3QgdmlzaWJsZVN0YWdlczogUXVpY2tGbG93UHJvZ3Jlc3NLZXlbXSA9IGxpbmtUb1NoZWV0XHJcbiAgICAgID8gW1widXBsb2FkaW5nSW1hZ2VcIiwgXCJjcmVhdGluZ1RpY2tldFwiLCBcInN5bmNpbmdGaWxlXCIsIFwiZmluYWxpemluZ0lhXCIsIFwibGlua2luZ0V4cGVuc2VMaW5lXCJdXHJcbiAgICAgIDogW1widXBsb2FkaW5nSW1hZ2VcIiwgXCJjcmVhdGluZ1RpY2tldFwiLCBcInN5bmNpbmdGaWxlXCIsIFwiZmluYWxpemluZ0lhXCJdO1xyXG5cclxuICAgIGNvbnN0IHN0YWdlQ29weTogUmVjb3JkPFF1aWNrRmxvd1Byb2dyZXNzS2V5LCB7IHRpdGxlOiBzdHJpbmc7IGRlc2NyaXB0aW9uOiBzdHJpbmcgfT4gPSB7XHJcbiAgICAgIHVwbG9hZGluZ0ltYWdlOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19QcmVwYXJlX1RpdGxlXCIsIFwiUHJlcGFyaW5nIGltYWdlXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19QcmVwYXJlX0JvZHlcIixcclxuICAgICAgICAgIFwiV2UgdmFsaWRhdGUgdGhlIGltYWdlIGFuZCBwcmVwYXJlIGl0IGZvciBhIHJlbGlhYmxlIHVwbG9hZC5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIGNyZWF0aW5nVGlja2V0OiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19DcmVhdGVfVGl0bGVcIiwgXCJDcmVhdGluZyB0aWNrZXRcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0NyZWF0ZV9Cb2R5XCIsXHJcbiAgICAgICAgICBcIlRoZSBiYWNrZW5kIHJlc2VydmVzIHRoZSB0aWNrZXQgYW5kIHN0YXJ0cyB0aGUgc2VydmVyLXNpZGUgZmxvdy5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIHN5bmNpbmdGaWxlOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19GaWxlX1RpdGxlXCIsIFwiU3luY2luZyBmaWxlXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19GaWxlX0JvZHlcIixcclxuICAgICAgICAgIFwiVGhlIHVwbG9hZGVkIGltYWdlIGlzIGJlaW5nIGF0dGFjaGVkIHRvIHRoZSB0aWNrZXQgcmVjb3JkLlwiXHJcbiAgICAgICAgKSxcclxuICAgICAgfSxcclxuICAgICAgZmluYWxpemluZ0lhOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19JYV9UaXRsZVwiLCBcIlJlYWRpbmcgdGlja2V0IGRhdGFcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXHJcbiAgICAgICAgICBcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1Byb2dyZXNzX0lhX0JvZHlcIixcclxuICAgICAgICAgIFwiV2UgYXJlIGV4dHJhY3RpbmcgZGF0ZSwgYW1vdW50IGFuZCBkZXNjcmlwdGlvbiBmcm9tIHRoZSBpbWFnZS5cIlxyXG4gICAgICAgICksXHJcbiAgICAgIH0sXHJcbiAgICAgIGxpbmtpbmdFeHBlbnNlTGluZToge1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfUHJvZ3Jlc3NfTGlua19UaXRsZVwiLCBcIkxpbmtpbmcgZXhwZW5zZSBsaW5lXCIpLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBpbmRUKFxyXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9Qcm9ncmVzc19MaW5rX0JvZHlcIixcclxuICAgICAgICAgIFwiVGhlIGdlbmVyYXRlZCB0aWNrZXQgaXMgYmVpbmcgY29ubmVjdGVkIHRvIHRoZSBjdXJyZW50IGV4cGVuc2Ugc2hlZXQuXCJcclxuICAgICAgICApLFxyXG4gICAgICB9LFxyXG4gICAgICBkb25lOiB7XHJcbiAgICAgICAgdGl0bGU6IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRG9uZVwiLCBcIkRvbmVcIiksXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfRG9uZVwiLCBcIkRvbmVcIiksXHJcbiAgICAgIH0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGFjdGl2ZVN0YWdlS2V5ID1cclxuICAgICAgcHJvZ3Jlc3NLZXkgPT09IFwiZG9uZVwiID8gdmlzaWJsZVN0YWdlc1t2aXNpYmxlU3RhZ2VzLmxlbmd0aCAtIDFdIDogZGlzcGxheVByb2dyZXNzS2V5IHx8IHByb2dyZXNzS2V5O1xyXG4gICAgY29uc3QgYWN0aXZlU3RhZ2VJbmRleCA9IGFjdGl2ZVN0YWdlS2V5ID8gdmlzaWJsZVN0YWdlcy5pbmRleE9mKGFjdGl2ZVN0YWdlS2V5KSA6IC0xO1xyXG5cclxuICAgIHJldHVybiB2aXNpYmxlU3RhZ2VzLm1hcCgoc3RhZ2VLZXksIGluZGV4KSA9PiAoe1xyXG4gICAgICBrZXk6IHN0YWdlS2V5LFxyXG4gICAgICB0aXRsZTogc3RhZ2VDb3B5W3N0YWdlS2V5XS50aXRsZSxcclxuICAgICAgZGVzY3JpcHRpb246IHN0YWdlQ29weVtzdGFnZUtleV0uZGVzY3JpcHRpb24sXHJcbiAgICAgIHN0YXRlOlxyXG4gICAgICAgIHByb2dyZXNzS2V5ID09PSBcImRvbmVcIiB8fCAoYWN0aXZlU3RhZ2VJbmRleCA+PSAwICYmIGluZGV4IDwgYWN0aXZlU3RhZ2VJbmRleClcclxuICAgICAgICAgID8gXCJjb21wbGV0ZWRcIlxyXG4gICAgICAgICAgOiBpbmRleCA9PT0gYWN0aXZlU3RhZ2VJbmRleFxyXG4gICAgICAgICAgICA/IFwiYWN0aXZlXCJcclxuICAgICAgICAgICAgOiBcInBlbmRpbmdcIixcclxuICAgIH0pKTtcclxuICB9LCBbZGlzcGxheVByb2dyZXNzS2V5LCBsaW5rVG9TaGVldCwgcHJvZ3Jlc3NLZXldKTtcclxuXHJcbiAgY29uc3QgYWRkVHJhY2UgPSB1c2VDYWxsYmFjaygoc3RlcDogc3RyaW5nLCB0cmFjZUlkOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHNhZmVUcmFjZUlkID0gc2FmZVRleHQodHJhY2VJZCk7XHJcbiAgICBpZiAoIXNhZmVUcmFjZUlkKSByZXR1cm47XHJcblxyXG4gICAgc2V0VHJhY2VMaXN0KChwcmV2aW91cykgPT4ge1xyXG4gICAgICBjb25zdCBuZXh0ID0gW1xyXG4gICAgICAgIC4uLnByZXZpb3VzLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHN0ZXAsXHJcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVHJhY2VJZCxcclxuICAgICAgICAgIGF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXHJcbiAgICAgICAgfSxcclxuICAgICAgXTtcclxuICAgICAgcGVyc2lzdFRyYWNlTGlzdChuZXh0KTtcclxuICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyQ2FjaGVkQ3VycmVudEltYWdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgY2FjaGVLZXkgPSBsYXRlc3RGaWxlUmVmLmN1cnJlbnQ/LmNhY2hlS2V5O1xyXG4gICAgaWYgKCFjYWNoZUtleSkgcmV0dXJuO1xyXG4gICAgdm9pZCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpLmNhdGNoKCgpID0+IHtcclxuICAgICAgLy8gSWdub3JlIGNhY2hlIGNsZWFudXAgZmFpbHVyZXMgaW4gcmVzdHJpY3RlZCBicm93c2VyIGNvbnRleHRzLlxyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckZsb3dTdGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcclxuICAgIHNldFRyYWNlTGlzdChbXSk7XHJcbiAgICBwZXJzaXN0VHJhY2VMaXN0KFtdKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGJ1aWxkQXBpT3B0aW9ucyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVBeFVzZXJJZCA9IHNhZmVUZXh0KGF4VXNlcklkT3ZlcnJpZGUpO1xyXG4gICAgaWYgKCFzYWZlQXhVc2VySWQpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiWC1JTkQtQXhVc2VySWRcIjogc2FmZUF4VXNlcklkLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9LCBbYXhVc2VySWRPdmVycmlkZV0pO1xyXG5cclxuICBjb25zdCBlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24gPSB1c2VDYWxsYmFjaygoKTogYm9vbGVhbiA9PiB7XHJcbiAgICBpZiAoIWNhbkNyZWF0ZUV4cGVuc2UgfHwgaXNDcmVhdGVNb2RlIHx8IGlzU2hlZXRMb2NrZWQgfHwgKGxpbmtUb1NoZWV0ICYmICFzaGVldElkKSkge1xyXG4gICAgICBvbkZvcmJpZGRlbigpO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc1NoZWV0TG9ja2VkLCBsaW5rVG9TaGVldCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcclxuXHJcbiAgY29uc3QgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlID0gdXNlQ2FsbGJhY2soKGVycm9yOiB1bmtub3duKTogc3RyaW5nID0+IHtcclxuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcclxuICAgICAgY29uc3QgdmFsaWRhdGlvblRleHQgPSBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzKGVycm9yLnZhbGlkYXRpb25FcnJvcnMpO1xyXG4gICAgICBpZiAodmFsaWRhdGlvblRleHQpIHtcclxuICAgICAgICByZXR1cm4gdmFsaWRhdGlvblRleHQ7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyOSkge1xyXG4gICAgICAgIHJldHVybiBzYWZlVGV4dChlcnJvci5tZXNzYWdlKSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmF0ZUxpbWl0XCIsIFwiVG9vIG1hbnkgcmVxdWVzdHMuXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xyXG4gICAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm90Rm91bmRcIiwgXCJSZWNvcmQgbm90IGZvdW5kLlwiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcclxuICAgICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1NlcnZlclwiLCBcIlNlcnZlciBlcnJvci5cIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBzYWZlVGV4dChlcnJvci5tZXNzYWdlKVxyXG4gICAgICA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXHJcbiAgICAgIDogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgYWRkUXVpY2tDcmVhdGVSZXNwb25zZVRyYWNlcyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHJlc3BvbnNlOiBFeHBlbnNlU2hlZXRUaWNrZXRRdWlja0NyZWF0ZVJlc3VsdCkgPT4ge1xyXG4gICAgICBhZGRUcmFjZShcInRpY2tldC1xdWljay1jcmVhdGVcIiwgc2FmZVRleHQocmVzcG9uc2UuVHJhY2VJZCkpO1xyXG5cclxuICAgICAgY29uc3Qgc3RlcFRyYWNlSWRzID0gcmVzcG9uc2UuRGF0YT8uU3RlcFRyYWNlSWRzO1xyXG4gICAgICBhZGRUcmFjZShcInRpY2tldC1jcmVhdGVcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5UaWNrZXRDcmVhdGUpKTtcclxuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmlsZS11cGxvYWRcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5GaWxlVXBsb2FkKSk7XHJcbiAgICAgIGFkZFRyYWNlKFwiZXhwZW5zZWZyb210aWNrZXRcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5EcmFmdEV4dHJhY3QpKTtcclxuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmluYWxpemVcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5UaWNrZXRGaW5hbGl6ZSkpO1xyXG4gICAgICBhZGRUcmFjZShcImV4cGVuc2Utc2hlZXQtbGlua1wiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LlNoZWV0TGluaykpO1xyXG4gICAgfSxcclxuICAgIFthZGRUcmFjZV1cclxuICApO1xyXG5cclxuICBjb25zdCByZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZSA9IHVzZUNhbGxiYWNrKChyZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQpOiBzdHJpbmcgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLkRhdGE7XHJcbiAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChkYXRhPy5GaWxlSWQpO1xyXG4gICAgY29uc3QgY29tcGxldGVkU3RhZ2UgPSBzYWZlVGV4dChkYXRhPy5Db21wbGV0ZWRTdGFnZSk7XHJcbiAgICBjb25zdCByZXNwb25zZU1lc3NhZ2UgPSBzYWZlVGV4dChyZXNwb25zZS5NZXNzYWdlKTtcclxuICAgIGNvbnN0IHZhbGlkYXRpb25UZXh0ID0gZm9ybWF0VmFsaWRhdGlvbkVycm9ycyhyZXNwb25zZS5FcnJvcnMpO1xyXG4gICAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLlJldHJ5QWZ0ZXIpO1xyXG4gICAgY29uc3QgbWVzc2FnZVBhcnRzOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICAgIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA0MjkpIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2gocmVzcG9uc2VNZXNzYWdlIHx8IGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9SYXRlTGltaXRcIiwgXCJUb28gbWFueSByZXF1ZXN0cy5cIikpO1xyXG4gICAgICBpZiAocmV0cnlBZnRlcikge1xyXG4gICAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKFxyXG4gICAgICAgICAgaW5kRm9ybWF0KFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmV0cnlBZnRlckhpbnRcIiwgXCJSZXRyeSBhZnRlciB7MH0uXCIsIHJldHJ5QWZ0ZXIpXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh2YWxpZGF0aW9uVGV4dCkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaCh2YWxpZGF0aW9uVGV4dCk7XHJcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlTWVzc2FnZSkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChyZXNwb25zZU1lc3NhZ2UpO1xyXG4gICAgfSBlbHNlIGlmIChmaWxlSWQpIHtcclxuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goXHJcbiAgICAgICAgaW5kVChcclxuICAgICAgICAgIFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUGFydGlhbFwiLFxyXG4gICAgICAgICAgXCJUaGUgdGlja2V0IHdhcyBjcmVhdGVkLCBidXQgdGhlIGZ1bGwgcHJvY2VzcyBkaWQgbm90IGZpbmlzaC5cIlxyXG4gICAgICAgIClcclxuICAgICAgKTtcclxuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuSHR0cFN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9Ob3RGb3VuZFwiLCBcIlJlY29yZCBub3QgZm91bmQuXCIpKTtcclxuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuSHR0cFN0YXR1cyA9PT0gNTAwKSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TZXJ2ZXJcIiwgXCJTZXJ2ZXIgZXJyb3IuXCIpKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGZpbGVJZCAmJiBjb21wbGV0ZWRTdGFnZSkge1xyXG4gICAgICBtZXNzYWdlUGFydHMucHVzaChpbmRGb3JtYXQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TdGFnZVwiLCBcIkNvbXBsZXRlZCBzdGFnZTogezB9LlwiLCBjb21wbGV0ZWRTdGFnZSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZXNzYWdlUGFydHMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY29tcGxldGVGbG93U3VjY2VzcyA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGZpbGVJZDogc3RyaW5nLCBsaW5rZWRUb1NoZWV0OiBib29sZWFuLCBjYWNoZUtleTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHNldFByb2dyZXNzS2V5KFwiZG9uZVwiKTtcclxuICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwiZG9uZVwiKTtcclxuICAgICAgYXdhaXQgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlKGNhY2hlS2V5KTtcclxuICAgICAgc2V0QXR0ZW1wdElkKFwiXCIpO1xyXG4gICAgICBsYXRlc3RDcmVhdGVkVGlja2V0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwib2tQcm9jZXNzXCIsIDEyMDApO1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgcHJvZ3Jlc3NTdGFydGVkQXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHNldFByb2dyZXNzRWxhcHNlZE1zKDApO1xyXG4gICAgICBvbkNvbXBsZXRlZD8uKHsgZmlsZUlkLCBsaW5rZWRUb1NoZWV0IH0pO1xyXG4gICAgfSxcclxuICAgIFtvbkNvbXBsZXRlZF1cclxuICApO1xyXG5cclxuICBjb25zdCBydW5RdWlja0NyZWF0ZUZsb3cgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChmaWxlOiBGaWxlLCBjYWNoZUtleTogc3RyaW5nLCBjb250ZXh0OiBRdWlja1RpY2tldEF0dGVtcHRDb250ZXh0KTogUHJvbWlzZTx2b2lkPiA9PiB7XHJcbiAgICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICAgIHNldFByb2dyZXNzS2V5KFwiY3JlYXRpbmdUaWNrZXRcIik7XHJcbiAgICAgIGNsZWFyRmxvd1N0YXRlKCk7XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0U3RhcnRlZEF0ID0gRGF0ZS5ub3coKTtcclxuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwicXVpY2stY3JlYXRlLnJlcXVlc3Quc3RhcnRlZFwiLCB7XHJcbiAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcclxuICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxyXG4gICAgICAgIGxpbmtUb1NoZWV0LFxyXG4gICAgICAgIGNhY2hlS2V5LFxyXG4gICAgICAgIGVsYXBzZWRTaW5jZVNlbGVjdGlvbk1zOiBNYXRoLm1heCgwLCByZXF1ZXN0U3RhcnRlZEF0IC0gY29udGV4dC5zdGFydGVkQXQpLFxyXG4gICAgICAgIHVwbG9hZEZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgICAgb3B0aW1pemF0aW9uOiBidWlsZE9wdGltaXphdGlvbkxvZ0RhdGEoY29udGV4dC5vcHRpbWl6YXRpb24pLFxyXG4gICAgICAgIHNoZWV0SWQ6IGxpbmtUb1NoZWV0ID8gc2FmZVRleHQoc2hlZXRJZCkgOiBcIlwiLFxyXG4gICAgICAgIHByb2plY3RJZDogbGlua1RvU2hlZXQgPyBzYWZlVGV4dChwcm9qZWN0SWQpIDogXCJcIixcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY3JlYXRlRXhwZW5zZVNoZWV0VGlja2V0UXVpY2soXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRpY2tldEltYWdlOiBmaWxlLFxyXG4gICAgICAgICAgICBjdXJyZW5jeUNvZGU6IHNhZmVUZXh0KGN1cnJlbmN5Q29kZSkudG9VcHBlckNhc2UoKSB8fCB1bmRlZmluZWQsXHJcbiAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBsaW5rVG9TaGVldCA/IHNhZmVUZXh0KHNoZWV0SWQpIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZCxcclxuICAgICAgICAgICAgcHJvamVjdElkOiBsaW5rVG9TaGVldCA/IHNhZmVUZXh0KHByb2plY3RJZCkgfHwgdW5kZWZpbmVkIDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGJ1aWxkQXBpT3B0aW9ucygpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgYWRkUXVpY2tDcmVhdGVSZXNwb25zZVRyYWNlcyhyZXNwb25zZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlRWxhcHNlZE1zID0gTWF0aC5tYXgoMCwgRGF0ZS5ub3coKSAtIHJlcXVlc3RTdGFydGVkQXQpO1xyXG5cclxuICAgICAgICBjb25zdCBmaWxlSWQgPSBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5GaWxlSWQpO1xyXG4gICAgICAgIGNvbnN0IGxpbmtlZFRvU2hlZXQgPSByZXNwb25zZS5EYXRhPy5MaW5rZWRUb1NoZWV0ID09PSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IHBhcnRpYWxTdGF0ZSA9XHJcbiAgICAgICAgICBmaWxlSWRcclxuICAgICAgICAgICAgPyB7XHJcbiAgICAgICAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICAgICAgICBsaW5rZWRUb1NoZWV0LFxyXG4gICAgICAgICAgICAgICAgY29tcGxldGVkU3RhZ2U6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LkNvbXBsZXRlZFN0YWdlKSxcclxuICAgICAgICAgICAgICAgIHVybEZpbGU6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LlVybEZpbGUpLFxyXG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LkZpbGVOYW1lKSxcclxuICAgICAgICAgICAgICAgIHByb2Nlc3NlZEJ5QUk6IHJlc3BvbnNlLkRhdGE/LlByb2Nlc3NlZEJ5QUkgPz8gbnVsbCxcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKHBhcnRpYWxTdGF0ZSkge1xyXG4gICAgICAgICAgbGF0ZXN0Q3JlYXRlZFRpY2tldFJlZi5jdXJyZW50ID0gcGFydGlhbFN0YXRlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLlN1Y2Nlc3MgPT09IHRydWUpIHtcclxuICAgICAgICAgIGlmICghZmlsZUlkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm9GaWxlSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSB0aWNrZXQgZmlsZSBpZC5cIikpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGF3YWl0IGNvbXBsZXRlRmxvd1N1Y2Nlc3MoZmlsZUlkLCBsaW5rZWRUb1NoZWV0LCBjYWNoZUtleSk7XHJcbiAgICAgICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJxdWljay1jcmVhdGUucmVxdWVzdC5zdWNjZWVkZWRcIiwge1xyXG4gICAgICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxyXG4gICAgICAgICAgICBzb3VyY2U6IGNvbnRleHQuc291cmNlLFxyXG4gICAgICAgICAgICBlbGFwc2VkTXM6IHJlc3BvbnNlRWxhcHNlZE1zLFxyXG4gICAgICAgICAgICBodHRwU3RhdHVzOiByZXNwb25zZS5IdHRwU3RhdHVzLFxyXG4gICAgICAgICAgICB0cmFjZUlkOiBzYWZlVGV4dChyZXNwb25zZS5UcmFjZUlkKSxcclxuICAgICAgICAgICAgZmlsZUlkLFxyXG4gICAgICAgICAgICBsaW5rZWRUb1NoZWV0LFxyXG4gICAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uQ29tcGxldGVkU3RhZ2UpLFxyXG4gICAgICAgICAgICBwcm9jZXNzZWRCeUFJOiByZXNwb25zZS5EYXRhPy5Qcm9jZXNzZWRCeUFJID8/IG51bGwsXHJcbiAgICAgICAgICAgIHN0ZXBUcmFjZUlkczogcmVzcG9uc2UuRGF0YT8uU3RlcFRyYWNlSWRzID8/IG51bGwsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJ0aWFsU3RhdGUpIHtcclxuICAgICAgICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKHBhcnRpYWxTdGF0ZSk7XHJcbiAgICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJxdWljay1jcmVhdGUucGFydGlhbC1zdGF0ZVwiLCB7XHJcbiAgICAgICAgICAgIGF0dGVtcHRJZDogY29udGV4dC5hdHRlbXB0SWQsXHJcbiAgICAgICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXHJcbiAgICAgICAgICAgIGVsYXBzZWRNczogcmVzcG9uc2VFbGFwc2VkTXMsXHJcbiAgICAgICAgICAgIGZpbGVJZDogcGFydGlhbFN0YXRlLmZpbGVJZCxcclxuICAgICAgICAgICAgbGlua2VkVG9TaGVldDogcGFydGlhbFN0YXRlLmxpbmtlZFRvU2hlZXQsXHJcbiAgICAgICAgICAgIGNvbXBsZXRlZFN0YWdlOiBwYXJ0aWFsU3RhdGUuY29tcGxldGVkU3RhZ2UsXHJcbiAgICAgICAgICAgIHByb2Nlc3NlZEJ5QUk6IHBhcnRpYWxTdGF0ZS5wcm9jZXNzZWRCeUFJLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHNldFByb2dyZXNzRWxhcHNlZE1zKDApO1xyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkTWVzc2FnZSA9IHJlc29sdmVRdWlja0NyZWF0ZUZhaWx1cmVNZXNzYWdlKHJlc3BvbnNlKTtcclxuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJxdWljay1jcmVhdGUucmVxdWVzdC5jb21wbGV0ZWQtd2l0aC1lcnJvclwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQ6IGNvbnRleHQuYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlOiBjb250ZXh0LnNvdXJjZSxcclxuICAgICAgICAgIGVsYXBzZWRNczogcmVzcG9uc2VFbGFwc2VkTXMsXHJcbiAgICAgICAgICBodHRwU3RhdHVzOiByZXNwb25zZS5IdHRwU3RhdHVzLFxyXG4gICAgICAgICAgdHJhY2VJZDogc2FmZVRleHQocmVzcG9uc2UuVHJhY2VJZCksXHJcbiAgICAgICAgICBmaWxlSWQsXHJcbiAgICAgICAgICBsaW5rZWRUb1NoZWV0LFxyXG4gICAgICAgICAgY29tcGxldGVkU3RhZ2U6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LkNvbXBsZXRlZFN0YWdlKSxcclxuICAgICAgICAgIHByb2Nlc3NlZEJ5QUk6IHJlc3BvbnNlLkRhdGE/LlByb2Nlc3NlZEJ5QUkgPz8gbnVsbCxcclxuICAgICAgICAgIHJldHJ5QWZ0ZXI6IHNhZmVUZXh0KHJlc3BvbnNlLlJldHJ5QWZ0ZXIpLFxyXG4gICAgICAgICAgbWVzc2FnZTogc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSksXHJcbiAgICAgICAgICByZXNvbHZlZE1lc3NhZ2UsXHJcbiAgICAgICAgICBlcnJvcnM6IEFycmF5LmlzQXJyYXkocmVzcG9uc2UuRXJyb3JzKSA/IHJlc3BvbnNlLkVycm9ycyA6IFtdLFxyXG4gICAgICAgICAgc3RlcFRyYWNlSWRzOiByZXNwb25zZS5EYXRhPy5TdGVwVHJhY2VJZHMgPz8gbnVsbCxcclxuICAgICAgICB9KTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UocmVzb2x2ZWRNZXNzYWdlKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yKSB7XHJcbiAgICAgICAgICBhZGRUcmFjZShcInRpY2tldC1xdWljay1jcmVhdGUtZXJyb3JcIiwgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IoZXJyb3IpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0RXJyb3IoXCJxdWljay1jcmVhdGUucmVxdWVzdC5mYWlsZWRcIiwge1xyXG4gICAgICAgICAgYXR0ZW1wdElkOiBjb250ZXh0LmF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZTogY29udGV4dC5zb3VyY2UsXHJcbiAgICAgICAgICBlbGFwc2VkTXM6IE1hdGgubWF4KDAsIERhdGUubm93KCkgLSByZXF1ZXN0U3RhcnRlZEF0KSxcclxuICAgICAgICAgIHVwbG9hZEZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEoZmlsZSksXHJcbiAgICAgICAgICB0cmFjZUlkOiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgPyBleHRyYWN0VHJhY2VJZEZyb21FcnJvcihlcnJvcikgOiBcIlwiLFxyXG4gICAgICAgICAgc3RhdHVzOiBlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IgPyBlcnJvci5zdGF0dXMgOiBudWxsLFxyXG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIDogXCJcIixcclxuICAgICAgICAgIHZhbGlkYXRpb25FcnJvcnM6IGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvciA/IGVycm9yLnZhbGlkYXRpb25FcnJvcnMgOiBbXSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJlcnJvclByb2Nlc3NcIiwgMTUwMCk7XHJcbiAgICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XHJcbiAgICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHNldFByb2dyZXNzRWxhcHNlZE1zKDApO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNvbHZlVWlFcnJvck1lc3NhZ2UoZXJyb3IpKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtcclxuICAgICAgYWRkUXVpY2tDcmVhdGVSZXNwb25zZVRyYWNlcyxcclxuICAgICAgYWRkVHJhY2UsXHJcbiAgICAgIGJ1aWxkQXBpT3B0aW9ucyxcclxuICAgICAgY2xlYXJGbG93U3RhdGUsXHJcbiAgICAgIGNvbXBsZXRlRmxvd1N1Y2Nlc3MsXHJcbiAgICAgIGN1cnJlbmN5Q29kZSxcclxuICAgICAgbGlua1RvU2hlZXQsXHJcbiAgICAgIHByb2plY3RJZCxcclxuICAgICAgcmVzb2x2ZVF1aWNrQ3JlYXRlRmFpbHVyZU1lc3NhZ2UsXHJcbiAgICAgIHJlc29sdmVVaUVycm9yTWVzc2FnZSxcclxuICAgICAgc2hlZXRJZCxcclxuICAgIF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVTZWxlY3RlZEZpbGUgPSB1c2VDYWxsYmFjayhcclxuICAgIGFzeW5jIChmaWxlOiBGaWxlIHwgbnVsbCwgc291cmNlOiBUaWNrZXRJbWFnZVNvdXJjZSk6IFByb21pc2U8dm9pZD4gPT4ge1xyXG4gICAgICBpZiAoIWZpbGUpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGF0dGVtcHRJZCA9IHJlc29sdmVSYW5kb21LZXkoKTtcclxuICAgICAgY29uc3Qgc2VsZWN0aW9uU3RhcnRlZEF0ID0gRGF0ZS5ub3coKTtcclxuICAgICAgc2V0QXR0ZW1wdElkKGF0dGVtcHRJZCk7XHJcbiAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcInNlbGVjdGlvbi5yZWNlaXZlZFwiLCB7XHJcbiAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgIHNvdXJjZSxcclxuICAgICAgICBsaW5rVG9TaGVldCxcclxuICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uKCkpIHtcclxuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJzZWxlY3Rpb24uZm9yYmlkZGVuXCIsIHtcclxuICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgIHNvdXJjZSxcclxuICAgICAgICAgIGxpbmtUb1NoZWV0LFxyXG4gICAgICAgICAgY2FuQ3JlYXRlRXhwZW5zZSxcclxuICAgICAgICAgIGlzQ3JlYXRlTW9kZSxcclxuICAgICAgICAgIGlzU2hlZXRMb2NrZWQsXHJcbiAgICAgICAgICBoYXNTaGVldElkOiAhIXNhZmVUZXh0KHNoZWV0SWQpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3Qgc2FmZVR5cGUgPSBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGlmIChzYWZlVHlwZSAmJiAhc2FmZVR5cGUuc3RhcnRzV2l0aChcImltYWdlL1wiKSAmJiAhL1xcLihqcGU/Z3xwbmd8d2VicCkkL2kudGVzdChmaWxlLm5hbWUgfHwgXCJcIikpIHtcclxuICAgICAgICBsb2dRdWlja1RpY2tldFdhcm4oXCJzZWxlY3Rpb24uaW52YWxpZC1maWxlLXR5cGVcIiwge1xyXG4gICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YShmaWxlKSxcclxuICAgICAgICAgIHJlYXNvbjogXCJtaW1lLWFuZC1leHRlbnNpb24tbm90LXN1cHBvcnRlZFwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfRmlsZVR5cGVcIiwgXCJVbnN1cHBvcnRlZCBpbWFnZSBmb3JtYXQuXCIpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFpc1N1cHBvcnRlZFRpY2tldEltYWdlRmlsZShmaWxlKSkge1xyXG4gICAgICAgIGxvZ1F1aWNrVGlja2V0V2FybihcInNlbGVjdGlvbi5pbnZhbGlkLWZpbGUtdHlwZVwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxyXG4gICAgICAgICAgcmVhc29uOiBcInVuc3VwcG9ydGVkLXRpY2tldC1pbWFnZS1maWxlXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlVHlwZVwiLCBcIlVuc3VwcG9ydGVkIGltYWdlIGZvcm1hdC5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY2xlYXJGbG93U3RhdGUoKTtcclxuICAgICAgc2V0UHJvZ3Jlc3NLZXkoXCJ1cGxvYWRpbmdJbWFnZVwiKTtcclxuICAgICAgc2V0RGlzcGxheVByb2dyZXNzS2V5KFwidXBsb2FkaW5nSW1hZ2VcIik7XHJcbiAgICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBzZWxlY3Rpb25TdGFydGVkQXQ7XHJcbiAgICAgIHNldFByb2dyZXNzRWxhcHNlZE1zKDApO1xyXG4gICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJvcHRpbWl6YXRpb24uc3RhcnRlZFwiLCB7XHJcbiAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgIHNvdXJjZSxcclxuICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IG9wdGltaXphdGlvblJlc3VsdCA9IGF3YWl0IG9wdGltaXplVGlja2V0SW1hZ2VGb3JVcGxvYWQoZmlsZSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwib3B0aW1pemF0aW9uLmZhaWxlZFwiLCB7XHJcbiAgICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKGZpbGUpLFxyXG4gICAgICAgICAgbWVzc2FnZTogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpIDogXCJcIixcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gYnVpbGRGYWxsYmFja09wdGltaXphdGlvblJlc3VsdChmaWxlKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbnN0IHVwbG9hZEZpbGUgPSBvcHRpbWl6YXRpb25SZXN1bHQuZmlsZTtcclxuICAgICAgbG9nUXVpY2tUaWNrZXRJbmZvKFwib3B0aW1pemF0aW9uLmNvbXBsZXRlZFwiLCB7XHJcbiAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgIHNvdXJjZSxcclxuICAgICAgICAuLi5idWlsZE9wdGltaXphdGlvbkxvZ0RhdGEob3B0aW1pemF0aW9uUmVzdWx0KSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAodXBsb2FkRmlsZS5zaXplID4gTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTKSB7XHJcbiAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwic2VsZWN0aW9uLnJlamVjdGVkLWJ5LXNpemVcIiwge1xyXG4gICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgbWF4U2l6ZUJ5dGVzOiBNQVhfVElDS0VUX0lNQUdFX1NJWkVfQllURVMsXHJcbiAgICAgICAgICBtYXhTaXplVGV4dDogZm9ybWF0RmlsZVNpemUoTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTKSxcclxuICAgICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEodXBsb2FkRmlsZSksXHJcbiAgICAgICAgICBvcHRpbWl6YXRpb246IGJ1aWxkT3B0aW1pemF0aW9uTG9nRGF0YShvcHRpbWl6YXRpb25SZXN1bHQpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldFByb2dyZXNzS2V5KG51bGwpO1xyXG4gICAgICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShudWxsKTtcclxuICAgICAgICBwcm9ncmVzc1N0YXJ0ZWRBdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICBzZXRQcm9ncmVzc0VsYXBzZWRNcygwKTtcclxuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVTaXplXCIsIFwiSW1hZ2UgZXhjZWVkcyA1ME1CIG1heCBzaXplLlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjYWNoZUtleSA9IGF0dGVtcHRJZDtcclxuICAgICAgbGF0ZXN0RmlsZVJlZi5jdXJyZW50ID0geyBjYWNoZUtleSwgZmlsZTogdXBsb2FkRmlsZSB9O1xyXG4gICAgICBsb2dRdWlja1RpY2tldEluZm8oXCJjYWNoZS5zdG9yZS5zdGFydGVkXCIsIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIGNhY2hlS2V5LFxyXG4gICAgICAgIGZpbGU6IGJ1aWxkRmlsZUxvZ0RhdGEodXBsb2FkRmlsZSksXHJcbiAgICAgIH0pO1xyXG4gICAgICB2b2lkIGNhY2hlSW1hZ2VGaWxlKGNhY2hlS2V5LCB1cGxvYWRGaWxlKVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgIGxvZ1F1aWNrVGlja2V0SW5mbyhcImNhY2hlLnN0b3JlLmNvbXBsZXRlZFwiLCB7XHJcbiAgICAgICAgICAgIGF0dGVtcHRJZCxcclxuICAgICAgICAgICAgc291cmNlLFxyXG4gICAgICAgICAgICBjYWNoZUtleSxcclxuICAgICAgICAgICAgZmlsZTogYnVpbGRGaWxlTG9nRGF0YSh1cGxvYWRGaWxlKSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgbG9nUXVpY2tUaWNrZXRXYXJuKFwiY2FjaGUuc3RvcmUuZmFpbGVkXCIsIHtcclxuICAgICAgICAgICAgYXR0ZW1wdElkLFxyXG4gICAgICAgICAgICBzb3VyY2UsXHJcbiAgICAgICAgICAgIGNhY2hlS2V5LFxyXG4gICAgICAgICAgICBmaWxlOiBidWlsZEZpbGVMb2dEYXRhKHVwbG9hZEZpbGUpLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgOiBcIlwiLFxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICBhd2FpdCBydW5RdWlja0NyZWF0ZUZsb3codXBsb2FkRmlsZSwgY2FjaGVLZXksIHtcclxuICAgICAgICBhdHRlbXB0SWQsXHJcbiAgICAgICAgc291cmNlLFxyXG4gICAgICAgIHN0YXJ0ZWRBdDogc2VsZWN0aW9uU3RhcnRlZEF0LFxyXG4gICAgICAgIG9wdGltaXphdGlvbjogb3B0aW1pemF0aW9uUmVzdWx0LFxyXG4gICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBbY2FuQ3JlYXRlRXhwZW5zZSwgY2xlYXJGbG93U3RhdGUsIGVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbiwgaXNDcmVhdGVNb2RlLCBpc1NoZWV0TG9ja2VkLCBsaW5rVG9TaGVldCwgcnVuUXVpY2tDcmVhdGVGbG93LCBzaGVldElkXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJldHJ5UGVuZGluZ1VwbG9hZCA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIHJldHVybjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG9wZW5DcmVhdGVkVGlja2V0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgY3JlYXRlZFRpY2tldCA9IHBhcnRpYWxUaWNrZXRGYWlsdXJlIHx8IGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudDtcclxuICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGNyZWF0ZWRUaWNrZXQ/LmZpbGVJZCk7XHJcbiAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xyXG5cclxuICAgIGNsZWFyQ2FjaGVkQ3VycmVudEltYWdlKCk7XHJcbiAgICBzZXRBdHRlbXB0SWQoXCJcIik7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcclxuICAgIG9uQ29tcGxldGVkPy4oeyBmaWxlSWQsIGxpbmtlZFRvU2hlZXQ6IGNyZWF0ZWRUaWNrZXQ/LmxpbmtlZFRvU2hlZXQgPT09IHRydWUgfSk7XHJcbiAgfSwgW2NsZWFyQ2FjaGVkQ3VycmVudEltYWdlLCBvbkNvbXBsZXRlZCwgcGFydGlhbFRpY2tldEZhaWx1cmVdKTtcclxuXHJcbiAgY29uc3Qgb3BlblNvdXJjZVBpY2tlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uKCkpIHJldHVybjtcclxuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcclxuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xyXG4gICAgc2V0U291cmNlUGlja2VyT3Blbih0cnVlKTtcclxuICB9LCBbZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uXSk7XHJcblxyXG4gIGNvbnN0IGNsb3NlU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybjtcclxuICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xyXG4gIH0sIFtidXN5XSk7XHJcblxyXG4gIGNvbnN0IHJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8Ym9vbGVhbiB8IG51bGw+ID0+IHtcclxuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcclxuICAgIGNvbnN0IG1lZGlhRGV2aWNlcyA9IG5hdmlnYXRvci5tZWRpYURldmljZXM7XHJcbiAgICBpZiAoIW1lZGlhRGV2aWNlcyB8fCB0eXBlb2YgbWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzdHJlYW0gPSBhd2FpdCBtZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHtcclxuICAgICAgICB2aWRlbzogeyBmYWNpbmdNb2RlOiBcImVudmlyb25tZW50XCIgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHN0cmVhbS5nZXRUcmFja3MoKS5mb3JFYWNoKCh0cmFjaykgPT4gdHJhY2suc3RvcCgpKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0RnJvbUNhbWVyYSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgYXN5bmMgKGlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudCB8IG51bGwpID0+IHtcclxuICAgICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcclxuICAgICAgY29uc3QgZ3JhbnRlZCA9IGF3YWl0IHJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uKCk7XHJcbiAgICAgIGlmIChncmFudGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfQ2FtZXJhUGVybWlzc2lvblwiLCBcIkNhbWVyYSBwZXJtaXNzaW9uIGlzIHJlcXVpcmVkLlwiKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xyXG4gICAgICBpbnB1dEVsZW1lbnQuY2xpY2soKTtcclxuICAgIH0sXHJcbiAgICBbcmVxdWVzdENhbWVyYVBlcm1pc3Npb25dXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0RnJvbUdhbGxlcnkgPSB1c2VDYWxsYmFjaygoaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcclxuICAgIHNldFNvdXJjZVBpY2tlck9wZW4oZmFsc2UpO1xyXG4gICAgaW5wdXRFbGVtZW50LmNsaWNrKCk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBjbGVhckVycm9yID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2UoKTtcclxuICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBzZXRBdHRlbXB0SWQoXCJcIik7XHJcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcclxuICAgIHNldERpc3BsYXlQcm9ncmVzc0tleShudWxsKTtcclxuICAgIHByb2dyZXNzU3RhcnRlZEF0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgc2V0UHJvZ3Jlc3NFbGFwc2VkTXMoMCk7XHJcbiAgfSwgW2NsZWFyQ2FjaGVkQ3VycmVudEltYWdlXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxyXG4gICAgYnVzeSxcclxuICAgIHByb2dyZXNzS2V5LFxyXG4gICAgcHJvZ3Jlc3NNZXNzYWdlLFxyXG4gICAgcHJvZ3Jlc3NTdGFnZXMsXHJcbiAgICBwcm9ncmVzc0VsYXBzZWRNcyxcclxuICAgIGVycm9yTWVzc2FnZSxcclxuICAgIGF0dGVtcHRJZCxcclxuICAgIGhhc1BlbmRpbmdVcGxvYWRSZXRyeTogZmFsc2UsXHJcbiAgICBoYXNQYXJ0aWFsVGlja2V0RmFpbHVyZTogcGFydGlhbFRpY2tldEZhaWx1cmUgIT09IG51bGwsXHJcbiAgICB0cmFjZUxpc3QsXHJcbiAgICBvcGVuU291cmNlUGlja2VyLFxyXG4gICAgY2xvc2VTb3VyY2VQaWNrZXIsXHJcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxyXG4gICAgc2VsZWN0RnJvbUdhbGxlcnksXHJcbiAgICBoYW5kbGVTZWxlY3RlZEZpbGUsXHJcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXHJcbiAgICBvcGVuQ3JlYXRlZFRpY2tldCxcclxuICAgIGNsZWFyRXJyb3IsXHJcbiAgfTtcclxufTtcclxuIiwgImltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG5jb25zdCBNQVhfVElDS0VUX1VQTE9BRF9MT05HX1NJREVfUFggPSAyMDQ4O1xyXG5jb25zdCBNSU5fVElDS0VUX1VQTE9BRF9TSE9SVF9TSURFX1BYID0gNzY4O1xyXG5jb25zdCBUSUNLRVRfUkVFTkNPREVfUVVBTElUWSA9IDAuODU7XHJcbmNvbnN0IE1JTl9USUNLRVRfUkVFTkNPREVfQllURVMgPSA0ICogMTAyNCAqIDEwMjQ7XHJcbmNvbnN0IE1JTl9USUNLRVRfUkVEVUNUSU9OX0JZVEVTID0gMjU2ICogMTAyNDtcclxuY29uc3QgTUlOX1RJQ0tFVF9SRURVQ1RJT05fUkFUSU8gPSAwLjEyO1xyXG5cclxudHlwZSBMb2FkZWRJbWFnZSA9IHtcclxuICBlbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgZGlzcG9zZTogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFRpY2tldEltYWdlT3B0aW1pemF0aW9uUmVzdWx0ID0ge1xyXG4gIGZpbGU6IEZpbGU7XHJcbiAgY2hhbmdlZDogYm9vbGVhbjtcclxuICByZWFzb246IHN0cmluZztcclxuICByZXNpemVkOiBib29sZWFuO1xyXG4gIHJlZW5jb2RlZDogYm9vbGVhbjtcclxuICBlbGFwc2VkTXM6IG51bWJlcjtcclxuICBvcmlnaW5hbDoge1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgc2l6ZTogbnVtYmVyO1xyXG4gICAgd2lkdGg6IG51bWJlciB8IG51bGw7XHJcbiAgICBoZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbiAgfTtcclxuICBvdXRwdXQ6IHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHR5cGU6IHN0cmluZztcclxuICAgIHNpemU6IG51bWJlcjtcclxuICAgIHdpZHRoOiBudW1iZXIgfCBudWxsO1xyXG4gICAgaGVpZ2h0OiBudW1iZXIgfCBudWxsO1xyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCBub3JtYWxpemVNaW1lVHlwZSA9ICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nID0+IHtcclxuICBjb25zdCBub3JtYWxpemVkID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKG5vcm1hbGl6ZWQgPT09IFwiaW1hZ2UvcGpwZWdcIiB8fCBub3JtYWxpemVkID09PSBcImltYWdlL2pwZ1wiKSB7XHJcbiAgICByZXR1cm4gXCJpbWFnZS9qcGVnXCI7XHJcbiAgfVxyXG4gIHJldHVybiBub3JtYWxpemVkO1xyXG59O1xyXG5cclxuY29uc3QgcmVwbGFjZUZpbGVFeHRlbnNpb24gPSAoZmlsZU5hbWU6IHN0cmluZywgZXh0ZW5zaW9uOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xyXG4gIGNvbnN0IGJhc2VOYW1lID0gc2FmZVRleHQoZmlsZU5hbWUpLnJlcGxhY2UoL1xcLlthLXowLTldKyQvaSwgXCJcIik7XHJcbiAgY29uc3Qgc2FmZUJhc2VOYW1lID0gYmFzZU5hbWUgfHwgXCJ0aWNrZXRcIjtcclxuICBjb25zdCBzYWZlRXh0ZW5zaW9uID0gc2FmZVRleHQoZXh0ZW5zaW9uKS5yZXBsYWNlKC9eXFwuLywgXCJcIikudG9Mb3dlckNhc2UoKSB8fCBcImpwZ1wiO1xyXG4gIHJldHVybiBgJHtzYWZlQmFzZU5hbWV9LiR7c2FmZUV4dGVuc2lvbn1gO1xyXG59O1xyXG5cclxuLy8gTG9hZHMgb25lIGltYWdlIGVsZW1lbnQgc28gY2FudmFzIHJlc2l6aW5nIGtlZXBzIHRoZSBicm93c2VyLWRlY29kZWQgb3JpZW50YXRpb24uXHJcbmNvbnN0IGxvYWRJbWFnZSA9IGFzeW5jIChmaWxlOiBGaWxlKTogUHJvbWlzZTxMb2FkZWRJbWFnZSB8IG51bGw+ID0+IHtcclxuICBpZiAodHlwZW9mIEltYWdlID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBVUkwgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgIT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCBvYmplY3RVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xyXG4gIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgaW1hZ2UuZGVjb2RpbmcgPSBcImFzeW5jXCI7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoKTtcclxuICAgICAgaW1hZ2Uub25lcnJvciA9ICgpID0+IHJlamVjdChuZXcgRXJyb3IoXCJDb3VsZCBub3QgZGVjb2RlIGltYWdlLlwiKSk7XHJcbiAgICAgIGltYWdlLnNyYyA9IG9iamVjdFVybDtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHdpZHRoID0gTnVtYmVyKGltYWdlLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aCB8fCAwKTtcclxuICAgIGNvbnN0IGhlaWdodCA9IE51bWJlcihpbWFnZS5uYXR1cmFsSGVpZ2h0IHx8IGltYWdlLmhlaWdodCB8fCAwKTtcclxuICAgIGlmICghKHdpZHRoID4gMCkgfHwgIShoZWlnaHQgPiAwKSkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlbGVtZW50OiBpbWFnZSxcclxuICAgICAgd2lkdGgsXHJcbiAgICAgIGhlaWdodCxcclxuICAgICAgZGlzcG9zZTogKCkgPT4ge1xyXG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqZWN0VXJsKTtcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfSBjYXRjaCB7XHJcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKG9iamVjdFVybCk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCByZXNvbHZlUmVzaXplRGltZW5zaW9ucyA9ICh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IHsgd2lkdGg6IG51bWJlcjsgaGVpZ2h0OiBudW1iZXI7IHJlc2l6ZWQ6IGJvb2xlYW4gfSA9PiB7XHJcbiAgY29uc3QgbG9uZ1NpZGUgPSBNYXRoLm1heCh3aWR0aCwgaGVpZ2h0KTtcclxuICBjb25zdCBzaG9ydFNpZGUgPSBNYXRoLm1pbih3aWR0aCwgaGVpZ2h0KTtcclxuICBpZiAobG9uZ1NpZGUgPD0gTUFYX1RJQ0tFVF9VUExPQURfTE9OR19TSURFX1BYKSB7XHJcbiAgICByZXR1cm4geyB3aWR0aCwgaGVpZ2h0LCByZXNpemVkOiBmYWxzZSB9O1xyXG4gIH1cclxuXHJcbiAgY29uc3QgbWF4TG9uZ1NpZGVTY2FsZSA9IE1BWF9USUNLRVRfVVBMT0FEX0xPTkdfU0lERV9QWCAvIGxvbmdTaWRlO1xyXG4gIGNvbnN0IG1pblNob3J0U2lkZVNjYWxlID0gTUlOX1RJQ0tFVF9VUExPQURfU0hPUlRfU0lERV9QWCAvIHNob3J0U2lkZTtcclxuICBjb25zdCBzY2FsZSA9IE1hdGgubWF4KG1heExvbmdTaWRlU2NhbGUsIG1pblNob3J0U2lkZVNjYWxlKTtcclxuICBpZiAoIShzY2FsZSA8IDEpKSB7XHJcbiAgICByZXR1cm4geyB3aWR0aCwgaGVpZ2h0LCByZXNpemVkOiBmYWxzZSB9O1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHdpZHRoOiBNYXRoLm1heCgxLCBNYXRoLnJvdW5kKHdpZHRoICogc2NhbGUpKSxcclxuICAgIGhlaWdodDogTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChoZWlnaHQgKiBzY2FsZSkpLFxyXG4gICAgcmVzaXplZDogdHJ1ZSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgY3JlYXRlQ2FudmFzID0gKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogSFRNTENhbnZhc0VsZW1lbnQgfCBudWxsID0+IHtcclxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gIHJldHVybiBjYW52YXM7XHJcbn07XHJcblxyXG5jb25zdCBjYW52YXNUb0Jsb2IgPSAoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgbWltZVR5cGU6IHN0cmluZywgcXVhbGl0eT86IG51bWJlcik6IFByb21pc2U8QmxvYiB8IG51bGw+ID0+IHtcclxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgIGNhbnZhcy50b0Jsb2IoKGJsb2IpID0+IHJlc29sdmUoYmxvYiksIG1pbWVUeXBlLCBxdWFsaXR5KTtcclxuICB9KTtcclxufTtcclxuXHJcbmNvbnN0IGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0ID0gKHtcclxuICBmaWxlLFxyXG4gIG9yaWdpbmFsRmlsZSxcclxuICByZWFzb24sXHJcbiAgcmVzaXplZCxcclxuICByZWVuY29kZWQsXHJcbiAgZWxhcHNlZE1zLFxyXG4gIG9yaWdpbmFsV2lkdGgsXHJcbiAgb3JpZ2luYWxIZWlnaHQsXHJcbiAgb3V0cHV0V2lkdGgsXHJcbiAgb3V0cHV0SGVpZ2h0LFxyXG59OiB7XHJcbiAgZmlsZTogRmlsZTtcclxuICBvcmlnaW5hbEZpbGU6IEZpbGU7XHJcbiAgcmVhc29uOiBzdHJpbmc7XHJcbiAgcmVzaXplZDogYm9vbGVhbjtcclxuICByZWVuY29kZWQ6IGJvb2xlYW47XHJcbiAgZWxhcHNlZE1zOiBudW1iZXI7XHJcbiAgb3JpZ2luYWxXaWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICBvcmlnaW5hbEhlaWdodDogbnVtYmVyIHwgbnVsbDtcclxuICBvdXRwdXRXaWR0aDogbnVtYmVyIHwgbnVsbDtcclxuICBvdXRwdXRIZWlnaHQ6IG51bWJlciB8IG51bGw7XHJcbn0pOiBUaWNrZXRJbWFnZU9wdGltaXphdGlvblJlc3VsdCA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGZpbGUsXHJcbiAgICBjaGFuZ2VkOlxyXG4gICAgICBmaWxlICE9PSBvcmlnaW5hbEZpbGUgfHxcclxuICAgICAgZmlsZS5zaXplICE9PSBvcmlnaW5hbEZpbGUuc2l6ZSB8fFxyXG4gICAgICBzYWZlVGV4dChmaWxlLnR5cGUpLnRvTG93ZXJDYXNlKCkgIT09IHNhZmVUZXh0KG9yaWdpbmFsRmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpLFxyXG4gICAgcmVhc29uLFxyXG4gICAgcmVzaXplZCxcclxuICAgIHJlZW5jb2RlZCxcclxuICAgIGVsYXBzZWRNcyxcclxuICAgIG9yaWdpbmFsOiB7XHJcbiAgICAgIG5hbWU6IG9yaWdpbmFsRmlsZS5uYW1lLFxyXG4gICAgICB0eXBlOiBvcmlnaW5hbEZpbGUudHlwZSxcclxuICAgICAgc2l6ZTogb3JpZ2luYWxGaWxlLnNpemUsXHJcbiAgICAgIHdpZHRoOiBvcmlnaW5hbFdpZHRoLFxyXG4gICAgICBoZWlnaHQ6IG9yaWdpbmFsSGVpZ2h0LFxyXG4gICAgfSxcclxuICAgIG91dHB1dDoge1xyXG4gICAgICBuYW1lOiBmaWxlLm5hbWUsXHJcbiAgICAgIHR5cGU6IGZpbGUudHlwZSxcclxuICAgICAgc2l6ZTogZmlsZS5zaXplLFxyXG4gICAgICB3aWR0aDogb3V0cHV0V2lkdGgsXHJcbiAgICAgIGhlaWdodDogb3V0cHV0SGVpZ2h0LFxyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyB0aGUgdXBsb2FkIGZpbGUgdG8gdXNlLiBJdCBrZWVwcyB0aGUgb3JpZ2luYWwgd2hlbiByZWR1Y3Rpb24gd291bGQgYmUgcmlza3kgb3IgaXJyZWxldmFudC5cclxuZXhwb3J0IGNvbnN0IG9wdGltaXplVGlja2V0SW1hZ2VGb3JVcGxvYWQgPSBhc3luYyAoZmlsZTogRmlsZSk6IFByb21pc2U8VGlja2V0SW1hZ2VPcHRpbWl6YXRpb25SZXN1bHQ+ID0+IHtcclxuICBjb25zdCBzdGFydGVkQXQgPSBEYXRlLm5vdygpO1xyXG4gIGlmICghKGZpbGUgaW5zdGFuY2VvZiBGaWxlKSkge1xyXG4gICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgZmlsZSxcclxuICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICByZWFzb246IFwiaW52YWxpZC1pbnB1dFwiLFxyXG4gICAgICByZXNpemVkOiBmYWxzZSxcclxuICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICBvcmlnaW5hbFdpZHRoOiBudWxsLFxyXG4gICAgICBvcmlnaW5hbEhlaWdodDogbnVsbCxcclxuICAgICAgb3V0cHV0V2lkdGg6IG51bGwsXHJcbiAgICAgIG91dHB1dEhlaWdodDogbnVsbCxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplZE1pbWVUeXBlID0gbm9ybWFsaXplTWltZVR5cGUoZmlsZS50eXBlKTtcclxuICBjb25zdCBsb2FkZWRJbWFnZSA9IGF3YWl0IGxvYWRJbWFnZShmaWxlKTtcclxuICBpZiAoIWxvYWRlZEltYWdlKSB7XHJcbiAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICBmaWxlLFxyXG4gICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgIHJlYXNvbjogXCJkZWNvZGUtdW5hdmFpbGFibGVcIixcclxuICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgIHJlZW5jb2RlZDogZmFsc2UsXHJcbiAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgb3JpZ2luYWxXaWR0aDogbnVsbCxcclxuICAgICAgb3JpZ2luYWxIZWlnaHQ6IG51bGwsXHJcbiAgICAgIG91dHB1dFdpZHRoOiBudWxsLFxyXG4gICAgICBvdXRwdXRIZWlnaHQ6IG51bGwsXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGVsZW1lbnQgfSA9IGxvYWRlZEltYWdlO1xyXG4gICAgY29uc3Qgc2hvcnRTaWRlID0gTWF0aC5taW4od2lkdGgsIGhlaWdodCk7XHJcbiAgICBjb25zdCByZXNpemVQbGFuID0gcmVzb2x2ZVJlc2l6ZURpbWVuc2lvbnMod2lkdGgsIGhlaWdodCk7XHJcbiAgICBjb25zdCBjYW5SZWVuY29kZVNhZmVseSA9IHNob3J0U2lkZSA+PSBNSU5fVElDS0VUX1VQTE9BRF9TSE9SVF9TSURFX1BYO1xyXG4gICAgY29uc3QgaXNMYXJnZU9yaWdpbmFsID0gZmlsZS5zaXplID49IE1JTl9USUNLRVRfUkVFTkNPREVfQllURVM7XHJcbiAgICBjb25zdCBzaG91bGRSZXNpemUgPSByZXNpemVQbGFuLnJlc2l6ZWQ7XHJcblxyXG4gICAgaWYgKCFzaG91bGRSZXNpemUgJiYgKCFjYW5SZWVuY29kZVNhZmVseSB8fCAhaXNMYXJnZU9yaWdpbmFsKSkge1xyXG4gICAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICAgIHJlYXNvbjogIWNhblJlZW5jb2RlU2FmZWx5ID8gXCJrZXB0LXNtYWxsLXNob3J0LXNpZGVcIiA6IFwia2VwdC1zbWFsbC1maWxlXCIsXHJcbiAgICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBvdXRwdXRXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3V0cHV0SGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChub3JtYWxpemVkTWltZVR5cGUgPT09IFwiaW1hZ2UvcG5nXCIgJiYgIXNob3VsZFJlc2l6ZSkge1xyXG4gICAgICByZXR1cm4gYnVpbGRPcHRpbWl6YXRpb25SZXN1bHQoe1xyXG4gICAgICAgIGZpbGUsXHJcbiAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICAgIHJlYXNvbjogXCJrZXB0LXBuZy13aXRob3V0LXJlc2l6ZVwiLFxyXG4gICAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxyXG4gICAgICAgIHJlZW5jb2RlZDogZmFsc2UsXHJcbiAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICAgIG9yaWdpbmFsV2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgb3V0cHV0V2lkdGg6IHdpZHRoLFxyXG4gICAgICAgIG91dHB1dEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjYW52YXMgPSBjcmVhdGVDYW52YXMocmVzaXplUGxhbi53aWR0aCwgcmVzaXplUGxhbi5oZWlnaHQpO1xyXG4gICAgY29uc3QgY29udGV4dCA9IGNhbnZhcz8uZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgaWYgKCFjYW52YXMgfHwgIWNvbnRleHQpIHtcclxuICAgICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgICBmaWxlLFxyXG4gICAgICAgIG9yaWdpbmFsRmlsZTogZmlsZSxcclxuICAgICAgICByZWFzb246IFwiY2FudmFzLXVuYXZhaWxhYmxlXCIsXHJcbiAgICAgICAgcmVzaXplZDogZmFsc2UsXHJcbiAgICAgICAgcmVlbmNvZGVkOiBmYWxzZSxcclxuICAgICAgICBlbGFwc2VkTXM6IERhdGUubm93KCkgLSBzdGFydGVkQXQsXHJcbiAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgICBvdXRwdXRXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgb3V0cHV0SGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gdHJ1ZTtcclxuICAgIGNvbnRleHQuaW1hZ2VTbW9vdGhpbmdRdWFsaXR5ID0gXCJoaWdoXCI7XHJcbiAgICBjb250ZXh0LmRyYXdJbWFnZShlbGVtZW50LCAwLCAwLCByZXNpemVQbGFuLndpZHRoLCByZXNpemVQbGFuLmhlaWdodCk7XHJcblxyXG4gICAgY29uc3Qgb3V0cHV0TWltZVR5cGUgPVxyXG4gICAgICBub3JtYWxpemVkTWltZVR5cGUgPT09IFwiaW1hZ2Uvd2VicFwiXHJcbiAgICAgICAgPyBcImltYWdlL3dlYnBcIlxyXG4gICAgICAgIDogbm9ybWFsaXplZE1pbWVUeXBlID09PSBcImltYWdlL3BuZ1wiICYmIHNob3VsZFJlc2l6ZVxyXG4gICAgICAgICAgPyBcImltYWdlL2pwZWdcIlxyXG4gICAgICAgICAgOiBcImltYWdlL2pwZWdcIjtcclxuICAgIGNvbnN0IG91dHB1dEV4dGVuc2lvbiA9XHJcbiAgICAgIG91dHB1dE1pbWVUeXBlID09PSBcImltYWdlL3dlYnBcIlxyXG4gICAgICAgID8gXCJ3ZWJwXCJcclxuICAgICAgICA6IG91dHB1dE1pbWVUeXBlID09PSBcImltYWdlL3BuZ1wiXHJcbiAgICAgICAgICA/IFwicG5nXCJcclxuICAgICAgICAgIDogXCJqcGdcIjtcclxuICAgIGNvbnN0IHF1YWxpdHkgPSBvdXRwdXRNaW1lVHlwZSA9PT0gXCJpbWFnZS9wbmdcIiA/IHVuZGVmaW5lZCA6IFRJQ0tFVF9SRUVOQ09ERV9RVUFMSVRZO1xyXG4gICAgY29uc3Qgb3B0aW1pemVkQmxvYiA9IGF3YWl0IGNhbnZhc1RvQmxvYihjYW52YXMsIG91dHB1dE1pbWVUeXBlLCBxdWFsaXR5KTtcclxuICAgIGlmICghb3B0aW1pemVkQmxvYiB8fCBvcHRpbWl6ZWRCbG9iLnNpemUgPD0gMCB8fCBvcHRpbWl6ZWRCbG9iLnNpemUgPj0gZmlsZS5zaXplKSB7XHJcbiAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgICAgZmlsZSxcclxuICAgICAgICBvcmlnaW5hbEZpbGU6IGZpbGUsXHJcbiAgICAgICAgcmVhc29uOiBcIm9wdGltaXplZC1ub3Qtc21hbGxlclwiLFxyXG4gICAgICAgIHJlc2l6ZWQ6IHNob3VsZFJlc2l6ZSxcclxuICAgICAgICByZWVuY29kZWQ6IG5vcm1hbGl6ZWRNaW1lVHlwZSAhPT0gb3V0cHV0TWltZVR5cGUgfHwgaXNMYXJnZU9yaWdpbmFsLFxyXG4gICAgICAgIGVsYXBzZWRNczogRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdCxcclxuICAgICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgIG91dHB1dFdpZHRoOiBzaG91bGRSZXNpemUgPyByZXNpemVQbGFuLndpZHRoIDogd2lkdGgsXHJcbiAgICAgICAgb3V0cHV0SGVpZ2h0OiBzaG91bGRSZXNpemUgPyByZXNpemVQbGFuLmhlaWdodCA6IGhlaWdodCxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFzaG91bGRSZXNpemUpIHtcclxuICAgICAgY29uc3Qgc2F2ZWRCeXRlcyA9IGZpbGUuc2l6ZSAtIG9wdGltaXplZEJsb2Iuc2l6ZTtcclxuICAgICAgY29uc3Qgc2F2ZWRSYXRpbyA9IHNhdmVkQnl0ZXMgLyBNYXRoLm1heChmaWxlLnNpemUsIDEpO1xyXG4gICAgICBpZiAoc2F2ZWRCeXRlcyA8IE1JTl9USUNLRVRfUkVEVUNUSU9OX0JZVEVTIHx8IHNhdmVkUmF0aW8gPCBNSU5fVElDS0VUX1JFRFVDVElPTl9SQVRJTykge1xyXG4gICAgICAgIHJldHVybiBidWlsZE9wdGltaXphdGlvblJlc3VsdCh7XHJcbiAgICAgICAgICBmaWxlLFxyXG4gICAgICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICAgICAgcmVhc29uOiBcInJlZHVjdGlvbi10b28tc21hbGxcIixcclxuICAgICAgICAgIHJlc2l6ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgcmVlbmNvZGVkOiB0cnVlLFxyXG4gICAgICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICAgICAgb3JpZ2luYWxXaWR0aDogd2lkdGgsXHJcbiAgICAgICAgICBvcmlnaW5hbEhlaWdodDogaGVpZ2h0LFxyXG4gICAgICAgICAgb3V0cHV0V2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgb3V0cHV0SGVpZ2h0OiBoZWlnaHQsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBvcHRpbWl6ZWRGaWxlID0gbmV3IEZpbGUoW29wdGltaXplZEJsb2JdLCByZXBsYWNlRmlsZUV4dGVuc2lvbihmaWxlLm5hbWUsIG91dHB1dEV4dGVuc2lvbiksIHtcclxuICAgICAgdHlwZTogb3V0cHV0TWltZVR5cGUsXHJcbiAgICAgIGxhc3RNb2RpZmllZDogZmlsZS5sYXN0TW9kaWZpZWQgfHwgRGF0ZS5ub3coKSxcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGJ1aWxkT3B0aW1pemF0aW9uUmVzdWx0KHtcclxuICAgICAgZmlsZTogb3B0aW1pemVkRmlsZSxcclxuICAgICAgb3JpZ2luYWxGaWxlOiBmaWxlLFxyXG4gICAgICByZWFzb246IFwib3B0aW1pemVkXCIsXHJcbiAgICAgIHJlc2l6ZWQ6IHNob3VsZFJlc2l6ZSxcclxuICAgICAgcmVlbmNvZGVkOiBub3JtYWxpemVkTWltZVR5cGUgIT09IG91dHB1dE1pbWVUeXBlIHx8IGlzTGFyZ2VPcmlnaW5hbCxcclxuICAgICAgZWxhcHNlZE1zOiBEYXRlLm5vdygpIC0gc3RhcnRlZEF0LFxyXG4gICAgICBvcmlnaW5hbFdpZHRoOiB3aWR0aCxcclxuICAgICAgb3JpZ2luYWxIZWlnaHQ6IGhlaWdodCxcclxuICAgICAgb3V0cHV0V2lkdGg6IHJlc2l6ZVBsYW4ud2lkdGgsXHJcbiAgICAgIG91dHB1dEhlaWdodDogcmVzaXplUGxhbi5oZWlnaHQsXHJcbiAgICB9KTtcclxuICB9IGZpbmFsbHkge1xyXG4gICAgbG9hZGVkSW1hZ2UuZGlzcG9zZSgpO1xyXG4gIH1cclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBOEQ7QUFDOUQsdUJBQTZCOzs7QUNEN0IsbUJBQTZGO0FBYTdGLElBQU0sbUNBQW1DO0FBR3pDLElBQU0sc0JBQXNCLENBQUMsWUFBa0M7QUFDN0QsTUFBSSxPQUFPLFdBQVcsWUFBYSxRQUFPO0FBRTFDLFFBQU0sU0FBUyxPQUFPLGlCQUFpQixPQUFPO0FBQzlDLE1BQUksT0FBTyxZQUFZLFVBQVUsT0FBTyxlQUFlLFVBQVU7QUFDL0QsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLE9BQU8sUUFBUSxzQkFBc0I7QUFDM0MsU0FBTyxLQUFLLFFBQVEsS0FBSyxLQUFLLFNBQVM7QUFDekM7QUFHQSxJQUFNLDRCQUE0QixNQUFz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MkJBQVksWUFBcUM7QUFDL0UsUUFBSSxPQUFPLGNBQWMsWUFBYSxRQUFPO0FBQzdDLFVBQU0sZUFBZSxVQUFVO0FBQy9CLFFBQUksQ0FBQyxnQkFBZ0IsT0FBTyxhQUFhLGlCQUFpQixXQUFZLFFBQU87QUFFN0UsUUFBSTtBQUNGLFlBQU0sU0FBUyxNQUFNLGFBQWEsYUFBYTtBQUFBLFFBQzdDLE9BQU8sRUFBRSxZQUFZLGNBQWM7QUFBQSxNQUNyQyxDQUFDO0FBQ0QsYUFBTyxVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVUsTUFBTSxLQUFLLENBQUM7QUFDbEQsYUFBTztBQUFBLElBQ1QsUUFBUTtBQUNOLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsT0FBTyxpQkFBMEM7QUFDL0MsVUFBSSxDQUFDLGFBQWM7QUFDbkIsWUFBTSxVQUFVLE1BQU0sd0JBQXdCO0FBQzlDLFVBQUksWUFBWSxPQUFPO0FBQ3JCLHdCQUFnQixLQUFLLGtEQUFrRCxnQ0FBZ0MsQ0FBQztBQUN4RztBQUFBLE1BQ0Y7QUFDQSwwQkFBb0IsS0FBSztBQUN6QixtQkFBYSxNQUFNO0FBQUEsSUFDckI7QUFBQSxJQUNBLENBQUMsdUJBQXVCO0FBQUEsRUFDMUI7QUFFQSxRQUFNLHdCQUFvQiwyQkFBWSxDQUFDLGlCQUEwQztBQUMvRSxRQUFJLENBQUMsYUFBYztBQUNuQix3QkFBb0IsS0FBSztBQUN6QixpQkFBYSxNQUFNO0FBQUEsRUFDckIsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLGlCQUFhLDJCQUFZLE1BQU07QUFDbkMsNEJBQXdCO0FBQ3hCLDJCQUF1QixVQUFVO0FBQ2pDLGlCQUFhLEVBQUU7QUFDZixvQkFBZ0IsRUFBRTtBQUNsQiw0QkFBd0IsSUFBSTtBQUM1QiwwQkFBc0IsSUFBSTtBQUMxQix5QkFBcUIsVUFBVTtBQUMvQix5QkFBcUIsQ0FBQztBQUFBLEVBQ3hCLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztBQUU1QixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLElBQ3ZCLHlCQUF5Qix5QkFBeUI7QUFBQSxJQUNsRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJhdHRlbXB0SWQiXQp9Cg==
