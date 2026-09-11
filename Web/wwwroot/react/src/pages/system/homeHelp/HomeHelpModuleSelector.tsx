import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import type { HelpModule } from "./helpTypes.ts";
import type { HomeHelpCatalogState } from "./useHomeHelpModuleCatalog.ts";

type HomeHelpModuleChoicesProps = {
  variant: "choices";
  modules: HelpModule[];
  catalogState: HomeHelpCatalogState;
  selectedModuleId: string;
  ariaLabel: string;
  loadingLabel: string;
  errorLabel: string;
  emptyLabel: string;
  firstOptionRef: React.RefObject<HTMLButtonElement | null>;
  onSelect: (moduleId: string) => void;
};

type HomeHelpModuleSummaryProps = {
  variant: "summary";
  label: string;
  backAriaLabel: string;
  onBack: () => void;
};

type HomeHelpModuleSelectorProps = HomeHelpModuleChoicesProps | HomeHelpModuleSummaryProps;

// Renders either the global module choices or the locked conversation module summary.
const HomeHelpModuleSelector = (props: HomeHelpModuleSelectorProps) => {
  if (props.variant === "summary") {
    return (
      <div className="flex items-center justify-between gap-2">
        <p className="min-w-0 flex-1 text-[11px] font-semibold leading-4 text-primary">{props.label}</p>
        <button
          type="button"
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-xl)] border border-primary/15 bg-white text-primary transition hover:border-primary/30 hover:bg-primary/5 focus:outline-hidden focus:ring-2 focus:ring-primary/25"
          aria-label={props.backAriaLabel}
          title={props.backAriaLabel}
          onClick={props.onBack}
        >
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  if (props.catalogState === "loading" || props.catalogState === "idle") {
    return (
      <p className="py-3 text-center text-[11px] text-slate-500" role="status" aria-live="polite">
        {props.loadingLabel}
      </p>
    );
  }

  if (props.catalogState === "error") {
    return (
      <p className="rounded-[var(--radius-xl)] border border-rose-200 bg-rose-50 px-3 py-2 text-left text-[11px] leading-4 text-rose-800" role="alert">
        {props.errorLabel}
      </p>
    );
  }

  if (props.modules.length === 0) {
    return <p className="py-3 text-center text-[11px] text-slate-500">{props.emptyLabel}</p>;
  }

  return (
    <div className="w-full space-y-1.5" role="group" aria-label={props.ariaLabel}>
      {props.modules.map((module, index) => {
        const selected = module.id === props.selectedModuleId;
        return (
          <button
            key={module.id}
            ref={index === 0 ? props.firstOptionRef : undefined}
            type="button"
            aria-pressed={selected}
            className={`block w-full rounded-[var(--radius-xl)] border px-3 py-2 text-left text-[11px] font-semibold leading-4 transition focus:outline-hidden focus:ring-2 focus:ring-primary/20 ${
              selected
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-slate-200 bg-white text-slate-700 hover:border-primary/20 hover:bg-primary/5 hover:text-primary"
            }`}
            onClick={() => props.onSelect(module.id)}
          >
            {module.title}
          </button>
        );
      })}
    </div>
  );
};

export default HomeHelpModuleSelector;
