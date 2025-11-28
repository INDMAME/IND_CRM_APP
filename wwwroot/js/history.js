document.addEventListener("DOMContentLoaded", () => {

    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");
    const btnSearch = document.getElementById("btnSearch");

    const timeline = document.getElementById("timelineContainer");
    const loader = document.getElementById("resultsLoader");
    const pagination = document.getElementById("pagination");

    let currentPage = 1;
    const pageSize = 50;

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

        const response = await fetchWithTokenUpdate(`/Historial/GetActivities?page=${page}&pageSize=${pageSize}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

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
            const asistentes = x.asistentes ?? x.Asistentes ?? [];
            const fechaFormatted = formatDate(fecha);

            const asistentesHtml = (asistentes || [])
                .map(a => {
                    const asistenteId = a.asistenteId ?? a.AsistenteId ?? "";
                    const asistenteCargo = a.asistenteCargo ?? a.AsistenteCargo ?? "";
                    return `<div>${asistenteId} — ${asistenteCargo}</div>`;
                })
                .join("");

            const cardHtml = `
            <div class="timeline-item">
                <div class="timeline-card">
                    <div class="timeline-card-head">
                        <div class="timeline-name">${nombre}</div>
                        <div class="timeline-date-chip">${fechaFormatted}</div>
                    </div>
                    <div class="timeline-desc">
                        ${descripcion}
                    </div>
                    <div class="timeline-asistentes mt-2">
                        <div class="asistentes-title">Asistentes</div>
                        <div class="asistentes-list">${asistentesHtml || "<span class='text-muted'>Sin asistentes</span>"}</div>
                    </div>
                </div>
            </div>
        `;

            timeline.insertAdjacentHTML("beforeend", cardHtml);
        });
    }

    function formatDate(value) {
        if (!value) return "";
        const d = new Date(value);
        if (isNaN(d)) return value;
        // ejemplo: 20 nov 2025 (mes en minúsculas)
        return d
            .toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
                year: "2-digit"
            })
            .replace(/\./g, "")
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

    // Search button click handler
    btnSearch.addEventListener("click", () => loadActivities(1));

    // Initial load with default dates from server
    loadActivities(1);
});
