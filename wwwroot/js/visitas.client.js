// -------------------------------------------------------
//  IND CRM – Wizard para creación de visitas CRM
//  Archivo: visitas.client.js
// -------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    // ---------------------------------------------------
    // Helpers
    // ---------------------------------------------------
    const el = id => document.getElementById(id);

    const normalize = text => (text ? text.toString().toLowerCase() : "");

    function cap(text) {
        if (!text) return "";
        return text
            .toLowerCase()
            .split(" ")
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
    }

    // ---------------------------------------------------
    // DOM
    // ---------------------------------------------------
    // Paso 1 – clientes
    const clientSearchInput = el("clientSearchInput");
    const clientToggleButton = el("clientToggleButton");
    const clientToggleIcon = el("clientToggleIcon");
    const clientList = el("clientList");
    const clientInnerSpinner = el("clientInnerSpinner");
    const clientCounter = el("clientCounter");
    const clientStatus = el("clientStatus");
    const clientLoadMoreBtn = el("clientLoadMoreBtn");

    const selectedClientCard = el("selectedClientCard");
    const selectedClientMain = el("selectedClientMain");
    const selectedClientSecondary = el("selectedClientSecondary");

    // Paso 1 – contactos
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

    const btnGoStep2 = el("btnGoStep2");

    // Paso 2
    const step1Container = el("step1Container");
    const step2Container = el("step2Container");
    const step1Indicator = el("step1Indicator");
    const step2Indicator = el("step2Indicator");

    const summaryClient = el("summaryClient");
    const summaryContact = el("summaryContact");

    const actividadType = el("actividadType");
    const visitType = el("visitType");
    const origen = el("origen");
    const userId = el("userId");
    const transDate = el("transDate");
    const asistenteTipo = el("asistenteTipo");

    const description = el("description");
    const comentarios = el("comentarios");
    const antecedentes = el("antecedentes");
    const conclusiones = el("conclusiones");

    const btnBackToStep1 = el("btnBackToStep1");
    const btnSubmitActivity = el("btnSubmitActivity");
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

    // Paginación clientes
    let currentClientTerm = "";
    let currentClientPage = 1;
    let currentClientTotal = 0;

    // Cachés
    const CLIENT_CACHE_KEY = "crmClientsCache";
    const CONTACT_CACHE_KEY = "crmContactsCache";

    let clientCache = new Map(JSON.parse(sessionStorage.getItem(CLIENT_CACHE_KEY) || "[]"));
    let contactCache = JSON.parse(sessionStorage.getItem(CONTACT_CACHE_KEY) || "{}");

    function saveClientCache() {
        const arr = Array.from(clientCache.entries());
        sessionStorage.setItem(CLIENT_CACHE_KEY, JSON.stringify(arr));
    }

    function saveContactCache() {
        sessionStorage.setItem(CONTACT_CACHE_KEY, JSON.stringify(contactCache));
    }

    // ---------------------------------------------------
    // Step helpers
    // ---------------------------------------------------
    function setStep(step) {
        if (step === 1) {
            step1Container.style.display = "";
            step2Container.style.display = "none";
            step1Indicator.className = "card border-primary";
            step2Indicator.className = "card border-light";
        } else {
            step1Container.style.display = "none";
            step2Container.style.display = "";
            step1Indicator.className = "card border-light";
            step2Indicator.className = "card border-primary";
        }
    }

    function updateStep2Availability() {
        btnGoStep2.disabled = !(selectedClient && selectedContact);
    }

    // ---------------------------------------------------
    // Helpers de mapeo datos
    // ---------------------------------------------------
    // Clientes
    const getAccountNum = c =>
        (c.accountNum || c.AccountNum || "").toString();

    const getNombreComercial = c =>
        c.nombreComercial || c.NombreComercial || "";

    const getRazonSocial = c =>
        c.razonSocial || c.RazonSocial || "";

    // Contactos
    const getContactName = c =>
        c.name || c.Name || "";

    const getContactCargo = c =>
        c.cargo || c.Cargo || "";

    const getContactEmpresa = c =>
        c.empresa || c.Empresa || "";

    const getContactRecId = c =>
        c.recId || c.RecId || "";

    // ---------------------------------------------------
    // RENDER CLIENTES
    // ---------------------------------------------------
    function renderClients(items, total, sourceLabel) {
        clientInnerSpinner.style.display = "none";
        clientList.innerHTML = "";

        if (!items || !items.length) {
            clientList.style.display = "none";
            clientCounter.textContent = "0 clientes";
            clientStatus.textContent = "No se encontraron clientes.";
            clientLoadMoreBtn.style.display = "none";
            return;
        }

        allClients = items.slice();

        items.forEach(c => {
            const nombre = cap(getNombreComercial(c));
            const razon = cap(getRazonSocial(c));
            const acc = getAccountNum(c).toUpperCase();

            const li = document.createElement("li");
            li.className = "list-group-item list-group-item-action";
            li.innerHTML = `
                <div class="d-flex justify-content-between">
                    <div class="fw-semibold text-primary">${nombre}</div>
                    <div class="text-muted small">${acc}</div>
                </div>
                <div class="text-muted small">${razon}</div>
            `;
            li.addEventListener("click", () => selectClient(c));
            clientList.appendChild(li);
        });

        clientList.style.display = "block";
        clientListVisible = true;
        clientToggleIcon.className = "bi bi-caret-up-fill";

        clientCounter.textContent = `${total} clientes`;
        clientStatus.textContent =
            sourceLabel === "cache"
                ? "Clientes cargados desde cache"
                : "Clientes cargados desde servidor";

        if (items.length < total) {
            clientLoadMoreBtn.style.display = "inline-block";
        } else {
            clientLoadMoreBtn.style.display = "none";
        }
    }

    function hideClientList() {
        clientListVisible = false;
        clientList.style.display = "none";
        clientToggleIcon.className = "bi bi-caret-down-fill";
    }

    // ---------------------------------------------------
    // BUSQUEDA CLIENTES
    // ---------------------------------------------------
    async function searchClients(firstPage, forceServer) {
        const term = (clientSearchInput.value || "").trim();

        if (term.length < 4) {
            clientStatus.textContent = "Escribe al menos 4 caracteres para buscar clientes.";
            clientList.innerHTML = "";
            clientList.style.display = "none";
            clientCounter.textContent = "0 clientes";
            clientLoadMoreBtn.style.display = "none";
            return;
        }

        const key = term.toLowerCase();

        if (firstPage || term !== currentClientTerm) {
            currentClientTerm = term;
            currentClientPage = 1;
            currentClientTotal = 0;
        }

        const page = currentClientPage;
        const pageSize = 20;

        if (!forceServer && page === 1 && clientCache.has(key)) {
            const cached = clientCache.get(key);
            currentClientTotal = cached.total || cached.items.length || 0;
            renderClients(cached.items, currentClientTotal, "cache");
            return;
        }

        clientInnerSpinner.style.display = "block";
        clientStatus.textContent = "Buscando clientes en servidor...";
        clientList.innerHTML = "";
        clientList.style.display = "block";

        try {
            const url = `/Visitas/GetAccountsForDropdown?term=${encodeURIComponent(term)}&page=${page}&pageSize=${pageSize}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("HTTP " + res.status);

            const data = await res.json();
            const items = data.items || [];
            const total = data.total || items.length;
            currentClientTotal = total;

            if (page === 1) {
                clientCache.set(key, { items: items.slice(), total });
            } else {
                const existing = clientCache.get(key) || { items: [], total };
                existing.items = existing.items.concat(items);
                existing.total = total;
                clientCache.set(key, existing);
            }

            saveClientCache();

            const cacheEntry = clientCache.get(key);
            renderClients(cacheEntry.items, cacheEntry.total, "server");
        } catch (err) {
            console.error(err);
            clientInnerSpinner.style.display = "none";
            clientStatus.textContent = "Error al cargar clientes.";
            clientList.style.display = "none";
            clientLoadMoreBtn.style.display = "none";
        }
    }

    async function loadMoreClients() {
        const term = (clientSearchInput.value || "").trim();
        if (!term || term.length < 4) return;

        const key = term.toLowerCase();
        const cacheEntry = clientCache.get(key);
        const alreadyLoaded = cacheEntry ? cacheEntry.items.length : 0;

        if (alreadyLoaded >= currentClientTotal && currentClientTotal > 0) {
            clientStatus.textContent = "No hay mas clientes que cargar.";
            clientLoadMoreBtn.style.display = "none";
            return;
        }

        currentClientPage++;
        await searchClients(false, true);
    }

    // ---------------------------------------------------
    // CLIENTE – seleccion
    // ---------------------------------------------------
    function selectClient(c) {
        const acc = getAccountNum(c);
        const nombre = cap(getNombreComercial(c));
        const razon = cap(getRazonSocial(c));

        selectedClient = {
            accountNum: acc,
            nombreComercial: nombre,
            razonSocial: razon
        };

        selectedClientMain.textContent = `${nombre} (${acc})`;
        selectedClientSecondary.textContent = razon;
        selectedClientCard.style.display = "block";

        hideClientList();
        clientStatus.textContent = "Cliente seleccionado.";

        selectedContact = null;
        selectedContactCard.style.display = "none";
        contactSearchInput.value = "";
        contactList.innerHTML = "";
        contactCounter.textContent = "0 contactos";
        contactStatus.textContent = "";

        loadContactsForSelectedClient();
        updateStep2Availability();
    }

    // ---------------------------------------------------
    // CONTACTOS – carga + cache
    // ---------------------------------------------------
    async function loadContactsForSelectedClient() {
        if (!selectedClient || !selectedClient.accountNum) {
            contactStatus.textContent = "Selecciona primero un cliente.";
            return;
        }

        const acc = selectedClient.accountNum;

        contactList.innerHTML = "";
        contactInnerSpinner.style.display = "block";
        contactStatus.textContent = "Cargando contactos...";
        contactCounter.textContent = "0 contactos";

        contactSearchInput.disabled = true;
        contactToggleButton.disabled = true;

        if (contactCache[acc]) {
            const cached = contactCache[acc];
            allContacts = cached.items || [];
            renderContacts(allContacts, cached.total, "cache");
            contactSearchInput.disabled = false;
            contactToggleButton.disabled = false;
            return;
        }

        try {
            const url = `/Visitas/GetContactsForDropdown?accountNum=${encodeURIComponent(acc)}&page=1&pageSize=500`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("HTTP " + res.status);

            const data = await res.json();
            const items = data.items || [];
            const total = data.total || items.length;

            contactCache[acc] = { items: items.slice(), total };
            saveContactCache();

            allContacts = items.slice();
            renderContacts(allContacts, total, "server");
        } catch (err) {
            console.error(err);
            contactInnerSpinner.style.display = "none";
            contactStatus.textContent = "Error al cargar contactos.";
            contactList.style.display = "none";
        } finally {
            contactSearchInput.disabled = false;
            contactToggleButton.disabled = false;
        }
    }

    function renderContacts(items, total, sourceLabel) {
        contactInnerSpinner.style.display = "none";
        contactList.innerHTML = "";

        if (!items || !items.length) {
            contactList.style.display = "none";
            contactCounter.textContent = "0 contactos";
            contactStatus.textContent = "No se encontraron contactos.";
            return;
        }

        contactCounter.textContent = `${total} contactos`;

        items.forEach(c => {
            const name = cap(getContactName(c));
            const cargo = cap(getContactCargo(c));
            const empresa = cap(getContactEmpresa(c));

            const li = document.createElement("li");
            li.className = "list-group-item list-group-item-action";
            li.innerHTML = `
                <div class="fw-semibold text-primary">${name} — ${cargo}</div>
                <div class="text-muted small">Empresa: ${empresa}</div>
            `;
            li.addEventListener("click", () => selectContact(c));
            contactList.appendChild(li);
        });

        contactList.style.display = "block";
        contactListVisible = true;
        contactToggleIcon.className = "bi bi-caret-up-fill";

        contactStatus.textContent =
            sourceLabel === "cache"
                ? "Contactos cargados desde cache"
                : "Contactos cargados desde servidor";
    }

    function hideContactList() {
        contactListVisible = false;
        contactList.style.display = "none";
        contactToggleIcon.className = "bi bi-caret-down-fill";
    }

    function filterContactsLocal() {
        if (!allContacts || !allContacts.length) {
            contactList.style.display = "none";
            return;
        }

        const filter = normalize(contactSearchInput.value);
        contactList.innerHTML = "";

        const filtered = allContacts.filter(c =>
            normalize(getContactName(c)).includes(filter) ||
            normalize(getContactCargo(c)).includes(filter) ||
            normalize(getContactEmpresa(c)).includes(filter)
        );

        if (!filtered.length) {
            contactList.style.display = "none";
            return;
        }

        filtered.forEach(c => {
            const name = cap(getContactName(c));
            const cargo = cap(getContactCargo(c));
            const empresa = cap(getContactEmpresa(c));

            const li = document.createElement("li");
            li.className = "list-group-item list-group-item-action";
            li.innerHTML = `
                <div class="fw-semibold text-primary">${name} — ${cargo}</div>
                <div class="text-muted small">Empresa: ${empresa}</div>
            `;
            li.addEventListener("click", () => selectContact(c));
            contactList.appendChild(li);
        });

        contactList.style.display = "block";
        contactListVisible = true;
        contactToggleIcon.className = "bi bi-caret-up-fill";
    }

    // ---------------------------------------------------
    // CONTACTO – seleccion
    // ---------------------------------------------------
    function selectContact(c) {
        const name = cap(getContactName(c));
        const cargo = cap(getContactCargo(c));
        const empresa = cap(getContactEmpresa(c));
        const recId = getContactRecId(c);

        selectedContact = {
            recId,
            name,
            cargo,
            empresa
        };

        selectedContactMain.textContent = `${name} — ${cargo}`;
        selectedContactSecondary.textContent = `Empresa: ${empresa}`;
        selectedContactCard.style.display = "block";

        hideContactList();
        contactStatus.textContent = "Contacto seleccionado.";
        updateStep2Availability();
    }

    // ---------------------------------------------------
    // STEP2 – resumen y envio
    // ---------------------------------------------------
    btnGoStep2.addEventListener("click", () => {
        if (!selectedClient || !selectedContact) {
            activityStatus.innerHTML =
                `<div class="alert alert-warning">Debe seleccionar cliente y contacto.</div>`;
            return;
        }

        summaryClient.textContent =
            `${selectedClient.nombreComercial} (${selectedClient.accountNum})`;
        summaryContact.textContent =
            `${selectedContact.name} — ${selectedContact.cargo}`;

        setStep(2);
    });

    btnBackToStep1.addEventListener("click", () => setStep(1));

    btnSubmitActivity.addEventListener("click", async () => {

        if (!selectedClient || !selectedContact) {
            activityStatus.innerHTML =
                `<div class="alert alert-warning">Debe seleccionar cliente y contacto.</div>`;
            setStep(1);
            return;
        }

        if (!userId.value || !description.value || !transDate.value) {
            activityStatus.innerHTML =
                `<div class="alert alert-warning">Usuario, descripcion y fecha son obligatorios.</div>`;
            return;
        }

        btnSubmitActivity.disabled = true;
        activityStatus.innerHTML =
            `<div class="alert alert-info">Creando actividad...</div>`;

        try {
            const payloadActivity = {
                accountNum: selectedClient.accountNum, 
                visitType: visitType.value,
                userId: userId.value,
                description: description.value, 
                transDate: transDate.value,
                comentarios: comentarios.value,
                antecedentes: antecedentes.value,
                conclusiones: conclusiones.value
            };

            const resAct = await fetch("/Visitas/CreateActivity", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payloadActivity)
            });

            const dataAct = await resAct.json();

            if (!dataAct.success) {
                activityStatus.innerHTML =
                    `<div class="alert alert-danger">Error al crear actividad: ${dataAct.message}</div>`;
                btnSubmitActivity.disabled = false;
                return;
            }

            const recIdActividad = (dataAct.message || "").trim();

            if (!recIdActividad) {
                activityStatus.innerHTML =
                    `<div class="alert alert-danger">
                        Error: no se obtuvo RecId de actividad.
                    </div>`;
                btnSubmitActivity.disabled = false;
                return;
            }

            activityStatus.innerHTML =
                `<div class="alert alert-info">Actividad creada (${recIdActividad}). Creando visita...</div>`;

            const payloadVisita = {
                refRecIdActividad: recIdActividad,
                asistenteTipo: asistenteTipo.value,
                asistenteId: selectedContact.name,
                contactoRecId: selectedContact.recId
            };

            const resVis = await fetch("/Visitas/CreateVisitaAsistente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payloadVisita)
            });

            const dataVis = await resVis.json();

            if (!dataVis.success) {
                activityStatus.innerHTML =
                    `<div class="alert alert-danger">Error al crear visita: ${dataVis.message}</div>`;
                btnSubmitActivity.disabled = false;
                return;
            }

            activityStatus.innerHTML =
                `<div class="alert alert-success">
                    Actividad registrada con exito.<br>
                    RecId actividad: <strong>${recIdActividad}</strong>
                </div>`;

        } catch (error) {
            console.error(error);
            activityStatus.innerHTML =
                `<div class="alert alert-danger">
                    Error de comunicacion con el servidor.
                </div>`;
        } finally {
            btnSubmitActivity.disabled = false;
        }
    });

    // ---------------------------------------------------
    // EVENTOS UI
    // ---------------------------------------------------
    clientSearchInput.addEventListener("keypress", e => {
        if (e.key === "Enter") {
            currentClientPage = 1;
            currentClientTerm = clientSearchInput.value.trim();
            searchClients(true, true);
        }
    });

    clientToggleButton.addEventListener("click", () => {
        if (clientListVisible) {
            hideClientList();
            return;
        }

        const term = clientSearchInput.value.trim();
        if (term.length < 4) {
            clientStatus.textContent = "Escribe al menos 4 caracteres.";
            return;
        }

        currentClientPage = 1;
        currentClientTerm = term;

        searchClients(true, true);
    });

    if (clientLoadMoreBtn) {
        clientLoadMoreBtn.addEventListener("click", () => {
            loadMoreClients();
        });
    }

    if (contactSearchInput) {
        contactSearchInput.addEventListener("input", () => {
            if (contactListVisible) {
                filterContactsLocal();
            }
        });
    }

    if (contactToggleButton) {
        contactToggleButton.addEventListener("click", () => {
            if (!selectedClient) {
                contactStatus.textContent = "Selecciona un cliente antes de ver contactos.";
                return;
            }

            if (contactListVisible) {
                hideContactList();
                return;
            }

            if (allContacts && allContacts.length > 0) {
                filterContactsLocal();
            } else {
                loadContactsForSelectedClient();
            }
        });
    }

    document.addEventListener("click", e => {
        if (!e.target.closest("#clientSearchContainer") && clientListVisible) {
            hideClientList();
        }
        if (!e.target.closest("#contactSearchContainer") && contactListVisible) {
            hideContactList();
        }
    });

    if (transDate) {
        transDate.value = new Date().toISOString().substring(0, 10);
    }
    setStep(1);
    updateStep2Availability();
});
