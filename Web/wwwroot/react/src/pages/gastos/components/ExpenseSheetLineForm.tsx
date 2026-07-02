import React from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetLine } from "../expenseTypes.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";
import { formatExpenseDisplayDate, safeText } from "../utils/expenseUiUtils.ts";
import { formatExpenseInputNumber, formatExpenseNumber } from "../utils/expenseNumberFormat.ts";
import ExpenseProjectFilterInput from "./ExpenseProjectFilterInput.tsx";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import ExpenseCurrencySettlementFields from "./ExpenseCurrencySettlementFields.tsx";
import {
  getExpenseLineReimbursableExpenseLabel,
  getExpenseLineReimbursableExpenseOptions,
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
  typeInputRef?: React.Ref<HTMLInputElement>;
  priceInputRef?: React.Ref<HTMLInputElement>;
  qtyInputRef?: React.Ref<HTMLInputElement>;
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
  onDraftCurrencyCodeChange: (value: string) => void;
  onDraftAmountCurrencyChange: (value: string) => void;
  onDraftAmountMSTChange: (value: string) => void;
  onDraftExchangeRateChange: (value: string) => void;
  onDraftExchangeRateCommit?: (value: string) => void;
};

// Renders per-line currency and reimbursement controls.
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
  const reimbursementAmountValue = isEditing ? draftAmountMST : amountMSTText || "-";
  const amountCurrencyEditable = isEditing && line.ticket !== true;
  const amountCurrencyValue = amountCurrencyEditable ? draftAmountCurrency : amountText || "-";

  return (
    <ExpenseCurrencySettlementFields
      isEditing={isEditing}
      expenseCurrencyCode={normalizedExpenseCurrencyCode}
      localCurrencyCode={localCurrencyCode}
      exchangeRate={exchangeRateValue}
      exchangeRateInfoMessage={exchangeRateInfoMessage}
      amountCurrency={amountCurrencyValue}
      amountCurrencyMode={amountCurrencyEditable ? "editable" : "readonly"}
      reimbursementAmount={reimbursementAmountValue}
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
  typeInputRef,
  priceInputRef,
  qtyInputRef,
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
  const reimbursableExpenseLabel = getExpenseLineReimbursableExpenseLabel(reimbursableExpenseValue);
  const internationalField = isEditing ? (
    <SelectCombobox
      label={indT("ExpenseSheets_Field_International", "International")}
      options={internationalOptions}
      value={draftInternational || ""}
      onChange={onDraftInternationalChange}
      placeholder={indT("ExpenseSheets_Field_International", "International")}
      usePortal={false}
      dropdownPlacement="top"
      allowTextInput={false}
      showSearchButton={false}
    />
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_International", "International")}
      value={internacionalLabel}
    />
  );
  const reimbursableExpenseField = isEditing ? (
    <SelectCombobox
      label={indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable")}
      options={reimbursableExpenseOptions}
      value={String(reimbursableExpenseValue)}
      onChange={(value) => onDraftReimbursableExpenseChange(normalizeExpenseLineReimbursableExpense(value))}
      placeholder={indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable")}
      usePortal={false}
      dropdownPlacement="top"
      allowTextInput={false}
      showSearchButton={false}
    />
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable")}
      value={reimbursableExpenseLabel}
    />
  );
  const descriptionField = isEditing ? (
    <div className="sm:col-span-2 space-y-1.5">
      <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Description", "Description")}</label>
      <input
        className="form-control"
        value={draftDescription}
        onChange={(event) => onDraftDescriptionChange(event.target.value || "")}
        aria-label={indT("ExpenseSheets_Field_Description", "Description")}
      />
    </div>
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_Description", "Description")}
      value={safeText(line.description) || "-"}
      fullWidth
    />
  );
  const hasProjectField = isEditing || Boolean(projectValue);
  const linkedTicketField = showLinkedTicketField ? (
    <ExpenseReadOnlyField
      label={indT("Tickets_Field_FileId", "Ticket Id.")}
      value={linkedTicketFileId}
      fullWidth={!hasProjectField}
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
      usePortal={false}
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
  ) : projectValue ? (
    <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Project", "Project")} value={projectValue} />
  ) : null;
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
  const projectTicketFields = showLinkedTicketField && projectField && linkedTicketField ? (
    <div className="grid grid-cols-2 gap-3 md:col-span-2 md:gap-4">
      {projectField}
      {linkedTicketField}
    </div>
  ) : (
    <>
      {projectField}
      {linkedTicketField}
    </>
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
            onDraftCurrencyCodeChange={onDraftCurrencyCodeChange}
            onDraftAmountCurrencyChange={onDraftAmountCurrencyChange}
            onDraftAmountMSTChange={onDraftAmountMSTChange}
            onDraftExchangeRateChange={onDraftExchangeRateChange}
            onDraftExchangeRateCommit={onDraftExchangeRateCommit}
          />

          {dateTypeFields}

          <div className="grid grid-cols-2 gap-3 md:col-span-2 md:gap-4">
            {internationalField}
            {reimbursableExpenseField}
          </div>

          {projectTicketFields}
        </div>
      </section>
    </section>
  );
};

export default ExpenseSheetLineForm;
