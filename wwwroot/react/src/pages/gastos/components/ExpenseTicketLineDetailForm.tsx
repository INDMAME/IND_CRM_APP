import React from "react";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseTicketDetailHeader, ExpenseTicketDetailLine } from "../tickets/detail/expenseTicketDetailTypes.ts";
import { formatExpenseInputNumber, formatExpenseNumber } from "../utils/expenseNumberFormat.ts";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";

type ExpenseTicketLineDetailFormProps = {
  header: ExpenseTicketDetailHeader;
  line: ExpenseTicketDetailLine | null;
  isEditing: boolean;
  draftDescription: string;
  draftQty: string;
  draftPrice: string;
  priceText: string;
  amountText: string;
  onDraftDescriptionChange: (value: string) => void;
  onDraftQtyChange: (value: string) => void;
  onDraftPriceChange: (value: string) => void;
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
  isEditing,
  draftDescription,
  draftQty,
  draftPrice,
  priceText,
  amountText,
  onDraftDescriptionChange,
  onDraftQtyChange,
  onDraftPriceChange,
}: ExpenseTicketLineDetailFormProps) => {
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
              value={line?.description || "-"}
              fullWidth
            />
          )}

          <div className="grid grid-cols-2 gap-3 md:col-span-2 md:gap-4">
            {quantityField}
            {priceField}
          </div>

          <ExpenseReadOnlyField
            label={indT("ExpenseSheets_Field_Amount", "Amount")}
            value={amountText || "-"}
            valueAlign="right"
          />
        </div>
      </section>
    </section>
  );
};

export default ExpenseTicketLineDetailForm;
