import { useMemo } from "react";
import { indT } from "../../../utils/indI18n.ts";

const toSentenceCase = (value: string, locale: string) => {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const lower = trimmed.toLocaleLowerCase(locale);
  return lower[0].toLocaleUpperCase(locale) + lower.slice(1);
};

// Groups localized history labels and fixed option lists for the page.
export const useHistoryLabels = (locale: string) => {
  const labelFrom = toSentenceCase(indT("History_From", "From"), locale);
  const labelTo = toSentenceCase(indT("History_To", "To"), locale);
  const quickCustomLabel = indT("History_Quick_Custom", "Date");
  const quick7DaysLabel = indT("History_Quick_7Days", "7 days");
  const quick30DaysLabel = indT("History_Quick_30Days", "30 days");
  const quick90DaysLabel = indT("History_Quick_90Days", "90 days");
  const pageFirstLabel = indT("History_Page_First", "First");
  const pagePrevLabel = indT("History_Page_Prev", "Previous");
  const pageNextLabel = indT("History_Page_Next", "Next");
  const pageLastLabel = indT("History_Page_Last", "Last");

  const weekDayLabels = useMemo(
    () => [
      indT("History_Day_Mon", "Mon"),
      indT("History_Day_Tue", "Tue"),
      indT("History_Day_Wed", "Wed"),
      indT("History_Day_Thu", "Thu"),
      indT("History_Day_Fri", "Fri"),
      indT("History_Day_Sat", "Sat"),
      indT("History_Day_Sun", "Sun"),
    ],
    []
  );

  const quickFilters = useMemo(
    () => [
      { id: "custom" as const, label: quickCustomLabel },
      { id: "days-7" as const, label: quick7DaysLabel },
      { id: "days-30" as const, label: quick30DaysLabel },
      { id: "days-90" as const, label: quick90DaysLabel },
    ],
    [quick30DaysLabel, quick7DaysLabel, quick90DaysLabel, quickCustomLabel]
  );

  const paginationLabels = useMemo(
    () => ({
      first: pageFirstLabel,
      prev: pagePrevLabel,
      next: pageNextLabel,
      last: pageLastLabel,
    }),
    [pageFirstLabel, pageLastLabel, pageNextLabel, pagePrevLabel]
  );

  return {
    labelFrom,
    labelTo,
    summaryFrom: labelFrom,
    summaryTo: labelTo,
    filterTitle: indT("History_Filter_Date", "Date"),
    addDateLabel: indT("History_AddDate", "Add date"),
    clearRangeLabel: indT("History_ClearRange", "Clear range"),
    prevMonthLabel: indT("History_PrevMonth", "Previous month"),
    nextMonthLabel: indT("History_NextMonth", "Next month"),
    statusSelectStartLabel: indT("History_Status_SelectStart", "Select start date"),
    statusSelectEndLabel: indT("History_Status_SelectEnd", "Select end date"),
    clearLabel: indT("History_Filter_Clear", "Clear"),
    applyLabel: indT("History_Filter_Apply", "Apply"),
    clientLabel: indT("History_Filter_Client", "Account"),
    ownerLabel: indT("History_Filter_Owner", "Owner"),
    ownerAllLabel: indT("History_Filter_Owner_All", "All visible users"),
    ownerNoUsersLabel: indT("History_Filter_Owner_None", "No visible users"),
    ownerLoadingLabel: indT("History_Filter_Owner_Loading", "Loading visible users"),
    loadingLabel: indT("History_Loading", "Loading"),
    noVisitsInRangeLabel: indT("History_NoDataInRange", "No visits in this range"),
    createLabel: indT("Common_Create", "Create"),
    weekDayLabels,
    quickFilters,
    paginationLabels,
  };
};
