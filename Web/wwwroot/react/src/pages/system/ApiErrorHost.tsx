import React from "react";
import ApiErrorDialog from "../../components/commons/ApiErrorDialog.tsx";
import { mountReactIsland, mountWhenDocumentReady } from "../../utils/reactIsland.tsx";

// Mount one shared error popup using labels supplied by the Razor layout.
mountWhenDocumentReady(() => {
  const root = document.getElementById("ind-api-error-root");
  if (!root) return;
  mountReactIsland(root, <ApiErrorDialog title={root.dataset.title || ""} closeLabel={root.dataset.close || ""}
    codeLabel={root.dataset.code || ""} traceLabel={root.dataset.trace || ""} />);
});
