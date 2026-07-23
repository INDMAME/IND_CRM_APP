import { useEffect } from "react";
import { indT } from "../utils/indI18n.ts";

export const useTopbar = (
  step: number,
  canGoNext: boolean,
  onNext: () => void,
  onPrev: () => void,
  onCancel: () => void,
  busy = false,
  canSubmitStep2 = true,
  canAccess = true
) => {
  useEffect(() => {
    const forward = document.getElementById("globalForwardBtn") as HTMLButtonElement | null;
    const back = document.getElementById("globalBackBtn") as HTMLButtonElement | null;
    const cancel = document.getElementById("visitCreateCancelBtn") as HTMLButtonElement | null;
    const forwardIcon = document.getElementById("globalForwardIcon");
    const createIcon = document.getElementById("globalCreateIcon");

    if (forward) {
      const isStep2 = step === 2;
      const showForward = canAccess && (isStep2 || (step === 1 && canGoNext));
      forward.style.visibility = showForward ? "visible" : "hidden";
      forward.disabled = !showForward || busy;
      forward.onclick = showForward ? () => onNext() : null;
      forward.setAttribute(
        "aria-label",
        isStep2 ? indT("Common_Create", "Create") : indT("Common_Next", "Next")
      );
      forward.setAttribute("aria-disabled", isStep2 && !canSubmitStep2 ? "true" : "false");
      forward.classList.toggle("opacity-50", isStep2 && !canSubmitStep2);
      forward.classList.toggle("cursor-not-allowed", isStep2 && !canSubmitStep2);

      if (forwardIcon && createIcon) {
        if (isStep2) {
          forwardIcon.classList.add("hidden");
          createIcon.classList.remove("hidden");
        } else {
          forwardIcon.classList.remove("hidden");
          createIcon.classList.add("hidden");
        }
      }
    }
    if (back) {
      const showBack = canAccess && step === 2;
      back.style.visibility = showBack ? "visible" : "hidden";
      back.disabled = !showBack || busy;
      back.onclick = showBack ? () => onPrev() : null;
    }
    if (cancel) {
      const showCancel = canAccess;
      cancel.style.visibility = showCancel ? "visible" : "hidden";
      cancel.disabled = !showCancel || busy;
      cancel.onclick = showCancel && !busy ? () => onCancel() : null;
    }

    return () => {
      if (forward) forward.onclick = null;
      if (back) back.onclick = null;
      if (cancel) cancel.onclick = null;
    };
  }, [step, canGoNext, onNext, onPrev, onCancel, busy, canSubmitStep2, canAccess]);
};
