# Pixel Hover (Standard Card) and Typing Effect (Text Editor)

## Scope and hierarchy
- Scope: hover pixel effect and transcription typing effect.
- If conflict: system > `.codex/AGENTS.md` > this doc.
- Source of truth: the app code. If code and doc differ, update the doc.

This document captures the standard hover pixel effect and the typing effect
used after speech transcription. Use this as the default pattern for any
new card or text editor that needs the same behavior.

Snippets below are references and must be verified against the codebase.

---

## Pixel hover (canvas) - full JS

Use this block as-is. It creates a canvas overlay and animates small pixels on
hover. It also handles resize and cleanup.

```js
const PIXEL_GAP = 5;
const PIXEL_SPEED = 60;
const PIXEL_COLORS = ["rgba(0, 41, 107, 0.08)", "rgba(0, 41, 107, 0.16)", "rgba(0, 41, 107, 0.26)"];

function getEffectiveSpeed(value, reducedMotion) {
    const min = 0;
    const max = 100;
    const throttle = 0.001;
    const parsed = parseInt(value, 10);

    if (parsed <= min || reducedMotion) return min;
    if (parsed >= max) return max * throttle;
    return parsed * throttle;
}

class Pixel {
    constructor(canvas, context, x, y, color, speed, delay) {
        this.width = canvas.width;
        this.height = canvas.height;
        this.ctx = context;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = this.getRandomValue(0.1, 0.9) * speed;
        this.size = 0;
        this.sizeStep = Math.random() * 0.4;
        this.minSize = 0.5;
        this.maxSizeInteger = 2;
        this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
        this.delay = delay;
        this.counter = 0;
        this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
        this.isIdle = false;
        this.isReverse = false;
        this.isShimmer = false;
    }

    getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }

    draw() {
        const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
    }

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

    shimmer() {
        if (this.size >= this.maxSize) {
            this.isReverse = true;
        } else if (this.size <= this.minSize) {
            this.isReverse = false;
        }
        if (this.isReverse) {
            this.size -= this.speed;
        } else {
            this.size += this.speed;
        }
    }
}

function createPixelEffect(cardEl) {
    if (!cardEl) return null;
    const canvas = document.createElement("canvas");
    canvas.className = "timeline-pixel-canvas";
    cardEl.appendChild(canvas);

    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = {
        canvas,
        ctx: canvas.getContext("2d"),
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
        if (!width || !height || !state.ctx) return;

        state.width = width;
        state.height = height;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const colors = PIXEL_COLORS;
        const gap = Math.max(3, parseInt(PIXEL_GAP, 10));
        const speed = getEffectiveSpeed(PIXEL_SPEED, reducedMotion);
        const pxs = [];

        for (let x = 0; x < width; x += gap) {
            for (let y = 0; y < height; y += gap) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                const dx = x - width / 2;
                const dy = y - height / 2;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const delay = reducedMotion ? 0 : distance;
                pxs.push(new Pixel(canvas, state.ctx, x, y, color, speed, delay));
            }
        }

        state.pixels = pxs;
    };

    const doAnimate = (fnName) => {
        state.animId = requestAnimationFrame(() => doAnimate(fnName));
        const timeNow = performance.now();
        const timePassed = timeNow - state.lastTime;
        const timeInterval = 1000 / 60;

        if (timePassed < timeInterval) return;
        state.lastTime = timeNow - (timePassed % timeInterval);

        const ctx = state.ctx;
        if (!ctx) return;
        ctx.clearRect(0, 0, state.width, state.height);

        let allIdle = true;
        for (let i = 0; i < state.pixels.length; i++) {
            const pixel = state.pixels[i];
            pixel[fnName]();
            if (!pixel.isIdle) allIdle = false;
        }
        if (allIdle) {
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
    };
}

function cleanupPixelEffects(container) {
    if (!container) return;
    const cards = container.querySelectorAll(".timeline-card");
    cards.forEach(card => {
        if (card && typeof card.__pixelCleanup === "function") {
            card.__pixelCleanup();
        }
    });
}
```

### How to apply to any card

1) Ensure the card is `position: relative` and `overflow: hidden`.
2) Call `createPixelEffect(cardEl)` after the card is in the DOM:

```js
const cleanup = createPixelEffect(cardEl);
if (cleanup) cardEl.__pixelCleanup = cleanup;
```

3) If you rebuild the list (clear and re-render), call cleanup first:

```js
cleanupPixelEffects(containerEl);
containerEl.innerHTML = "";
```

---

## Pixel hover - CSS

This is the required CSS so the canvas shows over the full card (including
the date panel) and the content stays above it.

```css
.timeline-card {
    position: relative;
    overflow: hidden;
}

.timeline-card__content,
.timeline-date-panel { position: relative; z-index: 3; }

.timeline-date-panel {
    background: rgba(248, 250, 252, 0.55);
}

.timeline-pixel-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
}
```

---

## Typing effect for speech transcription - full JS

Use this block as-is. It types the transcription into the textarea. It also
disables editing while typing and auto-scrolls.

```js
const TYPE_INTERVAL_MS = 28;
const TYPE_TARGET_MS = 4200;
const TYPE_MIN_STEP = 1;
const TYPE_MAX_STEP = 4;

const [isTyping, setIsTyping] = useState(false);
const typingTimerRef = useRef(null);
const typingTextRef = useRef("");
const typingIndexRef = useRef(0);
const textareaRef = useRef(null);

const stopTyping = useCallback(() => {
    if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
    }
    typingTextRef.current = "";
    typingIndexRef.current = 0;
    setIsTyping(false);
}, []);

const startTyping = useCallback(
    (fullText) => {
        const textValue = String(fullText || "");
        stopTyping();
        if (!textValue) {
            setText("");
            return;
        }

        typingTextRef.current = textValue;
        typingIndexRef.current = 0;
        setIsTyping(true);
        setText("");

        const total = textValue.length;
        const maxSteps = Math.max(1, Math.floor(TYPE_TARGET_MS / TYPE_INTERVAL_MS));
        const stepSize = Math.min(TYPE_MAX_STEP, Math.max(TYPE_MIN_STEP, Math.ceil(total / maxSteps)));

        const tick = () => {
            const next = Math.min(typingIndexRef.current + stepSize, total);
            typingIndexRef.current = next;
            setText(typingTextRef.current.slice(0, next));
            if (next < total) {
                typingTimerRef.current = setTimeout(tick, TYPE_INTERVAL_MS);
            } else {
                typingTimerRef.current = null;
                setIsTyping(false);
            }
        };

        typingTimerRef.current = setTimeout(tick, TYPE_INTERVAL_MS);
    },
    [stopTyping]
);

useEffect(() => stopTyping, [stopTyping]);

useEffect(() => {
    if (!isTyping) return;
    const el = textareaRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
}, [isTyping, text]);
```

### How to apply the typing effect in a transcription flow

Use `startTyping(transcript)` after a successful transcription:

```js
const transcript = payload && typeof payload.data === "string" ? payload.data : "";
if (!transcript.trim()) {
    setTranscribeError("Transcribe failed.");
    return;
}
startTyping(transcript);
```

Disable user input while typing:

```jsx
<textarea
  ref={textareaRef}
  value={text}
  onChange={(e) => setText(e.target.value)}
  disabled={isTranscribing || isTyping}
  readOnly={isReadOnly || isTranscribing || isTyping}
/>
```

Also block microphone toggle while typing:

```js
if (isReadOnly || isTranscribing || isTyping) return;
```

## Last updated
- 2026-01-21

