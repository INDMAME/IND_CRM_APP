import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/commons/FloatingList.tsx
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/useFloatingPosition.ts
var import_react = __toESM(require_react());
var DEFAULT_OFFSET_PX = 6;
var DEFAULT_VIEWPORT_PADDING_PX = 12;
var clamp = (value, min, max) => {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
};
var useFloatingPosition = (targetRef, open, {
  overlayRef,
  offset = DEFAULT_OFFSET_PX,
  viewportPadding = DEFAULT_VIEWPORT_PADDING_PX,
  autoFitViewport = false
} = {}) => {
  const [style, setStyle] = (0, import_react.useState)({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: void 0,
    placement: "bottom"
  });
  (0, import_react.useLayoutEffect)(() => {
    if (!open || !targetRef.current) return;
    const update = () => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (!rect) return;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const overlayHeight = overlayRef?.current?.getBoundingClientRect().height || 0;
      const nextWidth = Math.min(rect.width, Math.max(0, viewportWidth - viewportPadding * 2));
      const nextLeft = clamp(rect.left, viewportPadding, viewportWidth - nextWidth - viewportPadding);
      if (!autoFitViewport) {
        setStyle({
          top: rect.bottom + offset,
          left: nextLeft,
          width: nextWidth,
          maxHeight: void 0,
          placement: "bottom"
        });
        return;
      }
      const availableBelow = Math.max(0, viewportHeight - rect.bottom - offset - viewportPadding);
      const availableAbove = Math.max(0, rect.top - offset - viewportPadding);
      const preferredPlacement = overlayHeight > availableBelow && availableAbove > availableBelow ? "top" : "bottom";
      const availableHeight = preferredPlacement === "top" ? availableAbove : availableBelow;
      const constrainedHeight = availableHeight > 0 ? Math.min(overlayHeight || availableHeight, availableHeight) : Math.max(0, viewportHeight - viewportPadding * 2);
      const nextTop = preferredPlacement === "top" ? Math.max(viewportPadding, rect.top - offset - constrainedHeight) : Math.min(
        rect.bottom + offset,
        Math.max(viewportPadding, viewportHeight - constrainedHeight - viewportPadding)
      );
      setStyle({
        top: nextTop,
        left: nextLeft,
        width: nextWidth,
        maxHeight: Math.max(0, preferredPlacement === "top" ? nextTop + constrainedHeight - viewportPadding : availableHeight),
        placement: preferredPlacement
      });
    };
    update();
    const onScroll = () => open && update();
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", update);
    };
  }, [open, targetRef]);
  return style;
};

// Web/wwwroot/react/src/components/commons/FloatingList.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var FloatingList = ({
  anchorRef,
  open,
  zIndex = 3e5,
  fixedWidthPx,
  maxHeightClass = "max-h-72",
  roundedClass = "rounded-[var(--radius-xl)]",
  role,
  portalClassName,
  panelClassName,
  panelStyle,
  children
}) => {
  const style = useFloatingPosition(anchorRef, open);
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          position: "fixed",
          top: style.top,
          left: style.left,
          width: typeof fixedWidthPx === "number" && Number.isFinite(fixedWidthPx) ? fixedWidthPx : style.width,
          zIndex
        },
        className: portalClassName,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            role,
            className: `w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass} ${panelClassName || ""}`,
            style: panelStyle,
            children
          }
        )
      }
    ),
    document.body
  );
};
var FloatingList_default = FloatingList;

// Web/wwwroot/react/src/components/commons/chevrons.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ChevronDownSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" })
    }
  );
};
var ChevronUpSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" })
    }
  );
};

// Web/wwwroot/react/src/hooks/useOutsideClick.ts
var import_react2 = __toESM(require_react());
var useOutsideClick = (refs, onClose) => {
  const list = (0, import_react2.useMemo)(() => Array.isArray(refs) ? refs : [refs], [refs]);
  const listRef = (0, import_react2.useRef)(list);
  const onCloseRef = (0, import_react2.useRef)(onClose);
  (0, import_react2.useEffect)(() => {
    listRef.current = list;
  }, [list]);
  (0, import_react2.useEffect)(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  (0, import_react2.useEffect)(() => {
    const handler = (ev) => {
      const currentList = listRef.current;
      const isInside = currentList.some((r) => r?.current && r.current.contains(ev.target));
      if (isInside) return;
      onCloseRef.current();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);
};

export {
  useFloatingPosition,
  FloatingList_default,
  ChevronDownSvg,
  ChevronUpSvg,
  useOutsideClick
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyB1c2VGbG9hdGluZ1Bvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHNcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgYW5jaG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+O1xyXG4gIG9wZW46IGJvb2xlYW47XHJcbiAgekluZGV4PzogbnVtYmVyO1xyXG4gIGZpeGVkV2lkdGhQeD86IG51bWJlcjtcclxuICBtYXhIZWlnaHRDbGFzcz86IHN0cmluZztcclxuICByb3VuZGVkQ2xhc3M/OiBzdHJpbmc7XHJcbiAgcm9sZT86IHN0cmluZztcclxuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxufTtcclxuXHJcbmNvbnN0IEZsb2F0aW5nTGlzdCA9ICh7XHJcbiAgYW5jaG9yUmVmLFxyXG4gIG9wZW4sXHJcbiAgekluZGV4ID0gMzAwMDAwLFxyXG4gIGZpeGVkV2lkdGhQeCxcclxuICBtYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIixcclxuICByb3VuZGVkQ2xhc3MgPSBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCIsXG4gIHJvbGUsXHJcbiAgcG9ydGFsQ2xhc3NOYW1lLFxyXG4gIHBhbmVsQ2xhc3NOYW1lLFxyXG4gIHBhbmVsU3R5bGUsXHJcbiAgY2hpbGRyZW4sXHJcbn06IFByb3BzKSA9PiB7XHJcbiAgY29uc3Qgc3R5bGUgPSB1c2VGbG9hdGluZ1Bvc2l0aW9uKGFuY2hvclJlZiwgb3Blbik7XHJcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxyXG4gICAgPGRpdlxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICAgICAgdG9wOiBzdHlsZS50b3AsXHJcbiAgICAgICAgbGVmdDogc3R5bGUubGVmdCxcclxuICAgICAgICB3aWR0aDogdHlwZW9mIGZpeGVkV2lkdGhQeCA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUoZml4ZWRXaWR0aFB4KSA/IGZpeGVkV2lkdGhQeCA6IHN0eWxlLndpZHRoLFxyXG4gICAgICAgIHpJbmRleCxcclxuICAgICAgfX1cclxuICAgICAgY2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XHJcbiAgICA+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICByb2xlPXtyb2xlfVxyXG4gICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBvdmVyZmxvdy1hdXRvICR7cm91bmRlZENsYXNzfSBiZy13aGl0ZSBweS0xIHRleHQtc20gc2hhZG93LWxnIHJpbmctMSByaW5nLWJsYWNrLzUgZm9jdXM6b3V0bGluZS1oaWRkZW4gJHttYXhIZWlnaHRDbGFzc30gJHtwYW5lbENsYXNzTmFtZSB8fCBcIlwifWB9XHJcbiAgICAgICAgc3R5bGU9e3BhbmVsU3R5bGV9XHJcbiAgICAgID5cclxuICAgICAgICB7Y2hpbGRyZW59XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+LFxyXG4gICAgZG9jdW1lbnQuYm9keVxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0xpc3Q7XHJcbiIsICJpbXBvcnQgeyB1c2VMYXlvdXRFZmZlY3QsIHVzZVN0YXRlLCB0eXBlIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxudHlwZSBGbG9hdGluZ1BsYWNlbWVudCA9IFwiYm90dG9tXCIgfCBcInRvcFwiO1xyXG5cclxudHlwZSBGbG9hdGluZ1Bvc2l0aW9uT3B0aW9ucyA9IHtcclxuICBvdmVybGF5UmVmPzogUmVmT2JqZWN0PEhUTUxFbGVtZW50IHwgbnVsbD47XHJcbiAgb2Zmc2V0PzogbnVtYmVyO1xyXG4gIHZpZXdwb3J0UGFkZGluZz86IG51bWJlcjtcclxuICBhdXRvRml0Vmlld3BvcnQ/OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBGbG9hdGluZ1Bvc2l0aW9uU3R5bGUgPSB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgbWF4SGVpZ2h0PzogbnVtYmVyO1xyXG4gIHBsYWNlbWVudDogRmxvYXRpbmdQbGFjZW1lbnQ7XHJcbn07XHJcblxyXG5jb25zdCBERUZBVUxUX09GRlNFVF9QWCA9IDY7XHJcbmNvbnN0IERFRkFVTFRfVklFV1BPUlRfUEFERElOR19QWCA9IDEyO1xyXG5cclxuY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICBpZiAobWF4IDwgbWluKSByZXR1cm4gbWluO1xyXG4gIHJldHVybiBNYXRoLm1pbihNYXRoLm1heCh2YWx1ZSwgbWluKSwgbWF4KTtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIGEgZml4ZWQgZmxvYXRpbmcgcG9zaXRpb24gYW5kIG9wdGlvbmFsbHkga2VlcHMgdGhlIG92ZXJsYXkgaW5zaWRlIHRoZSB2aWV3cG9ydC5cclxuZXhwb3J0IGNvbnN0IHVzZUZsb2F0aW5nUG9zaXRpb24gPSAoXHJcbiAgdGFyZ2V0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+LFxyXG4gIG9wZW46IGJvb2xlYW4sXHJcbiAge1xyXG4gICAgb3ZlcmxheVJlZixcclxuICAgIG9mZnNldCA9IERFRkFVTFRfT0ZGU0VUX1BYLFxyXG4gICAgdmlld3BvcnRQYWRkaW5nID0gREVGQVVMVF9WSUVXUE9SVF9QQURESU5HX1BYLFxyXG4gICAgYXV0b0ZpdFZpZXdwb3J0ID0gZmFsc2UsXHJcbiAgfTogRmxvYXRpbmdQb3NpdGlvbk9wdGlvbnMgPSB7fVxyXG4pID0+IHtcclxuICBjb25zdCBbc3R5bGUsIHNldFN0eWxlXSA9IHVzZVN0YXRlPEZsb2F0aW5nUG9zaXRpb25TdHlsZT4oe1xyXG4gICAgdG9wOiAwLFxyXG4gICAgbGVmdDogMCxcclxuICAgIHdpZHRoOiAwLFxyXG4gICAgbWF4SGVpZ2h0OiB1bmRlZmluZWQsXHJcbiAgICBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsXHJcbiAgfSk7XHJcblxyXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIW9wZW4gfHwgIXRhcmdldFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCByZWN0ID0gdGFyZ2V0UmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBpZiAoIXJlY3QpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgMDtcclxuICAgICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCAwO1xyXG4gICAgICBjb25zdCBvdmVybGF5SGVpZ2h0ID0gb3ZlcmxheVJlZj8uY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IHx8IDA7XHJcbiAgICAgIGNvbnN0IG5leHRXaWR0aCA9IE1hdGgubWluKHJlY3Qud2lkdGgsIE1hdGgubWF4KDAsIHZpZXdwb3J0V2lkdGggLSB2aWV3cG9ydFBhZGRpbmcgKiAyKSk7XHJcbiAgICAgIGNvbnN0IG5leHRMZWZ0ID0gY2xhbXAocmVjdC5sZWZ0LCB2aWV3cG9ydFBhZGRpbmcsIHZpZXdwb3J0V2lkdGggLSBuZXh0V2lkdGggLSB2aWV3cG9ydFBhZGRpbmcpO1xyXG5cclxuICAgICAgaWYgKCFhdXRvRml0Vmlld3BvcnQpIHtcclxuICAgICAgICBzZXRTdHlsZSh7XHJcbiAgICAgICAgICB0b3A6IHJlY3QuYm90dG9tICsgb2Zmc2V0LFxyXG4gICAgICAgICAgbGVmdDogbmV4dExlZnQsXHJcbiAgICAgICAgICB3aWR0aDogbmV4dFdpZHRoLFxyXG4gICAgICAgICAgbWF4SGVpZ2h0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBhdmFpbGFibGVCZWxvdyA9IE1hdGgubWF4KDAsIHZpZXdwb3J0SGVpZ2h0IC0gcmVjdC5ib3R0b20gLSBvZmZzZXQgLSB2aWV3cG9ydFBhZGRpbmcpO1xyXG4gICAgICBjb25zdCBhdmFpbGFibGVBYm92ZSA9IE1hdGgubWF4KDAsIHJlY3QudG9wIC0gb2Zmc2V0IC0gdmlld3BvcnRQYWRkaW5nKTtcclxuICAgICAgY29uc3QgcHJlZmVycmVkUGxhY2VtZW50OiBGbG9hdGluZ1BsYWNlbWVudCA9XHJcbiAgICAgICAgb3ZlcmxheUhlaWdodCA+IGF2YWlsYWJsZUJlbG93ICYmIGF2YWlsYWJsZUFib3ZlID4gYXZhaWxhYmxlQmVsb3cgPyBcInRvcFwiIDogXCJib3R0b21cIjtcclxuICAgICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gcHJlZmVycmVkUGxhY2VtZW50ID09PSBcInRvcFwiID8gYXZhaWxhYmxlQWJvdmUgOiBhdmFpbGFibGVCZWxvdztcclxuICAgICAgY29uc3QgY29uc3RyYWluZWRIZWlnaHQgPVxyXG4gICAgICAgIGF2YWlsYWJsZUhlaWdodCA+IDAgPyBNYXRoLm1pbihvdmVybGF5SGVpZ2h0IHx8IGF2YWlsYWJsZUhlaWdodCwgYXZhaWxhYmxlSGVpZ2h0KSA6IE1hdGgubWF4KDAsIHZpZXdwb3J0SGVpZ2h0IC0gdmlld3BvcnRQYWRkaW5nICogMik7XHJcbiAgICAgIGNvbnN0IG5leHRUb3AgPVxyXG4gICAgICAgIHByZWZlcnJlZFBsYWNlbWVudCA9PT0gXCJ0b3BcIlxyXG4gICAgICAgICAgPyBNYXRoLm1heCh2aWV3cG9ydFBhZGRpbmcsIHJlY3QudG9wIC0gb2Zmc2V0IC0gY29uc3RyYWluZWRIZWlnaHQpXHJcbiAgICAgICAgICA6IE1hdGgubWluKFxyXG4gICAgICAgICAgICAgIHJlY3QuYm90dG9tICsgb2Zmc2V0LFxyXG4gICAgICAgICAgICAgIE1hdGgubWF4KHZpZXdwb3J0UGFkZGluZywgdmlld3BvcnRIZWlnaHQgLSBjb25zdHJhaW5lZEhlaWdodCAtIHZpZXdwb3J0UGFkZGluZylcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgIHNldFN0eWxlKHtcclxuICAgICAgICB0b3A6IG5leHRUb3AsXHJcbiAgICAgICAgbGVmdDogbmV4dExlZnQsXHJcbiAgICAgICAgd2lkdGg6IG5leHRXaWR0aCxcclxuICAgICAgICBtYXhIZWlnaHQ6IE1hdGgubWF4KDAsIHByZWZlcnJlZFBsYWNlbWVudCA9PT0gXCJ0b3BcIiA/IG5leHRUb3AgKyBjb25zdHJhaW5lZEhlaWdodCAtIHZpZXdwb3J0UGFkZGluZyA6IGF2YWlsYWJsZUhlaWdodCksXHJcbiAgICAgICAgcGxhY2VtZW50OiBwcmVmZXJyZWRQbGFjZW1lbnQsXHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGUoKTtcclxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4gb3BlbiAmJiB1cGRhdGUoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB7IGNhcHR1cmU6IHRydWUsIHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGUpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHRydWUpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGUpO1xyXG4gICAgfTtcclxuICB9LCBbb3BlbiwgdGFyZ2V0UmVmXSk7XHJcblxyXG4gIHJldHVybiBzdHlsZTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uRG93blN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE5LjUgOC4yNS03LjUgNy41LTcuNS03LjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uVXBTdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm00LjUgMTUuNzUgNy41LTcuNSA3LjUgNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VPdXRzaWRlQ2xpY2sgPSAoXHJcbiAgcmVmczogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PiB8IEFycmF5PFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4+LFxyXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWRcclxuKSA9PiB7XHJcbiAgY29uc3QgbGlzdCA9IHVzZU1lbW8oKCkgPT4gKEFycmF5LmlzQXJyYXkocmVmcykgPyByZWZzIDogW3JlZnNdKSwgW3JlZnNdKTtcclxuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmKGxpc3QpO1xyXG4gIGNvbnN0IG9uQ2xvc2VSZWYgPSB1c2VSZWYob25DbG9zZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsaXN0UmVmLmN1cnJlbnQgPSBsaXN0O1xyXG4gIH0sIFtsaXN0XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBvbkNsb3NlUmVmLmN1cnJlbnQgPSBvbkNsb3NlO1xyXG4gIH0sIFtvbkNsb3NlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVyID0gKGV2OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW50TGlzdCA9IGxpc3RSZWYuY3VycmVudDtcclxuICAgICAgY29uc3QgaXNJbnNpZGUgPSBjdXJyZW50TGlzdC5zb21lKChyKSA9PiByPy5jdXJyZW50ICYmIHIuY3VycmVudC5jb250YWlucyhldi50YXJnZXQgYXMgTm9kZSkpO1xyXG4gICAgICBpZiAoaXNJbnNpZGUpIHJldHVybjtcclxuICAgICAgb25DbG9zZVJlZi5jdXJyZW50KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVyKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlcik7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUNBLHVCQUE2Qjs7O0FDRDdCLG1CQUEwRDtBQW1CMUQsSUFBTSxvQkFBb0I7QUFDMUIsSUFBTSw4QkFBOEI7QUFFcEMsSUFBTSxRQUFRLENBQUMsT0FBZSxLQUFhLFFBQXdCO0FBQ2pFLE1BQUksTUFBTSxJQUFLLFFBQU87QUFDdEIsU0FBTyxLQUFLLElBQUksS0FBSyxJQUFJLE9BQU8s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
