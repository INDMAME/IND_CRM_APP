import {
  ClientSearchCombobox_default
} from "./chunks/chunk-53XJ3RSU.js";
import {
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY,
  canAccess,
  classNames,
  getCsrfToken,
  indT,
  showPermissionModal
} from "./chunks/chunk-ISVBGEOF.js";
import {
  require_client,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-RGGEM6AY.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx
var import_react4 = __toESM(require_react());
var import_client = __toESM(require_client());

// Web/wwwroot/react/src/pages/visitas/historial/HistoryTable.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var TAP_MOVE_PX = 14;
var TOOLTIP_TOUCH_DELAY_MS = 120;
var HOLD_TO_PREVIEW_MS = 160;
var TOOLTIP_MAX_HEIGHT_RATIO = 0.8;
var TOOLTIP_BASE_FONT = 13;
var TOOLTIP_MIN_FONT = 11;
var ELLIPSIS = "...";
var PIXEL_GAP = 5;
var PIXEL_SPEED = 95;
var PIXEL_COLORS = ["rgba(0, 41, 107, 0.08)", "rgba(0, 41, 107, 0.16)", "rgba(0, 41, 107, 0.26)"];
var getEffectiveSpeed = (value, reducedMotion) => {
  const min = 0;
  const max = 100;
  const throttle = 1e-3;
  const parsed = Number.parseInt(String(value), 10);
  if (parsed <= min || reducedMotion) return min;
  if (parsed >= max) return max * throttle;
  return parsed * throttle;
};
var Pixel = class {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.3 + 0.1;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 5 + (this.width + this.height) * 0.015;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
    this.phase = Math.random() * Math.PI * 2;
    this.phaseStep = Math.max(0, this.speed * (0.8 + Math.random() * 0.6));
  }
  // Return a random float between min and max.
  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }
  // Draw the pixel at its current size.
  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }
  // Animate the pixel appearing.
  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }
  // Animate the pixel disappearing.
  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }
    this.size -= 0.1;
    this.draw();
  }
  // Oscillate pixel size while visible.
  shimmer() {
    if (!this.phaseStep) return;
    this.phase += this.phaseStep;
    const amp = (this.maxSize - this.minSize) * 0.5;
    this.size = this.minSize + amp + amp * Math.sin(this.phase);
  }
};
var createPixelEffect = (cardEl) => {
  if (!cardEl) return null;
  const canvas = document.createElement("canvas");
  canvas.className = "timeline-pixel-canvas";
  cardEl.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    canvas.remove();
    return null;
  }
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state = {
    canvas,
    ctx,
    pixels: [],
    animId: null,
    lastTime: performance.now(),
    reducedMotion,
    width: 0,
    height: 0
  };
  const initPixels = () => {
    const rect = cardEl.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    if (!width || !height) return;
    state.width = width;
    state.height = height;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const gap = Math.max(3, Math.floor(PIXEL_GAP));
    const speed = getEffectiveSpeed(PIXEL_SPEED, reducedMotion);
    const pixels = [];
    for (let x = 0; x < width; x += gap) {
      for (let y = 0; y < height; y += gap) {
        const color = PIXEL_COLORS[Math.floor(Math.random() * PIXEL_COLORS.length)];
        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : distance * 0.35;
        pixels.push(new Pixel(canvas, ctx, x, y, color, speed, delay));
      }
    }
    state.pixels = pixels;
  };
  const doAnimate = (fnName) => {
    state.animId = requestAnimationFrame(() => doAnimate(fnName));
    const timeNow = performance.now();
    const timePassed = timeNow - state.lastTime;
    const timeInterval = 1e3 / 60;
    if (timePassed < timeInterval) return;
    state.lastTime = timeNow - timePassed % timeInterval;
    ctx.clearRect(0, 0, state.width, state.height);
    let allIdle = true;
    for (let i = 0; i < state.pixels.length; i += 1) {
      const pixel = state.pixels[i];
      pixel[fnName]();
      if (!pixel.isIdle) allIdle = false;
    }
    if (allIdle && state.animId) {
      cancelAnimationFrame(state.animId);
      state.animId = null;
    }
  };
  const handleAnimation = (name) => {
    if (!state.pixels.length) return;
    if (state.animId) cancelAnimationFrame(state.animId);
    state.lastTime = performance.now();
    state.animId = requestAnimationFrame(() => doAnimate(name));
  };
  const onEnter = () => handleAnimation("appear");
  const onLeave = () => handleAnimation("disappear");
  cardEl.addEventListener("mouseenter", onEnter);
  cardEl.addEventListener("mouseleave", onLeave);
  let ro = null;
  if (typeof ResizeObserver !== "undefined") {
    ro = new ResizeObserver(initPixels);
    ro.observe(cardEl);
  }
  initPixels();
  return () => {
    cardEl.removeEventListener("mouseenter", onEnter);
    cardEl.removeEventListener("mouseleave", onLeave);
    if (state.animId) cancelAnimationFrame(state.animId);
    if (ro) ro.disconnect();
    canvas.remove();
  };
};
var applyEllipsis = (el, fullText, multiLine) => {
  if (!el || !fullText) return false;
  if (multiLine && el.clientHeight === 0) return false;
  if (!multiLine && el.clientWidth === 0) return false;
  if (multiLine) {
    const computed = window.getComputedStyle(el);
    let lineHeight = Number.parseFloat(computed.lineHeight);
    if (!Number.isFinite(lineHeight)) {
      const rect = el.getBoundingClientRect();
      lineHeight = rect.height > 0 ? rect.height / 2 : 0;
    }
    if (lineHeight > 0) {
      el.style.maxHeight = `${Math.round(lineHeight * 2)}px`;
      el.style.overflow = "hidden";
    }
  }
  el.textContent = fullText;
  const isOverflowing = () => multiLine ? el.scrollHeight > el.clientHeight + 1 : el.scrollWidth > el.clientWidth + 1;
  if (!isOverflowing()) {
    el.dataset.preview = "0";
    return false;
  }
  let low = 0;
  let high = fullText.length;
  let best = 0;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const candidate = `${fullText.slice(0, Math.max(0, mid)).trimEnd()}${ELLIPSIS}`;
    el.textContent = candidate;
    if (isOverflowing()) {
      high = mid - 1;
    } else {
      best = mid;
      low = mid + 1;
    }
  }
  el.textContent = `${fullText.slice(0, Math.max(0, best)).trimEnd()}${ELLIPSIS}`;
  el.dataset.preview = "1";
  return true;
};
var bindTapGuard = (el, onTap) => {
  if (!el) return () => void 0;
  let active = false;
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let moved = false;
  const reset = () => {
    active = false;
    pointerId = null;
    moved = false;
  };
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    active = true;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
    moved = false;
  };
  const onPointerMove = (e) => {
    if (!active || e.pointerId !== pointerId) return;
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);
    if (dx > TAP_MOVE_PX || dy > TAP_MOVE_PX) moved = true;
  };
  const onPointerUp = (e) => {
    if (!active || e.pointerId !== pointerId) return;
    const heldMs = Date.now() - startTime;
    const shouldTap = !moved && heldMs < HOLD_TO_PREVIEW_MS;
    reset();
    if (shouldTap) onTap(e);
  };
  el.addEventListener("pointerdown", onPointerDown, { passive: true });
  el.addEventListener("pointermove", onPointerMove, { passive: true });
  el.addEventListener("pointerup", onPointerUp, { passive: true });
  el.addEventListener("pointercancel", reset, { passive: true });
  el.addEventListener("pointerleave", reset, { passive: true });
  return () => {
    el.removeEventListener("pointerdown", onPointerDown);
    el.removeEventListener("pointermove", onPointerMove);
    el.removeEventListener("pointerup", onPointerUp);
    el.removeEventListener("pointercancel", reset);
    el.removeEventListener("pointerleave", reset);
  };
};
var blockCopyActions = (el) => {
  if (!el) return () => void 0;
  const cancel = (event) => event.preventDefault();
  el.addEventListener("contextmenu", cancel);
  el.addEventListener("selectstart", cancel);
  el.addEventListener("copy", cancel);
  el.addEventListener("cut", cancel);
  el.addEventListener("paste", cancel);
  return () => {
    el.removeEventListener("contextmenu", cancel);
    el.removeEventListener("selectstart", cancel);
    el.removeEventListener("copy", cancel);
    el.removeEventListener("cut", cancel);
    el.removeEventListener("paste", cancel);
  };
};
var HistoryTable = ({ items, noDataText, errorMessage, onNavigate }) => {
  const containerRef = (0, import_react.useRef)(null);
  const tooltipRef = (0, import_react.useRef)(null);
  const tooltipAnchorRef = (0, import_react.useRef)(null);
  const tooltipCloseBoundRef = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (tooltipRef.current) return;
    let tooltip = document.getElementById("timelineTooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "timelineTooltip";
      tooltip.className = "timeline-tooltip";
      document.body.appendChild(tooltip);
    }
    tooltipRef.current = tooltip;
  }, []);
  (0, import_react.useEffect)(() => {
    const container = containerRef.current;
    const tooltipEl = tooltipRef.current;
    if (!container || !tooltipEl) return;
    const cleanups = [];
    if (!tooltipCloseBoundRef.current) {
      tooltipCloseBoundRef.current = true;
      const onPointerDown = (event) => {
        if (!tooltipEl.classList.contains("visible")) return;
        const anchor = tooltipAnchorRef.current;
        if (anchor && anchor.contains(event.target)) return;
        tooltipEl.classList.remove("visible");
        tooltipAnchorRef.current = null;
      };
      const onKeyDown = (event) => {
        if (event.key === "Escape") {
          tooltipEl.classList.remove("visible");
          tooltipAnchorRef.current = null;
        }
      };
      document.addEventListener("pointerdown", onPointerDown, true);
      document.addEventListener("keydown", onKeyDown);
      cleanups.push(() => {
        document.removeEventListener("pointerdown", onPointerDown, true);
        document.removeEventListener("keydown", onKeyDown);
        tooltipCloseBoundRef.current = false;
      });
    }
    const showTooltip = (text, anchor) => {
      tooltipEl.textContent = text;
      tooltipEl.classList.add("visible");
      tooltipAnchorRef.current = anchor || null;
      const centerX = Math.round(window.innerWidth / 2);
      tooltipEl.style.left = `${centerX}px`;
      const margin = 12;
      tooltipEl.style.maxHeight = `${Math.round(window.innerHeight * TOOLTIP_MAX_HEIGHT_RATIO)}px`;
      tooltipEl.style.overflowY = "auto";
      let fontSize = TOOLTIP_BASE_FONT;
      tooltipEl.style.fontSize = `${fontSize}px`;
      let rect = tooltipEl.getBoundingClientRect();
      const maxHeight = window.innerHeight * TOOLTIP_MAX_HEIGHT_RATIO;
      while (rect.height > maxHeight && fontSize > TOOLTIP_MIN_FONT) {
        fontSize -= 1;
        tooltipEl.style.fontSize = `${fontSize}px`;
        rect = tooltipEl.getBoundingClientRect();
      }
      const centerY = Math.round((window.innerHeight - rect.height) / 2);
      let top = Number.isFinite(centerY) ? centerY : margin;
      const minTop = margin;
      const maxTop = Math.max(margin, window.innerHeight - rect.height - margin);
      if (top < minTop) top = minTop;
      if (top > maxTop) top = maxTop;
      tooltipEl.style.top = `${Math.round(top)}px`;
    };
    const hideTooltip = () => {
      tooltipEl.classList.remove("visible");
      tooltipAnchorRef.current = null;
    };
    const shouldPreview = (el) => {
      if (!el.dataset || !el.dataset.fulltext) return false;
      if (el.dataset.preview === "1") return true;
      return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
    };
    const bindTooltip = (el, text) => {
      if (!text) return () => void 0;
      let pressTimer;
      const onMouseEnter = (event) => {
        if (!shouldPreview(el)) return;
        showTooltip(text, el);
      };
      const onMouseLeave = () => hideTooltip();
      const onMouseMove = () => {
        if (!shouldPreview(el)) return;
        if (tooltipEl.classList.contains("visible")) {
          showTooltip(text, el);
        }
      };
      const onTouchStart = (event) => {
        if (!shouldPreview(el)) return;
        const touch = event.touches[0];
        pressTimer = window.setTimeout(() => showTooltip(text, el), TOOLTIP_TOUCH_DELAY_MS);
      };
      const onTouchMove = () => {
        if (pressTimer) window.clearTimeout(pressTimer);
        hideTooltip();
      };
      const onTouchEnd = () => {
        if (pressTimer) window.clearTimeout(pressTimer);
      };
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("touchstart", onTouchStart, { passive: true });
      el.addEventListener("touchmove", onTouchMove, { passive: true });
      el.addEventListener("touchend", onTouchEnd, { passive: true });
      return () => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("touchstart", onTouchStart);
        el.removeEventListener("touchmove", onTouchMove);
        el.removeEventListener("touchend", onTouchEnd);
      };
    };
    if (errorMessage) {
      return () => {
        cleanups.forEach((cleanup) => cleanup());
      };
    }
    const cards = container.querySelectorAll(".timeline-card");
    cards.forEach((card) => {
      if (!card.classList.contains("timeline-card--nodata")) {
        const cleanupPixel = createPixelEffect(card);
        if (cleanupPixel) cleanups.push(cleanupPixel);
      }
      if (card.classList.contains("timeline-card--clickable")) {
        const linkId = card.dataset.linkId || "";
        if (linkId) {
          cleanups.push(bindTapGuard(card, () => onNavigate(linkId)));
          cleanups.push(blockCopyActions(card));
        }
      }
    });
    const frameId = window.requestAnimationFrame(() => {
      const nameEls = container.querySelectorAll(".timeline-name");
      nameEls.forEach((el) => {
        const text = el.dataset.fulltext || el.textContent || "";
        applyEllipsis(el, text, true);
        cleanups.push(bindTooltip(el, text));
      });
      const descEls = container.querySelectorAll(".timeline-desc-text");
      descEls.forEach((el) => {
        const text = el.dataset.fulltext || el.textContent || "";
        applyEllipsis(el, text, true);
        cleanups.push(bindTooltip(el, text));
      });
    });
    cleanups.push(() => window.cancelAnimationFrame(frameId));
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [errorMessage, items, onNavigate]);
  const hasItems = items.length > 0;
  const showEmpty = !errorMessage && !hasItems;
  const content = errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-danger", children: errorMessage }) : hasItems ? items.map((item, index) => {
    const key = item.id || item.recId?.toString() || `timeline-${index}`;
    const isClickable = !item.isNoData && !!item.id;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-item", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: classNames(
          "timeline-card",
          item.isNoData ? "timeline-card--nodata" : "",
          isClickable ? "timeline-card--clickable" : ""
        ),
        "data-actividadid": item.actividadId || "",
        "data-recid": item.recId != null ? String(item.recId) : "",
        "data-link-id": isClickable ? item.id : "",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold tracking-[0.2em] text-slate-500", children: item.dateParts.year }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500", children: item.dateParts.month }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-2xl font-semibold text-primary", children: item.dateParts.day })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "timeline-card__content flex-1 py-3 px-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "timeline-name", "data-fulltext": item.fullName || item.name, children: item.name }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "timeline-desc-text", "data-fulltext": item.fullDesc || item.description, children: item.description || noDataText })
          ] })
        ]
      }
    ) }, key);
  }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      id: "timelineContainer",
      ref: containerRef,
      className: classNames("timeline-box", showEmpty ? "timeline-empty" : ""),
      "data-empty-text": noDataText,
      children: content
    }
  );
};
var HistoryTable_default = HistoryTable;

// Web/wwwroot/react/src/components/commons/FloatingActionButton.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
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
  onClick
}) => {
  const btnRef = (0, import_react2.useRef)(null);
  const canvasRef = (0, import_react2.useRef)(null);
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
  }, [color, shadowOpacity, plusLength, plusThickness]);
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
  const handleClick = () => {
    if (typeof onClick === "function") {
      onClick();
      return;
    }
    if (!route || typeof window === "undefined") return;
    window.location.href = route;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "button",
    {
      ref: btnRef,
      type: "button",
      "aria-label": ariaLabel,
      className: "fixed z-2000 rounded-md p-0 border-0 bg-transparent transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-4",
      style: {
        width: `${size}px`,
        height: `${size}px`,
        right: `${right}px`,
        bottom: `${bottom}px`,
        WebkitTapHighlightColor: "transparent"
      },
      onClick: handleClick,
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("canvas", { ref: canvasRef, className: "block rounded-md" })
    }
  );
};
var FloatingActionButton_default = FloatingActionButton;

// Web/wwwroot/react/src/components/commons/CompactPagination.tsx
var import_react3 = __toESM(require_react());
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var DEFAULT_WINDOW = 6;
var CompactPagination = (0, import_react3.forwardRef)(
  ({ totalPages, currentPage, pageWindow = DEFAULT_WINDOW, onPageChange, labels, className }, ref) => {
    const safeTotal = Math.max(0, totalPages || 0);
    const safeCurrent = Math.min(Math.max(1, currentPage || 1), safeTotal || 1);
    const windowSize = Math.max(1, pageWindow || DEFAULT_WINDOW);
    const showPagination = safeTotal > 1;
    const showEdgeNav = safeTotal > windowSize;
    const canJumpToStart = safeCurrent > windowSize;
    const canGoPrev = safeCurrent > 1;
    const canGoNext = safeCurrent < safeTotal;
    const pageNumbers = (0, import_react3.useMemo)(() => {
      if (!safeTotal) return [];
      const windowStart = Math.max(1, Math.floor((safeCurrent - 1) / windowSize) * windowSize + 1);
      const windowEnd = Math.min(safeTotal, windowStart + windowSize - 1);
      return Array.from({ length: windowEnd - windowStart + 1 }, (_val, idx) => windowStart + idx);
    }, [safeCurrent, safeTotal, windowSize]);
    if (!showPagination) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        id: "pagination",
        ref,
        className: classNames(
          "pagination grid grid-cols-[1fr_auto_1fr] items-center gap-1",
          className || ""
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-1 justify-start", children: [
            showEdgeNav && canJumpToStart && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                "aria-label": labels?.first,
                onClick: (e) => {
                  e.preventDefault();
                  onPageChange(1);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" }) })
              }
            ),
            showEdgeNav && canGoPrev && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                "aria-label": labels?.prev,
                onClick: (e) => {
                  e.preventDefault();
                  onPageChange(safeCurrent - 1);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 19.5 8.25 12l7.5-7.5" }) })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center justify-center gap-1 min-w-0 flex-nowrap", children: pageNumbers.map((page) => {
            const isActive = page === safeCurrent;
            return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: classNames(
                  "min-w-[26px] px-2 py-0.5 rounded-md border text-[10px] font-semibold transition",
                  isActive ? "bg-[#00296b] border-[#00296b] text-white shadow-sm" : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary"
                ),
                onClick: (e) => {
                  e.preventDefault();
                  onPageChange(page);
                },
                children: page
              },
              `page-${page}`
            );
          }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-1 justify-end", children: [
            showEdgeNav && canGoNext && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                "aria-label": labels?.next,
                onClick: (e) => {
                  e.preventDefault();
                  onPageChange(safeCurrent + 1);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m8.25 4.5 7.5 7.5-7.5 7.5" }) })
              }
            ),
            showEdgeNav && canGoNext && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                "aria-label": labels?.last,
                onClick: (e) => {
                  e.preventDefault();
                  onPageChange(safeTotal);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" }) })
              }
            )
          ] })
        ]
      }
    );
  }
);
CompactPagination.displayName = "CompactPagination";
var CompactPagination_default = CompactPagination;

// Web/wwwroot/react/src/components/commons/FilterButton.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var FilterButton = ({
  label,
  active = false,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "button",
    {
      type,
      className: classNames("ind-filter-btn", active ? "ind-filter-btn--active" : "", className),
      onClick,
      disabled,
      "aria-label": ariaLabel || label,
      children: label
    }
  );
};
var FilterButton_default = FilterButton;

// Web/wwwroot/react/src/components/commons/ActionButton.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var ActionButton = ({
  label,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "button",
    {
      type,
      className: classNames("ind-action-btn", className),
      onClick,
      disabled,
      "aria-label": ariaLabel || label,
      children: label
    }
  );
};
var ActionButton_default = ActionButton;

// Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var PAGE_SIZE = 6;
var PAGE_WINDOW = 6;
var NAV_DELAY_MS = 320;
var FAB_BASE_BOTTOM = 32;
var FAB_CLEARANCE = 24;
var FAB_GAP = 12;
var normalizeUiLocale = (locale) => {
  const value = String(locale || "").trim();
  if (!value) return "es-ES";
  if (/^zh-hans/i.test(value)) return "zh-CN";
  return value;
};
var isBasqueLocale = (locale) => /^eu\b/i.test(String(locale || ""));
var BASQUE_MONTHS = [
  "urtarrila",
  "otsaila",
  "martxoa",
  "apirila",
  "maiatza",
  "ekaina",
  "uztaila",
  "abuztua",
  "iraila",
  "urria",
  "azaroa",
  "abendua"
];
var BASQUE_MONTHS_SHORT = [
  "urt",
  "ots",
  "mar",
  "api",
  "mai",
  "eka",
  "uzt",
  "abu",
  "ira",
  "urr",
  "aza",
  "abe"
];
var getUiLocale = () => {
  const fromHtml = typeof document !== "undefined" ? document.documentElement.lang : "";
  if (fromHtml && String(fromHtml).trim()) return normalizeUiLocale(fromHtml);
  return "es-ES";
};
var pad = (n) => n.toString().padStart(2, "0");
var toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
var startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
var parseISO = (s) => {
  if (!s) return null;
  const parts = s.split("-").map(Number);
  if (parts.length !== 3) return null;
  return new Date(parts[0], parts[1] - 1, parts[2]);
};
var sameDay = (a, b) => !!(a && b && a.getTime() === b.getTime());
var isBefore = (a, b) => !!(a && b && a.getTime() < b.getTime());
var normalizeRange = (from, to) => {
  if (!from || !to) return { from, to };
  const fromDate = parseISO(from);
  const toDate = parseISO(to);
  if (!fromDate || !toDate) return { from, to };
  if (isBefore(toDate, fromDate)) {
    return { from: toISO(toDate), to: toISO(fromDate) };
  }
  return { from: toISO(fromDate), to: toISO(toDate) };
};
var formatDisplay = (d, locale) => {
  if (isBasqueLocale(locale)) {
    const month = BASQUE_MONTHS_SHORT[d.getMonth()];
    return `${d.getDate()} ${month} ${d.getFullYear()}`.toLowerCase();
  }
  return d.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).replace(/\./g, "").toLowerCase();
};
var formatMonthLabel = (d, locale) => {
  if (/^zh/i.test(locale)) {
    return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(d);
  }
  if (isBasqueLocale(locale)) {
    return `${BASQUE_MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  }
  const monthName = d.toLocaleDateString(locale, { month: "long" });
  const capMonthName = monthName && /[A-Za-z]/.test(monthName[0]) ? monthName[0].toLocaleUpperCase(locale) + monthName.slice(1) : monthName;
  return `${capMonthName} ${d.getFullYear()}`;
};
var parseDateValue = (value) => {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  const datePart = raw.split("T")[0].split(" ")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
    const [y, m, d] = datePart.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  if (/^\d{2}[./-]\d{2}[./-]\d{4}$/.test(datePart)) {
    const parts = datePart.split(/[./-]/).map(Number);
    const [d, m, y] = parts;
    return new Date(y, m - 1, d);
  }
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};
var formatDateParts = (value, locale) => {
  if (!value) return { year: "", month: "", day: "" };
  const d = parseDateValue(value);
  if (!d) return { year: "", month: "", day: "" };
  let month = "";
  if (isBasqueLocale(locale)) {
    month = BASQUE_MONTHS_SHORT[d.getMonth()] || "";
  } else {
    month = d.toLocaleDateString(locale, { month: "short" }).replace(/\./g, "");
  }
  return {
    year: String(d.getFullYear()),
    month: month.toUpperCase(),
    day: String(d.getDate()).padStart(2, "0")
  };
};
var toTitleCase = (value, locale) => {
  if (!value) return "";
  const lower = value.toLocaleLowerCase(locale);
  try {
    return lower.replace(/(^|[^\p{L}])(\p{L})/gu, (_match, prefix, ch) => `${prefix}${ch.toLocaleUpperCase(locale)}`);
  } catch {
    return lower.replace(/(^|[\s-/])(\S)/g, (_match, prefix, ch) => `${prefix}${ch.toLocaleUpperCase(locale)}`);
  }
};
var toSentenceCase = (value, locale) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const lower = trimmed.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};
var logHistory = (message, data) => {
  if (typeof window === "undefined") return;
  const debugFlag = window.__IND_DEBUG_HISTORY__;
  if (debugFlag === false) return;
  if (data) {
    console.debug("[History]", message, data);
  } else {
    console.debug("[History]", message);
  }
};
var HistoryPage = ({ defaultFromDate = "", defaultToDate = "" }) => {
  const locale = (0, import_react4.useMemo)(() => getUiLocale(), []);
  const canViewHistory = canAccess("VISITAS_HISTORIAL", "View");
  const canCreateVisit = canAccess("VISITAS_CREACION", "Add");
  const noDataText = indT("Common_NoData", "No data");
  const activatorRef = (0, import_react4.useRef)(null);
  const popoverRef = (0, import_react4.useRef)(null);
  const paginationRef = (0, import_react4.useRef)(null);
  const [startDate, setStartDate] = (0, import_react4.useState)(null);
  const [endDate, setEndDate] = (0, import_react4.useState)(null);
  const [manualStartDate, setManualStartDate] = (0, import_react4.useState)(null);
  const [manualEndDate, setManualEndDate] = (0, import_react4.useState)(null);
  const [hoverDate, setHoverDate] = (0, import_react4.useState)(null);
  const [selectingStep, setSelectingStep] = (0, import_react4.useState)("start");
  const [currentMonth, setCurrentMonth] = (0, import_react4.useState)((/* @__PURE__ */ new Date()).getMonth());
  const [currentYear, setCurrentYear] = (0, import_react4.useState)((/* @__PURE__ */ new Date()).getFullYear());
  const [isOpen, setIsOpen] = (0, import_react4.useState)(false);
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react4.useState)(null);
  const [selectedClient, setSelectedClient] = (0, import_react4.useState)(null);
  const [clientResetKey, setClientResetKey] = (0, import_react4.useState)(0);
  const [showFilters, setShowFilters] = (0, import_react4.useState)(true);
  const [showManualError, setShowManualError] = (0, import_react4.useState)(false);
  const [fabBottom, setFabBottom] = (0, import_react4.useState)(FAB_BASE_BOTTOM);
  const [items, setItems] = (0, import_react4.useState)([]);
  const [total, setTotal] = (0, import_react4.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react4.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react4.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react4.useState)("");
  const hasRestoredFilterRef = (0, import_react4.useRef)(false);
  const didInitFilterRef = (0, import_react4.useRef)(false);
  const retryOnNetworkErrorRef = (0, import_react4.useRef)(false);
  const activeAbortRef = (0, import_react4.useRef)(null);
  const activeRequestIdRef = (0, import_react4.useRef)(0);
  const retryTimerRef = (0, import_react4.useRef)(null);
  const lastSignatureRef = (0, import_react4.useRef)("");
  const debugLoggedRef = (0, import_react4.useRef)(0);
  const fromDateValue = (0, import_react4.useMemo)(() => startDate ? toISO(startDate) : "", [startDate]);
  const toDateValue = (0, import_react4.useMemo)(() => endDate ? toISO(endDate) : "", [endDate]);
  const accountNumValue = (0, import_react4.useMemo)(() => selectedClient ? selectedClient.value : "", [selectedClient]);
  (0, import_react4.useEffect)(() => {
    logHistory("init", { defaultFromDate, defaultToDate });
  }, [defaultFromDate, defaultToDate]);
  const readCachedFilter = (0, import_react4.useCallback)(() => {
    try {
      const raw = sessionStorage.getItem(HISTORY_FILTER_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return {
        fromDate: parsed.fromDate || "",
        toDate: parsed.toDate || "",
        page: parsed.page,
        clientAccount: parsed.clientAccount || "",
        clientText: parsed.clientText || ""
      };
    } catch {
      return null;
    }
  }, []);
  const clearFilterCache = (0, import_react4.useCallback)(() => {
    try {
      sessionStorage.removeItem(HISTORY_FILTER_KEY);
    } catch {
    }
  }, []);
  const consumeReturnFlag = (0, import_react4.useCallback)(() => {
    try {
      const raw = sessionStorage.getItem(HISTORY_RETURN_FLAG_KEY);
      if (raw === "1") {
        sessionStorage.removeItem(HISTORY_RETURN_FLAG_KEY);
        return true;
      }
    } catch {
    }
    return false;
  }, []);
  const loadActivities = (0, import_react4.useCallback)(
    async (page, override) => {
      const fromDateStr = override?.fromDate ?? fromDateValue;
      const toDateStr = override?.toDate ?? toDateValue;
      const accountNumStr = override?.accountNum ?? accountNumValue;
      if (!fromDateStr || !toDateStr) {
        setIsLoading(false);
        setItems([]);
        setTotal(0);
        setErrorMessage("");
        return;
      }
      setCurrentPage(page);
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
        retryTimerRef.current = null;
      }
      const requestId = ++activeRequestIdRef.current;
      if (activeAbortRef.current) {
        try {
          activeAbortRef.current.abort();
        } catch {
        }
      }
      const controller = new AbortController();
      activeAbortRef.current = controller;
      const normalized = normalizeRange(fromDateStr, toDateStr);
      const normalizedFrom = normalized.from;
      const normalizedTo = normalized.to;
      const filterSignature = `${normalizedFrom}|${normalizedTo}|${accountNumStr}|${page}`;
      lastSignatureRef.current = filterSignature;
      setIsLoading(true);
      setItems([]);
      setTotal(0);
      setErrorMessage("");
      const payload = {
        fromDate: normalizedFrom,
        toDate: normalizedTo,
        accountNum: accountNumStr
      };
      logHistory("loadActivities:request", { page, pageSize: PAGE_SIZE, payload });
      let response;
      try {
        const token = getCsrfToken();
        const headers = { "Content-Type": "application/json" };
        if (token) headers.RequestVerificationToken = token;
        response = await fetch(`/Historial/GetActivities?page=${page}&pageSize=${PAGE_SIZE}`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
          credentials: "same-origin",
          signal: controller.signal
        });
      } catch (err) {
        if (requestId !== activeRequestIdRef.current) return;
        if (err?.name === "AbortError") {
          activeAbortRef.current = null;
          return;
        }
        if (retryOnNetworkErrorRef.current) {
          retryOnNetworkErrorRef.current = false;
          activeAbortRef.current = null;
          retryTimerRef.current = window.setTimeout(() => {
            if (requestId !== activeRequestIdRef.current) return;
            if (lastSignatureRef.current !== filterSignature) return;
            loadActivities(page, { fromDate: fromDateStr, toDate: toDateStr, accountNum: accountNumStr });
          }, 600);
          return;
        }
        setIsLoading(false);
        setErrorMessage(indT("Api_RequestFailed", "No se pudo conectar con el servidor (red)."));
        activeAbortRef.current = null;
        return;
      }
      if (requestId !== activeRequestIdRef.current) return;
      if (response.status === 403) {
        setIsLoading(false);
        activeAbortRef.current = null;
        showPermissionModal();
        return;
      }
      if (!response.ok) {
        const statusText = response.statusText || "Error del servidor";
        setIsLoading(false);
        setErrorMessage(`${response.status} - ${statusText}. Verifica el backend.`);
        activeAbortRef.current = null;
        return;
      }
      const raw = await response.text();
      let data;
      try {
        data = JSON.parse(raw);
      } catch {
        setIsLoading(false);
        setErrorMessage(indT("Api_InvalidJson", "Error procesando datos"));
        activeAbortRef.current = null;
        return;
      }
      if (requestId !== activeRequestIdRef.current) return;
      logHistory("loadActivities:response", {
        status: response.status,
        total: data?.total ?? 0,
        count: Array.isArray(data?.items) ? data.items.length : 0
      });
      setIsLoading(false);
      setItems(data.items || []);
      setTotal(data.total || (data.items || []).length);
      activeAbortRef.current = null;
    },
    [fromDateValue, toDateValue, accountNumValue]
  );
  const validateManualRange = (0, import_react4.useCallback)(() => {
    if (activeQuickFilter === "custom" && (!startDate || !endDate)) {
      setShowManualError(true);
      setSelectingStep(!startDate ? "start" : "end");
      setIsOpen(true);
      setShowFilters(true);
      return false;
    }
    return true;
  }, [activeQuickFilter, endDate, startDate]);
  const applyFilters = (0, import_react4.useCallback)(
    (options) => {
      if (!validateManualRange()) return;
      if (!startDate || !endDate) return;
      const normalized = normalizeRange(fromDateValue, toDateValue);
      const page = options?.page ?? 1;
      const signature = `${normalized.from}|${normalized.to}|${accountNumValue}|${page}`;
      if (options?.force || lastSignatureRef.current !== signature) {
        loadActivities(page, { fromDate: normalized.from, toDate: normalized.to, accountNum: accountNumValue });
      }
      setShowManualError(false);
      if (options?.closePanel) {
        setIsOpen(false);
        setShowFilters(false);
      }
    },
    [accountNumValue, endDate, fromDateValue, loadActivities, startDate, toDateValue, validateManualRange]
  );
  const totalPages = Math.ceil((total || 0) / PAGE_SIZE);
  const updateFabBottom = (0, import_react4.useCallback)(() => {
    if (!paginationRef.current || totalPages <= 1) {
      setFabBottom(FAB_BASE_BOTTOM);
      return;
    }
    const height = paginationRef.current.offsetHeight || 0;
    const next = Math.max(FAB_BASE_BOTTOM, height + FAB_CLEARANCE + FAB_GAP);
    setFabBottom((prev) => Math.abs(prev - next) < 1 ? prev : next);
  }, [totalPages]);
  const applyDefaultRangeFromProps = (0, import_react4.useCallback)(() => {
    if (!defaultFromDate || !defaultToDate) return false;
    const startRaw = parseDateValue(defaultFromDate);
    const endRaw = parseDateValue(defaultToDate);
    if (!startRaw || !endRaw) return false;
    const startDay = startOfDay(startRaw);
    const endDay = startOfDay(endRaw);
    let start = startDay;
    let end = endDay;
    if (isBefore(end, start)) {
      const swap = start;
      start = end;
      end = swap;
    }
    setStartDate(start);
    setEndDate(end);
    setSelectingStep("done");
    setHoverDate(null);
    setCurrentMonth(start.getMonth());
    setCurrentYear(start.getFullYear());
    setActiveQuickFilter(null);
    setSelectedClient(null);
    setIsOpen(false);
    retryOnNetworkErrorRef.current = true;
    loadActivities(1, { fromDate: toISO(start), toDate: toISO(end), accountNum: "" });
    return true;
  }, [defaultFromDate, defaultToDate, loadActivities]);
  const resetHistoryFilters = (0, import_react4.useCallback)(() => {
    setStartDate(null);
    setEndDate(null);
    setManualStartDate(null);
    setManualEndDate(null);
    setSelectingStep("start");
    setHoverDate(null);
    setCurrentMonth((/* @__PURE__ */ new Date()).getMonth());
    setCurrentYear((/* @__PURE__ */ new Date()).getFullYear());
    setActiveQuickFilter(null);
    setSelectedClient(null);
    setClientResetKey((prev) => prev + 1);
    setShowManualError(false);
    clearFilterCache();
    setItems([]);
    setTotal(0);
    setErrorMessage("");
    setIsLoading(false);
  }, [clearFilterCache]);
  const applyCachedFilter = (0, import_react4.useCallback)(
    (filter) => {
      if (!filter || !filter.fromDate || !filter.toDate) return false;
      const start = parseISO(filter.fromDate);
      const end = parseISO(filter.toDate);
      setStartDate(start);
      setEndDate(end);
      setSelectingStep(end ? "done" : "end");
      setHoverDate(null);
      setCurrentMonth(start ? start.getMonth() : (/* @__PURE__ */ new Date()).getMonth());
      setCurrentYear(start ? start.getFullYear() : (/* @__PURE__ */ new Date()).getFullYear());
      setActiveQuickFilter(null);
      setShowManualError(false);
      if (filter.clientAccount) {
        setSelectedClient({ value: filter.clientAccount, text: filter.clientText || filter.clientAccount });
      } else {
        setSelectedClient(null);
      }
      const pageVal = Number(filter.page);
      const pageToLoad = Number.isFinite(pageVal) && pageVal > 0 ? pageVal : 1;
      retryOnNetworkErrorRef.current = true;
      loadActivities(pageToLoad, { fromDate: filter.fromDate, toDate: filter.toDate, accountNum: filter.clientAccount || "" });
      return true;
    },
    [loadActivities]
  );
  (0, import_react4.useEffect)(() => {
    if (didInitFilterRef.current) return;
    didInitFilterRef.current = true;
    const cached = consumeReturnFlag() ? readCachedFilter() : null;
    if (cached && cached.fromDate && cached.toDate) {
      logHistory("restoreFilter", cached);
      applyCachedFilter(cached);
      setShowFilters(false);
      setIsOpen(false);
      hasRestoredFilterRef.current = true;
      return;
    }
    if (applyDefaultRangeFromProps()) {
      setShowFilters(false);
      setIsOpen(false);
      hasRestoredFilterRef.current = true;
      return;
    }
    resetHistoryFilters();
    setShowFilters(true);
    setIsOpen(false);
  }, [applyCachedFilter, applyDefaultRangeFromProps, consumeReturnFlag, readCachedFilter, resetHistoryFilters]);
  (0, import_react4.useEffect)(() => {
    if (startDate && !endDate && selectingStep === "start") {
      setSelectingStep("end");
      return;
    }
    if (!startDate && selectingStep !== "start") {
      setSelectingStep("start");
    }
  }, [startDate, endDate, selectingStep]);
  (0, import_react4.useEffect)(() => {
    if (!isOpen) return;
    const handleOutside = (event) => {
      const target = event.target;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      if (activatorRef.current?.contains(target)) return;
      logHistory("closePopover:outside");
      setIsOpen(false);
      setHoverDate(null);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);
  (0, import_react4.useEffect)(() => {
    const onPageShow = () => {
      if (hasRestoredFilterRef.current) return;
      if (consumeReturnFlag()) {
        const cached = readCachedFilter();
        if (applyCachedFilter(cached)) {
          setShowFilters(false);
          setIsOpen(false);
          hasRestoredFilterRef.current = true;
          return;
        }
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyCachedFilter, consumeReturnFlag, readCachedFilter]);
  (0, import_react4.useEffect)(() => {
    updateFabBottom();
    let observer = null;
    const paginationEl = paginationRef.current;
    if (paginationEl && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => updateFabBottom());
      observer.observe(paginationEl);
    }
    window.addEventListener("resize", updateFabBottom);
    return () => {
      window.removeEventListener("resize", updateFabBottom);
      if (observer) observer.disconnect();
    };
  }, [updateFabBottom]);
  (0, import_react4.useEffect)(() => {
    const onToggleFilters = () => {
      setShowFilters((prev) => {
        const next = !prev;
        if (!next) {
          setIsOpen(false);
        }
        return next;
      });
    };
    const onRefresh = () => {
      applyFilters({ page: currentPage, force: true, closePanel: true });
    };
    window.addEventListener("history-toggle-filter", onToggleFilters);
    window.addEventListener("history-refresh", onRefresh);
    return () => {
      window.removeEventListener("history-toggle-filter", onToggleFilters);
      window.removeEventListener("history-refresh", onRefresh);
    };
  }, [applyFilters, currentPage]);
  const handleSelect = (0, import_react4.useCallback)(
    (dateObj) => {
      logHistory("handleSelect", {
        clicked: toISO(dateObj),
        start: fromDateValue,
        end: toDateValue,
        selectingStep
      });
      setShowManualError(false);
      setActiveQuickFilter("custom");
      const hasStart = !!startDate;
      const hasEnd = !!endDate;
      if (selectingStep === "end") {
        if (!hasStart) {
          setStartDate(dateObj);
          setEndDate(null);
          setSelectingStep("end");
          setCurrentMonth(dateObj.getMonth());
          setCurrentYear(dateObj.getFullYear());
          return;
        }
        let newStart2 = startDate;
        let newEnd = dateObj;
        if (isBefore(newEnd, newStart2)) {
          const swap = newStart2;
          newStart2 = newEnd;
          newEnd = swap;
        }
        setStartDate(newStart2);
        setEndDate(newEnd);
        setManualStartDate(newStart2);
        setManualEndDate(newEnd);
        setSelectingStep("done");
        setCurrentMonth(newEnd.getMonth());
        setCurrentYear(newEnd.getFullYear());
        setHoverDate(null);
        setIsOpen(false);
        return;
      }
      const newStart = dateObj;
      if (hasEnd && endDate && isBefore(endDate, newStart)) {
        setStartDate(newStart);
        setEndDate(null);
        setSelectingStep("end");
        setCurrentMonth(newStart.getMonth());
        setCurrentYear(newStart.getFullYear());
        return;
      }
      setStartDate(newStart);
      if (hasEnd && endDate) {
        setEndDate(endDate);
        setManualStartDate(newStart);
        setManualEndDate(endDate);
        setSelectingStep("done");
        setHoverDate(null);
        setIsOpen(false);
      } else {
        setEndDate(null);
        setSelectingStep("end");
      }
      setCurrentMonth(newStart.getMonth());
      setCurrentYear(newStart.getFullYear());
    },
    [endDate, fromDateValue, selectingStep, startDate, toDateValue]
  );
  const handleClear = (0, import_react4.useCallback)(
    (event) => {
      event.stopPropagation();
      logHistory("clearRange");
      setActiveQuickFilter(null);
      setShowManualError(false);
      resetHistoryFilters();
      setIsOpen(false);
      setShowFilters(true);
    },
    [resetHistoryFilters]
  );
  const openPopover = (0, import_react4.useCallback)((section) => {
    logHistory("openPopover", { section, start: fromDateValue, end: toDateValue, selectingStep });
    setShowManualError(false);
    setActiveQuickFilter("custom");
    if (section === "end" && !startDate) {
      setSelectingStep("start");
    } else {
      setSelectingStep(section);
    }
    setIsOpen(true);
  }, [fromDateValue, selectingStep, startDate, toDateValue]);
  const applyQuickRange = (0, import_react4.useCallback)(
    (filterId, start, end) => {
      const startDay = startOfDay(start);
      const endDay = startOfDay(end);
      setStartDate(startDay);
      setEndDate(endDay);
      setSelectingStep("done");
      setHoverDate(null);
      setCurrentMonth(startDay.getMonth());
      setCurrentYear(startDay.getFullYear());
      setIsOpen(false);
      setActiveQuickFilter(filterId);
      setShowManualError(false);
    },
    []
  );
  const handleQuickFilter = (0, import_react4.useCallback)(
    (filterId) => {
      const today = startOfDay(/* @__PURE__ */ new Date());
      if (filterId === "custom") {
        const nextStart = manualStartDate ? new Date(manualStartDate) : null;
        const nextEnd = manualEndDate ? new Date(manualEndDate) : null;
        setActiveQuickFilter("custom");
        setStartDate(nextStart);
        setEndDate(nextEnd);
        if (nextStart) {
          setCurrentMonth(nextStart.getMonth());
          setCurrentYear(nextStart.getFullYear());
        }
        setSelectingStep(nextStart && !nextEnd ? "end" : "start");
        setHoverDate(null);
        setIsOpen(true);
        setShowManualError(false);
        return;
      }
      if (filterId === "days-7") {
        const start = new Date(today);
        start.setDate(today.getDate() - 6);
        applyQuickRange(filterId, start, today);
        return;
      }
      if (filterId === "days-30") {
        const start = new Date(today);
        start.setDate(today.getDate() - 29);
        applyQuickRange(filterId, start, today);
        return;
      }
      if (filterId === "days-90") {
        const start = new Date(today);
        start.setDate(today.getDate() - 89);
        applyQuickRange(filterId, start, today);
      }
    },
    [applyQuickRange, manualEndDate, manualStartDate]
  );
  const handleClientSelected = (0, import_react4.useCallback)(
    (client) => {
      setSelectedClient(client);
    },
    []
  );
  const handleNavigate = (0, import_react4.useCallback)(
    (linkId) => {
      if (!canViewHistory) {
        showPermissionModal();
        return;
      }
      setTimeout(() => {
        try {
          sessionStorage.setItem(
            HISTORY_FILTER_KEY,
            JSON.stringify({
              fromDate: fromDateValue || "",
              toDate: toDateValue || "",
              page: currentPage,
              clientAccount: selectedClient?.value || "",
              clientText: selectedClient?.text || ""
            })
          );
          sessionStorage.setItem(HISTORY_RETURN_FLAG_KEY, "1");
        } catch {
        }
        const target = encodeURIComponent(linkId);
        window.location.href = `/Visitas/Detalle/${target}`;
      }, NAV_DELAY_MS);
    },
    [canViewHistory, currentPage, fromDateValue, toDateValue, selectedClient]
  );
  const calendar = (0, import_react4.useMemo)(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const offset = (firstDay.getDay() + 6) % 7;
    const cells = [];
    for (let i = 0; i < offset; i++) {
      cells.push({ date: null, iso: "", isEmpty: true });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      cells.push({ date: dateObj, iso: toISO(dateObj), isEmpty: false });
    }
    return {
      cells,
      label: formatMonthLabel(firstDay, locale)
    };
  }, [currentMonth, currentYear, locale]);
  const previewEnd = endDate || (selectingStep === "end" ? hoverDate : null);
  const timelineItems = (0, import_react4.useMemo)(() => {
    return items.map((x) => {
      const actividadIdRaw = (x.actividadId ?? x.ActividadId ?? "").toString().trim();
      const actividadId = actividadIdRaw || "";
      const recIdRaw = x.recId ?? x.RecId ?? "";
      const recId = recIdRaw && !Number.isNaN(Number(recIdRaw)) ? Number(recIdRaw) : null;
      let linkId = actividadId || (recId ? recId.toString() : "");
      if (debugLoggedRef.current < 5) {
        console.debug("activity item", { actividadId, recIdRaw, recId, raw: x });
        debugLoggedRef.current += 1;
      }
      const rawName = (x.name ?? x.Name ?? "").toString().trim();
      const fullName = toTitleCase(rawName, locale);
      const fecha = (x.transDate ?? x.TransDate ?? "").toString();
      const rawDesc = (x.description ?? x.Description ?? "").toString().trim();
      const fullDesc = rawDesc;
      const isNoDataCard = !rawName && !rawDesc;
      if (isNoDataCard) {
        linkId = "";
      }
      return {
        id: linkId,
        actividadId,
        recId,
        name: fullName,
        description: fullDesc || noDataText,
        fullName,
        fullDesc,
        dateParts: formatDateParts(fecha, locale),
        isNoData: isNoDataCard
      };
    });
  }, [items, locale, noDataText]);
  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  const summaryFrom = labelFrom;
  const summaryTo = labelTo;
  const filterTitle = indT("History_Filter_Date", "Date");
  const clearLabel = indT("History_Filter_Clear", "Clear");
  const applyLabel = indT("History_Filter_Apply", "Apply");
  const clientLabel = indT("History_Filter_Client", "Client");
  const quickCustomLabel = indT("History_Quick_Custom", "Date");
  const quick7DaysLabel = indT("History_Quick_7Days", "7 days");
  const quick30DaysLabel = indT("History_Quick_30Days", "30 days");
  const quick90DaysLabel = indT("History_Quick_90Days", "90 days");
  const pageFirstLabel = indT("History_Page_First", "First");
  const pagePrevLabel = indT("History_Page_Prev", "Previous");
  const pageNextLabel = indT("History_Page_Next", "Next");
  const pageLastLabel = indT("History_Page_Last", "Last");
  const quickFilters = [
    { id: "custom", label: quickCustomLabel },
    { id: "days-7", label: quick7DaysLabel },
    { id: "days-30", label: quick30DaysLabel },
    { id: "days-90", label: quick90DaysLabel }
  ];
  const showFilterActions = showFilters;
  const showSummary = !showFilters && !!startDate && !!endDate;
  const showResults = !showFilters;
  const manualRangeReady = !!manualStartDate && !!manualEndDate;
  const showInlineSummary = !!startDate && !!endDate && !isOpen && (activeQuickFilter !== "custom" || manualRangeReady);
  const showManualPicker = activeQuickFilter === "custom" && (isOpen || !manualRangeReady);
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "max-w-3xl mx-auto px-1 sm:px-2 pt-3 pb-4 space-y-2", children: [
    showSummary && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "history-filter-summary flex flex-wrap items-center gap-x-3 gap-y-2 text-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "font-semibold", children: [
          summaryFrom,
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: startDate ? formatDisplay(startDate, locale) : "--" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "font-semibold", children: [
          summaryTo,
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: endDate ? formatDisplay(endDate, locale) : "--" })
      ] }),
      selectedClient && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "history-filter-summary mt-1.5 flex items-center gap-2 text-xs min-w-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "font-semibold shrink-0", children: [
          clientLabel,
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "min-w-0 flex-1 truncate", children: selectedClient.text })
      ] })
    ] }),
    showFilters && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "filter-card filter-card--expanded p-2 sm:p-2.5 relative", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-1.5 history-filter-stack flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "grid grid-cols-2 gap-2 history-quick-filters", "aria-label": filterTitle, children: quickFilters.map((item) => {
        const isActive = activeQuickFilter === item.id;
        return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          FilterButton_default,
          {
            label: item.label,
            active: isActive,
            className: "w-full",
            onClick: () => handleQuickFilter(item.id)
          },
          item.id
        );
      }) }),
      showInlineSummary && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "history-filter-summary flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] px-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "font-semibold", children: [
          summaryFrom,
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: startDate ? formatDisplay(startDate, locale) : "--" }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { className: "font-semibold", children: [
          summaryTo,
          ":"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: endDate ? formatDisplay(endDate, locale) : "--" })
      ] }),
      showManualPicker && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "div",
          {
            id: "drpActivator",
            ref: activatorRef,
            className: classNames("drp w-full", showManualError ? "drp-error" : ""),
            onClick: () => openPopover("start"),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                "div",
                {
                  className: classNames(
                    "drp-section",
                    selectingStep === "start" && isOpen ? "active" : "",
                    showManualError && !startDate ? "is-error" : ""
                  ),
                  "data-section": "start",
                  onClick: (e) => {
                    e.stopPropagation();
                    openPopover("start");
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "drp-label", children: labelFrom }),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "drp-value", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", { className: "bi bi-calendar3 drp-icon" }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { id: "drpStartValue", children: startDate ? formatDisplay(startDate, locale) : indT("History_AddDate", "Add date") })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "drp-separator hidden sm:flex", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", { className: "bi bi-arrow-right" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "drp-separator-mobile flex sm:hidden" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                "div",
                {
                  className: classNames(
                    "drp-section",
                    selectingStep === "end" && isOpen ? "active" : "",
                    showManualError && !endDate ? "is-error" : ""
                  ),
                  "data-section": "end",
                  onClick: (e) => {
                    e.stopPropagation();
                    openPopover("end");
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "drp-label", children: labelTo }),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "drp-value", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", { className: "bi bi-calendar3 drp-icon" }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { id: "drpEndValue", children: endDate ? formatDisplay(endDate, locale) : indT("History_AddDate", "Add date") })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "button",
                {
                  type: "button",
                  id: "drpClear",
                  className: "drp-clear",
                  "aria-label": indT("History_ClearRange", "Clear range"),
                  style: { display: startDate || endDate ? "inline-flex" : "none" },
                  onClick: handleClear,
                  children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("i", { className: "bi bi-x-lg" })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { id: "drpPopover", ref: popoverRef, className: "drp-popover", hidden: !isOpen, children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "drp-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "button",
              {
                type: "button",
                className: "drp-nav",
                "data-dir": "prev",
                "aria-label": indT("History_PrevMonth", "Previous month"),
                onClick: (e) => {
                  e.stopPropagation();
                  setCurrentMonth((prev) => {
                    const next = prev - 1;
                    if (next < 0) {
                      setCurrentYear((year) => year - 1);
                      return 11;
                    }
                    return next;
                  });
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { id: "drpMonthLabel", className: "drp-month", children: calendar.label }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "button",
              {
                type: "button",
                className: "drp-nav",
                "data-dir": "next",
                "aria-label": indT("History_NextMonth", "Next month"),
                onClick: (e) => {
                  e.stopPropagation();
                  setCurrentMonth((prev) => {
                    const next = prev + 1;
                    if (next > 11) {
                      setCurrentYear((year) => year + 1);
                      return 0;
                    }
                    return next;
                  });
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "drp-weekdays", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT("History_Day_Mon", "Mon") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT("History_Day_Tue", "Tue") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT("History_Day_Wed", "Wed") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT("History_Day_Thu", "Thu") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT("History_Day_Fri", "Fri") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT("History_Day_Sat", "Sat") }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: indT("History_Day_Sun", "Sun") })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "div",
            {
              id: "drpGrid",
              className: "drp-grid",
              onMouseLeave: () => {
                setHoverDate(null);
              },
              children: calendar.cells.map((cell, idx) => {
                if (cell.isEmpty) {
                  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { className: "drp-day empty", disabled: true }, `empty-${idx}`);
                }
                const dateObj = cell.date;
                const isStart = sameDay(dateObj, startDate);
                const isEnd = sameDay(dateObj, endDate);
                const inRange = startDate && previewEnd && isBefore(startDate, dateObj) && isBefore(dateObj, previewEnd);
                const hoverRange = startDate && !endDate && hoverDate && isBefore(startDate, dateObj) && isBefore(dateObj, hoverDate);
                const disabled = selectingStep === "end" && !!startDate && isBefore(dateObj, startDate);
                const isToday = sameDay(dateObj, /* @__PURE__ */ new Date());
                const dayClass = classNames(
                  "drp-day",
                  isStart ? "start range-start" : "",
                  isEnd ? "end range-end" : "",
                  inRange ? "in-range" : "",
                  hoverRange ? "hover-range" : "",
                  disabled ? "disabled" : "",
                  isToday ? "today" : ""
                );
                return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "button",
                  {
                    type: "button",
                    className: dayClass,
                    "data-date": cell.iso,
                    disabled,
                    onClick: (e) => {
                      logHistory("dayClick", { date: cell.iso, disabled });
                      handleSelect(dateObj);
                    },
                    onMouseEnter: () => {
                      if (selectingStep === "end" && startDate) {
                        setHoverDate(new Date(dateObj));
                      }
                    },
                    children: dateObj.getDate()
                  },
                  cell.iso
                );
              })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { id: "drpStatus", className: "drp-status", children: selectingStep === "start" ? indT("History_Status_SelectStart", "Select start date") : indT("History_Status_SelectEnd", "Select end date") })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        ClientSearchCombobox_default,
        {
          value: selectedClient,
          onSelected: handleClientSelected,
          label: indT("History_Filter_Client", "Client"),
          placeholder: indT("History_Filter_Client", "Client"),
          variant: "compact",
          showLabel: false,
          idBase: "history-client",
          portalClassName: "visitas-typography"
        },
        clientResetKey
      ),
      showFilterActions && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "mt-1 grid grid-cols-2 gap-2 history-filter-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          ActionButton_default,
          {
            label: clearLabel,
            className: "w-full",
            onClick: () => {
              resetHistoryFilters();
              setIsOpen(false);
              setShowFilters(true);
            }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          ActionButton_default,
          {
            label: applyLabel,
            className: "w-full",
            onClick: () => {
              applyFilters({ closePanel: true, page: 1 });
            }
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { type: "hidden", id: "fromDate", value: fromDateValue, readOnly: true }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("input", { type: "hidden", id: "toDate", value: toDateValue, readOnly: true }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        id: "resultsLoader",
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("History_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("History_Loading", "Loading")
        ]
      }
    ),
    showResults && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        HistoryTable_default,
        {
          items: timelineItems,
          noDataText: indT("History_NoDataInRange", "No visits in this range"),
          errorMessage,
          onNavigate: handleNavigate
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        CompactPagination_default,
        {
          ref: paginationRef,
          totalPages,
          currentPage,
          pageWindow: PAGE_WINDOW,
          onPageChange: (page) => loadActivities(page),
          labels: {
            first: pageFirstLabel,
            prev: pagePrevLabel,
            next: pageNextLabel,
            last: pageLastLabel
          }
        }
      )
    ] }),
    canCreateVisit && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      FloatingActionButton_default,
      {
        route: "/Visitas/Create?fresh=1",
        ariaLabel: indT("Common_Create", "Create"),
        size: 76,
        right: 16,
        bottom: fabBottom
      }
    )
  ] });
};
var mountHistoryPage = (root) => {
  const defaultFromDate = root.getAttribute("data-default-from") || "";
  const defaultToDate = root.getAttribute("data-default-to") || "";
  const element = /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(HistoryPage, { defaultFromDate, defaultToDate });
  const existing = root.__indRoot;
  if (existing) {
    existing.render(element);
    return;
  }
  const reactRoot = (0, import_client.createRoot)(root);
  root.__indRoot = reactRoot;
  reactRoot.render(element);
};
var mount = () => {
  const rootEl = document.getElementById("visitas-history-root");
  if (!rootEl) return;
  mountHistoryPage(rootEl);
};
if (typeof document !== "undefined") {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    mount();
  } else {
    document.addEventListener("DOMContentLoaded", mount);
  }
}
var HistoryPage_default = HistoryPage;
export {
  HistoryPage,
  HistoryPage_default as default,
  mountHistoryPage
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVRhYmxlLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0ZpbHRlckJ1dHRvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgdHlwZSB7IE1vdXNlRXZlbnQgYXMgUmVhY3RNb3VzZUV2ZW50IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVJvb3QgfSBmcm9tIFwicmVhY3QtZG9tL2NsaWVudFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xyXG5pbXBvcnQgeyBnZXRDc3JmVG9rZW4gfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvYXBpU2VydmljZS50c1wiO1xyXG5pbXBvcnQgeyBISVNUT1JZX0ZJTFRFUl9LRVksIEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCBDbGllbnRTZWFyY2hDb21ib2JveCwgeyBDbGllbnRPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IEhpc3RvcnlUYWJsZSwgeyBUaW1lbGluZUl0ZW0gfSBmcm9tIFwiLi9IaXN0b3J5VGFibGUudHN4XCI7XG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IEZpbHRlckJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0ZpbHRlckJ1dHRvbi50c3hcIjtcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XG5cclxudHlwZSBQcm9wcyA9IHtcclxuICBkZWZhdWx0RnJvbURhdGU/OiBzdHJpbmc7XHJcbiAgZGVmYXVsdFRvRGF0ZT86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgQWN0aXZpdHlJdGVtID0ge1xyXG4gIGFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIEFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIFJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIG5hbWU/OiBzdHJpbmc7XHJcbiAgTmFtZT86IHN0cmluZztcclxuICB0cmFuc0RhdGU/OiBzdHJpbmc7XHJcbiAgVHJhbnNEYXRlPzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIERlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBIaXN0b3J5UmVzcG9uc2UgPSB7XHJcbiAgaXRlbXM/OiBBY3Rpdml0eUl0ZW1bXTtcclxuICB0b3RhbD86IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgQ2FjaGVkRmlsdGVyID0ge1xyXG4gIGZyb21EYXRlOiBzdHJpbmc7XHJcbiAgdG9EYXRlOiBzdHJpbmc7XHJcbiAgcGFnZT86IG51bWJlcjtcclxuICBjbGllbnRBY2NvdW50Pzogc3RyaW5nO1xyXG4gIGNsaWVudFRleHQ/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENhbGVuZGFyQ2VsbCA9IHtcclxuICBkYXRlOiBEYXRlIHwgbnVsbDtcclxuICBpc286IHN0cmluZztcclxuICBpc0VtcHR5OiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBRdWlja0ZpbHRlcklkID0gXCJjdXN0b21cIiB8IFwiZGF5cy03XCIgfCBcImRheXMtMzBcIiB8IFwiZGF5cy05MFwiO1xyXG5cclxuY29uc3QgUEFHRV9TSVpFID0gNjtcbmNvbnN0IFBBR0VfV0lORE9XID0gNjtcbmNvbnN0IE5BVl9ERUxBWV9NUyA9IDMyMDtcbmNvbnN0IEZBQl9CQVNFX0JPVFRPTSA9IDMyO1xuY29uc3QgRkFCX0NMRUFSQU5DRSA9IDI0O1xuY29uc3QgRkFCX0dBUCA9IDEyO1xuXHJcbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZykgPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTID0gW1xyXG4gIFwidXJ0YXJyaWxhXCIsXHJcbiAgXCJvdHNhaWxhXCIsXHJcbiAgXCJtYXJ0eG9hXCIsXHJcbiAgXCJhcGlyaWxhXCIsXHJcbiAgXCJtYWlhdHphXCIsXHJcbiAgXCJla2FpbmFcIixcclxuICBcInV6dGFpbGFcIixcclxuICBcImFidXp0dWFcIixcclxuICBcImlyYWlsYVwiLFxyXG4gIFwidXJyaWFcIixcclxuICBcImF6YXJvYVwiLFxyXG4gIFwiYWJlbmR1YVwiLFxyXG5dO1xyXG5cclxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcclxuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIixcclxuXTtcclxuXHJcbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xyXG4gIGlmIChmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSkgcmV0dXJuIG5vcm1hbGl6ZVVpTG9jYWxlKGZyb21IdG1sKTtcclxuICByZXR1cm4gXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuY29uc3QgcGFkID0gKG46IG51bWJlcikgPT4gbi50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmNvbnN0IHRvSVNPID0gKGQ6IERhdGUpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3Qgc3RhcnRPZkRheSA9IChkOiBEYXRlKSA9PiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAoczogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHMuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSk7XHJcbn07XHJcblxyXG5jb25zdCBzYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XHJcblxyXG5jb25zdCBpc0JlZm9yZSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplUmFuZ2UgPSAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoIWZyb20gfHwgIXRvKSByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBwYXJzZUlTTyhmcm9tKTtcclxuICAgIGNvbnN0IHRvRGF0ZSA9IHBhcnNlSVNPKHRvKTtcclxuICAgIGlmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkgcmV0dXJuIHsgZnJvbSwgdG8gfTtcclxuICBpZiAoaXNCZWZvcmUodG9EYXRlLCBmcm9tRGF0ZSkpIHtcclxuICAgIHJldHVybiB7IGZyb206IHRvSVNPKHRvRGF0ZSksIHRvOiB0b0lTTyhmcm9tRGF0ZSkgfTtcclxuICB9XHJcbiAgcmV0dXJuIHsgZnJvbTogdG9JU08oZnJvbURhdGUpLCB0bzogdG9JU08odG9EYXRlKSB9O1xyXG59O1xyXG5cclxuICBjb25zdCBmb3JtYXREaXNwbGF5ID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xyXG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBkXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdE1vbnRoTGFiZWwgPSAoZDogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB5ZWFyOiBcIm51bWVyaWNcIiwgbW9udGg6IFwibG9uZ1wiIH0pLmZvcm1hdChkKTtcclxuICB9XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2QuZ2V0TW9udGgoKV19ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbiAgfVxyXG4gIGNvbnN0IG1vbnRoTmFtZSA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XHJcbiAgY29uc3QgY2FwTW9udGhOYW1lID0gbW9udGhOYW1lICYmIC9bQS1aYS16XS8udGVzdChtb250aE5hbWVbMF0pXHJcbiAgICA/IG1vbnRoTmFtZVswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbW9udGhOYW1lLnNsaWNlKDEpXHJcbiAgICA6IG1vbnRoTmFtZTtcclxuICByZXR1cm4gYCR7Y2FwTW9udGhOYW1lfSAke2QuZ2V0RnVsbFllYXIoKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VEYXRlVmFsdWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGF0ZVBhcnQgPSByYXcuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgW3ksIG0sIGRdID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgcGFydHMgPSBkYXRlUGFydC5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcclxuICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSA/IG51bGwgOiBwYXJzZWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXREYXRlUGFydHMgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIlwiIH07XHJcbiAgY29uc3QgZCA9IHBhcnNlRGF0ZVZhbHVlKHZhbHVlKTtcclxuICBpZiAoIWQpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBsZXQgbW9udGggPSBcIlwiO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXSB8fCBcIlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtb250aCA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IFN0cmluZyhkLmdldEZ1bGxZZWFyKCkpLFxyXG4gICAgbW9udGg6IG1vbnRoLnRvVXBwZXJDYXNlKCksXHJcbiAgICBkYXk6IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFteXFxwe0x9XSkoXFxwe0x9KS9ndSwgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBsb3dlci5yZXBsYWNlKC8oXnxbXFxzLS9dKShcXFMpL2csIChfbWF0Y2gsIHByZWZpeCwgY2gpID0+IGAke3ByZWZpeH0ke2NoLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSl9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgdG9TZW50ZW5jZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xyXG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIHRyaW1tZWQ7XHJcbiAgY29uc3QgbG93ZXIgPSB0cmltbWVkLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XHJcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcclxufTtcclxuXHJcbmNvbnN0IGxvZ0hpc3RvcnkgPSAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gIGNvbnN0IGRlYnVnRmxhZyA9ICh3aW5kb3cgYXMgYW55KS5fX0lORF9ERUJVR19ISVNUT1JZX187XHJcbiAgaWYgKGRlYnVnRmxhZyA9PT0gZmFsc2UpIHJldHVybjtcclxuICBpZiAoZGF0YSkge1xyXG4gICAgY29uc29sZS5kZWJ1ZyhcIltIaXN0b3J5XVwiLCBtZXNzYWdlLCBkYXRhKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5kZWJ1ZyhcIltIaXN0b3J5XVwiLCBtZXNzYWdlKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBIaXN0b3J5IHBhZ2Ugd2l0aCBSZWFjdCBzdGF0ZSArIGVmZmVjdHMgKG5vIGxlZ2FjeSBET00gbG9naWMpLlxyXG5leHBvcnQgY29uc3QgSGlzdG9yeVBhZ2UgPSAoeyBkZWZhdWx0RnJvbURhdGUgPSBcIlwiLCBkZWZhdWx0VG9EYXRlID0gXCJcIiB9OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gZ2V0VWlMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IGNhblZpZXdIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZVZpc2l0ID0gY2FuQWNjZXNzKFwiVklTSVRBU19DUkVBQ0lPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBub0RhdGFUZXh0ID0gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpO1xyXG5cclxuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwYWdpbmF0aW9uUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cclxuICBjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFttYW51YWxTdGFydERhdGUsIHNldE1hbnVhbFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFttYW51YWxFbmREYXRlLCBzZXRNYW51YWxFbmREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2hvdmVyRGF0ZSwgc2V0SG92ZXJEYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdID0gdXNlU3RhdGU8XCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiPihcInN0YXJ0XCIpO1xyXG4gIGNvbnN0IFtjdXJyZW50TW9udGgsIHNldEN1cnJlbnRNb250aF0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpLmdldE1vbnRoKCkpO1xyXG4gIGNvbnN0IFtjdXJyZW50WWVhciwgc2V0Q3VycmVudFllYXJdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcclxuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFthY3RpdmVRdWlja0ZpbHRlciwgc2V0QWN0aXZlUXVpY2tGaWx0ZXJdID0gdXNlU3RhdGU8UXVpY2tGaWx0ZXJJZCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZENsaWVudCwgc2V0U2VsZWN0ZWRDbGllbnRdID0gdXNlU3RhdGU8Q2xpZW50T3B0aW9uIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2NsaWVudFJlc2V0S2V5LCBzZXRDbGllbnRSZXNldEtleV0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbc2hvd0ZpbHRlcnMsIHNldFNob3dGaWx0ZXJzXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gIGNvbnN0IFtzaG93TWFudWFsRXJyb3IsIHNldFNob3dNYW51YWxFcnJvcl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtmYWJCb3R0b20sIHNldEZhYkJvdHRvbV0gPSB1c2VTdGF0ZShGQUJfQkFTRV9CT1RUT00pO1xuXHJcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxBY3Rpdml0eUl0ZW1bXT4oW10pO1xyXG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcclxuICBjb25zdCBbaXNMb2FkaW5nLCBzZXRJc0xvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuXHJcbiAgY29uc3QgaGFzUmVzdG9yZWRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGRpZEluaXRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IHJldHJ5T25OZXR3b3JrRXJyb3JSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG4gIGNvbnN0IGFjdGl2ZUFib3J0UmVmID0gdXNlUmVmPEFib3J0Q29udHJvbGxlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RJZFJlZiA9IHVzZVJlZigwKTtcclxuICBjb25zdCByZXRyeVRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGxhc3RTaWduYXR1cmVSZWYgPSB1c2VSZWYoXCJcIik7XHJcbiAgY29uc3QgZGVidWdMb2dnZWRSZWYgPSB1c2VSZWYoMCk7XHJcblxyXG4gIGNvbnN0IGZyb21EYXRlVmFsdWUgPSB1c2VNZW1vKCgpID0+IChzdGFydERhdGUgPyB0b0lTTyhzdGFydERhdGUpIDogXCJcIiksIFtzdGFydERhdGVdKTtcclxuICBjb25zdCB0b0RhdGVWYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKGVuZERhdGUgPyB0b0lTTyhlbmREYXRlKSA6IFwiXCIpLCBbZW5kRGF0ZV0pO1xyXG4gIGNvbnN0IGFjY291bnROdW1WYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKHNlbGVjdGVkQ2xpZW50ID8gc2VsZWN0ZWRDbGllbnQudmFsdWUgOiBcIlwiKSwgW3NlbGVjdGVkQ2xpZW50XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsb2dIaXN0b3J5KFwiaW5pdFwiLCB7IGRlZmF1bHRGcm9tRGF0ZSwgZGVmYXVsdFRvRGF0ZSB9KTtcclxuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlXSk7XHJcblxyXG4gIC8vIFJlYWRzIHRoZSBjYWNoZWQgZmlsdGVyIGZyb20gc2Vzc2lvblN0b3JhZ2UuXHJcbiAgY29uc3QgcmVhZENhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKCgpOiBDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJhdyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oSElTVE9SWV9GSUxURVJfS0VZKTtcclxuICAgICAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xyXG4gICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKHJhdyk7XHJcbiAgICAgIGlmICghcGFyc2VkIHx8IHR5cGVvZiBwYXJzZWQgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGZyb21EYXRlOiBwYXJzZWQuZnJvbURhdGUgfHwgXCJcIixcclxuICAgICAgICB0b0RhdGU6IHBhcnNlZC50b0RhdGUgfHwgXCJcIixcclxuICAgICAgICBwYWdlOiBwYXJzZWQucGFnZSxcclxuICAgICAgICBjbGllbnRBY2NvdW50OiBwYXJzZWQuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxyXG4gICAgICAgIGNsaWVudFRleHQ6IHBhcnNlZC5jbGllbnRUZXh0IHx8IFwiXCIsXHJcbiAgICAgIH07XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICAvLyBDbGVhcnMgdGhlIGNhY2hlZCBmaWx0ZXIgaW4gc2Vzc2lvblN0b3JhZ2UuXHJcbiAgY29uc3QgY2xlYXJGaWx0ZXJDYWNoZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oSElTVE9SWV9GSUxURVJfS0VZKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBpZ25vcmUgY2FjaGUgZXJyb3JzXHJcbiAgICB9XHJcbiAgfSwgW10pO1xyXG5cclxuICAvLyBDb25zdW1lcyB0aGUgcmV0dXJuIGZsYWcgdXNlZCB0byByZXN0b3JlIGZpbHRlcnMgYWZ0ZXIgbmF2aWdhdGlvbi5cclxuICBjb25zdCBjb25zdW1lUmV0dXJuRmxhZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJhdyA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xyXG4gICAgICBpZiAocmF3ID09PSBcIjFcIikge1xyXG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLy8gaWdub3JlIGNhY2hlIGVycm9yc1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sIFtdKTsgXHJcblxyXG4gIC8vIEZldGNoZXMgYWN0aXZpdGllcyBmcm9tIE1WQyB3aXRoIENTUkYgcHJvdGVjdGlvbiBhbmQgcmV0cnkgb24gaW5pdGlhbCBuZXR3b3JrIGVycm9yLlxyXG4gIGNvbnN0IGxvYWRBY3Rpdml0aWVzID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAocGFnZTogbnVtYmVyLCBvdmVycmlkZT86IHsgZnJvbURhdGU6IHN0cmluZzsgdG9EYXRlOiBzdHJpbmc7IGFjY291bnROdW0/OiBzdHJpbmcgfSkgPT4ge1xyXG4gICAgICBjb25zdCBmcm9tRGF0ZVN0ciA9IG92ZXJyaWRlPy5mcm9tRGF0ZSA/PyBmcm9tRGF0ZVZhbHVlO1xyXG4gICAgICBjb25zdCB0b0RhdGVTdHIgPSBvdmVycmlkZT8udG9EYXRlID8/IHRvRGF0ZVZhbHVlO1xyXG4gICAgICBjb25zdCBhY2NvdW50TnVtU3RyID0gb3ZlcnJpZGU/LmFjY291bnROdW0gPz8gYWNjb3VudE51bVZhbHVlO1xyXG5cclxuICAgICAgaWYgKCFmcm9tRGF0ZVN0ciB8fCAhdG9EYXRlU3RyKSB7XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICAgICAgc2V0VG90YWwoMCk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcblxyXG4gICAgICBpZiAocmV0cnlUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KHJldHJ5VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgICAgcmV0cnlUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdElkID0gKythY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudDtcclxuICAgICAgaWYgKGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgLy8gaWdub3JlIGFib3J0IGVycm9yc1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVN0ciwgdG9EYXRlU3RyKTtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZEZyb20gPSBub3JtYWxpemVkLmZyb207XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUbyA9IG5vcm1hbGl6ZWQudG87XHJcbiAgICAgIGNvbnN0IGZpbHRlclNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWRGcm9tfXwke25vcm1hbGl6ZWRUb318JHthY2NvdW50TnVtU3RyfXwke3BhZ2V9YDtcclxuICAgICAgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ID0gZmlsdGVyU2lnbmF0dXJlO1xyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKHRydWUpO1xyXG4gICAgICBzZXRJdGVtcyhbXSk7XHJcbiAgICAgIHNldFRvdGFsKDApO1xyXG4gICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XHJcblxyXG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICAgIGZyb21EYXRlOiBub3JtYWxpemVkRnJvbSxcclxuICAgICAgICB0b0RhdGU6IG5vcm1hbGl6ZWRUbyxcclxuICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbG9nSGlzdG9yeShcImxvYWRBY3Rpdml0aWVzOnJlcXVlc3RcIiwgeyBwYWdlLCBwYWdlU2l6ZTogUEFHRV9TSVpFLCBwYXlsb2FkIH0pO1xyXG5cclxuICAgICAgbGV0IHJlc3BvbnNlOiBSZXNwb25zZTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB0b2tlbiA9IGdldENzcmZUb2tlbigpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH07XHJcbiAgICAgICAgaWYgKHRva2VuKSBoZWFkZXJzLlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlbiA9IHRva2VuO1xyXG5cclxuICAgICAgICByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAvSGlzdG9yaWFsL0dldEFjdGl2aXRpZXM/cGFnZT0ke3BhZ2V9JnBhZ2VTaXplPSR7UEFHRV9TSVpFfWAsIHtcclxuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICBoZWFkZXJzLFxyXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXHJcbiAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxyXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcclxuICAgICAgICB9KTtcclxuICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcclxuICAgICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChlcnI/Lm5hbWUgPT09IFwiQWJvcnRFcnJvclwiKSB7XHJcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCkge1xyXG4gICAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICAgIHJldHJ5VGltZXJSZWYuY3VycmVudCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgICAgICAgaWYgKGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gZmlsdGVyU2lnbmF0dXJlKSByZXR1cm47XHJcbiAgICAgICAgICAgIGxvYWRBY3Rpdml0aWVzKHBhZ2UsIHsgZnJvbURhdGU6IGZyb21EYXRlU3RyLCB0b0RhdGU6IHRvRGF0ZVN0ciwgYWNjb3VudE51bTogYWNjb3VudE51bVN0ciB9KTtcclxuICAgICAgICAgIH0sIDYwMCk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XHJcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIk5vIHNlIHB1ZG8gY29uZWN0YXIgY29uIGVsIHNlcnZpZG9yIChyZWQpLlwiKSk7XHJcbiAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAzKSB7XHJcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhdHVzVGV4dCA9IHJlc3BvbnNlLnN0YXR1c1RleHQgfHwgXCJFcnJvciBkZWwgc2Vydmlkb3JcIjtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShgJHtyZXNwb25zZS5zdGF0dXN9IC0gJHtzdGF0dXNUZXh0fS4gVmVyaWZpY2EgZWwgYmFja2VuZC5gKTtcclxuICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJhdyA9IGF3YWl0IHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgbGV0IGRhdGE6IEhpc3RvcnlSZXNwb25zZTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShyYXcpO1xyXG4gICAgICB9IGNhdGNoIHtcclxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiQXBpX0ludmFsaWRKc29uXCIsIFwiRXJyb3IgcHJvY2VzYW5kbyBkYXRvc1wiKSk7XHJcbiAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgbG9nSGlzdG9yeShcImxvYWRBY3Rpdml0aWVzOnJlc3BvbnNlXCIsIHtcclxuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcclxuICAgICAgICB0b3RhbDogZGF0YT8udG90YWwgPz8gMCxcclxuICAgICAgICBjb3VudDogQXJyYXkuaXNBcnJheShkYXRhPy5pdGVtcykgPyBkYXRhLml0ZW1zLmxlbmd0aCA6IDAsXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgc2V0SXRlbXMoZGF0YS5pdGVtcyB8fCBbXSk7XHJcbiAgICAgIHNldFRvdGFsKGRhdGEudG90YWwgfHwgKGRhdGEuaXRlbXMgfHwgW10pLmxlbmd0aCk7XHJcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIFtmcm9tRGF0ZVZhbHVlLCB0b0RhdGVWYWx1ZSwgYWNjb3VudE51bVZhbHVlXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHZhbGlkYXRlTWFudWFsUmFuZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoYWN0aXZlUXVpY2tGaWx0ZXIgPT09IFwiY3VzdG9tXCIgJiYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpKSB7XHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcih0cnVlKTtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcCghc3RhcnREYXRlID8gXCJzdGFydFwiIDogXCJlbmRcIik7XHJcbiAgICAgIHNldElzT3Blbih0cnVlKTtcclxuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0sIFthY3RpdmVRdWlja0ZpbHRlciwgZW5kRGF0ZSwgc3RhcnREYXRlXSk7XHJcblxyXG4gIGNvbnN0IGFwcGx5RmlsdGVycyA9IHVzZUNhbGxiYWNrKFxuICAgIChvcHRpb25zPzogeyBjbG9zZVBhbmVsPzogYm9vbGVhbjsgZm9yY2U/OiBib29sZWFuOyBwYWdlPzogbnVtYmVyIH0pID0+IHtcclxuICAgICAgaWYgKCF2YWxpZGF0ZU1hbnVhbFJhbmdlKCkpIHJldHVybjtcclxuICAgICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVZhbHVlLCB0b0RhdGVWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHBhZ2UgPSBvcHRpb25zPy5wYWdlID8/IDE7XHJcbiAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1WYWx1ZX18JHtwYWdlfWA7XHJcblxyXG4gICAgICBpZiAob3B0aW9ucz8uZm9yY2UgfHwgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ICE9PSBzaWduYXR1cmUpIHtcclxuICAgICAgICBsb2FkQWN0aXZpdGllcyhwYWdlLCB7IGZyb21EYXRlOiBub3JtYWxpemVkLmZyb20sIHRvRGF0ZTogbm9ybWFsaXplZC50bywgYWNjb3VudE51bTogYWNjb3VudE51bVZhbHVlIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBpZiAob3B0aW9ucz8uY2xvc2VQYW5lbCkge1xyXG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2FjY291bnROdW1WYWx1ZSwgZW5kRGF0ZSwgZnJvbURhdGVWYWx1ZSwgbG9hZEFjdGl2aXRpZXMsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWUsIHZhbGlkYXRlTWFudWFsUmFuZ2VdXHJcbiAgKTtcblxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XG5cbiAgLy8gS2VlcCB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiBjbGVhciBvZiBwYWdpbmF0aW9uIG9uIHNtYWxsIHNjcmVlbnMuXG4gIGNvbnN0IHVwZGF0ZUZhYkJvdHRvbSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXBhZ2luYXRpb25SZWYuY3VycmVudCB8fCB0b3RhbFBhZ2VzIDw9IDEpIHtcbiAgICAgIHNldEZhYkJvdHRvbShGQUJfQkFTRV9CT1RUT00pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoZWlnaHQgPSBwYWdpbmF0aW9uUmVmLmN1cnJlbnQub2Zmc2V0SGVpZ2h0IHx8IDA7XG4gICAgY29uc3QgbmV4dCA9IE1hdGgubWF4KEZBQl9CQVNFX0JPVFRPTSwgaGVpZ2h0ICsgRkFCX0NMRUFSQU5DRSArIEZBQl9HQVApO1xuICAgIHNldEZhYkJvdHRvbSgocHJldikgPT4gKE1hdGguYWJzKHByZXYgLSBuZXh0KSA8IDEgPyBwcmV2IDogbmV4dCkpO1xuICB9LCBbdG90YWxQYWdlc10pO1xuXG4gIC8vIEFwcGxpZXMgYSBkZWZhdWx0IHJhbmdlIHdoZW4gcHJvdmlkZWQgYnkgdGhlIHNlcnZlci5cbiAgY29uc3QgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFkZWZhdWx0RnJvbURhdGUgfHwgIWRlZmF1bHRUb0RhdGUpIHJldHVybiBmYWxzZTtcclxuICAgIGNvbnN0IHN0YXJ0UmF3ID0gcGFyc2VEYXRlVmFsdWUoZGVmYXVsdEZyb21EYXRlKTtcclxuICAgIGNvbnN0IGVuZFJhdyA9IHBhcnNlRGF0ZVZhbHVlKGRlZmF1bHRUb0RhdGUpO1xyXG4gICAgaWYgKCFzdGFydFJhdyB8fCAhZW5kUmF3KSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0UmF3KTtcclxuICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kUmF3KTtcclxuXHJcbiAgICBsZXQgc3RhcnQgPSBzdGFydERheTtcclxuICAgIGxldCBlbmQgPSBlbmREYXk7XHJcbiAgICBpZiAoaXNCZWZvcmUoZW5kLCBzdGFydCkpIHtcclxuICAgICAgY29uc3Qgc3dhcCA9IHN0YXJ0O1xyXG4gICAgICBzdGFydCA9IGVuZDtcclxuICAgICAgZW5kID0gc3dhcDtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGFydERhdGUoc3RhcnQpO1xyXG4gICAgc2V0RW5kRGF0ZShlbmQpO1xyXG4gICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XHJcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICBzZXRDdXJyZW50TW9udGgoc3RhcnQuZ2V0TW9udGgoKSk7XHJcbiAgICBzZXRDdXJyZW50WWVhcihzdGFydC5nZXRGdWxsWWVhcigpKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XHJcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgIGxvYWRBY3Rpdml0aWVzKDEsIHsgZnJvbURhdGU6IHRvSVNPKHN0YXJ0KSwgdG9EYXRlOiB0b0lTTyhlbmQpLCBhY2NvdW50TnVtOiBcIlwiIH0pO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSwgW2RlZmF1bHRGcm9tRGF0ZSwgZGVmYXVsdFRvRGF0ZSwgbG9hZEFjdGl2aXRpZXNdKTtcclxuXHJcbiAgLy8gUmVzZXRzIGZpbHRlcnMgYW5kIGNsZWFycyBsb2NhbCBzdGF0ZS5cclxuICBjb25zdCByZXNldEhpc3RvcnlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFN0YXJ0RGF0ZShudWxsKTtcbiAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShudWxsKTtcbiAgICBzZXRNYW51YWxFbmREYXRlKG51bGwpO1xuICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgc2V0Q3VycmVudE1vbnRoKG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gICAgc2V0Q3VycmVudFllYXIobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcclxuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xyXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XHJcbiAgICBzZXRDbGllbnRSZXNldEtleSgocHJldikgPT4gcHJldiArIDEpO1xyXG4gICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcclxuICAgIHNldEl0ZW1zKFtdKTtcclxuICAgIHNldFRvdGFsKDApO1xyXG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xyXG4gICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcclxuICB9LCBbY2xlYXJGaWx0ZXJDYWNoZV0pO1xyXG5cclxuICAvLyBBcHBsaWVzIGEgY2FjaGVkIGZpbHRlciBmcm9tIHNlc3Npb25TdG9yYWdlLlxyXG4gIGNvbnN0IGFwcGx5Q2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVyOiBDYWNoZWRGaWx0ZXIgfCBudWxsKSA9PiB7XHJcbiAgICAgIGlmICghZmlsdGVyIHx8ICFmaWx0ZXIuZnJvbURhdGUgfHwgIWZpbHRlci50b0RhdGUpIHJldHVybiBmYWxzZTtcclxuICAgICAgY29uc3Qgc3RhcnQgPSBwYXJzZUlTTyhmaWx0ZXIuZnJvbURhdGUpO1xyXG4gICAgICBjb25zdCBlbmQgPSBwYXJzZUlTTyhmaWx0ZXIudG9EYXRlKTtcclxuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgICAgc2V0RW5kRGF0ZShlbmQpO1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKGVuZCA/IFwiZG9uZVwiIDogXCJlbmRcIik7XHJcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0ID8gc3RhcnQuZ2V0TW9udGgoKSA6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XHJcbiAgICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0ID8gc3RhcnQuZ2V0RnVsbFllYXIoKSA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBpZiAoZmlsdGVyLmNsaWVudEFjY291bnQpIHtcclxuICAgICAgICBzZXRTZWxlY3RlZENsaWVudCh7IHZhbHVlOiBmaWx0ZXIuY2xpZW50QWNjb3VudCwgdGV4dDogZmlsdGVyLmNsaWVudFRleHQgfHwgZmlsdGVyLmNsaWVudEFjY291bnQgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3QgcGFnZVZhbCA9IE51bWJlcihmaWx0ZXIucGFnZSk7XHJcbiAgICAgIGNvbnN0IHBhZ2VUb0xvYWQgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVZhbCkgJiYgcGFnZVZhbCA+IDAgPyBwYWdlVmFsIDogMTtcclxuICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZVRvTG9hZCwgeyBmcm9tRGF0ZTogZmlsdGVyLmZyb21EYXRlLCB0b0RhdGU6IGZpbHRlci50b0RhdGUsIGFjY291bnROdW06IGZpbHRlci5jbGllbnRBY2NvdW50IHx8IFwiXCIgfSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIFtsb2FkQWN0aXZpdGllc11cclxuICApO1xyXG5cclxuICAvLyBSZXN0b3JlIGNhY2hlZCBmaWx0ZXIgb24gaW5pdGlhbCBtb3VudCBvbmx5LlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoZGlkSW5pdEZpbHRlclJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICBkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgY29uc3QgY2FjaGVkID0gY29uc3VtZVJldHVybkZsYWcoKSA/IHJlYWRDYWNoZWRGaWx0ZXIoKSA6IG51bGw7XHJcbiAgICBpZiAoY2FjaGVkICYmIGNhY2hlZC5mcm9tRGF0ZSAmJiBjYWNoZWQudG9EYXRlKSB7XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJyZXN0b3JlRmlsdGVyXCIsIGNhY2hlZCk7XHJcbiAgICAgIGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCk7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcygpKSB7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcclxuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xyXG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICB9LCBbYXBwbHlDYWNoZWRGaWx0ZXIsIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLCBjb25zdW1lUmV0dXJuRmxhZywgcmVhZENhY2hlZEZpbHRlciwgcmVzZXRIaXN0b3J5RmlsdGVyc10pO1xyXG5cclxuICAvLyBLZWVwIHRoZSBwaWNrZXIgc3RlcCBpbiBzeW5jIHdpdGggY3VycmVudCBzZWxlY3Rpb24uXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiKSB7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghc3RhcnREYXRlICYmIHNlbGVjdGluZ1N0ZXAgIT09IFwic3RhcnRcIikge1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgICB9XHJcbiAgfSwgW3N0YXJ0RGF0ZSwgZW5kRGF0ZSwgc2VsZWN0aW5nU3RlcF0pO1xyXG5cclxuICAvLyBDbG9zZSB0aGUgY2FsZW5kYXIgd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwaWNrZXIuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNPcGVuKSByZXR1cm47XHJcbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlIHwgbnVsbDtcclxuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBpZiAoYWN0aXZhdG9yUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgbG9nSGlzdG9yeShcImNsb3NlUG9wb3ZlcjpvdXRzaWRlXCIpO1xyXG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcclxuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xyXG4gIH0sIFtpc09wZW5dKTtcclxuXHJcbiAgLy8gUmUtYXBwbHkgZmlsdGVycyBhZnRlciByZXR1cm5pbmcgZnJvbSBkZXRhaWwgdmlldy5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25QYWdlU2hvdyA9ICgpID0+IHtcclxuICAgICAgaWYgKGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgaWYgKGNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcclxuICAgICAgICBjb25zdCBjYWNoZWQgPSByZWFkQ2FjaGVkRmlsdGVyKCk7XHJcbiAgICAgICAgaWYgKGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCkpIHtcclxuICAgICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gS2VlcCBjdXJyZW50IHN0YXRlIHdoZW4gbm8gY2FjaGVkIGZpbHRlciBpcyBhdmFpbGFibGUuXHJcbiAgICB9O1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gIH0sIFthcHBseUNhY2hlZEZpbHRlciwgY29uc3VtZVJldHVybkZsYWcsIHJlYWRDYWNoZWRGaWx0ZXJdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHVwZGF0ZUZhYkJvdHRvbSgpO1xuICAgIGxldCBvYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBwYWdpbmF0aW9uRWwgPSBwYWdpbmF0aW9uUmVmLmN1cnJlbnQ7XG4gICAgaWYgKHBhZ2luYXRpb25FbCAmJiB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHVwZGF0ZUZhYkJvdHRvbSgpKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbkVsKTtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlRmFiQm90dG9tKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlRmFiQm90dG9tKTtcbiAgICAgIGlmIChvYnNlcnZlcikgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH07XG4gIH0sIFt1cGRhdGVGYWJCb3R0b21dKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKChwcmV2KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9ICFwcmV2O1xyXG4gICAgICAgIGlmICghbmV4dCkge1xyXG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcclxuICAgICAgYXBwbHlGaWx0ZXJzKHsgcGFnZTogY3VycmVudFBhZ2UsIGZvcmNlOiB0cnVlLCBjbG9zZVBhbmVsOiB0cnVlIH0pO1xyXG4gICAgfTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGlzdG9yeS10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuICAgIH07XHJcbiAgfSwgW2FwcGx5RmlsdGVycywgY3VycmVudFBhZ2VdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdXNlQ2FsbGJhY2soXG4gICAgKGRhdGVPYmo6IERhdGUpID0+IHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJoYW5kbGVTZWxlY3RcIiwge1xuICAgICAgICBjbGlja2VkOiB0b0lTTyhkYXRlT2JqKSxcbiAgICAgICAgc3RhcnQ6IGZyb21EYXRlVmFsdWUsXG4gICAgICAgIGVuZDogdG9EYXRlVmFsdWUsXG4gICAgICAgIHNlbGVjdGluZ1N0ZXAsXG4gICAgICB9KTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIGNvbnN0IGhhc1N0YXJ0ID0gISFzdGFydERhdGU7XG4gICAgICBjb25zdCBoYXNFbmQgPSAhIWVuZERhdGU7XG5cbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiKSB7XG4gICAgICAgIGlmICghaGFzU3RhcnQpIHtcbiAgICAgICAgICBzZXRTdGFydERhdGUoZGF0ZU9iaik7XG4gICAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgICAgIHNldEN1cnJlbnRNb250aChkYXRlT2JqLmdldE1vbnRoKCkpO1xuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKGRhdGVPYmouZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld1N0YXJ0ID0gc3RhcnREYXRlIGFzIERhdGU7XG4gICAgICAgIGxldCBuZXdFbmQgPSBkYXRlT2JqO1xuICAgICAgICBpZiAoaXNCZWZvcmUobmV3RW5kLCBuZXdTdGFydCkpIHtcbiAgICAgICAgICBjb25zdCBzd2FwID0gbmV3U3RhcnQ7XG4gICAgICAgICAgbmV3U3RhcnQgPSBuZXdFbmQ7XG4gICAgICAgICAgbmV3RW5kID0gc3dhcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICAgIHNldEVuZERhdGUobmV3RW5kKTtcbiAgICAgICAgc2V0TWFudWFsU3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0TWFudWFsRW5kRGF0ZShuZXdFbmQpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld0VuZC5nZXRNb250aCgpKTtcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV3RW5kLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3U3RhcnQgPSBkYXRlT2JqO1xuICAgICAgaWYgKGhhc0VuZCAmJiBlbmREYXRlICYmIGlzQmVmb3JlKGVuZERhdGUsIG5ld1N0YXJ0KSkge1xuICAgICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5ld1N0YXJ0LmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICBpZiAoaGFzRW5kICYmIGVuZERhdGUpIHtcbiAgICAgICAgc2V0RW5kRGF0ZShlbmREYXRlKTtcbiAgICAgICAgc2V0TWFudWFsU3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0TWFudWFsRW5kRGF0ZShlbmREYXRlKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICB9XG4gICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICBzZXRDdXJyZW50WWVhcihuZXdTdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICB9LFxuICAgIFtlbmREYXRlLCBmcm9tRGF0ZVZhbHVlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlXVxuICApO1xuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudCkgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBsb2dIaXN0b3J5KFwiY2xlYXJSYW5nZVwiKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICB9LFxuICAgIFtyZXNldEhpc3RvcnlGaWx0ZXJzXVxuICApO1xuXHJcbiAgY29uc3Qgb3BlblBvcG92ZXIgPSB1c2VDYWxsYmFjaygoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4ge1xyXG4gICAgbG9nSGlzdG9yeShcIm9wZW5Qb3BvdmVyXCIsIHsgc2VjdGlvbiwgc3RhcnQ6IGZyb21EYXRlVmFsdWUsIGVuZDogdG9EYXRlVmFsdWUsIHNlbGVjdGluZ1N0ZXAgfSk7XHJcbiAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XHJcbiAgICBpZiAoc2VjdGlvbiA9PT0gXCJlbmRcIiAmJiAhc3RhcnREYXRlKSB7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc2VjdGlvbik7XHJcbiAgICB9XHJcbiAgICBzZXRJc09wZW4odHJ1ZSk7XHJcbiAgfSwgW2Zyb21EYXRlVmFsdWUsIHNlbGVjdGluZ1N0ZXAsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWVdKTtcclxuXHJcbiAgY29uc3QgYXBwbHlRdWlja1JhbmdlID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQsIHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUpID0+IHtcclxuICAgICAgY29uc3Qgc3RhcnREYXkgPSBzdGFydE9mRGF5KHN0YXJ0KTtcclxuICAgICAgY29uc3QgZW5kRGF5ID0gc3RhcnRPZkRheShlbmQpO1xyXG4gICAgICBzZXRTdGFydERhdGUoc3RhcnREYXkpO1xyXG4gICAgICBzZXRFbmREYXRlKGVuZERheSk7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICAgIHNldEN1cnJlbnRNb250aChzdGFydERheS5nZXRNb250aCgpKTtcclxuICAgICAgc2V0Q3VycmVudFllYXIoc3RhcnREYXkuZ2V0RnVsbFllYXIoKSk7XHJcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKGZpbHRlcklkKTtcclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgIH0sXHJcbiAgICBbXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVF1aWNrRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGZpbHRlcklkOiBRdWlja0ZpbHRlcklkKSA9PiB7XG4gICAgICBjb25zdCB0b2RheSA9IHN0YXJ0T2ZEYXkobmV3IERhdGUoKSk7XG5cbiAgICAgIGlmIChmaWx0ZXJJZCA9PT0gXCJjdXN0b21cIikge1xuICAgICAgICBjb25zdCBuZXh0U3RhcnQgPSBtYW51YWxTdGFydERhdGUgPyBuZXcgRGF0ZShtYW51YWxTdGFydERhdGUpIDogbnVsbDtcbiAgICAgICAgY29uc3QgbmV4dEVuZCA9IG1hbnVhbEVuZERhdGUgPyBuZXcgRGF0ZShtYW51YWxFbmREYXRlKSA6IG51bGw7XG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgICBzZXRTdGFydERhdGUobmV4dFN0YXJ0KTtcbiAgICAgICAgc2V0RW5kRGF0ZShuZXh0RW5kKTtcbiAgICAgICAgaWYgKG5leHRTdGFydCkge1xuICAgICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIobmV4dFN0YXJ0LmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICB9XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAobmV4dFN0YXJ0ICYmICFuZXh0RW5kID8gXCJlbmRcIiA6IFwic3RhcnRcIik7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgc2V0SXNPcGVuKHRydWUpO1xuICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDYpO1xuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy05MFwiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xuICAgICAgfVxuICAgIH0sXHJcbiAgICBbYXBwbHlRdWlja1JhbmdlLCBtYW51YWxFbmREYXRlLCBtYW51YWxTdGFydERhdGVdXG4gICk7XG5cclxuICBjb25zdCBoYW5kbGVDbGllbnRTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGNsaWVudDogQ2xpZW50T3B0aW9uIHwgbnVsbCkgPT4ge1xyXG4gICAgICBzZXRTZWxlY3RlZENsaWVudChjbGllbnQpO1xyXG4gICAgfSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTmF2aWdhdGUgPSB1c2VDYWxsYmFjayhcclxuICAgIChsaW5rSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoIWNhblZpZXdIaXN0b3J5KSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKFxyXG4gICAgICAgICAgICBISVNUT1JZX0ZJTFRFUl9LRVksXHJcbiAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICBmcm9tRGF0ZTogZnJvbURhdGVWYWx1ZSB8fCBcIlwiLFxyXG4gICAgICAgICAgICAgIHRvRGF0ZTogdG9EYXRlVmFsdWUgfHwgXCJcIixcclxuICAgICAgICAgICAgICBwYWdlOiBjdXJyZW50UGFnZSxcclxuICAgICAgICAgICAgICBjbGllbnRBY2NvdW50OiBzZWxlY3RlZENsaWVudD8udmFsdWUgfHwgXCJcIixcclxuICAgICAgICAgICAgICBjbGllbnRUZXh0OiBzZWxlY3RlZENsaWVudD8udGV4dCB8fCBcIlwiLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oSElTVE9SWV9SRVRVUk5fRkxBR19LRVksIFwiMVwiKTtcclxuICAgICAgICB9IGNhdGNoIHtcclxuICAgICAgICAgIC8vIGlnbm9yZSBjYWNoZSBlcnJvcnNcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZW5jb2RlVVJJQ29tcG9uZW50KGxpbmtJZCk7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL1Zpc2l0YXMvRGV0YWxsZS8ke3RhcmdldH1gO1xyXG4gICAgICB9LCBOQVZfREVMQVlfTVMpO1xyXG4gICAgfSxcclxuICAgIFtjYW5WaWV3SGlzdG9yeSwgY3VycmVudFBhZ2UsIGZyb21EYXRlVmFsdWUsIHRvRGF0ZVZhbHVlLCBzZWxlY3RlZENsaWVudF1cclxuICApO1xyXG5cclxuICBjb25zdCBjYWxlbmRhciA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgZmlyc3REYXkgPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCAxKTtcclxuICAgIGNvbnN0IGRheXNJbk1vbnRoID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCArIDEsIDApLmdldERhdGUoKTtcclxuICAgIGNvbnN0IG9mZnNldCA9IChmaXJzdERheS5nZXREYXkoKSArIDYpICUgNztcclxuICAgIGNvbnN0IGNlbGxzOiBDYWxlbmRhckNlbGxbXSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvZmZzZXQ7IGkrKykge1xyXG4gICAgICBjZWxscy5wdXNoKHsgZGF0ZTogbnVsbCwgaXNvOiBcIlwiLCBpc0VtcHR5OiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgZm9yIChsZXQgZCA9IDE7IGQgPD0gZGF5c0luTW9udGg7IGQrKykge1xyXG4gICAgICBjb25zdCBkYXRlT2JqID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgZCk7XHJcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBkYXRlT2JqLCBpc286IHRvSVNPKGRhdGVPYmopLCBpc0VtcHR5OiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGNlbGxzLFxyXG4gICAgICBsYWJlbDogZm9ybWF0TW9udGhMYWJlbChmaXJzdERheSwgbG9jYWxlKSxcclxuICAgIH07XHJcbiAgfSwgW2N1cnJlbnRNb250aCwgY3VycmVudFllYXIsIGxvY2FsZV0pO1xyXG5cclxuICBjb25zdCBwcmV2aWV3RW5kID0gZW5kRGF0ZSB8fCAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiA/IGhvdmVyRGF0ZSA6IG51bGwpO1xyXG5cclxuICBjb25zdCB0aW1lbGluZUl0ZW1zOiBUaW1lbGluZUl0ZW1bXSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgcmV0dXJuIGl0ZW1zLm1hcCgoeCkgPT4ge1xyXG4gICAgICBjb25zdCBhY3RpdmlkYWRJZFJhdyA9ICh4LmFjdGl2aWRhZElkID8/IHguQWN0aXZpZGFkSWQgPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IGFjdGl2aWRhZElkID0gYWN0aXZpZGFkSWRSYXcgfHwgXCJcIjtcclxuICAgICAgY29uc3QgcmVjSWRSYXcgPSB4LnJlY0lkID8/IHguUmVjSWQgPz8gXCJcIjtcclxuICAgICAgY29uc3QgcmVjSWQgPSByZWNJZFJhdyAmJiAhTnVtYmVyLmlzTmFOKE51bWJlcihyZWNJZFJhdykpID8gTnVtYmVyKHJlY0lkUmF3KSA6IG51bGw7XHJcbiAgICAgIGxldCBsaW5rSWQgPSBhY3RpdmlkYWRJZCB8fCAocmVjSWQgPyByZWNJZC50b1N0cmluZygpIDogXCJcIik7XHJcblxyXG4gICAgICBpZiAoZGVidWdMb2dnZWRSZWYuY3VycmVudCA8IDUpIHtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiYWN0aXZpdHkgaXRlbVwiLCB7IGFjdGl2aWRhZElkLCByZWNJZFJhdywgcmVjSWQsIHJhdzogeCB9KTtcclxuICAgICAgICBkZWJ1Z0xvZ2dlZFJlZi5jdXJyZW50ICs9IDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IHJhd05hbWUgPSAoeC5uYW1lID8/IHguTmFtZSA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgY29uc3QgZnVsbE5hbWUgPSB0b1RpdGxlQ2FzZShyYXdOYW1lLCBsb2NhbGUpO1xyXG4gICAgICBjb25zdCBmZWNoYSA9ICh4LnRyYW5zRGF0ZSA/PyB4LlRyYW5zRGF0ZSA/PyBcIlwiKS50b1N0cmluZygpO1xyXG4gICAgICBjb25zdCByYXdEZXNjID0gKHguZGVzY3JpcHRpb24gPz8geC5EZXNjcmlwdGlvbiA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgY29uc3QgZnVsbERlc2MgPSByYXdEZXNjO1xyXG5cclxuICAgICAgY29uc3QgaXNOb0RhdGFDYXJkID0gIXJhd05hbWUgJiYgIXJhd0Rlc2M7XHJcbiAgICAgIGlmIChpc05vRGF0YUNhcmQpIHtcclxuICAgICAgICBsaW5rSWQgPSBcIlwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGlkOiBsaW5rSWQsXHJcbiAgICAgICAgYWN0aXZpZGFkSWQsXHJcbiAgICAgICAgcmVjSWQsXHJcbiAgICAgICAgbmFtZTogZnVsbE5hbWUsXHJcbiAgICAgICAgZGVzY3JpcHRpb246IGZ1bGxEZXNjIHx8IG5vRGF0YVRleHQsXHJcbiAgICAgICAgZnVsbE5hbWUsXHJcbiAgICAgICAgZnVsbERlc2MsXHJcbiAgICAgICAgZGF0ZVBhcnRzOiBmb3JtYXREYXRlUGFydHMoZmVjaGEsIGxvY2FsZSksXHJcbiAgICAgICAgaXNOb0RhdGE6IGlzTm9EYXRhQ2FyZCxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH0sIFtpdGVtcywgbG9jYWxlLCBub0RhdGFUZXh0XSk7XHJcblxyXG4gIGNvbnN0IGxhYmVsRnJvbSA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X0Zyb21cIiwgXCJGcm9tXCIpLCBsb2NhbGUpO1xuICBjb25zdCBsYWJlbFRvID0gdG9TZW50ZW5jZUNhc2UoaW5kVChcIkhpc3RvcnlfVG9cIiwgXCJUb1wiKSwgbG9jYWxlKTtcbiAgY29uc3Qgc3VtbWFyeUZyb20gPSBsYWJlbEZyb207XG4gIGNvbnN0IHN1bW1hcnlUbyA9IGxhYmVsVG87XG4gIGNvbnN0IGZpbHRlclRpdGxlID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0RhdGVcIiwgXCJEYXRlXCIpO1xyXG4gIGNvbnN0IGNsZWFyTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xlYXJcIiwgXCJDbGVhclwiKTtcclxuICBjb25zdCBhcHBseUxhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0FwcGx5XCIsIFwiQXBwbHlcIik7XHJcbiAgY29uc3QgY2xpZW50TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQ2xpZW50XCIpO1xyXG4gIGNvbnN0IHF1aWNrQ3VzdG9tTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpO1xyXG4gIGNvbnN0IHF1aWNrN0RheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzdEYXlzXCIsIFwiNyBkYXlzXCIpO1xyXG4gIGNvbnN0IHF1aWNrMzBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja18zMERheXNcIiwgXCIzMCBkYXlzXCIpO1xyXG4gIGNvbnN0IHF1aWNrOTBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpO1xuICBjb25zdCBwYWdlRmlyc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKTtcbiAgY29uc3QgcGFnZVByZXZMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpO1xuICBjb25zdCBwYWdlTmV4dExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKTtcbiAgY29uc3QgcGFnZUxhc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIik7XG4gIGNvbnN0IHF1aWNrRmlsdGVycyA9IFtcbiAgICB7IGlkOiBcImN1c3RvbVwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2tDdXN0b21MYWJlbCB9LFxuICAgIHsgaWQ6IFwiZGF5cy03XCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazdEYXlzTGFiZWwgfSxcbiAgICB7IGlkOiBcImRheXMtMzBcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrMzBEYXlzTGFiZWwgfSxcbiAgICB7IGlkOiBcImRheXMtOTBcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrOTBEYXlzTGFiZWwgfSxcbiAgXTtcbiAgY29uc3Qgc2hvd0ZpbHRlckFjdGlvbnMgPSBzaG93RmlsdGVycztcbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgISFzdGFydERhdGUgJiYgISFlbmREYXRlO1xuICBjb25zdCBzaG93UmVzdWx0cyA9ICFzaG93RmlsdGVycztcbiAgY29uc3QgbWFudWFsUmFuZ2VSZWFkeSA9ICEhbWFudWFsU3RhcnREYXRlICYmICEhbWFudWFsRW5kRGF0ZTtcbiAgY29uc3Qgc2hvd0lubGluZVN1bW1hcnkgPVxuICAgICEhc3RhcnREYXRlICYmXG4gICAgISFlbmREYXRlICYmXG4gICAgIWlzT3BlbiAmJlxuICAgIChhY3RpdmVRdWlja0ZpbHRlciAhPT0gXCJjdXN0b21cIiB8fCBtYW51YWxSYW5nZVJlYWR5KTtcbiAgY29uc3Qgc2hvd01hbnVhbFBpY2tlciA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmIChpc09wZW4gfHwgIW1hbnVhbFJhbmdlUmVhZHkpO1xuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctM3hsIG14LWF1dG8gcHgtMSBzbTpweC0yIHB0LTMgcGItNCBzcGFjZS15LTJcIj5cclxuICAgICAge3Nob3dTdW1tYXJ5ICYmIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1zdW1tYXJ5IHAtMyBzbTpwLTQgbXQtMSBtYi0zXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnkgZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC14LTMgZ2FwLXktMiB0ZXh0LXhzXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57c3VtbWFyeUZyb219Ojwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4+e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogXCItLVwifTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntzdW1tYXJ5VG99Ojwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4+e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9PC9zcGFuPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICB7c2VsZWN0ZWRDbGllbnQgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnkgbXQtMS41IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgbWluLXctMFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgc2hyaW5rLTBcIj57Y2xpZW50TGFiZWx9Ojwvc3Bhbj5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMSB0cnVuY2F0ZVwiPntzZWxlY3RlZENsaWVudC50ZXh0fTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG4gICAgICB7c2hvd0ZpbHRlcnMgJiYgKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpbHRlci1jYXJkIGZpbHRlci1jYXJkLS1leHBhbmRlZCBwLTIgc206cC0yLjUgcmVsYXRpdmVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IGhpc3RvcnktZmlsdGVyLXN0YWNrIGZsZXggZmxleC1jb2xcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LXF1aWNrLWZpbHRlcnNcIiBhcmlhLWxhYmVsPXtmaWx0ZXJUaXRsZX0+XG4gICAgICAgICAgICB7cXVpY2tGaWx0ZXJzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBpdGVtLmlkO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxGaWx0ZXJCdXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17aXRlbS5pZH1cbiAgICAgICAgICAgICAgICAgIGxhYmVsPXtpdGVtLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgYWN0aXZlPXtpc0FjdGl2ZX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVRdWlja0ZpbHRlcihpdGVtLmlkKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7c2hvd0lubGluZVN1bW1hcnkgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAteC0zIGdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e3N1bW1hcnlGcm9tfTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPntzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57c3VtbWFyeVRvfTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPntlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogXCItLVwifTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7c2hvd01hbnVhbFBpY2tlciAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgaWQ9XCJkcnBBY3RpdmF0b3JcIlxuICAgICAgICAgICAgICAgIHJlZj17YWN0aXZhdG9yUmVmfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImRycCB3LWZ1bGxcIiwgc2hvd01hbnVhbEVycm9yID8gXCJkcnAtZXJyb3JcIiA6IFwiXCIpfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb3BlblBvcG92ZXIoXCJzdGFydFwiKX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICBcImRycC1zZWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiICYmIGlzT3BlbiA/IFwiYWN0aXZlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNob3dNYW51YWxFcnJvciAmJiAhc3RhcnREYXRlID8gXCJpcy1lcnJvclwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICBkYXRhLXNlY3Rpb249XCJzdGFydFwiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1sYWJlbFwiPntsYWJlbEZyb219PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXZhbHVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmktY2FsZW5kYXIzIGRycC1pY29uXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBpZD1cImRycFN0YXJ0VmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtzdGFydERhdGUgPyBmb3JtYXREaXNwbGF5KHN0YXJ0RGF0ZSwgbG9jYWxlKSA6IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtc2VwYXJhdG9yIGhpZGRlbiBzbTpmbGV4XCI+XHJcbiAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImJpIGJpLWFycm93LXJpZ2h0XCIgLz5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtc2VwYXJhdG9yLW1vYmlsZSBmbGV4IHNtOmhpZGRlblwiIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkcnAtc2VjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgaXNPcGVuID8gXCJhY3RpdmVcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yICYmICFlbmREYXRlID8gXCJpcy1lcnJvclwiIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgICBkYXRhLXNlY3Rpb249XCJlbmRcIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlblBvcG92ZXIoXCJlbmRcIik7XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLWxhYmVsXCI+e2xhYmVsVG99PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXZhbHVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmktY2FsZW5kYXIzIGRycC1pY29uXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBpZD1cImRycEVuZFZhbHVlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICB7ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IGluZFQoXCJIaXN0b3J5X0FkZERhdGVcIiwgXCJBZGQgZGF0ZVwiKX1cclxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgaWQ9XCJkcnBDbGVhclwiXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1jbGVhclwiXHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2luZFQoXCJIaXN0b3J5X0NsZWFyUmFuZ2VcIiwgXCJDbGVhciByYW5nZVwiKX1cclxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogc3RhcnREYXRlIHx8IGVuZERhdGUgPyBcImlubGluZS1mbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDbGVhcn1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmkteC1sZ1wiIC8+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgPGRpdiBpZD1cImRycFBvcG92ZXJcIiByZWY9e3BvcG92ZXJSZWZ9IGNsYXNzTmFtZT1cImRycC1wb3BvdmVyXCIgaGlkZGVuPXshaXNPcGVufT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLWhlYWRcIj5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1uYXZcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtZGlyPVwicHJldlwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIil9XHJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV4dCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcclxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCIyXCIgZD1cIk0xNSAxOWwtNy03IDctN1wiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZHJwTW9udGhMYWJlbFwiIGNsYXNzTmFtZT1cImRycC1tb250aFwiPntjYWxlbmRhci5sYWJlbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1uYXZcIlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEtZGlyPVwibmV4dFwiXHJcbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRNb250aCgocHJldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0ID0gcHJldiArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0ID4gMTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTkgNWw3IDctNyA3XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXdlZWtkYXlzXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfTW9uXCIsIFwiTW9uXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9UdWVcIiwgXCJUdWVcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfVGh1XCIsIFwiVGh1XCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9GcmlcIiwgXCJGcmlcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfU3VuXCIsIFwiU3VuXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICBpZD1cImRycEdyaWRcIlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkcnAtZ3JpZFwiXHJcbiAgICAgICAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge2NhbGVuZGFyLmNlbGxzLm1hcCgoY2VsbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGwuaXNFbXB0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxidXR0b24ga2V5PXtgZW1wdHktJHtpZHh9YH0gY2xhc3NOYW1lPVwiZHJwLWRheSBlbXB0eVwiIGRpc2FibGVkIC8+O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZU9iaiA9IGNlbGwuZGF0ZSBhcyBEYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU3RhcnQgPSBzYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNFbmQgPSBzYW1lRGF5KGRhdGVPYmosIGVuZERhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluUmFuZ2UgPSBzdGFydERhdGUgJiYgcHJldmlld0VuZCAmJiBpc0JlZm9yZShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlKGRhdGVPYmosIHByZXZpZXdFbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXNhYmxlZCA9IHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgISFzdGFydERhdGUgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgc3RhcnREYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1RvZGF5ID0gc2FtZURheShkYXRlT2JqLCBuZXcgRGF0ZSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF5Q2xhc3MgPSBjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgXCJkcnAtZGF5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpc1N0YXJ0ID8gXCJzdGFydCByYW5nZS1zdGFydFwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgIGlzRW5kID8gXCJlbmQgcmFuZ2UtZW5kXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaW5SYW5nZSA/IFwiaW4tcmFuZ2VcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBob3ZlclJhbmdlID8gXCJob3Zlci1yYW5nZVwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtjZWxsLmlzb31cclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17ZGF5Q2xhc3N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtZGF0ZT17Y2VsbC5pc299XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dIaXN0b3J5KFwiZGF5Q2xpY2tcIiwgeyBkYXRlOiBjZWxsLmlzbywgZGlzYWJsZWQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2VsZWN0KGRhdGVPYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiBzdGFydERhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEhvdmVyRGF0ZShuZXcgRGF0ZShkYXRlT2JqKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGF0ZU9iai5nZXREYXRlKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImRycFN0YXR1c1wiIGNsYXNzTmFtZT1cImRycC1zdGF0dXNcIj5cclxuICAgICAgICAgICAgICAgICAge3NlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIlxyXG4gICAgICAgICAgICAgICAgICAgID8gaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdFN0YXJ0XCIsIFwiU2VsZWN0IHN0YXJ0IGRhdGVcIilcclxuICAgICAgICAgICAgICAgICAgICA6IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RFbmRcIiwgXCJTZWxlY3QgZW5kIGRhdGVcIil9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKX1cclxuXHJcbiAgICAgICAgICA8Q2xpZW50U2VhcmNoQ29tYm9ib3hcclxuICAgICAgICAgICAga2V5PXtjbGllbnRSZXNldEtleX1cclxuICAgICAgICAgICAgdmFsdWU9e3NlbGVjdGVkQ2xpZW50fVxyXG4gICAgICAgICAgICBvblNlbGVjdGVkPXtoYW5kbGVDbGllbnRTZWxlY3RlZH1cclxuICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJDbGllbnRcIil9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQ2xpZW50XCIpfVxyXG4gICAgICAgICAgICB2YXJpYW50PVwiY29tcGFjdFwiXHJcbiAgICAgICAgICAgIHNob3dMYWJlbD17ZmFsc2V9XHJcbiAgICAgICAgICAgIGlkQmFzZT1cImhpc3RvcnktY2xpZW50XCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAge3Nob3dGaWx0ZXJBY3Rpb25zICYmIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0xIGdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgaGlzdG9yeS1maWx0ZXItYWN0aW9uc1wiPlxuICAgICAgICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgbGFiZWw9e2NsZWFyTGFiZWx9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgICAgICAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgIGxhYmVsPXthcHBseUxhYmVsfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKHsgY2xvc2VQYW5lbDogdHJ1ZSwgcGFnZTogMSB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImZyb21EYXRlXCIgdmFsdWU9e2Zyb21EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJ0b0RhdGVcIiB2YWx1ZT17dG9EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgaWQ9XCJyZXN1bHRzTG9hZGVyXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJIaXN0b3J5X0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtzaG93UmVzdWx0cyAmJiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxIaXN0b3J5VGFibGVcclxuICAgICAgICAgICAgaXRlbXM9e3RpbWVsaW5lSXRlbXN9XHJcbiAgICAgICAgICAgIG5vRGF0YVRleHQ9e2luZFQoXCJIaXN0b3J5X05vRGF0YUluUmFuZ2VcIiwgXCJObyB2aXNpdHMgaW4gdGhpcyByYW5nZVwiKX1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgICAgIG9uTmF2aWdhdGU9e2hhbmRsZU5hdmlnYXRlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgICAgIHJlZj17cGFnaW5hdGlvblJlZn1cbiAgICAgICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgICAgICBwYWdlV2luZG93PXtQQUdFX1dJTkRPV31cbiAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IGxvYWRBY3Rpdml0aWVzKHBhZ2UpfVxuICAgICAgICAgICAgbGFiZWxzPXt7XG4gICAgICAgICAgICAgIGZpcnN0OiBwYWdlRmlyc3RMYWJlbCxcbiAgICAgICAgICAgICAgcHJldjogcGFnZVByZXZMYWJlbCxcbiAgICAgICAgICAgICAgbmV4dDogcGFnZU5leHRMYWJlbCxcbiAgICAgICAgICAgICAgbGFzdDogcGFnZUxhc3RMYWJlbCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAge2NhbkNyZWF0ZVZpc2l0ICYmIChcclxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICByb3V0ZT1cIi9WaXNpdGFzL0NyZWF0ZT9mcmVzaD0xXCJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJDb21tb25fQ3JlYXRlXCIsIFwiQ3JlYXRlXCIpfVxuICAgICAgICAgIHNpemU9ezc2fVxuICAgICAgICAgIHJpZ2h0PXsxNn1cbiAgICAgICAgICBib3R0b209e2ZhYkJvdHRvbX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1vdW50IGhlbHBlciBmb3IgdGhlIGxlZ2FjeSBSYXpvciB2aWV3LlxyXG5leHBvcnQgY29uc3QgbW91bnRIaXN0b3J5UGFnZSA9IChyb290OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gIGNvbnN0IGRlZmF1bHRGcm9tRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LWZyb21cIikgfHwgXCJcIjtcclxuICBjb25zdCBkZWZhdWx0VG9EYXRlID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtdG9cIikgfHwgXCJcIjtcclxuXHJcbiAgY29uc3QgZWxlbWVudCA9IDxIaXN0b3J5UGFnZSBkZWZhdWx0RnJvbURhdGU9e2RlZmF1bHRGcm9tRGF0ZX0gZGVmYXVsdFRvRGF0ZT17ZGVmYXVsdFRvRGF0ZX0gLz47XHJcbiAgY29uc3QgZXhpc3RpbmcgPSAocm9vdCBhcyBIVE1MRWxlbWVudCAmIHsgX19pbmRSb290PzogaW1wb3J0KFwicmVhY3QtZG9tL2NsaWVudFwiKS5Sb290IH0pLl9faW5kUm9vdDtcclxuXHJcbiAgaWYgKGV4aXN0aW5nKSB7XHJcbiAgICBleGlzdGluZy5yZW5kZXIoZWxlbWVudCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWFjdFJvb3QgPSBjcmVhdGVSb290KHJvb3QpO1xyXG4gIChyb290IGFzIEhUTUxFbGVtZW50ICYgeyBfX2luZFJvb3Q/OiBpbXBvcnQoXCJyZWFjdC1kb20vY2xpZW50XCIpLlJvb3QgfSkuX19pbmRSb290ID0gcmVhY3RSb290O1xyXG4gIHJlYWN0Um9vdC5yZW5kZXIoZWxlbWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtaGlzdG9yeS1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcbiAgbW91bnRIaXN0b3J5UGFnZShyb290RWwpO1xyXG59O1xyXG5cclxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XHJcbiAgICBtb3VudCgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtb3VudCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5UGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFRpbWVsaW5lRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IHN0cmluZztcclxuICBtb250aDogc3RyaW5nO1xyXG4gIGRheTogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVGltZWxpbmVJdGVtID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmc7XHJcbiAgcmVjSWQ/OiBudW1iZXIgfCBudWxsO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGZ1bGxOYW1lOiBzdHJpbmc7XHJcbiAgZnVsbERlc2M6IHN0cmluZztcclxuICBkYXRlUGFydHM6IFRpbWVsaW5lRGF0ZVBhcnRzO1xyXG4gIGlzTm9EYXRhOiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICBpdGVtczogVGltZWxpbmVJdGVtW107XHJcbiAgbm9EYXRhVGV4dDogc3RyaW5nO1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIG9uTmF2aWdhdGU6IChsaW5rSWQ6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IFRBUF9NT1ZFX1BYID0gMTQ7XHJcbmNvbnN0IFRPT0xUSVBfVE9VQ0hfREVMQVlfTVMgPSAxMjA7XHJcbmNvbnN0IEhPTERfVE9fUFJFVklFV19NUyA9IDE2MDtcclxuY29uc3QgVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPID0gMC44O1xyXG5jb25zdCBUT09MVElQX0JBU0VfRk9OVCA9IDEzO1xyXG5jb25zdCBUT09MVElQX01JTl9GT05UID0gMTE7XHJcbmNvbnN0IEVMTElQU0lTID0gXCIuLi5cIjtcclxuY29uc3QgUElYRUxfR0FQID0gNTtcclxuY29uc3QgUElYRUxfU1BFRUQgPSA5NTtcclxuY29uc3QgUElYRUxfQ09MT1JTID0gW1wicmdiYSgwLCA0MSwgMTA3LCAwLjA4KVwiLCBcInJnYmEoMCwgNDEsIDEwNywgMC4xNilcIiwgXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMjYpXCJdO1xyXG5cclxudHlwZSBQaXhlbFN0YXRlID0ge1xyXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgcGl4ZWxzOiBQaXhlbFtdO1xyXG4gIGFuaW1JZDogbnVtYmVyIHwgbnVsbDtcclxuICBsYXN0VGltZTogbnVtYmVyO1xyXG4gIHJlZHVjZWRNb3Rpb246IGJvb2xlYW47XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxufTtcclxuXHJcbi8vIENvbXB1dGUgcGl4ZWwgc3BlZWQgd2hpbGUgcmVzcGVjdGluZyByZWR1Y2VkIG1vdGlvbiBwcmVmZXJlbmNlLlxyXG5jb25zdCBnZXRFZmZlY3RpdmVTcGVlZCA9ICh2YWx1ZTogbnVtYmVyLCByZWR1Y2VkTW90aW9uOiBib29sZWFuKSA9PiB7XHJcbiAgY29uc3QgbWluID0gMDtcclxuICBjb25zdCBtYXggPSAxMDA7XHJcbiAgY29uc3QgdGhyb3R0bGUgPSAwLjAwMTtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIucGFyc2VJbnQoU3RyaW5nKHZhbHVlKSwgMTApO1xyXG5cclxuICBpZiAocGFyc2VkIDw9IG1pbiB8fCByZWR1Y2VkTW90aW9uKSByZXR1cm4gbWluO1xyXG4gIGlmIChwYXJzZWQgPj0gbWF4KSByZXR1cm4gbWF4ICogdGhyb3R0bGU7XHJcbiAgcmV0dXJuIHBhcnNlZCAqIHRocm90dGxlO1xyXG59O1xyXG5cclxuLy8gUGl4ZWwgdXNlZCBieSB0aGUgaG92ZXIgYW5pbWF0aW9uIGNhbnZhcy5cclxuY2xhc3MgUGl4ZWwge1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxuICBjb2xvcjogc3RyaW5nO1xyXG4gIHNwZWVkOiBudW1iZXI7XHJcbiAgc2l6ZTogbnVtYmVyO1xyXG4gIHNpemVTdGVwOiBudW1iZXI7XHJcbiAgbWluU2l6ZTogbnVtYmVyO1xyXG4gIG1heFNpemVJbnRlZ2VyOiBudW1iZXI7XHJcbiAgbWF4U2l6ZTogbnVtYmVyO1xyXG4gIHBoYXNlOiBudW1iZXI7XHJcbiAgcGhhc2VTdGVwOiBudW1iZXI7XHJcbiAgZGVsYXk6IG51bWJlcjtcclxuICBjb3VudGVyOiBudW1iZXI7XHJcbiAgY291bnRlclN0ZXA6IG51bWJlcjtcclxuICBpc0lkbGU6IGJvb2xlYW47XHJcbiAgaXNSZXZlcnNlOiBib29sZWFuO1xyXG4gIGlzU2hpbW1lcjogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB4OiBudW1iZXIsIHk6IG51bWJlciwgY29sb3I6IHN0cmluZywgc3BlZWQ6IG51bWJlciwgZGVsYXk6IG51bWJlcikge1xyXG4gICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIHRoaXMuY3R4ID0gY29udGV4dDtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUoMC4xLCAwLjkpICogc3BlZWQ7XHJcbiAgICB0aGlzLnNpemUgPSAwO1xyXG4gICAgdGhpcy5zaXplU3RlcCA9IE1hdGgucmFuZG9tKCkgKiAwLjMgKyAwLjE7XHJcbiAgICB0aGlzLm1pblNpemUgPSAwLjU7XHJcbiAgICB0aGlzLm1heFNpemVJbnRlZ2VyID0gMjtcclxuICAgIHRoaXMubWF4U2l6ZSA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUodGhpcy5taW5TaXplLCB0aGlzLm1heFNpemVJbnRlZ2VyKTtcclxuICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcclxuICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICB0aGlzLmNvdW50ZXJTdGVwID0gTWF0aC5yYW5kb20oKSAqIDUgKyAodGhpcy53aWR0aCArIHRoaXMuaGVpZ2h0KSAqIDAuMDE1O1xyXG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNSZXZlcnNlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzU2hpbW1lciA9IGZhbHNlO1xyXG4gICAgdGhpcy5waGFzZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcclxuICAgIHRoaXMucGhhc2VTdGVwID0gTWF0aC5tYXgoMCwgdGhpcy5zcGVlZCAqICgwLjggKyBNYXRoLnJhbmRvbSgpICogMC42KSk7XHJcbiAgfVxyXG5cclxuICAvLyBSZXR1cm4gYSByYW5kb20gZmxvYXQgYmV0d2VlbiBtaW4gYW5kIG1heC5cclxuICBnZXRSYW5kb21WYWx1ZShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XHJcbiAgfVxyXG5cclxuICAvLyBEcmF3IHRoZSBwaXhlbCBhdCBpdHMgY3VycmVudCBzaXplLlxyXG4gIGRyYXcoKSB7XHJcbiAgICBjb25zdCBjZW50ZXJPZmZzZXQgPSB0aGlzLm1heFNpemVJbnRlZ2VyICogMC41IC0gdGhpcy5zaXplICogMC41O1xyXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCArIGNlbnRlck9mZnNldCwgdGhpcy55ICsgY2VudGVyT2Zmc2V0LCB0aGlzLnNpemUsIHRoaXMuc2l6ZSk7XHJcbiAgfVxyXG5cclxuICAvLyBBbmltYXRlIHRoZSBwaXhlbCBhcHBlYXJpbmcuXHJcbiAgYXBwZWFyKCkge1xyXG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLmNvdW50ZXIgPD0gdGhpcy5kZWxheSkge1xyXG4gICAgICB0aGlzLmNvdW50ZXIgKz0gdGhpcy5jb3VudGVyU3RlcDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2l6ZSA+PSB0aGlzLm1heFNpemUpIHtcclxuICAgICAgdGhpcy5pc1NoaW1tZXIgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNTaGltbWVyKSB7XHJcbiAgICAgIHRoaXMuc2hpbW1lcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaXplICs9IHRoaXMuc2l6ZVN0ZXA7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG4gIC8vIEFuaW1hdGUgdGhlIHBpeGVsIGRpc2FwcGVhcmluZy5cclxuICBkaXNhcHBlYXIoKSB7XHJcbiAgICB0aGlzLmlzU2hpbW1lciA9IGZhbHNlO1xyXG4gICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgIGlmICh0aGlzLnNpemUgPD0gMCkge1xyXG4gICAgICB0aGlzLmlzSWRsZSA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2l6ZSAtPSAwLjE7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG4gIC8vIE9zY2lsbGF0ZSBwaXhlbCBzaXplIHdoaWxlIHZpc2libGUuXHJcbiAgc2hpbW1lcigpIHtcclxuICAgIGlmICghdGhpcy5waGFzZVN0ZXApIHJldHVybjtcclxuICAgIHRoaXMucGhhc2UgKz0gdGhpcy5waGFzZVN0ZXA7XHJcbiAgICBjb25zdCBhbXAgPSAodGhpcy5tYXhTaXplIC0gdGhpcy5taW5TaXplKSAqIDAuNTtcclxuICAgIHRoaXMuc2l6ZSA9IHRoaXMubWluU2l6ZSArIGFtcCArIGFtcCAqIE1hdGguc2luKHRoaXMucGhhc2UpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQ3JlYXRlIHRoZSBwaXhlbCBjYW52YXMgaG92ZXIgZWZmZWN0IGZvciBhIHRpbWVsaW5lIGNhcmQuXHJcbmNvbnN0IGNyZWF0ZVBpeGVsRWZmZWN0ID0gKGNhcmRFbDogSFRNTEVsZW1lbnQpID0+IHtcclxuICBpZiAoIWNhcmRFbCkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICBjYW52YXMuY2xhc3NOYW1lID0gXCJ0aW1lbGluZS1waXhlbC1jYW52YXNcIjtcclxuICBjYXJkRWwuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuXHJcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBpZiAoIWN0eCkge1xyXG4gICAgY2FudmFzLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWR1Y2VkTW90aW9uID0gd2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKS5tYXRjaGVzO1xyXG4gIGNvbnN0IHN0YXRlOiBQaXhlbFN0YXRlID0ge1xyXG4gICAgY2FudmFzLFxyXG4gICAgY3R4LFxyXG4gICAgcGl4ZWxzOiBbXSxcclxuICAgIGFuaW1JZDogbnVsbCxcclxuICAgIGxhc3RUaW1lOiBwZXJmb3JtYW5jZS5ub3coKSxcclxuICAgIHJlZHVjZWRNb3Rpb24sXHJcbiAgICB3aWR0aDogMCxcclxuICAgIGhlaWdodDogMCxcclxuICB9O1xyXG5cclxuICBjb25zdCBpbml0UGl4ZWxzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmVjdCA9IGNhcmRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihyZWN0LndpZHRoKSk7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHJlY3QuaGVpZ2h0KSk7XHJcbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHJldHVybjtcclxuXHJcbiAgICBzdGF0ZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgc3RhdGUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xyXG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XHJcblxyXG4gICAgY29uc3QgZ2FwID0gTWF0aC5tYXgoMywgTWF0aC5mbG9vcihQSVhFTF9HQVApKTtcclxuICAgIGNvbnN0IHNwZWVkID0gZ2V0RWZmZWN0aXZlU3BlZWQoUElYRUxfU1BFRUQsIHJlZHVjZWRNb3Rpb24pO1xyXG4gICAgY29uc3QgcGl4ZWxzOiBQaXhlbFtdID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCArPSBnYXApIHtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkgKz0gZ2FwKSB7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBQSVhFTF9DT0xPUlNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogUElYRUxfQ09MT1JTLmxlbmd0aCldO1xyXG4gICAgICAgIGNvbnN0IGR4ID0geCAtIHdpZHRoIC8gMjtcclxuICAgICAgICBjb25zdCBkeSA9IHkgLSBoZWlnaHQgLyAyO1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICAgICAgICBjb25zdCBkZWxheSA9IHJlZHVjZWRNb3Rpb24gPyAwIDogZGlzdGFuY2UgKiAwLjM1O1xyXG4gICAgICAgIHBpeGVscy5wdXNoKG5ldyBQaXhlbChjYW52YXMsIGN0eCwgeCwgeSwgY29sb3IsIHNwZWVkLCBkZWxheSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGUucGl4ZWxzID0gcGl4ZWxzO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRvQW5pbWF0ZSA9IChmbk5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XHJcbiAgICBzdGF0ZS5hbmltSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gZG9BbmltYXRlKGZuTmFtZSkpO1xyXG4gICAgY29uc3QgdGltZU5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgY29uc3QgdGltZVBhc3NlZCA9IHRpbWVOb3cgLSBzdGF0ZS5sYXN0VGltZTtcclxuICAgIGNvbnN0IHRpbWVJbnRlcnZhbCA9IDEwMDAgLyA2MDtcclxuXHJcbiAgICBpZiAodGltZVBhc3NlZCA8IHRpbWVJbnRlcnZhbCkgcmV0dXJuO1xyXG4gICAgc3RhdGUubGFzdFRpbWUgPSB0aW1lTm93IC0gKHRpbWVQYXNzZWQgJSB0aW1lSW50ZXJ2YWwpO1xyXG5cclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc3RhdGUud2lkdGgsIHN0YXRlLmhlaWdodCk7XHJcblxyXG4gICAgbGV0IGFsbElkbGUgPSB0cnVlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS5waXhlbHMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgcGl4ZWwgPSBzdGF0ZS5waXhlbHNbaV07XHJcbiAgICAgIHBpeGVsW2ZuTmFtZV0oKTtcclxuICAgICAgaWYgKCFwaXhlbC5pc0lkbGUpIGFsbElkbGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChhbGxJZGxlICYmIHN0YXRlLmFuaW1JZCkge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xyXG4gICAgICBzdGF0ZS5hbmltSWQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFuaW1hdGlvbiA9IChuYW1lOiBcImFwcGVhclwiIHwgXCJkaXNhcHBlYXJcIikgPT4ge1xyXG4gICAgaWYgKCFzdGF0ZS5waXhlbHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICBpZiAoc3RhdGUuYW5pbUlkKSBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xyXG4gICAgc3RhdGUubGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgIHN0YXRlLmFuaW1JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBkb0FuaW1hdGUobmFtZSkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uRW50ZXIgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJhcHBlYXJcIik7XHJcbiAgY29uc3Qgb25MZWF2ZSA9ICgpID0+IGhhbmRsZUFuaW1hdGlvbihcImRpc2FwcGVhclwiKTtcclxuXHJcbiAgY2FyZEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xyXG4gIGNhcmRFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbkxlYXZlKTtcclxuXHJcbiAgbGV0IHJvOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xyXG4gIGlmICh0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJvID0gbmV3IFJlc2l6ZU9ic2VydmVyKGluaXRQaXhlbHMpO1xyXG4gICAgcm8ub2JzZXJ2ZShjYXJkRWwpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFBpeGVscygpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2FyZEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xyXG4gICAgY2FyZEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTGVhdmUpO1xyXG4gICAgaWYgKHN0YXRlLmFuaW1JZCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhdGUuYW5pbUlkKTtcclxuICAgIGlmIChybykgcm8uZGlzY29ubmVjdCgpO1xyXG4gICAgY2FudmFzLnJlbW92ZSgpO1xyXG4gIH07XHJcbn07XHJcblxyXG4vLyBTaG9ydGVuIG92ZXJmbG93aW5nIHRleHQgd2l0aCBhIGNvbXB1dGVkIGVsbGlwc2lzLlxyXG5jb25zdCBhcHBseUVsbGlwc2lzID0gKGVsOiBIVE1MRWxlbWVudCwgZnVsbFRleHQ6IHN0cmluZywgbXVsdGlMaW5lOiBib29sZWFuKSA9PiB7XHJcbiAgaWYgKCFlbCB8fCAhZnVsbFRleHQpIHJldHVybiBmYWxzZTtcclxuICBpZiAobXVsdGlMaW5lICYmIGVsLmNsaWVudEhlaWdodCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmICghbXVsdGlMaW5lICYmIGVsLmNsaWVudFdpZHRoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChtdWx0aUxpbmUpIHtcclxuICAgIGNvbnN0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG4gICAgbGV0IGxpbmVIZWlnaHQgPSBOdW1iZXIucGFyc2VGbG9hdChjb21wdXRlZC5saW5lSGVpZ2h0KTtcclxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKGxpbmVIZWlnaHQpKSB7XHJcbiAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgbGluZUhlaWdodCA9IHJlY3QuaGVpZ2h0ID4gMCA/IHJlY3QuaGVpZ2h0IC8gMiA6IDA7XHJcbiAgICB9XHJcbiAgICBpZiAobGluZUhlaWdodCA+IDApIHtcclxuICAgICAgZWwuc3R5bGUubWF4SGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChsaW5lSGVpZ2h0ICogMil9cHhgO1xyXG4gICAgICBlbC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbC50ZXh0Q29udGVudCA9IGZ1bGxUZXh0O1xyXG5cclxuICBjb25zdCBpc092ZXJmbG93aW5nID0gKCkgPT4gKFxyXG4gICAgbXVsdGlMaW5lXHJcbiAgICAgID8gZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICsgMVxyXG4gICAgICA6IGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggKyAxXHJcbiAgKTtcclxuXHJcbiAgaWYgKCFpc092ZXJmbG93aW5nKCkpIHtcclxuICAgIGVsLmRhdGFzZXQucHJldmlldyA9IFwiMFwiO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbGV0IGxvdyA9IDA7XHJcbiAgbGV0IGhpZ2ggPSBmdWxsVGV4dC5sZW5ndGg7XHJcbiAgbGV0IGJlc3QgPSAwO1xyXG5cclxuICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcclxuICAgIGNvbnN0IG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XHJcbiAgICBjb25zdCBjYW5kaWRhdGUgPSBgJHtmdWxsVGV4dC5zbGljZSgwLCBNYXRoLm1heCgwLCBtaWQpKS50cmltRW5kKCl9JHtFTExJUFNJU31gO1xyXG4gICAgZWwudGV4dENvbnRlbnQgPSBjYW5kaWRhdGU7XHJcbiAgICBpZiAoaXNPdmVyZmxvd2luZygpKSB7XHJcbiAgICAgIGhpZ2ggPSBtaWQgLSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmVzdCA9IG1pZDtcclxuICAgICAgbG93ID0gbWlkICsgMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVsLnRleHRDb250ZW50ID0gYCR7ZnVsbFRleHQuc2xpY2UoMCwgTWF0aC5tYXgoMCwgYmVzdCkpLnRyaW1FbmQoKX0ke0VMTElQU0lTfWA7XHJcbiAgZWwuZGF0YXNldC5wcmV2aWV3ID0gXCIxXCI7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vLyBVc2UgcG9pbnRlciBtb3ZlbWVudCB0byBhdm9pZCBhY2NpZGVudGFsIHRhcHMgb24gc2Nyb2xsLlxyXG5jb25zdCBiaW5kVGFwR3VhcmQgPSAoZWw6IEhUTUxFbGVtZW50LCBvblRhcDogKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHZvaWQpID0+IHtcclxuICBpZiAoIWVsKSByZXR1cm4gKCkgPT4gdW5kZWZpbmVkO1xyXG4gIGxldCBhY3RpdmUgPSBmYWxzZTtcclxuICBsZXQgcG9pbnRlcklkOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuICBsZXQgc3RhcnRYID0gMDtcclxuICBsZXQgc3RhcnRZID0gMDtcclxuICBsZXQgc3RhcnRUaW1lID0gMDtcclxuICBsZXQgbW92ZWQgPSBmYWxzZTtcclxuXHJcbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XHJcbiAgICBhY3RpdmUgPSBmYWxzZTtcclxuICAgIHBvaW50ZXJJZCA9IG51bGw7XHJcbiAgICBtb3ZlZCA9IGZhbHNlO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uUG9pbnRlckRvd24gPSAoZTogUG9pbnRlckV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZS5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGUuYnV0dG9uICE9PSAwKSByZXR1cm47XHJcbiAgICBhY3RpdmUgPSB0cnVlO1xyXG4gICAgcG9pbnRlcklkID0gZS5wb2ludGVySWQ7XHJcbiAgICBzdGFydFggPSBlLmNsaWVudFg7XHJcbiAgICBzdGFydFkgPSBlLmNsaWVudFk7XHJcbiAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgbW92ZWQgPSBmYWxzZTtcclxuICB9O1xyXG5cclxuICBjb25zdCBvblBvaW50ZXJNb3ZlID0gKGU6IFBvaW50ZXJFdmVudCkgPT4ge1xyXG4gICAgaWYgKCFhY3RpdmUgfHwgZS5wb2ludGVySWQgIT09IHBvaW50ZXJJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgZHggPSBNYXRoLmFicyhlLmNsaWVudFggLSBzdGFydFgpO1xyXG4gICAgY29uc3QgZHkgPSBNYXRoLmFicyhlLmNsaWVudFkgLSBzdGFydFkpO1xyXG4gICAgaWYgKGR4ID4gVEFQX01PVkVfUFggfHwgZHkgPiBUQVBfTU9WRV9QWCkgbW92ZWQgPSB0cnVlO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uUG9pbnRlclVwID0gKGU6IFBvaW50ZXJFdmVudCkgPT4ge1xyXG4gICAgaWYgKCFhY3RpdmUgfHwgZS5wb2ludGVySWQgIT09IHBvaW50ZXJJZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgaGVsZE1zID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcclxuICAgIGNvbnN0IHNob3VsZFRhcCA9ICFtb3ZlZCAmJiBoZWxkTXMgPCBIT0xEX1RPX1BSRVZJRVdfTVM7XHJcbiAgICByZXNldCgpO1xyXG4gICAgaWYgKHNob3VsZFRhcCkgb25UYXAoZSk7XHJcbiAgfTtcclxuXHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uUG9pbnRlckRvd24sIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICBlbC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcm1vdmVcIiwgb25Qb2ludGVyTW92ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgb25Qb2ludGVyVXAsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICBlbC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmNhbmNlbFwiLCByZXNldCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVybGVhdmVcIiwgcmVzZXQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBvblBvaW50ZXJEb3duKTtcclxuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVybW92ZVwiLCBvblBvaW50ZXJNb3ZlKTtcclxuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVydXBcIiwgb25Qb2ludGVyVXApO1xyXG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJjYW5jZWxcIiwgcmVzZXQpO1xyXG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJsZWF2ZVwiLCByZXNldCk7XHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFByZXZlbnQgbG9uZy1wcmVzcyBzZWxlY3Rpb24gYW5kIGNvcHkgb24gY2FyZHMuXHJcbmNvbnN0IGJsb2NrQ29weUFjdGlvbnMgPSAoZWw6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgaWYgKCFlbCkgcmV0dXJuICgpID0+IHVuZGVmaW5lZDtcclxuICBjb25zdCBjYW5jZWwgPSAoZXZlbnQ6IEV2ZW50KSA9PiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjb250ZXh0bWVudVwiLCBjYW5jZWwpO1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJzZWxlY3RzdGFydFwiLCBjYW5jZWwpO1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGNhbmNlbCk7XHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImN1dFwiLCBjYW5jZWwpO1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJwYXN0ZVwiLCBjYW5jZWwpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGNhbmNlbCk7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwic2VsZWN0c3RhcnRcIiwgY2FuY2VsKTtcclxuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjb3B5XCIsIGNhbmNlbCk7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY3V0XCIsIGNhbmNlbCk7XHJcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwicGFzdGVcIiwgY2FuY2VsKTtcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgSGlzdG9yeVRhYmxlID0gKHsgaXRlbXMsIG5vRGF0YVRleHQsIGVycm9yTWVzc2FnZSwgb25OYXZpZ2F0ZSB9OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHRvb2x0aXBSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB0b29sdGlwQW5jaG9yUmVmID0gdXNlUmVmPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgdG9vbHRpcENsb3NlQm91bmRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICAvLyBFbnN1cmUgdGhlIHNoYXJlZCB0b29sdGlwIGVsZW1lbnQgZXhpc3RzIG9uY2UuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0b29sdGlwUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIGxldCB0b29sdGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lbGluZVRvb2x0aXBcIikgYXMgSFRNTERpdkVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCF0b29sdGlwKSB7XHJcbiAgICAgIHRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB0b29sdGlwLmlkID0gXCJ0aW1lbGluZVRvb2x0aXBcIjtcclxuICAgICAgdG9vbHRpcC5jbGFzc05hbWUgPSBcInRpbWVsaW5lLXRvb2x0aXBcIjtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwKTtcclxuICAgIH1cclxuICAgIHRvb2x0aXBSZWYuY3VycmVudCA9IHRvb2x0aXA7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyUmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCB0b29sdGlwRWwgPSB0b29sdGlwUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWNvbnRhaW5lciB8fCAhdG9vbHRpcEVsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY2xlYW51cHM6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XHJcblxyXG4gICAgLy8gQ2xvc2UgdG9vbHRpcCBvbiBvdXRzaWRlIGludGVyYWN0aW9uLlxyXG4gICAgaWYgKCF0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHRvb2x0aXBDbG9zZUJvdW5kUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICBjb25zdCBvblBvaW50ZXJEb3duID0gKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoIXRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgYW5jaG9yID0gdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50O1xyXG4gICAgICAgIGlmIChhbmNob3IgJiYgYW5jaG9yLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSkgcmV0dXJuO1xyXG4gICAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBvbktleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uUG9pbnRlckRvd24sIHRydWUpO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gICAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93biwgdHJ1ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcclxuICAgICAgICB0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNob3cgdG9vbHRpcCBjb250ZW50IGNlbnRlcmVkIG9uIHNjcmVlbi5cclxuICAgIGNvbnN0IHNob3dUb29sdGlwID0gKHRleHQ6IHN0cmluZywgYW5jaG9yPzogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgdG9vbHRpcEVsLnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBhbmNob3IgfHwgbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IGNlbnRlclggPSBNYXRoLnJvdW5kKHdpbmRvdy5pbm5lcldpZHRoIC8gMik7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5sZWZ0ID0gYCR7Y2VudGVyWH1weGA7XHJcblxyXG4gICAgICBjb25zdCBtYXJnaW4gPSAxMjtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLm1heEhlaWdodCA9IGAke01hdGgucm91bmQod2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPKX1weGA7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5vdmVyZmxvd1kgPSBcImF1dG9cIjtcclxuXHJcbiAgICAgIGxldCBmb250U2l6ZSA9IFRPT0xUSVBfQkFTRV9GT05UO1xyXG4gICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XHJcblxyXG4gICAgICBsZXQgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPO1xyXG4gICAgICB3aGlsZSAocmVjdC5oZWlnaHQgPiBtYXhIZWlnaHQgJiYgZm9udFNpemUgPiBUT09MVElQX01JTl9GT05UKSB7XHJcbiAgICAgICAgZm9udFNpemUgLT0gMTtcclxuICAgICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XHJcbiAgICAgICAgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY2VudGVyWSA9IE1hdGgucm91bmQoKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0KSAvIDIpO1xyXG4gICAgICBsZXQgdG9wID0gTnVtYmVyLmlzRmluaXRlKGNlbnRlclkpID8gY2VudGVyWSA6IG1hcmdpbjtcclxuICAgICAgY29uc3QgbWluVG9wID0gbWFyZ2luO1xyXG4gICAgICBjb25zdCBtYXhUb3AgPSBNYXRoLm1heChtYXJnaW4sIHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0IC0gbWFyZ2luKTtcclxuICAgICAgaWYgKHRvcCA8IG1pblRvcCkgdG9wID0gbWluVG9wO1xyXG4gICAgICBpZiAodG9wID4gbWF4VG9wKSB0b3AgPSBtYXhUb3A7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBIaWRlIHRvb2x0aXAgY29udGVudC5cclxuICAgIGNvbnN0IGhpZGVUb29sdGlwID0gKCkgPT4ge1xyXG4gICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERlY2lkZSBpZiBhIHRvb2x0aXAgc2hvdWxkIGRpc3BsYXkuXHJcbiAgICBjb25zdCBzaG91bGRQcmV2aWV3ID0gKGVsOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICBpZiAoIWVsLmRhdGFzZXQgfHwgIWVsLmRhdGFzZXQuZnVsbHRleHQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGVsLmRhdGFzZXQucHJldmlldyA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xyXG4gICAgICByZXR1cm4gZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCArIDEgfHwgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICsgMTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gQmluZCB0b29sdGlwIGludGVyYWN0aW9ucyBmb3IgYSB0ZXh0IG5vZGUuXHJcbiAgICBjb25zdCBiaW5kVG9vbHRpcCA9IChlbDogSFRNTEVsZW1lbnQsIHRleHQ6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAoIXRleHQpIHJldHVybiAoKSA9PiB1bmRlZmluZWQ7XHJcbiAgICAgIGxldCBwcmVzc1RpbWVyOiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gICAgICBjb25zdCBvbk1vdXNlRW50ZXIgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoIXNob3VsZFByZXZpZXcoZWwpKSByZXR1cm47XHJcbiAgICAgICAgc2hvd1Rvb2x0aXAodGV4dCwgZWwpO1xyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBvbk1vdXNlTGVhdmUgPSAoKSA9PiBoaWRlVG9vbHRpcCgpO1xyXG4gICAgICBjb25zdCBvbk1vdXNlTW92ZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoIXNob3VsZFByZXZpZXcoZWwpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSB7XHJcbiAgICAgICAgICBzaG93VG9vbHRpcCh0ZXh0LCBlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBvblRvdWNoU3RhcnQgPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoIXNob3VsZFByZXZpZXcoZWwpKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgIHByZXNzVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBzaG93VG9vbHRpcCh0ZXh0LCBlbCksIFRPT0xUSVBfVE9VQ0hfREVMQVlfTVMpO1xyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBvblRvdWNoTW92ZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAocHJlc3NUaW1lcikgd2luZG93LmNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcclxuICAgICAgICBoaWRlVG9vbHRpcCgpO1xyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBvblRvdWNoRW5kID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChwcmVzc1RpbWVyKSB3aW5kb3cuY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25Nb3VzZUVudGVyKTtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTW91c2VMZWF2ZSk7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uVG91Y2hTdGFydCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIG9uVG91Y2hFbmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uTW91c2VFbnRlcik7XHJcbiAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25Nb3VzZUxlYXZlKTtcclxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvblRvdWNoU3RhcnQpO1xyXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgb25Ub3VjaE1vdmUpO1xyXG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBvblRvdWNoRW5kKTtcclxuICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGVycm9yTWVzc2FnZSkge1xyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNsZWFudXBzLmZvckVhY2goKGNsZWFudXApID0+IGNsZWFudXAoKSk7XHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2FyZHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZFwiKTtcclxuICAgIGNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcclxuICAgICAgaWYgKCFjYXJkLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWVsaW5lLWNhcmQtLW5vZGF0YVwiKSkge1xyXG4gICAgICAgIGNvbnN0IGNsZWFudXBQaXhlbCA9IGNyZWF0ZVBpeGVsRWZmZWN0KGNhcmQpO1xyXG4gICAgICAgIGlmIChjbGVhbnVwUGl4ZWwpIGNsZWFudXBzLnB1c2goY2xlYW51cFBpeGVsKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIpKSB7XHJcbiAgICAgICAgY29uc3QgbGlua0lkID0gY2FyZC5kYXRhc2V0LmxpbmtJZCB8fCBcIlwiO1xyXG4gICAgICAgIGlmIChsaW5rSWQpIHtcclxuICAgICAgICAgIGNsZWFudXBzLnB1c2goYmluZFRhcEd1YXJkKGNhcmQsICgpID0+IG9uTmF2aWdhdGUobGlua0lkKSkpO1xyXG4gICAgICAgICAgY2xlYW51cHMucHVzaChibG9ja0NvcHlBY3Rpb25zKGNhcmQpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGZyYW1lSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgY29uc3QgbmFtZUVscyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1uYW1lXCIpO1xyXG4gICAgICBuYW1lRWxzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQuZnVsbHRleHQgfHwgZWwudGV4dENvbnRlbnQgfHwgXCJcIjtcclxuICAgICAgICBhcHBseUVsbGlwc2lzKGVsLCB0ZXh0LCB0cnVlKTtcclxuICAgICAgICBjbGVhbnVwcy5wdXNoKGJpbmRUb29sdGlwKGVsLCB0ZXh0KSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgZGVzY0VscyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1kZXNjLXRleHRcIik7XHJcbiAgICAgIGRlc2NFbHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICBjb25zdCB0ZXh0ID0gZWwuZGF0YXNldC5mdWxsdGV4dCB8fCBlbC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgICAgIGFwcGx5RWxsaXBzaXMoZWwsIHRleHQsIHRydWUpO1xyXG4gICAgICAgIGNsZWFudXBzLnB1c2goYmluZFRvb2x0aXAoZWwsIHRleHQpKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZUlkKSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYW51cHMuZm9yRWFjaCgoY2xlYW51cCkgPT4gY2xlYW51cCgpKTtcclxuICAgIH07XHJcbiAgfSwgW2Vycm9yTWVzc2FnZSwgaXRlbXMsIG9uTmF2aWdhdGVdKTtcclxuXHJcbiAgY29uc3QgaGFzSXRlbXMgPSBpdGVtcy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHNob3dFbXB0eSA9ICFlcnJvck1lc3NhZ2UgJiYgIWhhc0l0ZW1zO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gZXJyb3JNZXNzYWdlID8gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+XHJcbiAgKSA6IGhhc0l0ZW1zID8gKFxyXG4gICAgaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBpdGVtLmlkIHx8IGl0ZW0ucmVjSWQ/LnRvU3RyaW5nKCkgfHwgYHRpbWVsaW5lLSR7aW5kZXh9YDtcclxuICAgICAgY29uc3QgaXNDbGlja2FibGUgPSAhaXRlbS5pc05vRGF0YSAmJiAhIWl0ZW0uaWQ7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2tleX0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgXCJ0aW1lbGluZS1jYXJkXCIsXHJcbiAgICAgICAgICAgICAgaXRlbS5pc05vRGF0YSA/IFwidGltZWxpbmUtY2FyZC0tbm9kYXRhXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgIGlzQ2xpY2thYmxlID8gXCJ0aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIiA6IFwiXCJcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgZGF0YS1hY3RpdmlkYWRpZD17aXRlbS5hY3RpdmlkYWRJZCB8fCBcIlwifVxyXG4gICAgICAgICAgICBkYXRhLXJlY2lkPXtpdGVtLnJlY0lkICE9IG51bGwgPyBTdHJpbmcoaXRlbS5yZWNJZCkgOiBcIlwifVxyXG4gICAgICAgICAgICBkYXRhLWxpbmstaWQ9e2lzQ2xpY2thYmxlID8gaXRlbS5pZCA6IFwiXCJ9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtZGF0ZS1wYW5lbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBweC0zIHB5LTMgYmctc2xhdGUtNTAgYm9yZGVyLXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5kYXRlUGFydHMueWVhcn08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmRhdGVQYXJ0cy5tb250aH08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntpdGVtLmRhdGVQYXJ0cy5kYXl9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZVwiIGRhdGEtZnVsbHRleHQ9e2l0ZW0uZnVsbE5hbWUgfHwgaXRlbS5uYW1lfT57aXRlbS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRpbWVsaW5lLWRlc2MtdGV4dFwiIGRhdGEtZnVsbHRleHQ9e2l0ZW0uZnVsbERlc2MgfHwgaXRlbS5kZXNjcmlwdGlvbn0+e2l0ZW0uZGVzY3JpcHRpb24gfHwgbm9EYXRhVGV4dH08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9KVxyXG4gICkgOiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxyXG4gICAgICBpZD1cInRpbWVsaW5lQ29udGFpbmVyXCJcclxuICAgICAgcmVmPXtjb250YWluZXJSZWZ9XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRpbWVsaW5lLWJveFwiLCBzaG93RW1wdHkgPyBcInRpbWVsaW5lLWVtcHR5XCIgOiBcIlwiKX1cclxuICAgICAgZGF0YS1lbXB0eS10ZXh0PXtub0RhdGFUZXh0fVxyXG4gICAgPlxyXG4gICAgICB7Y29udGVudH1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5VGFibGU7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcyA9IHtcbiAgcm91dGU6IHN0cmluZztcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIHNpemU/OiBudW1iZXI7XG4gIHJpZ2h0PzogbnVtYmVyO1xuICBib3R0b20/OiBudW1iZXI7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBzaGFkb3dPcGFjaXR5PzogbnVtYmVyO1xuICBwbHVzVGhpY2tuZXNzPzogbnVtYmVyO1xuICBwbHVzTGVuZ3RoPzogbnVtYmVyO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IGNsYW1wID0gKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT4gTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHZhbHVlKSk7XG5cbi8vIEZsb2F0aW5nIGFjdGlvbiBidXR0b24gdGhhdCByZW5kZXJzIGEgY3Jpc3AgU1ZHIG9udG8gYSBjYW52YXMuXG5jb25zdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiA9ICh7XG4gIHJvdXRlLFxuICBhcmlhTGFiZWwsXG4gIHNpemUgPSA3NixcbiAgcmlnaHQgPSAyNCxcbiAgYm90dG9tID0gMjQsXG4gIGNvbG9yID0gXCIjMDAyOTZiXCIsXG4gIHNoYWRvd09wYWNpdHkgPSAwLjE2LFxuICBwbHVzVGhpY2tuZXNzID0gNCxcbiAgcGx1c0xlbmd0aCA9IDI4LFxuICBvbkNsaWNrLFxufTogRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcykgPT4ge1xuICBjb25zdCBidG5SZWYgPSB1c2VSZWY8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY2FudmFzUmVmID0gdXNlUmVmPEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgYnVpbGRGYWJTdmcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZU9wYWNpdHkgPSBjbGFtcChzaGFkb3dPcGFjaXR5LCAwLCAwLjUpO1xuICAgIGNvbnN0IHNhZmVUaGlja25lc3MgPSBjbGFtcChwbHVzVGhpY2tuZXNzLCAyLCA4KTtcbiAgICBjb25zdCBzYWZlTGVuZ3RoID0gY2xhbXAocGx1c0xlbmd0aCwgMTYsIDQwKTtcblxuICAgIGNvbnN0IGN4ID0gNDg7XG4gICAgY29uc3QgeFYgPSBjeCAtIHNhZmVUaGlja25lc3MgLyAyO1xuICAgIGNvbnN0IHlWID0gY3ggLSBzYWZlTGVuZ3RoIC8gMjtcbiAgICBjb25zdCB4SCA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XG4gICAgY29uc3QgeUggPSBjeCAtIHNhZmVUaGlja25lc3MgLyAyO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdmcgd2lkdGg9XCI5NlwiIGhlaWdodD1cIjk2XCIgdmlld0JveD1cIjAgMCA5NiA5NlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgPGZpbHRlciBpZD1cImZhYlNoYWRvd1wiIHg9XCItNDAlXCIgeT1cIi00MCVcIiB3aWR0aD1cIjE4MCVcIiBoZWlnaHQ9XCIxODAlXCI+XG4gICAgICAgICAgICA8ZmVEcm9wU2hhZG93IGR4PVwiLTRcIiBkeT1cIjEwXCIgc3RkRGV2aWF0aW9uPVwiNlwiIGZsb29kLWNvbG9yPVwiIzAwMFwiIGZsb29kLW9wYWNpdHk9XCIke3NhZmVPcGFjaXR5fVwiLz5cbiAgICAgICAgICA8L2ZpbHRlcj5cbiAgICAgICAgPC9kZWZzPlxuXG4gICAgICAgIDxnIGZpbHRlcj1cInVybCgjZmFiU2hhZG93KVwiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI0OFwiIGN5PVwiNDhcIiByPVwiMzRcIiBmaWxsPVwiJHtjb2xvcn1cIi8+XG4gICAgICAgIDwvZz5cblxuICAgICAgICA8ZyBmaWxsPVwiI2ZmZlwiPlxuICAgICAgICAgIDxyZWN0IHg9XCIke3hWfVwiIHk9XCIke3lWfVwiIHdpZHRoPVwiJHtzYWZlVGhpY2tuZXNzfVwiIGhlaWdodD1cIiR7c2FmZUxlbmd0aH1cIiByeD1cIjFcIi8+XG4gICAgICAgICAgPHJlY3QgeD1cIiR7eEh9XCIgeT1cIiR7eUh9XCIgd2lkdGg9XCIke3NhZmVMZW5ndGh9XCIgaGVpZ2h0PVwiJHtzYWZlVGhpY2tuZXNzfVwiIHJ4PVwiMVwiLz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgYC50cmltKCk7XG4gIH0sIFtjb2xvciwgc2hhZG93T3BhY2l0eSwgcGx1c0xlbmd0aCwgcGx1c1RoaWNrbmVzc10pO1xuXG4gIGNvbnN0IHJlbmRlclN2Z1RvQ2FudmFzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2l6ZVB4ID0gTWF0aC5tYXgoNDAsIHNpemUpO1xuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICBjYW52YXMud2lkdGggPSBNYXRoLnJvdW5kKHNpemVQeCAqIGRwcik7XG4gICAgY2FudmFzLmhlaWdodCA9IE1hdGgucm91bmQoc2l6ZVB4ICogZHByKTtcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBgJHtzaXplUHh9cHhgO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtzaXplUHh9cHhgO1xuICAgIGN0eC5zZXRUcmFuc2Zvcm0oZHByLCAwLCAwLCBkcHIsIDAsIDApO1xuXG4gICAgY29uc3Qgc3ZnID0gYnVpbGRGYWJTdmcoKTtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3N2Z10sIHsgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5kZWNvZGluZyA9IFwiYXN5bmNcIjtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzaXplUHgsIHNpemVQeCk7XG4gICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgc2l6ZVB4LCBzaXplUHgpO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgIH07XG4gICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gdXJsO1xuICB9LCBbYnVpbGRGYWJTdmcsIHNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlbmRlclN2Z1RvQ2FudmFzKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVuZGVyU3ZnVG9DYW52YXMpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZW5kZXJTdmdUb0NhbnZhcyk7XG4gIH0sIFtyZW5kZXJTdmdUb0NhbnZhc10pO1xuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBvbkNsaWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcm91dGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcm91dGU7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uXG4gICAgICByZWY9e2J0blJlZn1cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgei0yMDAwIHJvdW5kZWQtbWQgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTE1MCBob3ZlcjotdHJhbnNsYXRlLXktMC41IGFjdGl2ZTpzY2FsZS05NSBmb2N1cy12aXNpYmxlOnJpbmctNCBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zMCBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTRcIlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgd2lkdGg6IGAke3NpemV9cHhgLFxuICAgICAgICBoZWlnaHQ6IGAke3NpemV9cHhgLFxuICAgICAgICByaWdodDogYCR7cmlnaHR9cHhgLFxuICAgICAgICBib3R0b206IGAke2JvdHRvbX1weGAsXG4gICAgICAgIFdlYmtpdFRhcEhpZ2hsaWdodENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICB9fVxuICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgPlxuICAgICAgPGNhbnZhcyByZWY9e2NhbnZhc1JlZn0gY2xhc3NOYW1lPVwiYmxvY2sgcm91bmRlZC1tZFwiIC8+XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcbiAgZmlyc3Q/OiBzdHJpbmc7XG4gIHByZXY/OiBzdHJpbmc7XG4gIG5leHQ/OiBzdHJpbmc7XG4gIGxhc3Q/OiBzdHJpbmc7XG59O1xuXG50eXBlIENvbXBhY3RQYWdpbmF0aW9uUHJvcHMgPSB7XG4gIHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcbiAgcGFnZVdpbmRvdz86IG51bWJlcjtcbiAgb25QYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xuICBsYWJlbHM/OiBQYWdpbmF0aW9uTGFiZWxzO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBERUZBVUxUX1dJTkRPVyA9IDY7XG5cbi8vIENvbXBhY3QgcGFnaW5hdGlvbiB3aXRoIDYtcGFnZSB3aW5kb3cgYW5kIGVkZ2UgY29udHJvbHMuXG5jb25zdCBDb21wYWN0UGFnaW5hdGlvbiA9IGZvcndhcmRSZWY8SFRNTERpdkVsZW1lbnQsIENvbXBhY3RQYWdpbmF0aW9uUHJvcHM+KFxuICAoeyB0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSwgcGFnZVdpbmRvdyA9IERFRkFVTFRfV0lORE9XLCBvblBhZ2VDaGFuZ2UsIGxhYmVscywgY2xhc3NOYW1lIH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IHNhZmVUb3RhbCA9IE1hdGgubWF4KDAsIHRvdGFsUGFnZXMgfHwgMCk7XG4gICAgY29uc3Qgc2FmZUN1cnJlbnQgPSBNYXRoLm1pbihNYXRoLm1heCgxLCBjdXJyZW50UGFnZSB8fCAxKSwgc2FmZVRvdGFsIHx8IDEpO1xuICAgIGNvbnN0IHdpbmRvd1NpemUgPSBNYXRoLm1heCgxLCBwYWdlV2luZG93IHx8IERFRkFVTFRfV0lORE9XKTtcblxuICAgIGNvbnN0IHNob3dQYWdpbmF0aW9uID0gc2FmZVRvdGFsID4gMTtcbiAgICBjb25zdCBzaG93RWRnZU5hdiA9IHNhZmVUb3RhbCA+IHdpbmRvd1NpemU7XG4gICAgY29uc3QgY2FuSnVtcFRvU3RhcnQgPSBzYWZlQ3VycmVudCA+IHdpbmRvd1NpemU7XG4gICAgY29uc3QgY2FuR29QcmV2ID0gc2FmZUN1cnJlbnQgPiAxO1xuICAgIGNvbnN0IGNhbkdvTmV4dCA9IHNhZmVDdXJyZW50IDwgc2FmZVRvdGFsO1xuXG4gICAgY29uc3QgcGFnZU51bWJlcnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgIGlmICghc2FmZVRvdGFsKSByZXR1cm4gW107XG4gICAgICBjb25zdCB3aW5kb3dTdGFydCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoKHNhZmVDdXJyZW50IC0gMSkgLyB3aW5kb3dTaXplKSAqIHdpbmRvd1NpemUgKyAxKTtcbiAgICAgIGNvbnN0IHdpbmRvd0VuZCA9IE1hdGgubWluKHNhZmVUb3RhbCwgd2luZG93U3RhcnQgKyB3aW5kb3dTaXplIC0gMSk7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogd2luZG93RW5kIC0gd2luZG93U3RhcnQgKyAxIH0sIChfdmFsLCBpZHgpID0+IHdpbmRvd1N0YXJ0ICsgaWR4KTtcbiAgICB9LCBbc2FmZUN1cnJlbnQsIHNhZmVUb3RhbCwgd2luZG93U2l6ZV0pO1xuXG4gICAgaWYgKCFzaG93UGFnaW5hdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cInBhZ2luYXRpb25cIlxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgIFwicGFnaW5hdGlvbiBncmlkIGdyaWQtY29scy1bMWZyX2F1dG9fMWZyXSBpdGVtcy1jZW50ZXIgZ2FwLTFcIixcbiAgICAgICAgICBjbGFzc05hbWUgfHwgXCJcIlxuICAgICAgICApfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuSnVtcFRvU3RhcnQgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHM/LmZpcnN0fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2UoMSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTguNzUgNC41LTcuNSA3LjUgNy41IDcuNW0tNi0xNUw1LjI1IDEybDcuNSA3LjVcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvUHJldiAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ucHJldn1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlKHNhZmVDdXJyZW50IC0gMSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTUuNzUgMTkuNSA4LjI1IDEybDcuNS03LjVcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgbWluLXctMCBmbGV4LW5vd3JhcFwiPlxuICAgICAgICAgIHtwYWdlTnVtYmVycy5tYXAoKHBhZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gcGFnZSA9PT0gc2FmZUN1cnJlbnQ7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAga2V5PXtgcGFnZS0ke3BhZ2V9YH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcIm1pbi13LVsyNnB4XSBweC0yIHB5LTAuNSByb3VuZGVkLW1kIGJvcmRlciB0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIHRyYW5zaXRpb25cIixcbiAgICAgICAgICAgICAgICAgIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgID8gXCJiZy1bIzAwMjk2Yl0gYm9yZGVyLVsjMDAyOTZiXSB0ZXh0LXdoaXRlIHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMzAwIHRleHQtc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1wcmltYXJ5IGhvdmVyOnRleHQtcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlKHBhZ2UpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7cGFnZX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvTmV4dCAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ubmV4dH1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlKHNhZmVDdXJyZW50ICsgMSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtOC4yNSA0LjUgNy41IDcuNS03LjUgNy41XCIgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5Hb05leHQgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHM/Lmxhc3R9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG9uUGFnZUNoYW5nZShzYWZlVG90YWwpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuNVwiIGNsYXNzTmFtZT1cInctNSBoLTUgbXgtYXV0b1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTUuMjUgNC41IDcuNSA3LjUtNy41IDcuNW02LTE1IDcuNSA3LjUtNy41IDcuNVwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4pO1xuXG5Db21wYWN0UGFnaW5hdGlvbi5kaXNwbGF5TmFtZSA9IFwiQ29tcGFjdFBhZ2luYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgQ29tcGFjdFBhZ2luYXRpb247XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGFjdGl2ZT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xuICB0eXBlPzogXCJidXR0b25cIiB8IFwic3VibWl0XCIgfCBcInJlc2V0XCI7XG59O1xuXG4vLyBEdW1iIGZpbHRlciBidXR0b24gd2l0aCBzdGFuZGFyZGl6ZWQgc3R5bGluZy5cbmNvbnN0IEZpbHRlckJ1dHRvbiA9ICh7XG4gIGxhYmVsLFxuICBhY3RpdmUgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBhcmlhTGFiZWwsXG4gIHR5cGUgPSBcImJ1dHRvblwiXG59OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9e3R5cGV9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmQtZmlsdGVyLWJ0blwiLCBhY3RpdmUgPyBcImluZC1maWx0ZXItYnRuLS1hY3RpdmVcIiA6IFwiXCIsIGNsYXNzTmFtZSl9XG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsIHx8IGxhYmVsfVxuICAgID5cbiAgICAgIHtsYWJlbH1cbiAgICA8L2J1dHRvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZpbHRlckJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIHR5cGU/OiBcImJ1dHRvblwiIHwgXCJzdWJtaXRcIiB8IFwicmVzZXRcIjtcbn07XG5cbi8vIER1bWIgYWN0aW9uIGJ1dHRvbiB3aXRoIHN0YW5kYXJkaXplZCBzdHlsaW5nLlxuY29uc3QgQWN0aW9uQnV0dG9uID0gKHtcbiAgbGFiZWwsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgYXJpYUxhYmVsLFxuICB0eXBlID0gXCJidXR0b25cIlxufTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPXt0eXBlfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5kLWFjdGlvbi1idG5cIiwgY2xhc3NOYW1lKX1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XG4gICAgPlxuICAgICAge2xhYmVsfVxuICAgIDwvYnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uQnV0dG9uO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTtBQUV6RSxvQkFBMkI7OztBQ0YzQixtQkFBeUM7QUE0a0JyQztBQWhqQkosSUFBTSxjQUFjO0FBQ3BCLElBQU0seUJBQXlCO0FBQy9CLElBQU0scUJBQXFCO0FBQzNCLElBQU0sMkJBQTJCO0FBQ2pDLElBQU0sb0JBQW9CO0FBQzFCLElBQU0sbUJBQW1CO0FBQ3pCLElBQU0sV0FBVztBQUNqQixJQUFNLFlBQVk7QUFDbEIsSUFBTSxjQUFjO0FBQ3BCLElBQU0sZUFBZSxDQUFDLDBCQUEwQiwwQkFBMEIsd0JBQXdCO0FBY2xHLElBQU0sb0JBQW9CLENBQUMsT0FBZSxrQkFBMkI7QUFDbkUsUUFBTSxNQUFNO0FBQ1osUUFBTSxNQUFNO0FBQ1osUUFBTSxXQUFXO0FBQ2pCLFFBQU0sU0FBUyxPQUFPLFNBQVMsT0FBTyxLQUFLLEdBQUcsRUFBRTtBQUVoRCxNQUFJLFVBQVUsT0FBTyxjQUFlLFFBQU87QUFDM0MsTUFBSSxVQUFVLElBQUssUUFBTyxNQUFNO0FBQ2hDLFNBQU8sU0FBUztBQUNsQjtBQUdBLElBQU0sUUFBTixNQUFZO0FBQUEsRUFzQlYsWUFBWSxRQUEyQixTQUFtQyxHQUFXLEdBQVcsT0FBZSxP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bUIsS0FBSztBQUNsRSxRQUFNLGdCQUFnQixLQUFLLGFBQWEsaUJBQWlCLEtBQUs7QUFFOUQsUUFBTSxVQUFVLDZDQUFDLGVBQVksaUJBQWtDLGVBQThCO0FBQzdGLFFBQU0sV0FBWSxLQUF1RTtBQUV6RixNQUFJLFVBQVU7QUFDWixhQUFTLE9BQU8sT0FBTztBQUN2QjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGdCQUFZLDBCQUFXLElBQUk7QUFDakMsRUFBQyxLQUF1RSxZQUFZO0FBQ3BGLFlBQVUsT0FBTyxPQUFPO0FBQzFCO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxzQkFBc0I7QUFDN0QsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsTUFBTTtBQUN6QjtBQUVBLElBQUksT0FBTyxhQUFhLGFBQWE7QUFDbkMsTUFBSSxTQUFTLGVBQWUsY0FBYyxTQUFTLGVBQWUsZUFBZTtBQUMvRSxVQUFNO0FBQUEsRUFDUixPQUFPO0FBQ0wsYUFBUyxpQkFBaUIsb0JBQW9CLEtBQUs7QUFBQSxFQUNyRDtBQUNGO0FBRUEsSUFBTyxzQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJuZXdTdGFydCJdCn0K
