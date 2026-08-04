import React from "react";
import { HELP_RESPONSE_LOCALES, type HelpResponseLocale } from "./helpTypes.ts";

type HomeHelpLocaleSelectProps = {
  label: string;
  value: HelpResponseLocale;
  optionLabels: Record<HelpResponseLocale, string>;
  readOnly?: boolean;
  onChange: (value: HelpResponseLocale) => void;
};

// Provides the fixed response-language enum used by the Home assistant.
const HomeHelpLocaleSelect = ({
  label,
  value,
  optionLabels,
  readOnly = false,
  onChange,
}: HomeHelpLocaleSelectProps) => {
  return (
    <label className="relative block min-w-0">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        disabled={readOnly}
        aria-label={label}
        className="h-7 max-w-[112px] rounded-[var(--radius-xl)] border border-slate-200 bg-white px-2 text-[11px] font-semibold text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/25 disabled:cursor-not-allowed disabled:text-slate-400"
        onChange={(event) => onChange(event.target.value as HelpResponseLocale)}
      >
        {HELP_RESPONSE_LOCALES.map((locale) => (
          <option key={locale} value={locale}>
            {optionLabels[locale]}
          </option>
        ))}
      </select>
    </label>
  );
};

export default HomeHelpLocaleSelect;
