import React from "react";
import { classNames } from "../../utils/classNames.ts";

type Props = {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
};

// Dumb action button with standardized styling.
const ActionButton = ({
  label,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button"
}: Props) => {
  return (
    <button
      type={type}
      className={classNames("ind-action-btn", className)}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
};

export default ActionButton;
