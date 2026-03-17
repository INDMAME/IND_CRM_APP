import React from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import FloatingActionButton from "../../../components/commons/FloatingActionButton.tsx";
import ExpenseSheetHeaderForm from "../components/ExpenseSheetHeaderForm.tsx";
import ExpenseLinesTimeline from "../components/ExpenseLinesTimeline.tsx";
import ExpenseSheetStatusActionBar from "./ExpenseSheetStatusActionBar.tsx";
import ExpenseSheetDetailOverlays from "./ExpenseSheetDetailOverlays.tsx";
import { bootstrapExpenseApiAuth, useExpenseSheetDetailPageController } from "./useExpenseSheetDetailPageController.tsx";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import { safeText } from "../utils/expenseUiUtils.ts";
import { useExpenseSheetsFilterCache } from "../list/useExpenseSheetsFilterCache.ts";

const DETAIL_FAB_BOTTOM_WITH_ACTION_BAR = 176;
const EXPENSE_SHEETS_LIST_URL = "/Gastos/ExpenseSheets";

const ExpenseSheetDetailPageContent = () => {
  const controller = useExpenseSheetDetailPageController();
  const { readCachedState, saveCachedState } = useExpenseSheetsFilterCache();

  const rearmExpenseSheetsReturnState = React.useCallback(() => {
    const cachedState = readCachedState();
    if (!cachedState) return;
    saveCachedState(cachedState);
  }, [readCachedState, saveCachedState]);

  React.useEffect(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;

    backButton.setAttribute("data-back-url", EXPENSE_SHEETS_LIST_URL);

    return () => {
      backButton.removeAttribute("data-back-url");
    };
  }, []);

  React.useEffect(() => {
    const handleNativeBack = (event) => {
      if (event?.state && event.state.indTrap === true) {
        return;
      }

      const executeBackNavigation = () => {
        rearmExpenseSheetsReturnState();
        window.__indBypassNavigationGuardOnce?.();
        window.location.replace(EXPENSE_SHEETS_LIST_URL);
      };

      if (typeof window.__indRequestNavigation === "function") {
        window.__indRequestNavigation(executeBackNavigation);
        return;
      }

      executeBackNavigation();
    };

    window.addEventListener("popstate", handleNativeBack);
    return () => {
      window.removeEventListener("popstate", handleNativeBack);
    };
  }, [rearmExpenseSheetsReturnState]);

  return (
    <div className="space-y-3">
      <ExpenseSheetDetailOverlays
        modal={controller.modal}
        modalError={controller.modalError}
        status={controller.status}
        busy={controller.busy}
        isRedirectingAfterCreate={controller.isRedirectingAfterCreate}
        modalLoadingText={controller.modalLoadingText}
        modalCancelText={controller.modalCancelText}
        modalConfirmText={controller.modalConfirmText}
        cameraInputRef={controller.cameraInputRef}
        galleryInputRef={controller.galleryInputRef}
        sourcePickerOpen={controller.quickTicketFlow.sourcePickerOpen}
        quickTicketBusy={controller.quickTicketFlow.busy}
        quickTicketProgressMessage={controller.quickTicketFlow.progressMessage}
        quickTicketProgressStages={controller.quickTicketFlow.progressStages}
        quickTicketElapsedMs={controller.quickTicketFlow.progressElapsedMs}
        quickTicketErrorMessage={controller.quickTicketFlow.errorMessage}
        quickTicketAttemptId={controller.quickTicketFlow.attemptId}
        quickTicketTraceList={controller.quickTicketFlow.traceList}
        hasPendingUploadRetry={controller.quickTicketFlow.hasPendingUploadRetry}
        hasPartialTicketFailure={controller.quickTicketFlow.hasPartialTicketFailure}
        onConfirm={controller.handleModalButtonConfirm}
        onCancel={controller.closeConfirm}
        onSelectedCameraFile={(file) => {
          void controller.quickTicketFlow.handleSelectedFile(file, "camera");
        }}
        onSelectedGalleryFile={(file) => {
          void controller.quickTicketFlow.handleSelectedFile(file, "gallery");
        }}
        onSelectFromCamera={() => {
          void controller.quickTicketFlow.selectFromCamera(controller.cameraInputRef.current);
        }}
        onSelectFromGallery={() => controller.quickTicketFlow.selectFromGallery(controller.galleryInputRef.current)}
        onCloseSourcePicker={controller.quickTicketFlow.closeSourcePicker}
        onRetryPendingUpload={() => {
          void controller.quickTicketFlow.retryPendingUpload();
        }}
        onOpenCreatedTicket={controller.quickTicketFlow.openCreatedTicket}
        onClearQuickTicketError={controller.quickTicketFlow.clearError}
      />

      <div
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700"
        style={{ display: controller.isLoading || controller.isRedirectingAfterCreate ? "flex" : "none" }}
      >
        <svg className="ind-spinner h-5 w-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {indT("Common_Loading", "Loading")}
      </div>

      {controller.errorMessage ? <div className="text-danger">{controller.errorMessage}</div> : null}

      {!controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage && controller.header ? (
        <ExpenseSheetHeaderForm
          isCreateMode={controller.isCreateMode}
          isEditing={controller.isEditing}
          canEditHeaderFields={controller.canEditHeaderFieldsCurrent}
          statusCommentMode={controller.statusCommentMode}
          header={controller.header}
          projectValue={controller.projectValue}
          isCurrencyLockedByLines={controller.isCurrencyLockedByLines}
          isExchangeRateLockedByLines={controller.isExchangeRateLockedByLines}
          normalizedDraftCurrency={controller.normalizedDraftCurrency}
          exchangeRateBaseCurrency={controller.exchangeRateBaseCurrency}
          exchangeRateReferenceAmount={controller.exchangeRateReferenceAmount}
          showExchangeRate={controller.showExchangeRate}
          exchangeRateValue={controller.exchangeRateValue}
          exchangeRateValidationMessage={controller.exchangeRateValidationMessage}
          totalAmountText={controller.totalAmountText}
          draftDescription={controller.draftDescription}
          draftProjectId={controller.draftProjectId}
          draftCurrencyCode={controller.draftCurrencyCode}
          draftExchangeRate={controller.draftExchangeRate}
          draftEstadoComentarios={controller.draftEstadoComentarios}
          officialExchangeRateRawValue={controller.officialExchangeRateRawValue}
          officialExchangeRateDate={controller.officialExchangeRateDate}
          officialExchangeRateSource={controller.officialExchangeRateSource}
          onDraftDescriptionChange={controller.setDraftDescription}
          onDraftProjectIdChange={controller.setDraftProjectId}
          onDraftCurrencyCodeChange={controller.setDraftCurrencyCode}
          onDraftExchangeRateChange={controller.setDraftExchangeRate}
          onDraftEstadoComentariosChange={controller.setDraftEstadoComentarios}
        />
      ) : null}

      {!controller.isCreateMode && !controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage ? (
        <ExpenseLinesTimeline
          visibleLines={controller.visibleLines}
          currencyCode={safeText(controller.header?.currencyCode)}
          totalLinePages={controller.totalLinePages}
          linePage={controller.linePage}
          linesLabel={indT("ExpenseSheets_Lines", "Lines")}
          emptyText={indT("ExpenseSheets_NoLines", "No lines for this expense sheet.")}
          paginationLabels={controller.paginationLabels}
          containerRef={controller.lineContainerRef}
          onLinePageChange={controller.setLinePage}
          onOpenLine={controller.navigateToLineDetail}
        />
      ) : null}

      {controller.showStatusActionBar ? (
        <ExpenseSheetStatusActionBar
          actions={controller.detailPolicy.statusActions}
          busy={controller.busy || controller.isRedirectingAfterCreate}
          disabled={controller.areStatusActionsDisabled}
          onActionClick={controller.handleStatusActionClick}
        />
      ) : null}

      {controller.showFab ? (
        <FloatingActionButton
          ariaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rápidas")}
          size={76}
          right={16}
          bottom={controller.showStatusActionBar ? DETAIL_FAB_BOTTOM_WITH_ACTION_BAR : 24}
          menuAriaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rápidas")}
          menuItems={controller.fabMenuItems}
        />
      ) : null}
    </div>
  );
};

// Main page entry for expense sheet detail.
const ExpenseSheetDetailPage = () => {
  return (
    <VisitasPageProviders enableExpenseManagement>
      <ExpenseSheetDetailPageContent />
    </VisitasPageProviders>
  );
};

const mount = () => {
  bootstrapExpenseApiAuth();
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseSheetDetailPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseSheetDetailPage;
