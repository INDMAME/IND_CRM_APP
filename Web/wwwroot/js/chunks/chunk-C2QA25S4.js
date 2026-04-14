import {
  Spinner_default,
  classNames
} from "./chunk-ZHH4AWW7.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/hooks/useTimelineCardEffects.ts
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

// Web/wwwroot/react/src/components/commons/CompactPagination.tsx
var import_react2 = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var DEFAULT_WINDOW = 6;
var CompactPagination = (0, import_react2.forwardRef)(
  ({ totalPages, currentPage, pageWindow = DEFAULT_WINDOW, onPageChange, labels, className, loading }, ref) => {
    const safeTotal = Math.max(0, totalPages || 0);
    const safeCurrent = Math.min(Math.max(1, currentPage || 1), safeTotal || 1);
    const windowSize = Math.max(1, pageWindow || DEFAULT_WINDOW);
    const hasLoadingSignal = typeof loading === "boolean";
    const isLoading = loading === true;
    const [isPageTransitionPending, setIsPageTransitionPending] = (0, import_react2.useState)(false);
    const showPageSpinner = hasLoadingSignal && isPageTransitionPending;
    const showPagination = safeTotal > 1;
    const showEdgeNav = safeTotal > windowSize;
    const canJumpToStart = safeCurrent > windowSize;
    const canGoPrev = safeCurrent > 1;
    const canGoNext = safeCurrent < safeTotal;
    const pageNumbers = (0, import_react2.useMemo)(() => {
      if (!safeTotal) return [];
      const windowStart = Math.max(1, Math.floor((safeCurrent - 1) / windowSize) * windowSize + 1);
      const windowEnd = Math.min(safeTotal, windowStart + windowSize - 1);
      return Array.from({ length: windowEnd - windowStart + 1 }, (_val, idx) => windowStart + idx);
    }, [safeCurrent, safeTotal, windowSize]);
    (0, import_react2.useEffect)(() => {
      if (!hasLoadingSignal || !isPageTransitionPending) return;
      if (isLoading) return;
      setIsPageTransitionPending(false);
    }, [hasLoadingSignal, isLoading, isPageTransitionPending]);
    (0, import_react2.useEffect)(() => {
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

export {
  useTimelineCardEffects,
  CompactPagination_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5cclxuY29uc3QgVE9PTFRJUF9UT1VDSF9ERUxBWV9NUyA9IDEyMDtcclxuY29uc3QgVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPID0gMC44O1xyXG5jb25zdCBUT09MVElQX0JBU0VfRk9OVCA9IDEzO1xyXG5jb25zdCBUT09MVElQX01JTl9GT05UID0gMTE7XHJcbmNvbnN0IEVMTElQU0lTID0gXCIuLi5cIjtcclxuY29uc3QgUElYRUxfR0FQID0gNTtcclxuY29uc3QgUElYRUxfU1BFRUQgPSA5NTtcclxuY29uc3QgUElYRUxfQ09MT1JTID0gW1wicmdiYSgwLCA0MSwgMTA3LCAwLjA4KVwiLCBcInJnYmEoMCwgNDEsIDEwNywgMC4xNilcIiwgXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMjYpXCJdO1xyXG5cclxudHlwZSBQaXhlbFN0YXRlID0ge1xyXG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XHJcbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgcGl4ZWxzOiBQaXhlbFtdO1xyXG4gIGFuaW1JZDogbnVtYmVyIHwgbnVsbDtcclxuICBsYXN0VGltZTogbnVtYmVyO1xyXG4gIHJlZHVjZWRNb3Rpb246IGJvb2xlYW47XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFVzZVRpbWVsaW5lQ2FyZEVmZmVjdHNBcmdzID0ge1xyXG4gIGNvbnRhaW5lclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XHJcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XHJcbiAgaXRlbXM6IHVua25vd25bXTtcclxuICByZXNvbHZlQ2xpY2thYmxlQ2FyZDogKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiBIVE1MRWxlbWVudCB8IG51bGw7XHJcbn07XHJcblxyXG4vLyBDb21wdXRlIHBpeGVsIHNwZWVkIHdoaWxlIHJlc3BlY3RpbmcgcmVkdWNlZCBtb3Rpb24gcHJlZmVyZW5jZS5cclxuY29uc3QgZ2V0RWZmZWN0aXZlU3BlZWQgPSAodmFsdWU6IG51bWJlciwgcmVkdWNlZE1vdGlvbjogYm9vbGVhbikgPT4ge1xyXG4gIGNvbnN0IG1pbiA9IDA7XHJcbiAgY29uc3QgbWF4ID0gMTAwO1xyXG4gIGNvbnN0IHRocm90dGxlID0gMC4wMDE7XHJcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyLnBhcnNlSW50KFN0cmluZyh2YWx1ZSksIDEwKTtcclxuXHJcbiAgaWYgKHBhcnNlZCA8PSBtaW4gfHwgcmVkdWNlZE1vdGlvbikgcmV0dXJuIG1pbjtcclxuICBpZiAocGFyc2VkID49IG1heCkgcmV0dXJuIG1heCAqIHRocm90dGxlO1xyXG4gIHJldHVybiBwYXJzZWQgKiB0aHJvdHRsZTtcclxufTtcclxuXHJcbi8vIFBpeGVsIHVzZWQgYnkgdGhlIGhvdmVyIGFuaW1hdGlvbiBjYW52YXMuXHJcbmNsYXNzIFBpeGVsIHtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gIHg6IG51bWJlcjtcclxuICB5OiBudW1iZXI7XHJcbiAgY29sb3I6IHN0cmluZztcclxuICBzcGVlZDogbnVtYmVyO1xyXG4gIHNpemU6IG51bWJlcjtcclxuICBzaXplU3RlcDogbnVtYmVyO1xyXG4gIG1pblNpemU6IG51bWJlcjtcclxuICBtYXhTaXplSW50ZWdlcjogbnVtYmVyO1xyXG4gIG1heFNpemU6IG51bWJlcjtcclxuICBwaGFzZTogbnVtYmVyO1xyXG4gIHBoYXNlU3RlcDogbnVtYmVyO1xyXG4gIGRlbGF5OiBudW1iZXI7XHJcbiAgY291bnRlcjogbnVtYmVyO1xyXG4gIGNvdW50ZXJTdGVwOiBudW1iZXI7XHJcbiAgaXNJZGxlOiBib29sZWFuO1xyXG4gIGlzUmV2ZXJzZTogYm9vbGVhbjtcclxuICBpc1NoaW1tZXI6IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQsIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgeDogbnVtYmVyLCB5OiBudW1iZXIsIGNvbG9yOiBzdHJpbmcsIHNwZWVkOiBudW1iZXIsIGRlbGF5OiBudW1iZXIpIHtcclxuICAgIHRoaXMud2lkdGggPSBjYW52YXMud2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XHJcbiAgICB0aGlzLmN0eCA9IGNvbnRleHQ7XHJcbiAgICB0aGlzLnggPSB4O1xyXG4gICAgdGhpcy55ID0geTtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxuICAgIHRoaXMuc3BlZWQgPSB0aGlzLmdldFJhbmRvbVZhbHVlKDAuMSwgMC45KSAqIHNwZWVkO1xyXG4gICAgdGhpcy5zaXplID0gMDtcclxuICAgIHRoaXMuc2l6ZVN0ZXAgPSBNYXRoLnJhbmRvbSgpICogMC4zICsgMC4xO1xyXG4gICAgdGhpcy5taW5TaXplID0gMC41O1xyXG4gICAgdGhpcy5tYXhTaXplSW50ZWdlciA9IDI7XHJcbiAgICB0aGlzLm1heFNpemUgPSB0aGlzLmdldFJhbmRvbVZhbHVlKHRoaXMubWluU2l6ZSwgdGhpcy5tYXhTaXplSW50ZWdlcik7XHJcbiAgICB0aGlzLmRlbGF5ID0gZGVsYXk7XHJcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgdGhpcy5jb3VudGVyU3RlcCA9IE1hdGgucmFuZG9tKCkgKiA1ICsgKHRoaXMud2lkdGggKyB0aGlzLmhlaWdodCkgKiAwLjAxNTtcclxuICAgIHRoaXMuaXNJZGxlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzUmV2ZXJzZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1NoaW1tZXIgPSBmYWxzZTtcclxuICAgIHRoaXMucGhhc2UgPSBNYXRoLnJhbmRvbSgpICogTWF0aC5QSSAqIDI7XHJcbiAgICB0aGlzLnBoYXNlU3RlcCA9IE1hdGgubWF4KDAsIHRoaXMuc3BlZWQgKiAoMC44ICsgTWF0aC5yYW5kb20oKSAqIDAuNikpO1xyXG4gIH1cclxuXHJcbiAgLy8gUmV0dXJuIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gbWluIGFuZCBtYXguXHJcbiAgZ2V0UmFuZG9tVmFsdWUobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xyXG4gIH1cclxuXHJcbiAgLy8gRHJhdyB0aGUgcGl4ZWwgYXQgaXRzIGN1cnJlbnQgc2l6ZS5cclxuICBkcmF3KCkge1xyXG4gICAgY29uc3QgY2VudGVyT2Zmc2V0ID0gdGhpcy5tYXhTaXplSW50ZWdlciAqIDAuNSAtIHRoaXMuc2l6ZSAqIDAuNTtcclxuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMuY29sb3I7XHJcbiAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLnggKyBjZW50ZXJPZmZzZXQsIHRoaXMueSArIGNlbnRlck9mZnNldCwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xyXG4gIH1cclxuXHJcbiAgLy8gQW5pbWF0ZSB0aGUgcGl4ZWwgYXBwZWFyaW5nLlxyXG4gIGFwcGVhcigpIHtcclxuICAgIHRoaXMuaXNJZGxlID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5jb3VudGVyIDw9IHRoaXMuZGVsYXkpIHtcclxuICAgICAgdGhpcy5jb3VudGVyICs9IHRoaXMuY291bnRlclN0ZXA7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnNpemUgPj0gdGhpcy5tYXhTaXplKSB7XHJcbiAgICAgIHRoaXMuaXNTaGltbWVyID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmlzU2hpbW1lcikge1xyXG4gICAgICB0aGlzLnNoaW1tZXIoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2l6ZSArPSB0aGlzLnNpemVTdGVwO1xyXG4gICAgfVxyXG4gICAgdGhpcy5kcmF3KCk7XHJcbiAgfVxyXG5cclxuICAvLyBBbmltYXRlIHRoZSBwaXhlbCBkaXNhcHBlYXJpbmcuXHJcbiAgZGlzYXBwZWFyKCkge1xyXG4gICAgdGhpcy5pc1NoaW1tZXIgPSBmYWxzZTtcclxuICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICBpZiAodGhpcy5zaXplIDw9IDApIHtcclxuICAgICAgdGhpcy5pc0lkbGUgPSB0cnVlO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnNpemUgLT0gMC4xO1xyXG4gICAgdGhpcy5kcmF3KCk7XHJcbiAgfVxyXG5cclxuICAvLyBPc2NpbGxhdGUgcGl4ZWwgc2l6ZSB3aGlsZSB2aXNpYmxlLlxyXG4gIHNoaW1tZXIoKSB7XHJcbiAgICBpZiAoIXRoaXMucGhhc2VTdGVwKSByZXR1cm47XHJcbiAgICB0aGlzLnBoYXNlICs9IHRoaXMucGhhc2VTdGVwO1xyXG4gICAgY29uc3QgYW1wID0gKHRoaXMubWF4U2l6ZSAtIHRoaXMubWluU2l6ZSkgKiAwLjU7XHJcbiAgICB0aGlzLnNpemUgPSB0aGlzLm1pblNpemUgKyBhbXAgKyBhbXAgKiBNYXRoLnNpbih0aGlzLnBoYXNlKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIENyZWF0ZSB0aGUgcGl4ZWwgY2FudmFzIGhvdmVyIGVmZmVjdCBmb3IgYSB0aW1lbGluZSBjYXJkLlxyXG5jb25zdCBjcmVhdGVQaXhlbEVmZmVjdCA9IChjYXJkRWw6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgaWYgKCFjYXJkRWwpIHJldHVybiBudWxsO1xyXG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XHJcbiAgY2FudmFzLmNsYXNzTmFtZSA9IFwidGltZWxpbmUtcGl4ZWwtY2FudmFzXCI7XHJcbiAgY2FyZEVsLmFwcGVuZENoaWxkKGNhbnZhcyk7XHJcblxyXG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgaWYgKCFjdHgpIHtcclxuICAgIGNhbnZhcy5yZW1vdmUoKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgcmVkdWNlZE1vdGlvbiA9IHdpbmRvdy5tYXRjaE1lZGlhICYmIHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSlcIikubWF0Y2hlcztcclxuICBjb25zdCBzdGF0ZTogUGl4ZWxTdGF0ZSA9IHtcclxuICAgIGNhbnZhcyxcclxuICAgIGN0eCxcclxuICAgIHBpeGVsczogW10sXHJcbiAgICBhbmltSWQ6IG51bGwsXHJcbiAgICBsYXN0VGltZTogcGVyZm9ybWFuY2Uubm93KCksXHJcbiAgICByZWR1Y2VkTW90aW9uLFxyXG4gICAgd2lkdGg6IDAsXHJcbiAgICBoZWlnaHQ6IDAsXHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaW5pdFBpeGVscyA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlY3QgPSBjYXJkRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVjdC53aWR0aCkpO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihyZWN0LmhlaWdodCkpO1xyXG4gICAgaWYgKCF3aWR0aCB8fCAhaGVpZ2h0KSByZXR1cm47XHJcblxyXG4gICAgc3RhdGUud2lkdGggPSB3aWR0aDtcclxuICAgIHN0YXRlLmhlaWdodCA9IGhlaWdodDtcclxuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3dpZHRofXB4YDtcclxuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xyXG5cclxuICAgIGNvbnN0IGdhcCA9IE1hdGgubWF4KDMsIE1hdGguZmxvb3IoUElYRUxfR0FQKSk7XHJcbiAgICBjb25zdCBzcGVlZCA9IGdldEVmZmVjdGl2ZVNwZWVkKFBJWEVMX1NQRUVELCByZWR1Y2VkTW90aW9uKTtcclxuICAgIGNvbnN0IHBpeGVsczogUGl4ZWxbXSA9IFtdO1xyXG5cclxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHggKz0gZ2FwKSB7XHJcbiAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5ICs9IGdhcCkge1xyXG4gICAgICAgIGNvbnN0IGNvbG9yID0gUElYRUxfQ09MT1JTW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIFBJWEVMX0NPTE9SUy5sZW5ndGgpXTtcclxuICAgICAgICBjb25zdCBkeCA9IHggLSB3aWR0aCAvIDI7XHJcbiAgICAgICAgY29uc3QgZHkgPSB5IC0gaGVpZ2h0IC8gMjtcclxuICAgICAgICBjb25zdCBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XHJcbiAgICAgICAgY29uc3QgZGVsYXkgPSByZWR1Y2VkTW90aW9uID8gMCA6IGRpc3RhbmNlICogMC4zNTtcclxuICAgICAgICBwaXhlbHMucHVzaChuZXcgUGl4ZWwoY2FudmFzLCBjdHgsIHgsIHksIGNvbG9yLCBzcGVlZCwgZGVsYXkpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRlLnBpeGVscyA9IHBpeGVscztcclxuICB9O1xyXG5cclxuICBjb25zdCBkb0FuaW1hdGUgPSAoZm5OYW1lOiBcImFwcGVhclwiIHwgXCJkaXNhcHBlYXJcIikgPT4ge1xyXG4gICAgc3RhdGUuYW5pbUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGRvQW5pbWF0ZShmbk5hbWUpKTtcclxuICAgIGNvbnN0IHRpbWVOb3cgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgIGNvbnN0IHRpbWVQYXNzZWQgPSB0aW1lTm93IC0gc3RhdGUubGFzdFRpbWU7XHJcbiAgICBjb25zdCB0aW1lSW50ZXJ2YWwgPSAxMDAwIC8gNjA7XHJcblxyXG4gICAgaWYgKHRpbWVQYXNzZWQgPCB0aW1lSW50ZXJ2YWwpIHJldHVybjtcclxuICAgIHN0YXRlLmxhc3RUaW1lID0gdGltZU5vdyAtICh0aW1lUGFzc2VkICUgdGltZUludGVydmFsKTtcclxuXHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHN0YXRlLndpZHRoLCBzdGF0ZS5oZWlnaHQpO1xyXG5cclxuICAgIGxldCBhbGxJZGxlID0gdHJ1ZTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RhdGUucGl4ZWxzLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGNvbnN0IHBpeGVsID0gc3RhdGUucGl4ZWxzW2ldO1xyXG4gICAgICBwaXhlbFtmbk5hbWVdKCk7XHJcbiAgICAgIGlmICghcGl4ZWwuaXNJZGxlKSBhbGxJZGxlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoYWxsSWRsZSAmJiBzdGF0ZS5hbmltSWQpIHtcclxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhdGUuYW5pbUlkKTtcclxuICAgICAgc3RhdGUuYW5pbUlkID0gbnVsbDtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBjb25zdCBoYW5kbGVBbmltYXRpb24gPSAobmFtZTogXCJhcHBlYXJcIiB8IFwiZGlzYXBwZWFyXCIpID0+IHtcclxuICAgIGlmICghc3RhdGUucGl4ZWxzLmxlbmd0aCkgcmV0dXJuO1xyXG4gICAgaWYgKHN0YXRlLmFuaW1JZCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhdGUuYW5pbUlkKTtcclxuICAgIHN0YXRlLmxhc3RUaW1lID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICBzdGF0ZS5hbmltSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gZG9BbmltYXRlKG5hbWUpKTtcclxuICB9O1xyXG5cclxuICBjb25zdCBvbkVudGVyID0gKCkgPT4gaGFuZGxlQW5pbWF0aW9uKFwiYXBwZWFyXCIpO1xyXG4gIGNvbnN0IG9uTGVhdmUgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJkaXNhcHBlYXJcIik7XHJcblxyXG4gIGNhcmRFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbkVudGVyKTtcclxuICBjYXJkRWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25MZWF2ZSk7XHJcblxyXG4gIGxldCBybzogUmVzaXplT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcclxuICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICBybyA9IG5ldyBSZXNpemVPYnNlcnZlcihpbml0UGl4ZWxzKTtcclxuICAgIHJvLm9ic2VydmUoY2FyZEVsKTtcclxuICB9XHJcblxyXG4gIGluaXRQaXhlbHMoKTtcclxuXHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGNhcmRFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBvbkVudGVyKTtcclxuICAgIGNhcmRFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbkxlYXZlKTtcclxuICAgIGlmIChzdGF0ZS5hbmltSWQpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHN0YXRlLmFuaW1JZCk7XHJcbiAgICBpZiAocm8pIHJvLmRpc2Nvbm5lY3QoKTtcclxuICAgIGNhbnZhcy5yZW1vdmUoKTtcclxuICB9O1xyXG59O1xyXG5cclxuLy8gU2hvcnRlbiBvdmVyZmxvd2luZyB0ZXh0IHdpdGggYSBjb21wdXRlZCBlbGxpcHNpcy5cclxuY29uc3QgYXBwbHlFbGxpcHNpcyA9IChlbDogSFRNTEVsZW1lbnQsIGZ1bGxUZXh0OiBzdHJpbmcsIG11bHRpTGluZTogYm9vbGVhbikgPT4ge1xyXG4gIGlmICghZWwgfHwgIWZ1bGxUZXh0KSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKG11bHRpTGluZSAmJiBlbC5jbGllbnRIZWlnaHQgPT09IDApIHJldHVybiBmYWxzZTtcclxuICBpZiAoIW11bHRpTGluZSAmJiBlbC5jbGllbnRXaWR0aCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBpZiAobXVsdGlMaW5lKSB7XHJcbiAgICBjb25zdCBjb21wdXRlZCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKTtcclxuICAgIGxldCBsaW5lSGVpZ2h0ID0gTnVtYmVyLnBhcnNlRmxvYXQoY29tcHV0ZWQubGluZUhlaWdodCk7XHJcbiAgICAvLyBTb21lIGJyb3dzZXJzIHJldHVybiB1bml0bGVzcyBsaW5lLWhlaWdodCB2YWx1ZXMgZm9yIGNvbXB1dGVkIHN0eWxlcy5cclxuICAgIC8vIENvbnZlcnQgdGlueSB1bml0bGVzcyB2YWx1ZXMgdXNpbmcgZm9udC1zaXplIHRvIGF2b2lkIGNvbGxhcHNpbmcgdGV4dC5cclxuICAgIGlmIChOdW1iZXIuaXNGaW5pdGUobGluZUhlaWdodCkgJiYgbGluZUhlaWdodCA+IDAgJiYgbGluZUhlaWdodCA8IDgpIHtcclxuICAgICAgY29uc3QgZm9udFNpemUgPSBOdW1iZXIucGFyc2VGbG9hdChjb21wdXRlZC5mb250U2l6ZSk7XHJcbiAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoZm9udFNpemUpICYmIGZvbnRTaXplID4gMCkge1xyXG4gICAgICAgIGxpbmVIZWlnaHQgPSBsaW5lSGVpZ2h0ICogZm9udFNpemU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKGxpbmVIZWlnaHQpKSB7XHJcbiAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgbGluZUhlaWdodCA9IHJlY3QuaGVpZ2h0ID4gMCA/IHJlY3QuaGVpZ2h0IC8gMiA6IDA7XHJcbiAgICB9XHJcbiAgICBpZiAobGluZUhlaWdodCA+IDApIHtcclxuICAgICAgZWwuc3R5bGUubWF4SGVpZ2h0ID0gYCR7TWF0aC5yb3VuZChsaW5lSGVpZ2h0ICogMil9cHhgO1xyXG4gICAgICBlbC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbC50ZXh0Q29udGVudCA9IGZ1bGxUZXh0O1xyXG5cclxuICBjb25zdCBpc092ZXJmbG93aW5nID0gKCkgPT4gKFxyXG4gICAgbXVsdGlMaW5lXHJcbiAgICAgID8gZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICsgMVxyXG4gICAgICA6IGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggKyAxXHJcbiAgKTtcclxuXHJcbiAgaWYgKCFpc092ZXJmbG93aW5nKCkpIHtcclxuICAgIGVsLmRhdGFzZXQucHJldmlldyA9IFwiMFwiO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbGV0IGxvdyA9IDA7XHJcbiAgbGV0IGhpZ2ggPSBmdWxsVGV4dC5sZW5ndGg7XHJcbiAgbGV0IGJlc3QgPSAwO1xyXG5cclxuICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcclxuICAgIGNvbnN0IG1pZCA9IE1hdGguZmxvb3IoKGxvdyArIGhpZ2gpIC8gMik7XHJcbiAgICBjb25zdCBjYW5kaWRhdGUgPSBgJHtmdWxsVGV4dC5zbGljZSgwLCBNYXRoLm1heCgwLCBtaWQpKS50cmltRW5kKCl9JHtFTExJUFNJU31gO1xyXG4gICAgZWwudGV4dENvbnRlbnQgPSBjYW5kaWRhdGU7XHJcbiAgICBpZiAoaXNPdmVyZmxvd2luZygpKSB7XHJcbiAgICAgIGhpZ2ggPSBtaWQgLSAxO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgYmVzdCA9IG1pZDtcclxuICAgICAgbG93ID0gbWlkICsgMTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVsLnRleHRDb250ZW50ID0gYCR7ZnVsbFRleHQuc2xpY2UoMCwgTWF0aC5tYXgoMCwgYmVzdCkpLnRyaW1FbmQoKX0ke0VMTElQU0lTfWA7XHJcbiAgZWwuZGF0YXNldC5wcmV2aWV3ID0gXCIxXCI7XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vLyBPd25zIHRvb2x0aXAsIGVsbGlwc2lzLCBhbmQgcGl4ZWwgZWZmZWN0cyBmb3IgdGltZWxpbmUgY2FyZHMuXHJcbmV4cG9ydCBjb25zdCB1c2VUaW1lbGluZUNhcmRFZmZlY3RzID0gKHtcclxuICBjb250YWluZXJSZWYsXHJcbiAgZXJyb3JNZXNzYWdlLFxyXG4gIGl0ZW1zLFxyXG4gIHJlc29sdmVDbGlja2FibGVDYXJkLFxyXG59OiBVc2VUaW1lbGluZUNhcmRFZmZlY3RzQXJncykgPT4ge1xyXG4gIGNvbnN0IHRvb2x0aXBSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB0b29sdGlwQW5jaG9yUmVmID0gdXNlUmVmPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgdG9vbHRpcENsb3NlQm91bmRSZWYgPSB1c2VSZWYoZmFsc2UpO1xyXG5cclxuICAvLyBFbnN1cmUgdGhlIHNoYXJlZCB0b29sdGlwIGVsZW1lbnQgZXhpc3RzIG9uY2UuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0b29sdGlwUmVmLmN1cnJlbnQpIHJldHVybjtcclxuICAgIGxldCB0b29sdGlwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aW1lbGluZVRvb2x0aXBcIikgYXMgSFRNTERpdkVsZW1lbnQgfCBudWxsO1xyXG4gICAgaWYgKCF0b29sdGlwKSB7XHJcbiAgICAgIHRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICB0b29sdGlwLmlkID0gXCJ0aW1lbGluZVRvb2x0aXBcIjtcclxuICAgICAgdG9vbHRpcC5jbGFzc05hbWUgPSBcInRpbWVsaW5lLXRvb2x0aXBcIjtcclxuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwKTtcclxuICAgIH1cclxuICAgIHRvb2x0aXBSZWYuY3VycmVudCA9IHRvb2x0aXA7XHJcbiAgfSwgW10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyUmVmLmN1cnJlbnQ7XHJcbiAgICBjb25zdCB0b29sdGlwRWwgPSB0b29sdGlwUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWNvbnRhaW5lciB8fCAhdG9vbHRpcEVsKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgY2xlYW51cHM6IEFycmF5PCgpID0+IHZvaWQ+ID0gW107XHJcblxyXG4gICAgLy8gQ2xvc2UgdG9vbHRpcCBvbiBvdXRzaWRlIGludGVyYWN0aW9uLlxyXG4gICAgaWYgKCF0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50KSB7XHJcbiAgICAgIHRvb2x0aXBDbG9zZUJvdW5kUmVmLmN1cnJlbnQgPSB0cnVlO1xyXG4gICAgICBjb25zdCBvblBvaW50ZXJEb3duID0gKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoIXRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgYW5jaG9yID0gdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50O1xyXG4gICAgICAgIGlmIChhbmNob3IgJiYgYW5jaG9yLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSkgcmV0dXJuO1xyXG4gICAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCBvbktleURvd24gPSAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcclxuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uUG9pbnRlckRvd24sIHRydWUpO1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gICAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93biwgdHJ1ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcclxuICAgICAgICB0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50ID0gZmFsc2U7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNob3cgdG9vbHRpcCBjb250ZW50IGNlbnRlcmVkIG9uIHNjcmVlbi5cclxuICAgIGNvbnN0IHNob3dUb29sdGlwID0gKHRleHQ6IHN0cmluZywgYW5jaG9yPzogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgdG9vbHRpcEVsLnRleHRDb250ZW50ID0gdGV4dDtcclxuICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5hZGQoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBhbmNob3IgfHwgbnVsbDtcclxuXHJcbiAgICAgIGNvbnN0IGNlbnRlclggPSBNYXRoLnJvdW5kKHdpbmRvdy5pbm5lcldpZHRoIC8gMik7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5sZWZ0ID0gYCR7Y2VudGVyWH1weGA7XHJcblxyXG4gICAgICBjb25zdCBtYXJnaW4gPSAxMjtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLm1heEhlaWdodCA9IGAke01hdGgucm91bmQod2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPKX1weGA7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5vdmVyZmxvd1kgPSBcImF1dG9cIjtcclxuXHJcbiAgICAgIGxldCBmb250U2l6ZSA9IFRPT0xUSVBfQkFTRV9GT05UO1xyXG4gICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XHJcblxyXG4gICAgICBsZXQgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPO1xyXG4gICAgICB3aGlsZSAocmVjdC5oZWlnaHQgPiBtYXhIZWlnaHQgJiYgZm9udFNpemUgPiBUT09MVElQX01JTl9GT05UKSB7XHJcbiAgICAgICAgZm9udFNpemUgLT0gMTtcclxuICAgICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XHJcbiAgICAgICAgcmVjdCA9IHRvb2x0aXBFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgY2VudGVyWSA9IE1hdGgucm91bmQoKHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0KSAvIDIpO1xyXG4gICAgICBsZXQgdG9wID0gTnVtYmVyLmlzRmluaXRlKGNlbnRlclkpID8gY2VudGVyWSA6IG1hcmdpbjtcclxuICAgICAgY29uc3QgbWluVG9wID0gbWFyZ2luO1xyXG4gICAgICBjb25zdCBtYXhUb3AgPSBNYXRoLm1heChtYXJnaW4sIHdpbmRvdy5pbm5lckhlaWdodCAtIHJlY3QuaGVpZ2h0IC0gbWFyZ2luKTtcclxuICAgICAgaWYgKHRvcCA8IG1pblRvcCkgdG9wID0gbWluVG9wO1xyXG4gICAgICBpZiAodG9wID4gbWF4VG9wKSB0b3AgPSBtYXhUb3A7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS50b3AgPSBgJHtNYXRoLnJvdW5kKHRvcCl9cHhgO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBIaWRlIHRvb2x0aXAgY29udGVudC5cclxuICAgIGNvbnN0IGhpZGVUb29sdGlwID0gKCkgPT4ge1xyXG4gICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIERlY2lkZSBpZiBhIHRvb2x0aXAgc2hvdWxkIGRpc3BsYXkuXHJcbiAgICBjb25zdCBzaG91bGRQcmV2aWV3ID0gKGVsOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICBpZiAoIWVsLmRhdGFzZXQgfHwgIWVsLmRhdGFzZXQuZnVsbHRleHQpIHJldHVybiBmYWxzZTtcclxuICAgICAgaWYgKGVsLmRhdGFzZXQucHJldmlldyA9PT0gXCIxXCIpIHJldHVybiB0cnVlO1xyXG4gICAgICByZXR1cm4gZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCArIDEgfHwgZWwuc2Nyb2xsSGVpZ2h0ID4gZWwuY2xpZW50SGVpZ2h0ICsgMTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVzb2x2ZVRvb2x0aXBUYXJnZXQgPSAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IHtcclxuICAgICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XHJcbiAgICAgIGlmICghbm9kZSB8fCB0eXBlb2Ygbm9kZS5jbG9zZXN0ICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xyXG4gICAgICBjb25zdCB0ZXh0RWwgPSBub2RlLmNsb3Nlc3Q8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLW5hbWUsIC50aW1lbGluZS1kZXNjLXRleHRcIik7XHJcbiAgICAgIGlmICghdGV4dEVsIHx8ICFjb250YWluZXIuY29udGFpbnModGV4dEVsKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgIHJldHVybiB0ZXh0RWw7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHNob3dUb29sdGlwRm9yRWxlbWVudCA9IChlbDogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XHJcbiAgICAgIGlmICghZWwpIHJldHVybjtcclxuICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQuZnVsbHRleHQgfHwgZWwudGV4dENvbnRlbnQgfHwgXCJcIjtcclxuICAgICAgaWYgKCF0ZXh0IHx8ICFzaG91bGRQcmV2aWV3KGVsKSkgcmV0dXJuO1xyXG4gICAgICBzaG93VG9vbHRpcCh0ZXh0LCBlbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBhY3RpdmVUb29sdGlwRWw6IEhUTUxFbGVtZW50IHwgbnVsbCA9IG51bGw7XHJcbiAgICBsZXQgcHJlc3NUaW1lcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgY29uc3QgY2xlYXJQcmVzc1RpbWVyID0gKCkgPT4ge1xyXG4gICAgICBpZiAocHJlc3NUaW1lciA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQocHJlc3NUaW1lcik7XHJcbiAgICAgIHByZXNzVGltZXIgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlT3ZlciA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0ZXh0RWwgPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC50YXJnZXQpO1xyXG4gICAgICBpZiAoIXRleHRFbCkgcmV0dXJuO1xyXG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSB0ZXh0RWw7XHJcbiAgICAgIHNob3dUb29sdGlwRm9yRWxlbWVudCh0ZXh0RWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlT3V0ID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IGZyb20gPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC50YXJnZXQpO1xyXG4gICAgICBpZiAoIWZyb20pIHJldHVybjtcclxuICAgICAgY29uc3QgdG8gPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC5yZWxhdGVkVGFyZ2V0KTtcclxuICAgICAgaWYgKHRvICYmIHRvID09PSBmcm9tKSByZXR1cm47XHJcbiAgICAgIGhpZGVUb29sdGlwKCk7XHJcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gKCkgPT4ge1xyXG4gICAgICBpZiAoIWFjdGl2ZVRvb2x0aXBFbCkgcmV0dXJuO1xyXG4gICAgICBpZiAoIXRvb2x0aXBFbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ2aXNpYmxlXCIpKSByZXR1cm47XHJcbiAgICAgIHNob3dUb29sdGlwRm9yRWxlbWVudChhY3RpdmVUb29sdGlwRWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblRvdWNoU3RhcnQgPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgdGV4dEVsID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgaWYgKCF0ZXh0RWwpIHJldHVybjtcclxuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gdGV4dEVsO1xyXG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcclxuICAgICAgcHJlc3NUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzaG93VG9vbHRpcEZvckVsZW1lbnQodGV4dEVsKTtcclxuICAgICAgfSwgVE9PTFRJUF9UT1VDSF9ERUxBWV9NUyk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uVG91Y2hNb3ZlID0gKCkgPT4ge1xyXG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcclxuICAgICAgaGlkZVRvb2x0aXAoKTtcclxuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25Ub3VjaEVuZCA9ICgpID0+IHtcclxuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG9uTW91c2VPdmVyKTtcclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgb25Nb3VzZU91dCk7XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Ub3VjaFN0YXJ0LCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBvblRvdWNoRW5kLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcblxyXG4gICAgY29uc3Qgb25TZWxlY3RTdGFydCA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgaWYgKCFyZXNvbHZlQ2xpY2thYmxlQ2FyZChldmVudC50YXJnZXQpKSByZXR1cm47XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9O1xyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzZWxlY3RzdGFydFwiLCBvblNlbGVjdFN0YXJ0KTtcclxuXHJcbiAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgb25Nb3VzZU92ZXIpO1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIG9uTW91c2VPdXQpO1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvblRvdWNoU3RhcnQpO1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZSk7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgb25Ub3VjaEVuZCk7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2VsZWN0c3RhcnRcIiwgb25TZWxlY3RTdGFydCk7XHJcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKCFlcnJvck1lc3NhZ2UpIHtcclxuICAgICAgY29uc3QgY2FyZHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZFwiKTtcclxuICAgICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xyXG4gICAgICAgIGlmICghY2FyZC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0aW1lbGluZS1jYXJkLS1ub2RhdGFcIikpIHtcclxuICAgICAgICAgIGNvbnN0IGNsZWFudXBQaXhlbCA9IGNyZWF0ZVBpeGVsRWZmZWN0KGNhcmQpO1xyXG4gICAgICAgICAgaWYgKGNsZWFudXBQaXhlbCkgY2xlYW51cHMucHVzaChjbGVhbnVwUGl4ZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBmcmFtZUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGV4dEVscyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1uYW1lLCAudGltZWxpbmUtZGVzYy10ZXh0XCIpO1xyXG4gICAgICAgIHRleHRFbHMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICAgIGNvbnN0IHRleHQgPSBlbC5kYXRhc2V0LmZ1bGx0ZXh0IHx8IGVsLnRleHRDb250ZW50IHx8IFwiXCI7XHJcbiAgICAgICAgICBjb25zdCBpc011bHRpTGluZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWVsaW5lLWRlc2MtdGV4dFwiKTtcclxuICAgICAgICAgIGNvbnN0IHRyaW1tZWRUZXh0ID0gU3RyaW5nKHRleHQgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgICAgICAgY29uc3QgZGlkRWxsaXBzaXMgPSBhcHBseUVsbGlwc2lzKGVsLCB0cmltbWVkVGV4dCwgaXNNdWx0aUxpbmUpO1xyXG4gICAgICAgICAgaWYgKGRpZEVsbGlwc2lzICYmIGVsLnRleHRDb250ZW50ID09PSBFTExJUFNJUyAmJiB0cmltbWVkVGV4dC5sZW5ndGggPiAzICYmIGVsLmNsaWVudFdpZHRoID4gNjQpIHtcclxuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0cmltbWVkVGV4dDtcclxuICAgICAgICAgICAgZWwuZGF0YXNldC5wcmV2aWV3ID0gXCIxXCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY2xlYW51cHMucHVzaCgoKSA9PiB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoZnJhbWVJZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFudXBzLmZvckVhY2goKGNsZWFudXApID0+IGNsZWFudXAoKSk7XHJcbiAgICB9O1xyXG4gIH0sIFtjb250YWluZXJSZWYsIGVycm9yTWVzc2FnZSwgaXRlbXMsIHJlc29sdmVDbGlja2FibGVDYXJkXSk7XHJcbn07XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiwgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IFNwaW5uZXIgZnJvbSBcIi4vU3Bpbm5lci50c3hcIjtcclxuXHJcbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcclxuICBmaXJzdD86IHN0cmluZztcclxuICBwcmV2Pzogc3RyaW5nO1xyXG4gIG5leHQ/OiBzdHJpbmc7XHJcbiAgbGFzdD86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgQ29tcGFjdFBhZ2luYXRpb25Qcm9wcyA9IHtcclxuICB0b3RhbFBhZ2VzOiBudW1iZXI7XHJcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcclxuICBwYWdlV2luZG93PzogbnVtYmVyO1xyXG4gIG9uUGFnZUNoYW5nZTogKHBhZ2U6IG51bWJlcikgPT4gdm9pZDtcclxuICBsYWJlbHM/OiBQYWdpbmF0aW9uTGFiZWxzO1xyXG4gIGNsYXNzTmFtZT86IHN0cmluZztcclxuICBsb2FkaW5nPzogYm9vbGVhbjtcclxufTtcclxuXHJcbmNvbnN0IERFRkFVTFRfV0lORE9XID0gNjtcclxuXHJcbnR5cGUgUGFnaW5hdGlvbkxvY2tXaW5kb3cgPSBXaW5kb3cgJiB7XHJcbiAgX19pbmRQYWdpbmF0aW9uTG9ja0NvdW50PzogbnVtYmVyO1xyXG4gIF9faW5kUGFnaW5hdGlvblByZXZPdmVyZmxvdz86IHN0cmluZztcclxuICBfX2luZFBhZ2luYXRpb25QcmV2VG91Y2hBY3Rpb24/OiBzdHJpbmc7XHJcbn07XHJcblxyXG4vLyBDb21wYWN0IHBhZ2luYXRpb24gd2l0aCA2LXBhZ2Ugd2luZG93IGFuZCBlZGdlIGNvbnRyb2xzLlxyXG5jb25zdCBDb21wYWN0UGFnaW5hdGlvbiA9IGZvcndhcmRSZWY8SFRNTERpdkVsZW1lbnQsIENvbXBhY3RQYWdpbmF0aW9uUHJvcHM+KFxyXG4gICh7IHRvdGFsUGFnZXMsIGN1cnJlbnRQYWdlLCBwYWdlV2luZG93ID0gREVGQVVMVF9XSU5ET1csIG9uUGFnZUNoYW5nZSwgbGFiZWxzLCBjbGFzc05hbWUsIGxvYWRpbmcgfSwgcmVmKSA9PiB7XHJcbiAgICBjb25zdCBzYWZlVG90YWwgPSBNYXRoLm1heCgwLCB0b3RhbFBhZ2VzIHx8IDApO1xyXG4gICAgY29uc3Qgc2FmZUN1cnJlbnQgPSBNYXRoLm1pbihNYXRoLm1heCgxLCBjdXJyZW50UGFnZSB8fCAxKSwgc2FmZVRvdGFsIHx8IDEpO1xyXG4gICAgY29uc3Qgd2luZG93U2l6ZSA9IE1hdGgubWF4KDEsIHBhZ2VXaW5kb3cgfHwgREVGQVVMVF9XSU5ET1cpO1xyXG4gICAgY29uc3QgaGFzTG9hZGluZ1NpZ25hbCA9IHR5cGVvZiBsb2FkaW5nID09PSBcImJvb2xlYW5cIjtcclxuICAgIGNvbnN0IGlzTG9hZGluZyA9IGxvYWRpbmcgPT09IHRydWU7XHJcbiAgICBjb25zdCBbaXNQYWdlVHJhbnNpdGlvblBlbmRpbmcsIHNldElzUGFnZVRyYW5zaXRpb25QZW5kaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICAgIGNvbnN0IHNob3dQYWdlU3Bpbm5lciA9IGhhc0xvYWRpbmdTaWduYWwgJiYgaXNQYWdlVHJhbnNpdGlvblBlbmRpbmc7XHJcblxyXG4gICAgY29uc3Qgc2hvd1BhZ2luYXRpb24gPSBzYWZlVG90YWwgPiAxO1xyXG4gICAgY29uc3Qgc2hvd0VkZ2VOYXYgPSBzYWZlVG90YWwgPiB3aW5kb3dTaXplO1xyXG4gICAgY29uc3QgY2FuSnVtcFRvU3RhcnQgPSBzYWZlQ3VycmVudCA+IHdpbmRvd1NpemU7XHJcbiAgICBjb25zdCBjYW5Hb1ByZXYgPSBzYWZlQ3VycmVudCA+IDE7XHJcbiAgICBjb25zdCBjYW5Hb05leHQgPSBzYWZlQ3VycmVudCA8IHNhZmVUb3RhbDtcclxuXHJcbiAgICBjb25zdCBwYWdlTnVtYmVycyA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgICBpZiAoIXNhZmVUb3RhbCkgcmV0dXJuIFtdO1xyXG4gICAgICBjb25zdCB3aW5kb3dTdGFydCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IoKHNhZmVDdXJyZW50IC0gMSkgLyB3aW5kb3dTaXplKSAqIHdpbmRvd1NpemUgKyAxKTtcclxuICAgICAgY29uc3Qgd2luZG93RW5kID0gTWF0aC5taW4oc2FmZVRvdGFsLCB3aW5kb3dTdGFydCArIHdpbmRvd1NpemUgLSAxKTtcclxuICAgICAgcmV0dXJuIEFycmF5LmZyb20oeyBsZW5ndGg6IHdpbmRvd0VuZCAtIHdpbmRvd1N0YXJ0ICsgMSB9LCAoX3ZhbCwgaWR4KSA9PiB3aW5kb3dTdGFydCArIGlkeCk7XHJcbiAgICB9LCBbc2FmZUN1cnJlbnQsIHNhZmVUb3RhbCwgd2luZG93U2l6ZV0pO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgIGlmICghaGFzTG9hZGluZ1NpZ25hbCB8fCAhaXNQYWdlVHJhbnNpdGlvblBlbmRpbmcpIHJldHVybjtcclxuICAgICAgaWYgKGlzTG9hZGluZykgcmV0dXJuO1xyXG4gICAgICBzZXRJc1BhZ2VUcmFuc2l0aW9uUGVuZGluZyhmYWxzZSk7XHJcbiAgICB9LCBbaGFzTG9hZGluZ1NpZ25hbCwgaXNMb2FkaW5nLCBpc1BhZ2VUcmFuc2l0aW9uUGVuZGluZ10pO1xyXG5cclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgIGlmICghc2hvd1BhZ2VTcGlubmVyKSByZXR1cm47XHJcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3QgbG9ja1dpbmRvdyA9IHdpbmRvdyBhcyBQYWdpbmF0aW9uTG9ja1dpbmRvdztcclxuICAgICAgY29uc3QgbG9ja0NvdW50ID0gTnVtYmVyKGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uTG9ja0NvdW50IHx8IDApO1xyXG4gICAgICBpZiAobG9ja0NvdW50IDwgMSkge1xyXG4gICAgICAgIGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uUHJldk92ZXJmbG93ID0gZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdztcclxuICAgICAgICBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZUb3VjaEFjdGlvbiA9IGRvY3VtZW50LmJvZHkuc3R5bGUudG91Y2hBY3Rpb247XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3VjaEFjdGlvbiA9IFwibm9uZVwiO1xyXG4gICAgICB9XHJcbiAgICAgIGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uTG9ja0NvdW50ID0gbG9ja0NvdW50ICsgMTtcclxuXHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudENvdW50ID0gTnVtYmVyKGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uTG9ja0NvdW50IHx8IDApO1xyXG4gICAgICAgIGNvbnN0IG5leHRDb3VudCA9IE1hdGgubWF4KDAsIGN1cnJlbnRDb3VudCAtIDEpO1xyXG4gICAgICAgIGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uTG9ja0NvdW50ID0gbmV4dENvdW50O1xyXG4gICAgICAgIGlmIChuZXh0Q291bnQgPCAxKSB7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25QcmV2T3ZlcmZsb3cgfHwgXCJcIjtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudG91Y2hBY3Rpb24gPSBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZUb3VjaEFjdGlvbiB8fCBcIlwiO1xyXG4gICAgICAgICAgZGVsZXRlIGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uUHJldk92ZXJmbG93O1xyXG4gICAgICAgICAgZGVsZXRlIGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uUHJldlRvdWNoQWN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0sIFtzaG93UGFnZVNwaW5uZXJdKTtcclxuXHJcbiAgICBjb25zdCByZXF1ZXN0UGFnZUNoYW5nZSA9IChwYWdlOiBudW1iZXIpID0+IHtcclxuICAgICAgaWYgKHBhZ2UgPCAxIHx8IHBhZ2UgPiBzYWZlVG90YWwpIHJldHVybjtcclxuICAgICAgaWYgKHBhZ2UgPT09IHNhZmVDdXJyZW50KSByZXR1cm47XHJcbiAgICAgIGlmIChoYXNMb2FkaW5nU2lnbmFsKSB7XHJcbiAgICAgICAgc2V0SXNQYWdlVHJhbnNpdGlvblBlbmRpbmcodHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgb25QYWdlQ2hhbmdlKHBhZ2UpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoIXNob3dQYWdpbmF0aW9uKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8PlxyXG4gICAgICAgIHtzaG93UGFnZVNwaW5uZXIgPyAoXHJcbiAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctc2xhdGUtMTAwXCJcclxuICAgICAgICAgICAgb25XaGVlbD17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgb25Ub3VjaE1vdmU9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTEwIHctMTBcIiAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGlkPVwicGFnaW5hdGlvblwiXG4gICAgICAgICAgcmVmPXtyZWZ9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgXCJwYWdpbmF0aW9uIGdyaWQgZ3JpZC1jb2xzLVsxZnJfYXV0b18xZnJdIGl0ZW1zLWNlbnRlciBnYXAtMVwiLFxuICAgICAgICAgICAgY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICAgICApfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEganVzdGlmeS1zdGFydFwiPlxyXG4gICAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuSnVtcFRvU3RhcnQgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5maXJzdH1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RQYWdlQ2hhbmdlKDEpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuNVwiIGNsYXNzTmFtZT1cInctNSBoLTUgbXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xOC43NSA0LjUtNy41IDcuNSA3LjUgNy41bS02LTE1TDUuMjUgMTJsNy41IDcuNVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvUHJldiAmJiAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHM/LnByZXZ9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0UGFnZUNoYW5nZShzYWZlQ3VycmVudCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuNVwiIGNsYXNzTmFtZT1cInctNSBoLTUgbXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNS43NSAxOS41IDguMjUgMTJsNy41LTcuNVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgbWluLXctMCBmbGV4LW5vd3JhcFwiPlxyXG4gICAgICAgICAgICB7cGFnZU51bWJlcnMubWFwKChwYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBwYWdlID09PSBzYWZlQ3VycmVudDtcclxuICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICBrZXk9e2BwYWdlLSR7cGFnZX1gfVxyXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cclxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWluLXctWzI2cHhdIHB4LTIgcHktMC41IHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciB0ZXh0LVsxMHB4XSBmb250LXNlbWlib2xkIHRyYW5zaXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICAgID8gXCJiZy1wcmltYXJ5IGJvcmRlci1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LXNtXCJcclxuICAgICAgICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMzAwIHRleHQtc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1wcmltYXJ5IGhvdmVyOnRleHQtcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZyA/IFwib3BhY2l0eS02MCBjdXJzb3Itbm90LWFsbG93ZWRcIiA6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2UocGFnZSk7XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtwYWdlfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktZW5kXCI+XHJcbiAgICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5Hb05leHQgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5uZXh0fVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgKyAxKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtOC4yNSA0LjUgNy41IDcuNS03LjUgNy41XCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuR29OZXh0ICYmIChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ubGFzdH1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RQYWdlQ2hhbmdlKHNhZmVUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTUuMjUgNC41IDcuNSA3LjUtNy41IDcuNW02LTE1IDcuNSA3LjUtNy41IDcuNVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8Lz5cclxuICAgICk7XHJcbiAgfVxyXG4pO1xyXG5cclxuQ29tcGFjdFBhZ2luYXRpb24uZGlzcGxheU5hbWUgPSBcIkNvbXBhY3RQYWdpbmF0aW9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21wYWN0UGFnaW5hdGlvbjtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztBQUFDLG1CQUF5QztBQUUxQyxJQUFNLHlCQUF5QjtBQUMvQixJQUFNLDJCQUEyQjtBQUNqQyxJQUFNLG9CQUFvQjtBQUMxQixJQUFNLG1CQUFtQjtBQUN6QixJQUFNLFdBQVc7QUFDakIsSUFBTSxZQUFZO0FBQ2xCLElBQU0sY0FBYztBQUNwQixJQUFNLGVBQWUsQ0FBQywwQkFBMEIsMEJBQTBCLHdCQUF3QjtBQXFCbEcsSUFBTSxvQkFBb0IsQ0FBQyxPQUFlLGtCQUEyQjtBQUNuRSxRQUFNLE1BQU07QUFDWixRQUFNLE1BQU07QUFDWixRQUFN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
