import { useCallback, useEffect, useRef } from "react";
import { showGlobalSpinner, hideGlobalSpinner } from "../utils/globalSpinner.ts";
import {
  CREATE_FRESH_PARAM,
  VISIT_DRAFT_KEY,
  clearCreateSelectionCache,
  hasCreateSelectionCache,
  stripFreshParam,
} from "../utils/visitasStorage.ts";
import { indT } from "../utils/indI18n.ts";
import { getSessionJsonWithExpiry, setSessionJsonWithExpiry } from "../utils/sessionExpiry.ts";

const CREATE_DRAFT_TTL_MS = 24 * 60 * 60 * 1000;

type DraftSnapshot = {
  selectedClient: any;
  selectedContacts: any[];
  visitType: string;
  contactMethod: string;
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
  setContactMethod: (value: string) => void;
  setTransDate: (value: string) => void;
  setDescription: (value: string) => void;
  setComentarios: (value: string) => void;
  setAntecedentes: (value: string) => void;
  setConclusiones: (value: string) => void;
  setStep: (value: number) => void;
};

type CreateDraftDefaults = {
  visitType: string;
  contactMethod: string;
  transDate: string;
};

// Handles visit-create draft save/restore lifecycle.
export const useCreateDraft = ({
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
}: UseCreateDraftArgs) => {
  const draftRestoredRef = useRef(false);
  const draftPersistTimerRef = useRef<number | null>(null);

  const persistDraftSnapshot = useCallback((draft: DraftSnapshot) => {
    setSessionJsonWithExpiry(VISIT_DRAFT_KEY, draft, CREATE_DRAFT_TTL_MS);
  }, []);

  const persistDraftNow = useCallback(() => {
    persistDraftSnapshot(draftSnapshot);
  }, [draftSnapshot, persistDraftSnapshot]);

  // Stops pending persistence and removes all state owned by visit creation.
  const discardDraftNow = useCallback(() => {
    if (draftPersistTimerRef.current) {
      clearTimeout(draftPersistTimerRef.current);
      draftPersistTimerRef.current = null;
    }
    draftRestoredRef.current = false;
    clearCreateSelectionCache();
  }, []);

  // Resets draft-owned values when the selected account changes.
  const resetDraftForClientChange = useCallback(
    (defaults: CreateDraftDefaults) => {
      setStep(1);
      setSelectedContacts([]);
      setVisitType(defaults.visitType);
      setContactMethod(defaults.contactMethod);
      setTransDate(defaults.transDate);
      setDescription("");
      setComentarios("");
      setAntecedentes("");
      setConclusiones("");
    },
    [
      setAntecedentes,
      setComentarios,
      setConclusiones,
      setContactMethod,
      setDescription,
      setSelectedContacts,
      setStep,
      setTransDate,
      setVisitType,
    ]
  );

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

    const shouldShow = hasCreateSelectionCache();
    if (shouldShow) {
      showGlobalSpinner(indT("Common_Loading", "Loading"));
    }
    try {
      const draft = getSessionJsonWithExpiry<DraftSnapshot>(VISIT_DRAFT_KEY);
      if (draft?.selectedClient?.value) setSelectedClient(draft.selectedClient);
      if (Array.isArray(draft?.selectedContacts)) setSelectedContacts(draft.selectedContacts);
      if (draft?.visitType !== undefined) setVisitType(draft.visitType);
      if (draft?.contactMethod !== undefined) setContactMethod(draft.contactMethod);
      if (draft?.transDate) setTransDate(draft.transDate);
      if (draft?.description !== undefined) setDescription(draft.description);
      if (draft?.comentarios !== undefined) setComentarios(draft.comentarios);
      if (draft?.antecedentes !== undefined) setAntecedentes(draft.antecedentes);
      if (draft?.conclusiones !== undefined) setConclusiones(draft.conclusiones);
      if (draft?.step === 2) setStep(2);
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
    setContactMethod,
    setTransDate,
    setVisitType,
  ]);

  return {
    persistDraftNow,
    discardDraftNow,
    resetDraftForClientChange,
  };
};
