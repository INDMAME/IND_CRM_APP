import React, { useCallback } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import type { ExpenseDateParts } from "../utils/expenseUiUtils.ts";
import ExpenseTimelineCard from "./ExpenseTimelineCard.tsx";

type ExpenseTicketLinkTimelineItemProps = {
  fileId: string;
  dateParts: ExpenseDateParts;
  title: string;
  subtitle: string;
  amountText: string;
  isSelected: boolean;
  isSelectable: boolean;
  selectionDisabled: boolean;
  selectLabel: string;
  onOpenDetail: () => void;
  onToggleSelect: () => void;
};

// Link-mode ticket card: center opens the read-only detail and the right rail toggles selection.
const ExpenseTicketLinkTimelineItem = ({
  fileId,
  dateParts,
  title,
  subtitle,
  amountText,
  isSelected,
  isSelectable,
  selectionDisabled,
  selectLabel,
  onOpenDetail,
  onToggleSelect,
}: ExpenseTicketLinkTimelineItemProps) => {
  const canToggleSelection = isSelectable && !selectionDisabled;

  const handleOpenDetail = useCallback(() => {
    onOpenDetail();
  }, [onOpenDetail]);

  const handleToggleSelection = useCallback(() => {
    if (!canToggleSelection) return;
    onToggleSelect();
  }, [canToggleSelection, onToggleSelect]);

  const selectionIndicatorToneClassName = isSelected
    ? "border-primary bg-primary text-white shadow-sm"
    : canToggleSelection
      ? "border-slate-300 bg-white text-transparent group-hover:border-primary group-hover:bg-primary/5"
      : "border-slate-200 bg-slate-100 text-transparent";

  return (
    <div
      className={isSelected ? "timeline-item rounded-[5px] ring-2 ring-primary/30" : "timeline-item"}
      data-ticket-file-id={fileId || undefined}
      data-ticket-selected={isSelected ? "true" : "false"}
      data-ticket-selectable={canToggleSelection ? "true" : "false"}
    >
      <div className="relative">
        <ExpenseTimelineCard
          dateParts={dateParts}
          title={title}
          subtitle={subtitle}
          amountText={amountText}
          onOpen={handleOpenDetail}
          titleClassName="expense-ticket-card__title timeline-name"
          interactionProps={{
            "aria-label": title,
            onContextMenu: (event) => {
              event.preventDefault();
            },
          }}
        />

        <button
          type="button"
          aria-label={selectLabel}
          aria-pressed={isSelected}
          title={selectLabel}
          disabled={!canToggleSelection}
          onClick={handleToggleSelection}
          className="group absolute inset-y-0 right-0 z-10 flex w-[4.25rem] items-start justify-end rounded-r-[5px] bg-transparent p-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 disabled:cursor-not-allowed sm:w-[4.75rem]"
        >
          <span
            className={`flex h-[30px] w-[30px] items-center justify-center rounded-[5px] border transition ${selectionIndicatorToneClassName}`}
          >
            <CheckIcon className="h-[20px] w-[20px]" strokeWidth={2.3} aria-hidden="true" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ExpenseTicketLinkTimelineItem;
