import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/FloatingActionButton.tsx
var import_react2 = __toESM(require_react());

// Web/wwwroot/react/src/hooks/useFloatingActionButtonVisibility.ts
var import_react = __toESM(require_react());
var PAGINATION_CLEARANCE_PX = 16;
var PAGINATION_SELECTOR = "[data-ind-pagination-anchor='true']";
var getPaginationElements = () => {
  if (typeof document === "undefined") return [];
  return Array.from(document.querySelectorAll(PAGINATION_SELECTOR));
};
var resolveBottomOffset = ({
  bottom,
  right,
  size,
  viewportHeight,
  viewportWidth,
  paginations
}) => {
  const fabLeft = viewportWidth - right - size;
  const fabRight = viewportWidth - right;
  return paginations.reduce((nextBottom, element) => {
    const rect = element.getBoundingClientRect();
    const isVisibleInViewport = rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < viewportHeight;
    if (!isVisibleInViewport) {
      return nextBottom;
    }
    const overlapsFabLane = fabRight > rect.left - PAGINATION_CLEARANCE_PX && fabLeft < rect.right + PAGINATION_CLEARANCE_PX;
    if (!overlapsFabLane) {
      return nextBottom;
    }
    const requiredBottom = Math.ceil(viewportHeight - rect.top + PAGINATION_CLEARANCE_PX);
    return Math.max(nextBottom, requiredBottom);
  }, Math.max(0, bottom));
};
var useFloatingActionButtonVisibility = ({
  bottom,
  right,
  size
}) => {
  const [resolvedBottom, setResolvedBottom] = (0, import_react.useState)(bottom);
  const animationFrameRef = (0, import_react.useRef)(null);
  const updateBottom = (0, import_react.useCallback)(() => {
    if (typeof window === "undefined") return;
    const nextBottom = resolveBottomOffset({
      bottom,
      right,
      size,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      paginations: getPaginationElements()
    });
    setResolvedBottom((previous) => Math.abs(previous - nextBottom) < 1 ? previous : nextBottom);
  }, [bottom, right, size]);
  const scheduleBottomUpdate = (0, import_react.useCallback)(() => {
    if (typeof window === "undefined") return;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateBottom();
    });
  }, [updateBottom]);
  (0, import_react.useLayoutEffect)(() => {
    updateBottom();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => scheduleBottomUpdate());
    getPaginationElements().forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [scheduleBottomUpdate, updateBottom]);
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      scheduleBottomUpdate();
    };
    window.addEventListener("scroll", scheduleBottomUpdate, { capture: true, passive: true });
    window.addEventListener("wheel", scheduleBottomUpdate, { passive: true });
    window.addEventListener("touchmove", scheduleBottomUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("scroll", scheduleBottomUpdate, true);
      window.removeEventListener("wheel", scheduleBottomUpdate);
      window.removeEventListener("touchmove", scheduleBottomUpdate);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scheduleBottomUpdate]);
  return {
    resolvedBottom
  };
};

// Web/wwwroot/react/src/components/commons/FloatingActionButton.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var EMPTY_MENU_ITEMS = [];
var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
var FloatingActionButton = ({
  route,
  ariaLabel,
  size = 76,
  right = 24,
  bottom = 24,
  color = "#00296b",
  shadowOpacity = 0.16,
  plusThickness = 4,
  plusLength = 28,
  onClick,
  menuItems = EMPTY_MENU_ITEMS,
  isMenuOpen,
  onMenuOpenChange,
  closeMenuOnSelect = true,
  menuAriaLabel,
  menuClassName = ""
}) => {
  const rootRef = (0, import_react2.useRef)(null);
  const canvasRef = (0, import_react2.useRef)(null);
  const [internalMenuOpen, setInternalMenuOpen] = (0, import_react2.useState)(false);
  const hasMenu = menuItems.length > 0;
  const isMenuControlled = typeof isMenuOpen === "boolean";
  const menuOpen = hasMenu ? isMenuControlled ? Boolean(isMenuOpen) : internalMenuOpen : false;
  const { resolvedBottom } = useFloatingActionButtonVisibility({
    bottom,
    right,
    size
  });
  const setMenuOpen = (0, import_react2.useCallback)(
    (nextOpen) => {
      if (!hasMenu) return;
      if (!isMenuControlled) {
        setInternalMenuOpen(nextOpen);
      }
      onMenuOpenChange?.(nextOpen);
    },
    [hasMenu, isMenuControlled, onMenuOpenChange]
  );
  const buildFabSvg = (0, import_react2.useCallback)(() => {
    const safeOpacity = clamp(shadowOpacity, 0, 0.5);
    const safeThickness = clamp(plusThickness, 2, 8);
    const safeLength = clamp(plusLength, 16, 40);
    const cx = 48;
    const xV = cx - safeThickness / 2;
    const yV = cx - safeLength / 2;
    const xH = cx - safeLength / 2;
    const yH = cx - safeThickness / 2;
    return `
      <svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="fabShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="-4" dy="10" stdDeviation="6" flood-color="#000" flood-opacity="${safeOpacity}"/>
          </filter>
        </defs>

        <g filter="url(#fabShadow)">
          <circle cx="48" cy="48" r="34" fill="${color}"/>
        </g>

        <g fill="#fff">
          <rect x="${xV}" y="${yV}" width="${safeThickness}" height="${safeLength}" rx="1"/>
          <rect x="${xH}" y="${yH}" width="${safeLength}" height="${safeThickness}" rx="1"/>
        </g>
      </svg>
    `.trim();
  }, [color, plusLength, plusThickness, shadowOpacity]);
  const renderSvgToCanvas = (0, import_react2.useCallback)(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sizePx = Math.max(40, size);
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.round(sizePx * dpr);
    canvas.height = Math.round(sizePx * dpr);
    canvas.style.width = `${sizePx}px`;
    canvas.style.height = `${sizePx}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const svg = buildFabSvg();
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      ctx.clearRect(0, 0, sizePx, sizePx);
      ctx.drawImage(img, 0, 0, sizePx, sizePx);
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [buildFabSvg, size]);
  (0, import_react2.useEffect)(() => {
    renderSvgToCanvas();
    window.addEventListener("resize", renderSvgToCanvas);
    return () => window.removeEventListener("resize", renderSvgToCanvas);
  }, [renderSvgToCanvas]);
  (0, import_react2.useEffect)(() => {
    if (!menuOpen) return;
    const handleOutsideClick = (event) => {
      const node = event.target;
      if (!node) return;
      if (rootRef.current?.contains(node)) return;
      setMenuOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick, { passive: true });
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen, setMenuOpen]);
  const runPrimaryAction = (0, import_react2.useCallback)(() => {
    if (typeof onClick === "function") {
      onClick();
      return;
    }
    if (!route || typeof window === "undefined") return;
    window.location.href = route;
  }, [onClick, route]);
  const handleMainClick = (0, import_react2.useCallback)(() => {
    if (hasMenu) {
      setMenuOpen(!menuOpen);
      return;
    }
    runPrimaryAction();
  }, [hasMenu, menuOpen, runPrimaryAction, setMenuOpen]);
  const handleMenuItemClick = (0, import_react2.useCallback)(
    (item) => {
      if (item.disabled) return;
      if (typeof item.onClick === "function") {
        item.onClick();
      } else if (item.route && typeof window !== "undefined") {
        window.location.href = item.route;
      }
      if (closeMenuOnSelect) {
        setMenuOpen(false);
      }
    },
    [closeMenuOnSelect, setMenuOpen]
  );
  const menuPanelClassName = (0, import_react2.useMemo)(() => {
    const base = "min-w-[11rem] rounded-xl border border-slate-200 bg-white p-2 shadow-xl";
    const extra = menuClassName.trim();
    return extra ? `${base} ${extra}` : base;
  }, [menuClassName]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: rootRef,
      className: "fixed z-2000 flex flex-col items-end gap-2",
      style: {
        right: `${right}px`,
        bottom: `${resolvedBottom}px`
      },
      children: [
        menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { role: "menu", "aria-label": menuAriaLabel || ariaLabel, className: menuPanelClassName, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "space-y-1", children: menuItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            type: "button",
            role: "menuitem",
            "aria-label": item.ariaLabel || item.label,
            disabled: item.disabled,
            className: "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-[16px] font-medium leading-5 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
            onClick: () => handleMenuItemClick(item),
            children: [
              item.icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex h-5 w-5 shrink-0 items-center justify-center", children: item.icon }) : null,
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "truncate", children: item.label })
            ]
          }
        ) }, item.id)) }) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "button",
          {
            type: "button",
            "aria-label": ariaLabel,
            "aria-expanded": hasMenu ? menuOpen : void 0,
            "aria-haspopup": hasMenu ? "menu" : void 0,
            className: "rounded-md border-0 bg-transparent p-0 transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-4",
            style: {
              width: `${size}px`,
              height: `${size}px`,
              WebkitTapHighlightColor: "transparent"
            },
            onClick: handleMainClick,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: canvasRef, className: "block rounded-md" })
          }
        )
      ]
    }
  );
};
var FloatingActionButton_default = FloatingActionButton;

export {
  FloatingActionButton_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eSB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkudHNcIjtcblxuZXhwb3J0IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgcm91dGU/OiBzdHJpbmc7XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGFyaWFMYWJlbD86IHN0cmluZztcbn07XG5cbmNvbnN0IEVNUFRZX01FTlVfSVRFTVM6IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXSA9IFtdO1xuXG50eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uUHJvcHMgPSB7XG4gIHJvdXRlPzogc3RyaW5nO1xuICBhcmlhTGFiZWw6IHN0cmluZztcbiAgc2l6ZT86IG51bWJlcjtcbiAgcmlnaHQ/OiBudW1iZXI7XG4gIGJvdHRvbT86IG51bWJlcjtcbiAgY29sb3I/OiBzdHJpbmc7XG4gIHNoYWRvd09wYWNpdHk/OiBudW1iZXI7XG4gIHBsdXNUaGlja25lc3M/OiBudW1iZXI7XG4gIHBsdXNMZW5ndGg/OiBudW1iZXI7XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICBtZW51SXRlbXM/OiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW107XG4gIGlzTWVudU9wZW4/OiBib29sZWFuO1xuICBvbk1lbnVPcGVuQ2hhbmdlPzogKGlzT3BlbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgY2xvc2VNZW51T25TZWxlY3Q/OiBib29sZWFuO1xuICBtZW51QXJpYUxhYmVsPzogc3RyaW5nO1xuICBtZW51Q2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcblxuLy8gRmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiB0aGF0IHN1cHBvcnRzIGRpcmVjdCBhY3Rpb24gb3Igc3BlZWQtZGlhbCBtZW51IG1vZGUuXG5jb25zdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiA9ICh7XG4gIHJvdXRlLFxuICBhcmlhTGFiZWwsXG4gIHNpemUgPSA3NixcbiAgcmlnaHQgPSAyNCxcbiAgYm90dG9tID0gMjQsXG4gIGNvbG9yID0gXCIjMDAyOTZiXCIsXG4gIHNoYWRvd09wYWNpdHkgPSAwLjE2LFxuICBwbHVzVGhpY2tuZXNzID0gNCxcbiAgcGx1c0xlbmd0aCA9IDI4LFxuICBvbkNsaWNrLFxuICBtZW51SXRlbXMgPSBFTVBUWV9NRU5VX0lURU1TLFxuICBpc01lbnVPcGVuLFxuICBvbk1lbnVPcGVuQ2hhbmdlLFxuICBjbG9zZU1lbnVPblNlbGVjdCA9IHRydWUsXG4gIG1lbnVBcmlhTGFiZWwsXG4gIG1lbnVDbGFzc05hbWUgPSBcIlwiLFxufTogRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcykgPT4ge1xuICBjb25zdCByb290UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaW50ZXJuYWxNZW51T3Blbiwgc2V0SW50ZXJuYWxNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGhhc01lbnUgPSBtZW51SXRlbXMubGVuZ3RoID4gMDtcbiAgY29uc3QgaXNNZW51Q29udHJvbGxlZCA9IHR5cGVvZiBpc01lbnVPcGVuID09PSBcImJvb2xlYW5cIjtcbiAgY29uc3QgbWVudU9wZW4gPSBoYXNNZW51ID8gKGlzTWVudUNvbnRyb2xsZWQgPyBCb29sZWFuKGlzTWVudU9wZW4pIDogaW50ZXJuYWxNZW51T3BlbikgOiBmYWxzZTtcbiAgY29uc3QgeyByZXNvbHZlZEJvdHRvbSB9ID0gdXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5KHtcbiAgICBib3R0b20sXG4gICAgcmlnaHQsXG4gICAgc2l6ZSxcbiAgfSk7XG5cbiAgY29uc3Qgc2V0TWVudU9wZW4gPSB1c2VDYWxsYmFjayhcbiAgICAobmV4dE9wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmICghaGFzTWVudSkgcmV0dXJuO1xuICAgICAgaWYgKCFpc01lbnVDb250cm9sbGVkKSB7XG4gICAgICAgIHNldEludGVybmFsTWVudU9wZW4obmV4dE9wZW4pO1xuICAgICAgfVxuICAgICAgb25NZW51T3BlbkNoYW5nZT8uKG5leHRPcGVuKTtcbiAgICB9LFxuICAgIFtoYXNNZW51LCBpc01lbnVDb250cm9sbGVkLCBvbk1lbnVPcGVuQ2hhbmdlXVxuICApO1xuXG4gIGNvbnN0IGJ1aWxkRmFiU3ZnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHNhZmVPcGFjaXR5ID0gY2xhbXAoc2hhZG93T3BhY2l0eSwgMCwgMC41KTtcbiAgICBjb25zdCBzYWZlVGhpY2tuZXNzID0gY2xhbXAocGx1c1RoaWNrbmVzcywgMiwgOCk7XG4gICAgY29uc3Qgc2FmZUxlbmd0aCA9IGNsYW1wKHBsdXNMZW5ndGgsIDE2LCA0MCk7XG5cbiAgICBjb25zdCBjeCA9IDQ4O1xuICAgIGNvbnN0IHhWID0gY3ggLSBzYWZlVGhpY2tuZXNzIC8gMjtcbiAgICBjb25zdCB5ViA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XG4gICAgY29uc3QgeEggPSBjeCAtIHNhZmVMZW5ndGggLyAyO1xuICAgIGNvbnN0IHlIID0gY3ggLSBzYWZlVGhpY2tuZXNzIC8gMjtcblxuICAgIHJldHVybiBgXG4gICAgICA8c3ZnIHdpZHRoPVwiOTZcIiBoZWlnaHQ9XCI5NlwiIHZpZXdCb3g9XCIwIDAgOTYgOTZcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgIDxkZWZzPlxuICAgICAgICAgIDxmaWx0ZXIgaWQ9XCJmYWJTaGFkb3dcIiB4PVwiLTQwJVwiIHk9XCItNDAlXCIgd2lkdGg9XCIxODAlXCIgaGVpZ2h0PVwiMTgwJVwiPlxuICAgICAgICAgICAgPGZlRHJvcFNoYWRvdyBkeD1cIi00XCIgZHk9XCIxMFwiIHN0ZERldmlhdGlvbj1cIjZcIiBmbG9vZC1jb2xvcj1cIiMwMDBcIiBmbG9vZC1vcGFjaXR5PVwiJHtzYWZlT3BhY2l0eX1cIi8+XG4gICAgICAgICAgPC9maWx0ZXI+XG4gICAgICAgIDwvZGVmcz5cblxuICAgICAgICA8ZyBmaWx0ZXI9XCJ1cmwoI2ZhYlNoYWRvdylcIj5cbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNDhcIiBjeT1cIjQ4XCIgcj1cIjM0XCIgZmlsbD1cIiR7Y29sb3J9XCIvPlxuICAgICAgICA8L2c+XG5cbiAgICAgICAgPGcgZmlsbD1cIiNmZmZcIj5cbiAgICAgICAgICA8cmVjdCB4PVwiJHt4Vn1cIiB5PVwiJHt5Vn1cIiB3aWR0aD1cIiR7c2FmZVRoaWNrbmVzc31cIiBoZWlnaHQ9XCIke3NhZmVMZW5ndGh9XCIgcng9XCIxXCIvPlxuICAgICAgICAgIDxyZWN0IHg9XCIke3hIfVwiIHk9XCIke3lIfVwiIHdpZHRoPVwiJHtzYWZlTGVuZ3RofVwiIGhlaWdodD1cIiR7c2FmZVRoaWNrbmVzc31cIiByeD1cIjFcIi8+XG4gICAgICAgIDwvZz5cbiAgICAgIDwvc3ZnPlxuICAgIGAudHJpbSgpO1xuICB9LCBbY29sb3IsIHBsdXNMZW5ndGgsIHBsdXNUaGlja25lc3MsIHNoYWRvd09wYWNpdHldKTtcblxuICBjb25zdCByZW5kZXJTdmdUb0NhbnZhcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgaWYgKCFjdHgpIHJldHVybjtcblxuICAgIGNvbnN0IHNpemVQeCA9IE1hdGgubWF4KDQwLCBzaXplKTtcbiAgICBjb25zdCBkcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgY2FudmFzLndpZHRoID0gTWF0aC5yb3VuZChzaXplUHggKiBkcHIpO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBNYXRoLnJvdW5kKHNpemVQeCAqIGRwcik7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7c2l6ZVB4fXB4YDtcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZVB4fXB4YDtcbiAgICBjdHguc2V0VHJhbnNmb3JtKGRwciwgMCwgMCwgZHByLCAwLCAwKTtcblxuICAgIGNvbnN0IHN2ZyA9IGJ1aWxkRmFiU3ZnKCk7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtzdmddLCB7IHR5cGU6IFwiaW1hZ2Uvc3ZnK3htbFwiIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuZGVjb2RpbmcgPSBcImFzeW5jXCI7XG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc2l6ZVB4LCBzaXplUHgpO1xuICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIHNpemVQeCwgc2l6ZVB4KTtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICB9O1xuICAgIGltZy5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IHVybDtcbiAgfSwgW2J1aWxkRmFiU3ZnLCBzaXplXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZW5kZXJTdmdUb0NhbnZhcygpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlbmRlclN2Z1RvQ2FudmFzKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVuZGVyU3ZnVG9DYW52YXMpO1xuICB9LCBbcmVuZGVyU3ZnVG9DYW52YXNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbWVudU9wZW4pIHJldHVybjtcblxuICAgIGNvbnN0IGhhbmRsZU91dHNpZGVDbGljayA9IChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XG4gICAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICAgIGlmIChyb290UmVmLmN1cnJlbnQ/LmNvbnRhaW5zKG5vZGUpKSByZXR1cm47XG4gICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZUNsaWNrKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVPdXRzaWRlQ2xpY2ssIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlRXNjYXBlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlT3V0c2lkZUNsaWNrKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGUpO1xuICAgIH07XG4gIH0sIFttZW51T3Blbiwgc2V0TWVudU9wZW5dKTtcblxuICBjb25zdCBydW5QcmltYXJ5QWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBvbkNsaWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcm91dGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcm91dGU7XG4gIH0sIFtvbkNsaWNrLCByb3V0ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZU1haW5DbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaGFzTWVudSkge1xuICAgICAgc2V0TWVudU9wZW4oIW1lbnVPcGVuKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBydW5QcmltYXJ5QWN0aW9uKCk7XG4gIH0sIFtoYXNNZW51LCBtZW51T3BlbiwgcnVuUHJpbWFyeUFjdGlvbiwgc2V0TWVudU9wZW5dKTtcblxuICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKGl0ZW06IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlbS5vbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgaXRlbS5vbkNsaWNrKCk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0ucm91dGUgJiYgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGl0ZW0ucm91dGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjbG9zZU1lbnVPblNlbGVjdCkge1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbY2xvc2VNZW51T25TZWxlY3QsIHNldE1lbnVPcGVuXVxuICApO1xuXG4gIGNvbnN0IG1lbnVQYW5lbENsYXNzTmFtZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSBcIm1pbi13LVsxMXJlbV0gcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTIgc2hhZG93LXhsXCI7XG4gICAgY29uc3QgZXh0cmEgPSBtZW51Q2xhc3NOYW1lLnRyaW0oKTtcbiAgICByZXR1cm4gZXh0cmEgPyBgJHtiYXNlfSAke2V4dHJhfWAgOiBiYXNlO1xuICB9LCBbbWVudUNsYXNzTmFtZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXtyb290UmVmfVxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgei0yMDAwIGZsZXggZmxleC1jb2wgaXRlbXMtZW5kIGdhcC0yXCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHJpZ2h0OiBgJHtyaWdodH1weGAsXG4gICAgICAgIGJvdHRvbTogYCR7cmVzb2x2ZWRCb3R0b219cHhgLFxuICAgICAgfX1cbiAgICA+XG4gICAgICB7bWVudU9wZW4gPyAoXG4gICAgICAgIDxkaXYgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsPXttZW51QXJpYUxhYmVsIHx8IGFyaWFMYWJlbH0gY2xhc3NOYW1lPXttZW51UGFuZWxDbGFzc05hbWV9PlxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgIHttZW51SXRlbXMubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgIDxsaSBrZXk9e2l0ZW0uaWR9PlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgcm9sZT1cIm1lbnVpdGVtXCJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2l0ZW0uYXJpYUxhYmVsIHx8IGl0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXRlbS5kaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggdy1mdWxsIGl0ZW1zLWNlbnRlciBnYXAtMiByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LWxlZnQgdGV4dC1bMTZweF0gZm9udC1tZWRpdW0gbGVhZGluZy01IHRleHQtc2xhdGUtNzAwIHRyYW5zaXRpb24tY29sb3JzIGhvdmVyOmJnLXNsYXRlLTEwMCBmb2N1cy12aXNpYmxlOm91dGxpbmUtaGlkZGVuIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzQwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2soaXRlbSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2l0ZW0uaWNvbiA/IDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNSB3LTUgc2hyaW5rLTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+e2l0ZW0uaWNvbn08L3NwYW4+IDogbnVsbH1cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cblxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtoYXNNZW51ID8gbWVudU9wZW4gOiB1bmRlZmluZWR9XG4gICAgICAgIGFyaWEtaGFzcG9wdXA9e2hhc01lbnUgPyBcIm1lbnVcIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1tZCBib3JkZXItMCBiZy10cmFuc3BhcmVudCBwLTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMTUwIGhvdmVyOi10cmFuc2xhdGUteS0wLjUgYWN0aXZlOnNjYWxlLTk1IGZvY3VzLXZpc2libGU6cmluZy00IGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzMwIGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtNFwiXG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGg6IGAke3NpemV9cHhgLFxuICAgICAgICAgIGhlaWdodDogYCR7c2l6ZX1weGAsXG4gICAgICAgICAgV2Via2l0VGFwSGlnaGxpZ2h0Q29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgICAgfX1cbiAgICAgICAgb25DbGljaz17aGFuZGxlTWFpbkNsaWNrfVxuICAgICAgPlxuICAgICAgICA8Y2FudmFzIHJlZj17Y2FudmFzUmVmfSBjbGFzc05hbWU9XCJibG9jayByb3VuZGVkLW1kXCIgLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRmxvYXRpbmdBY3Rpb25CdXR0b247XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5QXJncyA9IHtcbiAgYm90dG9tOiBudW1iZXI7XG4gIHJpZ2h0OiBudW1iZXI7XG4gIHNpemU6IG51bWJlcjtcbn07XG5cbnR5cGUgVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5UmVzdWx0ID0ge1xuICByZXNvbHZlZEJvdHRvbTogbnVtYmVyO1xufTtcblxuY29uc3QgUEFHSU5BVElPTl9DTEVBUkFOQ0VfUFggPSAxNjtcbmNvbnN0IFBBR0lOQVRJT05fU0VMRUNUT1IgPSBcIltkYXRhLWluZC1wYWdpbmF0aW9uLWFuY2hvcj0ndHJ1ZSddXCI7XG5cbmNvbnN0IGdldFBhZ2luYXRpb25FbGVtZW50cyA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFtdO1xuICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihQQUdJTkFUSU9OX1NFTEVDVE9SKSk7XG59O1xuXG5jb25zdCByZXNvbHZlQm90dG9tT2Zmc2V0ID0gKHtcbiAgYm90dG9tLFxuICByaWdodCxcbiAgc2l6ZSxcbiAgdmlld3BvcnRIZWlnaHQsXG4gIHZpZXdwb3J0V2lkdGgsXG4gIHBhZ2luYXRpb25zLFxufToge1xuICBib3R0b206IG51bWJlcjtcbiAgcmlnaHQ6IG51bWJlcjtcbiAgc2l6ZTogbnVtYmVyO1xuICB2aWV3cG9ydEhlaWdodDogbnVtYmVyO1xuICB2aWV3cG9ydFdpZHRoOiBudW1iZXI7XG4gIHBhZ2luYXRpb25zOiBIVE1MRWxlbWVudFtdO1xufSkgPT4ge1xuICBjb25zdCBmYWJMZWZ0ID0gdmlld3BvcnRXaWR0aCAtIHJpZ2h0IC0gc2l6ZTtcbiAgY29uc3QgZmFiUmlnaHQgPSB2aWV3cG9ydFdpZHRoIC0gcmlnaHQ7XG5cbiAgcmV0dXJuIHBhZ2luYXRpb25zLnJlZHVjZSgobmV4dEJvdHRvbSwgZWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGlzVmlzaWJsZUluVmlld3BvcnQgPSByZWN0LndpZHRoID4gMCAmJiByZWN0LmhlaWdodCA+IDAgJiYgcmVjdC5ib3R0b20gPiAwICYmIHJlY3QudG9wIDwgdmlld3BvcnRIZWlnaHQ7XG4gICAgaWYgKCFpc1Zpc2libGVJblZpZXdwb3J0KSB7XG4gICAgICByZXR1cm4gbmV4dEJvdHRvbTtcbiAgICB9XG5cbiAgICBjb25zdCBvdmVybGFwc0ZhYkxhbmUgPSBmYWJSaWdodCA+IHJlY3QubGVmdCAtIFBBR0lOQVRJT05fQ0xFQVJBTkNFX1BYICYmIGZhYkxlZnQgPCByZWN0LnJpZ2h0ICsgUEFHSU5BVElPTl9DTEVBUkFOQ0VfUFg7XG4gICAgaWYgKCFvdmVybGFwc0ZhYkxhbmUpIHtcbiAgICAgIHJldHVybiBuZXh0Qm90dG9tO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVpcmVkQm90dG9tID0gTWF0aC5jZWlsKHZpZXdwb3J0SGVpZ2h0IC0gcmVjdC50b3AgKyBQQUdJTkFUSU9OX0NMRUFSQU5DRV9QWCk7XG4gICAgcmV0dXJuIE1hdGgubWF4KG5leHRCb3R0b20sIHJlcXVpcmVkQm90dG9tKTtcbiAgfSwgTWF0aC5tYXgoMCwgYm90dG9tKSk7XG59O1xuXG4vLyBLZWVwcyB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiBjbGVhciBvZiB2aXNpYmxlIHBhZ2luYXRpb25zLlxuZXhwb3J0IGNvbnN0IHVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eSA9ICh7XG4gIGJvdHRvbSxcbiAgcmlnaHQsXG4gIHNpemUsXG59OiBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlBcmdzKTogVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5UmVzdWx0ID0+IHtcbiAgY29uc3QgW3Jlc29sdmVkQm90dG9tLCBzZXRSZXNvbHZlZEJvdHRvbV0gPSB1c2VTdGF0ZShib3R0b20pO1xuICBjb25zdCBhbmltYXRpb25GcmFtZVJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICBjb25zdCB1cGRhdGVCb3R0b20gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIGNvbnN0IG5leHRCb3R0b20gPSByZXNvbHZlQm90dG9tT2Zmc2V0KHtcbiAgICAgIGJvdHRvbSxcbiAgICAgIHJpZ2h0LFxuICAgICAgc2l6ZSxcbiAgICAgIHZpZXdwb3J0SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICB2aWV3cG9ydFdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIHBhZ2luYXRpb25zOiBnZXRQYWdpbmF0aW9uRWxlbWVudHMoKSxcbiAgICB9KTtcblxuICAgIHNldFJlc29sdmVkQm90dG9tKChwcmV2aW91cykgPT4gKE1hdGguYWJzKHByZXZpb3VzIC0gbmV4dEJvdHRvbSkgPCAxID8gcHJldmlvdXMgOiBuZXh0Qm90dG9tKSk7XG4gIH0sIFtib3R0b20sIHJpZ2h0LCBzaXplXSk7XG5cbiAgY29uc3Qgc2NoZWR1bGVCb3R0b21VcGRhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIGlmIChhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB1cGRhdGVCb3R0b20oKTtcbiAgICB9KTtcbiAgfSwgW3VwZGF0ZUJvdHRvbV0pO1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgdXBkYXRlQm90dG9tKCk7XG5cbiAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcigoKSA9PiBzY2hlZHVsZUJvdHRvbVVwZGF0ZSgpKTtcbiAgICBnZXRQYWdpbmF0aW9uRWxlbWVudHMoKS5mb3JFYWNoKChlbGVtZW50KSA9PiBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpKTtcbiAgICByZXR1cm4gKCkgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICB9LCBbc2NoZWR1bGVCb3R0b21VcGRhdGUsIHVwZGF0ZUJvdHRvbV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIHNjaGVkdWxlQm90dG9tVXBkYXRlKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHNjaGVkdWxlQm90dG9tVXBkYXRlLCB7IGNhcHR1cmU6IHRydWUsIHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBzY2hlZHVsZUJvdHRvbVVwZGF0ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIHNjaGVkdWxlQm90dG9tVXBkYXRlLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlUmVzaXplLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIHNjaGVkdWxlQm90dG9tVXBkYXRlLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgc2NoZWR1bGVCb3R0b21VcGRhdGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgc2NoZWR1bGVCb3R0b21VcGRhdGUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlUmVzaXplKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcblxuICAgICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtzY2hlZHVsZUJvdHRvbVVwZGF0ZV0pO1xuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZWRCb3R0b20sXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXlFOzs7QUNBekUsbUJBQTBFO0FBWTFFLElBQU0sMEJBQTBCO0FBQ2hDLElBQU0sc0JBQXNCO0FBRTVCLElBQU0sd0JBQXdCLE1BQU07QUFDbEMsTUFBSSxPQUFPLGFBQWEsWUFBYSxRQUFPLENBQUM7QUFDN0MsU0FBTyxNQUFNLEtBQUssU0FBUyxpQkFB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bkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLG1CQUFtQixXQUFXO0FBQUEsRUFDakM7QUFFQSxRQUFNLHlCQUFxQix1QkFBUSxNQUFNO0FBQ3ZDLFVBQU0sT0FBTztBQUNiLFVBQU0sUUFBUSxjQUFjLEtBQUs7QUFDakMsV0FBTyxRQUFRLEdBQUcsSUFBSSxJQUFJLEtBQUssS0FBSztBQUFBLEVBQ3RDLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFFbEIsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsS0FBSztBQUFBLE1BQ0wsV0FBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLFFBQ0wsT0FBTyxHQUFHLEtBQUs7QUFBQSxRQUNmLFFBQVEsR0FBRyxjQUFjO0FBQUEsTUFDM0I7QUFBQSxNQUVDO0FBQUEsbUJBQ0MsNENBQUMsU0FBSSxNQUFLLFFBQU8sY0FBWSxpQkFBaUIsV0FBVyxXQUFXLG9CQUNsRSxzREFBQyxRQUFHLFdBQVUsYUFDWCxvQkFBVSxJQUFJLENBQUMsU0FDZCw0Q0FBQyxRQUNDO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxNQUFLO0FBQUEsWUFDTCxjQUFZLEtBQUssYUFBYSxLQUFLO0FBQUEsWUFDbkMsVUFBVSxLQUFLO0FBQUEsWUFDZixXQUFVO0FBQUEsWUFDVixTQUFTLE1BQU0sb0JBQW9CLElBQUk7QUFBQSxZQUV0QztBQUFBLG1CQUFLLE9BQU8sNENBQUMsVUFBSyxXQUFVLDREQUE0RCxlQUFLLE1BQUssSUFBVTtBQUFBLGNBQzdHLDRDQUFDLFVBQUssV0FBVSxZQUFZLGVBQUssT0FBTTtBQUFBO0FBQUE7QUFBQSxRQUN6QyxLQVhPLEtBQUssRUFZZCxDQUNELEdBQ0gsR0FDRixJQUNFO0FBQUEsUUFFSjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsY0FBWTtBQUFBLFlBQ1osaUJBQWUsVUFBVSxXQUFXO0FBQUEsWUFDcEMsaUJBQWUsVUFBVSxTQUFTO0FBQUEsWUFDbEMsV0FBVTtBQUFBLFlBQ1YsT0FBTztBQUFBLGNBQ0wsT0FBTyxHQUFHLElBQUk7QUFBQSxjQUNkLFFBQVEsR0FBRyxJQUFJO0FBQUEsY0FDZix5QkFBeUI7QUFBQSxZQUMzQjtBQUFBLFlBQ0EsU0FBUztBQUFBLFlBRVQsc0RBQUMsWUFBTyxLQUFLLFdBQVcsV0FBVSxvQkFBbUI7QUFBQTtBQUFBLFFBQ3ZEO0FBQUE7QUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUVBLElBQU8sK0JBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCJdCn0K
