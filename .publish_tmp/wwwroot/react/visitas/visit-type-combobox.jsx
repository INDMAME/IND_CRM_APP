import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { ChevronDownSvg, ChevronUpSvg } from "./chevrons.jsx";

function normalizeOption(opt) {
  if (!opt) return { value: "", text: "" };
  return {
    value: opt.value ?? opt.Value ?? "",
    text: opt.text ?? opt.Text ?? "",
  };
}

const classNames = (...classes) => classes.filter(Boolean).join(" ");

const IND_I18N = globalThis.__IND_I18N__ || {};
const indT = (key, fallback) => (IND_I18N && typeof IND_I18N[key] === "string" && IND_I18N[key]) || fallback || key;

function useFloatingPosition(targetRef, open) {
  const [style, setStyle] = useState({ top: 0, left: 0, width: 0 });

  useLayoutEffect(() => {
    if (!open || !targetRef.current) return;
    const update = () => {
      const rect = targetRef.current.getBoundingClientRect();
      setStyle({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      });
    };
    update();
    const onScroll = () => open && update();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", update);
    };
  }, [open, targetRef]);

  return style;
}

function FloatingList({ anchorRef, open, zIndex = 360000, maxHeightClass = "max-h-72", children }) {
  const style = useFloatingPosition(anchorRef, open);
  if (!open) return null;
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: style.top,
        left: style.left,
        width: style.width,
        zIndex,
      }}
    >
      <div className={`w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass}`}>
        {children}
      </div>
    </div>,
    document.body
  );
}

function useOutsideClick(refs, onClose) {
  // Mantén la última callback sin re-enganchar listeners en cada render.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Evita dependencias inestables como arrays literales.
  const refsRef = useRef(refs);
  refsRef.current = refs;

  useEffect(() => {
    const handler = (ev) => {
      const currentRefs = refsRef.current;
      const list = Array.isArray(currentRefs) ? currentRefs : [currentRefs];
      const inside = list.some((r) => r?.current && r.current.contains(ev.target));
      if (inside) return;
      onCloseRef.current?.();
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);
}

const VisitTypeCombobox = ({ options = [], targetId = "visitType" }) => {
  const normalized = useMemo(() => options.map(normalizeOption), [options]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(
    normalized.find((x) => x.value) ?? { value: "", text: "" }
  );
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const listRef = useRef(null);

  // Keep the underlying select (for existing JS) in sync
  useEffect(() => {
    const select = document.getElementById(targetId);
    if (select && selected) {
      select.value = selected.value;
      select.dispatchEvent(new Event("change"));
    }
  }, [selected, targetId]);

  const filtered =
    query.trim() === ""
      ? normalized
      : normalized.filter((opt) =>
          opt.text.toLowerCase().includes(query.toLowerCase())
        );

  useEffect(() => {
    setActiveIndex(0);
  }, [query, normalized.length]);

  useEffect(() => {
    if (selected?.text) setQuery(selected.text);
  }, [selected]);

  useOutsideClick([containerRef, listRef], () => setOpen(false));

  const selectOption = (opt) => {
    setSelected(opt);
    setQuery(opt.text);
    setOpen(false);
  };

  const onKeyDown = (ev) => {
    if (!open && (ev.key === "ArrowDown" || ev.key === "Enter")) {
      setOpen(true);
      return;
    }
    if (!filtered.length) return;
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setActiveIndex((idx) => (idx + 1) % filtered.length);
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      selectOption(filtered[activeIndex] ?? filtered[0]);
    }
    if (ev.key === "Escape") {
      setOpen(false);
    }
  };

  if (!normalized.length) return null;

  return (
    <div className="relative z-140000" ref={containerRef}>
      <div className="relative mt-1">
        <div
          ref={boxRef}
          className="relative w-full cursor-default rounded-md border border-slate-300 bg-white text-left shadow-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary sm:text-sm"
        >
          <input
            className="w-full border-none bg-transparent py-2 pl-3 pr-10 text-sm leading-5 text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            aria-label={indT("Visits_Detail_VisitType_Label", "Visit type")}
            role="combobox"
            aria-expanded={open}
            aria-controls="visit-type-options"
            aria-activedescendant={
              open && filtered[activeIndex] ? `visit-type-${filtered[activeIndex].value}` : undefined
            }
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-slate-500 hover:text-slate-600"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options")}
          >
            {open ? <ChevronUpSvg className="h-5 w-5" /> : <ChevronDownSvg className="h-5 w-5" />}
          </button>
        </div>
        <FloatingList anchorRef={boxRef} open={open} zIndex={360000}>
          <div ref={listRef} role="listbox" aria-label={indT("Visits_Detail_VisitType_Label", "Visit type")}>
            {filtered.length === 0 ? (
              <div className="relative cursor-default select-none px-4 py-2 text-slate-700">{indT("Dropdown_NoResults", "No results")}</div>
            ) : (
              filtered.map((opt, idx) => {
                const isActive = idx === activeIndex;
                const isSelected = selected?.value === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    id={`visit-type-${opt.value}`}
                    role="option"
                    aria-selected={isSelected}
                    className={classNames(
                      "relative flex w-full cursor-default select-none items-center py-2 pl-8 pr-3 text-left text-sm",
                      isActive ? "bg-primary text-white" : isSelected ? "bg-primary/10 text-primary" : "text-slate-900"
                    )}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => selectOption(opt)}
                  >
                    {isSelected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 left-0 flex items-center pl-2",
                          isActive ? "text-white" : "text-primary"
                        )}
                      ></span>
                    )}
                    <span className={classNames("block truncate pr-2", isSelected ? "font-medium" : "font-normal")}>
                      {opt.text}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </FloatingList>
      </div>
    </div>
  );
};

// Mount helper
const mount = () => {
  /** @type {HTMLElement & { __indRoot?: import('react-dom/client').Root }} */
  const root = document.getElementById("visit-type-combobox-root");
  if (!root) return;
  const data = window.__VISIT_TYPES__ || [];

  const element = <VisitTypeCombobox options={data} targetId="visitType" />;

  // Evita doble-mount si este script se evalúa más de una vez.
  if (root.__indRoot) {
    root.__indRoot.render(element);
    return;
  }

  const reactRoot = createRoot(root);
  root.__indRoot = reactRoot;
  reactRoot.render(element);
};

if (document.readyState === "complete") {
  mount();
} else {
  window.addEventListener("DOMContentLoaded", mount);
}

export default VisitTypeCombobox;
