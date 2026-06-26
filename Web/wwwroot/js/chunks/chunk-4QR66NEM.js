import {
  fetchExpenseSheetTicketPreviewBlob,
  safeText
} from "./chunk-L5GTS5QB.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-63VW7TTG.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/tickets/detail/expenseTicketPreviewUtils.ts
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set(["jpg", "jpeg", "png", "webp", "gif", "bmp", "heic", "heif", "avif"]);
var getFileExtensionFromPath = (value) => {
  const source = safeText(value).toLowerCase();
  if (!source) return "";
  const withoutQuery = source.split("?")[0].split("#")[0];
  const parts = withoutQuery.split(".");
  if (parts.length < 2) return "";
  const rawExt = safeText(parts[parts.length - 1]).replace(/[^a-z0-9]/g, "");
  return rawExt === "jpeg" ? "jpg" : rawExt;
};
var hasExpenseTicketImagePreviewSource = (urlValue) => {
  const normalizedUrl = safeText(urlValue);
  if (!normalizedUrl) return false;
  if (normalizedUrl.toLowerCase().startsWith("data:image/")) return true;
  const extension = getFileExtensionFromPath(normalizedUrl);
  if (extension && IMAGE_EXTENSIONS.has(extension)) return true;
  const normalizedLower = normalizedUrl.toLowerCase();
  if (normalizedLower.includes("blob.core.windows.net") && normalizedLower.includes("image")) return true;
  return false;
};

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketPreviewModal.tsx
var import_react_dom = __toESM(require_react_dom());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var ExpenseTicketPreviewModal = ({
  open,
  busy,
  error,
  imageUrl,
  imageAlt,
  scale,
  translate,
  surfaceRef,
  onClose,
  onPointerDown,
  onPointerMove,
  onPointerEnd,
  onWheel
}) => {
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center overscroll-contain bg-slate-950/45 px-4 py-6 backdrop-blur-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          "aria-label": indT("Common_Close", "Close"),
          className: "absolute inset-0",
          onClick: onClose
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "button",
        {
          type: "button",
          "aria-label": indT("Common_Close", "Close"),
          className: "fixed right-4 top-[calc(1rem+env(safe-area-inset-top,0px))] z-[600020] inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-xl)] border border-slate-200/60 bg-slate-900/78 text-slate-100 shadow-lg transition hover:bg-slate-900/88 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-200/80",
          onClick: onClose,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              d: "M6 6L18 18M18 6L6 18",
              stroke: "currentColor",
              strokeWidth: "1.75",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative flex max-h-[92vh] max-w-[92vw] items-center justify-center overscroll-contain", children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-100", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
        indT("Common_Loading", "Loading")
      ] }) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-rose-200", children: error }) : imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          ref: surfaceRef,
          className: "relative max-h-[90vh] max-w-[92vw] overflow-hidden rounded-[var(--radius-xl)] touch-none overscroll-contain",
          role: "presentation",
          style: { touchAction: "none" },
          onPointerDown,
          onPointerMove,
          onPointerUp: onPointerEnd,
          onPointerCancel: onPointerEnd,
          onWheel,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "img",
            {
              src: imageUrl,
              alt: imageAlt || indT("Tickets_Field_FileId", "Ticket"),
              className: "pointer-events-none max-h-[90vh] w-auto max-w-[92vw] select-none rounded-[var(--radius-xl)] object-contain shadow-2xl",
              style: {
                transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
                transformOrigin: "center center",
                transition: scale <= 1 ? "transform 140ms ease-out" : "none"
              },
              draggable: false
            }
          )
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-slate-100", children: indT("Common_NotAvailable", "N/A") }) })
    ] }),
    document.body
  );
};
var ExpenseTicketPreviewModal_default = ExpenseTicketPreviewModal;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/ExpenseTicketStickyPreview.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ExpenseTicketStickyPreview = ({
  busy,
  error,
  imageUrl,
  imageAlt,
  fileName,
  onOpen
}) => {
  const previewLabel = indT("Tickets_Detail_ViewAttachment", "Ver adjunto");
  const ticketLabel = indT("Tickets_Field_FileId", "Ticket");
  const safeFileName = safeText(fileName) || safeText(imageAlt) || ticketLabel;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "sticky top-[72px] z-[1800] lg:top-20", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "button",
    {
      type: "button",
      className: "group block w-full touch-manipulation text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2",
      "aria-label": `${previewLabel}: ${safeFileName}`,
      onClick: onOpen,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white shadow-xs transition-[transform,box-shadow,border-color] duration-200 group-hover:-translate-y-[1px] group-hover:border-primary/25 group-hover:shadow-md", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative h-36 overflow-hidden bg-linear-to-br from-slate-100 via-white to-slate-200 sm:h-40 lg:h-[380px]", children: [
        imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "img",
          {
            src: imageUrl,
            alt: imageAlt || ticketLabel,
            width: 640,
            height: 960,
            className: "h-full w-full rounded-[var(--radius-xl)] object-cover object-center transition-transform duration-300 group-hover:scale-[1.015] lg:object-contain lg:object-center lg:p-3"
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex h-full items-center justify-center px-4", children: busy ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-2 text-sm text-slate-700", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("Common_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("Common_Loading", "Loading")
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex min-w-0 items-center gap-3 text-slate-700", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-xl)] bg-primary/8 text-primary", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { className: "h-5 w-5", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "path",
              {
                d: "M7 3.75h6.25L18.25 8.75V19.5a.75.75 0 0 1-.75.75H7a.75.75 0 0 1-.75-.75v-15A.75.75 0 0 1 7 3.75Z",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "path",
              {
                d: "M13 3.75V8.5h4.75",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }
            )
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "min-w-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "truncate text-sm font-semibold text-slate-900", children: safeFileName }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "line-clamp-2 text-xs text-slate-500", children: error || previewLabel })
          ] })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-slate-950/26 via-slate-900/8 to-transparent lg:h-20" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-[var(--radius-xl)] bg-primary/92 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { className: "h-3.5 w-3.5", viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              d: "M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          ) }),
          previewLabel
        ] })
      ] }) })
    }
  ) });
};
var ExpenseTicketStickyPreview_default = ExpenseTicketStickyPreview;

// Web/wwwroot/react/src/pages/gastos/tickets/detail/useExpenseTicketImagePreview.ts
var import_react = __toESM(require_react());
var PREVIEW_MAX_SCALE = 4;
var PREVIEW_SCALE_STEP = 0.25;
var clampPreviewScale = (value) => {
  if (!Number.isFinite(value)) return 1;
  return Math.min(PREVIEW_MAX_SCALE, Math.max(1, value));
};
var getPreviewPointDistance = (left, right) => {
  const deltaX = right.x - left.x;
  const deltaY = right.y - left.y;
  return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
};
var getPreviewPointCenter = (left, right) => ({
  x: (left.x + right.x) / 2,
  y: (left.y + right.y) / 2
});
var useExpenseTicketImagePreview = ({ fileId, sourceUrl, enabled = true }) => {
  const [previewOpen, setPreviewOpen] = (0, import_react.useState)(false);
  const [previewBusy, setPreviewBusy] = (0, import_react.useState)(false);
  const [previewError, setPreviewError] = (0, import_react.useState)("");
  const [previewImageUrl, setPreviewImageUrl] = (0, import_react.useState)("");
  const [previewScale, setPreviewScale] = (0, import_react.useState)(1);
  const [previewTranslate, setPreviewTranslate] = (0, import_react.useState)({ x: 0, y: 0 });
  const previewScaleRef = (0, import_react.useRef)(1);
  const previewImageUrlRef = (0, import_react.useRef)("");
  const previewRequestKeyRef = (0, import_react.useRef)("");
  const previewLoadPromiseRef = (0, import_react.useRef)(null);
  const previewSurfaceRef = (0, import_react.useRef)(null);
  const previewTranslateRef = (0, import_react.useRef)({ x: 0, y: 0 });
  const previewPointersRef = (0, import_react.useRef)(/* @__PURE__ */ new Map());
  const previewPanPointerRef = (0, import_react.useRef)(null);
  const previewPanLastPointRef = (0, import_react.useRef)(null);
  const previewPinchSnapshotRef = (0, import_react.useRef)(null);
  const applyPreviewTransform = (0, import_react.useCallback)((nextScale, nextTranslate) => {
    const normalizedScale = clampPreviewScale(nextScale);
    const normalizedTranslate = normalizedScale <= 1 ? { x: 0, y: 0 } : nextTranslate;
    previewScaleRef.current = normalizedScale;
    previewTranslateRef.current = normalizedTranslate;
    setPreviewScale(normalizedScale);
    setPreviewTranslate(normalizedTranslate);
  }, []);
  const resetPreviewGesture = (0, import_react.useCallback)(() => {
    previewPointersRef.current.clear();
    previewPanPointerRef.current = null;
    previewPanLastPointRef.current = null;
    previewPinchSnapshotRef.current = null;
    applyPreviewTransform(1, { x: 0, y: 0 });
  }, [applyPreviewTransform]);
  const rebuildPinchSnapshot = (0, import_react.useCallback)(() => {
    const pointerPoints = Array.from(previewPointersRef.current.values());
    if (pointerPoints.length < 2) {
      previewPinchSnapshotRef.current = null;
      return;
    }
    const [left, right] = pointerPoints;
    previewPinchSnapshotRef.current = {
      distance: Math.max(1, getPreviewPointDistance(left, right)),
      scale: previewScaleRef.current,
      center: getPreviewPointCenter(left, right),
      translate: previewTranslateRef.current
    };
  }, []);
  const replacePreviewImageUrl = (0, import_react.useCallback)((nextUrl) => {
    setPreviewImageUrl((previous) => {
      if (previous && previous !== nextUrl) {
        URL.revokeObjectURL(previous);
      }
      previewImageUrlRef.current = nextUrl;
      return nextUrl;
    });
  }, []);
  const clearPreviewImage = (0, import_react.useCallback)(() => {
    previewLoadPromiseRef.current = null;
    setPreviewImageUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      previewImageUrlRef.current = "";
      return "";
    });
  }, []);
  const loadPreviewImage = (0, import_react.useCallback)(async () => {
    const currentFileId = safeText(fileId);
    const currentUrl = safeText(sourceUrl);
    if (!enabled || !currentFileId || !currentUrl) {
      setPreviewBusy(false);
      setPreviewError("");
      return "";
    }
    if (previewImageUrlRef.current) {
      return previewImageUrlRef.current;
    }
    if (previewLoadPromiseRef.current) {
      return previewLoadPromiseRef.current;
    }
    const requestKey = `${currentFileId}__${currentUrl}`;
    previewRequestKeyRef.current = requestKey;
    setPreviewBusy(true);
    setPreviewError("");
    const nextPromise = (async () => {
      try {
        const blob = await fetchExpenseSheetTicketPreviewBlob(currentFileId, currentUrl, {
          suppressPermissionModal: true
        });
        const objectUrl = URL.createObjectURL(blob);
        if (previewRequestKeyRef.current !== requestKey) {
          URL.revokeObjectURL(objectUrl);
          return "";
        }
        replacePreviewImageUrl(objectUrl);
        return objectUrl;
      } catch (error) {
        if (previewRequestKeyRef.current === requestKey) {
          setPreviewError(error instanceof Error ? error.message : indT("Api_RequestFailed", "Request failed."));
        }
        return "";
      } finally {
        if (previewRequestKeyRef.current === requestKey) {
          setPreviewBusy(false);
        }
        previewLoadPromiseRef.current = null;
      }
    })();
    previewLoadPromiseRef.current = nextPromise;
    return nextPromise;
  }, [enabled, fileId, replacePreviewImageUrl, sourceUrl]);
  const closePreview = (0, import_react.useCallback)(() => {
    setPreviewOpen(false);
    setPreviewBusy(false);
    setPreviewError("");
    resetPreviewGesture();
  }, [resetPreviewGesture]);
  (0, import_react.useEffect)(() => {
    return () => {
      clearPreviewImage();
    };
  }, [clearPreviewImage]);
  (0, import_react.useEffect)(() => {
    previewRequestKeyRef.current = `${safeText(fileId)}__${safeText(sourceUrl)}`;
    setPreviewOpen(false);
    setPreviewBusy(false);
    setPreviewError("");
    resetPreviewGesture();
    clearPreviewImage();
    if (enabled && safeText(fileId) && safeText(sourceUrl)) {
      void loadPreviewImage();
    }
  }, [clearPreviewImage, enabled, fileId, loadPreviewImage, resetPreviewGesture, sourceUrl]);
  (0, import_react.useEffect)(() => {
    if (!previewOpen) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closePreview();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewOpen, closePreview]);
  (0, import_react.useEffect)(() => {
    if (!previewOpen) return;
    const surface = previewSurfaceRef.current;
    if (!surface) return;
    const preventGestureDefault = (event) => {
      event.preventDefault();
    };
    const preventTouchViewportZoom = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };
    const preventCtrlWheelViewportZoom = (event) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };
    surface.addEventListener("gesturestart", preventGestureDefault, { passive: false });
    surface.addEventListener("gesturechange", preventGestureDefault, { passive: false });
    surface.addEventListener("gestureend", preventGestureDefault, { passive: false });
    surface.addEventListener("touchmove", preventTouchViewportZoom, { passive: false });
    surface.addEventListener("wheel", preventCtrlWheelViewportZoom, { passive: false });
    return () => {
      surface.removeEventListener("gesturestart", preventGestureDefault);
      surface.removeEventListener("gesturechange", preventGestureDefault);
      surface.removeEventListener("gestureend", preventGestureDefault);
      surface.removeEventListener("touchmove", preventTouchViewportZoom);
      surface.removeEventListener("wheel", preventCtrlWheelViewportZoom);
    };
  }, [previewOpen]);
  const handlePreviewPointerDown = (0, import_react.useCallback)(
    (event) => {
      if (!previewImageUrl || previewBusy) return;
      const point = { x: event.clientX, y: event.clientY };
      previewPointersRef.current.set(event.pointerId, point);
      if (typeof event.currentTarget.setPointerCapture === "function") {
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
        }
      }
      if (previewPointersRef.current.size === 1) {
        previewPanPointerRef.current = event.pointerId;
        previewPanLastPointRef.current = point;
        previewPinchSnapshotRef.current = null;
        return;
      }
      previewPanPointerRef.current = null;
      previewPanLastPointRef.current = null;
      rebuildPinchSnapshot();
    },
    [previewBusy, previewImageUrl, rebuildPinchSnapshot]
  );
  const handlePreviewPointerMove = (0, import_react.useCallback)(
    (event) => {
      if (!previewPointersRef.current.has(event.pointerId)) return;
      event.preventDefault();
      const point = { x: event.clientX, y: event.clientY };
      previewPointersRef.current.set(event.pointerId, point);
      const pointerEntries = Array.from(previewPointersRef.current.entries());
      const pointerPoints = pointerEntries.map((entry) => entry[1]);
      if (pointerPoints.length >= 2) {
        if (!previewPinchSnapshotRef.current) {
          rebuildPinchSnapshot();
        }
        const snapshot = previewPinchSnapshotRef.current;
        if (!snapshot) return;
        const [left, right] = pointerPoints;
        const distance = Math.max(1, getPreviewPointDistance(left, right));
        const ratio = distance / Math.max(1, snapshot.distance);
        const nextScale = clampPreviewScale(snapshot.scale * ratio);
        const center = getPreviewPointCenter(left, right);
        const nextTranslate2 = {
          x: snapshot.translate.x + (center.x - snapshot.center.x),
          y: snapshot.translate.y + (center.y - snapshot.center.y)
        };
        applyPreviewTransform(nextScale, nextTranslate2);
        return;
      }
      if (pointerPoints.length !== 1 || previewScaleRef.current <= 1 || previewPanPointerRef.current !== event.pointerId) {
        return;
      }
      const lastPoint = previewPanLastPointRef.current;
      previewPanLastPointRef.current = point;
      if (!lastPoint) return;
      const nextTranslate = {
        x: previewTranslateRef.current.x + (point.x - lastPoint.x),
        y: previewTranslateRef.current.y + (point.y - lastPoint.y)
      };
      applyPreviewTransform(previewScaleRef.current, nextTranslate);
    },
    [applyPreviewTransform, rebuildPinchSnapshot]
  );
  const handlePreviewPointerEnd = (0, import_react.useCallback)(
    (event) => {
      if (!previewPointersRef.current.has(event.pointerId)) return;
      previewPointersRef.current.delete(event.pointerId);
      if (typeof event.currentTarget.hasPointerCapture === "function" && event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      const pointerEntries = Array.from(previewPointersRef.current.entries());
      if (pointerEntries.length >= 2) {
        previewPanPointerRef.current = null;
        previewPanLastPointRef.current = null;
        rebuildPinchSnapshot();
        return;
      }
      if (pointerEntries.length === 1) {
        const [pointerId, pointerPoint] = pointerEntries[0];
        previewPanPointerRef.current = pointerId;
        previewPanLastPointRef.current = pointerPoint;
        previewPinchSnapshotRef.current = null;
        return;
      }
      previewPanPointerRef.current = null;
      previewPanLastPointRef.current = null;
      previewPinchSnapshotRef.current = null;
      if (previewScaleRef.current <= 1) {
        applyPreviewTransform(1, { x: 0, y: 0 });
      }
    },
    [applyPreviewTransform, rebuildPinchSnapshot]
  );
  const handlePreviewWheel = (0, import_react.useCallback)(
    (event) => {
      if (!previewImageUrl || previewBusy) return;
      event.preventDefault();
      const direction = event.deltaY < 0 ? 1 : -1;
      const nextScale = clampPreviewScale(previewScaleRef.current + direction * PREVIEW_SCALE_STEP);
      applyPreviewTransform(nextScale, previewTranslateRef.current);
    },
    [applyPreviewTransform, previewBusy, previewImageUrl]
  );
  const openPreview = (0, import_react.useCallback)(async () => {
    const currentFileId = safeText(fileId);
    const currentUrl = safeText(sourceUrl);
    if (!enabled || !currentFileId || !currentUrl) return;
    resetPreviewGesture();
    setPreviewOpen(true);
    setPreviewError("");
    await loadPreviewImage();
  }, [enabled, fileId, loadPreviewImage, resetPreviewGesture, sourceUrl]);
  return {
    previewOpen,
    previewBusy,
    previewError,
    previewImageUrl,
    previewScale,
    previewTranslate,
    previewSurfaceRef,
    openPreview,
    closePreview,
    handlePreviewPointerDown,
    handlePreviewPointerMove,
    handlePreviewPointerEnd,
    handlePreviewWheel
  };
};

export {
  hasExpenseTicketImagePreviewSource,
  ExpenseTicketPreviewModal_default,
  ExpenseTicketStickyPreview_default,
  useExpenseTicketImagePreview
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxuY29uc3QgSU1BR0VfRVhURU5TSU9OUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJqcGdcIiwgXCJqcGVnXCIsIFwicG5nXCIsIFwid2VicFwiLCBcImdpZlwiLCBcImJtcFwiLCBcImhlaWNcIiwgXCJoZWlmXCIsIFwiYXZpZlwiXSk7XHJcblxyXG5jb25zdCBnZXRGaWxlRXh0ZW5zaW9uRnJvbVBhdGggPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFzb3VyY2UpIHJldHVybiBcIlwiO1xyXG5cclxuICBjb25zdCB3aXRob3V0UXVlcnkgPSBzb3VyY2Uuc3BsaXQoXCI/XCIpWzBdLnNwbGl0KFwiI1wiKVswXTtcclxuICBjb25zdCBwYXJ0cyA9IHdpdGhvdXRRdWVyeS5zcGxpdChcIi5cIik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCA8IDIpIHJldHVybiBcIlwiO1xyXG5cclxuICBjb25zdCByYXdFeHQgPSBzYWZlVGV4dChwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSkucmVwbGFjZSgvW15hLXowLTldL2csIFwiXCIpO1xyXG4gIHJldHVybiByYXdFeHQgPT09IFwianBlZ1wiID8gXCJqcGdcIiA6IHJhd0V4dDtcclxufTtcclxuXHJcbi8vIERldGVjdHMgd2hldGhlciBvbmUgdGlja2V0IHNvdXJjZSBjYW4gcmVuZGVyIGFzIGFuIGlubGluZSBpbWFnZSBwcmV2aWV3LlxyXG5leHBvcnQgY29uc3QgaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZSA9ICh1cmxWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFVybCA9IHNhZmVUZXh0KHVybFZhbHVlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRVcmwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKG5vcm1hbGl6ZWRVcmwudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKFwiZGF0YTppbWFnZS9cIikpIHJldHVybiB0cnVlO1xyXG5cclxuICBjb25zdCBleHRlbnNpb24gPSBnZXRGaWxlRXh0ZW5zaW9uRnJvbVBhdGgobm9ybWFsaXplZFVybCk7XHJcbiAgaWYgKGV4dGVuc2lvbiAmJiBJTUFHRV9FWFRFTlNJT05TLmhhcyhleHRlbnNpb24pKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplZExvd2VyID0gbm9ybWFsaXplZFVybC50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmIChub3JtYWxpemVkTG93ZXIuaW5jbHVkZXMoXCJibG9iLmNvcmUud2luZG93cy5uZXRcIikgJiYgbm9ybWFsaXplZExvd2VyLmluY2x1ZGVzKFwiaW1hZ2VcIikpIHJldHVybiB0cnVlO1xyXG5cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgVGlja2V0UHJldmlld1BvaW50IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsUHJvcHMgPSB7XHJcbiAgb3BlbjogYm9vbGVhbjtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGVycm9yOiBzdHJpbmc7XHJcbiAgaW1hZ2VVcmw6IHN0cmluZztcclxuICBpbWFnZUFsdDogc3RyaW5nO1xyXG4gIHNjYWxlOiBudW1iZXI7XHJcbiAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XHJcbiAgc3VyZmFjZVJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcclxuICBvblBvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgb25Qb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uUG9pbnRlckVuZDogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uV2hlZWw6IChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHRoZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBvdmVybGF5IHdpdGggem9vbSBhbmQgcGFuIGdlc3R1cmVzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsID0gKHtcclxuICBvcGVuLFxyXG4gIGJ1c3ksXHJcbiAgZXJyb3IsXHJcbiAgaW1hZ2VVcmwsXHJcbiAgaW1hZ2VBbHQsXHJcbiAgc2NhbGUsXHJcbiAgdHJhbnNsYXRlLFxyXG4gIHN1cmZhY2VSZWYsXHJcbiAgb25DbG9zZSxcclxuICBvblBvaW50ZXJEb3duLFxyXG4gIG9uUG9pbnRlck1vdmUsXHJcbiAgb25Qb2ludGVyRW5kLFxyXG4gIG9uV2hlZWwsXHJcbn06IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxQcm9wcykgPT4ge1xyXG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiBjcmVhdGVQb3J0YWwoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcnNjcm9sbC1jb250YWluIGJnLXNsYXRlLTk1MC80NSBweC00IHB5LTYgYmFja2Ryb3AtYmx1ci1tZFwiPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTBcIlxyXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0Nsb3NlXCIsIFwiQ2xvc2VcIil9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgcmlnaHQtNCB0b3AtW2NhbGMoMXJlbStlbnYoc2FmZS1hcmVhLWluc2V0LXRvcCwwcHgpKV0gei1bNjAwMDIwXSBpbmxpbmUtZmxleCBoLTEwIHctMTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzYwIGJnLXNsYXRlLTkwMC83OCB0ZXh0LXNsYXRlLTEwMCBzaGFkb3ctbGcgdHJhbnNpdGlvbiBob3ZlcjpiZy1zbGF0ZS05MDAvODggZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWhpZGRlbiBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctc2xhdGUtMjAwLzgwXCJcclxuICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICBkPVwiTTYgNkwxOCAxOE0xOCA2TDYgMThcIlxyXG4gICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNzVcIlxyXG4gICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG5cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IG1heC1oLVs5MnZoXSBtYXgtdy1bOTJ2d10gaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG92ZXJzY3JvbGwtY29udGFpblwiPlxyXG4gICAgICAgIHtidXN5ID8gKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtMTAwXCI+XHJcbiAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICB7aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBlcnJvciA/IChcclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc20gdGV4dC1yb3NlLTIwMFwiPntlcnJvcn08L3A+XHJcbiAgICAgICAgKSA6IGltYWdlVXJsID8gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICByZWY9e3N1cmZhY2VSZWZ9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIG1heC1oLVs5MHZoXSBtYXgtdy1bOTJ2d10gb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIHRvdWNoLW5vbmUgb3ZlcnNjcm9sbC1jb250YWluXCJcclxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXHJcbiAgICAgICAgICAgIHN0eWxlPXt7IHRvdWNoQWN0aW9uOiBcIm5vbmVcIiB9fVxyXG4gICAgICAgICAgICBvblBvaW50ZXJEb3duPXtvblBvaW50ZXJEb3dufVxyXG4gICAgICAgICAgICBvblBvaW50ZXJNb3ZlPXtvblBvaW50ZXJNb3ZlfVxyXG4gICAgICAgICAgICBvblBvaW50ZXJVcD17b25Qb2ludGVyRW5kfVxyXG4gICAgICAgICAgICBvblBvaW50ZXJDYW5jZWw9e29uUG9pbnRlckVuZH1cclxuICAgICAgICAgICAgb25XaGVlbD17b25XaGVlbH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgYWx0PXtpbWFnZUFsdCB8fCBpbmRUKFwiVGlja2V0c19GaWVsZF9GaWxlSWRcIiwgXCJUaWNrZXRcIil9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBtYXgtaC1bOTB2aF0gdy1hdXRvIG1heC13LVs5MnZ3XSBzZWxlY3Qtbm9uZSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBvYmplY3QtY29udGFpbiBzaGFkb3ctMnhsXCJcclxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGUueH1weCwgJHt0cmFuc2xhdGUueX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pYCxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCJjZW50ZXIgY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBzY2FsZSA8PSAxID8gXCJ0cmFuc2Zvcm0gMTQwbXMgZWFzZS1vdXRcIiA6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlPXtmYWxzZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtMTAwXCI+e2luZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpfTwvcD5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PixcclxuICAgIGRvY3VtZW50LmJvZHlcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbDtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3UHJvcHMgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBlcnJvcjogc3RyaW5nO1xyXG4gIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgaW1hZ2VBbHQ6IHN0cmluZztcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG4gIG9uT3BlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgb25lIGNvbXBhY3QgdGlja2V0IHByZXZpZXcgdGhhdCBzdGF5cyB2aXNpYmxlIHdoaWxlIGRldGFpbCBjb250ZW50IHNjcm9sbHMuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3ID0gKHtcclxuICBidXN5LFxyXG4gIGVycm9yLFxyXG4gIGltYWdlVXJsLFxyXG4gIGltYWdlQWx0LFxyXG4gIGZpbGVOYW1lLFxyXG4gIG9uT3BlbixcclxufTogRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXdQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHByZXZpZXdMYWJlbCA9IGluZFQoXCJUaWNrZXRzX0RldGFpbF9WaWV3QXR0YWNobWVudFwiLCBcIlZlciBhZGp1bnRvXCIpO1xyXG4gIGNvbnN0IHRpY2tldExhYmVsID0gaW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpO1xyXG4gIGNvbnN0IHNhZmVGaWxlTmFtZSA9IHNhZmVUZXh0KGZpbGVOYW1lKSB8fCBzYWZlVGV4dChpbWFnZUFsdCkgfHwgdGlja2V0TGFiZWw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInN0aWNreSB0b3AtWzcycHhdIHotWzE4MDBdIGxnOnRvcC0yMFwiPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgYmxvY2sgdy1mdWxsIHRvdWNoLW1hbmlwdWxhdGlvbiB0ZXh0LWxlZnQgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWhpZGRlbiBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zNSBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTJcIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake3ByZXZpZXdMYWJlbH06ICR7c2FmZUZpbGVOYW1lfWB9XHJcbiAgICAgICAgb25DbGljaz17b25PcGVufVxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgc2hhZG93LXhzIHRyYW5zaXRpb24tW3RyYW5zZm9ybSxib3gtc2hhZG93LGJvcmRlci1jb2xvcl0gZHVyYXRpb24tMjAwIGdyb3VwLWhvdmVyOi10cmFuc2xhdGUteS1bMXB4XSBncm91cC1ob3Zlcjpib3JkZXItcHJpbWFyeS8yNSBncm91cC1ob3ZlcjpzaGFkb3ctbWRcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgaC0zNiBvdmVyZmxvdy1oaWRkZW4gYmctbGluZWFyLXRvLWJyIGZyb20tc2xhdGUtMTAwIHZpYS13aGl0ZSB0by1zbGF0ZS0yMDAgc206aC00MCBsZzpoLVszODBweF1cIj5cclxuICAgICAgICAgICAge2ltYWdlVXJsID8gKFxyXG4gICAgICAgICAgICAgIDxpbWdcclxuICAgICAgICAgICAgICAgIHNyYz17aW1hZ2VVcmx9XHJcbiAgICAgICAgICAgICAgICBhbHQ9e2ltYWdlQWx0IHx8IHRpY2tldExhYmVsfVxyXG4gICAgICAgICAgICAgICAgd2lkdGg9ezY0MH1cclxuICAgICAgICAgICAgICAgIGhlaWdodD17OTYwfVxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIHctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBvYmplY3QtY292ZXIgb2JqZWN0LWNlbnRlciB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0zMDAgZ3JvdXAtaG92ZXI6c2NhbGUtWzEuMDE1XSBsZzpvYmplY3QtY29udGFpbiBsZzpvYmplY3QtY2VudGVyIGxnOnAtM1wiXHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaC1mdWxsIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBweC00XCI+XHJcbiAgICAgICAgICAgICAgICB7YnVzeSA/IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtc2xhdGUtNzAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfT5cclxuICAgICAgICAgICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICAgIHtpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBtaW4tdy0wIGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNsYXRlLTcwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBoLTExIHctMTEgc2hyaW5rLTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXByaW1hcnkvOCB0ZXh0LXByaW1hcnlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNNyAzLjc1aDYuMjVMMTguMjUgOC43NVYxOS41YS43NS43NSAwIDAgMS0uNzUuNzVIN2EuNzUuNzUgMCAwIDEtLjc1LS43NXYtMTVBLjc1Ljc1IDAgMCAxIDcgMy43NVpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMyAzLjc1VjguNWg0Ljc1XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS41XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0cnVuY2F0ZSB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj57c2FmZUZpbGVOYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxpbmUtY2xhbXAtMiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2Vycm9yIHx8IHByZXZpZXdMYWJlbH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC14LTAgdG9wLTAgaC0xNiBiZy1saW5lYXItdG8tYiBmcm9tLXNsYXRlLTk1MC8yNiB2aWEtc2xhdGUtOTAwLzggdG8tdHJhbnNwYXJlbnQgbGc6aC0yMFwiIC8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSByaWdodC0zIHRvcC0zIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBiZy1wcmltYXJ5LzkyIHB4LTMgcHktMS41IHRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBzaGFkb3ctc21cIj5cclxuICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImgtMy41IHctMy41XCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICBkPVwiTTE1IDNoNnY2TTIxIDNsLTcgN005IDIxSDN2LTZNMyAyMWw3LTdcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjEuNVwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICB7cHJldmlld0xhYmVsfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldztcclxuIiwgIlx1RkVGRmltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHR5cGUgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VBcGkudHNcIjtcclxuaW1wb3J0IHsgc2FmZVRleHQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZXhwZW5zZVVpVXRpbHMudHNcIjtcclxuXHJcbmNvbnN0IFBSRVZJRVdfTUFYX1NDQUxFID0gNDtcclxuY29uc3QgUFJFVklFV19TQ0FMRV9TVEVQID0gMC4yNTtcclxuXHJcbmV4cG9ydCB0eXBlIFRpY2tldFByZXZpZXdQb2ludCA9IHtcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBVc2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3QXJncyA9IHtcclxuICBmaWxlSWQ6IHN0cmluZztcclxuICBzb3VyY2VVcmw6IHN0cmluZztcclxuICBlbmFibGVkPzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IGNsYW1wUHJldmlld1NjYWxlID0gKHZhbHVlOiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gIGlmICghTnVtYmVyLmlzRmluaXRlKHZhbHVlKSkgcmV0dXJuIDE7XHJcbiAgcmV0dXJuIE1hdGgubWluKFBSRVZJRVdfTUFYX1NDQUxFLCBNYXRoLm1heCgxLCB2YWx1ZSkpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJldmlld1BvaW50RGlzdGFuY2UgPSAobGVmdDogVGlja2V0UHJldmlld1BvaW50LCByaWdodDogVGlja2V0UHJldmlld1BvaW50KTogbnVtYmVyID0+IHtcclxuICBjb25zdCBkZWx0YVggPSByaWdodC54IC0gbGVmdC54O1xyXG4gIGNvbnN0IGRlbHRhWSA9IHJpZ2h0LnkgLSBsZWZ0Lnk7XHJcbiAgcmV0dXJuIE1hdGguc3FydChkZWx0YVggKiBkZWx0YVggKyBkZWx0YVkgKiBkZWx0YVkpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UHJldmlld1BvaW50Q2VudGVyID0gKGxlZnQ6IFRpY2tldFByZXZpZXdQb2ludCwgcmlnaHQ6IFRpY2tldFByZXZpZXdQb2ludCk6IFRpY2tldFByZXZpZXdQb2ludCA9PiAoe1xyXG4gIHg6IChsZWZ0LnggKyByaWdodC54KSAvIDIsXHJcbiAgeTogKGxlZnQueSArIHJpZ2h0LnkpIC8gMixcclxufSk7XHJcblxyXG4vLyBNYW5hZ2VzIHRpY2tldCBpbWFnZSBwcmV2aWV3IHN0YXRlIGFuZCB6b29tL3BhbiBnZXN0dXJlcy5cclxuZXhwb3J0IGNvbnN0IHVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXcgPSAoeyBmaWxlSWQsIHNvdXJjZVVybCwgZW5hYmxlZCA9IHRydWUgfTogVXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlld0FyZ3MpID0+IHtcclxuICBjb25zdCBbcHJldmlld09wZW4sIHNldFByZXZpZXdPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcHJldmlld0J1c3ksIHNldFByZXZpZXdCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbcHJldmlld0Vycm9yLCBzZXRQcmV2aWV3RXJyb3JdID0gdXNlU3RhdGUoXCJcIik7XHJcbiAgY29uc3QgW3ByZXZpZXdJbWFnZVVybCwgc2V0UHJldmlld0ltYWdlVXJsXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtwcmV2aWV3U2NhbGUsIHNldFByZXZpZXdTY2FsZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbcHJldmlld1RyYW5zbGF0ZSwgc2V0UHJldmlld1RyYW5zbGF0ZV0gPSB1c2VTdGF0ZTxUaWNrZXRQcmV2aWV3UG9pbnQ+KHsgeDogMCwgeTogMCB9KTtcclxuXHJcbiAgY29uc3QgcHJldmlld1NjYWxlUmVmID0gdXNlUmVmKDEpO1xyXG4gIGNvbnN0IHByZXZpZXdJbWFnZVVybFJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBwcmV2aWV3UmVxdWVzdEtleVJlZiA9IHVzZVJlZihcIlwiKTtcclxuICBjb25zdCBwcmV2aWV3TG9hZFByb21pc2VSZWYgPSB1c2VSZWY8UHJvbWlzZTxzdHJpbmc+IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJldmlld1N1cmZhY2VSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwcmV2aWV3VHJhbnNsYXRlUmVmID0gdXNlUmVmPFRpY2tldFByZXZpZXdQb2ludD4oeyB4OiAwLCB5OiAwIH0pO1xyXG4gIGNvbnN0IHByZXZpZXdQb2ludGVyc1JlZiA9IHVzZVJlZjxNYXA8bnVtYmVyLCBUaWNrZXRQcmV2aWV3UG9pbnQ+PihuZXcgTWFwKCkpO1xyXG4gIGNvbnN0IHByZXZpZXdQYW5Qb2ludGVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByZXZpZXdQYW5MYXN0UG9pbnRSZWYgPSB1c2VSZWY8VGlja2V0UHJldmlld1BvaW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJldmlld1BpbmNoU25hcHNob3RSZWYgPSB1c2VSZWY8e1xyXG4gICAgZGlzdGFuY2U6IG51bWJlcjtcclxuICAgIHNjYWxlOiBudW1iZXI7XHJcbiAgICBjZW50ZXI6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICAgIHRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50O1xyXG4gIH0gfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgYXBwbHlQcmV2aWV3VHJhbnNmb3JtID0gdXNlQ2FsbGJhY2soKG5leHRTY2FsZTogbnVtYmVyLCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQpID0+IHtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRTY2FsZSA9IGNsYW1wUHJldmlld1NjYWxlKG5leHRTY2FsZSk7XHJcbiAgICBjb25zdCBub3JtYWxpemVkVHJhbnNsYXRlID0gbm9ybWFsaXplZFNjYWxlIDw9IDEgPyB7IHg6IDAsIHk6IDAgfSA6IG5leHRUcmFuc2xhdGU7XHJcblxyXG4gICAgcHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPSBub3JtYWxpemVkU2NhbGU7XHJcbiAgICBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQgPSBub3JtYWxpemVkVHJhbnNsYXRlO1xyXG4gICAgc2V0UHJldmlld1NjYWxlKG5vcm1hbGl6ZWRTY2FsZSk7XHJcbiAgICBzZXRQcmV2aWV3VHJhbnNsYXRlKG5vcm1hbGl6ZWRUcmFuc2xhdGUpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVzZXRQcmV2aWV3R2VzdHVyZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmNsZWFyKCk7XHJcbiAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybSgxLCB7IHg6IDAsIHk6IDAgfSk7XHJcbiAgfSwgW2FwcGx5UHJldmlld1RyYW5zZm9ybV0pO1xyXG5cclxuICBjb25zdCByZWJ1aWxkUGluY2hTbmFwc2hvdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHBvaW50ZXJQb2ludHMgPSBBcnJheS5mcm9tKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnZhbHVlcygpKTtcclxuICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCA8IDIpIHtcclxuICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBbbGVmdCwgcmlnaHRdID0gcG9pbnRlclBvaW50cztcclxuICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XHJcbiAgICAgIGRpc3RhbmNlOiBNYXRoLm1heCgxLCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZShsZWZ0LCByaWdodCkpLFxyXG4gICAgICBzY2FsZTogcHJldmlld1NjYWxlUmVmLmN1cnJlbnQsXHJcbiAgICAgIGNlbnRlcjogZ2V0UHJldmlld1BvaW50Q2VudGVyKGxlZnQsIHJpZ2h0KSxcclxuICAgICAgdHJhbnNsYXRlOiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQsXHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcmVwbGFjZVByZXZpZXdJbWFnZVVybCA9IHVzZUNhbGxiYWNrKChuZXh0VXJsOiBzdHJpbmcpID0+IHtcclxuICAgIHNldFByZXZpZXdJbWFnZVVybCgocHJldmlvdXMpID0+IHtcclxuICAgICAgaWYgKHByZXZpb3VzICYmIHByZXZpb3VzICE9PSBuZXh0VXJsKSB7XHJcbiAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChwcmV2aW91cyk7XHJcbiAgICAgIH1cclxuICAgICAgcHJldmlld0ltYWdlVXJsUmVmLmN1cnJlbnQgPSBuZXh0VXJsO1xyXG4gICAgICByZXR1cm4gbmV4dFVybDtcclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJQcmV2aWV3SW1hZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBzZXRQcmV2aWV3SW1hZ2VVcmwoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGlmIChwcmV2aW91cykge1xyXG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwocHJldmlvdXMpO1xyXG4gICAgICB9XHJcbiAgICAgIHByZXZpZXdJbWFnZVVybFJlZi5jdXJyZW50ID0gXCJcIjtcclxuICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGxvYWRQcmV2aWV3SW1hZ2UgPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xyXG4gICAgY29uc3QgY3VycmVudFVybCA9IHNhZmVUZXh0KHNvdXJjZVVybCk7XHJcbiAgICBpZiAoIWVuYWJsZWQgfHwgIWN1cnJlbnRGaWxlSWQgfHwgIWN1cnJlbnRVcmwpIHtcclxuICAgICAgc2V0UHJldmlld0J1c3koZmFsc2UpO1xyXG4gICAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmV2aWV3SW1hZ2VVcmxSZWYuY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gcHJldmlld0ltYWdlVXJsUmVmLmN1cnJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByZXZpZXdMb2FkUHJvbWlzZVJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHJldHVybiBwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXF1ZXN0S2V5ID0gYCR7Y3VycmVudEZpbGVJZH1fXyR7Y3VycmVudFVybH1gO1xyXG4gICAgcHJldmlld1JlcXVlc3RLZXlSZWYuY3VycmVudCA9IHJlcXVlc3RLZXk7XHJcbiAgICBzZXRQcmV2aWV3QnVzeSh0cnVlKTtcclxuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcclxuXHJcbiAgICBjb25zdCBuZXh0UHJvbWlzZSA9IChhc3luYyAoKSA9PiB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgYmxvYiA9IGF3YWl0IGZldGNoRXhwZW5zZVNoZWV0VGlja2V0UHJldmlld0Jsb2IoY3VycmVudEZpbGVJZCwgY3VycmVudFVybCwge1xyXG4gICAgICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qgb2JqZWN0VXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuICAgICAgICBpZiAocHJldmlld1JlcXVlc3RLZXlSZWYuY3VycmVudCAhPT0gcmVxdWVzdEtleSkge1xyXG4gICAgICAgICAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xyXG4gICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXBsYWNlUHJldmlld0ltYWdlVXJsKG9iamVjdFVybCk7XHJcbiAgICAgICAgcmV0dXJuIG9iamVjdFVybDtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAocHJldmlld1JlcXVlc3RLZXlSZWYuY3VycmVudCA9PT0gcmVxdWVzdEtleSkge1xyXG4gICAgICAgICAgc2V0UHJldmlld0Vycm9yKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgaWYgKHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPT09IHJlcXVlc3RLZXkpIHtcclxuICAgICAgICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJldmlld0xvYWRQcm9taXNlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIHByZXZpZXdMb2FkUHJvbWlzZVJlZi5jdXJyZW50ID0gbmV4dFByb21pc2U7XHJcbiAgICByZXR1cm4gbmV4dFByb21pc2U7XHJcbiAgfSwgW2VuYWJsZWQsIGZpbGVJZCwgcmVwbGFjZVByZXZpZXdJbWFnZVVybCwgc291cmNlVXJsXSk7XHJcblxyXG4gIGNvbnN0IGNsb3NlUHJldmlldyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFByZXZpZXdPcGVuKGZhbHNlKTtcclxuICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcclxuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcclxuICAgIHJlc2V0UHJldmlld0dlc3R1cmUoKTtcclxuICB9LCBbcmVzZXRQcmV2aWV3R2VzdHVyZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYXJQcmV2aWV3SW1hZ2UoKTtcclxuICAgIH07XHJcbiAgfSwgW2NsZWFyUHJldmlld0ltYWdlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBwcmV2aWV3UmVxdWVzdEtleVJlZi5jdXJyZW50ID0gYCR7c2FmZVRleHQoZmlsZUlkKX1fXyR7c2FmZVRleHQoc291cmNlVXJsKX1gO1xyXG4gICAgc2V0UHJldmlld09wZW4oZmFsc2UpO1xyXG4gICAgc2V0UHJldmlld0J1c3koZmFsc2UpO1xyXG4gICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xyXG4gICAgcmVzZXRQcmV2aWV3R2VzdHVyZSgpO1xyXG4gICAgY2xlYXJQcmV2aWV3SW1hZ2UoKTtcclxuXHJcbiAgICBpZiAoZW5hYmxlZCAmJiBzYWZlVGV4dChmaWxlSWQpICYmIHNhZmVUZXh0KHNvdXJjZVVybCkpIHtcclxuICAgICAgdm9pZCBsb2FkUHJldmlld0ltYWdlKCk7XHJcbiAgICB9XHJcbiAgfSwgW2NsZWFyUHJldmlld0ltYWdlLCBlbmFibGVkLCBmaWxlSWQsIGxvYWRQcmV2aWV3SW1hZ2UsIHJlc2V0UHJldmlld0dlc3R1cmUsIHNvdXJjZVVybF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFwcmV2aWV3T3BlbikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG9uS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgY2xvc2VQcmV2aWV3KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XHJcbiAgfSwgW3ByZXZpZXdPcGVuLCBjbG9zZVByZXZpZXddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcHJldmlld09wZW4pIHJldHVybjtcclxuICAgIGNvbnN0IHN1cmZhY2UgPSBwcmV2aWV3U3VyZmFjZVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFzdXJmYWNlKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgcHJldmVudEdlc3R1cmVEZWZhdWx0ID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBwcmV2ZW50VG91Y2hWaWV3cG9ydFpvb20gPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcHJldmVudEN0cmxXaGVlbFZpZXdwb3J0Wm9vbSA9IChldmVudDogV2hlZWxFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQuY3RybEtleSkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKFwiZ2VzdHVyZXN0YXJ0XCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVjaGFuZ2VcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xyXG4gICAgc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKFwiZ2VzdHVyZWVuZFwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcbiAgICBzdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgcHJldmVudFRvdWNoVmlld3BvcnRab29tLCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xyXG4gICAgc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgcHJldmVudEN0cmxXaGVlbFZpZXdwb3J0Wm9vbSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBzdXJmYWNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJnZXN0dXJlc3RhcnRcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0KTtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZ2VzdHVyZWNoYW5nZVwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQpO1xyXG4gICAgICBzdXJmYWNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJnZXN0dXJlZW5kXCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCk7XHJcbiAgICAgIHN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBwcmV2ZW50VG91Y2hWaWV3cG9ydFpvb20pO1xyXG4gICAgICBzdXJmYWNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBwcmV2ZW50Q3RybFdoZWVsVmlld3BvcnRab29tKTtcclxuICAgIH07XHJcbiAgfSwgW3ByZXZpZXdPcGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdQb2ludGVyRG93biA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmICghcHJldmlld0ltYWdlVXJsIHx8IHByZXZpZXdCdXN5KSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHBvaW50OiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7IHg6IGV2ZW50LmNsaWVudFgsIHk6IGV2ZW50LmNsaWVudFkgfTtcclxuICAgICAgcHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2V0KGV2ZW50LnBvaW50ZXJJZCwgcG9pbnQpO1xyXG4gICAgICBpZiAodHlwZW9mIGV2ZW50LmN1cnJlbnRUYXJnZXQuc2V0UG9pbnRlckNhcHR1cmUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnNldFBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZCk7XHJcbiAgICAgICAgfSBjYXRjaCB7XHJcbiAgICAgICAgICAvLyBJZ25vcmUgY2FwdHVyZSBmYWlsdXJlcyBvbiBicm93c2VycyB0aGF0IGRvIG5vdCBmdWxseSBzdXBwb3J0IHBvaW50ZXIgY2FwdHVyZS5cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5zaXplID09PSAxKSB7XHJcbiAgICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IGV2ZW50LnBvaW50ZXJJZDtcclxuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludDtcclxuICAgICAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xyXG4gICAgfSxcclxuICAgIFtwcmV2aWV3QnVzeSwgcHJldmlld0ltYWdlVXJsLCByZWJ1aWxkUGluY2hTbmFwc2hvdF1cclxuICApO1xyXG5cclxuICBjb25zdCBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmhhcyhldmVudC5wb2ludGVySWQpKSByZXR1cm47XHJcblxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBjb25zdCBwb2ludDogVGlja2V0UHJldmlld1BvaW50ID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH07XHJcbiAgICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnNldChldmVudC5wb2ludGVySWQsIHBvaW50KTtcclxuXHJcbiAgICAgIGNvbnN0IHBvaW50ZXJFbnRyaWVzID0gQXJyYXkuZnJvbShwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5lbnRyaWVzKCkpO1xyXG4gICAgICBjb25zdCBwb2ludGVyUG9pbnRzID0gcG9pbnRlckVudHJpZXMubWFwKChlbnRyeSkgPT4gZW50cnlbMV0pO1xyXG5cclxuICAgICAgaWYgKHBvaW50ZXJQb2ludHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICBpZiAoIXByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQpIHtcclxuICAgICAgICAgIHJlYnVpbGRQaW5jaFNuYXBzaG90KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzbmFwc2hvdCA9IHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQ7XHJcbiAgICAgICAgaWYgKCFzbmFwc2hvdCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBbbGVmdCwgcmlnaHRdID0gcG9pbnRlclBvaW50cztcclxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGgubWF4KDEsIGdldFByZXZpZXdQb2ludERpc3RhbmNlKGxlZnQsIHJpZ2h0KSk7XHJcbiAgICAgICAgY29uc3QgcmF0aW8gPSBkaXN0YW5jZSAvIE1hdGgubWF4KDEsIHNuYXBzaG90LmRpc3RhbmNlKTtcclxuICAgICAgICBjb25zdCBuZXh0U2NhbGUgPSBjbGFtcFByZXZpZXdTY2FsZShzbmFwc2hvdC5zY2FsZSAqIHJhdGlvKTtcclxuICAgICAgICBjb25zdCBjZW50ZXIgPSBnZXRQcmV2aWV3UG9pbnRDZW50ZXIobGVmdCwgcmlnaHQpO1xyXG4gICAgICAgIGNvbnN0IG5leHRUcmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludCA9IHtcclxuICAgICAgICAgIHg6IHNuYXBzaG90LnRyYW5zbGF0ZS54ICsgKGNlbnRlci54IC0gc25hcHNob3QuY2VudGVyLngpLFxyXG4gICAgICAgICAgeTogc25hcHNob3QudHJhbnNsYXRlLnkgKyAoY2VudGVyLnkgLSBzbmFwc2hvdC5jZW50ZXIueSksXHJcbiAgICAgICAgfTtcclxuICAgICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0obmV4dFNjYWxlLCBuZXh0VHJhbnNsYXRlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCAhPT0gMSB8fCBwcmV2aWV3U2NhbGVSZWYuY3VycmVudCA8PSAxIHx8IHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgIT09IGV2ZW50LnBvaW50ZXJJZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgbGFzdFBvaW50ID0gcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50O1xyXG4gICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludDtcclxuICAgICAgaWYgKCFsYXN0UG9pbnQpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5leHRUcmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludCA9IHtcclxuICAgICAgICB4OiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQueCArIChwb2ludC54IC0gbGFzdFBvaW50LngpLFxyXG4gICAgICAgIHk6IHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudC55ICsgKHBvaW50LnkgLSBsYXN0UG9pbnQueSksXHJcbiAgICAgIH07XHJcbiAgICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybShwcmV2aWV3U2NhbGVSZWYuY3VycmVudCwgbmV4dFRyYW5zbGF0ZSk7XHJcbiAgICB9LFxyXG4gICAgW2FwcGx5UHJldmlld1RyYW5zZm9ybSwgcmVidWlsZFBpbmNoU25hcHNob3RdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQgPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmhhcyhldmVudC5wb2ludGVySWQpKSByZXR1cm47XHJcbiAgICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmRlbGV0ZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgdHlwZW9mIGV2ZW50LmN1cnJlbnRUYXJnZXQuaGFzUG9pbnRlckNhcHR1cmUgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuaGFzUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKVxyXG4gICAgICApIHtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LnJlbGVhc2VQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBwb2ludGVyRW50cmllcyA9IEFycmF5LmZyb20ocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuZW50cmllcygpKTtcclxuICAgICAgaWYgKHBvaW50ZXJFbnRyaWVzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHBvaW50ZXJFbnRyaWVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgIGNvbnN0IFtwb2ludGVySWQsIHBvaW50ZXJQb2ludF0gPSBwb2ludGVyRW50cmllc1swXTtcclxuICAgICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gcG9pbnRlcklkO1xyXG4gICAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IHBvaW50ZXJQb2ludDtcclxuICAgICAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgaWYgKHByZXZpZXdTY2FsZVJlZi5jdXJyZW50IDw9IDEpIHtcclxuICAgICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0oMSwgeyB4OiAwLCB5OiAwIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2FwcGx5UHJldmlld1RyYW5zZm9ybSwgcmVidWlsZFBpbmNoU25hcHNob3RdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJldmlld1doZWVsID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LldoZWVsRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XHJcbiAgICAgIGlmICghcHJldmlld0ltYWdlVXJsIHx8IHByZXZpZXdCdXN5KSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICBjb25zdCBkaXJlY3Rpb24gPSBldmVudC5kZWx0YVkgPCAwID8gMSA6IC0xO1xyXG4gICAgICBjb25zdCBuZXh0U2NhbGUgPSBjbGFtcFByZXZpZXdTY2FsZShwcmV2aWV3U2NhbGVSZWYuY3VycmVudCArIGRpcmVjdGlvbiAqIFBSRVZJRVdfU0NBTEVfU1RFUCk7XHJcbiAgICAgIGFwcGx5UHJldmlld1RyYW5zZm9ybShuZXh0U2NhbGUsIHByZXZpZXdUcmFuc2xhdGVSZWYuY3VycmVudCk7XHJcbiAgICB9LFxyXG4gICAgW2FwcGx5UHJldmlld1RyYW5zZm9ybSwgcHJldmlld0J1c3ksIHByZXZpZXdJbWFnZVVybF1cclxuICApO1xyXG5cclxuICBjb25zdCBvcGVuUHJldmlldyA9IHVzZUNhbGxiYWNrKGFzeW5jICgpID0+IHtcclxuICAgIGNvbnN0IGN1cnJlbnRGaWxlSWQgPSBzYWZlVGV4dChmaWxlSWQpO1xyXG4gICAgY29uc3QgY3VycmVudFVybCA9IHNhZmVUZXh0KHNvdXJjZVVybCk7XHJcbiAgICBpZiAoIWVuYWJsZWQgfHwgIWN1cnJlbnRGaWxlSWQgfHwgIWN1cnJlbnRVcmwpIHJldHVybjtcclxuXHJcbiAgICByZXNldFByZXZpZXdHZXN0dXJlKCk7XHJcbiAgICBzZXRQcmV2aWV3T3Blbih0cnVlKTtcclxuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcclxuXHJcbiAgICBhd2FpdCBsb2FkUHJldmlld0ltYWdlKCk7XHJcbiAgfSwgW2VuYWJsZWQsIGZpbGVJZCwgbG9hZFByZXZpZXdJbWFnZSwgcmVzZXRQcmV2aWV3R2VzdHVyZSwgc291cmNlVXJsXSk7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwcmV2aWV3T3BlbixcclxuICAgIHByZXZpZXdCdXN5LFxyXG4gICAgcHJldmlld0Vycm9yLFxyXG4gICAgcHJldmlld0ltYWdlVXJsLFxyXG4gICAgcHJldmlld1NjYWxlLFxyXG4gICAgcHJldmlld1RyYW5zbGF0ZSxcclxuICAgIHByZXZpZXdTdXJmYWNlUmVmLFxyXG4gICAgb3BlblByZXZpZXcsXHJcbiAgICBjbG9zZVByZXZpZXcsXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24sXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlck1vdmUsXHJcbiAgICBoYW5kbGVQcmV2aWV3UG9pbnRlckVuZCxcclxuICAgIGhhbmRsZVByZXZpZXdXaGVlbCxcclxuICB9O1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sbUJBQW1CLG9CQUFJLElBQVksQ0FBQyxPQUFPLFFBQVEsT0FBTyxRQUFRLE9BQU8sT0FBTyxRQUFRLFFBQVEsTUFBTSxDQUFDO0FBRTdHLElBQU0sMkJBQTJCLENBQUMsVUFBMEI7QUFDMUQsUUFBTSxTQUFTLFNBQVMsS0FBSyxFQUFFLFlBQVk7QUFDM0MsTUFBSSxDQUFDLE9BQVEsUUFBTztBQUVwQixRQUFNLGVBQWUsT0FBTyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUN0RCxRQUFNLFFBQVEsYUFBYSxNQUFNLEdBQUc7QUFDcEMsTUFBSSxNQUFNLFNBQVMsRUFBRyxRQUFPO0FBRTdCLFFBQU0sU0FBUyxTQUFTLE1BQU0sTUFBTSxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsY0FBYyxFQUFFO0FBQ3pFLFNBQU8sV0FBVyxTQUFTLFFBQVE7QUFDckM7QUFHTyxJQUFNLHFDQUFxQyxDQUFDLGFBQThCO0FBQy9FLFFBQU0sZ0JBQWdCLFNBQVMsUUFBUTtBQUN2QyxNQUFJLENBQUMsY0FBZSxRQUFPO0FBRTNCLE1BQUksY0FBYyxZQUFZLEVBQUUsV0FBVyxhQUFhLEVBQUcsUUFBTztBQUVsRSxRQUFNLFlBQVkseUJBQXlCLGFBQWE7QUFDeEQsTUFBSSxhQUFhLGlCQUFpQixJQUFJLFNBQVMsRUFBRyxRQUFPO0FBRXpELFFBQU0sa0JBQWtCLGNBQWMsWUFBWTtBQUNsRCxNQUFJLGdCQUFnQixTQUFTLHVCQUF1QixLQUFLLGdCQUFnQixTQUFTLE9BQU8sRUFBRyxRQUFPO0FBRW5HLFNBQU87QUFDVDs7O0FDN0JBLHVCQUE2QjtB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
