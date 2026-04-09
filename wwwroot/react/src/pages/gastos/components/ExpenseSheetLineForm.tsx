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
import ExpenseSectionDivider from "./ExpenseSectionDivider.tsx";

type ExpenseSheetLineFormProps = {
  line: ExpenseSheetLine;
  fallbackDate: string;
  sheetDescription: string;
  projectValue: string;
  priceText: string;
  amountText: string;
  internacionalLabel: string;
  isKmType: boolean;
  isFuelPriceLoading: boolean;
  fuelPriceMessage: string;
  fuelPriceMessageIsError: boolean;
  status: string;
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
  onDraftProjectIdChange: (value: string) => void;
  onDraftInternationalChange: (value: string) => void;
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

// Pure form renderer for expense line detail in read and edit modes.
const ExpenseSheetLineForm = ({
  line,
  fallbackDate,
  sheetDescription: _sheetDescription,
  projectValue,
  priceText,
  amountText,
  internacionalLabel,
  isKmType,
  isFuelPriceLoading,
  fuelPriceMessage,
  fuelPriceMessageIsError,
  status,
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
  onDraftProjectIdChange,
  onDraftInternationalChange,
  onOpenLinkedTicket,
}: ExpenseSheetLineFormProps) => {
  return (
    <section className="space-y-0">
      <ExpenseSectionDivider
        label={indT("ExpenseSheets_Line", "Line")}
        className="expense-section-divider--spaced"
        labelClassName="expense-section-divider__label--title"
      />

      <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-slate-200 rounded-[var(--radius-xl)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isEditing ? (
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
          )}

          {showLinkedTicketField ? (
            <ExpenseReadOnlyField
              label={indT("Tickets_Field_FileId", "Ticket")}
              value={linkedTicketFileId}
              fullWidth
              onClick={onOpenLinkedTicket}
            />
          ) : null}

          {isEditing ? (
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
          )}

          {isEditing ? (
            <SelectCombobox
              label={indT("ExpenseSheets_Field_Type", "Type")}
              options={gastoTypeOptions}
              value={draftTypeValueCode || ""}
              onChange={onDraftTypeValueCodeChange}
              inputRef={typeInputRef}
              placeholder={indT("ExpenseSheets_Field_Type", "Type")}
              invalid={typeInvalid}
              usePortal={false}
              allowTextInput={false}
              showSearchButton={false}
            />
          ) : (
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Type", "Type")} value={safeText(line.typeValue) || "-"} />
          )}

          {isEditing ? (
            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Price", "Price")}</label>
              <input
                ref={priceInputRef}
                className={`${isKmType ? "form-control ind-readonly-field" : "form-control"}${
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
            <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Price", "Price")} value={priceText || "-"} />
          )}

          {isEditing ? (
            <div className="space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Qty", "Quantity")}</label>
              <input
                ref={qtyInputRef}
                className={`form-control${
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
            />
          )}

          <ExpenseReadOnlyField label={indT("ExpenseSheets_Field_Amount", "Amount")} value={amountText || "-"} />

          {isEditing ? (
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
          ) : null}

          {isEditing ? (
            <SelectCombobox
              label={indT("ExpenseSheets_Field_International", "International")}
              options={internationalOptions}
              value={draftInternational || ""}
              onChange={onDraftInternationalChange}
              placeholder={indT("ExpenseSheets_Field_International", "International")}
              usePortal={false}
              allowTextInput={false}
              showSearchButton={false}
            />
          ) : (
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Field_International", "International")}
              value={internacionalLabel}
            />
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span>{status}</span>
        </div>
      </section>
    </section>
  );
};

export default ExpenseSheetLineForm;
