import React, { useCallback, useEffect, useRef, useState } from "react";
import { parseDecimalInput } from "../hooks/expenseMutationUtils.ts";
import { toExpenseGastoTypeCode } from "../constants/expenseGastoTypeCatalog.ts";

type UseExpenseSheetLineTypeValidationArgs = {
  draftTypeValueCode: string;
  draftPrice: string;
  draftQty: string;
  setDraftTypeValueCode: React.Dispatch<React.SetStateAction<string>>;
  setDraftPrice: React.Dispatch<React.SetStateAction<string>>;
  setDraftQty: React.Dispatch<React.SetStateAction<string>>;
};

// Keeps line save validation local so save flow can block before opening the modal.
export const useExpenseSheetLineTypeValidation = ({
  draftTypeValueCode,
  draftPrice,
  draftQty,
  setDraftTypeValueCode,
  setDraftPrice,
  setDraftQty,
}: UseExpenseSheetLineTypeValidationArgs) => {
  const [typeInvalid, setTypeInvalid] = useState(false);
  const [priceInvalid, setPriceInvalid] = useState(false);
  const [qtyInvalid, setQtyInvalid] = useState(false);
  const typeInputRef = useRef<HTMLInputElement | null>(null);
  const priceInputRef = useRef<HTMLInputElement | null>(null);
  const qtyInputRef = useRef<HTMLInputElement | null>(null);

  const focusTypeField = useCallback(() => {
    setTypeInvalid(true);
    window.requestAnimationFrame(() => {
      typeInputRef.current?.focus();
    });
  }, []);

  const focusAmountFields = useCallback(() => {
    const parsedQty = parseDecimalInput(draftQty);
    const parsedPrice = parseDecimalInput(draftPrice);
    const qtyIsValid = parsedQty != null && parsedQty > 0;
    const priceIsValid = parsedPrice != null && parsedPrice > 0;

    setQtyInvalid(!qtyIsValid);
    setPriceInvalid(!priceIsValid);

    window.requestAnimationFrame(() => {
      if (!qtyIsValid) {
        qtyInputRef.current?.focus();
        return;
      }

      if (!priceIsValid) {
        priceInputRef.current?.focus();
      }
    });
  }, [draftPrice, draftQty]);

  const handleDraftTypeValueCodeChange = useCallback(
    (value: string) => {
      setTypeInvalid(false);
      setDraftTypeValueCode(value);
    },
    [setDraftTypeValueCode]
  );

  const handleDraftPriceChange = useCallback(
    (value: string) => {
      setPriceInvalid(false);
      setDraftPrice(value);
    },
    [setDraftPrice]
  );

  const handleDraftQtyChange = useCallback(
    (value: string) => {
      setQtyInvalid(false);
      setDraftQty(value);
    },
    [setDraftQty]
  );

  useEffect(() => {
    const parsedPrice = parseDecimalInput(draftPrice);
    if (parsedPrice != null && parsedPrice > 0) {
      setPriceInvalid(false);
    }
  }, [draftPrice]);

  useEffect(() => {
    const parsedQty = parseDecimalInput(draftQty);
    if (parsedQty != null && parsedQty > 0) {
      setQtyInvalid(false);
    }
  }, [draftQty]);

  const canOpenSaveConfirm = useCallback(() => {
    if (toExpenseGastoTypeCode(draftTypeValueCode, { allowNone: false }) === null) {
      focusTypeField();
      return false;
    }

    const parsedPrice = parseDecimalInput(draftPrice);
    const parsedQty = parseDecimalInput(draftQty);
    const hasValidQtyPrice = parsedQty != null && parsedQty > 0 && parsedPrice != null && parsedPrice > 0;
    if (hasValidQtyPrice) {
      return true;
    }

    focusAmountFields();
    return false;
  }, [draftPrice, draftQty, draftTypeValueCode, focusAmountFields, focusTypeField]);

  return {
    typeInvalid,
    priceInvalid,
    qtyInvalid,
    typeInputRef,
    priceInputRef,
    qtyInputRef,
    focusTypeField,
    focusAmountFields,
    handleDraftTypeValueCodeChange,
    handleDraftPriceChange,
    handleDraftQtyChange,
    canOpenSaveConfirm,
  };
};
