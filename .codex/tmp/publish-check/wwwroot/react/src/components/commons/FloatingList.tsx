import React from "react";
import { createPortal } from "react-dom";
import { useFloatingPosition } from "../../hooks/useFloatingPosition.ts";

type Props = {
  anchorRef: React.RefObject<HTMLElement>;
  open: boolean;
  zIndex?: number;
  maxHeightClass?: string;
  roundedClass?: string;
  role?: string;
  portalClassName?: string;
  panelClassName?: string;
  children: React.ReactNode;
};

const FloatingList = ({
  anchorRef,
  open,
  zIndex = 300000,
  maxHeightClass = "max-h-72",
  roundedClass = "rounded-md",
  role,
  portalClassName,
  panelClassName,
  children,
}: Props) => {
  const style = useFloatingPosition(anchorRef, open);
  if (!open) return null;
  return createPortal(
    <div
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
        role={role}
        className={`w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass} ${panelClassName || ""}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default FloatingList;
