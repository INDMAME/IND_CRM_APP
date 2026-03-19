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
var PAGINATION_SELECTOR = "[data-ind-pagination-anchor='true']";
var LAYOUT_CARD_SELECTOR = ".timeline-item .timeline-card, .timeline-box .timeline-card, [data-ind-card-anchor='true']";
var ASSISTANT_LAUNCHER_SELECTOR = "[data-ind-assistant-launcher='true']";
var getPaginationElements = () => {
  if (typeof document === "undefined") return [];
  return Array.from(document.querySelectorAll(PAGINATION_SELECTOR));
};
var getLayoutCardElements = () => {
  if (typeof document === "undefined") return [];
  return Array.from(document.querySelectorAll(LAYOUT_CARD_SELECTOR));
};
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
  return Math.max(0, launcherBottom + additionalClearance);
};
var hasTrailingContentAnchor = () => {
  return getPaginationElements().some((element) => isVisibleLayoutElement(element)) || getLayoutCardElements().some((element) => isVisibleLayoutElement(element));
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
    const nextReservedHeight = hasTrailingContentAnchor() ? Math.ceil(nextBottom + Math.max(40, size) + FAB_CONTENT_CLEARANCE_PX) : 0;
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
  const { resolvedBottom, reservedHeight } = useFloatingActionButtonVisibility({
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
    const base = "min-w-[11rem] rounded-xl border border-slate-200 bg-white p-2 shadow-xl";
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
  const trailingSpacer = reservedHeight > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      "aria-hidden": "true",
      "data-ind-floating-action-spacer": "true",
      className: "pointer-events-none",
      style: { height: `${reservedHeight}px` }
    }
  ) : null;
  if (!portalTarget) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      trailingSpacer,
      floatingActionButton
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    trailingSpacer ? (0, import_react_dom.createPortal)(trailingSpacer, portalTarget) : null,
    (0, import_react_dom.createPortal)(floatingActionButton, portalTarget)
  ] });
};
var FloatingActionButton_default = FloatingActionButton;

export {
  FloatingActionButton_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCB7IHVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eSB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkudHNcIjtcblxyXG5leHBvcnQgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBpY29uPzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIHJvdXRlPzogc3RyaW5nO1xyXG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBhcmlhTGFiZWw/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBFTVBUWV9NRU5VX0lURU1TOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10gPSBbXTtcclxuXHJcbnR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcyA9IHtcclxuICByb3V0ZT86IHN0cmluZztcclxuICBhcmlhTGFiZWw6IHN0cmluZztcclxuICBzaXplPzogbnVtYmVyO1xyXG4gIHJpZ2h0PzogbnVtYmVyO1xyXG4gIGJvdHRvbT86IG51bWJlcjtcclxuICBjb2xvcj86IHN0cmluZztcclxuICBzaGFkb3dPcGFjaXR5PzogbnVtYmVyO1xyXG4gIHBsdXNUaGlja25lc3M/OiBudW1iZXI7XHJcbiAgcGx1c0xlbmd0aD86IG51bWJlcjtcclxuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcclxuICBtZW51SXRlbXM/OiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW107XHJcbiAgaXNNZW51T3Blbj86IGJvb2xlYW47XHJcbiAgb25NZW51T3BlbkNoYW5nZT86IChpc09wZW46IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgY2xvc2VNZW51T25TZWxlY3Q/OiBib29sZWFuO1xyXG4gIG1lbnVBcmlhTGFiZWw/OiBzdHJpbmc7XHJcbiAgbWVudUNsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IGNsYW1wID0gKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT4gTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHZhbHVlKSk7XHJcblxyXG4vLyBGbG9hdGluZyBhY3Rpb24gYnV0dG9uIHRoYXQgc3VwcG9ydHMgZGlyZWN0IGFjdGlvbiBvciBzcGVlZC1kaWFsIG1lbnUgbW9kZS5cclxuY29uc3QgRmxvYXRpbmdBY3Rpb25CdXR0b24gPSAoe1xyXG4gIHJvdXRlLFxyXG4gIGFyaWFMYWJlbCxcclxuICBzaXplID0gNzYsXHJcbiAgcmlnaHQgPSAyNCxcclxuICBib3R0b20gPSAyNCxcclxuICBjb2xvciA9IFwiIzAwMjk2YlwiLFxyXG4gIHNoYWRvd09wYWNpdHkgPSAwLjE2LFxyXG4gIHBsdXNUaGlja25lc3MgPSA0LFxyXG4gIHBsdXNMZW5ndGggPSAyOCxcclxuICBvbkNsaWNrLFxyXG4gIG1lbnVJdGVtcyA9IEVNUFRZX01FTlVfSVRFTVMsXHJcbiAgaXNNZW51T3BlbixcclxuICBvbk1lbnVPcGVuQ2hhbmdlLFxyXG4gIGNsb3NlTWVudU9uU2VsZWN0ID0gdHJ1ZSxcclxuICBtZW51QXJpYUxhYmVsLFxyXG4gIG1lbnVDbGFzc05hbWUgPSBcIlwiLFxyXG59OiBGbG9hdGluZ0FjdGlvbkJ1dHRvblByb3BzKSA9PiB7XHJcbiAgY29uc3Qgcm9vdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtpbnRlcm5hbE1lbnVPcGVuLCBzZXRJbnRlcm5hbE1lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBoYXNNZW51ID0gbWVudUl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3QgaXNNZW51Q29udHJvbGxlZCA9IHR5cGVvZiBpc01lbnVPcGVuID09PSBcImJvb2xlYW5cIjtcclxuICBjb25zdCBtZW51T3BlbiA9IGhhc01lbnUgPyAoaXNNZW51Q29udHJvbGxlZCA/IEJvb2xlYW4oaXNNZW51T3BlbikgOiBpbnRlcm5hbE1lbnVPcGVuKSA6IGZhbHNlO1xuICBjb25zdCB7IHJlc29sdmVkQm90dG9tLCByZXNlcnZlZEhlaWdodCB9ID0gdXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5KHtcbiAgICBib3R0b20sXG4gICAgc2l6ZSxcbiAgfSk7XG4gIGNvbnN0IHBvcnRhbFRhcmdldCA9IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIiA/IG51bGwgOiBkb2N1bWVudC5ib2R5O1xuXHJcbiAgY29uc3Qgc2V0TWVudU9wZW4gPSB1c2VDYWxsYmFjayhcclxuICAgIChuZXh0T3BlbjogYm9vbGVhbikgPT4ge1xyXG4gICAgICBpZiAoIWhhc01lbnUpIHJldHVybjtcclxuICAgICAgaWYgKCFpc01lbnVDb250cm9sbGVkKSB7XHJcbiAgICAgICAgc2V0SW50ZXJuYWxNZW51T3BlbihuZXh0T3Blbik7XHJcbiAgICAgIH1cclxuICAgICAgb25NZW51T3BlbkNoYW5nZT8uKG5leHRPcGVuKTtcclxuICAgIH0sXHJcbiAgICBbaGFzTWVudSwgaXNNZW51Q29udHJvbGxlZCwgb25NZW51T3BlbkNoYW5nZV1cclxuICApO1xyXG5cclxuICBjb25zdCBidWlsZEZhYlN2ZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVPcGFjaXR5ID0gY2xhbXAoc2hhZG93T3BhY2l0eSwgMCwgMC41KTtcclxuICAgIGNvbnN0IHNhZmVUaGlja25lc3MgPSBjbGFtcChwbHVzVGhpY2tuZXNzLCAyLCA4KTtcclxuICAgIGNvbnN0IHNhZmVMZW5ndGggPSBjbGFtcChwbHVzTGVuZ3RoLCAxNiwgNDApO1xyXG5cclxuICAgIGNvbnN0IGN4ID0gNDg7XHJcbiAgICBjb25zdCB4ViA9IGN4IC0gc2FmZVRoaWNrbmVzcyAvIDI7XHJcbiAgICBjb25zdCB5ViA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XHJcbiAgICBjb25zdCB4SCA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XHJcbiAgICBjb25zdCB5SCA9IGN4IC0gc2FmZVRoaWNrbmVzcyAvIDI7XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgICAgPHN2ZyB3aWR0aD1cIjk2XCIgaGVpZ2h0PVwiOTZcIiB2aWV3Qm94PVwiMCAwIDk2IDk2XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgIDxkZWZzPlxyXG4gICAgICAgICAgPGZpbHRlciBpZD1cImZhYlNoYWRvd1wiIHg9XCItNDAlXCIgeT1cIi00MCVcIiB3aWR0aD1cIjE4MCVcIiBoZWlnaHQ9XCIxODAlXCI+XHJcbiAgICAgICAgICAgIDxmZURyb3BTaGFkb3cgZHg9XCItNFwiIGR5PVwiMTBcIiBzdGREZXZpYXRpb249XCI2XCIgZmxvb2QtY29sb3I9XCIjMDAwXCIgZmxvb2Qtb3BhY2l0eT1cIiR7c2FmZU9wYWNpdHl9XCIvPlxyXG4gICAgICAgICAgPC9maWx0ZXI+XHJcbiAgICAgICAgPC9kZWZzPlxyXG5cclxuICAgICAgICA8ZyBmaWx0ZXI9XCJ1cmwoI2ZhYlNoYWRvdylcIj5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI0OFwiIGN5PVwiNDhcIiByPVwiMzRcIiBmaWxsPVwiJHtjb2xvcn1cIi8+XHJcbiAgICAgICAgPC9nPlxyXG5cclxuICAgICAgICA8ZyBmaWxsPVwiI2ZmZlwiPlxyXG4gICAgICAgICAgPHJlY3QgeD1cIiR7eFZ9XCIgeT1cIiR7eVZ9XCIgd2lkdGg9XCIke3NhZmVUaGlja25lc3N9XCIgaGVpZ2h0PVwiJHtzYWZlTGVuZ3RofVwiIHJ4PVwiMVwiLz5cclxuICAgICAgICAgIDxyZWN0IHg9XCIke3hIfVwiIHk9XCIke3lIfVwiIHdpZHRoPVwiJHtzYWZlTGVuZ3RofVwiIGhlaWdodD1cIiR7c2FmZVRoaWNrbmVzc31cIiByeD1cIjFcIi8+XHJcbiAgICAgICAgPC9nPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIGAudHJpbSgpO1xyXG4gIH0sIFtjb2xvciwgcGx1c0xlbmd0aCwgcGx1c1RoaWNrbmVzcywgc2hhZG93T3BhY2l0eV0pO1xyXG5cclxuICBjb25zdCByZW5kZXJTdmdUb0NhbnZhcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHNpemVQeCA9IE1hdGgubWF4KDQwLCBzaXplKTtcclxuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gTWF0aC5yb3VuZChzaXplUHggKiBkcHIpO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IE1hdGgucm91bmQoc2l6ZVB4ICogZHByKTtcclxuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3NpemVQeH1weGA7XHJcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZVB4fXB4YDtcclxuICAgIGN0eC5zZXRUcmFuc2Zvcm0oZHByLCAwLCAwLCBkcHIsIDAsIDApO1xyXG5cclxuICAgIGNvbnN0IHN2ZyA9IGJ1aWxkRmFiU3ZnKCk7XHJcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3N2Z10sIHsgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIgfSk7XHJcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLmRlY29kaW5nID0gXCJhc3luY1wiO1xyXG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzaXplUHgsIHNpemVQeCk7XHJcbiAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBzaXplUHgsIHNpemVQeCk7XHJcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcclxuICAgIH07XHJcbiAgICBpbWcub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xyXG4gICAgfTtcclxuICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgfSwgW2J1aWxkRmFiU3ZnLCBzaXplXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZW5kZXJTdmdUb0NhbnZhcygpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVuZGVyU3ZnVG9DYW52YXMpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlbmRlclN2Z1RvQ2FudmFzKTtcclxuICB9LCBbcmVuZGVyU3ZnVG9DYW52YXNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbWVudU9wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XHJcbiAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgICBpZiAocm9vdFJlZi5jdXJyZW50Py5jb250YWlucyhub2RlKSkgcmV0dXJuO1xyXG4gICAgICBzZXRNZW51T3BlbihmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZUNsaWNrKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZU91dHNpZGVDbGljaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUVzY2FwZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGVDbGljayk7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZU91dHNpZGVDbGljayk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGUpO1xyXG4gICAgfTtcclxuICB9LCBbbWVudU9wZW4sIHNldE1lbnVPcGVuXSk7XHJcblxyXG4gIGNvbnN0IHJ1blByaW1hcnlBY3Rpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIG9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICBvbkNsaWNrKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghcm91dGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByb3V0ZTtcclxuICB9LCBbb25DbGljaywgcm91dGVdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTWFpbkNsaWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGhhc01lbnUpIHtcclxuICAgICAgc2V0TWVudU9wZW4oIW1lbnVPcGVuKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1blByaW1hcnlBY3Rpb24oKTtcclxuICB9LCBbaGFzTWVudSwgbWVudU9wZW4sIHJ1blByaW1hcnlBY3Rpb24sIHNldE1lbnVPcGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1lbnVJdGVtQ2xpY2sgPSB1c2VDYWxsYmFjayhcclxuICAgIChpdGVtOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLmRpc2FibGVkKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGl0ZW0ub25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgaXRlbS5vbkNsaWNrKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5yb3V0ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBpdGVtLnJvdXRlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2xvc2VNZW51T25TZWxlY3QpIHtcclxuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbY2xvc2VNZW51T25TZWxlY3QsIHNldE1lbnVPcGVuXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG1lbnVQYW5lbENsYXNzTmFtZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgYmFzZSA9IFwibWluLXctWzExcmVtXSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtMiBzaGFkb3cteGxcIjtcclxuICAgIGNvbnN0IGV4dHJhID0gbWVudUNsYXNzTmFtZS50cmltKCk7XHJcbiAgICByZXR1cm4gZXh0cmEgPyBgJHtiYXNlfSAke2V4dHJhfWAgOiBiYXNlO1xyXG4gIH0sIFttZW51Q2xhc3NOYW1lXSk7XHJcblxyXG4gIGNvbnN0IGZsb2F0aW5nQWN0aW9uQnV0dG9uID0gKFxuICAgIDxkaXZcbiAgICAgIHJlZj17cm9vdFJlZn1cbiAgICAgIGNsYXNzTmFtZT1cImZpeGVkIHotMjAwMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWVuZCBnYXAtMlwiXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHJpZ2h0OiBgJHtyaWdodH1weGAsXHJcbiAgICAgICAgYm90dG9tOiBgJHtyZXNvbHZlZEJvdHRvbX1weGAsXHJcbiAgICAgIH19XHJcbiAgICA+XHJcbiAgICAgIHttZW51T3BlbiA/IChcclxuICAgICAgICA8ZGl2IHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbD17bWVudUFyaWFMYWJlbCB8fCBhcmlhTGFiZWx9IGNsYXNzTmFtZT17bWVudVBhbmVsQ2xhc3NOYW1lfT5cclxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cclxuICAgICAgICAgICAge21lbnVJdGVtcy5tYXAoKGl0ZW0pID0+IChcclxuICAgICAgICAgICAgICA8bGkga2V5PXtpdGVtLmlkfT5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2l0ZW0uYXJpYUxhYmVsIHx8IGl0ZW0ubGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpdGVtLmRpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IHctZnVsbCBpdGVtcy1jZW50ZXIgZ2FwLTIgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC1sZWZ0IHRleHQtWzE2cHhdIGZvbnQtbWVkaXVtIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTcwMCB0cmFuc2l0aW9uLWNvbG9ycyBob3ZlcjpiZy1zbGF0ZS0xMDAgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWhpZGRlbiBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS80MCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS01MFwiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU1lbnVJdGVtQ2xpY2soaXRlbSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtpdGVtLmljb24gPyA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTUgdy01IHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPntpdGVtLmljb259PC9zcGFuPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRydW5jYXRlXCI+e2l0ZW0ubGFiZWx9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgPC9saT5cclxuICAgICAgICAgICAgKSl9XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XHJcbiAgICAgICAgYXJpYS1leHBhbmRlZD17aGFzTWVudSA/IG1lbnVPcGVuIDogdW5kZWZpbmVkfVxyXG4gICAgICAgIGFyaWEtaGFzcG9wdXA9e2hhc01lbnUgPyBcIm1lbnVcIiA6IHVuZGVmaW5lZH1cclxuICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLW1kIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHAtMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0xNTAgaG92ZXI6LXRyYW5zbGF0ZS15LTAuNSBhY3RpdmU6c2NhbGUtOTUgZm9jdXMtdmlzaWJsZTpyaW5nLTQgZm9jdXMtdmlzaWJsZTpyaW5nLXByaW1hcnkvMzAgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC00XCJcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgd2lkdGg6IGAke3NpemV9cHhgLFxyXG4gICAgICAgICAgaGVpZ2h0OiBgJHtzaXplfXB4YCxcclxuICAgICAgICAgIFdlYmtpdFRhcEhpZ2hsaWdodENvbG9yOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICAgICAgfX1cclxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVNYWluQ2xpY2t9XHJcbiAgICAgID5cbiAgICAgICAgPGNhbnZhcyByZWY9e2NhbnZhc1JlZn0gY2xhc3NOYW1lPVwiYmxvY2sgcm91bmRlZC1tZFwiIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcblxuICBjb25zdCB0cmFpbGluZ1NwYWNlciA9XG4gICAgcmVzZXJ2ZWRIZWlnaHQgPiAwID8gKFxuICAgICAgPGRpdlxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgICBkYXRhLWluZC1mbG9hdGluZy1hY3Rpb24tc3BhY2VyPVwidHJ1ZVwiXG4gICAgICAgIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICBzdHlsZT17eyBoZWlnaHQ6IGAke3Jlc2VydmVkSGVpZ2h0fXB4YCB9fVxuICAgICAgLz5cbiAgICApIDogbnVsbDtcblxuICBpZiAoIXBvcnRhbFRhcmdldCkge1xuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICB7dHJhaWxpbmdTcGFjZXJ9XG4gICAgICAgIHtmbG9hdGluZ0FjdGlvbkJ1dHRvbn1cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICB7dHJhaWxpbmdTcGFjZXIgPyBjcmVhdGVQb3J0YWwodHJhaWxpbmdTcGFjZXIsIHBvcnRhbFRhcmdldCkgOiBudWxsfVxuICAgICAge2NyZWF0ZVBvcnRhbChmbG9hdGluZ0FjdGlvbkJ1dHRvbiwgcG9ydGFsVGFyZ2V0KX1cbiAgICA8Lz5cbiAgKTtcbn07XG5cclxuZXhwb3J0IGRlZmF1bHQgRmxvYXRpbmdBY3Rpb25CdXR0b247XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlBcmdzID0ge1xuICBib3R0b206IG51bWJlcjtcbiAgc2l6ZTogbnVtYmVyO1xufTtcblxudHlwZSBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlSZXN1bHQgPSB7XG4gIHJlc29sdmVkQm90dG9tOiBudW1iZXI7XG4gIHJlc2VydmVkSGVpZ2h0OiBudW1iZXI7XG59O1xuXG5jb25zdCBERUZBVUxUX0ZBQl9CT1RUT01fUFggPSAyNDtcbmNvbnN0IEZBQl9DT05URU5UX0NMRUFSQU5DRV9QWCA9IDEyO1xuY29uc3QgUEFHSU5BVElPTl9TRUxFQ1RPUiA9IFwiW2RhdGEtaW5kLXBhZ2luYXRpb24tYW5jaG9yPSd0cnVlJ11cIjtcbmNvbnN0IExBWU9VVF9DQVJEX1NFTEVDVE9SID0gXCIudGltZWxpbmUtaXRlbSAudGltZWxpbmUtY2FyZCwgLnRpbWVsaW5lLWJveCAudGltZWxpbmUtY2FyZCwgW2RhdGEtaW5kLWNhcmQtYW5jaG9yPSd0cnVlJ11cIjtcbmNvbnN0IEFTU0lTVEFOVF9MQVVOQ0hFUl9TRUxFQ1RPUiA9IFwiW2RhdGEtaW5kLWFzc2lzdGFudC1sYXVuY2hlcj0ndHJ1ZSddXCI7XG5cbmNvbnN0IGdldFBhZ2luYXRpb25FbGVtZW50cyA9ICgpID0+IHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIFtdO1xuICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihQQUdJTkFUSU9OX1NFTEVDVE9SKSk7XG59O1xuXG5jb25zdCBnZXRMYXlvdXRDYXJkRWxlbWVudHMgPSAoKSA9PiB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBbXTtcbiAgcmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oTEFZT1VUX0NBUkRfU0VMRUNUT1IpKTtcbn07XG5cbi8vIFJldHVybnMgdHJ1ZSB3aGVuIG9uZSBsYXlvdXQgYW5jaG9yIGlzIHJlbmRlcmVkIGFuZCBjYW4gZGVmaW5lIHRoZSBwYWdlIGVuZGluZy5cbmNvbnN0IGlzVmlzaWJsZUxheW91dEVsZW1lbnQgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcblxuICBjb25zdCBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgaWYgKHN0eWxlcy5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBzdHlsZXMudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4gcmVjdC53aWR0aCA+IDAgJiYgcmVjdC5oZWlnaHQgPiAwO1xufTtcblxuLy8gRmluZHMgb25lIHZpc2libGUgYXNzaXN0YW50IGxhdW5jaGVyIHNvIHRoZSBGQUIgY2FuIHNoYXJlIHRoZSBzYW1lIGJhc2VsaW5lLlxuY29uc3QgZ2V0VmlzaWJsZUFzc2lzdGFudExhdW5jaGVyID0gKCk6IEhUTUxFbGVtZW50IHwgbnVsbCA9PiB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGxhdW5jaGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KEFTU0lTVEFOVF9MQVVOQ0hFUl9TRUxFQ1RPUik7XG4gIGZvciAoY29uc3QgbGF1bmNoZXIgb2YgbGF1bmNoZXJzKSB7XG4gICAgaWYgKGlzVmlzaWJsZUxheW91dEVsZW1lbnQobGF1bmNoZXIpKSB7XG4gICAgICByZXR1cm4gbGF1bmNoZXI7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vLyBSZXNvbHZlcyB0aGUgYm90dG9tIGRpc3RhbmNlLiBXaGVuIHRoZSBhc3Npc3RhbnQgbGF1bmNoZXIgZXhpc3RzLCBpdCBiZWNvbWVzIHRoZSB2aXN1YWwgYmFzZWxpbmUuXG5jb25zdCByZXNvbHZlQm90dG9tT2Zmc2V0ID0gKGJvdHRvbTogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGJvdHRvbSk7XG4gIH1cblxuICBjb25zdCBhc3Npc3RhbnRMYXVuY2hlciA9IGdldFZpc2libGVBc3Npc3RhbnRMYXVuY2hlcigpO1xuICBpZiAoIWFzc2lzdGFudExhdW5jaGVyKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGJvdHRvbSk7XG4gIH1cblxuICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IDA7XG4gIGNvbnN0IGxhdW5jaGVyUmVjdCA9IGFzc2lzdGFudExhdW5jaGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBsYXVuY2hlckJvdHRvbSA9IE1hdGgubWF4KDAsIE1hdGgucm91bmQodmlld3BvcnRIZWlnaHQgLSBsYXVuY2hlclJlY3QuYm90dG9tKSk7XG4gIGNvbnN0IGFkZGl0aW9uYWxDbGVhcmFuY2UgPSBNYXRoLm1heCgwLCBib3R0b20gLSBERUZBVUxUX0ZBQl9CT1RUT01fUFgpO1xuXG4gIHJldHVybiBNYXRoLm1heCgwLCBsYXVuY2hlckJvdHRvbSArIGFkZGl0aW9uYWxDbGVhcmFuY2UpO1xufTtcblxuLy8gVGhlIHBhZ2Ugb25seSBuZWVkcyB0aGUgZXh0cmEgdHJhaWxpbmcgc3BhY2Ugd2hlbiB0aGVyZSBpcyBhIGNhcmQgbGlzdCBvciBvbmUgcGFnaW5hdGlvbiBibG9jayB0byBjbGVhci5cbmNvbnN0IGhhc1RyYWlsaW5nQ29udGVudEFuY2hvciA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIChcbiAgICBnZXRQYWdpbmF0aW9uRWxlbWVudHMoKS5zb21lKChlbGVtZW50KSA9PiBpc1Zpc2libGVMYXlvdXRFbGVtZW50KGVsZW1lbnQpKSB8fFxuICAgIGdldExheW91dENhcmRFbGVtZW50cygpLnNvbWUoKGVsZW1lbnQpID0+IGlzVmlzaWJsZUxheW91dEVsZW1lbnQoZWxlbWVudCkpXG4gICk7XG59O1xuXG4vLyBLZWVwcyB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiBhbGlnbmVkIHdpdGggb3RoZXIgZmxvYXRpbmcgVUkgYW5kIHJlc2VydmVzIG9uZSBjbGVhbiBlbmRpbmcgbGFuZS5cbmV4cG9ydCBjb25zdCB1c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkgPSAoe1xuICBib3R0b20sXG4gIHNpemUsXG59OiBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlBcmdzKTogVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5UmVzdWx0ID0+IHtcbiAgY29uc3QgW3Jlc29sdmVkQm90dG9tLCBzZXRSZXNvbHZlZEJvdHRvbV0gPSB1c2VTdGF0ZShib3R0b20pO1xuICBjb25zdCBbcmVzZXJ2ZWRIZWlnaHQsIHNldFJlc2VydmVkSGVpZ2h0XSA9IHVzZVN0YXRlKDApO1xuICBjb25zdCBhbmltYXRpb25GcmFtZVJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICBjb25zdCB1cGRhdGVMYXlvdXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIGNvbnN0IG5leHRCb3R0b20gPSByZXNvbHZlQm90dG9tT2Zmc2V0KGJvdHRvbSk7XG4gICAgY29uc3QgbmV4dFJlc2VydmVkSGVpZ2h0ID0gaGFzVHJhaWxpbmdDb250ZW50QW5jaG9yKClcbiAgICAgID8gTWF0aC5jZWlsKG5leHRCb3R0b20gKyBNYXRoLm1heCg0MCwgc2l6ZSkgKyBGQUJfQ09OVEVOVF9DTEVBUkFOQ0VfUFgpXG4gICAgICA6IDA7XG5cbiAgICBzZXRSZXNvbHZlZEJvdHRvbSgocHJldmlvdXMpID0+IChNYXRoLmFicyhwcmV2aW91cyAtIG5leHRCb3R0b20pIDwgMSA/IHByZXZpb3VzIDogbmV4dEJvdHRvbSkpO1xuICAgIHNldFJlc2VydmVkSGVpZ2h0KChwcmV2aW91cykgPT4gKE1hdGguYWJzKHByZXZpb3VzIC0gbmV4dFJlc2VydmVkSGVpZ2h0KSA8IDEgPyBwcmV2aW91cyA6IG5leHRSZXNlcnZlZEhlaWdodCkpO1xuICB9LCBbYm90dG9tLCBzaXplXSk7XG5cbiAgY29uc3Qgc2NoZWR1bGVMYXlvdXRVcGRhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIGlmIChhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XG4gICAgfVxuXG4gICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB1cGRhdGVMYXlvdXQoKTtcbiAgICB9KTtcbiAgfSwgW3VwZGF0ZUxheW91dF0pO1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgdXBkYXRlTGF5b3V0KCk7XG4gIH0sIFt1cGRhdGVMYXlvdXRdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcblxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGlmICghYm9keSkgcmV0dXJuO1xuXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XG4gICAgICBzY2hlZHVsZUxheW91dFVwZGF0ZSgpO1xuICAgIH0pO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShib2R5LCB7XG4gICAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuICgpID0+IG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgfSwgW3NjaGVkdWxlTGF5b3V0VXBkYXRlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xuICAgICAgc2NoZWR1bGVMYXlvdXRVcGRhdGUoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgaGFuZGxlUmVzaXplLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIGhhbmRsZVJlc2l6ZSk7XG5cbiAgICAgIGlmIChhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbc2NoZWR1bGVMYXlvdXRVcGRhdGVdKTtcblxuICByZXR1cm4ge1xuICAgIHJlc29sdmVkQm90dG9tLFxuICAgIHJlc2VydmVkSGVpZ2h0LFxuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBeUU7QUFDekUsdUJBQTZCOzs7QUNEN0IsbUJBQTBFO0FBWTFFLElBQU0sd0JBQXdCO0FBQzlCLElBQU0sMkJBQTJCO0FBQ2pDLElBQU0sc0JBQXNCO0FBQzVCLElBQU0sdUJBQXVCO0FBQzdCLElBQU0sOEJBQThCO0FBRXBDLElBQU0sd0JBQXdCLE1BQU07QUFDbEMsTUFBSSxPQUFPLGFBQWEsWUFBYSxRQUFPLENBQUM7QUFDN0MsU0FBTyxNQUFNLEtBQUssU0FBUyxpQkFBOEIsbUJBQW1CLENBQUM7QUFDL0U7QUFFQSxJQUFNLHdCQUF3QixNQUFNO0FBQ2xDLE1BQUksT0FBTyxhQUFhLFlBQWEsUUFBTyxDQUFDO0FBQzdD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
