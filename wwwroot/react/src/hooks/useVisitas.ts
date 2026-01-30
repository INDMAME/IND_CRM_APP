type VisitOption = {
  value?: string | number;
  text?: string;
  Value?: string | number;
  Text?: string;
};

export const useVisitas = () => {
  const visitTypes = (typeof window !== "undefined" && window.__VISIT_TYPES__) || [];
  const asistenteTipos = (typeof window !== "undefined" && window.__ASISTENTE_TIPOS__) || [];

  return {
    visitTypes: visitTypes as VisitOption[],
    asistenteTipos: asistenteTipos as VisitOption[],
  };
};
