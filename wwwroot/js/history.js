import {
  ClientSearchCombobox_default
} from "./chunks/chunk-OJH2LQZY.js";
import {
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY,
  canAccess,
  classNames,
  getCsrfToken,
  indT,
  showPermissionModal
} from "./chunks/chunk-BPRI7LXP.js";
import {
  require_client,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-RGGEM6AY.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx
var import_react6 = __toESM(require_react());
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
var HistoryTable = ({ items, noDataText, errorMessage, onNavigate }) => {
  const containerRef = (0, import_react.useRef)(null);
  const tooltipRef = (0, import_react.useRef)(null);
  const tooltipAnchorRef = (0, import_react.useRef)(null);
  const tooltipCloseBoundRef = (0, import_react.useRef)(false);
  const tapGuardRef = (0, import_react.useRef)({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    startTime: 0,
    moved: false,
    linkId: ""
  });
  const resolveClickableCard = (0, import_react.useCallback)((target) => {
    const node = target;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest(".timeline-card--clickable[data-link-id]");
    if (!card) return null;
    if (!containerRef.current?.contains(card)) return null;
    return card;
  }, []);
  const resetTapGuard = (0, import_react.useCallback)(() => {
    tapGuardRef.current.active = false;
    tapGuardRef.current.pointerId = null;
    tapGuardRef.current.moved = false;
    tapGuardRef.current.linkId = "";
  }, []);
  const handlePointerDown = (0, import_react.useCallback)(
    (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      const card = resolveClickableCard(event.target);
      if (!card) return;
      const linkId = card.dataset.linkId || "";
      if (!linkId) return;
      tapGuardRef.current.active = true;
      tapGuardRef.current.pointerId = event.pointerId;
      tapGuardRef.current.startX = event.clientX;
      tapGuardRef.current.startY = event.clientY;
      tapGuardRef.current.startTime = Date.now();
      tapGuardRef.current.moved = false;
      tapGuardRef.current.linkId = linkId;
    },
    [resolveClickableCard]
  );
  const handlePointerMove = (0, import_react.useCallback)((event) => {
    const state = tapGuardRef.current;
    if (!state.active || event.pointerId !== state.pointerId) return;
    const dx = Math.abs(event.clientX - state.startX);
    const dy = Math.abs(event.clientY - state.startY);
    if (dx > TAP_MOVE_PX || dy > TAP_MOVE_PX) {
      state.moved = true;
    }
  }, []);
  const handlePointerUp = (0, import_react.useCallback)(
    (event) => {
      const state = tapGuardRef.current;
      if (!state.active || event.pointerId !== state.pointerId) return;
      const linkId = state.linkId;
      const heldMs = Date.now() - state.startTime;
      const shouldTap = !state.moved && heldMs < HOLD_TO_PREVIEW_MS;
      resetTapGuard();
      if (shouldTap && linkId) {
        onNavigate(linkId);
      }
    },
    [onNavigate, resetTapGuard]
  );
  const blockClipboardAction = (0, import_react.useCallback)(
    (event) => {
      if (!resolveClickableCard(event.target)) return;
      event.preventDefault();
    },
    [resolveClickableCard]
  );
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
    const resolveTooltipTarget = (target) => {
      const node = target;
      if (!node || typeof node.closest !== "function") return null;
      const textEl = node.closest(".timeline-name, .timeline-desc-text");
      if (!textEl || !container.contains(textEl)) return null;
      return textEl;
    };
    const showTooltipForElement = (el) => {
      if (!el) return;
      const text = el.dataset.fulltext || el.textContent || "";
      if (!text || !shouldPreview(el)) return;
      showTooltip(text, el);
    };
    let activeTooltipEl = null;
    let pressTimer = null;
    const clearPressTimer = () => {
      if (pressTimer == null) return;
      window.clearTimeout(pressTimer);
      pressTimer = null;
    };
    const onMouseOver = (event) => {
      const textEl = resolveTooltipTarget(event.target);
      if (!textEl) return;
      activeTooltipEl = textEl;
      showTooltipForElement(textEl);
    };
    const onMouseOut = (event) => {
      const from = resolveTooltipTarget(event.target);
      if (!from) return;
      const to = resolveTooltipTarget(event.relatedTarget);
      if (to && to === from) return;
      hideTooltip();
      activeTooltipEl = null;
    };
    const onMouseMove = () => {
      if (!activeTooltipEl) return;
      if (!tooltipEl.classList.contains("visible")) return;
      showTooltipForElement(activeTooltipEl);
    };
    const onTouchStart = (event) => {
      const textEl = resolveTooltipTarget(event.target);
      if (!textEl) return;
      activeTooltipEl = textEl;
      clearPressTimer();
      pressTimer = window.setTimeout(() => {
        showTooltipForElement(textEl);
      }, TOOLTIP_TOUCH_DELAY_MS);
    };
    const onTouchMove = () => {
      clearPressTimer();
      hideTooltip();
      activeTooltipEl = null;
    };
    const onTouchEnd = () => {
      clearPressTimer();
    };
    container.addEventListener("mouseover", onMouseOver);
    container.addEventListener("mouseout", onMouseOut);
    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    const onSelectStart = (event) => {
      if (!resolveClickableCard(event.target)) return;
      event.preventDefault();
    };
    container.addEventListener("selectstart", onSelectStart);
    cleanups.push(() => {
      container.removeEventListener("mouseover", onMouseOver);
      container.removeEventListener("mouseout", onMouseOut);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("selectstart", onSelectStart);
      clearPressTimer();
    });
    if (!errorMessage) {
      const cards = container.querySelectorAll(".timeline-card");
      cards.forEach((card) => {
        if (!card.classList.contains("timeline-card--nodata")) {
          const cleanupPixel = createPixelEffect(card);
          if (cleanupPixel) cleanups.push(cleanupPixel);
        }
      });
      const frameId = window.requestAnimationFrame(() => {
        const textEls = container.querySelectorAll(".timeline-name, .timeline-desc-text");
        textEls.forEach((el) => {
          const text = el.dataset.fulltext || el.textContent || "";
          applyEllipsis(el, text, true);
        });
      });
      cleanups.push(() => window.cancelAnimationFrame(frameId));
    }
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [errorMessage, items, resolveClickableCard]);
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
        role: isClickable ? "button" : void 0,
        tabIndex: isClickable ? 0 : void 0,
        "aria-label": isClickable ? item.fullName || item.name || noDataText : void 0,
        onKeyDown: isClickable ? (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onNavigate(item.id);
          }
        } : void 0,
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
      onPointerDownCapture: handlePointerDown,
      onPointerMoveCapture: handlePointerMove,
      onPointerUpCapture: handlePointerUp,
      onPointerCancelCapture: resetTapGuard,
      onPointerLeave: resetTapGuard,
      onContextMenuCapture: blockClipboardAction,
      onCopyCapture: blockClipboardAction,
      onCutCapture: blockClipboardAction,
      onPasteCapture: blockClipboardAction,
      children: content
    }
  );
};
var MemoizedHistoryTable = import_react.default.memo(HistoryTable);
MemoizedHistoryTable.displayName = "HistoryTable";
var HistoryTable_default = MemoizedHistoryTable;

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

// Web/wwwroot/react/src/hooks/useHistoryActivities.ts
var import_react4 = __toESM(require_react());
var useHistoryActivities = ({
  fromDateValue,
  toDateValue,
  accountNumValue,
  pageSize,
  retryDelayMs = 600,
  normalizeRange: normalizeRange2,
  onForbidden,
  onDebug
}) => {
  const [items, setItems] = (0, import_react4.useState)([]);
  const [total, setTotal] = (0, import_react4.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react4.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react4.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react4.useState)("");
  const retryOnNetworkErrorRef = (0, import_react4.useRef)(false);
  const activeAbortRef = (0, import_react4.useRef)(null);
  const activeRequestIdRef = (0, import_react4.useRef)(0);
  const retryTimerRef = (0, import_react4.useRef)(null);
  const lastSignatureRef = (0, import_react4.useRef)("");
  const clearRetryTimer = (0, import_react4.useCallback)(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);
  const abortActiveRequest = (0, import_react4.useCallback)(() => {
    if (!activeAbortRef.current) return;
    try {
      activeAbortRef.current.abort();
    } catch {
    }
    activeAbortRef.current = null;
  }, []);
  const resetActivities = (0, import_react4.useCallback)(() => {
    clearRetryTimer();
    abortActiveRequest();
    setItems([]);
    setTotal(0);
    setErrorMessage("");
    setIsLoading(false);
  }, [abortActiveRequest, clearRetryTimer]);
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
      clearRetryTimer();
      const requestId = ++activeRequestIdRef.current;
      abortActiveRequest();
      const controller = new AbortController();
      activeAbortRef.current = controller;
      const normalized = normalizeRange2(fromDateStr, toDateStr);
      const filterSignature = `${normalized.from}|${normalized.to}|${accountNumStr}|${page}`;
      lastSignatureRef.current = filterSignature;
      setIsLoading(true);
      setItems([]);
      setTotal(0);
      setErrorMessage("");
      const payload = {
        fromDate: normalized.from,
        toDate: normalized.to,
        accountNum: accountNumStr
      };
      onDebug?.("loadActivities:request", { page, pageSize, payload });
      let response;
      try {
        const token = getCsrfToken();
        const headers = { "Content-Type": "application/json" };
        if (token) headers.RequestVerificationToken = token;
        response = await fetch(`/Historial/GetActivities?page=${page}&pageSize=${pageSize}`, {
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
            loadActivities(page, {
              fromDate: fromDateStr,
              toDate: toDateStr,
              accountNum: accountNumStr
            });
          }, retryDelayMs);
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
        onForbidden();
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
      onDebug?.("loadActivities:response", {
        status: response.status,
        total: data?.total ?? 0,
        count: Array.isArray(data?.items) ? data.items.length : 0
      });
      setIsLoading(false);
      setItems(data.items || []);
      setTotal(data.total || (data.items || []).length);
      activeAbortRef.current = null;
    },
    [
      abortActiveRequest,
      accountNumValue,
      clearRetryTimer,
      fromDateValue,
      normalizeRange2,
      onDebug,
      onForbidden,
      pageSize,
      retryDelayMs,
      toDateValue
    ]
  );
  (0, import_react4.useEffect)(() => {
    return () => {
      clearRetryTimer();
      abortActiveRequest();
    };
  }, [abortActiveRequest, clearRetryTimer]);
  return {
    items,
    total,
    currentPage,
    isLoading,
    errorMessage,
    loadActivities,
    resetActivities,
    retryOnNetworkErrorRef,
    lastSignatureRef
  };
};

// Web/wwwroot/react/src/hooks/useHistoryFilterCache.ts
var import_react5 = __toESM(require_react());
var parseCachedFilter = (raw) => {
  if (!raw) return null;
  try {
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
};
var useHistoryFilterCache = () => {
  const readCachedFilter = (0, import_react5.useCallback)(() => {
    try {
      return parseCachedFilter(sessionStorage.getItem(HISTORY_FILTER_KEY));
    } catch {
      return null;
    }
  }, []);
  const clearFilterCache = (0, import_react5.useCallback)(() => {
    try {
      sessionStorage.removeItem(HISTORY_FILTER_KEY);
    } catch {
    }
  }, []);
  const consumeReturnFlag = (0, import_react5.useCallback)(() => {
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
  const saveCachedFilter = (0, import_react5.useCallback)((filter) => {
    try {
      sessionStorage.setItem(HISTORY_FILTER_KEY, JSON.stringify(filter));
      sessionStorage.setItem(HISTORY_RETURN_FLAG_KEY, "1");
    } catch {
    }
  }, []);
  return {
    readCachedFilter,
    clearFilterCache,
    consumeReturnFlag,
    saveCachedFilter
  };
};

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
  const locale = (0, import_react6.useMemo)(() => getUiLocale(), []);
  const canViewHistory = canAccess("VISITAS_HISTORIAL", "View");
  const canCreateVisit = canAccess("VISITAS_CREACION", "Add");
  const noDataText = indT("Common_NoData", "No data");
  const activatorRef = (0, import_react6.useRef)(null);
  const popoverRef = (0, import_react6.useRef)(null);
  const paginationRef = (0, import_react6.useRef)(null);
  const [startDate, setStartDate] = (0, import_react6.useState)(null);
  const [endDate, setEndDate] = (0, import_react6.useState)(null);
  const [manualStartDate, setManualStartDate] = (0, import_react6.useState)(null);
  const [manualEndDate, setManualEndDate] = (0, import_react6.useState)(null);
  const [hoverDate, setHoverDate] = (0, import_react6.useState)(null);
  const [selectingStep, setSelectingStep] = (0, import_react6.useState)("start");
  const [currentMonth, setCurrentMonth] = (0, import_react6.useState)((/* @__PURE__ */ new Date()).getMonth());
  const [currentYear, setCurrentYear] = (0, import_react6.useState)((/* @__PURE__ */ new Date()).getFullYear());
  const [isOpen, setIsOpen] = (0, import_react6.useState)(false);
  const [showManualPickerPanel, setShowManualPickerPanel] = (0, import_react6.useState)(false);
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react6.useState)(null);
  const [selectedClient, setSelectedClient] = (0, import_react6.useState)(null);
  const [clientResetKey, setClientResetKey] = (0, import_react6.useState)(0);
  const [showFilters, setShowFilters] = (0, import_react6.useState)(true);
  const [showManualError, setShowManualError] = (0, import_react6.useState)(false);
  const [fabBottom, setFabBottom] = (0, import_react6.useState)(FAB_BASE_BOTTOM);
  const hasRestoredFilterRef = (0, import_react6.useRef)(false);
  const didInitFilterRef = (0, import_react6.useRef)(false);
  const debugLoggedRef = (0, import_react6.useRef)(0);
  const fromDateValue = (0, import_react6.useMemo)(() => startDate ? toISO(startDate) : "", [startDate]);
  const toDateValue = (0, import_react6.useMemo)(() => endDate ? toISO(endDate) : "", [endDate]);
  const accountNumValue = (0, import_react6.useMemo)(() => selectedClient ? selectedClient.value : "", [selectedClient]);
  const { readCachedFilter, clearFilterCache, consumeReturnFlag, saveCachedFilter } = useHistoryFilterCache();
  const { items, total, currentPage, isLoading, errorMessage, loadActivities, resetActivities, retryOnNetworkErrorRef, lastSignatureRef } = useHistoryActivities({
    fromDateValue,
    toDateValue,
    accountNumValue,
    pageSize: PAGE_SIZE,
    normalizeRange,
    onForbidden: showPermissionModal,
    onDebug: logHistory
  });
  (0, import_react6.useEffect)(() => {
    logHistory("init", { defaultFromDate, defaultToDate });
  }, [defaultFromDate, defaultToDate]);
  const validateManualRange = (0, import_react6.useCallback)(() => {
    if (activeQuickFilter === "custom" && (!startDate || !endDate)) {
      setShowManualError(true);
      setSelectingStep(!startDate ? "start" : "end");
      setShowManualPickerPanel(true);
      setIsOpen(true);
      setShowFilters(true);
      return false;
    }
    return true;
  }, [activeQuickFilter, endDate, startDate]);
  const applyFilters = (0, import_react6.useCallback)(
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
  const updateFabBottom = (0, import_react6.useCallback)(() => {
    if (!paginationRef.current || totalPages <= 1) {
      setFabBottom(FAB_BASE_BOTTOM);
      return;
    }
    const height = paginationRef.current.offsetHeight || 0;
    const next = Math.max(FAB_BASE_BOTTOM, height + FAB_CLEARANCE + FAB_GAP);
    setFabBottom((prev) => Math.abs(prev - next) < 1 ? prev : next);
  }, [totalPages]);
  const applyDefaultRangeFromProps = (0, import_react6.useCallback)(() => {
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
  const resetHistoryFilters = (0, import_react6.useCallback)(() => {
    setStartDate(null);
    setEndDate(null);
    setManualStartDate(null);
    setManualEndDate(null);
    setSelectingStep("start");
    setHoverDate(null);
    setCurrentMonth((/* @__PURE__ */ new Date()).getMonth());
    setCurrentYear((/* @__PURE__ */ new Date()).getFullYear());
    setActiveQuickFilter(null);
    setShowManualPickerPanel(false);
    setSelectedClient(null);
    setClientResetKey((prev) => prev + 1);
    setShowManualError(false);
    clearFilterCache();
    resetActivities();
  }, [clearFilterCache, resetActivities]);
  const applyCachedFilter = (0, import_react6.useCallback)(
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
      setShowManualPickerPanel(false);
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
    [loadActivities, readCachedFilter]
  );
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
    if (startDate && !endDate && selectingStep === "start") {
      setSelectingStep("end");
      return;
    }
    if (!startDate && selectingStep !== "start") {
      setSelectingStep("start");
    }
  }, [startDate, endDate, selectingStep]);
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
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
  (0, import_react6.useEffect)(() => {
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
  const handleSelect = (0, import_react6.useCallback)(
    (dateObj) => {
      logHistory("handleSelect", {
        clicked: toISO(dateObj),
        start: fromDateValue,
        end: toDateValue,
        selectingStep
      });
      setShowManualError(false);
      setActiveQuickFilter("custom");
      setShowManualPickerPanel(true);
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
        setShowManualPickerPanel(false);
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
        setShowManualPickerPanel(false);
      } else {
        setEndDate(null);
        setSelectingStep("end");
      }
      setCurrentMonth(newStart.getMonth());
      setCurrentYear(newStart.getFullYear());
    },
    [endDate, fromDateValue, selectingStep, startDate, toDateValue]
  );
  const handleClear = (0, import_react6.useCallback)(
    (event) => {
      event.stopPropagation();
      logHistory("clearRange");
      setActiveQuickFilter(null);
      setShowManualError(false);
      setShowManualPickerPanel(false);
      resetHistoryFilters();
      setIsOpen(false);
      setShowFilters(true);
    },
    [resetHistoryFilters]
  );
  const openPopover = (0, import_react6.useCallback)((section) => {
    logHistory("openPopover", { section, start: fromDateValue, end: toDateValue, selectingStep });
    setShowManualError(false);
    setActiveQuickFilter("custom");
    setShowManualPickerPanel(true);
    if (section === "end" && !startDate) {
      setSelectingStep("start");
    } else {
      setSelectingStep(section);
    }
    setIsOpen(true);
  }, [fromDateValue, selectingStep, startDate, toDateValue]);
  const applyQuickRange = (0, import_react6.useCallback)(
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
      setShowManualPickerPanel(false);
      setActiveQuickFilter(filterId);
      setShowManualError(false);
    },
    []
  );
  const handleQuickFilter = (0, import_react6.useCallback)(
    (filterId) => {
      const today = startOfDay(/* @__PURE__ */ new Date());
      if (filterId === "custom") {
        if (showManualPickerPanel) {
          setShowManualError(false);
          setHoverDate(null);
          setIsOpen(false);
          setShowManualPickerPanel(false);
          return;
        }
        const nextStart = manualStartDate ? new Date(manualStartDate) : null;
        const nextEnd = manualEndDate ? new Date(manualEndDate) : null;
        setActiveQuickFilter("custom");
        setShowManualPickerPanel(true);
        setStartDate(nextStart);
        setEndDate(nextEnd);
        if (nextStart) {
          setCurrentMonth(nextStart.getMonth());
          setCurrentYear(nextStart.getFullYear());
        }
        if (nextStart && nextEnd) {
          setSelectingStep("done");
          setIsOpen(false);
        } else {
          setSelectingStep(nextStart && !nextEnd ? "end" : "start");
          setIsOpen(true);
        }
        setHoverDate(null);
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
    [applyQuickRange, manualEndDate, manualStartDate, showManualPickerPanel]
  );
  const handleClientSelected = (0, import_react6.useCallback)(
    (client) => {
      setSelectedClient(client);
    },
    []
  );
  const handleNavigate = (0, import_react6.useCallback)(
    (linkId) => {
      if (!canViewHistory) {
        showPermissionModal();
        return;
      }
      setTimeout(() => {
        saveCachedFilter({
          fromDate: fromDateValue || "",
          toDate: toDateValue || "",
          page: currentPage,
          clientAccount: selectedClient?.value || "",
          clientText: selectedClient?.text || ""
        });
        const target = encodeURIComponent(linkId);
        window.location.href = `/Visitas/Detalle/${target}`;
      }, NAV_DELAY_MS);
    },
    [canViewHistory, currentPage, fromDateValue, saveCachedFilter, toDateValue, selectedClient]
  );
  const calendar = (0, import_react6.useMemo)(() => {
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
  const timelineItems = (0, import_react6.useMemo)(() => {
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
  const quickFilters = (0, import_react6.useMemo)(
    () => [
      { id: "custom", label: quickCustomLabel },
      { id: "days-7", label: quick7DaysLabel },
      { id: "days-30", label: quick30DaysLabel },
      { id: "days-90", label: quick90DaysLabel }
    ],
    [quick30DaysLabel, quick7DaysLabel, quick90DaysLabel, quickCustomLabel]
  );
  const paginationLabels = (0, import_react6.useMemo)(
    () => ({
      first: pageFirstLabel,
      prev: pagePrevLabel,
      next: pageNextLabel,
      last: pageLastLabel
    }),
    [pageFirstLabel, pageLastLabel, pageNextLabel, pagePrevLabel]
  );
  const showFilterActions = showFilters;
  const showSummary = !showFilters && !!startDate && !!endDate;
  const showResults = !showFilters;
  const manualRangeReady = !!manualStartDate && !!manualEndDate;
  const showInlineSummary = !!startDate && !!endDate && !isOpen && (activeQuickFilter !== "custom" || manualRangeReady);
  const showManualPicker = activeQuickFilter === "custom" && showManualPickerPanel;
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
          labels: paginationLabels
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVRhYmxlLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0ZpbHRlckJ1dHRvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VIaXN0b3J5QWN0aXZpdGllcy50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBNb3VzZUV2ZW50IGFzIFJlYWN0TW91c2VFdmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY3JlYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgQ2xpZW50U2VhcmNoQ29tYm9ib3gsIHsgQ2xpZW50T3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCBIaXN0b3J5VGFibGUsIHsgVGltZWxpbmVJdGVtIH0gZnJvbSBcIi4vSGlzdG9yeVRhYmxlLnRzeFwiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XG5pbXBvcnQgQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUFjdGl2aXRpZXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGRlZmF1bHRGcm9tRGF0ZT86IHN0cmluZztcclxuICBkZWZhdWx0VG9EYXRlPzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBDYWxlbmRhckNlbGwgPSB7XG4gIGRhdGU6IERhdGUgfCBudWxsO1xuICBpc286IHN0cmluZztcbiAgaXNFbXB0eTogYm9vbGVhbjtcclxufTtcclxuXHJcbnR5cGUgUXVpY2tGaWx0ZXJJZCA9IFwiY3VzdG9tXCIgfCBcImRheXMtN1wiIHwgXCJkYXlzLTMwXCIgfCBcImRheXMtOTBcIjtcclxuXHJcbmNvbnN0IFBBR0VfU0laRSA9IDY7XG5jb25zdCBQQUdFX1dJTkRPVyA9IDY7XG5jb25zdCBOQVZfREVMQVlfTVMgPSAzMjA7XG5jb25zdCBGQUJfQkFTRV9CT1RUT00gPSAzMjtcbmNvbnN0IEZBQl9DTEVBUkFOQ0UgPSAyNDtcbmNvbnN0IEZBQl9HQVAgPSAxMjtcblxyXG5jb25zdCBub3JtYWxpemVVaUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGNvbnN0IHZhbHVlID0gU3RyaW5nKGxvY2FsZSB8fCBcIlwiKS50cmltKCk7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiZXMtRVNcIjtcclxuICBpZiAoL156aC1oYW5zL2kudGVzdCh2YWx1ZSkpIHJldHVybiBcInpoLUNOXCI7XHJcbiAgcmV0dXJuIHZhbHVlO1xyXG59O1xyXG5cclxuY29uc3QgaXNCYXNxdWVMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpID0+IC9eZXVcXGIvaS50ZXN0KFN0cmluZyhsb2NhbGUgfHwgXCJcIikpO1xyXG5cclxuY29uc3QgQkFTUVVFX01PTlRIUyA9IFtcclxuICBcInVydGFycmlsYVwiLFxyXG4gIFwib3RzYWlsYVwiLFxyXG4gIFwibWFydHhvYVwiLFxyXG4gIFwiYXBpcmlsYVwiLFxyXG4gIFwibWFpYXR6YVwiLFxyXG4gIFwiZWthaW5hXCIsXHJcbiAgXCJ1enRhaWxhXCIsXHJcbiAgXCJhYnV6dHVhXCIsXHJcbiAgXCJpcmFpbGFcIixcclxuICBcInVycmlhXCIsXHJcbiAgXCJhemFyb2FcIixcclxuICBcImFiZW5kdWFcIixcclxuXTtcclxuXHJcbmNvbnN0IEJBU1FVRV9NT05USFNfU0hPUlQgPSBbXHJcbiAgXCJ1cnRcIixcclxuICBcIm90c1wiLFxyXG4gIFwibWFyXCIsXHJcbiAgXCJhcGlcIixcclxuICBcIm1haVwiLFxyXG4gIFwiZWthXCIsXHJcbiAgXCJ1enRcIixcclxuICBcImFidVwiLFxyXG4gIFwiaXJhXCIsXHJcbiAgXCJ1cnJcIixcclxuICBcImF6YVwiLFxyXG4gIFwiYWJlXCIsXHJcbl07XHJcblxyXG5jb25zdCBnZXRVaUxvY2FsZSA9ICgpID0+IHtcclxuICBjb25zdCBmcm9tSHRtbCA9IHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiA/IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nIDogXCJcIjtcclxuICBpZiAoZnJvbUh0bWwgJiYgU3RyaW5nKGZyb21IdG1sKS50cmltKCkpIHJldHVybiBub3JtYWxpemVVaUxvY2FsZShmcm9tSHRtbCk7XHJcbiAgcmV0dXJuIFwiZXMtRVNcIjtcclxufTtcclxuXHJcbmNvbnN0IHBhZCA9IChuOiBudW1iZXIpID0+IG4udG9TdHJpbmcoKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcblxyXG5jb25zdCB0b0lTTyA9IChkOiBEYXRlKSA9PiBgJHtkLmdldEZ1bGxZZWFyKCl9LSR7cGFkKGQuZ2V0TW9udGgoKSArIDEpfS0ke3BhZChkLmdldERhdGUoKSl9YDtcclxuXHJcbmNvbnN0IHN0YXJ0T2ZEYXkgPSAoZDogRGF0ZSkgPT4gbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIGQuZ2V0RGF0ZSgpKTtcclxuXHJcbmNvbnN0IHBhcnNlSVNPID0gKHM6IHN0cmluZykgPT4ge1xyXG4gIGlmICghcykgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcGFydHMgPSBzLnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcclxuICBpZiAocGFydHMubGVuZ3RoICE9PSAzKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gbmV3IERhdGUocGFydHNbMF0sIHBhcnRzWzFdIC0gMSwgcGFydHNbMl0pO1xyXG59O1xyXG5cclxuY29uc3Qgc2FtZURheSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA9PT0gYi5nZXRUaW1lKCkpO1xyXG5cclxuY29uc3QgaXNCZWZvcmUgPSAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiAhIShhICYmIGIgJiYgYS5nZXRUaW1lKCkgPCBiLmdldFRpbWUoKSk7XHJcblxyXG4gIGNvbnN0IG5vcm1hbGl6ZVJhbmdlID0gKGZyb206IHN0cmluZywgdG86IHN0cmluZykgPT4ge1xyXG4gICAgaWYgKCFmcm9tIHx8ICF0bykgcmV0dXJuIHsgZnJvbSwgdG8gfTtcclxuICAgIGNvbnN0IGZyb21EYXRlID0gcGFyc2VJU08oZnJvbSk7XHJcbiAgICBjb25zdCB0b0RhdGUgPSBwYXJzZUlTTyh0byk7XHJcbiAgICBpZiAoIWZyb21EYXRlIHx8ICF0b0RhdGUpIHJldHVybiB7IGZyb20sIHRvIH07XHJcbiAgaWYgKGlzQmVmb3JlKHRvRGF0ZSwgZnJvbURhdGUpKSB7XHJcbiAgICByZXR1cm4geyBmcm9tOiB0b0lTTyh0b0RhdGUpLCB0bzogdG9JU08oZnJvbURhdGUpIH07XHJcbiAgfVxyXG4gIHJldHVybiB7IGZyb206IHRvSVNPKGZyb21EYXRlKSwgdG86IHRvSVNPKHRvRGF0ZSkgfTtcclxufTtcclxuXHJcbiAgY29uc3QgZm9ybWF0RGlzcGxheSA9IChkOiBEYXRlLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBjb25zdCBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXTtcclxuICAgIHJldHVybiBgJHtkLmdldERhdGUoKX0gJHttb250aH0gJHtkLmdldEZ1bGxZZWFyKCl9YC50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuICByZXR1cm4gZFxyXG4gICAgLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHtcclxuICAgICAgZGF5OiBcIm51bWVyaWNcIixcclxuICAgICAgbW9udGg6IFwic2hvcnRcIixcclxuICAgICAgeWVhcjogXCJudW1lcmljXCIsXHJcbiAgICB9KVxyXG4gICAgLnJlcGxhY2UoL1xcLi9nLCBcIlwiKVxyXG4gICAgLnRvTG93ZXJDYXNlKCk7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXRNb250aExhYmVsID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKC9eemgvaS50ZXN0KGxvY2FsZSkpIHtcclxuICAgIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdChsb2NhbGUsIHsgeWVhcjogXCJudW1lcmljXCIsIG1vbnRoOiBcImxvbmdcIiB9KS5mb3JtYXQoZCk7XHJcbiAgfVxyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICByZXR1cm4gYCR7QkFTUVVFX01PTlRIU1tkLmdldE1vbnRoKCldfSAke2QuZ2V0RnVsbFllYXIoKX1gO1xyXG4gIH1cclxuICBjb25zdCBtb250aE5hbWUgPSBkLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwibG9uZ1wiIH0pO1xyXG4gIGNvbnN0IGNhcE1vbnRoTmFtZSA9IG1vbnRoTmFtZSAmJiAvW0EtWmEtel0vLnRlc3QobW9udGhOYW1lWzBdKVxyXG4gICAgPyBtb250aE5hbWVbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIG1vbnRoTmFtZS5zbGljZSgxKVxyXG4gICAgOiBtb250aE5hbWU7XHJcbiAgcmV0dXJuIGAke2NhcE1vbnRoTmFtZX0gJHtkLmdldEZ1bGxZZWFyKCl9YDtcclxufTtcclxuXHJcbmNvbnN0IHBhcnNlRGF0ZVZhbHVlID0gKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCByYXcgPSBTdHJpbmcodmFsdWUpLnRyaW0oKTtcclxuICBpZiAoIXJhdykgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGRhdGVQYXJ0ID0gcmF3LnNwbGl0KFwiVFwiKVswXS5zcGxpdChcIiBcIilbMF07XHJcblxyXG4gIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChkYXRlUGFydCkpIHtcclxuICAgIGNvbnN0IFt5LCBtLCBkXSA9IGRhdGVQYXJ0LnNwbGl0KFwiLVwiKS5tYXAoTnVtYmVyKTtcclxuICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtIC0gMSwgZCk7XHJcbiAgfVxyXG5cclxuICBpZiAoL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC8udGVzdChkYXRlUGFydCkpIHtcclxuICAgIGNvbnN0IHBhcnRzID0gZGF0ZVBhcnQuc3BsaXQoL1suLy1dLykubWFwKE51bWJlcik7XHJcbiAgICBjb25zdCBbZCwgbSwgeV0gPSBwYXJ0cztcclxuICAgIHJldHVybiBuZXcgRGF0ZSh5LCBtIC0gMSwgZCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwYXJzZWQgPSBuZXcgRGF0ZShyYXcpO1xyXG4gIHJldHVybiBOdW1iZXIuaXNOYU4ocGFyc2VkLmdldFRpbWUoKSkgPyBudWxsIDogcGFyc2VkO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0RGF0ZVBhcnRzID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIHsgeWVhcjogXCJcIiwgbW9udGg6IFwiXCIsIGRheTogXCJcIiB9O1xyXG4gIGNvbnN0IGQgPSBwYXJzZURhdGVWYWx1ZSh2YWx1ZSk7XHJcbiAgaWYgKCFkKSByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIlwiIH07XHJcbiAgbGV0IG1vbnRoID0gXCJcIjtcclxuICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgbW9udGggPSBCQVNRVUVfTU9OVEhTX1NIT1JUW2QuZ2V0TW9udGgoKV0gfHwgXCJcIjtcclxuICB9IGVsc2Uge1xyXG4gICAgbW9udGggPSBkLnRvTG9jYWxlRGF0ZVN0cmluZyhsb2NhbGUsIHsgbW9udGg6IFwic2hvcnRcIiB9KS5yZXBsYWNlKC9cXC4vZywgXCJcIik7XHJcbiAgfVxyXG4gIHJldHVybiB7XHJcbiAgICB5ZWFyOiBTdHJpbmcoZC5nZXRGdWxsWWVhcigpKSxcclxuICAgIG1vbnRoOiBtb250aC50b1VwcGVyQ2FzZSgpLFxyXG4gICAgZGF5OiBTdHJpbmcoZC5nZXREYXRlKCkpLnBhZFN0YXJ0KDIsIFwiMFwiKSxcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3QgdG9UaXRsZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCBsb3dlciA9IHZhbHVlLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiBsb3dlci5yZXBsYWNlKC8oXnxbXlxccHtMfV0pKFxccHtMfSkvZ3UsIChfbWF0Y2gsIHByZWZpeCwgY2gpID0+IGAke3ByZWZpeH0ke2NoLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSl9YCk7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICByZXR1cm4gbG93ZXIucmVwbGFjZSgvKF58W1xccy0vXSkoXFxTKS9nLCAoX21hdGNoLCBwcmVmaXgsIGNoKSA9PiBgJHtwcmVmaXh9JHtjaC50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpfWApO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHRvU2VudGVuY2VDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgdHJpbW1lZCA9IHZhbHVlLnRyaW0oKTtcclxuICBpZiAoIXRyaW1tZWQpIHJldHVybiB0cmltbWVkO1xyXG4gIGNvbnN0IGxvd2VyID0gdHJpbW1lZC50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xyXG4gIHJldHVybiBsb3dlclswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbG93ZXIuc2xpY2UoMSk7XHJcbn07XHJcblxyXG5jb25zdCBsb2dIaXN0b3J5ID0gKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICBjb25zdCBkZWJ1Z0ZsYWcgPSAod2luZG93IGFzIGFueSkuX19JTkRfREVCVUdfSElTVE9SWV9fO1xyXG4gIGlmIChkZWJ1Z0ZsYWcgPT09IGZhbHNlKSByZXR1cm47XHJcbiAgaWYgKGRhdGEpIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSwgZGF0YSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gSGlzdG9yeSBwYWdlIHdpdGggUmVhY3Qgc3RhdGUgKyBlZmZlY3RzIChubyBsZWdhY3kgRE9NIGxvZ2ljKS5cclxuZXhwb3J0IGNvbnN0IEhpc3RvcnlQYWdlID0gKHsgZGVmYXVsdEZyb21EYXRlID0gXCJcIiwgZGVmYXVsdFRvRGF0ZSA9IFwiXCIgfTogUHJvcHMpID0+IHtcclxuICBjb25zdCBsb2NhbGUgPSB1c2VNZW1vKCgpID0+IGdldFVpTG9jYWxlKCksIFtdKTtcclxuICBjb25zdCBjYW5WaWV3SGlzdG9yeSA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfSElTVE9SSUFMXCIsIFwiVmlld1wiKTtcclxuICBjb25zdCBjYW5DcmVhdGVWaXNpdCA9IGNhbkFjY2VzcyhcIlZJU0lUQVNfQ1JFQUNJT05cIiwgXCJBZGRcIik7XHJcbiAgY29uc3Qgbm9EYXRhVGV4dCA9IGluZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKTtcclxuXHJcbiAgY29uc3QgYWN0aXZhdG9yUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBvcG92ZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcGFnaW5hdGlvblJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXHJcbiAgY29uc3QgW3N0YXJ0RGF0ZSwgc2V0U3RhcnREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2VuZERhdGUsIHNldEVuZERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbWFudWFsU3RhcnREYXRlLCBzZXRNYW51YWxTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbbWFudWFsRW5kRGF0ZSwgc2V0TWFudWFsRW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtob3ZlckRhdGUsIHNldEhvdmVyRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzZWxlY3RpbmdTdGVwLCBzZXRTZWxlY3RpbmdTdGVwXSA9IHVzZVN0YXRlPFwic3RhcnRcIiB8IFwiZW5kXCIgfCBcImRvbmVcIj4oXCJzdGFydFwiKTtcclxuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRNb250aCgpKTtcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd01hbnVhbFBpY2tlclBhbmVsLCBzZXRTaG93TWFudWFsUGlja2VyUGFuZWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPFF1aWNrRmlsdGVySWQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZTxDbGllbnRPcHRpb24gfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbY2xpZW50UmVzZXRLZXksIHNldENsaWVudFJlc2V0S2V5XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtzaG93RmlsdGVycywgc2V0U2hvd0ZpbHRlcnNdID0gdXNlU3RhdGUodHJ1ZSk7XHJcbiAgY29uc3QgW3Nob3dNYW51YWxFcnJvciwgc2V0U2hvd01hbnVhbEVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2ZhYkJvdHRvbSwgc2V0RmFiQm90dG9tXSA9IHVzZVN0YXRlKEZBQl9CQVNFX0JPVFRPTSk7XG5cclxuICBjb25zdCBoYXNSZXN0b3JlZEZpbHRlclJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGRpZEluaXRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBkZWJ1Z0xvZ2dlZFJlZiA9IHVzZVJlZigwKTtcblxuICBjb25zdCBmcm9tRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoc3RhcnREYXRlID8gdG9JU08oc3RhcnREYXRlKSA6IFwiXCIpLCBbc3RhcnREYXRlXSk7XG4gIGNvbnN0IHRvRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoZW5kRGF0ZSA/IHRvSVNPKGVuZERhdGUpIDogXCJcIiksIFtlbmREYXRlXSk7XG4gIGNvbnN0IGFjY291bnROdW1WYWx1ZSA9IHVzZU1lbW8oKCkgPT4gKHNlbGVjdGVkQ2xpZW50ID8gc2VsZWN0ZWRDbGllbnQudmFsdWUgOiBcIlwiKSwgW3NlbGVjdGVkQ2xpZW50XSk7XG5cbiAgY29uc3QgeyByZWFkQ2FjaGVkRmlsdGVyLCBjbGVhckZpbHRlckNhY2hlLCBjb25zdW1lUmV0dXJuRmxhZywgc2F2ZUNhY2hlZEZpbHRlciB9ID0gdXNlSGlzdG9yeUZpbHRlckNhY2hlKCk7XG4gIGNvbnN0IHsgaXRlbXMsIHRvdGFsLCBjdXJyZW50UGFnZSwgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIGxvYWRBY3Rpdml0aWVzLCByZXNldEFjdGl2aXRpZXMsIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsIGxhc3RTaWduYXR1cmVSZWYgfSA9XG4gICAgdXNlSGlzdG9yeUFjdGl2aXRpZXMoe1xuICAgICAgZnJvbURhdGVWYWx1ZSxcbiAgICAgIHRvRGF0ZVZhbHVlLFxuICAgICAgYWNjb3VudE51bVZhbHVlLFxuICAgICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgICBvbkRlYnVnOiBsb2dIaXN0b3J5LFxuICAgIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9nSGlzdG9yeShcImluaXRcIiwgeyBkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGUgfSk7XG4gIH0sIFtkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGVdKTtcblxyXG4gIGNvbnN0IHZhbGlkYXRlTWFudWFsUmFuZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSkge1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKHRydWUpO1xuICAgICAgc2V0U2VsZWN0aW5nU3RlcCghc3RhcnREYXRlID8gXCJzdGFydFwiIDogXCJlbmRcIik7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSwgW2FjdGl2ZVF1aWNrRmlsdGVyLCBlbmREYXRlLCBzdGFydERhdGVdKTtcclxuXHJcbiAgY29uc3QgYXBwbHlGaWx0ZXJzID0gdXNlQ2FsbGJhY2soXG4gICAgKG9wdGlvbnM/OiB7IGNsb3NlUGFuZWw/OiBib29sZWFuOyBmb3JjZT86IGJvb2xlYW47IHBhZ2U/OiBudW1iZXIgfSkgPT4ge1xyXG4gICAgICBpZiAoIXZhbGlkYXRlTWFudWFsUmFuZ2UoKSkgcmV0dXJuO1xyXG4gICAgICBpZiAoIXN0YXJ0RGF0ZSB8fCAhZW5kRGF0ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVJhbmdlKGZyb21EYXRlVmFsdWUsIHRvRGF0ZVZhbHVlKTtcclxuICAgICAgY29uc3QgcGFnZSA9IG9wdGlvbnM/LnBhZ2UgPz8gMTtcclxuICAgICAgY29uc3Qgc2lnbmF0dXJlID0gYCR7bm9ybWFsaXplZC5mcm9tfXwke25vcm1hbGl6ZWQudG99fCR7YWNjb3VudE51bVZhbHVlfXwke3BhZ2V9YDtcclxuXHJcbiAgICAgIGlmIChvcHRpb25zPy5mb3JjZSB8fCBsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgIT09IHNpZ25hdHVyZSkge1xyXG4gICAgICAgIGxvYWRBY3Rpdml0aWVzKHBhZ2UsIHsgZnJvbURhdGU6IG5vcm1hbGl6ZWQuZnJvbSwgdG9EYXRlOiBub3JtYWxpemVkLnRvLCBhY2NvdW50TnVtOiBhY2NvdW50TnVtVmFsdWUgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XHJcbiAgICAgIGlmIChvcHRpb25zPy5jbG9zZVBhbmVsKSB7XHJcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbYWNjb3VudE51bVZhbHVlLCBlbmREYXRlLCBmcm9tRGF0ZVZhbHVlLCBsb2FkQWN0aXZpdGllcywgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZSwgdmFsaWRhdGVNYW51YWxSYW5nZV1cclxuICApO1xuXG4gIGNvbnN0IHRvdGFsUGFnZXMgPSBNYXRoLmNlaWwoKHRvdGFsIHx8IDApIC8gUEFHRV9TSVpFKTtcblxuICAvLyBLZWVwIHRoZSBmbG9hdGluZyBhY3Rpb24gYnV0dG9uIGNsZWFyIG9mIHBhZ2luYXRpb24gb24gc21hbGwgc2NyZWVucy5cbiAgY29uc3QgdXBkYXRlRmFiQm90dG9tID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghcGFnaW5hdGlvblJlZi5jdXJyZW50IHx8IHRvdGFsUGFnZXMgPD0gMSkge1xuICAgICAgc2V0RmFiQm90dG9tKEZBQl9CQVNFX0JPVFRPTSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGhlaWdodCA9IHBhZ2luYXRpb25SZWYuY3VycmVudC5vZmZzZXRIZWlnaHQgfHwgMDtcbiAgICBjb25zdCBuZXh0ID0gTWF0aC5tYXgoRkFCX0JBU0VfQk9UVE9NLCBoZWlnaHQgKyBGQUJfQ0xFQVJBTkNFICsgRkFCX0dBUCk7XG4gICAgc2V0RmFiQm90dG9tKChwcmV2KSA9PiAoTWF0aC5hYnMocHJldiAtIG5leHQpIDwgMSA/IHByZXYgOiBuZXh0KSk7XG4gIH0sIFt0b3RhbFBhZ2VzXSk7XG5cbiAgLy8gQXBwbGllcyBhIGRlZmF1bHQgcmFuZ2Ugd2hlbiBwcm92aWRlZCBieSB0aGUgc2VydmVyLlxuICBjb25zdCBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWRlZmF1bHRGcm9tRGF0ZSB8fCAhZGVmYXVsdFRvRGF0ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgY29uc3Qgc3RhcnRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0RnJvbURhdGUpO1xyXG4gICAgY29uc3QgZW5kUmF3ID0gcGFyc2VEYXRlVmFsdWUoZGVmYXVsdFRvRGF0ZSk7XHJcbiAgICBpZiAoIXN0YXJ0UmF3IHx8ICFlbmRSYXcpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICBjb25zdCBzdGFydERheSA9IHN0YXJ0T2ZEYXkoc3RhcnRSYXcpO1xyXG4gICAgY29uc3QgZW5kRGF5ID0gc3RhcnRPZkRheShlbmRSYXcpO1xyXG5cclxuICAgIGxldCBzdGFydCA9IHN0YXJ0RGF5O1xyXG4gICAgbGV0IGVuZCA9IGVuZERheTtcclxuICAgIGlmIChpc0JlZm9yZShlbmQsIHN0YXJ0KSkge1xyXG4gICAgICBjb25zdCBzd2FwID0gc3RhcnQ7XHJcbiAgICAgIHN0YXJ0ID0gZW5kO1xyXG4gICAgICBlbmQgPSBzd2FwO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFN0YXJ0RGF0ZShzdGFydCk7XHJcbiAgICBzZXRFbmREYXRlKGVuZCk7XHJcbiAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcclxuICAgIHNldEN1cnJlbnRNb250aChzdGFydC5nZXRNb250aCgpKTtcclxuICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0LmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XHJcbiAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcclxuICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgbG9hZEFjdGl2aXRpZXMoMSwgeyBmcm9tRGF0ZTogdG9JU08oc3RhcnQpLCB0b0RhdGU6IHRvSVNPKGVuZCksIGFjY291bnROdW06IFwiXCIgfSk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlLCBsb2FkQWN0aXZpdGllc10pO1xyXG5cclxuICAvLyBSZXNldHMgZmlsdGVycyBhbmQgY2xlYXJzIGxvY2FsIHN0YXRlLlxyXG4gIGNvbnN0IHJlc2V0SGlzdG9yeUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0U3RhcnREYXRlKG51bGwpO1xuICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgc2V0TWFudWFsU3RhcnREYXRlKG51bGwpO1xuICAgIHNldE1hbnVhbEVuZERhdGUobnVsbCk7XG4gICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICBzZXRDdXJyZW50TW9udGgobmV3IERhdGUoKS5nZXRNb250aCgpKTtcbiAgICBzZXRDdXJyZW50WWVhcihuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgc2V0Q2xpZW50UmVzZXRLZXkoKHByZXYpID0+IHByZXYgKyAxKTtcbiAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcbiAgICByZXNldEFjdGl2aXRpZXMoKTtcbiAgfSwgW2NsZWFyRmlsdGVyQ2FjaGUsIHJlc2V0QWN0aXZpdGllc10pO1xuXG4gIC8vIEFwcGxpZXMgYSBjYWNoZWQgZmlsdGVyIGZyb20gc2Vzc2lvblN0b3JhZ2UuXG4gIGNvbnN0IGFwcGx5Q2FjaGVkRmlsdGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGZpbHRlcjogUmV0dXJuVHlwZTx0eXBlb2YgcmVhZENhY2hlZEZpbHRlcj4pID0+IHtcbiAgICAgIGlmICghZmlsdGVyIHx8ICFmaWx0ZXIuZnJvbURhdGUgfHwgIWZpbHRlci50b0RhdGUpIHJldHVybiBmYWxzZTtcbiAgICAgIGNvbnN0IHN0YXJ0ID0gcGFyc2VJU08oZmlsdGVyLmZyb21EYXRlKTtcbiAgICAgIGNvbnN0IGVuZCA9IHBhcnNlSVNPKGZpbHRlci50b0RhdGUpO1xuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcclxuICAgICAgc2V0RW5kRGF0ZShlbmQpO1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKGVuZCA/IFwiZG9uZVwiIDogXCJlbmRcIik7XG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoc3RhcnQgPyBzdGFydC5nZXRNb250aCgpIDogbmV3IERhdGUoKS5nZXRNb250aCgpKTtcbiAgICAgIHNldEN1cnJlbnRZZWFyKHN0YXJ0ID8gc3RhcnQuZ2V0RnVsbFllYXIoKSA6IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgaWYgKGZpbHRlci5jbGllbnRBY2NvdW50KSB7XG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50KHsgdmFsdWU6IGZpbHRlci5jbGllbnRBY2NvdW50LCB0ZXh0OiBmaWx0ZXIuY2xpZW50VGV4dCB8fCBmaWx0ZXIuY2xpZW50QWNjb3VudCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IHBhZ2VWYWwgPSBOdW1iZXIoZmlsdGVyLnBhZ2UpO1xyXG4gICAgICBjb25zdCBwYWdlVG9Mb2FkID0gTnVtYmVyLmlzRmluaXRlKHBhZ2VWYWwpICYmIHBhZ2VWYWwgPiAwID8gcGFnZVZhbCA6IDE7XHJcbiAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIGxvYWRBY3Rpdml0aWVzKHBhZ2VUb0xvYWQsIHsgZnJvbURhdGU6IGZpbHRlci5mcm9tRGF0ZSwgdG9EYXRlOiBmaWx0ZXIudG9EYXRlLCBhY2NvdW50TnVtOiBmaWx0ZXIuY2xpZW50QWNjb3VudCB8fCBcIlwiIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBbbG9hZEFjdGl2aXRpZXMsIHJlYWRDYWNoZWRGaWx0ZXJdXG4gICk7XG5cclxuICAvLyBSZXN0b3JlIGNhY2hlZCBmaWx0ZXIgb24gaW5pdGlhbCBtb3VudCBvbmx5LlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoZGlkSW5pdEZpbHRlclJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICBkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgY29uc3QgY2FjaGVkID0gY29uc3VtZVJldHVybkZsYWcoKSA/IHJlYWRDYWNoZWRGaWx0ZXIoKSA6IG51bGw7XHJcbiAgICBpZiAoY2FjaGVkICYmIGNhY2hlZC5mcm9tRGF0ZSAmJiBjYWNoZWQudG9EYXRlKSB7XHJcbiAgICAgIGxvZ0hpc3RvcnkoXCJyZXN0b3JlRmlsdGVyXCIsIGNhY2hlZCk7XHJcbiAgICAgIGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCk7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcygpKSB7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcclxuICAgIHNldFNob3dGaWx0ZXJzKHRydWUpO1xyXG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICB9LCBbYXBwbHlDYWNoZWRGaWx0ZXIsIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLCBjb25zdW1lUmV0dXJuRmxhZywgcmVhZENhY2hlZEZpbHRlciwgcmVzZXRIaXN0b3J5RmlsdGVyc10pO1xyXG5cclxuICAvLyBLZWVwIHRoZSBwaWNrZXIgc3RlcCBpbiBzeW5jIHdpdGggY3VycmVudCBzZWxlY3Rpb24uXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiKSB7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghc3RhcnREYXRlICYmIHNlbGVjdGluZ1N0ZXAgIT09IFwic3RhcnRcIikge1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgICB9XHJcbiAgfSwgW3N0YXJ0RGF0ZSwgZW5kRGF0ZSwgc2VsZWN0aW5nU3RlcF0pO1xyXG5cclxuICAvLyBDbG9zZSB0aGUgY2FsZW5kYXIgd2hlbiBjbGlja2luZyBvdXRzaWRlIHRoZSBwaWNrZXIuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghaXNPcGVuKSByZXR1cm47XHJcbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBOb2RlIHwgbnVsbDtcclxuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBpZiAoYWN0aXZhdG9yUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcclxuICAgICAgbG9nSGlzdG9yeShcImNsb3NlUG9wb3ZlcjpvdXRzaWRlXCIpO1xyXG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XHJcbiAgICB9O1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcclxuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xyXG4gIH0sIFtpc09wZW5dKTtcclxuXHJcbiAgLy8gUmUtYXBwbHkgZmlsdGVycyBhZnRlciByZXR1cm5pbmcgZnJvbSBkZXRhaWwgdmlldy5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25QYWdlU2hvdyA9ICgpID0+IHtcclxuICAgICAgaWYgKGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgICAgaWYgKGNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcclxuICAgICAgICBjb25zdCBjYWNoZWQgPSByZWFkQ2FjaGVkRmlsdGVyKCk7XHJcbiAgICAgICAgaWYgKGFwcGx5Q2FjaGVkRmlsdGVyKGNhY2hlZCkpIHtcclxuICAgICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgLy8gS2VlcCBjdXJyZW50IHN0YXRlIHdoZW4gbm8gY2FjaGVkIGZpbHRlciBpcyBhdmFpbGFibGUuXHJcbiAgICB9O1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gIH0sIFthcHBseUNhY2hlZEZpbHRlciwgY29uc3VtZVJldHVybkZsYWcsIHJlYWRDYWNoZWRGaWx0ZXJdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHVwZGF0ZUZhYkJvdHRvbSgpO1xuICAgIGxldCBvYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBwYWdpbmF0aW9uRWwgPSBwYWdpbmF0aW9uUmVmLmN1cnJlbnQ7XG4gICAgaWYgKHBhZ2luYXRpb25FbCAmJiB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHVwZGF0ZUZhYkJvdHRvbSgpKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbkVsKTtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlRmFiQm90dG9tKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdXBkYXRlRmFiQm90dG9tKTtcbiAgICAgIGlmIChvYnNlcnZlcikgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH07XG4gIH0sIFt1cGRhdGVGYWJCb3R0b21dKTtcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XHJcbiAgICAgIHNldFNob3dGaWx0ZXJzKChwcmV2KSA9PiB7XHJcbiAgICAgICAgY29uc3QgbmV4dCA9ICFwcmV2O1xyXG4gICAgICAgIGlmICghbmV4dCkge1xyXG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIGNvbnN0IG9uUmVmcmVzaCA9ICgpID0+IHtcclxuICAgICAgYXBwbHlGaWx0ZXJzKHsgcGFnZTogY3VycmVudFBhZ2UsIGZvcmNlOiB0cnVlLCBjbG9zZVBhbmVsOiB0cnVlIH0pO1xyXG4gICAgfTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGlzdG9yeS10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktcmVmcmVzaFwiLCBvblJlZnJlc2gpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcclxuICAgIH07XHJcbiAgfSwgW2FwcGx5RmlsdGVycywgY3VycmVudFBhZ2VdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlU2VsZWN0ID0gdXNlQ2FsbGJhY2soXG4gICAgKGRhdGVPYmo6IERhdGUpID0+IHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJoYW5kbGVTZWxlY3RcIiwge1xuICAgICAgICBjbGlja2VkOiB0b0lTTyhkYXRlT2JqKSxcbiAgICAgICAgc3RhcnQ6IGZyb21EYXRlVmFsdWUsXG4gICAgICAgIGVuZDogdG9EYXRlVmFsdWUsXG4gICAgICAgIHNlbGVjdGluZ1N0ZXAsXG4gICAgICB9KTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcbiAgICAgIGNvbnN0IGhhc1N0YXJ0ID0gISFzdGFydERhdGU7XG4gICAgICBjb25zdCBoYXNFbmQgPSAhIWVuZERhdGU7XG5cbiAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiKSB7XG4gICAgICAgIGlmICghaGFzU3RhcnQpIHtcbiAgICAgICAgICBzZXRTdGFydERhdGUoZGF0ZU9iaik7XG4gICAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgICAgIHNldEN1cnJlbnRNb250aChkYXRlT2JqLmdldE1vbnRoKCkpO1xuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKGRhdGVPYmouZ2V0RnVsbFllYXIoKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld1N0YXJ0ID0gc3RhcnREYXRlIGFzIERhdGU7XG4gICAgICAgIGxldCBuZXdFbmQgPSBkYXRlT2JqO1xuICAgICAgICBpZiAoaXNCZWZvcmUobmV3RW5kLCBuZXdTdGFydCkpIHtcbiAgICAgICAgICBjb25zdCBzd2FwID0gbmV3U3RhcnQ7XG4gICAgICAgICAgbmV3U3RhcnQgPSBuZXdFbmQ7XG4gICAgICAgICAgbmV3RW5kID0gc3dhcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICAgIHNldEVuZERhdGUobmV3RW5kKTtcbiAgICAgICAgc2V0TWFudWFsU3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0TWFudWFsRW5kRGF0ZShuZXdFbmQpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcbiAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld0VuZC5nZXRNb250aCgpKTtcbiAgICAgICAgc2V0Q3VycmVudFllYXIobmV3RW5kLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3U3RhcnQgPSBkYXRlT2JqO1xuICAgICAgaWYgKGhhc0VuZCAmJiBlbmREYXRlICYmIGlzQmVmb3JlKGVuZERhdGUsIG5ld1N0YXJ0KSkge1xuICAgICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5ld1N0YXJ0LmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICBpZiAoaGFzRW5kICYmIGVuZERhdGUpIHtcbiAgICAgICAgc2V0RW5kRGF0ZShlbmREYXRlKTtcbiAgICAgICAgc2V0TWFudWFsU3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0TWFudWFsRW5kRGF0ZShlbmREYXRlKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XG4gICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XG4gICAgICB9XG4gICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICBzZXRDdXJyZW50WWVhcihuZXdTdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICB9LFxuICAgIFtlbmREYXRlLCBmcm9tRGF0ZVZhbHVlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlXVxuICApO1xuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0TW91c2VFdmVudCkgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBsb2dIaXN0b3J5KFwiY2xlYXJSYW5nZVwiKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgfSxcbiAgICBbcmVzZXRIaXN0b3J5RmlsdGVyc11cbiAgKTtcblxyXG4gIGNvbnN0IG9wZW5Qb3BvdmVyID0gdXNlQ2FsbGJhY2soKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcbiAgICBsb2dIaXN0b3J5KFwib3BlblBvcG92ZXJcIiwgeyBzZWN0aW9uLCBzdGFydDogZnJvbURhdGVWYWx1ZSwgZW5kOiB0b0RhdGVWYWx1ZSwgc2VsZWN0aW5nU3RlcCB9KTtcbiAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbCh0cnVlKTtcbiAgICBpZiAoc2VjdGlvbiA9PT0gXCJlbmRcIiAmJiAhc3RhcnREYXRlKSB7XG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc2VjdGlvbik7XG4gICAgfVxyXG4gICAgc2V0SXNPcGVuKHRydWUpO1xyXG4gIH0sIFtmcm9tRGF0ZVZhbHVlLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlXSk7XHJcblxyXG4gIGNvbnN0IGFwcGx5UXVpY2tSYW5nZSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGZpbHRlcklkOiBRdWlja0ZpbHRlcklkLCBzdGFydDogRGF0ZSwgZW5kOiBEYXRlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0RGF5ID0gc3RhcnRPZkRheShzdGFydCk7XHJcbiAgICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kKTtcclxuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0RGF5KTtcclxuICAgICAgc2V0RW5kRGF0ZShlbmREYXkpO1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZG9uZVwiKTtcclxuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICBzZXRDdXJyZW50TW9udGgoc3RhcnREYXkuZ2V0TW9udGgoKSk7XG4gICAgICBzZXRDdXJyZW50WWVhcihzdGFydERheS5nZXRGdWxsWWVhcigpKTtcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoZmlsdGVySWQpO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICB9LFxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlUXVpY2tGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVySWQ6IFF1aWNrRmlsdGVySWQpID0+IHtcbiAgICAgIGNvbnN0IHRvZGF5ID0gc3RhcnRPZkRheShuZXcgRGF0ZSgpKTtcblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImN1c3RvbVwiKSB7XG4gICAgICAgIGlmIChzaG93TWFudWFsUGlja2VyUGFuZWwpIHtcbiAgICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmV4dFN0YXJ0ID0gbWFudWFsU3RhcnREYXRlID8gbmV3IERhdGUobWFudWFsU3RhcnREYXRlKSA6IG51bGw7XG4gICAgICAgIGNvbnN0IG5leHRFbmQgPSBtYW51YWxFbmREYXRlID8gbmV3IERhdGUobWFudWFsRW5kRGF0ZSkgOiBudWxsO1xuICAgICAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihcImN1c3RvbVwiKTtcbiAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xuICAgICAgICBzZXRTdGFydERhdGUobmV4dFN0YXJ0KTtcbiAgICAgICAgc2V0RW5kRGF0ZShuZXh0RW5kKTtcbiAgICAgICAgaWYgKG5leHRTdGFydCkge1xuICAgICAgICAgIHNldEN1cnJlbnRNb250aChuZXh0U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIobmV4dFN0YXJ0LmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZXh0U3RhcnQgJiYgbmV4dEVuZCkge1xuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChuZXh0U3RhcnQgJiYgIW5leHRFbmQgPyBcImVuZFwiIDogXCJzdGFydFwiKTtcbiAgICAgICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cclxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDYpO1xuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy05MFwiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FwcGx5UXVpY2tSYW5nZSwgbWFudWFsRW5kRGF0ZSwgbWFudWFsU3RhcnREYXRlLCBzaG93TWFudWFsUGlja2VyUGFuZWxdXG4gICk7XG5cclxuICBjb25zdCBoYW5kbGVDbGllbnRTZWxlY3RlZCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGNsaWVudDogQ2xpZW50T3B0aW9uIHwgbnVsbCkgPT4ge1xyXG4gICAgICBzZXRTZWxlY3RlZENsaWVudChjbGllbnQpO1xyXG4gICAgfSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTmF2aWdhdGUgPSB1c2VDYWxsYmFjayhcbiAgICAobGlua0lkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghY2FuVmlld0hpc3RvcnkpIHtcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2F2ZUNhY2hlZEZpbHRlcih7XG4gICAgICAgICAgZnJvbURhdGU6IGZyb21EYXRlVmFsdWUgfHwgXCJcIixcbiAgICAgICAgICB0b0RhdGU6IHRvRGF0ZVZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgcGFnZTogY3VycmVudFBhZ2UsXG4gICAgICAgICAgY2xpZW50QWNjb3VudDogc2VsZWN0ZWRDbGllbnQ/LnZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgY2xpZW50VGV4dDogc2VsZWN0ZWRDbGllbnQ/LnRleHQgfHwgXCJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGVuY29kZVVSSUNvbXBvbmVudChsaW5rSWQpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvVmlzaXRhcy9EZXRhbGxlLyR7dGFyZ2V0fWA7XG4gICAgICB9LCBOQVZfREVMQVlfTVMpO1xuICAgIH0sXG4gICAgW2NhblZpZXdIaXN0b3J5LCBjdXJyZW50UGFnZSwgZnJvbURhdGVWYWx1ZSwgc2F2ZUNhY2hlZEZpbHRlciwgdG9EYXRlVmFsdWUsIHNlbGVjdGVkQ2xpZW50XVxuICApO1xuXHJcbiAgY29uc3QgY2FsZW5kYXIgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGZpcnN0RGF5ID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgMSk7XHJcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGggKyAxLCAwKS5nZXREYXRlKCk7XHJcbiAgICBjb25zdCBvZmZzZXQgPSAoZmlyc3REYXkuZ2V0RGF5KCkgKyA2KSAlIDc7XHJcbiAgICBjb25zdCBjZWxsczogQ2FsZW5kYXJDZWxsW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2Zmc2V0OyBpKyspIHtcclxuICAgICAgY2VsbHMucHVzaCh7IGRhdGU6IG51bGwsIGlzbzogXCJcIiwgaXNFbXB0eTogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IGRheXNJbk1vbnRoOyBkKyspIHtcclxuICAgICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIGQpO1xyXG4gICAgICBjZWxscy5wdXNoKHsgZGF0ZTogZGF0ZU9iaiwgaXNvOiB0b0lTTyhkYXRlT2JqKSwgaXNFbXB0eTogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjZWxscyxcclxuICAgICAgbGFiZWw6IGZvcm1hdE1vbnRoTGFiZWwoZmlyc3REYXksIGxvY2FsZSksXHJcbiAgICB9O1xyXG4gIH0sIFtjdXJyZW50TW9udGgsIGN1cnJlbnRZZWFyLCBsb2NhbGVdKTtcclxuXHJcbiAgY29uc3QgcHJldmlld0VuZCA9IGVuZERhdGUgfHwgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgPyBob3ZlckRhdGUgOiBudWxsKTtcclxuXHJcbiAgY29uc3QgdGltZWxpbmVJdGVtczogVGltZWxpbmVJdGVtW10gPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiBpdGVtcy5tYXAoKHgpID0+IHtcclxuICAgICAgY29uc3QgYWN0aXZpZGFkSWRSYXcgPSAoeC5hY3RpdmlkYWRJZCA/PyB4LkFjdGl2aWRhZElkID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgICBjb25zdCBhY3RpdmlkYWRJZCA9IGFjdGl2aWRhZElkUmF3IHx8IFwiXCI7XHJcbiAgICAgIGNvbnN0IHJlY0lkUmF3ID0geC5yZWNJZCA/PyB4LlJlY0lkID8/IFwiXCI7XHJcbiAgICAgIGNvbnN0IHJlY0lkID0gcmVjSWRSYXcgJiYgIU51bWJlci5pc05hTihOdW1iZXIocmVjSWRSYXcpKSA/IE51bWJlcihyZWNJZFJhdykgOiBudWxsO1xyXG4gICAgICBsZXQgbGlua0lkID0gYWN0aXZpZGFkSWQgfHwgKHJlY0lkID8gcmVjSWQudG9TdHJpbmcoKSA6IFwiXCIpO1xyXG5cclxuICAgICAgaWYgKGRlYnVnTG9nZ2VkUmVmLmN1cnJlbnQgPCA1KSB7XHJcbiAgICAgICAgY29uc29sZS5kZWJ1ZyhcImFjdGl2aXR5IGl0ZW1cIiwgeyBhY3RpdmlkYWRJZCwgcmVjSWRSYXcsIHJlY0lkLCByYXc6IHggfSk7XHJcbiAgICAgICAgZGVidWdMb2dnZWRSZWYuY3VycmVudCArPSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByYXdOYW1lID0gKHgubmFtZSA/PyB4Lk5hbWUgPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IGZ1bGxOYW1lID0gdG9UaXRsZUNhc2UocmF3TmFtZSwgbG9jYWxlKTtcclxuICAgICAgY29uc3QgZmVjaGEgPSAoeC50cmFuc0RhdGUgPz8geC5UcmFuc0RhdGUgPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgY29uc3QgcmF3RGVzYyA9ICh4LmRlc2NyaXB0aW9uID8/IHguRGVzY3JpcHRpb24gPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IGZ1bGxEZXNjID0gcmF3RGVzYztcclxuXHJcbiAgICAgIGNvbnN0IGlzTm9EYXRhQ2FyZCA9ICFyYXdOYW1lICYmICFyYXdEZXNjO1xyXG4gICAgICBpZiAoaXNOb0RhdGFDYXJkKSB7XHJcbiAgICAgICAgbGlua0lkID0gXCJcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogbGlua0lkLFxyXG4gICAgICAgIGFjdGl2aWRhZElkLFxyXG4gICAgICAgIHJlY0lkLFxyXG4gICAgICAgIG5hbWU6IGZ1bGxOYW1lLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBmdWxsRGVzYyB8fCBub0RhdGFUZXh0LFxyXG4gICAgICAgIGZ1bGxOYW1lLFxyXG4gICAgICAgIGZ1bGxEZXNjLFxyXG4gICAgICAgIGRhdGVQYXJ0czogZm9ybWF0RGF0ZVBhcnRzKGZlY2hhLCBsb2NhbGUpLFxyXG4gICAgICAgIGlzTm9EYXRhOiBpc05vRGF0YUNhcmQsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9LCBbaXRlbXMsIGxvY2FsZSwgbm9EYXRhVGV4dF0pO1xyXG5cclxuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XG4gIGNvbnN0IHN1bW1hcnlGcm9tID0gbGFiZWxGcm9tO1xuICBjb25zdCBzdW1tYXJ5VG8gPSBsYWJlbFRvO1xuICBjb25zdCBmaWx0ZXJUaXRsZSA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKTtcclxuICBjb25zdCBjbGVhckxhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIik7XHJcbiAgY29uc3QgYXBwbHlMYWJlbCA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9BcHBseVwiLCBcIkFwcGx5XCIpO1xyXG4gIGNvbnN0IGNsaWVudExhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsaWVudFwiLCBcIkNsaWVudFwiKTtcclxuICBjb25zdCBxdWlja0N1c3RvbUxhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfQ3VzdG9tXCIsIFwiRGF0ZVwiKTtcbiAgY29uc3QgcXVpY2s3RGF5c0xhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfN0RheXNcIiwgXCI3IGRheXNcIik7XG4gIGNvbnN0IHF1aWNrMzBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja18zMERheXNcIiwgXCIzMCBkYXlzXCIpO1xuICBjb25zdCBxdWljazkwRGF5c0xhYmVsID0gaW5kVChcIkhpc3RvcnlfUXVpY2tfOTBEYXlzXCIsIFwiOTAgZGF5c1wiKTtcbiAgY29uc3QgcGFnZUZpcnN0TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX0ZpcnN0XCIsIFwiRmlyc3RcIik7XG4gIGNvbnN0IHBhZ2VQcmV2TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX1ByZXZcIiwgXCJQcmV2aW91c1wiKTtcbiAgY29uc3QgcGFnZU5leHRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTmV4dFwiLCBcIk5leHRcIik7XG4gIGNvbnN0IHBhZ2VMYXN0TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9QYWdlX0xhc3RcIiwgXCJMYXN0XCIpO1xuICBjb25zdCBxdWlja0ZpbHRlcnMgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIHsgaWQ6IFwiY3VzdG9tXCIgYXMgY29uc3QsIGxhYmVsOiBxdWlja0N1c3RvbUxhYmVsIH0sXG4gICAgICB7IGlkOiBcImRheXMtN1wiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2s3RGF5c0xhYmVsIH0sXG4gICAgICB7IGlkOiBcImRheXMtMzBcIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrMzBEYXlzTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy05MFwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2s5MERheXNMYWJlbCB9LFxuICAgIF0sXG4gICAgW3F1aWNrMzBEYXlzTGFiZWwsIHF1aWNrN0RheXNMYWJlbCwgcXVpY2s5MERheXNMYWJlbCwgcXVpY2tDdXN0b21MYWJlbF1cbiAgKTtcbiAgY29uc3QgcGFnaW5hdGlvbkxhYmVscyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gKHtcbiAgICAgIGZpcnN0OiBwYWdlRmlyc3RMYWJlbCxcbiAgICAgIHByZXY6IHBhZ2VQcmV2TGFiZWwsXG4gICAgICBuZXh0OiBwYWdlTmV4dExhYmVsLFxuICAgICAgbGFzdDogcGFnZUxhc3RMYWJlbCxcbiAgICB9KSxcbiAgICBbcGFnZUZpcnN0TGFiZWwsIHBhZ2VMYXN0TGFiZWwsIHBhZ2VOZXh0TGFiZWwsIHBhZ2VQcmV2TGFiZWxdXG4gICk7XG4gIGNvbnN0IHNob3dGaWx0ZXJBY3Rpb25zID0gc2hvd0ZpbHRlcnM7XG4gIGNvbnN0IHNob3dTdW1tYXJ5ID0gIXNob3dGaWx0ZXJzICYmICEhc3RhcnREYXRlICYmICEhZW5kRGF0ZTtcbiAgY29uc3Qgc2hvd1Jlc3VsdHMgPSAhc2hvd0ZpbHRlcnM7XG4gIGNvbnN0IG1hbnVhbFJhbmdlUmVhZHkgPSAhIW1hbnVhbFN0YXJ0RGF0ZSAmJiAhIW1hbnVhbEVuZERhdGU7XG4gIGNvbnN0IHNob3dJbmxpbmVTdW1tYXJ5ID1cbiAgICAhIXN0YXJ0RGF0ZSAmJlxuICAgICEhZW5kRGF0ZSAmJlxuICAgICFpc09wZW4gJiZcbiAgICAoYWN0aXZlUXVpY2tGaWx0ZXIgIT09IFwiY3VzdG9tXCIgfHwgbWFudWFsUmFuZ2VSZWFkeSk7XG4gIGNvbnN0IHNob3dNYW51YWxQaWNrZXIgPSBhY3RpdmVRdWlja0ZpbHRlciA9PT0gXCJjdXN0b21cIiAmJiBzaG93TWFudWFsUGlja2VyUGFuZWw7XG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy0zeGwgbXgtYXV0byBweC0xIHNtOnB4LTIgcHQtMyBwYi00IHNwYWNlLXktMlwiPlxyXG4gICAgICB7c2hvd1N1bW1hcnkgJiYgKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLXgtMyBnYXAteS0yIHRleHQteHNcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntzdW1tYXJ5RnJvbX06PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3Bhbj57c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e3N1bW1hcnlUb306PC9zcGFuPlxyXG4gICAgICAgICAgICA8c3Bhbj57ZW5kRGF0ZSA/IGZvcm1hdERpc3BsYXkoZW5kRGF0ZSwgbG9jYWxlKSA6IFwiLS1cIn08L3NwYW4+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIHtzZWxlY3RlZENsaWVudCAmJiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBtdC0xLjUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyBtaW4tdy0wXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCBzaHJpbmstMFwiPntjbGllbnRMYWJlbH06PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1pbi13LTAgZmxleC0xIHRydW5jYXRlXCI+e3NlbGVjdGVkQ2xpZW50LnRleHR9PC9zcGFuPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcbiAgICAgIHtzaG93RmlsdGVycyAmJiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2ZpbHRlclRpdGxlfT5cbiAgICAgICAgICAgIHtxdWlja0ZpbHRlcnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlUXVpY2tGaWx0ZXIgPT09IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgICBhY3RpdmU9e2lzQWN0aXZlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrRmlsdGVyKGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtzaG93SW5saW5lU3VtbWFyeSAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnkgZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC14LTMgZ2FwLXktMSB0ZXh0LVsxMXB4XSBweC0xXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57c3VtbWFyeUZyb219Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+e3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogXCItLVwifTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntzdW1tYXJ5VG99Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHtzaG93TWFudWFsUGlja2VyICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBpZD1cImRycEFjdGl2YXRvclwiXG4gICAgICAgICAgICAgICAgcmVmPXthY3RpdmF0b3JSZWZ9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZHJwIHctZnVsbFwiLCBzaG93TWFudWFsRXJyb3IgPyBcImRycC1lcnJvclwiIDogXCJcIil9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvcGVuUG9wb3ZlcihcInN0YXJ0XCIpfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZHJwLXNlY3Rpb25cIixcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIgJiYgaXNPcGVuID8gXCJhY3RpdmVcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2hvd01hbnVhbEVycm9yICYmICFzdGFydERhdGUgPyBcImlzLWVycm9yXCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIGRhdGEtc2VjdGlvbj1cInN0YXJ0XCJcclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Qb3BvdmVyKFwic3RhcnRcIik7XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLWxhYmVsXCI+e2xhYmVsRnJvbX08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtdmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS1jYWxlbmRhcjMgZHJwLWljb25cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiZHJwU3RhcnRWYWx1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAge3N0YXJ0RGF0ZSA/IGZvcm1hdERpc3BsYXkoc3RhcnREYXRlLCBsb2NhbGUpIDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1zZXBhcmF0b3IgaGlkZGVuIHNtOmZsZXhcIj5cclxuICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmktYXJyb3ctcmlnaHRcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1zZXBhcmF0b3ItbW9iaWxlIGZsZXggc206aGlkZGVuXCIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICBcImRycC1zZWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiBpc09wZW4gPyBcImFjdGl2ZVwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICBzaG93TWFudWFsRXJyb3IgJiYgIWVuZERhdGUgPyBcImlzLWVycm9yXCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIGRhdGEtc2VjdGlvbj1cImVuZFwiXHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuUG9wb3ZlcihcImVuZFwiKTtcclxuICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtbGFiZWxcIj57bGFiZWxUb308L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtdmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS1jYWxlbmRhcjMgZHJwLWljb25cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiZHJwRW5kVmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIHtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICBpZD1cImRycENsZWFyXCJcclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJwLWNsZWFyXCJcclxuICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfQ2xlYXJSYW5nZVwiLCBcIkNsZWFyIHJhbmdlXCIpfVxyXG4gICAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiBzdGFydERhdGUgfHwgZW5kRGF0ZSA/IFwiaW5saW5lLWZsZXhcIiA6IFwibm9uZVwiIH19XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNsZWFyfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS14LWxnXCIgLz5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICA8ZGl2IGlkPVwiZHJwUG9wb3ZlclwiIHJlZj17cG9wb3ZlclJlZn0gY2xhc3NOYW1lPVwiZHJwLXBvcG92ZXJcIiBoaWRkZW49eyFpc09wZW59PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtaGVhZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJwLW5hdlwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1kaXI9XCJwcmV2XCJcclxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9QcmV2TW9udGhcIiwgXCJQcmV2aW91cyBtb250aFwiKX1cclxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRNb250aCgocHJldikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0ID0gcHJldiAtIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDExO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTE1IDE5bC03LTcgNy03XCIgLz5cclxuICAgICAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJkcnBNb250aExhYmVsXCIgY2xhc3NOYW1lPVwiZHJwLW1vbnRoXCI+e2NhbGVuZGFyLmxhYmVsfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJwLW5hdlwiXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YS1kaXI9XCJuZXh0XCJcclxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9OZXh0TW9udGhcIiwgXCJOZXh0IG1vbnRoXCIpfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgc2V0Q3VycmVudE1vbnRoKChwcmV2KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHQgPSBwcmV2ICsgMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQgPiAxMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNOSA1bDcgNy03IDdcIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtd2Vla2RheXNcIj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X1R1ZVwiLCBcIlR1ZVwiKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfV2VkXCIsIFwiV2VkXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj57aW5kVChcIkhpc3RvcnlfRGF5X0ZyaVwiLCBcIkZyaVwiKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiSGlzdG9yeV9EYXlfU2F0XCIsIFwiU2F0XCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2luZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIGlkPVwiZHJwR3JpZFwiXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1ncmlkXCJcclxuICAgICAgICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7Y2FsZW5kYXIuY2VsbHMubWFwKChjZWxsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbC5pc0VtcHR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPGJ1dHRvbiBrZXk9e2BlbXB0eS0ke2lkeH1gfSBjbGFzc05hbWU9XCJkcnAtZGF5IGVtcHR5XCIgZGlzYWJsZWQgLz47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlT2JqID0gY2VsbC5kYXRlIGFzIERhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNTdGFydCA9IHNhbWVEYXkoZGF0ZU9iaiwgc3RhcnREYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0VuZCA9IHNhbWVEYXkoZGF0ZU9iaiwgZW5kRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5SYW5nZSA9IHN0YXJ0RGF0ZSAmJiBwcmV2aWV3RW5kICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgcHJldmlld0VuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaG92ZXJSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBob3ZlckRhdGUgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBob3ZlckRhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc2FibGVkID0gc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiAhIXN0YXJ0RGF0ZSAmJiBpc0JlZm9yZShkYXRlT2JqLCBzdGFydERhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzVG9kYXkgPSBzYW1lRGF5KGRhdGVPYmosIG5ldyBEYXRlKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXlDbGFzcyA9IGNsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgICBcImRycC1kYXlcIixcclxuICAgICAgICAgICAgICAgICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaXNFbmQgPyBcImVuZCByYW5nZS1lbmRcIiA6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBpblJhbmdlID8gXCJpbi1yYW5nZVwiIDogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPyBcImRpc2FibGVkXCIgOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgaXNUb2RheSA/IFwidG9kYXlcIiA6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2NlbGwuaXNvfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtkYXlDbGFzc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1kYXRlPXtjZWxsLmlzb31cclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ0hpc3RvcnkoXCJkYXlDbGlja1wiLCB7IGRhdGU6IGNlbGwuaXNvLCBkaXNhYmxlZCB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3QoZGF0ZU9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmIHN0YXJ0RGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SG92ZXJEYXRlKG5ldyBEYXRlKGRhdGVPYmopKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkYXRlT2JqLmdldERhdGUoKX1cclxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZHJwU3RhdHVzXCIgY2xhc3NOYW1lPVwiZHJwLXN0YXR1c1wiPlxyXG4gICAgICAgICAgICAgICAgICB7c2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiXHJcbiAgICAgICAgICAgICAgICAgICAgPyBpbmRUKFwiSGlzdG9yeV9TdGF0dXNfU2VsZWN0U3RhcnRcIiwgXCJTZWxlY3Qgc3RhcnQgZGF0ZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIDogaW5kVChcIkhpc3RvcnlfU3RhdHVzX1NlbGVjdEVuZFwiLCBcIlNlbGVjdCBlbmQgZGF0ZVwiKX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICApfVxyXG5cclxuICAgICAgICAgIDxDbGllbnRTZWFyY2hDb21ib2JveFxyXG4gICAgICAgICAgICBrZXk9e2NsaWVudFJlc2V0S2V5fVxyXG4gICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0ZWQ9e2hhbmRsZUNsaWVudFNlbGVjdGVkfVxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsaWVudFwiLCBcIkNsaWVudFwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJDbGllbnRcIil9XHJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJjb21wYWN0XCJcclxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cclxuICAgICAgICAgICAgaWRCYXNlPVwiaGlzdG9yeS1jbGllbnRcIlxyXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICB7c2hvd0ZpbHRlckFjdGlvbnMgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LWZpbHRlci1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICAgICAgICBsYWJlbD17Y2xlYXJMYWJlbH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICAgICAgICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8QWN0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgbGFiZWw9e2FwcGx5TGFiZWx9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBhcHBseUZpbHRlcnMoeyBjbG9zZVBhbmVsOiB0cnVlLCBwYWdlOiAxIH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgICl9XHJcblxyXG4gICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwiZnJvbURhdGVcIiB2YWx1ZT17ZnJvbURhdGVWYWx1ZX0gcmVhZE9ubHkgLz5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cInRvRGF0ZVwiIHZhbHVlPXt0b0RhdGVWYWx1ZX0gcmVhZE9ubHkgLz5cclxuXHJcbiAgICAgIDxkaXZcclxuICAgICAgICBpZD1cInJlc3VsdHNMb2FkZXJcIlxyXG4gICAgICAgIGNsYXNzTmFtZT1cImxvYWRlci1ib3ggZ2xhc3MtcGFuZWwgc2hhZG93LWNhcmQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTcwMFwiXHJcbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaXNMb2FkaW5nID8gXCJmbGV4XCIgOiBcIm5vbmVcIiB9fVxyXG4gICAgICA+XHJcbiAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lciBoLTUgdy01XCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHJvbGU9XCJzdGF0dXNcIiBhcmlhLWxhYmVsPXtpbmRUKFwiSGlzdG9yeV9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX0+XHJcbiAgICAgICAgICA8Y2lyY2xlIGNsYXNzTmFtZT1cImluZC1zcGlubmVyX19jaXJjbGVcIiBjeD1cIjEwXCIgY3k9XCIxMFwiIHI9XCI4XCIgc3Ryb2tlV2lkdGg9XCIyXCIgLz5cclxuICAgICAgICA8L3N2Zz5cclxuICAgICAgICB7aW5kVChcIkhpc3RvcnlfTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9XHJcbiAgICAgIDwvZGl2PlxyXG5cclxuICAgICAge3Nob3dSZXN1bHRzICYmIChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPEhpc3RvcnlUYWJsZVxyXG4gICAgICAgICAgICBpdGVtcz17dGltZWxpbmVJdGVtc31cclxuICAgICAgICAgICAgbm9EYXRhVGV4dD17aW5kVChcIkhpc3RvcnlfTm9EYXRhSW5SYW5nZVwiLCBcIk5vIHZpc2l0cyBpbiB0aGlzIHJhbmdlXCIpfVxyXG4gICAgICAgICAgICBlcnJvck1lc3NhZ2U9e2Vycm9yTWVzc2FnZX1cclxuICAgICAgICAgICAgb25OYXZpZ2F0ZT17aGFuZGxlTmF2aWdhdGV9XHJcbiAgICAgICAgICAvPlxyXG5cclxuICAgICAgICAgIDxDb21wYWN0UGFnaW5hdGlvblxuICAgICAgICAgICAgcmVmPXtwYWdpbmF0aW9uUmVmfVxuICAgICAgICAgICAgdG90YWxQYWdlcz17dG90YWxQYWdlc31cbiAgICAgICAgICAgIGN1cnJlbnRQYWdlPXtjdXJyZW50UGFnZX1cbiAgICAgICAgICAgIHBhZ2VXaW5kb3c9e1BBR0VfV0lORE9XfVxuICAgICAgICAgICAgb25QYWdlQ2hhbmdlPXsocGFnZSkgPT4gbG9hZEFjdGl2aXRpZXMocGFnZSl9XG4gICAgICAgICAgICBsYWJlbHM9e3BhZ2luYXRpb25MYWJlbHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApfVxuICAgICAge2NhbkNyZWF0ZVZpc2l0ICYmIChcclxuICAgICAgICA8RmxvYXRpbmdBY3Rpb25CdXR0b25cbiAgICAgICAgICByb3V0ZT1cIi9WaXNpdGFzL0NyZWF0ZT9mcmVzaD0xXCJcbiAgICAgICAgICBhcmlhTGFiZWw9e2luZFQoXCJDb21tb25fQ3JlYXRlXCIsIFwiQ3JlYXRlXCIpfVxuICAgICAgICAgIHNpemU9ezc2fVxuICAgICAgICAgIHJpZ2h0PXsxNn1cbiAgICAgICAgICBib3R0b209e2ZhYkJvdHRvbX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIE1vdW50IGhlbHBlciBmb3IgdGhlIGxlZ2FjeSBSYXpvciB2aWV3LlxyXG5leHBvcnQgY29uc3QgbW91bnRIaXN0b3J5UGFnZSA9IChyb290OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gIGNvbnN0IGRlZmF1bHRGcm9tRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LWZyb21cIikgfHwgXCJcIjtcclxuICBjb25zdCBkZWZhdWx0VG9EYXRlID0gcm9vdC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWRlZmF1bHQtdG9cIikgfHwgXCJcIjtcclxuXHJcbiAgY29uc3QgZWxlbWVudCA9IDxIaXN0b3J5UGFnZSBkZWZhdWx0RnJvbURhdGU9e2RlZmF1bHRGcm9tRGF0ZX0gZGVmYXVsdFRvRGF0ZT17ZGVmYXVsdFRvRGF0ZX0gLz47XHJcbiAgY29uc3QgZXhpc3RpbmcgPSAocm9vdCBhcyBIVE1MRWxlbWVudCAmIHsgX19pbmRSb290PzogaW1wb3J0KFwicmVhY3QtZG9tL2NsaWVudFwiKS5Sb290IH0pLl9faW5kUm9vdDtcclxuXHJcbiAgaWYgKGV4aXN0aW5nKSB7XHJcbiAgICBleGlzdGluZy5yZW5kZXIoZWxlbWVudCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWFjdFJvb3QgPSBjcmVhdGVSb290KHJvb3QpO1xyXG4gIChyb290IGFzIEhUTUxFbGVtZW50ICYgeyBfX2luZFJvb3Q/OiBpbXBvcnQoXCJyZWFjdC1kb20vY2xpZW50XCIpLlJvb3QgfSkuX19pbmRSb290ID0gcmVhY3RSb290O1xyXG4gIHJlYWN0Um9vdC5yZW5kZXIoZWxlbWVudCk7XHJcbn07XHJcblxyXG5jb25zdCBtb3VudCA9ICgpID0+IHtcclxuICBjb25zdCByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpc2l0YXMtaGlzdG9yeS1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcbiAgbW91bnRIaXN0b3J5UGFnZShyb290RWwpO1xyXG59O1xyXG5cclxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJpbnRlcmFjdGl2ZVwiKSB7XHJcbiAgICBtb3VudCgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBtb3VudCk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5UGFnZTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgVGltZWxpbmVEYXRlUGFydHMgPSB7XHJcbiAgeWVhcjogc3RyaW5nO1xyXG4gIG1vbnRoOiBzdHJpbmc7XHJcbiAgZGF5OiBzdHJpbmc7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBUaW1lbGluZUl0ZW0gPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBhY3RpdmlkYWRJZD86IHN0cmluZztcclxuICByZWNJZD86IG51bWJlciB8IG51bGw7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZnVsbE5hbWU6IHN0cmluZztcclxuICBmdWxsRGVzYzogc3RyaW5nO1xyXG4gIGRhdGVQYXJ0czogVGltZWxpbmVEYXRlUGFydHM7XHJcbiAgaXNOb0RhdGE6IGJvb2xlYW47XHJcbn07XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGl0ZW1zOiBUaW1lbGluZUl0ZW1bXTtcclxuICBub0RhdGFUZXh0OiBzdHJpbmc7XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgb25OYXZpZ2F0ZTogKGxpbmtJZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuY29uc3QgVEFQX01PVkVfUFggPSAxNDtcclxuY29uc3QgVE9PTFRJUF9UT1VDSF9ERUxBWV9NUyA9IDEyMDtcclxuY29uc3QgSE9MRF9UT19QUkVWSUVXX01TID0gMTYwO1xyXG5jb25zdCBUT09MVElQX01BWF9IRUlHSFRfUkFUSU8gPSAwLjg7XHJcbmNvbnN0IFRPT0xUSVBfQkFTRV9GT05UID0gMTM7XHJcbmNvbnN0IFRPT0xUSVBfTUlOX0ZPTlQgPSAxMTtcclxuY29uc3QgRUxMSVBTSVMgPSBcIi4uLlwiO1xyXG5jb25zdCBQSVhFTF9HQVAgPSA1O1xyXG5jb25zdCBQSVhFTF9TUEVFRCA9IDk1O1xyXG5jb25zdCBQSVhFTF9DT0xPUlMgPSBbXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMDgpXCIsIFwicmdiYSgwLCA0MSwgMTA3LCAwLjE2KVwiLCBcInJnYmEoMCwgNDEsIDEwNywgMC4yNilcIl07XHJcblxyXG50eXBlIFBpeGVsU3RhdGUgPSB7XHJcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICBwaXhlbHM6IFBpeGVsW107XHJcbiAgYW5pbUlkOiBudW1iZXIgfCBudWxsO1xyXG4gIGxhc3RUaW1lOiBudW1iZXI7XHJcbiAgcmVkdWNlZE1vdGlvbjogYm9vbGVhbjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG59O1xyXG5cclxuLy8gQ29tcHV0ZSBwaXhlbCBzcGVlZCB3aGlsZSByZXNwZWN0aW5nIHJlZHVjZWQgbW90aW9uIHByZWZlcmVuY2UuXHJcbmNvbnN0IGdldEVmZmVjdGl2ZVNwZWVkID0gKHZhbHVlOiBudW1iZXIsIHJlZHVjZWRNb3Rpb246IGJvb2xlYW4pID0+IHtcclxuICBjb25zdCBtaW4gPSAwO1xyXG4gIGNvbnN0IG1heCA9IDEwMDtcclxuICBjb25zdCB0aHJvdHRsZSA9IDAuMDAxO1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlci5wYXJzZUludChTdHJpbmcodmFsdWUpLCAxMCk7XHJcblxyXG4gIGlmIChwYXJzZWQgPD0gbWluIHx8IHJlZHVjZWRNb3Rpb24pIHJldHVybiBtaW47XHJcbiAgaWYgKHBhcnNlZCA+PSBtYXgpIHJldHVybiBtYXggKiB0aHJvdHRsZTtcclxuICByZXR1cm4gcGFyc2VkICogdGhyb3R0bGU7XHJcbn07XHJcblxyXG4vLyBQaXhlbCB1c2VkIGJ5IHRoZSBob3ZlciBhbmltYXRpb24gY2FudmFzLlxyXG5jbGFzcyBQaXhlbCB7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG4gIGNvbG9yOiBzdHJpbmc7XHJcbiAgc3BlZWQ6IG51bWJlcjtcclxuICBzaXplOiBudW1iZXI7XHJcbiAgc2l6ZVN0ZXA6IG51bWJlcjtcclxuICBtaW5TaXplOiBudW1iZXI7XHJcbiAgbWF4U2l6ZUludGVnZXI6IG51bWJlcjtcclxuICBtYXhTaXplOiBudW1iZXI7XHJcbiAgcGhhc2U6IG51bWJlcjtcclxuICBwaGFzZVN0ZXA6IG51bWJlcjtcclxuICBkZWxheTogbnVtYmVyO1xyXG4gIGNvdW50ZXI6IG51bWJlcjtcclxuICBjb3VudGVyU3RlcDogbnVtYmVyO1xyXG4gIGlzSWRsZTogYm9vbGVhbjtcclxuICBpc1JldmVyc2U6IGJvb2xlYW47XHJcbiAgaXNTaGltbWVyOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHg6IG51bWJlciwgeTogbnVtYmVyLCBjb2xvcjogc3RyaW5nLCBzcGVlZDogbnVtYmVyLCBkZWxheTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgdGhpcy5jdHggPSBjb250ZXh0O1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB0aGlzLnNwZWVkID0gdGhpcy5nZXRSYW5kb21WYWx1ZSgwLjEsIDAuOSkgKiBzcGVlZDtcclxuICAgIHRoaXMuc2l6ZSA9IDA7XHJcbiAgICB0aGlzLnNpemVTdGVwID0gTWF0aC5yYW5kb20oKSAqIDAuMyArIDAuMTtcclxuICAgIHRoaXMubWluU2l6ZSA9IDAuNTtcclxuICAgIHRoaXMubWF4U2l6ZUludGVnZXIgPSAyO1xyXG4gICAgdGhpcy5tYXhTaXplID0gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLm1pblNpemUsIHRoaXMubWF4U2l6ZUludGVnZXIpO1xyXG4gICAgdGhpcy5kZWxheSA9IGRlbGF5O1xyXG4gICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgIHRoaXMuY291bnRlclN0ZXAgPSBNYXRoLnJhbmRvbSgpICogNSArICh0aGlzLndpZHRoICsgdGhpcy5oZWlnaHQpICogMC4wMTU7XHJcbiAgICB0aGlzLmlzSWRsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1JldmVyc2UgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNTaGltbWVyID0gZmFsc2U7XHJcbiAgICB0aGlzLnBoYXNlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xyXG4gICAgdGhpcy5waGFzZVN0ZXAgPSBNYXRoLm1heCgwLCB0aGlzLnNwZWVkICogKDAuOCArIE1hdGgucmFuZG9tKCkgKiAwLjYpKTtcclxuICB9XHJcblxyXG4gIC8vIFJldHVybiBhIHJhbmRvbSBmbG9hdCBiZXR3ZWVuIG1pbiBhbmQgbWF4LlxyXG4gIGdldFJhbmRvbVZhbHVlKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcclxuICB9XHJcblxyXG4gIC8vIERyYXcgdGhlIHBpeGVsIGF0IGl0cyBjdXJyZW50IHNpemUuXHJcbiAgZHJhdygpIHtcclxuICAgIGNvbnN0IGNlbnRlck9mZnNldCA9IHRoaXMubWF4U2l6ZUludGVnZXIgKiAwLjUgLSB0aGlzLnNpemUgKiAwLjU7XHJcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy54ICsgY2VudGVyT2Zmc2V0LCB0aGlzLnkgKyBjZW50ZXJPZmZzZXQsIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcclxuICB9XHJcblxyXG4gIC8vIEFuaW1hdGUgdGhlIHBpeGVsIGFwcGVhcmluZy5cclxuICBhcHBlYXIoKSB7XHJcbiAgICB0aGlzLmlzSWRsZSA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuY291bnRlciA8PSB0aGlzLmRlbGF5KSB7XHJcbiAgICAgIHRoaXMuY291bnRlciArPSB0aGlzLmNvdW50ZXJTdGVwO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSkge1xyXG4gICAgICB0aGlzLmlzU2hpbW1lciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc1NoaW1tZXIpIHtcclxuICAgICAgdGhpcy5zaGltbWVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNpemUgKz0gdGhpcy5zaXplU3RlcDtcclxuICAgIH1cclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxuXHJcbiAgLy8gQW5pbWF0ZSB0aGUgcGl4ZWwgZGlzYXBwZWFyaW5nLlxyXG4gIGRpc2FwcGVhcigpIHtcclxuICAgIHRoaXMuaXNTaGltbWVyID0gZmFsc2U7XHJcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgaWYgKHRoaXMuc2l6ZSA8PSAwKSB7XHJcbiAgICAgIHRoaXMuaXNJZGxlID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaXplIC09IDAuMTtcclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxuXHJcbiAgLy8gT3NjaWxsYXRlIHBpeGVsIHNpemUgd2hpbGUgdmlzaWJsZS5cclxuICBzaGltbWVyKCkge1xyXG4gICAgaWYgKCF0aGlzLnBoYXNlU3RlcCkgcmV0dXJuO1xyXG4gICAgdGhpcy5waGFzZSArPSB0aGlzLnBoYXNlU3RlcDtcclxuICAgIGNvbnN0IGFtcCA9ICh0aGlzLm1heFNpemUgLSB0aGlzLm1pblNpemUpICogMC41O1xyXG4gICAgdGhpcy5zaXplID0gdGhpcy5taW5TaXplICsgYW1wICsgYW1wICogTWF0aC5zaW4odGhpcy5waGFzZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDcmVhdGUgdGhlIHBpeGVsIGNhbnZhcyBob3ZlciBlZmZlY3QgZm9yIGEgdGltZWxpbmUgY2FyZC5cclxuY29uc3QgY3JlYXRlUGl4ZWxFZmZlY3QgPSAoY2FyZEVsOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gIGlmICghY2FyZEVsKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gIGNhbnZhcy5jbGFzc05hbWUgPSBcInRpbWVsaW5lLXBpeGVsLWNhbnZhc1wiO1xyXG4gIGNhcmRFbC5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5cclxuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIGlmICghY3R4KSB7XHJcbiAgICBjYW52YXMucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlZHVjZWRNb3Rpb24gPSB3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpLm1hdGNoZXM7XHJcbiAgY29uc3Qgc3RhdGU6IFBpeGVsU3RhdGUgPSB7XHJcbiAgICBjYW52YXMsXHJcbiAgICBjdHgsXHJcbiAgICBwaXhlbHM6IFtdLFxyXG4gICAgYW5pbUlkOiBudWxsLFxyXG4gICAgbGFzdFRpbWU6IHBlcmZvcm1hbmNlLm5vdygpLFxyXG4gICAgcmVkdWNlZE1vdGlvbixcclxuICAgIHdpZHRoOiAwLFxyXG4gICAgaGVpZ2h0OiAwLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGluaXRQaXhlbHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByZWN0ID0gY2FyZEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHJlY3Qud2lkdGgpKTtcclxuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVjdC5oZWlnaHQpKTtcclxuICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkgcmV0dXJuO1xyXG5cclxuICAgIHN0YXRlLndpZHRoID0gd2lkdGg7XHJcbiAgICBzdGF0ZS5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XHJcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcclxuXHJcbiAgICBjb25zdCBnYXAgPSBNYXRoLm1heCgzLCBNYXRoLmZsb29yKFBJWEVMX0dBUCkpO1xyXG4gICAgY29uc3Qgc3BlZWQgPSBnZXRFZmZlY3RpdmVTcGVlZChQSVhFTF9TUEVFRCwgcmVkdWNlZE1vdGlvbik7XHJcbiAgICBjb25zdCBwaXhlbHM6IFBpeGVsW10gPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4ICs9IGdhcCkge1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSArPSBnYXApIHtcclxuICAgICAgICBjb25zdCBjb2xvciA9IFBJWEVMX0NPTE9SU1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBQSVhFTF9DT0xPUlMubGVuZ3RoKV07XHJcbiAgICAgICAgY29uc3QgZHggPSB4IC0gd2lkdGggLyAyO1xyXG4gICAgICAgIGNvbnN0IGR5ID0geSAtIGhlaWdodCAvIDI7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gcmVkdWNlZE1vdGlvbiA/IDAgOiBkaXN0YW5jZSAqIDAuMzU7XHJcbiAgICAgICAgcGl4ZWxzLnB1c2gobmV3IFBpeGVsKGNhbnZhcywgY3R4LCB4LCB5LCBjb2xvciwgc3BlZWQsIGRlbGF5KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0ZS5waXhlbHMgPSBwaXhlbHM7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZG9BbmltYXRlID0gKGZuTmFtZTogXCJhcHBlYXJcIiB8IFwiZGlzYXBwZWFyXCIpID0+IHtcclxuICAgIHN0YXRlLmFuaW1JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBkb0FuaW1hdGUoZm5OYW1lKSk7XHJcbiAgICBjb25zdCB0aW1lTm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICBjb25zdCB0aW1lUGFzc2VkID0gdGltZU5vdyAtIHN0YXRlLmxhc3RUaW1lO1xyXG4gICAgY29uc3QgdGltZUludGVydmFsID0gMTAwMCAvIDYwO1xyXG5cclxuICAgIGlmICh0aW1lUGFzc2VkIDwgdGltZUludGVydmFsKSByZXR1cm47XHJcbiAgICBzdGF0ZS5sYXN0VGltZSA9IHRpbWVOb3cgLSAodGltZVBhc3NlZCAlIHRpbWVJbnRlcnZhbCk7XHJcblxyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzdGF0ZS53aWR0aCwgc3RhdGUuaGVpZ2h0KTtcclxuXHJcbiAgICBsZXQgYWxsSWRsZSA9IHRydWU7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXRlLnBpeGVscy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCBwaXhlbCA9IHN0YXRlLnBpeGVsc1tpXTtcclxuICAgICAgcGl4ZWxbZm5OYW1lXSgpO1xyXG4gICAgICBpZiAoIXBpeGVsLmlzSWRsZSkgYWxsSWRsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGFsbElkbGUgJiYgc3RhdGUuYW5pbUlkKSB7XHJcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHN0YXRlLmFuaW1JZCk7XHJcbiAgICAgIHN0YXRlLmFuaW1JZCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW5pbWF0aW9uID0gKG5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XHJcbiAgICBpZiAoIXN0YXRlLnBpeGVscy5sZW5ndGgpIHJldHVybjtcclxuICAgIGlmIChzdGF0ZS5hbmltSWQpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHN0YXRlLmFuaW1JZCk7XHJcbiAgICBzdGF0ZS5sYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgc3RhdGUuYW5pbUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGRvQW5pbWF0ZShuYW1lKSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb25FbnRlciA9ICgpID0+IGhhbmRsZUFuaW1hdGlvbihcImFwcGVhclwiKTtcclxuICBjb25zdCBvbkxlYXZlID0gKCkgPT4gaGFuZGxlQW5pbWF0aW9uKFwiZGlzYXBwZWFyXCIpO1xyXG5cclxuICBjYXJkRWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25FbnRlcik7XHJcbiAgY2FyZEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTGVhdmUpO1xyXG5cclxuICBsZXQgcm86IFJlc2l6ZU9ic2VydmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoaW5pdFBpeGVscyk7XHJcbiAgICByby5vYnNlcnZlKGNhcmRFbCk7XHJcbiAgfVxyXG5cclxuICBpbml0UGl4ZWxzKCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjYXJkRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25FbnRlcik7XHJcbiAgICBjYXJkRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25MZWF2ZSk7XHJcbiAgICBpZiAoc3RhdGUuYW5pbUlkKSBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xyXG4gICAgaWYgKHJvKSByby5kaXNjb25uZWN0KCk7XHJcbiAgICBjYW52YXMucmVtb3ZlKCk7XHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFNob3J0ZW4gb3ZlcmZsb3dpbmcgdGV4dCB3aXRoIGEgY29tcHV0ZWQgZWxsaXBzaXMuXHJcbmNvbnN0IGFwcGx5RWxsaXBzaXMgPSAoZWw6IEhUTUxFbGVtZW50LCBmdWxsVGV4dDogc3RyaW5nLCBtdWx0aUxpbmU6IGJvb2xlYW4pID0+IHtcclxuICBpZiAoIWVsIHx8ICFmdWxsVGV4dCkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChtdWx0aUxpbmUgJiYgZWwuY2xpZW50SGVpZ2h0ID09PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKCFtdWx0aUxpbmUgJiYgZWwuY2xpZW50V2lkdGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKG11bHRpTGluZSkge1xyXG4gICAgY29uc3QgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XHJcbiAgICBsZXQgbGluZUhlaWdodCA9IE51bWJlci5wYXJzZUZsb2F0KGNvbXB1dGVkLmxpbmVIZWlnaHQpO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUobGluZUhlaWdodCkpIHtcclxuICAgICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBsaW5lSGVpZ2h0ID0gcmVjdC5oZWlnaHQgPiAwID8gcmVjdC5oZWlnaHQgLyAyIDogMDtcclxuICAgIH1cclxuICAgIGlmIChsaW5lSGVpZ2h0ID4gMCkge1xyXG4gICAgICBlbC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGxpbmVIZWlnaHQgKiAyKX1weGA7XHJcbiAgICAgIGVsLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVsLnRleHRDb250ZW50ID0gZnVsbFRleHQ7XHJcblxyXG4gIGNvbnN0IGlzT3ZlcmZsb3dpbmcgPSAoKSA9PiAoXHJcbiAgICBtdWx0aUxpbmVcclxuICAgICAgPyBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgKyAxXHJcbiAgICAgIDogZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCArIDFcclxuICApO1xyXG5cclxuICBpZiAoIWlzT3ZlcmZsb3dpbmcoKSkge1xyXG4gICAgZWwuZGF0YXNldC5wcmV2aWV3ID0gXCIwXCI7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBsZXQgbG93ID0gMDtcclxuICBsZXQgaGlnaCA9IGZ1bGxUZXh0Lmxlbmd0aDtcclxuICBsZXQgYmVzdCA9IDA7XHJcblxyXG4gIHdoaWxlIChsb3cgPD0gaGlnaCkge1xyXG4gICAgY29uc3QgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKTtcclxuICAgIGNvbnN0IGNhbmRpZGF0ZSA9IGAke2Z1bGxUZXh0LnNsaWNlKDAsIE1hdGgubWF4KDAsIG1pZCkpLnRyaW1FbmQoKX0ke0VMTElQU0lTfWA7XHJcbiAgICBlbC50ZXh0Q29udGVudCA9IGNhbmRpZGF0ZTtcclxuICAgIGlmIChpc092ZXJmbG93aW5nKCkpIHtcclxuICAgICAgaGlnaCA9IG1pZCAtIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBiZXN0ID0gbWlkO1xyXG4gICAgICBsb3cgPSBtaWQgKyAxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWwudGV4dENvbnRlbnQgPSBgJHtmdWxsVGV4dC5zbGljZSgwLCBNYXRoLm1heCgwLCBiZXN0KSkudHJpbUVuZCgpfSR7RUxMSVBTSVN9YDtcclxuICBlbC5kYXRhc2V0LnByZXZpZXcgPSBcIjFcIjtcclxuICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbnR5cGUgVGFwR3VhcmRTdGF0ZSA9IHtcbiAgYWN0aXZlOiBib29sZWFuO1xuICBwb2ludGVySWQ6IG51bWJlciB8IG51bGw7XG4gIHN0YXJ0WDogbnVtYmVyO1xuICBzdGFydFk6IG51bWJlcjtcbiAgc3RhcnRUaW1lOiBudW1iZXI7XG4gIG1vdmVkOiBib29sZWFuO1xuICBsaW5rSWQ6IHN0cmluZztcbn07XG5cclxuY29uc3QgSGlzdG9yeVRhYmxlID0gKHsgaXRlbXMsIG5vRGF0YVRleHQsIGVycm9yTWVzc2FnZSwgb25OYXZpZ2F0ZSB9OiBQcm9wcykgPT4ge1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgdG9vbHRpcFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB0b29sdGlwQW5jaG9yUmVmID0gdXNlUmVmPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHRvb2x0aXBDbG9zZUJvdW5kUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgdGFwR3VhcmRSZWYgPSB1c2VSZWY8VGFwR3VhcmRTdGF0ZT4oe1xuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgcG9pbnRlcklkOiBudWxsLFxuICAgIHN0YXJ0WDogMCxcbiAgICBzdGFydFk6IDAsXG4gICAgc3RhcnRUaW1lOiAwLFxuICAgIG1vdmVkOiBmYWxzZSxcbiAgICBsaW5rSWQ6IFwiXCIsXG4gIH0pO1xuXG4gIGNvbnN0IHJlc29sdmVDbGlja2FibGVDYXJkID0gdXNlQ2FsbGJhY2soKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgY29uc3QgY2FyZCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZC0tY2xpY2thYmxlW2RhdGEtbGluay1pZF1cIik7XG4gICAgaWYgKCFjYXJkKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoIWNvbnRhaW5lclJlZi5jdXJyZW50Py5jb250YWlucyhjYXJkKSkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIGNhcmQ7XG4gIH0sIFtdKTtcblxuICBjb25zdCByZXNldFRhcEd1YXJkID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gZmFsc2U7XG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5wb2ludGVySWQgPSBudWxsO1xuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmxpbmtJZCA9IFwiXCI7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyRG93biA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKGV2ZW50LnBvaW50ZXJUeXBlID09PSBcIm1vdXNlXCIgJiYgZXZlbnQuYnV0dG9uICE9PSAwKSByZXR1cm47XG4gICAgICBjb25zdCBjYXJkID0gcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KTtcbiAgICAgIGlmICghY2FyZCkgcmV0dXJuO1xuICAgICAgY29uc3QgbGlua0lkID0gY2FyZC5kYXRhc2V0LmxpbmtJZCB8fCBcIlwiO1xuICAgICAgaWYgKCFsaW5rSWQpIHJldHVybjtcblxuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5hY3RpdmUgPSB0cnVlO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5wb2ludGVySWQgPSBldmVudC5wb2ludGVySWQ7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0WCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0WSA9IGV2ZW50LmNsaWVudFk7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmxpbmtJZCA9IGxpbmtJZDtcbiAgICB9LFxuICAgIFtyZXNvbHZlQ2xpY2thYmxlQ2FyZF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyTW92ZSA9IHVzZUNhbGxiYWNrKChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gdGFwR3VhcmRSZWYuY3VycmVudDtcbiAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBldmVudC5wb2ludGVySWQgIT09IHN0YXRlLnBvaW50ZXJJZCkgcmV0dXJuO1xuICAgIGNvbnN0IGR4ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WCAtIHN0YXRlLnN0YXJ0WCk7XG4gICAgY29uc3QgZHkgPSBNYXRoLmFicyhldmVudC5jbGllbnRZIC0gc3RhdGUuc3RhcnRZKTtcbiAgICBpZiAoZHggPiBUQVBfTU9WRV9QWCB8fCBkeSA+IFRBUF9NT1ZFX1BYKSB7XG4gICAgICBzdGF0ZS5tb3ZlZCA9IHRydWU7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlclVwID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHRhcEd1YXJkUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoIXN0YXRlLmFjdGl2ZSB8fCBldmVudC5wb2ludGVySWQgIT09IHN0YXRlLnBvaW50ZXJJZCkgcmV0dXJuO1xuICAgICAgY29uc3QgbGlua0lkID0gc3RhdGUubGlua0lkO1xuICAgICAgY29uc3QgaGVsZE1zID0gRGF0ZS5ub3coKSAtIHN0YXRlLnN0YXJ0VGltZTtcbiAgICAgIGNvbnN0IHNob3VsZFRhcCA9ICFzdGF0ZS5tb3ZlZCAmJiBoZWxkTXMgPCBIT0xEX1RPX1BSRVZJRVdfTVM7XG4gICAgICByZXNldFRhcEd1YXJkKCk7XG4gICAgICBpZiAoc2hvdWxkVGFwICYmIGxpbmtJZCkge1xuICAgICAgICBvbk5hdmlnYXRlKGxpbmtJZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbb25OYXZpZ2F0ZSwgcmVzZXRUYXBHdWFyZF1cbiAgKTtcblxuICBjb25zdCBibG9ja0NsaXBib2FyZEFjdGlvbiA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuQ2xpcGJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+IHwgUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmICghcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9LFxuICAgIFtyZXNvbHZlQ2xpY2thYmxlQ2FyZF1cbiAgKTtcblxyXG4gIC8vIEVuc3VyZSB0aGUgc2hhcmVkIHRvb2x0aXAgZWxlbWVudCBleGlzdHMgb25jZS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHRvb2x0aXBSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgbGV0IHRvb2x0aXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVsaW5lVG9vbHRpcFwiKSBhcyBIVE1MRGl2RWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIXRvb2x0aXApIHtcclxuICAgICAgdG9vbHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHRvb2x0aXAuaWQgPSBcInRpbWVsaW5lVG9vbHRpcFwiO1xyXG4gICAgICB0b29sdGlwLmNsYXNzTmFtZSA9IFwidGltZWxpbmUtdG9vbHRpcFwiO1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRvb2x0aXApO1xyXG4gICAgfVxyXG4gICAgdG9vbHRpcFJlZi5jdXJyZW50ID0gdG9vbHRpcDtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgdG9vbHRpcEVsID0gdG9vbHRpcFJlZi5jdXJyZW50O1xuICAgIGlmICghY29udGFpbmVyIHx8ICF0b29sdGlwRWwpIHJldHVybjtcblxuICAgIGNvbnN0IGNsZWFudXBzOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuXHJcbiAgICAvLyBDbG9zZSB0b29sdGlwIG9uIG91dHNpZGUgaW50ZXJhY3Rpb24uXHJcbiAgICBpZiAoIXRvb2x0aXBDbG9zZUJvdW5kUmVmLmN1cnJlbnQpIHtcclxuICAgICAgdG9vbHRpcENsb3NlQm91bmRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIGNvbnN0IG9uUG9pbnRlckRvd24gPSAoZXZlbnQ6IFBvaW50ZXJFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmICghdG9vbHRpcEVsLmNsYXNzTGlzdC5jb250YWlucyhcInZpc2libGVcIikpIHJldHVybjtcclxuICAgICAgICBjb25zdCBhbmNob3IgPSB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQ7XHJcbiAgICAgICAgaWYgKGFuY2hvciAmJiBhbmNob3IuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpKSByZXR1cm47XHJcbiAgICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IG9uS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93biwgdHJ1ZSk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XHJcbiAgICAgIGNsZWFudXBzLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBvblBvaW50ZXJEb3duLCB0cnVlKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gICAgICAgIHRvb2x0aXBDbG9zZUJvdW5kUmVmLmN1cnJlbnQgPSBmYWxzZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2hvdyB0b29sdGlwIGNvbnRlbnQgY2VudGVyZWQgb24gc2NyZWVuLlxyXG4gICAgY29uc3Qgc2hvd1Rvb2x0aXAgPSAodGV4dDogc3RyaW5nLCBhbmNob3I/OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICB0b29sdGlwRWwudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbiAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IGFuY2hvciB8fCBudWxsO1xyXG5cclxuICAgICAgY29uc3QgY2VudGVyWCA9IE1hdGgucm91bmQod2luZG93LmlubmVyV2lkdGggLyAyKTtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLmxlZnQgPSBgJHtjZW50ZXJYfXB4YDtcclxuXHJcbiAgICAgIGNvbnN0IG1hcmdpbiA9IDEyO1xyXG4gICAgICB0b29sdGlwRWwuc3R5bGUubWF4SGVpZ2h0ID0gYCR7TWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJIZWlnaHQgKiBUT09MVElQX01BWF9IRUlHSFRfUkFUSU8pfXB4YDtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLm92ZXJmbG93WSA9IFwiYXV0b1wiO1xyXG5cclxuICAgICAgbGV0IGZvbnRTaXplID0gVE9PTFRJUF9CQVNFX0ZPTlQ7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplfXB4YDtcclxuXHJcbiAgICAgIGxldCByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBjb25zdCBtYXhIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiBUT09MVElQX01BWF9IRUlHSFRfUkFUSU87XHJcbiAgICAgIHdoaWxlIChyZWN0LmhlaWdodCA+IG1heEhlaWdodCAmJiBmb250U2l6ZSA+IFRPT0xUSVBfTUlOX0ZPTlQpIHtcclxuICAgICAgICBmb250U2l6ZSAtPSAxO1xyXG4gICAgICAgIHRvb2x0aXBFbC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplfXB4YDtcclxuICAgICAgICByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjZW50ZXJZID0gTWF0aC5yb3VuZCgod2luZG93LmlubmVySGVpZ2h0IC0gcmVjdC5oZWlnaHQpIC8gMik7XHJcbiAgICAgIGxldCB0b3AgPSBOdW1iZXIuaXNGaW5pdGUoY2VudGVyWSkgPyBjZW50ZXJZIDogbWFyZ2luO1xyXG4gICAgICBjb25zdCBtaW5Ub3AgPSBtYXJnaW47XHJcbiAgICAgIGNvbnN0IG1heFRvcCA9IE1hdGgubWF4KG1hcmdpbiwgd2luZG93LmlubmVySGVpZ2h0IC0gcmVjdC5oZWlnaHQgLSBtYXJnaW4pO1xyXG4gICAgICBpZiAodG9wIDwgbWluVG9wKSB0b3AgPSBtaW5Ub3A7XHJcbiAgICAgIGlmICh0b3AgPiBtYXhUb3ApIHRvcCA9IG1heFRvcDtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEhpZGUgdG9vbHRpcCBjb250ZW50LlxyXG4gICAgY29uc3QgaGlkZVRvb2x0aXAgPSAoKSA9PiB7XHJcbiAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRGVjaWRlIGlmIGEgdG9vbHRpcCBzaG91bGQgZGlzcGxheS5cbiAgICBjb25zdCBzaG91bGRQcmV2aWV3ID0gKGVsOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgaWYgKCFlbC5kYXRhc2V0IHx8ICFlbC5kYXRhc2V0LmZ1bGx0ZXh0KSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoZWwuZGF0YXNldC5wcmV2aWV3ID09PSBcIjFcIikgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCArIDEgfHwgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICsgMTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzb2x2ZVRvb2x0aXBUYXJnZXQgPSAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCB0ZXh0RWwgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLW5hbWUsIC50aW1lbGluZS1kZXNjLXRleHRcIik7XG4gICAgICBpZiAoIXRleHRFbCB8fCAhY29udGFpbmVyLmNvbnRhaW5zKHRleHRFbCkpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHRleHRFbDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2hvd1Rvb2x0aXBGb3JFbGVtZW50ID0gKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICAgIGlmICghZWwpIHJldHVybjtcbiAgICAgIGNvbnN0IHRleHQgPSBlbC5kYXRhc2V0LmZ1bGx0ZXh0IHx8IGVsLnRleHRDb250ZW50IHx8IFwiXCI7XG4gICAgICBpZiAoIXRleHQgfHwgIXNob3VsZFByZXZpZXcoZWwpKSByZXR1cm47XG4gICAgICBzaG93VG9vbHRpcCh0ZXh0LCBlbCk7XG4gICAgfTtcblxuICAgIGxldCBhY3RpdmVUb29sdGlwRWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IHByZXNzVGltZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3QgY2xlYXJQcmVzc1RpbWVyID0gKCkgPT4ge1xuICAgICAgaWYgKHByZXNzVGltZXIgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcbiAgICAgIHByZXNzVGltZXIgPSBudWxsO1xuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlT3ZlciA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGV4dEVsID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQudGFyZ2V0KTtcbiAgICAgIGlmICghdGV4dEVsKSByZXR1cm47XG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSB0ZXh0RWw7XG4gICAgICBzaG93VG9vbHRpcEZvckVsZW1lbnQodGV4dEVsKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZU91dCA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZnJvbSA9IHJlc29sdmVUb29sdGlwVGFyZ2V0KGV2ZW50LnRhcmdldCk7XG4gICAgICBpZiAoIWZyb20pIHJldHVybjtcbiAgICAgIGNvbnN0IHRvID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQucmVsYXRlZFRhcmdldCk7XG4gICAgICBpZiAodG8gJiYgdG8gPT09IGZyb20pIHJldHVybjtcbiAgICAgIGhpZGVUb29sdGlwKCk7XG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSBudWxsO1xuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9ICgpID0+IHtcbiAgICAgIGlmICghYWN0aXZlVG9vbHRpcEVsKSByZXR1cm47XG4gICAgICBpZiAoIXRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSByZXR1cm47XG4gICAgICBzaG93VG9vbHRpcEZvckVsZW1lbnQoYWN0aXZlVG9vbHRpcEVsKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaFN0YXJ0ID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0RWwgPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC50YXJnZXQpO1xuICAgICAgaWYgKCF0ZXh0RWwpIHJldHVybjtcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IHRleHRFbDtcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xuICAgICAgcHJlc3NUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2hvd1Rvb2x0aXBGb3JFbGVtZW50KHRleHRFbCk7XG4gICAgICB9LCBUT09MVElQX1RPVUNIX0RFTEFZX01TKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaE1vdmUgPSAoKSA9PiB7XG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcbiAgICAgIGhpZGVUb29sdGlwKCk7XG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSBudWxsO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoRW5kID0gKCkgPT4ge1xuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XG4gICAgfTtcblxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG9uTW91c2VPdmVyKTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIG9uTW91c2VPdXQpO1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Ub3VjaFN0YXJ0LCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgb25Ub3VjaE1vdmUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIG9uVG91Y2hFbmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IG9uU2VsZWN0U3RhcnQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBpZiAoIXJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCkpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNlbGVjdHN0YXJ0XCIsIG9uU2VsZWN0U3RhcnQpO1xuXG4gICAgY2xlYW51cHMucHVzaCgoKSA9PiB7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBvbk1vdXNlT3Zlcik7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIG9uTW91c2VPdXQpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uVG91Y2hTdGFydCk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZSk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIG9uVG91Y2hFbmQpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzZWxlY3RzdGFydFwiLCBvblNlbGVjdFN0YXJ0KTtcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFlcnJvck1lc3NhZ2UpIHtcbiAgICAgIGNvbnN0IGNhcmRzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmRcIik7XG4gICAgICBjYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICAgIGlmICghY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0aW1lbGluZS1jYXJkLS1ub2RhdGFcIikpIHtcbiAgICAgICAgICBjb25zdCBjbGVhbnVwUGl4ZWwgPSBjcmVhdGVQaXhlbEVmZmVjdChjYXJkKTtcbiAgICAgICAgICBpZiAoY2xlYW51cFBpeGVsKSBjbGVhbnVwcy5wdXNoKGNsZWFudXBQaXhlbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBmcmFtZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHRFbHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtbmFtZSwgLnRpbWVsaW5lLWRlc2MtdGV4dFwiKTtcbiAgICAgICAgdGV4dEVscy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRleHQgPSBlbC5kYXRhc2V0LmZ1bGx0ZXh0IHx8IGVsLnRleHRDb250ZW50IHx8IFwiXCI7XG4gICAgICAgICAgYXBwbHlFbGxpcHNpcyhlbCwgdGV4dCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGNsZWFudXBzLnB1c2goKCkgPT4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGZyYW1lSWQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYW51cHMuZm9yRWFjaCgoY2xlYW51cCkgPT4gY2xlYW51cCgpKTtcbiAgICB9O1xuICB9LCBbZXJyb3JNZXNzYWdlLCBpdGVtcywgcmVzb2x2ZUNsaWNrYWJsZUNhcmRdKTtcblxyXG4gIGNvbnN0IGhhc0l0ZW1zID0gaXRlbXMubGVuZ3RoID4gMDtcclxuICBjb25zdCBzaG93RW1wdHkgPSAhZXJyb3JNZXNzYWdlICYmICFoYXNJdGVtcztcclxuXHJcbiAgY29uc3QgY29udGVudCA9IGVycm9yTWVzc2FnZSA/IChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1kYW5nZXJcIj57ZXJyb3JNZXNzYWdlfTwvZGl2PlxyXG4gICkgOiBoYXNJdGVtcyA/IChcclxuICAgIGl0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgY29uc3Qga2V5ID0gaXRlbS5pZCB8fCBpdGVtLnJlY0lkPy50b1N0cmluZygpIHx8IGB0aW1lbGluZS0ke2luZGV4fWA7XHJcbiAgICAgIGNvbnN0IGlzQ2xpY2thYmxlID0gIWl0ZW0uaXNOb0RhdGEgJiYgISFpdGVtLmlkO1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYga2V5PXtrZXl9IGNsYXNzTmFtZT1cInRpbWVsaW5lLWl0ZW1cIj5cclxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgXCJ0aW1lbGluZS1jYXJkXCIsXG4gICAgICAgICAgICAgIGl0ZW0uaXNOb0RhdGEgPyBcInRpbWVsaW5lLWNhcmQtLW5vZGF0YVwiIDogXCJcIixcbiAgICAgICAgICAgICAgaXNDbGlja2FibGUgPyBcInRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVwiIDogXCJcIlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIGRhdGEtYWN0aXZpZGFkaWQ9e2l0ZW0uYWN0aXZpZGFkSWQgfHwgXCJcIn1cbiAgICAgICAgICAgIGRhdGEtcmVjaWQ9e2l0ZW0ucmVjSWQgIT0gbnVsbCA/IFN0cmluZyhpdGVtLnJlY0lkKSA6IFwiXCJ9XG4gICAgICAgICAgICBkYXRhLWxpbmstaWQ9e2lzQ2xpY2thYmxlID8gaXRlbS5pZCA6IFwiXCJ9XG4gICAgICAgICAgICByb2xlPXtpc0NsaWNrYWJsZSA/IFwiYnV0dG9uXCIgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICB0YWJJbmRleD17aXNDbGlja2FibGUgPyAwIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17aXNDbGlja2FibGUgPyAoaXRlbS5mdWxsTmFtZSB8fCBpdGVtLm5hbWUgfHwgbm9EYXRhVGV4dCkgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBvbktleURvd249e2lzQ2xpY2thYmxlXG4gICAgICAgICAgICAgID8gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiIHx8IGV2ZW50LmtleSA9PT0gXCIgXCIpIHtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICBvbk5hdmlnYXRlKGl0ZW0uaWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWRhdGUtcGFuZWwgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgcHgtMyBweS0zIGJnLXNsYXRlLTUwIGJvcmRlci1yIGJvcmRlci1zbGF0ZS0yMDAgdGV4dC1zbGF0ZS02MDBcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0uZGF0ZVBhcnRzLnllYXJ9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdXBwZXJjYXNlIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5kYXRlUGFydHMubW9udGh9PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1zZW1pYm9sZCB0ZXh0LXByaW1hcnlcIj57aXRlbS5kYXRlUGFydHMuZGF5fTwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1jYXJkX19jb250ZW50IGZsZXgtMSBweS0zIHB4LTRcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLW5hbWVcIiBkYXRhLWZ1bGx0ZXh0PXtpdGVtLmZ1bGxOYW1lIHx8IGl0ZW0ubmFtZX0+e2l0ZW0ubmFtZX08L2Rpdj5cclxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0aW1lbGluZS1kZXNjLXRleHRcIiBkYXRhLWZ1bGx0ZXh0PXtpdGVtLmZ1bGxEZXNjIHx8IGl0ZW0uZGVzY3JpcHRpb259PntpdGVtLmRlc2NyaXB0aW9uIHx8IG5vRGF0YVRleHR9PC9wPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICApO1xyXG4gICAgfSlcclxuICApIDogbnVsbDtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcbiAgICAgIGlkPVwidGltZWxpbmVDb250YWluZXJcIlxuICAgICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ0aW1lbGluZS1ib3hcIiwgc2hvd0VtcHR5ID8gXCJ0aW1lbGluZS1lbXB0eVwiIDogXCJcIil9XG4gICAgICBkYXRhLWVtcHR5LXRleHQ9e25vRGF0YVRleHR9XG4gICAgICBvblBvaW50ZXJEb3duQ2FwdHVyZT17aGFuZGxlUG9pbnRlckRvd259XG4gICAgICBvblBvaW50ZXJNb3ZlQ2FwdHVyZT17aGFuZGxlUG9pbnRlck1vdmV9XG4gICAgICBvblBvaW50ZXJVcENhcHR1cmU9e2hhbmRsZVBvaW50ZXJVcH1cbiAgICAgIG9uUG9pbnRlckNhbmNlbENhcHR1cmU9e3Jlc2V0VGFwR3VhcmR9XG4gICAgICBvblBvaW50ZXJMZWF2ZT17cmVzZXRUYXBHdWFyZH1cbiAgICAgIG9uQ29udGV4dE1lbnVDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cbiAgICAgIG9uQ29weUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxuICAgICAgb25DdXRDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cbiAgICAgIG9uUGFzdGVDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cbiAgICA+XG4gICAgICB7Y29udGVudH1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmNvbnN0IE1lbW9pemVkSGlzdG9yeVRhYmxlID0gUmVhY3QubWVtbyhIaXN0b3J5VGFibGUpO1xuTWVtb2l6ZWRIaXN0b3J5VGFibGUuZGlzcGxheU5hbWUgPSBcIkhpc3RvcnlUYWJsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBNZW1vaXplZEhpc3RvcnlUYWJsZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcyA9IHtcbiAgcm91dGU6IHN0cmluZztcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIHNpemU/OiBudW1iZXI7XG4gIHJpZ2h0PzogbnVtYmVyO1xuICBib3R0b20/OiBudW1iZXI7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBzaGFkb3dPcGFjaXR5PzogbnVtYmVyO1xuICBwbHVzVGhpY2tuZXNzPzogbnVtYmVyO1xuICBwbHVzTGVuZ3RoPzogbnVtYmVyO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IGNsYW1wID0gKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT4gTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHZhbHVlKSk7XG5cbi8vIEZsb2F0aW5nIGFjdGlvbiBidXR0b24gdGhhdCByZW5kZXJzIGEgY3Jpc3AgU1ZHIG9udG8gYSBjYW52YXMuXG5jb25zdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiA9ICh7XG4gIHJvdXRlLFxuICBhcmlhTGFiZWwsXG4gIHNpemUgPSA3NixcbiAgcmlnaHQgPSAyNCxcbiAgYm90dG9tID0gMjQsXG4gIGNvbG9yID0gXCIjMDAyOTZiXCIsXG4gIHNoYWRvd09wYWNpdHkgPSAwLjE2LFxuICBwbHVzVGhpY2tuZXNzID0gNCxcbiAgcGx1c0xlbmd0aCA9IDI4LFxuICBvbkNsaWNrLFxufTogRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcykgPT4ge1xuICBjb25zdCBidG5SZWYgPSB1c2VSZWY8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY2FudmFzUmVmID0gdXNlUmVmPEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgYnVpbGRGYWJTdmcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZU9wYWNpdHkgPSBjbGFtcChzaGFkb3dPcGFjaXR5LCAwLCAwLjUpO1xuICAgIGNvbnN0IHNhZmVUaGlja25lc3MgPSBjbGFtcChwbHVzVGhpY2tuZXNzLCAyLCA4KTtcbiAgICBjb25zdCBzYWZlTGVuZ3RoID0gY2xhbXAocGx1c0xlbmd0aCwgMTYsIDQwKTtcblxuICAgIGNvbnN0IGN4ID0gNDg7XG4gICAgY29uc3QgeFYgPSBjeCAtIHNhZmVUaGlja25lc3MgLyAyO1xuICAgIGNvbnN0IHlWID0gY3ggLSBzYWZlTGVuZ3RoIC8gMjtcbiAgICBjb25zdCB4SCA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XG4gICAgY29uc3QgeUggPSBjeCAtIHNhZmVUaGlja25lc3MgLyAyO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdmcgd2lkdGg9XCI5NlwiIGhlaWdodD1cIjk2XCIgdmlld0JveD1cIjAgMCA5NiA5NlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgPGZpbHRlciBpZD1cImZhYlNoYWRvd1wiIHg9XCItNDAlXCIgeT1cIi00MCVcIiB3aWR0aD1cIjE4MCVcIiBoZWlnaHQ9XCIxODAlXCI+XG4gICAgICAgICAgICA8ZmVEcm9wU2hhZG93IGR4PVwiLTRcIiBkeT1cIjEwXCIgc3RkRGV2aWF0aW9uPVwiNlwiIGZsb29kLWNvbG9yPVwiIzAwMFwiIGZsb29kLW9wYWNpdHk9XCIke3NhZmVPcGFjaXR5fVwiLz5cbiAgICAgICAgICA8L2ZpbHRlcj5cbiAgICAgICAgPC9kZWZzPlxuXG4gICAgICAgIDxnIGZpbHRlcj1cInVybCgjZmFiU2hhZG93KVwiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI0OFwiIGN5PVwiNDhcIiByPVwiMzRcIiBmaWxsPVwiJHtjb2xvcn1cIi8+XG4gICAgICAgIDwvZz5cblxuICAgICAgICA8ZyBmaWxsPVwiI2ZmZlwiPlxuICAgICAgICAgIDxyZWN0IHg9XCIke3hWfVwiIHk9XCIke3lWfVwiIHdpZHRoPVwiJHtzYWZlVGhpY2tuZXNzfVwiIGhlaWdodD1cIiR7c2FmZUxlbmd0aH1cIiByeD1cIjFcIi8+XG4gICAgICAgICAgPHJlY3QgeD1cIiR7eEh9XCIgeT1cIiR7eUh9XCIgd2lkdGg9XCIke3NhZmVMZW5ndGh9XCIgaGVpZ2h0PVwiJHtzYWZlVGhpY2tuZXNzfVwiIHJ4PVwiMVwiLz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgYC50cmltKCk7XG4gIH0sIFtjb2xvciwgc2hhZG93T3BhY2l0eSwgcGx1c0xlbmd0aCwgcGx1c1RoaWNrbmVzc10pO1xuXG4gIGNvbnN0IHJlbmRlclN2Z1RvQ2FudmFzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2l6ZVB4ID0gTWF0aC5tYXgoNDAsIHNpemUpO1xuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICBjYW52YXMud2lkdGggPSBNYXRoLnJvdW5kKHNpemVQeCAqIGRwcik7XG4gICAgY2FudmFzLmhlaWdodCA9IE1hdGgucm91bmQoc2l6ZVB4ICogZHByKTtcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBgJHtzaXplUHh9cHhgO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtzaXplUHh9cHhgO1xuICAgIGN0eC5zZXRUcmFuc2Zvcm0oZHByLCAwLCAwLCBkcHIsIDAsIDApO1xuXG4gICAgY29uc3Qgc3ZnID0gYnVpbGRGYWJTdmcoKTtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3N2Z10sIHsgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5kZWNvZGluZyA9IFwiYXN5bmNcIjtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzaXplUHgsIHNpemVQeCk7XG4gICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgc2l6ZVB4LCBzaXplUHgpO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgIH07XG4gICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gdXJsO1xuICB9LCBbYnVpbGRGYWJTdmcsIHNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlbmRlclN2Z1RvQ2FudmFzKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVuZGVyU3ZnVG9DYW52YXMpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZW5kZXJTdmdUb0NhbnZhcyk7XG4gIH0sIFtyZW5kZXJTdmdUb0NhbnZhc10pO1xuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBvbkNsaWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcm91dGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcm91dGU7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uXG4gICAgICByZWY9e2J0blJlZn1cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgei0yMDAwIHJvdW5kZWQtbWQgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTE1MCBob3ZlcjotdHJhbnNsYXRlLXktMC41IGFjdGl2ZTpzY2FsZS05NSBmb2N1cy12aXNpYmxlOnJpbmctNCBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zMCBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTRcIlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgd2lkdGg6IGAke3NpemV9cHhgLFxuICAgICAgICBoZWlnaHQ6IGAke3NpemV9cHhgLFxuICAgICAgICByaWdodDogYCR7cmlnaHR9cHhgLFxuICAgICAgICBib3R0b206IGAke2JvdHRvbX1weGAsXG4gICAgICAgIFdlYmtpdFRhcEhpZ2hsaWdodENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICB9fVxuICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgPlxuICAgICAgPGNhbnZhcyByZWY9e2NhbnZhc1JlZn0gY2xhc3NOYW1lPVwiYmxvY2sgcm91bmRlZC1tZFwiIC8+XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcbiAgZmlyc3Q/OiBzdHJpbmc7XG4gIHByZXY/OiBzdHJpbmc7XG4gIG5leHQ/OiBzdHJpbmc7XG4gIGxhc3Q/OiBzdHJpbmc7XG59O1xuXG50eXBlIENvbXBhY3RQYWdpbmF0aW9uUHJvcHMgPSB7XG4gIHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcbiAgcGFnZVdpbmRvdz86IG51bWJlcjtcbiAgb25QYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xuICBsYWJlbHM/OiBQYWdpbmF0aW9uTGFiZWxzO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBERUZBVUxUX1dJTkRPVyA9IDY7XG5cbi8vIENvbXBhY3QgcGFnaW5hdGlvbiB3aXRoIDYtcGFnZSB3aW5kb3cgYW5kIGVkZ2UgY29udHJvbHMuXG5jb25zdCBDb21wYWN0UGFnaW5hdGlvbiA9IGZvcndhcmRSZWY8SFRNTERpdkVsZW1lbnQsIENvbXBhY3RQYWdpbmF0aW9uUHJvcHM+KFxuICAoeyB0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSwgcGFnZVdpbmRvdyA9IERFRkFVTFRfV0lORE9XLCBvblBhZ2VDaGFuZ2UsIGxhYmVscywgY2xhc3NOYW1lIH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IHNhZmVUb3RhbCA9IE1hdGgubWF4KDAsIHRvdGFsUGFnZXMgfHwgMCk7XG4gICAgY29uc3Qgc2FmZUN1cnJlbnQgPSBNYXRoLm1pbihNYXRoLm1heCgxLCBjdXJyZW50UGFnZSB8fCAxKSwgc2FmZVRvdGFsIHx8IDEpO1xuICAgIGNvbnN0IHdpbmRvd1NpemUgPSBNYXRoLm1heCgxLCBwYWdlV2luZG93IHx8IERFRkFVTFRfV0lORE9XKTtcblxuICAgIGNvbnN0IHNob3dQYWdpbmF0aW9uID0gc2FmZVRvdGFsID4gMTtcbiAgICBjb25zdCBzaG93RWRnZU5hdiA9IHNhZmVUb3RhbCA+IHdpbmRvd1NpemU7XG4gICAgY29uc3QgY2FuSnVtcFRvU3RhcnQgPSBzYWZlQ3VycmVudCA+IHdpbmRvd1NpemU7XG4gICAgY29uc3QgY2FuR29QcmV2ID0gc2FmZUN1cnJlbnQgPiAxO1xuICAgIGNvbnN0IGNhbkdvTmV4dCA9IHNhZmVDdXJyZW50IDwgc2FmZVRvdGFsO1xuXG4gICAgY29uc3QgcGFnZU51bWJlcnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgIGlmICghc2FmZVRvdGFsKSByZXR1cm4gW107XG4gICAgICBjb25zdCB3aW5kb3dTdGFydCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoKHNhZmVDdXJyZW50IC0gMSkgLyB3aW5kb3dTaXplKSAqIHdpbmRvd1NpemUgKyAxKTtcbiAgICAgIGNvbnN0IHdpbmRvd0VuZCA9IE1hdGgubWluKHNhZmVUb3RhbCwgd2luZG93U3RhcnQgKyB3aW5kb3dTaXplIC0gMSk7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogd2luZG93RW5kIC0gd2luZG93U3RhcnQgKyAxIH0sIChfdmFsLCBpZHgpID0+IHdpbmRvd1N0YXJ0ICsgaWR4KTtcbiAgICB9LCBbc2FmZUN1cnJlbnQsIHNhZmVUb3RhbCwgd2luZG93U2l6ZV0pO1xuXG4gICAgaWYgKCFzaG93UGFnaW5hdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cInBhZ2luYXRpb25cIlxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgIFwicGFnaW5hdGlvbiBncmlkIGdyaWQtY29scy1bMWZyX2F1dG9fMWZyXSBpdGVtcy1jZW50ZXIgZ2FwLTFcIixcbiAgICAgICAgICBjbGFzc05hbWUgfHwgXCJcIlxuICAgICAgICApfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuSnVtcFRvU3RhcnQgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHM/LmZpcnN0fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2UoMSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTguNzUgNC41LTcuNSA3LjUgNy41IDcuNW0tNi0xNUw1LjI1IDEybDcuNSA3LjVcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvUHJldiAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ucHJldn1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlKHNhZmVDdXJyZW50IC0gMSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTUuNzUgMTkuNSA4LjI1IDEybDcuNS03LjVcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgbWluLXctMCBmbGV4LW5vd3JhcFwiPlxuICAgICAgICAgIHtwYWdlTnVtYmVycy5tYXAoKHBhZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gcGFnZSA9PT0gc2FmZUN1cnJlbnQ7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAga2V5PXtgcGFnZS0ke3BhZ2V9YH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcIm1pbi13LVsyNnB4XSBweC0yIHB5LTAuNSByb3VuZGVkLW1kIGJvcmRlciB0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIHRyYW5zaXRpb25cIixcbiAgICAgICAgICAgICAgICAgIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgID8gXCJiZy1bIzAwMjk2Yl0gYm9yZGVyLVsjMDAyOTZiXSB0ZXh0LXdoaXRlIHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMzAwIHRleHQtc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1wcmltYXJ5IGhvdmVyOnRleHQtcHJpbWFyeVwiXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlKHBhZ2UpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7cGFnZX1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvTmV4dCAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ubmV4dH1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlKHNhZmVDdXJyZW50ICsgMSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtOC4yNSA0LjUgNy41IDcuNS03LjUgNy41XCIgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5Hb05leHQgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHM/Lmxhc3R9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG9uUGFnZUNoYW5nZShzYWZlVG90YWwpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuNVwiIGNsYXNzTmFtZT1cInctNSBoLTUgbXgtYXV0b1wiPlxuICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTUuMjUgNC41IDcuNSA3LjUtNy41IDcuNW02LTE1IDcuNSA3LjUtNy41IDcuNVwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4pO1xuXG5Db21wYWN0UGFnaW5hdGlvbi5kaXNwbGF5TmFtZSA9IFwiQ29tcGFjdFBhZ2luYXRpb25cIjtcblxuZXhwb3J0IGRlZmF1bHQgQ29tcGFjdFBhZ2luYXRpb247XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGFjdGl2ZT86IGJvb2xlYW47XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xuICB0eXBlPzogXCJidXR0b25cIiB8IFwic3VibWl0XCIgfCBcInJlc2V0XCI7XG59O1xuXG4vLyBEdW1iIGZpbHRlciBidXR0b24gd2l0aCBzdGFuZGFyZGl6ZWQgc3R5bGluZy5cbmNvbnN0IEZpbHRlckJ1dHRvbiA9ICh7XG4gIGxhYmVsLFxuICBhY3RpdmUgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBhcmlhTGFiZWwsXG4gIHR5cGUgPSBcImJ1dHRvblwiXG59OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9e3R5cGV9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmQtZmlsdGVyLWJ0blwiLCBhY3RpdmUgPyBcImluZC1maWx0ZXItYnRuLS1hY3RpdmVcIiA6IFwiXCIsIGNsYXNzTmFtZSl9XG4gICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsIHx8IGxhYmVsfVxuICAgID5cbiAgICAgIHtsYWJlbH1cbiAgICA8L2J1dHRvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZpbHRlckJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIHR5cGU/OiBcImJ1dHRvblwiIHwgXCJzdWJtaXRcIiB8IFwicmVzZXRcIjtcbn07XG5cbi8vIER1bWIgYWN0aW9uIGJ1dHRvbiB3aXRoIHN0YW5kYXJkaXplZCBzdHlsaW5nLlxuY29uc3QgQWN0aW9uQnV0dG9uID0gKHtcbiAgbGFiZWwsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgYXJpYUxhYmVsLFxuICB0eXBlID0gXCJidXR0b25cIlxufTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uXG4gICAgICB0eXBlPXt0eXBlfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5kLWFjdGlvbi1idG5cIiwgY2xhc3NOYW1lKX1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XG4gICAgPlxuICAgICAge2xhYmVsfVxuICAgIDwvYnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uQnV0dG9uO1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGdldENzcmZUb2tlbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IHR5cGUgSGlzdG9yeUFjdGl2aXR5SXRlbSA9IHtcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIEFjdGl2aWRhZElkPzogc3RyaW5nIHwgbnVtYmVyO1xuICByZWNJZD86IHN0cmluZyB8IG51bWJlcjtcbiAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIE5hbWU/OiBzdHJpbmc7XG4gIHRyYW5zRGF0ZT86IHN0cmluZztcbiAgVHJhbnNEYXRlPzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgRGVzY3JpcHRpb24/OiBzdHJpbmc7XG59O1xuXG50eXBlIEhpc3RvcnlSZXNwb25zZSA9IHtcbiAgaXRlbXM/OiBIaXN0b3J5QWN0aXZpdHlJdGVtW107XG4gIHRvdGFsPzogbnVtYmVyO1xufTtcblxudHlwZSBMb2FkT3ZlcnJpZGUgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xufTtcblxudHlwZSBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MgPSB7XG4gIGZyb21EYXRlVmFsdWU6IHN0cmluZztcbiAgdG9EYXRlVmFsdWU6IHN0cmluZztcbiAgYWNjb3VudE51bVZhbHVlOiBzdHJpbmc7XG4gIHBhZ2VTaXplOiBudW1iZXI7XG4gIHJldHJ5RGVsYXlNcz86IG51bWJlcjtcbiAgbm9ybWFsaXplUmFuZ2U6IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHsgZnJvbTogc3RyaW5nOyB0bzogc3RyaW5nIH07XG4gIG9uRm9yYmlkZGVuOiAoKSA9PiB2b2lkO1xuICBvbkRlYnVnPzogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xufTtcblxuLy8gQ2VudHJhbGl6ZXMgaGlzdG9yeSBmZXRjaC9yZXRyeSBsb2dpYyB0byBrZWVwIHBhZ2UgY29tcG9uZW50cyBzbWFsbGVyLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlBY3Rpdml0aWVzID0gKHtcbiAgZnJvbURhdGVWYWx1ZSxcbiAgdG9EYXRlVmFsdWUsXG4gIGFjY291bnROdW1WYWx1ZSxcbiAgcGFnZVNpemUsXG4gIHJldHJ5RGVsYXlNcyA9IDYwMCxcbiAgbm9ybWFsaXplUmFuZ2UsXG4gIG9uRm9yYmlkZGVuLFxuICBvbkRlYnVnLFxufTogVXNlSGlzdG9yeUFjdGl2aXRpZXNBcmdzKSA9PiB7XG4gIGNvbnN0IFtpdGVtcywgc2V0SXRlbXNdID0gdXNlU3RhdGU8SGlzdG9yeUFjdGl2aXR5SXRlbVtdPihbXSk7XG4gIGNvbnN0IFt0b3RhbCwgc2V0VG90YWxdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlcnJvck1lc3NhZ2UsIHNldEVycm9yTWVzc2FnZV0gPSB1c2VTdGF0ZShcIlwiKTtcblxuICBjb25zdCByZXRyeU9uTmV0d29ya0Vycm9yUmVmID0gdXNlUmVmKGZhbHNlKTtcbiAgY29uc3QgYWN0aXZlQWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFjdGl2ZVJlcXVlc3RJZFJlZiA9IHVzZVJlZigwKTtcbiAgY29uc3QgcmV0cnlUaW1lclJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGFzdFNpZ25hdHVyZVJlZiA9IHVzZVJlZihcIlwiKTtcblxuICBjb25zdCBjbGVhclJldHJ5VGltZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHJldHJ5VGltZXJSZWYuY3VycmVudCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHJldHJ5VGltZXJSZWYuY3VycmVudCk7XG4gICAgICByZXRyeVRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGFib3J0QWN0aXZlUmVxdWVzdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIWFjdGl2ZUFib3J0UmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudC5hYm9ydCgpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlIGFib3J0IGVycm9ycy5cbiAgICB9XG4gICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gIH0sIFtdKTtcblxuICBjb25zdCByZXNldEFjdGl2aXRpZXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY2xlYXJSZXRyeVRpbWVyKCk7XG4gICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG4gICAgc2V0SXRlbXMoW10pO1xuICAgIHNldFRvdGFsKDApO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICB9LCBbYWJvcnRBY3RpdmVSZXF1ZXN0LCBjbGVhclJldHJ5VGltZXJdKTtcblxuICBjb25zdCBsb2FkQWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB7XG4gICAgICBjb25zdCBmcm9tRGF0ZVN0ciA9IG92ZXJyaWRlPy5mcm9tRGF0ZSA/PyBmcm9tRGF0ZVZhbHVlO1xuICAgICAgY29uc3QgdG9EYXRlU3RyID0gb3ZlcnJpZGU/LnRvRGF0ZSA/PyB0b0RhdGVWYWx1ZTtcbiAgICAgIGNvbnN0IGFjY291bnROdW1TdHIgPSBvdmVycmlkZT8uYWNjb3VudE51bSA/PyBhY2NvdW50TnVtVmFsdWU7XG5cbiAgICAgIGlmICghZnJvbURhdGVTdHIgfHwgIXRvRGF0ZVN0cikge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICAgIHNldFRvdGFsKDApO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcblxuICAgICAgY29uc3QgcmVxdWVzdElkID0gKythY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudDtcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xuXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG5cbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVN0ciwgdG9EYXRlU3RyKTtcbiAgICAgIGNvbnN0IGZpbHRlclNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1TdHJ9fCR7cGFnZX1gO1xuICAgICAgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ID0gZmlsdGVyU2lnbmF0dXJlO1xuXG4gICAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgICBzZXRJdGVtcyhbXSk7XG4gICAgICBzZXRUb3RhbCgwKTtcbiAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcblxuICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgZnJvbURhdGU6IG5vcm1hbGl6ZWQuZnJvbSxcbiAgICAgICAgdG9EYXRlOiBub3JtYWxpemVkLnRvLFxuICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxuICAgICAgfTtcblxuICAgICAgb25EZWJ1Zz8uKFwibG9hZEFjdGl2aXRpZXM6cmVxdWVzdFwiLCB7IHBhZ2UsIHBhZ2VTaXplLCBwYXlsb2FkIH0pO1xuXG4gICAgICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBnZXRDc3JmVG9rZW4oKTtcbiAgICAgICAgY29uc3QgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfTtcbiAgICAgICAgaWYgKHRva2VuKSBoZWFkZXJzLlJlcXVlc3RWZXJpZmljYXRpb25Ub2tlbiA9IHRva2VuO1xuXG4gICAgICAgIHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYC9IaXN0b3JpYWwvR2V0QWN0aXZpdGllcz9wYWdlPSR7cGFnZX0mcGFnZVNpemU9JHtwYWdlU2l6ZX1gLCB7XG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxuICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgICBpZiAoZXJyPy5uYW1lID09PSBcIkFib3J0RXJyb3JcIikge1xuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgcmV0cnlUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgIT09IGZpbHRlclNpZ25hdHVyZSkgcmV0dXJuO1xuICAgICAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwge1xuICAgICAgICAgICAgICBmcm9tRGF0ZTogZnJvbURhdGVTdHIsXG4gICAgICAgICAgICAgIHRvRGF0ZTogdG9EYXRlU3RyLFxuICAgICAgICAgICAgICBhY2NvdW50TnVtOiBhY2NvdW50TnVtU3RyLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSwgcmV0cnlEZWxheU1zKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIk5vIHNlIHB1ZG8gY29uZWN0YXIgY29uIGVsIHNlcnZpZG9yIChyZWQpLlwiKSk7XG4gICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnN0IHN0YXR1c1RleHQgPSByZXNwb25zZS5zdGF0dXNUZXh0IHx8IFwiRXJyb3IgZGVsIHNlcnZpZG9yXCI7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShgJHtyZXNwb25zZS5zdGF0dXN9IC0gJHtzdGF0dXNUZXh0fS4gVmVyaWZpY2EgZWwgYmFja2VuZC5gKTtcbiAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmF3ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgbGV0IGRhdGE6IEhpc3RvcnlSZXNwb25zZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKHJhdyk7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJBcGlfSW52YWxpZEpzb25cIiwgXCJFcnJvciBwcm9jZXNhbmRvIGRhdG9zXCIpKTtcbiAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcXVlc3RJZCAhPT0gYWN0aXZlUmVxdWVzdElkUmVmLmN1cnJlbnQpIHJldHVybjtcblxuICAgICAgb25EZWJ1Zz8uKFwibG9hZEFjdGl2aXRpZXM6cmVzcG9uc2VcIiwge1xuICAgICAgICBzdGF0dXM6IHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgdG90YWw6IGRhdGE/LnRvdGFsID8/IDAsXG4gICAgICAgIGNvdW50OiBBcnJheS5pc0FycmF5KGRhdGE/Lml0ZW1zKSA/IGRhdGEuaXRlbXMubGVuZ3RoIDogMCxcbiAgICAgIH0pO1xuXG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgc2V0SXRlbXMoZGF0YS5pdGVtcyB8fCBbXSk7XG4gICAgICBzZXRUb3RhbChkYXRhLnRvdGFsIHx8IChkYXRhLml0ZW1zIHx8IFtdKS5sZW5ndGgpO1xuICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfSxcbiAgICBbXG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QsXG4gICAgICBhY2NvdW50TnVtVmFsdWUsXG4gICAgICBjbGVhclJldHJ5VGltZXIsXG4gICAgICBmcm9tRGF0ZVZhbHVlLFxuICAgICAgbm9ybWFsaXplUmFuZ2UsXG4gICAgICBvbkRlYnVnLFxuICAgICAgb25Gb3JiaWRkZW4sXG4gICAgICBwYWdlU2l6ZSxcbiAgICAgIHJldHJ5RGVsYXlNcyxcbiAgICAgIHRvRGF0ZVZhbHVlLFxuICAgIF1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclJldHJ5VGltZXIoKTtcbiAgICAgIGFib3J0QWN0aXZlUmVxdWVzdCgpO1xuICAgIH07XG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGNsZWFyUmV0cnlUaW1lcl0pO1xuXG4gIHJldHVybiB7XG4gICAgaXRlbXMsXG4gICAgdG90YWwsXG4gICAgY3VycmVudFBhZ2UsXG4gICAgaXNMb2FkaW5nLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZXNldEFjdGl2aXRpZXMsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBsYXN0U2lnbmF0dXJlUmVmLFxuICB9O1xufTtcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjayB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgSElTVE9SWV9GSUxURVJfS0VZLCBISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xuXG5leHBvcnQgdHlwZSBIaXN0b3J5Q2FjaGVkRmlsdGVyID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgcGFnZT86IG51bWJlcjtcbiAgY2xpZW50QWNjb3VudD86IHN0cmluZztcbiAgY2xpZW50VGV4dD86IHN0cmluZztcbn07XG5cbmNvbnN0IHBhcnNlQ2FjaGVkRmlsdGVyID0gKHJhdzogc3RyaW5nIHwgbnVsbCk6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xuICB0cnkge1xuICAgIGNvbnN0IHBhcnNlZCA9IEpTT04ucGFyc2UocmF3KTtcbiAgICBpZiAoIXBhcnNlZCB8fCB0eXBlb2YgcGFyc2VkICE9PSBcIm9iamVjdFwiKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgZnJvbURhdGU6IHBhcnNlZC5mcm9tRGF0ZSB8fCBcIlwiLFxuICAgICAgdG9EYXRlOiBwYXJzZWQudG9EYXRlIHx8IFwiXCIsXG4gICAgICBwYWdlOiBwYXJzZWQucGFnZSxcbiAgICAgIGNsaWVudEFjY291bnQ6IHBhcnNlZC5jbGllbnRBY2NvdW50IHx8IFwiXCIsXG4gICAgICBjbGllbnRUZXh0OiBwYXJzZWQuY2xpZW50VGV4dCB8fCBcIlwiLFxuICAgIH07XG4gIH0gY2F0Y2gge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59O1xuXG4vLyBLZWVwcyBoaXN0b3J5IGZpbHRlciBjYWNoZSByZWFkcy93cml0ZXMgaW4gb25lIHBsYWNlLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSA9ICgpID0+IHtcbiAgY29uc3QgcmVhZENhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKCgpOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBwYXJzZUNhY2hlZEZpbHRlcihzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKEhJU1RPUllfRklMVEVSX0tFWSkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgY2xlYXJGaWx0ZXJDYWNoZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbShISVNUT1JZX0ZJTFRFUl9LRVkpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlIHN0b3JhZ2UgZXJyb3JzLlxuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNvbnN1bWVSZXR1cm5GbGFnID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByYXcgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKEhJU1RPUllfUkVUVVJOX0ZMQUdfS0VZKTtcbiAgICAgIGlmIChyYXcgPT09IFwiMVwiKSB7XG4gICAgICAgIHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZSBzdG9yYWdlIGVycm9ycy5cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2F2ZUNhY2hlZEZpbHRlciA9IHVzZUNhbGxiYWNrKChmaWx0ZXI6IEhpc3RvcnlDYWNoZWRGaWx0ZXIpID0+IHtcbiAgICB0cnkge1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShISVNUT1JZX0ZJTFRFUl9LRVksIEpTT04uc3RyaW5naWZ5KGZpbHRlcikpO1xuICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSwgXCIxXCIpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gSWdub3JlIHN0b3JhZ2UgZXJyb3JzLlxuICAgIH1cbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZENhY2hlZEZpbHRlcixcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIHNhdmVDYWNoZWRGaWx0ZXIsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTtBQUV6RSxvQkFBMkI7OztBQ0YzQixtQkFBc0Q7QUFnbkJsRDtBQXBsQkosSUFBTSxjQUFjO0FBQ3BCLElBQU0seUJBQXlCO0FBQy9CLElBQU0scUJBQXFCO0FBQzNCLElBQU0sMkJBQTJCO0FBQ2pDLElBQU0sb0JBQW9CO0FBQzFCLElBQU0sbUJBQW1CO0FBQ3pCLElBQU0sV0FBVztBQUNqQixJQUFNLFlBQVk7QUFDbEIsSUFBTSxjQUFjO0FBQ3BCLElBQU0sZUFBZSxDQUFDLDBCQUEwQiwwQkFBMEIsd0JBQXdCO0FBY2xHLElBQU0sb0JBQW9CLENBQUMsT0FBZSxrQkFBMkI7QUFDbkUsUUFBTSxN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Q04sT0FBTztBQUFBLFFBQ1AsUUFBUTtBQUFBO0FBQUEsSUFDVjtBQUFBLEtBRUo7QUFFSjtBQUdPLElBQU0sbUJBQW1CLENBQUMsU0FBc0I7QUFDckQsUUFBTSxrQkFBa0IsS0FBSyxhQUFhLG1CQUFtQixLQUFLO0FBQ2xFLFFBQU0sZ0JBQWdCLEtBQUssYUFBYSxpQkFBaUIsS0FBSztBQUU5RCxRQUFNLFVBQVUsNkNBQUMsZUFBWSxpQkFBa0MsZUFBOEI7QUFDN0YsUUFBTSxXQUFZLEtBQXVFO0FBRXpGLE1BQUksVUFBVTtBQUNaLGFBQVMsT0FBTyxPQUFPO0FBQ3ZCO0FBQUEsRUFDRjtBQUVBLFFBQU0sZ0JBQVksMEJBQVcsSUFBSTtBQUNqQyxFQUFDLEtBQXVFLFlBQVk7QUFDcEYsWUFBVSxPQUFPLE9BQU87QUFDMUI7QUFFQSxJQUFNLFFBQVEsTUFBTTtBQUNsQixRQUFNLFNBQVMsU0FBUyxlQUFlLHNCQUFzQjtBQUM3RCxNQUFJLENBQUMsT0FBUTtBQUNiLG1CQUFpQixNQUFNO0FBQ3pCO0FBRUEsSUFBSSxPQUFPLGFBQWEsYUFBYTtBQUNuQyxNQUFJLFNBQVMsZUFBZSxjQUFjLFNBQVMsZUFBZSxlQUFlO0FBQy9FLFVBQU07QUFBQSxFQUNSLE9BQU87QUFDTCxhQUFTLGlCQUFpQixvQkFBb0IsS0FBSztBQUFBLEVBQ3JEO0FBQ0Y7QUFFQSxJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiUmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgIm5vcm1hbGl6ZVJhbmdlIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAibmV3U3RhcnQiXQp9Cg==
