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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyB1c2VGbG9hdGluZ1Bvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHNcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgYW5jaG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+O1xyXG4gIG9wZW46IGJvb2xlYW47XHJcbiAgekluZGV4PzogbnVtYmVyO1xyXG4gIGZpeGVkV2lkdGhQeD86IG51bWJlcjtcclxuICBtYXhIZWlnaHRDbGFzcz86IHN0cmluZztcclxuICByb3VuZGVkQ2xhc3M/OiBzdHJpbmc7XHJcbiAgcm9sZT86IHN0cmluZztcclxuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxufTtcclxuXHJcbmNvbnN0IEZsb2F0aW5nTGlzdCA9ICh7XHJcbiAgYW5jaG9yUmVmLFxyXG4gIG9wZW4sXHJcbiAgekluZGV4ID0gMzAwMDAwLFxyXG4gIGZpeGVkV2lkdGhQeCxcclxuICBtYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIixcclxuICByb3VuZGVkQ2xhc3MgPSBcInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCIsXHJcbiAgcm9sZSxcclxuICBwb3J0YWxDbGFzc05hbWUsXHJcbiAgcGFuZWxDbGFzc05hbWUsXHJcbiAgcGFuZWxTdHlsZSxcclxuICBjaGlsZHJlbixcclxufTogUHJvcHMpID0+IHtcclxuICBjb25zdCBzdHlsZSA9IHVzZUZsb2F0aW5nUG9zaXRpb24oYW5jaG9yUmVmLCBvcGVuKTtcclxuICBpZiAoIW9wZW4pIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBjcmVhdGVQb3J0YWwoXHJcbiAgICA8ZGl2XHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcclxuICAgICAgICB0b3A6IHN0eWxlLnRvcCxcclxuICAgICAgICBsZWZ0OiBzdHlsZS5sZWZ0LFxyXG4gICAgICAgIHdpZHRoOiB0eXBlb2YgZml4ZWRXaWR0aFB4ID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZShmaXhlZFdpZHRoUHgpID8gZml4ZWRXaWR0aFB4IDogc3R5bGUud2lkdGgsXHJcbiAgICAgICAgekluZGV4LFxyXG4gICAgICB9fVxyXG4gICAgICBjbGFzc05hbWU9e3BvcnRhbENsYXNzTmFtZX1cclxuICAgID5cclxuICAgICAgPGRpdlxyXG4gICAgICAgIHJvbGU9e3JvbGV9XHJcbiAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIG92ZXJmbG93LWF1dG8gJHtyb3VuZGVkQ2xhc3N9IGJnLXdoaXRlIHB5LTEgdGV4dC1zbSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke21heEhlaWdodENsYXNzfSAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cclxuICAgICAgICBzdHlsZT17cGFuZWxTdHlsZX1cclxuICAgICAgPlxyXG4gICAgICAgIHtjaGlsZHJlbn1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj4sXHJcbiAgICBkb2N1bWVudC5ib2R5XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nTGlzdDtcclxuIiwgImltcG9ydCB7IHVzZUxheW91dEVmZmVjdCwgdXNlU3RhdGUsIHR5cGUgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG50eXBlIEZsb2F0aW5nUGxhY2VtZW50ID0gXCJib3R0b21cIiB8IFwidG9wXCI7XHJcblxyXG50eXBlIEZsb2F0aW5nUG9zaXRpb25PcHRpb25zID0ge1xyXG4gIG92ZXJsYXlSZWY/OiBSZWZPYmplY3Q8SFRNTEVsZW1lbnQgfCBudWxsPjtcclxuICBvZmZzZXQ/OiBudW1iZXI7XHJcbiAgdmlld3BvcnRQYWRkaW5nPzogbnVtYmVyO1xyXG4gIGF1dG9GaXRWaWV3cG9ydD86IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIEZsb2F0aW5nUG9zaXRpb25TdHlsZSA9IHtcclxuICB0b3A6IG51bWJlcjtcclxuICBsZWZ0OiBudW1iZXI7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBtYXhIZWlnaHQ/OiBudW1iZXI7XHJcbiAgcGxhY2VtZW50OiBGbG9hdGluZ1BsYWNlbWVudDtcclxufTtcclxuXHJcbmNvbnN0IERFRkFVTFRfT0ZGU0VUX1BYID0gNjtcclxuY29uc3QgREVGQVVMVF9WSUVXUE9SVF9QQURESU5HX1BYID0gMTI7XHJcblxyXG5jb25zdCBjbGFtcCA9ICh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gIGlmIChtYXggPCBtaW4pIHJldHVybiBtaW47XHJcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCBtaW4pLCBtYXgpO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgYSBmaXhlZCBmbG9hdGluZyBwb3NpdGlvbiBhbmQgb3B0aW9uYWxseSBrZWVwcyB0aGUgb3ZlcmxheSBpbnNpZGUgdGhlIHZpZXdwb3J0LlxyXG5leHBvcnQgY29uc3QgdXNlRmxvYXRpbmdQb3NpdGlvbiA9IChcclxuICB0YXJnZXRSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4sXHJcbiAgb3BlbjogYm9vbGVhbixcclxuICB7XHJcbiAgICBvdmVybGF5UmVmLFxyXG4gICAgb2Zmc2V0ID0gREVGQVVMVF9PRkZTRVRfUFgsXHJcbiAgICB2aWV3cG9ydFBhZGRpbmcgPSBERUZBVUxUX1ZJRVdQT1JUX1BBRERJTkdfUFgsXHJcbiAgICBhdXRvRml0Vmlld3BvcnQgPSBmYWxzZSxcclxuICB9OiBGbG9hdGluZ1Bvc2l0aW9uT3B0aW9ucyA9IHt9XHJcbikgPT4ge1xyXG4gIGNvbnN0IFtzdHlsZSwgc2V0U3R5bGVdID0gdXNlU3RhdGU8RmxvYXRpbmdQb3NpdGlvblN0eWxlPih7XHJcbiAgICB0b3A6IDAsXHJcbiAgICBsZWZ0OiAwLFxyXG4gICAgd2lkdGg6IDAsXHJcbiAgICBtYXhIZWlnaHQ6IHVuZGVmaW5lZCxcclxuICAgIHBsYWNlbWVudDogXCJib3R0b21cIixcclxuICB9KTtcclxuXHJcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghb3BlbiB8fCAhdGFyZ2V0UmVmLmN1cnJlbnQpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlY3QgPSB0YXJnZXRSZWYuY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGlmICghcmVjdCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCAwO1xyXG4gICAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IDA7XHJcbiAgICAgIGNvbnN0IG92ZXJsYXlIZWlnaHQgPSBvdmVybGF5UmVmPy5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgfHwgMDtcclxuICAgICAgY29uc3QgbmV4dFdpZHRoID0gTWF0aC5taW4ocmVjdC53aWR0aCwgTWF0aC5tYXgoMCwgdmlld3BvcnRXaWR0aCAtIHZpZXdwb3J0UGFkZGluZyAqIDIpKTtcclxuICAgICAgY29uc3QgbmV4dExlZnQgPSBjbGFtcChyZWN0LmxlZnQsIHZpZXdwb3J0UGFkZGluZywgdmlld3BvcnRXaWR0aCAtIG5leHRXaWR0aCAtIHZpZXdwb3J0UGFkZGluZyk7XHJcblxyXG4gICAgICBpZiAoIWF1dG9GaXRWaWV3cG9ydCkge1xyXG4gICAgICAgIHNldFN0eWxlKHtcclxuICAgICAgICAgIHRvcDogcmVjdC5ib3R0b20gKyBvZmZzZXQsXHJcbiAgICAgICAgICBsZWZ0OiBuZXh0TGVmdCxcclxuICAgICAgICAgIHdpZHRoOiBuZXh0V2lkdGgsXHJcbiAgICAgICAgICBtYXhIZWlnaHQ6IHVuZGVmaW5lZCxcclxuICAgICAgICAgIHBsYWNlbWVudDogXCJib3R0b21cIixcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZUJlbG93ID0gTWF0aC5tYXgoMCwgdmlld3BvcnRIZWlnaHQgLSByZWN0LmJvdHRvbSAtIG9mZnNldCAtIHZpZXdwb3J0UGFkZGluZyk7XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZUFib3ZlID0gTWF0aC5tYXgoMCwgcmVjdC50b3AgLSBvZmZzZXQgLSB2aWV3cG9ydFBhZGRpbmcpO1xyXG4gICAgICBjb25zdCBwcmVmZXJyZWRQbGFjZW1lbnQ6IEZsb2F0aW5nUGxhY2VtZW50ID1cclxuICAgICAgICBvdmVybGF5SGVpZ2h0ID4gYXZhaWxhYmxlQmVsb3cgJiYgYXZhaWxhYmxlQWJvdmUgPiBhdmFpbGFibGVCZWxvdyA/IFwidG9wXCIgOiBcImJvdHRvbVwiO1xyXG4gICAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBwcmVmZXJyZWRQbGFjZW1lbnQgPT09IFwidG9wXCIgPyBhdmFpbGFibGVBYm92ZSA6IGF2YWlsYWJsZUJlbG93O1xyXG4gICAgICBjb25zdCBjb25zdHJhaW5lZEhlaWdodCA9XHJcbiAgICAgICAgYXZhaWxhYmxlSGVpZ2h0ID4gMCA/IE1hdGgubWluKG92ZXJsYXlIZWlnaHQgfHwgYXZhaWxhYmxlSGVpZ2h0LCBhdmFpbGFibGVIZWlnaHQpIDogTWF0aC5tYXgoMCwgdmlld3BvcnRIZWlnaHQgLSB2aWV3cG9ydFBhZGRpbmcgKiAyKTtcclxuICAgICAgY29uc3QgbmV4dFRvcCA9XHJcbiAgICAgICAgcHJlZmVycmVkUGxhY2VtZW50ID09PSBcInRvcFwiXHJcbiAgICAgICAgICA/IE1hdGgubWF4KHZpZXdwb3J0UGFkZGluZywgcmVjdC50b3AgLSBvZmZzZXQgLSBjb25zdHJhaW5lZEhlaWdodClcclxuICAgICAgICAgIDogTWF0aC5taW4oXHJcbiAgICAgICAgICAgICAgcmVjdC5ib3R0b20gKyBvZmZzZXQsXHJcbiAgICAgICAgICAgICAgTWF0aC5tYXgodmlld3BvcnRQYWRkaW5nLCB2aWV3cG9ydEhlaWdodCAtIGNvbnN0cmFpbmVkSGVpZ2h0IC0gdmlld3BvcnRQYWRkaW5nKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgc2V0U3R5bGUoe1xyXG4gICAgICAgIHRvcDogbmV4dFRvcCxcclxuICAgICAgICBsZWZ0OiBuZXh0TGVmdCxcclxuICAgICAgICB3aWR0aDogbmV4dFdpZHRoLFxyXG4gICAgICAgIG1heEhlaWdodDogTWF0aC5tYXgoMCwgcHJlZmVycmVkUGxhY2VtZW50ID09PSBcInRvcFwiID8gbmV4dFRvcCArIGNvbnN0cmFpbmVkSGVpZ2h0IC0gdmlld3BvcnRQYWRkaW5nIDogYXZhaWxhYmxlSGVpZ2h0KSxcclxuICAgICAgICBwbGFjZW1lbnQ6IHByZWZlcnJlZFBsYWNlbWVudCxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIHVwZGF0ZSgpO1xyXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiBvcGVuICYmIHVwZGF0ZSgpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgdHJ1ZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZSk7XHJcbiAgICB9O1xyXG4gIH0sIFtvcGVuLCB0YXJnZXRSZWZdKTtcclxuXHJcbiAgcmV0dXJuIHN0eWxlO1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25Eb3duU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTkuNSA4LjI1LTcuNSA3LjUtNy41LTcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25VcFN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTQuNSAxNS43NSA3LjUtNy41IDcuNSA3LjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufTtcclxuXHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHVzZU91dHNpZGVDbGljayA9IChcclxuICByZWZzOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+IHwgQXJyYXk8UmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50Pj4sXHJcbiAgb25DbG9zZTogKCkgPT4gdm9pZFxyXG4pID0+IHtcclxuICBjb25zdCBsaXN0ID0gdXNlTWVtbygoKSA9PiAoQXJyYXkuaXNBcnJheShyZWZzKSA/IHJlZnMgOiBbcmVmc10pLCBbcmVmc10pO1xyXG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWYobGlzdCk7XHJcbiAgY29uc3Qgb25DbG9zZVJlZiA9IHVzZVJlZihvbkNsb3NlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGxpc3RSZWYuY3VycmVudCA9IGxpc3Q7XHJcbiAgfSwgW2xpc3RdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIG9uQ2xvc2VSZWYuY3VycmVudCA9IG9uQ2xvc2U7XHJcbiAgfSwgW29uQ2xvc2VdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGhhbmRsZXIgPSAoZXY6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRMaXN0ID0gbGlzdFJlZi5jdXJyZW50O1xyXG4gICAgICBjb25zdCBpc0luc2lkZSA9IGN1cnJlbnRMaXN0LnNvbWUoKHIpID0+IHI/LmN1cnJlbnQgJiYgci5jdXJyZW50LmNvbnRhaW5zKGV2LnRhcmdldCBhcyBOb2RlKSk7XHJcbiAgICAgIGlmIChpc0luc2lkZSkgcmV0dXJuO1xyXG4gICAgICBvbkNsb3NlUmVmLmN1cnJlbnQoKTtcclxuICAgIH07XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVyKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXIsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyKTtcclxuICAgIH07XHJcbiAgfSwgW10pO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQ0EsdUJBQTZCOzs7QUNEN0IsbUJBQTBEO0FBbUIxRCxJQUFNLG9CQUFvQjtBQUMxQixJQUFNLDhCQUE4QjtBQUVwQyxJQUFNLFFBQVEsQ0FBQyxPQUFlLEtBQWEsUUFBd0I7QUFDakUsTUFBSSxNQUFNLElBQUssUUFBTztBQUN0QixTQUFPLEtBQUssSUFBSSxLQUFLLElBQUksT0FB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
