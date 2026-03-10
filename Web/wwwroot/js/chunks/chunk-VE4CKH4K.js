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
var SCROLL_IDLE_DELAY_MS = 180;
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
  const [isVisible, setIsVisible] = (0, import_react.useState)(true);
  const [resolvedBottom, setResolvedBottom] = (0, import_react.useState)(bottom);
  const animationFrameRef = (0, import_react.useRef)(null);
  const scrollIdleTimeoutRef = (0, import_react.useRef)(null);
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
  });
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return;
    const handleMotion = () => {
      setIsVisible(false);
      scheduleBottomUpdate();
      if (scrollIdleTimeoutRef.current !== null) {
        window.clearTimeout(scrollIdleTimeoutRef.current);
      }
      scrollIdleTimeoutRef.current = window.setTimeout(() => {
        scrollIdleTimeoutRef.current = null;
        updateBottom();
        setIsVisible(true);
      }, SCROLL_IDLE_DELAY_MS);
    };
    const handleResize = () => {
      scheduleBottomUpdate();
    };
    window.addEventListener("scroll", handleMotion, { capture: true, passive: true });
    window.addEventListener("wheel", handleMotion, { passive: true });
    window.addEventListener("touchmove", handleMotion, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("scroll", handleMotion, true);
      window.removeEventListener("wheel", handleMotion);
      window.removeEventListener("touchmove", handleMotion);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (scrollIdleTimeoutRef.current !== null) {
        window.clearTimeout(scrollIdleTimeoutRef.current);
      }
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scheduleBottomUpdate, updateBottom]);
  return {
    isVisible,
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
  const { isVisible, resolvedBottom } = useFloatingActionButtonVisibility({
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
  (0, import_react2.useEffect)(() => {
    if (isVisible || !menuOpen) return;
    setMenuOpen(false);
  }, [isVisible, menuOpen, setMenuOpen]);
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
  const rootClassName = (0, import_react2.useMemo)(() => {
    const base = "fixed z-2000 flex flex-col items-end gap-2 transition-[opacity,transform,bottom] duration-200 ease-out";
    return isVisible ? `${base} opacity-100 translate-y-0` : `${base} pointer-events-none translate-y-6 opacity-0`;
  }, [isVisible]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: rootRef,
      className: rootClassName,
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
            "aria-hidden": !isVisible,
            tabIndex: isVisible ? 0 : -1,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eSB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkudHNcIjtcblxuZXhwb3J0IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgcm91dGU/OiBzdHJpbmc7XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIGFyaWFMYWJlbD86IHN0cmluZztcbn07XG5cbmNvbnN0IEVNUFRZX01FTlVfSVRFTVM6IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXSA9IFtdO1xuXG50eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uUHJvcHMgPSB7XG4gIHJvdXRlPzogc3RyaW5nO1xuICBhcmlhTGFiZWw6IHN0cmluZztcbiAgc2l6ZT86IG51bWJlcjtcbiAgcmlnaHQ/OiBudW1iZXI7XG4gIGJvdHRvbT86IG51bWJlcjtcbiAgY29sb3I/OiBzdHJpbmc7XG4gIHNoYWRvd09wYWNpdHk/OiBudW1iZXI7XG4gIHBsdXNUaGlja25lc3M/OiBudW1iZXI7XG4gIHBsdXNMZW5ndGg/OiBudW1iZXI7XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICBtZW51SXRlbXM/OiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW107XG4gIGlzTWVudU9wZW4/OiBib29sZWFuO1xuICBvbk1lbnVPcGVuQ2hhbmdlPzogKGlzT3BlbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgY2xvc2VNZW51T25TZWxlY3Q/OiBib29sZWFuO1xuICBtZW51QXJpYUxhYmVsPzogc3RyaW5nO1xuICBtZW51Q2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcblxuLy8gRmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiB0aGF0IHN1cHBvcnRzIGRpcmVjdCBhY3Rpb24gb3Igc3BlZWQtZGlhbCBtZW51IG1vZGUuXG5jb25zdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiA9ICh7XG4gIHJvdXRlLFxuICBhcmlhTGFiZWwsXG4gIHNpemUgPSA3NixcbiAgcmlnaHQgPSAyNCxcbiAgYm90dG9tID0gMjQsXG4gIGNvbG9yID0gXCIjMDAyOTZiXCIsXG4gIHNoYWRvd09wYWNpdHkgPSAwLjE2LFxuICBwbHVzVGhpY2tuZXNzID0gNCxcbiAgcGx1c0xlbmd0aCA9IDI4LFxuICBvbkNsaWNrLFxuICBtZW51SXRlbXMgPSBFTVBUWV9NRU5VX0lURU1TLFxuICBpc01lbnVPcGVuLFxuICBvbk1lbnVPcGVuQ2hhbmdlLFxuICBjbG9zZU1lbnVPblNlbGVjdCA9IHRydWUsXG4gIG1lbnVBcmlhTGFiZWwsXG4gIG1lbnVDbGFzc05hbWUgPSBcIlwiLFxufTogRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcykgPT4ge1xuICBjb25zdCByb290UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaW50ZXJuYWxNZW51T3Blbiwgc2V0SW50ZXJuYWxNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IGhhc01lbnUgPSBtZW51SXRlbXMubGVuZ3RoID4gMDtcbiAgY29uc3QgaXNNZW51Q29udHJvbGxlZCA9IHR5cGVvZiBpc01lbnVPcGVuID09PSBcImJvb2xlYW5cIjtcbiAgY29uc3QgbWVudU9wZW4gPSBoYXNNZW51ID8gKGlzTWVudUNvbnRyb2xsZWQgPyBCb29sZWFuKGlzTWVudU9wZW4pIDogaW50ZXJuYWxNZW51T3BlbikgOiBmYWxzZTtcbiAgY29uc3QgeyBpc1Zpc2libGUsIHJlc29sdmVkQm90dG9tIH0gPSB1c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkoe1xuICAgIGJvdHRvbSxcbiAgICByaWdodCxcbiAgICBzaXplLFxuICB9KTtcblxuICBjb25zdCBzZXRNZW51T3BlbiA9IHVzZUNhbGxiYWNrKFxuICAgIChuZXh0T3BlbjogYm9vbGVhbikgPT4ge1xuICAgICAgaWYgKCFoYXNNZW51KSByZXR1cm47XG4gICAgICBpZiAoIWlzTWVudUNvbnRyb2xsZWQpIHtcbiAgICAgICAgc2V0SW50ZXJuYWxNZW51T3BlbihuZXh0T3Blbik7XG4gICAgICB9XG4gICAgICBvbk1lbnVPcGVuQ2hhbmdlPy4obmV4dE9wZW4pO1xuICAgIH0sXG4gICAgW2hhc01lbnUsIGlzTWVudUNvbnRyb2xsZWQsIG9uTWVudU9wZW5DaGFuZ2VdXG4gICk7XG5cbiAgY29uc3QgYnVpbGRGYWJTdmcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZU9wYWNpdHkgPSBjbGFtcChzaGFkb3dPcGFjaXR5LCAwLCAwLjUpO1xuICAgIGNvbnN0IHNhZmVUaGlja25lc3MgPSBjbGFtcChwbHVzVGhpY2tuZXNzLCAyLCA4KTtcbiAgICBjb25zdCBzYWZlTGVuZ3RoID0gY2xhbXAocGx1c0xlbmd0aCwgMTYsIDQwKTtcblxuICAgIGNvbnN0IGN4ID0gNDg7XG4gICAgY29uc3QgeFYgPSBjeCAtIHNhZmVUaGlja25lc3MgLyAyO1xuICAgIGNvbnN0IHlWID0gY3ggLSBzYWZlTGVuZ3RoIC8gMjtcbiAgICBjb25zdCB4SCA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XG4gICAgY29uc3QgeUggPSBjeCAtIHNhZmVUaGlja25lc3MgLyAyO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdmcgd2lkdGg9XCI5NlwiIGhlaWdodD1cIjk2XCIgdmlld0JveD1cIjAgMCA5NiA5NlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgPGZpbHRlciBpZD1cImZhYlNoYWRvd1wiIHg9XCItNDAlXCIgeT1cIi00MCVcIiB3aWR0aD1cIjE4MCVcIiBoZWlnaHQ9XCIxODAlXCI+XG4gICAgICAgICAgICA8ZmVEcm9wU2hhZG93IGR4PVwiLTRcIiBkeT1cIjEwXCIgc3RkRGV2aWF0aW9uPVwiNlwiIGZsb29kLWNvbG9yPVwiIzAwMFwiIGZsb29kLW9wYWNpdHk9XCIke3NhZmVPcGFjaXR5fVwiLz5cbiAgICAgICAgICA8L2ZpbHRlcj5cbiAgICAgICAgPC9kZWZzPlxuXG4gICAgICAgIDxnIGZpbHRlcj1cInVybCgjZmFiU2hhZG93KVwiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI0OFwiIGN5PVwiNDhcIiByPVwiMzRcIiBmaWxsPVwiJHtjb2xvcn1cIi8+XG4gICAgICAgIDwvZz5cblxuICAgICAgICA8ZyBmaWxsPVwiI2ZmZlwiPlxuICAgICAgICAgIDxyZWN0IHg9XCIke3hWfVwiIHk9XCIke3lWfVwiIHdpZHRoPVwiJHtzYWZlVGhpY2tuZXNzfVwiIGhlaWdodD1cIiR7c2FmZUxlbmd0aH1cIiByeD1cIjFcIi8+XG4gICAgICAgICAgPHJlY3QgeD1cIiR7eEh9XCIgeT1cIiR7eUh9XCIgd2lkdGg9XCIke3NhZmVMZW5ndGh9XCIgaGVpZ2h0PVwiJHtzYWZlVGhpY2tuZXNzfVwiIHJ4PVwiMVwiLz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgYC50cmltKCk7XG4gIH0sIFtjb2xvciwgcGx1c0xlbmd0aCwgcGx1c1RoaWNrbmVzcywgc2hhZG93T3BhY2l0eV0pO1xuXG4gIGNvbnN0IHJlbmRlclN2Z1RvQ2FudmFzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2l6ZVB4ID0gTWF0aC5tYXgoNDAsIHNpemUpO1xuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICBjYW52YXMud2lkdGggPSBNYXRoLnJvdW5kKHNpemVQeCAqIGRwcik7XG4gICAgY2FudmFzLmhlaWdodCA9IE1hdGgucm91bmQoc2l6ZVB4ICogZHByKTtcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBgJHtzaXplUHh9cHhgO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtzaXplUHh9cHhgO1xuICAgIGN0eC5zZXRUcmFuc2Zvcm0oZHByLCAwLCAwLCBkcHIsIDAsIDApO1xuXG4gICAgY29uc3Qgc3ZnID0gYnVpbGRGYWJTdmcoKTtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3N2Z10sIHsgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5kZWNvZGluZyA9IFwiYXN5bmNcIjtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzaXplUHgsIHNpemVQeCk7XG4gICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgc2l6ZVB4LCBzaXplUHgpO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgIH07XG4gICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gdXJsO1xuICB9LCBbYnVpbGRGYWJTdmcsIHNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlbmRlclN2Z1RvQ2FudmFzKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVuZGVyU3ZnVG9DYW52YXMpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZW5kZXJTdmdUb0NhbnZhcyk7XG4gIH0sIFtyZW5kZXJTdmdUb0NhbnZhc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFtZW51T3BlbikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZUNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IGV2ZW50LnRhcmdldCBhcyBOb2RlIHwgbnVsbDtcbiAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xuICAgICAgaWYgKHJvb3RSZWYuY3VycmVudD8uY29udGFpbnMobm9kZSkpIHJldHVybjtcbiAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlRXNjYXBlID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZU91dHNpZGVDbGljaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGUpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGVDbGljayk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUVzY2FwZSk7XG4gICAgfTtcbiAgfSwgW21lbnVPcGVuLCBzZXRNZW51T3Blbl0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzVmlzaWJsZSB8fCAhbWVudU9wZW4pIHJldHVybjtcbiAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gIH0sIFtpc1Zpc2libGUsIG1lbnVPcGVuLCBzZXRNZW51T3Blbl0pO1xuXG4gIGNvbnN0IHJ1blByaW1hcnlBY3Rpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIG9uQ2xpY2soKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFyb3V0ZSB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByb3V0ZTtcbiAgfSwgW29uQ2xpY2ssIHJvdXRlXSk7XG5cbiAgY29uc3QgaGFuZGxlTWFpbkNsaWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChoYXNNZW51KSB7XG4gICAgICBzZXRNZW51T3BlbighbWVudU9wZW4pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJ1blByaW1hcnlBY3Rpb24oKTtcbiAgfSwgW2hhc01lbnUsIG1lbnVPcGVuLCBydW5QcmltYXJ5QWN0aW9uLCBzZXRNZW51T3Blbl0pO1xuXG4gIGNvbnN0IGhhbmRsZU1lbnVJdGVtQ2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoaXRlbTogRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSkgPT4ge1xuICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHJldHVybjtcblxuICAgICAgaWYgKHR5cGVvZiBpdGVtLm9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBpdGVtLm9uQ2xpY2soKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5yb3V0ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaXRlbS5yb3V0ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGNsb3NlTWVudU9uU2VsZWN0KSB7XG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtjbG9zZU1lbnVPblNlbGVjdCwgc2V0TWVudU9wZW5dXG4gICk7XG5cbiAgY29uc3QgbWVudVBhbmVsQ2xhc3NOYW1lID0gdXNlTWVtbygoKSA9PiB7XG4gICAgY29uc3QgYmFzZSA9IFwibWluLXctWzExcmVtXSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtMiBzaGFkb3cteGxcIjtcbiAgICBjb25zdCBleHRyYSA9IG1lbnVDbGFzc05hbWUudHJpbSgpO1xuICAgIHJldHVybiBleHRyYSA/IGAke2Jhc2V9ICR7ZXh0cmF9YCA6IGJhc2U7XG4gIH0sIFttZW51Q2xhc3NOYW1lXSk7XG5cbiAgY29uc3Qgcm9vdENsYXNzTmFtZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSBcImZpeGVkIHotMjAwMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWVuZCBnYXAtMiB0cmFuc2l0aW9uLVtvcGFjaXR5LHRyYW5zZm9ybSxib3R0b21dIGR1cmF0aW9uLTIwMCBlYXNlLW91dFwiO1xuICAgIHJldHVybiBpc1Zpc2libGUgPyBgJHtiYXNlfSBvcGFjaXR5LTEwMCB0cmFuc2xhdGUteS0wYCA6IGAke2Jhc2V9IHBvaW50ZXItZXZlbnRzLW5vbmUgdHJhbnNsYXRlLXktNiBvcGFjaXR5LTBgO1xuICB9LCBbaXNWaXNpYmxlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICByZWY9e3Jvb3RSZWZ9XG4gICAgICBjbGFzc05hbWU9e3Jvb3RDbGFzc05hbWV9XG4gICAgICBzdHlsZT17e1xuICAgICAgICByaWdodDogYCR7cmlnaHR9cHhgLFxuICAgICAgICBib3R0b206IGAke3Jlc29sdmVkQm90dG9tfXB4YCxcbiAgICAgIH19XG4gICAgPlxuICAgICAge21lbnVPcGVuID8gKFxuICAgICAgICA8ZGl2IHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbD17bWVudUFyaWFMYWJlbCB8fCBhcmlhTGFiZWx9IGNsYXNzTmFtZT17bWVudVBhbmVsQ2xhc3NOYW1lfT5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICB7bWVudUl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICA8bGkga2V5PXtpdGVtLmlkfT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpdGVtLmFyaWFMYWJlbCB8fCBpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2l0ZW0uZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IHctZnVsbCBpdGVtcy1jZW50ZXIgZ2FwLTIgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC1sZWZ0IHRleHQtWzE2cHhdIGZvbnQtbWVkaXVtIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTcwMCB0cmFuc2l0aW9uLWNvbG9ycyBob3ZlcjpiZy1zbGF0ZS0xMDAgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWhpZGRlbiBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS80MCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS01MFwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGl0ZW0pfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLmljb24gPyA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTUgdy01IHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPntpdGVtLmljb259PC9zcGFuPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cbiAgICAgICAgYXJpYS1leHBhbmRlZD17aGFzTWVudSA/IG1lbnVPcGVuIDogdW5kZWZpbmVkfVxuICAgICAgICBhcmlhLWhhc3BvcHVwPXtoYXNNZW51ID8gXCJtZW51XCIgOiB1bmRlZmluZWR9XG4gICAgICAgIGFyaWEtaGlkZGVuPXshaXNWaXNpYmxlfVxuICAgICAgICB0YWJJbmRleD17aXNWaXNpYmxlID8gMCA6IC0xfVxuICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLW1kIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHAtMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0xNTAgaG92ZXI6LXRyYW5zbGF0ZS15LTAuNSBhY3RpdmU6c2NhbGUtOTUgZm9jdXMtdmlzaWJsZTpyaW5nLTQgZm9jdXMtdmlzaWJsZTpyaW5nLXByaW1hcnkvMzAgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC00XCJcbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogYCR7c2l6ZX1weGAsXG4gICAgICAgICAgaGVpZ2h0OiBgJHtzaXplfXB4YCxcbiAgICAgICAgICBXZWJraXRUYXBIaWdobGlnaHRDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICB9fVxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVNYWluQ2xpY2t9XG4gICAgICA+XG4gICAgICAgIDxjYW52YXMgcmVmPXtjYW52YXNSZWZ9IGNsYXNzTmFtZT1cImJsb2NrIHJvdW5kZWQtbWRcIiAvPlxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbjtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlBcmdzID0ge1xuICBib3R0b206IG51bWJlcjtcbiAgcmlnaHQ6IG51bWJlcjtcbiAgc2l6ZTogbnVtYmVyO1xufTtcblxudHlwZSBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlSZXN1bHQgPSB7XG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcbiAgcmVzb2x2ZWRCb3R0b206IG51bWJlcjtcbn07XG5cbmNvbnN0IFNDUk9MTF9JRExFX0RFTEFZX01TID0gMTgwO1xuY29uc3QgUEFHSU5BVElPTl9DTEVBUkFOQ0VfUFggPSAxNjtcbmNvbnN0IFBBR0lOQVRJT05fU0VMRUNUT1IgPSBcIltkYXRhLWluZC1wYWdpbmF0aW9uLWFuY2hvcj0ndHJ1ZSddXCI7XG5cbmNvbnN0IGdldFBhZ2luYXRpb25FbGVtZW50cyA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFtdO1xuICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihQQUdJTkFUSU9OX1NFTEVDVE9SKSk7XG59O1xuXG5jb25zdCByZXNvbHZlQm90dG9tT2Zmc2V0ID0gKHtcbiAgYm90dG9tLFxuICByaWdodCxcbiAgc2l6ZSxcbiAgdmlld3BvcnRIZWlnaHQsXG4gIHZpZXdwb3J0V2lkdGgsXG4gIHBhZ2luYXRpb25zLFxufToge1xuICBib3R0b206IG51bWJlcjtcbiAgcmlnaHQ6IG51bWJlcjtcbiAgc2l6ZTogbnVtYmVyO1xuICB2aWV3cG9ydEhlaWdodDogbnVtYmVyO1xuICB2aWV3cG9ydFdpZHRoOiBudW1iZXI7XG4gIHBhZ2luYXRpb25zOiBIVE1MRWxlbWVudFtdO1xufSkgPT4ge1xuICBjb25zdCBmYWJMZWZ0ID0gdmlld3BvcnRXaWR0aCAtIHJpZ2h0IC0gc2l6ZTtcbiAgY29uc3QgZmFiUmlnaHQgPSB2aWV3cG9ydFdpZHRoIC0gcmlnaHQ7XG5cbiAgcmV0dXJuIHBhZ2luYXRpb25zLnJlZHVjZSgobmV4dEJvdHRvbSwgZWxlbWVudCkgPT4ge1xuICAgIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGlzVmlzaWJsZUluVmlld3BvcnQgPSByZWN0LndpZHRoID4gMCAmJiByZWN0LmhlaWdodCA+IDAgJiYgcmVjdC5ib3R0b20gPiAwICYmIHJlY3QudG9wIDwgdmlld3BvcnRIZWlnaHQ7XG4gICAgaWYgKCFpc1Zpc2libGVJblZpZXdwb3J0KSB7XG4gICAgICByZXR1cm4gbmV4dEJvdHRvbTtcbiAgICB9XG5cbiAgICBjb25zdCBvdmVybGFwc0ZhYkxhbmUgPSBmYWJSaWdodCA+IHJlY3QubGVmdCAtIFBBR0lOQVRJT05fQ0xFQVJBTkNFX1BYICYmIGZhYkxlZnQgPCByZWN0LnJpZ2h0ICsgUEFHSU5BVElPTl9DTEVBUkFOQ0VfUFg7XG4gICAgaWYgKCFvdmVybGFwc0ZhYkxhbmUpIHtcbiAgICAgIHJldHVybiBuZXh0Qm90dG9tO1xuICAgIH1cblxuICAgIGNvbnN0IHJlcXVpcmVkQm90dG9tID0gTWF0aC5jZWlsKHZpZXdwb3J0SGVpZ2h0IC0gcmVjdC50b3AgKyBQQUdJTkFUSU9OX0NMRUFSQU5DRV9QWCk7XG4gICAgcmV0dXJuIE1hdGgubWF4KG5leHRCb3R0b20sIHJlcXVpcmVkQm90dG9tKTtcbiAgfSwgTWF0aC5tYXgoMCwgYm90dG9tKSk7XG59O1xuXG4vLyBLZWVwcyB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiBoaWRkZW4gZHVyaW5nIHNjcm9sbCBhbmQgY2xlYXIgb2YgdmlzaWJsZSBwYWdpbmF0aW9ucy5cbmV4cG9ydCBjb25zdCB1c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkgPSAoe1xuICBib3R0b20sXG4gIHJpZ2h0LFxuICBzaXplLFxufTogVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5QXJncyk6IFVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eVJlc3VsdCA9PiB7XG4gIGNvbnN0IFtpc1Zpc2libGUsIHNldElzVmlzaWJsZV0gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3Jlc29sdmVkQm90dG9tLCBzZXRSZXNvbHZlZEJvdHRvbV0gPSB1c2VTdGF0ZShib3R0b20pO1xuICBjb25zdCBhbmltYXRpb25GcmFtZVJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgc2Nyb2xsSWRsZVRpbWVvdXRSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgdXBkYXRlQm90dG9tID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICBjb25zdCBuZXh0Qm90dG9tID0gcmVzb2x2ZUJvdHRvbU9mZnNldCh7XG4gICAgICBib3R0b20sXG4gICAgICByaWdodCxcbiAgICAgIHNpemUsXG4gICAgICB2aWV3cG9ydEhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgdmlld3BvcnRXaWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICBwYWdpbmF0aW9uczogZ2V0UGFnaW5hdGlvbkVsZW1lbnRzKCksXG4gICAgfSk7XG5cbiAgICBzZXRSZXNvbHZlZEJvdHRvbSgocHJldmlvdXMpID0+IChNYXRoLmFicyhwcmV2aW91cyAtIG5leHRCb3R0b20pIDwgMSA/IHByZXZpb3VzIDogbmV4dEJvdHRvbSkpO1xuICB9LCBbYm90dG9tLCByaWdodCwgc2l6ZV0pO1xuXG4gIGNvbnN0IHNjaGVkdWxlQm90dG9tVXBkYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpO1xuICAgIH1cblxuICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgdXBkYXRlQm90dG9tKCk7XG4gICAgfSk7XG4gIH0sIFt1cGRhdGVCb3R0b21dKTtcblxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIHVwZGF0ZUJvdHRvbSgpO1xuXG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gc2NoZWR1bGVCb3R0b21VcGRhdGUoKSk7XG4gICAgZ2V0UGFnaW5hdGlvbkVsZW1lbnRzKCkuZm9yRWFjaCgoZWxlbWVudCkgPT4gb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KSk7XG4gICAgcmV0dXJuICgpID0+IG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlTW90aW9uID0gKCkgPT4ge1xuICAgICAgc2V0SXNWaXNpYmxlKGZhbHNlKTtcbiAgICAgIHNjaGVkdWxlQm90dG9tVXBkYXRlKCk7XG5cbiAgICAgIGlmIChzY3JvbGxJZGxlVGltZW91dFJlZi5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoc2Nyb2xsSWRsZVRpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgICB9XG5cbiAgICAgIHNjcm9sbElkbGVUaW1lb3V0UmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbElkbGVUaW1lb3V0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICB1cGRhdGVCb3R0b20oKTtcbiAgICAgICAgc2V0SXNWaXNpYmxlKHRydWUpO1xuICAgICAgfSwgU0NST0xMX0lETEVfREVMQVlfTVMpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVSZXNpemUgPSAoKSA9PiB7XG4gICAgICBzY2hlZHVsZUJvdHRvbVVwZGF0ZSgpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVNb3Rpb24sIHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIGhhbmRsZU1vdGlvbiwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIGhhbmRsZU1vdGlvbiwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBoYW5kbGVNb3Rpb24sIHRydWUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCBoYW5kbGVNb3Rpb24pO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgaGFuZGxlTW90aW9uKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIGhhbmRsZVJlc2l6ZSk7XG5cbiAgICAgIGlmIChzY3JvbGxJZGxlVGltZW91dFJlZi5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoc2Nyb2xsSWRsZVRpbWVvdXRSZWYuY3VycmVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbc2NoZWR1bGVCb3R0b21VcGRhdGUsIHVwZGF0ZUJvdHRvbV0pO1xuXG4gIHJldHVybiB7XG4gICAgaXNWaXNpYmxlLFxuICAgIHJlc29sdmVkQm90dG9tLFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTs7O0FDQXpFLG1CQUEwRTtBQWExRSxJQUFNLHVCQUF1QjtBQUM3QixJQUFNLDBCQUEwQjtBQUNoQyxJQUFNLHNCQUFzQjtBQUU1QixJQUFNLHdCQUF3QixNQUFNO0FBQ2xDLE1BQUksT0FBTyxhQUFhLFlBQWEsUUFBTyxDQUFDO0FBQzdDLFNBQU8sTUFBTSxLQUFLLFNBQVMsaUJBQThCLG1CQUFtQixDQUFDO0FBQy9FO0FBRUEsSUFBTSxzQkFBc0IsQ0FBQztBQUFBLEVBQzNCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQU9NO0FBQ0osUUFBTSxVQUFVLGdCQUFnQixRQUFRO0FBQ3hDLFFBQU0sV0FBVyxnQkFBZ0I7QUFFakMsU0FBTyxZQUFZLE9BQU8sQ0FBQyxZQUFZLFlBQVk7QUFDakQsVUFBTSxPQUFPLFFBQVEsc0JBQXNCO0FBQzNDLFVBQU0sc0JBQXNCLEtBQUssUUFBUSxLQUFLLEtBQUssU0FBUyxLQUFLLEtBQUssU0FBUyxLQUFLLEtBQUssTUFBTTtBQUMvRixRQUFJLENBQUMscUJBQXFCO0FBQ3hCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxrQkFBa0IsV0FBVyxLQUFLLE9BQU8sMkJBQTJCLFVBQVUsS0FBSyxRQUFRO0FBQ2pHLFFBQUksQ0FBQyxpQkFBaUI7QUFDcEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLGlCQUFpQixLQUFLLEtBQUssaUJBQWlCLEtBQUssTUFBTSx1QkFBdUI7QUFDcEYsV0FBTyxLQUFLLElBQUksWUFBWSxjQUFjO0FBQUEsRUFDNUMsR0FBRyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUM7QUFDeEI7QUFHTyxJQUFNLG9DQUFvQyxDQUFDO0FBQUEsRUFD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LEtBQUssS0FBSztBQUFBLEVBQ3RDLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFFbEIsUUFBTSxvQkFBZ0IsdUJBQVEsTUFBTTtBQUNsQyxVQUFNLE9BQU87QUFDYixXQUFPLFlBQVksR0FBRyxJQUFJLCtCQUErQixHQUFHLElBQUk7QUFBQSxFQUNsRSxHQUFHLENBQUMsU0FBUyxDQUFDO0FBRWQsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsS0FBSztBQUFBLE1BQ0wsV0FBVztBQUFBLE1BQ1gsT0FBTztBQUFBLFFBQ0wsT0FBTyxHQUFHLEtBQUs7QUFBQSxRQUNmLFFBQVEsR0FBRyxjQUFjO0FBQUEsTUFDM0I7QUFBQSxNQUVDO0FBQUEsbUJBQ0MsNENBQUMsU0FBSSxNQUFLLFFBQU8sY0FBWSxpQkFBaUIsV0FBVyxXQUFXLG9CQUNsRSxzREFBQyxRQUFHLFdBQVUsYUFDWCxvQkFBVSxJQUFJLENBQUMsU0FDZCw0Q0FBQyxRQUNDO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxNQUFLO0FBQUEsWUFDTCxjQUFZLEtBQUssYUFBYSxLQUFLO0FBQUEsWUFDbkMsVUFBVSxLQUFLO0FBQUEsWUFDZixXQUFVO0FBQUEsWUFDVixTQUFTLE1BQU0sb0JBQW9CLElBQUk7QUFBQSxZQUV0QztBQUFBLG1CQUFLLE9BQU8sNENBQUMsVUFBSyxXQUFVLDREQUE0RCxlQUFLLE1BQUssSUFBVTtBQUFBLGNBQzdHLDRDQUFDLFVBQUssV0FBVSxZQUFZLGVBQUssT0FBTTtBQUFBO0FBQUE7QUFBQSxRQUN6QyxLQVhPLEtBQUssRUFZZCxDQUNELEdBQ0gsR0FDRixJQUNFO0FBQUEsUUFFSjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsY0FBWTtBQUFBLFlBQ1osaUJBQWUsVUFBVSxXQUFXO0FBQUEsWUFDcEMsaUJBQWUsVUFBVSxTQUFTO0FBQUEsWUFDbEMsZUFBYSxDQUFDO0FBQUEsWUFDZCxVQUFVLFlBQVksSUFBSTtBQUFBLFlBQzFCLFdBQVU7QUFBQSxZQUNWLE9BQU87QUFBQSxjQUNMLE9BQU8sR0FBRyxJQUFJO0FBQUEsY0FDZCxRQUFRLEdBQUcsSUFBSTtBQUFBLGNBQ2YseUJBQXlCO0FBQUEsWUFDM0I7QUFBQSxZQUNBLFNBQVM7QUFBQSxZQUVULHNEQUFDLFlBQU8sS0FBSyxXQUFXLFdBQVUsb0JBQW1CO0FBQUE7QUFBQSxRQUN2RDtBQUFBO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxJQUFPLCtCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiXQp9Cg==
