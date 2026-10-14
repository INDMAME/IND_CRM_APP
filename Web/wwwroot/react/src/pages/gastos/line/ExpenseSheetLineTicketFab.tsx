import React, { useMemo } from "react";
import FloatingActionButton, {
  type FloatingActionButtonMenuItem,
} from "../../../components/commons/FloatingActionButton.tsx";
import { indT } from "../../../utils/indI18n.ts";
import { LinkTicketIcon, UnlinkTicketIcon } from "../components/ExpenseSheetActionIcons.tsx";

export type ExpenseSheetLineTicketFabAction = "link" | "detach";

type ExpenseSheetLineTicketFabProps = {
  action: ExpenseSheetLineTicketFabAction;
  bottom: number;
  disabled: boolean;
  onAction: () => void;
};

// Renders the standard expense action FAB for linking or detaching one ticket.
const ExpenseSheetLineTicketFab = ({ action, bottom, disabled, onAction }: ExpenseSheetLineTicketFabProps) => {
  const menuItems = useMemo<FloatingActionButtonMenuItem[]>(
    () => {
      const item =
        action === "detach"
          ? {
              id: "detach-linked-ticket",
              label: indT("ExpenseSheets_Line_Ticket_DetachButton", "Detach ticket"),
              icon: <UnlinkTicketIcon />,
            }
          : {
              id: "link-existing-ticket",
              label: indT("ExpenseSheets_Fab_LinkTicket", "Vincular Ticket"),
              icon: <LinkTicketIcon />,
            };

      return [
        {
          ...item,
          onClick: onAction,
          disabled,
        },
      ];
    },
    [action, disabled, onAction]
  );

  return (
    <FloatingActionButton
      ariaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rápidas")}
      size={76}
      right={16}
      bottom={bottom}
      menuAriaLabel={indT("ExpenseSheets_Fab_Actions", "Acciones rápidas")}
      menuItems={menuItems}
    />
  );
};

export default ExpenseSheetLineTicketFab;
