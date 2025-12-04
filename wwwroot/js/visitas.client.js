// -------------------------------------------------------
//  IND CRM – Wizard para creación de visitas CRM
// -------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const el = id => document.getElementById(id);
    const normalize = t => (t ? t.toString().toLowerCase() : "");

    const cap = t =>
    (!t ? "" :
        t.toLowerCase()
            .split(" ")
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")
    );

    // ---------------------------------------------------
    // DOM
    // ---------------------------------------------------
    const titleStep1 = el("titleStep1");

    const clientSearchInput = el("clientSearchInput");
    const clientToggleButton = el("clientToggleButton");
    const clientToggleIcon = el("clientToggleIcon");
    const clientList = el("clientList");
    const clientInnerSpinner = el("clientInnerSpinner");
    const clientCounter = el("clientCounter");
    const clientStatus = el("clientStatus");
    const clientLoadMoreBtn = el("clientLoadMoreBtn");

    const contactSearchInput = el("contactSearchInput");
    const contactToggleButton = el("contactToggleButton");
    const contactToggleIcon = el("contactToggleIcon");
    const contactList = el("contactList");
    const contactInnerSpinner = el("contactInnerSpinner");
    const contactCounter = el("contactCounter");
    const contactStatus = el("contactStatus");

    const selectedContactCard = el("selectedContactCard");
    const selectedContactMain = el("selectedContactMain");
    const selectedContactSecondary = el("selectedContactSecondary");

    const btnSubmitActivity = el("btnSubmitActivity");
    const topBack = el("globalBackBtn");
    const topForward = el("globalForwardBtn");

    const step1Container = el("step1Container");
    const step2Container = el("step2Container");

    const visitType = el("visitType");
    const userId = el("userId");
    const transDate = el("transDate");
    const asistenteTipo = el("asistenteTipo");
    const description = el("description");
    const comentarios = el("comentarios");
    const antecedentes = el("antecedentes");
    const conclusiones = el("conclusiones");

    const activityStatus = el("activityStatus");

    // ---------------------------------------------------
    // Estado
    // ---------------------------------------------------
    let selectedClient = null;
    let selectedContact = null;

    let allClients = [];
    let allContacts = [];

    let clientListVisible = false;
    let contactListVisible = false;

    let currentClientTerm = "";
    let currentClientPage = 1;
    let currentClientTotal = 0;

    const CLIENT_CACHE_KEY = "crmClientsCache";
    const CONTACT_CACHE_KEY = "crmContactsCache";

    let clientCache = new Map(JSON.parse(sessionStorage.getItem(CLIENT_CACHE_KEY) || "[]"));
    let contactCache = JSON.parse(sessionStorage.getItem(CONTACT_CACHE_KEY) || "{}");

    const saveClientCache = () =>
        sessionStorage.setItem(CLIENT_CACHE_KEY, JSON.stringify([...clientCache.entries()]));

    const saveContactCache = () =>
        sessionStorage.setItem(CONTACT_CACHE_KEY, JSON.stringify(contactCache));

    // ---------------------------------------------------
    // STEP CONTROL
    // ---------------------------------------------------
    let currentStep = 1;

    function setStep(step) {
        currentStep = step;
        const onStep1 = step === 1;

        if (step1Container) step1Container.style.display = onStep1 ? "" : "none";
        if (step2Container) step2Container.style.display = onStep1 ? "none" : "";

        if (titleStep1) titleStep1.style.display = onStep1 ? "" : "none";

        // Top bar arrows
        if (topForward) {
            topForward.style.display = "inline-flex";
            topForward.disabled = onStep1 ? !(selectedClient && selectedContact) : false;
            topForward.style.visibility = "visible";
        }
        if (topBack) {
            topBack.style.display = "inline-flex";
            topBack.disabled = onStep1;
        }

        // Botón crear solo en paso 2
        btnSubmitActivity.style.display = onStep1 ? "none" : "inline-flex";
    }

    const updateStep2Availability = () => {
        if (topForward && currentStep === 1) {
            topForward.disabled = !(selectedClient && selectedContact);
        }
    };

    // ---------------------------------------------------
    // Helpers datos
    // ---------------------------------------------------
    const getAcc = c => (c.accountNum || c.AccountNum || "").toString();
    const getNom = c => c.nombreComercial || c.NombreComercial || "";
    const getRaz = c => c.razonSocial || c.RazonSocial || "";

    const getCName = c => c.name || c.Name || "";
    const getCCargo = c => c.cargo || c.Cargo || "";
    const getCEmp = c => c.empresa || c.Empresa || "";
    const getCRec = c => c.recId || c.RecId || "";

    // ---------------------------------------------------
    // Helper fetch que captura cabecera de token refrescado
    // ---------------------------------------------------
    async function fetchWithTokenUpdate(url, options) {
        const res = await fetch(url, options);
        const refreshed = res.headers.get("X-Refreshed-Token");
        if (refreshed) {
            sessionStorage.setItem("Token", refreshed);
        }
        return res;
    }

    // ---------------------------------------------------
    // RENDER CLIENTES
    // ---------------------------------------------------
    function renderClients(items, total, src) {
        clientInnerSpinner.style.display = "none";
        clientList.innerHTML = "";

        if (!items.length) {
            clientList.style.display = "none";
            clientCounter.textContent = "0 clientes";
            clientStatus.textContent = "No se encontraron clientes.";
            clientLoadMoreBtn.style.display = "none";
            return;
        }

        allClients = items;

        items.forEach(c => {
            const li = document.createElement("li");
            li.className = "list-group-item list-group-item-action";
            li.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div class="fw-semibold text-primary">${cap(getNom(c))}</div>
                    <div class="text-muted small">${getAcc(c)}</div>
                </div>
                <div class="text-muted small">${cap(getRaz(c))}</div>
            `;
            li.onclick = () => selectClient(c);
            clientList.appendChild(li);
        });

        clientList.style.display = "block";
        clientListVisible = true;

        clientCounter.textContent = `${total} clientes`;
        clientStatus.textContent = src === "cache" ? "Desde cache" : "Desde servidor";

        clientLoadMoreBtn.style.display = (items.length < total) ? "inline-block" : "none";
        clientToggleIcon.className = "bi bi-caret-up-fill";
    }

    const hideClientList = () => {
        clientListVisible = false;
        clientList.style.display = "none";
        clientToggleIcon.className = "bi bi-caret-down-fill";
    };

    // ---------------------------------------------------
    // BUSCAR CLIENTES
    // ---------------------------------------------------
    async function searchClients(firstPage, forceServer) {
        const term = clientSearchInput.value.trim();

        if (term.length < 4) {
            clientStatus.textContent = "Escribe al menos 4 caracteres.";
            clientList.style.display = "none";
            clientCounter.textContent = "0 clientes";
            return;
        }

        const key = term.toLowerCase();

        if (firstPage || term !== currentClientTerm) {
            currentClientTerm = term;
            currentClientPage = 1;
        }

        const page = currentClientPage;
        const pageSize = 20;

        if (!forceServer && page === 1 && clientCache.has(key)) {
            const cached = clientCache.get(key);
            currentClientTotal = cached.total;
            renderClients(cached.items, cached.total, "cache");
            return;
        }

        clientInnerSpinner.style.display = "block";
        clientStatus.textContent = "Buscando...";

        try {
            const url = `/Visitas/GetAccountsForDropdown?term=${encodeURIComponent(term)}&page=${page}&pageSize=${pageSize}`;
            const res = await fetchWithTokenUpdate(url);
            const data = await res.json();

            const items = data.items || [];
            const total = data.total || items.length;
            currentClientTotal = total;

            if (page === 1) {
                clientCache.set(key, { items: items.slice(), total });
            } else {
                const old = clientCache.get(key) || { items: [], total };
                old.items = old.items.concat(items);
                old.total = total;
                clientCache.set(key, old);
            }

            saveClientCache();
            renderClients(clientCache.get(key).items, total, "server");

        } catch {
            clientStatus.textContent = "Error al cargar.";
        }
    }

    const loadMoreClients = async () => {
        currentClientPage++;
        searchClients(false, true);
    };

    // ---------------------------------------------------
    // SELECCIONAR CLIENTE
    // ---------------------------------------------------
    function selectClient(c) {
        selectedClient = {
            accountNum: getAcc(c),
            nombreComercial: cap(getNom(c)),
            razonSocial: cap(getRaz(c))
        };

        clientSearchInput.value = `${selectedClient.nombreComercial} (${selectedClient.accountNum})`;

        hideClientList();
        clientStatus.textContent = "Cliente seleccionado.";

        selectedContact = null;
        selectedContactCard.style.display = "none";
        contactSearchInput.value = "";
        contactList.innerHTML = "";

        loadContactsForSelectedClient();
        updateStep2Availability();
    }

    // ---------------------------------------------------
    // CONTACTOS
    // ---------------------------------------------------
    async function loadContactsForSelectedClient() {
        if (!selectedClient) return;

        const acc = selectedClient.accountNum;

        contactSearchInput.disabled = true;
        contactToggleButton.disabled = true;

        contactCounter.textContent = "0 contactos";
        contactStatus.textContent = "";
        contactList.innerHTML = "";
        contactInnerSpinner.style.display = "block";

        if (contactCache[acc]) {
            const cached = contactCache[acc];
            allContacts = cached.items;
            renderContacts(allContacts, cached.total, "cache");

            contactSearchInput.disabled = false;
            contactToggleButton.disabled = false;
            return;
        }

        try {
            const res = await fetchWithTokenUpdate(`/Visitas/GetContactsForDropdown?accountNum=${acc}&page=1&pageSize=500`);
            const data = await res.json();

            const items = data.items || [];
            const total = data.total || items.length;

            contactCache[acc] = { items: items.slice(), total };
            saveContactCache();

            allContacts = items;
            renderContacts(allContacts, total, "server");

        } catch {
            contactStatus.textContent = "Error al cargar.";
        } finally {
            contactInnerSpinner.style.display = "none";
            contactSearchInput.disabled = false;
            contactToggleButton.disabled = false;
        }
    }

    function renderContacts(items, total, src) {
        contactInnerSpinner.style.display = "none";
        contactList.innerHTML = "";

        if (!items.length) {
            contactList.style.display = "none";
            return;
        }

        contactCounter.textContent = `${total} contactos`;

        items.forEach(c => {
            const li = document.createElement("li");
            li.className = "list-group-item list-group-item-action";
            li.innerHTML = `
                <div class="fw-semibold text-primary">${cap(getCName(c))} — ${cap(getCCargo(c))}</div>
                <div class="text-muted small">Empresa: ${cap(getCEmp(c))}</div>
            `;
            li.onclick = () => selectContact(c);
            contactList.appendChild(li);
        });

        contactList.style.display = "block";
        contactListVisible = true;
        contactToggleIcon.className = "bi bi-caret-up-fill";

        contactStatus.textContent = src === "cache" ? "Desde cache" : "Desde servidor";
    }

    const hideContactList = () => {
        contactListVisible = false;
        contactList.style.display = "none";
        contactToggleIcon.className = "bi bi-caret-down-fill";
    };

    function filterContactsLocal() {
        const filter = normalize(contactSearchInput.value);
        contactList.innerHTML = "";

        const filtered = allContacts.filter(c =>
            normalize(getCName(c)).includes(filter) ||
            normalize(getCCargo(c)).includes(filter) ||
            normalize(getCEmp(c)).includes(filter)
        );

        if (!filtered.length) {
            contactList.style.display = "none";
            return;
        }

        filtered.forEach(c => {
            const li = document.createElement("li");
            li.className = "list-group-item list-group-item-action";
            li.innerHTML = `
                <div class="fw-semibold text-primary">${cap(getCName(c))} — ${cap(getCCargo(c))}</div>
                <div class="text-muted small">Empresa: ${cap(getCEmp(c))}</div>
            `;
            li.onclick = () => selectContact(c);
            contactList.appendChild(li);
        });

        contactList.style.display = "block";
        contactToggleIcon.className = "bi bi-caret-up-fill";
        contactListVisible = true;
    }

    // ---------------------------------------------------
    // SELECCIONAR CONTACTO
    // ---------------------------------------------------
    function selectContact(c) {
        selectedContact = {
            recId: getCRec(c),
            name: cap(getCName(c)),
            cargo: cap(getCCargo(c)),
            empresa: cap(getCEmp(c))
        };

        selectedContactMain.textContent =
            `${selectedContact.name} — ${selectedContact.cargo}`;
        selectedContactSecondary.textContent =
            `Empresa: ${selectedContact.empresa}`;

        selectedContactCard.style.display = "block";
        hideContactList();

        updateStep2Availability();
    }

    // ---------------------------------------------------
    // STEP 1 ? STEP 2
    // ---------------------------------------------------
    if (topForward) {
        topForward.addEventListener("click", () => {
            if (topForward.disabled) return;

            if (currentStep === 1) {
                setStep(2);
            } else {
                btnSubmitActivity.click();
            }
        });
    }

    if (topBack) {
        topBack.addEventListener("click", () => {
            if (currentStep === 2) {
                setStep(1);
            } else {
                window.history.back();
            }
        });
    }

    // ---------------------------------------------------
    // CREAR ACTIVIDAD + VISITA
    // ---------------------------------------------------
    // ---------------------------------------------------
    // CREAR ACTIVIDAD + VISITA (con redirect + popup)
    // ---------------------------------------------------
    // ---------------------------------------------------
    // CREAR ACTIVIDAD + VISITA (con redirect + popup)
    // ---------------------------------------------------
    btnSubmitActivity.addEventListener("click", async () => {

        const userIdVal = userId ? userId.value : (window.CurrentAxUser ?? "");

        if (!userIdVal || !description.value || !transDate.value) {
            showErrorPopup("Usuario, descripcion y fecha son obligatorios.");
            return;
        }

        btnSubmitActivity.disabled = true;

        try {
            // 1) Crear actividad --------------------------
            const payloadActivity = {
                accountNum: selectedClient.accountNum,
                visitType: visitType.value,
                userId: userIdVal,
                description: description.value,
                transDate: transDate.value,
                comentarios: comentarios.value,
                antecedentes: antecedentes.value,
                conclusiones: conclusiones.value
            };

            const resAct = await fetchWithTokenUpdate("/Visitas/CreateActivity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payloadActivity)
            });

            if (!resAct.ok) {
                const detail = await resAct.text();
                showErrorPopup(`Crear actividad falló: ${resAct.status} ${resAct.statusText}. ${detail}`);
                btnSubmitActivity.disabled = false;
                return;
            }

            const dataAct = await resAct.json();
            if (!dataAct.success) {
                showErrorPopup(dataAct.message);
                btnSubmitActivity.disabled = false;
                return;
            }

            const recIdActividad = dataAct.message.trim();

            // 2) Crear visita (asistente) ------------------
            const payloadVisita = {
                refRecIdActividad: recIdActividad,
                asistenteTipo: asistenteTipo.value,
                asistenteId: selectedContact.name,
                contactoRecId: selectedContact.recId
            };

            const resVis = await fetchWithTokenUpdate("/Visitas/CreateVisitaAsistente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payloadVisita)
            });

            if (!resVis.ok) {
                const detail = await resVis.text();
                showErrorPopup(`Crear visita asistente falló: ${resVis.status} ${resVis.statusText}. ${detail}`);
                btnSubmitActivity.disabled = false;
                return;
            }

            const dataVis = await resVis.json();
            if (!dataVis.success) {
                showErrorPopup(dataVis.message);
                btnSubmitActivity.disabled = false;
                return;
            }

            // 3) Todo OK ? redirect ------------------------
            showSuccessPopup("Visita creada correctamente.");

            setTimeout(() => {
                window.location.href = "/Home/Index";
            }, 1500);

        } catch (err) {
            showErrorPopup("Error de comunicación con el servidor.");
        } finally {
            btnSubmitActivity.disabled = false;
        }
    });


    // ---------------------------------------------------
    // Eventos UI
    // ---------------------------------------------------
    clientSearchInput.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            currentClientPage = 1;
            searchClients(true, true);
        }
    });

    clientToggleButton.addEventListener("click", () => {
        if (clientListVisible) return hideClientList();

        if (clientSearchInput.value.trim().length < 4) {
            clientStatus.textContent = "Escribe al menos 4 caracteres.";
            return;
        }

        currentClientPage = 1;
        searchClients(true, true);
    });

    clientLoadMoreBtn.addEventListener("click", loadMoreClients);

    contactSearchInput.addEventListener("input", () => {
        if (contactListVisible) filterContactsLocal();
    });

    contactToggleButton.addEventListener("click", () => {
        if (!selectedClient) {
            contactStatus.textContent = "Selecciona un cliente primero.";
            return;
        }

        if (contactListVisible) return hideContactList();

        if (allContacts.length > 0) filterContactsLocal();
        else loadContactsForSelectedClient();
    });

    document.addEventListener("click", e => {
        if (!e.target.closest("#clientSearchContainer") && clientListVisible)
            hideClientList();

        if (!e.target.closest("#contactSearchContainer") && contactListVisible)
            hideContactList();
    });

    function showErrorPopup(message) {
        showPopup(message, false);
    }

    function showSuccessPopup(message) {
        showPopup(message, true);
    }

    function showPopup(message, success = false) {
        const existing = document.getElementById("crmPopup");
        if (existing) existing.remove();

        const popup = document.createElement("div");
        popup.id = "crmPopup";
        popup.innerHTML = `
        <div class="crm-popup-inner ${success ? "success" : "error"}">
            <div class="crm-popup-icon">
                <i class="bi ${success ? "bi-check-circle" : "bi-exclamation-circle"}"></i>
            </div>
            <div class="crm-popup-text">${message}</div>
        </div>
    `;

        document.body.appendChild(popup);

        setTimeout(() => popup.classList.add("visible"), 20);

        setTimeout(() => {
            popup.classList.remove("visible");
            setTimeout(() => popup.remove(), 300);
        }, 2500);
    }

    function showErrorPopup(message) {
        showPopup(message, false);
    }

    function showSuccessPopup(message) {
        showPopup(message, true);
    }

    function showPopup(message, success = false) {
        const existing = document.getElementById("crmPopup");
        if (existing) existing.remove();

        const popup = document.createElement("div");
        popup.id = "crmPopup";
        popup.innerHTML = `
        <div class="crm-popup-inner ${success ? "success" : "error"}">
            <div class="crm-popup-icon">
                <i class="bi ${success ? "bi-check-circle" : "bi-exclamation-circle"}"></i>
            </div>
            <div class="crm-popup-text">${message}</div>
        </div>
    `;

        document.body.appendChild(popup);

        setTimeout(() => popup.classList.add("visible"), 20);

        setTimeout(() => {
            popup.classList.remove("visible");
            setTimeout(() => popup.remove(), 300);
        }, 2500);
    }


    transDate.value = new Date().toISOString().substring(0, 10);

    setStep(1);
    updateStep2Availability();
});



