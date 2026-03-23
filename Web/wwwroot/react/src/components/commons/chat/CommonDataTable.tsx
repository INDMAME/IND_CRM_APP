import type { TablePayload } from "./chatMessageContract.ts";

type CommonDataTableProps = {
  payload: TablePayload;
};

const ALIGNMENT_CLASS_MAP = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

const renderCellValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "-";
  return String(value);
};

// Renders a reusable table without domain-specific formatting rules.
const CommonDataTable = ({ payload }: CommonDataTableProps) => {
  const hasRows = Array.isArray(payload.rows) && payload.rows.length > 0;

  return (
    <section className="w-full max-w-full overflow-hidden rounded-[var(--radius-xl)] border border-slate-200 bg-white shadow-sm">
      {payload.title || payload.subtitle ? (
        <header className="border-b border-slate-200 bg-slate-50 px-4 py-3">
          {payload.title ? <h3 className="text-[12px] font-semibold leading-5 text-slate-900">{payload.title}</h3> : null}
          {payload.subtitle ? <p className="mt-1 text-[12px] leading-5 text-slate-600">{payload.subtitle}</p> : null}
        </header>
      ) : null}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-[12px] leading-5 text-slate-700">
          <thead className="bg-slate-50 text-[12px] uppercase tracking-[0.08em] text-slate-500">
            <tr>
              {payload.columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`border-b border-slate-200 px-4 py-3 font-semibold ${ALIGNMENT_CLASS_MAP[column.align || "left"]}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hasRows ? (
              payload.rows.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`} className="odd:bg-white even:bg-slate-50/60">
                  {payload.columns.map((column) => (
                    <td
                      key={`${rowIndex}-${column.key}`}
                      className={`border-b border-slate-100 px-4 py-3 align-top ${ALIGNMENT_CLASS_MAP[column.align || "left"]}`}
                    >
                      {renderCellValue(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={Math.max(payload.columns.length, 1)}
                  className="px-4 py-8 text-center text-[12px] leading-5 text-slate-500"
                >
                  {payload.emptyStateLabel || "No hay filas disponibles para mostrar."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CommonDataTable;
