import {
  handleComboboxKeyDown
} from "./chunk-6HMZLOGF.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-AXUPQW6N.js";
import {
  Spinner_default,
  classNames,
  indT
} from "./chunk-BYICIYT4.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/RemoteSearchCombobox.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var uniqueByValue = (items) => {
  const map = /* @__PURE__ */ new Map();
  for (const item of items || []) {
    const key = String(item.value || "").trim();
    if (!key) continue;
    if (map.has(key)) continue;
    map.set(key, {
      value: key,
      title: String(item.title || "").trim(),
      subtitle: String(item.subtitle || "").trim()
    });
  }
  return Array.from(map.values());
};
var RemoteSearchCombobox = ({
  label,
  placeholder,
  value,
  onChange,
  onSearch,
  onSearchPage,
  idBase,
  minSearchLength = 2,
  pageSize = 20,
  allowEmptySearch = false,
  loadOnOpen = false,
  infiniteScroll = false,
  disabled = false,
  readOnly = false,
  showLabel = true,
  panelClassName = "visitas-typography"
}) => {
  const readOnlyMode = readOnly || disabled;
  const valueColor = readOnlyMode ? "#64748b" : "#00296be0";
  const [options, setOptions] = (0, import_react.useState)([]);
  const [open, setOpen] = (0, import_react.useState)(false);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  const [lastSearchedTerm, setLastSearchedTerm] = (0, import_react.useState)("");
  const [currentPage, setCurrentPage] = (0, import_react.useState)(0);
  const [hasMore, setHasMore] = (0, import_react.useState)(false);
  const [showNotFoundState, setShowNotFoundState] = (0, import_react.useState)(false);
  const abortRef = (0, import_react.useRef)(null);
  const containerRef = (0, import_react.useRef)(null);
  const boxRef = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  useOutsideClick([containerRef, listRef], () => {
    setShowNotFoundState(false);
    setOpen(false);
  });
  (0, import_react.useEffect)(() => {
    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);
  const query = value || "";
  const filtered = (0, import_react.useMemo)(() => {
    if (!query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((option) => {
      const valueText = option.value.toLowerCase();
      const titleText = String(option.title || "").toLowerCase();
      const subtitleText = String(option.subtitle || "").toLowerCase();
      return valueText.includes(q) || titleText.includes(q) || subtitleText.includes(q);
    });
  }, [options, query]);
  const resolvedActiveIndex = filtered.length > 0 ? Math.min(Math.max(activeIndex, 0), filtered.length - 1) : 0;
  const canSearchTerm = (0, import_react.useCallback)(
    (term) => {
      const trimmed = term.trim();
      if (!trimmed) return allowEmptySearch;
      return trimmed.length >= minSearchLength;
    },
    [allowEmptySearch, minSearchLength]
  );
  const executeSearch = (0, import_react.useCallback)(
    async (term, page, append) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      if (!append) {
        setActiveIndex(0);
      }
      const termKey = term.toLowerCase();
      try {
        if (onSearchPage) {
          const response = await onSearchPage(term, page, pageSize, controller.signal);
          const pageItems = uniqueByValue(Array.isArray(response?.items) ? response.items : []);
          if (!append && pageItems.length === 0) {
            setOptions([]);
            setCurrentPage(0);
            setHasMore(false);
            setLastSearchedTerm(termKey);
            setShowNotFoundState(true);
            onChange("");
            setOpen(true);
            return;
          }
          setOptions((previous) => append ? uniqueByValue([...previous || [], ...pageItems]) : pageItems);
          setCurrentPage(page);
          setShowNotFoundState(false);
          const apiTotal = Number(response?.total);
          if (Number.isFinite(apiTotal) && apiTotal > 0) {
            setHasMore(page * pageSize < apiTotal);
          } else {
            setHasMore(pageItems.length >= pageSize);
          }
        } else {
          const response = await onSearch(term, controller.signal);
          const next = uniqueByValue(response || []);
          if (!append && next.length === 0) {
            setOptions([]);
            setCurrentPage(0);
            setHasMore(false);
            setLastSearchedTerm(termKey);
            setShowNotFoundState(true);
            onChange("");
            setOpen(true);
            return;
          }
          setOptions(next);
          setCurrentPage(1);
          setHasMore(false);
          setShowNotFoundState(false);
        }
        setLastSearchedTerm(termKey);
        setOpen(true);
      } catch {
        if (!append) {
          setOptions([]);
          setCurrentPage(0);
          setHasMore(false);
        }
        setLastSearchedTerm(termKey);
        setShowNotFoundState(false);
        setOpen(true);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        setLoading(false);
      }
    },
    [onSearch, onSearchPage, pageSize]
  );
  const runSearch = (0, import_react.useCallback)(async () => {
    if (readOnlyMode || loading) return;
    const term = query.trim();
    const termKey = term.toLowerCase();
    if (!canSearchTerm(term)) {
      setOptions([]);
      setCurrentPage(0);
      setHasMore(false);
      setShowNotFoundState(false);
      setOpen(false);
      setLastSearchedTerm("");
      return;
    }
    if (termKey === lastSearchedTerm && options.length > 0 && !onSearchPage) {
      setOpen(true);
      return;
    }
    await executeSearch(term, 1, false);
  }, [canSearchTerm, executeSearch, lastSearchedTerm, loading, onSearchPage, options.length, query, readOnlyMode]);
  const runLoadMore = (0, import_react.useCallback)(async () => {
    if (readOnlyMode || loading || !onSearchPage || !infiniteScroll || !hasMore) {
      return;
    }
    const term = query.trim();
    const termKey = term.toLowerCase();
    if (termKey !== lastSearchedTerm) {
      return;
    }
    const nextPage = currentPage + 1;
    if (nextPage <= 1) {
      return;
    }
    await executeSearch(term, nextPage, true);
  }, [currentPage, executeSearch, hasMore, infiniteScroll, lastSearchedTerm, loading, onSearchPage, query, readOnlyMode]);
  (0, import_react.useEffect)(() => {
    if (!open || !onSearchPage || !infiniteScroll) return;
    const scroller = listRef.current?.parentElement;
    if (!scroller) return;
    const onScroll = () => {
      if (loading || !hasMore) return;
      const threshold = 40;
      const isNearBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - threshold;
      if (isNearBottom) {
        void runLoadMore();
      }
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      scroller.removeEventListener("scroll", onScroll);
    };
  }, [hasMore, infiniteScroll, loading, onSearchPage, open, runLoadMore]);
  const selectOption = (option) => {
    const nextValue = String(option.value || "").trim();
    setShowNotFoundState(false);
    onChange(nextValue);
    setLastSearchedTerm(nextValue.toLowerCase());
    setOpen(false);
  };
  const queryKey = query.trim().toLowerCase();
  const showSearchIcon = !readOnlyMode && !loading && canSearchTerm(query) && queryKey !== lastSearchedTerm;
  const listId = `${idBase}-options`;
  const activeId = open && filtered[resolvedActiveIndex] ? `${idBase}-opt-${filtered[resolvedActiveIndex].value}` : void 0;
  const showLoadingOnlyState = loading && filtered.length === 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", ref: containerRef, children: [
    showLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { className: "form-label font-semibold", style: { color: "#00296be0" }, children: label }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          ref: boxRef,
          className: classNames(
            "relative w-full rounded-xl bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                className: classNames(
                  "w-full rounded-xl border px-3 py-2 pr-20 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
                  "border-slate-200 focus:ring-primary focus:border-primary",
                  readOnlyMode ? "ind-readonly-field" : "text-slate-900"
                ),
                style: { color: valueColor },
                value: query,
                onChange: (event) => {
                  const nextValue = event.target.value;
                  setActiveIndex(0);
                  setShowNotFoundState(false);
                  onChange(nextValue);
                  if (nextValue.trim().toLowerCase() !== lastSearchedTerm) {
                    setOpen(false);
                  }
                },
                onFocus: () => {
                  if (!readOnlyMode && (filtered.length > 0 || showNotFoundState)) {
                    setOpen(true);
                  }
                },
                onKeyDown: (event) => handleComboboxKeyDown(event, {
                  isOpen: open,
                  setOpen,
                  optionCount: filtered.length,
                  setActiveIndex,
                  onEnterWhenOpen: () => {
                    if (filtered.length > 0) {
                      selectOption(filtered[resolvedActiveIndex] ?? filtered[0]);
                      return;
                    }
                    void runSearch();
                  },
                  onEnterWhenClosed: () => {
                    void runSearch();
                  },
                  openOnArrow: true
                }),
                placeholder,
                readOnly,
                disabled,
                "aria-label": label,
                role: "combobox",
                "aria-expanded": open,
                "aria-controls": listId,
                "aria-activedescendant": activeId
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "absolute inset-y-0 right-0 flex items-center gap-1 pr-2", children: [
              loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex items-center px-1.5", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner_default, { size: "h-4 w-4" }) }) : null,
              showSearchIcon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: "flex items-center p-1.5 text-slate-400 hover:text-slate-500",
                  onClick: () => {
                    void runSearch();
                  },
                  "aria-label": indT("Common_Search", "Search"),
                  disabled: readOnlyMode,
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", className: "h-5 w-5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" }) })
                }
              ) : null,
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  className: "flex items-center p-1.5 text-slate-500 hover:text-slate-600",
                  onClick: () => {
                    if (readOnlyMode) return;
                    if (open) {
                      setOpen(false);
                      return;
                    }
                    if (filtered.length > 0) {
                      setOpen(true);
                      return;
                    }
                    if (!query.trim() && loadOnOpen) {
                      void runSearch();
                    }
                  },
                  "aria-label": open ? indT("Dropdown_HideOptions", "Hide options") : indT("Dropdown_ShowOptions", "Show options"),
                  disabled: readOnlyMode,
                  children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUpSvg, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownSvg, { className: "h-5 w-5" })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        FloatingList_default,
        {
          anchorRef: boxRef,
          open,
          zIndex: 36e4,
          maxHeightClass: "max-h-72",
          role: "listbox",
          roundedClass: "rounded-xl",
          panelClassName,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: listId, ref: listRef, children: showLoadingOnlyState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_Loading", "Loading") }) : showNotFoundState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NotFound", "Not found") }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NoData", "No data") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            filtered.map((option, index) => {
              const isActive = index === resolvedActiveIndex;
              const optionId = option.value || `${index}`;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "button",
                {
                  type: "button",
                  id: `${idBase}-opt-${optionId}`,
                  role: "option",
                  "aria-selected": isActive,
                  className: classNames(
                    "relative flex w-full cursor-default select-none items-start py-2 px-3 text-left text-sm",
                    isActive ? "bg-primary text-white" : "text-slate-900"
                  ),
                  onMouseEnter: () => setActiveIndex(index),
                  onClick: () => selectOption(option),
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "flex flex-col", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "font-medium", children: option.title || option.value }),
                    option.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: classNames("text-xs", isActive ? "text-white/90" : "text-slate-500"), children: option.subtitle }) : null
                  ] })
                },
                optionId
              );
            }),
            loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-xs text-slate-500 border-t border-slate-100", children: indT("Common_Loading", "Loading") }) : null
          ] }) })
        }
      )
    ] })
  ] });
};
var RemoteSearchCombobox_default = RemoteSearchCombobox;

export {
  RemoteSearchCombobox_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMudHN4XCI7XG5pbXBvcnQgeyBoYW5kbGVDb21ib2JveEtleURvd24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlQ29tYm9ib3hLZXlib2FyZC50c1wiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgc3VidGl0bGU/OiBzdHJpbmc7XG59O1xuXG50eXBlIFJlbW90ZVNlYXJjaENvbWJvYm94UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TZWFyY2g6ICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpID0+IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+O1xuICBvblNlYXJjaFBhZ2U/OiAoXG4gICAgdGVybTogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlcixcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxuICAgIHNpZ25hbDogQWJvcnRTaWduYWxcbiAgKSA9PiBQcm9taXNlPHsgaXRlbXM6IFJlbW90ZVNlYXJjaE9wdGlvbltdOyB0b3RhbD86IG51bWJlciB9PjtcbiAgaWRCYXNlOiBzdHJpbmc7XG4gIG1pblNlYXJjaExlbmd0aD86IG51bWJlcjtcbiAgcGFnZVNpemU/OiBudW1iZXI7XG4gIGFsbG93RW1wdHlTZWFyY2g/OiBib29sZWFuO1xuICBsb2FkT25PcGVuPzogYm9vbGVhbjtcbiAgaW5maW5pdGVTY3JvbGw/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5jb25zdCB1bmlxdWVCeVZhbHVlID0gKGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXSk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIFJlbW90ZVNlYXJjaE9wdGlvbj4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zIHx8IFtdKSB7XG4gICAgY29uc3Qga2V5ID0gU3RyaW5nKGl0ZW0udmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmICgha2V5KSBjb250aW51ZTtcbiAgICBpZiAobWFwLmhhcyhrZXkpKSBjb250aW51ZTtcbiAgICBtYXAuc2V0KGtleSwge1xuICAgICAgdmFsdWU6IGtleSxcbiAgICAgIHRpdGxlOiBTdHJpbmcoaXRlbS50aXRsZSB8fCBcIlwiKS50cmltKCksXG4gICAgICBzdWJ0aXRsZTogU3RyaW5nKGl0ZW0uc3VidGl0bGUgfHwgXCJcIikudHJpbSgpLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKG1hcC52YWx1ZXMoKSk7XG59O1xuXG4vLyBHZW5lcmljIHJlbW90ZS1zZWFyY2ggY29tYm9ib3ggdGhhdCBzdXBwb3J0cyBtYW51YWwgc2VhcmNoIGFuZCBvcHRpb25hbCBwYWdlZCBsb2FkaW5nIG9uIG9wZW4uXG5jb25zdCBSZW1vdGVTZWFyY2hDb21ib2JveCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICBvblNlYXJjaCxcbiAgb25TZWFyY2hQYWdlLFxuICBpZEJhc2UsXG4gIG1pblNlYXJjaExlbmd0aCA9IDIsXG4gIHBhZ2VTaXplID0gMjAsXG4gIGFsbG93RW1wdHlTZWFyY2ggPSBmYWxzZSxcbiAgbG9hZE9uT3BlbiA9IGZhbHNlLFxuICBpbmZpbml0ZVNjcm9sbCA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxuICBwYW5lbENsYXNzTmFtZSA9IFwidmlzaXRhcy10eXBvZ3JhcGh5XCIsXG59OiBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4oW10pO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2xhc3RTZWFyY2hlZFRlcm0sIHNldExhc3RTZWFyY2hlZFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtoYXNNb3JlLCBzZXRIYXNNb3JlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Nob3dOb3RGb3VuZFN0YXRlLCBzZXRTaG93Tm90Rm91bmRTdGF0ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4ge1xuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcbiAgICBzZXRPcGVuKGZhbHNlKTtcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBxdWVyeSA9IHZhbHVlIHx8IFwiXCI7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIG9wdGlvbnM7XG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBvcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZVRleHQgPSBvcHRpb24udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24udGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHN1YnRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24uc3VidGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiB2YWx1ZVRleHQuaW5jbHVkZXMocSkgfHwgdGl0bGVUZXh0LmluY2x1ZGVzKHEpIHx8IHN1YnRpdGxlVGV4dC5pbmNsdWRlcyhxKTtcbiAgICB9KTtcbiAgfSwgW29wdGlvbnMsIHF1ZXJ5XSk7XG4gIGNvbnN0IHJlc29sdmVkQWN0aXZlSW5kZXggPVxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcblxuICBjb25zdCBjYW5TZWFyY2hUZXJtID0gdXNlQ2FsbGJhY2soXG4gICAgKHRlcm06IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgICAgY29uc3QgdHJpbW1lZCA9IHRlcm0udHJpbSgpO1xuICAgICAgaWYgKCF0cmltbWVkKSByZXR1cm4gYWxsb3dFbXB0eVNlYXJjaDtcbiAgICAgIHJldHVybiB0cmltbWVkLmxlbmd0aCA+PSBtaW5TZWFyY2hMZW5ndGg7XG4gICAgfSxcbiAgICBbYWxsb3dFbXB0eVNlYXJjaCwgbWluU2VhcmNoTGVuZ3RoXVxuICApO1xuXG4gIGNvbnN0IGV4ZWN1dGVTZWFyY2ggPSB1c2VDYWxsYmFjayhcbiAgICBhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIGFwcGVuZDogYm9vbGVhbikgPT4ge1xuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcbiAgICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBuZXcgQWJvcnRDb250cm9sbGVyKCk7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcbiAgICAgIHNldExvYWRpbmcodHJ1ZSk7XG4gICAgICBpZiAoIWFwcGVuZCkge1xuICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChvblNlYXJjaFBhZ2UpIHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9uU2VhcmNoUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgY29udHJvbGxlci5zaWduYWwpO1xuICAgICAgICAgIGNvbnN0IHBhZ2VJdGVtcyA9IHVuaXF1ZUJ5VmFsdWUoQXJyYXkuaXNBcnJheShyZXNwb25zZT8uaXRlbXMpID8gcmVzcG9uc2UuaXRlbXMgOiBbXSk7XG4gICAgICAgICAgaWYgKCFhcHBlbmQgJiYgcGFnZUl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgICBzZXRDdXJyZW50UGFnZSgwKTtcbiAgICAgICAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xuICAgICAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcbiAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKHRydWUpO1xuICAgICAgICAgICAgb25DaGFuZ2UoXCJcIik7XG4gICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldE9wdGlvbnMoKHByZXZpb3VzKSA9PiAoYXBwZW5kID8gdW5pcXVlQnlWYWx1ZShbLi4uKHByZXZpb3VzIHx8IFtdKSwgLi4ucGFnZUl0ZW1zXSkgOiBwYWdlSXRlbXMpKTtcbiAgICAgICAgICBzZXRDdXJyZW50UGFnZShwYWdlKTtcbiAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XG5cbiAgICAgICAgICBjb25zdCBhcGlUb3RhbCA9IE51bWJlcihyZXNwb25zZT8udG90YWwpO1xuICAgICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoYXBpVG90YWwpICYmIGFwaVRvdGFsID4gMCkge1xuICAgICAgICAgICAgc2V0SGFzTW9yZShwYWdlICogcGFnZVNpemUgPCBhcGlUb3RhbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldEhhc01vcmUocGFnZUl0ZW1zLmxlbmd0aCA+PSBwYWdlU2l6ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb25TZWFyY2godGVybSwgY29udHJvbGxlci5zaWduYWwpO1xuICAgICAgICAgIGNvbnN0IG5leHQgPSB1bmlxdWVCeVZhbHVlKHJlc3BvbnNlIHx8IFtdKTtcbiAgICAgICAgICBpZiAoIWFwcGVuZCAmJiBuZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICAgICAgICBzZXRDdXJyZW50UGFnZSgwKTtcbiAgICAgICAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xuICAgICAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcbiAgICAgICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKHRydWUpO1xuICAgICAgICAgICAgb25DaGFuZ2UoXCJcIik7XG4gICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldE9wdGlvbnMobmV4dCk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UoMSk7XG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBpZiAoIWFwcGVuZCkge1xuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDApO1xuICAgICAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XG4gICAgICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChhYm9ydFJlZi5jdXJyZW50ID09PSBjb250cm9sbGVyKSB7XG4gICAgICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbb25TZWFyY2gsIG9uU2VhcmNoUGFnZSwgcGFnZVNpemVdXG4gICk7XG5cbiAgY29uc3QgcnVuU2VhcmNoID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChyZWFkT25seU1vZGUgfHwgbG9hZGluZykgcmV0dXJuO1xuICAgIGNvbnN0IHRlcm0gPSBxdWVyeS50cmltKCk7XG4gICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcblxuICAgIGlmICghY2FuU2VhcmNoVGVybSh0ZXJtKSkge1xuICAgICAgc2V0T3B0aW9ucyhbXSk7XG4gICAgICBzZXRDdXJyZW50UGFnZSgwKTtcbiAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xuICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKFwiXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0ZXJtS2V5ID09PSBsYXN0U2VhcmNoZWRUZXJtICYmIG9wdGlvbnMubGVuZ3RoID4gMCAmJiAhb25TZWFyY2hQYWdlKSB7XG4gICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IGV4ZWN1dGVTZWFyY2godGVybSwgMSwgZmFsc2UpO1xuICB9LCBbY2FuU2VhcmNoVGVybSwgZXhlY3V0ZVNlYXJjaCwgbGFzdFNlYXJjaGVkVGVybSwgbG9hZGluZywgb25TZWFyY2hQYWdlLCBvcHRpb25zLmxlbmd0aCwgcXVlcnksIHJlYWRPbmx5TW9kZV0pO1xuXG4gIGNvbnN0IHJ1bkxvYWRNb3JlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIGlmIChyZWFkT25seU1vZGUgfHwgbG9hZGluZyB8fCAhb25TZWFyY2hQYWdlIHx8ICFpbmZpbml0ZVNjcm9sbCB8fCAhaGFzTW9yZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRlcm0gPSBxdWVyeS50cmltKCk7XG4gICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcbiAgICBpZiAodGVybUtleSAhPT0gbGFzdFNlYXJjaGVkVGVybSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRQYWdlID0gY3VycmVudFBhZ2UgKyAxO1xuICAgIGlmIChuZXh0UGFnZSA8PSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgZXhlY3V0ZVNlYXJjaCh0ZXJtLCBuZXh0UGFnZSwgdHJ1ZSk7XG4gIH0sIFtjdXJyZW50UGFnZSwgZXhlY3V0ZVNlYXJjaCwgaGFzTW9yZSwgaW5maW5pdGVTY3JvbGwsIGxhc3RTZWFyY2hlZFRlcm0sIGxvYWRpbmcsIG9uU2VhcmNoUGFnZSwgcXVlcnksIHJlYWRPbmx5TW9kZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFvcGVuIHx8ICFvblNlYXJjaFBhZ2UgfHwgIWluZmluaXRlU2Nyb2xsKSByZXR1cm47XG4gICAgY29uc3Qgc2Nyb2xsZXIgPSBsaXN0UmVmLmN1cnJlbnQ/LnBhcmVudEVsZW1lbnQ7XG4gICAgaWYgKCFzY3JvbGxlcikgcmV0dXJuO1xuXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XG4gICAgICBpZiAobG9hZGluZyB8fCAhaGFzTW9yZSkgcmV0dXJuO1xuICAgICAgY29uc3QgdGhyZXNob2xkID0gNDA7XG4gICAgICBjb25zdCBpc05lYXJCb3R0b20gPSBzY3JvbGxlci5zY3JvbGxUb3AgKyBzY3JvbGxlci5jbGllbnRIZWlnaHQgPj0gc2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0IC0gdGhyZXNob2xkO1xuICAgICAgaWYgKGlzTmVhckJvdHRvbSkge1xuICAgICAgICB2b2lkIHJ1bkxvYWRNb3JlKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgc2Nyb2xsZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCk7XG4gICAgfTtcbiAgfSwgW2hhc01vcmUsIGluZmluaXRlU2Nyb2xsLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIG9wZW4sIHJ1bkxvYWRNb3JlXSk7XG5cbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdGlvbjogUmVtb3RlU2VhcmNoT3B0aW9uKSA9PiB7XG4gICAgY29uc3QgbmV4dFZhbHVlID0gU3RyaW5nKG9wdGlvbi52YWx1ZSB8fCBcIlwiKS50cmltKCk7XG4gICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XG4gICAgc2V0TGFzdFNlYXJjaGVkVGVybShuZXh0VmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgcXVlcnlLZXkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qgc2hvd1NlYXJjaEljb24gPVxuICAgICFyZWFkT25seU1vZGUgJiZcbiAgICAhbG9hZGluZyAmJlxuICAgIGNhblNlYXJjaFRlcm0ocXVlcnkpICYmXG4gICAgcXVlcnlLZXkgIT09IGxhc3RTZWFyY2hlZFRlcm07XG5cbiAgY29uc3QgbGlzdElkID0gYCR7aWRCYXNlfS1vcHRpb25zYDtcbiAgY29uc3QgYWN0aXZlSWQgPVxuICAgIG9wZW4gJiYgZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0gPyBgJHtpZEJhc2V9LW9wdC0ke2ZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHNob3dMb2FkaW5nT25seVN0YXRlID0gbG9hZGluZyAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDA7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiIHJlZj17Y29udGFpbmVyUmVmfT5cbiAgICAgIHtzaG93TGFiZWwgPyAoXG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjMDAyOTZiZTBcIiB9fT5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17Ym94UmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIHJvdW5kZWQteGwgYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIixcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBweC0zIHB5LTIgcHItMjAgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBkaXNhYmxlZDpiZy1zbGF0ZS0xMDAgZGlzYWJsZWQ6dGV4dC1zbGF0ZS01MDAgZGlzYWJsZWQ6Ym9yZGVyLXNsYXRlLTIwMCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWRcIixcbiAgICAgICAgICAgICAgXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiLFxuICAgICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IHZhbHVlQ29sb3IgfX1cbiAgICAgICAgICAgIHZhbHVlPXtxdWVyeX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcbiAgICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xuICAgICAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpICE9PSBsYXN0U2VhcmNoZWRUZXJtKSB7XG4gICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghcmVhZE9ubHlNb2RlICYmIChmaWx0ZXJlZC5sZW5ndGggPiAwIHx8IHNob3dOb3RGb3VuZFN0YXRlKSkge1xuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbktleURvd249eyhldmVudCkgPT5cbiAgICAgICAgICAgICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2ZW50LCB7XG4gICAgICAgICAgICAgICAgaXNPcGVuOiBvcGVuLFxuICAgICAgICAgICAgICAgIHNldE9wZW4sXG4gICAgICAgICAgICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCxcbiAgICAgICAgICAgICAgICBvbkVudGVyV2hlbk9wZW46ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdE9wdGlvbihmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XSA/PyBmaWx0ZXJlZFswXSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBvbkVudGVyV2hlbkNsb3NlZDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wZW5PbkFycm93OiB0cnVlLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxuICAgICAgICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XG4gICAgICAgICAgICByb2xlPVwiY29tYm9ib3hcIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cbiAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cbiAgICAgICAgICAgIGFyaWEtYWN0aXZlZGVzY2VuZGFudD17YWN0aXZlSWR9XG4gICAgICAgICAgLz5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteS0wIHJpZ2h0LTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHItMlwiPlxuICAgICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHB4LTEuNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDxTcGlubmVyIHNpemU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgKSA6IG51bGx9XG5cbiAgICAgICAgICAgIHtzaG93U2VhcmNoSWNvbiA/IChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9TZWFyY2hcIiwgXCJTZWFyY2hcIil9XG4gICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cbiAgICAgICAgICAgICAgICAgIDxwYXRoIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBkPVwibTE1Ljc1IDE1Ljc1LTIuNDg5LTIuNDg5bTAgMGEzLjM3NSAzLjM3NSAwIDEgMC00Ljc3My00Ljc3MyAzLjM3NSAzLjM3NSAwIDAgMCA0Ljc3NCA0Ljc3NFpNMjEgMTJhOSA5IDAgMSAxLTE4IDAgOSA5IDAgMCAxIDE4IDBaXCIgLz5cbiAgICAgICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlYWRPbmx5TW9kZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCFxdWVyeS50cmltKCkgJiYgbG9hZE9uT3Blbikge1xuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkT25seU1vZGV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8RmxvYXRpbmdMaXN0XG4gICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XG4gICAgICAgICAgb3Blbj17b3Blbn1cbiAgICAgICAgICB6SW5kZXg9ezM2MDAwMH1cbiAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcbiAgICAgICAgICByb2xlPVwibGlzdGJveFwiXG4gICAgICAgICAgcm91bmRlZENsYXNzPVwicm91bmRlZC14bFwiXG4gICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBpZD17bGlzdElkfSByZWY9e2xpc3RSZWZ9PlxuICAgICAgICAgICAge3Nob3dMb2FkaW5nT25seVN0YXRlID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9kaXY+XG4gICAgICAgICAgICApIDogc2hvd05vdEZvdW5kU3RhdGUgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKX08L2Rpdj5cbiAgICAgICAgICAgICkgOiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7ZmlsdGVyZWQubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGluZGV4ID09PSByZXNvbHZlZEFjdGl2ZUluZGV4O1xuICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uSWQgPSBvcHRpb24udmFsdWUgfHwgYCR7aW5kZXh9YDtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e29wdGlvbklkfVxuICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtpZEJhc2V9LW9wdC0ke29wdGlvbklkfWB9XG4gICAgICAgICAgICAgICAgICAgICAgcm9sZT1cIm9wdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgYXJpYS1zZWxlY3RlZD17aXNBY3RpdmV9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWxhdGl2ZSBmbGV4IHctZnVsbCBjdXJzb3ItZGVmYXVsdCBzZWxlY3Qtbm9uZSBpdGVtcy1zdGFydCBweS0yIHB4LTMgdGV4dC1sZWZ0IHRleHQtc21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID8gXCJiZy1wcmltYXJ5IHRleHQtd2hpdGVcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgb25Nb3VzZUVudGVyPXsoKSA9PiBzZXRBY3RpdmVJbmRleChpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2VsZWN0T3B0aW9uKG9wdGlvbil9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1lZGl1bVwiPntvcHRpb24udGl0bGUgfHwgb3B0aW9uLnZhbHVlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24uc3VidGl0bGUgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcInRleHQteHNcIiwgaXNBY3RpdmUgPyBcInRleHQtd2hpdGUvOTBcIiA6IFwidGV4dC1zbGF0ZS01MDBcIil9PntvcHRpb24uc3VidGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAge2xvYWRpbmcgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIGJvcmRlci10IGJvcmRlci1zbGF0ZS0xMDBcIj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0Zsb2F0aW5nTGlzdD5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVtb3RlU2VhcmNoQ29tYm9ib3g7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUF5RTtBQStSakU7QUF4UFIsSUFBTSxnQkFBZ0IsQ0FBQyxVQUFzRDtBQUMzRSxRQUFNLE1BQU0sb0JBQUksSUFBZ0M7QUFDaEQsYUFBVyxRQUFRLFNBQVMsQ0FBQyxHQUFHO0FBQzlCLFVBQU0sTUFBTSxPQUFPLEtBQUssU0FBUyxFQUFFLEVBQUUsS0FBSztBQUMxQyxRQUFJLENBQUMsSUFBSztBQUNWLFFBQUksSUFBSSxJQUFJLEdBQUcsRUFBRztBQUNsQixRQUFJLElBQUksS0FBSztBQUFBLE1BQ1gsT0FBTztBQUFBLE1BQ1AsT0FBTyxPQUFPLEtBQUssU0FBUyxFQUFFLEVBQUUsS0FBSztBQUFBLE1BQ3JDLFVBQVUsT0FBTyxLQUFLLFlBQVksRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUM3QyxDQUFDO0FBQUEsRUFDSDtBQUNBLFNBQU8sTUFBTSxLQUFLLElBQUksT0FBTyxDQUFDO0FBQ2hDO0FBR0EsSUFBTSx1QkFBdUIsQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxrQkFBa0I7QUFBQSxFQUNsQixXQUFXO0FBQUEsRUFDWCxtQkFBbUI7QUFB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
