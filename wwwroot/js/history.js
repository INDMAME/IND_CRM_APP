document.addEventListener("DOMContentLoaded", () => {

    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");

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

    let currentPage = 1;
    const pageSize = 50;

    // --------------------------
    // Date Range Picker (custom)
    // --------------------------
    const pad = (n) => n.toString().padStart(2, "0");
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

    const formatDisplay = (d) => d.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "short",
        year: "numeric"
    }).replace(/\./g, "").toLowerCase();

    function ensureDefaults() {
        if (!startDate) {
            const today = new Date();
            startDate = today;
        }
        if (!endDate) {
            endDate = startDate;
        }
    }

    function syncInputs() {
        ensureDefaults();
        fromDate.value = startDate ? toISO(startDate) : "";
        toDate.value = endDate ? toISO(endDate) : "";
    }

    function syncLabels() {
        ensureDefaults();
        drpStartValue.textContent = startDate ? formatDisplay(startDate) : "Añadir fecha";
        drpEndValue.textContent = endDate ? formatDisplay(endDate) : "Añadir fecha";
        drpClear.style.display = (startDate || endDate) ? "inline-flex" : "none";

        drpSections.forEach(sec => {
            const section = sec.dataset.section;
            sec.classList.toggle("active", selectingStep === section && isOpen);
        });

        if (drpStatus) {
            drpStatus.textContent =
                selectingStep === "start"
                    ? "Selecciona la fecha de inicio"
                    : endDate || hoverDate
                        ? "Selecciona la fecha de fin"
                        : "Selecciona la fecha de fin";
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

        drpMonthLabel.textContent = `${firstDay.toLocaleDateString("es-ES", { month: "long" })} ${currentYear}`.replace(/^\w/, c => c.toUpperCase());

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
            alert("Debe seleccionar un rango de fechas.");
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

    // Renders activity timeline cards
    function renderTimeline(items) {
        timeline.innerHTML = "";

        items.forEach(x => {
            const nombre = x.name ?? x.Name ?? "";
            const fecha = x.transDate ?? x.TransDate ?? "";
            const descripcion = x.description ?? x.Description ?? "";
            const fechaFormatted = formatDate(fecha);

            const cardHtml = `
            <div class="timeline-item">
                <div class="timeline-card timeline-card-slim">
                    <div class="timeline-name ellipsis">${nombre}</div>
                    <div class="timeline-date-block ellipsis">${fechaFormatted}</div>
                    <div class="timeline-subject ellipsis">${descripcion || "Sin asunto"}</div>
                </div>
            </div>
        `;

            timeline.insertAdjacentHTML("beforeend", cardHtml);
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
        // ejemplo: 22 de abril de 1993
        return d
            .toLocaleDateString("es-ES", {
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

        if (!totalPages || totalPages <= 1) {
            return;
        }

        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.className = `page-item ${i === currentPage ? "active" : ""}`;
            li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            li.addEventListener("click", e => {
                e.preventDefault();
                loadActivities(i);
            });
            pagination.appendChild(li);
        }
    }

    // Initial load with default dates from server
    loadActivities(1);
});



