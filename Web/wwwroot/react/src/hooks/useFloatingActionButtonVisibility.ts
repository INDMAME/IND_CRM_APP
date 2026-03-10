import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type UseFloatingActionButtonVisibilityArgs = {
  bottom: number;
  right: number;
  size: number;
};

type UseFloatingActionButtonVisibilityResult = {
  isVisible: boolean;
  resolvedBottom: number;
};

const SCROLL_IDLE_DELAY_MS = 180;
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

// Keeps the floating action button hidden during scroll and clear of visible paginations.
export const useFloatingActionButtonVisibility = ({
  bottom,
  right,
  size,
}: UseFloatingActionButtonVisibilityArgs): UseFloatingActionButtonVisibilityResult => {
  const [isVisible, setIsVisible] = useState(true);
  const [resolvedBottom, setResolvedBottom] = useState(bottom);
  const animationFrameRef = useRef<number | null>(null);
  const scrollIdleTimeoutRef = useRef<number | null>(null);

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
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleMotion = () => {
      setIsVisible(false);
      scheduleBottomUpdate();

      if (scrollIdleTimeoutRef.current !== null) {
        window.clearTimeout(scrollIdleTimeoutRef.current);
      }

      scrollIdleTimeoutRef.current = window.setTimeout(() => {
        scrollIdleTimeoutRef.current = null;
        updateBottom();
        setIsVisible(true);
      }, SCROLL_IDLE_DELAY_MS);
    };

    const handleResize = () => {
      scheduleBottomUpdate();
    };

    window.addEventListener("scroll", handleMotion, { capture: true, passive: true });
    window.addEventListener("wheel", handleMotion, { passive: true });
    window.addEventListener("touchmove", handleMotion, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("scroll", handleMotion, true);
      window.removeEventListener("wheel", handleMotion);
      window.removeEventListener("touchmove", handleMotion);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);

      if (scrollIdleTimeoutRef.current !== null) {
        window.clearTimeout(scrollIdleTimeoutRef.current);
      }

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scheduleBottomUpdate, updateBottom]);

  return {
    isVisible,
    resolvedBottom,
  };
};
