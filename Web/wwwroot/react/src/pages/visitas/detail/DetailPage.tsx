import React from "react";
import DetailForm from "./DetailForm.tsx";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";

type Props = {
  companyId?: string;
  axUserId?: string;
  permissionsRevision?: string;
};

// Page entry for the visitas detail island.
const DetailPage = ({ companyId = "", axUserId = "", permissionsRevision = "" }: Props) => {
  return (
    <VisitasPageProviders>
      <DetailForm companyId={companyId} axUserId={axUserId} permissionsRevision={permissionsRevision} />
    </VisitasPageProviders>
  );
};

const mount = () => {
  const rootEl = document.getElementById("visita-detail-root");
  if (!rootEl) return;
  const companyId = rootEl.getAttribute("data-company-id") || "";
  const axUserId = rootEl.getAttribute("data-ax-user-id") || "";
  const permissionsRevision = rootEl.getAttribute("data-permissions-revision") || "";

  mountReactIsland(
    rootEl,
    <DetailPage companyId={companyId} axUserId={axUserId} permissionsRevision={permissionsRevision} />
  );
};

mountWhenDocumentReady(mount);

export default DetailPage;
