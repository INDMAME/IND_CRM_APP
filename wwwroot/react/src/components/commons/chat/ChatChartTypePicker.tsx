import type { ChartTypeChoiceOption, VisualizationType } from "./chatMessageContract.ts";
import { classNames } from "../../../utils/classNames.ts";

type ChatChartTypePickerProps = {
  question: string;
  options: ChartTypeChoiceOption[];
  selectedType?: VisualizationType | null;
  disabled?: boolean;
  onSelect?: (value: VisualizationType) => void;
};

// Shows the common visualization choices without coupling to business rules.
const ChatChartTypePicker = ({
  question,
  options,
  selectedType,
  disabled = false,
  onSelect,
}: ChatChartTypePickerProps) => {
  return (
    <section className="w-[min(100vw-7rem,24rem)] max-w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm">
      <p className="text-sm font-semibold text-slate-900">{question}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {options.map((option) => {
          const isSelected = option.value === selectedType;

          return (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              className={classNames(
                "rounded-xl border px-3 py-2 text-left transition focus:outline-hidden focus:ring-2 focus:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-60",
                isSelected
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white"
              )}
              onClick={() => onSelect?.(option.value)}
            >
              <span className="block text-sm font-semibold">{option.label}</span>
              {option.description ? <span className="mt-1 block text-xs leading-5">{option.description}</span> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ChatChartTypePicker;
