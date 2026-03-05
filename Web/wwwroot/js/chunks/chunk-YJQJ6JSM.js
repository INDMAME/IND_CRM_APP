import {
  RemoteSearchCombobox_default
} from "./chunk-NE4KB4CT.js";
import {
  fetchExpenseProjects
} from "./chunk-GGS3XUX2.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-BWM3JLWG.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProjectFilterInput.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE = 20;
var mapProjectOptions = (items) => {
  return (Array.isArray(items) ? items : []).map((item) => {
    const valueText = String(item?.value || "").trim();
    if (!valueText) return null;
    const subtitle = String(item?.text || "").trim();
    return {
      value: valueText,
      title: valueText,
      subtitle: subtitle || "-"
    };
  }).filter(Boolean);
};
var ExpenseProjectFilterInput = ({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  showLabel = true
}) => {
  const loadOptions = (0, import_react.useCallback)(async (term, signal) => {
    const response = await fetchExpenseProjects(term, 1, SEARCH_PAGE_SIZE, {
      signal,
      suppressPermissionModal: true
    });
    return mapProjectOptions(response?.items);
  }, []);
  const loadOptionsPage = (0, import_react.useCallback)(async (term, page, pageSize, signal) => {
    const response = await fetchExpenseProjects(term, page, pageSize, {
      signal,
      suppressPermissionModal: true
    });
    return {
      items: mapProjectOptions(response?.items),
      total: Number(response?.total || 0)
    };
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    RemoteSearchCombobox_default,
    {
      label,
      placeholder,
      value,
      onChange,
      onSearch: loadOptions,
      onSearchPage: loadOptionsPage,
      idBase: "expense-project-filter",
      minSearchLength: 0,
      pageSize: SEARCH_PAGE_SIZE,
      allowEmptySearch: true,
      loadOnOpen: true,
      infiniteScroll: true,
      disabled,
      readOnly,
      showLabel,
      panelClassName: "visitas-typography"
    }
  );
};
var ExpenseProjectFilterInput_default = ExpenseProjectFilterInput;

export {
  ExpenseProjectFilterInput_default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZW1vdGVTZWFyY2hDb21ib2JveCwgeyB0eXBlIFJlbW90ZVNlYXJjaE9wdGlvbiB9IGZyb20gXCIuLi8uLi8uLi9jb21wb25lbnRzL2NvbW1vbnMvUmVtb3RlU2VhcmNoQ29tYm9ib3gudHN4XCI7XG5pbXBvcnQgeyBmZXRjaEV4cGVuc2VQcm9qZWN0cyB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5cbnR5cGUgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dFByb3BzID0ge1xuICBsYWJlbDogc3RyaW5nO1xuICBwbGFjZWhvbGRlcjogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBzaG93TGFiZWw/OiBib29sZWFuO1xufTtcblxuY29uc3QgU0VBUkNIX1BBR0VfU0laRSA9IDIwO1xuXG5jb25zdCBtYXBQcm9qZWN0T3B0aW9ucyA9IChpdGVtczogQXJyYXk8eyB2YWx1ZT86IHN0cmluZzsgdGV4dD86IHN0cmluZyB9PiB8IHVuZGVmaW5lZCk6IFJlbW90ZVNlYXJjaE9wdGlvbltdID0+IHtcbiAgcmV0dXJuIChBcnJheS5pc0FycmF5KGl0ZW1zKSA/IGl0ZW1zIDogW10pXG4gICAgLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWVUZXh0ID0gU3RyaW5nKGl0ZW0/LnZhbHVlIHx8IFwiXCIpLnRyaW0oKTtcbiAgICAgIGlmICghdmFsdWVUZXh0KSByZXR1cm4gbnVsbDtcbiAgICAgIGNvbnN0IHN1YnRpdGxlID0gU3RyaW5nKGl0ZW0/LnRleHQgfHwgXCJcIikudHJpbSgpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWU6IHZhbHVlVGV4dCxcbiAgICAgICAgdGl0bGU6IHZhbHVlVGV4dCxcbiAgICAgICAgc3VidGl0bGU6IHN1YnRpdGxlIHx8IFwiLVwiLFxuICAgICAgfSBhcyBSZW1vdGVTZWFyY2hPcHRpb247XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pIGFzIFJlbW90ZVNlYXJjaE9wdGlvbltdO1xufTtcblxuLy8gUHJvamVjdCBmaWx0ZXIgaW5wdXQgYmFja2VkIGJ5IHJlbW90ZSBkcm9wZG93biBzdWdnZXN0aW9ucy5cbmNvbnN0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgPSAoe1xuICBsYWJlbCxcbiAgcGxhY2Vob2xkZXIsXG4gIHZhbHVlLFxuICBvbkNoYW5nZSxcbiAgcmVhZE9ubHkgPSBmYWxzZSxcbiAgZGlzYWJsZWQgPSBmYWxzZSxcbiAgc2hvd0xhYmVsID0gdHJ1ZSxcbn06IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXRQcm9wcykgPT4ge1xuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyh0ZXJtLCAxLCBTRUFSQ0hfUEFHRV9TSVpFLCB7XG4gICAgICBzaWduYWwsXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHJldHVybiBtYXBQcm9qZWN0T3B0aW9ucyhyZXNwb25zZT8uaXRlbXMpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgbG9hZE9wdGlvbnNQYWdlID0gdXNlQ2FsbGJhY2soYXN5bmMgKHRlcm06IHN0cmluZywgcGFnZTogbnVtYmVyLCBwYWdlU2l6ZTogbnVtYmVyLCBzaWduYWw6IEFib3J0U2lnbmFsKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaEV4cGVuc2VQcm9qZWN0cyh0ZXJtLCBwYWdlLCBwYWdlU2l6ZSwge1xuICAgICAgc2lnbmFsLFxuICAgICAgc3VwcHJlc3NQZXJtaXNzaW9uTW9kYWw6IHRydWUsXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXM6IG1hcFByb2plY3RPcHRpb25zKHJlc3BvbnNlPy5pdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy50b3RhbCB8fCAwKSxcbiAgICB9O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8UmVtb3RlU2VhcmNoQ29tYm9ib3hcbiAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cbiAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgIG9uU2VhcmNoPXtsb2FkT3B0aW9uc31cbiAgICAgIG9uU2VhcmNoUGFnZT17bG9hZE9wdGlvbnNQYWdlfVxuICAgICAgaWRCYXNlPVwiZXhwZW5zZS1wcm9qZWN0LWZpbHRlclwiXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XG4gICAgICBwYWdlU2l6ZT17U0VBUkNIX1BBR0VfU0laRX1cbiAgICAgIGFsbG93RW1wdHlTZWFyY2hcbiAgICAgIGxvYWRPbk9wZW5cbiAgICAgIGluZmluaXRlU2Nyb2xsXG4gICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICByZWFkT25seT17cmVhZE9ubHl9XG4gICAgICBzaG93TGFiZWw9e3Nob3dMYWJlbH1cbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRXhwZW5zZVByb2plY3RGaWx0ZXJJbnB1dDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUFtQztBQStEL0I7QUFqREosSUFBTSxtQkFBbUI7QUFFekIsSUFBTSxvQkFBb0IsQ0FBQyxVQUFzRjtBQUMvRyxVQUFRLE1BQU0sUUFBUSxLQUFLLElBQUksUUFBUSxDQUFDLEdBQ3JDLElBQUksQ0FBQyxTQUFTO0FBQ2IsVUFBTSxZQUFZLE9BQU8sTUFBTSxTQUFTLEVBQUUsRUFBRSxLQUFLO0FBQ2pELFFBQUksQ0FBQyxVQUFXLFFBQU87QUFDdkIsVUFBTSxXQUFXLE9BQU8sTUFBTSxRQUFRLEVBQUUsRUFBRSxLQUFLO0FBQy9DLFdBQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLE9BQU87QUFBQSxNQUNQLFVBQVUsWUFBWTtBQUFBLElBQ3hCO0FBQUEsRUFDRixDQUFDLEVBQ0EsT0FBTyxPQUFPO0FBQ25CO0FBR0EsSUFBTSw0QkFBNEIsQ0FBQztBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQ2QsTUFBc0M7QUFDcEMsUUFBTSxrQkFBYywwQkFBWSxPQUFPLE1BQWMsV0FBdUQ7QUFDMUcsVUFBTSxXQUFXLE1BQU0scUJBQXFCLE1BQU0sR0FBRyxrQkFBa0I7QUFBQSxNQUNyRTtBQUFBLE1BQ0EseUJBQXlCO0FBQUEsSUFDM0IsQ0FBQztBQUVELFdBQU8sa0JBQWtCLFVBQVUsS0FBSztBQUFBLEVBQzFDLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSxzQkFBa0IsMEJBQVksT0FBTyxNQUFjLE1BQWMsVUFBa0IsV0FBd0I7QUFDL0csVUFBTSxXQUFXLE1BQU0scUJBQXFCLE1BQU0sTUFBTSxVQUFVO0FBQUEsTUFDaEU7QUFBQSxNQUNBLHlCQUF5QjtBQUFBLElBQzNCLENBQUM7QUFFRCxXQUFPO0FBQUEsTUFDTCxPQUFPLGtCQUFrQixVQUFVLEtBQUs7QUFBQSxNQUN4QyxPQUFPLE9BQU8sVUFBVSxTQUFTLENBQUM7QUFBQSxJQUNwQztBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBVTtBQUFBLE1BQ1YsY0FBYztBQUFBLE1BQ2QsUUFBTztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsTUFDakIsVUFBVTtBQUFBLE1BQ1Ysa0JBQWdCO0FBQUEsTUFDaEIsWUFBVTtBQUFBLE1BQ1YsZ0JBQWM7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLGdCQUFlO0FBQUE7QUFBQSxFQUNqQjtBQUVKO0FBRUEsSUFBTyxvQ0FBUTsiLAogICJuYW1lcyI6IFtdCn0K
