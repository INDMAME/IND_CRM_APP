import React from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../../utils/classNames.ts";

type RecordNavigatorLabels = {
  navigation: string;
  first: string;
  previous: string;
  next: string;
  last: string;
  position: string;
};

type RecordNavigatorVariant = "standard" | "compact";

type RecordNavigatorProps = {
  currentIndex: number;
  totalItems: number;
  labels: RecordNavigatorLabels;
  disabled?: boolean;
  variant?: RecordNavigatorVariant;
  className?: string;
  onFirst: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onLast: () => void;
};

type RecordNavigatorButtonProps = {
  label: string;
  disabled: boolean;
  icon: React.ComponentType<React.ComponentProps<"svg">>;
  onClick: () => void;
};

// Icon-only control for the shared record navigator.
const RecordNavigatorButton = ({ label, disabled, icon: Icon, onClick }: RecordNavigatorButtonProps) => {
  return (
    <button
      type="button"
      className={classNames(
        "inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-[5px] border-0 bg-transparent text-primary/80 transition",
        "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-0",
        disabled ? "cursor-not-allowed text-primary/25" : "hover:bg-primary/8 hover:text-primary active:bg-primary/10"
      )}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault();
        if (disabled) return;
        onClick();
      }}
    >
      <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
};

// Dumb record-to-record navigator with fixed controls and caller-owned navigation state.
const RecordNavigator = ({
  currentIndex,
  totalItems,
  labels,
  disabled = false,
  variant = "standard",
  className,
  onFirst,
  onPrevious,
  onNext,
  onLast,
}: RecordNavigatorProps) => {
  const safeTotal = Math.max(0, totalItems || 0);
  const safeCurrent = Math.min(Math.max(1, currentIndex || 1), safeTotal || 1);
  if (safeTotal <= 1) return null;

  const atFirst = safeCurrent <= 1;
  const atLast = safeCurrent >= safeTotal;
  const disableFirst = disabled || atFirst;
  const disablePrevious = disabled || atFirst;
  const disableNext = disabled || atLast;
  const disableLast = disabled || atLast;
  const spacingClassName = variant === "compact" ? "h-[64px] px-3 py-0" : "min-h-12 px-3 py-1.5";

  return (
    <nav
      className={classNames(
        "grid grid-cols-[1fr_auto_1fr] items-center bg-transparent font-sans text-primary",
        spacingClassName,
        className || ""
      )}
      aria-label={labels.navigation}
    >
      <div className="flex items-center justify-start gap-2">
        <RecordNavigatorButton label={labels.first} disabled={disableFirst} icon={ChevronDoubleLeftIcon} onClick={onFirst} />
        <RecordNavigatorButton label={labels.previous} disabled={disablePrevious} icon={ChevronLeftIcon} onClick={onPrevious} />
      </div>

      <div className="min-w-[7rem] text-center text-base font-bold leading-none text-primary" aria-live="polite">
        {labels.position}
      </div>

      <div className="flex items-center justify-end gap-2">
        <RecordNavigatorButton label={labels.next} disabled={disableNext} icon={ChevronRightIcon} onClick={onNext} />
        <RecordNavigatorButton label={labels.last} disabled={disableLast} icon={ChevronDoubleRightIcon} onClick={onLast} />
      </div>
    </nav>
  );
};

export type { RecordNavigatorLabels, RecordNavigatorProps };
export default RecordNavigator;
