import React, { useMemo } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import type { AuthManagedUser } from "../../../context/AuthContext.tsx";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExpenseManagedUserFilterSelectProps = {
  label: string;
  placeholder: string;
  value: string;
  users: AuthManagedUser[];
  onChange: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
};

const toOptionText = (user: AuthManagedUser): string => {
  return String(user.name || "").trim();
};

// Fixed local user selector used to filter expense sheets by managed Ax user.
const ExpenseManagedUserFilterSelect = ({
  label,
  placeholder,
  value,
  users,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
}: ExpenseManagedUserFilterSelectProps) => {
  const options = useMemo<ExpenseSelectOption[]>(() => {
    return (Array.isArray(users) ? users : [])
      .map((entry) => {
        const axUserId = String(entry.axUserId || "").trim();
        const label = toOptionText(entry);
        if (!axUserId || !label) return null;
        return {
          value: axUserId,
          text: label,
        } as ExpenseSelectOption;
      })
      .filter((entry): entry is ExpenseSelectOption => !!entry);
  }, [users]);

  return (
    <SelectCombobox
      label={label}
      placeholder={placeholder}
      options={options}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      disabled={disabled}
      idBase="expense-managed-user-filter"
      portalClassName="visitas-typography"
      panelClassName="visitas-typography"
      allowTextInput
      showLabel={showLabel}
    />
  );
};

export default ExpenseManagedUserFilterSelect;
