import React from "react";
import { classNames } from "../../utils/classNames.ts";

export type QuickFilterItem<T extends string = string> = {
  id: T;
  label: string;
  disabled?: boolean;
};

type QuickFilterSliderProps<T extends string = string> = {
  items: QuickFilterItem<T>[];
  activeId?: T | null;
  onSelect?: (id: T) => void;
  ariaLabel?: string;
  className?: string;
  itemClassName?: string;
};

// Dumb slider for quick filter buttons; parent controls state.
function QuickFilterSlider<T extends string>({
  items,
  activeId = null,
  onSelect,
  ariaLabel,
  className,
  itemClassName,
}: QuickFilterSliderProps<T>) {
  return (
    <div className={classNames("ind-quick-slider", className)} aria-label={ariaLabel}>
      <div className="ind-quick-slider__track">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isDisabled = !!item.disabled;
          const outerBase = classNames(
            "ind-quick-slider__item transition",
            isActive ? "is-active" : "",
            isDisabled ? "opacity-60 cursor-not-allowed" : ""
          );
          return (
            <button
              key={item.id}
              type="button"
              disabled={isDisabled}
              className={classNames(
                outerBase,
                "rounded-md border",
                itemClassName,
                isActive
                  ? "border-transparent bg-[#00296b] text-[#e2e8f0] shadow-sm"
                  : "border-transparent bg-[#00296bc4] text-[#e2e8f0] hover:bg-[#00296be0]"
              )}
              onClick={() => onSelect?.(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickFilterSlider;
