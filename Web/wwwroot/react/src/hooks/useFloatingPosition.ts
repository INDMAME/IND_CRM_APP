import { useLayoutEffect, useState, type RefObject } from "react";

type FloatingPlacement = "bottom" | "top";

type FloatingPositionOptions = {
  overlayRef?: RefObject<HTMLElement | null>;
  offset?: number;
  viewportPadding?: number;
  autoFitViewport?: boolean;
};

type FloatingPositionStyle = {
  top: number;
  left: number;
  width: number;
  maxHeight?: number;
  placement: FloatingPlacement;
};

const DEFAULT_OFFSET_PX = 6;
const DEFAULT_VIEWPORT_PADDING_PX = 12;

const clamp = (value: number, min: number, max: number): number => {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
};

// Resolves a fixed floating position and optionally keeps the overlay inside the viewport.
export const useFloatingPosition = (
  targetRef: React.RefObject<HTMLElement>,
  open: boolean,
  {
    overlayRef,
    offset = DEFAULT_OFFSET_PX,
    viewportPadding = DEFAULT_VIEWPORT_PADDING_PX,
    autoFitViewport = false,
  }: FloatingPositionOptions = {}
) => {
  const [style, setStyle] = useState<FloatingPositionStyle>({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: undefined,
    placement: "bottom",
  });

  useLayoutEffect(() => {
    if (!open || !targetRef.current) return;

    const update = () => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (!rect) return;

      const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const overlayHeight = overlayRef?.current?.getBoundingClientRect().height || 0;
      const nextWidth = Math.min(rect.width, Math.max(0, viewportWidth - viewportPadding * 2));
      const nextLeft = clamp(rect.left, viewportPadding, viewportWidth - nextWidth - viewportPadding);

      if (!autoFitViewport) {
        setStyle({
          top: rect.bottom + offset,
          left: nextLeft,
          width: nextWidth,
          maxHeight: undefined,
          placement: "bottom",
        });
        return;
      }

      const availableBelow = Math.max(0, viewportHeight - rect.bottom - offset - viewportPadding);
      const availableAbove = Math.max(0, rect.top - offset - viewportPadding);
      const preferredPlacement: FloatingPlacement =
        overlayHeight > availableBelow && availableAbove > availableBelow ? "top" : "bottom";
      const availableHeight = preferredPlacement === "top" ? availableAbove : availableBelow;
      const constrainedHeight =
        availableHeight > 0 ? Math.min(overlayHeight || availableHeight, availableHeight) : Math.max(0, viewportHeight - viewportPadding * 2);
      const nextTop =
        preferredPlacement === "top"
          ? Math.max(viewportPadding, rect.top - offset - constrainedHeight)
          : Math.min(
              rect.bottom + offset,
              Math.max(viewportPadding, viewportHeight - constrainedHeight - viewportPadding)
            );

      setStyle({
        top: nextTop,
        left: nextLeft,
        width: nextWidth,
        maxHeight: Math.max(0, preferredPlacement === "top" ? nextTop + constrainedHeight - viewportPadding : availableHeight),
        placement: preferredPlacement,
      });
    };

    update();
    const onScroll = () => open && update();
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", update);
    };
  }, [open, targetRef]);

  return style;
};
