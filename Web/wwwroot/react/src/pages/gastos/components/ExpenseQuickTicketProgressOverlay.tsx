import React from "react";
import Spinner from "../../../components/commons/Spinner.tsx";
import { indT } from "../../../utils/indI18n.ts";

type ProgressStage = {
  key: string;
  title: string;
  description: string;
  state: "completed" | "active" | "pending";
};

type ExpenseQuickTicketProgressOverlayProps = {
  open: boolean;
  title?: string;
  summary?: string;
  elapsedMs?: number;
  stages?: ProgressStage[];
};

const formatElapsedLabel = (elapsedMs: number): string => {
  const safeElapsedMs = Number.isFinite(elapsedMs) && elapsedMs > 0 ? elapsedMs : 0;
  const totalSeconds = Math.floor(safeElapsedMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const resolveStageBadge = (stage: ProgressStage) => {
  if (stage.state === "completed") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2">
          <path d="M5 10.5 8.5 14 15 6.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }

  if (stage.state === "active") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 text-sky-700" aria-hidden="true">
        <Spinner size="h-4 w-4" label={indT("Common_Loading", "Loading")} />
      </span>
    );
  }

  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400"
      aria-hidden="true"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
    </span>
  );
};

// Shows one staged progress overlay while the composite quick-ticket request is in flight.
const ExpenseQuickTicketProgressOverlay = ({
  open,
  title,
  summary,
  elapsedMs = 0,
  stages = [],
}: ExpenseQuickTicketProgressOverlayProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/40 px-4 py-6">
      <div className="glass-panel shadow-card w-full max-w-lg rounded-[28px] border border-slate-200 bg-white/95 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
            <Spinner size="h-6 w-6" label={indT("Common_Loading", "Loading")} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-slate-900">
              {title || indT("ExpenseSheets_NewTicket_Progress_Title", "Processing ticket")}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {summary || indT("ExpenseSheets_NewTicket_Status_CreatingTicket", "Creating ticket...")}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
              <span>{indT("ExpenseSheets_NewTicket_Progress_Elapsed", "Elapsed time")}</span>
              <span className="font-mono text-[12px] text-slate-700">{formatElapsedLabel(elapsedMs)}</span>
            </div>
          </div>
        </div>

        {stages.length > 0 ? (
          <div className="mt-5 space-y-3">
            {stages.map((stage) => (
              <div
                key={stage.key}
                className={
                  stage.state === "active"
                    ? "rounded-2xl border border-sky-200 bg-sky-50/80 px-3 py-3"
                    : stage.state === "completed"
                      ? "rounded-2xl border border-emerald-200 bg-emerald-50/70 px-3 py-3"
                      : "rounded-2xl border border-slate-200 bg-white px-3 py-3"
                }
              >
                <div className="flex items-start gap-3">
                  {resolveStageBadge(stage)}
                  <div className="min-w-0 flex-1">
                    <p
                      className={
                        stage.state === "pending"
                          ? "text-sm font-medium text-slate-600"
                          : "text-sm font-semibold text-slate-900"
                      }
                    >
                      {stage.title}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">{stage.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ExpenseQuickTicketProgressOverlay;
