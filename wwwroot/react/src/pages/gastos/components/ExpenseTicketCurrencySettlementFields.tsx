import React from "react";
import ExpenseCurrencySettlementFields from "./ExpenseCurrencySettlementFields.tsx";

type ExpenseTicketCurrencySettlementFieldsProps = {
  isEditing: boolean;
  expenseCurrencyCode: string;
  expenseCurrencyInvalid: boolean;
  expenseCurrencyInputRef: React.Ref<HTMLInputElement>;
  localCurrencyCode: string;
  exchangeRate: string;
  exchangeRateInvalid: boolean;
  exchangeRateInputRef: React.Ref<HTMLInputElement>;
  exchangeRateInfoMessage: string;
  amountCurrency: string;
  amountCurrencyInvalid: boolean;
  amountCurrencyInputRef: React.Ref<HTMLInputElement>;
  reimbursementAmount: string;
  reimbursementAmountInvalid: boolean;
  reimbursementAmountInputRef: React.Ref<HTMLInputElement>;
  onExpenseCurrencyChange: (value: string) => void;
  onExchangeRateChange: (value: string) => void;
  onAmountCurrencyChange: (value: string) => void;
  onReimbursementAmountChange: (value: string) => void;
};

// Keeps ticket detail wired to the same settlement component used by expense lines.
const ExpenseTicketCurrencySettlementFields = ({
  isEditing,
  expenseCurrencyCode,
  expenseCurrencyInvalid,
  expenseCurrencyInputRef,
  localCurrencyCode,
  exchangeRate,
  exchangeRateInvalid,
  exchangeRateInputRef,
  exchangeRateInfoMessage,
  amountCurrency,
  amountCurrencyInvalid,
  amountCurrencyInputRef,
  reimbursementAmount,
  reimbursementAmountInvalid,
  reimbursementAmountInputRef,
  onExpenseCurrencyChange,
  onExchangeRateChange,
  onAmountCurrencyChange,
  onReimbursementAmountChange,
}: ExpenseTicketCurrencySettlementFieldsProps) => {
  return (
    <ExpenseCurrencySettlementFields
      isEditing={isEditing}
      expenseCurrencyCode={expenseCurrencyCode}
      expenseCurrencyInvalid={expenseCurrencyInvalid}
      expenseCurrencyInputRef={expenseCurrencyInputRef}
      localCurrencyCode={localCurrencyCode}
      exchangeRate={exchangeRate}
      exchangeRateInvalid={exchangeRateInvalid}
      exchangeRateInputRef={exchangeRateInputRef}
      exchangeRateInfoMessage={exchangeRateInfoMessage}
      amountCurrency={amountCurrency}
      amountCurrencyMode="editable"
      amountCurrencyInvalid={amountCurrencyInvalid}
      amountCurrencyInputRef={amountCurrencyInputRef}
      reimbursementAmount={reimbursementAmount}
      reimbursementAmountInvalid={reimbursementAmountInvalid}
      reimbursementAmountInputRef={reimbursementAmountInputRef}
      onExpenseCurrencyChange={onExpenseCurrencyChange}
      onExchangeRateChange={onExchangeRateChange}
      onAmountCurrencyChange={onAmountCurrencyChange}
      onReimbursementAmountChange={onReimbursementAmountChange}
    />
  );
};

export default ExpenseTicketCurrencySettlementFields;
