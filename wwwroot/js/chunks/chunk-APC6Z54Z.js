import {
  flashActionMark
} from "./chunk-K7MECJ5E.js";
import {
  safeText
} from "./chunk-HJEMXS35.js";
import {
  createExpenseSheetTicketQuick
} from "./chunk-TEKR5JYL.js";
import {
  classNames,
  indFormat,
  indT
} from "./chunk-BYICIYT4.js";
import {
  require_jsx_runtime,
  require_react,
  require_react_dom
} from "./chunk-BWM3JLWG.js";
import {
  ApiFetchError
} from "./chunk-IKHTGBEE.js";
import {
  __toESM
} from "./chunk-45FWCHS2.js";

// Web/wwwroot/react/src/components/commons/PageBottomActions.tsx
var import_react2 = __toESM(require_react());
var import_react_dom = __toESM(require_react_dom());

// Web/wwwroot/react/src/hooks/usePageBottomActionsVisibility.ts
var import_react = __toESM(require_react());
var usePageBottomActionsVisibility = () => {
  const wrapperRef = (0, import_react.useRef)(null);
  const animationFrameRef = (0, import_react.useRef)(null);
  const [reservedHeight, setReservedHeight] = (0, import_react.useState)(0);
  const measureHeight = (0, import_react.useEffectEvent)(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const nextHeight = Math.ceil(wrapper.getBoundingClientRect().height);
    setReservedHeight((previous) => Math.abs(previous - nextHeight) < 1 ? previous : nextHeight);
  });
  const scheduleMeasure = (0, import_react.useEffectEvent)(() => {
    if (typeof window === "undefined") return;
    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = window.requestAnimationFrame(() => {
      animationFrameRef.current = null;
      measureHeight();
    });
  });
  (0, import_react.useLayoutEffect)(() => {
    measureHeight();
    if (typeof ResizeObserver === "undefined") return;
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new ResizeObserver(() => {
      scheduleMeasure();
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);
  (0, import_react.useEffect)(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      scheduleMeasure();
    };
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  return {
    reservedHeight,
    wrapperRef
  };
};

// Web/wwwroot/react/src/components/commons/PageBottomActions.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime());
var MAX_PAGE_BOTTOM_ACTIONS = 4;
var PageBottomActionButton = ({
  label,
  disabled = false,
  onClick,
  className,
  ariaLabel,
  type = "button",
  tabIndex,
  fullWidth = false
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "button",
    {
      type,
      disabled,
      onClick,
      "aria-label": ariaLabel || label,
      tabIndex,
      className: classNames(
        "inline-block w-full rounded-[5px] disabled:cursor-not-allowed disabled:opacity-60",
        fullWidth ? "col-span-2" : "",
        className || ""
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex w-full items-center justify-center rounded-[5px] border border-[#001f4d]/80 bg-primary px-3 py-2.5 text-center text-[12px] font-semibold leading-tight text-white shadow-xs transition-colors duration-150 hover:bg-[#001f4d] sm:px-4 sm:py-2.5 sm:text-[13px]", children: label })
    }
  );
};
PageBottomActionButton.displayName = "PageBottomActionButton";
var PageBottomActions = ({ children, ariaLabel, className }) => {
  const actionButtons = import_react2.Children.toArray(children).filter(
    (child) => (0, import_react2.isValidElement)(child) && child.type === PageBottomActionButton
  ).slice(0, MAX_PAGE_BOTTOM_ACTIONS);
  const actionCount = actionButtons.length;
  const { reservedHeight, wrapperRef } = usePageBottomActionsVisibility();
  const portalTarget = typeof document === "undefined" ? null : document.body;
  if (actionCount < 1) {
    return null;
  }
  const actionBar = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref: wrapperRef,
      className: "fixed inset-x-0 bottom-0 z-1900 border-t border-slate-200/90 bg-white shadow-[0_-10px_28px_rgba(15,23,42,0.12)]",
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: "w-full px-2 pt-2 sm:px-3 sm:pt-2.5",
          style: { paddingBottom: "calc(0.2rem + env(safe-area-inset-bottom, 0px))" },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              role: "toolbar",
              "aria-label": ariaLabel,
              className: classNames("pointer-events-auto w-full", className || ""),
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid grid-cols-2 gap-1.5", children: actionButtons.map((child, index) => {
                const shouldUseFullWidth = actionCount === 1 || actionCount % 2 === 1 && index === actionCount - 1;
                return (0, import_react2.cloneElement)(child, {
                  fullWidth: shouldUseFullWidth,
                  tabIndex: child.props.tabIndex,
                  key: child.key ?? `page-bottom-action-${index}`
                });
              }) })
            }
          )
        }
      )
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "aria-hidden": "true", style: { height: `${reservedHeight}px` } }),
    portalTarget ? (0, import_react_dom.createPortal)(actionBar, portalTarget) : null
  ] });
};
var PageBottomActions_default = PageBottomActions;

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlowCore.ts
var TICKET_IMAGE_CACHE_NAME = "ind-expense-ticket-image-v1";
var TICKET_IMAGE_CACHE_PREFIX = "/__ind_cache__/ticket-image/";
var TICKET_TRACE_STORAGE_KEY = "expense_sheet_ticket_quick_flow_trace_v1";
var MAX_TICKET_IMAGE_SIZE_BYTES = 50 * 1024 * 1024;
var TICKET_IMAGE_ACCEPT_ATTRIBUTE = ".jpg,.jpeg,.png,.webp,image/jpeg,image/pjpeg,image/png,image/webp";
var ALLOWED_TICKET_IMAGE_MIME_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/pjpeg", "image/png", "image/webp"]);
var ALLOWED_TICKET_IMAGE_EXTENSIONS = /* @__PURE__ */ new Set(["jpg", "jpeg", "png", "webp"]);
var normalizeImageExtension = (value) => {
  const normalized = safeText(value).toLowerCase().replace(/[^a-z0-9]/g, "");
  if (!normalized) return "";
  if (normalized === "jpeg") return "jpg";
  return ALLOWED_TICKET_IMAGE_EXTENSIONS.has(normalized) ? normalized : "";
};
var resolveExtensionFromFileName = (file) => {
  const fromName = safeText(file.name).split(".").pop() || "";
  return normalizeImageExtension(fromName);
};
var isSupportedTicketImageFile = (file) => {
  const normalizedType = safeText(file.type).toLowerCase();
  if (normalizedType && ALLOWED_TICKET_IMAGE_MIME_TYPES.has(normalizedType)) {
    return true;
  }
  const extension = resolveExtensionFromFileName(file);
  return !!extension;
};
var resolveRandomKey = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};
var extractTraceIdFromError = (error) => {
  const payload = safeText(error.responseBody);
  if (!payload) return "";
  try {
    const json = JSON.parse(payload);
    const traceId = safeText(json.TraceId ?? json.traceId);
    return traceId;
  } catch {
    return "";
  }
};
var persistTraceList = (traceList) => {
  try {
    sessionStorage.setItem(TICKET_TRACE_STORAGE_KEY, JSON.stringify(traceList));
  } catch {
  }
};
var cacheImageFile = async (cacheKey, file) => {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  await cache.put(
    new Request(requestUrl),
    new Response(file, {
      headers: {
        "Content-Type": safeText(file.type) || "application/octet-stream"
      }
    })
  );
};
var removeCachedImageFile = async (cacheKey) => {
  if (typeof window === "undefined" || !("caches" in window)) return;
  const cache = await caches.open(TICKET_IMAGE_CACHE_NAME);
  const requestUrl = `${TICKET_IMAGE_CACHE_PREFIX}${encodeURIComponent(cacheKey)}`;
  await cache.delete(requestUrl);
};

// Web/wwwroot/react/src/pages/gastos/detail/useExpenseSheetQuickTicketFlow.ts
var import_react3 = __toESM(require_react());
var formatValidationErrors = (errors) => {
  if (!Array.isArray(errors) || errors.length === 0) return "";
  return errors.map((entry) => {
    const field = safeText(entry?.Field);
    const message = safeText(entry?.Message);
    if (field && message) return `${field}: ${message}`;
    return message || field;
  }).filter(Boolean).join(" | ");
};
var useExpenseSheetQuickTicketFlow = ({
  sheetId = "",
  projectId = "",
  currencyCode = "",
  axUserIdOverride = "",
  canCreateExpense,
  isCreateMode,
  isSheetLocked,
  linkToSheet = true,
  onForbidden,
  onCompleted
}) => {
  const [sourcePickerOpen, setSourcePickerOpen] = (0, import_react3.useState)(false);
  const [busy, setBusy] = (0, import_react3.useState)(false);
  const [progressKey, setProgressKey] = (0, import_react3.useState)(null);
  const [errorMessage, setErrorMessage] = (0, import_react3.useState)("");
  const [traceList, setTraceList] = (0, import_react3.useState)([]);
  const [partialTicketFailure, setPartialTicketFailure] = (0, import_react3.useState)(null);
  const latestFileRef = (0, import_react3.useRef)(null);
  const latestCreatedTicketRef = (0, import_react3.useRef)(null);
  const progressMessage = (0, import_react3.useMemo)(() => {
    if (progressKey === "uploadingImage") {
      return indT("ExpenseSheets_NewTicket_Status_UploadingImage", "Uploading image...");
    }
    if (progressKey === "creatingTicket") {
      return indT("ExpenseSheets_NewTicket_Status_CreatingTicket", "Creating ticket...");
    }
    if (progressKey === "syncingFile") {
      return indT("ExpenseSheets_NewTicket_Status_SyncingFile", "Syncing file...");
    }
    if (progressKey === "finalizingIa") {
      return indT("ExpenseSheets_NewTicket_Status_Finalizing", "Finalizing IA...");
    }
    if (progressKey === "linkingExpenseLine") {
      return indT("ExpenseSheets_NewTicket_Status_LinkingLine", "Linking expense line...");
    }
    if (progressKey === "done") {
      return indT("ExpenseSheets_NewTicket_Status_Done", "Done");
    }
    return "";
  }, [progressKey]);
  const addTrace = (0, import_react3.useCallback)((step, traceId) => {
    const safeTraceId = safeText(traceId);
    if (!safeTraceId) return;
    setTraceList((previous) => {
      const next = [
        ...previous,
        {
          step,
          traceId: safeTraceId,
          at: (/* @__PURE__ */ new Date()).toISOString()
        }
      ];
      persistTraceList(next);
      return next;
    });
  }, []);
  const clearCachedCurrentImage = (0, import_react3.useCallback)(() => {
    const cacheKey = latestFileRef.current?.cacheKey;
    if (!cacheKey) return;
    void removeCachedImageFile(cacheKey).catch(() => {
    });
  }, []);
  const clearFlowState = (0, import_react3.useCallback)(() => {
    latestCreatedTicketRef.current = null;
    setErrorMessage("");
    setPartialTicketFailure(null);
    setTraceList([]);
    persistTraceList([]);
  }, []);
  const buildApiOptions = (0, import_react3.useCallback)(() => {
    const safeAxUserId = safeText(axUserIdOverride);
    if (!safeAxUserId) {
      return {
        suppressPermissionModal: true
      };
    }
    return {
      suppressPermissionModal: true,
      headers: {
        "X-IND-AxUserId": safeAxUserId
      }
    };
  }, [axUserIdOverride]);
  const ensureQuickCreatePermission = (0, import_react3.useCallback)(() => {
    if (!canCreateExpense || isCreateMode || isSheetLocked || linkToSheet && !sheetId) {
      onForbidden();
      return false;
    }
    return true;
  }, [canCreateExpense, isCreateMode, isSheetLocked, linkToSheet, onForbidden, sheetId]);
  const resolveUiErrorMessage = (0, import_react3.useCallback)((error) => {
    if (error instanceof ApiFetchError) {
      const validationText = formatValidationErrors(error.validationErrors);
      if (validationText) {
        return validationText;
      }
      if (error.status === 429) {
        return safeText(error.message) || indT("ExpenseSheets_NewTicket_Error_RateLimit", "Too many requests.");
      }
      if (error.status === 404) {
        return indT("ExpenseSheets_NewTicket_Error_NotFound", "Record not found.");
      }
      if (error.status === 500) {
        return indT("ExpenseSheets_NewTicket_Error_Server", "Server error.");
      }
    }
    return error instanceof Error && safeText(error.message) ? safeText(error.message) : indT("Api_RequestFailed", "Request failed.");
  }, []);
  const addQuickCreateResponseTraces = (0, import_react3.useCallback)(
    (response) => {
      addTrace("ticket-quick-create", safeText(response.TraceId));
      const stepTraceIds = response.Data?.StepTraceIds;
      addTrace("ticket-create", safeText(stepTraceIds?.TicketCreate));
      addTrace("ticket-file-upload", safeText(stepTraceIds?.FileUpload));
      addTrace("expensefromticket", safeText(stepTraceIds?.DraftExtract));
      addTrace("ticket-finalize", safeText(stepTraceIds?.TicketFinalize));
      addTrace("expense-sheet-link", safeText(stepTraceIds?.SheetLink));
    },
    [addTrace]
  );
  const resolveQuickCreateFailureMessage = (0, import_react3.useCallback)((response) => {
    const data = response.Data;
    const fileId = safeText(data?.FileId);
    const completedStage = safeText(data?.CompletedStage);
    const responseMessage = safeText(response.Message);
    const validationText = formatValidationErrors(response.Errors);
    const retryAfter = safeText(response.RetryAfter);
    const messageParts = [];
    if (response.HttpStatus === 429) {
      messageParts.push(responseMessage || indT("ExpenseSheets_NewTicket_Error_RateLimit", "Too many requests."));
      if (retryAfter) {
        messageParts.push(
          indFormat("ExpenseSheets_NewTicket_Error_RetryAfterHint", "Retry after {0}.", retryAfter)
        );
      }
    } else if (validationText) {
      messageParts.push(validationText);
    } else if (responseMessage) {
      messageParts.push(responseMessage);
    } else if (fileId) {
      messageParts.push(
        indT(
          "ExpenseSheets_NewTicket_Error_Partial",
          "The ticket was created, but the full process did not finish."
        )
      );
    } else if (response.HttpStatus === 404) {
      messageParts.push(indT("ExpenseSheets_NewTicket_Error_NotFound", "Record not found."));
    } else if (response.HttpStatus === 500) {
      messageParts.push(indT("ExpenseSheets_NewTicket_Error_Server", "Server error."));
    } else {
      messageParts.push(indT("Api_RequestFailed", "Request failed."));
    }
    if (fileId && completedStage) {
      messageParts.push(indFormat("ExpenseSheets_NewTicket_Error_Stage", "Completed stage: {0}.", completedStage));
    }
    return messageParts.filter(Boolean).join(" ");
  }, []);
  const runQuickCreateFlow = (0, import_react3.useCallback)(
    async (file, cacheKey) => {
      setBusy(true);
      setProgressKey("creatingTicket");
      clearFlowState();
      try {
        const response = await createExpenseSheetTicketQuick(
          {
            ticketImage: file,
            currencyCode: safeText(currencyCode).toUpperCase() || void 0,
            existingHojaGastosId: linkToSheet ? safeText(sheetId) || void 0 : void 0,
            projectId: linkToSheet ? safeText(projectId) || void 0 : void 0
          },
          buildApiOptions()
        );
        addQuickCreateResponseTraces(response);
        const fileId = safeText(response.Data?.FileId);
        const linkedToSheet = response.Data?.LinkedToSheet === true;
        const partialState = fileId ? {
          fileId,
          linkedToSheet,
          completedStage: safeText(response.Data?.CompletedStage),
          urlFile: safeText(response.Data?.UrlFile),
          fileName: safeText(response.Data?.FileName),
          processedByAI: response.Data?.ProcessedByAI ?? null
        } : null;
        if (partialState) {
          latestCreatedTicketRef.current = partialState;
        }
        if (response.Success === true) {
          if (!fileId) {
            throw new Error(indT("ExpenseSheets_NewTicket_Error_NoFileId", "Could not resolve ticket file id."));
          }
          setProgressKey("done");
          await removeCachedImageFile(cacheKey);
          flashActionMark("okProcess", 1200);
          setBusy(false);
          setProgressKey(null);
          onCompleted?.({ fileId, linkedToSheet });
          return;
        }
        if (partialState) {
          setPartialTicketFailure(partialState);
        }
        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveQuickCreateFailureMessage(response));
      } catch (error) {
        if (error instanceof ApiFetchError) {
          addTrace("ticket-quick-create-error", extractTraceIdFromError(error));
        }
        flashActionMark("errorProcess", 1500);
        setBusy(false);
        setProgressKey(null);
        setErrorMessage(resolveUiErrorMessage(error));
      }
    },
    [
      addQuickCreateResponseTraces,
      addTrace,
      buildApiOptions,
      clearFlowState,
      currencyCode,
      linkToSheet,
      onCompleted,
      projectId,
      resolveQuickCreateFailureMessage,
      resolveUiErrorMessage,
      sheetId
    ]
  );
  const handleSelectedFile = (0, import_react3.useCallback)(
    async (file, _source) => {
      if (!file) return;
      if (!ensureQuickCreatePermission()) return;
      const safeType = safeText(file.type).toLowerCase();
      if (safeType && !safeType.startsWith("image/") && !/\.(jpe?g|png|webp)$/i.test(file.name || "")) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileType", "Unsupported image format."));
        return;
      }
      if (!isSupportedTicketImageFile(file)) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileType", "Unsupported image format."));
        return;
      }
      if (file.size > MAX_TICKET_IMAGE_SIZE_BYTES) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_FileSize", "Image exceeds 50MB max size."));
        return;
      }
      const cacheKey = resolveRandomKey();
      latestFileRef.current = { cacheKey, file };
      void cacheImageFile(cacheKey, file).catch(() => {
      });
      await runQuickCreateFlow(file, cacheKey);
    },
    [ensureQuickCreatePermission, runQuickCreateFlow]
  );
  const retryPendingUpload = (0, import_react3.useCallback)(async () => {
    return;
  }, []);
  const openCreatedTicket = (0, import_react3.useCallback)(() => {
    const createdTicket = partialTicketFailure || latestCreatedTicketRef.current;
    const fileId = safeText(createdTicket?.fileId);
    if (!fileId) return;
    clearCachedCurrentImage();
    setErrorMessage("");
    setPartialTicketFailure(null);
    onCompleted?.({ fileId, linkedToSheet: createdTicket?.linkedToSheet === true });
  }, [clearCachedCurrentImage, onCompleted, partialTicketFailure]);
  const openSourcePicker = (0, import_react3.useCallback)(() => {
    if (!ensureQuickCreatePermission()) return;
    setErrorMessage("");
    setPartialTicketFailure(null);
    setSourcePickerOpen(true);
  }, [ensureQuickCreatePermission]);
  const closeSourcePicker = (0, import_react3.useCallback)(() => {
    if (busy) return;
    setSourcePickerOpen(false);
  }, [busy]);
  const requestCameraPermission = (0, import_react3.useCallback)(async () => {
    if (typeof navigator === "undefined") return null;
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices || typeof mediaDevices.getUserMedia !== "function") return null;
    try {
      const stream = await mediaDevices.getUserMedia({
        video: { facingMode: "environment" }
      });
      stream.getTracks().forEach((track) => track.stop());
      return true;
    } catch {
      return false;
    }
  }, []);
  const selectFromCamera = (0, import_react3.useCallback)(
    async (inputElement) => {
      if (!inputElement) return;
      const granted = await requestCameraPermission();
      if (granted === false) {
        setErrorMessage(indT("ExpenseSheets_NewTicket_Error_CameraPermission", "Camera permission is required."));
        return;
      }
      setSourcePickerOpen(false);
      inputElement.click();
    },
    [requestCameraPermission]
  );
  const selectFromGallery = (0, import_react3.useCallback)((inputElement) => {
    if (!inputElement) return;
    setSourcePickerOpen(false);
    inputElement.click();
  }, []);
  const clearError = (0, import_react3.useCallback)(() => {
    clearCachedCurrentImage();
    latestCreatedTicketRef.current = null;
    setErrorMessage("");
    setPartialTicketFailure(null);
  }, [clearCachedCurrentImage]);
  return {
    sourcePickerOpen,
    busy,
    progressKey,
    progressMessage,
    errorMessage,
    hasPendingUploadRetry: false,
    hasPartialTicketFailure: partialTicketFailure !== null,
    traceList,
    openSourcePicker,
    closeSourcePicker,
    selectFromCamera,
    selectFromGallery,
    handleSelectedFile,
    retryPendingUpload,
    openCreatedTicket,
    clearError
  };
};

export {
  PageBottomActionButton,
  PageBottomActions_default,
  TICKET_IMAGE_ACCEPT_ATTRIBUTE,
  useExpenseSheetQuickTicketFlow
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhY3Qvc3JjL2NvbXBvbmVudHMvY29tbW9ucy9QYWdlQm90dG9tQWN0aW9ucy50c3giLCAiLi4vLi4vcmVhY3Qvc3JjL2hvb2tzL3VzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eS50cyIsICIuLi8uLi9yZWFjdC9zcmMvcGFnZXMvZ2FzdG9zL2RldGFpbC91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzIiwgIi4uLy4uL3JlYWN0L3NyYy9wYWdlcy9nYXN0b3MvZGV0YWlsL3VzZUV4cGVuc2VTaGVldFF1aWNrVGlja2V0Rmxvdy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFJlYWN0LCB7IENoaWxkcmVuLCBjbG9uZUVsZW1lbnQsIGlzVmFsaWRFbGVtZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBjcmVhdGVQb3J0YWwgfSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgeyB1c2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHkgfSBmcm9tIFwiLi4vLi4vaG9va3MvdXNlUGFnZUJvdHRvbUFjdGlvbnNWaXNpYmlsaXR5LnRzXCI7XG5pbXBvcnQgeyBjbGFzc05hbWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2NsYXNzTmFtZXMudHNcIjtcblxuY29uc3QgTUFYX1BBR0VfQk9UVE9NX0FDVElPTlMgPSA0O1xuXG50eXBlIFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcyA9IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBvbkNsaWNrPzogUmVhY3QuTW91c2VFdmVudEhhbmRsZXI8SFRNTEJ1dHRvbkVsZW1lbnQ+O1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGFyaWFMYWJlbD86IHN0cmluZztcbiAgdHlwZT86IFwiYnV0dG9uXCIgfCBcInN1Ym1pdFwiIHwgXCJyZXNldFwiO1xuICB0YWJJbmRleD86IG51bWJlcjtcbiAgZnVsbFdpZHRoPzogYm9vbGVhbjtcbn07XG5cbnR5cGUgUGFnZUJvdHRvbUFjdGlvbnNQcm9wcyA9IHtcbiAgY2hpbGRyZW46IFJlYWN0LlJlYWN0Tm9kZTtcbiAgYXJpYUxhYmVsOiBzdHJpbmc7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbi8vIER1bWIgYnV0dG9uIHVzZWQgYnkgdGhlIHNoYXJlZCBib3R0b20gYWN0aW9uIGJhci5cbmV4cG9ydCBjb25zdCBQYWdlQm90dG9tQWN0aW9uQnV0dG9uID0gKHtcbiAgbGFiZWwsXG4gIGRpc2FibGVkID0gZmFsc2UsXG4gIG9uQ2xpY2ssXG4gIGNsYXNzTmFtZSxcbiAgYXJpYUxhYmVsLFxuICB0eXBlID0gXCJidXR0b25cIixcbiAgdGFiSW5kZXgsXG4gIGZ1bGxXaWR0aCA9IGZhbHNlLFxufTogUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzKSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvblxuICAgICAgdHlwZT17dHlwZX1cbiAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWwgfHwgbGFiZWx9XG4gICAgICB0YWJJbmRleD17dGFiSW5kZXh9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgIFwiaW5saW5lLWJsb2NrIHctZnVsbCByb3VuZGVkLVs1cHhdIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBkaXNhYmxlZDpvcGFjaXR5LTYwXCIsXG4gICAgICAgIGZ1bGxXaWR0aCA/IFwiY29sLXNwYW4tMlwiIDogXCJcIixcbiAgICAgICAgY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICl9XG4gICAgPlxuICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCB3LWZ1bGwgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHJvdW5kZWQtWzVweF0gYm9yZGVyIGJvcmRlci1bIzAwMWY0ZF0vODAgYmctcHJpbWFyeSBweC0zIHB5LTIuNSB0ZXh0LWNlbnRlciB0ZXh0LVsxMnB4XSBmb250LXNlbWlib2xkIGxlYWRpbmctdGlnaHQgdGV4dC13aGl0ZSBzaGFkb3cteHMgdHJhbnNpdGlvbi1jb2xvcnMgZHVyYXRpb24tMTUwIGhvdmVyOmJnLVsjMDAxZjRkXSBzbTpweC00IHNtOnB5LTIuNSBzbTp0ZXh0LVsxM3B4XVwiPlxuICAgICAgICB7bGFiZWx9XG4gICAgICA8L3NwYW4+XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG5QYWdlQm90dG9tQWN0aW9uQnV0dG9uLmRpc3BsYXlOYW1lID0gXCJQYWdlQm90dG9tQWN0aW9uQnV0dG9uXCI7XG5cbi8vIEZpeGVkIGJvdHRvbSBhY3Rpb24gYmFyIHRoYXQgc3RheXMgdmlzaWJsZSB3aGlsZSB0aGUgcGFnZSBzY3JvbGxzLlxuY29uc3QgUGFnZUJvdHRvbUFjdGlvbnMgPSAoeyBjaGlsZHJlbiwgYXJpYUxhYmVsLCBjbGFzc05hbWUgfTogUGFnZUJvdHRvbUFjdGlvbnNQcm9wcykgPT4ge1xuICBjb25zdCBhY3Rpb25CdXR0b25zID0gQ2hpbGRyZW4udG9BcnJheShjaGlsZHJlbilcbiAgICAuZmlsdGVyKFxuICAgICAgKGNoaWxkKTogY2hpbGQgaXMgUmVhY3QuUmVhY3RFbGVtZW50PFBhZ2VCb3R0b21BY3Rpb25CdXR0b25Qcm9wcz4gPT5cbiAgICAgICAgaXNWYWxpZEVsZW1lbnQ8UGFnZUJvdHRvbUFjdGlvbkJ1dHRvblByb3BzPihjaGlsZCkgJiYgY2hpbGQudHlwZSA9PT0gUGFnZUJvdHRvbUFjdGlvbkJ1dHRvblxuICAgIClcbiAgICAuc2xpY2UoMCwgTUFYX1BBR0VfQk9UVE9NX0FDVElPTlMpO1xuXG4gIGNvbnN0IGFjdGlvbkNvdW50ID0gYWN0aW9uQnV0dG9ucy5sZW5ndGg7XG4gIGNvbnN0IHsgcmVzZXJ2ZWRIZWlnaHQsIHdyYXBwZXJSZWYgfSA9IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSgpO1xuICBjb25zdCBwb3J0YWxUYXJnZXQgPSB0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIgPyBudWxsIDogZG9jdW1lbnQuYm9keTtcblxuICBpZiAoYWN0aW9uQ291bnQgPCAxKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBjb25zdCBhY3Rpb25CYXIgPSAoXG4gICAgPGRpdlxuICAgICAgcmVmPXt3cmFwcGVyUmVmfVxuICAgICAgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQteC0wIGJvdHRvbS0wIHotMTkwMCBib3JkZXItdCBib3JkZXItc2xhdGUtMjAwLzkwIGJnLXdoaXRlIHNoYWRvdy1bMF8tMTBweF8yOHB4X3JnYmEoMTUsMjMsNDIsMC4xMildXCJcbiAgICA+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0yIHB0LTIgc206cHgtMyBzbTpwdC0yLjVcIlxuICAgICAgICBzdHlsZT17eyBwYWRkaW5nQm90dG9tOiBcImNhbGMoMC4ycmVtICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20sIDBweCkpXCIgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJvbGU9XCJ0b29sYmFyXCJcbiAgICAgICAgICBhcmlhLWxhYmVsPXthcmlhTGFiZWx9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFwicG9pbnRlci1ldmVudHMtYXV0byB3LWZ1bGxcIiwgY2xhc3NOYW1lIHx8IFwiXCIpfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIHthY3Rpb25CdXR0b25zLm1hcCgoY2hpbGQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNob3VsZFVzZUZ1bGxXaWR0aCA9IGFjdGlvbkNvdW50ID09PSAxIHx8IChhY3Rpb25Db3VudCAlIDIgPT09IDEgJiYgaW5kZXggPT09IGFjdGlvbkNvdW50IC0gMSk7XG4gICAgICAgICAgICAgIHJldHVybiBjbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgICBmdWxsV2lkdGg6IHNob3VsZFVzZUZ1bGxXaWR0aCxcbiAgICAgICAgICAgICAgICB0YWJJbmRleDogY2hpbGQucHJvcHMudGFiSW5kZXgsXG4gICAgICAgICAgICAgICAga2V5OiBjaGlsZC5rZXkgPz8gYHBhZ2UtYm90dG9tLWFjdGlvbi0ke2luZGV4fWAsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBhcmlhLWhpZGRlbj1cInRydWVcIiBzdHlsZT17eyBoZWlnaHQ6IGAke3Jlc2VydmVkSGVpZ2h0fXB4YCB9fSAvPlxuICAgICAge3BvcnRhbFRhcmdldCA/IGNyZWF0ZVBvcnRhbChhY3Rpb25CYXIsIHBvcnRhbFRhcmdldCkgOiBudWxsfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUGFnZUJvdHRvbUFjdGlvbnM7XG4iLCAiaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VFZmZlY3RFdmVudCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlLCB0eXBlIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuXG50eXBlIFVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eVJlc3VsdCA9IHtcbiAgcmVzZXJ2ZWRIZWlnaHQ6IG51bWJlcjtcbiAgd3JhcHBlclJlZjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50IHwgbnVsbD47XG59O1xuXG4vLyBUcmFja3MgdGhlIGJvdHRvbSBhY3Rpb24gYmFyIGhlaWdodCBzbyB0aGUgcGFnZSByZXNlcnZlcyBlbm91Z2ggc3BhY2UgZm9yIGl0LlxuZXhwb3J0IGNvbnN0IHVzZVBhZ2VCb3R0b21BY3Rpb25zVmlzaWJpbGl0eSA9ICgpOiBVc2VQYWdlQm90dG9tQWN0aW9uc1Zpc2liaWxpdHlSZXN1bHQgPT4ge1xuICBjb25zdCB3cmFwcGVyUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGFuaW1hdGlvbkZyYW1lUmVmID0gdXNlUmVmPG51bWJlciB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbcmVzZXJ2ZWRIZWlnaHQsIHNldFJlc2VydmVkSGVpZ2h0XSA9IHVzZVN0YXRlKDApO1xuXG4gIGNvbnN0IG1lYXN1cmVIZWlnaHQgPSB1c2VFZmZlY3RFdmVudCgoKSA9PiB7XG4gICAgY29uc3Qgd3JhcHBlciA9IHdyYXBwZXJSZWYuY3VycmVudDtcbiAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcblxuICAgIGNvbnN0IG5leHRIZWlnaHQgPSBNYXRoLmNlaWwod3JhcHBlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQpO1xuICAgIHNldFJlc2VydmVkSGVpZ2h0KChwcmV2aW91cykgPT4gKE1hdGguYWJzKHByZXZpb3VzIC0gbmV4dEhlaWdodCkgPCAxID8gcHJldmlvdXMgOiBuZXh0SGVpZ2h0KSk7XG4gIH0pO1xuXG4gIGNvbnN0IHNjaGVkdWxlTWVhc3VyZSA9IHVzZUVmZmVjdEV2ZW50KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lUmVmLmN1cnJlbnQgIT09IG51bGwpIHtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50KTtcbiAgICB9XG5cbiAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBhbmltYXRpb25GcmFtZVJlZi5jdXJyZW50ID0gbnVsbDtcbiAgICAgIG1lYXN1cmVIZWlnaHQoKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICBtZWFzdXJlSGVpZ2h0KCk7XG5cbiAgICBpZiAodHlwZW9mIFJlc2l6ZU9ic2VydmVyID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG4gICAgY29uc3Qgd3JhcHBlciA9IHdyYXBwZXJSZWYuY3VycmVudDtcbiAgICBpZiAoIXdyYXBwZXIpIHJldHVybjtcblxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICAgIHNjaGVkdWxlTWVhc3VyZSgpO1xuICAgIH0pO1xuXG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh3cmFwcGVyKTtcbiAgICByZXR1cm4gKCkgPT4gb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICB9LCBbXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xuXG4gICAgY29uc3QgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xuICAgICAgc2NoZWR1bGVNZWFzdXJlKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIGhhbmRsZVJlc2l6ZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwib3JpZW50YXRpb25jaGFuZ2VcIiwgaGFuZGxlUmVzaXplKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBoYW5kbGVSZXNpemUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJvcmllbnRhdGlvbmNoYW5nZVwiLCBoYW5kbGVSZXNpemUpO1xuXG4gICAgICBpZiAoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCAhPT0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVSZWYuY3VycmVudCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiB7XG4gICAgcmVzZXJ2ZWRIZWlnaHQsXG4gICAgd3JhcHBlclJlZixcbiAgfTtcbn07XG4iLCAiXHVGRUZGaW1wb3J0IHsgQXBpRmV0Y2hFcnJvciB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9hcGlTZXJ2aWNlLnRzXCI7XG5pbXBvcnQgdHlwZSB7XG4gIEV4cGVuc2VHYXN0b1R5cGVDb2RlLFxuICBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCxcbiAgRXhwZW5zZVNoZWV0RHJhZnRSZXNwb25zZSxcbiAgRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0LFxufSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHsgdG9FeHBlbnNlQXBpRGRNbVl5eXkgfSBmcm9tIFwiLi4vdXRpbHMvZXhwZW5zZUFwaURhdGVVdGlscy50c1wiO1xuXG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSA9IFwiaW5kLWV4cGVuc2UtdGlja2V0LWltYWdlLXYxXCI7XG5jb25zdCBUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYID0gXCIvX19pbmRfY2FjaGVfXy90aWNrZXQtaW1hZ2UvXCI7XG5jb25zdCBUSUNLRVRfVFJBQ0VfU1RPUkFHRV9LRVkgPSBcImV4cGVuc2Vfc2hlZXRfdGlja2V0X3F1aWNrX2Zsb3dfdHJhY2VfdjFcIjtcblxuZXhwb3J0IGNvbnN0IE1BWF9USUNLRVRfSU1BR0VfU0laRV9CWVRFUyA9IDUwICogMTAyNCAqIDEwMjQ7XG5leHBvcnQgY29uc3QgVElDS0VUX0lNQUdFX0FDQ0VQVF9BVFRSSUJVVEUgPVxuICBcIi5qcGcsLmpwZWcsLnBuZywud2VicCxpbWFnZS9qcGVnLGltYWdlL3BqcGVnLGltYWdlL3BuZyxpbWFnZS93ZWJwXCI7XG5jb25zdCBBTExPV0VEX1RJQ0tFVF9JTUFHRV9NSU1FX1RZUEVTID0gbmV3IFNldDxzdHJpbmc+KFtcImltYWdlL2pwZWdcIiwgXCJpbWFnZS9wanBlZ1wiLCBcImltYWdlL3BuZ1wiLCBcImltYWdlL3dlYnBcIl0pO1xuY29uc3QgQUxMT1dFRF9USUNLRVRfSU1BR0VfRVhURU5TSU9OUyA9IG5ldyBTZXQ8c3RyaW5nPihbXCJqcGdcIiwgXCJqcGVnXCIsIFwicG5nXCIsIFwid2VicFwiXSk7XG5jb25zdCBUSUNLRVRfTUlNRV9UT19FWFRFTlNJT046IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIFwiaW1hZ2UvanBlZ1wiOiBcImpwZ1wiLFxuICBcImltYWdlL3BqcGVnXCI6IFwianBnXCIsXG4gIFwiaW1hZ2UvanBnXCI6IFwianBnXCIsXG4gIFwiaW1hZ2UvcG5nXCI6IFwicG5nXCIsXG4gIFwiaW1hZ2Uvd2VicFwiOiBcIndlYnBcIixcbn07XG5jb25zdCBBTExPV0VEX1RJQ0tFVF9HQVNUT19UWVBFUyA9IG5ldyBTZXQ8bnVtYmVyPihbMCwgMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgMTRdKTtcbmNvbnN0IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEUgPSA4O1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfQ1JFQVRFX01PREUgPSBcIm1hbnVhbFwiIGFzIFwiaWFcIiB8IFwibWFudWFsXCI7XG5cbmV4cG9ydCB0eXBlIFRpY2tldEltYWdlU291cmNlID0gXCJjYW1lcmFcIiB8IFwiZ2FsbGVyeVwiO1xuXG5leHBvcnQgdHlwZSBUaWNrZXRUcmFjZUVudHJ5ID0ge1xuICBzdGVwOiBzdHJpbmc7XG4gIHRyYWNlSWQ6IHN0cmluZztcbiAgYXQ6IHN0cmluZztcbn07XG5cbnR5cGUgTm9ybWFsaXplZERyYWZ0TGluZSA9IHtcbiAgdHJhbnNEYXRlOiBzdHJpbmc7XG4gIHR5cGVWYWx1ZTogbnVtYmVyO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBxdHk6IG51bWJlcjtcbiAgcHJpY2U6IG51bWJlcjtcbiAgdG90YWxBbW91bnQ6IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIE5vcm1hbGl6ZWREcmFmdCA9IHtcbiAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgY3VycmVuY3lDb2RlOiBzdHJpbmc7XG4gIHRvdGFsQW1vdW50OiBudW1iZXI7XG4gIHRyYW5zRGF0ZTogc3RyaW5nO1xuICBjb21lbnRhcmlvOiBzdHJpbmc7XG4gIGdhc3RvVHlwZTogbnVtYmVyIHwgbnVsbDtcbiAgbGluZXM6IE5vcm1hbGl6ZWREcmFmdExpbmVbXTtcbn07XG5cbmV4cG9ydCB0eXBlIFBlbmRpbmdVcGxvYWRSZXRyeSA9XG4gIHwge1xuICAgICAgc3RyYXRlZ3k6IFwiaWEtcmVhZHlcIjtcbiAgICAgIGZpbGVJZDogc3RyaW5nO1xuICAgICAgZXh0ZW5zaW9uOiBzdHJpbmc7XG4gICAgICBjYWNoZUtleTogc3RyaW5nO1xuICAgICAgZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdDtcbiAgICAgIGZpbGVOYW1lSGludDogc3RyaW5nO1xuICAgIH1cbiAgfCB7XG4gICAgICBzdHJhdGVneTogXCJtYW51YWwtcG9zdC11cGxvYWQtZHJhZnRcIjtcbiAgICAgIGZpbGVJZDogc3RyaW5nO1xuICAgICAgZXh0ZW5zaW9uOiBzdHJpbmc7XG4gICAgICBjYWNoZUtleTogc3RyaW5nO1xuICAgICAgZmlsZU5hbWVIaW50OiBzdHJpbmc7XG4gICAgfTtcblxuZXhwb3J0IHR5cGUgVXBsb2FkU3luY1Jlc3VsdCA9IHtcbiAgdXJsRmlsZTogc3RyaW5nO1xuICBmaWxlTmFtZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncyA9IHtcbiAgc2hlZXRJZD86IHN0cmluZztcbiAgcHJvamVjdElkPzogc3RyaW5nO1xuICBjdXJyZW5jeUNvZGU/OiBzdHJpbmc7XG4gIGF4VXNlcklkT3ZlcnJpZGU/OiBzdHJpbmc7XG4gIGNhbkNyZWF0ZUV4cGVuc2U6IGJvb2xlYW47XG4gIGlzQ3JlYXRlTW9kZTogYm9vbGVhbjtcbiAgaXNTaGVldExvY2tlZDogYm9vbGVhbjtcbiAgbGlua1RvU2hlZXQ/OiBib29sZWFuO1xuICBvbkZvcmJpZGRlbjogKCkgPT4gdm9pZDtcbiAgb25Db21wbGV0ZWQ/OiAocmVzdWx0OiB7IGZpbGVJZDogc3RyaW5nOyBsaW5rZWRUb1NoZWV0OiBib29sZWFuIH0pID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgdHlwZSBRdWlja0Zsb3dQcm9ncmVzc0tleSA9XG4gIHwgXCJ1cGxvYWRpbmdJbWFnZVwiXG4gIHwgXCJjcmVhdGluZ1RpY2tldFwiXG4gIHwgXCJzeW5jaW5nRmlsZVwiXG4gIHwgXCJmaW5hbGl6aW5nSWFcIlxuICB8IFwibGlua2luZ0V4cGVuc2VMaW5lXCJcbiAgfCBcImRvbmVcIjtcblxuY29uc3QgYXNSZWNvcmQgPSAodmFsdWU6IHVua25vd24pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9PiB7XG4gIGlmICghdmFsdWUgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKSByZXR1cm4ge307XG4gIHJldHVybiB2YWx1ZSBhcyBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPjtcbn07XG5cbmNvbnN0IGdldEZpcnN0RGVmaW5lZCA9IChyZWNvcmQ6IFJlY29yZDxzdHJpbmcsIHVua25vd24+LCBrZXlzOiBzdHJpbmdbXSk6IHVua25vd24gPT4ge1xuICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgaWYgKGtleSBpbiByZWNvcmQpIHtcbiAgICAgIHJldHVybiByZWNvcmRba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IHRvTnVtYmVyID0gKHZhbHVlOiB1bmtub3duKTogbnVtYmVyIHwgbnVsbCA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbDtcbiAgY29uc3QgcGFyc2VkID0gTnVtYmVyKHZhbHVlKTtcbiAgcmV0dXJuIE51bWJlci5pc0Zpbml0ZShwYXJzZWQpID8gcGFyc2VkIDogbnVsbDtcbn07XG5cbmNvbnN0IHRvUG9zaXRpdmVOdW1iZXIgPSAodmFsdWU6IHVua25vd24pOiBudW1iZXIgfCBudWxsID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdG9OdW1iZXIodmFsdWUpO1xuICByZXR1cm4gcGFyc2VkICE9PSBudWxsICYmIHBhcnNlZCA+IDAgPyBwYXJzZWQgOiBudWxsO1xufTtcblxuY29uc3QgdG9EZE1tWXl5eSA9ICh2YWx1ZTogdW5rbm93bik6IHN0cmluZyA9PiB7XG4gIHJldHVybiB0b0V4cGVuc2VBcGlEZE1tWXl5eSh2YWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VG9kYXlEZE1tWXl5eSA9ICgpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gdG9EZE1tWXl5eShuZXcgRGF0ZSgpKTtcbn07XG5cbmNvbnN0IG5vcm1hbGl6ZUdhc3RvVHlwZSA9ICh2YWx1ZTogdW5rbm93bik6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0b051bWJlcih2YWx1ZSk7XG4gIGlmIChwYXJzZWQgPT09IG51bGwgfHwgIU51bWJlci5pc0ludGVnZXIocGFyc2VkKSB8fCAhQUxMT1dFRF9USUNLRVRfR0FTVE9fVFlQRVMuaGFzKHBhcnNlZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gcGFyc2VkO1xufTtcblxuY29uc3Qgbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24gPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWQgPSBzYWZlVGV4dCh2YWx1ZSkudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtejAtOV0vZywgXCJcIik7XG4gIGlmICghbm9ybWFsaXplZCkgcmV0dXJuIFwiXCI7XG4gIGlmIChub3JtYWxpemVkID09PSBcImpwZWdcIikgcmV0dXJuIFwianBnXCI7XG4gIHJldHVybiBBTExPV0VEX1RJQ0tFVF9JTUFHRV9FWFRFTlNJT05TLmhhcyhub3JtYWxpemVkKSA/IG5vcm1hbGl6ZWQgOiBcIlwiO1xufTtcblxuY29uc3QgcmVzb2x2ZUV4dGVuc2lvbkZyb21GaWxlTmFtZSA9IChmaWxlOiBGaWxlKTogc3RyaW5nID0+IHtcbiAgY29uc3QgZnJvbU5hbWUgPSBzYWZlVGV4dChmaWxlLm5hbWUpLnNwbGl0KFwiLlwiKS5wb3AoKSB8fCBcIlwiO1xuICByZXR1cm4gbm9ybWFsaXplSW1hZ2VFeHRlbnNpb24oZnJvbU5hbWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGluZmVyRXh0ZW5zaW9uID0gKGZpbGU6IEZpbGUpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB0eXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBmcm9tTWltZSA9IFRJQ0tFVF9NSU1FX1RPX0VYVEVOU0lPTlt0eXBlXTtcbiAgaWYgKGZyb21NaW1lKSByZXR1cm4gZnJvbU1pbWU7XG5cbiAgY29uc3QgZnJvbU5hbWUgPSByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lKGZpbGUpO1xuICBpZiAoZnJvbU5hbWUpIHJldHVybiBmcm9tTmFtZTtcblxuICByZXR1cm4gXCJqcGdcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1N1cHBvcnRlZFRpY2tldEltYWdlRmlsZSA9IChmaWxlOiBGaWxlKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5vcm1hbGl6ZWRUeXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAobm9ybWFsaXplZFR5cGUgJiYgQUxMT1dFRF9USUNLRVRfSU1BR0VfTUlNRV9UWVBFUy5oYXMobm9ybWFsaXplZFR5cGUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBjb25zdCBleHRlbnNpb24gPSByZXNvbHZlRXh0ZW5zaW9uRnJvbUZpbGVOYW1lKGZpbGUpO1xuICByZXR1cm4gISFleHRlbnNpb247XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVJhbmRvbUtleSA9ICgpOiBzdHJpbmcgPT4ge1xuICBpZiAodHlwZW9mIGNyeXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgY3J5cHRvLnJhbmRvbVVVSUQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBjcnlwdG8ucmFuZG9tVVVJRCgpO1xuICB9XG4gIHJldHVybiBgJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDEwKX1gO1xufTtcblxuZXhwb3J0IGNvbnN0IHNhbml0aXplRmlsZU5hbWUgPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGJhc2UgPSBzYWZlVGV4dCh2YWx1ZSkucmVwbGFjZSgvWzw+OlwiL1xcXFx8PypcXHUwMDAwLVxcdTAwMUZdL2csIFwiX1wiKTtcbiAgcmV0dXJuIGJhc2UgfHwgXCJ0aWNrZXQtaW1hZ2VcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBleHRyYWN0VHJhY2VJZEZyb21FcnJvciA9IChlcnJvcjogQXBpRmV0Y2hFcnJvcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHBheWxvYWQgPSBzYWZlVGV4dChlcnJvci5yZXNwb25zZUJvZHkpO1xuICBpZiAoIXBheWxvYWQpIHJldHVybiBcIlwiO1xuICB0cnkge1xuICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKHBheWxvYWQpIGFzIFJlY29yZDxzdHJpbmcsIHVua25vd24+O1xuICAgIGNvbnN0IHRyYWNlSWQgPSBzYWZlVGV4dChqc29uLlRyYWNlSWQgPz8ganNvbi50cmFjZUlkKTtcbiAgICByZXR1cm4gdHJhY2VJZDtcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBub3JtYWxpemVEcmFmdEZyb21JYVJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBOb3JtYWxpemVkRHJhZnQgPT4ge1xuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XG4gIGNvbnN0IGRyYWZ0RGVzY3JpcHRpb24gPSBzYWZlVGV4dChnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZGVzY3JpcHRpb25cIiwgXCJEZXNjcmlwdGlvblwiXSkpO1xuICBjb25zdCBkcmFmdEN1cnJlbmN5ID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcImN1cnJlbmN5Q29kZVwiLCBcIkN1cnJlbmN5Q29kZVwiXSkpLnRvVXBwZXJDYXNlKCk7XG4gIGNvbnN0IGRyYWZ0VG90YWxBbW91bnQgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcbiAgY29uc3QgZHJhZnRUcmFuc0RhdGUgPSB0b0RkTW1ZeXl5KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJ0cmFuc0RhdGVcIiwgXCJUcmFuc0RhdGVcIl0pKSB8fCBnZXRUb2RheURkTW1ZeXl5KCk7XG4gIGNvbnN0IGRyYWZ0Q29tbWVudCA9IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJjb21lbnRhcmlvXCIsIFwiQ29tZW50YXJpb1wiXSkpO1xuICBjb25zdCBkcmFmdEdhc3RvVHlwZSA9IG5vcm1hbGl6ZUdhc3RvVHlwZShnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wiZ2FzdG9UeXBlXCIsIFwiR2FzdG9UeXBlXCJdKSk7XG5cbiAgY29uc3QgcmF3TGluZXMgPSBnZXRGaXJzdERlZmluZWQoZGF0YSwgW1wibGluZXNcIiwgXCJMaW5lc1wiXSk7XG4gIGNvbnN0IGxpbmVBcnJheSA9IEFycmF5LmlzQXJyYXkocmF3TGluZXMpID8gcmF3TGluZXMgOiBbXTtcblxuICBjb25zdCBsaW5lczogTm9ybWFsaXplZERyYWZ0TGluZVtdID0gbGluZUFycmF5XG4gICAgLm1hcCgoZW50cnkpID0+IHtcbiAgICAgIGNvbnN0IGxpbmVSZWNvcmQgPSBhc1JlY29yZChlbnRyeSk7XG4gICAgICBjb25zdCBxdHkgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJxdHlcIiwgXCJRdHlcIl0pKSB8fCAxO1xuICAgICAgY29uc3QgcHJpY2UgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJwcmljZVwiLCBcIlByaWNlXCJdKSkgfHwgMDtcbiAgICAgIGNvbnN0IGV4cGxpY2l0VG90YWwgPSB0b1Bvc2l0aXZlTnVtYmVyKGdldEZpcnN0RGVmaW5lZChsaW5lUmVjb3JkLCBbXCJ0b3RhbEFtb3VudFwiLCBcIlRvdGFsQW1vdW50XCJdKSkgfHwgMDtcbiAgICAgIGNvbnN0IGNvbXB1dGVkVG90YWwgPSBleHBsaWNpdFRvdGFsID4gMCA/IGV4cGxpY2l0VG90YWwgOiBxdHkgKiBwcmljZTtcbiAgICAgIGlmICghKGNvbXB1dGVkVG90YWwgPiAwKSkgcmV0dXJuIG51bGw7XG5cbiAgICAgIGNvbnN0IGNhbmRpZGF0ZVR5cGVWYWx1ZSA9IHRvUG9zaXRpdmVOdW1iZXIoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcInR5cGVWYWx1ZVwiLCBcIlR5cGVWYWx1ZVwiXSkpO1xuICAgICAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlci5pc0ludGVnZXIoY2FuZGlkYXRlVHlwZVZhbHVlKSA/IE51bWJlcihjYW5kaWRhdGVUeXBlVmFsdWUpIDogbnVsbDtcbiAgICAgIGNvbnN0IHR5cGVWYWx1ZSA9IHNhZmVUeXBlVmFsdWUgJiYgc2FmZVR5cGVWYWx1ZSA+IDAgPyBzYWZlVHlwZVZhbHVlIDogZHJhZnRHYXN0b1R5cGUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGxpbmVSZWNvcmQsIFtcImRlc2NyaXB0aW9uXCIsIFwiRGVzY3JpcHRpb25cIl0pKSB8fCBkcmFmdERlc2NyaXB0aW9uO1xuICAgICAgY29uc3QgdHJhbnNEYXRlID0gdG9EZE1tWXl5eShnZXRGaXJzdERlZmluZWQobGluZVJlY29yZCwgW1widHJhbnNEYXRlXCIsIFwiVHJhbnNEYXRlXCJdKSkgfHwgZHJhZnRUcmFuc0RhdGU7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRyYW5zRGF0ZSxcbiAgICAgICAgdHlwZVZhbHVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICAgICAgcXR5LFxuICAgICAgICBwcmljZTogcHJpY2UgPiAwID8gcHJpY2UgOiBjb21wdXRlZFRvdGFsLFxuICAgICAgICB0b3RhbEFtb3VudDogY29tcHV0ZWRUb3RhbCxcbiAgICAgIH07XG4gICAgfSlcbiAgICAuZmlsdGVyKChlbnRyeSk6IGVudHJ5IGlzIE5vcm1hbGl6ZWREcmFmdExpbmUgPT4gZW50cnkgIT09IG51bGwpO1xuXG4gIHJldHVybiB7XG4gICAgZGVzY3JpcHRpb246IGRyYWZ0RGVzY3JpcHRpb24gfHwgXCJUaWNrZXRcIixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0Q3VycmVuY3kgfHwgXCJFVVJcIixcbiAgICB0b3RhbEFtb3VudDogZHJhZnRUb3RhbEFtb3VudCA+IDAgPyBkcmFmdFRvdGFsQW1vdW50IDogbGluZXMucmVkdWNlKChzdW0sIGxpbmUpID0+IHN1bSArIGxpbmUudG90YWxBbW91bnQsIDApLFxuICAgIHRyYW5zRGF0ZTogZHJhZnRUcmFuc0RhdGUsXG4gICAgY29tZW50YXJpbzogZHJhZnRDb21tZW50LFxuICAgIGdhc3RvVHlwZTogZHJhZnRHYXN0b1R5cGUsXG4gICAgbGluZXMsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVRpY2tldEZpbGVJZEZyb21EcmFmdFJlc3BvbnNlID0gKHJhd0RhdGE6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkYXRhID0gYXNSZWNvcmQocmF3RGF0YSk7XG4gIGNvbnN0IGNyZWF0aW9uUmF3ID0gZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlRpY2tldENyZWF0aW9uXCIsIFwidGlja2V0Q3JlYXRpb25cIl0pO1xuICBjb25zdCBjcmVhdGlvbiA9IGFzUmVjb3JkKGNyZWF0aW9uUmF3KTtcbiAgcmV0dXJuIHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChjcmVhdGlvbiwgW1wiRmlsZUlkXCIsIFwiZmlsZUlkXCJdKSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVzb2x2ZVVwbG9hZFJlc3VsdCA9IChyZXNwb25zZURhdGE6IHVua25vd24pOiBVcGxvYWRTeW5jUmVzdWx0ID0+IHtcbiAgY29uc3QgZGF0YSA9IGFzUmVjb3JkKHJlc3BvbnNlRGF0YSk7XG4gIHJldHVybiB7XG4gICAgdXJsRmlsZTogc2FmZVRleHQoZ2V0Rmlyc3REZWZpbmVkKGRhdGEsIFtcIlVybEZpbGVcIiwgXCJ1cmxGaWxlXCJdKSksXG4gICAgZmlsZU5hbWU6IHNhZmVUZXh0KGdldEZpcnN0RGVmaW5lZChkYXRhLCBbXCJGaWxlTmFtZVwiLCBcImZpbGVOYW1lXCJdKSksXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRUaWNrZXRJYVBheWxvYWQgPSAoZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCwgdXBsb2FkOiBVcGxvYWRTeW5jUmVzdWx0KTogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0+IHtcbiAgY29uc3QgaWFMaW5lcyA9IGRyYWZ0LmxpbmVzLm1hcCgobGluZSkgPT4gKHtcbiAgICBkZXNjcmlwdGlvbjogbGluZS5kZXNjcmlwdGlvbixcbiAgICBxdHk6IGxpbmUucXR5LFxuICAgIHByaWNlOiBsaW5lLnByaWNlLFxuICAgIHRvdGFsQW1vdW50OiBsaW5lLnRvdGFsQW1vdW50LFxuICB9KSk7XG5cbiAgY29uc3QgcGF5bG9hZDogRXhwZW5zZVNoZWV0VGlja2V0SWFSZXF1ZXN0ID0ge1xuICAgIGRlc2NyaXB0aW9uOiBkcmFmdC5kZXNjcmlwdGlvbixcbiAgICBjdXJyZW5jeUNvZGU6IGRyYWZ0LmN1cnJlbmN5Q29kZSxcbiAgICB0b3RhbEFtb3VudDogZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiB1bmRlZmluZWQsXG4gICAgdHJhbnNEYXRlOiBkcmFmdC50cmFuc0RhdGUsXG4gICAgY29tZW50YXJpbzogZHJhZnQuY29tZW50YXJpbyB8fCB1bmRlZmluZWQsXG4gICAgdXJsRmlsZTogdXBsb2FkLnVybEZpbGUgfHwgdW5kZWZpbmVkLFxuICAgIGZpbGVOYW1lOiB1cGxvYWQuZmlsZU5hbWUgfHwgdW5kZWZpbmVkLFxuICAgIGxpbmVzOiBpYUxpbmVzLFxuICB9O1xuXG4gIGlmIChkcmFmdC5nYXN0b1R5cGUgIT09IG51bGwpIHtcbiAgICBwYXlsb2FkLmdhc3RvVHlwZSA9IGRyYWZ0Lmdhc3RvVHlwZSBhcyBFeHBlbnNlR2FzdG9UeXBlQ29kZTtcbiAgfVxuXG4gIHJldHVybiBwYXlsb2FkO1xufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkU2hlZXRMaW5lUGF5bG9hZCA9IChcbiAgZHJhZnQ6IE5vcm1hbGl6ZWREcmFmdCxcbiAgZmlsZUlkOiBzdHJpbmcsXG4gIHByb2plY3RJZDogc3RyaW5nXG4pOiBFeHBlbnNlU2hlZXRDcmVhdGVMaW5lUmVxdWVzdCB8IG51bGwgPT4ge1xuICBjb25zdCBsaW5lRnJvbURyYWZ0ID0gZHJhZnQubGluZXNbMF07XG4gIC8vIEJ1aWxkIGEgc2luZ2xlIGV4cGVuc2UgbGluZSBmcm9tIHRpY2tldCBoZWFkZXIgZGF0YSB0byBhdm9pZCBsaW5lLWxldmVsIGRlc2NyaXB0aW9uIGxlYWthZ2UuXG4gIGNvbnN0IGhlYWRlclRvdGFsID0gZHJhZnQudG90YWxBbW91bnQgPiAwID8gZHJhZnQudG90YWxBbW91bnQgOiAwO1xuICBjb25zdCBmYWxsYmFja1RvdGFsID0gbGluZUZyb21EcmFmdD8udG90YWxBbW91bnQgfHwgMDtcbiAgY29uc3QgZWZmZWN0aXZlVG90YWwgPSBoZWFkZXJUb3RhbCA+IDAgPyBoZWFkZXJUb3RhbCA6IGZhbGxiYWNrVG90YWw7XG4gIGlmICghKGVmZmVjdGl2ZVRvdGFsID4gMCkpIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IHR5cGVWYWx1ZUNhbmRpZGF0ZSA9IGRyYWZ0Lmdhc3RvVHlwZSB8fCBsaW5lRnJvbURyYWZ0Py50eXBlVmFsdWUgfHwgREVGQVVMVF9USUNLRVRfR0FTVE9fVFlQRTtcbiAgY29uc3Qgc2FmZVR5cGVWYWx1ZSA9IE51bWJlcih0eXBlVmFsdWVDYW5kaWRhdGUpO1xuICBjb25zdCB0eXBlVmFsdWUgPSBOdW1iZXIuaXNJbnRlZ2VyKHNhZmVUeXBlVmFsdWUpICYmIHNhZmVUeXBlVmFsdWUgPiAwID8gc2FmZVR5cGVWYWx1ZSA6IERFRkFVTFRfVElDS0VUX0dBU1RPX1RZUEU7XG5cbiAgcmV0dXJuIHtcbiAgICB0cmFuc0RhdGU6IGRyYWZ0LnRyYW5zRGF0ZSB8fCBsaW5lRnJvbURyYWZ0Py50cmFuc0RhdGUgfHwgZ2V0VG9kYXlEZE1tWXl5eSgpLFxuICAgIHR5cGVWYWx1ZSxcbiAgICBkZXNjcmlwdGlvbjogc2FmZVRleHQoZHJhZnQuZGVzY3JpcHRpb24pIHx8IFwiVGlja2V0XCIsXG4gICAgaW50ZXJuYWNpb25hbDogZmFsc2UsXG4gICAgZmlsZUlkLFxuICAgIHRpY2tldDogdHJ1ZSxcbiAgICBxdHk6IDEsXG4gICAgcHJpY2U6IGVmZmVjdGl2ZVRvdGFsLFxuICAgIHByb2pJZDogc2FmZVRleHQocHJvamVjdElkKSB8fCB1bmRlZmluZWQsXG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgcGVyc2lzdFRyYWNlTGlzdCA9ICh0cmFjZUxpc3Q6IFRpY2tldFRyYWNlRW50cnlbXSk6IHZvaWQgPT4ge1xuICB0cnkge1xuICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oVElDS0VUX1RSQUNFX1NUT1JBR0VfS0VZLCBKU09OLnN0cmluZ2lmeSh0cmFjZUxpc3QpKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gSWdub3JlIHN0b3JhZ2UgZmFpbHVyZXMgaW4gcmVzdHJpY3RlZCBicm93c2VyIGNvbnRleHRzLlxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgY2FjaGVJbWFnZUZpbGUgPSBhc3luYyAoY2FjaGVLZXk6IHN0cmluZywgZmlsZTogRmlsZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuO1xuICBjb25zdCBjYWNoZSA9IGF3YWl0IGNhY2hlcy5vcGVuKFRJQ0tFVF9JTUFHRV9DQUNIRV9OQU1FKTtcbiAgY29uc3QgcmVxdWVzdFVybCA9IGAke1RJQ0tFVF9JTUFHRV9DQUNIRV9QUkVGSVh9JHtlbmNvZGVVUklDb21wb25lbnQoY2FjaGVLZXkpfWA7XG4gIGF3YWl0IGNhY2hlLnB1dChcbiAgICBuZXcgUmVxdWVzdChyZXF1ZXN0VXJsKSxcbiAgICBuZXcgUmVzcG9uc2UoZmlsZSwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBzYWZlVGV4dChmaWxlLnR5cGUpIHx8IFwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsXG4gICAgICB9LFxuICAgIH0pXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVhZENhY2hlZEltYWdlRmlsZSA9IGFzeW5jIChjYWNoZUtleTogc3RyaW5nKTogUHJvbWlzZTxCbG9iIHwgbnVsbD4gPT4ge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJ1bmRlZmluZWRcIiB8fCAhKFwiY2FjaGVzXCIgaW4gd2luZG93KSkgcmV0dXJuIG51bGw7XG4gIGNvbnN0IGNhY2hlID0gYXdhaXQgY2FjaGVzLm9wZW4oVElDS0VUX0lNQUdFX0NBQ0hFX05BTUUpO1xuICBjb25zdCByZXF1ZXN0VXJsID0gYCR7VElDS0VUX0lNQUdFX0NBQ0hFX1BSRUZJWH0ke2VuY29kZVVSSUNvbXBvbmVudChjYWNoZUtleSl9YDtcbiAgY29uc3QgY2FjaGVkUmVzcG9uc2UgPSBhd2FpdCBjYWNoZS5tYXRjaChyZXF1ZXN0VXJsKTtcbiAgaWYgKCFjYWNoZWRSZXNwb25zZSkgcmV0dXJuIG51bGw7XG4gIHJldHVybiBjYWNoZWRSZXNwb25zZS5ibG9iKCk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2FjaGVkSW1hZ2VGaWxlID0gYXN5bmMgKGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIShcImNhY2hlc1wiIGluIHdpbmRvdykpIHJldHVybjtcbiAgY29uc3QgY2FjaGUgPSBhd2FpdCBjYWNoZXMub3BlbihUSUNLRVRfSU1BR0VfQ0FDSEVfTkFNRSk7XG4gIGNvbnN0IHJlcXVlc3RVcmwgPSBgJHtUSUNLRVRfSU1BR0VfQ0FDSEVfUFJFRklYfSR7ZW5jb2RlVVJJQ29tcG9uZW50KGNhY2hlS2V5KX1gO1xuICBhd2FpdCBjYWNoZS5kZWxldGUocmVxdWVzdFVybCk7XG59O1xuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VNZW1vLCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBBcGlGZXRjaEVycm9yIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2FwaVNlcnZpY2UudHNcIjtcbmltcG9ydCB7IGluZEZvcm1hdCwgaW5kVCB9IGZyb20gXCIuLi8uLi8uLi91dGlscy9pbmRJMThuLnRzXCI7XG5pbXBvcnQgeyBmbGFzaEFjdGlvbk1hcmsgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdmlzaXRhc0hpc3RvcnkudHNcIjtcbmltcG9ydCB0eXBlIHsgRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQgfSBmcm9tIFwiLi4vZXhwZW5zZVR5cGVzLnRzXCI7XG5pbXBvcnQgeyBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlQXBpLnRzXCI7XG5pbXBvcnQgeyBzYWZlVGV4dCB9IGZyb20gXCIuLi91dGlscy9leHBlbnNlVWlVdGlscy50c1wiO1xuaW1wb3J0IHtcbiAgTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTLFxuICBjYWNoZUltYWdlRmlsZSxcbiAgZXh0cmFjdFRyYWNlSWRGcm9tRXJyb3IsXG4gIGlzU3VwcG9ydGVkVGlja2V0SW1hZ2VGaWxlLFxuICBwZXJzaXN0VHJhY2VMaXN0LFxuICByZW1vdmVDYWNoZWRJbWFnZUZpbGUsXG4gIHJlc29sdmVSYW5kb21LZXksXG4gIHR5cGUgUXVpY2tGbG93UHJvZ3Jlc3NLZXksXG4gIHR5cGUgVGlja2V0SW1hZ2VTb3VyY2UsXG4gIHR5cGUgVGlja2V0VHJhY2VFbnRyeSxcbiAgdHlwZSBVc2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dBcmdzLFxufSBmcm9tIFwiLi91c2VFeHBlbnNlU2hlZXRRdWlja1RpY2tldEZsb3dDb3JlLnRzXCI7XG5cbnR5cGUgUXVpY2tDcmVhdGVQYXJ0aWFsVGlja2V0U3RhdGUgPSB7XG4gIGZpbGVJZDogc3RyaW5nO1xuICBsaW5rZWRUb1NoZWV0OiBib29sZWFuO1xuICBjb21wbGV0ZWRTdGFnZTogc3RyaW5nO1xuICB1cmxGaWxlOiBzdHJpbmc7XG4gIGZpbGVOYW1lOiBzdHJpbmc7XG4gIHByb2Nlc3NlZEJ5QUk6IGJvb2xlYW4gfCBudWxsO1xufTtcblxuY29uc3QgZm9ybWF0VmFsaWRhdGlvbkVycm9ycyA9IChcbiAgZXJyb3JzOiBBcnJheTx7IEZpZWxkPzogdW5rbm93bjsgTWVzc2FnZT86IHVua25vd24gfSB8IG51bGwgfCB1bmRlZmluZWQ+IHwgbnVsbCB8IHVuZGVmaW5lZFxuKTogc3RyaW5nID0+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGVycm9ycykgfHwgZXJyb3JzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwiXCI7XG5cbiAgcmV0dXJuIGVycm9yc1xuICAgIC5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBmaWVsZCA9IHNhZmVUZXh0KGVudHJ5Py5GaWVsZCk7XG4gICAgICBjb25zdCBtZXNzYWdlID0gc2FmZVRleHQoZW50cnk/Lk1lc3NhZ2UpO1xuICAgICAgaWYgKGZpZWxkICYmIG1lc3NhZ2UpIHJldHVybiBgJHtmaWVsZH06ICR7bWVzc2FnZX1gO1xuICAgICAgcmV0dXJuIG1lc3NhZ2UgfHwgZmllbGQ7XG4gICAgfSlcbiAgICAuZmlsdGVyKEJvb2xlYW4pXG4gICAgLmpvaW4oXCIgfCBcIik7XG59O1xuXG5leHBvcnQgY29uc3QgdXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93ID0gKHtcbiAgc2hlZXRJZCA9IFwiXCIsXG4gIHByb2plY3RJZCA9IFwiXCIsXG4gIGN1cnJlbmN5Q29kZSA9IFwiXCIsXG4gIGF4VXNlcklkT3ZlcnJpZGUgPSBcIlwiLFxuICBjYW5DcmVhdGVFeHBlbnNlLFxuICBpc0NyZWF0ZU1vZGUsXG4gIGlzU2hlZXRMb2NrZWQsXG4gIGxpbmtUb1NoZWV0ID0gdHJ1ZSxcbiAgb25Gb3JiaWRkZW4sXG4gIG9uQ29tcGxldGVkLFxufTogVXNlRXhwZW5zZVNoZWV0UXVpY2tUaWNrZXRGbG93QXJncykgPT4ge1xuICBjb25zdCBbc291cmNlUGlja2VyT3Blbiwgc2V0U291cmNlUGlja2VyT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtidXN5LCBzZXRCdXN5XSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3Byb2dyZXNzS2V5LCBzZXRQcm9ncmVzc0tleV0gPSB1c2VTdGF0ZTxRdWlja0Zsb3dQcm9ncmVzc0tleSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZXJyb3JNZXNzYWdlLCBzZXRFcnJvck1lc3NhZ2VdID0gdXNlU3RhdGUoXCJcIik7XG4gIGNvbnN0IFt0cmFjZUxpc3QsIHNldFRyYWNlTGlzdF0gPSB1c2VTdGF0ZTxUaWNrZXRUcmFjZUVudHJ5W10+KFtdKTtcbiAgY29uc3QgW3BhcnRpYWxUaWNrZXRGYWlsdXJlLCBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZV0gPSB1c2VTdGF0ZTxRdWlja0NyZWF0ZVBhcnRpYWxUaWNrZXRTdGF0ZSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBsYXRlc3RGaWxlUmVmID0gdXNlUmVmPHsgY2FjaGVLZXk6IHN0cmluZzsgZmlsZTogRmlsZSB9IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYgPSB1c2VSZWY8UXVpY2tDcmVhdGVQYXJ0aWFsVGlja2V0U3RhdGUgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBwcm9ncmVzc01lc3NhZ2UgPSB1c2VNZW1vKCgpID0+IHtcbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwidXBsb2FkaW5nSW1hZ2VcIikge1xuICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9TdGF0dXNfVXBsb2FkaW5nSW1hZ2VcIiwgXCJVcGxvYWRpbmcgaW1hZ2UuLi5cIik7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJjcmVhdGluZ1RpY2tldFwiKSB7XG4gICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X1N0YXR1c19DcmVhdGluZ1RpY2tldFwiLCBcIkNyZWF0aW5nIHRpY2tldC4uLlwiKTtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzS2V5ID09PSBcInN5bmNpbmdGaWxlXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX1N5bmNpbmdGaWxlXCIsIFwiU3luY2luZyBmaWxlLi4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwiZmluYWxpemluZ0lhXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0ZpbmFsaXppbmdcIiwgXCJGaW5hbGl6aW5nIElBLi4uXCIpO1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NLZXkgPT09IFwibGlua2luZ0V4cGVuc2VMaW5lXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0xpbmtpbmdMaW5lXCIsIFwiTGlua2luZyBleHBlbnNlIGxpbmUuLi5cIik7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0tleSA9PT0gXCJkb25lXCIpIHtcbiAgICAgIHJldHVybiBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfU3RhdHVzX0RvbmVcIiwgXCJEb25lXCIpO1xuICAgIH1cbiAgICByZXR1cm4gXCJcIjtcbiAgfSwgW3Byb2dyZXNzS2V5XSk7XG5cbiAgY29uc3QgYWRkVHJhY2UgPSB1c2VDYWxsYmFjaygoc3RlcDogc3RyaW5nLCB0cmFjZUlkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBzYWZlVHJhY2VJZCA9IHNhZmVUZXh0KHRyYWNlSWQpO1xuICAgIGlmICghc2FmZVRyYWNlSWQpIHJldHVybjtcblxuICAgIHNldFRyYWNlTGlzdCgocHJldmlvdXMpID0+IHtcbiAgICAgIGNvbnN0IG5leHQgPSBbXG4gICAgICAgIC4uLnByZXZpb3VzLFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcCxcbiAgICAgICAgICB0cmFjZUlkOiBzYWZlVHJhY2VJZCxcbiAgICAgICAgICBhdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICAgIHBlcnNpc3RUcmFjZUxpc3QobmV4dCk7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyQ2FjaGVkQ3VycmVudEltYWdlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGNhY2hlS2V5ID0gbGF0ZXN0RmlsZVJlZi5jdXJyZW50Py5jYWNoZUtleTtcbiAgICBpZiAoIWNhY2hlS2V5KSByZXR1cm47XG4gICAgdm9pZCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpLmNhdGNoKCgpID0+IHtcbiAgICAgIC8vIElnbm9yZSBjYWNoZSBjbGVhbnVwIGZhaWx1cmVzIGluIHJlc3RyaWN0ZWQgYnJvd3NlciBjb250ZXh0cy5cbiAgICB9KTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyRmxvd1N0YXRlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IG51bGw7XG4gICAgc2V0RXJyb3JNZXNzYWdlKFwiXCIpO1xuICAgIHNldFBhcnRpYWxUaWNrZXRGYWlsdXJlKG51bGwpO1xuICAgIHNldFRyYWNlTGlzdChbXSk7XG4gICAgcGVyc2lzdFRyYWNlTGlzdChbXSk7XG4gIH0sIFtdKTtcblxuICAvLyBGb3JjZXMgbXV0YXRpb25zIHRvIGZvbGxvdyB0aGUgcGFnZS1yZXNvbHZlZCBBWCB1c2VyIGluc3RlYWQgb2YgYW55IHN0YWxlIGdsb2JhbCBvdmVycmlkZS5cbiAgY29uc3QgYnVpbGRBcGlPcHRpb25zID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IHNhZmVBeFVzZXJJZCA9IHNhZmVUZXh0KGF4VXNlcklkT3ZlcnJpZGUpO1xuICAgIGlmICghc2FmZUF4VXNlcklkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdXBwcmVzc1Blcm1pc3Npb25Nb2RhbDogdHJ1ZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN1cHByZXNzUGVybWlzc2lvbk1vZGFsOiB0cnVlLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIlgtSU5ELUF4VXNlcklkXCI6IHNhZmVBeFVzZXJJZCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfSwgW2F4VXNlcklkT3ZlcnJpZGVdKTtcblxuICBjb25zdCBlbnN1cmVRdWlja0NyZWF0ZVBlcm1pc3Npb24gPSB1c2VDYWxsYmFjaygoKTogYm9vbGVhbiA9PiB7XG4gICAgaWYgKCFjYW5DcmVhdGVFeHBlbnNlIHx8IGlzQ3JlYXRlTW9kZSB8fCBpc1NoZWV0TG9ja2VkIHx8IChsaW5rVG9TaGVldCAmJiAhc2hlZXRJZCkpIHtcbiAgICAgIG9uRm9yYmlkZGVuKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LCBbY2FuQ3JlYXRlRXhwZW5zZSwgaXNDcmVhdGVNb2RlLCBpc1NoZWV0TG9ja2VkLCBsaW5rVG9TaGVldCwgb25Gb3JiaWRkZW4sIHNoZWV0SWRdKTtcblxuICBjb25zdCByZXNvbHZlVWlFcnJvck1lc3NhZ2UgPSB1c2VDYWxsYmFjaygoZXJyb3I6IHVua25vd24pOiBzdHJpbmcgPT4ge1xuICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFwaUZldGNoRXJyb3IpIHtcbiAgICAgIGNvbnN0IHZhbGlkYXRpb25UZXh0ID0gZm9ybWF0VmFsaWRhdGlvbkVycm9ycyhlcnJvci52YWxpZGF0aW9uRXJyb3JzKTtcbiAgICAgIGlmICh2YWxpZGF0aW9uVGV4dCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGlvblRleHQ7XG4gICAgICB9XG5cbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQyOSkge1xuICAgICAgICByZXR1cm4gc2FmZVRleHQoZXJyb3IubWVzc2FnZSkgfHwgaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1JhdGVMaW1pdFwiLCBcIlRvbyBtYW55IHJlcXVlc3RzLlwiKTtcbiAgICAgIH1cbiAgICAgIGlmIChlcnJvci5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICByZXR1cm4gaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX05vdEZvdW5kXCIsIFwiUmVjb3JkIG5vdCBmb3VuZC5cIik7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3Iuc3RhdHVzID09PSA1MDApIHtcbiAgICAgICAgcmV0dXJuIGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TZXJ2ZXJcIiwgXCJTZXJ2ZXIgZXJyb3IuXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmIHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXG4gICAgICA/IHNhZmVUZXh0KGVycm9yLm1lc3NhZ2UpXG4gICAgICA6IGluZFQoXCJBcGlfUmVxdWVzdEZhaWxlZFwiLCBcIlJlcXVlc3QgZmFpbGVkLlwiKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGFkZFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFjZXMgPSB1c2VDYWxsYmFjayhcbiAgICAocmVzcG9uc2U6IEV4cGVuc2VTaGVldFRpY2tldFF1aWNrQ3JlYXRlUmVzdWx0KSA9PiB7XG4gICAgICBhZGRUcmFjZShcInRpY2tldC1xdWljay1jcmVhdGVcIiwgc2FmZVRleHQocmVzcG9uc2UuVHJhY2VJZCkpO1xuXG4gICAgICBjb25zdCBzdGVwVHJhY2VJZHMgPSByZXNwb25zZS5EYXRhPy5TdGVwVHJhY2VJZHM7XG4gICAgICBhZGRUcmFjZShcInRpY2tldC1jcmVhdGVcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5UaWNrZXRDcmVhdGUpKTtcbiAgICAgIGFkZFRyYWNlKFwidGlja2V0LWZpbGUtdXBsb2FkXCIsIHNhZmVUZXh0KHN0ZXBUcmFjZUlkcz8uRmlsZVVwbG9hZCkpO1xuICAgICAgYWRkVHJhY2UoXCJleHBlbnNlZnJvbXRpY2tldFwiLCBzYWZlVGV4dChzdGVwVHJhY2VJZHM/LkRyYWZ0RXh0cmFjdCkpO1xuICAgICAgYWRkVHJhY2UoXCJ0aWNrZXQtZmluYWxpemVcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5UaWNrZXRGaW5hbGl6ZSkpO1xuICAgICAgYWRkVHJhY2UoXCJleHBlbnNlLXNoZWV0LWxpbmtcIiwgc2FmZVRleHQoc3RlcFRyYWNlSWRzPy5TaGVldExpbmspKTtcbiAgICB9LFxuICAgIFthZGRUcmFjZV1cbiAgKTtcblxuICBjb25zdCByZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZSA9IHVzZUNhbGxiYWNrKChyZXNwb25zZTogRXhwZW5zZVNoZWV0VGlja2V0UXVpY2tDcmVhdGVSZXN1bHQpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5EYXRhO1xuICAgIGNvbnN0IGZpbGVJZCA9IHNhZmVUZXh0KGRhdGE/LkZpbGVJZCk7XG4gICAgY29uc3QgY29tcGxldGVkU3RhZ2UgPSBzYWZlVGV4dChkYXRhPy5Db21wbGV0ZWRTdGFnZSk7XG4gICAgY29uc3QgcmVzcG9uc2VNZXNzYWdlID0gc2FmZVRleHQocmVzcG9uc2UuTWVzc2FnZSk7XG4gICAgY29uc3QgdmFsaWRhdGlvblRleHQgPSBmb3JtYXRWYWxpZGF0aW9uRXJyb3JzKHJlc3BvbnNlLkVycm9ycyk7XG4gICAgY29uc3QgcmV0cnlBZnRlciA9IHNhZmVUZXh0KHJlc3BvbnNlLlJldHJ5QWZ0ZXIpO1xuICAgIGNvbnN0IG1lc3NhZ2VQYXJ0czogc3RyaW5nW10gPSBbXTtcblxuICAgIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA0MjkpIHtcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKHJlc3BvbnNlTWVzc2FnZSB8fCBpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfUmF0ZUxpbWl0XCIsIFwiVG9vIG1hbnkgcmVxdWVzdHMuXCIpKTtcbiAgICAgIGlmIChyZXRyeUFmdGVyKSB7XG4gICAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKFxuICAgICAgICAgIGluZEZvcm1hdChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX1JldHJ5QWZ0ZXJIaW50XCIsIFwiUmV0cnkgYWZ0ZXIgezB9LlwiLCByZXRyeUFmdGVyKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsaWRhdGlvblRleHQpIHtcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKHZhbGlkYXRpb25UZXh0KTtcbiAgICB9IGVsc2UgaWYgKHJlc3BvbnNlTWVzc2FnZSkge1xuICAgICAgbWVzc2FnZVBhcnRzLnB1c2gocmVzcG9uc2VNZXNzYWdlKTtcbiAgICB9IGVsc2UgaWYgKGZpbGVJZCkge1xuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goXG4gICAgICAgIGluZFQoXG4gICAgICAgICAgXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9QYXJ0aWFsXCIsXG4gICAgICAgICAgXCJUaGUgdGlja2V0IHdhcyBjcmVhdGVkLCBidXQgdGhlIGZ1bGwgcHJvY2VzcyBkaWQgbm90IGZpbmlzaC5cIlxuICAgICAgICApXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAocmVzcG9uc2UuSHR0cFN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICBtZXNzYWdlUGFydHMucHVzaChpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm90Rm91bmRcIiwgXCJSZWNvcmQgbm90IGZvdW5kLlwiKSk7XG4gICAgfSBlbHNlIGlmIChyZXNwb25zZS5IdHRwU3RhdHVzID09PSA1MDApIHtcbiAgICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TZXJ2ZXJcIiwgXCJTZXJ2ZXIgZXJyb3IuXCIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZVBhcnRzLnB1c2goaW5kVChcIkFwaV9SZXF1ZXN0RmFpbGVkXCIsIFwiUmVxdWVzdCBmYWlsZWQuXCIpKTtcbiAgICB9XG5cbiAgICBpZiAoZmlsZUlkICYmIGNvbXBsZXRlZFN0YWdlKSB7XG4gICAgICBtZXNzYWdlUGFydHMucHVzaChpbmRGb3JtYXQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9TdGFnZVwiLCBcIkNvbXBsZXRlZCBzdGFnZTogezB9LlwiLCBjb21wbGV0ZWRTdGFnZSkpO1xuICAgIH1cblxuICAgIHJldHVybiBtZXNzYWdlUGFydHMuZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgcnVuUXVpY2tDcmVhdGVGbG93ID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUsIGNhY2hlS2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIHNldEJ1c3kodHJ1ZSk7XG4gICAgICBzZXRQcm9ncmVzc0tleShcImNyZWF0aW5nVGlja2V0XCIpO1xuICAgICAgY2xlYXJGbG93U3RhdGUoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjcmVhdGVFeHBlbnNlU2hlZXRUaWNrZXRRdWljayhcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0aWNrZXRJbWFnZTogZmlsZSxcbiAgICAgICAgICAgIGN1cnJlbmN5Q29kZTogc2FmZVRleHQoY3VycmVuY3lDb2RlKS50b1VwcGVyQ2FzZSgpIHx8IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGV4aXN0aW5nSG9qYUdhc3Rvc0lkOiBsaW5rVG9TaGVldCA/IHNhZmVUZXh0KHNoZWV0SWQpIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHByb2plY3RJZDogbGlua1RvU2hlZXQgPyBzYWZlVGV4dChwcm9qZWN0SWQpIHx8IHVuZGVmaW5lZCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJ1aWxkQXBpT3B0aW9ucygpXG4gICAgICAgICk7XG5cbiAgICAgICAgYWRkUXVpY2tDcmVhdGVSZXNwb25zZVRyYWNlcyhyZXNwb25zZSk7XG5cbiAgICAgICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uRmlsZUlkKTtcbiAgICAgICAgY29uc3QgbGlua2VkVG9TaGVldCA9IHJlc3BvbnNlLkRhdGE/LkxpbmtlZFRvU2hlZXQgPT09IHRydWU7XG4gICAgICAgIGNvbnN0IHBhcnRpYWxTdGF0ZSA9XG4gICAgICAgICAgZmlsZUlkXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBmaWxlSWQsXG4gICAgICAgICAgICAgICAgbGlua2VkVG9TaGVldCxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZWRTdGFnZTogc2FmZVRleHQocmVzcG9uc2UuRGF0YT8uQ29tcGxldGVkU3RhZ2UpLFxuICAgICAgICAgICAgICAgIHVybEZpbGU6IHNhZmVUZXh0KHJlc3BvbnNlLkRhdGE/LlVybEZpbGUpLFxuICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBzYWZlVGV4dChyZXNwb25zZS5EYXRhPy5GaWxlTmFtZSksXG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VkQnlBSTogcmVzcG9uc2UuRGF0YT8uUHJvY2Vzc2VkQnlBSSA/PyBudWxsLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgaWYgKHBhcnRpYWxTdGF0ZSkge1xuICAgICAgICAgIGxhdGVzdENyZWF0ZWRUaWNrZXRSZWYuY3VycmVudCA9IHBhcnRpYWxTdGF0ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXNwb25zZS5TdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgaWYgKCFmaWxlSWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfTm9GaWxlSWRcIiwgXCJDb3VsZCBub3QgcmVzb2x2ZSB0aWNrZXQgZmlsZSBpZC5cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldFByb2dyZXNzS2V5KFwiZG9uZVwiKTtcbiAgICAgICAgICBhd2FpdCByZW1vdmVDYWNoZWRJbWFnZUZpbGUoY2FjaGVLZXkpO1xuICAgICAgICAgIGZsYXNoQWN0aW9uTWFyayhcIm9rUHJvY2Vzc1wiLCAxMjAwKTtcbiAgICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgICBzZXRQcm9ncmVzc0tleShudWxsKTtcbiAgICAgICAgICBvbkNvbXBsZXRlZD8uKHsgZmlsZUlkLCBsaW5rZWRUb1NoZWV0IH0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJ0aWFsU3RhdGUpIHtcbiAgICAgICAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShwYXJ0aWFsU3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNvbHZlUXVpY2tDcmVhdGVGYWlsdXJlTWVzc2FnZShyZXNwb25zZSkpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgQXBpRmV0Y2hFcnJvcikge1xuICAgICAgICAgIGFkZFRyYWNlKFwidGlja2V0LXF1aWNrLWNyZWF0ZS1lcnJvclwiLCBleHRyYWN0VHJhY2VJZEZyb21FcnJvcihlcnJvcikpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmxhc2hBY3Rpb25NYXJrKFwiZXJyb3JQcm9jZXNzXCIsIDE1MDApO1xuICAgICAgICBzZXRCdXN5KGZhbHNlKTtcbiAgICAgICAgc2V0UHJvZ3Jlc3NLZXkobnVsbCk7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShyZXNvbHZlVWlFcnJvck1lc3NhZ2UoZXJyb3IpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtcbiAgICAgIGFkZFF1aWNrQ3JlYXRlUmVzcG9uc2VUcmFjZXMsXG4gICAgICBhZGRUcmFjZSxcbiAgICAgIGJ1aWxkQXBpT3B0aW9ucyxcbiAgICAgIGNsZWFyRmxvd1N0YXRlLFxuICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgbGlua1RvU2hlZXQsXG4gICAgICBvbkNvbXBsZXRlZCxcbiAgICAgIHByb2plY3RJZCxcbiAgICAgIHJlc29sdmVRdWlja0NyZWF0ZUZhaWx1cmVNZXNzYWdlLFxuICAgICAgcmVzb2x2ZVVpRXJyb3JNZXNzYWdlLFxuICAgICAgc2hlZXRJZCxcbiAgICBdXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlU2VsZWN0ZWRGaWxlID0gdXNlQ2FsbGJhY2soXG4gICAgYXN5bmMgKGZpbGU6IEZpbGUgfCBudWxsLCBfc291cmNlOiBUaWNrZXRJbWFnZVNvdXJjZSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgaWYgKCFmaWxlKSByZXR1cm47XG4gICAgICBpZiAoIWVuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbigpKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IHNhZmVUeXBlID0gc2FmZVRleHQoZmlsZS50eXBlKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgaWYgKHNhZmVUeXBlICYmICFzYWZlVHlwZS5zdGFydHNXaXRoKFwiaW1hZ2UvXCIpICYmICEvXFwuKGpwZT9nfHBuZ3x3ZWJwKSQvaS50ZXN0KGZpbGUubmFtZSB8fCBcIlwiKSkge1xuICAgICAgICBzZXRFcnJvck1lc3NhZ2UoaW5kVChcIkV4cGVuc2VTaGVldHNfTmV3VGlja2V0X0Vycm9yX0ZpbGVUeXBlXCIsIFwiVW5zdXBwb3J0ZWQgaW1hZ2UgZm9ybWF0LlwiKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghaXNTdXBwb3J0ZWRUaWNrZXRJbWFnZUZpbGUoZmlsZSkpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9GaWxlVHlwZVwiLCBcIlVuc3VwcG9ydGVkIGltYWdlIGZvcm1hdC5cIikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZmlsZS5zaXplID4gTUFYX1RJQ0tFVF9JTUFHRV9TSVpFX0JZVEVTKSB7XG4gICAgICAgIHNldEVycm9yTWVzc2FnZShpbmRUKFwiRXhwZW5zZVNoZWV0c19OZXdUaWNrZXRfRXJyb3JfRmlsZVNpemVcIiwgXCJJbWFnZSBleGNlZWRzIDUwTUIgbWF4IHNpemUuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjYWNoZUtleSA9IHJlc29sdmVSYW5kb21LZXkoKTtcbiAgICAgIGxhdGVzdEZpbGVSZWYuY3VycmVudCA9IHsgY2FjaGVLZXksIGZpbGUgfTtcbiAgICAgIHZvaWQgY2FjaGVJbWFnZUZpbGUoY2FjaGVLZXksIGZpbGUpLmNhdGNoKCgpID0+IHtcbiAgICAgICAgLy8gRG8gbm90IGJsb2NrIGZsb3cgaWYgYnJvd3NlciBjYWNoZSBzdG9yYWdlIGlzIHVuYXZhaWxhYmxlLlxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHJ1blF1aWNrQ3JlYXRlRmxvdyhmaWxlLCBjYWNoZUtleSk7XG4gICAgfSxcbiAgICBbZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uLCBydW5RdWlja0NyZWF0ZUZsb3ddXG4gICk7XG5cbiAgY29uc3QgcmV0cnlQZW5kaW5nVXBsb2FkID0gdXNlQ2FsbGJhY2soYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybjtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IG9wZW5DcmVhdGVkVGlja2V0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbnN0IGNyZWF0ZWRUaWNrZXQgPSBwYXJ0aWFsVGlja2V0RmFpbHVyZSB8fCBsYXRlc3RDcmVhdGVkVGlja2V0UmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgZmlsZUlkID0gc2FmZVRleHQoY3JlYXRlZFRpY2tldD8uZmlsZUlkKTtcbiAgICBpZiAoIWZpbGVJZCkgcmV0dXJuO1xuXG4gICAgY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2UoKTtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgc2V0UGFydGlhbFRpY2tldEZhaWx1cmUobnVsbCk7XG4gICAgb25Db21wbGV0ZWQ/Lih7IGZpbGVJZCwgbGlua2VkVG9TaGVldDogY3JlYXRlZFRpY2tldD8ubGlua2VkVG9TaGVldCA9PT0gdHJ1ZSB9KTtcbiAgfSwgW2NsZWFyQ2FjaGVkQ3VycmVudEltYWdlLCBvbkNvbXBsZXRlZCwgcGFydGlhbFRpY2tldEZhaWx1cmVdKTtcblxuICBjb25zdCBvcGVuU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghZW5zdXJlUXVpY2tDcmVhdGVQZXJtaXNzaW9uKCkpIHJldHVybjtcbiAgICBzZXRFcnJvck1lc3NhZ2UoXCJcIik7XG4gICAgc2V0UGFydGlhbFRpY2tldEZhaWx1cmUobnVsbCk7XG4gICAgc2V0U291cmNlUGlja2VyT3Blbih0cnVlKTtcbiAgfSwgW2Vuc3VyZVF1aWNrQ3JlYXRlUGVybWlzc2lvbl0pO1xuXG4gIGNvbnN0IGNsb3NlU291cmNlUGlja2VyID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmIChidXN5KSByZXR1cm47XG4gICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XG4gIH0sIFtidXN5XSk7XG5cbiAgY29uc3QgcmVxdWVzdENhbWVyYVBlcm1pc3Npb24gPSB1c2VDYWxsYmFjayhhc3luYyAoKTogUHJvbWlzZTxib29sZWFuIHwgbnVsbD4gPT4ge1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBtZWRpYURldmljZXMgPSBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzO1xuICAgIGlmICghbWVkaWFEZXZpY2VzIHx8IHR5cGVvZiBtZWRpYURldmljZXMuZ2V0VXNlck1lZGlhICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IG1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgICB2aWRlbzogeyBmYWNpbmdNb2RlOiBcImVudmlyb25tZW50XCIgfSxcbiAgICAgIH0pO1xuICAgICAgc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goKHRyYWNrKSA9PiB0cmFjay5zdG9wKCkpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LCBbXSk7XG5cbiAgY29uc3Qgc2VsZWN0RnJvbUNhbWVyYSA9IHVzZUNhbGxiYWNrKFxuICAgIGFzeW5jIChpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgICBpZiAoIWlucHV0RWxlbWVudCkgcmV0dXJuO1xuICAgICAgY29uc3QgZ3JhbnRlZCA9IGF3YWl0IHJlcXVlc3RDYW1lcmFQZXJtaXNzaW9uKCk7XG4gICAgICBpZiAoZ3JhbnRlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgc2V0RXJyb3JNZXNzYWdlKGluZFQoXCJFeHBlbnNlU2hlZXRzX05ld1RpY2tldF9FcnJvcl9DYW1lcmFQZXJtaXNzaW9uXCIsIFwiQ2FtZXJhIHBlcm1pc3Npb24gaXMgcmVxdWlyZWQuXCIpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2V0U291cmNlUGlja2VyT3BlbihmYWxzZSk7XG4gICAgICBpbnB1dEVsZW1lbnQuY2xpY2soKTtcbiAgICB9LFxuICAgIFtyZXF1ZXN0Q2FtZXJhUGVybWlzc2lvbl1cbiAgKTtcblxuICBjb25zdCBzZWxlY3RGcm9tR2FsbGVyeSA9IHVzZUNhbGxiYWNrKChpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQgfCBudWxsKSA9PiB7XG4gICAgaWYgKCFpbnB1dEVsZW1lbnQpIHJldHVybjtcbiAgICBzZXRTb3VyY2VQaWNrZXJPcGVuKGZhbHNlKTtcbiAgICBpbnB1dEVsZW1lbnQuY2xpY2soKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGNsZWFyRXJyb3IgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY2xlYXJDYWNoZWRDdXJyZW50SW1hZ2UoKTtcbiAgICBsYXRlc3RDcmVhdGVkVGlja2V0UmVmLmN1cnJlbnQgPSBudWxsO1xuICAgIHNldEVycm9yTWVzc2FnZShcIlwiKTtcbiAgICBzZXRQYXJ0aWFsVGlja2V0RmFpbHVyZShudWxsKTtcbiAgfSwgW2NsZWFyQ2FjaGVkQ3VycmVudEltYWdlXSk7XG5cbiAgcmV0dXJuIHtcbiAgICBzb3VyY2VQaWNrZXJPcGVuLFxuICAgIGJ1c3ksXG4gICAgcHJvZ3Jlc3NLZXksXG4gICAgcHJvZ3Jlc3NNZXNzYWdlLFxuICAgIGVycm9yTWVzc2FnZSxcbiAgICBoYXNQZW5kaW5nVXBsb2FkUmV0cnk6IGZhbHNlLFxuICAgIGhhc1BhcnRpYWxUaWNrZXRGYWlsdXJlOiBwYXJ0aWFsVGlja2V0RmFpbHVyZSAhPT0gbnVsbCxcbiAgICB0cmFjZUxpc3QsXG4gICAgb3BlblNvdXJjZVBpY2tlcixcbiAgICBjbG9zZVNvdXJjZVBpY2tlcixcbiAgICBzZWxlY3RGcm9tQ2FtZXJhLFxuICAgIHNlbGVjdEZyb21HYWxsZXJ5LFxuICAgIGhhbmRsZVNlbGVjdGVkRmlsZSxcbiAgICByZXRyeVBlbmRpbmdVcGxvYWQsXG4gICAgb3BlbkNyZWF0ZWRUaWNrZXQsXG4gICAgY2xlYXJFcnJvcixcbiAgfTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFBQSxnQkFBOEQ7QUFDOUQsdUJBQTZCOzs7QUNEN0IsbUJBQTZGO0FBUXRGLElBQU0saUNBQWlDLE1BQTRDO0FBQ3hGLFFBQU0saUJBQWEscUJBQThCLElBQUk7QUFDckQsUUFBTSx3QkFBb0IscUJBQXNCLElBQUk7QUFDcEQsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsUUFBSSx1QkFBUyxDQUFDO0FBRXRELFFBQU0sb0JBQWdCLDZCQUFlLE1BQU07QUFDekMsVUFBTSxVQUFVLFdBQVc7QUFDM0IsUUFBSSxDQUFDLFFBQVM7QUFFZCxVQUFNLGFBQWEsS0FBSyxLQUFLLFFBQVEsc0JBQXNCLEVBQUUsTUFBTTtBQUNuRSxzQkFBa0IsQ0FBQyxhQUFjLEtBQUssSUFBSSxXQUFXLFVBQVUsSUFBSSxJQUFJLFdBQVcsVUFBVztBQUFBLEVBQy9GLENBQUM7QUFFRCxRQUFNLHNCQUFrQiw2QkFBZSxNQUFNO0FBQzNDLFFBQUksT0FBTyxXQUFXLFlBQWE7QUFFbkMsUUFBSSxrQkFBa0IsWUFBWSxNQUFNO0FBQ3RDLGFBQU8scUJBQXFCLGtCQUFrQixPQUFPO0FBQUEsSUFDdkQ7QUFFQSxzQkFBa0IsVUFBVSxPQUFPLHNCQUFzQixNQUFNO0FBQzdELHdCQUFrQixVQUFVO0FBQzVCLG9CQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELG9DQUFnQixNQUFNO0FBQ3BCLGtCQUFjO0FBRWQsUUFBSSxPQUFPLG1CQUFtQixZQUFhO0FBQzNDLFVBQU0sVUFBVSxXQUFXO0FBQzNCLFFBQUksQ0FBQyxRQUFTO0FBRWQsVUFBTSxXQUFXLElBQUksZUFBZSxN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UUFBTSx1QkFBbUIsMkJBQVksTUFBTTtBQUN6QyxRQUFJLENBQUMsNEJBQTRCLEVBQUc7QUFDcEMsb0JBQWdCLEVBQUU7QUFDbEIsNEJBQXdCLElBQUk7QUFDNUIsd0JBQW9CLElBQUk7QUFBQSxFQUMxQixHQUFHLENBQUMsMkJBQTJCLENBQUM7QUFFaEMsUUFBTSx3QkFBb0IsMkJBQVksTUFBTTtBQUMxQyxRQUFJLEtBQU07QUFDVix3QkFBb0IsS0FBSztBQUFBLEVBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFFVCxRQUFNLDhCQUEwQiwyQkFBWSxZQUFxQztBQUMvRSxRQUFJLE9BQU8sY0FBYyxZQUFhLFFBQU87QUFDN0MsVUFBTSxlQUFlLFVBQVU7QUFDL0IsUUFBSSxDQUFDLGdCQUFnQixPQUFPLGFBQWEsaUJBQWlCLFdBQVksUUFBTztBQUU3RSxRQUFJO0FBQ0YsWUFBTSxTQUFTLE1BQU0sYUFBYSxhQUFhO0FBQUEsUUFDN0MsT0FBTyxFQUFFLFlBQVksY0FBYztBQUFBLE1BQ3JDLENBQUM7QUFDRCxhQUFPLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxNQUFNLEtBQUssQ0FBQztBQUNsRCxhQUFPO0FBQUEsSUFDVCxRQUFRO0FBQ04sYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGLEdBQUcsQ0FBQyxDQUFDO0FBRUwsUUFBTSx1QkFBbUI7QUFBQSxJQUN2QixPQUFPLGlCQUEwQztBQUMvQyxVQUFJLENBQUMsYUFBYztBQUNuQixZQUFNLFVBQVUsTUFBTSx3QkFBd0I7QUFDOUMsVUFBSSxZQUFZLE9BQU87QUFDckIsd0JBQWdCLEtBQUssa0RBQWtELGdDQUFnQyxDQUFDO0FBQ3hHO0FBQUEsTUFDRjtBQUNBLDBCQUFvQixLQUFLO0FBQ3pCLG1CQUFhLE1BQU07QUFBQSxJQUNyQjtBQUFBLElBQ0EsQ0FBQyx1QkFBdUI7QUFBQSxFQUMxQjtBQUVBLFFBQU0sd0JBQW9CLDJCQUFZLENBQUMsaUJBQTBDO0FBQy9FLFFBQUksQ0FBQyxhQUFjO0FBQ25CLHdCQUFvQixLQUFLO0FBQ3pCLGlCQUFhLE1BQU07QUFBQSxFQUNyQixHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0saUJBQWEsMkJBQVksTUFBTTtBQUNuQyw0QkFBd0I7QUFDeEIsMkJBQXVCLFVBQVU7QUFDakMsb0JBQWdCLEVBQUU7QUFDbEIsNEJBQXdCLElBQUk7QUFBQSxFQUM5QixHQUFHLENBQUMsdUJBQXVCLENBQUM7QUFFNUIsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxJQUN2Qix5QkFBeUIseUJBQXlCO0FBQUEsSUFDbEQ7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsiaW1wb3J0X3JlYWN0IiwgImltcG9ydF9yZWFjdCJdCn0K
