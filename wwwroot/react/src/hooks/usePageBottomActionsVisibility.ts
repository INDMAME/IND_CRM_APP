import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState, type RefObject } from "react";

type UsePageBottomActionsVisibilityResult = {
  reservedHeight: number;
  wrapperRef: RefObject<HTMLDivElement | null>;
};

// Tracks the bottom action bar height so the page reserves enough space for it.
export const usePageBottomActionsVisibility = (): UsePageBottomActionsVisibilityResult => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
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
  };
};
