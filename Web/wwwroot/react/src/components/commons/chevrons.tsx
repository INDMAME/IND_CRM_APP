import React from "react";

// Shared field action classes keep every select chevron on the same visual axis.
export const SELECT_FIELD_ACTIONS_CLASS_NAME = "absolute inset-y-0 right-0 flex items-center gap-1 pr-2";
export const SELECT_FIELD_ACTION_BUTTON_CLASS_NAME = "flex items-center justify-center p-1.5";
const SELECT_CHEVRON_ICON_CLASS_NAME = "h-5 w-5 shrink-0";

const ChevronDownSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={SELECT_CHEVRON_ICON_CLASS_NAME}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  );
};

const ChevronUpSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={SELECT_CHEVRON_ICON_CLASS_NAME}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  );
};

type SelectChevronProps = {
  open: boolean;
};

// Renders the fixed large indicator used by every select-like field.
export const SelectChevron = ({ open }: SelectChevronProps) => {
  return open ? <ChevronUpSvg /> : <ChevronDownSvg />;
};

