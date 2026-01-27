import React from "react";
import { indT } from "../../utils/indI18n.ts";

type Props = {
  size?: string;
  label?: string;
};

const Spinner = ({ size = "h-4 w-4", label }: Props) => (
  <svg className={`ind-spinner ${size}`} viewBox="0 0 20 20" role="status" aria-label={label || indT("Common_Loading", "Loading")}>
    <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
  </svg>
);

export default Spinner;
