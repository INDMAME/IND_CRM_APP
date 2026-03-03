import {
  Spinner_default,
  classNames
} from "./chunk-GEXVJWY3.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-KJNAPDCZ.js";
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
    const requestPageChange = (page) => {
      if (page < 1 || page > safeTotal) return;
      if (page === safeCurrent) return;
      if (hasLoadingSignal) {
        setIsPageTransitionPending(true);
      }
      onPageChange(page);
    };
    const showPageSpinner = hasLoadingSignal && isPageTransitionPending;
    if (!showPagination) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      showPageSpinner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 z-600000 flex items-center justify-center bg-white/45 backdrop-blur-[1px] pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-10 w-10" }) }) : null,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9Db21wYWN0UGFnaW5hdGlvbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIlx1RkVGRmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuXG5jb25zdCBUT09MVElQX1RPVUNIX0RFTEFZX01TID0gMTIwO1xuY29uc3QgVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPID0gMC44O1xuY29uc3QgVE9PTFRJUF9CQVNFX0ZPTlQgPSAxMztcbmNvbnN0IFRPT0xUSVBfTUlOX0ZPTlQgPSAxMTtcbmNvbnN0IEVMTElQU0lTID0gXCIuLi5cIjtcbmNvbnN0IFBJWEVMX0dBUCA9IDU7XG5jb25zdCBQSVhFTF9TUEVFRCA9IDk1O1xuY29uc3QgUElYRUxfQ09MT1JTID0gW1wicmdiYSgwLCA0MSwgMTA3LCAwLjA4KVwiLCBcInJnYmEoMCwgNDEsIDEwNywgMC4xNilcIiwgXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMjYpXCJdO1xuXG50eXBlIFBpeGVsU3RhdGUgPSB7XG4gIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwaXhlbHM6IFBpeGVsW107XG4gIGFuaW1JZDogbnVtYmVyIHwgbnVsbDtcbiAgbGFzdFRpbWU6IG51bWJlcjtcbiAgcmVkdWNlZE1vdGlvbjogYm9vbGVhbjtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG59O1xuXG5leHBvcnQgdHlwZSBVc2VUaW1lbGluZUNhcmRFZmZlY3RzQXJncyA9IHtcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcbiAgZXJyb3JNZXNzYWdlOiBzdHJpbmc7XG4gIGl0ZW1zOiB1bmtub3duW107XG4gIHJlc29sdmVDbGlja2FibGVDYXJkOiAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IEhUTUxFbGVtZW50IHwgbnVsbDtcbn07XG5cbi8vIENvbXB1dGUgcGl4ZWwgc3BlZWQgd2hpbGUgcmVzcGVjdGluZyByZWR1Y2VkIG1vdGlvbiBwcmVmZXJlbmNlLlxuY29uc3QgZ2V0RWZmZWN0aXZlU3BlZWQgPSAodmFsdWU6IG51bWJlciwgcmVkdWNlZE1vdGlvbjogYm9vbGVhbikgPT4ge1xuICBjb25zdCBtaW4gPSAwO1xuICBjb25zdCBtYXggPSAxMDA7XG4gIGNvbnN0IHRocm90dGxlID0gMC4wMDE7XG4gIGNvbnN0IHBhcnNlZCA9IE51bWJlci5wYXJzZUludChTdHJpbmcodmFsdWUpLCAxMCk7XG5cbiAgaWYgKHBhcnNlZCA8PSBtaW4gfHwgcmVkdWNlZE1vdGlvbikgcmV0dXJuIG1pbjtcbiAgaWYgKHBhcnNlZCA+PSBtYXgpIHJldHVybiBtYXggKiB0aHJvdHRsZTtcbiAgcmV0dXJuIHBhcnNlZCAqIHRocm90dGxlO1xufTtcblxuLy8gUGl4ZWwgdXNlZCBieSB0aGUgaG92ZXIgYW5pbWF0aW9uIGNhbnZhcy5cbmNsYXNzIFBpeGVsIHtcbiAgd2lkdGg6IG51bWJlcjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgY29sb3I6IHN0cmluZztcbiAgc3BlZWQ6IG51bWJlcjtcbiAgc2l6ZTogbnVtYmVyO1xuICBzaXplU3RlcDogbnVtYmVyO1xuICBtaW5TaXplOiBudW1iZXI7XG4gIG1heFNpemVJbnRlZ2VyOiBudW1iZXI7XG4gIG1heFNpemU6IG51bWJlcjtcbiAgcGhhc2U6IG51bWJlcjtcbiAgcGhhc2VTdGVwOiBudW1iZXI7XG4gIGRlbGF5OiBudW1iZXI7XG4gIGNvdW50ZXI6IG51bWJlcjtcbiAgY291bnRlclN0ZXA6IG51bWJlcjtcbiAgaXNJZGxlOiBib29sZWFuO1xuICBpc1JldmVyc2U6IGJvb2xlYW47XG4gIGlzU2hpbW1lcjogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcihjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LCBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsIHg6IG51bWJlciwgeTogbnVtYmVyLCBjb2xvcjogc3RyaW5nLCBzcGVlZDogbnVtYmVyLCBkZWxheTogbnVtYmVyKSB7XG4gICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgdGhpcy5jdHggPSBjb250ZXh0O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUoMC4xLCAwLjkpICogc3BlZWQ7XG4gICAgdGhpcy5zaXplID0gMDtcbiAgICB0aGlzLnNpemVTdGVwID0gTWF0aC5yYW5kb20oKSAqIDAuMyArIDAuMTtcbiAgICB0aGlzLm1pblNpemUgPSAwLjU7XG4gICAgdGhpcy5tYXhTaXplSW50ZWdlciA9IDI7XG4gICAgdGhpcy5tYXhTaXplID0gdGhpcy5nZXRSYW5kb21WYWx1ZSh0aGlzLm1pblNpemUsIHRoaXMubWF4U2l6ZUludGVnZXIpO1xuICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcbiAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgIHRoaXMuY291bnRlclN0ZXAgPSBNYXRoLnJhbmRvbSgpICogNSArICh0aGlzLndpZHRoICsgdGhpcy5oZWlnaHQpICogMC4wMTU7XG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmV2ZXJzZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNTaGltbWVyID0gZmFsc2U7XG4gICAgdGhpcy5waGFzZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcbiAgICB0aGlzLnBoYXNlU3RlcCA9IE1hdGgubWF4KDAsIHRoaXMuc3BlZWQgKiAoMC44ICsgTWF0aC5yYW5kb20oKSAqIDAuNikpO1xuICB9XG5cbiAgLy8gUmV0dXJuIGEgcmFuZG9tIGZsb2F0IGJldHdlZW4gbWluIGFuZCBtYXguXG4gIGdldFJhbmRvbVZhbHVlKG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG4gIH1cblxuICAvLyBEcmF3IHRoZSBwaXhlbCBhdCBpdHMgY3VycmVudCBzaXplLlxuICBkcmF3KCkge1xuICAgIGNvbnN0IGNlbnRlck9mZnNldCA9IHRoaXMubWF4U2l6ZUludGVnZXIgKiAwLjUgLSB0aGlzLnNpemUgKiAwLjU7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLnggKyBjZW50ZXJPZmZzZXQsIHRoaXMueSArIGNlbnRlck9mZnNldCwgdGhpcy5zaXplLCB0aGlzLnNpemUpO1xuICB9XG5cbiAgLy8gQW5pbWF0ZSB0aGUgcGl4ZWwgYXBwZWFyaW5nLlxuICBhcHBlYXIoKSB7XG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5jb3VudGVyIDw9IHRoaXMuZGVsYXkpIHtcbiAgICAgIHRoaXMuY291bnRlciArPSB0aGlzLmNvdW50ZXJTdGVwO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXplID49IHRoaXMubWF4U2l6ZSkge1xuICAgICAgdGhpcy5pc1NoaW1tZXIgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc1NoaW1tZXIpIHtcbiAgICAgIHRoaXMuc2hpbW1lcigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpemUgKz0gdGhpcy5zaXplU3RlcDtcbiAgICB9XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvLyBBbmltYXRlIHRoZSBwaXhlbCBkaXNhcHBlYXJpbmcuXG4gIGRpc2FwcGVhcigpIHtcbiAgICB0aGlzLmlzU2hpbW1lciA9IGZhbHNlO1xuICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgaWYgKHRoaXMuc2l6ZSA8PSAwKSB7XG4gICAgICB0aGlzLmlzSWRsZSA9IHRydWU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2l6ZSAtPSAwLjE7XG4gICAgdGhpcy5kcmF3KCk7XG4gIH1cblxuICAvLyBPc2NpbGxhdGUgcGl4ZWwgc2l6ZSB3aGlsZSB2aXNpYmxlLlxuICBzaGltbWVyKCkge1xuICAgIGlmICghdGhpcy5waGFzZVN0ZXApIHJldHVybjtcbiAgICB0aGlzLnBoYXNlICs9IHRoaXMucGhhc2VTdGVwO1xuICAgIGNvbnN0IGFtcCA9ICh0aGlzLm1heFNpemUgLSB0aGlzLm1pblNpemUpICogMC41O1xuICAgIHRoaXMuc2l6ZSA9IHRoaXMubWluU2l6ZSArIGFtcCArIGFtcCAqIE1hdGguc2luKHRoaXMucGhhc2UpO1xuICB9XG59XG5cbi8vIENyZWF0ZSB0aGUgcGl4ZWwgY2FudmFzIGhvdmVyIGVmZmVjdCBmb3IgYSB0aW1lbGluZSBjYXJkLlxuY29uc3QgY3JlYXRlUGl4ZWxFZmZlY3QgPSAoY2FyZEVsOiBIVE1MRWxlbWVudCkgPT4ge1xuICBpZiAoIWNhcmRFbCkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gIGNhbnZhcy5jbGFzc05hbWUgPSBcInRpbWVsaW5lLXBpeGVsLWNhbnZhc1wiO1xuICBjYXJkRWwuYXBwZW5kQ2hpbGQoY2FudmFzKTtcblxuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICBpZiAoIWN0eCkge1xuICAgIGNhbnZhcy5yZW1vdmUoKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHJlZHVjZWRNb3Rpb24gPSB3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpXCIpLm1hdGNoZXM7XG4gIGNvbnN0IHN0YXRlOiBQaXhlbFN0YXRlID0ge1xuICAgIGNhbnZhcyxcbiAgICBjdHgsXG4gICAgcGl4ZWxzOiBbXSxcbiAgICBhbmltSWQ6IG51bGwsXG4gICAgbGFzdFRpbWU6IHBlcmZvcm1hbmNlLm5vdygpLFxuICAgIHJlZHVjZWRNb3Rpb24sXG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICB9O1xuXG4gIGNvbnN0IGluaXRQaXhlbHMgPSAoKSA9PiB7XG4gICAgY29uc3QgcmVjdCA9IGNhcmRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB3aWR0aCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVjdC53aWR0aCkpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KDEsIE1hdGguZmxvb3IocmVjdC5oZWlnaHQpKTtcbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHJldHVybjtcblxuICAgIHN0YXRlLndpZHRoID0gd2lkdGg7XG4gICAgc3RhdGUuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHR9cHhgO1xuXG4gICAgY29uc3QgZ2FwID0gTWF0aC5tYXgoMywgTWF0aC5mbG9vcihQSVhFTF9HQVApKTtcbiAgICBjb25zdCBzcGVlZCA9IGdldEVmZmVjdGl2ZVNwZWVkKFBJWEVMX1NQRUVELCByZWR1Y2VkTW90aW9uKTtcbiAgICBjb25zdCBwaXhlbHM6IFBpeGVsW10gPSBbXTtcblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHggKz0gZ2FwKSB7XG4gICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSArPSBnYXApIHtcbiAgICAgICAgY29uc3QgY29sb3IgPSBQSVhFTF9DT0xPUlNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogUElYRUxfQ09MT1JTLmxlbmd0aCldO1xuICAgICAgICBjb25zdCBkeCA9IHggLSB3aWR0aCAvIDI7XG4gICAgICAgIGNvbnN0IGR5ID0geSAtIGhlaWdodCAvIDI7XG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgY29uc3QgZGVsYXkgPSByZWR1Y2VkTW90aW9uID8gMCA6IGRpc3RhbmNlICogMC4zNTtcbiAgICAgICAgcGl4ZWxzLnB1c2gobmV3IFBpeGVsKGNhbnZhcywgY3R4LCB4LCB5LCBjb2xvciwgc3BlZWQsIGRlbGF5KSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGUucGl4ZWxzID0gcGl4ZWxzO1xuICB9O1xuXG4gIGNvbnN0IGRvQW5pbWF0ZSA9IChmbk5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XG4gICAgc3RhdGUuYW5pbUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IGRvQW5pbWF0ZShmbk5hbWUpKTtcbiAgICBjb25zdCB0aW1lTm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgY29uc3QgdGltZVBhc3NlZCA9IHRpbWVOb3cgLSBzdGF0ZS5sYXN0VGltZTtcbiAgICBjb25zdCB0aW1lSW50ZXJ2YWwgPSAxMDAwIC8gNjA7XG5cbiAgICBpZiAodGltZVBhc3NlZCA8IHRpbWVJbnRlcnZhbCkgcmV0dXJuO1xuICAgIHN0YXRlLmxhc3RUaW1lID0gdGltZU5vdyAtICh0aW1lUGFzc2VkICUgdGltZUludGVydmFsKTtcblxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc3RhdGUud2lkdGgsIHN0YXRlLmhlaWdodCk7XG5cbiAgICBsZXQgYWxsSWRsZSA9IHRydWU7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS5waXhlbHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHBpeGVsID0gc3RhdGUucGl4ZWxzW2ldO1xuICAgICAgcGl4ZWxbZm5OYW1lXSgpO1xuICAgICAgaWYgKCFwaXhlbC5pc0lkbGUpIGFsbElkbGUgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGFsbElkbGUgJiYgc3RhdGUuYW5pbUlkKSB7XG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xuICAgICAgc3RhdGUuYW5pbUlkID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQW5pbWF0aW9uID0gKG5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XG4gICAgaWYgKCFzdGF0ZS5waXhlbHMubGVuZ3RoKSByZXR1cm47XG4gICAgaWYgKHN0YXRlLmFuaW1JZCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhdGUuYW5pbUlkKTtcbiAgICBzdGF0ZS5sYXN0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgIHN0YXRlLmFuaW1JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBkb0FuaW1hdGUobmFtZSkpO1xuICB9O1xuXG4gIGNvbnN0IG9uRW50ZXIgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJhcHBlYXJcIik7XG4gIGNvbnN0IG9uTGVhdmUgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJkaXNhcHBlYXJcIik7XG5cbiAgY2FyZEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xuICBjYXJkRWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgb25MZWF2ZSk7XG5cbiAgbGV0IHJvOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xuICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoaW5pdFBpeGVscyk7XG4gICAgcm8ub2JzZXJ2ZShjYXJkRWwpO1xuICB9XG5cbiAgaW5pdFBpeGVscygpO1xuXG4gIHJldHVybiAoKSA9PiB7XG4gICAgY2FyZEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xuICAgIGNhcmRFbC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbkxlYXZlKTtcbiAgICBpZiAoc3RhdGUuYW5pbUlkKSBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xuICAgIGlmIChybykgcm8uZGlzY29ubmVjdCgpO1xuICAgIGNhbnZhcy5yZW1vdmUoKTtcbiAgfTtcbn07XG5cbi8vIFNob3J0ZW4gb3ZlcmZsb3dpbmcgdGV4dCB3aXRoIGEgY29tcHV0ZWQgZWxsaXBzaXMuXG5jb25zdCBhcHBseUVsbGlwc2lzID0gKGVsOiBIVE1MRWxlbWVudCwgZnVsbFRleHQ6IHN0cmluZywgbXVsdGlMaW5lOiBib29sZWFuKSA9PiB7XG4gIGlmICghZWwgfHwgIWZ1bGxUZXh0KSByZXR1cm4gZmFsc2U7XG4gIGlmIChtdWx0aUxpbmUgJiYgZWwuY2xpZW50SGVpZ2h0ID09PSAwKSByZXR1cm4gZmFsc2U7XG4gIGlmICghbXVsdGlMaW5lICYmIGVsLmNsaWVudFdpZHRoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKG11bHRpTGluZSkge1xuICAgIGNvbnN0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xuICAgIGxldCBsaW5lSGVpZ2h0ID0gTnVtYmVyLnBhcnNlRmxvYXQoY29tcHV0ZWQubGluZUhlaWdodCk7XG4gICAgLy8gU29tZSBicm93c2VycyByZXR1cm4gdW5pdGxlc3MgbGluZS1oZWlnaHQgdmFsdWVzIGZvciBjb21wdXRlZCBzdHlsZXMuXG4gICAgLy8gQ29udmVydCB0aW55IHVuaXRsZXNzIHZhbHVlcyB1c2luZyBmb250LXNpemUgdG8gYXZvaWQgY29sbGFwc2luZyB0ZXh0LlxuICAgIGlmIChOdW1iZXIuaXNGaW5pdGUobGluZUhlaWdodCkgJiYgbGluZUhlaWdodCA+IDAgJiYgbGluZUhlaWdodCA8IDgpIHtcbiAgICAgIGNvbnN0IGZvbnRTaXplID0gTnVtYmVyLnBhcnNlRmxvYXQoY29tcHV0ZWQuZm9udFNpemUpO1xuICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShmb250U2l6ZSkgJiYgZm9udFNpemUgPiAwKSB7XG4gICAgICAgIGxpbmVIZWlnaHQgPSBsaW5lSGVpZ2h0ICogZm9udFNpemU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKGxpbmVIZWlnaHQpKSB7XG4gICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBsaW5lSGVpZ2h0ID0gcmVjdC5oZWlnaHQgPiAwID8gcmVjdC5oZWlnaHQgLyAyIDogMDtcbiAgICB9XG4gICAgaWYgKGxpbmVIZWlnaHQgPiAwKSB7XG4gICAgICBlbC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGxpbmVIZWlnaHQgKiAyKX1weGA7XG4gICAgICBlbC5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XG4gICAgfVxuICB9XG5cbiAgZWwudGV4dENvbnRlbnQgPSBmdWxsVGV4dDtcblxuICBjb25zdCBpc092ZXJmbG93aW5nID0gKCkgPT4gKFxuICAgIG11bHRpTGluZVxuICAgICAgPyBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgKyAxXG4gICAgICA6IGVsLnNjcm9sbFdpZHRoID4gZWwuY2xpZW50V2lkdGggKyAxXG4gICk7XG5cbiAgaWYgKCFpc092ZXJmbG93aW5nKCkpIHtcbiAgICBlbC5kYXRhc2V0LnByZXZpZXcgPSBcIjBcIjtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgbG93ID0gMDtcbiAgbGV0IGhpZ2ggPSBmdWxsVGV4dC5sZW5ndGg7XG4gIGxldCBiZXN0ID0gMDtcblxuICB3aGlsZSAobG93IDw9IGhpZ2gpIHtcbiAgICBjb25zdCBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xuICAgIGNvbnN0IGNhbmRpZGF0ZSA9IGAke2Z1bGxUZXh0LnNsaWNlKDAsIE1hdGgubWF4KDAsIG1pZCkpLnRyaW1FbmQoKX0ke0VMTElQU0lTfWA7XG4gICAgZWwudGV4dENvbnRlbnQgPSBjYW5kaWRhdGU7XG4gICAgaWYgKGlzT3ZlcmZsb3dpbmcoKSkge1xuICAgICAgaGlnaCA9IG1pZCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJlc3QgPSBtaWQ7XG4gICAgICBsb3cgPSBtaWQgKyAxO1xuICAgIH1cbiAgfVxuXG4gIGVsLnRleHRDb250ZW50ID0gYCR7ZnVsbFRleHQuc2xpY2UoMCwgTWF0aC5tYXgoMCwgYmVzdCkpLnRyaW1FbmQoKX0ke0VMTElQU0lTfWA7XG4gIGVsLmRhdGFzZXQucHJldmlldyA9IFwiMVwiO1xuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8vIE93bnMgdG9vbHRpcCwgZWxsaXBzaXMsIGFuZCBwaXhlbCBlZmZlY3RzIGZvciB0aW1lbGluZSBjYXJkcy5cbmV4cG9ydCBjb25zdCB1c2VUaW1lbGluZUNhcmRFZmZlY3RzID0gKHtcbiAgY29udGFpbmVyUmVmLFxuICBlcnJvck1lc3NhZ2UsXG4gIGl0ZW1zLFxuICByZXNvbHZlQ2xpY2thYmxlQ2FyZCxcbn06IFVzZVRpbWVsaW5lQ2FyZEVmZmVjdHNBcmdzKSA9PiB7XG4gIGNvbnN0IHRvb2x0aXBSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgdG9vbHRpcEFuY2hvclJlZiA9IHVzZVJlZjxIVE1MRWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCB0b29sdGlwQ2xvc2VCb3VuZFJlZiA9IHVzZVJlZihmYWxzZSk7XG5cbiAgLy8gRW5zdXJlIHRoZSBzaGFyZWQgdG9vbHRpcCBlbGVtZW50IGV4aXN0cyBvbmNlLlxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICh0b29sdGlwUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICBsZXQgdG9vbHRpcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGltZWxpbmVUb29sdGlwXCIpIGFzIEhUTUxEaXZFbGVtZW50IHwgbnVsbDtcbiAgICBpZiAoIXRvb2x0aXApIHtcbiAgICAgIHRvb2x0aXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgdG9vbHRpcC5pZCA9IFwidGltZWxpbmVUb29sdGlwXCI7XG4gICAgICB0b29sdGlwLmNsYXNzTmFtZSA9IFwidGltZWxpbmUtdG9vbHRpcFwiO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0b29sdGlwKTtcbiAgICB9XG4gICAgdG9vbHRpcFJlZi5jdXJyZW50ID0gdG9vbHRpcDtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gY29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgdG9vbHRpcEVsID0gdG9vbHRpcFJlZi5jdXJyZW50O1xuICAgIGlmICghY29udGFpbmVyIHx8ICF0b29sdGlwRWwpIHJldHVybjtcblxuICAgIGNvbnN0IGNsZWFudXBzOiBBcnJheTwoKSA9PiB2b2lkPiA9IFtdO1xuXG4gICAgLy8gQ2xvc2UgdG9vbHRpcCBvbiBvdXRzaWRlIGludGVyYWN0aW9uLlxuICAgIGlmICghdG9vbHRpcENsb3NlQm91bmRSZWYuY3VycmVudCkge1xuICAgICAgdG9vbHRpcENsb3NlQm91bmRSZWYuY3VycmVudCA9IHRydWU7XG4gICAgICBjb25zdCBvblBvaW50ZXJEb3duID0gKGV2ZW50OiBQb2ludGVyRXZlbnQpID0+IHtcbiAgICAgICAgaWYgKCF0b29sdGlwRWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwidmlzaWJsZVwiKSkgcmV0dXJuO1xuICAgICAgICBjb25zdCBhbmNob3IgPSB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQ7XG4gICAgICAgIGlmIChhbmNob3IgJiYgYW5jaG9yLmNvbnRhaW5zKGV2ZW50LnRhcmdldCBhcyBOb2RlKSkgcmV0dXJuO1xuICAgICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG4gICAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICB9O1xuICAgICAgY29uc3Qgb25LZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcbiAgICAgICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG4gICAgICAgICAgdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBvblBvaW50ZXJEb3duLCB0cnVlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XG4gICAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsIG9uUG9pbnRlckRvd24sIHRydWUpO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xuICAgICAgICB0b29sdGlwQ2xvc2VCb3VuZFJlZi5jdXJyZW50ID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTaG93IHRvb2x0aXAgY29udGVudCBjZW50ZXJlZCBvbiBzY3JlZW4uXG4gICAgY29uc3Qgc2hvd1Rvb2x0aXAgPSAodGV4dDogc3RyaW5nLCBhbmNob3I/OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgdG9vbHRpcEVsLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QuYWRkKFwidmlzaWJsZVwiKTtcbiAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IGFuY2hvciB8fCBudWxsO1xuXG4gICAgICBjb25zdCBjZW50ZXJYID0gTWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpO1xuICAgICAgdG9vbHRpcEVsLnN0eWxlLmxlZnQgPSBgJHtjZW50ZXJYfXB4YDtcblxuICAgICAgY29uc3QgbWFyZ2luID0gMTI7XG4gICAgICB0b29sdGlwRWwuc3R5bGUubWF4SGVpZ2h0ID0gYCR7TWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJIZWlnaHQgKiBUT09MVElQX01BWF9IRUlHSFRfUkFUSU8pfXB4YDtcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5vdmVyZmxvd1kgPSBcImF1dG9cIjtcblxuICAgICAgbGV0IGZvbnRTaXplID0gVE9PTFRJUF9CQVNFX0ZPTlQ7XG4gICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XG5cbiAgICAgIGxldCByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgbWF4SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0ICogVE9PTFRJUF9NQVhfSEVJR0hUX1JBVElPO1xuICAgICAgd2hpbGUgKHJlY3QuaGVpZ2h0ID4gbWF4SGVpZ2h0ICYmIGZvbnRTaXplID4gVE9PTFRJUF9NSU5fRk9OVCkge1xuICAgICAgICBmb250U2l6ZSAtPSAxO1xuICAgICAgICB0b29sdGlwRWwuc3R5bGUuZm9udFNpemUgPSBgJHtmb250U2l6ZX1weGA7XG4gICAgICAgIHJlY3QgPSB0b29sdGlwRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNlbnRlclkgPSBNYXRoLnJvdW5kKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCkgLyAyKTtcbiAgICAgIGxldCB0b3AgPSBOdW1iZXIuaXNGaW5pdGUoY2VudGVyWSkgPyBjZW50ZXJZIDogbWFyZ2luO1xuICAgICAgY29uc3QgbWluVG9wID0gbWFyZ2luO1xuICAgICAgY29uc3QgbWF4VG9wID0gTWF0aC5tYXgobWFyZ2luLCB3aW5kb3cuaW5uZXJIZWlnaHQgLSByZWN0LmhlaWdodCAtIG1hcmdpbik7XG4gICAgICBpZiAodG9wIDwgbWluVG9wKSB0b3AgPSBtaW5Ub3A7XG4gICAgICBpZiAodG9wID4gbWF4VG9wKSB0b3AgPSBtYXhUb3A7XG4gICAgICB0b29sdGlwRWwuc3R5bGUudG9wID0gYCR7TWF0aC5yb3VuZCh0b3ApfXB4YDtcbiAgICB9O1xuXG4gICAgLy8gSGlkZSB0b29sdGlwIGNvbnRlbnQuXG4gICAgY29uc3QgaGlkZVRvb2x0aXAgPSAoKSA9PiB7XG4gICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LnJlbW92ZShcInZpc2libGVcIik7XG4gICAgICB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBEZWNpZGUgaWYgYSB0b29sdGlwIHNob3VsZCBkaXNwbGF5LlxuICAgIGNvbnN0IHNob3VsZFByZXZpZXcgPSAoZWw6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICBpZiAoIWVsLmRhdGFzZXQgfHwgIWVsLmRhdGFzZXQuZnVsbHRleHQpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmIChlbC5kYXRhc2V0LnByZXZpZXcgPT09IFwiMVwiKSByZXR1cm4gdHJ1ZTtcbiAgICAgIHJldHVybiBlbC5zY3JvbGxXaWR0aCA+IGVsLmNsaWVudFdpZHRoICsgMSB8fCBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgKyAxO1xuICAgIH07XG5cbiAgICBjb25zdCByZXNvbHZlVG9vbHRpcFRhcmdldCA9ICh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xuICAgICAgY29uc3Qgbm9kZSA9IHRhcmdldCBhcyBIVE1MRWxlbWVudCB8IG51bGw7XG4gICAgICBpZiAoIW5vZGUgfHwgdHlwZW9mIG5vZGUuY2xvc2VzdCAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gbnVsbDtcbiAgICAgIGNvbnN0IHRleHRFbCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtbmFtZSwgLnRpbWVsaW5lLWRlc2MtdGV4dFwiKTtcbiAgICAgIGlmICghdGV4dEVsIHx8ICFjb250YWluZXIuY29udGFpbnModGV4dEVsKSkgcmV0dXJuIG51bGw7XG4gICAgICByZXR1cm4gdGV4dEVsO1xuICAgIH07XG5cbiAgICBjb25zdCBzaG93VG9vbHRpcEZvckVsZW1lbnQgPSAoZWw6IEhUTUxFbGVtZW50IHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQuZnVsbHRleHQgfHwgZWwudGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgICAgIGlmICghdGV4dCB8fCAhc2hvdWxkUHJldmlldyhlbCkpIHJldHVybjtcbiAgICAgIHNob3dUb29sdGlwKHRleHQsIGVsKTtcbiAgICB9O1xuXG4gICAgbGV0IGFjdGl2ZVRvb2x0aXBFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcbiAgICBsZXQgcHJlc3NUaW1lcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG5cbiAgICBjb25zdCBjbGVhclByZXNzVGltZXIgPSAoKSA9PiB7XG4gICAgICBpZiAocHJlc3NUaW1lciA9PSBudWxsKSByZXR1cm47XG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHByZXNzVGltZXIpO1xuICAgICAgcHJlc3NUaW1lciA9IG51bGw7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VPdmVyID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB0ZXh0RWwgPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC50YXJnZXQpO1xuICAgICAgaWYgKCF0ZXh0RWwpIHJldHVybjtcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IHRleHRFbDtcbiAgICAgIHNob3dUb29sdGlwRm9yRWxlbWVudCh0ZXh0RWwpO1xuICAgIH07XG5cbiAgICBjb25zdCBvbk1vdXNlT3V0ID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBmcm9tID0gcmVzb2x2ZVRvb2x0aXBUYXJnZXQoZXZlbnQudGFyZ2V0KTtcbiAgICAgIGlmICghZnJvbSkgcmV0dXJuO1xuICAgICAgY29uc3QgdG8gPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC5yZWxhdGVkVGFyZ2V0KTtcbiAgICAgIGlmICh0byAmJiB0byA9PT0gZnJvbSkgcmV0dXJuO1xuICAgICAgaGlkZVRvb2x0aXAoKTtcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IG51bGw7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gKCkgPT4ge1xuICAgICAgaWYgKCFhY3RpdmVUb29sdGlwRWwpIHJldHVybjtcbiAgICAgIGlmICghdG9vbHRpcEVsLmNsYXNzTGlzdC5jb250YWlucyhcInZpc2libGVcIikpIHJldHVybjtcbiAgICAgIHNob3dUb29sdGlwRm9yRWxlbWVudChhY3RpdmVUb29sdGlwRWwpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoU3RhcnQgPSAoZXZlbnQ6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRleHRFbCA9IHJlc29sdmVUb29sdGlwVGFyZ2V0KGV2ZW50LnRhcmdldCk7XG4gICAgICBpZiAoIXRleHRFbCkgcmV0dXJuO1xuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gdGV4dEVsO1xuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XG4gICAgICBwcmVzc1RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzaG93VG9vbHRpcEZvckVsZW1lbnQodGV4dEVsKTtcbiAgICAgIH0sIFRPT0xUSVBfVE9VQ0hfREVMQVlfTVMpO1xuICAgIH07XG5cbiAgICBjb25zdCBvblRvdWNoTW92ZSA9ICgpID0+IHtcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xuICAgICAgaGlkZVRvb2x0aXAoKTtcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IG51bGw7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uVG91Y2hFbmQgPSAoKSA9PiB7XG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcbiAgICB9O1xuXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgb25Nb3VzZU92ZXIpO1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgb25Nb3VzZU91dCk7XG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvblRvdWNoU3RhcnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLCBvblRvdWNoTW92ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgb25Ub3VjaEVuZCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gICAgY29uc3Qgb25TZWxlY3RTdGFydCA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGlmICghcmVzb2x2ZUNsaWNrYWJsZUNhcmQoZXZlbnQudGFyZ2V0KSkgcmV0dXJuO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9O1xuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwic2VsZWN0c3RhcnRcIiwgb25TZWxlY3RTdGFydCk7XG5cbiAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIG9uTW91c2VPdmVyKTtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgb25Nb3VzZU91dCk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBvbk1vdXNlTW92ZSk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgb25Ub3VjaFN0YXJ0KTtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIG9uVG91Y2hNb3ZlKTtcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIiwgb25Ub3VjaEVuZCk7XG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNlbGVjdHN0YXJ0XCIsIG9uU2VsZWN0U3RhcnQpO1xuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoIWVycm9yTWVzc2FnZSkge1xuICAgICAgY29uc3QgY2FyZHMgPSBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtY2FyZFwiKTtcbiAgICAgIGNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgICAgaWYgKCFjYXJkLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWVsaW5lLWNhcmQtLW5vZGF0YVwiKSkge1xuICAgICAgICAgIGNvbnN0IGNsZWFudXBQaXhlbCA9IGNyZWF0ZVBpeGVsRWZmZWN0KGNhcmQpO1xuICAgICAgICAgIGlmIChjbGVhbnVwUGl4ZWwpIGNsZWFudXBzLnB1c2goY2xlYW51cFBpeGVsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGZyYW1lSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dEVscyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1uYW1lLCAudGltZWxpbmUtZGVzYy10ZXh0XCIpO1xuICAgICAgICB0ZXh0RWxzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQuZnVsbHRleHQgfHwgZWwudGV4dENvbnRlbnQgfHwgXCJcIjtcbiAgICAgICAgICBjb25zdCBpc011bHRpTGluZSA9IGVsLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWVsaW5lLWRlc2MtdGV4dFwiKTtcbiAgICAgICAgICBjb25zdCB0cmltbWVkVGV4dCA9IFN0cmluZyh0ZXh0IHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgICAgICBjb25zdCBkaWRFbGxpcHNpcyA9IGFwcGx5RWxsaXBzaXMoZWwsIHRyaW1tZWRUZXh0LCBpc011bHRpTGluZSk7XG4gICAgICAgICAgaWYgKGRpZEVsbGlwc2lzICYmIGVsLnRleHRDb250ZW50ID09PSBFTExJUFNJUyAmJiB0cmltbWVkVGV4dC5sZW5ndGggPiAzICYmIGVsLmNsaWVudFdpZHRoID4gNjQpIHtcbiAgICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gdHJpbW1lZFRleHQ7XG4gICAgICAgICAgICBlbC5kYXRhc2V0LnByZXZpZXcgPSBcIjFcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGNsZWFudXBzLnB1c2goKCkgPT4gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGZyYW1lSWQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYW51cHMuZm9yRWFjaCgoY2xlYW51cCkgPT4gY2xlYW51cCgpKTtcbiAgICB9O1xuICB9LCBbY29udGFpbmVyUmVmLCBlcnJvck1lc3NhZ2UsIGl0ZW1zLCByZXNvbHZlQ2xpY2thYmxlQ2FyZF0pO1xufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyBmb3J3YXJkUmVmLCB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuL1NwaW5uZXIudHN4XCI7XG5cbnR5cGUgUGFnaW5hdGlvbkxhYmVscyA9IHtcbiAgZmlyc3Q/OiBzdHJpbmc7XG4gIHByZXY/OiBzdHJpbmc7XG4gIG5leHQ/OiBzdHJpbmc7XG4gIGxhc3Q/OiBzdHJpbmc7XG59O1xuXG50eXBlIENvbXBhY3RQYWdpbmF0aW9uUHJvcHMgPSB7XG4gIHRvdGFsUGFnZXM6IG51bWJlcjtcbiAgY3VycmVudFBhZ2U6IG51bWJlcjtcbiAgcGFnZVdpbmRvdz86IG51bWJlcjtcbiAgb25QYWdlQ2hhbmdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xuICBsYWJlbHM/OiBQYWdpbmF0aW9uTGFiZWxzO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGxvYWRpbmc/OiBib29sZWFuO1xufTtcblxuY29uc3QgREVGQVVMVF9XSU5ET1cgPSA2O1xuXG4vLyBDb21wYWN0IHBhZ2luYXRpb24gd2l0aCA2LXBhZ2Ugd2luZG93IGFuZCBlZGdlIGNvbnRyb2xzLlxuY29uc3QgQ29tcGFjdFBhZ2luYXRpb24gPSBmb3J3YXJkUmVmPEhUTUxEaXZFbGVtZW50LCBDb21wYWN0UGFnaW5hdGlvblByb3BzPihcbiAgKHsgdG90YWxQYWdlcywgY3VycmVudFBhZ2UsIHBhZ2VXaW5kb3cgPSBERUZBVUxUX1dJTkRPVywgb25QYWdlQ2hhbmdlLCBsYWJlbHMsIGNsYXNzTmFtZSwgbG9hZGluZyB9LCByZWYpID0+IHtcbiAgICBjb25zdCBzYWZlVG90YWwgPSBNYXRoLm1heCgwLCB0b3RhbFBhZ2VzIHx8IDApO1xuICAgIGNvbnN0IHNhZmVDdXJyZW50ID0gTWF0aC5taW4oTWF0aC5tYXgoMSwgY3VycmVudFBhZ2UgfHwgMSksIHNhZmVUb3RhbCB8fCAxKTtcbiAgICBjb25zdCB3aW5kb3dTaXplID0gTWF0aC5tYXgoMSwgcGFnZVdpbmRvdyB8fCBERUZBVUxUX1dJTkRPVyk7XG4gICAgY29uc3QgaGFzTG9hZGluZ1NpZ25hbCA9IHR5cGVvZiBsb2FkaW5nID09PSBcImJvb2xlYW5cIjtcbiAgICBjb25zdCBpc0xvYWRpbmcgPSBsb2FkaW5nID09PSB0cnVlO1xuICAgIGNvbnN0IFtpc1BhZ2VUcmFuc2l0aW9uUGVuZGluZywgc2V0SXNQYWdlVHJhbnNpdGlvblBlbmRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gICAgY29uc3Qgc2hvd1BhZ2luYXRpb24gPSBzYWZlVG90YWwgPiAxO1xuICAgIGNvbnN0IHNob3dFZGdlTmF2ID0gc2FmZVRvdGFsID4gd2luZG93U2l6ZTtcbiAgICBjb25zdCBjYW5KdW1wVG9TdGFydCA9IHNhZmVDdXJyZW50ID4gd2luZG93U2l6ZTtcbiAgICBjb25zdCBjYW5Hb1ByZXYgPSBzYWZlQ3VycmVudCA+IDE7XG4gICAgY29uc3QgY2FuR29OZXh0ID0gc2FmZUN1cnJlbnQgPCBzYWZlVG90YWw7XG5cbiAgICBjb25zdCBwYWdlTnVtYmVycyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgICAgaWYgKCFzYWZlVG90YWwpIHJldHVybiBbXTtcbiAgICAgIGNvbnN0IHdpbmRvd1N0YXJ0ID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcigoc2FmZUN1cnJlbnQgLSAxKSAvIHdpbmRvd1NpemUpICogd2luZG93U2l6ZSArIDEpO1xuICAgICAgY29uc3Qgd2luZG93RW5kID0gTWF0aC5taW4oc2FmZVRvdGFsLCB3aW5kb3dTdGFydCArIHdpbmRvd1NpemUgLSAxKTtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB3aW5kb3dFbmQgLSB3aW5kb3dTdGFydCArIDEgfSwgKF92YWwsIGlkeCkgPT4gd2luZG93U3RhcnQgKyBpZHgpO1xuICAgIH0sIFtzYWZlQ3VycmVudCwgc2FmZVRvdGFsLCB3aW5kb3dTaXplXSk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgaWYgKCFoYXNMb2FkaW5nU2lnbmFsIHx8ICFpc1BhZ2VUcmFuc2l0aW9uUGVuZGluZykgcmV0dXJuO1xuICAgICAgaWYgKGlzTG9hZGluZykgcmV0dXJuO1xuICAgICAgc2V0SXNQYWdlVHJhbnNpdGlvblBlbmRpbmcoZmFsc2UpO1xuICAgIH0sIFtoYXNMb2FkaW5nU2lnbmFsLCBpc0xvYWRpbmcsIGlzUGFnZVRyYW5zaXRpb25QZW5kaW5nXSk7XG5cbiAgICBjb25zdCByZXF1ZXN0UGFnZUNoYW5nZSA9IChwYWdlOiBudW1iZXIpID0+IHtcbiAgICAgIGlmIChwYWdlIDwgMSB8fCBwYWdlID4gc2FmZVRvdGFsKSByZXR1cm47XG4gICAgICBpZiAocGFnZSA9PT0gc2FmZUN1cnJlbnQpIHJldHVybjtcbiAgICAgIGlmIChoYXNMb2FkaW5nU2lnbmFsKSB7XG4gICAgICAgIHNldElzUGFnZVRyYW5zaXRpb25QZW5kaW5nKHRydWUpO1xuICAgICAgfVxuICAgICAgb25QYWdlQ2hhbmdlKHBhZ2UpO1xuICAgIH07XG5cbiAgICBjb25zdCBzaG93UGFnZVNwaW5uZXIgPSBoYXNMb2FkaW5nU2lnbmFsICYmIGlzUGFnZVRyYW5zaXRpb25QZW5kaW5nO1xuXG4gICAgaWYgKCFzaG93UGFnaW5hdGlvbikgcmV0dXJuIG51bGw7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPD5cbiAgICAgICAge3Nob3dQYWdlU3Bpbm5lciA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei02MDAwMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctd2hpdGUvNDUgYmFja2Ryb3AtYmx1ci1bMXB4XSBwb2ludGVyLWV2ZW50cy1ub25lXCI+XG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC0xMCB3LTEwXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBpZD1cInBhZ2luYXRpb25cIlxuICAgICAgICAgIHJlZj17cmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwicGFnaW5hdGlvbiBncmlkIGdyaWQtY29scy1bMWZyX2F1dG9fMWZyXSBpdGVtcy1jZW50ZXIgZ2FwLTFcIixcbiAgICAgICAgICAgIGNsYXNzTmFtZSB8fCBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEganVzdGlmeS1zdGFydFwiPlxuICAgICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkp1bXBUb1N0YXJ0ICYmIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHM/LmZpcnN0fVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RQYWdlQ2hhbmdlKDEpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuNVwiIGNsYXNzTmFtZT1cInctNSBoLTUgbXgtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTguNzUgNC41LTcuNSA3LjUgNy41IDcuNW0tNi0xNUw1LjI1IDEybDcuNSA3LjVcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuR29QcmV2ICYmIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbHM/LnByZXZ9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgLSAxKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwiTTE1Ljc1IDE5LjUgOC4yNSAxMmw3LjUtNy41XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMSBtaW4tdy0wIGZsZXgtbm93cmFwXCI+XG4gICAgICAgICAgICB7cGFnZU51bWJlcnMubWFwKChwYWdlKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gcGFnZSA9PT0gc2FmZUN1cnJlbnQ7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtgcGFnZS0ke3BhZ2V9YH1cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgXCJtaW4tdy1bMjZweF0gcHgtMiBweS0wLjUgcm91bmRlZC1tZCBib3JkZXIgdGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgPyBcImJnLXByaW1hcnkgYm9yZGVyLXByaW1hcnkgdGV4dC13aGl0ZSBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMzAwIHRleHQtc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1wcmltYXJ5IGhvdmVyOnRleHQtcHJpbWFyeVwiLFxuICAgICAgICAgICAgICAgICAgICBpc0xvYWRpbmcgPyBcIm9wYWNpdHktNjAgY3Vyc29yLW5vdC1hbGxvd2VkXCIgOiBcIlwiXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0UGFnZUNoYW5nZShwYWdlKTtcbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3BhZ2V9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5Hb05leHQgJiYgKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ubmV4dH1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICByZXF1ZXN0UGFnZUNoYW5nZShzYWZlQ3VycmVudCArIDEpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VXaWR0aD1cIjEuNVwiIGNsYXNzTmFtZT1cInctNSBoLTUgbXgtYXV0b1wiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtOC4yNSA0LjUgNy41IDcuNS03LjUgNy41XCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkdvTmV4dCAmJiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTcgaC03IHAtMCBib3JkZXItMCBiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXByaW1hcnkgdHJhbnNpdGlvblwiXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5sYXN0fVxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RQYWdlQ2hhbmdlKHNhZmVUb3RhbCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm01LjI1IDQuNSA3LjUgNy41LTcuNSA3LjVtNi0xNSA3LjUgNy41LTcuNSA3LjVcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC8+XG4gICAgKTtcbiAgfVxuKTtcblxuQ29tcGFjdFBhZ2luYXRpb24uZGlzcGxheU5hbWUgPSBcIkNvbXBhY3RQYWdpbmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBhY3RQYWdpbmF0aW9uO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7OztBQUFDLG1CQUF5QztBQUUxQyxJQUFNLHlCQUF5QjtBQUMvQixJQUFNLDJCQUEyQjtBQUNqQyxJQUFNLG9CQUFvQjtBQUMxQixJQUFNLG1CQUFtQjtBQUN6QixJQUFNLFdBQVc7QUFDakIsSUFBTSxZQUFZO0FBQ2xCLElBQU0sY0FBYztBQUNwQixJQUFNLGVBQWUsQ0FBQywwQkFBMEIsMEJBQTBCLHdCQUF3QjtBQXFCbEcsSUFBTSxvQkFBb0IsQ0FBQyxPQUFlLGtCQUEyQjtBQUNuRSxRQUFNLE1BQU07QUFDWixRQUFNLE1BQU07QUFDWixRQUFNLFdBQVc7QUFDakIsUUFBTSxTQUFTLE9BQU8sU0FBUyxPQUFPLEtBQUssR0FBRyxFQUFFO0FBRWhELE1BQUksVUFBVSxPQUFPLGNBQWUsUUFBTztBQUMzQyxNQUFJLFVBQVUsSUFBSyxRQUFPLE1BQU07QUFDaEMsU0FBTyxTQUFTO0FBQ2xCO0FBR0EsSUFBTSxRQUFOLE1BQVk7QUFBQSxFQXNCVixZQUFZLFFBQTJCLFNBQW1DLEdBQVcsR0FBVyxPQUFlLE9BQWUsT0FBZTtBQUMzSSxTQUFLLFFBQVEsT0FBTztBQUNwQixTQUFLLFNBQVMsT0FBTztBQUNyQixTQUFLLE1BQU07QUFDWCxTQUFLLElBQUk7QUFDVCxTQUFLLElBQUk7QUFDVCxTQUFLLFFBQVE7QUFDYixTQUFLLFFBQVEsS0FBSyxlQUFlLEtBQUssR0FBRyxJQUFJO0FBQzdDLFNBQUssT0FBTztBQUNaLFNBQUssV0FBVyxLQUFLLE9BQU8sSUFBSSxNQUFNO0FB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
