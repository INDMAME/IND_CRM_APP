import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-WUZVRL45.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyB1c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5LnRzXCI7XHJcblxyXG5leHBvcnQgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBpY29uPzogUmVhY3QuUmVhY3ROb2RlO1xyXG4gIHJvdXRlPzogc3RyaW5nO1xyXG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICBhcmlhTGFiZWw/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBFTVBUWV9NRU5VX0lURU1TOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW10gPSBbXTtcclxuXHJcbnR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcyA9IHtcclxuICByb3V0ZT86IHN0cmluZztcclxuICBhcmlhTGFiZWw6IHN0cmluZztcclxuICBzaXplPzogbnVtYmVyO1xyXG4gIHJpZ2h0PzogbnVtYmVyO1xyXG4gIGJvdHRvbT86IG51bWJlcjtcclxuICBjb2xvcj86IHN0cmluZztcclxuICBzaGFkb3dPcGFjaXR5PzogbnVtYmVyO1xyXG4gIHBsdXNUaGlja25lc3M/OiBudW1iZXI7XHJcbiAgcGx1c0xlbmd0aD86IG51bWJlcjtcclxuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcclxuICBtZW51SXRlbXM/OiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW107XHJcbiAgaXNNZW51T3Blbj86IGJvb2xlYW47XHJcbiAgb25NZW51T3BlbkNoYW5nZT86IChpc09wZW46IGJvb2xlYW4pID0+IHZvaWQ7XHJcbiAgY2xvc2VNZW51T25TZWxlY3Q/OiBib29sZWFuO1xyXG4gIG1lbnVBcmlhTGFiZWw/OiBzdHJpbmc7XHJcbiAgbWVudUNsYXNzTmFtZT86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IGNsYW1wID0gKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT4gTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHZhbHVlKSk7XHJcblxyXG4vLyBGbG9hdGluZyBhY3Rpb24gYnV0dG9uIHRoYXQgc3VwcG9ydHMgZGlyZWN0IGFjdGlvbiBvciBzcGVlZC1kaWFsIG1lbnUgbW9kZS5cclxuY29uc3QgRmxvYXRpbmdBY3Rpb25CdXR0b24gPSAoe1xyXG4gIHJvdXRlLFxyXG4gIGFyaWFMYWJlbCxcclxuICBzaXplID0gNzYsXHJcbiAgcmlnaHQgPSAyNCxcclxuICBib3R0b20gPSAyNCxcclxuICBjb2xvciA9IFwiIzAwMjk2YlwiLFxyXG4gIHNoYWRvd09wYWNpdHkgPSAwLjE2LFxyXG4gIHBsdXNUaGlja25lc3MgPSA0LFxyXG4gIHBsdXNMZW5ndGggPSAyOCxcclxuICBvbkNsaWNrLFxyXG4gIG1lbnVJdGVtcyA9IEVNUFRZX01FTlVfSVRFTVMsXHJcbiAgaXNNZW51T3BlbixcclxuICBvbk1lbnVPcGVuQ2hhbmdlLFxyXG4gIGNsb3NlTWVudU9uU2VsZWN0ID0gdHJ1ZSxcclxuICBtZW51QXJpYUxhYmVsLFxyXG4gIG1lbnVDbGFzc05hbWUgPSBcIlwiLFxyXG59OiBGbG9hdGluZ0FjdGlvbkJ1dHRvblByb3BzKSA9PiB7XHJcbiAgY29uc3Qgcm9vdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGNhbnZhc1JlZiA9IHVzZVJlZjxIVE1MQ2FudmFzRWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtpbnRlcm5hbE1lbnVPcGVuLCBzZXRJbnRlcm5hbE1lbnVPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBoYXNNZW51ID0gbWVudUl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3QgaXNNZW51Q29udHJvbGxlZCA9IHR5cGVvZiBpc01lbnVPcGVuID09PSBcImJvb2xlYW5cIjtcclxuICBjb25zdCBtZW51T3BlbiA9IGhhc01lbnUgPyAoaXNNZW51Q29udHJvbGxlZCA/IEJvb2xlYW4oaXNNZW51T3BlbikgOiBpbnRlcm5hbE1lbnVPcGVuKSA6IGZhbHNlO1xyXG4gIGNvbnN0IHsgcmVzb2x2ZWRCb3R0b20sIHJlc2VydmVkSGVpZ2h0IH0gPSB1c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkoe1xyXG4gICAgYm90dG9tLFxyXG4gICAgc2l6ZSxcclxuICB9KTtcclxuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgY29uc3Qgc2V0TWVudU9wZW4gPSB1c2VDYWxsYmFjayhcclxuICAgIChuZXh0T3BlbjogYm9vbGVhbikgPT4ge1xyXG4gICAgICBpZiAoIWhhc01lbnUpIHJldHVybjtcclxuICAgICAgaWYgKCFpc01lbnVDb250cm9sbGVkKSB7XHJcbiAgICAgICAgc2V0SW50ZXJuYWxNZW51T3BlbihuZXh0T3Blbik7XHJcbiAgICAgIH1cclxuICAgICAgb25NZW51T3BlbkNoYW5nZT8uKG5leHRPcGVuKTtcclxuICAgIH0sXHJcbiAgICBbaGFzTWVudSwgaXNNZW51Q29udHJvbGxlZCwgb25NZW51T3BlbkNoYW5nZV1cclxuICApO1xyXG5cclxuICBjb25zdCBidWlsZEZhYlN2ZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVPcGFjaXR5ID0gY2xhbXAoc2hhZG93T3BhY2l0eSwgMCwgMC41KTtcclxuICAgIGNvbnN0IHNhZmVUaGlja25lc3MgPSBjbGFtcChwbHVzVGhpY2tuZXNzLCAyLCA4KTtcclxuICAgIGNvbnN0IHNhZmVMZW5ndGggPSBjbGFtcChwbHVzTGVuZ3RoLCAxNiwgNDApO1xyXG5cclxuICAgIGNvbnN0IGN4ID0gNDg7XHJcbiAgICBjb25zdCB4ViA9IGN4IC0gc2FmZVRoaWNrbmVzcyAvIDI7XHJcbiAgICBjb25zdCB5ViA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XHJcbiAgICBjb25zdCB4SCA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XHJcbiAgICBjb25zdCB5SCA9IGN4IC0gc2FmZVRoaWNrbmVzcyAvIDI7XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgICAgPHN2ZyB3aWR0aD1cIjk2XCIgaGVpZ2h0PVwiOTZcIiB2aWV3Qm94PVwiMCAwIDk2IDk2XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgIDxkZWZzPlxyXG4gICAgICAgICAgPGZpbHRlciBpZD1cImZhYlNoYWRvd1wiIHg9XCItNDAlXCIgeT1cIi00MCVcIiB3aWR0aD1cIjE4MCVcIiBoZWlnaHQ9XCIxODAlXCI+XHJcbiAgICAgICAgICAgIDxmZURyb3BTaGFkb3cgZHg9XCItNFwiIGR5PVwiMTBcIiBzdGREZXZpYXRpb249XCI2XCIgZmxvb2QtY29sb3I9XCIjMDAwXCIgZmxvb2Qtb3BhY2l0eT1cIiR7c2FmZU9wYWNpdHl9XCIvPlxyXG4gICAgICAgICAgPC9maWx0ZXI+XHJcbiAgICAgICAgPC9kZWZzPlxyXG5cclxuICAgICAgICA8ZyBmaWx0ZXI9XCJ1cmwoI2ZhYlNoYWRvdylcIj5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI0OFwiIGN5PVwiNDhcIiByPVwiMzRcIiBmaWxsPVwiJHtjb2xvcn1cIi8+XHJcbiAgICAgICAgPC9nPlxyXG5cclxuICAgICAgICA8ZyBmaWxsPVwiI2ZmZlwiPlxyXG4gICAgICAgICAgPHJlY3QgeD1cIiR7eFZ9XCIgeT1cIiR7eVZ9XCIgd2lkdGg9XCIke3NhZmVUaGlja25lc3N9XCIgaGVpZ2h0PVwiJHtzYWZlTGVuZ3RofVwiIHJ4PVwiMVwiLz5cclxuICAgICAgICAgIDxyZWN0IHg9XCIke3hIfVwiIHk9XCIke3lIfVwiIHdpZHRoPVwiJHtzYWZlTGVuZ3RofVwiIGhlaWdodD1cIiR7c2FmZVRoaWNrbmVzc31cIiByeD1cIjFcIi8+XHJcbiAgICAgICAgPC9nPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIGAudHJpbSgpO1xyXG4gIH0sIFtjb2xvciwgcGx1c0xlbmd0aCwgcGx1c1RoaWNrbmVzcywgc2hhZG93T3BhY2l0eV0pO1xyXG5cclxuICBjb25zdCByZW5kZXJTdmdUb0NhbnZhcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHNpemVQeCA9IE1hdGgubWF4KDQwLCBzaXplKTtcclxuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gTWF0aC5yb3VuZChzaXplUHggKiBkcHIpO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IE1hdGgucm91bmQoc2l6ZVB4ICogZHByKTtcclxuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3NpemVQeH1weGA7XHJcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZVB4fXB4YDtcclxuICAgIGN0eC5zZXRUcmFuc2Zvcm0oZHByLCAwLCAwLCBkcHIsIDAsIDApO1xyXG5cclxuICAgIGNvbnN0IHN2ZyA9IGJ1aWxkRmFiU3ZnKCk7XHJcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3N2Z10sIHsgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIgfSk7XHJcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLmRlY29kaW5nID0gXCJhc3luY1wiO1xyXG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzaXplUHgsIHNpemVQeCk7XHJcbiAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBzaXplUHgsIHNpemVQeCk7XHJcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcclxuICAgIH07XHJcbiAgICBpbWcub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xyXG4gICAgfTtcclxuICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgfSwgW2J1aWxkRmFiU3ZnLCBzaXplXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZW5kZXJTdmdUb0NhbnZhcygpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVuZGVyU3ZnVG9DYW52YXMpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlbmRlclN2Z1RvQ2FudmFzKTtcclxuICB9LCBbcmVuZGVyU3ZnVG9DYW52YXNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbWVudU9wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XHJcbiAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgICBpZiAocm9vdFJlZi5jdXJyZW50Py5jb250YWlucyhub2RlKSkgcmV0dXJuO1xyXG4gICAgICBzZXRNZW51T3BlbihmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZUNsaWNrKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZU91dHNpZGVDbGljaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUVzY2FwZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGVDbGljayk7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZU91dHNpZGVDbGljayk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGUpO1xyXG4gICAgfTtcclxuICB9LCBbbWVudU9wZW4sIHNldE1lbnVPcGVuXSk7XHJcblxyXG4gIGNvbnN0IHJ1blByaW1hcnlBY3Rpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIG9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICBvbkNsaWNrKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghcm91dGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByb3V0ZTtcclxuICB9LCBbb25DbGljaywgcm91dGVdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTWFpbkNsaWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGhhc01lbnUpIHtcclxuICAgICAgc2V0TWVudU9wZW4oIW1lbnVPcGVuKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1blByaW1hcnlBY3Rpb24oKTtcclxuICB9LCBbaGFzTWVudSwgbWVudU9wZW4sIHJ1blByaW1hcnlBY3Rpb24sIHNldE1lbnVPcGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1lbnVJdGVtQ2xpY2sgPSB1c2VDYWxsYmFjayhcclxuICAgIChpdGVtOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLmRpc2FibGVkKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGl0ZW0ub25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgaXRlbS5vbkNsaWNrKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5yb3V0ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBpdGVtLnJvdXRlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2xvc2VNZW51T25TZWxlY3QpIHtcclxuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbY2xvc2VNZW51T25TZWxlY3QsIHNldE1lbnVPcGVuXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG1lbnVQYW5lbENsYXNzTmFtZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgYmFzZSA9IFwibWluLXctWzExcmVtXSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlIHAtMiBzaGFkb3cteGxcIjtcclxuICAgIGNvbnN0IGV4dHJhID0gbWVudUNsYXNzTmFtZS50cmltKCk7XHJcbiAgICByZXR1cm4gZXh0cmEgPyBgJHtiYXNlfSAke2V4dHJhfWAgOiBiYXNlO1xyXG4gIH0sIFttZW51Q2xhc3NOYW1lXSk7XHJcblxyXG4gIGNvbnN0IGZsb2F0aW5nQWN0aW9uQnV0dG9uID0gKFxyXG4gICAgPGRpdlxyXG4gICAgICByZWY9e3Jvb3RSZWZ9XHJcbiAgICAgIGNsYXNzTmFtZT1cImZpeGVkIHotMjAwMCBmbGV4IGZsZXgtY29sIGl0ZW1zLWVuZCBnYXAtMlwiXHJcbiAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgcmlnaHQ6IGAke3JpZ2h0fXB4YCxcclxuICAgICAgICBib3R0b206IGAke3Jlc29sdmVkQm90dG9tfXB4YCxcclxuICAgICAgfX1cclxuICAgID5cclxuICAgICAge21lbnVPcGVuID8gKFxyXG4gICAgICAgIDxkaXYgcm9sZT1cIm1lbnVcIiBhcmlhLWxhYmVsPXttZW51QXJpYUxhYmVsIHx8IGFyaWFMYWJlbH0gY2xhc3NOYW1lPXttZW51UGFuZWxDbGFzc05hbWV9PlxyXG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxyXG4gICAgICAgICAgICB7bWVudUl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxsaSBrZXk9e2l0ZW0uaWR9PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgcm9sZT1cIm1lbnVpdGVtXCJcclxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aXRlbS5hcmlhTGFiZWwgfHwgaXRlbS5sYWJlbH1cclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2l0ZW0uZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggdy1mdWxsIGl0ZW1zLWNlbnRlciBnYXAtMiByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LWxlZnQgdGV4dC1bMTZweF0gZm9udC1tZWRpdW0gbGVhZGluZy01IHRleHQtc2xhdGUtNzAwIHRyYW5zaXRpb24tY29sb3JzIGhvdmVyOmJnLXNsYXRlLTEwMCBmb2N1cy12aXNpYmxlOm91dGxpbmUtaGlkZGVuIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzQwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhpdGVtKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge2l0ZW0uaWNvbiA/IDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNSB3LTUgc2hyaW5rLTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+e2l0ZW0uaWNvbn08L3NwYW4+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj57aXRlbS5sYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cclxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtoYXNNZW51ID8gbWVudU9wZW4gOiB1bmRlZmluZWR9XHJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD17aGFzTWVudSA/IFwibWVudVwiIDogdW5kZWZpbmVkfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQtbWQgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgcC0wIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTE1MCBob3ZlcjotdHJhbnNsYXRlLXktMC41IGFjdGl2ZTpzY2FsZS05NSBmb2N1cy12aXNpYmxlOnJpbmctNCBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zMCBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTRcIlxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogYCR7c2l6ZX1weGAsXHJcbiAgICAgICAgICBoZWlnaHQ6IGAke3NpemV9cHhgLFxyXG4gICAgICAgICAgV2Via2l0VGFwSGlnaGxpZ2h0Q29sb3I6IFwidHJhbnNwYXJlbnRcIixcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1haW5DbGlja31cclxuICAgICAgPlxyXG4gICAgICAgIDxjYW52YXMgcmVmPXtjYW52YXNSZWZ9IGNsYXNzTmFtZT1cImJsb2NrIHJvdW5kZWQtbWRcIiAvPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHRyYWlsaW5nU3BhY2VyID1cclxuICAgIHJlc2VydmVkSGVpZ2h0ID4gMCA/IChcclxuICAgICAgPGRpdlxyXG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICAgICAgZGF0YS1pbmQtZmxvYXRpbmctYWN0aW9uLXNwYWNlcj1cInRydWVcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmVcIlxyXG4gICAgICAgIHN0eWxlPXt7IGhlaWdodDogYCR7cmVzZXJ2ZWRIZWlnaHR9cHhgIH19XHJcbiAgICAgIC8+XHJcbiAgICApIDogbnVsbDtcclxuXHJcbiAgaWYgKCFwb3J0YWxUYXJnZXQpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDw+XHJcbiAgICAgICAge3RyYWlsaW5nU3BhY2VyfVxyXG4gICAgICAgIHtmbG9hdGluZ0FjdGlvbkJ1dHRvbn1cclxuICAgICAgPC8+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIHt0cmFpbGluZ1NwYWNlciA/IGNyZWF0ZVBvcnRhbCh0cmFpbGluZ1NwYWNlciwgcG9ydGFsVGFyZ2V0KSA6IG51bGx9XHJcbiAgICAgIHtjcmVhdGVQb3J0YWwoZmxvYXRpbmdBY3Rpb25CdXR0b24sIHBvcnRhbFRhcmdldCl9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmxvYXRpbmdBY3Rpb25CdXR0b247XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VMYXlvdXRFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbnR5cGUgVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5QXJncyA9IHtcclxuICBib3R0b206IG51bWJlcjtcclxuICBzaXplOiBudW1iZXI7XHJcbn07XHJcblxyXG50eXBlIFVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eVJlc3VsdCA9IHtcclxuICByZXNvbHZlZEJvdHRvbTogbnVtYmVyO1xyXG4gIHJlc2VydmVkSGVpZ2h0OiBudW1iZXI7XHJcbn07XHJcblxyXG5jb25zdCBERUZBVUxUX0ZBQl9CT1RUT01fUFggPSAyNDtcclxuY29uc3QgRkFCX0NPTlRFTlRfQ0xFQVJBTkNFX1BYID0gMTI7XHJcbmNvbnN0IFBBR0lOQVRJT05fU0VMRUNUT1IgPSBcIltkYXRhLWluZC1wYWdpbmF0aW9uLWFuY2hvcj0ndHJ1ZSddXCI7XHJcbmNvbnN0IExBWU9VVF9DQVJEX1NFTEVDVE9SID0gXCIudGltZWxpbmUtaXRlbSAudGltZWxpbmUtY2FyZCwgLnRpbWVsaW5lLWJveCAudGltZWxpbmUtY2FyZCwgW2RhdGEtaW5kLWNhcmQtYW5jaG9yPSd0cnVlJ11cIjtcclxuY29uc3QgQVNTSVNUQU5UX0xBVU5DSEVSX1NFTEVDVE9SID0gXCJbZGF0YS1pbmQtYXNzaXN0YW50LWxhdW5jaGVyPSd0cnVlJ11cIjtcclxuXHJcbmNvbnN0IGdldFBhZ2luYXRpb25FbGVtZW50cyA9ICgpID0+IHtcclxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gW107XHJcbiAgcmV0dXJuIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oUEFHSU5BVElPTl9TRUxFQ1RPUikpO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0TGF5b3V0Q2FyZEVsZW1lbnRzID0gKCkgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBbXTtcclxuICByZXR1cm4gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihMQVlPVVRfQ0FSRF9TRUxFQ1RPUikpO1xyXG59O1xyXG5cclxuLy8gUmV0dXJucyB0cnVlIHdoZW4gb25lIGxheW91dCBhbmNob3IgaXMgcmVuZGVyZWQgYW5kIGNhbiBkZWZpbmUgdGhlIHBhZ2UgZW5kaW5nLlxyXG5jb25zdCBpc1Zpc2libGVMYXlvdXRFbGVtZW50ID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3Qgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcbiAgaWYgKHN0eWxlcy5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBzdHlsZXMudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgcmV0dXJuIHJlY3Qud2lkdGggPiAwICYmIHJlY3QuaGVpZ2h0ID4gMDtcclxufTtcclxuXHJcbi8vIEZpbmRzIG9uZSB2aXNpYmxlIGFzc2lzdGFudCBsYXVuY2hlciBzbyB0aGUgRkFCIGNhbiBzaGFyZSB0aGUgc2FtZSBiYXNlbGluZS5cclxuY29uc3QgZ2V0VmlzaWJsZUFzc2lzdGFudExhdW5jaGVyID0gKCk6IEhUTUxFbGVtZW50IHwgbnVsbCA9PiB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGxhdW5jaGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KEFTU0lTVEFOVF9MQVVOQ0hFUl9TRUxFQ1RPUik7XHJcbiAgZm9yIChjb25zdCBsYXVuY2hlciBvZiBsYXVuY2hlcnMpIHtcclxuICAgIGlmIChpc1Zpc2libGVMYXlvdXRFbGVtZW50KGxhdW5jaGVyKSkge1xyXG4gICAgICByZXR1cm4gbGF1bmNoZXI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8vIFJlc29sdmVzIHRoZSBib3R0b20gZGlzdGFuY2UuIFdoZW4gdGhlIGFzc2lzdGFudCBsYXVuY2hlciBleGlzdHMsIGl0IGJlY29tZXMgdGhlIHZpc3VhbCBiYXNlbGluZS5cclxuY29uc3QgcmVzb2x2ZUJvdHRvbU9mZnNldCA9IChib3R0b206IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgYm90dG9tKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IGFzc2lzdGFudExhdW5jaGVyID0gZ2V0VmlzaWJsZUFzc2lzdGFudExhdW5jaGVyKCk7XHJcbiAgaWYgKCFhc3Npc3RhbnRMYXVuY2hlcikge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGJvdHRvbSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IDA7XHJcbiAgY29uc3QgbGF1bmNoZXJSZWN0ID0gYXNzaXN0YW50TGF1bmNoZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgY29uc3QgbGF1bmNoZXJCb3R0b20gPSBNYXRoLm1heCgwLCBNYXRoLnJvdW5kKHZpZXdwb3J0SGVpZ2h0IC0gbGF1bmNoZXJSZWN0LmJvdHRvbSkpO1xyXG4gIGNvbnN0IGFkZGl0aW9uYWxDbGVhcmFuY2UgPSBNYXRoLm1heCgwLCBib3R0b20gLSBERUZBVUxUX0ZBQl9CT1RUT01fUFgpO1xyXG5cclxuICByZXR1cm4gTWF0aC5tYXgoMCwgbGF1bmNoZXJCb3R0b20gKyBhZGRpdGlvbmFsQ2xlYXJhbmNlKTtcclxufTtcclxuXHJcbi8vIFRoZSBwYWdlIG9ubHkgbmVlZHMgdGhlIGV4dHJhIHRyYWlsaW5nIHNwYWNlIHdoZW4gdGhlcmUgaXMgYSBjYXJkIGxpc3Qgb3Igb25lIHBhZ2luYXRpb24gYmxvY2sgdG8gY2xlYXIuXHJcbmNvbnN0IGhhc1RyYWlsaW5nQ29udGVudEFuY2hvciA9ICgpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgZ2V0UGFnaW5hdGlvbkVsZW1lbnRzKCkuc29tZSgoZWxlbWVudCkgPT4gaXNWaXNpYmxlTGF5b3V0RWxlbWVudChlbGVtZW50KSkgfHxcclxuICAgIGdldExheW91dENhcmRFbGVtZW50cygpLnNvbWUoKGVsZW1lbnQpID0+IGlzVmlzaWJsZUxheW91dEVsZW1lbnQoZWxlbWVudCkpXHJcbiAgKTtcclxufTtcclxuXHJcbi8vIEtlZXBzIHRoZSBmbG9hdGluZyBhY3Rpb24gYnV0dG9uIGFsaWduZWQgd2l0aCBvdGhlciBmbG9hdGluZyBVSSBhbmQgcmVzZXJ2ZXMgb25lIGNsZWFuIGVuZGluZyBsYW5lLlxyXG5leHBvcnQgY29uc3QgdXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5ID0gKHtcclxuICBib3R0b20sXHJcbiAgc2l6ZSxcclxufTogVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5QXJncyk6IFVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eVJlc3VsdCA9PiB7XHJcbiAgY29uc3QgW3Jlc29sdmVkQm90dG9tLCBzZXRSZXNvbHZlZEJvdHRvbV0gPSB1c2VTdGF0ZShib3R0b20pO1xyXG4gIGNvbnN0IFtyZXNlcnZlZEhlaWdodCwgc2V0UmVzZXJ2ZWRIZWlnaHRdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgYW5pbWF0aW9uRnJhbWVSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XHJcblxyXG4gIGNvbnN0IHVwZGF0ZUxheW91dCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbmV4dEJvdHRvbSA9IHJlc29sdmVCb3R0b21PZmZzZXQoYm90dG9tKTtcclxuICAgIGNvbnN0IG5leHRSZXNlcnZlZEhlaWdodCA9IGhhc1RyYWlsaW5nQ29udGVudEFuY2hvcigpXHJcbiAgICAgID8gTWF0aC5jZWlsKG5leHRCb3R0b20gKyBNYXRoLm1heCg0MCwgc2l6ZSkgKyBGQUJfQ09OVEVOVF9DTEVBUkFOQ0VfUFgpXHJcbiAgICAgIDogMDtcclxuXHJcbiAgICBzZXRSZXNvbHZlZEJvdHRvbSgocHJldmlvdXMpID0+IChNYXRoLmFicyhwcmV2aW91cyAtIG5leHRCb3R0b20pIDwgMSA/IHByZXZpb3VzIDogbmV4dEJvdHRvbSkpO1xyXG4gICAgc2V0UmVzZXJ2ZWRIZWlnaHQoKHByZXZpb3VzKSA9PiAoTWF0aC5hYnMocHJldmlvdXMgLSBuZXh0UmVzZXJ2ZWRIZWlnaHQpIDwgMSA/IHByZXZpb3VzIDogbmV4dFJlc2VydmVkSGVpZ2h0KSk7XHJcbiAgfSwgW2JvdHRvbSwgc2l6ZV0pO1xyXG5cclxuICBjb25zdCBzY2hlZHVsZUxheW91dFVwZGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcclxuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIHVwZGF0ZUxheW91dCgpO1xyXG4gICAgfSk7XHJcbiAgfSwgW3VwZGF0ZUxheW91dF0pO1xyXG5cclxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xyXG4gICAgdXBkYXRlTGF5b3V0KCk7XHJcbiAgfSwgW3VwZGF0ZUxheW91dF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgaWYgKCFib2R5KSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgIHNjaGVkdWxlTGF5b3V0VXBkYXRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKGJvZHksIHtcclxuICAgICAgY2hpbGRMaXN0OiB0cnVlLFxyXG4gICAgICBzdWJ0cmVlOiB0cnVlLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICB9LCBbc2NoZWR1bGVMYXlvdXRVcGRhdGVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xyXG4gICAgICBzY2hlZHVsZUxheW91dFVwZGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIGhhbmRsZVJlc2l6ZSk7XHJcblxyXG4gICAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbc2NoZWR1bGVMYXlvdXRVcGRhdGVdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc29sdmVkQm90dG9tLFxyXG4gICAgcmVzZXJ2ZWRIZWlnaHQsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTtBQUN6RSx1QkFBNkI7OztBQ0Q3QixtQkFBMEU7QUFZMUUsSUFBTSx3QkFBd0I7QUFDOUIsSUFBTSwyQkFBMkI7QUFDakMsSUFBTSxzQkFBc0I7QUFDNUIsSUFBTSx1QkFBdUI7QUFDN0IsSUFBTSw4QkFBOEI7QUFFcEMsSUFBTSx3QkFBd0IsTUFBTTtBQUNsQyxNQUFJLE9BQU8sYUFBYSxZQUFhLFFBQU8sQ0FBQztBQUM3QyxTQUFPLE1BQU0sS0FBSyxTQUFTLGlCQUE4QixtQkFBbUIsQ0FBQztBQUMvRTtBQUVBLElBQU0sd0JBQXdCLE1BQU07QUFDbEMsTUFBSSxPQUFPLGFBQWEsWUFBYSxRQUFPLENBQUM7QUFDN0MsU0FBTyxNQUFNLEtBQUssU0FBUyxpQkFBOEIsb0JBQW9CLENBQUM7QUFDaEY7QUFHQSxJQUFNLHlCQUF5QixDQUFDLFlBQWtDO0FBQ2hFLE1BQUksT0FBTyxXQUFXLFlBQWEsUUFBTztBQUUxQyxRQUFNLFNBQVMsT0FBTyxpQkFBaUIsT0FBTztBQUM5QyxNQUFJLE9BQU8sWUFBWSxVQUFVLE9BQU8sZUFBZSxVQUFVO0FBQy9ELFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxPQUFPLFFBQVEsc0JBQXNCO0FBQzNDLFNBQU8sS0FBSyxRQUFRLEtBQUssS0FBSyxTQUFTO0FBQ3pDO0FBR0EsSUFBTSw4QkFBOEIsTUFBMEI7QUFDNUQsTUFBSSxPQUFPLGFBQWEsWUFBYSxRQUFPO0FBRTVDLFFBQU0sWUFBWSxTQUFTLGlCQUE4QiwyQkFBMkI7QUFDcEYsYUFBVyxZQUFZLFdBQVc7QUFDaEMsUUFBSSx1QkFBdUIsUUFBUSxHQUFHO0FBQ3BDLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQUdBLElBQU0sc0JBQXNCLENBQUMsV0FBMkI7QUFD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
