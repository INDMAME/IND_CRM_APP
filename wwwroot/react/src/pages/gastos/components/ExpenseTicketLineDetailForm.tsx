import React from "react";
import { indT } from "../../../utils/indI18n.ts";
import {
  formatAmountWithCurrency,
  formatExpenseAmountLabel,
} from "../expenseFormatters.ts";
import type { ExpenseTicketDetailHeader, ExpenseTicketDetailLine } from "../tickets/detail/expenseTicketDetailTypes.ts";
import {
  LINE_REIMBURSABLE_EXPENSE_YES_VALUE,
  getExpenseLineReimbursableExpenseLabel,
} from "../constants/expenseReimbursableExpenseCatalog.ts";
import { formatExpenseInputNumber, formatExpenseNumber } from "../utils/expenseNumberFormat.ts";
import {
  canEditExpenseTicketTime,
  formatExpenseTicketTimeDisplay,
} from "../utils/expenseTicketDateTime.ts";
import { formatExpenseDisplayDate, normalizeDescriptionText } from "../utils/expenseUiUtils.ts";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import ExpenseTicketDateTimeFields, { type ExpenseTicketDateTimeMode } from "./ExpenseTicketDateTimeFields.tsx";

type ExpenseTicketLineDetailFormProps = {
  header: ExpenseTicketDetailHeader;
  line: ExpenseTicketDetailLine | null;
  companyCurrencyCode: string;
  isEditing: boolean;
  draftDescription: string;
  draftQty: string;
  draftPrice: string;
  draftTransDate: string;
  draftTicketTime: string;
  priceText: string;
  amountText: string;
  onDraftDescriptionChange: (value: string) => void;
  onDraftQtyChange: (value: string) => void;
  onDraftPriceChange: (value: string) => void;
  onDraftTransDateChange: (value: string) => void;
  onDraftTicketTimeChange: (value: string) => void;
};

const formatQtyValue = (value: number | null): string => {
  return formatExpenseNumber(value, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true,
    fallback: "-",
  });
};

// Read-only and editable form renderer for one ticket line.
const ExpenseTicketLineDetailForm = ({
  header,
  line,
  companyCurrencyCode,
  isEditing,
  draftDescription,
  draftQty,
  draftPrice,
  draftTransDate,
  draftTicketTime,
  priceText,
  amountText,
  onDraftDescriptionChange,
  onDraftQtyChange,
  onDraftPriceChange,
  onDraftTransDateChange,
  onDraftTicketTimeChange,
}: ExpenseTicketLineDetailFormProps) => {
  const locale = document?.documentElement?.lang || "es-ES";
  const dateTimeMode: ExpenseTicketDateTimeMode = !isEditing
    ? "read"
    : canEditExpenseTicketTime(header.ticketTime)
      ? "edit-date-time"
      : "edit-date";
  const ticketDateText = formatExpenseDisplayDate(header.ticketDate || header.transDate, locale) || "-";
  const ticketTimeText = formatExpenseTicketTimeDisplay(header.ticketTime) || "-";
  const reimbursableAmountText = formatAmountWithCurrency(line?.reimbursableAmount ?? null, companyCurrencyCode);
  const reimbursableStatusText = getExpenseLineReimbursableExpenseLabel(line?.reimbursableExpense);
  const hasPendingReimbursementRecalculation =
    line?.reimbursableExpense === LINE_REIMBURSABLE_EXPENSE_YES_VALUE && line?.reimbursableAmount === 0;
  const quantityField = isEditing ? (
    <div className="space-y-1.5">
      <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Qty", "Quantity")}</label>
      <input
        className="form-control text-right tabular-nums"
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
        aria-label={indT("ExpenseSheets_Field_Qty", "Quantity")}
      />
    </div>
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_Qty", "Quantity")}
      value={formatQtyValue(line?.qty ?? null)}
      valueAlign="right"
    />
  );
  const priceField = isEditing ? (
    <div className="space-y-1.5">
      <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Price", "Price")}</label>
      <input
        className="form-control text-right tabular-nums"
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
        aria-label={indT("ExpenseSheets_Field_Price", "Price")}
      />
    </div>
  ) : (
    <ExpenseReadOnlyField
      label={indT("ExpenseSheets_Field_Price", "Price")}
      value={priceText || "-"}
      valueAlign="right"
    />
  );

  return (
    <section className="space-y-0">
      <section className="relative shadow-xs glass-panel p-4 space-y-4 border border-[#e2e8f0] rounded-[var(--radius-xl)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ExpenseReadOnlyField
            label={indT("Tickets_Field_FileId", "Ticket Id.")}
            value={header.fileId || "-"}
          />

          <ExpenseTicketDateTimeFields
            mode={dateTimeMode}
            dateValue={draftTransDate}
            dateDisplayValue={ticketDateText}
            timeValue={draftTicketTime}
            timeDisplayValue={ticketTimeText}
            onDateChange={onDraftTransDateChange}
            onTimeChange={onDraftTicketTimeChange}
          />

          {isEditing ? (
            <div className="sm:col-span-2 space-y-1.5">
              <label className="form-label font-semibold">{indT("ExpenseSheets_Field_Description", "Description")}</label>
              <input
                className="form-control"
                value={draftDescription}
                onChange={(event) => onDraftDescriptionChange(event.target.value || "")}
                onBlur={(event) => onDraftDescriptionChange(normalizeDescriptionText(event.target.value, ""))}
                aria-label={indT("ExpenseSheets_Field_Description", "Description")}
              />
            </div>
          ) : (
            <ExpenseReadOnlyField
              label={indT("ExpenseSheets_Field_Description", "Description")}
              value={normalizeDescriptionText(line?.description)}
              fullWidth
            />
          )}

          <div className="grid grid-cols-2 gap-3 md:col-span-2 md:gap-4">
            {quantityField}
            {priceField}
          </div>

          <ExpenseReadOnlyField
            label={formatExpenseAmountLabel(header.currencyCode)}
            value={amountText || "-"}
            valueAlign="right"
            fullWidth
          />

          {line ? (
            <div className="grid grid-cols-2 gap-3 md:col-span-2 md:gap-4">
              <ExpenseReadOnlyField
                label={indT("ExpenseSheets_Field_ReimbursableExpense", "Reimbursable")}
                value={reimbursableStatusText}
              />
              <ExpenseReadOnlyField
                label={indT("ExpenseSheets_Field_ReimbursementAmount", "Reimbursement amount")}
                value={reimbursableAmountText}
                valueAlign="right"
              />
            </div>
          ) : null}

          {hasPendingReimbursementRecalculation ? (
            <p
              className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900 md:col-span-2"
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
      </section>
    </section>
  );
};

export default ExpenseTicketLineDetailForm;
