import React from "react";
import { createPortal } from "react-dom";
import { indT } from "../../../../utils/indI18n.ts";
import type { TicketPreviewPoint } from "./useExpenseTicketImagePreview.ts";

type ExpenseTicketPreviewModalProps = {
  open: boolean;
  busy: boolean;
  error: string;
  imageUrl: string;
  imageAlt: string;
  scale: number;
  translate: TicketPreviewPoint;
  surfaceRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
  onPointerEnd: (event: React.PointerEvent<HTMLDivElement>) => void;
  onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
};

// Renders the ticket image preview overlay with zoom and pan gestures.
const ExpenseTicketPreviewModal = ({
  open,
  busy,
  error,
  imageUrl,
  imageAlt,
  scale,
  translate,
  surfaceRef,
  onClose,
  onPointerDown,
  onPointerMove,
  onPointerEnd,
  onWheel,
}: ExpenseTicketPreviewModalProps) => {
  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-600000 flex items-center justify-center overscroll-contain bg-slate-950/45 px-4 py-6 backdrop-blur-md">
      <button
        type="button"
        aria-label={indT("Common_Close", "Close")}
        className="absolute inset-0"
        onClick={onClose}
      />
      <button
        type="button"
        aria-label={indT("Common_Close", "Close")}
        className="fixed right-4 top-[calc(1rem+env(safe-area-inset-top,0px))] z-[600020] inline-flex h-10 w-10 items-center justify-center rounded-[5px] border border-slate-200/60 bg-slate-900/78 text-slate-100 shadow-lg transition hover:bg-slate-900/88 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-slate-200/80"
        onClick={onClose}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M6 6L18 18M18 6L6 18"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="relative flex max-h-[92vh] max-w-[92vw] items-center justify-center overscroll-contain">
        {busy ? (
          <div className="flex items-center gap-2 text-sm text-slate-100">
            <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
              <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
            </svg>
            {indT("Common_Loading", "Loading")}
          </div>
        ) : error ? (
          <p className="text-sm text-rose-200">{error}</p>
        ) : imageUrl ? (
          <div
            ref={surfaceRef}
            className="relative max-h-[90vh] max-w-[92vw] overflow-hidden rounded-[5px] touch-none overscroll-contain"
            role="presentation"
            style={{ touchAction: "none" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onWheel={onWheel}
          >
            <img
              src={imageUrl}
              alt={imageAlt || indT("Tickets_Field_FileId", "Ticket")}
              className="pointer-events-none max-h-[90vh] w-auto max-w-[92vw] select-none rounded-[5px] object-contain shadow-2xl"
              style={{
                transform: `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
                transformOrigin: "center center",
                transition: scale <= 1 ? "transform 140ms ease-out" : "none",
              }}
              draggable={false}
            />
          </div>
        ) : (
          <p className="text-sm text-slate-100">{indT("Common_NotAvailable", "N/A")}</p>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ExpenseTicketPreviewModal;
