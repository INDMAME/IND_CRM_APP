import React, { useRef } from "react";
import { createPortal } from "react-dom";
import { useFloatingPosition } from "../../hooks/useFloatingPosition.ts";

type Props = {
  anchorRef: React.RefObject<HTMLElement>;
  open: boolean;
  zIndex?: number;
  fixedWidthPx?: number;
  minWidthPx?: number;
  maxHeightClass?: string;
  roundedClass?: string;
  role?: string;
  portalClassName?: string;
  panelClassName?: string;
  panelStyle?: React.CSSProperties;
  autoFitViewport?: boolean;
  matchAvailableWidth?: boolean;
  offset?: number;
  viewportPadding?: number;
  children: React.ReactNode;
};

const FloatingList = ({
  anchorRef,
  open,
  zIndex = 300000,
  fixedWidthPx,
  minWidthPx,
  maxHeightClass = "max-h-72",
  roundedClass = "rounded-[var(--radius-xl)]",
  role,
  portalClassName,
  panelClassName,
  panelStyle,
  autoFitViewport = true,
  matchAvailableWidth = true,
  offset,
  viewportPadding,
  children,
}: Props) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const style = useFloatingPosition(anchorRef, open, {
    overlayRef: panelRef,
    autoFitViewport,
    matchAvailableWidth,
    minWidth: minWidthPx,
    offset,
    viewportPadding,
  });
  if (!open) return null;
  return createPortal(
    <div
      data-floating-placement={style.placement}
      style={{
        position: "fixed",
        top: style.top,
        left: style.left,
        width: !matchAvailableWidth && typeof fixedWidthPx === "number" && Number.isFinite(fixedWidthPx) ? fixedWidthPx : style.width,
        zIndex,
      }}
      className={portalClassName}
    >
      <div
        ref={panelRef}
        role={role}
        className={`w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass} ${panelClassName || ""}`}
        style={{
          maxHeight: style.maxHeight,
          overscrollBehavior: "contain",
          ...panelStyle,
        }}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default FloatingList;
