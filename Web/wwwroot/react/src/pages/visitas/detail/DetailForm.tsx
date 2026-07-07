import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import AppErrorBoundary from "../../../components/commons/AppErrorBoundary.tsx";
import { useVisitas } from "../../../hooks/useVisitas.ts";
import Spinner from "../../../components/commons/Spinner.tsx";
import VisitNarrativeFields from "../../../components/visitas/VisitNarrativeFields.tsx";
import { classNames } from "../../../utils/classNames.ts";
import { indT } from "../../../utils/indI18n.ts";
import { canAccess, showPermissionModal } from "../../../utils/permissions.ts";
import { bindReadOnlyGuard } from "../../../utils/domGuards.ts";
import { hasValue } from "../../../utils/strings.ts";
import { navigateToTextEditorField } from "../../../utils/textEditorNavigation.ts";
import { clearTextEditorValue } from "../../../utils/textEditor.ts";
import { flashActionMark } from "../../../utils/visitasHistory.ts";
import { setPreviewAnchor, showPreviewTooltip, isOverflowing } from "../../../utils/previewTooltip.ts";
import { useTapGuard } from "../../../hooks/useTapGuard.ts";
import { useConfirmDialog } from "../../../hooks/useConfirmDialog.ts";
import { useDetailHydration } from "../../../hooks/useDetailHydration.ts";
import { useDetailTopbarActions } from "../../../hooks/useDetailTopbarActions.ts";
import { useTextEditorFields } from "../../../hooks/useTextEditorFields.ts";
import { useModuleDataVisibility } from "../../../hooks/useModuleDataVisibility.ts";
import { useDetailEditSession } from "./useDetailEditSession.ts";
import { useDetailMutations } from "./useDetailMutations.ts";
import {
  formatModuleVisibleUserLabel,
  resolveModuleOwnerMutationAccess,
} from "../../../utils/moduleDataVisibility.ts";
import DetailOwnerField from "./DetailOwnerField.tsx";
import {
  postModulePermissionTrace,
  type ModulePermissionTracePayload,
} from "../../../services/modulePermissionTraceService.ts";

const EDITOR_RETURN_FLAG_TTL_MS = 2 * 60 * 60 * 1000;
const APP_CODE = "CRM";
const MODULE_CODE = "VISITAS_GESTION";

type DetailFormProps = {
  companyId?: string;
  axUserId?: string;
  permissionsRevision?: string;
};

const safeDetailText = (value: unknown): string => String(value ?? "").trim();

const firstDetailText = (...values: unknown[]): string => {
  for (const value of values) {
    const text = safeDetailText(value);
    if (text) return text;
  }

  return "";
};

const DetailApp = ({ companyId = "", axUserId = "", permissionsRevision = "" }: DetailFormProps) => {
  const { visitTypes, contactMethods, asistenteTipos } = useVisitas();
  const canViewHistory = canAccess("VISITAS_GESTION", "View");
  const canEditHistory = canAccess("VISITAS_GESTION", "Edit");
  const canDeleteHistory = canAccess("VISITAS_GESTION", "FullAccess");
  type ActivityDetailPayload = {
    recId?: string | number;
    RecId?: string | number;
    refRecIdActividad?: string | number;
    RefRecIdActividad?: string | number;
    actividadRecId?: string | number;
    ActividadRecId?: string | number;
    readOnly?: boolean;
    allowEdit?: boolean;
    editModeKey?: string;
    ownerAxUserId?: string;
    OwnerAxUserId?: string;
    ownerName?: string;
    OwnerName?: string;
    ownerAlias?: string;
    OwnerAlias?: string;
    createdByUserId?: string;
    CreatedByUserId?: string;
    userId?: string;
    UserId?: string;
    indCreatedByUserId?: string;
    INDCreatedByUserId?: string;
    canMutateVisit?: boolean | null;
    CanMutateVisit?: boolean | null;
    mutationPermissionStatus?: string;
    MutationPermissionStatus?: string;
    [key: string]: unknown;
  };

  const detail = (window.__ACTIVITY_DETAIL__ as ActivityDetailPayload) || {};
  const resolveActivityRecId = (payload: ActivityDetailPayload): string => {
    const candidates = [
      payload.recId,
      payload.RecId,
      payload.refRecIdActividad,
      payload.RefRecIdActividad,
      payload.actividadRecId,
      payload.ActividadRecId,
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
  // Strict record-level UI gating needs the detail API to return OwnerAxUserId.
  // Legacy fallbacks keep existing records usable while AX/API remains the final enforcement point.
  const detailOwnerAxUserId = firstDetailText(
    detail.ownerAxUserId,
    detail.OwnerAxUserId,
    detail.indCreatedByUserId,
    detail.INDCreatedByUserId,
    detail.createdByUserId,
    detail.CreatedByUserId,
    detail.userId,
    detail.UserId
  );
  const detailOwnerRawText = firstDetailText(detail.ownerName, detail.OwnerName, detail.ownerAlias, detail.OwnerAlias);
  const rawServerCanMutateVisit = detail.canMutateVisit ?? detail.CanMutateVisit;
  const hasServerMutationDecision = typeof rawServerCanMutateVisit === "boolean";
  const serverCanMutateVisit = rawServerCanMutateVisit === true;
  const serverMutationPermissionStatus = firstDetailText(
    detail.mutationPermissionStatus,
    detail.MutationPermissionStatus
  );
  const logPermissionTrace = useCallback(
    (eventName: string, data: ModulePermissionTracePayload = {}) => {
      postModulePermissionTrace(eventName, {
        recId: activityRecId,
        ownerAxUserId: detailOwnerAxUserId,
        viewerAxUserId: axUserId,
        companyId,
        permissionsRevision,
        serverCanMutateVisit: hasServerMutationDecision ? serverCanMutateVisit : null,
        serverMutationPermissionStatus,
        appCode: APP_CODE,
        moduleCode: MODULE_CODE,
        ...data,
      });
    },
    [
      activityRecId,
      axUserId,
      companyId,
      detailOwnerAxUserId,
      hasServerMutationDecision,
      permissionsRevision,
      serverCanMutateVisit,
      serverMutationPermissionStatus,
    ]
  );

  const { visibleUserByOwnerAxUserId, visibleUsersReady } = useModuleDataVisibility({
    enabled: canViewHistory || canEditHistory || canDeleteHistory,
    companyId,
    axUserId,
    permissionsRevision,
    appCode: APP_CODE,
    moduleCode: MODULE_CODE,
    allowCachedUsers: false,
    preloadedUsers: typeof window !== "undefined" ? window.__IND_VISIBLE_VISIT_USERS__ : undefined,
    onForbidden: showPermissionModal,
    onDebug: logPermissionTrace,
  });

  const textEditorBaseId = activityRecId ? `Visita.${activityRecId}` : "Visita";
  const fieldIdComentarios = `${textEditorBaseId}.Comentarios`;
  const fieldIdAntecedentes = `${textEditorBaseId}.Antecedentes`;
  const fieldIdConclusiones = `${textEditorBaseId}.Conclusiones`;

  const normalizeDateToInput = useCallback((value) => {
    if (!value) return "";
    const raw = String(value).trim();
    if (!raw) return "";
    // Already yyyy-MM-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
    // dd.MM.yyyy or dd/MM/yyyy
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

  const matchOptionValue = useCallback((options, raw) => {
    if (raw == null) return "";
    const rawStr = String(raw).trim();
    if (!rawStr) return "";

    const normalizeText = (s) =>
      String(s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

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
  const rawInitialContactMethod = String(
    detail.contactMethod ?? detail.ContactMethod ?? ""
  );
  const initialContactMethod = matchOptionValue(contactMethods, rawInitialContactMethod);
  const rawInitialAsistente = String(
    detail.asistenteTipo ?? detail.AsistenteTipo ?? (asistenteTipos[0]?.value ?? asistenteTipos[0]?.Value ?? "")
  );
  const initialAsistente = matchOptionValue(asistenteTipos, rawInitialAsistente) || rawInitialAsistente;

  const [transDate, setTransDate] = useState(initialTransDate);
  const [visitType, setVisitType] = useState(initialVisitType);
  const [contactMethod, setContactMethod] = useState(initialContactMethod);
  const [asistenteTipo, setAsistenteTipo] = useState(initialAsistente);
  const [description, setDescription] = useState(String(detail.description ?? detail.Description ?? ""));
  const [comentarios, setComentarios] = useState(String(detail.comentarios ?? detail.Comentarios ?? ""));
  const [antecedentes, setAntecedentes] = useState(String(detail.antecedentes ?? detail.Antecedentes ?? ""));
  const [conclusiones, setConclusiones] = useState(String(detail.conclusiones ?? detail.Conclusiones ?? ""));
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHydrating, setIsHydrating] = useState(false);
  const [modalError, setModalError] = useState("");
  const readOnlySurfaceRef = useRef(null);
  const editSnapshotRef = useRef(null);
  const permissionTraceRef = useRef("");

  const recId = activityRecId;
  const accountNum = String(detail.accountNum ?? detail.AccountNum ?? "");
  const actividadId = String(detail.actividadId ?? detail.ActividadId ?? "");
  const mutationAccess = useMemo(() => {
    return resolveModuleOwnerMutationAccess({
      usersByOwnerAxUserId: visibleUserByOwnerAxUserId,
      ownerAxUserId: detailOwnerAxUserId,
      viewerAxUserId: axUserId,
      visibleUsersReady,
    });
  }, [axUserId, detailOwnerAxUserId, visibleUserByOwnerAxUserId, visibleUsersReady]);
  const visibleOwner = mutationAccess.owner;
  const detailOwnerText = visibleOwner ? formatModuleVisibleUserLabel(visibleOwner) : detailOwnerRawText || detailOwnerAxUserId;
  const showOwnerField = mutationAccess.ready && !!visibleOwner && !mutationAccess.isCurrentOwner;
  const ownerCanMutate = mutationAccess.canMutate && hasServerMutationDecision && serverCanMutateVisit;
  const canEditVisit = canEditHistory && ownerCanMutate;
  const canDeleteVisit = canDeleteHistory && ownerCanMutate;
  const isVisitEditable = isEditing && canEditVisit;
  const logBlockedPermission = useCallback(
    (operation: "edit" | "update" | "delete") => {
      logPermissionTrace("visitDetail:permission-blocked", {
        operation,
        reason: mutationAccess.reason,
        permissionsReady: mutationAccess.ready,
        isCurrentOwner: mutationAccess.isCurrentOwner,
        ownerCanMutate,
        clientCanMutate: mutationAccess.canMutate,
        hasServerMutationDecision,
        serverCanMutateVisit: hasServerMutationDecision ? serverCanMutateVisit : null,
        serverMutationPermissionStatus,
        canEditModule: canEditHistory,
        canDeleteModule: canDeleteHistory,
        canEditVisit,
        canDeleteVisit,
        visibleOwnerFound: !!visibleOwner,
        visibleOwnerPolicy: visibleOwner?.mutationPolicy || "",
        visibleOwnerPolicyInt: visibleOwner?.mutationPolicyInt ?? null,
        visibleOwnerPolicyLabel: visibleOwner?.mutationPolicyLabel || "",
        visibleOwnerCanMutate: visibleOwner?.canMutate ?? null,
      });
    },
    [
      canDeleteHistory,
      canDeleteVisit,
      canEditHistory,
      canEditVisit,
      logPermissionTrace,
      mutationAccess.canMutate,
      mutationAccess.isCurrentOwner,
      mutationAccess.reason,
      mutationAccess.ready,
      hasServerMutationDecision,
      ownerCanMutate,
      serverCanMutateVisit,
      serverMutationPermissionStatus,
      visibleOwner,
    ]
  );

  useEffect(() => {
    const traceKey = [
      recId,
      axUserId,
      detailOwnerAxUserId,
      mutationAccess.reason,
      mutationAccess.ready ? "ready" : "pending",
      mutationAccess.canMutate ? "can" : "cannot",
      hasServerMutationDecision ? (serverCanMutateVisit ? "server-can" : "server-cannot") : "server-missing",
      serverMutationPermissionStatus,
      mutationAccess.isCurrentOwner ? "own" : "foreign",
      visibleOwner?.mutationPolicy || "",
      visibleOwner?.mutationPolicyInt ?? "",
      visibleOwner?.mutationPolicyLabel || "",
      visibleOwner?.canMutate ?? "",
      canEditVisit ? "edit" : "read",
      canDeleteVisit ? "delete" : "nodelete",
    ].join("|");

    if (permissionTraceRef.current === traceKey) return;
    permissionTraceRef.current = traceKey;

    logPermissionTrace("visitDetail:mutation-decision", {
      reason: mutationAccess.reason,
      permissionsReady: mutationAccess.ready,
      isCurrentOwner: mutationAccess.isCurrentOwner,
      ownerCanMutate,
      clientCanMutate: mutationAccess.canMutate,
      hasServerMutationDecision,
      serverCanMutateVisit: hasServerMutationDecision ? serverCanMutateVisit : null,
      serverMutationPermissionStatus,
      canEditModule: canEditHistory,
      canDeleteModule: canDeleteHistory,
      canEditVisit,
      canDeleteVisit,
      visibleUsersReady,
      visibleOwnerFound: !!visibleOwner,
      visibleOwnerAxUserId: visibleOwner?.axUserId || "",
      visibleOwnerSource: visibleOwner?.source || "",
      visibleOwnerPolicy: visibleOwner?.mutationPolicy || "",
      visibleOwnerPolicyInt: visibleOwner?.mutationPolicyInt ?? null,
      visibleOwnerPolicyLabel: visibleOwner?.mutationPolicyLabel || "",
      visibleOwnerCanMutate: visibleOwner?.canMutate ?? null,
    });
  }, [
    axUserId,
    canDeleteHistory,
    canDeleteVisit,
    canEditHistory,
    canEditVisit,
    detailOwnerAxUserId,
    hasServerMutationDecision,
    logPermissionTrace,
    mutationAccess.canMutate,
    mutationAccess.isCurrentOwner,
    mutationAccess.reason,
    mutationAccess.ready,
    ownerCanMutate,
    recId,
    serverCanMutateVisit,
    serverMutationPermissionStatus,
    visibleOwner,
    visibleUsersReady,
  ]);

  const { editModeKeyRef, syncEditModeFlag, clearDraft, applyDraftValues } = useDetailEditSession({
    actividadId,
    recId,
    canEditHistory: canEditVisit,
    isEditing: isVisitEditable,
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
  });

  const hasServerDetail =
    hasValue(recId) &&
    hasValue(accountNum) &&
    hasValue(detail.transDate || detail.TransDate || "");

  const shouldHydrate = !!actividadId && !hasServerDetail;

  const openTextEditor = useCallback(
    (
      fieldId: string,
      fieldLabel: string,
      fieldValue: string,
      options: { allowEdit?: boolean; readOnly?: boolean; editModeKey?: string } = {}
    ) => {
      navigateToTextEditorField({
        fieldId,
        fieldLabel,
        fieldValue,
        readOnly: options?.readOnly === true,
        allowEdit: options?.allowEdit !== false,
        editModeKey: options?.editModeKey,
        editModeReturnTtlMs: EDITOR_RETURN_FLAG_TTL_MS,
      });
    },
    []
  );

  const handleComentariosTap = useCallback((event) => {
    event.preventDefault();
    openTextEditor(fieldIdComentarios, indT("Visits_Field_Comments", "Comments"), comentarios, {
      readOnly: !isVisitEditable,
      allowEdit: canEditVisit,
      editModeKey: editModeKeyRef.current
    });
  }, [comentarios, editModeKeyRef, fieldIdComentarios, isVisitEditable, canEditVisit, openTextEditor]);

  const handleComentariosHold = useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(comentarios || ""), clientY);
  }, [comentarios]);

  const handleAntecedentesTap = useCallback((event) => {
    event.preventDefault();
    openTextEditor(fieldIdAntecedentes, indT("Visits_Field_Background", "Background"), antecedentes, {
      readOnly: !isVisitEditable,
      allowEdit: canEditVisit,
      editModeKey: editModeKeyRef.current
    });
  }, [antecedentes, editModeKeyRef, fieldIdAntecedentes, isVisitEditable, canEditVisit, openTextEditor]);

  const handleAntecedentesHold = useCallback((target, clientY) => {
    if (!target || !isOverflowing(target)) return false;
    setPreviewAnchor(target);
    return showPreviewTooltip(String(antecedentes || ""), clientY);
  }, [antecedentes]);

  const handleConclusionesTap = useCallback((event) => {
    event.preventDefault();
    openTextEditor(fieldIdConclusiones, indT("Visits_Field_Conclusions", "Conclusions"), conclusiones, {
      readOnly: !isVisitEditable,
      allowEdit: canEditVisit,
      editModeKey: editModeKeyRef.current
    });
  }, [conclusiones, editModeKeyRef, fieldIdConclusiones, isVisitEditable, canEditVisit, openTextEditor]);

  const handleConclusionesHold = useCallback((target, clientY) => {
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

  const { applyValues: applyTextEditorValues } = useTextEditorFields(textEditorBindings, {
    applyOnMount: !actividadId,
    listenPageShow: true,
    enabled: canEditVisit,
  });

  useEffect(() => {
    if (!mutationAccess.ready || canEditVisit) return;

    clearTextEditorValue(fieldIdComentarios);
    clearTextEditorValue(fieldIdAntecedentes);
    clearTextEditorValue(fieldIdConclusiones);
  }, [canEditVisit, fieldIdAntecedentes, fieldIdComentarios, fieldIdConclusiones, mutationAccess.ready]);

  const { modal, openConfirm, closeConfirm, handleConfirm } = useConfirmDialog({
    defaultConfirmText: indT("Confirm_Yes", "Confirm_Yes"),
    defaultCancelText: indT("Confirm_No", "Confirm_No")
  });

  const handleModalConfirm = useCallback(async () => {
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

  const handleModalButtonConfirm = useCallback(() => {
    if (!busy && modalError) {
      closeConfirm();
      return;
    }
    handleModalConfirm();
  }, [busy, modalError, closeConfirm, handleModalConfirm]);

  const hasActiveProcess = useMemo(() => busy || isVisitEditable, [busy, isVisitEditable]);

  useEffect(() => {
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
    setConclusiones,
  });

  useEffect(() => {
    const el = readOnlySurfaceRef.current;
    if (!el) return;
    if (!isVisitEditable) {
      el.classList.add("ind-readonly-surface");
    } else {
      el.classList.remove("ind-readonly-surface");
    }
  }, [isVisitEditable]);

  useEffect(() => {
    if (isVisitEditable) {
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
  }, [isVisitEditable, transDate, visitType, contactMethod, asistenteTipo, description, comentarios, antecedentes, conclusiones]);

  useEffect(() => {
    if (isVisitEditable) return undefined;
    return bindReadOnlyGuard(readOnlySurfaceRef.current);
  }, [isVisitEditable]);

  const handleEnableEdit = useCallback(() => {
    if (!canEditVisit) {
      logBlockedPermission("edit");
      return;
    }
    setIsEditing(true);
    syncEditModeFlag(true);
    setStatus(indT("Visits_Detail_EditingEnabled", "Editing enabled"));
  }, [canEditVisit, logBlockedPermission, syncEditModeFlag]);

  const handleCancelEdit = useCallback(() => {
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
    isEditing: isVisitEditable,
    canEditHistory: canEditVisit,
    canDeleteHistory: canDeleteVisit,
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
    onPermissionBlocked: logBlockedPermission,
    setModalError,
    setBusy,
    setStatus,
    setIsEditing,
  });

  useDetailTopbarActions({
    busy,
    modalOpen: modal.open,
    isEditing: isVisitEditable,
    canEditHistory: canEditVisit,
    canDeleteHistory: canDeleteVisit,
    transDate,
    setModalError,
    handleEnableEdit,
    handleCancelEdit,
    handleUpdate,
    handleDelete,
    onPermissionBlocked: logBlockedPermission,
    openConfirm,
    closeConfirm,
    permissionsReady: mutationAccess.ready,
  });

  const descriptionLabel = indT("Visits_Field_Description", "Description");
  const commentsLabel = indT("Visits_Field_Comments", "Comments");
  const backgroundLabel = indT("Visits_Field_Background", "Background");
  const conclusionsLabel = indT("Visits_Field_Conclusions", "Conclusions");
  const detailDescriptionClassName = classNames(
    "form-control",
    isVisitEditable ? "border-neutral-200 text-neutral-900" : "border-neutral-200 ind-readonly-field"
  );
  const detailReadOnlyClassName = classNames("form-control cursor-pointer", !isVisitEditable ? "ind-readonly-field" : "");

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
      <div
        ref={readOnlySurfaceRef}
        className="relative shadow-xs glass-panel p-4 space-y-4 border border-neutral-200 rounded-[var(--radius-xl)]"
      >
        {isHydrating && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70 rounded-[var(--radius-xl)]">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Spinner size="size-5" />
              <span>{indT("Common_Loading", "Loading")}</span>
            </div>
          </div>
        )}
        {showOwnerField && (
          <DetailOwnerField label={indT("Visits_Detail_Owner_Label", "Owner")} value={detailOwnerText} />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <div className="visita-field-text">
            <SingleDatePicker
              label={indT("Visits_Detail_Date_Label", "Date")}
              value={transDate}
              onChange={setTransDate}
              disabled={!isVisitEditable}
              readOnly={!isVisitEditable}
            />
          </div>
          <SelectCombobox
            label={indT("Visits_Detail_VisitType_Label", "Visit type")}
            options={visitTypes}
            value={visitType}
            onChange={setVisitType}
            placeholder={indT("Visits_Detail_VisitType_Placeholder", "Select type")}
            disabled={!isVisitEditable}
            readOnly={!isVisitEditable}
            usePortal={false}
          />
          <SelectCombobox
            label={indT("Visits_Detail_ContactMethod_Label", "Contact channel")}
            options={contactMethods}
            value={contactMethod}
            onChange={setContactMethod}
            placeholder={indT("Visits_Detail_ContactMethod_Placeholder", "Select method")}
            disabled={!isVisitEditable}
            readOnly={!isVisitEditable}
            usePortal={false}
          />
        </div>

        <VisitNarrativeFields
          descriptionLabel={descriptionLabel}
          descriptionValue={description}
          descriptionClassName={detailDescriptionClassName}
          descriptionDisabled={!isVisitEditable}
          onDescriptionChange={setDescription}
          tapFields={[
            {
              id: "comentarios",
              label: commentsLabel,
              value: comentarios,
              className: detailReadOnlyClassName,
              pointerBindings: comentariosTap,
            },
            {
              id: "antecedentes",
              label: backgroundLabel,
              value: antecedentes,
              className: detailReadOnlyClassName,
              pointerBindings: antecedentesTap,
            },
            {
              id: "conclusiones",
              label: conclusionsLabel,
              value: conclusiones,
              className: detailReadOnlyClassName,
              pointerBindings: conclusionesTap,
            },
          ]}
        />

        <div className="flex items-center gap-3 text-sm text-neutral-600">
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
};

// Detail UI wrapped by the error boundary.
export default function DetailForm(props: DetailFormProps) {
  return (
    <AppErrorBoundary fallbackMessage={indT("Visits_Detail_ErrorBoundary", "An error occurred while rendering the detail page. Reload and try again.")}>
      <DetailApp {...props} />
    </AppErrorBoundary>
  );
}
