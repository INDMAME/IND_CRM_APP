document.addEventListener("DOMContentLoaded", () => {

    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");

    const filterCacheKey = "visitas_history_filter_v1";
    const returnFlagKey = "visitas_history_return_v1";
    const IND_I18N = (window && window.__IND_I18N__) ? window.__IND_I18N__ : {};
    const indT = (key, fallback) => (IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key]) || fallback || key;
    const MODULE_ACCESS = (window && window.__IND_MODULE_ACCESS__) ? window.__IND_MODULE_ACCESS__ : {};
    const ACCESS_RIGHTS = { View: 1, Edit: 2, Add: 3, FullAccess: 4 };
    const getModuleAccess = (code) => Number(MODULE_ACCESS && MODULE_ACCESS[code] != null ? MODULE_ACCESS[code] : 0);
    const canViewHistory = getModuleAccess("VISITAS_HISTORIAL") >= ACCESS_RIGHTS.View;
    const showPermissionModal = () => {
        if (window.IND && typeof window.IND.showPermissionModal === "function") {
            window.IND.showPermissionModal();
            return;
        }
        alert(indT("Auth_PermissionDenied_Body", "No tienes permisos para realizar esta accion."));
    };
    let hasRestoredFilter = false;
    let retryOnNetworkError = false;
    let initialPage = 1;
    const clearFilterCache = () => {
        try {
            sessionStorage.removeItem(filterCacheKey);
        } catch {
            // ignore cache errors
        }
    };
    const readCachedFilter = () => {
        try {
            const raw = sessionStorage.getItem(filterCacheKey);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== "object") return null;
            return {
                fromDate: parsed.fromDate || "",
                toDate: parsed.toDate || "",
                page: parsed.page
            };
        } catch {
            return null;
        }
    };
    const consumeReturnFlag = () => {
        try {
            const raw = sessionStorage.getItem(returnFlagKey);
            if (raw === "1") {
                sessionStorage.removeItem(returnFlagKey);
                return true;
            }
        } catch {
            // ignore cache errors
        }
        return false;
    };
    const cachedFilter = consumeReturnFlag() ? readCachedFilter() : null;
    if (cachedFilter && cachedFilter.fromDate && cachedFilter.toDate) {
        fromDate.value = cachedFilter.fromDate;
        toDate.value = cachedFilter.toDate;
        const pageVal = Number(cachedFilter.page);
        if (Number.isFinite(pageVal) && pageVal > 0) initialPage = pageVal;
        hasRestoredFilter = true;
        retryOnNetworkError = true;
    } else {
        clearFilterCache();
        fromDate.value = "";
        toDate.value = "";
    }

    const drpActivator = document.getElementById("drpActivator");
    const drpPopover = document.getElementById("drpPopover");
    const drpGrid = document.getElementById("drpGrid");
    const drpMonthLabel = document.getElementById("drpMonthLabel");
    const drpStartValue = document.getElementById("drpStartValue");
    const drpEndValue = document.getElementById("drpEndValue");
    const drpClear = document.getElementById("drpClear");
    const drpStatus = document.getElementById("drpStatus");
    const drpSections = document.querySelectorAll(".drp-section");

    const timeline = document.getElementById("timelineContainer");
    const loader = document.getElementById("resultsLoader");
    const pagination = document.getElementById("pagination");

    const setTimelineEmptyText = () => {
        if (!timeline) return;
        timeline.dataset.emptyText = indT("History_NoDataInRange", "No visits in this range");
    };
    setTimelineEmptyText();

    let currentPage = 1;
    const pageSize = 5;
    let debugLogged = 0;
    let activeRequestId = 0;
    let activeAbort = null;
    let retryTimer = null;

    // --------------------------
    // Date Range Picker (custom)
    // --------------------------
    const pad = (n) => n.toString().padStart(2, "0");
    const normalizeUiLocale = (locale) => {
        const value = String(locale || "").trim();
        if (!value) return "es-ES";
        if (/^zh-hans/i.test(value)) return "zh-CN";
        return value;
    };
    const isBasqueLocale = (locale) => /^eu\b/i.test(String(locale || ""));
    const BASQUE_MONTHS = [
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
    const BASQUE_MONTHS_SHORT = [
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
    const getUiLocale = () => {
        const fromHtml = document?.documentElement?.lang;
        if (fromHtml && String(fromHtml).trim()) return normalizeUiLocale(fromHtml);
        return "es-ES";
    };
    const parseISO = (s) => {
        if (!s) return null;
        const [y, m, d] = s.split("-").map(Number);
        return new Date(y, m - 1, d);
    };

    let startDate = parseISO(fromDate.value);
    let endDate = parseISO(toDate.value);
    let hoverDate = null;
    let selectingStep = startDate ? "end" : "start";
    let currentMonth = startDate ? startDate.getMonth() : new Date().getMonth();
    let currentYear = startDate ? startDate.getFullYear() : new Date().getFullYear();
    let isOpen = false;

    const sameDay = (a, b) => a && b && a.getTime() === b.getTime();
    const isBefore = (a, b) => a && b && a.getTime() < b.getTime();
    const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

    const formatDisplay = (d) => {
        const locale = getUiLocale();
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

    function syncInputs() {
        fromDate.value = startDate ? toISO(startDate) : "";
        toDate.value = endDate ? toISO(endDate) : "";
    }

    function syncLabels() {
        drpStartValue.textContent = startDate ? formatDisplay(startDate) : indT("History_AddDate", "Add date");
        drpEndValue.textContent = endDate ? formatDisplay(endDate) : indT("History_AddDate", "Add date");
        drpClear.style.display = (startDate || endDate) ? "inline-flex" : "none";
        drpSections.forEach(sec => {
            const section = sec.dataset.section;
            sec.classList.toggle("active", selectingStep === section && isOpen);
        });

        if (drpStatus) {
            drpStatus.textContent =
                selectingStep === "start"
                    ? indT("History_Status_SelectStart", "Select start date")
                    : endDate || hoverDate
                        ? indT("History_Status_SelectEnd", "Select end date")
                        : indT("History_Status_SelectEnd", "Select end date");
        }
    }

    function openPopover(section = "start") {
        selectingStep = section;
        if (!drpPopover) return;
        isOpen = true;
        drpPopover.hidden = false;
        buildCalendar();
        document.addEventListener("mousedown", handleClickOutside);
    }

    function closePopover() {
        if (drpPopover) drpPopover.hidden = true;
        hoverDate = null;
        isOpen = false;
        document.removeEventListener("mousedown", handleClickOutside);
    }

    function handleClickOutside(e) {
        if (!drpPopover || drpPopover.hidden) return;
        if (!drpPopover.contains(e.target) && !drpActivator.contains(e.target)) {
            closePopover();
        }
    }

    function handleSelect(dateObj) {
        if (selectingStep === "start") {
            startDate = dateObj;
            endDate = null;
            selectingStep = "end";
            currentMonth = dateObj.getMonth();
            currentYear = dateObj.getFullYear();
        } else {
            if (startDate && isBefore(dateObj, startDate)) {
                startDate = dateObj;
                endDate = null;
                selectingStep = "end";
                currentMonth = dateObj.getMonth();
                currentYear = dateObj.getFullYear();
            } else {
                endDate = dateObj;
                selectingStep = "done";
                syncInputs();
                loadActivities(1);
                setTimeout(() => closePopover(), 120);
            }
        }

        syncInputs();
        syncLabels();
        buildCalendar();
    }

    function buildCalendar() {
        if (!drpGrid) return;

        const firstDay = new Date(currentYear, currentMonth, 1);
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const offset = (firstDay.getDay() + 6) % 7; // lunes como 0

        const locale = getUiLocale();
        if (/^zh/i.test(locale)) {
            drpMonthLabel.textContent = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long" }).format(firstDay);
        } else if (isBasqueLocale(locale)) {
            drpMonthLabel.textContent = `${BASQUE_MONTHS[currentMonth]} ${currentYear}`;
        } else {
            const monthName = firstDay.toLocaleDateString(locale, { month: "long" });
            const capMonthName = (monthName && monthName.length && /[A-Za-z]/.test(monthName[0]))
                ? monthName[0].toLocaleUpperCase(locale) + monthName.slice(1)
                : monthName;
            drpMonthLabel.textContent = `${capMonthName} ${currentYear}`;
        }

        let html = "";
        for (let i = 0; i < offset; i++) html += `<button class="drp-day empty" disabled></button>`;

        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(currentYear, currentMonth, d);
            const iso = toISO(dateObj);
            html += `<button class="drp-day" data-date="${iso}">${d}</button>`;
        }

        drpGrid.innerHTML = html;

        drpGrid.querySelectorAll(".drp-day").forEach(btn => {
            if (btn.classList.contains("empty")) return;
            btn.onclick = () => handleSelect(new Date(btn.dataset.date));
            btn.onmouseenter = () => {
                if (selectingStep === "end" && startDate) {
                    hoverDate = new Date(btn.dataset.date);
                    applyDayStyles();
                }
            };
        });

        drpGrid.onmouseleave = () => { hoverDate = null; applyDayStyles(); };
        applyDayStyles();
    }

    function applyDayStyles() {
        if (!drpGrid) return;
        const previewEnd = endDate || (selectingStep === "end" ? hoverDate : null);

        drpGrid.querySelectorAll(".drp-day").forEach(btn => {
            if (btn.classList.contains("empty")) return;
            const dateObj = new Date(btn.dataset.date);
            const isStart = startDate && sameDay(dateObj, startDate);
            const isEnd = endDate && sameDay(dateObj, endDate);
            const inRange = startDate && previewEnd && isBefore(startDate, dateObj) && isBefore(dateObj, previewEnd);
            const hoverRange = startDate && !endDate && hoverDate && isBefore(startDate, dateObj) && isBefore(dateObj, hoverDate);
            const disabled = selectingStep === "end" && startDate && isBefore(dateObj, startDate);

            btn.className = "drp-day";
            if (isStart) btn.classList.add("start", "range-start");
            if (isEnd) btn.classList.add("end", "range-end");
            if (inRange) btn.classList.add("in-range");
            if (hoverRange) btn.classList.add("hover-range");
            if (disabled) btn.classList.add("disabled");
            if (sameDay(dateObj, new Date())) btn.classList.add("today");
            btn.disabled = disabled;
        });
    }

    // Activator & controls
    if (drpActivator) {
        drpActivator.addEventListener("click", () => openPopover("start"));
        drpSections.forEach(sec => {
            sec.addEventListener("click", (e) => {
                e.stopPropagation();
                const section = sec.dataset.section || "start";
                openPopover(section === "end" && !startDate ? "start" : section);
            });
        });
    }

    if (drpClear) {
        drpClear.addEventListener("click", (e) => {
            e.stopPropagation();
            startDate = null;
            endDate = null;
            selectingStep = "start";
            hoverDate = null;
            syncInputs();
            syncLabels();
            buildCalendar();
            closePopover();
            loader.style.display = "none";
            timeline.innerHTML = "";
            timeline.classList.add("timeline-empty");
            pagination.innerHTML = "";
            try {
                sessionStorage.removeItem(filterCacheKey);
            } catch {
                // ignore cache errors
            }
        });
    }

    if (drpPopover) {
        drpPopover.addEventListener("click", (e) => {
            const dir = e.target.closest?.("[data-dir]")?.dataset.dir;
            if (!dir) return;
            const inc = dir === "next" ? 1 : -1;
            currentMonth += inc;
            if (currentMonth > 11) { currentMonth = 0; currentYear++; }
            else if (currentMonth < 0) { currentMonth = 11; currentYear--; }
            buildCalendar();
        });
    }

    syncInputs();
    syncLabels();
    buildCalendar();

    if (fromDate.value && toDate.value) {
        loadActivities(initialPage);
    }

    const getCsrfToken = () => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        return meta ? meta.getAttribute("content") : "";
    };

    async function fetchWithCsrf(url, options) {
        const token = getCsrfToken();
        const headers = { ...(options?.headers || {}) };
        if (token) headers.RequestVerificationToken = token;
        const merged = { credentials: "same-origin", ...options, headers };
        return fetch(url, merged);
    }

    function renderTimelineError(message) {
        if (!timeline) return;
        timeline.innerHTML = "";
        const div = document.createElement("div");
        div.className = "text-danger";
        div.textContent = message;
        timeline.appendChild(div);
    }

    // Loads activity list from MVC endpoint Historial/GetActivities
    async function loadActivities(page = 1) {

        if (!fromDate.value || !toDate.value) {
            loader.style.display = "none";
            timeline.innerHTML = "";
            timeline.classList.add("timeline-empty");
            pagination.innerHTML = "";
            return;
        }

        currentPage = page;

        if (retryTimer) {
            clearTimeout(retryTimer);
            retryTimer = null;
        }

        const requestId = ++activeRequestId;
        if (activeAbort) {
            try {
                activeAbort.abort();
            } catch {
                // ignore abort errors
            }
        }
        const controller = new AbortController();
        activeAbort = controller;
        const filterSignature = `${fromDate.value}|${toDate.value}|${page}`;

        loader.style.display = "block";
        timeline.innerHTML = "";
        pagination.innerHTML = "";

        const payload = {
            fromDate: fromDate.value,
            toDate: toDate.value
        };

        let response;
        try {
            response = await fetchWithCsrf(`/Historial/GetActivities?page=${page}&pageSize=${pageSize}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                signal: controller.signal
            });
        } catch (err) {
            if (requestId !== activeRequestId) return;
            if (err && err.name === "AbortError") {
                activeAbort = null;
                return;
            }
            console.error("Historial fetch error:", err);
            if (retryOnNetworkError) {
                retryOnNetworkError = false;
                activeAbort = null;
                retryTimer = setTimeout(() => {
                    if (requestId !== activeRequestId) return;
                    const currentSignature = `${fromDate.value}|${toDate.value}|${page}`;
                    if (currentSignature !== filterSignature) return;
                    loadActivities(page);
                }, 600);
                return;
            }
            loader.style.display = "none";
            renderTimelineError(indT("Api_RequestFailed", "No se pudo conectar con el servidor (red)."));
            activeAbort = null;
            return;
        }

        if (requestId !== activeRequestId) return;

        if (response.status === 403) {
            loader.style.display = "none";
            showPermissionModal();
            activeAbort = null;
            return;
        }

        if (!response.ok) {
            const statusText = response.statusText || "Error del servidor";
            console.error("Historial fetch failed", response.status, statusText);
            loader.style.display = "none";
            renderTimelineError(`${response.status} - ${statusText}. Verifica el backend.`);
            activeAbort = null;
            return;
        }

        const raw = await response.text();
        let data;

        try {
            data = JSON.parse(raw);
        } catch {
            loader.style.display = "none";
            renderTimelineError(indT("Api_InvalidJson", "Error procesando datos"));
            activeAbort = null;
            return;
        }

        if (requestId !== activeRequestId) return;

        loader.style.display = "none";

        const items = data.items || [];
        renderTimeline(items);
        renderPagination(data.total || items.length);
        activeAbort = null;
    }

    const shorten = (text, max) => {
        if (!text) return "";
        if (text.length <= max) return text;
        return text.slice(0, Math.max(0, max - 3)) + "...";
    };

    const TAP_MOVE_PX = 14;
    const NAV_DELAY_MS = 320;
    const TOOLTIP_TOUCH_DELAY_MS = 120;
    const HOLD_TO_PREVIEW_MS = 160;
    const TOOLTIP_MAX_HEIGHT_RATIO = 0.8;
    const TOOLTIP_BASE_FONT = 13;
    const TOOLTIP_MIN_FONT = 11;
    const ELLIPSIS = "...";
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

    // Only trigger tap actions when the pointer did not move beyond the threshold.
    function bindTapGuard(el, onTap) {
        if (!el) return;
        let active = false;
        let pointerId = null;
        let startX = 0;
        let startY = 0;
        let startTime = 0;
        let moved = false;

        const reset = () => {
            active = false;
            pointerId = null;
            moved = false;
        };

        el.addEventListener("pointerdown", (e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            active = true;
            pointerId = e.pointerId;
            startX = e.clientX;
            startY = e.clientY;
            startTime = Date.now();
            moved = false;
        }, { passive: true });

        el.addEventListener("pointermove", (e) => {
            if (!active || e.pointerId !== pointerId) return;
            const dx = Math.abs(e.clientX - startX);
            const dy = Math.abs(e.clientY - startY);
            if (dx > TAP_MOVE_PX || dy > TAP_MOVE_PX) moved = true;
        }, { passive: true });

        el.addEventListener("pointerup", (e) => {
            if (!active || e.pointerId !== pointerId) return;
            const heldMs = Date.now() - startTime;
            const shouldTap = !moved && heldMs < HOLD_TO_PREVIEW_MS;
            reset();
            if (shouldTap) onTap(e);
        }, { passive: true });

        el.addEventListener("pointercancel", reset, { passive: true });
        el.addEventListener("pointerleave", reset, { passive: true });
    }

    // Prevent long-press selection/copy on history cards.
    function blockCopyActions(el) {
        if (!el) return;
        const cancel = (e) => e.preventDefault();
        el.addEventListener("contextmenu", cancel);
        el.addEventListener("selectstart", cancel);
        el.addEventListener("copy", cancel);
        el.addEventListener("cut", cancel);
        el.addEventListener("paste", cancel);
    }

    function applyEllipsis(el, fullText, multiLine) {
        if (!el || !fullText) return false;
        if (multiLine && el.clientHeight === 0) return false;
        if (!multiLine && el.clientWidth === 0) return false;

        if (multiLine) {
            const computed = window.getComputedStyle(el);
            let lineHeight = parseFloat(computed.lineHeight);
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
    }

    // Renders activity timeline cards
    function renderTimeline(items) {
        cleanupPixelEffects(timeline);
        timeline.innerHTML = "";
        timeline.classList.remove("timeline-empty");
        setTimelineEmptyText();

        if (!items || items.length === 0) {
            timeline.classList.add("timeline-empty");
            return;
        }

        items.forEach(x => {
            const actividadIdRaw = (x.actividadId ?? x.ActividadId ?? "").toString().trim();
            const actividadId = actividadIdRaw || "";
            const recIdRaw = x.recId ?? x.RecId ?? "";
            const recId = recIdRaw && !isNaN(Number(recIdRaw)) ? Number(recIdRaw) : null;
            let linkId = actividadId || (recId ? recId.toString() : "");
            if (debugLogged < 5) {
                console.debug("activity item", { actividadId, recIdRaw, recId, raw: x });
                debugLogged++;
            }

            const rawName = (x.name ?? x.Name ?? "").toString().trim();
            const fullName = toTitleCase(rawName);
            const fecha = x.transDate ?? x.TransDate ?? "";
            const rawDesc = (x.description ?? x.Description ?? "").toString().trim();
            const fullDesc = rawDesc;

            // Do not allow navigation for placeholder cards with no data.
            const isNoDataCard = !rawName && !rawDesc;
            if (isNoDataCard) {
                linkId = "";
            }
            const fechaParts = formatDateParts(fecha);

            const noDataText = indT("Common_NoData", "No data");

            const itemEl = document.createElement("div");
            itemEl.className = "timeline-item";

            const cardEl = document.createElement("div");
            cardEl.className = [
                "timeline-card",
                isNoDataCard ? "timeline-card--nodata" : "",
                linkId ? "timeline-card--clickable" : ""
            ].filter(Boolean).join(" ");
            cardEl.dataset.actividadid = actividadId;
            cardEl.dataset.recid = recId ?? "";

            if (!isNoDataCard) {
                const cleanup = createPixelEffect(cardEl);
                if (cleanup) cardEl.__pixelCleanup = cleanup;
            }

            const datePanel = document.createElement("div");
            datePanel.className = "timeline-date-panel flex flex-col items-center justify-center gap-1 px-3 py-3 bg-slate-50 border-r border-slate-200 text-slate-600";

            const yearEl = document.createElement("div");
            yearEl.className = "text-xs font-semibold tracking-[0.2em] text-slate-500";
            yearEl.textContent = fechaParts.year || "";

            const monthEl = document.createElement("div");
            monthEl.className = "text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500";
            monthEl.textContent = fechaParts.month || "";

            const dayEl = document.createElement("div");
            dayEl.className = "text-2xl font-semibold text-primary";
            dayEl.textContent = fechaParts.day || "";

            datePanel.appendChild(yearEl);
            datePanel.appendChild(monthEl);
            datePanel.appendChild(dayEl);

            const contentEl = document.createElement("div");
            contentEl.className = "timeline-card__content flex-1 py-3 px-4";

            const nameEl = document.createElement("div");
            nameEl.className = "timeline-name";
            nameEl.textContent = fullName;

            const descEl = document.createElement("p");
            descEl.className = "timeline-desc-text";
            descEl.textContent = fullDesc || noDataText;

            contentEl.appendChild(nameEl);
            contentEl.appendChild(descEl);
            cardEl.appendChild(datePanel);
            cardEl.appendChild(contentEl);
            itemEl.appendChild(cardEl);
            timeline.appendChild(itemEl);

            if (fullName) {
                nameEl.dataset.fulltext = fullName;
                bindTooltip(nameEl, fullName);
            }
            if (fullDesc) {
                descEl.dataset.fulltext = fullDesc;
                bindTooltip(descEl, fullDesc);
            }

            if (linkId) {
                const navigate = () => {
                    if (!canViewHistory) {
                        showPermissionModal();
                        return;
                    }
                    setTimeout(() => {
                        try {
                            sessionStorage.setItem(
                                filterCacheKey,
                                JSON.stringify({
                                    fromDate: fromDate.value || "",
                                    toDate: toDate.value || "",
                                    page: currentPage
                                })
                            );
                            sessionStorage.setItem(returnFlagKey, "1");
                        } catch {
                            // ignore cache errors
                        }
                        const target = encodeURIComponent(linkId);
                        window.location.href = `/Visitas/Detalle/${target}`;
                    }, NAV_DELAY_MS); // Small delay to avoid accidental taps.
                };
                bindTapGuard(cardEl, navigate);
                blockCopyActions(cardEl);
            }
        });

        requestAnimationFrame(() => {
            const nameEls = timeline.querySelectorAll(".timeline-name");
            nameEls.forEach((el) => applyEllipsis(el, el.dataset.fulltext || el.textContent, true));
            const descEls = timeline.querySelectorAll(".timeline-desc-text");
            descEls.forEach((el) => applyEllipsis(el, el.dataset.fulltext || el.textContent, true));
        });
    }

    // Tooltip para textos largos
    let tooltipEl = document.getElementById("timelineTooltip");
    if (!tooltipEl) {
        tooltipEl = document.createElement("div");
        tooltipEl.id = "timelineTooltip";
        tooltipEl.className = "timeline-tooltip";
        document.body.appendChild(tooltipEl);
    }
    let tooltipAnchor = null;
    let tooltipCloseBound = false;

    function ensureTooltipAutoClose() {
        if (tooltipCloseBound) return;
        tooltipCloseBound = true;
        document.addEventListener("pointerdown", (e) => {
            if (!tooltipEl.classList.contains("visible")) return;
            if (tooltipAnchor && tooltipAnchor.contains(e.target)) return;
            hideTooltip();
        }, true);
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") hideTooltip();
        });
    }

    function showTooltip(text, clientX, clientY, anchor) {
        tooltipEl.textContent = text;
        tooltipEl.classList.add("visible");
        tooltipAnchor = anchor || null;
        ensureTooltipAutoClose();

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
    }

    function hideTooltip() {
        tooltipEl.classList.remove("visible");
        tooltipAnchor = null;
    }

    function shouldPreview(el) {
        if (!el || !el.dataset || !el.dataset.fulltext) return false;
        if (el.dataset.preview === "1") return true;
        return el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1;
    }

    function bindTooltip(el, text) {
        let pressTimer;

        el.addEventListener("mouseenter", (e) => {
            if (!shouldPreview(el)) return;
            showTooltip(text, e.clientX, e.clientY, el);
        });
        el.addEventListener("mouseleave", hideTooltip);
        el.addEventListener("mousemove", (e) => {
            if (!shouldPreview(el)) return;
            if (tooltipEl.classList.contains("visible")) {
                showTooltip(text, e.clientX, e.clientY, el);
            }
        });

        el.addEventListener("touchstart", (e) => {
            if (!shouldPreview(el)) return;
            const touch = e.touches[0];
            pressTimer = setTimeout(() => showTooltip(text, touch.clientX, touch.clientY, el), TOOLTIP_TOUCH_DELAY_MS);
        });

        el.addEventListener("touchmove", () => {
            clearTimeout(pressTimer);
            hideTooltip();
        });

        el.addEventListener("touchend", () => {
            clearTimeout(pressTimer);
        });
    }

    // Parse known date formats before using Date() to avoid US/EU ambiguity.
    function parseDateValue(value) {
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
    }

    function formatDate(value) {
        if (!value) return "";
        const d = parseDateValue(value);
        if (!d) return value;
        const locale = getUiLocale();
        if (isBasqueLocale(locale)) {
            return `${d.getDate()} ${BASQUE_MONTHS[d.getMonth()]} ${d.getFullYear()}`.toLowerCase();
        }
        return d
            .toLocaleDateString(locale, {
                day: "numeric",
                month: "long",
                year: "numeric"
            })
            .toLowerCase();
    }

    function toTitleCase(value) {
        if (!value) return "";
        const locale = getUiLocale();
        const lower = value.toLocaleLowerCase(locale);
        try {
            return lower.replace(/(^|[^\p{L}])(\p{L})/gu, (match, prefix, ch) => `${prefix}${ch.toLocaleUpperCase(locale)}`);
        } catch {
            return lower.replace(/(^|[\s-/])(\S)/g, (match, prefix, ch) => `${prefix}${ch.toLocaleUpperCase(locale)}`);
        }
    }

    function formatDateParts(value) {
        if (!value) return { year: "", month: "", day: "" };
        const d = parseDateValue(value);
        if (!d) return { year: "", month: "", day: "" };
        const locale = getUiLocale();
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
    }

    function resetHistoryFilters() {
        startDate = null;
        endDate = null;
        selectingStep = "start";
        hoverDate = null;
        currentMonth = new Date().getMonth();
        currentYear = new Date().getFullYear();
        syncInputs();
        syncLabels();
        buildCalendar();
        clearFilterCache();
        loader.style.display = "none";
        timeline.innerHTML = "";
        timeline.classList.add("timeline-empty");
        pagination.innerHTML = "";
    }

    function applyCachedFilter(filter) {
        if (!filter || !filter.fromDate || !filter.toDate) return false;
        fromDate.value = filter.fromDate;
        toDate.value = filter.toDate;
        startDate = parseISO(fromDate.value);
        endDate = parseISO(toDate.value);
        selectingStep = endDate ? "done" : "end";
        hoverDate = null;
        currentMonth = startDate ? startDate.getMonth() : new Date().getMonth();
        currentYear = startDate ? startDate.getFullYear() : new Date().getFullYear();
        syncInputs();
        syncLabels();
        buildCalendar();
        const pageVal = Number(filter.page);
        const pageToLoad = Number.isFinite(pageVal) && pageVal > 0 ? pageVal : 1;
        retryOnNetworkError = true;
        loadActivities(pageToLoad);
        return true;
    }

    window.addEventListener("pageshow", () => {
        if (hasRestoredFilter) return;
        if (consumeReturnFlag()) {
            const cached = readCachedFilter();
            if (applyCachedFilter(cached)) {
                hasRestoredFilter = true;
                return;
            }
        }
        resetHistoryFilters();
    });


    // Builds simple pagination for the bottom bar
    function renderPagination(total) {
        const totalPages = Math.ceil(total / pageSize);
        pagination.innerHTML = "";
        pagination.className = "flex flex-wrap gap-2";

        if (!totalPages || totalPages <= 1) return;

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            const isActive = i === currentPage;
            btn.type = "button";
            btn.textContent = i;
            btn.className = [
                "min-w-[36px] px-3 py-1.5 rounded-lg border text-sm font-medium transition",
                isActive
                    ? "bg-primary border-primary text-white shadow-sm"
                    : "border-slate-300 text-slate-700 hover:border-primary hover:text-primary"
            ].join(" ");
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                loadActivities(i);
            });
            pagination.appendChild(btn);
        }
    }

    // Estado inicial: sin datos hasta que el usuario seleccione un rango
});
