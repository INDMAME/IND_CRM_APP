import React from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetLine } from "../expenseTypes.ts";
import { formatExpenseAmountLabel } from "../expenseFormatters.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import { formatExpenseDisplayDate, normalizeDescriptionText, safeText } from "../utils/expenseUiUtils.ts";
import { formatExpenseInputNumber, formatExpenseNumber } from "../utils/expenseNumberFormat.ts";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import ExpenseCurrencySettlementFields from "./ExpenseCurrencySettlementFields.tsx";
import {
  LINE_REIMBURSABLE_EXPENSE_YES_VALUE,
  getExpenseLineReimbursableExpenseLabel,
  getExpenseLineReimbursableExpenseOptions,
  isEditableExpenseLineReimbursableExpense,
  normalizeExpenseLineReimbursableExpense,
} from "../constants/expenseReimbursableExpenseCatalog.ts";

type ExpenseSheetLineFormProps = {
  line: ExpenseSheetLine;
  fallbackDate: string;
  sheetDescription: string;
  projectValue: string;
  priceText: string;
  amountText: string;
  draftAmountCurrency: string;
  amountMSTText: string;
  reimbursableAmountText: string;
  internacionalLabel: string;
  isKmType: boolean;
  isFuelPriceLoading: boolean;
  fuelPriceMessage: string;
  fuelPriceMessageIsError: boolean;
  isEditing: boolean;
  gastoTypeOptions: ExpenseSelectOption[];
  internationalOptions: ExpenseSelectOption[];
  draftDescription: string;
  draftTransDate: string;
  draftTypeValueCode: string;
  draftPrice: string;
  draftQty: string;
  draftProjectId: string;
  draftInternational: string;
  draftReimbursableExpense: number | null;
  draftCurrencyCode: string;
  draftAmountMST: string;
  draftExchangeRate: string;
  localCurrencyCode: string;
  exchangeRateInfoMessage: string;
  linkedTicketFileId: string;
  showLinkedTicketField: boolean;
  descriptionInputRef?: React.Ref<HTMLInputElement>;
  typeInputRef?: React.Ref<HTMLInputElement>;
  priceInputRef?: React.Ref<HTMLInputElement>;
  qtyInputRef?: React.Ref<HTMLInputElement>;
  descriptionInvalid?: boolean;
  typeInvalid?: boolean;
  priceInvalid?: boolean;
  qtyInvalid?: boolean;
  onDraftDescriptionChange: (value: string) => void;
  onDraftTransDateChange: (value: string) => void;
  onDraftTypeValueCodeChange: (value: string) => void;
  onDraftPriceChange: (value: string) => void;
  onDraftQtyChange: (value: string) => void;
  onDraftAmountCurrencyChange: (value: string) => void;
  onDraftProjectIdChange: (value: string) => void;
  onDraftInternationalChange: (value: string) => void;
  onDraftReimbursableExpenseChange: (value: number) => void;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftAmountMSTChange: (value: string) => void;
  onDraftExchangeRateChange: (value: string) => void;
  onDraftExchangeRateCommit?: (value: string) => void;
  onOpenLinkedTicket: () => void;
};

const formatQtyValue = (value: number | null | undefined): string => {
  return formatExpenseNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-",
  });
};

type ExpenseSheetLineCurrencyFieldsProps = {
  line: ExpenseSheetLine;
  amountText: string;
  draftAmountCurrency: string;
  amountMSTText: string;
  isEditing: boolean;
  draftCurrencyCode: string;
  draftAmountMST: string;
  draftExchangeRate: string;
  localCurrencyCode: string;
  exchangeRateInfoMessage: string;
  betweenAmountsAndCurrency: React.ReactNode;
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftAmountCurrencyChange: (value: string) => void;
  onDraftAmountMSTChange: (value: string) => void;
  onDraftExchangeRateChange: (value: string) => void;
  onDraftExchangeRateCommit?: (value: string) => void;
};

// Renders per-line currency settlement controls with sheet-specific gross semantics.
const ExpenseSheetLineCurrencyFields = ({
  line,
  amountText,
  draftAmountCurrency,
  amountMSTText,
  isEditing,
  draftCurrencyCode,
  draftAmountMST,
  draftExchangeRate,
  localCurrencyCode,
  exchangeRateInfoMessage,
  betweenAmountsAndCurrency,
  onDraftCurrencyCodeChange,
  onDraftAmountCurrencyChange,
  onDraftAmountMSTChange,
  onDraftExchangeRateChange,
  onDraftExchangeRateCommit,
}: ExpenseSheetLineCurrencyFieldsProps) => {
  const normalizedExpenseCurrencyCode = safeText(isEditing ? draftCurrencyCode : line.currencyCode).toUpperCase();
  const exchangeRateValue = isEditing
    ? draftExchangeRate
    : formatExpenseNumber(line.exchRate ?? null, {
        minimumFractionDigits: 7,
        maximumFractionDigits: 7,
        useGrouping: true,
        fallback: "-",
      });
  const grossCompanyAmountValue = isEditing ? draftAmountMST : amountMSTText || "-";
  const amountCurrencyEditable = isEditing && line.ticket !== true;
  const amountCurrencyValue = amountCurrencyEditable ? draftAmountCurrency : amountText || "-";

  return (
    <ExpenseCurrencySettlementFields
      isEditing={isEditing}
      expenseCurrencyCode={normalizedExpenseCurrencyCode}
      localCurrencyCode={localCurrencyCode}
      exchangeRate={exchangeRateValue}
      exchangeRateInfoMessage={exchangeRateInfoMessage}
      exchangeRateReferenceKind="company"
      amountCurrency={amountCurrencyValue}
      amountCurrencyLabel={formatExpenseAmountLabel(normalizedExpenseCurrencyCode)}
      amountCurrencyMode={amountCurrencyEditable ? "editable" : "readonly"}
      reimbursementAmount={grossCompanyAmountValue}
      companyAmountLabel={formatExpenseAmountLabel(localCurrencyCode)}
      betweenAmountsAndCurrency={betweenAmountsAndCurrency}
      onExpenseCurrencyChange={onDraftCurrencyCodeChange}
      onAmountCurrencyChange={onDraftAmountCurrencyChange}
      onExchangeRateChange={onDraftExchangeRateChange}
      onExchangeRateCommit={onDraftExchangeRateCommit}
      onReimbursementAmountChange={onDraftAmountMSTChange}
    />
  );
};

// Pure form renderer for expense line detail in read and edit modes.
const ExpenseSheetLineForm = ({
  line,
  fallbackDate,
  sheetDescription: _sheetDescription,
  projectValue,
  priceText,
  amountText,
  draftAmountCurrency,
  amountMSTText,
  reimbursableAmountText,
  internacionalLabel,
  isKmType,
  isFuelPriceLoading,
  fuelPriceMessage,
  fuelPriceMessageIsError,
  isEditing,
  gastoTypeOptions,
  internationalOptions,
  draftDescription,
  draftTransDate,
  draftTypeValueCode,
  draftPrice,
  draftQty,
  draftProjectId,
  draftInternational,
  draftReimbursableExpense,
  draftCurrencyCode,
  draftAmountMST,
  draftExchangeRate,
  localCurrencyCode,
  exchangeRateInfoMessage,
  linkedTicketFileId,
  showLinkedTicketField,
  descriptionInputRef,
  typeInputRef,
  priceInputRef,
  qtyInputRef,
  descriptionInvalid = false,
  typeInvalid = false,
  priceInvalid = false,
  qtyInvalid = false,
  onDraftDescriptionChange,
  onDraftTransDateChange,
  onDraftTypeValueCodeChange,
  onDraftPriceChange,
  onDraftQtyChange,
  onDraftAmountCurrencyChange,
  onDraftProjectIdChange,
  onDraftInternationalChange,
  onDraftReimbursableExpenseChange,
  onDraftCurrencyCodeChange,
  onDraftAmountMSTChange,
  onDraftExchangeRateChange,
  onDraftExchangeRateCommit,
  onOpenLinkedTicket,
}: ExpenseSheetLineFormProps) => {
  const reimbursableExpenseOptions = React.useMemo(() => getExpenseLineReimbursableExpenseOptions(), []);
  const reimbursableExpenseValue = normalizeExpenseLineReimbursableExpense(
    isEditing ? draftReimbursableExpense : line.reimbursableExpense
  );
  const hasEditableReimbursableExpenseValue = isEditableExpenseLineReimbursableExpense(reimbursableExpenseValue);
  const reimbursableExpenseLabel = getExpenseLineReimbursableExpenseLabel(
    isEditing ? draftReimbursableExpense : line.reimbursableExpense
  );
  const reimbursableStatusLabel = indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable");
  const hasPendingReimbursementRecalculation =
    !isEditing && line.reimbursableExpense === LINE_REIMBURSABLE_EXPENSE_YES_VALUE && line.reimbursableAmount === 0;
  const internationalField = isEditing ? (
    <SelectCombobox
      label={indT("ExpenseSheets_Field_International", "International")}
      options={internationalOptions}
      value={draftInternational || ""}
      onChange={onDraftInternationalChange}
      placeholder={indT("ExpenseSheets_Field_International", "International")}
      allowTextInput={false}
      showSearchButton={false}
    />
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_International", "International")}
      value={internacionalLabel}
    />
  );
  const reimbursableExpenseField = isEditing && hasEditableReimbursableExpenseValue ? (
    <SelectCombobox
      label={reimbursableStatusLabel}
      options={reimbursableExpenseOptions}
      value={String(reimbursableExpenseValue)}
      onChange={(value) => {
        const normalizedValue = normalizeExpenseLineReimbursableExpense(value);
        if (isEditableExpenseLineReimbursableExpense(normalizedValue) && normalizedValue !== null) {
          onDraftReimbursableExpenseChange(normalizedValue);
        }
      }}
      placeholder={reimbursableStatusLabel}
      allowTextInput={false}
      showSearchButton={false}
    />
  ) : (
    <ExpenseReadOnlyField
      label={reimbursableStatusLabel}
      value={reimbursableExpenseLabel}
    />
  );
  const reimbursementSection = (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {reimbursableExpenseField}
        <ExpenseReadOnlyField
          label={indT("ExpenseSheets_Field_ReimbursementAmount", "Reimbursement amount")}
          value={reimbursableAmountText}
          valueAlign="right"
        />
      </div>

      {hasPendingReimbursementRecalculation ? (
        <p
          className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900"
          role="status"
          aria-live="polite"
        >
          {indT(
            "ExpenseSheets_Reimbursement_RecalculationPending",
            "Reimbursable status is Yes but the reimbursement amount is zero. The AX record may be pending recalculation."
          )}
        </p>
      ) : null}
    </div>
  );
  const descriptionField = isEditing ? (
    <div className="sm:col-span-2 space-y-1.5">
      <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Description", "Description")}</label>
      <input
        ref={descriptionInputRef}
        className={`form-control${
          descriptionInvalid ? " border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : ""
        }`}
        value={draftDescription}
        onChange={(event) => onDraftDescriptionChange(event.target.value || "")}
        onBlur={(event) => onDraftDescriptionChange(normalizeDescriptionText(event.target.value, ""))}
        aria-invalid={descriptionInvalid ? "true" : "false"}
        aria-label={indT("ExpenseSheets_Field_Description", "Description")}
      />
    </div>
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_Description", "Description")}
      value={normalizeDescriptionText(line.description)}
      fullWidth
    />
  );
  const linkedTicketField = showLinkedTicketField ? (
    <ExpenseReadOnlyField
      label={indT("Tickets_Field_FileId", "Ticket Id.")}
      value={linkedTicketFileId}
      onClick={onOpenLinkedTicket}
    />
  ) : null;
  const quantityField = isEditing ? (
    <div className="space-y-1.5">
      <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Qty", "Quantity")}</label>
      <input
        ref={qtyInputRef}
        className={`form-control text-right tabular-nums${
          qtyInvalid ? " border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : ""
        }`}
        type="text"
        inputMode="decimal"
        value={draftQty}
        onChange={(event) => onDraftQtyChange(event.target.value || "")}
        onBlur={(event) =>
          onDraftQtyChange(
            formatExpenseInputNumber(event.target.value, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: true,
              fallback: "",
            })
          )
        }
        aria-invalid={qtyInvalid ? "true" : "false"}
        aria-label={indT("ExpenseSheets_Field_Qty", "Quantity")}
      />
    </div>
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_Qty", "Quantity")}
      value={formatQtyValue(line.qty)}
      valueAlign="right"
    />
  );
  const priceField = isEditing ? (
    <div className="space-y-1.5">
      <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Price", "Price")}</label>
      <input
        ref={priceInputRef}
        className={`${isKmType ? "form-control ind-readonly-field" : "form-control"} text-right tabular-nums${
          priceInvalid ? " border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : ""
        }`}
        type="text"
        inputMode="decimal"
        value={draftPrice}
        onChange={(event) => onDraftPriceChange(event.target.value || "")}
        onBlur={(event) =>
          onDraftPriceChange(
            formatExpenseInputNumber(event.target.value, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
              useGrouping: true,
              fallback: "",
            })
          )
        }
        readOnly={isKmType}
        disabled={isKmType}
        aria-readonly={isKmType}
        aria-invalid={priceInvalid ? "true" : "false"}
        aria-label={indT("ExpenseSheets_Field_Price", "Price")}
      />
      {isKmType && isFuelPriceLoading ? (
        <p className="text-slate-500 text-xs">
          {indT("ExpenseSheets_FuelPrice_Loading", "Loading fuel price...")}
        </p>
      ) : null}
      {isKmType && !isFuelPriceLoading && fuelPriceMessage ? (
        <p className={fuelPriceMessageIsError ? "text-danger text-sm" : "text-slate-500 text-xs"}>{fuelPriceMessage}</p>
      ) : null}
    </div>
  ) : (
    <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Price", "Price")} value={priceText || "-"} valueAlign="right" />
  );
  const dateField = isEditing ? (
    <div className="visita-field-text">
      <SingleDatePicker
        label={indT("ExpenseSheets_Field_CreatedDate", "Date")}
        value={draftTransDate}
        onChange={onDraftTransDateChange}
        readOnly={!isEditing}
        disabled={!isEditing}
      />
    </div>
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_CreatedDate", "Date")}
      value={formatExpenseDisplayDate(
        safeText(line.transDate || fallbackDate),
        document?.documentElement?.lang || "es-ES"
      )}
    />
  );
  const typeField = isEditing ? (
    <SelectCombobox
      label={indT("ExpenseSheets_Field_Type", "Category")}
      options={gastoTypeOptions}
      value={draftTypeValueCode || ""}
      onChange={onDraftTypeValueCodeChange}
      inputRef={typeInputRef}
      placeholder={indT("ExpenseSheets_Field_Type", "Category")}
      invalid={typeInvalid}
      allowTextInput={false}
      showSearchButton={false}
    />
  ) : (
    <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Type", "Category")} value={safeText(line.typeValue) || "-"} />
  );
  const projectField = isEditing ? (
    <ExpenseProjectFilterInput
      label={indT("ExpenseSheets_Field_Project", "Project")}
      placeholder={indT("ExpenseSheets_Filter_Project_Placeholder", "Project id")}
      value={draftProjectId}
      onChange={onDraftProjectIdChange}
      disabled={!isEditing}
      readOnly={!isEditing}
    />
  ) : (
    <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Project", "Project")} value={projectValue} />
  );
  const quantityPriceFields = (
    <div className="grid grid-cols-2 gap-3 md:col-span-2 md:gap-4">
      {quantityField}
      {priceField}
    </div>
  );
  const dateTypeFields = (
    <div className="grid grid-cols-2 gap-3 md:col-span-2 md:gap-4">
      {dateField}
      {typeField}
    </div>
  );
  const projectTicketFields = linkedTicketField ? (
    <div className="grid grid-cols-2 gap-3 md:col-span-2 md:gap-4">
      {projectField}
      {linkedTicketField}
    </div>
  ) : (
    projectField
  );

  return (
    <section className="space-y-0">
      <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {descriptionField}
          {quantityPriceFields}

          <ExpenseSheetLineCurrencyFields
            line={line}
            amountText={amountText}
            draftAmountCurrency={draftAmountCurrency}
            amountMSTText={amountMSTText}
            isEditing={isEditing}
            draftCurrencyCode={draftCurrencyCode}
            draftAmountMST={draftAmountMST}
            draftExchangeRate={draftExchangeRate}
            localCurrencyCode={localCurrencyCode}
            exchangeRateInfoMessage={exchangeRateInfoMessage}
            betweenAmountsAndCurrency={reimbursementSection}
            onDraftCurrencyCodeChange={onDraftCurrencyCodeChange}
            onDraftAmountCurrencyChange={onDraftAmountCurrencyChange}
            onDraftAmountMSTChange={onDraftAmountMSTChange}
            onDraftExchangeRateChange={onDraftExchangeRateChange}
            onDraftExchangeRateCommit={onDraftExchangeRateCommit}
          />

          {dateTypeFields}

          <div className="md:col-span-2">
            {internationalField}
          </div>

          {projectTicketFields}
        </div>
      </section>
    </section>
  );
};

export default ExpenseSheetLineForm;
