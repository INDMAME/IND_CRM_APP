import React, { useEffect, useState } from "react";

type ExpenseCurrencyFlagIconProps = {
  currencyCode: string;
  className?: string;
};

const normalizeCurrencyCode = (value: string | number | null | undefined): string => {
  return String(value || "").trim().toUpperCase();
};

// Renders a currency flag from local assets with a stable fallback icon.
const ExpenseCurrencyFlagIcon = ({ currencyCode, className = "" }: ExpenseCurrencyFlagIconProps) => {
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [normalizedCode]);

  if (!normalizedCode || loadFailed) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex h-4 w-4 items-center justify-center rounded-[3px] border border-slate-200 bg-slate-100 text-[9px] font-semibold text-slate-500 ${className}`.trim()}
      >
        $
      </span>
    );
  }

  return (
    <img
      src={`/assets/flags/${encodeURIComponent(normalizedCode)}.svg`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`h-4 w-4 rounded-[3px] border border-slate-200 bg-white object-contain ${className}`.trim()}
      onError={() => setLoadFailed(true)}
    />
  );
};

export default ExpenseCurrencyFlagIcon;
