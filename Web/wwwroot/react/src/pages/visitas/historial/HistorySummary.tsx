import React from "react";

type Props = {
  summaryFromLabel: string;
  summaryToLabel: string;
  fromValue: string;
  toValue: string;
  className?: string;
  clientLabel?: string;
  clientValue?: string;
  showClient?: boolean;
  ownerLabel?: string;
  ownerValue?: string;
  showOwner?: boolean;
};

// Renders the reusable date summary block for history filters.
const HistorySummary = ({
  summaryFromLabel,
  summaryToLabel,
  fromValue,
  toValue,
  className = "",
  clientLabel = "",
  clientValue = "",
  showClient = false,
  ownerLabel = "",
  ownerValue = "",
  showOwner = false,
}: Props) => {
  return (
    <>
      <div className={`history-filter-summary flex flex-wrap items-center gap-x-3 gap-y-2 text-xs ${className}`.trim()}>
        <span className="font-semibold">{summaryFromLabel}:</span>
        <span>{fromValue}</span>
        <span className="font-semibold">{summaryToLabel}:</span>
        <span>{toValue}</span>
      </div>
      {showClient && clientValue ? (
        <div className="history-filter-summary mt-1.5 flex items-center gap-2 text-xs min-w-0">
          <span className="font-semibold shrink-0">{clientLabel}:</span>
          <span className="min-w-0 flex-1 truncate">{clientValue}</span>
        </div>
      ) : null}
      {showOwner && ownerValue ? (
        <div className="history-filter-summary mt-1.5 flex items-center gap-2 text-xs min-w-0">
          <span className="font-semibold shrink-0">{ownerLabel}:</span>
          <span className="min-w-0 flex-1 truncate">{ownerValue}</span>
        </div>
      ) : null}
    </>
  );
};

export default HistorySummary;
