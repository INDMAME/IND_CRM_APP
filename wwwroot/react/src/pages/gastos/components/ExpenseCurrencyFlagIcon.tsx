import React, { useEffect, useState } from "react";

type ExpenseCurrencyFlagIconProps = {
  currencyCode: string;
  className?: string;
  sizeClassName?: string;
};

const normalizeCurrencyCode = (value: string | number | null | undefined): string => {
  return String(value || "").trim().toUpperCase();
};

// Renders a currency flag from local assets with a stable fallback icon.
const ExpenseCurrencyFlagIcon = ({ currencyCode, className = "", sizeClassName = "h-4 w-4" }: ExpenseCurrencyFlagIconProps) => {
  const normalizedCode = normalizeCurrencyCode(currencyCode);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    setLoadFailed(false);
  }, [normalizedCode]);

  if (!normalizedCode || loadFailed) {
    return (
      <span
        aria-hidden="true"
        className={`inline-flex items-center justify-center rounded-lg text-[10px] font-semibold leading-none text-slate-500 ${sizeClassName} ${className}`.trim()}
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
      className={`${sizeClassName} rounded-lg object-contain ${className}`.trim()}
      onError={() => setLoadFailed(true)}
    />
  );
};

export default ExpenseCurrencyFlagIcon;
