import {
  require_jsx_runtime,
  require_react
} from "./chunk-KJNAPDCZ.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/FloatingActionButton.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
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
  menuItems = [],
  isMenuOpen,
  onMenuOpenChange,
  closeMenuOnSelect = true,
  menuAriaLabel,
  menuClassName = ""
}) => {
  const rootRef = (0, import_react.useRef)(null);
  const canvasRef = (0, import_react.useRef)(null);
  const [internalMenuOpen, setInternalMenuOpen] = (0, import_react.useState)(false);
  const hasMenu = menuItems.length > 0;
  const isMenuControlled = typeof isMenuOpen === "boolean";
  const menuOpen = hasMenu ? isMenuControlled ? Boolean(isMenuOpen) : internalMenuOpen : false;
  const setMenuOpen = (0, import_react.useCallback)(
    (nextOpen) => {
      if (!hasMenu) return;
      if (!isMenuControlled) {
        setInternalMenuOpen(nextOpen);
      }
      onMenuOpenChange?.(nextOpen);
    },
    [hasMenu, isMenuControlled, onMenuOpenChange]
  );
  const buildFabSvg = (0, import_react.useCallback)(() => {
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
  const renderSvgToCanvas = (0, import_react.useCallback)(() => {
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
  (0, import_react.useEffect)(() => {
    renderSvgToCanvas();
    window.addEventListener("resize", renderSvgToCanvas);
    return () => window.removeEventListener("resize", renderSvgToCanvas);
  }, [renderSvgToCanvas]);
  (0, import_react.useEffect)(() => {
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
  const runPrimaryAction = (0, import_react.useCallback)(() => {
    if (typeof onClick === "function") {
      onClick();
      return;
    }
    if (!route || typeof window === "undefined") return;
    window.location.href = route;
  }, [onClick, route]);
  const handleMainClick = (0, import_react.useCallback)(() => {
    if (hasMenu) {
      setMenuOpen(!menuOpen);
      return;
    }
    runPrimaryAction();
  }, [hasMenu, menuOpen, runPrimaryAction, setMenuOpen]);
  const handleMenuItemClick = (0, import_react.useCallback)(
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
  const menuPanelClassName = (0, import_react.useMemo)(() => {
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
        bottom: `${bottom}px`
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCB0eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0gPSB7XG4gIGlkOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG4gIHJvdXRlPzogc3RyaW5nO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG59O1xuXG50eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uUHJvcHMgPSB7XG4gIHJvdXRlPzogc3RyaW5nO1xuICBhcmlhTGFiZWw6IHN0cmluZztcbiAgc2l6ZT86IG51bWJlcjtcbiAgcmlnaHQ/OiBudW1iZXI7XG4gIGJvdHRvbT86IG51bWJlcjtcbiAgY29sb3I/OiBzdHJpbmc7XG4gIHNoYWRvd09wYWNpdHk/OiBudW1iZXI7XG4gIHBsdXNUaGlja25lc3M/OiBudW1iZXI7XG4gIHBsdXNMZW5ndGg/OiBudW1iZXI7XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICBtZW51SXRlbXM/OiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtW107XG4gIGlzTWVudU9wZW4/OiBib29sZWFuO1xuICBvbk1lbnVPcGVuQ2hhbmdlPzogKGlzT3BlbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgY2xvc2VNZW51T25TZWxlY3Q/OiBib29sZWFuO1xuICBtZW51QXJpYUxhYmVsPzogc3RyaW5nO1xuICBtZW51Q2xhc3NOYW1lPzogc3RyaW5nO1xufTtcblxuY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcblxuLy8gRmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiB0aGF0IHN1cHBvcnRzIGRpcmVjdCBhY3Rpb24gb3Igc3BlZWQtZGlhbCBtZW51IG1vZGUuXG5jb25zdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiA9ICh7XG4gIHJvdXRlLFxuICBhcmlhTGFiZWwsXG4gIHNpemUgPSA3NixcbiAgcmlnaHQgPSAyNCxcbiAgYm90dG9tID0gMjQsXG4gIGNvbG9yID0gXCIjMDAyOTZiXCIsXG4gIHNoYWRvd09wYWNpdHkgPSAwLjE2LFxuICBwbHVzVGhpY2tuZXNzID0gNCxcbiAgcGx1c0xlbmd0aCA9IDI4LFxuICBvbkNsaWNrLFxuICBtZW51SXRlbXMgPSBbXSxcbiAgaXNNZW51T3BlbixcbiAgb25NZW51T3BlbkNoYW5nZSxcbiAgY2xvc2VNZW51T25TZWxlY3QgPSB0cnVlLFxuICBtZW51QXJpYUxhYmVsLFxuICBtZW51Q2xhc3NOYW1lID0gXCJcIixcbn06IEZsb2F0aW5nQWN0aW9uQnV0dG9uUHJvcHMpID0+IHtcbiAgY29uc3Qgcm9vdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2ludGVybmFsTWVudU9wZW4sIHNldEludGVybmFsTWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBoYXNNZW51ID0gbWVudUl0ZW1zLmxlbmd0aCA+IDA7XG4gIGNvbnN0IGlzTWVudUNvbnRyb2xsZWQgPSB0eXBlb2YgaXNNZW51T3BlbiA9PT0gXCJib29sZWFuXCI7XG4gIGNvbnN0IG1lbnVPcGVuID0gaGFzTWVudSA/IChpc01lbnVDb250cm9sbGVkID8gQm9vbGVhbihpc01lbnVPcGVuKSA6IGludGVybmFsTWVudU9wZW4pIDogZmFsc2U7XG5cbiAgY29uc3Qgc2V0TWVudU9wZW4gPSB1c2VDYWxsYmFjayhcbiAgICAobmV4dE9wZW46IGJvb2xlYW4pID0+IHtcbiAgICAgIGlmICghaGFzTWVudSkgcmV0dXJuO1xuICAgICAgaWYgKCFpc01lbnVDb250cm9sbGVkKSB7XG4gICAgICAgIHNldEludGVybmFsTWVudU9wZW4obmV4dE9wZW4pO1xuICAgICAgfVxuICAgICAgb25NZW51T3BlbkNoYW5nZT8uKG5leHRPcGVuKTtcbiAgICB9LFxuICAgIFtoYXNNZW51LCBpc01lbnVDb250cm9sbGVkLCBvbk1lbnVPcGVuQ2hhbmdlXVxuICApO1xuXG4gIGNvbnN0IGJ1aWxkRmFiU3ZnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHNhZmVPcGFjaXR5ID0gY2xhbXAoc2hhZG93T3BhY2l0eSwgMCwgMC41KTtcbiAgICBjb25zdCBzYWZlVGhpY2tuZXNzID0gY2xhbXAocGx1c1RoaWNrbmVzcywgMiwgOCk7XG4gICAgY29uc3Qgc2FmZUxlbmd0aCA9IGNsYW1wKHBsdXNMZW5ndGgsIDE2LCA0MCk7XG5cbiAgICBjb25zdCBjeCA9IDQ4O1xuICAgIGNvbnN0IHhWID0gY3ggLSBzYWZlVGhpY2tuZXNzIC8gMjtcbiAgICBjb25zdCB5ViA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XG4gICAgY29uc3QgeEggPSBjeCAtIHNhZmVMZW5ndGggLyAyO1xuICAgIGNvbnN0IHlIID0gY3ggLSBzYWZlVGhpY2tuZXNzIC8gMjtcblxuICAgIHJldHVybiBgXG4gICAgICA8c3ZnIHdpZHRoPVwiOTZcIiBoZWlnaHQ9XCI5NlwiIHZpZXdCb3g9XCIwIDAgOTYgOTZcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgIDxkZWZzPlxuICAgICAgICAgIDxmaWx0ZXIgaWQ9XCJmYWJTaGFkb3dcIiB4PVwiLTQwJVwiIHk9XCItNDAlXCIgd2lkdGg9XCIxODAlXCIgaGVpZ2h0PVwiMTgwJVwiPlxuICAgICAgICAgICAgPGZlRHJvcFNoYWRvdyBkeD1cIi00XCIgZHk9XCIxMFwiIHN0ZERldmlhdGlvbj1cIjZcIiBmbG9vZC1jb2xvcj1cIiMwMDBcIiBmbG9vZC1vcGFjaXR5PVwiJHtzYWZlT3BhY2l0eX1cIi8+XG4gICAgICAgICAgPC9maWx0ZXI+XG4gICAgICAgIDwvZGVmcz5cblxuICAgICAgICA8ZyBmaWx0ZXI9XCJ1cmwoI2ZhYlNoYWRvdylcIj5cbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNDhcIiBjeT1cIjQ4XCIgcj1cIjM0XCIgZmlsbD1cIiR7Y29sb3J9XCIvPlxuICAgICAgICA8L2c+XG5cbiAgICAgICAgPGcgZmlsbD1cIiNmZmZcIj5cbiAgICAgICAgICA8cmVjdCB4PVwiJHt4Vn1cIiB5PVwiJHt5Vn1cIiB3aWR0aD1cIiR7c2FmZVRoaWNrbmVzc31cIiBoZWlnaHQ9XCIke3NhZmVMZW5ndGh9XCIgcng9XCIxXCIvPlxuICAgICAgICAgIDxyZWN0IHg9XCIke3hIfVwiIHk9XCIke3lIfVwiIHdpZHRoPVwiJHtzYWZlTGVuZ3RofVwiIGhlaWdodD1cIiR7c2FmZVRoaWNrbmVzc31cIiByeD1cIjFcIi8+XG4gICAgICAgIDwvZz5cbiAgICAgIDwvc3ZnPlxuICAgIGAudHJpbSgpO1xuICB9LCBbY29sb3IsIHBsdXNMZW5ndGgsIHBsdXNUaGlja25lc3MsIHNoYWRvd09wYWNpdHldKTtcblxuICBjb25zdCByZW5kZXJTdmdUb0NhbnZhcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgaWYgKCFjdHgpIHJldHVybjtcblxuICAgIGNvbnN0IHNpemVQeCA9IE1hdGgubWF4KDQwLCBzaXplKTtcbiAgICBjb25zdCBkcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgY2FudmFzLndpZHRoID0gTWF0aC5yb3VuZChzaXplUHggKiBkcHIpO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBNYXRoLnJvdW5kKHNpemVQeCAqIGRwcik7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7c2l6ZVB4fXB4YDtcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZVB4fXB4YDtcbiAgICBjdHguc2V0VHJhbnNmb3JtKGRwciwgMCwgMCwgZHByLCAwLCAwKTtcblxuICAgIGNvbnN0IHN2ZyA9IGJ1aWxkRmFiU3ZnKCk7XG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtzdmddLCB7IHR5cGU6IFwiaW1hZ2Uvc3ZnK3htbFwiIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWcuZGVjb2RpbmcgPSBcImFzeW5jXCI7XG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc2l6ZVB4LCBzaXplUHgpO1xuICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDAsIHNpemVQeCwgc2l6ZVB4KTtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICB9O1xuICAgIGltZy5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgIH07XG4gICAgaW1nLnNyYyA9IHVybDtcbiAgfSwgW2J1aWxkRmFiU3ZnLCBzaXplXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZW5kZXJTdmdUb0NhbnZhcygpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlbmRlclN2Z1RvQ2FudmFzKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVuZGVyU3ZnVG9DYW52YXMpO1xuICB9LCBbcmVuZGVyU3ZnVG9DYW52YXNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbWVudU9wZW4pIHJldHVybjtcblxuICAgIGNvbnN0IGhhbmRsZU91dHNpZGVDbGljayA9IChldmVudDogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XG4gICAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICAgIGlmIChyb290UmVmLmN1cnJlbnQ/LmNvbnRhaW5zKG5vZGUpKSByZXR1cm47XG4gICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZUNsaWNrKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVPdXRzaWRlQ2xpY2ssIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlRXNjYXBlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlT3V0c2lkZUNsaWNrKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGUpO1xuICAgIH07XG4gIH0sIFttZW51T3Blbiwgc2V0TWVudU9wZW5dKTtcblxuICBjb25zdCBydW5QcmltYXJ5QWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBvbkNsaWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcm91dGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcm91dGU7XG4gIH0sIFtvbkNsaWNrLCByb3V0ZV0pO1xuXG4gIGNvbnN0IGhhbmRsZU1haW5DbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoaGFzTWVudSkge1xuICAgICAgc2V0TWVudU9wZW4oIW1lbnVPcGVuKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBydW5QcmltYXJ5QWN0aW9uKCk7XG4gIH0sIFtoYXNNZW51LCBtZW51T3BlbiwgcnVuUHJpbWFyeUFjdGlvbiwgc2V0TWVudU9wZW5dKTtcblxuICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gdXNlQ2FsbGJhY2soXG4gICAgKGl0ZW06IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0pID0+IHtcbiAgICAgIGlmIChpdGVtLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlbS5vbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgaXRlbS5vbkNsaWNrKCk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0ucm91dGUgJiYgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGl0ZW0ucm91dGU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjbG9zZU1lbnVPblNlbGVjdCkge1xuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbY2xvc2VNZW51T25TZWxlY3QsIHNldE1lbnVPcGVuXVxuICApO1xuXG4gIGNvbnN0IG1lbnVQYW5lbENsYXNzTmFtZSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IGJhc2UgPSBcIm1pbi13LVsxMXJlbV0gcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTIgc2hhZG93LXhsXCI7XG4gICAgY29uc3QgZXh0cmEgPSBtZW51Q2xhc3NOYW1lLnRyaW0oKTtcbiAgICByZXR1cm4gZXh0cmEgPyBgJHtiYXNlfSAke2V4dHJhfWAgOiBiYXNlO1xuICB9LCBbbWVudUNsYXNzTmFtZV0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXtyb290UmVmfVxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgei0yMDAwIGZsZXggZmxleC1jb2wgaXRlbXMtZW5kIGdhcC0yXCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHJpZ2h0OiBgJHtyaWdodH1weGAsXG4gICAgICAgIGJvdHRvbTogYCR7Ym90dG9tfXB4YCxcbiAgICAgIH19XG4gICAgPlxuICAgICAge21lbnVPcGVuID8gKFxuICAgICAgICA8ZGl2IHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbD17bWVudUFyaWFMYWJlbCB8fCBhcmlhTGFiZWx9IGNsYXNzTmFtZT17bWVudVBhbmVsQ2xhc3NOYW1lfT5cbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICB7bWVudUl0ZW1zLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICA8bGkga2V5PXtpdGVtLmlkfT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpdGVtLmFyaWFMYWJlbCB8fCBpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2l0ZW0uZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IHctZnVsbCBpdGVtcy1jZW50ZXIgZ2FwLTIgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC1sZWZ0IHRleHQtWzE2cHhdIGZvbnQtbWVkaXVtIGxlYWRpbmctNSB0ZXh0LXNsYXRlLTcwMCB0cmFuc2l0aW9uLWNvbG9ycyBob3ZlcjpiZy1zbGF0ZS0xMDAgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWhpZGRlbiBmb2N1cy12aXNpYmxlOnJpbmctMiBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS80MCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWQgZGlzYWJsZWQ6b3BhY2l0eS01MFwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGl0ZW0pfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpdGVtLmljb24gPyA8c3BhbiBjbGFzc05hbWU9XCJpbmxpbmUtZmxleCBoLTUgdy01IHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPntpdGVtLmljb259PC9zcGFuPiA6IG51bGx9XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cbiAgICAgICAgYXJpYS1leHBhbmRlZD17aGFzTWVudSA/IG1lbnVPcGVuIDogdW5kZWZpbmVkfVxuICAgICAgICBhcmlhLWhhc3BvcHVwPXtoYXNNZW51ID8gXCJtZW51XCIgOiB1bmRlZmluZWR9XG4gICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQtbWQgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgcC0wIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTE1MCBob3ZlcjotdHJhbnNsYXRlLXktMC41IGFjdGl2ZTpzY2FsZS05NSBmb2N1cy12aXNpYmxlOnJpbmctNCBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zMCBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTRcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHdpZHRoOiBgJHtzaXplfXB4YCxcbiAgICAgICAgICBoZWlnaHQ6IGAke3NpemV9cHhgLFxuICAgICAgICAgIFdlYmtpdFRhcEhpZ2hsaWdodENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgIH19XG4gICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1haW5DbGlja31cbiAgICAgID5cbiAgICAgICAgPGNhbnZhcyByZWY9e2NhbnZhc1JlZn0gY2xhc3NOYW1lPVwiYmxvY2sgcm91bmRlZC1tZFwiIC8+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nQWN0aW9uQnV0dG9uO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7O0FBQUEsbUJBQXlFO0FBNE56RDtBQTdMaEIsSUFBTSxRQUFRLENBQUMsT0FBZSxLQUFhLFFBQWdCLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLLEtBQUssQ0FBQztBQUc3RixJQUFNLHVCQUF1QixDQUFDO0FBQUEsRUFDNUI7QUFBQSxFQUNBO0FBQUEsRUFDQSxPQUFPO0FBQUEsRUFDUCxRQUFRO0FBQUEsRUFDUixTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixhQUFhO0FBQUEsRUFDYjtBQUFBLEVBQ0EsWUFBWSxDQUFDO0FBQUEsRUFDYjtBQUFBLEVBQ0E7QUFBQSxF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
