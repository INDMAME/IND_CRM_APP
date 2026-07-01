import React from "react";
import { createPortal } from "react-dom";
import { usePageBottomActionsVisibility } from "../../hooks/usePageBottomActionsVisibility.ts";
import { classNames } from "../../utils/classNames.ts";

const PAGE_BOTTOM_FIXED_CONTENT_TOP_PADDING_PX = 12;
const PAGE_BOTTOM_FIXED_CONTENT_COMPACT_TOP_PADDING_PX = 4;
const PAGE_BOTTOM_FIXED_CONTENT_SIDE_PADDING_PX = 8;
const PAGE_BOTTOM_FIXED_CONTENT_BOTTOM_PADDING = "calc(0.75rem + env(safe-area-inset-bottom, 0px))";
const PAGE_BOTTOM_FIXED_CONTENT_COMPACT_BOTTOM_PADDING = "calc(0.35rem + env(safe-area-inset-bottom, 0px))";

type PageBottomFixedContentVariant = "standard" | "compact";

type PageBottomFixedContentProps = {
  children: React.ReactNode;
  variant?: PageBottomFixedContentVariant;
  className?: string;
  innerClassName?: string;
};

// Keeps arbitrary page controls visible at the bottom while reserving their layout height.
const PageBottomFixedContent = ({
  children,
  variant = "standard",
  className,
  innerClassName,
}: PageBottomFixedContentProps) => {
  const { reservedHeight, wrapperRef, contentInsets } = usePageBottomActionsVisibility();
  const portalTarget = typeof document === "undefined" ? null : document.body;
  const isCompact = variant === "compact";
  const topPaddingPx = isCompact ? PAGE_BOTTOM_FIXED_CONTENT_COMPACT_TOP_PADDING_PX : PAGE_BOTTOM_FIXED_CONTENT_TOP_PADDING_PX;
  const bottomPadding = isCompact ? PAGE_BOTTOM_FIXED_CONTENT_COMPACT_BOTTOM_PADDING : PAGE_BOTTOM_FIXED_CONTENT_BOTTOM_PADDING;

  if (!children) {
    return null;
  }

  const fixedContent = (
    <div
      ref={wrapperRef}
      className={classNames(
        "fixed inset-x-0 bottom-0 z-1900 border-t border-slate-200/90 bg-white shadow-[0_-10px_28px_rgba(15,23,42,0.12)]",
        className || ""
      )}
    >
      <div
        className="w-full"
        style={{
          paddingTop: `${topPaddingPx}px`,
          paddingLeft: `${contentInsets?.left ?? PAGE_BOTTOM_FIXED_CONTENT_SIDE_PADDING_PX}px`,
          paddingRight: `${contentInsets?.right ?? PAGE_BOTTOM_FIXED_CONTENT_SIDE_PADDING_PX}px`,
          paddingBottom: bottomPadding,
        }}
      >
        <div className={classNames("pointer-events-auto w-full", innerClassName || "")}>{children}</div>
      </div>
    </div>
  );

  return (
    <>
      <div aria-hidden="true" style={{ height: `${reservedHeight}px` }} />
      {portalTarget ? createPortal(fixedContent, portalTarget) : null}
    </>
  );
};

export default PageBottomFixedContent;
