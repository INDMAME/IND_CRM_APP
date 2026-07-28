import React, { useMemo } from "react";
import SelectCombobox from "../../../components/commons/SelectCombobox.tsx";
import { classNames } from "../../../utils/classNames.ts";
import { formatModuleVisibleUserLabel, type ModuleDataVisibilityVisibleUser } from "../../../utils/moduleDataVisibility.ts";
import { HISTORY_VISIBLE_OWNER_ALL_VALUE } from "./historyVisibleOwnerSelection.ts";

type VisitOwnerSelectOption = {
  value: string;
  text: string;
};

type Props = {
  users: ModuleDataVisibilityVisibleUser[];
  selectedOwnerAxUserId: string;
  loading: boolean;
  disabled: boolean;
  errorMessage: string;
  label: string;
  allOption?: VisitOwnerSelectOption | null;
  noUsersLabel: string;
  loadingLabel: string;
  onChange: (ownerAxUserId: string) => void;
};

// Fixed local owner selector used to filter visit history by visible Ax users.
const VisibleVisitOwnerSelect = ({
  users,
  selectedOwnerAxUserId,
  loading,
  disabled,
  errorMessage,
  label,
  allOption = null,
  noUsersLabel,
  loadingLabel,
  onChange,
}: Props) => {
  const options = useMemo<VisitOwnerSelectOption[]>(() => {
    const ownerOptions = (Array.isArray(users) ? users : [])
      .map((entry) => {
        const axUserId = String(entry.axUserId || "").trim();
        const optionLabel = formatModuleVisibleUserLabel(entry);
        if (!axUserId || !optionLabel) return null;
        return {
          value: axUserId,
          text: optionLabel,
        } as VisitOwnerSelectOption;
      })
      .filter((entry): entry is VisitOwnerSelectOption => !!entry);

    return allOption ? [allOption, ...ownerOptions] : ownerOptions;
  }, [allOption, users]);

  const hasOptions = options.length > 0;
  const selectedExists = options.some((entry) => entry.value.toUpperCase() === selectedOwnerAxUserId.toUpperCase());
  const value = hasOptions && selectedExists ? selectedOwnerAxUserId : "";
  const statusText = loading ? loadingLabel : errorMessage;
  return (
    <div className="space-y-1">
      <SelectCombobox
        label={label}
        placeholder={hasOptions ? label : noUsersLabel}
        options={hasOptions ? options : [{ value: "", text: noUsersLabel }]}
        value={value}
        onChange={(nextValue) => {
          onChange(nextValue === HISTORY_VISIBLE_OWNER_ALL_VALUE ? "" : nextValue);
        }}
        disabled={disabled || loading || !hasOptions}
        idBase="history-visible-owner"
        portalClassName="visitas-typography"
        panelClassName="visitas-typography"
        dropdownMinWidthPx={360}
        allowTextInput
        selectedTextMode="text"
        showLabel={false}
      />
      {statusText && (
        <div className="w-full flex justify-end">
          <span className={classNames("text-xs tech-info", errorMessage ? "text-amber-700" : "text-slate-500")}>
            {statusText}
          </span>
        </div>
      )}
    </div>
  );
};

export default VisibleVisitOwnerSelect;
