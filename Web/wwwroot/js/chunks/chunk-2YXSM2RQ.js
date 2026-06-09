import {
  Spinner_default,
  classNames
} from "./chunk-EGSPAV7B.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/commons/CompactPagination.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var DEFAULT_WINDOW = 6;
var CompactPagination = (0, import_react.forwardRef)(
  ({ totalPages, currentPage, pageWindow = DEFAULT_WINDOW, onPageChange, labels, className, loading }, ref) => {
    const safeTotal = Math.max(0, totalPages || 0);
    const safeCurrent = Math.min(Math.max(1, currentPage || 1), safeTotal || 1);
    const windowSize = Math.max(1, pageWindow || DEFAULT_WINDOW);
    const hasLoadingSignal = typeof loading === "boolean";
    const isLoading = loading === true;
    const [isPageTransitionPending, setIsPageTransitionPending] = (0, import_react.useState)(false);
    const showPageSpinner = hasLoadingSignal && isPageTransitionPending;
    const showPagination = safeTotal > 1;
    const showEdgeNav = safeTotal > windowSize;
    const canJumpToStart = safeCurrent > windowSize;
    const canGoPrev = safeCurrent > 1;
    const canGoNext = safeCurrent < safeTotal;
    const pageNumbers = (0, import_react.useMemo)(() => {
      if (!safeTotal) return [];
      const windowStart = Math.max(1, Math.floor((safeCurrent - 1) / windowSize) * windowSize + 1);
      const windowEnd = Math.min(safeTotal, windowStart + windowSize - 1);
      return Array.from({ length: windowEnd - windowStart + 1 }, (_val, idx) => windowStart + idx);
    }, [safeCurrent, safeTotal, windowSize]);
    (0, import_react.useEffect)(() => {
      if (!hasLoadingSignal || !isPageTransitionPending) return;
      if (isLoading) return;
      setIsPageTransitionPending(false);
    }, [hasLoadingSignal, isLoading, isPageTransitionPending]);
    (0, import_react.useEffect)(() => {
      if (!showPageSpinner) return;
      if (typeof window === "undefined" || typeof document === "undefined") return;
      const lockWindow = window;
      const lockCount = Number(lockWindow.__indPaginationLockCount || 0);
      if (lockCount < 1) {
        lockWindow.__indPaginationPrevOverflow = document.body.style.overflow;
        lockWindow.__indPaginationPrevTouchAction = document.body.style.touchAction;
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
      }
      lockWindow.__indPaginationLockCount = lockCount + 1;
      return () => {
        const currentCount = Number(lockWindow.__indPaginationLockCount || 0);
        const nextCount = Math.max(0, currentCount - 1);
        lockWindow.__indPaginationLockCount = nextCount;
        if (nextCount < 1) {
          document.body.style.overflow = lockWindow.__indPaginationPrevOverflow || "";
          document.body.style.touchAction = lockWindow.__indPaginationPrevTouchAction || "";
          delete lockWindow.__indPaginationPrevOverflow;
          delete lockWindow.__indPaginationPrevTouchAction;
        }
      };
    }, [showPageSpinner]);
    const requestPageChange = (page) => {
      if (page < 1 || page > safeTotal) return;
      if (page === safeCurrent) return;
      if (hasLoadingSignal) {
        setIsPageTransitionPending(true);
      }
      onPageChange(page);
    };
    if (!showPagination) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      showPageSpinner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-100",
          onWheel: (event) => {
            event.preventDefault();
          },
          onTouchMove: (event) => {
            event.preventDefault();
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-10 w-10" })
        }
      ) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          id: "pagination",
          ref,
          className: classNames(
            "pagination grid grid-cols-[1fr_auto_1fr] items-center gap-1",
            className || ""
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1 justify-start", children: [
              showEdgeNav && canJumpToStart && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                  "aria-label": labels?.first,
                  disabled: isLoading,
                  onClick: (e) => {
                    e.preventDefault();
                    requestPageChange(1);
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" }) })
                }
              ),
              showEdgeNav && canGoPrev && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                  "aria-label": labels?.prev,
                  disabled: isLoading,
                  onClick: (e) => {
                    e.preventDefault();
                    requestPageChange(safeCurrent - 1);
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 19.5 8.25 12l7.5-7.5" }) })
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center justify-center gap-1 min-w-0 flex-nowrap", children: pageNumbers.map((page) => {
              const isActive = page === safeCurrent;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  disabled: isLoading,
                  className: classNames(
                    "min-w-[26px] px-2 py-0.5 rounded-[var(--radius-xl)] border text-[10px] font-semibold transition",
                    isActive ? "bg-primary border-primary text-white shadow-sm" : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary",
                    isLoading ? "opacity-60 cursor-not-allowed" : ""
                  ),
                  onClick: (e) => {
                    e.preventDefault();
                    requestPageChange(page);
                  },
                  children: page
                },
                `page-${page}`
              );
            }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-1 justify-end", children: [
              showEdgeNav && canGoNext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                  "aria-label": labels?.next,
                  disabled: isLoading,
                  onClick: (e) => {
                    e.preventDefault();
                    requestPageChange(safeCurrent + 1);
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m8.25 4.5 7.5 7.5-7.5 7.5" }) })
                }
              ),
              showEdgeNav && canGoNext && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: "w-7 h-7 p-0 border-0 bg-transparent text-slate-500 hover:text-primary transition",
                  "aria-label": labels?.last,
                  disabled: isLoading,
                  onClick: (e) => {
                    e.preventDefault();
                    requestPageChange(safeTotal);
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" }) })
                }
              )
            ] })
          ]
        }
      )
    ] });
  }
);
CompactPagination.displayName = "CompactPagination";
var CompactPagination_default = CompactPagination;

// Web/wwwroot/react/src/hooks/useTimelineCardEffects.ts
var import_react2 = __toESM(require_react());
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
    if (Number.isFinite(lineHeight) && lineHeight > 0 && lineHeight < 8) {
      const fontSize = Number.parseFloat(computed.fontSize);
      if (Number.isFinite(fontSize) && fontSize > 0) {
        lineHeight = lineHeight * fontSize;
      }
    }
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
var useTimelineCardEffects = ({
  containerRef,
  errorMessage,
  items,
  resolveClickableCard
}) => {
  const tooltipRef = (0, import_react2.useRef)(null);
  const tooltipAnchorRef = (0, import_react2.useRef)(null);
  const tooltipCloseBoundRef = (0, import_react2.useRef)(false);
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
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
          const isMultiLine = el.classList.contains("timeline-desc-text");
          const trimmedText = String(text || "").trim();
          const didEllipsis = applyEllipsis(el, trimmedText, isMultiLine);
          if (didEllipsis && el.textContent === ELLIPSIS && trimmedText.length > 3 && el.clientWidth > 64) {
            el.textContent = trimmedText;
            el.dataset.preview = "1";
          }
        });
      });
      cleanups.push(() => window.cancelAnimationFrame(frameId));
    }
    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [containerRef, errorMessage, items, resolveClickableCard]);
};

// Web/wwwroot/react/src/components/commons/FloatingActionButton.tsx
var import_react4 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/useFloatingActionButtonVisibility.ts
var import_react3 = __toESM(require_react());
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
  const launchers = Array.from(document.querySelectorAll(ASSISTANT_LAUNCHER_SELECTOR));
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
  const [resolvedBottom, setResolvedBottom] = (0, import_react3.useState)(bottom);
  const [reservedHeight, setReservedHeight] = (0, import_react3.useState)(0);
  const animationFrameRef = (0, import_react3.useRef)(null);
  const updateLayout = (0, import_react3.useCallback)(() => {
    if (typeof window === "undefined") return;
    const nextBottom = resolveBottomOffset(bottom);
    const nextReservedHeight = resolveReservedHeight(nextBottom, size);
    setResolvedBottom((previous) => Math.abs(previous - nextBottom) < 1 ? previous : nextBottom);
    setReservedHeight((previous) => Math.abs(previous - nextReservedHeight) < 1 ? previous : nextReservedHeight);
  }, [bottom, size]);
  const scheduleLayoutUpdate = (0, import_react3.useCallback)(() => {
    if (typeof window === "undefined") return;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateLayout();
    });
  }, [updateLayout]);
  (0, import_react3.useLayoutEffect)(() => {
    updateLayout();
  }, [updateLayout]);
  (0, import_react3.useEffect)(() => {
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
  (0, import_react3.useEffect)(() => {
    setPageFloatingClearance(reservedHeight);
    return () => {
      clearPageFloatingClearance();
    };
  }, [reservedHeight]);
  (0, import_react3.useEffect)(() => {
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
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
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
  const rootRef = (0, import_react4.useRef)(null);
  const canvasRef = (0, import_react4.useRef)(null);
  const [internalMenuOpen, setInternalMenuOpen] = (0, import_react4.useState)(false);
  const hasMenu = menuItems.length > 0;
  const isMenuControlled = typeof isMenuOpen === "boolean";
  const menuOpen = hasMenu ? isMenuControlled ? Boolean(isMenuOpen) : internalMenuOpen : false;
  const { resolvedBottom } = useFloatingActionButtonVisibility({
    bottom,
    size
  });
  const portalTarget = typeof document === "undefined" ? null : document.body;
  const setMenuOpen = (0, import_react4.useCallback)(
    (nextOpen) => {
      if (!hasMenu) return;
      if (!isMenuControlled) {
        setInternalMenuOpen(nextOpen);
      }
      onMenuOpenChange?.(nextOpen);
    },
    [hasMenu, isMenuControlled, onMenuOpenChange]
  );
  const buildFabSvg = (0, import_react4.useCallback)(() => {
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
  const renderSvgToCanvas = (0, import_react4.useCallback)(() => {
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
  (0, import_react4.useEffect)(() => {
    renderSvgToCanvas();
    window.addEventListener("resize", renderSvgToCanvas);
    return () => window.removeEventListener("resize", renderSvgToCanvas);
  }, [renderSvgToCanvas]);
  (0, import_react4.useEffect)(() => {
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
  const runPrimaryAction = (0, import_react4.useCallback)(() => {
    if (typeof onClick === "function") {
      onClick();
      return;
    }
    if (!route || typeof window === "undefined") return;
    window.location.href = route;
  }, [onClick, route]);
  const handleMainClick = (0, import_react4.useCallback)(() => {
    if (hasMenu) {
      setMenuOpen(!menuOpen);
      return;
    }
    runPrimaryAction();
  }, [hasMenu, menuOpen, runPrimaryAction, setMenuOpen]);
  const handleMenuItemClick = (0, import_react4.useCallback)(
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
  const menuPanelClassName = (0, import_react4.useMemo)(() => {
    const base = "min-w-[11rem] rounded-[var(--radius-xl)] border border-slate-200 bg-white p-2 shadow-xl";
    const extra = menuClassName.trim();
    return extra ? `${base} ${extra}` : base;
  }, [menuClassName]);
  const floatingActionButton = /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "div",
    {
      ref: rootRef,
      className: "fixed z-2000 flex flex-col items-end gap-2",
      style: {
        right: `${right}px`,
        bottom: `${resolvedBottom}px`
      },
      children: [
        menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { role: "menu", "aria-label": menuAriaLabel || ariaLabel, className: menuPanelClassName, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { className: "space-y-1", children: menuItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            role: "menuitem",
            "aria-label": item.ariaLabel || item.label,
            disabled: item.disabled,
            className: "flex w-full items-center gap-2 rounded-[var(--radius-xl)] px-3 py-2 text-left text-[16px] font-medium leading-5 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
            onClick: () => handleMenuItemClick(item),
            children: [
              item.icon ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "inline-flex h-5 w-5 shrink-0 items-center justify-center", children: item.icon }) : null,
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "truncate", children: item.label })
            ]
          }
        ) }, item.id)) }) }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("canvas", { ref: canvasRef, className: "block rounded-[var(--radius-xl)]" })
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
  CompactPagination_default,
  useTimelineCardEffects,
  FloatingActionButton_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYsIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuL1NwaW5uZXIudHN4XCI7XHJcblxyXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XHJcbiAgZmlyc3Q/OiBzdHJpbmc7XHJcbiAgcHJldj86IHN0cmluZztcclxuICBuZXh0Pzogc3RyaW5nO1xyXG4gIGxhc3Q/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENvbXBhY3RQYWdpbmF0aW9uUHJvcHMgPSB7XHJcbiAgdG90YWxQYWdlczogbnVtYmVyO1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcbiAgcGFnZVdpbmRvdz86IG51bWJlcjtcclxuICBvblBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgbGFiZWxzPzogUGFnaW5hdGlvbkxhYmVscztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgbG9hZGluZz86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBERUZBVUxUX1dJTkRPVyA9IDY7XHJcblxyXG50eXBlIFBhZ2luYXRpb25Mb2NrV2luZG93ID0gV2luZG93ICYge1xyXG4gIF9faW5kUGFnaW5hdGlvbkxvY2tDb3VudD86IG51bWJlcjtcclxuICBfX2luZFBhZ2luYXRpb25QcmV2T3ZlcmZsb3c/OiBzdHJpbmc7XHJcbiAgX19pbmRQYWdpbmF0aW9uUHJldlRvdWNoQWN0aW9uPzogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gQ29tcGFjdCBwYWdpbmF0aW9uIHdpdGggNi1wYWdlIHdpbmRvdyBhbmQgZWRnZSBjb250cm9scy5cclxuY29uc3QgQ29tcGFjdFBhZ2luYXRpb24gPSBmb3J3YXJkUmVmPEhUTUxEaXZFbGVtZW50LCBDb21wYWN0UGFnaW5hdGlvblByb3BzPihcclxuICAoeyB0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSwgcGFnZVdpbmRvdyA9IERFRkFVTFRfV0lORE9XLCBvblBhZ2VDaGFuZ2UsIGxhYmVscywgY2xhc3NOYW1lLCBsb2FkaW5nIH0sIHJlZikgPT4ge1xyXG4gICAgY29uc3Qgc2FmZVRvdGFsID0gTWF0aC5tYXgoMCwgdG90YWxQYWdlcyB8fCAwKTtcclxuICAgIGNvbnN0IHNhZmVDdXJyZW50ID0gTWF0aC5taW4oTWF0aC5tYXgoMSwgY3VycmVudFBhZ2UgfHwgMSksIHNhZmVUb3RhbCB8fCAxKTtcclxuICAgIGNvbnN0IHdpbmRvd1NpemUgPSBNYXRoLm1heCgxLCBwYWdlV2luZG93IHx8IERFRkFVTFRfV0lORE9XKTtcclxuICAgIGNvbnN0IGhhc0xvYWRpbmdTaWduYWwgPSB0eXBlb2YgbG9hZGluZyA9PT0gXCJib29sZWFuXCI7XHJcbiAgICBjb25zdCBpc0xvYWRpbmcgPSBsb2FkaW5nID09PSB0cnVlO1xyXG4gICAgY29uc3QgW2lzUGFnZVRyYW5zaXRpb25QZW5kaW5nLCBzZXRJc1BhZ2VUcmFuc2l0aW9uUGVuZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICBjb25zdCBzaG93UGFnZVNwaW5uZXIgPSBoYXNMb2FkaW5nU2lnbmFsICYmIGlzUGFnZVRyYW5zaXRpb25QZW5kaW5nO1xyXG5cclxuICAgIGNvbnN0IHNob3dQYWdpbmF0aW9uID0gc2FmZVRvdGFsID4gMTtcclxuICAgIGNvbnN0IHNob3dFZGdlTmF2ID0gc2FmZVRvdGFsID4gd2luZG93U2l6ZTtcclxuICAgIGNvbnN0IGNhbkp1bXBUb1N0YXJ0ID0gc2FmZUN1cnJlbnQgPiB3aW5kb3dTaXplO1xyXG4gICAgY29uc3QgY2FuR29QcmV2ID0gc2FmZUN1cnJlbnQgPiAxO1xyXG4gICAgY29uc3QgY2FuR29OZXh0ID0gc2FmZUN1cnJlbnQgPCBzYWZlVG90YWw7XHJcblxyXG4gICAgY29uc3QgcGFnZU51bWJlcnMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgICAgaWYgKCFzYWZlVG90YWwpIHJldHVybiBbXTtcclxuICAgICAgY29uc3Qgd2luZG93U3RhcnQgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKChzYWZlQ3VycmVudCAtIDEpIC8gd2luZG93U2l6ZSkgKiB3aW5kb3dTaXplICsgMSk7XHJcbiAgICAgIGNvbnN0IHdpbmRvd0VuZCA9IE1hdGgubWluKHNhZmVUb3RhbCwgd2luZG93U3RhcnQgKyB3aW5kb3dTaXplIC0gMSk7XHJcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB3aW5kb3dFbmQgLSB3aW5kb3dTdGFydCArIDEgfSwgKF92YWwsIGlkeCkgPT4gd2luZG93U3RhcnQgKyBpZHgpO1xyXG4gICAgfSwgW3NhZmVDdXJyZW50LCBzYWZlVG90YWwsIHdpbmRvd1NpemVdKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICBpZiAoIWhhc0xvYWRpbmdTaWduYWwgfHwgIWlzUGFnZVRyYW5zaXRpb25QZW5kaW5nKSByZXR1cm47XHJcbiAgICAgIGlmIChpc0xvYWRpbmcpIHJldHVybjtcclxuICAgICAgc2V0SXNQYWdlVHJhbnNpdGlvblBlbmRpbmcoZmFsc2UpO1xyXG4gICAgfSwgW2hhc0xvYWRpbmdTaWduYWwsIGlzTG9hZGluZywgaXNQYWdlVHJhbnNpdGlvblBlbmRpbmddKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICBpZiAoIXNob3dQYWdlU3Bpbm5lcikgcmV0dXJuO1xyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGxvY2tXaW5kb3cgPSB3aW5kb3cgYXMgUGFnaW5hdGlvbkxvY2tXaW5kb3c7XHJcbiAgICAgIGNvbnN0IGxvY2tDb3VudCA9IE51bWJlcihsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvbkxvY2tDb3VudCB8fCAwKTtcclxuICAgICAgaWYgKGxvY2tDb3VudCA8IDEpIHtcclxuICAgICAgICBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZPdmVyZmxvdyA9IGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c7XHJcbiAgICAgICAgbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25QcmV2VG91Y2hBY3Rpb24gPSBkb2N1bWVudC5ib2R5LnN0eWxlLnRvdWNoQWN0aW9uO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudG91Y2hBY3Rpb24gPSBcIm5vbmVcIjtcclxuICAgICAgfVxyXG4gICAgICBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvbkxvY2tDb3VudCA9IGxvY2tDb3VudCArIDE7XHJcblxyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb3VudCA9IE51bWJlcihsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvbkxvY2tDb3VudCB8fCAwKTtcclxuICAgICAgICBjb25zdCBuZXh0Q291bnQgPSBNYXRoLm1heCgwLCBjdXJyZW50Q291bnQgLSAxKTtcclxuICAgICAgICBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvbkxvY2tDb3VudCA9IG5leHRDb3VudDtcclxuICAgICAgICBpZiAobmV4dENvdW50IDwgMSkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uUHJldk92ZXJmbG93IHx8IFwiXCI7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvdWNoQWN0aW9uID0gbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25QcmV2VG91Y2hBY3Rpb24gfHwgXCJcIjtcclxuICAgICAgICAgIGRlbGV0ZSBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZPdmVyZmxvdztcclxuICAgICAgICAgIGRlbGV0ZSBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZUb3VjaEFjdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9LCBbc2hvd1BhZ2VTcGlubmVyXSk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdFBhZ2VDaGFuZ2UgPSAocGFnZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGlmIChwYWdlIDwgMSB8fCBwYWdlID4gc2FmZVRvdGFsKSByZXR1cm47XHJcbiAgICAgIGlmIChwYWdlID09PSBzYWZlQ3VycmVudCkgcmV0dXJuO1xyXG4gICAgICBpZiAoaGFzTG9hZGluZ1NpZ25hbCkge1xyXG4gICAgICAgIHNldElzUGFnZVRyYW5zaXRpb25QZW5kaW5nKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICAgIG9uUGFnZUNoYW5nZShwYWdlKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFzaG93UGFnaW5hdGlvbikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPD5cclxuICAgICAgICB7c2hvd1BhZ2VTcGlubmVyID8gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTEwMFwiXHJcbiAgICAgICAgICAgIG9uV2hlZWw9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC0xMCB3LTEwXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGlkPVwicGFnaW5hdGlvblwiXHJcbiAgICAgICAgICByZWY9e3JlZn1cclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgXCJwYWdpbmF0aW9uIGdyaWQgZ3JpZC1jb2xzLVsxZnJfYXV0b18xZnJdIGl0ZW1zLWNlbnRlciBnYXAtMVwiLFxyXG4gICAgICAgICAgICBjbGFzc05hbWUgfHwgXCJcIlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktc3RhcnRcIj5cclxuICAgICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkp1bXBUb1N0YXJ0ICYmIChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8uZmlyc3R9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0UGFnZUNoYW5nZSgxKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTguNzUgNC41LTcuNSA3LjUgNy41IDcuNW0tNi0xNUw1LjI1IDEybDcuNSA3LjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5Hb1ByZXYgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5wcmV2fVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgLSAxKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTUuNzUgMTkuNSA4LjI1IDEybDcuNS03LjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIG1pbi13LTAgZmxleC1ub3dyYXBcIj5cclxuICAgICAgICAgICAge3BhZ2VOdW1iZXJzLm1hcCgocGFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gcGFnZSA9PT0gc2FmZUN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAga2V5PXtgcGFnZS0ke3BhZ2V9YH1cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICBcIm1pbi13LVsyNnB4XSBweC0yIHB5LTAuNSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgdGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICAgID8gXCJiZy1wcmltYXJ5IGJvcmRlci1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LXNtXCJcclxuICAgICAgICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMzAwIHRleHQtc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1wcmltYXJ5IGhvdmVyOnRleHQtcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZyA/IFwib3BhY2l0eS02MCBjdXJzb3Itbm90LWFsbG93ZWRcIiA6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2UocGFnZSk7XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtwYWdlfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktZW5kXCI+XHJcbiAgICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5Hb05leHQgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5uZXh0fVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgKyAxKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtOC4yNSA0LjUgNy41IDcuNS03LjUgNy41XCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuR29OZXh0ICYmIChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ubGFzdH1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RQYWdlQ2hhbmdlKHNhZmVUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTUuMjUgNC41IDcuNSA3LjUtNy41IDcuNW02LTE1IDcuNSA3LjUtNy41IDcuNVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8Lz5cclxuICAgICk7XHJcbiAgfVxyXG4pO1xyXG5cclxuQ29tcGFjdFBhZ2luYXRpb24uZGlzcGxheU5hbWUgPSBcIkNvbXBhY3RQYWdpbmF0aW9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21wYWN0UGFnaW5hdGlvbjtcclxuIiwgIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgVE9PTFRJUF9UT1VDSF9ERUxBWV9NUyA9IDEyMDtcclxuY29uc3QgVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPID0gMC44O1xyXG5jb25zdCBUT09MVElQX0JBU0VfRk9OVCA9IDEzO1xyXG5jb25zdCBUT09MVElQX01JTl9GT05UID0gMTE7XHJcbmNvbnN0IEVMTElQU0lTID0gXCIuLi5cIjtcclxuY29uc3QgUElYRUxfR0FQID0gNTtcclxuY29uc3QgUElYRUxfU1BFRUQgPSA5NTtcclxuY29uc3QgUElYRUxfQ09MT1JTID0gW1wicmdiYSgwLCA0MSwgMTA3LCAwLjA4KVwiLCBcInJnYmEoMCwgNDEsIDEwNywgMC4xNilcIiwgXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMjYpXCJdO1xyXG5cclxudHlwZSBQaXhlbFN0YXRlID0ge1xyXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgcGl4ZWxzOiBQaXhlbFtdO1xyXG4gIGFuaW1JZDogbnVtYmVyIHwgbnVsbDtcclxuICBsYXN0VGltZTogbnVtYmVyO1xyXG4gIHJlZHVjZWRNb3Rpb246IGJvb2xlYW47XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFVzZVRpbWVsaW5lQ2FyZEVmZmVjdHNBcmdzID0ge1xyXG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgaXRlbXM6IHVua25vd25bXTtcclxuICByZXNvbHZlQ2xpY2thYmxlQ2FyZDogKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbn07XHJcblxyXG4vLyBDb21wdXRlIHBpeGVsIHNwZWVkIHdoaWxlIHJlc3BlY3RpbmcgcmVkdWNlZCBtb3Rpb24gcHJlZmVyZW5jZS5cclxuY29uc3QgZ2V0RWZmZWN0aXZlU3BlZWQgPSAodmFsdWU6IG51bWJlciwgcmVkdWNlZE1vdGlvbjogYm9vbGVhbikgPT4ge1xyXG4gIGNvbnN0IG1pbiA9IDA7XHJcbiAgY29uc3QgbWF4ID0gMTAwO1xyXG4gIGNvbnN0IHRocm90dGxlID0gMC4wMDE7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyLnBhcnNlSW50KFN0cmluZyh2YWx1ZSksIDEwKTtcclxuXHJcbiAgaWYgKHBhcnNlZCA8PSBtaW4gfHwgcmVkdWNlZE1vdGlvbikgcmV0dXJuIG1pbjtcclxuICBpZiAocGFyc2VkID49IG1heCkgcmV0dXJuIG1heCAqIHRocm90dGxlO1xyXG4gIHJldHVybiBwYXJzZWQgKiB0aHJvdHRsZTtcclxufTtcclxuXHJcbi8vIFBpeGVsIHVzZWQgYnkgdGhlIGhvdmVyIGFuaW1hdGlvbiBjYW52YXMuXHJcbmNsYXNzIFBpeGVsIHtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgY29sb3I6IHN0cmluZztcclxuICBzcGVlZDogbnVtYmVyO1xyXG4gIHNpemU6IG51bWJlcjtcclxuICBzaXplU3RlcDogbnVtYmVyO1xyXG4gIG1pblNpemU6IG51bWJlcjtcclxuICBtYXhTaXplSW50ZWdlcjogbnVtYmVyO1xyXG4gIG1heFNpemU6IG51bWJlcjtcclxuICBwaGFzZTogbnVtYmVyO1xyXG4gIHBoYXNlU3RlcDogbnVtYmVyO1xyXG4gIGRlbGF5OiBudW1iZXI7XHJcbiAgY291bnRlcjogbnVtYmVyO1xyXG4gIGNvdW50ZXJTdGVwOiBudW1iZXI7XHJcbiAgaXNJZGxlOiBib29sZWFuO1xyXG4gIGlzUmV2ZXJzZTogYm9vbGVhbjtcclxuICBpc1NoaW1tZXI6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcsIHNwZWVkOiBudW1iZXIsIGRlbGF5OiBudW1iZXIpIHtcclxuICAgIHRoaXMud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICB0aGlzLmN0eCA9IGNvbnRleHQ7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIHRoaXMuc3BlZWQgPSB0aGlzLmdldFJhbmRvbVZhbHVlKDAuMSwgMC45KSAqIHNwZWVkO1xyXG4gICAgdGhpcy5zaXplID0gMDtcclxuICAgIHRoaXMuc2l6ZVN0ZXAgPSBNYXRoLnJhbmRvbSgpICogMC4zICsgMC4xO1xyXG4gICAgdGhpcy5taW5TaXplID0gMC41O1xyXG4gICAgdGhpcy5tYXhTaXplSW50ZWdlciA9IDI7XHJcbiAgICB0aGlzLm1heFNpemUgPSB0aGlzLmdldFJhbmRvbVZhbHVlKHRoaXMubWluU2l6ZSwgdGhpcy5tYXhTaXplSW50ZWdlcik7XHJcbiAgICB0aGlzLmRlbGF5ID0gZGVsYXk7XHJcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5jb3VudGVyU3RlcCA9IE1hdGgucmFuZG9tKCkgKiA1ICsgKHRoaXMud2lkdGggKyB0aGlzLmhlaWdodCkgKiAwLjAxNTtcclxuICAgIHRoaXMuaXNJZGxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzUmV2ZXJzZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1NoaW1tZXIgPSBmYWxzZTtcclxuICAgIHRoaXMucGhhc2UgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XHJcbiAgICB0aGlzLnBoYXNlU3RlcCA9IE1hdGgubWF4KDAsIHRoaXMuc3BlZWQgKiAoMC44ICsgTWF0aC5yYW5kb20oKSAqIDAuNikpO1xyXG4gIH1cclxuXHJcbiAgLy8gUmV0dXJuIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gbWluIGFuZCBtYXguXHJcbiAgZ2V0UmFuZG9tVmFsdWUobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xyXG4gIH1cclxuXHJcbiAgLy8gRHJhdyB0aGUgcGl4ZWwgYXQgaXRzIGN1cnJlbnQgc2l6ZS5cclxuICBkcmF3KCkge1xyXG4gICAgY29uc3QgY2VudGVyT2Zmc2V0ID0gdGhpcy5tYXhTaXplSW50ZWdlciAqIDAuNSAtIHRoaXMuc2l6ZSAqIDAuNTtcclxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLnggKyBjZW50ZXJPZmZzZXQsIHRoaXMueSArIGNlbnRlck9mZnNldCwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xyXG4gIH1cclxuXHJcbiAgLy8gQW5pbWF0ZSB0aGUgcGl4ZWwgYXBwZWFyaW5nLlxyXG4gIGFwcGVhcigpIHtcclxuICAgIHRoaXMuaXNJZGxlID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5jb3VudGVyIDw9IHRoaXMuZGVsYXkpIHtcclxuICAgICAgdGhpcy5jb3VudGVyICs9IHRoaXMuY291bnRlclN0ZXA7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNpemUgPj0gdGhpcy5tYXhTaXplKSB7XHJcbiAgICAgIHRoaXMuaXNTaGltbWVyID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzU2hpbW1lcikge1xyXG4gICAgICB0aGlzLnNoaW1tZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2l6ZSArPSB0aGlzLnNpemVTdGVwO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kcmF3KCk7XHJcbiAgfVxyXG5cclxuICAvLyBBbmltYXRlIHRoZSBwaXhlbCBkaXNhcHBlYXJpbmcuXHJcbiAgZGlzYXBwZWFyKCkge1xyXG4gICAgdGhpcy5pc1NoaW1tZXIgPSBmYWxzZTtcclxuICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICBpZiAodGhpcy5zaXplIDw9IDApIHtcclxuICAgICAgdGhpcy5pc0lkbGUgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnNpemUgLT0gMC4xO1xyXG4gICAgdGhpcy5kcmF3KCk7XHJcbiAgfVxyXG5cclxuICAvLyBPc2NpbGxhdGUgcGl4ZWwgc2l6ZSB3aGlsZSB2aXNpYmxlLlxyXG4gIHNoaW1tZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMucGhhc2VTdGVwKSByZXR1cm47XHJcbiAgICB0aGlzLnBoYXNlICs9IHRoaXMucGhhc2VTdGVwO1xyXG4gICAgY29uc3QgYW1wID0gKHRoaXMubWF4U2l6ZSAtIHRoaXMubWluU2l6ZSkgKiAwLjU7XHJcbiAgICB0aGlzLnNpemUgPSB0aGlzLm1pblNpemUgKyBhbXAgKyBhbXAgKiBNYXRoLnNpbih0aGlzLnBoYXNlKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIENyZWF0ZSB0aGUgcGl4ZWwgY2FudmFzIGhvdmVyIGVmZmVjdCBmb3IgYSB0aW1lbGluZSBjYXJkLlxyXG5jb25zdCBjcmVhdGVQaXhlbEVmZmVjdCA9IChjYXJkRWw6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgaWYgKCFjYXJkRWwpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgY2FudmFzLmNsYXNzTmFtZSA9IFwidGltZWxpbmUtcGl4ZWwtY2FudmFzXCI7XHJcbiAgY2FyZEVsLmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblxyXG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgaWYgKCFjdHgpIHtcclxuICAgIGNhbnZhcy5yZW1vdmUoKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVkdWNlZE1vdGlvbiA9IHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIikubWF0Y2hlcztcclxuICBjb25zdCBzdGF0ZTogUGl4ZWxTdGF0ZSA9IHtcclxuICAgIGNhbnZhcyxcclxuICAgIGN0eCxcclxuICAgIHBpeGVsczogW10sXHJcbiAgICBhbmltSWQ6IG51bGwsXHJcbiAgICBsYXN0VGltZTogcGVyZm9ybWFuY2Uubm93KCksXHJcbiAgICByZWR1Y2VkTW90aW9uLFxyXG4gICAgd2lkdGg6IDAsXHJcbiAgICBoZWlnaHQ6IDAsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5pdFBpeGVscyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlY3QgPSBjYXJkRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVjdC53aWR0aCkpO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihyZWN0LmhlaWdodCkpO1xyXG4gICAgaWYgKCF3aWR0aCB8fCAhaGVpZ2h0KSByZXR1cm47XHJcblxyXG4gICAgc3RhdGUud2lkdGggPSB3aWR0aDtcclxuICAgIHN0YXRlLmhlaWdodCA9IGhlaWdodDtcclxuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcclxuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xyXG5cclxuICAgIGNvbnN0IGdhcCA9IE1hdGgubWF4KDMsIE1hdGguZmxvb3IoUElYRUxfR0FQKSk7XHJcbiAgICBjb25zdCBzcGVlZCA9IGdldEVmZmVjdGl2ZVNwZWVkKFBJWEVMX1NQRUVELCByZWR1Y2VkTW90aW9uKTtcclxuICAgIGNvbnN0IHBpeGVsczogUGl4ZWxbXSA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHggKz0gZ2FwKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5ICs9IGdhcCkge1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gUElYRUxfQ09MT1JTW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIFBJWEVMX0NPTE9SUy5sZW5ndGgpXTtcclxuICAgICAgICBjb25zdCBkeCA9IHggLSB3aWR0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgZHkgPSB5IC0gaGVpZ2h0IC8gMjtcclxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcbiAgICAgICAgY29uc3QgZGVsYXkgPSByZWR1Y2VkTW90aW9uID8gMCA6IGRpc3RhbmNlICogMC4zNTtcclxuICAgICAgICBwaXhlbHMucHVzaChuZXcgUGl4ZWwoY2FudmFzLCBjdHgsIHgsIHksIGNvbG9yLCBzcGVlZCwgZGVsYXkpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRlLnBpeGVscyA9IHBpeGVscztcclxuICB9O1xyXG5cclxuICBjb25zdCBkb0FuaW1hdGUgPSAoZm5OYW1lOiBcImFwcGVhclwiIHwgXCJkaXNhcHBlYXJcIikgPT4ge1xyXG4gICAgc3RhdGUuYW5pbUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGRvQW5pbWF0ZShmbk5hbWUpKTtcclxuICAgIGNvbnN0IHRpbWVOb3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgIGNvbnN0IHRpbWVQYXNzZWQgPSB0aW1lTm93IC0gc3RhdGUubGFzdFRpbWU7XHJcbiAgICBjb25zdCB0aW1lSW50ZXJ2YWwgPSAxMDAwIC8gNjA7XHJcblxyXG4gICAgaWYgKHRpbWVQYXNzZWQgPCB0aW1lSW50ZXJ2YWwpIHJldHVybjtcclxuICAgIHN0YXRlLmxhc3RUaW1lID0gdGltZU5vdyAtICh0aW1lUGFzc2VkICUgdGltZUludGVydmFsKTtcclxuXHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHN0YXRlLndpZHRoLCBzdGF0ZS5oZWlnaHQpO1xyXG5cclxuICAgIGxldCBhbGxJZGxlID0gdHJ1ZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhdGUucGl4ZWxzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IHBpeGVsID0gc3RhdGUucGl4ZWxzW2ldO1xyXG4gICAgICBwaXhlbFtmbk5hbWVdKCk7XHJcbiAgICAgIGlmICghcGl4ZWwuaXNJZGxlKSBhbGxJZGxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoYWxsSWRsZSAmJiBzdGF0ZS5hbmltSWQpIHtcclxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhdGUuYW5pbUlkKTtcclxuICAgICAgc3RhdGUuYW5pbUlkID0gbnVsbDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVBbmltYXRpb24gPSAobmFtZTogXCJhcHBlYXJcIiB8IFwiZGlzYXBwZWFyXCIpID0+IHtcclxuICAgIGlmICghc3RhdGUucGl4ZWxzLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgaWYgKHN0YXRlLmFuaW1JZCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhdGUuYW5pbUlkKTtcclxuICAgIHN0YXRlLmxhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICBzdGF0ZS5hbmltSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gZG9BbmltYXRlKG5hbWUpKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBvbkVudGVyID0gKCkgPT4gaGFuZGxlQW5pbWF0aW9uKFwiYXBwZWFyXCIpO1xyXG4gIGNvbnN0IG9uTGVhdmUgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJkaXNhcHBlYXJcIik7XHJcblxyXG4gIGNhcmRFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbkVudGVyKTtcclxuICBjYXJkRWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25MZWF2ZSk7XHJcblxyXG4gIGxldCBybzogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcclxuICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBybyA9IG5ldyBSZXNpemVPYnNlcnZlcihpbml0UGl4ZWxzKTtcclxuICAgIHJvLm9ic2VydmUoY2FyZEVsKTtcclxuICB9XHJcblxyXG4gIGluaXRQaXhlbHMoKTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGNhcmRFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbkVudGVyKTtcclxuICAgIGNhcmRFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbkxlYXZlKTtcclxuICAgIGlmIChzdGF0ZS5hbmltSWQpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHN0YXRlLmFuaW1JZCk7XHJcbiAgICBpZiAocm8pIHJvLmRpc2Nvbm5lY3QoKTtcclxuICAgIGNhbnZhcy5yZW1vdmUoKTtcclxuICB9O1xyXG59O1xyXG5cclxuLy8gU2hvcnRlbiBvdmVyZmxvd2luZyB0ZXh0IHdpdGggYSBjb21wdXRlZCBlbGxpcHNpcy5cclxuY29uc3QgYXBwbHlFbGxpcHNpcyA9IChlbDogSFRNTEVsZW1lbnQsIGZ1bGxUZXh0OiBzdHJpbmcsIG11bHRpTGluZTogYm9vbGVhbikgPT4ge1xyXG4gIGlmICghZWwgfHwgIWZ1bGxUZXh0KSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKG11bHRpTGluZSAmJiBlbC5jbGllbnRIZWlnaHQgPT09IDApIHJldHVybiBmYWxzZTtcclxuICBpZiAoIW11bHRpTGluZSAmJiBlbC5jbGllbnRXaWR0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAobXVsdGlMaW5lKSB7XHJcbiAgICBjb25zdCBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcclxuICAgIGxldCBsaW5lSGVpZ2h0ID0gTnVtYmVyLnBhcnNlRmxvYXQoY29tcHV0ZWQubGluZUhlaWdodCk7XHJcbiAgICAvLyBTb21lIGJyb3dzZXJzIHJldHVybiB1bml0bGVzcyBsaW5lLWhlaWdodCB2YWx1ZXMgZm9yIGNvbXB1dGVkIHN0eWxlcy5cclxuICAgIC8vIENvbnZlcnQgdGlueSB1bml0bGVzcyB2YWx1ZXMgdXNpbmcgZm9udC1zaXplIHRvIGF2b2lkIGNvbGxhcHNpbmcgdGV4dC5cclxuICAgIGlmIChOdW1iZXIuaXNGaW5pdGUobGluZUhlaWdodCkgJiYgbGluZUhlaWdodCA+IDAgJiYgbGluZUhlaWdodCA8IDgpIHtcclxuICAgICAgY29uc3QgZm9udFNpemUgPSBOdW1iZXIucGFyc2VGbG9hdChjb21wdXRlZC5mb250U2l6ZSk7XHJcbiAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoZm9udFNpemUpICYmIGZvbnRTaXplID4gMCkge1xyXG4gICAgICAgIGxpbmVIZWlnaHQgPSBsaW5lSGVpZ2h0ICogZm9udFNpemU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKGxpbmVIZWlnaHQpKSB7XHJcbiAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgbGluZUhlaWdodCA9IHJlY3QuaGVpZ2h0ID4gMCA/IHJlY3QuaGVpZ2h0IC8gMiA6IDA7XHJcbiAgICB9XHJcbiAgICBpZiAobGluZUhlaWdodCA+IDApIHtcclxuICAgICAgZWwuc3R5bGUubWF4SGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChsaW5lSGVpZ2h0ICogMil9cHhgO1xyXG4gICAgICBlbC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbC50ZXh0Q29udGVudCA9IGZ1bGxUZXh0O1xyXG5cclxuICBjb25zdCBpc092ZXJmbG93aW5nID0gKCkgPT4gKFxyXG4gICAgbXVsdGlMaW5lXHJcbiAgICAgID8gZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICsgMVxyXG4gICAgICA6IGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggKyAxXHJcbiAgKTtcclxuXHJcbiAgaWYgKCFpc092ZXJmbG93aW5nKCkpIHtcclxuICAgIGVsLmRhdGFzZXQucHJldmlldyA9IFwiMFwiO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbGV0IGxvdyA9IDA7XHJcbiAgbGV0IGhpZ2ggPSBmdWxsVGV4dC5sZW5ndGg7XHJcbiAgbGV0IGJlc3QgPSAwO1xyXG5cclxuICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcclxuICAgIGNvbnN0IG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XHJcbiAgICBjb25zdCBjYW5kaWRhdGUgPSBgJHtmdWxsVGV4dC5zbGljZSgwLCBNYXRoLm1heCgwLCBtaWQpKS50cmltRW5kKCl9JHtFTExJUFNJU31gO1xyXG4gICAgZWwudGV4dENvbnRlbnQgPSBjYW5kaWRhdGU7XHJcbiAgICBpZiAoaXNPdmVyZmxvd2luZygpKSB7XHJcbiAgICAgIGhpZ2ggPSBtaWQgLSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmVzdCA9IG1pZDtcclxuICAgICAgbG93ID0gbWlkICsgMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVsLnRleHRDb250ZW50ID0gYCR7ZnVsbFRleHQuc2xpY2UoMCwgTWF0aC5tYXgoMCwgYmVzdCkpLnRyaW1FbmQoKX0ke0VMTElQU0lTfWA7XHJcbiAgZWwuZGF0YXNldC5wcmV2aWV3ID0gXCIxXCI7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vLyBPd25zIHRvb2x0aXAsIGVsbGlwc2lzLCBhbmQgcGl4ZWwgZWZmZWN0cyBmb3IgdGltZWxpbmUgY2FyZHMuXHJcbmV4cG9ydCBjb25zdCB1c2VUaW1lbGluZUNhcmRFZmZlY3RzID0gKHtcclxuICBjb250YWluZXJSZWYsXHJcbiAgZXJyb3JNZXNzYWdlLFxyXG4gIGl0ZW1zLFxyXG4gIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG59OiBVc2VUaW1lbGluZUNhcmRFZmZlY3RzQXJncykgPT4ge1xyXG4gIGNvbnN0IHRvb2x0aXBSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB0b29sdGlwQW5jaG9yUmVmID0gdXNlUmVmPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgdG9vbHRpcENsb3NlQm91bmRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICAvLyBFbnN1cmUgdGhlIHNoYXJlZCB0b29sdGlwIGVsZW1lbnQgZXhpc3RzIG9uY2UuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0b29sdGlwUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIGxldCB0b29sdGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lbGluZVRvb2x0aXBcIikgYXMgSFRNTERpdkVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCF0b29sdGlwKSB7XHJcbiAgICAgIHRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB0b29sdGlwLmlkID0gXCJ0aW1lbGluZVRvb2x0aXBcIjtcclxuICAgICAgdG9vbHRpcC5jbGFzc05hbWUgPSBcInRpbWVsaW5lLXRvb2x0aXBcIjtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwKTtcclxuICAgIH1cclxuICAgIHRvb2x0aXBSZWYuY3VycmVudCA9IHRvb2x0aXA7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyUmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCB0b29sdGlwRWwgPSB0b29sdGlwUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWNvbnRhaW5lciB8fCAhdG9vbHRpcEVsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY2xlYW51cHM6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XHJcblxyXG4gICAgLy8gQ2xvc2UgdG9vbHRpcCBvbiBvdXRzaWRlIGludGVyYWN0aW9uLlxyXG4gICAgaWYgKCF0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHRvb2x0aXBDbG9zZUJvdW5kUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICBjb25zdCBvblBvaW50ZXJEb3duID0gKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoIXRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgYW5jaG9yID0gdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50O1xyXG4gICAgICAgIGlmIChhbmNob3IgJiYgYW5jaG9yLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSkgcmV0dXJuO1xyXG4gICAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBvbktleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uUG9pbnRlckRvd24sIHRydWUpO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gICAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93biwgdHJ1ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcclxuICAgICAgICB0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNob3cgdG9vbHRpcCBjb250ZW50IGNlbnRlcmVkIG9uIHNjcmVlbi5cclxuICAgIGNvbnN0IHNob3dUb29sdGlwID0gKHRleHQ6IHN0cmluZywgYW5jaG9yPzogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgdG9vbHRpcEVsLnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBhbmNob3IgfHwgbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IGNlbnRlclggPSBNYXRoLnJvdW5kKHdpbmRvdy5pbm5lcldpZHRoIC8gMik7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5sZWZ0ID0gYCR7Y2VudGVyWH1weGA7XHJcblxyXG4gICAgICBjb25zdCBtYXJnaW4gPSAxMjtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLm1heEhlaWdodCA9IGAke01hdGgucm91bmQod2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPKX1weGA7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5vdmVyZmxvd1kgPSBcImF1dG9cIjtcclxuXHJcbiAgICAgIGxldCBmb250U2l6ZSA9IFRPT0xUSVBfQkFTRV9GT05UO1xyXG4gICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XHJcblxyXG4gICAgICBsZXQgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPO1xyXG4gICAgICB3aGlsZSAocmVjdC5oZWlnaHQgPiBtYXhIZWlnaHQgJiYgZm9udFNpemUgPiBUT09MVElQX01JTl9GT05UKSB7XHJcbiAgICAgICAgZm9udFNpemUgLT0gMTtcclxuICAgICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XHJcbiAgICAgICAgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY2VudGVyWSA9IE1hdGgucm91bmQoKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0KSAvIDIpO1xyXG4gICAgICBsZXQgdG9wID0gTnVtYmVyLmlzRmluaXRlKGNlbnRlclkpID8gY2VudGVyWSA6IG1hcmdpbjtcclxuICAgICAgY29uc3QgbWluVG9wID0gbWFyZ2luO1xyXG4gICAgICBjb25zdCBtYXhUb3AgPSBNYXRoLm1heChtYXJnaW4sIHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0IC0gbWFyZ2luKTtcclxuICAgICAgaWYgKHRvcCA8IG1pblRvcCkgdG9wID0gbWluVG9wO1xyXG4gICAgICBpZiAodG9wID4gbWF4VG9wKSB0b3AgPSBtYXhUb3A7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBIaWRlIHRvb2x0aXAgY29udGVudC5cclxuICAgIGNvbnN0IGhpZGVUb29sdGlwID0gKCkgPT4ge1xyXG4gICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERlY2lkZSBpZiBhIHRvb2x0aXAgc2hvdWxkIGRpc3BsYXkuXHJcbiAgICBjb25zdCBzaG91bGRQcmV2aWV3ID0gKGVsOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICBpZiAoIWVsLmRhdGFzZXQgfHwgIWVsLmRhdGFzZXQuZnVsbHRleHQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGVsLmRhdGFzZXQucHJldmlldyA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xyXG4gICAgICByZXR1cm4gZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCArIDEgfHwgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICsgMTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVzb2x2ZVRvb2x0aXBUYXJnZXQgPSAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcclxuICAgICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgICBjb25zdCB0ZXh0RWwgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLW5hbWUsIC50aW1lbGluZS1kZXNjLXRleHRcIik7XHJcbiAgICAgIGlmICghdGV4dEVsIHx8ICFjb250YWluZXIuY29udGFpbnModGV4dEVsKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHJldHVybiB0ZXh0RWw7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNob3dUb29sdGlwRm9yRWxlbWVudCA9IChlbDogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XHJcbiAgICAgIGlmICghZWwpIHJldHVybjtcclxuICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQuZnVsbHRleHQgfHwgZWwudGV4dENvbnRlbnQgfHwgXCJcIjtcclxuICAgICAgaWYgKCF0ZXh0IHx8ICFzaG91bGRQcmV2aWV3KGVsKSkgcmV0dXJuO1xyXG4gICAgICBzaG93VG9vbHRpcCh0ZXh0LCBlbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBhY3RpdmVUb29sdGlwRWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgICBsZXQgcHJlc3NUaW1lcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3QgY2xlYXJQcmVzc1RpbWVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAocHJlc3NUaW1lciA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XHJcbiAgICAgIHByZXNzVGltZXIgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlT3ZlciA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0ZXh0RWwgPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC50YXJnZXQpO1xyXG4gICAgICBpZiAoIXRleHRFbCkgcmV0dXJuO1xyXG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSB0ZXh0RWw7XHJcbiAgICAgIHNob3dUb29sdGlwRm9yRWxlbWVudCh0ZXh0RWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlT3V0ID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZyb20gPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC50YXJnZXQpO1xyXG4gICAgICBpZiAoIWZyb20pIHJldHVybjtcclxuICAgICAgY29uc3QgdG8gPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC5yZWxhdGVkVGFyZ2V0KTtcclxuICAgICAgaWYgKHRvICYmIHRvID09PSBmcm9tKSByZXR1cm47XHJcbiAgICAgIGhpZGVUb29sdGlwKCk7XHJcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIWFjdGl2ZVRvb2x0aXBFbCkgcmV0dXJuO1xyXG4gICAgICBpZiAoIXRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSByZXR1cm47XHJcbiAgICAgIHNob3dUb29sdGlwRm9yRWxlbWVudChhY3RpdmVUb29sdGlwRWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblRvdWNoU3RhcnQgPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgdGV4dEVsID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgaWYgKCF0ZXh0RWwpIHJldHVybjtcclxuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gdGV4dEVsO1xyXG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcclxuICAgICAgcHJlc3NUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzaG93VG9vbHRpcEZvckVsZW1lbnQodGV4dEVsKTtcclxuICAgICAgfSwgVE9PTFRJUF9UT1VDSF9ERUxBWV9NUyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uVG91Y2hNb3ZlID0gKCkgPT4ge1xyXG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcclxuICAgICAgaGlkZVRvb2x0aXAoKTtcclxuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25Ub3VjaEVuZCA9ICgpID0+IHtcclxuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG9uTW91c2VPdmVyKTtcclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgb25Nb3VzZU91dCk7XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Ub3VjaFN0YXJ0LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBvblRvdWNoRW5kLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcblxyXG4gICAgY29uc3Qgb25TZWxlY3RTdGFydCA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgaWYgKCFyZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9O1xyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzZWxlY3RzdGFydFwiLCBvblNlbGVjdFN0YXJ0KTtcclxuXHJcbiAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgb25Nb3VzZU92ZXIpO1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIG9uTW91c2VPdXQpO1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvblRvdWNoU3RhcnQpO1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZSk7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgb25Ub3VjaEVuZCk7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2VsZWN0c3RhcnRcIiwgb25TZWxlY3RTdGFydCk7XHJcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFlcnJvck1lc3NhZ2UpIHtcclxuICAgICAgY29uc3QgY2FyZHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZFwiKTtcclxuICAgICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xyXG4gICAgICAgIGlmICghY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0aW1lbGluZS1jYXJkLS1ub2RhdGFcIikpIHtcclxuICAgICAgICAgIGNvbnN0IGNsZWFudXBQaXhlbCA9IGNyZWF0ZVBpeGVsRWZmZWN0KGNhcmQpO1xyXG4gICAgICAgICAgaWYgKGNsZWFudXBQaXhlbCkgY2xlYW51cHMucHVzaChjbGVhbnVwUGl4ZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBmcmFtZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGV4dEVscyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1uYW1lLCAudGltZWxpbmUtZGVzYy10ZXh0XCIpO1xyXG4gICAgICAgIHRleHRFbHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRleHQgPSBlbC5kYXRhc2V0LmZ1bGx0ZXh0IHx8IGVsLnRleHRDb250ZW50IHx8IFwiXCI7XHJcbiAgICAgICAgICBjb25zdCBpc011bHRpTGluZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWVsaW5lLWRlc2MtdGV4dFwiKTtcclxuICAgICAgICAgIGNvbnN0IHRyaW1tZWRUZXh0ID0gU3RyaW5nKHRleHQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICAgICAgY29uc3QgZGlkRWxsaXBzaXMgPSBhcHBseUVsbGlwc2lzKGVsLCB0cmltbWVkVGV4dCwgaXNNdWx0aUxpbmUpO1xyXG4gICAgICAgICAgaWYgKGRpZEVsbGlwc2lzICYmIGVsLnRleHRDb250ZW50ID09PSBFTExJUFNJUyAmJiB0cmltbWVkVGV4dC5sZW5ndGggPiAzICYmIGVsLmNsaWVudFdpZHRoID4gNjQpIHtcclxuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0cmltbWVkVGV4dDtcclxuICAgICAgICAgICAgZWwuZGF0YXNldC5wcmV2aWV3ID0gXCIxXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2xlYW51cHMucHVzaCgoKSA9PiB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoZnJhbWVJZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFudXBzLmZvckVhY2goKGNsZWFudXApID0+IGNsZWFudXAoKSk7XHJcbiAgICB9O1xyXG4gIH0sIFtjb250YWluZXJSZWYsIGVycm9yTWVzc2FnZSwgaXRlbXMsIHJlc29sdmVDbGlja2FibGVDYXJkXSk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IHVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eSB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkudHNcIjtcclxuXHJcbmV4cG9ydCB0eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW0gPSB7XHJcbiAgaWQ6IHN0cmluZztcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIGljb24/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgcm91dGU/OiBzdHJpbmc7XHJcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XHJcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xyXG4gIGFyaWFMYWJlbD86IHN0cmluZztcclxufTtcclxuXHJcbmNvbnN0IEVNUFRZX01FTlVfSVRFTVM6IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXSA9IFtdO1xyXG5cclxudHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvblByb3BzID0ge1xyXG4gIHJvdXRlPzogc3RyaW5nO1xyXG4gIGFyaWFMYWJlbDogc3RyaW5nO1xyXG4gIHNpemU/OiBudW1iZXI7XHJcbiAgcmlnaHQ/OiBudW1iZXI7XHJcbiAgYm90dG9tPzogbnVtYmVyO1xyXG4gIGNvbG9yPzogc3RyaW5nO1xyXG4gIHNoYWRvd09wYWNpdHk/OiBudW1iZXI7XHJcbiAgcGx1c1RoaWNrbmVzcz86IG51bWJlcjtcclxuICBwbHVzTGVuZ3RoPzogbnVtYmVyO1xyXG4gIG9uQ2xpY2s/OiAoKSA9PiB2b2lkO1xyXG4gIG1lbnVJdGVtcz86IEZsb2F0aW5nQWN0aW9uQnV0dG9uTWVudUl0ZW1bXTtcclxuICBpc01lbnVPcGVuPzogYm9vbGVhbjtcclxuICBvbk1lbnVPcGVuQ2hhbmdlPzogKGlzT3BlbjogYm9vbGVhbikgPT4gdm9pZDtcclxuICBjbG9zZU1lbnVPblNlbGVjdD86IGJvb2xlYW47XHJcbiAgbWVudUFyaWFMYWJlbD86IHN0cmluZztcclxuICBtZW51Q2xhc3NOYW1lPzogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKSA9PiBNYXRoLm1pbihtYXgsIE1hdGgubWF4KG1pbiwgdmFsdWUpKTtcclxuXHJcbi8vIEZsb2F0aW5nIGFjdGlvbiBidXR0b24gdGhhdCBzdXBwb3J0cyBkaXJlY3QgYWN0aW9uIG9yIHNwZWVkLWRpYWwgbWVudSBtb2RlLlxyXG5jb25zdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbiA9ICh7XHJcbiAgcm91dGUsXHJcbiAgYXJpYUxhYmVsLFxyXG4gIHNpemUgPSA3NixcclxuICByaWdodCA9IDI0LFxyXG4gIGJvdHRvbSA9IDI0LFxyXG4gIGNvbG9yID0gXCIjMDAyOTZiXCIsXHJcbiAgc2hhZG93T3BhY2l0eSA9IDAuMTYsXHJcbiAgcGx1c1RoaWNrbmVzcyA9IDQsXHJcbiAgcGx1c0xlbmd0aCA9IDI4LFxyXG4gIG9uQ2xpY2ssXHJcbiAgbWVudUl0ZW1zID0gRU1QVFlfTUVOVV9JVEVNUyxcclxuICBpc01lbnVPcGVuLFxyXG4gIG9uTWVudU9wZW5DaGFuZ2UsXHJcbiAgY2xvc2VNZW51T25TZWxlY3QgPSB0cnVlLFxyXG4gIG1lbnVBcmlhTGFiZWwsXHJcbiAgbWVudUNsYXNzTmFtZSA9IFwiXCIsXHJcbn06IEZsb2F0aW5nQWN0aW9uQnV0dG9uUHJvcHMpID0+IHtcclxuICBjb25zdCByb290UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY2FudmFzUmVmID0gdXNlUmVmPEhUTUxDYW52YXNFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW2ludGVybmFsTWVudU9wZW4sIHNldEludGVybmFsTWVudU9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IGhhc01lbnUgPSBtZW51SXRlbXMubGVuZ3RoID4gMDtcclxuICBjb25zdCBpc01lbnVDb250cm9sbGVkID0gdHlwZW9mIGlzTWVudU9wZW4gPT09IFwiYm9vbGVhblwiO1xyXG4gIGNvbnN0IG1lbnVPcGVuID0gaGFzTWVudSA/IChpc01lbnVDb250cm9sbGVkID8gQm9vbGVhbihpc01lbnVPcGVuKSA6IGludGVybmFsTWVudU9wZW4pIDogZmFsc2U7XHJcbiAgY29uc3QgeyByZXNvbHZlZEJvdHRvbSB9ID0gdXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5KHtcclxuICAgIGJvdHRvbSxcclxuICAgIHNpemUsXHJcbiAgfSk7XHJcbiAgY29uc3QgcG9ydGFsVGFyZ2V0ID0gdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gIGNvbnN0IHNldE1lbnVPcGVuID0gdXNlQ2FsbGJhY2soXHJcbiAgICAobmV4dE9wZW46IGJvb2xlYW4pID0+IHtcclxuICAgICAgaWYgKCFoYXNNZW51KSByZXR1cm47XHJcbiAgICAgIGlmICghaXNNZW51Q29udHJvbGxlZCkge1xyXG4gICAgICAgIHNldEludGVybmFsTWVudU9wZW4obmV4dE9wZW4pO1xyXG4gICAgICB9XHJcbiAgICAgIG9uTWVudU9wZW5DaGFuZ2U/LihuZXh0T3Blbik7XHJcbiAgICB9LFxyXG4gICAgW2hhc01lbnUsIGlzTWVudUNvbnRyb2xsZWQsIG9uTWVudU9wZW5DaGFuZ2VdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgYnVpbGRGYWJTdmcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlT3BhY2l0eSA9IGNsYW1wKHNoYWRvd09wYWNpdHksIDAsIDAuNSk7XHJcbiAgICBjb25zdCBzYWZlVGhpY2tuZXNzID0gY2xhbXAocGx1c1RoaWNrbmVzcywgMiwgOCk7XHJcbiAgICBjb25zdCBzYWZlTGVuZ3RoID0gY2xhbXAocGx1c0xlbmd0aCwgMTYsIDQwKTtcclxuXHJcbiAgICBjb25zdCBjeCA9IDQ4O1xyXG4gICAgY29uc3QgeFYgPSBjeCAtIHNhZmVUaGlja25lc3MgLyAyO1xyXG4gICAgY29uc3QgeVYgPSBjeCAtIHNhZmVMZW5ndGggLyAyO1xyXG4gICAgY29uc3QgeEggPSBjeCAtIHNhZmVMZW5ndGggLyAyO1xyXG4gICAgY29uc3QgeUggPSBjeCAtIHNhZmVUaGlja25lc3MgLyAyO1xyXG5cclxuICAgIHJldHVybiBgXHJcbiAgICAgIDxzdmcgd2lkdGg9XCI5NlwiIGhlaWdodD1cIjk2XCIgdmlld0JveD1cIjAgMCA5NiA5NlwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICA8ZGVmcz5cclxuICAgICAgICAgIDxmaWx0ZXIgaWQ9XCJmYWJTaGFkb3dcIiB4PVwiLTQwJVwiIHk9XCItNDAlXCIgd2lkdGg9XCIxODAlXCIgaGVpZ2h0PVwiMTgwJVwiPlxyXG4gICAgICAgICAgICA8ZmVEcm9wU2hhZG93IGR4PVwiLTRcIiBkeT1cIjEwXCIgc3RkRGV2aWF0aW9uPVwiNlwiIGZsb29kLWNvbG9yPVwiIzAwMFwiIGZsb29kLW9wYWNpdHk9XCIke3NhZmVPcGFjaXR5fVwiLz5cclxuICAgICAgICAgIDwvZmlsdGVyPlxyXG4gICAgICAgIDwvZGVmcz5cclxuXHJcbiAgICAgICAgPGcgZmlsdGVyPVwidXJsKCNmYWJTaGFkb3cpXCI+XHJcbiAgICAgICAgICA8Y2lyY2xlIGN4PVwiNDhcIiBjeT1cIjQ4XCIgcj1cIjM0XCIgZmlsbD1cIiR7Y29sb3J9XCIvPlxyXG4gICAgICAgIDwvZz5cclxuXHJcbiAgICAgICAgPGcgZmlsbD1cIiNmZmZcIj5cclxuICAgICAgICAgIDxyZWN0IHg9XCIke3hWfVwiIHk9XCIke3lWfVwiIHdpZHRoPVwiJHtzYWZlVGhpY2tuZXNzfVwiIGhlaWdodD1cIiR7c2FmZUxlbmd0aH1cIiByeD1cIjFcIi8+XHJcbiAgICAgICAgICA8cmVjdCB4PVwiJHt4SH1cIiB5PVwiJHt5SH1cIiB3aWR0aD1cIiR7c2FmZUxlbmd0aH1cIiBoZWlnaHQ9XCIke3NhZmVUaGlja25lc3N9XCIgcng9XCIxXCIvPlxyXG4gICAgICAgIDwvZz5cclxuICAgICAgPC9zdmc+XHJcbiAgICBgLnRyaW0oKTtcclxuICB9LCBbY29sb3IsIHBsdXNMZW5ndGgsIHBsdXNUaGlja25lc3MsIHNoYWRvd09wYWNpdHldKTtcclxuXHJcbiAgY29uc3QgcmVuZGVyU3ZnVG9DYW52YXMgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcclxuICAgIGlmICghY2FudmFzKSByZXR1cm47XHJcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgaWYgKCFjdHgpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBzaXplUHggPSBNYXRoLm1heCg0MCwgc2l6ZSk7XHJcbiAgICBjb25zdCBkcHIgPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xyXG5cclxuICAgIGNhbnZhcy53aWR0aCA9IE1hdGgucm91bmQoc2l6ZVB4ICogZHByKTtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBNYXRoLnJvdW5kKHNpemVQeCAqIGRwcik7XHJcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBgJHtzaXplUHh9cHhgO1xyXG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke3NpemVQeH1weGA7XHJcbiAgICBjdHguc2V0VHJhbnNmb3JtKGRwciwgMCwgMCwgZHByLCAwLCAwKTtcclxuXHJcbiAgICBjb25zdCBzdmcgPSBidWlsZEZhYlN2ZygpO1xyXG4gICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtzdmddLCB7IHR5cGU6IFwiaW1hZ2Uvc3ZnK3htbFwiIH0pO1xyXG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcbiAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltZy5kZWNvZGluZyA9IFwiYXN5bmNcIjtcclxuICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc2l6ZVB4LCBzaXplUHgpO1xyXG4gICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCwgc2l6ZVB4LCBzaXplUHgpO1xyXG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XHJcbiAgICB9O1xyXG4gICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcclxuICAgIH07XHJcbiAgICBpbWcuc3JjID0gdXJsO1xyXG4gIH0sIFtidWlsZEZhYlN2Zywgc2l6ZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmVuZGVyU3ZnVG9DYW52YXMoKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlbmRlclN2Z1RvQ2FudmFzKTtcclxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCByZW5kZXJTdmdUb0NhbnZhcyk7XHJcbiAgfSwgW3JlbmRlclN2Z1RvQ2FudmFzXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIW1lbnVPcGVuKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlT3V0c2lkZUNsaWNrID0gKGV2ZW50OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBub2RlID0gZXZlbnQudGFyZ2V0IGFzIE5vZGUgfCBudWxsO1xyXG4gICAgICBpZiAoIW5vZGUpIHJldHVybjtcclxuICAgICAgaWYgKHJvb3RSZWYuY3VycmVudD8uY29udGFpbnMobm9kZSkpIHJldHVybjtcclxuICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVFc2NhcGUgPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgIHNldE1lbnVPcGVuKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGVDbGljayk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVPdXRzaWRlQ2xpY2ssIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGUpO1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVPdXRzaWRlQ2xpY2spO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgaGFuZGxlRXNjYXBlKTtcclxuICAgIH07XHJcbiAgfSwgW21lbnVPcGVuLCBzZXRNZW51T3Blbl0pO1xyXG5cclxuICBjb25zdCBydW5QcmltYXJ5QWN0aW9uID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiBvbkNsaWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgb25DbGljaygpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoIXJvdXRlIHx8IHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcm91dGU7XHJcbiAgfSwgW29uQ2xpY2ssIHJvdXRlXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1haW5DbGljayA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmIChoYXNNZW51KSB7XHJcbiAgICAgIHNldE1lbnVPcGVuKCFtZW51T3Blbik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBydW5QcmltYXJ5QWN0aW9uKCk7XHJcbiAgfSwgW2hhc01lbnUsIG1lbnVPcGVuLCBydW5QcmltYXJ5QWN0aW9uLCBzZXRNZW51T3Blbl0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNZW51SXRlbUNsaWNrID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoaXRlbTogRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbS5kaXNhYmxlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgaWYgKHR5cGVvZiBpdGVtLm9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGl0ZW0ub25DbGljaygpO1xyXG4gICAgICB9IGVsc2UgaWYgKGl0ZW0ucm91dGUgJiYgdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaXRlbS5yb3V0ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGNsb3NlTWVudU9uU2VsZWN0KSB7XHJcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgW2Nsb3NlTWVudU9uU2VsZWN0LCBzZXRNZW51T3Blbl1cclxuICApO1xyXG5cclxuICBjb25zdCBtZW51UGFuZWxDbGFzc05hbWUgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGNvbnN0IGJhc2UgPSBcIm1pbi13LVsxMXJlbV0gcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUgcC0yIHNoYWRvdy14bFwiO1xyXG4gICAgY29uc3QgZXh0cmEgPSBtZW51Q2xhc3NOYW1lLnRyaW0oKTtcclxuICAgIHJldHVybiBleHRyYSA/IGAke2Jhc2V9ICR7ZXh0cmF9YCA6IGJhc2U7XHJcbiAgfSwgW21lbnVDbGFzc05hbWVdKTtcclxuXHJcbiAgY29uc3QgZmxvYXRpbmdBY3Rpb25CdXR0b24gPSAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIHJlZj17cm9vdFJlZn1cclxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgei0yMDAwIGZsZXggZmxleC1jb2wgaXRlbXMtZW5kIGdhcC0yXCJcclxuICAgICAgc3R5bGU9e3tcclxuICAgICAgICByaWdodDogYCR7cmlnaHR9cHhgLFxyXG4gICAgICAgIGJvdHRvbTogYCR7cmVzb2x2ZWRCb3R0b219cHhgLFxyXG4gICAgICB9fVxyXG4gICAgPlxyXG4gICAgICB7bWVudU9wZW4gPyAoXHJcbiAgICAgICAgPGRpdiByb2xlPVwibWVudVwiIGFyaWEtbGFiZWw9e21lbnVBcmlhTGFiZWwgfHwgYXJpYUxhYmVsfSBjbGFzc05hbWU9e21lbnVQYW5lbENsYXNzTmFtZX0+XHJcbiAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XHJcbiAgICAgICAgICAgIHttZW51SXRlbXMubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICAgICAgPGxpIGtleT17aXRlbS5pZH0+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICByb2xlPVwibWVudWl0ZW1cIlxyXG4gICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpdGVtLmFyaWFMYWJlbCB8fCBpdGVtLmxhYmVsfVxyXG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXRlbS5kaXNhYmxlZH1cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCB3LWZ1bGwgaXRlbXMtY2VudGVyIGdhcC0yIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIHB4LTMgcHktMiB0ZXh0LWxlZnQgdGV4dC1bMTZweF0gZm9udC1tZWRpdW0gbGVhZGluZy01IHRleHQtc2xhdGUtNzAwIHRyYW5zaXRpb24tY29sb3JzIGhvdmVyOmJnLXNsYXRlLTEwMCBmb2N1cy12aXNpYmxlOm91dGxpbmUtaGlkZGVuIGZvY3VzLXZpc2libGU6cmluZy0yIGZvY3VzLXZpc2libGU6cmluZy1wcmltYXJ5LzQwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTUwXCJcclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlTWVudUl0ZW1DbGljayhpdGVtKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge2l0ZW0uaWNvbiA/IDxzcGFuIGNsYXNzTmFtZT1cImlubGluZS1mbGV4IGgtNSB3LTUgc2hyaW5rLTAgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+e2l0ZW0uaWNvbn08L3NwYW4+IDogbnVsbH1cclxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidHJ1bmNhdGVcIj57aXRlbS5sYWJlbH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgICApKX1cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgIGFyaWEtbGFiZWw9e2FyaWFMYWJlbH1cclxuICAgICAgICBhcmlhLWV4cGFuZGVkPXtoYXNNZW51ID8gbWVudU9wZW4gOiB1bmRlZmluZWR9XHJcbiAgICAgICAgYXJpYS1oYXNwb3B1cD17aGFzTWVudSA/IFwibWVudVwiIDogdW5kZWZpbmVkfVxyXG4gICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHAtMCB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0xNTAgaG92ZXI6LXRyYW5zbGF0ZS15LTAuNSBhY3RpdmU6c2NhbGUtOTUgZm9jdXMtdmlzaWJsZTpyaW5nLTQgZm9jdXMtdmlzaWJsZTpyaW5nLXByaW1hcnkvMzAgZm9jdXMtdmlzaWJsZTpyaW5nLW9mZnNldC00XCJcclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgd2lkdGg6IGAke3NpemV9cHhgLFxyXG4gICAgICAgICAgaGVpZ2h0OiBgJHtzaXplfXB4YCxcclxuICAgICAgICAgIFdlYmtpdFRhcEhpZ2hsaWdodENvbG9yOiBcInRyYW5zcGFyZW50XCIsXHJcbiAgICAgICAgfX1cclxuICAgICAgICBvbkNsaWNrPXtoYW5kbGVNYWluQ2xpY2t9XHJcbiAgICAgID5cclxuICAgICAgICA8Y2FudmFzIHJlZj17Y2FudmFzUmVmfSBjbGFzc05hbWU9XCJibG9jayByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiIC8+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxuXHJcbiAgaWYgKCFwb3J0YWxUYXJnZXQpIHtcclxuICAgIHJldHVybiBmbG9hdGluZ0FjdGlvbkJ1dHRvbjtcclxuICB9XHJcblxyXG4gIHJldHVybiBjcmVhdGVQb3J0YWwoZmxvYXRpbmdBY3Rpb25CdXR0b24sIHBvcnRhbFRhcmdldCk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGbG9hdGluZ0FjdGlvbkJ1dHRvbjtcclxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxudHlwZSBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlBcmdzID0ge1xyXG4gIGJvdHRvbTogbnVtYmVyO1xyXG4gIHNpemU6IG51bWJlcjtcclxufTtcclxuXHJcbnR5cGUgVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5UmVzdWx0ID0ge1xyXG4gIHJlc29sdmVkQm90dG9tOiBudW1iZXI7XHJcbiAgcmVzZXJ2ZWRIZWlnaHQ6IG51bWJlcjtcclxufTtcclxuXHJcbmNvbnN0IERFRkFVTFRfRkFCX0JPVFRPTV9QWCA9IDI0O1xyXG5jb25zdCBGQUJfQ09OVEVOVF9DTEVBUkFOQ0VfUFggPSAxMjtcclxuY29uc3QgQVNTSVNUQU5UX1ZJU1VBTF9CQVNFTElORV9DT1JSRUNUSU9OX1BYID0gNjtcclxuY29uc3QgQVNTSVNUQU5UX0xBVU5DSEVSX1NFTEVDVE9SID0gXCJbZGF0YS1pbmQtYXNzaXN0YW50LWxhdW5jaGVyPSd0cnVlJ11cIjtcclxuY29uc3QgUEFHRV9GTE9BVElOR19DTEVBUkFOQ0VfQ1NTX1ZBUiA9IFwiLS1pbmQtcGFnZS1mbG9hdGluZy1jbGVhcmFuY2VcIjtcclxuXHJcbi8vIFJldHVybnMgdHJ1ZSB3aGVuIG9uZSBET00gZWxlbWVudCBpcyBhY3R1YWxseSB2aXNpYmxlIGFuZCBjYW4gZGVmaW5lIGEgdmlzdWFsIGJhc2VsaW5lLlxyXG5jb25zdCBpc1Zpc2libGVMYXlvdXRFbGVtZW50ID0gKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgY29uc3Qgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XHJcbiAgaWYgKHN0eWxlcy5kaXNwbGF5ID09PSBcIm5vbmVcIiB8fCBzdHlsZXMudmlzaWJpbGl0eSA9PT0gXCJoaWRkZW5cIikge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgcmV0dXJuIHJlY3Qud2lkdGggPiAwICYmIHJlY3QuaGVpZ2h0ID4gMDtcclxufTtcclxuXHJcbi8vIEZpbmRzIG9uZSB2aXNpYmxlIGFzc2lzdGFudCBsYXVuY2hlciBzbyB0aGUgRkFCIGNhbiBzaGFyZSB0aGUgc2FtZSBiYXNlbGluZS5cclxuY29uc3QgZ2V0VmlzaWJsZUFzc2lzdGFudExhdW5jaGVyID0gKCk6IEhUTUxFbGVtZW50IHwgbnVsbCA9PiB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIG51bGw7XHJcblxyXG4gIGNvbnN0IGxhdW5jaGVycyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oQVNTSVNUQU5UX0xBVU5DSEVSX1NFTEVDVE9SKSk7XHJcbiAgZm9yIChjb25zdCBsYXVuY2hlciBvZiBsYXVuY2hlcnMpIHtcclxuICAgIGlmIChpc1Zpc2libGVMYXlvdXRFbGVtZW50KGxhdW5jaGVyKSkge1xyXG4gICAgICByZXR1cm4gbGF1bmNoZXI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbmNvbnN0IHNldFBhZ2VGbG9hdGluZ0NsZWFyYW5jZSA9IChjbGVhcmFuY2U6IG51bWJlcik6IHZvaWQgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgY29uc3Qgc2FmZVZhbHVlID0gYCR7TWF0aC5tYXgoMCwgTWF0aC5jZWlsKGNsZWFyYW5jZSkpfXB4YDtcclxuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoUEFHRV9GTE9BVElOR19DTEVBUkFOQ0VfQ1NTX1ZBUiwgc2FmZVZhbHVlKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik/LnN0eWxlLnNldFByb3BlcnR5KFBBR0VfRkxPQVRJTkdfQ0xFQVJBTkNFX0NTU19WQVIsIHNhZmVWYWx1ZSk7XHJcbn07XHJcblxyXG5jb25zdCBjbGVhclBhZ2VGbG9hdGluZ0NsZWFyYW5jZSA9ICgpOiB2b2lkID0+IHtcclxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShQQUdFX0ZMT0FUSU5HX0NMRUFSQU5DRV9DU1NfVkFSKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIik/LnN0eWxlLnJlbW92ZVByb3BlcnR5KFBBR0VfRkxPQVRJTkdfQ0xFQVJBTkNFX0NTU19WQVIpO1xyXG59O1xyXG5cclxuLy8gUmVzb2x2ZXMgdGhlIGJvdHRvbSBkaXN0YW5jZS4gV2hlbiB0aGUgYXNzaXN0YW50IGxhdW5jaGVyIGV4aXN0cywgaXQgYmVjb21lcyB0aGUgdmlzdWFsIGJhc2VsaW5lLlxyXG5jb25zdCByZXNvbHZlQm90dG9tT2Zmc2V0ID0gKGJvdHRvbTogbnVtYmVyKTogbnVtYmVyID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJldHVybiBNYXRoLm1heCgwLCBib3R0b20pO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYXNzaXN0YW50TGF1bmNoZXIgPSBnZXRWaXNpYmxlQXNzaXN0YW50TGF1bmNoZXIoKTtcclxuICBpZiAoIWFzc2lzdGFudExhdW5jaGVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgYm90dG9tKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHZpZXdwb3J0SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgfHwgMDtcclxuICBjb25zdCBsYXVuY2hlclJlY3QgPSBhc3Npc3RhbnRMYXVuY2hlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICBjb25zdCBsYXVuY2hlckJvdHRvbSA9IE1hdGgubWF4KDAsIE1hdGgucm91bmQodmlld3BvcnRIZWlnaHQgLSBsYXVuY2hlclJlY3QuYm90dG9tKSk7XHJcbiAgY29uc3QgYWRkaXRpb25hbENsZWFyYW5jZSA9IE1hdGgubWF4KDAsIGJvdHRvbSAtIERFRkFVTFRfRkFCX0JPVFRPTV9QWCk7XHJcblxyXG4gIHJldHVybiBNYXRoLm1heCgwLCBsYXVuY2hlckJvdHRvbSAtIEFTU0lTVEFOVF9WSVNVQUxfQkFTRUxJTkVfQ09SUkVDVElPTl9QWCArIGFkZGl0aW9uYWxDbGVhcmFuY2UpO1xyXG59O1xyXG5cclxuLy8gUmVzZXJ2ZXMgb25lIHNoYXJlZCBlbmRpbmcgbGFuZSBmb3IgZmxvYXRpbmcgVUkgd2l0aG91dCBkZXBlbmRpbmcgb24gcGFnaW5hdGlvbiBwb3NpdGlvbi5cclxuY29uc3QgcmVzb2x2ZVJlc2VydmVkSGVpZ2h0ID0gKGJvdHRvbTogbnVtYmVyLCBzaXplOiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLmNlaWwoYm90dG9tICsgTWF0aC5tYXgoNDAsIHNpemUpICsgRkFCX0NPTlRFTlRfQ0xFQVJBTkNFX1BYKSk7XHJcbn07XHJcblxyXG4vLyBLZWVwcyB0aGUgZmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiBhbGlnbmVkIHdpdGggb3RoZXIgZmxvYXRpbmcgVUkgYW5kIGV4cG9zZXMgb25lIHBhZ2UgY2xlYXJhbmNlIGxhbmUuXHJcbmV4cG9ydCBjb25zdCB1c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkgPSAoe1xyXG4gIGJvdHRvbSxcclxuICBzaXplLFxyXG59OiBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlBcmdzKTogVXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5UmVzdWx0ID0+IHtcclxuICBjb25zdCBbcmVzb2x2ZWRCb3R0b20sIHNldFJlc29sdmVkQm90dG9tXSA9IHVzZVN0YXRlKGJvdHRvbSk7XHJcbiAgY29uc3QgW3Jlc2VydmVkSGVpZ2h0LCBzZXRSZXNlcnZlZEhlaWdodF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBhbmltYXRpb25GcmFtZVJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgY29uc3QgdXBkYXRlTGF5b3V0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBuZXh0Qm90dG9tID0gcmVzb2x2ZUJvdHRvbU9mZnNldChib3R0b20pO1xyXG4gICAgY29uc3QgbmV4dFJlc2VydmVkSGVpZ2h0ID0gcmVzb2x2ZVJlc2VydmVkSGVpZ2h0KG5leHRCb3R0b20sIHNpemUpO1xyXG5cclxuICAgIHNldFJlc29sdmVkQm90dG9tKChwcmV2aW91cykgPT4gKE1hdGguYWJzKHByZXZpb3VzIC0gbmV4dEJvdHRvbSkgPCAxID8gcHJldmlvdXMgOiBuZXh0Qm90dG9tKSk7XHJcbiAgICBzZXRSZXNlcnZlZEhlaWdodCgocHJldmlvdXMpID0+IChNYXRoLmFicyhwcmV2aW91cyAtIG5leHRSZXNlcnZlZEhlaWdodCkgPCAxID8gcHJldmlvdXMgOiBuZXh0UmVzZXJ2ZWRIZWlnaHQpKTtcclxuICB9LCBbYm90dG9tLCBzaXplXSk7XHJcblxyXG4gIGNvbnN0IHNjaGVkdWxlTGF5b3V0VXBkYXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xyXG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgdXBkYXRlTGF5b3V0KCk7XHJcbiAgICB9KTtcclxuICB9LCBbdXBkYXRlTGF5b3V0XSk7XHJcblxyXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICB1cGRhdGVMYXlvdXQoKTtcclxuICB9LCBbdXBkYXRlTGF5b3V0XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIE11dGF0aW9uT2JzZXJ2ZXIgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICBpZiAoIWJvZHkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcclxuICAgICAgc2NoZWR1bGVMYXlvdXRVcGRhdGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIG9ic2VydmVyLm9ic2VydmUoYm9keSwge1xyXG4gICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgIHN1YnRyZWU6IHRydWUsXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gIH0sIFtzY2hlZHVsZUxheW91dFVwZGF0ZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgc2V0UGFnZUZsb2F0aW5nQ2xlYXJhbmNlKHJlc2VydmVkSGVpZ2h0KTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhclBhZ2VGbG9hdGluZ0NsZWFyYW5jZSgpO1xyXG4gICAgfTtcclxuICB9LCBbcmVzZXJ2ZWRIZWlnaHRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xyXG4gICAgICBzY2hlZHVsZUxheW91dFVwZGF0ZSgpO1xyXG4gICAgfTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9yaWVudGF0aW9uY2hhbmdlXCIsIGhhbmRsZVJlc2l6ZSk7XHJcblxyXG4gICAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9LCBbc2NoZWR1bGVMYXlvdXRVcGRhdGVdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIHJlc29sdmVkQm90dG9tLFxyXG4gICAgcmVzZXJ2ZWRIZWlnaHQsXHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBZ0U7QUFrRzFEO0FBN0VOLElBQU0saUJBQWlCO0FBU3ZCLElBQU0sd0JBQW9CO0FBQUEsRUFDeEIsQ0FBQyxFQUFFLFlBQVksYUFBYSxhQUFhLGdCQUFnQixjQUFjLFFBQVEsV0FBVyxRQUFRLEdBQUcsUUFBUTtBQUMzRyxVQUFNLFlBQVksS0FBSyxJQUFJLEdBQUcsY0FBYyxDQUFDO0FBQzdDLFVBQU0sY0FBYyxLQUFLLElBQUksS0FBSyxJQUFJLEdBQUcsZUFBZSxDQUFDLEdBQUcsYUFBYSxDQUFDO0FBQzFFLFVBQU0sYUFBYSxLQUFLLElBQUksR0FBRyxjQUFjLGNBQWM7QUFDM0QsVUFBTSxtQkFBbUIsT0FBTyxZQUFZO0FBQzVDLFVBQU0sWUFBWSxZQUFZ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QUFFQSxVQUFJLG1CQUFtQjtBQUNyQixvQkFBWSxLQUFLO0FBQUEsTUFDbkI7QUFBQSxJQUNGO0FBQUEsSUFDQSxDQUFDLG1CQUFtQixXQUFXO0FBQUEsRUFDakM7QUFFQSxRQUFNLHlCQUFxQix1QkFBUSxNQUFNO0FBQ3ZDLFVBQU0sT0FBTztBQUNiLFVBQU0sUUFBUSxjQUFjLEtBQUs7QUFDakMsV0FBTyxRQUFRLEdBQUcsSUFBSSxJQUFJLEtBQUssS0FBSztBQUFBLEVBQ3RDLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFFbEIsUUFBTSx1QkFDSjtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsS0FBSztBQUFBLE1BQ0wsV0FBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLFFBQ0wsT0FBTyxHQUFHLEtBQUs7QUFBQSxRQUNmLFFBQVEsR0FBRyxjQUFjO0FBQUEsTUFDM0I7QUFBQSxNQUVDO0FBQUEsbUJBQ0MsNkNBQUMsU0FBSSxNQUFLLFFBQU8sY0FBWSxpQkFBaUIsV0FBVyxXQUFXLG9CQUNsRSx1REFBQyxRQUFHLFdBQVUsYUFDWCxvQkFBVSxJQUFJLENBQUMsU0FDZCw2Q0FBQyxRQUNDO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxNQUFLO0FBQUEsWUFDTCxNQUFLO0FBQUEsWUFDTCxjQUFZLEtBQUssYUFBYSxLQUFLO0FBQUEsWUFDbkMsVUFBVSxLQUFLO0FBQUEsWUFDZixXQUFVO0FBQUEsWUFDVixTQUFTLE1BQU0sb0JBQW9CLElBQUk7QUFBQSxZQUV0QztBQUFBLG1CQUFLLE9BQU8sNkNBQUMsVUFBSyxXQUFVLDREQUE0RCxlQUFLLE1BQUssSUFBVTtBQUFBLGNBQzdHLDZDQUFDLFVBQUssV0FBVSxZQUFZLGVBQUssT0FBTTtBQUFBO0FBQUE7QUFBQSxRQUN6QyxLQVhPLEtBQUssRUFZZCxDQUNELEdBQ0gsR0FDRixJQUNFO0FBQUEsUUFFSjtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsTUFBSztBQUFBLFlBQ0wsY0FBWTtBQUFBLFlBQ1osaUJBQWUsVUFBVSxXQUFXO0FBQUEsWUFDcEMsaUJBQWUsVUFBVSxTQUFTO0FBQUEsWUFDbEMsV0FBVTtBQUFBLFlBQ1YsT0FBTztBQUFBLGNBQ0wsT0FBTyxHQUFHLElBQUk7QUFBQSxjQUNkLFFBQVEsR0FBRyxJQUFJO0FBQUEsY0FDZix5QkFBeUI7QUFBQSxZQUMzQjtBQUFBLFlBQ0EsU0FBUztBQUFBLFlBRVQsdURBQUMsWUFBTyxLQUFLLFdBQVcsV0FBVSxvQ0FBbUM7QUFBQTtBQUFBLFFBQ3ZFO0FBQUE7QUFBQTtBQUFBLEVBQ0Y7QUFHRixNQUFJLENBQUMsY0FBYztBQUNqQixXQUFPO0FBQUEsRUFDVDtBQUVBLGFBQU8sK0JBQWEsc0JBQXNCLFlBQVk7QUFDeEQ7QUFFQSxJQUFPLCtCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
