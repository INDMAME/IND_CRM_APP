document.addEventListener("DOMContentLoaded", () => {

    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");

    const filterCacheKey = "visitas_history_filter_v1";
    const IND_I18N = (window && window.__IND_I18N__) ? window.__IND_I18N__ : {};
    const indT = (key, fallback) => (IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key]) || fallback || key;
    try {
        const cachedRaw = sessionStorage.getItem(filterCacheKey);
        if (cachedRaw) {
            const cached = JSON.parse(cachedRaw);
            if (cached && typeof cached === "object") {
                if (cached.fromDate) fromDate.value = cached.fromDate;
                if (cached.toDate) toDate.value = cached.toDate;
            }
        }
    } catch {
        // ignore cache errors
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
    const pageSize = 50;
    let debugLogged = 0;

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
        loadActivities(1);
    }

    // Captura cabecera X-Refreshed-Token si llega en las respuestas MVC
    async function fetchWithTokenUpdate(url, options) {
        const res = await fetch(url, options);
        const refreshed = res.headers.get("X-Refreshed-Token");
        if (refreshed) {
            sessionStorage.setItem("Token", refreshed);
        }
        return res;
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

        loader.style.display = "block";
        timeline.innerHTML = "";
        pagination.innerHTML = "";

        const payload = {
            userId: window.CurrentAxUser ?? "",
            fromDate: fromDate.value,
            toDate: toDate.value
        };

        let response;
        try {
            response = await fetchWithTokenUpdate(`/Historial/GetActivities?page=${page}&pageSize=${pageSize}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            loader.style.display = "none";
            console.error("Historial fetch error:", err);
            timeline.innerHTML = "<div class='text-danger'>No se pudo conectar con el servidor (red).</div>";
            return;
        }

        if (!response.ok) {
            const statusText = response.statusText || "Error del servidor";
            let detail = "";
            try { detail = await response.text(); } catch { /* ignore */ }
            console.error("Historial fetch failed", response.status, statusText, detail);
            loader.style.display = "none";
            timeline.innerHTML = `<div class='text-danger'>${response.status} - ${statusText}. ${detail || "Verifica el backend."}</div>`;
            return;
        }

        const raw = await response.text();
        let data;

        try {
            data = JSON.parse(raw);
        } catch {
            loader.style.display = "none";
            timeline.innerHTML = "<div class='text-danger'>Error procesando datos</div>";
            return;
        }

        loader.style.display = "none";

        const items = data.items || [];
        renderTimeline(items);
        renderPagination(data.total || items.length);
    }

    const shorten = (text, max) => {
        if (!text) return "";
        if (text.length <= max) return text;
        return text.slice(0, Math.max(0, max - 3)) + "...";
    };

    // Renders activity timeline cards
    function renderTimeline(items) {
        timeline.innerHTML = "";
        timeline.classList.remove("timeline-empty");
        setTimelineEmptyText();

        if (!items || items.length === 0) {
            timeline.classList.add("timeline-empty");
            return;
        }

        items.forEach(x => {
            const narrow = window.innerWidth <= 370;
            const nameMax = narrow ? 32 : Infinity;
            const descMax = narrow ? 60 : Infinity;

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
            const fullName = rawName.toUpperCase();
            const nombre = narrow ? shorten(fullName, nameMax) : fullName;
            const isNameTruncated = narrow && nombre !== fullName;
            const fecha = x.transDate ?? x.TransDate ?? "";
            const rawDesc = (x.description ?? x.Description ?? "").toString().trim();
            const fullDesc = rawDesc.toUpperCase();

            // Do not allow navigation for placeholder cards with no data.
            const isNoDataCard = !rawName && !rawDesc;
            if (isNoDataCard) {
                linkId = "";
            }
            const descripcion = narrow ? shorten(fullDesc, descMax) : fullDesc;
            const isDescTruncated = narrow && fullDesc && descripcion !== fullDesc;
            const fechaFormatted = formatDate(fecha);

            const noDataText = indT("Common_NoData", "No data");
            const cardHtml = `
            <div class="timeline-item">
                <div class="timeline-card ${isNoDataCard ? "timeline-card--nodata" : ""} ${linkId ? "timeline-card--clickable" : ""}" data-actividadid="${actividadId}" data-recid="${recId ?? ""}">
                    <div class="timeline-card__content">
                        <div class="timeline-card-head">
                            <div>
                                <div class="timeline-name ellipsis">${nombre}</div>
                                <div class="timeline-date-chip">${fechaFormatted}</div>
                            </div>
                        </div>
                        <p class="timeline-desc-text">${descripcion || noDataText}</p>
                    </div>
                </div>
            </div>
        `;

            timeline.insertAdjacentHTML("beforeend", cardHtml);

            const lastNameEl = timeline.lastElementChild?.querySelector(".timeline-name");
            const lastDescEl = timeline.lastElementChild?.querySelector(".timeline-desc-text");
            if (lastNameEl && isNameTruncated) {
                lastNameEl.dataset.fulltext = fullName;
                bindTooltip(lastNameEl, fullName);
            }
            if (lastDescEl && fullDesc) {
                lastDescEl.dataset.fulltext = fullDesc;
                bindTooltip(lastDescEl, fullDesc);
            }

            const cardEl = timeline.lastElementChild?.querySelector(".timeline-card");
            if (cardEl && linkId) {
                let navTimer;
                const navigate = () => {
                    navTimer = setTimeout(() => {
                        try {
                            sessionStorage.setItem(
                                filterCacheKey,
                                JSON.stringify({
                                    fromDate: fromDate.value || "",
                                    toDate: toDate.value || ""
                                })
                            );
                        } catch {
                            // ignore cache errors
                        }
                        const target = encodeURIComponent(linkId);
                        window.location.href = `/Visitas/Detalle/${target}`;
                    }, 240); // Small delay to avoid accidental clicks.
                };
                const cancel = () => {
                    if (navTimer) clearTimeout(navTimer);
                };
                cardEl.addEventListener("click", navigate);
                cardEl.addEventListener("mouseleave", cancel);
                cardEl.addEventListener("touchend", navigate, { passive: true });
                cardEl.addEventListener("touchmove", cancel, { passive: true });
            }
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

    function showTooltip(text, clientX, clientY) {
        tooltipEl.textContent = text;
        tooltipEl.style.left = `${clientX}px`;
        tooltipEl.style.top = `${clientY - 12}px`;
        tooltipEl.classList.add("visible");
    }

    function hideTooltip() {
        tooltipEl.classList.remove("visible");
    }

    function bindTooltip(el, text) {
        let pressTimer;

        el.addEventListener("mouseenter", (e) => showTooltip(text, e.clientX, e.clientY));
        el.addEventListener("mouseleave", hideTooltip);
        el.addEventListener("mousemove", (e) => {
            if (tooltipEl.classList.contains("visible")) {
                showTooltip(text, e.clientX, e.clientY);
            }
        });

        el.addEventListener("touchstart", (e) => {
            const touch = e.touches[0];
            pressTimer = setTimeout(() => showTooltip(text, touch.clientX, touch.clientY), 350);
        });

        el.addEventListener("touchmove", () => {
            clearTimeout(pressTimer);
            hideTooltip();
        });

        el.addEventListener("touchend", () => {
            clearTimeout(pressTimer);
            hideTooltip();
        });
    }

    function formatDate(value) {
        if (!value) return "";
        let d = new Date(value);

        // Fallback manual parse para formatos dd.MM.yyyy o dd/MM/yyyy
        if (isNaN(d) && /^\d{2}[./-]\d{2}[./-]\d{4}$/.test(value)) {
            const parts = value.split(/[./-]/).map(Number);
            // parts: [dd, MM, yyyy]
            d = new Date(parts[2], parts[1] - 1, parts[0]);
        }

        if (isNaN(d)) return value;
        const locale = getUiLocale();
        return d
            .toLocaleDateString(locale, {
                day: "numeric",
                month: "long",
                year: "numeric"
            })
            .toLowerCase();
    }


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
