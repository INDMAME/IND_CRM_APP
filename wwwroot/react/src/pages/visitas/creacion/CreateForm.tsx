import React, { useEffect, useMemo, useState, useRef } from "react";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { fetchJson } from "../../../services/apiService.ts";
import { useVisitas } from "../../../hooks/useVisitas.ts";
import ClientSearchCombobox from "../../../components/visitas/ClientSearchCombobox.tsx";
import ContactsCombobox from "../../../components/visitas/ContactsCombobox.tsx";
import { useTapGuard } from "../../../hooks/useTapGuard.ts";
import { useTopbar } from "../../../hooks/useTopbar.ts";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";
import { classNames } from "../../../utils/classNames.ts";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { showGlobalSpinner, hideGlobalSpinner } from "../../../utils/globalSpinner.ts";
import { indExtractId, indExtractSignedId } from "../../../utils/indIds.ts";
import { setPreviewAnchor, showPreviewTooltip, isOverflowing } from "../../../utils/previewTooltip.ts";
import { readAndClearTextEditorValue, TEXT_EDITOR_PREFIX } from "../../../utils/textEditor.ts";
import {
  CREATE_FRESH_PARAM,
  VISIT_DRAFT_KEY,
  CONTACTS_STORAGE_KEY,
  CONTACTS_SELECTION_KEY,
  clearCreateSelectionCache,
  stripFreshParam
} from "../../../utils/visitasStorage.ts";
import { flashActionMark, setHistoryFilterForDate } from "../../../utils/visitasHistory.ts";
import { wait } from "../../../utils/wait.ts";

function VisitasApp() {
  const { visitTypes, asistenteTipos } = useVisitas();
  const canCreateVisit = canAccess("VISITAS_CREACION", "Add");
  const canRollbackDelete = canAccess("VISITAS_HISTORIAL", "FullAccess");

  const fieldIdComentarios = "Visita.Create.Comentarios";
  const fieldIdAntecedentes = "Visita.Create.Antecedentes";
  const fieldIdConclusiones = "Visita.Create.Conclusiones";

  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const todayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const defaultVisitType = visitTypes[0]?.value ?? visitTypes[0]?.Value ?? "";
  const defaultAsistenteTipo = asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "0";

  const [visitType, setVisitType] = useState(defaultVisitType);
  const [transDate, setTransDate] = useState(() => todayString());
  const [description, setDescription] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [antecedentes, setAntecedentes] = useState("");
  const [conclusiones, setConclusiones] = useState("");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [showRequired, setShowRequired] = useState(false);
  const draftRestoredRef = useRef(false);
  const [modalError, setModalError] = useState("");

  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "OK"),
    defaultCancelText: indT("Confirm_No", "Cancel")
  });

  const handleModalConfirm = React.useCallback(async () => {
    setModalError("");
    await handleConfirm({
      busy,
      onError: (msg) => {
        setModalError(msg);
        setStatus(msg);
        flashActionMark("errorProcess", 1500);
      }
    });
  }, [busy, handleConfirm]);

  const modalLoadingText = indT("Common_Loading", "Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Cancel");
  const modalConfirmText = busy
    ? modalLoadingText
    : (!busy && modalError ? indT("Common_OK", "OK") : (modal.confirmText || indT("Confirm_Yes", "OK")));

  const handleModalButtonConfirm = React.useCallback(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, modalError, closeConfirm, handleModalConfirm]);

  // Build a draft snapshot for sessionStorage.
  const buildDraft = React.useCallback(
    () => ({
      selectedClient,
      selectedContacts,
      visitType,
      transDate,
      description,
      comentarios,
      antecedentes,
      conclusiones,
      step,
    }),
    [selectedClient, selectedContacts, visitType, transDate, description, comentarios, antecedentes, conclusiones, step]
  );

  // Store the draft before leaving the page to keep step 2 on return.
  const persistDraftNow = React.useCallback(() => {
    const draft = buildDraft();
    try {
      sessionStorage.setItem(VISIT_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* ignore quota errors */
    }
  }, [buildDraft]);

  // Opens the full-screen text editor for a multiline field.
  const openTextEditor = React.useCallback(
    (fieldId: string, fieldLabel: string, fieldValue: string, options: { allowEdit?: boolean } = {}) => {
    const safeId = String(fieldId || "").trim();
    const safeLabel = String(fieldLabel || "").trim();
    const allowEdit = options?.allowEdit !== false;
    if (!safeId || !safeLabel) return;

    try {
      const key = `${TEXT_EDITOR_PREFIX}${safeId}`;
      // Prime the editor with the current value without pushing large text into the URL.
      if (sessionStorage.getItem(key) === null) {
        sessionStorage.setItem(key, String(fieldValue || ""));
      }
    } catch {
      /* ignore */
    }

    persistDraftNow();
    const returnUrl = `${window.location.pathname}${window.location.search || ""}`;
    try {
      sessionStorage.setItem(`${TEXT_EDITOR_PREFIX}${safeId}_returnUrl`, returnUrl);
    } catch {
      /* ignore */
    }
    const url =
      `/TextEditorReact/EditField?fieldId=${encodeURIComponent(safeId)}` +
      `&fieldLabel=${encodeURIComponent(safeLabel)}` +
      `&returnUrl=${encodeURIComponent(returnUrl)}` +
      `&allowEdit=${allowEdit ? "1" : "0"}`;

    window.location.href = url;
    },
    [persistDraftNow]
  );

  const handleComentariosTap = React.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdComentarios, indT("Visits_Field_Comments", "Comments"), comentarios);
  }, [busy, comentarios, openTextEditor]);

  const handleComentariosHold = React.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);

  const handleAntecedentesTap = React.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes);
  }, [busy, antecedentes, openTextEditor]);

  const handleAntecedentesHold = React.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);

  const handleConclusionesTap = React.useCallback((event) => {
    if (busy) return;
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones);
  }, [busy, conclusiones, openTextEditor]);

  const handleConclusionesHold = React.useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(conclusiones || ""), clientY);
  }, [conclusiones]);

  const comentariosTap = useTapGuard(handleComentariosTap, handleComentariosHold);
  const antecedentesTap = useTapGuard(handleAntecedentesTap, handleAntecedentesHold);
  const conclusionesTap = useTapGuard(handleConclusionesTap, handleConclusionesHold);

  const applyTextEditorValues = React.useCallback(() => {
    const valComentarios = readAndClearTextEditorValue(fieldIdComentarios);
    if (valComentarios !== null) setComentarios(valComentarios);

    const valAntecedentes = readAndClearTextEditorValue(fieldIdAntecedentes);
    if (valAntecedentes !== null) setAntecedentes(valAntecedentes);

    const valConclusiones = readAndClearTextEditorValue(fieldIdConclusiones);
    if (valConclusiones !== null) setConclusiones(valConclusiones);
  }, [fieldIdComentarios, fieldIdAntecedentes, fieldIdConclusiones]);

  // Clear contacts only when the client changes (avoid clearing on restore/step 2 return).
  const prevClientRef = useRef(null);
  useEffect(() => {
    const current = selectedClient?.value;
    if (prevClientRef.current && prevClientRef.current !== current) {
      setSelectedContacts([]);
    }
    prevClientRef.current = current;
  }, [selectedClient?.value]);

  const lastClientRef = useRef(null);

  // If the client changes after selecting contacts, reset the entire form.
  useEffect(() => {
    const current = selectedClient?.value;
    if (!current) return;

    if (lastClientRef.current && lastClientRef.current !== current) {
      setStep(1);
      setSelectedContacts([]);
      setVisitType(defaultVisitType);
      setTransDate(todayString());
      setDescription("");
      setComentarios("");
      setAntecedentes("");
      setConclusiones("");
      setStatus("");
      setBusy(false);
    }
    lastClientRef.current = current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClient?.value]);

  // Persist draft in sessionStorage (skip until we restored any saved draft).
  useEffect(() => {
    if (!draftRestoredRef.current) return;
    const draft = buildDraft();
    try {
      sessionStorage.setItem(VISIT_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      /* ignore quota errors */
    }
  }, [buildDraft]);

  // Restore draft on mount
  useEffect(() => {
    let shouldShow = false;
    try {
      shouldShow = !!(
        sessionStorage.getItem(VISIT_DRAFT_KEY) ||
        sessionStorage.getItem(CONTACTS_STORAGE_KEY) ||
        sessionStorage.getItem(CONTACTS_SELECTION_KEY)
      );
    } catch {
      /* ignore storage access */
    }
    if (shouldShow) {
      showGlobalSpinner(indT("Common_Loading", "Loading"));
    }
    try {
      const raw = sessionStorage.getItem(VISIT_DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft?.selectedClient?.value) setSelectedClient(draft.selectedClient);
        if (Array.isArray(draft?.selectedContacts)) setSelectedContacts(draft.selectedContacts);
        if (draft?.visitType !== undefined) setVisitType(draft.visitType);
        if (draft?.transDate) setTransDate(draft.transDate);
        if (draft?.description !== undefined) setDescription(draft.description);
        if (draft?.comentarios !== undefined) setComentarios(draft.comentarios);
        if (draft?.antecedentes !== undefined) setAntecedentes(draft.antecedentes);
        if (draft?.conclusiones !== undefined) setConclusiones(draft.conclusiones);
        if (draft?.step === 2) setStep(2);
      }
    } catch {
      /* ignore parse issues */
    } finally {
      if (shouldShow) {
        hideGlobalSpinner();
      }
    }
    draftRestoredRef.current = true;
  }, []);

  // Apply pending values coming from the full-screen text editor.
  useEffect(() => {
    applyTextEditorValues();
    const onPageShow = () => applyTextEditorValues();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyTextEditorValues]);

  const canGoNext = !!selectedClient && selectedContacts.length > 0;
  const canCreate =
    !!selectedClient &&
    selectedContacts.length > 0 &&
    String(visitType || "").trim() !== "" &&
    String(visitType) !== "0" &&
    description.trim().length > 0 &&
    comentarios.trim().length > 0;

  useTopbar(
    step,
    canGoNext,
    () => {
      if (!canCreateVisit) {
        showPermissionModal();
        return;
      }
      if (step === 1 && canGoNext) setStep(2);
      if (step === 2) handleSubmit();
    },
    () => setStep(1),
    busy,
    canCreate,
    canCreateVisit
  );

  const doCreate = async () => {
    if (busy) return false;
    if (!canCreateVisit) {
      showPermissionModal();
      return false;
    }
    setModalError("");
    if (!selectedClient) {
      setStatus(indT("Visits_Create_SelectClientRequired", "Select a client."));
      return false;
    }
    if (!selectedContacts.length) {
      setStatus(indT("Visits_Create_SelectContactRequired", "Select at least one contact."));
      return false;
    }
    if (String(visitType || "") === "" || String(visitType) === "0" || !description.trim() || !comentarios.trim()) {
      setShowRequired(true);
      setStatus(indT("Visits_Create_CompleteRequired", "Complete required fields."));
      return false;
    }
    setBusy(true);
    setStatus(indT("Visits_Create_CreatingActivity", "Creating activity..."));

    let createdRecId = "";
    try {
      const payloadActivity = {
        accountNum: selectedClient.value,
        visitType,
        description,
        transDate,
        comentarios,
        antecedentes,
        conclusiones,
      };

      const resAct = await fetchJson("/Visitas/CreateActivity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadActivity),
      });

      if (!resAct.success) throw new Error(resAct.message || indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));

      const recIdActividad =
        indExtractSignedId(resAct.data) ||
        indExtractSignedId(resAct.message) ||
        indExtractSignedId(indExtractId(resAct.data) || indExtractId(resAct.message));
      if (!recIdActividad) throw new Error(indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));
      createdRecId = String(recIdActividad);

      for (let idx = 0; idx < selectedContacts.length; idx++) {
        const c = selectedContacts[idx];
        setStatus(indFormat("Visits_Create_CreatingVisitFor", "Creating visit for {0}...", c.text));
        const payloadVisita = {
          refRecIdActividad: recIdActividad,
          asistenteTipo: defaultAsistenteTipo,
          asistenteId: c.text,
          contactoRecId: c.value,
        };
        const resVis = await fetchJson("/Visitas/CreateVisitaAsistente", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadVisita),
        });
        if (!resVis.success) throw new Error(resVis.message || indT("Visits_Create_CreateVisitFailed", "Failed to create visit."));
      }

      try {
        sessionStorage.removeItem(VISIT_DRAFT_KEY);
      } catch {
        /* ignore */
      }

      setHistoryFilterForDate(transDate);
      closeConfirm();
      await wait(200);
      flashActionMark("okProcess", 1200);
      await wait(1200);
      window.location.href = "/Historial/History";
      return true;
    } catch (e) {
      if (createdRecId && canRollbackDelete) {
        try {
          setStatus(indT("Visits_Create_Rollback", "Rolling back activity..."));
          await fetchJson(`/Visitas/DeleteActivity/${encodeURIComponent(createdRecId)}`, {
            method: "DELETE",
            suppressPermissionModal: true,
          });
        } catch {
        }
      }
      const msg = e.message || indT("Visits_Create_CreateVisitError", "Failed to create the visit.");
      setModalError(msg);
      setStatus(msg);
      flashActionMark("errorProcess", 1500);
      setBusy(false);
      return false;
    }
  };

  const handleSubmit = () => {
    if (busy) return;
    if (!canCreateVisit) {
      showPermissionModal();
      return;
    }
    if (modal.open) return;
    if (!selectedClient) {
      setStatus(indT("Visits_Create_SelectClientRequired", "Select a client."));
      return;
    }
    if (!selectedContacts.length) {
      setStatus(indT("Visits_Create_SelectContactRequired", "Select at least one contact."));
      return;
    }
    if (String(visitType || "") === "" || String(visitType) === "0" || !description.trim() || !comentarios.trim()) {
      setShowRequired(true);
      setStatus(indT("Visits_Create_CompleteRequired", "Complete required fields."));
      return;
    }
    setModalError("");
    openConfirm({
      title: indT("Visits_Create_ConfirmCreate_Title", "Confirm create"),
      message: indT("Visits_Create_ConfirmCreate_Body", "Do you want to create this visit?"),
      confirmText: indT("Confirm_Yes", "OK"),
      onConfirm: doCreate,
    });
  };

  useEffect(() => {
    if (step === 1) {
      setShowRequired(false);
      closeConfirm();
    }
  }, [step, closeConfirm]);

  const visitTypeInvalid = showRequired && (String(visitType || "") === "" || String(visitType) === "0");
  const descriptionInvalid = showRequired && description.trim().length === 0;
  const comentariosInvalid = showRequired && comentarios.trim().length === 0;

  return (
    <div className="space-y-4">
      <ConfirmModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        confirmText={modalConfirmText}
        cancelText={modalCancelText}
        loadingText={modalLoadingText}
        showCancel={modal.showCancel}
        showConfirm={modal.showConfirm}
        busy={busy}
        error={modalError}
        status={status}
        onConfirm={handleModalButtonConfirm}
        onCancel={closeConfirm}
      />
      {step === 1 && (
        <div className="space-y-6">
          <ClientSearchCombobox
            value={selectedClient}
            onSelected={setSelectedClient}
            label={indT("Visits_Create_SearchClient", "Search client")}
            placeholder={indFormat("Visits_Create_ClientPlaceholder", "Type at least {0} characters...", 4)}
            portalClassName="visitas-typography"
          />

          <div className="space-y-3">
            <ContactsCombobox
              accountNum={selectedClient?.value}
              value={selectedContacts}
              onChange={setSelectedContacts}
              portalClassName="visitas-typography"
            />
            {selectedContacts.length > 0 && (
              <div className="text-xs text-slate-600">
                {indFormat("Visits_Create_SelectedContactsCount", "{0} selected contact(s)", selectedContacts.length)}
              </div>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-2xl">
          <div className="text-base font-semibold text-slate-900 border-b border-slate-200 pb-3">
            {indT("Visits_Create_VisitData_Title", "Visit details")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="visita-field-text">
              <SingleDatePicker label={indT("Visits_Detail_Date_Label", "Date")} value={transDate} onChange={setTransDate} />
            </div>
            <SelectCombobox
              label={indT("Visits_Detail_VisitType_Label", "Visit type")}
              options={visitTypes}
              value={visitType}
              onChange={setVisitType}
              placeholder={indT("Visits_Detail_VisitType_Placeholder", "Select type")}
              invalid={visitTypeInvalid}
              emitOnValueChange
              portalClassName="visitas-typography"
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <label className="form-label font-semibold">{indT("Visits_Field_Description", "Description")}</label>
              <input
                id="description"
                className={classNames(
                  "form-control",
                  descriptionInvalid
                    ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400"
                    : "border-slate-200 focus:ring-primary focus:border-primary"
                )}
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="form-label font-semibold">{indT("Visits_Field_Comments", "Comments")}</label>
              <textarea
                id="comentarios"
                  className={classNames(
                    "form-control cursor-pointer",
                    comentariosInvalid
                      ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400"
                      : "border-slate-200 focus:ring-primary focus:border-primary"
                  )}
                value={comentarios}
                readOnly
                onPointerDown={comentariosTap.onPointerDown}
                onPointerMove={comentariosTap.onPointerMove}
                onPointerUp={comentariosTap.onPointerUp}
                onPointerCancel={comentariosTap.onPointerCancel}
              />
            </div>

            <div className="space-y-2">
              <label className="form-label font-semibold">{indT("Visits_Field_Background", "Background")}</label>
                <textarea
                  id="antecedentes"
                  className="form-control cursor-pointer"
                value={antecedentes}
                readOnly
                onPointerDown={antecedentesTap.onPointerDown}
                onPointerMove={antecedentesTap.onPointerMove}
                onPointerUp={antecedentesTap.onPointerUp}
                onPointerCancel={antecedentesTap.onPointerCancel}
              />
            </div>
            <div className="space-y-2">
              <label className="form-label font-semibold">{indT("Visits_Field_Conclusions", "Conclusions")}</label>
                <textarea
                  id="conclusiones"
                  className="form-control cursor-pointer"
                value={conclusiones}
                readOnly
                onPointerDown={conclusionesTap.onPointerDown}
                onPointerMove={conclusionesTap.onPointerMove}
                onPointerUp={conclusionesTap.onPointerUp}
                onPointerCancel={conclusionesTap.onPointerCancel}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">{status}</span>
          </div>
        </div>
      )}
    </div>
  );
}

type ErrorBoundaryState = { hasError: boolean };

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-700">
          {indT("Visits_Create_ErrorBoundary", "An error occurred while rendering the visits page. Reload and try again.")}
        </div>
      );
    }
    return this.props.children;
  }
}

// Create flow UI wrapped by the error boundary.
export default function CreateForm() {
  return (
    <ErrorBoundary>
      <VisitasApp />
    </ErrorBoundary>
  );
}
