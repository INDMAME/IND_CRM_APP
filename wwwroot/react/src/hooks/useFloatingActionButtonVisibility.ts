import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type UseFloatingActionButtonVisibilityArgs = {
  bottom: number;
  right: number;
  size: number;
};

type UseFloatingActionButtonVisibilityResult = {
  resolvedBottom: number;
};

const PAGINATION_CLEARANCE_PX = 16;
const PAGINATION_SELECTOR = "[data-ind-pagination-anchor='true']";

const getPaginationElements = () => {
  if (typeof document === "undefined") return [];
  return Array.from(document.querySelectorAll<HTMLElement>(PAGINATION_SELECTOR));
};

const resolveBottomOffset = ({
  bottom,
  right,
  size,
  viewportHeight,
  viewportWidth,
  paginations,
}: {
  bottom: number;
  right: number;
  size: number;
  viewportHeight: number;
  viewportWidth: number;
  paginations: HTMLElement[];
}) => {
  const fabLeft = viewportWidth - right - size;
  const fabRight = viewportWidth - right;

  return paginations.reduce((nextBottom, element) => {
    const rect = element.getBoundingClientRect();
    const isVisibleInViewport = rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < viewportHeight;
    if (!isVisibleInViewport) {
      return nextBottom;
    }

    const overlapsFabLane = fabRight > rect.left - PAGINATION_CLEARANCE_PX && fabLeft < rect.right + PAGINATION_CLEARANCE_PX;
    if (!overlapsFabLane) {
      return nextBottom;
    }

    const requiredBottom = Math.ceil(viewportHeight - rect.top + PAGINATION_CLEARANCE_PX);
    return Math.max(nextBottom, requiredBottom);
  }, Math.max(0, bottom));
};

// Keeps the floating action button clear of visible paginations.
export const useFloatingActionButtonVisibility = ({
  bottom,
  right,
  size,
}: UseFloatingActionButtonVisibilityArgs): UseFloatingActionButtonVisibilityResult => {
  const [resolvedBottom, setResolvedBottom] = useState(bottom);
  const animationFrameRef = useRef<number | null>(null);

  const updateBottom = useCallback(() => {
    if (typeof window === "undefined") return;

    const nextBottom = resolveBottomOffset({
      bottom,
      right,
      size,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
      paginations: getPaginationElements(),
    });

    setResolvedBottom((previous) => (Math.abs(previous - nextBottom) < 1 ? previous : nextBottom));
  }, [bottom, right, size]);

  const scheduleBottomUpdate = useCallback(() => {
    if (typeof window === "undefined") return;

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateBottom();
    });
  }, [updateBottom]);

  useLayoutEffect(() => {
    updateBottom();

    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => scheduleBottomUpdate());
    getPaginationElements().forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [scheduleBottomUpdate, updateBottom]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      scheduleBottomUpdate();
    };

    window.addEventListener("scroll", scheduleBottomUpdate, { capture: true, passive: true });
    window.addEventListener("wheel", scheduleBottomUpdate, { passive: true });
    window.addEventListener("touchmove", scheduleBottomUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("scroll", scheduleBottomUpdate, true);
      window.removeEventListener("wheel", scheduleBottomUpdate);
      window.removeEventListener("touchmove", scheduleBottomUpdate);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scheduleBottomUpdate]);

  return {
    resolvedBottom,
  };
};
