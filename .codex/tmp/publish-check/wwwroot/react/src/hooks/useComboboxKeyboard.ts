import React from "react";

type ComboboxKeyDownOptions = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  optionCount: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  onEnterWhenOpen: () => void;
  onEnterWhenClosed?: () => void;
  onArrowNavigate?: () => void;
  requireOpenForArrows?: boolean;
  openOnArrow?: boolean;
};

// Handles shared arrow/enter/escape keyboard behavior for combobox inputs.
export const handleComboboxKeyDown = (
  event: React.KeyboardEvent<HTMLInputElement>,
  {
    isOpen,
    setOpen,
    optionCount,
    setActiveIndex,
    onEnterWhenOpen,
    onEnterWhenClosed,
    onArrowNavigate,
    requireOpenForArrows = false,
    openOnArrow = false,
  }: ComboboxKeyDownOptions
) => {
  const moveActiveIndex = (delta: number) => {
    if (!optionCount) return;
    setActiveIndex((idx) => {
      const next = idx + delta;
      if (next < 0) return optionCount - 1;
      if (next >= optionCount) return 0;
      return next;
    });
  };

  if (event.key === "ArrowDown") {
    if (requireOpenForArrows && !isOpen) return;
    event.preventDefault();
    if (openOnArrow) setOpen(true);
    onArrowNavigate?.();
    moveActiveIndex(1);
    return;
  }

  if (event.key === "ArrowUp") {
    if (requireOpenForArrows && !isOpen) return;
    event.preventDefault();
    if (openOnArrow) setOpen(true);
    onArrowNavigate?.();
    moveActiveIndex(-1);
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    if (isOpen && optionCount) {
      onEnterWhenOpen();
      return;
    }
    onEnterWhenClosed?.();
    return;
  }

  if (event.key === "Escape") {
    setOpen(false);
  }
};
