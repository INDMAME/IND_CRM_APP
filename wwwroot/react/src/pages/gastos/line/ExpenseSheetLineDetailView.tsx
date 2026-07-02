import React from "react";
import type { RefObject, ReactNode } from "react";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import PageBottomFixedContent from "../../../components/commons/PageBottomFixedContent.tsx";
import { indT } from "../../../utils/indI18n.ts";
import ExpenseTicketPreviewModal from "../tickets/detail/ExpenseTicketPreviewModal.tsx";
import ExpenseTicketStickyPreview from "../tickets/detail/ExpenseTicketStickyPreview.tsx";
import type { TicketPreviewPoint } from "../tickets/detail/useExpenseTicketImagePreview.ts";

type ExpenseSheetLineDetailViewProps = {
  modal: {
    open: boolean;
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    loadingText: string;
    showCancel: boolean;
    showConfirm: boolean;
    busy: boolean;
    error: string;
    status: string;
    onConfirm: () => void;
    onCancel: () => void;
  };
  preview: {
    open: boolean;
    busy: boolean;
    error: string;
    imageUrl: string;
    imageAlt: string;
    fileName: string;
    scale: number;
    translate: TicketPreviewPoint;
    surfaceRef: RefObject<HTMLDivElement | null>;
    showStickyPreview: boolean;
    onOpen: () => void;
    onClose: () => void;
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerEnd: (event: React.PointerEvent<HTMLDivElement>) => void;
  };
  content: {
    isLoading: boolean;
    isRedirectingAfterCreate: boolean;
    errorMessage: string;
    lineNavigator: ReactNode;
    detailBody: ReactNode;
  };
};

// Renders the line detail shell while the page container keeps ownership of orchestration and mutations.
const ExpenseSheetLineDetailView = ({ modal, preview, content }: ExpenseSheetLineDetailViewProps) => {
  const showLineNavigator = Boolean(content.detailBody && content.lineNavigator);

  return (
    <div className="space-y-2">
      <ConfirmModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
        loadingText={modal.loadingText}
        showCancel={modal.showCancel}
        showConfirm={modal.showConfirm}
        busy={modal.busy}
        error={modal.error}
        status={modal.status}
        onConfirm={modal.onConfirm}
        onCancel={modal.onCancel}
      />
      <ExpenseTicketPreviewModal
        open={preview.open}
        busy={preview.busy}
        error={preview.error}
        imageUrl={preview.imageUrl}
        imageAlt={preview.imageAlt}
        scale={preview.scale}
        translate={preview.translate}
        surfaceRef={preview.surfaceRef}
        onClose={preview.onClose}
        onPointerDown={preview.onPointerDown}
        onPointerMove={preview.onPointerMove}
        onPointerEnd={preview.onPointerEnd}
      />

      <div
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700"
        style={{ display: content.isLoading || content.isRedirectingAfterCreate ? "flex" : "none" }}
      >
        <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {indT("Common_Loading", "Loading")}
      </div>

      {content.errorMessage ? <div className="text-danger">{content.errorMessage}</div> : null}

      {content.detailBody ? (
        preview.showStickyPreview ? (
          <div className="min-w-0 max-w-full space-y-2 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4 lg:space-y-0">
            <div className="min-w-0 max-w-full lg:col-start-2">
              <ExpenseTicketStickyPreview
                busy={preview.busy}
                error={preview.error}
                imageUrl={preview.imageUrl}
                imageAlt={preview.imageAlt}
                fileName={preview.fileName}
                onOpen={preview.onOpen}
              />
            </div>
            <div className="min-w-0 space-y-2 lg:col-start-1 lg:row-start-1">{content.detailBody}</div>
          </div>
        ) : (
          content.detailBody
        )
      ) : null}

      {showLineNavigator ? <PageBottomFixedContent variant="compact">{content.lineNavigator}</PageBottomFixedContent> : null}
    </div>
  );
};

export default ExpenseSheetLineDetailView;
