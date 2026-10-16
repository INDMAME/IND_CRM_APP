import React, { useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FloatingLayerContext } from "./FloatingLayerContext.ts";

type Props = {
  title: string;
  clearLabel: string;
  cancelLabel: string;
  applyLabel: string;
  busy?: boolean;
  children: React.ReactNode;
  onClear: () => void;
  onCancel: () => void;
  onApply: () => void;
};

// Wraps the editing controls without letting Tab fall through to the page.
const keepDialogFocus = (event: React.KeyboardEvent<HTMLDialogElement>) => {
  if (event.key !== "Tab" || event.defaultPrevented || event.ctrlKey || event.altKey || event.metaKey) return;
  const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
    "button, input, select, textarea, a[href], [tabindex]"
  )).filter((element) => element.tabIndex >= 0 && !element.matches(":disabled") && element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first) {
    event.preventDefault();
    return;
  }
  const active = document.activeElement;
  if (event.shiftKey && (active === first || !controls.includes(active as HTMLElement))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
};

// Presents filters as an explicit editing task with native background isolation.
const FilterDialog = ({ title, clearLabel, cancelLabel, applyLabel, busy = false, children, onClear, onCancel, onApply }: Props) => {
  const [dialog, setDialog] = useState<HTMLDialogElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleId = useId();

  useLayoutEffect(() => {
    if (!dialog) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    titleRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [dialog]);

  return createPortal(
    <dialog
      ref={setDialog}
      className="history-filter-dialog filter-card visitas-typography"
      aria-labelledby={titleId}
      onCancel={(event) => event.preventDefault()}
      onKeyDown={keepDialogFocus}
    >
      <FloatingLayerContext.Provider value={dialog}>
        <div className="history-filter-dialog__layout">
          <header className="history-filter-dialog__header">
            <h2 ref={titleRef} id={titleId} tabIndex={-1}>{title}</h2>
          </header>
          <div className="history-filter-dialog__content">{children}</div>
          <footer className="history-filter-dialog__actions">
            <button type="button" className="history-filter-dialog__clear" onClick={onClear}>{clearLabel}</button>
            <button type="button" className="history-filter-dialog__cancel" onClick={onCancel}>{cancelLabel}</button>
            <button type="button" className="history-filter-dialog__apply" disabled={busy} onClick={onApply}>{applyLabel}</button>
          </footer>
        </div>
      </FloatingLayerContext.Provider>
    </dialog>,
    document.body
  );
};

export default FilterDialog;
