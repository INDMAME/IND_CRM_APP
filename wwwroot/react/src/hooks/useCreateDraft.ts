import { useCallback, useEffect, useRef } from "react";
import { showGlobalSpinner, hideGlobalSpinner } from "../utils/globalSpinner.ts";
import {
  CREATE_FRESH_PARAM,
  VISIT_DRAFT_KEY,
  CONTACTS_STORAGE_KEY,
  CONTACTS_SELECTION_KEY,
  clearCreateSelectionCache,
  stripFreshParam,
} from "../utils/visitasStorage.ts";
import { indT } from "../utils/indI18n.ts";

type DraftSnapshot = {
  selectedClient: any;
  selectedContacts: any[];
  visitType: string;
  transDate: string;
  description: string;
  comentarios: string;
  antecedentes: string;
  conclusiones: string;
  step: number;
};

type UseCreateDraftArgs = {
  draftSnapshot: DraftSnapshot;
  setSelectedClient: (value: any) => void;
  setSelectedContacts: (value: any[]) => void;
  setVisitType: (value: string) => void;
  setTransDate: (value: string) => void;
  setDescription: (value: string) => void;
  setComentarios: (value: string) => void;
  setAntecedentes: (value: string) => void;
  setConclusiones: (value: string) => void;
  setStep: (value: number) => void;
};

// Handles visit-create draft save/restore lifecycle.
export const useCreateDraft = ({
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
}: UseCreateDraftArgs) => {
  const draftRestoredRef = useRef(false);
  const draftPersistTimerRef = useRef<number | null>(null);

  const persistDraftSnapshot = useCallback((draft: DraftSnapshot) => {
    try {
      sessionStorage.setItem(VISIT_DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // Ignore storage quota errors.
    }
  }, []);

  const persistDraftNow = useCallback(() => {
    persistDraftSnapshot(draftSnapshot);
  }, [draftSnapshot, persistDraftSnapshot]);

  useEffect(() => {
    if (!draftRestoredRef.current) return;

    if (draftPersistTimerRef.current) {
      clearTimeout(draftPersistTimerRef.current);
    }

    draftPersistTimerRef.current = window.setTimeout(() => {
      draftPersistTimerRef.current = null;
      persistDraftSnapshot(draftSnapshot);
    }, 180);

    return () => {
      if (draftPersistTimerRef.current) {
        clearTimeout(draftPersistTimerRef.current);
        draftPersistTimerRef.current = null;
      }
    };
  }, [draftSnapshot, persistDraftSnapshot]);

  useEffect(() => {
    let freshLoad = false;
    try {
      const url = new URL(window.location.href);
      freshLoad = url.searchParams.has(CREATE_FRESH_PARAM);
    } catch {
      freshLoad = false;
    }

    if (freshLoad) {
      clearCreateSelectionCache();
      stripFreshParam();
      draftRestoredRef.current = true;
      return;
    }

    let shouldShow = false;
    try {
      shouldShow = !!(
        sessionStorage.getItem(VISIT_DRAFT_KEY) ||
        sessionStorage.getItem(CONTACTS_STORAGE_KEY) ||
        sessionStorage.getItem(CONTACTS_SELECTION_KEY)
      );
    } catch {
      // Ignore storage access errors.
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
      // Ignore malformed draft payloads.
    } finally {
      if (shouldShow) {
        hideGlobalSpinner();
      }
    }
    draftRestoredRef.current = true;
  }, [
    setAntecedentes,
    setComentarios,
    setConclusiones,
    setDescription,
    setSelectedClient,
    setSelectedContacts,
    setStep,
    setTransDate,
    setVisitType,
  ]);

  return {
    persistDraftNow,
  };
};
