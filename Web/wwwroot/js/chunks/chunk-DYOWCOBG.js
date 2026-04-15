import {
  handleComboboxKeyDown
} from "./chunk-YMDESVRK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-OSBLOXTE.js";
import {
  Spinner_default,
  classNames
} from "./chunk-ZHH4AWW7.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  indT
} from "./chunk-5TAE4PEJ.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

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
            "relative w-full rounded-[var(--radius-xl)] bg-white text-left focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-white sm:text-sm",
            readOnlyMode ? "ind-readonly-field" : ""
          ),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                className: classNames(
                  "w-full rounded-[var(--radius-xl)] border px-3 py-2 pr-20 text-sm sm:text-base leading-5 focus:outline-hidden focus:ring-2 disabled:bg-slate-100 disabled:text-slate-500 disabled:border-slate-200 disabled:cursor-not-allowed",
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
          roundedClass: "rounded-[var(--radius-xl)]",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMudHN4XCI7XHJcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbiAgc3VidGl0bGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFJlbW90ZVNlYXJjaENvbWJvYm94UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uU2VhcmNoOiAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPjtcclxuICBvblNlYXJjaFBhZ2U/OiAoXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBwYWdlOiBudW1iZXIsXHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxyXG4gICAgc2lnbmFsOiBBYm9ydFNpZ25hbFxyXG4gICkgPT4gUHJvbWlzZTx7IGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXTsgdG90YWw/OiBudW1iZXIgfT47XHJcbiAgaWRCYXNlOiBzdHJpbmc7XHJcbiAgbWluU2VhcmNoTGVuZ3RoPzogbnVtYmVyO1xyXG4gIHBhZ2VTaXplPzogbnVtYmVyO1xyXG4gIGFsbG93RW1wdHlTZWFyY2g/OiBib29sZWFuO1xyXG4gIGxvYWRPbk9wZW4/OiBib29sZWFuO1xyXG4gIGluZmluaXRlU2Nyb2xsPzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIHNob3dMYWJlbD86IGJvb2xlYW47XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCB1bmlxdWVCeVZhbHVlID0gKGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXSk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcclxuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgUmVtb3RlU2VhcmNoT3B0aW9uPigpO1xyXG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcyB8fCBbXSkge1xyXG4gICAgY29uc3Qga2V5ID0gU3RyaW5nKGl0ZW0udmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgaWYgKCFrZXkpIGNvbnRpbnVlO1xyXG4gICAgaWYgKG1hcC5oYXMoa2V5KSkgY29udGludWU7XHJcbiAgICBtYXAuc2V0KGtleSwge1xyXG4gICAgICB2YWx1ZToga2V5LFxyXG4gICAgICB0aXRsZTogU3RyaW5nKGl0ZW0udGl0bGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICBzdWJ0aXRsZTogU3RyaW5nKGl0ZW0uc3VidGl0bGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBBcnJheS5mcm9tKG1hcC52YWx1ZXMoKSk7XHJcbn07XHJcblxyXG4vLyBHZW5lcmljIHJlbW90ZS1zZWFyY2ggY29tYm9ib3ggdGhhdCBzdXBwb3J0cyBtYW51YWwgc2VhcmNoIGFuZCBvcHRpb25hbCBwYWdlZCBsb2FkaW5nIG9uIG9wZW4uXHJcbmNvbnN0IFJlbW90ZVNlYXJjaENvbWJvYm94ID0gKHtcclxuICBsYWJlbCxcclxuICBwbGFjZWhvbGRlcixcclxuICB2YWx1ZSxcclxuICBvbkNoYW5nZSxcclxuICBvblNlYXJjaCxcclxuICBvblNlYXJjaFBhZ2UsXHJcbiAgaWRCYXNlLFxyXG4gIG1pblNlYXJjaExlbmd0aCA9IDIsXHJcbiAgcGFnZVNpemUgPSAyMCxcclxuICBhbGxvd0VtcHR5U2VhcmNoID0gZmFsc2UsXHJcbiAgbG9hZE9uT3BlbiA9IGZhbHNlLFxyXG4gIGluZmluaXRlU2Nyb2xsID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICByZWFkT25seSA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbiAgcGFuZWxDbGFzc05hbWUgPSBcInZpc2l0YXMtdHlwb2dyYXBoeVwiLFxyXG59OiBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzKSA9PiB7XHJcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XHJcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcclxuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbbGFzdFNlYXJjaGVkVGVybSwgc2V0TGFzdFNlYXJjaGVkVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtoYXNNb3JlLCBzZXRIYXNNb3JlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd05vdEZvdW5kU3RhdGUsIHNldFNob3dOb3RGb3VuZFN0YXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG5cclxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcXVlcnkgPSB2YWx1ZSB8fCBcIlwiO1xyXG5cclxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKCFxdWVyeS50cmltKCkpIHJldHVybiBvcHRpb25zO1xyXG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgY29uc3QgdmFsdWVUZXh0ID0gb3B0aW9uLnZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24udGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgY29uc3Qgc3VidGl0bGVUZXh0ID0gU3RyaW5nKG9wdGlvbi5zdWJ0aXRsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICByZXR1cm4gdmFsdWVUZXh0LmluY2x1ZGVzKHEpIHx8IHRpdGxlVGV4dC5pbmNsdWRlcyhxKSB8fCBzdWJ0aXRsZVRleHQuaW5jbHVkZXMocSk7XHJcbiAgICB9KTtcclxuICB9LCBbb3B0aW9ucywgcXVlcnldKTtcclxuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cclxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcclxuXHJcbiAgY29uc3QgY2FuU2VhcmNoVGVybSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRlcm06IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICBjb25zdCB0cmltbWVkID0gdGVybS50cmltKCk7XHJcbiAgICAgIGlmICghdHJpbW1lZCkgcmV0dXJuIGFsbG93RW1wdHlTZWFyY2g7XHJcbiAgICAgIHJldHVybiB0cmltbWVkLmxlbmd0aCA+PSBtaW5TZWFyY2hMZW5ndGg7XHJcbiAgICB9LFxyXG4gICAgW2FsbG93RW1wdHlTZWFyY2gsIG1pblNlYXJjaExlbmd0aF1cclxuICApO1xyXG5cclxuICBjb25zdCBleGVjdXRlU2VhcmNoID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIGFwcGVuZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50Py5hYm9ydCgpO1xyXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAob25TZWFyY2hQYWdlKSB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9uU2VhcmNoUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgY29udHJvbGxlci5zaWduYWwpO1xyXG4gICAgICAgICAgY29uc3QgcGFnZUl0ZW1zID0gdW5pcXVlQnlWYWx1ZShBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5pdGVtcykgPyByZXNwb25zZS5pdGVtcyA6IFtdKTtcclxuICAgICAgICAgIGlmICghYXBwZW5kICYmIHBhZ2VJdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDApO1xyXG4gICAgICAgICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcclxuICAgICAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcclxuICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0T3B0aW9ucygocHJldmlvdXMpID0+IChhcHBlbmQgPyB1bmlxdWVCeVZhbHVlKFsuLi4ocHJldmlvdXMgfHwgW10pLCAuLi5wYWdlSXRlbXNdKSA6IHBhZ2VJdGVtcykpO1xyXG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcbiAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgYXBpVG90YWwgPSBOdW1iZXIocmVzcG9uc2U/LnRvdGFsKTtcclxuICAgICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoYXBpVG90YWwpICYmIGFwaVRvdGFsID4gMCkge1xyXG4gICAgICAgICAgICBzZXRIYXNNb3JlKHBhZ2UgKiBwYWdlU2l6ZSA8IGFwaVRvdGFsKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEhhc01vcmUocGFnZUl0ZW1zLmxlbmd0aCA+PSBwYWdlU2l6ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb25TZWFyY2godGVybSwgY29udHJvbGxlci5zaWduYWwpO1xyXG4gICAgICAgICAgY29uc3QgbmV4dCA9IHVuaXF1ZUJ5VmFsdWUocmVzcG9uc2UgfHwgW10pO1xyXG4gICAgICAgICAgaWYgKCFhcHBlbmQgJiYgbmV4dC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDApO1xyXG4gICAgICAgICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcclxuICAgICAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcclxuICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0T3B0aW9ucyhuZXh0KTtcclxuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDEpO1xyXG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XHJcbiAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKHRlcm1LZXkpO1xyXG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIGlmICghYXBwZW5kKSB7XHJcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDApO1xyXG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgaWYgKGFib3J0UmVmLmN1cnJlbnQgPT09IGNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtvblNlYXJjaCwgb25TZWFyY2hQYWdlLCBwYWdlU2l6ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBydW5TZWFyY2ggPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAocmVhZE9ubHlNb2RlIHx8IGxvYWRpbmcpIHJldHVybjtcclxuICAgIGNvbnN0IHRlcm0gPSBxdWVyeS50cmltKCk7XHJcbiAgICBjb25zdCB0ZXJtS2V5ID0gdGVybS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIGlmICghY2FuU2VhcmNoVGVybSh0ZXJtKSkge1xyXG4gICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgc2V0Q3VycmVudFBhZ2UoMCk7XHJcbiAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKFwiXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRlcm1LZXkgPT09IGxhc3RTZWFyY2hlZFRlcm0gJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmICFvblNlYXJjaFBhZ2UpIHtcclxuICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IGV4ZWN1dGVTZWFyY2godGVybSwgMSwgZmFsc2UpO1xyXG4gIH0sIFtjYW5TZWFyY2hUZXJtLCBleGVjdXRlU2VhcmNoLCBsYXN0U2VhcmNoZWRUZXJtLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIG9wdGlvbnMubGVuZ3RoLCBxdWVyeSwgcmVhZE9ubHlNb2RlXSk7XHJcblxyXG4gIGNvbnN0IHJ1bkxvYWRNb3JlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKHJlYWRPbmx5TW9kZSB8fCBsb2FkaW5nIHx8ICFvblNlYXJjaFBhZ2UgfHwgIWluZmluaXRlU2Nyb2xsIHx8ICFoYXNNb3JlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0ZXJtID0gcXVlcnkudHJpbSgpO1xyXG4gICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICh0ZXJtS2V5ICE9PSBsYXN0U2VhcmNoZWRUZXJtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXh0UGFnZSA9IGN1cnJlbnRQYWdlICsgMTtcclxuICAgIGlmIChuZXh0UGFnZSA8PSAxKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBleGVjdXRlU2VhcmNoKHRlcm0sIG5leHRQYWdlLCB0cnVlKTtcclxuICB9LCBbY3VycmVudFBhZ2UsIGV4ZWN1dGVTZWFyY2gsIGhhc01vcmUsIGluZmluaXRlU2Nyb2xsLCBsYXN0U2VhcmNoZWRUZXJtLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIHF1ZXJ5LCByZWFkT25seU1vZGVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghb3BlbiB8fCAhb25TZWFyY2hQYWdlIHx8ICFpbmZpbml0ZVNjcm9sbCkgcmV0dXJuO1xyXG4gICAgY29uc3Qgc2Nyb2xsZXIgPSBsaXN0UmVmLmN1cnJlbnQ/LnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAoIXNjcm9sbGVyKSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChsb2FkaW5nIHx8ICFoYXNNb3JlKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHRocmVzaG9sZCA9IDQwO1xyXG4gICAgICBjb25zdCBpc05lYXJCb3R0b20gPSBzY3JvbGxlci5zY3JvbGxUb3AgKyBzY3JvbGxlci5jbGllbnRIZWlnaHQgPj0gc2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0IC0gdGhyZXNob2xkO1xyXG4gICAgICBpZiAoaXNOZWFyQm90dG9tKSB7XHJcbiAgICAgICAgdm9pZCBydW5Mb2FkTW9yZSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHNjcm9sbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzTW9yZSwgaW5maW5pdGVTY3JvbGwsIGxvYWRpbmcsIG9uU2VhcmNoUGFnZSwgb3BlbiwgcnVuTG9hZE1vcmVdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdGlvbjogUmVtb3RlU2VhcmNoT3B0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBuZXh0VmFsdWUgPSBTdHJpbmcob3B0aW9uLnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XHJcbiAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKG5leHRWYWx1ZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHF1ZXJ5S2V5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3Qgc2hvd1NlYXJjaEljb24gPVxyXG4gICAgIXJlYWRPbmx5TW9kZSAmJlxyXG4gICAgIWxvYWRpbmcgJiZcclxuICAgIGNhblNlYXJjaFRlcm0ocXVlcnkpICYmXHJcbiAgICBxdWVyeUtleSAhPT0gbGFzdFNlYXJjaGVkVGVybTtcclxuXHJcbiAgY29uc3QgbGlzdElkID0gYCR7aWRCYXNlfS1vcHRpb25zYDtcclxuICBjb25zdCBhY3RpdmVJZCA9XHJcbiAgICBvcGVuICYmIGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8gYCR7aWRCYXNlfS1vcHQtJHtmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xyXG4gIGNvbnN0IHNob3dMb2FkaW5nT25seVN0YXRlID0gbG9hZGluZyAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDA7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiIHJlZj17Y29udGFpbmVyUmVmfT5cclxuICAgICAge3Nob3dMYWJlbCA/IChcclxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XHJcbiAgICAgICAgICB7bGFiZWx9XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICByZWY9e2JveFJlZn1cclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgXCJyZWxhdGl2ZSB3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYmctd2hpdGUgdGV4dC1sZWZ0IGZvY3VzLXdpdGhpbjpib3JkZXItcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy0yIGZvY3VzLXdpdGhpbjpyaW5nLXByaW1hcnkgZm9jdXMtd2l0aGluOnJpbmctb2Zmc2V0LXdoaXRlIHNtOnRleHQtc21cIixcbiAgICAgICAgICAgIHJlYWRPbmx5TW9kZSA/IFwiaW5kLXJlYWRvbmx5LWZpZWxkXCIgOiBcIlwiXHJcbiAgICAgICAgICApfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXHJcbiAgICAgICAgICAgICAgXCJ3LWZ1bGwgcm91bmRlZC1bdmFyKC0tcmFkaXVzLXhsKV0gYm9yZGVyIHB4LTMgcHktMiBwci0yMCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGRpc2FibGVkOmJnLXNsYXRlLTEwMCBkaXNhYmxlZDp0ZXh0LXNsYXRlLTUwMCBkaXNhYmxlZDpib3JkZXItc2xhdGUtMjAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiLFxuICAgICAgICAgICAgICBcImJvcmRlci1zbGF0ZS0yMDAgZm9jdXM6cmluZy1wcmltYXJ5IGZvY3VzOmJvcmRlci1wcmltYXJ5XCIsXHJcbiAgICAgICAgICAgICAgcmVhZE9ubHlNb2RlID8gXCJpbmQtcmVhZG9ubHktZmllbGRcIiA6IFwidGV4dC1zbGF0ZS05MDBcIlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogdmFsdWVDb2xvciB9fVxyXG4gICAgICAgICAgICB2YWx1ZT17cXVlcnl9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBuZXh0VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgoMCk7XHJcbiAgICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgaWYgKG5leHRWYWx1ZS50cmltKCkudG9Mb3dlckNhc2UoKSAhPT0gbGFzdFNlYXJjaGVkVGVybSkge1xyXG4gICAgICAgICAgICAgICAgc2V0T3BlbihmYWxzZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBvbkZvY3VzPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKCFyZWFkT25seU1vZGUgJiYgKGZpbHRlcmVkLmxlbmd0aCA+IDAgfHwgc2hvd05vdEZvdW5kU3RhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgb25LZXlEb3duPXsoZXZlbnQpID0+XHJcbiAgICAgICAgICAgICAgaGFuZGxlQ29tYm9ib3hLZXlEb3duKGV2ZW50LCB7XHJcbiAgICAgICAgICAgICAgICBpc09wZW46IG9wZW4sXHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuLFxyXG4gICAgICAgICAgICAgICAgb3B0aW9uQ291bnQ6IGZpbHRlcmVkLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIHNldEFjdGl2ZUluZGV4LFxyXG4gICAgICAgICAgICAgICAgb25FbnRlcldoZW5PcGVuOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0T3B0aW9uKGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8/IGZpbHRlcmVkWzBdKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBvbkVudGVyV2hlbkNsb3NlZDogKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9wZW5PbkFycm93OiB0cnVlLFxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3BsYWNlaG9sZGVyfVxyXG4gICAgICAgICAgICByZWFkT25seT17cmVhZE9ubHl9XHJcbiAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cclxuICAgICAgICAgICAgYXJpYS1sYWJlbD17bGFiZWx9XHJcbiAgICAgICAgICAgIHJvbGU9XCJjb21ib2JveFwiXHJcbiAgICAgICAgICAgIGFyaWEtZXhwYW5kZWQ9e29wZW59XHJcbiAgICAgICAgICAgIGFyaWEtY29udHJvbHM9e2xpc3RJZH1cclxuICAgICAgICAgICAgYXJpYS1hY3RpdmVkZXNjZW5kYW50PXthY3RpdmVJZH1cclxuICAgICAgICAgIC8+XHJcblxyXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgcmlnaHQtMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBwci0yXCI+XHJcbiAgICAgICAgICAgIHtsb2FkaW5nID8gKFxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHB4LTEuNVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxyXG4gICAgICAgICAgICAgICAgPFNwaW5uZXIgc2l6ZT1cImgtNCB3LTRcIiAvPlxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgICB7c2hvd1NlYXJjaEljb24gPyAoXHJcbiAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBwLTEuNSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTUwMFwiXHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aW5kVChcIkNvbW1vbl9TZWFyY2hcIiwgXCJTZWFyY2hcIil9XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17cmVhZE9ubHlNb2RlfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGZpbGw9XCJub25lXCIgdmlld0JveD1cIjAgMCAyNCAyNFwiIHN0cm9rZVdpZHRoPXsxLjV9IHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIGNsYXNzTmFtZT1cImgtNSB3LTVcIj5cclxuICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIGQ9XCJtMTUuNzUgMTUuNzUtMi40ODktMi40ODltMCAwYTMuMzc1IDMuMzc1IDAgMSAwLTQuNzczLTQuNzczIDMuMzc1IDMuMzc1IDAgMCAwIDQuNzc0IDQuNzc0Wk0yMSAxMmE5IDkgMCAxIDEtMTggMCA5IDkgMCAwIDEgMTggMFpcIiAvPlxyXG4gICAgICAgICAgICAgICAgPC9zdmc+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtc2xhdGUtNjAwXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVhZE9ubHlNb2RlKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBpZiAob3Blbikge1xyXG4gICAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICghcXVlcnkudHJpbSgpICYmIGxvYWRPbk9wZW4pIHtcclxuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e29wZW4gPyBpbmRUKFwiRHJvcGRvd25fSGlkZU9wdGlvbnNcIiwgXCJIaWRlIG9wdGlvbnNcIikgOiBpbmRUKFwiRHJvcGRvd25fU2hvd09wdGlvbnNcIiwgXCJTaG93IG9wdGlvbnNcIil9XHJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e3JlYWRPbmx5TW9kZX1cclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtvcGVuID8gPENoZXZyb25VcFN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz4gOiA8Q2hldnJvbkRvd25TdmcgY2xhc3NOYW1lPVwiaC01IHctNVwiIC8+fVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxGbG9hdGluZ0xpc3RcclxuICAgICAgICAgIGFuY2hvclJlZj17Ym94UmVmfVxyXG4gICAgICAgICAgb3Blbj17b3Blbn1cclxuICAgICAgICAgIHpJbmRleD17MzYwMDAwfVxyXG4gICAgICAgICAgbWF4SGVpZ2h0Q2xhc3M9XCJtYXgtaC03MlwiXHJcbiAgICAgICAgICByb2xlPVwibGlzdGJveFwiXHJcbiAgICAgICAgICByb3VuZGVkQ2xhc3M9XCJyb3VuZGVkLVt2YXIoLS1yYWRpdXMteGwpXVwiXG4gICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgaWQ9e2xpc3RJZH0gcmVmPXtsaXN0UmVmfT5cclxuICAgICAgICAgICAge3Nob3dMb2FkaW5nT25seVN0YXRlID8gKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L2Rpdj5cclxuICAgICAgICAgICAgKSA6IHNob3dOb3RGb3VuZFN0YXRlID8gKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKX08L2Rpdj5cclxuICAgICAgICAgICAgKSA6IGZpbHRlcmVkLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX08L2Rpdj5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAge2ZpbHRlcmVkLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGluZGV4ID09PSByZXNvbHZlZEFjdGl2ZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25JZCA9IG9wdGlvbi52YWx1ZSB8fCBgJHtpbmRleH1gO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtvcHRpb25JZH1cclxuICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtpZEJhc2V9LW9wdC0ke29wdGlvbklkfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2lzQWN0aXZlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGluZGV4KX1cclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHRpb24pfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj57b3B0aW9uLnRpdGxlIHx8IG9wdGlvbi52YWx1ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24uc3VidGl0bGUgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwidGV4dC14c1wiLCBpc0FjdGl2ZSA/IFwidGV4dC13aGl0ZS85MFwiIDogXCJ0ZXh0LXNsYXRlLTUwMFwiKX0+e29wdGlvbi5zdWJ0aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICB7bG9hZGluZyA/IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBib3JkZXItdCBib3JkZXItc2xhdGUtMTAwXCI+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvRmxvYXRpbmdMaXN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZW1vdGVTZWFyY2hDb21ib2JveDtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUF5RTtBQStSakU7QUF4UFIsSUFBTSxnQkFBZ0IsQ0FBQyxVQUFzRDtBQUMzRSxRQUFNLE1BQU0sb0JBQUksSUFBZ0M7QUFDaEQsYUFBVyxRQUFRLFNBQVMsQ0FBQyxHQUFHO0FBQzlCLFVBQU0sTUFBTSxPQUFPLEtBQUssU0FBUyxFQUFFLEVBQUUsS0FBSztBQUMxQyxRQUFJLENBQUMsSUFBSztBQUNWLFFBQUksSUFBSSxJQUFJLEdBQUcsRUFBRztBQUNsQixRQUFJLElBQUksS0FBSztBQUFBLE1BQ1gsT0FBTztBQUFBLE1BQ1AsT0FBTyxPQUFPLEtBQUssU0FBUyxFQUFFLEVBQUUsS0FBSztBQUFBLE1BQ3JDLFVBQVUsT0FBTyxLQUFLLFlBQVksRUFBRSxFQUFFLEtBQUs7QUFBQSxJQUM3QyxDQUFDO0FBQUEsRUFDSDtBQUNBLFNBQU8sTUFBTSxLQUFLLElBQUksT0FBTyxDQUFDO0FBQ2hDO0FBR0EsSUFBTSx1QkFBdUIsQ0FBQztBQUFBLEVBQzVCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNB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
