document.addEventListener("DOMContentLoaded", () => {

    const fromDate = document.getElementById("fromDate");
    const toDate = document.getElementById("toDate");
    const btnSearch = document.getElementById("btnSearch");

    const timeline = document.getElementById("timelineContainer");
    const loader = document.getElementById("resultsLoader");
    const pagination = document.getElementById("pagination");

    let currentPage = 1;
    const pageSize = 50;

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

        const response = await fetch(`/Historial/GetActivities?page=${page}&pageSize=${pageSize}`, {
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

        renderTimeline(data.items);
        renderPagination(data.total);
    }

    function renderTimeline(items) {

        timeline.innerHTML = "";

        items.forEach(x => {

            const asistentesHtml = (x.asistentes ?? [])
                .map(a => `<div>${a.asistenteId} — ${a.asistenteCargo}</div>`)
                .join("");

            const cardHtml = `
            <div class="timeline-item">

                <div class="timeline-date">${x.transDate ?? ""}</div>

                <div class="timeline-card">

                    <div class="timeline-id">${x.actividadId ?? ""}</div>

                    <div class="timeline-name">${x.name ?? ""}</div>

                    <div class="timeline-desc">
                        <strong>Descripción:</strong> ${x.description ?? ""}
                    </div>

                    <div class="timeline-asistentes mt-2">
                        <strong>Asistentes:</strong><br>
                        ${asistentesHtml}
                    </div>

                </div>
            </div>
            `;

            timeline.insertAdjacentHTML("beforeend", cardHtml);
        });
    }


    function renderPagination(total) {
        const totalPages = Math.ceil(total / pageSize);
        pagination.innerHTML = "";

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

    btnSearch.addEventListener("click", () => loadActivities(1));

    loadActivities(1);
});
