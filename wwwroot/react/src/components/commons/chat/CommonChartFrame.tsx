import type { ReactNode } from "react";

type CommonChartFrameProps = {
  title?: string;
  subtitle?: string;
  emptyStateLabel?: string;
  hasData: boolean;
  children: ReactNode;
};

// Provides one reusable card shell for all supported chart components.
const CommonChartFrame = ({ title, subtitle, emptyStateLabel, hasData, children }: CommonChartFrameProps) => {
  return (
    <section className="w-[min(100vw-7rem,28rem)] max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {title || subtitle ? (
        <header className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          {title ? <h3 className="text-sm font-semibold text-slate-900">{title}</h3> : null}
          {subtitle ? <p className="mt-1 text-xs leading-5 text-slate-600">{subtitle}</p> : null}
        </header>
      ) : null}

      <div className="px-3 py-3">
        {hasData ? (
          <div className="h-72 w-full">{children}</div>
        ) : (
          <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 text-center text-sm text-slate-500">
            {emptyStateLabel || "No hay datos suficientes para mostrar esta visualizacion."}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommonChartFrame;
