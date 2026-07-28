import React, { useRef } from "react";
import { createPortal } from "react-dom";
import {
  useFloatingPosition,
  type FloatingWidthStrategy,
} from "../../hooks/useFloatingPosition.ts";

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
  widthStrategy?: FloatingWidthStrategy;
  desktopMaxWidthPx?: number;
  desktopBreakpointPx?: number;
  offset?: number;
  viewportPadding?: number;
  children: React.ReactNode;
};

const DEFAULT_DESKTOP_MIN_WIDTH_PX = 360;
const DEFAULT_DESKTOP_MAX_WIDTH_PX = 480;

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
  matchAvailableWidth,
  widthStrategy,
  desktopMaxWidthPx,
  desktopBreakpointPx,
  offset,
  viewportPadding,
  children,
}: Props) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const resolvedWidthStrategy =
    widthStrategy ??
    (matchAvailableWidth === true ? "viewport" : matchAvailableWidth === false ? "anchor" : "responsive");
  const resolvedMinWidthPx =
    minWidthPx ?? (resolvedWidthStrategy === "responsive" ? DEFAULT_DESKTOP_MIN_WIDTH_PX : undefined);
  const resolvedDesktopMaxWidthPx =
    desktopMaxWidthPx ?? (resolvedWidthStrategy === "responsive" ? DEFAULT_DESKTOP_MAX_WIDTH_PX : undefined);
  const style = useFloatingPosition(anchorRef, open, {
    overlayRef: panelRef,
    autoFitViewport,
    widthStrategy: resolvedWidthStrategy,
    preferredWidth: fixedWidthPx,
    minWidth: resolvedMinWidthPx,
    desktopMaxWidth: resolvedDesktopMaxWidthPx,
    desktopBreakpoint: desktopBreakpointPx,
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
        width: style.width,
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
