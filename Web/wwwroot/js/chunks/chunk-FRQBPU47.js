import {
  Spinner_default,
  classNames
} from "./chunk-BYICIYT4.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

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
          "data-ind-pagination-anchor": "true",
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
                    "min-w-[26px] px-2 py-0.5 rounded-md border text-[10px] font-semibold transition",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBUT09MVElQX1RPVUNIX0RFTEFZX01TID0gMTIwO1xuY29uc3QgVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPID0gMC44O1xuY29uc3QgVE9PTFRJUF9CQVNFX0ZPTlQgPSAxMztcbmNvbnN0IFRPT0xUSVBfTUlOX0ZPTlQgPSAxMTtcbmNvbnN0IEVMTElQU0lTID0gXCIuLi5cIjtcbmNvbnN0IFBJWEVMX0dBUCA9IDU7XG5jb25zdCBQSVhFTF9TUEVFRCA9IDk1O1xuY29uc3QgUElYRUxfQ09MT1JTID0gW1wicmdiYSgwLCA0MSwgMTA3LCAwLjA4KVwiLCBcInJnYmEoMCwgNDEsIDEwNywgMC4xNilcIiwgXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMjYpXCJdO1xuXG50eXBlIFBpeGVsU3RhdGUgPSB7XG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwaXhlbHM6IFBpeGVsW107XG4gIGFuaW1JZDogbnVtYmVyIHwgbnVsbDtcbiAgbGFzdFRpbWU6IG51bWJlcjtcbiAgcmVkdWNlZE1vdGlvbjogYm9vbGVhbjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBVc2VUaW1lbGluZUNhcmRFZmZlY3RzQXJncyA9IHtcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIGl0ZW1zOiB1bmtub3duW107XG4gIHJlc29sdmVDbGlja2FibGVDYXJkOiAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IEhUTUxFbGVtZW50IHwgbnVsbDtcbn07XG5cbi8vIENvbXB1dGUgcGl4ZWwgc3BlZWQgd2hpbGUgcmVzcGVjdGluZyByZWR1Y2VkIG1vdGlvbiBwcmVmZXJlbmNlLlxuY29uc3QgZ2V0RWZmZWN0aXZlU3BlZWQgPSAodmFsdWU6IG51bWJlciwgcmVkdWNlZE1vdGlvbjogYm9vbGVhbikgPT4ge1xuICBjb25zdCBtaW4gPSAwO1xuICBjb25zdCBtYXggPSAxMDA7XG4gIGNvbnN0IHRocm90dGxlID0gMC4wMDE7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlci5wYXJzZUludChTdHJpbmcodmFsdWUpLCAxMCk7XG5cbiAgaWYgKHBhcnNlZCA8PSBtaW4gfHwgcmVkdWNlZE1vdGlvbikgcmV0dXJuIG1pbjtcbiAgaWYgKHBhcnNlZCA+PSBtYXgpIHJldHVybiBtYXggKiB0aHJvdHRsZTtcbiAgcmV0dXJuIHBhcnNlZCAqIHRocm90dGxlO1xufTtcblxuLy8gUGl4ZWwgdXNlZCBieSB0aGUgaG92ZXIgYW5pbWF0aW9uIGNhbnZhcy5cbmNsYXNzIFBpeGVsIHtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgY29sb3I6IHN0cmluZztcbiAgc3BlZWQ6IG51bWJlcjtcbiAgc2l6ZTogbnVtYmVyO1xuICBzaXplU3RlcDogbnVtYmVyO1xuICBtaW5TaXplOiBudW1iZXI7XG4gIG1heFNpemVJbnRlZ2VyOiBudW1iZXI7XG4gIG1heFNpemU6IG51bWJlcjtcbiAgcGhhc2U6IG51bWJlcjtcbiAgcGhhc2VTdGVwOiBudW1iZXI7XG4gIGRlbGF5OiBudW1iZXI7XG4gIGNvdW50ZXI6IG51bWJlcjtcbiAgY291bnRlclN0ZXA6IG51bWJlcjtcbiAgaXNJZGxlOiBib29sZWFuO1xuICBpc1JldmVyc2U6IGJvb2xlYW47XG4gIGlzU2hpbW1lcjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHg6IG51bWJlciwgeTogbnVtYmVyLCBjb2xvcjogc3RyaW5nLCBzcGVlZDogbnVtYmVyLCBkZWxheTogbnVtYmVyKSB7XG4gICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgdGhpcy5jdHggPSBjb250ZXh0O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUoMC4xLCAwLjkpICogc3BlZWQ7XG4gICAgdGhpcy5zaXplID0gMDtcbiAgICB0aGlzLnNpemVTdGVwID0gTWF0aC5yYW5kb20oKSAqIDAuMyArIDAuMTtcbiAgICB0aGlzLm1pblNpemUgPSAwLjU7XG4gICAgdGhpcy5tYXhTaXplSW50ZWdlciA9IDI7XG4gICAgdGhpcy5tYXhTaXplID0gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLm1pblNpemUsIHRoaXMubWF4U2l6ZUludGVnZXIpO1xuICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgIHRoaXMuY291bnRlclN0ZXAgPSBNYXRoLnJhbmRvbSgpICogNSArICh0aGlzLndpZHRoICsgdGhpcy5oZWlnaHQpICogMC4wMTU7XG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmV2ZXJzZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNTaGltbWVyID0gZmFsc2U7XG4gICAgdGhpcy5waGFzZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICB0aGlzLnBoYXNlU3RlcCA9IE1hdGgubWF4KDAsIHRoaXMuc3BlZWQgKiAoMC44ICsgTWF0aC5yYW5kb20oKSAqIDAuNikpO1xuICB9XG5cbiAgLy8gUmV0dXJuIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gbWluIGFuZCBtYXguXG4gIGdldFJhbmRvbVZhbHVlKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gIH1cblxuICAvLyBEcmF3IHRoZSBwaXhlbCBhdCBpdHMgY3VycmVudCBzaXplLlxuICBkcmF3KCkge1xuICAgIGNvbnN0IGNlbnRlck9mZnNldCA9IHRoaXMubWF4U2l6ZUludGVnZXIgKiAwLjUgLSB0aGlzLnNpemUgKiAwLjU7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLnggKyBjZW50ZXJPZmZzZXQsIHRoaXMueSArIGNlbnRlck9mZnNldCwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xuICB9XG5cbiAgLy8gQW5pbWF0ZSB0aGUgcGl4ZWwgYXBwZWFyaW5nLlxuICBhcHBlYXIoKSB7XG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5jb3VudGVyIDw9IHRoaXMuZGVsYXkpIHtcbiAgICAgIHRoaXMuY291bnRlciArPSB0aGlzLmNvdW50ZXJTdGVwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSkge1xuICAgICAgdGhpcy5pc1NoaW1tZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1NoaW1tZXIpIHtcbiAgICAgIHRoaXMuc2hpbW1lcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpemUgKz0gdGhpcy5zaXplU3RlcDtcbiAgICB9XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvLyBBbmltYXRlIHRoZSBwaXhlbCBkaXNhcHBlYXJpbmcuXG4gIGRpc2FwcGVhcigpIHtcbiAgICB0aGlzLmlzU2hpbW1lciA9IGZhbHNlO1xuICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgaWYgKHRoaXMuc2l6ZSA8PSAwKSB7XG4gICAgICB0aGlzLmlzSWRsZSA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2l6ZSAtPSAwLjE7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvLyBPc2NpbGxhdGUgcGl4ZWwgc2l6ZSB3aGlsZSB2aXNpYmxlLlxuICBzaGltbWVyKCkge1xuICAgIGlmICghdGhpcy5waGFzZVN0ZXApIHJldHVybjtcbiAgICB0aGlzLnBoYXNlICs9IHRoaXMucGhhc2VTdGVwO1xuICAgIGNvbnN0IGFtcCA9ICh0aGlzLm1heFNpemUgLSB0aGlzLm1pblNpemUpICogMC41O1xuICAgIHRoaXMuc2l6ZSA9IHRoaXMubWluU2l6ZSArIGFtcCArIGFtcCAqIE1hdGguc2luKHRoaXMucGhhc2UpO1xuICB9XG59XG5cbi8vIENyZWF0ZSB0aGUgcGl4ZWwgY2FudmFzIGhvdmVyIGVmZmVjdCBmb3IgYSB0aW1lbGluZSBjYXJkLlxuY29uc3QgY3JlYXRlUGl4ZWxFZmZlY3QgPSAoY2FyZEVsOiBIVE1MRWxlbWVudCkgPT4ge1xuICBpZiAoIWNhcmRFbCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gIGNhbnZhcy5jbGFzc05hbWUgPSBcInRpbWVsaW5lLXBpeGVsLWNhbnZhc1wiO1xuICBjYXJkRWwuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBpZiAoIWN0eCkge1xuICAgIGNhbnZhcy5yZW1vdmUoKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHJlZHVjZWRNb3Rpb24gPSB3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpLm1hdGNoZXM7XG4gIGNvbnN0IHN0YXRlOiBQaXhlbFN0YXRlID0ge1xuICAgIGNhbnZhcyxcbiAgICBjdHgsXG4gICAgcGl4ZWxzOiBbXSxcbiAgICBhbmltSWQ6IG51bGwsXG4gICAgbGFzdFRpbWU6IHBlcmZvcm1hbmNlLm5vdygpLFxuICAgIHJlZHVjZWRNb3Rpb24sXG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICB9O1xuXG4gIGNvbnN0IGluaXRQaXhlbHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVjdCA9IGNhcmRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVjdC53aWR0aCkpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVjdC5oZWlnaHQpKTtcbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHJldHVybjtcblxuICAgIHN0YXRlLndpZHRoID0gd2lkdGg7XG4gICAgc3RhdGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuXG4gICAgY29uc3QgZ2FwID0gTWF0aC5tYXgoMywgTWF0aC5mbG9vcihQSVhFTF9HQVApKTtcbiAgICBjb25zdCBzcGVlZCA9IGdldEVmZmVjdGl2ZVNwZWVkKFBJWEVMX1NQRUVELCByZWR1Y2VkTW90aW9uKTtcbiAgICBjb25zdCBwaXhlbHM6IFBpeGVsW10gPSBbXTtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHggKz0gZ2FwKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSArPSBnYXApIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSBQSVhFTF9DT0xPUlNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogUElYRUxfQ09MT1JTLmxlbmd0aCldO1xuICAgICAgICBjb25zdCBkeCA9IHggLSB3aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IGR5ID0geSAtIGhlaWdodCAvIDI7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgY29uc3QgZGVsYXkgPSByZWR1Y2VkTW90aW9uID8gMCA6IGRpc3RhbmNlICogMC4zNTtcbiAgICAgICAgcGl4ZWxzLnB1c2gobmV3IFBpeGVsKGNhbnZhcywgY3R4LCB4LCB5LCBjb2xvciwgc3BlZWQsIGRlbGF5KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGUucGl4ZWxzID0gcGl4ZWxzO1xuICB9O1xuXG4gIGNvbnN0IGRvQW5pbWF0ZSA9IChmbk5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XG4gICAgc3RhdGUuYW5pbUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGRvQW5pbWF0ZShmbk5hbWUpKTtcbiAgICBjb25zdCB0aW1lTm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgY29uc3QgdGltZVBhc3NlZCA9IHRpbWVOb3cgLSBzdGF0ZS5sYXN0VGltZTtcbiAgICBjb25zdCB0aW1lSW50ZXJ2YWwgPSAxMDAwIC8gNjA7XG5cbiAgICBpZiAodGltZVBhc3NlZCA8IHRpbWVJbnRlcnZhbCkgcmV0dXJuO1xuICAgIHN0YXRlLmxhc3RUaW1lID0gdGltZU5vdyAtICh0aW1lUGFzc2VkICUgdGltZUludGVydmFsKTtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc3RhdGUud2lkdGgsIHN0YXRlLmhlaWdodCk7XG5cbiAgICBsZXQgYWxsSWRsZSA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS5waXhlbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHBpeGVsID0gc3RhdGUucGl4ZWxzW2ldO1xuICAgICAgcGl4ZWxbZm5OYW1lXSgpO1xuICAgICAgaWYgKCFwaXhlbC5pc0lkbGUpIGFsbElkbGUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGFsbElkbGUgJiYgc3RhdGUuYW5pbUlkKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xuICAgICAgc3RhdGUuYW5pbUlkID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQW5pbWF0aW9uID0gKG5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XG4gICAgaWYgKCFzdGF0ZS5waXhlbHMubGVuZ3RoKSByZXR1cm47XG4gICAgaWYgKHN0YXRlLmFuaW1JZCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhdGUuYW5pbUlkKTtcbiAgICBzdGF0ZS5sYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHN0YXRlLmFuaW1JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBkb0FuaW1hdGUobmFtZSkpO1xuICB9O1xuXG4gIGNvbnN0IG9uRW50ZXIgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJhcHBlYXJcIik7XG4gIGNvbnN0IG9uTGVhdmUgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJkaXNhcHBlYXJcIik7XG5cbiAgY2FyZEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xuICBjYXJkRWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25MZWF2ZSk7XG5cbiAgbGV0IHJvOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoaW5pdFBpeGVscyk7XG4gICAgcm8ub2JzZXJ2ZShjYXJkRWwpO1xuICB9XG5cbiAgaW5pdFBpeGVscygpO1xuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2FyZEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xuICAgIGNhcmRFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbkxlYXZlKTtcbiAgICBpZiAoc3RhdGUuYW5pbUlkKSBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xuICAgIGlmIChybykgcm8uZGlzY29ubmVjdCgpO1xuICAgIGNhbnZhcy5yZW1vdmUoKTtcbiAgfTtcbn07XG5cbi8vIFNob3J0ZW4gb3ZlcmZsb3dpbmcgdGV4dCB3aXRoIGEgY29tcHV0ZWQgZWxsaXBzaXMuXG5jb25zdCBhcHBseUVsbGlwc2lzID0gKGVsOiBIVE1MRWxlbWVudCwgZnVsbFRleHQ6IHN0cmluZywgbXVsdGlMaW5lOiBib29sZWFuKSA9PiB7XG4gIGlmICghZWwgfHwgIWZ1bGxUZXh0KSByZXR1cm4gZmFsc2U7XG4gIGlmIChtdWx0aUxpbmUgJiYgZWwuY2xpZW50SGVpZ2h0ID09PSAwKSByZXR1cm4gZmFsc2U7XG4gIGlmICghbXVsdGlMaW5lICYmIGVsLmNsaWVudFdpZHRoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKG11bHRpTGluZSkge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgIGxldCBsaW5lSGVpZ2h0ID0gTnVtYmVyLnBhcnNlRmxvYXQoY29tcHV0ZWQubGluZUhlaWdodCk7XG4gICAgLy8gU29tZSBicm93c2VycyByZXR1cm4gdW5pdGxlc3MgbGluZS1oZWlnaHQgdmFsdWVzIGZvciBjb21wdXRlZCBzdHlsZXMuXG4gICAgLy8gQ29udmVydCB0aW55IHVuaXRsZXNzIHZhbHVlcyB1c2luZyBmb250LXNpemUgdG8gYXZvaWQgY29sbGFwc2luZyB0ZXh0LlxuICAgIGlmIChOdW1iZXIuaXNGaW5pdGUobGluZUhlaWdodCkgJiYgbGluZUhlaWdodCA+IDAgJiYgbGluZUhlaWdodCA8IDgpIHtcbiAgICAgIGNvbnN0IGZvbnRTaXplID0gTnVtYmVyLnBhcnNlRmxvYXQoY29tcHV0ZWQuZm9udFNpemUpO1xuICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShmb250U2l6ZSkgJiYgZm9udFNpemUgPiAwKSB7XG4gICAgICAgIGxpbmVIZWlnaHQgPSBsaW5lSGVpZ2h0ICogZm9udFNpemU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKGxpbmVIZWlnaHQpKSB7XG4gICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBsaW5lSGVpZ2h0ID0gcmVjdC5oZWlnaHQgPiAwID8gcmVjdC5oZWlnaHQgLyAyIDogMDtcbiAgICB9XG4gICAgaWYgKGxpbmVIZWlnaHQgPiAwKSB7XG4gICAgICBlbC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGxpbmVIZWlnaHQgKiAyKX1weGA7XG4gICAgICBlbC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9XG5cbiAgZWwudGV4dENvbnRlbnQgPSBmdWxsVGV4dDtcblxuICBjb25zdCBpc092ZXJmbG93aW5nID0gKCkgPT4gKFxuICAgIG11bHRpTGluZVxuICAgICAgPyBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgKyAxXG4gICAgICA6IGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggKyAxXG4gICk7XG5cbiAgaWYgKCFpc092ZXJmbG93aW5nKCkpIHtcbiAgICBlbC5kYXRhc2V0LnByZXZpZXcgPSBcIjBcIjtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgbG93ID0gMDtcbiAgbGV0IGhpZ2ggPSBmdWxsVGV4dC5sZW5ndGg7XG4gIGxldCBiZXN0ID0gMDtcblxuICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcbiAgICBjb25zdCBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xuICAgIGNvbnN0IGNhbmRpZGF0ZSA9IGAke2Z1bGxUZXh0LnNsaWNlKDAsIE1hdGgubWF4KDAsIG1pZCkpLnRyaW1FbmQoKX0ke0VMTElQU0lTfWA7XG4gICAgZWwudGV4dENvbnRlbnQgPSBjYW5kaWRhdGU7XG4gICAgaWYgKGlzT3ZlcmZsb3dpbmcoKSkge1xuICAgICAgaGlnaCA9IG1pZCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJlc3QgPSBtaWQ7XG4gICAgICBsb3cgPSBtaWQgKyAxO1xuICAgIH1cbiAgfVxuXG4gIGVsLnRleHRDb250ZW50ID0gYCR7ZnVsbFRleHQuc2xpY2UoMCwgTWF0aC5tYXgoMCwgYmVzdCkpLnRyaW1FbmQoKX0ke0VMTElQU0lTfWA7XG4gIGVsLmRhdGFzZXQucHJldmlldyA9IFwiMVwiO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIE93bnMgdG9vbHRpcCwgZWxsaXBzaXMsIGFuZCBwaXhlbCBlZmZlY3RzIGZvciB0aW1lbGluZSBjYXJkcy5cbmV4cG9ydCBjb25zdCB1c2VUaW1lbGluZUNhcmRFZmZlY3RzID0gKHtcbiAgY29udGFpbmVyUmVmLFxuICBlcnJvck1lc3NhZ2UsXG4gIGl0ZW1zLFxuICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbn06IFVzZVRpbWVsaW5lQ2FyZEVmZmVjdHNBcmdzKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgdG9vbHRpcEFuY2hvclJlZiA9IHVzZVJlZjxIVE1MRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB0b29sdGlwQ2xvc2VCb3VuZFJlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaGFyZWQgdG9vbHRpcCBlbGVtZW50IGV4aXN0cyBvbmNlLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0b29sdGlwUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBsZXQgdG9vbHRpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZWxpbmVUb29sdGlwXCIpIGFzIEhUTUxEaXZFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIXRvb2x0aXApIHtcbiAgICAgIHRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdG9vbHRpcC5pZCA9IFwidGltZWxpbmVUb29sdGlwXCI7XG4gICAgICB0b29sdGlwLmNsYXNzTmFtZSA9IFwidGltZWxpbmUtdG9vbHRpcFwiO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwKTtcbiAgICB9XG4gICAgdG9vbHRpcFJlZi5jdXJyZW50ID0gdG9vbHRpcDtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgdG9vbHRpcEVsID0gdG9vbHRpcFJlZi5jdXJyZW50O1xuICAgIGlmICghY29udGFpbmVyIHx8ICF0b29sdGlwRWwpIHJldHVybjtcblxuICAgIGNvbnN0IGNsZWFudXBzOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuXG4gICAgLy8gQ2xvc2UgdG9vbHRpcCBvbiBvdXRzaWRlIGludGVyYWN0aW9uLlxuICAgIGlmICghdG9vbHRpcENsb3NlQm91bmRSZWYuY3VycmVudCkge1xuICAgICAgdG9vbHRpcENsb3NlQm91bmRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICBjb25zdCBvblBvaW50ZXJEb3duID0gKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0b29sdGlwRWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlzaWJsZVwiKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhbmNob3IgPSB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQ7XG4gICAgICAgIGlmIChhbmNob3IgJiYgYW5jaG9yLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSkgcmV0dXJuO1xuICAgICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG4gICAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9O1xuICAgICAgY29uc3Qgb25LZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG4gICAgICAgICAgdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBvblBvaW50ZXJEb3duLCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gICAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uUG9pbnRlckRvd24sIHRydWUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICAgICAgICB0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTaG93IHRvb2x0aXAgY29udGVudCBjZW50ZXJlZCBvbiBzY3JlZW4uXG4gICAgY29uc3Qgc2hvd1Rvb2x0aXAgPSAodGV4dDogc3RyaW5nLCBhbmNob3I/OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgdG9vbHRpcEVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcbiAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IGFuY2hvciB8fCBudWxsO1xuXG4gICAgICBjb25zdCBjZW50ZXJYID0gTWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpO1xuICAgICAgdG9vbHRpcEVsLnN0eWxlLmxlZnQgPSBgJHtjZW50ZXJYfXB4YDtcblxuICAgICAgY29uc3QgbWFyZ2luID0gMTI7XG4gICAgICB0b29sdGlwRWwuc3R5bGUubWF4SGVpZ2h0ID0gYCR7TWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJIZWlnaHQgKiBUT09MVElQX01BWF9IRUlHSFRfUkFUSU8pfXB4YDtcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5vdmVyZmxvd1kgPSBcImF1dG9cIjtcblxuICAgICAgbGV0IGZvbnRTaXplID0gVE9PTFRJUF9CQVNFX0ZPTlQ7XG4gICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XG5cbiAgICAgIGxldCByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPO1xuICAgICAgd2hpbGUgKHJlY3QuaGVpZ2h0ID4gbWF4SGVpZ2h0ICYmIGZvbnRTaXplID4gVE9PTFRJUF9NSU5fRk9OVCkge1xuICAgICAgICBmb250U2l6ZSAtPSAxO1xuICAgICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XG4gICAgICAgIHJlY3QgPSB0b29sdGlwRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNlbnRlclkgPSBNYXRoLnJvdW5kKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCkgLyAyKTtcbiAgICAgIGxldCB0b3AgPSBOdW1iZXIuaXNGaW5pdGUoY2VudGVyWSkgPyBjZW50ZXJZIDogbWFyZ2luO1xuICAgICAgY29uc3QgbWluVG9wID0gbWFyZ2luO1xuICAgICAgY29uc3QgbWF4VG9wID0gTWF0aC5tYXgobWFyZ2luLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCAtIG1hcmdpbik7XG4gICAgICBpZiAodG9wIDwgbWluVG9wKSB0b3AgPSBtaW5Ub3A7XG4gICAgICBpZiAodG9wID4gbWF4VG9wKSB0b3AgPSBtYXhUb3A7XG4gICAgICB0b29sdGlwRWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICB9O1xuXG4gICAgLy8gSGlkZSB0b29sdGlwIGNvbnRlbnQuXG4gICAgY29uc3QgaGlkZVRvb2x0aXAgPSAoKSA9PiB7XG4gICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG4gICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBEZWNpZGUgaWYgYSB0b29sdGlwIHNob3VsZCBkaXNwbGF5LlxuICAgIGNvbnN0IHNob3VsZFByZXZpZXcgPSAoZWw6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICBpZiAoIWVsLmRhdGFzZXQgfHwgIWVsLmRhdGFzZXQuZnVsbHRleHQpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChlbC5kYXRhc2V0LnByZXZpZXcgPT09IFwiMVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBlbC5zY3JvbGxXaWR0aCA+IGVsLmNsaWVudFdpZHRoICsgMSB8fCBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgKyAxO1xuICAgIH07XG5cbiAgICBjb25zdCByZXNvbHZlVG9vbHRpcFRhcmdldCA9ICh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICAgIGNvbnN0IHRleHRFbCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtbmFtZSwgLnRpbWVsaW5lLWRlc2MtdGV4dFwiKTtcbiAgICAgIGlmICghdGV4dEVsIHx8ICFjb250YWluZXIuY29udGFpbnModGV4dEVsKSkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4gdGV4dEVsO1xuICAgIH07XG5cbiAgICBjb25zdCBzaG93VG9vbHRpcEZvckVsZW1lbnQgPSAoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQuZnVsbHRleHQgfHwgZWwudGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgICAgIGlmICghdGV4dCB8fCAhc2hvdWxkUHJldmlldyhlbCkpIHJldHVybjtcbiAgICAgIHNob3dUb29sdGlwKHRleHQsIGVsKTtcbiAgICB9O1xuXG4gICAgbGV0IGFjdGl2ZVRvb2x0aXBFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgcHJlc3NUaW1lcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBjb25zdCBjbGVhclByZXNzVGltZXIgPSAoKSA9PiB7XG4gICAgICBpZiAocHJlc3NUaW1lciA9PSBudWxsKSByZXR1cm47XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuICAgICAgcHJlc3NUaW1lciA9IG51bGw7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VPdmVyID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0RWwgPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC50YXJnZXQpO1xuICAgICAgaWYgKCF0ZXh0RWwpIHJldHVybjtcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IHRleHRFbDtcbiAgICAgIHNob3dUb29sdGlwRm9yRWxlbWVudCh0ZXh0RWwpO1xuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlT3V0ID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBmcm9tID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQudGFyZ2V0KTtcbiAgICAgIGlmICghZnJvbSkgcmV0dXJuO1xuICAgICAgY29uc3QgdG8gPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC5yZWxhdGVkVGFyZ2V0KTtcbiAgICAgIGlmICh0byAmJiB0byA9PT0gZnJvbSkgcmV0dXJuO1xuICAgICAgaGlkZVRvb2x0aXAoKTtcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IG51bGw7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gKCkgPT4ge1xuICAgICAgaWYgKCFhY3RpdmVUb29sdGlwRWwpIHJldHVybjtcbiAgICAgIGlmICghdG9vbHRpcEVsLmNsYXNzTGlzdC5jb250YWlucyhcInZpc2libGVcIikpIHJldHVybjtcbiAgICAgIHNob3dUb29sdGlwRm9yRWxlbWVudChhY3RpdmVUb29sdGlwRWwpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoU3RhcnQgPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRleHRFbCA9IHJlc29sdmVUb29sdGlwVGFyZ2V0KGV2ZW50LnRhcmdldCk7XG4gICAgICBpZiAoIXRleHRFbCkgcmV0dXJuO1xuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gdGV4dEVsO1xuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XG4gICAgICBwcmVzc1RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzaG93VG9vbHRpcEZvckVsZW1lbnQodGV4dEVsKTtcbiAgICAgIH0sIFRPT0xUSVBfVE9VQ0hfREVMQVlfTVMpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoTW92ZSA9ICgpID0+IHtcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xuICAgICAgaGlkZVRvb2x0aXAoKTtcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IG51bGw7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hFbmQgPSAoKSA9PiB7XG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcbiAgICB9O1xuXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgb25Nb3VzZU92ZXIpO1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgb25Nb3VzZU91dCk7XG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvblRvdWNoU3RhcnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgb25Ub3VjaEVuZCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgY29uc3Qgb25TZWxlY3RTdGFydCA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGlmICghcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2VsZWN0c3RhcnRcIiwgb25TZWxlY3RTdGFydCk7XG5cbiAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG9uTW91c2VPdmVyKTtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgb25Nb3VzZU91dCk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Ub3VjaFN0YXJ0KTtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIG9uVG91Y2hNb3ZlKTtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgb25Ub3VjaEVuZCk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNlbGVjdHN0YXJ0XCIsIG9uU2VsZWN0U3RhcnQpO1xuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWVycm9yTWVzc2FnZSkge1xuICAgICAgY29uc3QgY2FyZHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZFwiKTtcbiAgICAgIGNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgICAgaWYgKCFjYXJkLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWVsaW5lLWNhcmQtLW5vZGF0YVwiKSkge1xuICAgICAgICAgIGNvbnN0IGNsZWFudXBQaXhlbCA9IGNyZWF0ZVBpeGVsRWZmZWN0KGNhcmQpO1xuICAgICAgICAgIGlmIChjbGVhbnVwUGl4ZWwpIGNsZWFudXBzLnB1c2goY2xlYW51cFBpeGVsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGZyYW1lSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dEVscyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1uYW1lLCAudGltZWxpbmUtZGVzYy10ZXh0XCIpO1xuICAgICAgICB0ZXh0RWxzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQuZnVsbHRleHQgfHwgZWwudGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgICAgICAgICBjb25zdCBpc011bHRpTGluZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWVsaW5lLWRlc2MtdGV4dFwiKTtcbiAgICAgICAgICBjb25zdCB0cmltbWVkVGV4dCA9IFN0cmluZyh0ZXh0IHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgICAgICBjb25zdCBkaWRFbGxpcHNpcyA9IGFwcGx5RWxsaXBzaXMoZWwsIHRyaW1tZWRUZXh0LCBpc011bHRpTGluZSk7XG4gICAgICAgICAgaWYgKGRpZEVsbGlwc2lzICYmIGVsLnRleHRDb250ZW50ID09PSBFTExJUFNJUyAmJiB0cmltbWVkVGV4dC5sZW5ndGggPiAzICYmIGVsLmNsaWVudFdpZHRoID4gNjQpIHtcbiAgICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gdHJpbW1lZFRleHQ7XG4gICAgICAgICAgICBlbC5kYXRhc2V0LnByZXZpZXcgPSBcIjFcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGNsZWFudXBzLnB1c2goKCkgPT4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGZyYW1lSWQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYW51cHMuZm9yRWFjaCgoY2xlYW51cCkgPT4gY2xlYW51cCgpKTtcbiAgICB9O1xuICB9LCBbY29udGFpbmVyUmVmLCBlcnJvck1lc3NhZ2UsIGl0ZW1zLCByZXNvbHZlQ2xpY2thYmxlQ2FyZF0pO1xufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuL1NwaW5uZXIudHN4XCI7XG5cbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcbiAgZmlyc3Q/OiBzdHJpbmc7XG4gIHByZXY/OiBzdHJpbmc7XG4gIG5leHQ/OiBzdHJpbmc7XG4gIGxhc3Q/OiBzdHJpbmc7XG59O1xuXG50eXBlIENvbXBhY3RQYWdpbmF0aW9uUHJvcHMgPSB7XG4gIHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcbiAgcGFnZVdpbmRvdz86IG51bWJlcjtcbiAgb25QYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xuICBsYWJlbHM/OiBQYWdpbmF0aW9uTGFiZWxzO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxvYWRpbmc/OiBib29sZWFuO1xufTtcblxuY29uc3QgREVGQVVMVF9XSU5ET1cgPSA2O1xuXG50eXBlIFBhZ2luYXRpb25Mb2NrV2luZG93ID0gV2luZG93ICYge1xuICBfX2luZFBhZ2luYXRpb25Mb2NrQ291bnQ/OiBudW1iZXI7XG4gIF9faW5kUGFnaW5hdGlvblByZXZPdmVyZmxvdz86IHN0cmluZztcbiAgX19pbmRQYWdpbmF0aW9uUHJldlRvdWNoQWN0aW9uPzogc3RyaW5nO1xufTtcblxuLy8gQ29tcGFjdCBwYWdpbmF0aW9uIHdpdGggNi1wYWdlIHdpbmRvdyBhbmQgZWRnZSBjb250cm9scy5cbmNvbnN0IENvbXBhY3RQYWdpbmF0aW9uID0gZm9yd2FyZFJlZjxIVE1MRGl2RWxlbWVudCwgQ29tcGFjdFBhZ2luYXRpb25Qcm9wcz4oXG4gICh7IHRvdGFsUGFnZXMsIGN1cnJlbnRQYWdlLCBwYWdlV2luZG93ID0gREVGQVVMVF9XSU5ET1csIG9uUGFnZUNoYW5nZSwgbGFiZWxzLCBjbGFzc05hbWUsIGxvYWRpbmcgfSwgcmVmKSA9PiB7XG4gICAgY29uc3Qgc2FmZVRvdGFsID0gTWF0aC5tYXgoMCwgdG90YWxQYWdlcyB8fCAwKTtcbiAgICBjb25zdCBzYWZlQ3VycmVudCA9IE1hdGgubWluKE1hdGgubWF4KDEsIGN1cnJlbnRQYWdlIHx8IDEpLCBzYWZlVG90YWwgfHwgMSk7XG4gICAgY29uc3Qgd2luZG93U2l6ZSA9IE1hdGgubWF4KDEsIHBhZ2VXaW5kb3cgfHwgREVGQVVMVF9XSU5ET1cpO1xuICAgIGNvbnN0IGhhc0xvYWRpbmdTaWduYWwgPSB0eXBlb2YgbG9hZGluZyA9PT0gXCJib29sZWFuXCI7XG4gICAgY29uc3QgaXNMb2FkaW5nID0gbG9hZGluZyA9PT0gdHJ1ZTtcbiAgICBjb25zdCBbaXNQYWdlVHJhbnNpdGlvblBlbmRpbmcsIHNldElzUGFnZVRyYW5zaXRpb25QZW5kaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgICBjb25zdCBzaG93UGFnZVNwaW5uZXIgPSBoYXNMb2FkaW5nU2lnbmFsICYmIGlzUGFnZVRyYW5zaXRpb25QZW5kaW5nO1xuXG4gICAgY29uc3Qgc2hvd1BhZ2luYXRpb24gPSBzYWZlVG90YWwgPiAxO1xuICAgIGNvbnN0IHNob3dFZGdlTmF2ID0gc2FmZVRvdGFsID4gd2luZG93U2l6ZTtcbiAgICBjb25zdCBjYW5KdW1wVG9TdGFydCA9IHNhZmVDdXJyZW50ID4gd2luZG93U2l6ZTtcbiAgICBjb25zdCBjYW5Hb1ByZXYgPSBzYWZlQ3VycmVudCA+IDE7XG4gICAgY29uc3QgY2FuR29OZXh0ID0gc2FmZUN1cnJlbnQgPCBzYWZlVG90YWw7XG5cbiAgICBjb25zdCBwYWdlTnVtYmVycyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgaWYgKCFzYWZlVG90YWwpIHJldHVybiBbXTtcbiAgICAgIGNvbnN0IHdpbmRvd1N0YXJ0ID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcigoc2FmZUN1cnJlbnQgLSAxKSAvIHdpbmRvd1NpemUpICogd2luZG93U2l6ZSArIDEpO1xuICAgICAgY29uc3Qgd2luZG93RW5kID0gTWF0aC5taW4oc2FmZVRvdGFsLCB3aW5kb3dTdGFydCArIHdpbmRvd1NpemUgLSAxKTtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB3aW5kb3dFbmQgLSB3aW5kb3dTdGFydCArIDEgfSwgKF92YWwsIGlkeCkgPT4gd2luZG93U3RhcnQgKyBpZHgpO1xuICAgIH0sIFtzYWZlQ3VycmVudCwgc2FmZVRvdGFsLCB3aW5kb3dTaXplXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgaWYgKCFoYXNMb2FkaW5nU2lnbmFsIHx8ICFpc1BhZ2VUcmFuc2l0aW9uUGVuZGluZykgcmV0dXJuO1xuICAgICAgaWYgKGlzTG9hZGluZykgcmV0dXJuO1xuICAgICAgc2V0SXNQYWdlVHJhbnNpdGlvblBlbmRpbmcoZmFsc2UpO1xuICAgIH0sIFtoYXNMb2FkaW5nU2lnbmFsLCBpc0xvYWRpbmcsIGlzUGFnZVRyYW5zaXRpb25QZW5kaW5nXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgaWYgKCFzaG93UGFnZVNwaW5uZXIpIHJldHVybjtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgICBjb25zdCBsb2NrV2luZG93ID0gd2luZG93IGFzIFBhZ2luYXRpb25Mb2NrV2luZG93O1xuICAgICAgY29uc3QgbG9ja0NvdW50ID0gTnVtYmVyKGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uTG9ja0NvdW50IHx8IDApO1xuICAgICAgaWYgKGxvY2tDb3VudCA8IDEpIHtcbiAgICAgICAgbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25QcmV2T3ZlcmZsb3cgPSBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93O1xuICAgICAgICBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZUb3VjaEFjdGlvbiA9IGRvY3VtZW50LmJvZHkuc3R5bGUudG91Y2hBY3Rpb247XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvdWNoQWN0aW9uID0gXCJub25lXCI7XG4gICAgICB9XG4gICAgICBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvbkxvY2tDb3VudCA9IGxvY2tDb3VudCArIDE7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb3VudCA9IE51bWJlcihsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvbkxvY2tDb3VudCB8fCAwKTtcbiAgICAgICAgY29uc3QgbmV4dENvdW50ID0gTWF0aC5tYXgoMCwgY3VycmVudENvdW50IC0gMSk7XG4gICAgICAgIGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uTG9ja0NvdW50ID0gbmV4dENvdW50O1xuICAgICAgICBpZiAobmV4dENvdW50IDwgMSkge1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZPdmVyZmxvdyB8fCBcIlwiO1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudG91Y2hBY3Rpb24gPSBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZUb3VjaEFjdGlvbiB8fCBcIlwiO1xuICAgICAgICAgIGRlbGV0ZSBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZPdmVyZmxvdztcbiAgICAgICAgICBkZWxldGUgbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25QcmV2VG91Y2hBY3Rpb247XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSwgW3Nob3dQYWdlU3Bpbm5lcl0pO1xuXG4gICAgY29uc3QgcmVxdWVzdFBhZ2VDaGFuZ2UgPSAocGFnZTogbnVtYmVyKSA9PiB7XG4gICAgICBpZiAocGFnZSA8IDEgfHwgcGFnZSA+IHNhZmVUb3RhbCkgcmV0dXJuO1xuICAgICAgaWYgKHBhZ2UgPT09IHNhZmVDdXJyZW50KSByZXR1cm47XG4gICAgICBpZiAoaGFzTG9hZGluZ1NpZ25hbCkge1xuICAgICAgICBzZXRJc1BhZ2VUcmFuc2l0aW9uUGVuZGluZyh0cnVlKTtcbiAgICAgIH1cbiAgICAgIG9uUGFnZUNoYW5nZShwYWdlKTtcbiAgICB9O1xuXG4gICAgaWYgKCFzaG93UGFnaW5hdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAge3Nob3dQYWdlU3Bpbm5lciA/IChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTEwMFwiXG4gICAgICAgICAgICBvbldoZWVsPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvblRvdWNoTW92ZT17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTEwIHctMTBcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGlkPVwicGFnaW5hdGlvblwiXG4gICAgICAgICAgZGF0YS1pbmQtcGFnaW5hdGlvbi1hbmNob3I9XCJ0cnVlXCJcbiAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICBcInBhZ2luYXRpb24gZ3JpZCBncmlkLWNvbHMtWzFmcl9hdXRvXzFmcl0gaXRlbXMtY2VudGVyIGdhcC0xXCIsXG4gICAgICAgICAgICBjbGFzc05hbWUgfHwgXCJcIlxuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktc3RhcnRcIj5cbiAgICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5KdW1wVG9TdGFydCAmJiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5maXJzdH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICByZXF1ZXN0UGFnZUNoYW5nZSgxKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE4Ljc1IDQuNS03LjUgNy41IDcuNSA3LjVtLTYtMTVMNS4yNSAxMmw3LjUgNy41XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvUHJldiAmJiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5wcmV2fVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RQYWdlQ2hhbmdlKHNhZmVDdXJyZW50IC0gMSk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIk0xNS43NSAxOS41IDguMjUgMTJsNy41LTcuNVwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgbWluLXctMCBmbGV4LW5vd3JhcFwiPlxuICAgICAgICAgICAge3BhZ2VOdW1iZXJzLm1hcCgocGFnZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IHBhZ2UgPT09IHNhZmVDdXJyZW50O1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17YHBhZ2UtJHtwYWdlfWB9XG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgIFwibWluLXctWzI2cHhdIHB4LTIgcHktMC41IHJvdW5kZWQtbWQgYm9yZGVyIHRleHQtWzEwcHhdIGZvbnQtc2VtaWJvbGQgdHJhbnNpdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZVxuICAgICAgICAgICAgICAgICAgICAgID8gXCJiZy1wcmltYXJ5IGJvcmRlci1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiYm9yZGVyLXNsYXRlLTMwMCB0ZXh0LXNsYXRlLTcwMCBob3Zlcjpib3JkZXItcHJpbWFyeSBob3Zlcjp0ZXh0LXByaW1hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgaXNMb2FkaW5nID8gXCJvcGFjaXR5LTYwIGN1cnNvci1ub3QtYWxsb3dlZFwiIDogXCJcIlxuICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2UocGFnZSk7XG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtwYWdlfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuR29OZXh0ICYmIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHM/Lm5leHR9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTguMjUgNC41IDcuNSA3LjUtNy41IDcuNVwiIC8+XG4gICAgICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5Hb05leHQgJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ubGFzdH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICByZXF1ZXN0UGFnZUNoYW5nZShzYWZlVG90YWwpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuNVwiIGNsYXNzTmFtZT1cInctNSBoLTUgbXgtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNS4yNSA0LjUgNy41IDcuNS03LjUgNy41bTYtMTUgNy41IDcuNS03LjUgNy41XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cbik7XG5cbkNvbXBhY3RQYWdpbmF0aW9uLmRpc3BsYXlOYW1lID0gXCJDb21w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
