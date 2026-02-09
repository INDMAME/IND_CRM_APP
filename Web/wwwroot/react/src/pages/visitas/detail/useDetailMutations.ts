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

type UseDetailMutationsArgs = {
  busy: boolean;
  isEditing: boolean;
  canEditHistory: boolean;
  canDeleteHistory: boolean;
  recId: string;
  accountNum: string;
  transDate: string;
  visitType: string;
  asistenteTipo: string;
  description: string;
  comentarios: string;
  antecedentes: string;
  conclusiones: string;
  visitTypes: OptionLike[];
  asistenteTipos: OptionLike[];
  defaultVisitType: string;
  rawInitialVisitType: string;
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
  asistenteTipo,
  description,
  comentarios,
  antecedentes,
  conclusiones,
  visitTypes,
  asistenteTipos,
  defaultVisitType,
  rawInitialVisitType,
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

      const payload = {
        accountNum,
        visitType: normalizedVisitType,
        asistenteTipo: normalizedAsistenteTipo,
        description,
        transDate,
        comentarios,
        antecedentes,
        conclusiones,
      };

      const safeRecId = encodeURIComponent(recId);
      const response = await fetchJson(`/Visitas/UpdateActivity/${safeRecId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.success) {
        throw new Error(response.message || indT("Visits_Detail_UpdateFailed", "Update failed."));
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
    defaultVisitType,
    description,
    isEditing,
    matchOptionValue,
    rawInitialAsistente,
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

    setModalError("");
    setBusy(true);
    setStatus(indT("Visits_Detail_Deleting", "Deleting activity..."));

    try {
      const safeRecId = encodeURIComponent(recId);
      const response = await fetchJson(`/Visitas/DeleteActivity/${safeRecId}`, { method: "DELETE" });
      if (!response.success) {
        throw new Error(response.message || indT("Visits_Detail_DeleteFailed", "Delete failed."));
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
