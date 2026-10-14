import { useCallback, useRef } from "react";
import { fetchJson } from "../services/apiService.ts";
import { indExtractId, indExtractSignedId } from "../utils/indIds.ts";
import { indFormat, indT } from "../utils/indI18n.ts";
import { showPermissionModal } from "../utils/permissions.ts";
import { flashActionMark, setHistoryFilterForDate } from "../utils/visitasHistory.ts";
import { CREATE_FRESH_PARAM, VISIT_CREATE_PROGRESS_KEY, VISIT_DRAFT_KEY } from "../utils/visitasStorage.ts";
import { getSessionJsonWithExpiry, removeSessionValueWithExpiry, setSessionJsonWithExpiry } from "../utils/sessionExpiry.ts";
import { wait } from "../utils/wait.ts";

type ContactOption = {
  value: string;
  text: string;
};

type VisitCreateProgress = {
  recId: string;
  signature: string;
  completedContactIds: Set<string>;
};

// Restores only valid progress in the current user and company storage scope.
const readCreateProgress = (): VisitCreateProgress | null => {
  if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has(CREATE_FRESH_PARAM)) return null;
  const stored = getSessionJsonWithExpiry<{ recId?: unknown; signature?: unknown; completedContactIds?: unknown }>(VISIT_CREATE_PROGRESS_KEY);
  if (!stored || typeof stored.recId !== "string" || !/^-?[1-9]\d*$/.test(stored.recId) || typeof stored.signature !== "string") return null;
  return {
    recId: stored.recId,
    signature: stored.signature,
    completedContactIds: new Set(Array.isArray(stored.completedContactIds) ? stored.completedContactIds.filter((id): id is string => typeof id === "string") : []),
  };
};

// Retains confirmed writes across retries and text-editor navigation.
const saveCreateProgress = (progress: VisitCreateProgress): void => {
  setSessionJsonWithExpiry(VISIT_CREATE_PROGRESS_KEY, {
    recId: progress.recId,
    signature: progress.signature,
    completedContactIds: Array.from(progress.completedContactIds),
  }, 24 * 60 * 60 * 1000);
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

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null && !Array.isArray(value);
};

const readStringLike = (value: unknown): string => {
  if (typeof value === "string" || typeof value === "number") return String(value).trim();
  return "";
};

const readFirstStringLikeProperty = (value: unknown, keys: string[]): { value: string; source: string } => {
  if (!isRecord(value)) return { value: "", source: "" };
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      const candidate = readStringLike(value[key]);
      if (candidate) return { value: candidate, source: key };
    }
  }
  return { value: "", source: "" };
};

const extractCreateActivityRecIdFromData = (data: unknown): string => {
  if (typeof data === "string" || typeof data === "number") return indExtractSignedId(data);
  const candidate = readFirstStringLikeProperty(data, [
    "RecId",
    "recId",
    "RefRecId",
    "refRecId",
    "RefRecIdActividad",
    "refRecIdActividad",
    "ActividadRecId",
    "actividadRecId",
  ]);
  return candidate.value ? indExtractSignedId(candidate.value) : "";
};

const resolveCreateActivityRecId = (response: LegacyCommandResponse): string => {
  const data = getLegacyResponseData(response);
  return (
    extractCreateActivityRecIdFromData(data) ||
    indExtractSignedId(getLegacyResponseMessage(response)) ||
    indExtractSignedId(indExtractId(data) || indExtractId(getLegacyResponseMessage(response)))
  );
};

const resolveCreateActivityOwnerForDiagnostics = (data: unknown): { value: string; source: string } => {
  return readFirstStringLikeProperty(data, [
    "OwnerAxUserId",
    "ownerAxUserId",
    "INDCreatedByUserId",
    "indCreatedByUserId",
    "CreatedByUserId",
    "createdByUserId",
    "UserId",
    "userId",
  ]);
};

const logCreateActivityDiagnostics = (response: LegacyCommandResponse, recId: string): void => {
  const debugFlag =
    typeof globalThis !== "undefined" &&
    (((globalThis as { __IND_DEBUG_CREATE__?: unknown }).__IND_DEBUG_CREATE__ === true) ||
      ((globalThis as { __IND_DEBUG_VISITAS__?: unknown }).__IND_DEBUG_VISITAS__ === true));
  if (!debugFlag) return;

  const owner = resolveCreateActivityOwnerForDiagnostics(getLegacyResponseData(response));
  console.debug("[VisitsCreate]", "activity:create-response", {
    recId,
    ownerAxUserId: owner.value,
    ownerSource: owner.source,
  });
};

// Converts select values to numeric enum payload values.
const toNullableEnumNumber = (value: string): number | null => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : null;
};

type UseCreateSubmitArgs = {
  busy: boolean;
  modalOpen: boolean;
  canCreateVisit: boolean;
  canRollbackDelete: boolean;
  selectedClient: { value: string } | null;
  selectedContacts: ContactOption[];
  visitType: string;
  contactMethod: string;
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
}: UseCreateSubmitArgs) => {
  const progressRef = useRef<VisitCreateProgress | null | undefined>(undefined);
  const createInFlightRef = useRef(false);

  const doCreate = useCallback(async () => {
    if (busy || createInFlightRef.current) return false;
    if (!canCreateVisit) {
      showPermissionModal();
      return false;
    }
    if (progressRef.current === undefined) progressRef.current = readCreateProgress();
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
    const payloadActivity = {
      accountNum: selectedClient.value,
      visitType: toNullableEnumNumber(visitType),
      contactMethod: toNullableEnumNumber(contactMethod || "0"),
      description,
      transDate,
      comentarios,
      antecedentes,
      conclusiones,
    };
    const contacts = Array.from(new Map(selectedContacts.map((contact) => [contact.value, contact])).values());
    const signature = JSON.stringify({
      activity: payloadActivity,
      assistantType: defaultAsistenteTipo,
      contacts: contacts.map((contact) => [contact.value, contact.text]).sort((left, right) => left[0].localeCompare(right[0])),
    });
    if (progressRef.current && progressRef.current.signature !== signature) {
      const message = indFormat(
        "Visits_Create_PartialChanged",
        "Activity {0} already exists. Restore the original form values to retry pending contacts, or edit the activity from history.",
        progressRef.current.recId
      );
      setModalError(message);
      setStatus(message);
      return false;
    }

    createInFlightRef.current = true;
    setBusy(true);
    setStatus(indT("Visits_Create_CreatingActivity", "Creating activity..."));

    try {
      if (!progressRef.current) {
        const resAct = await fetchJson<LegacyCommandResponse>("/Visitas/CreateActivity", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payloadActivity),
        });

        if (!getLegacyResponseSuccess(resAct)) {
          throw new Error(getLegacyResponseMessage(resAct) || indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));
        }

        const recIdActividad = resolveCreateActivityRecId(resAct);
        if (!recIdActividad) throw new Error(indT("Visits_Create_CreateActivityFailed", "Failed to create activity."));
        logCreateActivityDiagnostics(resAct, String(recIdActividad));
        progressRef.current = { recId: String(recIdActividad), signature, completedContactIds: new Set() };
        saveCreateProgress(progressRef.current);
      }
      const progress = progressRef.current;
      const recIdActividad = progress.recId;

      const pendingContacts = contacts.filter((contact) => !progress.completedContactIds.has(contact.value));
      if (pendingContacts.length > 0) {
        const assistantBatchSize = 4;
        const createAssistant = async (contact: ContactOption) => {
          const payloadVisita = {
            refRecIdActividad: recIdActividad,
            asistenteTipo: toNullableEnumNumber(defaultAsistenteTipo || "0"),
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
          progress.completedContactIds.add(contact.value);
          saveCreateProgress(progress);
        };

        for (let idx = 0; idx < pendingContacts.length; idx += assistantBatchSize) {
          const batch = pendingContacts.slice(idx, idx + assistantBatchSize);
          const first = batch[0];
          if (first) {
            setStatus(indFormat("Visits_Create_CreatingVisitFor", "Creating visit for {0}...", first.text));
          }
          // Wait for every started write before attempting compensation or enabling retry.
          const results = await Promise.all(batch.map(async (contact) => {
            try {
              await createAssistant(contact);
              return { success: true as const };
            } catch (error) {
              return { success: false as const, error };
            }
          }));
          const failure = results.find((result) => !result.success);
          if (failure && !failure.success) throw failure.error;
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
      removeSessionValueWithExpiry(VISIT_CREATE_PROGRESS_KEY);
      window.location.href = "/Historial/History";
      return true;
    } catch (e: unknown) {
      if (progressRef.current && canRollbackDelete) {
        try {
          setStatus(indT("Visits_Create_Rollback", "Rolling back activity..."));
          const rollback = await fetchJson<LegacyCommandResponse>(`/Visitas/DeleteActivity/${encodeURIComponent(progressRef.current.recId)}`, {
            method: "DELETE",
            suppressPermissionModal: true,
          });
          if (getLegacyResponseSuccess(rollback)) {
            progressRef.current = null;
            removeSessionValueWithExpiry(VISIT_CREATE_PROGRESS_KEY);
          }
        } catch {
          // Keep original error flow.
        }
      }
      const errorMessage = e instanceof Error ? e.message : indT("Visits_Create_CreateVisitError", "Failed to create the visit.");
      const msg = progressRef.current
        ? indFormat(
            "Visits_Create_PartialRetry",
            "Activity {0} was created, but some contacts are pending. Retry without changing the form to complete the same activity. {1}",
            progressRef.current.recId,
            errorMessage
          )
        : errorMessage;
      setModalError(msg);
      setStatus(msg);
      flashActionMark("errorProcess", 1500);
      setBusy(false);
      return false;
    } finally {
      createInFlightRef.current = false;
    }
  }, [
    antecedentes,
    busy,
    canCreateVisit,
    canRollbackDelete,
    closeConfirm,
    comentarios,
    conclusiones,
    contactMethod,
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
      confirmText: indT("Confirm_Yes", "Confirm_Yes"),
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
