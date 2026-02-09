import {
  ClientSearchCombobox_default
} from "./chunks/chunk-OIAOH3B5.js";
import {
  ApiFetchError,
  HISTORY_FILTER_KEY,
  HISTORY_RETURN_FLAG_KEY,
  canAccess,
  classNames,
  fetchJson,
  indT,
  showPermissionModal
} from "./chunks/chunk-J3WMNRY4.js";
import {
  getSessionJsonWithExpiry,
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionJsonWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-7SKLSV7K.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunks/chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx
var import_react10 = __toESM(require_react());

// Web/wwwroot/react/src/pages/visitas/historial/HistoryTable.tsx
var import_react2 = __toESM(require_react());

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryTableEffects.ts
var import_react = __toESM(require_react());
var TOOLTIP_TOUCH_DELAY_MS = 120;
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
var useHistoryTableEffects = ({
  containerRef,
  errorMessage,
  items,
  resolveClickableCard
}) => {
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
  }, [containerRef, errorMessage, items, resolveClickableCard]);
};

// Web/wwwroot/react/src/pages/visitas/historial/HistoryTable.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var TAP_MOVE_PX = 14;
var HOLD_TO_PREVIEW_MS = 160;
var HistoryTable = ({ items, noDataText, errorMessage, onNavigate }) => {
  const containerRef = (0, import_react2.useRef)(null);
  const tapGuardRef = (0, import_react2.useRef)({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    startTime: 0,
    moved: false,
    linkId: ""
  });
  const resolveClickableCard = (0, import_react2.useCallback)((target) => {
    const node = target;
    if (!node || typeof node.closest !== "function") return null;
    const card = node.closest(".timeline-card--clickable[data-link-id]");
    if (!card) return null;
    if (!containerRef.current?.contains(card)) return null;
    return card;
  }, []);
  const resetTapGuard = (0, import_react2.useCallback)(() => {
    tapGuardRef.current.active = false;
    tapGuardRef.current.pointerId = null;
    tapGuardRef.current.moved = false;
    tapGuardRef.current.linkId = "";
  }, []);
  const handlePointerDown = (0, import_react2.useCallback)(
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
  const handlePointerMove = (0, import_react2.useCallback)((event) => {
    const state = tapGuardRef.current;
    if (!state.active || event.pointerId !== state.pointerId) return;
    const dx = Math.abs(event.clientX - state.startX);
    const dy = Math.abs(event.clientY - state.startY);
    if (dx > TAP_MOVE_PX || dy > TAP_MOVE_PX) {
      state.moved = true;
    }
  }, []);
  const handlePointerUp = (0, import_react2.useCallback)(
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
  const blockClipboardAction = (0, import_react2.useCallback)(
    (event) => {
      if (!resolveClickableCard(event.target)) return;
      event.preventDefault();
    },
    [resolveClickableCard]
  );
  useHistoryTableEffects({ containerRef, errorMessage, items, resolveClickableCard });
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
var MemoizedHistoryTable = import_react2.default.memo(HistoryTable);
MemoizedHistoryTable.displayName = "HistoryTable";
var HistoryTable_default = MemoizedHistoryTable;

// Web/wwwroot/react/src/pages/visitas/historial/HistorySummary.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var HistorySummary = ({
  summaryFromLabel,
  summaryToLabel,
  fromValue,
  toValue,
  className = "",
  clientLabel = "",
  clientValue = "",
  showClient = false
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `history-filter-summary flex flex-wrap items-center gap-x-3 gap-y-2 text-xs ${className}`.trim(), children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-semibold", children: [
        summaryFromLabel,
        ":"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: fromValue }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-semibold", children: [
        summaryToLabel,
        ":"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: toValue })
    ] }),
    showClient && clientValue ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "history-filter-summary mt-1.5 flex items-center gap-2 text-xs min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "font-semibold shrink-0", children: [
        clientLabel,
        ":"
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "min-w-0 flex-1 truncate", children: clientValue })
    ] }) : null
  ] });
};
var HistorySummary_default = HistorySummary;

// Web/wwwroot/react/src/pages/visitas/historial/HistoryManualDatePicker.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var HistoryManualDatePicker = ({
  activatorRef,
  popoverRef,
  showManualError,
  showStartError,
  showEndError,
  filterTitle,
  isOpen,
  selectingStep,
  labelFrom,
  labelTo,
  startDateText,
  endDateText,
  clearRangeLabel,
  hasSelectedRange,
  monthLabel,
  weekDayLabels,
  statusText,
  dayCells,
  prevMonthLabel,
  nextMonthLabel,
  onOpenPopover,
  onActivatorKeyDown,
  onSectionKeyDown,
  onClear,
  onPrevMonth,
  onNextMonth,
  onGridMouseLeave,
  onDayClick,
  onDayHover
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        id: "drpActivator",
        ref: activatorRef,
        className: classNames("drp w-full", showManualError ? "drp-error" : ""),
        onClick: () => onOpenPopover("start"),
        role: "button",
        tabIndex: 0,
        "aria-label": filterTitle,
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
        onKeyDown: onActivatorKeyDown,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "div",
            {
              className: classNames(
                "drp-section",
                selectingStep === "start" && isOpen ? "active" : "",
                showStartError ? "is-error" : ""
              ),
              "data-section": "start",
              onClick: (event) => {
                event.stopPropagation();
                onOpenPopover("start");
              },
              role: "button",
              tabIndex: 0,
              "aria-label": labelFrom,
              onKeyDown: (event) => onSectionKeyDown(event, "start"),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "drp-label", children: labelFrom }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "drp-value", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", { className: "bi bi-calendar3 drp-icon" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { id: "drpStartValue", children: startDateText })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "drp-separator hidden sm:flex", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", { className: "bi bi-arrow-right" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "drp-separator-mobile flex sm:hidden" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "div",
            {
              className: classNames(
                "drp-section",
                selectingStep === "end" && isOpen ? "active" : "",
                showEndError ? "is-error" : ""
              ),
              "data-section": "end",
              onClick: (event) => {
                event.stopPropagation();
                onOpenPopover("end");
              },
              role: "button",
              tabIndex: 0,
              "aria-label": labelTo,
              onKeyDown: (event) => onSectionKeyDown(event, "end"),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "drp-label", children: labelTo }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "drp-value", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", { className: "bi bi-calendar3 drp-icon" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { id: "drpEndValue", children: endDateText })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              id: "drpClear",
              className: "drp-clear",
              "aria-label": clearRangeLabel,
              style: { display: hasSelectedRange ? "inline-flex" : "none" },
              onClick: onClear,
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("i", { className: "bi bi-x-lg" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { id: "drpPopover", ref: popoverRef, className: "drp-popover", hidden: !isOpen, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "drp-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            type: "button",
            className: "drp-nav",
            "data-dir": "prev",
            "aria-label": prevMonthLabel,
            onClick: onPrevMonth,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M15 19l-7-7 7-7" }) })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { id: "drpMonthLabel", className: "drp-month", children: monthLabel }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            type: "button",
            className: "drp-nav",
            "data-dir": "next",
            "aria-label": nextMonthLabel,
            onClick: onNextMonth,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 30 30", stroke: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M9 5l7 7-7 7" }) })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "drp-weekdays", children: weekDayLabels.map((label, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: label }, `${label}-${index}`)) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { id: "drpGrid", className: "drp-grid", onMouseLeave: onGridMouseLeave, children: dayCells.map((cell) => {
        if (cell.isEmpty) {
          return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("button", { className: "drp-day empty", disabled: true }, cell.key);
        }
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "button",
          {
            type: "button",
            className: cell.dayClass,
            "data-date": cell.iso,
            disabled: cell.disabled,
            onClick: () => onDayClick(cell),
            onMouseEnter: () => onDayHover(cell),
            children: cell.dayLabel
          },
          cell.key
        );
      }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { id: "drpStatus", className: "drp-status", children: statusText })
    ] })
  ] });
};
var HistoryManualDatePicker_default = HistoryManualDatePicker;

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryPageListeners.ts
var import_react3 = __toESM(require_react());
var useHistoryPageListeners = ({
  isOpen,
  activatorRef,
  popoverRef,
  paginationRef,
  hasRestoredFilterRef,
  retryOnNetworkErrorRef,
  currentPage,
  updateFabBottom,
  logHistory: logHistory2,
  consumeReturnFlag,
  readCachedFilter,
  applyCachedFilter,
  loadActivities,
  setIsOpen,
  setHoverDate,
  setShowFilters,
  applyFilters
}) => {
  (0, import_react3.useEffect)(() => {
    if (!isOpen) return;
    const handleOutside = (event) => {
      const target = event.target;
      if (!target) return;
      if (popoverRef.current?.contains(target)) return;
      if (activatorRef.current?.contains(target)) return;
      logHistory2("closePopover:outside");
      setIsOpen(false);
      setHoverDate(null);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [activatorRef, isOpen, logHistory2, popoverRef, setHoverDate, setIsOpen]);
  (0, import_react3.useEffect)(() => {
    const onPageShow = () => {
      if (hasRestoredFilterRef.current) return;
      if (consumeReturnFlag()) {
        const cached = readCachedFilter();
        const cachedRequest = applyCachedFilter(cached);
        if (cachedRequest) {
          retryOnNetworkErrorRef.current = true;
          loadActivities(cachedRequest.page, cachedRequest.override);
          setShowFilters(false);
          setIsOpen(false);
          hasRestoredFilterRef.current = true;
        }
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [
    applyCachedFilter,
    consumeReturnFlag,
    hasRestoredFilterRef,
    loadActivities,
    readCachedFilter,
    retryOnNetworkErrorRef,
    setIsOpen,
    setShowFilters
  ]);
  (0, import_react3.useEffect)(() => {
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
  }, [paginationRef, updateFabBottom]);
  (0, import_react3.useEffect)(() => {
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
  }, [applyFilters, currentPage, setIsOpen, setShowFilters]);
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryTimelineItems.ts
var import_react4 = __toESM(require_react());
var useHistoryTimelineItems = ({
  items,
  locale,
  noDataText,
  logHistory: logHistory2,
  toTitleCase: toTitleCase2,
  formatDateParts: formatDateParts2
}) => {
  const debugLoggedRef = (0, import_react4.useRef)(0);
  const timelineItems = (0, import_react4.useMemo)(() => {
    return items.map((entry) => {
      const actividadIdRaw = (entry.actividadId ?? entry.ActividadId ?? "").toString().trim();
      const actividadId = actividadIdRaw || "";
      const recIdRaw = entry.recId ?? entry.RecId ?? "";
      const recId = recIdRaw && !Number.isNaN(Number(recIdRaw)) ? Number(recIdRaw) : null;
      let linkId = actividadId || (recId ? recId.toString() : "");
      if (debugLoggedRef.current < 5) {
        logHistory2("activity item", { actividadId, recIdRaw, recId });
        debugLoggedRef.current += 1;
      }
      const rawName = (entry.name ?? entry.Name ?? "").toString().trim();
      const fullName = toTitleCase2(rawName, locale);
      const fecha = (entry.transDate ?? entry.TransDate ?? "").toString();
      const rawDesc = (entry.description ?? entry.Description ?? "").toString().trim();
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
        dateParts: formatDateParts2(fecha, locale),
        isNoData: isNoDataCard
      };
    });
  }, [formatDateParts2, items, locale, logHistory2, noDataText, toTitleCase2]);
  return { timelineItems };
};

// Web/wwwroot/react/src/components/commons/FloatingActionButton.tsx
var import_react5 = __toESM(require_react());
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
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
  const btnRef = (0, import_react5.useRef)(null);
  const canvasRef = (0, import_react5.useRef)(null);
  const buildFabSvg = (0, import_react5.useCallback)(() => {
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
  const renderSvgToCanvas = (0, import_react5.useCallback)(() => {
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
  (0, import_react5.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("canvas", { ref: canvasRef, className: "block rounded-md" })
    }
  );
};
var FloatingActionButton_default = FloatingActionButton;

// Web/wwwroot/react/src/components/commons/CompactPagination.tsx
var import_react6 = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var DEFAULT_WINDOW = 6;
var CompactPagination = (0, import_react6.forwardRef)(
  ({ totalPages, currentPage, pageWindow = DEFAULT_WINDOW, onPageChange, labels, className }, ref) => {
    const safeTotal = Math.max(0, totalPages || 0);
    const safeCurrent = Math.min(Math.max(1, currentPage || 1), safeTotal || 1);
    const windowSize = Math.max(1, pageWindow || DEFAULT_WINDOW);
    const showPagination = safeTotal > 1;
    const showEdgeNav = safeTotal > windowSize;
    const canJumpToStart = safeCurrent > windowSize;
    const canGoPrev = safeCurrent > 1;
    const canGoNext = safeCurrent < safeTotal;
    const pageNumbers = (0, import_react6.useMemo)(() => {
      if (!safeTotal) return [];
      const windowStart = Math.max(1, Math.floor((safeCurrent - 1) / windowSize) * windowSize + 1);
      const windowEnd = Math.min(safeTotal, windowStart + windowSize - 1);
      return Array.from({ length: windowEnd - windowStart + 1 }, (_val, idx) => windowStart + idx);
    }, [safeCurrent, safeTotal, windowSize]);
    if (!showPagination) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "div",
      {
        id: "pagination",
        ref,
        className: classNames(
          "pagination grid grid-cols-[1fr_auto_1fr] items-center gap-1",
          className || ""
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-1 justify-start", children: [
            showEdgeNav && canJumpToStart && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                type: "button",
                className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                "aria-label": labels?.first,
                onClick: (e) => {
                  e.preventDefault();
                  onPageChange(1);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" }) })
              }
            ),
            showEdgeNav && canGoPrev && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                type: "button",
                className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                "aria-label": labels?.prev,
                onClick: (e) => {
                  e.preventDefault();
                  onPageChange(safeCurrent - 1);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 19.5 8.25 12l7.5-7.5" }) })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-center justify-center gap-1 min-w-0 flex-nowrap", children: pageNumbers.map((page) => {
            const isActive = page === safeCurrent;
            return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                type: "button",
                className: classNames(
                  "min-w-[26px] px-2 py-0.5 rounded-md border text-[10px] font-semibold transition",
                  isActive ? "bg-primary border-primary text-white shadow-sm" : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary"
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
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-1 justify-end", children: [
            showEdgeNav && canGoNext && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                type: "button",
                className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                "aria-label": labels?.next,
                onClick: (e) => {
                  e.preventDefault();
                  onPageChange(safeCurrent + 1);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m8.25 4.5 7.5 7.5-7.5 7.5" }) })
              }
            ),
            showEdgeNav && canGoNext && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                type: "button",
                className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                "aria-label": labels?.last,
                onClick: (e) => {
                  e.preventDefault();
                  onPageChange(safeTotal);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" }) })
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
var import_jsx_runtime6 = __toESM(require_jsx_runtime());
var FilterButton = ({
  label,
  active = false,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
var import_jsx_runtime7 = __toESM(require_jsx_runtime());
var ActionButton = ({
  label,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button"
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
var import_react7 = __toESM(require_react());
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
  const [items, setItems] = (0, import_react7.useState)([]);
  const [total, setTotal] = (0, import_react7.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react7.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react7.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react7.useState)("");
  const retryOnNetworkErrorRef = (0, import_react7.useRef)(false);
  const activeAbortRef = (0, import_react7.useRef)(null);
  const activeRequestIdRef = (0, import_react7.useRef)(0);
  const retryTimerRef = (0, import_react7.useRef)(null);
  const lastSignatureRef = (0, import_react7.useRef)("");
  const clearRetryTimer = (0, import_react7.useCallback)(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);
  const abortActiveRequest = (0, import_react7.useCallback)(() => {
    if (!activeAbortRef.current) return;
    try {
      activeAbortRef.current.abort();
    } catch {
    }
    activeAbortRef.current = null;
  }, []);
  const resetActivities = (0, import_react7.useCallback)(() => {
    clearRetryTimer();
    abortActiveRequest();
    setItems([]);
    setTotal(0);
    setErrorMessage("");
    setIsLoading(false);
  }, [abortActiveRequest, clearRetryTimer]);
  const loadActivities = (0, import_react7.useCallback)(
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
      let data;
      try {
        data = await fetchJson(`/Historial/GetActivities?page=${page}&pageSize=${pageSize}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
          suppressPermissionModal: true
        });
      } catch (err) {
        if (requestId !== activeRequestIdRef.current) return;
        if (err?.name === "AbortError") {
          activeAbortRef.current = null;
          return;
        }
        if (err instanceof ApiFetchError && err.status === 403) {
          setIsLoading(false);
          activeAbortRef.current = null;
          onForbidden();
          return;
        }
        const isNetworkError = !(err instanceof ApiFetchError) || typeof err.status !== "number";
        if (isNetworkError && retryOnNetworkErrorRef.current) {
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
        setErrorMessage(err?.message || indT("Api_RequestFailed", "No se pudo conectar con el servidor (red)."));
        activeAbortRef.current = null;
        return;
      }
      if (requestId !== activeRequestIdRef.current) return;
      onDebug?.("loadActivities:response", {
        status: 200,
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
  (0, import_react7.useEffect)(() => {
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
var import_react8 = __toESM(require_react());
var HISTORY_CACHE_TTL_MS = 12 * 60 * 60 * 1e3;
var normalizeCachedFilter = (value) => {
  if (!value || typeof value !== "object") return null;
  return {
    fromDate: value.fromDate || "",
    toDate: value.toDate || "",
    page: value.page,
    clientAccount: value.clientAccount || "",
    clientText: value.clientText || ""
  };
};
var useHistoryFilterCache = () => {
  const readCachedFilter = (0, import_react8.useCallback)(() => {
    const parsed = getSessionJsonWithExpiry(HISTORY_FILTER_KEY);
    return normalizeCachedFilter(parsed);
  }, []);
  const clearFilterCache = (0, import_react8.useCallback)(() => {
    removeSessionValueWithExpiry(HISTORY_FILTER_KEY);
    removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
  }, []);
  const consumeReturnFlag = (0, import_react8.useCallback)(() => {
    const raw = getSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
    if (raw === "1") {
      removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
      return true;
    }
    return false;
  }, []);
  const saveCachedFilter = (0, import_react8.useCallback)((filter) => {
    setSessionJsonWithExpiry(HISTORY_FILTER_KEY, filter, HISTORY_CACHE_TTL_MS);
    setSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY, "1", HISTORY_CACHE_TTL_MS);
  }, []);
  return {
    readCachedFilter,
    clearFilterCache,
    consumeReturnFlag,
    saveCachedFilter
  };
};

// Web/wwwroot/react/src/pages/visitas/historial/useHistoryFiltersState.ts
var import_react9 = __toESM(require_react());
var useHistoryFiltersState = ({
  defaultFromDate,
  defaultToDate,
  logHistory: logHistory2,
  parseDateValue: parseDateValue2,
  parseISO: parseISO2,
  toISO: toISO2,
  startOfDay: startOfDay2,
  isBefore: isBefore2
}) => {
  const [startDate, setStartDate] = (0, import_react9.useState)(null);
  const [endDate, setEndDate] = (0, import_react9.useState)(null);
  const [manualStartDate, setManualStartDate] = (0, import_react9.useState)(null);
  const [manualEndDate, setManualEndDate] = (0, import_react9.useState)(null);
  const [hoverDate, setHoverDate] = (0, import_react9.useState)(null);
  const [selectingStep, setSelectingStep] = (0, import_react9.useState)("start");
  const [currentMonth, setCurrentMonth] = (0, import_react9.useState)((/* @__PURE__ */ new Date()).getMonth());
  const [currentYear, setCurrentYear] = (0, import_react9.useState)((/* @__PURE__ */ new Date()).getFullYear());
  const [isOpen, setIsOpen] = (0, import_react9.useState)(false);
  const [showManualPickerPanel, setShowManualPickerPanel] = (0, import_react9.useState)(false);
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react9.useState)(null);
  const [selectedClient, setSelectedClient] = (0, import_react9.useState)(null);
  const [clientResetKey, setClientResetKey] = (0, import_react9.useState)(0);
  const [showFilters, setShowFilters] = (0, import_react9.useState)(true);
  const [showManualError, setShowManualError] = (0, import_react9.useState)(false);
  const hasRestoredFilterRef = (0, import_react9.useRef)(false);
  const didInitFilterRef = (0, import_react9.useRef)(false);
  const fromDateValue = (0, import_react9.useMemo)(() => startDate ? toISO2(startDate) : "", [startDate, toISO2]);
  const toDateValue = (0, import_react9.useMemo)(() => endDate ? toISO2(endDate) : "", [endDate, toISO2]);
  const accountNumValue = (0, import_react9.useMemo)(() => selectedClient ? selectedClient.value : "", [selectedClient]);
  const validateManualRange = (0, import_react9.useCallback)(() => {
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
  const applyDefaultRangeFromProps = (0, import_react9.useCallback)(() => {
    if (!defaultFromDate || !defaultToDate) return null;
    const startRaw = parseDateValue2(defaultFromDate);
    const endRaw = parseDateValue2(defaultToDate);
    if (!startRaw || !endRaw) return null;
    const startDay = startOfDay2(startRaw);
    const endDay = startOfDay2(endRaw);
    let start = startDay;
    let end = endDay;
    if (isBefore2(end, start)) {
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
    return {
      page: 1,
      override: {
        fromDate: toISO2(start),
        toDate: toISO2(end),
        accountNum: ""
      }
    };
  }, [defaultFromDate, defaultToDate, isBefore2, parseDateValue2, startOfDay2, toISO2]);
  const resetHistoryFilters = (0, import_react9.useCallback)(() => {
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
  }, []);
  const applyCachedFilter = (0, import_react9.useCallback)(
    (filter) => {
      if (!filter || !filter.fromDate || !filter.toDate) return null;
      const start = parseISO2(filter.fromDate);
      const end = parseISO2(filter.toDate);
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
      return {
        page: pageToLoad,
        override: {
          fromDate: filter.fromDate,
          toDate: filter.toDate,
          accountNum: filter.clientAccount || ""
        }
      };
    },
    [parseISO2]
  );
  const handleSelect = (0, import_react9.useCallback)(
    (dateObj) => {
      logHistory2("handleSelect", {
        clicked: toISO2(dateObj),
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
        if (isBefore2(newEnd, newStart2)) {
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
      if (hasEnd && endDate && isBefore2(endDate, newStart)) {
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
    [endDate, fromDateValue, isBefore2, logHistory2, selectingStep, startDate, toDateValue, toISO2]
  );
  const handleClearState = (0, import_react9.useCallback)(
    (event) => {
      event.stopPropagation();
      logHistory2("clearRange");
      setActiveQuickFilter(null);
      setShowManualError(false);
      setShowManualPickerPanel(false);
      resetHistoryFilters();
      setIsOpen(false);
      setShowFilters(true);
    },
    [logHistory2, resetHistoryFilters]
  );
  const openPopover = (0, import_react9.useCallback)(
    (section) => {
      logHistory2("openPopover", { section, start: fromDateValue, end: toDateValue, selectingStep });
      setShowManualError(false);
      setActiveQuickFilter("custom");
      setShowManualPickerPanel(true);
      if (section === "end" && !startDate) {
        setSelectingStep("start");
      } else {
        setSelectingStep(section);
      }
      setIsOpen(true);
    },
    [fromDateValue, logHistory2, selectingStep, startDate, toDateValue]
  );
  const handleActivatorKeyDown = (0, import_react9.useCallback)(
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover("start");
    },
    [openPopover]
  );
  const handleSectionKeyDown = (0, import_react9.useCallback)(
    (event, section) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      openPopover(section);
    },
    [openPopover]
  );
  const applyQuickRange = (0, import_react9.useCallback)(
    (filterId, start, end) => {
      const startDay = startOfDay2(start);
      const endDay = startOfDay2(end);
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
    [startOfDay2]
  );
  const handleQuickFilter = (0, import_react9.useCallback)(
    (filterId) => {
      const today = startOfDay2(/* @__PURE__ */ new Date());
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
    [applyQuickRange, manualEndDate, manualStartDate, showManualPickerPanel, startOfDay2]
  );
  const handleClientSelected = (0, import_react9.useCallback)((client) => {
    setSelectedClient(client);
  }, []);
  return {
    startDate,
    endDate,
    manualStartDate,
    manualEndDate,
    hoverDate,
    selectingStep,
    currentMonth,
    currentYear,
    isOpen,
    showManualPickerPanel,
    activeQuickFilter,
    selectedClient,
    clientResetKey,
    showFilters,
    showManualError,
    fromDateValue,
    toDateValue,
    accountNumValue,
    hasRestoredFilterRef,
    didInitFilterRef,
    setStartDate,
    setEndDate,
    setManualStartDate,
    setManualEndDate,
    setHoverDate,
    setSelectingStep,
    setCurrentMonth,
    setCurrentYear,
    setIsOpen,
    setShowManualPickerPanel,
    setActiveQuickFilter,
    setSelectedClient,
    setClientResetKey,
    setShowFilters,
    setShowManualError,
    validateManualRange,
    applyDefaultRangeFromProps,
    resetHistoryFilters,
    applyCachedFilter,
    handleSelect,
    handleClearState,
    openPopover,
    handleActivatorKeyDown,
    handleSectionKeyDown,
    handleQuickFilter,
    handleClientSelected
  };
};

// Web/wwwroot/react/src/pages/visitas/historial/HistoryPage.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime());
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
  if (debugFlag !== true) return;
  if (data) {
    console.debug("[History]", message, data);
  } else {
    console.debug("[History]", message);
  }
};
var HistoryPage = ({ defaultFromDate = "", defaultToDate = "" }) => {
  const locale = (0, import_react10.useMemo)(() => getUiLocale(), []);
  const canViewHistory = canAccess("VISITAS_HISTORIAL", "View");
  const canCreateVisit = canAccess("VISITAS_CREACION", "Add");
  const noDataText = indT("Common_NoData", "No data");
  const activatorRef = (0, import_react10.useRef)(null);
  const popoverRef = (0, import_react10.useRef)(null);
  const paginationRef = (0, import_react10.useRef)(null);
  const [fabBottom, setFabBottom] = (0, import_react10.useState)(FAB_BASE_BOTTOM);
  const { readCachedFilter, clearFilterCache, consumeReturnFlag, saveCachedFilter } = useHistoryFilterCache();
  const {
    startDate,
    endDate,
    manualStartDate,
    manualEndDate,
    hoverDate,
    selectingStep,
    currentMonth,
    currentYear,
    isOpen,
    showManualPickerPanel,
    activeQuickFilter,
    selectedClient,
    clientResetKey,
    showFilters,
    showManualError,
    fromDateValue,
    toDateValue,
    accountNumValue,
    hasRestoredFilterRef,
    didInitFilterRef,
    setHoverDate,
    setSelectingStep,
    setCurrentMonth,
    setCurrentYear,
    setIsOpen,
    setShowFilters,
    setShowManualError,
    validateManualRange,
    applyDefaultRangeFromProps,
    resetHistoryFilters,
    applyCachedFilter,
    handleSelect,
    handleClearState,
    openPopover,
    handleActivatorKeyDown,
    handleSectionKeyDown,
    handleQuickFilter,
    handleClientSelected
  } = useHistoryFiltersState({
    defaultFromDate,
    defaultToDate,
    logHistory,
    parseDateValue,
    parseISO,
    toISO,
    startOfDay,
    isBefore
  });
  const { items, total, currentPage, isLoading, errorMessage, loadActivities, resetActivities, retryOnNetworkErrorRef, lastSignatureRef } = useHistoryActivities({
    fromDateValue,
    toDateValue,
    accountNumValue,
    pageSize: PAGE_SIZE,
    normalizeRange,
    onForbidden: showPermissionModal,
    onDebug: logHistory
  });
  (0, import_react10.useEffect)(() => {
    logHistory("init", { defaultFromDate, defaultToDate });
  }, [defaultFromDate, defaultToDate]);
  const applyFilters = (0, import_react10.useCallback)(
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
  const updateFabBottom = (0, import_react10.useCallback)(() => {
    if (!paginationRef.current || totalPages <= 1) {
      setFabBottom(FAB_BASE_BOTTOM);
      return;
    }
    const height = paginationRef.current.offsetHeight || 0;
    const next = Math.max(FAB_BASE_BOTTOM, height + FAB_CLEARANCE + FAB_GAP);
    setFabBottom((prev) => Math.abs(prev - next) < 1 ? prev : next);
  }, [totalPages]);
  useHistoryPageListeners({
    isOpen,
    activatorRef,
    popoverRef,
    paginationRef,
    hasRestoredFilterRef,
    retryOnNetworkErrorRef,
    currentPage,
    updateFabBottom,
    logHistory,
    consumeReturnFlag,
    readCachedFilter,
    applyCachedFilter,
    loadActivities,
    setIsOpen,
    setHoverDate,
    setShowFilters,
    applyFilters
  });
  (0, import_react10.useEffect)(() => {
    if (didInitFilterRef.current) return;
    didInitFilterRef.current = true;
    const cached = consumeReturnFlag() ? readCachedFilter() : null;
    if (cached && cached.fromDate && cached.toDate) {
      logHistory("restoreFilter", cached);
      const cachedRequest = applyCachedFilter(cached);
      if (cachedRequest) {
        retryOnNetworkErrorRef.current = true;
        loadActivities(cachedRequest.page, cachedRequest.override);
        setShowFilters(false);
        setIsOpen(false);
        hasRestoredFilterRef.current = true;
        return;
      }
    }
    const defaultRequest = applyDefaultRangeFromProps();
    if (defaultRequest) {
      retryOnNetworkErrorRef.current = true;
      loadActivities(defaultRequest.page, defaultRequest.override);
      setShowFilters(false);
      setIsOpen(false);
      hasRestoredFilterRef.current = true;
      return;
    }
    resetHistoryFilters();
    clearFilterCache();
    resetActivities();
    setShowFilters(true);
    setIsOpen(false);
  }, [
    applyCachedFilter,
    applyDefaultRangeFromProps,
    clearFilterCache,
    consumeReturnFlag,
    didInitFilterRef,
    hasRestoredFilterRef,
    loadActivities,
    readCachedFilter,
    resetActivities,
    resetHistoryFilters,
    retryOnNetworkErrorRef
  ]);
  (0, import_react10.useEffect)(() => {
    if (startDate && !endDate && selectingStep === "start") {
      setSelectingStep("end");
      return;
    }
    if (!startDate && selectingStep !== "start") {
      setSelectingStep("start");
    }
  }, [startDate, endDate, selectingStep]);
  const handleClear = (0, import_react10.useCallback)(
    (event) => {
      handleClearState(event);
      clearFilterCache();
      resetActivities();
    },
    [clearFilterCache, handleClearState, resetActivities]
  );
  const handleResetFilters = (0, import_react10.useCallback)(() => {
    resetHistoryFilters();
    clearFilterCache();
    resetActivities();
    setIsOpen(false);
    setShowFilters(true);
  }, [clearFilterCache, resetActivities, resetHistoryFilters, setIsOpen, setShowFilters]);
  const handleNavigate = (0, import_react10.useCallback)(
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
  const calendar = (0, import_react10.useMemo)(() => {
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
  const handlePrevMonth = (0, import_react10.useCallback)(
    (event) => {
      event.stopPropagation();
      setCurrentMonth((prev) => {
        const next = prev - 1;
        if (next < 0) {
          setCurrentYear((year) => year - 1);
          return 11;
        }
        return next;
      });
    },
    [setCurrentMonth, setCurrentYear]
  );
  const handleNextMonth = (0, import_react10.useCallback)(
    (event) => {
      event.stopPropagation();
      setCurrentMonth((prev) => {
        const next = prev + 1;
        if (next > 11) {
          setCurrentYear((year) => year + 1);
          return 0;
        }
        return next;
      });
    },
    [setCurrentMonth, setCurrentYear]
  );
  const handleGridMouseLeave = (0, import_react10.useCallback)(() => {
    setHoverDate(null);
  }, [setHoverDate]);
  const handleManualDayClick = (0, import_react10.useCallback)(
    (cell) => {
      if (!cell.date) return;
      logHistory("dayClick", { date: cell.iso || "", disabled: !!cell.disabled });
      handleSelect(cell.date);
    },
    [handleSelect]
  );
  const handleManualDayHover = (0, import_react10.useCallback)(
    (cell) => {
      if (!cell.date) return;
      if (selectingStep === "end" && startDate) {
        setHoverDate(new Date(cell.date));
      }
    },
    [selectingStep, setHoverDate, startDate]
  );
  const manualDayCells = (0, import_react10.useMemo)(() => {
    return calendar.cells.map((cell, idx) => {
      if (cell.isEmpty) {
        return { key: `empty-${idx}`, isEmpty: true };
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
      return {
        key: cell.iso,
        isEmpty: false,
        date: dateObj,
        iso: cell.iso,
        dayLabel: dateObj.getDate(),
        dayClass,
        disabled
      };
    });
  }, [calendar.cells, endDate, hoverDate, previewEnd, selectingStep, startDate]);
  const { timelineItems } = useHistoryTimelineItems({
    items,
    locale,
    noDataText,
    logHistory,
    toTitleCase,
    formatDateParts
  });
  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  const summaryFrom = labelFrom;
  const summaryTo = labelTo;
  const filterTitle = indT("History_Filter_Date", "Date");
  const addDateLabel = indT("History_AddDate", "Add date");
  const clearRangeLabel = indT("History_ClearRange", "Clear range");
  const prevMonthLabel = indT("History_PrevMonth", "Previous month");
  const nextMonthLabel = indT("History_NextMonth", "Next month");
  const statusSelectStartLabel = indT("History_Status_SelectStart", "Select start date");
  const statusSelectEndLabel = indT("History_Status_SelectEnd", "Select end date");
  const weekDayLabels = (0, import_react10.useMemo)(
    () => [
      indT("History_Day_Mon", "Mon"),
      indT("History_Day_Tue", "Tue"),
      indT("History_Day_Wed", "Wed"),
      indT("History_Day_Thu", "Thu"),
      indT("History_Day_Fri", "Fri"),
      indT("History_Day_Sat", "Sat"),
      indT("History_Day_Sun", "Sun")
    ],
    []
  );
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
  const quickFilters = (0, import_react10.useMemo)(
    () => [
      { id: "custom", label: quickCustomLabel },
      { id: "days-7", label: quick7DaysLabel },
      { id: "days-30", label: quick30DaysLabel },
      { id: "days-90", label: quick90DaysLabel }
    ],
    [quick30DaysLabel, quick7DaysLabel, quick90DaysLabel, quickCustomLabel]
  );
  const paginationLabels = (0, import_react10.useMemo)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "max-w-3xl mx-auto px-1 sm:px-2 pt-3 pb-4 space-y-2", children: [
    showSummary && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "filter-card filter-card--summary p-3 sm:p-4 mt-1 mb-3", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      HistorySummary_default,
      {
        summaryFromLabel: summaryFrom,
        summaryToLabel: summaryTo,
        fromValue: startDate ? formatDisplay(startDate, locale) : "--",
        toValue: endDate ? formatDisplay(endDate, locale) : "--",
        clientLabel,
        clientValue: selectedClient?.text || "",
        showClient: !!selectedClient
      }
    ) }),
    showFilters && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "filter-card filter-card--expanded p-2 sm:p-2.5 relative", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-1.5 history-filter-stack flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "grid grid-cols-2 gap-2 history-quick-filters", "aria-label": filterTitle, children: quickFilters.map((item) => {
        const isActive = activeQuickFilter === item.id;
        return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
      showInlineSummary && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        HistorySummary_default,
        {
          summaryFromLabel: summaryFrom,
          summaryToLabel: summaryTo,
          fromValue: startDate ? formatDisplay(startDate, locale) : "--",
          toValue: endDate ? formatDisplay(endDate, locale) : "--",
          className: "gap-y-1 text-[11px] px-1"
        }
      ),
      showManualPicker && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        HistoryManualDatePicker_default,
        {
          activatorRef,
          popoverRef,
          showManualError,
          showStartError: showManualError && !startDate,
          showEndError: showManualError && !endDate,
          filterTitle,
          isOpen,
          selectingStep,
          labelFrom,
          labelTo,
          startDateText: startDate ? formatDisplay(startDate, locale) : addDateLabel,
          endDateText: endDate ? formatDisplay(endDate, locale) : addDateLabel,
          clearRangeLabel,
          hasSelectedRange: !!startDate || !!endDate,
          monthLabel: calendar.label,
          weekDayLabels,
          statusText: selectingStep === "start" ? statusSelectStartLabel : statusSelectEndLabel,
          dayCells: manualDayCells,
          prevMonthLabel,
          nextMonthLabel,
          onOpenPopover: openPopover,
          onActivatorKeyDown: handleActivatorKeyDown,
          onSectionKeyDown: handleSectionKeyDown,
          onClear: handleClear,
          onPrevMonth: handlePrevMonth,
          onNextMonth: handleNextMonth,
          onGridMouseLeave: handleGridMouseLeave,
          onDayClick: handleManualDayClick,
          onDayHover: handleManualDayHover
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
      showFilterActions && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "mt-1 grid grid-cols-2 gap-2 history-filter-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          ActionButton_default,
          {
            label: clearLabel,
            className: "w-full",
            onClick: handleResetFilters
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("input", { type: "hidden", id: "fromDate", value: fromDateValue, readOnly: true }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("input", { type: "hidden", id: "toDate", value: toDateValue, readOnly: true }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      "div",
      {
        id: "resultsLoader",
        className: "loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700",
        style: { display: isLoading ? "flex" : "none" },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { className: "ind-spinner h-5 w-5", viewBox: "0 0 20 20", role: "status", "aria-label": indT("History_Loading", "Loading"), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("circle", { className: "ind-spinner__circle", cx: "10", cy: "10", r: "8", strokeWidth: "2" }) }),
          indT("History_Loading", "Loading")
        ]
      }
    ),
    showResults && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        HistoryTable_default,
        {
          items: timelineItems,
          noDataText: indT("History_NoDataInRange", "No visits in this range"),
          errorMessage,
          onNavigate: handleNavigate
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
    canCreateVisit && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
  mountReactIsland(root, /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(HistoryPage, { defaultFromDate, defaultToDate }));
};
var mount = () => {
  const rootEl = document.getElementById("visitas-history-root");
  if (!rootEl) return;
  mountHistoryPage(rootEl);
};
mountWhenDocumentReady(mount);
var HistoryPage_default = HistoryPage;
export {
  HistoryPage,
  HistoryPage_default as default,
  mountHistoryPage
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVRhYmxlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvdXNlSGlzdG9yeVRhYmxlRWZmZWN0cy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlQYWdlTGlzdGVuZXJzLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50cyIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0Zsb2F0aW5nQWN0aW9uQnV0dG9uLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0ZpbHRlckJ1dHRvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VIaXN0b3J5QWN0aXZpdGllcy50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzIiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcbmltcG9ydCB7IGNhbkFjY2Vzcywgc2hvd1Blcm1pc3Npb25Nb2RhbCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wZXJtaXNzaW9ucy50c1wiO1xuaW1wb3J0IENsaWVudFNlYXJjaENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvQ2xpZW50U2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgSGlzdG9yeVRhYmxlIGZyb20gXCIuL0hpc3RvcnlUYWJsZS50c3hcIjtcbmltcG9ydCBIaXN0b3J5U3VtbWFyeSBmcm9tIFwiLi9IaXN0b3J5U3VtbWFyeS50c3hcIjtcbmltcG9ydCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciwgeyBIaXN0b3J5TWFudWFsRGF5Q2VsbCB9IGZyb20gXCIuL0hpc3RvcnlNYW51YWxEYXRlUGlja2VyLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMgfSBmcm9tIFwiLi91c2VIaXN0b3J5UGFnZUxpc3RlbmVycy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeVRpbWVsaW5lSXRlbXMgfSBmcm9tIFwiLi91c2VIaXN0b3J5VGltZWxpbmVJdGVtcy50c1wiO1xuaW1wb3J0IEZsb2F0aW5nQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgQ29tcGFjdFBhZ2luYXRpb24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3hcIjtcbmltcG9ydCBGaWx0ZXJCdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GaWx0ZXJCdXR0b24udHN4XCI7XG5pbXBvcnQgQWN0aW9uQnV0dG9uIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQWN0aW9uQnV0dG9uLnRzeFwiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUFjdGl2aXRpZXMgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUFjdGl2aXRpZXMudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHNcIjtcbmltcG9ydCB7IHVzZUhpc3RvcnlGaWx0ZXJzU3RhdGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5pbXBvcnQgeyBtb3VudFJlYWN0SXNsYW5kLCBtb3VudFdoZW5Eb2N1bWVudFJlYWR5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3JlYWN0SXNsYW5kLnRzeFwiO1xuXHJcbnR5cGUgUHJvcHMgPSB7XHJcbiAgZGVmYXVsdEZyb21EYXRlPzogc3RyaW5nO1xyXG4gIGRlZmF1bHRUb0RhdGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENhbGVuZGFyQ2VsbCA9IHtcbiAgZGF0ZTogRGF0ZSB8IG51bGw7XG4gIGlzbzogc3RyaW5nO1xuICBpc0VtcHR5OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgUEFHRV9TSVpFID0gNjtcbmNvbnN0IFBBR0VfV0lORE9XID0gNjtcbmNvbnN0IE5BVl9ERUxBWV9NUyA9IDMyMDtcbmNvbnN0IEZBQl9CQVNFX0JPVFRPTSA9IDMyO1xuY29uc3QgRkFCX0NMRUFSQU5DRSA9IDI0O1xuY29uc3QgRkFCX0dBUCA9IDEyO1xuXHJcbmNvbnN0IG5vcm1hbGl6ZVVpTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgY29uc3QgdmFsdWUgPSBTdHJpbmcobG9jYWxlIHx8IFwiXCIpLnRyaW0oKTtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJlcy1FU1wiO1xyXG4gIGlmICgvXnpoLWhhbnMvaS50ZXN0KHZhbHVlKSkgcmV0dXJuIFwiemgtQ05cIjtcclxuICByZXR1cm4gdmFsdWU7XHJcbn07XHJcblxyXG5jb25zdCBpc0Jhc3F1ZUxvY2FsZSA9IChsb2NhbGU6IHN0cmluZykgPT4gL15ldVxcYi9pLnRlc3QoU3RyaW5nKGxvY2FsZSB8fCBcIlwiKSk7XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTID0gW1xyXG4gIFwidXJ0YXJyaWxhXCIsXHJcbiAgXCJvdHNhaWxhXCIsXHJcbiAgXCJtYXJ0eG9hXCIsXHJcbiAgXCJhcGlyaWxhXCIsXHJcbiAgXCJtYWlhdHphXCIsXHJcbiAgXCJla2FpbmFcIixcclxuICBcInV6dGFpbGFcIixcclxuICBcImFidXp0dWFcIixcclxuICBcImlyYWlsYVwiLFxyXG4gIFwidXJyaWFcIixcclxuICBcImF6YXJvYVwiLFxyXG4gIFwiYWJlbmR1YVwiLFxyXG5dO1xyXG5cclxuY29uc3QgQkFTUVVFX01PTlRIU19TSE9SVCA9IFtcclxuICBcInVydFwiLFxyXG4gIFwib3RzXCIsXHJcbiAgXCJtYXJcIixcclxuICBcImFwaVwiLFxyXG4gIFwibWFpXCIsXHJcbiAgXCJla2FcIixcclxuICBcInV6dFwiLFxyXG4gIFwiYWJ1XCIsXHJcbiAgXCJpcmFcIixcclxuICBcInVyclwiLFxyXG4gIFwiYXphXCIsXHJcbiAgXCJhYmVcIixcclxuXTtcclxuXHJcbmNvbnN0IGdldFVpTG9jYWxlID0gKCkgPT4ge1xyXG4gIGNvbnN0IGZyb21IdG1sID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgOiBcIlwiO1xyXG4gIGlmIChmcm9tSHRtbCAmJiBTdHJpbmcoZnJvbUh0bWwpLnRyaW0oKSkgcmV0dXJuIG5vcm1hbGl6ZVVpTG9jYWxlKGZyb21IdG1sKTtcclxuICByZXR1cm4gXCJlcy1FU1wiO1xyXG59O1xyXG5cclxuY29uc3QgcGFkID0gKG46IG51bWJlcikgPT4gbi50b1N0cmluZygpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuXHJcbmNvbnN0IHRvSVNPID0gKGQ6IERhdGUpID0+IGAke2QuZ2V0RnVsbFllYXIoKX0tJHtwYWQoZC5nZXRNb250aCgpICsgMSl9LSR7cGFkKGQuZ2V0RGF0ZSgpKX1gO1xyXG5cclxuY29uc3Qgc3RhcnRPZkRheSA9IChkOiBEYXRlKSA9PiBuZXcgRGF0ZShkLmdldEZ1bGxZZWFyKCksIGQuZ2V0TW9udGgoKSwgZC5nZXREYXRlKCkpO1xyXG5cclxuY29uc3QgcGFyc2VJU08gPSAoczogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCFzKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBwYXJ0cyA9IHMuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHJldHVybiBudWxsO1xyXG4gIHJldHVybiBuZXcgRGF0ZShwYXJ0c1swXSwgcGFydHNbMV0gLSAxLCBwYXJ0c1syXSk7XHJcbn07XHJcblxyXG5jb25zdCBzYW1lRGF5ID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpID09PSBiLmdldFRpbWUoKSk7XHJcblxyXG5jb25zdCBpc0JlZm9yZSA9IChhOiBEYXRlIHwgbnVsbCwgYjogRGF0ZSB8IG51bGwpID0+ICEhKGEgJiYgYiAmJiBhLmdldFRpbWUoKSA8IGIuZ2V0VGltZSgpKTtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplUmFuZ2UgPSAoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKSA9PiB7XHJcbiAgICBpZiAoIWZyb20gfHwgIXRvKSByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gICAgY29uc3QgZnJvbURhdGUgPSBwYXJzZUlTTyhmcm9tKTtcclxuICAgIGNvbnN0IHRvRGF0ZSA9IHBhcnNlSVNPKHRvKTtcclxuICAgIGlmICghZnJvbURhdGUgfHwgIXRvRGF0ZSkgcmV0dXJuIHsgZnJvbSwgdG8gfTtcclxuICBpZiAoaXNCZWZvcmUodG9EYXRlLCBmcm9tRGF0ZSkpIHtcclxuICAgIHJldHVybiB7IGZyb206IHRvSVNPKHRvRGF0ZSksIHRvOiB0b0lTTyhmcm9tRGF0ZSkgfTtcclxuICB9XHJcbiAgcmV0dXJuIHsgZnJvbTogdG9JU08oZnJvbURhdGUpLCB0bzogdG9JU08odG9EYXRlKSB9O1xyXG59O1xyXG5cclxuICBjb25zdCBmb3JtYXREaXNwbGF5ID0gKGQ6IERhdGUsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIGNvbnN0IG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldO1xyXG4gICAgcmV0dXJuIGAke2QuZ2V0RGF0ZSgpfSAke21vbnRofSAke2QuZ2V0RnVsbFllYXIoKX1gLnRvTG93ZXJDYXNlKCk7XHJcbiAgfVxyXG4gIHJldHVybiBkXHJcbiAgICAudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwge1xyXG4gICAgICBkYXk6IFwibnVtZXJpY1wiLFxyXG4gICAgICBtb250aDogXCJzaG9ydFwiLFxyXG4gICAgICB5ZWFyOiBcIm51bWVyaWNcIixcclxuICAgIH0pXHJcbiAgICAucmVwbGFjZSgvXFwuL2csIFwiXCIpXHJcbiAgICAudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdE1vbnRoTGFiZWwgPSAoZDogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoL156aC9pLnRlc3QobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIG5ldyBJbnRsLkRhdGVUaW1lRm9ybWF0KGxvY2FsZSwgeyB5ZWFyOiBcIm51bWVyaWNcIiwgbW9udGg6IFwibG9uZ1wiIH0pLmZvcm1hdChkKTtcclxuICB9XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIHJldHVybiBgJHtCQVNRVUVfTU9OVEhTW2QuZ2V0TW9udGgoKV19ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbiAgfVxyXG4gIGNvbnN0IG1vbnRoTmFtZSA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJsb25nXCIgfSk7XHJcbiAgY29uc3QgY2FwTW9udGhOYW1lID0gbW9udGhOYW1lICYmIC9bQS1aYS16XS8udGVzdChtb250aE5hbWVbMF0pXHJcbiAgICA/IG1vbnRoTmFtZVswXS50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpICsgbW9udGhOYW1lLnNsaWNlKDEpXHJcbiAgICA6IG1vbnRoTmFtZTtcclxuICByZXR1cm4gYCR7Y2FwTW9udGhOYW1lfSAke2QuZ2V0RnVsbFllYXIoKX1gO1xyXG59O1xyXG5cclxuY29uc3QgcGFyc2VEYXRlVmFsdWUgPSAodmFsdWU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHJhdyA9IFN0cmluZyh2YWx1ZSkudHJpbSgpO1xyXG4gIGlmICghcmF3KSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgZGF0ZVBhcnQgPSByYXcuc3BsaXQoXCJUXCIpWzBdLnNwbGl0KFwiIFwiKVswXTtcclxuXHJcbiAgaWYgKC9eXFxkezR9LVxcZHsyfS1cXGR7Mn0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgW3ksIG0sIGRdID0gZGF0ZVBhcnQuc3BsaXQoXCItXCIpLm1hcChOdW1iZXIpO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGlmICgvXlxcZHsyfVsuLy1dXFxkezJ9Wy4vLV1cXGR7NH0kLy50ZXN0KGRhdGVQYXJ0KSkge1xyXG4gICAgY29uc3QgcGFydHMgPSBkYXRlUGFydC5zcGxpdCgvWy4vLV0vKS5tYXAoTnVtYmVyKTtcclxuICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlKHksIG0gLSAxLCBkKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHBhcnNlZCA9IG5ldyBEYXRlKHJhdyk7XHJcbiAgcmV0dXJuIE51bWJlci5pc05hTihwYXJzZWQuZ2V0VGltZSgpKSA/IG51bGwgOiBwYXJzZWQ7XHJcbn07XHJcblxyXG5jb25zdCBmb3JtYXREYXRlUGFydHMgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4geyB5ZWFyOiBcIlwiLCBtb250aDogXCJcIiwgZGF5OiBcIlwiIH07XHJcbiAgY29uc3QgZCA9IHBhcnNlRGF0ZVZhbHVlKHZhbHVlKTtcclxuICBpZiAoIWQpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBsZXQgbW9udGggPSBcIlwiO1xyXG4gIGlmIChpc0Jhc3F1ZUxvY2FsZShsb2NhbGUpKSB7XHJcbiAgICBtb250aCA9IEJBU1FVRV9NT05USFNfU0hPUlRbZC5nZXRNb250aCgpXSB8fCBcIlwiO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBtb250aCA9IGQudG9Mb2NhbGVEYXRlU3RyaW5nKGxvY2FsZSwgeyBtb250aDogXCJzaG9ydFwiIH0pLnJlcGxhY2UoL1xcLi9nLCBcIlwiKTtcclxuICB9XHJcbiAgcmV0dXJuIHtcclxuICAgIHllYXI6IFN0cmluZyhkLmdldEZ1bGxZZWFyKCkpLFxyXG4gICAgbW9udGg6IG1vbnRoLnRvVXBwZXJDYXNlKCksXHJcbiAgICBkYXk6IFN0cmluZyhkLmdldERhdGUoKSkucGFkU3RhcnQoMiwgXCIwXCIpLFxyXG4gIH07XHJcbn07XHJcblxyXG5jb25zdCB0b1RpdGxlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IGxvd2VyID0gdmFsdWUudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICB0cnkge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFteXFxwe0x9XSkoXFxwe0x9KS9ndSwgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9IGNhdGNoIHtcclxuICAgIHJldHVybiBsb3dlci5yZXBsYWNlKC8oXnxbXFxzLS9dKShcXFMpL2csIChfbWF0Y2gsIHByZWZpeCwgY2gpID0+IGAke3ByZWZpeH0ke2NoLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSl9YCk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgdG9TZW50ZW5jZUNhc2UgPSAodmFsdWU6IHN0cmluZywgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICBjb25zdCB0cmltbWVkID0gdmFsdWUudHJpbSgpO1xyXG4gIGlmICghdHJpbW1lZCkgcmV0dXJuIHRyaW1tZWQ7XHJcbiAgY29uc3QgbG93ZXIgPSB0cmltbWVkLnRvTG9jYWxlTG93ZXJDYXNlKGxvY2FsZSk7XHJcbiAgcmV0dXJuIGxvd2VyWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBsb3dlci5zbGljZSgxKTtcclxufTtcclxuXHJcbmNvbnN0IGxvZ0hpc3RvcnkgPSAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgY29uc3QgZGVidWdGbGFnID0gKHdpbmRvdyBhcyBhbnkpLl9fSU5EX0RFQlVHX0hJU1RPUllfXztcbiAgaWYgKGRlYnVnRmxhZyAhPT0gdHJ1ZSkgcmV0dXJuO1xuICBpZiAoZGF0YSkge1xuICAgIGNvbnNvbGUuZGVidWcoXCJbSGlzdG9yeV1cIiwgbWVzc2FnZSwgZGF0YSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIltIaXN0b3J5XVwiLCBtZXNzYWdlKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBIaXN0b3J5IHBhZ2Ugd2l0aCBSZWFjdCBzdGF0ZSArIGVmZmVjdHMgKG5vIGxlZ2FjeSBET00gbG9naWMpLlxyXG5leHBvcnQgY29uc3QgSGlzdG9yeVBhZ2UgPSAoeyBkZWZhdWx0RnJvbURhdGUgPSBcIlwiLCBkZWZhdWx0VG9EYXRlID0gXCJcIiB9OiBQcm9wcykgPT4ge1xyXG4gIGNvbnN0IGxvY2FsZSA9IHVzZU1lbW8oKCkgPT4gZ2V0VWlMb2NhbGUoKSwgW10pO1xyXG4gIGNvbnN0IGNhblZpZXdIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19ISVNUT1JJQUxcIiwgXCJWaWV3XCIpO1xyXG4gIGNvbnN0IGNhbkNyZWF0ZVZpc2l0ID0gY2FuQWNjZXNzKFwiVklTSVRBU19DUkVBQ0lPTlwiLCBcIkFkZFwiKTtcclxuICBjb25zdCBub0RhdGFUZXh0ID0gaW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpO1xyXG5cclxuICBjb25zdCBhY3RpdmF0b3JSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgcG9wb3ZlclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwYWdpbmF0aW9uUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cclxuICBjb25zdCBbZmFiQm90dG9tLCBzZXRGYWJCb3R0b21dID0gdXNlU3RhdGUoRkFCX0JBU0VfQk9UVE9NKTtcblxuICBjb25zdCB7IHJlYWRDYWNoZWRGaWx0ZXIsIGNsZWFyRmlsdGVyQ2FjaGUsIGNvbnN1bWVSZXR1cm5GbGFnLCBzYXZlQ2FjaGVkRmlsdGVyIH0gPSB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUoKTtcbiAgY29uc3Qge1xuICAgIHN0YXJ0RGF0ZSxcbiAgICBlbmREYXRlLFxuICAgIG1hbnVhbFN0YXJ0RGF0ZSxcbiAgICBtYW51YWxFbmREYXRlLFxuICAgIGhvdmVyRGF0ZSxcbiAgICBzZWxlY3RpbmdTdGVwLFxuICAgIGN1cnJlbnRNb250aCxcbiAgICBjdXJyZW50WWVhcixcbiAgICBpc09wZW4sXG4gICAgc2hvd01hbnVhbFBpY2tlclBhbmVsLFxuICAgIGFjdGl2ZVF1aWNrRmlsdGVyLFxuICAgIHNlbGVjdGVkQ2xpZW50LFxuICAgIGNsaWVudFJlc2V0S2V5LFxuICAgIHNob3dGaWx0ZXJzLFxuICAgIHNob3dNYW51YWxFcnJvcixcbiAgICBmcm9tRGF0ZVZhbHVlLFxuICAgIHRvRGF0ZVZhbHVlLFxuICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIHNldEhvdmVyRGF0ZSxcbiAgICBzZXRTZWxlY3RpbmdTdGVwLFxuICAgIHNldEN1cnJlbnRNb250aCxcbiAgICBzZXRDdXJyZW50WWVhcixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgc2V0U2hvd01hbnVhbEVycm9yLFxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBoYW5kbGVTZWxlY3QsXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcbiAgICBvcGVuUG9wb3ZlcixcbiAgICBoYW5kbGVBY3RpdmF0b3JLZXlEb3duLFxuICAgIGhhbmRsZVNlY3Rpb25LZXlEb3duLFxuICAgIGhhbmRsZVF1aWNrRmlsdGVyLFxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxuICB9ID0gdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSh7XG4gICAgZGVmYXVsdEZyb21EYXRlLFxuICAgIGRlZmF1bHRUb0RhdGUsXG4gICAgbG9nSGlzdG9yeSxcbiAgICBwYXJzZURhdGVWYWx1ZSxcbiAgICBwYXJzZUlTTyxcbiAgICB0b0lTTyxcbiAgICBzdGFydE9mRGF5LFxuICAgIGlzQmVmb3JlLFxuICB9KTtcblxuICBjb25zdCB7IGl0ZW1zLCB0b3RhbCwgY3VycmVudFBhZ2UsIGlzTG9hZGluZywgZXJyb3JNZXNzYWdlLCBsb2FkQWN0aXZpdGllcywgcmVzZXRBY3Rpdml0aWVzLCByZXRyeU9uTmV0d29ya0Vycm9yUmVmLCBsYXN0U2lnbmF0dXJlUmVmIH0gPVxuICAgIHVzZUhpc3RvcnlBY3Rpdml0aWVzKHtcbiAgICAgIGZyb21EYXRlVmFsdWUsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICAgIGFjY291bnROdW1WYWx1ZSxcbiAgICAgIHBhZ2VTaXplOiBQQUdFX1NJWkUsXG4gICAgICBub3JtYWxpemVSYW5nZSxcbiAgICAgIG9uRm9yYmlkZGVuOiBzaG93UGVybWlzc2lvbk1vZGFsLFxuICAgICAgb25EZWJ1ZzogbG9nSGlzdG9yeSxcbiAgICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxvZ0hpc3RvcnkoXCJpbml0XCIsIHsgZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlIH0pO1xuICB9LCBbZGVmYXVsdEZyb21EYXRlLCBkZWZhdWx0VG9EYXRlXSk7XG5cclxuICBjb25zdCBhcHBseUZpbHRlcnMgPSB1c2VDYWxsYmFjayhcbiAgICAob3B0aW9ucz86IHsgY2xvc2VQYW5lbD86IGJvb2xlYW47IGZvcmNlPzogYm9vbGVhbjsgcGFnZT86IG51bWJlciB9KSA9PiB7XHJcbiAgICAgIGlmICghdmFsaWRhdGVNYW51YWxSYW5nZSgpKSByZXR1cm47XHJcbiAgICAgIGlmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplUmFuZ2UoZnJvbURhdGVWYWx1ZSwgdG9EYXRlVmFsdWUpO1xyXG4gICAgICBjb25zdCBwYWdlID0gb3B0aW9ucz8ucGFnZSA/PyAxO1xyXG4gICAgICBjb25zdCBzaWduYXR1cmUgPSBgJHtub3JtYWxpemVkLmZyb219fCR7bm9ybWFsaXplZC50b318JHthY2NvdW50TnVtVmFsdWV9fCR7cGFnZX1gO1xyXG5cclxuICAgICAgaWYgKG9wdGlvbnM/LmZvcmNlIHx8IGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gc2lnbmF0dXJlKSB7XHJcbiAgICAgICAgbG9hZEFjdGl2aXRpZXMocGFnZSwgeyBmcm9tRGF0ZTogbm9ybWFsaXplZC5mcm9tLCB0b0RhdGU6IG5vcm1hbGl6ZWQudG8sIGFjY291bnROdW06IGFjY291bnROdW1WYWx1ZSB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcclxuICAgICAgaWYgKG9wdGlvbnM/LmNsb3NlUGFuZWwpIHtcclxuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xyXG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFthY2NvdW50TnVtVmFsdWUsIGVuZERhdGUsIGZyb21EYXRlVmFsdWUsIGxvYWRBY3Rpdml0aWVzLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlLCB2YWxpZGF0ZU1hbnVhbFJhbmdlXVxyXG4gICk7XG5cbiAgY29uc3QgdG90YWxQYWdlcyA9IE1hdGguY2VpbCgodG90YWwgfHwgMCkgLyBQQUdFX1NJWkUpO1xuXG4gIC8vIEtlZXAgdGhlIGZsb2F0aW5nIGFjdGlvbiBidXR0b24gY2xlYXIgb2YgcGFnaW5hdGlvbiBvbiBzbWFsbCBzY3JlZW5zLlxuICBjb25zdCB1cGRhdGVGYWJCb3R0b20gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKCFwYWdpbmF0aW9uUmVmLmN1cnJlbnQgfHwgdG90YWxQYWdlcyA8PSAxKSB7XG4gICAgICBzZXRGYWJCb3R0b20oRkFCX0JBU0VfQk9UVE9NKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaGVpZ2h0ID0gcGFnaW5hdGlvblJlZi5jdXJyZW50Lm9mZnNldEhlaWdodCB8fCAwO1xuICAgIGNvbnN0IG5leHQgPSBNYXRoLm1heChGQUJfQkFTRV9CT1RUT00sIGhlaWdodCArIEZBQl9DTEVBUkFOQ0UgKyBGQUJfR0FQKTtcbiAgICBzZXRGYWJCb3R0b20oKHByZXYpID0+IChNYXRoLmFicyhwcmV2IC0gbmV4dCkgPCAxID8gcHJldiA6IG5leHQpKTtcbiAgfSwgW3RvdGFsUGFnZXNdKTtcblxuICB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyh7XG4gICAgaXNPcGVuLFxuICAgIGFjdGl2YXRvclJlZixcbiAgICBwb3BvdmVyUmVmLFxuICAgIHBhZ2luYXRpb25SZWYsXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBjdXJyZW50UGFnZSxcbiAgICB1cGRhdGVGYWJCb3R0b20sXG4gICAgbG9nSGlzdG9yeSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRIb3ZlckRhdGUsXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgYXBwbHlGaWx0ZXJzLFxuICB9KTtcblxuICAvLyBSZXN0b3JlIGNhY2hlZCBmaWx0ZXIgb24gaW5pdGlhbCBtb3VudCBvbmx5LlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBkaWRJbml0RmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgIGNvbnN0IGNhY2hlZCA9IGNvbnN1bWVSZXR1cm5GbGFnKCkgPyByZWFkQ2FjaGVkRmlsdGVyKCkgOiBudWxsO1xuICAgIGlmIChjYWNoZWQgJiYgY2FjaGVkLmZyb21EYXRlICYmIGNhY2hlZC50b0RhdGUpIHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJyZXN0b3JlRmlsdGVyXCIsIGNhY2hlZCk7XG4gICAgICBjb25zdCBjYWNoZWRSZXF1ZXN0ID0gYXBwbHlDYWNoZWRGaWx0ZXIoY2FjaGVkKTtcbiAgICAgIGlmIChjYWNoZWRSZXF1ZXN0KSB7XG4gICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIGxvYWRBY3Rpdml0aWVzKGNhY2hlZFJlcXVlc3QucGFnZSwgY2FjaGVkUmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICAgIHNldFNob3dGaWx0ZXJzKGZhbHNlKTtcbiAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0UmVxdWVzdCA9IGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzKCk7XG4gICAgaWYgKGRlZmF1bHRSZXF1ZXN0KSB7XG4gICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgbG9hZEFjdGl2aXRpZXMoZGVmYXVsdFJlcXVlc3QucGFnZSwgZGVmYXVsdFJlcXVlc3Qub3ZlcnJpZGUpO1xuICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICBjbGVhckZpbHRlckNhY2hlKCk7XG4gICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgfSwgW1xuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGFwcGx5RGVmYXVsdFJhbmdlRnJvbVByb3BzLFxuICAgIGNsZWFyRmlsdGVyQ2FjaGUsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgZGlkSW5pdEZpbHRlclJlZixcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICBsb2FkQWN0aXZpdGllcyxcbiAgICByZWFkQ2FjaGVkRmlsdGVyLFxuICAgIHJlc2V0QWN0aXZpdGllcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gIF0pO1xuXHJcbiAgLy8gS2VlcCB0aGUgcGlja2VyIHN0ZXAgaW4gc3luYyB3aXRoIGN1cnJlbnQgc2VsZWN0aW9uLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoc3RhcnREYXRlICYmICFlbmREYXRlICYmIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIikge1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIXN0YXJ0RGF0ZSAmJiBzZWxlY3RpbmdTdGVwICE9PSBcInN0YXJ0XCIpIHtcclxuICAgICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xyXG4gICAgfVxyXG4gIH0sIFtzdGFydERhdGUsIGVuZERhdGUsIHNlbGVjdGluZ1N0ZXBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ2xlYXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGhhbmRsZUNsZWFyU3RhdGUoZXZlbnQpO1xuICAgICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xuICAgICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgfSxcbiAgICBbY2xlYXJGaWx0ZXJDYWNoZSwgaGFuZGxlQ2xlYXJTdGF0ZSwgcmVzZXRBY3Rpdml0aWVzXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVJlc2V0RmlsdGVycyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzKCk7XG4gICAgY2xlYXJGaWx0ZXJDYWNoZSgpO1xuICAgIHJlc2V0QWN0aXZpdGllcygpO1xuICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgc2V0U2hvd0ZpbHRlcnModHJ1ZSk7XG4gIH0sIFtjbGVhckZpbHRlckNhY2hlLCByZXNldEFjdGl2aXRpZXMsIHJlc2V0SGlzdG9yeUZpbHRlcnMsIHNldElzT3Blbiwgc2V0U2hvd0ZpbHRlcnNdKTtcblxyXG4gIGNvbnN0IGhhbmRsZU5hdmlnYXRlID0gdXNlQ2FsbGJhY2soXG4gICAgKGxpbmtJZDogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAoIWNhblZpZXdIaXN0b3J5KSB7XG4gICAgICAgIHNob3dQZXJtaXNzaW9uTW9kYWwoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNhdmVDYWNoZWRGaWx0ZXIoe1xuICAgICAgICAgIGZyb21EYXRlOiBmcm9tRGF0ZVZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgdG9EYXRlOiB0b0RhdGVWYWx1ZSB8fCBcIlwiLFxuICAgICAgICAgIHBhZ2U6IGN1cnJlbnRQYWdlLFxuICAgICAgICAgIGNsaWVudEFjY291bnQ6IHNlbGVjdGVkQ2xpZW50Py52YWx1ZSB8fCBcIlwiLFxuICAgICAgICAgIGNsaWVudFRleHQ6IHNlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCIsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBlbmNvZGVVUklDb21wb25lbnQobGlua0lkKTtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgL1Zpc2l0YXMvRGV0YWxsZS8ke3RhcmdldH1gO1xuICAgICAgfSwgTkFWX0RFTEFZX01TKTtcbiAgICB9LFxuICAgIFtjYW5WaWV3SGlzdG9yeSwgY3VycmVudFBhZ2UsIGZyb21EYXRlVmFsdWUsIHNhdmVDYWNoZWRGaWx0ZXIsIHRvRGF0ZVZhbHVlLCBzZWxlY3RlZENsaWVudF1cbiAgKTtcblxyXG4gIGNvbnN0IGNhbGVuZGFyID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBjb25zdCBmaXJzdERheSA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIDEpO1xyXG4gICAgY29uc3QgZGF5c0luTW9udGggPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoICsgMSwgMCkuZ2V0RGF0ZSgpO1xyXG4gICAgY29uc3Qgb2Zmc2V0ID0gKGZpcnN0RGF5LmdldERheSgpICsgNikgJSA3O1xyXG4gICAgY29uc3QgY2VsbHM6IENhbGVuZGFyQ2VsbFtdID0gW107XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9mZnNldDsgaSsrKSB7XHJcbiAgICAgIGNlbGxzLnB1c2goeyBkYXRlOiBudWxsLCBpc286IFwiXCIsIGlzRW1wdHk6IHRydWUgfSk7XHJcbiAgICB9XHJcbiAgICBmb3IgKGxldCBkID0gMTsgZCA8PSBkYXlzSW5Nb250aDsgZCsrKSB7XHJcbiAgICAgIGNvbnN0IGRhdGVPYmogPSBuZXcgRGF0ZShjdXJyZW50WWVhciwgY3VycmVudE1vbnRoLCBkKTtcclxuICAgICAgY2VsbHMucHVzaCh7IGRhdGU6IGRhdGVPYmosIGlzbzogdG9JU08oZGF0ZU9iaiksIGlzRW1wdHk6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2VsbHMsXHJcbiAgICAgIGxhYmVsOiBmb3JtYXRNb250aExhYmVsKGZpcnN0RGF5LCBsb2NhbGUpLFxyXG4gICAgfTtcclxuICB9LCBbY3VycmVudE1vbnRoLCBjdXJyZW50WWVhciwgbG9jYWxlXSk7XHJcblxyXG4gIGNvbnN0IHByZXZpZXdFbmQgPSBlbmREYXRlIHx8IChzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiID8gaG92ZXJEYXRlIDogbnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlUHJldk1vbnRoID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgLSAxO1xuICAgICAgICBpZiAobmV4dCA8IDApIHtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciAtIDEpO1xuICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlTmV4dE1vbnRoID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4ge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBzZXRDdXJyZW50TW9udGgoKHByZXYpID0+IHtcbiAgICAgICAgY29uc3QgbmV4dCA9IHByZXYgKyAxO1xuICAgICAgICBpZiAobmV4dCA+IDExKSB7XG4gICAgICAgICAgc2V0Q3VycmVudFllYXIoKHllYXIpID0+IHllYXIgKyAxKTtcbiAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3NldEN1cnJlbnRNb250aCwgc2V0Q3VycmVudFllYXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlR3JpZE1vdXNlTGVhdmUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICB9LCBbc2V0SG92ZXJEYXRlXSk7XG5cbiAgY29uc3QgaGFuZGxlTWFudWFsRGF5Q2xpY2sgPSB1c2VDYWxsYmFjayhcbiAgICAoY2VsbDogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XG4gICAgICBsb2dIaXN0b3J5KFwiZGF5Q2xpY2tcIiwgeyBkYXRlOiBjZWxsLmlzbyB8fCBcIlwiLCBkaXNhYmxlZDogISFjZWxsLmRpc2FibGVkIH0pO1xuICAgICAgaGFuZGxlU2VsZWN0KGNlbGwuZGF0ZSk7XG4gICAgfSxcbiAgICBbaGFuZGxlU2VsZWN0XVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU1hbnVhbERheUhvdmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGNlbGw6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB7XG4gICAgICBpZiAoIWNlbGwuZGF0ZSkgcmV0dXJuO1xuICAgICAgaWYgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgJiYgc3RhcnREYXRlKSB7XG4gICAgICAgIHNldEhvdmVyRGF0ZShuZXcgRGF0ZShjZWxsLmRhdGUpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtzZWxlY3RpbmdTdGVwLCBzZXRIb3ZlckRhdGUsIHN0YXJ0RGF0ZV1cbiAgKTtcblxuICBjb25zdCBtYW51YWxEYXlDZWxscyA9IHVzZU1lbW88SGlzdG9yeU1hbnVhbERheUNlbGxbXT4oKCkgPT4ge1xuICAgIHJldHVybiBjYWxlbmRhci5jZWxscy5tYXAoKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgaWYgKGNlbGwuaXNFbXB0eSkge1xuICAgICAgICByZXR1cm4geyBrZXk6IGBlbXB0eS0ke2lkeH1gLCBpc0VtcHR5OiB0cnVlIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGVPYmogPSBjZWxsLmRhdGUgYXMgRGF0ZTtcbiAgICAgIGNvbnN0IGlzU3RhcnQgPSBzYW1lRGF5KGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgICBjb25zdCBpc0VuZCA9IHNhbWVEYXkoZGF0ZU9iaiwgZW5kRGF0ZSk7XG4gICAgICBjb25zdCBpblJhbmdlID0gc3RhcnREYXRlICYmIHByZXZpZXdFbmQgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBwcmV2aWV3RW5kKTtcbiAgICAgIGNvbnN0IGhvdmVyUmFuZ2UgPSBzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgaG92ZXJEYXRlICYmIGlzQmVmb3JlKHN0YXJ0RGF0ZSwgZGF0ZU9iaikgJiYgaXNCZWZvcmUoZGF0ZU9iaiwgaG92ZXJEYXRlKTtcbiAgICAgIGNvbnN0IGRpc2FibGVkID0gc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiAhIXN0YXJ0RGF0ZSAmJiBpc0JlZm9yZShkYXRlT2JqLCBzdGFydERhdGUpO1xuICAgICAgY29uc3QgaXNUb2RheSA9IHNhbWVEYXkoZGF0ZU9iaiwgbmV3IERhdGUoKSk7XG5cbiAgICAgIGNvbnN0IGRheUNsYXNzID0gY2xhc3NOYW1lcyhcbiAgICAgICAgXCJkcnAtZGF5XCIsXG4gICAgICAgIGlzU3RhcnQgPyBcInN0YXJ0IHJhbmdlLXN0YXJ0XCIgOiBcIlwiLFxuICAgICAgICBpc0VuZCA/IFwiZW5kIHJhbmdlLWVuZFwiIDogXCJcIixcbiAgICAgICAgaW5SYW5nZSA/IFwiaW4tcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGhvdmVyUmFuZ2UgPyBcImhvdmVyLXJhbmdlXCIgOiBcIlwiLFxuICAgICAgICBkaXNhYmxlZCA/IFwiZGlzYWJsZWRcIiA6IFwiXCIsXG4gICAgICAgIGlzVG9kYXkgPyBcInRvZGF5XCIgOiBcIlwiXG4gICAgICApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGNlbGwuaXNvLFxuICAgICAgICBpc0VtcHR5OiBmYWxzZSxcbiAgICAgICAgZGF0ZTogZGF0ZU9iaixcbiAgICAgICAgaXNvOiBjZWxsLmlzbyxcbiAgICAgICAgZGF5TGFiZWw6IGRhdGVPYmouZ2V0RGF0ZSgpLFxuICAgICAgICBkYXlDbGFzcyxcbiAgICAgICAgZGlzYWJsZWQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbY2FsZW5kYXIuY2VsbHMsIGVuZERhdGUsIGhvdmVyRGF0ZSwgcHJldmlld0VuZCwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlXSk7XG5cclxuICBjb25zdCB7IHRpbWVsaW5lSXRlbXMgfSA9IHVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zKHtcbiAgICBpdGVtcyxcbiAgICBsb2NhbGUsXG4gICAgbm9EYXRhVGV4dCxcbiAgICBsb2dIaXN0b3J5LFxuICAgIHRvVGl0bGVDYXNlLFxuICAgIGZvcm1hdERhdGVQYXJ0cyxcbiAgfSk7XG5cclxuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XG4gIGNvbnN0IHN1bW1hcnlGcm9tID0gbGFiZWxGcm9tO1xuICBjb25zdCBzdW1tYXJ5VG8gPSBsYWJlbFRvO1xuICBjb25zdCBmaWx0ZXJUaXRsZSA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKTtcbiAgY29uc3QgYWRkRGF0ZUxhYmVsID0gaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpO1xuICBjb25zdCBjbGVhclJhbmdlTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIik7XG4gIGNvbnN0IHByZXZNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIik7XG4gIGNvbnN0IG5leHRNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKTtcbiAgY29uc3Qgc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RTdGFydFwiLCBcIlNlbGVjdCBzdGFydCBkYXRlXCIpO1xuICBjb25zdCBzdGF0dXNTZWxlY3RFbmRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RFbmRcIiwgXCJTZWxlY3QgZW5kIGRhdGVcIik7XG4gIGNvbnN0IHdlZWtEYXlMYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVHVlXCIsIFwiVHVlXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfRnJpXCIsIFwiRnJpXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXG4gICAgXSxcbiAgICBbXVxuICApO1xuICBjb25zdCBjbGVhckxhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIik7XG4gIGNvbnN0IGFwcGx5TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKTtcbiAgY29uc3QgY2xpZW50TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQ2xpZW50XCIpO1xyXG4gIGNvbnN0IHF1aWNrQ3VzdG9tTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpO1xuICBjb25zdCBxdWljazdEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja183RGF5c1wiLCBcIjcgZGF5c1wiKTtcbiAgY29uc3QgcXVpY2szMERheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIik7XG4gIGNvbnN0IHF1aWNrOTBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpO1xuICBjb25zdCBwYWdlRmlyc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKTtcbiAgY29uc3QgcGFnZVByZXZMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpO1xuICBjb25zdCBwYWdlTmV4dExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKTtcbiAgY29uc3QgcGFnZUxhc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIik7XG4gIGNvbnN0IHF1aWNrRmlsdGVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgeyBpZDogXCJjdXN0b21cIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrQ3VzdG9tTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy03XCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazdEYXlzTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy0zMFwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2szMERheXNMYWJlbCB9LFxuICAgICAgeyBpZDogXCJkYXlzLTkwXCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazkwRGF5c0xhYmVsIH0sXG4gICAgXSxcbiAgICBbcXVpY2szMERheXNMYWJlbCwgcXVpY2s3RGF5c0xhYmVsLCBxdWljazkwRGF5c0xhYmVsLCBxdWlja0N1c3RvbUxhYmVsXVxuICApO1xuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgZmlyc3Q6IHBhZ2VGaXJzdExhYmVsLFxuICAgICAgcHJldjogcGFnZVByZXZMYWJlbCxcbiAgICAgIG5leHQ6IHBhZ2VOZXh0TGFiZWwsXG4gICAgICBsYXN0OiBwYWdlTGFzdExhYmVsLFxuICAgIH0pLFxuICAgIFtwYWdlRmlyc3RMYWJlbCwgcGFnZUxhc3RMYWJlbCwgcGFnZU5leHRMYWJlbCwgcGFnZVByZXZMYWJlbF1cbiAgKTtcbiAgY29uc3Qgc2hvd0ZpbHRlckFjdGlvbnMgPSBzaG93RmlsdGVycztcbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgISFzdGFydERhdGUgJiYgISFlbmREYXRlO1xuICBjb25zdCBzaG93UmVzdWx0cyA9ICFzaG93RmlsdGVycztcbiAgY29uc3QgbWFudWFsUmFuZ2VSZWFkeSA9ICEhbWFudWFsU3RhcnREYXRlICYmICEhbWFudWFsRW5kRGF0ZTtcbiAgY29uc3Qgc2hvd0lubGluZVN1bW1hcnkgPVxuICAgICEhc3RhcnREYXRlICYmXG4gICAgISFlbmREYXRlICYmXG4gICAgIWlzT3BlbiAmJlxuICAgIChhY3RpdmVRdWlja0ZpbHRlciAhPT0gXCJjdXN0b21cIiB8fCBtYW51YWxSYW5nZVJlYWR5KTtcbiAgY29uc3Qgc2hvd01hbnVhbFBpY2tlciA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmIHNob3dNYW51YWxQaWNrZXJQYW5lbDtcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTN4bCBteC1hdXRvIHB4LTEgc206cHgtMiBwdC0zIHBiLTQgc3BhY2UteS0yXCI+XHJcbiAgICAgIHtzaG93U3VtbWFyeSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e3N1bW1hcnlGcm9tfVxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e3N1bW1hcnlUb31cbiAgICAgICAgICAgIGZyb21WYWx1ZT17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgICB0b1ZhbHVlPXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogXCItLVwifVxuICAgICAgICAgICAgY2xpZW50TGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICAgICAgY2xpZW50VmFsdWU9e3NlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCJ9XG4gICAgICAgICAgICBzaG93Q2xpZW50PXshIXNlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIHtzaG93RmlsdGVycyAmJiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2ZpbHRlclRpdGxlfT5cbiAgICAgICAgICAgIHtxdWlja0ZpbHRlcnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlUXVpY2tGaWx0ZXIgPT09IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgICBhY3RpdmU9e2lzQWN0aXZlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrRmlsdGVyKGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtzaG93SW5saW5lU3VtbWFyeSAmJiAoXG4gICAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17c3VtbWFyeUZyb219XG4gICAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG99XG4gICAgICAgICAgICAgIGZyb21WYWx1ZT17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgICAgIHRvVmFsdWU9e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7c2hvd01hbnVhbFBpY2tlciAmJiAoXG4gICAgICAgICAgICA8SGlzdG9yeU1hbnVhbERhdGVQaWNrZXJcbiAgICAgICAgICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XG4gICAgICAgICAgICAgIHBvcG92ZXJSZWY9e3BvcG92ZXJSZWZ9XG4gICAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbEVycm9yfVxuICAgICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFzdGFydERhdGV9XG4gICAgICAgICAgICAgIHNob3dFbmRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFlbmREYXRlfVxuICAgICAgICAgICAgICBmaWx0ZXJUaXRsZT17ZmlsdGVyVGl0bGV9XG4gICAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICAgICAgICBzZWxlY3RpbmdTdGVwPXtzZWxlY3RpbmdTdGVwfVxuICAgICAgICAgICAgICBsYWJlbEZyb209e2xhYmVsRnJvbX1cbiAgICAgICAgICAgICAgbGFiZWxUbz17bGFiZWxUb31cbiAgICAgICAgICAgICAgc3RhcnREYXRlVGV4dD17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBhZGREYXRlTGFiZWx9XG4gICAgICAgICAgICAgIGVuZERhdGVUZXh0PXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogYWRkRGF0ZUxhYmVsfVxuICAgICAgICAgICAgICBjbGVhclJhbmdlTGFiZWw9e2NsZWFyUmFuZ2VMYWJlbH1cbiAgICAgICAgICAgICAgaGFzU2VsZWN0ZWRSYW5nZT17ISFzdGFydERhdGUgfHwgISFlbmREYXRlfVxuICAgICAgICAgICAgICBtb250aExhYmVsPXtjYWxlbmRhci5sYWJlbH1cbiAgICAgICAgICAgICAgd2Vla0RheUxhYmVscz17d2Vla0RheUxhYmVsc31cbiAgICAgICAgICAgICAgc3RhdHVzVGV4dD17c2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiID8gc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA6IHN0YXR1c1NlbGVjdEVuZExhYmVsfVxuICAgICAgICAgICAgICBkYXlDZWxscz17bWFudWFsRGF5Q2VsbHN9XG4gICAgICAgICAgICAgIHByZXZNb250aExhYmVsPXtwcmV2TW9udGhMYWJlbH1cbiAgICAgICAgICAgICAgbmV4dE1vbnRoTGFiZWw9e25leHRNb250aExhYmVsfVxuICAgICAgICAgICAgICBvbk9wZW5Qb3BvdmVyPXtvcGVuUG9wb3Zlcn1cbiAgICAgICAgICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtoYW5kbGVBY3RpdmF0b3JLZXlEb3dufVxuICAgICAgICAgICAgICBvblNlY3Rpb25LZXlEb3duPXtoYW5kbGVTZWN0aW9uS2V5RG93bn1cbiAgICAgICAgICAgICAgb25DbGVhcj17aGFuZGxlQ2xlYXJ9XG4gICAgICAgICAgICAgIG9uUHJldk1vbnRoPXtoYW5kbGVQcmV2TW9udGh9XG4gICAgICAgICAgICAgIG9uTmV4dE1vbnRoPXtoYW5kbGVOZXh0TW9udGh9XG4gICAgICAgICAgICAgIG9uR3JpZE1vdXNlTGVhdmU9e2hhbmRsZUdyaWRNb3VzZUxlYXZlfVxuICAgICAgICAgICAgICBvbkRheUNsaWNrPXtoYW5kbGVNYW51YWxEYXlDbGlja31cbiAgICAgICAgICAgICAgb25EYXlIb3Zlcj17aGFuZGxlTWFudWFsRGF5SG92ZXJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cclxuICAgICAgICAgIDxDbGllbnRTZWFyY2hDb21ib2JveFxyXG4gICAgICAgICAgICBrZXk9e2NsaWVudFJlc2V0S2V5fVxyXG4gICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0ZWQ9e2hhbmRsZUNsaWVudFNlbGVjdGVkfVxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsaWVudFwiLCBcIkNsaWVudFwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJDbGllbnRcIil9XHJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJjb21wYWN0XCJcclxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cclxuICAgICAgICAgICAgaWRCYXNlPVwiaGlzdG9yeS1jbGllbnRcIlxyXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICB7c2hvd0ZpbHRlckFjdGlvbnMgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LWZpbHRlci1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICAgICAgICBsYWJlbD17Y2xlYXJMYWJlbH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc2V0RmlsdGVyc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgIGxhYmVsPXthcHBseUxhYmVsfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKHsgY2xvc2VQYW5lbDogdHJ1ZSwgcGFnZTogMSB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImZyb21EYXRlXCIgdmFsdWU9e2Zyb21EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJ0b0RhdGVcIiB2YWx1ZT17dG9EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgaWQ9XCJyZXN1bHRzTG9hZGVyXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJIaXN0b3J5X0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtzaG93UmVzdWx0cyAmJiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxIaXN0b3J5VGFibGVcclxuICAgICAgICAgICAgaXRlbXM9e3RpbWVsaW5lSXRlbXN9XHJcbiAgICAgICAgICAgIG5vRGF0YVRleHQ9e2luZFQoXCJIaXN0b3J5X05vRGF0YUluUmFuZ2VcIiwgXCJObyB2aXNpdHMgaW4gdGhpcyByYW5nZVwiKX1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgICAgIG9uTmF2aWdhdGU9e2hhbmRsZU5hdmlnYXRlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgICAgIHJlZj17cGFnaW5hdGlvblJlZn1cbiAgICAgICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgICAgICBwYWdlV2luZG93PXtQQUdFX1dJTkRPV31cbiAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IGxvYWRBY3Rpdml0aWVzKHBhZ2UpfVxuICAgICAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICAgIHtjYW5DcmVhdGVWaXNpdCAmJiAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCIvVmlzaXRhcy9DcmVhdGU/ZnJlc2g9MVwiXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXtmYWJCb3R0b219XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNb3VudCBoZWxwZXIgZm9yIHRoZSBsZWdhY3kgUmF6b3Igdmlldy5cbmV4cG9ydCBjb25zdCBtb3VudEhpc3RvcnlQYWdlID0gKHJvb3Q6IEhUTUxFbGVtZW50KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRGcm9tRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LWZyb21cIikgfHwgXCJcIjtcbiAgY29uc3QgZGVmYXVsdFRvRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LXRvXCIpIHx8IFwiXCI7XG5cbiAgbW91bnRSZWFjdElzbGFuZChyb290LCA8SGlzdG9yeVBhZ2UgZGVmYXVsdEZyb21EYXRlPXtkZWZhdWx0RnJvbURhdGV9IGRlZmF1bHRUb0RhdGU9e2RlZmF1bHRUb0RhdGV9IC8+KTtcbn07XG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhcy1oaXN0b3J5LXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50SGlzdG9yeVBhZ2Uocm9vdEVsKTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5UGFnZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyB1c2VIaXN0b3J5VGFibGVFZmZlY3RzIH0gZnJvbSBcIi4vdXNlSGlzdG9yeVRhYmxlRWZmZWN0cy50c1wiO1xuXHJcbmV4cG9ydCB0eXBlIFRpbWVsaW5lRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IHN0cmluZztcclxuICBtb250aDogc3RyaW5nO1xyXG4gIGRheTogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVGltZWxpbmVJdGVtID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmc7XHJcbiAgcmVjSWQ/OiBudW1iZXIgfCBudWxsO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGZ1bGxOYW1lOiBzdHJpbmc7XHJcbiAgZnVsbERlc2M6IHN0cmluZztcclxuICBkYXRlUGFydHM6IFRpbWVsaW5lRGF0ZVBhcnRzO1xyXG4gIGlzTm9EYXRhOiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICBpdGVtczogVGltZWxpbmVJdGVtW107XHJcbiAgbm9EYXRhVGV4dDogc3RyaW5nO1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIG9uTmF2aWdhdGU6IChsaW5rSWQ6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IFRBUF9NT1ZFX1BYID0gMTQ7XG5jb25zdCBIT0xEX1RPX1BSRVZJRVdfTVMgPSAxNjA7XG5cclxudHlwZSBUYXBHdWFyZFN0YXRlID0ge1xuICBhY3RpdmU6IGJvb2xlYW47XG4gIHBvaW50ZXJJZDogbnVtYmVyIHwgbnVsbDtcbiAgc3RhcnRYOiBudW1iZXI7XG4gIHN0YXJ0WTogbnVtYmVyO1xuICBzdGFydFRpbWU6IG51bWJlcjtcbiAgbW92ZWQ6IGJvb2xlYW47XG4gIGxpbmtJZDogc3RyaW5nO1xufTtcblxyXG5jb25zdCBIaXN0b3J5VGFibGUgPSAoeyBpdGVtcywgbm9EYXRhVGV4dCwgZXJyb3JNZXNzYWdlLCBvbk5hdmlnYXRlIH06IFByb3BzKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB0YXBHdWFyZFJlZiA9IHVzZVJlZjxUYXBHdWFyZFN0YXRlPih7XG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBwb2ludGVySWQ6IG51bGwsXG4gICAgc3RhcnRYOiAwLFxuICAgIHN0YXJ0WTogMCxcbiAgICBzdGFydFRpbWU6IDAsXG4gICAgbW92ZWQ6IGZhbHNlLFxuICAgIGxpbmtJZDogXCJcIixcbiAgfSk7XG5cbiAgY29uc3QgcmVzb2x2ZUNsaWNrYWJsZUNhcmQgPSB1c2VDYWxsYmFjaygodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBjYXJkID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkLS1jbGlja2FibGVbZGF0YS1saW5rLWlkXVwiKTtcbiAgICBpZiAoIWNhcmQpIHJldHVybiBudWxsO1xuICAgIGlmICghY29udGFpbmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKGNhcmQpKSByZXR1cm4gbnVsbDtcbiAgICByZXR1cm4gY2FyZDtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHJlc2V0VGFwR3VhcmQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5hY3RpdmUgPSBmYWxzZTtcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnBvaW50ZXJJZCA9IG51bGw7XG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5tb3ZlZCA9IGZhbHNlO1xuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubGlua0lkID0gXCJcIjtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJEb3duID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoZXZlbnQucG9pbnRlclR5cGUgPT09IFwibW91c2VcIiAmJiBldmVudC5idXR0b24gIT09IDApIHJldHVybjtcbiAgICAgIGNvbnN0IGNhcmQgPSByZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpO1xuICAgICAgaWYgKCFjYXJkKSByZXR1cm47XG4gICAgICBjb25zdCBsaW5rSWQgPSBjYXJkLmRhdGFzZXQubGlua0lkIHx8IFwiXCI7XG4gICAgICBpZiAoIWxpbmtJZCkgcmV0dXJuO1xuXG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmFjdGl2ZSA9IHRydWU7XG4gICAgICB0YXBHdWFyZFJlZi5jdXJyZW50LnBvaW50ZXJJZCA9IGV2ZW50LnBvaW50ZXJJZDtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRYID0gZXZlbnQuY2xpZW50WDtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRZID0gZXZlbnQuY2xpZW50WTtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubW92ZWQgPSBmYWxzZTtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQubGlua0lkID0gbGlua0lkO1xuICAgIH0sXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJNb3ZlID0gdXNlQ2FsbGJhY2soKGV2ZW50OiBSZWFjdC5Qb2ludGVyRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSB0YXBHdWFyZFJlZi5jdXJyZW50O1xuICAgIGlmICghc3RhdGUuYWN0aXZlIHx8IGV2ZW50LnBvaW50ZXJJZCAhPT0gc3RhdGUucG9pbnRlcklkKSByZXR1cm47XG4gICAgY29uc3QgZHggPSBNYXRoLmFicyhldmVudC5jbGllbnRYIC0gc3RhdGUuc3RhcnRYKTtcbiAgICBjb25zdCBkeSA9IE1hdGguYWJzKGV2ZW50LmNsaWVudFkgLSBzdGF0ZS5zdGFydFkpO1xuICAgIGlmIChkeCA+IFRBUF9NT1ZFX1BYIHx8IGR5ID4gVEFQX01PVkVfUFgpIHtcbiAgICAgIHN0YXRlLm1vdmVkID0gdHJ1ZTtcbiAgICB9XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVQb2ludGVyVXAgPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGNvbnN0IHN0YXRlID0gdGFwR3VhcmRSZWYuY3VycmVudDtcbiAgICAgIGlmICghc3RhdGUuYWN0aXZlIHx8IGV2ZW50LnBvaW50ZXJJZCAhPT0gc3RhdGUucG9pbnRlcklkKSByZXR1cm47XG4gICAgICBjb25zdCBsaW5rSWQgPSBzdGF0ZS5saW5rSWQ7XG4gICAgICBjb25zdCBoZWxkTXMgPSBEYXRlLm5vdygpIC0gc3RhdGUuc3RhcnRUaW1lO1xuICAgICAgY29uc3Qgc2hvdWxkVGFwID0gIXN0YXRlLm1vdmVkICYmIGhlbGRNcyA8IEhPTERfVE9fUFJFVklFV19NUztcbiAgICAgIHJlc2V0VGFwR3VhcmQoKTtcbiAgICAgIGlmIChzaG91bGRUYXAgJiYgbGlua0lkKSB7XG4gICAgICAgIG9uTmF2aWdhdGUobGlua0lkKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtvbk5hdmlnYXRlLCByZXNldFRhcEd1YXJkXVxuICApO1xuXG4gIGNvbnN0IGJsb2NrQ2xpcGJvYXJkQWN0aW9uID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2ZW50OiBSZWFjdC5DbGlwYm9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4gfCBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgaWYgKCFyZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0sXG4gICAgW3Jlc29sdmVDbGlja2FibGVDYXJkXVxuICApO1xuXG4gIHVzZUhpc3RvcnlUYWJsZUVmZmVjdHMoeyBjb250YWluZXJSZWYsIGVycm9yTWVzc2FnZSwgaXRlbXMsIHJlc29sdmVDbGlja2FibGVDYXJkIH0pO1xuXHJcbiAgY29uc3QgaGFzSXRlbXMgPSBpdGVtcy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IHNob3dFbXB0eSA9ICFlcnJvck1lc3NhZ2UgJiYgIWhhc0l0ZW1zO1xyXG5cclxuICBjb25zdCBjb250ZW50ID0gZXJyb3JNZXNzYWdlID8gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWRhbmdlclwiPntlcnJvck1lc3NhZ2V9PC9kaXY+XHJcbiAgKSA6IGhhc0l0ZW1zID8gKFxyXG4gICAgaXRlbXMubWFwKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICBjb25zdCBrZXkgPSBpdGVtLmlkIHx8IGl0ZW0ucmVjSWQ/LnRvU3RyaW5nKCkgfHwgYHRpbWVsaW5lLSR7aW5kZXh9YDtcclxuICAgICAgY29uc3QgaXNDbGlja2FibGUgPSAhaXRlbS5pc05vRGF0YSAmJiAhIWl0ZW0uaWQ7XHJcbiAgICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBrZXk9e2tleX0gY2xhc3NOYW1lPVwidGltZWxpbmUtaXRlbVwiPlxyXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInRpbWVsaW5lLWNhcmRcIixcbiAgICAgICAgICAgICAgaXRlbS5pc05vRGF0YSA/IFwidGltZWxpbmUtY2FyZC0tbm9kYXRhXCIgOiBcIlwiLFxuICAgICAgICAgICAgICBpc0NsaWNrYWJsZSA/IFwidGltZWxpbmUtY2FyZC0tY2xpY2thYmxlXCIgOiBcIlwiXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgZGF0YS1hY3RpdmlkYWRpZD17aXRlbS5hY3RpdmlkYWRJZCB8fCBcIlwifVxuICAgICAgICAgICAgZGF0YS1yZWNpZD17aXRlbS5yZWNJZCAhPSBudWxsID8gU3RyaW5nKGl0ZW0ucmVjSWQpIDogXCJcIn1cbiAgICAgICAgICAgIGRhdGEtbGluay1pZD17aXNDbGlja2FibGUgPyBpdGVtLmlkIDogXCJcIn1cbiAgICAgICAgICAgIHJvbGU9e2lzQ2xpY2thYmxlID8gXCJidXR0b25cIiA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIHRhYkluZGV4PXtpc0NsaWNrYWJsZSA/IDAgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpc0NsaWNrYWJsZSA/IChpdGVtLmZ1bGxOYW1lIHx8IGl0ZW0ubmFtZSB8fCBub0RhdGFUZXh0KSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIG9uS2V5RG93bj17aXNDbGlja2FibGVcbiAgICAgICAgICAgICAgPyAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVudGVyXCIgfHwgZXZlbnQua2V5ID09PSBcIiBcIikge1xuICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIG9uTmF2aWdhdGUoaXRlbS5pZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtZGF0ZS1wYW5lbCBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBweC0zIHB5LTMgYmctc2xhdGUtNTAgYm9yZGVyLXIgYm9yZGVyLXNsYXRlLTIwMCB0ZXh0LXNsYXRlLTYwMFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRyYWNraW5nLVswLjJlbV0gdGV4dC1zbGF0ZS01MDBcIj57aXRlbS5kYXRlUGFydHMueWVhcn08L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1zZW1pYm9sZCB1cHBlcmNhc2UgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmRhdGVQYXJ0cy5tb250aH08L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LXNlbWlib2xkIHRleHQtcHJpbWFyeVwiPntpdGVtLmRhdGVQYXJ0cy5kYXl9PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVsaW5lLWNhcmRfX2NvbnRlbnQgZmxleC0xIHB5LTMgcHgtNFwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtbmFtZVwiIGRhdGEtZnVsbHRleHQ9e2l0ZW0uZnVsbE5hbWUgfHwgaXRlbS5uYW1lfT57aXRlbS5uYW1lfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRpbWVsaW5lLWRlc2MtdGV4dFwiIGRhdGEtZnVsbHRleHQ9e2l0ZW0uZnVsbERlc2MgfHwgaXRlbS5kZXNjcmlwdGlvbn0+e2l0ZW0uZGVzY3JpcHRpb24gfHwgbm9EYXRhVGV4dH08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICk7XHJcbiAgICB9KVxyXG4gICkgOiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdlxuICAgICAgaWQ9XCJ0aW1lbGluZUNvbnRhaW5lclwiXG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRpbWVsaW5lLWJveFwiLCBzaG93RW1wdHkgPyBcInRpbWVsaW5lLWVtcHR5XCIgOiBcIlwiKX1cbiAgICAgIGRhdGEtZW1wdHktdGV4dD17bm9EYXRhVGV4dH1cbiAgICAgIG9uUG9pbnRlckRvd25DYXB0dXJlPXtoYW5kbGVQb2ludGVyRG93bn1cbiAgICAgIG9uUG9pbnRlck1vdmVDYXB0dXJlPXtoYW5kbGVQb2ludGVyTW92ZX1cbiAgICAgIG9uUG9pbnRlclVwQ2FwdHVyZT17aGFuZGxlUG9pbnRlclVwfVxuICAgICAgb25Qb2ludGVyQ2FuY2VsQ2FwdHVyZT17cmVzZXRUYXBHdWFyZH1cbiAgICAgIG9uUG9pbnRlckxlYXZlPXtyZXNldFRhcEd1YXJkfVxuICAgICAgb25Db250ZXh0TWVudUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxuICAgICAgb25Db3B5Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgICBvbkN1dENhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxuICAgICAgb25QYXN0ZUNhcHR1cmU9e2Jsb2NrQ2xpcGJvYXJkQWN0aW9ufVxuICAgID5cbiAgICAgIHtjb250ZW50fVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgTWVtb2l6ZWRIaXN0b3J5VGFibGUgPSBSZWFjdC5tZW1vKEhpc3RvcnlUYWJsZSk7XG5NZW1vaXplZEhpc3RvcnlUYWJsZS5kaXNwbGF5TmFtZSA9IFwiSGlzdG9yeVRhYmxlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IE1lbW9pemVkSGlzdG9yeVRhYmxlO1xuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBUaW1lbGluZUl0ZW0gfSBmcm9tIFwiLi9IaXN0b3J5VGFibGUudHN4XCI7XG5cbmNvbnN0IFRPT0xUSVBfVE9VQ0hfREVMQVlfTVMgPSAxMjA7XG5jb25zdCBUT09MVElQX01BWF9IRUlHSFRfUkFUSU8gPSAwLjg7XG5jb25zdCBUT09MVElQX0JBU0VfRk9OVCA9IDEzO1xuY29uc3QgVE9PTFRJUF9NSU5fRk9OVCA9IDExO1xuY29uc3QgRUxMSVBTSVMgPSBcIi4uLlwiO1xuY29uc3QgUElYRUxfR0FQID0gNTtcbmNvbnN0IFBJWEVMX1NQRUVEID0gOTU7XG5jb25zdCBQSVhFTF9DT0xPUlMgPSBbXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMDgpXCIsIFwicmdiYSgwLCA0MSwgMTA3LCAwLjE2KVwiLCBcInJnYmEoMCwgNDEsIDEwNywgMC4yNilcIl07XG5cbnR5cGUgUGl4ZWxTdGF0ZSA9IHtcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XG4gIHBpeGVsczogUGl4ZWxbXTtcbiAgYW5pbUlkOiBudW1iZXIgfCBudWxsO1xuICBsYXN0VGltZTogbnVtYmVyO1xuICByZWR1Y2VkTW90aW9uOiBib29sZWFuO1xuICB3aWR0aDogbnVtYmVyO1xuICBoZWlnaHQ6IG51bWJlcjtcbn07XG5cbnR5cGUgVXNlSGlzdG9yeVRhYmxlRWZmZWN0c0FyZ3MgPSB7XG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBpdGVtczogVGltZWxpbmVJdGVtW107XG4gIHJlc29sdmVDbGlja2FibGVDYXJkOiAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IEhUTUxFbGVtZW50IHwgbnVsbDtcbn07XG5cbi8vIENvbXB1dGUgcGl4ZWwgc3BlZWQgd2hpbGUgcmVzcGVjdGluZyByZWR1Y2VkIG1vdGlvbiBwcmVmZXJlbmNlLlxuY29uc3QgZ2V0RWZmZWN0aXZlU3BlZWQgPSAodmFsdWU6IG51bWJlciwgcmVkdWNlZE1vdGlvbjogYm9vbGVhbikgPT4ge1xuICBjb25zdCBtaW4gPSAwO1xuICBjb25zdCBtYXggPSAxMDA7XG4gIGNvbnN0IHRocm90dGxlID0gMC4wMDE7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlci5wYXJzZUludChTdHJpbmcodmFsdWUpLCAxMCk7XG5cbiAgaWYgKHBhcnNlZCA8PSBtaW4gfHwgcmVkdWNlZE1vdGlvbikgcmV0dXJuIG1pbjtcbiAgaWYgKHBhcnNlZCA+PSBtYXgpIHJldHVybiBtYXggKiB0aHJvdHRsZTtcbiAgcmV0dXJuIHBhcnNlZCAqIHRocm90dGxlO1xufTtcblxuLy8gUGl4ZWwgdXNlZCBieSB0aGUgaG92ZXIgYW5pbWF0aW9uIGNhbnZhcy5cbmNsYXNzIFBpeGVsIHtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgY29sb3I6IHN0cmluZztcbiAgc3BlZWQ6IG51bWJlcjtcbiAgc2l6ZTogbnVtYmVyO1xuICBzaXplU3RlcDogbnVtYmVyO1xuICBtaW5TaXplOiBudW1iZXI7XG4gIG1heFNpemVJbnRlZ2VyOiBudW1iZXI7XG4gIG1heFNpemU6IG51bWJlcjtcbiAgcGhhc2U6IG51bWJlcjtcbiAgcGhhc2VTdGVwOiBudW1iZXI7XG4gIGRlbGF5OiBudW1iZXI7XG4gIGNvdW50ZXI6IG51bWJlcjtcbiAgY291bnRlclN0ZXA6IG51bWJlcjtcbiAgaXNJZGxlOiBib29sZWFuO1xuICBpc1JldmVyc2U6IGJvb2xlYW47XG4gIGlzU2hpbW1lcjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHg6IG51bWJlciwgeTogbnVtYmVyLCBjb2xvcjogc3RyaW5nLCBzcGVlZDogbnVtYmVyLCBkZWxheTogbnVtYmVyKSB7XG4gICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgdGhpcy5jdHggPSBjb250ZXh0O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUoMC4xLCAwLjkpICogc3BlZWQ7XG4gICAgdGhpcy5zaXplID0gMDtcbiAgICB0aGlzLnNpemVTdGVwID0gTWF0aC5yYW5kb20oKSAqIDAuMyArIDAuMTtcbiAgICB0aGlzLm1pblNpemUgPSAwLjU7XG4gICAgdGhpcy5tYXhTaXplSW50ZWdlciA9IDI7XG4gICAgdGhpcy5tYXhTaXplID0gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLm1pblNpemUsIHRoaXMubWF4U2l6ZUludGVnZXIpO1xuICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgIHRoaXMuY291bnRlclN0ZXAgPSBNYXRoLnJhbmRvbSgpICogNSArICh0aGlzLndpZHRoICsgdGhpcy5oZWlnaHQpICogMC4wMTU7XG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmV2ZXJzZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNTaGltbWVyID0gZmFsc2U7XG4gICAgdGhpcy5waGFzZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICB0aGlzLnBoYXNlU3RlcCA9IE1hdGgubWF4KDAsIHRoaXMuc3BlZWQgKiAoMC44ICsgTWF0aC5yYW5kb20oKSAqIDAuNikpO1xuICB9XG5cbiAgLy8gUmV0dXJuIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gbWluIGFuZCBtYXguXG4gIGdldFJhbmRvbVZhbHVlKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gIH1cblxuICAvLyBEcmF3IHRoZSBwaXhlbCBhdCBpdHMgY3VycmVudCBzaXplLlxuICBkcmF3KCkge1xuICAgIGNvbnN0IGNlbnRlck9mZnNldCA9IHRoaXMubWF4U2l6ZUludGVnZXIgKiAwLjUgLSB0aGlzLnNpemUgKiAwLjU7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLnggKyBjZW50ZXJPZmZzZXQsIHRoaXMueSArIGNlbnRlck9mZnNldCwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xuICB9XG5cbiAgLy8gQW5pbWF0ZSB0aGUgcGl4ZWwgYXBwZWFyaW5nLlxuICBhcHBlYXIoKSB7XG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5jb3VudGVyIDw9IHRoaXMuZGVsYXkpIHtcbiAgICAgIHRoaXMuY291bnRlciArPSB0aGlzLmNvdW50ZXJTdGVwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSkge1xuICAgICAgdGhpcy5pc1NoaW1tZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1NoaW1tZXIpIHtcbiAgICAgIHRoaXMuc2hpbW1lcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpemUgKz0gdGhpcy5zaXplU3RlcDtcbiAgICB9XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvLyBBbmltYXRlIHRoZSBwaXhlbCBkaXNhcHBlYXJpbmcuXG4gIGRpc2FwcGVhcigpIHtcbiAgICB0aGlzLmlzU2hpbW1lciA9IGZhbHNlO1xuICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgaWYgKHRoaXMuc2l6ZSA8PSAwKSB7XG4gICAgICB0aGlzLmlzSWRsZSA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2l6ZSAtPSAwLjE7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvLyBPc2NpbGxhdGUgcGl4ZWwgc2l6ZSB3aGlsZSB2aXNpYmxlLlxuICBzaGltbWVyKCkge1xuICAgIGlmICghdGhpcy5waGFzZVN0ZXApIHJldHVybjtcbiAgICB0aGlzLnBoYXNlICs9IHRoaXMucGhhc2VTdGVwO1xuICAgIGNvbnN0IGFtcCA9ICh0aGlzLm1heFNpemUgLSB0aGlzLm1pblNpemUpICogMC41O1xuICAgIHRoaXMuc2l6ZSA9IHRoaXMubWluU2l6ZSArIGFtcCArIGFtcCAqIE1hdGguc2luKHRoaXMucGhhc2UpO1xuICB9XG59XG5cbi8vIENyZWF0ZSB0aGUgcGl4ZWwgY2FudmFzIGhvdmVyIGVmZmVjdCBmb3IgYSB0aW1lbGluZSBjYXJkLlxuY29uc3QgY3JlYXRlUGl4ZWxFZmZlY3QgPSAoY2FyZEVsOiBIVE1MRWxlbWVudCkgPT4ge1xuICBpZiAoIWNhcmRFbCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gIGNhbnZhcy5jbGFzc05hbWUgPSBcInRpbWVsaW5lLXBpeGVsLWNhbnZhc1wiO1xuICBjYXJkRWwuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBpZiAoIWN0eCkge1xuICAgIGNhbnZhcy5yZW1vdmUoKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHJlZHVjZWRNb3Rpb24gPSB3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpLm1hdGNoZXM7XG4gIGNvbnN0IHN0YXRlOiBQaXhlbFN0YXRlID0ge1xuICAgIGNhbnZhcyxcbiAgICBjdHgsXG4gICAgcGl4ZWxzOiBbXSxcbiAgICBhbmltSWQ6IG51bGwsXG4gICAgbGFzdFRpbWU6IHBlcmZvcm1hbmNlLm5vdygpLFxuICAgIHJlZHVjZWRNb3Rpb24sXG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICB9O1xuXG4gIGNvbnN0IGluaXRQaXhlbHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVjdCA9IGNhcmRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVjdC53aWR0aCkpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVjdC5oZWlnaHQpKTtcbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHJldHVybjtcblxuICAgIHN0YXRlLndpZHRoID0gd2lkdGg7XG4gICAgc3RhdGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuXG4gICAgY29uc3QgZ2FwID0gTWF0aC5tYXgoMywgTWF0aC5mbG9vcihQSVhFTF9HQVApKTtcbiAgICBjb25zdCBzcGVlZCA9IGdldEVmZmVjdGl2ZVNwZWVkKFBJWEVMX1NQRUVELCByZWR1Y2VkTW90aW9uKTtcbiAgICBjb25zdCBwaXhlbHM6IFBpeGVsW10gPSBbXTtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHggKz0gZ2FwKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSArPSBnYXApIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSBQSVhFTF9DT0xPUlNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogUElYRUxfQ09MT1JTLmxlbmd0aCldO1xuICAgICAgICBjb25zdCBkeCA9IHggLSB3aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IGR5ID0geSAtIGhlaWdodCAvIDI7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgY29uc3QgZGVsYXkgPSByZWR1Y2VkTW90aW9uID8gMCA6IGRpc3RhbmNlICogMC4zNTtcbiAgICAgICAgcGl4ZWxzLnB1c2gobmV3IFBpeGVsKGNhbnZhcywgY3R4LCB4LCB5LCBjb2xvciwgc3BlZWQsIGRlbGF5KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGUucGl4ZWxzID0gcGl4ZWxzO1xuICB9O1xuXG4gIGNvbnN0IGRvQW5pbWF0ZSA9IChmbk5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XG4gICAgc3RhdGUuYW5pbUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGRvQW5pbWF0ZShmbk5hbWUpKTtcbiAgICBjb25zdCB0aW1lTm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgY29uc3QgdGltZVBhc3NlZCA9IHRpbWVOb3cgLSBzdGF0ZS5sYXN0VGltZTtcbiAgICBjb25zdCB0aW1lSW50ZXJ2YWwgPSAxMDAwIC8gNjA7XG5cbiAgICBpZiAodGltZVBhc3NlZCA8IHRpbWVJbnRlcnZhbCkgcmV0dXJuO1xuICAgIHN0YXRlLmxhc3RUaW1lID0gdGltZU5vdyAtICh0aW1lUGFzc2VkICUgdGltZUludGVydmFsKTtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc3RhdGUud2lkdGgsIHN0YXRlLmhlaWdodCk7XG5cbiAgICBsZXQgYWxsSWRsZSA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS5waXhlbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHBpeGVsID0gc3RhdGUucGl4ZWxzW2ldO1xuICAgICAgcGl4ZWxbZm5OYW1lXSgpO1xuICAgICAgaWYgKCFwaXhlbC5pc0lkbGUpIGFsbElkbGUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGFsbElkbGUgJiYgc3RhdGUuYW5pbUlkKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xuICAgICAgc3RhdGUuYW5pbUlkID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQW5pbWF0aW9uID0gKG5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XG4gICAgaWYgKCFzdGF0ZS5waXhlbHMubGVuZ3RoKSByZXR1cm47XG4gICAgaWYgKHN0YXRlLmFuaW1JZCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhdGUuYW5pbUlkKTtcbiAgICBzdGF0ZS5sYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHN0YXRlLmFuaW1JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBkb0FuaW1hdGUobmFtZSkpO1xuICB9O1xuXG4gIGNvbnN0IG9uRW50ZXIgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJhcHBlYXJcIik7XG4gIGNvbnN0IG9uTGVhdmUgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJkaXNhcHBlYXJcIik7XG5cbiAgY2FyZEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xuICBjYXJkRWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25MZWF2ZSk7XG5cbiAgbGV0IHJvOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoaW5pdFBpeGVscyk7XG4gICAgcm8ub2JzZXJ2ZShjYXJkRWwpO1xuICB9XG5cbiAgaW5pdFBpeGVscygpO1xuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2FyZEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xuICAgIGNhcmRFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbkxlYXZlKTtcbiAgICBpZiAoc3RhdGUuYW5pbUlkKSBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xuICAgIGlmIChybykgcm8uZGlzY29ubmVjdCgpO1xuICAgIGNhbnZhcy5yZW1vdmUoKTtcbiAgfTtcbn07XG5cbi8vIFNob3J0ZW4gb3ZlcmZsb3dpbmcgdGV4dCB3aXRoIGEgY29tcHV0ZWQgZWxsaXBzaXMuXG5jb25zdCBhcHBseUVsbGlwc2lzID0gKGVsOiBIVE1MRWxlbWVudCwgZnVsbFRleHQ6IHN0cmluZywgbXVsdGlMaW5lOiBib29sZWFuKSA9PiB7XG4gIGlmICghZWwgfHwgIWZ1bGxUZXh0KSByZXR1cm4gZmFsc2U7XG4gIGlmIChtdWx0aUxpbmUgJiYgZWwuY2xpZW50SGVpZ2h0ID09PSAwKSByZXR1cm4gZmFsc2U7XG4gIGlmICghbXVsdGlMaW5lICYmIGVsLmNsaWVudFdpZHRoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKG11bHRpTGluZSkge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgIGxldCBsaW5lSGVpZ2h0ID0gTnVtYmVyLnBhcnNlRmxvYXQoY29tcHV0ZWQubGluZUhlaWdodCk7XG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUobGluZUhlaWdodCkpIHtcbiAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGxpbmVIZWlnaHQgPSByZWN0LmhlaWdodCA+IDAgPyByZWN0LmhlaWdodCAvIDIgOiAwO1xuICAgIH1cbiAgICBpZiAobGluZUhlaWdodCA+IDApIHtcbiAgICAgIGVsLnN0eWxlLm1heEhlaWdodCA9IGAke01hdGgucm91bmQobGluZUhlaWdodCAqIDIpfXB4YDtcbiAgICAgIGVsLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcbiAgICB9XG4gIH1cblxuICBlbC50ZXh0Q29udGVudCA9IGZ1bGxUZXh0O1xuXG4gIGNvbnN0IGlzT3ZlcmZsb3dpbmcgPSAoKSA9PiAoXG4gICAgbXVsdGlMaW5lXG4gICAgICA/IGVsLnNjcm9sbEhlaWdodCA+IGVsLmNsaWVudEhlaWdodCArIDFcbiAgICAgIDogZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCArIDFcbiAgKTtcblxuICBpZiAoIWlzT3ZlcmZsb3dpbmcoKSkge1xuICAgIGVsLmRhdGFzZXQucHJldmlldyA9IFwiMFwiO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGxldCBsb3cgPSAwO1xuICBsZXQgaGlnaCA9IGZ1bGxUZXh0Lmxlbmd0aDtcbiAgbGV0IGJlc3QgPSAwO1xuXG4gIHdoaWxlIChsb3cgPD0gaGlnaCkge1xuICAgIGNvbnN0IG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XG4gICAgY29uc3QgY2FuZGlkYXRlID0gYCR7ZnVsbFRleHQuc2xpY2UoMCwgTWF0aC5tYXgoMCwgbWlkKSkudHJpbUVuZCgpfSR7RUxMSVBTSVN9YDtcbiAgICBlbC50ZXh0Q29udGVudCA9IGNhbmRpZGF0ZTtcbiAgICBpZiAoaXNPdmVyZmxvd2luZygpKSB7XG4gICAgICBoaWdoID0gbWlkIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmVzdCA9IG1pZDtcbiAgICAgIGxvdyA9IG1pZCArIDE7XG4gICAgfVxuICB9XG5cbiAgZWwudGV4dENvbnRlbnQgPSBgJHtmdWxsVGV4dC5zbGljZSgwLCBNYXRoLm1heCgwLCBiZXN0KSkudHJpbUVuZCgpfSR7RUxMSVBTSVN9YDtcbiAgZWwuZGF0YXNldC5wcmV2aWV3ID0gXCIxXCI7XG4gIHJldHVybiB0cnVlO1xufTtcblxuLy8gT3ducyB0b29sdGlwLCBlbGxpcHNpcywgYW5kIHBpeGVsIGVmZmVjdHMgZm9yIGhpc3RvcnkgdGltZWxpbmUgY2FyZHMuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeVRhYmxlRWZmZWN0cyA9ICh7XG4gIGNvbnRhaW5lclJlZixcbiAgZXJyb3JNZXNzYWdlLFxuICBpdGVtcyxcbiAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXG59OiBVc2VIaXN0b3J5VGFibGVFZmZlY3RzQXJncykgPT4ge1xuICBjb25zdCB0b29sdGlwUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHRvb2x0aXBBbmNob3JSZWYgPSB1c2VSZWY8SFRNTEVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgdG9vbHRpcENsb3NlQm91bmRSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIC8vIEVuc3VyZSB0aGUgc2hhcmVkIHRvb2x0aXAgZWxlbWVudCBleGlzdHMgb25jZS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodG9vbHRpcFJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgbGV0IHRvb2x0aXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVsaW5lVG9vbHRpcFwiKSBhcyBIVE1MRGl2RWxlbWVudCB8IG51bGw7XG4gICAgaWYgKCF0b29sdGlwKSB7XG4gICAgICB0b29sdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHRvb2x0aXAuaWQgPSBcInRpbWVsaW5lVG9vbHRpcFwiO1xuICAgICAgdG9vbHRpcC5jbGFzc05hbWUgPSBcInRpbWVsaW5lLXRvb2x0aXBcIjtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodG9vbHRpcCk7XG4gICAgfVxuICAgIHRvb2x0aXBSZWYuY3VycmVudCA9IHRvb2x0aXA7XG4gIH0sIFtdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lclJlZi5jdXJyZW50O1xuICAgIGNvbnN0IHRvb2x0aXBFbCA9IHRvb2x0aXBSZWYuY3VycmVudDtcbiAgICBpZiAoIWNvbnRhaW5lciB8fCAhdG9vbHRpcEVsKSByZXR1cm47XG5cbiAgICBjb25zdCBjbGVhbnVwczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcblxuICAgIC8vIENsb3NlIHRvb2x0aXAgb24gb3V0c2lkZSBpbnRlcmFjdGlvbi5cbiAgICBpZiAoIXRvb2x0aXBDbG9zZUJvdW5kUmVmLmN1cnJlbnQpIHtcbiAgICAgIHRvb2x0aXBDbG9zZUJvdW5kUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgY29uc3Qgb25Qb2ludGVyRG93biA9IChldmVudDogUG9pbnRlckV2ZW50KSA9PiB7XG4gICAgICAgIGlmICghdG9vbHRpcEVsLmNsYXNzTGlzdC5jb250YWlucyhcInZpc2libGVcIikpIHJldHVybjtcbiAgICAgICAgY29uc3QgYW5jaG9yID0gdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50O1xuICAgICAgICBpZiAoYW5jaG9yICYmIGFuY2hvci5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHJldHVybjtcbiAgICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xuICAgICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IG9uS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xuICAgICAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93biwgdHJ1ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICAgICAgY2xlYW51cHMucHVzaCgoKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBvblBvaW50ZXJEb3duLCB0cnVlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcbiAgICAgICAgdG9vbHRpcENsb3NlQm91bmRSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gU2hvdyB0b29sdGlwIGNvbnRlbnQgY2VudGVyZWQgb24gc2NyZWVuLlxuICAgIGNvbnN0IHNob3dUb29sdGlwID0gKHRleHQ6IHN0cmluZywgYW5jaG9yPzogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIHRvb2x0aXBFbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XG4gICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBhbmNob3IgfHwgbnVsbDtcblxuICAgICAgY29uc3QgY2VudGVyWCA9IE1hdGgucm91bmQod2luZG93LmlubmVyV2lkdGggLyAyKTtcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5sZWZ0ID0gYCR7Y2VudGVyWH1weGA7XG5cbiAgICAgIGNvbnN0IG1hcmdpbiA9IDEyO1xuICAgICAgdG9vbHRpcEVsLnN0eWxlLm1heEhlaWdodCA9IGAke01hdGgucm91bmQod2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPKX1weGA7XG4gICAgICB0b29sdGlwRWwuc3R5bGUub3ZlcmZsb3dZID0gXCJhdXRvXCI7XG5cbiAgICAgIGxldCBmb250U2l6ZSA9IFRPT0xUSVBfQkFTRV9GT05UO1xuICAgICAgdG9vbHRpcEVsLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO1xuXG4gICAgICBsZXQgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IG1heEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIFRPT0xUSVBfTUFYX0hFSUdIVF9SQVRJTztcbiAgICAgIHdoaWxlIChyZWN0LmhlaWdodCA+IG1heEhlaWdodCAmJiBmb250U2l6ZSA+IFRPT0xUSVBfTUlOX0ZPTlQpIHtcbiAgICAgICAgZm9udFNpemUgLT0gMTtcbiAgICAgICAgdG9vbHRpcEVsLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO1xuICAgICAgICByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjZW50ZXJZID0gTWF0aC5yb3VuZCgod2luZG93LmlubmVySGVpZ2h0IC0gcmVjdC5oZWlnaHQpIC8gMik7XG4gICAgICBsZXQgdG9wID0gTnVtYmVyLmlzRmluaXRlKGNlbnRlclkpID8gY2VudGVyWSA6IG1hcmdpbjtcbiAgICAgIGNvbnN0IG1pblRvcCA9IG1hcmdpbjtcbiAgICAgIGNvbnN0IG1heFRvcCA9IE1hdGgubWF4KG1hcmdpbiwgd2luZG93LmlubmVySGVpZ2h0IC0gcmVjdC5oZWlnaHQgLSBtYXJnaW4pO1xuICAgICAgaWYgKHRvcCA8IG1pblRvcCkgdG9wID0gbWluVG9wO1xuICAgICAgaWYgKHRvcCA+IG1heFRvcCkgdG9wID0gbWF4VG9wO1xuICAgICAgdG9vbHRpcEVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XG4gICAgfTtcblxuICAgIC8vIEhpZGUgdG9vbHRpcCBjb250ZW50LlxuICAgIGNvbnN0IGhpZGVUb29sdGlwID0gKCkgPT4ge1xuICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xuICAgICAgdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gRGVjaWRlIGlmIGEgdG9vbHRpcCBzaG91bGQgZGlzcGxheS5cbiAgICBjb25zdCBzaG91bGRQcmV2aWV3ID0gKGVsOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgaWYgKCFlbC5kYXRhc2V0IHx8ICFlbC5kYXRhc2V0LmZ1bGx0ZXh0KSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoZWwuZGF0YXNldC5wcmV2aWV3ID09PSBcIjFcIikgcmV0dXJuIHRydWU7XG4gICAgICByZXR1cm4gZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCArIDEgfHwgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICsgMTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVzb2x2ZVRvb2x0aXBUYXJnZXQgPSAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XG4gICAgICBjb25zdCB0ZXh0RWwgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLW5hbWUsIC50aW1lbGluZS1kZXNjLXRleHRcIik7XG4gICAgICBpZiAoIXRleHRFbCB8fCAhY29udGFpbmVyLmNvbnRhaW5zKHRleHRFbCkpIHJldHVybiBudWxsO1xuICAgICAgcmV0dXJuIHRleHRFbDtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2hvd1Rvb2x0aXBGb3JFbGVtZW50ID0gKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcbiAgICAgIGlmICghZWwpIHJldHVybjtcbiAgICAgIGNvbnN0IHRleHQgPSBlbC5kYXRhc2V0LmZ1bGx0ZXh0IHx8IGVsLnRleHRDb250ZW50IHx8IFwiXCI7XG4gICAgICBpZiAoIXRleHQgfHwgIXNob3VsZFByZXZpZXcoZWwpKSByZXR1cm47XG4gICAgICBzaG93VG9vbHRpcCh0ZXh0LCBlbCk7XG4gICAgfTtcblxuICAgIGxldCBhY3RpdmVUb29sdGlwRWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XG4gICAgbGV0IHByZXNzVGltZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gICAgY29uc3QgY2xlYXJQcmVzc1RpbWVyID0gKCkgPT4ge1xuICAgICAgaWYgKHByZXNzVGltZXIgPT0gbnVsbCkgcmV0dXJuO1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcbiAgICAgIHByZXNzVGltZXIgPSBudWxsO1xuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlT3ZlciA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGV4dEVsID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQudGFyZ2V0KTtcbiAgICAgIGlmICghdGV4dEVsKSByZXR1cm47XG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSB0ZXh0RWw7XG4gICAgICBzaG93VG9vbHRpcEZvckVsZW1lbnQodGV4dEVsKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZU91dCA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZnJvbSA9IHJlc29sdmVUb29sdGlwVGFyZ2V0KGV2ZW50LnRhcmdldCk7XG4gICAgICBpZiAoIWZyb20pIHJldHVybjtcbiAgICAgIGNvbnN0IHRvID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQucmVsYXRlZFRhcmdldCk7XG4gICAgICBpZiAodG8gJiYgdG8gPT09IGZyb20pIHJldHVybjtcbiAgICAgIGhpZGVUb29sdGlwKCk7XG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSBudWxsO1xuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9ICgpID0+IHtcbiAgICAgIGlmICghYWN0aXZlVG9vbHRpcEVsKSByZXR1cm47XG4gICAgICBpZiAoIXRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSByZXR1cm47XG4gICAgICBzaG93VG9vbHRpcEZvckVsZW1lbnQoYWN0aXZlVG9vbHRpcEVsKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaFN0YXJ0ID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0RWwgPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC50YXJnZXQpO1xuICAgICAgaWYgKCF0ZXh0RWwpIHJldHVybjtcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IHRleHRFbDtcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xuICAgICAgcHJlc3NUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2hvd1Rvb2x0aXBGb3JFbGVtZW50KHRleHRFbCk7XG4gICAgICB9LCBUT09MVElQX1RPVUNIX0RFTEFZX01TKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaE1vdmUgPSAoKSA9PiB7XG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcbiAgICAgIGhpZGVUb29sdGlwKCk7XG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSBudWxsO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoRW5kID0gKCkgPT4ge1xuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XG4gICAgfTtcblxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG9uTW91c2VPdmVyKTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIG9uTW91c2VPdXQpO1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Ub3VjaFN0YXJ0LCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgb25Ub3VjaE1vdmUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIG9uVG91Y2hFbmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IG9uU2VsZWN0U3RhcnQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBpZiAoIXJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCkpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNlbGVjdHN0YXJ0XCIsIG9uU2VsZWN0U3RhcnQpO1xuXG4gICAgY2xlYW51cHMucHVzaCgoKSA9PiB7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBvbk1vdXNlT3Zlcik7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIG9uTW91c2VPdXQpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uVG91Y2hTdGFydCk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZSk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIG9uVG91Y2hFbmQpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzZWxlY3RzdGFydFwiLCBvblNlbGVjdFN0YXJ0KTtcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFlcnJvck1lc3NhZ2UpIHtcbiAgICAgIGNvbnN0IGNhcmRzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmRcIik7XG4gICAgICBjYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XG4gICAgICAgIGlmICghY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0aW1lbGluZS1jYXJkLS1ub2RhdGFcIikpIHtcbiAgICAgICAgICBjb25zdCBjbGVhbnVwUGl4ZWwgPSBjcmVhdGVQaXhlbEVmZmVjdChjYXJkKTtcbiAgICAgICAgICBpZiAoY2xlYW51cFBpeGVsKSBjbGVhbnVwcy5wdXNoKGNsZWFudXBQaXhlbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBmcmFtZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHRFbHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtbmFtZSwgLnRpbWVsaW5lLWRlc2MtdGV4dFwiKTtcbiAgICAgICAgdGV4dEVscy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRleHQgPSBlbC5kYXRhc2V0LmZ1bGx0ZXh0IHx8IGVsLnRleHRDb250ZW50IHx8IFwiXCI7XG4gICAgICAgICAgYXBwbHlFbGxpcHNpcyhlbCwgdGV4dCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGNsZWFudXBzLnB1c2goKCkgPT4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGZyYW1lSWQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYW51cHMuZm9yRWFjaCgoY2xlYW51cCkgPT4gY2xlYW51cCgpKTtcbiAgICB9O1xuICB9LCBbY29udGFpbmVyUmVmLCBlcnJvck1lc3NhZ2UsIGl0ZW1zLCByZXNvbHZlQ2xpY2thYmxlQ2FyZF0pO1xufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgc3VtbWFyeUZyb21MYWJlbDogc3RyaW5nO1xuICBzdW1tYXJ5VG9MYWJlbDogc3RyaW5nO1xuICBmcm9tVmFsdWU6IHN0cmluZztcbiAgdG9WYWx1ZTogc3RyaW5nO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGNsaWVudExhYmVsPzogc3RyaW5nO1xuICBjbGllbnRWYWx1ZT86IHN0cmluZztcbiAgc2hvd0NsaWVudD86IGJvb2xlYW47XG59O1xuXG4vLyBSZW5kZXJzIHRoZSByZXVzYWJsZSBkYXRlIHN1bW1hcnkgYmxvY2sgZm9yIGhpc3RvcnkgZmlsdGVycy5cbmNvbnN0IEhpc3RvcnlTdW1tYXJ5ID0gKHtcbiAgc3VtbWFyeUZyb21MYWJlbCxcbiAgc3VtbWFyeVRvTGFiZWwsXG4gIGZyb21WYWx1ZSxcbiAgdG9WYWx1ZSxcbiAgY2xhc3NOYW1lID0gXCJcIixcbiAgY2xpZW50TGFiZWwgPSBcIlwiLFxuICBjbGllbnRWYWx1ZSA9IFwiXCIsXG4gIHNob3dDbGllbnQgPSBmYWxzZSxcbn06IFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgaGlzdG9yeS1maWx0ZXItc3VtbWFyeSBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLXgtMyBnYXAteS0yIHRleHQteHMgJHtjbGFzc05hbWV9YC50cmltKCl9PlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkXCI+e3N1bW1hcnlGcm9tTGFiZWx9Ojwvc3Bhbj5cbiAgICAgICAgPHNwYW4+e2Zyb21WYWx1ZX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57c3VtbWFyeVRvTGFiZWx9Ojwvc3Bhbj5cbiAgICAgICAgPHNwYW4+e3RvVmFsdWV9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgICB7c2hvd0NsaWVudCAmJiBjbGllbnRWYWx1ZSA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IG10LTEuNSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIG1pbi13LTBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHNocmluay0wXCI+e2NsaWVudExhYmVsfTo8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWluLXctMCBmbGV4LTEgdHJ1bmNhdGVcIj57Y2xpZW50VmFsdWV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeVN1bW1hcnk7XG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbmV4cG9ydCB0eXBlIEhpc3RvcnlNYW51YWxEYXlDZWxsID0ge1xuICBrZXk6IHN0cmluZztcbiAgaXNFbXB0eTogYm9vbGVhbjtcbiAgZGF0ZT86IERhdGU7XG4gIGlzbz86IHN0cmluZztcbiAgZGF5TGFiZWw/OiBudW1iZXI7XG4gIGRheUNsYXNzPzogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG59O1xuXG50eXBlIEhpc3RvcnlNYW51YWxEYXRlUGlja2VyUHJvcHMgPSB7XG4gIGFjdGl2YXRvclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIHBvcG92ZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBzaG93TWFudWFsRXJyb3I6IGJvb2xlYW47XG4gIHNob3dTdGFydEVycm9yOiBib29sZWFuO1xuICBzaG93RW5kRXJyb3I6IGJvb2xlYW47XG4gIGZpbHRlclRpdGxlOiBzdHJpbmc7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgc2VsZWN0aW5nU3RlcDogXCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiO1xuICBsYWJlbEZyb206IHN0cmluZztcbiAgbGFiZWxUbzogc3RyaW5nO1xuICBzdGFydERhdGVUZXh0OiBzdHJpbmc7XG4gIGVuZERhdGVUZXh0OiBzdHJpbmc7XG4gIGNsZWFyUmFuZ2VMYWJlbDogc3RyaW5nO1xuICBoYXNTZWxlY3RlZFJhbmdlOiBib29sZWFuO1xuICBtb250aExhYmVsOiBzdHJpbmc7XG4gIHdlZWtEYXlMYWJlbHM6IHN0cmluZ1tdO1xuICBzdGF0dXNUZXh0OiBzdHJpbmc7XG4gIGRheUNlbGxzOiBIaXN0b3J5TWFudWFsRGF5Q2VsbFtdO1xuICBwcmV2TW9udGhMYWJlbDogc3RyaW5nO1xuICBuZXh0TW9udGhMYWJlbDogc3RyaW5nO1xuICBvbk9wZW5Qb3BvdmVyOiAoc2VjdGlvbjogXCJzdGFydFwiIHwgXCJlbmRcIikgPT4gdm9pZDtcbiAgb25BY3RpdmF0b3JLZXlEb3duOiAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvblNlY3Rpb25LZXlEb3duOiAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+LCBzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB2b2lkO1xuICBvbkNsZWFyOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHZvaWQ7XG4gIG9uUHJldk1vbnRoOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvbk5leHRNb250aDogKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4gdm9pZDtcbiAgb25HcmlkTW91c2VMZWF2ZTogKCkgPT4gdm9pZDtcbiAgb25EYXlDbGljazogKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHZvaWQ7XG4gIG9uRGF5SG92ZXI6IChkYXk6IEhpc3RvcnlNYW51YWxEYXlDZWxsKSA9PiB2b2lkO1xufTtcblxuLy8gUHJlc2VudGF0aW9uYWwgZGF0ZSByYW5nZSBwaWNrZXIgdXNlZCBieSB0aGUgaGlzdG9yeSBxdWljayBmaWx0ZXIuXG5jb25zdCBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlciA9ICh7XG4gIGFjdGl2YXRvclJlZixcbiAgcG9wb3ZlclJlZixcbiAgc2hvd01hbnVhbEVycm9yLFxuICBzaG93U3RhcnRFcnJvcixcbiAgc2hvd0VuZEVycm9yLFxuICBmaWx0ZXJUaXRsZSxcbiAgaXNPcGVuLFxuICBzZWxlY3RpbmdTdGVwLFxuICBsYWJlbEZyb20sXG4gIGxhYmVsVG8sXG4gIHN0YXJ0RGF0ZVRleHQsXG4gIGVuZERhdGVUZXh0LFxuICBjbGVhclJhbmdlTGFiZWwsXG4gIGhhc1NlbGVjdGVkUmFuZ2UsXG4gIG1vbnRoTGFiZWwsXG4gIHdlZWtEYXlMYWJlbHMsXG4gIHN0YXR1c1RleHQsXG4gIGRheUNlbGxzLFxuICBwcmV2TW9udGhMYWJlbCxcbiAgbmV4dE1vbnRoTGFiZWwsXG4gIG9uT3BlblBvcG92ZXIsXG4gIG9uQWN0aXZhdG9yS2V5RG93bixcbiAgb25TZWN0aW9uS2V5RG93bixcbiAgb25DbGVhcixcbiAgb25QcmV2TW9udGgsXG4gIG9uTmV4dE1vbnRoLFxuICBvbkdyaWRNb3VzZUxlYXZlLFxuICBvbkRheUNsaWNrLFxuICBvbkRheUhvdmVyLFxufTogSGlzdG9yeU1hbnVhbERhdGVQaWNrZXJQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgaWQ9XCJkcnBBY3RpdmF0b3JcIlxuICAgICAgICByZWY9e2FjdGl2YXRvclJlZn1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiZHJwIHctZnVsbFwiLCBzaG93TWFudWFsRXJyb3IgPyBcImRycC1lcnJvclwiIDogXCJcIil9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IG9uT3BlblBvcG92ZXIoXCJzdGFydFwiKX1cbiAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICBhcmlhLWxhYmVsPXtmaWx0ZXJUaXRsZX1cbiAgICAgICAgYXJpYS1oYXNwb3B1cD1cImRpYWxvZ1wiXG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9e2lzT3Blbn1cbiAgICAgICAgb25LZXlEb3duPXtvbkFjdGl2YXRvcktleURvd259XG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcImRycC1zZWN0aW9uXCIsXG4gICAgICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcInN0YXJ0XCIgJiYgaXNPcGVuID8gXCJhY3RpdmVcIiA6IFwiXCIsXG4gICAgICAgICAgICBzaG93U3RhcnRFcnJvciA/IFwiaXMtZXJyb3JcIiA6IFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIGRhdGEtc2VjdGlvbj1cInN0YXJ0XCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgb25PcGVuUG9wb3ZlcihcInN0YXJ0XCIpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxGcm9tfVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiBvblNlY3Rpb25LZXlEb3duKGV2ZW50LCBcInN0YXJ0XCIpfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtbGFiZWxcIj57bGFiZWxGcm9tfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXZhbHVlXCI+XG4gICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS1jYWxlbmRhcjMgZHJwLWljb25cIiAvPlxuICAgICAgICAgICAgPHNwYW4gaWQ9XCJkcnBTdGFydFZhbHVlXCI+e3N0YXJ0RGF0ZVRleHR9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1zZXBhcmF0b3IgaGlkZGVuIHNtOmZsZXhcIj5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS1hcnJvdy1yaWdodFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1zZXBhcmF0b3ItbW9iaWxlIGZsZXggc206aGlkZGVuXCIgLz5cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgXCJkcnAtc2VjdGlvblwiLFxuICAgICAgICAgICAgc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiBpc09wZW4gPyBcImFjdGl2ZVwiIDogXCJcIixcbiAgICAgICAgICAgIHNob3dFbmRFcnJvciA/IFwiaXMtZXJyb3JcIiA6IFwiXCJcbiAgICAgICAgICApfVxuICAgICAgICAgIGRhdGEtc2VjdGlvbj1cImVuZFwiXG4gICAgICAgICAgb25DbGljaz17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIG9uT3BlblBvcG92ZXIoXCJlbmRcIik7XG4gICAgICAgICAgfX1cbiAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbFRvfVxuICAgICAgICAgIG9uS2V5RG93bj17KGV2ZW50KSA9PiBvblNlY3Rpb25LZXlEb3duKGV2ZW50LCBcImVuZFwiKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLWxhYmVsXCI+e2xhYmVsVG99PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtdmFsdWVcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImJpIGJpLWNhbGVuZGFyMyBkcnAtaWNvblwiIC8+XG4gICAgICAgICAgICA8c3BhbiBpZD1cImRycEVuZFZhbHVlXCI+e2VuZERhdGVUZXh0fTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgIGlkPVwiZHJwQ2xlYXJcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1jbGVhclwiXG4gICAgICAgICAgYXJpYS1sYWJlbD17Y2xlYXJSYW5nZUxhYmVsfVxuICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGhhc1NlbGVjdGVkUmFuZ2UgPyBcImlubGluZS1mbGV4XCIgOiBcIm5vbmVcIiB9fVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xlYXJ9XG4gICAgICAgID5cbiAgICAgICAgICA8aSBjbGFzc05hbWU9XCJiaSBiaS14LWxnXCIgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBpZD1cImRycFBvcG92ZXJcIiByZWY9e3BvcG92ZXJSZWZ9IGNsYXNzTmFtZT1cImRycC1wb3BvdmVyXCIgaGlkZGVuPXshaXNPcGVufT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtaGVhZFwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZHJwLW5hdlwiXG4gICAgICAgICAgICBkYXRhLWRpcj1cInByZXZcIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD17cHJldk1vbnRoTGFiZWx9XG4gICAgICAgICAgICBvbkNsaWNrPXtvblByZXZNb250aH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzc05hbWU9XCJoLTQgdy00XCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDMwIDMwXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCI+XG4gICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjJcIiBkPVwiTTE1IDE5bC03LTcgNy03XCIgLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxkaXYgaWQ9XCJkcnBNb250aExhYmVsXCIgY2xhc3NOYW1lPVwiZHJwLW1vbnRoXCI+e21vbnRoTGFiZWx9PC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJkcnAtbmF2XCJcbiAgICAgICAgICAgIGRhdGEtZGlyPVwibmV4dFwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtuZXh0TW9udGhMYWJlbH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uTmV4dE1vbnRofVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cbiAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNOSA1bDcgNy03IDdcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXdlZWtkYXlzXCI+XG4gICAgICAgICAge3dlZWtEYXlMYWJlbHMubWFwKChsYWJlbCwgaW5kZXgpID0+IChcbiAgICAgICAgICAgIDxzcGFuIGtleT17YCR7bGFiZWx9LSR7aW5kZXh9YH0+e2xhYmVsfTwvc3Bhbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBpZD1cImRycEdyaWRcIiBjbGFzc05hbWU9XCJkcnAtZ3JpZFwiIG9uTW91c2VMZWF2ZT17b25HcmlkTW91c2VMZWF2ZX0+XG4gICAgICAgICAge2RheUNlbGxzLm1hcCgoY2VsbCkgPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGwuaXNFbXB0eSkge1xuICAgICAgICAgICAgICByZXR1cm4gPGJ1dHRvbiBrZXk9e2NlbGwua2V5fSBjbGFzc05hbWU9XCJkcnAtZGF5IGVtcHR5XCIgZGlzYWJsZWQgLz47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e2NlbGwua2V5fVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2VsbC5kYXlDbGFzc31cbiAgICAgICAgICAgICAgICBkYXRhLWRhdGU9e2NlbGwuaXNvfVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtjZWxsLmRpc2FibGVkfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uRGF5Q2xpY2soY2VsbCl9XG4gICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBvbkRheUhvdmVyKGNlbGwpfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NlbGwuZGF5TGFiZWx9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBpZD1cImRycFN0YXR1c1wiIGNsYXNzTmFtZT1cImRycC1zdGF0dXNcIj5cbiAgICAgICAgICB7c3RhdHVzVGV4dH1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyO1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBGaWx0ZXJMb2FkUmVxdWVzdCwgTG9hZE92ZXJyaWRlIH0gZnJvbSBcIi4vdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZS50c1wiO1xuXG50eXBlIFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncyA9IHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBhY3RpdmF0b3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBwb3BvdmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgcGFnaW5hdGlvblJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmOiBSZWFjdC5NdXRhYmxlUmVmT2JqZWN0PGJvb2xlYW4+O1xuICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICB1cGRhdGVGYWJCb3R0b206ICgpID0+IHZvaWQ7XG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbiAgY29uc3VtZVJldHVybkZsYWc6ICgpID0+IGJvb2xlYW47XG4gIHJlYWRDYWNoZWRGaWx0ZXI6ICgpID0+IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsO1xuICBhcHBseUNhY2hlZEZpbHRlcjogKGZpbHRlcjogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwpID0+IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbDtcbiAgbG9hZEFjdGl2aXRpZXM6IChwYWdlOiBudW1iZXIsIG92ZXJyaWRlPzogTG9hZE92ZXJyaWRlKSA9PiB2b2lkO1xuICBzZXRJc09wZW46IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcbiAgc2V0SG92ZXJEYXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxEYXRlIHwgbnVsbD4+O1xuICBzZXRTaG93RmlsdGVyczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBhcHBseUZpbHRlcnM6IChvcHRpb25zPzogeyBjbG9zZVBhbmVsPzogYm9vbGVhbjsgZm9yY2U/OiBib29sZWFuOyBwYWdlPzogbnVtYmVyIH0pID0+IHZvaWQ7XG59O1xuXG4vLyBIYW5kbGVzIGdsb2JhbCBsaXN0ZW5lcnMgdXNlZCBieSB0aGUgaGlzdG9yeSBwYWdlIGZpbHRlcnMgYW5kIGNhbGVuZGFyIFVJLlxuZXhwb3J0IGNvbnN0IHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzID0gKHtcbiAgaXNPcGVuLFxuICBhY3RpdmF0b3JSZWYsXG4gIHBvcG92ZXJSZWYsXG4gIHBhZ2luYXRpb25SZWYsXG4gIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICBjdXJyZW50UGFnZSxcbiAgdXBkYXRlRmFiQm90dG9tLFxuICBsb2dIaXN0b3J5LFxuICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgcmVhZENhY2hlZEZpbHRlcixcbiAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gIGxvYWRBY3Rpdml0aWVzLFxuICBzZXRJc09wZW4sXG4gIHNldEhvdmVyRGF0ZSxcbiAgc2V0U2hvd0ZpbHRlcnMsXG4gIGFwcGx5RmlsdGVycyxcbn06IFVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzQXJncykgPT4ge1xuICAvLyBDbG9zZSB0aGUgbWFudWFsIHBpY2tlciB3aGVuIGNsaWNraW5nIG91dHNpZGUgb2YgdGhlIHJhbmdlIHBpY2tlciBVSS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWlzT3BlbikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZSA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIE5vZGUgfCBudWxsO1xuICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICAgIGlmIChwb3BvdmVyUmVmLmN1cnJlbnQ/LmNvbnRhaW5zKHRhcmdldCkpIHJldHVybjtcbiAgICAgIGlmIChhY3RpdmF0b3JSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgbG9nSGlzdG9yeShcImNsb3NlUG9wb3ZlcjpvdXRzaWRlXCIpO1xuICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICB9O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgICByZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlKTtcbiAgfSwgW2FjdGl2YXRvclJlZiwgaXNPcGVuLCBsb2dIaXN0b3J5LCBwb3BvdmVyUmVmLCBzZXRIb3ZlckRhdGUsIHNldElzT3Blbl0pO1xuXG4gIC8vIFJlLWFwcGx5IGZpbHRlcnMgYWZ0ZXIgYnJvd3NlciBiYWNrL2ZvcndhcmQgbmF2aWdhdGlvbiByZXR1cm5zIHRvIHRoZSBwYWdlLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uUGFnZVNob3cgPSAoKSA9PiB7XG4gICAgICBpZiAoaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgaWYgKGNvbnN1bWVSZXR1cm5GbGFnKCkpIHtcbiAgICAgICAgY29uc3QgY2FjaGVkID0gcmVhZENhY2hlZEZpbHRlcigpO1xuICAgICAgICBjb25zdCBjYWNoZWRSZXF1ZXN0ID0gYXBwbHlDYWNoZWRGaWx0ZXIoY2FjaGVkKTtcbiAgICAgICAgaWYgKGNhY2hlZFJlcXVlc3QpIHtcbiAgICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgIGxvYWRBY3Rpdml0aWVzKGNhY2hlZFJlcXVlc3QucGFnZSwgY2FjaGVkUmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcbiAgfSwgW1xuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgICBzZXRJc09wZW4sXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gIF0pO1xuXG4gIC8vIEtlZXAgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiBjbGVhciBvZiBwYWdpbmF0aW9uIGFuZCByZWFjdCB0byBsYXlvdXQgY2hhbmdlcy5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICB1cGRhdGVGYWJCb3R0b20oKTtcblxuICAgIGxldCBvYnNlcnZlcjogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgICBjb25zdCBwYWdpbmF0aW9uRWwgPSBwYWdpbmF0aW9uUmVmLmN1cnJlbnQ7XG4gICAgaWYgKHBhZ2luYXRpb25FbCAmJiB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHVwZGF0ZUZhYkJvdHRvbSgpKTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUocGFnaW5hdGlvbkVsKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVGYWJCb3R0b20pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB1cGRhdGVGYWJCb3R0b20pO1xuICAgICAgaWYgKG9ic2VydmVyKSBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfTtcbiAgfSwgW3BhZ2luYXRpb25SZWYsIHVwZGF0ZUZhYkJvdHRvbV0pO1xuXG4gIC8vIFdpcmUgdG9wYmFyIGFjdGlvbnMgdGhhdCB0b2dnbGUgZmlsdGVycyBvciBmb3JjZSByZWZyZXNoIG9mIGN1cnJlbnQgcGFnZS5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvblRvZ2dsZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICBzZXRTaG93RmlsdGVycygocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gIXByZXY7XG4gICAgICAgIGlmICghbmV4dCkge1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25SZWZyZXNoID0gKCkgPT4ge1xuICAgICAgYXBwbHlGaWx0ZXJzKHsgcGFnZTogY3VycmVudFBhZ2UsIGZvcmNlOiB0cnVlLCBjbG9zZVBhbmVsOiB0cnVlIH0pO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGlzdG9yeS1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXRvZ2dsZS1maWx0ZXJcIiwgb25Ub2dnbGVGaWx0ZXJzKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiaGlzdG9yeS1yZWZyZXNoXCIsIG9uUmVmcmVzaCk7XG4gICAgfTtcbiAgfSwgW2FwcGx5RmlsdGVycywgY3VycmVudFBhZ2UsIHNldElzT3Blbiwgc2V0U2hvd0ZpbHRlcnNdKTtcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IFRpbWVsaW5lSXRlbSB9IGZyb20gXCIuL0hpc3RvcnlUYWJsZS50c3hcIjtcblxudHlwZSBBY3Rpdml0eVJlY29yZCA9IFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuXG50eXBlIFVzZUhpc3RvcnlUaW1lbGluZUl0ZW1zQXJncyA9IHtcbiAgaXRlbXM6IEFjdGl2aXR5UmVjb3JkW107XG4gIGxvY2FsZTogc3RyaW5nO1xuICBub0RhdGFUZXh0OiBzdHJpbmc7XG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbiAgdG9UaXRsZUNhc2U6ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4gc3RyaW5nO1xuICBmb3JtYXREYXRlUGFydHM6ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4geyB5ZWFyOiBzdHJpbmc7IG1vbnRoOiBzdHJpbmc7IGRheTogc3RyaW5nIH07XG59O1xuXG4vLyBNYXBzIHJhdyBoaXN0b3J5IHBheWxvYWQgaXRlbXMgaW50byB0aW1lbGluZSBjYXJkcyB1c2VkIGJ5IEhpc3RvcnlUYWJsZS5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5VGltZWxpbmVJdGVtcyA9ICh7XG4gIGl0ZW1zLFxuICBsb2NhbGUsXG4gIG5vRGF0YVRleHQsXG4gIGxvZ0hpc3RvcnksXG4gIHRvVGl0bGVDYXNlLFxuICBmb3JtYXREYXRlUGFydHMsXG59OiBVc2VIaXN0b3J5VGltZWxpbmVJdGVtc0FyZ3MpID0+IHtcbiAgY29uc3QgZGVidWdMb2dnZWRSZWYgPSB1c2VSZWYoMCk7XG5cbiAgY29uc3QgdGltZWxpbmVJdGVtczogVGltZWxpbmVJdGVtW10gPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gaXRlbXMubWFwKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3QgYWN0aXZpZGFkSWRSYXcgPSAoZW50cnkuYWN0aXZpZGFkSWQgPz8gZW50cnkuQWN0aXZpZGFkSWQgPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICBjb25zdCBhY3RpdmlkYWRJZCA9IGFjdGl2aWRhZElkUmF3IHx8IFwiXCI7XG4gICAgICBjb25zdCByZWNJZFJhdyA9IGVudHJ5LnJlY0lkID8/IGVudHJ5LlJlY0lkID8/IFwiXCI7XG4gICAgICBjb25zdCByZWNJZCA9IHJlY0lkUmF3ICYmICFOdW1iZXIuaXNOYU4oTnVtYmVyKHJlY0lkUmF3KSkgPyBOdW1iZXIocmVjSWRSYXcpIDogbnVsbDtcbiAgICAgIGxldCBsaW5rSWQgPSBhY3RpdmlkYWRJZCB8fCAocmVjSWQgPyByZWNJZC50b1N0cmluZygpIDogXCJcIik7XG5cbiAgICAgIGlmIChkZWJ1Z0xvZ2dlZFJlZi5jdXJyZW50IDwgNSkge1xuICAgICAgICBsb2dIaXN0b3J5KFwiYWN0aXZpdHkgaXRlbVwiLCB7IGFjdGl2aWRhZElkLCByZWNJZFJhdywgcmVjSWQgfSk7XG4gICAgICAgIGRlYnVnTG9nZ2VkUmVmLmN1cnJlbnQgKz0gMTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmF3TmFtZSA9IChlbnRyeS5uYW1lID8/IGVudHJ5Lk5hbWUgPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XG4gICAgICBjb25zdCBmdWxsTmFtZSA9IHRvVGl0bGVDYXNlKHJhd05hbWUsIGxvY2FsZSk7XG4gICAgICBjb25zdCBmZWNoYSA9IChlbnRyeS50cmFuc0RhdGUgPz8gZW50cnkuVHJhbnNEYXRlID8/IFwiXCIpLnRvU3RyaW5nKCk7XG4gICAgICBjb25zdCByYXdEZXNjID0gKGVudHJ5LmRlc2NyaXB0aW9uID8/IGVudHJ5LkRlc2NyaXB0aW9uID8/IFwiXCIpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgY29uc3QgZnVsbERlc2MgPSByYXdEZXNjO1xuXG4gICAgICBjb25zdCBpc05vRGF0YUNhcmQgPSAhcmF3TmFtZSAmJiAhcmF3RGVzYztcbiAgICAgIGlmIChpc05vRGF0YUNhcmQpIHtcbiAgICAgICAgbGlua0lkID0gXCJcIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGxpbmtJZCxcbiAgICAgICAgYWN0aXZpZGFkSWQsXG4gICAgICAgIHJlY0lkLFxuICAgICAgICBuYW1lOiBmdWxsTmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb246IGZ1bGxEZXNjIHx8IG5vRGF0YVRleHQsXG4gICAgICAgIGZ1bGxOYW1lLFxuICAgICAgICBmdWxsRGVzYyxcbiAgICAgICAgZGF0ZVBhcnRzOiBmb3JtYXREYXRlUGFydHMoZmVjaGEsIGxvY2FsZSksXG4gICAgICAgIGlzTm9EYXRhOiBpc05vRGF0YUNhcmQsXG4gICAgICB9O1xuICAgIH0pO1xuICB9LCBbZm9ybWF0RGF0ZVBhcnRzLCBpdGVtcywgbG9jYWxlLCBsb2dIaXN0b3J5LCBub0RhdGFUZXh0LCB0b1RpdGxlQ2FzZV0pO1xuXG4gIHJldHVybiB7IHRpbWVsaW5lSXRlbXMgfTtcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5cbnR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcyA9IHtcbiAgcm91dGU6IHN0cmluZztcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIHNpemU/OiBudW1iZXI7XG4gIHJpZ2h0PzogbnVtYmVyO1xuICBib3R0b20/OiBudW1iZXI7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBzaGFkb3dPcGFjaXR5PzogbnVtYmVyO1xuICBwbHVzVGhpY2tuZXNzPzogbnVtYmVyO1xuICBwbHVzTGVuZ3RoPzogbnVtYmVyO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IGNsYW1wID0gKHZhbHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT4gTWF0aC5taW4obWF4LCBNYXRoLm1heChtaW4sIHZhbHVlKSk7XG5cbi8vIEZsb2F0aW5nIGFjdGlvbiBidXR0b24gdGhhdCByZW5kZXJzIGEgY3Jpc3AgU1ZHIG9udG8gYSBjYW52YXMuXG5jb25zdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiA9ICh7XG4gIHJvdXRlLFxuICBhcmlhTGFiZWwsXG4gIHNpemUgPSA3NixcbiAgcmlnaHQgPSAyNCxcbiAgYm90dG9tID0gMjQsXG4gIGNvbG9yID0gXCIjMDAyOTZiXCIsXG4gIHNoYWRvd09wYWNpdHkgPSAwLjE2LFxuICBwbHVzVGhpY2tuZXNzID0gNCxcbiAgcGx1c0xlbmd0aCA9IDI4LFxuICBvbkNsaWNrLFxufTogRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcykgPT4ge1xuICBjb25zdCBidG5SZWYgPSB1c2VSZWY8SFRNTEJ1dHRvbkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgY2FudmFzUmVmID0gdXNlUmVmPEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgY29uc3QgYnVpbGRGYWJTdmcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3Qgc2FmZU9wYWNpdHkgPSBjbGFtcChzaGFkb3dPcGFjaXR5LCAwLCAwLjUpO1xuICAgIGNvbnN0IHNhZmVUaGlja25lc3MgPSBjbGFtcChwbHVzVGhpY2tuZXNzLCAyLCA4KTtcbiAgICBjb25zdCBzYWZlTGVuZ3RoID0gY2xhbXAocGx1c0xlbmd0aCwgMTYsIDQwKTtcblxuICAgIGNvbnN0IGN4ID0gNDg7XG4gICAgY29uc3QgeFYgPSBjeCAtIHNhZmVUaGlja25lc3MgLyAyO1xuICAgIGNvbnN0IHlWID0gY3ggLSBzYWZlTGVuZ3RoIC8gMjtcbiAgICBjb25zdCB4SCA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XG4gICAgY29uc3QgeUggPSBjeCAtIHNhZmVUaGlja25lc3MgLyAyO1xuXG4gICAgcmV0dXJuIGBcbiAgICAgIDxzdmcgd2lkdGg9XCI5NlwiIGhlaWdodD1cIjk2XCIgdmlld0JveD1cIjAgMCA5NiA5NlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgPGRlZnM+XG4gICAgICAgICAgPGZpbHRlciBpZD1cImZhYlNoYWRvd1wiIHg9XCItNDAlXCIgeT1cIi00MCVcIiB3aWR0aD1cIjE4MCVcIiBoZWlnaHQ9XCIxODAlXCI+XG4gICAgICAgICAgICA8ZmVEcm9wU2hhZG93IGR4PVwiLTRcIiBkeT1cIjEwXCIgc3RkRGV2aWF0aW9uPVwiNlwiIGZsb29kLWNvbG9yPVwiIzAwMFwiIGZsb29kLW9wYWNpdHk9XCIke3NhZmVPcGFjaXR5fVwiLz5cbiAgICAgICAgICA8L2ZpbHRlcj5cbiAgICAgICAgPC9kZWZzPlxuXG4gICAgICAgIDxnIGZpbHRlcj1cInVybCgjZmFiU2hhZG93KVwiPlxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI0OFwiIGN5PVwiNDhcIiByPVwiMzRcIiBmaWxsPVwiJHtjb2xvcn1cIi8+XG4gICAgICAgIDwvZz5cblxuICAgICAgICA8ZyBmaWxsPVwiI2ZmZlwiPlxuICAgICAgICAgIDxyZWN0IHg9XCIke3hWfVwiIHk9XCIke3lWfVwiIHdpZHRoPVwiJHtzYWZlVGhpY2tuZXNzfVwiIGhlaWdodD1cIiR7c2FmZUxlbmd0aH1cIiByeD1cIjFcIi8+XG4gICAgICAgICAgPHJlY3QgeD1cIiR7eEh9XCIgeT1cIiR7eUh9XCIgd2lkdGg9XCIke3NhZmVMZW5ndGh9XCIgaGVpZ2h0PVwiJHtzYWZlVGhpY2tuZXNzfVwiIHJ4PVwiMVwiLz5cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgYC50cmltKCk7XG4gIH0sIFtjb2xvciwgc2hhZG93T3BhY2l0eSwgcGx1c0xlbmd0aCwgcGx1c1RoaWNrbmVzc10pO1xuXG4gIGNvbnN0IHJlbmRlclN2Z1RvQ2FudmFzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2l6ZVB4ID0gTWF0aC5tYXgoNDAsIHNpemUpO1xuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG5cbiAgICBjYW52YXMud2lkdGggPSBNYXRoLnJvdW5kKHNpemVQeCAqIGRwcik7XG4gICAgY2FudmFzLmhlaWdodCA9IE1hdGgucm91bmQoc2l6ZVB4ICogZHByKTtcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBgJHtzaXplUHh9cHhgO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtzaXplUHh9cHhgO1xuICAgIGN0eC5zZXRUcmFuc2Zvcm0oZHByLCAwLCAwLCBkcHIsIDAsIDApO1xuXG4gICAgY29uc3Qgc3ZnID0gYnVpbGRGYWJTdmcoKTtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3N2Z10sIHsgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgIGltZy5kZWNvZGluZyA9IFwiYXN5bmNcIjtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzaXplUHgsIHNpemVQeCk7XG4gICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgc2l6ZVB4LCBzaXplUHgpO1xuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgIH07XG4gICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfTtcbiAgICBpbWcuc3JjID0gdXJsO1xuICB9LCBbYnVpbGRGYWJTdmcsIHNpemVdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJlbmRlclN2Z1RvQ2FudmFzKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVuZGVyU3ZnVG9DYW52YXMpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZW5kZXJTdmdUb0NhbnZhcyk7XG4gIH0sIFtyZW5kZXJTdmdUb0NhbnZhc10pO1xuXG4gIGNvbnN0IGhhbmRsZUNsaWNrID0gKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygb25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBvbkNsaWNrKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcm91dGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcm91dGU7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uXG4gICAgICByZWY9e2J0blJlZn1cbiAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgei0yMDAwIHJvdW5kZWQtbWQgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTE1MCBob3ZlcjotdHJhbnNsYXRlLXktMC41IGFjdGl2ZTpzY2FsZS05NSBmb2N1cy12aXNpYmxlOnJpbmctNCBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zMCBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTRcIlxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgd2lkdGg6IGAke3NpemV9cHhgLFxuICAgICAgICBoZWlnaHQ6IGAke3NpemV9cHhgLFxuICAgICAgICByaWdodDogYCR7cmlnaHR9cHhgLFxuICAgICAgICBib3R0b206IGAke2JvdHRvbX1weGAsXG4gICAgICAgIFdlYmtpdFRhcEhpZ2hsaWdodENvbG9yOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICB9fVxuICAgICAgb25DbGljaz17aGFuZGxlQ2xpY2t9XG4gICAgPlxuICAgICAgPGNhbnZhcyByZWY9e2NhbnZhc1JlZn0gY2xhc3NOYW1lPVwiYmxvY2sgcm91bmRlZC1tZFwiIC8+XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbjtcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiwgdXNlTWVtbyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5cbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcbiAgZmlyc3Q/OiBzdHJpbmc7XG4gIHByZXY/OiBzdHJpbmc7XG4gIG5leHQ/OiBzdHJpbmc7XG4gIGxhc3Q/OiBzdHJpbmc7XG59O1xuXG50eXBlIENvbXBhY3RQYWdpbmF0aW9uUHJvcHMgPSB7XG4gIHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcbiAgcGFnZVdpbmRvdz86IG51bWJlcjtcbiAgb25QYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xuICBsYWJlbHM/OiBQYWdpbmF0aW9uTGFiZWxzO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBERUZBVUxUX1dJTkRPVyA9IDY7XG5cbi8vIENvbXBhY3QgcGFnaW5hdGlvbiB3aXRoIDYtcGFnZSB3aW5kb3cgYW5kIGVkZ2UgY29udHJvbHMuXG5jb25zdCBDb21wYWN0UGFnaW5hdGlvbiA9IGZvcndhcmRSZWY8SFRNTERpdkVsZW1lbnQsIENvbXBhY3RQYWdpbmF0aW9uUHJvcHM+KFxuICAoeyB0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSwgcGFnZVdpbmRvdyA9IERFRkFVTFRfV0lORE9XLCBvblBhZ2VDaGFuZ2UsIGxhYmVscywgY2xhc3NOYW1lIH0sIHJlZikgPT4ge1xuICAgIGNvbnN0IHNhZmVUb3RhbCA9IE1hdGgubWF4KDAsIHRvdGFsUGFnZXMgfHwgMCk7XG4gICAgY29uc3Qgc2FmZUN1cnJlbnQgPSBNYXRoLm1pbihNYXRoLm1heCgxLCBjdXJyZW50UGFnZSB8fCAxKSwgc2FmZVRvdGFsIHx8IDEpO1xuICAgIGNvbnN0IHdpbmRvd1NpemUgPSBNYXRoLm1heCgxLCBwYWdlV2luZG93IHx8IERFRkFVTFRfV0lORE9XKTtcblxuICAgIGNvbnN0IHNob3dQYWdpbmF0aW9uID0gc2FmZVRvdGFsID4gMTtcbiAgICBjb25zdCBzaG93RWRnZU5hdiA9IHNhZmVUb3RhbCA+IHdpbmRvd1NpemU7XG4gICAgY29uc3QgY2FuSnVtcFRvU3RhcnQgPSBzYWZlQ3VycmVudCA+IHdpbmRvd1NpemU7XG4gICAgY29uc3QgY2FuR29QcmV2ID0gc2FmZUN1cnJlbnQgPiAxO1xuICAgIGNvbnN0IGNhbkdvTmV4dCA9IHNhZmVDdXJyZW50IDwgc2FmZVRvdGFsO1xuXG4gICAgY29uc3QgcGFnZU51bWJlcnMgPSB1c2VNZW1vKCgpID0+IHtcbiAgICAgIGlmICghc2FmZVRvdGFsKSByZXR1cm4gW107XG4gICAgICBjb25zdCB3aW5kb3dTdGFydCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoKHNhZmVDdXJyZW50IC0gMSkgLyB3aW5kb3dTaXplKSAqIHdpbmRvd1NpemUgKyAxKTtcbiAgICAgIGNvbnN0IHdpbmRvd0VuZCA9IE1hdGgubWluKHNhZmVUb3RhbCwgd2luZG93U3RhcnQgKyB3aW5kb3dTaXplIC0gMSk7XG4gICAgICByZXR1cm4gQXJyYXkuZnJvbSh7IGxlbmd0aDogd2luZG93RW5kIC0gd2luZG93U3RhcnQgKyAxIH0sIChfdmFsLCBpZHgpID0+IHdpbmRvd1N0YXJ0ICsgaWR4KTtcbiAgICB9LCBbc2FmZUN1cnJlbnQsIHNhZmVUb3RhbCwgd2luZG93U2l6ZV0pO1xuXG4gICAgaWYgKCFzaG93UGFnaW5hdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBpZD1cInBhZ2luYXRpb25cIlxuICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgIFwicGFnaW5hdGlvbiBncmlkIGdyaWQtY29scy1bMWZyX2F1dG9fMWZyXSBpdGVtcy1jZW50ZXIgZ2FwLTFcIixcbiAgICAgICAgICBjbGFzc05hbWUgfHwgXCJcIlxuICAgICAgICApfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuSnVtcFRvU3RhcnQgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHM/LmZpcnN0fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2UoMSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTguNzUgNC41LTcuNSA3LjUgNy41IDcuNW0tNi0xNUw1LjI1IDEybDcuNSA3LjVcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvUHJldiAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ucHJldn1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlKHNhZmVDdXJyZW50IC0gMSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTUuNzUgMTkuNSA4LjI1IDEybDcuNS03LjVcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgbWluLXctMCBmbGV4LW5vd3JhcFwiPlxuICAgICAgICAgIHtwYWdlTnVtYmVycy5tYXAoKHBhZ2UpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gcGFnZSA9PT0gc2FmZUN1cnJlbnQ7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAga2V5PXtgcGFnZS0ke3BhZ2V9YH1cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICBcIm1pbi13LVsyNnB4XSBweC0yIHB5LTAuNSByb3VuZGVkLW1kIGJvcmRlciB0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIHRyYW5zaXRpb25cIixcbiAgICAgICAgICAgICAgICAgIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgID8gXCJiZy1wcmltYXJ5IGJvcmRlci1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0zMDAgdGV4dC1zbGF0ZS03MDAgaG92ZXI6Ym9yZGVyLXByaW1hcnkgaG92ZXI6dGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2UocGFnZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtwYWdlfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuR29OZXh0ICYmIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5uZXh0fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm04LjI1IDQuNSA3LjUgNy41LTcuNSA3LjVcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvTmV4dCAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ubGFzdH1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlKHNhZmVUb3RhbCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNS4yNSA0LjUgNy41IDcuNS03LjUgNy41bTYtMTUgNy41IDcuNS03LjUgNy41XCIgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbik7XG5cbkNvbXBhY3RQYWdpbmF0aW9uLmRpc3BsYXlOYW1lID0gXCJDb21wYWN0UGFnaW5hdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBDb21wYWN0UGFnaW5hdGlvbjtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgYWN0aXZlPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIHR5cGU/OiBcImJ1dHRvblwiIHwgXCJzdWJtaXRcIiB8IFwicmVzZXRcIjtcbn07XG5cbi8vIER1bWIgZmlsdGVyIGJ1dHRvbiB3aXRoIHN0YW5kYXJkaXplZCBzdHlsaW5nLlxuY29uc3QgRmlsdGVyQnV0dG9uID0gKHtcbiAgbGFiZWwsXG4gIGFjdGl2ZSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBvbkNsaWNrLFxuICBjbGFzc05hbWUsXG4gIGFyaWFMYWJlbCxcbiAgdHlwZSA9IFwiYnV0dG9uXCJcbn06IFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT17dHlwZX1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImluZC1maWx0ZXItYnRuXCIsIGFjdGl2ZSA/IFwiaW5kLWZpbHRlci1idG4tLWFjdGl2ZVwiIDogXCJcIiwgY2xhc3NOYW1lKX1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XG4gICAgPlxuICAgICAge2xhYmVsfVxuICAgIDwvYnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRmlsdGVyQnV0dG9uO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGFyaWFMYWJlbD86IHN0cmluZztcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xufTtcblxuLy8gRHVtYiBhY3Rpb24gYnV0dG9uIHdpdGggc3RhbmRhcmRpemVkIHN0eWxpbmcuXG5jb25zdCBBY3Rpb25CdXR0b24gPSAoe1xuICBsYWJlbCxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBhcmlhTGFiZWwsXG4gIHR5cGUgPSBcImJ1dHRvblwiXG59OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9e3R5cGV9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmQtYWN0aW9uLWJ0blwiLCBjbGFzc05hbWUpfVxuICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbCB8fCBsYWJlbH1cbiAgICA+XG4gICAgICB7bGFiZWx9XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBY3Rpb25CdXR0b247XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciwgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG5leHBvcnQgdHlwZSBIaXN0b3J5QWN0aXZpdHlJdGVtID0ge1xuICBhY3RpdmlkYWRJZD86IHN0cmluZyB8IG51bWJlcjtcbiAgQWN0aXZpZGFkSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xuICBSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcbiAgbmFtZT86IHN0cmluZztcbiAgTmFtZT86IHN0cmluZztcbiAgdHJhbnNEYXRlPzogc3RyaW5nO1xuICBUcmFuc0RhdGU/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBEZXNjcmlwdGlvbj86IHN0cmluZztcbn07XG5cbnR5cGUgSGlzdG9yeVJlc3BvbnNlID0ge1xuICBpdGVtcz86IEhpc3RvcnlBY3Rpdml0eUl0ZW1bXTtcbiAgdG90YWw/OiBudW1iZXI7XG59O1xuXG50eXBlIExvYWRPdmVycmlkZSA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIGFjY291bnROdW0/OiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZUhpc3RvcnlBY3Rpdml0aWVzQXJncyA9IHtcbiAgZnJvbURhdGVWYWx1ZTogc3RyaW5nO1xuICB0b0RhdGVWYWx1ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtVmFsdWU6IHN0cmluZztcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgcmV0cnlEZWxheU1zPzogbnVtYmVyO1xuICBub3JtYWxpemVSYW5nZTogKGZyb206IHN0cmluZywgdG86IHN0cmluZykgPT4geyBmcm9tOiBzdHJpbmc7IHRvOiBzdHJpbmcgfTtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG4gIG9uRGVidWc/OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XG59O1xuXG4vLyBDZW50cmFsaXplcyBoaXN0b3J5IGZldGNoL3JldHJ5IGxvZ2ljIHRvIGtlZXAgcGFnZSBjb21wb25lbnRzIHNtYWxsZXIuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUFjdGl2aXRpZXMgPSAoe1xuICBmcm9tRGF0ZVZhbHVlLFxuICB0b0RhdGVWYWx1ZSxcbiAgYWNjb3VudE51bVZhbHVlLFxuICBwYWdlU2l6ZSxcbiAgcmV0cnlEZWxheU1zID0gNjAwLFxuICBub3JtYWxpemVSYW5nZSxcbiAgb25Gb3JiaWRkZW4sXG4gIG9uRGVidWcsXG59OiBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MpID0+IHtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxIaXN0b3J5QWN0aXZpdHlJdGVtW10+KFtdKTtcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IHJldHJ5T25OZXR3b3JrRXJyb3JSZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBhY3RpdmVBYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYWN0aXZlUmVxdWVzdElkUmVmID0gdXNlUmVmKDApO1xuICBjb25zdCByZXRyeVRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXN0U2lnbmF0dXJlUmVmID0gdXNlUmVmKFwiXCIpO1xuXG4gIGNvbnN0IGNsZWFyUmV0cnlUaW1lciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAocmV0cnlUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQocmV0cnlUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgIHJldHJ5VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgYWJvcnRBY3RpdmVSZXF1ZXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghYWN0aXZlQWJvcnRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJZ25vcmUgYWJvcnQgZXJyb3JzLlxuICAgIH1cbiAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHJlc2V0QWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjbGVhclJldHJ5VGltZXIoKTtcbiAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcbiAgICBzZXRJdGVtcyhbXSk7XG4gICAgc2V0VG90YWwoMCk7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGNsZWFyUmV0cnlUaW1lcl0pO1xuXG4gIGNvbnN0IGxvYWRBY3Rpdml0aWVzID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHtcbiAgICAgIGNvbnN0IGZyb21EYXRlU3RyID0gb3ZlcnJpZGU/LmZyb21EYXRlID8/IGZyb21EYXRlVmFsdWU7XG4gICAgICBjb25zdCB0b0RhdGVTdHIgPSBvdmVycmlkZT8udG9EYXRlID8/IHRvRGF0ZVZhbHVlO1xuICAgICAgY29uc3QgYWNjb3VudE51bVN0ciA9IG92ZXJyaWRlPy5hY2NvdW50TnVtID8/IGFjY291bnROdW1WYWx1ZTtcblxuICAgICAgaWYgKCFmcm9tRGF0ZVN0ciB8fCAhdG9EYXRlU3RyKSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIGNsZWFyUmV0cnlUaW1lcigpO1xuXG4gICAgICBjb25zdCByZXF1ZXN0SWQgPSArK2FjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50O1xuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG5cbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVJhbmdlKGZyb21EYXRlU3RyLCB0b0RhdGVTdHIpO1xuICAgICAgY29uc3QgZmlsdGVyU2lnbmF0dXJlID0gYCR7bm9ybWFsaXplZC5mcm9tfXwke25vcm1hbGl6ZWQudG99fCR7YWNjb3VudE51bVN0cn18JHtwYWdlfWA7XG4gICAgICBsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgPSBmaWx0ZXJTaWduYXR1cmU7XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgIHNldFRvdGFsKDApO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuXG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICBmcm9tRGF0ZTogbm9ybWFsaXplZC5mcm9tLFxuICAgICAgICB0b0RhdGU6IG5vcm1hbGl6ZWQudG8sXG4gICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1TdHIsXG4gICAgICB9O1xuXG4gICAgICBvbkRlYnVnPy4oXCJsb2FkQWN0aXZpdGllczpyZXF1ZXN0XCIsIHsgcGFnZSwgcGFnZVNpemUsIHBheWxvYWQgfSk7XG5cbiAgICAgIGxldCBkYXRhOiBIaXN0b3J5UmVzcG9uc2U7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gYXdhaXQgZmV0Y2hKc29uPEhpc3RvcnlSZXNwb25zZT4oYC9IaXN0b3JpYWwvR2V0QWN0aXZpdGllcz9wYWdlPSR7cGFnZX0mcGFnZVNpemU9JHtwYWdlU2l6ZX1gLCB7XG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgICBpZiAoZXJyPy5uYW1lID09PSBcIkFib3J0RXJyb3JcIikge1xuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVyci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc05ldHdvcmtFcnJvciA9ICEoZXJyIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikgfHwgdHlwZW9mIGVyci5zdGF0dXMgIT09IFwibnVtYmVyXCI7XG4gICAgICAgIGlmIChpc05ldHdvcmtFcnJvciAmJiByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICByZXRyeVRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gZmlsdGVyU2lnbmF0dXJlKSByZXR1cm47XG4gICAgICAgICAgICBsb2FkQWN0aXZpdGllcyhwYWdlLCB7XG4gICAgICAgICAgICAgIGZyb21EYXRlOiBmcm9tRGF0ZVN0cixcbiAgICAgICAgICAgICAgdG9EYXRlOiB0b0RhdGVTdHIsXG4gICAgICAgICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1TdHIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCByZXRyeURlbGF5TXMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyPy5tZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIk5vIHNlIHB1ZG8gY29uZWN0YXIgY29uIGVsIHNlcnZpZG9yIChyZWQpLlwiKSk7XG4gICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgIG9uRGVidWc/LihcImxvYWRBY3Rpdml0aWVzOnJlc3BvbnNlXCIsIHtcbiAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgIHRvdGFsOiBkYXRhPy50b3RhbCA/PyAwLFxuICAgICAgICBjb3VudDogQXJyYXkuaXNBcnJheShkYXRhPy5pdGVtcykgPyBkYXRhLml0ZW1zLmxlbmd0aCA6IDAsXG4gICAgICB9KTtcblxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEl0ZW1zKGRhdGEuaXRlbXMgfHwgW10pO1xuICAgICAgc2V0VG90YWwoZGF0YS50b3RhbCB8fCAoZGF0YS5pdGVtcyB8fCBbXSkubGVuZ3RoKTtcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH0sXG4gICAgW1xuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0LFxuICAgICAgYWNjb3VudE51bVZhbHVlLFxuICAgICAgY2xlYXJSZXRyeVRpbWVyLFxuICAgICAgZnJvbURhdGVWYWx1ZSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgICAgb25EZWJ1ZyxcbiAgICAgIG9uRm9yYmlkZGVuLFxuICAgICAgcGFnZVNpemUsXG4gICAgICByZXRyeURlbGF5TXMsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICBdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJSZXRyeVRpbWVyKCk7XG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcbiAgICB9O1xuICB9LCBbYWJvcnRBY3RpdmVSZXF1ZXN0LCBjbGVhclJldHJ5VGltZXJdKTtcblxuICByZXR1cm4ge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgcmVzZXRBY3Rpdml0aWVzLFxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gICAgbGFzdFNpZ25hdHVyZVJlZixcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEhJU1RPUllfRklMVEVSX0tFWSwgSElTVE9SWV9SRVRVUk5fRkxBR19LRVkgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7XG4gIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcbiAgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxuICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxufSBmcm9tIFwiLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xuXG5leHBvcnQgdHlwZSBIaXN0b3J5Q2FjaGVkRmlsdGVyID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgcGFnZT86IG51bWJlcjtcbiAgY2xpZW50QWNjb3VudD86IHN0cmluZztcbiAgY2xpZW50VGV4dD86IHN0cmluZztcbn07XG5cbmNvbnN0IEhJU1RPUllfQ0FDSEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcblxuY29uc3Qgbm9ybWFsaXplQ2FjaGVkRmlsdGVyID0gKHZhbHVlOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCk6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xuICByZXR1cm4ge1xuICAgIGZyb21EYXRlOiB2YWx1ZS5mcm9tRGF0ZSB8fCBcIlwiLFxuICAgIHRvRGF0ZTogdmFsdWUudG9EYXRlIHx8IFwiXCIsXG4gICAgcGFnZTogdmFsdWUucGFnZSxcbiAgICBjbGllbnRBY2NvdW50OiB2YWx1ZS5jbGllbnRBY2NvdW50IHx8IFwiXCIsXG4gICAgY2xpZW50VGV4dDogdmFsdWUuY2xpZW50VGV4dCB8fCBcIlwiLFxuICB9O1xufTtcblxuLy8gS2VlcHMgaGlzdG9yeSBmaWx0ZXIgY2FjaGUgcmVhZHMvd3JpdGVzIGluIG9uZSBwbGFjZS5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUgPSAoKSA9PiB7XG4gIGNvbnN0IHJlYWRDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjaygoKTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwgPT4ge1xuICAgIGNvbnN0IHBhcnNlZCA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxIaXN0b3J5Q2FjaGVkRmlsdGVyPihISVNUT1JZX0ZJTFRFUl9LRVkpO1xuICAgIHJldHVybiBub3JtYWxpemVDYWNoZWRGaWx0ZXIocGFyc2VkKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyRmlsdGVyQ2FjaGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX0ZJTFRFUl9LRVkpO1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY29uc3VtZVJldHVybkZsYWcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSk7XG4gICAgaWYgKHJhdyA9PT0gXCIxXCIpIHtcbiAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNhdmVDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjaygoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyKSA9PiB7XG4gICAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KEhJU1RPUllfRklMVEVSX0tFWSwgZmlsdGVyLCBISVNUT1JZX0NBQ0hFX1RUTF9NUyk7XG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSwgXCIxXCIsIEhJU1RPUllfQ0FDSEVfVFRMX01TKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZENhY2hlZEZpbHRlcixcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIHNhdmVDYWNoZWRGaWx0ZXIsXG4gIH07XG59O1xuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBNb3VzZUV2ZW50IGFzIFJlYWN0TW91c2VFdmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBDbGllbnRPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xuXG5leHBvcnQgdHlwZSBRdWlja0ZpbHRlcklkID0gXCJjdXN0b21cIiB8IFwiZGF5cy03XCIgfCBcImRheXMtMzBcIiB8IFwiZGF5cy05MFwiO1xuXG5leHBvcnQgdHlwZSBMb2FkT3ZlcnJpZGUgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgRmlsdGVyTG9hZFJlcXVlc3QgPSB7XG4gIHBhZ2U6IG51bWJlcjtcbiAgb3ZlcnJpZGU6IExvYWRPdmVycmlkZTtcbn07XG5cbnR5cGUgVXNlSGlzdG9yeUZpbHRlcnNTdGF0ZUFyZ3MgPSB7XG4gIGRlZmF1bHRGcm9tRGF0ZTogc3RyaW5nO1xuICBkZWZhdWx0VG9EYXRlOiBzdHJpbmc7XG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbiAgcGFyc2VEYXRlVmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiBEYXRlIHwgbnVsbDtcbiAgcGFyc2VJU086ICh2YWx1ZTogc3RyaW5nKSA9PiBEYXRlIHwgbnVsbDtcbiAgdG9JU086ICh2YWx1ZTogRGF0ZSkgPT4gc3RyaW5nO1xuICBzdGFydE9mRGF5OiAodmFsdWU6IERhdGUpID0+IERhdGU7XG4gIGlzQmVmb3JlOiAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiBib29sZWFuO1xufTtcblxuLy8gRW5jYXBzdWxhdGVzIGhpc3RvcnkgZmlsdGVyIHN0YXRlIGFuZCBkYXRlLXJhbmdlIG9yY2hlc3RyYXRpb24uXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSA9ICh7XG4gIGRlZmF1bHRGcm9tRGF0ZSxcbiAgZGVmYXVsdFRvRGF0ZSxcbiAgbG9nSGlzdG9yeSxcbiAgcGFyc2VEYXRlVmFsdWUsXG4gIHBhcnNlSVNPLFxuICB0b0lTTyxcbiAgc3RhcnRPZkRheSxcbiAgaXNCZWZvcmUsXG59OiBVc2VIaXN0b3J5RmlsdGVyc1N0YXRlQXJncykgPT4ge1xuICBjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFttYW51YWxTdGFydERhdGUsIHNldE1hbnVhbFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFttYW51YWxFbmREYXRlLCBzZXRNYW51YWxFbmREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2hvdmVyRGF0ZSwgc2V0SG92ZXJEYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdID0gdXNlU3RhdGU8XCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiPihcInN0YXJ0XCIpO1xuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRNb250aCgpKTtcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd01hbnVhbFBpY2tlclBhbmVsLCBzZXRTaG93TWFudWFsUGlja2VyUGFuZWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPFF1aWNrRmlsdGVySWQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZTxDbGllbnRPcHRpb24gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2NsaWVudFJlc2V0S2V5LCBzZXRDbGllbnRSZXNldEtleV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxFcnJvciwgc2V0U2hvd01hbnVhbEVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYXNSZXN0b3JlZEZpbHRlclJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGRpZEluaXRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIGNvbnN0IGZyb21EYXRlVmFsdWUgPSB1c2VNZW1vKCgpID0+IChzdGFydERhdGUgPyB0b0lTTyhzdGFydERhdGUpIDogXCJcIiksIFtzdGFydERhdGUsIHRvSVNPXSk7XG4gIGNvbnN0IHRvRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoZW5kRGF0ZSA/IHRvSVNPKGVuZERhdGUpIDogXCJcIiksIFtlbmREYXRlLCB0b0lTT10pO1xuICBjb25zdCBhY2NvdW50TnVtVmFsdWUgPSB1c2VNZW1vKCgpID0+IChzZWxlY3RlZENsaWVudCA/IHNlbGVjdGVkQ2xpZW50LnZhbHVlIDogXCJcIiksIFtzZWxlY3RlZENsaWVudF0pO1xuXG4gIGNvbnN0IHZhbGlkYXRlTWFudWFsUmFuZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSkge1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKHRydWUpO1xuICAgICAgc2V0U2VsZWN0aW5nU3RlcCghc3RhcnREYXRlID8gXCJzdGFydFwiIDogXCJlbmRcIik7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sIFthY3RpdmVRdWlja0ZpbHRlciwgZW5kRGF0ZSwgc3RhcnREYXRlXSk7XG5cbiAgLy8gQXBwbGllcyBhIGRlZmF1bHQgZGF0ZSByYW5nZSBhbmQgcmV0dXJucyB0aGUgbG9hZCBwYXlsb2FkIG5lZWRlZCBieSB0aGUgcGFnZS5cbiAgY29uc3QgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMgPSB1c2VDYWxsYmFjaygoKTogRmlsdGVyTG9hZFJlcXVlc3QgfCBudWxsID0+IHtcbiAgICBpZiAoIWRlZmF1bHRGcm9tRGF0ZSB8fCAhZGVmYXVsdFRvRGF0ZSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qgc3RhcnRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0RnJvbURhdGUpO1xuICAgIGNvbnN0IGVuZFJhdyA9IHBhcnNlRGF0ZVZhbHVlKGRlZmF1bHRUb0RhdGUpO1xuICAgIGlmICghc3RhcnRSYXcgfHwgIWVuZFJhdykgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzdGFydERheSA9IHN0YXJ0T2ZEYXkoc3RhcnRSYXcpO1xuICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kUmF3KTtcblxuICAgIGxldCBzdGFydCA9IHN0YXJ0RGF5O1xuICAgIGxldCBlbmQgPSBlbmREYXk7XG4gICAgaWYgKGlzQmVmb3JlKGVuZCwgc3RhcnQpKSB7XG4gICAgICBjb25zdCBzd2FwID0gc3RhcnQ7XG4gICAgICBzdGFydCA9IGVuZDtcbiAgICAgIGVuZCA9IHN3YXA7XG4gICAgfVxuXG4gICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcbiAgICBzZXRFbmREYXRlKGVuZCk7XG4gICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIHNldEN1cnJlbnRNb250aChzdGFydC5nZXRNb250aCgpKTtcbiAgICBzZXRDdXJyZW50WWVhcihzdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBvdmVycmlkZToge1xuICAgICAgICBmcm9tRGF0ZTogdG9JU08oc3RhcnQpLFxuICAgICAgICB0b0RhdGU6IHRvSVNPKGVuZCksXG4gICAgICAgIGFjY291bnROdW06IFwiXCIsXG4gICAgICB9LFxuICAgIH07XG4gIH0sIFtkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGUsIGlzQmVmb3JlLCBwYXJzZURhdGVWYWx1ZSwgc3RhcnRPZkRheSwgdG9JU09dKTtcblxuICAvLyBSZXNldHMgaGlzdG9yeSBmaWx0ZXJzIGxvY2FsIHN0YXRlIG9ubHkuXG4gIGNvbnN0IHJlc2V0SGlzdG9yeUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0U3RhcnREYXRlKG51bGwpO1xuICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgc2V0TWFudWFsU3RhcnREYXRlKG51bGwpO1xuICAgIHNldE1hbnVhbEVuZERhdGUobnVsbCk7XG4gICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICBzZXRDdXJyZW50TW9udGgobmV3IERhdGUoKS5nZXRNb250aCgpKTtcbiAgICBzZXRDdXJyZW50WWVhcihuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgc2V0Q2xpZW50UmVzZXRLZXkoKHByZXYpID0+IHByZXYgKyAxKTtcbiAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICB9LCBbXSk7XG5cbiAgLy8gQXBwbGllcyBjYWNoZWQgZmlsdGVycyBhbmQgcmV0dXJucyB0aGUgbG9hZCBwYXlsb2FkIG5lZWRlZCBieSB0aGUgcGFnZS5cbiAgY29uc3QgYXBwbHlDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCk6IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XG4gICAgICBpZiAoIWZpbHRlciB8fCAhZmlsdGVyLmZyb21EYXRlIHx8ICFmaWx0ZXIudG9EYXRlKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3Qgc3RhcnQgPSBwYXJzZUlTTyhmaWx0ZXIuZnJvbURhdGUpO1xuICAgICAgY29uc3QgZW5kID0gcGFyc2VJU08oZmlsdGVyLnRvRGF0ZSk7XG4gICAgICBzZXRTdGFydERhdGUoc3RhcnQpO1xuICAgICAgc2V0RW5kRGF0ZShlbmQpO1xuICAgICAgc2V0U2VsZWN0aW5nU3RlcChlbmQgPyBcImRvbmVcIiA6IFwiZW5kXCIpO1xuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0ID8gc3RhcnQuZ2V0TW9udGgoKSA6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gICAgICBzZXRDdXJyZW50WWVhcihzdGFydCA/IHN0YXJ0LmdldEZ1bGxZZWFyKCkgOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcblxuICAgICAgaWYgKGZpbHRlci5jbGllbnRBY2NvdW50KSB7XG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50KHsgdmFsdWU6IGZpbHRlci5jbGllbnRBY2NvdW50LCB0ZXh0OiBmaWx0ZXIuY2xpZW50VGV4dCB8fCBmaWx0ZXIuY2xpZW50QWNjb3VudCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYWdlVmFsID0gTnVtYmVyKGZpbHRlci5wYWdlKTtcbiAgICAgIGNvbnN0IHBhZ2VUb0xvYWQgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVZhbCkgJiYgcGFnZVZhbCA+IDAgPyBwYWdlVmFsIDogMTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFnZTogcGFnZVRvTG9hZCxcbiAgICAgICAgb3ZlcnJpZGU6IHtcbiAgICAgICAgICBmcm9tRGF0ZTogZmlsdGVyLmZyb21EYXRlLFxuICAgICAgICAgIHRvRGF0ZTogZmlsdGVyLnRvRGF0ZSxcbiAgICAgICAgICBhY2NvdW50TnVtOiBmaWx0ZXIuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9LFxuICAgIFtwYXJzZUlTT11cbiAgKTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3QgPSB1c2VDYWxsYmFjayhcbiAgICAoZGF0ZU9iajogRGF0ZSkgPT4ge1xuICAgICAgbG9nSGlzdG9yeShcImhhbmRsZVNlbGVjdFwiLCB7XG4gICAgICAgIGNsaWNrZWQ6IHRvSVNPKGRhdGVPYmopLFxuICAgICAgICBzdGFydDogZnJvbURhdGVWYWx1ZSxcbiAgICAgICAgZW5kOiB0b0RhdGVWYWx1ZSxcbiAgICAgICAgc2VsZWN0aW5nU3RlcCxcbiAgICAgIH0pO1xuXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XG4gICAgICBjb25zdCBoYXNTdGFydCA9ICEhc3RhcnREYXRlO1xuICAgICAgY29uc3QgaGFzRW5kID0gISFlbmREYXRlO1xuXG4gICAgICBpZiAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIikge1xuICAgICAgICBpZiAoIWhhc1N0YXJ0KSB7XG4gICAgICAgICAgc2V0U3RhcnREYXRlKGRhdGVPYmopO1xuICAgICAgICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcbiAgICAgICAgICBzZXRDdXJyZW50TW9udGgoZGF0ZU9iai5nZXRNb250aCgpKTtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcihkYXRlT2JqLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdTdGFydCA9IHN0YXJ0RGF0ZSBhcyBEYXRlO1xuICAgICAgICBsZXQgbmV3RW5kID0gZGF0ZU9iajtcbiAgICAgICAgaWYgKGlzQmVmb3JlKG5ld0VuZCwgbmV3U3RhcnQpKSB7XG4gICAgICAgICAgY29uc3Qgc3dhcCA9IG5ld1N0YXJ0O1xuICAgICAgICAgIG5ld1N0YXJ0ID0gbmV3RW5kO1xuICAgICAgICAgIG5ld0VuZCA9IHN3YXA7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRFbmREYXRlKG5ld0VuZCk7XG4gICAgICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICAgIHNldE1hbnVhbEVuZERhdGUobmV3RW5kKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXdFbmQuZ2V0TW9udGgoKSk7XG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5ld0VuZC5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gZGF0ZU9iajtcbiAgICAgIGlmIChoYXNFbmQgJiYgZW5kRGF0ZSAmJiBpc0JlZm9yZShlbmREYXRlLCBuZXdTdGFydCkpIHtcbiAgICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcbiAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld1N0YXJ0LmdldE1vbnRoKCkpO1xuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXdTdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgaWYgKGhhc0VuZCAmJiBlbmREYXRlKSB7XG4gICAgICAgIHNldEVuZERhdGUoZW5kRGF0ZSk7XG4gICAgICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICAgIHNldE1hbnVhbEVuZERhdGUoZW5kRGF0ZSk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgfVxuXG4gICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICBzZXRDdXJyZW50WWVhcihuZXdTdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICB9LFxuICAgIFtlbmREYXRlLCBmcm9tRGF0ZVZhbHVlLCBpc0JlZm9yZSwgbG9nSGlzdG9yeSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZSwgdG9JU09dXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlQ2xlYXJTdGF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3RNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGxvZ0hpc3RvcnkoXCJjbGVhclJhbmdlXCIpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICB9LFxuICAgIFtsb2dIaXN0b3J5LCByZXNldEhpc3RvcnlGaWx0ZXJzXVxuICApO1xuXG4gIGNvbnN0IG9wZW5Qb3BvdmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJvcGVuUG9wb3ZlclwiLCB7IHNlY3Rpb24sIHN0YXJ0OiBmcm9tRGF0ZVZhbHVlLCBlbmQ6IHRvRGF0ZVZhbHVlLCBzZWxlY3RpbmdTdGVwIH0pO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xuXG4gICAgICBpZiAoc2VjdGlvbiA9PT0gXCJlbmRcIiAmJiAhc3RhcnREYXRlKSB7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc2VjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICB9LFxuICAgIFtmcm9tRGF0ZVZhbHVlLCBsb2dIaXN0b3J5LCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUFjdGl2YXRvcktleURvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wZW5Qb3BvdmVyKFwic3RhcnRcIik7XG4gICAgfSxcbiAgICBbb3BlblBvcG92ZXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlU2VjdGlvbktleURvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+LCBzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgb3BlblBvcG92ZXIoc2VjdGlvbik7XG4gICAgfSxcbiAgICBbb3BlblBvcG92ZXJdXG4gICk7XG5cbiAgY29uc3QgYXBwbHlRdWlja1JhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKGZpbHRlcklkOiBRdWlja0ZpbHRlcklkLCBzdGFydDogRGF0ZSwgZW5kOiBEYXRlKSA9PiB7XG4gICAgICBjb25zdCBzdGFydERheSA9IHN0YXJ0T2ZEYXkoc3RhcnQpO1xuICAgICAgY29uc3QgZW5kRGF5ID0gc3RhcnRPZkRheShlbmQpO1xuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0RGF5KTtcbiAgICAgIHNldEVuZERhdGUoZW5kRGF5KTtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0RGF5LmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIoc3RhcnREYXkuZ2V0RnVsbFllYXIoKSk7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKGZpbHRlcklkKTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgfSxcbiAgICBbc3RhcnRPZkRheV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVRdWlja0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCkgPT4ge1xuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgaWYgKHNob3dNYW51YWxQaWNrZXJQYW5lbCkge1xuICAgICAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0U3RhcnQgPSBtYW51YWxTdGFydERhdGUgPyBuZXcgRGF0ZShtYW51YWxTdGFydERhdGUpIDogbnVsbDtcbiAgICAgICAgY29uc3QgbmV4dEVuZCA9IG1hbnVhbEVuZERhdGUgPyBuZXcgRGF0ZShtYW51YWxFbmREYXRlKSA6IG51bGw7XG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXh0U3RhcnQpO1xuICAgICAgICBzZXRFbmREYXRlKG5leHRFbmQpO1xuXG4gICAgICAgIGlmIChuZXh0U3RhcnQpIHtcbiAgICAgICAgICBzZXRDdXJyZW50TW9udGgobmV4dFN0YXJ0LmdldE1vbnRoKCkpO1xuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKG5leHRTdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0U3RhcnQgJiYgbmV4dEVuZCkge1xuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChuZXh0U3RhcnQgJiYgIW5leHRFbmQgPyBcImVuZFwiIDogXCJzdGFydFwiKTtcbiAgICAgICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDYpO1xuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy05MFwiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FwcGx5UXVpY2tSYW5nZSwgbWFudWFsRW5kRGF0ZSwgbWFudWFsU3RhcnREYXRlLCBzaG93TWFudWFsUGlja2VyUGFuZWwsIHN0YXJ0T2ZEYXldXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpZW50U2VsZWN0ZWQgPSB1c2VDYWxsYmFjaygoY2xpZW50OiBDbGllbnRPcHRpb24gfCBudWxsKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQoY2xpZW50KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgc3RhcnREYXRlLFxuICAgIGVuZERhdGUsXG4gICAgbWFudWFsU3RhcnREYXRlLFxuICAgIG1hbnVhbEVuZERhdGUsXG4gICAgaG92ZXJEYXRlLFxuICAgIHNlbGVjdGluZ1N0ZXAsXG4gICAgY3VycmVudE1vbnRoLFxuICAgIGN1cnJlbnRZZWFyLFxuICAgIGlzT3BlbixcbiAgICBzaG93TWFudWFsUGlja2VyUGFuZWwsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgY2xpZW50UmVzZXRLZXksXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgc2hvd01hbnVhbEVycm9yLFxuICAgIGZyb21EYXRlVmFsdWUsXG4gICAgdG9EYXRlVmFsdWUsXG4gICAgYWNjb3VudE51bVZhbHVlLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXG4gICAgc2V0U3RhcnREYXRlLFxuICAgIHNldEVuZERhdGUsXG4gICAgc2V0TWFudWFsU3RhcnREYXRlLFxuICAgIHNldE1hbnVhbEVuZERhdGUsXG4gICAgc2V0SG92ZXJEYXRlLFxuICAgIHNldFNlbGVjdGluZ1N0ZXAsXG4gICAgc2V0Q3VycmVudE1vbnRoLFxuICAgIHNldEN1cnJlbnRZZWFyLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwsXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXG4gICAgc2V0Q2xpZW50UmVzZXRLZXksXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgc2V0U2hvd01hbnVhbEVycm9yLFxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBoYW5kbGVTZWxlY3QsXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcbiAgICBvcGVuUG9wb3ZlcixcbiAgICBoYW5kbGVBY3RpdmF0b3JLZXlEb3duLFxuICAgIGhhbmRsZVNlY3Rpb25LZXlEb3duLFxuICAgIGhhbmRsZVF1aWNrRmlsdGVyLFxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxuICB9O1xufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGlCQUF5RTs7O0FDQXpFLElBQUFDLGdCQUEyQzs7O0FDQTFDLG1CQUF5QztBQUcxQyxJQUFNLHlCQUF5QjtBQUMvQixJQUFNLDJCQUEyQjtBQUNqQyxJQUFNLG9CQUFvQjtBQUMxQixJQUFNLG1CQUFtQjtBQUN6QixJQUFNLFdBQVc7QUFDakIsSUFBTSxZQUFZO0FBQ2xCLElBQU0sY0FBYztBQUNwQixJQUFNLGVBQWUsQ0FBQywwQkFBMEIsMEJBQTBCLHdCQUF3QjtBQXFCbEcsSUFBTSxvQkFBb0IsQ0FBQyxPQUFlLGtCQUEyQjtBQUNuRSxRQUFNLE1BQU07QUFDWixRQUFNLE1BQU07QUFDWixRQUFNLFdBQVc7QUFDakIsUUFBTSxTQUFTLE9BQU8sU0FBUyxPQUFPLEtBQUssR0FBRyxFQUFFO0FBRWhELE1BQUksVUFBVSxPQUFPLGNBQWUsUUFBTztBQUMzQyxNQUFJLFVBQVUsSUFBSyxRQUFPLE1BQU07QUFDaEMsU0FBTyxTQUFTO0FBQ2xCO0FBR0EsSUFBTSxRQUFOLE1BQVk7QUFBQSxFQXNCVixZQUFZLFFBQTJCLFNBQW1DLEdBQVcsR0FBVyxPQUFlLE9BQWUsT0FBZTtBQUMzSSxTQUFLLFFBQVEsT0FBTztBQUNwQixTQUFLLFNBQVMsT0FBTztBQUNyQixTQUFLLE1BQU07QUFDWCxTQUFLLElBQUk7QUFDVCxTQUFLLElBQUk7QUFDVCxTQUFLLFFBQVE7QUFDYixTQUFLLFFBQVEsS0FBSyxlQUFlLEtBQUssR0FBRyxJQUFJO0FBQzdDLFNBQUssT0FBTztBQUNaLFNBQUssV0FBVyxLQUFLLE9BQU8sSUFBSSxNQUFNO0FBQ3RDLFNBQUssVUFBVTtBQUNmLFNBQUssaUJBQWlCO0FBQ3RCLFNBQUssVUFBVSxLQUFLLGVBQWUsS0FBSyxTQUFTLEtBQUssY0FBYztBQUNwRSxTQUFLLFFBQVE7QUFDYixTQUFLLFVBQVU7QUFDZixTQUFLLGNBQWMsS0FBSyxPQUFPLElBQUksS0FBSyxLQUFLLFFBQVEsS0FBSyxVQUFVO0FBQ3BFLFNBQUssU0FBUztBQUNkLFNBQUssWUFBWTtBQUNqQixTQUFLLFlBQVk7QUFDakIsU0FBSyxRQUFRLEtBQUssT0FBTyxJQUFJLEtBQUssS0FBSztBQUN2QyxTQUFLLFlBQVksS0FBSyxJQUFJLEdBQUcsS0FBSyxTQUFTLE1BQU0sS0FBSyxPQUFPLElBQUksSUFBSTtBQUFBLEVBQ3ZFO0FBQUE7QUFBQSxFQUdBLGVBQWUsS0FBYSxLQUFhO0FBQ3ZDLFdBQU8sS0FBSyxPQUFPLEtBQUssTUFBTSxPQUFPO0FBQUEsRUFDdkM7QUFBQTtBQUFBLEVBR0EsT0FBTztBQUNMLFVBQU0sZUFBZSxLQUFLLGlCQUFpQixNQUFNLEtBQUssT0FBTztBQUM3RCxTQUFLLElBQUksWUFBWSxLQUFLO0FBQzFCLFNBQUssSUFBSSxTQUFTLEtBQUssSUFBSSxjQUFjLEtBQUssSUFBSSxjQUFjLEtBQUssTUFBTSxLQUFLLElBQUk7QUFBQSxFQUN0RjtBQUFBO0FBQUEsRUFHQSxTQUFTO0FBQ1AsU0FBSyxTQUFTO0FBQ2QsUUFBSSxLQUFLLFdBQVcsS0FBSyxPQUFPO0FBQzlCLFdBQUssV0FBVyxLQUFLO0FBQ3JCO0FBQUEsSUFDRjtBQUNBLFFBQUksS0FBSyxRQUFRLEtBQUssU0FBUztBQUM3QixXQUFLLFlBQVk7QUFBQSxJQUNuQjtBQUNBLFFBQUksS0FBSyxXQUFXO0FBQ2xCLFdBQUssUUFBUTtBQUFBLElBQ2YsT0FBTztBQUNMLFdBQUssUUFBUSxLQUFLO0FBQUEsSUFDcEI7QUFDQSxTQUFLLEtBQUs7QUFBQSxFQUNaO0FBQUE7QUFBQSxFQUdBLFlBQVk7QUFDVixTQUFLLFlBQVk7QUFDakIsU0FBSyxVQUFVO0FBQ2YsUUFBSSxLQUFLLFFBQVEsR0FBRztBQUNsQixXQUFLLFNBQVM7QUFDZDtBQUFBLElBQ0Y7QUFDQSxTQUFLLFFBQVE7QUFDYixTQUFLLEtBQUs7QUFBQSxFQUNaO0FBQUE7QUFBQSxFQUdBLFVBQVU7QUFDUixRQUFJLENBQUMsS0FBSyxVQUFXO0FBQ3JCLFNBQUssU0FBUyxLQUFLO0FBQ25CLFVBQU0sT0FBTyxLQUFLLFVBQVUsS0FBSyxXQUFXO0FBQzVDLFNBQUssT0FBTyxLQUFLLFVBQVUsTUFBTSxNQUFNLEtBQUssSUFBSSxLQUFLLEtBQUs7QUFBQSxFQUM1RDtBQUNGO0FBR0EsSUFBTSxvQkFBb0IsQ0FBQyxXQUF3QjtBQUNqRCxNQUFJLENBQUMsT0FBUSxRQUFPO0FBQ3BCLFFBQU0sU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUM5QyxTQUFPLFlBQVk7QUFDbkIsU0FBTyxZQUFZLE1BQU07QUFFekIsUUFBTSxNQUFNLE9BQU8sV0FBVyxJQUFJO0FBQ2xDLE1BQUksQ0FBQyxLQUFLO0FBQ1IsV0FBTyxPQUFPO0FBQ2QsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGdCQUFnQixPQUFPLGNBQWMsT0FBTyxXQUFXLGtDQUFrQyxFQUFFO0FBQ2pHLFFBQU0sUUFBb0I7QUFBQSxJQUN4QjtBQUFBLElBQ0E7QUFBQSxJQUNBLFFBQVEsQ0FBQztBQUFBLElBQ1QsUUFBUTtBQUFBLElBQ1IsVUFBVSxZQUFZLElBQUk7QUFBQSxJQUMxQjtBQUFBLElBQ0EsT0FBTztBQUFBLElBQ1AsUUFBUTtBQUFBLEVBQ1Y7QUFFQSxRQUFNLGFBQWEsTUFBTTtBQUN2QixVQUFNLE9BQU8sT0FBTyxzQkFBc0I7QUFDMUMsVUFBTSxRQUFRLEtBQUssSUFBSSxHQUFHLEtBQUssTUFBTSxLQUFLLEtBQUssQ0FBQztBQUNoRCxVQUFNLFNBQVMsS0FBSyxJQUFJLEdBQUcsS0FBSyxNQUFNLEtBQUssTUFBTSxDQUFDO0FBQ2xELFFBQUksQ0FBQyxTQUFTLENBQUMsT0FBUTtBQUV2QixVQUFNLFFBQVE7QUFDZCxVQUFNLFNBQVM7QUFDZixXQUFPLFFBQVE7QUFDZixXQUFPLFNBQVM7QUFDaEIsV0FBTyxNQUFNLFFBQVEsR0FBRyxLQUFLO0FBQzdCLFdBQU8sTUFBTSxTQUFTLEdBQUcsTUFBTTtBQUUvQixVQUFNLE1BQU0sS0FBSyxJQUFJLEdBQUcsS0FBSyxNQUFNLFNBQVMsQ0FBQztBQUM3QyxVQUFNLFFBQVEsa0JBQWtCLGFBQWEsYUFBYTtBQUMxRCxVQUFNLFNBQWtCLENBQUM7QUFFekIsYUFBUyxJQUFJLEdBQUcsSUFBSSxPQUFPLEtBQUssS0FBSztBQUNuQyxlQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsS0FBSyxLQUFLO0FBQ3BDLGNBQU0sUUFBUSxhQUFhLEtBQUssTUFBTSxLQUFLLE9BQU8sSUFBSSxhQUFhLE1BQU0sQ0FBQztBQUMxRSxjQUFNLEtBQUssSUFBSSxRQUFRO0FBQ3ZCLGNBQU0sS0FBSyxJQUFJLFNBQVM7QUFDeEIsY0FBTSxXQUFXLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxFQUFFO0FBQzVDLGNBQU0sUUFBUSxnQkFBZ0IsSUFBSSxXQUFXO0FBQzdDLGVBQU8sS0FBSyxJQUFJLE1BQU0sUUFBUSxLQUFLLEdBQUcsR0FBRyxPQUFPLE9BQU8sS0FBSyxDQUFDO0FBQUEsTUFDL0Q7QUFBQSxJQUNGO0FBRUEsVUFBTSxTQUFTO0FBQUEsRUFDakI7QUFFQSxRQUFNLFlBQVksQ0FBQyxXQUFtQztBQUNwRCxVQUFNLFNBQVMsc0JBQXNCLE1BQU0sVUFBVSxNQUFNLENBQUM7QUFDNUQsVUFBTSxVQUFVLFlBQVksSUFBSTtBQUNoQyxVQUFNLGFBQWEsVUFBVSxNQUFNO0FBQ25DLFVBQU0sZUFBZSxNQUFPO0FBRTVCLFFBQUksYUFBYSxhQUFjO0FBQy9CLFVBQU0sV0FBVyxVQUFXLGFBQWE7QUFFekMsUUFBSSxVQUFVLEdBQUcsR0FBRyxNQUFNLE9BQU8sTUFBTSxNQUFNO0FBRTdDLFFBQUksVUFBVTtBQUNkLGFBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxPQUFPLFFBQVEsS0FBSyxHQUFHO0FBQy9DLFlBQU0sUUFBUSxNQUFNLE9BQU8sQ0FBQztBQUM1QixZQUFNLE1BQU0sRUFBRTtBQUNkLFVBQUksQ0FBQyxNQUFNLE9BQVEsV0FBVTtBQUFBLElBQy9CO0FBQ0EsUUFBSSxXQUFXLE1BQU0sUUFBUTtBQUMzQiwyQkFBcUIsTUFBTSxNQUFNO0FBQ2pDLFlBQU0sU0FBUztBQUFBLElBQ2pCO0FBQUEsRUFDRjtBQUVBLFFBQU0sa0JBQWtCLENBQUMsU0FBaUM7QUFDeEQsUUFBSSxDQUFDLE1BQU0sT0FBTyxPQUFRO0FBQzFCLFFBQUksTUFBTSxPQUFRLHNCQUFxQixNQUFNLE1BQU07QUFDbkQsVUFBTSxXQUFXLFlBQVksSUFBSTtBQUNqQyxVQUFNLFNBQVMsc0JBQXNCLE1BQU0sVUFBVSxJQUFJLENBQUM7QUFBQSxFQUM1RDtBQUVBLFFBQU0sVUFBVSxNQUFNLGdCQUFnQixRQUFRO0FBQzlDLFFBQU0sVUFBVSxNQUFNLGdCQUFnQixXQUFXO0FBRWpELFNBQU8saUJBQWlCLGNBQWMsT0FBTztBQUM3QyxTQUFPLGlCQUFpQixjQUFjLE9BQU87QUFFN0MsTUFBSSxLQUE0QjtBQUNoQyxNQUFJLE9BQU8sbUJBQW1CLGFBQWE7QUFDekMsU0FBSyxJQUFJLGVBQWUsVUFBVTtBQUNsQyxPQUFHLFFBQVEsTUFBTTtBQUFBLEVBQ25CO0FBRUEsYUFBVztBQUVYLFNBQU8sTUFBTTtBQUNYLFdBQU8sb0JBQW9CLGNBQWMsT0FBTztBQUNoRCxXQUFPLG9CQUFvQixjQUFjLE9BQU87QUFDaEQsUUFBSSxNQUFNLE9BQVEsc0JBQXFCLE1BQU0sTUFBTTtBQUNuRCxRQUFJLEdBQUksSUFBRyxXQUFXO0FBQ3RCLFdBQU8sT0FBTztBQUFBLEVBQ2hCO0FBQ0Y7QUFHQSxJQUFNLGdCQUFnQixDQUFDLElBQWlCLFVBQWtCLGNBQXVCO0FBQy9FLE1BQUksQ0FBQyxNQUFNLENBQUMsU0FBVSxRQUFPO0FBQzdCLE1BQUksYUFBYSxHQUFHLGlCQUFpQixFQUFHLFFBQU87QUFDL0MsTUFBSSxDQUFDLGFBQWEsR0FBRyxnQkFBZ0IsRUFBRyxRQUFPO0FBRS9DLE1BQUksV0FBVztBQUNiLFVBQU0sV0FBVyxPQUFPLGlCQUFpQixFQUFFO0FBQzNDLFFBQUksYUFBYSxPQUFPLFdBQVcsU0FBUyxVQUFVO0FBQ3RELFFBQUksQ0FBQyxPQUFPLFNBQVMsVUFBVSxHQUFHO0FBQ2hDLFlBQU0sT0FBTyxHQUFHLHNCQUFzQjtBQUN0QyxtQkFBYSxLQUFLLFNBQVMsSUFBSSxLQUFLLFNBQVMsSUFBSTtBQUFBLElBQ25EO0FBQ0EsUUFBSSxhQUFhLEdBQUc7QUFDbEIsU0FBRyxNQUFNLFlBQVksR0FBRyxLQUFLLE1BQU0sYUFBYSxDQUFDLENBQUM7QUFDbEQsU0FBRyxNQUFNLFdBQVc7QUFBQSxJQUN0QjtBQUFBLEVBQ0Y7QUFFQSxLQUFHLGNBQWM7QUFFakIsUUFBTSxnQkFBZ0IsTUFDcEIsWUFDSSxHQUFHLGVBQWUsR0FBRyxlQUFlLElBQ3BDLEdBQUcsY0FBYyxHQUFHLGNBQWM7QUFHeEMsTUFBSSxDQUFDLGNBQWMsR0FBRztBQUNwQixPQUFHLFFBQVEsVUFBVTtBQUNyQixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksTUFBTTtBQUNWLE1BQUksT0FBTyxTQUFTO0FBQ3BCLE1BQUksT0FBTztBQUVYLFNBQU8sT0FBTyxNQUFNO0FBQ2xCLFVBQU0sTUFBTSxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDdkMsVUFBTSxZQUFZLEdBQUcsU0FBUyxNQUFNLEdBQUcsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsUUFBUTtBQUM3RSxPQUFHLGNBQWM7QUFDakIsUUFBSSxjQUFjLEdBQUc7QUFDbkIsYUFBTyxNQUFNO0FBQUEsSUFDZixPQUFPO0FBQ0wsYUFBTztBQUNQLFlBQU0sTUFBTTtBQUFBLElBQ2Q7QUFBQSxFQUNGO0FBRUEsS0FBRyxjQUFjLEdBQUcsU0FBUyxNQUFNLEdBQUcsS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLEdBQUcsUUFBUTtBQUM3RSxLQUFHLFFBQVEsVUFBVTtBQUNyQixTQUFPO0FBQ1Q7QUFHTyxJQUFNLHlCQUF5QixDQUFDO0FBQUEsRUFDckM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFrQztBQUNoQyxRQUFNLGlCQUFhLHFCQUE4QixJQUFJO0FBQ3JELFFBQU0sdUJBQW1CLHFCQUEyQixJQUFJO0FBQ3hELFFBQU0sMkJBQXVCLHFCQUFPLEtBQUs7QUFHekMsOEJBQVUsTUFBTTtBQUNkLFFBQUksV0FBVyxRQUFTO0FBQ3hCLFFBQUksVUFBVSxTQUFTLGVBQWUsaUJBQWlCO0FBQ3ZELFFBQUksQ0FBQyxTQUFTO0FBQ1osZ0JBQVUsU0FBUyxjQUFjLEtBQUs7QUFDdEMsY0FBUSxLQUFLO0FBQ2IsY0FBUSxZQUFZO0FBQ3BCLGVBQVMsS0FBSyxZQUFZLE9BQU87QUFBQSxJQUNuQztBQUNBLGVBQVcsVUFBVTtBQUFBLEVBQ3ZCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsOEJBQVUsTUFBTTtBQUNkLFVBQU0sWUFBWSxhQUFhO0FBQy9CLFVBQU0sWUFBWSxXQUFXO0FBQzdCLFFBQUksQ0FBQyxhQUFhLENBQUMsVUFBVztBQUU5QixVQUFNLFdBQThCLENBQUM7QUFHckMsUUFBSSxDQUFDLHFCQUFxQixTQUFTO0FBQ2pDLDJCQUFxQixVQUFVO0FBQy9CLFlBQU0sZ0JBQWdCLENBQUMsVUFBd0I7QUFDN0MsWUFBSSxDQUFDLFVBQVUsVUFBVSxTQUFTLFNBQVMsRUFBRztBQUM5QyxjQUFNLFNBQVMsaUJBQWlCO0FBQ2hDLFlBQUksVUFBVSxPQUFPLFNBQVMsTUFBTSxNQUFjLEVBQUc7QUFDckQsa0JBQVUsVUFBVSxPQUFPLFNBQVM7QUFDcEMseUJBQWlCLFVBQVU7QUFBQSxNQUM3QjtBQUNBLFlBQU0sWUFBWSxDQUFDLFVBQXlCO0FBQzFDLFlBQUksTUFBTSxRQUFRLFVBQVU7QUFDMUIsb0JBQVUsVUFBVSxPQUFPLFNBQVM7QUFDcEMsMkJBQWlCLFVBQVU7QUFBQSxRQUM3QjtBQUFBLE1BQ0Y7QUFDQSxlQUFTLGlCQUFpQixlQUFlLGVBQWUsSUFBSTtBQUM1RCxlQUFTLGlCQUFpQixXQUFXLFNBQVM7QUFDOUMsZUFBUyxLQUFLLE1BQU07QUFDbEIsaUJBQVMsb0JBQW9CLGVBQWUsZUFBZSxJQUFJO0FBQy9ELGlCQUFTLG9CQUFvQixXQUFXLFNBQVM7QUFDakQsNkJBQXFCLFVBQVU7QUFBQSxNQUNqQyxDQUFDO0FBQUEsSUFDSDtBQUdBLFVBQU0sY0FBYyxDQUFDLE1BQWMsV0FBeUI7QUFDMUQsZ0JBQVUsY0FBYztBQUN4QixnQkFBVSxVQUFVLElBQUksU0FBUztBQUNqQyx1QkFBaUIsVUFBVSxVQUFVO0FBRXJDLFlBQU0sVUFBVSxLQUFLLE1BQU0sT0FBTyxhQUFhLENBQUM7QUFDaEQsZ0JBQVUsTUFBTSxPQUFPLEdBQUcsT0FBTztBQUVqQyxZQUFNLFNBQVM7QUFDZixnQkFBVSxNQUFNLFlBQVksR0FBRyxLQUFLLE1BQU0sT0FBTyxjQUFjLHdCQUF3QixDQUFDO0FBQ3hGLGdCQUFVLE1BQU0sWUFBWTtBQUU1QixVQUFJLFdBQVc7QUFDZixnQkFBVSxNQUFNLFdBQVcsR0FBRyxRQUFRO0FBRXRDLFVBQUksT0FBTyxVQUFVLHNCQUFzQjtBQUMzQyxZQUFNLFlBQVksT0FBTyxjQUFjO0FBQ3ZDLGFBQU8sS0FBSyxTQUFTLGFBQWEsV0FBVyxrQkFBa0I7QUFDN0Qsb0JBQVk7QUFDWixrQkFBVSxNQUFNLFdBQVcsR0FBRyxRQUFRO0FBQ3RDLGVBQU8sVUFBVSxzQkFBc0I7QUFBQSxNQUN6QztBQUVBLFlBQU0sVUFBVSxLQUFLLE9BQU8sT0FBTyxjQUFjLEtBQUssVUFBVSxDQUFDO0FBQ2pFLFVBQUksTUFBTSxPQUFPLFNBQVMsT0FBTyxJQUFJLFVBQVU7QUFDL0MsWUFBTSxTQUFTO0FBQ2YsWUFBTSxTQUFTLEtBQUssSUFBSSxRQUFRLE9BQU8sY0FBYyxLQUFLLFNBQVMsTUFBTTtBQUN6RSxVQUFJLE1BQU0sT0FBUSxPQUFNO0FBQ3hCLFVBQUksTUFBTSxPQUFRLE9BQU07QUFDeEIsZ0JBQVUsTUFBTSxNQUFNLEdBQUcsS0FBSyxNQUFNLEdBQUcsQ0FBQztBQUFBLElBQzFDO0FBR0EsVUFBTSxjQUFjLE1BQU07QUFDeEIsZ0JBQVUsVUFBVSxPQUFPLFNBQVM7QUFDcEMsdUJBQWlCLFVBQVU7QUFBQSxJQUM3QjtBQUdBLFVBQU0sZ0JBQWdCLENBQUMsT0FBb0I7QUFDekMsVUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLEdBQUcsUUFBUSxTQUFVLFFBQU87QUFDaEQsVUFBSSxHQUFHLFFBQVEsWUFBWSxJQUFLLFFBQU87QUFDdkMsYUFBTyxHQUFHLGNBQWMsR0FBRyxjQUFjLEtBQUssR0FBRyxlQUFlLEdBQUcsZUFBZTtBQUFBLElBQ3BGO0FBRUEsVUFBTSx1QkFBdUIsQ0FBQyxXQUErQjtBQUMzRCxZQUFNLE9BQU87QUFDYixVQUFJLENBQUMsUUFBUSxPQUFPLEtBQUssWUFBWSxXQUFZLFFBQU87QUFDeEQsWUFBTSxTQUFTLEtBQUssUUFBcUIscUNBQXFDO0FBQzlFLFVBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxTQUFTLE1BQU0sRUFBRyxRQUFPO0FBQ25ELGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSx3QkFBd0IsQ0FBQyxPQUEyQjtBQUN4RCxVQUFJLENBQUMsR0FBSTtBQUNULFlBQU0sT0FBTyxHQUFHLFFBQVEsWUFBWSxHQUFHLGVBQWU7QUFDdEQsVUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsRUFBRztBQUNqQyxrQkFBWSxNQUFNLEVBQUU7QUFBQSxJQUN0QjtBQUVBLFFBQUksa0JBQXNDO0FBQzFDLFFBQUksYUFBNEI7QUFFaEMsVUFBTSxrQkFBa0IsTUFBTTtBQUM1QixVQUFJLGNBQWMsS0FBTTtBQUN4QixhQUFPLGFBQWEsVUFBVTtBQUM5QixtQkFBYTtBQUFBLElBQ2Y7QUFFQSxVQUFNLGNBQWMsQ0FBQyxVQUFzQjtBQUN6QyxZQUFNLFNBQVMscUJBQXFCLE1BQU0sTUFBTTtBQUNoRCxVQUFJLENBQUMsT0FBUTtBQUNiLHdCQUFrQjtBQUNsQiw0QkFBc0IsTUFBTTtBQUFBLElBQzlCO0FBRUEsVUFBTSxhQUFhLENBQUMsVUFBc0I7QUFDeEMsWUFBTSxPQUFPLHFCQUFxQixNQUFNLE1BQU07QUFDOUMsVUFBSSxDQUFDLEtBQU07QUFDWCxZQUFNLEtBQUsscUJBQXFCLE1BQU0sYUFBYTtBQUNuRCxVQUFJLE1BQU0sT0FBTyxLQUFNO0FBQ3ZCLGtCQUFZO0FBQ1osd0JBQWtCO0FBQUEsSUFDcEI7QUFFQSxVQUFNLGNBQWMsTUFBTTtBQUN4QixVQUFJLENBQUMsZ0JBQWlCO0FBQ3RCLFVBQUksQ0FBQyxVQUFVLFVBQVUsU0FBUyxTQUFTLEVBQUc7QUFDOUMsNEJBQXNCLGVBQWU7QUFBQSxJQUN2QztBQUVBLFVBQU0sZUFBZSxDQUFDLFVBQXNCO0FBQzFDLFlBQU0sU0FBUyxxQkFBcUIsTUFBTSxNQUFNO0FBQ2hELFVBQUksQ0FBQyxPQUFRO0FBQ2Isd0JBQWtCO0FBQ2xCLHNCQUFnQjtBQUNoQixtQkFBYSxPQUFPLFdBQVcsTUFBTTtBQUNuQyw4QkFBc0IsTUFBTTtBQUFBLE1BQzlCLEdBQUcsc0JBQXNCO0FBQUEsSUFDM0I7QUFFQSxVQUFNLGNBQWMsTUFBTTtBQUN4QixzQkFBZ0I7QUFDaEIsa0JBQVk7QUFDWix3QkFBa0I7QUFBQSxJQUNwQjtBQUVBLFVBQU0sYUFBYSxNQUFNO0FBQ3ZCLHNCQUFnQjtBQUFBLElBQ2xCO0FBRUEsY0FBVSxpQkFBaUIsYUFBYSxXQUFXO0FBQ25ELGNBQVUsaUJBQWlCLFlBQVksVUFBVTtBQUNqRCxjQUFVLGlCQUFpQixhQUFhLFdBQVc7QUFDbkQsY0FBVSxpQkFBaUIsY0FBYyxjQUFjLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFDeEUsY0FBVSxpQkFBaUIsYUFBYSxhQUFhLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFDdEUsY0FBVSxpQkFBaUIsWUFBWSxZQUFZLEVBQUUsU0FBUyxLQUFLLENBQUM7QUFFcEUsVUFBTSxnQkFBZ0IsQ0FBQyxVQUFpQjtBQUN0QyxVQUFJLENBQUMscUJBQXFCLE1BQU0sTUFBTSxFQUFHO0FBQ3pDLFlBQU0sZUFBZTtBQUFBLElBQ3ZCO0FBQ0EsY0FBVSxpQkFBaUIsZUFBZSxhQUFhO0FBRXZELGFBQVMsS0FBSyxNQUFNO0FBQ2xCLGdCQUFVLG9CQUFvQixhQUFhLFdBQVc7QUFDdEQsZ0JBQVUsb0JBQW9CLFlBQVksVUFBVTtBQUNwRCxnQkFBVSxvQkFBb0IsYUFBYSxXQUFXO0FBQ3RELGdCQUFVLG9CQUFvQixjQUFjLFlBQVk7QUFDeEQsZ0JBQVUsb0JBQW9CLGFBQWEsV0FBVztBQUN0RCxnQkFBVSxvQkFBb0IsWUFBWSxVQUFVO0FBQ3BELGdCQUFVLG9CQUFvQixlQUFlLGFBQWE7QUFDMUQsc0JBQWdCO0FBQUEsSUFDbEIsQ0FBQztBQUVELFFBQUksQ0FBQyxjQUFjO0FBQ2pCLFlBQU0sUUFBUSxVQUFVLGlCQUE4QixnQkFBZ0I7QUFDdEUsWUFBTSxRQUFRLENBQUMsU0FBUztBQUN0QixZQUFJLENBQUMsS0FBSyxVQUFVLFNBQVMsdUJBQXVCLEdBQUc7QUFDckQsZ0JBQU0sZUFBZSxrQkFBa0IsSUFBSTtBQUMzQyxjQUFJLGFBQWMsVUFBUyxLQUFLLFlBQVk7QUFBQSxRQUM5QztBQUFBLE1BQ0YsQ0FBQztBQUVELFlBQU0sVUFBVSxPQUFPLHNCQUFzQixNQUFNO0FBQ2pELGNBQU0sVUFBVSxVQUFVLGlCQUE4QixxQ0FBcUM7QUFDN0YsZ0JBQVEsUUFBUSxDQUFDLE9BQU87QUFDdEIsZ0JBQU0sT0FBTyxHQUFHLFFBQVEsWUFBWSxHQUFHLGVBQWU7QUFDdEQsd0JBQWMsSUFBSSxNQUFNLElBQUk7QUFBQSxRQUM5QixDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUQsZUFBUyxLQUFLLE1BQU0sT0FBTyxxQkFBcUIsT0FBTyxDQUFDO0FBQUEsSUFDMUQ7QUFFQSxXQUFPLE1BQU07QUFDWCxlQUFTLFFBQVEsQ0FBQyxZQUFZLFFBQVEsQ0FBQztBQUFBLElBQ3pDO0FBQUEsRUFDRixHQUFHLENBQUMsY0FBYyxjQUFjLE9BQU8sb0JBQW9CLENBQUM7QUFDOUQ7OztBRHJZSTtBQW5HSixJQUFNLGNBQWM7QUFDcEIsSUFBTSxxQkFBcUI7QUFZM0IsSUFBTSxlQUFlLENBQUMsRUFBRSxPQUFPLFlBQVksY0FBYyxXQUFXLE1BQWE7QUFDL0UsUUFBTSxtQkFBZSxzQkFBOEIsSUFBSTtBQUN2RCxRQUFNLGtCQUFjLHNCQUFzQjtBQUFBLElBQ3hDLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLFFBQVE7QUFBQSxFQUNWLENBQUM7QUFFRCxRQUFNLDJCQUF1QiwyQkFBWSxDQUFDLFdBQStCO0FBQ3ZFLFVBQU0sT0FBTztBQUNiLFFBQUksQ0FBQyxRQUFRLE9BQU8sS0FBSyxZQUFZLFdBQVksUUFBTztBQUN4RCxVQUFNLE9BQU8sS0FBSyxRQUFxQix5Q0FBeUM7QUFDaEYsUUFBSSxDQUFDLEtBQU0sUUFBTztBQUNsQixRQUFJLENBQUMsYUFBYSxTQUFTLFNBQVMsSUFBSSxFQUFHLFFBQU87QUFDbEQsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLG9CQUFnQiwyQkFBWSxNQUFNO0FBQ3RDLGdCQUFZLFFBQVEsU0FBUztBQUM3QixnQkFBWSxRQUFRLFlBQVk7QUFDaEMsZ0JBQVksUUFBUSxRQUFRO0FBQzVCLGdCQUFZLFFBQVEsU0FBUztBQUFBLEVBQy9CLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx3QkFBb0I7QUFBQSxJQUN4QixDQUFDLFVBQThDO0FBQzdDLFVBQUksTUFBTSxnQkFBZ0IsV0FBVyxNQUFNLFdBQVcsRUFBRztBQUN6RCxZQUFNLE9BQU8scUJBQXFCLE1BQU0sTUFBTTtBQUM5QyxVQUFJLENBQUMsS0FBTTtBQUNYLFlBQU0sU0FBUyxLQUFLLFFBQVEsVUFBVTtBQUN0QyxVQUFJLENBQUMsT0FBUTtBQUViLGtCQUFZLFFBQVEsU0FBUztBQUM3QixrQkFBWSxRQUFRLFlBQVksTUFBTTtBQUN0QyxrQkFBWSxRQUFRLFNBQVMsTUFBTTtBQUNuQyxrQkFBWSxRQUFRLFNBQVMsTUFBTTtBQUNuQyxrQkFBWSxRQUFRLFlBQVksS0FBSyxJQUFJO0FBQ3pDLGtCQUFZLFFBQVEsUUFBUTtBQUM1QixrQkFBWSxRQUFRLFNBQVM7QUFBQSxJQUMvQjtBQUFBLElBQ0EsQ0FBQyxvQkFBb0I7QUFBQSxFQUN2QjtBQUVBLFFBQU0sd0JBQW9CLDJCQUFZLENBQUMsVUFBOEM7QUFDbkYsVUFBTSxRQUFRLFlBQVk7QUFDMUIsUUFBSSxDQUFDLE1BQU0sVUFBVSxNQUFNLGNBQWMsTUFBTSxVQUFXO0FBQzFELFVBQU0sS0FBSyxLQUFLLElBQUksTUFBTSxVQUFVLE1BQU0sTUFBTTtBQUNoRCxVQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sVUFBVSxNQUFNLE1BQU07QUFDaEQsUUFBSSxLQUFLLGVBQWUsS0FBSyxhQUFhO0FBQ3hDLFlBQU0sUUFBUTtBQUFBLElBQ2hCO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sc0JBQWtCO0FBQUEsSUFDdEIsQ0FBQyxVQUE4QztBQUM3QyxZQUFNLFFBQVEsWUFBWTtBQUMxQixVQUFJLENBQUMsTUFBTSxVQUFVLE1BQU0sY0FBYyxNQUFNLFVBQVc7QUFDMUQsWUFBTSxTQUFTLE1BQU07QUFDckIsWUFBTSxTQUFTLEtBQUssSUFBSSxJQUFJLE1BQU07QUFDbEMsWUFBTSxZQUFZLENBQUMsTUFBTSxTQUFTLFNBQVM7QUFDM0Msb0JBQWM7QUFDZCxVQUFJLGFBQWEsUUFBUTtBQUN2QixtQkFBVyxNQUFNO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLFlBQVksYUFBYTtBQUFBLEVBQzVCO0FBRUEsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUFDLFVBQW1GO0FBQ2xGLFVBQUksQ0FBQyxxQkFBcUIsTUFBTSxNQUFNLEVBQUc7QUFDekMsWUFBTSxlQUFlO0FBQUEsSUFDdkI7QUFBQSxJQUNBLENBQUMsb0JBQW9CO0FBQUEsRUFDdkI7QUFFQSx5QkFBdUIsRUFBRSxjQUFjLGNBQWMsT0FBTyxxQkFBcUIsQ0FBQztBQUVsRixRQUFNLFdBQVcsTUFBTSxTQUFTO0FBQ2hDLFFBQU0sWUFBWSxDQUFDLGdCQUFnQixDQUFDO0FBRXBDLFFBQU0sVUFBVSxlQUNkLDRDQUFDLFNBQUksV0FBVSxlQUFlLHdCQUFhLElBQ3pDLFdBQ0YsTUFBTSxJQUFJLENBQUMsTUFBTSxVQUFVO0FBQ3pCLFVBQU0sTUFBTSxLQUFLLE1BQU0sS0FBSyxPQUFPLFNBQVMsS0FBSyxZQUFZLEtBQUs7QUFDbEUsVUFBTSxjQUFjLENBQUMsS0FBSyxZQUFZLENBQUMsQ0FBQyxLQUFLO0FBQzdDLFdBQ0UsNENBQUMsU0FBYyxXQUFVLGlCQUN2QjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsV0FBVztBQUFBLFVBQ1Q7QUFBQSxVQUNBLEtBQUssV0FBVywwQkFBMEI7QUFBQSxVQUMxQyxjQUFjLDZCQUE2QjtBQUFBLFFBQzdDO0FBQUEsUUFDQSxvQkFBa0IsS0FBSyxlQUFlO0FBQUEsUUFDdEMsY0FBWSxLQUFLLFNBQVMsT0FBTyxPQUFPLEtBQUssS0FBSyxJQUFJO0FBQUEsUUFDdEQsZ0JBQWMsY0FBYyxLQUFLLEtBQUs7QUFBQSxRQUN0QyxNQUFNLGNBQWMsV0FBVztBQUFBLFFBQy9CLFVBQVUsY0FBYyxJQUFJO0FBQUEsUUFDNUIsY0FBWSxjQUFlLEtBQUssWUFBWSxLQUFLLFFBQVEsYUFBYztBQUFBLFFBQ3ZFLFdBQVcsY0FDUCxDQUFDLFVBQVU7QUFDWCxjQUFJLE1BQU0sUUFBUSxXQUFXLE1BQU0sUUFBUSxLQUFLO0FBQzlDLGtCQUFNLGVBQWU7QUFDckIsdUJBQVcsS0FBSyxFQUFFO0FBQUEsVUFDcEI7QUFBQSxRQUNGLElBQ0U7QUFBQSxRQUVKO0FBQUEsdURBQUMsU0FBSSxXQUFVLHNJQUNiO0FBQUEsd0RBQUMsU0FBSSxXQUFVLHlEQUF5RCxlQUFLLFVBQVUsTUFBSztBQUFBLFlBQzVGLDRDQUFDLFNBQUksV0FBVSxtRUFBbUUsZUFBSyxVQUFVLE9BQU07QUFBQSxZQUN2Ryw0Q0FBQyxTQUFJLFdBQVUsdUNBQXVDLGVBQUssVUFBVSxLQUFJO0FBQUEsYUFDM0U7QUFBQSxVQUNBLDZDQUFDLFNBQUksV0FBVSwyQ0FDYjtBQUFBLHdEQUFDLFNBQUksV0FBVSxpQkFBZ0IsaUJBQWUsS0FBSyxZQUFZLEtBQUssTUFBTyxlQUFLLE1BQUs7QUFBQSxZQUNyRiw0Q0FBQyxPQUFFLFdBQVUsc0JBQXFCLGlCQUFlLEtBQUssWUFBWSxLQUFLLGFBQWMsZUFBSyxlQUFlLFlBQVc7QUFBQSxhQUN0SDtBQUFBO0FBQUE7QUFBQSxJQUNGLEtBL0JRLEdBZ0NWO0FBQUEsRUFFSixDQUFDLElBQ0M7QUFFSixTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxJQUFHO0FBQUEsTUFDSCxLQUFLO0FBQUEsTUFDTCxXQUFXLFdBQVcsZ0JBQWdCLFlBQVksbUJBQW1CLEVBQUU7QUFBQSxNQUN2RSxtQkFBaUI7QUFBQSxNQUNqQixzQkFBc0I7QUFBQSxNQUN0QixzQkFBc0I7QUFBQSxNQUN0QixvQkFBb0I7QUFBQSxNQUNwQix3QkFBd0I7QUFBQSxNQUN4QixnQkFBZ0I7QUFBQSxNQUNoQixzQkFBc0I7QUFBQSxNQUN0QixlQUFlO0FBQUEsTUFDZixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUVmO0FBQUE7QUFBQSxFQUNIO0FBRUo7QUFFQSxJQUFNLHVCQUF1QixjQUFBQyxRQUFNLEtBQUssWUFBWTtBQUNwRCxxQkFBcUIsY0FBYztBQUVuQyxJQUFPLHVCQUFROzs7QUUxS1gsSUFBQUMsc0JBQUE7QUFYSixJQUFNLGlCQUFpQixDQUFDO0FBQUEsRUFDdEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFlBQVk7QUFBQSxFQUNaLGNBQWM7QUFBQSxFQUNkLGNBQWM7QUFBQSxFQUNkLGFBQWE7QUFDZixNQUFhO0FBQ1gsU0FDRSw4RUFDRTtBQUFBLGtEQUFDLFNBQUksV0FBVyw4RUFBOEUsU0FBUyxHQUFHLEtBQUssR0FDN0c7QUFBQSxvREFBQyxVQUFLLFdBQVUsaUJBQWlCO0FBQUE7QUFBQSxRQUFpQjtBQUFBLFNBQUM7QUFBQSxNQUNuRCw2Q0FBQyxVQUFNLHFCQUFVO0FBQUEsTUFDakIsOENBQUMsVUFBSyxXQUFVLGlCQUFpQjtBQUFBO0FBQUEsUUFBZTtBQUFBLFNBQUM7QUFBQSxNQUNqRCw2Q0FBQyxVQUFNLG1CQUFRO0FBQUEsT0FDakI7QUFBQSxJQUNDLGNBQWMsY0FDYiw4Q0FBQyxTQUFJLFdBQVUseUVBQ2I7QUFBQSxvREFBQyxVQUFLLFdBQVUsMEJBQTBCO0FBQUE7QUFBQSxRQUFZO0FBQUEsU0FBQztBQUFBLE1BQ3ZELDZDQUFDLFVBQUssV0FBVSwyQkFBMkIsdUJBQVk7QUFBQSxPQUN6RCxJQUNFO0FBQUEsS0FDTjtBQUVKO0FBRUEsSUFBTyx5QkFBUTs7O0FDaUVMLElBQUFDLHNCQUFBO0FBN0RWLElBQU0sMEJBQTBCLENBQUM7QUFBQSxFQUMvQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFvQztBQUNsQyxTQUNFLDhDQUFDLFNBQUksV0FBVSxZQUNiO0FBQUE7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLElBQUc7QUFBQSxRQUNILEtBQUs7QUFBQSxRQUNMLFdBQVcsV0FBVyxjQUFjLGtCQUFrQixjQUFjLEVBQUU7QUFBQSxRQUN0RSxTQUFTLE1BQU0sY0FBYyxPQUFPO0FBQUEsUUFDcEMsTUFBSztBQUFBLFFBQ0wsVUFBVTtBQUFBLFFBQ1YsY0FBWTtBQUFBLFFBQ1osaUJBQWM7QUFBQSxRQUNkLGlCQUFlO0FBQUEsUUFDZixXQUFXO0FBQUEsUUFFWDtBQUFBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxXQUFXO0FBQUEsZ0JBQ1Q7QUFBQSxnQkFDQSxrQkFBa0IsV0FBVyxTQUFTLFdBQVc7QUFBQSxnQkFDakQsaUJBQWlCLGFBQWE7QUFBQSxjQUNoQztBQUFBLGNBQ0EsZ0JBQWE7QUFBQSxjQUNiLFNBQVMsQ0FBQyxVQUFVO0FBQ2xCLHNCQUFNLGdCQUFnQjtBQUN0Qiw4QkFBYyxPQUFPO0FBQUEsY0FDdkI7QUFBQSxjQUNBLE1BQUs7QUFBQSxjQUNMLFVBQVU7QUFBQSxjQUNWLGNBQVk7QUFBQSxjQUNaLFdBQVcsQ0FBQyxVQUFVLGlCQUFpQixPQUFPLE9BQU87QUFBQSxjQUVyRDtBQUFBLDZEQUFDLFNBQUksV0FBVSxhQUFhLHFCQUFVO0FBQUEsZ0JBQ3RDLDhDQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsK0RBQUMsT0FBRSxXQUFVLDRCQUEyQjtBQUFBLGtCQUN4Qyw2Q0FBQyxVQUFLLElBQUcsaUJBQWlCLHlCQUFjO0FBQUEsbUJBQzFDO0FBQUE7QUFBQTtBQUFBLFVBQ0Y7QUFBQSxVQUVBLDZDQUFDLFNBQUksV0FBVSxnQ0FDYix1REFBQyxPQUFFLFdBQVUscUJBQW9CLEdBQ25DO0FBQUEsVUFDQSw2Q0FBQyxTQUFJLFdBQVUsdUNBQXNDO0FBQUEsVUFFckQ7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFdBQVc7QUFBQSxnQkFDVDtBQUFBLGdCQUNBLGtCQUFrQixTQUFTLFNBQVMsV0FBVztBQUFBLGdCQUMvQyxlQUFlLGFBQWE7QUFBQSxjQUM5QjtBQUFBLGNBQ0EsZ0JBQWE7QUFBQSxjQUNiLFNBQVMsQ0FBQyxVQUFVO0FBQ2xCLHNCQUFNLGdCQUFnQjtBQUN0Qiw4QkFBYyxLQUFLO0FBQUEsY0FDckI7QUFBQSxjQUNBLE1BQUs7QUFBQSxjQUNMLFVBQVU7QUFBQSxjQUNWLGNBQVk7QUFBQSxjQUNaLFdBQVcsQ0FBQyxVQUFVLGlCQUFpQixPQUFPLEtBQUs7QUFBQSxjQUVuRDtBQUFBLDZEQUFDLFNBQUksV0FBVSxhQUFhLG1CQUFRO0FBQUEsZ0JBQ3BDLDhDQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsK0RBQUMsT0FBRSxXQUFVLDRCQUEyQjtBQUFBLGtCQUN4Qyw2Q0FBQyxVQUFLLElBQUcsZUFBZSx1QkFBWTtBQUFBLG1CQUN0QztBQUFBO0FBQUE7QUFBQSxVQUNGO0FBQUEsVUFFQTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsTUFBSztBQUFBLGNBQ0wsSUFBRztBQUFBLGNBQ0gsV0FBVTtBQUFBLGNBQ1YsY0FBWTtBQUFBLGNBQ1osT0FBTyxFQUFFLFNBQVMsbUJBQW1CLGdCQUFnQixPQUFPO0FBQUEsY0FDNUQsU0FBUztBQUFBLGNBRVQsdURBQUMsT0FBRSxXQUFVLGNBQWE7QUFBQTtBQUFBLFVBQzVCO0FBQUE7QUFBQTtBQUFBLElBQ0Y7QUFBQSxJQUVBLDhDQUFDLFNBQUksSUFBRyxjQUFhLEtBQUssWUFBWSxXQUFVLGVBQWMsUUFBUSxDQUFDLFFBQ3JFO0FBQUEsb0RBQUMsU0FBSSxXQUFVLFlBQ2I7QUFBQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsWUFBUztBQUFBLFlBQ1QsY0FBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBRVQsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixXQUFVLFdBQVUsTUFBSyxRQUFPLFNBQVEsYUFBWSxRQUFPLGdCQUNqRyx1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLGFBQVksS0FBSSxHQUFFLG1CQUFrQixHQUN6RjtBQUFBO0FBQUEsUUFDRjtBQUFBLFFBQ0EsNkNBQUMsU0FBSSxJQUFHLGlCQUFnQixXQUFVLGFBQWEsc0JBQVc7QUFBQSxRQUMxRDtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsV0FBVTtBQUFBLFlBQ1YsWUFBUztBQUFBLFlBQ1QsY0FBWTtBQUFBLFlBQ1osU0FBUztBQUFBLFlBRVQsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixXQUFVLFdBQVUsTUFBSyxRQUFPLFNBQVEsYUFBWSxRQUFPLGdCQUNqRyx1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLGFBQVksS0FBSSxHQUFFLGdCQUFlLEdBQ3RGO0FBQUE7QUFBQSxRQUNGO0FBQUEsU0FDRjtBQUFBLE1BRUEsNkNBQUMsU0FBSSxXQUFVLGdCQUNaLHdCQUFjLElBQUksQ0FBQyxPQUFPLFVBQ3pCLDZDQUFDLFVBQWdDLG1CQUF0QixHQUFHLEtBQUssSUFBSSxLQUFLLEVBQVcsQ0FDeEMsR0FDSDtBQUFBLE1BRUEsNkNBQUMsU0FBSSxJQUFHLFdBQVUsV0FBVSxZQUFXLGNBQWMsa0JBQ2xELG1CQUFTLElBQUksQ0FBQyxTQUFTO0FBQ3RCLFlBQUksS0FBSyxTQUFTO0FBQ2hCLGlCQUFPLDZDQUFDLFlBQXNCLFdBQVUsaUJBQWdCLFVBQVEsUUFBNUMsS0FBSyxHQUF3QztBQUFBLFFBQ25FO0FBRUEsZUFDRTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBRUMsTUFBSztBQUFBLFlBQ0wsV0FBVyxLQUFLO0FBQUEsWUFDaEIsYUFBVyxLQUFLO0FBQUEsWUFDaEIsVUFBVSxLQUFLO0FBQUEsWUFDZixTQUFTLE1BQU0sV0FBVyxJQUFJO0FBQUEsWUFDOUIsY0FBYyxNQUFNLFdBQVcsSUFBSTtBQUFBLFlBRWxDLGVBQUs7QUFBQTtBQUFBLFVBUkQsS0FBSztBQUFBLFFBU1o7QUFBQSxNQUVKLENBQUMsR0FDSDtBQUFBLE1BRUEsNkNBQUMsU0FBSSxJQUFHLGFBQVksV0FBVSxjQUMzQixzQkFDSDtBQUFBLE9BQ0Y7QUFBQSxLQUNGO0FBRUo7QUFFQSxJQUFPLGtDQUFROzs7QUN6TmQsSUFBQUMsZ0JBQWlDO0FBeUIzQixJQUFNLDBCQUEwQixDQUFDO0FBQUEsRUFDdEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFBQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBbUM7QUFFakMsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxPQUFRO0FBRWIsVUFBTSxnQkFBZ0IsQ0FBQyxVQUFzQjtBQUMzQyxZQUFNLFNBQVMsTUFBTTtBQUNyQixVQUFJLENBQUMsT0FBUTtBQUNiLFVBQUksV0FBVyxTQUFTLFNBQVMsTUFBTSxFQUFHO0FBQzFDLFVBQUksYUFBYSxTQUFTLFNBQVMsTUFBTSxFQUFHO0FBQzVDLE1BQUFBLFlBQVcsc0JBQXNCO0FBQ2pDLGdCQUFVLEtBQUs7QUFDZixtQkFBYSxJQUFJO0FBQUEsSUFDbkI7QUFFQSxhQUFTLGlCQUFpQixhQUFhLGFBQWE7QUFDcEQsV0FBTyxNQUFNLFNBQVMsb0JBQW9CLGFBQWEsYUFBYTtBQUFBLEVBQ3RFLEdBQUcsQ0FBQyxjQUFjLFFBQVFBLGFBQVksWUFBWSxjQUFjLFNBQVMsQ0FBQztBQUcxRSwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxhQUFhLE1BQU07QUFDdkIsVUFBSSxxQkFBcUIsUUFBUztBQUNsQyxVQUFJLGtCQUFrQixHQUFHO0FBQ3ZCLGNBQU0sU0FBUyxpQkFBaUI7QUFDaEMsY0FBTSxnQkFBZ0Isa0JBQWtCLE1BQU07QUFDOUMsWUFBSSxlQUFlO0FBQ2pCLGlDQUF1QixVQUFVO0FBQ2pDLHlCQUFlLGNBQWMsTUFBTSxjQUFjLFFBQVE7QUFDekQseUJBQWUsS0FBSztBQUNwQixvQkFBVSxLQUFLO0FBQ2YsK0JBQXFCLFVBQVU7QUFBQSxRQUNqQztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsV0FBTyxpQkFBaUIsWUFBWSxVQUFVO0FBQzlDLFdBQU8sTUFBTSxPQUFPLG9CQUFvQixZQUFZLFVBQVU7QUFBQSxFQUNoRSxHQUFHO0FBQUEsSUFDRDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFHRCwrQkFBVSxNQUFNO0FBQ2Qsb0JBQWdCO0FBRWhCLFFBQUksV0FBa0M7QUFDdEMsVUFBTSxlQUFlLGNBQWM7QUFDbkMsUUFBSSxnQkFBZ0IsT0FBTyxtQkFBbUIsYUFBYTtBQUN6RCxpQkFBVyxJQUFJLGVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxlQUFTLFFBQVEsWUFBWTtBQUFBLElBQy9CO0FBRUEsV0FBTyxpQkFBaUIsVUFBVSxlQUFlO0FBQ2pELFdBQU8sTUFBTTtBQUNYLGFBQU8sb0JBQW9CLFVBQVUsZUFBZTtBQUNwRCxVQUFJLFNBQVUsVUFBUyxXQUFXO0FBQUEsSUFDcEM7QUFBQSxFQUNGLEdBQUcsQ0FBQyxlQUFlLGVBQWUsQ0FBQztBQUduQywrQkFBVSxNQUFNO0FBQ2QsVUFBTSxrQkFBa0IsTUFBTTtBQUM1QixxQkFBZSxDQUFDLFNBQVM7QUFDdkIsY0FBTSxPQUFPLENBQUM7QUFDZCxZQUFJLENBQUMsTUFBTTtBQUNULG9CQUFVLEtBQUs7QUFBQSxRQUNqQjtBQUNBLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBRUEsVUFBTSxZQUFZLE1BQU07QUFDdEIsbUJBQWEsRUFBRSxNQUFNLGFBQWEsT0FBTyxNQUFNLFlBQVksS0FBSyxDQUFDO0FBQUEsSUFDbkU7QUFFQSxXQUFPLGlCQUFpQix5QkFBeUIsZUFBZTtBQUNoRSxXQUFPLGlCQUFpQixtQkFBbUIsU0FBUztBQUVwRCxXQUFPLE1BQU07QUFDWCxhQUFPLG9CQUFvQix5QkFBeUIsZUFBZTtBQUNuRSxhQUFPLG9CQUFvQixtQkFBbUIsU0FBUztBQUFBLElBQ3pEO0FBQUEsRUFDRixHQUFHLENBQUMsY0FBYyxhQUFhLFdBQVcsY0FBYyxDQUFDO0FBQzNEOzs7QUN0SUMsSUFBQUMsZ0JBQXVDO0FBZWpDLElBQU0sMEJBQTBCLENBQUM7QUFBQSxFQUN0QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxZQUFBQztBQUFBLEVBQ0EsYUFBQUM7QUFBQSxFQUNBLGlCQUFBQztBQUNGLE1BQW1DO0FBQ2pDLFFBQU0scUJBQWlCLHNCQUFPLENBQUM7QUFFL0IsUUFBTSxvQkFBZ0MsdUJBQVEsTUFBTTtBQUNsRCxXQUFPLE1BQU0sSUFBSSxDQUFDLFVBQVU7QUFDMUIsWUFBTSxrQkFBa0IsTUFBTSxlQUFlLE1BQU0sZUFBZSxJQUFJLFNBQVMsRUFBRSxLQUFLO0FBQ3RGLFlBQU0sY0FBYyxrQkFBa0I7QUFDdEMsWUFBTSxXQUFXLE1BQU0sU0FBUyxNQUFNLFNBQVM7QUFDL0MsWUFBTSxRQUFRLFlBQVksQ0FBQyxPQUFPLE1BQU0sT0FBTyxRQUFRLENBQUMsSUFBSSxPQUFPLFFBQVEsSUFBSTtBQUMvRSxVQUFJLFNBQVMsZ0JBQWdCLFFBQVEsTUFBTSxTQUFTLElBQUk7QUFFeEQsVUFBSSxlQUFlLFVBQVUsR0FBRztBQUM5QixRQUFBRixZQUFXLGlCQUFpQixFQUFFLGFBQWEsVUFBVSxNQUFNLENBQUM7QUFDNUQsdUJBQWUsV0FBVztBQUFBLE1BQzVCO0FBRUEsWUFBTSxXQUFXLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxTQUFTLEVBQUUsS0FBSztBQUNqRSxZQUFNLFdBQVdDLGFBQVksU0FBUyxNQUFNO0FBQzVDLFlBQU0sU0FBUyxNQUFNLGFBQWEsTUFBTSxhQUFhLElBQUksU0FBUztBQUNsRSxZQUFNLFdBQVcsTUFBTSxlQUFlLE1BQU0sZUFBZSxJQUFJLFNBQVMsRUFBRSxLQUFLO0FBQy9FLFlBQU0sV0FBVztBQUVqQixZQUFNLGVBQWUsQ0FBQyxXQUFXLENBQUM7QUFDbEMsVUFBSSxjQUFjO0FBQ2hCLGlCQUFTO0FBQUEsTUFDWDtBQUVBLGFBQU87QUFBQSxRQUNMLElBQUk7QUFBQSxRQUNKO0FBQUEsUUFDQTtBQUFBLFFBQ0EsTUFBTTtBQUFBLFFBQ04sYUFBYSxZQUFZO0FBQUEsUUFDekI7QUFBQSxRQUNBO0FBQUEsUUFDQSxXQUFXQyxpQkFBZ0IsT0FBTyxNQUFNO0FBQUEsUUFDeEMsVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQ0Esa0JBQWlCLE9BQU8sUUFBUUYsYUFBWSxZQUFZQyxZQUFXLENBQUM7QUFFeEUsU0FBTyxFQUFFLGNBQWM7QUFDekI7OztBQ2hFQSxJQUFBRSxnQkFBc0Q7QUE4SGhELElBQUFDLHNCQUFBO0FBL0dOLElBQU0sUUFBUSxDQUFDLE9BQWUsS0FBYSxRQUFnQixLQUFLLElBQUksS0FBSyxLQUFLLElBQUksS0FBSyxLQUFLLENBQUM7QUFHN0YsSUFBTSx1QkFBdUIsQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsUUFBUTtBQUFBLEVBQ1IsZ0JBQWdCO0FBQUEsRUFDaEIsZ0JBQWdCO0FBQUEsRUFDaEIsYUFBYTtBQUFBLEVBQ2I7QUFDRixNQUFpQztBQUMvQixRQUFNLGFBQVMsc0JBQWlDLElBQUk7QUFDcEQsUUFBTSxnQkFBWSxzQkFBaUMsSUFBSTtBQUV2RCxRQUFNLGtCQUFjLDJCQUFZLE1BQU07QUFDcEMsVUFBTSxjQUFjLE1BQU0sZUFBZSxHQUFHLEdBQUc7QUFDL0MsVUFBTSxnQkFBZ0IsTUFBTSxlQUFlLEdBQUcsQ0FBQztBQUMvQyxVQUFNLGFBQWEsTUFBTSxZQUFZLElBQUksRUFBRTtBQUUzQyxVQUFNLEtBQUs7QUFDWCxVQUFNLEtBQUssS0FBSyxnQkFBZ0I7QUFDaEMsVUFBTSxLQUFLLEtBQUssYUFBYTtBQUM3QixVQUFNLEtBQUssS0FBSyxhQUFhO0FBQzdCLFVBQU0sS0FBSyxLQUFLLGdCQUFnQjtBQUVoQyxXQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUEsK0ZBSW9GLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlEQUt6RCxLQUFLO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBSWpDLEVBQUUsUUFBUSxFQUFFLFlBQVksYUFBYSxhQUFhLFVBQVU7QUFBQSxxQkFDNUQsRUFBRSxRQUFRLEVBQUUsWUFBWSxVQUFVLGFBQWEsYUFBYTtBQUFBO0FBQUE7QUFBQSxNQUczRSxLQUFLO0FBQUEsRUFDVCxHQUFHLENBQUMsT0FBTyxlQUFlLFlBQVksYUFBYSxDQUFDO0FBRXBELFFBQU0sd0JBQW9CLDJCQUFZLE1BQU07QUFDMUMsVUFBTSxTQUFTLFVBQVU7QUFDekIsUUFBSSxDQUFDLE9BQVE7QUFDYixVQUFNLE1BQU0sT0FBTyxXQUFXLElBQUk7QUFDbEMsUUFBSSxDQUFDLElBQUs7QUFFVixVQUFNLFNBQVMsS0FBSyxJQUFJLElBQUksSUFBSTtBQUNoQyxVQUFNLE1BQU0sT0FBTyxvQkFBb0I7QUFFdkMsV0FBTyxRQUFRLEtBQUssTUFBTSxTQUFTLEdBQUc7QUFDdEMsV0FBTyxTQUFTLEtBQUssTUFBTSxTQUFTLEdBQUc7QUFDdkMsV0FBTyxNQUFNLFFBQVEsR0FBRyxNQUFNO0FBQzlCLFdBQU8sTUFBTSxTQUFTLEdBQUcsTUFBTTtBQUMvQixRQUFJLGFBQWEsS0FBSyxHQUFHLEdBQUcsS0FBSyxHQUFHLENBQUM7QUFFckMsVUFBTSxNQUFNLFlBQVk7QUFDeEIsVUFBTSxPQUFPLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsVUFBTSxNQUFNLElBQUksZ0JBQWdCLElBQUk7QUFFcEMsVUFBTSxNQUFNLElBQUksTUFBTTtBQUN0QixRQUFJLFdBQVc7QUFDZixRQUFJLFNBQVMsTUFBTTtBQUNqQixVQUFJLFVBQVUsR0FBRyxHQUFHLFFBQVEsTUFBTTtBQUNsQyxVQUFJLFVBQVUsS0FBSyxHQUFHLEdBQUcsUUFBUSxNQUFNO0FBQ3ZDLFVBQUksZ0JBQWdCLEdBQUc7QUFBQSxJQUN6QjtBQUNBLFFBQUksVUFBVSxNQUFNO0FBQ2xCLFVBQUksZ0JBQWdCLEdBQUc7QUFBQSxJQUN6QjtBQUNBLFFBQUksTUFBTTtBQUFBLEVBQ1osR0FBRyxDQUFDLGFBQWEsSUFBSSxDQUFDO0FBRXRCLCtCQUFVLE1BQU07QUFDZCxzQkFBa0I7QUFDbEIsV0FBTyxpQkFBaUIsVUFBVSxpQkFBaUI7QUFDbkQsV0FBTyxNQUFNLE9BQU8sb0JBQW9CLFVBQVUsaUJBQWlCO0FBQUEsRUFDckUsR0FBRyxDQUFDLGlCQUFpQixDQUFDO0FBRXRCLFFBQU0sY0FBYyxNQUFNO0FBQ3hCLFFBQUksT0FBTyxZQUFZLFlBQVk7QUFDakMsY0FBUTtBQUNSO0FBQUEsSUFDRjtBQUNBLFFBQUksQ0FBQyxTQUFTLE9BQU8sV0FBVyxZQUFhO0FBQzdDLFdBQU8sU0FBUyxPQUFPO0FBQUEsRUFDekI7QUFFQSxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxLQUFLO0FBQUEsTUFDTCxNQUFLO0FBQUEsTUFDTCxjQUFZO0FBQUEsTUFDWixXQUFVO0FBQUEsTUFDVixPQUFPO0FBQUEsUUFDTCxPQUFPLEdBQUcsSUFBSTtBQUFBLFFBQ2QsUUFBUSxHQUFHLElBQUk7QUFBQSxRQUNmLE9BQU8sR0FBRyxLQUFLO0FBQUEsUUFDZixRQUFRLEdBQUcsTUFBTTtBQUFBLFFBQ2pCLHlCQUF5QjtBQUFBLE1BQzNCO0FBQUEsTUFDQSxTQUFTO0FBQUEsTUFFVCx1REFBQyxZQUFPLEtBQUssV0FBVyxXQUFVLG9CQUFtQjtBQUFBO0FBQUEsRUFDdkQ7QUFFSjtBQUVBLElBQU8sK0JBQVE7OztBQ25JZixJQUFBQyxnQkFBMkM7QUFvRG5DLElBQUFDLHNCQUFBO0FBakNSLElBQU0saUJBQWlCO0FBR3ZCLElBQU0sd0JBQW9CO0FBQUEsRUFDeEIsQ0FBQyxFQUFFLFlBQVksYUFBYSxhQUFhLGdCQUFnQixjQUFjLFFBQVEsVUFBVSxHQUFHLFFBQVE7QUFDbEcsVUFBTSxZQUFZLEtBQUssSUFBSSxHQUFHLGNBQWMsQ0FBQztBQUM3QyxVQUFNLGNBQWMsS0FBSyxJQUFJLEtBQUssSUFBSSxHQUFHLGVBQWUsQ0FBQyxHQUFHLGFBQWEsQ0FBQztBQUMxRSxVQUFNLGFBQWEsS0FBSyxJQUFJLEdBQUcsY0FBYyxjQUFjO0FBRTNELFVBQU0saUJBQWlCLFlBQVk7QUFDbkMsVUFBTSxjQUFjLFlBQVk7QUFDaEMsVUFBTSxpQkFBaUIsY0FBYztBQUNyQyxVQUFNLFlBQVksY0FBYztBQUNoQyxVQUFNLFlBQVksY0FBYztBQUVoQyxVQUFNLGtCQUFjLHVCQUFRLE1BQU07QUFDaEMsVUFBSSxDQUFDLFVBQVcsUUFBTyxDQUFDO0FBQ3hCLFlBQU0sY0FBYyxLQUFLLElBQUksR0FBRyxLQUFLLE9BQU8sY0FBYyxLQUFLLFVBQVUsSUFBSSxhQUFhLENBQUM7QUFDM0YsWUFBTSxZQUFZLEtBQUssSUFBSSxXQUFXLGNBQWMsYUFBYSxDQUFDO0FBQ2xFLGFBQU8sTUFBTSxLQUFLLEVBQUUsUUFBUSxZQUFZLGNBQWMsRUFBRSxHQUFHLENBQUMsTUFBTSxRQUFRLGNBQWMsR0FBRztBQUFBLElBQzdGLEdBQUcsQ0FBQyxhQUFhLFdBQVcsVUFBVSxDQUFDO0FBRXZDLFFBQUksQ0FBQyxlQUFnQixRQUFPO0FBRTVCLFdBQ0U7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLElBQUc7QUFBQSxRQUNIO0FBQUEsUUFDQSxXQUFXO0FBQUEsVUFDVDtBQUFBLFVBQ0EsYUFBYTtBQUFBLFFBQ2Y7QUFBQSxRQUVBO0FBQUEsd0RBQUMsU0FBSSxXQUFVLHlDQUNaO0FBQUEsMkJBQWUsa0JBQ2Q7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxNQUFLO0FBQUEsZ0JBQ0wsV0FBVTtBQUFBLGdCQUNWLGNBQVksUUFBUTtBQUFBLGdCQUNwQixTQUFTLENBQUMsTUFBTTtBQUNkLG9CQUFFLGVBQWU7QUFDakIsK0JBQWEsQ0FBQztBQUFBLGdCQUNoQjtBQUFBLGdCQUVBLHVEQUFDLFNBQUksT0FBTSw4QkFBNkIsU0FBUSxhQUFZLE1BQUssUUFBTyxRQUFPLGdCQUFlLGFBQVksT0FBTSxXQUFVLG1CQUN4SCx1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsb0RBQW1ELEdBQzFHO0FBQUE7QUFBQSxZQUNGO0FBQUEsWUFFRCxlQUFlLGFBQ2Q7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxNQUFLO0FBQUEsZ0JBQ0wsV0FBVTtBQUFBLGdCQUNWLGNBQVksUUFBUTtBQUFBLGdCQUNwQixTQUFTLENBQUMsTUFBTTtBQUNkLG9CQUFFLGVBQWU7QUFDakIsK0JBQWEsY0FBYyxDQUFDO0FBQUEsZ0JBQzlCO0FBQUEsZ0JBRUEsdURBQUMsU0FBSSxPQUFNLDhCQUE2QixTQUFRLGFBQVksTUFBSyxRQUFPLFFBQU8sZ0JBQWUsYUFBWSxPQUFNLFdBQVUsbUJBQ3hILHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSwrQkFBOEIsR0FDckY7QUFBQTtBQUFBLFlBQ0Y7QUFBQSxhQUVKO0FBQUEsVUFFQSw2Q0FBQyxTQUFJLFdBQVUsOERBQ1osc0JBQVksSUFBSSxDQUFDLFNBQVM7QUFDekIsa0JBQU0sV0FBVyxTQUFTO0FBQzFCLG1CQUNFO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBRUMsTUFBSztBQUFBLGdCQUNMLFdBQVc7QUFBQSxrQkFDVDtBQUFBLGtCQUNBLFdBQ0ksbURBQ0E7QUFBQSxnQkFDTjtBQUFBLGdCQUNBLFNBQVMsQ0FBQyxNQUFNO0FBQ2Qsb0JBQUUsZUFBZTtBQUNqQiwrQkFBYSxJQUFJO0FBQUEsZ0JBQ25CO0FBQUEsZ0JBRUM7QUFBQTtBQUFBLGNBYkksUUFBUSxJQUFJO0FBQUEsWUFjbkI7QUFBQSxVQUVKLENBQUMsR0FDSDtBQUFBLFVBRUEsOENBQUMsU0FBSSxXQUFVLHVDQUNaO0FBQUEsMkJBQWUsYUFDZDtBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLE1BQUs7QUFBQSxnQkFDTCxXQUFVO0FBQUEsZ0JBQ1YsY0FBWSxRQUFRO0FBQUEsZ0JBQ3BCLFNBQVMsQ0FBQyxNQUFNO0FBQ2Qsb0JBQUUsZUFBZTtBQUNqQiwrQkFBYSxjQUFjLENBQUM7QUFBQSxnQkFDOUI7QUFBQSxnQkFFQSx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFZLE9BQU0sV0FBVSxtQkFDeEgsdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLDZCQUE0QixHQUNuRjtBQUFBO0FBQUEsWUFDRjtBQUFBLFlBRUQsZUFBZSxhQUNkO0FBQUEsY0FBQztBQUFBO0FBQUEsZ0JBQ0MsTUFBSztBQUFBLGdCQUNMLFdBQVU7QUFBQSxnQkFDVixjQUFZLFFBQVE7QUFBQSxnQkFDcEIsU0FBUyxDQUFDLE1BQU07QUFDZCxvQkFBRSxlQUFlO0FBQ2pCLCtCQUFhLFNBQVM7QUFBQSxnQkFDeEI7QUFBQSxnQkFFQSx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFZLE9BQU0sV0FBVSxtQkFDeEgsdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLGtEQUFpRCxHQUN4RztBQUFBO0FBQUEsWUFDRjtBQUFBLGFBRUo7QUFBQTtBQUFBO0FBQUEsSUFDRjtBQUFBLEVBRUo7QUFDRjtBQUVBLGtCQUFrQixjQUFjO0FBRWhDLElBQU8sNEJBQVE7OztBQzVIWCxJQUFBQyxzQkFBQTtBQVZKLElBQU0sZUFBZSxDQUFDO0FBQUEsRUFDcEI7QUFBQSxFQUNBLFNBQVM7QUFBQSxFQUNULFdBQVc7QUFBQSxFQUNYO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLE9BQU87QUFDVCxNQUFhO0FBQ1gsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0M7QUFBQSxNQUNBLFdBQVcsV0FBVyxrQkFBa0IsU0FBUywyQkFBMkIsSUFBSSxTQUFTO0FBQUEsTUFDekY7QUFBQSxNQUNBO0FBQUEsTUFDQSxjQUFZLGFBQWE7QUFBQSxNQUV4QjtBQUFBO0FBQUEsRUFDSDtBQUVKO0FBRUEsSUFBTyx1QkFBUTs7O0FDZFgsSUFBQUMsc0JBQUE7QUFUSixJQUFNLGVBQWUsQ0FBQztBQUFBLEVBQ3BCO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxPQUFPO0FBQ1QsTUFBYTtBQUNYLFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDO0FBQUEsTUFDQSxXQUFXLFdBQVcsa0JBQWtCLFNBQVM7QUFBQSxNQUNqRDtBQUFBLE1BQ0E7QUFBQSxNQUNBLGNBQVksYUFBYTtBQUFBLE1BRXhCO0FBQUE7QUFBQSxFQUNIO0FBRUo7QUFFQSxJQUFPLHVCQUFROzs7QUNsQ2YsSUFBQUMsZ0JBQXlEO0FBd0NsRCxJQUFNLHVCQUF1QixDQUFDO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGVBQWU7QUFBQSxFQUNmLGdCQUFBQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBZ0M7QUFDOUIsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHdCQUFnQyxDQUFDLENBQUM7QUFDNUQsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHdCQUFTLENBQUM7QUFDcEMsUUFBTSxDQUFDLGFBQWEsY0FBYyxRQUFJLHdCQUFTLENBQUM7QUFDaEQsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLGNBQWMsZUFBZSxRQUFJLHdCQUFTLEVBQUU7QUFFbkQsUUFBTSw2QkFBeUIsc0JBQU8sS0FBSztBQUMzQyxRQUFNLHFCQUFpQixzQkFBK0IsSUFBSTtBQUMxRCxRQUFNLHlCQUFxQixzQkFBTyxDQUFDO0FBQ25DLFFBQU0sb0JBQWdCLHNCQUFzQixJQUFJO0FBQ2hELFFBQU0sdUJBQW1CLHNCQUFPLEVBQUU7QUFFbEMsUUFBTSxzQkFBa0IsMkJBQVksTUFBTTtBQUN4QyxRQUFJLGNBQWMsU0FBUztBQUN6QixtQkFBYSxjQUFjLE9BQU87QUFDbEMsb0JBQWMsVUFBVTtBQUFBLElBQzFCO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0seUJBQXFCLDJCQUFZLE1BQU07QUFDM0MsUUFBSSxDQUFDLGVBQWUsUUFBUztBQUM3QixRQUFJO0FBQ0YscUJBQWUsUUFBUSxNQUFNO0FBQUEsSUFDL0IsUUFBUTtBQUFBLElBRVI7QUFDQSxtQkFBZSxVQUFVO0FBQUEsRUFDM0IsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHNCQUFrQiwyQkFBWSxNQUFNO0FBQ3hDLG9CQUFnQjtBQUNoQix1QkFBbUI7QUFDbkIsYUFBUyxDQUFDLENBQUM7QUFDWCxhQUFTLENBQUM7QUFDVixvQkFBZ0IsRUFBRTtBQUNsQixpQkFBYSxLQUFLO0FBQUEsRUFDcEIsR0FBRyxDQUFDLG9CQUFvQixlQUFlLENBQUM7QUFFeEMsUUFBTSxxQkFBaUI7QUFBQSxJQUNyQixPQUFPLE1BQWMsYUFBNEI7QUFDL0MsWUFBTSxjQUFjLFVBQVUsWUFBWTtBQUMxQyxZQUFNLFlBQVksVUFBVSxVQUFVO0FBQ3RDLFlBQU0sZ0JBQWdCLFVBQVUsY0FBYztBQUU5QyxVQUFJLENBQUMsZUFBZSxDQUFDLFdBQVc7QUFDOUIscUJBQWEsS0FBSztBQUNsQixpQkFBUyxDQUFDLENBQUM7QUFDWCxpQkFBUyxDQUFDO0FBQ1Ysd0JBQWdCLEVBQUU7QUFDbEI7QUFBQSxNQUNGO0FBRUEscUJBQWUsSUFBSTtBQUNuQixzQkFBZ0I7QUFFaEIsWUFBTSxZQUFZLEVBQUUsbUJBQW1CO0FBQ3ZDLHlCQUFtQjtBQUVuQixZQUFNLGFBQWEsSUFBSSxnQkFBZ0I7QUFDdkMscUJBQWUsVUFBVTtBQUV6QixZQUFNLGFBQWFBLGdCQUFlLGFBQWEsU0FBUztBQUN4RCxZQUFNLGtCQUFrQixHQUFHLFdBQVcsSUFBSSxJQUFJLFdBQVcsRUFBRSxJQUFJLGFBQWEsSUFBSSxJQUFJO0FBQ3BGLHVCQUFpQixVQUFVO0FBRTNCLG1CQUFhLElBQUk7QUFDakIsZUFBUyxDQUFDLENBQUM7QUFDWCxlQUFTLENBQUM7QUFDVixzQkFBZ0IsRUFBRTtBQUVsQixZQUFNLFVBQVU7QUFBQSxRQUNkLFVBQVUsV0FBVztBQUFBLFFBQ3JCLFFBQVEsV0FBVztBQUFBLFFBQ25CLFlBQVk7QUFBQSxNQUNkO0FBRUEsZ0JBQVUsMEJBQTBCLEVBQUUsTUFBTSxVQUFVLFFBQVEsQ0FBQztBQUUvRCxVQUFJO0FBQ0osVUFBSTtBQUNGLGVBQU8sTUFBTSxVQUEyQixpQ0FBaUMsSUFBSSxhQUFhLFFBQVEsSUFBSTtBQUFBLFVBQ3BHLFFBQVE7QUFBQSxVQUNSLFNBQVMsRUFBRSxnQkFBZ0IsbUJBQW1CO0FBQUEsVUFDOUMsTUFBTSxLQUFLLFVBQVUsT0FBTztBQUFBLFVBQzVCLFFBQVEsV0FBVztBQUFBLFVBQ25CLHlCQUF5QjtBQUFBLFFBQzNCLENBQUM7QUFBQSxNQUNILFNBQVMsS0FBVTtBQUNqQixZQUFJLGNBQWMsbUJBQW1CLFFBQVM7QUFDOUMsWUFBSSxLQUFLLFNBQVMsY0FBYztBQUM5Qix5QkFBZSxVQUFVO0FBQ3pCO0FBQUEsUUFDRjtBQUVBLFlBQUksZUFBZSxpQkFBaUIsSUFBSSxXQUFXLEtBQUs7QUFDdEQsdUJBQWEsS0FBSztBQUNsQix5QkFBZSxVQUFVO0FBQ3pCLHNCQUFZO0FBQ1o7QUFBQSxRQUNGO0FBRUEsY0FBTSxpQkFBaUIsRUFBRSxlQUFlLGtCQUFrQixPQUFPLElBQUksV0FBVztBQUNoRixZQUFJLGtCQUFrQix1QkFBdUIsU0FBUztBQUNwRCxpQ0FBdUIsVUFBVTtBQUNqQyx5QkFBZSxVQUFVO0FBQ3pCLHdCQUFjLFVBQVUsT0FBTyxXQUFXLE1BQU07QUFDOUMsZ0JBQUksY0FBYyxtQkFBbUIsUUFBUztBQUM5QyxnQkFBSSxpQkFBaUIsWUFBWSxnQkFBaUI7QUFDbEQsMkJBQWUsTUFBTTtBQUFBLGNBQ25CLFVBQVU7QUFBQSxjQUNWLFFBQVE7QUFBQSxjQUNSLFlBQVk7QUFBQSxZQUNkLENBQUM7QUFBQSxVQUNILEdBQUcsWUFBWTtBQUNmO0FBQUEsUUFDRjtBQUNBLHFCQUFhLEtBQUs7QUFDbEIsd0JBQWdCLEtBQUssV0FBVyxLQUFLLHFCQUFxQiw0Q0FBNEMsQ0FBQztBQUN2Ryx1QkFBZSxVQUFVO0FBQ3pCO0FBQUEsTUFDRjtBQUVBLFVBQUksY0FBYyxtQkFBbUIsUUFBUztBQUU5QyxnQkFBVSwyQkFBMkI7QUFBQSxRQUNuQyxRQUFRO0FBQUEsUUFDUixPQUFPLE1BQU0sU0FBUztBQUFBLFFBQ3RCLE9BQU8sTUFBTSxRQUFRLE1BQU0sS0FBSyxJQUFJLEtBQUssTUFBTSxTQUFTO0FBQUEsTUFDMUQsQ0FBQztBQUVELG1CQUFhLEtBQUs7QUFDbEIsZUFBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQ3pCLGVBQVMsS0FBSyxVQUFVLEtBQUssU0FBUyxDQUFDLEdBQUcsTUFBTTtBQUNoRCxxQkFBZSxVQUFVO0FBQUEsSUFDM0I7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0FBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLCtCQUFVLE1BQU07QUFDZCxXQUFPLE1BQU07QUFDWCxzQkFBZ0I7QUFDaEIseUJBQW1CO0FBQUEsSUFDckI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxvQkFBb0IsZUFBZSxDQUFDO0FBRXhDLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBQ3pOQSxJQUFBQyxnQkFBNEI7QUFrQjVCLElBQU0sdUJBQXVCLEtBQUssS0FBSyxLQUFLO0FBRTVDLElBQU0sd0JBQXdCLENBQUMsVUFBa0U7QUFDL0YsTUFBSSxDQUFDLFNBQVMsT0FBTyxVQUFVLFNBQVUsUUFBTztBQUNoRCxTQUFPO0FBQUEsSUFDTCxVQUFVLE1BQU0sWUFBWTtBQUFBLElBQzVCLFFBQVEsTUFBTSxVQUFVO0FBQUEsSUFDeEIsTUFBTSxNQUFNO0FBQUEsSUFDWixlQUFlLE1BQU0saUJBQWlCO0FBQUEsSUFDdEMsWUFBWSxNQUFNLGNBQWM7QUFBQSxFQUNsQztBQUNGO0FBR08sSUFBTSx3QkFBd0IsTUFBTTtBQUN6QyxRQUFNLHVCQUFtQiwyQkFBWSxNQUFrQztBQUNyRSxVQUFNLFNBQVMseUJBQThDLGtCQUFrQjtBQUMvRSxXQUFPLHNCQUFzQixNQUFNO0FBQUEsRUFDckMsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLHVCQUFtQiwyQkFBWSxNQUFNO0FBQ3pDLGlDQUE2QixrQkFBa0I7QUFDL0MsaUNBQTZCLHVCQUF1QjtBQUFBLEVBQ3RELEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx3QkFBb0IsMkJBQVksTUFBTTtBQUMxQyxVQUFNLE1BQU0sMEJBQTBCLHVCQUF1QjtBQUM3RCxRQUFJLFFBQVEsS0FBSztBQUNmLG1DQUE2Qix1QkFBdUI7QUFDcEQsYUFBTztBQUFBLElBQ1Q7QUFDQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sdUJBQW1CLDJCQUFZLENBQUMsV0FBZ0M7QUFDcEUsNkJBQXlCLG9CQUFvQixRQUFRLG9CQUFvQjtBQUN6RSw4QkFBMEIseUJBQXlCLEtBQUssb0JBQW9CO0FBQUEsRUFDOUUsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjs7O0FDL0RDLElBQUFDLGdCQUE4RDtBQThCeEQsSUFBTSx5QkFBeUIsQ0FBQztBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLEVBQ0EsWUFBQUM7QUFBQSxFQUNBLGdCQUFBQztBQUFBLEVBQ0EsVUFBQUM7QUFBQSxFQUNBLE9BQUFDO0FBQUEsRUFDQSxZQUFBQztBQUFBLEVBQ0EsVUFBQUM7QUFDRixNQUFrQztBQUNoQyxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUksd0JBQXNCLElBQUk7QUFDNUQsUUFBTSxDQUFDLFNBQVMsVUFBVSxRQUFJLHdCQUFzQixJQUFJO0FBQ3hELFFBQU0sQ0FBQyxpQkFBaUIsa0JBQWtCLFFBQUksd0JBQXNCLElBQUk7QUFDeEUsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLFFBQUksd0JBQXNCLElBQUk7QUFDcEUsUUFBTSxDQUFDLFdBQVcsWUFBWSxRQUFJLHdCQUFzQixJQUFJO0FBQzVELFFBQU0sQ0FBQyxlQUFlLGdCQUFnQixRQUFJLHdCQUFtQyxPQUFPO0FBQ3BGLFFBQU0sQ0FBQyxjQUFjLGVBQWUsUUFBSSx5QkFBUyxvQkFBSSxLQUFLLEdBQUUsU0FBUyxDQUFDO0FBQ3RFLFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx5QkFBUyxvQkFBSSxLQUFLLEdBQUUsWUFBWSxDQUFDO0FBQ3ZFLFFBQU0sQ0FBQyxRQUFRLFNBQVMsUUFBSSx3QkFBUyxLQUFLO0FBQzFDLFFBQU0sQ0FBQyx1QkFBdUIsd0JBQXdCLFFBQUksd0JBQVMsS0FBSztBQUN4RSxRQUFNLENBQUMsbUJBQW1CLG9CQUFvQixRQUFJLHdCQUErQixJQUFJO0FBQ3JGLFFBQU0sQ0FBQyxnQkFBZ0IsaUJBQWlCLFFBQUksd0JBQThCLElBQUk7QUFDOUUsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSSx3QkFBUyxDQUFDO0FBQ3RELFFBQU0sQ0FBQyxhQUFhLGNBQWMsUUFBSSx3QkFBUyxJQUFJO0FBQ25ELFFBQU0sQ0FBQyxpQkFBaUIsa0JBQWtCLFFBQUksd0JBQVMsS0FBSztBQUU1RCxRQUFNLDJCQUF1QixzQkFBTyxLQUFLO0FBQ3pDLFFBQU0sdUJBQW1CLHNCQUFPLEtBQUs7QUFFckMsUUFBTSxvQkFBZ0IsdUJBQVEsTUFBTyxZQUFZRixPQUFNLFNBQVMsSUFBSSxJQUFLLENBQUMsV0FBV0EsTUFBSyxDQUFDO0FBQzNGLFFBQU0sa0JBQWMsdUJBQVEsTUFBTyxVQUFVQSxPQUFNLE9BQU8sSUFBSSxJQUFLLENBQUMsU0FBU0EsTUFBSyxDQUFDO0FBQ25GLFFBQU0sc0JBQWtCLHVCQUFRLE1BQU8saUJBQWlCLGVBQWUsUUFBUSxJQUFLLENBQUMsY0FBYyxDQUFDO0FBRXBHLFFBQU0sMEJBQXNCLDJCQUFZLE1BQU07QUFDNUMsUUFBSSxzQkFBc0IsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVO0FBQzlELHlCQUFtQixJQUFJO0FBQ3ZCLHVCQUFpQixDQUFDLFlBQVksVUFBVSxLQUFLO0FBQzdDLCtCQUF5QixJQUFJO0FBQzdCLGdCQUFVLElBQUk7QUFDZCxxQkFBZSxJQUFJO0FBQ25CLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUFBLEVBQ1QsR0FBRyxDQUFDLG1CQUFtQixTQUFTLFNBQVMsQ0FBQztBQUcxQyxRQUFNLGlDQUE2QiwyQkFBWSxNQUFnQztBQUM3RSxRQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBZSxRQUFPO0FBQy9DLFVBQU0sV0FBV0YsZ0JBQWUsZUFBZTtBQUMvQyxVQUFNLFNBQVNBLGdCQUFlLGFBQWE7QUFDM0MsUUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFRLFFBQU87QUFFakMsVUFBTSxXQUFXRyxZQUFXLFFBQVE7QUFDcEMsVUFBTSxTQUFTQSxZQUFXLE1BQU07QUFFaEMsUUFBSSxRQUFRO0FBQ1osUUFBSSxNQUFNO0FBQ1YsUUFBSUMsVUFBUyxLQUFLLEtBQUssR0FBRztBQUN4QixZQUFNLE9BQU87QUFDYixjQUFRO0FBQ1IsWUFBTTtBQUFBLElBQ1I7QUFFQSxpQkFBYSxLQUFLO0FBQ2xCLGVBQVcsR0FBRztBQUNkLHFCQUFpQixNQUFNO0FBQ3ZCLGlCQUFhLElBQUk7QUFDakIsb0JBQWdCLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLG1CQUFlLE1BQU0sWUFBWSxDQUFDO0FBQ2xDLHlCQUFxQixJQUFJO0FBQ3pCLHNCQUFrQixJQUFJO0FBQ3RCLGNBQVUsS0FBSztBQUVmLFdBQU87QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxRQUNSLFVBQVVGLE9BQU0sS0FBSztBQUFBLFFBQ3JCLFFBQVFBLE9BQU0sR0FBRztBQUFBLFFBQ2pCLFlBQVk7QUFBQSxNQUNkO0FBQUEsSUFDRjtBQUFBLEVBQ0YsR0FBRyxDQUFDLGlCQUFpQixlQUFlRSxXQUFVSixpQkFBZ0JHLGFBQVlELE1BQUssQ0FBQztBQUdoRixRQUFNLDBCQUFzQiwyQkFBWSxNQUFNO0FBQzVDLGlCQUFhLElBQUk7QUFDakIsZUFBVyxJQUFJO0FBQ2YsdUJBQW1CLElBQUk7QUFDdkIscUJBQWlCLElBQUk7QUFDckIscUJBQWlCLE9BQU87QUFDeEIsaUJBQWEsSUFBSTtBQUNqQixxQkFBZ0Isb0JBQUksS0FBSyxHQUFFLFNBQVMsQ0FBQztBQUNyQyxvQkFBZSxvQkFBSSxLQUFLLEdBQUUsWUFBWSxDQUFDO0FBQ3ZDLHlCQUFxQixJQUFJO0FBQ3pCLDZCQUF5QixLQUFLO0FBQzlCLHNCQUFrQixJQUFJO0FBQ3RCLHNCQUFrQixDQUFDLFNBQVMsT0FBTyxDQUFDO0FBQ3BDLHVCQUFtQixLQUFLO0FBQUEsRUFDMUIsR0FBRyxDQUFDLENBQUM7QUFHTCxRQUFNLHdCQUFvQjtBQUFBLElBQ3hCLENBQUMsV0FBaUU7QUFDaEUsVUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLFlBQVksQ0FBQyxPQUFPLE9BQVEsUUFBTztBQUUxRCxZQUFNLFFBQVFELFVBQVMsT0FBTyxRQUFRO0FBQ3RDLFlBQU0sTUFBTUEsVUFBUyxPQUFPLE1BQU07QUFDbEMsbUJBQWEsS0FBSztBQUNsQixpQkFBVyxHQUFHO0FBQ2QsdUJBQWlCLE1BQU0sU0FBUyxLQUFLO0FBQ3JDLG1CQUFhLElBQUk7QUFDakIsc0JBQWdCLFFBQVEsTUFBTSxTQUFTLEtBQUksb0JBQUksS0FBSyxHQUFFLFNBQVMsQ0FBQztBQUNoRSxxQkFBZSxRQUFRLE1BQU0sWUFBWSxLQUFJLG9CQUFJLEtBQUssR0FBRSxZQUFZLENBQUM7QUFDckUsMkJBQXFCLElBQUk7QUFDekIsK0JBQXlCLEtBQUs7QUFDOUIseUJBQW1CLEtBQUs7QUFFeEIsVUFBSSxPQUFPLGVBQWU7QUFDeEIsMEJBQWtCLEVBQUUsT0FBTyxPQUFPLGVBQWUsTUFBTSxPQUFPLGNBQWMsT0FBTyxjQUFjLENBQUM7QUFBQSxNQUNwRyxPQUFPO0FBQ0wsMEJBQWtCLElBQUk7QUFBQSxNQUN4QjtBQUVBLFlBQU0sVUFBVSxPQUFPLE9BQU8sSUFBSTtBQUNsQyxZQUFNLGFBQWEsT0FBTyxTQUFTLE9BQU8sS0FBSyxVQUFVLElBQUksVUFBVTtBQUV2RSxhQUFPO0FBQUEsUUFDTCxNQUFNO0FBQUEsUUFDTixVQUFVO0FBQUEsVUFDUixVQUFVLE9BQU87QUFBQSxVQUNqQixRQUFRLE9BQU87QUFBQSxVQUNmLFlBQVksT0FBTyxpQkFBaUI7QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDQSxTQUFRO0FBQUEsRUFDWDtBQUVBLFFBQU0sbUJBQWU7QUFBQSxJQUNuQixDQUFDLFlBQWtCO0FBQ2pCLE1BQUFGLFlBQVcsZ0JBQWdCO0FBQUEsUUFDekIsU0FBU0csT0FBTSxPQUFPO0FBQUEsUUFDdEIsT0FBTztBQUFBLFFBQ1AsS0FBSztBQUFBLFFBQ0w7QUFBQSxNQUNGLENBQUM7QUFFRCx5QkFBbUIsS0FBSztBQUN4QiwyQkFBcUIsUUFBUTtBQUM3QiwrQkFBeUIsSUFBSTtBQUM3QixZQUFNLFdBQVcsQ0FBQyxDQUFDO0FBQ25CLFlBQU0sU0FBUyxDQUFDLENBQUM7QUFFakIsVUFBSSxrQkFBa0IsT0FBTztBQUMzQixZQUFJLENBQUMsVUFBVTtBQUNiLHVCQUFhLE9BQU87QUFDcEIscUJBQVcsSUFBSTtBQUNmLDJCQUFpQixLQUFLO0FBQ3RCLDBCQUFnQixRQUFRLFNBQVMsQ0FBQztBQUNsQyx5QkFBZSxRQUFRLFlBQVksQ0FBQztBQUNwQztBQUFBLFFBQ0Y7QUFFQSxZQUFJRyxZQUFXO0FBQ2YsWUFBSSxTQUFTO0FBQ2IsWUFBSUQsVUFBUyxRQUFRQyxTQUFRLEdBQUc7QUFDOUIsZ0JBQU0sT0FBT0E7QUFDYixVQUFBQSxZQUFXO0FBQ1gsbUJBQVM7QUFBQSxRQUNYO0FBRUEscUJBQWFBLFNBQVE7QUFDckIsbUJBQVcsTUFBTTtBQUNqQiwyQkFBbUJBLFNBQVE7QUFDM0IseUJBQWlCLE1BQU07QUFDdkIseUJBQWlCLE1BQU07QUFDdkIsd0JBQWdCLE9BQU8sU0FBUyxDQUFDO0FBQ2pDLHVCQUFlLE9BQU8sWUFBWSxDQUFDO0FBQ25DLHFCQUFhLElBQUk7QUFDakIsa0JBQVUsS0FBSztBQUNmLGlDQUF5QixLQUFLO0FBQzlCO0FBQUEsTUFDRjtBQUVBLFlBQU0sV0FBVztBQUNqQixVQUFJLFVBQVUsV0FBV0QsVUFBUyxTQUFTLFFBQVEsR0FBRztBQUNwRCxxQkFBYSxRQUFRO0FBQ3JCLG1CQUFXLElBQUk7QUFDZix5QkFBaUIsS0FBSztBQUN0Qix3QkFBZ0IsU0FBUyxTQUFTLENBQUM7QUFDbkMsdUJBQWUsU0FBUyxZQUFZLENBQUM7QUFDckM7QUFBQSxNQUNGO0FBRUEsbUJBQWEsUUFBUTtBQUNyQixVQUFJLFVBQVUsU0FBUztBQUNyQixtQkFBVyxPQUFPO0FBQ2xCLDJCQUFtQixRQUFRO0FBQzNCLHlCQUFpQixPQUFPO0FBQ3hCLHlCQUFpQixNQUFNO0FBQ3ZCLHFCQUFhLElBQUk7QUFDakIsa0JBQVUsS0FBSztBQUNmLGlDQUF5QixLQUFLO0FBQUEsTUFDaEMsT0FBTztBQUNMLG1CQUFXLElBQUk7QUFDZix5QkFBaUIsS0FBSztBQUFBLE1BQ3hCO0FBRUEsc0JBQWdCLFNBQVMsU0FBUyxDQUFDO0FBQ25DLHFCQUFlLFNBQVMsWUFBWSxDQUFDO0FBQUEsSUFDdkM7QUFBQSxJQUNBLENBQUMsU0FBUyxlQUFlQSxXQUFVTCxhQUFZLGVBQWUsV0FBVyxhQUFhRyxNQUFLO0FBQUEsRUFDN0Y7QUFFQSxRQUFNLHVCQUFtQjtBQUFBLElBQ3ZCLENBQUMsVUFBMkI7QUFDMUIsWUFBTSxnQkFBZ0I7QUFDdEIsTUFBQUgsWUFBVyxZQUFZO0FBQ3ZCLDJCQUFxQixJQUFJO0FBQ3pCLHlCQUFtQixLQUFLO0FBQ3hCLCtCQUF5QixLQUFLO0FBQzlCLDBCQUFvQjtBQUNwQixnQkFBVSxLQUFLO0FBQ2YscUJBQWUsSUFBSTtBQUFBLElBQ3JCO0FBQUEsSUFDQSxDQUFDQSxhQUFZLG1CQUFtQjtBQUFBLEVBQ2xDO0FBRUEsUUFBTSxrQkFBYztBQUFBLElBQ2xCLENBQUMsWUFBNkI7QUFDNUIsTUFBQUEsWUFBVyxlQUFlLEVBQUUsU0FBUyxPQUFPLGVBQWUsS0FBSyxhQUFhLGNBQWMsQ0FBQztBQUM1Rix5QkFBbUIsS0FBSztBQUN4QiwyQkFBcUIsUUFBUTtBQUM3QiwrQkFBeUIsSUFBSTtBQUU3QixVQUFJLFlBQVksU0FBUyxDQUFDLFdBQVc7QUFDbkMseUJBQWlCLE9BQU87QUFBQSxNQUMxQixPQUFPO0FBQ0wseUJBQWlCLE9BQU87QUFBQSxNQUMxQjtBQUVBLGdCQUFVLElBQUk7QUFBQSxJQUNoQjtBQUFBLElBQ0EsQ0FBQyxlQUFlQSxhQUFZLGVBQWUsV0FBVyxXQUFXO0FBQUEsRUFDbkU7QUFFQSxRQUFNLDZCQUF5QjtBQUFBLElBQzdCLENBQUMsVUFBK0M7QUFDOUMsVUFBSSxNQUFNLFFBQVEsV0FBVyxNQUFNLFFBQVEsSUFBSztBQUNoRCxZQUFNLGVBQWU7QUFDckIsa0JBQVksT0FBTztBQUFBLElBQ3JCO0FBQUEsSUFDQSxDQUFDLFdBQVc7QUFBQSxFQUNkO0FBRUEsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUFDLE9BQTRDLFlBQTZCO0FBQ3hFLFVBQUksTUFBTSxRQUFRLFdBQVcsTUFBTSxRQUFRLElBQUs7QUFDaEQsWUFBTSxlQUFlO0FBQ3JCLFlBQU0sZ0JBQWdCO0FBQ3RCLGtCQUFZLE9BQU87QUFBQSxJQUNyQjtBQUFBLElBQ0EsQ0FBQyxXQUFXO0FBQUEsRUFDZDtBQUVBLFFBQU0sc0JBQWtCO0FBQUEsSUFDdEIsQ0FBQyxVQUF5QixPQUFhLFFBQWM7QUFDbkQsWUFBTSxXQUFXSSxZQUFXLEtBQUs7QUFDakMsWUFBTSxTQUFTQSxZQUFXLEdBQUc7QUFDN0IsbUJBQWEsUUFBUTtBQUNyQixpQkFBVyxNQUFNO0FBQ2pCLHVCQUFpQixNQUFNO0FBQ3ZCLG1CQUFhLElBQUk7QUFDakIsc0JBQWdCLFNBQVMsU0FBUyxDQUFDO0FBQ25DLHFCQUFlLFNBQVMsWUFBWSxDQUFDO0FBQ3JDLGdCQUFVLEtBQUs7QUFDZiwrQkFBeUIsS0FBSztBQUM5QiwyQkFBcUIsUUFBUTtBQUM3Qix5QkFBbUIsS0FBSztBQUFBLElBQzFCO0FBQUEsSUFDQSxDQUFDQSxXQUFVO0FBQUEsRUFDYjtBQUVBLFFBQU0sd0JBQW9CO0FBQUEsSUFDeEIsQ0FBQyxhQUE0QjtBQUMzQixZQUFNLFFBQVFBLFlBQVcsb0JBQUksS0FBSyxDQUFDO0FBRW5DLFVBQUksYUFBYSxVQUFVO0FBQ3pCLFlBQUksdUJBQXVCO0FBQ3pCLDZCQUFtQixLQUFLO0FBQ3hCLHVCQUFhLElBQUk7QUFDakIsb0JBQVUsS0FBSztBQUNmLG1DQUF5QixLQUFLO0FBQzlCO0FBQUEsUUFDRjtBQUVBLGNBQU0sWUFBWSxrQkFBa0IsSUFBSSxLQUFLLGVBQWUsSUFBSTtBQUNoRSxjQUFNLFVBQVUsZ0JBQWdCLElBQUksS0FBSyxhQUFhLElBQUk7QUFDMUQsNkJBQXFCLFFBQVE7QUFDN0IsaUNBQXlCLElBQUk7QUFDN0IscUJBQWEsU0FBUztBQUN0QixtQkFBVyxPQUFPO0FBRWxCLFlBQUksV0FBVztBQUNiLDBCQUFnQixVQUFVLFNBQVMsQ0FBQztBQUNwQyx5QkFBZSxVQUFVLFlBQVksQ0FBQztBQUFBLFFBQ3hDO0FBRUEsWUFBSSxhQUFhLFNBQVM7QUFDeEIsMkJBQWlCLE1BQU07QUFDdkIsb0JBQVUsS0FBSztBQUFBLFFBQ2pCLE9BQU87QUFDTCwyQkFBaUIsYUFBYSxDQUFDLFVBQVUsUUFBUSxPQUFPO0FBQ3hELG9CQUFVLElBQUk7QUFBQSxRQUNoQjtBQUVBLHFCQUFhLElBQUk7QUFDakIsMkJBQW1CLEtBQUs7QUFDeEI7QUFBQSxNQUNGO0FBRUEsVUFBSSxhQUFhLFVBQVU7QUFDekIsY0FBTSxRQUFRLElBQUksS0FBSyxLQUFLO0FBQzVCLGNBQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ2pDLHdCQUFnQixVQUFVLE9BQU8sS0FBSztBQUN0QztBQUFBLE1BQ0Y7QUFFQSxVQUFJLGFBQWEsV0FBVztBQUMxQixjQUFNLFFBQVEsSUFBSSxLQUFLLEtBQUs7QUFDNUIsY0FBTSxRQUFRLE1BQU0sUUFBUSxJQUFJLEVBQUU7QUFDbEMsd0JBQWdCLFVBQVUsT0FBTyxLQUFLO0FBQ3RDO0FBQUEsTUFDRjtBQUVBLFVBQUksYUFBYSxXQUFXO0FBQzFCLGNBQU0sUUFBUSxJQUFJLEtBQUssS0FBSztBQUM1QixjQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksRUFBRTtBQUNsQyx3QkFBZ0IsVUFBVSxPQUFPLEtBQUs7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQSxJQUNBLENBQUMsaUJBQWlCLGVBQWUsaUJBQWlCLHVCQUF1QkEsV0FBVTtBQUFBLEVBQ3JGO0FBRUEsUUFBTSwyQkFBdUIsMkJBQVksQ0FBQyxXQUFnQztBQUN4RSxzQkFBa0IsTUFBTTtBQUFBLEVBQzFCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0Y7OztBYm9NVSxJQUFBRyxzQkFBQTtBQWhsQlYsSUFBTSxZQUFZO0FBQ2xCLElBQU0sY0FBYztBQUNwQixJQUFNLGVBQWU7QUFDckIsSUFBTSxrQkFBa0I7QUFDeEIsSUFBTSxnQkFBZ0I7QUFDdEIsSUFBTSxVQUFVO0FBRWhCLElBQU0sb0JBQW9CLENBQUMsV0FBbUI7QUFDNUMsUUFBTSxRQUFRLE9BQU8sVUFBVSxFQUFFLEVBQUUsS0FBSztBQUN4QyxNQUFJLENBQUMsTUFBTyxRQUFPO0FBQ25CLE1BQUksWUFBWSxLQUFLLEtBQUssRUFBRyxRQUFPO0FBQ3BDLFNBQU87QUFDVDtBQUVBLElBQU0saUJBQWlCLENBQUMsV0FBbUIsU0FBUyxLQUFLLE9BQU8sVUFBVSxFQUFFLENBQUM7QUFFN0UsSUFBTSxnQkFBZ0I7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFFQSxJQUFNLHNCQUFzQjtBQUFBLEVBQzFCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLElBQU0sY0FBYyxNQUFNO0FBQ3hCLFFBQU0sV0FBVyxPQUFPLGFBQWEsY0FBYyxTQUFTLGdCQUFnQixPQUFPO0FBQ25GLE1BQUksWUFBWSxPQUFPLFFBQVEsRUFBRSxLQUFLLEVBQUcsUUFBTyxrQkFBa0IsUUFBUTtBQUMxRSxTQUFPO0FBQ1Q7QUFFQSxJQUFNLE1BQU0sQ0FBQyxNQUFjLEVBQUUsU0FBUyxFQUFFLFNBQVMsR0FBRyxHQUFHO0FBRXZELElBQU0sUUFBUSxDQUFDLE1BQVksR0FBRyxFQUFFLFlBQVksQ0FBQyxJQUFJLElBQUksRUFBRSxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRTFGLElBQU0sYUFBYSxDQUFDLE1BQVksSUFBSSxLQUFLLEVBQUUsWUFBWSxHQUFHLEVBQUUsU0FBUyxHQUFHLEVBQUUsUUFBUSxDQUFDO0FBRW5GLElBQU0sV0FBVyxDQUFDLE1BQWM7QUFDOUIsTUFBSSxDQUFDLEVBQUcsUUFBTztBQUNmLFFBQU0sUUFBUSxFQUFFLE1BQU0sR0FBRyxFQUFFLElBQUksTUFBTTtBQUNyQyxNQUFJLE1BQU0sV0FBVyxFQUFHLFFBQU87QUFDL0IsU0FBTyxJQUFJLEtBQUssTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQztBQUNsRDtBQUVBLElBQU0sVUFBVSxDQUFDLEdBQWdCLE1BQW1CLENBQUMsRUFBRSxLQUFLLEtBQUssRUFBRSxRQUFRLE1BQU0sRUFBRSxRQUFRO0FBRTNGLElBQU0sV0FBVyxDQUFDLEdBQWdCLE1BQW1CLENBQUMsRUFBRSxLQUFLLEtBQUssRUFBRSxRQUFRLElBQUksRUFBRSxRQUFRO0FBRXhGLElBQU0saUJBQWlCLENBQUMsTUFBYyxPQUFlO0FBQ25ELE1BQUksQ0FBQyxRQUFRLENBQUMsR0FBSSxRQUFPLEVBQUUsTUFBTSxHQUFHO0FBQ3BDLFFBQU0sV0FBVyxTQUFTLElBQUk7QUFDOUIsUUFBTSxTQUFTLFNBQVMsRUFBRTtBQUMxQixNQUFJLENBQUMsWUFBWSxDQUFDLE9BQVEsUUFBTyxFQUFFLE1BQU0sR0FBRztBQUM5QyxNQUFJLFNBQVMsUUFBUSxRQUFRLEdBQUc7QUFDOUIsV0FBTyxFQUFFLE1BQU0sTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLFFBQVEsRUFBRTtBQUFBLEVBQ3BEO0FBQ0EsU0FBTyxFQUFFLE1BQU0sTUFBTSxRQUFRLEdBQUcsSUFBSSxNQUFNLE1BQU0sRUFBRTtBQUNwRDtBQUVFLElBQU0sZ0JBQWdCLENBQUMsR0FBUyxXQUFtQjtBQUNuRCxNQUFJLGVBQWUsTUFBTSxHQUFHO0FBQzFCLFVBQU0sUUFBUSxvQkFBb0IsRUFBRSxTQUFTLENBQUM7QUFDOUMsV0FBTyxHQUFHLEVBQUUsUUFBUSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsWUFBWSxDQUFDLEdBQUcsWUFBWTtBQUFBLEVBQ2xFO0FBQ0EsU0FBTyxFQUNKLG1CQUFtQixRQUFRO0FBQUEsSUFDMUIsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLElBQ1AsTUFBTTtBQUFBLEVBQ1IsQ0FBQyxFQUNBLFFBQVEsT0FBTyxFQUFFLEVBQ2pCLFlBQVk7QUFDakI7QUFFQSxJQUFNLG1CQUFtQixDQUFDLEdBQVMsV0FBbUI7QUFDcEQsTUFBSSxPQUFPLEtBQUssTUFBTSxHQUFHO0FBQ3ZCLFdBQU8sSUFBSSxLQUFLLGVBQWUsUUFBUSxFQUFFLE1BQU0sV0FBVyxPQUFPLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQztBQUFBLEVBQ3JGO0FBQ0EsTUFBSSxlQUFlLE1BQU0sR0FBRztBQUMxQixXQUFPLEdBQUcsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUM7QUFBQSxFQUMxRDtBQUNBLFFBQU0sWUFBWSxFQUFFLG1CQUFtQixRQUFRLEVBQUUsT0FBTyxPQUFPLENBQUM7QUFDaEUsUUFBTSxlQUFlLGFBQWEsV0FBVyxLQUFLLFVBQVUsQ0FBQyxDQUFDLElBQzFELFVBQVUsQ0FBQyxFQUFFLGtCQUFrQixNQUFNLElBQUksVUFBVSxNQUFNLENBQUMsSUFDMUQ7QUFDSixTQUFPLEdBQUcsWUFBWSxJQUFJLEVBQUUsWUFBWSxDQUFDO0FBQzNDO0FBRUEsSUFBTSxpQkFBaUIsQ0FBQyxVQUFrQjtBQUN4QyxNQUFJLENBQUMsTUFBTyxRQUFPO0FBQ25CLFFBQU0sTUFBTSxPQUFPLEtBQUssRUFBRSxLQUFLO0FBQy9CLE1BQUksQ0FBQyxJQUFLLFFBQU87QUFFakIsUUFBTSxXQUFXLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUFFLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFFL0MsTUFBSSxzQkFBc0IsS0FBSyxRQUFRLEdBQUc7QUFDeEMsVUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksU0FBUyxNQUFNLEdBQUcsRUFBRSxJQUFJLE1BQU07QUFDaEQsV0FBTyxJQUFJLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQztBQUFBLEVBQzdCO0FBRUEsTUFBSSw4QkFBOEIsS0FBSyxRQUFRLEdBQUc7QUFDaEQsVUFBTSxRQUFRLFNBQVMsTUFBTSxPQUFPLEVBQUUsSUFBSSxNQUFNO0FBQ2hELFVBQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJO0FBQ2xCLFdBQU8sSUFBSSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUM7QUFBQSxFQUM3QjtBQUVBLFFBQU0sU0FBUyxJQUFJLEtBQUssR0FBRztBQUMzQixTQUFPLE9BQU8sTUFBTSxPQUFPLFFBQVEsQ0FBQyxJQUFJLE9BQU87QUFDakQ7QUFFQSxJQUFNLGtCQUFrQixDQUFDLE9BQWUsV0FBbUI7QUFDekQsTUFBSSxDQUFDLE1BQU8sUUFBTyxFQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksS0FBSyxHQUFHO0FBQ2xELFFBQU0sSUFBSSxlQUFlLEtBQUs7QUFDOUIsTUFBSSxDQUFDLEVBQUcsUUFBTyxFQUFFLE1BQU0sSUFBSSxPQUFPLElBQUksS0FBSyxHQUFHO0FBQzlDLE1BQUksUUFBUTtBQUNaLE1BQUksZUFBZSxNQUFNLEdBQUc7QUFDMUIsWUFBUSxvQkFBb0IsRUFBRSxTQUFTLENBQUMsS0FBSztBQUFBLEVBQy9DLE9BQU87QUFDTCxZQUFRLEVBQUUsbUJBQW1CLFFBQVEsRUFBRSxPQUFPLFFBQVEsQ0FBQyxFQUFFLFFBQVEsT0FBTyxFQUFFO0FBQUEsRUFDNUU7QUFDQSxTQUFPO0FBQUEsSUFDTCxNQUFNLE9BQU8sRUFBRSxZQUFZLENBQUM7QUFBQSxJQUM1QixPQUFPLE1BQU0sWUFBWTtBQUFBLElBQ3pCLEtBQUssT0FBTyxFQUFFLFFBQVEsQ0FBQyxFQUFFLFNBQVMsR0FBRyxHQUFHO0FBQUEsRUFDMUM7QUFDRjtBQUVBLElBQU0sY0FBYyxDQUFDLE9BQWUsV0FBbUI7QUFDckQsTUFBSSxDQUFDLE1BQU8sUUFBTztBQUNuQixRQUFNLFFBQVEsTUFBTSxrQkFBa0IsTUFBTTtBQUM1QyxNQUFJO0FBQ0YsV0FBTyxNQUFNLFFBQVEseUJBQXlCLENBQUMsUUFBUSxRQUFRLE9BQU8sR0FBRyxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsTUFBTSxDQUFDLEVBQUU7QUFBQSxFQUNsSCxRQUFRO0FBQ04sV0FBTyxNQUFNLFFBQVEsbUJBQW1CLENBQUMsUUFBUSxRQUFRLE9BQU8sR0FBRyxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsTUFBTSxDQUFDLEVBQUU7QUFBQSxFQUM1RztBQUNGO0FBRUEsSUFBTSxpQkFBaUIsQ0FBQyxPQUFlLFdBQW1CO0FBQ3hELE1BQUksQ0FBQyxNQUFPLFFBQU87QUFDbkIsUUFBTSxVQUFVLE1BQU0sS0FBSztBQUMzQixNQUFJLENBQUMsUUFBUyxRQUFPO0FBQ3JCLFFBQU0sUUFBUSxRQUFRLGtCQUFrQixNQUFNO0FBQzlDLFNBQU8sTUFBTSxDQUFDLEVBQUUsa0JBQWtCLE1BQU0sSUFBSSxNQUFNLE1BQU0sQ0FBQztBQUMzRDtBQUVBLElBQU0sYUFBYSxDQUFDLFNBQWlCLFNBQW1DO0FBQ3RFLE1BQUksT0FBTyxXQUFXLFlBQWE7QUFDbkMsUUFBTSxZQUFhLE9BQWU7QUFDbEMsTUFBSSxjQUFjLEtBQU07QUFDeEIsTUFBSSxNQUFNO0FBQ1IsWUFBUSxNQUFNLGFBQWEsU0FBUyxJQUFJO0FBQUEsRUFDMUMsT0FBTztBQUNMLFlBQVEsTUFBTSxhQUFhLE9BQU87QUFBQSxFQUNwQztBQUNGO0FBR08sSUFBTSxjQUFjLENBQUMsRUFBRSxrQkFBa0IsSUFBSSxnQkFBZ0IsR0FBRyxNQUFhO0FBQ2xGLFFBQU0sYUFBUyx3QkFBUSxNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDOUMsUUFBTSxpQkFBaUIsVUFBVSxxQkFBcUIsTUFBTTtBQUM1RCxRQUFNLGlCQUFpQixVQUFVLG9CQUFvQixLQUFLO0FBQzFELFFBQU0sYUFBYSxLQUFLLGlCQUFpQixTQUFTO0FBRWxELFFBQU0sbUJBQWUsdUJBQThCLElBQUk7QUFDdkQsUUFBTSxpQkFBYSx1QkFBOEIsSUFBSTtBQUNyRCxRQUFNLG9CQUFnQix1QkFBOEIsSUFBSTtBQUV4RCxRQUFNLENBQUMsV0FBVyxZQUFZLFFBQUkseUJBQVMsZUFBZTtBQUUxRCxRQUFNLEVBQUUsa0JBQWtCLGtCQUFrQixtQkFBbUIsaUJBQWlCLElBQUksc0JBQXNCO0FBQzFHLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsSUFBSSx1QkFBdUI7QUFBQSxJQUN6QjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLEVBQUUsT0FBTyxPQUFPLGFBQWEsV0FBVyxjQUFjLGdCQUFnQixpQkFBaUIsd0JBQXdCLGlCQUFpQixJQUNwSSxxQkFBcUI7QUFBQSxJQUNuQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxVQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLEVBQ1gsQ0FBQztBQUVILGdDQUFVLE1BQU07QUFDZCxlQUFXLFFBQVEsRUFBRSxpQkFBaUIsY0FBYyxDQUFDO0FBQUEsRUFDdkQsR0FBRyxDQUFDLGlCQUFpQixhQUFhLENBQUM7QUFFbkMsUUFBTSxtQkFBZTtBQUFBLElBQ25CLENBQUMsWUFBdUU7QUFDdEUsVUFBSSxDQUFDLG9CQUFvQixFQUFHO0FBQzVCLFVBQUksQ0FBQyxhQUFhLENBQUMsUUFBUztBQUU1QixZQUFNLGFBQWEsZUFBZSxlQUFlLFdBQVc7QUFDNUQsWUFBTSxPQUFPLFNBQVMsUUFBUTtBQUM5QixZQUFNLFlBQVksR0FBRyxXQUFXLElBQUksSUFBSSxXQUFXLEVBQUUsSUFBSSxlQUFlLElBQUksSUFBSTtBQUVoRixVQUFJLFNBQVMsU0FBUyxpQkFBaUIsWUFBWSxXQUFXO0FBQzVELHVCQUFlLE1BQU0sRUFBRSxVQUFVLFdBQVcsTUFBTSxRQUFRLFdBQVcsSUFBSSxZQUFZLGdCQUFnQixDQUFDO0FBQUEsTUFDeEc7QUFFQSx5QkFBbUIsS0FBSztBQUN4QixVQUFJLFNBQVMsWUFBWTtBQUN2QixrQkFBVSxLQUFLO0FBQ2YsdUJBQWUsS0FBSztBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxpQkFBaUIsU0FBUyxlQUFlLGdCQUFnQixXQUFXLGFBQWEsbUJBQW1CO0FBQUEsRUFDdkc7QUFFQSxRQUFNLGFBQWEsS0FBSyxNQUFNLFNBQVMsS0FBSyxTQUFTO0FBR3JELFFBQU0sc0JBQWtCLDRCQUFZLE1BQU07QUFDeEMsUUFBSSxDQUFDLGNBQWMsV0FBVyxjQUFjLEdBQUc7QUFDN0MsbUJBQWEsZUFBZTtBQUM1QjtBQUFBLElBQ0Y7QUFDQSxVQUFNLFNBQVMsY0FBYyxRQUFRLGdCQUFnQjtBQUNyRCxVQUFNLE9BQU8sS0FBSyxJQUFJLGlCQUFpQixTQUFTLGdCQUFnQixPQUFPO0FBQ3ZFLGlCQUFhLENBQUMsU0FBVSxLQUFLLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxPQUFPLElBQUs7QUFBQSxFQUNsRSxHQUFHLENBQUMsVUFBVSxDQUFDO0FBRWYsMEJBQXdCO0FBQUEsSUFDdEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBR0QsZ0NBQVUsTUFBTTtBQUNkLFFBQUksaUJBQWlCLFFBQVM7QUFDOUIscUJBQWlCLFVBQVU7QUFDM0IsVUFBTSxTQUFTLGtCQUFrQixJQUFJLGlCQUFpQixJQUFJO0FBQzFELFFBQUksVUFBVSxPQUFPLFlBQVksT0FBTyxRQUFRO0FBQzlDLGlCQUFXLGlCQUFpQixNQUFNO0FBQ2xDLFlBQU0sZ0JBQWdCLGtCQUFrQixNQUFNO0FBQzlDLFVBQUksZUFBZTtBQUNqQiwrQkFBdUIsVUFBVTtBQUNqQyx1QkFBZSxjQUFjLE1BQU0sY0FBYyxRQUFRO0FBQ3pELHVCQUFlLEtBQUs7QUFDcEIsa0JBQVUsS0FBSztBQUNmLDZCQUFxQixVQUFVO0FBQy9CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGlCQUFpQiwyQkFBMkI7QUFDbEQsUUFBSSxnQkFBZ0I7QUFDbEIsNkJBQXVCLFVBQVU7QUFDakMscUJBQWUsZUFBZSxNQUFNLGVBQWUsUUFBUTtBQUMzRCxxQkFBZSxLQUFLO0FBQ3BCLGdCQUFVLEtBQUs7QUFDZiwyQkFBcUIsVUFBVTtBQUMvQjtBQUFBLElBQ0Y7QUFFQSx3QkFBb0I7QUFDcEIscUJBQWlCO0FBQ2pCLG9CQUFnQjtBQUNoQixtQkFBZSxJQUFJO0FBQ25CLGNBQVUsS0FBSztBQUFBLEVBQ2pCLEdBQUc7QUFBQSxJQUNEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUdELGdDQUFVLE1BQU07QUFDZCxRQUFJLGFBQWEsQ0FBQyxXQUFXLGtCQUFrQixTQUFTO0FBQ3RELHVCQUFpQixLQUFLO0FBQ3RCO0FBQUEsSUFDRjtBQUNBLFFBQUksQ0FBQyxhQUFhLGtCQUFrQixTQUFTO0FBQzNDLHVCQUFpQixPQUFPO0FBQUEsSUFDMUI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxXQUFXLFNBQVMsYUFBYSxDQUFDO0FBRXRDLFFBQU0sa0JBQWM7QUFBQSxJQUNsQixDQUFDLFVBQTRCO0FBQzNCLHVCQUFpQixLQUFLO0FBQ3RCLHVCQUFpQjtBQUNqQixzQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLElBQ0EsQ0FBQyxrQkFBa0Isa0JBQWtCLGVBQWU7QUFBQSxFQUN0RDtBQUVBLFFBQU0seUJBQXFCLDRCQUFZLE1BQU07QUFDM0Msd0JBQW9CO0FBQ3BCLHFCQUFpQjtBQUNqQixvQkFBZ0I7QUFDaEIsY0FBVSxLQUFLO0FBQ2YsbUJBQWUsSUFBSTtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxrQkFBa0IsaUJBQWlCLHFCQUFxQixXQUFXLGNBQWMsQ0FBQztBQUV0RixRQUFNLHFCQUFpQjtBQUFBLElBQ3JCLENBQUMsV0FBbUI7QUFDbEIsVUFBSSxDQUFDLGdCQUFnQjtBQUNuQiw0QkFBb0I7QUFDcEI7QUFBQSxNQUNGO0FBQ0EsaUJBQVcsTUFBTTtBQUNmLHlCQUFpQjtBQUFBLFVBQ2YsVUFBVSxpQkFBaUI7QUFBQSxVQUMzQixRQUFRLGVBQWU7QUFBQSxVQUN2QixNQUFNO0FBQUEsVUFDTixlQUFlLGdCQUFnQixTQUFTO0FBQUEsVUFDeEMsWUFBWSxnQkFBZ0IsUUFBUTtBQUFBLFFBQ3RDLENBQUM7QUFDRCxjQUFNLFNBQVMsbUJBQW1CLE1BQU07QUFDeEMsZUFBTyxTQUFTLE9BQU8sb0JBQW9CLE1BQU07QUFBQSxNQUNuRCxHQUFHLFlBQVk7QUFBQSxJQUNqQjtBQUFBLElBQ0EsQ0FBQyxnQkFBZ0IsYUFBYSxlQUFlLGtCQUFrQixhQUFhLGNBQWM7QUFBQSxFQUM1RjtBQUVBLFFBQU0sZUFBVyx3QkFBUSxNQUFNO0FBQzdCLFVBQU0sV0FBVyxJQUFJLEtBQUssYUFBYSxjQUFjLENBQUM7QUFDdEQsVUFBTSxjQUFjLElBQUksS0FBSyxhQUFhLGVBQWUsR0FBRyxDQUFDLEVBQUUsUUFBUTtBQUN2RSxVQUFNLFVBQVUsU0FBUyxPQUFPLElBQUksS0FBSztBQUN6QyxVQUFNLFFBQXdCLENBQUM7QUFDL0IsYUFBUyxJQUFJLEdBQUcsSUFBSSxRQUFRLEtBQUs7QUFDL0IsWUFBTSxLQUFLLEVBQUUsTUFBTSxNQUFNLEtBQUssSUFBSSxTQUFTLEtBQUssQ0FBQztBQUFBLElBQ25EO0FBQ0EsYUFBUyxJQUFJLEdBQUcsS0FBSyxhQUFhLEtBQUs7QUFDckMsWUFBTSxVQUFVLElBQUksS0FBSyxhQUFhLGNBQWMsQ0FBQztBQUNyRCxZQUFNLEtBQUssRUFBRSxNQUFNLFNBQVMsS0FBSyxNQUFNLE9BQU8sR0FBRyxTQUFTLE1BQU0sQ0FBQztBQUFBLElBQ25FO0FBQ0EsV0FBTztBQUFBLE1BQ0w7QUFBQSxNQUNBLE9BQU8saUJBQWlCLFVBQVUsTUFBTTtBQUFBLElBQzFDO0FBQUEsRUFDRixHQUFHLENBQUMsY0FBYyxhQUFhLE1BQU0sQ0FBQztBQUV0QyxRQUFNLGFBQWEsWUFBWSxrQkFBa0IsUUFBUSxZQUFZO0FBRXJFLFFBQU0sc0JBQWtCO0FBQUEsSUFDdEIsQ0FBQyxVQUErQztBQUM5QyxZQUFNLGdCQUFnQjtBQUN0QixzQkFBZ0IsQ0FBQyxTQUFTO0FBQ3hCLGNBQU0sT0FBTyxPQUFPO0FBQ3BCLFlBQUksT0FBTyxHQUFHO0FBQ1oseUJBQWUsQ0FBQyxTQUFTLE9BQU8sQ0FBQztBQUNqQyxpQkFBTztBQUFBLFFBQ1Q7QUFDQSxlQUFPO0FBQUEsTUFDVCxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsQ0FBQyxpQkFBaUIsY0FBYztBQUFBLEVBQ2xDO0FBRUEsUUFBTSxzQkFBa0I7QUFBQSxJQUN0QixDQUFDLFVBQStDO0FBQzlDLFlBQU0sZ0JBQWdCO0FBQ3RCLHNCQUFnQixDQUFDLFNBQVM7QUFDeEIsY0FBTSxPQUFPLE9BQU87QUFDcEIsWUFBSSxPQUFPLElBQUk7QUFDYix5QkFBZSxDQUFDLFNBQVMsT0FBTyxDQUFDO0FBQ2pDLGlCQUFPO0FBQUEsUUFDVDtBQUNBLGVBQU87QUFBQSxNQUNULENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxDQUFDLGlCQUFpQixjQUFjO0FBQUEsRUFDbEM7QUFFQSxRQUFNLDJCQUF1Qiw0QkFBWSxNQUFNO0FBQzdDLGlCQUFhLElBQUk7QUFBQSxFQUNuQixHQUFHLENBQUMsWUFBWSxDQUFDO0FBRWpCLFFBQU0sMkJBQXVCO0FBQUEsSUFDM0IsQ0FBQyxTQUErQjtBQUM5QixVQUFJLENBQUMsS0FBSyxLQUFNO0FBQ2hCLGlCQUFXLFlBQVksRUFBRSxNQUFNLEtBQUssT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDO0FBQzFFLG1CQUFhLEtBQUssSUFBSTtBQUFBLElBQ3hCO0FBQUEsSUFDQSxDQUFDLFlBQVk7QUFBQSxFQUNmO0FBRUEsUUFBTSwyQkFBdUI7QUFBQSxJQUMzQixDQUFDLFNBQStCO0FBQzlCLFVBQUksQ0FBQyxLQUFLLEtBQU07QUFDaEIsVUFBSSxrQkFBa0IsU0FBUyxXQUFXO0FBQ3hDLHFCQUFhLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ2xDO0FBQUEsSUFDRjtBQUFBLElBQ0EsQ0FBQyxlQUFlLGNBQWMsU0FBUztBQUFBLEVBQ3pDO0FBRUEsUUFBTSxxQkFBaUIsd0JBQWdDLE1BQU07QUFDM0QsV0FBTyxTQUFTLE1BQU0sSUFBSSxDQUFDLE1BQU0sUUFBUTtBQUN2QyxVQUFJLEtBQUssU0FBUztBQUNoQixlQUFPLEVBQUUsS0FBSyxTQUFTLEdBQUcsSUFBSSxTQUFTLEtBQUs7QUFBQSxNQUM5QztBQUVBLFlBQU0sVUFBVSxLQUFLO0FBQ3JCLFlBQU0sVUFBVSxRQUFRLFNBQVMsU0FBUztBQUMxQyxZQUFNLFFBQVEsUUFBUSxTQUFTLE9BQU87QUFDdEMsWUFBTSxVQUFVLGFBQWEsY0FBYyxTQUFTLFdBQVcsT0FBTyxLQUFLLFNBQVMsU0FBUyxVQUFVO0FBQ3ZHLFlBQU0sYUFBYSxhQUFhLENBQUMsV0FBVyxhQUFhLFNBQVMsV0FBVyxPQUFPLEtBQUssU0FBUyxTQUFTLFNBQVM7QUFDcEgsWUFBTSxXQUFXLGtCQUFrQixTQUFTLENBQUMsQ0FBQyxhQUFhLFNBQVMsU0FBUyxTQUFTO0FBQ3RGLFlBQU0sVUFBVSxRQUFRLFNBQVMsb0JBQUksS0FBSyxDQUFDO0FBRTNDLFlBQU0sV0FBVztBQUFBLFFBQ2Y7QUFBQSxRQUNBLFVBQVUsc0JBQXNCO0FBQUEsUUFDaEMsUUFBUSxrQkFBa0I7QUFBQSxRQUMxQixVQUFVLGFBQWE7QUFBQSxRQUN2QixhQUFhLGdCQUFnQjtBQUFBLFFBQzdCLFdBQVcsYUFBYTtBQUFBLFFBQ3hCLFVBQVUsVUFBVTtBQUFBLE1BQ3RCO0FBRUEsYUFBTztBQUFBLFFBQ0wsS0FBSyxLQUFLO0FBQUEsUUFDVixTQUFTO0FBQUEsUUFDVCxNQUFNO0FBQUEsUUFDTixLQUFLLEtBQUs7QUFBQSxRQUNWLFVBQVUsUUFBUSxRQUFRO0FBQUEsUUFDMUI7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLFNBQVMsT0FBTyxTQUFTLFdBQVcsWUFBWSxlQUFlLFNBQVMsQ0FBQztBQUU3RSxRQUFNLEVBQUUsY0FBYyxJQUFJLHdCQUF3QjtBQUFBLElBQ2hEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxRQUFNLFlBQVksZUFBZSxLQUFLLGdCQUFnQixNQUFNLEdBQUcsTUFBTTtBQUNyRSxRQUFNLFVBQVUsZUFBZSxLQUFLLGNBQWMsSUFBSSxHQUFHLE1BQU07QUFDL0QsUUFBTSxjQUFjO0FBQ3BCLFFBQU0sWUFBWTtBQUNsQixRQUFNLGNBQWMsS0FBSyx1QkFBdUIsTUFBTTtBQUN0RCxRQUFNLGVBQWUsS0FBSyxtQkFBbUIsVUFBVTtBQUN2RCxRQUFNLGtCQUFrQixLQUFLLHNCQUFzQixhQUFhO0FBQ2hFLFFBQU0saUJBQWlCLEtBQUsscUJBQXFCLGdCQUFnQjtBQUNqRSxRQUFNLGlCQUFpQixLQUFLLHFCQUFxQixZQUFZO0FBQzdELFFBQU0seUJBQXlCLEtBQUssOEJBQThCLG1CQUFtQjtBQUNyRixRQUFNLHVCQUF1QixLQUFLLDRCQUE0QixpQkFBaUI7QUFDL0UsUUFBTSxvQkFBZ0I7QUFBQSxJQUNwQixNQUFNO0FBQUEsTUFDSixLQUFLLG1CQUFtQixLQUFLO0FBQUEsTUFDN0IsS0FBSyxtQkFBbUIsS0FBSztBQUFBLE1BQzdCLEtBQUssbUJBQW1CLEtBQUs7QUFBQSxNQUM3QixLQUFLLG1CQUFtQixLQUFLO0FBQUEsTUFDN0IsS0FBSyxtQkFBbUIsS0FBSztBQUFBLE1BQzdCLEtBQUssbUJBQW1CLEtBQUs7QUFBQSxNQUM3QixLQUFLLG1CQUFtQixLQUFLO0FBQUEsSUFDL0I7QUFBQSxJQUNBLENBQUM7QUFBQSxFQUNIO0FBQ0EsUUFBTSxhQUFhLEtBQUssd0JBQXdCLE9BQU87QUFDdkQsUUFBTSxhQUFhLEtBQUssd0JBQXdCLE9BQU87QUFDdkQsUUFBTSxjQUFjLEtBQUsseUJBQXlCLFFBQVE7QUFDMUQsUUFBTSxtQkFBbUIsS0FBSyx3QkFBd0IsTUFBTTtBQUM1RCxRQUFNLGtCQUFrQixLQUFLLHVCQUF1QixRQUFRO0FBQzVELFFBQU0sbUJBQW1CLEtBQUssd0JBQXdCLFNBQVM7QUFDL0QsUUFBTSxtQkFBbUIsS0FBSyx3QkFBd0IsU0FBUztBQUMvRCxRQUFNLGlCQUFpQixLQUFLLHNCQUFzQixPQUFPO0FBQ3pELFFBQU0sZ0JBQWdCLEtBQUsscUJBQXFCLFVBQVU7QUFDMUQsUUFBTSxnQkFBZ0IsS0FBSyxxQkFBcUIsTUFBTTtBQUN0RCxRQUFNLGdCQUFnQixLQUFLLHFCQUFxQixNQUFNO0FBQ3RELFFBQU0sbUJBQWU7QUFBQSxJQUNuQixNQUFNO0FBQUEsTUFDSixFQUFFLElBQUksVUFBbUIsT0FBTyxpQkFBaUI7QUFBQSxNQUNqRCxFQUFFLElBQUksVUFBbUIsT0FBTyxnQkFBZ0I7QUFBQSxNQUNoRCxFQUFFLElBQUksV0FBb0IsT0FBTyxpQkFBaUI7QUFBQSxNQUNsRCxFQUFFLElBQUksV0FBb0IsT0FBTyxpQkFBaUI7QUFBQSxJQUNwRDtBQUFBLElBQ0EsQ0FBQyxrQkFBa0IsaUJBQWlCLGtCQUFrQixnQkFBZ0I7QUFBQSxFQUN4RTtBQUNBLFFBQU0sdUJBQW1CO0FBQUEsSUFDdkIsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLENBQUMsZ0JBQWdCLGVBQWUsZUFBZSxhQUFhO0FBQUEsRUFDOUQ7QUFDQSxRQUFNLG9CQUFvQjtBQUMxQixRQUFNLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNyRCxRQUFNLGNBQWMsQ0FBQztBQUNyQixRQUFNLG1CQUFtQixDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNoRCxRQUFNLG9CQUNKLENBQUMsQ0FBQyxhQUNGLENBQUMsQ0FBQyxXQUNGLENBQUMsV0FDQSxzQkFBc0IsWUFBWTtBQUNyQyxRQUFNLG1CQUFtQixzQkFBc0IsWUFBWTtBQUUzRCxTQUNFLDhDQUFDLFNBQUksV0FBVSxzREFDWjtBQUFBLG1CQUNDLDZDQUFDLFNBQUksV0FBVSx5REFDYjtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0Msa0JBQWtCO0FBQUEsUUFDbEIsZ0JBQWdCO0FBQUEsUUFDaEIsV0FBVyxZQUFZLGNBQWMsV0FBVyxNQUFNLElBQUk7QUFBQSxRQUMxRCxTQUFTLFVBQVUsY0FBYyxTQUFTLE1BQU0sSUFBSTtBQUFBLFFBQ3BEO0FBQUEsUUFDQSxhQUFhLGdCQUFnQixRQUFRO0FBQUEsUUFDckMsWUFBWSxDQUFDLENBQUM7QUFBQTtBQUFBLElBQ2hCLEdBQ0Y7QUFBQSxJQUVELGVBQ0QsNkNBQUMsU0FBSSxXQUFVLDJEQUNiLHdEQUFDLFNBQUksV0FBVSxrREFDYjtBQUFBLG1EQUFDLFNBQUksV0FBVSxnREFBK0MsY0FBWSxhQUN2RSx1QkFBYSxJQUFJLENBQUMsU0FBUztBQUMxQixjQUFNLFdBQVcsc0JBQXNCLEtBQUs7QUFDNUMsZUFDRTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBRUMsT0FBTyxLQUFLO0FBQUEsWUFDWixRQUFRO0FBQUEsWUFDUixXQUFVO0FBQUEsWUFDVixTQUFTLE1BQU0sa0JBQWtCLEtBQUssRUFBRTtBQUFBO0FBQUEsVUFKbkMsS0FBSztBQUFBLFFBS1o7QUFBQSxNQUVKLENBQUMsR0FDSDtBQUFBLE1BRUMscUJBQ0M7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLGtCQUFrQjtBQUFBLFVBQ2xCLGdCQUFnQjtBQUFBLFVBQ2hCLFdBQVcsWUFBWSxjQUFjLFdBQVcsTUFBTSxJQUFJO0FBQUEsVUFDMUQsU0FBUyxVQUFVLGNBQWMsU0FBUyxNQUFNLElBQUk7QUFBQSxVQUNwRCxXQUFVO0FBQUE7QUFBQSxNQUNaO0FBQUEsTUFHRCxvQkFDQztBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0M7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsZ0JBQWdCLG1CQUFtQixDQUFDO0FBQUEsVUFDcEMsY0FBYyxtQkFBbUIsQ0FBQztBQUFBLFVBQ2xDO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0EsZUFBZSxZQUFZLGNBQWMsV0FBVyxNQUFNLElBQUk7QUFBQSxVQUM5RCxhQUFhLFVBQVUsY0FBYyxTQUFTLE1BQU0sSUFBSTtBQUFBLFVBQ3hEO0FBQUEsVUFDQSxrQkFBa0IsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQUEsVUFDbkMsWUFBWSxTQUFTO0FBQUEsVUFDckI7QUFBQSxVQUNBLFlBQVksa0JBQWtCLFVBQVUseUJBQXlCO0FBQUEsVUFDakUsVUFBVTtBQUFBLFVBQ1Y7QUFBQSxVQUNBO0FBQUEsVUFDQSxlQUFlO0FBQUEsVUFDZixvQkFBb0I7QUFBQSxVQUNwQixrQkFBa0I7QUFBQSxVQUNsQixTQUFTO0FBQUEsVUFDVCxhQUFhO0FBQUEsVUFDYixhQUFhO0FBQUEsVUFDYixrQkFBa0I7QUFBQSxVQUNsQixZQUFZO0FBQUEsVUFDWixZQUFZO0FBQUE7QUFBQSxNQUNkO0FBQUEsTUFHRjtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBRUMsT0FBTztBQUFBLFVBQ1AsWUFBWTtBQUFBLFVBQ1osT0FBTyxLQUFLLHlCQUF5QixRQUFRO0FBQUEsVUFDN0MsYUFBYSxLQUFLLHlCQUF5QixRQUFRO0FBQUEsVUFDbkQsU0FBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBTztBQUFBLFVBQ1AsaUJBQWdCO0FBQUE7QUFBQSxRQVJYO0FBQUEsTUFTUDtBQUFBLE1BRUMscUJBQ0MsOENBQUMsU0FBSSxXQUFVLHNEQUNiO0FBQUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLE9BQU87QUFBQSxZQUNQLFdBQVU7QUFBQSxZQUNWLFNBQVM7QUFBQTtBQUFBLFFBQ1g7QUFBQSxRQUNBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxPQUFPO0FBQUEsWUFDUCxXQUFVO0FBQUEsWUFDVixTQUFTLE1BQU07QUFDYiwyQkFBYSxFQUFFLFlBQVksTUFBTSxNQUFNLEVBQUUsQ0FBQztBQUFBLFlBQzVDO0FBQUE7QUFBQSxRQUNGO0FBQUEsU0FDRjtBQUFBLE9BRUosR0FDRjtBQUFBLElBR0EsNkNBQUMsV0FBTSxNQUFLLFVBQVMsSUFBRyxZQUFXLE9BQU8sZUFBZSxVQUFRLE1BQUM7QUFBQSxJQUNsRSw2Q0FBQyxXQUFNLE1BQUssVUFBUyxJQUFHLFVBQVMsT0FBTyxhQUFhLFVBQVEsTUFBQztBQUFBLElBRTlEO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxJQUFHO0FBQUEsUUFDSCxXQUFVO0FBQUEsUUFDVixPQUFPLEVBQUUsU0FBUyxZQUFZLFNBQVMsT0FBTztBQUFBLFFBRTlDO0FBQUEsdURBQUMsU0FBSSxXQUFVLHVCQUFzQixTQUFRLGFBQVksTUFBSyxVQUFTLGNBQVksS0FBSyxtQkFBbUIsU0FBUyxHQUNsSCx1REFBQyxZQUFPLFdBQVUsdUJBQXNCLElBQUcsTUFBSyxJQUFHLE1BQUssR0FBRSxLQUFJLGFBQVksS0FBSSxHQUNoRjtBQUFBLFVBQ0MsS0FBSyxtQkFBbUIsU0FBUztBQUFBO0FBQUE7QUFBQSxJQUNwQztBQUFBLElBRUMsZUFDQyw4RUFDRTtBQUFBO0FBQUEsUUFBQztBQUFBO0FBQUEsVUFDQyxPQUFPO0FBQUEsVUFDUCxZQUFZLEtBQUsseUJBQXlCLHlCQUF5QjtBQUFBLFVBQ25FO0FBQUEsVUFDQSxZQUFZO0FBQUE7QUFBQSxNQUNkO0FBQUEsTUFFQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsS0FBSztBQUFBLFVBQ0w7QUFBQSxVQUNBO0FBQUEsVUFDQSxZQUFZO0FBQUEsVUFDWixjQUFjLENBQUMsU0FBUyxlQUFlLElBQUk7QUFBQSxVQUMzQyxRQUFRO0FBQUE7QUFBQSxNQUNWO0FBQUEsT0FDRjtBQUFBLElBRUQsa0JBQ0M7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLE9BQU07QUFBQSxRQUNOLFdBQVcsS0FBSyxpQkFBaUIsUUFBUTtBQUFBLFFBQ3pDLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQSxLQUVKO0FBRUo7QUFHTyxJQUFNLG1CQUFtQixDQUFDLFNBQXNCO0FBQ3JELFFBQU0sa0JBQWtCLEtBQUssYUFBYSxtQkFBbUIsS0FBSztBQUNsRSxRQUFNLGdCQUFnQixLQUFLLGFBQWEsaUJBQWlCLEtBQUs7QUFFOUQsbUJBQWlCLE1BQU0sNkNBQUMsZUFBWSxpQkFBa0MsZUFBOEIsQ0FBRTtBQUN4RztBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLFFBQU0sU0FBUyxTQUFTLGVBQWUsc0JBQXNCO0FBQzdELE1BQUksQ0FBQyxPQUFRO0FBQ2IsbUJBQWlCLE1BQU07QUFDekI7QUFFQSx1QkFBdUIsS0FBSztBQUU1QixJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIlJlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAidG9UaXRsZUNhc2UiLCAiZm9ybWF0RGF0ZVBhcnRzIiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVSYW5nZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAicGFyc2VEYXRlVmFsdWUiLCAicGFyc2VJU08iLCAidG9JU08iLCAic3RhcnRPZkRheSIsICJpc0JlZm9yZSIsICJuZXdTdGFydCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
