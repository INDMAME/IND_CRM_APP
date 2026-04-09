import type { ReactNode } from "react";

type CommonChartFrameProps = {
  title?: string;
  subtitle?: string;
  emptyStateLabel?: string;
  hasData: boolean;
  children: ReactNode;
  footer?: ReactNode;
};

// Provides one reusable card shell for all supported chart components.
const CommonChartFrame = ({ title, subtitle, emptyStateLabel, hasData, children, footer }: CommonChartFrameProps) => {
  return (
    <section className="w-full max-w-full rounded-[var(--radius-xl)] border border-slate-200 bg-white shadow-sm">
      {title || subtitle ? (
        <header className="border-b border-slate-200 bg-slate-50 px-3 py-2.5">
          {title ? <h3 className="text-[12px] font-semibold leading-5 text-slate-900">{title}</h3> : null}
          {subtitle ? <p className="mt-1 text-[12px] leading-5 text-slate-600">{subtitle}</p> : null}
        </header>
      ) : null}

      <div className="px-2 py-2.5 sm:px-3">
        {hasData ? (
          <div className="min-h-[272px] w-full min-w-0 overflow-visible">{children}</div>
        ) : (
          <div className="flex h-48 items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-slate-200 bg-slate-50 px-4 text-center text-[12px] leading-5 text-slate-500">
            {emptyStateLabel || "No hay datos suficientes para mostrar esta visualizacion."}
          </div>
        )}
      </div>
      {hasData && footer ? <div className="border-t border-slate-100 px-3 py-2">{footer}</div> : null}
    </section>
  );
};

export default CommonChartFrame;
