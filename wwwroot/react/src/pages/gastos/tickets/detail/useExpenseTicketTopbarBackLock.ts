import { useEffect } from "react";
import { safeText } from "../../utils/expenseUiUtils.ts";

type UseExpenseTicketTopbarBackLockArgs = {
  locked: boolean;
  message?: string;
};

// Locks the shared topbar back button while a linked ticket must stay in the recovery flow.
export const useExpenseTicketTopbarBackLock = ({
  locked,
  message,
}: UseExpenseTicketTopbarBackLockArgs): void => {
  useEffect(() => {
    const backButton = document.getElementById("globalBackBtn") as HTMLButtonElement | null;
    if (!backButton) return;

    const previousDisabled = backButton.disabled;
    const previousAriaDisabled = backButton.getAttribute("aria-disabled");
    const previousTitle = backButton.getAttribute("title");
    const lockMessage = safeText(message);

    if (locked) {
      backButton.disabled = true;
      backButton.setAttribute("aria-disabled", "true");
      if (lockMessage) {
        backButton.setAttribute("title", lockMessage);
      }
    } else if (!previousDisabled) {
      backButton.disabled = false;
      backButton.setAttribute("aria-disabled", "false");
      if (previousTitle === null) {
        backButton.removeAttribute("title");
      }
    }

    return () => {
      backButton.disabled = previousDisabled;
      if (previousAriaDisabled === null) {
        backButton.removeAttribute("aria-disabled");
      } else {
        backButton.setAttribute("aria-disabled", previousAriaDisabled);
      }
      if (previousTitle === null) {
        backButton.removeAttribute("title");
      } else {
        backButton.setAttribute("title", previousTitle);
      }
    };
  }, [locked, message]);
};
