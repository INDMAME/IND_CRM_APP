import React from "react";
import type { RefObject } from "react";
import ConfirmModal from "../../../../components/commons/ConfirmModal.tsx";
import { indT } from "../../../../utils/indI18n.ts";
import ExpenseTicketDetailHeaderForm from "../../components/ExpenseTicketDetailHeaderForm.tsx";
import ExpenseTicketLinesList from "../../components/ExpenseTicketLinesList.tsx";
import type { ExpenseTicketDetailHeader, ExpenseTicketDetailLine } from "./expenseTicketDetailTypes.ts";
import ExpenseTicketPreviewModal from "./ExpenseTicketPreviewModal.tsx";
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
    statusLabel: string;
    gastoTypeLabel: string;
    totalAmountText: string;
    transDateText: string;
    isEditing: boolean;
    gastoTypeOptions: Array<{ value: string; text: string }>;
    draftDescription: string;
    draftGastoType: string;
    draftCurrencyCode: string;
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
            draftGastoType={content.draftGastoType}
            draftCurrencyCode={content.draftCurrencyCode}
            draftTransDate={content.draftTransDate}
            draftUrlFile={content.draftUrlFile}
            draftFileName={content.draftFileName}
            onDraftDescriptionChange={content.onDraftDescriptionChange}
            onDraftGastoTypeChange={content.onDraftGastoTypeChange}
            onDraftCurrencyCodeChange={content.onDraftCurrencyCodeChange}
            onDraftTransDateChange={content.onDraftTransDateChange}
            onOpenFile={content.onOpenFile}
            onOpenExpenseSheet={content.onOpenExpenseSheet}
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
      ) : null}
    </div>
  );
};

export default ExpenseTicketDetailView;
