import React, { useEffect, useMemo, useState, useRef } from "react";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { useVisitas } from "../../../hooks/useVisitas.ts";
import ClientSearchCombobox from "../../../components/visitas/ClientSearchCombobox.tsx";
import ContactsCombobox from "../../../components/visitas/ContactsCombobox.tsx";
import { useTapGuard } from "../../../hooks/useTapGuard.ts";
import { useTopbar } from "../../../hooks/useTopbar.ts";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";
import { useCreateDraft } from "../../../hooks/useCreateDraft.ts";
import { useCreateSubmit } from "../../../hooks/useCreateSubmit.ts";
import { classNames } from "../../../utils/classNames.ts";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { setPreviewAnchor, showPreviewTooltip, isOverflowing } from "../../../utils/previewTooltip.ts";
import { readAndClearTextEditorValue, TEXT_EDITOR_PREFIX } from "../../../utils/textEditor.ts";
import { flashActionMark } from "../../../utils/visitasHistory.ts";

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

  const draftSnapshot = useMemo(
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

  const { persistDraftNow } = useCreateDraft({
    draftSnapshot,
    setSelectedClient,
    setSelectedContacts,
    setVisitType,
    setTransDate,
    setDescription,
    setComentarios,
    setAntecedentes,
    setConclusiones,
    setStep,
  });

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

    window.__indBypassNavigationGuardOnce?.();
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

  // Apply pending values coming from the full-screen text editor.
  useEffect(() => {
    applyTextEditorValues();
    const onPageShow = () => applyTextEditorValues();
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [applyTextEditorValues]);

  const canGoNext = !!selectedClient;
  const canCreate =
    !!selectedClient &&
    String(visitType || "").trim() !== "" &&
    String(visitType) !== "0" &&
    description.trim().length > 0 &&
    comentarios.trim().length > 0;

  const hasActiveProcess = useMemo(() => {
    if (busy) return true;
    if (step > 1) return true;
    if (selectedClient) return true;
    if (selectedContacts.length > 0) return true;
    return (
      description.trim().length > 0 ||
      comentarios.trim().length > 0 ||
      antecedentes.trim().length > 0 ||
      conclusiones.trim().length > 0
    );
  }, [antecedentes, busy, comentarios, conclusiones, description, selectedClient, selectedContacts.length, step]);

  useEffect(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);

  const handleTopbarPrimary = React.useCallback(() => {
    if (!canCreateVisit) {
      showPermissionModal();
      return;
    }
    if (step === 1 && canGoNext) setStep(2);
    if (step === 2) handleSubmit();
  }, [canCreateVisit, canGoNext, handleSubmit, step]);

  const handleTopbarBack = React.useCallback(() => {
    setStep(1);
  }, []);

  useTopbar(step, canGoNext, handleTopbarPrimary, handleTopbarBack, busy, canCreate, canCreateVisit);

  const { handleSubmit } = useCreateSubmit({
    busy,
    modalOpen: modal.open,
    canCreateVisit,
    canRollbackDelete,
    selectedClient,
    selectedContacts,
    visitType,
    defaultAsistenteTipo,
    description,
    transDate,
    comentarios,
    antecedentes,
    conclusiones,
    setBusy,
    setStatus,
    setModalError,
    setShowRequired,
    openConfirm,
    closeConfirm,
  });

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
