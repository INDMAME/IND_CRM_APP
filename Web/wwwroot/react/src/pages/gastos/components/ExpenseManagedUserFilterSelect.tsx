import React, { useMemo } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import type { AuthManagedUser } from "../../../context/AuthContext.tsx";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExpenseManagedUserFilterSelectProps = {
  label: string;
  placeholder: string;
  value: string;
  users: AuthManagedUser[];
  allOption?: ExpenseSelectOption | null;
  onChange: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  clearOnEmptyInput?: boolean;
};

const toOptionText = (user: AuthManagedUser): string => {
  const axUserId = String(user.axUserId || "").trim();
  const name = String(user.name || "").trim();
  if (!axUserId) return "";
  if (!name || name.toUpperCase() === axUserId.toUpperCase()) {
    return axUserId;
  }
  return `${axUserId} - ${name}`;
};

// Fixed local user selector used to filter expense sheets by managed Ax user.
const ExpenseManagedUserFilterSelect = ({
  label,
  placeholder,
  value,
  users,
  allOption = null,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true,
  clearOnEmptyInput = false,
}: ExpenseManagedUserFilterSelectProps) => {
  const options = useMemo<ExpenseSelectOption[]>(() => {
    const userOptions = (Array.isArray(users) ? users : [])
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
    return allOption ? [allOption, ...userOptions] : userOptions;
  }, [allOption, users]);

  const selectedTextMode = allOption && value === allOption.value ? "text" : "value";

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
      selectedTextMode={selectedTextMode}
      showLabel={showLabel}
      clearOnEmptyInput={clearOnEmptyInput}
    />
  );
};

export default ExpenseManagedUserFilterSelect;
