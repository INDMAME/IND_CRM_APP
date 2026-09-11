import React from "react";
import {
  BanknotesIcon,
  DocumentTextIcon,
  MapIcon,
  Squares2X2Icon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "../../../utils/classNames.ts";

type ExpenseTypeIconProps = {
  typeCode?: number | null;
  className?: string;
};

const STANDARD_TYPE_ICONS: Partial<Record<number, typeof DocumentTextIcon>> = {
  1: TicketIcon,
  3: MapIcon,
  8: Squares2X2Icon,
  19: BanknotesIcon,
};

// These local outlines cover symbols missing from the installed Heroicons set.
const CUSTOM_ICON_PATHS = {
  parking: [
    "M6 3.75h12A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75Z",
    "M9 16.5v-9h3a3 3 0 0 1 0 6H9",
  ],
  cup: [
    "M4 8h12v6a6 6 0 0 1-12 0V8Z",
    "M16 9h2a3 3 0 0 1 0 6h-2M7 3v2m5-2v2M3 21h15",
  ],
  cutlery: [
    "M3.75 3v5.25A2.25 2.25 0 0 0 6 10.5a2.25 2.25 0 0 0 2.25-2.25V3M6 3v18",
    "M17.25 3c-3 3-3 6-3 9h3V3Zm0 9v9",
  ],
  bed: [
    "M3 6v15m18-7v7M3 18h18",
    "M3 14h18v-2a3 3 0 0 0-3-3h-6v5",
    "M6 10h3v4H6z",
  ],
  taxi: [
    "M5.25 12 7.5 6.75h9L18.75 12M9.75 6.75V4.5h4.5v2.25",
    "M5.25 12h13.5A2.25 2.25 0 0 1 21 14.25v3H3v-3A2.25 2.25 0 0 1 5.25 12Z",
    "M5.25 17.25v3m13.5-3v3M6.75 14.25h1.5m7.5 0h1.5",
  ],
  fuel: [
    "M4.5 21V5.25A2.25 2.25 0 0 1 6.75 3h4.5a2.25 2.25 0 0 1 2.25 2.25V21M3 21h12",
    "M7.5 6.75h3v4.5h-3z",
    "M13.5 12H15a2.25 2.25 0 0 1 2.25 2.25v3a1.875 1.875 0 0 0 3.75 0v-9l-3-3m1.5 1.5H21v3h-1.5v-3Z",
  ],
} as const;

const CUSTOM_TYPE_ICONS: Partial<Record<number, keyof typeof CUSTOM_ICON_PATHS>> = {
  2: "parking",
  4: "cup",
  5: "cutlery",
  6: "cutlery",
  7: "bed",
  14: "taxi",
  20: "fuel",
};

// Shows a decorative expense symbol without changing the supplied category.
const ExpenseTypeIcon = ({ typeCode, className }: ExpenseTypeIconProps) => {
  const code = typeof typeCode === "number" && Number.isInteger(typeCode) ? typeCode : 0;
  const customIcon = CUSTOM_TYPE_ICONS[code];
  const iconClassName = classNames("h-6 w-6 shrink-0", className);

  if (!customIcon) {
    const Icon = STANDARD_TYPE_ICONS[code] || DocumentTextIcon;
    return <Icon className={iconClassName} strokeWidth={1.5} aria-hidden="true" focusable="false" />;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={iconClassName}
      aria-hidden="true"
      focusable="false"
    >
      {CUSTOM_ICON_PATHS[customIcon].map((path) => <path key={path} d={path} />)}
    </svg>
  );
};

export default ExpenseTypeIcon;
