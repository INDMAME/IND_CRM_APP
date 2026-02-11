import React from "react";
import DetailForm from "./DetailForm.tsx";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";

// Page entry for the visitas detail island.
const DetailPage = () => {
  return (
    <VisitasPageProviders>
      <DetailForm />
    </VisitasPageProviders>
  );
};

const mount = () => {
  const rootEl = document.getElementById("visita-detail-root");
  if (!rootEl) return;

  mountReactIsland(rootEl, <DetailPage />);
};

mountWhenDocumentReady(mount);

export default DetailPage;
