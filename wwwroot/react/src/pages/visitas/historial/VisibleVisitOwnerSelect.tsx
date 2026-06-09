import React from "react";
import Spinner from "../../../components/commons/Spinner.tsx";
import { ChevronDownSvg } from "../../../components/commons/chevrons.tsx";
import { classNames } from "../../../utils/classNames.ts";
import { formatVisibleVisitUserLabel, type DataVisibilityVisibleUser } from "./visibleVisitUsers.ts";

type Props = {
  users: DataVisibilityVisibleUser[];
  selectedOwnerAxUserId: string;
  loading: boolean;
  errorMessage: string;
  label: string;
  allLabel: string;
  noUsersLabel: string;
  loadingLabel: string;
  onChange: (ownerAxUserId: string) => void;
};

// Fixed enum select for visible visit owner filtering.
const VisibleVisitOwnerSelect = ({
  users,
  selectedOwnerAxUserId,
  loading,
  errorMessage,
  label,
  allLabel,
  noUsersLabel,
  loadingLabel,
  onChange,
}: Props) => {
  const hasMultipleUsers = users.length > 1;
  const disabled = loading || users.length <= 1;
  const singleUserLabel = users.length === 1 ? formatVisibleVisitUserLabel(users[0]) : noUsersLabel;
  const statusText = loading ? loadingLabel : errorMessage;

  return (
    <div className="space-y-1">
      <label className="sr-only" htmlFor="history-visible-owner">
        {label}
      </label>
      <div className="relative">
        <select
          id="history-visible-owner"
          className={classNames(
            "w-full appearance-none rounded-[var(--radius-xl)] border border-slate-200 bg-white px-3 py-2 pr-10 text-sm sm:text-base leading-5 text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary",
            disabled ? "cursor-not-allowed text-slate-500" : ""
          )}
          value={hasMultipleUsers ? selectedOwnerAxUserId : ""}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          aria-label={label}
          aria-busy={loading}
        >
          {hasMultipleUsers ? (
            <>
              <option value="">{allLabel}</option>
              {users.map((user) => (
                <option key={user.axUserId} value={user.axUserId}>
                  {formatVisibleVisitUserLabel(user)}
                </option>
              ))}
            </>
          ) : (
            <option value="">{singleUserLabel}</option>
          )}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
          {loading ? <Spinner size="h-4 w-4" label={loadingLabel} /> : <ChevronDownSvg className="h-5 w-5" />}
        </span>
      </div>
      {statusText && (
        <div className="w-full flex justify-end">
          <span className={classNames("text-xs tech-info", errorMessage ? "text-amber-700" : "text-slate-500")}>{statusText}</span>
        </div>
      )}
    </div>
  );
};

export default VisibleVisitOwnerSelect;
