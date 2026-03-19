import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type UseFloatingActionButtonVisibilityArgs = {
  bottom: number;
  size: number;
};

type UseFloatingActionButtonVisibilityResult = {
  resolvedBottom: number;
  reservedHeight: number;
};

const DEFAULT_FAB_BOTTOM_PX = 24;
const FAB_CONTENT_CLEARANCE_PX = 12;
const PAGINATION_SELECTOR = "[data-ind-pagination-anchor='true']";
const LAYOUT_CARD_SELECTOR = ".timeline-item .timeline-card, .timeline-box .timeline-card, [data-ind-card-anchor='true']";
const ASSISTANT_LAUNCHER_SELECTOR = "[data-ind-assistant-launcher='true']";

const getPaginationElements = () => {
  if (typeof document === "undefined") return [];
  return Array.from(document.querySelectorAll<HTMLElement>(PAGINATION_SELECTOR));
};

const getLayoutCardElements = () => {
  if (typeof document === "undefined") return [];
  return Array.from(document.querySelectorAll<HTMLElement>(LAYOUT_CARD_SELECTOR));
};

// Returns true when one layout anchor is rendered and can define the page ending.
const isVisibleLayoutElement = (element: HTMLElement): boolean => {
  if (typeof window === "undefined") return false;

  const styles = window.getComputedStyle(element);
  if (styles.display === "none" || styles.visibility === "hidden") {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
};

// Finds one visible assistant launcher so the FAB can share the same baseline.
const getVisibleAssistantLauncher = (): HTMLElement | null => {
  if (typeof document === "undefined") return null;

  const launchers = document.querySelectorAll<HTMLElement>(ASSISTANT_LAUNCHER_SELECTOR);
  for (const launcher of launchers) {
    if (isVisibleLayoutElement(launcher)) {
      return launcher;
    }
  }

  return null;
};

// Resolves the bottom distance. When the assistant launcher exists, it becomes the visual baseline.
const resolveBottomOffset = (bottom: number): number => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return Math.max(0, bottom);
  }

  const assistantLauncher = getVisibleAssistantLauncher();
  if (!assistantLauncher) {
    return Math.max(0, bottom);
  }

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const launcherRect = assistantLauncher.getBoundingClientRect();
  const launcherBottom = Math.max(0, Math.round(viewportHeight - launcherRect.bottom));
  const additionalClearance = Math.max(0, bottom - DEFAULT_FAB_BOTTOM_PX);

  return Math.max(0, launcherBottom + additionalClearance);
};

// The page only needs the extra trailing space when there is a card list or one pagination block to clear.
const hasTrailingContentAnchor = (): boolean => {
  return (
    getPaginationElements().some((element) => isVisibleLayoutElement(element)) ||
    getLayoutCardElements().some((element) => isVisibleLayoutElement(element))
  );
};

// Keeps the floating action button aligned with other floating UI and reserves one clean ending lane.
export const useFloatingActionButtonVisibility = ({
  bottom,
  size,
}: UseFloatingActionButtonVisibilityArgs): UseFloatingActionButtonVisibilityResult => {
  const [resolvedBottom, setResolvedBottom] = useState(bottom);
  const [reservedHeight, setReservedHeight] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  const updateLayout = useCallback(() => {
    if (typeof window === "undefined") return;

    const nextBottom = resolveBottomOffset(bottom);
    const nextReservedHeight = hasTrailingContentAnchor()
      ? Math.ceil(nextBottom + Math.max(40, size) + FAB_CONTENT_CLEARANCE_PX)
      : 0;

    setResolvedBottom((previous) => (Math.abs(previous - nextBottom) < 1 ? previous : nextBottom));
    setReservedHeight((previous) => (Math.abs(previous - nextReservedHeight) < 1 ? previous : nextReservedHeight));
  }, [bottom, size]);

  const scheduleLayoutUpdate = useCallback(() => {
    if (typeof window === "undefined") return;

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      updateLayout();
    });
  }, [updateLayout]);

  useLayoutEffect(() => {
    updateLayout();
  }, [updateLayout]);

  useEffect(() => {
    if (typeof MutationObserver === "undefined" || typeof document === "undefined") return;

    const body = document.body;
    if (!body) return;

    const observer = new MutationObserver(() => {
      scheduleLayoutUpdate();
    });

    observer.observe(body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [scheduleLayoutUpdate]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      scheduleLayoutUpdate();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [scheduleLayoutUpdate]);

  return {
    resolvedBottom,
    reservedHeight,
  };
};
