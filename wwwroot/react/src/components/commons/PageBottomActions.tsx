import React, { Children, cloneElement, isValidElement } from "react";
import { createPortal } from "react-dom";
import { usePageBottomActionsVisibility } from "../../hooks/usePageBottomActionsVisibility.ts";
import { classNames } from "../../utils/classNames.ts";

const MAX_PAGE_BOTTOM_ACTIONS = 4;
const PAGE_BOTTOM_ACTIONS_TOP_PADDING_PX = 12;
const PAGE_BOTTOM_ACTIONS_SIDE_PADDING_PX = 8;

type PageBottomActionsLayoutVariant = "timeline-aligned" | "centered-form";

type PageBottomActionButtonProps = {
  label: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit" | "reset";
  tabIndex?: number;
  fullWidth?: boolean;
};

type PageBottomActionsProps = {
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
  layoutVariant?: PageBottomActionsLayoutVariant;
};

// Dumb button used by the shared bottom action bar.
export const PageBottomActionButton = ({
  label,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button",
  tabIndex,
  fullWidth = false,
}: PageBottomActionButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel || label}
      tabIndex={tabIndex}
      className={classNames(
        "inline-block w-full rounded-[var(--radius-xl)] disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "col-span-2" : "",
        className || ""
      )}
    >
      <span className="flex min-h-[68px] w-full items-center justify-center rounded-[var(--radius-xl)] border border-[#001f4d]/80 bg-primary px-4 py-3.5 text-center text-[18px] font-bold leading-[1.1] text-white shadow-xs transition-colors duration-150 hover:bg-[#001f4d] sm:min-h-[72px] sm:px-5 sm:py-4 sm:text-[20px]">
        {label}
      </span>
    </button>
  );
};

PageBottomActionButton.displayName = "PageBottomActionButton";

// Fixed bottom action bar that stays visible while the page scrolls.
const PageBottomActions = ({
  children,
  ariaLabel,
  className,
  layoutVariant = "timeline-aligned",
}: PageBottomActionsProps) => {
  const actionButtons = Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<PageBottomActionButtonProps> =>
        isValidElement<PageBottomActionButtonProps>(child) && child.type === PageBottomActionButton
    )
    .slice(0, MAX_PAGE_BOTTOM_ACTIONS);

  const actionCount = actionButtons.length;
  const { reservedHeight, wrapperRef, contentInsets } = usePageBottomActionsVisibility();
  const portalTarget = typeof document === "undefined" ? null : document.body;
  const usesCenteredFormLayout = layoutVariant === "centered-form";

  if (actionCount < 1) {
    return null;
  }

  const actionBar = (
    <div
      ref={wrapperRef}
      className="fixed inset-x-0 bottom-0 z-1900 border-t border-slate-200/90 bg-white shadow-[0_-10px_28px_rgba(15,23,42,0.12)]"
    >
      <div
        className={classNames(
          "w-full [padding-left:var(--page-bottom-actions-left-inset)] [padding-right:var(--page-bottom-actions-right-inset)]",
          usesCenteredFormLayout ? "lg:px-4" : ""
        )}
        style={{
          ["--page-bottom-actions-left-inset" as "--page-bottom-actions-left-inset"]:
            `${contentInsets?.left ?? PAGE_BOTTOM_ACTIONS_SIDE_PADDING_PX}px`,
          ["--page-bottom-actions-right-inset" as "--page-bottom-actions-right-inset"]:
            `${contentInsets?.right ?? PAGE_BOTTOM_ACTIONS_SIDE_PADDING_PX}px`,
          paddingTop: `${PAGE_BOTTOM_ACTIONS_TOP_PADDING_PX}px`,
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))",
        } as React.CSSProperties}
      >
        <div
          role="toolbar"
          aria-label={ariaLabel}
          className={classNames(
            "pointer-events-auto w-full",
            usesCenteredFormLayout ? "lg:mx-auto lg:max-w-3xl" : "",
            className || ""
          )}
        >
          <div
            className={classNames(
              "grid grid-cols-2 gap-1.5",
              usesCenteredFormLayout && actionCount === 1 ? "lg:mx-auto lg:max-w-[480px]" : ""
            )}
          >
            {actionButtons.map((child, index) => {
              const shouldUseFullWidth = actionCount === 1 || (actionCount % 2 === 1 && index === actionCount - 1);
              return cloneElement(child, {
                fullWidth: shouldUseFullWidth,
                tabIndex: child.props.tabIndex,
                key: child.key ?? `page-bottom-action-${index}`,
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div aria-hidden="true" style={{ height: `${reservedHeight}px` }} />
      {portalTarget ? createPortal(actionBar, portalTarget) : null}
    </>
  );
};

export default PageBottomActions;
