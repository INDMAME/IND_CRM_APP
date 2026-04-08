import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/commons/FloatingActionButton.tsx
var import_react2 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/useFloatingActionButtonVisibility.ts
var import_react = __toESM(require_react());
var DEFAULT_FAB_BOTTOM_PX = 24;
var FAB_CONTENT_CLEARANCE_PX = 12;
var ASSISTANT_VISUAL_BASELINE_CORRECTION_PX = 6;
var ASSISTANT_LAUNCHER_SELECTOR = "[data-ind-assistant-launcher='true']";
var PAGE_FLOATING_CLEARANCE_CSS_VAR = "--ind-page-floating-clearance";
var isVisibleLayoutElement = (element) => {
  if (typeof window === "undefined") return false;
  const styles = window.getComputedStyle(element);
  if (styles.display === "none" || styles.visibility === "hidden") {
    return false;
  }
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
};
var getVisibleAssistantLauncher = () => {
  if (typeof document === "undefined") return null;
  const launchers = document.querySelectorAll(ASSISTANT_LAUNCHER_SELECTOR);
  for (const launcher of launchers) {
    if (isVisibleLayoutElement(launcher)) {
      return launcher;
    }
  }
  return null;
};
var setPageFloatingClearance = (clearance) => {
  if (typeof document === "undefined") return;
  const safeValue = `${Math.max(0, Math.ceil(clearance))}px`;
  document.documentElement.style.setProperty(PAGE_FLOATING_CLEARANCE_CSS_VAR, safeValue);
  document.getElementById("content")?.style.setProperty(PAGE_FLOATING_CLEARANCE_CSS_VAR, safeValue);
};
var clearPageFloatingClearance = () => {
  if (typeof document === "undefined") return;
  document.documentElement.style.removeProperty(PAGE_FLOATING_CLEARANCE_CSS_VAR);
  document.getElementById("content")?.style.removeProperty(PAGE_FLOATING_CLEARANCE_CSS_VAR);
};
var resolveBottomOffset = (bottom) => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Math.max(0, bottom);
  }
  const assistantLauncher = getVisibleAssistantLauncher();
  if (!assistantLauncher) {
    return Math.max(0, bottom);
  }
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const launcherRect = assistantLauncher.getBoundingClientRect();
  const launcherBottom = Math.max(0, Math.round(viewportHeight - launcherRect.bottom));
  const additionalClearance = Math.max(0, bottom - DEFAULT_FAB_BOTTOM_PX);
  return Math.max(0, launcherBottom - ASSISTANT_VISUAL_BASELINE_CORRECTION_PX + additionalClearance);
};
var resolveReservedHeight = (bottom, size) => {
  return Math.max(0, Math.ceil(bottom + Math.max(40, size) + FAB_CONTENT_CLEARANCE_PX));
};
var useFloatingActionButtonVisibility = ({
  bottom,
  size
}) => {
  const [resolvedBottom, setResolvedBottom] = (0, import_react.useState)(bottom);
  const [reservedHeight, setReservedHeight] = (0, import_react.useState)(0);
  const animationFrameRef = (0, import_react.useRef)(null);
  const updateLayout = (0, import_react.useCallback)(() => {
    if (typeof window === "undefined") return;
    const nextBottom = resolveBottomOffset(bottom);
    const nextReservedHeight = resolveReservedHeight(nextBottom, size);
    setResolvedBottom((previous) => Math.abs(previous - nextBottom) < 1 ? previous : nextBottom);
    setReservedHeight((previous) => Math.abs(previous - nextReservedHeight) < 1 ? previous : nextReservedHeight);
  }, [bottom, size]);
  const scheduleLayoutUpdate = (0, import_react.useCallback)(() => {
    if (typeof window === "undefined") return;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateLayout();
    });
  }, [updateLayout]);
  (0, import_react.useLayoutEffect)(() => {
    updateLayout();
  }, [updateLayout]);
  (0, import_react.useEffect)(() => {
    if (typeof MutationObserver === "undefined" || typeof document === "undefined") return;
    const body = document.body;
    if (!body) return;
    const observer = new MutationObserver(() => {
      scheduleLayoutUpdate();
    });
    observer.observe(body, {
      childList: true,
      subtree: true
    });
    return () => observer.disconnect();
  }, [scheduleLayoutUpdate]);
  (0, import_react.useEffect)(() => {
    setPageFloatingClearance(reservedHeight);
    return () => {
      clearPageFloatingClearance();
    };
  }, [reservedHeight]);
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      scheduleLayoutUpdate();
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
  }, [scheduleLayoutUpdate]);
  return {
    resolvedBottom,
    reservedHeight
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
    size
  });
  const portalTarget = typeof document === "undefined" ? null : document.body;
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
    const base = "min-w-[11rem] rounded-[var(--radius-xl)] border border-slate-200 bg-white p-2 shadow-xl";
    const extra = menuClassName.trim();
    return extra ? `${base} ${extra}` : base;
  }, [menuClassName]);
  const floatingActionButton = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
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
            className: "flex w-full items-center gap-2 rounded-[var(--radius-xl)] px-3 py-2 text-left text-[16px] font-medium leading-5 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
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
            className: "rounded-[var(--radius-xl)] border-0 bg-transparent p-0 transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-4",
            style: {
              width: `${size}px`,
              height: `${size}px`,
              WebkitTapHighlightColor: "transparent"
            },
            onClick: handleMainClick,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: canvasRef, className: "block rounded-[var(--radius-xl)]" })
          }
        )
      ]
    }
  );
  if (!portalTarget) {
    return floatingActionButton;
  }
  return (0, import_react_dom.createPortal)(floatingActionButton, portalTarget);
};
var FloatingActionButton_default = FloatingActionButton;

export {
  FloatingActionButton_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eSB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkudHNcIjtcblxyXG5leHBvcnQgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBpY29uPzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIHJvdXRlPzogc3RyaW5nO1xyXG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBhcmlhTGFiZWw/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBFTVBUWV9NRU5VX0lURU1TOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10gPSBbXTtcclxuXHJcbnR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcyA9IHtcclxuICByb3V0ZT86IHN0cmluZztcclxuICBhcmlhTGFiZWw6IHN0cmluZztcclxuICBzaXplPzogbnVtYmVyO1xyXG4gIHJpZ2h0PzogbnVtYmVyO1xyXG4gIGJvdHRvbT86IG51bWJlcjtcclxuICBjb2xvcj86IHN0cmluZztcclxuICBzaGFkb3dPcGFjaXR5PzogbnVtYmVyO1xyXG4gIHBsdXNUaGlja25lc3M/OiBudW1iZXI7XHJcbiAgcGx1c0xlbmd0aD86IG51bWJlcjtcclxuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcclxuICBtZW51SXRlbXM/OiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW107XHJcbiAgaXNNZW51T3Blbj86IGJvb2xlYW47XHJcbiAgb25NZW51T3BlbkNoYW5nZT86IChpc09wZW46IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgY2xvc2VNZW51T25TZWxlY3Q/OiBib29sZWFuO1xyXG4gIG1lbnVBcmlhTGFiZWw/OiBzdHJpbmc7XHJcbiAgbWVudUNsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IGNsYW1wID0gKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT4gTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHZhbHVlKSk7XHJcblxyXG4vLyBGbG9hdGluZyBhY3Rpb24gYnV0dG9uIHRoYXQgc3VwcG9ydHMgZGlyZWN0IGFjdGlvbiBvciBzcGVlZC1kaWFsIG1lbnUgbW9kZS5cclxuY29uc3QgRmxvYXRpbmdBY3Rpb25CdXR0b24gPSAoe1xyXG4gIHJvdXRlLFxyXG4gIGFyaWFMYWJlbCxcclxuICBzaXplID0gNzYsXHJcbiAgcmlnaHQgPSAyNCxcclxuICBib3R0b20gPSAyNCxcclxuICBjb2xvciA9IFwiIzAwMjk2YlwiLFxyXG4gIHNoYWRvd09wYWNpdHkgPSAwLjE2LFxyXG4gIHBsdXNUaGlja25lc3MgPSA0LFxyXG4gIHBsdXNMZW5ndGggPSAyOCxcclxuICBvbkNsaWNrLFxyXG4gIG1lbnVJdGVtcyA9IEVNUFRZX01FTlVfSVRFTVMsXHJcbiAgaXNNZW51T3BlbixcclxuICBvbk1lbnVPcGVuQ2hhbmdlLFxyXG4gIGNsb3NlTWVudU9uU2VsZWN0ID0gdHJ1ZSxcclxuICBtZW51QXJpYUxhYmVsLFxyXG4gIG1lbnVDbGFzc05hbWUgPSBcIlwiLFxyXG59OiBGbG9hdGluZ0FjdGlvbkJ1dHRvblByb3BzKSA9PiB7XHJcbiAgY29uc3Qgcm9vdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtpbnRlcm5hbE1lbnVPcGVuLCBzZXRJbnRlcm5hbE1lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBoYXNNZW51ID0gbWVudUl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3QgaXNNZW51Q29udHJvbGxlZCA9IHR5cGVvZiBpc01lbnVPcGVuID09PSBcImJvb2xlYW5cIjtcclxuICBjb25zdCBtZW51T3BlbiA9IGhhc01lbnUgPyAoaXNNZW51Q29udHJvbGxlZCA/IEJvb2xlYW4oaXNNZW51T3BlbikgOiBpbnRlcm5hbE1lbnVPcGVuKSA6IGZhbHNlO1xuICBjb25zdCB7IHJlc29sdmVkQm90dG9tIH0gPSB1c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkoe1xuICAgIGJvdHRvbSxcbiAgICBzaXplLFxuICB9KTtcbiAgY29uc3QgcG9ydGFsVGFyZ2V0ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IGRvY3VtZW50LmJvZHk7XG5cclxuICBjb25zdCBzZXRNZW51T3BlbiA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKG5leHRPcGVuOiBib29sZWFuKSA9PiB7XHJcbiAgICAgIGlmICghaGFzTWVudSkgcmV0dXJuO1xyXG4gICAgICBpZiAoIWlzTWVudUNvbnRyb2xsZWQpIHtcclxuICAgICAgICBzZXRJbnRlcm5hbE1lbnVPcGVuKG5leHRPcGVuKTtcclxuICAgICAgfVxyXG4gICAgICBvbk1lbnVPcGVuQ2hhbmdlPy4obmV4dE9wZW4pO1xyXG4gICAgfSxcclxuICAgIFtoYXNNZW51LCBpc01lbnVDb250cm9sbGVkLCBvbk1lbnVPcGVuQ2hhbmdlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGJ1aWxkRmFiU3ZnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3Qgc2FmZU9wYWNpdHkgPSBjbGFtcChzaGFkb3dPcGFjaXR5LCAwLCAwLjUpO1xyXG4gICAgY29uc3Qgc2FmZVRoaWNrbmVzcyA9IGNsYW1wKHBsdXNUaGlja25lc3MsIDIsIDgpO1xyXG4gICAgY29uc3Qgc2FmZUxlbmd0aCA9IGNsYW1wKHBsdXNMZW5ndGgsIDE2LCA0MCk7XHJcblxyXG4gICAgY29uc3QgY3ggPSA0ODtcclxuICAgIGNvbnN0IHhWID0gY3ggLSBzYWZlVGhpY2tuZXNzIC8gMjtcclxuICAgIGNvbnN0IHlWID0gY3ggLSBzYWZlTGVuZ3RoIC8gMjtcclxuICAgIGNvbnN0IHhIID0gY3ggLSBzYWZlTGVuZ3RoIC8gMjtcclxuICAgIGNvbnN0IHlIID0gY3ggLSBzYWZlVGhpY2tuZXNzIC8gMjtcclxuXHJcbiAgICByZXR1cm4gYFxyXG4gICAgICA8c3ZnIHdpZHRoPVwiOTZcIiBoZWlnaHQ9XCI5NlwiIHZpZXdCb3g9XCIwIDAgOTYgOTZcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XHJcbiAgICAgICAgPGRlZnM+XHJcbiAgICAgICAgICA8ZmlsdGVyIGlkPVwiZmFiU2hhZG93XCIgeD1cIi00MCVcIiB5PVwiLTQwJVwiIHdpZHRoPVwiMTgwJVwiIGhlaWdodD1cIjE4MCVcIj5cclxuICAgICAgICAgICAgPGZlRHJvcFNoYWRvdyBkeD1cIi00XCIgZHk9XCIxMFwiIHN0ZERldmlhdGlvbj1cIjZcIiBmbG9vZC1jb2xvcj1cIiMwMDBcIiBmbG9vZC1vcGFjaXR5PVwiJHtzYWZlT3BhY2l0eX1cIi8+XHJcbiAgICAgICAgICA8L2ZpbHRlcj5cclxuICAgICAgICA8L2RlZnM+XHJcblxyXG4gICAgICAgIDxnIGZpbHRlcj1cInVybCgjZmFiU2hhZG93KVwiPlxyXG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjQ4XCIgY3k9XCI0OFwiIHI9XCIzNFwiIGZpbGw9XCIke2NvbG9yfVwiLz5cclxuICAgICAgICA8L2c+XHJcblxyXG4gICAgICAgIDxnIGZpbGw9XCIjZmZmXCI+XHJcbiAgICAgICAgICA8cmVjdCB4PVwiJHt4Vn1cIiB5PVwiJHt5Vn1cIiB3aWR0aD1cIiR7c2FmZVRoaWNrbmVzc31cIiBoZWlnaHQ9XCIke3NhZmVMZW5ndGh9XCIgcng9XCIxXCIvPlxyXG4gICAgICAgICAgPHJlY3QgeD1cIiR7eEh9XCIgeT1cIiR7eUh9XCIgd2lkdGg9XCIke3NhZmVMZW5ndGh9XCIgaGVpZ2h0PVwiJHtzYWZlVGhpY2tuZXNzfVwiIHJ4PVwiMVwiLz5cclxuICAgICAgICA8L2c+XHJcbiAgICAgIDwvc3ZnPlxyXG4gICAgYC50cmltKCk7XHJcbiAgfSwgW2NvbG9yLCBwbHVzTGVuZ3RoLCBwbHVzVGhpY2tuZXNzLCBzaGFkb3dPcGFjaXR5XSk7XHJcblxyXG4gIGNvbnN0IHJlbmRlclN2Z1RvQ2FudmFzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xyXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgIGlmICghY3R4KSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgc2l6ZVB4ID0gTWF0aC5tYXgoNDAsIHNpemUpO1xyXG4gICAgY29uc3QgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcclxuXHJcbiAgICBjYW52YXMud2lkdGggPSBNYXRoLnJvdW5kKHNpemVQeCAqIGRwcik7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gTWF0aC5yb3VuZChzaXplUHggKiBkcHIpO1xyXG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7c2l6ZVB4fXB4YDtcclxuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtzaXplUHh9cHhgO1xyXG4gICAgY3R4LnNldFRyYW5zZm9ybShkcHIsIDAsIDAsIGRwciwgMCwgMCk7XHJcblxyXG4gICAgY29uc3Qgc3ZnID0gYnVpbGRGYWJTdmcoKTtcclxuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbc3ZnXSwgeyB0eXBlOiBcImltYWdlL3N2Zyt4bWxcIiB9KTtcclxuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWcuZGVjb2RpbmcgPSBcImFzeW5jXCI7XHJcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHNpemVQeCwgc2l6ZVB4KTtcclxuICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIHNpemVQeCwgc2l6ZVB4KTtcclxuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xyXG4gICAgfTtcclxuICAgIGltZy5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XHJcbiAgICB9O1xyXG4gICAgaW1nLnNyYyA9IHVybDtcclxuICB9LCBbYnVpbGRGYWJTdmcsIHNpemVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHJlbmRlclN2Z1RvQ2FudmFzKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZW5kZXJTdmdUb0NhbnZhcyk7XHJcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVuZGVyU3ZnVG9DYW52YXMpO1xyXG4gIH0sIFtyZW5kZXJTdmdUb0NhbnZhc10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFtZW51T3BlbikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZU91dHNpZGVDbGljayA9IChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcclxuICAgICAgY29uc3Qgbm9kZSA9IGV2ZW50LnRhcmdldCBhcyBOb2RlIHwgbnVsbDtcclxuICAgICAgaWYgKCFub2RlKSByZXR1cm47XHJcbiAgICAgIGlmIChyb290UmVmLmN1cnJlbnQ/LmNvbnRhaW5zKG5vZGUpKSByZXR1cm47XHJcbiAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlRXNjYXBlID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlT3V0c2lkZUNsaWNrLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlRXNjYXBlKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZUNsaWNrKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlT3V0c2lkZUNsaWNrKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUVzY2FwZSk7XHJcbiAgICB9O1xyXG4gIH0sIFttZW51T3Blbiwgc2V0TWVudU9wZW5dKTtcclxuXHJcbiAgY29uc3QgcnVuUHJpbWFyeUFjdGlvbiA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgIG9uQ2xpY2soKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFyb3V0ZSB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJvdXRlO1xyXG4gIH0sIFtvbkNsaWNrLCByb3V0ZV0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNYWluQ2xpY2sgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoaGFzTWVudSkge1xyXG4gICAgICBzZXRNZW51T3BlbighbWVudU9wZW4pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcnVuUHJpbWFyeUFjdGlvbigpO1xyXG4gIH0sIFtoYXNNZW51LCBtZW51T3BlbiwgcnVuUHJpbWFyeUFjdGlvbiwgc2V0TWVudU9wZW5dKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTWVudUl0ZW1DbGljayA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGl0ZW06IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0uZGlzYWJsZWQpIHJldHVybjtcclxuXHJcbiAgICAgIGlmICh0eXBlb2YgaXRlbS5vbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBpdGVtLm9uQ2xpY2soKTtcclxuICAgICAgfSBlbHNlIGlmIChpdGVtLnJvdXRlICYmIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGl0ZW0ucm91dGU7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjbG9zZU1lbnVPblNlbGVjdCkge1xyXG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtjbG9zZU1lbnVPblNlbGVjdCwgc2V0TWVudU9wZW5dXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgbWVudVBhbmVsQ2xhc3NOYW1lID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBiYXNlID0gXCJtaW4tdy1bMTFyZW1dIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtMiBzaGFkb3cteGxcIjtcbiAgICBjb25zdCBleHRyYSA9IG1lbnVDbGFzc05hbWUudHJpbSgpO1xyXG4gICAgcmV0dXJuIGV4dHJhID8gYCR7YmFzZX0gJHtleHRyYX1gIDogYmFzZTtcclxuICB9LCBbbWVudUNsYXNzTmFtZV0pO1xyXG5cclxuICBjb25zdCBmbG9hdGluZ0FjdGlvbkJ1dHRvbiA9IChcbiAgICA8ZGl2XG4gICAgICByZWY9e3Jvb3RSZWZ9XG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCB6LTIwMDAgZmxleCBmbGV4LWNvbCBpdGVtcy1lbmQgZ2FwLTJcIlxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICByaWdodDogYCR7cmlnaHR9cHhgLFxyXG4gICAgICAgIGJvdHRvbTogYCR7cmVzb2x2ZWRCb3R0b219cHhgLFxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICB7bWVudU9wZW4gPyAoXHJcbiAgICAgICAgPGRpdiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWw9e21lbnVBcmlhTGFiZWwgfHwgYXJpYUxhYmVsfSBjbGFzc05hbWU9e21lbnVQYW5lbENsYXNzTmFtZX0+XHJcbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XHJcbiAgICAgICAgICAgIHttZW51SXRlbXMubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgPGxpIGtleT17aXRlbS5pZH0+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpdGVtLmFyaWFMYWJlbCB8fCBpdGVtLmxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXRlbS5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCB3LWZ1bGwgaXRlbXMtY2VudGVyIGdhcC0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIHB4LTMgcHktMiB0ZXh0LWxlZnQgdGV4dC1bMTZweF0gZm9udC1tZWRpdW0gbGVhZGluZy01IHRleHQtc2xhdGUtNzAwIHRyYW5zaXRpb24tY29sb3JzIGhvdmVyOmJnLXNsYXRlLTEwMCBmb2N1cy12aXNpYmxlOm91dGxpbmUtaGlkZGVuIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzQwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2soaXRlbSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtpdGVtLmljb24gPyA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTUgdy01IHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPntpdGVtLmljb259PC9zcGFuPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XHJcbiAgICAgICAgYXJpYS1leHBhbmRlZD17aGFzTWVudSA/IG1lbnVPcGVuIDogdW5kZWZpbmVkfVxyXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9e2hhc01lbnUgPyBcIm1lbnVcIiA6IHVuZGVmaW5lZH1cclxuICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXItMCBiZy10cmFuc3BhcmVudCBwLTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMTUwIGhvdmVyOi10cmFuc2xhdGUteS0wLjUgYWN0aXZlOnNjYWxlLTk1IGZvY3VzLXZpc2libGU6cmluZy00IGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzMwIGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtNFwiXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogYCR7c2l6ZX1weGAsXHJcbiAgICAgICAgICBoZWlnaHQ6IGAke3NpemV9cHhgLFxyXG4gICAgICAgICAgV2Via2l0VGFwSGlnaGxpZ2h0Q29sb3I6IFwidHJhbnNwYXJlbnRcIixcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1haW5DbGlja31cclxuICAgICAgPlxuICAgICAgICA8Y2FudmFzIHJlZj17Y2FudmFzUmVmfSBjbGFzc05hbWU9XCJibG9jayByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICBpZiAoIXBvcnRhbFRhcmdldCkge1xuICAgIHJldHVybiBmbG9hdGluZ0FjdGlvbkJ1dHRvbjtcbiAgfVxuXG4gIHJldHVybiBjcmVhdGVQb3J0YWwoZmxvYXRpbmdBY3Rpb25CdXR0b24sIHBvcnRhbFRhcmdldCk7XG59O1xuXHJcbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nQWN0aW9uQnV0dG9uO1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5QXJncyA9IHtcbiAgYm90dG9tOiBudW1iZXI7XG4gIHNpemU6IG51bWJlcjtcbn07XG5cbnR5cGUgVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5UmVzdWx0ID0ge1xuICByZXNvbHZlZEJvdHRvbTogbnVtYmVyO1xuICByZXNlcnZlZEhlaWdodDogbnVtYmVyO1xufTtcblxuY29uc3QgREVGQVVMVF9GQUJfQk9UVE9NX1BYID0gMjQ7XG5jb25zdCBGQUJfQ09OVEVOVF9DTEVBUkFOQ0VfUFggPSAxMjtcbmNvbnN0IEFTU0lTVEFOVF9WSVNVQUxfQkFTRUxJTkVfQ09SUkVDVElPTl9QWCA9IDY7XG5jb25zdCBBU1NJU1RBTlRfTEFVTkNIRVJfU0VMRUNUT1IgPSBcIltkYXRhLWluZC1hc3Npc3RhbnQtbGF1bmNoZXI9J3RydWUnXVwiO1xuY29uc3QgUEFHRV9GTE9BVElOR19DTEVBUkFOQ0VfQ1NTX1ZBUiA9IFwiLS1pbmQtcGFnZS1mbG9hdGluZy1jbGVhcmFuY2VcIjtcblxuLy8gUmV0dXJucyB0cnVlIHdoZW4gb25lIERPTSBlbGVtZW50IGlzIGFjdHVhbGx5IHZpc2libGUgYW5kIGNhbiBkZWZpbmUgYSB2aXN1YWwgYmFzZWxpbmUuXG5jb25zdCBpc1Zpc2libGVMYXlvdXRFbGVtZW50ID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3Qgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gIGlmIChzdHlsZXMuZGlzcGxheSA9PT0gXCJub25lXCIgfHwgc3R5bGVzLnZpc2liaWxpdHkgPT09IFwiaGlkZGVuXCIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgcmV0dXJuIHJlY3Qud2lkdGggPiAwICYmIHJlY3QuaGVpZ2h0ID4gMDtcbn07XG5cbi8vIEZpbmRzIG9uZSB2aXNpYmxlIGFzc2lzdGFudCBsYXVuY2hlciBzbyB0aGUgRkFCIGNhbiBzaGFyZSB0aGUgc2FtZSBiYXNlbGluZS5cbmNvbnN0IGdldFZpc2libGVBc3Npc3RhbnRMYXVuY2hlciA9ICgpOiBIVE1MRWxlbWVudCB8IG51bGwgPT4ge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBsYXVuY2hlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihBU1NJU1RBTlRfTEFVTkNIRVJfU0VMRUNUT1IpO1xuICBmb3IgKGNvbnN0IGxhdW5jaGVyIG9mIGxhdW5jaGVycykge1xuICAgIGlmIChpc1Zpc2libGVMYXlvdXRFbGVtZW50KGxhdW5jaGVyKSkge1xuICAgICAgcmV0dXJuIGxhdW5jaGVyO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3Qgc2V0UGFnZUZsb2F0aW5nQ2xlYXJhbmNlID0gKGNsZWFyYW5jZTogbnVtYmVyKTogdm9pZCA9PiB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICBjb25zdCBzYWZlVmFsdWUgPSBgJHtNYXRoLm1heCgwLCBNYXRoLmNlaWwoY2xlYXJhbmNlKSl9cHhgO1xuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoUEFHRV9GTE9BVElOR19DTEVBUkFOQ0VfQ1NTX1ZBUiwgc2FmZVZhbHVlKTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250ZW50XCIpPy5zdHlsZS5zZXRQcm9wZXJ0eShQQUdFX0ZMT0FUSU5HX0NMRUFSQU5DRV9DU1NfVkFSLCBzYWZlVmFsdWUpO1xufTtcblxuY29uc3QgY2xlYXJQYWdlRmxvYXRpbmdDbGVhcmFuY2UgPSAoKTogdm9pZCA9PiB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUucmVtb3ZlUHJvcGVydHkoUEFHRV9GTE9BVElOR19DTEVBUkFOQ0VfQ1NTX1ZBUik7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKT8uc3R5bGUucmVtb3ZlUHJvcGVydHkoUEFHRV9GTE9BVElOR19DTEVBUkFOQ0VfQ1NTX1ZBUik7XG59O1xuXG4vLyBSZXNvbHZlcyB0aGUgYm90dG9tIGRpc3RhbmNlLiBXaGVuIHRoZSBhc3Npc3RhbnQgbGF1bmNoZXIgZXhpc3RzLCBpdCBiZWNvbWVzIHRoZSB2aXN1YWwgYmFzZWxpbmUuXG5jb25zdCByZXNvbHZlQm90dG9tT2Zmc2V0ID0gKGJvdHRvbTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGJvdHRvbSk7XG4gIH1cblxuICBjb25zdCBhc3Npc3RhbnRMYXVuY2hlciA9IGdldFZpc2libGVBc3Npc3RhbnRMYXVuY2hlcigpO1xuICBpZiAoIWFzc2lzdGFudExhdW5jaGVyKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGJvdHRvbSk7XG4gIH1cblxuICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IDA7XG4gIGNvbnN0IGxhdW5jaGVyUmVjdCA9IGFzc2lzdGFudExhdW5jaGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBsYXVuY2hlckJvdHRvbSA9IE1hdGgubWF4KDAsIE1hdGgucm91bmQodmlld3BvcnRIZWlnaHQgLSBsYXVuY2hlclJlY3QuYm90dG9tKSk7XG4gIGNvbnN0IGFkZGl0aW9uYWxDbGVhcmFuY2UgPSBNYXRoLm1heCgwLCBib3R0b20gLSBERUZBVUxUX0ZBQl9CT1RUT01fUFgpO1xuXG4gIHJldHVybiBNYXRoLm1heCgwLCBsYXVuY2hlckJvdHRvbSAtIEFTU0lTVEFOVF9WSVNVQUxfQkFTRUxJTkVfQ09SUkVDVElPTl9QWCArIGFkZGl0aW9uYWxDbGVhcmFuY2UpO1xufTtcblxuLy8gUmVzZXJ2ZXMgb25lIHNoYXJlZCBlbmRpbmcgbGFuZSBmb3IgZmxvYXRpbmcgVUkgd2l0aG91dCBkZXBlbmRpbmcgb24gcGFnaW5hdGlvbiBwb3NpdGlvbi5cbmNvbnN0IHJlc29sdmVSZXNlcnZlZEhlaWdodCA9IChib3R0b206IG51bWJlciwgc2l6ZTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGguY2VpbChib3R0b20gKyBNYXRoLm1heCg0MCwgc2l6ZSkgKyBGQUJfQ09OVEVOVF9DTEVBUkFOQ0VfUFgpKTtcbn07XG5cbi8vIEtlZXBzIHRoZSBmbG9hdGluZyBhY3Rpb24gYnV0dG9uIGFsaWduZWQgd2l0aCBvdGhlciBmbG9hdGluZyBVSSBhbmQgZXhwb3NlcyBvbmUgcGFnZSBjbGVhcmFuY2UgbGFuZS5cbmV4cG9ydCBjb25zdCB1c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkgPSAoe1xuICBib3R0b20sXG4gIHNpemUsXG59OiBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlBcmdzKTogVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5UmVzdWx0ID0+IHtcbiAgY29uc3QgW3Jlc29sdmVkQm90dG9tLCBzZXRSZXNvbHZlZEJvdHRvbV0gPSB1c2VTdGF0ZShib3R0b20pO1xuICBjb25zdCBbcmVzZXJ2ZWRIZWlnaHQsIHNldFJlc2VydmVkSGVpZ2h0XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBhbmltYXRpb25GcmFtZVJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICBjb25zdCB1cGRhdGVMYXlvdXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIGNvbnN0IG5leHRCb3R0b20gPSByZXNvbHZlQm90dG9tT2Zmc2V0KGJvdHRvbSk7XG4gICAgY29uc3QgbmV4dFJlc2VydmVkSGVpZ2h0ID0gcmVzb2x2ZVJlc2VydmVkSGVpZ2h0KG5leHRCb3R0b20sIHNpemUpO1xuXG4gICAgc2V0UmVzb2x2ZWRCb3R0b20oKHByZXZpb3VzKSA9PiAoTWF0aC5hYnMocHJldmlvdXMgLSBuZXh0Qm90dG9tKSA8IDEgPyBwcmV2aW91cyA6IG5leHRCb3R0b20pKTtcbiAgICBzZXRSZXNlcnZlZEhlaWdodCgocHJldmlvdXMpID0+IChNYXRoLmFicyhwcmV2aW91cyAtIG5leHRSZXNlcnZlZEhlaWdodCkgPCAxID8gcHJldmlvdXMgOiBuZXh0UmVzZXJ2ZWRIZWlnaHQpKTtcbiAgfSwgW2JvdHRvbSwgc2l6ZV0pO1xuXG4gIGNvbnN0IHNjaGVkdWxlTGF5b3V0VXBkYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpO1xuICAgIH1cblxuICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgdXBkYXRlTGF5b3V0KCk7XG4gICAgfSk7XG4gIH0sIFt1cGRhdGVMYXlvdXRdKTtcblxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIHVwZGF0ZUxheW91dCgpO1xuICB9LCBbdXBkYXRlTGF5b3V0XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG5cbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBpZiAoIWJvZHkpIHJldHVybjtcblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgc2NoZWR1bGVMYXlvdXRVcGRhdGUoKTtcbiAgICB9KTtcblxuICAgIG9ic2VydmVyLm9ic2VydmUoYm9keSwge1xuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgICAgc3VidHJlZTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJldHVybiAoKSA9PiBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gIH0sIFtzY2hlZHVsZUxheW91dFVwZGF0ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0UGFnZUZsb2F0aW5nQ2xlYXJhbmNlKHJlc2VydmVkSGVpZ2h0KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclBhZ2VGbG9hdGluZ0NsZWFyYW5jZSgpO1xuICAgIH07XG4gIH0sIFtyZXNlcnZlZEhlaWdodF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIGNvbnN0IGhhbmRsZVJlc2l6ZSA9ICgpID0+IHtcbiAgICAgIHNjaGVkdWxlTGF5b3V0VXBkYXRlKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xuXG4gICAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW3NjaGVkdWxlTGF5b3V0VXBkYXRlXSk7XG5cbiAgcmV0dXJuIHtcbiAgICByZXNvbHZlZEJvdHRvbSxcbiAgICByZXNlcnZlZEhlaWdodCxcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUEsSUFBQUEsZ0JBQXlFO0FBQ3pFLHVCQUE2Qjs7O0FDRDdCLG1CQUEwRTtBQVkxRSxJQUFNLHdCQUF3QjtBQUM5QixJQUFNLDJCQUEyQjtBQUNqQyxJQUFNLDBDQUEwQztBQUNoRCxJQUFNLDhCQUE4QjtBQUNwQyxJQUFNLGtDQUFrQztBQUd4QyxJQUFNLHlCQUF5QixDQUFDLFlBQWtDO0FBQ2hFLE1BQUksT0FBTyxXQUFXLFlBQWEsUUFBTztBQUUxQyxRQUFNLFNBQVMsT0FBTyxpQkFBaUIsT0FBTztBQUM5QyxNQUFJLE9BQU8sWUFBWSxVQUFVLE9BQU8sZUFBZSxVQUFVO0FBQy9ELFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxPQUFPLFFBQVEsc0JBQXNCO0FBQzNDLFNBQU8sS0FBSyxRQUFRLEtBQUssS0FBSyxTQUFTO0FBQ3pDO0FBR0EsSUFBTSw4QkFBOEIsTUFBMEI7QUFDNUQsTUFBSSxPQUFPLGFBQWEsWUFBYSxRQUFPO0FBRTVDLFFBQU0sWUFBWSxTQUFTLGlCQUE4QiwyQkFBMkI7QUFDcEYsYUFBVyxZQUFZLFdBQVc7QUFDaEMsUUFBSSx1QkFBdUIsUUFBUSxHQUFHO0FBQ3BDLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQUVBLElBQU0sMkJBQTJCLENBQUMsY0FBNEI7QUFDNUQsTUFBSSxPQUFPLGFBQWEsWUFBYTtBQUVyQyxRQUFNLFlBQVksR0FBRyxLQUFLLElBQUksR0FBRyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUM7QUFDdEQsV0FBUyxnQkFBZ0IsTUFBTSxZQUFZLGlDQUFpQyxTQUFTO0FBQ3JGLFdBQVMsZUFBZSxTQUFTLEdBQUcsTUFBTSxZQUFZLGlDQUFpQyxTQUFTO0FBQ2xHO0FBRUEsSUFBTSw2QkFBNkIsTUFBWTtBQUM3QyxNQUFJLE9BQU8sYUFBYSxZQUFhO0FBRXJDLFdBQVMsZ0JBQWdCLE1BQU0sZUFBZSwrQkFBK0I7QUFDN0UsV0FBUyxlQUFlLFNBQVMsR0FBRyxNQUFNLGVBQWUsK0JBQStCO0FBQzFGO0FBR0EsSUFBTSxzQkFBc0IsQ0FBQyxXQUEyQjtBQUN0RCxNQUFJLE9BQU8sV0FBVyxlQUFlLE9BQU8sYUFBYSxhQUFhO0FBQ3BFLFdBQU8sS0FBSyxJQUFJLEdBQUcsTUFBTTtBQUFBLEVBQzNCO0FBRUEsUUFBTSxvQkFBb0IsNEJBQTRCO0FBQ3RELE1BQUksQ0FBQyxtQkFBbUI7QUFDdEIsV0FBTyxLQUFLLElBQUksR0FBRyxNQUFNO0FBQUEsRUFDM0I7QUFFQSxRQUFNLGlCQUFpQixPQUFPLGVBQWUsU0FBUyxnQkFBZ0IsZ0JBQWdCO0FBQ3RGLFFBQU0sZUFBZSxrQkFBa0Isc0JBQXNCO0FBQzdELFFBQU0saUJBQWlCLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTSxpQkFBaUIsYUFBYSxNQUFNLENBQUM7QUFDbkYsUUFBTSxzQkFBc0IsS0FBSyxJQUFJLEdBQUcsU0FBUyxxQkFBcUI7QUFFdEUsU0FBTyxLQUFLLElBQUksR0FBRyxpQkFBaUIsMENBQTBDLG1CQUFtQjtBQUNuRztBQUdBLElBQU0sd0JBQXdCLENBQUMsUUFBZ0IsU0FBeUI7QUFDdEUsU0FBTyxLQUFLLElBQUksR0FBRyxLQUFLLEtBQUssU0FBUyxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksd0JBQXdCLENBQUM7QUFDdEY7QUFHTyxJQUFNLG9DQUFvQyxDQUFDO0FBQUEsRUFDaEQ7QUFBQSxFQUNBO0FBQ0YsTUFBc0Y7QUFDcEYsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSSx1QkFBUyxNQUFNO0FBQzNELFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUksdUJBQVMsQ0FBQztBQUN0RCxRQUFNLHdCQUFvQixxQkFBc0IsSUFBSTtBQUVwRCxRQUFNLG1CQUFlLDBCQUFZLE1BQU07QUFDckMsUUFBSSxPQUFPLFdBQVcsWUFBYTtBQUVuQyxVQUFNLGFBQWEsb0JBQW9CLE1BQU07QUFDN0MsVUFBTSxxQkFBcUIsc0JBQXNCLFlBQVksSUFBSTtBQUVqRSxzQkFBa0IsQ0FBQyxhQUFjLEtBQUssSUFBSSxXQUFXLFVBQVUsSUFBSSxJQUFJLFdBQVcsVUFBVztBQUM3RixzQkFBa0IsQ0FBQyxhQUFjLEtBQUssSUFBSSxXQUFXLGtCQUFrQixJQUFJLElBQUksV0FBVyxrQkFBbUI7QUFBQSxFQUMvRyxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUM7QUFFakIsUUFBTSwyQkFBdUIsMEJBQVksTUFBTTtBQUM3QyxRQUFJLE9BQU8sV0FBVyxZQUFhO0FBRW5DLFFBQUksa0JBQWtCLFlBQVksTUFBTTtBQUN0QyxhQUFPLHFCQUFxQixrQkFBa0IsT0FBTztBQUFBLElBQ3ZEO0FBRUEsc0JBQWtCLFVBQVUsT0FBTyxzQkFBc0IsTUFBTTtBQUM3RCx3QkFBa0IsVUFBVTtBQUM1QixtQkFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLFlBQVksQ0FBQztBQUVqQixvQ0FBZ0IsTUFBTTtBQUNwQixpQkFBYTtBQUFBLEVBQ2YsR0FBRyxDQUFDLFlBQVksQ0FBQztBQUVqQiw4QkFBVSxNQUFNO0FBQ2QsUUFBSSxPQUFPLHFCQUFxQixlQUFlLE9BQU8sYUFBYSxZQUFhO0FBRWhGLFVBQU0sT0FBTyxTQUFTO0FBQ3RCLFFBQUksQ0FBQyxLQUFNO0FBRVgsVUFBTSxXQUFXLElBQUksaUJBQWlCLE1BQU07QUFDMUMsMkJBQXFCO0FBQUEsSUFDdkIsQ0FBQztBQUVELGFBQVMsUUFBUSxNQUFNO0FBQUEsTUFDckIsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUVELFdBQU8sTUFBTSxTQUFTLFdBQVc7QUFBQSxFQUNuQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7QUFFekIsOEJBQVUsTUFBTTtBQUNkLDZCQUF5QixjQUFjO0FBRXZDLFdBQU8sTUFBTTtBQUNYLGlDQUEyQjtBQUFBLElBQzdCO0FBQUEsRUFDRixHQUFHLENBQUMsY0FBYyxDQUFDO0FBRW5CLDhCQUFVLE1BQU07QUFDZCxRQUFJLE9BQU8sV0FBVyxZQUFhO0FBRW5DLFVBQU0sZUFBZSxNQUFNO0FBQ3pCLDJCQUFxQjtBQUFBLElBQ3ZCO0FBRUEsV0FBTyxpQkFBaUIsVUFBVSxjQUFjLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFDakUsV0FBTyxpQkFBaUIscUJBQXFCLFlBQVk7QUFFekQsV0FBTyxNQUFNO0FBQ1gsYUFBTyxvQkFBb0IsVUFBVSxZQUFZO0FBQ2pELGFBQU8sb0JBQW9CLHFCQUFxQixZQUFZO0FBRTVELFVBQUksa0JBQWtCLFlBQVksTUFBTTtBQUN0QyxlQUFPLHFCQUFxQixrQkFBa0IsT0FBTztBQUFBLE1BQ3ZEO0FBQUEsSUFDRjtBQUFBLEVBQ0YsR0FBRyxDQUFDLG9CQUFvQixDQUFDO0FBRXpCLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FEMkRnQjtBQXZOaEIsSUFBTSxtQkFBbUQsQ0FBQztBQXFCMUQsSUFBTSxRQUFRLENBQUMsT0FBZSxLQUFhLFFBQWdCLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQztBQUc3RixJQUFNLHVCQUF1QixDQUFDO0FBQUEsRUFDNUI7QUFBQSxFQUNBO0FBQUEsRUFDQSxPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixhQUFhO0FBQUEsRUFDYjtBQUFBLEVBQ0EsWUFBWTtBQUFBLEVBQ1o7QUFBQSxFQUNBO0FBQUEsRUFDQSxvQkFBb0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0EsZ0JBQWdCO0FBQ2xCLE1BQWlDO0FBQy9CLFFBQU0sY0FBVSxzQkFBOEIsSUFBSTtBQUNsRCxRQUFNLGdCQUFZLHNCQUFpQyxJQUFJO0FBQ3ZELFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLFFBQUksd0JBQVMsS0FBSztBQUM5RCxRQUFNLFVBQVUsVUFBVSxTQUFTO0FBQ25DLFFBQU0sbUJBQW1CLE9BQU8sZUFBZTtBQUMvQyxRQUFNLFdBQVcsVUFBVyxtQkFBbUIsUUFBUSxVQUFVLElBQUksbUJBQW9CO0FBQ3pGLFFBQU0sRUFBRSxlQUFlLElBQUksa0NBQWtDO0FBQUEsSUFDM0Q7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBQ0QsUUFBTSxlQUFlLE9BQU8sYUFBYSxjQUFjLE9BQU8sU0FBUztBQUV2RSxRQUFNLGtCQUFjO0FBQUEsSUFDbEIsQ0FBQyxhQUFzQjtBQUNyQixVQUFJLENBQUMsUUFBUztBQUNkLFVBQUksQ0FBQyxrQkFBa0I7QUFDckIsNEJBQW9CLFFBQVE7QUFBQSxNQUM5QjtBQUNBLHlCQUFtQixRQUFRO0FBQUEsSUFDN0I7QUFBQSxJQUNBLENBQUMsU0FBUyxrQkFBa0IsZ0JBQWdCO0FBQUEsRUFDOUM7QUFFQSxRQUFNLGtCQUFjLDJCQUFZLE1BQU07QUFDcEMsVUFBTSxjQUFjLE1BQU0sZUFBZSxHQUFHLEdBQUc7QUFDL0MsVUFBTSxnQkFBZ0IsTUFBTSxlQUFlLEdBQUcsQ0FBQztBQUMvQyxVQUFNLGFBQWEsTUFBTSxZQUFZLElBQUksRUFBRTtBQUUzQyxVQUFNLEtBQUs7QUFDWCxVQUFNLEtBQUssS0FBSyxnQkFBZ0I7QUFDaEMsVUFBTSxLQUFLLEtBQUssYUFBYTtBQUM3QixVQUFNLEtBQUssS0FBSyxhQUFhO0FBQzdCLFVBQU0sS0FBSyxLQUFLLGdCQUFnQjtBQUVoQyxXQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0ZBSW9GLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlEQUt6RCxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBSWpDLEVBQUUsUUFBUSxFQUFFLFlBQVksYUFBYSxhQUFhLFVBQVU7QUFBQSxxQkFDNUQsRUFBRSxRQUFRLEVBQUUsWUFBWSxVQUFVLGFBQWEsYUFBYTtBQUFBO0FBQUE7QUFBQSxNQUczRSxLQUFLO0FBQUEsRUFDVCxHQUFHLENBQUMsT0FBTyxZQUFZLGVBQWUsYUFBYSxDQUFDO0FBRXBELFFBQU0sd0JBQW9CLDJCQUFZLE1BQU07QUFDMUMsVUFBTSxTQUFTLFVBQVU7QUFDekIsUUFBSSxDQUFDLE9BQVE7QUFDYixVQUFNLE1BQU0sT0FBTyxXQUFXLElBQUk7QUFDbEMsUUFBSSxDQUFDLElBQUs7QUFFVixVQUFNLFNBQVMsS0FBSyxJQUFJLElBQUksSUFBSTtBQUNoQyxVQUFNLE1BQU0sT0FBTyxvQkFBb0I7QUFFdkMsV0FBTyxRQUFRLEtBQUssTUFBTSxTQUFTLEdBQUc7QUFDdEMsV0FBTyxTQUFTLEtBQUssTUFBTSxTQUFTLEdBQUc7QUFDdkMsV0FBTyxNQUFNLFFBQVEsR0FBRyxNQUFNO0FBQzlCLFdBQU8sTUFBTSxTQUFTLEdBQUcsTUFBTTtBQUMvQixRQUFJLGFBQWEsS0FBSyxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUM7QUFFckMsVUFBTSxNQUFNLFlBQVk7QUFDeEIsVUFBTSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsVUFBTSxNQUFNLElBQUksZ0JBQWdCLElBQUk7QUFFcEMsVUFBTSxNQUFNLElBQUksTUFBTTtBQUN0QixRQUFJLFdBQVc7QUFDZixRQUFJLFNBQVMsTUFBTTtBQUNqQixVQUFJLFVBQVUsR0FBRyxHQUFHLFFBQVEsTUFBTTtBQUNsQyxVQUFJLFVBQVUsS0FBSyxHQUFHLEdBQUcsUUFBUSxNQUFNO0FBQ3ZDLFVBQUksZ0JBQWdCLEdBQUc7QUFBQSxJQUN6QjtBQUNBLFFBQUksVUFBVSxNQUFNO0FBQ2xCLFVBQUksZ0JBQWdCLEdBQUc7QUFBQSxJQUN6QjtBQUNBLFFBQUksTUFBTTtBQUFBLEVBQ1osR0FBRyxDQUFDLGFBQWEsSUFBSSxDQUFDO0FBRXRCLCtCQUFVLE1BQU07QUFDZCxzQkFBa0I7QUFDbEIsV0FBTyxpQkFBaUIsVUFBVSxpQkFBaUI7QUFDbkQsV0FBTyxNQUFNLE9BQU8sb0JBQW9CLFVBQVUsaUJBQWlCO0FBQUEsRUFDckUsR0FBRyxDQUFDLGlCQUFpQixDQUFDO0FBRXRCLCtCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsU0FBVTtBQUVmLFVBQU0scUJBQXFCLENBQUMsVUFBbUM7QUFDN0QsWUFBTSxPQUFPLE1BQU07QUFDbkIsVUFBSSxDQUFDLEtBQU07QUFDWCxVQUFJLFFBQVEsU0FBUyxTQUFTLElBQUksRUFBRztBQUNyQyxrQkFBWSxLQUFLO0FBQUEsSUFDbkI7QUFFQSxVQUFNLGVBQWUsQ0FBQyxVQUF5QjtBQUM3QyxVQUFJLE1BQU0sUUFBUSxVQUFVO0FBQzFCLG9CQUFZLEtBQUs7QUFBQSxNQUNuQjtBQUFBLElBQ0Y7QUFFQSxhQUFTLGlCQUFpQixhQUFhLGtCQUFrQjtBQUN6RCxhQUFTLGlCQUFpQixjQUFjLG9CQUFvQixFQUFFLFNBQVMsS0FBSyxDQUFDO0FBQzdFLFdBQU8saUJBQWlCLFdBQVcsWUFBWTtBQUMvQyxXQUFPLE1BQU07QUFDWCxlQUFTLG9CQUFvQixhQUFhLGtCQUFrQjtBQUM1RCxlQUFTLG9CQUFvQixjQUFjLGtCQUFrQjtBQUM3RCxhQUFPLG9CQUFvQixXQUFXLFlBQVk7QUFBQSxJQUNwRDtBQUFBLEVBQ0YsR0FBRyxDQUFDLFVBQVUsV0FBVyxDQUFDO0FBRTFCLFFBQU0sdUJBQW1CLDJCQUFZLE1BQU07QUFDekMsUUFBSSxPQUFPLFlBQVksWUFBWTtBQUNqQyxjQUFRO0FBQ1I7QUFBQSxJQUNGO0FBQ0EsUUFBSSxDQUFDLFNBQVMsT0FBTyxXQUFXLFlBQWE7QUFDN0MsV0FBTyxTQUFTLE9BQU87QUFBQSxFQUN6QixHQUFHLENBQUMsU0FBUyxLQUFLLENBQUM7QUFFbkIsUUFBTSxzQkFBa0IsMkJBQVksTUFBTTtBQUN4QyxRQUFJLFNBQVM7QUFDWCxrQkFBWSxDQUFDLFFBQVE7QUFDckI7QUFBQSxJQUNGO0FBRUEscUJBQWlCO0FBQUEsRUFDbkIsR0FBRyxDQUFDLFNBQVMsVUFBVSxrQkFBa0IsV0FBVyxDQUFDO0FBRXJELFFBQU0sMEJBQXNCO0FBQUEsSUFDMUIsQ0FBQyxTQUF1QztBQUN0QyxVQUFJLEtBQUssU0FBVTtBQUVuQixVQUFJLE9BQU8sS0FBSyxZQUFZLFlBQVk7QUFDdEMsYUFBSyxRQUFRO0FBQUEsTUFDZixXQUFXLEtBQUssU0FBUyxPQUFPLFdBQVcsYUFBYTtBQUN0RCxlQUFPLFNBQVMsT0FBTyxLQUFLO0FBQUEsTUFDOUI7QUFFQSxVQUFJLG1CQUFtQjtBQUNyQixvQkFBWSxLQUFLO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLG1CQUFtQixXQUFXO0FBQUEsRUFDakM7QUFFQSxRQUFNLHlCQUFxQix1QkFBUSxNQUFNO0FBQ3ZDLFVBQU0sT0FBTztBQUNiLFVBQU0sUUFBUSxjQUFjLEtBQUs7QUFDakMsV0FBTyxRQUFRLEdBQUcsSUFBSSxJQUFJLEtBQUssS0FBSztBQUFBLEVBQ3RDLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFFbEIsUUFBTSx1QkFDSjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsS0FBSztBQUFBLE1BQ0wsV0FBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLFFBQ0wsT0FBTyxHQUFHLEtBQUs7QUFBQSxRQUNmLFFBQVEsR0FBRyxjQUFjO0FBQUEsTUFDM0I7QUFBQSxNQUVDO0FBQUEsbUJBQ0MsNENBQUMsU0FBSSxNQUFLLFFBQU8sY0FBWSxpQkFBaUIsV0FBVyxXQUFXLG9CQUNsRSxzREFBQyxRQUFHLFdBQVUsYUFDWCxvQkFBVSxJQUFJLENBQUMsU0FDZCw0Q0FBQyxRQUNDO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxNQUFLO0FBQUEsWUFDTCxjQUFZLEtBQUssYUFBYSxLQUFLO0FBQUEsWUFDbkMsVUFBVSxLQUFLO0FBQUEsWUFDZixXQUFVO0FBQUEsWUFDVixTQUFTLE1BQU0sb0JBQW9CLElBQUk7QUFBQSxZQUV0QztBQUFBLG1CQUFLLE9BQU8sNENBQUMsVUFBSyxXQUFVLDREQUE0RCxlQUFLLE1BQUssSUFBVTtBQUFBLGNBQzdHLDRDQUFDLFVBQUssV0FBVSxZQUFZLGVBQUssT0FBTTtBQUFBO0FBQUE7QUFBQSxRQUN6QyxLQVhPLEtBQUssRUFZZCxDQUNELEdBQ0gsR0FDRixJQUNFO0FBQUEsUUFFSjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsY0FBWTtBQUFBLFlBQ1osaUJBQWUsVUFBVSxXQUFXO0FBQUEsWUFDcEMsaUJBQWUsVUFBVSxTQUFTO0FBQUEsWUFDbEMsV0FBVTtBQUFBLFlBQ1YsT0FBTztBQUFBLGNBQ0wsT0FBTyxHQUFHLElBQUk7QUFBQSxjQUNkLFFBQVEsR0FBRyxJQUFJO0FBQUEsY0FDZix5QkFBeUI7QUFBQSxZQUMzQjtBQUFBLFlBQ0EsU0FBUztBQUFBLFlBRVQsc0RBQUMsWUFBTyxLQUFLLFdBQVcsV0FBVSxvQ0FBbUM7QUFBQTtBQUFBLFFBQ3ZFO0FBQUE7QUFBQTtBQUFBLEVBQ0Y7QUFHRixNQUFJLENBQUMsY0FBYztBQUNqQixXQUFPO0FBQUEsRUFDVDtBQUVBLGFBQU8sK0JBQWEsc0JBQXNCLFlBQVk7QUFDeEQ7QUFFQSxJQUFPLCtCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiXQp9Cg==
