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
const ASSISTANT_VISUAL_BASELINE_CORRECTION_PX = 6;
const ASSISTANT_LAUNCHER_SELECTOR = "[data-ind-assistant-launcher='true']";
const PAGE_FLOATING_CLEARANCE_CSS_VAR = "--ind-page-floating-clearance";

// Returns true when one DOM element is actually visible and can define a visual baseline.
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

  const launchers = Array.from(document.querySelectorAll<HTMLElement>(ASSISTANT_LAUNCHER_SELECTOR));
  for (const launcher of launchers) {
    if (isVisibleLayoutElement(launcher)) {
      return launcher;
    }
  }

  return null;
};

const setPageFloatingClearance = (clearance: number): void => {
  if (typeof document === "undefined") return;

  const safeValue = `${Math.max(0, Math.ceil(clearance))}px`;
  document.documentElement.style.setProperty(PAGE_FLOATING_CLEARANCE_CSS_VAR, safeValue);
  document.getElementById("content")?.style.setProperty(PAGE_FLOATING_CLEARANCE_CSS_VAR, safeValue);
};

const clearPageFloatingClearance = (): void => {
  if (typeof document === "undefined") return;

  document.documentElement.style.removeProperty(PAGE_FLOATING_CLEARANCE_CSS_VAR);
  document.getElementById("content")?.style.removeProperty(PAGE_FLOATING_CLEARANCE_CSS_VAR);
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

  return Math.max(0, launcherBottom - ASSISTANT_VISUAL_BASELINE_CORRECTION_PX + additionalClearance);
};

// Reserves one shared ending lane for floating UI without depending on pagination position.
const resolveReservedHeight = (bottom: number, size: number): number => {
  return Math.max(0, Math.ceil(bottom + Math.max(40, size) + FAB_CONTENT_CLEARANCE_PX));
};

// Keeps the floating action button aligned with other floating UI and exposes one page clearance lane.
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
    const nextReservedHeight = resolveReservedHeight(nextBottom, size);

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
    setPageFloatingClearance(reservedHeight);

    return () => {
      clearPageFloatingClearance();
    };
  }, [reservedHeight]);

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
