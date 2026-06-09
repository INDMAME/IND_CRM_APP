import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/hooks/useFloatingPosition.ts
var import_react = __toESM(require_react());
var DEFAULT_OFFSET_PX = 6;
var DEFAULT_VIEWPORT_PADDING_PX = 12;
var clamp = (value, min, max) => {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
};
var areFloatingStylesEqual = (left, right) => {
  return left.top === right.top && left.left === right.left && left.width === right.width && left.maxHeight === right.maxHeight && left.placement === right.placement;
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
      const overlayElement = overlayRef?.current;
      const overlayRect = overlayElement?.getBoundingClientRect();
      const overlayHeight = Math.max(overlayRect?.height || 0, overlayElement?.scrollHeight || 0);
      const nextWidth = Math.min(rect.width, Math.max(0, viewportWidth - viewportPadding * 2));
      const nextLeft = clamp(rect.left, viewportPadding, viewportWidth - nextWidth - viewportPadding);
      if (!autoFitViewport) {
        const nextStyle2 = {
          top: rect.bottom + offset,
          left: nextLeft,
          width: nextWidth,
          maxHeight: void 0,
          placement: "bottom"
        };
        setStyle((previous) => areFloatingStylesEqual(previous, nextStyle2) ? previous : nextStyle2);
        return;
      }
      const availableBelow = Math.max(0, viewportHeight - rect.bottom - offset - viewportPadding);
      const availableAbove = Math.max(0, rect.top - offset - viewportPadding);
      const fallbackHeight = Math.max(availableBelow, availableAbove, 0);
      const preferredHeight = overlayHeight > 0 ? overlayHeight : fallbackHeight;
      const preferredPlacement = preferredHeight > availableBelow && availableAbove > availableBelow ? "top" : "bottom";
      const availableHeight = preferredPlacement === "top" ? availableAbove : availableBelow;
      const constrainedHeight = Math.max(
        0,
        availableHeight > 0 ? Math.min(preferredHeight || availableHeight, availableHeight) : viewportHeight - viewportPadding * 2
      );
      const nextTop = preferredPlacement === "top" ? Math.max(viewportPadding, rect.top - offset - constrainedHeight) : Math.min(
        rect.bottom + offset,
        Math.max(viewportPadding, viewportHeight - constrainedHeight - viewportPadding)
      );
      const nextStyle = {
        top: nextTop,
        left: nextLeft,
        width: nextWidth,
        maxHeight: constrainedHeight,
        placement: preferredPlacement
      };
      setStyle((previous) => areFloatingStylesEqual(previous, nextStyle) ? previous : nextStyle);
    };
    update();
    let animationFrame = 0;
    const scheduleUpdate = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        update();
      });
    };
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => {
      scheduleUpdate();
    });
    if (resizeObserver) {
      resizeObserver.observe(targetRef.current);
      if (overlayRef?.current) {
        resizeObserver.observe(overlayRef.current);
      }
    }
    const mutationObserver = typeof MutationObserver === "undefined" || !overlayRef?.current ? null : new MutationObserver(() => {
      scheduleUpdate();
    });
    mutationObserver?.observe(overlayRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    });
    const onScroll = () => open && scheduleUpdate();
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [autoFitViewport, offset, open, overlayRef, targetRef, viewportPadding]);
  return style;
};

// Web/wwwroot/react/src/components/commons/FloatingList.tsx
var import_react2 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());
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
  autoFitViewport = true,
  offset,
  viewportPadding,
  children
}) => {
  const panelRef = (0, import_react2.useRef)(null);
  const style = useFloatingPosition(anchorRef, open, {
    overlayRef: panelRef,
    autoFitViewport,
    offset,
    viewportPadding
  });
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-floating-placement": style.placement,
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
            ref: panelRef,
            role,
            className: `w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass} ${panelClassName || ""}`,
            style: {
              maxHeight: style.maxHeight,
              overscrollBehavior: "contain",
              ...panelStyle
            },
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
var import_react3 = __toESM(require_react());
var useOutsideClick = (refs, onClose) => {
  const list = (0, import_react3.useMemo)(() => Array.isArray(refs) ? refs : [refs], [refs]);
  const listRef = (0, import_react3.useRef)(list);
  const onCloseRef = (0, import_react3.useRef)(onClose);
  (0, import_react3.useEffect)(() => {
    listRef.current = list;
  }, [list]);
  (0, import_react3.useEffect)(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  (0, import_react3.useEffect)(() => {
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IHVzZUxheW91dEVmZmVjdCwgdXNlU3RhdGUsIHR5cGUgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG50eXBlIEZsb2F0aW5nUGxhY2VtZW50ID0gXCJib3R0b21cIiB8IFwidG9wXCI7XHJcblxyXG50eXBlIEZsb2F0aW5nUG9zaXRpb25PcHRpb25zID0ge1xuICBvdmVybGF5UmVmPzogUmVmT2JqZWN0PEhUTUxFbGVtZW50IHwgbnVsbD47XG4gIG9mZnNldD86IG51bWJlcjtcbiAgdmlld3BvcnRQYWRkaW5nPzogbnVtYmVyO1xuICBhdXRvRml0Vmlld3BvcnQ/OiBib29sZWFuO1xufTtcblxyXG50eXBlIEZsb2F0aW5nUG9zaXRpb25TdHlsZSA9IHtcclxuICB0b3A6IG51bWJlcjtcclxuICBsZWZ0OiBudW1iZXI7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBtYXhIZWlnaHQ/OiBudW1iZXI7XHJcbiAgcGxhY2VtZW50OiBGbG9hdGluZ1BsYWNlbWVudDtcclxufTtcclxuXHJcbmNvbnN0IERFRkFVTFRfT0ZGU0VUX1BYID0gNjtcclxuY29uc3QgREVGQVVMVF9WSUVXUE9SVF9QQURESU5HX1BYID0gMTI7XHJcblxyXG5jb25zdCBjbGFtcCA9ICh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBpZiAobWF4IDwgbWluKSByZXR1cm4gbWluO1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XG59O1xuXG5jb25zdCBhcmVGbG9hdGluZ1N0eWxlc0VxdWFsID0gKGxlZnQ6IEZsb2F0aW5nUG9zaXRpb25TdHlsZSwgcmlnaHQ6IEZsb2F0aW5nUG9zaXRpb25TdHlsZSk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIGxlZnQudG9wID09PSByaWdodC50b3AgJiZcbiAgICBsZWZ0LmxlZnQgPT09IHJpZ2h0LmxlZnQgJiZcbiAgICBsZWZ0LndpZHRoID09PSByaWdodC53aWR0aCAmJlxuICAgIGxlZnQubWF4SGVpZ2h0ID09PSByaWdodC5tYXhIZWlnaHQgJiZcbiAgICBsZWZ0LnBsYWNlbWVudCA9PT0gcmlnaHQucGxhY2VtZW50XG4gICk7XG59O1xuXG4vLyBSZXNvbHZlcyBhIGZpeGVkIGZsb2F0aW5nIHBvc2l0aW9uIGFuZCBvcHRpb25hbGx5IGtlZXBzIHRoZSBvdmVybGF5IGluc2lkZSB0aGUgdmlld3BvcnQuXG5leHBvcnQgY29uc3QgdXNlRmxvYXRpbmdQb3NpdGlvbiA9IChcbiAgdGFyZ2V0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+LFxyXG4gIG9wZW46IGJvb2xlYW4sXHJcbiAge1xyXG4gICAgb3ZlcmxheVJlZixcclxuICAgIG9mZnNldCA9IERFRkFVTFRfT0ZGU0VUX1BYLFxyXG4gICAgdmlld3BvcnRQYWRkaW5nID0gREVGQVVMVF9WSUVXUE9SVF9QQURESU5HX1BYLFxyXG4gICAgYXV0b0ZpdFZpZXdwb3J0ID0gZmFsc2UsXHJcbiAgfTogRmxvYXRpbmdQb3NpdGlvbk9wdGlvbnMgPSB7fVxyXG4pID0+IHtcclxuICBjb25zdCBbc3R5bGUsIHNldFN0eWxlXSA9IHVzZVN0YXRlPEZsb2F0aW5nUG9zaXRpb25TdHlsZT4oe1xyXG4gICAgdG9wOiAwLFxyXG4gICAgbGVmdDogMCxcclxuICAgIHdpZHRoOiAwLFxyXG4gICAgbWF4SGVpZ2h0OiB1bmRlZmluZWQsXHJcbiAgICBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsXHJcbiAgfSk7XHJcblxyXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuIHx8ICF0YXJnZXRSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IHRhcmdldFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICghcmVjdCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCAwO1xyXG4gICAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IDA7XHJcbiAgICAgIGNvbnN0IG92ZXJsYXlFbGVtZW50ID0gb3ZlcmxheVJlZj8uY3VycmVudDtcbiAgICAgIGNvbnN0IG92ZXJsYXlSZWN0ID0gb3ZlcmxheUVsZW1lbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3Qgb3ZlcmxheUhlaWdodCA9IE1hdGgubWF4KG92ZXJsYXlSZWN0Py5oZWlnaHQgfHwgMCwgb3ZlcmxheUVsZW1lbnQ/LnNjcm9sbEhlaWdodCB8fCAwKTtcbiAgICAgIGNvbnN0IG5leHRXaWR0aCA9IE1hdGgubWluKHJlY3Qud2lkdGgsIE1hdGgubWF4KDAsIHZpZXdwb3J0V2lkdGggLSB2aWV3cG9ydFBhZGRpbmcgKiAyKSk7XHJcbiAgICAgIGNvbnN0IG5leHRMZWZ0ID0gY2xhbXAocmVjdC5sZWZ0LCB2aWV3cG9ydFBhZGRpbmcsIHZpZXdwb3J0V2lkdGggLSBuZXh0V2lkdGggLSB2aWV3cG9ydFBhZGRpbmcpO1xuXG4gICAgICBpZiAoIWF1dG9GaXRWaWV3cG9ydCkge1xuICAgICAgICBjb25zdCBuZXh0U3R5bGU6IEZsb2F0aW5nUG9zaXRpb25TdHlsZSA9IHtcbiAgICAgICAgICB0b3A6IHJlY3QuYm90dG9tICsgb2Zmc2V0LFxuICAgICAgICAgIGxlZnQ6IG5leHRMZWZ0LFxuICAgICAgICAgIHdpZHRoOiBuZXh0V2lkdGgsXG4gICAgICAgICAgbWF4SGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgICAgcGxhY2VtZW50OiBcImJvdHRvbVwiLFxuICAgICAgICB9O1xuICAgICAgICBzZXRTdHlsZSgocHJldmlvdXMpID0+IChhcmVGbG9hdGluZ1N0eWxlc0VxdWFsKHByZXZpb3VzLCBuZXh0U3R5bGUpID8gcHJldmlvdXMgOiBuZXh0U3R5bGUpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBhdmFpbGFibGVCZWxvdyA9IE1hdGgubWF4KDAsIHZpZXdwb3J0SGVpZ2h0IC0gcmVjdC5ib3R0b20gLSBvZmZzZXQgLSB2aWV3cG9ydFBhZGRpbmcpO1xuICAgICAgY29uc3QgYXZhaWxhYmxlQWJvdmUgPSBNYXRoLm1heCgwLCByZWN0LnRvcCAtIG9mZnNldCAtIHZpZXdwb3J0UGFkZGluZyk7XG4gICAgICBjb25zdCBmYWxsYmFja0hlaWdodCA9IE1hdGgubWF4KGF2YWlsYWJsZUJlbG93LCBhdmFpbGFibGVBYm92ZSwgMCk7XG4gICAgICBjb25zdCBwcmVmZXJyZWRIZWlnaHQgPSBvdmVybGF5SGVpZ2h0ID4gMCA/IG92ZXJsYXlIZWlnaHQgOiBmYWxsYmFja0hlaWdodDtcbiAgICAgIGNvbnN0IHByZWZlcnJlZFBsYWNlbWVudDogRmxvYXRpbmdQbGFjZW1lbnQgPVxuICAgICAgICBwcmVmZXJyZWRIZWlnaHQgPiBhdmFpbGFibGVCZWxvdyAmJiBhdmFpbGFibGVBYm92ZSA+IGF2YWlsYWJsZUJlbG93ID8gXCJ0b3BcIiA6IFwiYm90dG9tXCI7XG4gICAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBwcmVmZXJyZWRQbGFjZW1lbnQgPT09IFwidG9wXCIgPyBhdmFpbGFibGVBYm92ZSA6IGF2YWlsYWJsZUJlbG93O1xuICAgICAgY29uc3QgY29uc3RyYWluZWRIZWlnaHQgPSBNYXRoLm1heChcbiAgICAgICAgMCxcbiAgICAgICAgYXZhaWxhYmxlSGVpZ2h0ID4gMFxuICAgICAgICAgID8gTWF0aC5taW4ocHJlZmVycmVkSGVpZ2h0IHx8IGF2YWlsYWJsZUhlaWdodCwgYXZhaWxhYmxlSGVpZ2h0KVxuICAgICAgICAgIDogdmlld3BvcnRIZWlnaHQgLSB2aWV3cG9ydFBhZGRpbmcgKiAyXG4gICAgICApO1xuICAgICAgY29uc3QgbmV4dFRvcCA9XG4gICAgICAgIHByZWZlcnJlZFBsYWNlbWVudCA9PT0gXCJ0b3BcIlxuICAgICAgICAgID8gTWF0aC5tYXgodmlld3BvcnRQYWRkaW5nLCByZWN0LnRvcCAtIG9mZnNldCAtIGNvbnN0cmFpbmVkSGVpZ2h0KVxuICAgICAgICAgIDogTWF0aC5taW4oXG4gICAgICAgICAgICAgIHJlY3QuYm90dG9tICsgb2Zmc2V0LFxyXG4gICAgICAgICAgICAgIE1hdGgubWF4KHZpZXdwb3J0UGFkZGluZywgdmlld3BvcnRIZWlnaHQgLSBjb25zdHJhaW5lZEhlaWdodCAtIHZpZXdwb3J0UGFkZGluZylcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IG5leHRTdHlsZTogRmxvYXRpbmdQb3NpdGlvblN0eWxlID0ge1xuICAgICAgICB0b3A6IG5leHRUb3AsXG4gICAgICAgIGxlZnQ6IG5leHRMZWZ0LFxuICAgICAgICB3aWR0aDogbmV4dFdpZHRoLFxuICAgICAgICBtYXhIZWlnaHQ6IGNvbnN0cmFpbmVkSGVpZ2h0LFxuICAgICAgICBwbGFjZW1lbnQ6IHByZWZlcnJlZFBsYWNlbWVudCxcbiAgICAgIH07XG4gICAgICBzZXRTdHlsZSgocHJldmlvdXMpID0+IChhcmVGbG9hdGluZ1N0eWxlc0VxdWFsKHByZXZpb3VzLCBuZXh0U3R5bGUpID8gcHJldmlvdXMgOiBuZXh0U3R5bGUpKTtcbiAgICB9O1xuXG4gICAgdXBkYXRlKCk7XG4gICAgbGV0IGFuaW1hdGlvbkZyYW1lID0gMDtcbiAgICBjb25zdCBzY2hlZHVsZVVwZGF0ZSA9ICgpID0+IHtcbiAgICAgIGlmIChhbmltYXRpb25GcmFtZSkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWUpO1xuICAgICAgfVxuICAgICAgYW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgYW5pbWF0aW9uRnJhbWUgPSAwO1xuICAgICAgICB1cGRhdGUoKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCByZXNpemVPYnNlcnZlciA9XG4gICAgICB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgPT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDogbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIHNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgaWYgKHJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICByZXNpemVPYnNlcnZlci5vYnNlcnZlKHRhcmdldFJlZi5jdXJyZW50KTtcbiAgICAgIGlmIChvdmVybGF5UmVmPy5jdXJyZW50KSB7XG4gICAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUob3ZlcmxheVJlZi5jdXJyZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID1cbiAgICAgIHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiIHx8ICFvdmVybGF5UmVmPy5jdXJyZW50XG4gICAgICAgID8gbnVsbFxuICAgICAgICA6IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIHNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgbXV0YXRpb25PYnNlcnZlcj8ub2JzZXJ2ZShvdmVybGF5UmVmLmN1cnJlbnQsIHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiBvcGVuICYmIHNjaGVkdWxlVXBkYXRlKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzY2hlZHVsZVVwZGF0ZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChhbmltYXRpb25GcmFtZSkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWUpO1xuICAgICAgfVxuICAgICAgcmVzaXplT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgICAgIG11dGF0aW9uT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNjaGVkdWxlVXBkYXRlKTtcbiAgICB9O1xuICB9LCBbYXV0b0ZpdFZpZXdwb3J0LCBvZmZzZXQsIG9wZW4sIG92ZXJsYXlSZWYsIHRhcmdldFJlZiwgdmlld3BvcnRQYWRkaW5nXSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VGbG9hdGluZ1Bvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHNcIjtcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGFuY2hvclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PjtcclxuICBvcGVuOiBib29sZWFuO1xyXG4gIHpJbmRleD86IG51bWJlcjtcclxuICBmaXhlZFdpZHRoUHg/OiBudW1iZXI7XHJcbiAgbWF4SGVpZ2h0Q2xhc3M/OiBzdHJpbmc7XHJcbiAgcm91bmRlZENsYXNzPzogc3RyaW5nO1xyXG4gIHJvbGU/OiBzdHJpbmc7XHJcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG4gIGF1dG9GaXRWaWV3cG9ydD86IGJvb2xlYW47XG4gIG9mZnNldD86IG51bWJlcjtcbiAgdmlld3BvcnRQYWRkaW5nPzogbnVtYmVyO1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xufTtcblxyXG5jb25zdCBGbG9hdGluZ0xpc3QgPSAoe1xyXG4gIGFuY2hvclJlZixcclxuICBvcGVuLFxyXG4gIHpJbmRleCA9IDMwMDAwMCxcclxuICBmaXhlZFdpZHRoUHgsXHJcbiAgbWF4SGVpZ2h0Q2xhc3MgPSBcIm1heC1oLTcyXCIsXHJcbiAgcm91bmRlZENsYXNzID0gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiLFxyXG4gIHJvbGUsXHJcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbiAgcGFuZWxTdHlsZSxcbiAgYXV0b0ZpdFZpZXdwb3J0ID0gdHJ1ZSxcbiAgb2Zmc2V0LFxuICB2aWV3cG9ydFBhZGRpbmcsXG4gIGNoaWxkcmVuLFxufTogUHJvcHMpID0+IHtcbiAgY29uc3QgcGFuZWxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgc3R5bGUgPSB1c2VGbG9hdGluZ1Bvc2l0aW9uKGFuY2hvclJlZiwgb3Blbiwge1xuICAgIG92ZXJsYXlSZWY6IHBhbmVsUmVmLFxuICAgIGF1dG9GaXRWaWV3cG9ydCxcbiAgICBvZmZzZXQsXG4gICAgdmlld3BvcnRQYWRkaW5nLFxuICB9KTtcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcbiAgICA8ZGl2XG4gICAgICBkYXRhLWZsb2F0aW5nLXBsYWNlbWVudD17c3R5bGUucGxhY2VtZW50fVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgdG9wOiBzdHlsZS50b3AsXG4gICAgICAgIGxlZnQ6IHN0eWxlLmxlZnQsXG4gICAgICAgIHdpZHRoOiB0eXBlb2YgZml4ZWRXaWR0aFB4ID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZShmaXhlZFdpZHRoUHgpID8gZml4ZWRXaWR0aFB4IDogc3R5bGUud2lkdGgsXG4gICAgICAgIHpJbmRleCxcclxuICAgICAgfX1cclxuICAgICAgY2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XHJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17cGFuZWxSZWZ9XG4gICAgICAgIHJvbGU9e3JvbGV9XG4gICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBvdmVyZmxvdy1hdXRvICR7cm91bmRlZENsYXNzfSBiZy13aGl0ZSBweS0xIHRleHQtc20gc2hhZG93LWxnIHJpbmctMSByaW5nLWJsYWNrLzUgZm9jdXM6b3V0bGluZS1oaWRkZW4gJHttYXhIZWlnaHRDbGFzc30gJHtwYW5lbENsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgbWF4SGVpZ2h0OiBzdHlsZS5tYXhIZWlnaHQsXG4gICAgICAgICAgb3ZlcnNjcm9sbEJlaGF2aW9yOiBcImNvbnRhaW5cIixcbiAgICAgICAgICAuLi5wYW5lbFN0eWxlLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4sXHJcbiAgICBkb2N1bWVudC5ib2R5XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nTGlzdDtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uRG93blN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE5LjUgOC4yNS03LjUgNy41LTcuNS03LjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uVXBTdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm00LjUgMTUuNzUgNy41LTcuNSA3LjUgNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VPdXRzaWRlQ2xpY2sgPSAoXHJcbiAgcmVmczogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PiB8IEFycmF5PFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4+LFxyXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWRcclxuKSA9PiB7XHJcbiAgY29uc3QgbGlzdCA9IHVzZU1lbW8oKCkgPT4gKEFycmF5LmlzQXJyYXkocmVmcykgPyByZWZzIDogW3JlZnNdKSwgW3JlZnNdKTtcclxuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmKGxpc3QpO1xyXG4gIGNvbnN0IG9uQ2xvc2VSZWYgPSB1c2VSZWYob25DbG9zZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsaXN0UmVmLmN1cnJlbnQgPSBsaXN0O1xyXG4gIH0sIFtsaXN0XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBvbkNsb3NlUmVmLmN1cnJlbnQgPSBvbkNsb3NlO1xyXG4gIH0sIFtvbkNsb3NlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVyID0gKGV2OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW50TGlzdCA9IGxpc3RSZWYuY3VycmVudDtcclxuICAgICAgY29uc3QgaXNJbnNpZGUgPSBjdXJyZW50TGlzdC5zb21lKChyKSA9PiByPy5jdXJyZW50ICYmIHIuY3VycmVudC5jb250YWlucyhldi50YXJnZXQgYXMgTm9kZSkpO1xyXG4gICAgICBpZiAoaXNJbnNpZGUpIHJldHVybjtcclxuICAgICAgb25DbG9zZVJlZi5jdXJyZW50KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVyKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlcik7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLG1CQUEwRDtBQW1CMUQsSUFBTSxvQkFBb0I7QUFDMUIsSUFBTSw4QkFBOEI7QUFFcEMsSUFBTSxRQUFRLENBQUMsT0FBZSxLQUFhLFFBQXdCO0FBQ2pFLE1BQUksTUFBTSxJQUFLLFFBQU87QUFDdEIsU0FBTyxLQUFLLElBQUksS0FBSyxJQUFJLE9BQU8sR0FBRyxHQUFHLEdBQUc7QUFDM0M7QUFFQSxJQUFNLHlCQUF5QixDQUFDLE1BQTZCLFVBQTBDO0FBQ3JHLFNBQ0UsS0FBSyxRQUFRLE1BQU0sT0FDbkIsS0FBSyxTQUFTLE1BQU0sUUFDcEIsS0FBSyxVQUFVLE1BQU0sU0FDckIsS0FBSyxjQUFjLE1BQU0sYUFDekIsS0FBSyxjQUFjLE1BQU07QUFFN0I7QUFHTyxJQUFNLHNCQUFzQixDQUNqQyxXQUNBLE1BQ0E7QUFBQSxFQUNFO0FBQUEsRUFDQSxTQUFTO0FBQUEsRUFDVCxrQkFBa0I7QUFBQSxFQUNsQixrQkFBa0I7QUFDcEIsSUFBNkIsQ0FBQyxNQUMzQjtBQUNILFFBQU0sQ0FBQyxPQUFPLFFBQVEsUUFBSSx1QkFBZ0M7QUFBQSxJQUN4RCxLQUFLO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixP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
