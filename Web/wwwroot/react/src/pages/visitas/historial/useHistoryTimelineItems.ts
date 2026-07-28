import React, { useMemo, useRef } from "react";
import { formatUserNameWithId } from "../../../utils/userLabels.ts";
import {
  getVisibleUserForOwner,
  type ModuleDataVisibilityVisibleUser,
} from "../../../utils/moduleDataVisibility.ts";
import type { TimelineItem } from "./HistoryTable.tsx";

type ActivityRecord = Record<string, unknown>;

type UseHistoryTimelineItemsArgs = {
  items: ActivityRecord[];
  locale: string;
  noDataText: string;
  showOwner: boolean;
  visibleUsersByOwnerAxUserId: ReadonlyMap<string, ModuleDataVisibilityVisibleUser>;
  logHistory: (message: string, data?: Record<string, unknown>) => void;
  toTitleCase: (value: string, locale: string) => string;
  formatDateParts: (value: string, locale: string) => { year: string; month: string; day: string };
};

const EMPTY_DESCRIPTION_LABELS = new Set(["sin datos", "no data"]);

// Reads the first non-empty activity field across current and legacy payload names.
const firstActivityText = (...values: unknown[]): string => {
  for (const value of values) {
    const text = String(value ?? "").trim();
    if (text) return text;
  }

  return "";
};

// Formats the visit owner with the shared compact name and AX id label.
export const resolveHistoryOwnerText = (
  entry: ActivityRecord,
  showOwner: boolean,
  visibleUsersByOwnerAxUserId?: ReadonlyMap<string, ModuleDataVisibilityVisibleUser>
): string => {
  if (!showOwner) return "";

  const ownerAxUserId = firstActivityText(
    entry.ownerAxUserId,
    entry.OwnerAxUserId,
    entry.indCreatedByUserId,
    entry.INDCreatedByUserId,
    entry.createdByUserId,
    entry.CreatedByUserId,
    entry.userId,
    entry.UserId
  );
  const visibleOwner = visibleUsersByOwnerAxUserId
    ? getVisibleUserForOwner(visibleUsersByOwnerAxUserId, ownerAxUserId)
    : null;
  const rawOwnerName = firstActivityText(entry.ownerName, entry.OwnerName);
  const visibleOwnerName = firstActivityText(visibleOwner?.name);
  const normalizedOwnerAxUserId = ownerAxUserId.toUpperCase();
  const rawDistinctName = rawOwnerName.toUpperCase() !== normalizedOwnerAxUserId
    ? rawOwnerName
    : "";
  const visibleDistinctName = visibleOwnerName.toUpperCase() !== normalizedOwnerAxUserId
    ? visibleOwnerName
    : "";
  const ownerName = firstActivityText(
    rawDistinctName,
    visibleDistinctName,
    entry.ownerAlias,
    entry.OwnerAlias,
    rawOwnerName,
    visibleOwnerName
  );
  const resolvedOwnerAxUserId = firstActivityText(ownerAxUserId, visibleOwner?.axUserId);

  return formatUserNameWithId(ownerName, resolvedOwnerAxUserId);
};

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
  showOwner,
  visibleUsersByOwnerAxUserId,
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
      const ownerText = resolveHistoryOwnerText(entry, showOwner, visibleUsersByOwnerAxUserId);

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
        ownerText,
        hasDescription,
        dateParts: formatDateParts(fecha, locale),
        isNoData: isNoDataCard,
      };
    });
  }, [
    formatDateParts,
    items,
    locale,
    logHistory,
    noDataText,
    showOwner,
    toTitleCase,
    visibleUsersByOwnerAxUserId,
  ]);

  return { timelineItems };
};
