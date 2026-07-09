import {
  classNames
} from "./chunk-UNQYUM6B.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-PNIKV5DC.js";
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
var resolvePositiveNumber = (value) => {
  const numericValue = typeof value === "number" ? value : 0;
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : 0;
};
var areFloatingStylesEqual = (left, right) => {
  return left.top === right.top && left.left === right.left && left.width === right.width && left.maxHeight === right.maxHeight && left.placement === right.placement;
};
var useFloatingPosition = (targetRef, open, {
  overlayRef,
  offset = DEFAULT_OFFSET_PX,
  viewportPadding = DEFAULT_VIEWPORT_PADDING_PX,
  autoFitViewport = false,
  matchAvailableWidth = false,
  minWidth = 0
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
      const overlayWidth = Math.max(overlayRect?.width || 0, overlayElement?.scrollWidth || 0);
      const availableWidth = Math.max(0, viewportWidth - viewportPadding * 2);
      const preferredWidth = Math.max(rect.width, overlayWidth, resolvePositiveNumber(minWidth));
      const nextWidth = matchAvailableWidth ? availableWidth : Math.min(preferredWidth, availableWidth);
      const nextLeft = matchAvailableWidth ? viewportPadding : clamp(rect.left, viewportPadding, viewportWidth - nextWidth - viewportPadding);
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
  }, [autoFitViewport, matchAvailableWidth, minWidth, offset, open, overlayRef, targetRef, viewportPadding]);
  return style;
};

// Web/wwwroot/react/src/components/commons/FloatingList.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var FloatingList = ({
  anchorRef,
  open,
  zIndex = 3e5,
  fixedWidthPx,
  minWidthPx,
  maxHeightClass = "max-h-72",
  roundedClass = "rounded-[var(--radius-xl)]",
  role,
  portalClassName,
  panelClassName,
  panelStyle,
  autoFitViewport = true,
  matchAvailableWidth = true,
  offset,
  viewportPadding,
  children
}) => {
  const panelRef = (0, import_react2.useRef)(null);
  const style = useFloatingPosition(anchorRef, open, {
    overlayRef: panelRef,
    autoFitViewport,
    matchAvailableWidth,
    minWidth: minWidthPx,
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
          width: !matchAvailableWidth && typeof fixedWidthPx === "number" && Number.isFinite(fixedWidthPx) ? fixedWidthPx : style.width,
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
var normalizeOption = (o) => {
  if (Array.isArray(o)) {
    return { value: o[0] ?? "", text: o[1] ?? "" };
  }
  return {
    value: o?.value ?? o?.Value ?? "",
    text: o?.text ?? o?.Text ?? "",
    icon: o?.icon ?? o?.Icon
  };
};
var normalizeLookupText = (value) => {
  return String(value ?? "").trim().toLowerCase();
};
var SelectCombobox = ({
  label,
  options,
  selectedOption,
  value,
  onChange,
  inputRef,
  placeholder,
  invalid = false,
  disabled = false,
  readOnly = false,
  usePortal = true,
  idBase,
  portalClassName,
  panelClassName,
  containerClassName = "space-y-2",
  labelClassName = "form-label font-semibold",
  showSearchButton = false,
  allowTextInput = true,
  showLabel = true,
  selectedTextMode = "text",
  dropdownExpandPx = 0,
  dropdownMinWidthPx = 0,
  dropdownUseAvailableWidth = true,
  dropdownMaxHeightClass = "max-h-72",
  dropdownPlacement = "bottom",
  selectedIconClassName = "h-4 w-4",
  optionIconClassName = "h-4 w-4",
  allowOptionHorizontalScroll = false,
  lockDropdownWidthOnFirstOpen = false,
  disableDefaultOptionPadding = false,
  optionLeftPaddingClassName = "",
  optionTextClassName = "",
  optionDefaultClassName = "text-slate-900",
  optionActiveClassName = "bg-primary text-white",
  optionSelectedClassName = "text-primary",
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
  const inlineDropdownPlacementClass = dropdownPlacement === "top" ? "bottom-full mb-1" : "mt-1";
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const data = (0, import_react4.useMemo)(() => {
    return (options || []).map(normalizeOption);
  }, [options]);
  const selectedDataOption = (0, import_react4.useMemo)(() => {
    if (!selectedOption) return null;
    return normalizeOption(selectedOption);
  }, [selectedOption]);
  const selected = (0, import_react4.useMemo)(() => {
    const optionValue = value;
    const normalizedValue = String(optionValue ?? "");
    if (!normalizedValue.trim()) return EMPTY_OPTION;
    return data.find((d) => String(d.value) === normalizedValue) || (selectedDataOption && String(selectedDataOption.value) === normalizedValue ? selectedDataOption : EMPTY_OPTION);
  }, [value, data, selectedDataOption]);
  const selectedValue = String(selected?.value ?? "").trim();
  const [query, setQuery] = (0, import_react4.useState)(null);
  const [open, setOpen] = (0, import_react4.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react4.useState)(0);
  const [showNotFoundState, setShowNotFoundState] = (0, import_react4.useState)(false);
  const [previousReadOnlyMode, setPreviousReadOnlyMode] = (0, import_react4.useState)(readOnlyMode);
  const containerRef = (0, import_react4.useRef)(null);
  const boxRef = (0, import_react4.useRef)(null);
  const listRef = (0, import_react4.useRef)(null);
  const initialDropdownWidthRef = (0, import_react4.useRef)(null);
  if (previousReadOnlyMode !== readOnlyMode) {
    setPreviousReadOnlyMode(readOnlyMode);
    if (readOnlyMode) {
      if (query !== null) setQuery(null);
      if (showNotFoundState) setShowNotFoundState(false);
      if (open) setOpen(false);
    }
  }
  const clearManualValue = (nextOpen, showNotFound) => {
    setQuery("");
    setActiveIndex(0);
    setShowNotFoundState(showNotFound);
    setOpen(nextOpen);
    onChange("");
  };
  useOutsideClick([containerRef, listRef], () => {
    if (readOnlyMode) {
      setQuery(null);
      setShowNotFoundState(false);
      setOpen(false);
      return;
    }
    if (query !== null) {
      clearManualValue(false, false);
      return;
    }
    setShowNotFoundState(false);
    setOpen(false);
  });
  (0, import_react4.useEffect)(() => {
    if (String(value ?? "").trim()) {
      setQuery(null);
      setShowNotFoundState(false);
    }
  }, [value]);
  const filtered = (0, import_react4.useMemo)(() => {
    if (!query || !query.trim()) return data;
    const normalizedQuery = normalizeLookupText(query);
    return data.filter((option) => {
      const optionValue = normalizeLookupText(option.value);
      const optionText = normalizeLookupText(option.text);
      return optionText.includes(normalizedQuery) || optionValue.includes(normalizedQuery);
    });
  }, [data, query]);
  const selectedIndex = filtered.findIndex((option) => String(option.value) === selectedValue);
  const preferredActiveIndex = selectedIndex >= 0 ? selectedIndex : 0;
  const resolvedActiveIndex = filtered.length > 0 ? Math.min(Math.max(activeIndex, 0), filtered.length - 1) : 0;
  const openListAtCurrentSelection = () => {
    if (readOnlyMode) return;
    setActiveIndex(preferredActiveIndex);
    setShowNotFoundState(false);
    setOpen(true);
  };
  const selectOption = (opt) => {
    if (readOnlyMode) return;
    const nextValue = String(opt?.value ?? "");
    setQuery(null);
    setShowNotFoundState(false);
    setOpen(false);
    onChange(nextValue);
  };
  const handleKeyDown = (ev) => {
    if (readOnlyMode) return;
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      if (!open) {
        openListAtCurrentSelection();
        return;
      }
      if (filtered.length) setActiveIndex((idx) => (idx + 1) % filtered.length);
      return;
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      if (!open) {
        openListAtCurrentSelection();
        return;
      }
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
        openListAtCurrentSelection();
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
  const listOpen = open && !readOnlyMode;
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
      const optionStateClassName = isActive ? optionActiveClassName : sel ? optionSelectedClassName : optionDefaultClassName;
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
      className: classNames(containerClassName, disabled ? "pointer-events-none select-none" : ""),
      ref: containerRef,
      children: [
        showLabel ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("label", { className: classNames(labelClassName, invalid ? "text-rose-700" : ""), children: label }) : null,
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
                      if (readOnlyMode || !allowTextInput) return;
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
                      if (!readOnlyMode) openListAtCurrentSelection();
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
                        if (readOnlyMode) return;
                        if (query !== null && query.trim() && filtered.length === 0) {
                          clearManualValue(true, true);
                          return;
                        }
                        openListAtCurrentSelection();
                      },
                      "aria-label": indT("Common_Search", "Search"),
                      disabled: readOnlyMode,
                      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
                    }
                  ) : null,
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                    "button",
                    {
                      type: "button",
                      className: "flex items-center p-1.5 text-slate-500 hover:text-slate-600",
                      onClick: () => {
                        if (readOnlyMode) return;
                        if (open && query !== null && query.trim()) {
                          clearManualValue(false, false);
                          return;
                        }
                        if (open) {
                          setOpen(false);
                          return;
                        }
                        openListAtCurrentSelection();
                      },
                      "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                      disabled: readOnlyMode,
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
              fixedWidthPx: dropdownUseAvailableWidth ? void 0 : resolvedDropdownWidthPx ?? void 0,
              panelStyle,
              maxHeightClass: dropdownMaxHeightClass,
              role: "listbox",
              roundedClass: "rounded-[var(--radius-xl)]",
              portalClassName,
              panelClassName,
              matchAvailableWidth: dropdownUseAvailableWidth,
              children: listBody
            }
          ) : listOpen && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              className: classNames(
                "absolute z-360000 w-full rounded-[var(--radius-xl)] bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden overflow-auto",
                inlineDropdownPlacementClass,
                dropdownMaxHeightClass,
                panelClassName || ""
              ),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9TZWxlY3RDb21ib2JveC50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9GbG9hdGluZ0xpc3QudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VGbG9hdGluZ1Bvc2l0aW9uLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9jb21wb25lbnRzL2NvbW1vbnMvY2hldnJvbnMudHN4IiwgIi4uLy4uL3JlYWN0L3NyYy9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZU1lbW8sIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IEZsb2F0aW5nTGlzdCBmcm9tIFwiLi9GbG9hdGluZ0xpc3QudHN4XCI7XHJcbmltcG9ydCB7IENoZXZyb25Eb3duU3ZnLCBDaGV2cm9uVXBTdmcgfSBmcm9tIFwiLi9jaGV2cm9ucy50c3hcIjtcclxuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xyXG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcclxuaW1wb3J0IHsgaW5kVCB9IGZyb20gXCIuLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XHJcblxyXG50eXBlIFJhd09wdGlvbiA9XHJcbiAgfCB7XHJcbiAgICAgIHZhbHVlPzogc3RyaW5nIHwgbnVtYmVyO1xyXG4gICAgICBWYWx1ZT86IHN0cmluZyB8IG51bWJlcjtcclxuICAgICAgdGV4dD86IHN0cmluZztcclxuICAgICAgVGV4dD86IHN0cmluZztcclxuICAgICAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICAgICAgSWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxuICAgIH1cclxuICB8IFtzdHJpbmcgfCBudW1iZXIsIHN0cmluZ107XHJcblxyXG50eXBlIE5vcm1hbGl6ZWRPcHRpb24gPSB7XHJcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgaWNvbj86IFJlYWN0LlJlYWN0Tm9kZTtcclxufTtcclxuXHJcbmNvbnN0IEVNUFRZX09QVElPTjogTm9ybWFsaXplZE9wdGlvbiA9IHsgdmFsdWU6IFwiXCIsIHRleHQ6IFwiXCIgfTtcclxuXHJcbmNvbnN0IG5vcm1hbGl6ZU9wdGlvbiA9IChvOiBSYXdPcHRpb24pOiBOb3JtYWxpemVkT3B0aW9uID0+IHtcclxuICBpZiAoQXJyYXkuaXNBcnJheShvKSkge1xyXG4gICAgcmV0dXJuIHsgdmFsdWU6IG9bMF0gPz8gXCJcIiwgdGV4dDogb1sxXSA/PyBcIlwiIH07XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgdmFsdWU6IG8/LnZhbHVlID8/IG8/LlZhbHVlID8/IFwiXCIsXHJcbiAgICB0ZXh0OiBvPy50ZXh0ID8/IG8/LlRleHQgPz8gXCJcIixcclxuICAgIGljb246IG8/Lmljb24gPz8gbz8uSWNvbixcclxuICB9O1xyXG59O1xyXG5cclxuY29uc3Qgbm9ybWFsaXplTG9va3VwVGV4dCA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCk6IHN0cmluZyA9PiB7XHJcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSA/PyBcIlwiKS50cmltKCkudG9Mb3dlckNhc2UoKTtcclxufTtcclxuXHJcbnR5cGUgU2VsZWN0Q29tYm9ib3hQcm9wcyA9IHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG4gIG9wdGlvbnM6IFJhd09wdGlvbltdO1xyXG4gIHNlbGVjdGVkT3B0aW9uPzogUmF3T3B0aW9uO1xyXG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIGlucHV0UmVmPzogUmVhY3QuUmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xyXG4gIHBsYWNlaG9sZGVyPzogc3RyaW5nO1xyXG4gIGludmFsaWQ/OiBib29sZWFuO1xyXG4gIGRpc2FibGVkPzogYm9vbGVhbjtcclxuICByZWFkT25seT86IGJvb2xlYW47XHJcbiAgdXNlUG9ydGFsPzogYm9vbGVhbjtcclxuICBpZEJhc2U/OiBzdHJpbmc7XHJcbiAgcG9ydGFsQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHBhbmVsQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIGNvbnRhaW5lckNsYXNzTmFtZT86IHN0cmluZztcclxuICBsYWJlbENsYXNzTmFtZT86IHN0cmluZztcclxuICBzaG93U2VhcmNoQnV0dG9uPzogYm9vbGVhbjtcclxuICBhbGxvd1RleHRJbnB1dD86IGJvb2xlYW47XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcclxuICBzZWxlY3RlZFRleHRNb2RlPzogXCJ0ZXh0XCIgfCBcInZhbHVlXCI7XHJcbiAgZHJvcGRvd25FeHBhbmRQeD86IG51bWJlcjtcclxuICBkcm9wZG93bk1pbldpZHRoUHg/OiBudW1iZXI7XHJcbiAgZHJvcGRvd25Vc2VBdmFpbGFibGVXaWR0aD86IGJvb2xlYW47XHJcbiAgZHJvcGRvd25NYXhIZWlnaHRDbGFzcz86IHN0cmluZztcclxuICBkcm9wZG93blBsYWNlbWVudD86IFwiYm90dG9tXCIgfCBcInRvcFwiO1xyXG4gIHNlbGVjdGVkSWNvbkNsYXNzTmFtZT86IHN0cmluZztcclxuICBvcHRpb25JY29uQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIGFsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbD86IGJvb2xlYW47XHJcbiAgbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3Blbj86IGJvb2xlYW47XHJcbiAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nPzogYm9vbGVhbjtcclxuICBvcHRpb25MZWZ0UGFkZGluZ0NsYXNzTmFtZT86IHN0cmluZztcclxuICBvcHRpb25UZXh0Q2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIG9wdGlvbkRlZmF1bHRDbGFzc05hbWU/OiBzdHJpbmc7XHJcbiAgb3B0aW9uQWN0aXZlQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIG9wdGlvblNlbGVjdGVkQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lPzogc3RyaW5nO1xyXG4gIHBhbmVsU3R5bGU/OiBSZWFjdC5DU1NQcm9wZXJ0aWVzO1xyXG4gIGNsZWFyT25FbXB0eUlucHV0PzogYm9vbGVhbjtcclxufTtcclxuXHJcbi8vIFJldXNhYmxlIHNlbGVjdCBjb21ib2JveCB3aXRoIG9wdGlvbmFsIHBvcnRhbCByZW5kZXJpbmcgZm9yIHRoZSBsaXN0LlxyXG5jb25zdCBTZWxlY3RDb21ib2JveCA9ICh7XHJcbiAgbGFiZWwsXHJcbiAgb3B0aW9ucyxcclxuICBzZWxlY3RlZE9wdGlvbixcclxuICB2YWx1ZSxcclxuICBvbkNoYW5nZSxcclxuICBpbnB1dFJlZixcclxuICBwbGFjZWhvbGRlcixcclxuICBpbnZhbGlkID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICByZWFkT25seSA9IGZhbHNlLFxyXG4gIHVzZVBvcnRhbCA9IHRydWUsXHJcbiAgaWRCYXNlLFxyXG4gIHBvcnRhbENsYXNzTmFtZSxcclxuICBwYW5lbENsYXNzTmFtZSxcclxuICBjb250YWluZXJDbGFzc05hbWUgPSBcInNwYWNlLXktMlwiLFxyXG4gIGxhYmVsQ2xhc3NOYW1lID0gXCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIixcclxuICBzaG93U2VhcmNoQnV0dG9uID0gZmFsc2UsXHJcbiAgYWxsb3dUZXh0SW5wdXQgPSB0cnVlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbiAgc2VsZWN0ZWRUZXh0TW9kZSA9IFwidGV4dFwiLFxyXG4gIGRyb3Bkb3duRXhwYW5kUHggPSAwLFxyXG4gIGRyb3Bkb3duTWluV2lkdGhQeCA9IDAsXHJcbiAgZHJvcGRvd25Vc2VBdmFpbGFibGVXaWR0aCA9IHRydWUsXG4gIGRyb3Bkb3duTWF4SGVpZ2h0Q2xhc3MgPSBcIm1heC1oLTcyXCIsXHJcbiAgZHJvcGRvd25QbGFjZW1lbnQgPSBcImJvdHRvbVwiLFxyXG4gIHNlbGVjdGVkSWNvbkNsYXNzTmFtZSA9IFwiaC00IHctNFwiLFxyXG4gIG9wdGlvbkljb25DbGFzc05hbWUgPSBcImgtNCB3LTRcIixcclxuICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPSBmYWxzZSxcclxuICBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuID0gZmFsc2UsXHJcbiAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nID0gZmFsc2UsXHJcbiAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWUgPSBcIlwiLFxyXG4gIG9wdGlvblRleHRDbGFzc05hbWUgPSBcIlwiLFxyXG4gIG9wdGlvbkRlZmF1bHRDbGFzc05hbWUgPSBcInRleHQtc2xhdGUtOTAwXCIsXHJcbiAgb3B0aW9uQWN0aXZlQ2xhc3NOYW1lID0gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIixcclxuICBvcHRpb25TZWxlY3RlZENsYXNzTmFtZSA9IFwidGV4dC1wcmltYXJ5XCIsXHJcbiAgc2VsZWN0ZWRJbnB1dFBhZGRpbmdDbGFzc05hbWUgPSBcInBsLTlcIixcclxuICBwYW5lbFN0eWxlLFxyXG4gIGNsZWFyT25FbXB0eUlucHV0ID0gZmFsc2UsXHJcbn06IFNlbGVjdENvbWJvYm94UHJvcHMpID0+IHtcclxuICBjb25zdCBhc3NpZ25JbnB1dFJlZiA9IChub2RlOiBIVE1MSW5wdXRFbGVtZW50IHwgbnVsbCkgPT4ge1xyXG4gICAgaWYgKCFpbnB1dFJlZikgcmV0dXJuO1xyXG5cclxuICAgIGlmICh0eXBlb2YgaW5wdXRSZWYgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICBpbnB1dFJlZihub2RlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0UmVmLmN1cnJlbnQgPSBub2RlO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xyXG4gIGNvbnN0IGlubGluZURyb3Bkb3duUGxhY2VtZW50Q2xhc3MgPSBkcm9wZG93blBsYWNlbWVudCA9PT0gXCJ0b3BcIiA/IFwiYm90dG9tLWZ1bGwgbWItMVwiIDogXCJtdC0xXCI7XHJcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcclxuICBjb25zdCBkYXRhID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICByZXR1cm4gKG9wdGlvbnMgfHwgW10pLm1hcDxOb3JtYWxpemVkT3B0aW9uPihub3JtYWxpemVPcHRpb24pO1xyXG4gIH0sIFtvcHRpb25zXSk7XHJcbiAgY29uc3Qgc2VsZWN0ZWREYXRhT3B0aW9uID0gdXNlTWVtbygoKSA9PiB7XHJcbiAgICBpZiAoIXNlbGVjdGVkT3B0aW9uKSByZXR1cm4gbnVsbDtcclxuICAgIHJldHVybiBub3JtYWxpemVPcHRpb24oc2VsZWN0ZWRPcHRpb24pO1xyXG4gIH0sIFtzZWxlY3RlZE9wdGlvbl0pO1xyXG4gIGNvbnN0IHNlbGVjdGVkID0gdXNlTWVtbzxOb3JtYWxpemVkT3B0aW9uPigoKSA9PiB7XHJcbiAgICBjb25zdCBvcHRpb25WYWx1ZSA9IHZhbHVlO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZFZhbHVlID0gU3RyaW5nKG9wdGlvblZhbHVlID8/IFwiXCIpO1xyXG4gICAgaWYgKCFub3JtYWxpemVkVmFsdWUudHJpbSgpKSByZXR1cm4gRU1QVFlfT1BUSU9OO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIGRhdGEuZmluZCgoZCkgPT4gU3RyaW5nKGQudmFsdWUpID09PSBub3JtYWxpemVkVmFsdWUpIHx8XHJcbiAgICAgIChzZWxlY3RlZERhdGFPcHRpb24gJiYgU3RyaW5nKHNlbGVjdGVkRGF0YU9wdGlvbi52YWx1ZSkgPT09IG5vcm1hbGl6ZWRWYWx1ZSA/IHNlbGVjdGVkRGF0YU9wdGlvbiA6IEVNUFRZX09QVElPTilcclxuICAgICk7XHJcbiAgfSwgW3ZhbHVlLCBkYXRhLCBzZWxlY3RlZERhdGFPcHRpb25dKTtcclxuICBjb25zdCBzZWxlY3RlZFZhbHVlID0gU3RyaW5nKHNlbGVjdGVkPy52YWx1ZSA/PyBcIlwiKS50cmltKCk7XHJcblxyXG4gIGNvbnN0IFtxdWVyeSwgc2V0UXVlcnldID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xyXG4gIGNvbnN0IFthY3RpdmVJbmRleCwgc2V0QWN0aXZlSW5kZXhdID0gdXNlU3RhdGUoMCk7XHJcbiAgY29uc3QgW3Nob3dOb3RGb3VuZFN0YXRlLCBzZXRTaG93Tm90Rm91bmRTdGF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW3ByZXZpb3VzUmVhZE9ubHlNb2RlLCBzZXRQcmV2aW91c1JlYWRPbmx5TW9kZV0gPSB1c2VTdGF0ZShyZWFkT25seU1vZGUpO1xyXG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGJveFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IGxpc3RSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcclxuICBjb25zdCBpbml0aWFsRHJvcGRvd25XaWR0aFJlZiA9IHVzZVJlZjxudW1iZXIgfCBudWxsPihudWxsKTtcclxuXHJcbiAgaWYgKHByZXZpb3VzUmVhZE9ubHlNb2RlICE9PSByZWFkT25seU1vZGUpIHtcclxuICAgIHNldFByZXZpb3VzUmVhZE9ubHlNb2RlKHJlYWRPbmx5TW9kZSk7XHJcbiAgICBpZiAocmVhZE9ubHlNb2RlKSB7XHJcbiAgICAgIGlmIChxdWVyeSAhPT0gbnVsbCkgc2V0UXVlcnkobnVsbCk7XHJcbiAgICAgIGlmIChzaG93Tm90Rm91bmRTdGF0ZSkgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICBpZiAob3Blbikgc2V0T3BlbihmYWxzZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjb25zdCBjbGVhck1hbnVhbFZhbHVlID0gKG5leHRPcGVuOiBib29sZWFuLCBzaG93Tm90Rm91bmQ6IGJvb2xlYW4pID0+IHtcclxuICAgIHNldFF1ZXJ5KFwiXCIpO1xyXG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShzaG93Tm90Rm91bmQpO1xyXG4gICAgc2V0T3BlbihuZXh0T3Blbik7XHJcbiAgICBvbkNoYW5nZShcIlwiKTtcclxuICB9O1xyXG5cclxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHtcclxuICAgIGlmIChyZWFkT25seU1vZGUpIHtcclxuICAgICAgc2V0UXVlcnkobnVsbCk7XHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocXVlcnkgIT09IG51bGwpIHtcclxuICAgICAgY2xlYXJNYW51YWxWYWx1ZShmYWxzZSwgZmFsc2UpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgfSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoU3RyaW5nKHZhbHVlID8/IFwiXCIpLnRyaW0oKSkge1xyXG4gICAgICBzZXRRdWVyeShudWxsKTtcclxuICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgfVxyXG4gIH0sIFt2YWx1ZV0pO1xyXG5cclxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKCFxdWVyeSB8fCAhcXVlcnkudHJpbSgpKSByZXR1cm4gZGF0YTtcclxuICAgIGNvbnN0IG5vcm1hbGl6ZWRRdWVyeSA9IG5vcm1hbGl6ZUxvb2t1cFRleHQocXVlcnkpO1xyXG4gICAgcmV0dXJuIGRhdGEuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBub3JtYWxpemVMb29rdXBUZXh0KG9wdGlvbi52YWx1ZSk7XHJcbiAgICAgIGNvbnN0IG9wdGlvblRleHQgPSBub3JtYWxpemVMb29rdXBUZXh0KG9wdGlvbi50ZXh0KTtcclxuICAgICAgcmV0dXJuIG9wdGlvblRleHQuaW5jbHVkZXMobm9ybWFsaXplZFF1ZXJ5KSB8fCBvcHRpb25WYWx1ZS5pbmNsdWRlcyhub3JtYWxpemVkUXVlcnkpO1xyXG4gICAgfSk7XHJcbiAgfSwgW2RhdGEsIHF1ZXJ5XSk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IGZpbHRlcmVkLmZpbmRJbmRleCgob3B0aW9uKSA9PiBTdHJpbmcob3B0aW9uLnZhbHVlKSA9PT0gc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgY29uc3QgcHJlZmVycmVkQWN0aXZlSW5kZXggPSBzZWxlY3RlZEluZGV4ID49IDAgPyBzZWxlY3RlZEluZGV4IDogMDtcclxuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cclxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcclxuXHJcbiAgY29uc3Qgb3Blbkxpc3RBdEN1cnJlbnRTZWxlY3Rpb24gPSAoKSA9PiB7XHJcbiAgICBpZiAocmVhZE9ubHlNb2RlKSByZXR1cm47XHJcbiAgICBzZXRBY3RpdmVJbmRleChwcmVmZXJyZWRBY3RpdmVJbmRleCk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKHRydWUpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHNlbGVjdE9wdGlvbiA9IChvcHQ6IE5vcm1hbGl6ZWRPcHRpb24pID0+IHtcclxuICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcclxuICAgIGNvbnN0IG5leHRWYWx1ZSA9IFN0cmluZyhvcHQ/LnZhbHVlID8/IFwiXCIpO1xyXG4gICAgc2V0UXVlcnkobnVsbCk7XHJcbiAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XHJcbiAgfTtcclxuXHJcbiAgY29uc3QgaGFuZGxlS2V5RG93biA9IChldjogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MSW5wdXRFbGVtZW50PikgPT4ge1xyXG4gICAgaWYgKHJlYWRPbmx5TW9kZSkgcmV0dXJuO1xyXG4gICAgaWYgKGV2LmtleSA9PT0gXCJBcnJvd0Rvd25cIikge1xyXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBpZiAoIW9wZW4pIHtcclxuICAgICAgICBvcGVuTGlzdEF0Q3VycmVudFNlbGVjdGlvbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4ICsgMSkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkFycm93VXBcIikge1xyXG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBpZiAoIW9wZW4pIHtcclxuICAgICAgICBvcGVuTGlzdEF0Q3VycmVudFNlbGVjdGlvbigpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoKSBzZXRBY3RpdmVJbmRleCgoaWR4KSA9PiAoaWR4IC0gMSArIGZpbHRlcmVkLmxlbmd0aCkgJSBmaWx0ZXJlZC5sZW5ndGgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkVudGVyXCIpIHtcclxuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgaWYgKGNsZWFyT25FbXB0eUlucHV0ICYmIHF1ZXJ5ICE9PSBudWxsICYmICFxdWVyeS50cmltKCkpIHtcclxuICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChvcGVuICYmIGZpbHRlcmVkLmxlbmd0aCkge1xyXG4gICAgICAgIHNlbGVjdE9wdGlvbihmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XHJcbiAgICAgIH0gZWxzZSBpZiAocXVlcnkgIT09IG51bGwgJiYgcXVlcnkudHJpbSgpKSB7XHJcbiAgICAgICAgY2xlYXJNYW51YWxWYWx1ZSh0cnVlLCB0cnVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvcGVuTGlzdEF0Q3VycmVudFNlbGVjdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoZXYua2V5ID09PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgIGlmIChxdWVyeSAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNsZWFyTWFudWFsVmFsdWUoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2FmZUlkID0gU3RyaW5nKGlkQmFzZSB8fCBsYWJlbCB8fCBcInNlbGVjdFwiKTtcclxuICBjb25zdCBsaXN0SWQgPSBgc2VsZWN0LW9wdGlvbnMtJHtzYWZlSWR9YDtcclxuICBjb25zdCBhY3RpdmVJZCA9XHJcbiAgICBvcGVuICYmIGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8gYHNlbGVjdC1vcHQtJHtzYWZlSWR9LSR7ZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0udmFsdWV9YCA6IHVuZGVmaW5lZDtcclxuICBjb25zdCBsaXN0T3BlbiA9IG9wZW4gJiYgIXJlYWRPbmx5TW9kZTtcclxuICBjb25zdCBzZWxlY3RlZERpc3BsYXlUZXh0ID0gc2VsZWN0ZWRUZXh0TW9kZSA9PT0gXCJ2YWx1ZVwiID8gc2VsZWN0ZWRWYWx1ZSA6IHNlbGVjdGVkPy50ZXh0IHx8IFwiXCI7XHJcbiAgY29uc3QgZGlzcGxheVZhbHVlID0gcXVlcnkgIT09IG51bGwgPyBxdWVyeSA6IChzZWxlY3RlZFZhbHVlID8gc2VsZWN0ZWREaXNwbGF5VGV4dCA6IFwiXCIpO1xyXG4gIGNvbnN0IHNob3dTZWxlY3RlZEljb24gPSBxdWVyeSA9PT0gbnVsbCAmJiAhIXNlbGVjdGVkVmFsdWUgJiYgISFzZWxlY3RlZD8uaWNvbjtcclxuICBjb25zdCBzaG93Tm90Rm91bmRSb3cgPSBzaG93Tm90Rm91bmRTdGF0ZSB8fCAoISFxdWVyeSAmJiAhIXF1ZXJ5LnRyaW0oKSAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDApO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4ID0gTnVtYmVyLmlzRmluaXRlKGRyb3Bkb3duRXhwYW5kUHgpID8gTWF0aC5tYXgoMCwgZHJvcGRvd25FeHBhbmRQeCkgOiAwO1xyXG4gIGNvbnN0IG5vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHggPSBOdW1iZXIuaXNGaW5pdGUoZHJvcGRvd25NaW5XaWR0aFB4KSA/IE1hdGgubWF4KDAsIGRyb3Bkb3duTWluV2lkdGhQeCkgOiAwO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKCFsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuKSByZXR1cm47XHJcbiAgICBpZiAoIWxpc3RPcGVuKSByZXR1cm47XHJcbiAgICBpZiAoaW5pdGlhbERyb3Bkb3duV2lkdGhSZWYuY3VycmVudCAhPT0gbnVsbCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IHdpZHRoID0gYm94UmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgaWYgKCFOdW1iZXIuaXNGaW5pdGUod2lkdGgpIHx8ICF3aWR0aCB8fCB3aWR0aCA8PSAwKSByZXR1cm47XHJcbiAgICBpbml0aWFsRHJvcGRvd25XaWR0aFJlZi5jdXJyZW50ID0gd2lkdGg7XHJcbiAgfSwgW2xpc3RPcGVuLCBsb2NrRHJvcGRvd25XaWR0aE9uRmlyc3RPcGVuXSk7XHJcblxyXG4gIGNvbnN0IG1lYXN1cmVkQW5jaG9yV2lkdGggPSBib3hSZWYuY3VycmVudD8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XHJcbiAgY29uc3Qgbm9ybWFsaXplZE1lYXN1cmVkQW5jaG9yV2lkdGggPVxyXG4gICAgTnVtYmVyLmlzRmluaXRlKG1lYXN1cmVkQW5jaG9yV2lkdGgpICYmIG1lYXN1cmVkQW5jaG9yV2lkdGggJiYgbWVhc3VyZWRBbmNob3JXaWR0aCA+IDAgPyBtZWFzdXJlZEFuY2hvcldpZHRoIDogbnVsbDtcclxuICBjb25zdCBmaXhlZERyb3Bkb3duQmFzZVdpZHRoID0gbG9ja0Ryb3Bkb3duV2lkdGhPbkZpcnN0T3BlblxyXG4gICAgPyBpbml0aWFsRHJvcGRvd25XaWR0aFJlZi5jdXJyZW50ID8/IG5vcm1hbGl6ZWRNZWFzdXJlZEFuY2hvcldpZHRoXHJcbiAgICA6IG5vcm1hbGl6ZWRNZWFzdXJlZEFuY2hvcldpZHRoO1xyXG4gIGNvbnN0IGZpeGVkRHJvcGRvd25FeHBhbmRlZFdpZHRoID1cclxuICAgIGZpeGVkRHJvcGRvd25CYXNlV2lkdGggIT09IG51bGwgJiYgTnVtYmVyLmlzRmluaXRlKGZpeGVkRHJvcGRvd25CYXNlV2lkdGgpXHJcbiAgICAgID8gZml4ZWREcm9wZG93bkJhc2VXaWR0aCArIG5vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4XHJcbiAgICAgIDogbnVsbDtcclxuICBjb25zdCByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA9XHJcbiAgICBmaXhlZERyb3Bkb3duRXhwYW5kZWRXaWR0aCAhPT0gbnVsbFxyXG4gICAgICA/IE1hdGgubWF4KGZpeGVkRHJvcGRvd25FeHBhbmRlZFdpZHRoLCBub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4IHx8IDApXHJcbiAgICAgIDogbnVsbDtcclxuICBjb25zdCBpbmxpbmVEcm9wZG93blN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzIHwgdW5kZWZpbmVkID1cclxuICAgIHJlc29sdmVkRHJvcGRvd25XaWR0aFB4ICE9PSBudWxsICYmIHJlc29sdmVkRHJvcGRvd25XaWR0aFB4ID4gMFxyXG4gICAgICA/IHtcclxuICAgICAgICAgIHdpZHRoOiBgJHtyZXNvbHZlZERyb3Bkb3duV2lkdGhQeH1weGAsXHJcbiAgICAgICAgICAuLi4obm9ybWFsaXplZERyb3Bkb3duTWluV2lkdGhQeCA+IDAgPyB7IG1pbldpZHRoOiBgJHtub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4fXB4YCB9IDoge30pLFxyXG4gICAgICAgIH1cclxuICAgICAgOiBub3JtYWxpemVkRHJvcGRvd25FeHBhbmRQeCA+IDBcclxuICAgICAgICA/IHtcclxuICAgICAgICAgICAgd2lkdGg6IGBjYWxjKDEwMCUgKyAke25vcm1hbGl6ZWREcm9wZG93bkV4cGFuZFB4fXB4KWAsXHJcbiAgICAgICAgICAgIC4uLihub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4ID4gMCA/IHsgbWluV2lkdGg6IGAke25vcm1hbGl6ZWREcm9wZG93bk1pbldpZHRoUHh9cHhgIH0gOiB7fSksXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgOiBub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4ID4gMFxyXG4gICAgICAgICAgPyB7IG1pbldpZHRoOiBgJHtub3JtYWxpemVkRHJvcGRvd25NaW5XaWR0aFB4fXB4YCB9XHJcbiAgICAgICAgOiB1bmRlZmluZWQ7XHJcblxyXG4gIGNvbnN0IGxpc3RCb2R5ID0gKFxyXG4gICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9IHJvbGU9XCJsaXN0Ym94XCIgYXJpYS1sYWJlbD17bGFiZWx9PlxyXG4gICAgICB7c2hvd05vdEZvdW5kUm93ID8gPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSB0ZXh0LXNsYXRlLTUwMFwiPntpbmRUKFwiQ29tbW9uX05vdEZvdW5kXCIsIFwiTm90IGZvdW5kXCIpfTwvZGl2PiA6IG51bGx9XHJcbiAgICAgIHtmaWx0ZXJlZC5tYXAoKG9wdCwgaWR4KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgc2VsID0gc2VsZWN0ZWQ/LnZhbHVlID09PSBvcHQudmFsdWU7XHJcbiAgICAgICAgY29uc3QgaXNBY3RpdmUgPSBpZHggPT09IHJlc29sdmVkQWN0aXZlSW5kZXg7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9uU3RhdGVDbGFzc05hbWUgPSBpc0FjdGl2ZSA/IG9wdGlvbkFjdGl2ZUNsYXNzTmFtZSA6IHNlbCA/IG9wdGlvblNlbGVjdGVkQ2xhc3NOYW1lIDogb3B0aW9uRGVmYXVsdENsYXNzTmFtZTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAga2V5PXtTdHJpbmcob3B0LnZhbHVlKX1cclxuICAgICAgICAgICAgaWQ9e2BzZWxlY3Qtb3B0LSR7c2FmZUlkfS0ke29wdC52YWx1ZX1gfVxyXG4gICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcclxuICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17c2VsfVxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1jZW50ZXIgcHktMiBwci0zIHRleHQtbGVmdCB0ZXh0LXNtXCIsXHJcbiAgICAgICAgICAgICAgb3B0aW9uTGVmdFBhZGRpbmdDbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgZGlzYWJsZURlZmF1bHRPcHRpb25QYWRkaW5nID8gXCJcIiA6IFwidHlwZS1vcHRpb25cIixcclxuICAgICAgICAgICAgICBvcHRpb25TdGF0ZUNsYXNzTmFtZVxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17XHJcbiAgICAgICAgICAgICAgYWxsb3dPcHRpb25Ib3Jpem9udGFsU2Nyb2xsXHJcbiAgICAgICAgICAgICAgICA/IHsgb3ZlcmZsb3dYOiBcImF1dG9cIiwgb3ZlcmZsb3dZOiBcImhpZGRlblwiLCBXZWJraXRPdmVyZmxvd1Njcm9sbGluZzogXCJ0b3VjaFwiIH1cclxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpZHgpfVxyXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZWxlY3RPcHRpb24ob3B0KX1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge3NlbCAmJiAoXHJcbiAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgXCJhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0wIGZsZXggaXRlbXMtY2VudGVyIHBsLTJcIixcclxuICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1wcmltYXJ5XCJcclxuICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgPjwvc3Bhbj5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgICBhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyBcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiIDogXCJmbGV4IG1pbi13LTAgaXRlbXMtY2VudGVyIGdhcC0yXCIsXHJcbiAgICAgICAgICAgICAgICBzZWwgPyBcImZvbnQtbWVkaXVtXCIgOiBcImZvbnQtbm9ybWFsXCJcclxuICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgIHN0eWxlPXthbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyB7IG1pbldpZHRoOiBcIm1heC1jb250ZW50XCIgfSA6IHVuZGVmaW5lZH1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtvcHQuaWNvbiA/IChcclxuICAgICAgICAgICAgICAgIDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgICAgICBcImlubGluZS1mbGV4IHNocmluay0wIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbkljb25DbGFzc05hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPyBcInRleHQtd2hpdGVcIiA6IFwidGV4dC1zbGF0ZS01MDBcIlxyXG4gICAgICAgICAgICAgICAgICApfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7b3B0Lmljb259XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgICAgPHNwYW5cclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhhbGxvd09wdGlvbkhvcml6b250YWxTY3JvbGwgPyBcImJsb2NrXCIgOiBcImJsb2NrIHRydW5jYXRlXCIsIG9wdGlvblRleHRDbGFzc05hbWUpfVxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e2FsbG93T3B0aW9uSG9yaXpvbnRhbFNjcm9sbCA/IHsgd2hpdGVTcGFjZTogXCJub3dyYXBcIiB9IDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtvcHQudGV4dH1cclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pfVxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXZcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKGNvbnRhaW5lckNsYXNzTmFtZSwgZGlzYWJsZWQgPyBcInBvaW50ZXItZXZlbnRzLW5vbmUgc2VsZWN0LW5vbmVcIiA6IFwiXCIpfVxyXG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cclxuICAgID5cclxuICAgICAge3Nob3dMYWJlbCA/IDxsYWJlbCBjbGFzc05hbWU9e2NsYXNzTmFtZXMobGFiZWxDbGFzc05hbWUsIGludmFsaWQgPyBcInRleHQtcm9zZS03MDBcIiA6IFwiXCIpfT57bGFiZWx9PC9sYWJlbD4gOiBudWxsfVxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgcmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIGN1cnNvci1kZWZhdWx0IHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXdoaXRlIHRleHQtbGVmdCBmb2N1cy13aXRoaW46Ym9yZGVyLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctMiBmb2N1cy13aXRoaW46cmluZy1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLW9mZnNldC13aGl0ZSBzbTp0ZXh0LXNtXCIsXHJcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAgc3R5bGU9e3JlYWRPbmx5TW9kZSA/IHsgY29sb3I6IHZhbHVlQ29sb3IgfSA6IHVuZGVmaW5lZH1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgcmVmPXthc3NpZ25JbnB1dFJlZn1cclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgIFwidy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJvcmRlciBweS0yIHRleHQtc20gc206dGV4dC1iYXNlIGxlYWRpbmctNSBmb2N1czpvdXRsaW5lLWhpZGRlbiBmb2N1czpyaW5nLTIgZGlzYWJsZWQ6Ymctc2xhdGUtMTAwIGRpc2FibGVkOnRleHQtc2xhdGUtNTAwIGRpc2FibGVkOmJvcmRlci1zbGF0ZS0yMDAgZGlzYWJsZWQ6Y3Vyc29yLW5vdC1hbGxvd2VkXCIsXHJcbiAgICAgICAgICAgICAgc2hvd1NlbGVjdGVkSWNvbiA/IHNlbGVjdGVkSW5wdXRQYWRkaW5nQ2xhc3NOYW1lIDogXCJwbC0zXCIsXHJcbiAgICAgICAgICAgICAgc2hvd1NlYXJjaEJ1dHRvbiA/IFwicHItMjBcIiA6IFwicHItMTBcIixcclxuICAgICAgICAgICAgICBpbnZhbGlkXHJcbiAgICAgICAgICAgICAgICA/IFwiYm9yZGVyLXJvc2UtNDAwIGJnLXJvc2UtNTAgZm9jdXM6cmluZy1yb3NlLTIwMCBmb2N1czpib3JkZXItcm9zZS00MDBcIlxyXG4gICAgICAgICAgICAgICAgOiBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17cmVhZE9ubHlNb2RlID8geyBjb2xvcjogdmFsdWVDb2xvciB9IDogdW5kZWZpbmVkfVxyXG4gICAgICAgICAgICB2YWx1ZT17ZGlzcGxheVZhbHVlfVxyXG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBpZiAocmVhZE9ubHlNb2RlIHx8ICFhbGxvd1RleHRJbnB1dCkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgIGNvbnN0IHZhbCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgc2V0UXVlcnkodmFsKTtcclxuICAgICAgICAgICAgICBpZiAoY2xlYXJPbkVtcHR5SW5wdXQgJiYgIXZhbC50cmltKCkpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyTWFudWFsVmFsdWUoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgb25LZXlEb3duPXtoYW5kbGVLZXlEb3dufVxyXG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFyZWFkT25seU1vZGUpIG9wZW5MaXN0QXRDdXJyZW50U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5TW9kZSB8fCAhYWxsb3dUZXh0SW5wdXR9XHJcbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2xhYmVsfVxyXG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxyXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtsaXN0T3Blbn1cclxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxyXG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIHtzaG93U2VsZWN0ZWRJY29uID8gKFxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwb2ludGVyLWV2ZW50cy1ub25lIGFic29sdXRlIGluc2V0LXktMCBsZWZ0LTAgZmxleCBpdGVtcy1jZW50ZXIgcGwtMyB0ZXh0LXNsYXRlLTUwMFwiPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcImlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiLCBzZWxlY3RlZEljb25DbGFzc05hbWUpfT57c2VsZWN0ZWQuaWNvbn08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwci0yXCI+XHJcbiAgICAgICAgICAgIHtzaG93U2VhcmNoQnV0dG9uID8gKFxyXG4gICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBpZiAocmVhZE9ubHlNb2RlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIGlmIChxdWVyeSAhPT0gbnVsbCAmJiBxdWVyeS50cmltKCkgJiYgZmlsdGVyZWQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJNYW51YWxWYWx1ZSh0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgb3Blbkxpc3RBdEN1cnJlbnRTZWxlY3Rpb24oKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX1NlYXJjaFwiLCBcIlNlYXJjaFwiKX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkT25seU1vZGV9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNS43NSAxNS43NS0yLjQ4OS0yLjQ4OW0wIDBhMy4zNzUgMy4zNzUgMCAxIDAtNC43NzMtNC43NzMgMy4zNzUgMy4zNzUgMCAwIDAgNC43NzQgNC43NzRaTTIxIDEyYTkgOSAwIDEgMS0xOCAwIDkgOSAwIDAgMSAxOCAwWlwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXHJcbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlYWRPbmx5TW9kZSkgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wZW4gJiYgcXVlcnkgIT09IG51bGwgJiYgcXVlcnkudHJpbSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNsZWFyTWFudWFsVmFsdWUoZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcclxuICAgICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG9wZW5MaXN0QXRDdXJyZW50U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtvcGVuID8gaW5kVChcIkRyb3Bkb3duX0hpZGVPcHRpb25zXCIsIFwiSGlkZSBvcHRpb25zXCIpIDogaW5kVChcIkRyb3Bkb3duX1Nob3dPcHRpb25zXCIsIFwiU2hvdyBvcHRpb25zXCIpfVxyXG4gICAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkT25seU1vZGV9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7b3BlbiA/IDxDaGV2cm9uVXBTdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+IDogPENoZXZyb25Eb3duU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPn1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICB7dXNlUG9ydGFsID8gKFxyXG4gICAgICAgICAgPEZsb2F0aW5nTGlzdFxyXG4gICAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cclxuICAgICAgICAgICAgb3Blbj17bGlzdE9wZW59XHJcbiAgICAgICAgICAgIHpJbmRleD17MzYwMDAwfVxyXG4gICAgICAgICAgICBmaXhlZFdpZHRoUHg9e2Ryb3Bkb3duVXNlQXZhaWxhYmxlV2lkdGggPyB1bmRlZmluZWQgOiByZXNvbHZlZERyb3Bkb3duV2lkdGhQeCA/PyB1bmRlZmluZWR9XHJcbiAgICAgICAgICAgIHBhbmVsU3R5bGU9e3BhbmVsU3R5bGV9XHJcbiAgICAgICAgICAgIG1heEhlaWdodENsYXNzPXtkcm9wZG93bk1heEhlaWdodENsYXNzfVxyXG4gICAgICAgICAgICByb2xlPVwibGlzdGJveFwiXHJcbiAgICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldXCJcclxuICAgICAgICAgICAgcG9ydGFsQ2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XHJcbiAgICAgICAgICAgIHBhbmVsQ2xhc3NOYW1lPXtwYW5lbENsYXNzTmFtZX1cclxuICAgICAgICAgICAgbWF0Y2hBdmFpbGFibGVXaWR0aD17ZHJvcGRvd25Vc2VBdmFpbGFibGVXaWR0aH1cclxuICAgICAgICAgID5cclxuICAgICAgICAgICAge2xpc3RCb2R5fVxyXG4gICAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XHJcbiAgICAgICAgKSA6IChcclxuICAgICAgICAgIGxpc3RPcGVuICYmIChcclxuICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgICAgIFwiYWJzb2x1dGUgei0zNjAwMDAgdy1mdWxsIHJvdW5kZWQtW3ZhcigtLXJhZGl1cy14bCldIGJnLXdoaXRlIHNoYWRvdy1sZyByaW5nLTEgcmluZy1ibGFjay81IGZvY3VzOm91dGxpbmUtaGlkZGVuIG92ZXJmbG93LWF1dG9cIixcclxuICAgICAgICAgICAgICAgIGlubGluZURyb3Bkb3duUGxhY2VtZW50Q2xhc3MsXHJcbiAgICAgICAgICAgICAgICBkcm9wZG93bk1heEhlaWdodENsYXNzLFxyXG4gICAgICAgICAgICAgICAgcGFuZWxDbGFzc05hbWUgfHwgXCJcIlxyXG4gICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgLi4uaW5saW5lRHJvcGRvd25TdHlsZSwgLi4uKHBhbmVsU3R5bGUgfHwge30pIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICB7bGlzdEJvZHl9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlbGVjdENvbWJvYm94O1xyXG4iLCAiaW1wb3J0IFJlYWN0LCB7IHVzZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XHJcbmltcG9ydCB7IHVzZUZsb2F0aW5nUG9zaXRpb24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlRmxvYXRpbmdQb3NpdGlvbi50c1wiO1xyXG5cclxudHlwZSBQcm9wcyA9IHtcclxuICBhbmNob3JSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD47XHJcbiAgb3BlbjogYm9vbGVhbjtcclxuICB6SW5kZXg/OiBudW1iZXI7XG4gIGZpeGVkV2lkdGhQeD86IG51bWJlcjtcbiAgbWluV2lkdGhQeD86IG51bWJlcjtcbiAgbWF4SGVpZ2h0Q2xhc3M/OiBzdHJpbmc7XG4gIHJvdW5kZWRDbGFzcz86IHN0cmluZztcclxuICByb2xlPzogc3RyaW5nO1xyXG4gIHBvcnRhbENsYXNzTmFtZT86IHN0cmluZztcclxuICBwYW5lbENsYXNzTmFtZT86IHN0cmluZztcclxuICBwYW5lbFN0eWxlPzogUmVhY3QuQ1NTUHJvcGVydGllcztcclxuICBhdXRvRml0Vmlld3BvcnQ/OiBib29sZWFuO1xyXG4gIG1hdGNoQXZhaWxhYmxlV2lkdGg/OiBib29sZWFuO1xyXG4gIG9mZnNldD86IG51bWJlcjtcclxuICB2aWV3cG9ydFBhZGRpbmc/OiBudW1iZXI7XHJcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbn07XG5cclxuY29uc3QgRmxvYXRpbmdMaXN0ID0gKHtcclxuICBhbmNob3JSZWYsXHJcbiAgb3BlbixcclxuICB6SW5kZXggPSAzMDAwMDAsXG4gIGZpeGVkV2lkdGhQeCxcbiAgbWluV2lkdGhQeCxcbiAgbWF4SGVpZ2h0Q2xhc3MgPSBcIm1heC1oLTcyXCIsXG4gIHJvdW5kZWRDbGFzcyA9IFwicm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV1cIixcclxuICByb2xlLFxyXG4gIHBvcnRhbENsYXNzTmFtZSxcclxuICBwYW5lbENsYXNzTmFtZSxcclxuICBwYW5lbFN0eWxlLFxuICBhdXRvRml0Vmlld3BvcnQgPSB0cnVlLFxuICBtYXRjaEF2YWlsYWJsZVdpZHRoID0gdHJ1ZSxcbiAgb2Zmc2V0LFxuICB2aWV3cG9ydFBhZGRpbmcsXG4gIGNoaWxkcmVuLFxufTogUHJvcHMpID0+IHtcclxuICBjb25zdCBwYW5lbFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG4gIGNvbnN0IHN0eWxlID0gdXNlRmxvYXRpbmdQb3NpdGlvbihhbmNob3JSZWYsIG9wZW4sIHtcclxuICAgIG92ZXJsYXlSZWY6IHBhbmVsUmVmLFxyXG4gICAgYXV0b0ZpdFZpZXdwb3J0LFxyXG4gICAgbWF0Y2hBdmFpbGFibGVXaWR0aCxcbiAgICBtaW5XaWR0aDogbWluV2lkdGhQeCxcbiAgICBvZmZzZXQsXG4gICAgdmlld3BvcnRQYWRkaW5nLFxuICB9KTtcbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcclxuICByZXR1cm4gY3JlYXRlUG9ydGFsKFxyXG4gICAgPGRpdlxyXG4gICAgICBkYXRhLWZsb2F0aW5nLXBsYWNlbWVudD17c3R5bGUucGxhY2VtZW50fVxyXG4gICAgICBzdHlsZT17e1xyXG4gICAgICAgIHBvc2l0aW9uOiBcImZpeGVkXCIsXHJcbiAgICAgICAgdG9wOiBzdHlsZS50b3AsXHJcbiAgICAgICAgbGVmdDogc3R5bGUubGVmdCxcclxuICAgICAgICB3aWR0aDogIW1hdGNoQXZhaWxhYmxlV2lkdGggJiYgdHlwZW9mIGZpeGVkV2lkdGhQeCA9PT0gXCJudW1iZXJcIiAmJiBOdW1iZXIuaXNGaW5pdGUoZml4ZWRXaWR0aFB4KSA/IGZpeGVkV2lkdGhQeCA6IHN0eWxlLndpZHRoLFxyXG4gICAgICAgIHpJbmRleCxcclxuICAgICAgfX1cclxuICAgICAgY2xhc3NOYW1lPXtwb3J0YWxDbGFzc05hbWV9XHJcbiAgICA+XHJcbiAgICAgIDxkaXZcclxuICAgICAgICByZWY9e3BhbmVsUmVmfVxyXG4gICAgICAgIHJvbGU9e3JvbGV9XHJcbiAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIG92ZXJmbG93LWF1dG8gJHtyb3VuZGVkQ2xhc3N9IGJnLXdoaXRlIHB5LTEgdGV4dC1zbSBzaGFkb3ctbGcgcmluZy0xIHJpbmctYmxhY2svNSBmb2N1czpvdXRsaW5lLWhpZGRlbiAke21heEhlaWdodENsYXNzfSAke3BhbmVsQ2xhc3NOYW1lIHx8IFwiXCJ9YH1cclxuICAgICAgICBzdHlsZT17e1xyXG4gICAgICAgICAgbWF4SGVpZ2h0OiBzdHlsZS5tYXhIZWlnaHQsXHJcbiAgICAgICAgICBvdmVyc2Nyb2xsQmVoYXZpb3I6IFwiY29udGFpblwiLFxyXG4gICAgICAgICAgLi4ucGFuZWxTdHlsZSxcclxuICAgICAgICB9fVxyXG4gICAgICA+XHJcbiAgICAgICAge2NoaWxkcmVufVxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PixcclxuICAgIGRvY3VtZW50LmJvZHlcclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRmxvYXRpbmdMaXN0O1xyXG4iLCAiaW1wb3J0IHsgdXNlTGF5b3V0RWZmZWN0LCB1c2VTdGF0ZSwgdHlwZSBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbnR5cGUgRmxvYXRpbmdQbGFjZW1lbnQgPSBcImJvdHRvbVwiIHwgXCJ0b3BcIjtcclxuXHJcbnR5cGUgRmxvYXRpbmdQb3NpdGlvbk9wdGlvbnMgPSB7XG4gIG92ZXJsYXlSZWY/OiBSZWZPYmplY3Q8SFRNTEVsZW1lbnQgfCBudWxsPjtcbiAgb2Zmc2V0PzogbnVtYmVyO1xuICB2aWV3cG9ydFBhZGRpbmc/OiBudW1iZXI7XG4gIGF1dG9GaXRWaWV3cG9ydD86IGJvb2xlYW47XG4gIG1hdGNoQXZhaWxhYmxlV2lkdGg/OiBib29sZWFuO1xuICBtaW5XaWR0aD86IG51bWJlcjtcbn07XG5cclxudHlwZSBGbG9hdGluZ1Bvc2l0aW9uU3R5bGUgPSB7XHJcbiAgdG9wOiBudW1iZXI7XHJcbiAgbGVmdDogbnVtYmVyO1xyXG4gIHdpZHRoOiBudW1iZXI7XHJcbiAgbWF4SGVpZ2h0PzogbnVtYmVyO1xyXG4gIHBsYWNlbWVudDogRmxvYXRpbmdQbGFjZW1lbnQ7XHJcbn07XHJcblxyXG5jb25zdCBERUZBVUxUX09GRlNFVF9QWCA9IDY7XHJcbmNvbnN0IERFRkFVTFRfVklFV1BPUlRfUEFERElOR19QWCA9IDEyO1xyXG5cclxuY29uc3QgY2xhbXAgPSAodmFsdWU6IG51bWJlciwgbWluOiBudW1iZXIsIG1heDogbnVtYmVyKTogbnVtYmVyID0+IHtcbiAgaWYgKG1heCA8IG1pbikgcmV0dXJuIG1pbjtcbiAgcmV0dXJuIE1hdGgubWluKE1hdGgubWF4KHZhbHVlLCBtaW4pLCBtYXgpO1xufTtcblxuLy8gTm9ybWFsaXplcyBvcHRpb25hbCB3aWR0aCBjb25zdHJhaW50cyBiZWZvcmUgdmlld3BvcnQgY2xhbXBpbmcuXG5jb25zdCByZXNvbHZlUG9zaXRpdmVOdW1iZXIgPSAodmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGwpOiBudW1iZXIgPT4ge1xuICBjb25zdCBudW1lcmljVmFsdWUgPSB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgPyB2YWx1ZSA6IDA7XG4gIHJldHVybiBOdW1iZXIuaXNGaW5pdGUobnVtZXJpY1ZhbHVlKSAmJiBudW1lcmljVmFsdWUgPiAwID8gbnVtZXJpY1ZhbHVlIDogMDtcbn07XG5cclxuY29uc3QgYXJlRmxvYXRpbmdTdHlsZXNFcXVhbCA9IChsZWZ0OiBGbG9hdGluZ1Bvc2l0aW9uU3R5bGUsIHJpZ2h0OiBGbG9hdGluZ1Bvc2l0aW9uU3R5bGUpOiBib29sZWFuID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgbGVmdC50b3AgPT09IHJpZ2h0LnRvcCAmJlxyXG4gICAgbGVmdC5sZWZ0ID09PSByaWdodC5sZWZ0ICYmXHJcbiAgICBsZWZ0LndpZHRoID09PSByaWdodC53aWR0aCAmJlxyXG4gICAgbGVmdC5tYXhIZWlnaHQgPT09IHJpZ2h0Lm1heEhlaWdodCAmJlxyXG4gICAgbGVmdC5wbGFjZW1lbnQgPT09IHJpZ2h0LnBsYWNlbWVudFxyXG4gICk7XHJcbn07XHJcblxyXG4vLyBSZXNvbHZlcyBhIGZpeGVkIGZsb2F0aW5nIHBvc2l0aW9uIGFuZCBvcHRpb25hbGx5IGtlZXBzIHRoZSBvdmVybGF5IGluc2lkZSB0aGUgdmlld3BvcnQuXHJcbmV4cG9ydCBjb25zdCB1c2VGbG9hdGluZ1Bvc2l0aW9uID0gKFxyXG4gIHRhcmdldFJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PixcclxuICBvcGVuOiBib29sZWFuLFxyXG4gIHtcclxuICAgIG92ZXJsYXlSZWYsXG4gICAgb2Zmc2V0ID0gREVGQVVMVF9PRkZTRVRfUFgsXG4gICAgdmlld3BvcnRQYWRkaW5nID0gREVGQVVMVF9WSUVXUE9SVF9QQURESU5HX1BYLFxuICAgIGF1dG9GaXRWaWV3cG9ydCA9IGZhbHNlLFxuICAgIG1hdGNoQXZhaWxhYmxlV2lkdGggPSBmYWxzZSxcbiAgICBtaW5XaWR0aCA9IDAsXG4gIH06IEZsb2F0aW5nUG9zaXRpb25PcHRpb25zID0ge31cbikgPT4ge1xuICBjb25zdCBbc3R5bGUsIHNldFN0eWxlXSA9IHVzZVN0YXRlPEZsb2F0aW5nUG9zaXRpb25TdHlsZT4oe1xyXG4gICAgdG9wOiAwLFxyXG4gICAgbGVmdDogMCxcclxuICAgIHdpZHRoOiAwLFxyXG4gICAgbWF4SGVpZ2h0OiB1bmRlZmluZWQsXHJcbiAgICBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsXHJcbiAgfSk7XHJcblxyXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XHJcbiAgICBpZiAoIW9wZW4gfHwgIXRhcmdldFJlZi5jdXJyZW50KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgdXBkYXRlID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCByZWN0ID0gdGFyZ2V0UmVmLmN1cnJlbnQ/LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICBpZiAoIXJlY3QpIHJldHVybjtcclxuXHJcbiAgICAgIGNvbnN0IHZpZXdwb3J0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgMDtcclxuICAgICAgY29uc3Qgdmlld3BvcnRIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCB8fCAwO1xyXG4gICAgICBjb25zdCBvdmVybGF5RWxlbWVudCA9IG92ZXJsYXlSZWY/LmN1cnJlbnQ7XG4gICAgICBjb25zdCBvdmVybGF5UmVjdCA9IG92ZXJsYXlFbGVtZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IG92ZXJsYXlIZWlnaHQgPSBNYXRoLm1heChvdmVybGF5UmVjdD8uaGVpZ2h0IHx8IDAsIG92ZXJsYXlFbGVtZW50Py5zY3JvbGxIZWlnaHQgfHwgMCk7XG4gICAgICBjb25zdCBvdmVybGF5V2lkdGggPSBNYXRoLm1heChvdmVybGF5UmVjdD8ud2lkdGggfHwgMCwgb3ZlcmxheUVsZW1lbnQ/LnNjcm9sbFdpZHRoIHx8IDApO1xuICAgICAgY29uc3QgYXZhaWxhYmxlV2lkdGggPSBNYXRoLm1heCgwLCB2aWV3cG9ydFdpZHRoIC0gdmlld3BvcnRQYWRkaW5nICogMik7XG4gICAgICBjb25zdCBwcmVmZXJyZWRXaWR0aCA9IE1hdGgubWF4KHJlY3Qud2lkdGgsIG92ZXJsYXlXaWR0aCwgcmVzb2x2ZVBvc2l0aXZlTnVtYmVyKG1pbldpZHRoKSk7XG4gICAgICBjb25zdCBuZXh0V2lkdGggPSBtYXRjaEF2YWlsYWJsZVdpZHRoID8gYXZhaWxhYmxlV2lkdGggOiBNYXRoLm1pbihwcmVmZXJyZWRXaWR0aCwgYXZhaWxhYmxlV2lkdGgpO1xuICAgICAgY29uc3QgbmV4dExlZnQgPSBtYXRjaEF2YWlsYWJsZVdpZHRoID8gdmlld3BvcnRQYWRkaW5nIDogY2xhbXAocmVjdC5sZWZ0LCB2aWV3cG9ydFBhZGRpbmcsIHZpZXdwb3J0V2lkdGggLSBuZXh0V2lkdGggLSB2aWV3cG9ydFBhZGRpbmcpO1xuXHJcbiAgICAgIGlmICghYXV0b0ZpdFZpZXdwb3J0KSB7XHJcbiAgICAgICAgY29uc3QgbmV4dFN0eWxlOiBGbG9hdGluZ1Bvc2l0aW9uU3R5bGUgPSB7XHJcbiAgICAgICAgICB0b3A6IHJlY3QuYm90dG9tICsgb2Zmc2V0LFxyXG4gICAgICAgICAgbGVmdDogbmV4dExlZnQsXHJcbiAgICAgICAgICB3aWR0aDogbmV4dFdpZHRoLFxyXG4gICAgICAgICAgbWF4SGVpZ2h0OiB1bmRlZmluZWQsXHJcbiAgICAgICAgICBwbGFjZW1lbnQ6IFwiYm90dG9tXCIsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXRTdHlsZSgocHJldmlvdXMpID0+IChhcmVGbG9hdGluZ1N0eWxlc0VxdWFsKHByZXZpb3VzLCBuZXh0U3R5bGUpID8gcHJldmlvdXMgOiBuZXh0U3R5bGUpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZUJlbG93ID0gTWF0aC5tYXgoMCwgdmlld3BvcnRIZWlnaHQgLSByZWN0LmJvdHRvbSAtIG9mZnNldCAtIHZpZXdwb3J0UGFkZGluZyk7XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZUFib3ZlID0gTWF0aC5tYXgoMCwgcmVjdC50b3AgLSBvZmZzZXQgLSB2aWV3cG9ydFBhZGRpbmcpO1xyXG4gICAgICBjb25zdCBmYWxsYmFja0hlaWdodCA9IE1hdGgubWF4KGF2YWlsYWJsZUJlbG93LCBhdmFpbGFibGVBYm92ZSwgMCk7XHJcbiAgICAgIGNvbnN0IHByZWZlcnJlZEhlaWdodCA9IG92ZXJsYXlIZWlnaHQgPiAwID8gb3ZlcmxheUhlaWdodCA6IGZhbGxiYWNrSGVpZ2h0O1xyXG4gICAgICBjb25zdCBwcmVmZXJyZWRQbGFjZW1lbnQ6IEZsb2F0aW5nUGxhY2VtZW50ID1cclxuICAgICAgICBwcmVmZXJyZWRIZWlnaHQgPiBhdmFpbGFibGVCZWxvdyAmJiBhdmFpbGFibGVBYm92ZSA+IGF2YWlsYWJsZUJlbG93ID8gXCJ0b3BcIiA6IFwiYm90dG9tXCI7XHJcbiAgICAgIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IHByZWZlcnJlZFBsYWNlbWVudCA9PT0gXCJ0b3BcIiA/IGF2YWlsYWJsZUFib3ZlIDogYXZhaWxhYmxlQmVsb3c7XHJcbiAgICAgIGNvbnN0IGNvbnN0cmFpbmVkSGVpZ2h0ID0gTWF0aC5tYXgoXHJcbiAgICAgICAgMCxcclxuICAgICAgICBhdmFpbGFibGVIZWlnaHQgPiAwXHJcbiAgICAgICAgICA/IE1hdGgubWluKHByZWZlcnJlZEhlaWdodCB8fCBhdmFpbGFibGVIZWlnaHQsIGF2YWlsYWJsZUhlaWdodClcclxuICAgICAgICAgIDogdmlld3BvcnRIZWlnaHQgLSB2aWV3cG9ydFBhZGRpbmcgKiAyXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnN0IG5leHRUb3AgPVxyXG4gICAgICAgIHByZWZlcnJlZFBsYWNlbWVudCA9PT0gXCJ0b3BcIlxyXG4gICAgICAgICAgPyBNYXRoLm1heCh2aWV3cG9ydFBhZGRpbmcsIHJlY3QudG9wIC0gb2Zmc2V0IC0gY29uc3RyYWluZWRIZWlnaHQpXHJcbiAgICAgICAgICA6IE1hdGgubWluKFxyXG4gICAgICAgICAgICAgIHJlY3QuYm90dG9tICsgb2Zmc2V0LFxyXG4gICAgICAgICAgICAgIE1hdGgubWF4KHZpZXdwb3J0UGFkZGluZywgdmlld3BvcnRIZWlnaHQgLSBjb25zdHJhaW5lZEhlaWdodCAtIHZpZXdwb3J0UGFkZGluZylcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IG5leHRTdHlsZTogRmxvYXRpbmdQb3NpdGlvblN0eWxlID0ge1xyXG4gICAgICAgIHRvcDogbmV4dFRvcCxcclxuICAgICAgICBsZWZ0OiBuZXh0TGVmdCxcclxuICAgICAgICB3aWR0aDogbmV4dFdpZHRoLFxyXG4gICAgICAgIG1heEhlaWdodDogY29uc3RyYWluZWRIZWlnaHQsXHJcbiAgICAgICAgcGxhY2VtZW50OiBwcmVmZXJyZWRQbGFjZW1lbnQsXHJcbiAgICAgIH07XHJcbiAgICAgIHNldFN0eWxlKChwcmV2aW91cykgPT4gKGFyZUZsb2F0aW5nU3R5bGVzRXF1YWwocHJldmlvdXMsIG5leHRTdHlsZSkgPyBwcmV2aW91cyA6IG5leHRTdHlsZSkpO1xyXG4gICAgfTtcclxuXHJcbiAgICB1cGRhdGUoKTtcclxuICAgIGxldCBhbmltYXRpb25GcmFtZSA9IDA7XHJcbiAgICBjb25zdCBzY2hlZHVsZVVwZGF0ZSA9ICgpID0+IHtcclxuICAgICAgaWYgKGFuaW1hdGlvbkZyYW1lKSB7XHJcbiAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lKTtcclxuICAgICAgfVxyXG4gICAgICBhbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgIGFuaW1hdGlvbkZyYW1lID0gMDtcclxuICAgICAgICB1cGRhdGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IHJlc2l6ZU9ic2VydmVyID1cclxuICAgICAgdHlwZW9mIFJlc2l6ZU9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiXHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xyXG4gICAgICAgICAgICBzY2hlZHVsZVVwZGF0ZSgpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICBpZiAocmVzaXplT2JzZXJ2ZXIpIHtcclxuICAgICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXRSZWYuY3VycmVudCk7XHJcbiAgICAgIGlmIChvdmVybGF5UmVmPy5jdXJyZW50KSB7XHJcbiAgICAgICAgcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZShvdmVybGF5UmVmLmN1cnJlbnQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbXV0YXRpb25PYnNlcnZlciA9XHJcbiAgICAgIHR5cGVvZiBNdXRhdGlvbk9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiIHx8ICFvdmVybGF5UmVmPy5jdXJyZW50XHJcbiAgICAgICAgPyBudWxsXHJcbiAgICAgICAgOiBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHNjaGVkdWxlVXBkYXRlKCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgIG11dGF0aW9uT2JzZXJ2ZXI/Lm9ic2VydmUob3ZlcmxheVJlZi5jdXJyZW50LCB7XHJcbiAgICAgIGNoaWxkTGlzdDogdHJ1ZSxcclxuICAgICAgc3VidHJlZTogdHJ1ZSxcclxuICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4gb3BlbiAmJiBzY2hlZHVsZVVwZGF0ZSgpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgY2FwdHVyZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNjaGVkdWxlVXBkYXRlKTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIGlmIChhbmltYXRpb25GcmFtZSkge1xyXG4gICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZSk7XHJcbiAgICAgIH1cclxuICAgICAgcmVzaXplT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcclxuICAgICAgbXV0YXRpb25PYnNlcnZlcj8uZGlzY29ubmVjdCgpO1xyXG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgdHJ1ZSk7XHJcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHNjaGVkdWxlVXBkYXRlKTtcclxuICAgIH07XHJcbiAgfSwgW2F1dG9GaXRWaWV3cG9ydCwgbWF0Y2hBdmFpbGFibGVXaWR0aCwgbWluV2lkdGgsIG9mZnNldCwgb3Blbiwgb3ZlcmxheVJlZiwgdGFyZ2V0UmVmLCB2aWV3cG9ydFBhZGRpbmddKTtcblxyXG4gIHJldHVybiBzdHlsZTtcclxufTtcclxuIiwgImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uRG93blN2ZyA9ICh7IGNsYXNzTmFtZSA9IFwiaC01IHctNVwiIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPHN2Z1xyXG4gICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcclxuICAgICAgZmlsbD1cIm5vbmVcIlxyXG4gICAgICB2aWV3Qm94PVwiMCAwIDI0IDI0XCJcclxuICAgICAgc3Ryb2tlV2lkdGg9ezEuNX1cclxuICAgICAgc3Ryb2tlPVwiY3VycmVudENvbG9yXCJcclxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XHJcbiAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXHJcbiAgICA+XHJcbiAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE5LjUgOC4yNS03LjUgNy41LTcuNS03LjVcIiAvPlxyXG4gICAgPC9zdmc+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBDaGV2cm9uVXBTdmcgPSAoeyBjbGFzc05hbWUgPSBcImgtNSB3LTVcIiB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxzdmdcclxuICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXHJcbiAgICAgIGZpbGw9XCJub25lXCJcclxuICAgICAgdmlld0JveD1cIjAgMCAyNCAyNFwiXHJcbiAgICAgIHN0cm9rZVdpZHRoPXsxLjV9XHJcbiAgICAgIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiXHJcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxyXG4gICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxyXG4gICAgPlxyXG4gICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm00LjUgMTUuNzUgNy41LTcuNSA3LjUgNy41XCIgLz5cclxuICAgIDwvc3ZnPlxyXG4gICk7XHJcbn07XHJcblxyXG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tIFwicmVhY3RcIjtcclxuXHJcbmV4cG9ydCBjb25zdCB1c2VPdXRzaWRlQ2xpY2sgPSAoXHJcbiAgcmVmczogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PiB8IEFycmF5PFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudD4+LFxyXG4gIG9uQ2xvc2U6ICgpID0+IHZvaWRcclxuKSA9PiB7XHJcbiAgY29uc3QgbGlzdCA9IHVzZU1lbW8oKCkgPT4gKEFycmF5LmlzQXJyYXkocmVmcykgPyByZWZzIDogW3JlZnNdKSwgW3JlZnNdKTtcclxuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmKGxpc3QpO1xyXG4gIGNvbnN0IG9uQ2xvc2VSZWYgPSB1c2VSZWYob25DbG9zZSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBsaXN0UmVmLmN1cnJlbnQgPSBsaXN0O1xyXG4gIH0sIFtsaXN0XSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBvbkNsb3NlUmVmLmN1cnJlbnQgPSBvbkNsb3NlO1xyXG4gIH0sIFtvbkNsb3NlXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBoYW5kbGVyID0gKGV2OiBNb3VzZUV2ZW50IHwgVG91Y2hFdmVudCkgPT4ge1xyXG4gICAgICBjb25zdCBjdXJyZW50TGlzdCA9IGxpc3RSZWYuY3VycmVudDtcclxuICAgICAgY29uc3QgaXNJbnNpZGUgPSBjdXJyZW50TGlzdC5zb21lKChyKSA9PiByPy5jdXJyZW50ICYmIHIuY3VycmVudC5jb250YWlucyhldi50YXJnZXQgYXMgTm9kZSkpO1xyXG4gICAgICBpZiAoaXNJbnNpZGUpIHJldHVybjtcclxuICAgICAgb25DbG9zZVJlZi5jdXJyZW50KCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgaGFuZGxlcik7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCBoYW5kbGVyLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcblxyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBoYW5kbGVyKTtcclxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgaGFuZGxlcik7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUFBLGdCQUE0RDs7O0FDQTVELElB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QSxnQkFBZ0I7QUFBQSxjQUNoQixNQUFLO0FBQUEsY0FDTCxjQUFhO0FBQUEsY0FDYjtBQUFBLGNBQ0E7QUFBQSxjQUNBLHFCQUFxQjtBQUFBLGNBRXBCO0FBQUE7QUFBQSxVQUNILElBRUEsWUFDRTtBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsV0FBVztBQUFBLGdCQUNUO0FBQUEsZ0JBQ0E7QUFBQSxnQkFDQTtBQUFBLGdCQUNBLGtCQUFrQjtBQUFBLGNBQ3BCO0FBQUEsY0FDQSxPQUFPLEVBQUUsR0FBRyxxQkFBcUIsR0FBSSxjQUFjLENBQUMsRUFBRztBQUFBLGNBRXREO0FBQUE7QUFBQSxVQUNIO0FBQUEsV0FHTjtBQUFBO0FBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxJQUFPLHlCQUFROyIsCiAgIm5hbWVzIjogWyJpbXBvcnRfcmVhY3QiLCAiaW1wb3J0X3JlYWN0IiwgIm5leHRTdHlsZSIsICJpbXBvcnRfanN4X3J1bnRpbWUiLCAiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9qc3hfcnVudGltZSJdCn0K
