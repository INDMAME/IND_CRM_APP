import React, { useMemo } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import type { AuthManagedUser } from "../../../context/AuthContext.tsx";
import { formatUserNameWithId } from "../../../utils/userLabels.ts";
import type { ExpenseSelectOption } from "../utils/expenseSelectOptions.ts";

type ExpenseManagedUserFilterSelectProps = {
  label: string;
  placeholder: string;
  value: string;
  users: AuthManagedUser[];
  currentAxUserId?: string;
  currentUserName?: string;
  allOption?: ExpenseSelectOption | null;
  onChange: (value: string) => void;
  readOnly?: boolean;
  disabled?: boolean;
  showLabel?: boolean;
  clearOnEmptyInput?: boolean;
};

const normalizeUserText = (value: unknown): string => String(value || "").trim();

const isSameUser = (left: unknown, right: unknown): boolean => {
  const normalizedLeft = normalizeUserText(left).toUpperCase();
  const normalizedRight = normalizeUserText(right).toUpperCase();
  return !!normalizedLeft && normalizedLeft === normalizedRight;
};

const toOptionText = (user: AuthManagedUser, currentAxUserId = "", currentUserName = ""): string => {
  const axUserId = String(user.axUserId || "").trim();
  const name = String(user.name || "").trim();
  const contextUserName = normalizeUserText(currentUserName);
  if (!axUserId) return "";
  if (contextUserName && isSameUser(axUserId, currentAxUserId)) {
    return formatUserNameWithId(contextUserName, axUserId);
  }

  return formatUserNameWithId(name, axUserId);
};

// Fixed local user selector used to filter expense sheets by managed Ax user.
const ExpenseManagedUserFilterSelect = ({
  label,
  placeholder,
  value,
  users,
  currentAxUserId = "",
  currentUserName = "",
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
        const label = toOptionText(entry, currentAxUserId, currentUserName);
        if (!axUserId || !label) return null;
        return {
          value: axUserId,
          text: label,
        } as ExpenseSelectOption;
      })
      .filter((entry): entry is ExpenseSelectOption => !!entry);
    return allOption ? [allOption, ...userOptions] : userOptions;
  }, [allOption, currentAxUserId, currentUserName, users]);

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
      dropdownMinWidthPx={360}
      allowTextInput
      selectedTextMode="text"
      showLabel={showLabel}
      clearOnEmptyInput={clearOnEmptyInput}
    />
  );
};

export default ExpenseManagedUserFilterSelect;
