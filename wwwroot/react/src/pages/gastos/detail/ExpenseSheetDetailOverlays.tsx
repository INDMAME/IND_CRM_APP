import React from "react";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import Spinner from "../../../components/commons/Spinner.tsx";
import { indT } from "../../../utils/indI18n.ts";
import { TICKET_IMAGE_ACCEPT_ATTRIBUTE } from "./useExpenseSheetQuickTicketFlowCore.ts";

type ExpenseSheetDetailOverlaysProps = {
  modal: {
    open: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
    showConfirm?: boolean;
  };
  modalError: string;
  status: string;
  busy: boolean;
  isRedirectingAfterCreate: boolean;
  modalLoadingText: string;
  modalCancelText: string;
  modalConfirmText: string;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
  galleryInputRef: React.RefObject<HTMLInputElement | null>;
  sourcePickerOpen: boolean;
  quickTicketBusy: boolean;
  quickTicketProgressMessage: string;
  quickTicketErrorMessage: string;
  quickTicketAttemptId: string;
  quickTicketTraceList: Array<{ step: string; traceId: string; at: string }>;
  hasPendingUploadRetry: boolean;
  hasPartialTicketFailure: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onSelectedCameraFile: (file: File | null) => void;
  onSelectedGalleryFile: (file: File | null) => void;
  onSelectFromCamera: () => void;
  onSelectFromGallery: () => void;
  onCloseSourcePicker: () => void;
  onRetryPendingUpload: () => void;
  onOpenCreatedTicket: () => void;
  onClearQuickTicketError: () => void;
};

// Renders modal and quick-ticket overlays for the expense sheet detail page.
const ExpenseSheetDetailOverlays = ({
  modal,
  modalError,
  status,
  busy,
  isRedirectingAfterCreate,
  modalLoadingText,
  modalCancelText,
  modalConfirmText,
  cameraInputRef,
  galleryInputRef,
  sourcePickerOpen,
  quickTicketBusy,
  quickTicketProgressMessage,
  quickTicketErrorMessage,
  quickTicketAttemptId,
  quickTicketTraceList,
  hasPendingUploadRetry,
  hasPartialTicketFailure,
  onConfirm,
  onCancel,
  onSelectedCameraFile,
  onSelectedGalleryFile,
  onSelectFromCamera,
  onSelectFromGallery,
  onCloseSourcePicker,
  onRetryPendingUpload,
  onOpenCreatedTicket,
  onClearQuickTicketError,
}: ExpenseSheetDetailOverlaysProps) => {
  return (
    <>
      <ConfirmModal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        confirmText={modalConfirmText}
        cancelText={modalCancelText}
        loadingText={modalLoadingText}
        showCancel={modal.showCancel}
        showConfirm={modal.showConfirm}
        busy={busy || isRedirectingAfterCreate}
        error={modalError}
        status={status}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />

      <input
        ref={cameraInputRef}
        type="file"
        accept={TICKET_IMAGE_ACCEPT_ATTRIBUTE}
        capture="environment"
        className="hidden"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          onSelectedCameraFile(file);
        }}
      />

      <input
        ref={galleryInputRef}
        type="file"
        accept={TICKET_IMAGE_ACCEPT_ATTRIBUTE}
        className="hidden"
        onChange={(event) => {
          const file = event.currentTarget.files?.[0] || null;
          event.currentTarget.value = "";
          onSelectedGalleryFile(file);
        }}
      />

      {sourcePickerOpen ? (
        <div className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/45 px-4 py-6">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
            <h3 className="text-[16px] font-semibold text-slate-800">
              {indT("ExpenseSheets_NewTicket_Source_Title", "Nuevo ticket")}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {indT(
                "ExpenseSheets_NewTicket_Source_Body",
                "Selecciona una fuente para capturar o elegir la imagen del ticket."
              )}
            </p>

            <div className="mt-4 grid grid-cols-1 gap-2">
              <button type="button" className="ind-action-btn w-full px-3 py-2 text-sm" onClick={onSelectFromCamera}>
                {indT("ExpenseSheets_NewTicket_Source_Camera", "Usar cámara")}
              </button>
              <button type="button" className="ind-action-btn w-full px-3 py-2 text-sm" onClick={onSelectFromGallery}>
                {indT("ExpenseSheets_NewTicket_Source_Gallery", "Elegir imagen")}
              </button>
              <button type="button" className="ind-action-btn w-full px-3 py-2 text-sm" onClick={onCloseSourcePicker}>
                {indT("Common_Cancel", "Cancel")}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {quickTicketBusy ? (
        <div className="fixed inset-0 z-600000 flex items-center justify-center bg-slate-950/35 px-4">
          <div className="glass-panel shadow-card flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 text-sm text-slate-700">
            <Spinner size="h-5 w-5" label={indT("Common_Loading", "Loading")} />
            <span>{quickTicketProgressMessage || indT("Common_Loading", "Loading")}</span>
          </div>
        </div>
      ) : null}

      {quickTicketErrorMessage ? (
        <div
          className={
            hasPartialTicketFailure
              ? "glass-panel shadow-card space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
              : "glass-panel shadow-card space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800"
          }
        >
          <p>{quickTicketErrorMessage}</p>
          {quickTicketAttemptId ? (
            <p
              className={
                hasPartialTicketFailure
                  ? "rounded-lg border border-amber-200 bg-white px-2 py-1 font-mono text-[11px] text-amber-900 break-all"
                  : "rounded-lg border border-rose-200 bg-white px-2 py-1 font-mono text-[11px] text-rose-800 break-all"
              }
            >
              {`attemptId: ${quickTicketAttemptId}`}
            </p>
          ) : null}
          {quickTicketTraceList.length > 0 ? (
            <div
              className={
                hasPartialTicketFailure
                  ? "rounded-lg border border-amber-200 bg-white p-2 text-xs text-amber-800"
                  : "rounded-lg border border-rose-200 bg-white p-2 text-xs text-rose-700"
              }
            >
              {quickTicketTraceList.map((entry) => (
                <p key={`${entry.step}-${entry.at}`}>{`${entry.step}: ${entry.traceId}`}</p>
              ))}
            </div>
          ) : null}
          <div className="flex flex-wrap gap-2">
            {hasPartialTicketFailure ? (
              <button type="button" className="ind-action-btn px-3 py-1.5 text-xs" onClick={onOpenCreatedTicket}>
                {indT("ExpenseSheets_NewTicket_OpenCreatedTicket", "Open created ticket")}
              </button>
            ) : null}
            {hasPendingUploadRetry ? (
              <button type="button" className="ind-action-btn px-3 py-1.5 text-xs" onClick={onRetryPendingUpload}>
                {indT("ExpenseSheets_NewTicket_RetryUpload", "Reintentar upload")}
              </button>
            ) : null}
            <button type="button" className="ind-action-btn px-3 py-1.5 text-xs" onClick={onClearQuickTicketError}>
              {indT("Common_Close", "Close")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ExpenseSheetDetailOverlays;
