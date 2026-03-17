import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState, type RefObject } from "react";

type PageBottomActionsInsets = {
  left: number;
  right: number;
};

type UsePageBottomActionsVisibilityResult = {
  reservedHeight: number;
  wrapperRef: RefObject<HTMLDivElement | null>;
  contentInsets: PageBottomActionsInsets | null;
};

const MIN_PAGE_BOTTOM_ACTIONS_SIDE_GAP = 8;

// Returns true when the card is rendered and can be used as a layout reference.
const isVisibleLayoutCard = (element: HTMLElement): boolean => {
  if (typeof window === "undefined") return false;

  const styles = window.getComputedStyle(element);
  if (styles.display === "none" || styles.visibility === "hidden") {
    return false;
  }

  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
};

// Finds the first visible timeline card and maps its horizontal frame to viewport insets.
const resolveTimelineCardInsets = (): PageBottomActionsInsets | null => {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return null;
  }

  const cards = document.querySelectorAll<HTMLElement>(".timeline-item .timeline-card, .timeline-box .timeline-card");
  for (const card of cards) {
    if (!isVisibleLayoutCard(card)) continue;

    const rect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
    if (viewportWidth <= 0) return null;

    return {
      left: Math.max(MIN_PAGE_BOTTOM_ACTIONS_SIDE_GAP, Math.round(rect.left)),
      right: Math.max(MIN_PAGE_BOTTOM_ACTIONS_SIDE_GAP, Math.round(viewportWidth - rect.right)),
    };
  }

  return null;
};

// Tracks the bottom action bar height so the page reserves enough space for it.
export const usePageBottomActionsVisibility = (): UsePageBottomActionsVisibilityResult => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [reservedHeight, setReservedHeight] = useState(0);
  const [contentInsets, setContentInsets] = useState<PageBottomActionsInsets | null>(null);

  const measureLayout = useEffectEvent(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const nextHeight = Math.ceil(wrapper.getBoundingClientRect().height);
    setReservedHeight((previous) => (Math.abs(previous - nextHeight) < 1 ? previous : nextHeight));

    const nextInsets = resolveTimelineCardInsets();
    setContentInsets((previous) => {
      if (!previous && !nextInsets) return previous;
      if (previous && nextInsets && previous.left === nextInsets.left && previous.right === nextInsets.right) {
        return previous;
      }
      return nextInsets;
    });
  });

  const scheduleMeasure = useEffectEvent(() => {
    if (typeof window === "undefined") return;

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      measureLayout();
    });
  });

  useLayoutEffect(() => {
    measureLayout();

    if (typeof ResizeObserver === "undefined") return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new ResizeObserver(() => {
      scheduleMeasure();
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof MutationObserver === "undefined" || typeof document === "undefined") return;

    const body = document.body;
    if (!body) return;

    const observer = new MutationObserver(() => {
      scheduleMeasure();
    });

    observer.observe(body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      scheduleMeasure();
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
  }, []);

  return {
    reservedHeight,
    wrapperRef,
    contentInsets,
  };
};
