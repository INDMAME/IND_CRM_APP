import { useCallback } from "react";
import { fetchJson } from "../services/apiService.ts";
import { indExtractId, indExtractSignedId } from "../utils/indIds.ts";
import { indFormat, indT } from "../utils/indI18n.ts";
import { showPermissionModal } from "../utils/permissions.ts";
import { flashActionMark, setHistoryFilterForDate } from "../utils/visitasHistory.ts";
import { VISIT_DRAFT_KEY } from "../utils/visitasStorage.ts";
import { wait } from "../utils/wait.ts";

type ContactOption = {
  value: string;
  text: string;
};

type LegacyCommandResponse = {
  success?: boolean;
  message?: string;
  data?: unknown;
  Success?: boolean;
  Message?: string;
  Data?: unknown;
};

const getLegacyResponseSuccess = (response: LegacyCommandResponse): boolean => {
  return response.success === true || response.Success === true;
};

const getLegacyResponseMessage = (response: LegacyCommandResponse): string => {
  const rawMessage = response.message ?? response.Message;
  return typeof rawMessage === "string" ? rawMessage.trim() : "";
};

const getLegacyResponseData = (response: LegacyCommandResponse): unknown => {
  return response.data ?? response.Data;
};

type UseCreateSubmitArgs = {
  busy: boolean;
  modalOpen: boolean;
  canCreateVisit: boolean;
  canRollbackDelete: boolean;
  selectedClient: { value: string } | null;
  selectedContacts: ContactOption[];
  visitType: string;
  defaultAsistenteTipo: string;
  description: string;
  transDate: string;
  comentarios: string;
  antecedentes: string;
  conclusiones: string;
  setBusy: (value: boolean) => void;
  setStatus: (value: string) => void;
  setModalError: (value: string) => void;
  setShowRequired: (value: boolean) => void;
  openConfirm: (opts: {
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => Promise<boolean | void> | boolean | void;
  }) => void;
  closeConfirm: () => void;
};

// Owns create/confirm flow so form component stays focused on UI fields.
export const useCreateSubmit = ({
  busy,
  modalOpen,
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
}: UseCreateSubmitArgs) => {
  const doCreate = useCallback(async () => {
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

      const resAct = await fetchJson<LegacyCommandResponse>("/Visitas/CreateActivity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadActivity),
      });

      if (!getLegacyResponseSuccess(resAct)) {
        throw new Error(getLegacyResponseMessage(resAct) || indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));
      }

      const recIdActividad =
        indExtractSignedId(getLegacyResponseData(resAct)) ||
        indExtractSignedId(getLegacyResponseMessage(resAct)) ||
        indExtractSignedId(indExtractId(getLegacyResponseData(resAct)) || indExtractId(getLegacyResponseMessage(resAct)));
      if (!recIdActividad) throw new Error(indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));
      createdRecId = String(recIdActividad);

      if (selectedContacts.length > 0) {
        const assistantBatchSize = 4;
        const createAssistant = async (contact: ContactOption) => {
          const payloadVisita = {
            refRecIdActividad: recIdActividad,
            asistenteTipo: defaultAsistenteTipo,
            asistenteId: contact.text,
            contactoRecId: contact.value,
          };
          const resVis = await fetchJson<LegacyCommandResponse>("/Visitas/CreateVisitaAsistente", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payloadVisita),
          });
          if (!getLegacyResponseSuccess(resVis)) {
            throw new Error(getLegacyResponseMessage(resVis) || indT("Visits_Create_CreateVisitFailed", "Failed to create visit."));
          }
        };

        for (let idx = 0; idx < selectedContacts.length; idx += assistantBatchSize) {
          const batch = selectedContacts.slice(idx, idx + assistantBatchSize);
          const first = batch[0];
          if (first) {
            setStatus(indFormat("Visits_Create_CreatingVisitFor", "Creating visit for {0}...", first.text));
          }
          await Promise.all(batch.map((contact) => createAssistant(contact)));
        }
      }

      try {
        sessionStorage.removeItem(VISIT_DRAFT_KEY);
      } catch {
        // Ignore storage errors.
      }

      setHistoryFilterForDate(transDate, true);
      closeConfirm();
      await wait(200);
      flashActionMark("okProcess", 1200);
      await wait(1200);
      window.__indBypassNavigationGuardOnce?.();
      window.location.href = "/Historial/History";
      return true;
    } catch (e: unknown) {
      if (createdRecId && canRollbackDelete) {
        try {
          setStatus(indT("Visits_Create_Rollback", "Rolling back activity..."));
          await fetchJson(`/Visitas/DeleteActivity/${encodeURIComponent(createdRecId)}`, {
            method: "DELETE",
            suppressPermissionModal: true,
          });
        } catch {
          // Keep original error flow.
        }
      }
      const msg = e instanceof Error ? e.message : indT("Visits_Create_CreateVisitError", "Failed to create the visit.");
      setModalError(msg);
      setStatus(msg);
      flashActionMark("errorProcess", 1500);
      setBusy(false);
      return false;
    }
  }, [
    antecedentes,
    busy,
    canCreateVisit,
    canRollbackDelete,
    closeConfirm,
    comentarios,
    conclusiones,
    defaultAsistenteTipo,
    description,
    selectedClient,
    selectedContacts,
    setBusy,
    setModalError,
    setShowRequired,
    setStatus,
    transDate,
    visitType,
  ]);

  const handleSubmit = useCallback(() => {
    if (busy) return;
    if (!canCreateVisit) {
      showPermissionModal();
      return;
    }
    if (modalOpen) return;
    if (!selectedClient) {
      setStatus(indT("Visits_Create_SelectClientRequired", "Select a client."));
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
  }, [
    busy,
    canCreateVisit,
    comentarios,
    description,
    doCreate,
    modalOpen,
    openConfirm,
    selectedClient,
    setModalError,
    setShowRequired,
    setStatus,
    visitType,
  ]);

  return {
    doCreate,
    handleSubmit,
  };
};
