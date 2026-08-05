import React from "react";
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
  onSelect: (moduleId: string) => void;
};

type HomeHelpModuleSummaryProps = {
  variant: "summary";
  label: string;
};

type HomeHelpModuleSelectorProps = HomeHelpModuleChoicesProps | HomeHelpModuleSummaryProps;

// Renders either the global module choices or the locked conversation module summary.
const HomeHelpModuleSelector = (props: HomeHelpModuleSelectorProps) => {
  if (props.variant === "summary") {
    return <p className="text-[11px] font-semibold leading-4 text-primary">{props.label}</p>;
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
      {props.modules.map((module) => {
        const selected = module.id === props.selectedModuleId;
        return (
          <button
            key={module.id}
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
