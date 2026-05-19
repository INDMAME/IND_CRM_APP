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

// Web/wwwroot/react/src/components/commons/FloatingActionButton.tsx
var import_react3 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/useFloatingActionButtonVisibility.ts
var import_react2 = __toESM(require_react());
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
  const [resolvedBottom, setResolvedBottom] = (0, import_react2.useState)(bottom);
  const [reservedHeight, setReservedHeight] = (0, import_react2.useState)(0);
  const animationFrameRef = (0, import_react2.useRef)(null);
  const updateLayout = (0, import_react2.useCallback)(() => {
    if (typeof window === "undefined") return;
    const nextBottom = resolveBottomOffset(bottom);
    const nextReservedHeight = resolveReservedHeight(nextBottom, size);
    setResolvedBottom((previous) => Math.abs(previous - nextBottom) < 1 ? previous : nextBottom);
    setReservedHeight((previous) => Math.abs(previous - nextReservedHeight) < 1 ? previous : nextReservedHeight);
  }, [bottom, size]);
  const scheduleLayoutUpdate = (0, import_react2.useCallback)(() => {
    if (typeof window === "undefined") return;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateLayout();
    });
  }, [updateLayout]);
  (0, import_react2.useLayoutEffect)(() => {
    updateLayout();
  }, [updateLayout]);
  (0, import_react2.useEffect)(() => {
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
  (0, import_react2.useEffect)(() => {
    setPageFloatingClearance(reservedHeight);
    return () => {
      clearPageFloatingClearance();
    };
  }, [reservedHeight]);
  (0, import_react2.useEffect)(() => {
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
var import_jsx_runtime = __toESM(require_jsx_runtime());
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
  const rootRef = (0, import_react3.useRef)(null);
  const canvasRef = (0, import_react3.useRef)(null);
  const [internalMenuOpen, setInternalMenuOpen] = (0, import_react3.useState)(false);
  const hasMenu = menuItems.length > 0;
  const isMenuControlled = typeof isMenuOpen === "boolean";
  const menuOpen = hasMenu ? isMenuControlled ? Boolean(isMenuOpen) : internalMenuOpen : false;
  const { resolvedBottom } = useFloatingActionButtonVisibility({
    bottom,
    size
  });
  const portalTarget = typeof document === "undefined" ? null : document.body;
  const setMenuOpen = (0, import_react3.useCallback)(
    (nextOpen) => {
      if (!hasMenu) return;
      if (!isMenuControlled) {
        setInternalMenuOpen(nextOpen);
      }
      onMenuOpenChange?.(nextOpen);
    },
    [hasMenu, isMenuControlled, onMenuOpenChange]
  );
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
  }, [color, plusLength, plusThickness, shadowOpacity]);
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
  (0, import_react3.useEffect)(() => {
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
  const runPrimaryAction = (0, import_react3.useCallback)(() => {
    if (typeof onClick === "function") {
      onClick();
      return;
    }
    if (!route || typeof window === "undefined") return;
    window.location.href = route;
  }, [onClick, route]);
  const handleMainClick = (0, import_react3.useCallback)(() => {
    if (hasMenu) {
      setMenuOpen(!menuOpen);
      return;
    }
    runPrimaryAction();
  }, [hasMenu, menuOpen, runPrimaryAction, setMenuOpen]);
  const handleMenuItemClick = (0, import_react3.useCallback)(
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
  const menuPanelClassName = (0, import_react3.useMemo)(() => {
    const base = "min-w-[11rem] rounded-[var(--radius-xl)] border border-slate-200 bg-white p-2 shadow-xl";
    const extra = menuClassName.trim();
    return extra ? `${base} ${extra}` : base;
  }, [menuClassName]);
  const floatingActionButton = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      ref: rootRef,
      className: "fixed z-2000 flex flex-col items-end gap-2",
      style: {
        right: `${right}px`,
        bottom: `${resolvedBottom}px`
      },
      children: [
        menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { role: "menu", "aria-label": menuAriaLabel || ariaLabel, className: menuPanelClassName, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { className: "space-y-1", children: menuItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "button",
          {
            type: "button",
            role: "menuitem",
            "aria-label": item.ariaLabel || item.label,
            disabled: item.disabled,
            className: "flex w-full items-center gap-2 rounded-[var(--radius-xl)] px-3 py-2 text-left text-[16px] font-medium leading-5 text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50",
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
            className: "rounded-[var(--radius-xl)] border-0 bg-transparent p-0 transition-transform duration-150 hover:-translate-y-0.5 active:scale-95 focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-4",
            style: {
              width: `${size}px`,
              height: `${size}px`,
              WebkitTapHighlightColor: "transparent"
            },
            onClick: handleMainClick,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", { ref: canvasRef, className: "block rounded-[var(--radius-xl)]" })
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

// Web/wwwroot/react/src/components/commons/CompactPagination.tsx
var import_react4 = __toESM(require_react());
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var DEFAULT_WINDOW = 6;
var CompactPagination = (0, import_react4.forwardRef)(
  ({ totalPages, currentPage, pageWindow = DEFAULT_WINDOW, onPageChange, labels, className, loading }, ref) => {
    const safeTotal = Math.max(0, totalPages || 0);
    const safeCurrent = Math.min(Math.max(1, currentPage || 1), safeTotal || 1);
    const windowSize = Math.max(1, pageWindow || DEFAULT_WINDOW);
    const hasLoadingSignal = typeof loading === "boolean";
    const isLoading = loading === true;
    const [isPageTransitionPending, setIsPageTransitionPending] = (0, import_react4.useState)(false);
    const showPageSpinner = hasLoadingSignal && isPageTransitionPending;
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
    (0, import_react4.useEffect)(() => {
      if (!hasLoadingSignal || !isPageTransitionPending) return;
      if (isLoading) return;
      setIsPageTransitionPending(false);
    }, [hasLoadingSignal, isLoading, isPageTransitionPending]);
    (0, import_react4.useEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
      showPageSpinner ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          className: "fixed inset-0 z-600000 flex items-center justify-center bg-slate-100",
          onWheel: (event) => {
            event.preventDefault();
          },
          onTouchMove: (event) => {
            event.preventDefault();
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner_default, { size: "h-10 w-10" })
        }
      ) : null,
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "div",
        {
          id: "pagination",
          ref,
          className: classNames(
            "pagination grid grid-cols-[1fr_auto_1fr] items-center gap-1",
            className || ""
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-1 justify-start", children: [
              showEdgeNav && canJumpToStart && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" }) })
                }
              ),
              showEdgeNav && canGoPrev && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 19.5 8.25 12l7.5-7.5" }) })
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex items-center justify-center gap-1 min-w-0 flex-nowrap", children: pageNumbers.map((page) => {
              const isActive = page === safeCurrent;
              return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-1 justify-end", children: [
              showEdgeNav && canGoNext && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m8.25 4.5 7.5 7.5-7.5 7.5" }) })
                }
              ),
              showEdgeNav && canGoNext && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", className: "w-5 h-5 mx-auto", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" }) })
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
  FloatingActionButton_default,
  CompactPagination_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVRpbWVsaW5lQ2FyZEVmZmVjdHMudHMiLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0FjdGlvbkJ1dHRvbi50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvY29tcG9uZW50cy9jb21tb25zL0NvbXBhY3RQYWdpbmF0aW9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5jb25zdCBUT09MVElQX1RPVUNIX0RFTEFZX01TID0gMTIwO1xyXG5jb25zdCBUT09MVElQX01BWF9IRUlHSFRfUkFUSU8gPSAwLjg7XHJcbmNvbnN0IFRPT0xUSVBfQkFTRV9GT05UID0gMTM7XHJcbmNvbnN0IFRPT0xUSVBfTUlOX0ZPTlQgPSAxMTtcclxuY29uc3QgRUxMSVBTSVMgPSBcIi4uLlwiO1xyXG5jb25zdCBQSVhFTF9HQVAgPSA1O1xyXG5jb25zdCBQSVhFTF9TUEVFRCA9IDk1O1xyXG5jb25zdCBQSVhFTF9DT0xPUlMgPSBbXCJyZ2JhKDAsIDQxLCAxMDcsIDAuMDgpXCIsIFwicmdiYSgwLCA0MSwgMTA3LCAwLjE2KVwiLCBcInJnYmEoMCwgNDEsIDEwNywgMC4yNilcIl07XHJcblxyXG50eXBlIFBpeGVsU3RhdGUgPSB7XHJcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcclxuICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcclxuICBwaXhlbHM6IFBpeGVsW107XHJcbiAgYW5pbUlkOiBudW1iZXIgfCBudWxsO1xyXG4gIGxhc3RUaW1lOiBudW1iZXI7XHJcbiAgcmVkdWNlZE1vdGlvbjogYm9vbGVhbjtcclxuICB3aWR0aDogbnVtYmVyO1xyXG4gIGhlaWdodDogbnVtYmVyO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgVXNlVGltZWxpbmVDYXJkRWZmZWN0c0FyZ3MgPSB7XHJcbiAgY29udGFpbmVyUmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQgfCBudWxsPjtcclxuICBlcnJvck1lc3NhZ2U6IHN0cmluZztcclxuICBpdGVtczogdW5rbm93bltdO1xyXG4gIHJlc29sdmVDbGlja2FibGVDYXJkOiAodGFyZ2V0OiBFdmVudFRhcmdldCB8IG51bGwpID0+IEhUTUxFbGVtZW50IHwgbnVsbDtcclxufTtcclxuXHJcbi8vIENvbXB1dGUgcGl4ZWwgc3BlZWQgd2hpbGUgcmVzcGVjdGluZyByZWR1Y2VkIG1vdGlvbiBwcmVmZXJlbmNlLlxyXG5jb25zdCBnZXRFZmZlY3RpdmVTcGVlZCA9ICh2YWx1ZTogbnVtYmVyLCByZWR1Y2VkTW90aW9uOiBib29sZWFuKSA9PiB7XHJcbiAgY29uc3QgbWluID0gMDtcclxuICBjb25zdCBtYXggPSAxMDA7XHJcbiAgY29uc3QgdGhyb3R0bGUgPSAwLjAwMTtcclxuICBjb25zdCBwYXJzZWQgPSBOdW1iZXIucGFyc2VJbnQoU3RyaW5nKHZhbHVlKSwgMTApO1xyXG5cclxuICBpZiAocGFyc2VkIDw9IG1pbiB8fCByZWR1Y2VkTW90aW9uKSByZXR1cm4gbWluO1xyXG4gIGlmIChwYXJzZWQgPj0gbWF4KSByZXR1cm4gbWF4ICogdGhyb3R0bGU7XHJcbiAgcmV0dXJuIHBhcnNlZCAqIHRocm90dGxlO1xyXG59O1xyXG5cclxuLy8gUGl4ZWwgdXNlZCBieSB0aGUgaG92ZXIgYW5pbWF0aW9uIGNhbnZhcy5cclxuY2xhc3MgUGl4ZWwge1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgaGVpZ2h0OiBudW1iZXI7XHJcbiAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcbiAgeDogbnVtYmVyO1xyXG4gIHk6IG51bWJlcjtcclxuICBjb2xvcjogc3RyaW5nO1xyXG4gIHNwZWVkOiBudW1iZXI7XHJcbiAgc2l6ZTogbnVtYmVyO1xyXG4gIHNpemVTdGVwOiBudW1iZXI7XHJcbiAgbWluU2l6ZTogbnVtYmVyO1xyXG4gIG1heFNpemVJbnRlZ2VyOiBudW1iZXI7XHJcbiAgbWF4U2l6ZTogbnVtYmVyO1xyXG4gIHBoYXNlOiBudW1iZXI7XHJcbiAgcGhhc2VTdGVwOiBudW1iZXI7XHJcbiAgZGVsYXk6IG51bWJlcjtcclxuICBjb3VudGVyOiBudW1iZXI7XHJcbiAgY291bnRlclN0ZXA6IG51bWJlcjtcclxuICBpc0lkbGU6IGJvb2xlYW47XHJcbiAgaXNSZXZlcnNlOiBib29sZWFuO1xyXG4gIGlzU2hpbW1lcjogYm9vbGVhbjtcclxuXHJcbiAgY29uc3RydWN0b3IoY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCwgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCB4OiBudW1iZXIsIHk6IG51bWJlciwgY29sb3I6IHN0cmluZywgc3BlZWQ6IG51bWJlciwgZGVsYXk6IG51bWJlcikge1xyXG4gICAgdGhpcy53aWR0aCA9IGNhbnZhcy53aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcclxuICAgIHRoaXMuY3R4ID0gY29udGV4dDtcclxuICAgIHRoaXMueCA9IHg7XHJcbiAgICB0aGlzLnkgPSB5O1xyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUoMC4xLCAwLjkpICogc3BlZWQ7XHJcbiAgICB0aGlzLnNpemUgPSAwO1xyXG4gICAgdGhpcy5zaXplU3RlcCA9IE1hdGgucmFuZG9tKCkgKiAwLjMgKyAwLjE7XHJcbiAgICB0aGlzLm1pblNpemUgPSAwLjU7XHJcbiAgICB0aGlzLm1heFNpemVJbnRlZ2VyID0gMjtcclxuICAgIHRoaXMubWF4U2l6ZSA9IHRoaXMuZ2V0UmFuZG9tVmFsdWUodGhpcy5taW5TaXplLCB0aGlzLm1heFNpemVJbnRlZ2VyKTtcclxuICAgIHRoaXMuZGVsYXkgPSBkZWxheTtcclxuICAgIHRoaXMuY291bnRlciA9IDA7XHJcbiAgICB0aGlzLmNvdW50ZXJTdGVwID0gTWF0aC5yYW5kb20oKSAqIDUgKyAodGhpcy53aWR0aCArIHRoaXMuaGVpZ2h0KSAqIDAuMDE1O1xyXG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNSZXZlcnNlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzU2hpbW1lciA9IGZhbHNlO1xyXG4gICAgdGhpcy5waGFzZSA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJICogMjtcclxuICAgIHRoaXMucGhhc2VTdGVwID0gTWF0aC5tYXgoMCwgdGhpcy5zcGVlZCAqICgwLjggKyBNYXRoLnJhbmRvbSgpICogMC42KSk7XHJcbiAgfVxyXG5cclxuICAvLyBSZXR1cm4gYSByYW5kb20gZmxvYXQgYmV0d2VlbiBtaW4gYW5kIG1heC5cclxuICBnZXRSYW5kb21WYWx1ZShtaW46IG51bWJlciwgbWF4OiBudW1iZXIpIHtcclxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XHJcbiAgfVxyXG5cclxuICAvLyBEcmF3IHRoZSBwaXhlbCBhdCBpdHMgY3VycmVudCBzaXplLlxyXG4gIGRyYXcoKSB7XHJcbiAgICBjb25zdCBjZW50ZXJPZmZzZXQgPSB0aGlzLm1heFNpemVJbnRlZ2VyICogMC41IC0gdGhpcy5zaXplICogMC41O1xyXG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcclxuICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCArIGNlbnRlck9mZnNldCwgdGhpcy55ICsgY2VudGVyT2Zmc2V0LCB0aGlzLnNpemUsIHRoaXMuc2l6ZSk7XHJcbiAgfVxyXG5cclxuICAvLyBBbmltYXRlIHRoZSBwaXhlbCBhcHBlYXJpbmcuXHJcbiAgYXBwZWFyKCkge1xyXG4gICAgdGhpcy5pc0lkbGUgPSBmYWxzZTtcclxuICAgIGlmICh0aGlzLmNvdW50ZXIgPD0gdGhpcy5kZWxheSkge1xyXG4gICAgICB0aGlzLmNvdW50ZXIgKz0gdGhpcy5jb3VudGVyU3RlcDtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2l6ZSA+PSB0aGlzLm1heFNpemUpIHtcclxuICAgICAgdGhpcy5pc1NoaW1tZXIgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuaXNTaGltbWVyKSB7XHJcbiAgICAgIHRoaXMuc2hpbW1lcigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaXplICs9IHRoaXMuc2l6ZVN0ZXA7XHJcbiAgICB9XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG4gIC8vIEFuaW1hdGUgdGhlIHBpeGVsIGRpc2FwcGVhcmluZy5cclxuICBkaXNhcHBlYXIoKSB7XHJcbiAgICB0aGlzLmlzU2hpbW1lciA9IGZhbHNlO1xyXG4gICAgdGhpcy5jb3VudGVyID0gMDtcclxuICAgIGlmICh0aGlzLnNpemUgPD0gMCkge1xyXG4gICAgICB0aGlzLmlzSWRsZSA9IHRydWU7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuc2l6ZSAtPSAwLjE7XHJcbiAgICB0aGlzLmRyYXcoKTtcclxuICB9XHJcblxyXG4gIC8vIE9zY2lsbGF0ZSBwaXhlbCBzaXplIHdoaWxlIHZpc2libGUuXHJcbiAgc2hpbW1lcigpIHtcclxuICAgIGlmICghdGhpcy5waGFzZVN0ZXApIHJldHVybjtcclxuICAgIHRoaXMucGhhc2UgKz0gdGhpcy5waGFzZVN0ZXA7XHJcbiAgICBjb25zdCBhbXAgPSAodGhpcy5tYXhTaXplIC0gdGhpcy5taW5TaXplKSAqIDAuNTtcclxuICAgIHRoaXMuc2l6ZSA9IHRoaXMubWluU2l6ZSArIGFtcCArIGFtcCAqIE1hdGguc2luKHRoaXMucGhhc2UpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gQ3JlYXRlIHRoZSBwaXhlbCBjYW52YXMgaG92ZXIgZWZmZWN0IGZvciBhIHRpbWVsaW5lIGNhcmQuXHJcbmNvbnN0IGNyZWF0ZVBpeGVsRWZmZWN0ID0gKGNhcmRFbDogSFRNTEVsZW1lbnQpID0+IHtcclxuICBpZiAoIWNhcmRFbCkgcmV0dXJuIG51bGw7XHJcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcclxuICBjYW52YXMuY2xhc3NOYW1lID0gXCJ0aW1lbGluZS1waXhlbC1jYW52YXNcIjtcclxuICBjYXJkRWwuYXBwZW5kQ2hpbGQoY2FudmFzKTtcclxuXHJcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICBpZiAoIWN0eCkge1xyXG4gICAgY2FudmFzLnJlbW92ZSgpO1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWR1Y2VkTW90aW9uID0gd2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiKS5tYXRjaGVzO1xyXG4gIGNvbnN0IHN0YXRlOiBQaXhlbFN0YXRlID0ge1xyXG4gICAgY2FudmFzLFxyXG4gICAgY3R4LFxyXG4gICAgcGl4ZWxzOiBbXSxcclxuICAgIGFuaW1JZDogbnVsbCxcclxuICAgIGxhc3RUaW1lOiBwZXJmb3JtYW5jZS5ub3coKSxcclxuICAgIHJlZHVjZWRNb3Rpb24sXHJcbiAgICB3aWR0aDogMCxcclxuICAgIGhlaWdodDogMCxcclxuICB9O1xyXG5cclxuICBjb25zdCBpbml0UGl4ZWxzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcmVjdCA9IGNhcmRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHdpZHRoID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihyZWN0LndpZHRoKSk7XHJcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKHJlY3QuaGVpZ2h0KSk7XHJcbiAgICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHJldHVybjtcclxuXHJcbiAgICBzdGF0ZS53aWR0aCA9IHdpZHRoO1xyXG4gICAgc3RhdGUuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7d2lkdGh9cHhgO1xyXG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodH1weGA7XHJcblxyXG4gICAgY29uc3QgZ2FwID0gTWF0aC5tYXgoMywgTWF0aC5mbG9vcihQSVhFTF9HQVApKTtcclxuICAgIGNvbnN0IHNwZWVkID0gZ2V0RWZmZWN0aXZlU3BlZWQoUElYRUxfU1BFRUQsIHJlZHVjZWRNb3Rpb24pO1xyXG4gICAgY29uc3QgcGl4ZWxzOiBQaXhlbFtdID0gW107XHJcblxyXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCArPSBnYXApIHtcclxuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkgKz0gZ2FwKSB7XHJcbiAgICAgICAgY29uc3QgY29sb3IgPSBQSVhFTF9DT0xPUlNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogUElYRUxfQ09MT1JTLmxlbmd0aCldO1xyXG4gICAgICAgIGNvbnN0IGR4ID0geCAtIHdpZHRoIC8gMjtcclxuICAgICAgICBjb25zdCBkeSA9IHkgLSBoZWlnaHQgLyAyO1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcclxuICAgICAgICBjb25zdCBkZWxheSA9IHJlZHVjZWRNb3Rpb24gPyAwIDogZGlzdGFuY2UgKiAwLjM1O1xyXG4gICAgICAgIHBpeGVscy5wdXNoKG5ldyBQaXhlbChjYW52YXMsIGN0eCwgeCwgeSwgY29sb3IsIHNwZWVkLCBkZWxheSkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGUucGl4ZWxzID0gcGl4ZWxzO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGRvQW5pbWF0ZSA9IChmbk5hbWU6IFwiYXBwZWFyXCIgfCBcImRpc2FwcGVhclwiKSA9PiB7XHJcbiAgICBzdGF0ZS5hbmltSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gZG9BbmltYXRlKGZuTmFtZSkpO1xyXG4gICAgY29uc3QgdGltZU5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgY29uc3QgdGltZVBhc3NlZCA9IHRpbWVOb3cgLSBzdGF0ZS5sYXN0VGltZTtcclxuICAgIGNvbnN0IHRpbWVJbnRlcnZhbCA9IDEwMDAgLyA2MDtcclxuXHJcbiAgICBpZiAodGltZVBhc3NlZCA8IHRpbWVJbnRlcnZhbCkgcmV0dXJuO1xyXG4gICAgc3RhdGUubGFzdFRpbWUgPSB0aW1lTm93IC0gKHRpbWVQYXNzZWQgJSB0aW1lSW50ZXJ2YWwpO1xyXG5cclxuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgc3RhdGUud2lkdGgsIHN0YXRlLmhlaWdodCk7XHJcblxyXG4gICAgbGV0IGFsbElkbGUgPSB0cnVlO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZS5waXhlbHMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgY29uc3QgcGl4ZWwgPSBzdGF0ZS5waXhlbHNbaV07XHJcbiAgICAgIHBpeGVsW2ZuTmFtZV0oKTtcclxuICAgICAgaWYgKCFwaXhlbC5pc0lkbGUpIGFsbElkbGUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChhbGxJZGxlICYmIHN0YXRlLmFuaW1JZCkge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xyXG4gICAgICBzdGF0ZS5hbmltSWQgPSBudWxsO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGNvbnN0IGhhbmRsZUFuaW1hdGlvbiA9IChuYW1lOiBcImFwcGVhclwiIHwgXCJkaXNhcHBlYXJcIikgPT4ge1xyXG4gICAgaWYgKCFzdGF0ZS5waXhlbHMubGVuZ3RoKSByZXR1cm47XHJcbiAgICBpZiAoc3RhdGUuYW5pbUlkKSBjYW5jZWxBbmltYXRpb25GcmFtZShzdGF0ZS5hbmltSWQpO1xyXG4gICAgc3RhdGUubGFzdFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcclxuICAgIHN0YXRlLmFuaW1JZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBkb0FuaW1hdGUobmFtZSkpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IG9uRW50ZXIgPSAoKSA9PiBoYW5kbGVBbmltYXRpb24oXCJhcHBlYXJcIik7XHJcbiAgY29uc3Qgb25MZWF2ZSA9ICgpID0+IGhhbmRsZUFuaW1hdGlvbihcImRpc2FwcGVhclwiKTtcclxuXHJcbiAgY2FyZEVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xyXG4gIGNhcmRFbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBvbkxlYXZlKTtcclxuXHJcbiAgbGV0IHJvOiBSZXNpemVPYnNlcnZlciB8IG51bGwgPSBudWxsO1xyXG4gIGlmICh0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIHJvID0gbmV3IFJlc2l6ZU9ic2VydmVyKGluaXRQaXhlbHMpO1xyXG4gICAgcm8ub2JzZXJ2ZShjYXJkRWwpO1xyXG4gIH1cclxuXHJcbiAgaW5pdFBpeGVscygpO1xyXG5cclxuICByZXR1cm4gKCkgPT4ge1xyXG4gICAgY2FyZEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIG9uRW50ZXIpO1xyXG4gICAgY2FyZEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIG9uTGVhdmUpO1xyXG4gICAgaWYgKHN0YXRlLmFuaW1JZCkgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhdGUuYW5pbUlkKTtcclxuICAgIGlmIChybykgcm8uZGlzY29ubmVjdCgpO1xyXG4gICAgY2FudmFzLnJlbW92ZSgpO1xyXG4gIH07XHJcbn07XHJcblxyXG4vLyBTaG9ydGVuIG92ZXJmbG93aW5nIHRleHQgd2l0aCBhIGNvbXB1dGVkIGVsbGlwc2lzLlxyXG5jb25zdCBhcHBseUVsbGlwc2lzID0gKGVsOiBIVE1MRWxlbWVudCwgZnVsbFRleHQ6IHN0cmluZywgbXVsdGlMaW5lOiBib29sZWFuKSA9PiB7XHJcbiAgaWYgKCFlbCB8fCAhZnVsbFRleHQpIHJldHVybiBmYWxzZTtcclxuICBpZiAobXVsdGlMaW5lICYmIGVsLmNsaWVudEhlaWdodCA9PT0gMCkgcmV0dXJuIGZhbHNlO1xyXG4gIGlmICghbXVsdGlMaW5lICYmIGVsLmNsaWVudFdpZHRoID09PSAwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIGlmIChtdWx0aUxpbmUpIHtcclxuICAgIGNvbnN0IGNvbXB1dGVkID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpO1xyXG4gICAgbGV0IGxpbmVIZWlnaHQgPSBOdW1iZXIucGFyc2VGbG9hdChjb21wdXRlZC5saW5lSGVpZ2h0KTtcclxuICAgIC8vIFNvbWUgYnJvd3NlcnMgcmV0dXJuIHVuaXRsZXNzIGxpbmUtaGVpZ2h0IHZhbHVlcyBmb3IgY29tcHV0ZWQgc3R5bGVzLlxyXG4gICAgLy8gQ29udmVydCB0aW55IHVuaXRsZXNzIHZhbHVlcyB1c2luZyBmb250LXNpemUgdG8gYXZvaWQgY29sbGFwc2luZyB0ZXh0LlxyXG4gICAgaWYgKE51bWJlci5pc0Zpbml0ZShsaW5lSGVpZ2h0KSAmJiBsaW5lSGVpZ2h0ID4gMCAmJiBsaW5lSGVpZ2h0IDwgOCkge1xyXG4gICAgICBjb25zdCBmb250U2l6ZSA9IE51bWJlci5wYXJzZUZsb2F0KGNvbXB1dGVkLmZvbnRTaXplKTtcclxuICAgICAgaWYgKE51bWJlci5pc0Zpbml0ZShmb250U2l6ZSkgJiYgZm9udFNpemUgPiAwKSB7XHJcbiAgICAgICAgbGluZUhlaWdodCA9IGxpbmVIZWlnaHQgKiBmb250U2l6ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUobGluZUhlaWdodCkpIHtcclxuICAgICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBsaW5lSGVpZ2h0ID0gcmVjdC5oZWlnaHQgPiAwID8gcmVjdC5oZWlnaHQgLyAyIDogMDtcclxuICAgIH1cclxuICAgIGlmIChsaW5lSGVpZ2h0ID4gMCkge1xyXG4gICAgICBlbC5zdHlsZS5tYXhIZWlnaHQgPSBgJHtNYXRoLnJvdW5kKGxpbmVIZWlnaHQgKiAyKX1weGA7XHJcbiAgICAgIGVsLnN0eWxlLm92ZXJmbG93ID0gXCJoaWRkZW5cIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVsLnRleHRDb250ZW50ID0gZnVsbFRleHQ7XHJcblxyXG4gIGNvbnN0IGlzT3ZlcmZsb3dpbmcgPSAoKSA9PiAoXHJcbiAgICBtdWx0aUxpbmVcclxuICAgICAgPyBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgKyAxXHJcbiAgICAgIDogZWwuc2Nyb2xsV2lkdGggPiBlbC5jbGllbnRXaWR0aCArIDFcclxuICApO1xyXG5cclxuICBpZiAoIWlzT3ZlcmZsb3dpbmcoKSkge1xyXG4gICAgZWwuZGF0YXNldC5wcmV2aWV3ID0gXCIwXCI7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBsZXQgbG93ID0gMDtcclxuICBsZXQgaGlnaCA9IGZ1bGxUZXh0Lmxlbmd0aDtcclxuICBsZXQgYmVzdCA9IDA7XHJcblxyXG4gIHdoaWxlIChsb3cgPD0gaGlnaCkge1xyXG4gICAgY29uc3QgbWlkID0gTWF0aC5mbG9vcigobG93ICsgaGlnaCkgLyAyKTtcclxuICAgIGNvbnN0IGNhbmRpZGF0ZSA9IGAke2Z1bGxUZXh0LnNsaWNlKDAsIE1hdGgubWF4KDAsIG1pZCkpLnRyaW1FbmQoKX0ke0VMTElQU0lTfWA7XHJcbiAgICBlbC50ZXh0Q29udGVudCA9IGNhbmRpZGF0ZTtcclxuICAgIGlmIChpc092ZXJmbG93aW5nKCkpIHtcclxuICAgICAgaGlnaCA9IG1pZCAtIDE7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBiZXN0ID0gbWlkO1xyXG4gICAgICBsb3cgPSBtaWQgKyAxO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWwudGV4dENvbnRlbnQgPSBgJHtmdWxsVGV4dC5zbGljZSgwLCBNYXRoLm1heCgwLCBiZXN0KSkudHJpbUVuZCgpfSR7RUxMSVBTSVN9YDtcclxuICBlbC5kYXRhc2V0LnByZXZpZXcgPSBcIjFcIjtcclxuICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8vIE93bnMgdG9vbHRpcCwgZWxsaXBzaXMsIGFuZCBwaXhlbCBlZmZlY3RzIGZvciB0aW1lbGluZSBjYXJkcy5cclxuZXhwb3J0IGNvbnN0IHVzZVRpbWVsaW5lQ2FyZEVmZmVjdHMgPSAoe1xyXG4gIGNvbnRhaW5lclJlZixcclxuICBlcnJvck1lc3NhZ2UsXHJcbiAgaXRlbXMsXHJcbiAgcmVzb2x2ZUNsaWNrYWJsZUNhcmQsXHJcbn06IFVzZVRpbWVsaW5lQ2FyZEVmZmVjdHNBcmdzKSA9PiB7XHJcbiAgY29uc3QgdG9vbHRpcFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHRvb2x0aXBBbmNob3JSZWYgPSB1c2VSZWY8SFRNTEVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCB0b29sdGlwQ2xvc2VCb3VuZFJlZiA9IHVzZVJlZihmYWxzZSk7XHJcblxyXG4gIC8vIEVuc3VyZSB0aGUgc2hhcmVkIHRvb2x0aXAgZWxlbWVudCBleGlzdHMgb25jZS5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHRvb2x0aXBSZWYuY3VycmVudCkgcmV0dXJuO1xyXG4gICAgbGV0IHRvb2x0aXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRpbWVsaW5lVG9vbHRpcFwiKSBhcyBIVE1MRGl2RWxlbWVudCB8IG51bGw7XHJcbiAgICBpZiAoIXRvb2x0aXApIHtcclxuICAgICAgdG9vbHRpcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHRvb2x0aXAuaWQgPSBcInRpbWVsaW5lVG9vbHRpcFwiO1xyXG4gICAgICB0b29sdGlwLmNsYXNzTmFtZSA9IFwidGltZWxpbmUtdG9vbHRpcFwiO1xyXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRvb2x0aXApO1xyXG4gICAgfVxyXG4gICAgdG9vbHRpcFJlZi5jdXJyZW50ID0gdG9vbHRpcDtcclxuICB9LCBbXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBjb250YWluZXJSZWYuY3VycmVudDtcclxuICAgIGNvbnN0IHRvb2x0aXBFbCA9IHRvb2x0aXBSZWYuY3VycmVudDtcclxuICAgIGlmICghY29udGFpbmVyIHx8ICF0b29sdGlwRWwpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBjbGVhbnVwczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcclxuXHJcbiAgICAvLyBDbG9zZSB0b29sdGlwIG9uIG91dHNpZGUgaW50ZXJhY3Rpb24uXHJcbiAgICBpZiAoIXRvb2x0aXBDbG9zZUJvdW5kUmVmLmN1cnJlbnQpIHtcclxuICAgICAgdG9vbHRpcENsb3NlQm91bmRSZWYuY3VycmVudCA9IHRydWU7XHJcbiAgICAgIGNvbnN0IG9uUG9pbnRlckRvd24gPSAoZXZlbnQ6IFBvaW50ZXJFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmICghdG9vbHRpcEVsLmNsYXNzTGlzdC5jb250YWlucyhcInZpc2libGVcIikpIHJldHVybjtcclxuICAgICAgICBjb25zdCBhbmNob3IgPSB0b29sdGlwQW5jaG9yUmVmLmN1cnJlbnQ7XHJcbiAgICAgICAgaWYgKGFuY2hvciAmJiBhbmNob3IuY29udGFpbnMoZXZlbnQudGFyZ2V0IGFzIE5vZGUpKSByZXR1cm47XHJcbiAgICAgICAgdG9vbHRpcEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJ2aXNpYmxlXCIpO1xyXG4gICAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IG9uS2V5RG93biA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIiwgb25Qb2ludGVyRG93biwgdHJ1ZSk7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XHJcbiAgICAgIGNsZWFudXBzLnB1c2goKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJwb2ludGVyZG93blwiLCBvblBvaW50ZXJEb3duLCB0cnVlKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBvbktleURvd24pO1xyXG4gICAgICAgIHRvb2x0aXBDbG9zZUJvdW5kUmVmLmN1cnJlbnQgPSBmYWxzZTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2hvdyB0b29sdGlwIGNvbnRlbnQgY2VudGVyZWQgb24gc2NyZWVuLlxyXG4gICAgY29uc3Qgc2hvd1Rvb2x0aXAgPSAodGV4dDogc3RyaW5nLCBhbmNob3I/OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICB0b29sdGlwRWwudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG4gICAgICB0b29sdGlwRWwuY2xhc3NMaXN0LmFkZChcInZpc2libGVcIik7XHJcbiAgICAgIHRvb2x0aXBBbmNob3JSZWYuY3VycmVudCA9IGFuY2hvciB8fCBudWxsO1xyXG5cclxuICAgICAgY29uc3QgY2VudGVyWCA9IE1hdGgucm91bmQod2luZG93LmlubmVyV2lkdGggLyAyKTtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLmxlZnQgPSBgJHtjZW50ZXJYfXB4YDtcclxuXHJcbiAgICAgIGNvbnN0IG1hcmdpbiA9IDEyO1xyXG4gICAgICB0b29sdGlwRWwuc3R5bGUubWF4SGVpZ2h0ID0gYCR7TWF0aC5yb3VuZCh3aW5kb3cuaW5uZXJIZWlnaHQgKiBUT09MVElQX01BWF9IRUlHSFRfUkFUSU8pfXB4YDtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLm92ZXJmbG93WSA9IFwiYXV0b1wiO1xyXG5cclxuICAgICAgbGV0IGZvbnRTaXplID0gVE9PTFRJUF9CQVNFX0ZPTlQ7XHJcbiAgICAgIHRvb2x0aXBFbC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplfXB4YDtcclxuXHJcbiAgICAgIGxldCByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBjb25zdCBtYXhIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgKiBUT09MVElQX01BWF9IRUlHSFRfUkFUSU87XHJcbiAgICAgIHdoaWxlIChyZWN0LmhlaWdodCA+IG1heEhlaWdodCAmJiBmb250U2l6ZSA+IFRPT0xUSVBfTUlOX0ZPTlQpIHtcclxuICAgICAgICBmb250U2l6ZSAtPSAxO1xyXG4gICAgICAgIHRvb2x0aXBFbC5zdHlsZS5mb250U2l6ZSA9IGAke2ZvbnRTaXplfXB4YDtcclxuICAgICAgICByZWN0ID0gdG9vbHRpcEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBjZW50ZXJZID0gTWF0aC5yb3VuZCgod2luZG93LmlubmVySGVpZ2h0IC0gcmVjdC5oZWlnaHQpIC8gMik7XHJcbiAgICAgIGxldCB0b3AgPSBOdW1iZXIuaXNGaW5pdGUoY2VudGVyWSkgPyBjZW50ZXJZIDogbWFyZ2luO1xyXG4gICAgICBjb25zdCBtaW5Ub3AgPSBtYXJnaW47XHJcbiAgICAgIGNvbnN0IG1heFRvcCA9IE1hdGgubWF4KG1hcmdpbiwgd2luZG93LmlubmVySGVpZ2h0IC0gcmVjdC5oZWlnaHQgLSBtYXJnaW4pO1xyXG4gICAgICBpZiAodG9wIDwgbWluVG9wKSB0b3AgPSBtaW5Ub3A7XHJcbiAgICAgIGlmICh0b3AgPiBtYXhUb3ApIHRvcCA9IG1heFRvcDtcclxuICAgICAgdG9vbHRpcEVsLnN0eWxlLnRvcCA9IGAke01hdGgucm91bmQodG9wKX1weGA7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIEhpZGUgdG9vbHRpcCBjb250ZW50LlxyXG4gICAgY29uc3QgaGlkZVRvb2x0aXAgPSAoKSA9PiB7XHJcbiAgICAgIHRvb2x0aXBFbC5jbGFzc0xpc3QucmVtb3ZlKFwidmlzaWJsZVwiKTtcclxuICAgICAgdG9vbHRpcEFuY2hvclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgLy8gRGVjaWRlIGlmIGEgdG9vbHRpcCBzaG91bGQgZGlzcGxheS5cclxuICAgIGNvbnN0IHNob3VsZFByZXZpZXcgPSAoZWw6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgIGlmICghZWwuZGF0YXNldCB8fCAhZWwuZGF0YXNldC5mdWxsdGV4dCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICBpZiAoZWwuZGF0YXNldC5wcmV2aWV3ID09PSBcIjFcIikgcmV0dXJuIHRydWU7XHJcbiAgICAgIHJldHVybiBlbC5zY3JvbGxXaWR0aCA+IGVsLmNsaWVudFdpZHRoICsgMSB8fCBlbC5zY3JvbGxIZWlnaHQgPiBlbC5jbGllbnRIZWlnaHQgKyAxO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCByZXNvbHZlVG9vbHRpcFRhcmdldCA9ICh0YXJnZXQ6IEV2ZW50VGFyZ2V0IHwgbnVsbCkgPT4ge1xyXG4gICAgICBjb25zdCBub2RlID0gdGFyZ2V0IGFzIEhUTUxFbGVtZW50IHwgbnVsbDtcclxuICAgICAgaWYgKCFub2RlIHx8IHR5cGVvZiBub2RlLmNsb3Nlc3QgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIG51bGw7XHJcbiAgICAgIGNvbnN0IHRleHRFbCA9IG5vZGUuY2xvc2VzdDxIVE1MRWxlbWVudD4oXCIudGltZWxpbmUtbmFtZSwgLnRpbWVsaW5lLWRlc2MtdGV4dFwiKTtcclxuICAgICAgaWYgKCF0ZXh0RWwgfHwgIWNvbnRhaW5lci5jb250YWlucyh0ZXh0RWwpKSByZXR1cm4gbnVsbDtcclxuICAgICAgcmV0dXJuIHRleHRFbDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgc2hvd1Rvb2x0aXBGb3JFbGVtZW50ID0gKGVsOiBIVE1MRWxlbWVudCB8IG51bGwpID0+IHtcclxuICAgICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgICBjb25zdCB0ZXh0ID0gZWwuZGF0YXNldC5mdWxsdGV4dCB8fCBlbC50ZXh0Q29udGVudCB8fCBcIlwiO1xyXG4gICAgICBpZiAoIXRleHQgfHwgIXNob3VsZFByZXZpZXcoZWwpKSByZXR1cm47XHJcbiAgICAgIHNob3dUb29sdGlwKHRleHQsIGVsKTtcclxuICAgIH07XHJcblxyXG4gICAgbGV0IGFjdGl2ZVRvb2x0aXBFbDogSFRNTEVsZW1lbnQgfCBudWxsID0gbnVsbDtcclxuICAgIGxldCBwcmVzc1RpbWVyOiBudW1iZXIgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBjb25zdCBjbGVhclByZXNzVGltZXIgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChwcmVzc1RpbWVyID09IG51bGwpIHJldHVybjtcclxuICAgICAgd2luZG93LmNsZWFyVGltZW91dChwcmVzc1RpbWVyKTtcclxuICAgICAgcHJlc3NUaW1lciA9IG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VPdmVyID0gKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IHRleHRFbCA9IHJlc29sdmVUb29sdGlwVGFyZ2V0KGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIGlmICghdGV4dEVsKSByZXR1cm47XHJcbiAgICAgIGFjdGl2ZVRvb2x0aXBFbCA9IHRleHRFbDtcclxuICAgICAgc2hvd1Rvb2x0aXBGb3JFbGVtZW50KHRleHRFbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uTW91c2VPdXQgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgZnJvbSA9IHJlc29sdmVUb29sdGlwVGFyZ2V0KGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIGlmICghZnJvbSkgcmV0dXJuO1xyXG4gICAgICBjb25zdCB0byA9IHJlc29sdmVUb29sdGlwVGFyZ2V0KGV2ZW50LnJlbGF0ZWRUYXJnZXQpO1xyXG4gICAgICBpZiAodG8gJiYgdG8gPT09IGZyb20pIHJldHVybjtcclxuICAgICAgaGlkZVRvb2x0aXAoKTtcclxuICAgICAgYWN0aXZlVG9vbHRpcEVsID0gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAoKSA9PiB7XHJcbiAgICAgIGlmICghYWN0aXZlVG9vbHRpcEVsKSByZXR1cm47XHJcbiAgICAgIGlmICghdG9vbHRpcEVsLmNsYXNzTGlzdC5jb250YWlucyhcInZpc2libGVcIikpIHJldHVybjtcclxuICAgICAgc2hvd1Rvb2x0aXBGb3JFbGVtZW50KGFjdGl2ZVRvb2x0aXBFbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uVG91Y2hTdGFydCA9IChldmVudDogVG91Y2hFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCB0ZXh0RWwgPSByZXNvbHZlVG9vbHRpcFRhcmdldChldmVudC50YXJnZXQpO1xyXG4gICAgICBpZiAoIXRleHRFbCkgcmV0dXJuO1xyXG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSB0ZXh0RWw7XHJcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xyXG4gICAgICBwcmVzc1RpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHNob3dUb29sdGlwRm9yRWxlbWVudCh0ZXh0RWwpO1xyXG4gICAgICB9LCBUT09MVElQX1RPVUNIX0RFTEFZX01TKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3Qgb25Ub3VjaE1vdmUgPSAoKSA9PiB7XHJcbiAgICAgIGNsZWFyUHJlc3NUaW1lcigpO1xyXG4gICAgICBoaWRlVG9vbHRpcCgpO1xyXG4gICAgICBhY3RpdmVUb29sdGlwRWwgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvblRvdWNoRW5kID0gKCkgPT4ge1xyXG4gICAgICBjbGVhclByZXNzVGltZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgb25Nb3VzZU92ZXIpO1xyXG4gICAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBvbk1vdXNlT3V0KTtcclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBvblRvdWNoU3RhcnQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIGNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIG9uVG91Y2hNb3ZlLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIG9uVG91Y2hFbmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuXHJcbiAgICBjb25zdCBvblNlbGVjdFN0YXJ0ID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoIXJlc29sdmVDbGlja2FibGVDYXJkKGV2ZW50LnRhcmdldCkpIHJldHVybjtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH07XHJcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNlbGVjdHN0YXJ0XCIsIG9uU2VsZWN0U3RhcnQpO1xyXG5cclxuICAgIGNsZWFudXBzLnB1c2goKCkgPT4ge1xyXG4gICAgICBjb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBvbk1vdXNlT3Zlcik7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgb25Nb3VzZU91dCk7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIG9uVG91Y2hTdGFydCk7XHJcbiAgICAgIGNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsIG9uVG91Y2hNb3ZlKTtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCBvblRvdWNoRW5kKTtcclxuICAgICAgY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzZWxlY3RzdGFydFwiLCBvblNlbGVjdFN0YXJ0KTtcclxuICAgICAgY2xlYXJQcmVzc1RpbWVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWVycm9yTWVzc2FnZSkge1xyXG4gICAgICBjb25zdCBjYXJkcyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihcIi50aW1lbGluZS1jYXJkXCIpO1xyXG4gICAgICBjYXJkcy5mb3JFYWNoKChjYXJkKSA9PiB7XHJcbiAgICAgICAgaWYgKCFjYXJkLmNsYXNzTGlzdC5jb250YWlucyhcInRpbWVsaW5lLWNhcmQtLW5vZGF0YVwiKSkge1xyXG4gICAgICAgICAgY29uc3QgY2xlYW51cFBpeGVsID0gY3JlYXRlUGl4ZWxFZmZlY3QoY2FyZCk7XHJcbiAgICAgICAgICBpZiAoY2xlYW51cFBpeGVsKSBjbGVhbnVwcy5wdXNoKGNsZWFudXBQaXhlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGZyYW1lSWQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICBjb25zdCB0ZXh0RWxzID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGw8SFRNTEVsZW1lbnQ+KFwiLnRpbWVsaW5lLW5hbWUsIC50aW1lbGluZS1kZXNjLXRleHRcIik7XHJcbiAgICAgICAgdGV4dEVscy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdGV4dCA9IGVsLmRhdGFzZXQuZnVsbHRleHQgfHwgZWwudGV4dENvbnRlbnQgfHwgXCJcIjtcclxuICAgICAgICAgIGNvbnN0IGlzTXVsdGlMaW5lID0gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGltZWxpbmUtZGVzYy10ZXh0XCIpO1xyXG4gICAgICAgICAgY29uc3QgdHJpbW1lZFRleHQgPSBTdHJpbmcodGV4dCB8fCBcIlwiKS50cmltKCk7XHJcbiAgICAgICAgICBjb25zdCBkaWRFbGxpcHNpcyA9IGFwcGx5RWxsaXBzaXMoZWwsIHRyaW1tZWRUZXh0LCBpc011bHRpTGluZSk7XHJcbiAgICAgICAgICBpZiAoZGlkRWxsaXBzaXMgJiYgZWwudGV4dENvbnRlbnQgPT09IEVMTElQU0lTICYmIHRyaW1tZWRUZXh0Lmxlbmd0aCA+IDMgJiYgZWwuY2xpZW50V2lkdGggPiA2NCkge1xyXG4gICAgICAgICAgICBlbC50ZXh0Q29udGVudCA9IHRyaW1tZWRUZXh0O1xyXG4gICAgICAgICAgICBlbC5kYXRhc2V0LnByZXZpZXcgPSBcIjFcIjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjbGVhbnVwcy5wdXNoKCgpID0+IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShmcmFtZUlkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgY2xlYW51cHMuZm9yRWFjaCgoY2xlYW51cCkgPT4gY2xlYW51cCgpKTtcclxuICAgIH07XHJcbiAgfSwgW2NvbnRhaW5lclJlZiwgZXJyb3JNZXNzYWdlLCBpdGVtcywgcmVzb2x2ZUNsaWNrYWJsZUNhcmRdKTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gXCJyZWFjdC1kb21cIjtcclxuaW1wb3J0IHsgdXNlRmxvYXRpbmdBY3Rpb25CdXR0b25WaXNpYmlsaXR5IH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eS50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbSA9IHtcclxuICBpZDogc3RyaW5nO1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbiAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICByb3V0ZT86IHN0cmluZztcclxuICBvbkNsaWNrPzogKCkgPT4gdm9pZDtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgYXJpYUxhYmVsPzogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgRU1QVFlfTUVOVV9JVEVNUzogRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdID0gW107XHJcblxyXG50eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uUHJvcHMgPSB7XHJcbiAgcm91dGU/OiBzdHJpbmc7XHJcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XHJcbiAgc2l6ZT86IG51bWJlcjtcclxuICByaWdodD86IG51bWJlcjtcclxuICBib3R0b20/OiBudW1iZXI7XHJcbiAgY29sb3I/OiBzdHJpbmc7XHJcbiAgc2hhZG93T3BhY2l0eT86IG51bWJlcjtcclxuICBwbHVzVGhpY2tuZXNzPzogbnVtYmVyO1xyXG4gIHBsdXNMZW5ndGg/OiBudW1iZXI7XHJcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XHJcbiAgbWVudUl0ZW1zPzogRmxvYXRpbmdBY3Rpb25CdXR0b25NZW51SXRlbVtdO1xyXG4gIGlzTWVudU9wZW4/OiBib29sZWFuO1xyXG4gIG9uTWVudU9wZW5DaGFuZ2U/OiAoaXNPcGVuOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIGNsb3NlTWVudU9uU2VsZWN0PzogYm9vbGVhbjtcclxuICBtZW51QXJpYUxhYmVsPzogc3RyaW5nO1xyXG4gIG1lbnVDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCBjbGFtcCA9ICh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IE1hdGgubWluKG1heCwgTWF0aC5tYXgobWluLCB2YWx1ZSkpO1xyXG5cclxuLy8gRmxvYXRpbmcgYWN0aW9uIGJ1dHRvbiB0aGF0IHN1cHBvcnRzIGRpcmVjdCBhY3Rpb24gb3Igc3BlZWQtZGlhbCBtZW51IG1vZGUuXHJcbmNvbnN0IEZsb2F0aW5nQWN0aW9uQnV0dG9uID0gKHtcclxuICByb3V0ZSxcclxuICBhcmlhTGFiZWwsXHJcbiAgc2l6ZSA9IDc2LFxyXG4gIHJpZ2h0ID0gMjQsXHJcbiAgYm90dG9tID0gMjQsXHJcbiAgY29sb3IgPSBcIiMwMDI5NmJcIixcclxuICBzaGFkb3dPcGFjaXR5ID0gMC4xNixcclxuICBwbHVzVGhpY2tuZXNzID0gNCxcclxuICBwbHVzTGVuZ3RoID0gMjgsXHJcbiAgb25DbGljayxcclxuICBtZW51SXRlbXMgPSBFTVBUWV9NRU5VX0lURU1TLFxyXG4gIGlzTWVudU9wZW4sXHJcbiAgb25NZW51T3BlbkNoYW5nZSxcclxuICBjbG9zZU1lbnVPblNlbGVjdCA9IHRydWUsXHJcbiAgbWVudUFyaWFMYWJlbCxcclxuICBtZW51Q2xhc3NOYW1lID0gXCJcIixcclxufTogRmxvYXRpbmdBY3Rpb25CdXR0b25Qcm9wcykgPT4ge1xyXG4gIGNvbnN0IHJvb3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBbaW50ZXJuYWxNZW51T3Blbiwgc2V0SW50ZXJuYWxNZW51T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgaGFzTWVudSA9IG1lbnVJdGVtcy5sZW5ndGggPiAwO1xyXG4gIGNvbnN0IGlzTWVudUNvbnRyb2xsZWQgPSB0eXBlb2YgaXNNZW51T3BlbiA9PT0gXCJib29sZWFuXCI7XHJcbiAgY29uc3QgbWVudU9wZW4gPSBoYXNNZW51ID8gKGlzTWVudUNvbnRyb2xsZWQgPyBCb29sZWFuKGlzTWVudU9wZW4pIDogaW50ZXJuYWxNZW51T3BlbikgOiBmYWxzZTtcclxuICBjb25zdCB7IHJlc29sdmVkQm90dG9tIH0gPSB1c2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHkoe1xyXG4gICAgYm90dG9tLFxyXG4gICAgc2l6ZSxcclxuICB9KTtcclxuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgY29uc3Qgc2V0TWVudU9wZW4gPSB1c2VDYWxsYmFjayhcclxuICAgIChuZXh0T3BlbjogYm9vbGVhbikgPT4ge1xyXG4gICAgICBpZiAoIWhhc01lbnUpIHJldHVybjtcclxuICAgICAgaWYgKCFpc01lbnVDb250cm9sbGVkKSB7XHJcbiAgICAgICAgc2V0SW50ZXJuYWxNZW51T3BlbihuZXh0T3Blbik7XHJcbiAgICAgIH1cclxuICAgICAgb25NZW51T3BlbkNoYW5nZT8uKG5leHRPcGVuKTtcclxuICAgIH0sXHJcbiAgICBbaGFzTWVudSwgaXNNZW51Q29udHJvbGxlZCwgb25NZW51T3BlbkNoYW5nZV1cclxuICApO1xyXG5cclxuICBjb25zdCBidWlsZEZhYlN2ZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IHNhZmVPcGFjaXR5ID0gY2xhbXAoc2hhZG93T3BhY2l0eSwgMCwgMC41KTtcclxuICAgIGNvbnN0IHNhZmVUaGlja25lc3MgPSBjbGFtcChwbHVzVGhpY2tuZXNzLCAyLCA4KTtcclxuICAgIGNvbnN0IHNhZmVMZW5ndGggPSBjbGFtcChwbHVzTGVuZ3RoLCAxNiwgNDApO1xyXG5cclxuICAgIGNvbnN0IGN4ID0gNDg7XHJcbiAgICBjb25zdCB4ViA9IGN4IC0gc2FmZVRoaWNrbmVzcyAvIDI7XHJcbiAgICBjb25zdCB5ViA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XHJcbiAgICBjb25zdCB4SCA9IGN4IC0gc2FmZUxlbmd0aCAvIDI7XHJcbiAgICBjb25zdCB5SCA9IGN4IC0gc2FmZVRoaWNrbmVzcyAvIDI7XHJcblxyXG4gICAgcmV0dXJuIGBcclxuICAgICAgPHN2ZyB3aWR0aD1cIjk2XCIgaGVpZ2h0PVwiOTZcIiB2aWV3Qm94PVwiMCAwIDk2IDk2XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgIDxkZWZzPlxyXG4gICAgICAgICAgPGZpbHRlciBpZD1cImZhYlNoYWRvd1wiIHg9XCItNDAlXCIgeT1cIi00MCVcIiB3aWR0aD1cIjE4MCVcIiBoZWlnaHQ9XCIxODAlXCI+XHJcbiAgICAgICAgICAgIDxmZURyb3BTaGFkb3cgZHg9XCItNFwiIGR5PVwiMTBcIiBzdGREZXZpYXRpb249XCI2XCIgZmxvb2QtY29sb3I9XCIjMDAwXCIgZmxvb2Qtb3BhY2l0eT1cIiR7c2FmZU9wYWNpdHl9XCIvPlxyXG4gICAgICAgICAgPC9maWx0ZXI+XHJcbiAgICAgICAgPC9kZWZzPlxyXG5cclxuICAgICAgICA8ZyBmaWx0ZXI9XCJ1cmwoI2ZhYlNoYWRvdylcIj5cclxuICAgICAgICAgIDxjaXJjbGUgY3g9XCI0OFwiIGN5PVwiNDhcIiByPVwiMzRcIiBmaWxsPVwiJHtjb2xvcn1cIi8+XHJcbiAgICAgICAgPC9nPlxyXG5cclxuICAgICAgICA8ZyBmaWxsPVwiI2ZmZlwiPlxyXG4gICAgICAgICAgPHJlY3QgeD1cIiR7eFZ9XCIgeT1cIiR7eVZ9XCIgd2lkdGg9XCIke3NhZmVUaGlja25lc3N9XCIgaGVpZ2h0PVwiJHtzYWZlTGVuZ3RofVwiIHJ4PVwiMVwiLz5cclxuICAgICAgICAgIDxyZWN0IHg9XCIke3hIfVwiIHk9XCIke3lIfVwiIHdpZHRoPVwiJHtzYWZlTGVuZ3RofVwiIGhlaWdodD1cIiR7c2FmZVRoaWNrbmVzc31cIiByeD1cIjFcIi8+XHJcbiAgICAgICAgPC9nPlxyXG4gICAgICA8L3N2Zz5cclxuICAgIGAudHJpbSgpO1xyXG4gIH0sIFtjb2xvciwgcGx1c0xlbmd0aCwgcGx1c1RoaWNrbmVzcywgc2hhZG93T3BhY2l0eV0pO1xyXG5cclxuICBjb25zdCByZW5kZXJTdmdUb0NhbnZhcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcclxuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHNpemVQeCA9IE1hdGgubWF4KDQwLCBzaXplKTtcclxuICAgIGNvbnN0IGRwciA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XHJcblxyXG4gICAgY2FudmFzLndpZHRoID0gTWF0aC5yb3VuZChzaXplUHggKiBkcHIpO1xyXG4gICAgY2FudmFzLmhlaWdodCA9IE1hdGgucm91bmQoc2l6ZVB4ICogZHByKTtcclxuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IGAke3NpemVQeH1weGA7XHJcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7c2l6ZVB4fXB4YDtcclxuICAgIGN0eC5zZXRUcmFuc2Zvcm0oZHByLCAwLCAwLCBkcHIsIDAsIDApO1xyXG5cclxuICAgIGNvbnN0IHN2ZyA9IGJ1aWxkRmFiU3ZnKCk7XHJcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3N2Z10sIHsgdHlwZTogXCJpbWFnZS9zdmcreG1sXCIgfSk7XHJcbiAgICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1nLmRlY29kaW5nID0gXCJhc3luY1wiO1xyXG4gICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBzaXplUHgsIHNpemVQeCk7XHJcbiAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBzaXplUHgsIHNpemVQeCk7XHJcbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcclxuICAgIH07XHJcbiAgICBpbWcub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xyXG4gICAgfTtcclxuICAgIGltZy5zcmMgPSB1cmw7XHJcbiAgfSwgW2J1aWxkRmFiU3ZnLCBzaXplXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICByZW5kZXJTdmdUb0NhbnZhcygpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgcmVuZGVyU3ZnVG9DYW52YXMpO1xyXG4gICAgcmV0dXJuICgpID0+IHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHJlbmRlclN2Z1RvQ2FudmFzKTtcclxuICB9LCBbcmVuZGVyU3ZnVG9DYW52YXNdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghbWVudU9wZW4pIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVPdXRzaWRlQ2xpY2sgPSAoZXZlbnQ6IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSBldmVudC50YXJnZXQgYXMgTm9kZSB8IG51bGw7XHJcbiAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xyXG4gICAgICBpZiAocm9vdFJlZi5jdXJyZW50Py5jb250YWlucyhub2RlKSkgcmV0dXJuO1xyXG4gICAgICBzZXRNZW51T3BlbihmYWxzZSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUVzY2FwZSA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xyXG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgc2V0TWVudU9wZW4oZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlT3V0c2lkZUNsaWNrKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZU91dHNpZGVDbGljaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGhhbmRsZUVzY2FwZSk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZU91dHNpZGVDbGljayk7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZU91dHNpZGVDbGljayk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVFc2NhcGUpO1xyXG4gICAgfTtcclxuICB9LCBbbWVudU9wZW4sIHNldE1lbnVPcGVuXSk7XHJcblxyXG4gIGNvbnN0IHJ1blByaW1hcnlBY3Rpb24gPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIG9uQ2xpY2sgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICBvbkNsaWNrKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghcm91dGUgfHwgdHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByb3V0ZTtcclxuICB9LCBbb25DbGljaywgcm91dGVdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTWFpbkNsaWNrID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKGhhc01lbnUpIHtcclxuICAgICAgc2V0TWVudU9wZW4oIW1lbnVPcGVuKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHJ1blByaW1hcnlBY3Rpb24oKTtcclxuICB9LCBbaGFzTWVudSwgbWVudU9wZW4sIHJ1blByaW1hcnlBY3Rpb24sIHNldE1lbnVPcGVuXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZU1lbnVJdGVtQ2xpY2sgPSB1c2VDYWxsYmFjayhcclxuICAgIChpdGVtOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbk1lbnVJdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLmRpc2FibGVkKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAodHlwZW9mIGl0ZW0ub25DbGljayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgaXRlbS5vbkNsaWNrKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5yb3V0ZSAmJiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBpdGVtLnJvdXRlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY2xvc2VNZW51T25TZWxlY3QpIHtcclxuICAgICAgICBzZXRNZW51T3BlbihmYWxzZSk7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBbY2xvc2VNZW51T25TZWxlY3QsIHNldE1lbnVPcGVuXVxyXG4gICk7XHJcblxyXG4gIGNvbnN0IG1lbnVQYW5lbENsYXNzTmFtZSA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgY29uc3QgYmFzZSA9IFwibWluLXctWzExcmVtXSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgYm9yZGVyLXNsYXRlLTIwMCBiZy13aGl0ZSBwLTIgc2hhZG93LXhsXCI7XHJcbiAgICBjb25zdCBleHRyYSA9IG1lbnVDbGFzc05hbWUudHJpbSgpO1xyXG4gICAgcmV0dXJuIGV4dHJhID8gYCR7YmFzZX0gJHtleHRyYX1gIDogYmFzZTtcclxuICB9LCBbbWVudUNsYXNzTmFtZV0pO1xyXG5cclxuICBjb25zdCBmbG9hdGluZ0FjdGlvbkJ1dHRvbiA9IChcclxuICAgIDxkaXZcclxuICAgICAgcmVmPXtyb290UmVmfVxyXG4gICAgICBjbGFzc05hbWU9XCJmaXhlZCB6LTIwMDAgZmxleCBmbGV4LWNvbCBpdGVtcy1lbmQgZ2FwLTJcIlxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHJpZ2h0OiBgJHtyaWdodH1weGAsXHJcbiAgICAgICAgYm90dG9tOiBgJHtyZXNvbHZlZEJvdHRvbX1weGAsXHJcbiAgICAgIH19XHJcbiAgICA+XHJcbiAgICAgIHttZW51T3BlbiA/IChcclxuICAgICAgICA8ZGl2IHJvbGU9XCJtZW51XCIgYXJpYS1sYWJlbD17bWVudUFyaWFMYWJlbCB8fCBhcmlhTGFiZWx9IGNsYXNzTmFtZT17bWVudVBhbmVsQ2xhc3NOYW1lfT5cclxuICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cclxuICAgICAgICAgICAge21lbnVJdGVtcy5tYXAoKGl0ZW0pID0+IChcclxuICAgICAgICAgICAgICA8bGkga2V5PXtpdGVtLmlkfT5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIHJvbGU9XCJtZW51aXRlbVwiXHJcbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2l0ZW0uYXJpYUxhYmVsIHx8IGl0ZW0ubGFiZWx9XHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpdGVtLmRpc2FibGVkfVxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IHctZnVsbCBpdGVtcy1jZW50ZXIgZ2FwLTIgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gcHgtMyBweS0yIHRleHQtbGVmdCB0ZXh0LVsxNnB4XSBmb250LW1lZGl1bSBsZWFkaW5nLTUgdGV4dC1zbGF0ZS03MDAgdHJhbnNpdGlvbi1jb2xvcnMgaG92ZXI6Ymctc2xhdGUtMTAwIGZvY3VzLXZpc2libGU6b3V0bGluZS1oaWRkZW4gZm9jdXMtdmlzaWJsZTpyaW5nLTIgZm9jdXMtdmlzaWJsZTpyaW5nLXByaW1hcnkvNDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkIGRpc2FibGVkOm9wYWNpdHktNTBcIlxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVNZW51SXRlbUNsaWNrKGl0ZW0pfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7aXRlbS5pY29uID8gPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaC01IHctNSBzaHJpbmstMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj57aXRlbS5pY29ufTwvc3Bhbj4gOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0cnVuY2F0ZVwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgICAgICkpfVxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgYXJpYS1sYWJlbD17YXJpYUxhYmVsfVxyXG4gICAgICAgIGFyaWEtZXhwYW5kZWQ9e2hhc01lbnUgPyBtZW51T3BlbiA6IHVuZGVmaW5lZH1cclxuICAgICAgICBhcmlhLWhhc3BvcHVwPXtoYXNNZW51ID8gXCJtZW51XCIgOiB1bmRlZmluZWR9XHJcbiAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgcC0wIHRyYW5zaXRpb24tdHJhbnNmb3JtIGR1cmF0aW9uLTE1MCBob3ZlcjotdHJhbnNsYXRlLXktMC41IGFjdGl2ZTpzY2FsZS05NSBmb2N1cy12aXNpYmxlOnJpbmctNCBmb2N1cy12aXNpYmxlOnJpbmctcHJpbWFyeS8zMCBmb2N1cy12aXNpYmxlOnJpbmctb2Zmc2V0LTRcIlxyXG4gICAgICAgIHN0eWxlPXt7XHJcbiAgICAgICAgICB3aWR0aDogYCR7c2l6ZX1weGAsXHJcbiAgICAgICAgICBoZWlnaHQ6IGAke3NpemV9cHhgLFxyXG4gICAgICAgICAgV2Via2l0VGFwSGlnaGxpZ2h0Q29sb3I6IFwidHJhbnNwYXJlbnRcIixcclxuICAgICAgICB9fVxyXG4gICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1haW5DbGlja31cclxuICAgICAgPlxyXG4gICAgICAgIDxjYW52YXMgcmVmPXtjYW52YXNSZWZ9IGNsYXNzTmFtZT1cImJsb2NrIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCIgLz5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG5cclxuICBpZiAoIXBvcnRhbFRhcmdldCkge1xyXG4gICAgcmV0dXJuIGZsb2F0aW5nQWN0aW9uQnV0dG9uO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChmbG9hdGluZ0FjdGlvbkJ1dHRvbiwgcG9ydGFsVGFyZ2V0KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nQWN0aW9uQnV0dG9uO1xyXG4iLCAiaW1wb3J0IHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG50eXBlIFVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eUFyZ3MgPSB7XHJcbiAgYm90dG9tOiBudW1iZXI7XHJcbiAgc2l6ZTogbnVtYmVyO1xyXG59O1xyXG5cclxudHlwZSBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlSZXN1bHQgPSB7XHJcbiAgcmVzb2x2ZWRCb3R0b206IG51bWJlcjtcclxuICByZXNlcnZlZEhlaWdodDogbnVtYmVyO1xyXG59O1xyXG5cclxuY29uc3QgREVGQVVMVF9GQUJfQk9UVE9NX1BYID0gMjQ7XHJcbmNvbnN0IEZBQl9DT05URU5UX0NMRUFSQU5DRV9QWCA9IDEyO1xyXG5jb25zdCBBU1NJU1RBTlRfVklTVUFMX0JBU0VMSU5FX0NPUlJFQ1RJT05fUFggPSA2O1xyXG5jb25zdCBBU1NJU1RBTlRfTEFVTkNIRVJfU0VMRUNUT1IgPSBcIltkYXRhLWluZC1hc3Npc3RhbnQtbGF1bmNoZXI9J3RydWUnXVwiO1xyXG5jb25zdCBQQUdFX0ZMT0FUSU5HX0NMRUFSQU5DRV9DU1NfVkFSID0gXCItLWluZC1wYWdlLWZsb2F0aW5nLWNsZWFyYW5jZVwiO1xyXG5cclxuLy8gUmV0dXJucyB0cnVlIHdoZW4gb25lIERPTSBlbGVtZW50IGlzIGFjdHVhbGx5IHZpc2libGUgYW5kIGNhbiBkZWZpbmUgYSB2aXN1YWwgYmFzZWxpbmUuXHJcbmNvbnN0IGlzVmlzaWJsZUxheW91dEVsZW1lbnQgPSAoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuID0+IHtcclxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuIGZhbHNlO1xyXG5cclxuICBjb25zdCBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcclxuICBpZiAoc3R5bGVzLmRpc3BsYXkgPT09IFwibm9uZVwiIHx8IHN0eWxlcy52aXNpYmlsaXR5ID09PSBcImhpZGRlblwiKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICByZXR1cm4gcmVjdC53aWR0aCA+IDAgJiYgcmVjdC5oZWlnaHQgPiAwO1xyXG59O1xyXG5cclxuLy8gRmluZHMgb25lIHZpc2libGUgYXNzaXN0YW50IGxhdW5jaGVyIHNvIHRoZSBGQUIgY2FuIHNoYXJlIHRoZSBzYW1lIGJhc2VsaW5lLlxyXG5jb25zdCBnZXRWaXNpYmxlQXNzaXN0YW50TGF1bmNoZXIgPSAoKTogSFRNTEVsZW1lbnQgfCBudWxsID0+IHtcclxuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgbGF1bmNoZXJzID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsPEhUTUxFbGVtZW50PihBU1NJU1RBTlRfTEFVTkNIRVJfU0VMRUNUT1IpKTtcclxuICBmb3IgKGNvbnN0IGxhdW5jaGVyIG9mIGxhdW5jaGVycykge1xyXG4gICAgaWYgKGlzVmlzaWJsZUxheW91dEVsZW1lbnQobGF1bmNoZXIpKSB7XHJcbiAgICAgIHJldHVybiBsYXVuY2hlcjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuY29uc3Qgc2V0UGFnZUZsb2F0aW5nQ2xlYXJhbmNlID0gKGNsZWFyYW5jZTogbnVtYmVyKTogdm9pZCA9PiB7XHJcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICBjb25zdCBzYWZlVmFsdWUgPSBgJHtNYXRoLm1heCgwLCBNYXRoLmNlaWwoY2xlYXJhbmNlKSl9cHhgO1xyXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShQQUdFX0ZMT0FUSU5HX0NMRUFSQU5DRV9DU1NfVkFSLCBzYWZlVmFsdWUpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKT8uc3R5bGUuc2V0UHJvcGVydHkoUEFHRV9GTE9BVElOR19DTEVBUkFOQ0VfQ1NTX1ZBUiwgc2FmZVZhbHVlKTtcclxufTtcclxuXHJcbmNvbnN0IGNsZWFyUGFnZUZsb2F0aW5nQ2xlYXJhbmNlID0gKCk6IHZvaWQgPT4ge1xyXG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KFBBR0VfRkxPQVRJTkdfQ0xFQVJBTkNFX0NTU19WQVIpO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKT8uc3R5bGUucmVtb3ZlUHJvcGVydHkoUEFHRV9GTE9BVElOR19DTEVBUkFOQ0VfQ1NTX1ZBUik7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyB0aGUgYm90dG9tIGRpc3RhbmNlLiBXaGVuIHRoZSBhc3Npc3RhbnQgbGF1bmNoZXIgZXhpc3RzLCBpdCBiZWNvbWVzIHRoZSB2aXN1YWwgYmFzZWxpbmUuXHJcbmNvbnN0IHJlc29sdmVCb3R0b21PZmZzZXQgPSAoYm90dG9tOiBudW1iZXIpOiBudW1iZXIgPT4ge1xyXG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGJvdHRvbSk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBhc3Npc3RhbnRMYXVuY2hlciA9IGdldFZpc2libGVBc3Npc3RhbnRMYXVuY2hlcigpO1xyXG4gIGlmICghYXNzaXN0YW50TGF1bmNoZXIpIHtcclxuICAgIHJldHVybiBNYXRoLm1heCgwLCBib3R0b20pO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCAwO1xyXG4gIGNvbnN0IGxhdW5jaGVyUmVjdCA9IGFzc2lzdGFudExhdW5jaGVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gIGNvbnN0IGxhdW5jaGVyQm90dG9tID0gTWF0aC5tYXgoMCwgTWF0aC5yb3VuZCh2aWV3cG9ydEhlaWdodCAtIGxhdW5jaGVyUmVjdC5ib3R0b20pKTtcclxuICBjb25zdCBhZGRpdGlvbmFsQ2xlYXJhbmNlID0gTWF0aC5tYXgoMCwgYm90dG9tIC0gREVGQVVMVF9GQUJfQk9UVE9NX1BYKTtcclxuXHJcbiAgcmV0dXJuIE1hdGgubWF4KDAsIGxhdW5jaGVyQm90dG9tIC0gQVNTSVNUQU5UX1ZJU1VBTF9CQVNFTElORV9DT1JSRUNUSU9OX1BYICsgYWRkaXRpb25hbENsZWFyYW5jZSk7XHJcbn07XHJcblxyXG4vLyBSZXNlcnZlcyBvbmUgc2hhcmVkIGVuZGluZyBsYW5lIGZvciBmbG9hdGluZyBVSSB3aXRob3V0IGRlcGVuZGluZyBvbiBwYWdpbmF0aW9uIHBvc2l0aW9uLlxyXG5jb25zdCByZXNvbHZlUmVzZXJ2ZWRIZWlnaHQgPSAoYm90dG9tOiBudW1iZXIsIHNpemU6IG51bWJlcik6IG51bWJlciA9PiB7XHJcbiAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGguY2VpbChib3R0b20gKyBNYXRoLm1heCg0MCwgc2l6ZSkgKyBGQUJfQ09OVEVOVF9DTEVBUkFOQ0VfUFgpKTtcclxufTtcclxuXHJcbi8vIEtlZXBzIHRoZSBmbG9hdGluZyBhY3Rpb24gYnV0dG9uIGFsaWduZWQgd2l0aCBvdGhlciBmbG9hdGluZyBVSSBhbmQgZXhwb3NlcyBvbmUgcGFnZSBjbGVhcmFuY2UgbGFuZS5cclxuZXhwb3J0IGNvbnN0IHVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eSA9ICh7XHJcbiAgYm90dG9tLFxyXG4gIHNpemUsXHJcbn06IFVzZUZsb2F0aW5nQWN0aW9uQnV0dG9uVmlzaWJpbGl0eUFyZ3MpOiBVc2VGbG9hdGluZ0FjdGlvbkJ1dHRvblZpc2liaWxpdHlSZXN1bHQgPT4ge1xyXG4gIGNvbnN0IFtyZXNvbHZlZEJvdHRvbSwgc2V0UmVzb2x2ZWRCb3R0b21dID0gdXNlU3RhdGUoYm90dG9tKTtcclxuICBjb25zdCBbcmVzZXJ2ZWRIZWlnaHQsIHNldFJlc2VydmVkSGVpZ2h0XSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IGFuaW1hdGlvbkZyYW1lUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG5cclxuICBjb25zdCB1cGRhdGVMYXlvdXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG5leHRCb3R0b20gPSByZXNvbHZlQm90dG9tT2Zmc2V0KGJvdHRvbSk7XHJcbiAgICBjb25zdCBuZXh0UmVzZXJ2ZWRIZWlnaHQgPSByZXNvbHZlUmVzZXJ2ZWRIZWlnaHQobmV4dEJvdHRvbSwgc2l6ZSk7XHJcblxyXG4gICAgc2V0UmVzb2x2ZWRCb3R0b20oKHByZXZpb3VzKSA9PiAoTWF0aC5hYnMocHJldmlvdXMgLSBuZXh0Qm90dG9tKSA8IDEgPyBwcmV2aW91cyA6IG5leHRCb3R0b20pKTtcclxuICAgIHNldFJlc2VydmVkSGVpZ2h0KChwcmV2aW91cykgPT4gKE1hdGguYWJzKHByZXZpb3VzIC0gbmV4dFJlc2VydmVkSGVpZ2h0KSA8IDEgPyBwcmV2aW91cyA6IG5leHRSZXNlcnZlZEhlaWdodCkpO1xyXG4gIH0sIFtib3R0b20sIHNpemVdKTtcclxuXHJcbiAgY29uc3Qgc2NoZWR1bGVMYXlvdXRVcGRhdGUgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG5cclxuICAgIGlmIChhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgIGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB1cGRhdGVMYXlvdXQoKTtcclxuICAgIH0pO1xyXG4gIH0sIFt1cGRhdGVMYXlvdXRdKTtcclxuXHJcbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcclxuICAgIHVwZGF0ZUxheW91dCgpO1xyXG4gIH0sIFt1cGRhdGVMYXlvdXRdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICh0eXBlb2YgTXV0YXRpb25PYnNlcnZlciA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuICAgIGlmICghYm9keSkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICBzY2hlZHVsZUxheW91dFVwZGF0ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShib2R5LCB7XHJcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiBvYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgfSwgW3NjaGVkdWxlTGF5b3V0VXBkYXRlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBzZXRQYWdlRmxvYXRpbmdDbGVhcmFuY2UocmVzZXJ2ZWRIZWlnaHQpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGNsZWFyUGFnZUZsb2F0aW5nQ2xlYXJhbmNlKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtyZXNlcnZlZEhlaWdodF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVSZXNpemUgPSAoKSA9PiB7XHJcbiAgICAgIHNjaGVkdWxlTGF5b3V0VXBkYXRlKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcclxuXHJcbiAgICAgIGlmIChhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFtzY2hlZHVsZUxheW91dFVwZGF0ZV0pO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcmVzb2x2ZWRCb3R0b20sXHJcbiAgICByZXNlcnZlZEhlaWdodCxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYsIHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuL1NwaW5uZXIudHN4XCI7XHJcblxyXG50eXBlIFBhZ2luYXRpb25MYWJlbHMgPSB7XHJcbiAgZmlyc3Q/OiBzdHJpbmc7XHJcbiAgcHJldj86IHN0cmluZztcclxuICBuZXh0Pzogc3RyaW5nO1xyXG4gIGxhc3Q/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIENvbXBhY3RQYWdpbmF0aW9uUHJvcHMgPSB7XHJcbiAgdG90YWxQYWdlczogbnVtYmVyO1xyXG4gIGN1cnJlbnRQYWdlOiBudW1iZXI7XHJcbiAgcGFnZVdpbmRvdz86IG51bWJlcjtcclxuICBvblBhZ2VDaGFuZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XHJcbiAgbGFiZWxzPzogUGFnaW5hdGlvbkxhYmVscztcclxuICBjbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgbG9hZGluZz86IGJvb2xlYW47XHJcbn07XHJcblxyXG5jb25zdCBERUZBVUxUX1dJTkRPVyA9IDY7XHJcblxyXG50eXBlIFBhZ2luYXRpb25Mb2NrV2luZG93ID0gV2luZG93ICYge1xyXG4gIF9faW5kUGFnaW5hdGlvbkxvY2tDb3VudD86IG51bWJlcjtcclxuICBfX2luZFBhZ2luYXRpb25QcmV2T3ZlcmZsb3c/OiBzdHJpbmc7XHJcbiAgX19pbmRQYWdpbmF0aW9uUHJldlRvdWNoQWN0aW9uPzogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gQ29tcGFjdCBwYWdpbmF0aW9uIHdpdGggNi1wYWdlIHdpbmRvdyBhbmQgZWRnZSBjb250cm9scy5cclxuY29uc3QgQ29tcGFjdFBhZ2luYXRpb24gPSBmb3J3YXJkUmVmPEhUTUxEaXZFbGVtZW50LCBDb21wYWN0UGFnaW5hdGlvblByb3BzPihcclxuICAoeyB0b3RhbFBhZ2VzLCBjdXJyZW50UGFnZSwgcGFnZVdpbmRvdyA9IERFRkFVTFRfV0lORE9XLCBvblBhZ2VDaGFuZ2UsIGxhYmVscywgY2xhc3NOYW1lLCBsb2FkaW5nIH0sIHJlZikgPT4ge1xyXG4gICAgY29uc3Qgc2FmZVRvdGFsID0gTWF0aC5tYXgoMCwgdG90YWxQYWdlcyB8fCAwKTtcclxuICAgIGNvbnN0IHNhZmVDdXJyZW50ID0gTWF0aC5taW4oTWF0aC5tYXgoMSwgY3VycmVudFBhZ2UgfHwgMSksIHNhZmVUb3RhbCB8fCAxKTtcclxuICAgIGNvbnN0IHdpbmRvd1NpemUgPSBNYXRoLm1heCgxLCBwYWdlV2luZG93IHx8IERFRkFVTFRfV0lORE9XKTtcclxuICAgIGNvbnN0IGhhc0xvYWRpbmdTaWduYWwgPSB0eXBlb2YgbG9hZGluZyA9PT0gXCJib29sZWFuXCI7XHJcbiAgICBjb25zdCBpc0xvYWRpbmcgPSBsb2FkaW5nID09PSB0cnVlO1xyXG4gICAgY29uc3QgW2lzUGFnZVRyYW5zaXRpb25QZW5kaW5nLCBzZXRJc1BhZ2VUcmFuc2l0aW9uUGVuZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgICBjb25zdCBzaG93UGFnZVNwaW5uZXIgPSBoYXNMb2FkaW5nU2lnbmFsICYmIGlzUGFnZVRyYW5zaXRpb25QZW5kaW5nO1xyXG5cclxuICAgIGNvbnN0IHNob3dQYWdpbmF0aW9uID0gc2FmZVRvdGFsID4gMTtcclxuICAgIGNvbnN0IHNob3dFZGdlTmF2ID0gc2FmZVRvdGFsID4gd2luZG93U2l6ZTtcclxuICAgIGNvbnN0IGNhbkp1bXBUb1N0YXJ0ID0gc2FmZUN1cnJlbnQgPiB3aW5kb3dTaXplO1xyXG4gICAgY29uc3QgY2FuR29QcmV2ID0gc2FmZUN1cnJlbnQgPiAxO1xyXG4gICAgY29uc3QgY2FuR29OZXh0ID0gc2FmZUN1cnJlbnQgPCBzYWZlVG90YWw7XHJcblxyXG4gICAgY29uc3QgcGFnZU51bWJlcnMgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgICAgaWYgKCFzYWZlVG90YWwpIHJldHVybiBbXTtcclxuICAgICAgY29uc3Qgd2luZG93U3RhcnQgPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKChzYWZlQ3VycmVudCAtIDEpIC8gd2luZG93U2l6ZSkgKiB3aW5kb3dTaXplICsgMSk7XHJcbiAgICAgIGNvbnN0IHdpbmRvd0VuZCA9IE1hdGgubWluKHNhZmVUb3RhbCwgd2luZG93U3RhcnQgKyB3aW5kb3dTaXplIC0gMSk7XHJcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHsgbGVuZ3RoOiB3aW5kb3dFbmQgLSB3aW5kb3dTdGFydCArIDEgfSwgKF92YWwsIGlkeCkgPT4gd2luZG93U3RhcnQgKyBpZHgpO1xyXG4gICAgfSwgW3NhZmVDdXJyZW50LCBzYWZlVG90YWwsIHdpbmRvd1NpemVdKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICBpZiAoIWhhc0xvYWRpbmdTaWduYWwgfHwgIWlzUGFnZVRyYW5zaXRpb25QZW5kaW5nKSByZXR1cm47XHJcbiAgICAgIGlmIChpc0xvYWRpbmcpIHJldHVybjtcclxuICAgICAgc2V0SXNQYWdlVHJhbnNpdGlvblBlbmRpbmcoZmFsc2UpO1xyXG4gICAgfSwgW2hhc0xvYWRpbmdTaWduYWwsIGlzTG9hZGluZywgaXNQYWdlVHJhbnNpdGlvblBlbmRpbmddKTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICBpZiAoIXNob3dQYWdlU3Bpbm5lcikgcmV0dXJuO1xyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IGxvY2tXaW5kb3cgPSB3aW5kb3cgYXMgUGFnaW5hdGlvbkxvY2tXaW5kb3c7XHJcbiAgICAgIGNvbnN0IGxvY2tDb3VudCA9IE51bWJlcihsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvbkxvY2tDb3VudCB8fCAwKTtcclxuICAgICAgaWYgKGxvY2tDb3VudCA8IDEpIHtcclxuICAgICAgICBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZPdmVyZmxvdyA9IGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c7XHJcbiAgICAgICAgbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25QcmV2VG91Y2hBY3Rpb24gPSBkb2N1bWVudC5ib2R5LnN0eWxlLnRvdWNoQWN0aW9uO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudG91Y2hBY3Rpb24gPSBcIm5vbmVcIjtcclxuICAgICAgfVxyXG4gICAgICBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvbkxvY2tDb3VudCA9IGxvY2tDb3VudCArIDE7XHJcblxyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb3VudCA9IE51bWJlcihsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvbkxvY2tDb3VudCB8fCAwKTtcclxuICAgICAgICBjb25zdCBuZXh0Q291bnQgPSBNYXRoLm1heCgwLCBjdXJyZW50Q291bnQgLSAxKTtcclxuICAgICAgICBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvbkxvY2tDb3VudCA9IG5leHRDb3VudDtcclxuICAgICAgICBpZiAobmV4dENvdW50IDwgMSkge1xyXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9IGxvY2tXaW5kb3cuX19pbmRQYWdpbmF0aW9uUHJldk92ZXJmbG93IHx8IFwiXCI7XHJcbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvdWNoQWN0aW9uID0gbG9ja1dpbmRvdy5fX2luZFBhZ2luYXRpb25QcmV2VG91Y2hBY3Rpb24gfHwgXCJcIjtcclxuICAgICAgICAgIGRlbGV0ZSBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZPdmVyZmxvdztcclxuICAgICAgICAgIGRlbGV0ZSBsb2NrV2luZG93Ll9faW5kUGFnaW5hdGlvblByZXZUb3VjaEFjdGlvbjtcclxuICAgICAgICB9XHJcbiAgICAgIH07XHJcbiAgICB9LCBbc2hvd1BhZ2VTcGlubmVyXSk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdFBhZ2VDaGFuZ2UgPSAocGFnZTogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGlmIChwYWdlIDwgMSB8fCBwYWdlID4gc2FmZVRvdGFsKSByZXR1cm47XHJcbiAgICAgIGlmIChwYWdlID09PSBzYWZlQ3VycmVudCkgcmV0dXJuO1xyXG4gICAgICBpZiAoaGFzTG9hZGluZ1NpZ25hbCkge1xyXG4gICAgICAgIHNldElzUGFnZVRyYW5zaXRpb25QZW5kaW5nKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICAgIG9uUGFnZUNoYW5nZShwYWdlKTtcclxuICAgIH07XHJcblxyXG4gICAgaWYgKCFzaG93UGFnaW5hdGlvbikgcmV0dXJuIG51bGw7XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPD5cclxuICAgICAgICB7c2hvd1BhZ2VTcGlubmVyID8gKFxyXG4gICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNjAwMDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJnLXNsYXRlLTEwMFwiXHJcbiAgICAgICAgICAgIG9uV2hlZWw9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgPlxyXG4gICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC0xMCB3LTEwXCIgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIGlkPVwicGFnaW5hdGlvblwiXHJcbiAgICAgICAgICByZWY9e3JlZn1cclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgXCJwYWdpbmF0aW9uIGdyaWQgZ3JpZC1jb2xzLVsxZnJfYXV0b18xZnJdIGl0ZW1zLWNlbnRlciBnYXAtMVwiLFxyXG4gICAgICAgICAgICBjbGFzc05hbWUgfHwgXCJcIlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktc3RhcnRcIj5cclxuICAgICAgICAgICAge3Nob3dFZGdlTmF2ICYmIGNhbkp1bXBUb1N0YXJ0ICYmIChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8uZmlyc3R9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNMb2FkaW5nfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICByZXF1ZXN0UGFnZUNoYW5nZSgxKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTguNzUgNC41LTcuNSA3LjUgNy41IDcuNW0tNi0xNUw1LjI1IDEybDcuNSA3LjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5Hb1ByZXYgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5wcmV2fVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgLSAxKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJNMTUuNzUgMTkuNSA4LjI1IDEybDcuNS03LjVcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIG1pbi13LTAgZmxleC1ub3dyYXBcIj5cclxuICAgICAgICAgICAge3BhZ2VOdW1iZXJzLm1hcCgocGFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gcGFnZSA9PT0gc2FmZUN1cnJlbnQ7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAga2V5PXtgcGFnZS0ke3BhZ2V9YH1cclxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICBcIm1pbi13LVsyNnB4XSBweC0yIHB5LTAuNSByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgdGV4dC1bMTBweF0gZm9udC1zZW1pYm9sZCB0cmFuc2l0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmVcclxuICAgICAgICAgICAgICAgICAgICAgID8gXCJiZy1wcmltYXJ5IGJvcmRlci1wcmltYXJ5IHRleHQtd2hpdGUgc2hhZG93LXNtXCJcclxuICAgICAgICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMzAwIHRleHQtc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1wcmltYXJ5IGhvdmVyOnRleHQtcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzTG9hZGluZyA/IFwib3BhY2l0eS02MCBjdXJzb3Itbm90LWFsbG93ZWRcIiA6IFwiXCJcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2UocGFnZSk7XHJcbiAgICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtwYWdlfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGp1c3RpZnktZW5kXCI+XHJcbiAgICAgICAgICAgIHtzaG93RWRnZU5hdiAmJiBjYW5Hb05leHQgJiYgKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy03IGgtNyBwLTAgYm9yZGVyLTAgYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1wcmltYXJ5IHRyYW5zaXRpb25cIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWxzPy5uZXh0fVxyXG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzTG9hZGluZ31cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgcmVxdWVzdFBhZ2VDaGFuZ2Uoc2FmZUN1cnJlbnQgKyAxKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlV2lkdGg9XCIxLjVcIiBjbGFzc05hbWU9XCJ3LTUgaC01IG14LWF1dG9cIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtOC4yNSA0LjUgNy41IDcuNS03LjUgNy41XCIgLz5cclxuICAgICAgICAgICAgICAgIDwvc3ZnPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICB7c2hvd0VkZ2VOYXYgJiYgY2FuR29OZXh0ICYmIChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctNyBoLTcgcC0wIGJvcmRlci0wIGJnLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcHJpbWFyeSB0cmFuc2l0aW9uXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVscz8ubGFzdH1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc0xvYWRpbmd9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3RQYWdlQ2hhbmdlKHNhZmVUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZVdpZHRoPVwiMS41XCIgY2xhc3NOYW1lPVwidy01IGgtNSBteC1hdXRvXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTUuMjUgNC41IDcuNSA3LjUtNy41IDcuNW02LTE1IDcuNSA3LjUtNy41IDcuNVwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8Lz5cclxuICAgICk7XHJcbiAgfVxyXG4pO1xyXG5cclxuQ29tcGFjdFBhZ2luYXRpb24uZGlzcGxheU5hbWUgPSBcIkNvbXBhY3RQYWdpbmF0aW9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21wYWN0UGFnaW5hdGlvbjtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7QUFBQyxtQkFBeUM7QUFFMUMsSUFBTSx5QkFBeUI7QUFDL0IsSUFBTSwyQkFBMkI7QUFDakMsSUFBTSxvQkFBb0I7QUFDMUIsSUFBTSxtQkFBbUI7QUFDekIsSUFBTSxXQUFXO0FBQ2pCLElBQU0sWUFBWTtBQUNsQixJQUFNLGNBQWM7QUFDcEIsSUFBTSxlQUFlLENBQUMsMEJBQTBCLDBCQUEwQix3QkFBd0I7QUFxQmxHLElBQU0sb0JBQW9CLENBQUMsT0FBZSxrQkFBMkI7QUFDbkUsUUFBTSxNQUFNO0FBQ1osUUFBTSxNQUFNO0FBQ1osUUFBTSxXQUFXO0FBQ2pCLFFBQU0sU0FBUyxPQUFPLFNBQVMsT0FBTyxLQUFLLEdBQUcsRUFBRTtBQUVoRCxNQUFJLFVBQVUsT0FBTyxj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QWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsK0JBQThCLEdBQ3JGO0FBQUE7QUFBQSxjQUNGO0FBQUEsZUFFSjtBQUFBLFlBRUEsNkNBQUMsU0FBSSxXQUFVLDhEQUNaLHNCQUFZLElBQUksQ0FBQyxTQUFTO0FBQ3pCLG9CQUFNLFdBQVcsU0FBUztBQUMxQixxQkFDRTtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFFQyxNQUFLO0FBQUEsa0JBQ0wsVUFBVTtBQUFBLGtCQUNWLFdBQVc7QUFBQSxvQkFDVDtBQUFBLG9CQUNBLFdBQ0ksbURBQ0E7QUFBQSxvQkFDSixZQUFZLGtDQUFrQztBQUFBLGtCQUNoRDtBQUFBLGtCQUNBLFNBQVMsQ0FBQyxNQUFNO0FBQ2Qsc0JBQUUsZUFBZTtBQUNqQixzQ0FBa0IsSUFBSTtBQUFBLGtCQUN4QjtBQUFBLGtCQUVDO0FBQUE7QUFBQSxnQkFmSSxRQUFRLElBQUk7QUFBQSxjQWdCbkI7QUFBQSxZQUVKLENBQUMsR0FDSDtBQUFBLFlBRUEsOENBQUMsU0FBSSxXQUFVLHVDQUNaO0FBQUEsNkJBQWUsYUFDZDtBQUFBLGdCQUFDO0FBQUE7QUFBQSxrQkFDQyxNQUFLO0FBQUEsa0JBQ0wsV0FBVTtBQUFBLGtCQUNWLGNBQVksUUFBUTtBQUFBLGtCQUNwQixVQUFVO0FBQUEsa0JBQ1YsU0FBUyxDQUFDLE1BQU07QUFDZCxzQkFBRSxlQUFlO0FBQ2pCLHNDQUFrQixjQUFjLENBQUM7QUFBQSxrQkFDbkM7QUFBQSxrQkFFQSx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFZLE9BQU0sV0FBVSxtQkFDeEgsdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLDZCQUE0QixHQUNuRjtBQUFBO0FBQUEsY0FDRjtBQUFBLGNBRUQsZUFBZSxhQUNkO0FBQUEsZ0JBQUM7QUFBQTtBQUFBLGtCQUNDLE1BQUs7QUFBQSxrQkFDTCxXQUFVO0FBQUEsa0JBQ1YsY0FBWSxRQUFRO0FBQUEsa0JBQ3BCLFVBQVU7QUFBQSxrQkFDVixTQUFTLENBQUMsTUFBTTtBQUNkLHNCQUFFLGVBQWU7QUFDakIsc0NBQWtCLFNBQVM7QUFBQSxrQkFDN0I7QUFBQSxrQkFFQSx1REFBQyxTQUFJLE9BQU0sOEJBQTZCLFNBQVEsYUFBWSxNQUFLLFFBQU8sUUFBTyxnQkFBZSxhQUFZLE9BQU0sV0FBVSxtQkFDeEgsdURBQUMsVUFBSyxlQUFjLFNBQVEsZ0JBQWUsU0FBUSxHQUFFLGtEQUFpRCxHQUN4RztBQUFBO0FBQUEsY0FDRjtBQUFBLGVBRUo7QUFBQTtBQUFBO0FBQUEsTUFDRjtBQUFBLE9BQ0Y7QUFBQSxFQUVKO0FBQ0Y7QUFFQSxrQkFBa0IsY0FBYztBQUVoQyxJQUFPLDRCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfanN4X3J1bnRpbWUiXQp9Cg==
