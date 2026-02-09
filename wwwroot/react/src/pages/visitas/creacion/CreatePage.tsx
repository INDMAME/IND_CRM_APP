import React from "react";
import CreateForm from "./CreateForm.tsx";
import VisitasPageProviders from "../../../components/commons/VisitasPageProviders.tsx";
import { mountReactIsland, mountWhenDocumentReady } from "../../../utils/reactIsland.tsx";

// Page entry for the visitas create island.
const CreatePage = () => {
  return (
    <VisitasPageProviders>
      <CreateForm />
    </VisitasPageProviders>
  );
};

const mount = () => {
  const rootEl = document.getElementById("visitas-app-root");
  if (!rootEl) return;

  mountReactIsland(rootEl, <CreatePage />);
};

mountWhenDocumentReady(mount);

export default CreatePage;
