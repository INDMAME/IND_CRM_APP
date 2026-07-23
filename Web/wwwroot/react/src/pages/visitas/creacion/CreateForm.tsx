import React, { useEffect, useMemo, useState, useRef } from "react";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import AppErrorBoundary from "../../../components/commons/AppErrorBoundary.tsx";
import { useVisitas } from "../../../hooks/useVisitas.ts";
import { useTapGuard } from "../../../hooks/useTapGuard.ts";
import { useTopbar } from "../../../hooks/useTopbar.ts";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";
import { useCreateDraft } from "../../../hooks/useCreateDraft.ts";
import { useCreateSubmit } from "../../../hooks/useCreateSubmit.ts";
import { useTextEditorFields } from "../../../hooks/useTextEditorFields.ts";
import CreateStepClientSelection, { CreateSelectedClient, CreateSelectedContact } from "./CreateStepClientSelection.tsx";
import CreateStepVisitDetails from "./CreateStepVisitDetails.tsx";
import { classNames } from "../../../utils/classNames.ts";
import { indFormat, indT } from "../../../utils/indI18n.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { setPreviewAnchor, showPreviewTooltip, isOverflowing } from "../../../utils/previewTooltip.ts";
import { navigateToTextEditorField } from "../../../utils/textEditorNavigation.ts";
import { flashActionMark } from "../../../utils/visitasHistory.ts";

function VisitasApp() {
  const { visitTypes, contactMethods, asistenteTipos } = useVisitas();
  const canCreateVisit = canAccess("VISITAS_GESTION", "Add");
  const canRollbackDelete = canAccess("VISITAS_GESTION", "FullAccess");

  const fieldIdComentarios = "Visita.Create.Comentarios";
  const fieldIdAntecedentes = "Visita.Create.Antecedentes";
  const fieldIdConclusiones = "Visita.Create.Conclusiones";

  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState<CreateSelectedClient>(null);
  const [selectedContacts, setSelectedContacts] = useState<CreateSelectedContact[]>([]);
  const todayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const defaultVisitType = String(visitTypes[0]?.value ?? visitTypes[0]?.Value ?? "");
  const defaultContactMethod = String(contactMethods[0]?.value ?? contactMethods[0]?.Value ?? "0");
  const defaultAsistenteTipo = String(asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "0");

  const [visitType, setVisitType] = useState<string>(defaultVisitType);
  const [contactMethod, setContactMethod] = useState<string>(defaultContactMethod);
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
    defaultConfirmText: indT("Confirm_Yes", "Confirm_Yes"),
    defaultCancelText: indT("Confirm_No", "Confirm_No")
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

  const modalLoadingText = indT("Common_Loading", "Common_Loading");
  const modalCancelText = modal.cancelText || indT("Confirm_No", "Confirm_No");
  const modalConfirmText = busy
    ? modalLoadingText
    : (!busy && modalError ? indT("Common_OK", "Common_OK") : (modal.confirmText || indT("Confirm_Yes", "Confirm_Yes")));

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
      contactMethod,
      transDate,
      description,
      comentarios,
      antecedentes,
      conclusiones,
      step,
    }),
    [selectedClient, selectedContacts, visitType, contactMethod, transDate, description, comentarios, antecedentes, conclusiones, step]
  );

  const { persistDraftNow, discardDraftNow, resetDraftForClientChange } = useCreateDraft({
    draftSnapshot,
    setSelectedClient,
    setSelectedContacts,
    setVisitType,
    setContactMethod,
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
      navigateToTextEditorField({
        fieldId,
        fieldLabel,
        fieldValue,
        allowEdit: options?.allowEdit !== false,
        beforeNavigate: persistDraftNow,
      });
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

  const textEditorBindings = useMemo(
    () => [
      { fieldId: fieldIdComentarios, applyValue: setComentarios },
      { fieldId: fieldIdAntecedentes, applyValue: setAntecedentes },
      { fieldId: fieldIdConclusiones, applyValue: setConclusiones },
    ],
    [fieldIdAntecedentes, fieldIdComentarios, fieldIdConclusiones]
  );

  useTextEditorFields(textEditorBindings);

  const lastClientValueRef = useRef("");

  // Keeps restored drafts from looking like a new account selection.
  useEffect(() => {
    const currentValue = String(selectedClient?.value || "").trim();
    if (currentValue) {
      lastClientValueRef.current = currentValue;
    }
  }, [selectedClient?.value]);

  // Applies account-change resets directly from the selection event.
  const handleClientSelected = React.useCallback(
    (nextClient: CreateSelectedClient) => {
      const previousValue = lastClientValueRef.current;
      const nextValue = String(nextClient?.value || "").trim();

      if (previousValue && previousValue !== nextValue) {
        if (!nextValue) {
          setSelectedContacts([]);
          setSelectedClient(nextClient);
          return;
        }

        resetDraftForClientChange({
          visitType: defaultVisitType,
          contactMethod: defaultContactMethod,
          transDate: todayString(),
        });
        setStatus("");
        setBusy(false);
      }

      if (nextValue) {
        lastClientValueRef.current = nextValue;
      }
      setSelectedClient(nextClient);
    },
    [defaultContactMethod, defaultVisitType, resetDraftForClientChange]
  );

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
      contactMethod !== defaultContactMethod ||
      comentarios.trim().length > 0 ||
      antecedentes.trim().length > 0 ||
      conclusiones.trim().length > 0
    );
  }, [antecedentes, busy, comentarios, conclusiones, contactMethod, defaultContactMethod, description, selectedClient, selectedContacts.length, step]);

  useEffect(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);

  const { handleSubmit } = useCreateSubmit({
    busy,
    modalOpen: modal.open,
    canCreateVisit,
    canRollbackDelete,
    selectedClient,
    selectedContacts,
    visitType,
    contactMethod,
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

  const handleCancelCreation = React.useCallback(() => {
    if (busy || modal.open) return;

    setModalError("");
    openConfirm({
      title: indT("Common_Cancel", "Cancel"),
      message: indT(
        "Navigation_ActiveProcess_ConfirmLeave",
        "Your active process will be canceled and unsaved changes will be lost. Do you want to continue?"
      ),
      confirmText: indT("Confirm_Yes", "Yes"),
      onConfirm: () => {
        discardDraftNow();
        window.__indBypassNavigationGuardOnce?.();
        window.location.href = "/Historial/History";
        return true;
      },
    });
  }, [busy, discardDraftNow, modal.open, openConfirm]);

  useTopbar(
    step,
    canGoNext,
    handleTopbarPrimary,
    handleTopbarBack,
    handleCancelCreation,
    busy || modal.open,
    canCreate,
    canCreateVisit
  );

  useEffect(() => {
    if (step === 1) {
      setShowRequired(false);
      closeConfirm();
    }
  }, [step, closeConfirm]);

  const visitTypeInvalid = showRequired && (String(visitType || "") === "" || String(visitType) === "0");
  const descriptionInvalid = showRequired && description.trim().length === 0;
  const comentariosInvalid = showRequired && comentarios.trim().length === 0;
  const descriptionInputClassName = classNames(
    "form-control",
    descriptionInvalid
      ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400"
      : "border-slate-200 focus:ring-primary focus:border-primary"
  );
  const comentariosClassName = classNames(
    "form-control cursor-pointer",
    comentariosInvalid
      ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400"
      : "border-slate-200 focus:ring-primary focus:border-primary"
  );
  const descriptionLabel = indT("Visits_Field_Description", "Description");
  const commentsLabel = indT("Visits_Field_Comments", "Comments");
  const backgroundLabel = indT("Visits_Field_Background", "Background");
  const conclusionsLabel = indT("Visits_Field_Conclusions", "Conclusions");

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
        <CreateStepClientSelection
          selectedClient={selectedClient}
          selectedContacts={selectedContacts}
          onClientSelected={handleClientSelected}
          onContactsChange={setSelectedContacts}
          clientLabel={indT("History_Filter_Client", "Account")}
          clientPlaceholder={indFormat("Visits_Create_ClientPlaceholder", "Type at least {0} characters...", 4)}
          selectedContactsCountText={indFormat(
            "Visits_Create_SelectedContactsCount",
            "{0} selected contact(s)",
            selectedContacts.length
          )}
        />
      )}

      {step === 2 && (
        <CreateStepVisitDetails
          title={indT("Visits_Create_VisitData_Title", "Visit details")}
          dateLabel={indT("Visits_Detail_Date_Label", "Date")}
          transDate={transDate}
          onTransDateChange={setTransDate}
          visitTypeLabel={indT("Visits_Detail_VisitType_Label", "Visit type")}
          visitTypes={visitTypes}
          visitType={visitType}
          onVisitTypeChange={setVisitType}
          visitTypePlaceholder={indT("Visits_Detail_VisitType_Placeholder", "Select type")}
          visitTypeInvalid={visitTypeInvalid}
          contactMethodLabel={indT("Visits_Detail_ContactMethod_Label", "Contact channel")}
          contactMethods={contactMethods}
          contactMethod={contactMethod}
          onContactMethodChange={setContactMethod}
          contactMethodPlaceholder={indT("Visits_Detail_ContactMethod_Placeholder", "Select method")}
          descriptionLabel={descriptionLabel}
          descriptionValue={description}
          descriptionClassName={descriptionInputClassName}
          onDescriptionChange={setDescription}
          tapFields={[
            {
              id: "comentarios",
              label: commentsLabel,
              value: comentarios,
              className: comentariosClassName,
              pointerBindings: comentariosTap,
            },
            {
              id: "antecedentes",
              label: backgroundLabel,
              value: antecedentes,
              className: "form-control cursor-pointer",
              pointerBindings: antecedentesTap,
            },
            {
              id: "conclusiones",
              label: conclusionsLabel,
              value: conclusiones,
              className: "form-control cursor-pointer",
              pointerBindings: conclusionesTap,
            },
          ]}
          status={status}
        />
      )}
    </div>
  );
}

// Create flow UI wrapped by the error boundary.
export default function CreateForm() {
  return (
    <AppErrorBoundary fallbackMessage={indT("Visits_Create_ErrorBoundary", "An error occurred while rendering the visits page. Reload and try again.")}>
      <VisitasApp />
    </AppErrorBoundary>
  );
}
