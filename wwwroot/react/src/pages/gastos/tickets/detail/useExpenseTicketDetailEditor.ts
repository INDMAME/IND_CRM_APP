import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { indT } from "../../../../utils/indI18n.ts";
import type { ExpenseSheetLine } from "../../expenseTypes.ts";
import {
  calculateExpenseLineAmountMST,
  calculateExpenseLineExchangeRate,
} from "../../utils/expenseLineCurrency.ts";
import { toExpenseGastoTypeCode } from "../../constants/expenseGastoTypeCatalog.ts";
import { parseExpenseDate, safeText, toIsoDate } from "../../utils/expenseUiUtils.ts";
import { formatExpenseInputNumber, parseExpenseNumericInput } from "../../utils/expenseNumberFormat.ts";
import type { ExpenseTicketDetailHeader } from "./expenseTicketDetailTypes.ts";

type DraftState = {
  description: string;
  gastoType: string;
  currencyCode: string;
  totalAmount: string;
  amountMST: string;
  exchangeRate: string;
  transDate: string;
  ticketTime: string;
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
  linkedExpenseLine?: ExpenseSheetLine | null;
  localCurrencyCode?: string;
  lineCount: number;
  pageSize: number;
  canEditTicket: boolean;
  isLoading: boolean;
  allowAssignedDraftEdit: boolean;
  isFromSheetLink: boolean;
  onForbidden: () => void;
};

type EditorAction =
  | {
      type: "hydrate_from_header";
      header: ExpenseTicketDetailHeader | null;
      linkedExpenseLine?: ExpenseSheetLine | null;
      localCurrencyCode?: string;
    }
  | {
      type: "patch_state";
      patch: Partial<Pick<EditorState, "busy" | "status" | "isEditing" | "modalError" | "linePage">>;
    }
  | { type: "patch_draft"; patch: Partial<DraftState> }
  | { type: "set_draft_field"; field: keyof DraftState; value: string };

const createEmptyDraft = (): DraftState => ({
  description: "",
  gastoType: "",
  currencyCode: "",
  totalAmount: "",
  amountMST: "",
  exchangeRate: "",
  transDate: "",
  ticketTime: "",
  comentario: "",
  urlFile: "",
  fileName: "",
});

const toInputDate = (raw?: string): string => {
  const parsed = parseExpenseDate(raw);
  return parsed ? toIsoDate(parsed) : "";
};

const toInputTime = (raw?: string): string => {
  const value = safeText(raw);
  if (!value || value === "0") return "";

  const secondsValue = Number(value);
  if (Number.isInteger(secondsValue) && secondsValue >= 0 && secondsValue <= 86399) {
    const hours = Math.floor(secondsValue / 3600);
    const minutes = Math.floor((secondsValue % 3600) / 60);
    const seconds = secondsValue % 60;
    return [hours, minutes, seconds].map((entry) => String(entry).padStart(2, "0")).join(":");
  }

  const match = value.match(/^(\d{1,2}):([0-5]\d)(?::([0-5]\d))?$/);
  if (!match) return "";

  const hours = Number.parseInt(match[1] || "", 10);
  if (!Number.isInteger(hours) || hours < 0 || hours > 23) return "";

  return `${String(hours).padStart(2, "0")}:${match[2]}:${match[3] || "00"}`;
};

const normalizeCurrencyCode = (value: unknown): string => safeText(value).toUpperCase();

const toFiniteNumber = (value: unknown): number | null => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const formatEditableMoney = (value: number | string | null | undefined): string => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "",
  });
};

const formatEditableExchangeRate = (value: number | string | null | undefined): string => {
  return formatExpenseInputNumber(value, {
    minimumFractionDigits: 7,
    maximumFractionDigits: 7,
    useGrouping: true,
    fallback: "",
  });
};

const isForeignCurrency = (currencyCode: string, localCurrencyCode: string): boolean => {
  const normalizedCurrencyCode = normalizeCurrencyCode(currencyCode);
  const normalizedLocalCurrencyCode = normalizeCurrencyCode(localCurrencyCode);
  return !!normalizedCurrencyCode && !!normalizedLocalCurrencyCode && normalizedCurrencyCode !== normalizedLocalCurrencyCode;
};

const buildAmountMSTPatchFromExchangeRate = (totalAmount: string, exchangeRate: string): Partial<DraftState> => {
  const parsedTotalAmount = parseExpenseNumericInput(totalAmount);
  const parsedExchangeRate = parseExpenseNumericInput(exchangeRate);
  const nextAmountMST =
    parsedTotalAmount != null && parsedExchangeRate != null
      ? calculateExpenseLineAmountMST(parsedTotalAmount, parsedExchangeRate)
      : null;

  return nextAmountMST != null ? { amountMST: formatEditableMoney(nextAmountMST) } : {};
};

const buildExchangeRatePatchFromAmountMST = (totalAmount: string, amountMST: string): Partial<DraftState> => {
  const parsedTotalAmount = parseExpenseNumericInput(totalAmount);
  const parsedAmountMST = parseExpenseNumericInput(amountMST);
  const nextExchangeRate =
    parsedTotalAmount != null && parsedAmountMST != null
      ? calculateExpenseLineExchangeRate(parsedTotalAmount, parsedAmountMST)
      : null;

  return nextExchangeRate != null ? { exchangeRate: formatEditableExchangeRate(nextExchangeRate) } : {};
};

const buildLocalCurrencySettlementPatch = (
  currencyCode: string,
  localCurrencyCode: string,
  totalAmount: string
): Partial<DraftState> => {
  if (isForeignCurrency(currencyCode, localCurrencyCode)) {
    return {};
  }

  const parsedTotalAmount = parseExpenseNumericInput(totalAmount);
  return {
    exchangeRate: formatEditableExchangeRate(100),
    ...(parsedTotalAmount != null ? { amountMST: formatEditableMoney(parsedTotalAmount) } : {}),
  };
};

const createDraftFromHeader = (
  header: ExpenseTicketDetailHeader | null,
  linkedExpenseLine: ExpenseSheetLine | null | undefined,
  localCurrencyCode: string | undefined
): DraftState => {
  const normalizedLocalCurrencyCode =
    normalizeCurrencyCode(localCurrencyCode) || normalizeCurrencyCode(linkedExpenseLine?.currencyCode);
  const normalizedCurrencyCode =
    normalizeCurrencyCode(header?.currencyCode) || normalizeCurrencyCode(linkedExpenseLine?.currencyCode) || normalizedLocalCurrencyCode;
  const totalAmount = toFiniteNumber(header?.totalAmount) ?? toFiniteNumber(linkedExpenseLine?.amount) ?? toFiniteNumber(linkedExpenseLine?.price);
  const ticketExchangeRate = toFiniteNumber(header?.exchRate ?? linkedExpenseLine?.exchRate);
  const ticketAmountMST = toFiniteNumber(header?.amountMST ?? linkedExpenseLine?.amountMST);
  const sameCurrency =
    !!normalizedCurrencyCode &&
    !!normalizedLocalCurrencyCode &&
    normalizedCurrencyCode === normalizedLocalCurrencyCode;
  const exchangeRate = sameCurrency ? 100 : ticketExchangeRate != null && ticketExchangeRate > 0 ? ticketExchangeRate : null;
  const calculatedAmountMST =
    totalAmount != null && exchangeRate != null
      ? calculateExpenseLineAmountMST(totalAmount, exchangeRate)
      : null;
  const amountMST = ticketAmountMST ?? (sameCurrency ? totalAmount : calculatedAmountMST);

  return {
    description: safeText(header?.description),
    gastoType: header?.gastoType === null || header?.gastoType === undefined ? "" : String(header.gastoType),
    currencyCode: normalizedCurrencyCode,
    totalAmount: formatEditableMoney(totalAmount),
    amountMST: formatEditableMoney(amountMST),
    exchangeRate: formatEditableExchangeRate(exchangeRate),
    transDate: toInputDate(header?.ticketDate || header?.transDate),
    ticketTime: toInputTime(header?.ticketTime),
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
  return toExpenseGastoTypeCode(rawValue, { allowNone: false }) !== null;
};

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case "hydrate_from_header":
      return {
        ...state,
        draft: createDraftFromHeader(action.header, action.linkedExpenseLine, action.localCurrencyCode),
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
    case "patch_draft":
      return {
        ...state,
        draft: {
          ...state.draft,
          ...action.patch,
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
  linkedExpenseLine,
  localCurrencyCode,
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
  const [totalAmountInvalid, setTotalAmountInvalid] = useState(false);
  const [amountMSTInvalid, setAmountMSTInvalid] = useState(false);
  const [exchangeRateInvalid, setExchangeRateInvalid] = useState(false);
  const descriptionInputRef = useRef<HTMLInputElement | null>(null);
  const gastoTypeInputRef = useRef<HTMLInputElement | null>(null);
  const currencyInputRef = useRef<HTMLInputElement | null>(null);
  const totalAmountInputRef = useRef<HTMLInputElement | null>(null);
  const amountMSTInputRef = useRef<HTMLInputElement | null>(null);
  const exchangeRateInputRef = useRef<HTMLInputElement | null>(null);
  const effectiveLocalCurrencyCode =
    normalizeCurrencyCode(localCurrencyCode) || normalizeCurrencyCode(linkedExpenseLine?.currencyCode);

  useEffect(() => {
    if (state.isEditing) return;
    dispatch({ type: "hydrate_from_header", header, linkedExpenseLine, localCurrencyCode: effectiveLocalCurrencyCode });
  }, [effectiveLocalCurrencyCode, header, linkedExpenseLine, state.isEditing]);

  useEffect(() => {
    if (!state.isEditing) return;
    const localPatch = buildLocalCurrencySettlementPatch(
      state.draft.currencyCode,
      effectiveLocalCurrencyCode,
      state.draft.totalAmount
    );
    if (Object.keys(localPatch).length > 0) {
      dispatch({ type: "patch_draft", patch: localPatch });
    }
  }, [effectiveLocalCurrencyCode, state.draft.currencyCode, state.draft.totalAmount, state.isEditing]);

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
    setTotalAmountInvalid(false);
    setAmountMSTInvalid(false);
    setExchangeRateInvalid(false);
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
      setAmountMSTInvalid(false);
      setExchangeRateInvalid(false);
      const nextCurrencyCode = normalizeCurrencyCode(resolveSetStateValue(value, state.draft.currencyCode));
      const nextPatch: Partial<DraftState> = {
        currencyCode: nextCurrencyCode,
        ...buildLocalCurrencySettlementPatch(nextCurrencyCode, effectiveLocalCurrencyCode, state.draft.totalAmount),
      };
      if (!nextPatch.amountMST) {
        Object.assign(nextPatch, buildAmountMSTPatchFromExchangeRate(state.draft.totalAmount, state.draft.exchangeRate));
      }
      dispatch({
        type: "patch_draft",
        patch: nextPatch,
      });
    },
    [effectiveLocalCurrencyCode, state.draft.currencyCode, state.draft.exchangeRate, state.draft.totalAmount]
  );

  const setDraftTotalAmount = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      setTotalAmountInvalid(false);
      setAmountMSTInvalid(false);
      setExchangeRateInvalid(false);
      const nextTotalAmount = resolveSetStateValue(value, state.draft.totalAmount);
      const localPatch = buildLocalCurrencySettlementPatch(
        state.draft.currencyCode,
        effectiveLocalCurrencyCode,
        nextTotalAmount
      );
      const nextPatch: Partial<DraftState> = {
        totalAmount: nextTotalAmount,
        ...(Object.keys(localPatch).length > 0
          ? localPatch
          : buildAmountMSTPatchFromExchangeRate(nextTotalAmount, state.draft.exchangeRate)),
      };
      dispatch({
        type: "patch_draft",
        patch: nextPatch,
      });
    },
    [effectiveLocalCurrencyCode, state.draft.currencyCode, state.draft.exchangeRate, state.draft.totalAmount]
  );

  const setDraftAmountMST = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      setAmountMSTInvalid(false);
      setExchangeRateInvalid(false);
      const nextAmountMST = resolveSetStateValue(value, state.draft.amountMST);
      const localPatch = buildLocalCurrencySettlementPatch(
        state.draft.currencyCode,
        effectiveLocalCurrencyCode,
        state.draft.totalAmount
      );
      dispatch({
        type: "patch_draft",
        patch: {
          amountMST: nextAmountMST,
          ...(Object.keys(localPatch).length > 0
            ? { exchangeRate: formatEditableExchangeRate(100) }
            : buildExchangeRatePatchFromAmountMST(state.draft.totalAmount, nextAmountMST)),
        },
      });
    },
    [effectiveLocalCurrencyCode, state.draft.amountMST, state.draft.currencyCode, state.draft.totalAmount]
  );

  const setDraftExchangeRate = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      setExchangeRateInvalid(false);
      setAmountMSTInvalid(false);
      const nextExchangeRate = resolveSetStateValue(value, state.draft.exchangeRate);
      const localPatch = buildLocalCurrencySettlementPatch(
        state.draft.currencyCode,
        effectiveLocalCurrencyCode,
        state.draft.totalAmount
      );
      dispatch({
        type: "patch_draft",
        patch:
          Object.keys(localPatch).length > 0
            ? localPatch
            : {
                exchangeRate: nextExchangeRate,
                ...buildAmountMSTPatchFromExchangeRate(state.draft.totalAmount, nextExchangeRate),
              },
      });
    },
    [effectiveLocalCurrencyCode, state.draft.currencyCode, state.draft.exchangeRate, state.draft.totalAmount]
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
    setTotalAmountInvalid(false);
    setAmountMSTInvalid(false);
    setExchangeRateInvalid(false);
    dispatch({ type: "hydrate_from_header", header, linkedExpenseLine, localCurrencyCode: effectiveLocalCurrencyCode });
    dispatch({
      type: "patch_state",
      patch: {
        modalError: "",
        isEditing: true,
        status: indT("ExpenseSheets_Detail_EditingEnabled", "Editing enabled"),
      },
    });
  }, [
    allowAssignedDraftEdit,
    canEditTicket,
    effectiveLocalCurrencyCode,
    header,
    isFromSheetLink,
    isLoading,
    linkedExpenseLine,
    onForbidden,
  ]);

  const handleCancelEdit = useCallback(() => {
    if (!state.isEditing) return;
    if (!header) {
      dispatch({ type: "patch_state", patch: { isEditing: false } });
      return;
    }

    setGastoTypeInvalid(false);
    setCurrencyCodeInvalid(false);
    setTotalAmountInvalid(false);
    setAmountMSTInvalid(false);
    setExchangeRateInvalid(false);
    dispatch({ type: "hydrate_from_header", header, linkedExpenseLine, localCurrencyCode: effectiveLocalCurrencyCode });
    dispatch({
      type: "patch_state",
      patch: {
        isEditing: false,
        modalError: "",
        status: indT("Common_Cancel", "Cancel"),
      },
    });
  }, [effectiveLocalCurrencyCode, header, linkedExpenseLine, state.isEditing]);

  const canOpenSaveConfirm = useCallback(() => {
    const normalizedDescription = String(state.draft.description || "").trim();
    const normalizedCurrencyCode = String(state.draft.currencyCode || "").trim().toUpperCase();
    const parsedTotalAmount = parseExpenseNumericInput(state.draft.totalAmount);
    const parsedAmountMST = parseExpenseNumericInput(state.draft.amountMST);
    const parsedExchangeRate = parseExpenseNumericInput(state.draft.exchangeRate);
    const descriptionIsValid = !!normalizedDescription;
    const gastoTypeIsValid = isValidRequiredGastoType(state.draft.gastoType);
    const currencyIsValid = !!normalizedCurrencyCode;
    const totalAmountIsValid = parsedTotalAmount != null && parsedTotalAmount >= 0;
    const requiresForeignCurrencySettlement = isForeignCurrency(normalizedCurrencyCode, effectiveLocalCurrencyCode);
    const hasForeignCurrencySettlement =
      !requiresForeignCurrencySettlement ||
      (parsedExchangeRate != null && parsedExchangeRate > 0) ||
      (parsedAmountMST != null && parsedAmountMST > 0);

    setDescriptionInvalid(!descriptionIsValid);
    setGastoTypeInvalid(!gastoTypeIsValid);
    setCurrencyCodeInvalid(!currencyIsValid);
    setTotalAmountInvalid(!totalAmountIsValid);
    setExchangeRateInvalid(!hasForeignCurrencySettlement);
    setAmountMSTInvalid(!hasForeignCurrencySettlement);

    if (descriptionIsValid && gastoTypeIsValid && currencyIsValid && totalAmountIsValid && hasForeignCurrencySettlement) {
      return true;
    }

    const message = !descriptionIsValid
      ? indT("ExpenseSheets_Validation_DescriptionRequired", "Description is required.")
      : !gastoTypeIsValid
        ? indT("Tickets_Validation_CategoryRequired", "Category is required.")
        : !currencyIsValid
          ? indT("ExpenseSheets_Validation_CurrencyRequired", "Currency is required.")
          : !totalAmountIsValid
            ? indT("Tickets_Validation_TotalAmountRequired", "Total amount must be greater than or equal to 0.")
            : indT(
                "ExpenseSheets_Line_Validation_ForeignCurrencySettlement",
                "Foreign currency lines require an exchange rate greater than 0 or a reimbursement amount."
              );

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

      if (!currencyIsValid) {
        currencyInputRef.current?.focus();
        return;
      }

      if (!totalAmountIsValid) {
        totalAmountInputRef.current?.focus();
        return;
      }

      if (!hasForeignCurrencySettlement) {
        exchangeRateInputRef.current?.focus();
      }
    });

    return false;
  }, [
    effectiveLocalCurrencyCode,
    state.draft.amountMST,
    state.draft.currencyCode,
    state.draft.description,
    state.draft.exchangeRate,
    state.draft.gastoType,
    state.draft.totalAmount,
  ]);

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
    draftTotalAmount: state.draft.totalAmount,
    totalAmountInvalid,
    totalAmountInputRef,
    draftAmountMST: state.draft.amountMST,
    amountMSTInvalid,
    amountMSTInputRef,
    draftExchangeRate: state.draft.exchangeRate,
    exchangeRateInvalid,
    exchangeRateInputRef,
    localCurrencyCode: effectiveLocalCurrencyCode,
    draftTransDate: state.draft.transDate,
    draftTicketTime: state.draft.ticketTime,
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
    setDraftTotalAmount,
    setDraftAmountMST,
    setDraftExchangeRate,
    canOpenSaveConfirm,
    handleEnableEdit,
    handleCancelEdit,
  };
};
