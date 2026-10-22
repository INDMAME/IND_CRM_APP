import React from "react";
import ConfirmModal from "../../../components/commons/ConfirmModal.tsx";
import ExpenseQuickTicketProgressOverlay from "../components/ExpenseQuickTicketProgressOverlay.tsx";
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
  modalBody?: React.ReactNode;
  cameraInputRef: React.RefObject<HTMLInputElement | null>;
  galleryInputRef: React.RefObject<HTMLInputElement | null>;
  sourcePickerOpen: boolean;
  quickTicketBusy: boolean;
  quickTicketProgressMessage: string;
  quickTicketProgressStages: Array<{
    key: string;
    title: string;
    description: string;
    state: "completed" | "active" | "pending";
  }>;
  quickTicketElapsedMs: number;
  onConfirm: () => void;
  onCancel: () => void;
  onSelectedCameraFile: (file: File | null) => void;
  onSelectedGalleryFile: (file: File | null) => void;
  onSelectFromCamera: () => void;
  onSelectFromGallery: () => void;
  onCloseSourcePicker: () => void;
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
  modalBody,
  cameraInputRef,
  galleryInputRef,
  sourcePickerOpen,
  quickTicketBusy,
  quickTicketProgressMessage,
  quickTicketProgressStages,
  quickTicketElapsedMs,
  onConfirm,
  onCancel,
  onSelectedCameraFile,
  onSelectedGalleryFile,
  onSelectFromCamera,
  onSelectFromGallery,
  onCloseSourcePicker,
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
      >
        {modalBody}
      </ConfirmModal>

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
          <div className="w-full max-w-sm rounded-[var(--radius-xl)] border border-slate-200 bg-white p-4 shadow-xl">
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

      <ExpenseQuickTicketProgressOverlay
        open={quickTicketBusy}
        title={indT("ExpenseSheets_NewTicket_Progress_Title", "Processing ticket")}
        summary={quickTicketProgressMessage || indT("Common_Loading", "Loading")}
        elapsedMs={quickTicketElapsedMs}
        stages={quickTicketProgressStages}
      />

    </>
  );
};

export default ExpenseSheetDetailOverlays;
