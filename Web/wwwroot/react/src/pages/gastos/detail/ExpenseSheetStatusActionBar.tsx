import React from "react";
import PageBottomActions, { PageBottomActionButton } from "../../../components/commons/PageBottomActions.tsx";
import { indT } from "../../../utils/indI18n.ts";
import type { ExpenseSheetStatusAction } from "./expenseSheetDetailPolicy.ts";

type ExpenseSheetStatusActionBarProps = {
  actions: ExpenseSheetStatusAction[];
  busy: boolean;
  onActionClick: (action: ExpenseSheetStatusAction) => void;
};

// Renders the bottom toolbar for expense sheet status transitions.
const ExpenseSheetStatusActionBar = ({ actions, busy, onActionClick }: ExpenseSheetStatusActionBarProps) => {
  if (actions.length < 1) {
    return null;
  }

  return (
    <PageBottomActions ariaLabel={indT("ExpenseSheets_BottomActions_Toolbar", "Expense sheet status actions")}>
      {actions.map((action) => (
        <PageBottomActionButton
          key={action.id}
          label={indT(action.labelKey, action.fallback)}
          disabled={busy}
          onClick={() => onActionClick(action)}
        />
      ))}
    </PageBottomActions>
  );
};

export default ExpenseSheetStatusActionBar;
