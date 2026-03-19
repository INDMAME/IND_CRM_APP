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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyB1c2VGbG9hdGluZ1Bvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHNcIjtcclxuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgYW5jaG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+O1xyXG4gIG9wZW46IGJvb2xlYW47XHJcbiAgekluZGV4PzogbnVtYmVyO1xyXG4gIGZpeGVkV2lkdGhQeD86IG51bWJlcjtcclxuICBtYXhIZWlnaHRDbGFzcz86IHN0cmluZztcclxuICByb3VuZGVkQ2xhc3M/OiBzdHJpbmc7XHJcbiAgcm9sZT86IHN0cmluZztcclxuICBwb3J0YWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgcGFuZWxTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcclxufTtcclxuXHJcbmNvbnN0IEZsb2F0aW5nTGlzdCA9ICh7XHJcbiAgYW5jaG9yUmVmLFxyXG4gIG9wZW4sXHJcbiAgekluZGV4ID0gMzAwMDAwLFxyXG4gIGZpeGVkV2lkdGhQeCxcclxuICBtYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIixcclxuICByb3VuZGVkQ2xhc3MgPSBcInJvdW5kZWQtbWRcIixcclxuICByb2xlLFxyXG4gIHBvcnRhbENsYXNzTmFtZSxcclxuICBwYW5lbENsYXNzTmFtZSxcclxuICBwYW5lbFN0eWxlLFxyXG4gIGNoaWxkcmVuLFxyXG59OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IHN0eWxlID0gdXNlRmxvYXRpbmdQb3NpdGlvbihhbmNob3JSZWYsIG9wZW4pO1xyXG4gIGlmICghb3BlbikgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcclxuICAgIDxkaXZcclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICBwb3NpdGlvbjogXCJmaXhlZFwiLFxyXG4gICAgICAgIHRvcDogc3R5bGUudG9wLFxyXG4gICAgICAgIGxlZnQ6IHN0eWxlLmxlZnQsXHJcbiAgICAgICAgd2lkdGg6IHR5cGVvZiBmaXhlZFdpZHRoUHggPT09IFwibnVtYmVyXCIgJiYgTnVtYmVyLmlzRmluaXRlKGZpeGVkV2lkdGhQeCkgPyBmaXhlZFdpZHRoUHggOiBzdHlsZS53aWR0aCxcclxuICAgICAgICB6SW5kZXgsXHJcbiAgICAgIH19XHJcbiAgICAgIGNsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxyXG4gICAgPlxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgcm9sZT17cm9sZX1cclxuICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgb3ZlcmZsb3ctYXV0byAke3JvdW5kZWRDbGFzc30gYmctd2hpdGUgcHktMSB0ZXh0LXNtIHNoYWRvdy1sZyByaW5nLTEgcmluZy1ibGFjay81IGZvY3VzOm91dGxpbmUtaGlkZGVuICR7bWF4SGVpZ2h0Q2xhc3N9ICR7cGFuZWxDbGFzc05hbWUgfHwgXCJcIn1gfVxyXG4gICAgICAgIHN0eWxlPXtwYW5lbFN0eWxlfVxyXG4gICAgICA+XHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PixcclxuICAgIGRvY3VtZW50LmJvZHlcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmxvYXRpbmdMaXN0O1xyXG4iLCAiaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0LCB1c2VTdGF0ZSwgdHlwZSBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbnR5cGUgRmxvYXRpbmdQbGFjZW1lbnQgPSBcImJvdHRvbVwiIHwgXCJ0b3BcIjtcclxuXHJcbnR5cGUgRmxvYXRpbmdQb3NpdGlvbk9wdGlvbnMgPSB7XHJcbiAgb3ZlcmxheVJlZj86IFJlZk9iamVjdDxIVE1MRWxlbWVudCB8IG51bGw+O1xyXG4gIG9mZnNldD86IG51bWJlcjtcclxuICB2aWV3cG9ydFBhZGRpbmc/OiBudW1iZXI7XHJcbiAgYXV0b0ZpdFZpZXdwb3J0PzogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgRmxvYXRpbmdQb3NpdGlvblN0eWxlID0ge1xyXG4gIHRvcDogbnVtYmVyO1xyXG4gIGxlZnQ6IG51bWJlcjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIG1heEhlaWdodD86IG51bWJlcjtcclxuICBwbGFjZW1lbnQ6IEZsb2F0aW5nUGxhY2VtZW50O1xyXG59O1xyXG5cclxuY29uc3QgREVGQVVMVF9PRkZTRVRfUFggPSA2O1xyXG5jb25zdCBERUZBVUxUX1ZJRVdQT1JUX1BBRERJTkdfUFggPSAxMjtcclxuXHJcbmNvbnN0IGNsYW1wID0gKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgaWYgKG1heCA8IG1pbikgcmV0dXJuIG1pbjtcclxuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyBhIGZpeGVkIGZsb2F0aW5nIHBvc2l0aW9uIGFuZCBvcHRpb25hbGx5IGtlZXBzIHRoZSBvdmVybGF5IGluc2lkZSB0aGUgdmlld3BvcnQuXHJcbmV4cG9ydCBjb25zdCB1c2VGbG9hdGluZ1Bvc2l0aW9uID0gKFxyXG4gIHRhcmdldFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PixcclxuICBvcGVuOiBib29sZWFuLFxyXG4gIHtcclxuICAgIG92ZXJsYXlSZWYsXHJcbiAgICBvZmZzZXQgPSBERUZBVUxUX09GRlNFVF9QWCxcclxuICAgIHZpZXdwb3J0UGFkZGluZyA9IERFRkFVTFRfVklFV1BPUlRfUEFERElOR19QWCxcclxuICAgIGF1dG9GaXRWaWV3cG9ydCA9IGZhbHNlLFxyXG4gIH06IEZsb2F0aW5nUG9zaXRpb25PcHRpb25zID0ge31cclxuKSA9PiB7XHJcbiAgY29uc3QgW3N0eWxlLCBzZXRTdHlsZV0gPSB1c2VTdGF0ZTxGbG9hdGluZ1Bvc2l0aW9uU3R5bGU+KHtcclxuICAgIHRvcDogMCxcclxuICAgIGxlZnQ6IDAsXHJcbiAgICB3aWR0aDogMCxcclxuICAgIG1heEhlaWdodDogdW5kZWZpbmVkLFxyXG4gICAgcGxhY2VtZW50OiBcImJvdHRvbVwiLFxyXG4gIH0pO1xyXG5cclxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFvcGVuIHx8ICF0YXJnZXRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgY29uc3QgcmVjdCA9IHRhcmdldFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgaWYgKCFyZWN0KSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCB2aWV3cG9ydFdpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IDA7XHJcbiAgICAgIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgMDtcclxuICAgICAgY29uc3Qgb3ZlcmxheUhlaWdodCA9IG92ZXJsYXlSZWY/LmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCB8fCAwO1xyXG4gICAgICBjb25zdCBuZXh0V2lkdGggPSBNYXRoLm1pbihyZWN0LndpZHRoLCBNYXRoLm1heCgwLCB2aWV3cG9ydFdpZHRoIC0gdmlld3BvcnRQYWRkaW5nICogMikpO1xyXG4gICAgICBjb25zdCBuZXh0TGVmdCA9IGNsYW1wKHJlY3QubGVmdCwgdmlld3BvcnRQYWRkaW5nLCB2aWV3cG9ydFdpZHRoIC0gbmV4dFdpZHRoIC0gdmlld3BvcnRQYWRkaW5nKTtcclxuXHJcbiAgICAgIGlmICghYXV0b0ZpdFZpZXdwb3J0KSB7XHJcbiAgICAgICAgc2V0U3R5bGUoe1xyXG4gICAgICAgICAgdG9wOiByZWN0LmJvdHRvbSArIG9mZnNldCxcclxuICAgICAgICAgIGxlZnQ6IG5leHRMZWZ0LFxyXG4gICAgICAgICAgd2lkdGg6IG5leHRXaWR0aCxcclxuICAgICAgICAgIG1heEhlaWdodDogdW5kZWZpbmVkLFxyXG4gICAgICAgICAgcGxhY2VtZW50OiBcImJvdHRvbVwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgYXZhaWxhYmxlQmVsb3cgPSBNYXRoLm1heCgwLCB2aWV3cG9ydEhlaWdodCAtIHJlY3QuYm90dG9tIC0gb2Zmc2V0IC0gdmlld3BvcnRQYWRkaW5nKTtcclxuICAgICAgY29uc3QgYXZhaWxhYmxlQWJvdmUgPSBNYXRoLm1heCgwLCByZWN0LnRvcCAtIG9mZnNldCAtIHZpZXdwb3J0UGFkZGluZyk7XHJcbiAgICAgIGNvbnN0IHByZWZlcnJlZFBsYWNlbWVudDogRmxvYXRpbmdQbGFjZW1lbnQgPVxyXG4gICAgICAgIG92ZXJsYXlIZWlnaHQgPiBhdmFpbGFibGVCZWxvdyAmJiBhdmFpbGFibGVBYm92ZSA+IGF2YWlsYWJsZUJlbG93ID8gXCJ0b3BcIiA6IFwiYm90dG9tXCI7XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IHByZWZlcnJlZFBsYWNlbWVudCA9PT0gXCJ0b3BcIiA/IGF2YWlsYWJsZUFib3ZlIDogYXZhaWxhYmxlQmVsb3c7XHJcbiAgICAgIGNvbnN0IGNvbnN0cmFpbmVkSGVpZ2h0ID1cclxuICAgICAgICBhdmFpbGFibGVIZWlnaHQgPiAwID8gTWF0aC5taW4ob3ZlcmxheUhlaWdodCB8fCBhdmFpbGFibGVIZWlnaHQsIGF2YWlsYWJsZUhlaWdodCkgOiBNYXRoLm1heCgwLCB2aWV3cG9ydEhlaWdodCAtIHZpZXdwb3J0UGFkZGluZyAqIDIpO1xyXG4gICAgICBjb25zdCBuZXh0VG9wID1cclxuICAgICAgICBwcmVmZXJyZWRQbGFjZW1lbnQgPT09IFwidG9wXCJcclxuICAgICAgICAgID8gTWF0aC5tYXgodmlld3BvcnRQYWRkaW5nLCByZWN0LnRvcCAtIG9mZnNldCAtIGNvbnN0cmFpbmVkSGVpZ2h0KVxyXG4gICAgICAgICAgOiBNYXRoLm1pbihcclxuICAgICAgICAgICAgICByZWN0LmJvdHRvbSArIG9mZnNldCxcclxuICAgICAgICAgICAgICBNYXRoLm1heCh2aWV3cG9ydFBhZGRpbmcsIHZpZXdwb3J0SGVpZ2h0IC0gY29uc3RyYWluZWRIZWlnaHQgLSB2aWV3cG9ydFBhZGRpbmcpXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICBzZXRTdHlsZSh7XHJcbiAgICAgICAgdG9wOiBuZXh0VG9wLFxyXG4gICAgICAgIGxlZnQ6IG5leHRMZWZ0LFxyXG4gICAgICAgIHdpZHRoOiBuZXh0V2lkdGgsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiBNYXRoLm1heCgwLCBwcmVmZXJyZWRQbGFjZW1lbnQgPT09IFwidG9wXCIgPyBuZXh0VG9wICsgY29uc3RyYWluZWRIZWlnaHQgLSB2aWV3cG9ydFBhZGRpbmcgOiBhdmFpbGFibGVIZWlnaHQpLFxyXG4gICAgICAgIHBsYWNlbWVudDogcHJlZmVycmVkUGxhY2VtZW50LFxyXG4gICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgdXBkYXRlKCk7XHJcbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IG9wZW4gJiYgdXBkYXRlKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBjYXB0dXJlOiB0cnVlLCBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB0cnVlKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlKTtcclxuICAgIH07XHJcbiAgfSwgW29wZW4sIHRhcmdldFJlZl0pO1xyXG5cclxuICByZXR1cm4gc3R5bGU7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvbkRvd25TdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xOS41IDguMjUtNy41IDcuNS03LjUtNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvblVwU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNC41IDE1Ljc1IDcuNS03LjUgNy41IDcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlT3V0c2lkZUNsaWNrID0gKFxyXG4gIHJlZnM6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4gfCBBcnJheTxSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+PixcclxuICBvbkNsb3NlOiAoKSA9PiB2b2lkXHJcbikgPT4ge1xyXG4gIGNvbnN0IGxpc3QgPSB1c2VNZW1vKCgpID0+IChBcnJheS5pc0FycmF5KHJlZnMpID8gcmVmcyA6IFtyZWZzXSksIFtyZWZzXSk7XHJcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZihsaXN0KTtcclxuICBjb25zdCBvbkNsb3NlUmVmID0gdXNlUmVmKG9uQ2xvc2UpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGlzdFJlZi5jdXJyZW50ID0gbGlzdDtcclxuICB9LCBbbGlzdF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgb25DbG9zZVJlZi5jdXJyZW50ID0gb25DbG9zZTtcclxuICB9LCBbb25DbG9zZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaGFuZGxlciA9IChldjogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgY3VycmVudExpc3QgPSBsaXN0UmVmLmN1cnJlbnQ7XHJcbiAgICAgIGNvbnN0IGlzSW5zaWRlID0gY3VycmVudExpc3Quc29tZSgocikgPT4gcj8uY3VycmVudCAmJiByLmN1cnJlbnQuY29udGFpbnMoZXYudGFyZ2V0IGFzIE5vZGUpKTtcclxuICAgICAgaWYgKGlzSW5zaWRlKSByZXR1cm47XHJcbiAgICAgIG9uQ2xvc2VSZWYuY3VycmVudCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXIpO1xyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFDQSx1QkFBNkI7OztBQ0Q3QixtQkFBMEQ7QUFtQjFELElBQU0sb0JBQW9CO0FBQzFCLElBQU0sOEJBQThCO0FBRXBDLElBQU0sUUFBUSxDQUFDLE9BQWUsS0FBYSxRQUF3QjtBQUNqRSxNQUFJLE1BQU0sSUFBSyxRQUFPO0FBQ3RCLFNBQU8sS0FBSyxJQUFJLEtBQUssSUFBSSxPQUFPLEdBQUcsR0FBRyxHQUFH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
