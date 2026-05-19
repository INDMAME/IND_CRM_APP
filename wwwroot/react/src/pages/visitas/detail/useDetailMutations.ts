import React, { useCallback } from "react";
import { fetchJson } from "../../../services/apiService.ts";
import { indT } from "../../../utils/indI18n.ts";
import { showPermissionModal } from "../../../utils/permissions.ts";
import { flashActionMark } from "../../../utils/visitasHistory.ts";

type OptionLike = {
  value?: string | number;
  Value?: string | number;
  text?: string;
  Text?: string;
};

type VisitCommandResponse = {
  success?: boolean;
  message?: string;
  Success?: boolean;
  Message?: string;
};

const isCommandSuccess = (response: VisitCommandResponse): boolean => {
  return response.success === true || response.Success === true;
};

const getCommandMessage = (response: VisitCommandResponse): string => {
  const raw = response.message ?? response.Message;
  return typeof raw === "string" ? raw.trim() : "";
};

// Keep recId as a normalized signed integer string to avoid long precision loss in JS numbers.
const resolveSafeRecId = (rawRecId: string): string | null => {
  const normalized = String(rawRecId ?? "").trim();
  if (!normalized) return null;

  if (!/^-?\d+$/.test(normalized)) return null;

  const absoluteDigits = normalized.startsWith("-") ? normalized.slice(1) : normalized;
  if (!absoluteDigits || /^0+$/.test(absoluteDigits)) return null;

  return normalized;
};

const shouldLogRecIdInDev = (): boolean => {
  if (typeof window === "undefined" || !window.location) return false;
  const host = String(window.location.hostname || "").trim().toLowerCase();
  return host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
};

const logSafeRecIdInDev = (operation: "update" | "delete", safeRecId: string): void => {
  if (!shouldLogRecIdInDev()) return;
  console.info(`[visitas-detail] ${operation} recId`, safeRecId);
};

type UseDetailMutationsArgs = {
  busy: boolean;
  isEditing: boolean;
  canEditHistory: boolean;
  canDeleteHistory: boolean;
  recId: string;
  accountNum: string;
  transDate: string;
  visitType: string;
  contactMethod: string;
  asistenteTipo: string;
  description: string;
  comentarios: string;
  antecedentes: string;
  conclusiones: string;
  visitTypes: OptionLike[];
  contactMethods: OptionLike[];
  asistenteTipos: OptionLike[];
  defaultVisitType: string;
  rawInitialVisitType: string;
  rawInitialContactMethod: string;
  rawInitialAsistente: string;
  matchOptionValue: (options: OptionLike[], raw: unknown) => string;
  clearDraft: () => void;
  syncEditModeFlag: (enabled: boolean) => void;
  setModalError: React.Dispatch<React.SetStateAction<string>>;
  setBusy: React.Dispatch<React.SetStateAction<boolean>>;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

// Encapsulates update and delete mutations for detail form state.
export const useDetailMutations = ({
  busy,
  isEditing,
  canEditHistory,
  canDeleteHistory,
  recId,
  accountNum,
  transDate,
  visitType,
  contactMethod,
  asistenteTipo,
  description,
  comentarios,
  antecedentes,
  conclusiones,
  visitTypes,
  contactMethods,
  asistenteTipos,
  defaultVisitType,
  rawInitialVisitType,
  rawInitialContactMethod,
  rawInitialAsistente,
  matchOptionValue,
  clearDraft,
  syncEditModeFlag,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing,
}: UseDetailMutationsArgs) => {
  const handleUpdate = useCallback(async () => {
    if (busy || !isEditing) return false;
    if (!canEditHistory) {
      showPermissionModal();
      return false;
    }

    const safeRecIdValue = resolveSafeRecId(recId);
    if (safeRecIdValue === null) {
      const message = indT("Visits_Detail_InvalidRecId", "Could not resolve activity identifier. Reload and try again.");
      setModalError(message);
      setStatus(message);
      flashActionMark("errorProcess", 1500);
      return false;
    }

    setModalError("");
    setBusy(true);
    setStatus(indT("Visits_Detail_Updating", "Updating activity..."));

    try {
      const normalizedVisitType =
        matchOptionValue(visitTypes, visitType) ||
        matchOptionValue(visitTypes, rawInitialVisitType) ||
        defaultVisitType;
      const normalizedAsistenteTipo =
        matchOptionValue(asistenteTipos, asistenteTipo) ||
        matchOptionValue(asistenteTipos, rawInitialAsistente) ||
        rawInitialAsistente;
      const normalizedContactMethod =
        matchOptionValue(contactMethods, contactMethod) ||
        matchOptionValue(contactMethods, rawInitialContactMethod);
      const contactMethodValue = Number(normalizedContactMethod);

      const payload = {
        accountNum,
        visitType: normalizedVisitType,
        contactMethod: Number.isFinite(contactMethodValue) ? contactMethodValue : null,
        asistenteTipo: normalizedAsistenteTipo,
        description,
        transDate,
        comentarios,
        antecedentes,
        conclusiones,
      };

      logSafeRecIdInDev("update", safeRecIdValue);
      const safeRecId = encodeURIComponent(safeRecIdValue);
      const response = await fetchJson<VisitCommandResponse>(`/Visitas/UpdateActivity/${safeRecId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!isCommandSuccess(response)) {
        throw new Error(getCommandMessage(response) || indT("Visits_Detail_UpdateFailed", "Update failed."));
      }

      setStatus(indT("Visits_Detail_Updated", "Activity updated"));
      setIsEditing(false);
      syncEditModeFlag(false);
      clearDraft();
      return true;
    } catch (error) {
      const message = error instanceof Error && error.message
        ? error.message
        : indT("Visits_Detail_UpdateError", "Update error.");
      setModalError(message);
      setStatus(message);
      flashActionMark("errorProcess", 1500);
      return false;
    } finally {
      setBusy(false);
    }
  }, [
    accountNum,
    antecedentes,
    asistenteTipo,
    asistenteTipos,
    busy,
    canEditHistory,
    clearDraft,
    comentarios,
    conclusiones,
    contactMethod,
    contactMethods,
    defaultVisitType,
    description,
    isEditing,
    matchOptionValue,
    rawInitialAsistente,
    rawInitialContactMethod,
    rawInitialVisitType,
    recId,
    setBusy,
    setIsEditing,
    setModalError,
    setStatus,
    syncEditModeFlag,
    transDate,
    visitType,
    visitTypes,
  ]);

  const handleDelete = useCallback(async () => {
    if (busy) return false;
    if (!canDeleteHistory) {
      showPermissionModal();
      return false;
    }

    const safeRecIdValue = resolveSafeRecId(recId);
    if (safeRecIdValue === null) {
      const message = indT("Visits_Detail_InvalidRecId", "Could not resolve activity identifier. Reload and try again.");
      setModalError(message);
      setStatus(message);
      flashActionMark("errorProcess", 1500);
      return false;
    }

    setModalError("");
    setBusy(true);
    setStatus(indT("Visits_Detail_Deleting", "Deleting activity..."));

    try {
      logSafeRecIdInDev("delete", safeRecIdValue);
      const safeRecId = encodeURIComponent(safeRecIdValue);
      const response = await fetchJson<VisitCommandResponse>(`/Visitas/DeleteActivity/${safeRecId}`, { method: "DELETE" });
      if (!isCommandSuccess(response)) {
        throw new Error(getCommandMessage(response) || indT("Visits_Detail_DeleteFailed", "Delete failed."));
      }

      setStatus(indT("Visits_Detail_Deleted", "Activity deleted"));
      return true;
    } catch (error) {
      const message = error instanceof Error && error.message
        ? error.message
        : indT("Visits_Detail_DeleteError", "Delete error.");
      setModalError(message);
      setStatus(message);
      flashActionMark("errorProcess", 1500);
      return false;
    } finally {
      setBusy(false);
    }
  }, [busy, canDeleteHistory, recId, setBusy, setModalError, setStatus]);

  return {
    handleUpdate,
    handleDelete,
  };
};
