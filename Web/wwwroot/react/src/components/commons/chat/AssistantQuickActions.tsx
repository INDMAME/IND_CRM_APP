import React from "react";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../../utils/classNames.ts";
import type { AssistantChatQuickAction } from "./assistantChatTypes.ts";

export type AssistantQuickActionsLayout = "inline" | "stacked";

type AssistantQuickActionsProps<TActionId extends string = string> = {
  actions: AssistantChatQuickAction<TActionId>[];
  disabled: boolean;
  layout?: AssistantQuickActionsLayout;
  onSelect: (question: string) => void;
};

// Renders assistant suggestions with an explicit inline or stacked layout.
const AssistantQuickActions = <TActionId extends string = string,>({
  actions,
  disabled,
  layout = "inline",
  onSelect,
}: AssistantQuickActionsProps<TActionId>) => {
  const isStacked = layout === "stacked";

  return (
    <div className={classNames("mb-2.5 flex gap-1.5", isStacked ? "flex-col" : "whitespace-nowrap")}>
      {actions.map((action) => {
        const Icon = action.icon || SparklesIcon;
        return (
          <button
            key={action.id}
            type="button"
            disabled={disabled}
            className={classNames(
              "inline-flex min-w-0 items-center justify-start gap-1 rounded-[var(--radius-xl)] border border-slate-200 bg-slate-100 py-1.5 pl-1.5 pr-2 text-[12px] font-semibold text-slate-600 transition hover:border-primary/20 hover:bg-slate-50 hover:text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
              isStacked ? "w-full" : "flex-1"
            )}
            onClick={() => onSelect(action.question)}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span
              className={classNames(
                "min-w-0 tracking-[-0.01em]",
                isStacked ? "whitespace-normal break-words text-left leading-4" : "truncate"
              )}
            >
              {action.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default AssistantQuickActions;
