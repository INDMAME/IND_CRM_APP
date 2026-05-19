import {
  RemoteSearchCombobox_default
} from "./chunk-BU755TFH.js";
import {
  fetchExpenseProjects
} from "./chunk-5YP53PRM.js";
import {
  require_jsx_runtime,
  require_react
} from "./chunk-2NKOKBT5.js";
import {
  __toESM
} from "./chunk-W7NC74ZX.js";

// Web/wwwroot/react/src/pages/gastos/components/ExpenseProjectFilterInput.tsx
var import_react = __toESM(require_react());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var SEARCH_PAGE_SIZE = 50;
var mapProjectOptions = (items) => {
  return (Array.isArray(items) ? items : []).flatMap((item) => {
    const valueText = String(item?.value || item?.Value || item?.projId || item?.ProjId || "").trim();
    if (!valueText) return [];
    const subtitle = String(
      item?.text || item?.Text || item?.name || item?.Name || item?.description || item?.Description || ""
    ).trim();
    return [{
      value: valueText,
      title: valueText,
      subtitle: subtitle || "-"
    }];
  });
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
    return mapProjectOptions(response?.items || response?.Items);
  }, []);
  const loadOptionsPage = (0, import_react.useCallback)(async (term, page, pageSize, signal) => {
    const response = await fetchExpenseProjects(term, page, pageSize, {
      signal,
      suppressPermissionModal: true
    });
    return {
      items: mapProjectOptions(response?.items || response?.Items),
      total: Number(response?.total || response?.Total || 0)
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
      openSearchMode: "empty-query",
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL3BhZ2VzL2dhc3Rvcy9jb21wb25lbnRzL0V4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IFJlbW90ZVNlYXJjaENvbWJvYm94LCB7IHR5cGUgUmVtb3RlU2VhcmNoT3B0aW9uIH0gZnJvbSBcIi4uLy4uLy4uL2NvbXBvbmVudHMvY29tbW9ucy9SZW1vdGVTZWFyY2hDb21ib2JveC50c3hcIjtcclxuaW1wb3J0IHsgZmV0Y2hFeHBlbnNlUHJvamVjdHMgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaS50c1wiO1xyXG5cclxudHlwZSBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0UHJvcHMgPSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XHJcbiAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gIHJlYWRPbmx5PzogYm9vbGVhbjtcclxuICBkaXNhYmxlZD86IGJvb2xlYW47XHJcbiAgc2hvd0xhYmVsPzogYm9vbGVhbjtcbn07XG5cbnR5cGUgUHJvamVjdE9wdGlvbkxpa2UgPSB7XG4gIHZhbHVlPzogc3RyaW5nO1xuICBWYWx1ZT86IHN0cmluZztcbiAgdGV4dD86IHN0cmluZztcbiAgVGV4dD86IHN0cmluZztcbiAgcHJvaklkPzogc3RyaW5nO1xuICBQcm9qSWQ/OiBzdHJpbmc7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIE5hbWU/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBEZXNjcmlwdGlvbj86IHN0cmluZztcbn07XG5cbmNvbnN0IFNFQVJDSF9QQUdFX1NJWkUgPSA1MDtcblxuY29uc3QgbWFwUHJvamVjdE9wdGlvbnMgPSAoaXRlbXM6IFByb2plY3RPcHRpb25MaWtlW10gfCB1bmRlZmluZWQpOiBSZW1vdGVTZWFyY2hPcHRpb25bXSA9PiB7XG4gIHJldHVybiAoQXJyYXkuaXNBcnJheShpdGVtcykgPyBpdGVtcyA6IFtdKVxuICAgIC5mbGF0TWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZVRleHQgPSBTdHJpbmcoaXRlbT8udmFsdWUgfHwgaXRlbT8uVmFsdWUgfHwgaXRlbT8ucHJvaklkIHx8IGl0ZW0/LlByb2pJZCB8fCBcIlwiKS50cmltKCk7XG4gICAgICBpZiAoIXZhbHVlVGV4dCkgcmV0dXJuIFtdO1xuICAgICAgY29uc3Qgc3VidGl0bGUgPSBTdHJpbmcoXG4gICAgICAgIGl0ZW0/LnRleHQgfHwgaXRlbT8uVGV4dCB8fCBpdGVtPy5uYW1lIHx8IGl0ZW0/Lk5hbWUgfHwgaXRlbT8uZGVzY3JpcHRpb24gfHwgaXRlbT8uRGVzY3JpcHRpb24gfHwgXCJcIlxuICAgICAgKS50cmltKCk7XG4gICAgICByZXR1cm4gW3tcbiAgICAgICAgdmFsdWU6IHZhbHVlVGV4dCxcbiAgICAgICAgdGl0bGU6IHZhbHVlVGV4dCxcbiAgICAgICAgc3VidGl0bGU6IHN1YnRpdGxlIHx8IFwiLVwiLFxuICAgICAgfV07XG4gICAgfSk7XG59O1xuXHJcbi8vIFByb2plY3QgZmlsdGVyIGlucHV0IGJhY2tlZCBieSByZW1vdGUgZHJvcGRvd24gc3VnZ2VzdGlvbnMuXHJcbmNvbnN0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQgPSAoe1xyXG4gIGxhYmVsLFxyXG4gIHBsYWNlaG9sZGVyLFxyXG4gIHZhbHVlLFxyXG4gIG9uQ2hhbmdlLFxyXG4gIHJlYWRPbmx5ID0gZmFsc2UsXHJcbiAgZGlzYWJsZWQgPSBmYWxzZSxcclxuICBzaG93TGFiZWwgPSB0cnVlLFxyXG59OiBFeHBlbnNlUHJvamVjdEZpbHRlcklucHV0UHJvcHMpID0+IHtcclxuICBjb25zdCBsb2FkT3B0aW9ucyA9IHVzZUNhbGxiYWNrKGFzeW5jICh0ZXJtOiBzdHJpbmcsIHNpZ25hbDogQWJvcnRTaWduYWwpOiBQcm9taXNlPFJlbW90ZVNlYXJjaE9wdGlvbltdPiA9PiB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoRXhwZW5zZVByb2plY3RzKHRlcm0sIDEsIFNFQVJDSF9QQUdFX1NJWkUsIHtcbiAgICAgIHNpZ25hbCxcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hcFByb2plY3RPcHRpb25zKHJlc3BvbnNlPy5pdGVtcyB8fCByZXNwb25zZT8uSXRlbXMpO1xuICB9LCBbXSk7XG5cclxuICBjb25zdCBsb2FkT3B0aW9uc1BhZ2UgPSB1c2VDYWxsYmFjayhhc3luYyAodGVybTogc3RyaW5nLCBwYWdlOiBudW1iZXIsIHBhZ2VTaXplOiBudW1iZXIsIHNpZ25hbDogQWJvcnRTaWduYWwpID0+IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2hFeHBlbnNlUHJvamVjdHModGVybSwgcGFnZSwgcGFnZVNpemUsIHtcclxuICAgICAgc2lnbmFsLFxyXG4gICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiB7XG4gICAgICBpdGVtczogbWFwUHJvamVjdE9wdGlvbnMocmVzcG9uc2U/Lml0ZW1zIHx8IHJlc3BvbnNlPy5JdGVtcyksXG4gICAgICB0b3RhbDogTnVtYmVyKHJlc3BvbnNlPy50b3RhbCB8fCByZXNwb25zZT8uVG90YWwgfHwgMCksXG4gICAgfTtcbiAgfSwgW10pO1xuXHJcbiAgcmV0dXJuIChcclxuICAgIDxSZW1vdGVTZWFyY2hDb21ib2JveFxyXG4gICAgICBsYWJlbD17bGFiZWx9XHJcbiAgICAgIHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn1cclxuICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICBvbkNoYW5nZT17b25DaGFuZ2V9XHJcbiAgICAgIG9uU2VhcmNoPXtsb2FkT3B0aW9uc31cclxuICAgICAgb25TZWFyY2hQYWdlPXtsb2FkT3B0aW9uc1BhZ2V9XHJcbiAgICAgIGlkQmFzZT1cImV4cGVuc2UtcHJvamVjdC1maWx0ZXJcIlxyXG4gICAgICBtaW5TZWFyY2hMZW5ndGg9ezB9XHJcbiAgICAgIHBhZ2VTaXplPXtTRUFSQ0hfUEFHRV9TSVpFfVxuICAgICAgYWxsb3dFbXB0eVNlYXJjaFxuICAgICAgbG9hZE9uT3BlblxuICAgICAgb3BlblNlYXJjaE1vZGU9XCJlbXB0eS1xdWVyeVwiXG4gICAgICBpbmZpbml0ZVNjcm9sbFxuICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgcmVhZE9ubHk9e3JlYWRPbmx5fVxuICAgICAgc2hvd0xhYmVsPXtzaG93TGFiZWx9XHJcbiAgICAgIHBhbmVsQ2xhc3NOYW1lPVwidmlzaXRhcy10eXBvZ3JhcGh5XCJcclxuICAgIC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEV4cGVuc2VQcm9qZWN0RmlsdGVySW5wdXQ7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1CQUFtQztBQTZFL0I7QUFsREosSUFBTSxtQkFBbUI7QUFFekIsSUFBTSxvQkFBb0IsQ0FBQyxVQUFpRTtBQUMxRixVQUFRLE1BQU0sUUFBUSxLQUFLLElBQUksUUFBUSxDQUFDLEdBQ3JDLFFBQVEsQ0FBQyxTQUFTO0FBQ2pCLFVBQU0sWUFBWSxPQUFPLE1BQU0sU0FBUyxNQUFNLFNBQVMsTUFBTSxVQUFVLE1BQU0sVUFBVSxFQUFFLEVBQUUsS0FBSztBQUNoRyxRQUFJLENBQUMsVUFBVyxRQUFPLENBQUM7QUFDeEIsVUFBTSxXQUFXO0FBQUEsTUFDZixNQUFNLFFBQVEsTUFBTSxRQUFRLE1BQU0sUUFBUSxNQUFNLFFBQVEsTUFBTSxlQUFlLE1BQU0sZUFBZTtBQUFBLElBQ3BHLEVBQUUsS0FBSztBQUNQLFdBQU8sQ0FBQztBQUFBLE1BQ04sT0FBTztBQUFBLE1BQ1AsT0FBTztBQUFBLE1BQ1AsVUFBVSxZQUFZO0FBQUEsSUFDeEIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNMO0FBR0EsSUFBTSw0QkFBNEIsQ0FBQztBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQ2QsTUFBc0M7QUFDcEMsUUFBTSxrQkFBYywwQkFBWSxPQUFPLE1BQWMsV0FBdUQ7QUFDMUcsVUFBTSxXQUFXLE1BQU0scUJBQXFCLE1BQU0sR0FBRyxrQkFBa0I7QUFBQSxNQUNyRTtBQUFBLE1BQ0EseUJBQXlCO0FBQUEsSUFDM0IsQ0FBQztBQUVELFdBQU8sa0JBQWtCLFVBQVUsU0FBUyxVQUFVLEtBQUs7QUFBQSxFQUM3RCxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sc0JBQWtCLDBCQUFZLE9BQU8sTUFBYyxNQUFjLFVBQWtCLFdBQXdCO0FBQy9HLFVBQU0sV0FBVyxNQUFNLHFCQUFxQixNQUFNLE1BQU0sVUFBVTtBQUFBLE1BQ2hFO0FBQUEsTUFDQSx5QkFBeUI7QUFBQSxJQUMzQixDQUFDO0FBRUQsV0FBTztBQUFBLE1BQ0wsT0FBTyxrQkFBa0IsVUFBVSxTQUFTLFVBQVUsS0FBSztBQUFBLE1BQzNELE9BQU8sT0FBTyxVQUFVLFNBQVMsVUFBVSxTQUFTLENBQUM7QUFBQSxJQUN2RDtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUNFO0FBQUEsSUFBQztBQUFBO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsVUFBVTtBQUFBLE1BQ1YsY0FBYztBQUFBLE1BQ2QsUUFBTztBQUFBLE1BQ1AsaUJBQWlCO0FBQUEsTUFDakIsVUFBVTtBQUFBLE1BQ1Ysa0JBQWdCO0FBQUEsTUFDaEIsWUFBVTtBQUFBLE1BQ1YsZ0JBQWU7QUFBQSxNQUNmLGdCQUFjO0FBQUEsTUFDZDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxnQkFBZTtBQUFBO0FBQUEsRUFDakI7QUFFSjtBQUVBLElBQU8sb0NBQVE7IiwKICAibmFtZXMiOiBbXQp9Cg==
