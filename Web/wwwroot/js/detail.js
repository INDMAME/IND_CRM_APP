import {
  AppErrorBoundary_default,
  VisitNarrativeFields_default,
  isOverflowing,
  navigateToTextEditorField,
  setPreviewAnchor,
  showPreviewTooltip,
  useTapGuard,
  useTextEditorFields,
  useVisitas
} from "./chunks/chunk-L2CN5NRP.js";
import "./chunks/chunk-FBLVVGLA.js";
import {
  SingleDatePicker
} from "./chunks/chunk-3RR6MY4O.js";
import {
  SelectCombobox_default
} from "./chunks/chunk-6TVWMV24.js";
import "./chunks/chunk-HF2ANVLM.js";
import {
  wait
} from "./chunks/chunk-4BE3ZFCK.js";
import {
  ConfirmModal,
  useConfirmDialog
} from "./chunks/chunk-UXY4YQ3D.js";
import {
  flashActionMark,
  setHistoryFilterForDate
} from "./chunks/chunk-CBDB7NMA.js";
import {
  VisitasPageProviders_default
} from "./chunks/chunk-PHLRNKZH.js";
import "./chunks/chunk-SRZDJTMJ.js";
import {
  setTopbarActionGroupReady
} from "./chunks/chunk-ZBKHPZJX.js";
import {
  Spinner_default,
  canAccess,
  classNames,
  showPermissionModal
} from "./chunks/chunk-EGSPAV7B.js";
import {
  mountReactIsland,
  mountWhenDocumentReady,
  require_jsx_runtime,
  require_react
} from "./chunks/chunk-2NKOKBT5.js";
import {
  fetchJson,
  indT
} from "./chunks/chunk-63VW7TTG.js";
import {
  getSessionValueWithExpiry,
  removeSessionValueWithExpiry,
  setSessionValueWithExpiry
} from "./chunks/chunk-6HGCHSZG.js";
import {
  __toESM
} from "./chunks/chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/visitas/detail/DetailForm.tsx
var import_react5 = __toESM(require_react());

// Web/wwwroot/react/src/utils/domGuards.ts
var bindReadOnlyGuard = (el) => {
  if (!el) return () => {
  };
  const cancel = (event) => event.preventDefault();
  const events = ["contextmenu", "selectstart", "copy", "cut", "paste"];
  events.forEach((evt) => el.addEventListener(evt, cancel));
  return () => {
    events.forEach((evt) => el.removeEventListener(evt, cancel));
  };
};

// Web/wwwroot/react/src/utils/strings.ts
var hasValue = (value) => String(value || "").trim().length > 0;

// Web/wwwroot/react/src/hooks/useDetailHydration.ts
var import_react = __toESM(require_react());
var isResponseSuccess = (response) => {
  return response.success === true || response.Success === true;
};
var getResponseMessage = (response) => {
  const raw = response.message ?? response.Message;
  return typeof raw === "string" ? raw.trim() : "";
};
var getResponseData = (response) => {
  const data = response.data ?? response.Data;
  return data && typeof data === "object" ? data : null;
};
var asRecord = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value;
};
var useDetailHydration = ({
  actividadId,
  shouldHydrate,
  visitTypes,
  contactMethods,
  asistenteTipos,
  defaultVisitType,
  defaultContactMethod,
  initialAsistente,
  normalizeDateToInput,
  matchOptionValue,
  applyDraftValues,
  applyTextEditorValues,
  setStatus,
  setIsHydrating,
  setTransDate,
  setVisitType,
  setContactMethod,
  setAsistenteTipo,
  setDescription,
  setComentarios,
  setAntecedentes,
  setConclusiones
}) => {
  const hydrateFromApi = (0, import_react.useCallback)(async () => {
    if (!actividadId) return;
    setIsHydrating(true);
    try {
      const res = await fetchJson(`/Visitas/GetActivityByCode?code=${encodeURIComponent(actividadId)}`);
      const responseData = getResponseData(res);
      if (!isResponseSuccess(res) || !responseData) {
        setStatus(getResponseMessage(res) || indT("Visits_Detail_LoadActivityFailed", "Failed to load activity details."));
        return;
      }
      const rawDate = String(responseData.transDate ?? responseData.TransDate ?? "");
      setTransDate(normalizeDateToInput(rawDate));
      const rawVisitType = String(
        responseData.tipoVisita ?? responseData.TipoVisita ?? responseData.visitType ?? responseData.VisitType ?? ""
      );
      setVisitType(matchOptionValue(visitTypes, rawVisitType) || defaultVisitType);
      const rawContactMethod = String(
        responseData.contactMethod ?? responseData.ContactMethod ?? ""
      );
      setContactMethod(matchOptionValue(contactMethods, rawContactMethod) || defaultContactMethod);
      const asistentesList = responseData.asistentes ?? responseData.Asistentes;
      const firstAsistente = Array.isArray(asistentesList) && asistentesList.length ? asRecord(asistentesList[0]) : null;
      const rawAsistenteTipo = String(
        responseData.asistenteTipo ?? responseData.AsistenteTipo ?? firstAsistente?.asistenteTipo ?? firstAsistente?.AsistenteTipo ?? ""
      );
      const normalizedAsistenteTipo = matchOptionValue(asistenteTipos, rawAsistenteTipo);
      setAsistenteTipo(normalizedAsistenteTipo || initialAsistente);
      setDescription(String(responseData.description ?? responseData.Description ?? ""));
      setComentarios(String(responseData.comentarios ?? responseData.Comentarios ?? ""));
      setAntecedentes(String(responseData.antecedentes ?? responseData.Antecedentes ?? ""));
      setConclusiones(String(responseData.conclusiones ?? responseData.Conclusiones ?? ""));
    } catch {
    } finally {
      setIsHydrating(false);
      applyDraftValues();
      applyTextEditorValues();
    }
  }, [
    actividadId,
    applyDraftValues,
    applyTextEditorValues,
    asistenteTipos,
    contactMethods,
    defaultContactMethod,
    defaultVisitType,
    initialAsistente,
    matchOptionValue,
    normalizeDateToInput,
    setAntecedentes,
    setAsistenteTipo,
    setComentarios,
    setConclusiones,
    setDescription,
    setIsHydrating,
    setStatus,
    setTransDate,
    setVisitType,
    setContactMethod,
    visitTypes
  ]);
  (0, import_react.useEffect)(() => {
    if (shouldHydrate) {
      hydrateFromApi();
      return;
    }
    applyDraftValues();
    applyTextEditorValues();
  }, [applyDraftValues, applyTextEditorValues, hydrateFromApi, shouldHydrate]);
};

// Web/wwwroot/react/src/hooks/useDetailTopbarActions.ts
var import_react2 = __toESM(require_react());
var useDetailTopbarActions = ({
  busy,
  modalOpen,
  isEditing,
  canEditHistory,
  canDeleteHistory,
  transDate,
  setModalError,
  handleEnableEdit,
  handleCancelEdit,
  handleUpdate,
  handleDelete,
  actionGroupId = "visit-detail-actions",
  permissionsReady = true,
  openConfirm,
  closeConfirm
}) => {
  (0, import_react2.useEffect)(() => {
    if (!permissionsReady) return;
    const editIcon = document.getElementById("visitEditIcon");
    const saveIcon = document.getElementById("visitSaveIcon");
    const deleteBtn = document.getElementById("visitDeleteBtn");
    const cancelBtn = document.getElementById("visitCancelBtn");
    const editBtn = editIcon?.closest("button") ?? null;
    if (isEditing) {
      if (editBtn) editBtn.classList.remove("topbar-hidden");
      if (editIcon) editIcon.classList.add("hidden");
      if (saveIcon) saveIcon.classList.remove("hidden");
      if (deleteBtn) deleteBtn.classList.add("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.remove("topbar-hidden");
    } else {
      if (editBtn) editBtn.classList.remove("topbar-hidden");
      if (editIcon) editIcon.classList.remove("hidden");
      if (saveIcon) saveIcon.classList.add("hidden");
      if (deleteBtn) deleteBtn.classList.remove("topbar-hidden");
      if (cancelBtn) cancelBtn.classList.add("topbar-hidden");
    }
    setTopbarActionGroupReady(actionGroupId);
  }, [actionGroupId, isEditing, permissionsReady]);
  (0, import_react2.useEffect)(() => {
    if (!permissionsReady) return;
    const onEdit = () => {
      if (!canEditHistory) {
        showPermissionModal();
        return;
      }
      if (isEditing) {
        if (busy || modalOpen) return;
        setModalError("");
        openConfirm({
          title: indT("Visits_Detail_SaveChanges_Title", "Visits_Detail_SaveChanges_Title"),
          message: indT("Visits_Detail_SaveChanges_Body", "Visits_Detail_SaveChanges_Body"),
          confirmText: indT("Common_Save", "Common_Save"),
          onConfirm: async () => {
            const ok = await handleUpdate();
            if (ok) {
              closeConfirm();
              setHistoryFilterForDate(transDate);
              await wait(200);
              flashActionMark("okProcess", 1200);
              await wait(1200);
              window.__indBypassNavigationGuardOnce?.();
              window.location.href = "/Historial/History";
            }
            return ok;
          }
        });
      } else {
        handleEnableEdit();
      }
    };
    const onDelete = () => {
      if (!canDeleteHistory) {
        showPermissionModal();
        return;
      }
      if (busy || modalOpen) return;
      setModalError("");
      openConfirm({
        title: indT("Visits_Detail_DeleteActivity_Title", "Visits_Detail_DeleteActivity_Title"),
        message: indT("Visits_Detail_DeleteActivity_Body", "Visits_Detail_DeleteActivity_Body"),
        confirmText: indT("Common_Delete", "Common_Delete"),
        onConfirm: async () => {
          const ok = await handleDelete();
          if (ok) {
            closeConfirm();
            setHistoryFilterForDate(transDate);
            await wait(200);
            flashActionMark("okDelProcess", 1200);
            await wait(1200);
            window.__indBypassNavigationGuardOnce?.();
            window.location.href = "/Historial/History";
          }
          return ok;
        }
      });
    };
    const onCancelEdit = () => {
      if (busy || modalOpen) return;
      handleCancelEdit();
    };
    window.addEventListener("visit-edit", onEdit);
    window.addEventListener("visit-delete", onDelete);
    window.addEventListener("visit-cancel-edit", onCancelEdit);
    return () => {
      window.removeEventListener("visit-edit", onEdit);
      window.removeEventListener("visit-delete", onDelete);
      window.removeEventListener("visit-cancel-edit", onCancelEdit);
    };
  }, [
    busy,
    canDeleteHistory,
    canEditHistory,
    closeConfirm,
    handleCancelEdit,
    handleDelete,
    handleEnableEdit,
    handleUpdate,
    isEditing,
    modalOpen,
    openConfirm,
    permissionsReady,
    setModalError,
    transDate
  ]);
};

// Web/wwwroot/react/src/pages/visitas/detail/useDetailEditSession.ts
var import_react3 = __toESM(require_react());
var EDIT_MODE_TTL_MS = 6 * 60 * 60 * 1e3;
var DETAIL_DRAFT_TTL_MS = 24 * 60 * 60 * 1e3;
var useDetailEditSession = ({
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
  setConclusiones
}) => {
  const editModeKeyRef = (0, import_react3.useRef)("");
  const draftKeyRef = (0, import_react3.useRef)("");
  const draftPersistTimerRef = (0, import_react3.useRef)(null);
  const syncEditModeFlag = (0, import_react3.useCallback)((enabled) => {
    const key = editModeKeyRef.current;
    if (!key) return;
    if (enabled) {
      setSessionValueWithExpiry(key, "true", EDIT_MODE_TTL_MS);
      return;
    }
    removeSessionValueWithExpiry(key);
  }, []);
  const syncEditModeOnEntry = (0, import_react3.useCallback)(() => {
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
    }
  }, [actividadId, canEditHistory, recId, setIsEditing]);
  (0, import_react3.useEffect)(() => {
    syncEditModeOnEntry();
  }, [syncEditModeOnEntry]);
  (0, import_react3.useEffect)(() => {
    const onPageShow = (event) => {
      const navEntry = typeof performance !== "undefined" && performance.getEntriesByType ? performance.getEntriesByType("navigation")[0] : void 0;
      const isBackForward = navEntry?.type === "back_forward";
      if (event?.persisted || isBackForward) {
        syncEditModeOnEntry();
      }
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [syncEditModeOnEntry]);
  (0, import_react3.useEffect)(() => {
    const key = `ind_visit_draft_${actividadId || recId || "default"}`;
    draftKeyRef.current = key;
  }, [actividadId, recId]);
  const saveDraft = (0, import_react3.useCallback)((draft) => {
    const key = draftKeyRef.current;
    if (!key) return;
    setSessionValueWithExpiry(key, JSON.stringify(draft), DETAIL_DRAFT_TTL_MS);
  }, []);
  const clearDraft = (0, import_react3.useCallback)(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    removeSessionValueWithExpiry(key);
  }, []);
  const applyDraftValues = (0, import_react3.useCallback)(() => {
    const key = draftKeyRef.current;
    if (!key) return;
    try {
      const raw = getSessionValueWithExpiry(key);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (!draft || typeof draft !== "object") return;
      if (draft.transDate !== void 0) setTransDate(String(draft.transDate));
      if (draft.visitType !== void 0) setVisitType(String(draft.visitType));
      if (draft.contactMethod !== void 0) setContactMethod(String(draft.contactMethod));
      if (draft.asistenteTipo !== void 0) setAsistenteTipo(String(draft.asistenteTipo));
      if (draft.description !== void 0) setDescription(String(draft.description));
      if (draft.comentarios !== void 0) setComentarios(String(draft.comentarios));
      if (draft.antecedentes !== void 0) setAntecedentes(String(draft.antecedentes));
      if (draft.conclusiones !== void 0) setConclusiones(String(draft.conclusiones));
    } catch {
    }
  }, [setAntecedentes, setAsistenteTipo, setComentarios, setConclusiones, setContactMethod, setDescription, setTransDate, setVisitType]);
  (0, import_react3.useEffect)(() => {
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
        conclusiones
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
    applyDraftValues
  };
};

// Web/wwwroot/react/src/pages/visitas/detail/useDetailMutations.ts
var import_react4 = __toESM(require_react());
var isCommandSuccess = (response) => {
  return response.success === true || response.Success === true;
};
var getCommandMessage = (response) => {
  const raw = response.message ?? response.Message;
  return typeof raw === "string" ? raw.trim() : "";
};
var resolveSafeRecId = (rawRecId) => {
  const normalized = String(rawRecId ?? "").trim();
  if (!normalized) return null;
  if (!/^-?\d+$/.test(normalized)) return null;
  const absoluteDigits = normalized.startsWith("-") ? normalized.slice(1) : normalized;
  if (!absoluteDigits || /^0+$/.test(absoluteDigits)) return null;
  return normalized;
};
var shouldLogRecIdInDev = () => {
  if (typeof window === "undefined" || !window.location) return false;
  const host = String(window.location.hostname || "").trim().toLowerCase();
  return host === "localhost" || host === "127.0.0.1" || host.endsWith(".local");
};
var logSafeRecIdInDev = (operation, safeRecId) => {
  if (!shouldLogRecIdInDev()) return;
  console.info(`[visitas-detail] ${operation} recId`, safeRecId);
};
var useDetailMutations = ({
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
  defaultContactMethod,
  rawInitialVisitType,
  rawInitialContactMethod,
  rawInitialAsistente,
  matchOptionValue,
  clearDraft,
  syncEditModeFlag,
  setModalError,
  setBusy,
  setStatus,
  setIsEditing
}) => {
  const handleUpdate = (0, import_react4.useCallback)(async () => {
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
      const normalizedVisitType = matchOptionValue(visitTypes, visitType) || matchOptionValue(visitTypes, rawInitialVisitType) || defaultVisitType;
      const normalizedAsistenteTipo = matchOptionValue(asistenteTipos, asistenteTipo) || matchOptionValue(asistenteTipos, rawInitialAsistente) || rawInitialAsistente;
      const normalizedContactMethod = matchOptionValue(contactMethods, contactMethod) || matchOptionValue(contactMethods, rawInitialContactMethod) || defaultContactMethod;
      const payload = {
        accountNum,
        visitType: normalizedVisitType,
        contactMethod: Number(normalizedContactMethod || 0),
        asistenteTipo: normalizedAsistenteTipo,
        description,
        transDate,
        comentarios,
        antecedentes,
        conclusiones
      };
      logSafeRecIdInDev("update", safeRecIdValue);
      const safeRecId = encodeURIComponent(safeRecIdValue);
      const response = await fetchJson(`/Visitas/UpdateActivity/${safeRecId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
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
      const message = error instanceof Error && error.message ? error.message : indT("Visits_Detail_UpdateError", "Update error.");
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
    defaultContactMethod,
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
    visitTypes
  ]);
  const handleDelete = (0, import_react4.useCallback)(async () => {
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
      const response = await fetchJson(`/Visitas/DeleteActivity/${safeRecId}`, { method: "DELETE" });
      if (!isCommandSuccess(response)) {
        throw new Error(getCommandMessage(response) || indT("Visits_Detail_DeleteFailed", "Delete failed."));
      }
      setStatus(indT("Visits_Detail_Deleted", "Activity deleted"));
      return true;
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : indT("Visits_Detail_DeleteError", "Delete error.");
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
    handleDelete
  };
};

// Web/wwwroot/react/src/pages/visitas/detail/DetailForm.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var EDITOR_RETURN_FLAG_TTL_MS = 2 * 60 * 60 * 1e3;
var DetailApp = () => {
  const { visitTypes, contactMethods, asistenteTipos } = useVisitas();
  const canEditHistory = canAccess("VISITAS_GESTION", "Edit");
  const canDeleteHistory = canAccess("VISITAS_GESTION", "FullAccess");
  const detail = window.__ACTIVITY_DETAIL__ || {};
  const resolveActivityRecId = (payload) => {
    const candidates = [
      payload.recId,
      payload.RecId,
      payload.refRecIdActividad,
      payload.RefRecIdActividad,
      payload.actividadRecId,
      payload.ActividadRecId
    ];
    for (const candidate of candidates) {
      const normalized = String(candidate ?? "").trim();
      if (normalized) {
        return normalized;
      }
    }
    return "";
  };
  const activityRecId = resolveActivityRecId(detail);
  const textEditorBaseId = activityRecId ? `Visita.${activityRecId}` : "Visita";
  const fieldIdComentarios = `${textEditorBaseId}.Comentarios`;
  const fieldIdAntecedentes = `${textEditorBaseId}.Antecedentes`;
  const fieldIdConclusiones = `${textEditorBaseId}.Conclusiones`;
  const normalizeDateToInput = (0, import_react5.useCallback)((value) => {
    if (!value) return "";
    const raw = String(value).trim();
    if (!raw) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    if (/^\d{2}[./-]\d{2}[./-]\d{4}$/.test(raw)) {
      const parts = raw.split(/[./-]/).map((p) => parseInt(p, 10));
      if (parts.length === 3 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1]) && !Number.isNaN(parts[2])) {
        const [d, m, y] = parts;
        const mm = String(m).padStart(2, "0");
        const dd = String(d).padStart(2, "0");
        return `${y}-${mm}-${dd}`;
      }
    }
    const dt = new Date(raw);
    if (!Number.isNaN(dt.getTime())) {
      const yyyy = dt.getFullYear();
      const mm = String(dt.getMonth() + 1).padStart(2, "0");
      const dd = String(dt.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }
    return "";
  }, []);
  const matchOptionValue = (0, import_react5.useCallback)((options, raw) => {
    if (raw == null) return "";
    const rawStr = String(raw).trim();
    if (!rawStr) return "";
    const normalizeText = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    const rawNorm = normalizeText(rawStr);
    const altNorm = rawNorm.endsWith("o") ? `${rawNorm.slice(0, -1)}a` : rawNorm;
    const match = (options || []).find((o) => {
      const val = String(o?.value ?? o?.Value ?? "").trim();
      const text = String(o?.text ?? o?.Text ?? "").trim();
      const textNorm = normalizeText(text);
      return val === rawStr || val === rawNorm || textNorm === rawNorm || textNorm === altNorm;
    });
    return match ? String(match.value ?? match.Value ?? rawStr) : rawStr;
  }, []);
  const initialTransDate = normalizeDateToInput(String(detail.transDate ?? detail.TransDate ?? ""));
  const defaultVisitType = String(visitTypes[0]?.value ?? visitTypes[0]?.Value ?? "");
  const rawInitialVisitType = String(
    detail.tipoVisita ?? detail.TipoVisita ?? detail.visitType ?? detail.VisitType ?? ""
  );
  const initialVisitType = matchOptionValue(visitTypes, rawInitialVisitType) || defaultVisitType;
  const defaultContactMethod = String(contactMethods[0]?.value ?? contactMethods[0]?.Value ?? "0");
  const rawInitialContactMethod = String(
    detail.contactMethod ?? detail.ContactMethod ?? ""
  );
  const initialContactMethod = matchOptionValue(contactMethods, rawInitialContactMethod) || defaultContactMethod;
  const rawInitialAsistente = String(
    detail.asistenteTipo ?? detail.AsistenteTipo ?? (asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "")
  );
  const initialAsistente = matchOptionValue(asistenteTipos, rawInitialAsistente) || rawInitialAsistente;
  const [transDate, setTransDate] = (0, import_react5.useState)(initialTransDate);
  const [visitType, setVisitType] = (0, import_react5.useState)(initialVisitType);
  const [contactMethod, setContactMethod] = (0, import_react5.useState)(initialContactMethod);
  const [asistenteTipo, setAsistenteTipo] = (0, import_react5.useState)(initialAsistente);
  const [description, setDescription] = (0, import_react5.useState)(String(detail.description ?? detail.Description ?? ""));
  const [comentarios, setComentarios] = (0, import_react5.useState)(String(detail.comentarios ?? detail.Comentarios ?? ""));
  const [antecedentes, setAntecedentes] = (0, import_react5.useState)(String(detail.antecedentes ?? detail.Antecedentes ?? ""));
  const [conclusiones, setConclusiones] = (0, import_react5.useState)(String(detail.conclusiones ?? detail.Conclusiones ?? ""));
  const [status, setStatus] = (0, import_react5.useState)("");
  const [busy, setBusy] = (0, import_react5.useState)(false);
  const [isEditing, setIsEditing] = (0, import_react5.useState)(false);
  const [isHydrating, setIsHydrating] = (0, import_react5.useState)(false);
  const [modalError, setModalError] = (0, import_react5.useState)("");
  const readOnlySurfaceRef = (0, import_react5.useRef)(null);
  const editSnapshotRef = (0, import_react5.useRef)(null);
  const recId = activityRecId;
  const accountNum = String(detail.accountNum ?? detail.AccountNum ?? "");
  const actividadId = String(detail.actividadId ?? detail.ActividadId ?? "");
  const { editModeKeyRef, syncEditModeFlag, clearDraft, applyDraftValues } = useDetailEditSession({
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
    setConclusiones
  });
  const hasServerDetail = hasValue(recId) && hasValue(accountNum) && hasValue(detail.transDate || detail.TransDate || "");
  const shouldHydrate = !!actividadId && !hasServerDetail;
  const openTextEditor = (0, import_react5.useCallback)(
    (fieldId, fieldLabel, fieldValue, options = {}) => {
      navigateToTextEditorField({
        fieldId,
        fieldLabel,
        fieldValue,
        readOnly: options?.readOnly === true,
        allowEdit: options?.allowEdit !== false,
        editModeKey: options?.editModeKey,
        editModeReturnTtlMs: EDITOR_RETURN_FLAG_TTL_MS
      });
    },
    []
  );
  const handleComentariosTap = (0, import_react5.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdComentarios, indT("Visits_Field_Comments", "Comments"), comentarios, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [comentarios, isEditing, canEditHistory, openTextEditor]);
  const handleComentariosHold = (0, import_react5.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);
  const handleAntecedentesTap = (0, import_react5.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [antecedentes, isEditing, canEditHistory, openTextEditor]);
  const handleAntecedentesHold = (0, import_react5.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);
  const handleConclusionesTap = (0, import_react5.useCallback)((event) => {
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones, {
      readOnly: !isEditing,
      allowEdit: canEditHistory,
      editModeKey: editModeKeyRef.current
    });
  }, [conclusiones, isEditing, canEditHistory, openTextEditor]);
  const handleConclusionesHold = (0, import_react5.useCallback)((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(conclusiones || ""), clientY);
  }, [conclusiones]);
  const comentariosTap = useTapGuard(handleComentariosTap, handleComentariosHold);
  const antecedentesTap = useTapGuard(handleAntecedentesTap, handleAntecedentesHold);
  const conclusionesTap = useTapGuard(handleConclusionesTap, handleConclusionesHold);
  const textEditorBindings = (0, import_react5.useMemo)(
    () => [
      { fieldId: fieldIdComentarios, applyValue: setComentarios },
      { fieldId: fieldIdAntecedentes, applyValue: setAntecedentes },
      { fieldId: fieldIdConclusiones, applyValue: setConclusiones }
    ],
    [fieldIdAntecedentes, fieldIdComentarios, fieldIdConclusiones]
  );
  const { applyValues: applyTextEditorValues } = useTextEditorFields(textEditorBindings, {
    applyOnMount: !actividadId,
    listenPageShow: true
  });
  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "Confirm_Yes"),
    defaultCancelText: indT("Confirm_No", "Confirm_No")
  });
  const handleModalConfirm = (0, import_react5.useCallback)(async () => {
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
  const modalConfirmText = busy ? modalLoadingText : !busy && modalError ? indT("Common_OK", "Common_OK") : modal.confirmText || indT("Confirm_Yes", "Confirm_Yes");
  const handleModalButtonConfirm = (0, import_react5.useCallback)(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, modalError, closeConfirm, handleModalConfirm]);
  const hasActiveProcess = (0, import_react5.useMemo)(() => busy || isEditing, [busy, isEditing]);
  (0, import_react5.useEffect)(() => {
    window.__indSetNavigationGuard?.(hasActiveProcess);
    return () => {
      window.__indClearNavigationGuard?.();
    };
  }, [hasActiveProcess]);
  useDetailHydration({
    actividadId,
    shouldHydrate,
    visitTypes,
    contactMethods,
    asistenteTipos,
    defaultVisitType,
    defaultContactMethod,
    initialAsistente,
    normalizeDateToInput,
    matchOptionValue,
    applyDraftValues,
    applyTextEditorValues,
    setStatus,
    setIsHydrating,
    setTransDate,
    setVisitType,
    setContactMethod,
    setAsistenteTipo,
    setDescription,
    setComentarios,
    setAntecedentes,
    setConclusiones
  });
  (0, import_react5.useEffect)(() => {
    const el = readOnlySurfaceRef.current;
    if (!el) return;
    if (!isEditing) {
      el.classList.add("ind-readonly-surface");
    } else {
      el.classList.remove("ind-readonly-surface");
    }
  }, [isEditing]);
  (0, import_react5.useEffect)(() => {
    if (isEditing) {
      if (!editSnapshotRef.current) {
        editSnapshotRef.current = {
          transDate,
          visitType,
          contactMethod,
          asistenteTipo,
          description,
          comentarios,
          antecedentes,
          conclusiones
        };
      }
      return;
    }
    editSnapshotRef.current = null;
  }, [isEditing, transDate, visitType, contactMethod, asistenteTipo, description, comentarios, antecedentes, conclusiones]);
  (0, import_react5.useEffect)(() => {
    if (isEditing) return void 0;
    return bindReadOnlyGuard(readOnlySurfaceRef.current);
  }, [isEditing]);
  const handleEnableEdit = (0, import_react5.useCallback)(() => {
    if (!canEditHistory) {
      showPermissionModal();
      return;
    }
    setIsEditing(true);
    syncEditModeFlag(true);
    setStatus(indT("Visits_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditHistory, syncEditModeFlag]);
  const handleCancelEdit = (0, import_react5.useCallback)(() => {
    if (!isEditing) return;
    setIsEditing(false);
    syncEditModeFlag(false);
    clearDraft();
    setStatus(indT("Common_Cancel", "Cancel"));
    window.__indBypassNavigationGuardOnce?.();
    window.location.reload();
  }, [isEditing, syncEditModeFlag, clearDraft]);
  const { handleUpdate, handleDelete } = useDetailMutations({
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
    defaultContactMethod,
    rawInitialVisitType,
    rawInitialContactMethod,
    rawInitialAsistente,
    matchOptionValue,
    clearDraft,
    syncEditModeFlag,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing
  });
  useDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing,
    canEditHistory,
    canDeleteHistory,
    transDate,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    openConfirm,
    closeConfirm
  });
  const descriptionLabel = indT("Visits_Field_Description", "Description");
  const commentsLabel = indT("Visits_Field_Comments", "Comments");
  const backgroundLabel = indT("Visits_Field_Background", "Background");
  const conclusionsLabel = indT("Visits_Field_Conclusions", "Conclusions");
  const detailDescriptionClassName = classNames(
    "form-control",
    isEditing ? "border-neutral-200 text-neutral-900" : "border-neutral-200 ind-readonly-field"
  );
  const detailReadOnlyClassName = classNames("form-control cursor-pointer", !isEditing ? "ind-readonly-field" : "");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      ConfirmModal,
      {
        open: modal.open,
        title: modal.title,
        message: modal.message,
        confirmText: modalConfirmText,
        cancelText: modalCancelText,
        loadingText: modalLoadingText,
        showCancel: modal.showCancel,
        showConfirm: modal.showConfirm,
        busy,
        error: modalError,
        status,
        onConfirm: handleModalButtonConfirm,
        onCancel: closeConfirm
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        ref: readOnlySurfaceRef,
        className: "relative shadow-xs glass-panel p-4 space-y-4 border border-neutral-200 rounded-[var(--radius-xl)]",
        children: [
          isHydrating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-[var(--radius-xl)]", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center gap-2 text-sm text-neutral-600", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "size-5" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: indT("Common_Loading", "Loading") })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 pt-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "visita-field-text", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              SingleDatePicker,
              {
                label: indT("Visits_Detail_Date_Label", "Date"),
                value: transDate,
                onChange: setTransDate,
                disabled: !isEditing,
                readOnly: !isEditing
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              SelectCombobox_default,
              {
                label: indT("Visits_Detail_VisitType_Label", "Visit type"),
                options: visitTypes,
                value: visitType,
                onChange: setVisitType,
                placeholder: indT("Visits_Detail_VisitType_Placeholder", "Select type"),
                disabled: !isEditing,
                readOnly: !isEditing,
                usePortal: false
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              SelectCombobox_default,
              {
                label: indT("Visits_Detail_ContactMethod_Label", "Contact method"),
                options: contactMethods,
                value: contactMethod,
                onChange: setContactMethod,
                placeholder: indT("Visits_Detail_ContactMethod_Placeholder", "Select method"),
                disabled: !isEditing,
                readOnly: !isEditing,
                usePortal: false
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            VisitNarrativeFields_default,
            {
              descriptionLabel,
              descriptionValue: description,
              descriptionClassName: detailDescriptionClassName,
              descriptionDisabled: !isEditing,
              onDescriptionChange: setDescription,
              tapFields: [
                {
                  id: "comentarios",
                  label: commentsLabel,
                  value: comentarios,
                  className: detailReadOnlyClassName,
                  pointerBindings: comentariosTap
                },
                {
                  id: "antecedentes",
                  label: backgroundLabel,
                  value: antecedentes,
                  className: detailReadOnlyClassName,
                  pointerBindings: antecedentesTap
                },
                {
                  id: "conclusiones",
                  label: conclusionsLabel,
                  value: conclusiones,
                  className: detailReadOnlyClassName,
                  pointerBindings: conclusionesTap
                }
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center gap-3 text-sm text-neutral-600", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: status }) })
        ]
      }
    )
  ] });
};
function DetailForm() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppErrorBoundary_default, { fallbackMessage: indT("Visits_Detail_ErrorBoundary", "An error occurred while rendering the detail page. Reload and try again."), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailApp, {}) });
}

// Web/wwwroot/react/src/pages/visitas/detail/DetailPage.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var DetailPage = () => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(VisitasPageProviders_default, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DetailForm, {}) });
};
var mount = () => {
  const rootEl = document.getElementById("visita-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DetailPage, {}));
};
mountWhenDocumentReady(mount);
var DetailPage_default = DetailPage;
export {
  DetailPage_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL0RldGFpbEZvcm0udHN4IiwgIi4uL3JlYWN0L3NyYy91dGlscy9kb21HdWFyZHMudHMiLCAiLi4vcmVhY3Qvc3JjL3V0aWxzL3N0cmluZ3MudHMiLCAiLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50cyIsICIuLi9yZWFjdC9zcmMvaG9va3MvdXNlRGV0YWlsVG9wYmFyQWN0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvdXNlRGV0YWlsRWRpdFNlc3Npb24udHMiLCAiLi4vcmVhY3Qvc3JjL3BhZ2VzL3Zpc2l0YXMvZGV0YWlsL3VzZURldGFpbE11dGF0aW9ucy50cyIsICIuLi9yZWFjdC9zcmMvcGFnZXMvdmlzaXRhcy9kZXRhaWwvRGV0YWlsUGFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZUNhbGxiYWNrLCB1c2VNZW1vIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBTaW5nbGVEYXRlUGlja2VyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2luZ2xlRGF0ZVBpY2tlci50c3hcIjtcclxuaW1wb3J0IENvbmZpcm1Nb2RhbCBmcm9tIFwiLi4vLi4vLi4vY29tcG9uZW50cy9jb21tb25zL0NvbmZpcm1Nb2RhbC50c3hcIjtcclxuaW1wb3J0IFNlbGVjdENvbWJvYm94IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU2VsZWN0Q29tYm9ib3gudHN4XCI7XHJcbmltcG9ydCBBcHBFcnJvckJvdW5kYXJ5IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvQXBwRXJyb3JCb3VuZGFyeS50c3hcIjtcclxuaW1wb3J0IHsgdXNlVmlzaXRhcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VWaXNpdGFzLnRzXCI7XHJcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvU3Bpbm5lci50c3hcIjtcclxuaW1wb3J0IFZpc2l0TmFycmF0aXZlRmllbGRzIGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL3Zpc2l0YXMvVmlzaXROYXJyYXRpdmVGaWVsZHMudHN4XCI7XHJcbmltcG9ydCB7IGNsYXNzTmFtZXMgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvY2xhc3NOYW1lcy50c1wiO1xyXG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcclxuaW1wb3J0IHsgY2FuQWNjZXNzLCBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGJpbmRSZWFkT25seUd1YXJkIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2RvbUd1YXJkcy50c1wiO1xyXG5pbXBvcnQgeyBoYXNWYWx1ZSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9zdHJpbmdzLnRzXCI7XHJcbmltcG9ydCB7IG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdGV4dEVkaXRvck5hdmlnYXRpb24udHNcIjtcclxuaW1wb3J0IHsgZmxhc2hBY3Rpb25NYXJrIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Zpc2l0YXNIaXN0b3J5LnRzXCI7XHJcbmltcG9ydCB7IHNldFByZXZpZXdBbmNob3IsIHNob3dQcmV2aWV3VG9vbHRpcCwgaXNPdmVyZmxvd2luZyB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9wcmV2aWV3VG9vbHRpcC50c1wiO1xyXG5pbXBvcnQgeyB1c2VUYXBHdWFyZCB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUYXBHdWFyZC50c1wiO1xyXG5pbXBvcnQgeyB1c2VDb25maXJtRGlhbG9nIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZUNvbmZpcm1EaWFsb2cudHNcIjtcclxuaW1wb3J0IHsgdXNlRGV0YWlsSHlkcmF0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbEh5ZHJhdGlvbi50c1wiO1xyXG5pbXBvcnQgeyB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zIH0gZnJvbSBcIi4uLy4uLy4uL2hvb2tzL3VzZURldGFpbFRvcGJhckFjdGlvbnMudHNcIjtcclxuaW1wb3J0IHsgdXNlVGV4dEVkaXRvckZpZWxkcyB9IGZyb20gXCIuLi8uLi8uLi9ob29rcy91c2VUZXh0RWRpdG9yRmllbGRzLnRzXCI7XHJcbmltcG9ydCB7IHVzZURldGFpbEVkaXRTZXNzaW9uIH0gZnJvbSBcIi4vdXNlRGV0YWlsRWRpdFNlc3Npb24udHNcIjtcclxuaW1wb3J0IHsgdXNlRGV0YWlsTXV0YXRpb25zIH0gZnJvbSBcIi4vdXNlRGV0YWlsTXV0YXRpb25zLnRzXCI7XHJcblxyXG5jb25zdCBFRElUT1JfUkVUVVJOX0ZMQUdfVFRMX01TID0gMiAqIDYwICogNjAgKiAxMDAwO1xyXG5cclxuY29uc3QgRGV0YWlsQXBwID0gKCkgPT4ge1xyXG4gIGNvbnN0IHsgdmlzaXRUeXBlcywgY29udGFjdE1ldGhvZHMsIGFzaXN0ZW50ZVRpcG9zIH0gPSB1c2VWaXNpdGFzKCk7XG4gIGNvbnN0IGNhbkVkaXRIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRWRpdFwiKTtcclxuICBjb25zdCBjYW5EZWxldGVIaXN0b3J5ID0gY2FuQWNjZXNzKFwiVklTSVRBU19HRVNUSU9OXCIsIFwiRnVsbEFjY2Vzc1wiKTtcclxuICB0eXBlIEFjdGl2aXR5RGV0YWlsUGF5bG9hZCA9IHtcclxuICAgIHJlY0lkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICByZWZSZWNJZEFjdGl2aWRhZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIFJlZlJlY0lkQWN0aXZpZGFkPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgYWN0aXZpZGFkUmVjSWQ/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICBBY3RpdmlkYWRSZWNJZD86IHN0cmluZyB8IG51bWJlcjtcclxuICAgIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICAgIGFsbG93RWRpdD86IGJvb2xlYW47XHJcbiAgICBlZGl0TW9kZUtleT86IHN0cmluZztcclxuICAgIFtrZXk6IHN0cmluZ106IHVua25vd247XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgZGV0YWlsID0gKHdpbmRvdy5fX0FDVElWSVRZX0RFVEFJTF9fIGFzIEFjdGl2aXR5RGV0YWlsUGF5bG9hZCkgfHwge307XHJcblxyXG4gIGNvbnN0IHJlc29sdmVBY3Rpdml0eVJlY0lkID0gKHBheWxvYWQ6IEFjdGl2aXR5RGV0YWlsUGF5bG9hZCk6IHN0cmluZyA9PiB7XHJcbiAgICBjb25zdCBjYW5kaWRhdGVzID0gW1xyXG4gICAgICBwYXlsb2FkLnJlY0lkLFxyXG4gICAgICBwYXlsb2FkLlJlY0lkLFxyXG4gICAgICBwYXlsb2FkLnJlZlJlY0lkQWN0aXZpZGFkLFxyXG4gICAgICBwYXlsb2FkLlJlZlJlY0lkQWN0aXZpZGFkLFxyXG4gICAgICBwYXlsb2FkLmFjdGl2aWRhZFJlY0lkLFxyXG4gICAgICBwYXlsb2FkLkFjdGl2aWRhZFJlY0lkLFxyXG4gICAgXTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGNhbmRpZGF0ZSBvZiBjYW5kaWRhdGVzKSB7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcoY2FuZGlkYXRlID8/IFwiXCIpLnRyaW0oKTtcclxuICAgICAgaWYgKG5vcm1hbGl6ZWQpIHtcclxuICAgICAgICByZXR1cm4gbm9ybWFsaXplZDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBcIlwiO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGFjdGl2aXR5UmVjSWQgPSByZXNvbHZlQWN0aXZpdHlSZWNJZChkZXRhaWwpO1xyXG5cclxuICBjb25zdCB0ZXh0RWRpdG9yQmFzZUlkID0gYWN0aXZpdHlSZWNJZCA/IGBWaXNpdGEuJHthY3Rpdml0eVJlY0lkfWAgOiBcIlZpc2l0YVwiO1xyXG4gIGNvbnN0IGZpZWxkSWRDb21lbnRhcmlvcyA9IGAke3RleHRFZGl0b3JCYXNlSWR9LkNvbWVudGFyaW9zYDtcclxuICBjb25zdCBmaWVsZElkQW50ZWNlZGVudGVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQW50ZWNlZGVudGVzYDtcclxuICBjb25zdCBmaWVsZElkQ29uY2x1c2lvbmVzID0gYCR7dGV4dEVkaXRvckJhc2VJZH0uQ29uY2x1c2lvbmVzYDtcclxuXHJcbiAgY29uc3Qgbm9ybWFsaXplRGF0ZVRvSW5wdXQgPSB1c2VDYWxsYmFjaygodmFsdWUpID0+IHtcclxuICAgIGlmICghdmFsdWUpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3ID0gU3RyaW5nKHZhbHVlKS50cmltKCk7XHJcbiAgICBpZiAoIXJhdykgcmV0dXJuIFwiXCI7XHJcbiAgICAvLyBBbHJlYWR5IHl5eXktTU0tZGRcclxuICAgIGlmICgvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9JC8udGVzdChyYXcpKSByZXR1cm4gcmF3O1xyXG4gICAgLy8gZGQuTU0ueXl5eSBvciBkZC9NTS95eXl5XHJcbiAgICBpZiAoL15cXGR7Mn1bLi8tXVxcZHsyfVsuLy1dXFxkezR9JC8udGVzdChyYXcpKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRzID0gcmF3LnNwbGl0KC9bLi8tXS8pLm1hcCgocCkgPT4gcGFyc2VJbnQocCwgMTApKTtcclxuICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMyAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzBdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzFdKSAmJiAhTnVtYmVyLmlzTmFOKHBhcnRzWzJdKSkge1xyXG4gICAgICAgIGNvbnN0IFtkLCBtLCB5XSA9IHBhcnRzO1xyXG4gICAgICAgIGNvbnN0IG1tID0gU3RyaW5nKG0pLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgICBjb25zdCBkZCA9IFN0cmluZyhkKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgICAgcmV0dXJuIGAke3l9LSR7bW19LSR7ZGR9YDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29uc3QgZHQgPSBuZXcgRGF0ZShyYXcpO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oZHQuZ2V0VGltZSgpKSkge1xyXG4gICAgICBjb25zdCB5eXl5ID0gZHQuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgY29uc3QgbW0gPSBTdHJpbmcoZHQuZ2V0TW9udGgoKSArIDEpLnBhZFN0YXJ0KDIsIFwiMFwiKTtcclxuICAgICAgY29uc3QgZGQgPSBTdHJpbmcoZHQuZ2V0RGF0ZSgpKS5wYWRTdGFydCgyLCBcIjBcIik7XHJcbiAgICAgIHJldHVybiBgJHt5eXl5fS0ke21tfS0ke2RkfWA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gXCJcIjtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG1hdGNoT3B0aW9uVmFsdWUgPSB1c2VDYWxsYmFjaygob3B0aW9ucywgcmF3KSA9PiB7XHJcbiAgICBpZiAocmF3ID09IG51bGwpIHJldHVybiBcIlwiO1xyXG4gICAgY29uc3QgcmF3U3RyID0gU3RyaW5nKHJhdykudHJpbSgpO1xyXG4gICAgaWYgKCFyYXdTdHIpIHJldHVybiBcIlwiO1xyXG5cclxuICAgIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSAocykgPT5cclxuICAgICAgU3RyaW5nKHMgfHwgXCJcIilcclxuICAgICAgICAudG9Mb3dlckNhc2UoKVxyXG4gICAgICAgIC5ub3JtYWxpemUoXCJORkRcIilcclxuICAgICAgICAucmVwbGFjZSgvW1xcdTAzMDAtXFx1MDM2Zl0vZywgXCJcIilcclxuICAgICAgICAudHJpbSgpO1xyXG5cclxuICAgIGNvbnN0IHJhd05vcm0gPSBub3JtYWxpemVUZXh0KHJhd1N0cik7XHJcbiAgICBjb25zdCBhbHROb3JtID0gcmF3Tm9ybS5lbmRzV2l0aChcIm9cIikgPyBgJHtyYXdOb3JtLnNsaWNlKDAsIC0xKX1hYCA6IHJhd05vcm07XHJcblxyXG4gICAgY29uc3QgbWF0Y2ggPSAob3B0aW9ucyB8fCBbXSkuZmluZCgobykgPT4ge1xyXG4gICAgICBjb25zdCB2YWwgPSBTdHJpbmcobz8udmFsdWUgPz8gbz8uVmFsdWUgPz8gXCJcIikudHJpbSgpO1xyXG4gICAgICBjb25zdCB0ZXh0ID0gU3RyaW5nKG8/LnRleHQgPz8gbz8uVGV4dCA/PyBcIlwiKS50cmltKCk7XHJcbiAgICAgIGNvbnN0IHRleHROb3JtID0gbm9ybWFsaXplVGV4dCh0ZXh0KTtcclxuICAgICAgcmV0dXJuIHZhbCA9PT0gcmF3U3RyIHx8IHZhbCA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gcmF3Tm9ybSB8fCB0ZXh0Tm9ybSA9PT0gYWx0Tm9ybTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoID8gU3RyaW5nKG1hdGNoLnZhbHVlID8/IG1hdGNoLlZhbHVlID8/IHJhd1N0cikgOiByYXdTdHI7XHJcbiAgfSwgW10pO1xyXG5cclxuICBjb25zdCBpbml0aWFsVHJhbnNEYXRlID0gbm9ybWFsaXplRGF0ZVRvSW5wdXQoU3RyaW5nKGRldGFpbC50cmFuc0RhdGUgPz8gZGV0YWlsLlRyYW5zRGF0ZSA/PyBcIlwiKSk7XHJcbiAgY29uc3QgZGVmYXVsdFZpc2l0VHlwZSA9IFN0cmluZyh2aXNpdFR5cGVzWzBdPy52YWx1ZSA/PyB2aXNpdFR5cGVzWzBdPy5WYWx1ZSA/PyBcIlwiKTtcclxuICBjb25zdCByYXdJbml0aWFsVmlzaXRUeXBlID0gU3RyaW5nKFxyXG4gICAgZGV0YWlsLnRpcG9WaXNpdGEgPz8gZGV0YWlsLlRpcG9WaXNpdGEgPz8gZGV0YWlsLnZpc2l0VHlwZSA/PyBkZXRhaWwuVmlzaXRUeXBlID8/IFwiXCJcclxuICApO1xyXG4gIGNvbnN0IGluaXRpYWxWaXNpdFR5cGUgPSBtYXRjaE9wdGlvblZhbHVlKHZpc2l0VHlwZXMsIHJhd0luaXRpYWxWaXNpdFR5cGUpIHx8IGRlZmF1bHRWaXNpdFR5cGU7XG4gIGNvbnN0IGRlZmF1bHRDb250YWN0TWV0aG9kID0gU3RyaW5nKGNvbnRhY3RNZXRob2RzWzBdPy52YWx1ZSA/PyBjb250YWN0TWV0aG9kc1swXT8uVmFsdWUgPz8gXCIwXCIpO1xuICBjb25zdCByYXdJbml0aWFsQ29udGFjdE1ldGhvZCA9IFN0cmluZyhcbiAgICBkZXRhaWwuY29udGFjdE1ldGhvZCA/PyBkZXRhaWwuQ29udGFjdE1ldGhvZCA/PyBcIlwiXG4gICk7XG4gIGNvbnN0IGluaXRpYWxDb250YWN0TWV0aG9kID0gbWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QpIHx8IGRlZmF1bHRDb250YWN0TWV0aG9kO1xuICBjb25zdCByYXdJbml0aWFsQXNpc3RlbnRlID0gU3RyaW5nKFxuICAgIGRldGFpbC5hc2lzdGVudGVUaXBvID8/IGRldGFpbC5Bc2lzdGVudGVUaXBvID8/IChhc2lzdGVudGVUaXBvc1swXT8udmFsdWUgPz8gYXNpc3RlbnRlVGlwb3NbMF0/LlZhbHVlID8/IFwiXCIpXHJcbiAgKTtcclxuICBjb25zdCBpbml0aWFsQXNpc3RlbnRlID0gbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3SW5pdGlhbEFzaXN0ZW50ZSkgfHwgcmF3SW5pdGlhbEFzaXN0ZW50ZTtcclxuXHJcbiAgY29uc3QgW3RyYW5zRGF0ZSwgc2V0VHJhbnNEYXRlXSA9IHVzZVN0YXRlKGluaXRpYWxUcmFuc0RhdGUpO1xuICBjb25zdCBbdmlzaXRUeXBlLCBzZXRWaXNpdFR5cGVdID0gdXNlU3RhdGUoaW5pdGlhbFZpc2l0VHlwZSk7XG4gIGNvbnN0IFtjb250YWN0TWV0aG9kLCBzZXRDb250YWN0TWV0aG9kXSA9IHVzZVN0YXRlKGluaXRpYWxDb250YWN0TWV0aG9kKTtcbiAgY29uc3QgW2FzaXN0ZW50ZVRpcG8sIHNldEFzaXN0ZW50ZVRpcG9dID0gdXNlU3RhdGUoaW5pdGlhbEFzaXN0ZW50ZSk7XG4gIGNvbnN0IFtkZXNjcmlwdGlvbiwgc2V0RGVzY3JpcHRpb25dID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5kZXNjcmlwdGlvbiA/PyBkZXRhaWwuRGVzY3JpcHRpb24gPz8gXCJcIikpO1xyXG4gIGNvbnN0IFtjb21lbnRhcmlvcywgc2V0Q29tZW50YXJpb3NdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb21lbnRhcmlvcyA/PyBkZXRhaWwuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gIGNvbnN0IFthbnRlY2VkZW50ZXMsIHNldEFudGVjZWRlbnRlc10gPSB1c2VTdGF0ZShTdHJpbmcoZGV0YWlsLmFudGVjZWRlbnRlcyA/PyBkZXRhaWwuQW50ZWNlZGVudGVzID8/IFwiXCIpKTtcclxuICBjb25zdCBbY29uY2x1c2lvbmVzLCBzZXRDb25jbHVzaW9uZXNdID0gdXNlU3RhdGUoU3RyaW5nKGRldGFpbC5jb25jbHVzaW9uZXMgPz8gZGV0YWlsLkNvbmNsdXNpb25lcyA/PyBcIlwiKSk7XHJcbiAgY29uc3QgW3N0YXR1cywgc2V0U3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbaXNFZGl0aW5nLCBzZXRJc0VkaXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFtpc0h5ZHJhdGluZywgc2V0SXNIeWRyYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFttb2RhbEVycm9yLCBzZXRNb2RhbEVycm9yXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IHJlYWRPbmx5U3VyZmFjZVJlZiA9IHVzZVJlZihudWxsKTtcclxuICBjb25zdCBlZGl0U25hcHNob3RSZWYgPSB1c2VSZWYobnVsbCk7XHJcblxyXG4gIGNvbnN0IHJlY0lkID0gYWN0aXZpdHlSZWNJZDtcclxuICBjb25zdCBhY2NvdW50TnVtID0gU3RyaW5nKGRldGFpbC5hY2NvdW50TnVtID8/IGRldGFpbC5BY2NvdW50TnVtID8/IFwiXCIpO1xyXG4gIGNvbnN0IGFjdGl2aWRhZElkID0gU3RyaW5nKGRldGFpbC5hY3RpdmlkYWRJZCA/PyBkZXRhaWwuQWN0aXZpZGFkSWQgPz8gXCJcIik7XHJcblxyXG4gIGNvbnN0IHsgZWRpdE1vZGVLZXlSZWYsIHN5bmNFZGl0TW9kZUZsYWcsIGNsZWFyRHJhZnQsIGFwcGx5RHJhZnRWYWx1ZXMgfSA9IHVzZURldGFpbEVkaXRTZXNzaW9uKHtcclxuICAgIGFjdGl2aWRhZElkLFxyXG4gICAgcmVjSWQsXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIHNldElzRWRpdGluZyxcbiAgICB0cmFuc0RhdGUsXG4gICAgdmlzaXRUeXBlLFxuICAgIGNvbnRhY3RNZXRob2QsXG4gICAgYXNpc3RlbnRlVGlwbyxcbiAgICBkZXNjcmlwdGlvbixcclxuICAgIGNvbWVudGFyaW9zLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgY29uY2x1c2lvbmVzLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRDb250YWN0TWV0aG9kLFxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgaGFzU2VydmVyRGV0YWlsID1cclxuICAgIGhhc1ZhbHVlKHJlY0lkKSAmJlxyXG4gICAgaGFzVmFsdWUoYWNjb3VudE51bSkgJiZcclxuICAgIGhhc1ZhbHVlKGRldGFpbC50cmFuc0RhdGUgfHwgZGV0YWlsLlRyYW5zRGF0ZSB8fCBcIlwiKTtcclxuXHJcbiAgY29uc3Qgc2hvdWxkSHlkcmF0ZSA9ICEhYWN0aXZpZGFkSWQgJiYgIWhhc1NlcnZlckRldGFpbDtcclxuXHJcbiAgY29uc3Qgb3BlblRleHRFZGl0b3IgPSB1c2VDYWxsYmFjayhcclxuICAgIChcclxuICAgICAgZmllbGRJZDogc3RyaW5nLFxyXG4gICAgICBmaWVsZExhYmVsOiBzdHJpbmcsXHJcbiAgICAgIGZpZWxkVmFsdWU6IHN0cmluZyxcclxuICAgICAgb3B0aW9uczogeyBhbGxvd0VkaXQ/OiBib29sZWFuOyByZWFkT25seT86IGJvb2xlYW47IGVkaXRNb2RlS2V5Pzogc3RyaW5nIH0gPSB7fVxyXG4gICAgKSA9PiB7XHJcbiAgICAgIG5hdmlnYXRlVG9UZXh0RWRpdG9yRmllbGQoe1xyXG4gICAgICAgIGZpZWxkSWQsXHJcbiAgICAgICAgZmllbGRMYWJlbCxcclxuICAgICAgICBmaWVsZFZhbHVlLFxyXG4gICAgICAgIHJlYWRPbmx5OiBvcHRpb25zPy5yZWFkT25seSA9PT0gdHJ1ZSxcclxuICAgICAgICBhbGxvd0VkaXQ6IG9wdGlvbnM/LmFsbG93RWRpdCAhPT0gZmFsc2UsXHJcbiAgICAgICAgZWRpdE1vZGVLZXk6IG9wdGlvbnM/LmVkaXRNb2RlS2V5LFxyXG4gICAgICAgIGVkaXRNb2RlUmV0dXJuVHRsTXM6IEVESVRPUl9SRVRVUk5fRkxBR19UVExfTVMsXHJcbiAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIFtdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQ29tZW50YXJpb3NUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29tZW50YXJpb3MsIGluZFQoXCJWaXNpdHNfRmllbGRfQ29tbWVudHNcIiwgXCJDb21tZW50c1wiKSwgY29tZW50YXJpb3MsIHtcclxuICAgICAgcmVhZE9ubHk6ICFpc0VkaXRpbmcsXHJcbiAgICAgIGFsbG93RWRpdDogY2FuRWRpdEhpc3RvcnksXHJcbiAgICAgIGVkaXRNb2RlS2V5OiBlZGl0TW9kZUtleVJlZi5jdXJyZW50XHJcbiAgICB9KTtcclxuICB9LCBbY29tZW50YXJpb3MsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbWVudGFyaW9zSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGNvbWVudGFyaW9zIHx8IFwiXCIpLCBjbGllbnRZKTtcclxuICB9LCBbY29tZW50YXJpb3NdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzVGFwID0gdXNlQ2FsbGJhY2soKGV2ZW50KSA9PiB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgb3BlblRleHRFZGl0b3IoZmllbGRJZEFudGVjZWRlbnRlcywgaW5kVChcIlZpc2l0c19GaWVsZF9CYWNrZ3JvdW5kXCIsIFwiQmFja2dyb3VuZFwiKSwgYW50ZWNlZGVudGVzLCB7XHJcbiAgICAgIHJlYWRPbmx5OiAhaXNFZGl0aW5nLFxyXG4gICAgICBhbGxvd0VkaXQ6IGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgICBlZGl0TW9kZUtleTogZWRpdE1vZGVLZXlSZWYuY3VycmVudFxyXG4gICAgfSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlcywgaXNFZGl0aW5nLCBjYW5FZGl0SGlzdG9yeSwgb3BlblRleHRFZGl0b3JdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlQW50ZWNlZGVudGVzSG9sZCA9IHVzZUNhbGxiYWNrKCh0YXJnZXQsIGNsaWVudFkpID0+IHtcclxuICAgIGlmICghdGFyZ2V0IHx8ICFpc092ZXJmbG93aW5nKHRhcmdldCkpIHJldHVybiBmYWxzZTtcclxuICAgIHNldFByZXZpZXdBbmNob3IodGFyZ2V0KTtcclxuICAgIHJldHVybiBzaG93UHJldmlld1Rvb2x0aXAoU3RyaW5nKGFudGVjZWRlbnRlcyB8fCBcIlwiKSwgY2xpZW50WSk7XHJcbiAgfSwgW2FudGVjZWRlbnRlc10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDb25jbHVzaW9uZXNUYXAgPSB1c2VDYWxsYmFjaygoZXZlbnQpID0+IHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBvcGVuVGV4dEVkaXRvcihmaWVsZElkQ29uY2x1c2lvbmVzLCBpbmRUKFwiVmlzaXRzX0ZpZWxkX0NvbmNsdXNpb25zXCIsIFwiQ29uY2x1c2lvbnNcIiksIGNvbmNsdXNpb25lcywge1xyXG4gICAgICByZWFkT25seTogIWlzRWRpdGluZyxcclxuICAgICAgYWxsb3dFZGl0OiBjYW5FZGl0SGlzdG9yeSxcclxuICAgICAgZWRpdE1vZGVLZXk6IGVkaXRNb2RlS2V5UmVmLmN1cnJlbnRcclxuICAgIH0pO1xyXG4gIH0sIFtjb25jbHVzaW9uZXMsIGlzRWRpdGluZywgY2FuRWRpdEhpc3RvcnksIG9wZW5UZXh0RWRpdG9yXSk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUNvbmNsdXNpb25lc0hvbGQgPSB1c2VDYWxsYmFjaygodGFyZ2V0LCBjbGllbnRZKSA9PiB7XHJcbiAgICBpZiAoIXRhcmdldCB8fCAhaXNPdmVyZmxvd2luZyh0YXJnZXQpKSByZXR1cm4gZmFsc2U7XHJcbiAgICBzZXRQcmV2aWV3QW5jaG9yKHRhcmdldCk7XHJcbiAgICByZXR1cm4gc2hvd1ByZXZpZXdUb29sdGlwKFN0cmluZyhjb25jbHVzaW9uZXMgfHwgXCJcIiksIGNsaWVudFkpO1xyXG4gIH0sIFtjb25jbHVzaW9uZXNdKTtcclxuXHJcbiAgY29uc3QgY29tZW50YXJpb3NUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVDb21lbnRhcmlvc1RhcCwgaGFuZGxlQ29tZW50YXJpb3NIb2xkKTtcclxuICBjb25zdCBhbnRlY2VkZW50ZXNUYXAgPSB1c2VUYXBHdWFyZChoYW5kbGVBbnRlY2VkZW50ZXNUYXAsIGhhbmRsZUFudGVjZWRlbnRlc0hvbGQpO1xyXG4gIGNvbnN0IGNvbmNsdXNpb25lc1RhcCA9IHVzZVRhcEd1YXJkKGhhbmRsZUNvbmNsdXNpb25lc1RhcCwgaGFuZGxlQ29uY2x1c2lvbmVzSG9sZCk7XHJcblxyXG4gIGNvbnN0IHRleHRFZGl0b3JCaW5kaW5ncyA9IHVzZU1lbW8oXHJcbiAgICAoKSA9PiBbXHJcbiAgICAgIHsgZmllbGRJZDogZmllbGRJZENvbWVudGFyaW9zLCBhcHBseVZhbHVlOiBzZXRDb21lbnRhcmlvcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRBbnRlY2VkZW50ZXMsIGFwcGx5VmFsdWU6IHNldEFudGVjZWRlbnRlcyB9LFxyXG4gICAgICB7IGZpZWxkSWQ6IGZpZWxkSWRDb25jbHVzaW9uZXMsIGFwcGx5VmFsdWU6IHNldENvbmNsdXNpb25lcyB9LFxyXG4gICAgXSxcclxuICAgIFtmaWVsZElkQW50ZWNlZGVudGVzLCBmaWVsZElkQ29tZW50YXJpb3MsIGZpZWxkSWRDb25jbHVzaW9uZXNdXHJcbiAgKTtcclxuXHJcbiAgY29uc3QgeyBhcHBseVZhbHVlczogYXBwbHlUZXh0RWRpdG9yVmFsdWVzIH0gPSB1c2VUZXh0RWRpdG9yRmllbGRzKHRleHRFZGl0b3JCaW5kaW5ncywge1xyXG4gICAgYXBwbHlPbk1vdW50OiAhYWN0aXZpZGFkSWQsXHJcbiAgICBsaXN0ZW5QYWdlU2hvdzogdHJ1ZSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgeyBtb2RhbCwgb3BlbkNvbmZpcm0sIGNsb3NlQ29uZmlybSwgaGFuZGxlQ29uZmlybSB9ID0gdXNlQ29uZmlybURpYWxvZyh7XHJcbiAgICBkZWZhdWx0Q29uZmlybVRleHQ6IGluZFQoXCJDb25maXJtX1llc1wiLCBcIkNvbmZpcm1fWWVzXCIpLFxyXG4gICAgZGVmYXVsdENhbmNlbFRleHQ6IGluZFQoXCJDb25maXJtX05vXCIsIFwiQ29uZmlybV9Ob1wiKVxyXG4gIH0pO1xyXG5cclxuICBjb25zdCBoYW5kbGVNb2RhbENvbmZpcm0gPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgYXdhaXQgaGFuZGxlQ29uZmlybSh7XHJcbiAgICAgIGJ1c3ksXHJcbiAgICAgIG9uRXJyb3I6IChtc2cpID0+IHtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKG1zZyk7XHJcbiAgICAgICAgc2V0U3RhdHVzKG1zZyk7XHJcbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbYnVzeSwgaGFuZGxlQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBtb2RhbExvYWRpbmdUZXh0ID0gaW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiQ29tbW9uX0xvYWRpbmdcIik7XHJcbiAgY29uc3QgbW9kYWxDYW5jZWxUZXh0ID0gbW9kYWwuY2FuY2VsVGV4dCB8fCBpbmRUKFwiQ29uZmlybV9Ob1wiLCBcIkNvbmZpcm1fTm9cIik7XHJcbiAgY29uc3QgbW9kYWxDb25maXJtVGV4dCA9IGJ1c3lcclxuICAgID8gbW9kYWxMb2FkaW5nVGV4dFxyXG4gICAgOiAoIWJ1c3kgJiYgbW9kYWxFcnJvciA/IGluZFQoXCJDb21tb25fT0tcIiwgXCJDb21tb25fT0tcIikgOiAobW9kYWwuY29uZmlybVRleHQgfHwgaW5kVChcIkNvbmZpcm1fWWVzXCIsIFwiQ29uZmlybV9ZZXNcIikpKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlTW9kYWxCdXR0b25Db25maXJtID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFidXN5ICYmIG1vZGFsRXJyb3IpIHtcclxuICAgICAgY2xvc2VDb25maXJtKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGhhbmRsZU1vZGFsQ29uZmlybSgpO1xyXG4gIH0sIFtidXN5LCBtb2RhbEVycm9yLCBjbG9zZUNvbmZpcm0sIGhhbmRsZU1vZGFsQ29uZmlybV0pO1xyXG5cclxuICBjb25zdCBoYXNBY3RpdmVQcm9jZXNzID0gdXNlTWVtbygoKSA9PiBidXN5IHx8IGlzRWRpdGluZywgW2J1c3ksIGlzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgd2luZG93Ll9faW5kU2V0TmF2aWdhdGlvbkd1YXJkPy4oaGFzQWN0aXZlUHJvY2Vzcyk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cuX19pbmRDbGVhck5hdmlnYXRpb25HdWFyZD8uKCk7XHJcbiAgICB9O1xyXG4gIH0sIFtoYXNBY3RpdmVQcm9jZXNzXSk7XHJcblxyXG4gIHVzZURldGFpbEh5ZHJhdGlvbih7XHJcbiAgICBhY3RpdmlkYWRJZCxcclxuICAgIHNob3VsZEh5ZHJhdGUsXG4gICAgdmlzaXRUeXBlcyxcbiAgICBjb250YWN0TWV0aG9kcyxcbiAgICBhc2lzdGVudGVUaXBvcyxcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxuICAgIGRlZmF1bHRDb250YWN0TWV0aG9kLFxuICAgIGluaXRpYWxBc2lzdGVudGUsXG4gICAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcclxuICAgIHNldFN0YXR1cyxcclxuICAgIHNldElzSHlkcmF0aW5nLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRDb250YWN0TWV0aG9kLFxuICAgIHNldEFzaXN0ZW50ZVRpcG8sXG4gICAgc2V0RGVzY3JpcHRpb24sXHJcbiAgICBzZXRDb21lbnRhcmlvcyxcclxuICAgIHNldEFudGVjZWRlbnRlcyxcclxuICAgIHNldENvbmNsdXNpb25lcyxcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IGVsID0gcmVhZE9ubHlTdXJmYWNlUmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICBpZiAoIWlzRWRpdGluZykge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiaW5kLXJlYWRvbmx5LXN1cmZhY2VcIik7XHJcbiAgICB9XHJcbiAgfSwgW2lzRWRpdGluZ10pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzRWRpdGluZykge1xyXG4gICAgICBpZiAoIWVkaXRTbmFwc2hvdFJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSB7XG4gICAgICAgICAgdHJhbnNEYXRlLFxuICAgICAgICAgIHZpc2l0VHlwZSxcbiAgICAgICAgICBjb250YWN0TWV0aG9kLFxuICAgICAgICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgICAgIGFudGVjZWRlbnRlcyxcclxuICAgICAgICAgIGNvbmNsdXNpb25lc1xyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZWRpdFNuYXBzaG90UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gIH0sIFtpc0VkaXRpbmcsIHRyYW5zRGF0ZSwgdmlzaXRUeXBlLCBjb250YWN0TWV0aG9kLCBhc2lzdGVudGVUaXBvLCBkZXNjcmlwdGlvbiwgY29tZW50YXJpb3MsIGFudGVjZWRlbnRlcywgY29uY2x1c2lvbmVzXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGlzRWRpdGluZykgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgIHJldHVybiBiaW5kUmVhZE9ubHlHdWFyZChyZWFkT25seVN1cmZhY2VSZWYuY3VycmVudCk7XHJcbiAgfSwgW2lzRWRpdGluZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVFbmFibGVFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfRWRpdGluZ0VuYWJsZWRcIiwgXCJFZGl0aW5nIGVuYWJsZWRcIikpO1xyXG4gIH0sIFtjYW5FZGl0SGlzdG9yeSwgc3luY0VkaXRNb2RlRmxhZ10pO1xyXG5cclxuICBjb25zdCBoYW5kbGVDYW5jZWxFZGl0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHJldHVybjtcclxuICAgIHNldElzRWRpdGluZyhmYWxzZSk7XHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnKGZhbHNlKTtcclxuICAgIGNsZWFyRHJhZnQoKTtcclxuICAgIHNldFN0YXR1cyhpbmRUKFwiQ29tbW9uX0NhbmNlbFwiLCBcIkNhbmNlbFwiKSk7XHJcbiAgICB3aW5kb3cuX19pbmRCeXBhc3NOYXZpZ2F0aW9uR3VhcmRPbmNlPy4oKTtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICB9LCBbaXNFZGl0aW5nLCBzeW5jRWRpdE1vZGVGbGFnLCBjbGVhckRyYWZ0XSk7XHJcblxyXG4gIGNvbnN0IHsgaGFuZGxlVXBkYXRlLCBoYW5kbGVEZWxldGUgfSA9IHVzZURldGFpbE11dGF0aW9ucyh7XHJcbiAgICBidXN5LFxyXG4gICAgaXNFZGl0aW5nLFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjYW5EZWxldGVIaXN0b3J5LFxyXG4gICAgcmVjSWQsXHJcbiAgICBhY2NvdW50TnVtLFxyXG4gICAgdHJhbnNEYXRlLFxuICAgIHZpc2l0VHlwZSxcbiAgICBjb250YWN0TWV0aG9kLFxuICAgIGFzaXN0ZW50ZVRpcG8sXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBjb21lbnRhcmlvcyxcclxuICAgIGFudGVjZWRlbnRlcyxcclxuICAgIGNvbmNsdXNpb25lcyxcbiAgICB2aXNpdFR5cGVzLFxuICAgIGNvbnRhY3RNZXRob2RzLFxuICAgIGFzaXN0ZW50ZVRpcG9zLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgZGVmYXVsdENvbnRhY3RNZXRob2QsXG4gICAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgICByYXdJbml0aWFsQ29udGFjdE1ldGhvZCxcbiAgICByYXdJbml0aWFsQXNpc3RlbnRlLFxuICAgIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgc3luY0VkaXRNb2RlRmxhZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRCdXN5LFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0SXNFZGl0aW5nLFxyXG4gIH0pO1xyXG5cclxuICB1c2VEZXRhaWxUb3BiYXJBY3Rpb25zKHtcclxuICAgIGJ1c3ksXHJcbiAgICBtb2RhbE9wZW46IG1vZGFsLm9wZW4sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBjYW5FZGl0SGlzdG9yeSxcclxuICAgIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgICBzZXRNb2RhbEVycm9yLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZUNhbmNlbEVkaXQsXHJcbiAgICBoYW5kbGVVcGRhdGUsXHJcbiAgICBoYW5kbGVEZWxldGUsXHJcbiAgICBvcGVuQ29uZmlybSxcclxuICAgIGNsb3NlQ29uZmlybSxcclxuICB9KTtcclxuXHJcbiAgY29uc3QgZGVzY3JpcHRpb25MYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfRGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiKTtcclxuICBjb25zdCBjb21tZW50c0xhYmVsID0gaW5kVChcIlZpc2l0c19GaWVsZF9Db21tZW50c1wiLCBcIkNvbW1lbnRzXCIpO1xyXG4gIGNvbnN0IGJhY2tncm91bmRMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQmFja2dyb3VuZFwiLCBcIkJhY2tncm91bmRcIik7XHJcbiAgY29uc3QgY29uY2x1c2lvbnNMYWJlbCA9IGluZFQoXCJWaXNpdHNfRmllbGRfQ29uY2x1c2lvbnNcIiwgXCJDb25jbHVzaW9uc1wiKTtcclxuICBjb25zdCBkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXHJcbiAgICBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgaXNFZGl0aW5nID8gXCJib3JkZXItbmV1dHJhbC0yMDAgdGV4dC1uZXV0cmFsLTkwMFwiIDogXCJib3JkZXItbmV1dHJhbC0yMDAgaW5kLXJlYWRvbmx5LWZpZWxkXCJcbiAgKTtcclxuICBjb25zdCBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoXCJmb3JtLWNvbnRyb2wgY3Vyc29yLXBvaW50ZXJcIiwgIWlzRWRpdGluZyA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XHJcbiAgICAgIDxDb25maXJtTW9kYWxcclxuICAgICAgICBvcGVuPXttb2RhbC5vcGVufVxyXG4gICAgICAgIHRpdGxlPXttb2RhbC50aXRsZX1cclxuICAgICAgICBtZXNzYWdlPXttb2RhbC5tZXNzYWdlfVxyXG4gICAgICAgIGNvbmZpcm1UZXh0PXttb2RhbENvbmZpcm1UZXh0fVxyXG4gICAgICAgIGNhbmNlbFRleHQ9e21vZGFsQ2FuY2VsVGV4dH1cclxuICAgICAgICBsb2FkaW5nVGV4dD17bW9kYWxMb2FkaW5nVGV4dH1cclxuICAgICAgICBzaG93Q2FuY2VsPXttb2RhbC5zaG93Q2FuY2VsfVxyXG4gICAgICAgIHNob3dDb25maXJtPXttb2RhbC5zaG93Q29uZmlybX1cclxuICAgICAgICBidXN5PXtidXN5fVxyXG4gICAgICAgIGVycm9yPXttb2RhbEVycm9yfVxyXG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxyXG4gICAgICAgIG9uQ29uZmlybT17aGFuZGxlTW9kYWxCdXR0b25Db25maXJtfVxyXG4gICAgICAgIG9uQ2FuY2VsPXtjbG9zZUNvbmZpcm19XHJcbiAgICAgIC8+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9e3JlYWRPbmx5U3VyZmFjZVJlZn1cclxuICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBzaGFkb3cteHMgZ2xhc3MtcGFuZWwgcC00IHNwYWNlLXktNCBib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcbiAgICAgID5cclxuICAgICAgICB7aXNIeWRyYXRpbmcgJiYgKFxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYmctd2hpdGUvNzAgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtbmV1dHJhbC02MDBcIj5cbiAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cInNpemUtNVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntpbmRUKFwiQ29tbW9uX0xvYWRpbmdcIiwgXCJMb2FkaW5nXCIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0zIGdhcC00IHB0LTFcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZpc2l0YS1maWVsZC10ZXh0XCI+XHJcbiAgICAgICAgICAgIDxTaW5nbGVEYXRlUGlja2VyXHJcbiAgICAgICAgICAgICAgbGFiZWw9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0RhdGVfTGFiZWxcIiwgXCJEYXRlXCIpfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXt0cmFuc0RhdGV9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3NldFRyYW5zRGF0ZX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XHJcbiAgICAgICAgICAgIGxhYmVsPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9WaXNpdFR5cGVfTGFiZWxcIiwgXCJWaXNpdCB0eXBlXCIpfVxuICAgICAgICAgICAgb3B0aW9ucz17dmlzaXRUeXBlc31cclxuICAgICAgICAgICAgdmFsdWU9e3Zpc2l0VHlwZX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e3NldFZpc2l0VHlwZX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX1Zpc2l0VHlwZV9QbGFjZWhvbGRlclwiLCBcIlNlbGVjdCB0eXBlXCIpfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ31cclxuICAgICAgICAgICAgcmVhZE9ubHk9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICB1c2VQb3J0YWw9e2ZhbHNlfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPFNlbGVjdENvbWJvYm94XG4gICAgICAgICAgICBsYWJlbD17aW5kVChcIlZpc2l0c19EZXRhaWxfQ29udGFjdE1ldGhvZF9MYWJlbFwiLCBcIkNvbnRhY3QgbWV0aG9kXCIpfVxuICAgICAgICAgICAgb3B0aW9ucz17Y29udGFjdE1ldGhvZHN9XG4gICAgICAgICAgICB2YWx1ZT17Y29udGFjdE1ldGhvZH1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtzZXRDb250YWN0TWV0aG9kfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2luZFQoXCJWaXNpdHNfRGV0YWlsX0NvbnRhY3RNZXRob2RfUGxhY2Vob2xkZXJcIiwgXCJTZWxlY3QgbWV0aG9kXCIpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFpc0VkaXRpbmd9XG4gICAgICAgICAgICByZWFkT25seT17IWlzRWRpdGluZ31cbiAgICAgICAgICAgIHVzZVBvcnRhbD17ZmFsc2V9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG5cclxuICAgICAgICA8VmlzaXROYXJyYXRpdmVGaWVsZHNcclxuICAgICAgICAgIGRlc2NyaXB0aW9uTGFiZWw9e2Rlc2NyaXB0aW9uTGFiZWx9XHJcbiAgICAgICAgICBkZXNjcmlwdGlvblZhbHVlPXtkZXNjcmlwdGlvbn1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uQ2xhc3NOYW1lPXtkZXRhaWxEZXNjcmlwdGlvbkNsYXNzTmFtZX1cclxuICAgICAgICAgIGRlc2NyaXB0aW9uRGlzYWJsZWQ9eyFpc0VkaXRpbmd9XHJcbiAgICAgICAgICBvbkRlc2NyaXB0aW9uQ2hhbmdlPXtzZXREZXNjcmlwdGlvbn1cclxuICAgICAgICAgIHRhcEZpZWxkcz17W1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiY29tZW50YXJpb3NcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29tbWVudHNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29tZW50YXJpb3MsXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOiBkZXRhaWxSZWFkT25seUNsYXNzTmFtZSxcclxuICAgICAgICAgICAgICBwb2ludGVyQmluZGluZ3M6IGNvbWVudGFyaW9zVGFwLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgaWQ6IFwiYW50ZWNlZGVudGVzXCIsXHJcbiAgICAgICAgICAgICAgbGFiZWw6IGJhY2tncm91bmRMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogYW50ZWNlZGVudGVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBhbnRlY2VkZW50ZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpZDogXCJjb25jbHVzaW9uZXNcIixcclxuICAgICAgICAgICAgICBsYWJlbDogY29uY2x1c2lvbnNMYWJlbCxcclxuICAgICAgICAgICAgICB2YWx1ZTogY29uY2x1c2lvbmVzLFxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogZGV0YWlsUmVhZE9ubHlDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgcG9pbnRlckJpbmRpbmdzOiBjb25jbHVzaW9uZXNUYXAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbSB0ZXh0LW5ldXRyYWwtNjAwXCI+XG4gICAgICAgICAgPHNwYW4+e3N0YXR1c308L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbi8vIERldGFpbCBVSSB3cmFwcGVkIGJ5IHRoZSBlcnJvciBib3VuZGFyeS5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRGV0YWlsRm9ybSgpIHtcclxuICByZXR1cm4gKFxyXG4gICAgPEFwcEVycm9yQm91bmRhcnkgZmFsbGJhY2tNZXNzYWdlPXtpbmRUKFwiVmlzaXRzX0RldGFpbF9FcnJvckJvdW5kYXJ5XCIsIFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVuZGVyaW5nIHRoZSBkZXRhaWwgcGFnZS4gUmVsb2FkIGFuZCB0cnkgYWdhaW4uXCIpfT5cclxuICAgICAgPERldGFpbEFwcCAvPlxyXG4gICAgPC9BcHBFcnJvckJvdW5kYXJ5PlxyXG4gICk7XHJcbn1cclxuIiwgImV4cG9ydCBjb25zdCBiaW5kUmVhZE9ubHlHdWFyZCA9IChlbDogSFRNTEVsZW1lbnQgfCBudWxsKSA9PiB7XHJcbiAgaWYgKCFlbCkgcmV0dXJuICgpID0+IHt9O1xyXG4gIGNvbnN0IGNhbmNlbCA9IChldmVudDogRXZlbnQpID0+IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgY29uc3QgZXZlbnRzID0gW1wiY29udGV4dG1lbnVcIiwgXCJzZWxlY3RzdGFydFwiLCBcImNvcHlcIiwgXCJjdXRcIiwgXCJwYXN0ZVwiXTtcclxuICBldmVudHMuZm9yRWFjaCgoZXZ0KSA9PiBlbC5hZGRFdmVudExpc3RlbmVyKGV2dCwgY2FuY2VsKSk7XHJcbiAgcmV0dXJuICgpID0+IHtcclxuICAgIGV2ZW50cy5mb3JFYWNoKChldnQpID0+IGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LCBjYW5jZWwpKTtcclxuICB9O1xyXG59O1xyXG4iLCAiZXhwb3J0IGNvbnN0IGhhc1ZhbHVlID0gKHZhbHVlOiB1bmtub3duKSA9PiBTdHJpbmcodmFsdWUgfHwgXCJcIikudHJpbSgpLmxlbmd0aCA+IDA7XHJcbiIsICJpbXBvcnQgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBPcHRpb25MaWtlID0ge1xyXG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHRleHQ/OiBzdHJpbmc7XHJcbiAgVGV4dD86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgQWN0aXZpdHlEZXRhaWxSZWNvcmQgPSBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcclxuXHJcbnR5cGUgQWN0aXZpdHlEZXRhaWxSZXNwb25zZSA9IHtcclxuICBzdWNjZXNzPzogYm9vbGVhbjtcclxuICBtZXNzYWdlPzogc3RyaW5nO1xyXG4gIGRhdGE/OiBBY3Rpdml0eURldGFpbFJlY29yZCB8IG51bGw7XHJcbiAgU3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgTWVzc2FnZT86IHN0cmluZztcclxuICBEYXRhPzogQWN0aXZpdHlEZXRhaWxSZWNvcmQgfCBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgaXNSZXNwb25zZVN1Y2Nlc3MgPSAocmVzcG9uc2U6IEFjdGl2aXR5RGV0YWlsUmVzcG9uc2UpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSB8fCByZXNwb25zZS5TdWNjZXNzID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0UmVzcG9uc2VNZXNzYWdlID0gKHJlc3BvbnNlOiBBY3Rpdml0eURldGFpbFJlc3BvbnNlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCByYXcgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XHJcbiAgcmV0dXJuIHR5cGVvZiByYXcgPT09IFwic3RyaW5nXCIgPyByYXcudHJpbSgpIDogXCJcIjtcclxufTtcclxuXHJcbmNvbnN0IGdldFJlc3BvbnNlRGF0YSA9IChyZXNwb25zZTogQWN0aXZpdHlEZXRhaWxSZXNwb25zZSk6IEFjdGl2aXR5RGV0YWlsUmVjb3JkIHwgbnVsbCA9PiB7XHJcbiAgY29uc3QgZGF0YSA9IHJlc3BvbnNlLmRhdGEgPz8gcmVzcG9uc2UuRGF0YTtcclxuICByZXR1cm4gZGF0YSAmJiB0eXBlb2YgZGF0YSA9PT0gXCJvYmplY3RcIiA/IGRhdGEgOiBudWxsO1xyXG59O1xyXG5cclxuY29uc3QgYXNSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IG51bGwgPT4ge1xyXG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiIHx8IEFycmF5LmlzQXJyYXkodmFsdWUpKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gdmFsdWUgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj47XHJcbn07XHJcblxyXG50eXBlIFVzZURldGFpbEh5ZHJhdGlvbkFyZ3MgPSB7XHJcbiAgYWN0aXZpZGFkSWQ6IHN0cmluZztcclxuICBzaG91bGRIeWRyYXRlOiBib29sZWFuO1xyXG4gIHZpc2l0VHlwZXM6IE9wdGlvbkxpa2VbXTtcbiAgY29udGFjdE1ldGhvZHM6IE9wdGlvbkxpa2VbXTtcbiAgYXNpc3RlbnRlVGlwb3M6IE9wdGlvbkxpa2VbXTtcbiAgZGVmYXVsdFZpc2l0VHlwZTogc3RyaW5nO1xuICBkZWZhdWx0Q29udGFjdE1ldGhvZDogc3RyaW5nO1xuICBpbml0aWFsQXNpc3RlbnRlOiBzdHJpbmc7XG4gIG5vcm1hbGl6ZURhdGVUb0lucHV0OiAodmFsdWU6IHN0cmluZykgPT4gc3RyaW5nO1xyXG4gIG1hdGNoT3B0aW9uVmFsdWU6IChvcHRpb25zOiBPcHRpb25MaWtlW10sIHJhdzogdW5rbm93bikgPT4gc3RyaW5nO1xyXG4gIGFwcGx5RHJhZnRWYWx1ZXM6ICgpID0+IHZvaWQ7XHJcbiAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzOiAoKSA9PiB2b2lkO1xyXG4gIHNldFN0YXR1czogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0SXNIeWRyYXRpbmc6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcclxuICBzZXRUcmFuc0RhdGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRWaXNpdFR5cGU6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICBzZXRDb250YWN0TWV0aG9kOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0QXNpc3RlbnRlVGlwbzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNldERlc2NyaXB0aW9uOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb21lbnRhcmlvczogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgc2V0QW50ZWNlZGVudGVzOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxuICBzZXRDb25jbHVzaW9uZXM6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG59O1xyXG5cclxuLy8gS2VlcHMgZGV0YWlsIGh5ZHJhdGlvbiBvcmNoZXN0cmF0aW9uIG91dHNpZGUgdGhlIHBhZ2UgY29tcG9uZW50LlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsSHlkcmF0aW9uID0gKHtcclxuICBhY3RpdmlkYWRJZCxcclxuICBzaG91bGRIeWRyYXRlLFxyXG4gIHZpc2l0VHlwZXMsXG4gIGNvbnRhY3RNZXRob2RzLFxuICBhc2lzdGVudGVUaXBvcyxcbiAgZGVmYXVsdFZpc2l0VHlwZSxcbiAgZGVmYXVsdENvbnRhY3RNZXRob2QsXG4gIGluaXRpYWxBc2lzdGVudGUsXG4gIG5vcm1hbGl6ZURhdGVUb0lucHV0LFxyXG4gIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICBhcHBseVRleHRFZGl0b3JWYWx1ZXMsXHJcbiAgc2V0U3RhdHVzLFxyXG4gIHNldElzSHlkcmF0aW5nLFxyXG4gIHNldFRyYW5zRGF0ZSxcbiAgc2V0VmlzaXRUeXBlLFxuICBzZXRDb250YWN0TWV0aG9kLFxuICBzZXRBc2lzdGVudGVUaXBvLFxuICBzZXREZXNjcmlwdGlvbixcclxuICBzZXRDb21lbnRhcmlvcyxcclxuICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgc2V0Q29uY2x1c2lvbmVzLFxyXG59OiBVc2VEZXRhaWxIeWRyYXRpb25BcmdzKSA9PiB7XHJcbiAgY29uc3QgaHlkcmF0ZUZyb21BcGkgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAoIWFjdGl2aWRhZElkKSByZXR1cm47XHJcbiAgICBzZXRJc0h5ZHJhdGluZyh0cnVlKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoSnNvbjxBY3Rpdml0eURldGFpbFJlc3BvbnNlPihgL1Zpc2l0YXMvR2V0QWN0aXZpdHlCeUNvZGU/Y29kZT0ke2VuY29kZVVSSUNvbXBvbmVudChhY3RpdmlkYWRJZCl9YCk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlRGF0YSA9IGdldFJlc3BvbnNlRGF0YShyZXMpO1xyXG5cclxuICAgICAgaWYgKCFpc1Jlc3BvbnNlU3VjY2VzcyhyZXMpIHx8ICFyZXNwb25zZURhdGEpIHtcclxuICAgICAgICBzZXRTdGF0dXMoZ2V0UmVzcG9uc2VNZXNzYWdlKHJlcykgfHwgaW5kVChcIlZpc2l0c19EZXRhaWxfTG9hZEFjdGl2aXR5RmFpbGVkXCIsIFwiRmFpbGVkIHRvIGxvYWQgYWN0aXZpdHkgZGV0YWlscy5cIikpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmF3RGF0ZSA9IFN0cmluZyhyZXNwb25zZURhdGEudHJhbnNEYXRlID8/IHJlc3BvbnNlRGF0YS5UcmFuc0RhdGUgPz8gXCJcIik7XHJcbiAgICAgIHNldFRyYW5zRGF0ZShub3JtYWxpemVEYXRlVG9JbnB1dChyYXdEYXRlKSk7XHJcblxyXG4gICAgICBjb25zdCByYXdWaXNpdFR5cGUgPSBTdHJpbmcoXHJcbiAgICAgICAgcmVzcG9uc2VEYXRhLnRpcG9WaXNpdGEgPz8gcmVzcG9uc2VEYXRhLlRpcG9WaXNpdGEgPz8gcmVzcG9uc2VEYXRhLnZpc2l0VHlwZSA/PyByZXNwb25zZURhdGEuVmlzaXRUeXBlID8/IFwiXCJcclxuICAgICAgKTtcclxuICAgICAgc2V0VmlzaXRUeXBlKG1hdGNoT3B0aW9uVmFsdWUodmlzaXRUeXBlcywgcmF3VmlzaXRUeXBlKSB8fCBkZWZhdWx0VmlzaXRUeXBlKTtcblxuICAgICAgY29uc3QgcmF3Q29udGFjdE1ldGhvZCA9IFN0cmluZyhcbiAgICAgICAgcmVzcG9uc2VEYXRhLmNvbnRhY3RNZXRob2QgPz8gcmVzcG9uc2VEYXRhLkNvbnRhY3RNZXRob2QgPz8gXCJcIlxuICAgICAgKTtcbiAgICAgIHNldENvbnRhY3RNZXRob2QobWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgcmF3Q29udGFjdE1ldGhvZCkgfHwgZGVmYXVsdENvbnRhY3RNZXRob2QpO1xuXG4gICAgICBjb25zdCBhc2lzdGVudGVzTGlzdCA9IHJlc3BvbnNlRGF0YS5hc2lzdGVudGVzID8/IHJlc3BvbnNlRGF0YS5Bc2lzdGVudGVzO1xuICAgICAgY29uc3QgZmlyc3RBc2lzdGVudGUgPSBBcnJheS5pc0FycmF5KGFzaXN0ZW50ZXNMaXN0KSAmJiBhc2lzdGVudGVzTGlzdC5sZW5ndGggPyBhc1JlY29yZChhc2lzdGVudGVzTGlzdFswXSkgOiBudWxsO1xyXG4gICAgICBjb25zdCByYXdBc2lzdGVudGVUaXBvID0gU3RyaW5nKFxyXG4gICAgICAgIHJlc3BvbnNlRGF0YS5hc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICByZXNwb25zZURhdGEuQXNpc3RlbnRlVGlwbyA/P1xyXG4gICAgICAgICAgZmlyc3RBc2lzdGVudGU/LmFzaXN0ZW50ZVRpcG8gPz9cclxuICAgICAgICAgIGZpcnN0QXNpc3RlbnRlPy5Bc2lzdGVudGVUaXBvID8/XHJcbiAgICAgICAgICBcIlwiXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvID0gbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3QXNpc3RlbnRlVGlwbyk7XHJcbiAgICAgIHNldEFzaXN0ZW50ZVRpcG8obm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8gfHwgaW5pdGlhbEFzaXN0ZW50ZSk7XHJcbiAgICAgIHNldERlc2NyaXB0aW9uKFN0cmluZyhyZXNwb25zZURhdGEuZGVzY3JpcHRpb24gPz8gcmVzcG9uc2VEYXRhLkRlc2NyaXB0aW9uID8/IFwiXCIpKTtcclxuICAgICAgc2V0Q29tZW50YXJpb3MoU3RyaW5nKHJlc3BvbnNlRGF0YS5jb21lbnRhcmlvcyA/PyByZXNwb25zZURhdGEuQ29tZW50YXJpb3MgPz8gXCJcIikpO1xyXG4gICAgICBzZXRBbnRlY2VkZW50ZXMoU3RyaW5nKHJlc3BvbnNlRGF0YS5hbnRlY2VkZW50ZXMgPz8gcmVzcG9uc2VEYXRhLkFudGVjZWRlbnRlcyA/PyBcIlwiKSk7XHJcbiAgICAgIHNldENvbmNsdXNpb25lcyhTdHJpbmcocmVzcG9uc2VEYXRhLmNvbmNsdXNpb25lcyA/PyByZXNwb25zZURhdGEuQ29uY2x1c2lvbmVzID8/IFwiXCIpKTtcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAvLyBLZWVwIHByZXZpb3VzIFVJIGJlaGF2aW9yIG9uIGh5ZHJhdGlvbiBlcnJvcnMuXHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRJc0h5ZHJhdGluZyhmYWxzZSk7XHJcbiAgICAgIGFwcGx5RHJhZnRWYWx1ZXMoKTtcclxuICAgICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XHJcbiAgICB9XHJcbiAgfSwgW1xyXG4gICAgYWN0aXZpZGFkSWQsXHJcbiAgICBhcHBseURyYWZ0VmFsdWVzLFxuICAgIGFwcGx5VGV4dEVkaXRvclZhbHVlcyxcbiAgICBhc2lzdGVudGVUaXBvcyxcbiAgICBjb250YWN0TWV0aG9kcyxcbiAgICBkZWZhdWx0Q29udGFjdE1ldGhvZCxcbiAgICBkZWZhdWx0VmlzaXRUeXBlLFxuICAgIGluaXRpYWxBc2lzdGVudGUsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgbm9ybWFsaXplRGF0ZVRvSW5wdXQsXHJcbiAgICBzZXRBbnRlY2VkZW50ZXMsXHJcbiAgICBzZXRBc2lzdGVudGVUaXBvLFxyXG4gICAgc2V0Q29tZW50YXJpb3MsXHJcbiAgICBzZXRDb25jbHVzaW9uZXMsXHJcbiAgICBzZXREZXNjcmlwdGlvbixcclxuICAgIHNldElzSHlkcmF0aW5nLFxyXG4gICAgc2V0U3RhdHVzLFxyXG4gICAgc2V0VHJhbnNEYXRlLFxuICAgIHNldFZpc2l0VHlwZSxcbiAgICBzZXRDb250YWN0TWV0aG9kLFxuICAgIHZpc2l0VHlwZXMsXG4gIF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKHNob3VsZEh5ZHJhdGUpIHtcclxuICAgICAgaHlkcmF0ZUZyb21BcGkoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcygpO1xyXG4gICAgYXBwbHlUZXh0RWRpdG9yVmFsdWVzKCk7XHJcbiAgfSwgW2FwcGx5RHJhZnRWYWx1ZXMsIGFwcGx5VGV4dEVkaXRvclZhbHVlcywgaHlkcmF0ZUZyb21BcGksIHNob3VsZEh5ZHJhdGVdKTtcclxufTtcclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB3YWl0IH0gZnJvbSBcIi4uL3V0aWxzL3dhaXQudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi91dGlscy9pbmRJMThuLnRzXCI7XHJcbmltcG9ydCB7IHNob3dQZXJtaXNzaW9uTW9kYWwgfSBmcm9tIFwiLi4vdXRpbHMvcGVybWlzc2lvbnMudHNcIjtcclxuaW1wb3J0IHsgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUsIGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5pbXBvcnQgeyBzZXRUb3BiYXJBY3Rpb25Hcm91cFJlYWR5IH0gZnJvbSBcIi4uL3V0aWxzL3RvcGJhckFjdGlvblZpc2liaWxpdHkudHNcIjtcclxuXHJcbnR5cGUgVXNlRGV0YWlsVG9wYmFyQWN0aW9uc0FyZ3MgPSB7XHJcbiAgYnVzeTogYm9vbGVhbjtcclxuICBtb2RhbE9wZW46IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIGNhbkVkaXRIaXN0b3J5OiBib29sZWFuO1xyXG4gIGNhbkRlbGV0ZUhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XHJcbiAgc2V0TW9kYWxFcnJvcjogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgaGFuZGxlRW5hYmxlRWRpdDogKCkgPT4gdm9pZDtcclxuICBoYW5kbGVDYW5jZWxFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGhhbmRsZVVwZGF0ZTogKCkgPT4gUHJvbWlzZTxib29sZWFuPjtcclxuICBoYW5kbGVEZWxldGU6ICgpID0+IFByb21pc2U8Ym9vbGVhbj47XHJcbiAgYWN0aW9uR3JvdXBJZD86IHN0cmluZztcclxuICBwZXJtaXNzaW9uc1JlYWR5PzogYm9vbGVhbjtcclxuICBvcGVuQ29uZmlybTogKG9wdHM6IHtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBjb25maXJtVGV4dD86IHN0cmluZztcclxuICAgIG9uQ29uZmlybT86ICgpID0+IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+IHwgYm9vbGVhbiB8IHZvaWQ7XHJcbiAgfSkgPT4gdm9pZDtcclxuICBjbG9zZUNvbmZpcm06ICgpID0+IHZvaWQ7XHJcbn07XHJcblxyXG4vLyBDb29yZGluYXRlcyB0b3BiYXIgaWNvbiB2aXNpYmlsaXR5IGFuZCBhY3Rpb24gZXZlbnRzIGZvciBkZXRhaWwgcGFnZS5cclxuZXhwb3J0IGNvbnN0IHVzZURldGFpbFRvcGJhckFjdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgbW9kYWxPcGVuLFxyXG4gIGlzRWRpdGluZyxcclxuICBjYW5FZGl0SGlzdG9yeSxcclxuICBjYW5EZWxldGVIaXN0b3J5LFxyXG4gIHRyYW5zRGF0ZSxcclxuICBzZXRNb2RhbEVycm9yLFxyXG4gIGhhbmRsZUVuYWJsZUVkaXQsXHJcbiAgaGFuZGxlQ2FuY2VsRWRpdCxcclxuICBoYW5kbGVVcGRhdGUsXHJcbiAgaGFuZGxlRGVsZXRlLFxyXG4gIGFjdGlvbkdyb3VwSWQgPSBcInZpc2l0LWRldGFpbC1hY3Rpb25zXCIsXHJcbiAgcGVybWlzc2lvbnNSZWFkeSA9IHRydWUsXHJcbiAgb3BlbkNvbmZpcm0sXHJcbiAgY2xvc2VDb25maXJtLFxyXG59OiBVc2VEZXRhaWxUb3BiYXJBY3Rpb25zQXJncykgPT4ge1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBlcm1pc3Npb25zUmVhZHkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBlZGl0SWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRFZGl0SWNvblwiKTtcclxuICAgIGNvbnN0IHNhdmVJY29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdFNhdmVJY29uXCIpO1xyXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aXNpdERlbGV0ZUJ0blwiKTtcclxuICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRDYW5jZWxCdG5cIik7XHJcbiAgICBjb25zdCBlZGl0QnRuID0gZWRpdEljb24/LmNsb3Nlc3QoXCJidXR0b25cIikgPz8gbnVsbDtcclxuICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgaWYgKGVkaXRCdG4pIGVkaXRCdG4uY2xhc3NMaXN0LnJlbW92ZShcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChlZGl0SWNvbikgZWRpdEljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKHNhdmVJY29uKSBzYXZlSWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZGVsZXRlQnRuKSBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICAgIGlmIChjYW5jZWxCdG4pIGNhbmNlbEJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidG9wYmFyLWhpZGRlblwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChlZGl0QnRuKSBlZGl0QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoZWRpdEljb24pIGVkaXRJY29uLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XHJcbiAgICAgIGlmIChzYXZlSWNvbikgc2F2ZUljb24uY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcclxuICAgICAgaWYgKGRlbGV0ZUJ0bikgZGVsZXRlQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b3BiYXItaGlkZGVuXCIpO1xyXG4gICAgICBpZiAoY2FuY2VsQnRuKSBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZChcInRvcGJhci1oaWRkZW5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VG9wYmFyQWN0aW9uR3JvdXBSZWFkeShhY3Rpb25Hcm91cElkKTtcclxuICB9LCBbYWN0aW9uR3JvdXBJZCwgaXNFZGl0aW5nLCBwZXJtaXNzaW9uc1JlYWR5XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIXBlcm1pc3Npb25zUmVhZHkpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBvbkVkaXQgPSAoKSA9PiB7XHJcbiAgICAgIGlmICghY2FuRWRpdEhpc3RvcnkpIHtcclxuICAgICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpc0VkaXRpbmcpIHtcclxuICAgICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcclxuICAgICAgICBzZXRNb2RhbEVycm9yKFwiXCIpO1xyXG4gICAgICAgIG9wZW5Db25maXJtKHtcclxuICAgICAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19UaXRsZVwiLCBcIlZpc2l0c19EZXRhaWxfU2F2ZUNoYW5nZXNfVGl0bGVcIiksXHJcbiAgICAgICAgICBtZXNzYWdlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIsIFwiVmlzaXRzX0RldGFpbF9TYXZlQ2hhbmdlc19Cb2R5XCIpLFxyXG4gICAgICAgICAgY29uZmlybVRleHQ6IGluZFQoXCJDb21tb25fU2F2ZVwiLCBcIkNvbW1vbl9TYXZlXCIpLFxyXG4gICAgICAgICAgb25Db25maXJtOiBhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG9rID0gYXdhaXQgaGFuZGxlVXBkYXRlKCk7XHJcbiAgICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICAgIGNsb3NlQ29uZmlybSgpO1xyXG4gICAgICAgICAgICAgIHNldEhpc3RvcnlGaWx0ZXJGb3JEYXRlKHRyYW5zRGF0ZSk7XHJcbiAgICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xyXG4gICAgICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcclxuICAgICAgICAgICAgICBhd2FpdCB3YWl0KDEyMDApO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvSGlzdG9yaWFsL0hpc3RvcnlcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGhhbmRsZUVuYWJsZUVkaXQoKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBvbkRlbGV0ZSA9ICgpID0+IHtcclxuICAgICAgaWYgKCFjYW5EZWxldGVIaXN0b3J5KSB7XHJcbiAgICAgICAgc2hvd1Blcm1pc3Npb25Nb2RhbCgpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoYnVzeSB8fCBtb2RhbE9wZW4pIHJldHVybjtcclxuICAgICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgICAgb3BlbkNvbmZpcm0oe1xyXG4gICAgICAgIHRpdGxlOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVBY3Rpdml0eV9UaXRsZVwiLCBcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfVGl0bGVcIiksXHJcbiAgICAgICAgbWVzc2FnZTogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfQm9keVwiLCBcIlZpc2l0c19EZXRhaWxfRGVsZXRlQWN0aXZpdHlfQm9keVwiKSxcclxuICAgICAgICBjb25maXJtVGV4dDogaW5kVChcIkNvbW1vbl9EZWxldGVcIiwgXCJDb21tb25fRGVsZXRlXCIpLFxyXG4gICAgICAgIG9uQ29uZmlybTogYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3Qgb2sgPSBhd2FpdCBoYW5kbGVEZWxldGUoKTtcclxuICAgICAgICAgIGlmIChvaykge1xyXG4gICAgICAgICAgICBjbG9zZUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgc2V0SGlzdG9yeUZpbHRlckZvckRhdGUodHJhbnNEYXRlKTtcclxuICAgICAgICAgICAgYXdhaXQgd2FpdCgyMDApO1xyXG4gICAgICAgICAgICBmbGFzaEFjdGlvbk1hcmsoXCJva0RlbFByb2Nlc3NcIiwgMTIwMCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHdhaXQoMTIwMCk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5fX2luZEJ5cGFzc05hdmlnYXRpb25HdWFyZE9uY2U/LigpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL0hpc3RvcmlhbC9IaXN0b3J5XCI7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gb2s7XHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG9uQ2FuY2VsRWRpdCA9ICgpID0+IHtcclxuICAgICAgaWYgKGJ1c3kgfHwgbW9kYWxPcGVuKSByZXR1cm47XHJcbiAgICAgIGhhbmRsZUNhbmNlbEVkaXQoKTtcclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1lZGl0XCIsIG9uRWRpdCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWRlbGV0ZVwiLCBvbkRlbGV0ZSk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInZpc2l0LWNhbmNlbC1lZGl0XCIsIG9uQ2FuY2VsRWRpdCk7XHJcbiAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWVkaXRcIiwgb25FZGl0KTtcclxuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ2aXNpdC1kZWxldGVcIiwgb25EZWxldGUpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInZpc2l0LWNhbmNlbC1lZGl0XCIsIG9uQ2FuY2VsRWRpdCk7XHJcbiAgICB9O1xyXG4gIH0sIFtcclxuICAgIGJ1c3ksXHJcbiAgICBjYW5EZWxldGVIaXN0b3J5LFxyXG4gICAgY2FuRWRpdEhpc3RvcnksXHJcbiAgICBjbG9zZUNvbmZpcm0sXHJcbiAgICBoYW5kbGVDYW5jZWxFZGl0LFxyXG4gICAgaGFuZGxlRGVsZXRlLFxyXG4gICAgaGFuZGxlRW5hYmxlRWRpdCxcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGlzRWRpdGluZyxcclxuICAgIG1vZGFsT3BlbixcclxuICAgIG9wZW5Db25maXJtLFxyXG4gICAgcGVybWlzc2lvbnNSZWFkeSxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICB0cmFuc0RhdGUsXHJcbiAgXSk7XHJcbn07XHJcbiIsICJcdUZFRkZpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnksIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvc2Vzc2lvbkV4cGlyeS50c1wiO1xyXG5cclxuY29uc3QgRURJVF9NT0RFX1RUTF9NUyA9IDYgKiA2MCAqIDYwICogMTAwMDtcclxuY29uc3QgREVUQUlMX0RSQUZUX1RUTF9NUyA9IDI0ICogNjAgKiA2MCAqIDEwMDA7XHJcblxyXG50eXBlIFVzZURldGFpbEVkaXRTZXNzaW9uQXJncyA9IHtcclxuICBhY3RpdmlkYWRJZDogc3RyaW5nO1xyXG4gIHJlY0lkOiBzdHJpbmc7XHJcbiAgY2FuRWRpdEhpc3Rvcnk6IGJvb2xlYW47XHJcbiAgaXNFZGl0aW5nOiBib29sZWFuO1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIGNvbnRhY3RNZXRob2Q6IHN0cmluZztcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgc2V0VHJhbnNEYXRlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0VmlzaXRUeXBlOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcbiAgc2V0Q29udGFjdE1ldGhvZDogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XG4gIHNldEFzaXN0ZW50ZVRpcG86IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xuICBzZXREZXNjcmlwdGlvbjogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0Q29tZW50YXJpb3M6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEFudGVjZWRlbnRlczogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248c3RyaW5nPj47XHJcbiAgc2V0Q29uY2x1c2lvbmVzOiBSZWFjdC5EaXNwYXRjaDxSZWFjdC5TZXRTdGF0ZUFjdGlvbjxzdHJpbmc+PjtcclxufTtcclxuXHJcbnR5cGUgRGV0YWlsRHJhZnRWYWx1ZXMgPSB7XHJcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHZpc2l0VHlwZTogc3RyaW5nO1xuICBjb250YWN0TWV0aG9kOiBzdHJpbmc7XG4gIGFzaXN0ZW50ZVRpcG86IHN0cmluZztcbiAgZGVzY3JpcHRpb246IHN0cmluZztcclxuICBjb21lbnRhcmlvczogc3RyaW5nO1xyXG4gIGFudGVjZWRlbnRlczogc3RyaW5nO1xyXG4gIGNvbmNsdXNpb25lczogc3RyaW5nO1xyXG59O1xyXG5cclxuLy8gTWFuYWdlcyBlZGl0LW1vZGUgc2Vzc2lvbiBmbGFncyBhbmQgZGV0YWlsIGRyYWZ0IHBlcnNpc3RlbmNlLlxyXG5leHBvcnQgY29uc3QgdXNlRGV0YWlsRWRpdFNlc3Npb24gPSAoe1xyXG4gIGFjdGl2aWRhZElkLFxyXG4gIHJlY0lkLFxyXG4gIGNhbkVkaXRIaXN0b3J5LFxyXG4gIGlzRWRpdGluZyxcclxuICBzZXRJc0VkaXRpbmcsXHJcbiAgdHJhbnNEYXRlLFxuICB2aXNpdFR5cGUsXG4gIGNvbnRhY3RNZXRob2QsXG4gIGFzaXN0ZW50ZVRpcG8sXG4gIGRlc2NyaXB0aW9uLFxyXG4gIGNvbWVudGFyaW9zLFxyXG4gIGFudGVjZWRlbnRlcyxcclxuICBjb25jbHVzaW9uZXMsXHJcbiAgc2V0VHJhbnNEYXRlLFxuICBzZXRWaXNpdFR5cGUsXG4gIHNldENvbnRhY3RNZXRob2QsXG4gIHNldEFzaXN0ZW50ZVRpcG8sXG4gIHNldERlc2NyaXB0aW9uLFxyXG4gIHNldENvbWVudGFyaW9zLFxyXG4gIHNldEFudGVjZWRlbnRlcyxcclxuICBzZXRDb25jbHVzaW9uZXMsXHJcbn06IFVzZURldGFpbEVkaXRTZXNzaW9uQXJncykgPT4ge1xyXG4gIGNvbnN0IGVkaXRNb2RlS2V5UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IGRyYWZ0S2V5UmVmID0gdXNlUmVmKFwiXCIpO1xyXG4gIGNvbnN0IGRyYWZ0UGVyc2lzdFRpbWVyUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xyXG5cclxuICAvLyBQZXJzaXN0IGVkaXQgbW9kZSB3aGlsZSB1c2VyIG5hdmlnYXRlcyB0byB0aGUgdGV4dCBlZGl0b3IgYW5kIGJhY2suXHJcbiAgY29uc3Qgc3luY0VkaXRNb2RlRmxhZyA9IHVzZUNhbGxiYWNrKChlbmFibGVkOiBib29sZWFuKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBlZGl0TW9kZUtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIGlmIChlbmFibGVkKSB7XHJcbiAgICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5LCBcInRydWVcIiwgRURJVF9NT0RFX1RUTF9NUyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IHN5bmNFZGl0TW9kZU9uRW50cnkgPSB1c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBjb25zdCBiYXNlSWQgPSBhY3RpdmlkYWRJZCB8fCByZWNJZCB8fCBcImRlZmF1bHRcIjtcclxuICAgIGNvbnN0IGtleSA9IGBpbmRfdmlzaXRfZWRpdF8ke2Jhc2VJZH1gO1xyXG4gICAgY29uc3QgcmV0dXJuS2V5ID0gYCR7a2V5fV9yZXR1cm5gO1xyXG4gICAgY29uc3QgZHJhZnRLZXkgPSBgaW5kX3Zpc2l0X2RyYWZ0XyR7YmFzZUlkfWA7XHJcbiAgICBlZGl0TW9kZUtleVJlZi5jdXJyZW50ID0ga2V5O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGFsbG93UmVzdG9yZSA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkocmV0dXJuS2V5KSA9PT0gXCIxXCI7XHJcbiAgICAgIGlmIChhbGxvd1Jlc3RvcmUpIHtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KHJldHVybktleSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChjYW5FZGl0SGlzdG9yeSAmJiBhbGxvd1Jlc3RvcmUgJiYgZ2V0U2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpID09PSBcInRydWVcIikge1xyXG4gICAgICAgIHNldElzRWRpdGluZyh0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZXRJc0VkaXRpbmcoZmFsc2UpO1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGRyYWZ0S2V5KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICAgIHJlbW92ZVNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICAgICAgICByZW1vdmVTZXNzaW9uVmFsdWVXaXRoRXhwaXJ5KGRyYWZ0S2V5KTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCB7XHJcbiAgICAgIC8qIGlnbm9yZSAqL1xyXG4gICAgfVxyXG4gIH0sIFthY3RpdmlkYWRJZCwgY2FuRWRpdEhpc3RvcnksIHJlY0lkLCBzZXRJc0VkaXRpbmddKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIHN5bmNFZGl0TW9kZU9uRW50cnkoKTtcclxuICB9LCBbc3luY0VkaXRNb2RlT25FbnRyeV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3Qgb25QYWdlU2hvdyA9IChldmVudDogUGFnZVRyYW5zaXRpb25FdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBuYXZFbnRyeSA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlXHJcbiAgICAgICAgPyAocGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZShcIm5hdmlnYXRpb25cIilbMF0gYXMgUGVyZm9ybWFuY2VOYXZpZ2F0aW9uVGltaW5nIHwgdW5kZWZpbmVkKVxyXG4gICAgICAgIDogdW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBpc0JhY2tGb3J3YXJkID0gbmF2RW50cnk/LnR5cGUgPT09IFwiYmFja19mb3J3YXJkXCI7XHJcbiAgICAgIGlmIChldmVudD8ucGVyc2lzdGVkIHx8IGlzQmFja0ZvcndhcmQpIHtcclxuICAgICAgICBzeW5jRWRpdE1vZGVPbkVudHJ5KCk7XHJcbiAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwYWdlc2hvd1wiLCBvblBhZ2VTaG93KTtcclxuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBhZ2VzaG93XCIsIG9uUGFnZVNob3cpO1xyXG4gIH0sIFtzeW5jRWRpdE1vZGVPbkVudHJ5XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBgaW5kX3Zpc2l0X2RyYWZ0XyR7YWN0aXZpZGFkSWQgfHwgcmVjSWQgfHwgXCJkZWZhdWx0XCJ9YDtcclxuICAgIGRyYWZ0S2V5UmVmLmN1cnJlbnQgPSBrZXk7XHJcbiAgfSwgW2FjdGl2aWRhZElkLCByZWNJZF0pO1xyXG5cclxuICBjb25zdCBzYXZlRHJhZnQgPSB1c2VDYWxsYmFjaygoZHJhZnQ6IERldGFpbERyYWZ0VmFsdWVzKSA9PiB7XHJcbiAgICBjb25zdCBrZXkgPSBkcmFmdEtleVJlZi5jdXJyZW50O1xyXG4gICAgaWYgKCFrZXkpIHJldHVybjtcclxuICAgIHNldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5LCBKU09OLnN0cmluZ2lmeShkcmFmdCksIERFVEFJTF9EUkFGVF9UVExfTVMpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgY2xlYXJEcmFmdCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG4gICAgcmVtb3ZlU2Vzc2lvblZhbHVlV2l0aEV4cGlyeShrZXkpO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgYXBwbHlEcmFmdFZhbHVlcyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGNvbnN0IGtleSA9IGRyYWZ0S2V5UmVmLmN1cnJlbnQ7XHJcbiAgICBpZiAoIWtleSkgcmV0dXJuO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJhdyA9IGdldFNlc3Npb25WYWx1ZVdpdGhFeHBpcnkoa2V5KTtcclxuICAgICAgaWYgKCFyYXcpIHJldHVybjtcclxuICAgICAgY29uc3QgZHJhZnQgPSBKU09OLnBhcnNlKHJhdykgYXMgUGFydGlhbDxEZXRhaWxEcmFmdFZhbHVlcz47XHJcbiAgICAgIGlmICghZHJhZnQgfHwgdHlwZW9mIGRyYWZ0ICE9PSBcIm9iamVjdFwiKSByZXR1cm47XHJcblxyXG4gICAgICBpZiAoZHJhZnQudHJhbnNEYXRlICE9PSB1bmRlZmluZWQpIHNldFRyYW5zRGF0ZShTdHJpbmcoZHJhZnQudHJhbnNEYXRlKSk7XG4gICAgICBpZiAoZHJhZnQudmlzaXRUeXBlICE9PSB1bmRlZmluZWQpIHNldFZpc2l0VHlwZShTdHJpbmcoZHJhZnQudmlzaXRUeXBlKSk7XG4gICAgICBpZiAoZHJhZnQuY29udGFjdE1ldGhvZCAhPT0gdW5kZWZpbmVkKSBzZXRDb250YWN0TWV0aG9kKFN0cmluZyhkcmFmdC5jb250YWN0TWV0aG9kKSk7XG4gICAgICBpZiAoZHJhZnQuYXNpc3RlbnRlVGlwbyAhPT0gdW5kZWZpbmVkKSBzZXRBc2lzdGVudGVUaXBvKFN0cmluZyhkcmFmdC5hc2lzdGVudGVUaXBvKSk7XG4gICAgICBpZiAoZHJhZnQuZGVzY3JpcHRpb24gIT09IHVuZGVmaW5lZCkgc2V0RGVzY3JpcHRpb24oU3RyaW5nKGRyYWZ0LmRlc2NyaXB0aW9uKSk7XHJcbiAgICAgIGlmIChkcmFmdC5jb21lbnRhcmlvcyAhPT0gdW5kZWZpbmVkKSBzZXRDb21lbnRhcmlvcyhTdHJpbmcoZHJhZnQuY29tZW50YXJpb3MpKTtcclxuICAgICAgaWYgKGRyYWZ0LmFudGVjZWRlbnRlcyAhPT0gdW5kZWZpbmVkKSBzZXRBbnRlY2VkZW50ZXMoU3RyaW5nKGRyYWZ0LmFudGVjZWRlbnRlcykpO1xyXG4gICAgICBpZiAoZHJhZnQuY29uY2x1c2lvbmVzICE9PSB1bmRlZmluZWQpIHNldENvbmNsdXNpb25lcyhTdHJpbmcoZHJhZnQuY29uY2x1c2lvbmVzKSk7XHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgLyogaWdub3JlICovXHJcbiAgICB9XHJcbiAgfSwgW3NldEFudGVjZWRlbnRlcywgc2V0QXNpc3RlbnRlVGlwbywgc2V0Q29tZW50YXJpb3MsIHNldENvbmNsdXNpb25lcywgc2V0Q29udGFjdE1ldGhvZCwgc2V0RGVzY3JpcHRpb24sIHNldFRyYW5zRGF0ZSwgc2V0VmlzaXRUeXBlXSk7XG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFpc0VkaXRpbmcpIHtcclxuICAgICAgaWYgKGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCk7XHJcbiAgICAgICAgZHJhZnRQZXJzaXN0VGltZXJSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgIGNsZWFyVGltZW91dChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50ID0gbnVsbDtcclxuICAgICAgc2F2ZURyYWZ0KHtcclxuICAgICAgICB0cmFuc0RhdGUsXG4gICAgICAgIHZpc2l0VHlwZSxcbiAgICAgICAgY29udGFjdE1ldGhvZCxcbiAgICAgICAgYXNpc3RlbnRlVGlwbyxcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgY29tZW50YXJpb3MsXHJcbiAgICAgICAgYW50ZWNlZGVudGVzLFxyXG4gICAgICAgIGNvbmNsdXNpb25lcyxcclxuICAgICAgfSk7XHJcbiAgICB9LCAxODApO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChkcmFmdFBlcnNpc3RUaW1lclJlZi5jdXJyZW50KSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQpO1xyXG4gICAgICAgIGRyYWZ0UGVyc2lzdFRpbWVyUmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH0sIFthbnRlY2VkZW50ZXMsIGFzaXN0ZW50ZVRpcG8sIGNvbWVudGFyaW9zLCBjb25jbHVzaW9uZXMsIGNvbnRhY3RNZXRob2QsIGRlc2NyaXB0aW9uLCBpc0VkaXRpbmcsIHNhdmVEcmFmdCwgdHJhbnNEYXRlLCB2aXNpdFR5cGVdKTtcblxyXG4gIHJldHVybiB7XHJcbiAgICBlZGl0TW9kZUtleVJlZixcclxuICAgIHN5bmNFZGl0TW9kZUZsYWcsXHJcbiAgICBjbGVhckRyYWZ0LFxyXG4gICAgYXBwbHlEcmFmdFZhbHVlcyxcclxuICB9O1xyXG59O1xyXG4iLCAiXHVGRUZGaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5pbXBvcnQgeyBzaG93UGVybWlzc2lvbk1vZGFsIH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3Blcm1pc3Npb25zLnRzXCI7XHJcbmltcG9ydCB7IGZsYXNoQWN0aW9uTWFyayB9IGZyb20gXCIuLi8uLi8uLi91dGlscy92aXNpdGFzSGlzdG9yeS50c1wiO1xyXG5cclxudHlwZSBPcHRpb25MaWtlID0ge1xyXG4gIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIFZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gIHRleHQ/OiBzdHJpbmc7XHJcbiAgVGV4dD86IHN0cmluZztcclxufTtcclxuXHJcbnR5cGUgVmlzaXRDb21tYW5kUmVzcG9uc2UgPSB7XHJcbiAgc3VjY2Vzcz86IGJvb2xlYW47XHJcbiAgbWVzc2FnZT86IHN0cmluZztcclxuICBTdWNjZXNzPzogYm9vbGVhbjtcclxuICBNZXNzYWdlPzogc3RyaW5nO1xyXG59O1xyXG5cclxuY29uc3QgaXNDb21tYW5kU3VjY2VzcyA9IChyZXNwb25zZTogVmlzaXRDb21tYW5kUmVzcG9uc2UpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSB8fCByZXNwb25zZS5TdWNjZXNzID09PSB0cnVlO1xyXG59O1xyXG5cclxuY29uc3QgZ2V0Q29tbWFuZE1lc3NhZ2UgPSAocmVzcG9uc2U6IFZpc2l0Q29tbWFuZFJlc3BvbnNlKTogc3RyaW5nID0+IHtcclxuICBjb25zdCByYXcgPSByZXNwb25zZS5tZXNzYWdlID8/IHJlc3BvbnNlLk1lc3NhZ2U7XHJcbiAgcmV0dXJuIHR5cGVvZiByYXcgPT09IFwic3RyaW5nXCIgPyByYXcudHJpbSgpIDogXCJcIjtcclxufTtcclxuXHJcbi8vIEtlZXAgcmVjSWQgYXMgYSBub3JtYWxpemVkIHNpZ25lZCBpbnRlZ2VyIHN0cmluZyB0byBhdm9pZCBsb25nIHByZWNpc2lvbiBsb3NzIGluIEpTIG51bWJlcnMuXHJcbmNvbnN0IHJlc29sdmVTYWZlUmVjSWQgPSAocmF3UmVjSWQ6IHN0cmluZyk6IHN0cmluZyB8IG51bGwgPT4ge1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBTdHJpbmcocmF3UmVjSWQgPz8gXCJcIikudHJpbSgpO1xyXG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIG51bGw7XHJcblxyXG4gIGlmICghL14tP1xcZCskLy50ZXN0KG5vcm1hbGl6ZWQpKSByZXR1cm4gbnVsbDtcclxuXHJcbiAgY29uc3QgYWJzb2x1dGVEaWdpdHMgPSBub3JtYWxpemVkLnN0YXJ0c1dpdGgoXCItXCIpID8gbm9ybWFsaXplZC5zbGljZSgxKSA6IG5vcm1hbGl6ZWQ7XHJcbiAgaWYgKCFhYnNvbHV0ZURpZ2l0cyB8fCAvXjArJC8udGVzdChhYnNvbHV0ZURpZ2l0cykpIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gbm9ybWFsaXplZDtcclxufTtcclxuXHJcbmNvbnN0IHNob3VsZExvZ1JlY0lkSW5EZXYgPSAoKTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIXdpbmRvdy5sb2NhdGlvbikgcmV0dXJuIGZhbHNlO1xyXG4gIGNvbnN0IGhvc3QgPSBTdHJpbmcod2luZG93LmxvY2F0aW9uLmhvc3RuYW1lIHx8IFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gIHJldHVybiBob3N0ID09PSBcImxvY2FsaG9zdFwiIHx8IGhvc3QgPT09IFwiMTI3LjAuMC4xXCIgfHwgaG9zdC5lbmRzV2l0aChcIi5sb2NhbFwiKTtcclxufTtcclxuXHJcbmNvbnN0IGxvZ1NhZmVSZWNJZEluRGV2ID0gKG9wZXJhdGlvbjogXCJ1cGRhdGVcIiB8IFwiZGVsZXRlXCIsIHNhZmVSZWNJZDogc3RyaW5nKTogdm9pZCA9PiB7XHJcbiAgaWYgKCFzaG91bGRMb2dSZWNJZEluRGV2KCkpIHJldHVybjtcclxuICBjb25zb2xlLmluZm8oYFt2aXNpdGFzLWRldGFpbF0gJHtvcGVyYXRpb259IHJlY0lkYCwgc2FmZVJlY0lkKTtcclxufTtcclxuXHJcbnR5cGUgVXNlRGV0YWlsTXV0YXRpb25zQXJncyA9IHtcclxuICBidXN5OiBib29sZWFuO1xyXG4gIGlzRWRpdGluZzogYm9vbGVhbjtcclxuICBjYW5FZGl0SGlzdG9yeTogYm9vbGVhbjtcclxuICBjYW5EZWxldGVIaXN0b3J5OiBib29sZWFuO1xyXG4gIHJlY0lkOiBzdHJpbmc7XHJcbiAgYWNjb3VudE51bTogc3RyaW5nO1xuICB0cmFuc0RhdGU6IHN0cmluZztcbiAgdmlzaXRUeXBlOiBzdHJpbmc7XG4gIGNvbnRhY3RNZXRob2Q6IHN0cmluZztcbiAgYXNpc3RlbnRlVGlwbzogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG4gIGNvbWVudGFyaW9zOiBzdHJpbmc7XHJcbiAgYW50ZWNlZGVudGVzOiBzdHJpbmc7XHJcbiAgY29uY2x1c2lvbmVzOiBzdHJpbmc7XHJcbiAgdmlzaXRUeXBlczogT3B0aW9uTGlrZVtdO1xuICBjb250YWN0TWV0aG9kczogT3B0aW9uTGlrZVtdO1xuICBhc2lzdGVudGVUaXBvczogT3B0aW9uTGlrZVtdO1xuICBkZWZhdWx0VmlzaXRUeXBlOiBzdHJpbmc7XG4gIGRlZmF1bHRDb250YWN0TWV0aG9kOiBzdHJpbmc7XG4gIHJhd0luaXRpYWxWaXNpdFR5cGU6IHN0cmluZztcbiAgcmF3SW5pdGlhbENvbnRhY3RNZXRob2Q6IHN0cmluZztcbiAgcmF3SW5pdGlhbEFzaXN0ZW50ZTogc3RyaW5nO1xuICBtYXRjaE9wdGlvblZhbHVlOiAob3B0aW9uczogT3B0aW9uTGlrZVtdLCByYXc6IHVua25vd24pID0+IHN0cmluZztcclxuICBjbGVhckRyYWZ0OiAoKSA9PiB2b2lkO1xyXG4gIHN5bmNFZGl0TW9kZUZsYWc6IChlbmFibGVkOiBib29sZWFuKSA9PiB2b2lkO1xyXG4gIHNldE1vZGFsRXJyb3I6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldEJ1c3k6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PjtcclxuICBzZXRTdGF0dXM6IFJlYWN0LkRpc3BhdGNoPFJlYWN0LlNldFN0YXRlQWN0aW9uPHN0cmluZz4+O1xyXG4gIHNldElzRWRpdGluZzogUmVhY3QuRGlzcGF0Y2g8UmVhY3QuU2V0U3RhdGVBY3Rpb248Ym9vbGVhbj4+O1xyXG59O1xyXG5cclxuLy8gRW5jYXBzdWxhdGVzIHVwZGF0ZSBhbmQgZGVsZXRlIG11dGF0aW9ucyBmb3IgZGV0YWlsIGZvcm0gc3RhdGUuXHJcbmV4cG9ydCBjb25zdCB1c2VEZXRhaWxNdXRhdGlvbnMgPSAoe1xyXG4gIGJ1c3ksXHJcbiAgaXNFZGl0aW5nLFxyXG4gIGNhbkVkaXRIaXN0b3J5LFxyXG4gIGNhbkRlbGV0ZUhpc3RvcnksXHJcbiAgcmVjSWQsXHJcbiAgYWNjb3VudE51bSxcbiAgdHJhbnNEYXRlLFxuICB2aXNpdFR5cGUsXG4gIGNvbnRhY3RNZXRob2QsXG4gIGFzaXN0ZW50ZVRpcG8sXG4gIGRlc2NyaXB0aW9uLFxyXG4gIGNvbWVudGFyaW9zLFxyXG4gIGFudGVjZWRlbnRlcyxcclxuICBjb25jbHVzaW9uZXMsXHJcbiAgdmlzaXRUeXBlcyxcbiAgY29udGFjdE1ldGhvZHMsXG4gIGFzaXN0ZW50ZVRpcG9zLFxuICBkZWZhdWx0VmlzaXRUeXBlLFxuICBkZWZhdWx0Q29udGFjdE1ldGhvZCxcbiAgcmF3SW5pdGlhbFZpc2l0VHlwZSxcbiAgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QsXG4gIHJhd0luaXRpYWxBc2lzdGVudGUsXG4gIG1hdGNoT3B0aW9uVmFsdWUsXHJcbiAgY2xlYXJEcmFmdCxcclxuICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gIHNldE1vZGFsRXJyb3IsXHJcbiAgc2V0QnVzeSxcclxuICBzZXRTdGF0dXMsXHJcbiAgc2V0SXNFZGl0aW5nLFxyXG59OiBVc2VEZXRhaWxNdXRhdGlvbnNBcmdzKSA9PiB7XHJcbiAgY29uc3QgaGFuZGxlVXBkYXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kgfHwgIWlzRWRpdGluZykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCFjYW5FZGl0SGlzdG9yeSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlUmVjSWRWYWx1ZSA9IHJlc29sdmVTYWZlUmVjSWQocmVjSWQpO1xyXG4gICAgaWYgKHNhZmVSZWNJZFZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVmlzaXRzX0RldGFpbF9JbnZhbGlkUmVjSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSBhY3Rpdml0eSBpZGVudGlmaWVyLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfVXBkYXRpbmdcIiwgXCJVcGRhdGluZyBhY3Rpdml0eS4uLlwiKSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgbm9ybWFsaXplZFZpc2l0VHlwZSA9XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCB2aXNpdFR5cGUpIHx8XHJcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZSh2aXNpdFR5cGVzLCByYXdJbml0aWFsVmlzaXRUeXBlKSB8fFxyXG4gICAgICAgIGRlZmF1bHRWaXNpdFR5cGU7XHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRBc2lzdGVudGVUaXBvID1cbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgYXNpc3RlbnRlVGlwbykgfHxcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShhc2lzdGVudGVUaXBvcywgcmF3SW5pdGlhbEFzaXN0ZW50ZSkgfHxcbiAgICAgICAgcmF3SW5pdGlhbEFzaXN0ZW50ZTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRDb250YWN0TWV0aG9kID1cbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgY29udGFjdE1ldGhvZCkgfHxcbiAgICAgICAgbWF0Y2hPcHRpb25WYWx1ZShjb250YWN0TWV0aG9kcywgcmF3SW5pdGlhbENvbnRhY3RNZXRob2QpIHx8XG4gICAgICAgIGRlZmF1bHRDb250YWN0TWV0aG9kO1xuXG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICBhY2NvdW50TnVtLFxuICAgICAgICB2aXNpdFR5cGU6IG5vcm1hbGl6ZWRWaXNpdFR5cGUsXG4gICAgICAgIGNvbnRhY3RNZXRob2Q6IE51bWJlcihub3JtYWxpemVkQ29udGFjdE1ldGhvZCB8fCAwKSxcbiAgICAgICAgYXNpc3RlbnRlVGlwbzogbm9ybWFsaXplZEFzaXN0ZW50ZVRpcG8sXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHRyYW5zRGF0ZSxcclxuICAgICAgICBjb21lbnRhcmlvcyxcclxuICAgICAgICBhbnRlY2VkZW50ZXMsXHJcbiAgICAgICAgY29uY2x1c2lvbmVzLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbG9nU2FmZVJlY0lkSW5EZXYoXCJ1cGRhdGVcIiwgc2FmZVJlY0lkVmFsdWUpO1xyXG4gICAgICBjb25zdCBzYWZlUmVjSWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2FmZVJlY0lkVmFsdWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxWaXNpdENvbW1hbmRSZXNwb25zZT4oYC9WaXNpdGFzL1VwZGF0ZUFjdGl2aXR5LyR7c2FmZVJlY0lkfWAsIHtcclxuICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHBheWxvYWQpLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghaXNDb21tYW5kU3VjY2VzcyhyZXNwb25zZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZ2V0Q29tbWFuZE1lc3NhZ2UocmVzcG9uc2UpIHx8IGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZUZhaWxlZFwiLCBcIlVwZGF0ZSBmYWlsZWQuXCIpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc2V0U3RhdHVzKGluZFQoXCJWaXNpdHNfRGV0YWlsX1VwZGF0ZWRcIiwgXCJBY3Rpdml0eSB1cGRhdGVkXCIpKTtcclxuICAgICAgc2V0SXNFZGl0aW5nKGZhbHNlKTtcclxuICAgICAgc3luY0VkaXRNb2RlRmxhZyhmYWxzZSk7XHJcbiAgICAgIGNsZWFyRHJhZnQoKTtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgPyBlcnJvci5tZXNzYWdlXHJcbiAgICAgICAgOiBpbmRUKFwiVmlzaXRzX0RldGFpbF9VcGRhdGVFcnJvclwiLCBcIlVwZGF0ZSBlcnJvci5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICBzZXRCdXN5KGZhbHNlKTtcclxuICAgIH1cclxuICB9LCBbXHJcbiAgICBhY2NvdW50TnVtLFxyXG4gICAgYW50ZWNlZGVudGVzLFxyXG4gICAgYXNpc3RlbnRlVGlwbyxcclxuICAgIGFzaXN0ZW50ZVRpcG9zLFxyXG4gICAgYnVzeSxcclxuICAgIGNhbkVkaXRIaXN0b3J5LFxyXG4gICAgY2xlYXJEcmFmdCxcclxuICAgIGNvbWVudGFyaW9zLFxuICAgIGNvbmNsdXNpb25lcyxcbiAgICBjb250YWN0TWV0aG9kLFxuICAgIGNvbnRhY3RNZXRob2RzLFxuICAgIGRlZmF1bHRDb250YWN0TWV0aG9kLFxuICAgIGRlZmF1bHRWaXNpdFR5cGUsXG4gICAgZGVzY3JpcHRpb24sXHJcbiAgICBpc0VkaXRpbmcsXHJcbiAgICBtYXRjaE9wdGlvblZhbHVlLFxyXG4gICAgcmF3SW5pdGlhbEFzaXN0ZW50ZSxcbiAgICByYXdJbml0aWFsQ29udGFjdE1ldGhvZCxcbiAgICByYXdJbml0aWFsVmlzaXRUeXBlLFxuICAgIHJlY0lkLFxyXG4gICAgc2V0QnVzeSxcclxuICAgIHNldElzRWRpdGluZyxcclxuICAgIHNldE1vZGFsRXJyb3IsXHJcbiAgICBzZXRTdGF0dXMsXHJcbiAgICBzeW5jRWRpdE1vZGVGbGFnLFxyXG4gICAgdHJhbnNEYXRlLFxyXG4gICAgdmlzaXRUeXBlLFxyXG4gICAgdmlzaXRUeXBlcyxcclxuICBdKTtcclxuXHJcbiAgY29uc3QgaGFuZGxlRGVsZXRlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKGJ1c3kpIHJldHVybiBmYWxzZTtcclxuICAgIGlmICghY2FuRGVsZXRlSGlzdG9yeSkge1xyXG4gICAgICBzaG93UGVybWlzc2lvbk1vZGFsKCk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzYWZlUmVjSWRWYWx1ZSA9IHJlc29sdmVTYWZlUmVjSWQocmVjSWQpO1xyXG4gICAgaWYgKHNhZmVSZWNJZFZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBpbmRUKFwiVmlzaXRzX0RldGFpbF9JbnZhbGlkUmVjSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSBhY3Rpdml0eSBpZGVudGlmaWVyLiBSZWxvYWQgYW5kIHRyeSBhZ2Fpbi5cIik7XHJcbiAgICAgIHNldE1vZGFsRXJyb3IobWVzc2FnZSk7XHJcbiAgICAgIHNldFN0YXR1cyhtZXNzYWdlKTtcclxuICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kYWxFcnJvcihcIlwiKTtcclxuICAgIHNldEJ1c3kodHJ1ZSk7XHJcbiAgICBzZXRTdGF0dXMoaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRpbmdcIiwgXCJEZWxldGluZyBhY3Rpdml0eS4uLlwiKSk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbG9nU2FmZVJlY0lkSW5EZXYoXCJkZWxldGVcIiwgc2FmZVJlY0lkVmFsdWUpO1xyXG4gICAgICBjb25zdCBzYWZlUmVjSWQgPSBlbmNvZGVVUklDb21wb25lbnQoc2FmZVJlY0lkVmFsdWUpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoSnNvbjxWaXNpdENvbW1hbmRSZXNwb25zZT4oYC9WaXNpdGFzL0RlbGV0ZUFjdGl2aXR5LyR7c2FmZVJlY0lkfWAsIHsgbWV0aG9kOiBcIkRFTEVURVwiIH0pO1xyXG4gICAgICBpZiAoIWlzQ29tbWFuZFN1Y2Nlc3MocmVzcG9uc2UpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGdldENvbW1hbmRNZXNzYWdlKHJlc3BvbnNlKSB8fCBpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVGYWlsZWRcIiwgXCJEZWxldGUgZmFpbGVkLlwiKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFN0YXR1cyhpbmRUKFwiVmlzaXRzX0RldGFpbF9EZWxldGVkXCIsIFwiQWN0aXZpdHkgZGVsZXRlZFwiKSk7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZSA9IGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgZXJyb3IubWVzc2FnZVxyXG4gICAgICAgID8gZXJyb3IubWVzc2FnZVxyXG4gICAgICAgIDogaW5kVChcIlZpc2l0c19EZXRhaWxfRGVsZXRlRXJyb3JcIiwgXCJEZWxldGUgZXJyb3IuXCIpO1xyXG4gICAgICBzZXRNb2RhbEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICBzZXRTdGF0dXMobWVzc2FnZSk7XHJcbiAgICAgIGZsYXNoQWN0aW9uTWFyayhcImVycm9yUHJvY2Vzc1wiLCAxNTAwKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0QnVzeShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW2J1c3ksIGNhbkRlbGV0ZUhpc3RvcnksIHJlY0lkLCBzZXRCdXN5LCBzZXRNb2RhbEVycm9yLCBzZXRTdGF0dXNdKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGhhbmRsZVVwZGF0ZSxcclxuICAgIGhhbmRsZURlbGV0ZSxcclxuICB9O1xyXG59O1xyXG4iLCAiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgRGV0YWlsRm9ybSBmcm9tIFwiLi9EZXRhaWxGb3JtLnRzeFwiO1xyXG5pbXBvcnQgVmlzaXRhc1BhZ2VQcm92aWRlcnMgZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9WaXNpdGFzUGFnZVByb3ZpZGVycy50c3hcIjtcclxuaW1wb3J0IHsgbW91bnRSZWFjdElzbGFuZCwgbW91bnRXaGVuRG9jdW1lbnRSZWFkeSB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9yZWFjdElzbGFuZC50c3hcIjtcclxuXHJcbi8vIFBhZ2UgZW50cnkgZm9yIHRoZSB2aXNpdGFzIGRldGFpbCBpc2xhbmQuXHJcbmNvbnN0IERldGFpbFBhZ2UgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxWaXNpdGFzUGFnZVByb3ZpZGVycz5cclxuICAgICAgPERldGFpbEZvcm0gLz5cclxuICAgIDwvVmlzaXRhc1BhZ2VQcm92aWRlcnM+XHJcbiAgKTtcclxufTtcclxuXHJcbmNvbnN0IG1vdW50ID0gKCkgPT4ge1xyXG4gIGNvbnN0IHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlzaXRhLWRldGFpbC1yb290XCIpO1xyXG4gIGlmICghcm9vdEVsKSByZXR1cm47XHJcblxyXG4gIG1vdW50UmVhY3RJc2xhbmQocm9vdEVsLCA8RGV0YWlsUGFnZSAvPik7XHJcbn07XHJcblxyXG5tb3VudFdoZW5Eb2N1bWVudFJlYWR5KG1vdW50KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERldGFpbFBhZ2U7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUF5RTs7O0FDQWxFLElBQU0sb0JBQW9CLENBQUMsT0FBMkI7QUFDM0QsTUFBSSxDQUFDLEdBQUksUUFBTyxNQUFNO0FBQUEsRUFBQztBQUN2QixRQUFNLFNBQVMsQ0FBQyxVQUFpQixNQUFNLGVBQWU7QUFDdEQsUUFBTSxTQUFTLENBQUMsZUFBZSxlQUFlLFFBQVEsT0FBTyxPQUFPO0FBQ3BFLFNBQU8sUUFBUSxDQUFDLFFBQVEsR0FBRyxpQkFBaUIsS0FBSyxNQUFNLENBQUM7QUFDeEQsU0FBTyxNQUFNO0FBQ1gsV0FBTyxRQUFRLENBQUMsUUFBUSxHQUFHLG9CQUFvQixLQUFLLE1BQU0sQ0FBQztBQUFBLEVBQzdEO0FBQ0Y7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QUFBQSxVQUNGO0FBQUEsVUFFQSw0Q0FBQyxTQUFJLFdBQVUsb0RBQ2Isc0RBQUMsVUFBTSxrQkFBTyxHQUNoQjtBQUFBO0FBQUE7QUFBQSxJQUNGO0FBQUEsS0FDRjtBQUVKO0FBR2UsU0FBUixhQUE4QjtBQUNuQyxTQUNFLDRDQUFDLDRCQUFpQixpQkFBaUIsS0FBSywrQkFBK0IsMEVBQTBFLEdBQy9JLHNEQUFDLGFBQVUsR0FDYjtBQUVKOzs7QU9uaUJNLElBQUFDLHNCQUFBO0FBSE4sSUFBTSxhQUFhLE1BQU07QUFDdkIsU0FDRSw2Q0FBQyxnQ0FDQyx1REFBQyxjQUFXLEdBQ2Q7QUFFSjtBQUVBLElBQU0sUUFBUSxNQUFNO0FBQ2xCLFFBQU0sU0FBUyxTQUFTLGVBQWUsb0JBQW9CO0FBQzNELE1BQUksQ0FBQyxPQUFRO0FBRWIsbUJBQWlCLFFBQVEsNkNBQUMsY0FBVyxDQUFFO0FBQ3pDO0FBRUEsdUJBQXVCLEtBQUs7QUFFNUIsSUFBTyxxQkFBUTsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
