import React, { useCallback } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useTapGuard } from "../../../hooks/useTapGuard.ts";
import type { ExpenseDateParts } from "../utils/expenseUiUtils.ts";
import ExpenseTimelineCard from "./ExpenseTimelineCard.tsx";

const HOLD_TO_SELECT_MS = 380;
const HOLD_MOVE_PX = 16;

type ExpenseTicketLinkTimelineItemProps = {
  fileId: string;
  dateParts: ExpenseDateParts;
  title: string;
  subtitle: string;
  amountText: string;
  isSelected: boolean;
  isSelectable: boolean;
  interactionDisabled: boolean;
  processedByAI: boolean | null;
  processedByAiLabel: string;
  selectLabel: string;
  onOpenDetail: () => void;
  onToggleSelect: () => void;
};

// Link-mode ticket card: quick tap opens detail, long press toggles selection anywhere on the card.
const ExpenseTicketLinkTimelineItem = ({
  fileId,
  dateParts,
  title,
  subtitle,
  amountText,
  isSelected,
  isSelectable,
  interactionDisabled,
  processedByAI,
  processedByAiLabel,
  selectLabel,
  onOpenDetail,
  onToggleSelect,
}: ExpenseTicketLinkTimelineItemProps) => {
  const handleTap = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (interactionDisabled) return;
      onOpenDetail();
    },
    [interactionDisabled, onOpenDetail]
  );

  const handleHold = useCallback(() => {
    if (interactionDisabled || !isSelectable) return false;
    onToggleSelect();
    return true;
  }, [interactionDisabled, isSelectable, onToggleSelect]);

  const tapGuard = useTapGuard(handleTap, handleHold, {
    holdMs: HOLD_TO_SELECT_MS,
    movePx: HOLD_MOVE_PX,
  });

  const selectionIndicatorToneClassName = isSelected
    ? "border-primary bg-primary text-white shadow-sm"
    : isSelectable
      ? "border-slate-300 bg-white text-transparent"
      : "border-slate-200 bg-slate-100 text-transparent";

  const statusIcon = (
    <>
      <span
        className={`inline-flex h-4 w-4 items-center justify-center rounded-[var(--radius-xl)] border transition ${selectionIndicatorToneClassName}`}
        aria-hidden="true"
        title={selectLabel}
      >
        <CheckIcon className="h-3 w-3" strokeWidth={2.2} />
      </span>
      {processedByAI ? (
        <span
          className="expense-ticket-card__status-icon expense-ticket-card__status-icon--ai"
          role="img"
          aria-label={processedByAiLabel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 18l4-12l4 12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 13h4" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 6h6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 6v12" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 18h6" />
          </svg>
        </span>
      ) : null}
    </>
  );

  return (
    <div
      className={isSelected ? "timeline-item rounded-2xl ring-2 ring-primary/30" : "timeline-item"}
      data-ticket-file-id={fileId || undefined}
      data-ticket-selected={isSelected ? "true" : "false"}
      data-ticket-selectable={isSelectable && !interactionDisabled ? "true" : "false"}
    >
      <ExpenseTimelineCard
        dateParts={dateParts}
        title={title}
        subtitle={subtitle}
        amountText={amountText}
        onOpen={onOpenDetail}
        titleClassName="expense-ticket-card__title timeline-name"
        statusIcon={statusIcon}
        statusIconClassName="expense-ticket-card__status-icons"
        interactionProps={{
          tabIndex: interactionDisabled ? -1 : 0,
          "aria-label": title,
          "aria-pressed": isSelected,
          onPointerDown: tapGuard.onPointerDown,
          onPointerMove: tapGuard.onPointerMove,
          onPointerUp: tapGuard.onPointerUp,
          onPointerCancel: tapGuard.onPointerCancel,
          onContextMenu: (event) => {
            event.preventDefault();
          },
          onClick: (event) => {
            event.preventDefault();
          },
          onKeyDown: (event) => {
            if (interactionDisabled) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpenDetail();
            }
          },
        }}
      />
    </div>
  );
};

export default ExpenseTicketLinkTimelineItem;
