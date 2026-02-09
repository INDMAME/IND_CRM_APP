import {
  ClientSearchCombobox_default
} from "./chunks/chunk-DEIU5YG5.js";
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
var import_react8 = __toESM(require_react());

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
var import_react2 = __toESM(require_react());
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
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
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

// Web/wwwroot/react/src/components/commons/FloatingActionButton.tsx
var import_react3 = __toESM(require_react());
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
  const btnRef = (0, import_react3.useRef)(null);
  const canvasRef = (0, import_react3.useRef)(null);
  const buildFabSvg = (0, import_react3.useCallback)(() => {
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
  const renderSvgToCanvas = (0, import_react3.useCallback)(() => {
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
  (0, import_react3.useEffect)(() => {
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
var import_react4 = __toESM(require_react());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var DEFAULT_WINDOW = 6;
var CompactPagination = (0, import_react4.forwardRef)(
  ({ totalPages, currentPage, pageWindow = DEFAULT_WINDOW, onPageChange, labels, className }, ref) => {
    const safeTotal = Math.max(0, totalPages || 0);
    const safeCurrent = Math.min(Math.max(1, currentPage || 1), safeTotal || 1);
    const windowSize = Math.max(1, pageWindow || DEFAULT_WINDOW);
    const showPagination = safeTotal > 1;
    const showEdgeNav = safeTotal > windowSize;
    const canJumpToStart = safeCurrent > windowSize;
    const canGoPrev = safeCurrent > 1;
    const canGoNext = safeCurrent < safeTotal;
    const pageNumbers = (0, import_react4.useMemo)(() => {
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
var import_react5 = __toESM(require_react());
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
  const [items, setItems] = (0, import_react5.useState)([]);
  const [total, setTotal] = (0, import_react5.useState)(0);
  const [currentPage, setCurrentPage] = (0, import_react5.useState)(1);
  const [isLoading, setIsLoading] = (0, import_react5.useState)(false);
  const [errorMessage, setErrorMessage] = (0, import_react5.useState)("");
  const retryOnNetworkErrorRef = (0, import_react5.useRef)(false);
  const activeAbortRef = (0, import_react5.useRef)(null);
  const activeRequestIdRef = (0, import_react5.useRef)(0);
  const retryTimerRef = (0, import_react5.useRef)(null);
  const lastSignatureRef = (0, import_react5.useRef)("");
  const clearRetryTimer = (0, import_react5.useCallback)(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);
  const abortActiveRequest = (0, import_react5.useCallback)(() => {
    if (!activeAbortRef.current) return;
    try {
      activeAbortRef.current.abort();
    } catch {
    }
    activeAbortRef.current = null;
  }, []);
  const resetActivities = (0, import_react5.useCallback)(() => {
    clearRetryTimer();
    abortActiveRequest();
    setItems([]);
    setTotal(0);
    setErrorMessage("");
    setIsLoading(false);
  }, [abortActiveRequest, clearRetryTimer]);
  const loadActivities = (0, import_react5.useCallback)(
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
  (0, import_react5.useEffect)(() => {
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
var import_react6 = __toESM(require_react());
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
  const readCachedFilter = (0, import_react6.useCallback)(() => {
    const parsed = getSessionJsonWithExpiry(HISTORY_FILTER_KEY);
    return normalizeCachedFilter(parsed);
  }, []);
  const clearFilterCache = (0, import_react6.useCallback)(() => {
    removeSessionValueWithExpiry(HISTORY_FILTER_KEY);
    removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
  }, []);
  const consumeReturnFlag = (0, import_react6.useCallback)(() => {
    const raw = getSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
    if (raw === "1") {
      removeSessionValueWithExpiry(HISTORY_RETURN_FLAG_KEY);
      return true;
    }
    return false;
  }, []);
  const saveCachedFilter = (0, import_react6.useCallback)((filter) => {
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
var import_react7 = __toESM(require_react());
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
  const [startDate, setStartDate] = (0, import_react7.useState)(null);
  const [endDate, setEndDate] = (0, import_react7.useState)(null);
  const [manualStartDate, setManualStartDate] = (0, import_react7.useState)(null);
  const [manualEndDate, setManualEndDate] = (0, import_react7.useState)(null);
  const [hoverDate, setHoverDate] = (0, import_react7.useState)(null);
  const [selectingStep, setSelectingStep] = (0, import_react7.useState)("start");
  const [currentMonth, setCurrentMonth] = (0, import_react7.useState)((/* @__PURE__ */ new Date()).getMonth());
  const [currentYear, setCurrentYear] = (0, import_react7.useState)((/* @__PURE__ */ new Date()).getFullYear());
  const [isOpen, setIsOpen] = (0, import_react7.useState)(false);
  const [showManualPickerPanel, setShowManualPickerPanel] = (0, import_react7.useState)(false);
  const [activeQuickFilter, setActiveQuickFilter] = (0, import_react7.useState)(null);
  const [selectedClient, setSelectedClient] = (0, import_react7.useState)(null);
  const [clientResetKey, setClientResetKey] = (0, import_react7.useState)(0);
  const [showFilters, setShowFilters] = (0, import_react7.useState)(true);
  const [showManualError, setShowManualError] = (0, import_react7.useState)(false);
  const hasRestoredFilterRef = (0, import_react7.useRef)(false);
  const didInitFilterRef = (0, import_react7.useRef)(false);
  const fromDateValue = (0, import_react7.useMemo)(() => startDate ? toISO2(startDate) : "", [startDate, toISO2]);
  const toDateValue = (0, import_react7.useMemo)(() => endDate ? toISO2(endDate) : "", [endDate, toISO2]);
  const accountNumValue = (0, import_react7.useMemo)(() => selectedClient ? selectedClient.value : "", [selectedClient]);
  const validateManualRange = (0, import_react7.useCallback)(() => {
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
  const applyDefaultRangeFromProps = (0, import_react7.useCallback)(() => {
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
  const resetHistoryFilters = (0, import_react7.useCallback)(() => {
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
  const applyCachedFilter = (0, import_react7.useCallback)(
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
  const handleSelect = (0, import_react7.useCallback)(
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
  const handleClearState = (0, import_react7.useCallback)(
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
  const openPopover = (0, import_react7.useCallback)(
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
  const handleActivatorKeyDown = (0, import_react7.useCallback)(
    (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openPopover("start");
    },
    [openPopover]
  );
  const handleSectionKeyDown = (0, import_react7.useCallback)(
    (event, section) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.stopPropagation();
      openPopover(section);
    },
    [openPopover]
  );
  const applyQuickRange = (0, import_react7.useCallback)(
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
  const handleQuickFilter = (0, import_react7.useCallback)(
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
  const handleClientSelected = (0, import_react7.useCallback)((client) => {
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
  const locale = (0, import_react8.useMemo)(() => getUiLocale(), []);
  const canViewHistory = canAccess("VISITAS_HISTORIAL", "View");
  const canCreateVisit = canAccess("VISITAS_CREACION", "Add");
  const noDataText = indT("Common_NoData", "No data");
  const activatorRef = (0, import_react8.useRef)(null);
  const popoverRef = (0, import_react8.useRef)(null);
  const paginationRef = (0, import_react8.useRef)(null);
  const [fabBottom, setFabBottom] = (0, import_react8.useState)(FAB_BASE_BOTTOM);
  const debugLoggedRef = (0, import_react8.useRef)(0);
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
  (0, import_react8.useEffect)(() => {
    logHistory("init", { defaultFromDate, defaultToDate });
  }, [defaultFromDate, defaultToDate]);
  const applyFilters = (0, import_react8.useCallback)(
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
  const updateFabBottom = (0, import_react8.useCallback)(() => {
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
  (0, import_react8.useEffect)(() => {
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
  (0, import_react8.useEffect)(() => {
    if (startDate && !endDate && selectingStep === "start") {
      setSelectingStep("end");
      return;
    }
    if (!startDate && selectingStep !== "start") {
      setSelectingStep("start");
    }
  }, [startDate, endDate, selectingStep]);
  const handleClear = (0, import_react8.useCallback)(
    (event) => {
      handleClearState(event);
      clearFilterCache();
      resetActivities();
    },
    [clearFilterCache, handleClearState, resetActivities]
  );
  const handleResetFilters = (0, import_react8.useCallback)(() => {
    resetHistoryFilters();
    clearFilterCache();
    resetActivities();
    setIsOpen(false);
    setShowFilters(true);
  }, [clearFilterCache, resetActivities, resetHistoryFilters, setIsOpen, setShowFilters]);
  const handleNavigate = (0, import_react8.useCallback)(
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
  const calendar = (0, import_react8.useMemo)(() => {
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
  const handlePrevMonth = (0, import_react8.useCallback)(
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
  const handleNextMonth = (0, import_react8.useCallback)(
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
  const handleGridMouseLeave = (0, import_react8.useCallback)(() => {
    setHoverDate(null);
  }, [setHoverDate]);
  const handleManualDayClick = (0, import_react8.useCallback)(
    (cell) => {
      if (!cell.date) return;
      logHistory("dayClick", { date: cell.iso || "", disabled: !!cell.disabled });
      handleSelect(cell.date);
    },
    [handleSelect]
  );
  const handleManualDayHover = (0, import_react8.useCallback)(
    (cell) => {
      if (!cell.date) return;
      if (selectingStep === "end" && startDate) {
        setHoverDate(new Date(cell.date));
      }
    },
    [selectingStep, setHoverDate, startDate]
  );
  const manualDayCells = (0, import_react8.useMemo)(() => {
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
  const timelineItems = (0, import_react8.useMemo)(() => {
    return items.map((x) => {
      const actividadIdRaw = (x.actividadId ?? x.ActividadId ?? "").toString().trim();
      const actividadId = actividadIdRaw || "";
      const recIdRaw = x.recId ?? x.RecId ?? "";
      const recId = recIdRaw && !Number.isNaN(Number(recIdRaw)) ? Number(recIdRaw) : null;
      let linkId = actividadId || (recId ? recId.toString() : "");
      if (debugLoggedRef.current < 5) {
        logHistory("activity item", { actividadId, recIdRaw, recId });
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
  const addDateLabel = indT("History_AddDate", "Add date");
  const clearRangeLabel = indT("History_ClearRange", "Clear range");
  const prevMonthLabel = indT("History_PrevMonth", "Previous month");
  const nextMonthLabel = indT("History_NextMonth", "Next month");
  const statusSelectStartLabel = indT("History_Status_SelectStart", "Select start date");
  const statusSelectEndLabel = indT("History_Status_SelectEnd", "Select end date");
  const weekDayLabels = (0, import_react8.useMemo)(
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
  const quickFilters = (0, import_react8.useMemo)(
    () => [
      { id: "custom", label: quickCustomLabel },
      { id: "days-7", label: quick7DaysLabel },
      { id: "days-30", label: quick30DaysLabel },
      { id: "days-90", label: quick90DaysLabel }
    ],
    [quick30DaysLabel, quick7DaysLabel, quick90DaysLabel, quickCustomLabel]
  );
  const paginationLabels = (0, import_react8.useMemo)(
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL0hpc3RvcnlQYWdlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVRhYmxlLnRzeCIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9oaXN0b3JpYWwvSGlzdG9yeVN1bW1hcnkudHN4IiwgIi4uL3JlYWN0L3NyYy9wYWdlcy92aXNpdGFzL2hpc3RvcmlhbC9IaXN0b3J5TWFudWFsRGF0ZVBpY2tlci50c3giLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlQYWdlTGlzdGVuZXJzLnRzIiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvRmxvYXRpbmdBY3Rpb25CdXR0b24udHN4IiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvQ29tcGFjdFBhZ2luYXRpb24udHN4IiwgIi4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvRmlsdGVyQnV0dG9uLnRzeCIsICIuLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUhpc3RvcnlBY3Rpdml0aWVzLnRzIiwgIi4uL3JlYWN0L3NyYy9ob29rcy91c2VIaXN0b3J5RmlsdGVyQ2FjaGUudHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvaGlzdG9yaWFsL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XG5pbXBvcnQgQ2xpZW50U2VhcmNoQ29tYm9ib3ggZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvdmlzaXRhcy9DbGllbnRTZWFyY2hDb21ib2JveC50c3hcIjtcbmltcG9ydCBIaXN0b3J5VGFibGUsIHsgVGltZWxpbmVJdGVtIH0gZnJvbSBcIi4vSGlzdG9yeVRhYmxlLnRzeFwiO1xuaW1wb3J0IEhpc3RvcnlTdW1tYXJ5IGZyb20gXCIuL0hpc3RvcnlTdW1tYXJ5LnRzeFwiO1xuaW1wb3J0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyLCB7IEhpc3RvcnlNYW51YWxEYXlDZWxsIH0gZnJvbSBcIi4vSGlzdG9yeU1hbnVhbERhdGVQaWNrZXIudHN4XCI7XG5pbXBvcnQgeyB1c2VIaXN0b3J5UGFnZUxpc3RlbmVycyB9IGZyb20gXCIuL3VzZUhpc3RvcnlQYWdlTGlzdGVuZXJzLnRzXCI7XG5pbXBvcnQgRmxvYXRpbmdBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3hcIjtcbmltcG9ydCBDb21wYWN0UGFnaW5hdGlvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeFwiO1xuaW1wb3J0IEZpbHRlckJ1dHRvbiBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0ZpbHRlckJ1dHRvbi50c3hcIjtcbmltcG9ydCBBY3Rpb25CdXR0b24gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9BY3Rpb25CdXR0b24udHN4XCI7XG5pbXBvcnQgeyB1c2VIaXN0b3J5QWN0aXZpdGllcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VIaXN0b3J5QWN0aXZpdGllcy50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUZpbHRlckNhY2hlIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xuaW1wb3J0IHsgdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSB9IGZyb20gXCIuL3VzZUhpc3RvcnlGaWx0ZXJzU3RhdGUudHNcIjtcbmltcG9ydCB7IG1vdW50UmVhY3RJc2xhbmQsIG1vdW50V2hlbkRvY3VtZW50UmVhZHkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvcmVhY3RJc2xhbmQudHN4XCI7XG5cclxudHlwZSBQcm9wcyA9IHtcclxuICBkZWZhdWx0RnJvbURhdGU/OiBzdHJpbmc7XHJcbiAgZGVmYXVsdFRvRGF0ZT86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgQ2FsZW5kYXJDZWxsID0ge1xuICBkYXRlOiBEYXRlIHwgbnVsbDtcbiAgaXNvOiBzdHJpbmc7XG4gIGlzRW1wdHk6IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBQQUdFX1NJWkUgPSA2O1xuY29uc3QgUEFHRV9XSU5ET1cgPSA2O1xuY29uc3QgTkFWX0RFTEFZX01TID0gMzIwO1xuY29uc3QgRkFCX0JBU0VfQk9UVE9NID0gMzI7XG5jb25zdCBGQUJfQ0xFQVJBTkNFID0gMjQ7XG5jb25zdCBGQUJfR0FQID0gMTI7XG5cclxuY29uc3Qgbm9ybWFsaXplVWlMb2NhbGUgPSAobG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBjb25zdCB2YWx1ZSA9IFN0cmluZyhsb2NhbGUgfHwgXCJcIikudHJpbSgpO1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcImVzLUVTXCI7XHJcbiAgaWYgKC9eemgtaGFucy9pLnRlc3QodmFsdWUpKSByZXR1cm4gXCJ6aC1DTlwiO1xyXG4gIHJldHVybiB2YWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IGlzQmFzcXVlTG9jYWxlID0gKGxvY2FsZTogc3RyaW5nKSA9PiAvXmV1XFxiL2kudGVzdChTdHJpbmcobG9jYWxlIHx8IFwiXCIpKTtcclxuXHJcbmNvbnN0IEJBU1FVRV9NT05USFMgPSBbXHJcbiAgXCJ1cnRhcnJpbGFcIixcclxuICBcIm90c2FpbGFcIixcclxuICBcIm1hcnR4b2FcIixcclxuICBcImFwaXJpbGFcIixcclxuICBcIm1haWF0emFcIixcclxuICBcImVrYWluYVwiLFxyXG4gIFwidXp0YWlsYVwiLFxyXG4gIFwiYWJ1enR1YVwiLFxyXG4gIFwiaXJhaWxhXCIsXHJcbiAgXCJ1cnJpYVwiLFxyXG4gIFwiYXphcm9hXCIsXHJcbiAgXCJhYmVuZHVhXCIsXHJcbl07XHJcblxyXG5jb25zdCBCQVNRVUVfTU9OVEhTX1NIT1JUID0gW1xyXG4gIFwidXJ0XCIsXHJcbiAgXCJvdHNcIixcclxuICBcIm1hclwiLFxyXG4gIFwiYXBpXCIsXHJcbiAgXCJtYWlcIixcclxuICBcImVrYVwiLFxyXG4gIFwidXp0XCIsXHJcbiAgXCJhYnVcIixcclxuICBcImlyYVwiLFxyXG4gIFwidXJyXCIsXHJcbiAgXCJhemFcIixcclxuICBcImFiZVwiLFxyXG5dO1xyXG5cclxuY29uc3QgZ2V0VWlMb2NhbGUgPSAoKSA9PiB7XHJcbiAgY29uc3QgZnJvbUh0bWwgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA6IFwiXCI7XHJcbiAgaWYgKGZyb21IdG1sICYmIFN0cmluZyhmcm9tSHRtbCkudHJpbSgpKSByZXR1cm4gbm9ybWFsaXplVWlMb2NhbGUoZnJvbUh0bWwpO1xyXG4gIHJldHVybiBcImVzLUVTXCI7XHJcbn07XHJcblxyXG5jb25zdCBwYWQgPSAobjogbnVtYmVyKSA9PiBuLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgXCIwXCIpO1xyXG5cclxuY29uc3QgdG9JU08gPSAoZDogRGF0ZSkgPT4gYCR7ZC5nZXRGdWxsWWVhcigpfS0ke3BhZChkLmdldE1vbnRoKCkgKyAxKX0tJHtwYWQoZC5nZXREYXRlKCkpfWA7XHJcblxyXG5jb25zdCBzdGFydE9mRGF5ID0gKGQ6IERhdGUpID0+IG5ldyBEYXRlKGQuZ2V0RnVsbFllYXIoKSwgZC5nZXRNb250aCgpLCBkLmdldERhdGUoKSk7XHJcblxyXG5jb25zdCBwYXJzZUlTTyA9IChzOiBzdHJpbmcpID0+IHtcclxuICBpZiAoIXMpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IHBhcnRzID0gcy5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XHJcbiAgaWYgKHBhcnRzLmxlbmd0aCAhPT0gMykgcmV0dXJuIG51bGw7XHJcbiAgcmV0dXJuIG5ldyBEYXRlKHBhcnRzWzBdLCBwYXJ0c1sxXSAtIDEsIHBhcnRzWzJdKTtcclxufTtcclxuXHJcbmNvbnN0IHNhbWVEYXkgPSAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiAhIShhICYmIGIgJiYgYS5nZXRUaW1lKCkgPT09IGIuZ2V0VGltZSgpKTtcclxuXHJcbmNvbnN0IGlzQmVmb3JlID0gKGE6IERhdGUgfCBudWxsLCBiOiBEYXRlIHwgbnVsbCkgPT4gISEoYSAmJiBiICYmIGEuZ2V0VGltZSgpIDwgYi5nZXRUaW1lKCkpO1xyXG5cclxuICBjb25zdCBub3JtYWxpemVSYW5nZSA9IChmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpID0+IHtcclxuICAgIGlmICghZnJvbSB8fCAhdG8pIHJldHVybiB7IGZyb20sIHRvIH07XHJcbiAgICBjb25zdCBmcm9tRGF0ZSA9IHBhcnNlSVNPKGZyb20pO1xyXG4gICAgY29uc3QgdG9EYXRlID0gcGFyc2VJU08odG8pO1xyXG4gICAgaWYgKCFmcm9tRGF0ZSB8fCAhdG9EYXRlKSByZXR1cm4geyBmcm9tLCB0byB9O1xyXG4gIGlmIChpc0JlZm9yZSh0b0RhdGUsIGZyb21EYXRlKSkge1xyXG4gICAgcmV0dXJuIHsgZnJvbTogdG9JU08odG9EYXRlKSwgdG86IHRvSVNPKGZyb21EYXRlKSB9O1xyXG4gIH1cclxuICByZXR1cm4geyBmcm9tOiB0b0lTTyhmcm9tRGF0ZSksIHRvOiB0b0lTTyh0b0RhdGUpIH07XHJcbn07XHJcblxyXG4gIGNvbnN0IGZvcm1hdERpc3BsYXkgPSAoZDogRGF0ZSwgbG9jYWxlOiBzdHJpbmcpID0+IHtcclxuICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgY29uc3QgbW9udGggPSBCQVNRVUVfTU9OVEhTX1NIT1JUW2QuZ2V0TW9udGgoKV07XHJcbiAgICByZXR1cm4gYCR7ZC5nZXREYXRlKCl9ICR7bW9udGh9ICR7ZC5nZXRGdWxsWWVhcigpfWAudG9Mb3dlckNhc2UoKTtcclxuICB9XHJcbiAgcmV0dXJuIGRcclxuICAgIC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7XHJcbiAgICAgIGRheTogXCJudW1lcmljXCIsXHJcbiAgICAgIG1vbnRoOiBcInNob3J0XCIsXHJcbiAgICAgIHllYXI6IFwibnVtZXJpY1wiLFxyXG4gICAgfSlcclxuICAgIC5yZXBsYWNlKC9cXC4vZywgXCJcIilcclxuICAgIC50b0xvd2VyQ2FzZSgpO1xyXG59O1xyXG5cclxuY29uc3QgZm9ybWF0TW9udGhMYWJlbCA9IChkOiBEYXRlLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICgvXnpoL2kudGVzdChsb2NhbGUpKSB7XHJcbiAgICByZXR1cm4gbmV3IEludGwuRGF0ZVRpbWVGb3JtYXQobG9jYWxlLCB7IHllYXI6IFwibnVtZXJpY1wiLCBtb250aDogXCJsb25nXCIgfSkuZm9ybWF0KGQpO1xyXG4gIH1cclxuICBpZiAoaXNCYXNxdWVMb2NhbGUobG9jYWxlKSkge1xyXG4gICAgcmV0dXJuIGAke0JBU1FVRV9NT05USFNbZC5nZXRNb250aCgpXX0gJHtkLmdldEZ1bGxZZWFyKCl9YDtcclxuICB9XHJcbiAgY29uc3QgbW9udGhOYW1lID0gZC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcImxvbmdcIiB9KTtcclxuICBjb25zdCBjYXBNb250aE5hbWUgPSBtb250aE5hbWUgJiYgL1tBLVphLXpdLy50ZXN0KG1vbnRoTmFtZVswXSlcclxuICAgID8gbW9udGhOYW1lWzBdLnRvTG9jYWxlVXBwZXJDYXNlKGxvY2FsZSkgKyBtb250aE5hbWUuc2xpY2UoMSlcclxuICAgIDogbW9udGhOYW1lO1xyXG4gIHJldHVybiBgJHtjYXBNb250aE5hbWV9ICR7ZC5nZXRGdWxsWWVhcigpfWA7XHJcbn07XHJcblxyXG5jb25zdCBwYXJzZURhdGVWYWx1ZSA9ICh2YWx1ZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgaWYgKCFyYXcpIHJldHVybiBudWxsO1xyXG5cclxuICBjb25zdCBkYXRlUGFydCA9IHJhdy5zcGxpdChcIlRcIilbMF0uc3BsaXQoXCIgXCIpWzBdO1xyXG5cclxuICBpZiAoL15cXGR7NH0tXFxkezJ9LVxcZHsyfSQvLnRlc3QoZGF0ZVBhcnQpKSB7XHJcbiAgICBjb25zdCBbeSwgbSwgZF0gPSBkYXRlUGFydC5zcGxpdChcIi1cIikubWFwKE51bWJlcik7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xyXG4gIH1cclxuXHJcbiAgaWYgKC9eXFxkezJ9Wy4vLV1cXGR7Mn1bLi8tXVxcZHs0fSQvLnRlc3QoZGF0ZVBhcnQpKSB7XHJcbiAgICBjb25zdCBwYXJ0cyA9IGRhdGVQYXJ0LnNwbGl0KC9bLi8tXS8pLm1hcChOdW1iZXIpO1xyXG4gICAgY29uc3QgW2QsIG0sIHldID0gcGFydHM7XHJcbiAgICByZXR1cm4gbmV3IERhdGUoeSwgbSAtIDEsIGQpO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcGFyc2VkID0gbmV3IERhdGUocmF3KTtcclxuICByZXR1cm4gTnVtYmVyLmlzTmFOKHBhcnNlZC5nZXRUaW1lKCkpID8gbnVsbCA6IHBhcnNlZDtcclxufTtcclxuXHJcbmNvbnN0IGZvcm1hdERhdGVQYXJ0cyA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiB7IHllYXI6IFwiXCIsIG1vbnRoOiBcIlwiLCBkYXk6IFwiXCIgfTtcclxuICBjb25zdCBkID0gcGFyc2VEYXRlVmFsdWUodmFsdWUpO1xyXG4gIGlmICghZCkgcmV0dXJuIHsgeWVhcjogXCJcIiwgbW9udGg6IFwiXCIsIGRheTogXCJcIiB9O1xyXG4gIGxldCBtb250aCA9IFwiXCI7XHJcbiAgaWYgKGlzQmFzcXVlTG9jYWxlKGxvY2FsZSkpIHtcclxuICAgIG1vbnRoID0gQkFTUVVFX01PTlRIU19TSE9SVFtkLmdldE1vbnRoKCldIHx8IFwiXCI7XHJcbiAgfSBlbHNlIHtcclxuICAgIG1vbnRoID0gZC50b0xvY2FsZURhdGVTdHJpbmcobG9jYWxlLCB7IG1vbnRoOiBcInNob3J0XCIgfSkucmVwbGFjZSgvXFwuL2csIFwiXCIpO1xyXG4gIH1cclxuICByZXR1cm4ge1xyXG4gICAgeWVhcjogU3RyaW5nKGQuZ2V0RnVsbFllYXIoKSksXHJcbiAgICBtb250aDogbW9udGgudG9VcHBlckNhc2UoKSxcclxuICAgIGRheTogU3RyaW5nKGQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIiksXHJcbiAgfTtcclxufTtcclxuXHJcbmNvbnN0IHRvVGl0bGVDYXNlID0gKHZhbHVlOiBzdHJpbmcsIGxvY2FsZTogc3RyaW5nKSA9PiB7XHJcbiAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgY29uc3QgbG93ZXIgPSB2YWx1ZS50b0xvY2FsZUxvd2VyQ2FzZShsb2NhbGUpO1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gbG93ZXIucmVwbGFjZSgvKF58W15cXHB7TH1dKShcXHB7TH0pL2d1LCAoX21hdGNoLCBwcmVmaXgsIGNoKSA9PiBgJHtwcmVmaXh9JHtjaC50b0xvY2FsZVVwcGVyQ2FzZShsb2NhbGUpfWApO1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIGxvd2VyLnJlcGxhY2UoLyhefFtcXHMtL10pKFxcUykvZywgKF9tYXRjaCwgcHJlZml4LCBjaCkgPT4gYCR7cHJlZml4fSR7Y2gudG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKX1gKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCB0b1NlbnRlbmNlQ2FzZSA9ICh2YWx1ZTogc3RyaW5nLCBsb2NhbGU6IHN0cmluZykgPT4ge1xyXG4gIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gIGNvbnN0IHRyaW1tZWQgPSB2YWx1ZS50cmltKCk7XHJcbiAgaWYgKCF0cmltbWVkKSByZXR1cm4gdHJpbW1lZDtcclxuICBjb25zdCBsb3dlciA9IHRyaW1tZWQudG9Mb2NhbGVMb3dlckNhc2UobG9jYWxlKTtcclxuICByZXR1cm4gbG93ZXJbMF0udG9Mb2NhbGVVcHBlckNhc2UobG9jYWxlKSArIGxvd2VyLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuY29uc3QgbG9nSGlzdG9yeSA9IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuICBjb25zdCBkZWJ1Z0ZsYWcgPSAod2luZG93IGFzIGFueSkuX19JTkRfREVCVUdfSElTVE9SWV9fO1xuICBpZiAoZGVidWdGbGFnICE9PSB0cnVlKSByZXR1cm47XG4gIGlmIChkYXRhKSB7XG4gICAgY29uc29sZS5kZWJ1ZyhcIltIaXN0b3J5XVwiLCBtZXNzYWdlLCBkYXRhKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmRlYnVnKFwiW0hpc3RvcnldXCIsIG1lc3NhZ2UpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEhpc3RvcnkgcGFnZSB3aXRoIFJlYWN0IHN0YXRlICsgZWZmZWN0cyAobm8gbGVnYWN5IERPTSBsb2dpYykuXHJcbmV4cG9ydCBjb25zdCBIaXN0b3J5UGFnZSA9ICh7IGRlZmF1bHRGcm9tRGF0ZSA9IFwiXCIsIGRlZmF1bHRUb0RhdGUgPSBcIlwiIH06IFByb3BzKSA9PiB7XHJcbiAgY29uc3QgbG9jYWxlID0gdXNlTWVtbygoKSA9PiBnZXRVaUxvY2FsZSgpLCBbXSk7XHJcbiAgY29uc3QgY2FuVmlld0hpc3RvcnkgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0hJU1RPUklBTFwiLCBcIlZpZXdcIik7XHJcbiAgY29uc3QgY2FuQ3JlYXRlVmlzaXQgPSBjYW5BY2Nlc3MoXCJWSVNJVEFTX0NSRUFDSU9OXCIsIFwiQWRkXCIpO1xyXG4gIGNvbnN0IG5vRGF0YVRleHQgPSBpbmRUKFwiQ29tbW9uX05vRGF0YVwiLCBcIk5vIGRhdGFcIik7XHJcblxyXG4gIGNvbnN0IGFjdGl2YXRvclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBwb3BvdmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHBhZ2luYXRpb25SZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcblxyXG4gIGNvbnN0IFtmYWJCb3R0b20sIHNldEZhYkJvdHRvbV0gPSB1c2VTdGF0ZShGQUJfQkFTRV9CT1RUT00pO1xuXG4gIGNvbnN0IGRlYnVnTG9nZ2VkUmVmID0gdXNlUmVmKDApO1xuXG4gIGNvbnN0IHsgcmVhZENhY2hlZEZpbHRlciwgY2xlYXJGaWx0ZXJDYWNoZSwgY29uc3VtZVJldHVybkZsYWcsIHNhdmVDYWNoZWRGaWx0ZXIgfSA9IHVzZUhpc3RvcnlGaWx0ZXJDYWNoZSgpO1xuICBjb25zdCB7XG4gICAgc3RhcnREYXRlLFxuICAgIGVuZERhdGUsXG4gICAgbWFudWFsU3RhcnREYXRlLFxuICAgIG1hbnVhbEVuZERhdGUsXG4gICAgaG92ZXJEYXRlLFxuICAgIHNlbGVjdGluZ1N0ZXAsXG4gICAgY3VycmVudE1vbnRoLFxuICAgIGN1cnJlbnRZZWFyLFxuICAgIGlzT3BlbixcbiAgICBzaG93TWFudWFsUGlja2VyUGFuZWwsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgY2xpZW50UmVzZXRLZXksXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgc2hvd01hbnVhbEVycm9yLFxuICAgIGZyb21EYXRlVmFsdWUsXG4gICAgdG9EYXRlVmFsdWUsXG4gICAgYWNjb3VudE51bVZhbHVlLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXG4gICAgc2V0SG92ZXJEYXRlLFxuICAgIHNldFNlbGVjdGluZ1N0ZXAsXG4gICAgc2V0Q3VycmVudE1vbnRoLFxuICAgIHNldEN1cnJlbnRZZWFyLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgICBzZXRTaG93TWFudWFsRXJyb3IsXG4gICAgdmFsaWRhdGVNYW51YWxSYW5nZSxcbiAgICBhcHBseURlZmF1bHRSYW5nZUZyb21Qcm9wcyxcbiAgICByZXNldEhpc3RvcnlGaWx0ZXJzLFxuICAgIGFwcGx5Q2FjaGVkRmlsdGVyLFxuICAgIGhhbmRsZVNlbGVjdCxcbiAgICBoYW5kbGVDbGVhclN0YXRlLFxuICAgIG9wZW5Qb3BvdmVyLFxuICAgIGhhbmRsZUFjdGl2YXRvcktleURvd24sXG4gICAgaGFuZGxlU2VjdGlvbktleURvd24sXG4gICAgaGFuZGxlUXVpY2tGaWx0ZXIsXG4gICAgaGFuZGxlQ2xpZW50U2VsZWN0ZWQsXG4gIH0gPSB1c2VIaXN0b3J5RmlsdGVyc1N0YXRlKHtcbiAgICBkZWZhdWx0RnJvbURhdGUsXG4gICAgZGVmYXVsdFRvRGF0ZSxcbiAgICBsb2dIaXN0b3J5LFxuICAgIHBhcnNlRGF0ZVZhbHVlLFxuICAgIHBhcnNlSVNPLFxuICAgIHRvSVNPLFxuICAgIHN0YXJ0T2ZEYXksXG4gICAgaXNCZWZvcmUsXG4gIH0pO1xuXG4gIGNvbnN0IHsgaXRlbXMsIHRvdGFsLCBjdXJyZW50UGFnZSwgaXNMb2FkaW5nLCBlcnJvck1lc3NhZ2UsIGxvYWRBY3Rpdml0aWVzLCByZXNldEFjdGl2aXRpZXMsIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsIGxhc3RTaWduYXR1cmVSZWYgfSA9XG4gICAgdXNlSGlzdG9yeUFjdGl2aXRpZXMoe1xuICAgICAgZnJvbURhdGVWYWx1ZSxcbiAgICAgIHRvRGF0ZVZhbHVlLFxuICAgICAgYWNjb3VudE51bVZhbHVlLFxuICAgICAgcGFnZVNpemU6IFBBR0VfU0laRSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgICAgb25Gb3JiaWRkZW46IHNob3dQZXJtaXNzaW9uTW9kYWwsXG4gICAgICBvbkRlYnVnOiBsb2dIaXN0b3J5LFxuICAgIH0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgbG9nSGlzdG9yeShcImluaXRcIiwgeyBkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGUgfSk7XG4gIH0sIFtkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGVdKTtcblxyXG4gIGNvbnN0IGFwcGx5RmlsdGVycyA9IHVzZUNhbGxiYWNrKFxuICAgIChvcHRpb25zPzogeyBjbG9zZVBhbmVsPzogYm9vbGVhbjsgZm9yY2U/OiBib29sZWFuOyBwYWdlPzogbnVtYmVyIH0pID0+IHtcclxuICAgICAgaWYgKCF2YWxpZGF0ZU1hbnVhbFJhbmdlKCkpIHJldHVybjtcclxuICAgICAgaWYgKCFzdGFydERhdGUgfHwgIWVuZERhdGUpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVSYW5nZShmcm9tRGF0ZVZhbHVlLCB0b0RhdGVWYWx1ZSk7XHJcbiAgICAgIGNvbnN0IHBhZ2UgPSBvcHRpb25zPy5wYWdlID8/IDE7XHJcbiAgICAgIGNvbnN0IHNpZ25hdHVyZSA9IGAke25vcm1hbGl6ZWQuZnJvbX18JHtub3JtYWxpemVkLnRvfXwke2FjY291bnROdW1WYWx1ZX18JHtwYWdlfWA7XHJcblxyXG4gICAgICBpZiAob3B0aW9ucz8uZm9yY2UgfHwgbGFzdFNpZ25hdHVyZVJlZi5jdXJyZW50ICE9PSBzaWduYXR1cmUpIHtcclxuICAgICAgICBsb2FkQWN0aXZpdGllcyhwYWdlLCB7IGZyb21EYXRlOiBub3JtYWxpemVkLmZyb20sIHRvRGF0ZTogbm9ybWFsaXplZC50bywgYWNjb3VudE51bTogYWNjb3VudE51bVZhbHVlIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xyXG4gICAgICBpZiAob3B0aW9ucz8uY2xvc2VQYW5lbCkge1xyXG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XHJcbiAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2FjY291bnROdW1WYWx1ZSwgZW5kRGF0ZSwgZnJvbURhdGVWYWx1ZSwgbG9hZEFjdGl2aXRpZXMsIHN0YXJ0RGF0ZSwgdG9EYXRlVmFsdWUsIHZhbGlkYXRlTWFudWFsUmFuZ2VdXHJcbiAgKTtcblxuICBjb25zdCB0b3RhbFBhZ2VzID0gTWF0aC5jZWlsKCh0b3RhbCB8fCAwKSAvIFBBR0VfU0laRSk7XG5cbiAgLy8gS2VlcCB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiBjbGVhciBvZiBwYWdpbmF0aW9uIG9uIHNtYWxsIHNjcmVlbnMuXG4gIGNvbnN0IHVwZGF0ZUZhYkJvdHRvbSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXBhZ2luYXRpb25SZWYuY3VycmVudCB8fCB0b3RhbFBhZ2VzIDw9IDEpIHtcbiAgICAgIHNldEZhYkJvdHRvbShGQUJfQkFTRV9CT1RUT00pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoZWlnaHQgPSBwYWdpbmF0aW9uUmVmLmN1cnJlbnQub2Zmc2V0SGVpZ2h0IHx8IDA7XG4gICAgY29uc3QgbmV4dCA9IE1hdGgubWF4KEZBQl9CQVNFX0JPVFRPTSwgaGVpZ2h0ICsgRkFCX0NMRUFSQU5DRSArIEZBQl9HQVApO1xuICAgIHNldEZhYkJvdHRvbSgocHJldikgPT4gKE1hdGguYWJzKHByZXYgLSBuZXh0KSA8IDEgPyBwcmV2IDogbmV4dCkpO1xuICB9LCBbdG90YWxQYWdlc10pO1xuXG4gIHVzZUhpc3RvcnlQYWdlTGlzdGVuZXJzKHtcbiAgICBpc09wZW4sXG4gICAgYWN0aXZhdG9yUmVmLFxuICAgIHBvcG92ZXJSZWYsXG4gICAgcGFnaW5hdGlvblJlZixcbiAgICBoYXNSZXN0b3JlZEZpbHRlclJlZixcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIHVwZGF0ZUZhYkJvdHRvbSxcbiAgICBsb2dIaXN0b3J5LFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgc2V0SXNPcGVuLFxuICAgIHNldEhvdmVyRGF0ZSxcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgICBhcHBseUZpbHRlcnMsXG4gIH0pO1xuXG4gIC8vIFJlc3RvcmUgY2FjaGVkIGZpbHRlciBvbiBpbml0aWFsIG1vdW50IG9ubHkuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGRpZEluaXRGaWx0ZXJSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIGRpZEluaXRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgY29uc3QgY2FjaGVkID0gY29uc3VtZVJldHVybkZsYWcoKSA/IHJlYWRDYWNoZWRGaWx0ZXIoKSA6IG51bGw7XG4gICAgaWYgKGNhY2hlZCAmJiBjYWNoZWQuZnJvbURhdGUgJiYgY2FjaGVkLnRvRGF0ZSkge1xuICAgICAgbG9nSGlzdG9yeShcInJlc3RvcmVGaWx0ZXJcIiwgY2FjaGVkKTtcbiAgICAgIGNvbnN0IGNhY2hlZFJlcXVlc3QgPSBhcHBseUNhY2hlZEZpbHRlcihjYWNoZWQpO1xuICAgICAgaWYgKGNhY2hlZFJlcXVlc3QpIHtcbiAgICAgICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgbG9hZEFjdGl2aXRpZXMoY2FjaGVkUmVxdWVzdC5wYWdlLCBjYWNoZWRSZXF1ZXN0Lm92ZXJyaWRlKTtcbiAgICAgICAgc2V0U2hvd0ZpbHRlcnMoZmFsc2UpO1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRSZXF1ZXN0ID0gYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMoKTtcbiAgICBpZiAoZGVmYXVsdFJlcXVlc3QpIHtcbiAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICBsb2FkQWN0aXZpdGllcyhkZWZhdWx0UmVxdWVzdC5wYWdlLCBkZWZhdWx0UmVxdWVzdC5vdmVycmlkZSk7XG4gICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycygpO1xuICAgIGNsZWFyRmlsdGVyQ2FjaGUoKTtcbiAgICByZXNldEFjdGl2aXRpZXMoKTtcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xuICB9LCBbXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXG4gICAgY2xlYXJGaWx0ZXJDYWNoZSxcbiAgICBjb25zdW1lUmV0dXJuRmxhZyxcbiAgICBkaWRJbml0RmlsdGVyUmVmLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIGxvYWRBY3Rpdml0aWVzLFxuICAgIHJlYWRDYWNoZWRGaWx0ZXIsXG4gICAgcmVzZXRBY3Rpdml0aWVzLFxuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMsXG4gICAgcmV0cnlPbk5ldHdvcmtFcnJvclJlZixcbiAgXSk7XG5cclxuICAvLyBLZWVwIHRoZSBwaWNrZXIgc3RlcCBpbiBzeW5jIHdpdGggY3VycmVudCBzZWxlY3Rpb24uXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChzdGFydERhdGUgJiYgIWVuZERhdGUgJiYgc2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiKSB7XHJcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJlbmRcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghc3RhcnREYXRlICYmIHNlbGVjdGluZ1N0ZXAgIT09IFwic3RhcnRcIikge1xyXG4gICAgICBzZXRTZWxlY3RpbmdTdGVwKFwic3RhcnRcIik7XHJcbiAgICB9XHJcbiAgfSwgW3N0YXJ0RGF0ZSwgZW5kRGF0ZSwgc2VsZWN0aW5nU3RlcF0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDbGVhciA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgICAgaGFuZGxlQ2xlYXJTdGF0ZShldmVudCk7XG4gICAgICBjbGVhckZpbHRlckNhY2hlKCk7XG4gICAgICByZXNldEFjdGl2aXRpZXMoKTtcbiAgICB9LFxuICAgIFtjbGVhckZpbHRlckNhY2hlLCBoYW5kbGVDbGVhclN0YXRlLCByZXNldEFjdGl2aXRpZXNdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUmVzZXRGaWx0ZXJzID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICBjbGVhckZpbHRlckNhY2hlKCk7XG4gICAgcmVzZXRBY3Rpdml0aWVzKCk7XG4gICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgfSwgW2NsZWFyRmlsdGVyQ2FjaGUsIHJlc2V0QWN0aXZpdGllcywgcmVzZXRIaXN0b3J5RmlsdGVycywgc2V0SXNPcGVuLCBzZXRTaG93RmlsdGVyc10pO1xuXHJcbiAgY29uc3QgaGFuZGxlTmF2aWdhdGUgPSB1c2VDYWxsYmFjayhcbiAgICAobGlua0lkOiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghY2FuVmlld0hpc3RvcnkpIHtcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2F2ZUNhY2hlZEZpbHRlcih7XG4gICAgICAgICAgZnJvbURhdGU6IGZyb21EYXRlVmFsdWUgfHwgXCJcIixcbiAgICAgICAgICB0b0RhdGU6IHRvRGF0ZVZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgcGFnZTogY3VycmVudFBhZ2UsXG4gICAgICAgICAgY2xpZW50QWNjb3VudDogc2VsZWN0ZWRDbGllbnQ/LnZhbHVlIHx8IFwiXCIsXG4gICAgICAgICAgY2xpZW50VGV4dDogc2VsZWN0ZWRDbGllbnQ/LnRleHQgfHwgXCJcIixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGVuY29kZVVSSUNvbXBvbmVudChsaW5rSWQpO1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAvVmlzaXRhcy9EZXRhbGxlLyR7dGFyZ2V0fWA7XG4gICAgICB9LCBOQVZfREVMQVlfTVMpO1xuICAgIH0sXG4gICAgW2NhblZpZXdIaXN0b3J5LCBjdXJyZW50UGFnZSwgZnJvbURhdGVWYWx1ZSwgc2F2ZUNhY2hlZEZpbHRlciwgdG9EYXRlVmFsdWUsIHNlbGVjdGVkQ2xpZW50XVxuICApO1xuXHJcbiAgY29uc3QgY2FsZW5kYXIgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGZpcnN0RGF5ID0gbmV3IERhdGUoY3VycmVudFllYXIsIGN1cnJlbnRNb250aCwgMSk7XHJcbiAgICBjb25zdCBkYXlzSW5Nb250aCA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGggKyAxLCAwKS5nZXREYXRlKCk7XHJcbiAgICBjb25zdCBvZmZzZXQgPSAoZmlyc3REYXkuZ2V0RGF5KCkgKyA2KSAlIDc7XHJcbiAgICBjb25zdCBjZWxsczogQ2FsZW5kYXJDZWxsW10gPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2Zmc2V0OyBpKyspIHtcclxuICAgICAgY2VsbHMucHVzaCh7IGRhdGU6IG51bGwsIGlzbzogXCJcIiwgaXNFbXB0eTogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIGZvciAobGV0IGQgPSAxOyBkIDw9IGRheXNJbk1vbnRoOyBkKyspIHtcclxuICAgICAgY29uc3QgZGF0ZU9iaiA9IG5ldyBEYXRlKGN1cnJlbnRZZWFyLCBjdXJyZW50TW9udGgsIGQpO1xyXG4gICAgICBjZWxscy5wdXNoKHsgZGF0ZTogZGF0ZU9iaiwgaXNvOiB0b0lTTyhkYXRlT2JqKSwgaXNFbXB0eTogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjZWxscyxcclxuICAgICAgbGFiZWw6IGZvcm1hdE1vbnRoTGFiZWwoZmlyc3REYXksIGxvY2FsZSksXHJcbiAgICB9O1xyXG4gIH0sIFtjdXJyZW50TW9udGgsIGN1cnJlbnRZZWFyLCBsb2NhbGVdKTtcclxuXHJcbiAgY29uc3QgcHJldmlld0VuZCA9IGVuZERhdGUgfHwgKHNlbGVjdGluZ1N0ZXAgPT09IFwiZW5kXCIgPyBob3ZlckRhdGUgOiBudWxsKTtcblxuICBjb25zdCBoYW5kbGVQcmV2TW9udGggPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHNldEN1cnJlbnRNb250aCgocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gcHJldiAtIDE7XG4gICAgICAgIGlmIChuZXh0IDwgMCkge1xuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKCh5ZWFyKSA9PiB5ZWFyIC0gMSk7XG4gICAgICAgICAgcmV0dXJuIDExO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc2V0Q3VycmVudE1vbnRoLCBzZXRDdXJyZW50WWVhcl1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVOZXh0TW9udGggPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHNldEN1cnJlbnRNb250aCgocHJldikgPT4ge1xuICAgICAgICBjb25zdCBuZXh0ID0gcHJldiArIDE7XG4gICAgICAgIGlmIChuZXh0ID4gMTEpIHtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcigoeWVhcikgPT4geWVhciArIDEpO1xuICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc2V0Q3VycmVudE1vbnRoLCBzZXRDdXJyZW50WWVhcl1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVHcmlkTW91c2VMZWF2ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gIH0sIFtzZXRIb3ZlckRhdGVdKTtcblxuICBjb25zdCBoYW5kbGVNYW51YWxEYXlDbGljayA9IHVzZUNhbGxiYWNrKFxuICAgIChjZWxsOiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4ge1xuICAgICAgaWYgKCFjZWxsLmRhdGUpIHJldHVybjtcbiAgICAgIGxvZ0hpc3RvcnkoXCJkYXlDbGlja1wiLCB7IGRhdGU6IGNlbGwuaXNvIHx8IFwiXCIsIGRpc2FibGVkOiAhIWNlbGwuZGlzYWJsZWQgfSk7XG4gICAgICBoYW5kbGVTZWxlY3QoY2VsbC5kYXRlKTtcbiAgICB9LFxuICAgIFtoYW5kbGVTZWxlY3RdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlTWFudWFsRGF5SG92ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoY2VsbDogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHtcbiAgICAgIGlmICghY2VsbC5kYXRlKSByZXR1cm47XG4gICAgICBpZiAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIiAmJiBzdGFydERhdGUpIHtcbiAgICAgICAgc2V0SG92ZXJEYXRlKG5ldyBEYXRlKGNlbGwuZGF0ZSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW3NlbGVjdGluZ1N0ZXAsIHNldEhvdmVyRGF0ZSwgc3RhcnREYXRlXVxuICApO1xuXG4gIGNvbnN0IG1hbnVhbERheUNlbGxzID0gdXNlTWVtbzxIaXN0b3J5TWFudWFsRGF5Q2VsbFtdPigoKSA9PiB7XG4gICAgcmV0dXJuIGNhbGVuZGFyLmNlbGxzLm1hcCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICBpZiAoY2VsbC5pc0VtcHR5KSB7XG4gICAgICAgIHJldHVybiB7IGtleTogYGVtcHR5LSR7aWR4fWAsIGlzRW1wdHk6IHRydWUgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0ZU9iaiA9IGNlbGwuZGF0ZSBhcyBEYXRlO1xuICAgICAgY29uc3QgaXNTdGFydCA9IHNhbWVEYXkoZGF0ZU9iaiwgc3RhcnREYXRlKTtcbiAgICAgIGNvbnN0IGlzRW5kID0gc2FtZURheShkYXRlT2JqLCBlbmREYXRlKTtcbiAgICAgIGNvbnN0IGluUmFuZ2UgPSBzdGFydERhdGUgJiYgcHJldmlld0VuZCAmJiBpc0JlZm9yZShzdGFydERhdGUsIGRhdGVPYmopICYmIGlzQmVmb3JlKGRhdGVPYmosIHByZXZpZXdFbmQpO1xuICAgICAgY29uc3QgaG92ZXJSYW5nZSA9IHN0YXJ0RGF0ZSAmJiAhZW5kRGF0ZSAmJiBob3ZlckRhdGUgJiYgaXNCZWZvcmUoc3RhcnREYXRlLCBkYXRlT2JqKSAmJiBpc0JlZm9yZShkYXRlT2JqLCBob3ZlckRhdGUpO1xuICAgICAgY29uc3QgZGlzYWJsZWQgPSBzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmICEhc3RhcnREYXRlICYmIGlzQmVmb3JlKGRhdGVPYmosIHN0YXJ0RGF0ZSk7XG4gICAgICBjb25zdCBpc1RvZGF5ID0gc2FtZURheShkYXRlT2JqLCBuZXcgRGF0ZSgpKTtcblxuICAgICAgY29uc3QgZGF5Q2xhc3MgPSBjbGFzc05hbWVzKFxuICAgICAgICBcImRycC1kYXlcIixcbiAgICAgICAgaXNTdGFydCA/IFwic3RhcnQgcmFuZ2Utc3RhcnRcIiA6IFwiXCIsXG4gICAgICAgIGlzRW5kID8gXCJlbmQgcmFuZ2UtZW5kXCIgOiBcIlwiLFxuICAgICAgICBpblJhbmdlID8gXCJpbi1yYW5nZVwiIDogXCJcIixcbiAgICAgICAgaG92ZXJSYW5nZSA/IFwiaG92ZXItcmFuZ2VcIiA6IFwiXCIsXG4gICAgICAgIGRpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJcIixcbiAgICAgICAgaXNUb2RheSA/IFwidG9kYXlcIiA6IFwiXCJcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGtleTogY2VsbC5pc28sXG4gICAgICAgIGlzRW1wdHk6IGZhbHNlLFxuICAgICAgICBkYXRlOiBkYXRlT2JqLFxuICAgICAgICBpc286IGNlbGwuaXNvLFxuICAgICAgICBkYXlMYWJlbDogZGF0ZU9iai5nZXREYXRlKCksXG4gICAgICAgIGRheUNsYXNzLFxuICAgICAgICBkaXNhYmxlZCxcbiAgICAgIH07XG4gICAgfSk7XG4gIH0sIFtjYWxlbmRhci5jZWxscywgZW5kRGF0ZSwgaG92ZXJEYXRlLCBwcmV2aWV3RW5kLCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGVdKTtcblxyXG4gIGNvbnN0IHRpbWVsaW5lSXRlbXM6IFRpbWVsaW5lSXRlbVtdID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4gaXRlbXMubWFwKCh4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGFjdGl2aWRhZElkUmF3ID0gKHguYWN0aXZpZGFkSWQgPz8geC5BY3RpdmlkYWRJZCA/PyBcIlwiKS50b1N0cmluZygpLnRyaW0oKTtcclxuICAgICAgY29uc3QgYWN0aXZpZGFkSWQgPSBhY3RpdmlkYWRJZFJhdyB8fCBcIlwiO1xyXG4gICAgICBjb25zdCByZWNJZFJhdyA9IHgucmVjSWQgPz8geC5SZWNJZCA/PyBcIlwiO1xyXG4gICAgICBjb25zdCByZWNJZCA9IHJlY0lkUmF3ICYmICFOdW1iZXIuaXNOYU4oTnVtYmVyKHJlY0lkUmF3KSkgPyBOdW1iZXIocmVjSWRSYXcpIDogbnVsbDtcbiAgICAgIGxldCBsaW5rSWQgPSBhY3RpdmlkYWRJZCB8fCAocmVjSWQgPyByZWNJZC50b1N0cmluZygpIDogXCJcIik7XG5cbiAgICAgIGlmIChkZWJ1Z0xvZ2dlZFJlZi5jdXJyZW50IDwgNSkge1xuICAgICAgICBsb2dIaXN0b3J5KFwiYWN0aXZpdHkgaXRlbVwiLCB7IGFjdGl2aWRhZElkLCByZWNJZFJhdywgcmVjSWQgfSk7XG4gICAgICAgIGRlYnVnTG9nZ2VkUmVmLmN1cnJlbnQgKz0gMTtcbiAgICAgIH1cblxyXG4gICAgICBjb25zdCByYXdOYW1lID0gKHgubmFtZSA/PyB4Lk5hbWUgPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IGZ1bGxOYW1lID0gdG9UaXRsZUNhc2UocmF3TmFtZSwgbG9jYWxlKTtcclxuICAgICAgY29uc3QgZmVjaGEgPSAoeC50cmFuc0RhdGUgPz8geC5UcmFuc0RhdGUgPz8gXCJcIikudG9TdHJpbmcoKTtcclxuICAgICAgY29uc3QgcmF3RGVzYyA9ICh4LmRlc2NyaXB0aW9uID8/IHguRGVzY3JpcHRpb24gPz8gXCJcIikudG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IGZ1bGxEZXNjID0gcmF3RGVzYztcclxuXHJcbiAgICAgIGNvbnN0IGlzTm9EYXRhQ2FyZCA9ICFyYXdOYW1lICYmICFyYXdEZXNjO1xyXG4gICAgICBpZiAoaXNOb0RhdGFDYXJkKSB7XHJcbiAgICAgICAgbGlua0lkID0gXCJcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBpZDogbGlua0lkLFxyXG4gICAgICAgIGFjdGl2aWRhZElkLFxyXG4gICAgICAgIHJlY0lkLFxyXG4gICAgICAgIG5hbWU6IGZ1bGxOYW1lLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uOiBmdWxsRGVzYyB8fCBub0RhdGFUZXh0LFxyXG4gICAgICAgIGZ1bGxOYW1lLFxyXG4gICAgICAgIGZ1bGxEZXNjLFxyXG4gICAgICAgIGRhdGVQYXJ0czogZm9ybWF0RGF0ZVBhcnRzKGZlY2hhLCBsb2NhbGUpLFxyXG4gICAgICAgIGlzTm9EYXRhOiBpc05vRGF0YUNhcmQsXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9LCBbaXRlbXMsIGxvY2FsZSwgbm9EYXRhVGV4dF0pO1xyXG5cclxuICBjb25zdCBsYWJlbEZyb20gPSB0b1NlbnRlbmNlQ2FzZShpbmRUKFwiSGlzdG9yeV9Gcm9tXCIsIFwiRnJvbVwiKSwgbG9jYWxlKTtcbiAgY29uc3QgbGFiZWxUbyA9IHRvU2VudGVuY2VDYXNlKGluZFQoXCJIaXN0b3J5X1RvXCIsIFwiVG9cIiksIGxvY2FsZSk7XG4gIGNvbnN0IHN1bW1hcnlGcm9tID0gbGFiZWxGcm9tO1xuICBjb25zdCBzdW1tYXJ5VG8gPSBsYWJlbFRvO1xuICBjb25zdCBmaWx0ZXJUaXRsZSA9IGluZFQoXCJIaXN0b3J5X0ZpbHRlcl9EYXRlXCIsIFwiRGF0ZVwiKTtcbiAgY29uc3QgYWRkRGF0ZUxhYmVsID0gaW5kVChcIkhpc3RvcnlfQWRkRGF0ZVwiLCBcIkFkZCBkYXRlXCIpO1xuICBjb25zdCBjbGVhclJhbmdlTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9DbGVhclJhbmdlXCIsIFwiQ2xlYXIgcmFuZ2VcIik7XG4gIGNvbnN0IHByZXZNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfUHJldk1vbnRoXCIsIFwiUHJldmlvdXMgbW9udGhcIik7XG4gIGNvbnN0IG5leHRNb250aExhYmVsID0gaW5kVChcIkhpc3RvcnlfTmV4dE1vbnRoXCIsIFwiTmV4dCBtb250aFwiKTtcbiAgY29uc3Qgc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RTdGFydFwiLCBcIlNlbGVjdCBzdGFydCBkYXRlXCIpO1xuICBjb25zdCBzdGF0dXNTZWxlY3RFbmRMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1N0YXR1c19TZWxlY3RFbmRcIiwgXCJTZWxlY3QgZW5kIGRhdGVcIik7XG4gIGNvbnN0IHdlZWtEYXlMYWJlbHMgPSB1c2VNZW1vKFxuICAgICgpID0+IFtcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9Nb25cIiwgXCJNb25cIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfVHVlXCIsIFwiVHVlXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1dlZFwiLCBcIldlZFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9UaHVcIiwgXCJUaHVcIiksXG4gICAgICBpbmRUKFwiSGlzdG9yeV9EYXlfRnJpXCIsIFwiRnJpXCIpLFxuICAgICAgaW5kVChcIkhpc3RvcnlfRGF5X1NhdFwiLCBcIlNhdFwiKSxcbiAgICAgIGluZFQoXCJIaXN0b3J5X0RheV9TdW5cIiwgXCJTdW5cIiksXG4gICAgXSxcbiAgICBbXVxuICApO1xuICBjb25zdCBjbGVhckxhYmVsID0gaW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsZWFyXCIsIFwiQ2xlYXJcIik7XG4gIGNvbnN0IGFwcGx5TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQXBwbHlcIiwgXCJBcHBseVwiKTtcbiAgY29uc3QgY2xpZW50TGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9GaWx0ZXJfQ2xpZW50XCIsIFwiQ2xpZW50XCIpO1xyXG4gIGNvbnN0IHF1aWNrQ3VzdG9tTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja19DdXN0b21cIiwgXCJEYXRlXCIpO1xuICBjb25zdCBxdWljazdEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja183RGF5c1wiLCBcIjcgZGF5c1wiKTtcbiAgY29uc3QgcXVpY2szMERheXNMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1F1aWNrXzMwRGF5c1wiLCBcIjMwIGRheXNcIik7XG4gIGNvbnN0IHF1aWNrOTBEYXlzTGFiZWwgPSBpbmRUKFwiSGlzdG9yeV9RdWlja185MERheXNcIiwgXCI5MCBkYXlzXCIpO1xuICBjb25zdCBwYWdlRmlyc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfRmlyc3RcIiwgXCJGaXJzdFwiKTtcbiAgY29uc3QgcGFnZVByZXZMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfUHJldlwiLCBcIlByZXZpb3VzXCIpO1xuICBjb25zdCBwYWdlTmV4dExhYmVsID0gaW5kVChcIkhpc3RvcnlfUGFnZV9OZXh0XCIsIFwiTmV4dFwiKTtcbiAgY29uc3QgcGFnZUxhc3RMYWJlbCA9IGluZFQoXCJIaXN0b3J5X1BhZ2VfTGFzdFwiLCBcIkxhc3RcIik7XG4gIGNvbnN0IHF1aWNrRmlsdGVycyA9IHVzZU1lbW8oXG4gICAgKCkgPT4gW1xuICAgICAgeyBpZDogXCJjdXN0b21cIiBhcyBjb25zdCwgbGFiZWw6IHF1aWNrQ3VzdG9tTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy03XCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazdEYXlzTGFiZWwgfSxcbiAgICAgIHsgaWQ6IFwiZGF5cy0zMFwiIGFzIGNvbnN0LCBsYWJlbDogcXVpY2szMERheXNMYWJlbCB9LFxuICAgICAgeyBpZDogXCJkYXlzLTkwXCIgYXMgY29uc3QsIGxhYmVsOiBxdWljazkwRGF5c0xhYmVsIH0sXG4gICAgXSxcbiAgICBbcXVpY2szMERheXNMYWJlbCwgcXVpY2s3RGF5c0xhYmVsLCBxdWljazkwRGF5c0xhYmVsLCBxdWlja0N1c3RvbUxhYmVsXVxuICApO1xuICBjb25zdCBwYWdpbmF0aW9uTGFiZWxzID0gdXNlTWVtbyhcbiAgICAoKSA9PiAoe1xuICAgICAgZmlyc3Q6IHBhZ2VGaXJzdExhYmVsLFxuICAgICAgcHJldjogcGFnZVByZXZMYWJlbCxcbiAgICAgIG5leHQ6IHBhZ2VOZXh0TGFiZWwsXG4gICAgICBsYXN0OiBwYWdlTGFzdExhYmVsLFxuICAgIH0pLFxuICAgIFtwYWdlRmlyc3RMYWJlbCwgcGFnZUxhc3RMYWJlbCwgcGFnZU5leHRMYWJlbCwgcGFnZVByZXZMYWJlbF1cbiAgKTtcbiAgY29uc3Qgc2hvd0ZpbHRlckFjdGlvbnMgPSBzaG93RmlsdGVycztcbiAgY29uc3Qgc2hvd1N1bW1hcnkgPSAhc2hvd0ZpbHRlcnMgJiYgISFzdGFydERhdGUgJiYgISFlbmREYXRlO1xuICBjb25zdCBzaG93UmVzdWx0cyA9ICFzaG93RmlsdGVycztcbiAgY29uc3QgbWFudWFsUmFuZ2VSZWFkeSA9ICEhbWFudWFsU3RhcnREYXRlICYmICEhbWFudWFsRW5kRGF0ZTtcbiAgY29uc3Qgc2hvd0lubGluZVN1bW1hcnkgPVxuICAgICEhc3RhcnREYXRlICYmXG4gICAgISFlbmREYXRlICYmXG4gICAgIWlzT3BlbiAmJlxuICAgIChhY3RpdmVRdWlja0ZpbHRlciAhPT0gXCJjdXN0b21cIiB8fCBtYW51YWxSYW5nZVJlYWR5KTtcbiAgY29uc3Qgc2hvd01hbnVhbFBpY2tlciA9IGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmIHNob3dNYW51YWxQaWNrZXJQYW5lbDtcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTN4bCBteC1hdXRvIHB4LTEgc206cHgtMiBwdC0zIHBiLTQgc3BhY2UteS0yXCI+XHJcbiAgICAgIHtzaG93U3VtbWFyeSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLXN1bW1hcnkgcC0zIHNtOnAtNCBtdC0xIG1iLTNcIj5cbiAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgIHN1bW1hcnlGcm9tTGFiZWw9e3N1bW1hcnlGcm9tfVxuICAgICAgICAgICAgc3VtbWFyeVRvTGFiZWw9e3N1bW1hcnlUb31cbiAgICAgICAgICAgIGZyb21WYWx1ZT17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgICB0b1ZhbHVlPXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogXCItLVwifVxuICAgICAgICAgICAgY2xpZW50TGFiZWw9e2NsaWVudExhYmVsfVxuICAgICAgICAgICAgY2xpZW50VmFsdWU9e3NlbGVjdGVkQ2xpZW50Py50ZXh0IHx8IFwiXCJ9XG4gICAgICAgICAgICBzaG93Q2xpZW50PXshIXNlbGVjdGVkQ2xpZW50fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIHtzaG93RmlsdGVycyAmJiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmlsdGVyLWNhcmQgZmlsdGVyLWNhcmQtLWV4cGFuZGVkIHAtMiBzbTpwLTIuNSByZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgaGlzdG9yeS1maWx0ZXItc3RhY2sgZmxleCBmbGV4LWNvbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0yIGhpc3RvcnktcXVpY2stZmlsdGVyc1wiIGFyaWEtbGFiZWw9e2ZpbHRlclRpdGxlfT5cbiAgICAgICAgICAgIHtxdWlja0ZpbHRlcnMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gYWN0aXZlUXVpY2tGaWx0ZXIgPT09IGl0ZW0uaWQ7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPEZpbHRlckJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLmlkfVxuICAgICAgICAgICAgICAgICAgbGFiZWw9e2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgICBhY3RpdmU9e2lzQWN0aXZlfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVF1aWNrRmlsdGVyKGl0ZW0uaWQpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHtzaG93SW5saW5lU3VtbWFyeSAmJiAoXG4gICAgICAgICAgICA8SGlzdG9yeVN1bW1hcnlcbiAgICAgICAgICAgICAgc3VtbWFyeUZyb21MYWJlbD17c3VtbWFyeUZyb219XG4gICAgICAgICAgICAgIHN1bW1hcnlUb0xhYmVsPXtzdW1tYXJ5VG99XG4gICAgICAgICAgICAgIGZyb21WYWx1ZT17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgICAgIHRvVmFsdWU9e2VuZERhdGUgPyBmb3JtYXREaXNwbGF5KGVuZERhdGUsIGxvY2FsZSkgOiBcIi0tXCJ9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdhcC15LTEgdGV4dC1bMTFweF0gcHgtMVwiXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7c2hvd01hbnVhbFBpY2tlciAmJiAoXG4gICAgICAgICAgICA8SGlzdG9yeU1hbnVhbERhdGVQaWNrZXJcbiAgICAgICAgICAgICAgYWN0aXZhdG9yUmVmPXthY3RpdmF0b3JSZWZ9XG4gICAgICAgICAgICAgIHBvcG92ZXJSZWY9e3BvcG92ZXJSZWZ9XG4gICAgICAgICAgICAgIHNob3dNYW51YWxFcnJvcj17c2hvd01hbnVhbEVycm9yfVxuICAgICAgICAgICAgICBzaG93U3RhcnRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFzdGFydERhdGV9XG4gICAgICAgICAgICAgIHNob3dFbmRFcnJvcj17c2hvd01hbnVhbEVycm9yICYmICFlbmREYXRlfVxuICAgICAgICAgICAgICBmaWx0ZXJUaXRsZT17ZmlsdGVyVGl0bGV9XG4gICAgICAgICAgICAgIGlzT3Blbj17aXNPcGVufVxuICAgICAgICAgICAgICBzZWxlY3RpbmdTdGVwPXtzZWxlY3RpbmdTdGVwfVxuICAgICAgICAgICAgICBsYWJlbEZyb209e2xhYmVsRnJvbX1cbiAgICAgICAgICAgICAgbGFiZWxUbz17bGFiZWxUb31cbiAgICAgICAgICAgICAgc3RhcnREYXRlVGV4dD17c3RhcnREYXRlID8gZm9ybWF0RGlzcGxheShzdGFydERhdGUsIGxvY2FsZSkgOiBhZGREYXRlTGFiZWx9XG4gICAgICAgICAgICAgIGVuZERhdGVUZXh0PXtlbmREYXRlID8gZm9ybWF0RGlzcGxheShlbmREYXRlLCBsb2NhbGUpIDogYWRkRGF0ZUxhYmVsfVxuICAgICAgICAgICAgICBjbGVhclJhbmdlTGFiZWw9e2NsZWFyUmFuZ2VMYWJlbH1cbiAgICAgICAgICAgICAgaGFzU2VsZWN0ZWRSYW5nZT17ISFzdGFydERhdGUgfHwgISFlbmREYXRlfVxuICAgICAgICAgICAgICBtb250aExhYmVsPXtjYWxlbmRhci5sYWJlbH1cbiAgICAgICAgICAgICAgd2Vla0RheUxhYmVscz17d2Vla0RheUxhYmVsc31cbiAgICAgICAgICAgICAgc3RhdHVzVGV4dD17c2VsZWN0aW5nU3RlcCA9PT0gXCJzdGFydFwiID8gc3RhdHVzU2VsZWN0U3RhcnRMYWJlbCA6IHN0YXR1c1NlbGVjdEVuZExhYmVsfVxuICAgICAgICAgICAgICBkYXlDZWxscz17bWFudWFsRGF5Q2VsbHN9XG4gICAgICAgICAgICAgIHByZXZNb250aExhYmVsPXtwcmV2TW9udGhMYWJlbH1cbiAgICAgICAgICAgICAgbmV4dE1vbnRoTGFiZWw9e25leHRNb250aExhYmVsfVxuICAgICAgICAgICAgICBvbk9wZW5Qb3BvdmVyPXtvcGVuUG9wb3Zlcn1cbiAgICAgICAgICAgICAgb25BY3RpdmF0b3JLZXlEb3duPXtoYW5kbGVBY3RpdmF0b3JLZXlEb3dufVxuICAgICAgICAgICAgICBvblNlY3Rpb25LZXlEb3duPXtoYW5kbGVTZWN0aW9uS2V5RG93bn1cbiAgICAgICAgICAgICAgb25DbGVhcj17aGFuZGxlQ2xlYXJ9XG4gICAgICAgICAgICAgIG9uUHJldk1vbnRoPXtoYW5kbGVQcmV2TW9udGh9XG4gICAgICAgICAgICAgIG9uTmV4dE1vbnRoPXtoYW5kbGVOZXh0TW9udGh9XG4gICAgICAgICAgICAgIG9uR3JpZE1vdXNlTGVhdmU9e2hhbmRsZUdyaWRNb3VzZUxlYXZlfVxuICAgICAgICAgICAgICBvbkRheUNsaWNrPXtoYW5kbGVNYW51YWxEYXlDbGlja31cbiAgICAgICAgICAgICAgb25EYXlIb3Zlcj17aGFuZGxlTWFudWFsRGF5SG92ZXJ9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG5cclxuICAgICAgICAgIDxDbGllbnRTZWFyY2hDb21ib2JveFxyXG4gICAgICAgICAgICBrZXk9e2NsaWVudFJlc2V0S2V5fVxyXG4gICAgICAgICAgICB2YWx1ZT17c2VsZWN0ZWRDbGllbnR9XHJcbiAgICAgICAgICAgIG9uU2VsZWN0ZWQ9e2hhbmRsZUNsaWVudFNlbGVjdGVkfVxyXG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIkhpc3RvcnlfRmlsdGVyX0NsaWVudFwiLCBcIkNsaWVudFwiKX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJIaXN0b3J5X0ZpbHRlcl9DbGllbnRcIiwgXCJDbGllbnRcIil9XHJcbiAgICAgICAgICAgIHZhcmlhbnQ9XCJjb21wYWN0XCJcclxuICAgICAgICAgICAgc2hvd0xhYmVsPXtmYWxzZX1cclxuICAgICAgICAgICAgaWRCYXNlPVwiaGlzdG9yeS1jbGllbnRcIlxyXG4gICAgICAgICAgICBwb3J0YWxDbGFzc05hbWU9XCJ2aXNpdGFzLXR5cG9ncmFwaHlcIlxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICB7c2hvd0ZpbHRlckFjdGlvbnMgJiYgKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZ3JpZCBncmlkLWNvbHMtMiBnYXAtMiBoaXN0b3J5LWZpbHRlci1hY3Rpb25zXCI+XG4gICAgICAgICAgICAgIDxBY3Rpb25CdXR0b25cbiAgICAgICAgICAgICAgICBsYWJlbD17Y2xlYXJMYWJlbH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGxcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlc2V0RmlsdGVyc31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPEFjdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgIGxhYmVsPXthcHBseUxhYmVsfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKHsgY2xvc2VQYW5lbDogdHJ1ZSwgcGFnZTogMSB9KTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICApfVxyXG5cclxuICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImZyb21EYXRlXCIgdmFsdWU9e2Zyb21EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJ0b0RhdGVcIiB2YWx1ZT17dG9EYXRlVmFsdWV9IHJlYWRPbmx5IC8+XHJcblxyXG4gICAgICA8ZGl2XHJcbiAgICAgICAgaWQ9XCJyZXN1bHRzTG9hZGVyXCJcclxuICAgICAgICBjbGFzc05hbWU9XCJsb2FkZXItYm94IGdsYXNzLXBhbmVsIHNoYWRvdy1jYXJkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc20gdGV4dC1zbGF0ZS03MDBcIlxyXG4gICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6IGlzTG9hZGluZyA/IFwiZmxleFwiIDogXCJub25lXCIgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxzdmcgY2xhc3NOYW1lPVwiaW5kLXNwaW5uZXIgaC01IHctNVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIiByb2xlPVwic3RhdHVzXCIgYXJpYS1sYWJlbD17aW5kVChcIkhpc3RvcnlfTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PlxyXG4gICAgICAgICAgPGNpcmNsZSBjbGFzc05hbWU9XCJpbmQtc3Bpbm5lcl9fY2lyY2xlXCIgY3g9XCIxMFwiIGN5PVwiMTBcIiByPVwiOFwiIHN0cm9rZVdpZHRoPVwiMlwiIC8+XHJcbiAgICAgICAgPC9zdmc+XHJcbiAgICAgICAge2luZFQoXCJIaXN0b3J5X0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfVxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIHtzaG93UmVzdWx0cyAmJiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxIaXN0b3J5VGFibGVcclxuICAgICAgICAgICAgaXRlbXM9e3RpbWVsaW5lSXRlbXN9XHJcbiAgICAgICAgICAgIG5vRGF0YVRleHQ9e2luZFQoXCJIaXN0b3J5X05vRGF0YUluUmFuZ2VcIiwgXCJObyB2aXNpdHMgaW4gdGhpcyByYW5nZVwiKX1cclxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlPXtlcnJvck1lc3NhZ2V9XHJcbiAgICAgICAgICAgIG9uTmF2aWdhdGU9e2hhbmRsZU5hdmlnYXRlfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8Q29tcGFjdFBhZ2luYXRpb25cbiAgICAgICAgICAgIHJlZj17cGFnaW5hdGlvblJlZn1cbiAgICAgICAgICAgIHRvdGFsUGFnZXM9e3RvdGFsUGFnZXN9XG4gICAgICAgICAgICBjdXJyZW50UGFnZT17Y3VycmVudFBhZ2V9XG4gICAgICAgICAgICBwYWdlV2luZG93PXtQQUdFX1dJTkRPV31cbiAgICAgICAgICAgIG9uUGFnZUNoYW5nZT17KHBhZ2UpID0+IGxvYWRBY3Rpdml0aWVzKHBhZ2UpfVxuICAgICAgICAgICAgbGFiZWxzPXtwYWdpbmF0aW9uTGFiZWxzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICAgIHtjYW5DcmVhdGVWaXNpdCAmJiAoXHJcbiAgICAgICAgPEZsb2F0aW5nQWN0aW9uQnV0dG9uXG4gICAgICAgICAgcm91dGU9XCIvVmlzaXRhcy9DcmVhdGU/ZnJlc2g9MVwiXG4gICAgICAgICAgYXJpYUxhYmVsPXtpbmRUKFwiQ29tbW9uX0NyZWF0ZVwiLCBcIkNyZWF0ZVwiKX1cbiAgICAgICAgICBzaXplPXs3Nn1cbiAgICAgICAgICByaWdodD17MTZ9XG4gICAgICAgICAgYm90dG9tPXtmYWJCb3R0b219XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBNb3VudCBoZWxwZXIgZm9yIHRoZSBsZWdhY3kgUmF6b3Igdmlldy5cbmV4cG9ydCBjb25zdCBtb3VudEhpc3RvcnlQYWdlID0gKHJvb3Q6IEhUTUxFbGVtZW50KSA9PiB7XG4gIGNvbnN0IGRlZmF1bHRGcm9tRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LWZyb21cIikgfHwgXCJcIjtcbiAgY29uc3QgZGVmYXVsdFRvRGF0ZSA9IHJvb3QuZ2V0QXR0cmlidXRlKFwiZGF0YS1kZWZhdWx0LXRvXCIpIHx8IFwiXCI7XG5cbiAgbW91bnRSZWFjdElzbGFuZChyb290LCA8SGlzdG9yeVBhZ2UgZGVmYXVsdEZyb21EYXRlPXtkZWZhdWx0RnJvbURhdGV9IGRlZmF1bHRUb0RhdGU9e2RlZmF1bHRUb0RhdGV9IC8+KTtcbn07XG5cclxuY29uc3QgbW91bnQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhcy1oaXN0b3J5LXJvb3RcIik7XG4gIGlmICghcm9vdEVsKSByZXR1cm47XG4gIG1vdW50SGlzdG9yeVBhZ2Uocm9vdEVsKTtcbn07XG5cbm1vdW50V2hlbkRvY3VtZW50UmVhZHkobW91bnQpO1xuXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5UGFnZTtcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIFRpbWVsaW5lRGF0ZVBhcnRzID0ge1xyXG4gIHllYXI6IHN0cmluZztcclxuICBtb250aDogc3RyaW5nO1xyXG4gIGRheTogc3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVGltZWxpbmVJdGVtID0ge1xyXG4gIGlkOiBzdHJpbmc7XHJcbiAgYWN0aXZpZGFkSWQ/OiBzdHJpbmc7XHJcbiAgcmVjSWQ/OiBudW1iZXIgfCBudWxsO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGZ1bGxOYW1lOiBzdHJpbmc7XHJcbiAgZnVsbERlc2M6IHN0cmluZztcclxuICBkYXRlUGFydHM6IFRpbWVsaW5lRGF0ZVBhcnRzO1xyXG4gIGlzTm9EYXRhOiBib29sZWFuO1xyXG59O1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICBpdGVtczogVGltZWxpbmVJdGVtW107XHJcbiAgbm9EYXRhVGV4dDogc3RyaW5nO1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIG9uTmF2aWdhdGU6IChsaW5rSWQ6IHN0cmluZykgPT4gdm9pZDtcclxufTtcclxuXHJcbmNvbnN0IFRBUF9NT1ZFX1BYID0gMTQ7XHJcbmNvbnN0IFRPT0xUSVBfVE9VQ0hfREVMQVlfTVMgPSAxMjA7XHJcbmNvbnN0IEhPTERfVE9fUFJFVklFV19NUyA9IDE2MDtcclxuY29uc3QgVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPID0gMC44O1xyXG5jb25zdCBUT09MVElQX0JBU0VfRk9OVCA9IDEzO1xyXG5jb25zdCBUT09MVElQX01JTl9GT05UID0gMTE7XHJcbmNvbnN0IEVMTElQU0lTID0gXCIuLi5cIjtcclxuY29uc3QgUElYRUxfR0FQID0gNTtcclxuY29uc3QgUElYRUxfU1BFRUQgPSA5NTtcclxuY29uc3QgUElYRUxfQ09MT1JTID0gW1wicmdiYSgwLCA0MSwgMTA3LCAwLjA4KVwiLCBcInJnYmEoMCwgNDEsIDEwNywgMC4xNilcIiwgXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMjYpXCJdO1xyXG5cclxudHlwZSBQaXhlbFN0YXRlID0ge1xyXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgcGl4ZWxzOiBQaXhlbFtdO1xyXG4gIGFuaW1JZDogbnVtYmVyIHwgbnVsbDtcclxuICBsYXN0VGltZTogbnVtYmVyO1xyXG4gIHJlZHVjZWRNb3Rpb246IGJvb2xlYW47XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxufTtcclxuXHJcbi8vIENvbXB1dGUgcGl4ZWwgc3BlZWQgd2hpbGUgcmVzcGVjdGluZyByZWR1Y2VkIG1vdGlvbiBwcmVmZXJlbmNlLlxyXG5jb25zdCBnZXRFZmZlY3RpdmVTcGVlZCA9ICh2YWx1ZTogbnVtYmVyLCByZWR1Y2VkTW90aW9uOiBib29sZWFuKSA9PiB7XHJcbiAgY29uc3QgbWluID0gMDtcclxuICBjb25zdCBtYXggPSAxMDA7XHJcbiAgY29uc3QgdGhyb3R0bGUgPSAwLjAwMTtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIucGFyc2VJbnQoU3RyaW5nKHZhbHVlKSwgMTApO1xyXG5cclxuICBpZiAocGFyc2VkIDw9IG1pbiB8fCByZWR1Y2VkTW90aW9uKSByZXR1cm4gbWluO1xyXG4gIGlmIChwYXJzZWQgPj0gbWF4KSByZXR1cm4gbWF4ICogdGhyb3R0bGU7XHJcbiAgcmV0dXJuIHBhcnNlZCAqIHRocm90dGxlO1xyXG59O1xyXG5cclxuLy8gUGl4ZWwgdXNlZCBieSB0aGUgaG92ZXIgYW5pbWF0aW9uIGNhbnZhcy5cclxuY2xhc3MgUGl4ZWwge1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxuICBjb2xvcjogc3RyaW5nO1xyXG4gIHNwZWVkOiBudW1iZXI7XHJcbiAgc2l6ZTogbnVtYmVyO1xyXG4gIHNpemVTdGVwOiBudW1iZXI7XHJcbiAgbWluU2l6ZTogbnVtYmVyO1xyXG4gIG1heFNpemVJbnRlZ2VyOiBudW1iZXI7XHJcbiAgbWF4U2l6ZTogbnVtYmVyO1xyXG4gIHBoYXNlOiBudW1iZXI7XHJcbiAgcGhhc2VTdGVwOiBudW1iZXI7XHJcbiAgZGVsYXk6IG51bWJlcjtcclxuICBjb3VudGVyOiBudW1iZXI7XHJcbiAgY291bnRlclN0ZXA6IG51bWJlcjtcclxuICBpc0lkbGU6IGJvb2xlYW47XHJcbiAgaXNSZXZlcnNlOiBib29sZWFuO1xyXG4gIGlzU2hpbW1lcjogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB4OiBudW1iZXIsIHk6IG51bWJlciwgY29sb3I6IHN0cmluZywgc3BlZWQ6IG51bWJlciwgZGVsYXk6IG51bWJlcikge1xyXG4gICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIHRoaXMuY3R4ID0gY29udGV4dDtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUoMC4xLCAwLjkpICogc3BlZWQ7XHJcbiAgICB0aGlzLnNpemUgPSAwO1xyXG4gICAgdGhpcy5zaXplU3RlcCA9IE1hdGgucmFuZG9tKCkgKiAwLjMgKyAwLjE7XHJcbiAgICB0aGlzLm1pblNpemUgPSAwLjU7XHJcbiAgICB0aGlzLm1heFNpemVJbnRlZ2VyID0gMjtcclxuICAgIHRoaXMubWF4U2l6ZSA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUodGhpcy5taW5TaXplLCB0aGlzLm1heFNpemVJbnRlZ2VyKTtcclxuICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcclxuICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICB0aGlzLmNvdW50ZXJTdGVwID0gTWF0aC5yYW5kb20oKSAqIDUgKyAodGhpcy53aWR0aCArIHRoaXMuaGVpZ2h0KSAqIDAuMDE1O1xyXG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNSZXZlcnNlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzU2hpbW1lciA9IGZhbHNlO1xyXG4gICAgdGhpcy5waGFzZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcclxuICAgIHRoaXMucGhhc2VTdGVwID0gTWF0aC5tYXgoMCwgdGhpcy5zcGVlZCAqICgwLjggKyBNYXRoLnJhbmRvbSgpICogMC42KSk7XHJcbiAgfVxyXG5cclxuICAvLyBSZXR1cm4gYSByYW5kb20gZmxvYXQgYmV0d2VlbiBtaW4gYW5kIG1heC5cclxuICBnZXRSYW5kb21WYWx1ZShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XHJcbiAgfVxyXG5cclxuICAvLyBEcmF3IHRoZSBwaXhlbCBhdCBpdHMgY3VycmVudCBzaXplLlxyXG4gIGRyYXcoKSB7XHJcbiAgICBjb25zdCBjZW50ZXJPZmZzZXQgPSB0aGlzLm1heFNpemVJbnRlZ2VyICogMC41IC0gdGhpcy5zaXplICogMC41O1xyXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCArIGNlbnRlck9mZnNldCwgdGhpcy55ICsgY2VudGVyT2Zmc2V0LCB0aGlzLnNpemUsIHRoaXMuc2l6ZSk7XHJcbiAgfVxyXG5cclxuICAvLyBBbmltYXRlIHRoZSBwaXhlbCBhcHBlYXJpbmcuXHJcbiAgYXBwZWFyKCkge1xyXG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLmNvdW50ZXIgPD0gdGhpcy5kZWxheSkge1xyXG4gICAgICB0aGlzLmNvdW50ZXIgKz0gdGhpcy5jb3VudGVyU3RlcDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2l6ZSA+PSB0aGlzLm1heFNpemUpIHtcclxuICAgICAgdGhpcy5pc1NoaW1tZXIgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNTaGltbWVyKSB7XHJcbiAgICAgIHRoaXMuc2hpbW1lcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaXplICs9IHRoaXMuc2l6ZVN0ZXA7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG4gIC8vIEFuaW1hdGUgdGhlIHBpeGVsIGRpc2FwcGVhcmluZy5cclxuICBkaXNhcHBlYXIoKSB7XHJcbiAgICB0aGlzLmlzU2hpbW1lciA9IGZhbHNlO1xyXG4gICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgIGlmICh0aGlzLnNpemUgPD0gMCkge1xyXG4gICAgICB0aGlzLmlzSWRsZSA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2l6ZSAtPSAwLjE7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG4gIC8vIE9zY2lsbGF0ZSBwaXhlbCBzaXplIHdoaWxlIHZpc2libGUuXHJcbiAgc2hpbW1lcigpIHtcclxuICAgIGlmICghdGhpcy5waGFzZVN0ZXApIHJldHVybjtcclxuICAgIHRoaXMucGhhc2UgKz0gdGhpcy5waGFzZVN0ZXA7XHJcbiAgICBjb25zdCBhbXAgPSAodGhpcy5tYXhTaXplIC0gdGhpcy5taW5TaXplKSAqIDAuNTtcclxuICAgIHRoaXMuc2l6ZSA9IHRoaXMubWluU2l6ZSArIGFtcCArIGFtcCAqIE1hdGguc2luKHRoaXMucGhhc2UpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQ3JlYXRlIHRoZSBwaXhlbCBjYW52YXMgaG92ZXIgZWZmZWN0IGZvciBhIHRpbWVsaW5lIGNhcmQuXHJcbmNvbnN0IGNyZWF0ZVBpeGVsRWZmZWN0ID0gKGNhcmRFbDogSFRNTEVsZW1lbnQpID0+IHtcclxuICBpZiAoIWNhcmRFbCkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICBjYW52YXMuY2xhc3NOYW1lID0gXCJ0aW1lbGluZS1waXhlbC1jYW52YXNcIjtcclxuICBjYXJkRWwuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuXHJcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBpZiAoIWN0eCkge1xyXG4gICAgY2FudmFzLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWR1Y2VkTW90aW9uID0gd2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKS5tYXRjaGVzO1xyXG4gIGNvbnN0IHN0YXRlOiBQaXhlbFN0YXRlID0ge1xyXG4gICAgY2FudmFzLFxyXG4gICAgY3R4LFxyXG4gICAgcGl4ZWxzOiBbXSxcclxuICAgIGFuaW1JZDogbnVsbCxcclxuICAgIGxhc3RUaW1lOiBwZXJmb3JtYW5jZS5ub3coKSxcclxuICAgIHJlZHVjZWRNb3Rpb24sXHJcbiAgICB3aWR0aDogMCxcclxuICAgIGhlaWdodDogMCxcclxuICB9O1xyXG5cclxuICBjb25zdCBpbml0UGl4ZWxzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmVjdCA9IGNhcmRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihyZWN0LndpZHRoKSk7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHJlY3QuaGVpZ2h0KSk7XHJcbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHJldHVybjtcclxuXHJcbiAgICBzdGF0ZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgc3RhdGUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xyXG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XHJcblxyXG4gICAgY29uc3QgZ2FwID0gTWF0aC5tYXgoMywgTWF0aC5mbG9vcihQSVhFTF9HQVApKTtcclxuICAgIGNvbnN0IHNwZWVkID0gZ2V0RWZmZWN0aXZlU3BlZWQoUElYRUxfU1BFRUQsIHJlZHVjZWRNb3Rpb24pO1xyXG4gICAgY29uc3QgcGl4ZWxzOiBQaXhlbFtdID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCArPSBnYXApIHtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkgKz0gZ2FwKSB7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBQSVhFTF9DT0xPUlNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogUElYRUxfQ09MT1JTLmxlbmd0aCldO1xyXG4gICAgICAgIGNvbnN0IGR4ID0geCAtIHdpZHRoIC8gMjtcclxuICAgICAgICBjb25zdCBkeSA9IHkgLSBoZWlnaHQgLyAyO1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICAgICAgICBjb25zdCBkZWxheSA9IHJlZHVjZWRNb3Rpb24gPyAwIDogZGlzdGFuY2UgKiAwLjM1O1xyXG4gICAgICAgIHBpeGVscy5wdXNoKG5ldyBQaXhlbChjYW52YXMsIGN0eCwgeCwgeSwgY29sb3IsIHNwZWVkLCBkZWxheSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGUucGl4ZWxzID0gcGl4ZWxzO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRvQW5pbWF0ZSA9IChmbk5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XHJcbiAgICBzdGF0ZS5hbmltSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gZG9BbmltYXRlKGZuTmFtZSkpO1xyXG4gICAgY29uc3QgdGltZU5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgY29uc3QgdGltZVBhc3NlZCA9IHRpbWVOb3cgLSBzdGF0ZS5sYXN0VGltZTtcclxuICAgIGNvbnN0IHRpbWVJbnRlcnZhbCA9IDEwMDAgLyA2MDtcclxuXHJcbiAgICBpZiAodGltZVBhc3NlZCA8IHRpbWVJbnRlcnZhbCkgcmV0dXJuO1xyXG4gICAgc3RhdGUubGFzdFRpbWUgPSB0aW1lTm93IC0gKHRpbWVQYXNzZWQgJSB0aW1lSW50ZXJ2YWwpO1xyXG5cclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc3RhdGUud2lkdGgsIHN0YXRlLmhlaWdodCk7XHJcblxyXG4gICAgbGV0IGFsbElkbGUgPSB0cnVlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS5waXhlbHMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgcGl4ZWwgPSBzdGF0ZS5waXhlbHNbaV07XHJcbiAgICAgIHBpeGVsW2ZuTmFtZV0oKTtcclxuICAgICAgaWYgKCFwaXhlbC5pc0lkbGUpIGFsbElkbGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChhbGxJZGxlICYmIHN0YXRlLmFuaW1JZCkge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xyXG4gICAgICBzdGF0ZS5hbmltSWQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFuaW1hdGlvbiA9IChuYW1lOiBcImFwcGVhclwiIHwgXCJkaXNhcHBlYXJcIikgPT4ge1xyXG4gICAgaWYgKCFzdGF0ZS5waXhlbHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICBpZiAoc3RhdGUuYW5pbUlkKSBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xyXG4gICAgc3RhdGUubGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgIHN0YXRlLmFuaW1JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBkb0FuaW1hdGUobmFtZSkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uRW50ZXIgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJhcHBlYXJcIik7XHJcbiAgY29uc3Qgb25MZWF2ZSA9ICgpID0+IGhhbmRsZUFuaW1hdGlvbihcImRpc2FwcGVhclwiKTtcclxuXHJcbiAgY2FyZEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xyXG4gIGNhcmRFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbkxlYXZlKTtcclxuXHJcbiAgbGV0IHJvOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xyXG4gIGlmICh0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJvID0gbmV3IFJlc2l6ZU9ic2VydmVyKGluaXRQaXhlbHMpO1xyXG4gICAgcm8ub2JzZXJ2ZShjYXJkRWwpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFBpeGVscygpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2FyZEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xyXG4gICAgY2FyZEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTGVhdmUpO1xyXG4gICAgaWYgKHN0YXRlLmFuaW1JZCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhdGUuYW5pbUlkKTtcclxuICAgIGlmIChybykgcm8uZGlzY29ubmVjdCgpO1xyXG4gICAgY2FudmFzLnJlbW92ZSgpO1xyXG4gIH07XHJcbn07XHJcblxyXG4vLyBTaG9ydGVuIG92ZXJmbG93aW5nIHRleHQgd2l0aCBhIGNvbXB1dGVkIGVsbGlwc2lzLlxyXG5jb25zdCBhcHBseUVsbGlwc2lzID0gKGVsOiBIVE1MRWxlbWVudCwgZnVsbFRleHQ6IHN0cmluZywgbXVsdGlMaW5lOiBib29sZWFuKSA9PiB7XHJcbiAgaWYgKCFlbCB8fCAhZnVsbFRleHQpIHJldHVybiBmYWxzZTtcclxuICBpZiAobXVsdGlMaW5lICYmIGVsLmNsaWVudEhlaWdodCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmICghbXVsdGlMaW5lICYmIGVsLmNsaWVudFdpZHRoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChtdWx0aUxpbmUpIHtcclxuICAgIGNvbnN0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG4gICAgbGV0IGxpbmVIZWlnaHQgPSBOdW1iZXIucGFyc2VGbG9hdChjb21wdXRlZC5saW5lSGVpZ2h0KTtcclxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKGxpbmVIZWlnaHQpKSB7XHJcbiAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgbGluZUhlaWdodCA9IHJlY3QuaGVpZ2h0ID4gMCA/IHJlY3QuaGVpZ2h0IC8gMiA6IDA7XHJcbiAgICB9XHJcbiAgICBpZiAobGluZUhlaWdodCA+IDApIHtcclxuICAgICAgZWwuc3R5bGUubWF4SGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChsaW5lSGVpZ2h0ICogMil9cHhgO1xyXG4gICAgICBlbC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbC50ZXh0Q29udGVudCA9IGZ1bGxUZXh0O1xyXG5cclxuICBjb25zdCBpc092ZXJmbG93aW5nID0gKCkgPT4gKFxyXG4gICAgbXVsdGlMaW5lXHJcbiAgICAgID8gZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICsgMVxyXG4gICAgICA6IGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggKyAxXHJcbiAgKTtcclxuXHJcbiAgaWYgKCFpc092ZXJmbG93aW5nKCkpIHtcclxuICAgIGVsLmRhdGFzZXQucHJldmlldyA9IFwiMFwiO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbGV0IGxvdyA9IDA7XHJcbiAgbGV0IGhpZ2ggPSBmdWxsVGV4dC5sZW5ndGg7XHJcbiAgbGV0IGJlc3QgPSAwO1xyXG5cclxuICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcclxuICAgIGNvbnN0IG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XHJcbiAgICBjb25zdCBjYW5kaWRhdGUgPSBgJHtmdWxsVGV4dC5zbGljZSgwLCBNYXRoLm1heCgwLCBtaWQpKS50cmltRW5kKCl9JHtFTExJUFNJU31gO1xyXG4gICAgZWwudGV4dENvbnRlbnQgPSBjYW5kaWRhdGU7XHJcbiAgICBpZiAoaXNPdmVyZmxvd2luZygpKSB7XHJcbiAgICAgIGhpZ2ggPSBtaWQgLSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmVzdCA9IG1pZDtcclxuICAgICAgbG93ID0gbWlkICsgMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVsLnRleHRDb250ZW50ID0gYCR7ZnVsbFRleHQuc2xpY2UoMCwgTWF0aC5tYXgoMCwgYmVzdCkpLnRyaW1FbmQoKX0ke0VMTElQU0lTfWA7XHJcbiAgZWwuZGF0YXNldC5wcmV2aWV3ID0gXCIxXCI7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG50eXBlIFRhcEd1YXJkU3RhdGUgPSB7XG4gIGFjdGl2ZTogYm9vbGVhbjtcbiAgcG9pbnRlcklkOiBudW1iZXIgfCBudWxsO1xuICBzdGFydFg6IG51bWJlcjtcbiAgc3RhcnRZOiBudW1iZXI7XG4gIHN0YXJ0VGltZTogbnVtYmVyO1xuICBtb3ZlZDogYm9vbGVhbjtcbiAgbGlua0lkOiBzdHJpbmc7XG59O1xuXHJcbmNvbnN0IEhpc3RvcnlUYWJsZSA9ICh7IGl0ZW1zLCBub0RhdGFUZXh0LCBlcnJvck1lc3NhZ2UsIG9uTmF2aWdhdGUgfTogUHJvcHMpID0+IHtcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHRvb2x0aXBSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgdG9vbHRpcEFuY2hvclJlZiA9IHVzZVJlZjxIVE1MRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB0b29sdGlwQ2xvc2VCb3VuZFJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IHRhcEd1YXJkUmVmID0gdXNlUmVmPFRhcEd1YXJkU3RhdGU+KHtcbiAgICBhY3RpdmU6IGZhbHNlLFxuICAgIHBvaW50ZXJJZDogbnVsbCxcbiAgICBzdGFydFg6IDAsXG4gICAgc3RhcnRZOiAwLFxuICAgIHN0YXJ0VGltZTogMCxcbiAgICBtb3ZlZDogZmFsc2UsXG4gICAgbGlua0lkOiBcIlwiLFxuICB9KTtcblxuICBjb25zdCByZXNvbHZlQ2xpY2thYmxlQ2FyZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xuICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGNhcmQgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmQtLWNsaWNrYWJsZVtkYXRhLWxpbmstaWRdXCIpO1xuICAgIGlmICghY2FyZCkgcmV0dXJuIG51bGw7XG4gICAgaWYgKCFjb250YWluZXJSZWYuY3VycmVudD8uY29udGFpbnMoY2FyZCkpIHJldHVybiBudWxsO1xuICAgIHJldHVybiBjYXJkO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcmVzZXRUYXBHdWFyZCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50LmFjdGl2ZSA9IGZhbHNlO1xuICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQucG9pbnRlcklkID0gbnVsbDtcbiAgICB0YXBHdWFyZFJlZi5jdXJyZW50Lm1vdmVkID0gZmFsc2U7XG4gICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBcIlwiO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlckRvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICAgIGlmIChldmVudC5wb2ludGVyVHlwZSA9PT0gXCJtb3VzZVwiICYmIGV2ZW50LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xuICAgICAgY29uc3QgY2FyZCA9IHJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCk7XG4gICAgICBpZiAoIWNhcmQpIHJldHVybjtcbiAgICAgIGNvbnN0IGxpbmtJZCA9IGNhcmQuZGF0YXNldC5saW5rSWQgfHwgXCJcIjtcbiAgICAgIGlmICghbGlua0lkKSByZXR1cm47XG5cbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRhcEd1YXJkUmVmLmN1cnJlbnQucG9pbnRlcklkID0gZXZlbnQucG9pbnRlcklkO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFggPSBldmVudC5jbGllbnRYO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFkgPSBldmVudC5jbGllbnRZO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5zdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5tb3ZlZCA9IGZhbHNlO1xuICAgICAgdGFwR3VhcmRSZWYuY3VycmVudC5saW5rSWQgPSBsaW5rSWQ7XG4gICAgfSxcbiAgICBbcmVzb2x2ZUNsaWNrYWJsZUNhcmRdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlUG9pbnRlck1vdmUgPSB1c2VDYWxsYmFjaygoZXZlbnQ6IFJlYWN0LlBvaW50ZXJFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IHRhcEd1YXJkUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcbiAgICBjb25zdCBkeCA9IE1hdGguYWJzKGV2ZW50LmNsaWVudFggLSBzdGF0ZS5zdGFydFgpO1xuICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMoZXZlbnQuY2xpZW50WSAtIHN0YXRlLnN0YXJ0WSk7XG4gICAgaWYgKGR4ID4gVEFQX01PVkVfUFggfHwgZHkgPiBUQVBfTU9WRV9QWCkge1xuICAgICAgc3RhdGUubW92ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVBvaW50ZXJVcCA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3QuUG9pbnRlckV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB0YXBHdWFyZFJlZi5jdXJyZW50O1xuICAgICAgaWYgKCFzdGF0ZS5hY3RpdmUgfHwgZXZlbnQucG9pbnRlcklkICE9PSBzdGF0ZS5wb2ludGVySWQpIHJldHVybjtcbiAgICAgIGNvbnN0IGxpbmtJZCA9IHN0YXRlLmxpbmtJZDtcbiAgICAgIGNvbnN0IGhlbGRNcyA9IERhdGUubm93KCkgLSBzdGF0ZS5zdGFydFRpbWU7XG4gICAgICBjb25zdCBzaG91bGRUYXAgPSAhc3RhdGUubW92ZWQgJiYgaGVsZE1zIDwgSE9MRF9UT19QUkVWSUVXX01TO1xuICAgICAgcmVzZXRUYXBHdWFyZCgpO1xuICAgICAgaWYgKHNob3VsZFRhcCAmJiBsaW5rSWQpIHtcbiAgICAgICAgb25OYXZpZ2F0ZShsaW5rSWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW29uTmF2aWdhdGUsIHJlc2V0VGFwR3VhcmRdXG4gICk7XG5cbiAgY29uc3QgYmxvY2tDbGlwYm9hcmRBY3Rpb24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LkNsaXBib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PiB8IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoIXJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCkpIHJldHVybjtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSxcbiAgICBbcmVzb2x2ZUNsaWNrYWJsZUNhcmRdXG4gICk7XG5cclxuICAvLyBFbnN1cmUgdGhlIHNoYXJlZCB0b29sdGlwIGVsZW1lbnQgZXhpc3RzIG9uY2UuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0b29sdGlwUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIGxldCB0b29sdGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lbGluZVRvb2x0aXBcIikgYXMgSFRNTERpdkVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCF0b29sdGlwKSB7XHJcbiAgICAgIHRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB0b29sdGlwLmlkID0gXCJ0aW1lbGluZVRvb2x0aXBcIjtcclxuICAgICAgdG9vbHRpcC5jbGFzc05hbWUgPSBcInRpbWVsaW5lLXRvb2x0aXBcIjtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwKTtcclxuICAgIH1cclxuICAgIHRvb2x0aXBSZWYuY3VycmVudCA9IHRvb2x0aXA7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lclJlZi5jdXJyZW50O1xuICAgIGNvbnN0IHRvb2x0aXBFbCA9IHRvb2x0aXBSZWYuY3VycmVudDtcbiAgICBpZiAoIWNvbnRhaW5lciB8fCAhdG9vbHRpcEVsKSByZXR1cm47XG5cbiAgICBjb25zdCBjbGVhbnVwczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcblxyXG4gICAgLy8gQ2xvc2UgdG9vbHRpcCBvbiBvdXRzaWRlIGludGVyYWN0aW9uLlxyXG4gICAgaWYgKCF0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHRvb2x0aXBDbG9zZUJvdW5kUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICBjb25zdCBvblBvaW50ZXJEb3duID0gKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoIXRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgYW5jaG9yID0gdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50O1xyXG4gICAgICAgIGlmIChhbmNob3IgJiYgYW5jaG9yLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSkgcmV0dXJuO1xyXG4gICAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBvbktleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uUG9pbnRlckRvd24sIHRydWUpO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gICAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93biwgdHJ1ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcclxuICAgICAgICB0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNob3cgdG9vbHRpcCBjb250ZW50IGNlbnRlcmVkIG9uIHNjcmVlbi5cclxuICAgIGNvbnN0IHNob3dUb29sdGlwID0gKHRleHQ6IHN0cmluZywgYW5jaG9yPzogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgdG9vbHRpcEVsLnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBhbmNob3IgfHwgbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IGNlbnRlclggPSBNYXRoLnJvdW5kKHdpbmRvdy5pbm5lcldpZHRoIC8gMik7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5sZWZ0ID0gYCR7Y2VudGVyWH1weGA7XHJcblxyXG4gICAgICBjb25zdCBtYXJnaW4gPSAxMjtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLm1heEhlaWdodCA9IGAke01hdGgucm91bmQod2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPKX1weGA7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5vdmVyZmxvd1kgPSBcImF1dG9cIjtcclxuXHJcbiAgICAgIGxldCBmb250U2l6ZSA9IFRPT0xUSVBfQkFTRV9GT05UO1xyXG4gICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XHJcblxyXG4gICAgICBsZXQgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPO1xyXG4gICAgICB3aGlsZSAocmVjdC5oZWlnaHQgPiBtYXhIZWlnaHQgJiYgZm9udFNpemUgPiBUT09MVElQX01JTl9GT05UKSB7XHJcbiAgICAgICAgZm9udFNpemUgLT0gMTtcclxuICAgICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XHJcbiAgICAgICAgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY2VudGVyWSA9IE1hdGgucm91bmQoKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0KSAvIDIpO1xyXG4gICAgICBsZXQgdG9wID0gTnVtYmVyLmlzRmluaXRlKGNlbnRlclkpID8gY2VudGVyWSA6IG1hcmdpbjtcclxuICAgICAgY29uc3QgbWluVG9wID0gbWFyZ2luO1xyXG4gICAgICBjb25zdCBtYXhUb3AgPSBNYXRoLm1heChtYXJnaW4sIHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0IC0gbWFyZ2luKTtcclxuICAgICAgaWYgKHRvcCA8IG1pblRvcCkgdG9wID0gbWluVG9wO1xyXG4gICAgICBpZiAodG9wID4gbWF4VG9wKSB0b3AgPSBtYXhUb3A7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBIaWRlIHRvb2x0aXAgY29udGVudC5cclxuICAgIGNvbnN0IGhpZGVUb29sdGlwID0gKCkgPT4ge1xyXG4gICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERlY2lkZSBpZiBhIHRvb2x0aXAgc2hvdWxkIGRpc3BsYXkuXG4gICAgY29uc3Qgc2hvdWxkUHJldmlldyA9IChlbDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgIGlmICghZWwuZGF0YXNldCB8fCAhZWwuZGF0YXNldC5mdWxsdGV4dCkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKGVsLmRhdGFzZXQucHJldmlldyA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggKyAxIHx8IGVsLnNjcm9sbEhlaWdodCA+IGVsLmNsaWVudEhlaWdodCArIDE7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlc29sdmVUb29sdGlwVGFyZ2V0ID0gKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XG4gICAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcbiAgICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICAgICAgY29uc3QgdGV4dEVsID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1uYW1lLCAudGltZWxpbmUtZGVzYy10ZXh0XCIpO1xuICAgICAgaWYgKCF0ZXh0RWwgfHwgIWNvbnRhaW5lci5jb250YWlucyh0ZXh0RWwpKSByZXR1cm4gbnVsbDtcbiAgICAgIHJldHVybiB0ZXh0RWw7XG4gICAgfTtcblxuICAgIGNvbnN0IHNob3dUb29sdGlwRm9yRWxlbWVudCA9IChlbDogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICBjb25zdCB0ZXh0ID0gZWwuZGF0YXNldC5mdWxsdGV4dCB8fCBlbC50ZXh0Q29udGVudCB8fCBcIlwiO1xuICAgICAgaWYgKCF0ZXh0IHx8ICFzaG91bGRQcmV2aWV3KGVsKSkgcmV0dXJuO1xuICAgICAgc2hvd1Rvb2x0aXAodGV4dCwgZWwpO1xuICAgIH07XG5cbiAgICBsZXQgYWN0aXZlVG9vbHRpcEVsOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICAgIGxldCBwcmVzc1RpbWVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICAgIGNvbnN0IGNsZWFyUHJlc3NUaW1lciA9ICgpID0+IHtcbiAgICAgIGlmIChwcmVzc1RpbWVyID09IG51bGwpIHJldHVybjtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XG4gICAgICBwcmVzc1RpbWVyID0gbnVsbDtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZU92ZXIgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRleHRFbCA9IHJlc29sdmVUb29sdGlwVGFyZ2V0KGV2ZW50LnRhcmdldCk7XG4gICAgICBpZiAoIXRleHRFbCkgcmV0dXJuO1xuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gdGV4dEVsO1xuICAgICAgc2hvd1Rvb2x0aXBGb3JFbGVtZW50KHRleHRFbCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VPdXQgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGZyb20gPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC50YXJnZXQpO1xuICAgICAgaWYgKCFmcm9tKSByZXR1cm47XG4gICAgICBjb25zdCB0byA9IHJlc29sdmVUb29sdGlwVGFyZ2V0KGV2ZW50LnJlbGF0ZWRUYXJnZXQpO1xuICAgICAgaWYgKHRvICYmIHRvID09PSBmcm9tKSByZXR1cm47XG4gICAgICBoaWRlVG9vbHRpcCgpO1xuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gbnVsbDtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAoKSA9PiB7XG4gICAgICBpZiAoIWFjdGl2ZVRvb2x0aXBFbCkgcmV0dXJuO1xuICAgICAgaWYgKCF0b29sdGlwRWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlzaWJsZVwiKSkgcmV0dXJuO1xuICAgICAgc2hvd1Rvb2x0aXBGb3JFbGVtZW50KGFjdGl2ZVRvb2x0aXBFbCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hTdGFydCA9IChldmVudDogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgY29uc3QgdGV4dEVsID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQudGFyZ2V0KTtcbiAgICAgIGlmICghdGV4dEVsKSByZXR1cm47XG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSB0ZXh0RWw7XG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcbiAgICAgIHByZXNzVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNob3dUb29sdGlwRm9yRWxlbWVudCh0ZXh0RWwpO1xuICAgICAgfSwgVE9PTFRJUF9UT1VDSF9ERUxBWV9NUyk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hNb3ZlID0gKCkgPT4ge1xuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XG4gICAgICBoaWRlVG9vbHRpcCgpO1xuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gbnVsbDtcbiAgICB9O1xuXG4gICAgY29uc3Qgb25Ub3VjaEVuZCA9ICgpID0+IHtcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xuICAgIH07XG5cbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBvbk1vdXNlT3Zlcik7XG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBvbk1vdXNlT3V0KTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uVG91Y2hTdGFydCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIG9uVG91Y2hNb3ZlLCB7IHBhc3NpdmU6IHRydWUgfSk7XG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBvblRvdWNoRW5kLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgICBjb25zdCBvblNlbGVjdFN0YXJ0ID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgaWYgKCFyZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpKSByZXR1cm47XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH07XG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzZWxlY3RzdGFydFwiLCBvblNlbGVjdFN0YXJ0KTtcblxuICAgIGNsZWFudXBzLnB1c2goKCkgPT4ge1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgb25Nb3VzZU92ZXIpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBvbk1vdXNlT3V0KTtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvblRvdWNoU3RhcnQpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgb25Ub3VjaE1vdmUpO1xuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBvblRvdWNoRW5kKTtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2VsZWN0c3RhcnRcIiwgb25TZWxlY3RTdGFydCk7XG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcbiAgICB9KTtcblxuICAgIGlmICghZXJyb3JNZXNzYWdlKSB7XG4gICAgICBjb25zdCBjYXJkcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkXCIpO1xuICAgICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgICBpZiAoIWNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGltZWxpbmUtY2FyZC0tbm9kYXRhXCIpKSB7XG4gICAgICAgICAgY29uc3QgY2xlYW51cFBpeGVsID0gY3JlYXRlUGl4ZWxFZmZlY3QoY2FyZCk7XG4gICAgICAgICAgaWYgKGNsZWFudXBQaXhlbCkgY2xlYW51cHMucHVzaChjbGVhbnVwUGl4ZWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZnJhbWVJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0RWxzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLW5hbWUsIC50aW1lbGluZS1kZXNjLXRleHRcIik7XG4gICAgICAgIHRleHRFbHMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICBjb25zdCB0ZXh0ID0gZWwuZGF0YXNldC5mdWxsdGV4dCB8fCBlbC50ZXh0Q29udGVudCB8fCBcIlwiO1xuICAgICAgICAgIGFwcGx5RWxsaXBzaXMoZWwsIHRleHQsIHRydWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZUlkKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGNsZWFudXBzLmZvckVhY2goKGNsZWFudXApID0+IGNsZWFudXAoKSk7XG4gICAgfTtcbiAgfSwgW2Vycm9yTWVzc2FnZSwgaXRlbXMsIHJlc29sdmVDbGlja2FibGVDYXJkXSk7XG5cclxuICBjb25zdCBoYXNJdGVtcyA9IGl0ZW1zLmxlbmd0aCA+IDA7XHJcbiAgY29uc3Qgc2hvd0VtcHR5ID0gIWVycm9yTWVzc2FnZSAmJiAhaGFzSXRlbXM7XHJcblxyXG4gIGNvbnN0IGNvbnRlbnQgPSBlcnJvck1lc3NhZ2UgPyAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtZGFuZ2VyXCI+e2Vycm9yTWVzc2FnZX08L2Rpdj5cclxuICApIDogaGFzSXRlbXMgPyAoXHJcbiAgICBpdGVtcy5tYXAoKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgIGNvbnN0IGtleSA9IGl0ZW0uaWQgfHwgaXRlbS5yZWNJZD8udG9TdHJpbmcoKSB8fCBgdGltZWxpbmUtJHtpbmRleH1gO1xyXG4gICAgICBjb25zdCBpc0NsaWNrYWJsZSA9ICFpdGVtLmlzTm9EYXRhICYmICEhaXRlbS5pZDtcclxuICAgICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGtleT17a2V5fSBjbGFzc05hbWU9XCJ0aW1lbGluZS1pdGVtXCI+XHJcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIFwidGltZWxpbmUtY2FyZFwiLFxuICAgICAgICAgICAgICBpdGVtLmlzTm9EYXRhID8gXCJ0aW1lbGluZS1jYXJkLS1ub2RhdGFcIiA6IFwiXCIsXG4gICAgICAgICAgICAgIGlzQ2xpY2thYmxlID8gXCJ0aW1lbGluZS1jYXJkLS1jbGlja2FibGVcIiA6IFwiXCJcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBkYXRhLWFjdGl2aWRhZGlkPXtpdGVtLmFjdGl2aWRhZElkIHx8IFwiXCJ9XG4gICAgICAgICAgICBkYXRhLXJlY2lkPXtpdGVtLnJlY0lkICE9IG51bGwgPyBTdHJpbmcoaXRlbS5yZWNJZCkgOiBcIlwifVxuICAgICAgICAgICAgZGF0YS1saW5rLWlkPXtpc0NsaWNrYWJsZSA/IGl0ZW0uaWQgOiBcIlwifVxuICAgICAgICAgICAgcm9sZT17aXNDbGlja2FibGUgPyBcImJ1dHRvblwiIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgdGFiSW5kZXg9e2lzQ2xpY2thYmxlID8gMCA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2lzQ2xpY2thYmxlID8gKGl0ZW0uZnVsbE5hbWUgfHwgaXRlbS5uYW1lIHx8IG5vRGF0YVRleHQpIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgb25LZXlEb3duPXtpc0NsaWNrYWJsZVxuICAgICAgICAgICAgICA/IChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgb25OYXZpZ2F0ZShpdGVtLmlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgOiB1bmRlZmluZWR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1kYXRlLXBhbmVsIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIHB4LTMgcHktMyBiZy1zbGF0ZS01MCBib3JkZXItciBib3JkZXItc2xhdGUtMjAwIHRleHQtc2xhdGUtNjAwXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdHJhY2tpbmctWzAuMmVtXSB0ZXh0LXNsYXRlLTUwMFwiPntpdGVtLmRhdGVQYXJ0cy55ZWFyfTwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHVwcGVyY2FzZSB0cmFja2luZy1bMC4yZW1dIHRleHQtc2xhdGUtNTAwXCI+e2l0ZW0uZGF0ZVBhcnRzLm1vbnRofTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtc2VtaWJvbGQgdGV4dC1wcmltYXJ5XCI+e2l0ZW0uZGF0ZVBhcnRzLmRheX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZWxpbmUtY2FyZF9fY29udGVudCBmbGV4LTEgcHktMyBweC00XCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lbGluZS1uYW1lXCIgZGF0YS1mdWxsdGV4dD17aXRlbS5mdWxsTmFtZSB8fCBpdGVtLm5hbWV9PntpdGVtLm5hbWV9PC9kaXY+XHJcbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGltZWxpbmUtZGVzYy10ZXh0XCIgZGF0YS1mdWxsdGV4dD17aXRlbS5mdWxsRGVzYyB8fCBpdGVtLmRlc2NyaXB0aW9ufT57aXRlbS5kZXNjcmlwdGlvbiB8fCBub0RhdGFUZXh0fTwvcD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKTtcclxuICAgIH0pXHJcbiAgKSA6IG51bGw7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XG4gICAgICBpZD1cInRpbWVsaW5lQ29udGFpbmVyXCJcbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwidGltZWxpbmUtYm94XCIsIHNob3dFbXB0eSA/IFwidGltZWxpbmUtZW1wdHlcIiA6IFwiXCIpfVxuICAgICAgZGF0YS1lbXB0eS10ZXh0PXtub0RhdGFUZXh0fVxuICAgICAgb25Qb2ludGVyRG93bkNhcHR1cmU9e2hhbmRsZVBvaW50ZXJEb3dufVxuICAgICAgb25Qb2ludGVyTW92ZUNhcHR1cmU9e2hhbmRsZVBvaW50ZXJNb3ZlfVxuICAgICAgb25Qb2ludGVyVXBDYXB0dXJlPXtoYW5kbGVQb2ludGVyVXB9XG4gICAgICBvblBvaW50ZXJDYW5jZWxDYXB0dXJlPXtyZXNldFRhcEd1YXJkfVxuICAgICAgb25Qb2ludGVyTGVhdmU9e3Jlc2V0VGFwR3VhcmR9XG4gICAgICBvbkNvbnRleHRNZW51Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgICBvbkNvcHlDYXB0dXJlPXtibG9ja0NsaXBib2FyZEFjdGlvbn1cbiAgICAgIG9uQ3V0Q2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgICBvblBhc3RlQ2FwdHVyZT17YmxvY2tDbGlwYm9hcmRBY3Rpb259XG4gICAgPlxuICAgICAge2NvbnRlbnR9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBNZW1vaXplZEhpc3RvcnlUYWJsZSA9IFJlYWN0Lm1lbW8oSGlzdG9yeVRhYmxlKTtcbk1lbW9pemVkSGlzdG9yeVRhYmxlLmRpc3BsYXlOYW1lID0gXCJIaXN0b3J5VGFibGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgTWVtb2l6ZWRIaXN0b3J5VGFibGU7XG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIFByb3BzID0ge1xuICBzdW1tYXJ5RnJvbUxhYmVsOiBzdHJpbmc7XG4gIHN1bW1hcnlUb0xhYmVsOiBzdHJpbmc7XG4gIGZyb21WYWx1ZTogc3RyaW5nO1xuICB0b1ZhbHVlOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbiAgY2xpZW50TGFiZWw/OiBzdHJpbmc7XG4gIGNsaWVudFZhbHVlPzogc3RyaW5nO1xuICBzaG93Q2xpZW50PzogYm9vbGVhbjtcbn07XG5cbi8vIFJlbmRlcnMgdGhlIHJldXNhYmxlIGRhdGUgc3VtbWFyeSBibG9jayBmb3IgaGlzdG9yeSBmaWx0ZXJzLlxuY29uc3QgSGlzdG9yeVN1bW1hcnkgPSAoe1xuICBzdW1tYXJ5RnJvbUxhYmVsLFxuICBzdW1tYXJ5VG9MYWJlbCxcbiAgZnJvbVZhbHVlLFxuICB0b1ZhbHVlLFxuICBjbGFzc05hbWUgPSBcIlwiLFxuICBjbGllbnRMYWJlbCA9IFwiXCIsXG4gIGNsaWVudFZhbHVlID0gXCJcIixcbiAgc2hvd0NsaWVudCA9IGZhbHNlLFxufTogUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BoaXN0b3J5LWZpbHRlci1zdW1tYXJ5IGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAteC0zIGdhcC15LTIgdGV4dC14cyAke2NsYXNzTmFtZX1gLnRyaW0oKX0+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGRcIj57c3VtbWFyeUZyb21MYWJlbH06PC9zcGFuPlxuICAgICAgICA8c3Bhbj57ZnJvbVZhbHVlfTwvc3Bhbj5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZFwiPntzdW1tYXJ5VG9MYWJlbH06PC9zcGFuPlxuICAgICAgICA8c3Bhbj57dG9WYWx1ZX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICAgIHtzaG93Q2xpZW50ICYmIGNsaWVudFZhbHVlID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpc3RvcnktZmlsdGVyLXN1bW1hcnkgbXQtMS41IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgbWluLXctMFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgc2hyaW5rLTBcIj57Y2xpZW50TGFiZWx9Ojwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtaW4tdy0wIGZsZXgtMSB0cnVuY2F0ZVwiPntjbGllbnRWYWx1ZX08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG4gICAgPC8+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBIaXN0b3J5U3VtbWFyeTtcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxuZXhwb3J0IHR5cGUgSGlzdG9yeU1hbnVhbERheUNlbGwgPSB7XG4gIGtleTogc3RyaW5nO1xuICBpc0VtcHR5OiBib29sZWFuO1xuICBkYXRlPzogRGF0ZTtcbiAgaXNvPzogc3RyaW5nO1xuICBkYXlMYWJlbD86IG51bWJlcjtcbiAgZGF5Q2xhc3M/OiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbn07XG5cbnR5cGUgSGlzdG9yeU1hbnVhbERhdGVQaWNrZXJQcm9wcyA9IHtcbiAgYWN0aXZhdG9yUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgcG9wb3ZlclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIHNob3dNYW51YWxFcnJvcjogYm9vbGVhbjtcbiAgc2hvd1N0YXJ0RXJyb3I6IGJvb2xlYW47XG4gIHNob3dFbmRFcnJvcjogYm9vbGVhbjtcbiAgZmlsdGVyVGl0bGU6IHN0cmluZztcbiAgaXNPcGVuOiBib29sZWFuO1xuICBzZWxlY3RpbmdTdGVwOiBcInN0YXJ0XCIgfCBcImVuZFwiIHwgXCJkb25lXCI7XG4gIGxhYmVsRnJvbTogc3RyaW5nO1xuICBsYWJlbFRvOiBzdHJpbmc7XG4gIHN0YXJ0RGF0ZVRleHQ6IHN0cmluZztcbiAgZW5kRGF0ZVRleHQ6IHN0cmluZztcbiAgY2xlYXJSYW5nZUxhYmVsOiBzdHJpbmc7XG4gIGhhc1NlbGVjdGVkUmFuZ2U6IGJvb2xlYW47XG4gIG1vbnRoTGFiZWw6IHN0cmluZztcbiAgd2Vla0RheUxhYmVsczogc3RyaW5nW107XG4gIHN0YXR1c1RleHQ6IHN0cmluZztcbiAgZGF5Q2VsbHM6IEhpc3RvcnlNYW51YWxEYXlDZWxsW107XG4gIHByZXZNb250aExhYmVsOiBzdHJpbmc7XG4gIG5leHRNb250aExhYmVsOiBzdHJpbmc7XG4gIG9uT3BlblBvcG92ZXI6IChzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB2b2lkO1xuICBvbkFjdGl2YXRvcktleURvd246IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uU2VjdGlvbktleURvd246IChldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4sIHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHZvaWQ7XG4gIG9uQ2xlYXI6IChldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4gdm9pZDtcbiAgb25QcmV2TW9udGg6IChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHZvaWQ7XG4gIG9uTmV4dE1vbnRoOiAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQ+KSA9PiB2b2lkO1xuICBvbkdyaWRNb3VzZUxlYXZlOiAoKSA9PiB2b2lkO1xuICBvbkRheUNsaWNrOiAoZGF5OiBIaXN0b3J5TWFudWFsRGF5Q2VsbCkgPT4gdm9pZDtcbiAgb25EYXlIb3ZlcjogKGRheTogSGlzdG9yeU1hbnVhbERheUNlbGwpID0+IHZvaWQ7XG59O1xuXG4vLyBQcmVzZW50YXRpb25hbCBkYXRlIHJhbmdlIHBpY2tlciB1c2VkIGJ5IHRoZSBoaXN0b3J5IHF1aWNrIGZpbHRlci5cbmNvbnN0IEhpc3RvcnlNYW51YWxEYXRlUGlja2VyID0gKHtcbiAgYWN0aXZhdG9yUmVmLFxuICBwb3BvdmVyUmVmLFxuICBzaG93TWFudWFsRXJyb3IsXG4gIHNob3dTdGFydEVycm9yLFxuICBzaG93RW5kRXJyb3IsXG4gIGZpbHRlclRpdGxlLFxuICBpc09wZW4sXG4gIHNlbGVjdGluZ1N0ZXAsXG4gIGxhYmVsRnJvbSxcbiAgbGFiZWxUbyxcbiAgc3RhcnREYXRlVGV4dCxcbiAgZW5kRGF0ZVRleHQsXG4gIGNsZWFyUmFuZ2VMYWJlbCxcbiAgaGFzU2VsZWN0ZWRSYW5nZSxcbiAgbW9udGhMYWJlbCxcbiAgd2Vla0RheUxhYmVscyxcbiAgc3RhdHVzVGV4dCxcbiAgZGF5Q2VsbHMsXG4gIHByZXZNb250aExhYmVsLFxuICBuZXh0TW9udGhMYWJlbCxcbiAgb25PcGVuUG9wb3ZlcixcbiAgb25BY3RpdmF0b3JLZXlEb3duLFxuICBvblNlY3Rpb25LZXlEb3duLFxuICBvbkNsZWFyLFxuICBvblByZXZNb250aCxcbiAgb25OZXh0TW9udGgsXG4gIG9uR3JpZE1vdXNlTGVhdmUsXG4gIG9uRGF5Q2xpY2ssXG4gIG9uRGF5SG92ZXIsXG59OiBIaXN0b3J5TWFudWFsRGF0ZVBpY2tlclByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgPGRpdlxuICAgICAgICBpZD1cImRycEFjdGl2YXRvclwiXG4gICAgICAgIHJlZj17YWN0aXZhdG9yUmVmfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJkcnAgdy1mdWxsXCIsIHNob3dNYW51YWxFcnJvciA/IFwiZHJwLWVycm9yXCIgOiBcIlwiKX1cbiAgICAgICAgb25DbGljaz17KCkgPT4gb25PcGVuUG9wb3ZlcihcInN0YXJ0XCIpfVxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgIGFyaWEtbGFiZWw9e2ZpbHRlclRpdGxlfVxuICAgICAgICBhcmlhLWhhc3BvcHVwPVwiZGlhbG9nXCJcbiAgICAgICAgYXJpYS1leHBhbmRlZD17aXNPcGVufVxuICAgICAgICBvbktleURvd249e29uQWN0aXZhdG9yS2V5RG93bn1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwiZHJwLXNlY3Rpb25cIixcbiAgICAgICAgICAgIHNlbGVjdGluZ1N0ZXAgPT09IFwic3RhcnRcIiAmJiBpc09wZW4gPyBcImFjdGl2ZVwiIDogXCJcIixcbiAgICAgICAgICAgIHNob3dTdGFydEVycm9yID8gXCJpcy1lcnJvclwiIDogXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgICAgZGF0YS1zZWN0aW9uPVwic3RhcnRcIlxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBvbk9wZW5Qb3BvdmVyKFwic3RhcnRcIik7XG4gICAgICAgICAgfX1cbiAgICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbEZyb219XG4gICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+IG9uU2VjdGlvbktleURvd24oZXZlbnQsIFwic3RhcnRcIil9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1sYWJlbFwiPntsYWJlbEZyb219PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtdmFsdWVcIj5cbiAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImJpIGJpLWNhbGVuZGFyMyBkcnAtaWNvblwiIC8+XG4gICAgICAgICAgICA8c3BhbiBpZD1cImRycFN0YXJ0VmFsdWVcIj57c3RhcnREYXRlVGV4dH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXNlcGFyYXRvciBoaWRkZW4gc206ZmxleFwiPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImJpIGJpLWFycm93LXJpZ2h0XCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZHJwLXNlcGFyYXRvci1tb2JpbGUgZmxleCBzbTpoaWRkZW5cIiAvPlxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcImRycC1zZWN0aW9uXCIsXG4gICAgICAgICAgICBzZWxlY3RpbmdTdGVwID09PSBcImVuZFwiICYmIGlzT3BlbiA/IFwiYWN0aXZlXCIgOiBcIlwiLFxuICAgICAgICAgICAgc2hvd0VuZEVycm9yID8gXCJpcy1lcnJvclwiIDogXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgICAgZGF0YS1zZWN0aW9uPVwiZW5kXCJcbiAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgb25PcGVuUG9wb3ZlcihcImVuZFwiKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsVG99XG4gICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+IG9uU2VjdGlvbktleURvd24oZXZlbnQsIFwiZW5kXCIpfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtbGFiZWxcIj57bGFiZWxUb308L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC12YWx1ZVwiPlxuICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiYmkgYmktY2FsZW5kYXIzIGRycC1pY29uXCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGlkPVwiZHJwRW5kVmFsdWVcIj57ZW5kRGF0ZVRleHR9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgaWQ9XCJkcnBDbGVhclwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZHJwLWNsZWFyXCJcbiAgICAgICAgICBhcmlhLWxhYmVsPXtjbGVhclJhbmdlTGFiZWx9XG4gICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogaGFzU2VsZWN0ZWRSYW5nZSA/IFwiaW5saW5lLWZsZXhcIiA6IFwibm9uZVwiIH19XG4gICAgICAgICAgb25DbGljaz17b25DbGVhcn1cbiAgICAgICAgPlxuICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImJpIGJpLXgtbGdcIiAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGlkPVwiZHJwUG9wb3ZlclwiIHJlZj17cG9wb3ZlclJlZn0gY2xhc3NOYW1lPVwiZHJwLXBvcG92ZXJcIiBoaWRkZW49eyFpc09wZW59PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRycC1oZWFkXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJkcnAtbmF2XCJcbiAgICAgICAgICAgIGRhdGEtZGlyPVwicHJldlwiXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtwcmV2TW9udGhMYWJlbH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uUHJldk1vbnRofVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzTmFtZT1cImgtNCB3LTRcIiBmaWxsPVwibm9uZVwiIHZpZXdCb3g9XCIwIDAgMzAgMzBcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIj5cbiAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMlwiIGQ9XCJNMTUgMTlsLTctNyA3LTdcIiAvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiBpZD1cImRycE1vbnRoTGFiZWxcIiBjbGFzc05hbWU9XCJkcnAtbW9udGhcIj57bW9udGhMYWJlbH08L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImRycC1uYXZcIlxuICAgICAgICAgICAgZGF0YS1kaXI9XCJuZXh0XCJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e25leHRNb250aExhYmVsfVxuICAgICAgICAgICAgb25DbGljaz17b25OZXh0TW9udGh9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3NOYW1lPVwiaC00IHctNFwiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAzMCAzMFwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiPlxuICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCIyXCIgZD1cIk05IDVsNyA3LTcgN1wiIC8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkcnAtd2Vla2RheXNcIj5cbiAgICAgICAgICB7d2Vla0RheUxhYmVscy5tYXAoKGxhYmVsLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPHNwYW4ga2V5PXtgJHtsYWJlbH0tJHtpbmRleH1gfT57bGFiZWx9PC9zcGFuPlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGlkPVwiZHJwR3JpZFwiIGNsYXNzTmFtZT1cImRycC1ncmlkXCIgb25Nb3VzZUxlYXZlPXtvbkdyaWRNb3VzZUxlYXZlfT5cbiAgICAgICAgICB7ZGF5Q2VsbHMubWFwKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBpZiAoY2VsbC5pc0VtcHR5KSB7XG4gICAgICAgICAgICAgIHJldHVybiA8YnV0dG9uIGtleT17Y2VsbC5rZXl9IGNsYXNzTmFtZT1cImRycC1kYXkgZW1wdHlcIiBkaXNhYmxlZCAvPjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17Y2VsbC5rZXl9XG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjZWxsLmRheUNsYXNzfVxuICAgICAgICAgICAgICAgIGRhdGEtZGF0ZT17Y2VsbC5pc299XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2NlbGwuZGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25EYXlDbGljayhjZWxsKX1cbiAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IG9uRGF5SG92ZXIoY2VsbCl9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y2VsbC5kYXlMYWJlbH1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGlkPVwiZHJwU3RhdHVzXCIgY2xhc3NOYW1lPVwiZHJwLXN0YXR1c1wiPlxuICAgICAgICAgIHtzdGF0dXNUZXh0fVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgSGlzdG9yeU1hbnVhbERhdGVQaWNrZXI7XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgdHlwZSB7IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfSBmcm9tIFwiLi4vLi4vLi4vaG9va3MvdXNlSGlzdG9yeUZpbHRlckNhY2hlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEZpbHRlckxvYWRSZXF1ZXN0LCBMb2FkT3ZlcnJpZGUgfSBmcm9tIFwiLi91c2VIaXN0b3J5RmlsdGVyc1N0YXRlLnRzXCI7XG5cbnR5cGUgVXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnNBcmdzID0ge1xuICBpc09wZW46IGJvb2xlYW47XG4gIGFjdGl2YXRvclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG4gIHBvcG92ZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xuICBwYWdpbmF0aW9uUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgaGFzUmVzdG9yZWRGaWx0ZXJSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWY6IFJlYWN0Lk11dGFibGVSZWZPYmplY3Q8Ym9vbGVhbj47XG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XG4gIHVwZGF0ZUZhYkJvdHRvbTogKCkgPT4gdm9pZDtcbiAgbG9nSGlzdG9yeTogKG1lc3NhZ2U6IHN0cmluZywgZGF0YT86IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xuICBjb25zdW1lUmV0dXJuRmxhZzogKCkgPT4gYm9vbGVhbjtcbiAgcmVhZENhY2hlZEZpbHRlcjogKCkgPT4gSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGw7XG4gIGFwcGx5Q2FjaGVkRmlsdGVyOiAoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCkgPT4gRmlsdGVyTG9hZFJlcXVlc3QgfCBudWxsO1xuICBsb2FkQWN0aXZpdGllczogKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHZvaWQ7XG4gIHNldElzT3BlbjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICBzZXRIb3ZlckRhdGU6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPERhdGUgfCBudWxsPj47XG4gIHNldFNob3dGaWx0ZXJzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxib29sZWFuPj47XG4gIGFwcGx5RmlsdGVyczogKG9wdGlvbnM/OiB7IGNsb3NlUGFuZWw/OiBib29sZWFuOyBmb3JjZT86IGJvb2xlYW47IHBhZ2U/OiBudW1iZXIgfSkgPT4gdm9pZDtcbn07XG5cbi8vIEhhbmRsZXMgZ2xvYmFsIGxpc3RlbmVycyB1c2VkIGJ5IHRoZSBoaXN0b3J5IHBhZ2UgZmlsdGVycyBhbmQgY2FsZW5kYXIgVUkuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnMgPSAoe1xuICBpc09wZW4sXG4gIGFjdGl2YXRvclJlZixcbiAgcG9wb3ZlclJlZixcbiAgcGFnaW5hdGlvblJlZixcbiAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gIGN1cnJlbnRQYWdlLFxuICB1cGRhdGVGYWJCb3R0b20sXG4gIGxvZ0hpc3RvcnksXG4gIGNvbnN1bWVSZXR1cm5GbGFnLFxuICByZWFkQ2FjaGVkRmlsdGVyLFxuICBhcHBseUNhY2hlZEZpbHRlcixcbiAgbG9hZEFjdGl2aXRpZXMsXG4gIHNldElzT3BlbixcbiAgc2V0SG92ZXJEYXRlLFxuICBzZXRTaG93RmlsdGVycyxcbiAgYXBwbHlGaWx0ZXJzLFxufTogVXNlSGlzdG9yeVBhZ2VMaXN0ZW5lcnNBcmdzKSA9PiB7XG4gIC8vIENsb3NlIHRoZSBtYW51YWwgcGlja2VyIHdoZW4gY2xpY2tpbmcgb3V0c2lkZSBvZiB0aGUgcmFuZ2UgcGlja2VyIFVJLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNPcGVuKSByZXR1cm47XG5cbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XG4gICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgICAgaWYgKHBvcG92ZXJSZWYuY3VycmVudD8uY29udGFpbnModGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgaWYgKGFjdGl2YXRvclJlZi5jdXJyZW50Py5jb250YWlucyh0YXJnZXQpKSByZXR1cm47XG4gICAgICBsb2dIaXN0b3J5KFwiY2xvc2VQb3BvdmVyOm91dHNpZGVcIik7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xuICAgIHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGUpO1xuICB9LCBbYWN0aXZhdG9yUmVmLCBpc09wZW4sIGxvZ0hpc3RvcnksIHBvcG92ZXJSZWYsIHNldEhvdmVyRGF0ZSwgc2V0SXNPcGVuXSk7XG5cbiAgLy8gUmUtYXBwbHkgZmlsdGVycyBhZnRlciBicm93c2VyIGJhY2svZm9yd2FyZCBuYXZpZ2F0aW9uIHJldHVybnMgdG8gdGhlIHBhZ2UuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25QYWdlU2hvdyA9ICgpID0+IHtcbiAgICAgIGlmIChoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50KSByZXR1cm47XG4gICAgICBpZiAoY29uc3VtZVJldHVybkZsYWcoKSkge1xuICAgICAgICBjb25zdCBjYWNoZWQgPSByZWFkQ2FjaGVkRmlsdGVyKCk7XG4gICAgICAgIGNvbnN0IGNhY2hlZFJlcXVlc3QgPSBhcHBseUNhY2hlZEZpbHRlcihjYWNoZWQpO1xuICAgICAgICBpZiAoY2FjaGVkUmVxdWVzdCkge1xuICAgICAgICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICAgICAgbG9hZEFjdGl2aXRpZXMoY2FjaGVkUmVxdWVzdC5wYWdlLCBjYWNoZWRSZXF1ZXN0Lm92ZXJyaWRlKTtcbiAgICAgICAgICBzZXRTaG93RmlsdGVycyhmYWxzZSk7XG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgICBoYXNSZXN0b3JlZEZpbHRlclJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xuICB9LCBbXG4gICAgYXBwbHlDYWNoZWRGaWx0ZXIsXG4gICAgY29uc3VtZVJldHVybkZsYWcsXG4gICAgaGFzUmVzdG9yZWRGaWx0ZXJSZWYsXG4gICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgcmVhZENhY2hlZEZpbHRlcixcbiAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93RmlsdGVycyxcbiAgXSk7XG5cbiAgLy8gS2VlcCBmbG9hdGluZyBhY3Rpb24gYnV0dG9uIGNsZWFyIG9mIHBhZ2luYXRpb24gYW5kIHJlYWN0IHRvIGxheW91dCBjaGFuZ2VzLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHVwZGF0ZUZhYkJvdHRvbSgpO1xuXG4gICAgbGV0IG9ic2VydmVyOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICAgIGNvbnN0IHBhZ2luYXRpb25FbCA9IHBhZ2luYXRpb25SZWYuY3VycmVudDtcbiAgICBpZiAocGFnaW5hdGlvbkVsICYmIHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlRmFiQm90dG9tKCkpO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShwYWdpbmF0aW9uRWwpO1xuICAgIH1cblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZUZhYkJvdHRvbSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHVwZGF0ZUZhYkJvdHRvbSk7XG4gICAgICBpZiAob2JzZXJ2ZXIpIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9O1xuICB9LCBbcGFnaW5hdGlvblJlZiwgdXBkYXRlRmFiQm90dG9tXSk7XG5cbiAgLy8gV2lyZSB0b3BiYXIgYWN0aW9ucyB0aGF0IHRvZ2dsZSBmaWx0ZXJzIG9yIGZvcmNlIHJlZnJlc2ggb2YgY3VycmVudCBwYWdlLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG9uVG9nZ2xlRmlsdGVycyA9ICgpID0+IHtcbiAgICAgIHNldFNob3dGaWx0ZXJzKChwcmV2KSA9PiB7XG4gICAgICAgIGNvbnN0IG5leHQgPSAhcHJldjtcbiAgICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgICAgc2V0SXNPcGVuKGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCBvblJlZnJlc2ggPSAoKSA9PiB7XG4gICAgICBhcHBseUZpbHRlcnMoeyBwYWdlOiBjdXJyZW50UGFnZSwgZm9yY2U6IHRydWUsIGNsb3NlUGFuZWw6IHRydWUgfSk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGlzdG9yeS10b2dnbGUtZmlsdGVyXCIsIG9uVG9nZ2xlRmlsdGVycyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImhpc3RvcnktdG9nZ2xlLWZpbHRlclwiLCBvblRvZ2dsZUZpbHRlcnMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJoaXN0b3J5LXJlZnJlc2hcIiwgb25SZWZyZXNoKTtcbiAgICB9O1xuICB9LCBbYXBwbHlGaWx0ZXJzLCBjdXJyZW50UGFnZSwgc2V0SXNPcGVuLCBzZXRTaG93RmlsdGVyc10pO1xufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcblxudHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvblByb3BzID0ge1xuICByb3V0ZTogc3RyaW5nO1xuICBhcmlhTGFiZWw6IHN0cmluZztcbiAgc2l6ZT86IG51bWJlcjtcbiAgcmlnaHQ/OiBudW1iZXI7XG4gIGJvdHRvbT86IG51bWJlcjtcbiAgY29sb3I/OiBzdHJpbmc7XG4gIHNoYWRvd09wYWNpdHk/OiBudW1iZXI7XG4gIHBsdXNUaGlja25lc3M/OiBudW1iZXI7XG4gIHBsdXNMZW5ndGg/OiBudW1iZXI7XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xufTtcblxuY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcblxuLy8gRmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiB0aGF0IHJlbmRlcnMgYSBjcmlzcCBTVkcgb250byBhIGNhbnZhcy5cbmNvbnN0IEZsb2F0aW5nQWN0aW9uQnV0dG9uID0gKHtcbiAgcm91dGUsXG4gIGFyaWFMYWJlbCxcbiAgc2l6ZSA9IDc2LFxuICByaWdodCA9IDI0LFxuICBib3R0b20gPSAyNCxcbiAgY29sb3IgPSBcIiMwMDI5NmJcIixcbiAgc2hhZG93T3BhY2l0eSA9IDAuMTYsXG4gIHBsdXNUaGlja25lc3MgPSA0LFxuICBwbHVzTGVuZ3RoID0gMjgsXG4gIG9uQ2xpY2ssXG59OiBGbG9hdGluZ0FjdGlvbkJ1dHRvblByb3BzKSA9PiB7XG4gIGNvbnN0IGJ0blJlZiA9IHVzZVJlZjxIVE1MQnV0dG9uRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBidWlsZEZhYlN2ZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBzYWZlT3BhY2l0eSA9IGNsYW1wKHNoYWRvd09wYWNpdHksIDAsIDAuNSk7XG4gICAgY29uc3Qgc2FmZVRoaWNrbmVzcyA9IGNsYW1wKHBsdXNUaGlja25lc3MsIDIsIDgpO1xuICAgIGNvbnN0IHNhZmVMZW5ndGggPSBjbGFtcChwbHVzTGVuZ3RoLCAxNiwgNDApO1xuXG4gICAgY29uc3QgY3ggPSA0ODtcbiAgICBjb25zdCB4ViA9IGN4IC0gc2FmZVRoaWNrbmVzcyAvIDI7XG4gICAgY29uc3QgeVYgPSBjeCAtIHNhZmVMZW5ndGggLyAyO1xuICAgIGNvbnN0IHhIID0gY3ggLSBzYWZlTGVuZ3RoIC8gMjtcbiAgICBjb25zdCB5SCA9IGN4IC0gc2FmZVRoaWNrbmVzcyAvIDI7XG5cbiAgICByZXR1cm4gYFxuICAgICAgPHN2ZyB3aWR0aD1cIjk2XCIgaGVpZ2h0PVwiOTZcIiB2aWV3Qm94PVwiMCAwIDk2IDk2XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICAgICAgICA8ZGVmcz5cbiAgICAgICAgICA8ZmlsdGVyIGlkPVwiZmFiU2hhZG93XCIgeD1cIi00MCVcIiB5PVwiLTQwJVwiIHdpZHRoPVwiMTgwJVwiIGhlaWdodD1cIjE4MCVcIj5cbiAgICAgICAgICAgIDxmZURyb3BTaGFkb3cgZHg9XCItNFwiIGR5PVwiMTBcIiBzdGREZXZpYXRpb249XCI2XCIgZmxvb2QtY29sb3I9XCIjMDAwXCIgZmxvb2Qtb3BhY2l0eT1cIiR7c2FmZU9wYWNpdHl9XCIvPlxuICAgICAgICAgIDwvZmlsdGVyPlxuICAgICAgICA8L2RlZnM+XG5cbiAgICAgICAgPGcgZmlsdGVyPVwidXJsKCNmYWJTaGFkb3cpXCI+XG4gICAgICAgICAgPGNpcmNsZSBjeD1cIjQ4XCIgY3k9XCI0OFwiIHI9XCIzNFwiIGZpbGw9XCIke2NvbG9yfVwiLz5cbiAgICAgICAgPC9nPlxuXG4gICAgICAgIDxnIGZpbGw9XCIjZmZmXCI+XG4gICAgICAgICAgPHJlY3QgeD1cIiR7eFZ9XCIgeT1cIiR7eVZ9XCIgd2lkdGg9XCIke3NhZmVUaGlja25lc3N9XCIgaGVpZ2h0PVwiJHtzYWZlTGVuZ3RofVwiIHJ4PVwiMVwiLz5cbiAgICAgICAgICA8cmVjdCB4PVwiJHt4SH1cIiB5PVwiJHt5SH1cIiB3aWR0aD1cIiR7c2FmZUxlbmd0aH1cIiBoZWlnaHQ9XCIke3NhZmVUaGlja25lc3N9XCIgcng9XCIxXCIvPlxuICAgICAgICA8L2c+XG4gICAgICA8L3N2Zz5cbiAgICBgLnRyaW0oKTtcbiAgfSwgW2NvbG9yLCBzaGFkb3dPcGFjaXR5LCBwbHVzTGVuZ3RoLCBwbHVzVGhpY2tuZXNzXSk7XG5cbiAgY29uc3QgcmVuZGVyU3ZnVG9DYW52YXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGlmICghY3R4KSByZXR1cm47XG5cbiAgICBjb25zdCBzaXplUHggPSBNYXRoLm1heCg0MCwgc2l6ZSk7XG4gICAgY29uc3QgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcblxuICAgIGNhbnZhcy53aWR0aCA9IE1hdGgucm91bmQoc2l6ZVB4ICogZHByKTtcbiAgICBjYW52YXMuaGVpZ2h0ID0gTWF0aC5yb3VuZChzaXplUHggKiBkcHIpO1xuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3NpemVQeH1weGA7XG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke3NpemVQeH1weGA7XG4gICAgY3R4LnNldFRyYW5zZm9ybShkcHIsIDAsIDAsIGRwciwgMCwgMCk7XG5cbiAgICBjb25zdCBzdmcgPSBidWlsZEZhYlN2ZygpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbc3ZnXSwgeyB0eXBlOiBcImltYWdlL3N2Zyt4bWxcIiB9KTtcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG4gICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLmRlY29kaW5nID0gXCJhc3luY1wiO1xuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHNpemVQeCwgc2l6ZVB4KTtcbiAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBzaXplUHgsIHNpemVQeCk7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfTtcbiAgICBpbWcub25lcnJvciA9ICgpID0+IHtcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICB9O1xuICAgIGltZy5zcmMgPSB1cmw7XG4gIH0sIFtidWlsZEZhYlN2Zywgc2l6ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmVuZGVyU3ZnVG9DYW52YXMoKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZW5kZXJTdmdUb0NhbnZhcyk7XG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlbmRlclN2Z1RvQ2FudmFzKTtcbiAgfSwgW3JlbmRlclN2Z1RvQ2FudmFzXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBvbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIG9uQ2xpY2soKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFyb3V0ZSB8fCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByb3V0ZTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIHJlZj17YnRuUmVmfVxuICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCB6LTIwMDAgcm91bmRlZC1tZCBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdHJhbnNpdGlvbi10cmFuc2Zvcm0gZHVyYXRpb24tMTUwIGhvdmVyOi10cmFuc2xhdGUteS0wLjUgYWN0aXZlOnNjYWxlLTk1IGZvY3VzLXZpc2libGU6cmluZy00IGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzMwIGZvY3VzLXZpc2libGU6cmluZy1vZmZzZXQtNFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICB3aWR0aDogYCR7c2l6ZX1weGAsXG4gICAgICAgIGhlaWdodDogYCR7c2l6ZX1weGAsXG4gICAgICAgIHJpZ2h0OiBgJHtyaWdodH1weGAsXG4gICAgICAgIGJvdHRvbTogYCR7Ym90dG9tfXB4YCxcbiAgICAgICAgV2Via2l0VGFwSGlnaGxpZ2h0Q29sb3I6IFwidHJhbnNwYXJlbnRcIixcbiAgICAgIH19XG4gICAgICBvbkNsaWNrPXtoYW5kbGVDbGlja31cbiAgICA+XG4gICAgICA8Y2FudmFzIHJlZj17Y2FudmFzUmVmfSBjbGFzc05hbWU9XCJibG9jayByb3VuZGVkLW1kXCIgLz5cbiAgICA8L2J1dHRvbj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nQWN0aW9uQnV0dG9uO1xuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xuICBmaXJzdD86IHN0cmluZztcbiAgcHJldj86IHN0cmluZztcbiAgbmV4dD86IHN0cmluZztcbiAgbGFzdD86IHN0cmluZztcbn07XG5cbnR5cGUgQ29tcGFjdFBhZ2luYXRpb25Qcm9wcyA9IHtcbiAgdG90YWxQYWdlczogbnVtYmVyO1xuICBjdXJyZW50UGFnZTogbnVtYmVyO1xuICBwYWdlV2luZG93PzogbnVtYmVyO1xuICBvblBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XG4gIGxhYmVscz86IFBhZ2luYXRpb25MYWJlbHM7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbmNvbnN0IERFRkFVTFRfV0lORE9XID0gNjtcblxuLy8gQ29tcGFjdCBwYWdpbmF0aW9uIHdpdGggNi1wYWdlIHdpbmRvdyBhbmQgZWRnZSBjb250cm9scy5cbmNvbnN0IENvbXBhY3RQYWdpbmF0aW9uID0gZm9yd2FyZFJlZjxIVE1MRGl2RWxlbWVudCwgQ29tcGFjdFBhZ2luYXRpb25Qcm9wcz4oXG4gICh7IHRvdGFsUGFnZXMsIGN1cnJlbnRQYWdlLCBwYWdlV2luZG93ID0gREVGQVVMVF9XSU5ET1csIG9uUGFnZUNoYW5nZSwgbGFiZWxzLCBjbGFzc05hbWUgfSwgcmVmKSA9PiB7XG4gICAgY29uc3Qgc2FmZVRvdGFsID0gTWF0aC5tYXgoMCwgdG90YWxQYWdlcyB8fCAwKTtcbiAgICBjb25zdCBzYWZlQ3VycmVudCA9IE1hdGgubWluKE1hdGgubWF4KDEsIGN1cnJlbnRQYWdlIHx8IDEpLCBzYWZlVG90YWwgfHwgMSk7XG4gICAgY29uc3Qgd2luZG93U2l6ZSA9IE1hdGgubWF4KDEsIHBhZ2VXaW5kb3cgfHwgREVGQVVMVF9XSU5ET1cpO1xuXG4gICAgY29uc3Qgc2hvd1BhZ2luYXRpb24gPSBzYWZlVG90YWwgPiAxO1xuICAgIGNvbnN0IHNob3dFZGdlTmF2ID0gc2FmZVRvdGFsID4gd2luZG93U2l6ZTtcbiAgICBjb25zdCBjYW5KdW1wVG9TdGFydCA9IHNhZmVDdXJyZW50ID4gd2luZG93U2l6ZTtcbiAgICBjb25zdCBjYW5Hb1ByZXYgPSBzYWZlQ3VycmVudCA+IDE7XG4gICAgY29uc3QgY2FuR29OZXh0ID0gc2FmZUN1cnJlbnQgPCBzYWZlVG90YWw7XG5cbiAgICBjb25zdCBwYWdlTnVtYmVycyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgaWYgKCFzYWZlVG90YWwpIHJldHVybiBbXTtcbiAgICAgIGNvbnN0IHdpbmRvd1N0YXJ0ID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcigoc2FmZUN1cnJlbnQgLSAxKSAvIHdpbmRvd1NpemUpICogd2luZG93U2l6ZSArIDEpO1xuICAgICAgY29uc3Qgd2luZG93RW5kID0gTWF0aC5taW4oc2FmZVRvdGFsLCB3aW5kb3dTdGFydCArIHdpbmRvd1NpemUgLSAxKTtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB3aW5kb3dFbmQgLSB3aW5kb3dTdGFydCArIDEgfSwgKF92YWwsIGlkeCkgPT4gd2luZG93U3RhcnQgKyBpZHgpO1xuICAgIH0sIFtzYWZlQ3VycmVudCwgc2FmZVRvdGFsLCB3aW5kb3dTaXplXSk7XG5cbiAgICBpZiAoIXNob3dQYWdpbmF0aW9uKSByZXR1cm4gbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGlkPVwicGFnaW5hdGlvblwiXG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgXCJwYWdpbmF0aW9uIGdyaWQgZ3JpZC1jb2xzLVsxZnJfYXV0b18xZnJdIGl0ZW1zLWNlbnRlciBnYXAtMVwiLFxuICAgICAgICAgIGNsYXNzTmFtZSB8fCBcIlwiXG4gICAgICAgICl9XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEganVzdGlmeS1zdGFydFwiPlxuICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5KdW1wVG9TdGFydCAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8uZmlyc3R9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG9uUGFnZUNoYW5nZSgxKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xOC43NSA0LjUtNy41IDcuNSA3LjUgNy41bS02LTE1TDUuMjUgMTJsNy41IDcuNVwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuR29QcmV2ICYmIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5wcmV2fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgLSAxKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNS43NSAxOS41IDguMjUgMTJsNy41LTcuNVwiIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBtaW4tdy0wIGZsZXgtbm93cmFwXCI+XG4gICAgICAgICAge3BhZ2VOdW1iZXJzLm1hcCgocGFnZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBwYWdlID09PSBzYWZlQ3VycmVudDtcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e2BwYWdlLSR7cGFnZX1gfVxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgIFwibWluLXctWzI2cHhdIHB4LTIgcHktMC41IHJvdW5kZWQtbWQgYm9yZGVyIHRleHQtWzEwcHhdIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvblwiLFxuICAgICAgICAgICAgICAgICAgaXNBY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgPyBcImJnLVsjMDAyOTZiXSBib3JkZXItWyMwMDI5NmJdIHRleHQtd2hpdGUgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0zMDAgdGV4dC1zbGF0ZS03MDAgaG92ZXI6Ym9yZGVyLXByaW1hcnkgaG92ZXI6dGV4dC1wcmltYXJ5XCJcbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2UocGFnZSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtwYWdlfVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuR29OZXh0ICYmIChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5uZXh0fVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBvblBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm04LjI1IDQuNSA3LjUgNy41LTcuNSA3LjVcIiAvPlxuICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICl9XG4gICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvTmV4dCAmJiAoXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ubGFzdH1cbiAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgb25QYWdlQ2hhbmdlKHNhZmVUb3RhbCk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNS4yNSA0LjUgNy41IDcuNS03LjUgNy41bTYtMTUgNy41IDcuNS03LjUgNy41XCIgLz5cbiAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbik7XG5cbkNvbXBhY3RQYWdpbmF0aW9uLmRpc3BsYXlOYW1lID0gXCJDb21wYWN0UGFnaW5hdGlvblwiO1xuXG5leHBvcnQgZGVmYXVsdCBDb21wYWN0UGFnaW5hdGlvbjtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxudHlwZSBQcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgYWN0aXZlPzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBhcmlhTGFiZWw/OiBzdHJpbmc7XG4gIHR5cGU/OiBcImJ1dHRvblwiIHwgXCJzdWJtaXRcIiB8IFwicmVzZXRcIjtcbn07XG5cbi8vIER1bWIgZmlsdGVyIGJ1dHRvbiB3aXRoIHN0YW5kYXJkaXplZCBzdHlsaW5nLlxuY29uc3QgRmlsdGVyQnV0dG9uID0gKHtcbiAgbGFiZWwsXG4gIGFjdGl2ZSA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICBvbkNsaWNrLFxuICBjbGFzc05hbWUsXG4gIGFyaWFMYWJlbCxcbiAgdHlwZSA9IFwiYnV0dG9uXCJcbn06IFByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT17dHlwZX1cbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImluZC1maWx0ZXItYnRuXCIsIGFjdGl2ZSA/IFwiaW5kLWZpbHRlci1idG4tLWFjdGl2ZVwiIDogXCJcIiwgY2xhc3NOYW1lKX1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XG4gICAgPlxuICAgICAge2xhYmVsfVxuICAgIDwvYnV0dG9uPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRmlsdGVyQnV0dG9uO1xuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xuXG50eXBlIFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGFyaWFMYWJlbD86IHN0cmluZztcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xufTtcblxuLy8gRHVtYiBhY3Rpb24gYnV0dG9uIHdpdGggc3RhbmRhcmRpemVkIHN0eWxpbmcuXG5jb25zdCBBY3Rpb25CdXR0b24gPSAoe1xuICBsYWJlbCxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgb25DbGljayxcbiAgY2xhc3NOYW1lLFxuICBhcmlhTGFiZWwsXG4gIHR5cGUgPSBcImJ1dHRvblwiXG59OiBQcm9wcykgPT4ge1xuICByZXR1cm4gKFxuICAgIDxidXR0b25cbiAgICAgIHR5cGU9e3R5cGV9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJpbmQtYWN0aW9uLWJ0blwiLCBjbGFzc05hbWUpfVxuICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbCB8fCBsYWJlbH1cbiAgICA+XG4gICAgICB7bGFiZWx9XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBBY3Rpb25CdXR0b247XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciwgZmV0Y2hKc29uIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xuXG5leHBvcnQgdHlwZSBIaXN0b3J5QWN0aXZpdHlJdGVtID0ge1xuICBhY3RpdmlkYWRJZD86IHN0cmluZyB8IG51bWJlcjtcbiAgQWN0aXZpZGFkSWQ/OiBzdHJpbmcgfCBudW1iZXI7XG4gIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xuICBSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcbiAgbmFtZT86IHN0cmluZztcbiAgTmFtZT86IHN0cmluZztcbiAgdHJhbnNEYXRlPzogc3RyaW5nO1xuICBUcmFuc0RhdGU/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBEZXNjcmlwdGlvbj86IHN0cmluZztcbn07XG5cbnR5cGUgSGlzdG9yeVJlc3BvbnNlID0ge1xuICBpdGVtcz86IEhpc3RvcnlBY3Rpdml0eUl0ZW1bXTtcbiAgdG90YWw/OiBudW1iZXI7XG59O1xuXG50eXBlIExvYWRPdmVycmlkZSA9IHtcbiAgZnJvbURhdGU6IHN0cmluZztcbiAgdG9EYXRlOiBzdHJpbmc7XG4gIGFjY291bnROdW0/OiBzdHJpbmc7XG59O1xuXG50eXBlIFVzZUhpc3RvcnlBY3Rpdml0aWVzQXJncyA9IHtcbiAgZnJvbURhdGVWYWx1ZTogc3RyaW5nO1xuICB0b0RhdGVWYWx1ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtVmFsdWU6IHN0cmluZztcbiAgcGFnZVNpemU6IG51bWJlcjtcbiAgcmV0cnlEZWxheU1zPzogbnVtYmVyO1xuICBub3JtYWxpemVSYW5nZTogKGZyb206IHN0cmluZywgdG86IHN0cmluZykgPT4geyBmcm9tOiBzdHJpbmc7IHRvOiBzdHJpbmcgfTtcbiAgb25Gb3JiaWRkZW46ICgpID0+IHZvaWQ7XG4gIG9uRGVidWc/OiAobWVzc2FnZTogc3RyaW5nLCBkYXRhPzogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pID0+IHZvaWQ7XG59O1xuXG4vLyBDZW50cmFsaXplcyBoaXN0b3J5IGZldGNoL3JldHJ5IGxvZ2ljIHRvIGtlZXAgcGFnZSBjb21wb25lbnRzIHNtYWxsZXIuXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUFjdGl2aXRpZXMgPSAoe1xuICBmcm9tRGF0ZVZhbHVlLFxuICB0b0RhdGVWYWx1ZSxcbiAgYWNjb3VudE51bVZhbHVlLFxuICBwYWdlU2l6ZSxcbiAgcmV0cnlEZWxheU1zID0gNjAwLFxuICBub3JtYWxpemVSYW5nZSxcbiAgb25Gb3JiaWRkZW4sXG4gIG9uRGVidWcsXG59OiBVc2VIaXN0b3J5QWN0aXZpdGllc0FyZ3MpID0+IHtcbiAgY29uc3QgW2l0ZW1zLCBzZXRJdGVtc10gPSB1c2VTdGF0ZTxIaXN0b3J5QWN0aXZpdHlJdGVtW10+KFtdKTtcbiAgY29uc3QgW3RvdGFsLCBzZXRUb3RhbF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2N1cnJlbnRQYWdlLCBzZXRDdXJyZW50UGFnZV0gPSB1c2VTdGF0ZSgxKTtcbiAgY29uc3QgW2lzTG9hZGluZywgc2V0SXNMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Vycm9yTWVzc2FnZSwgc2V0RXJyb3JNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIGNvbnN0IHJldHJ5T25OZXR3b3JrRXJyb3JSZWYgPSB1c2VSZWYoZmFsc2UpO1xuICBjb25zdCBhY3RpdmVBYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYWN0aXZlUmVxdWVzdElkUmVmID0gdXNlUmVmKDApO1xuICBjb25zdCByZXRyeVRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXN0U2lnbmF0dXJlUmVmID0gdXNlUmVmKFwiXCIpO1xuXG4gIGNvbnN0IGNsZWFyUmV0cnlUaW1lciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAocmV0cnlUaW1lclJlZi5jdXJyZW50KSB7XG4gICAgICBjbGVhclRpbWVvdXQocmV0cnlUaW1lclJlZi5jdXJyZW50KTtcbiAgICAgIHJldHJ5VGltZXJSZWYuY3VycmVudCA9IG51bGw7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3QgYWJvcnRBY3RpdmVSZXF1ZXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghYWN0aXZlQWJvcnRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50LmFib3J0KCk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJZ25vcmUgYWJvcnQgZXJyb3JzLlxuICAgIH1cbiAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHJlc2V0QWN0aXZpdGllcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjbGVhclJldHJ5VGltZXIoKTtcbiAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcbiAgICBzZXRJdGVtcyhbXSk7XG4gICAgc2V0VG90YWwoMCk7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gIH0sIFthYm9ydEFjdGl2ZVJlcXVlc3QsIGNsZWFyUmV0cnlUaW1lcl0pO1xuXG4gIGNvbnN0IGxvYWRBY3Rpdml0aWVzID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHBhZ2U6IG51bWJlciwgb3ZlcnJpZGU/OiBMb2FkT3ZlcnJpZGUpID0+IHtcbiAgICAgIGNvbnN0IGZyb21EYXRlU3RyID0gb3ZlcnJpZGU/LmZyb21EYXRlID8/IGZyb21EYXRlVmFsdWU7XG4gICAgICBjb25zdCB0b0RhdGVTdHIgPSBvdmVycmlkZT8udG9EYXRlID8/IHRvRGF0ZVZhbHVlO1xuICAgICAgY29uc3QgYWNjb3VudE51bVN0ciA9IG92ZXJyaWRlPy5hY2NvdW50TnVtID8/IGFjY291bnROdW1WYWx1ZTtcblxuICAgICAgaWYgKCFmcm9tRGF0ZVN0ciB8fCAhdG9EYXRlU3RyKSB7XG4gICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgICAgc2V0VG90YWwoMCk7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgIGNsZWFyUmV0cnlUaW1lcigpO1xuXG4gICAgICBjb25zdCByZXF1ZXN0SWQgPSArK2FjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50O1xuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0KCk7XG5cbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcblxuICAgICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZVJhbmdlKGZyb21EYXRlU3RyLCB0b0RhdGVTdHIpO1xuICAgICAgY29uc3QgZmlsdGVyU2lnbmF0dXJlID0gYCR7bm9ybWFsaXplZC5mcm9tfXwke25vcm1hbGl6ZWQudG99fCR7YWNjb3VudE51bVN0cn18JHtwYWdlfWA7XG4gICAgICBsYXN0U2lnbmF0dXJlUmVmLmN1cnJlbnQgPSBmaWx0ZXJTaWduYXR1cmU7XG5cbiAgICAgIHNldElzTG9hZGluZyh0cnVlKTtcbiAgICAgIHNldEl0ZW1zKFtdKTtcbiAgICAgIHNldFRvdGFsKDApO1xuICAgICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuXG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICBmcm9tRGF0ZTogbm9ybWFsaXplZC5mcm9tLFxuICAgICAgICB0b0RhdGU6IG5vcm1hbGl6ZWQudG8sXG4gICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1TdHIsXG4gICAgICB9O1xuXG4gICAgICBvbkRlYnVnPy4oXCJsb2FkQWN0aXZpdGllczpyZXF1ZXN0XCIsIHsgcGFnZSwgcGFnZVNpemUsIHBheWxvYWQgfSk7XG5cbiAgICAgIGxldCBkYXRhOiBIaXN0b3J5UmVzcG9uc2U7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gYXdhaXQgZmV0Y2hKc29uPEhpc3RvcnlSZXNwb25zZT4oYC9IaXN0b3JpYWwvR2V0QWN0aXZpdGllcz9wYWdlPSR7cGFnZX0mcGFnZVNpemU9JHtwYWdlU2l6ZX1gLCB7XG4gICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocGF5bG9hZCksXG4gICAgICAgICAgc2lnbmFsOiBjb250cm9sbGVyLnNpZ25hbCxcbiAgICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgICBpZiAoZXJyPy5uYW1lID09PSBcIkFib3J0RXJyb3JcIikge1xuICAgICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBBcGlGZXRjaEVycm9yICYmIGVyci5zdGF0dXMgPT09IDQwMykge1xuICAgICAgICAgIHNldElzTG9hZGluZyhmYWxzZSk7XG4gICAgICAgICAgYWN0aXZlQWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgICAgb25Gb3JiaWRkZW4oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc05ldHdvcmtFcnJvciA9ICEoZXJyIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikgfHwgdHlwZW9mIGVyci5zdGF0dXMgIT09IFwibnVtYmVyXCI7XG4gICAgICAgIGlmIChpc05ldHdvcmtFcnJvciAmJiByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICByZXRyeU9uTmV0d29ya0Vycm9yUmVmLmN1cnJlbnQgPSBmYWxzZTtcbiAgICAgICAgICBhY3RpdmVBYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgICByZXRyeVRpbWVyUmVmLmN1cnJlbnQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdElkICE9PSBhY3RpdmVSZXF1ZXN0SWRSZWYuY3VycmVudCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGxhc3RTaWduYXR1cmVSZWYuY3VycmVudCAhPT0gZmlsdGVyU2lnbmF0dXJlKSByZXR1cm47XG4gICAgICAgICAgICBsb2FkQWN0aXZpdGllcyhwYWdlLCB7XG4gICAgICAgICAgICAgIGZyb21EYXRlOiBmcm9tRGF0ZVN0cixcbiAgICAgICAgICAgICAgdG9EYXRlOiB0b0RhdGVTdHIsXG4gICAgICAgICAgICAgIGFjY291bnROdW06IGFjY291bnROdW1TdHIsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LCByZXRyeURlbGF5TXMpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoZXJyPy5tZXNzYWdlIHx8IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIk5vIHNlIHB1ZG8gY29uZWN0YXIgY29uIGVsIHNlcnZpZG9yIChyZWQpLlwiKSk7XG4gICAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXF1ZXN0SWQgIT09IGFjdGl2ZVJlcXVlc3RJZFJlZi5jdXJyZW50KSByZXR1cm47XG5cbiAgICAgIG9uRGVidWc/LihcImxvYWRBY3Rpdml0aWVzOnJlc3BvbnNlXCIsIHtcbiAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgIHRvdGFsOiBkYXRhPy50b3RhbCA/PyAwLFxuICAgICAgICBjb3VudDogQXJyYXkuaXNBcnJheShkYXRhPy5pdGVtcykgPyBkYXRhLml0ZW1zLmxlbmd0aCA6IDAsXG4gICAgICB9KTtcblxuICAgICAgc2V0SXNMb2FkaW5nKGZhbHNlKTtcbiAgICAgIHNldEl0ZW1zKGRhdGEuaXRlbXMgfHwgW10pO1xuICAgICAgc2V0VG90YWwoZGF0YS50b3RhbCB8fCAoZGF0YS5pdGVtcyB8fCBbXSkubGVuZ3RoKTtcbiAgICAgIGFjdGl2ZUFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH0sXG4gICAgW1xuICAgICAgYWJvcnRBY3RpdmVSZXF1ZXN0LFxuICAgICAgYWNjb3VudE51bVZhbHVlLFxuICAgICAgY2xlYXJSZXRyeVRpbWVyLFxuICAgICAgZnJvbURhdGVWYWx1ZSxcbiAgICAgIG5vcm1hbGl6ZVJhbmdlLFxuICAgICAgb25EZWJ1ZyxcbiAgICAgIG9uRm9yYmlkZGVuLFxuICAgICAgcGFnZVNpemUsXG4gICAgICByZXRyeURlbGF5TXMsXG4gICAgICB0b0RhdGVWYWx1ZSxcbiAgICBdXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJSZXRyeVRpbWVyKCk7XG4gICAgICBhYm9ydEFjdGl2ZVJlcXVlc3QoKTtcbiAgICB9O1xuICB9LCBbYWJvcnRBY3RpdmVSZXF1ZXN0LCBjbGVhclJldHJ5VGltZXJdKTtcblxuICByZXR1cm4ge1xuICAgIGl0ZW1zLFxuICAgIHRvdGFsLFxuICAgIGN1cnJlbnRQYWdlLFxuICAgIGlzTG9hZGluZyxcbiAgICBlcnJvck1lc3NhZ2UsXG4gICAgbG9hZEFjdGl2aXRpZXMsXG4gICAgcmVzZXRBY3Rpdml0aWVzLFxuICAgIHJldHJ5T25OZXR3b3JrRXJyb3JSZWYsXG4gICAgbGFzdFNpZ25hdHVyZVJlZixcbiAgfTtcbn07XG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEhJU1RPUllfRklMVEVSX0tFWSwgSElTVE9SWV9SRVRVUk5fRkxBR19LRVkgfSBmcm9tIFwiLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB7XG4gIGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeSxcbiAgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbiAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeSxcbiAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5LFxuICBzZXRTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5LFxufSBmcm9tIFwiLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xuXG5leHBvcnQgdHlwZSBIaXN0b3J5Q2FjaGVkRmlsdGVyID0ge1xuICBmcm9tRGF0ZTogc3RyaW5nO1xuICB0b0RhdGU6IHN0cmluZztcbiAgcGFnZT86IG51bWJlcjtcbiAgY2xpZW50QWNjb3VudD86IHN0cmluZztcbiAgY2xpZW50VGV4dD86IHN0cmluZztcbn07XG5cbmNvbnN0IEhJU1RPUllfQ0FDSEVfVFRMX01TID0gMTIgKiA2MCAqIDYwICogMTAwMDtcblxuY29uc3Qgbm9ybWFsaXplQ2FjaGVkRmlsdGVyID0gKHZhbHVlOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCk6IEhpc3RvcnlDYWNoZWRGaWx0ZXIgfCBudWxsID0+IHtcbiAgaWYgKCF2YWx1ZSB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpIHJldHVybiBudWxsO1xuICByZXR1cm4ge1xuICAgIGZyb21EYXRlOiB2YWx1ZS5mcm9tRGF0ZSB8fCBcIlwiLFxuICAgIHRvRGF0ZTogdmFsdWUudG9EYXRlIHx8IFwiXCIsXG4gICAgcGFnZTogdmFsdWUucGFnZSxcbiAgICBjbGllbnRBY2NvdW50OiB2YWx1ZS5jbGllbnRBY2NvdW50IHx8IFwiXCIsXG4gICAgY2xpZW50VGV4dDogdmFsdWUuY2xpZW50VGV4dCB8fCBcIlwiLFxuICB9O1xufTtcblxuLy8gS2VlcHMgaGlzdG9yeSBmaWx0ZXIgY2FjaGUgcmVhZHMvd3JpdGVzIGluIG9uZSBwbGFjZS5cbmV4cG9ydCBjb25zdCB1c2VIaXN0b3J5RmlsdGVyQ2FjaGUgPSAoKSA9PiB7XG4gIGNvbnN0IHJlYWRDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjaygoKTogSGlzdG9yeUNhY2hlZEZpbHRlciB8IG51bGwgPT4ge1xuICAgIGNvbnN0IHBhcnNlZCA9IGdldFNlc3Npb25Kc29uV2l0aEV4cGlyeTxIaXN0b3J5Q2FjaGVkRmlsdGVyPihISVNUT1JZX0ZJTFRFUl9LRVkpO1xuICAgIHJldHVybiBub3JtYWxpemVDYWNoZWRGaWx0ZXIocGFyc2VkKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyRmlsdGVyQ2FjaGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX0ZJTFRFUl9LRVkpO1xuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY29uc3VtZVJldHVybkZsYWcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgcmF3ID0gZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSk7XG4gICAgaWYgKHJhdyA9PT0gXCIxXCIpIHtcbiAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoSElTVE9SWV9SRVRVUk5fRkxBR19LRVkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHNhdmVDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjaygoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyKSA9PiB7XG4gICAgc2V0U2Vzc2lvbkpzb25XaXRoRXhwaXJ5KEhJU1RPUllfRklMVEVSX0tFWSwgZmlsdGVyLCBISVNUT1JZX0NBQ0hFX1RUTF9NUyk7XG4gICAgc2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShISVNUT1JZX1JFVFVSTl9GTEFHX0tFWSwgXCIxXCIsIEhJU1RPUllfQ0FDSEVfVFRMX01TKTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgcmVhZENhY2hlZEZpbHRlcixcbiAgICBjbGVhckZpbHRlckNhY2hlLFxuICAgIGNvbnN1bWVSZXR1cm5GbGFnLFxuICAgIHNhdmVDYWNoZWRGaWx0ZXIsXG4gIH07XG59O1xuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBNb3VzZUV2ZW50IGFzIFJlYWN0TW91c2VFdmVudCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHR5cGUgeyBDbGllbnRPcHRpb24gfSBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy92aXNpdGFzL0NsaWVudFNlYXJjaENvbWJvYm94LnRzeFwiO1xuaW1wb3J0IHR5cGUgeyBIaXN0b3J5Q2FjaGVkRmlsdGVyIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUhpc3RvcnlGaWx0ZXJDYWNoZS50c1wiO1xuXG5leHBvcnQgdHlwZSBRdWlja0ZpbHRlcklkID0gXCJjdXN0b21cIiB8IFwiZGF5cy03XCIgfCBcImRheXMtMzBcIiB8IFwiZGF5cy05MFwiO1xuXG5leHBvcnQgdHlwZSBMb2FkT3ZlcnJpZGUgPSB7XG4gIGZyb21EYXRlOiBzdHJpbmc7XG4gIHRvRGF0ZTogc3RyaW5nO1xuICBhY2NvdW50TnVtPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgRmlsdGVyTG9hZFJlcXVlc3QgPSB7XG4gIHBhZ2U6IG51bWJlcjtcbiAgb3ZlcnJpZGU6IExvYWRPdmVycmlkZTtcbn07XG5cbnR5cGUgVXNlSGlzdG9yeUZpbHRlcnNTdGF0ZUFyZ3MgPSB7XG4gIGRlZmF1bHRGcm9tRGF0ZTogc3RyaW5nO1xuICBkZWZhdWx0VG9EYXRlOiBzdHJpbmc7XG4gIGxvZ0hpc3Rvcnk6IChtZXNzYWdlOiBzdHJpbmcsIGRhdGE/OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4gdm9pZDtcbiAgcGFyc2VEYXRlVmFsdWU6ICh2YWx1ZTogc3RyaW5nKSA9PiBEYXRlIHwgbnVsbDtcbiAgcGFyc2VJU086ICh2YWx1ZTogc3RyaW5nKSA9PiBEYXRlIHwgbnVsbDtcbiAgdG9JU086ICh2YWx1ZTogRGF0ZSkgPT4gc3RyaW5nO1xuICBzdGFydE9mRGF5OiAodmFsdWU6IERhdGUpID0+IERhdGU7XG4gIGlzQmVmb3JlOiAoYTogRGF0ZSB8IG51bGwsIGI6IERhdGUgfCBudWxsKSA9PiBib29sZWFuO1xufTtcblxuLy8gRW5jYXBzdWxhdGVzIGhpc3RvcnkgZmlsdGVyIHN0YXRlIGFuZCBkYXRlLXJhbmdlIG9yY2hlc3RyYXRpb24uXG5leHBvcnQgY29uc3QgdXNlSGlzdG9yeUZpbHRlcnNTdGF0ZSA9ICh7XG4gIGRlZmF1bHRGcm9tRGF0ZSxcbiAgZGVmYXVsdFRvRGF0ZSxcbiAgbG9nSGlzdG9yeSxcbiAgcGFyc2VEYXRlVmFsdWUsXG4gIHBhcnNlSVNPLFxuICB0b0lTTyxcbiAgc3RhcnRPZkRheSxcbiAgaXNCZWZvcmUsXG59OiBVc2VIaXN0b3J5RmlsdGVyc1N0YXRlQXJncykgPT4ge1xuICBjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGU8RGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZW5kRGF0ZSwgc2V0RW5kRGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFttYW51YWxTdGFydERhdGUsIHNldE1hbnVhbFN0YXJ0RGF0ZV0gPSB1c2VTdGF0ZTxEYXRlIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFttYW51YWxFbmREYXRlLCBzZXRNYW51YWxFbmREYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2hvdmVyRGF0ZSwgc2V0SG92ZXJEYXRlXSA9IHVzZVN0YXRlPERhdGUgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGluZ1N0ZXAsIHNldFNlbGVjdGluZ1N0ZXBdID0gdXNlU3RhdGU8XCJzdGFydFwiIHwgXCJlbmRcIiB8IFwiZG9uZVwiPihcInN0YXJ0XCIpO1xuICBjb25zdCBbY3VycmVudE1vbnRoLCBzZXRDdXJyZW50TW9udGhdID0gdXNlU3RhdGUobmV3IERhdGUoKS5nZXRNb250aCgpKTtcbiAgY29uc3QgW2N1cnJlbnRZZWFyLCBzZXRDdXJyZW50WWVhcl0gPSB1c2VTdGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuICBjb25zdCBbaXNPcGVuLCBzZXRJc09wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbc2hvd01hbnVhbFBpY2tlclBhbmVsLCBzZXRTaG93TWFudWFsUGlja2VyUGFuZWxdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYWN0aXZlUXVpY2tGaWx0ZXIsIHNldEFjdGl2ZVF1aWNrRmlsdGVyXSA9IHVzZVN0YXRlPFF1aWNrRmlsdGVySWQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3NlbGVjdGVkQ2xpZW50LCBzZXRTZWxlY3RlZENsaWVudF0gPSB1c2VTdGF0ZTxDbGllbnRPcHRpb24gfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2NsaWVudFJlc2V0S2V5LCBzZXRDbGllbnRSZXNldEtleV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3Nob3dGaWx0ZXJzLCBzZXRTaG93RmlsdGVyc10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW3Nob3dNYW51YWxFcnJvciwgc2V0U2hvd01hbnVhbEVycm9yXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBoYXNSZXN0b3JlZEZpbHRlclJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGRpZEluaXRGaWx0ZXJSZWYgPSB1c2VSZWYoZmFsc2UpO1xuXG4gIGNvbnN0IGZyb21EYXRlVmFsdWUgPSB1c2VNZW1vKCgpID0+IChzdGFydERhdGUgPyB0b0lTTyhzdGFydERhdGUpIDogXCJcIiksIFtzdGFydERhdGUsIHRvSVNPXSk7XG4gIGNvbnN0IHRvRGF0ZVZhbHVlID0gdXNlTWVtbygoKSA9PiAoZW5kRGF0ZSA/IHRvSVNPKGVuZERhdGUpIDogXCJcIiksIFtlbmREYXRlLCB0b0lTT10pO1xuICBjb25zdCBhY2NvdW50TnVtVmFsdWUgPSB1c2VNZW1vKCgpID0+IChzZWxlY3RlZENsaWVudCA/IHNlbGVjdGVkQ2xpZW50LnZhbHVlIDogXCJcIiksIFtzZWxlY3RlZENsaWVudF0pO1xuXG4gIGNvbnN0IHZhbGlkYXRlTWFudWFsUmFuZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGFjdGl2ZVF1aWNrRmlsdGVyID09PSBcImN1c3RvbVwiICYmICghc3RhcnREYXRlIHx8ICFlbmREYXRlKSkge1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKHRydWUpO1xuICAgICAgc2V0U2VsZWN0aW5nU3RlcCghc3RhcnREYXRlID8gXCJzdGFydFwiIDogXCJlbmRcIik7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XG4gICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sIFthY3RpdmVRdWlja0ZpbHRlciwgZW5kRGF0ZSwgc3RhcnREYXRlXSk7XG5cbiAgLy8gQXBwbGllcyBhIGRlZmF1bHQgZGF0ZSByYW5nZSBhbmQgcmV0dXJucyB0aGUgbG9hZCBwYXlsb2FkIG5lZWRlZCBieSB0aGUgcGFnZS5cbiAgY29uc3QgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMgPSB1c2VDYWxsYmFjaygoKTogRmlsdGVyTG9hZFJlcXVlc3QgfCBudWxsID0+IHtcbiAgICBpZiAoIWRlZmF1bHRGcm9tRGF0ZSB8fCAhZGVmYXVsdFRvRGF0ZSkgcmV0dXJuIG51bGw7XG4gICAgY29uc3Qgc3RhcnRSYXcgPSBwYXJzZURhdGVWYWx1ZShkZWZhdWx0RnJvbURhdGUpO1xuICAgIGNvbnN0IGVuZFJhdyA9IHBhcnNlRGF0ZVZhbHVlKGRlZmF1bHRUb0RhdGUpO1xuICAgIGlmICghc3RhcnRSYXcgfHwgIWVuZFJhdykgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCBzdGFydERheSA9IHN0YXJ0T2ZEYXkoc3RhcnRSYXcpO1xuICAgIGNvbnN0IGVuZERheSA9IHN0YXJ0T2ZEYXkoZW5kUmF3KTtcblxuICAgIGxldCBzdGFydCA9IHN0YXJ0RGF5O1xuICAgIGxldCBlbmQgPSBlbmREYXk7XG4gICAgaWYgKGlzQmVmb3JlKGVuZCwgc3RhcnQpKSB7XG4gICAgICBjb25zdCBzd2FwID0gc3RhcnQ7XG4gICAgICBzdGFydCA9IGVuZDtcbiAgICAgIGVuZCA9IHN3YXA7XG4gICAgfVxuXG4gICAgc2V0U3RhcnREYXRlKHN0YXJ0KTtcbiAgICBzZXRFbmREYXRlKGVuZCk7XG4gICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XG4gICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgIHNldEN1cnJlbnRNb250aChzdGFydC5nZXRNb250aCgpKTtcbiAgICBzZXRDdXJyZW50WWVhcihzdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICBzZXRBY3RpdmVRdWlja0ZpbHRlcihudWxsKTtcbiAgICBzZXRTZWxlY3RlZENsaWVudChudWxsKTtcbiAgICBzZXRJc09wZW4oZmFsc2UpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBvdmVycmlkZToge1xuICAgICAgICBmcm9tRGF0ZTogdG9JU08oc3RhcnQpLFxuICAgICAgICB0b0RhdGU6IHRvSVNPKGVuZCksXG4gICAgICAgIGFjY291bnROdW06IFwiXCIsXG4gICAgICB9LFxuICAgIH07XG4gIH0sIFtkZWZhdWx0RnJvbURhdGUsIGRlZmF1bHRUb0RhdGUsIGlzQmVmb3JlLCBwYXJzZURhdGVWYWx1ZSwgc3RhcnRPZkRheSwgdG9JU09dKTtcblxuICAvLyBSZXNldHMgaGlzdG9yeSBmaWx0ZXJzIGxvY2FsIHN0YXRlIG9ubHkuXG4gIGNvbnN0IHJlc2V0SGlzdG9yeUZpbHRlcnMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0U3RhcnREYXRlKG51bGwpO1xuICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgc2V0TWFudWFsU3RhcnREYXRlKG51bGwpO1xuICAgIHNldE1hbnVhbEVuZERhdGUobnVsbCk7XG4gICAgc2V0U2VsZWN0aW5nU3RlcChcInN0YXJ0XCIpO1xuICAgIHNldEhvdmVyRGF0ZShudWxsKTtcbiAgICBzZXRDdXJyZW50TW9udGgobmV3IERhdGUoKS5nZXRNb250aCgpKTtcbiAgICBzZXRDdXJyZW50WWVhcihuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKG51bGwpO1xuICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQobnVsbCk7XG4gICAgc2V0Q2xpZW50UmVzZXRLZXkoKHByZXYpID0+IHByZXYgKyAxKTtcbiAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICB9LCBbXSk7XG5cbiAgLy8gQXBwbGllcyBjYWNoZWQgZmlsdGVycyBhbmQgcmV0dXJucyB0aGUgbG9hZCBwYXlsb2FkIG5lZWRlZCBieSB0aGUgcGFnZS5cbiAgY29uc3QgYXBwbHlDYWNoZWRGaWx0ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoZmlsdGVyOiBIaXN0b3J5Q2FjaGVkRmlsdGVyIHwgbnVsbCk6IEZpbHRlckxvYWRSZXF1ZXN0IHwgbnVsbCA9PiB7XG4gICAgICBpZiAoIWZpbHRlciB8fCAhZmlsdGVyLmZyb21EYXRlIHx8ICFmaWx0ZXIudG9EYXRlKSByZXR1cm4gbnVsbDtcblxuICAgICAgY29uc3Qgc3RhcnQgPSBwYXJzZUlTTyhmaWx0ZXIuZnJvbURhdGUpO1xuICAgICAgY29uc3QgZW5kID0gcGFyc2VJU08oZmlsdGVyLnRvRGF0ZSk7XG4gICAgICBzZXRTdGFydERhdGUoc3RhcnQpO1xuICAgICAgc2V0RW5kRGF0ZShlbmQpO1xuICAgICAgc2V0U2VsZWN0aW5nU3RlcChlbmQgPyBcImRvbmVcIiA6IFwiZW5kXCIpO1xuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0ID8gc3RhcnQuZ2V0TW9udGgoKSA6IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSk7XG4gICAgICBzZXRDdXJyZW50WWVhcihzdGFydCA/IHN0YXJ0LmdldEZ1bGxZZWFyKCkgOiBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcblxuICAgICAgaWYgKGZpbHRlci5jbGllbnRBY2NvdW50KSB7XG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50KHsgdmFsdWU6IGZpbHRlci5jbGllbnRBY2NvdW50LCB0ZXh0OiBmaWx0ZXIuY2xpZW50VGV4dCB8fCBmaWx0ZXIuY2xpZW50QWNjb3VudCB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFNlbGVjdGVkQ2xpZW50KG51bGwpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYWdlVmFsID0gTnVtYmVyKGZpbHRlci5wYWdlKTtcbiAgICAgIGNvbnN0IHBhZ2VUb0xvYWQgPSBOdW1iZXIuaXNGaW5pdGUocGFnZVZhbCkgJiYgcGFnZVZhbCA+IDAgPyBwYWdlVmFsIDogMTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFnZTogcGFnZVRvTG9hZCxcbiAgICAgICAgb3ZlcnJpZGU6IHtcbiAgICAgICAgICBmcm9tRGF0ZTogZmlsdGVyLmZyb21EYXRlLFxuICAgICAgICAgIHRvRGF0ZTogZmlsdGVyLnRvRGF0ZSxcbiAgICAgICAgICBhY2NvdW50TnVtOiBmaWx0ZXIuY2xpZW50QWNjb3VudCB8fCBcIlwiLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9LFxuICAgIFtwYXJzZUlTT11cbiAgKTtcblxuICBjb25zdCBoYW5kbGVTZWxlY3QgPSB1c2VDYWxsYmFjayhcbiAgICAoZGF0ZU9iajogRGF0ZSkgPT4ge1xuICAgICAgbG9nSGlzdG9yeShcImhhbmRsZVNlbGVjdFwiLCB7XG4gICAgICAgIGNsaWNrZWQ6IHRvSVNPKGRhdGVPYmopLFxuICAgICAgICBzdGFydDogZnJvbURhdGVWYWx1ZSxcbiAgICAgICAgZW5kOiB0b0RhdGVWYWx1ZSxcbiAgICAgICAgc2VsZWN0aW5nU3RlcCxcbiAgICAgIH0pO1xuXG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIoXCJjdXN0b21cIik7XG4gICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XG4gICAgICBjb25zdCBoYXNTdGFydCA9ICEhc3RhcnREYXRlO1xuICAgICAgY29uc3QgaGFzRW5kID0gISFlbmREYXRlO1xuXG4gICAgICBpZiAoc2VsZWN0aW5nU3RlcCA9PT0gXCJlbmRcIikge1xuICAgICAgICBpZiAoIWhhc1N0YXJ0KSB7XG4gICAgICAgICAgc2V0U3RhcnREYXRlKGRhdGVPYmopO1xuICAgICAgICAgIHNldEVuZERhdGUobnVsbCk7XG4gICAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcbiAgICAgICAgICBzZXRDdXJyZW50TW9udGgoZGF0ZU9iai5nZXRNb250aCgpKTtcbiAgICAgICAgICBzZXRDdXJyZW50WWVhcihkYXRlT2JqLmdldEZ1bGxZZWFyKCkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBuZXdTdGFydCA9IHN0YXJ0RGF0ZSBhcyBEYXRlO1xuICAgICAgICBsZXQgbmV3RW5kID0gZGF0ZU9iajtcbiAgICAgICAgaWYgKGlzQmVmb3JlKG5ld0VuZCwgbmV3U3RhcnQpKSB7XG4gICAgICAgICAgY29uc3Qgc3dhcCA9IG5ld1N0YXJ0O1xuICAgICAgICAgIG5ld1N0YXJ0ID0gbmV3RW5kO1xuICAgICAgICAgIG5ld0VuZCA9IHN3YXA7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgICBzZXRFbmREYXRlKG5ld0VuZCk7XG4gICAgICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICAgIHNldE1hbnVhbEVuZERhdGUobmV3RW5kKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImRvbmVcIik7XG4gICAgICAgIHNldEN1cnJlbnRNb250aChuZXdFbmQuZ2V0TW9udGgoKSk7XG4gICAgICAgIHNldEN1cnJlbnRZZWFyKG5ld0VuZC5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld1N0YXJ0ID0gZGF0ZU9iajtcbiAgICAgIGlmIChoYXNFbmQgJiYgZW5kRGF0ZSAmJiBpc0JlZm9yZShlbmREYXRlLCBuZXdTdGFydCkpIHtcbiAgICAgICAgc2V0U3RhcnREYXRlKG5ld1N0YXJ0KTtcbiAgICAgICAgc2V0RW5kRGF0ZShudWxsKTtcbiAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChcImVuZFwiKTtcbiAgICAgICAgc2V0Q3VycmVudE1vbnRoKG5ld1N0YXJ0LmdldE1vbnRoKCkpO1xuICAgICAgICBzZXRDdXJyZW50WWVhcihuZXdTdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRTdGFydERhdGUobmV3U3RhcnQpO1xuICAgICAgaWYgKGhhc0VuZCAmJiBlbmREYXRlKSB7XG4gICAgICAgIHNldEVuZERhdGUoZW5kRGF0ZSk7XG4gICAgICAgIHNldE1hbnVhbFN0YXJ0RGF0ZShuZXdTdGFydCk7XG4gICAgICAgIHNldE1hbnVhbEVuZERhdGUoZW5kRGF0ZSk7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIHNldFNob3dNYW51YWxQaWNrZXJQYW5lbChmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRFbmREYXRlKG51bGwpO1xuICAgICAgICBzZXRTZWxlY3RpbmdTdGVwKFwiZW5kXCIpO1xuICAgICAgfVxuXG4gICAgICBzZXRDdXJyZW50TW9udGgobmV3U3RhcnQuZ2V0TW9udGgoKSk7XG4gICAgICBzZXRDdXJyZW50WWVhcihuZXdTdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICB9LFxuICAgIFtlbmREYXRlLCBmcm9tRGF0ZVZhbHVlLCBpc0JlZm9yZSwgbG9nSGlzdG9yeSwgc2VsZWN0aW5nU3RlcCwgc3RhcnREYXRlLCB0b0RhdGVWYWx1ZSwgdG9JU09dXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlQ2xlYXJTdGF0ZSA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogUmVhY3RNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGxvZ0hpc3RvcnkoXCJjbGVhclJhbmdlXCIpO1xuICAgICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIobnVsbCk7XG4gICAgICBzZXRTaG93TWFudWFsRXJyb3IoZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgIHJlc2V0SGlzdG9yeUZpbHRlcnMoKTtcbiAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICBzZXRTaG93RmlsdGVycyh0cnVlKTtcbiAgICB9LFxuICAgIFtsb2dIaXN0b3J5LCByZXNldEhpc3RvcnlGaWx0ZXJzXVxuICApO1xuXG4gIGNvbnN0IG9wZW5Qb3BvdmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKHNlY3Rpb246IFwic3RhcnRcIiB8IFwiZW5kXCIpID0+IHtcbiAgICAgIGxvZ0hpc3RvcnkoXCJvcGVuUG9wb3ZlclwiLCB7IHNlY3Rpb24sIHN0YXJ0OiBmcm9tRGF0ZVZhbHVlLCBlbmQ6IHRvRGF0ZVZhbHVlLCBzZWxlY3RpbmdTdGVwIH0pO1xuICAgICAgc2V0U2hvd01hbnVhbEVycm9yKGZhbHNlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKHRydWUpO1xuXG4gICAgICBpZiAoc2VjdGlvbiA9PT0gXCJlbmRcIiAmJiAhc3RhcnREYXRlKSB7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJzdGFydFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoc2VjdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHNldElzT3Blbih0cnVlKTtcbiAgICB9LFxuICAgIFtmcm9tRGF0ZVZhbHVlLCBsb2dIaXN0b3J5LCBzZWxlY3RpbmdTdGVwLCBzdGFydERhdGUsIHRvRGF0ZVZhbHVlXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZUFjdGl2YXRvcktleURvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIG9wZW5Qb3BvdmVyKFwic3RhcnRcIik7XG4gICAgfSxcbiAgICBbb3BlblBvcG92ZXJdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlU2VjdGlvbktleURvd24gPSB1c2VDYWxsYmFjayhcbiAgICAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+LCBzZWN0aW9uOiBcInN0YXJ0XCIgfCBcImVuZFwiKSA9PiB7XG4gICAgICBpZiAoZXZlbnQua2V5ICE9PSBcIkVudGVyXCIgJiYgZXZlbnQua2V5ICE9PSBcIiBcIikgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgb3BlblBvcG92ZXIoc2VjdGlvbik7XG4gICAgfSxcbiAgICBbb3BlblBvcG92ZXJdXG4gICk7XG5cbiAgY29uc3QgYXBwbHlRdWlja1JhbmdlID0gdXNlQ2FsbGJhY2soXG4gICAgKGZpbHRlcklkOiBRdWlja0ZpbHRlcklkLCBzdGFydDogRGF0ZSwgZW5kOiBEYXRlKSA9PiB7XG4gICAgICBjb25zdCBzdGFydERheSA9IHN0YXJ0T2ZEYXkoc3RhcnQpO1xuICAgICAgY29uc3QgZW5kRGF5ID0gc3RhcnRPZkRheShlbmQpO1xuICAgICAgc2V0U3RhcnREYXRlKHN0YXJ0RGF5KTtcbiAgICAgIHNldEVuZERhdGUoZW5kRGF5KTtcbiAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgc2V0Q3VycmVudE1vbnRoKHN0YXJ0RGF5LmdldE1vbnRoKCkpO1xuICAgICAgc2V0Q3VycmVudFllYXIoc3RhcnREYXkuZ2V0RnVsbFllYXIoKSk7XG4gICAgICBzZXRJc09wZW4oZmFsc2UpO1xuICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKGZpbHRlcklkKTtcbiAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgfSxcbiAgICBbc3RhcnRPZkRheV1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVRdWlja0ZpbHRlciA9IHVzZUNhbGxiYWNrKFxuICAgIChmaWx0ZXJJZDogUXVpY2tGaWx0ZXJJZCkgPT4ge1xuICAgICAgY29uc3QgdG9kYXkgPSBzdGFydE9mRGF5KG5ldyBEYXRlKCkpO1xuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiY3VzdG9tXCIpIHtcbiAgICAgICAgaWYgKHNob3dNYW51YWxQaWNrZXJQYW5lbCkge1xuICAgICAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICAgICAgc2V0SG92ZXJEYXRlKG51bGwpO1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd01hbnVhbFBpY2tlclBhbmVsKGZhbHNlKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXh0U3RhcnQgPSBtYW51YWxTdGFydERhdGUgPyBuZXcgRGF0ZShtYW51YWxTdGFydERhdGUpIDogbnVsbDtcbiAgICAgICAgY29uc3QgbmV4dEVuZCA9IG1hbnVhbEVuZERhdGUgPyBuZXcgRGF0ZShtYW51YWxFbmREYXRlKSA6IG51bGw7XG4gICAgICAgIHNldEFjdGl2ZVF1aWNrRmlsdGVyKFwiY3VzdG9tXCIpO1xuICAgICAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwodHJ1ZSk7XG4gICAgICAgIHNldFN0YXJ0RGF0ZShuZXh0U3RhcnQpO1xuICAgICAgICBzZXRFbmREYXRlKG5leHRFbmQpO1xuXG4gICAgICAgIGlmIChuZXh0U3RhcnQpIHtcbiAgICAgICAgICBzZXRDdXJyZW50TW9udGgobmV4dFN0YXJ0LmdldE1vbnRoKCkpO1xuICAgICAgICAgIHNldEN1cnJlbnRZZWFyKG5leHRTdGFydC5nZXRGdWxsWWVhcigpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0U3RhcnQgJiYgbmV4dEVuZCkge1xuICAgICAgICAgIHNldFNlbGVjdGluZ1N0ZXAoXCJkb25lXCIpO1xuICAgICAgICAgIHNldElzT3BlbihmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0U2VsZWN0aW5nU3RlcChuZXh0U3RhcnQgJiYgIW5leHRFbmQgPyBcImVuZFwiIDogXCJzdGFydFwiKTtcbiAgICAgICAgICBzZXRJc09wZW4odHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzZXRIb3ZlckRhdGUobnVsbCk7XG4gICAgICAgIHNldFNob3dNYW51YWxFcnJvcihmYWxzZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtN1wiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDYpO1xuICAgICAgICBhcHBseVF1aWNrUmFuZ2UoZmlsdGVySWQsIHN0YXJ0LCB0b2RheSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGZpbHRlcklkID09PSBcImRheXMtMzBcIikge1xuICAgICAgICBjb25zdCBzdGFydCA9IG5ldyBEYXRlKHRvZGF5KTtcbiAgICAgICAgc3RhcnQuc2V0RGF0ZSh0b2RheS5nZXREYXRlKCkgLSAyOSk7XG4gICAgICAgIGFwcGx5UXVpY2tSYW5nZShmaWx0ZXJJZCwgc3RhcnQsIHRvZGF5KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVySWQgPT09IFwiZGF5cy05MFwiKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbmV3IERhdGUodG9kYXkpO1xuICAgICAgICBzdGFydC5zZXREYXRlKHRvZGF5LmdldERhdGUoKSAtIDg5KTtcbiAgICAgICAgYXBwbHlRdWlja1JhbmdlKGZpbHRlcklkLCBzdGFydCwgdG9kYXkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgW2FwcGx5UXVpY2tSYW5nZSwgbWFudWFsRW5kRGF0ZSwgbWFudWFsU3RhcnREYXRlLCBzaG93TWFudWFsUGlja2VyUGFuZWwsIHN0YXJ0T2ZEYXldXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlQ2xpZW50U2VsZWN0ZWQgPSB1c2VDYWxsYmFjaygoY2xpZW50OiBDbGllbnRPcHRpb24gfCBudWxsKSA9PiB7XG4gICAgc2V0U2VsZWN0ZWRDbGllbnQoY2xpZW50KTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgc3RhcnREYXRlLFxuICAgIGVuZERhdGUsXG4gICAgbWFudWFsU3RhcnREYXRlLFxuICAgIG1hbnVhbEVuZERhdGUsXG4gICAgaG92ZXJEYXRlLFxuICAgIHNlbGVjdGluZ1N0ZXAsXG4gICAgY3VycmVudE1vbnRoLFxuICAgIGN1cnJlbnRZZWFyLFxuICAgIGlzT3BlbixcbiAgICBzaG93TWFudWFsUGlja2VyUGFuZWwsXG4gICAgYWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2VsZWN0ZWRDbGllbnQsXG4gICAgY2xpZW50UmVzZXRLZXksXG4gICAgc2hvd0ZpbHRlcnMsXG4gICAgc2hvd01hbnVhbEVycm9yLFxuICAgIGZyb21EYXRlVmFsdWUsXG4gICAgdG9EYXRlVmFsdWUsXG4gICAgYWNjb3VudE51bVZhbHVlLFxuICAgIGhhc1Jlc3RvcmVkRmlsdGVyUmVmLFxuICAgIGRpZEluaXRGaWx0ZXJSZWYsXG4gICAgc2V0U3RhcnREYXRlLFxuICAgIHNldEVuZERhdGUsXG4gICAgc2V0TWFudWFsU3RhcnREYXRlLFxuICAgIHNldE1hbnVhbEVuZERhdGUsXG4gICAgc2V0SG92ZXJEYXRlLFxuICAgIHNldFNlbGVjdGluZ1N0ZXAsXG4gICAgc2V0Q3VycmVudE1vbnRoLFxuICAgIHNldEN1cnJlbnRZZWFyLFxuICAgIHNldElzT3BlbixcbiAgICBzZXRTaG93TWFudWFsUGlja2VyUGFuZWwsXG4gICAgc2V0QWN0aXZlUXVpY2tGaWx0ZXIsXG4gICAgc2V0U2VsZWN0ZWRDbGllbnQsXG4gICAgc2V0Q2xpZW50UmVzZXRLZXksXG4gICAgc2V0U2hvd0ZpbHRlcnMsXG4gICAgc2V0U2hvd01hbnVhbEVycm9yLFxuICAgIHZhbGlkYXRlTWFudWFsUmFuZ2UsXG4gICAgYXBwbHlEZWZhdWx0UmFuZ2VGcm9tUHJvcHMsXG4gICAgcmVzZXRIaXN0b3J5RmlsdGVycyxcbiAgICBhcHBseUNhY2hlZEZpbHRlcixcbiAgICBoYW5kbGVTZWxlY3QsXG4gICAgaGFuZGxlQ2xlYXJTdGF0ZSxcbiAgICBvcGVuUG9wb3ZlcixcbiAgICBoYW5kbGVBY3RpdmF0b3JLZXlEb3duLFxuICAgIGhhbmRsZVNlY3Rpb25LZXlEb3duLFxuICAgIGhhbmRsZVF1aWNrRmlsdGVyLFxuICAgIGhhbmRsZUNsaWVudFNlbGVjdGVkLFxuICB9O1xufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTs7O0FDQXpFLG1CQUFzRDtBQWduQmxEO0FBcGxCSixJQUFNLGNBQWM7QUFDcEIsSUFBTSx5QkFBeUI7QUFDL0IsSUFBTSxxQkFBcUI7QUFDM0IsSUFBTSwyQkFBMkI7QUFDakMsSUFBTSxvQkFBb0I7QUFDMUIsSUFBTSxtQkFBbUI7QUFDekIsSUFBTSxXQUFXO0FBQ2pCLElBQU0sWUFBWTtBQUNsQixJQUFNLGNBQWM7QUFDcEIsSUFBTSxlQUFlLENBQUMsMEJBQTBCLDBCQUEwQix3QkFBd0I7QUFjbEcsSUFBTSxvQkFBb0IsQ0FBQyxPQUFlLGtCQUEyQjtBQUNuRSxRQUFNLE1BQU07QUFDWixRQUFNLE1BQU07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TSw2Q0FBQyxlQUFZLGlCQUFrQyxlQUE4QixDQUFFO0FBQ3hHO0FBRUEsSUFBTSxRQUFRLE1BQU07QUFDbEIsUUFBTSxTQUFTLFNBQVMsZUFBZSxzQkFBc0I7QUFDN0QsTUFBSSxDQUFDLE9BQVE7QUFDYixtQkFBaUIsTUFBTTtBQUN6QjtBQUVBLHVCQUF1QixLQUFLO0FBRTVCLElBQU8sc0JBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJSZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJsb2dIaXN0b3J5IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X2pzeF9ydW50aW1lIiwgImltcG9ydF9yZWFjdCIsICJub3JtYWxpemVSYW5nZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImxvZ0hpc3RvcnkiLCAicGFyc2VEYXRlVmFsdWUiLCAicGFyc2VJU08iLCAidG9JU08iLCAic3RhcnRPZkRheSIsICJpc0JlZm9yZSIsICJuZXdTdGFydCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
