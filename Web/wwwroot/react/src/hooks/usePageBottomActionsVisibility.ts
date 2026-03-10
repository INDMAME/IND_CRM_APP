import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState, type RefObject } from "react";

const SCROLL_IDLE_DELAY_MS = 180;

type UsePageBottomActionsVisibilityResult = {
  isVisible: boolean;
  reservedHeight: number;
  wrapperRef: RefObject<HTMLDivElement | null>;
};

// Tracks the bottom action bar height and hides it while the page is moving.
export const usePageBottomActionsVisibility = (): UsePageBottomActionsVisibilityResult => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollIdleTimeoutRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [reservedHeight, setReservedHeight] = useState(0);

  const measureHeight = useEffectEvent(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const nextHeight = Math.ceil(wrapper.getBoundingClientRect().height);
    setReservedHeight((previous) => (Math.abs(previous - nextHeight) < 1 ? previous : nextHeight));
  });

  const scheduleMeasure = useEffectEvent(() => {
    if (typeof window === "undefined") return;

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      measureHeight();
    });
  });

  useLayoutEffect(() => {
    measureHeight();

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
    if (typeof window === "undefined") return;

    const handleMotion = () => {
      setIsVisible(false);

      if (scrollIdleTimeoutRef.current !== null) {
        window.clearTimeout(scrollIdleTimeoutRef.current);
      }

      scrollIdleTimeoutRef.current = window.setTimeout(() => {
        scrollIdleTimeoutRef.current = null;
        scheduleMeasure();
        setIsVisible(true);
      }, SCROLL_IDLE_DELAY_MS);
    };

    const handleResize = () => {
      scheduleMeasure();
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
  }, []);

  return {
    isVisible,
    reservedHeight,
    wrapperRef,
  };
};
