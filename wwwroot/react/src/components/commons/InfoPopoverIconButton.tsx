import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../../hooks/useOutsideClick.ts";
import { classNames } from "../../utils/classNames.ts";

type InfoPopoverIconButtonProps = {
  content: React.ReactNode;
  ariaLabel: string;
  className?: string;
  panelClassName?: string;
};

// Converts escaped resource line breaks into visible popover line breaks.
const normalizePopoverContent = (content: React.ReactNode): React.ReactNode => {
  if (typeof content !== "string") {
    return content;
  }

  return content.replace(/\\r\\n|\\n|\\r/g, "\n");
};

// Shared dumb popover trigger used to display short contextual info.
const InfoPopoverIconButton = ({
  content,
  ariaLabel,
  className = "",
  panelClassName = "",
}: InfoPopoverIconButtonProps) => {
  const HORIZONTAL_VIEWPORT_GUTTER_PX = 8;
  const VERTICAL_VIEWPORT_GUTTER_PX = 8;
  const PANEL_TRIGGER_GAP_PX = 6;
  const GLOBAL_RADIUS = "var(--radius-xl, 5px)";
  const [isOpen, setIsOpen] = useState(false);
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({
    position: "fixed",
    top: 0,
    left: 0,
    visibility: "hidden",
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick([buttonRef, panelRef], () => setIsOpen(false));
  const updatePanelPosition = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const buttonElement = buttonRef.current;
    const panelElement = panelRef.current;
    if (!buttonElement || !panelElement) {
      return;
    }

    const buttonRect = buttonElement.getBoundingClientRect();
    const panelRect = panelElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const safeWidth = Math.min(panelRect.width, Math.max(180, viewportWidth - HORIZONTAL_VIEWPORT_GUTTER_PX * 2));

    let left = buttonRect.left + buttonRect.width / 2 - safeWidth / 2;
    left = Math.max(HORIZONTAL_VIEWPORT_GUTTER_PX, Math.min(left, viewportWidth - safeWidth - HORIZONTAL_VIEWPORT_GUTTER_PX));

    let top = buttonRect.bottom + PANEL_TRIGGER_GAP_PX;
    const hasBottomOverflow = top + panelRect.height + VERTICAL_VIEWPORT_GUTTER_PX > viewportHeight;
    if (hasBottomOverflow) {
      const topAboveTrigger = buttonRect.top - panelRect.height - PANEL_TRIGGER_GAP_PX;
      top = topAboveTrigger >= VERTICAL_VIEWPORT_GUTTER_PX
        ? topAboveTrigger
        : Math.max(VERTICAL_VIEWPORT_GUTTER_PX, viewportHeight - panelRect.height - VERTICAL_VIEWPORT_GUTTER_PX);
    }

    setPanelStyle({
      position: "fixed",
      top: Math.round(top),
      left: Math.round(left),
      width: Math.round(safeWidth),
      visibility: "visible",
    });
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }
    updatePanelPosition();
  }, [isOpen, content, updatePanelPosition]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleViewportChange = () => updatePanelPosition();
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);
    return () => {
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [isOpen, updatePanelPosition]);

  const portalTarget = typeof document === "undefined" ? null : document.body;
  const normalizedContent = normalizePopoverContent(content);

  return (
    <div className={classNames("inline-flex", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="inline-flex h-6 w-6 items-center justify-center rounded-[var(--radius-xl)] border border-transparent bg-transparent p-0 text-slate-500 transition hover:text-primary focus:outline-hidden focus:ring-2 focus:ring-primary/30"
        style={{ borderRadius: GLOBAL_RADIUS }}
        onClick={() => setIsOpen((previous) => !previous)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="3 3 18 18"
          fill="none"
          stroke="#64748b"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="block"
        >
          <rect x="4" y="4" width="16" height="16" rx="3" ry="3" />
          <path d="M12 9h.01" />
          <path d="M11 12h1v4h1" />
        </svg>
      </button>

      {isOpen && portalTarget
        ? createPortal(
            <div
              ref={panelRef}
              role="dialog"
              style={{ ...panelStyle, borderRadius: GLOBAL_RADIUS }}
              className={classNames(
                "z-360000 min-w-[220px] max-w-[calc(100vw-1rem)] rounded-[var(--radius-xl)] border border-slate-200 bg-white p-3 shadow-lg",
                panelClassName
              )}
            >
              <p className="text-[12px] text-slate-700 whitespace-pre-line">{normalizedContent}</p>
            </div>,
            portalTarget
          )
        : null}
    </div>
  );
};

export default InfoPopoverIconButton;
