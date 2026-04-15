import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { indT } from "../../../../utils/indI18n.ts";
import { parseExpenseDate, safeText, toIsoDate } from "../../utils/expenseUiUtils.ts";
import type { ExpenseTicketDetailHeader } from "./expenseTicketDetailTypes.ts";

type DraftState = {
  description: string;
  gastoType: string;
  currencyCode: string;
  transDate: string;
  comentario: string;
  urlFile: string;
  fileName: string;
};

type EditorState = {
  busy: boolean;
  status: string;
  isEditing: boolean;
  modalError: string;
  linePage: number;
  draft: DraftState;
};

type UseExpenseTicketDetailEditorArgs = {
  header: ExpenseTicketDetailHeader | null;
  lineCount: number;
  pageSize: number;
  canEditTicket: boolean;
  isLoading: boolean;
  allowAssignedDraftEdit: boolean;
  isFromSheetLink: boolean;
  onForbidden: () => void;
};

type EditorAction =
  | { type: "hydrate_from_header"; header: ExpenseTicketDetailHeader | null }
  | {
      type: "patch_state";
      patch: Partial<Pick<EditorState, "busy" | "status" | "isEditing" | "modalError" | "linePage">>;
    }
  | { type: "set_draft_field"; field: keyof DraftState; value: string };

const createEmptyDraft = (): DraftState => ({
  description: "",
  gastoType: "",
  currencyCode: "",
  transDate: "",
  comentario: "",
  urlFile: "",
  fileName: "",
});

const toInputDate = (raw?: string): string => {
  const parsed = parseExpenseDate(raw);
  return parsed ? toIsoDate(parsed) : "";
};

const createDraftFromHeader = (header: ExpenseTicketDetailHeader | null): DraftState => {
  return {
    description: safeText(header?.description),
    gastoType: header?.gastoType === null || header?.gastoType === undefined ? "" : String(header.gastoType),
    currencyCode: safeText(header?.currencyCode).toUpperCase(),
    transDate: toInputDate(header?.transDate),
    comentario: safeText(header?.comentario),
    urlFile: safeText(header?.urlFile),
    fileName: safeText(header?.fileName),
  };
};

const createInitialState = (): EditorState => ({
  busy: false,
  status: "",
  isEditing: false,
  modalError: "",
  linePage: 1,
  draft: createEmptyDraft(),
});

const isValidRequiredGastoType = (rawValue: string): boolean => {
  const parsedValue = Number.parseInt(String(rawValue || "").trim(), 10);
  return Number.isInteger(parsedValue) && parsedValue > 0;
};

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case "hydrate_from_header":
      return {
        ...state,
        draft: createDraftFromHeader(action.header),
      };
    case "patch_state":
      return {
        ...state,
        ...action.patch,
      };
    case "set_draft_field":
      return {
        ...state,
        draft: {
          ...state.draft,
          [action.field]: action.value,
        },
      };
    default:
      return state;
  }
};

const resolveSetStateValue = <T,>(value: SetStateAction<T>, current: T): T => {
  return typeof value === "function" ? (value as (prevState: T) => T)(current) : value;
};

// Owns page-local edit, draft, and line paging state for ticket detail.
export const useExpenseTicketDetailEditor = ({
  header,
  lineCount,
  pageSize,
  canEditTicket,
  isLoading,
  allowAssignedDraftEdit,
  isFromSheetLink,
  onForbidden,
}: UseExpenseTicketDetailEditorArgs) => {
  const [state, dispatch] = useReducer(editorReducer, undefined, createInitialState);
  const [descriptionInvalid, setDescriptionInvalid] = useState(false);
  const [gastoTypeInvalid, setGastoTypeInvalid] = useState(false);
  const [currencyCodeInvalid, setCurrencyCodeInvalid] = useState(false);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  const gastoTypeInputRef = useRef<HTMLInputElement | null>(null);
  const currencyInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (state.isEditing) return;
    dispatch({ type: "hydrate_from_header", header });
  }, [header, state.isEditing]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(lineCount / pageSize));
    if (state.linePage > maxPage) {
      dispatch({ type: "patch_state", patch: { linePage: maxPage } });
    }
  }, [lineCount, pageSize, state.linePage]);

  useEffect(() => {
    if (state.isEditing) return;
    setDescriptionInvalid(false);
    setGastoTypeInvalid(false);
    setCurrencyCodeInvalid(false);
  }, [state.isEditing]);

  const setBusy = useCallback<Dispatch<SetStateAction<boolean>>>(
    (value) => {
      dispatch({ type: "patch_state", patch: { busy: resolveSetStateValue(value, state.busy) } });
    },
    [state.busy]
  );

  const setStatus = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      dispatch({ type: "patch_state", patch: { status: resolveSetStateValue(value, state.status) } });
    },
    [state.status]
  );

  const setIsEditing = useCallback<Dispatch<SetStateAction<boolean>>>(
    (value) => {
      dispatch({ type: "patch_state", patch: { isEditing: resolveSetStateValue(value, state.isEditing) } });
    },
    [state.isEditing]
  );

  const setModalError = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      dispatch({ type: "patch_state", patch: { modalError: resolveSetStateValue(value, state.modalError) } });
    },
    [state.modalError]
  );

  const setLinePage = useCallback<Dispatch<SetStateAction<number>>>(
    (value) => {
      dispatch({ type: "patch_state", patch: { linePage: resolveSetStateValue(value, state.linePage) } });
    },
    [state.linePage]
  );

  const setDraftDescription = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      setDescriptionInvalid(false);
      dispatch({
        type: "set_draft_field",
        field: "description",
        value: resolveSetStateValue(value, state.draft.description),
      });
    },
    [state.draft.description]
  );

  const setDraftGastoType = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      setGastoTypeInvalid(false);
      dispatch({
        type: "set_draft_field",
        field: "gastoType",
        value: resolveSetStateValue(value, state.draft.gastoType),
      });
    },
    [state.draft.gastoType]
  );

  const setDraftCurrencyCode = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      setCurrencyCodeInvalid(false);
      dispatch({
        type: "set_draft_field",
        field: "currencyCode",
        value: resolveSetStateValue(value, state.draft.currencyCode),
      });
    },
    [state.draft.currencyCode]
  );

  const setDraftTransDate = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      dispatch({
        type: "set_draft_field",
        field: "transDate",
        value: resolveSetStateValue(value, state.draft.transDate),
      });
    },
    [state.draft.transDate]
  );

  const handleEnableEdit = useCallback(() => {
    if (!header || isLoading) return;
    if (isFromSheetLink) return;
    if (header.status === 1 && !allowAssignedDraftEdit) return;
    if (!canEditTicket) {
      onForbidden();
      return;
    }

    setGastoTypeInvalid(false);
    setCurrencyCodeInvalid(false);
    dispatch({ type: "hydrate_from_header", header });
    dispatch({
      type: "patch_state",
      patch: {
        modalError: "",
        isEditing: true,
        status: indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"),
      },
    });
  }, [allowAssignedDraftEdit, canEditTicket, header, isFromSheetLink, isLoading, onForbidden]);

  const handleCancelEdit = useCallback(() => {
    if (!state.isEditing) return;
    if (!header) {
      dispatch({ type: "patch_state", patch: { isEditing: false } });
      return;
    }

    setGastoTypeInvalid(false);
    setCurrencyCodeInvalid(false);
    dispatch({ type: "hydrate_from_header", header });
    dispatch({
      type: "patch_state",
      patch: {
        isEditing: false,
        modalError: "",
        status: indT("Common_Cancel", "Cancel"),
      },
    });
  }, [header, state.isEditing]);

  const canOpenSaveConfirm = useCallback(() => {
    const normalizedDescription = String(state.draft.description || "").trim();
    const normalizedCurrencyCode = String(state.draft.currencyCode || "").trim().toUpperCase();
    const descriptionIsValid = !!normalizedDescription;
    const gastoTypeIsValid = isValidRequiredGastoType(state.draft.gastoType);
    const currencyIsValid = !!normalizedCurrencyCode;

    setDescriptionInvalid(!descriptionIsValid);
    setGastoTypeInvalid(!gastoTypeIsValid);
    setCurrencyCodeInvalid(!currencyIsValid);

    if (descriptionIsValid && gastoTypeIsValid && currencyIsValid) {
      return true;
    }

    const message = !descriptionIsValid
      ? indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.")
      : !gastoTypeIsValid
        ? indT("Tickets_Validation_CategoryRequired", "Category is required.")
        : indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.");

    dispatch({
      type: "patch_state",
      patch: {
        modalError: message,
        status: message,
      },
    });

    window.requestAnimationFrame(() => {
      if (!descriptionIsValid) {
        descriptionInputRef.current?.focus();
        return;
      }

      if (!gastoTypeIsValid) {
        gastoTypeInputRef.current?.focus();
        return;
      }

      currencyInputRef.current?.focus();
    });

    return false;
  }, [state.draft.currencyCode, state.draft.gastoType]);

  return {
    busy: state.busy,
    status: state.status,
    isEditing: state.isEditing,
    modalError: state.modalError,
    linePage: state.linePage,
    draftDescription: state.draft.description,
    descriptionInvalid,
    descriptionInputRef,
    draftGastoType: state.draft.gastoType,
    gastoTypeInvalid,
    gastoTypeInputRef,
    draftCurrencyCode: state.draft.currencyCode,
    currencyCodeInvalid,
    currencyInputRef,
    draftTransDate: state.draft.transDate,
    draftComentario: state.draft.comentario,
    draftUrlFile: state.draft.urlFile,
    draftFileName: state.draft.fileName,
    setBusy,
    setStatus,
    setIsEditing,
    setModalError,
    setLinePage,
    setDraftDescription,
    setDraftGastoType,
    setDraftCurrencyCode,
    setDraftTransDate,
    canOpenSaveConfirm,
    handleEnableEdit,
    handleCancelEdit,
  };
};
