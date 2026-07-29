import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { indT } from "../../../../utils/indI18n.ts";
import type { ExpenseSheetLine } from "../../expenseTypes.ts";
import {
  calculateExpenseLineAmountMSTForCurrency,
  calculateExpenseLineExchangeRateForCurrency,
  isExpenseLineForeignCurrency,
  isExpenseLineSameReimbursementCurrency,
  resolveExpenseLineExchangeRateForCurrency,
} from "../../utils/expenseLineCurrency.ts";
import { toExpenseGastoTypeCode } from "../../constants/expenseGastoTypeCatalog.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";
import {
  normalizeExpenseTicketStoredTime,
  toExpenseTicketDateInput,
} from "../../utils/expenseTicketDateTime.ts";
import {
  areExpenseNumericInputsEquivalent,
  formatExpenseInputNumber,
  parseExpenseNumericInput,
} from "../../utils/expenseNumberFormat.ts";
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
  amountMSTManuallyEdited: boolean;
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
  isSheetLinkReadOnly: boolean;
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
      patch: Partial<Pick<EditorState, "busy" | "status" | "isEditing" | "modalError" | "linePage" | "amountMSTManuallyEdited">>;
    }
  | { type: "patch_draft"; patch: Partial<DraftState>; amountMSTManuallyEdited?: boolean }
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

const buildAmountMSTPatchFromExchangeRate = (
  totalAmount: string,
  exchangeRate: string,
  currencyCode: string,
  reimbursementCurrencyCode: string,
  amountMSTManuallyEdited: boolean
): Partial<DraftState> => {
  if (amountMSTManuallyEdited && isExpenseLineSameReimbursementCurrency(currencyCode, reimbursementCurrencyCode)) {
    return {};
  }

  const parsedTotalAmount = parseExpenseNumericInput(totalAmount);
  const parsedExchangeRate = resolveExpenseLineExchangeRateForCurrency(
    currencyCode,
    reimbursementCurrencyCode,
    parseExpenseNumericInput(exchangeRate)
  );
  const nextAmountMST =
    parsedTotalAmount != null
      ? calculateExpenseLineAmountMSTForCurrency(
          parsedTotalAmount,
          parsedExchangeRate,
          currencyCode,
          reimbursementCurrencyCode
        )
      : null;

  return nextAmountMST != null ? { amountMST: formatEditableMoney(nextAmountMST) } : {};
};

const buildExchangeRatePatchFromAmountMST = (
  totalAmount: string,
  amountMST: string,
  currencyCode: string,
  reimbursementCurrencyCode: string,
  currentExchangeRate: string
): Partial<DraftState> => {
  const parsedTotalAmount = parseExpenseNumericInput(totalAmount);
  const parsedAmountMST = parseExpenseNumericInput(amountMST);
  const nextExchangeRate =
    parsedTotalAmount != null && parsedAmountMST != null
      ? calculateExpenseLineExchangeRateForCurrency(
          parsedTotalAmount,
          parsedAmountMST,
          currencyCode,
          reimbursementCurrencyCode,
          currentExchangeRate
        )
      : isExpenseLineSameReimbursementCurrency(currencyCode, reimbursementCurrencyCode)
        ? resolveExpenseLineExchangeRateForCurrency(currencyCode, reimbursementCurrencyCode, currentExchangeRate)
      : null;

  return nextExchangeRate != null ? { exchangeRate: formatEditableExchangeRate(nextExchangeRate) } : {};
};

const resolveExchangeRateForSettlement = (
  currencyCode: string,
  localCurrencyCode: string,
  exchangeRate: string
): string => {
  if (!isExpenseLineForeignCurrency(currencyCode, localCurrencyCode)) {
    return formatEditableExchangeRate(100);
  }

  const parsedExchangeRate = parseExpenseNumericInput(exchangeRate);
  if (parsedExchangeRate != null && parsedExchangeRate > 0) {
    return exchangeRate;
  }

  return exchangeRate;
};

const buildLocalCurrencySettlementPatch = (
  currencyCode: string,
  localCurrencyCode: string,
  totalAmount: string,
  exchangeRate: string,
  amountMSTManuallyEdited: boolean
): Partial<DraftState> => {
  if (isExpenseLineForeignCurrency(currencyCode, localCurrencyCode)) {
    return {};
  }

  const parsedTotalAmount = parseExpenseNumericInput(totalAmount);
  return {
    exchangeRate: formatEditableExchangeRate(
      resolveExpenseLineExchangeRateForCurrency(currencyCode, localCurrencyCode, exchangeRate)
    ),
    ...(!amountMSTManuallyEdited && parsedTotalAmount != null ? { amountMST: formatEditableMoney(parsedTotalAmount) } : {}),
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
  const totalAmount =
    toFiniteNumber(header?.totalAmountCurrency ?? header?.totalAmount) ??
    toFiniteNumber(linkedExpenseLine?.amount) ??
    toFiniteNumber(linkedExpenseLine?.price);
  const ticketExchangeRate = toFiniteNumber(header?.exchRate ?? linkedExpenseLine?.exchRate);
  const ticketAmountMST = toFiniteNumber(header?.visibleReimbursableTotal ?? header?.amountMST ?? linkedExpenseLine?.amountMST);
  const sameCurrency = isExpenseLineSameReimbursementCurrency(normalizedCurrencyCode, normalizedLocalCurrencyCode);
  const exchangeRate = sameCurrency
    ? 100
    : ticketExchangeRate != null && ticketExchangeRate > 0
      ? ticketExchangeRate
      : null;
  const calculatedAmountMST =
    totalAmount != null
      ? calculateExpenseLineAmountMSTForCurrency(
          totalAmount,
          exchangeRate,
          normalizedCurrencyCode,
          normalizedLocalCurrencyCode
        )
      : null;
  const amountMST = ticketAmountMST ?? calculatedAmountMST ?? (sameCurrency ? totalAmount : null);

  return {
    description: safeText(header?.description),
    gastoType: header?.gastoType === null || header?.gastoType === undefined ? "" : String(header.gastoType),
    currencyCode: normalizedCurrencyCode,
    totalAmount: formatEditableMoney(totalAmount),
    amountMST: formatEditableMoney(amountMST),
    exchangeRate: formatEditableExchangeRate(exchangeRate),
    transDate: toExpenseTicketDateInput(header?.ticketDate || header?.transDate),
    ticketTime: normalizeExpenseTicketStoredTime(header?.ticketTime),
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
  amountMSTManuallyEdited: false,
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
        amountMSTManuallyEdited: false,
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
        amountMSTManuallyEdited: action.amountMSTManuallyEdited ?? state.amountMSTManuallyEdited,
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
  isSheetLinkReadOnly,
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
        ...buildLocalCurrencySettlementPatch(
          nextCurrencyCode,
          effectiveLocalCurrencyCode,
          state.draft.totalAmount,
          state.draft.exchangeRate,
          false
        ),
      };
      if (!nextPatch.amountMST) {
        Object.assign(
          nextPatch,
          buildAmountMSTPatchFromExchangeRate(
            state.draft.totalAmount,
            state.draft.exchangeRate,
            nextCurrencyCode,
            effectiveLocalCurrencyCode,
            false
          )
        );
      }
      dispatch({
        type: "patch_draft",
        patch: nextPatch,
        amountMSTManuallyEdited: false,
      });
    },
    [effectiveLocalCurrencyCode, state.draft.currencyCode, state.draft.exchangeRate, state.draft.totalAmount]
  );

  // Updates the editable ticket date draft.
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

  // Updates the editable ticket time draft when the original value is zero.
  const setDraftTicketTime = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      dispatch({
        type: "set_draft_field",
        field: "ticketTime",
        value: resolveSetStateValue(value, state.draft.ticketTime),
      });
    },
    [state.draft.ticketTime]
  );

  const setDraftTotalAmount = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      setTotalAmountInvalid(false);
      setAmountMSTInvalid(false);
      setExchangeRateInvalid(false);
      const nextTotalAmount = resolveSetStateValue(value, state.draft.totalAmount);
      const effectiveExchangeRate = resolveExchangeRateForSettlement(
        state.draft.currencyCode,
        effectiveLocalCurrencyCode,
        state.draft.exchangeRate
      );
      const nextPatch: Partial<DraftState> = {
        totalAmount: nextTotalAmount,
        ...buildAmountMSTPatchFromExchangeRate(
          nextTotalAmount,
          effectiveExchangeRate,
          state.draft.currencyCode,
          effectiveLocalCurrencyCode,
          state.amountMSTManuallyEdited
        ),
      };
      dispatch({
        type: "patch_draft",
        patch: nextPatch,
      });
    },
    [
      effectiveLocalCurrencyCode,
      state.amountMSTManuallyEdited,
      state.draft.currencyCode,
      state.draft.exchangeRate,
      state.draft.totalAmount,
    ]
  );

  const setDraftAmountMST = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      setAmountMSTInvalid(false);
      setExchangeRateInvalid(false);
      const nextAmountMST = resolveSetStateValue(value, state.draft.amountMST);
      if (areExpenseNumericInputsEquivalent(nextAmountMST, state.draft.amountMST)) {
        if (nextAmountMST !== state.draft.amountMST) {
          dispatch({
            type: "patch_draft",
            patch: {
              amountMST: nextAmountMST,
            },
          });
        }
        return;
      }

      dispatch({
        type: "patch_draft",
        patch: {
          amountMST: nextAmountMST,
          ...buildExchangeRatePatchFromAmountMST(
            state.draft.totalAmount,
            nextAmountMST,
            state.draft.currencyCode,
            effectiveLocalCurrencyCode,
            state.draft.exchangeRate
          ),
        },
        amountMSTManuallyEdited: true,
      });
    },
    [effectiveLocalCurrencyCode, state.draft.amountMST, state.draft.currencyCode, state.draft.exchangeRate, state.draft.totalAmount]
  );

  const setDraftExchangeRate = useCallback<Dispatch<SetStateAction<string>>>(
    (value) => {
      setExchangeRateInvalid(false);
      setAmountMSTInvalid(false);
      const nextExchangeRate = resolveSetStateValue(value, state.draft.exchangeRate);
      dispatch({
        type: "patch_draft",
        patch: {
          exchangeRate: nextExchangeRate,
        },
      });
    },
    [state.draft.exchangeRate]
  );

  const commitDraftExchangeRate = useCallback(
    (value: string, currencyCodeOverride?: string) => {
      setExchangeRateInvalid(false);
      setAmountMSTInvalid(false);
      const effectiveCurrencyCode = currencyCodeOverride
        ? normalizeCurrencyCode(currencyCodeOverride)
        : state.draft.currencyCode;
      const nextExchangeRate = formatEditableExchangeRate(
        resolveExchangeRateForSettlement(
          effectiveCurrencyCode,
          effectiveLocalCurrencyCode,
          value
        )
      );
      dispatch({
        type: "patch_draft",
        patch: {
          exchangeRate: nextExchangeRate,
          ...buildAmountMSTPatchFromExchangeRate(
            state.draft.totalAmount,
            nextExchangeRate,
            effectiveCurrencyCode,
            effectiveLocalCurrencyCode,
            state.amountMSTManuallyEdited
          ),
        },
      });
    },
    [effectiveLocalCurrencyCode, state.amountMSTManuallyEdited, state.draft.currencyCode, state.draft.totalAmount]
  );

  // Clears settlement values that no longer match the selected ticket date or currency.
  const clearDraftCurrencySettlement = useCallback(() => {
    setExchangeRateInvalid(false);
    setAmountMSTInvalid(false);
    dispatch({
      type: "patch_draft",
      patch: {
        exchangeRate: "",
        amountMST: "",
      },
      amountMSTManuallyEdited: false,
    });
  }, []);

  const handleEnableEdit = useCallback(() => {
    if (!header || isLoading) return;
    if (isSheetLinkReadOnly) return;
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
    isSheetLinkReadOnly,
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
    const requiresForeignCurrencySettlement = isExpenseLineForeignCurrency(normalizedCurrencyCode, effectiveLocalCurrencyCode);
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
    setDraftTransDate,
    setDraftTicketTime,
    setDraftTotalAmount,
    setDraftAmountMST,
    setDraftExchangeRate,
    commitDraftExchangeRate,
    clearDraftCurrencySettlement,
    canOpenSaveConfirm,
    handleEnableEdit,
    handleCancelEdit,
  };
};
