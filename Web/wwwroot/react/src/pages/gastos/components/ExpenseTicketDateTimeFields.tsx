import React from "react";
import SingleDatePicker from "../../../components/commons/SingleDatePicker.tsx";
import { indT } from "../../../utils/indI18n.ts";
import ExpenseReadOnlyField from "./ExpenseReadOnlyField.tsx";
import ExpenseTicketTimeInput from "./ExpenseTicketTimeInput.tsx";

export type ExpenseTicketDateTimeMode = "read" | "edit-date" | "edit-date-time";

type ExpenseTicketDateTimeFieldsProps = {
  mode: ExpenseTicketDateTimeMode;
  dateValue: string;
  dateDisplayValue: string;
  timeValue: string;
  timeDisplayValue: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
};

// Renders the shared ticket date and conditional time editing contract.
const ExpenseTicketDateTimeFields = ({
  mode,
  dateValue,
  dateDisplayValue,
  timeValue,
  timeDisplayValue,
  onDateChange,
  onTimeChange,
}: ExpenseTicketDateTimeFieldsProps) => {
  const isEditing = mode !== "read";
  const dateField = isEditing ? (
    <div className="visita-field-text">
      <SingleDatePicker
        label={indT("Tickets_Field_TicketDate", "Date")}
        value={dateValue}
        onChange={onDateChange}
      />
    </div>
  ) : (
    <ExpenseReadOnlyField
      label={indT("Tickets_Field_TicketDate", "Date")}
      value={dateDisplayValue || "-"}
    />
  );
  const timeField = mode === "edit-date-time" ? (
    <ExpenseTicketTimeInput
      label={indT("Tickets_Field_TicketTime", "Time")}
      value={timeValue}
      onChange={onTimeChange}
    />
  ) : (
    <ExpenseReadOnlyField
      label={indT("Tickets_Field_TicketTime", "Time")}
      value={(isEditing ? timeValue : timeDisplayValue) || timeDisplayValue || "-"}
    />
  );

  return (
    <div className="md:col-span-2 grid grid-cols-2 gap-4">
      {dateField}
      {timeField}
    </div>
  );
};

export default ExpenseTicketDateTimeFields;
