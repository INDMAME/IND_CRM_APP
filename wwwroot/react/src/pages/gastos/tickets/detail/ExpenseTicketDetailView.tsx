import React from "react";
import type { RefObject } from "react";
import ConfirmModal from "../../../../components/commons/ConfirmModal.tsx";
import { indT } from "../../../../utils/indI18n.ts";
import ExpenseTicketDetailHeaderForm from "../../components/ExpenseTicketDetailHeaderForm.tsx";
import ExpenseTicketLinesList from "../../components/ExpenseTicketLinesList.tsx";
import type { ExpenseTicketDetailHeader, ExpenseTicketDetailLine } from "./expenseTicketDetailTypes.ts";
import ExpenseTicketPreviewModal from "./ExpenseTicketPreviewModal.tsx";
import ExpenseTicketStickyPreview from "./ExpenseTicketStickyPreview.tsx";
import type { TicketPreviewPoint } from "./useExpenseTicketImagePreview.ts";

type PaginationLabels = {
  first: string;
  prev: string;
  next: string;
  last: string;
};

type ExpenseTicketDetailViewProps = {
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
    scale: number;
    translate: TicketPreviewPoint;
    surfaceRef: RefObject<HTMLDivElement | null>;
    onClose: () => void;
    onPointerDown: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerMove: (event: React.PointerEvent<HTMLDivElement>) => void;
    onPointerEnd: (event: React.PointerEvent<HTMLDivElement>) => void;
    onWheel: (event: React.WheelEvent<HTMLDivElement>) => void;
  };
  content: {
    isLoading: boolean;
    errorMessage: string;
    header: ExpenseTicketDetailHeader | null;
    showStickyPreview: boolean;
    previewBusy: boolean;
    previewError: string;
    previewImageUrl: string;
    previewFileName: string;
    previewAltText: string;
    onOpenPreview: () => void;
    statusLabel: string;
    gastoTypeLabel: string;
    totalAmountText: string;
    transDateText: string;
    isEditing: boolean;
    gastoTypeOptions: Array<{ value: string; text: string }>;
    draftDescription: string;
    descriptionInvalid: boolean;
    descriptionInputRef: RefObject<HTMLInputElement | null>;
    draftGastoType: string;
    gastoTypeInvalid: boolean;
    gastoTypeInputRef: RefObject<HTMLInputElement | null>;
    draftCurrencyCode: string;
    currencyCodeInvalid: boolean;
    currencyInputRef: RefObject<HTMLInputElement | null>;
    draftTransDate: string;
    draftUrlFile: string;
    draftFileName: string;
    onDraftDescriptionChange: (value: string) => void;
    onDraftGastoTypeChange: (value: string) => void;
    onDraftCurrencyCodeChange: (value: string) => void;
    onDraftTransDateChange: (value: string) => void;
    onOpenFile: () => void;
    onOpenExpenseSheet?: () => void;
    visibleLines: ExpenseTicketDetailLine[];
    totalLinePages: number;
    linePage: number;
    currencyCode: string;
    paginationLabels: PaginationLabels;
    containerRef: RefObject<HTMLDivElement | null>;
    onLinePageChange: (page: number) => void;
    onOpenLine: (lineRecId: string) => void;
    status: string;
  };
};

// Renders the ticket detail view while the page container owns orchestration.
const ExpenseTicketDetailView = ({ modal, preview, content }: ExpenseTicketDetailViewProps) => {
  const detailBody = (
    <>
      <ExpenseTicketDetailHeaderForm
        header={content.header}
        statusLabel={content.statusLabel}
        gastoTypeLabel={content.gastoTypeLabel}
        totalAmountText={content.totalAmountText}
        transDateText={content.transDateText}
        isEditing={content.isEditing}
        gastoTypeOptions={content.gastoTypeOptions}
        draftDescription={content.draftDescription}
        descriptionInvalid={content.descriptionInvalid}
        descriptionInputRef={content.descriptionInputRef}
        draftGastoType={content.draftGastoType}
        gastoTypeInvalid={content.gastoTypeInvalid}
        gastoTypeInputRef={content.gastoTypeInputRef}
        draftCurrencyCode={content.draftCurrencyCode}
        currencyCodeInvalid={content.currencyCodeInvalid}
        currencyInputRef={content.currencyInputRef}
        draftTransDate={content.draftTransDate}
        draftUrlFile={content.draftUrlFile}
        draftFileName={content.draftFileName}
        onDraftDescriptionChange={content.onDraftDescriptionChange}
        onDraftGastoTypeChange={content.onDraftGastoTypeChange}
        onDraftCurrencyCodeChange={content.onDraftCurrencyCodeChange}
        onDraftTransDateChange={content.onDraftTransDateChange}
        onOpenFile={content.onOpenFile}
        onOpenExpenseSheet={content.onOpenExpenseSheet}
        hideOpenFileAction={content.showStickyPreview}
      />
      <ExpenseTicketLinesList
        visibleLines={content.visibleLines}
        totalLinePages={content.totalLinePages}
        linePage={content.linePage}
        currencyCode={content.currencyCode}
        paginationLabels={content.paginationLabels}
        containerRef={content.containerRef}
        onLinePageChange={content.onLinePageChange}
        onOpenLine={content.onOpenLine}
      />
      <div className="text-sm text-slate-600">{content.status}</div>
    </>
  );

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
        onWheel={preview.onWheel}
      />

      <div
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700"
        style={{ display: content.isLoading ? "flex" : "none" }}
      >
        <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {indT("Common_Loading", "Loading")}
      </div>

      {content.errorMessage ? <div className="text-danger">{content.errorMessage}</div> : null}

      {!content.isLoading && !content.errorMessage && content.header ? (
        content.showStickyPreview ? (
          <div className="space-y-2 lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-4 lg:space-y-0">
            <div className="lg:col-start-2">
              <ExpenseTicketStickyPreview
                busy={content.previewBusy}
                error={content.previewError}
                imageUrl={content.previewImageUrl}
                imageAlt={content.previewAltText}
                fileName={content.previewFileName}
                onOpen={content.onOpenPreview}
              />
            </div>
            <div className="space-y-2 lg:col-start-1 lg:row-start-1">{detailBody}</div>
          </div>
        ) : (
          detailBody
        )
      ) : null}
    </div>
  );
};

export default ExpenseTicketDetailView;
