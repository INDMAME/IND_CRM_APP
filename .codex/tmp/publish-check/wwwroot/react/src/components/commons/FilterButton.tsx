import React from "react";
import { classNames } from "../../utils/classNames.ts";

type Props = {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
};

// Dumb filter button with standardized styling.
const FilterButton = ({
  label,
  active = false,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button"
}: Props) => {
  return (
    <button
      type={type}
      className={classNames("ind-filter-btn", active ? "ind-filter-btn--active" : "", className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
};

export default FilterButton;
