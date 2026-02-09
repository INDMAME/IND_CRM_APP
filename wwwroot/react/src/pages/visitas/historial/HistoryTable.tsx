import React, { useEffect, useRef } from "react";
import { classNames } from "../../../utils/classNames.ts";

export type TimelineDateParts = {
  year: string;
  month: string;
  day: string;
};

export type TimelineItem = {
  id: string;
  actividadId?: string;
  recId?: number | null;
  name: string;
  description: string;
  fullName: string;
  fullDesc: string;
  dateParts: TimelineDateParts;
  isNoData: boolean;
};

type Props = {
  items: TimelineItem[];
  noDataText: string;
  errorMessage: string;
  onNavigate: (linkId: string) => void;
};

const TAP_MOVE_PX = 14;
const TOOLTIP_TOUCH_DELAY_MS = 120;
const HOLD_TO_PREVIEW_MS = 160;
const TOOLTIP_MAX_HEIGHT_RATIO = 0.8;
const TOOLTIP_BASE_FONT = 13;
const TOOLTIP_MIN_FONT = 11;
const ELLIPSIS = "...";
const PIXEL_GAP = 5;
const PIXEL_SPEED = 95;
const PIXEL_COLORS = ["rgba(0, 41, 107, 0.08)", "rgba(0, 41, 107, 0.16)", "rgba(0, 41, 107, 0.26)"];

type PixelState = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  pixels: Pixel[];
  animId: number | null;
  lastTime: number;
  reducedMotion: boolean;
  width: number;
  height: number;
};

// Compute pixel speed while respecting reduced motion preference.
const getEffectiveSpeed = (value: number, reducedMotion: boolean) => {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  const parsed = Number.parseInt(String(value), 10);

  if (parsed <= min || reducedMotion) return min;
  if (parsed >= max) return max * throttle;
  return parsed * throttle;
};

// Pixel used by the hover animation canvas.
class Pixel {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  sizeStep: number;
  minSize: number;
  maxSizeInteger: number;
  maxSize: number;
  phase: number;
  phaseStep: number;
  delay: number;
  counter: number;
  counterStep: number;
  isIdle: boolean;
  isReverse: boolean;
  isShimmer: boolean;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, x: number, y: number, color: string, speed: number, delay: number) {
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
  getRandomValue(min: number, max: number) {
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
}

// Create the pixel canvas hover effect for a timeline card.
const createPixelEffect = (cardEl: HTMLElement) => {
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
  const state: PixelState = {
    canvas,
    ctx,
    pixels: [],
    animId: null,
    lastTime: performance.now(),
    reducedMotion,
    width: 0,
    height: 0,
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
    const pixels: Pixel[] = [];

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

  const doAnimate = (fnName: "appear" | "disappear") => {
    state.animId = requestAnimationFrame(() => doAnimate(fnName));
    const timeNow = performance.now();
    const timePassed = timeNow - state.lastTime;
    const timeInterval = 1000 / 60;

    if (timePassed < timeInterval) return;
    state.lastTime = timeNow - (timePassed % timeInterval);

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

  const handleAnimation = (name: "appear" | "disappear") => {
    if (!state.pixels.length) return;
    if (state.animId) cancelAnimationFrame(state.animId);
    state.lastTime = performance.now();
    state.animId = requestAnimationFrame(() => doAnimate(name));
  };

  const onEnter = () => handleAnimation("appear");
  const onLeave = () => handleAnimation("disappear");

  cardEl.addEventListener("mouseenter", onEnter);
  cardEl.addEventListener("mouseleave", onLeave);

  let ro: ResizeObserver | null = null;
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

// Shorten overflowing text with a computed ellipsis.
const applyEllipsis = (el: HTMLElement, fullText: string, multiLine: boolean) => {
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

  const isOverflowing = () => (
    multiLine
      ? el.scrollHeight > el.clientHeight + 1
      : el.scrollWidth > el.clientWidth + 1
  );

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

// Use pointer movement to avoid accidental taps on scroll.
const bindTapGuard = (el: HTMLElement, onTap: (event: PointerEvent) => void) => {
  if (!el) return () => undefined;
  let active = false;
  let pointerId: number | null = null;
  let startX = 0;
  let startY = 0;
  let startTime = 0;
  let moved = false;

  const reset = () => {
    active = false;
    pointerId = null;
    moved = false;
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    active = true;
    pointerId = e.pointerId;
    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
    moved = false;
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!active || e.pointerId !== pointerId) return;
    const dx = Math.abs(e.clientX - startX);
    const dy = Math.abs(e.clientY - startY);
    if (dx > TAP_MOVE_PX || dy > TAP_MOVE_PX) moved = true;
  };

  const onPointerUp = (e: PointerEvent) => {
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

// Prevent long-press selection and copy on cards.
const blockCopyActions = (el: HTMLElement) => {
  if (!el) return () => undefined;
  const cancel = (event: Event) => event.preventDefault();
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

const HistoryTable = ({ items, noDataText, errorMessage, onNavigate }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const tooltipAnchorRef = useRef<HTMLElement | null>(null);
  const tooltipCloseBoundRef = useRef(false);

  // Ensure the shared tooltip element exists once.
  useEffect(() => {
    if (tooltipRef.current) return;
    let tooltip = document.getElementById("timelineTooltip") as HTMLDivElement | null;
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "timelineTooltip";
      tooltip.className = "timeline-tooltip";
      document.body.appendChild(tooltip);
    }
    tooltipRef.current = tooltip;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const tooltipEl = tooltipRef.current;
    if (!container || !tooltipEl) return;

    const cleanups: Array<() => void> = [];

    // Close tooltip on outside interaction.
    if (!tooltipCloseBoundRef.current) {
      tooltipCloseBoundRef.current = true;
      const onPointerDown = (event: PointerEvent) => {
        if (!tooltipEl.classList.contains("visible")) return;
        const anchor = tooltipAnchorRef.current;
        if (anchor && anchor.contains(event.target as Node)) return;
        tooltipEl.classList.remove("visible");
        tooltipAnchorRef.current = null;
      };
      const onKeyDown = (event: KeyboardEvent) => {
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

    // Show tooltip content centered on screen.
    const showTooltip = (text: string, anchor?: HTMLElement) => {
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

    // Hide tooltip content.
    const hideTooltip = () => {
      tooltipEl.classList.remove("visible");
      tooltipAnchorRef.current = null;
    };

    // Decide if a tooltip should display.
    const shouldPreview = (el: HTMLElement) => {
      if (!el.dataset || !el.dataset.fulltext) return false;
      if (el.dataset.preview === "1") return true;
      return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
    };

    // Bind tooltip interactions for a text node.
    const bindTooltip = (el: HTMLElement, text: string) => {
      if (!text) return () => undefined;
      let pressTimer: number | undefined;

      const onMouseEnter = (event: MouseEvent) => {
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
      const onTouchStart = (event: TouchEvent) => {
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

    const cards = container.querySelectorAll<HTMLElement>(".timeline-card");
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
      const nameEls = container.querySelectorAll<HTMLElement>(".timeline-name");
      nameEls.forEach((el) => {
        const text = el.dataset.fulltext || el.textContent || "";
        applyEllipsis(el, text, true);
        cleanups.push(bindTooltip(el, text));
      });

      const descEls = container.querySelectorAll<HTMLElement>(".timeline-desc-text");
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

  const content = errorMessage ? (
    <div className="text-danger">{errorMessage}</div>
  ) : hasItems ? (
    items.map((item, index) => {
      const key = item.id || item.recId?.toString() || `timeline-${index}`;
      const isClickable = !item.isNoData && !!item.id;
      return (
        <div key={key} className="timeline-item">
          <div
            className={classNames(
              "timeline-card",
              item.isNoData ? "timeline-card--nodata" : "",
              isClickable ? "timeline-card--clickable" : ""
            )}
            data-actividadid={item.actividadId || ""}
            data-recid={item.recId != null ? String(item.recId) : ""}
            data-link-id={isClickable ? item.id : ""}
          >
            <div className="timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600">
              <div className="text-xs font-semibold tracking-[0.2em] text-slate-500">{item.dateParts.year}</div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{item.dateParts.month}</div>
              <div className="text-2xl font-semibold text-primary">{item.dateParts.day}</div>
            </div>
            <div className="timeline-card__content flex-1 py-3 px-4">
              <div className="timeline-name" data-fulltext={item.fullName || item.name}>{item.name}</div>
              <p className="timeline-desc-text" data-fulltext={item.fullDesc || item.description}>{item.description || noDataText}</p>
            </div>
          </div>
        </div>
      );
    })
  ) : null;

  return (
    <div
      id="timelineContainer"
      ref={containerRef}
      className={classNames("timeline-box", showEmpty ? "timeline-empty" : "")}
      data-empty-text={noDataText}
    >
      {content}
    </div>
  );
};

export default HistoryTable;
