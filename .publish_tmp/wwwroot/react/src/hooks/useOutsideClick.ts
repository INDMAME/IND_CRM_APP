import { useEffect } from "react";

export const useOutsideClick = (
  refs: React.RefObject<HTMLElement> | Array<React.RefObject<HTMLElement>>,
  onClose: () => void
) => {
  useEffect(() => {
    const list = Array.isArray(refs) ? refs : [refs];
    const handler = (ev: MouseEvent | TouchEvent) => {
      const isInside = list.some((r) => r?.current && r.current.contains(ev.target as Node));
      if (isInside) return;
      onClose();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [onClose, refs]);
};
