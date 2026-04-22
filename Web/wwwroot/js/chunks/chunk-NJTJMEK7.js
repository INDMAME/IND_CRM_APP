import {
  fetchExpenseSheetTicketPreviewBlob,
  safeText
} from "./chunk-TC2T4EQZ.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-PNIKV5DC.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9leHBlbnNlVGlja2V0UHJldmlld1V0aWxzLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvdGlja2V0cy9kZXRhaWwvRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC9FeHBlbnNlVGlja2V0U3RpY2t5UHJldmlldy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy90aWNrZXRzL2RldGFpbC91c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xyXG5cclxuY29uc3QgSU1BR0VfRVhURU5TSU9OUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJqcGdcIiwgXCJqcGVnXCIsIFwicG5nXCIsIFwid2VicFwiLCBcImdpZlwiLCBcImJtcFwiLCBcImhlaWNcIiwgXCJoZWlmXCIsIFwiYXZpZlwiXSk7XHJcblxyXG5jb25zdCBnZXRGaWxlRXh0ZW5zaW9uRnJvbVBhdGggPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XHJcbiAgY29uc3Qgc291cmNlID0gc2FmZVRleHQodmFsdWUpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKCFzb3VyY2UpIHJldHVybiBcIlwiO1xyXG5cclxuICBjb25zdCB3aXRob3V0UXVlcnkgPSBzb3VyY2Uuc3BsaXQoXCI/XCIpWzBdLnNwbGl0KFwiI1wiKVswXTtcclxuICBjb25zdCBwYXJ0cyA9IHdpdGhvdXRRdWVyeS5zcGxpdChcIi5cIik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCA8IDIpIHJldHVybiBcIlwiO1xyXG5cclxuICBjb25zdCByYXdFeHQgPSBzYWZlVGV4dChwYXJ0c1twYXJ0cy5sZW5ndGggLSAxXSkucmVwbGFjZSgvW15hLXowLTldL2csIFwiXCIpO1xyXG4gIHJldHVybiByYXdFeHQgPT09IFwianBlZ1wiID8gXCJqcGdcIiA6IHJhd0V4dDtcclxufTtcclxuXHJcbi8vIERldGVjdHMgd2hldGhlciBvbmUgdGlja2V0IHNvdXJjZSBjYW4gcmVuZGVyIGFzIGFuIGlubGluZSBpbWFnZSBwcmV2aWV3LlxyXG5leHBvcnQgY29uc3QgaGFzRXhwZW5zZVRpY2tldEltYWdlUHJldmlld1NvdXJjZSA9ICh1cmxWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XHJcbiAgY29uc3Qgbm9ybWFsaXplZFVybCA9IHNhZmVUZXh0KHVybFZhbHVlKTtcclxuICBpZiAoIW5vcm1hbGl6ZWRVcmwpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKG5vcm1hbGl6ZWRVcmwudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKFwiZGF0YTppbWFnZS9cIikpIHJldHVybiB0cnVlO1xyXG5cclxuICBjb25zdCBleHRlbnNpb24gPSBnZXRGaWxlRXh0ZW5zaW9uRnJvbVBhdGgobm9ybWFsaXplZFVybCk7XHJcbiAgaWYgKGV4dGVuc2lvbiAmJiBJTUFHRV9FWFRFTlNJT05TLmhhcyhleHRlbnNpb24pKSByZXR1cm4gdHJ1ZTtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplZExvd2VyID0gbm9ybWFsaXplZFVybC50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmIChub3JtYWxpemVkTG93ZXIuaW5jbHVkZXMoXCJibG9iLmNvcmUud2luZG93cy5uZXRcIikgJiYgbm9ybWFsaXplZExvd2VyLmluY2x1ZGVzKFwiaW1hZ2VcIikpIHJldHVybiB0cnVlO1xyXG5cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB0eXBlIHsgVGlja2V0UHJldmlld1BvaW50IH0gZnJvbSBcIi4vdXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlldy50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsUHJvcHMgPSB7XHJcbiAgb3BlbjogYm9vbGVhbjtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGVycm9yOiBzdHJpbmc7XHJcbiAgaW1hZ2VVcmw6IHN0cmluZztcclxuICBpbWFnZUFsdDogc3RyaW5nO1xyXG4gIHNjYWxlOiBudW1iZXI7XHJcbiAgdHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XHJcbiAgc3VyZmFjZVJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcclxuICBvblBvaW50ZXJEb3duOiAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbiAgb25Qb2ludGVyTW92ZTogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uUG9pbnRlckVuZDogKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xyXG4gIG9uV2hlZWw6IChldmVudDogUmVhY3QuV2hlZWxFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBSZW5kZXJzIHRoZSB0aWNrZXQgaW1hZ2UgcHJldmlldyBvdmVybGF5IHdpdGggem9vbSBhbmQgcGFuIGdlc3R1cmVzLlxyXG5jb25zdCBFeHBlbnNlVGlja2V0UHJldmlld01vZGFsID0gKHtcclxuICBvcGVuLFxyXG4gIGJ1c3ksXHJcbiAgZXJyb3IsXHJcbiAgaW1hZ2VVcmwsXHJcbiAgaW1hZ2VBbHQsXHJcbiAgc2NhbGUsXHJcbiAgdHJhbnNsYXRlLFxyXG4gIHN1cmZhY2VSZWYsXHJcbiAgb25DbG9zZSxcclxuICBvblBvaW50ZXJEb3duLFxyXG4gIG9uUG9pbnRlck1vdmUsXHJcbiAgb25Qb2ludGVyRW5kLFxyXG4gIG9uV2hlZWwsXHJcbn06IEV4cGVuc2VUaWNrZXRQcmV2aWV3TW9kYWxQcm9wcykgPT4ge1xyXG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XHJcblxyXG4gIHJldHVybiBjcmVhdGVQb3J0YWwoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcnNjcm9sbC1jb250YWluIGJnLXNsYXRlLTk1MC80NSBweC00IHB5LTYgYmFja2Ryb3AtYmx1ci1tZFwiPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9DbG9zZVwiLCBcIkNsb3NlXCIpfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTBcIlxyXG4gICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XHJcbiAgICAgIC8+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX0Nsb3NlXCIsIFwiQ2xvc2VcIil9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgcmlnaHQtNCB0b3AtW2NhbGMoMXJlbStlbnYoc2FmZS1hcmVhLWluc2V0LXRvcCwwcHgpKV0gei1bNjAwMDIwXSBpbmxpbmUtZmxleCBoLTEwIHctMTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwLzYwIGJnLXNsYXRlLTkwMC83OCB0ZXh0LXNsYXRlLTEwMCBzaGFkb3ctbGcgdHJhbnNpdGlvbiBob3ZlcjpiZy1zbGF0ZS05MDAvODggZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWhpZGRlbiBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctc2xhdGUtMjAwLzgwXCJcbiAgICAgICAgb25DbGljaz17b25DbG9zZX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgZD1cIk02IDZMMTggMThNMTggNkw2IDE4XCJcclxuICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjc1XCJcclxuICAgICAgICAgICAgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCJcclxuICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvc3ZnPlxyXG4gICAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleCBtYXgtaC1bOTJ2aF0gbWF4LXctWzkydnddIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyc2Nyb2xsLWNvbnRhaW5cIj5cclxuICAgICAgICB7YnVzeSA/IChcclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTEwMFwiPlxyXG4gICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgICAgIDxjaXJjbGUgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXJfX2NpcmNsZVwiIGN4PVwiMTBcIiBjeT1cIjEwXCIgcj1cIjhcIiBzdHJva2VXaWR0aD1cIjJcIiAvPlxyXG4gICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApIDogZXJyb3IgPyAoXHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtcm9zZS0yMDBcIj57ZXJyb3J9PC9wPlxyXG4gICAgICAgICkgOiBpbWFnZVVybCA/IChcclxuICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgcmVmPXtzdXJmYWNlUmVmfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBtYXgtaC1bOTB2aF0gbWF4LXctWzkydnddIG92ZXJmbG93LWhpZGRlbiByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSB0b3VjaC1ub25lIG92ZXJzY3JvbGwtY29udGFpblwiXG4gICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcclxuICAgICAgICAgICAgc3R5bGU9e3sgdG91Y2hBY3Rpb246IFwibm9uZVwiIH19XHJcbiAgICAgICAgICAgIG9uUG9pbnRlckRvd249e29uUG9pbnRlckRvd259XHJcbiAgICAgICAgICAgIG9uUG9pbnRlck1vdmU9e29uUG9pbnRlck1vdmV9XHJcbiAgICAgICAgICAgIG9uUG9pbnRlclVwPXtvblBvaW50ZXJFbmR9XHJcbiAgICAgICAgICAgIG9uUG9pbnRlckNhbmNlbD17b25Qb2ludGVyRW5kfVxyXG4gICAgICAgICAgICBvbldoZWVsPXtvbldoZWVsfVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgc3JjPXtpbWFnZVVybH1cclxuICAgICAgICAgICAgICBhbHQ9e2ltYWdlQWx0IHx8IGluZFQoXCJUaWNrZXRzX0ZpZWxkX0ZpbGVJZFwiLCBcIlRpY2tldFwiKX1cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIG1heC1oLVs5MHZoXSB3LWF1dG8gbWF4LXctWzkydnddIHNlbGVjdC1ub25lIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIG9iamVjdC1jb250YWluIHNoYWRvdy0yeGxcIlxuICAgICAgICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt0cmFuc2xhdGUueH1weCwgJHt0cmFuc2xhdGUueX1weCwgMCkgc2NhbGUoJHtzY2FsZX0pYCxcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybU9yaWdpbjogXCJjZW50ZXIgY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBzY2FsZSA8PSAxID8gXCJ0cmFuc2Zvcm0gMTQwbXMgZWFzZS1vdXRcIiA6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgZHJhZ2dhYmxlPXtmYWxzZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiAoXHJcbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtMTAwXCI+e2luZFQoXCJDb21tb25fTm90QXZhaWxhYmxlXCIsIFwiTi9BXCIpfTwvcD5cclxuICAgICAgICApfVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PixcclxuICAgIGRvY3VtZW50LmJvZHlcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldFByZXZpZXdNb2RhbDtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG50eXBlIEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3UHJvcHMgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBlcnJvcjogc3RyaW5nO1xyXG4gIGltYWdlVXJsOiBzdHJpbmc7XHJcbiAgaW1hZ2VBbHQ6IHN0cmluZztcclxuICBmaWxlTmFtZTogc3RyaW5nO1xyXG4gIG9uT3BlbjogKCkgPT4gdm9pZDtcclxufTtcclxuXHJcbi8vIFJlbmRlcnMgb25lIGNvbXBhY3QgdGlja2V0IHByZXZpZXcgdGhhdCBzdGF5cyB2aXNpYmxlIHdoaWxlIGRldGFpbCBjb250ZW50IHNjcm9sbHMuXHJcbmNvbnN0IEV4cGVuc2VUaWNrZXRTdGlja3lQcmV2aWV3ID0gKHtcclxuICBidXN5LFxyXG4gIGVycm9yLFxyXG4gIGltYWdlVXJsLFxyXG4gIGltYWdlQWx0LFxyXG4gIGZpbGVOYW1lLFxyXG4gIG9uT3BlbixcclxufTogRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXdQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHByZXZpZXdMYWJlbCA9IGluZFQoXCJUaWNrZXRzX0RldGFpbF9WaWV3QXR0YWNobWVudFwiLCBcIlZlciBhZGp1bnRvXCIpO1xyXG4gIGNvbnN0IHRpY2tldExhYmVsID0gaW5kVChcIlRpY2tldHNfRmllbGRfRmlsZUlkXCIsIFwiVGlja2V0XCIpO1xyXG4gIGNvbnN0IHNhZmVGaWxlTmFtZSA9IHNhZmVUZXh0KGZpbGVOYW1lKSB8fCBzYWZlVGV4dChpbWFnZUFsdCkgfHwgdGlja2V0TGFiZWw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInN0aWNreSB0b3AtWzcycHhdIHotWzE4MDBdIGxnOnRvcC0yMFwiPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgYmxvY2sgdy1mdWxsIHRvdWNoLW1hbmlwdWxhdGlvbiB0ZXh0LWxlZnQgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWhpZGRlbiBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zNSBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTJcIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2Ake3ByZXZpZXdMYWJlbH06ICR7c2FmZUZpbGVOYW1lfWB9XHJcbiAgICAgICAgb25DbGljaz17b25PcGVufVxyXG4gICAgICA+XHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgc2hhZG93LXhzIHRyYW5zaXRpb24tW3RyYW5zZm9ybSxib3gtc2hhZG93LGJvcmRlci1jb2xvcl0gZHVyYXRpb24tMjAwIGdyb3VwLWhvdmVyOi10cmFuc2xhdGUteS1bMXB4XSBncm91cC1ob3Zlcjpib3JkZXItcHJpbWFyeS8yNSBncm91cC1ob3ZlcjpzaGFkb3ctbWRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtMzYgb3ZlcmZsb3ctaGlkZGVuIGJnLWxpbmVhci10by1iciBmcm9tLXNsYXRlLTEwMCB2aWEtd2hpdGUgdG8tc2xhdGUtMjAwIHNtOmgtNDAgbGc6aC1bMzgwcHhdXCI+XHJcbiAgICAgICAgICAgIHtpbWFnZVVybCA/IChcclxuICAgICAgICAgICAgICA8aW1nXHJcbiAgICAgICAgICAgICAgICBzcmM9e2ltYWdlVXJsfVxyXG4gICAgICAgICAgICAgICAgYWx0PXtpbWFnZUFsdCB8fCB0aWNrZXRMYWJlbH1cclxuICAgICAgICAgICAgICAgIHdpZHRoPXs2NDB9XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ9ezk2MH1cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtZnVsbCB3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gb2JqZWN0LWNvdmVyIG9iamVjdC1jZW50ZXIgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMzAwIGdyb3VwLWhvdmVyOnNjYWxlLVsxLjAxNV0gbGc6b2JqZWN0LWNvbnRhaW4gbGc6b2JqZWN0LWNlbnRlciBsZzpwLTNcIlxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBoLWZ1bGwgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHB4LTRcIj5cclxuICAgICAgICAgICAgICAgIHtidXN5ID8gKFxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cImluZC1zcGlubmVyIGgtNSB3LTVcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgcm9sZT1cInN0YXR1c1wiIGFyaWEtbGFiZWw9e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAge2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IG1pbi13LTAgaXRlbXMtY2VudGVyIGdhcC0zIHRleHQtc2xhdGUtNzAwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGgtMTEgdy0xMSBzaHJpbmstMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctcHJpbWFyeS84IHRleHQtcHJpbWFyeVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cGF0aFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGQ9XCJNNyAzLjc1aDYuMjVMMTguMjUgOC43NVYxOS41YS43NS43NSAwIDAgMS0uNzUuNzVIN2EuNzUuNzUgMCAwIDEtLjc1LS43NXYtMTVBLjc1Ljc1IDAgMCAxIDcgMy43NVpcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZD1cIk0xMyAzLjc1VjguNWg0Ljc1XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMS41XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0cnVuY2F0ZSB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS05MDBcIj57c2FmZUZpbGVOYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cImxpbmUtY2xhbXAtMiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwXCI+e2Vycm9yIHx8IHByZXZpZXdMYWJlbH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSBpbnNldC14LTAgdG9wLTAgaC0xNiBiZy1saW5lYXItdG8tYiBmcm9tLXNsYXRlLTk1MC8yNiB2aWEtc2xhdGUtOTAwLzggdG8tdHJhbnNwYXJlbnQgbGc6aC0yMFwiIC8+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicG9pbnRlci1ldmVudHMtbm9uZSBhYnNvbHV0ZSByaWdodC0zIHRvcC0zIGlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBiZy1wcmltYXJ5LzkyIHB4LTMgcHktMS41IHRleHQtWzExcHhdIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJoLTMuNSB3LTMuNVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgPHBhdGhcclxuICAgICAgICAgICAgICAgICAgZD1cIk0xNSAzaDZ2Nk0yMSAzbC03IDdNOSAyMUgzdi02TTMgMjFsNy03XCJcclxuICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lY2FwPVwicm91bmRcIlxyXG4gICAgICAgICAgICAgICAgICBzdHJva2VMaW5lam9pbj1cInJvdW5kXCJcclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAge3ByZXZpZXdMYWJlbH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVRpY2tldFN0aWNreVByZXZpZXc7XHJcbiIsICJcdUZFRkZpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB0eXBlIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlU2hlZXRUaWNrZXRQcmV2aWV3QmxvYiB9IGZyb20gXCIuLi8uLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XHJcbmltcG9ydCB7IHNhZmVUZXh0IH0gZnJvbSBcIi4uLy4uL3V0aWxzL2V4cGVuc2VVaVV0aWxzLnRzXCI7XHJcblxyXG5jb25zdCBQUkVWSUVXX01BWF9TQ0FMRSA9IDQ7XHJcbmNvbnN0IFBSRVZJRVdfU0NBTEVfU1RFUCA9IDAuMjU7XHJcblxyXG5leHBvcnQgdHlwZSBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgVXNlRXhwZW5zZVRpY2tldEltYWdlUHJldmlld0FyZ3MgPSB7XHJcbiAgZmlsZUlkOiBzdHJpbmc7XHJcbiAgc291cmNlVXJsOiBzdHJpbmc7XHJcbiAgZW5hYmxlZD86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBjbGFtcFByZXZpZXdTY2FsZSA9ICh2YWx1ZTogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICBpZiAoIU51bWJlci5pc0Zpbml0ZSh2YWx1ZSkpIHJldHVybiAxO1xyXG4gIHJldHVybiBNYXRoLm1pbihQUkVWSUVXX01BWF9TQ0FMRSwgTWF0aC5tYXgoMSwgdmFsdWUpKTtcclxufTtcclxuXHJcbmNvbnN0IGdldFByZXZpZXdQb2ludERpc3RhbmNlID0gKGxlZnQ6IFRpY2tldFByZXZpZXdQb2ludCwgcmlnaHQ6IFRpY2tldFByZXZpZXdQb2ludCk6IG51bWJlciA9PiB7XHJcbiAgY29uc3QgZGVsdGFYID0gcmlnaHQueCAtIGxlZnQueDtcclxuICBjb25zdCBkZWx0YVkgPSByaWdodC55IC0gbGVmdC55O1xyXG4gIHJldHVybiBNYXRoLnNxcnQoZGVsdGFYICogZGVsdGFYICsgZGVsdGFZICogZGVsdGFZKTtcclxufTtcclxuXHJcbmNvbnN0IGdldFByZXZpZXdQb2ludENlbnRlciA9IChsZWZ0OiBUaWNrZXRQcmV2aWV3UG9pbnQsIHJpZ2h0OiBUaWNrZXRQcmV2aWV3UG9pbnQpOiBUaWNrZXRQcmV2aWV3UG9pbnQgPT4gKHtcclxuICB4OiAobGVmdC54ICsgcmlnaHQueCkgLyAyLFxyXG4gIHk6IChsZWZ0LnkgKyByaWdodC55KSAvIDIsXHJcbn0pO1xyXG5cclxuLy8gTWFuYWdlcyB0aWNrZXQgaW1hZ2UgcHJldmlldyBzdGF0ZSBhbmQgem9vbS9wYW4gZ2VzdHVyZXMuXHJcbmV4cG9ydCBjb25zdCB1c2VFeHBlbnNlVGlja2V0SW1hZ2VQcmV2aWV3ID0gKHsgZmlsZUlkLCBzb3VyY2VVcmwsIGVuYWJsZWQgPSB0cnVlIH06IFVzZUV4cGVuc2VUaWNrZXRJbWFnZVByZXZpZXdBcmdzKSA9PiB7XHJcbiAgY29uc3QgW3ByZXZpZXdPcGVuLCBzZXRQcmV2aWV3T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3ByZXZpZXdCdXN5LCBzZXRQcmV2aWV3QnVzeV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3ByZXZpZXdFcnJvciwgc2V0UHJldmlld0Vycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtwcmV2aWV3SW1hZ2VVcmwsIHNldFByZXZpZXdJbWFnZVVybF0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbcHJldmlld1NjYWxlLCBzZXRQcmV2aWV3U2NhbGVdID0gdXNlU3RhdGUoMSk7XHJcbiAgY29uc3QgW3ByZXZpZXdUcmFuc2xhdGUsIHNldFByZXZpZXdUcmFuc2xhdGVdID0gdXNlU3RhdGU8VGlja2V0UHJldmlld1BvaW50Pih7IHg6IDAsIHk6IDAgfSk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdTY2FsZVJlZiA9IHVzZVJlZigxKTtcclxuICBjb25zdCBwcmV2aWV3SW1hZ2VVcmxSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgcHJldmlld1JlcXVlc3RLZXlSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgcHJldmlld0xvYWRQcm9taXNlUmVmID0gdXNlUmVmPFByb21pc2U8c3RyaW5nPiB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByZXZpZXdTdXJmYWNlUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgcHJldmlld1RyYW5zbGF0ZVJlZiA9IHVzZVJlZjxUaWNrZXRQcmV2aWV3UG9pbnQ+KHsgeDogMCwgeTogMCB9KTtcclxuICBjb25zdCBwcmV2aWV3UG9pbnRlcnNSZWYgPSB1c2VSZWY8TWFwPG51bWJlciwgVGlja2V0UHJldmlld1BvaW50Pj4obmV3IE1hcCgpKTtcclxuICBjb25zdCBwcmV2aWV3UGFuUG9pbnRlclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBwcmV2aWV3UGFuTGFzdFBvaW50UmVmID0gdXNlUmVmPFRpY2tldFByZXZpZXdQb2ludCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHByZXZpZXdQaW5jaFNuYXBzaG90UmVmID0gdXNlUmVmPHtcclxuICAgIGRpc3RhbmNlOiBudW1iZXI7XHJcbiAgICBzY2FsZTogbnVtYmVyO1xyXG4gICAgY2VudGVyOiBUaWNrZXRQcmV2aWV3UG9pbnQ7XHJcbiAgICB0cmFuc2xhdGU6IFRpY2tldFByZXZpZXdQb2ludDtcclxuICB9IHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IGFwcGx5UHJldmlld1RyYW5zZm9ybSA9IHVzZUNhbGxiYWNrKChuZXh0U2NhbGU6IG51bWJlciwgbmV4dFRyYW5zbGF0ZTogVGlja2V0UHJldmlld1BvaW50KSA9PiB7XHJcbiAgICBjb25zdCBub3JtYWxpemVkU2NhbGUgPSBjbGFtcFByZXZpZXdTY2FsZShuZXh0U2NhbGUpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFRyYW5zbGF0ZSA9IG5vcm1hbGl6ZWRTY2FsZSA8PSAxID8geyB4OiAwLCB5OiAwIH0gOiBuZXh0VHJhbnNsYXRlO1xyXG5cclxuICAgIHByZXZpZXdTY2FsZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFNjYWxlO1xyXG4gICAgcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50ID0gbm9ybWFsaXplZFRyYW5zbGF0ZTtcclxuICAgIHNldFByZXZpZXdTY2FsZShub3JtYWxpemVkU2NhbGUpO1xyXG4gICAgc2V0UHJldmlld1RyYW5zbGF0ZShub3JtYWxpemVkVHJhbnNsYXRlKTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHJlc2V0UHJldmlld0dlc3R1cmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5jbGVhcigpO1xyXG4gICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0oMSwgeyB4OiAwLCB5OiAwIH0pO1xyXG4gIH0sIFthcHBseVByZXZpZXdUcmFuc2Zvcm1dKTtcclxuXHJcbiAgY29uc3QgcmVidWlsZFBpbmNoU25hcHNob3QgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBwb2ludGVyUG9pbnRzID0gQXJyYXkuZnJvbShwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC52YWx1ZXMoKSk7XHJcbiAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggPCAyKSB7XHJcbiAgICAgIHByZXZpZXdQaW5jaFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IHBvaW50ZXJQb2ludHM7XHJcbiAgICBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50ID0ge1xyXG4gICAgICBkaXN0YW5jZTogTWF0aC5tYXgoMSwgZ2V0UHJldmlld1BvaW50RGlzdGFuY2UobGVmdCwgcmlnaHQpKSxcclxuICAgICAgc2NhbGU6IHByZXZpZXdTY2FsZVJlZi5jdXJyZW50LFxyXG4gICAgICBjZW50ZXI6IGdldFByZXZpZXdQb2ludENlbnRlcihsZWZ0LCByaWdodCksXHJcbiAgICAgIHRyYW5zbGF0ZTogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LFxyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHJlcGxhY2VQcmV2aWV3SW1hZ2VVcmwgPSB1c2VDYWxsYmFjaygobmV4dFVybDogc3RyaW5nKSA9PiB7XHJcbiAgICBzZXRQcmV2aWV3SW1hZ2VVcmwoKHByZXZpb3VzKSA9PiB7XHJcbiAgICAgIGlmIChwcmV2aW91cyAmJiBwcmV2aW91cyAhPT0gbmV4dFVybCkge1xyXG4gICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwocHJldmlvdXMpO1xyXG4gICAgICB9XHJcbiAgICAgIHByZXZpZXdJbWFnZVVybFJlZi5jdXJyZW50ID0gbmV4dFVybDtcclxuICAgICAgcmV0dXJuIG5leHRVcmw7XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IGNsZWFyUHJldmlld0ltYWdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcHJldmlld0xvYWRQcm9taXNlUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgc2V0UHJldmlld0ltYWdlVXJsKChwcmV2aW91cykgPT4ge1xyXG4gICAgICBpZiAocHJldmlvdXMpIHtcclxuICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHByZXZpb3VzKTtcclxuICAgICAgfVxyXG4gICAgICBwcmV2aWV3SW1hZ2VVcmxSZWYuY3VycmVudCA9IFwiXCI7XHJcbiAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfSk7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBsb2FkUHJldmlld0ltYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCk6IFByb21pc2U8c3RyaW5nPiA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50RmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSBzYWZlVGV4dChzb3VyY2VVcmwpO1xyXG4gICAgaWYgKCFlbmFibGVkIHx8ICFjdXJyZW50RmlsZUlkIHx8ICFjdXJyZW50VXJsKSB7XHJcbiAgICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcclxuICAgICAgc2V0UHJldmlld0Vycm9yKFwiXCIpO1xyXG4gICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJldmlld0ltYWdlVXJsUmVmLmN1cnJlbnQpIHtcclxuICAgICAgcmV0dXJuIHByZXZpZXdJbWFnZVVybFJlZi5jdXJyZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudCkge1xyXG4gICAgICByZXR1cm4gcHJldmlld0xvYWRQcm9taXNlUmVmLmN1cnJlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdEtleSA9IGAke2N1cnJlbnRGaWxlSWR9X18ke2N1cnJlbnRVcmx9YDtcclxuICAgIHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPSByZXF1ZXN0S2V5O1xyXG4gICAgc2V0UHJldmlld0J1c3kodHJ1ZSk7XHJcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcblxyXG4gICAgY29uc3QgbmV4dFByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBmZXRjaEV4cGVuc2VTaGVldFRpY2tldFByZXZpZXdCbG9iKGN1cnJlbnRGaWxlSWQsIGN1cnJlbnRVcmwsIHtcclxuICAgICAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IG9iamVjdFVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgICAgICAgaWYgKHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgIT09IHJlcXVlc3RLZXkpIHtcclxuICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqZWN0VXJsKTtcclxuICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVwbGFjZVByZXZpZXdJbWFnZVVybChvYmplY3RVcmwpO1xyXG4gICAgICAgIHJldHVybiBvYmplY3RVcmw7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgaWYgKHByZXZpZXdSZXF1ZXN0S2V5UmVmLmN1cnJlbnQgPT09IHJlcXVlc3RLZXkpIHtcclxuICAgICAgICAgIHNldFByZXZpZXdFcnJvcihlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmIChwcmV2aWV3UmVxdWVzdEtleVJlZi5jdXJyZW50ID09PSByZXF1ZXN0S2V5KSB7XHJcbiAgICAgICAgICBzZXRQcmV2aWV3QnVzeShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByZXZpZXdMb2FkUHJvbWlzZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBwcmV2aWV3TG9hZFByb21pc2VSZWYuY3VycmVudCA9IG5leHRQcm9taXNlO1xyXG4gICAgcmV0dXJuIG5leHRQcm9taXNlO1xyXG4gIH0sIFtlbmFibGVkLCBmaWxlSWQsIHJlcGxhY2VQcmV2aWV3SW1hZ2VVcmwsIHNvdXJjZVVybF0pO1xyXG5cclxuICBjb25zdCBjbG9zZVByZXZpZXcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRQcmV2aWV3T3BlbihmYWxzZSk7XHJcbiAgICBzZXRQcmV2aWV3QnVzeShmYWxzZSk7XHJcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcbiAgICByZXNldFByZXZpZXdHZXN0dXJlKCk7XHJcbiAgfSwgW3Jlc2V0UHJldmlld0dlc3R1cmVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyUHJldmlld0ltYWdlKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtjbGVhclByZXZpZXdJbWFnZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcHJldmlld1JlcXVlc3RLZXlSZWYuY3VycmVudCA9IGAke3NhZmVUZXh0KGZpbGVJZCl9X18ke3NhZmVUZXh0KHNvdXJjZVVybCl9YDtcclxuICAgIHNldFByZXZpZXdPcGVuKGZhbHNlKTtcclxuICAgIHNldFByZXZpZXdCdXN5KGZhbHNlKTtcclxuICAgIHNldFByZXZpZXdFcnJvcihcIlwiKTtcclxuICAgIHJlc2V0UHJldmlld0dlc3R1cmUoKTtcclxuICAgIGNsZWFyUHJldmlld0ltYWdlKCk7XHJcblxyXG4gICAgaWYgKGVuYWJsZWQgJiYgc2FmZVRleHQoZmlsZUlkKSAmJiBzYWZlVGV4dChzb3VyY2VVcmwpKSB7XHJcbiAgICAgIHZvaWQgbG9hZFByZXZpZXdJbWFnZSgpO1xyXG4gICAgfVxyXG4gIH0sIFtjbGVhclByZXZpZXdJbWFnZSwgZW5hYmxlZCwgZmlsZUlkLCBsb2FkUHJldmlld0ltYWdlLCByZXNldFByZXZpZXdHZXN0dXJlLCBzb3VyY2VVcmxdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghcHJldmlld09wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvbktleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgIGNsb3NlUHJldmlldygpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gIH0sIFtwcmV2aWV3T3BlbiwgY2xvc2VQcmV2aWV3XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXByZXZpZXdPcGVuKSByZXR1cm47XHJcbiAgICBjb25zdCBzdXJmYWNlID0gcHJldmlld1N1cmZhY2VSZWYuY3VycmVudDtcclxuICAgIGlmICghc3VyZmFjZSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHByZXZlbnRHZXN0dXJlRGVmYXVsdCA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcHJldmVudFRvdWNoVmlld3BvcnRab29tID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC50b3VjaGVzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHByZXZlbnRDdHJsV2hlZWxWaWV3cG9ydFpvb20gPSAoZXZlbnQ6IFdoZWVsRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmN0cmxLZXkpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVzdGFydFwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQsIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcbiAgICBzdXJmYWNlLmFkZEV2ZW50TGlzdGVuZXIoXCJnZXN0dXJlY2hhbmdlXCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVlbmRcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0LCB7IHBhc3NpdmU6IGZhbHNlIH0pO1xyXG4gICAgc3VyZmFjZS5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHByZXZlbnRUb3VjaFZpZXdwb3J0Wm9vbSwgeyBwYXNzaXZlOiBmYWxzZSB9KTtcclxuICAgIHN1cmZhY2UuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIHByZXZlbnRDdHJsV2hlZWxWaWV3cG9ydFpvb20sIHsgcGFzc2l2ZTogZmFsc2UgfSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZ2VzdHVyZXN0YXJ0XCIsIHByZXZlbnRHZXN0dXJlRGVmYXVsdCk7XHJcbiAgICAgIHN1cmZhY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImdlc3R1cmVjaGFuZ2VcIiwgcHJldmVudEdlc3R1cmVEZWZhdWx0KTtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwiZ2VzdHVyZWVuZFwiLCBwcmV2ZW50R2VzdHVyZURlZmF1bHQpO1xyXG4gICAgICBzdXJmYWNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgcHJldmVudFRvdWNoVmlld3BvcnRab29tKTtcclxuICAgICAgc3VyZmFjZS5yZW1vdmVFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgcHJldmVudEN0cmxXaGVlbFZpZXdwb3J0Wm9vbSk7XHJcbiAgICB9O1xyXG4gIH0sIFtwcmV2aWV3T3Blbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVQcmV2aWV3UG9pbnRlckRvd24gPSB1c2VDYWxsYmFjayhcclxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpZXdJbWFnZVVybCB8fCBwcmV2aWV3QnVzeSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCBwb2ludDogVGlja2V0UHJldmlld1BvaW50ID0geyB4OiBldmVudC5jbGllbnRYLCB5OiBldmVudC5jbGllbnRZIH07XHJcbiAgICAgIHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LnNldChldmVudC5wb2ludGVySWQsIHBvaW50KTtcclxuICAgICAgaWYgKHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0LnNldFBvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLy8gSWdub3JlIGNhcHR1cmUgZmFpbHVyZXMgb24gYnJvd3NlcnMgdGhhdCBkbyBub3QgZnVsbHkgc3VwcG9ydCBwb2ludGVyIGNhcHR1cmUuXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuc2l6ZSA9PT0gMSkge1xyXG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBldmVudC5wb2ludGVySWQ7XHJcbiAgICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnQ7XHJcbiAgICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcclxuICAgIH0sXHJcbiAgICBbcHJldmlld0J1c3ksIHByZXZpZXdJbWFnZVVybCwgcmVidWlsZFBpbmNoU25hcHNob3RdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xyXG5cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgY29uc3QgcG9pbnQ6IFRpY2tldFByZXZpZXdQb2ludCA9IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9O1xyXG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5zZXQoZXZlbnQucG9pbnRlcklkLCBwb2ludCk7XHJcblxyXG4gICAgICBjb25zdCBwb2ludGVyRW50cmllcyA9IEFycmF5LmZyb20ocHJldmlld1BvaW50ZXJzUmVmLmN1cnJlbnQuZW50cmllcygpKTtcclxuICAgICAgY29uc3QgcG9pbnRlclBvaW50cyA9IHBvaW50ZXJFbnRyaWVzLm1hcCgoZW50cnkpID0+IGVudHJ5WzFdKTtcclxuXHJcbiAgICAgIGlmIChwb2ludGVyUG9pbnRzLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgaWYgKCFwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgICByZWJ1aWxkUGluY2hTbmFwc2hvdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc25hcHNob3QgPSBwcmV2aWV3UGluY2hTbmFwc2hvdFJlZi5jdXJyZW50O1xyXG4gICAgICAgIGlmICghc25hcHNob3QpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgW2xlZnQsIHJpZ2h0XSA9IHBvaW50ZXJQb2ludHM7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLm1heCgxLCBnZXRQcmV2aWV3UG9pbnREaXN0YW5jZShsZWZ0LCByaWdodCkpO1xyXG4gICAgICAgIGNvbnN0IHJhdGlvID0gZGlzdGFuY2UgLyBNYXRoLm1heCgxLCBzbmFwc2hvdC5kaXN0YW5jZSk7XHJcbiAgICAgICAgY29uc3QgbmV4dFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUoc25hcHNob3Quc2NhbGUgKiByYXRpbyk7XHJcbiAgICAgICAgY29uc3QgY2VudGVyID0gZ2V0UHJldmlld1BvaW50Q2VudGVyKGxlZnQsIHJpZ2h0KTtcclxuICAgICAgICBjb25zdCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgICAgICAgICB4OiBzbmFwc2hvdC50cmFuc2xhdGUueCArIChjZW50ZXIueCAtIHNuYXBzaG90LmNlbnRlci54KSxcclxuICAgICAgICAgIHk6IHNuYXBzaG90LnRyYW5zbGF0ZS55ICsgKGNlbnRlci55IC0gc25hcHNob3QuY2VudGVyLnkpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKG5leHRTY2FsZSwgbmV4dFRyYW5zbGF0ZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocG9pbnRlclBvaW50cy5sZW5ndGggIT09IDEgfHwgcHJldmlld1NjYWxlUmVmLmN1cnJlbnQgPD0gMSB8fCBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ICE9PSBldmVudC5wb2ludGVySWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGxhc3RQb2ludCA9IHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gcG9pbnQ7XHJcbiAgICAgIGlmICghbGFzdFBvaW50KSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBuZXh0VHJhbnNsYXRlOiBUaWNrZXRQcmV2aWV3UG9pbnQgPSB7XHJcbiAgICAgICAgeDogcHJldmlld1RyYW5zbGF0ZVJlZi5jdXJyZW50LnggKyAocG9pbnQueCAtIGxhc3RQb2ludC54KSxcclxuICAgICAgICB5OiBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQueSArIChwb2ludC55IC0gbGFzdFBvaW50LnkpLFxyXG4gICAgICB9O1xyXG4gICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0ocHJldmlld1NjYWxlUmVmLmN1cnJlbnQsIG5leHRUcmFuc2xhdGUpO1xyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdQb2ludGVyRW5kID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcclxuICAgICAgaWYgKCFwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5oYXMoZXZlbnQucG9pbnRlcklkKSkgcmV0dXJuO1xyXG4gICAgICBwcmV2aWV3UG9pbnRlcnNSZWYuY3VycmVudC5kZWxldGUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIHR5cGVvZiBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc1BvaW50ZXJDYXB0dXJlID09PSBcImZ1bmN0aW9uXCIgJiZcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0Lmhhc1BvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZClcclxuICAgICAgKSB7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5yZWxlYXNlUG9pbnRlckNhcHR1cmUoZXZlbnQucG9pbnRlcklkKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcG9pbnRlckVudHJpZXMgPSBBcnJheS5mcm9tKHByZXZpZXdQb2ludGVyc1JlZi5jdXJyZW50LmVudHJpZXMoKSk7XHJcbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIHByZXZpZXdQYW5Qb2ludGVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIHByZXZpZXdQYW5MYXN0UG9pbnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmVidWlsZFBpbmNoU25hcHNob3QoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChwb2ludGVyRW50cmllcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICBjb25zdCBbcG9pbnRlcklkLCBwb2ludGVyUG9pbnRdID0gcG9pbnRlckVudHJpZXNbMF07XHJcbiAgICAgICAgcHJldmlld1BhblBvaW50ZXJSZWYuY3VycmVudCA9IHBvaW50ZXJJZDtcclxuICAgICAgICBwcmV2aWV3UGFuTGFzdFBvaW50UmVmLmN1cnJlbnQgPSBwb2ludGVyUG9pbnQ7XHJcbiAgICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwcmV2aWV3UGFuUG9pbnRlclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1Bhbkxhc3RQb2ludFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgcHJldmlld1BpbmNoU25hcHNob3RSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIGlmIChwcmV2aWV3U2NhbGVSZWYuY3VycmVudCA8PSAxKSB7XHJcbiAgICAgICAgYXBwbHlQcmV2aWV3VHJhbnNmb3JtKDEsIHsgeDogMCwgeTogMCB9KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHJlYnVpbGRQaW5jaFNuYXBzaG90XVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVByZXZpZXdXaGVlbCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGV2ZW50OiBSZWFjdC5XaGVlbEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xyXG4gICAgICBpZiAoIXByZXZpZXdJbWFnZVVybCB8fCBwcmV2aWV3QnVzeSkgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgY29uc3QgZGlyZWN0aW9uID0gZXZlbnQuZGVsdGFZIDwgMCA/IDEgOiAtMTtcclxuICAgICAgY29uc3QgbmV4dFNjYWxlID0gY2xhbXBQcmV2aWV3U2NhbGUocHJldmlld1NjYWxlUmVmLmN1cnJlbnQgKyBkaXJlY3Rpb24gKiBQUkVWSUVXX1NDQUxFX1NURVApO1xyXG4gICAgICBhcHBseVByZXZpZXdUcmFuc2Zvcm0obmV4dFNjYWxlLCBwcmV2aWV3VHJhbnNsYXRlUmVmLmN1cnJlbnQpO1xyXG4gICAgfSxcclxuICAgIFthcHBseVByZXZpZXdUcmFuc2Zvcm0sIHByZXZpZXdCdXN5LCBwcmV2aWV3SW1hZ2VVcmxdXHJcbiAgKTtcclxuXHJcbiAgY29uc3Qgb3BlblByZXZpZXcgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBjb25zdCBjdXJyZW50RmlsZUlkID0gc2FmZVRleHQoZmlsZUlkKTtcclxuICAgIGNvbnN0IGN1cnJlbnRVcmwgPSBzYWZlVGV4dChzb3VyY2VVcmwpO1xyXG4gICAgaWYgKCFlbmFibGVkIHx8ICFjdXJyZW50RmlsZUlkIHx8ICFjdXJyZW50VXJsKSByZXR1cm47XHJcblxyXG4gICAgcmVzZXRQcmV2aWV3R2VzdHVyZSgpO1xyXG4gICAgc2V0UHJldmlld09wZW4odHJ1ZSk7XHJcbiAgICBzZXRQcmV2aWV3RXJyb3IoXCJcIik7XHJcblxyXG4gICAgYXdhaXQgbG9hZFByZXZpZXdJbWFnZSgpO1xyXG4gIH0sIFtlbmFibGVkLCBmaWxlSWQsIGxvYWRQcmV2aWV3SW1hZ2UsIHJlc2V0UHJldmlld0dlc3R1cmUsIHNvdXJjZVVybF0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcHJldmlld09wZW4sXHJcbiAgICBwcmV2aWV3QnVzeSxcclxuICAgIHByZXZpZXdFcnJvcixcclxuICAgIHByZXZpZXdJbWFnZVVybCxcclxuICAgIHByZXZpZXdTY2FsZSxcclxuICAgIHByZXZpZXdUcmFuc2xhdGUsXHJcbiAgICBwcmV2aWV3U3VyZmFjZVJlZixcclxuICAgIG9wZW5QcmV2aWV3LFxyXG4gICAgY2xvc2VQcmV2aWV3LFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJEb3duLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJNb3ZlLFxyXG4gICAgaGFuZGxlUHJldmlld1BvaW50ZXJFbmQsXHJcbiAgICBoYW5kbGVQcmV2aWV3V2hlZWwsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNLG1CQUFtQixvQkFBSSxJQUFZLENBQUMsT0FBTyxRQUFRLE9BQU8sUUFBUSxPQUFPLE9BQU8sUUFBUSxRQUFRLE1BQU0sQ0FBQztBQUU3RyxJQUFNLDJCQUEyQixDQUFDLFVBQTBCO0FBQzFELFFBQU0sU0FBUyxTQUFTLEtBQUssRUFBRSxZQUFZO0FBQzNDLE1BQUksQ0FBQyxPQUFRLFFBQU87QUFFcEIsUUFBTSxlQUFlLE9BQU8sTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDdEQsUUFBTSxRQUFRLGFBQWEsTUFBTSxHQUFHO0FBQ3BDLE1BQUksTUFBTSxTQUFTLEVBQUcsUUFBTztBQUU3QixRQUFNLFNBQVMsU0FBUyxNQUFNLE1BQU0sU0FBUyxDQUFDLENBQUMsRUFBRSxRQUFRLGNBQWMsRUFBRTtBQUN6RSxTQUFPLFdBQVcsU0FBUyxRQUFRO0FBQ3JDO0FBR08sSUFBTSxxQ0FBcUMsQ0FBQyxhQUE4QjtBQUMvRSxRQUFNLGdCQUFnQixTQUFTLFFBQVE7QUFDdkMsTUFBSSxDQUFDLGNBQWUsUUFBTztBQUUzQixNQUFJLGNBQWMsWUFBWSxFQUFFLFdBQVcsYUFBYSxFQUFHLFFBQU87QUFFbEUsUUFBTSxZQUFZLHlCQUF5QixhQUFhO0FBQ3hELE1BQUksYUFBYSxpQkFBaUIsSUFBSSxTQUFTLEVBQUcsUUFBTztBQUV6RCxRQUFNLGtCQUFrQixjQUFjLFlBQVk7QUFDbEQsTUFBSSxnQkFBZ0IsU0FBUyx1QkFBdUIsS0FBSyxnQkFBZ0IsU0FBUyxPQUFPLEVBQUcsUUFBTztBQUVuRyxTQUFPO0FBQ1Q7OztBQzdCQSx1QkFBNkI7QUF3Q3ZCO0FBbkJOLElB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
