import React from "react";
import { indT } from "../../../../utils/indI18n.ts";
import { safeText } from "../../utils/expenseUiUtils.ts";

type ExpenseTicketStickyPreviewProps = {
  busy: boolean;
  error: string;
  imageUrl: string;
  imageAlt: string;
  fileName: string;
  onOpen: () => void;
};

// Renders one compact ticket preview that stays visible while detail content scrolls.
const ExpenseTicketStickyPreview = ({
  busy,
  error,
  imageUrl,
  imageAlt,
  fileName,
  onOpen,
}: ExpenseTicketStickyPreviewProps) => {
  const previewLabel = indT("Tickets_Detail_ViewAttachment", "Ver adjunto");
  const ticketLabel = indT("Tickets_Field_FileId", "Ticket");
  const safeFileName = safeText(fileName) || safeText(imageAlt) || ticketLabel;

  return (
    <div className="sticky top-[72px] z-[1800] lg:top-20">
      <button
        type="button"
        className="group block w-full touch-manipulation text-left focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-2"
        aria-label={`${previewLabel}: ${safeFileName}`}
        onClick={onOpen}
      >
        <div className="overflow-hidden rounded-[5px] border border-slate-200 bg-white shadow-xs transition-[transform,box-shadow,border-color] duration-200 group-hover:-translate-y-[1px] group-hover:border-primary/25 group-hover:shadow-md">
          <div className="relative h-36 overflow-hidden bg-linear-to-br from-slate-100 via-white to-slate-200 sm:h-40 lg:h-[380px]">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={imageAlt || ticketLabel}
                width={640}
                height={960}
                className="h-full w-full rounded-[5px] object-cover object-center transition-transform duration-300 group-hover:scale-[1.015] lg:object-contain lg:object-center lg:p-3"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-4">
                {busy ? (
                  <div className="flex items-center gap-2 text-sm text-slate-700">
                    <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
                      <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
                    </svg>
                    {indT("Common_Loading", "Loading")}
                  </div>
                ) : (
                  <div className="flex min-w-0 items-center gap-3 text-slate-700">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] bg-primary/8 text-primary">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M7 3.75h6.25L18.25 8.75V19.5a.75.75 0 0 1-.75.75H7a.75.75 0 0 1-.75-.75v-15A.75.75 0 0 1 7 3.75Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M13 3.75V8.5h4.75"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{safeFileName}</p>
                      <p className="line-clamp-2 text-xs text-slate-500">{error || previewLabel}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-linear-to-b from-slate-950/26 via-slate-900/8 to-transparent lg:h-20" />
            <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-[5px] bg-primary/92 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {previewLabel}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default ExpenseTicketStickyPreview;
