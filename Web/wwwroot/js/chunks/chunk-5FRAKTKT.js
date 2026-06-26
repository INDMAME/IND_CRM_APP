import {
  classNames
} from "./chunk-EGSPAV7B.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-63VW7TTG.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/components/commons/SelectCombobox.tsx
var import_react4 = __toESM(require_react());

// Web/wwwroot/react/src/components/commons/FloatingList.tsx
var import_react2 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/useFloatingPosition.ts
var import_react = __toESM(require_react());
var DEFAULT_OFFSET_PX = 6;
var DEFAULT_VIEWPORT_PADDING_PX = 12;
var clamp = (value, min, max) => {
  if (max < min) return min;
  return Math.min(Math.max(value, min), max);
};
var areFloatingStylesEqual = (left, right) => {
  return left.top === right.top && left.left === right.left && left.width === right.width && left.maxHeight === right.maxHeight && left.placement === right.placement;
};
var useFloatingPosition = (targetRef, open, {
  overlayRef,
  offset = DEFAULT_OFFSET_PX,
  viewportPadding = DEFAULT_VIEWPORT_PADDING_PX,
  autoFitViewport = false
} = {}) => {
  const [style, setStyle] = (0, import_react.useState)({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: void 0,
    placement: "bottom"
  });
  (0, import_react.useLayoutEffect)(() => {
    if (!open || !targetRef.current) return;
    const update = () => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (!rect) return;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
      const overlayElement = overlayRef?.current;
      const overlayRect = overlayElement?.getBoundingClientRect();
      const overlayHeight = Math.max(overlayRect?.height || 0, overlayElement?.scrollHeight || 0);
      const nextWidth = Math.min(rect.width, Math.max(0, viewportWidth - viewportPadding * 2));
      const nextLeft = clamp(rect.left, viewportPadding, viewportWidth - nextWidth - viewportPadding);
      if (!autoFitViewport) {
        const nextStyle2 = {
          top: rect.bottom + offset,
          left: nextLeft,
          width: nextWidth,
          maxHeight: void 0,
          placement: "bottom"
        };
        setStyle((previous) => areFloatingStylesEqual(previous, nextStyle2) ? previous : nextStyle2);
        return;
      }
      const availableBelow = Math.max(0, viewportHeight - rect.bottom - offset - viewportPadding);
      const availableAbove = Math.max(0, rect.top - offset - viewportPadding);
      const fallbackHeight = Math.max(availableBelow, availableAbove, 0);
      const preferredHeight = overlayHeight > 0 ? overlayHeight : fallbackHeight;
      const preferredPlacement = preferredHeight > availableBelow && availableAbove > availableBelow ? "top" : "bottom";
      const availableHeight = preferredPlacement === "top" ? availableAbove : availableBelow;
      const constrainedHeight = Math.max(
        0,
        availableHeight > 0 ? Math.min(preferredHeight || availableHeight, availableHeight) : viewportHeight - viewportPadding * 2
      );
      const nextTop = preferredPlacement === "top" ? Math.max(viewportPadding, rect.top - offset - constrainedHeight) : Math.min(
        rect.bottom + offset,
        Math.max(viewportPadding, viewportHeight - constrainedHeight - viewportPadding)
      );
      const nextStyle = {
        top: nextTop,
        left: nextLeft,
        width: nextWidth,
        maxHeight: constrainedHeight,
        placement: preferredPlacement
      };
      setStyle((previous) => areFloatingStylesEqual(previous, nextStyle) ? previous : nextStyle);
    };
    update();
    let animationFrame = 0;
    const scheduleUpdate = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      animationFrame = window.requestAnimationFrame(() => {
        animationFrame = 0;
        update();
      });
    };
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => {
      scheduleUpdate();
    });
    if (resizeObserver) {
      resizeObserver.observe(targetRef.current);
      if (overlayRef?.current) {
        resizeObserver.observe(overlayRef.current);
      }
    }
    const mutationObserver = typeof MutationObserver === "undefined" || !overlayRef?.current ? null : new MutationObserver(() => {
      scheduleUpdate();
    });
    mutationObserver?.observe(overlayRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    });
    const onScroll = () => open && scheduleUpdate();
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
      resizeObserver?.disconnect();
      mutationObserver?.disconnect();
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [autoFitViewport, offset, open, overlayRef, targetRef, viewportPadding]);
  return style;
};

// Web/wwwroot/react/src/components/commons/FloatingList.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var FloatingList = ({
  anchorRef,
  open,
  zIndex = 3e5,
  fixedWidthPx,
  maxHeightClass = "max-h-72",
  roundedClass = "rounded-[var(--radius-xl)]",
  role,
  portalClassName,
  panelClassName,
  panelStyle,
  autoFitViewport = true,
  offset,
  viewportPadding,
  children
}) => {
  const panelRef = (0, import_react2.useRef)(null);
  const style = useFloatingPosition(anchorRef, open, {
    overlayRef: panelRef,
    autoFitViewport,
    offset,
    viewportPadding
  });
  if (!open) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        "data-floating-placement": style.placement,
        style: {
          position: "fixed",
          top: style.top,
          left: style.left,
          width: typeof fixedWidthPx === "number" && Number.isFinite(fixedWidthPx) ? fixedWidthPx : style.width,
          zIndex
        },
        className: portalClassName,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            ref: panelRef,
            role,
            className: `w-full overflow-auto ${roundedClass} bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden ${maxHeightClass} ${panelClassName || ""}`,
            style: {
              maxHeight: style.maxHeight,
              overscrollBehavior: "contain",
              ...panelStyle
            },
            children
          }
        )
      }
    ),
    document.body
  );
};
var FloatingList_default = FloatingList;

// Web/wwwroot/react/src/components/commons/chevrons.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var ChevronDownSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m19.5 8.25-7.5 7.5-7.5-7.5" })
    }
  );
};
var ChevronUpSvg = ({ className = "h-5 w-5" }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      strokeWidth: 1.5,
      stroke: "currentColor",
      className,
      "aria-hidden": "true",
      children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m4.5 15.75 7.5-7.5 7.5 7.5" })
    }
  );
};

// Web/wwwroot/react/src/hooks/useOutsideClick.ts
var import_react3 = __toESM(require_react());
var useOutsideClick = (refs, onClose) => {
  const list = (0, import_react3.useMemo)(() => Array.isArray(refs) ? refs : [refs], [refs]);
  const listRef = (0, import_react3.useRef)(list);
  const onCloseRef = (0, import_react3.useRef)(onClose);
  (0, import_react3.useEffect)(() => {
    listRef.current = list;
  }, [list]);
  (0, import_react3.useEffect)(() => {
    onCloseRef.current = onClose;
  }, [onClose]);
  (0, import_react3.useEffect)(() => {
    const handler = (ev) => {
      const currentList = listRef.current;
      const isInside = currentList.some((r) => r?.current && r.current.contains(ev.target));
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

// Web/wwwroot/react/src/components/commons/SelectCombobox.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var EMPTY_OPTION = { value: "", text: "" };
var normalizeLookupText = (value) => {
  return String(value ?? "").trim().toLowerCase();
};
var SelectCombobox = ({
  label,
  options,
  value,
  onChange,
  inputRef,
  placeholder,
  invalid = false,
  disabled = false,
  readOnly = false,
  usePortal = true,
  emitOnValueChange = false,
  idBase,
  portalClassName,
  panelClassName,
  showSearchButton = false,
  allowTextInput = true,
  showLabel = true,
  selectedTextMode = "text",
  dropdownExpandPx = 0,
  dropdownMinWidthPx = 0,
  dropdownMaxHeightClass = "max-h-72",
  selectedIconClassName = "h-4 w-4",
  optionIconClassName = "h-4 w-4",
  allowOptionHorizontalScroll = false,
  lockDropdownWidthOnFirstOpen = false,
  disableDefaultOptionPadding = false,
  optionLeftPaddingClassName = "",
  optionTextClassName = "",
  optionDefaultClassName = "text-slate-900",
  optionActiveClassName = "bg-primary text-white",
  optionSelectedClassName = "bg-primary text-white",
  selectedInputPaddingClassName = "pl-9",
  panelStyle,
  clearOnEmptyInput = false
}) => {
  const assignInputRef = (node) => {
    if (!inputRef) return;
    if (typeof inputRef === "function") {
      inputRef(node);
      return;
    }
    inputRef.current = node;
  };
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const data = (0, import_react4.useMemo)(() => {
    return (options || []).map((o) => {
      if (Array.isArray(o)) {
        return { value: o[0] ?? "", text: o[1] ?? "" };
      }
      return {
        value: o?.value ?? o?.Value ?? "",
        text: o?.text ?? o?.Text ?? "",
        icon: o?.icon ?? o?.Icon
      };
    });
  }, [options]);
  const [query, setQuery] = (0, import_react4.useState)(null);
  const [selected, setSelected] = (0, import_react4.useState)(
    data.find((d) => String(d.value) === String(value)) || EMPTY_OPTION
  );
  const [open, setOpen] = (0, import_react4.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react4.useState)(0);
  const [showNotFoundState, setShowNotFoundState] = (0, import_react4.useState)(false);
  const containerRef = (0, import_react4.useRef)(null);
  const boxRef = (0, import_react4.useRef)(null);
  const listRef = (0, import_react4.useRef)(null);
  const initialDropdownWidthRef = (0, import_react4.useRef)(null);
  const clearManualValue = (nextOpen, showNotFound) => {
    setSelected(EMPTY_OPTION);
    setQuery("");
    setActiveIndex(0);
    setShowNotFoundState(showNotFound);
    setOpen(nextOpen);
    if (!emitOnValueChange) {
      onChange("");
    }
  };
  useOutsideClick([containerRef, listRef], () => {
    if (query !== null) {
      clearManualValue(false, false);
      return;
    }
    setShowNotFoundState(false);
    setOpen(false);
  });
  (0, import_react4.useEffect)(() => {
    const nextSelected = data.find((d) => String(d.value) === String(value)) || EMPTY_OPTION;
    setSelected(nextSelected);
    if (String(value ?? "").trim()) {
      setQuery(null);
      setShowNotFoundState(false);
    }
  }, [value, data]);
  (0, import_react4.useEffect)(() => {
    if (!emitOnValueChange) return;
    onChange(selected?.value ? String(selected.value) : "");
  }, [emitOnValueChange, onChange, selected]);
  const filtered = (0, import_react4.useMemo)(() => {
    if (!query || !query.trim()) return data;
    const normalizedQuery = normalizeLookupText(query);
    return data.filter((option) => {
      const optionValue = normalizeLookupText(option.value);
      const optionText = normalizeLookupText(option.text);
      return optionText.includes(normalizedQuery) || optionValue.includes(normalizedQuery);
    });
  }, [data, query]);
  const resolvedActiveIndex = filtered.length > 0 ? Math.min(Math.max(activeIndex, 0), filtered.length - 1) : 0;
  const selectOption = (opt) => {
    setSelected(opt);
    setQuery(null);
    setShowNotFoundState(false);
    setOpen(false);
    if (!emitOnValueChange) {
      onChange(opt?.value ? String(opt.value) : "");
    }
  };
  const handleKeyDown = (ev) => {
    if (disabled) return;
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      setOpen(true);
      if (filtered.length) setActiveIndex((idx) => (idx + 1) % filtered.length);
      return;
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      setOpen(true);
      if (filtered.length) setActiveIndex((idx) => (idx - 1 + filtered.length) % filtered.length);
      return;
    }
    if (ev.key === "Enter") {
      ev.preventDefault();
      if (clearOnEmptyInput && query !== null && !query.trim()) {
        setShowNotFoundState(false);
        setOpen(false);
        return;
      }
      if (open && filtered.length) {
        selectOption(filtered[resolvedActiveIndex] ?? filtered[0]);
      } else if (query !== null && query.trim()) {
        clearManualValue(true, true);
      } else {
        setShowNotFoundState(false);
        setOpen(true);
      }
    }
    if (ev.key === "Escape") {
      if (query !== null) {
        clearManualValue(false, false);
        return;
      }
      setShowNotFoundState(false);
      setOpen(false);
    }
  };
  const safeId = String(idBase || label || "select");
  const listId = `select-options-${safeId}`;
  const activeId = open && filtered[resolvedActiveIndex] ? `select-opt-${safeId}-${filtered[resolvedActiveIndex].value}` : void 0;
  const listOpen = open && !disabled;
  const selectedValue = String(selected?.value ?? "").trim();
  const selectedDisplayText = selectedTextMode === "value" ? selectedValue : selected?.text || "";
  const displayValue = query !== null ? query : selectedValue ? selectedDisplayText : "";
  const showSelectedIcon = query === null && !!selectedValue && !!selected?.icon;
  const showNotFoundRow = showNotFoundState || !!query && !!query.trim() && filtered.length === 0;
  const normalizedDropdownExpandPx = Number.isFinite(dropdownExpandPx) ? Math.max(0, dropdownExpandPx) : 0;
  const normalizedDropdownMinWidthPx = Number.isFinite(dropdownMinWidthPx) ? Math.max(0, dropdownMinWidthPx) : 0;
  (0, import_react4.useEffect)(() => {
    if (!lockDropdownWidthOnFirstOpen) return;
    if (!listOpen) return;
    if (initialDropdownWidthRef.current !== null) return;
    const width = boxRef.current?.getBoundingClientRect().width;
    if (!Number.isFinite(width) || !width || width <= 0) return;
    initialDropdownWidthRef.current = width;
  }, [listOpen, lockDropdownWidthOnFirstOpen]);
  const measuredAnchorWidth = boxRef.current?.getBoundingClientRect().width;
  const normalizedMeasuredAnchorWidth = Number.isFinite(measuredAnchorWidth) && measuredAnchorWidth && measuredAnchorWidth > 0 ? measuredAnchorWidth : null;
  const fixedDropdownBaseWidth = lockDropdownWidthOnFirstOpen ? initialDropdownWidthRef.current ?? normalizedMeasuredAnchorWidth : normalizedMeasuredAnchorWidth;
  const fixedDropdownExpandedWidth = fixedDropdownBaseWidth !== null && Number.isFinite(fixedDropdownBaseWidth) ? fixedDropdownBaseWidth + normalizedDropdownExpandPx : null;
  const resolvedDropdownWidthPx = fixedDropdownExpandedWidth !== null ? Math.max(fixedDropdownExpandedWidth, normalizedDropdownMinWidthPx || 0) : null;
  const inlineDropdownStyle = resolvedDropdownWidthPx !== null && resolvedDropdownWidthPx > 0 ? {
    width: `${resolvedDropdownWidthPx}px`,
    ...normalizedDropdownMinWidthPx > 0 ? { minWidth: `${normalizedDropdownMinWidthPx}px` } : {}
  } : normalizedDropdownExpandPx > 0 ? {
    width: `calc(100% + ${normalizedDropdownExpandPx}px)`,
    ...normalizedDropdownMinWidthPx > 0 ? { minWidth: `${normalizedDropdownMinWidthPx}px` } : {}
  } : normalizedDropdownMinWidthPx > 0 ? { minWidth: `${normalizedDropdownMinWidthPx}px` } : void 0;
  const listBody = /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { id: listId, ref: listRef, role: "listbox", "aria-label": label, children: [
    showNotFoundRow ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NotFound", "Not found") }) : null,
    filtered.map((opt, idx) => {
      const sel = selected?.value === opt.value;
      const isActive = idx === resolvedActiveIndex;
      const optionStateClassName = sel ? optionSelectedClassName : isActive ? optionActiveClassName : optionDefaultClassName;
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "button",
        {
          type: "button",
          id: `select-opt-${safeId}-${opt.value}`,
          role: "option",
          "aria-selected": sel,
          className: classNames(
            "relative flex w-full cursor-default select-none items-center py-2 pr-3 text-left text-sm",
            optionLeftPaddingClassName,
            disableDefaultOptionPadding ? "" : "type-option",
            optionStateClassName
          ),
          style: allowOptionHorizontalScroll ? { overflowX: "auto", overflowY: "hidden", WebkitOverflowScrolling: "touch" } : void 0,
          onMouseEnter: () => setActiveIndex(idx),
          onClick: () => selectOption(opt),
          children: [
            sel && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "span",
              {
                className: classNames(
                  "absolute inset-y-0 left-0 flex items-center pl-2",
                  isActive ? "text-white" : "text-primary"
                )
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
              "span",
              {
                className: classNames(
                  allowOptionHorizontalScroll ? "inline-flex items-center gap-2" : "flex min-w-0 items-center gap-2",
                  sel ? "font-medium" : "font-normal"
                ),
                style: allowOptionHorizontalScroll ? { minWidth: "max-content" } : void 0,
                children: [
                  opt.icon ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "span",
                    {
                      className: classNames(
                        "inline-flex shrink-0 items-center justify-center",
                        optionIconClassName,
                        isActive ? "text-white" : "text-slate-500"
                      ),
                      children: opt.icon
                    }
                  ) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "span",
                    {
                      className: classNames(allowOptionHorizontalScroll ? "block" : "block truncate", optionTextClassName),
                      style: allowOptionHorizontalScroll ? { whiteSpace: "nowrap" } : void 0,
                      children: opt.text
                    }
                  )
                ]
              }
            )
          ]
        },
        String(opt.value)
      );
    })
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      className: classNames("space-y-2", disabled ? "pointer-events-none select-none" : ""),
      ref: containerRef,
      children: [
        showLabel ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: classNames("form-label font-semibold", invalid ? "text-rose-700" : ""), children: label }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "div",
            {
              ref: boxRef,
              className: classNames(
                "relative w-full cursor-default rounded-[var(--radius-xl)] bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
                readOnlyMode ? "ind-readonly-field" : ""
              ),
              style: readOnlyMode ? { color: valueColor } : void 0,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "input",
                  {
                    ref: assignInputRef,
                    className: classNames(
                      "w-full rounded-[var(--radius-xl)] border py-2 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                      showSelectedIcon ? selectedInputPaddingClassName : "pl-3",
                      showSearchButton ? "pr-20" : "pr-10",
                      invalid ? "border-rose-400 bg-rose-50 focus:ring-rose-200 focus:border-rose-400" : "border-slate-200 focus:ring-primary focus:border-primary",
                      readOnlyMode ? "ind-readonly-field" : "text-slate-900"
                    ),
                    style: readOnlyMode ? { color: valueColor } : void 0,
                    value: displayValue,
                    disabled,
                    onChange: (event) => {
                      if (!allowTextInput) return;
                      const val = event.target.value;
                      setActiveIndex(0);
                      setShowNotFoundState(false);
                      setQuery(val);
                      if (clearOnEmptyInput && !val.trim()) {
                        clearManualValue(false, false);
                        return;
                      }
                      setOpen(true);
                    },
                    onKeyDown: handleKeyDown,
                    onFocus: () => {
                      if (!disabled) setOpen(true);
                    },
                    placeholder,
                    readOnly: readOnlyMode || !allowTextInput,
                    "aria-label": label,
                    role: "combobox",
                    "aria-expanded": listOpen,
                    "aria-controls": listId,
                    "aria-activedescendant": activeId
                  }
                ),
                showSelectedIcon ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: classNames("inline-flex items-center justify-center", selectedIconClassName), children: selected.icon }) }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "absolute inset-y-0 right-0 flex items-center gap-1 pr-2", children: [
                  showSearchButton ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "button",
                    {
                      type: "button",
                      className: "flex items-center p-1.5 text-slate-400 hover:text-slate-500",
                      onClick: () => {
                        if (disabled) return;
                        if (query !== null && query.trim() && filtered.length === 0) {
                          clearManualValue(true, true);
                          return;
                        }
                        setOpen(true);
                      },
                      "aria-label": indT("Common_Search", "Search"),
                      disabled,
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
                    }
                  ) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "button",
                    {
                      type: "button",
                      className: "flex items-center p-1.5 text-slate-500 hover:text-slate-600",
                      onClick: () => {
                        if (disabled) return;
                        if (open && query !== null && query.trim()) {
                          clearManualValue(false, false);
                          return;
                        }
                        setOpen((prev) => !prev);
                      },
                      "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                      disabled,
                      children: open ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
                    }
                  )
                ] })
              ]
            }
          ),
          usePortal ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            FloatingList_default,
            {
              anchorRef: boxRef,
              open: listOpen,
              zIndex: 36e4,
              fixedWidthPx: resolvedDropdownWidthPx ?? void 0,
              panelStyle,
              maxHeightClass: dropdownMaxHeightClass,
              role: "listbox",
              roundedClass: "rounded-[var(--radius-xl)]",
              portalClassName,
              panelClassName,
              children: listBody
            }
          ) : listOpen && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              className: `absolute z-360000 mt-1 w-full rounded-[var(--radius-xl)] bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden ${dropdownMaxHeightClass} overflow-auto ${panelClassName || ""}`,
              style: { ...inlineDropdownStyle, ...panelStyle || {} },
              children: listBody
            }
          )
        ] })
      ]
    }
  );
};
var SelectCombobox_default = SelectCombobox;

export {
  useFloatingPosition,
  FloatingList_default,
  ChevronDownSvg,
  ChevronUpSvg,
  useOutsideClick,
  SelectCombobox_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMudHN4XCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxudHlwZSBSYXdPcHRpb24gPVxyXG4gIHwge1xyXG4gICAgICB2YWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICAgICAgVmFsdWU/OiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgICAgIHRleHQ/OiBzdHJpbmc7XHJcbiAgICAgIFRleHQ/OiBzdHJpbmc7XHJcbiAgICAgIGljb24/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgICAgIEljb24/OiBSZWFjdC5SZWFjdE5vZGU7XHJcbiAgICB9XHJcbiAgfCBbc3RyaW5nIHwgbnVtYmVyLCBzdHJpbmddO1xyXG5cclxudHlwZSBOb3JtYWxpemVkT3B0aW9uID0ge1xuICB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyO1xuICB0ZXh0OiBzdHJpbmc7XG4gIGljb24/OiBSZWFjdC5SZWFjdE5vZGU7XG59O1xuXG5jb25zdCBFTVBUWV9PUFRJT046IE5vcm1hbGl6ZWRPcHRpb24gPSB7IHZhbHVlOiBcIlwiLCB0ZXh0OiBcIlwiIH07XG5cclxuY29uc3Qgbm9ybWFsaXplTG9va3VwVGV4dCA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSA/PyBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbnR5cGUgU2VsZWN0Q29tYm9ib3hQcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIG9wdGlvbnM6IFJhd09wdGlvbltdO1xyXG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGlucHV0UmVmPzogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xyXG4gIGludmFsaWQ/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgdXNlUG9ydGFsPzogYm9vbGVhbjtcclxuICBlbWl0T25WYWx1ZUNoYW5nZT86IGJvb2xlYW47XHJcbiAgaWRCYXNlPzogc3RyaW5nO1xyXG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcclxuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcclxuICBzaG93U2VhcmNoQnV0dG9uPzogYm9vbGVhbjtcclxuICBhbGxvd1RleHRJbnB1dD86IGJvb2xlYW47XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBzZWxlY3RlZFRleHRNb2RlPzogXCJ0ZXh0XCIgfCBcInZhbHVlXCI7XHJcbiAgZHJvcGRvd25FeHBhbmRQeD86IG51bWJlcjtcclxuICBkcm9wZG93bk1pbldpZHRoUHg/OiBudW1iZXI7XHJcbiAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz86IHN0cmluZztcclxuICBzZWxlY3RlZEljb25DbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgb3B0aW9uSWNvbkNsYXNzTmFtZT86IHN0cmluZztcclxuICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGw/OiBib29sZWFuO1xyXG4gIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW4/OiBib29sZWFuO1xyXG4gIGRpc2FibGVEZWZhdWx0T3B0aW9uUGFkZGluZz86IGJvb2xlYW47XHJcbiAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgb3B0aW9uVGV4dENsYXNzTmFtZT86IHN0cmluZztcclxuICBvcHRpb25EZWZhdWx0Q2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIG9wdGlvbkFjdGl2ZUNsYXNzTmFtZT86IHN0cmluZztcclxuICBvcHRpb25TZWxlY3RlZENsYXNzTmFtZT86IHN0cmluZztcclxuICBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZT86IHN0cmluZztcclxuICBwYW5lbFN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcclxuICBjbGVhck9uRW1wdHlJbnB1dD86IGJvb2xlYW47XHJcbn07XHJcblxyXG4vLyBSZXVzYWJsZSBzZWxlY3QgY29tYm9ib3ggd2l0aCBvcHRpb25hbCBwb3J0YWwgcmVuZGVyaW5nIGZvciB0aGUgbGlzdC5cclxuY29uc3QgU2VsZWN0Q29tYm9ib3ggPSAoe1xyXG4gIGxhYmVsLFxyXG4gIG9wdGlvbnMsXHJcbiAgdmFsdWUsXHJcbiAgb25DaGFuZ2UsXHJcbiAgaW5wdXRSZWYsXHJcbiAgcGxhY2Vob2xkZXIsXHJcbiAgaW52YWxpZCA9IGZhbHNlLFxyXG4gIGRpc2FibGVkID0gZmFsc2UsXHJcbiAgcmVhZE9ubHkgPSBmYWxzZSxcclxuICB1c2VQb3J0YWwgPSB0cnVlLFxyXG4gIGVtaXRPblZhbHVlQ2hhbmdlID0gZmFsc2UsXHJcbiAgaWRCYXNlLFxyXG4gIHBvcnRhbENsYXNzTmFtZSxcclxuICBwYW5lbENsYXNzTmFtZSxcclxuICBzaG93U2VhcmNoQnV0dG9uID0gZmFsc2UsXHJcbiAgYWxsb3dUZXh0SW5wdXQgPSB0cnVlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbiAgc2VsZWN0ZWRUZXh0TW9kZSA9IFwidGV4dFwiLFxyXG4gIGRyb3Bkb3duRXhwYW5kUHggPSAwLFxyXG4gIGRyb3Bkb3duTWluV2lkdGhQeCA9IDAsXHJcbiAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcyA9IFwibWF4LWgtNzJcIixcclxuICBzZWxlY3RlZEljb25DbGFzc05hbWUgPSBcImgtNCB3LTRcIixcclxuICBvcHRpb25JY29uQ2xhc3NOYW1lID0gXCJoLTQgdy00XCIsXHJcbiAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID0gZmFsc2UsXHJcbiAgbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlbiA9IGZhbHNlLFxyXG4gIGRpc2FibGVEZWZhdWx0T3B0aW9uUGFkZGluZyA9IGZhbHNlLFxyXG4gIG9wdGlvbkxlZnRQYWRkaW5nQ2xhc3NOYW1lID0gXCJcIixcclxuICBvcHRpb25UZXh0Q2xhc3NOYW1lID0gXCJcIixcclxuICBvcHRpb25EZWZhdWx0Q2xhc3NOYW1lID0gXCJ0ZXh0LXNsYXRlLTkwMFwiLFxyXG4gIG9wdGlvbkFjdGl2ZUNsYXNzTmFtZSA9IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIsXHJcbiAgb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWUgPSBcImJnLXByaW1hcnkgdGV4dC13aGl0ZVwiLFxyXG4gIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lID0gXCJwbC05XCIsXHJcbiAgcGFuZWxTdHlsZSxcclxuICBjbGVhck9uRW1wdHlJbnB1dCA9IGZhbHNlLFxyXG59OiBTZWxlY3RDb21ib2JveFByb3BzKSA9PiB7XHJcbiAgY29uc3QgYXNzaWduSW5wdXRSZWYgPSAobm9kZTogSFRNTElucHV0RWxlbWVudCB8IG51bGwpID0+IHtcclxuICAgIGlmICghaW5wdXRSZWYpIHJldHVybjtcclxuXHJcbiAgICBpZiAodHlwZW9mIGlucHV0UmVmID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgaW5wdXRSZWYobm9kZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dFJlZi5jdXJyZW50ID0gbm9kZTtcclxuICB9O1xyXG5cclxuICBjb25zdCByZWFkT25seU1vZGUgPSByZWFkT25seSB8fCBkaXNhYmxlZDtcclxuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xyXG4gIGNvbnN0IGRhdGEgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIHJldHVybiAob3B0aW9ucyB8fCBbXSkubWFwPE5vcm1hbGl6ZWRPcHRpb24+KChvKSA9PiB7XHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG8pKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG9bMF0gPz8gXCJcIiwgdGV4dDogb1sxXSA/PyBcIlwiIH07XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB2YWx1ZTogbz8udmFsdWUgPz8gbz8uVmFsdWUgPz8gXCJcIixcclxuICAgICAgICB0ZXh0OiBvPy50ZXh0ID8/IG8/LlRleHQgPz8gXCJcIixcclxuICAgICAgICBpY29uOiBvPy5pY29uID8/IG8/Lkljb24sXHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9LCBbb3B0aW9uc10pO1xyXG5cclxuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IFtzZWxlY3RlZCwgc2V0U2VsZWN0ZWRdID0gdXNlU3RhdGUoXHJcbiAgICBkYXRhLmZpbmQoKGQpID0+IFN0cmluZyhkLnZhbHVlKSA9PT0gU3RyaW5nKHZhbHVlKSkgfHwgRU1QVFlfT1BUSU9OXHJcbiAgKTtcclxuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtzaG93Tm90Rm91bmRTdGF0ZSwgc2V0U2hvd05vdEZvdW5kU3RhdGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYgPSB1c2VSZWY8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG5cclxuICBjb25zdCBjbGVhck1hbnVhbFZhbHVlID0gKG5leHRPcGVuOiBib29sZWFuLCBzaG93Tm90Rm91bmQ6IGJvb2xlYW4pID0+IHtcclxuICAgIHNldFNlbGVjdGVkKEVNUFRZX09QVElPTik7XHJcbiAgICBzZXRRdWVyeShcIlwiKTtcclxuICAgIHNldEFjdGl2ZUluZGV4KDApO1xyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoc2hvd05vdEZvdW5kKTtcclxuICAgIHNldE9wZW4obmV4dE9wZW4pO1xyXG4gICAgaWYgKCFlbWl0T25WYWx1ZUNoYW5nZSkge1xyXG4gICAgICBvbkNoYW5nZShcIlwiKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHtcclxuICAgIGlmIChxdWVyeSAhPT0gbnVsbCkge1xyXG4gICAgICBjbGVhck1hbnVhbFZhbHVlKGZhbHNlLCBmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICB9KTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG5leHRTZWxlY3RlZCA9IGRhdGEuZmluZCgoZCkgPT4gU3RyaW5nKGQudmFsdWUpID09PSBTdHJpbmcodmFsdWUpKSB8fCBFTVBUWV9PUFRJT047XHJcbiAgICBzZXRTZWxlY3RlZChuZXh0U2VsZWN0ZWQpO1xyXG5cclxuICAgIGlmIChTdHJpbmcodmFsdWUgPz8gXCJcIikudHJpbSgpKSB7XHJcbiAgICAgIHNldFF1ZXJ5KG51bGwpO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW3ZhbHVlLCBkYXRhXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIWVtaXRPblZhbHVlQ2hhbmdlKSByZXR1cm47XHJcbiAgICBvbkNoYW5nZShzZWxlY3RlZD8udmFsdWUgPyBTdHJpbmcoc2VsZWN0ZWQudmFsdWUpIDogXCJcIik7XHJcbiAgfSwgW2VtaXRPblZhbHVlQ2hhbmdlLCBvbkNoYW5nZSwgc2VsZWN0ZWRdKTtcclxuXHJcbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcclxuICAgIGlmICghcXVlcnkgfHwgIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIGRhdGE7XHJcbiAgICBjb25zdCBub3JtYWxpemVkUXVlcnkgPSBub3JtYWxpemVMb29rdXBUZXh0KHF1ZXJ5KTtcclxuICAgIHJldHVybiBkYXRhLmZpbHRlcigob3B0aW9uKSA9PiB7XHJcbiAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gbm9ybWFsaXplTG9va3VwVGV4dChvcHRpb24udmFsdWUpO1xyXG4gICAgICBjb25zdCBvcHRpb25UZXh0ID0gbm9ybWFsaXplTG9va3VwVGV4dChvcHRpb24udGV4dCk7XHJcbiAgICAgIHJldHVybiBvcHRpb25UZXh0LmluY2x1ZGVzKG5vcm1hbGl6ZWRRdWVyeSkgfHwgb3B0aW9uVmFsdWUuaW5jbHVkZXMobm9ybWFsaXplZFF1ZXJ5KTtcclxuICAgIH0pO1xyXG4gIH0sIFtkYXRhLCBxdWVyeV0pO1xyXG4gIGNvbnN0IHJlc29sdmVkQWN0aXZlSW5kZXggPVxyXG4gICAgZmlsdGVyZWQubGVuZ3RoID4gMCA/IE1hdGgubWluKE1hdGgubWF4KGFjdGl2ZUluZGV4LCAwKSwgZmlsdGVyZWQubGVuZ3RoIC0gMSkgOiAwO1xyXG5cclxuICBjb25zdCBzZWxlY3RPcHRpb24gPSAob3B0OiBOb3JtYWxpemVkT3B0aW9uKSA9PiB7XHJcbiAgICBzZXRTZWxlY3RlZChvcHQpO1xyXG4gICAgc2V0UXVlcnkobnVsbCk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIGlmICghZW1pdE9uVmFsdWVDaGFuZ2UpIHtcclxuICAgICAgb25DaGFuZ2Uob3B0Py52YWx1ZSA/IFN0cmluZyhvcHQudmFsdWUpIDogXCJcIik7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgaWYgKGRpc2FibGVkKSByZXR1cm47XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93RG93blwiKSB7XHJcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggKyAxKSAlIGZpbHRlcmVkLmxlbmd0aCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChldi5rZXkgPT09IFwiQXJyb3dVcFwiKSB7XHJcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHNldEFjdGl2ZUluZGV4KChpZHgpID0+IChpZHggLSAxICsgZmlsdGVyZWQubGVuZ3RoKSAlIGZpbHRlcmVkLmxlbmd0aCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChldi5rZXkgPT09IFwiRW50ZXJcIikge1xyXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBpZiAoY2xlYXJPbkVtcHR5SW5wdXQgJiYgcXVlcnkgIT09IG51bGwgJiYgIXF1ZXJ5LnRyaW0oKSkge1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wZW4gJiYgZmlsdGVyZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcclxuICAgICAgfSBlbHNlIGlmIChxdWVyeSAhPT0gbnVsbCAmJiBxdWVyeS50cmltKCkpIHtcclxuICAgICAgICBjbGVhck1hbnVhbFZhbHVlKHRydWUsIHRydWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIGlmIChxdWVyeSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNsZWFyTWFudWFsVmFsdWUoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGlkQmFzZSB8fCBsYWJlbCB8fCBcInNlbGVjdFwiKTtcclxuICBjb25zdCBsaXN0SWQgPSBgc2VsZWN0LW9wdGlvbnMtJHtzYWZlSWR9YDtcclxuICBjb25zdCBhY3RpdmVJZCA9XHJcbiAgICBvcGVuICYmIGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8gYHNlbGVjdC1vcHQtJHtzYWZlSWR9LSR7ZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0udmFsdWV9YCA6IHVuZGVmaW5lZDtcclxuICBjb25zdCBsaXN0T3BlbiA9IG9wZW4gJiYgIWRpc2FibGVkO1xyXG4gIGNvbnN0IHNlbGVjdGVkVmFsdWUgPSBTdHJpbmcoc2VsZWN0ZWQ/LnZhbHVlID8/IFwiXCIpLnRyaW0oKTtcclxuICBjb25zdCBzZWxlY3RlZERpc3BsYXlUZXh0ID0gc2VsZWN0ZWRUZXh0TW9kZSA9PT0gXCJ2YWx1ZVwiID8gc2VsZWN0ZWRWYWx1ZSA6IHNlbGVjdGVkPy50ZXh0IHx8IFwiXCI7XHJcbiAgY29uc3QgZGlzcGxheVZhbHVlID0gcXVlcnkgIT09IG51bGwgPyBxdWVyeSA6IChzZWxlY3RlZFZhbHVlID8gc2VsZWN0ZWREaXNwbGF5VGV4dCA6IFwiXCIpO1xyXG4gIGNvbnN0IHNob3dTZWxlY3RlZEljb24gPSBxdWVyeSA9PT0gbnVsbCAmJiAhIXNlbGVjdGVkVmFsdWUgJiYgISFzZWxlY3RlZD8uaWNvbjtcclxuICBjb25zdCBzaG93Tm90Rm91bmRSb3cgPSBzaG93Tm90Rm91bmRTdGF0ZSB8fCAoISFxdWVyeSAmJiAhIXF1ZXJ5LnRyaW0oKSAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDApO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4ID0gTnVtYmVyLmlzRmluaXRlKGRyb3Bkb3duRXhwYW5kUHgpID8gTWF0aC5tYXgoMCwgZHJvcGRvd25FeHBhbmRQeCkgOiAwO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHggPSBOdW1iZXIuaXNGaW5pdGUoZHJvcGRvd25NaW5XaWR0aFB4KSA/IE1hdGgubWF4KDAsIGRyb3Bkb3duTWluV2lkdGhQeCkgOiAwO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlbikgcmV0dXJuO1xuICAgIGlmICghbGlzdE9wZW4pIHJldHVybjtcbiAgICBpZiAoaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCAhPT0gbnVsbCkgcmV0dXJuO1xuXHJcbiAgICBjb25zdCB3aWR0aCA9IGJveFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuICAgIGlmICghTnVtYmVyLmlzRmluaXRlKHdpZHRoKSB8fCAhd2lkdGggfHwgd2lkdGggPD0gMCkgcmV0dXJuO1xyXG4gICAgaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCA9IHdpZHRoO1xuICB9LCBbbGlzdE9wZW4sIGxvY2tEcm9wZG93bldpZHRoT25GaXJzdE9wZW5dKTtcblxyXG4gIGNvbnN0IG1lYXN1cmVkQW5jaG9yV2lkdGggPSBib3hSZWYuY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcbiAgY29uc3Qgbm9ybWFsaXplZE1lYXN1cmVkQW5jaG9yV2lkdGggPVxyXG4gICAgTnVtYmVyLmlzRmluaXRlKG1lYXN1cmVkQW5jaG9yV2lkdGgpICYmIG1lYXN1cmVkQW5jaG9yV2lkdGggJiYgbWVhc3VyZWRBbmNob3JXaWR0aCA+IDAgPyBtZWFzdXJlZEFuY2hvcldpZHRoIDogbnVsbDtcclxuICBjb25zdCBmaXhlZERyb3Bkb3duQmFzZVdpZHRoID0gbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlblxyXG4gICAgPyBpbml0aWFsRHJvcGRvd25XaWR0aFJlZi5jdXJyZW50ID8/IG5vcm1hbGl6ZWRNZWFzdXJlZEFuY2hvcldpZHRoXHJcbiAgICA6IG5vcm1hbGl6ZWRNZWFzdXJlZEFuY2hvcldpZHRoO1xyXG4gIGNvbnN0IGZpeGVkRHJvcGRvd25FeHBhbmRlZFdpZHRoID1cclxuICAgIGZpeGVkRHJvcGRvd25CYXNlV2lkdGggIT09IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKGZpeGVkRHJvcGRvd25CYXNlV2lkdGgpXHJcbiAgICAgID8gZml4ZWREcm9wZG93bkJhc2VXaWR0aCArIG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4XHJcbiAgICAgIDogbnVsbDtcclxuICBjb25zdCByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA9XHJcbiAgICBmaXhlZERyb3Bkb3duRXhwYW5kZWRXaWR0aCAhPT0gbnVsbFxyXG4gICAgICA/IE1hdGgubWF4KGZpeGVkRHJvcGRvd25FeHBhbmRlZFdpZHRoLCBub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4IHx8IDApXHJcbiAgICAgIDogbnVsbDtcclxuICBjb25zdCBpbmxpbmVEcm9wZG93blN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkID1cbiAgICByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCAhPT0gbnVsbCAmJiByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA+IDBcbiAgICAgID8ge1xuICAgICAgICAgIHdpZHRoOiBgJHtyZXNvbHZlZERyb3Bkb3duV2lkdGhQeH1weGAsXG4gICAgICAgICAgLi4uKG5vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHggPiAwID8geyBtaW5XaWR0aDogYCR7bm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeH1weGAgfSA6IHt9KSxcclxuICAgICAgICB9XHJcbiAgICAgIDogbm9ybWFsaXplZERyb3Bkb3duRXhwYW5kUHggPiAwXHJcbiAgICAgICAgPyB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgY2FsYygxMDAlICsgJHtub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeH1weClgLFxyXG4gICAgICAgICAgICAuLi4obm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeCA+IDAgPyB7IG1pbldpZHRoOiBgJHtub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4fXB4YCB9IDoge30pLFxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIDogbm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeCA+IDBcbiAgICAgICAgICA/IHsgbWluV2lkdGg6IGAke25vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHh9cHhgIH1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cclxuICBjb25zdCBsaXN0Qm9keSA9IChcclxuICAgIDxkaXYgaWQ9e2xpc3RJZH0gcmVmPXtsaXN0UmVmfSByb2xlPVwibGlzdGJveFwiIGFyaWEtbGFiZWw9e2xhYmVsfT5cclxuICAgICAge3Nob3dOb3RGb3VuZFJvdyA/IDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKX08L2Rpdj4gOiBudWxsfVxyXG4gICAgICB7ZmlsdGVyZWQubWFwKChvcHQsIGlkeCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlbCA9IHNlbGVjdGVkPy52YWx1ZSA9PT0gb3B0LnZhbHVlO1xyXG4gICAgICAgIGNvbnN0IGlzQWN0aXZlID0gaWR4ID09PSByZXNvbHZlZEFjdGl2ZUluZGV4O1xyXG4gICAgICAgIGNvbnN0IG9wdGlvblN0YXRlQ2xhc3NOYW1lID0gc2VsID8gb3B0aW9uU2VsZWN0ZWRDbGFzc05hbWUgOiBpc0FjdGl2ZSA/IG9wdGlvbkFjdGl2ZUNsYXNzTmFtZSA6IG9wdGlvbkRlZmF1bHRDbGFzc05hbWU7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIGtleT17U3RyaW5nKG9wdC52YWx1ZSl9XHJcbiAgICAgICAgICAgIGlkPXtgc2VsZWN0LW9wdC0ke3NhZmVJZH0tJHtvcHQudmFsdWV9YH1cclxuICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXHJcbiAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e3NlbH1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtY2VudGVyIHB5LTIgcHItMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxyXG4gICAgICAgICAgICAgIG9wdGlvbkxlZnRQYWRkaW5nQ2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgIGRpc2FibGVEZWZhdWx0T3B0aW9uUGFkZGluZyA/IFwiXCIgOiBcInR5cGUtb3B0aW9uXCIsXHJcbiAgICAgICAgICAgICAgb3B0aW9uU3RhdGVDbGFzc05hbWVcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgc3R5bGU9e1xyXG4gICAgICAgICAgICAgIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbFxyXG4gICAgICAgICAgICAgICAgPyB7IG92ZXJmbG93WDogXCJhdXRvXCIsIG92ZXJmbG93WTogXCJoaWRkZW5cIiwgV2Via2l0T3ZlcmZsb3dTY3JvbGxpbmc6IFwidG91Y2hcIiB9XHJcbiAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0QWN0aXZlSW5kZXgoaWR4KX1cclxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdCl9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtzZWwgJiYgKFxyXG4gICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgIFwiYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwbC0yXCIsXHJcbiAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtcHJpbWFyeVwiXHJcbiAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgID48L3NwYW4+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8gXCJpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIiA6IFwiZmxleCBtaW4tdy0wIGl0ZW1zLWNlbnRlciBnYXAtMlwiLFxyXG4gICAgICAgICAgICAgICAgc2VsID8gXCJmb250LW1lZGl1bVwiIDogXCJmb250LW5vcm1hbFwiXHJcbiAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICBzdHlsZT17YWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8geyBtaW5XaWR0aDogXCJtYXgtY29udGVudFwiIH0gOiB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7b3B0Lmljb24gPyAoXHJcbiAgICAgICAgICAgICAgICA8c3BhblxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJpbmxpbmUtZmxleCBzaHJpbmstMCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25JY29uQ2xhc3NOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJ0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtNTAwXCJcclxuICAgICAgICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAge29wdC5pY29ufVxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsID8gXCJibG9ja1wiIDogXCJibG9jayB0cnVuY2F0ZVwiLCBvcHRpb25UZXh0Q2xhc3NOYW1lKX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXthbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyB7IHdoaXRlU3BhY2U6IFwibm93cmFwXCIgfSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7b3B0LnRleHR9XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICApO1xyXG4gICAgICB9KX1cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2XHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInNwYWNlLXktMlwiLCBkaXNhYmxlZCA/IFwicG9pbnRlci1ldmVudHMtbm9uZSBzZWxlY3Qtbm9uZVwiIDogXCJcIil9XHJcbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxyXG4gICAgPlxyXG4gICAgICB7c2hvd0xhYmVsID8gPGxhYmVsIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImZvcm0tbGFiZWwgZm9udC1zZW1pYm9sZFwiLCBpbnZhbGlkID8gXCJ0ZXh0LXJvc2UtNzAwXCIgOiBcIlwiKX0+e2xhYmVsfTwvbGFiZWw+IDogbnVsbH1cclxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxyXG4gICAgICAgIDxkaXZcclxuICAgICAgICAgIHJlZj17Ym94UmVmfVxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICBcInJlbGF0aXZlIHctZnVsbCBjdXJzb3ItZGVmYXVsdCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBiZy13aGl0ZSB0ZXh0LWxlZnQgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtd2hpdGUgc206dGV4dC1zbVwiLFxyXG4gICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICAgIHN0eWxlPXtyZWFkT25seU1vZGUgPyB7IGNvbG9yOiB2YWx1ZUNvbG9yIH0gOiB1bmRlZmluZWR9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIHJlZj17YXNzaWduSW5wdXRSZWZ9XHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICBcInctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBib3JkZXIgcHktMiB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGRpc2FibGVkOmJnLXNsYXRlLTEwMCBkaXNhYmxlZDp0ZXh0LXNsYXRlLTUwMCBkaXNhYmxlZDpib3JkZXItc2xhdGUtMjAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgIHNob3dTZWxlY3RlZEljb24gPyBzZWxlY3RlZElucHV0UGFkZGluZ0NsYXNzTmFtZSA6IFwicGwtM1wiLFxyXG4gICAgICAgICAgICAgIHNob3dTZWFyY2hCdXR0b24gPyBcInByLTIwXCIgOiBcInByLTEwXCIsXHJcbiAgICAgICAgICAgICAgaW52YWxpZFxyXG4gICAgICAgICAgICAgICAgPyBcImJvcmRlci1yb3NlLTQwMCBiZy1yb3NlLTUwIGZvY3VzOnJpbmctcm9zZS0yMDAgZm9jdXM6Ym9yZGVyLXJvc2UtNDAwXCJcclxuICAgICAgICAgICAgICAgIDogXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiLFxyXG4gICAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgc3R5bGU9e3JlYWRPbmx5TW9kZSA/IHsgY29sb3I6IHZhbHVlQ29sb3IgfSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXlWYWx1ZX1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFhbGxvd1RleHRJbnB1dCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgc2V0UXVlcnkodmFsKTtcclxuICAgICAgICAgICAgICBpZiAoY2xlYXJPbkVtcHR5SW5wdXQgJiYgIXZhbC50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyTWFudWFsVmFsdWUoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxyXG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFkaXNhYmxlZCkgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHlNb2RlIHx8ICFhbGxvd1RleHRJbnB1dH1cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XHJcbiAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXHJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e2xpc3RPcGVufVxyXG4gICAgICAgICAgICBhcmlhLWNvbnRyb2xzPXtsaXN0SWR9XHJcbiAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAge3Nob3dTZWxlY3RlZEljb24gPyAoXHJcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgYWJzb2x1dGUgaW5zZXQteS0wIGxlZnQtMCBmbGV4IGl0ZW1zLWNlbnRlciBwbC0zIHRleHQtc2xhdGUtNTAwXCI+XHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwiaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCIsIHNlbGVjdGVkSWNvbkNsYXNzTmFtZSl9PntzZWxlY3RlZC5pY29ufTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cclxuICAgICAgICAgICAge3Nob3dTZWFyY2hCdXR0b24gPyAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTUwMFwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChkaXNhYmxlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICBpZiAocXVlcnkgIT09IG51bGwgJiYgcXVlcnkudHJpbSgpICYmIGZpbHRlcmVkLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyTWFudWFsVmFsdWUodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9TZWFyY2hcIiwgXCJTZWFyY2hcIil9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNS43NSAxNS43NS0yLjQ4OS0yLjQ4OW0wIDBhMy4zNzUgMy4zNzUgMCAxIDAtNC43NzMtNC43NzMgMy4zNzUgMy4zNzUgMCAwIDAgNC43NzQgNC43NzRaTTIxIDEyYTkgOSAwIDEgMS0xOCAwIDkgOSAwIDAgMSAxOCAwWlwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc2FibGVkKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAob3BlbiAmJiBxdWVyeSAhPT0gbnVsbCAmJiBxdWVyeS50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgICAgY2xlYXJNYW51YWxWYWx1ZShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKChwcmV2KSA9PiAhcHJldik7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtvcGVuID8gaW5kVChcIkRyb3Bkb3duX0hpZGVPcHRpb25zXCIsIFwiSGlkZSBvcHRpb25zXCIpIDogaW5kVChcIkRyb3Bkb3duX1Nob3dPcHRpb25zXCIsIFwiU2hvdyBvcHRpb25zXCIpfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHt1c2VQb3J0YWwgPyAoXHJcbiAgICAgICAgICA8RmxvYXRpbmdMaXN0XHJcbiAgICAgICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxyXG4gICAgICAgICAgICBvcGVuPXtsaXN0T3Blbn1cclxuICAgICAgICAgICAgekluZGV4PXszNjAwMDB9XHJcbiAgICAgICAgICAgIGZpeGVkV2lkdGhQeD17cmVzb2x2ZWREcm9wZG93bldpZHRoUHggPz8gdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICBwYW5lbFN0eWxlPXtwYW5lbFN0eWxlfVxyXG4gICAgICAgICAgICBtYXhIZWlnaHRDbGFzcz17ZHJvcGRvd25NYXhIZWlnaHRDbGFzc31cclxuICAgICAgICAgICAgcm9sZT1cImxpc3Rib3hcIlxyXG4gICAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiXHJcbiAgICAgICAgICAgIHBvcnRhbENsYXNzTmFtZT17cG9ydGFsQ2xhc3NOYW1lfVxyXG4gICAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIHtsaXN0Qm9keX1cclxuICAgICAgICAgIDwvRmxvYXRpbmdMaXN0PlxyXG4gICAgICAgICkgOiAoXG4gICAgICAgICAgbGlzdE9wZW4gJiYgKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB6LTM2MDAwMCBtdC0xIHctZnVsbCByb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXSBiZy13aGl0ZSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke2Ryb3Bkb3duTWF4SGVpZ2h0Q2xhc3N9IG92ZXJmbG93LWF1dG8gJHtwYW5lbENsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IC4uLmlubGluZURyb3Bkb3duU3R5bGUsIC4uLihwYW5lbFN0eWxlIHx8IHt9KSB9fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7bGlzdEJvZHl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApXHJcbiAgICAgICAgKX1cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VsZWN0Q29tYm9ib3g7XHJcbiIsICJpbXBvcnQgUmVhY3QsIHsgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VGbG9hdGluZ1Bvc2l0aW9uIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZUZsb2F0aW5nUG9zaXRpb24udHNcIjtcblxyXG50eXBlIFByb3BzID0ge1xyXG4gIGFuY2hvclJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PjtcclxuICBvcGVuOiBib29sZWFuO1xyXG4gIHpJbmRleD86IG51bWJlcjtcclxuICBmaXhlZFdpZHRoUHg/OiBudW1iZXI7XHJcbiAgbWF4SGVpZ2h0Q2xhc3M/OiBzdHJpbmc7XHJcbiAgcm91bmRlZENsYXNzPzogc3RyaW5nO1xyXG4gIHJvbGU/OiBzdHJpbmc7XHJcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcbiAgcGFuZWxTdHlsZT86IFJlYWN0LkNTU1Byb3BlcnRpZXM7XG4gIGF1dG9GaXRWaWV3cG9ydD86IGJvb2xlYW47XG4gIG9mZnNldD86IG51bWJlcjtcbiAgdmlld3BvcnRQYWRkaW5nPzogbnVtYmVyO1xuICBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlO1xufTtcblxyXG5jb25zdCBGbG9hdGluZ0xpc3QgPSAoe1xyXG4gIGFuY2hvclJlZixcclxuICBvcGVuLFxyXG4gIHpJbmRleCA9IDMwMDAwMCxcclxuICBmaXhlZFdpZHRoUHgsXHJcbiAgbWF4SGVpZ2h0Q2xhc3MgPSBcIm1heC1oLTcyXCIsXHJcbiAgcm91bmRlZENsYXNzID0gXCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiLFxyXG4gIHJvbGUsXHJcbiAgcG9ydGFsQ2xhc3NOYW1lLFxuICBwYW5lbENsYXNzTmFtZSxcbiAgcGFuZWxTdHlsZSxcbiAgYXV0b0ZpdFZpZXdwb3J0ID0gdHJ1ZSxcbiAgb2Zmc2V0LFxuICB2aWV3cG9ydFBhZGRpbmcsXG4gIGNoaWxkcmVuLFxufTogUHJvcHMpID0+IHtcbiAgY29uc3QgcGFuZWxSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgc3R5bGUgPSB1c2VGbG9hdGluZ1Bvc2l0aW9uKGFuY2hvclJlZiwgb3Blbiwge1xuICAgIG92ZXJsYXlSZWY6IHBhbmVsUmVmLFxuICAgIGF1dG9GaXRWaWV3cG9ydCxcbiAgICBvZmZzZXQsXG4gICAgdmlld3BvcnRQYWRkaW5nLFxuICB9KTtcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIGNyZWF0ZVBvcnRhbChcbiAgICA8ZGl2XG4gICAgICBkYXRhLWZsb2F0aW5nLXBsYWNlbWVudD17c3R5bGUucGxhY2VtZW50fVxuICAgICAgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246IFwiZml4ZWRcIixcbiAgICAgICAgdG9wOiBzdHlsZS50b3AsXG4gICAgICAgIGxlZnQ6IHN0eWxlLmxlZnQsXG4gICAgICAgIHdpZHRoOiB0eXBlb2YgZml4ZWRXaWR0aFB4ID09PSBcIm51bWJlclwiICYmIE51bWJlci5pc0Zpbml0ZShmaXhlZFdpZHRoUHgpID8gZml4ZWRXaWR0aFB4IDogc3R5bGUud2lkdGgsXG4gICAgICAgIHpJbmRleCxcclxuICAgICAgfX1cclxuICAgICAgY2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XHJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIHJlZj17cGFuZWxSZWZ9XG4gICAgICAgIHJvbGU9e3JvbGV9XG4gICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBvdmVyZmxvdy1hdXRvICR7cm91bmRlZENsYXNzfSBiZy13aGl0ZSBweS0xIHRleHQtc20gc2hhZG93LWxnIHJpbmctMSByaW5nLWJsYWNrLzUgZm9jdXM6b3V0bGluZS1oaWRkZW4gJHttYXhIZWlnaHRDbGFzc30gJHtwYW5lbENsYXNzTmFtZSB8fCBcIlwifWB9XG4gICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgbWF4SGVpZ2h0OiBzdHlsZS5tYXhIZWlnaHQsXG4gICAgICAgICAgb3ZlcnNjcm9sbEJlaGF2aW9yOiBcImNvbnRhaW5cIixcbiAgICAgICAgICAuLi5wYW5lbFN0eWxlLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7Y2hpbGRyZW59XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj4sXHJcbiAgICBkb2N1bWVudC5ib2R5XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZsb2F0aW5nTGlzdDtcclxuIiwgImltcG9ydCB7IHVzZUxheW91dEVmZmVjdCwgdXNlU3RhdGUsIHR5cGUgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG50eXBlIEZsb2F0aW5nUGxhY2VtZW50ID0gXCJib3R0b21cIiB8IFwidG9wXCI7XHJcblxyXG50eXBlIEZsb2F0aW5nUG9zaXRpb25PcHRpb25zID0ge1xuICBvdmVybGF5UmVmPzogUmVmT2JqZWN0PEhUTUxFbGVtZW50IHwgbnVsbD47XG4gIG9mZnNldD86IG51bWJlcjtcbiAgdmlld3BvcnRQYWRkaW5nPzogbnVtYmVyO1xuICBhdXRvRml0Vmlld3BvcnQ/OiBib29sZWFuO1xufTtcblxyXG50eXBlIEZsb2F0aW5nUG9zaXRpb25TdHlsZSA9IHtcclxuICB0b3A6IG51bWJlcjtcclxuICBsZWZ0OiBudW1iZXI7XHJcbiAgd2lkdGg6IG51bWJlcjtcclxuICBtYXhIZWlnaHQ/OiBudW1iZXI7XHJcbiAgcGxhY2VtZW50OiBGbG9hdGluZ1BsYWNlbWVudDtcclxufTtcclxuXHJcbmNvbnN0IERFRkFVTFRfT0ZGU0VUX1BYID0gNjtcclxuY29uc3QgREVGQVVMVF9WSUVXUE9SVF9QQURESU5HX1BYID0gMTI7XHJcblxyXG5jb25zdCBjbGFtcCA9ICh2YWx1ZTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICBpZiAobWF4IDwgbWluKSByZXR1cm4gbWluO1xuICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgodmFsdWUsIG1pbiksIG1heCk7XG59O1xuXG5jb25zdCBhcmVGbG9hdGluZ1N0eWxlc0VxdWFsID0gKGxlZnQ6IEZsb2F0aW5nUG9zaXRpb25TdHlsZSwgcmlnaHQ6IEZsb2F0aW5nUG9zaXRpb25TdHlsZSk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gKFxuICAgIGxlZnQudG9wID09PSByaWdodC50b3AgJiZcbiAgICBsZWZ0LmxlZnQgPT09IHJpZ2h0LmxlZnQgJiZcbiAgICBsZWZ0LndpZHRoID09PSByaWdodC53aWR0aCAmJlxuICAgIGxlZnQubWF4SGVpZ2h0ID09PSByaWdodC5tYXhIZWlnaHQgJiZcbiAgICBsZWZ0LnBsYWNlbWVudCA9PT0gcmlnaHQucGxhY2VtZW50XG4gICk7XG59O1xuXG4vLyBSZXNvbHZlcyBhIGZpeGVkIGZsb2F0aW5nIHBvc2l0aW9uIGFuZCBvcHRpb25hbGx5IGtlZXBzIHRoZSBvdmVybGF5IGluc2lkZSB0aGUgdmlld3BvcnQuXG5leHBvcnQgY29uc3QgdXNlRmxvYXRpbmdQb3NpdGlvbiA9IChcbiAgdGFyZ2V0UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+LFxyXG4gIG9wZW46IGJvb2xlYW4sXHJcbiAge1xyXG4gICAgb3ZlcmxheVJlZixcclxuICAgIG9mZnNldCA9IERFRkFVTFRfT0ZGU0VUX1BYLFxyXG4gICAgdmlld3BvcnRQYWRkaW5nID0gREVGQVVMVF9WSUVXUE9SVF9QQURESU5HX1BYLFxyXG4gICAgYXV0b0ZpdFZpZXdwb3J0ID0gZmFsc2UsXHJcbiAgfTogRmxvYXRpbmdQb3NpdGlvbk9wdGlvbnMgPSB7fVxyXG4pID0+IHtcclxuICBjb25zdCBbc3R5bGUsIHNldFN0eWxlXSA9IHVzZVN0YXRlPEZsb2F0aW5nUG9zaXRpb25TdHlsZT4oe1xyXG4gICAgdG9wOiAwLFxyXG4gICAgbGVmdDogMCxcclxuICAgIHdpZHRoOiAwLFxyXG4gICAgbWF4SGVpZ2h0OiB1bmRlZmluZWQsXHJcbiAgICBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsXHJcbiAgfSk7XHJcblxyXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuIHx8ICF0YXJnZXRSZWYuY3VycmVudCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xuICAgICAgY29uc3QgcmVjdCA9IHRhcmdldFJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGlmICghcmVjdCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgdmlld3BvcnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCAwO1xyXG4gICAgICBjb25zdCB2aWV3cG9ydEhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IDA7XHJcbiAgICAgIGNvbnN0IG92ZXJsYXlFbGVtZW50ID0gb3ZlcmxheVJlZj8uY3VycmVudDtcbiAgICAgIGNvbnN0IG92ZXJsYXlSZWN0ID0gb3ZlcmxheUVsZW1lbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3Qgb3ZlcmxheUhlaWdodCA9IE1hdGgubWF4KG92ZXJsYXlSZWN0Py5oZWlnaHQgfHwgMCwgb3ZlcmxheUVsZW1lbnQ/LnNjcm9sbEhlaWdodCB8fCAwKTtcbiAgICAgIGNvbnN0IG5leHRXaWR0aCA9IE1hdGgubWluKHJlY3Qud2lkdGgsIE1hdGgubWF4KDAsIHZpZXdwb3J0V2lkdGggLSB2aWV3cG9ydFBhZGRpbmcgKiAyKSk7XHJcbiAgICAgIGNvbnN0IG5leHRMZWZ0ID0gY2xhbXAocmVjdC5sZWZ0LCB2aWV3cG9ydFBhZGRpbmcsIHZpZXdwb3J0V2lkdGggLSBuZXh0V2lkdGggLSB2aWV3cG9ydFBhZGRpbmcpO1xuXG4gICAgICBpZiAoIWF1dG9GaXRWaWV3cG9ydCkge1xuICAgICAgICBjb25zdCBuZXh0U3R5bGU6IEZsb2F0aW5nUG9zaXRpb25TdHlsZSA9IHtcbiAgICAgICAgICB0b3A6IHJlY3QuYm90dG9tICsgb2Zmc2V0LFxuICAgICAgICAgIGxlZnQ6IG5leHRMZWZ0LFxuICAgICAgICAgIHdpZHRoOiBuZXh0V2lkdGgsXG4gICAgICAgICAgbWF4SGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgICAgcGxhY2VtZW50OiBcImJvdHRvbVwiLFxuICAgICAgICB9O1xuICAgICAgICBzZXRTdHlsZSgocHJldmlvdXMpID0+IChhcmVGbG9hdGluZ1N0eWxlc0VxdWFsKHByZXZpb3VzLCBuZXh0U3R5bGUpID8gcHJldmlvdXMgOiBuZXh0U3R5bGUpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBhdmFpbGFibGVCZWxvdyA9IE1hdGgubWF4KDAsIHZpZXdwb3J0SGVpZ2h0IC0gcmVjdC5ib3R0b20gLSBvZmZzZXQgLSB2aWV3cG9ydFBhZGRpbmcpO1xuICAgICAgY29uc3QgYXZhaWxhYmxlQWJvdmUgPSBNYXRoLm1heCgwLCByZWN0LnRvcCAtIG9mZnNldCAtIHZpZXdwb3J0UGFkZGluZyk7XG4gICAgICBjb25zdCBmYWxsYmFja0hlaWdodCA9IE1hdGgubWF4KGF2YWlsYWJsZUJlbG93LCBhdmFpbGFibGVBYm92ZSwgMCk7XG4gICAgICBjb25zdCBwcmVmZXJyZWRIZWlnaHQgPSBvdmVybGF5SGVpZ2h0ID4gMCA/IG92ZXJsYXlIZWlnaHQgOiBmYWxsYmFja0hlaWdodDtcbiAgICAgIGNvbnN0IHByZWZlcnJlZFBsYWNlbWVudDogRmxvYXRpbmdQbGFjZW1lbnQgPVxuICAgICAgICBwcmVmZXJyZWRIZWlnaHQgPiBhdmFpbGFibGVCZWxvdyAmJiBhdmFpbGFibGVBYm92ZSA+IGF2YWlsYWJsZUJlbG93ID8gXCJ0b3BcIiA6IFwiYm90dG9tXCI7XG4gICAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBwcmVmZXJyZWRQbGFjZW1lbnQgPT09IFwidG9wXCIgPyBhdmFpbGFibGVBYm92ZSA6IGF2YWlsYWJsZUJlbG93O1xuICAgICAgY29uc3QgY29uc3RyYWluZWRIZWlnaHQgPSBNYXRoLm1heChcbiAgICAgICAgMCxcbiAgICAgICAgYXZhaWxhYmxlSGVpZ2h0ID4gMFxuICAgICAgICAgID8gTWF0aC5taW4ocHJlZmVycmVkSGVpZ2h0IHx8IGF2YWlsYWJsZUhlaWdodCwgYXZhaWxhYmxlSGVpZ2h0KVxuICAgICAgICAgIDogdmlld3BvcnRIZWlnaHQgLSB2aWV3cG9ydFBhZGRpbmcgKiAyXG4gICAgICApO1xuICAgICAgY29uc3QgbmV4dFRvcCA9XG4gICAgICAgIHByZWZlcnJlZFBsYWNlbWVudCA9PT0gXCJ0b3BcIlxuICAgICAgICAgID8gTWF0aC5tYXgodmlld3BvcnRQYWRkaW5nLCByZWN0LnRvcCAtIG9mZnNldCAtIGNvbnN0cmFpbmVkSGVpZ2h0KVxuICAgICAgICAgIDogTWF0aC5taW4oXG4gICAgICAgICAgICAgIHJlY3QuYm90dG9tICsgb2Zmc2V0LFxyXG4gICAgICAgICAgICAgIE1hdGgubWF4KHZpZXdwb3J0UGFkZGluZywgdmlld3BvcnRIZWlnaHQgLSBjb25zdHJhaW5lZEhlaWdodCAtIHZpZXdwb3J0UGFkZGluZylcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IG5leHRTdHlsZTogRmxvYXRpbmdQb3NpdGlvblN0eWxlID0ge1xuICAgICAgICB0b3A6IG5leHRUb3AsXG4gICAgICAgIGxlZnQ6IG5leHRMZWZ0LFxuICAgICAgICB3aWR0aDogbmV4dFdpZHRoLFxuICAgICAgICBtYXhIZWlnaHQ6IGNvbnN0cmFpbmVkSGVpZ2h0LFxuICAgICAgICBwbGFjZW1lbnQ6IHByZWZlcnJlZFBsYWNlbWVudCxcbiAgICAgIH07XG4gICAgICBzZXRTdHlsZSgocHJldmlvdXMpID0+IChhcmVGbG9hdGluZ1N0eWxlc0VxdWFsKHByZXZpb3VzLCBuZXh0U3R5bGUpID8gcHJldmlvdXMgOiBuZXh0U3R5bGUpKTtcbiAgICB9O1xuXG4gICAgdXBkYXRlKCk7XG4gICAgbGV0IGFuaW1hdGlvbkZyYW1lID0gMDtcbiAgICBjb25zdCBzY2hlZHVsZVVwZGF0ZSA9ICgpID0+IHtcbiAgICAgIGlmIChhbmltYXRpb25GcmFtZSkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWUpO1xuICAgICAgfVxuICAgICAgYW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgYW5pbWF0aW9uRnJhbWUgPSAwO1xuICAgICAgICB1cGRhdGUoKTtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBjb25zdCByZXNpemVPYnNlcnZlciA9XG4gICAgICB0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgPT09IFwidW5kZWZpbmVkXCJcbiAgICAgICAgPyBudWxsXG4gICAgICAgIDogbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIHNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgaWYgKHJlc2l6ZU9ic2VydmVyKSB7XG4gICAgICByZXNpemVPYnNlcnZlci5vYnNlcnZlKHRhcmdldFJlZi5jdXJyZW50KTtcbiAgICAgIGlmIChvdmVybGF5UmVmPy5jdXJyZW50KSB7XG4gICAgICAgIHJlc2l6ZU9ic2VydmVyLm9ic2VydmUob3ZlcmxheVJlZi5jdXJyZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBtdXRhdGlvbk9ic2VydmVyID1cbiAgICAgIHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiIHx8ICFvdmVybGF5UmVmPy5jdXJyZW50XG4gICAgICAgID8gbnVsbFxuICAgICAgICA6IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICAgIHNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICAgICAgfSk7XG4gICAgbXV0YXRpb25PYnNlcnZlcj8ub2JzZXJ2ZShvdmVybGF5UmVmLmN1cnJlbnQsIHtcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICAgIHN1YnRyZWU6IHRydWUsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiBvcGVuICYmIHNjaGVkdWxlVXBkYXRlKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBzY2hlZHVsZVVwZGF0ZSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChhbmltYXRpb25GcmFtZSkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWUpO1xuICAgICAgfVxuICAgICAgcmVzaXplT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgICAgIG11dGF0aW9uT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsLCB0cnVlKTtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNjaGVkdWxlVXBkYXRlKTtcbiAgICB9O1xuICB9LCBbYXV0b0ZpdFZpZXdwb3J0LCBvZmZzZXQsIG9wZW4sIG92ZXJsYXlSZWYsIHRhcmdldFJlZiwgdmlld3BvcnRQYWRkaW5nXSk7XG5cbiAgcmV0dXJuIHN0eWxlO1xufTtcbiIsICJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvbkRvd25TdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xOS41IDguMjUtNy41IDcuNS03LjUtNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgQ2hldnJvblVwU3ZnID0gKHsgY2xhc3NOYW1lID0gXCJoLTUgdy01XCIgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8c3ZnXHJcbiAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxyXG4gICAgICBmaWxsPVwibm9uZVwiXHJcbiAgICAgIHZpZXdCb3g9XCIwIDAgMjQgMjRcIlxyXG4gICAgICBzdHJva2VXaWR0aD17MS41fVxyXG4gICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxyXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cclxuICAgICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcclxuICAgID5cclxuICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtNC41IDE1Ljc1IDcuNS03LjUgNy41IDcuNVwiIC8+XHJcbiAgICA8L3N2Zz5cclxuICApO1xyXG59O1xyXG5cclxuIiwgImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlTWVtbywgdXNlUmVmIH0gZnJvbSBcInJlYWN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgdXNlT3V0c2lkZUNsaWNrID0gKFxyXG4gIHJlZnM6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4gfCBBcnJheTxSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+PixcclxuICBvbkNsb3NlOiAoKSA9PiB2b2lkXHJcbikgPT4ge1xyXG4gIGNvbnN0IGxpc3QgPSB1c2VNZW1vKCgpID0+IChBcnJheS5pc0FycmF5KHJlZnMpID8gcmVmcyA6IFtyZWZzXSksIFtyZWZzXSk7XHJcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZihsaXN0KTtcclxuICBjb25zdCBvbkNsb3NlUmVmID0gdXNlUmVmKG9uQ2xvc2UpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgbGlzdFJlZi5jdXJyZW50ID0gbGlzdDtcclxuICB9LCBbbGlzdF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgb25DbG9zZVJlZi5jdXJyZW50ID0gb25DbG9zZTtcclxuICB9LCBbb25DbG9zZV0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaGFuZGxlciA9IChldjogTW91c2VFdmVudCB8IFRvdWNoRXZlbnQpID0+IHtcclxuICAgICAgY29uc3QgY3VycmVudExpc3QgPSBsaXN0UmVmLmN1cnJlbnQ7XHJcbiAgICAgIGNvbnN0IGlzSW5zaWRlID0gY3VycmVudExpc3Quc29tZSgocikgPT4gcj8uY3VycmVudCAmJiByLmN1cnJlbnQuY29udGFpbnMoZXYudGFyZ2V0IGFzIE5vZGUpKTtcclxuICAgICAgaWYgKGlzSW5zaWRlKSByZXR1cm47XHJcbiAgICAgIG9uQ2xvc2VSZWYuY3VycmVudCgpO1xyXG4gICAgfTtcclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGhhbmRsZXIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlciwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG5cclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XHJcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIGhhbmRsZXIpO1xyXG4gICAgfTtcclxuICB9LCBbXSk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBNEQ7OztBQ0E1RCxJQUFBQyxnQkFBOEI7QUFDOUIsdUJBQTZCOzs7QUNEN0IsbUJBQTBEO0FBbUIxRCxJQUFNLG9CQUFvQjtBQUMxQixJQUFNLDhCQUE4QjtBQUVwQyxJQUFNLFFBQVEsQ0FBQyxPQUFlLEtBQWEsUUFBd0I7QUFDakUsTUFBSSxNQUFNLElBQUssUUFBTztBQUN0QixTQUFPLEtBQUssSUFBSSxLQUFLLElBQUksT0FBTyxHQUFHLEdBQUcsR0FBRztBQUMzQztBQUVBLElBQU0seUJBQXlCLENBQUMsTUFBNkIsVUFBMEM7QUFDckcsU0FDRSxLQUFLLFFBQVEsTUFBTSxPQUNuQixLQUFLLFNBQVMsTUFBTSxRQUNwQixLQUFLLFVBQVUsTUFBTSxTQUNyQixLQUFLLGNBQWMsTUFBTSxhQUN6QixLQUFLLGNBQWMsTUFBTTtBQUU3QjtBQUdPLElBQU0sc0JBQXNCLENBQ2pDLFdBQ0EsTUFDQTtBQUFBLEVBQ0U7QUFBQSxFQUNBLFNBQVM7QUFBQSxFQUNULGtCQUFrQjtBQUFBLEVBQ2xCLGtCQUFrQjtBQUNwQixJQUE2QixDQUFDLE1BQzNCO0FBQ0gsUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHVCQUFnQztBQUFBLElBQ3hELEtBQUs7QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxFQUNiLENBQUM7QUFFRCxvQ0FBZ0IsTUFBTTtBQUNwQixRQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsUUFBUztBQUVqQyxVQUFNLFNBQVMsTUFBTTtBQUNuQixZQUFNLE9BQU8sVUFBVSxTQUFTLHNCQUFzQjtBQUN0RCxVQUFJLENBQUMsS0FBTTtBQUVYLFlBQU0sZ0JBQWdCLE9BQU8sY0FBYyxTQUFTLGdCQUFnQixlQUFlO0FBQ25GLFlBQU0saUJBQWlCLE9BQU8sZUFBZSxTQUFTLGdCQUFnQixnQkFBZ0I7QUFDdEYsWUFBTSxpQkFBaUIsWUFBWTtBQUNuQyxZQUFNLGNBQWMsZ0JBQWdCLHNCQUFzQjtBQUMxRCxZQUFNLGdCQUFnQixLQUFLLElBQUksYUFBYSxVQUFVLEdBQUcsZ0JBQWdCLGdCQUFnQixDQUFDO0FBQzFGLFlBQU0sWUFBWSxLQUFLLElBQUksS0FBSyxPQUFPLEtBQUssSUFBSSxHQUFHLGdCQUFnQixrQkFBa0IsQ0FBQyxDQUFDO0FBQ3ZGLFlBQU0sV0FBVyxNQUFNLEtBQUssTUFBTSxpQkFBaUIsZ0JBQWdCLFlBQVksZUFBZTtBQUU5RixVQUFJLENBQUMsaUJBQWlCO0FBQ3BCLGNBQU1DLGFBQW1DO0FBQUEsVUFDdkMsS0FBSyxLQUFLLFNBQVM7QUFBQSxVQUNuQixNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsVUFDUCxXQUFXO0FBQUEsVUFDWCxXQUFXO0FBQUEsUUFDYjtBQUNBLGlCQUFTLENBQUMsYUFBYyx1QkFBdUIsVUFBVUEsVUFBUyxJQUFJLFdBQVdBLFVBQVU7QUFDM0Y7QUFBQSxNQUNGO0FBRUEsWUFBTSxpQkFBaUIsS0FBSyxJQUFJLEdBQUcsaUJBQWlCLEtBQUssU0FBUyxTQUFTLGVBQWU7QUFDMUYsWUFBTSxpQkFBaUIsS0FBSyxJQUFJLEdBQUcsS0FBSyxNQUFNLFNBQVMsZUFBZTtBQUN0RSxZQUFNLGlCQUFpQixLQUFLLElBQUksZ0JBQWdCLGdCQUFnQixDQUFDO0FBQ2pFLFlBQU0sa0JBQWtCLGdCQUFnQixJQUFJLGdCQUFnQjtBQUM1RCxZQUFNLHFCQUNKLGtCQUFrQixrQkFBa0IsaUJBQWlCLGlCQUFpQixRQUFRO0FBQ2hGLFlBQU0sa0JBQWtCLHVCQUF1QixRQUFRLGlCQUFpQjtBQUN4RSxZQUFNLG9CQUFvQixLQUFLO0FBQUEsUUFDN0I7QUFBQSxRQUNBLGtCQUFrQixJQUNkLEtBQUssSUFBSSxtQkFBbUIsaUJBQWlCLGVBQWUsSUFDNUQsaUJBQWlCLGtCQUFrQjtBQUFBLE1BQ3pDO0FBQ0EsWUFBTSxVQUNKLHVCQUF1QixRQUNuQixLQUFLLElBQUksaUJBQWlCLEtBQUssTUFBTSxTQUFTLGlCQUFpQixJQUMvRCxLQUFLO0FBQUEsUUFDSCxLQUFLLFNBQVM7QUFBQSxRQUNkLEtBQUssSUFBSSxpQkFBaUIsaUJBQWlCLG9CQUFvQixlQUFlO0FBQUEsTUFDaEY7QUFFTixZQUFNLFlBQW1DO0FBQUEsUUFDdkMsS0FBSztBQUFBLFFBQ0wsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLFFBQ1AsV0FBVztBQUFBLFFBQ1gsV0FBVztBQUFBLE1BQ2I7QUFDQSxlQUFTLENBQUMsYUFBYyx1QkFBdUIsVUFBVSxTQUFTLElBQUksV0FBVyxTQUFVO0FBQUEsSUFDN0Y7QUFFQSxXQUFPO0FBQ1AsUUFBSSxpQkFBaUI7QUFDckIsVUFBTSxpQkFBaUIsTUFBTTtBQUMzQixVQUFJLGdCQUFnQjtBQUNsQixlQUFPLHFCQUFxQixjQUFjO0FBQUEsTUFDNUM7QUFDQSx1QkFBaUIsT0FBTyxzQkFBc0IsTUFBTTtBQUNsRCx5QkFBaUI7QUFDakIsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFFQSxVQUFNLGlCQUNKLE9BQU8sbUJBQW1CLGNBQ3RCLE9BQ0EsSUFBSSxlQUFlLE1BQU07QUFDdkIscUJBQWU7QUFBQSxJQUNqQixDQUFDO0FBQ1AsUUFBSSxnQkFBZ0I7QUFDbEIscUJBQWUsUUFBUSxVQUFVLE9BQU87QUFDeEMsVUFBSSxZQUFZLFNBQVM7QUFDdkIsdUJBQWUsUUFBUSxXQUFXLE9BQU87QUFBQSxNQUMzQztBQUFBLElBQ0Y7QUFFQSxVQUFNLG1CQUNKLE9BQU8scUJBQXFCLGVBQWUsQ0FBQyxZQUFZLFVBQ3BELE9BQ0EsSUFBSSxpQkFBaUIsTUFBTTtBQUN6QixxQkFBZTtBQUFBLElBQ2pCLENBQUM7QUFDUCxzQkFBa0IsUUFBUSxXQUFXLFNBQVM7QUFBQSxNQUM1QyxXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsTUFDVCxlQUFlO0FBQUEsSUFDakIsQ0FBQztBQUVELFVBQU0sV0FBVyxNQUFNLFFBQVEsZUFBZTtBQUM5QyxXQUFPLGlCQUFpQixVQUFVLFVBQVUsRUFBRSxTQUFTLE1BQU0sU0FBUyxLQUFLLENBQUM7QUFDNUUsV0FBTyxpQkFBaUIsVUFBVSxjQUFjO0FBQ2hELFdBQU8sTUFBTTtBQUNYLFVBQUksZ0JBQWdCO0FBQ2xCLGVBQU8scUJBQXFCLGNBQWM7QUFBQSxNQUM1QztBQUNBLHNCQUFnQixXQUFXO0FBQzNCLHdCQUFrQixXQUFXO0FBQzdCLGFBQU8sb0JBQW9CLFVBQVUsVUFBVSxJQUFJO0FBQ25ELGFBQU8sb0JBQW9CLFVBQVUsY0FBYztBQUFBLElBQ3JEO0FBQUEsRUFDRixHQUFHLENBQUMsaUJBQWlCLFFBQVEsTUFBTSxZQUFZLFdBQVcsZUFBZSxDQUFDO0FBRTFFLFNBQU87QUFDVDs7O0FEN0dNO0FBcENOLElBQU0sZUFBZSxDQUFDO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsRUFDQSxTQUFTO0FBQUEsRUFDVDtBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsRUFDakIsZUFBZTtBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGtCQUFrQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRixNQUFhO0FBQ1gsUUFBTSxlQUFXLHNCQUE4QixJQUFJO0FBQ25ELFFBQU0sUUFBUSxvQkFBb0IsV0FBVyxNQUFNO0FBQUEsSUFDakQsWUFBWTtBQUFBLElBQ1o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUNELE1BQUksQ0FBQyxLQUFNLFFBQU87QUFDbEIsYUFBTztBQUFBLElBQ0w7QUFBQSxNQUFDO0FBQUE7QUFBQSxRQUNDLDJCQUF5QixNQUFNO0FBQUEsUUFDL0IsT0FBTztBQUFBLFVBQ0wsVUFBVTtBQUFBLFVBQ1YsS0FBSyxNQUFNO0FBQUEsVUFDWCxNQUFNLE1BQU07QUFBQSxVQUNaLE9BQU8sT0FBTyxpQkFBaUIsWUFBWSxPQUFPLFNBQVMsWUFBWSxJQUFJLGVBQWUsTUFBTTtBQUFBLFVBQ2hHO0FBQUEsUUFDRjtBQUFBLFFBQ0EsV0FBVztBQUFBLFFBRVg7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLEtBQUs7QUFBQSxZQUNMO0FBQUEsWUFDQSxXQUFXLHdCQUF3QixZQUFZLDZFQUE2RSxjQUFjLElBQUksa0JBQWtCLEVBQUU7QUFBQSxZQUNsSyxPQUFPO0FBQUEsY0FDTCxXQUFXLE1BQU07QUFBQSxjQUNqQixvQkFBb0I7QUFBQSxjQUNwQixHQUFHO0FBQUEsWUFDTDtBQUFBLFlBRUM7QUFBQTtBQUFBLFFBQ0g7QUFBQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxFQUNYO0FBQ0Y7QUFFQSxJQUFPLHVCQUFROzs7QUU3RFQsSUFBQUMsc0JBQUE7QUFYQyxJQUFNLGlCQUFpQixDQUFDLEVBQUUsWUFBWSxVQUFVLE1BQU07QUFDM0QsU0FDRTtBQUFBLElBQUM7QUFBQTtBQUFBLE1BQ0MsT0FBTTtBQUFBLE1BQ04sTUFBSztBQUFBLE1BQ0wsU0FBUTtBQUFBLE1BQ1IsYUFBYTtBQUFBLE1BQ2IsUUFBTztBQUFBLE1BQ1A7QUFBQSxNQUNBLGVBQVk7QUFBQSxNQUVaLHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSw4QkFBNkI7QUFBQTtBQUFBLEVBQ3BGO0FBRUo7QUFFTyxJQUFNLGVBQWUsQ0FBQyxFQUFFLFlBQVksVUFBVSxNQUFNO0FBQ3pELFNBQ0U7QUFBQSxJQUFDO0FBQUE7QUFBQSxNQUNDLE9BQU07QUFBQSxNQUNOLE1BQUs7QUFBQSxNQUNMLFNBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLFFBQU87QUFBQSxNQUNQO0FBQUEsTUFDQSxlQUFZO0FBQUEsTUFFWix1REFBQyxVQUFLLGVBQWMsU0FBUSxnQkFBZSxTQUFRLEdBQUUsOEJBQTZCO0FBQUE7QUFBQSxFQUNwRjtBQUVKOzs7QUNoQ0EsSUFBQUMsZ0JBQTJDO0FBRXBDLElBQU0sa0JBQWtCLENBQzdCLE1BQ0EsWUFDRztBQUNILFFBQU0sV0FBTyx1QkFBUSxNQUFPLE1BQU0sUUFBUSxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksR0FBSSxDQUFDLElBQUksQ0FBQztBQUN4RSxRQUFNLGNBQVUsc0JBQU8sSUFBSTtBQUMzQixRQUFNLGlCQUFhLHNCQUFPLE9BQU87QUFFakMsK0JBQVUsTUFBTTtBQUNkLFlBQVEsVUFBVTtBQUFBLEVBQ3BCLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFFVCwrQkFBVSxNQUFNO0FBQ2QsZUFBVyxVQUFVO0FBQUEsRUFDdkIsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUVaLCtCQUFVLE1BQU07QUFDZCxVQUFNLFVBQVUsQ0FBQyxPQUFnQztBQUMvQyxZQUFNLGNBQWMsUUFBUTtBQUM1QixZQUFNLFdBQVcsWUFBWSxLQUFLLENBQUMsTUFBTSxHQUFHLFdBQVcsRUFBRSxRQUFRLFNBQVMsR0FBRyxNQUFjLENBQUM7QUFDNUYsVUFBSSxTQUFVO0FBQ2QsaUJBQVcsUUFBUTtBQUFBLElBQ3JCO0FBRUEsYUFBUyxpQkFBaUIsYUFBYSxPQUFPO0FBQzlDLGFBQVMsaUJBQWlCLGNBQWMsU0FBUyxFQUFFLFNBQVMsS0FBSyxDQUFDO0FBRWxFLFdBQU8sTUFBTTtBQUNYLGVBQVMsb0JBQW9CLGFBQWEsT0FBTztBQUNqRCxlQUFTLG9CQUFvQixjQUFjLE9BQU87QUFBQSxJQUNwRDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFDUDs7O0FKcVF5QixJQUFBQyxzQkFBQTtBQS9RekIsSUFBTSxlQUFpQyxFQUFFLE9BQU8sSUFBSSxNQUFNLEdBQUc7QUFFN0QsSUFBTSxzQkFBc0IsQ0FBQyxVQUFzRDtBQUNqRixTQUFPLE9BQU8sU0FBUyxFQUFFLEVBQUUsS0FBSyxFQUFFLFlBQVk7QUFDaEQ7QUF3Q0EsSUFBTSxpQkFBaUIsQ0FBQztBQUFBLEVBQ3RCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLFVBQVU7QUFBQSxFQUNWLFdBQVc7QUFBQSxFQUNYLFdBQVc7QUFBQSxFQUNYLFlBQVk7QUFBQSxFQUNaLG9CQUFvQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLG1CQUFtQjtBQUFBLEVBQ25CLGlCQUFpQjtBQUFBLEVBQ2pCLFlBQVk7QUFBQSxFQUNaLG1CQUFtQjtBQUFBLEVBQ25CLG1CQUFtQjtBQUFBLEVBQ25CLHFCQUFxQjtBQUFBLEVBQ3JCLHlCQUF5QjtBQUFBLEVBQ3pCLHdCQUF3QjtBQUFBLEVBQ3hCLHNCQUFzQjtBQUFBLEVBQ3RCLDhCQUE4QjtBQUFBLEVBQzlCLCtCQUErQjtBQUFBLEVBQy9CLDhCQUE4QjtBQUFBLEVBQzlCLDZCQUE2QjtBQUFBLEVBQzdCLHNCQUFzQjtBQUFBLEVBQ3RCLHlCQUF5QjtBQUFBLEVBQ3pCLHdCQUF3QjtBQUFBLEVBQ3hCLDBCQUEwQjtBQUFBLEVBQzFCLGdDQUFnQztBQUFBLEVBQ2hDO0FBQUEsRUFDQSxvQkFBb0I7QUFDdEIsTUFBMkI7QUFDekIsUUFBTSxpQkFBaUIsQ0FBQyxTQUFrQztBQUN4RCxRQUFJLENBQUMsU0FBVTtBQUVmLFFBQUksT0FBTyxhQUFhLFlBQVk7QUFDbEMsZUFBUyxJQUFJO0FBQ2I7QUFBQSxJQUNGO0FBRUEsYUFBUyxVQUFVO0FBQUEsRUFDckI7QUFFQSxRQUFNLGVBQWUsWUFBWTtBQUNqQyxRQUFNLGFBQWEsZUFBZSxZQUFZO0FBQzlDLFFBQU0sV0FBTyx1QkFBUSxNQUFNO0FBQ3pCLFlBQVEsV0FBVyxDQUFDLEdBQUcsSUFBc0IsQ0FBQyxNQUFNO0FBQ2xELFVBQUksTUFBTSxRQUFRLENBQUMsR0FBRztBQUNwQixlQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsS0FBSyxJQUFJLE1BQU0sRUFBRSxDQUFDLEtBQUssR0FBRztBQUFBLE1BQy9DO0FBQ0EsYUFBTztBQUFBLFFBQ0wsT0FBTyxHQUFHLFNBQVMsR0FBRyxTQUFTO0FBQUEsUUFDL0IsTUFBTSxHQUFHLFFBQVEsR0FBRyxRQUFRO0FBQUEsUUFDNUIsTUFBTSxHQUFHLFFBQVEsR0FBRztBQUFBLE1BQ3RCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsT0FBTyxDQUFDO0FBRVosUUFBTSxDQUFDLE9BQU8sUUFBUSxRQUFJLHdCQUF3QixJQUFJO0FBQ3RELFFBQU0sQ0FBQyxVQUFVLFdBQVcsUUFBSTtBQUFBLElBQzlCLEtBQUssS0FBSyxDQUFDLE1BQU0sT0FBTyxFQUFFLEtBQUssTUFBTSxPQUFPLEtBQUssQ0FBQyxLQUFLO0FBQUEsRUFDekQ7QUFDQSxRQUFNLENBQUMsTUFBTSxPQUFPLFFBQUksd0JBQVMsS0FBSztBQUN0QyxRQUFNLENBQUMsYUFBYSxjQUFjLFFBQUksd0JBQVMsQ0FBQztBQUNoRCxRQUFNLENBQUMsbUJBQW1CLG9CQUFvQixRQUFJLHdCQUFTLEtBQUs7QUFDaEUsUUFBTSxtQkFBZSxzQkFBOEIsSUFBSTtBQUN2RCxRQUFNLGFBQVMsc0JBQThCLElBQUk7QUFDakQsUUFBTSxjQUFVLHNCQUE4QixJQUFJO0FBQ2xELFFBQU0sOEJBQTBCLHNCQUFzQixJQUFJO0FBRTFELFFBQU0sbUJBQW1CLENBQUMsVUFBbUIsaUJBQTBCO0FBQ3JFLGdCQUFZLFlBQVk7QUFDeEIsYUFBUyxFQUFFO0FBQ1gsbUJBQWUsQ0FBQztBQUNoQix5QkFBcUIsWUFBWTtBQUNqQyxZQUFRLFFBQVE7QUFDaEIsUUFBSSxDQUFDLG1CQUFtQjtBQUN0QixlQUFTLEVBQUU7QUFBQSxJQUNiO0FBQUEsRUFDRjtBQUVBLGtCQUFnQixDQUFDLGNBQWMsT0FBTyxHQUFHLE1BQU07QUFDN0MsUUFBSSxVQUFVLE1BQU07QUFDbEIsdUJBQWlCLE9BQU8sS0FBSztBQUM3QjtBQUFBLElBQ0Y7QUFFQSx5QkFBcUIsS0FBSztBQUMxQixZQUFRLEtBQUs7QUFBQSxFQUNmLENBQUM7QUFFRCwrQkFBVSxNQUFNO0FBQ2QsVUFBTSxlQUFlLEtBQUssS0FBSyxDQUFDLE1BQU0sT0FBTyxFQUFFLEtBQUssTUFBTSxPQUFPLEtBQUssQ0FBQyxLQUFLO0FBQzVFLGdCQUFZLFlBQVk7QUFFeEIsUUFBSSxPQUFPLFNBQVMsRUFBRSxFQUFFLEtBQUssR0FBRztBQUM5QixlQUFTLElBQUk7QUFDYiwyQkFBcUIsS0FBSztBQUFBLElBQzVCO0FBQUEsRUFDRixHQUFHLENBQUMsT0FBTyxJQUFJLENBQUM7QUFFaEIsK0JBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxrQkFBbUI7QUFDeEIsYUFBUyxVQUFVLFFBQVEsT0FBTyxTQUFTLEtBQUssSUFBSSxFQUFFO0FBQUEsRUFDeEQsR0FBRyxDQUFDLG1CQUFtQixVQUFVLFFBQVEsQ0FBQztBQUUxQyxRQUFNLGVBQVcsdUJBQVEsTUFBTTtBQUM3QixRQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxFQUFHLFFBQU87QUFDcEMsVUFBTSxrQkFBa0Isb0JBQW9CLEtBQUs7QUFDakQsV0FBTyxLQUFLLE9BQU8sQ0FBQyxXQUFXO0FBQzdCLFlBQU0sY0FBYyxvQkFBb0IsT0FBTyxLQUFLO0FBQ3BELFlBQU0sYUFBYSxvQkFBb0IsT0FBTyxJQUFJO0FBQ2xELGFBQU8sV0FBVyxTQUFTLGVBQWUsS0FBSyxZQUFZLFNBQVMsZUFBZTtBQUFBLElBQ3JGLENBQUM7QUFBQSxFQUNILEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQztBQUNoQixRQUFNLHNCQUNKLFNBQVMsU0FBUyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksYUFBYSxDQUFDLEdBQUcsU0FBUyxTQUFTLENBQUMsSUFBSTtBQUVsRixRQUFNLGVBQWUsQ0FBQyxRQUEwQjtBQUM5QyxnQkFBWSxHQUFHO0FBQ2YsYUFBUyxJQUFJO0FBQ2IseUJBQXFCLEtBQUs7QUFDMUIsWUFBUSxLQUFLO0FBQ2IsUUFBSSxDQUFDLG1CQUFtQjtBQUN0QixlQUFTLEtBQUssUUFBUSxPQUFPLElBQUksS0FBSyxJQUFJLEVBQUU7QUFBQSxJQUM5QztBQUFBLEVBQ0Y7QUFFQSxRQUFNLGdCQUFnQixDQUFDLE9BQThDO0FBQ25FLFFBQUksU0FBVTtBQUNkLFFBQUksR0FBRyxRQUFRLGFBQWE7QUFDMUIsU0FBRyxlQUFlO0FBQ2xCLGNBQVEsSUFBSTtBQUNaLFVBQUksU0FBUyxPQUFRLGdCQUFlLENBQUMsU0FBUyxNQUFNLEtBQUssU0FBUyxNQUFNO0FBQ3hFO0FBQUEsSUFDRjtBQUNBLFFBQUksR0FBRyxRQUFRLFdBQVc7QUFDeEIsU0FBRyxlQUFlO0FBQ2xCLGNBQVEsSUFBSTtBQUNaLFVBQUksU0FBUyxPQUFRLGdCQUFlLENBQUMsU0FBUyxNQUFNLElBQUksU0FBUyxVQUFVLFNBQVMsTUFBTTtBQUMxRjtBQUFBLElBQ0Y7QUFDQSxRQUFJLEdBQUcsUUFBUSxTQUFTO0FBQ3RCLFNBQUcsZUFBZTtBQUNsQixVQUFJLHFCQUFxQixVQUFVLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRztBQUN4RCw2QkFBcUIsS0FBSztBQUMxQixnQkFBUSxLQUFLO0FBQ2I7QUFBQSxNQUNGO0FBQ0EsVUFBSSxRQUFRLFNBQVMsUUFBUTtBQUMzQixxQkFBYSxTQUFTLG1CQUFtQixLQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQUEsTUFDM0QsV0FBVyxVQUFVLFFBQVEsTUFBTSxLQUFLLEdBQUc7QUFDekMseUJBQWlCLE1BQU0sSUFBSTtBQUFBLE1BQzdCLE9BQU87QUFDTCw2QkFBcUIsS0FBSztBQUMxQixnQkFBUSxJQUFJO0FBQUEsTUFDZDtBQUFBLElBQ0Y7QUFDQSxRQUFJLEdBQUcsUUFBUSxVQUFVO0FBQ3ZCLFVBQUksVUFBVSxNQUFNO0FBQ2xCLHlCQUFpQixPQUFPLEtBQUs7QUFDN0I7QUFBQSxNQUNGO0FBRUEsMkJBQXFCLEtBQUs7QUFDMUIsY0FBUSxLQUFLO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFNBQVMsT0FBTyxVQUFVLFNBQVMsUUFBUTtBQUNqRCxRQUFNLFNBQVMsa0JBQWtCLE1BQU07QUFDdkMsUUFBTSxXQUNKLFFBQVEsU0FBUyxtQkFBbUIsSUFBSSxjQUFjLE1BQU0sSUFBSSxTQUFTLG1CQUFtQixFQUFFLEtBQUssS0FBSztBQUMxRyxRQUFNLFdBQVcsUUFBUSxDQUFDO0FBQzFCLFFBQU0sZ0JBQWdCLE9BQU8sVUFBVSxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBQ3pELFFBQU0sc0JBQXNCLHFCQUFxQixVQUFVLGdCQUFnQixVQUFVLFFBQVE7QUFDN0YsUUFBTSxlQUFlLFVBQVUsT0FBTyxRQUFTLGdCQUFnQixzQkFBc0I7QUFDckYsUUFBTSxtQkFBbUIsVUFBVSxRQUFRLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFVBQVU7QUFDMUUsUUFBTSxrQkFBa0IscUJBQXNCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxTQUFTLFdBQVc7QUFDL0YsUUFBTSw2QkFBNkIsT0FBTyxTQUFTLGdCQUFnQixJQUFJLEtBQUssSUFBSSxHQUFHLGdCQUFnQixJQUFJO0FBQ3ZHLFFBQU0sK0JBQStCLE9BQU8sU0FBUyxrQkFBa0IsSUFBSSxLQUFLLElBQUksR0FBRyxrQkFBa0IsSUFBSTtBQUU3RywrQkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLDZCQUE4QjtBQUNuQyxRQUFJLENBQUMsU0FBVTtBQUNmLFFBQUksd0JBQXdCLFlBQVksS0FBTTtBQUU5QyxVQUFNLFFBQVEsT0FBTyxTQUFTLHNCQUFzQixFQUFFO0FBQ3RELFFBQUksQ0FBQyxPQUFPLFNBQVMsS0FBSyxLQUFLLENBQUMsU0FBUyxTQUFTLEVBQUc7QUFDckQsNEJBQXdCLFVBQVU7QUFBQSxFQUNwQyxHQUFHLENBQUMsVUFBVSw0QkFBNEIsQ0FBQztBQUUzQyxRQUFNLHNCQUFzQixPQUFPLFNBQVMsc0JBQXNCLEVBQUU7QUFDcEUsUUFBTSxnQ0FDSixPQUFPLFNBQVMsbUJBQW1CLEtBQUssdUJBQXVCLHNCQUFzQixJQUFJLHNCQUFzQjtBQUNqSCxRQUFNLHlCQUF5QiwrQkFDM0Isd0JBQXdCLFdBQVcsZ0NBQ25DO0FBQ0osUUFBTSw2QkFDSiwyQkFBMkIsUUFBUSxPQUFPLFNBQVMsc0JBQXNCLElBQ3JFLHlCQUF5Qiw2QkFDekI7QUFDTixRQUFNLDBCQUNKLCtCQUErQixPQUMzQixLQUFLLElBQUksNEJBQTRCLGdDQUFnQyxDQUFDLElBQ3RFO0FBQ04sUUFBTSxzQkFDSiw0QkFBNEIsUUFBUSwwQkFBMEIsSUFDMUQ7QUFBQSxJQUNFLE9BQU8sR0FBRyx1QkFBdUI7QUFBQSxJQUNqQyxHQUFJLCtCQUErQixJQUFJLEVBQUUsVUFBVSxHQUFHLDRCQUE0QixLQUFLLElBQUksQ0FBQztBQUFBLEVBQzlGLElBQ0EsNkJBQTZCLElBQzNCO0FBQUEsSUFDRSxPQUFPLGVBQWUsMEJBQTBCO0FBQUEsSUFDaEQsR0FBSSwrQkFBK0IsSUFBSSxFQUFFLFVBQVUsR0FBRyw0QkFBNEIsS0FBSyxJQUFJLENBQUM7QUFBQSxFQUM5RixJQUNBLCtCQUErQixJQUM3QixFQUFFLFVBQVUsR0FBRyw0QkFBNEIsS0FBSyxJQUNsRDtBQUVSLFFBQU0sV0FDSiw4Q0FBQyxTQUFJLElBQUksUUFBUSxLQUFLLFNBQVMsTUFBSyxXQUFVLGNBQVksT0FDdkQ7QUFBQSxzQkFBa0IsNkNBQUMsU0FBSSxXQUFVLG9DQUFvQyxlQUFLLG1CQUFtQixXQUFXLEdBQUUsSUFBUztBQUFBLElBQ25ILFNBQVMsSUFBSSxDQUFDLEtBQUssUUFBUTtBQUMxQixZQUFNLE1BQU0sVUFBVSxVQUFVLElBQUk7QUFDcEMsWUFBTSxXQUFXLFFBQVE7QUFDekIsWUFBTSx1QkFBdUIsTUFBTSwwQkFBMEIsV0FBVyx3QkFBd0I7QUFDaEcsYUFDRTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsTUFBSztBQUFBLFVBRUwsSUFBSSxjQUFjLE1BQU0sSUFBSSxJQUFJLEtBQUs7QUFBQSxVQUNyQyxNQUFLO0FBQUEsVUFDTCxpQkFBZTtBQUFBLFVBQ2YsV0FBVztBQUFBLFlBQ1Q7QUFBQSxZQUNBO0FBQUEsWUFDQSw4QkFBOEIsS0FBSztBQUFBLFlBQ25DO0FBQUEsVUFDRjtBQUFBLFVBQ0EsT0FDRSw4QkFDSSxFQUFFLFdBQVcsUUFBUSxXQUFXLFVBQVUseUJBQXlCLFFBQVEsSUFDM0U7QUFBQSxVQUVOLGNBQWMsTUFBTSxlQUFlLEdBQUc7QUFBQSxVQUN0QyxTQUFTLE1BQU0sYUFBYSxHQUFHO0FBQUEsVUFFOUI7QUFBQSxtQkFDQztBQUFBLGNBQUM7QUFBQTtBQUFBLGdCQUNDLFdBQVc7QUFBQSxrQkFDVDtBQUFBLGtCQUNBLFdBQVcsZUFBZTtBQUFBLGdCQUM1QjtBQUFBO0FBQUEsWUFDRDtBQUFBLFlBRUg7QUFBQSxjQUFDO0FBQUE7QUFBQSxnQkFDQyxXQUFXO0FBQUEsa0JBQ1QsOEJBQThCLG1DQUFtQztBQUFBLGtCQUNqRSxNQUFNLGdCQUFnQjtBQUFBLGdCQUN4QjtBQUFBLGdCQUNBLE9BQU8sOEJBQThCLEVBQUUsVUFBVSxjQUFjLElBQUk7QUFBQSxnQkFFbEU7QUFBQSxzQkFBSSxPQUNIO0FBQUEsb0JBQUM7QUFBQTtBQUFBLHNCQUNDLFdBQVc7QUFBQSx3QkFDVDtBQUFBLHdCQUNBO0FBQUEsd0JBQ0EsV0FBVyxlQUFlO0FBQUEsc0JBQzVCO0FBQUEsc0JBRUMsY0FBSTtBQUFBO0FBQUEsa0JBQ1AsSUFDRTtBQUFBLGtCQUNKO0FBQUEsb0JBQUM7QUFBQTtBQUFBLHNCQUNDLFdBQVcsV0FBVyw4QkFBOEIsVUFBVSxrQkFBa0IsbUJBQW1CO0FBQUEsc0JBQ25HLE9BQU8sOEJBQThCLEVBQUUsWUFBWSxTQUFTLElBQUk7QUFBQSxzQkFFL0QsY0FBSTtBQUFBO0FBQUEsa0JBQ1A7QUFBQTtBQUFBO0FBQUEsWUFDRjtBQUFBO0FBQUE7QUFBQSxRQWxESyxPQUFPLElBQUksS0FBSztBQUFBLE1BbUR2QjtBQUFBLElBRUosQ0FBQztBQUFBLEtBQ0g7QUFHRixTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQyxXQUFXLFdBQVcsYUFBYSxXQUFXLG9DQUFvQyxFQUFFO0FBQUEsTUFDcEYsS0FBSztBQUFBLE1BRUo7QUFBQSxvQkFBWSw2Q0FBQyxXQUFNLFdBQVcsV0FBVyw0QkFBNEIsVUFBVSxrQkFBa0IsRUFBRSxHQUFJLGlCQUFNLElBQVc7QUFBQSxRQUN6SCw4Q0FBQyxTQUFJLFdBQVUsWUFDYjtBQUFBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxLQUFLO0FBQUEsY0FDTCxXQUFXO0FBQUEsZ0JBQ1Q7QUFBQSxnQkFDQSxlQUFlLHVCQUF1QjtBQUFBLGNBQ3hDO0FBQUEsY0FDQSxPQUFPLGVBQWUsRUFBRSxPQUFPLFdBQVcsSUFBSTtBQUFBLGNBRTlDO0FBQUE7QUFBQSxrQkFBQztBQUFBO0FBQUEsb0JBQ0MsS0FBSztBQUFBLG9CQUNMLFdBQVc7QUFBQSxzQkFDVDtBQUFBLHNCQUNBLG1CQUFtQixnQ0FBZ0M7QUFBQSxzQkFDbkQsbUJBQW1CLFVBQVU7QUFBQSxzQkFDN0IsVUFDSSx5RUFDQTtBQUFBLHNCQUNKLGVBQWUsdUJBQXVCO0FBQUEsb0JBQ3hDO0FBQUEsb0JBQ0EsT0FBTyxlQUFlLEVBQUUsT0FBTyxXQUFXLElBQUk7QUFBQSxvQkFDOUMsT0FBTztBQUFBLG9CQUNQO0FBQUEsb0JBQ0EsVUFBVSxDQUFDLFVBQVU7QUFDbkIsMEJBQUksQ0FBQyxlQUFnQjtBQUNyQiw0QkFBTSxNQUFNLE1BQU0sT0FBTztBQUN6QixxQ0FBZSxDQUFDO0FBQ2hCLDJDQUFxQixLQUFLO0FBQzFCLCtCQUFTLEdBQUc7QUFDWiwwQkFBSSxxQkFBcUIsQ0FBQyxJQUFJLEtBQUssR0FBRztBQUNwQyx5Q0FBaUIsT0FBTyxLQUFLO0FBQzdCO0FBQUEsc0JBQ0Y7QUFDQSw4QkFBUSxJQUFJO0FBQUEsb0JBQ2Q7QUFBQSxvQkFDQSxXQUFXO0FBQUEsb0JBQ1gsU0FBUyxNQUFNO0FBQ2IsMEJBQUksQ0FBQyxTQUFVLFNBQVEsSUFBSTtBQUFBLG9CQUM3QjtBQUFBLG9CQUNBO0FBQUEsb0JBQ0EsVUFBVSxnQkFBZ0IsQ0FBQztBQUFBLG9CQUMzQixjQUFZO0FBQUEsb0JBQ1osTUFBSztBQUFBLG9CQUNMLGlCQUFlO0FBQUEsb0JBQ2YsaUJBQWU7QUFBQSxvQkFDZix5QkFBdUI7QUFBQTtBQUFBLGdCQUN6QjtBQUFBLGdCQUNDLG1CQUNDLDZDQUFDLFVBQUssV0FBVSx1RkFDZCx1REFBQyxVQUFLLFdBQVcsV0FBVywyQ0FBMkMscUJBQXFCLEdBQUksbUJBQVMsTUFBSyxHQUNoSCxJQUNFO0FBQUEsZ0JBQ0osOENBQUMsU0FBSSxXQUFVLDJEQUNaO0FBQUEscUNBQ0M7QUFBQSxvQkFBQztBQUFBO0FBQUEsc0JBQ0MsTUFBSztBQUFBLHNCQUNMLFdBQVU7QUFBQSxzQkFDVixTQUFTLE1BQU07QUFDYiw0QkFBSSxTQUFVO0FBQ2QsNEJBQUksVUFBVSxRQUFRLE1BQU0sS0FBSyxLQUFLLFNBQVMsV0FBVyxHQUFHO0FBQzNELDJDQUFpQixNQUFNLElBQUk7QUFDM0I7QUFBQSx3QkFDRjtBQUNBLGdDQUFRLElBQUk7QUFBQSxzQkFDZDtBQUFBLHNCQUNBLGNBQVksS0FBSyxpQkFBaUIsUUFBUTtBQUFBLHNCQUMxQztBQUFBLHNCQUVBLHVEQUFDLFNBQUksT0FBTSw4QkFBNkIsTUFBSyxRQUFPLFNBQVEsYUFBWSxhQUFhLEtBQUssUUFBTyxnQkFBZSxXQUFVLFdBQ3hILHVEQUFDLFVBQUssZUFBYyxTQUFRLGdCQUFlLFNBQVEsR0FBRSxrSUFBaUksR0FDeEw7QUFBQTtBQUFBLGtCQUNGLElBQ0U7QUFBQSxrQkFDSjtBQUFBLG9CQUFDO0FBQUE7QUFBQSxzQkFDQyxNQUFLO0FBQUEsc0JBQ0wsV0FBVTtBQUFBLHNCQUNWLFNBQVMsTUFBTTtBQUNiLDRCQUFJLFNBQVU7QUFDZCw0QkFBSSxRQUFRLFVBQVUsUUFBUSxNQUFNLEtBQUssR0FBRztBQUMxQywyQ0FBaUIsT0FBTyxLQUFLO0FBQzdCO0FBQUEsd0JBQ0Y7QUFDQSxnQ0FBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJO0FBQUEsc0JBQ3pCO0FBQUEsc0JBQ0EsY0FBWSxPQUFPLEtBQUssd0JBQXdCLGNBQWMsSUFBSSxLQUFLLHdCQUF3QixjQUFjO0FBQUEsc0JBQzdHO0FBQUEsc0JBRUMsaUJBQU8sNkNBQUMsZ0JBQWEsV0FBVSxXQUFVLElBQUssNkNBQUMsa0JBQWUsV0FBVSxXQUFVO0FBQUE7QUFBQSxrQkFDckY7QUFBQSxtQkFDRjtBQUFBO0FBQUE7QUFBQSxVQUNGO0FBQUEsVUFDQyxZQUNDO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxXQUFXO0FBQUEsY0FDWCxNQUFNO0FBQUEsY0FDTixRQUFRO0FBQUEsY0FDUixjQUFjLDJCQUEyQjtBQUFBLGNBQ3pDO0FBQUEsY0FDQSxnQkFBZ0I7QUFBQSxjQUNoQixNQUFLO0FBQUEsY0FDTCxjQUFhO0FBQUEsY0FDYjtBQUFBLGNBQ0E7QUFBQSxjQUVDO0FBQUE7QUFBQSxVQUNILElBRUEsWUFDRTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FBVyx3SEFBd0gsc0JBQXNCLGtCQUFrQixrQkFBa0IsRUFBRTtBQUFBLGNBQy9MLE9BQU8sRUFBRSxHQUFHLHFCQUFxQixHQUFJLGNBQWMsQ0FBQyxFQUFHO0FBQUEsY0FFdEQ7QUFBQTtBQUFBLFVBQ0g7QUFBQSxXQUdOO0FBQUE7QUFBQTtBQUFBLEVBQ0Y7QUFFSjtBQUVBLElBQU8seUJBQVE7IiwKICAibmFtZXMiOiBbImltcG9ydF9yZWFjdCIsICJpbXBvcnRfcmVhY3QiLCAibmV4dFN0eWxlIiwgImltcG9ydF9qc3hfcnVudGltZSIsICJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X2pzeF9ydW50aW1lIl0KfQo=
