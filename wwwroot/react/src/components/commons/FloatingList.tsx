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
  children: React.ReactNode;
};

const FloatingList = ({
  anchorRef,
  open,
  zIndex = 300000,
  maxHeightClass = "max-h-72",
  roundedClass = "rounded-md",
  role,
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
    >
      <div
        role={role}
        className={`w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass}`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export default FloatingList;
