import {
  handleComboboxKeyDown
} from "./chunk-YMDESVRK.js";
import {
  ChevronDownSvg,
  ChevronUpSvg,
  FloatingList_default,
  useOutsideClick
} from "./chunk-EXQAFLFO.js";
import {
  Spinner_default,
  classNames,
  indT
} from "./chunk-BZRAWDAK.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBGbG9hdGluZ0xpc3QgZnJvbSBcIi4vRmxvYXRpbmdMaXN0LnRzeFwiO1xyXG5pbXBvcnQgU3Bpbm5lciBmcm9tIFwiLi9TcGlubmVyLnRzeFwiO1xyXG5pbXBvcnQgeyBDaGV2cm9uRG93blN2ZywgQ2hldnJvblVwU3ZnIH0gZnJvbSBcIi4vY2hldnJvbnMudHN4XCI7XHJcbmltcG9ydCB7IGhhbmRsZUNvbWJvYm94S2V5RG93biB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VDb21ib2JveEtleWJvYXJkLnRzXCI7XHJcbmltcG9ydCB7IHVzZU91dHNpZGVDbGljayB9IGZyb20gXCIuLi8uLi9ob29rcy91c2VPdXRzaWRlQ2xpY2sudHNcIjtcclxuaW1wb3J0IHsgY2xhc3NOYW1lcyB9IGZyb20gXCIuLi8uLi91dGlscy9jbGFzc05hbWVzLnRzXCI7XHJcbmltcG9ydCB7IGluZFQgfSBmcm9tIFwiLi4vLi4vdXRpbHMvaW5kSTE4bi50c1wiO1xyXG5cclxuZXhwb3J0IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uID0ge1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgdGl0bGU/OiBzdHJpbmc7XHJcbiAgc3VidGl0bGU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG50eXBlIFJlbW90ZVNlYXJjaENvbWJvYm94UHJvcHMgPSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xyXG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIG9uU2VhcmNoOiAodGVybTogc3RyaW5nLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPjtcclxuICBvblNlYXJjaFBhZ2U/OiAoXHJcbiAgICB0ZXJtOiBzdHJpbmcsXHJcbiAgICBwYWdlOiBudW1iZXIsXHJcbiAgICBwYWdlU2l6ZTogbnVtYmVyLFxyXG4gICAgc2lnbmFsOiBBYm9ydFNpZ25hbFxyXG4gICkgPT4gUHJvbWlzZTx7IGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXTsgdG90YWw/OiBudW1iZXIgfT47XHJcbiAgaWRCYXNlOiBzdHJpbmc7XHJcbiAgbWluU2VhcmNoTGVuZ3RoPzogbnVtYmVyO1xyXG4gIHBhZ2VTaXplPzogbnVtYmVyO1xyXG4gIGFsbG93RW1wdHlTZWFyY2g/OiBib29sZWFuO1xyXG4gIGxvYWRPbk9wZW4/OiBib29sZWFuO1xyXG4gIGluZmluaXRlU2Nyb2xsPzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgcmVhZE9ubHk/OiBib29sZWFuO1xyXG4gIHNob3dMYWJlbD86IGJvb2xlYW47XHJcbiAgcGFuZWxDbGFzc05hbWU/OiBzdHJpbmc7XHJcbn07XHJcblxyXG5jb25zdCB1bmlxdWVCeVZhbHVlID0gKGl0ZW1zOiBSZW1vdGVTZWFyY2hPcHRpb25bXSk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcclxuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgUmVtb3RlU2VhcmNoT3B0aW9uPigpO1xyXG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcyB8fCBbXSkge1xyXG4gICAgY29uc3Qga2V5ID0gU3RyaW5nKGl0ZW0udmFsdWUgfHwgXCJcIikudHJpbSgpO1xyXG4gICAgaWYgKCFrZXkpIGNvbnRpbnVlO1xyXG4gICAgaWYgKG1hcC5oYXMoa2V5KSkgY29udGludWU7XHJcbiAgICBtYXAuc2V0KGtleSwge1xyXG4gICAgICB2YWx1ZToga2V5LFxyXG4gICAgICB0aXRsZTogU3RyaW5nKGl0ZW0udGl0bGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgICBzdWJ0aXRsZTogU3RyaW5nKGl0ZW0uc3VidGl0bGUgfHwgXCJcIikudHJpbSgpLFxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIHJldHVybiBBcnJheS5mcm9tKG1hcC52YWx1ZXMoKSk7XHJcbn07XHJcblxyXG4vLyBHZW5lcmljIHJlbW90ZS1zZWFyY2ggY29tYm9ib3ggdGhhdCBzdXBwb3J0cyBtYW51YWwgc2VhcmNoIGFuZCBvcHRpb25hbCBwYWdlZCBsb2FkaW5nIG9uIG9wZW4uXHJcbmNvbnN0IFJlbW90ZVNlYXJjaENvbWJvYm94ID0gKHtcclxuICBsYWJlbCxcclxuICBwbGFjZWhvbGRlcixcclxuICB2YWx1ZSxcclxuICBvbkNoYW5nZSxcclxuICBvblNlYXJjaCxcclxuICBvblNlYXJjaFBhZ2UsXHJcbiAgaWRCYXNlLFxyXG4gIG1pblNlYXJjaExlbmd0aCA9IDIsXHJcbiAgcGFnZVNpemUgPSAyMCxcclxuICBhbGxvd0VtcHR5U2VhcmNoID0gZmFsc2UsXHJcbiAgbG9hZE9uT3BlbiA9IGZhbHNlLFxyXG4gIGluZmluaXRlU2Nyb2xsID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICByZWFkT25seSA9IGZhbHNlLFxyXG4gIHNob3dMYWJlbCA9IHRydWUsXHJcbiAgcGFuZWxDbGFzc05hbWUgPSBcInZpc2l0YXMtdHlwb2dyYXBoeVwiLFxyXG59OiBSZW1vdGVTZWFyY2hDb21ib2JveFByb3BzKSA9PiB7XHJcbiAgY29uc3QgcmVhZE9ubHlNb2RlID0gcmVhZE9ubHkgfHwgZGlzYWJsZWQ7XHJcbiAgY29uc3QgdmFsdWVDb2xvciA9IHJlYWRPbmx5TW9kZSA/IFwiIzY0NzQ4YlwiIDogXCIjMDAyOTZiZTBcIjtcclxuICBjb25zdCBbb3B0aW9ucywgc2V0T3B0aW9uc10gPSB1c2VTdGF0ZTxSZW1vdGVTZWFyY2hPcHRpb25bXT4oW10pO1xyXG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XHJcbiAgY29uc3QgW2FjdGl2ZUluZGV4LCBzZXRBY3RpdmVJbmRleF0gPSB1c2VTdGF0ZSgwKTtcclxuICBjb25zdCBbbGFzdFNlYXJjaGVkVGVybSwgc2V0TGFzdFNlYXJjaGVkVGVybV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbY3VycmVudFBhZ2UsIHNldEN1cnJlbnRQYWdlXSA9IHVzZVN0YXRlKDApO1xyXG4gIGNvbnN0IFtoYXNNb3JlLCBzZXRIYXNNb3JlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBbc2hvd05vdEZvdW5kU3RhdGUsIHNldFNob3dOb3RGb3VuZFN0YXRlXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuXHJcbiAgY29uc3QgYWJvcnRSZWYgPSB1c2VSZWY8QWJvcnRDb250cm9sbGVyIHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgY29udGFpbmVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgYm94UmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XHJcbiAgY29uc3QgbGlzdFJlZiA9IHVzZVJlZjxIVE1MRGl2RWxlbWVudCB8IG51bGw+KG51bGwpO1xyXG5cclxuICB1c2VPdXRzaWRlQ2xpY2soW2NvbnRhaW5lclJlZiwgbGlzdFJlZl0sICgpID0+IHtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gIH0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudD8uYWJvcnQoKTtcclxuICAgICAgYWJvcnRSZWYuY3VycmVudCA9IG51bGw7XHJcbiAgICB9O1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3QgcXVlcnkgPSB2YWx1ZSB8fCBcIlwiO1xyXG5cclxuICBjb25zdCBmaWx0ZXJlZCA9IHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgaWYgKCFxdWVyeS50cmltKCkpIHJldHVybiBvcHRpb25zO1xyXG4gICAgY29uc3QgcSA9IHF1ZXJ5LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgcmV0dXJuIG9wdGlvbnMuZmlsdGVyKChvcHRpb24pID0+IHtcclxuICAgICAgY29uc3QgdmFsdWVUZXh0ID0gb3B0aW9uLnZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGNvbnN0IHRpdGxlVGV4dCA9IFN0cmluZyhvcHRpb24udGl0bGUgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgY29uc3Qgc3VidGl0bGVUZXh0ID0gU3RyaW5nKG9wdGlvbi5zdWJ0aXRsZSB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICByZXR1cm4gdmFsdWVUZXh0LmluY2x1ZGVzKHEpIHx8IHRpdGxlVGV4dC5pbmNsdWRlcyhxKSB8fCBzdWJ0aXRsZVRleHQuaW5jbHVkZXMocSk7XHJcbiAgICB9KTtcclxuICB9LCBbb3B0aW9ucywgcXVlcnldKTtcclxuICBjb25zdCByZXNvbHZlZEFjdGl2ZUluZGV4ID1cclxuICAgIGZpbHRlcmVkLmxlbmd0aCA+IDAgPyBNYXRoLm1pbihNYXRoLm1heChhY3RpdmVJbmRleCwgMCksIGZpbHRlcmVkLmxlbmd0aCAtIDEpIDogMDtcclxuXHJcbiAgY29uc3QgY2FuU2VhcmNoVGVybSA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKHRlcm06IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xyXG4gICAgICBjb25zdCB0cmltbWVkID0gdGVybS50cmltKCk7XHJcbiAgICAgIGlmICghdHJpbW1lZCkgcmV0dXJuIGFsbG93RW1wdHlTZWFyY2g7XHJcbiAgICAgIHJldHVybiB0cmltbWVkLmxlbmd0aCA+PSBtaW5TZWFyY2hMZW5ndGg7XHJcbiAgICB9LFxyXG4gICAgW2FsbG93RW1wdHlTZWFyY2gsIG1pblNlYXJjaExlbmd0aF1cclxuICApO1xyXG5cclxuICBjb25zdCBleGVjdXRlU2VhcmNoID0gdXNlQ2FsbGJhY2soXHJcbiAgICBhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIGFwcGVuZDogYm9vbGVhbikgPT4ge1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50Py5hYm9ydCgpO1xyXG4gICAgICBjb25zdCBjb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xyXG4gICAgICBhYm9ydFJlZi5jdXJyZW50ID0gY29udHJvbGxlcjtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBpZiAob25TZWFyY2hQYWdlKSB7XHJcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG9uU2VhcmNoUGFnZSh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwgY29udHJvbGxlci5zaWduYWwpO1xyXG4gICAgICAgICAgY29uc3QgcGFnZUl0ZW1zID0gdW5pcXVlQnlWYWx1ZShBcnJheS5pc0FycmF5KHJlc3BvbnNlPy5pdGVtcykgPyByZXNwb25zZS5pdGVtcyA6IFtdKTtcclxuICAgICAgICAgIGlmICghYXBwZW5kICYmIHBhZ2VJdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDApO1xyXG4gICAgICAgICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcclxuICAgICAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcclxuICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0T3B0aW9ucygocHJldmlvdXMpID0+IChhcHBlbmQgPyB1bmlxdWVCeVZhbHVlKFsuLi4ocHJldmlvdXMgfHwgW10pLCAuLi5wYWdlSXRlbXNdKSA6IHBhZ2VJdGVtcykpO1xyXG4gICAgICAgICAgc2V0Q3VycmVudFBhZ2UocGFnZSk7XHJcbiAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcblxyXG4gICAgICAgICAgY29uc3QgYXBpVG90YWwgPSBOdW1iZXIocmVzcG9uc2U/LnRvdGFsKTtcclxuICAgICAgICAgIGlmIChOdW1iZXIuaXNGaW5pdGUoYXBpVG90YWwpICYmIGFwaVRvdGFsID4gMCkge1xyXG4gICAgICAgICAgICBzZXRIYXNNb3JlKHBhZ2UgKiBwYWdlU2l6ZSA8IGFwaVRvdGFsKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEhhc01vcmUocGFnZUl0ZW1zLmxlbmd0aCA+PSBwYWdlU2l6ZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgb25TZWFyY2godGVybSwgY29udHJvbGxlci5zaWduYWwpO1xyXG4gICAgICAgICAgY29uc3QgbmV4dCA9IHVuaXF1ZUJ5VmFsdWUocmVzcG9uc2UgfHwgW10pO1xyXG4gICAgICAgICAgaWYgKCFhcHBlbmQgJiYgbmV4dC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgc2V0T3B0aW9ucyhbXSk7XHJcbiAgICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDApO1xyXG4gICAgICAgICAgICBzZXRIYXNNb3JlKGZhbHNlKTtcclxuICAgICAgICAgICAgc2V0TGFzdFNlYXJjaGVkVGVybSh0ZXJtS2V5KTtcclxuICAgICAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlKFwiXCIpO1xyXG4gICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgc2V0T3B0aW9ucyhuZXh0KTtcclxuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDEpO1xyXG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XHJcbiAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKHRlcm1LZXkpO1xyXG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIGlmICghYXBwZW5kKSB7XHJcbiAgICAgICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgICAgIHNldEN1cnJlbnRQYWdlKDApO1xyXG4gICAgICAgICAgc2V0SGFzTW9yZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldExhc3RTZWFyY2hlZFRlcm0odGVybUtleSk7XHJcbiAgICAgICAgc2V0U2hvd05vdEZvdW5kU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgaWYgKGFib3J0UmVmLmN1cnJlbnQgPT09IGNvbnRyb2xsZXIpIHtcclxuICAgICAgICAgIGFib3J0UmVmLmN1cnJlbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIFtvblNlYXJjaCwgb25TZWFyY2hQYWdlLCBwYWdlU2l6ZV1cclxuICApO1xyXG5cclxuICBjb25zdCBydW5TZWFyY2ggPSB1c2VDYWxsYmFjayhhc3luYyAoKSA9PiB7XHJcbiAgICBpZiAocmVhZE9ubHlNb2RlIHx8IGxvYWRpbmcpIHJldHVybjtcclxuICAgIGNvbnN0IHRlcm0gPSBxdWVyeS50cmltKCk7XHJcbiAgICBjb25zdCB0ZXJtS2V5ID0gdGVybS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIGlmICghY2FuU2VhcmNoVGVybSh0ZXJtKSkge1xyXG4gICAgICBzZXRPcHRpb25zKFtdKTtcclxuICAgICAgc2V0Q3VycmVudFBhZ2UoMCk7XHJcbiAgICAgIHNldEhhc01vcmUoZmFsc2UpO1xyXG4gICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKFwiXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRlcm1LZXkgPT09IGxhc3RTZWFyY2hlZFRlcm0gJiYgb3B0aW9ucy5sZW5ndGggPiAwICYmICFvblNlYXJjaFBhZ2UpIHtcclxuICAgICAgc2V0T3Blbih0cnVlKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGF3YWl0IGV4ZWN1dGVTZWFyY2godGVybSwgMSwgZmFsc2UpO1xyXG4gIH0sIFtjYW5TZWFyY2hUZXJtLCBleGVjdXRlU2VhcmNoLCBsYXN0U2VhcmNoZWRUZXJtLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIG9wdGlvbnMubGVuZ3RoLCBxdWVyeSwgcmVhZE9ubHlNb2RlXSk7XHJcblxyXG4gIGNvbnN0IHJ1bkxvYWRNb3JlID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xyXG4gICAgaWYgKHJlYWRPbmx5TW9kZSB8fCBsb2FkaW5nIHx8ICFvblNlYXJjaFBhZ2UgfHwgIWluZmluaXRlU2Nyb2xsIHx8ICFoYXNNb3JlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0ZXJtID0gcXVlcnkudHJpbSgpO1xyXG4gICAgY29uc3QgdGVybUtleSA9IHRlcm0udG9Mb3dlckNhc2UoKTtcclxuICAgIGlmICh0ZXJtS2V5ICE9PSBsYXN0U2VhcmNoZWRUZXJtKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXh0UGFnZSA9IGN1cnJlbnRQYWdlICsgMTtcclxuICAgIGlmIChuZXh0UGFnZSA8PSAxKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBleGVjdXRlU2VhcmNoKHRlcm0sIG5leHRQYWdlLCB0cnVlKTtcclxuICB9LCBbY3VycmVudFBhZ2UsIGV4ZWN1dGVTZWFyY2gsIGhhc01vcmUsIGluZmluaXRlU2Nyb2xsLCBsYXN0U2VhcmNoZWRUZXJtLCBsb2FkaW5nLCBvblNlYXJjaFBhZ2UsIHF1ZXJ5LCByZWFkT25seU1vZGVdKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmICghb3BlbiB8fCAhb25TZWFyY2hQYWdlIHx8ICFpbmZpbml0ZVNjcm9sbCkgcmV0dXJuO1xyXG4gICAgY29uc3Qgc2Nyb2xsZXIgPSBsaXN0UmVmLmN1cnJlbnQ/LnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAoIXNjcm9sbGVyKSByZXR1cm47XHJcblxyXG4gICAgY29uc3Qgb25TY3JvbGwgPSAoKSA9PiB7XHJcbiAgICAgIGlmIChsb2FkaW5nIHx8ICFoYXNNb3JlKSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHRocmVzaG9sZCA9IDQwO1xyXG4gICAgICBjb25zdCBpc05lYXJCb3R0b20gPSBzY3JvbGxlci5zY3JvbGxUb3AgKyBzY3JvbGxlci5jbGllbnRIZWlnaHQgPj0gc2Nyb2xsZXIuc2Nyb2xsSGVpZ2h0IC0gdGhyZXNob2xkO1xyXG4gICAgICBpZiAoaXNOZWFyQm90dG9tKSB7XHJcbiAgICAgICAgdm9pZCBydW5Mb2FkTW9yZSgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHNjcm9sbGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxuICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgIHNjcm9sbGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgb25TY3JvbGwpO1xyXG4gICAgfTtcclxuICB9LCBbaGFzTW9yZSwgaW5maW5pdGVTY3JvbGwsIGxvYWRpbmcsIG9uU2VhcmNoUGFnZSwgb3BlbiwgcnVuTG9hZE1vcmVdKTtcclxuXHJcbiAgY29uc3Qgc2VsZWN0T3B0aW9uID0gKG9wdGlvbjogUmVtb3RlU2VhcmNoT3B0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBuZXh0VmFsdWUgPSBTdHJpbmcob3B0aW9uLnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcclxuICAgIHNldFNob3dOb3RGb3VuZFN0YXRlKGZhbHNlKTtcclxuICAgIG9uQ2hhbmdlKG5leHRWYWx1ZSk7XHJcbiAgICBzZXRMYXN0U2VhcmNoZWRUZXJtKG5leHRWYWx1ZS50b0xvd2VyQ2FzZSgpKTtcclxuICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IHF1ZXJ5S2V5ID0gcXVlcnkudHJpbSgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgY29uc3Qgc2hvd1NlYXJjaEljb24gPVxyXG4gICAgIXJlYWRPbmx5TW9kZSAmJlxyXG4gICAgIWxvYWRpbmcgJiZcclxuICAgIGNhblNlYXJjaFRlcm0ocXVlcnkpICYmXHJcbiAgICBxdWVyeUtleSAhPT0gbGFzdFNlYXJjaGVkVGVybTtcclxuXHJcbiAgY29uc3QgbGlzdElkID0gYCR7aWRCYXNlfS1vcHRpb25zYDtcclxuICBjb25zdCBhY3RpdmVJZCA9XHJcbiAgICBvcGVuICYmIGZpbHRlcmVkW3Jlc29sdmVkQWN0aXZlSW5kZXhdID8gYCR7aWRCYXNlfS1vcHQtJHtmaWx0ZXJlZFtyZXNvbHZlZEFjdGl2ZUluZGV4XS52YWx1ZX1gIDogdW5kZWZpbmVkO1xyXG4gIGNvbnN0IHNob3dMb2FkaW5nT25seVN0YXRlID0gbG9hZGluZyAmJiBmaWx0ZXJlZC5sZW5ndGggPT09IDA7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiIHJlZj17Y29udGFpbmVyUmVmfT5cclxuICAgICAge3Nob3dMYWJlbCA/IChcclxuICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9ybS1sYWJlbCBmb250LXNlbWlib2xkXCIgc3R5bGU9e3sgY29sb3I6IFwiIzAwMjk2YmUwXCIgfX0+XHJcbiAgICAgICAgICB7bGFiZWx9XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cclxuICAgICAgICA8ZGl2XHJcbiAgICAgICAgICByZWY9e2JveFJlZn1cclxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcclxuICAgICAgICAgICAgXCJyZWxhdGl2ZSB3LWZ1bGwgcm91bmRlZC14bCBiZy13aGl0ZSB0ZXh0LWxlZnQgZm9jdXMtd2l0aGluOmJvcmRlci1wcmltYXJ5IGZvY3VzLXdpdGhpbjpyaW5nLTIgZm9jdXMtd2l0aGluOnJpbmctcHJpbWFyeSBmb2N1cy13aXRoaW46cmluZy1vZmZzZXQtd2hpdGUgc206dGV4dC1zbVwiLFxyXG4gICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJcIlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgIFwidy1mdWxsIHJvdW5kZWQteGwgYm9yZGVyIHB4LTMgcHktMiBwci0yMCB0ZXh0LXNtIHNtOnRleHQtYmFzZSBsZWFkaW5nLTUgZm9jdXM6b3V0bGluZS1oaWRkZW4gZm9jdXM6cmluZy0yIGRpc2FibGVkOmJnLXNsYXRlLTEwMCBkaXNhYmxlZDp0ZXh0LXNsYXRlLTUwMCBkaXNhYmxlZDpib3JkZXItc2xhdGUtMjAwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiLFxyXG4gICAgICAgICAgICAgIFwiYm9yZGVyLXNsYXRlLTIwMCBmb2N1czpyaW5nLXByaW1hcnkgZm9jdXM6Ym9yZGVyLXByaW1hcnlcIixcclxuICAgICAgICAgICAgICByZWFkT25seU1vZGUgPyBcImluZC1yZWFkb25seS1maWVsZFwiIDogXCJ0ZXh0LXNsYXRlLTkwMFwiXHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiB2YWx1ZUNvbG9yIH19XHJcbiAgICAgICAgICAgIHZhbHVlPXtxdWVyeX1cclxuICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IG5leHRWYWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgICBzZXRBY3RpdmVJbmRleCgwKTtcclxuICAgICAgICAgICAgICBzZXRTaG93Tm90Rm91bmRTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2UobmV4dFZhbHVlKTtcclxuICAgICAgICAgICAgICBpZiAobmV4dFZhbHVlLnRyaW0oKS50b0xvd2VyQ2FzZSgpICE9PSBsYXN0U2VhcmNoZWRUZXJtKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRPcGVuKGZhbHNlKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIG9uRm9jdXM9eygpID0+IHtcclxuICAgICAgICAgICAgICBpZiAoIXJlYWRPbmx5TW9kZSAmJiAoZmlsdGVyZWQubGVuZ3RoID4gMCB8fCBzaG93Tm90Rm91bmRTdGF0ZSkpIHtcclxuICAgICAgICAgICAgICAgIHNldE9wZW4odHJ1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICBvbktleURvd249eyhldmVudCkgPT5cclxuICAgICAgICAgICAgICBoYW5kbGVDb21ib2JveEtleURvd24oZXZlbnQsIHtcclxuICAgICAgICAgICAgICAgIGlzT3Blbjogb3BlbixcclxuICAgICAgICAgICAgICAgIHNldE9wZW4sXHJcbiAgICAgICAgICAgICAgICBvcHRpb25Db3VudDogZmlsdGVyZWQubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgc2V0QWN0aXZlSW5kZXgsXHJcbiAgICAgICAgICAgICAgICBvbkVudGVyV2hlbk9wZW46ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RPcHRpb24oZmlsdGVyZWRbcmVzb2x2ZWRBY3RpdmVJbmRleF0gPz8gZmlsdGVyZWRbMF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG9uRW50ZXJXaGVuQ2xvc2VkOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgIHZvaWQgcnVuU2VhcmNoKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgb3Blbk9uQXJyb3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XHJcbiAgICAgICAgICAgIHJlYWRPbmx5PXtyZWFkT25seX1cclxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxyXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtsYWJlbH1cclxuICAgICAgICAgICAgcm9sZT1cImNvbWJvYm94XCJcclxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD17b3Blbn1cclxuICAgICAgICAgICAgYXJpYS1jb250cm9scz17bGlzdElkfVxyXG4gICAgICAgICAgICBhcmlhLWFjdGl2ZWRlc2NlbmRhbnQ9e2FjdGl2ZUlkfVxyXG4gICAgICAgICAgLz5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LXktMCByaWdodC0wIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHByLTJcIj5cclxuICAgICAgICAgICAge2xvYWRpbmcgPyAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcHgtMS41XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XHJcbiAgICAgICAgICAgICAgICA8U3Bpbm5lciBzaXplPVwiaC00IHctNFwiIC8+XHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAgICAgIHtzaG93U2VhcmNoSWNvbiA/IChcclxuICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMS41IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtNTAwXCJcclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgICAgdm9pZCBydW5TZWFyY2goKTtcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpbmRUKFwiQ29tbW9uX1NlYXJjaFwiLCBcIlNlYXJjaFwiKX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXtyZWFkT25seU1vZGV9XHJcbiAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgPHN2ZyB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgZmlsbD1cIm5vbmVcIiB2aWV3Qm94PVwiMCAwIDI0IDI0XCIgc3Ryb2tlV2lkdGg9ezEuNX0gc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgY2xhc3NOYW1lPVwiaC01IHctNVwiPlxyXG4gICAgICAgICAgICAgICAgICA8cGF0aCBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgZD1cIm0xNS43NSAxNS43NS0yLjQ4OS0yLjQ4OW0wIDBhMy4zNzUgMy4zNzUgMCAxIDAtNC43NzMtNC43NzMgMy4zNzUgMy4zNzUgMCAwIDAgNC43NzQgNC43NzRaTTIxIDEyYTkgOSAwIDEgMS0xOCAwIDkgOSAwIDAgMSAxOCAwWlwiIC8+XHJcbiAgICAgICAgICAgICAgICA8L3N2Zz5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgcC0xLjUgdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS02MDBcIlxyXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZWFkT25seU1vZGUpIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGlmIChvcGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgIHNldE9wZW4oZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICBzZXRPcGVuKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFxdWVyeS50cmltKCkgJiYgbG9hZE9uT3Blbikge1xyXG4gICAgICAgICAgICAgICAgICB2b2lkIHJ1blNlYXJjaCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17b3BlbiA/IGluZFQoXCJEcm9wZG93bl9IaWRlT3B0aW9uc1wiLCBcIkhpZGUgb3B0aW9uc1wiKSA6IGluZFQoXCJEcm9wZG93bl9TaG93T3B0aW9uc1wiLCBcIlNob3cgb3B0aW9uc1wiKX1cclxuICAgICAgICAgICAgICBkaXNhYmxlZD17cmVhZE9ubHlNb2RlfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAge29wZW4gPyA8Q2hldnJvblVwU3ZnIGNsYXNzTmFtZT1cImgtNSB3LTVcIiAvPiA6IDxDaGV2cm9uRG93blN2ZyBjbGFzc05hbWU9XCJoLTUgdy01XCIgLz59XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPEZsb2F0aW5nTGlzdFxyXG4gICAgICAgICAgYW5jaG9yUmVmPXtib3hSZWZ9XHJcbiAgICAgICAgICBvcGVuPXtvcGVufVxyXG4gICAgICAgICAgekluZGV4PXszNjAwMDB9XHJcbiAgICAgICAgICBtYXhIZWlnaHRDbGFzcz1cIm1heC1oLTcyXCJcclxuICAgICAgICAgIHJvbGU9XCJsaXN0Ym94XCJcclxuICAgICAgICAgIHJvdW5kZWRDbGFzcz1cInJvdW5kZWQteGxcIlxyXG4gICAgICAgICAgcGFuZWxDbGFzc05hbWU9e3BhbmVsQ2xhc3NOYW1lfVxyXG4gICAgICAgID5cclxuICAgICAgICAgIDxkaXYgaWQ9e2xpc3RJZH0gcmVmPXtsaXN0UmVmfT5cclxuICAgICAgICAgICAge3Nob3dMb2FkaW5nT25seVN0YXRlID8gKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Mb2FkaW5nXCIsIFwiTG9hZGluZ1wiKX08L2Rpdj5cclxuICAgICAgICAgICAgKSA6IHNob3dOb3RGb3VuZFN0YXRlID8gKFxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yIHRleHQtc20gdGV4dC1zbGF0ZS01MDBcIj57aW5kVChcIkNvbW1vbl9Ob3RGb3VuZFwiLCBcIk5vdCBmb3VuZFwiKX08L2Rpdj5cclxuICAgICAgICAgICAgKSA6IGZpbHRlcmVkLmxlbmd0aCA9PT0gMCA/IChcclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIHRleHQtc2xhdGUtNTAwXCI+e2luZFQoXCJDb21tb25fTm9EYXRhXCIsIFwiTm8gZGF0YVwiKX08L2Rpdj5cclxuICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAge2ZpbHRlcmVkLm1hcCgob3B0aW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBpc0FjdGl2ZSA9IGluZGV4ID09PSByZXNvbHZlZEFjdGl2ZUluZGV4O1xyXG4gICAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25JZCA9IG9wdGlvbi52YWx1ZSB8fCBgJHtpbmRleH1gO1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtvcHRpb25JZH1cclxuICAgICAgICAgICAgICAgICAgICAgIGlkPXtgJHtpZEJhc2V9LW9wdC0ke29wdGlvbklkfWB9XHJcbiAgICAgICAgICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgIGFyaWEtc2VsZWN0ZWQ9e2lzQWN0aXZlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlbGF0aXZlIGZsZXggdy1mdWxsIGN1cnNvci1kZWZhdWx0IHNlbGVjdC1ub25lIGl0ZW1zLXN0YXJ0IHB5LTIgcHgtMyB0ZXh0LWxlZnQgdGV4dC1zbVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA/IFwiYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCIgOiBcInRleHQtc2xhdGUtOTAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICBvbk1vdXNlRW50ZXI9eygpID0+IHNldEFjdGl2ZUluZGV4KGluZGV4KX1cclxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNlbGVjdE9wdGlvbihvcHRpb24pfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW1cIj57b3B0aW9uLnRpdGxlIHx8IG9wdGlvbi52YWx1ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb24uc3VidGl0bGUgPyAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwidGV4dC14c1wiLCBpc0FjdGl2ZSA/IFwidGV4dC13aGl0ZS85MFwiIDogXCJ0ZXh0LXNsYXRlLTUwMFwiKX0+e29wdGlvbi5zdWJ0aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgICAgICB7bG9hZGluZyA/IChcclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBib3JkZXItdCBib3JkZXItc2xhdGUtMTAwXCI+e2luZFQoXCJDb21tb25fTG9hZGluZ1wiLCBcIkxvYWRpbmdcIil9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICApIDogbnVsbH1cclxuICAgICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICAgKX1cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvRmxvYXRpbmdMaXN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSZW1vdGVTZWFyY2hDb21ib2JveDtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtQkFBeUU7QUErUmpFO0FBeFBSLElBQU0sZ0JBQWdCLENBQUMsVUFBc0Q7QUFDM0UsUUFBTSxNQUFNLG9CQUFJLElBQWdDO0FBQ2hELGFBQVcsUUFBUSxTQUFTLENBQUMsR0FBRztBQUM5QixVQUFNLE1BQU0sT0FBTyxLQUFLLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFDMUMsUUFBSSxDQUFDLElBQUs7QUFDVixRQUFJLElBQUksSUFBSSxHQUFHLEVBQUc7QUFDbEIsUUFBSSxJQUFJLEtBQUs7QUFBQSxNQUNYLE9BQU87QUFBQSxNQUNQLE9BQU8sT0FBTyxLQUFLLFNBQVMsRUFBRSxFQUFFLEtBQUs7QUFBQSxNQUNyQyxVQUFVLE9BQU8sS0FBSyxZQUFZLEVBQUUsRUFBRSxLQUFLO0FBQUEsSUFDN0MsQ0FBQztBQUFBLEVBQ0g7QUFDQSxTQUFPLE1BQU0sS0FBSyxJQUFJLE9BQU8sQ0FBQztBQUNoQztBQUdBLElBQU0sdUJBQXVCLENBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0Esa0JBQWtCO0FBQUEsRUFDbEIsV0FBVztBQUFBLEVBQ1gs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
