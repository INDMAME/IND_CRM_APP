import { useEffect, useMemo, useRef } from "react";

export const useOutsideClick = (
  refs: React.RefObject<HTMLElement> | Array<React.RefObject<HTMLElement>>,
  onClose: () => void
) => {
  const list = useMemo(() => (Array.isArray(refs) ? refs : [refs]), [refs]);
  const listRef = useRef(list);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    listRef.current = list;
  }, [list]);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const handler = (ev: MouseEvent | TouchEvent) => {
      const currentList = listRef.current;
      const isInside = currentList.some((r) => r?.current && r.current.contains(ev.target as Node));
      if (isInside) return;
      onCloseRef.current();
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);
};
