import React from "react";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import FloatingActionButton from "../../../components/commons/FloatingActionButton.tsx";
import { useAuthContext } from "../../../context/AuthContext.tsx";
import ExpenseSheetHeaderForm from "../components/ExpenseSheetHeaderForm.tsx";
import ExpenseLinesTimeline from "../components/ExpenseLinesTimeline.tsx";
import ExpenseSheetStatusActionBar from "./ExpenseSheetStatusActionBar.tsx";
import ExpenseSheetDetailOverlays from "./ExpenseSheetDetailOverlays.tsx";
import { bootstrapExpenseApiAuth, useExpenseSheetDetailPageController } from "./useExpenseSheetDetailPageController.tsx";
import { indT } from "../../../utils/indI18n.ts";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";
import { safeText } from "../utils/expenseUiUtils.ts";
import { consumeExpenseSheetCreatedReturnContext } from "../utils/expenseSheetCreatedReturnContext.ts";
import { useExpenseSheetsFilterCache } from "../list/useExpenseSheetsFilterCache.ts";
import { createInitialExpenseSheetsFilterSnapshot } from "../list/expenseFilterSnapshot.ts";
import { setExpenseActingUserOverride } from "../utils/expenseActingUser.ts";

const DETAIL_FAB_BASELINE_BOTTOM_PX = 24;
const EXPENSE_SHEETS_LIST_URL = "/Gastos/ExpenseSheets";

// Applies the server-resolved acting user for email deep links before detail API calls run.
const bootstrapExpenseLinkActingUser = () => {
  const actingUserId = safeText(window.__EXPENSE_ACTING_USER_ID__);
  if (!actingUserId) return;
  setExpenseActingUserOverride(actingUserId);
};

const ExpenseSheetDetailPageContent = () => {
  const controller = useExpenseSheetDetailPageController();
  const { currentAxUserId } = useAuthContext();
  const { readCachedState, saveCachedState } = useExpenseSheetsFilterCache();
  const createdSheetReturnIdRef = React.useRef("");

  React.useEffect(() => {
    const createdContext = consumeExpenseSheetCreatedReturnContext(controller.sheetId);
    createdSheetReturnIdRef.current = createdContext?.sheetId || "";
  }, [controller.sheetId]);

  const prepareCreatedSheetReturnState = React.useCallback(() => {
    const createdSheetId = safeText(createdSheetReturnIdRef.current);
    if (!createdSheetId) return false;

    saveCachedState({
      filters: createInitialExpenseSheetsFilterSnapshot(currentAxUserId),
      page: 1,
      scrollY: 0,
      items: [],
      total: 0,
    });

    createdSheetReturnIdRef.current = "";
    return true;
  }, [currentAxUserId, saveCachedState]);

  const rearmExpenseSheetsReturnState = React.useCallback(() => {
    if (prepareCreatedSheetReturnState()) {
      return;
    }

    const cachedState = readCachedState();
    if (!cachedState) return;
    saveCachedState(cachedState);
  }, [prepareCreatedSheetReturnState, readCachedState, saveCachedState]);

  React.useEffect(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;

    backButton.setAttribute("data-back-url", EXPENSE_SHEETS_LIST_URL);

    return () => {
      backButton.removeAttribute("data-back-url");
    };
  }, []);

  React.useEffect(() => {
    const backButton = document.getElementById("globalBackBtn");
    if (!backButton) return;

    const handleTopbarBackClick = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();

      const executeBackNavigation = () => {
        rearmExpenseSheetsReturnState();
        window.__indBypassNavigationGuardOnce?.();
        window.location.href = EXPENSE_SHEETS_LIST_URL;
      };

      if (typeof window.__indRequestNavigation === "function") {
        window.__indRequestNavigation(executeBackNavigation);
        return;
      }

      executeBackNavigation();
    };

    backButton.addEventListener("click", handleTopbarBackClick, true);
    return () => {
      backButton.removeEventListener("click", handleTopbarBackClick, true);
    };
  }, [rearmExpenseSheetsReturnState]);

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
        modalBody={controller.modalBody}
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
        onClearQuickTicketError={controller.quickTicketFlow.clearError}
      />

      <div
        className="loader-box glass-panel shadow-card flex items-center gap-2 text-sm text-slate-700"
        style={{ display: controller.isLoading || controller.isRedirectingAfterCreate ? "flex" : "none" }}
      >
        <svg className="ind-spinner size-5" viewBox="0 0 20 20" role="status" aria-label={indT("Common_Loading", "Loading")}>
          <circle className="ind-spinner__circle" cx="10" cy="10" r="8" strokeWidth="2" />
        </svg>
        {indT("Common_Loading", "Loading")}
      </div>

      {controller.errorMessage ? <div className="text-danger">{controller.errorMessage}</div> : null}

      {!controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage && controller.header ? (
        <ExpenseSheetHeaderForm
          mode={{
            isCreateMode: controller.isCreateMode,
            isEditing: controller.isEditing,
            canEditHeaderFields: controller.canEditHeaderFieldsCurrent,
            statusCommentMode: controller.statusCommentMode,
          }}
          currencyLocks={{
            isCurrencyLockedByLines: controller.isCurrencyLockedByLines,
            isExchangeRateLockedByLines: controller.isExchangeRateLockedByLines,
            showExchangeRate: controller.showExchangeRate,
          }}
          header={controller.header}
          ownerDisplay={controller.ownerDisplay}
          projectValue={controller.projectValue}
          normalizedDraftCurrency={controller.normalizedDraftCurrency}
          exchangeRateBaseCurrency={controller.exchangeRateBaseCurrency}
          exchangeRateReferenceAmount={controller.exchangeRateReferenceAmount}
          exchangeRateValue={controller.exchangeRateValue}
          exchangeRateValidationMessage={controller.exchangeRateValidationMessage}
          totalAmountText={controller.totalAmountText}
          draftDescription={controller.draftDescription}
          draftProjectId={controller.draftProjectId}
          draftCurrencyCode={controller.draftCurrencyCode}
          draftExchangeRate={controller.draftExchangeRate}
          draftReimbursableExpense={controller.draftReimbursableExpense}
          officialExchangeRateRawValue={controller.officialExchangeRateRawValue}
          officialExchangeRateDate={controller.officialExchangeRateDate}
          officialExchangeRateSource={controller.officialExchangeRateSource}
          onDraftDescriptionChange={controller.setDraftDescription}
          onDraftProjectIdChange={controller.setDraftProjectId}
          onDraftProjectIdCommit={controller.commitDraftProjectId}
          onDraftCurrencyCodeChange={controller.setDraftCurrencyCode}
          onDraftExchangeRateChange={controller.setDraftExchangeRate}
          onDraftReimbursableExpenseChange={controller.setDraftReimbursableExpense}
        />
      ) : null}

      {!controller.isCreateMode && !controller.isLoading && !controller.isRedirectingAfterCreate && !controller.errorMessage ? (
        <ExpenseLinesTimeline
          visibleLines={controller.visibleLines}
          reimbursementCurrencyCode={safeText(controller.exchangeRateBaseCurrency || controller.header?.currencyCode)}
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
          bottom={DETAIL_FAB_BASELINE_BOTTOM_PX}
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
  bootstrapExpenseLinkActingUser();
  const rootEl = document.getElementById("expense-sheet-detail-root");
  if (!rootEl) return;
  mountReactIsland(rootEl, <ExpenseSheetDetailPage />);
};

mountWhenDocumentReady(mount);

export default ExpenseSheetDetailPage;
