import React, { useCallback, useEffect, useRef } from "react";
import { getSessionValueWithExpiry, removeSessionValueWithExpiry, setSessionValueWithExpiry } from "../../../utils/sessionExpiry.ts";

const EDIT_MODE_TTL_MS = 6 * 60 * 60 * 1000;
const DETAIL_DRAFT_TTL_MS = 24 * 60 * 60 * 1000;

type UseDetailEditSessionArgs = {
  actividadId: string;
  recId: string;
  canEditHistory: boolean;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  transDate: string;
  visitType: string;
  contactMethod: string;
  asistenteTipo: string;
  description: string;
  comentarios: string;
  antecedentes: string;
  conclusiones: string;
  setTransDate: React.Dispatch<React.SetStateAction<string>>;
  setVisitType: React.Dispatch<React.SetStateAction<string>>;
  setContactMethod: React.Dispatch<React.SetStateAction<string>>;
  setAsistenteTipo: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setComentarios: React.Dispatch<React.SetStateAction<string>>;
  setAntecedentes: React.Dispatch<React.SetStateAction<string>>;
  setConclusiones: React.Dispatch<React.SetStateAction<string>>;
};

type DetailDraftValues = {
  transDate: string;
  visitType: string;
  contactMethod: string;
  asistenteTipo: string;
  description: string;
  comentarios: string;
  antecedentes: string;
  conclusiones: string;
};

// Manages edit-mode session flags and detail draft persistence.
export const useDetailEditSession = ({
  actividadId,
  recId,
  canEditHistory,
  isEditing,
  setIsEditing,
  transDate,
  visitType,
  contactMethod,
  asistenteTipo,
  description,
  comentarios,
  antecedentes,
  conclusiones,
  setTransDate,
  setVisitType,
  setContactMethod,
  setAsistenteTipo,
  setDescription,
  setComentarios,
  setAntecedentes,
  setConclusiones,
}: UseDetailEditSessionArgs) => {
  const editModeKeyRef = useRef("");
  const draftKeyRef = useRef("");
  const draftPersistTimerRef = useRef<number | null>(null);

  // Persist edit mode while user navigates to the text editor and back.
  const syncEditModeFlag = useCallback((enabled: boolean) => {
    const key = editModeKeyRef.current;
    if (!key) return;
    if (enabled) {
      setSessionValueWithExpiry(key, "true", EDIT_MODE_TTL_MS);
      return;
    }
    removeSessionValueWithExpiry(key);
  }, []);

  const syncEditModeOnEntry = useCallback(() => {
    const baseId = actividadId || recId || "default";
    const key = `ind_visit_edit_${baseId}`;
    const returnKey = `${key}_return`;
    const draftKey = `ind_visit_draft_${baseId}`;
    editModeKeyRef.current = key;

    try {
      const allowRestore = getSessionValueWithExpiry(returnKey) === "1";
      if (allowRestore) {
        removeSessionValueWithExpiry(returnKey);
      }

      if (canEditHistory && allowRestore && getSessionValueWithExpiry(key) === "true") {
        setIsEditing(true);
      } else {
        setIsEditing(false);
        removeSessionValueWithExpiry(key);
        removeSessionValueWithExpiry(draftKey);
      }

      if (!canEditHistory) {
        removeSessionValueWithExpiry(key);
        removeSessionValueWithExpiry(draftKey);
      }
    } catch {
      /* ignore */
    }
  }, [actividadId, canEditHistory, recId, setIsEditing]);

  useEffect(() => {
    syncEditModeOnEntry();
  }, [syncEditModeOnEntry]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      const navEntry = typeof performance !== "undefined" && performance.getEntriesByType
        ? (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)
        : undefined;
      const isBackForward = navEntry?.type === "back_forward";
      if (event?.persisted || isBackForward) {
        syncEditModeOnEntry();
      }
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [syncEditModeOnEntry]);

  useEffect(() => {
    const key = `ind_visit_draft_${actividadId || recId || "default"}`;
    draftKeyRef.current = key;
  }, [actividadId, recId]);

  const saveDraft = useCallback((draft: DetailDraftValues) => {
    const key = draftKeyRef.current;
    if (!key) return;
    setSessionValueWithExpiry(key, JSON.stringify(draft), DETAIL_DRAFT_TTL_MS);
  }, []);

  const clearDraft = useCallback(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    removeSessionValueWithExpiry(key);
  }, []);

  const applyDraftValues = useCallback(() => {
    const key = draftKeyRef.current;
    if (!key) return;

    try {
      const raw = getSessionValueWithExpiry(key);
      if (!raw) return;
      const draft = JSON.parse(raw) as Partial<DetailDraftValues>;
      if (!draft || typeof draft !== "object") return;

      if (draft.transDate !== undefined) setTransDate(String(draft.transDate));
      if (draft.visitType !== undefined) setVisitType(String(draft.visitType));
      if (draft.contactMethod !== undefined) setContactMethod(String(draft.contactMethod));
      if (draft.asistenteTipo !== undefined) setAsistenteTipo(String(draft.asistenteTipo));
      if (draft.description !== undefined) setDescription(String(draft.description));
      if (draft.comentarios !== undefined) setComentarios(String(draft.comentarios));
      if (draft.antecedentes !== undefined) setAntecedentes(String(draft.antecedentes));
      if (draft.conclusiones !== undefined) setConclusiones(String(draft.conclusiones));
    } catch {
      /* ignore */
    }
  }, [setAntecedentes, setAsistenteTipo, setComentarios, setConclusiones, setContactMethod, setDescription, setTransDate, setVisitType]);

  useEffect(() => {
    if (!isEditing) {
      if (draftPersistTimerRef.current) {
        clearTimeout(draftPersistTimerRef.current);
        draftPersistTimerRef.current = null;
      }
      return;
    }

    if (draftPersistTimerRef.current) {
      clearTimeout(draftPersistTimerRef.current);
    }

    draftPersistTimerRef.current = window.setTimeout(() => {
      draftPersistTimerRef.current = null;
      saveDraft({
        transDate,
        visitType,
        contactMethod,
        asistenteTipo,
        description,
        comentarios,
        antecedentes,
        conclusiones,
      });
    }, 180);

    return () => {
      if (draftPersistTimerRef.current) {
        clearTimeout(draftPersistTimerRef.current);
        draftPersistTimerRef.current = null;
      }
    };
  }, [antecedentes, asistenteTipo, comentarios, conclusiones, contactMethod, description, isEditing, saveDraft, transDate, visitType]);

  return {
    editModeKeyRef,
    syncEditModeFlag,
    clearDraft,
    applyDraftValues,
  };
};
