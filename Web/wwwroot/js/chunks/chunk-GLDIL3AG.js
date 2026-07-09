import {
  Spinner_default,
  classNames
} from "./chunk-UNQYUM6B.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/commons/CompactPagination.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var DEFAULT_WINDOW = 6;
var scrollPageToTop = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const applyScroll = () => {
    const scrollingElement = document.scrollingElement;
    if (scrollingElement) {
      scrollingElement.scrollTop = 0;
      scrollingElement.scrollLeft = 0;
    }
    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
    document.body.scrollTop = 0;
    document.body.scrollLeft = 0;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };
  applyScroll();
  window.requestAnimationFrame(applyScroll);
};
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
      scrollPageToTop();
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
      scrollPageToTop();
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

export {
  CompactPagination_default,
  useTimelineCardEffects
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi9TcGlubmVyLnRzeFwiO1xyXG5cclxudHlwZSBQYWdpbmF0aW9uTGFiZWxzID0ge1xyXG4gIGZpcnN0Pzogc3RyaW5nO1xyXG4gIHByZXY/OiBzdHJpbmc7XHJcbiAgbmV4dD86IHN0cmluZztcclxuICBsYXN0Pzogc3RyaW5nO1xyXG59O1xyXG5cclxudHlwZSBDb21wYWN0UGFnaW5hdGlvblByb3BzID0ge1xyXG4gIHRvdGFsUGFnZXM6IG51bWJlcjtcclxuICBjdXJyZW50UGFnZTogbnVtYmVyO1xyXG4gIHBhZ2VXaW5kb3c/OiBudW1iZXI7XHJcbiAgb25QYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xyXG4gIGxhYmVscz86IFBhZ2luYXRpb25MYWJlbHM7XHJcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIGxvYWRpbmc/OiBib29sZWFuO1xyXG59O1xyXG5cclxuY29uc3QgREVGQVVMVF9XSU5ET1cgPSA2O1xuXG50eXBlIFBhZ2luYXRpb25Mb2NrV2luZG93ID0gV2luZG93ICYge1xuICBfX2luZFBhZ2luYXRpb25Mb2NrQ291bnQ/OiBudW1iZXI7XG4gIF9faW5kUGFnaW5hdGlvblByZXZPdmVyZmxvdz86IHN0cmluZztcbiAgX19pbmRQYWdpbmF0aW9uUHJldlRvdWNoQWN0aW9uPzogc3RyaW5nO1xufTtcblxuLy8gRm9yY2VzIGRvY3VtZW50LWxldmVsIHBhZ2luYXRpb24gY2hhbmdlcyB0byBzdGFydCBmcm9tIHRoZSB0b3Agb2YgdGhlIHBhZ2UuXG5jb25zdCBzY3JvbGxQYWdlVG9Ub3AgPSAoKSA9PiB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gIGNvbnN0IGFwcGx5U2Nyb2xsID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcm9sbGluZ0VsZW1lbnQgPSBkb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50O1xuICAgIGlmIChzY3JvbGxpbmdFbGVtZW50KSB7XG4gICAgICBzY3JvbGxpbmdFbGVtZW50LnNjcm9sbFRvcCA9IDA7XG4gICAgICBzY3JvbGxpbmdFbGVtZW50LnNjcm9sbExlZnQgPSAwO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0ID0gMDtcbiAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XG4gICAgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ID0gMDtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oeyB0b3A6IDAsIGxlZnQ6IDAsIGJlaGF2aW9yOiBcImF1dG9cIiB9KTtcbiAgfTtcblxuICBhcHBseVNjcm9sbCgpO1xuICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFwcGx5U2Nyb2xsKTtcbn07XG5cbi8vIENvbXBhY3QgcGFnaW5hdGlvbiB3aXRoIDYtcGFnZSB3aW5kb3cgYW5kIGVkZ2UgY29udHJvbHMuXG5jb25zdCBDb21wYWN0UGFnaW5hdGlvbiA9IGZvcndhcmRSZWY8SFRNTERpdkVsZW1lbnQsIENvbXBhY3RQYWdpbmF0aW9uUHJvcHM+KFxuICAoeyB0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSwgcGFnZVdpbmRvdyA9IERFRkFVTFRfV0lORE9XLCBvblBhZ2VDaGFuZ2UsIGxhYmVscywgY2xhc3NOYW1lLCBsb2FkaW5nIH0sIHJlZikgPT4ge1xyXG4gICAgY29uc3Qgc2FmZVRvdGFsID0gTWF0aC5tYXgoMCwgdG90YWxQYWdlcyB8fCAwKTtcclxuICAgIGNvbnN0IHNhZmVDdXJyZW50ID0gTWF0aC5taW4oTWF0aC5tYXgoMSwgY3VycmVudFBhZ2UgfHwgMSksIHNhZmVUb3RhbCB8fCAxKTtcclxuICAgIGNvbnN0IHdpbmRvd1NpemUgPSBNYXRoLm1heCgxLCBwYWdlV2luZG93IHx8IERFRkFVTFRfV0lORE9XKTtcclxuICAgIGNvbnN0IGhhc0xvYWRpbmdTaWduYWwgPSB0eXBlb2YgbG9hZGluZyA9PT0gXCJib29sZWFuXCI7XHJcbiAgICBjb25zdCBpc0xvYWRpbmcgPSBsb2FkaW5nID09PSB0cnVlO1xyXG4gICAgY29uc3QgW2lzUGFnZVRyYW5zaXRpb25QZW5kaW5nLCBzZXRJc1BhZ2VUcmFuc2l0aW9uUGVuZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICBjb25zdCBzaG93UGFnZVNwaW5uZXIgPSBoYXNMb2FkaW5nU2lnbmFsICYmIGlzUGFnZVRyYW5zaXRpb25QZW5kaW5nO1xyXG5cclxuICAgIGNvbnN0IHNob3dQYWdpbmF0aW9uID0gc2FmZVRvdGFsID4gMTtcclxuICAgIGNvbnN0IHNob3dFZGdlTmF2ID0gc2FmZVRvdGFsID4gd2luZG93U2l6ZTtcclxuICAgIGNvbnN0IGNhbkp1bXBUb1N0YXJ0ID0gc2FmZUN1cnJlbnQgPiB3aW5kb3dTaXplO1xyXG4gICAgY29uc3QgY2FuR29QcmV2ID0gc2FmZUN1cnJlbnQgPiAxO1xyXG4gICAgY29uc3QgY2FuR29OZXh0ID0gc2FmZUN1cnJlbnQgPCBzYWZlVG90YWw7XHJcblxyXG4gICAgY29uc3QgcGFnZU51bWJlcnMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgICAgaWYgKCFzYWZlVG90YWwpIHJldHVybiBbXTtcclxuICAgICAgY29uc3Qgd2luZG93U3RhcnQgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKChzYWZlQ3VycmVudCAtIDEpIC8gd2luZG93U2l6ZSkgKiB3aW5kb3dTaXplICsgMSk7XHJcbiAgICAgIGNvbnN0IHdpbmRvd0VuZCA9IE1hdGgubWluKHNhZmVUb3RhbCwgd2luZG93U3RhcnQgKyB3aW5kb3dTaXplIC0gMSk7XHJcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB3aW5kb3dFbmQgLSB3aW5kb3dTdGFydCArIDEgfSwgKF92YWwsIGlkeCkgPT4gd2luZG93U3RhcnQgKyBpZHgpO1xyXG4gICAgfSwgW3NhZmVDdXJyZW50LCBzYWZlVG90YWwsIHdpbmRvd1NpemVdKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgaWYgKCFoYXNMb2FkaW5nU2lnbmFsIHx8ICFpc1BhZ2VUcmFuc2l0aW9uUGVuZGluZykgcmV0dXJuO1xuICAgICAgaWYgKGlzTG9hZGluZykgcmV0dXJuO1xuICAgICAgc2V0SXNQYWdlVHJhbnNpdGlvblBlbmRpbmcoZmFsc2UpO1xuICAgICAgc2Nyb2xsUGFnZVRvVG9wKCk7XG4gICAgfSwgW2hhc0xvYWRpbmdTaWduYWwsIGlzTG9hZGluZywgaXNQYWdlVHJhbnNpdGlvblBlbmRpbmddKTtcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgaWYgKCFzaG93UGFnZVNwaW5uZXIpIHJldHVybjtcclxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBsb2NrV2luZG93ID0gd2luZG93IGFzIFBhZ2luYXRpb25Mb2NrV2luZG93O1xyXG4gICAgICBjb25zdCBsb2NrQ291bnQgPSBOdW1iZXIobG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25Mb2NrQ291bnQgfHwgMCk7XHJcbiAgICAgIGlmIChsb2NrQ291bnQgPCAxKSB7XHJcbiAgICAgICAgbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25QcmV2T3ZlcmZsb3cgPSBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93O1xyXG4gICAgICAgIGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uUHJldlRvdWNoQWN0aW9uID0gZG9jdW1lbnQuYm9keS5zdHlsZS50b3VjaEFjdGlvbjtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvdWNoQWN0aW9uID0gXCJub25lXCI7XHJcbiAgICAgIH1cclxuICAgICAgbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25Mb2NrQ291bnQgPSBsb2NrQ291bnQgKyAxO1xyXG5cclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50Q291bnQgPSBOdW1iZXIobG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25Mb2NrQ291bnQgfHwgMCk7XHJcbiAgICAgICAgY29uc3QgbmV4dENvdW50ID0gTWF0aC5tYXgoMCwgY3VycmVudENvdW50IC0gMSk7XHJcbiAgICAgICAgbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25Mb2NrQ291bnQgPSBuZXh0Q291bnQ7XHJcbiAgICAgICAgaWYgKG5leHRDb3VudCA8IDEpIHtcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZPdmVyZmxvdyB8fCBcIlwiO1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3VjaEFjdGlvbiA9IGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uUHJldlRvdWNoQWN0aW9uIHx8IFwiXCI7XHJcbiAgICAgICAgICBkZWxldGUgbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25QcmV2T3ZlcmZsb3c7XHJcbiAgICAgICAgICBkZWxldGUgbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25QcmV2VG91Y2hBY3Rpb247XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgfSwgW3Nob3dQYWdlU3Bpbm5lcl0pO1xyXG5cclxuICAgIGNvbnN0IHJlcXVlc3RQYWdlQ2hhbmdlID0gKHBhZ2U6IG51bWJlcikgPT4ge1xyXG4gICAgICBpZiAocGFnZSA8IDEgfHwgcGFnZSA+IHNhZmVUb3RhbCkgcmV0dXJuO1xyXG4gICAgICBpZiAocGFnZSA9PT0gc2FmZUN1cnJlbnQpIHJldHVybjtcbiAgICAgIGlmIChoYXNMb2FkaW5nU2lnbmFsKSB7XG4gICAgICAgIHNldElzUGFnZVRyYW5zaXRpb25QZW5kaW5nKHRydWUpO1xuICAgICAgfVxuICAgICAgc2Nyb2xsUGFnZVRvVG9wKCk7XG4gICAgICBvblBhZ2VDaGFuZ2UocGFnZSk7XG4gICAgfTtcblxyXG4gICAgaWYgKCFzaG93UGFnaW5hdGlvbikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPD5cclxuICAgICAgICB7c2hvd1BhZ2VTcGlubmVyID8gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTEwMFwiXHJcbiAgICAgICAgICAgIG9uV2hlZWw9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC0xMCB3LTEwXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBpZD1cInBhZ2luYXRpb25cIlxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwicGFnaW5hdGlvbiBncmlkIGdyaWQtY29scy1bMWZyX2F1dG9fMWZyXSBpdGVtcy1jZW50ZXIgZ2FwLTFcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZSB8fCBcIlwiXG4gICAgICAgICAgKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktc3RhcnRcIj5cclxuICAgICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkp1bXBUb1N0YXJ0ICYmIChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8uZmlyc3R9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0UGFnZUNoYW5nZSgxKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTguNzUgNC41LTcuNSA3LjUgNy41IDcuNW0tNi0xNUw1LjI1IDEybDcuNSA3LjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5Hb1ByZXYgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5wcmV2fVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgLSAxKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTUuNzUgMTkuNSA4LjI1IDEybDcuNS03LjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIG1pbi13LTAgZmxleC1ub3dyYXBcIj5cclxuICAgICAgICAgICAge3BhZ2VOdW1iZXJzLm1hcCgocGFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gcGFnZSA9PT0gc2FmZUN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAga2V5PXtgcGFnZS0ke3BhZ2V9YH1cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICBcIm1pbi13LVsyNnB4XSBweC0yIHB5LTAuNSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgdGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlXHJcbiAgICAgICAgICAgICAgICAgICAgICA/IFwiYmctcHJpbWFyeSBib3JkZXItcHJpbWFyeSB0ZXh0LXdoaXRlIHNoYWRvdy1zbVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICA6IFwiYm9yZGVyLXNsYXRlLTMwMCB0ZXh0LXNsYXRlLTcwMCBob3Zlcjpib3JkZXItcHJpbWFyeSBob3Zlcjp0ZXh0LXByaW1hcnlcIixcclxuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmcgPyBcIm9wYWNpdHktNjAgY3Vyc29yLW5vdC1hbGxvd2VkXCIgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RQYWdlQ2hhbmdlKHBhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7cGFnZX1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pfVxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBqdXN0aWZ5LWVuZFwiPlxyXG4gICAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuR29OZXh0ICYmIChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ubmV4dH1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RQYWdlQ2hhbmdlKHNhZmVDdXJyZW50ICsgMSk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTguMjUgNC41IDcuNSA3LjUtNy41IDcuNVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvTmV4dCAmJiAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHM/Lmxhc3R9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0UGFnZUNoYW5nZShzYWZlVG90YWwpO1xyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuNVwiIGNsYXNzTmFtZT1cInctNSBoLTUgbXgtYXV0b1wiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm01LjI1IDQuNSA3LjUgNy41LTcuNSA3LjVtNi0xNSA3LjUgNy41LTcuNSA3LjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC8+XHJcbiAgICApO1xyXG4gIH1cclxuKTtcclxuXHJcbkNvbXBhY3RQYWdpbmF0aW9uLmRpc3BsYXlOYW1lID0gXCJDb21wYWN0UGFnaW5hdGlvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tcGFjdFBhZ2luYXRpb247XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmNvbnN0IFRPT0xUSVBfVE9VQ0hfREVMQVlfTVMgPSAxMjA7XHJcbmNvbnN0IFRPT0xUSVBfTUFYX0hFSUdIVF9SQVRJTyA9IDAuODtcclxuY29uc3QgVE9PTFRJUF9CQVNFX0ZPTlQgPSAxMztcclxuY29uc3QgVE9PTFRJUF9NSU5fRk9OVCA9IDExO1xyXG5jb25zdCBFTExJUFNJUyA9IFwiLi4uXCI7XHJcbmNvbnN0IFBJWEVMX0dBUCA9IDU7XHJcbmNvbnN0IFBJWEVMX1NQRUVEID0gOTU7XHJcbmNvbnN0IFBJWEVMX0NPTE9SUyA9IFtcInJnYmEoMCwgNDEsIDEwNywgMC4wOClcIiwgXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMTYpXCIsIFwicmdiYSgwLCA0MSwgMTA3LCAwLjI2KVwiXTtcclxuXHJcbnR5cGUgUGl4ZWxTdGF0ZSA9IHtcclxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xyXG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG4gIHBpeGVsczogUGl4ZWxbXTtcclxuICBhbmltSWQ6IG51bWJlciB8IG51bGw7XHJcbiAgbGFzdFRpbWU6IG51bWJlcjtcclxuICByZWR1Y2VkTW90aW9uOiBib29sZWFuO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBVc2VUaW1lbGluZUNhcmRFZmZlY3RzQXJncyA9IHtcclxuICBjb250YWluZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudCB8IG51bGw+O1xyXG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xyXG4gIGl0ZW1zOiB1bmtub3duW107XHJcbiAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQ6ICh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4gSFRNTEVsZW1lbnQgfCBudWxsO1xyXG59O1xyXG5cclxuLy8gQ29tcHV0ZSBwaXhlbCBzcGVlZCB3aGlsZSByZXNwZWN0aW5nIHJlZHVjZWQgbW90aW9uIHByZWZlcmVuY2UuXHJcbmNvbnN0IGdldEVmZmVjdGl2ZVNwZWVkID0gKHZhbHVlOiBudW1iZXIsIHJlZHVjZWRNb3Rpb246IGJvb2xlYW4pID0+IHtcclxuICBjb25zdCBtaW4gPSAwO1xyXG4gIGNvbnN0IG1heCA9IDEwMDtcclxuICBjb25zdCB0aHJvdHRsZSA9IDAuMDAxO1xyXG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlci5wYXJzZUludChTdHJpbmcodmFsdWUpLCAxMCk7XHJcblxyXG4gIGlmIChwYXJzZWQgPD0gbWluIHx8IHJlZHVjZWRNb3Rpb24pIHJldHVybiBtaW47XHJcbiAgaWYgKHBhcnNlZCA+PSBtYXgpIHJldHVybiBtYXggKiB0aHJvdHRsZTtcclxuICByZXR1cm4gcGFyc2VkICogdGhyb3R0bGU7XHJcbn07XHJcblxyXG4vLyBQaXhlbCB1c2VkIGJ5IHRoZSBob3ZlciBhbmltYXRpb24gY2FudmFzLlxyXG5jbGFzcyBQaXhlbCB7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBoZWlnaHQ6IG51bWJlcjtcclxuICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICB4OiBudW1iZXI7XHJcbiAgeTogbnVtYmVyO1xyXG4gIGNvbG9yOiBzdHJpbmc7XHJcbiAgc3BlZWQ6IG51bWJlcjtcclxuICBzaXplOiBudW1iZXI7XHJcbiAgc2l6ZVN0ZXA6IG51bWJlcjtcclxuICBtaW5TaXplOiBudW1iZXI7XHJcbiAgbWF4U2l6ZUludGVnZXI6IG51bWJlcjtcclxuICBtYXhTaXplOiBudW1iZXI7XHJcbiAgcGhhc2U6IG51bWJlcjtcclxuICBwaGFzZVN0ZXA6IG51bWJlcjtcclxuICBkZWxheTogbnVtYmVyO1xyXG4gIGNvdW50ZXI6IG51bWJlcjtcclxuICBjb3VudGVyU3RlcDogbnVtYmVyO1xyXG4gIGlzSWRsZTogYm9vbGVhbjtcclxuICBpc1JldmVyc2U6IGJvb2xlYW47XHJcbiAgaXNTaGltbWVyOiBib29sZWFuO1xyXG5cclxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHg6IG51bWJlciwgeTogbnVtYmVyLCBjb2xvcjogc3RyaW5nLCBzcGVlZDogbnVtYmVyLCBkZWxheTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLndpZHRoID0gY2FudmFzLndpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBjYW52YXMuaGVpZ2h0O1xyXG4gICAgdGhpcy5jdHggPSBjb250ZXh0O1xyXG4gICAgdGhpcy54ID0geDtcclxuICAgIHRoaXMueSA9IHk7XHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbiAgICB0aGlzLnNwZWVkID0gdGhpcy5nZXRSYW5kb21WYWx1ZSgwLjEsIDAuOSkgKiBzcGVlZDtcclxuICAgIHRoaXMuc2l6ZSA9IDA7XHJcbiAgICB0aGlzLnNpemVTdGVwID0gTWF0aC5yYW5kb20oKSAqIDAuMyArIDAuMTtcclxuICAgIHRoaXMubWluU2l6ZSA9IDAuNTtcclxuICAgIHRoaXMubWF4U2l6ZUludGVnZXIgPSAyO1xyXG4gICAgdGhpcy5tYXhTaXplID0gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLm1pblNpemUsIHRoaXMubWF4U2l6ZUludGVnZXIpO1xyXG4gICAgdGhpcy5kZWxheSA9IGRlbGF5O1xyXG4gICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgIHRoaXMuY291bnRlclN0ZXAgPSBNYXRoLnJhbmRvbSgpICogNSArICh0aGlzLndpZHRoICsgdGhpcy5oZWlnaHQpICogMC4wMTU7XHJcbiAgICB0aGlzLmlzSWRsZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1JldmVyc2UgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNTaGltbWVyID0gZmFsc2U7XHJcbiAgICB0aGlzLnBoYXNlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xyXG4gICAgdGhpcy5waGFzZVN0ZXAgPSBNYXRoLm1heCgwLCB0aGlzLnNwZWVkICogKDAuOCArIE1hdGgucmFuZG9tKCkgKiAwLjYpKTtcclxuICB9XHJcblxyXG4gIC8vIFJldHVybiBhIHJhbmRvbSBmbG9hdCBiZXR3ZWVuIG1pbiBhbmQgbWF4LlxyXG4gIGdldFJhbmRvbVZhbHVlKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xyXG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSArIG1pbjtcclxuICB9XHJcblxyXG4gIC8vIERyYXcgdGhlIHBpeGVsIGF0IGl0cyBjdXJyZW50IHNpemUuXHJcbiAgZHJhdygpIHtcclxuICAgIGNvbnN0IGNlbnRlck9mZnNldCA9IHRoaXMubWF4U2l6ZUludGVnZXIgKiAwLjUgLSB0aGlzLnNpemUgKiAwLjU7XHJcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSB0aGlzLmNvbG9yO1xyXG4gICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy54ICsgY2VudGVyT2Zmc2V0LCB0aGlzLnkgKyBjZW50ZXJPZmZzZXQsIHRoaXMuc2l6ZSwgdGhpcy5zaXplKTtcclxuICB9XHJcblxyXG4gIC8vIEFuaW1hdGUgdGhlIHBpeGVsIGFwcGVhcmluZy5cclxuICBhcHBlYXIoKSB7XHJcbiAgICB0aGlzLmlzSWRsZSA9IGZhbHNlO1xyXG4gICAgaWYgKHRoaXMuY291bnRlciA8PSB0aGlzLmRlbGF5KSB7XHJcbiAgICAgIHRoaXMuY291bnRlciArPSB0aGlzLmNvdW50ZXJTdGVwO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSkge1xyXG4gICAgICB0aGlzLmlzU2hpbW1lciA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5pc1NoaW1tZXIpIHtcclxuICAgICAgdGhpcy5zaGltbWVyKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNpemUgKz0gdGhpcy5zaXplU3RlcDtcclxuICAgIH1cclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxuXHJcbiAgLy8gQW5pbWF0ZSB0aGUgcGl4ZWwgZGlzYXBwZWFyaW5nLlxyXG4gIGRpc2FwcGVhcigpIHtcclxuICAgIHRoaXMuaXNTaGltbWVyID0gZmFsc2U7XHJcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xyXG4gICAgaWYgKHRoaXMuc2l6ZSA8PSAwKSB7XHJcbiAgICAgIHRoaXMuaXNJZGxlID0gdHJ1ZTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaXplIC09IDAuMTtcclxuICAgIHRoaXMuZHJhdygpO1xyXG4gIH1cclxuXHJcbiAgLy8gT3NjaWxsYXRlIHBpeGVsIHNpemUgd2hpbGUgdmlzaWJsZS5cclxuICBzaGltbWVyKCkge1xyXG4gICAgaWYgKCF0aGlzLnBoYXNlU3RlcCkgcmV0dXJuO1xyXG4gICAgdGhpcy5waGFzZSArPSB0aGlzLnBoYXNlU3RlcDtcclxuICAgIGNvbnN0IGFtcCA9ICh0aGlzLm1heFNpemUgLSB0aGlzLm1pblNpemUpICogMC41O1xyXG4gICAgdGhpcy5zaXplID0gdGhpcy5taW5TaXplICsgYW1wICsgYW1wICogTWF0aC5zaW4odGhpcy5waGFzZSk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBDcmVhdGUgdGhlIHBpeGVsIGNhbnZhcyBob3ZlciBlZmZlY3QgZm9yIGEgdGltZWxpbmUgY2FyZC5cclxuY29uc3QgY3JlYXRlUGl4ZWxFZmZlY3QgPSAoY2FyZEVsOiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gIGlmICghY2FyZEVsKSByZXR1cm4gbnVsbDtcclxuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xyXG4gIGNhbnZhcy5jbGFzc05hbWUgPSBcInRpbWVsaW5lLXBpeGVsLWNhbnZhc1wiO1xyXG4gIGNhcmRFbC5hcHBlbmRDaGlsZChjYW52YXMpO1xyXG5cclxuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gIGlmICghY3R4KSB7XHJcbiAgICBjYW52YXMucmVtb3ZlKCk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlZHVjZWRNb3Rpb24gPSB3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpLm1hdGNoZXM7XHJcbiAgY29uc3Qgc3RhdGU6IFBpeGVsU3RhdGUgPSB7XHJcbiAgICBjYW52YXMsXHJcbiAgICBjdHgsXHJcbiAgICBwaXhlbHM6IFtdLFxyXG4gICAgYW5pbUlkOiBudWxsLFxyXG4gICAgbGFzdFRpbWU6IHBlcmZvcm1hbmNlLm5vdygpLFxyXG4gICAgcmVkdWNlZE1vdGlvbixcclxuICAgIHdpZHRoOiAwLFxyXG4gICAgaGVpZ2h0OiAwLFxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGluaXRQaXhlbHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByZWN0ID0gY2FyZEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgd2lkdGggPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHJlY3Qud2lkdGgpKTtcclxuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVjdC5oZWlnaHQpKTtcclxuICAgIGlmICghd2lkdGggfHwgIWhlaWdodCkgcmV0dXJuO1xyXG5cclxuICAgIHN0YXRlLndpZHRoID0gd2lkdGg7XHJcbiAgICBzdGF0ZS5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSBgJHt3aWR0aH1weGA7XHJcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fXB4YDtcclxuXHJcbiAgICBjb25zdCBnYXAgPSBNYXRoLm1heCgzLCBNYXRoLmZsb29yKFBJWEVMX0dBUCkpO1xyXG4gICAgY29uc3Qgc3BlZWQgPSBnZXRFZmZlY3RpdmVTcGVlZChQSVhFTF9TUEVFRCwgcmVkdWNlZE1vdGlvbik7XHJcbiAgICBjb25zdCBwaXhlbHM6IFBpeGVsW10gPSBbXTtcclxuXHJcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4ICs9IGdhcCkge1xyXG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSArPSBnYXApIHtcclxuICAgICAgICBjb25zdCBjb2xvciA9IFBJWEVMX0NPTE9SU1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBQSVhFTF9DT0xPUlMubGVuZ3RoKV07XHJcbiAgICAgICAgY29uc3QgZHggPSB4IC0gd2lkdGggLyAyO1xyXG4gICAgICAgIGNvbnN0IGR5ID0geSAtIGhlaWdodCAvIDI7XHJcbiAgICAgICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xyXG4gICAgICAgIGNvbnN0IGRlbGF5ID0gcmVkdWNlZE1vdGlvbiA/IDAgOiBkaXN0YW5jZSAqIDAuMzU7XHJcbiAgICAgICAgcGl4ZWxzLnB1c2gobmV3IFBpeGVsKGNhbnZhcywgY3R4LCB4LCB5LCBjb2xvciwgc3BlZWQsIGRlbGF5KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0ZS5waXhlbHMgPSBwaXhlbHM7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZG9BbmltYXRlID0gKGZuTmFtZTogXCJhcHBlYXJcIiB8IFwiZGlzYXBwZWFyXCIpID0+IHtcclxuICAgIHN0YXRlLmFuaW1JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBkb0FuaW1hdGUoZm5OYW1lKSk7XHJcbiAgICBjb25zdCB0aW1lTm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XHJcbiAgICBjb25zdCB0aW1lUGFzc2VkID0gdGltZU5vdyAtIHN0YXRlLmxhc3RUaW1lO1xyXG4gICAgY29uc3QgdGltZUludGVydmFsID0gMTAwMCAvIDYwO1xyXG5cclxuICAgIGlmICh0aW1lUGFzc2VkIDwgdGltZUludGVydmFsKSByZXR1cm47XHJcbiAgICBzdGF0ZS5sYXN0VGltZSA9IHRpbWVOb3cgLSAodGltZVBhc3NlZCAlIHRpbWVJbnRlcnZhbCk7XHJcblxyXG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzdGF0ZS53aWR0aCwgc3RhdGUuaGVpZ2h0KTtcclxuXHJcbiAgICBsZXQgYWxsSWRsZSA9IHRydWU7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0YXRlLnBpeGVscy5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICBjb25zdCBwaXhlbCA9IHN0YXRlLnBpeGVsc1tpXTtcclxuICAgICAgcGl4ZWxbZm5OYW1lXSgpO1xyXG4gICAgICBpZiAoIXBpeGVsLmlzSWRsZSkgYWxsSWRsZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGFsbElkbGUgJiYgc3RhdGUuYW5pbUlkKSB7XHJcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHN0YXRlLmFuaW1JZCk7XHJcbiAgICAgIHN0YXRlLmFuaW1JZCA9IG51bGw7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW5pbWF0aW9uID0gKG5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XHJcbiAgICBpZiAoIXN0YXRlLnBpeGVscy5sZW5ndGgpIHJldHVybjtcclxuICAgIGlmIChzdGF0ZS5hbmltSWQpIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHN0YXRlLmFuaW1JZCk7XHJcbiAgICBzdGF0ZS5sYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgc3RhdGUuYW5pbUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGRvQW5pbWF0ZShuYW1lKSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgb25FbnRlciA9ICgpID0+IGhhbmRsZUFuaW1hdGlvbihcImFwcGVhclwiKTtcclxuICBjb25zdCBvbkxlYXZlID0gKCkgPT4gaGFuZGxlQW5pbWF0aW9uKFwiZGlzYXBwZWFyXCIpO1xyXG5cclxuICBjYXJkRWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25FbnRlcik7XHJcbiAgY2FyZEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTGVhdmUpO1xyXG5cclxuICBsZXQgcm86IFJlc2l6ZU9ic2VydmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoaW5pdFBpeGVscyk7XHJcbiAgICByby5vYnNlcnZlKGNhcmRFbCk7XHJcbiAgfVxyXG5cclxuICBpbml0UGl4ZWxzKCk7XHJcblxyXG4gIHJldHVybiAoKSA9PiB7XHJcbiAgICBjYXJkRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgb25FbnRlcik7XHJcbiAgICBjYXJkRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25MZWF2ZSk7XHJcbiAgICBpZiAoc3RhdGUuYW5pbUlkKSBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xyXG4gICAgaWYgKHJvKSByby5kaXNjb25uZWN0KCk7XHJcbiAgICBjYW52YXMucmVtb3ZlKCk7XHJcbiAgfTtcclxufTtcclxuXHJcbi8vIFNob3J0ZW4gb3ZlcmZsb3dpbmcgdGV4dCB3aXRoIGEgY29tcHV0ZWQgZWxsaXBzaXMuXHJcbmNvbnN0IGFwcGx5RWxsaXBzaXMgPSAoZWw6IEhUTUxFbGVtZW50LCBmdWxsVGV4dDogc3RyaW5nLCBtdWx0aUxpbmU6IGJvb2xlYW4pID0+IHtcclxuICBpZiAoIWVsIHx8ICFmdWxsVGV4dCkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmIChtdWx0aUxpbmUgJiYgZWwuY2xpZW50SGVpZ2h0ID09PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgaWYgKCFtdWx0aUxpbmUgJiYgZWwuY2xpZW50V2lkdGggPT09IDApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgaWYgKG11bHRpTGluZSkge1xyXG4gICAgY29uc3QgY29tcHV0ZWQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XHJcbiAgICBsZXQgbGluZUhlaWdodCA9IE51bWJlci5wYXJzZUZsb2F0KGNvbXB1dGVkLmxpbmVIZWlnaHQpO1xyXG4gICAgLy8gU29tZSBicm93c2VycyByZXR1cm4gdW5pdGxlc3MgbGluZS1oZWlnaHQgdmFsdWVzIGZvciBjb21wdXRlZCBzdHlsZXMuXHJcbiAgICAvLyBDb252ZXJ0IHRpbnkgdW5pdGxlc3MgdmFsdWVzIHVzaW5nIGZvbnQtc2l6ZSB0byBhdm9pZCBjb2xsYXBzaW5nIHRleHQuXHJcbiAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGxpbmVIZWlnaHQpICYmIGxpbmVIZWlnaHQgPiAwICYmIGxpbmVIZWlnaHQgPCA4KSB7XHJcbiAgICAgIGNvbnN0IGZvbnRTaXplID0gTnVtYmVyLnBhcnNlRmxvYXQoY29tcHV0ZWQuZm9udFNpemUpO1xyXG4gICAgICBpZiAoTnVtYmVyLmlzRmluaXRlKGZvbnRTaXplKSAmJiBmb250U2l6ZSA+IDApIHtcclxuICAgICAgICBsaW5lSGVpZ2h0ID0gbGluZUhlaWdodCAqIGZvbnRTaXplO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIU51bWJlci5pc0Zpbml0ZShsaW5lSGVpZ2h0KSkge1xyXG4gICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGxpbmVIZWlnaHQgPSByZWN0LmhlaWdodCA+IDAgPyByZWN0LmhlaWdodCAvIDIgOiAwO1xyXG4gICAgfVxyXG4gICAgaWYgKGxpbmVIZWlnaHQgPiAwKSB7XHJcbiAgICAgIGVsLnN0eWxlLm1heEhlaWdodCA9IGAke01hdGgucm91bmQobGluZUhlaWdodCAqIDIpfXB4YDtcclxuICAgICAgZWwuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWwudGV4dENvbnRlbnQgPSBmdWxsVGV4dDtcclxuXHJcbiAgY29uc3QgaXNPdmVyZmxvd2luZyA9ICgpID0+IChcclxuICAgIG11bHRpTGluZVxyXG4gICAgICA/IGVsLnNjcm9sbEhlaWdodCA+IGVsLmNsaWVudEhlaWdodCArIDFcclxuICAgICAgOiBlbC5zY3JvbGxXaWR0aCA+IGVsLmNsaWVudFdpZHRoICsgMVxyXG4gICk7XHJcblxyXG4gIGlmICghaXNPdmVyZmxvd2luZygpKSB7XHJcbiAgICBlbC5kYXRhc2V0LnByZXZpZXcgPSBcIjBcIjtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGxldCBsb3cgPSAwO1xyXG4gIGxldCBoaWdoID0gZnVsbFRleHQubGVuZ3RoO1xyXG4gIGxldCBiZXN0ID0gMDtcclxuXHJcbiAgd2hpbGUgKGxvdyA8PSBoaWdoKSB7XHJcbiAgICBjb25zdCBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xyXG4gICAgY29uc3QgY2FuZGlkYXRlID0gYCR7ZnVsbFRleHQuc2xpY2UoMCwgTWF0aC5tYXgoMCwgbWlkKSkudHJpbUVuZCgpfSR7RUxMSVBTSVN9YDtcclxuICAgIGVsLnRleHRDb250ZW50ID0gY2FuZGlkYXRlO1xyXG4gICAgaWYgKGlzT3ZlcmZsb3dpbmcoKSkge1xyXG4gICAgICBoaWdoID0gbWlkIC0gMTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJlc3QgPSBtaWQ7XHJcbiAgICAgIGxvdyA9IG1pZCArIDE7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbC50ZXh0Q29udGVudCA9IGAke2Z1bGxUZXh0LnNsaWNlKDAsIE1hdGgubWF4KDAsIGJlc3QpKS50cmltRW5kKCl9JHtFTExJUFNJU31gO1xyXG4gIGVsLmRhdGFzZXQucHJldmlldyA9IFwiMVwiO1xyXG4gIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuLy8gT3ducyB0b29sdGlwLCBlbGxpcHNpcywgYW5kIHBpeGVsIGVmZmVjdHMgZm9yIHRpbWVsaW5lIGNhcmRzLlxyXG5leHBvcnQgY29uc3QgdXNlVGltZWxpbmVDYXJkRWZmZWN0cyA9ICh7XHJcbiAgY29udGFpbmVyUmVmLFxyXG4gIGVycm9yTWVzc2FnZSxcclxuICBpdGVtcyxcclxuICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcclxufTogVXNlVGltZWxpbmVDYXJkRWZmZWN0c0FyZ3MpID0+IHtcclxuICBjb25zdCB0b29sdGlwUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgdG9vbHRpcEFuY2hvclJlZiA9IHVzZVJlZjxIVE1MRWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHRvb2x0aXBDbG9zZUJvdW5kUmVmID0gdXNlUmVmKGZhbHNlKTtcclxuXHJcbiAgLy8gRW5zdXJlIHRoZSBzaGFyZWQgdG9vbHRpcCBlbGVtZW50IGV4aXN0cyBvbmNlLlxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAodG9vbHRpcFJlZi5jdXJyZW50KSByZXR1cm47XHJcbiAgICBsZXQgdG9vbHRpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZWxpbmVUb29sdGlwXCIpIGFzIEhUTUxEaXZFbGVtZW50IHwgbnVsbDtcclxuICAgIGlmICghdG9vbHRpcCkge1xyXG4gICAgICB0b29sdGlwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgdG9vbHRpcC5pZCA9IFwidGltZWxpbmVUb29sdGlwXCI7XHJcbiAgICAgIHRvb2x0aXAuY2xhc3NOYW1lID0gXCJ0aW1lbGluZS10b29sdGlwXCI7XHJcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodG9vbHRpcCk7XHJcbiAgICB9XHJcbiAgICB0b29sdGlwUmVmLmN1cnJlbnQgPSB0b29sdGlwO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGNvbnRhaW5lclJlZi5jdXJyZW50O1xyXG4gICAgY29uc3QgdG9vbHRpcEVsID0gdG9vbHRpcFJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFjb250YWluZXIgfHwgIXRvb2x0aXBFbCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGNsZWFudXBzOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xyXG5cclxuICAgIC8vIENsb3NlIHRvb2x0aXAgb24gb3V0c2lkZSBpbnRlcmFjdGlvbi5cclxuICAgIGlmICghdG9vbHRpcENsb3NlQm91bmRSZWYuY3VycmVudCkge1xyXG4gICAgICB0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50ID0gdHJ1ZTtcclxuICAgICAgY29uc3Qgb25Qb2ludGVyRG93biA9IChldmVudDogUG9pbnRlckV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKCF0b29sdGlwRWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlzaWJsZVwiKSkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGFuY2hvciA9IHRvb2x0aXBBbmNob3JSZWYuY3VycmVudDtcclxuICAgICAgICBpZiAoYW5jaG9yICYmIGFuY2hvci5jb250YWlucyhldmVudC50YXJnZXQgYXMgTm9kZSkpIHJldHVybjtcclxuICAgICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XHJcbiAgICAgICAgdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgfTtcclxuICAgICAgY29uc3Qgb25LZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgICAgdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBvblBvaW50ZXJEb3duLCB0cnVlKTtcclxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgb25LZXlEb3duKTtcclxuICAgICAgY2xlYW51cHMucHVzaCgoKSA9PiB7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uUG9pbnRlckRvd24sIHRydWUpO1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XHJcbiAgICAgICAgdG9vbHRpcENsb3NlQm91bmRSZWYuY3VycmVudCA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTaG93IHRvb2x0aXAgY29udGVudCBjZW50ZXJlZCBvbiBzY3JlZW4uXHJcbiAgICBjb25zdCBzaG93VG9vbHRpcCA9ICh0ZXh0OiBzdHJpbmcsIGFuY2hvcj86IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgIHRvb2x0aXBFbC50ZXh0Q29udGVudCA9IHRleHQ7XHJcbiAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcclxuICAgICAgdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50ID0gYW5jaG9yIHx8IG51bGw7XHJcblxyXG4gICAgICBjb25zdCBjZW50ZXJYID0gTWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpO1xyXG4gICAgICB0b29sdGlwRWwuc3R5bGUubGVmdCA9IGAke2NlbnRlclh9cHhgO1xyXG5cclxuICAgICAgY29uc3QgbWFyZ2luID0gMTI7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtNYXRoLnJvdW5kKHdpbmRvdy5pbm5lckhlaWdodCAqIFRPT0xUSVBfTUFYX0hFSUdIVF9SQVRJTyl9cHhgO1xyXG4gICAgICB0b29sdGlwRWwuc3R5bGUub3ZlcmZsb3dZID0gXCJhdXRvXCI7XHJcblxyXG4gICAgICBsZXQgZm9udFNpemUgPSBUT09MVElQX0JBU0VfRk9OVDtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO1xyXG5cclxuICAgICAgbGV0IHJlY3QgPSB0b29sdGlwRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIGNvbnN0IG1heEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIFRPT0xUSVBfTUFYX0hFSUdIVF9SQVRJTztcclxuICAgICAgd2hpbGUgKHJlY3QuaGVpZ2h0ID4gbWF4SGVpZ2h0ICYmIGZvbnRTaXplID4gVE9PTFRJUF9NSU5fRk9OVCkge1xyXG4gICAgICAgIGZvbnRTaXplIC09IDE7XHJcbiAgICAgICAgdG9vbHRpcEVsLnN0eWxlLmZvbnRTaXplID0gYCR7Zm9udFNpemV9cHhgO1xyXG4gICAgICAgIHJlY3QgPSB0b29sdGlwRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGNlbnRlclkgPSBNYXRoLnJvdW5kKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCkgLyAyKTtcclxuICAgICAgbGV0IHRvcCA9IE51bWJlci5pc0Zpbml0ZShjZW50ZXJZKSA/IGNlbnRlclkgOiBtYXJnaW47XHJcbiAgICAgIGNvbnN0IG1pblRvcCA9IG1hcmdpbjtcclxuICAgICAgY29uc3QgbWF4VG9wID0gTWF0aC5tYXgobWFyZ2luLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCAtIG1hcmdpbik7XHJcbiAgICAgIGlmICh0b3AgPCBtaW5Ub3ApIHRvcCA9IG1pblRvcDtcclxuICAgICAgaWYgKHRvcCA+IG1heFRvcCkgdG9wID0gbWF4VG9wO1xyXG4gICAgICB0b29sdGlwRWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gSGlkZSB0b29sdGlwIGNvbnRlbnQuXHJcbiAgICBjb25zdCBoaWRlVG9vbHRpcCA9ICgpID0+IHtcclxuICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBEZWNpZGUgaWYgYSB0b29sdGlwIHNob3VsZCBkaXNwbGF5LlxyXG4gICAgY29uc3Qgc2hvdWxkUHJldmlldyA9IChlbDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgaWYgKCFlbC5kYXRhc2V0IHx8ICFlbC5kYXRhc2V0LmZ1bGx0ZXh0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgIGlmIChlbC5kYXRhc2V0LnByZXZpZXcgPT09IFwiMVwiKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgcmV0dXJuIGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggKyAxIHx8IGVsLnNjcm9sbEhlaWdodCA+IGVsLmNsaWVudEhlaWdodCArIDE7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlc29sdmVUb29sdGlwVGFyZ2V0ID0gKHRhcmdldDogRXZlbnRUYXJnZXQgfCBudWxsKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSB0YXJnZXQgYXMgSFRNTEVsZW1lbnQgfCBudWxsO1xyXG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcclxuICAgICAgY29uc3QgdGV4dEVsID0gbm9kZS5jbG9zZXN0PEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1uYW1lLCAudGltZWxpbmUtZGVzYy10ZXh0XCIpO1xyXG4gICAgICBpZiAoIXRleHRFbCB8fCAhY29udGFpbmVyLmNvbnRhaW5zKHRleHRFbCkpIHJldHVybiBudWxsO1xyXG4gICAgICByZXR1cm4gdGV4dEVsO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBzaG93VG9vbHRpcEZvckVsZW1lbnQgPSAoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gICAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHRleHQgPSBlbC5kYXRhc2V0LmZ1bGx0ZXh0IHx8IGVsLnRleHRDb250ZW50IHx8IFwiXCI7XHJcbiAgICAgIGlmICghdGV4dCB8fCAhc2hvdWxkUHJldmlldyhlbCkpIHJldHVybjtcclxuICAgICAgc2hvd1Rvb2x0aXAodGV4dCwgZWwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgYWN0aXZlVG9vbHRpcEVsOiBIVE1MRWxlbWVudCB8IG51bGwgPSBudWxsO1xyXG4gICAgbGV0IHByZXNzVGltZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGNvbnN0IGNsZWFyUHJlc3NUaW1lciA9ICgpID0+IHtcclxuICAgICAgaWYgKHByZXNzVGltZXIgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xyXG4gICAgICBwcmVzc1RpbWVyID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU92ZXIgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgdGV4dEVsID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgaWYgKCF0ZXh0RWwpIHJldHVybjtcclxuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gdGV4dEVsO1xyXG4gICAgICBzaG93VG9vbHRpcEZvckVsZW1lbnQodGV4dEVsKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU91dCA9IChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBmcm9tID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgaWYgKCFmcm9tKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHRvID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQucmVsYXRlZFRhcmdldCk7XHJcbiAgICAgIGlmICh0byAmJiB0byA9PT0gZnJvbSkgcmV0dXJuO1xyXG4gICAgICBoaWRlVG9vbHRpcCgpO1xyXG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbk1vdXNlTW92ZSA9ICgpID0+IHtcclxuICAgICAgaWYgKCFhY3RpdmVUb29sdGlwRWwpIHJldHVybjtcclxuICAgICAgaWYgKCF0b29sdGlwRWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlzaWJsZVwiKSkgcmV0dXJuO1xyXG4gICAgICBzaG93VG9vbHRpcEZvckVsZW1lbnQoYWN0aXZlVG9vbHRpcEVsKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25Ub3VjaFN0YXJ0ID0gKGV2ZW50OiBUb3VjaEV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRleHRFbCA9IHJlc29sdmVUb29sdGlwVGFyZ2V0KGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIGlmICghdGV4dEVsKSByZXR1cm47XHJcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IHRleHRFbDtcclxuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XHJcbiAgICAgIHByZXNzVGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgc2hvd1Rvb2x0aXBGb3JFbGVtZW50KHRleHRFbCk7XHJcbiAgICAgIH0sIFRPT0xUSVBfVE9VQ0hfREVMQVlfTVMpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblRvdWNoTW92ZSA9ICgpID0+IHtcclxuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XHJcbiAgICAgIGhpZGVUb29sdGlwKCk7XHJcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uVG91Y2hFbmQgPSAoKSA9PiB7XHJcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBvbk1vdXNlT3Zlcik7XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIG9uTW91c2VPdXQpO1xyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uVG91Y2hTdGFydCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgb25Ub3VjaE1vdmUsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgb25Ub3VjaEVuZCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG5cclxuICAgIGNvbnN0IG9uU2VsZWN0U3RhcnQgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgIGlmICghcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KSkgcmV0dXJuO1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfTtcclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2VsZWN0c3RhcnRcIiwgb25TZWxlY3RTdGFydCk7XHJcblxyXG4gICAgY2xlYW51cHMucHVzaCgoKSA9PiB7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG9uTW91c2VPdmVyKTtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBvbk1vdXNlT3V0KTtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Ub3VjaFN0YXJ0KTtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgb25Ub3VjaE1vdmUpO1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIG9uVG91Y2hFbmQpO1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNlbGVjdHN0YXJ0XCIsIG9uU2VsZWN0U3RhcnQpO1xyXG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmICghZXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgIGNvbnN0IGNhcmRzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLWNhcmRcIik7XHJcbiAgICAgIGNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcclxuICAgICAgICBpZiAoIWNhcmQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGltZWxpbmUtY2FyZC0tbm9kYXRhXCIpKSB7XHJcbiAgICAgICAgICBjb25zdCBjbGVhbnVwUGl4ZWwgPSBjcmVhdGVQaXhlbEVmZmVjdChjYXJkKTtcclxuICAgICAgICAgIGlmIChjbGVhbnVwUGl4ZWwpIGNsZWFudXBzLnB1c2goY2xlYW51cFBpeGVsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgZnJhbWVJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRleHRFbHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtbmFtZSwgLnRpbWVsaW5lLWRlc2MtdGV4dFwiKTtcclxuICAgICAgICB0ZXh0RWxzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0ZXh0ID0gZWwuZGF0YXNldC5mdWxsdGV4dCB8fCBlbC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgICAgICAgY29uc3QgaXNNdWx0aUxpbmUgPSBlbC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0aW1lbGluZS1kZXNjLXRleHRcIik7XHJcbiAgICAgICAgICBjb25zdCB0cmltbWVkVGV4dCA9IFN0cmluZyh0ZXh0IHx8IFwiXCIpLnRyaW0oKTtcclxuICAgICAgICAgIGNvbnN0IGRpZEVsbGlwc2lzID0gYXBwbHlFbGxpcHNpcyhlbCwgdHJpbW1lZFRleHQsIGlzTXVsdGlMaW5lKTtcclxuICAgICAgICAgIGlmIChkaWRFbGxpcHNpcyAmJiBlbC50ZXh0Q29udGVudCA9PT0gRUxMSVBTSVMgJiYgdHJpbW1lZFRleHQubGVuZ3RoID4gMyAmJiBlbC5jbGllbnRXaWR0aCA+IDY0KSB7XHJcbiAgICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gdHJpbW1lZFRleHQ7XHJcbiAgICAgICAgICAgIGVsLmRhdGFzZXQucHJldmlldyA9IFwiMVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNsZWFudXBzLnB1c2goKCkgPT4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGZyYW1lSWQpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBjbGVhbnVwcy5mb3JFYWNoKChjbGVhbnVwKSA9PiBjbGVhbnVwKCkpO1xyXG4gICAgfTtcclxuICB9LCBbY29udGFpbmVyUmVmLCBlcnJvck1lc3NhZ2UsIGl0ZW1zLCByZXNvbHZlQ2xpY2thYmxlQ2FyZF0pO1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7O0FBQUEsbUJBQWdFO0FBMEgxRDtBQXJHTixJQUFNLGlCQUFpQjtBQVN2QixJQUFNLGtCQUFrQixNQUFNO0FBQzVCLE1BQUksT0FBTyxXQUFXLGVBQWUsT0FBTyxhQUFhLFlBQWE7QUFFdEUsUUFBTSxjQUFjLE1BQU07QUFDeEIsVUFBTSxtQkFBbUIsU0FBUztBQUNsQyxRQUFJLGtCQUFrQjtBQUNwQix1QkFBaUIsWUFBWTtBQUM3Qix1QkFBaUIsYUFBYTtBQUFBLElBQ2hDO0FBRUEsYUFBUyxnQkFBZ0IsWUFBWTtBQUNyQyxhQUFTLGdCQUFnQixhQUFhO0FBQ3RDLGFBQVMsS0FBSyxZQUFZO0FBQzFCLGFBQVMsS0FBSyxhQUFhO0FBQzNCLFdBQU8sU0FBUyxFQUFFLEtBQUssR0FBRyxNQUFNLEdBQUcsVUFBVSxPQUFPLENBQUM7QUFBQSxFQUN2RDtBQUVBLGNBQVk7QUFDWixTQUFPLHNCQUFzQixXQUFXO0FBQzFDO0FBR0EsSUFBTSx3QkFBb0I7QUFBQSxFQUN4QixDQUFD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WUFBWSxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBRXBFLFVBQU0sZ0JBQWdCLENBQUMsVUFBaUI7QUFDdEMsVUFBSSxDQUFDLHFCQUFxQixNQUFNLE1BQU0sRUFBRztBQUN6QyxZQUFNLGVBQWU7QUFBQSxJQUN2QjtBQUNBLGNBQVUsaUJBQWlCLGVBQWUsYUFBYTtBQUV2RCxhQUFTLEtBQUssTUFBTTtBQUNsQixnQkFBVSxvQkFBb0IsYUFBYSxXQUFXO0FBQ3RELGdCQUFVLG9CQUFvQixZQUFZLFVBQVU7QUFDcEQsZ0JBQVUsb0JBQW9CLGFBQWEsV0FBVztBQUN0RCxnQkFBVSxvQkFBb0IsY0FBYyxZQUFZO0FBQ3hELGdCQUFVLG9CQUFvQixhQUFhLFdBQVc7QUFDdEQsZ0JBQVUsb0JBQW9CLFlBQVksVUFBVTtBQUNwRCxnQkFBVSxvQkFBb0IsZUFBZSxhQUFhO0FBQzFELHNCQUFnQjtBQUFBLElBQ2xCLENBQUM7QUFFRCxRQUFJLENBQUMsY0FBYztBQUNqQixZQUFNLFFBQVEsVUFBVSxpQkFBOEIsZ0JBQWdCO0FBQ3RFLFlBQU0sUUFBUSxDQUFDLFNBQVM7QUFDdEIsWUFBSSxDQUFDLEtBQUssVUFBVSxTQUFTLHVCQUF1QixHQUFHO0FBQ3JELGdCQUFNLGVBQWUsa0JBQWtCLElBQUk7QUFDM0MsY0FBSSxhQUFjLFVBQVMsS0FBSyxZQUFZO0FBQUEsUUFDOUM7QUFBQSxNQUNGLENBQUM7QUFFRCxZQUFNLFVBQVUsT0FBTyxzQkFBc0IsTUFBTTtBQUNqRCxjQUFNLFVBQVUsVUFBVSxpQkFBOEIscUNBQXFDO0FBQzdGLGdCQUFRLFFBQVEsQ0FBQyxPQUFPO0FBQ3RCLGdCQUFNLE9BQU8sR0FBRyxRQUFRLFlBQVksR0FBRyxlQUFlO0FBQ3RELGdCQUFNLGNBQWMsR0FBRyxVQUFVLFNBQVMsb0JBQW9CO0FBQzlELGdCQUFNLGNBQWMsT0FBTyxRQUFRLEVBQUUsRUFBRSxLQUFLO0FBQzVDLGdCQUFNLGNBQWMsY0FBYyxJQUFJLGFBQWEsV0FBVztBQUM5RCxjQUFJLGVBQWUsR0FBRyxnQkFBZ0IsWUFBWSxZQUFZLFNBQVMsS0FBSyxHQUFHLGNBQWMsSUFBSTtBQUMvRixlQUFHLGNBQWM7QUFDakIsZUFBRyxRQUFRLFVBQVU7QUFBQSxVQUN2QjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUVELGVBQVMsS0FBSyxNQUFNLE9BQU8scUJBQXFCLE9BQU8sQ0FBQztBQUFBLElBQzFEO0FBRUEsV0FBTyxNQUFNO0FBQ1gsZUFBUyxRQUFRLENBQUMsWUFBWSxRQUFRLENBQUM7QUFBQSxJQUN6QztBQUFBLEVBQ0YsR0FBRyxDQUFDLGNBQWMsY0FBYyxPQUFPLG9CQUFvQixDQUFDO0FBQzlEOyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiXQp9Cg==
