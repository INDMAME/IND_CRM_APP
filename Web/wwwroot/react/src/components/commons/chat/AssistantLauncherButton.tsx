import React, {
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";
import { classNames } from "../../../utils/classNames.ts";

export type AssistantLauncherDesktopPlacement = "content-frame" | "viewport-start";
export type AssistantLauncherLayoutVariant = "floating" | "inline";

export type AssistantLauncherImageSources = {
  animatedWebp: string;
  animatedGif: string;
  reducedMotionPng: string;
};

type AssistantLauncherButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "type"
> & {
  imageSources: AssistantLauncherImageSources;
  layoutVariant?: AssistantLauncherLayoutVariant;
  desktopPlacement?: AssistantLauncherDesktopPlacement;
  bottomInset?: string;
  buttonRef?: RefObject<HTMLButtonElement | null>;
  children?: ReactNode;
};

export const ASSISTANT_PAGE_INSET = "max(12px, calc(50vw - 24rem + 12px))";
export const ASSISTANT_BOTTOM_INSET = "calc(0.75rem + env(safe-area-inset-bottom, 0px))";

const DESKTOP_PLACEMENT_CLASS_NAMES: Record<AssistantLauncherDesktopPlacement, string> = {
  "content-frame": "",
  "viewport-start": "lg:left-4",
};
const LAYOUT_VARIANT_CLASS_NAMES: Record<AssistantLauncherLayoutVariant, string> = {
  floating: "fixed z-[1850] [bottom:var(--assistant-bottom-inset)] [left:var(--assistant-page-inset)]",
  inline: "relative z-20 max-w-full gap-3 self-center",
};

// Renders the standard assistant launcher in floating or inline layouts.
const AssistantLauncherButton = ({
  imageSources,
  layoutVariant = "floating",
  desktopPlacement = "content-frame",
  bottomInset = ASSISTANT_BOTTOM_INSET,
  buttonRef,
  children,
  className,
  style,
  ...buttonProps
}: AssistantLauncherButtonProps) => {
  const launcherStyle = layoutVariant === "floating"
    ? {
        ...style,
        ["--assistant-page-inset" as "--assistant-page-inset"]: ASSISTANT_PAGE_INSET,
        ["--assistant-bottom-inset" as "--assistant-bottom-inset"]: bottomInset,
      } as CSSProperties
    : style;

  return (
    <button
      {...buttonProps}
      ref={buttonRef}
      type="button"
      data-ind-assistant-launcher="true"
      className={classNames(
        "group flex items-center rounded-[var(--radius-xl)] bg-transparent p-0 text-left shadow-none transition duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/25",
        LAYOUT_VARIANT_CLASS_NAMES[layoutVariant],
        layoutVariant === "floating" ? DESKTOP_PLACEMENT_CLASS_NAMES[desktopPlacement] : "",
        className
      )}
      style={launcherStyle}
    >
      <span className="relative flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-xl)] border border-slate-300/95 bg-white/98 p-[2px] shadow-[0_10px_26px_rgba(148,163,184,0.24),0_3px_10px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/80 backdrop-blur-sm">
        <picture className="flex h-[54px] w-[54px] shrink-0 items-center justify-center">
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet={imageSources.reducedMotionPng}
            type="image/png"
          />
          <source srcSet={imageSources.animatedWebp} type="image/webp" />
          <img
            src={imageSources.animatedGif}
            width={60}
            height={60}
            alt=""
            className="h-[54px] w-[54px] scale-[1.04] rounded-[calc(var(--radius-xl)-2px)] object-contain drop-shadow-[0_6px_12px_rgba(15,23,42,0.16)]"
            aria-hidden="true"
          />
        </picture>
      </span>
      {children}
    </button>
  );
};

export default AssistantLauncherButton;
