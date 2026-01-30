import React from "react";
import { classNames } from "../../utils/classNames.ts";
import StarBorder from "./StarBorder.tsx";

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
  useStarBorder?: boolean;
};

// Dumb slider for quick filter buttons; parent controls state.
function QuickFilterSlider<T extends string>({
  items,
  activeId = null,
  onSelect,
  ariaLabel,
  className,
  useStarBorder = false,
}: QuickFilterSliderProps<T>) {
  return (
    <div className={classNames("ind-quick-slider", className)} aria-label={ariaLabel}>
      <div className="ind-quick-slider__track">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const isDisabled = !!item.disabled;
          const outerBase = classNames(
            "ind-quick-slider__item text-xs font-semibold transition",
            isActive ? "is-active" : "",
            isDisabled ? "opacity-60 cursor-not-allowed" : ""
          );
          const innerBase = classNames(
            "w-full rounded-full border border-transparent px-3 py-1.5 text-[11px] font-semibold transition",
            isActive ? "bg-[#00296be0] text-[#e2e8f0]" : "bg-[#00296bc4] text-[#e2e8f0] hover:bg-[#00296be0]"
          );

          if (useStarBorder) {
            return (
              <StarBorder
                key={item.id}
                as="button"
                type="button"
                disabled={isDisabled}
                className={classNames(outerBase, "rounded-full")}
                contentClassName={classNames(innerBase, isDisabled ? "opacity-60" : "")}
                color={isActive ? "#00296be0" : "#00296bc4"}
                speed="2.5s"
                thickness={2.5}
                useDefaultStyle={false}
                onClick={() => onSelect?.(item.id)}
              >
                {item.label}
              </StarBorder>
            );
          }
          return (
            <button
              key={item.id}
              type="button"
              disabled={isDisabled}
              className={classNames(
                outerBase,
                "rounded-full border px-4 py-2 text-[11px] font-semibold",
                isActive
                  ? "border-transparent bg-[#00296be0] text-[#e2e8f0] shadow-sm"
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
