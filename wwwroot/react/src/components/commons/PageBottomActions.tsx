import React, { Children, cloneElement, isValidElement } from "react";
import { createPortal } from "react-dom";
import { usePageBottomActionsVisibility } from "../../hooks/usePageBottomActionsVisibility.ts";
import { classNames } from "../../utils/classNames.ts";

const MAX_PAGE_BOTTOM_ACTIONS = 4;

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
        "relative inline-block w-full overflow-hidden rounded-[5px] disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "col-span-2" : "",
        className || ""
      )}
      style={{ padding: "5.3px 0" }}
    >
      <div
        aria-hidden="true"
        className="absolute bottom-[-11px] right-[-125%] z-0 h-[50%] w-[150%] rounded-md opacity-70 animate-star-movement-bottom"
        style={{ background: "radial-gradient(circle, rgba(0, 41, 107, 0.65), transparent 12%)", animationDuration: "2.5s" }}
      />
      <div
        aria-hidden="true"
        className="absolute top-[-10px] left-[-125%] z-0 h-[50%] w-[150%] rounded-md opacity-70 animate-star-movement-top"
        style={{ background: "radial-gradient(circle, rgba(0, 41, 107, 0.65), transparent 12%)", animationDuration: "2.5s" }}
      />
      <span className="primary-btn relative z-10 flex w-full items-center justify-center rounded-[5px] border border-[#001f4d]/70 bg-gradient-to-b from-[#00296b] to-[#001f4d] px-3 py-[12px] text-center text-[13px] text-white sm:px-4 sm:text-[14px]">
        {label}
      </span>
    </button>
  );
};

PageBottomActionButton.displayName = "PageBottomActionButton";

// Fixed bottom action bar that stays visible when the page is idle.
const PageBottomActions = ({ children, ariaLabel, className }: PageBottomActionsProps) => {
  const actionButtons = Children.toArray(children)
    .filter(
      (child): child is React.ReactElement<PageBottomActionButtonProps> =>
        isValidElement<PageBottomActionButtonProps>(child) && child.type === PageBottomActionButton
    )
    .slice(0, MAX_PAGE_BOTTOM_ACTIONS);

  const actionCount = actionButtons.length;
  const { isVisible, reservedHeight, wrapperRef } = usePageBottomActionsVisibility();
  const portalTarget = typeof document === "undefined" ? null : document.body;

  if (actionCount < 1) {
    return null;
  }

  const actionBar = (
    <div
      ref={wrapperRef}
      aria-hidden={!isVisible}
      className={classNames(
        "fixed inset-x-0 bottom-0 z-1900 transition-[opacity,transform] duration-200 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <div className="mx-auto max-w-[1140px] px-4 sm:px-6" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom, 0px))" }}>
        <div
          role="toolbar"
          aria-label={ariaLabel}
          className={classNames("pointer-events-auto rounded-[5px] border border-slate-200/80 bg-white/95 p-2 shadow-2xl backdrop-blur-md", className || "")}
        >
          <div className="grid grid-cols-2 gap-2">
            {actionButtons.map((child, index) => {
              const shouldUseFullWidth = actionCount === 1 || (actionCount % 2 === 1 && index === actionCount - 1);
              return cloneElement(child, {
                fullWidth: shouldUseFullWidth,
                tabIndex: isVisible ? child.props.tabIndex : -1,
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
