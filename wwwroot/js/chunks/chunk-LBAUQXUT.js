import {
  handleComboboxKeyDown
} from "./chunk-6HMZLOGF.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-6YXFJB4W.js";
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
  const [query, setQuery] = (0, import_react.useState)(value || "");
  const [options, setOptions] = (0, import_react.useState)([]);
  const [open, setOpen] = (0, import_react.useState)(false);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
  const [lastSearchedTerm, setLastSearchedTerm] = (0, import_react.useState)("");
  const [currentPage, setCurrentPage] = (0, import_react.useState)(0);
  const [hasMore, setHasMore] = (0, import_react.useState)(false);
  const abortRef = (0, import_react.useRef)(null);
  const appendRequestRef = (0, import_react.useRef)(false);
  const containerRef = (0, import_react.useRef)(null);
  const boxRef = (0, import_react.useRef)(null);
  const listRef = (0, import_react.useRef)(null);
  useOutsideClick([containerRef, listRef], () => setOpen(false));
  (0, import_react.useEffect)(() => {
    setQuery(value || "");
  }, [value]);
  (0, import_react.useEffect)(() => {
    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);
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
  (0, import_react.useEffect)(() => {
    if (appendRequestRef.current) {
      return;
    }
    setActiveIndex(0);
  }, [filtered.length, query]);
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
      appendRequestRef.current = append;
      setLoading(true);
      const termKey = term.toLowerCase();
      try {
        if (onSearchPage) {
          const response = await onSearchPage(term, page, pageSize, controller.signal);
          const pageItems = uniqueByValue(Array.isArray(response?.items) ? response.items : []);
          setOptions((previous) => append ? uniqueByValue([...previous || [], ...pageItems]) : pageItems);
          setCurrentPage(page);
          const apiTotal = Number(response?.total);
          if (Number.isFinite(apiTotal) && apiTotal > 0) {
            setHasMore(page * pageSize < apiTotal);
          } else {
            setHasMore(pageItems.length >= pageSize);
          }
        } else {
          const response = await onSearch(term, controller.signal);
          const next = uniqueByValue(response || []);
          setOptions(next);
          setCurrentPage(1);
          setHasMore(false);
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
        setOpen(true);
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
        appendRequestRef.current = false;
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
    setQuery(nextValue);
    onChange(nextValue);
    setLastSearchedTerm(nextValue.toLowerCase());
    setOpen(false);
  };
  const queryKey = query.trim().toLowerCase();
  const showSearchIcon = !readOnlyMode && !loading && canSearchTerm(query) && queryKey !== lastSearchedTerm;
  const listId = `${idBase}-options`;
  const activeId = open && filtered[activeIndex] ? `${idBase}-opt-${filtered[activeIndex].value}` : void 0;
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
                  setQuery(nextValue);
                  onChange(nextValue);
                  if (nextValue.trim().toLowerCase() !== lastSearchedTerm) {
                    setOpen(false);
                  }
                },
                onFocus: () => {
                  if (!readOnlyMode && filtered.length > 0) {
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
                      selectOption(filtered[activeIndex] ?? filtered[0]);
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
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: listId, ref: listRef, children: showLoadingOnlyState ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_Loading", "Loading") }) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "px-4 py-2 text-sm text-slate-500", children: indT("Common_NoData", "No data") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            filtered.map((option, index) => {
              const isActive = index === activeIndex;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgRmxvYXRpbmdMaXN0IGZyb20gXCIuL0Zsb2F0aW5nTGlzdC50c3hcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuL1NwaW5uZXIudHN4XCI7XG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMudHN4XCI7XG5pbXBvcnQgeyBoYW5kbGVDb21ib2JveEtleURvd24gfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlQ29tYm9ib3hLZXlib2FyZC50c1wiO1xuaW1wb3J0IHsgdXNlT3V0c2lkZUNsaWNrIH0gZnJvbSBcIi4uLy4uL2hvb2tzL3VzZU91dHNpZGVDbGljay50c1wiO1xuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XG5pbXBvcnQgeyBpbmRUIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2luZEkxOG4udHNcIjtcblxuZXhwb3J0IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0aXRsZT86IHN0cmluZztcbiAgc3VidGl0bGU/OiBzdHJpbmc7XG59O1xuXG50eXBlIFJlbW90ZVNlYXJjaENvbWJvYm94UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIG9uQ2hhbmdlOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgb25TZWFyY2g6ICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpID0+IFByb21pc2U8UmVtb3RlU2VhcmNoT3B0aW9uW10+O1xuICBvblNlYXJjaFBhZ2U/OiAoXG4gICAgdGVybTogc3RyaW5nLFxuICAgIHBhZ2U6IG51bWJlcixcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxuICAgIHNpZ25hbDogQWJvcnRTaWduYWxcbiAgKSA9PiBQcm9taXNlPHsgaXRlbXM6IFJlbW90ZVNlYXJjaE9wdGlvbltdOyB0b3RhbD86IG51bWJlciB9PjtcbiAgaWRCYXNlOiBzdHJpbmc7XG4gIG1pblNlYXJjaExlbmd0aD86IG51bWJlcjtcbiAgcGFnZVNpemU/OiBudW1iZXI7XG4gIGFsbG93RW1wdHlTZWFyY2g/OiBib29sZWFuO1xuICBsb2FkT25PcGVuPzogYm9vbGVhbjtcbiAgaW5maW5pdGVTY3JvbGw/OiBib29sZWFuO1xuICBkaXNhYmxlZD86IGJvb2xlYW47XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XG59O1xuXG5jb25zdCB1bmlxdWVCeVZhbHVlID0gKGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXSk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgY29uc3QgbWFwID0gbmV3IE1hcDxzdHJpbmcsIFJlbW90ZVNlYXJjaE9wdGlvbj4oKTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zIHx8IFtdKSB7XG4gICAgY29uc3Qga2V5ID0gU3RyaW5nKGl0ZW0udmFsdWUgfHwgXCJcIikudHJpbSgpO1xuICAgIGlmICgha2V5KSBjb250aW51ZTtcbiAgICBpZiAobWFwLmhhcyhrZXkpKSBjb250aW51ZTtcbiAgICBtYXAuc2V0KGtleSwge1xuICAgICAgdmFsdWU6IGtleSxcbiAgICAgIHRpdGxlOiBTdHJpbmcoaXRlbS50aXRsZSB8fCBcIlwiKS50cmltKCksXG4gICAgICBzdWJ0aXRsZTogU3RyaW5nKGl0ZW0uc3VidGl0bGUgfHwgXCJcIikudHJpbSgpLFxuICAgIH0pO1xuICB9XG4gIHJldHVybiBBcnJheS5mcm9tKG1hcC52YWx1ZXMoKSk7XG59O1xuXG4vLyBHZW5lcmljIHJlbW90ZS1zZWFyY2ggY29tYm9ib3ggdGhhdCBzdXBwb3J0cyBtYW51YWwgc2VhcmNoIGFuZCBvcHRpb25hbCBwYWdlZCBsb2FkaW5nIG9uIG9wZW4uXG5jb25zdCBSZW1vdGVTZWFyY2hDb21ib2JveCA9ICh7XG4gIGxhYmVsLFxuICBwbGFjZWhvbGRlcixcbiAgdmFsdWUsXG4gIG9uQ2hhbmdlLFxuICBvblNlYXJjaCxcbiAgb25TZWFyY2hQYWdlLFxuICBpZEJhc2UsXG4gIG1pblNlYXJjaExlbmd0aCA9IDIsXG4gIHBhZ2VTaXplID0gMjAsXG4gIGFsbG93RW1wdHlTZWFyY2ggPSBmYWxzZSxcbiAgbG9hZE9uT3BlbiA9IGZhbHNlLFxuICBpbmZpbml0ZVNjcm9sbCA9IGZhbHNlLFxuICBkaXNhYmxlZCA9IGZhbHNlLFxuICByZWFkT25seSA9IGZhbHNlLFxuICBzaG93TGFiZWwgPSB0cnVlLFxuICBwYW5lbENsYXNzTmFtZSA9IFwidmlzaXRhcy10eXBvZ3JhcGh5XCIsXG59OiBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzKSA9PiB7XG4gIGNvbnN0IHJlYWRPbmx5TW9kZSA9IHJlYWRPbmx5IHx8IGRpc2FibGVkO1xuICBjb25zdCB2YWx1ZUNvbG9yID0gcmVhZE9ubHlNb2RlID8gXCIjNjQ3NDhiXCIgOiBcIiMwMDI5NmJlMFwiO1xuICBjb25zdCBbcXVlcnksIHNldFF1ZXJ5XSA9IHVzZVN0YXRlKHZhbHVlIHx8IFwiXCIpO1xuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4oW10pO1xuICBjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2xhc3RTZWFyY2hlZFRlcm0sIHNldExhc3RTZWFyY2hlZFRlcm1dID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFtjdXJyZW50UGFnZSwgc2V0Q3VycmVudFBhZ2VdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtoYXNNb3JlLCBzZXRIYXNNb3JlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBhYm9ydFJlZiA9IHVzZVJlZjxBYm9ydENvbnRyb2xsZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYXBwZW5kUmVxdWVzdFJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIGNvbnN0IGNvbnRhaW5lclJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuICBjb25zdCBib3hSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZU91dHNpZGVDbGljayhbY29udGFpbmVyUmVmLCBsaXN0UmVmXSwgKCkgPT4gc2V0T3BlbihmYWxzZSkpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0UXVlcnkodmFsdWUgfHwgXCJcIik7XG4gIH0sIFt2YWx1ZV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQ/LmFib3J0KCk7XG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgY29uc3QgZmlsdGVyZWQgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAoIXF1ZXJ5LnRyaW0oKSkgcmV0dXJuIG9wdGlvbnM7XG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBvcHRpb25zLmZpbHRlcigob3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZVRleHQgPSBvcHRpb24udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24udGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHN1YnRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24uc3VidGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiB2YWx1ZVRleHQuaW5jbHVkZXMocSkgfHwgdGl0bGVUZXh0LmluY2x1ZGVzKHEpIHx8IHN1YnRpdGxlVGV4dC5pbmNsdWRlcyhxKTtcbiAgICB9KTtcbiAgfSwgW29wdGlvbnMsIHF1ZXJ5XSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoYXBwZW5kUmVxdWVzdFJlZi5jdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlSW5kZXgoMCk7XG4gIH0sIFtmaWx0ZXJlZC5sZW5ndGgsIHF1ZXJ5XSk7XG5cbiAgY29uc3QgY2FuU2VhcmNoVGVybSA9IHVzZUNhbGxiYWNrKFxuICAgICh0ZXJtOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICAgIGNvbnN0IHRyaW1tZWQgPSB0ZXJtLnRyaW0oKTtcbiAgICAgIGlmICghdHJpbW1lZCkgcmV0dXJuIGFsbG93RW1wdHlTZWFyY2g7XG4gICAgICByZXR1cm4gdHJpbW1lZC5sZW5ndGggPj0gbWluU2VhcmNoTGVuZ3RoO1xuICAgIH0sXG4gICAgW2FsbG93RW1wdHlTZWFyY2gsIG1pblNlYXJjaExlbmd0aF1cbiAgKTtcblxuICBjb25zdCBleGVjdXRlU2VhcmNoID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBhcHBlbmQ6IGJvb2xlYW4pID0+IHtcbiAgICAgIGFib3J0UmVmLmN1cnJlbnQ/LmFib3J0KCk7XG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IGNvbnRyb2xsZXI7XG4gICAgICBhcHBlbmRSZXF1ZXN0UmVmLmN1cnJlbnQgPSBhcHBlbmQ7XG4gICAgICBzZXRMb2FkaW5nKHRydWUpO1xuXG4gICAgICBjb25zdCB0ZXJtS2V5ID0gdGVybS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKG9uU2VhcmNoUGFnZSkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb25TZWFyY2hQYWdlKHRlcm0sIHBhZ2UsIHBhZ2VTaXplLCBjb250cm9sbGVyLnNpZ25hbCk7XG4gICAgICAgICAgY29uc3QgcGFnZUl0ZW1zID0gdW5pcXVlQnlWYWx1ZShBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5pdGVtcykgPyByZXNwb25zZS5pdGVtcyA6IFtdKTtcbiAgICAgICAgICBzZXRPcHRpb25zKChwcmV2aW91cykgPT4gKGFwcGVuZCA/IHVuaXF1ZUJ5VmFsdWUoWy4uLihwcmV2aW91cyB8fCBbXSksIC4uLnBhZ2VJdGVtc10pIDogcGFnZUl0ZW1zKSk7XG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XG5cbiAgICAgICAgICBjb25zdCBhcGlUb3RhbCA9IE51bWJlcihyZXNwb25zZT8udG90YWwpO1xuICAgICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoYXBpVG90YWwpICYmIGFwaVRvdGFsID4gMCkge1xuICAgICAgICAgICAgc2V0SGFzTW9yZShwYWdlICogcGFnZVNpemUgPCBhcGlUb3RhbCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldEhhc01vcmUocGFnZUl0ZW1zLmxlbmd0aCA+PSBwYWdlU2l6ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb25TZWFyY2godGVybSwgY29udHJvbGxlci5zaWduYWwpO1xuICAgICAgICAgIGNvbnN0IG5leHQgPSB1bmlxdWVCeVZhbHVlKHJlc3BvbnNlIHx8IFtdKTtcbiAgICAgICAgICBzZXRPcHRpb25zKG5leHQpO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDEpO1xuICAgICAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcbiAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICBpZiAoIWFwcGVuZCkge1xuICAgICAgICAgIHNldE9wdGlvbnMoW10pO1xuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDApO1xuICAgICAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoYWJvcnRSZWYuY3VycmVudCA9PT0gY29udHJvbGxlcikge1xuICAgICAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGFwcGVuZFJlcXVlc3RSZWYuY3VycmVudCA9IGZhbHNlO1xuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtvblNlYXJjaCwgb25TZWFyY2hQYWdlLCBwYWdlU2l6ZV1cbiAgKTtcblxuICBjb25zdCBydW5TZWFyY2ggPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKHJlYWRPbmx5TW9kZSB8fCBsb2FkaW5nKSByZXR1cm47XG4gICAgY29uc3QgdGVybSA9IHF1ZXJ5LnRyaW0oKTtcbiAgICBjb25zdCB0ZXJtS2V5ID0gdGVybS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgaWYgKCFjYW5TZWFyY2hUZXJtKHRlcm0pKSB7XG4gICAgICBzZXRPcHRpb25zKFtdKTtcbiAgICAgIHNldEN1cnJlbnRQYWdlKDApO1xuICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XG4gICAgICBzZXRPcGVuKGZhbHNlKTtcbiAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0oXCJcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRlcm1LZXkgPT09IGxhc3RTZWFyY2hlZFRlcm0gJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmICFvblNlYXJjaFBhZ2UpIHtcbiAgICAgIHNldE9wZW4odHJ1ZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgZXhlY3V0ZVNlYXJjaCh0ZXJtLCAxLCBmYWxzZSk7XG4gIH0sIFtjYW5TZWFyY2hUZXJtLCBleGVjdXRlU2VhcmNoLCBsYXN0U2VhcmNoZWRUZXJtLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIG9wdGlvbnMubGVuZ3RoLCBxdWVyeSwgcmVhZE9ubHlNb2RlXSk7XG5cbiAgY29uc3QgcnVuTG9hZE1vcmUgPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XG4gICAgaWYgKHJlYWRPbmx5TW9kZSB8fCBsb2FkaW5nIHx8ICFvblNlYXJjaFBhZ2UgfHwgIWluZmluaXRlU2Nyb2xsIHx8ICFoYXNNb3JlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGVybSA9IHF1ZXJ5LnRyaW0oKTtcbiAgICBjb25zdCB0ZXJtS2V5ID0gdGVybS50b0xvd2VyQ2FzZSgpO1xuICAgIGlmICh0ZXJtS2V5ICE9PSBsYXN0U2VhcmNoZWRUZXJtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFBhZ2UgPSBjdXJyZW50UGFnZSArIDE7XG4gICAgaWYgKG5leHRQYWdlIDw9IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBleGVjdXRlU2VhcmNoKHRlcm0sIG5leHRQYWdlLCB0cnVlKTtcbiAgfSwgW2N1cnJlbnRQYWdlLCBleGVjdXRlU2VhcmNoLCBoYXNNb3JlLCBpbmZpbml0ZVNjcm9sbCwgbGFzdFNlYXJjaGVkVGVybSwgbG9hZGluZywgb25TZWFyY2hQYWdlLCBxdWVyeSwgcmVhZE9ubHlNb2RlXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4gfHwgIW9uU2VhcmNoUGFnZSB8fCAhaW5maW5pdGVTY3JvbGwpIHJldHVybjtcbiAgICBjb25zdCBzY3JvbGxlciA9IGxpc3RSZWYuY3VycmVudD8ucGFyZW50RWxlbWVudDtcbiAgICBpZiAoIXNjcm9sbGVyKSByZXR1cm47XG5cbiAgICBjb25zdCBvblNjcm9sbCA9ICgpID0+IHtcbiAgICAgIGlmIChsb2FkaW5nIHx8ICFoYXNNb3JlKSByZXR1cm47XG4gICAgICBjb25zdCB0aHJlc2hvbGQgPSA0MDtcbiAgICAgIGNvbnN0IGlzTmVhckJvdHRvbSA9IHNjcm9sbGVyLnNjcm9sbFRvcCArIHNjcm9sbGVyLmNsaWVudEhlaWdodCA+PSBzY3JvbGxlci5zY3JvbGxIZWlnaHQgLSB0aHJlc2hvbGQ7XG4gICAgICBpZiAoaXNOZWFyQm90dG9tKSB7XG4gICAgICAgIHZvaWQgcnVuTG9hZE1vcmUoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgc2Nyb2xsZXIuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBzY3JvbGxlci5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsIG9uU2Nyb2xsKTtcbiAgICB9O1xuICB9LCBbaGFzTW9yZSwgaW5maW5pdGVTY3JvbGwsIGxvYWRpbmcsIG9uU2VhcmNoUGFnZSwgb3BlbiwgcnVuTG9hZE1vcmVdKTtcblxuICBjb25zdCBzZWxlY3RPcHRpb24gPSAob3B0aW9uOiBSZW1vdGVTZWFyY2hPcHRpb24pID0+IHtcbiAgICBjb25zdCBuZXh0VmFsdWUgPSBTdHJpbmcob3B0aW9uLnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICBzZXRRdWVyeShuZXh0VmFsdWUpO1xuICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XG4gICAgc2V0TGFzdFNlYXJjaGVkVGVybShuZXh0VmFsdWUudG9Mb3dlckNhc2UoKSk7XG4gICAgc2V0T3BlbihmYWxzZSk7XG4gIH07XG5cbiAgY29uc3QgcXVlcnlLZXkgPSBxdWVyeS50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgY29uc3Qgc2hvd1NlYXJjaEljb24gPVxuICAgICFyZWFkT25seU1vZGUgJiZcbiAgICAhbG9hZGluZyAmJlxuICAgIGNhblNlYXJjaFRlcm0ocXVlcnkpICYmXG4gICAgcXVlcnlLZXkgIT09IGxhc3RTZWFyY2hlZFRlcm07XG5cbiAgY29uc3QgbGlzdElkID0gYCR7aWRCYXNlfS1vcHRpb25zYDtcbiAgY29uc3QgYWN0aXZlSWQgPSBvcGVuICYmIGZpbHRlcmVkW2FjdGl2ZUluZGV4XSA/IGAke2lkQmFzZX0tb3B0LSR7ZmlsdGVyZWRbYWN0aXZlSW5kZXhdLnZhbHVlfWAgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHNob3dMb2FkaW5nT25seVN0YXRlID0gbG9hZGluZyAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDA7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiIHJlZj17Y29udGFpbmVyUmVmfT5cbiAgICAgIHtzaG93TGFiZWwgPyAoXG4gICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb3JtLWxhYmVsIGZvbnQtc2VtaWJvbGRcIiBzdHlsZT17eyBjb2xvcjogXCIjMDAyOTZiZTBcIiB9fT5cbiAgICAgICAgICB7bGFiZWx9XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17Ym94UmVmfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIFwicmVsYXRpdmUgdy1mdWxsIHJvdW5kZWQteGwgYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIixcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXG4gICAgICAgICAgKX1cbiAgICAgICAgPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICBcInctZnVsbCByb3VuZGVkLXhsIGJvcmRlciBweC0zIHB5LTIgcHItMjAgdGV4dC1zbSBzbTp0ZXh0LWJhc2UgbGVhZGluZy01IGZvY3VzOm91dGxpbmUtaGlkZGVuIGZvY3VzOnJpbmctMiBkaXNhYmxlZDpiZy1zbGF0ZS0xMDAgZGlzYWJsZWQ6dGV4dC1zbGF0ZS01MDAgZGlzYWJsZWQ6Ym9yZGVyLXNsYXRlLTIwMCBkaXNhYmxlZDpjdXJzb3Itbm90LWFsbG93ZWRcIixcbiAgICAgICAgICAgICAgXCJib3JkZXItc2xhdGUtMjAwIGZvY3VzOnJpbmctcHJpbWFyeSBmb2N1czpib3JkZXItcHJpbWFyeVwiLFxuICAgICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IHZhbHVlQ29sb3IgfX1cbiAgICAgICAgICAgIHZhbHVlPXtxdWVyeX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dFZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICBzZXRRdWVyeShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICBvbkNoYW5nZShuZXh0VmFsdWUpO1xuICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpICE9PSBsYXN0U2VhcmNoZWRUZXJtKSB7XG4gICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICghcmVhZE9ubHlNb2RlICYmIGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+XG4gICAgICAgICAgICAgIGhhbmRsZUNvbWJvYm94S2V5RG93bihldmVudCwge1xuICAgICAgICAgICAgICAgIGlzT3Blbjogb3BlbixcbiAgICAgICAgICAgICAgICBzZXRPcGVuLFxuICAgICAgICAgICAgICAgIG9wdGlvbkNvdW50OiBmaWx0ZXJlZC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgsXG4gICAgICAgICAgICAgICAgb25FbnRlcldoZW5PcGVuOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbYWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uRW50ZXJXaGVuQ2xvc2VkOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb3Blbk9uQXJyb3c6IHRydWUsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cbiAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPXtvcGVufVxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cbiAgICAgICAgICAvPlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwci0yXCI+XG4gICAgICAgICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcHgtMS41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICApIDogbnVsbH1cblxuICAgICAgICAgICAge3Nob3dTZWFyY2hJY29uID8gKFxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS01MDBcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX1NlYXJjaFwiLCBcIlNlYXJjaFwiKX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17cmVhZE9ubHlNb2RlfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTUuNzUgMTUuNzUtMi40ODktMi40ODltMCAwYTMuMzc1IDMuMzc1IDAgMSAwLTQuNzczLTQuNzczIDMuMzc1IDMuMzc1IDAgMCAwIDQuNzc0IDQuNzc0Wk0yMSAxMmE5IDkgMCAxIDEtMTggMCA5IDkgMCAwIDEgMTggMFpcIiAvPlxuICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTUwMCBob3Zlcjp0ZXh0LXNsYXRlLTYwMFwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVhZE9ubHlNb2RlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXF1ZXJ5LnRyaW0oKSAmJiBsb2FkT25PcGVuKSB7XG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxGbG9hdGluZ0xpc3RcbiAgICAgICAgICBhbmNob3JSZWY9e2JveFJlZn1cbiAgICAgICAgICBvcGVuPXtvcGVufVxuICAgICAgICAgIHpJbmRleD17MzYwMDAwfVxuICAgICAgICAgIG1heEhlaWdodENsYXNzPVwibWF4LWgtNzJcIlxuICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcbiAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLXhsXCJcbiAgICAgICAgICBwYW5lbENsYXNzTmFtZT17cGFuZWxDbGFzc05hbWV9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGlkPXtsaXN0SWR9IHJlZj17bGlzdFJlZn0+XG4gICAgICAgICAgICB7c2hvd0xvYWRpbmdPbmx5U3RhdGUgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L2Rpdj5cbiAgICAgICAgICAgICkgOiBmaWx0ZXJlZC5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Ob0RhdGFcIiwgXCJObyBkYXRhXCIpfTwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7ZmlsdGVyZWQubWFwKChvcHRpb24sIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGluZGV4ID09PSBhY3RpdmVJbmRleDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbklkID0gb3B0aW9uLnZhbHVlIHx8IGAke2luZGV4fWA7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtvcHRpb25JZH1cbiAgICAgICAgICAgICAgICAgICAgICBpZD17YCR7aWRCYXNlfS1vcHQtJHtvcHRpb25JZH1gfVxuICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJvcHRpb25cIlxuICAgICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2lzQWN0aXZlfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVsYXRpdmUgZmxleCB3LWZ1bGwgY3Vyc29yLWRlZmF1bHQgc2VsZWN0LW5vbmUgaXRlbXMtc3RhcnQgcHktMiBweC0zIHRleHQtbGVmdCB0ZXh0LXNtXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIG9uTW91c2VFbnRlcj17KCkgPT4gc2V0QWN0aXZlSW5kZXgoaW5kZXgpfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHRpb24pfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj57b3B0aW9uLnRpdGxlIHx8IG9wdGlvbi52YWx1ZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uLnN1YnRpdGxlID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXCJ0ZXh0LXhzXCIsIGlzQWN0aXZlID8gXCJ0ZXh0LXdoaXRlLzkwXCIgOiBcInRleHQtc2xhdGUtNTAwXCIpfT57b3B0aW9uLnN1YnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIHtsb2FkaW5nID8gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBib3JkZXItdCBib3JkZXItc2xhdGUtMTAwXCI+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9GbG9hdGluZ0xpc3Q+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFJlbW90ZVNlYXJjaENvbWJvYm94O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBeUU7QUF5UWpFO0FBbE9SLElBQU0sZ0JBQWdCLENBQUMsVUFBc0Q7QUFDM0UsUUFBTSxNQUFNLG9CQUFJLElBQWdDO0FBQ2hELGFBQVcsUUFBUSxTQUFTLENBQUMsR0FBRztBQUM5QixVQUFNLE1BQU0sT0FBTyxLQUFLLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDMUMsUUFBSSxDQUFDLElBQUs7QUFDVixRQUFJLElBQUksSUFBSSxHQUFHLEVBQUc7QUFDbEIsUUFBSSxJQUFJLEtBQUs7QUFBQSxNQUNYLE9BQU87QUFBQSxNQUNQLE9BQU8sT0FBTyxLQUFLLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFBQSxNQUNyQyxVQUFVLE9BQU8sS0FBSyxZQUFZLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDN0MsQ0FBQztBQUFBLEVBQ0g7QUFDQSxTQUFPLE1BQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQztBQUNoQztBQUdBLElBQU0sdUJBQXVCLENBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsRUFDbEIsV0FBVztBQUFBLEVBQ1gsbUJBQW1CO0FBQUEsRUFDbkIsYUFBYTtBQUFBLEVBQ2IsaUJBQWlCO0FBQUEsRUFDakIsV0FBVztBQUFBLEVBQ1gsV0FBVztBQUFBLEVBQ1gsWUFBWTtBQUFBLEVBQ1osaUJBQWlCO0FB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
