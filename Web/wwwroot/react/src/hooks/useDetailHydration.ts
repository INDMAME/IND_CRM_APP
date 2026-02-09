import { useCallback, useEffect } from "react";
import { fetchJson } from "../services/apiService.ts";
import { indT } from "../utils/indI18n.ts";

type UseDetailHydrationArgs = {
  actividadId: string;
  shouldHydrate: boolean;
  visitTypes: any[];
  asistenteTipos: any[];
  defaultVisitType: string;
  initialAsistente: string;
  normalizeDateToInput: (value: string) => string;
  matchOptionValue: (options: any[], raw: unknown) => string;
  applyDraftValues: () => void;
  applyTextEditorValues: () => void;
  setStatus: (value: string) => void;
  setIsHydrating: (value: boolean) => void;
  setTransDate: (value: string) => void;
  setVisitType: (value: string) => void;
  setAsistenteTipo: (value: string) => void;
  setDescription: (value: string) => void;
  setComentarios: (value: string) => void;
  setAntecedentes: (value: string) => void;
  setConclusiones: (value: string) => void;
};

// Keeps detail hydration orchestration outside the page component.
export const useDetailHydration = ({
  actividadId,
  shouldHydrate,
  visitTypes,
  asistenteTipos,
  defaultVisitType,
  initialAsistente,
  normalizeDateToInput,
  matchOptionValue,
  applyDraftValues,
  applyTextEditorValues,
  setStatus,
  setIsHydrating,
  setTransDate,
  setVisitType,
  setAsistenteTipo,
  setDescription,
  setComentarios,
  setAntecedentes,
  setConclusiones,
}: UseDetailHydrationArgs) => {
  const hydrateFromApi = useCallback(async () => {
    if (!actividadId) return;
    setIsHydrating(true);
    try {
      const res = await fetchJson(`/Visitas/GetActivityByCode?code=${encodeURIComponent(actividadId)}`);
      if (!res?.success || !res.data) {
        setStatus(res?.message || indT("Visits_Detail_LoadActivityFailed", "Failed to load activity details."));
        return;
      }
      const data = res.data;
      const rawDate = String(data.transDate ?? data.TransDate ?? "");
      setTransDate(normalizeDateToInput(rawDate));

      const rawVisitType = String(data.tipoVisita ?? data.TipoVisita ?? data.visitType ?? data.VisitType ?? "");
      setVisitType(matchOptionValue(visitTypes, rawVisitType) || defaultVisitType);

      const asistentesList = data.asistentes ?? data.Asistentes;
      const firstAsistente = Array.isArray(asistentesList) && asistentesList.length ? asistentesList[0] : null;
      const rawAsistenteTipo = String(
        data.asistenteTipo ?? data.AsistenteTipo ?? firstAsistente?.asistenteTipo ?? firstAsistente?.AsistenteTipo ?? ""
      );
      const normalizedAsistenteTipo = matchOptionValue(asistenteTipos, rawAsistenteTipo);
      setAsistenteTipo(normalizedAsistenteTipo || initialAsistente);
      setDescription(String(data.description ?? data.Description ?? ""));
      setComentarios(String(data.comentarios ?? data.Comentarios ?? ""));
      setAntecedentes(String(data.antecedentes ?? data.Antecedentes ?? ""));
      setConclusiones(String(data.conclusiones ?? data.Conclusiones ?? ""));
    } catch {
      // Keep previous UI behavior on hydration errors.
    } finally {
      setIsHydrating(false);
      applyDraftValues();
      applyTextEditorValues();
    }
  }, [
    actividadId,
    applyDraftValues,
    applyTextEditorValues,
    asistenteTipos,
    defaultVisitType,
    initialAsistente,
    matchOptionValue,
    normalizeDateToInput,
    setAntecedentes,
    setAsistenteTipo,
    setComentarios,
    setConclusiones,
    setDescription,
    setIsHydrating,
    setStatus,
    setTransDate,
    setVisitType,
    visitTypes,
  ]);

  useEffect(() => {
    if (shouldHydrate) {
      hydrateFromApi();
      return;
    }
    applyDraftValues();
    applyTextEditorValues();
  }, [applyDraftValues, applyTextEditorValues, hydrateFromApi, shouldHydrate]);
};
