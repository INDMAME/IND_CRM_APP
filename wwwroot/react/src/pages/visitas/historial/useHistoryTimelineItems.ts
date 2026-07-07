import React, { useMemo, useRef } from "react";
import type { TimelineItem } from "./HistoryTable.tsx";

type ActivityRecord = Record<string, unknown>;

type UseHistoryTimelineItemsArgs = {
  items: ActivityRecord[];
  locale: string;
  noDataText: string;
  logHistory: (message: string, data?: Record<string, unknown>) => void;
  toTitleCase: (value: string, locale: string) => string;
  formatDateParts: (value: string, locale: string) => { year: string; month: string; day: string };
};

const EMPTY_DESCRIPTION_LABELS = new Set(["sin datos", "no data"]);

const hasRealDescription = (value: string, noDataText: string): boolean => {
  const normalizedValue = value.trim().toLocaleLowerCase();
  if (!normalizedValue) return false;

  const normalizedNoDataText = noDataText.trim().toLocaleLowerCase();
  return normalizedValue !== normalizedNoDataText && !EMPTY_DESCRIPTION_LABELS.has(normalizedValue);
};

// Maps raw history payload items into timeline cards used by HistoryTable.
export const useHistoryTimelineItems = ({
  items,
  locale,
  noDataText,
  logHistory,
  toTitleCase,
  formatDateParts,
}: UseHistoryTimelineItemsArgs) => {
  const debugLoggedRef = useRef(0);

  const timelineItems: TimelineItem[] = useMemo(() => {
    return items.map((entry) => {
      const actividadIdRaw = (entry.actividadId ?? entry.ActividadId ?? "").toString().trim();
      const actividadId = actividadIdRaw || "";
      const recIdRaw = entry.recId ?? entry.RecId ?? "";
      const recId = recIdRaw && !Number.isNaN(Number(recIdRaw)) ? Number(recIdRaw) : null;
      let linkId = actividadId || (recId ? recId.toString() : "");

      if (debugLoggedRef.current < 5) {
        logHistory("activity item", { actividadId, recIdRaw, recId });
        debugLoggedRef.current += 1;
      }

      const rawName = (entry.name ?? entry.Name ?? "").toString().trim();
      const fullName = toTitleCase(rawName, locale);
      const fecha = (entry.transDate ?? entry.TransDate ?? "").toString();
      const rawDesc = (entry.description ?? entry.Description ?? "").toString().trim();
      const hasDescription = hasRealDescription(rawDesc, noDataText);
      const fullDesc = hasDescription ? rawDesc : "";

      const isNoDataCard = !rawName && !hasDescription;
      if (isNoDataCard) {
        linkId = "";
      }

      return {
        id: linkId,
        actividadId,
        recId,
        name: fullName,
        description: hasDescription ? fullDesc : isNoDataCard ? noDataText : "",
        fullName,
        fullDesc,
        hasDescription,
        dateParts: formatDateParts(fecha, locale),
        isNoData: isNoDataCard,
      };
    });
  }, [formatDateParts, items, locale, logHistory, noDataText, toTitleCase]);

  return { timelineItems };
};
