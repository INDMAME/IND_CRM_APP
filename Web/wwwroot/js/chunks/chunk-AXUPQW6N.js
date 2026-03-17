import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

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
  roundedClass = "rounded-md",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRmxvYXRpbmdQb3NpdGlvbi50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBhbmNob3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD47XG4gIG9wZW46IGJvb2xlYW47XG4gIHpJbmRleD86IG51bWJlcjtcbiAgZml4ZWRXaWR0aFB4PzogbnVtYmVyO1xuICBtYXhIZWlnaHRDbGFzcz86IHN0cmluZztcbiAgcm91bmRlZENsYXNzPzogc3RyaW5nO1xuICByb2xlPzogc3RyaW5nO1xuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbFN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cbmNvbnN0IEZsb2F0aW5nTGlzdCA9ICh7XG4gIGFuY2hvclJlZixcbiAgb3BlbixcbiAgekluZGV4ID0gMzAwMDAwLFxuICBmaXhlZFdpZHRoUHgsXG4gIG1heEhlaWdodENsYXNzID0gXCJtYXgtaC03MlwiLFxuICByb3VuZGVkQ2xhc3MgPSBcInJvdW5kZWQtbWRcIixcbiAgcm9sZSxcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbiAgcGFuZWxTdHlsZSxcbiAgY2hpbGRyZW4sXG59OiBQcm9wcykgPT4ge1xuICBjb25zdCBzdHlsZSA9IHVzZUZsb2F0aW5nUG9zaXRpb24oYW5jaG9yUmVmLCBvcGVuKTtcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcbiAgICA8ZGl2XG4gICAgICBzdHlsZT17e1xuICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxuICAgICAgICB0b3A6IHN0eWxlLnRvcCxcbiAgICAgICAgbGVmdDogc3R5bGUubGVmdCxcbiAgICAgICAgd2lkdGg6IHR5cGVvZiBmaXhlZFdpZHRoUHggPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKGZpeGVkV2lkdGhQeCkgPyBmaXhlZFdpZHRoUHggOiBzdHlsZS53aWR0aCxcbiAgICAgICAgekluZGV4LFxuICAgICAgfX1cbiAgICAgIGNsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxuICAgID5cbiAgICAgIDxkaXZcbiAgICAgICAgcm9sZT17cm9sZX1cbiAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIG92ZXJmbG93LWF1dG8gJHtyb3VuZGVkQ2xhc3N9IGJnLXdoaXRlIHB5LTEgdGV4dC1zbSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke21heEhlaWdodENsYXNzfSAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cbiAgICAgICAgc3R5bGU9e3BhbmVsU3R5bGV9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PixcbiAgICBkb2N1bWVudC5ib2R5XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0xpc3Q7XG4iLCAiaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0LCB1c2VTdGF0ZSwgdHlwZSBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBGbG9hdGluZ1BsYWNlbWVudCA9IFwiYm90dG9tXCIgfCBcInRvcFwiO1xuXG50eXBlIEZsb2F0aW5nUG9zaXRpb25PcHRpb25zID0ge1xuICBvdmVybGF5UmVmPzogUmVmT2JqZWN0PEhUTUxFbGVtZW50IHwgbnVsbD47XG4gIG9mZnNldD86IG51bWJlcjtcbiAgdmlld3BvcnRQYWRkaW5nPzogbnVtYmVyO1xuICBhdXRvRml0Vmlld3BvcnQ/OiBib29sZWFuO1xufTtcblxudHlwZSBGbG9hdGluZ1Bvc2l0aW9uU3R5bGUgPSB7XG4gIHRvcDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG4gIHdpZHRoOiBudW1iZXI7XG4gIG1heEhlaWdodD86IG51bWJlcjtcbiAgcGxhY2VtZW50OiBGbG9hdGluZ1BsYWNlbWVudDtcbn07XG5cbmNvbnN0IERFRkFVTFRfT0ZGU0VUX1BYID0gNjtcbmNvbnN0IERFRkFVTFRfVklFV1BPUlRfUEFERElOR19QWCA9IDEyO1xuXG5jb25zdCBjbGFtcCA9ICh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBpZiAobWF4IDwgbWluKSByZXR1cm4gbWluO1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XG59O1xuXG4vLyBSZXNvbHZlcyBhIGZpeGVkIGZsb2F0aW5nIHBvc2l0aW9uIGFuZCBvcHRpb25hbGx5IGtlZXBzIHRoZSBvdmVybGF5IGluc2lkZSB0aGUgdmlld3BvcnQuXG5leHBvcnQgY29uc3QgdXNlRmxvYXRpbmdQb3NpdGlvbiA9IChcbiAgdGFyZ2V0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+LFxuICBvcGVuOiBib29sZWFuLFxuICB7XG4gICAgb3ZlcmxheVJlZixcbiAgICBvZmZzZXQgPSBERUZBVUxUX09GRlNFVF9QWCxcbiAgICB2aWV3cG9ydFBhZGRpbmcgPSBERUZBVUxUX1ZJRVdQT1JUX1BBRERJTkdfUFgsXG4gICAgYXV0b0ZpdFZpZXdwb3J0ID0gZmFsc2UsXG4gIH06IEZsb2F0aW5nUG9zaXRpb25PcHRpb25zID0ge31cbikgPT4ge1xuICBjb25zdCBbc3R5bGUsIHNldFN0eWxlXSA9IHVzZVN0YXRlPEZsb2F0aW5nUG9zaXRpb25TdHlsZT4oe1xuICAgIHRvcDogMCxcbiAgICBsZWZ0OiAwLFxuICAgIHdpZHRoOiAwLFxuICAgIG1heEhlaWdodDogdW5kZWZpbmVkLFxuICAgIHBsYWNlbWVudDogXCJib3R0b21cIixcbiAgfSk7XG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4gfHwgIXRhcmdldFJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PiB7XG4gICAgICBjb25zdCByZWN0ID0gdGFyZ2V0UmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgaWYgKCFyZWN0KSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgMDtcbiAgICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgMDtcbiAgICAgIGNvbnN0IG92ZXJsYXlIZWlnaHQgPSBvdmVybGF5UmVmPy5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgfHwgMDtcbiAgICAgIGNvbnN0IG5leHRXaWR0aCA9IE1hdGgubWluKHJlY3Qud2lkdGgsIE1hdGgubWF4KDAsIHZpZXdwb3J0V2lkdGggLSB2aWV3cG9ydFBhZGRpbmcgKiAyKSk7XG4gICAgICBjb25zdCBuZXh0TGVmdCA9IGNsYW1wKHJlY3QubGVmdCwgdmlld3BvcnRQYWRkaW5nLCB2aWV3cG9ydFdpZHRoIC0gbmV4dFdpZHRoIC0gdmlld3BvcnRQYWRkaW5nKTtcblxuICAgICAgaWYgKCFhdXRvRml0Vmlld3BvcnQpIHtcbiAgICAgICAgc2V0U3R5bGUoe1xuICAgICAgICAgIHRvcDogcmVjdC5ib3R0b20gKyBvZmZzZXQsXG4gICAgICAgICAgbGVmdDogbmV4dExlZnQsXG4gICAgICAgICAgd2lkdGg6IG5leHRXaWR0aCxcbiAgICAgICAgICBtYXhIZWlnaHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGF2YWlsYWJsZUJlbG93ID0gTWF0aC5tYXgoMCwgdmlld3BvcnRIZWlnaHQgLSByZWN0LmJvdHRvbSAtIG9mZnNldCAtIHZpZXdwb3J0UGFkZGluZyk7XG4gICAgICBjb25zdCBhdmFpbGFibGVBYm92ZSA9IE1hdGgubWF4KDAsIHJlY3QudG9wIC0gb2Zmc2V0IC0gdmlld3BvcnRQYWRkaW5nKTtcbiAgICAgIGNvbnN0IHByZWZlcnJlZFBsYWNlbWVudDogRmxvYXRpbmdQbGFjZW1lbnQgPVxuICAgICAgICBvdmVybGF5SGVpZ2h0ID4gYXZhaWxhYmxlQmVsb3cgJiYgYXZhaWxhYmxlQWJvdmUgPiBhdmFpbGFibGVCZWxvdyA/IFwidG9wXCIgOiBcImJvdHRvbVwiO1xuICAgICAgY29uc3QgYXZhaWxhYmxlSGVpZ2h0ID0gcHJlZmVycmVkUGxhY2VtZW50ID09PSBcInRvcFwiID8gYXZhaWxhYmxlQWJvdmUgOiBhdmFpbGFibGVCZWxvdztcbiAgICAgIGNvbnN0IGNvbnN0cmFpbmVkSGVpZ2h0ID1cbiAgICAgICAgYXZhaWxhYmxlSGVpZ2h0ID4gMCA/IE1hdGgubWluKG92ZXJsYXlIZWlnaHQgfHwgYXZhaWxhYmxlSGVpZ2h0LCBhdmFpbGFibGVIZWlnaHQpIDogTWF0aC5tYXgoMCwgdmlld3BvcnRIZWlnaHQgLSB2aWV3cG9ydFBhZGRpbmcgKiAyKTtcbiAgICAgIGNvbnN0IG5leHRUb3AgPVxuICAgICAgICBwcmVmZXJyZWRQbGFjZW1lbnQgPT09IFwidG9wXCJcbiAgICAgICAgICA/IE1hdGgubWF4KHZpZXdwb3J0UGFkZGluZywgcmVjdC50b3AgLSBvZmZzZXQgLSBjb25zdHJhaW5lZEhlaWdodClcbiAgICAgICAgICA6IE1hdGgubWluKFxuICAgICAgICAgICAgICByZWN0LmJvdHRvbSArIG9mZnNldCxcbiAgICAgICAgICAgICAgTWF0aC5tYXgodmlld3BvcnRQYWRkaW5nLCB2aWV3cG9ydEhlaWdodCAtIGNvbnN0cmFpbmVkSGVpZ2h0IC0gdmlld3BvcnRQYWRkaW5nKVxuICAgICAgICAgICAgKTtcblxuICAgICAgc2V0U3R5bGUoe1xuICAgICAgICB0b3A6IG5leHRUb3AsXG4gICAgICAgIGxlZnQ6IG5leHRMZWZ0LFxuICAgICAgICB3aWR0aDogbmV4dFdpZHRoLFxuICAgICAgICBtYXhIZWlnaHQ6IE1hdGgubWF4KDAsIHByZWZlcnJlZFBsYWNlbWVudCA9PT0gXCJ0b3BcIiA/IG5leHRUb3AgKyBjb25zdHJhaW5lZEhlaWdodCAtIHZpZXdwb3J0UGFkZGluZyA6IGF2YWlsYWJsZUhlaWdodCksXG4gICAgICAgIHBsYWNlbWVudDogcHJlZmVycmVkUGxhY2VtZW50LFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHVwZGF0ZSgpO1xuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4gb3BlbiAmJiB1cGRhdGUoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZSk7XG4gICAgfTtcbiAgfSwgW29wZW4sIHRhcmdldFJlZl0pO1xuXG4gIHJldHVybiBzdHlsZTtcbn07XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25Eb3duU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTkuNSA4LjI1LTcuNSA3LjUtNy41LTcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IENoZXZyb25VcFN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTQuNSAxNS43NSA3LjUtNy41IDcuNSA3LjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufTtcclxuXHJcbiIsICJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgY29uc3QgdXNlT3V0c2lkZUNsaWNrID0gKFxuICByZWZzOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+IHwgQXJyYXk8UmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50Pj4sXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWRcbikgPT4ge1xuICBjb25zdCBsaXN0ID0gdXNlTWVtbygoKSA9PiAoQXJyYXkuaXNBcnJheShyZWZzKSA/IHJlZnMgOiBbcmVmc10pLCBbcmVmc10pO1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmKGxpc3QpO1xuICBjb25zdCBvbkNsb3NlUmVmID0gdXNlUmVmKG9uQ2xvc2UpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbGlzdFJlZi5jdXJyZW50ID0gbGlzdDtcbiAgfSwgW2xpc3RdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9uQ2xvc2VSZWYuY3VycmVudCA9IG9uQ2xvc2U7XG4gIH0sIFtvbkNsb3NlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVyID0gKGV2OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudExpc3QgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgICBjb25zdCBpc0luc2lkZSA9IGN1cnJlbnRMaXN0LnNvbWUoKHIpID0+IHI/LmN1cnJlbnQgJiYgci5jdXJyZW50LmNvbnRhaW5zKGV2LnRhcmdldCBhcyBOb2RlKSk7XG4gICAgICBpZiAoaXNJbnNpZGUpIHJldHVybjtcbiAgICAgIG9uQ2xvc2VSZWYuY3VycmVudCgpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXIsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlcik7XG4gICAgfTtcbiAgfSwgW10pO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFDQSx1QkFBNkI7OztBQ0Q3QixtQkFBMEQ7QUFtQjFELElBQU0sb0JBQW9CO0FBQzFCLElBQU0sOEJBQThCO0FBRXBDLElBQU0sUUFBUSxDQUFDLE9BQWUsS0FBYSxRQUF3QjtBQUNqRSxNQUFJLE1BQU0sSUFBSyxRQUFPO0FBQ3RCLFNBQU8sS0FBSyxJQUFJLEtBQUssSUFBSSxPQUFPLEdBQUcsR0FBRyxHQUFHO0FBQzNDO0FBR08sSUFBTSxzQkFBc0IsQ0FDakMsV0FDQSxNQUNBO0FBQUEsRUFDRTtBQUFBLEVBQ0EsU0FBUztBQUFBLEVBQ1Qsa0JBQWtCO0FBQUEsRUFDbEIsa0JBQWtCO0FBQ3BCLElBQTZCLENBQUMsTUFDM0I7QUFDSCxRQUFNLENBQUMsT0FBTyxRQUFRLFFBQUksdUJBQWdDO0FBQUEsSUFDeEQsS0FBSztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLEVBQ2IsQ0FBQztBQUVELG9DQUFnQixNQUFNO0FBQ3BCLFFBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxRQUFTO0FBRWpDLFVBQU0sU0FBUyxNQUFNO0FBQ25CLFlBQU0sT0FBTyxVQUFVLFNBQVMsc0JBQXNCO0FBQ3RELFVBQUksQ0FBQyxLQUFNO0FBRVgsWUFBTSxnQkFBZ0Is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QUFBLFlBQ2xLLE9BQU87QUFBQSxZQUVOO0FBQUE7QUFBQSxRQUNIO0FBQUE7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsRUFDWDtBQUNGO0FBRUEsSUFBTyx1QkFBUTs7O0FFM0NULElBQUFBLHNCQUFBO0FBWEMsSUFBTSxpQkFBaUIsQ0FBQyxFQUFFLFlBQVksVUFBVSxNQUFNO0FBQzNELFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLE9BQU07QUFBQSxNQUNOLE1BQUs7QUFBQSxNQUNMLFNBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLFFBQU87QUFBQSxNQUNQO0FBQUEsTUFDQSxlQUFZO0FBQUEsTUFFWix1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsOEJBQTZCO0FBQUE7QUFBQSxFQUNwRjtBQUVKO0FBRU8sSUFBTSxlQUFlLENBQUMsRUFBRSxZQUFZLFVBQVUsTUFBTTtBQUN6RCxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxPQUFNO0FBQUEsTUFDTixNQUFLO0FBQUEsTUFDTCxTQUFRO0FBQUEsTUFDUixhQUFhO0FBQUEsTUFDYixRQUFPO0FBQUEsTUFDUDtBQUFBLE1BQ0EsZUFBWTtBQUFBLE1BRVosdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLDhCQUE2QjtBQUFBO0FBQUEsRUFDcEY7QUFFSjs7O0FDaENBLElBQUFDLGdCQUEyQztBQUVwQyxJQUFNLGtCQUFrQixDQUM3QixNQUNBLFlBQ0c7QUFDSCxRQUFNLFdBQU8sdUJBQVEsTUFBTyxNQUFNLFFBQVEsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUksQ0FBQyxJQUFJLENBQUM7QUFDeEUsUUFBTSxjQUFVLHNCQUFPLElBQUk7QUFDM0IsUUFBTSxpQkFBYSxzQkFBTyxPQUFPO0FBRWpDLCtCQUFVLE1BQU07QUFDZCxZQUFRLFVBQVU7QUFBQSxFQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDO0FBRVQsK0JBQVUsTUFBTTtBQUNkLGVBQVcsVUFBVTtBQUFBLEVBQ3ZCLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFFWiwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxVQUFVLENBQUMsT0FBZ0M7QUFDL0MsWUFBTSxjQUFjLFFBQVE7QUFDNUIsWUFBTSxXQUFXLFlBQVksS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLEVBQUUsUUFBUSxTQUFTLEdBQUcsTUFBYyxDQUFDO0FBQzVGLFVBQUksU0FBVTtBQUNkLGlCQUFXLFFBQVE7QUFBQSxJQUNyQjtBQUVBLGFBQVMsaUJBQWlCLGFBQWEsT0FBTztBQUM5QyxhQUFTLGlCQUFpQixjQUFjLFNBQVMsRUFBRSxTQUFTLEtBQUssQ0FBQztBQUVsRSxXQUFPLE1BQU07QUFDWCxlQUFTLG9CQUFvQixhQUFhLE9BQU87QUFDakQsZUFBUyxvQkFBb0IsY0FBYyxPQUFPO0FBQUEsSUFDcEQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBQ1A7IiwKICAibmFtZXMiOiBbImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiXQp9Cg==
