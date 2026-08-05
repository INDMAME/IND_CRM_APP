import React, { useMemo } from "react";
import FloatingActionButton, {
  type FloatingActionButtonMenuItem,
} from "../../../components/commons/FloatingActionButton.tsx";
import { indT } from "../../../utils/indI18n.ts";
import { LinkTicketIcon } from "../components/ExpenseSheetActionIcons.tsx";

type ExpenseSheetLineTicketFabProps = {
  bottom: number;
  disabled: boolean;
  onLinkTicket: () => void;
};

// Renders the standard expense action FAB for linking one ticket to a manual line.
const ExpenseSheetLineTicketFab = ({ bottom, disabled, onLinkTicket }: ExpenseSheetLineTicketFabProps) => {
  const menuItems = useMemo<FloatingActionButtonMenuItem[]>(
    () => [
      {
        id: "link-existing-ticket",
        label: indT("ExpenseSheets_Fab_LinkTicket", "Vincular Ticket"),
        icon: <LinkTicketIcon />,
        onClick: onLinkTicket,
        disabled,
      },
    ],
    [disabled, onLinkTicket]
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
